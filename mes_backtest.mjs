// MES backtester (Node 18+, no packages needed). Free data from Yahoo Finance.
//
// Usage (words can go in any order):
//   node mes_backtest.mjs                  -> Heikin Ashi pullback, 5-minute bars (~60 days)
//   node mes_backtest.mjs 1m               -> Heikin Ashi pullback, 1-minute bars (~30 days)
//   node mes_backtest.mjs orb              -> Opening Range Breakout, 5-minute bars
//   node mes_backtest.mjs orb 1m           -> Opening Range Breakout, 1-minute bars
//   ... since 2026-10-09                   -> only count trades from that date on (forward test)
//   ... mnq                                -> run on MNQ (micro Nasdaq) instead of MES, e.g. "node mes_backtest.mjs mnq orb 1m"
//   node mes_backtest.mjs sd               -> Supply & demand zones + 200 EMA, tested on 30/15/5-min charts
//   node mes_backtest.mjs onr              -> Overnight high/low break & retest (5-min signals)
//   node mes_backtest.mjs ldn              -> 3AM-9:30 range: breakout / retest / liquidity sweep
//   node mes_backtest.mjs orr              -> 30-min opening range (9:30-10:00): breakout / retest / sweep
//   node mes_backtest.mjs h2               -> Two-legged pullback to 21 EMA (5-min chart; add 1m for 1-min chart)
//   node mes_backtest.mjs cs               -> 15m structure bias + change of character + fair value gap midpoint entry
//   node mes_backtest.mjs pdh              -> Previous-day high/low break & retest with daily 9/21 EMA trend filter
//   node mes_backtest.mjs fbr              -> First-bar reversal: fade a big 9:30 bar once price crosses its midpoint
//   node mes_backtest.mjs dorb             -> Displacement ORB (9:30-9:45) + demand/supply zone entry + London/NY session filter
//
// Every run SAVES the downloaded bars to a local file (bars_5m.json / bars_1m.json) and merges
// new data into it. Yahoo only serves ~30 days of 1-minute data, so this cache is what lets a
// weekly forward test keep growing past 30 days. Don't delete the bars_*.json files.
//
// Output: summary table + trades_<strategy>_<interval>.csv in this folder.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

// ---------- Command-line options ----------
const args = process.argv.slice(2).map(a => a.toLowerCase());
const MARKETS = {
  mes: { name: 'MES (Micro E-mini S&P 500)', sym: 'MES=F', tick: 0.25, pointValue: 5, cachePrefix: 'bars_',     filePrefix: '' },
  mnq: { name: 'MNQ (Micro E-mini Nasdaq-100)', sym: 'MNQ=F', tick: 0.25, pointValue: 2, cachePrefix: 'bars_mnq_', filePrefix: 'mnq_' },
};
const KNOWN = ['mes', 'mnq', '1m', '5m', 'since', 'ha', 'orb', 'sd', 'onr', 'ldn', 'orr', 'h2', 'dorb', 'fbr', 'pdh', 'cs', 'slc', 'scalp', 'eng', 'ovn', 'ema8', 'p3', 'htf', 'vwap', 'orev', 'asia', 'snk', 'ifvg', 'fvgo', 'e50', 'orbp', 'tl', 'orb5', 'flag', 'box', 'ema3', 'hr1', 'sw15', 'macd', 'one', 'vap', 'filt'];
const unknown = args.filter((a, i) => !KNOWN.includes(a) && !(args[i - 1] === 'since'));
if (unknown.length) {
  console.log(`\nUnknown option: ${unknown.join(', ')}`);
  console.log(`This version of the script knows: ${KNOWN.filter(k => !['mes', '5m', 'since'].includes(k)).join(', ')}`);
  console.log('If you expected a newer strategy, the new mes_backtest.mjs is not in this folder yet.\n');
  process.exit(1);
}
const MARKET = args.includes('mnq') ? MARKETS.mnq : MARKETS.mes;
const INTERVAL = args.includes('1m') ? '1m' : '5m';
const STRATEGY = args.includes('orb') ? 'orb' : args.includes('sd') ? 'sd' : args.includes('onr') ? 'onr' : args.includes('ldn') ? 'ldn' : args.includes('orr') ? 'orr' : args.includes('h2') ? 'h2' : args.includes('dorb') ? 'dorb' : args.includes('fbr') ? 'fbr' : args.includes('pdh') ? 'pdh' : args.includes('cs') ? 'cs' : args.includes('slc') ? 'slc' : args.includes('scalp') ? 'scalp' : args.includes('eng') ? 'eng' : args.includes('ovn') ? 'ovn' : args.includes('ema8') ? 'ema8' : args.includes('p3') ? 'p3' : args.includes('htf') ? 'htf' : args.includes('vwap') ? 'vwap' : args.includes('orev') ? 'orev' : args.includes('asia') ? 'asia' : args.includes('snk') ? 'snk' : args.includes('ifvg') ? 'ifvg' : args.includes('fvgo') ? 'fvgo' : args.includes('e50') ? 'e50' : args.includes('orbp') ? 'orbp' : args.includes('tl') ? 'tl' : args.includes('orb5') ? 'orb5' : args.includes('flag') ? 'flag' : args.includes('box') ? 'box' : args.includes('ema3') ? 'ema3' : args.includes('hr1') ? 'hr1' : args.includes('sw15') ? 'sw15' : args.includes('macd') ? 'macd' : args.includes('one') ? 'one' : args.includes('vap') ? 'vap' : 'ha';
const FILT = args.includes('filt');
// Forward-test (locked) row for each strategy, used by the filter test
const FWD_ROW = { ha: 0, orb: 4, sd: 1, ldn: 4, pdh: 3, fvgo: 2, hr1: 0 };
const sinceIdx = args.indexOf('since');
const SINCE = sinceIdx >= 0 ? args[sinceIdx + 1] : null;
if (SINCE && !/^\d{4}-\d{2}-\d{2}$/.test(SINCE)) {
  console.log('Use the date format YYYY-MM-DD, e.g.  node mes_backtest.mjs 1m since 2026-10-09');
  process.exit(1);
}

// ---------- Contract + costs ----------
const TICK = MARKET.tick, POINT_VALUE = MARKET.pointValue;   // MES: $5/point ($1.25/tick). MNQ: $2/point ($0.50/tick)
const COMMISSION_RT = 2.0;                   // $1 per side
const SLIP = 1 * TICK;                       // 1 tick slippage on market entries and stop exits
const RTH_OPEN = 9 * 60 + 30;                // 9:30 NY

// ---------- Strategy settings ----------
const HA = {                                 // match the TradingView script defaults
  emaLen: 100, minClean: 2, pbLookback: 8,
  dojiBodyPct: 25, dojiWickPct: 15, sizeBoth: false,
  stopBufTicks: 1, maxStopPts: 8,
  entryEnd: '11:30', flatTime: '12:00', maxTrades: 3, maxLosses: 2,
};
const ORB = {
  // Opening range = high/low of the first N minutes after 9:30.
  // Entry: first candle that CLOSES above the range high (long) or below the range low (short).
  // One trade per day. Stop: middle of the opening range. Target: reward:risk multiple.
  entryEnd: '11:30', flatTime: '15:50', maxStopPts: 12,
};

const SD = {
  // Supply & demand zones with a 200 EMA trend filter (signals on 5/15/30-min candles,
  // trades simulated on the underlying 1m or 5m bars).
  emaLen: 200, atrLen: 14,
  pushBars: 3,            // "big push" = 3+ candles in a row in the trend direction...
  pushAtr: 2,             // ...that together move at least 2x the average candle size
  maxZoneAtr: 1.5,        // skip zones whose base candle is bigger than 1.5x average ("too big")
  expiryHours: 48,        // a zone is cancelled after 2 days
  stopBufTicks: 1,
  entryStart: '09:30', entryEnd: '15:30', flatTime: '15:55', maxTrades: 3,
};

const VARIANTS = STRATEGY === 'ha'
  ? [1, 1.5, 2].flatMap(rr => ['09:30', '09:45'].map(start => ({ rr, start, label: `start ${start}` })))
  : STRATEGY === 'orb'
  ? [1, 1.5, 2].flatMap(rr => [15, 30].map(orMin => ({ rr, orMin, label: `${orMin}-min range` })))
  : STRATEGY === 'sd'
  ? [30, 15, 5].flatMap(tf => ['push', 2, 3].map(rr => ({ rr, tf, label: `${tf}-min chart` })))
  : STRATEGY === 'ldn'
  ? ['breakout', 'retest', 'sweep'].flatMap(mode => [1.5, 2].map(rr => ({ rr, mode, label: mode })))
  : STRATEGY === 'vap'
  ? ['ny', 'ldn'].flatMap(ses => [false, true].map(vf => ({ rr: 'POC', ses, vf, label: `${ses === 'ny' ? 'New York 9:30-15:30' : 'London 3:00-8:30'}, ${vf ? 'big-volume candle required' : 'no volume filter'}` })))
  : STRATEGY === 'one'
  ? ['trend', 'any'].flatMap(f => ['win', 'all'].map(cap => ({ rr: 2, f, cap, label: `${f === 'trend' ? 'with 5-min trend only' : 'any direction'}, ${cap === 'win' ? 'stop after first win, max 3 (his rule)' : 'keep trading, max 3'}` })))
  : STRATEGY === 'macd'
  ? [5, 15].flatMap(tf => ['ema', 'swing'].map(stopAt => ({ rr: 1.5, tf, stopAt, label: `${tf}-min chart, stop ${stopAt === 'ema' ? 'beyond 200 EMA (his rule)' : 'beyond 10-candle swing'}` })))
  : STRATEGY === 'sw15'
  ? [true, false].flatMap(col => ['swing', 2].map(tg => ({ rr: tg === 'swing' ? 'swing' : 2, col, tg, label: `${col ? 'sweep candle same color (his rule)' : 'any sweep candle'}, target ${tg === 'swing' ? 'next 15-min swing (min 1R)' : '2R'}` })))
  : STRATEGY === 'hr1'
  ? [{ rr: 2, be: true, cur: true, label: '2R, break-even at 1.5R, current hour must agree (his rules)' },
     { rr: 2, be: false, cur: true, label: '2R, no break-even move' },
     { rr: 1.5, be: false, cur: true, label: '1.5R, no break-even move' },
     { rr: 2, be: true, cur: false, label: '2R + break-even, no current-hour check' }]
  : STRATEGY === 'ema3'
  ? [5, 15].flatMap(tf => ['ema', 'swing'].map(stopAt => ({ rr: 1.5, tf, stopAt, label: `${tf}-min chart, stop ${stopAt === 'ema' ? 'below 30 EMA' : 'below pullback swing low'}` })))
  : STRATEGY === 'box'
  ? ['mid', 'far'].flatMap(tgt => [0.05, 0.1].map(buf => ({ rr: tgt === 'mid' ? 'mid' : 'edge', tgt, buf, label: `target ${tgt === 'mid' ? 'midline' : 'other side of box'}, stop ${buf * 100}% of box past the edge` })))
  : STRATEGY === 'flag'
  ? ['ema', 'any'].flatMap(f => [2, 3].map(rr => ({ rr, f, label: f === 'ema' ? 'pullback must touch 9 EMA (his rule)' : 'any pullback (no EMA touch needed)' })))
  : STRATEGY === 'orb5'
  ? ['ema', 'none'].flatMap(f => [1, 2].map(rr => ({ rr, f, label: f === 'ema' ? 'with 9/21 EMA trend filter (his setup)' : 'no EMA filter' })))
  : STRATEGY === 'tl'
  ? [5, 15].flatMap(tf => ['trail', 2].map(ex => ({ rr: ex === 'trail' ? 'trail' : ex, ex, tf, label: `${tf}-min trendlines, ${ex === 'trail' ? 'exit only on safety-line break (her rule)' : 'safety-line trail + 2R target'}` })))
  : STRATEGY === 'orbp'
  ? ['top', 'mid', 'auto'].flatMap(lvl => [2, 3].map(rr => ({ rr, lvl, label: lvl === 'auto' ? 'pullback level by breakout strength (his rule)' : `pullback to range ${lvl === 'top' ? 'edge' : 'midline'}` })))
  : STRATEGY === 'e50'
  ? [5, 15].flatMap(tf => [1.5, 2].map(rr => ({ rr, tf, label: `${tf}-min chart` })))
  : STRATEGY === 'fvgo'
  ? [{ mode: 'scalp', rr: 3, label: 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' }, { mode: 'scalp', rr: 2, label: 'SCALP: same, 2R' },
     { mode: 'day', rr: 2, label: 'DAY: 15-min range, 5-min gap, limit entry (his 2R)' }, { mode: 'day', rr: 3, label: 'DAY: same, 3R' }]
  : STRATEGY === 'ifvg'
  ? ['on', 'off'].flatMap(bias => [1, 2].map(rr => ({ rr, bias, label: bias === 'on' ? 'with daily trend bias' : 'no bias filter' })))
  : STRATEGY === 'snk'
  ? ['touch', 'near'].flatMap(tol => ['level', 2].map(rr => ({ rr, tol, label: `${tol === 'touch' ? 'must reach the line' : '"close enough" to the line'}, target ${rr === 'level' ? 'opposite line' : '2R'}` })))
  : STRATEGY === 'asia'
  ? ['on', 'off'].flatMap(filter => [2, 3].map(rr => ({ rr, filter, label: filter === 'on' ? 'with 1-hour trend filter' : 'no trend filter' })))
  : STRATEGY === 'orev'
  ? ['shoulder', 'head'].flatMap(stopAt => [2, 3].map(rr => ({ rr, stopAt, label: stopAt === 'shoulder' ? 'stop under higher low (shoulder)' : 'stop under the low (head)' })))
  : STRATEGY === 'vwap'
  ? [2, 3].flatMap(rr => ['on', 'off'].map(close => ({ rr, close, label: close === 'on' ? '9 EMA + VWAP close together' : 'no closeness rule' })))
  : STRATEGY === 'htf'
  ? [60, 240].flatMap(tf => ['swing', 3].map(rr => ({ rr, tf, label: `${tf === 60 ? '1-hour' : '4-hour'} zone, target ${rr === 'swing' ? 'next hourly swing (min 2R)' : '3R'}` })))
  : STRATEGY === 'p3'
  ? ['pd', 'ldn', 'both'].flatMap(lv => [2, 'liq'].map(rr => ({ rr, lv, label: `${{ pd: 'prev-day hi/lo', ldn: 'London hi/lo', both: 'prev-day + London' }[lv]}, target ${rr === 'liq' ? 'opposite liquidity' : '2R'}` })))
  : STRATEGY === 'ema8'
  ? [1, 1.5, 2].flatMap(rr => ['tight', 'cushion'].map(stopMode => ({ rr, stopMode, label: stopMode === 'tight' ? 'stop 1 tick past wick/EMA' : 'stop + cushion (half avg candle)' })))
  : STRATEGY === 'ovn'
  ? ['retest', 'breakout'].flatMap(entry => ['fixed', 'eod', 'r3'].map(manage => ({ rr: manage === 'fixed' ? 2 : manage === 'r3' ? 3 : 'run', entryMode: entry, manage,
      label: `${entry}: ${manage === 'fixed' ? 'both out at 2R' : manage === 'eod' ? 'half at 1R, runner to 3:55' : 'half at 1R, runner to 3R'}` })))
  : STRATEGY === 'eng'
  ? ['long', 'both'].flatMap(side => [1.5, 2].map(rr => ({ rr, side, label: side === 'long' ? 'longs only (as in video)' : 'longs + mirrored shorts' })))
  : STRATEGY === 'scalp'
  ? ['or5', 'pm', 'pdh'].flatMap(level => [2, 3].map(rr => ({ rr, level, label: { or5: 'first 5-min candle hi/lo', pm: 'premarket hi/lo (4:00-9:30)', pdh: 'previous-day hi/lo' }[level] })))
  : STRATEGY === 'slc'
  ? [14, 5].flatMap(stochLen => ['fresh', 'both'].map(mode => ({ rr: 2, stochLen, mode, label: `stoch ${stochLen}, ${mode === 'fresh' ? 'untouched zones only' : 'untouched + break-and-retest'}` })))
  : STRATEGY === 'cs'
  ? [{ rr: 2, be: false, label: 'target 2R' }, { rr: 4, be: false, label: 'target 4R' }, { rr: 4, be: true, label: 'target 4R, breakeven at +2R' }]
  : STRATEGY === 'pdh'
  ? [1.5, 2].flatMap(rr => ['on', 'off'].map(filter => ({ rr, filter, label: filter === 'on' ? 'with daily trend filter' : 'no trend filter' })))
  : STRATEGY === 'fbr'
  ? [1, 1.5, 2].map(rr => ({ rr, label: 'first-bar reversal' }))
  : STRATEGY === 'dorb'
  ? [1.5, 2].flatMap(rr => ['on', 'off'].map(filter => ({ rr, filter, label: filter === 'on' ? 'with session filter' : 'no session filter' })))
  : STRATEGY === 'h2'
  ? [1, 1.5, 2].map(rr => ({ rr, label: 'two-legged pullback' }))
  : STRATEGY === 'orr'
  ? ['breakout', 'retest', 'sweep'].flatMap(mode => [1.5, 2].map(rr => ({ rr, mode, label: mode, rangeStart: '09:30', rangeEnd: '10:00', tag: '30-min OR' })))
  : [1.5, 2, 3].flatMap(rr => ['tight', 'close'].map(stopMode => ({ rr, trend: 'ema', stopMode, label: stopMode === 'tight' ? 'stop: touch below candle' : 'stop: 5m CLOSE thru level' })));

// ---------- Data (with local cache) ----------
async function fetchChart(sym, query) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?${query}`;
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  const res = j?.chart?.result?.[0];
  if (!res?.timestamp) throw new Error(j?.chart?.error?.description || 'no data returned');
  const q = res.indicators.quote[0];
  const bars = [];
  for (let i = 0; i < res.timestamp.length; i++) {
    const o = q.open[i], h = q.high[i], l = q.low[i], c = q.close[i];
    if ([o, h, l, c].some(v => v == null || Number.isNaN(v))) continue;
    bars.push({ t: res.timestamp[i], o, h, l, c, v: q.volume?.[i] ?? 0 });
  }
  return bars;
}

async function download(sym) {
  if (INTERVAL === '5m') return fetchChart(sym, 'interval=5m&range=60d');
  const DAY = 86400, now = Math.floor(Date.now() / 1000);
  const all = new Map();
  for (let start = now - 29 * DAY; start < now; start += 7 * DAY) {
    const end = Math.min(start + 7 * DAY, now);
    try { for (const b of await fetchChart(sym, `interval=1m&period1=${start}&period2=${end}`)) all.set(b.t, b); }
    catch (e) { console.log(`  (skipped one 7-day chunk for ${sym}: ${e.message})`); }
  }
  if (!all.size) throw new Error('no 1-minute data returned');
  return [...all.values()];
}

async function loadBars() {
  if (process.env.SYNTH) return { bars: synthBars(), used: 'SYNTHETIC (self-test)' };
  const cacheFile = `${MARKET.cachePrefix}${INTERVAL}.json`;
  const cache = new Map();
  if (existsSync(cacheFile)) {
    try { for (const b of JSON.parse(readFileSync(cacheFile, 'utf8'))) cache.set(b.t, b); }
    catch { console.log(`  WARNING: could not read ${cacheFile} (damaged - possibly a git merge conflict). Using fresh download only.`); }
  }
  const before = cache.size;
  let fresh = null;
  try { fresh = await download(MARKET.sym); } catch (e) { console.log(`Could not download ${MARKET.sym}: ${e.message}`); }
  if (fresh) for (const b of fresh) cache.set(b.t, b);
  if (!cache.size) { console.log('No data available. Check your internet connection and try again.'); process.exit(1); }
  const bars = [...cache.values()].sort((a, b) => a.t - b.t);
  // Only the GitHub Actions bot saves the data files. Local runs use the merged data in memory
  // but never change the saved files, so "git pull" can't hit merge conflicts on them.
  const saving = process.env.GITHUB_ACTIONS === 'true' || process.env.SAVE_BARS === '1';
  if (saving) writeFileSync(cacheFile, JSON.stringify(bars));
  const note = fresh
    ? `${cache.size - before} new bars ${saving ? `added to ${cacheFile}` : `downloaded (not saved locally; the weekly GitHub run saves ${cacheFile})`}`
    : `download failed, using saved ${cacheFile}`;
  return { bars, used: `${MARKET.sym} (${note})` };
}

function synthBars(n = +(process.env.SYNTH_N || 12000)) { // offline self-test only (SYNTH=1)
  const bars = []; let p = 7000; let t = Date.UTC(2026, 7, 3, 4, 0) / 1000;
  const step = INTERVAL === '1m' ? 60 : 300;
  for (let i = 0; i < n; i++) {
    const o = p, c = o + (Math.random() - 0.48) * 4;
    bars.push({ t, o, h: Math.max(o, c) + Math.random() * 2, l: Math.min(o, c) - Math.random() * 2, c, v: Math.round(50 + Math.random() * 500) });
    p = c; t += step;
  }
  return bars;
}

// ---------- Time helpers ----------
const fmt = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hour12: false,
});
function nyTime(t) {
  const p = Object.fromEntries(fmt.formatToParts(new Date(t * 1000)).map(x => [x.type, x.value]));
  const hh = p.hour === '24' ? '00' : p.hour;
  return { date: `${p.year}-${p.month}-${p.day}`, hm: `${hh}:${p.minute}`, mins: +hh * 60 + +p.minute };
}
const toMins = s => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
const roundTick = x => Math.round(x / TICK) * TICK;

// ---------- Heikin Ashi indicators ----------
function prepHA(bars) {
  const k = 2 / (HA.emaLen + 1);
  let prevHaO = null, prevHaC = null, ema = null;
  for (const b of bars) {
    const haC = (b.o + b.h + b.l + b.c) / 4;
    const haO = prevHaO == null ? (b.o + b.c) / 2 : (prevHaO + prevHaC) / 2;
    b.haO = haO; b.haC = haC;
    b.haH = Math.max(b.h, haO, haC);
    b.haL = Math.min(b.l, haO, haC);
    ema = ema == null ? haC : haC * k + ema * (1 - k);
    b.ema = ema;
    b.range = b.haH - b.haL;
    const body = Math.abs(haC - haO);
    const up = b.haH - Math.max(haO, haC), dn = Math.min(haO, haC) - b.haL;
    b.isDoji = b.range > 0 && body <= b.range * HA.dojiBodyPct / 100 &&
      up >= b.range * HA.dojiWickPct / 100 && dn >= b.range * HA.dojiWickPct / 100;
    prevHaO = haO; prevHaC = haC;
  }
  const eps = 1e-9;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    const r1 = bars[i - 1]?.range ?? Infinity, r2 = bars[i - 2]?.range ?? Infinity;
    const big1 = b.range > r1, big2 = b.range > r2;
    b.bigDoji = b.isDoji && (HA.sizeBoth ? big1 && big2 : big1 || big2);
    for (const dir of ['L', 'S']) {
      let clean = 0;
      for (let k2 = 1; k2 <= HA.pbLookback && i - k2 >= 0; k2++) {
        const x = bars[i - k2];
        const inDir = dir === 'L' ? x.haC < x.haO : x.haC > x.haO;
        if (!inDir) break;
        const c = dir === 'L' ? x.haH - Math.max(x.haO, x.haC) <= eps : Math.min(x.haO, x.haC) - x.haL <= eps;
        if (c) clean++;
      }
      b['clean' + dir] = clean;
    }
  }
}

// ---------- Shared exit logic ----------
// Returns a closed trade if the position exits on bar b, else null.
function manageExit(b, pos, flatMin, overnight = false) {
  const d = pos.dir;
  let exit = null, reason = '', ambiguous = false, bestExit = null;
  const outOfHold = b.ny.mins >= flatMin || (!overnight && b.ny.mins < RTH_OPEN) || b.ny.date !== pos.date;
  if (outOfHold) { exit = b.o - d * SLIP; reason = 'time'; }
  else if (d === 1 ? b.o <= pos.stop : b.o >= pos.stop) { exit = b.o - d * SLIP; reason = 'stop (gap)'; }
  else if (d === 1 ? b.o >= pos.target : b.o <= pos.target) { exit = b.o; reason = 'target (gap)'; }
  else {
    const hitStop = d === 1 ? b.l <= pos.stop : b.h >= pos.stop;
    const hitTgt = d === 1 ? b.h >= pos.target : b.l <= pos.target;
    if (hitStop && hitTgt) { ambiguous = true; exit = pos.stop - d * SLIP; reason = 'stop (same-bar, assumed)'; bestExit = pos.target; }
    else if (hitStop) { exit = pos.stop - d * SLIP; reason = 'stop'; }
    else if (hitTgt) { exit = pos.target; reason = 'target'; }
  }
  if (exit == null) return null;
  const pnl = (exit - pos.entry) * d * POINT_VALUE - COMMISSION_RT;
  const pnlBest = bestExit != null ? (bestExit - pos.entry) * d * POINT_VALUE - COMMISSION_RT : pnl;
  return { ...pos, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason, ambiguous, pnl, pnlBest };
}

function openPos(bars, i, dir, stop, target, extra) {
  const b = bars[i], nb = bars[i + 1];
  return {
    dir, entryIdx: i + 1, date: b.ny.date,
    signalTime: `${b.ny.date} ${b.ny.hm}`, entryTime: `${nb.ny.date} ${nb.ny.hm}`,
    entry: nb.o + dir * SLIP, stop, target, ...extra,
  };
}

// ---------- Strategy 1: Heikin Ashi pullback ----------
function runHA(bars, { rr, start }) {
  const sMin = toMins(start), eMin = toMins(HA.entryEnd), fMin = toMins(HA.flatTime);
  const trades = [];
  let pos = null, day = null, nT = 0, nL = 0;
  for (let i = HA.emaLen * 3; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; nL = 0; }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); if (t.pnl < 0) nL++; pos = null; }
    }
    if (pos || i + 1 >= bars.length) continue;
    const inEntry = b.ny.mins >= sMin && b.ny.mins < eMin;
    if (!inEntry || nT >= HA.maxTrades || nL >= HA.maxLosses || !b.bigDoji) continue;
    let dir = 0, stop, target;
    if (b.haC > b.ema && b.cleanL >= HA.minClean) {
      stop = roundTick(b.haL - HA.stopBufTicks * TICK); const risk = b.c - stop;
      if (risk > 0 && risk <= HA.maxStopPts) { dir = 1; target = roundTick(b.c + rr * risk); }
    } else if (b.haC < b.ema && b.cleanS >= HA.minClean) {
      stop = roundTick(b.haH + HA.stopBufTicks * TICK); const risk = stop - b.c;
      if (risk > 0 && risk <= HA.maxStopPts) { dir = -1; target = roundTick(b.c - rr * risk); }
    }
    if (!dir) continue;
    nT++;
    pos = openPos(bars, i, dir, stop, target, {
      setup: `HA ${b.haO.toFixed(2)}/${b.haH.toFixed(2)}/${b.haL.toFixed(2)}/${b.haC.toFixed(2)} ema ${b.ema.toFixed(2)} clean ${dir === 1 ? b.cleanL : b.cleanS}`,
    });
  }
  return trades;
}

// ---------- Strategy 2: Opening Range Breakout ----------
function runORB(bars, { rr, orMin }) {
  const orEnd = RTH_OPEN + orMin, eMin = toMins(ORB.entryEnd), fMin = toMins(ORB.flatTime);
  const trades = [];
  let pos = null, day = null, orH = -Infinity, orL = Infinity, done = false;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; orH = -Infinity; orL = Infinity; done = false; }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (b.ny.mins >= RTH_OPEN && b.ny.mins < orEnd) { orH = Math.max(orH, b.h); orL = Math.min(orL, b.l); continue; }
    if (pos || done || i + 1 >= bars.length) continue;
    if (b.ny.mins < orEnd || b.ny.mins >= eMin || !Number.isFinite(orH)) continue;
    let dir = 0;
    if (b.c > orH) dir = 1; else if (b.c < orL) dir = -1;
    if (!dir) continue;
    done = true;                                     // one breakout per day, taken or skipped
    const stop = roundTick((orH + orL) / 2);
    const risk = (b.c - stop) * dir;
    if (risk <= 0 || risk > ORB.maxStopPts) continue; // range too wide -> skip the day
    const target = roundTick(b.c + dir * rr * risk);
    pos = openPos(bars, i, dir, stop, target, {
      setup: `OR ${orL.toFixed(2)}-${orH.toFixed(2)} (${(orH - orL).toFixed(2)} pts)`,
    });
  }
  return trades;
}

// ---------- Strategy 3: Supply & demand zones (200 EMA trend) ----------
// Signals come from tfMin-minute candles built out of the base bars; fills, stops and
// targets are simulated on the base bars themselves (1m or 5m) for accuracy.
function aggregate(bars, tfMin) {
  const sec = tfMin * 60, out = [];
  let cur = null;
  for (const b of bars) {
    const start = Math.floor(b.t / sec) * sec;
    if (!cur || cur.t !== start) {
      cur = { t: start, end: start + sec, o: b.o, h: b.h, l: b.l, c: b.c };
      out.push(cur);
    } else { cur.h = Math.max(cur.h, b.h); cur.l = Math.min(cur.l, b.l); cur.c = b.c; }
  }
  // indicators: 200 EMA of close, average candle size (simple mean of high-low)
  const k = 2 / (SD.emaLen + 1);
  let ema = null;
  for (let i = 0; i < out.length; i++) {
    const x = out[i];
    ema = ema == null ? x.c : x.c * k + ema * (1 - k);
    x.ema = ema;
    const from = Math.max(0, i - SD.atrLen + 1);
    let sum = 0; for (let j = from; j <= i; j++) sum += out[j].h - out[j].l;
    x.atr = sum / (i - from + 1);
  }
  return out;
}

function runSD(bars, { rr, tf }) {
  const tfBars = aggregate(bars, tf);
  const sMin = toMins(SD.entryStart), eMin = toMins(SD.entryEnd), fMin = toMins(SD.flatTime);
  const trades = [];
  let zones = [], pos = null, k = 0, last = null, day = null, nT = 0;
  const warm = SD.emaLen;

  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; }

    // 1) close out any signal candles that have finished by the start of this bar
    while (k < tfBars.length && tfBars[k].end <= b.t) {
      const x = tfBars[k]; last = x;
      // invalidate zones that a candle closed through, or that expired
      for (const z of zones) {
        if (z.dead) continue;
        if (z.dir === 1 ? x.c < z.lo : x.c > z.hi) z.dead = true;
        if (x.end - z.created > SD.expiryHours * 3600) z.dead = true;
      }
      // detect a new "big push" ending on this candle
      if (k >= warm) {
        const up = x.c > x.o, dn = x.c < x.o;
        if (up || dn) {
          const d = up ? 1 : -1;
          let s = k;
          while (s - 1 >= 0 && (d === 1 ? tfBars[s - 1].c > tfBars[s - 1].o : tfBars[s - 1].c < tfBars[s - 1].o)) s--;
          const runLen = k - s + 1;
          const move = (x.c - tfBars[s].o) * d;
          const base = tfBars[s - 1];
          // qualify exactly once per run: the first candle where it meets both conditions
          const qualifies = runLen >= SD.pushBars && move >= SD.pushAtr * x.atr;
          const prevQualified = runLen - 1 >= SD.pushBars && ((tfBars[k - 1].c - tfBars[s].o) * d) >= SD.pushAtr * tfBars[k - 1].atr;
          const trendOk = d === 1 ? x.c > x.ema : x.c < x.ema;
          if (qualifies && !prevQualified && trendOk && base && (base.h - base.l) <= SD.maxZoneAtr * x.atr && (base.h - base.l) > 0) {
            let ext = d === 1 ? -Infinity : Infinity;
            for (let j = s; j <= k; j++) ext = d === 1 ? Math.max(ext, tfBars[j].h) : Math.min(ext, tfBars[j].l);
            zones.push({ dir: d, lo: base.l, hi: base.h, ext, created: x.end, baseTime: nyTime(base.t), dead: false });
          }
        }
      }
      k++;
    }
    zones = zones.filter(z => !z.dead);

    // 2) manage an open position
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }

    // 3) check zones for a first touch on this bar
    for (const z of zones) {
      if (z.dead) continue;
      const touched = z.dir === 1 ? b.l <= z.hi : b.h >= z.lo;
      if (!touched) {                       // keep extending the push extreme until price returns
        z.ext = z.dir === 1 ? Math.max(z.ext, b.h) : Math.min(z.ext, b.l);
        continue;
      }
      z.dead = true;                        // a zone gets one chance: the first return
      const d = z.dir;
      const inEntry = b.ny.mins >= sMin && b.ny.mins < eMin;
      const trendNow = last && (d === 1 ? last.c > last.ema : last.c < last.ema);
      const gappedThrough = d === 1 ? b.o < z.lo : b.o > z.hi;
      if (pos || !inEntry || !trendNow || nT >= SD.maxTrades || gappedThrough || i + 1 >= bars.length) continue;

      const limit = d === 1 ? z.hi : z.lo;
      const entry = d === 1 ? Math.min(b.o, limit) : Math.max(b.o, limit);   // better fill if it opened inside the zone
      const stop = roundTick(d === 1 ? z.lo - SD.stopBufTicks * TICK : z.hi + SD.stopBufTicks * TICK);
      const risk = (entry - stop) * d;
      const target = rr === 'push' ? roundTick(z.ext) : roundTick(entry + d * rr * risk);
      if (risk <= 0 || (target - entry) * d <= 0) continue;
      nT++;
      const p = {
        dir: d, entryIdx: i + 1, date: b.ny.date,
        signalTime: `${z.baseTime.date} ${z.baseTime.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
        entry, stop, target,
        setup: `${d === 1 ? 'demand' : 'supply'} zone ${z.lo.toFixed(2)}-${z.hi.toFixed(2)}, push ${d === 1 ? 'high' : 'low'} ${z.ext.toFixed(2)}`,
      };
      // the fill bar itself: if it also reached the stop, assume the stop was hit (worst case)
      if (d === 1 ? b.l <= stop : b.h >= stop) {
        const exit = stop - d * SLIP;
        const pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
        trades.push({ ...p, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (fill bar)', ambiguous: false, pnl, pnlBest: pnl });
      } else pos = p;
    }
  }
  return trades;
}

// ---------- Strategy 4: Overnight high/low break & retest ----------
// Overnight range = high/low from 4 PM to 9:30 AM ET (measured on the base bars).
// Signals on 5-minute candles; trades simulated on the base bars (1m or 5m).
const ONR = {
  tfMin: 5, retestTolAtr: 0.25, wickPct: 50, maxStopAtr: 3, stopBufTicks: 1,
  entryStart: '09:30', entryEnd: '15:00', flatTime: '15:55',
};
function runON(bars, { rr, trend, stopMode = 'tight' }) {
  const c5 = aggregate(bars, ONR.tfMin);
  for (const x of c5) x.ny = nyTime(x.t);
  const sMin = toMins(ONR.entryStart), eMin = toMins(ONR.entryEnd), fMin = toMins(ONR.flatTime);
  const trades = [];
  let k = 0, pos = null;
  let onH = -Infinity, onL = Infinity, onStartDate = null;   // overnight range being built
  let lvlH = null, lvlL = null, rangeDate = null;            // frozen range for today's session
  let phase = 'wait', dir = 0, level = null, done = false, dayOf = null;

  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    // build the overnight range: starts at the first bar at/after 4 PM, runs until 9:30
    if (b.ny.mins >= 960 && onStartDate !== b.ny.date) { onStartDate = b.ny.date; onH = -Infinity; onL = Infinity; }
    if ((b.ny.mins >= 960 || b.ny.mins < RTH_OPEN) && onStartDate) { onH = Math.max(onH, b.h); onL = Math.min(onL, b.l); }
    if (b.ny.mins >= RTH_OPEN && b.ny.mins < 960 && rangeDate !== b.ny.date) {
      rangeDate = b.ny.date;
      lvlH = Number.isFinite(onH) ? onH : null; lvlL = Number.isFinite(onL) ? onL : null;
      onStartDate = null;                                     // next overnight starts at 4 PM
    }

    // process 5-minute candles that finished before this bar starts
    while (k < c5.length && c5[k].end <= b.t) {
      const x = c5[k++];
      // "close" stop mode (his rule): a 5-min candle CLOSING back through the level -> exit at the next bar
      if (pos && pos.stopMode === 'close' && x.end > pos.entryT &&
          (pos.dir === 1 ? x.c < pos.level : x.c > pos.level)) pos.exitNext = true;
      if (x.ny.date !== dayOf) { dayOf = x.ny.date; phase = 'wait'; dir = 0; level = null; done = false; }
      const inEntry = x.ny.mins >= sMin && x.ny.mins < eMin && x.ny.date === rangeDate;
      if (!inEntry || done || pos || lvlH == null || k < SD.emaLen) continue;
      const range = x.h - x.l;
      if (range <= 0) continue;

      if (phase === 'broke') {
        // closed back through the level before a valid retest -> setup failed, start over
        if (dir === 1 ? x.c < level : x.c > level) { phase = 'wait'; dir = 0; }
        else {
          const tol = ONR.retestTolAtr * x.atr;
          const touched = dir === 1 ? x.l <= level + tol : x.h >= level - tol;
          const wick = dir === 1 ? Math.min(x.o, x.c) - x.l : x.h - Math.max(x.o, x.c);
          const bullish = dir === 1 ? (x.c > x.o || wick >= range * ONR.wickPct / 100) : (x.c < x.o || wick >= range * ONR.wickPct / 100);
          const closesRight = dir === 1 ? x.c > level : x.c < level;
          if (touched && bullish && closesRight) {
            done = true;                                     // one trade per day
            const entry = b.o + dir * SLIP;
            const stop = roundTick(dir === 1 ? Math.min(x.l, level) - ONR.stopBufTicks * TICK : Math.max(x.h, level) + ONR.stopBufTicks * TICK);
            const risk = (entry - stop) * dir;
            if (risk <= 0 || risk > ONR.maxStopAtr * x.atr || i + 1 >= bars.length) continue;
            // targets are always measured from the tight stop distance, so both stop modes are comparable.
            // In "close" mode the hard stop becomes a wider emergency stop: 1 average candle beyond the level.
            const emergency = roundTick(dir === 1 ? Math.min(stop, level - x.atr) : Math.max(stop, level + x.atr));
            pos = {
              dir, entryIdx: i, date: b.ny.date, entryT: b.t, level, stopMode, exitNext: false,
              signalTime: `${x.ny.date} ${x.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
              entry, stop: stopMode === 'close' ? emergency : stop, target: roundTick(entry + dir * rr * risk),
              setup: `${dir === 1 ? 'retest of overnight HIGH' : 'retest of overnight LOW'} ${level.toFixed(2)} (range ${lvlL.toFixed(2)}-${lvlH.toFixed(2)})`,
            };
            continue;
          }
        }
      }
      if (phase === 'wait') {
        const strongUp = x.c > lvlH && x.c > x.o && (x.c - x.l) >= range * 2 / 3 && range >= x.atr;
        const strongDn = x.c < lvlL && x.c < x.o && (x.h - x.c) >= range * 2 / 3 && range >= x.atr;
        const okUp = trend === 'none' || x.c > x.ema, okDn = trend === 'none' || x.c < x.ema;
        if (strongUp && okUp) { phase = 'broke'; dir = 1; level = lvlH; }
        else if (strongDn && okDn) { phase = 'broke'; dir = -1; level = lvlL; }
      }
    }

    if (pos && i >= pos.entryIdx) {
      let t = null;
      if (pos.exitNext) {
        const exit = b.o - pos.dir * SLIP;
        const pnl = (exit - pos.entry) * pos.dir * POINT_VALUE - COMMISSION_RT;
        t = { ...pos, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'closed back through level', ambiguous: false, pnl, pnlBest: pnl };
      } else t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
  }
  return trades;
}

// ---------- Strategy 5: London-session (3 AM - 9:30 AM) range: breakout / retest / liquidity sweep ----------
function runLDN(bars, { rr, mode, rangeStart = '03:00', rangeEnd = '09:30', tag = '3AM' }) {
  const c5 = aggregate(bars, 5);
  for (const x of c5) x.ny = nyTime(x.t);
  const rStart = toMins(rangeStart), rEnd = toMins(rangeEnd);
  const sMin = rEnd, eMin = toMins('15:00'), fMin = toMins('15:55');
  const trades = [];
  let k = 0, pos = null;
  let rH = -Infinity, rL = Infinity, rDate = null;           // range being built (3:00-9:30)
  let lvlH = null, lvlL = null, lvlDate = null;              // frozen range for today's session
  let dayOf = null, done = false, phase = 'wait', dir = 0, level = null;
  let swUp = null, swDn = null, swUpDead = false, swDnDead = false;

  const open = (i, b, x, d, stop, setup) => {
    done = true;
    const entry = b.o + d * SLIP;
    stop = roundTick(stop);
    const risk = (entry - stop) * d;
    if (risk <= 0 || risk > ONR.maxStopAtr * x.atr || i + 1 >= bars.length) return;
    pos = {
      dir: d, entryIdx: i, date: b.ny.date,
      signalTime: `${x.ny.date} ${x.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
      entry, stop, target: roundTick(entry + d * rr * risk),
      setup: `${setup} (range ${lvlL.toFixed(2)}-${lvlH.toFixed(2)})`,
    };
  };

  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.mins >= rStart && b.ny.mins < rEnd) {
      if (rDate !== b.ny.date) { rDate = b.ny.date; rH = -Infinity; rL = Infinity; }
      rH = Math.max(rH, b.h); rL = Math.min(rL, b.l);
    }
    if (b.ny.mins >= rEnd && b.ny.mins < 960 && lvlDate !== b.ny.date) {
      lvlDate = b.ny.date;
      const ok = rDate === b.ny.date && Number.isFinite(rH);
      lvlH = ok ? rH : null; lvlL = ok ? rL : null;
    }

    while (k < c5.length && c5[k].end <= b.t) {
      const x = c5[k++];
      if (x.ny.date !== dayOf) {
        dayOf = x.ny.date; done = false; phase = 'wait'; dir = 0; level = null;
        swUp = swDn = null; swUpDead = swDnDead = false;
      }
      const inEntry = x.ny.mins >= sMin && x.ny.mins < eMin && x.ny.date === lvlDate;
      if (!inEntry || done || pos || lvlH == null || k < 20) continue;
      const range = x.h - x.l;
      if (range <= 0) continue;
      const strongUp = x.c > lvlH && x.c > x.o && (x.c - x.l) >= range * 2 / 3 && range >= x.atr;
      const strongDn = x.c < lvlL && x.c < x.o && (x.h - x.c) >= range * 2 / 3 && range >= x.atr;

      if (mode === 'breakout') {
        if (strongUp) open(i, b, x, 1, x.l - TICK, `breakout above ${tag} high ${lvlH.toFixed(2)}`);
        else if (strongDn) open(i, b, x, -1, x.h + TICK, `breakout below ${tag} low ${lvlL.toFixed(2)}`);
        continue;
      }

      if (mode === 'retest') {
        if (phase === 'broke') {
          if (dir === 1 ? x.c < level : x.c > level) { phase = 'wait'; dir = 0; }
          else {
            const tol = ONR.retestTolAtr * x.atr;
            const touched = dir === 1 ? x.l <= level + tol : x.h >= level - tol;
            const wick = dir === 1 ? Math.min(x.o, x.c) - x.l : x.h - Math.max(x.o, x.c);
            const bullish = dir === 1 ? (x.c > x.o || wick >= range / 2) : (x.c < x.o || wick >= range / 2);
            if (touched && bullish && (dir === 1 ? x.c > level : x.c < level)) {
              open(i, b, x, dir, dir === 1 ? Math.min(x.l, level) - TICK : Math.max(x.h, level) + TICK,
                `retest of ${tag} ${dir === 1 ? 'high' : 'low'} ${level.toFixed(2)}`);
              continue;
            }
          }
        }
        if (phase === 'wait') {
          if (strongUp) { phase = 'broke'; dir = 1; level = lvlH; }
          else if (strongDn) { phase = 'broke'; dir = -1; level = lvlL; }
        }
        continue;
      }

      // mode === 'sweep': poke beyond a level, then close back inside within 3 candles -> fade it
      if (!swUpDead && x.h > lvlH) {
        if (!swUp) swUp = { n: 0, ext: x.h }; else swUp.ext = Math.max(swUp.ext, x.h);
        if (x.c < lvlH) { open(i, b, x, -1, swUp.ext + TICK, `sweep of ${tag} high ${lvlH.toFixed(2)}, reclaimed`); continue; }
        if (++swUp.n > 3) swUpDead = true;                     // held above too long: a real breakout, not a sweep
      }
      if (!swDnDead && x.l < lvlL) {
        if (!swDn) swDn = { n: 0, ext: x.l }; else swDn.ext = Math.min(swDn.ext, x.l);
        if (x.c > lvlL) { open(i, b, x, 1, swDn.ext - TICK, `sweep of ${tag} low ${lvlL.toFixed(2)}, reclaimed`); continue; }
        if (++swDn.n > 3) swDnDead = true;
      }
    }

    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
  }
  return trades;
}

// ---------- Strategy 6: Two-legged pullback to the 21 EMA in a trend ("High 2 / Low 2") ----------
// Signals on the base bars themselves: 5-min chart by default, 1-min chart with "1m".
const H2 = { emaLen: 21, atrLen: 14, slopeBars: 10, trendLook: 20, trendPct: 0.7, touchAtr: 0.25,
  maxStopAtr: 3, entryStart: '09:30', entryEnd: '15:30', flatTime: '15:55', maxTrades: 3 };
function runH2(bars, { rr }) {
  const kE = 2 / (H2.emaLen + 1);
  let e = null;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    e = e == null ? b.c : b.c * kE + e * (1 - kE);
    b.e21 = e;
    const from = Math.max(0, i - H2.atrLen + 1);
    let s = 0; for (let j = from; j <= i; j++) s += bars[j].h - bars[j].l;
    b.atr2 = s / (i - from + 1);
  }
  // mirror prices for shorts so one state machine handles both directions
  const M = (x, d) => d === 1 ? { h: x.h, l: x.l, o: x.o, c: x.c, e: x.e21 } : { h: -x.l, l: -x.h, o: -x.o, c: -x.c, e: -x.e21 };
  const sMin = toMins(H2.entryStart), eMin = toMins(H2.entryEnd), fMin = toMins(H2.flatTime);
  const fresh = () => ({ count: 0, inPB: false, secondLeg: false, touched: false });
  const st = { 1: fresh(), [-1]: fresh() };
  const trades = [];
  let pos = null, sig = null, day = null, nT = 0;

  for (let i = H2.trendLook + H2.slopeBars; i < bars.length; i++) {
    const b = bars[i], p = bars[i - 1];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; st[1] = fresh(); st[-1] = fresh(); }

    // 1) manage an open position
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }

    // 2) a pending stop-entry order from the previous bar's signal (valid for this bar only)
    if (sig && i === sig.idx + 1) {
      const d = sig.d, trigger = d === 1 ? sig.h + TICK : sig.l - TICK;
      const inHours = b.ny.mins >= sMin && b.ny.mins < fMin && b.ny.date === sig.date;
      if (!pos && inHours && (d === 1 ? b.h >= trigger : b.l <= trigger)) {
        const entry = (d === 1 ? Math.max(b.o, trigger) : Math.min(b.o, trigger)) + d * SLIP;
        const stop = roundTick(d === 1 ? sig.l - TICK : sig.h + TICK);
        const risk = (entry - stop) * d;
        if (risk > 0 && risk <= H2.maxStopAtr * sig.atr) {
          nT++;
          const p0 = {
            dir: d, entryIdx: i + 1, date: b.ny.date,
            signalTime: `${sig.date} ${sig.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
            entry, stop, target: roundTick(entry + d * rr * risk),
            setup: `${d === 1 ? 'High 2 (long)' : 'Low 2 (short)'} signal bar ${sig.l.toFixed(2)}-${sig.h.toFixed(2)}, EMA21 ${sig.e.toFixed(2)}`,
          };
          if (d === 1 ? b.l <= stop : b.h >= stop) {            // entry bar also hit the stop: count as a loss
            const exit = stop - d * SLIP, pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
            trades.push({ ...p0, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (entry bar)', ambiguous: false, pnl, pnlBest: pnl });
          } else pos = p0;
        }
      }
      sig = null;
    }

    // 3) update the pullback state for each direction and look for a new signal bar
    for (const d of [1, -1]) {
      const s = st[d], mb = M(b, d), mp = M(p, d);
      let hiN = -Infinity;
      for (let j = i - H2.trendLook; j < i; j++) hiN = Math.max(hiN, M(bars[j], d).h);
      if (mb.h >= hiN) { st[d] = fresh(); continue; }                       // new trend high: no pullback yet
      if (mb.h < mp.h) { s.inPB = true; if (s.count >= 1) s.secondLeg = true; }
      else if (mb.h > mp.h && s.inPB && !s.secondLeg) s.count = 1;         // end of leg 1 (the "High 1")
      if (s.inPB && mb.l <= mb.e + H2.touchAtr * b.atr2) s.touched = true;

      const rangeB = mb.h - mb.l;
      const strong = rangeB > 0 && mb.c > mb.o && (mb.c - mb.l) >= rangeB * 2 / 3 && (mb.c - mb.o) >= rangeB / 2;
      const emaSlope = (M(b, d).e - M(bars[i - H2.slopeBars], d).e) > 0;
      let above = 0; for (let j = i - H2.trendLook + 1; j <= i; j++) if (M(bars[j], d).c > M(bars[j], d).e) above++;
      const trending = emaSlope && above >= H2.trendPct * H2.trendLook;
      const inEntry = b.ny.mins >= sMin && b.ny.mins < eMin;
      if (s.secondLeg && s.touched && strong && trending && inEntry && !pos && !sig && nT < H2.maxTrades) {
        sig = { d, idx: i, h: b.h, l: b.l, e: b.e21, atr: b.atr2, date: b.ny.date, hm: b.ny.hm };
        st[d] = fresh();
      } else if (s.secondLeg && mb.h > mp.h && !strong) {
        // second leg ended without a strong signal bar -> setup is stale
        st[d] = fresh();
      }
    }
  }
  return trades;
}

// ---------- Strategy 7: Displacement ORB (15-min range) + demand/supply zone entry + session filter ----------
const DO = { orEnd: '09:45', entryEnd: '12:00', flatTime: '15:55', pushBars: 3, pushAtr: 2, maxZoneAtr: 1.5 };
function runDORB(bars, { rr, filter }) {
  const c5 = aggregate(bars, 5);
  for (const x of c5) x.ny = nyTime(x.t);
  const orEndM = toMins(DO.orEnd), eMin = toMins(DO.entryEnd), fMin = toMins(DO.flatTime);
  const LON = 180;                                             // 3:00 AM
  const trades = [];
  let k = 0, pos = null;
  // session tracking (base bars)
  let aH = -Infinity, aL = Infinity, aStart = null;            // Asia: 6 PM - 3 AM
  let lO = null, lC = null, lH = -Infinity, lL = Infinity, lDate = null; // London: 3 AM - 9:30
  let allowed = 0, allowDate = null, sessNote = '';
  // day state
  let day = null, orH = -Infinity, orL = Infinity, zone = null, done = false;

  for (let i = 0; i < bars.length; i++) {
    const b = bars[i], m = b.ny.mins;
    if (m >= 1080 && aStart !== b.ny.date) { aStart = b.ny.date; aH = -Infinity; aL = Infinity; }
    if ((m >= 1080 || m < LON) && aStart) { aH = Math.max(aH, b.h); aL = Math.min(aL, b.l); }
    if (m >= LON && m < RTH_OPEN) {
      if (lDate !== b.ny.date) { lDate = b.ny.date; lO = b.o; lH = -Infinity; lL = Infinity; }
      lH = Math.max(lH, b.h); lL = Math.min(lL, b.l); lC = b.c;
    }
    if (m >= RTH_OPEN && m < 960 && allowDate !== b.ny.date) {
      allowDate = b.ny.date; allowed = 0; sessNote = 'no session data';
      if (lDate === b.ny.date && Number.isFinite(aH)) {
        const lonDir = Math.sign(lC - lO), both = lH > aH && lL < aL;
        allowed = both ? lonDir : -lonDir;
        sessNote = `London ${lonDir > 0 ? 'up' : lonDir < 0 ? 'down' : 'flat'}${both ? ', swept both Asia sides -> continuation' : ' -> NY reversal'}`;
      }
      aStart = null;
    }
    if (b.ny.date !== day) { day = b.ny.date; orH = -Infinity; orL = Infinity; zone = null; done = false; }
    if (m >= RTH_OPEN && m < orEndM) { orH = Math.max(orH, b.h); orL = Math.min(orL, b.l); }

    // process finished 5-min candles: look for displacement out of the range, invalidate zones
    while (k < c5.length && c5[k].end <= b.t) {
      const x = c5[k];
      if (zone && !zone.dead && (zone.dir === 1 ? x.c < zone.lo : x.c > zone.hi)) zone.dead = true;
      if (!zone && !done && k >= 20 && x.ny.date === day && x.ny.mins >= orEndM && x.ny.mins < eMin && Number.isFinite(orH)) {
        const d = x.c > x.o ? 1 : x.c < x.o ? -1 : 0;
        if (d) {
          let s = k;
          while (s - 1 >= 0 && (d === 1 ? c5[s - 1].c > c5[s - 1].o : c5[s - 1].c < c5[s - 1].o)) s--;
          const runLen = k - s + 1, move = (x.c - c5[s].o) * d, base = c5[s - 1];
          const outside = d === 1 ? x.c > orH : x.c < orL;
          const dirOk = filter === 'off' || allowed === d;
          if (runLen >= DO.pushBars && move >= DO.pushAtr * x.atr && outside && dirOk && base &&
              (base.h - base.l) > 0 && (base.h - base.l) <= DO.maxZoneAtr * x.atr) {
            zone = { dir: d, lo: base.l, hi: base.h, dead: false, created: x.ny.hm };
          }
        }
      }
      k++;
    }

    // manage an open position
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }

    // first return to the zone -> limit entry at the zone edge
    if (zone && !zone.dead && !pos && !done) {
      if (m >= eMin) { zone.dead = true; continue; }
      const d = zone.dir;
      const touched = d === 1 ? b.l <= zone.hi : b.h >= zone.lo;
      if (touched) {
        done = true; zone.dead = true;
        if (d === 1 ? b.o < zone.lo : b.o > zone.hi) continue;            // gapped through the zone
        const limit = d === 1 ? zone.hi : zone.lo;
        const entry = d === 1 ? Math.min(b.o, limit) : Math.max(b.o, limit);
        const stop = roundTick(d === 1 ? zone.lo - TICK : zone.hi + TICK);
        const risk = (entry - stop) * d;
        if (risk <= 0 || i + 1 >= bars.length) continue;
        const p0 = {
          dir: d, entryIdx: i + 1, date: b.ny.date,
          signalTime: `${b.ny.date} ${zone.created}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
          entry, stop, target: roundTick(entry + d * rr * risk),
          setup: `${d === 1 ? 'demand' : 'supply'} zone ${zone.lo.toFixed(2)}-${zone.hi.toFixed(2)} after displacement out of 9:30-9:45 range ${orL.toFixed(2)}-${orH.toFixed(2)}; ${sessNote}`,
        };
        if (d === 1 ? b.l <= stop : b.h >= stop) {
          const exit = stop - d * SLIP, pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
          trades.push({ ...p0, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (fill bar)', ambiguous: false, pnl, pnlBest: pnl });
        } else pos = p0;
      }
    }
  }
  return trades;
}

// ---------- Strategy 8: First-bar reversal (fade a big 9:30 bar once price crosses back past its midpoint) ----------
const FBR = { bigMult: 1.2, lookbackDays: 10, signalEnd: '09:45', flatTime: '15:55' };
function runFBR(bars, { rr }) {
  const sigEnd = toMins(FBR.signalEnd), fMin = toMins(FBR.flatTime), fbEnd = RTH_OPEN + 5;
  const trades = [], hist = [];
  let pos = null, day = null, fb = null, done = false, big = false;

  for (let i = 0; i < bars.length; i++) {
    const b = bars[i], m = b.ny.mins;
    if (b.ny.date !== day) {
      if (fb) hist.push(fb.h - fb.l);                         // remember yesterday's opening-bar size
      day = b.ny.date; fb = null; done = false; big = false;
    }
    // build the 9:30-9:35 opening bar from the base bars
    if (m >= RTH_OPEN && m < fbEnd) {
      if (!fb) fb = { o: b.o, h: b.h, l: b.l, c: b.c };
      else { fb.h = Math.max(fb.h, b.h); fb.l = Math.min(fb.l, b.l); fb.c = b.c; }
    }
    if (m === fbEnd && fb && hist.length >= FBR.lookbackDays) {
      const recent = hist.slice(-FBR.lookbackDays), avg = recent.reduce((a, x) => a + x, 0) / recent.length;
      big = (fb.h - fb.l) >= FBR.bigMult * avg && fb.c !== fb.o;
      fb.avg = avg;
    }

    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }

    // signal window: the next two 5-min bars (9:35-9:45)
    if (big && !done && !pos && m >= fbEnd && m < sigEnd && b.ny.date === day) {
      const d = fb.c < fb.o ? 1 : -1;                          // fade the opening bar's direction
      const mid = (fb.h + fb.l) / 2;
      const crossed = d === 1 ? b.h >= mid : b.l <= mid;
      if (crossed) {
        done = true;
        const entry = (d === 1 ? Math.max(b.o, mid) : Math.min(b.o, mid)) + d * SLIP;
        const stop = roundTick(d === 1 ? fb.l - TICK : fb.h + TICK);
        const risk = (entry - stop) * d;
        if (risk <= 0 || i + 1 >= bars.length) continue;
        const p0 = {
          dir: d, entryIdx: i + 1, date: b.ny.date,
          signalTime: `${b.ny.date} 09:30`, entryTime: `${b.ny.date} ${b.ny.hm}`,
          entry, stop, target: roundTick(entry + d * rr * risk),
          setup: `opening bar ${fb.o.toFixed(2)}->${fb.c.toFixed(2)} range ${(fb.h - fb.l).toFixed(2)} (10-day avg ${fb.avg.toFixed(2)}), midpoint ${mid.toFixed(2)}`,
        };
        if (d === 1 ? b.l <= stop : b.h >= stop) {
          const exit = stop - d * SLIP, pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
          trades.push({ ...p0, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (entry bar)', ambiguous: false, pnl, pnlBest: pnl });
        } else pos = p0;
      }
    }
  }
  return trades;
}

// ---------- Strategy 9: Previous-day high/low break & retest with a daily 9/21 EMA trend filter ----------
function runPDH(bars, { rr, filter }) {
  // daily regular-session stats (9:30-16:00) from the base bars
  const days = [], byDate = new Map();
  for (const b of bars) {
    if (b.ny.mins < RTH_OPEN || b.ny.mins >= 960) continue;
    let d = byDate.get(b.ny.date);
    if (!d) { d = { date: b.ny.date, h: b.h, l: b.l, c: b.c }; byDate.set(b.ny.date, d); days.push(d); }
    else { d.h = Math.max(d.h, b.h); d.l = Math.min(d.l, b.l); d.c = b.c; }
  }
  let e9 = null, e21 = null;
  days.forEach((d, i) => {
    e9 = e9 == null ? d.c : d.c * (2 / 10) + e9 * (8 / 10);
    e21 = e21 == null ? d.c : d.c * (2 / 22) + e21 * (20 / 22);
    d.trend = i < 20 ? null : (d.c > e9 && d.c > e21 ? 1 : d.c < e9 && d.c < e21 ? -1 : 0);
    d.prev = days[i - 1] || null;
  });

  const c5 = aggregate(bars, 5);
  for (const x of c5) x.ny = nyTime(x.t);
  const eMin = toMins('15:00'), fMin = toMins('15:55');
  const trades = [];
  let k = 0, pos = null, dayOf = null, done = false, phase = 'wait', dir = 0, level = null, today = null;

  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    while (k < c5.length && c5[k].end <= b.t) {
      const x = c5[k++];
      if (x.ny.date !== dayOf) { dayOf = x.ny.date; done = false; phase = 'wait'; dir = 0; level = null; today = byDate.get(dayOf) || null; }
      const p = today && today.prev;
      if (!p || p.trend == null || done || pos || x.ny.mins < RTH_OPEN || x.ny.mins >= eMin || k < 20) continue;
      const lvlH = p.h, lvlL = p.l, range = x.h - x.l;
      if (range <= 0) continue;
      const okUp = filter === 'off' || p.trend === 1, okDn = filter === 'off' || p.trend === -1;

      if (phase === 'broke') {
        if (dir === 1 ? x.c < level : x.c > level) { phase = 'wait'; dir = 0; }
        else {
          const tol = ONR.retestTolAtr * x.atr;
          const touched = dir === 1 ? x.l <= level + tol : x.h >= level - tol;
          const wick = dir === 1 ? Math.min(x.o, x.c) - x.l : x.h - Math.max(x.o, x.c);
          const good = dir === 1 ? (x.c > x.o || wick >= range / 2) : (x.c < x.o || wick >= range / 2);
          if (touched && good && (dir === 1 ? x.c > level : x.c < level)) {
            done = true;
            const entry = b.o + dir * SLIP;
            const stop = roundTick(dir === 1 ? Math.min(x.l, level) - TICK : Math.max(x.h, level) + TICK);
            const risk = (entry - stop) * dir;
            if (risk > 0 && risk <= ONR.maxStopAtr * x.atr && i + 1 < bars.length) {
              pos = {
                dir, entryIdx: i, date: b.ny.date,
                signalTime: `${x.ny.date} ${x.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
                entry, stop, target: roundTick(entry + dir * rr * risk),
                setup: `retest of prev-day ${dir === 1 ? 'HIGH' : 'LOW'} ${level.toFixed(2)}; daily trend ${p.trend === 1 ? 'up' : p.trend === -1 ? 'down' : 'neutral'}`,
              };
            }
            continue;
          }
        }
      }
      if (phase === 'wait') {
        const strongUp = x.c > lvlH && x.c > x.o && (x.c - x.l) >= range * 2 / 3 && range >= x.atr;
        const strongDn = x.c < lvlL && x.c < x.o && (x.h - x.c) >= range * 2 / 3 && range >= x.atr;
        if (strongUp && okUp) { phase = 'broke'; dir = 1; level = lvlH; }
        else if (strongDn && okDn) { phase = 'broke'; dir = -1; level = lvlL; }
      }
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
  }
  return trades;
}

// ---------- Strategy 10: Market-structure change of character + fair value gap midpoint entry ----------
// 15-min structure gives the bias; the trading chart (base bars: 1m or 5m) gives the change of character,
// the fair value gap and the swing ("liquidity inflection") level for the stop.
function makeStructure(k = 2) {
  return {
    hi: null, lo: null, state: 0,
    step(arr, i) {
      const j = i - k;
      if (j - k >= 0) {
        let isH = true, isL = true;
        for (let t = j - k; t <= j + k; t++) {
          if (t === j) continue;
          if (arr[t].h >= arr[j].h) isH = false;
          if (arr[t].l <= arr[j].l) isL = false;
        }
        if (isH) this.hi = { p: arr[j].h, used: false };
        if (isL) this.lo = { p: arr[j].l, used: false };
      }
      const x = arr[i];
      if (this.hi && !this.hi.used && x.c > this.hi.p) {
        this.hi.used = true; const ev = this.state === 1 ? 'bos+' : 'choch+'; this.state = 1; return ev;
      }
      if (this.lo && !this.lo.used && x.c < this.lo.p) {
        this.lo.used = true; const ev = this.state === -1 ? 'bos-' : 'choch-'; this.state = -1; return ev;
      }
      return '';
    },
  };
}
const CS = { sigStart: '09:30', sigEnd: '12:00', flatTime: '15:55', maxTrades: 2, orderBars: 30, minGapAtr: 0.2, maxStopAtr: 6 };
function runCS(bars, { rr, be }) {
  for (let i = 0; i < bars.length; i++) {                     // average bar size on the trading chart
    const from = Math.max(0, i - 13);
    let s = 0; for (let j = from; j <= i; j++) s += bars[j].h - bars[j].l;
    bars[i].atrCS = s / (i - from + 1);
  }
  const h15 = aggregate(bars, 15);
  const htf = makeStructure(2), ltf = makeStructure(2);
  const sMin = toMins(CS.sigStart), eMin = toMins(CS.sigEnd), fMin = toMins(CS.flatTime);
  const trades = [];
  let k = 0, pos = null, order = null, day = null, nT = 0;

  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; order = null; }
    while (k < h15.length && h15[k].end <= b.t) { htf.step(h15, k); k++; }

    // 1) manage open position (breakeven move takes effect from the bar after +2R is reached)
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
      else if (pos.be && !pos.beDone && (pos.dir === 1 ? b.h >= pos.beTrig : b.l <= pos.beTrig)) { pos.stop = pos.entry; pos.beDone = true; }
    }

    // 2) pending limit order at the gap midpoint
    if (order && !pos) {
      const d = order.dir, inWin = b.ny.mins >= sMin && b.ny.mins < eMin;
      if (!inWin || i > order.expires || (d === 1 ? b.l <= order.stop : b.h >= order.stop) && !(d === 1 ? b.o > order.limit && b.l <= order.limit : b.o < order.limit && b.h >= order.limit)) {
        // expired, out of hours, or price ran through the stop level before filling
        if (!inWin || i > order.expires || (d === 1 ? b.o <= order.stop : b.o >= order.stop)) order = null;
      }
      if (order && (d === 1 ? b.l <= order.limit : b.h >= order.limit)) {
        const entry = d === 1 ? Math.min(b.o, order.limit) : Math.max(b.o, order.limit);
        const risk = (entry - order.stop) * d;
        const o = order; order = null;
        if (risk > 0) {
          nT++;
          const p0 = {
            dir: d, entryIdx: i + 1, date: b.ny.date, signalTime: o.signalTime, entryTime: `${b.ny.date} ${b.ny.hm}`,
            entry, stop: o.stop, target: roundTick(entry + d * rr * risk), be, beDone: false, beTrig: entry + d * 2 * risk,
            setup: o.setup,
          };
          if (d === 1 ? b.l <= o.stop : b.h >= o.stop) {
            const exit = o.stop - d * SLIP, pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
            trades.push({ ...p0, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (fill bar)', ambiguous: false, pnl, pnlBest: pnl });
          } else pos = p0;
        }
      }
    }

    // 3) structure on the trading chart, at this bar's close
    const ev = ltf.step(bars, i);
    const inSig = b.ny.mins >= sMin && b.ny.mins < eMin;
    if (!inSig || pos || order || nT >= CS.maxTrades || i < 4) continue;
    const d = ev === 'choch+' ? 1 : ev === 'choch-' ? -1 : 0;
    if (!d || htf.state !== d) continue;
    const swing = d === 1 ? ltf.lo : ltf.hi;                     // the liquidity inflection level
    if (!swing) continue;
    let gap = null;
    for (const c of [i, i - 1]) {                                // gap formed by the breaking move
      const a = bars[c - 2], z = bars[c];
      const lo = d === 1 ? a.h : z.h, hi = d === 1 ? z.l : a.l;
      if (hi - lo >= CS.minGapAtr * b.atrCS) { gap = { lo, hi }; break; }
    }
    if (!gap) continue;
    const limit = roundTick((gap.lo + gap.hi) / 2);
    const stop = roundTick(d === 1 ? swing.p - TICK : swing.p + TICK);
    const risk = (limit - stop) * d;
    if (risk <= 0 || risk > CS.maxStopAtr * b.atrCS) continue;
    order = {
      dir: d, limit, stop, expires: i + CS.orderBars, signalTime: `${b.ny.date} ${b.ny.hm}`,
      setup: `${d === 1 ? 'bullish' : 'bearish'} CHoCH with 15m bias; FVG ${gap.lo.toFixed(2)}-${gap.hi.toFixed(2)}, swing ${swing.p.toFixed(2)}`,
    };
  }
  return trades;
}

// ---------- Strategy 11: SLC = Structure (4H trend) + Level (5-min supply/demand) + Confirmation (stochastic) ----------
// Structure: 4-hour swings. Higher high + higher low = uptrend (longs only); lower high + lower low = downtrend
// (shorts only); anything else = consolidation (no trades).
// Level: on the 5-min chart, the last candle before a sharp move (2+ candles in a row moving 2x the average
// candle size). Supply above (shorts), demand below (longs).
// Confirmation: while price is tapping the zone, the stochastic %K goes above 80 and crosses back below it
// (shorts) / below 20 and back above it (longs). Enter at the next bar's open, stop 1 tick past the zone, 2R target.
// "both" mode also allows a zone that was broken ONCE, then reclaimed, then retested.
const SLC = {
  htfMin: 240, swingK: 2, pushBars: 2, pushAtr: 2, maxZoneAtr: 1.5, expiryHours: 48,
  confirmBars: 6, ob: 80, os: 20, maxStopAtr: 3, stopBufTicks: 1,
  entryStart: '09:30', entryEnd: '15:30', flatTime: '15:55', maxTrades: 2,
};
function runSLC(bars, { rr, stochLen, mode }) {
  const c5 = aggregate(bars, 5), h4 = aggregate(bars, SLC.htfMin);
  const K = [], raw = [];
  for (let i = 0; i < c5.length; i++) {                      // stochastic %K (n, 3) on 5-min candles
    let hh = -Infinity, ll = Infinity;
    for (let j = Math.max(0, i - stochLen + 1); j <= i; j++) { hh = Math.max(hh, c5[j].h); ll = Math.min(ll, c5[j].l); }
    raw[i] = hh > ll ? 100 * (c5[i].c - ll) / (hh - ll) : 50;
    K[i] = (raw[i] + (raw[i - 1] ?? raw[i]) + (raw[i - 2] ?? raw[i])) / 3;
  }
  const highs = [], lows = [];
  const trend = () => {
    if (highs.length < 2 || lows.length < 2) return 0;
    const hh = highs.at(-1) > highs.at(-2), hl = lows.at(-1) > lows.at(-2);
    return hh && hl ? 1 : !hh && !hl ? -1 : 0;
  };
  const sMin = toMins(SLC.entryStart), eMin = toMins(SLC.entryEnd), fMin = toMins(SLC.flatTime);
  const trades = [];
  let zones = [], pos = null, k = 0, k4 = 0, day = null, nT = 0;

  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; }

    // Structure: confirmed 4H swing points (2 candles each side)
    while (k4 < h4.length && h4[k4].end <= b.t) {
      const j = k4 - SLC.swingK;
      if (j - SLC.swingK >= 0) {
        let isH = true, isL = true;
        for (let t = j - SLC.swingK; t <= j + SLC.swingK; t++) {
          if (t === j) continue;
          if (h4[t].h >= h4[j].h) isH = false;
          if (h4[t].l <= h4[j].l) isL = false;
        }
        if (isH) highs.push(h4[j].h);
        if (isL) lows.push(h4[j].l);
      }
      k4++;
    }

    // Levels + confirmation on each finished 5-min candle
    let signal = null;
    while (k < c5.length && c5[k].end <= b.t) {
      const x = c5[k];
      for (const z of zones) {
        if (z.dead) continue;
        if (x.end - z.created > SLC.expiryHours * 3600) { z.dead = true; continue; }
        const d = z.dir;
        const beyond = d === -1 ? x.c > z.hi : x.c < z.lo;       // closed through the zone (broken)
        const back = d === -1 ? x.c < z.lo : x.c > z.hi;         // closed back on the trade side
        const touch = d === -1 ? x.h >= z.lo : x.l <= z.hi;
        if (z.state === 'fresh') {
          if (beyond) { if (mode === 'both' && !z.brokenOnce) { z.state = 'broken'; z.brokenOnce = true; } else z.dead = true; }
          else if (touch) { z.state = 'tapped'; z.touchK = k; }
        } else if (z.state === 'tapped') {
          if (beyond) z.dead = true;
          else if (k - z.touchK > SLC.confirmBars) z.dead = true;
        } else if (z.state === 'broken') {
          if (back) z.state = 'reclaimed';
        } else if (z.state === 'reclaimed') {
          if (beyond) z.dead = true;                               // chopped through twice: no longer valid
          else if (touch) { z.state = 'tapped'; z.touchK = k; z.retest = true; }
        }
        if (z.state === 'tapped' && !z.dead && k >= 1) {
          const cross = d === -1 ? K[k - 1] > SLC.ob && K[k] <= SLC.ob : K[k - 1] < SLC.os && K[k] >= SLC.os;
          if (cross && trend() === d) { signal = { z, x, k }; z.dead = true; }
        }
      }
      zones = zones.filter(z => !z.dead);

      // new zone: the candle right before a sharp move
      const up = x.c > x.o, dn = x.c < x.o;
      if ((up || dn) && k > SLC.swingK + 14) {
        const d = up ? 1 : -1;
        let s = k;
        while (s - 1 >= 0 && (d === 1 ? c5[s - 1].c > c5[s - 1].o : c5[s - 1].c < c5[s - 1].o)) s--;
        const runLen = k - s + 1, move = (x.c - c5[s].o) * d, base = c5[s - 1];
        const q = runLen >= SLC.pushBars && move >= SLC.pushAtr * x.atr;
        const qPrev = runLen - 1 >= SLC.pushBars && (c5[k - 1].c - c5[s].o) * d >= SLC.pushAtr * c5[k - 1].atr;
        if (q && !qPrev && base && base.h > base.l && base.h - base.l <= SLC.maxZoneAtr * x.atr) {
          zones.push({ dir: d, lo: base.l, hi: base.h, created: x.end, state: 'fresh', baseTime: nyTime(base.t) });
        }
      }
      k++;
    }

    // Entry at this bar's open after a confirmed signal
    const inEntry = b.ny.mins >= sMin && b.ny.mins < eMin;
    if (signal && !pos && inEntry && nT < SLC.maxTrades) {
      const { z, x } = signal, d = z.dir;
      const entry = b.o + d * SLIP;
      const stop = roundTick(d === 1 ? z.lo - SLC.stopBufTicks * TICK : z.hi + SLC.stopBufTicks * TICK);
      const risk = (entry - stop) * d;
      if (risk > 0 && risk <= SLC.maxStopAtr * x.atr) {
        nT++;
        const xt = nyTime(x.t);
        pos = {
          dir: d, entryIdx: i, date: b.ny.date, signalTime: `${xt.date} ${xt.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
          entry, stop, target: roundTick(entry + d * rr * risk),
          setup: `${d === 1 ? 'demand' : 'supply'} zone ${z.lo.toFixed(2)}-${z.hi.toFixed(2)} from ${z.baseTime.date} ${z.baseTime.hm}${z.retest ? ' (break & retest)' : ''}, 4H ${d === 1 ? 'uptrend' : 'downtrend'}, stoch ${K[signal.k].toFixed(0)}`,
        };
      }
    }

    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
  }
  return trades;
}

// ---------- Strategy 12: Morning scalp - break & retest of a key level, 9:30-11:00 only ----------
// Levels: first 5-min candle high/low (9:30-9:35), premarket high/low (4:00-9:30), or previous-day
// regular-session high/low. Signals on the trading chart itself (1m or 5m candles).
// Break = a candle closes beyond the level (a break that already happened premarket counts).
// Retest = a later candle comes back to the level, holds it, and closes in the trade direction
// (or leaves a rejection wick of at least half its size). Enter next candle; stop just past the
// retest candle / level; fixed R target. One trade per day. Entries until 11:00, flat at 12:00.
const SCALP = { retestTolAtr: 0.25, maxStopAtr: 3, entryEnd: '11:00', flatTime: '12:00' };
function runSCALP(bars, { rr, level }) {
  const tf = INTERVAL === '1m' ? 1 : 5;
  const cs = aggregate(bars, tf);                          // same candles, plus average candle size
  for (const x of cs) x.ny = nyTime(x.t);
  const byDate = new Map(), order = [];
  for (const b of bars) {
    let d = byDate.get(b.ny.date);
    if (!d) { d = { rth: null, pm: null, or5: null }; byDate.set(b.ny.date, d); order.push(b.ny.date); }
    const upd = key => { const r = d[key]; d[key] = r ? { h: Math.max(r.h, b.h), l: Math.min(r.l, b.l) } : { h: b.h, l: b.l }; };
    if (b.ny.mins >= RTH_OPEN && b.ny.mins < 960) upd('rth');
    if (b.ny.mins >= 240 && b.ny.mins < RTH_OPEN) upd('pm');
    if (b.ny.mins >= RTH_OPEN && b.ny.mins < RTH_OPEN + 5) upd('or5');
  }
  let prevRth = null;
  for (const dt of order) { const d = byDate.get(dt); d.prevRth = prevRth; if (d.rth) prevRth = d.rth; }

  const readyMin = level === 'or5' ? RTH_OPEN + 5 : RTH_OPEN;
  const eMin = toMins(SCALP.entryEnd), fMin = toMins(SCALP.flatTime);
  const trades = [];
  let k = 0, pos = null, dayOf = null, done = false, phase = 'wait', dir = 0, lvl = null, L = null;

  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    while (k < cs.length && cs[k].end <= b.t) {
      const x = cs[k++];
      if (x.ny.date !== dayOf) { dayOf = x.ny.date; done = false; phase = 'wait'; dir = 0; lvl = null; L = null; }
      if (done || pos || x.ny.mins < readyMin || x.ny.mins >= eMin || k < 20) continue;
      if (!L) {
        const d = byDate.get(dayOf);
        L = level === 'pdh' ? d.prevRth : d[level];
        if (!L) { done = true; continue; }
        // a break that already happened before the level was ready (e.g. premarket above the prev-day high)
        const before = cs[k - 2];
        if (before && before.c > L.h) { phase = 'broke'; dir = 1; lvl = L.h; }
        else if (before && before.c < L.l) { phase = 'broke'; dir = -1; lvl = L.l; }
      }
      const range = x.h - x.l;
      if (range <= 0) continue;
      if (phase === 'broke') {
        if (dir === 1 ? x.c < lvl : x.c > lvl) { phase = 'wait'; dir = 0; }   // closed back through: break failed
        else {
          const tol = SCALP.retestTolAtr * x.atr;
          const touched = dir === 1 ? x.l <= lvl + tol : x.h >= lvl - tol;
          const wick = dir === 1 ? Math.min(x.o, x.c) - x.l : x.h - Math.max(x.o, x.c);
          const good = dir === 1 ? (x.c > x.o || wick >= range / 2) : (x.c < x.o || wick >= range / 2);
          if (touched && good) {
            done = true;
            const entry = b.o + dir * SLIP;
            const stop = roundTick(dir === 1 ? Math.min(x.l, lvl) - TICK : Math.max(x.h, lvl) + TICK);
            const risk = (entry - stop) * dir;
            if (risk > 0 && risk <= SCALP.maxStopAtr * x.atr && i + 1 < bars.length) {
              pos = {
                dir, entryIdx: i, date: b.ny.date,
                signalTime: `${x.ny.date} ${x.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
                entry, stop, target: roundTick(entry + dir * rr * risk),
                setup: `retest of ${level} ${dir === 1 ? 'high' : 'low'} ${lvl.toFixed(2)} (range ${L.l.toFixed(2)}-${L.h.toFixed(2)})`,
              };
            }
            continue;
          }
        }
      }
      if (phase === 'wait') {
        if (x.c > L.h) { phase = 'broke'; dir = 1; lvl = L.h; }
        else if (x.c < L.l) { phase = 'broke'; dir = -1; lvl = L.l; }
      }
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
  }
  return trades;
}

// ---------- Strategy 13: Engulfing candle with the trend (200 EMA + RSI 50) ----------
// Signals on the trading chart itself (1m or 5m candles).
// Long: close above the 200 EMA, RSI(14) above 50, and a bullish engulfing candle (previous candle red,
// this one green, opens at/below the previous close and closes above the previous open).
// Enter at the close (next bar's open). Stop = 2x the engulfing candle's high-low length below entry.
// Target = rr x that risk. Shorts (optional) are the mirror image.
const ENG = { emaLen: 200, rsiLen: 14, stopMult: 2, entryStart: '09:30', entryEnd: '15:30', flatTime: '15:55', maxTrades: 3 };
function runENG(bars, { rr, side }) {
  const kE = 2 / (ENG.emaLen + 1);
  let ema = null, ag = 0, al = 0;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    ema = ema == null ? b.c : b.c * kE + ema * (1 - kE);
    b.engEma = ema;
    if (i > 0) {
      const ch = b.c - bars[i - 1].c, g = Math.max(ch, 0), l = Math.max(-ch, 0);
      if (i <= ENG.rsiLen) { ag += g / ENG.rsiLen; al += l / ENG.rsiLen; }
      else { ag = (ag * (ENG.rsiLen - 1) + g) / ENG.rsiLen; al = (al * (ENG.rsiLen - 1) + l) / ENG.rsiLen; }
    }
    b.rsi = i < ENG.rsiLen ? 50 : al === 0 ? 100 : 100 - 100 / (1 + ag / al);
  }
  const sMin = toMins(ENG.entryStart), eMin = toMins(ENG.entryEnd), fMin = toMins(ENG.flatTime);
  const trades = [];
  let pos = null, day = null, nT = 0;
  for (let i = ENG.emaLen * 3; i < bars.length; i++) {
    const b = bars[i], p = bars[i - 1];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (pos || i + 1 >= bars.length || nT >= ENG.maxTrades) continue;
    if (b.ny.mins < sMin || b.ny.mins >= eMin || p.ny.date !== b.ny.date) continue;
    const bullEng = p.c < p.o && b.c > b.o && b.o <= p.c && b.c > p.o;
    const bearEng = p.c > p.o && b.c < b.o && b.o >= p.c && b.c < p.o;
    let dir = 0;
    if (bullEng && b.c > b.engEma && b.rsi > 50) dir = 1;
    else if (side === 'both' && bearEng && b.c < b.engEma && b.rsi < 50) dir = -1;
    if (!dir) continue;
    const len = b.h - b.l;
    if (len <= 0) continue;
    const nb = bars[i + 1], entry = nb.o + dir * SLIP;
    const stop = roundTick(entry - dir * ENG.stopMult * len);
    const risk = (entry - stop) * dir;
    if (risk <= 0) continue;
    nT++;
    pos = openPos(bars, i, dir, stop, roundTick(entry + dir * rr * risk), {
      setup: `${dir === 1 ? 'bullish' : 'bearish'} engulfing, candle ${len.toFixed(2)} pts, ema ${b.engEma.toFixed(2)}, rsi ${b.rsi.toFixed(0)}`,
    });
  }
  return trades;
}

// ---------- Strategy 14: Overnight (6 PM - 9:30 AM) high/low break, trim half + runner ----------
// Signals on 5-minute candles; trades simulated on the base bars. Always 2 contracts.
// Entry "retest": strong 5-min close beyond the level, then a retest candle that holds (same as onr).
// Entry "breakout": the first 5-min candle that closes beyond the level.
// Stop: his "mental stop" = a 5-min candle CLOSING back through the level (exit next bar), with a hard
// emergency stop 1 average candle beyond the level. R = distance from entry to just past the level/retest candle.
// Exits: "fixed" both contracts at 2R; "eod" sell 1 at 1R, stop to breakeven, runner held to 3:55;
// "r3" sell 1 at 1R, stop to breakeven, runner exits at 3R.
const OVN = { rangeStart: 18 * 60, entryEnd: '11:30', flatTime: '15:55', qty: 2 };
function runOVN(bars, { entryMode, manage }) {
  const c5 = aggregate(bars, 5);
  for (const x of c5) x.ny = nyTime(x.t);
  const eMin = toMins(OVN.entryEnd), fMin = toMins(OVN.flatTime);
  const trades = [];
  let k = 0, pos = null, onH = -Infinity, onL = Infinity, building = false;
  let lvlH = null, lvlL = null, rangeDate = null, phase = 'wait', dir = 0, level = null, done = false, dayOf = null;

  const close = (b, exitPx, reason, legs) => {
    // legs: array of exit prices for each remaining contract (plus already-banked pnl)
    const pnl = pos.banked + legs.reduce((a, px) => a + (px - pos.entry) * pos.dir * POINT_VALUE, 0) - OVN.qty * COMMISSION_RT;
    trades.push({ ...pos, exitTime: `${b.ny.date} ${b.ny.hm}`, exit: exitPx, reason, ambiguous: false, pnl, pnlBest: pnl });
    pos = null;
  };

  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.mins >= OVN.rangeStart && !building) { building = true; onH = -Infinity; onL = Infinity; }
    if (building && (b.ny.mins >= OVN.rangeStart || b.ny.mins < RTH_OPEN)) { onH = Math.max(onH, b.h); onL = Math.min(onL, b.l); }
    if (b.ny.mins >= RTH_OPEN && b.ny.mins < 960 && rangeDate !== b.ny.date) {
      rangeDate = b.ny.date;
      lvlH = building && Number.isFinite(onH) ? onH : null; lvlL = building && Number.isFinite(onL) ? onL : null;
      building = false;
    }

    while (k < c5.length && c5[k].end <= b.t) {
      const x = c5[k++];
      if (pos && x.end > pos.entryT && (pos.dir === 1 ? x.c < pos.level : x.c > pos.level)) pos.exitNext = true;
      if (x.ny.date !== dayOf) { dayOf = x.ny.date; phase = 'wait'; dir = 0; level = null; done = false; }
      const inEntry = x.ny.mins >= RTH_OPEN && x.ny.mins < eMin && x.ny.date === rangeDate;
      if (!inEntry || done || pos || lvlH == null || k < 50) continue;
      const range = x.h - x.l;
      if (range <= 0) continue;
      let sig = null;
      if (entryMode === 'breakout') {
        if (x.c > lvlH) sig = { d: 1, lv: lvlH, stop: Math.min(x.l, lvlH) - TICK };
        else if (x.c < lvlL) sig = { d: -1, lv: lvlL, stop: Math.max(x.h, lvlL) + TICK };
        if (sig) done = true;
      } else {
        if (phase === 'broke') {
          if (dir === 1 ? x.c < level : x.c > level) { phase = 'wait'; dir = 0; }
          else {
            const tol = ONR.retestTolAtr * x.atr;
            const touched = dir === 1 ? x.l <= level + tol : x.h >= level - tol;
            const wick = dir === 1 ? Math.min(x.o, x.c) - x.l : x.h - Math.max(x.o, x.c);
            const good = dir === 1 ? (x.c > x.o || wick >= range / 2) : (x.c < x.o || wick >= range / 2);
            if (touched && good && (dir === 1 ? x.c > level : x.c < level)) {
              done = true;
              sig = { d: dir, lv: level, stop: dir === 1 ? Math.min(x.l, level) - TICK : Math.max(x.h, level) + TICK };
            }
          }
        }
        if (!sig && phase === 'wait') {
          if (x.c > lvlH && x.c > x.o && (x.c - x.l) >= range * 2 / 3 && range >= x.atr) { phase = 'broke'; dir = 1; level = lvlH; }
          else if (x.c < lvlL && x.c < x.o && (x.h - x.c) >= range * 2 / 3 && range >= x.atr) { phase = 'broke'; dir = -1; level = lvlL; }
        }
      }
      if (!sig || i + 1 >= bars.length) continue;
      const d = sig.d, entry = b.o + d * SLIP, rStop = roundTick(sig.stop), risk = (entry - rStop) * d;
      if (risk <= 0 || risk > ONR.maxStopAtr * x.atr) continue;
      const emergency = roundTick(d === 1 ? Math.min(rStop, sig.lv - x.atr) : Math.max(rStop, sig.lv + x.atr));
      pos = {
        dir: d, entryIdx: i, date: b.ny.date, entryT: b.t, level: sig.lv, exitNext: false, risk,
        signalTime: `${x.ny.date} ${x.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
        entry, stop: emergency, target: roundTick(entry + d * (manage === 'fixed' ? 2 : 1) * risk),
        runTarget: manage === 'r3' ? roundTick(entry + d * 3 * risk) : null, trimmed: false, banked: 0,
        setup: `${entryMode} ${d === 1 ? 'above overnight HIGH' : 'below overnight LOW'} ${sig.lv.toFixed(2)} (range ${lvlL.toFixed(2)}-${lvlH.toFixed(2)})`,
      };
    }

    if (pos && i >= pos.entryIdx) {
      const d = pos.dir, left = pos.trimmed ? 1 : 2;
      const out = (px, why) => close(b, px, why, Array(left).fill(px));
      if (b.ny.mins >= fMin || b.ny.date !== pos.date) { out(b.o - d * SLIP, 'time'); continue; }
      if (pos.exitNext) { out(b.o - d * SLIP, pos.trimmed ? 'runner: closed back through level' : 'closed back through level'); continue; }
      const hitStop = d === 1 ? b.l <= pos.stop : b.h >= pos.stop;
      if (d === 1 ? b.o <= pos.stop : b.o >= pos.stop) { out(b.o - d * SLIP, 'stop (gap)'); continue; }
      if (!pos.trimmed) {
        const hitT = d === 1 ? b.h >= pos.target : b.l <= pos.target;
        if (hitStop) { out(pos.stop - d * SLIP, hitT ? 'stop (same-bar, assumed)' : 'stop'); continue; }
        if (hitT) {
          if (manage === 'fixed') { out(pos.target, 'target 2R (both)'); continue; }
          pos.trimmed = true; pos.banked = (pos.target - pos.entry) * d * POINT_VALUE;
          pos.stop = pos.entry;                                   // breakeven from the next bar on
        }
      } else {
        const hitR = pos.runTarget != null && (d === 1 ? b.h >= pos.runTarget : b.l <= pos.runTarget);
        if (hitStop) { out(pos.stop - d * SLIP, 'runner stopped at breakeven'); continue; }
        if (hitR) { out(pos.runTarget, 'runner hit 3R'); continue; }
      }
    }
  }
  return trades;
}

// ---------- Strategy 15: 8 EMA trend continuation ----------
// Signals on the trading chart itself (1m or 5m candles).
// Downtrend: at least 8 of the last 10 candles closed below the 8 EMA, the EMA is lower than 5 candles
// ago, and the last 10 candles made a lower high AND a lower low than the 10 before them.
// Signal: a candle wicks up to/over the 8 EMA (high >= EMA) but CLOSES back below it. Enter at the close.
// Stop: 1 tick above the higher of the wick and the EMA ("tight"), or that plus half an average candle
// ("cushion"). Target: rr x risk. Uptrend = mirror image.
const E8 = { len: 8, look: 10, need: 8, slopeBars: 5, atrLen: 14, maxStopAtr: 3, entryStart: '09:30', entryEnd: '15:30', flatTime: '15:55', maxTrades: 3 };
function runEMA8(bars, { rr, stopMode }) {
  const kE = 2 / (E8.len + 1);
  let ema = null;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    ema = ema == null ? b.c : b.c * kE + ema * (1 - kE);
    b.e8 = ema;
    const from = Math.max(0, i - E8.atrLen + 1);
    let sm = 0; for (let j = from; j <= i; j++) sm += bars[j].h - bars[j].l;
    b.atr8 = sm / (i - from + 1);
  }
  const sMin = toMins(E8.entryStart), eMin = toMins(E8.entryEnd), fMin = toMins(E8.flatTime);
  const trades = [];
  let pos = null, day = null, nT = 0;
  for (let i = 100; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (pos || i + 1 >= bars.length || nT >= E8.maxTrades || b.ny.mins < sMin || b.ny.mins >= eMin) continue;
    let below = 0, above = 0, hA = -Infinity, lA = Infinity, hB = -Infinity, lB = Infinity;
    for (let j = i - E8.look; j < i; j++) {
      const x = bars[j];
      if (x.c < x.e8) below++; else if (x.c > x.e8) above++;
      hA = Math.max(hA, x.h); lA = Math.min(lA, x.l);
      const y = bars[j - E8.look]; hB = Math.max(hB, y.h); lB = Math.min(lB, y.l);
    }
    const prevE = bars[i - 1].e8, oldE = bars[i - 1 - E8.slopeBars].e8;
    const down = below >= E8.need && prevE < oldE && hA < hB && lA < lB;
    const up = above >= E8.need && prevE > oldE && hA > hB && lA > lB;
    let dir = 0;
    if (down && b.h >= b.e8 && b.c < b.e8) dir = -1;
    else if (up && b.l <= b.e8 && b.c > b.e8) dir = 1;
    if (!dir) continue;
    const nb = bars[i + 1], entry = nb.o + dir * SLIP;
    const edge = dir === -1 ? Math.max(b.h, b.e8) : Math.min(b.l, b.e8);
    const cushion = stopMode === 'cushion' ? b.atr8 / 2 : 0;
    const stop = roundTick(edge - dir * (TICK + cushion));
    const risk = (entry - stop) * dir;
    if (risk <= 0 || risk > E8.maxStopAtr * b.atr8) continue;
    nT++;
    pos = openPos(bars, i, dir, stop, roundTick(entry + dir * rr * risk), {
      setup: `${dir === 1 ? 'uptrend' : 'downtrend'} wick to 8 EMA ${b.e8.toFixed(2)}, closed ${dir === 1 ? 'above' : 'below'}; ${dir === 1 ? above : below}/10 closes on trend side`,
    });
  }
  return trades;
}

// ---------- Strategy 16: ICT "Power of Three" - sweep of a key high/low after 9:30, then reverse ----------
// Levels: previous-day regular-session high/low and/or London session (2:00-5:00 AM ET) high/low.
// Signals on 5-minute candles from 9:30 to 12:00; trades simulated on the base bars. One trade per day.
// Short: price trades ABOVE a high level while above the 9:30 opening price (the "manipulation"),
// then within 3 candles a 5-min candle CLOSES back below that level -> short at the next bar.
// Stop: 1 tick beyond the sweep's extreme. Target: 2R, or "liq" = the opposite level (London low /
// prev-day low for shorts), taken only if that is at least 1R away. Longs are the mirror image.
const P3 = { ldnStart: 120, ldnEnd: 300, entryEnd: '12:00', flatTime: '15:55', maxBars: 3 };
function runP3(bars, { rr, lv }) {
  const c5 = aggregate(bars, 5);
  for (const x of c5) x.ny = nyTime(x.t);
  const byDate = new Map(), order = [];
  for (const b of bars) {
    let d = byDate.get(b.ny.date);
    if (!d) { d = { rth: null, ldn: null, open: null }; byDate.set(b.ny.date, d); order.push(b.ny.date); }
    const upd = key => { const r = d[key]; d[key] = r ? { h: Math.max(r.h, b.h), l: Math.min(r.l, b.l) } : { h: b.h, l: b.l }; };
    if (b.ny.mins >= RTH_OPEN && b.ny.mins < 960) upd('rth');
    if (b.ny.mins >= P3.ldnStart && b.ny.mins < P3.ldnEnd) upd('ldn');
    if (b.ny.mins >= RTH_OPEN && d.open == null) d.open = b.o;
  }
  let prev = null;
  for (const dt of order) { const d = byDate.get(dt); d.prev = prev; if (d.rth) prev = d.rth; }

  const eMin = toMins(P3.entryEnd), fMin = toMins(P3.flatTime);
  const trades = [];
  let k = 0, pos = null, dayOf = null, done = false, highs = [], lows = [], sw = { up: null, dn: null }, D = null;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    while (k < c5.length && c5[k].end <= b.t) {
      const x = c5[k++];
      if (x.ny.date !== dayOf) {
        dayOf = x.ny.date; done = false; sw = { up: null, dn: null };
        D = byDate.get(dayOf);
        highs = []; lows = [];
        if (D && (lv === 'pd' || lv === 'both') && D.prev) { highs.push({ p: D.prev.h, n: 'prev-day high' }); lows.push({ p: D.prev.l, n: 'prev-day low' }); }
        if (D && (lv === 'ldn' || lv === 'both') && D.ldn) { highs.push({ p: D.ldn.h, n: 'London high' }); lows.push({ p: D.ldn.l, n: 'London low' }); }
      }
      if (done || pos || !D || D.open == null || x.ny.mins < RTH_OPEN || x.ny.mins >= eMin || !highs.length || k < 30) continue;
      // track sweeps: the highest swept high level / lowest swept low level
      for (const h of highs) if (x.h > h.p && x.h > D.open && (!sw.up || h.p > sw.up.lvl.p)) sw.up = { lvl: h, ext: x.h, n: 0 };
      for (const l of lows) if (x.l < l.p && x.l < D.open && (!sw.dn || l.p < sw.dn.lvl.p)) sw.dn = { lvl: l, ext: x.l, n: 0 };
      let sig = null;
      if (sw.up) {
        sw.up.ext = Math.max(sw.up.ext, x.h);
        if (x.c < sw.up.lvl.p) sig = { d: -1, s: sw.up };
        else if (++sw.up.n > P3.maxBars) sw.up = null;           // accepted above the level: not a fake-out
      }
      if (!sig && sw.dn) {
        sw.dn.ext = Math.min(sw.dn.ext, x.l);
        if (x.c > sw.dn.lvl.p) sig = { d: 1, s: sw.dn };
        else if (++sw.dn.n > P3.maxBars) sw.dn = null;
      }
      if (!sig || i + 1 >= bars.length) continue;
      done = true;
      const d = sig.d, entry = b.o + d * SLIP, stop = roundTick(sig.s.ext - d * TICK);   // 1 tick beyond the sweep extreme
      const risk = (entry - stop) * d;
      if (risk <= 0 || risk > ONR.maxStopAtr * x.atr) continue;
      let target;
      if (rr === 'liq') {
        const opp = (d === -1 ? lows : highs).map(z => z.p).filter(p => (p - entry) * d >= risk);
        if (!opp.length) continue;
        target = roundTick(d === -1 ? Math.max(...opp) : Math.min(...opp));   // nearest opposite level at least 1R away
      } else target = roundTick(entry + d * rr * risk);
      pos = {
        dir: d, entryIdx: i, date: b.ny.date, signalTime: `${x.ny.date} ${x.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
        entry, stop, target,
        setup: `swept ${sig.s.lvl.n} ${sig.s.lvl.p.toFixed(2)} to ${sig.s.ext.toFixed(2)}, closed back ${d === -1 ? 'below' : 'above'}; 9:30 open ${D.open.toFixed(2)}`,
      };
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
  }
  return trades;
}

// ---------- Strategy 17: Higher-timeframe (1H / 4H) zone break & retest, lower-timeframe entry ----------
// Zone: the most recent confirmed swing high on the 1H (or 4H) chart, drawn from its wick high down to
// the top of its body (mirror for swing lows). Break: a 1H/4H candle BODY closes beyond the zone.
// Then on the trading chart (1m or 5m): price taps back into the zone, forms a swing high (2 bars each
// side) after the tap, and we enter when price breaks above that swing high (stop order, 1 tick through).
// Stop: 1 tick below the lowest low since the tap. Target: "swing" = the nearest older 1H swing high
// that is at least 2R away (skip the trade if none), or a fixed 3R. Setup is cancelled if price closes
// back below the zone. Entries 9:30-15:30, max 2 trades a day, flat 15:55. Shorts are the mirror image.
const HTF = { k: 2, entryStart: '09:30', entryEnd: '15:30', flatTime: '15:55', maxTrades: 2, maxRiskAtr: 1.5, expiryHrs: 24 };
function runHTF(bars, { rr, tf }) {
  const H = aggregate(bars, tf), H1 = tf === 60 ? H : aggregate(bars, 60);
  const sMin = toMins(HTF.entryStart), eMin = toMins(HTF.entryEnd), fMin = toMins(HTF.flatTime);
  const trades = [];
  const swH = [], swL = [], tH = [], tL = [];          // zone swings (tf) and target swings (1H)
  let lastHi = null, lastLo = null, setups = [];
  let kH = 0, k1 = 0, pos = null, day = null, nT = 0;
  const fractal = (arr, j, kk) => {
    let isH = true, isL = true;
    for (let t = j - kk; t <= j + kk; t++) { if (t === j) continue; if (arr[t].h >= arr[j].h) isH = false; if (arr[t].l <= arr[j].l) isL = false; }
    return { isH, isL };
  };
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; }
    while (k1 < H1.length && H1[k1].end <= b.t) {             // 1H swings for targets
      const j = k1 - HTF.k;
      if (j - HTF.k >= 0) { const f = fractal(H1, j, HTF.k); if (f.isH) tH.push(H1[j].h); if (f.isL) tL.push(H1[j].l); }
      k1++;
    }
    while (kH < H.length && H[kH].end <= b.t) {               // zone timeframe: swings + breakouts
      const x = H[kH], j = kH - HTF.k;
      if (j - HTF.k >= 0) {
        const f = fractal(H, j, HTF.k), z = H[j];
        if (f.isH) lastHi = { top: z.h, bot: Math.max(z.o, z.c), used: false };
        if (f.isL) lastLo = { bot: z.l, top: Math.min(z.o, z.c), used: false };
      }
      if (lastHi && !lastHi.used && x.c > lastHi.top) {
        lastHi.used = true;
        setups.push({ d: 1, top: lastHi.top, bot: Math.min(lastHi.bot, lastHi.top - TICK), t: x.end, atr: x.atr, tapped: false, low: Infinity, high: -Infinity, sw: null, start: null });
      }
      if (lastLo && !lastLo.used && x.c < lastLo.bot) {
        lastLo.used = true;
        setups.push({ d: -1, top: Math.max(lastLo.top, lastLo.bot + TICK), bot: lastLo.bot, t: x.end, atr: x.atr, tapped: false, low: Infinity, high: -Infinity, sw: null, start: null });
      }
      kH++;
    }
    setups = setups.filter(s => !s.dead && b.t - s.t < HTF.expiryHrs * 3600);

    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    const inEntry = b.ny.mins >= sMin && b.ny.mins < eMin;
    for (const s of setups) {
      if (b.t < s.t) continue;
      const d = s.d;
      if (d === 1 ? b.c < s.bot : b.c > s.top) { s.dead = true; continue; }        // failed: closed back through
      if (!s.tapped) {
        if (d === 1 ? b.l <= s.top : b.h >= s.bot) { s.tapped = true; s.start = i; s.low = b.l; s.high = b.h; }
        continue;
      }
      // entry trigger: break of the swing point formed after the tap
      if (s.sw != null && !pos && inEntry && nT < HTF.maxTrades && (d === 1 ? b.h > s.sw : b.l < s.sw)) {
        s.dead = true;
        const trig = s.sw + d * TICK;
        const entry = (d === 1 ? Math.max(b.o, trig) : Math.min(b.o, trig)) + d * SLIP;
        const stop = roundTick(d === 1 ? s.low - TICK : s.high + TICK);
        const risk = (entry - stop) * d;
        if (risk > 0 && risk <= HTF.maxRiskAtr * s.atr) {
          let target = null;
          if (rr === 'swing') {
            const c = (d === 1 ? tH : tL).filter(p => (p - entry) * d >= 2 * risk);
            if (c.length) target = roundTick(d === 1 ? Math.min(...c) : Math.max(...c));
          } else target = roundTick(entry + d * rr * risk);
          if (target != null) {
            nT++;
            pos = {
              dir: d, entryIdx: i + 1, date: b.ny.date, signalTime: `${b.ny.date} ${b.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
              entry, stop, target,
              setup: `${tf === 60 ? '1H' : '4H'} zone ${s.bot.toFixed(2)}-${s.top.toFixed(2)} broken ${d === 1 ? 'up' : 'down'}, retest, break of ${s.sw.toFixed(2)}`,
            };
            // the entry bar itself: if it also reached the stop after triggering, assume the stop (worst case)
            if (d === 1 ? b.l <= stop && b.c < entry : b.h >= stop && b.c > entry) {
              const exit = stop - d * SLIP, pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
              trades.push({ ...pos, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (entry bar)', ambiguous: true, pnl, pnlBest: pnl });
              pos = null;
            }
          }
        }
        continue;
      }
      s.low = Math.min(s.low, b.l); s.high = Math.max(s.high, b.h);
      const j = i - HTF.k;                                     // swing point on the trading chart, after the tap
      if (j - HTF.k >= s.start) {
        const f = fractal(bars, j, HTF.k);
        if (d === 1 && f.isH) s.sw = bars[j].h;
        if (d === -1 && f.isL) s.sw = bars[j].l;
      }
    }
  }
  return trades;
}

// ---------- Strategy 18: VWAP + 9 EMA retest/rejection ----------
// Session VWAP (anchored 9:30, volume-weighted typical price; equal weights if volume is missing) and a
// 9 EMA, both on 5-minute candles. Trades simulated on the base bars.
// Short: the previous candle closed below VWAP (downtrend side), price comes up to the lines (high reaches
// the lower of EMA/VWAP), and a clean bearish 5-min candle (body >= half its range) closes below BOTH lines.
// "close together" rule: |EMA - VWAP| <= half an average candle. Entry: a sell-stop 1 tick under that
// candle's low, valid for the next 3 candles. Stop: 1 tick above the higher of the last 5 candles' high and
// the two lines. Target rr x risk. Entries 9:40-15:30, max 2 a day, flat 15:55. Long = mirror image.
const VW = { emaLen: 9, sigStart: '09:40', entryEnd: '15:30', flatTime: '15:55', maxTrades: 2, closeAtr: 0.5, orderBars: 3, swingBars: 5, maxStopAtr: 3 };
function runVWAP(bars, { rr, close }) {
  const c5 = aggregate(bars, 5);
  const kE = 2 / (VW.emaLen + 1);
  let ema = null, day = null, pv = 0, vv = 0, pn = 0, n = 0;
  for (const x of c5) {
    x.ny = nyTime(x.t);
    ema = ema == null ? x.c : x.c * kE + ema * (1 - kE);
    x.e9 = ema;
  }
  // VWAP from the base bars (finer volume), sampled at each 5-min close
  let j = 0;
  for (const x of c5) {
    while (j < bars.length && bars[j].t < x.end) {
      const b = bars[j++];
      if (b.ny.date !== day) { day = b.ny.date; pv = vv = pn = n = 0; }
      if (b.ny.mins < RTH_OPEN || b.ny.mins >= 960) continue;
      const tp = (b.h + b.l + b.c) / 3, v = b.v || 0;
      pv += tp * v; vv += v; pn += tp; n++;
    }
    x.vwap = x.ny.mins >= RTH_OPEN && x.ny.mins < 960 && n ? (vv > 0 ? pv / vv : pn / n) : null;
  }
  const sMin = toMins(VW.sigStart), eMin = toMins(VW.entryEnd), fMin = toMins(VW.flatTime);
  const trades = [];
  let k = 0, pos = null, order = null, dd = null, nT = 0;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== dd) { dd = b.ny.date; nT = 0; order = null; }
    while (k < c5.length && c5[k].end <= b.t) {
      const x = c5[k], p = c5[k - 1];
      if (order && k > order.expK) order = null;
      k++;
      if (!p || x.vwap == null || p.vwap == null || p.ny.date !== x.ny.date || pos || order || nT >= VW.maxTrades) continue;
      if (x.ny.mins < sMin || x.ny.mins >= eMin) continue;
      const range = x.h - x.l;
      if (range <= 0) continue;
      const lo = Math.min(x.e9, x.vwap), hi = Math.max(x.e9, x.vwap);
      if (close === 'on' && hi - lo > VW.closeAtr * x.atr) continue;
      const clean = Math.abs(x.c - x.o) >= range / 2;
      let d = 0;
      if (p.c < p.vwap && x.h >= lo && x.c < lo && x.c < x.o && clean) d = -1;
      else if (p.c > p.vwap && x.l <= hi && x.c > hi && x.c > x.o && clean) d = 1;
      if (!d) continue;
      let ext = d === -1 ? -Infinity : Infinity;
      for (let t = Math.max(0, k - VW.swingBars); t < k; t++) ext = d === -1 ? Math.max(ext, c5[t].h) : Math.min(ext, c5[t].l);
      const stop = roundTick(d === -1 ? Math.max(ext, hi) + TICK : Math.min(ext, lo) - TICK);
      order = { d, trig: d === -1 ? x.l - TICK : x.h + TICK, stop, expK: k + VW.orderBars - 1, atr: x.atr,
        sig: `${x.ny.date} ${x.ny.hm}`, setup: `${d === -1 ? 'below' : 'above'} VWAP ${x.vwap.toFixed(2)}, 9 EMA ${x.e9.toFixed(2)}, clean candle through both` };
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (order && !pos && b.ny.mins < eMin && (order.d === -1 ? b.l <= order.trig : b.h >= order.trig)) {
      const o = order; order = null;
      const d = o.d, entry = (d === -1 ? Math.min(b.o, o.trig) : Math.max(b.o, o.trig)) + d * SLIP;
      const risk = (entry - o.stop) * d;
      if (risk <= 0 || risk > VW.maxStopAtr * o.atr) continue;
      nT++;
      pos = { dir: d, entryIdx: i + 1, date: b.ny.date, signalTime: o.sig, entryTime: `${b.ny.date} ${b.ny.hm}`,
        entry, stop: o.stop, target: roundTick(entry + d * rr * risk), setup: o.setup };
      if (d === -1 ? b.h >= o.stop && b.c > entry : b.l <= o.stop && b.c < entry) {
        const exit = o.stop - d * SLIP, pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
        trades.push({ ...pos, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (entry bar)', ambiguous: true, pnl, pnlBest: pnl });
        pos = null;
      }
    }
  }
  return trades;
}

// ---------- Strategy 19: Morning reversal (unhealthy opening move, turn around 9:45-10:00) ----------
// Long setup: after 9:30 the market sells off fast - at least 2 bearish fair value gaps on the 5-min chart
// since the open - and the session low is made between 9:35 and 10:15. On the trading chart (1m or 5m):
// after the low, a swing high forms (2 bars each side), price pulls back but holds ABOVE the low (higher
// low = right shoulder), then breaks above that swing high -> buy (stop order 1 tick through).
// Stop: 1 tick under the higher low ("shoulder") or under the session low ("head"). Target rr x risk.
// A new session low before entry restarts the pattern. One trade a day, entries until 10:30, flat 12:00.
// Short = mirror image (fast rally with 2+ bullish gaps, high made 9:35-10:15).
const OREV = { k: 2, minGaps: 2, lowStart: '09:35', lowEnd: '10:15', entryEnd: '10:30', flatTime: '12:00', maxRiskAtr: 2 };
function runOREV(bars, { rr, stopAt }) {
  const c5 = aggregate(bars, 5);
  for (const x of c5) x.ny = nyTime(x.t);
  const loS = toMins(OREV.lowStart), loE = toMins(OREV.lowEnd), eMin = toMins(OREV.entryEnd), fMin = toMins(OREV.flatTime);
  const trades = [];
  let k = 0, pos = null, day = null, done = false, gapsDn = 0, gapsUp = 0, atr = null;
  let L = null, H = null;        // long setup anchored on session low; short setup on session high
  const fresh = (p, i) => ({ p, i, sw: null, pull: null });
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; done = false; gapsDn = gapsUp = 0; L = H = null; }
    while (k < c5.length && c5[k].end <= b.t) {
      const x = c5[k];
      if (x.ny.date === day && x.ny.mins >= RTH_OPEN && k >= 2 && c5[k - 2].ny.date === day && c5[k - 2].ny.mins >= RTH_OPEN) {
        if (x.h < c5[k - 2].l) gapsDn++;
        if (x.l > c5[k - 2].h) gapsUp++;
      }
      atr = x.atr; k++;
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (b.ny.mins < RTH_OPEN || b.ny.mins >= eMin || done) continue;
    // session extremes since 9:30 (only a new extreme inside the timing window anchors a setup)
    const inLowWin = b.ny.mins >= loS && b.ny.mins < loE;
    if (!L || b.l < L.p) L = inLowWin ? fresh(b.l, i) : { p: b.l, i, dead: true };
    if (!H || b.h > H.p) H = inLowWin ? fresh(b.h, i) : { p: b.h, i, dead: true };
    if (pos) continue;
    for (const [S, d] of [[L, 1], [H, -1]]) {
      if (!S || S.dead || done || pos) continue;
      if ((d === 1 ? gapsDn : gapsUp) < OREV.minGaps) continue;
      // entry trigger
      if (S.sw != null && S.pull != null && i > S.swI && (d === 1 ? b.h > S.sw : b.l < S.sw)) {
        done = true;
        const trig = S.sw + d * TICK;
        const entry = (d === 1 ? Math.max(b.o, trig) : Math.min(b.o, trig)) + d * SLIP;
        const ref = stopAt === 'shoulder' ? S.pull : S.p;
        const stop = roundTick(ref - d * TICK), risk = (entry - stop) * d;
        if (risk <= 0 || risk > OREV.maxRiskAtr * atr) continue;
        pos = { dir: d, entryIdx: i + 1, date: b.ny.date, signalTime: `${b.ny.date} ${b.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
          entry, stop, target: roundTick(entry + d * rr * risk),
          setup: `${d === 1 ? 'low' : 'high'} ${S.p.toFixed(2)} at ${bars[S.i].ny.hm}, ${d === 1 ? gapsDn : gapsUp} gaps, ${d === 1 ? 'higher low' : 'lower high'} ${S.pull.toFixed(2)}, break of ${S.sw.toFixed(2)}` };
        if (d === 1 ? b.l <= stop && b.c < entry : b.h >= stop && b.c > entry) {
          const exit = stop - d * SLIP, pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
          trades.push({ ...pos, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (entry bar)', ambiguous: true, pnl, pnlBest: pnl });
          pos = null;
        }
        continue;
      }
      // after the swing point: track the pullback (must stay beyond the low/high)
      if (S.sw != null && i > S.swI) S.pull = S.pull == null ? (d === 1 ? b.l : b.h) : (d === 1 ? Math.min(S.pull, b.l) : Math.max(S.pull, b.h));
      // swing high (for longs) / swing low (for shorts) formed after the extreme
      const j = i - OREV.k;
      if (j - OREV.k > S.i) {
        let ok = true;
        for (let t = j - OREV.k; t <= j + OREV.k; t++) { if (t === j) continue; if (d === 1 ? bars[t].h >= bars[j].h : bars[t].l <= bars[j].l) ok = false; }
        if (ok) { S.sw = d === 1 ? bars[j].h : bars[j].l; S.swI = i; S.pull = null; }
      }
    }
  }
  return trades;
}

// ---------- Strategy 20: "Sweep & flip" - Asian range swept at the London open ----------
// Asian range = high/low from 8:00 PM to 3:00 AM ET. Signals on 15-minute candles from 3:00 to 6:00 AM ET.
// Short: a 15-min candle trades ABOVE the Asian high and CLOSES back below it -> enter at the next bar.
// Long: trades below the Asian low and closes back above it. Stop: 1 tick beyond the sweep's extreme.
// Target rr x risk. Trend filter ("on"): longs only if the last 1-hour close is above its 50 EMA,
// shorts only if below. One trade per night. Positions are closed by 11:00 AM ET at the latest.
const ASIA = { start: 20 * 60, end: 3 * 60, sigEnd: 6 * 60, flatTime: '11:00', emaLen: 50, maxStopAtr: 3 };
function runASIA(bars, { rr, filter }) {
  const c15 = aggregate(bars, 15), h1 = aggregate(bars, 60);
  for (const x of c15) x.ny = nyTime(x.t);
  const kE = 2 / (ASIA.emaLen + 1); let e = null;
  for (const x of h1) { e = e == null ? x.c : x.c * kE + e * (1 - kE); x.e50 = e; }
  const fMin = toMins(ASIA.flatTime);
  const trades = [];
  let k = 0, k1 = 0, pos = null, aH = -Infinity, aL = Infinity, building = false, lvl = null, lvlDate = null, done = false, lastH1 = null;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.mins >= ASIA.start && !building) { building = true; aH = -Infinity; aL = Infinity; }
    if (building && (b.ny.mins >= ASIA.start || b.ny.mins < ASIA.end)) { aH = Math.max(aH, b.h); aL = Math.min(aL, b.l); }
    if (building && b.ny.mins >= ASIA.end && b.ny.mins < ASIA.start) {
      building = false; lvlDate = b.ny.date; done = false;
      lvl = Number.isFinite(aH) ? { h: aH, l: aL } : null;
    }
    while (k1 < h1.length && h1[k1].end <= b.t) lastH1 = h1[k1++];
    while (k < c15.length && c15[k].end <= b.t) {
      const x = c15[k++];
      if (!lvl || done || pos || x.ny.date !== lvlDate || x.ny.mins < ASIA.end || x.ny.mins >= ASIA.sigEnd || k < 60 || !lastH1) continue;
      let d = 0;
      if (x.h > lvl.h && x.c < lvl.h) d = -1;
      else if (x.l < lvl.l && x.c > lvl.l) d = 1;
      if (!d) continue;
      if (filter === 'on' && (d === 1 ? lastH1.c <= lastH1.e50 : lastH1.c >= lastH1.e50)) continue;
      done = true;
      const entry = b.o + d * SLIP, stop = roundTick(d === -1 ? x.h + TICK : x.l - TICK), risk = (entry - stop) * d;
      if (risk <= 0 || risk > ASIA.maxStopAtr * x.atr || i + 1 >= bars.length) continue;
      pos = { dir: d, entryIdx: i, date: b.ny.date, signalTime: `${x.ny.date} ${x.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
        entry, stop, target: roundTick(entry + d * rr * risk),
        setup: `swept Asian ${d === -1 ? 'high' : 'low'} ${(d === -1 ? lvl.h : lvl.l).toFixed(2)} (range ${lvl.l.toFixed(2)}-${lvl.h.toFixed(2)}), 1H ${lastH1.c > lastH1.e50 ? 'above' : 'below'} 50 EMA` };
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin, true);
      if (t) { trades.push(t); pos = null; }
    }
  }
  return trades;
}

// ---------- Strategy 21: "Sneaky pivot" - 3-candle 15-minute reversal at prev-day / swing levels ----------
// Lines: range high/low = previous regular-session day's high/low; swing high = the most recent 15-min swing
// high (2 candles each side) ABOVE the range high; swing low = most recent 15-min swing low BELOW the range low.
// Long: the 9:30 15-min candle is a strong red candle (body >= half its range) whose low reaches the range low
// or swing low ("touch"; or within half an average 15-min candle for "near"). The next green 15-min candle
// (10:00 or 10:15 at the latest) is the "sneaky" candle. Buy when price crosses its high (stop order, valid
// 30 min). Stop: 1 tick under the lowest low of the move. Target: the next line above that is at least 1R
// away ("level"; skip if none), or 2R. Short = mirror image. One trade a day, flat 15:55.
const SNK = { k: 2, nearAtr: 0.5, maxStopAtr: 3, flatTime: '15:55' };
function runSNK(bars, { rr, tol }) {
  const c15 = aggregate(bars, 15);
  for (const x of c15) x.ny = nyTime(x.t);
  // previous regular-session day high/low
  const byDate = new Map(), order = [];
  for (const b of bars) {
    if (b.ny.mins < RTH_OPEN || b.ny.mins >= 960) continue;
    let d = byDate.get(b.ny.date);
    if (!d) { d = { h: b.h, l: b.l }; byDate.set(b.ny.date, d); order.push(b.ny.date); }
    else { d.h = Math.max(d.h, b.h); d.l = Math.min(d.l, b.l); }
  }
  const prevOf = new Map(); order.forEach((dt, i) => prevOf.set(dt, i ? byDate.get(order[i - 1]) : null));
  const fMin = toMins(SNK.flatTime);
  const trades = [];
  const swH = [], swL = [];
  let k = 0, pos = null, day = null, st = null, order1 = null;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    while (k < c15.length && c15[k].end <= b.t) {
      const x = c15[k], j = k - SNK.k;
      if (j - SNK.k >= 0) {                                   // confirmed 15-min swing points
        let isH = true, isL = true;
        for (let t = j - SNK.k; t <= j + SNK.k; t++) { if (t === j) continue; if (c15[t].h >= c15[j].h) isH = false; if (c15[t].l <= c15[j].l) isL = false; }
        if (isH) swH.push({ p: c15[j].h, t: c15[j].t }); if (isL) swL.push({ p: c15[j].l, t: c15[j].t });
      }
      k++;
      if (x.ny.date !== day) { day = x.ny.date; st = null; order1 = null; }
      if (pos || order1) continue;
      if (x.ny.hm === '09:30') {
        const P = prevOf.get(day);
        if (!P) continue;
        const dayStart = x.t;
        const up = [P.h], dn = [P.l];
        for (let t = swH.length - 1; t >= 0; t--) if (swH[t].t < dayStart && swH[t].p > P.h) { up.push(swH[t].p); break; }
        for (let t = swL.length - 1; t >= 0; t--) if (swL[t].t < dayStart && swL[t].p < P.l) { dn.push(swL[t].p); break; }
        const range = x.h - x.l, strong = range > 0 && Math.abs(x.c - x.o) >= range / 2;
        const tolPts = tol === 'near' ? SNK.nearAtr * x.atr : 0;
        if (!strong) continue;
        if (x.c < x.o && dn.some(l => x.l <= l + tolPts)) st = { d: 1, ext: x.l, lines: up.concat(dn), atr: x.atr, n: 0 };
        else if (x.c > x.o && up.some(l => x.h >= l - tolPts)) st = { d: -1, ext: x.h, lines: up.concat(dn), atr: x.atr, n: 0 };
        continue;
      }
      if (!st) continue;
      st.n++;
      st.ext = st.d === 1 ? Math.min(st.ext, x.l) : Math.max(st.ext, x.h);
      const sneaky = st.d === 1 ? x.c > x.o : x.c < x.o;
      if (sneaky) {
        order1 = { d: st.d, trig: st.d === 1 ? x.h + TICK : x.l - TICK, ext: st.ext, lines: st.lines, atr: st.atr, exp: x.end + 30 * 60, sig: `${x.ny.date} ${x.ny.hm}` };
        st = null;
      } else if (st.n >= 3) st = null;                         // no sneaky candle by 10:15
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (order1 && !pos) {
      if (b.t >= order1.exp) { order1 = null; continue; }
      const o = order1, d = o.d;
      if (d === 1 ? b.l < o.ext : b.h > o.ext) { o.ext = d === 1 ? b.l : b.h; }   // new extreme before entry: widen stop
      if (d === 1 ? b.h >= o.trig : b.l <= o.trig) {
        order1 = null;
        const entry = (d === 1 ? Math.max(b.o, o.trig) : Math.min(b.o, o.trig)) + d * SLIP;
        const stop = roundTick(o.ext - d * TICK), risk = (entry - stop) * d;
        if (risk <= 0 || risk > SNK.maxStopAtr * o.atr) continue;
        let target;
        if (rr === 'level') {
          const c = o.lines.filter(p => (p - entry) * d >= risk);
          if (!c.length) continue;
          target = roundTick(d === 1 ? Math.min(...c) : Math.max(...c));
        } else target = roundTick(entry + d * rr * risk);
        pos = { dir: d, entryIdx: i + 1, date: b.ny.date, signalTime: o.sig, entryTime: `${b.ny.date} ${b.ny.hm}`, entry, stop, target,
          setup: `9:30 candle into ${d === 1 ? 'lower' : 'upper'} line, sneaky candle ${o.sig.slice(11)}, lines ${o.lines.map(v => v.toFixed(2)).join('/')}` };
        if (d === 1 ? b.l <= stop && b.c < entry : b.h >= stop && b.c > entry) {
          const exit = stop - d * SLIP, pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
          trades.push({ ...pos, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (entry bar)', ambiguous: true, pnl, pnlBest: pnl });
          pos = null;
        }
      }
    }
  }
  return trades;
}

// ---------- Strategy 22: ICT "IFVG" model - key level + highest-timeframe inversion fair value gap ----------
// Bias ("on"): daily trend from regular-session closes vs the 9 and 21 day EMAs (as in pdh); longs only in
// an uptrend, shorts only in a downtrend. "off": both directions.
// Key level: a 15-min bullish fair value gap (low of candle k above high of candle k-2) created in the last
// 2 days and not yet closed through. When price trades into it between 9:30 and 11:00, the setup starts.
// Manipulation leg: from the highest high of the 45 minutes before the touch down to the lowest low since.
// Entry: among bearish fair value gaps formed inside that leg on the 1, 2, 3 and 5-min charts, take the
// HIGHEST timeframe that has one; when a candle of that timeframe closes above that gap's top (inversion),
// buy at the next bar. Stop: 1 tick under the leg low. Target rr x risk. Shorts are the mirror image.
// Max 2 trades a day; done for the day after a win. Flat by 12:00.
const IFV = { tfs: [1, 2, 3, 5], legMin: 45, zoneHrs: 48, sigEnd: '11:00', flatTime: '12:00', maxTrades: 2, maxStopPts: null };
function runIFVG(bars, { rr, bias }) {
  // daily trend
  const days = [], byDate = new Map();
  for (const b of bars) {
    if (b.ny.mins < RTH_OPEN || b.ny.mins >= 960) continue;
    let d = byDate.get(b.ny.date);
    if (!d) { d = { c: b.c }; byDate.set(b.ny.date, d); days.push(d); } else d.c = b.c;
  }
  let e9 = null, e21 = null;
  days.forEach((d, i) => {
    e9 = e9 == null ? d.c : d.c * 0.2 + e9 * 0.8; e21 = e21 == null ? d.c : d.c * (2 / 22) + e21 * (20 / 22);
    d.trend = i < 15 ? 0 : d.c > e9 && d.c > e21 ? 1 : d.c < e9 && d.c < e21 ? -1 : 0;
    d.prevTrend = i ? days[i - 1].trend : 0;
  });
  const base = INTERVAL === '1m' ? 1 : 5;
  const tfs = IFV.tfs.filter(t => t >= base);
  const T = tfs.map(tf => ({ tf, c: aggregate(bars, tf), k: 0 }));
  const c15 = aggregate(bars, 15);
  const eMin = toMins(IFV.sigEnd), fMin = toMins(IFV.flatTime);
  const trades = [];
  let k15 = 0, zones = [], pos = null, day = null, nT = 0, won = false, st = null;
  const gaps = { 1: [], [-1]: [] };                          // recent 1-5 min gaps: bearish (-1) / bullish (1)
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; won = false; st = null; }
    // 15-min key-level gaps
    while (k15 < c15.length && c15[k15].end <= b.t) {
      const x = c15[k15];
      if (k15 >= 2) {
        const a = c15[k15 - 2];
        if (x.l > a.h) zones.push({ d: 1, lo: a.h, hi: x.l, t: x.end });
        if (x.h < a.l) zones.push({ d: -1, lo: x.h, hi: a.l, t: x.end });
      }
      for (const z of zones) if (z.d === 1 ? x.c < z.lo : x.c > z.hi) z.dead = true;
      k15++;
    }
    zones = zones.filter(z => !z.dead && b.t - z.t < IFV.zoneHrs * 3600);
    // small-timeframe candles that just closed: record gaps, check inversions
    let signal = null;
    for (const S of T) {
      while (S.k < S.c.length && S.c[S.k].end <= b.t) {
        const x = S.c[S.k];
        if (S.k >= 2) {
          const a = S.c[S.k - 2];
          if (x.h < a.l) gaps[-1].push({ tf: S.tf, lo: x.h, hi: a.l, t: x.t });
          if (x.l > a.h) gaps[1].push({ tf: S.tf, lo: a.h, hi: x.l, t: x.t });
        }
        if (st && !signal && st.pick && st.pick.tf === S.tf && x.t > st.pick.t &&
            (st.d === 1 ? x.c > st.pick.hi : x.c < st.pick.lo)) signal = { x, tf: S.tf };
        S.k++;
      }
    }
    for (const d of [1, -1]) gaps[d] = gaps[d].filter(g => b.t - g.t < 3 * 3600);

    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); if (t.pnl > 0) won = true; pos = null; }
    }
    const inWin = b.ny.mins >= RTH_OPEN && b.ny.mins < eMin;
    if (!inWin) { st = null; continue; }
    if (pos || won || nT >= IFV.maxTrades) continue;
    const today = byDate.get(day);
    const allow = d => bias === 'off' || (today && today.prevTrend === d);

    if (st) {
      // keep extending the leg until the inversion
      st.ext = st.d === 1 ? Math.min(st.ext, b.l) : Math.max(st.ext, b.h);
      if (st.d === 1 ? b.c < st.z.lo : b.c > st.z.hi) { st = null; continue; }    // key level failed
      // highest-timeframe opposite gap inside the leg
      const inLeg = gaps[-st.d].filter(g => g.t >= st.legT);
      if (inLeg.length) {
        const top = Math.max(...inLeg.map(g => g.tf));
        const cand = inLeg.filter(g => g.tf === top);
        st.pick = cand[cand.length - 1];
      }
      if (signal && i + 1 < bars.length) {
        const d = st.d, entry = bars[i].o + d * SLIP;
        const stop = roundTick(st.ext - d * TICK), risk = (entry - stop) * d;
        const s0 = st; st = null;
        if (risk > 0) {
          nT++;
          pos = { dir: d, entryIdx: i, date: b.ny.date, signalTime: `${nyTime(signal.x.t).date} ${nyTime(signal.x.t).hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
            entry, stop, target: roundTick(entry + d * rr * risk),
            setup: `15m ${d === 1 ? 'bullish' : 'bearish'} gap ${s0.z.lo.toFixed(2)}-${s0.z.hi.toFixed(2)}, ${signal.tf}-min inversion` };
          const t = manageExit(b, pos, fMin);
          if (t) { trades.push(t); if (t.pnl > 0) won = true; pos = null; }
        }
      }
      continue;
    }
    // new touch of a key level
    for (const z of zones) {
      if (z.t > b.t - 15 * 60) continue;                       // gap must be complete before the touch
      if (!allow(z.d)) continue;
      const touched = z.d === 1 ? b.l <= z.hi && b.h > z.lo : b.h >= z.lo && b.l < z.hi;
      if (!touched) continue;
      let ext = z.d === 1 ? Infinity : -Infinity, legT = b.t, best = z.d === 1 ? -Infinity : Infinity;
      for (let j = i; j >= 0 && b.t - bars[j].t <= IFV.legMin * 60; j--) {
        if (z.d === 1 ? bars[j].h > best : bars[j].l < best) { best = z.d === 1 ? bars[j].h : bars[j].l; legT = bars[j].t; }
      }
      st = { d: z.d, z, ext: z.d === 1 ? b.l : b.h, legT, pick: null };
      z.dead = true;
      break;
    }
  }
  return trades;
}

// ---------- Strategy 23: First-candle range + fair value gap break, then gap retest ----------
// SCALP: range = first 5-min candle (9:30-9:35). Signals on 1-min candles (5-min on 5m data).
//   Break: a 3-candle fair value gap whose middle candle opens inside the range and closes beyond it.
//   Retest: a later candle trades back into the gap. Entry: the next candle that engulfs the retest
//   candle's body (closes beyond its open/close in the trade direction). Stop: 1 tick beyond the deepest
//   point traded into the gap. Cancelled if a candle closes back through the far side of the gap.
// DAY: range = first 15-min candle (9:30-9:45). Signals on 5-min candles. Same gap break. Entry: limit
//   order at the near edge of the gap. Stop: 1 tick beyond the first candle of the gap pattern.
// Target rr x risk. One trade per day per mode; setups must trigger by 11:00; flat 15:55. Shorts mirror.
const FVGO = { entryEnd: '11:00', flatTime: '15:55', maxStopAtr: 4 };
function runFVGO(bars, { mode, rr }) {
  const base = INTERVAL === '1m' ? 1 : 5;
  const orMin = mode === 'scalp' ? 5 : 15, tf = Math.max(mode === 'scalp' ? 1 : 5, base);
  const C = aggregate(bars, tf);
  for (const x of C) x.ny = nyTime(x.t);
  const eMin = toMins(FVGO.entryEnd), fMin = toMins(FVGO.flatTime);
  const trades = [];
  let k = 0, pos = null, day = null, done = false, orH = null, orL = null, st = null, lim = null;
  const fill = (i, b, d, entry, stop, setup, sig) => {
    const risk = (entry - stop) * d;
    if (risk <= 0 || (st && risk > FVGO.maxStopAtr * st.atr)) return;
    pos = { dir: d, entryIdx: i + 1, date: b.ny.date, signalTime: sig, entryTime: `${b.ny.date} ${b.ny.hm}`, entry, stop, target: roundTick(entry + d * rr * risk), setup };
  };
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; done = false; orH = orL = null; st = null; lim = null; }
    if (b.ny.mins >= RTH_OPEN && b.ny.mins < RTH_OPEN + orMin) { orH = orH == null ? b.h : Math.max(orH, b.h); orL = orL == null ? b.l : Math.min(orL, b.l); }
    while (k < C.length && C[k].end <= b.t) {
      const x = C[k], kk = k++;
      if (x.ny.date !== day || orH == null || done || pos || x.ny.mins < RTH_OPEN + orMin || x.ny.mins >= eMin) continue;
      if (!st && kk >= 2 && C[kk - 2].ny.mins >= RTH_OPEN) {            // gap break through the range
        const a = C[kk - 2], m = C[kk - 1];
        let d = 0;
        if (x.l > a.h && m.o <= orH && m.c > orH) d = 1;
        else if (x.h < a.l && m.o >= orL && m.c < orL) d = -1;
        if (d) {
          st = { d, near: d === 1 ? x.l : x.h, far: d === 1 ? a.h : a.l, first: d === 1 ? a.l : a.h, atr: x.atr, retest: null, deep: null, sig: `${x.ny.date} ${x.ny.hm}` };
          if (mode === 'day') lim = { ...st };
          continue;
        }
      }
      if (st && mode === 'scalp') {
        const d = st.d;
        if (d === 1 ? x.c < st.far : x.c > st.far) { st = null; continue; }   // closed back through the gap
        const intoGap = d === 1 ? x.l <= st.near : x.h >= st.near;
        if (st.retest) {
          st.deep = d === 1 ? Math.min(st.deep, x.l) : Math.max(st.deep, x.h);
          const bodyEdge = d === 1 ? Math.max(st.retest.o, st.retest.c) : Math.min(st.retest.o, st.retest.c);
          if (d === 1 ? x.c > x.o && x.c > bodyEdge : x.c < x.o && x.c < bodyEdge) {
            done = true;
            const entry = b.o + d * SLIP, stop = roundTick(st.deep - d * TICK);
            fill(i - 1, b, d, entry, stop, `${tf}-min gap ${Math.min(st.near, st.far).toFixed(2)}-${Math.max(st.near, st.far).toFixed(2)} beyond 5-min range, engulf of retest`, `${x.ny.date} ${x.ny.hm}`);
            st = null;
          }
        } else if (intoGap) { st.retest = x; st.deep = d === 1 ? x.l : x.h; }
      }
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    // DAY mode: resting limit order at the near edge of the gap
    if (lim && !pos && !done) {
      if (b.ny.mins >= eMin) { lim = null; continue; }
      const d = lim.d, stop = roundTick(lim.first - d * TICK), px = lim.near;
      if (d === 1 ? b.l <= px : b.h >= px) {
        done = true; const o = lim; lim = null; st = null;
        if (d === 1 ? b.o <= stop : b.o >= stop) continue;            // opened beyond the stop: skip
        const entry = d === 1 ? Math.min(b.o, px) : Math.max(b.o, px);
        const risk = (entry - stop) * d;
        if (risk <= 0 || risk > FVGO.maxStopAtr * o.atr) continue;
        const p0 = { dir: d, entryIdx: i + 1, date: b.ny.date, signalTime: o.sig, entryTime: `${b.ny.date} ${b.ny.hm}`, entry, stop, target: roundTick(entry + d * rr * risk),
          setup: `5-min gap ${Math.min(o.near, o.far).toFixed(2)}-${Math.max(o.near, o.far).toFixed(2)} beyond 15-min range, limit fill` };
        if (d === 1 ? b.l <= stop : b.h >= stop) {
          const exit = stop - d * SLIP, pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
          trades.push({ ...p0, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (fill bar)', ambiguous: false, pnl, pnlBest: pnl });
        } else pos = p0;
      }
    }
  }
  return trades;
}

// ---------- Strategy 24: 50 EMA cross + 2-candle pullback + swing break (chandelier stop) ----------
// Long: after at least 10 candles closing below the 50 EMA, a candle closes above it (the cross). Then at
// least 2 red candles in a row (the pullback); the swing high = highest high from the cross to the pullback.
// Enter when a candle CLOSES above that swing high. Invalid if any candle closes back below the EMA first,
// or if the breakout candle is more than 3x the average candle size. Stop: chandelier exit = highest high
// of the last 22 candles minus 3 x ATR(22). Target rr x risk. Short = mirror image.
// Signals on 5 or 15-min candles; entries 9:30-15:00 ET, flat 15:55, max 3 trades a day.
const E50 = { len: 50, below: 10, atrLen: 22, chMult: 3, bigMult: 3, entryEnd: '15:00', flatTime: '15:55', maxTrades: 3 };
function runE50(bars, { rr, tf }) {
  const tfx = Math.max(tf, INTERVAL === '1m' ? 1 : 5);
  const C = aggregate(bars, tfx);
  const kE = 2 / (E50.len + 1); let e = null;
  for (let i = 0; i < C.length; i++) {
    const x = C[i]; x.ny = nyTime(x.t);
    e = e == null ? x.c : x.c * kE + e * (1 - kE); x.e50 = e;
    const pc = i ? C[i - 1].c : x.c;
    x.tr = Math.max(x.h - x.l, Math.abs(x.h - pc), Math.abs(x.l - pc));
    let s = 0, n = 0; for (let j = Math.max(0, i - E50.atrLen + 1); j <= i; j++) { s += C[j].tr; n++; } x.atr22 = s / n;
    let hh = -Infinity, ll = Infinity; for (let j = Math.max(0, i - E50.atrLen + 1); j <= i; j++) { hh = Math.max(hh, C[j].h); ll = Math.min(ll, C[j].l); }
    x.chL = hh - E50.chMult * x.atr22; x.chS = ll + E50.chMult * x.atr22;
  }
  const eMin = toMins(E50.entryEnd), fMin = toMins(E50.flatTime);
  const trades = [];
  let k = 0, pos = null, day = null, nT = 0, runB = 0, runA = 0, st = null;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; }
    let signal = null;
    while (k < C.length && C[k].end <= b.t) {
      const x = C[k], kk = k++;
      if (kk < E50.len * 2) { if (x.c < x.e50) { runB++; runA = 0; } else { runA++; runB = 0; } continue; }
      // state machine (one direction at a time)
      if (st) {
        const d = st.d;
        if (d === 1 ? x.c < x.e50 : x.c > x.e50) st = null;                       // closed back through the EMA: invalid
        else if (st.phase === 'cross') {
          const opp = d === 1 ? x.c < x.o : x.c > x.o;
          st.opp = opp ? st.opp + 1 : 0;
          if (!opp) st.ext = d === 1 ? Math.max(st.ext, x.h) : Math.min(st.ext, x.l);
          if (st.opp >= 2) st.phase = 'pull';
        } else if (st.phase === 'pull') {
          if (d === 1 ? x.c > st.ext : x.c < st.ext) {
            const big = (x.h - x.l) > E50.bigMult * x.atr22;
            if (!big) signal = { d, x, swing: st.ext };
            st = null;
          }
        }
      }
      if (!st) {
        if (x.c > x.e50 && runB >= E50.below) st = { d: 1, phase: 'cross', ext: x.h, opp: 0 };
        else if (x.c < x.e50 && runA >= E50.below) st = { d: -1, phase: 'cross', ext: x.l, opp: 0 };
      }
      if (x.c < x.e50) { runB++; runA = 0; } else { runA++; runB = 0; }
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (signal && !pos && nT < E50.maxTrades && b.ny.mins >= RTH_OPEN && b.ny.mins < eMin && signal.x.ny.date === b.ny.date) {
      const { d, x } = signal, entry = b.o + d * SLIP;
      const stop = roundTick(d === 1 ? x.chL : x.chS), risk = (entry - stop) * d;
      if (risk > 0) {
        nT++;
        pos = { dir: d, entryIdx: i, date: b.ny.date, signalTime: `${x.ny.date} ${x.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
          entry, stop, target: roundTick(entry + d * rr * risk),
          setup: `${tfx}-min: 50 EMA cross ${d === 1 ? 'up' : 'down'}, 2-candle pullback, close beyond swing ${signal.swing.toFixed(2)}` };
        const t = manageExit(b, pos, fMin);
        if (t) { trades.push(t); pos = null; }
      }
    }
  }
  return trades;
}

// ---------- Strategy 25: ORB pullback - limit entry back inside the 15-min opening range ----------
// Range = 9:30-9:45 high/low. Skip the day if the range is wider than 1.5x the median of the last 20 days.
// Direction: the first 5-min candle that CLOSES outside the range (by 12:00).
// Entry: limit order on the pullback - at the range edge ("top"), the midline ("mid"), or chosen by breakout
// strength ("auto", his rule): breakout candle body >= 2x average 5-min candle -> edge; >= 1x -> midline;
// weaker -> far side of the range. Stop: beyond the far side of the range by 10% of the range + 1 tick.
// Target rr x risk. Order cancelled at 12:00, or if a 5-min candle closes beyond the far side first. One trade a day.
const ORBP = { wideMult: 1.5, lookback: 20, entryEnd: '12:00', flatTime: '15:55' };
function runORBP(bars, { rr, lvl }) {
  const c5 = aggregate(bars, 5);
  for (const x of c5) x.ny = nyTime(x.t);
  const eMin = toMins(ORBP.entryEnd), fMin = toMins(ORBP.flatTime);
  const trades = [], widths = [];
  let k = 0, pos = null, day = null, orH = null, orL = null, state = null, order = null;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; orH = orL = null; state = null; order = null; }
    if (b.ny.mins >= RTH_OPEN && b.ny.mins < RTH_OPEN + 15) { orH = orH == null ? b.h : Math.max(orH, b.h); orL = orL == null ? b.l : Math.min(orL, b.l); }
    while (k < c5.length && c5[k].end <= b.t) {
      const x = c5[k++];
      if (x.ny.date !== day || orH == null || x.ny.mins < RTH_OPEN + 15) continue;
      if (state === null) {                                   // first candle after the range: check width once
        const w = orH - orL, sorted = widths.slice(-ORBP.lookback).sort((a, c) => a - c);
        const med = sorted.length >= 5 ? sorted[Math.floor(sorted.length / 2)] : null;
        widths.push(w);
        state = med != null && w > ORBP.wideMult * med ? 'skip' : 'wait';
      }
      if (state === 'wait' && x.ny.mins < eMin) {
        const d = x.c > orH ? 1 : x.c < orL ? -1 : 0;
        if (d) {
          state = 'armed';
          const w = orH - orL, body = Math.abs(x.c - x.o);
          let at = lvl;
          if (lvl === 'auto') at = body >= 2 * x.atr ? 'top' : body >= x.atr ? 'mid' : 'far';
          const px = at === 'top' ? (d === 1 ? orH : orL) : at === 'mid' ? (orH + orL) / 2 : (d === 1 ? orL + 0.1 * w : orH - 0.1 * w);
          const stop = roundTick(d === 1 ? orL - 0.1 * w - TICK : orH + 0.1 * w + TICK);
          order = { d, px: roundTick(px), stop, at, sig: `${x.ny.date} ${x.ny.hm}`, w };
        }
      } else if (order && (order.d === 1 ? x.c < orL : x.c > orH)) order = null;   // broke the other way first
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (order && !pos) {
      if (b.ny.mins >= eMin) { order = null; continue; }
      const o = order, d = o.d;
      if (d === 1 ? b.l <= o.px : b.h >= o.px) {
        order = null; state = 'done';
        if (d === 1 ? b.o <= o.stop : b.o >= o.stop) continue;
        const entry = d === 1 ? Math.min(b.o, o.px) : Math.max(b.o, o.px), risk = (entry - o.stop) * d;
        if (risk <= 0) continue;
        const p0 = { dir: d, entryIdx: i + 1, date: b.ny.date, signalTime: o.sig, entryTime: `${b.ny.date} ${b.ny.hm}`, entry, stop: o.stop,
          target: roundTick(entry + d * rr * risk), setup: `15-min range ${orL.toFixed(2)}-${orH.toFixed(2)}, break ${d === 1 ? 'up' : 'down'}, limit at ${o.at}` };
        if (d === 1 ? b.l <= o.stop : b.h >= o.stop) {
          const exit = o.stop - d * SLIP, pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
          trades.push({ ...p0, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (fill bar)', ambiguous: false, pnl, pnlBest: pnl });
        } else pos = p0;
      }
    }
  }
  return trades;
}

// ---------- Strategy 26: Trendlines - action line / safety line ----------
// Lines are drawn automatically from swing points on tf-minute candles (a swing = a high/low with
// 3 candles on each side). Upward line: from an earlier swing low to the newest higher swing low,
// with no candle low poking below it in between. Downward line: same with lower swing highs.
// The newest valid line of each type is the active one (closest to price).
// ACTION: a candle CLOSES through a line -> trade in the direction of the break
// (close below the upward line -> short; close above the downward line -> long).
// SAFETY: the opposite line. Stop sits 1 tick beyond it and trails along it every candle.
// No target in her rule ("trail"); variant "2" adds a 2R target. Skip if the stop is wider than the
// ORB max-stop limit (12 pts MES, scaled for MNQ). Entries 9:30-15:00, max 3 a day, flat 15:55.
const TL = { k: 3, lookPivots: 8, entryEnd: '15:00', flatTime: '15:55', maxTrades: 3 };
function runTL(bars, { ex, tf }) {
  const tfx = Math.max(tf, INTERVAL === '1m' ? 1 : 5);
  const C = aggregate(bars, tfx);
  for (const x of C) x.ny = nyTime(x.t);
  const K = TL.k, eMin = toMins(TL.entryEnd), fMin = toMins(TL.flatTime);
  const lows = [], highs = [];
  let up = null, dn = null;                       // active lines {i1,p1,i2,p2}
  const val = (ln, idx) => ln.p1 + (ln.p2 - ln.p1) * (idx - ln.i1) / (ln.i2 - ln.i1);
  function build(piv, d) {                         // d = 1 upward (lows), -1 downward (highs)
    const B = piv[piv.length - 1];
    for (let a = piv.length - 2; a >= Math.max(0, piv.length - 1 - TL.lookPivots); a--) {
      const A = piv[a];
      if (d === 1 ? A.p >= B.p : A.p <= B.p) continue;           // must slope the right way
      const ln = { i1: A.i, p1: A.p, i2: B.i, p2: B.p };
      let ok = true;
      for (let j = A.i + 1; j < B.i && ok; j++) if (d === 1 ? C[j].l < val(ln, j) - 1e-9 : C[j].h > val(ln, j) + 1e-9) ok = false;
      for (let j = B.i + 1; j <= B.i + K && ok; j++) if (d === 1 ? C[j].c < val(ln, j) : C[j].c > val(ln, j)) ok = false;
      if (ok) return ln;
    }
    return null;
  }
  const trades = [];
  let k = 0, pos = null, day = null, nT = 0;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; }
    let signal = null;
    while (k < C.length && C[k].end <= b.t) {
      const idx = k++, x = C[idx];
      // breaks of the active lines
      let brk = 0;
      if (up && x.c < val(up, idx)) { brk = -1; up = null; }
      else if (dn && x.c > val(dn, idx)) { brk = 1; dn = null; }
      // confirm swing points K candles back
      const pI = idx - K;
      if (pI >= K) {
        const p = C[pI]; let isL = true, isH = true;
        for (let j = pI - K; j <= pI + K; j++) { if (j === pI) continue; if (C[j].l <= p.l) isL = false; if (C[j].h >= p.h) isH = false; }
        if (isL) { lows.push({ i: pI, p: p.l }); const ln = build(lows, 1); if (ln) up = ln; }
        if (isH) { highs.push({ i: pI, p: p.h }); const ln = build(highs, -1); if (ln) dn = ln; }
      }
      // trail an open position's stop along its safety line
      if (pos && pos.safety) {
        const sl = pos.safety, v = val(sl, idx + 1), ns = roundTick(v - pos.dir * TICK);
        if (pos.dir === 1 ? ns > pos.stop : ns < pos.stop) pos.stop = ns;
      }
      if (brk) {
        const safety = brk === 1 ? up : dn;      // opposite line
        if (safety) signal = { d: brk, x, idx, safety: { ...safety } };
      }
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (signal && !pos && nT < TL.maxTrades && b.ny.mins >= RTH_OPEN && b.ny.mins < eMin && signal.x.ny.date === b.ny.date) {
      const { d, safety, idx } = signal, entry = b.o + d * SLIP;
      const stop = roundTick(val(safety, idx + 1) - d * TICK), risk = (entry - stop) * d;
      if (risk > 0 && risk <= ORB.maxStopPts) {
        nT++;
        const target = ex === 'trail' ? d * 1e9 : roundTick(entry + d * ex * risk);
        pos = { dir: d, entryIdx: i, date: b.ny.date, signalTime: `${signal.x.ny.date} ${signal.x.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
          entry, stop, target, safety,
          setup: `${tfx}-min close ${d === 1 ? 'above downward' : 'below upward'} line, safety line at ${val(safety, idx + 1).toFixed(2)}` };
        const t = manageExit(b, pos, fMin);
        if (t) { trades.push(t); pos = null; }
      }
    }
  }
  return trades.map(t => { const { safety, ...rest } = t; if (rest.target === 1e9 || rest.target === -1e9) rest.target = 0; return rest; });
}

// ---------- Strategy 27: 5-minute opening range breakout + 9/21 EMA ----------
// Range = the 9:30-9:35 candle. Entry: first 5-min candle that CLOSES outside it (by 11:30), one try a day.
// "ema" filter: for a long, 9 EMA above 21 EMA and the close above both (5-min chart); mirror for shorts.
// If the first breakout fails the filter, the day is skipped (same "one breakout per day" rule as ORB).
// Stop: middle of the 5-min range (same as our ORB). Target rr x risk. Skip if stop > ORB max. Flat 15:50.
function runORB5(bars, { rr, f }) {
  const C = aggregate(bars, 5);
  const k9 = 2 / 10, k21 = 2 / 22; let e9 = null, e21 = null;
  for (const x of C) { x.ny = nyTime(x.t); e9 = e9 == null ? x.c : x.c * k9 + e9 * (1 - k9); e21 = e21 == null ? x.c : x.c * k21 + e21 * (1 - k21); x.e9 = e9; x.e21 = e21; }
  const eMin = toMins(ORB.entryEnd), fMin = toMins(ORB.flatTime);
  const trades = [];
  let k = 0, pos = null, day = null, orH = null, orL = null, done = false, signal = null;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; orH = orL = null; done = false; }
    signal = null;
    while (k < C.length && C[k].end <= b.t) {
      const x = C[k++];
      if (x.ny.date !== day) continue;
      if (x.ny.mins === RTH_OPEN) { orH = x.h; orL = x.l; continue; }
      if (done || orH == null || x.ny.mins < RTH_OPEN + 5 || x.ny.mins >= eMin) continue;
      const d = x.c > orH ? 1 : x.c < orL ? -1 : 0;
      if (!d) continue;
      done = true;
      if (f === 'ema' && !(d === 1 ? x.e9 > x.e21 && x.c > x.e9 && x.c > x.e21 : x.e9 < x.e21 && x.c < x.e9 && x.c < x.e21)) continue;
      signal = { d, x };
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (signal && !pos) {
      const { d, x } = signal, entry = b.o + d * SLIP, stop = roundTick((orH + orL) / 2), risk = (entry - stop) * d;
      if (risk > 0 && risk <= ORB.maxStopPts) {
        pos = { dir: d, entryIdx: i, date: b.ny.date, signalTime: `${x.ny.date} ${x.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
          entry, stop, target: roundTick(entry + d * rr * risk),
          setup: `5-min range ${orL.toFixed(2)}-${orH.toFixed(2)}, close ${d === 1 ? 'above' : 'below'}, 9 EMA ${x.e9.toFixed(2)} / 21 EMA ${x.e21.toFixed(2)}` };
        const t = manageExit(b, pos, fMin);
        if (t) { trades.push(t); pos = null; }
      }
    }
  }
  return trades;
}

// ---------- Strategy 28: Bull/bear flag (impulse run + pullback + break of the prior candle) ----------
// Chart = the data interval (1m or 5m). Impulse: 4+ candles in a row that each close in the trend
// direction and push past the prior candle's high (bull) / low (bear). Then a pullback (flag): every
// candle that fails to break the prior high arms a buy-stop 1 tick above its high, stop 1 tick below
// its low. Entry when price trades through. "ema" = the pullback must have touched the 9 EMA first.
// Flag is dead after 10 pullback candles or a close beyond the start of the impulse.
// Target rr x risk. 9:30-15:00 entries, max 5 trades a day, flat 15:55. Skip if stop > ORB max.
const FLAG = { minRun: 4, maxPull: 10, entryEnd: '15:00', flatTime: '15:55', maxTrades: 5 };
function runFLAG(bars, { rr, f }) {
  const tf = INTERVAL === '1m' ? 1 : 5;
  const C = aggregate(bars, tf);
  const k9 = 2 / 10; let e9 = null;
  for (const x of C) { x.ny = nyTime(x.t); e9 = e9 == null ? x.c : x.c * k9 + e9 * (1 - k9); x.e9 = e9; }
  const eMin = toMins(FLAG.entryEnd), fMin = toMins(FLAG.flatTime);
  const mk = () => ({ run: 0, runStart: null, phase: 'none', pulls: 0, touched: false, origin: null, trig: null, stop: null });
  const S = { 1: mk(), [-1]: mk() };
  const trades = [];
  let k = 0, pos = null, day = null, nT = 0;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; }
    // update states on each closed candle
    while (k < C.length && C[k].end <= b.t) {
      const j = k++, x = C[j], p = C[j - 1];
      if (!p) continue;
      for (const d of [1, -1]) {
        const s = S[d];
        const cont = d === 1 ? (x.c > x.o && x.h > p.h && x.c > p.c) : (x.c < x.o && x.l < p.l && x.c < p.c);
        if (s.phase === 'pull') {
          s.pulls++;
          if ((d === 1 ? x.c < s.origin : x.c > s.origin) || s.pulls > FLAG.maxPull) { Object.assign(s, mk()); }
          else { s.trig = d === 1 ? x.h + TICK : x.l - TICK; s.stop = roundTick(d === 1 ? x.l - TICK : x.h + TICK);
                 if (d === 1 ? x.l <= x.e9 : x.h >= x.e9) s.touched = true; }
        }
        if (s.phase !== 'pull') {
          if (cont) { if (s.run === 0) s.runStart = d === 1 ? x.l : x.h; s.run++; }
          else {
            if (s.run >= FLAG.minRun) {
              Object.assign(s, { phase: 'pull', pulls: 1, origin: s.runStart, touched: d === 1 ? x.l <= x.e9 : x.h >= x.e9,
                trig: d === 1 ? x.h + TICK : x.l - TICK, stop: roundTick(d === 1 ? x.l - TICK : x.h + TICK), run: 0 });
            } else { s.run = 0; }
          }
        }
        s.armedAt = x;
      }
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (pos || nT >= FLAG.maxTrades || b.ny.mins < RTH_OPEN || b.ny.mins >= eMin) continue;
    for (const d of [1, -1]) {
      const s = S[d];
      if (s.phase !== 'pull' || s.trig == null || (f === 'ema' && !s.touched)) continue;
      if (s.armedAt.ny.date !== b.ny.date) continue;
      if (!(d === 1 ? b.h >= s.trig : b.l <= s.trig)) continue;
      const trig = roundTick(s.trig), entry = (d === 1 ? Math.max(b.o, trig) : Math.min(b.o, trig)) + d * SLIP;
      const stop = s.stop, risk = (entry - stop) * d;
      Object.assign(s, mk()); S[-d].phase === 'pull' && Object.assign(S[-d], mk());
      if (risk <= 0 || risk > ORB.maxStopPts) break;
      nT++;
      const p0 = { dir: d, entryIdx: i + 1, date: b.ny.date, signalTime: `${s.armedAt.ny.date} ${s.armedAt.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
        entry, stop, target: roundTick(entry + d * rr * risk), setup: `${tf}-min ${d === 1 ? 'bull' : 'bear'} flag after 4+ candle run, break of prior candle` };
      if (d === 1 ? b.l <= stop : b.h >= stop) {           // stop touched on the fill bar: count as a loss
        const exit = stop - d * SLIP, pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
        trades.push({ ...p0, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (fill bar)', ambiguous: false, pnl, pnlBest: pnl });
      } else pos = p0;
      break;
    }
  }
  return trades;
}

// ---------- Strategy 29: Box theory - fade the edges of the previous day's range ----------
// Box = previous futures session (6 PM-5 PM) high/low, extended to include this session's overnight and
// first 15 minutes (through 9:45) if price already went beyond it. From 9:45 to 15:30: sell limit at the top,
// buy limit at the bottom. Stop = buf x box height past the edge (min 2 ticks). Target = midline ("mid")
// or the other edge ("far"). Each edge traded at most once a day. Flat 15:55. Skip if stop > ORB max.
const BOX = { entryEnd: '15:30', flatTime: '15:55' };
function runBOX(bars, { tgt, buf }) {
  const eMin = toMins(BOX.entryEnd), fMin = toMins(BOX.flatTime);
  const trades = [];
  let sess = null, prevH = null, prevL = null, curH = -Infinity, curL = Infinity, box = null, used = null, pos = null;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    const key = nyTime(b.t + 6 * 3600).date;                 // futures session: 6 PM belongs to the next day
    if (key !== sess) {
      if (sess !== null && Number.isFinite(curH)) { prevH = curH; prevL = curL; }
      sess = key; curH = -Infinity; curL = Infinity; box = null; used = { 1: false, [-1]: false };
    }
    const preBox = b.ny.date === key && b.ny.mins >= RTH_OPEN + 15 && !box;
    if (preBox && prevH != null) {
      const top = Math.max(prevH, curH), bot = Math.min(prevL, curL);
      box = { top, bot, mid: (top + bot) / 2, h: top - bot };
    }
    curH = Math.max(curH, b.h); curL = Math.min(curL, b.l);
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (pos || !box || b.ny.date !== key || b.ny.mins < RTH_OPEN + 15 || b.ny.mins >= eMin) continue;
    for (const d of [-1, 1]) {                              // -1 = sell at top, 1 = buy at bottom
      if (used[d]) continue;
      const edge = roundTick(d === -1 ? box.top : box.bot);
      if (!(d === -1 ? b.h >= edge : b.l <= edge)) continue;
      used[d] = true;
      const off = Math.max(2 * TICK, roundTick(buf * box.h));
      const stop = roundTick(edge - d * off);
      if (d === -1 ? b.o >= stop : b.o <= stop) break;      // gapped through the stop: no trade
      const entry = d === -1 ? Math.max(b.o, edge) : Math.min(b.o, edge);
      const risk = (entry - stop) * d;
      const target = roundTick(tgt === 'mid' ? box.mid : (d === -1 ? box.bot : box.top));
      if (risk <= 0 || risk > ORB.maxStopPts || (target - entry) * d <= 0) break;
      const p0 = { dir: d, entryIdx: i + 1, date: b.ny.date, signalTime: `${b.ny.date} ${b.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
        entry, stop, target, setup: `box ${box.bot.toFixed(2)}-${box.top.toFixed(2)} (${box.h.toFixed(2)} pts), ${d === -1 ? 'sell top' : 'buy bottom'}` };
      if (d === -1 ? b.h >= stop : b.l <= stop) {
        const exit = stop - d * SLIP, pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
        trades.push({ ...p0, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (fill bar)', ambiguous: false, pnl, pnlBest: pnl });
      } else pos = p0;
      break;
    }
  }
  return trades;
}

// ---------- Strategy 30: 9 / 30 / 200 EMA trend pullback ----------
// Trend: close above (below) the 200 EMA. Pullback: 9 EMA crosses below (above) the 30 EMA; mark the swing high
// (low) where the pullback started = highest high of the last 10 candles at the cross. Re-arm when the 9 crosses
// back. Entry: a candle CLOSES beyond that swing while the 9 is back on the trend side and price is past the 200.
// Stop: 1 tick beyond the 30 EMA ("ema") or the pullback's extreme ("swing"). Target 1.5R. 9:30-15:00, max 3/day.
const EMA3 = { look: 10, entryEnd: '15:00', flatTime: '15:55', maxTrades: 3 };
function runEMA3(bars, { rr, tf, stopAt }) {
  const tfx = Math.max(tf, INTERVAL === '1m' ? 1 : 5);
  const C = aggregate(bars, tfx);
  const ks = [9, 30, 200].map(n => 2 / (n + 1)); let e = [null, null, null];
  for (const x of C) { x.ny = nyTime(x.t); e = e.map((v, q) => v == null ? x.c : x.c * ks[q] + v * (1 - ks[q])); [x.e9, x.e30, x.e200] = e; }
  const eMin = toMins(EMA3.entryEnd), fMin = toMins(EMA3.flatTime);
  const S = { 1: { phase: 'none' }, [-1]: { phase: 'none' } };
  const trades = [];
  const diag = { hours: 0, inTrade: 0, maxTrades: 0, rth: 0, badStop: 0, tooWide: 0, wideSum: 0 };
  let k = 0, pos = null, day = null, nT = 0;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; }
    let signal = null;
    while (k < C.length && C[k].end <= b.t) {
      const j = k++, x = C[j], p = C[j - 1];
      if (!p || j < 600) continue;
      for (const d of [1, -1]) {
        const s = S[d];
        const trendOk = d === 1 ? x.c > x.e200 : x.c < x.e200;
        if (!trendOk) { S[d] = { phase: 'none' }; continue; }
        const against = d === 1 ? x.e9 < x.e30 : x.e9 > x.e30;
        const wasAgainst = d === 1 ? p.e9 < p.e30 : p.e9 > p.e30;
        if (against && !wasAgainst) {                       // pullback starts
          let ext = d === 1 ? -Infinity : Infinity;
          for (let q = Math.max(0, j - EMA3.look); q <= j; q++) ext = d === 1 ? Math.max(ext, C[q].h) : Math.min(ext, C[q].l);
          const keep = s.phase === 'armed' || s.phase === 'pull';
          S[d] = { phase: 'pull', swing: keep ? (d === 1 ? Math.max(s.swing, ext) : Math.min(s.swing, ext)) : ext,
                   ext2: d === 1 ? x.l : x.h };
          continue;
        }
        if (s.phase === 'pull') {
          s.ext2 = d === 1 ? Math.min(s.ext2, x.l) : Math.max(s.ext2, x.h);
          if (!against) s.phase = 'armed';
        }
        if (s.phase === 'armed' && !against && (d === 1 ? x.c > s.swing : x.c < s.swing)) {
          signal = signal || { d, x, swing: s.swing, ext2: s.ext2 };
          S[d] = { phase: 'none' };
        }
      }
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (signal) {
      const inHours = b.ny.mins >= RTH_OPEN && b.ny.mins < eMin && signal.x.ny.date === b.ny.date;
      if (!inHours) diag.hours++; else if (pos) diag.inTrade++; else if (nT >= EMA3.maxTrades) diag.maxTrades++;
    }
    if (signal && !pos && nT < EMA3.maxTrades && b.ny.mins >= RTH_OPEN && b.ny.mins < eMin && signal.x.ny.date === b.ny.date) {
      const { d, x } = signal, entry = b.o + d * SLIP;
      const stop = roundTick((stopAt === 'ema' ? x.e30 : signal.ext2) - d * TICK), risk = (entry - stop) * d;
      diag.rth++;
      if (risk <= 0) diag.badStop++; else if (risk > ORB.maxStopPts) { diag.tooWide++; diag.wideSum += risk; }
      if (risk > 0 && risk <= ORB.maxStopPts) {
        nT++;
        pos = { dir: d, entryIdx: i, date: b.ny.date, signalTime: `${x.ny.date} ${x.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
          entry, stop, target: roundTick(entry + d * rr * risk),
          setup: `${tfx}-min: 9/30 pullback, close beyond swing ${signal.swing.toFixed(2)}, 200 EMA ${x.e200.toFixed(2)}` };
        const t = manageExit(b, pos, fMin);
        if (t) { trades.push(t); pos = null; }
      }
    }
  }
  console.log(`  [${tfx}-min, stop ${stopAt}] setups: ${diag.hours + diag.inTrade + diag.maxTrades + diag.rth} | outside 9:30-15:00: ${diag.hours} | already in a trade: ${diag.inTrade} | day limit: ${diag.maxTrades} | in hours: ${diag.rth} -> stop too wide (> ${ORB.maxStopPts} pts): ${diag.tooWide}${diag.tooWide ? ` (avg ${(diag.wideSum / diag.tooWide).toFixed(1)} pts)` : ''}, bad stop: ${diag.badStop}`);
  return trades;
}

// ---------- Strategy 31: Previous 1-hour candle continuation ----------
// Bias = color of the last completed clock-hour candle (red -> sells only, green -> buys only).
// On the base chart (1m or 5m) find swing points (2 candles each side). For a SELL: the swings show an up-leg
// (higher high + higher low) followed by a LOWER high. Sell stop 1 tick under the swing low before that lower
// high; stop 1 tick above the lower high. "cur": the current hour's candle must also be red at the fill.
// Target rr x risk; "be": stop moved to entry once price reaches 1.5R. Entries 9:30-15:30, max 5/day, flat 15:55.
const HR1 = { k: 2, entryEnd: '15:30', flatTime: '15:55', maxTrades: 5 };
function runHR1(bars, { rr, be, cur }) {
  const eMin = toMins(HR1.entryEnd), fMin = toMins(HR1.flatTime), K = HR1.k;
  const trades = [], piv = [];                         // confirmed swings: {type:'H'|'L', p, i}
  let hourKey = null, hO = null, prevBias = 0, curO = null, order = null, pos = null, day = null, nT = 0;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; }
    const hk = `${b.ny.date} ${Math.floor(b.ny.mins / 60)}`;
    if (hk !== hourKey) {
      if (hourKey !== null && hO != null) prevBias = bars[i - 1].c > hO ? 1 : bars[i - 1].c < hO ? -1 : 0;
      hourKey = hk; hO = b.o; curO = b.o;
      if (order && order.d !== prevBias) order = null;
    }
    // manage open position
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
      else if (be && !pos.beDone && (pos.dir === 1 ? b.h >= pos.entry + 1.5 * pos.risk : b.l <= pos.entry - 1.5 * pos.risk)) { pos.stop = roundTick(pos.entry); pos.beDone = true; }
    }
    // try to fill a pending stop order
    if (order && !pos) {
      const d = order.d;
      if (d === 1 ? b.h >= order.stop + 0 && b.l <= order.stop : false) { /* never */ }
      if (d === 1 ? b.l <= order.sl : b.h >= order.sl) order = null;           // invalidated before trigger
      else if (b.ny.mins >= RTH_OPEN && b.ny.mins < eMin && nT < HR1.maxTrades && (d === 1 ? b.h >= order.trig : b.l <= order.trig)) {
        const entry = (d === 1 ? Math.max(b.o, order.trig) : Math.min(b.o, order.trig)) + d * SLIP;
        const curOk = !cur || (d === 1 ? entry > curO : entry < curO);
        const risk = (entry - order.sl) * d;
        const o = order; order = null;
        if (curOk && risk > 0 && risk <= ORB.maxStopPts) {
          nT++;
          const p0 = { dir: d, entryIdx: i + 1, date: b.ny.date, signalTime: o.sig, entryTime: `${b.ny.date} ${b.ny.hm}`, entry, stop: o.sl, risk,
            target: roundTick(entry + d * rr * risk), setup: `prev hour ${d === 1 ? 'green' : 'red'}, counter-leg failed, break of swing ${o.trig.toFixed(2)}` };
          if (d === 1 ? b.l <= o.sl : b.h >= o.sl) {
            const exit = o.sl - d * SLIP, pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
            trades.push({ ...p0, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (fill bar)', ambiguous: false, pnl, pnlBest: pnl });
          } else pos = p0;
        }
      }
    }
    // confirm a swing at i-K
    const c = i - K;
    if (c >= K) {
      const x = bars[c]; let isH = true, isL = true;
      for (let j = c - K; j <= c + K; j++) { if (j === c) continue; if (bars[j].h >= x.h) isH = false; if (bars[j].l <= x.l) isL = false; }
      if (isH) piv.push({ t: 'H', p: x.h, i: c });
      if (isL) piv.push({ t: 'L', p: x.l, i: c });
      if ((isH || isL) && prevBias && !pos) {
        const Hs = piv.filter(q => q.t === 'H').slice(-3), Ls = piv.filter(q => q.t === 'L').slice(-3);
        const d = prevBias;
        if (d === -1 && isH && Hs.length >= 3 && Ls.length >= 2) {
          const [H0, H1, H2] = Hs; const lastL = Ls[Ls.length - 1], prevL = Ls[Ls.length - 2];
          if (H1.p > H0.p && H2.p < H1.p && lastL.i > H1.i && lastL.i < H2.i && lastL.p > prevL.p)
            order = { d, trig: roundTick(lastL.p - TICK), sl: roundTick(H2.p + TICK), sig: `${x.ny.date} ${x.ny.hm}` };
        }
        if (d === 1 && isL && Ls.length >= 3 && Hs.length >= 2) {
          const [L0, L1, L2] = Ls; const lastH = Hs[Hs.length - 1], prevH = Hs[Hs.length - 2];
          if (L1.p < L0.p && L2.p > L1.p && lastH.i > L1.i && lastH.i < L2.i && lastH.p < prevH.p)
            order = { d, trig: roundTick(lastH.p + TICK), sl: roundTick(L2.p - TICK), sig: `${x.ny.date} ${x.ny.hm}` };
        }
      }
      if (piv.length > 50) piv.splice(0, piv.length - 50);
    }
  }
  return trades.map(t => { const { risk, beDone, ...r } = t; return r; });
}

// ---------- Strategy 32: 15-minute liquidity sweep, lower-timeframe flip ----------
// 15-min swing highs/lows (higher/lower than 1 candle on each side) that price has not traded through yet.
// Sweep (sell setup): a 15-min candle trades above an untaken swing high but CLOSES back below it.
// "col": the sweep candle must be bullish (same color as the push into the high), his preference.
// Entry: during the NEXT 15-min candle only, the first base candle (1m/5m) that closes below the sweep
// candle's close -> enter next open. Stop 1 tick above the sweep candle's high. Target: nearest untaken
// 15-min swing low below (must be >= 1R, else skip) or a fixed 2R. Mirror for buys. 9:30-15:30, max 4/day.
const SW15 = { entryEnd: '15:30', flatTime: '15:55', maxTrades: 4 };
function runSW15(bars, { col, tg }) {
  const C = aggregate(bars, 15);
  for (const x of C) x.ny = nyTime(x.t);
  const eMin = toMins(SW15.entryEnd), fMin = toMins(SW15.flatTime);
  let highs = [], lows = [];                           // untaken swings: {p, i}
  const trades = [];
  let k = 0, pos = null, day = null, nT = 0, arm = null;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; }
    while (k < C.length && C[k].end <= b.t) {
      const j = k++, x = C[j];
      arm = null;                                      // a setup only lives for one 15-min candle
      // sweeps against existing untaken swings
      const hitH = highs.filter(h => x.h > h.p), hitL = lows.filter(l => x.l < l.p);
      const sweptH = hitH.filter(h => x.c < h.p), sweptL = hitL.filter(l => x.c > l.p);
      if (sweptH.length && (!col || x.c > x.o)) arm = { d: -1, lvl: x.c, sl: roundTick(x.h + TICK), x };
      else if (sweptL.length && (!col || x.c < x.o)) arm = { d: 1, lvl: x.c, sl: roundTick(x.l - TICK), x };
      highs = highs.filter(h => !(x.h > h.p)); lows = lows.filter(l => !(x.l < l.p));
      // new swing confirmed at j-1
      const p = C[j - 1], pp = C[j - 2];
      if (p && pp) {
        if (p.h > pp.h && p.h > x.h) highs.push({ p: p.h, i: j - 1 });
        if (p.l < pp.l && p.l < x.l) lows.push({ p: p.l, i: j - 1 });
      }
      if (highs.length > 60) highs = highs.slice(-60); if (lows.length > 60) lows = lows.slice(-60);
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (!arm || pos || nT >= SW15.maxTrades || b.ny.mins < RTH_OPEN || b.ny.mins >= eMin) continue;
    if (arm.x.ny.date !== b.ny.date) { arm = null; continue; }
    const d = arm.d;
    if (d === -1 ? b.h >= arm.sl : b.l <= arm.sl) { arm = null; continue; }   // swept candle's extreme taken out
    if (!(d === -1 ? b.c < arm.lvl : b.c > arm.lvl)) continue;
    const nb = bars[i + 1]; if (!nb) continue;
    const entry = nb.o + d * SLIP, risk = (entry - arm.sl) * d;
    let target;
    if (tg === 'swing') {
      const pool = d === -1 ? lows.filter(l => l.p < entry).map(l => l.p) : highs.filter(h => h.p > entry).map(h => h.p);
      if (!pool.length) { arm = null; continue; }
      target = roundTick(d === -1 ? Math.max(...pool) : Math.min(...pool));
      if ((target - entry) * d < risk) { arm = null; continue; }
    } else target = roundTick(entry + d * tg * risk);
    const a = arm; arm = null;
    if (risk <= 0 || risk > ORB.maxStopPts) continue;
    nT++;
    pos = { dir: d, entryIdx: i + 1, date: b.ny.date, signalTime: `${b.ny.date} ${b.ny.hm}`, entryTime: `${nb.ny.date} ${nb.ny.hm}`,
      entry, stop: a.sl, target, setup: `15-min sweep of swing ${d === -1 ? 'high' : 'low'} at ${a.x.ny.hm}, close ${a.lvl.toFixed(2)}` };
  }
  return trades;
}

// ---------- Strategy 33: MACD cross + 200 EMA ----------
// Long: close above the 200 EMA and the MACD line (12/26 EMA difference) crosses above its 9 signal line
// while BOTH are below zero. Short: mirror. Entry next base-bar open. Stop 1 tick beyond the 200 EMA ("ema",
// his rule) or beyond the lowest low / highest high of the last 10 candles ("swing"). Target 1.5R.
// Entries 9:30-15:00, max 3/day, flat 15:55, skip if stop > ORB max. Prints why setups were skipped.
const MACD = { entryEnd: '15:00', flatTime: '15:55', maxTrades: 3, look: 10 };
function runMACD(bars, { rr, tf, stopAt }) {
  const tfx = Math.max(tf, INTERVAL === '1m' ? 1 : 5);
  const C = aggregate(bars, tfx);
  const k = n => 2 / (n + 1); let e12 = null, e26 = null, sig = null, e200 = null;
  for (const x of C) {
    x.ny = nyTime(x.t);
    e12 = e12 == null ? x.c : x.c * k(12) + e12 * (1 - k(12)); e26 = e26 == null ? x.c : x.c * k(26) + e26 * (1 - k(26));
    x.macd = e12 - e26; sig = sig == null ? x.macd : x.macd * k(9) + sig * (1 - k(9)); x.sig = sig;
    e200 = e200 == null ? x.c : x.c * k(200) + e200 * (1 - k(200)); x.e200 = e200;
  }
  const eMin = toMins(MACD.entryEnd), fMin = toMins(MACD.flatTime);
  const diag = { all: 0, hours: 0, busy: 0, wide: 0, wideSum: 0 };
  const trades = [];
  let j = 0, pos = null, day = null, nT = 0;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; }
    let signal = null;
    while (j < C.length && C[j].end <= b.t) {
      const q = j++, x = C[q], p = C[q - 1];
      if (!p || q < 600) continue;
      const up = p.macd <= p.sig && x.macd > x.sig && x.macd < 0 && x.sig < 0 && x.c > x.e200;
      const dn = p.macd >= p.sig && x.macd < x.sig && x.macd > 0 && x.sig > 0 && x.c < x.e200;
      if (up || dn) {
        let ext = up ? Infinity : -Infinity;
        for (let r = Math.max(0, q - MACD.look + 1); r <= q; r++) ext = up ? Math.min(ext, C[r].l) : Math.max(ext, C[r].h);
        signal = { d: up ? 1 : -1, x, ext }; diag.all++;
      }
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { trades.push(t); pos = null; }
    }
    if (!signal) continue;
    if (!(b.ny.mins >= RTH_OPEN && b.ny.mins < eMin && signal.x.ny.date === b.ny.date)) { diag.hours++; continue; }
    if (pos || nT >= MACD.maxTrades) { diag.busy++; continue; }
    const { d, x } = signal, entry = b.o + d * SLIP;
    const stop = roundTick((stopAt === 'ema' ? x.e200 : signal.ext) - d * TICK), risk = (entry - stop) * d;
    if (risk <= 0) continue;
    if (risk > ORB.maxStopPts) { diag.wide++; diag.wideSum += risk; continue; }
    nT++;
    pos = { dir: d, entryIdx: i, date: b.ny.date, signalTime: `${x.ny.date} ${x.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`,
      entry, stop, target: roundTick(entry + d * rr * risk), setup: `${tfx}-min MACD cross ${d === 1 ? 'up below' : 'down above'} zero, 200 EMA ${x.e200.toFixed(2)}` };
    const t = manageExit(b, pos, fMin);
    if (t) { trades.push(t); pos = null; }
  }
  console.log(`  [${tfx}-min, stop ${stopAt}] setups: ${diag.all} | outside 9:30-15:00: ${diag.hours} | in a trade / day limit: ${diag.busy} | stop too wide (> ${ORB.maxStopPts} pts): ${diag.wide}${diag.wide ? ` (avg ${(diag.wideSum / diag.wide).toFixed(1)})` : ''}`);
  return trades;
}

// ---------- Strategy 34: 5-min swing levels, one trade a day ----------
// Levels: 5-min swing highs (resistance) and swing lows (support) - higher/lower than 2 candles each side -
// from today and the previous day, dropped once a 5-min candle CLOSES through them.
// 5-min trend: last two swing highs AND last two swing lows both lower (down) / both higher (up).
// Sell setup: a bearish 5-min candle whose high reaches a resistance level (within 0.25 x average candle
// range) and closes below it. Sell-stop 1 tick below its low, live for the next 3 five-min candles,
// cancelled if price trades above its high first. Stop 1 tick above the setup high. Target 2R. Mirror for buys.
// "trend": only trade with the 5-min trend. "win": done for the day after a winner (retry after a loss).
// Entries 9:30-15:30, max 3/day, flat 15:55. Prints a setup count line.
const ONE = { k: 2, entryEnd: '15:30', flatTime: '15:55', maxTrades: 3, life: 3, tolAtr: 0.25 };
function runONE(bars, { rr, f, cap }) {
  const C = aggregate(bars, 5);
  let atr = null;
  for (const x of C) { x.ny = nyTime(x.t); atr = atr == null ? x.h - x.l : (x.h - x.l) * (2 / 15) + atr * (13 / 15); x.atr = atr; }
  const eMin = toMins(ONE.entryEnd), fMin = toMins(ONE.flatTime), K = ONE.k;
  const trades = [], piv = [], dates = [];
  let levels = [], k = 0, order = null, pos = null, day = null, nT = 0, won = false;
  const diag = { setups: 0, hours: 0, wide: 0, fills: 0 };
  const close = t => { trades.push(t); if (t.pnl > 0) won = true; };
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) { day = b.ny.date; nT = 0; won = false; order = null; }
    while (k < C.length && C[k].end <= b.t) {
      const j = k++, x = C[j];
      if (dates[dates.length - 1] !== x.ny.date) { dates.push(x.ny.date); if (dates.length > 2) dates.shift(); }
      levels = levels.filter(L => dates.includes(L.date) && (L.t === 'H' ? x.c <= L.p : x.c >= L.p));
      // setup on this completed candle?
      const Hs = piv.filter(q => q.t === 'H').slice(-2), Ls = piv.filter(q => q.t === 'L').slice(-2);
      const trend = Hs.length === 2 && Ls.length === 2
        ? (Hs[1].p < Hs[0].p && Ls[1].p < Ls[0].p ? -1 : Hs[1].p > Hs[0].p && Ls[1].p > Ls[0].p ? 1 : 0) : 0;
      const tol = ONE.tolAtr * x.atr;
      const res = levels.some(L => L.t === 'H' && x.h >= L.p - tol && x.c < L.p);
      const sup = levels.some(L => L.t === 'L' && x.l <= L.p + tol && x.c > L.p);
      let d = 0;
      if (res && x.c < x.o && (f === 'any' || trend === -1)) d = -1;
      else if (sup && x.c > x.o && (f === 'any' || trend === 1)) d = 1;
      if (d) {
        diag.setups++;
        if (!(x.ny.mins + 5 > RTH_OPEN && x.ny.mins < eMin)) diag.hours++;
        else if (!pos) order = { d, trig: roundTick(d === -1 ? x.l - TICK : x.h + TICK), sl: roundTick(d === -1 ? x.h + TICK : x.l - TICK),
          exp: x.end + ONE.life * 300, sig: `${x.ny.date} ${x.ny.hm}` };
      }
      // confirm a swing at j-K
      const c = j - K;
      if (c >= K) {
        const y = C[c]; let isH = true, isL = true;
        for (let q = c - K; q <= c + K; q++) { if (q === c) continue; if (C[q].h >= y.h) isH = false; if (C[q].l <= y.l) isL = false; }
        if (isH) { piv.push({ t: 'H', p: y.h }); if (Math.max(...C.slice(c + 1, j + 1).map(z => z.c)) <= y.h) levels.push({ t: 'H', p: y.h, date: y.ny.date }); }
        if (isL) { piv.push({ t: 'L', p: y.l }); if (Math.min(...C.slice(c + 1, j + 1).map(z => z.c)) >= y.l) levels.push({ t: 'L', p: y.l, date: y.ny.date }); }
        if (piv.length > 40) piv.splice(0, piv.length - 40);
      }
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin);
      if (t) { close(t); pos = null; }
    }
    if (!order || pos) continue;
    const d = order.d;
    if (b.t >= order.exp || (d === 1 ? b.l <= order.sl : b.h >= order.sl) && !(d === 1 ? b.h >= order.trig : b.l <= order.trig)) { order = null; continue; }
    if (b.ny.mins < RTH_OPEN || b.ny.mins >= eMin || nT >= ONE.maxTrades || (cap === 'win' && won)) continue;
    if (!(d === 1 ? b.h >= order.trig : b.l <= order.trig)) continue;
    const o = order; order = null;
    const entry = (d === 1 ? Math.max(b.o, o.trig) : Math.min(b.o, o.trig)) + d * SLIP, risk = (entry - o.sl) * d;
    if (risk <= 0) continue;
    if (risk > ORB.maxStopPts) { diag.wide++; continue; }
    nT++; diag.fills++;
    const p0 = { dir: d, entryIdx: i + 1, date: b.ny.date, signalTime: o.sig, entryTime: `${b.ny.date} ${b.ny.hm}`, entry, stop: o.sl,
      target: roundTick(entry + d * rr * risk), setup: `${d === 1 ? 'bullish' : 'bearish'} 5-min candle at swing ${d === 1 ? 'low' : 'high'} level` };
    if (d === 1 ? b.l <= o.sl : b.h >= o.sl) {
      const exit = o.sl - d * SLIP, pnl = (exit - entry) * d * POINT_VALUE - COMMISSION_RT;
      close({ ...p0, exitTime: `${b.ny.date} ${b.ny.hm}`, exit, reason: 'stop (fill bar)', ambiguous: false, pnl, pnlBest: pnl });
    } else pos = p0;
  }
  console.log(`  [${f}, ${cap}] setups: ${diag.setups} | outside hours: ${diag.hours} | filled: ${diag.fills} | stop too wide (> ${ORB.maxStopPts} pts): ${diag.wide}`);
  return trades;
}

// ---------- Strategy 35: previous-day value area re-entry (volume profile mean reversion) ----------
// Profile: the previous regular session (9:30-16:00) volume spread evenly over each base bar's high-low, in
// price buckets (MES 1 pt, MNQ scaled). POC = busiest bucket; value area = 70% of volume grown out from the POC.
// Setup: a 5-min candle closes OUTSIDE the value area (out of balance), then a later 5-min candle closes back
// INSIDE it (failed auction). Enter next bar open toward the POC. Stop 1 tick beyond the most extreme price
// reached while outside. Target = POC (skip if under 1R). "vf": the re-entry candle's volume must be at least
// 1.5x the average of the last 20 five-min candles (stand-in for his big-order "aggression" bubbles).
// Sessions: New York 9:30-15:30 (flat 15:55) or London 3:00-8:30 (flat 11:00). Max 2 trades per session.
const VAP = { vaPct: 0.7, volMult: 1.5, maxTrades: 2 };
const vapProfiles = new Map();
function buildProfiles(bars) {
  if (vapProfiles.size) return vapProfiles;
  const bucket = Math.max(TICK, Math.round(ORB.maxStopPts / 12 / TICK) * TICK);
  const byDate = new Map();
  let withVol = 0;
  for (const b of bars) {
    if (b.ny.mins < RTH_OPEN || b.ny.mins >= 16 * 60) continue;
    const v = b.v > 0 ? b.v : 1; if (b.v > 0) withVol++;
    let m = byDate.get(b.ny.date); if (!m) byDate.set(b.ny.date, m = new Map());
    const lo = Math.floor(b.l / bucket), hi = Math.floor(b.h / bucket), n = hi - lo + 1;
    for (let q = lo; q <= hi; q++) m.set(q, (m.get(q) || 0) + v / n);
  }
  for (const [date, m] of byDate) {
    const keys = [...m.keys()].sort((a, b) => a - b);
    let total = 0, poc = keys[0];
    for (const q of keys) { total += m.get(q); if (m.get(q) > m.get(poc)) poc = q; }
    let lo = keys.indexOf(poc), hi = lo, got = m.get(poc);
    while (got < VAP.vaPct * total && (lo > 0 || hi < keys.length - 1)) {
      const up = hi < keys.length - 1 ? m.get(keys[hi + 1]) : -1, dn = lo > 0 ? m.get(keys[lo - 1]) : -1;
      if (up >= dn) got += m.get(keys[++hi]); else got += m.get(keys[--lo]);
    }
    vapProfiles.set(date, { poc: roundTick((poc + 0.5) * bucket), vah: roundTick((keys[hi] + 1) * bucket), val: roundTick(keys[lo] * bucket) });
  }
  const rth = bars.filter(b => b.ny.mins >= RTH_OPEN && b.ny.mins < 16 * 60).length;
  console.log(`  profile bucket ${bucket} pts | bars with volume: ${rth ? Math.round(100 * withVol / rth) : 0}%`);
  return vapProfiles;
}
function runVAP(bars, { ses, vf }) {
  const P = buildProfiles(bars), dates = [...P.keys()].sort();
  const [sMin, eMin, fMin] = ses === 'ny' ? [RTH_OPEN, toMins('15:30'), toMins('15:55')] : [3 * 60, toMins('08:30'), 11 * 60];
  // 5-min candles with volume
  const C = []; let cur = null;
  for (const b of bars) {
    const st = Math.floor(b.t / 300) * 300;
    if (!cur || cur.t !== st) { cur = { t: st, end: st + 300, o: b.o, h: b.h, l: b.l, c: b.c, v: b.v || 0 }; C.push(cur); }
    else { cur.h = Math.max(cur.h, b.h); cur.l = Math.min(cur.l, b.l); cur.c = b.c; cur.v += b.v || 0; }
  }
  for (let q = 0; q < C.length; q++) {
    C[q].ny = nyTime(C[q].t);
    let s = 0, n = 0; for (let r = Math.max(0, q - 20); r < q; r++) { s += C[r].v; n++; }
    C[q].avgV = n ? s / n : 0;
  }
  const diag = { setups: 0, noTarget: 0, lowVol: 0, wide: 0 };
  const trades = [];
  let k = 0, pos = null, day = null, nT = 0, prof = null, out = null;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (b.ny.date !== day) {
      day = b.ny.date; nT = 0; out = null;
      const prev = dates.filter(d => d < day); prof = prev.length ? P.get(prev[prev.length - 1]) : null;
    }
    let sig = null;
    while (k < C.length && C[k].end <= b.t) {
      const x = C[k++];
      if (!prof || x.ny.date !== day || x.ny.mins < sMin || x.ny.mins >= eMin) { if (x.ny.mins < sMin) out = null; continue; }
      if (x.c > prof.vah) { out = out && out.side === 1 ? { side: 1, ext: Math.max(out.ext, x.h) } : { side: 1, ext: x.h }; continue; }
      if (x.c < prof.val) { out = out && out.side === -1 ? { side: -1, ext: Math.min(out.ext, x.l) } : { side: -1, ext: x.l }; continue; }
      if (out) { sig = { d: -out.side, ext: out.side === 1 ? Math.max(out.ext, x.h) : Math.min(out.ext, x.l), x }; out = null; }
    }
    if (pos && i >= pos.entryIdx) {
      const t = manageExit(b, pos, fMin, true);
      if (t) { trades.push(t); pos = null; }
    }
    if (!sig || pos || nT >= VAP.maxTrades) continue;
    diag.setups++;
    const { d, ext, x } = sig;
    if (vf && !(x.v >= VAP.volMult * x.avgV && x.v > 0)) { diag.lowVol++; continue; }
    const entry = b.o + d * SLIP, stop = roundTick(ext - d * TICK), risk = (entry - stop) * d, target = prof.poc;
    if (risk <= 0) continue;
    if (risk > ORB.maxStopPts) { diag.wide++; continue; }
    if ((target - entry) * d < risk) { diag.noTarget++; continue; }
    nT++;
    pos = { dir: d, entryIdx: i, date: b.ny.date, signalTime: `${x.ny.date} ${x.ny.hm}`, entryTime: `${b.ny.date} ${b.ny.hm}`, entry, stop, target,
      setup: `back inside prev-day value ${prof.val.toFixed(2)}-${prof.vah.toFixed(2)}, POC ${prof.poc.toFixed(2)}` };
    const t = manageExit(b, pos, fMin, true);
    if (t) { trades.push(t); pos = null; }
  }
  console.log(`  [${ses}, ${vf ? 'volume filter' : 'no filter'}] re-entry setups: ${diag.setups} | failed volume filter: ${diag.lowVol} | POC under 1R away: ${diag.noTarget} | stop too wide (> ${ORB.maxStopPts} pts): ${diag.wide}`);
  return trades;
}

// ---------- Filter test (node mes_backtest.mjs <strategy> filt) ----------
// Runs the strategy's locked forward-test row, then re-scores it with each filter. A filter only uses
// 5-min candles that had fully CLOSED before the trade's entry bar started (no peeking ahead).
//   ema    : longs only above the 5-min 200 EMA, shorts only below
//   struct : 5-min swing structure agrees (last 2 swing highs AND lows rising for longs / falling for shorts)
//   vwap   : longs only above session VWAP (from 9:30), shorts only below (entries before 9:30 always pass)
//   chop   : skip when the last 12 five-min candles were choppy (net move < 30% of the total distance travelled)
//   2loss  : no more trades that day after 2 losses
// Note: for strategies that can trade more than once a day, a skipped trade could have freed up another
// setup later; this test does not add those back, so treat it as a close estimate.
const FILTERS = {
  none:          { label: 'no filter (as forward-tested)', keep: () => true },
  ema:           { label: '5-min 200 EMA trend', keep: (t, x) => t.dir === 1 ? x.c > x.ema : x.c < x.ema },
  struct:        { label: '5-min swing structure trend', keep: (t, x) => x.st === t.dir },
  vwap:          { label: 'session VWAP side', keep: (t, x) => x.vw == null || (t.dir === 1 ? x.c > x.vw : x.c < x.vw) },
  chop:          { label: 'skip choppy (efficiency < 0.3)', keep: (t, x) => x.er == null || x.er >= 0.3 },
  'ema+chop':    { label: '200 EMA trend + skip choppy', keep: (t, x) => (t.dir === 1 ? x.c > x.ema : x.c < x.ema) && (x.er == null || x.er >= 0.3) },
  'struct+chop': { label: 'swing structure + skip choppy', keep: (t, x) => x.st === t.dir && (x.er == null || x.er >= 0.3) },
  '2loss':       { label: 'stop for the day after 2 losses', keep: () => true, post: true },
};
function filterContext(bars) {
  const C = aggregate(bars, 5);
  let cpv = 0, cv = 0, vDate = null, bi = 0;
  const piv = [];
  for (let q = 0; q < C.length; q++) {
    const x = C[q]; x.ny = nyTime(x.t);
    // session VWAP from the base bars inside this candle
    while (bi < bars.length && bars[bi].t < x.end) {
      const b = bars[bi++];
      if (b.ny.mins >= RTH_OPEN && b.ny.mins < 960) {
        if (vDate !== b.ny.date) { vDate = b.ny.date; cpv = 0; cv = 0; }
        const v = b.v > 0 ? b.v : 1; cpv += v * (b.h + b.l + b.c) / 3; cv += v;
      }
    }
    x.vw = vDate === x.ny.date && x.ny.mins >= RTH_OPEN && cv ? cpv / cv : null;
    // efficiency ratio over the last 12 candles
    if (q >= 12) { let path = 0; for (let r = q - 11; r <= q; r++) path += Math.abs(C[r].c - C[r - 1].c); x.er = path ? Math.abs(x.c - C[q - 12].c) / path : 0; }
    // swing structure (pivot confirmed 2 candles later)
    const c = q - 2;
    if (c >= 2) {
      const y = C[c]; let isH = true, isL = true;
      for (let r = c - 2; r <= c + 2; r++) { if (r === c) continue; if (C[r].h >= y.h) isH = false; if (C[r].l <= y.l) isL = false; }
      if (isH) piv.push({ t: 'H', p: y.h }); if (isL) piv.push({ t: 'L', p: y.l });
      if (piv.length > 40) piv.splice(0, piv.length - 40);
    }
    const Hs = piv.filter(z => z.t === 'H').slice(-2), Ls = piv.filter(z => z.t === 'L').slice(-2);
    x.st = Hs.length === 2 && Ls.length === 2 ? (Hs[1].p > Hs[0].p && Ls[1].p > Ls[0].p ? 1 : Hs[1].p < Hs[0].p && Ls[1].p < Ls[0].p ? -1 : 0) : 0;
  }
  return C;
}
function runFilterTest() {
  const v = VARIANTS[FWD_ROW[STRATEGY]];
  const run = STRATEGY === 'ha' ? runHA : STRATEGY === 'orb' ? runORB : STRATEGY === 'sd' ? runSD : STRATEGY === 'ldn' ? runLDN : STRATEGY === 'pdh' ? runPDH : STRATEGY === 'fvgo' ? runFVGO : runHR1;
  let tr = run(bars, v);
  if (SINCE) tr = tr.filter(t => t.date >= SINCE);
  const C = filterContext(bars), ends = C.map(x => x.end);
  const tByKey = new Map(); for (const b of bars) tByKey.set(`${b.ny.date} ${b.ny.hm}`, b.t);
  const ctxOf = t => {
    const et = tByKey.get(t.entryTime); if (et == null) return null;
    let lo = 0, hi = ends.length - 1, ans = -1;
    while (lo <= hi) { const m = (lo + hi) >> 1; if (ends[m] <= et) { ans = m; lo = m + 1; } else hi = m - 1; }
    return ans >= 0 ? C[ans] : null;
  };
  console.log(`Filter test on the forward-test row: ${v.label}${v.rr != null ? ` (R:R ${v.rr})` : ''}\n`);
  const base = tr.length, rows = [];
  for (const [key, f] of Object.entries(FILTERS)) {
    let kept = tr.filter(t => { const x = ctxOf(t); return !x || f.keep(t, x); });
    if (f.post) { const losses = {}; kept = kept.filter(t => { const n = losses[t.date] || 0; if (n >= 2) return false; if (t.pnl <= 0) losses[t.date] = n + 1; return true; }); }
    const st = stats(kept);
    rows.push({ Filter: key, What: f.label, Trades: st.n, 'Kept %': base ? Math.round(100 * st.n / base) : 0,
      'Win %': st.n ? (100 * st.wins / st.n).toFixed(0) : '-', 'Net $': st.net.toFixed(2),
      'Profit factor': st.pf === Infinity ? 'inf' : st.pf.toFixed(2), 'Max DD $': st.dd.toFixed(2) });
  }
  console.table(rows);
  console.log('A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)');
  console.log('without cutting the trade count so far that the result is just luck.\n');
}

function stats(trades, key = 'pnl') {
  let net = 0, gw = 0, gl = 0, wins = 0, peak = 0, dd = 0;
  for (const t of trades) {
    const p = t[key]; net += p;
    if (p > 0) { wins++; gw += p; } else gl += -p;
    peak = Math.max(peak, net); dd = Math.max(dd, peak - net);
  }
  return { n: trades.length, wins, net, pf: gl ? gw / gl : (gw ? Infinity : 0), dd };
}

// ---------- Main ----------
const { bars, used } = await loadBars();
for (const b of bars) b.ny = nyTime(b.t);

// The "skip if stop is wider than X points" limits were set for MES.
// For other markets, scale them by how much that market actually MOVES compared to MES:
// the typical (median) size of the first 15 minutes after the open, measured over the
// same saved data. Falls back to the price ratio if no MES data file is present.
// MES values are untouched.
function medianOpeningRange(bs) {
  const byDay = new Map();
  for (const b of bs) {
    if (b.ny.mins < RTH_OPEN || b.ny.mins >= RTH_OPEN + 15) continue;
    const d = byDay.get(b.ny.date) || { h: -Infinity, l: Infinity };
    d.h = Math.max(d.h, b.h); d.l = Math.min(d.l, b.l);
    byDay.set(b.ny.date, d);
  }
  const w = [...byDay.values()].map(d => d.h - d.l).filter(x => x > 0).sort((a, b) => a - b);
  return w.length ? w[Math.floor(w.length / 2)] : null;
}
let scaleNote = '';
if (MARKET !== MARKETS.mes) {
  let scale = null, how = '';
  const mesFile = `${MARKETS.mes.cachePrefix}${INTERVAL}.json`;
  if (!process.env.SYNTH && existsSync(mesFile)) {
    try {
      const mesBars = JSON.parse(readFileSync(mesFile, 'utf8'));
      for (const b of mesBars) b.ny = nyTime(b.t);
      const a = medianOpeningRange(bars), m = medianOpeningRange(mesBars);
      if (a && m) { scale = a / m; how = `typical first-15-min range ${a.toFixed(1)} pts vs MES ${m.toFixed(1)} pts`; }
    } catch { /* fall through to price ratio */ }
  }
  if (!scale) {
    const closes = bars.map(b => b.c).sort((a, b) => a - b);
    scale = closes[Math.floor(closes.length / 2)] / 7800;
    how = 'price ratio (no MES data file found)';
  }
  HA.maxStopPts = Math.round(HA.maxStopPts * scale * 4) / 4;
  ORB.maxStopPts = Math.round(ORB.maxStopPts * scale * 4) / 4;
  scaleNote = `Max stop scaled x${scale.toFixed(2)} by ${how}: HA ${HA.maxStopPts} pts, ORB ${ORB.maxStopPts} pts`;
}
if (STRATEGY === 'ha') prepHA(bars);

const rthDays = d => new Set(bars.filter(b => b.ny.mins >= RTH_OPEN && b.ny.mins < 960 && (!d || b.ny.date >= d)).map(b => b.ny.date)).size;
const stratName = STRATEGY === 'vap' ? 'Previous-day value area: 5-min close back inside after a close outside, target POC' : STRATEGY === 'one' ? '5-min swing levels: reaction candle at level, stop order past it, 2R' : STRATEGY === 'macd' ? 'MACD (12/26/9) cross below/above zero + 200 EMA trend, 1.5R' : STRATEGY === 'sw15' ? `15-min swing sweep + close back inside, ${INTERVAL} close past the sweep candle's close` : STRATEGY === 'hr1' ? `Previous 1-hour candle bias + ${INTERVAL} counter-trend failure (lower high / higher low), break of swing` : STRATEGY === 'ema3' ? '9/30/200 EMA: 200 trend, 9-30 pullback cross and re-cross, close beyond pullback swing' : STRATEGY === 'box' ? 'Box theory: fade the previous day high/low (box extended by overnight + first 15 min)' : STRATEGY === 'flag' ? `Bull/bear flag: 4+ candle impulse, pullback, break of prior candle (${INTERVAL} chart)` : STRATEGY === 'orb5' ? '5-min opening range breakout (9:30 candle), 5-min close outside, optional 9/21 EMA filter' : STRATEGY === 'tl' ? 'Trendline action line / safety line (break one line, trail stop on the opposite line)' : STRATEGY === 'ha' ? 'Heikin Ashi pullback' : STRATEGY === 'orb' ? 'Opening Range Breakout' : STRATEGY === 'sd' ? 'Supply & demand zones (200 EMA)' : STRATEGY === 'ldn' ? '3AM-9:30 range: breakout / retest / sweep (5-min)' : STRATEGY === 'orbp' ? '15-min opening range: 5-min close outside, limit entry on pullback into the range' : STRATEGY === 'e50' ? '50 EMA cross, 2-candle pullback, break of swing high, chandelier stop' : STRATEGY === 'fvgo' ? `First-candle range break with a fair value gap, then gap retest (${INTERVAL} data)` : STRATEGY === 'ifvg' ? `IFVG model: 15-min gap key level, highest-timeframe (1-5 min) gap inversion entry, 9:30-11 (${INTERVAL} data)` : STRATEGY === 'snk' ? 'Sneaky pivot: 15-min open candle into prev-day/swing level, sneaky candle, break of it' : STRATEGY === 'asia' ? 'Sweep & flip: Asian range (8 PM-3 AM) swept at London open, 15-min candles, trades 3-6 AM' : STRATEGY === 'orev' ? `Morning reversal: fast move with 2+ FVGs, low/high at 9:35-10:15, higher low + break (${INTERVAL} entries)` : STRATEGY === 'vwap' ? 'VWAP + 9 EMA: test of both lines, clean candle through them, break of its low/high (5-min)' : STRATEGY === 'htf' ? `Higher-timeframe zone break & retest, ${INTERVAL} structure-break entry` : STRATEGY === 'p3' ? 'Power of Three: sweep of prev-day/London hi-lo after 9:30, reverse (5-min)' : STRATEGY === 'ema8' ? `8 EMA trend continuation (${INTERVAL} chart)` : STRATEGY === 'ovn' ? 'Overnight (6 PM-9:30) high/low break: retest or breakout, 2 contracts, trim + runner (5-min)' : STRATEGY === 'eng' ? `Engulfing candle + 200 EMA + RSI above/below 50 (${INTERVAL} chart)` : STRATEGY === 'scalp' ? `Morning scalp: break & retest of key level, 9:30-11:00 only (${INTERVAL} chart)` : STRATEGY === 'slc' ? `SLC: 4H structure + 5-min supply/demand + stochastic confirmation (${INTERVAL} fills)` : STRATEGY === 'cs' ? `Change of character + FVG midpoint (15m bias, ${INTERVAL} entries)` : STRATEGY === 'pdh' ? 'Previous-day high/low break & retest + daily 9/21 EMA trend' : STRATEGY === 'fbr' ? 'First-bar reversal (fade big 9:30 bar past its midpoint)' : STRATEGY === 'dorb' ? 'Displacement ORB (9:30-9:45) + zone entry + session filter' : STRATEGY === 'h2' ? `Two-legged pullback to 21 EMA (${INTERVAL} chart)` : STRATEGY === 'orr' ? '30-min opening range (9:30-10:00): breakout / retest / sweep (5-min)' : 'Overnight high/low break & retest (5-min)';
console.log(`\nMarket: ${MARKET.name}, $${POINT_VALUE} per point`);
console.log(`Strategy: ${stratName}, ${INTERVAL} bars`);
if (scaleNote) console.log(scaleNote);
console.log(`Data: ${used}`);
console.log(`      ${bars[0].ny.date} to ${bars.at(-1).ny.date} (NY time), ${rthDays()} trading days`);
if (SINCE) console.log(`FORWARD TEST: only counting trades from ${SINCE} on (${rthDays(SINCE)} trading days so far)`);
console.log(`Costs: $${COMMISSION_RT} round-trip commission + 1 tick slippage on entries and stops\n`);

if (FILT) {
  if (!(STRATEGY in FWD_ROW)) { console.log(`The filter test is for the forward-test strategies: ${Object.keys(FWD_ROW).join(', ')}`); process.exit(1); }
  runFilterTest(); process.exit(0);
}
const rows = [], allTrades = [];
for (const v of VARIANTS) {
  let tr = STRATEGY === 'ha' ? runHA(bars, v) : STRATEGY === 'orb' ? runORB(bars, v) : STRATEGY === 'sd' ? runSD(bars, v) : (STRATEGY === 'ldn' || STRATEGY === 'orr') ? runLDN(bars, v) : STRATEGY === 'h2' ? runH2(bars, v) : STRATEGY === 'dorb' ? runDORB(bars, v) : STRATEGY === 'fbr' ? runFBR(bars, v) : STRATEGY === 'pdh' ? runPDH(bars, v) : STRATEGY === 'cs' ? runCS(bars, v) : STRATEGY === 'slc' ? runSLC(bars, v) : STRATEGY === 'scalp' ? runSCALP(bars, v) : STRATEGY === 'eng' ? runENG(bars, v) : STRATEGY === 'ovn' ? runOVN(bars, v) : STRATEGY === 'ema8' ? runEMA8(bars, v) : STRATEGY === 'p3' ? runP3(bars, v) : STRATEGY === 'htf' ? runHTF(bars, v) : STRATEGY === 'vwap' ? runVWAP(bars, v) : STRATEGY === 'orev' ? runOREV(bars, v) : STRATEGY === 'asia' ? runASIA(bars, v) : STRATEGY === 'snk' ? runSNK(bars, v) : STRATEGY === 'ifvg' ? runIFVG(bars, v) : STRATEGY === 'fvgo' ? runFVGO(bars, v) : STRATEGY === 'e50' ? runE50(bars, v) : STRATEGY === 'orbp' ? runORBP(bars, v) : STRATEGY === 'tl' ? runTL(bars, v) : STRATEGY === 'orb5' ? runORB5(bars, v) : STRATEGY === 'flag' ? runFLAG(bars, v) : STRATEGY === 'box' ? runBOX(bars, v) : STRATEGY === 'ema3' ? runEMA3(bars, v) : STRATEGY === 'hr1' ? runHR1(bars, v) : STRATEGY === 'sw15' ? runSW15(bars, v) : STRATEGY === 'macd' ? runMACD(bars, v) : STRATEGY === 'one' ? runONE(bars, v) : STRATEGY === 'vap' ? runVAP(bars, v) : runON(bars, v);
  if (SINCE) tr = tr.filter(t => t.date >= SINCE);
  const s = stats(tr), sb = stats(tr, 'pnlBest');
  rows.push({
    'R:R': v.rr, 'Variant': v.label, 'Trades': s.n,
    'Win %': s.n ? (100 * s.wins / s.n).toFixed(0) : '-',
    'Net $': s.net.toFixed(2), 'Profit factor': s.pf === Infinity ? 'inf' : s.pf.toFixed(2),
    'Max DD $': s.dd.toFixed(2), 'Same-bar': tr.filter(t => t.ambiguous).length,
    'Net $ if same-bar = win': sb.net.toFixed(2),
  });
  for (const t of tr) allTrades.push({ variant: `RR${v.rr} ${v.label}`, ...t });
}
console.table(rows);

const cols = ['variant', 'signalTime', 'entryTime', 'dir', 'entry', 'stop', 'target', 'exitTime', 'exit', 'reason', 'ambiguous', 'pnl', 'pnlBest', 'setup'];
const csv = [cols.join(',')].concat(allTrades.map(t => cols.map(c => {
  const v = c === 'dir' ? (t.dir === 1 ? 'Long' : 'Short') : t[c];
  return typeof v === 'number' ? (Number.isInteger(v) ? v : v.toFixed(2)) : `"${v}"`;
}).join(','))).join('\n');
const outFile = `trades_${MARKET.filePrefix}${STRATEGY}_${INTERVAL}${SINCE ? '_since_' + SINCE : ''}.csv`;
writeFileSync(outFile, csv);
console.log(`\nSaved ${allTrades.length} trades to ${outFile}`);
console.log(`"Same-bar" = trades where one ${INTERVAL} candle touched BOTH stop and target. Counted as losses (worst case);`);
console.log('the last column shows the result if they had all been wins (best case). Truth is somewhere in between.\n');
