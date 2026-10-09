// MES backtester (Node 18+, no packages needed). Free data from Yahoo Finance.
//
// Usage (words can go in any order):
//   node mes_backtest.mjs                  -> Heikin Ashi pullback, 5-minute bars (~60 days)
//   node mes_backtest.mjs 1m               -> Heikin Ashi pullback, 1-minute bars (~30 days)
//   node mes_backtest.mjs orb              -> Opening Range Breakout, 5-minute bars
//   node mes_backtest.mjs orb 1m           -> Opening Range Breakout, 1-minute bars
//   ... since 2026-10-09                   -> only count trades from that date on (forward test)
//   ... mnq                                -> run on MNQ (micro Nasdaq) instead of MES, e.g. "node mes_backtest.mjs mnq orb 1m"
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
const MARKET = args.includes('mnq') ? MARKETS.mnq : MARKETS.mes;
const INTERVAL = args.includes('1m') ? '1m' : '5m';
const STRATEGY = args.includes('orb') ? 'orb' : 'ha';
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

const VARIANTS = STRATEGY === 'ha'
  ? [1, 1.5, 2].flatMap(rr => ['09:30', '09:45'].map(start => ({ rr, start, label: `start ${start}` })))
  : [1, 1.5, 2].flatMap(rr => [15, 30].map(orMin => ({ rr, orMin, label: `${orMin}-min range` })));

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
    bars.push({ t: res.timestamp[i], o, h, l, c });
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
    catch { console.log(`  (could not read ${cacheFile}; starting fresh)`); }
  }
  const before = cache.size;
  let fresh = null;
  try { fresh = await download(MARKET.sym); } catch (e) { console.log(`Could not download ${MARKET.sym}: ${e.message}`); }
  if (fresh) for (const b of fresh) cache.set(b.t, b);
  if (!cache.size) { console.log('No data available. Check your internet connection and try again.'); process.exit(1); }
  const bars = [...cache.values()].sort((a, b) => a.t - b.t);
  writeFileSync(cacheFile, JSON.stringify(bars));
  const note = fresh ? `${cache.size - before} new bars added to ${cacheFile}` : `download failed, using saved ${cacheFile}`;
  return { bars, used: `${MARKET.sym} (${note})` };
}

function synthBars(n = 12000) { // offline self-test only (SYNTH=1)
  const bars = []; let p = 7000; let t = Date.UTC(2026, 7, 3, 4, 0) / 1000;
  const step = INTERVAL === '1m' ? 60 : 300;
  for (let i = 0; i < n; i++) {
    const o = p, c = o + (Math.random() - 0.48) * 4;
    bars.push({ t, o, h: Math.max(o, c) + Math.random() * 2, l: Math.min(o, c) - Math.random() * 2, c });
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
function manageExit(b, pos, flatMin) {
  const d = pos.dir;
  let exit = null, reason = '', ambiguous = false, bestExit = null;
  const outOfHold = b.ny.mins >= flatMin || b.ny.mins < RTH_OPEN || b.ny.date !== pos.date;
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
const stratName = STRATEGY === 'ha' ? 'Heikin Ashi pullback' : 'Opening Range Breakout';
console.log(`\nMarket: ${MARKET.name}, $${POINT_VALUE} per point`);
console.log(`Strategy: ${stratName}, ${INTERVAL} bars`);
if (scaleNote) console.log(scaleNote);
console.log(`Data: ${used}`);
console.log(`      ${bars[0].ny.date} to ${bars.at(-1).ny.date} (NY time), ${rthDays()} trading days`);
if (SINCE) console.log(`FORWARD TEST: only counting trades from ${SINCE} on (${rthDays(SINCE)} trading days so far)`);
console.log(`Costs: $${COMMISSION_RT} round-trip commission + 1 tick slippage on entries and stops\n`);

const rows = [], allTrades = [];
for (const v of VARIANTS) {
  let tr = STRATEGY === 'ha' ? runHA(bars, v) : runORB(bars, v);
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
