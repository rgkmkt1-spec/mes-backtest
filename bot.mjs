// bot.mjs - automated 3 AM-range sweep bot for SPY/QQQ on an Alpaca PAPER account.
//
// How it works (every minute, 9:25 AM - 4:00 PM New York, weekdays):
//   1. Asks mes_backtest.mjs for today's signal using the exact locked forward-test rules
//      (3AM-9:30 range sweep, R:R 1.5, row 4), on fresh 1-minute data.
//   2. New signal  -> buys $DOLLARS of the ETF (long) or of its inverse ETF (short: QQQ->PSQ, SPY->SH),
//      because fractional shares can't be sold short.
//   3. When the backtester says the trade hit its stop, its target, or the 3:55 PM time exit -> sells it.
//   4. Every fill is logged to bot_trades.csv so we can compare real fills with the backtest.
//
// Setup: put your PAPER keys in alpaca_keys.json (never commit this file):
//   { "key": "PK...", "secret": "..." }
// Commands:
//   node bot.mjs check   -> tests the keys and shows the account (places no orders)
//   node bot.mjs once    -> runs a single cycle and exits
//   node bot.mjs         -> runs all day (start it before 9:25 AM; it stops itself after 4 PM)
import { readFileSync, writeFileSync, existsSync, appendFileSync, mkdirSync } from 'fs';
import { execFile } from 'child_process';

const SYMBOLS = ['QQQ', 'SPY'];                    // each gets its own $DOLLARS slice
const INVERSE = { QQQ: 'PSQ', SPY: 'SH' };         // bought instead of shorting
const DOLLARS = +(process.env.BOT_DOLLARS || 50);  // $50 each = the $100 account
const BASE = 'https://paper-api.alpaca.markets';   // PAPER trading only
const DIR = process.env.BOT_DIR ? process.env.BOT_DIR.replace(/\/$/, '') + '/' : '';   // GitHub run keeps its files in bot/
if (DIR) mkdirSync(DIR, { recursive: true });
const STATE_FILE = DIR + 'bot_state.json', LOG_FILE = DIR + 'bot_log.txt', TRADES_FILE = DIR + 'bot_trades.csv';
const UNTIL = process.env.BOT_UNTIL ? (([h, m]) => +h * 60 + +m)(process.env.BOT_UNTIL.split(':')) : 16 * 60;  // stop time (NY), for split GitHub runs
const mode = process.argv[2] || 'run';

// ---------- helpers ----------
const ny = () => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23', weekday: 'short' }).formatToParts(new Date()).map(x => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, mins: +p.hour * 60 + +p.minute, hm: `${p.hour}:${p.minute}`, wd: p.weekday };
};
const log = msg => { const line = `${new Date().toISOString()} [${ny().hm} NY] ${msg}`; console.log(line); appendFileSync(LOG_FILE, line + '\n'); };
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Keys: GitHub Secrets (ALPACA_KEY / ALPACA_SECRET) or a local alpaca_keys.json
const KEYS = process.env.ALPACA_KEY ? { key: process.env.ALPACA_KEY, secret: process.env.ALPACA_SECRET }
  : existsSync('alpaca_keys.json') ? JSON.parse(readFileSync('alpaca_keys.json', 'utf8')) : null;
if (!KEYS?.key || !KEYS?.secret) { console.log('Missing Alpaca keys: set ALPACA_KEY/ALPACA_SECRET or create alpaca_keys.json.'); process.exit(1); }
async function alpaca(method, path, body) {
  const r = await fetch(BASE + path, {
    method, body: body ? JSON.stringify(body) : undefined,
    headers: { 'APCA-API-KEY-ID': KEYS.key, 'APCA-API-SECRET-KEY': KEYS.secret, 'Content-Type': 'application/json' },
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`Alpaca ${method} ${path} -> HTTP ${r.status}: ${text.slice(0, 200)}`);
  return text ? JSON.parse(text) : {};
}

function signal(sym) {   // today's locked-row sweep trades from the backtester, as JSON
  return new Promise((resolve, reject) => {
    execFile(process.execPath, ['mes_backtest.mjs', sym.toLowerCase(), '1m', 'ldn', 'botjson'],
      { env: { ...process.env, BOT_DAYS: '4', ACCOUNT: String(DOLLARS) }, timeout: 90000, maxBuffer: 1 << 24 },
      (err, out) => {
        const line = (out || '').split('\n').find(l => l.startsWith('BOTJSON '));
        if (!line) return reject(new Error(`no signal output for ${sym}${err ? ': ' + err.message : ''}`));
        resolve(JSON.parse(line.slice(8)));
      });
  });
}

const loadState = () => { try { return JSON.parse(readFileSync(STATE_FILE, 'utf8')); } catch { return {}; } };
const saveState = s => writeFileSync(STATE_FILE, JSON.stringify(s, null, 2));

async function fillOf(orderId) {   // wait briefly for a market order to fill
  for (let n = 0; n < 15; n++) {
    const o = await alpaca('GET', `/v2/orders/${orderId}`);
    if (o.status === 'filled') return { price: +o.filled_avg_price, qty: +o.filled_qty };
    if (['canceled', 'rejected', 'expired'].includes(o.status)) throw new Error(`order ${o.status}`);
    await sleep(2000);
  }
  throw new Error('order not filled after 30s');
}

function journal(row) {
  const cols = ['date', 'symbol', 'traded', 'side', 'signalEntry', 'stop', 'target', 'fillIn', 'qty', 'exitReason', 'fillOut', 'pnl'];
  if (!existsSync(TRADES_FILE)) writeFileSync(TRADES_FILE, cols.join(',') + '\n');
  appendFileSync(TRADES_FILE, cols.map(c => row[c] ?? '').join(',') + '\n');
}

// ---------- one cycle ----------
async function cycle() {
  const t = ny(), state = loadState();
  if (state.date !== t.date) { for (const k of Object.keys(state)) delete state[k]; state.date = t.date; }
  for (const sym of SYMBOLS) {
    const st = state[sym] || (state[sym] = { status: 'none' });
    if (st.status === 'closed' || st.status === 'missed') continue;
    let sig;
    try { sig = await signal(sym); } catch (e) { log(`${sym}: ${e.message}`); continue; }
    if (sig.today !== t.date) continue;
    const done = sig.trades[0], open = sig.open && sig.open.date === t.date ? sig.open : null;

    if (st.status === 'none') {
      if (done) { st.status = 'missed'; log(`${sym}: today's signal already finished before the bot saw it (${done.reason}) - skipped`); continue; }
      if (!open) continue;
      const traded = open.dir === 1 ? sym : INVERSE[sym];
      try {
        const o = await alpaca('POST', '/v2/orders', { symbol: traded, notional: DOLLARS.toFixed(2), side: 'buy', type: 'market', time_in_force: 'day' });
        const f = await fillOf(o.id);
        Object.assign(st, { status: 'open', traded, side: open.dir === 1 ? 'long' : 'short', signalEntry: open.entry, stop: open.stop, target: open.target, fillIn: f.price, qty: f.qty });
        log(`${sym}: ENTER ${st.side} via ${traded} - bought ${f.qty} @ ${f.price} | ${sym} stop ${open.stop}, target ${open.target} | ${open.setup}`);
      } catch (e) { st.status = 'missed'; log(`${sym}: entry FAILED (${e.message}) - skipped for today`); }
    } else if (st.status === 'open' && done) {
      await exitTrade(sym, st, done.reason);
    }
  }
  saveState(state);
}

async function exitTrade(sym, st, reason) {
  try {
    const o = await alpaca('DELETE', `/v2/positions/${st.traded}`);
    const f = await fillOf(o.id);
    const pnl = (f.price - st.fillIn) * st.qty;
    log(`${sym}: EXIT (${reason}) - sold ${st.traded} @ ${f.price} | P&L $${pnl.toFixed(2)}`);
    journal({ date: ny().date, symbol: sym, traded: st.traded, side: st.side, signalEntry: st.signalEntry, stop: st.stop, target: st.target, fillIn: st.fillIn, qty: st.qty, exitReason: reason, fillOut: f.price, pnl: pnl.toFixed(2) });
    st.status = 'closed';
  } catch (e) { log(`${sym}: EXIT FAILED (${e.message}) - will retry next minute`); }
}

async function flattenAll(why) {   // safety net at 3:57 PM
  const state = loadState();
  for (const sym of SYMBOLS) if (state[sym]?.status === 'open') await exitTrade(sym, state[sym], why);
  saveState(state);
  // Second safety net: close ANY bot symbol still held on Alpaca, even if the saved state lost track of it,
  // so nothing is ever held overnight.
  const mine = new Set([...SYMBOLS, ...Object.values(INVERSE)]);
  try {
    for (const p of await alpaca('GET', '/v2/positions')) {
      if (!mine.has(p.symbol)) continue;
      await alpaca('DELETE', `/v2/positions/${p.symbol}`);
      log(`SAFETY: closed untracked ${p.symbol} position (${p.qty} sh) - the saved state had lost it`);
    }
  } catch (e) { log(`SAFETY check failed: ${e.message}`); }
}

async function startupCheck() {   // warn if Alpaca holds something the saved state doesn't know about
  const state = loadState(), t = ny();
  const known = new Set(state.date === t.date ? SYMBOLS.filter(s => state[s]?.status === 'open').map(s => state[s].traded) : []);
  const mine = new Set([...SYMBOLS, ...Object.values(INVERSE)]);
  try {
    for (const p of await alpaca('GET', '/v2/positions'))
      if (mine.has(p.symbol) && !known.has(p.symbol)) log(`WARNING: Alpaca holds ${p.qty} ${p.symbol} that the bot's state doesn't know about - it will be closed at 3:57 PM`);
  } catch (e) { log(`startup check failed: ${e.message}`); }
}

// ---------- main ----------
if (mode === 'check') {
  const a = await alpaca('GET', '/v2/account'), c = await alpaca('GET', '/v2/clock');
  console.log(`Connected to Alpaca PAPER. Account ${a.account_number}, status ${a.status}, cash $${(+a.cash).toFixed(2)}, equity $${(+a.equity).toFixed(2)}`);
  console.log(`Market is ${c.is_open ? 'OPEN' : 'closed'}. Next open: ${c.next_open}`);
  for (const sym of SYMBOLS) for (const s of [sym, INVERSE[sym]]) {
    const as = await alpaca('GET', `/v2/assets/${s}`);
    console.log(`  ${s}: tradable ${as.tradable}, fractionable ${as.fractionable}`);
  }
  const sig = await signal('QQQ');
  console.log(`Signal check OK - data up to ${sig.lastBar}, rule: ${sig.row}`);
  process.exit(0);
}
if (mode === 'once') { await cycle(); process.exit(0); }

log(`Bot started: ${SYMBOLS.join(' + ')}, $${DOLLARS} each, Alpaca PAPER`);
await startupCheck();
for (;;) {
  const t = ny();
  if (t.wd === 'Sat' || t.wd === 'Sun') { log('Weekend - exiting'); break; }
  if (t.mins >= 16 * 60) { log('After 4 PM - done for today'); break; }
  if (t.mins >= UNTIL) { log(`Reached ${process.env.BOT_UNTIL} - handing over to the afternoon run (open trades stay open)`); break; }
  if (t.mins >= 9 * 60 + 25) {
    try {
      const clock = await alpaca('GET', '/v2/clock');
      if (!clock.is_open && t.mins >= 9 * 60 + 31) { log('Market closed today (holiday?) - exiting'); break; }
      if (t.mins >= 15 * 60 + 57) await flattenAll('time (3:57 safety)');   // repeats 3:57-3:59, so a failed close is retried
      else await cycle();
    } catch (e) { log(`cycle error: ${e.message}`); }
  }
  await sleep(60000 - (Date.now() % 60000) + 5000);   // run 5 seconds after each new minute
}
process.exit(0);
