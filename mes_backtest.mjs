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
const MARKET = args.includes('mnq') ? MARKETS.mnq : MARKETS.mes;
const INTERVAL = args.includes('1m') ? '1m' : '5m';
const STRATEGY = args.includes('orb') ? 'orb' : args.includes('sd') ? 'sd' : args.includes('onr') ? 'onr' : args.includes('ldn') ? 'ldn' : args.includes('orr') ? 'orr' : args.includes('h2') ? 'h2' : args.includes('dorb') ? 'dorb' : 'ha';
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
const stratName = STRATEGY === 'ha' ? 'Heikin Ashi pullback' : STRATEGY === 'orb' ? 'Opening Range Breakout' : STRATEGY === 'sd' ? 'Supply & demand zones (200 EMA)' : STRATEGY === 'ldn' ? '3AM-9:30 range: breakout / retest / sweep (5-min)' : STRATEGY === 'dorb' ? 'Displacement ORB (9:30-9:45) + zone entry + session filter' : STRATEGY === 'h2' ? `Two-legged pullback to 21 EMA (${INTERVAL} chart)` : STRATEGY === 'orr' ? '30-min opening range (9:30-10:00): breakout / retest / sweep (5-min)' : 'Overnight high/low break & retest (5-min)';
console.log(`\nMarket: ${MARKET.name}, $${POINT_VALUE} per point`);
console.log(`Strategy: ${stratName}, ${INTERVAL} bars`);
if (scaleNote) console.log(scaleNote);
console.log(`Data: ${used}`);
console.log(`      ${bars[0].ny.date} to ${bars.at(-1).ny.date} (NY time), ${rthDays()} trading days`);
if (SINCE) console.log(`FORWARD TEST: only counting trades from ${SINCE} on (${rthDays(SINCE)} trading days so far)`);
console.log(`Costs: $${COMMISSION_RT} round-trip commission + 1 tick slippage on entries and stops\n`);

const rows = [], allTrades = [];
for (const v of VARIANTS) {
  let tr = STRATEGY === 'ha' ? runHA(bars, v) : STRATEGY === 'orb' ? runORB(bars, v) : STRATEGY === 'sd' ? runSD(bars, v) : (STRATEGY === 'ldn' || STRATEGY === 'orr') ? runLDN(bars, v) : STRATEGY === 'h2' ? runH2(bars, v) : STRATEGY === 'dorb' ? runDORB(bars, v) : runON(bars, v);
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
