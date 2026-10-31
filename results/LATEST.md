# MES forward test - 2026-10-30 9:39 PM ET

## Heikin Ashi pullback (watch row 0: R:R 1, start 09:30)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Heikin Ashi pullback, 1m bars
Data: MES=F (6770 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-30 (NY time), 36 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (16 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ 'start 09:30' │ 21     │ '19'  │ '-279.50' │ '0.23'        │ '303.50' │ 1        │ '-270.75'               │
│ 1       │ 1   │ 'start 09:45' │ 22     │ '27'  │ '-169.00' │ '0.41'        │ '193.00' │ 2        │ '-149.00'               │
│ 2       │ 1.5 │ 'start 09:30' │ 21     │ '19'  │ '-233.25' │ '0.37'        │ '286.00' │ 2        │ '-217.00'               │
│ 3       │ 1.5 │ 'start 09:45' │ 22     │ '27'  │ '-105.25' │ '0.63'        │ '159.00' │ 3        │ '-75.25'                │
│ 4       │ 2   │ 'start 09:30' │ 21     │ '14'  │ '-299.50' │ '0.28'        │ '336.25' │ 2        │ '-282.00'               │
│ 5       │ 2   │ 'start 09:45' │ 21     │ '19'  │ '-182.00' │ '0.46'        │ '218.75' │ 3        │ '-148.25'               │
└─────────┴─────┴───────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 128 trades to trades_ha_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Opening Range Breakout (watch row 4: R:R 2, 15-min range)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (1 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-30 (NY time), 36 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (16 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 9      │ '56'  │ '-29.25'  │ '0.87'        │ '147.00' │ 0        │ '-29.25'                │
│ 1       │ 1   │ '30-min range' │ 5      │ '40'  │ '-80.00'  │ '0.53'        │ '130.50' │ 0        │ '-80.00'                │
│ 2       │ 1.5 │ '15-min range' │ 9      │ '11'  │ '-333.00' │ '0.19'        │ '409.75' │ 0        │ '-333.00'               │
│ 3       │ 1.5 │ '30-min range' │ 5      │ '20'  │ '-140.00' │ '0.35'        │ '216.75' │ 0        │ '-140.00'               │
│ 4       │ 2   │ '15-min range' │ 9      │ '11'  │ '-306.75' │ '0.25'        │ '409.75' │ 0        │ '-306.75'               │
│ 5       │ 2   │ '30-min range' │ 5      │ '20'  │ '-113.75' │ '0.48'        │ '216.75' │ 0        │ '-113.75'               │
└─────────┴─────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 42 trades to trades_orb_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Supply & demand zones - MNQ (watch row 1: R:R 2, 30-min chart) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Supply & demand zones (200 EMA), 5m bars
Max stop scaled x8.55 by typical first-15-min range 139.0 pts vs MES 16.3 pts: HA 68.5 pts, ORB 102.75 pts
Data: MNQ=F (1371 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 3      │ '33'  │ '1721.00' │ '6.91'        │ '291.00' │ 0        │ '1721.00'               │
│ 1       │ 2      │ '30-min chart' │ 3      │ '33'  │ '2215.50' │ '8.61'        │ '291.00' │ 0        │ '2215.50'               │
│ 2       │ 3      │ '30-min chart' │ 3      │ '33'  │ '2215.50' │ '8.61'        │ '291.00' │ 0        │ '2215.50'               │
│ 3       │ 'push' │ '15-min chart' │ 5      │ '20'  │ '-19.50'  │ '0.95'        │ '279.50' │ 0        │ '-19.50'                │
│ 4       │ 2      │ '15-min chart' │ 5      │ '20'  │ '-222.00' │ '0.39'        │ '279.50' │ 0        │ '-222.00'               │
│ 5       │ 3      │ '15-min chart' │ 5      │ '20'  │ '-151.00' │ '0.58'        │ '279.50' │ 0        │ '-151.00'               │
│ 6       │ 'push' │ '5-min chart'  │ 19     │ '32'  │ '520.50'  │ '1.63'        │ '550.50' │ 0        │ '520.50'                │
│ 7       │ 2      │ '5-min chart'  │ 19     │ '26'  │ '-148.50' │ '0.83'        │ '677.50' │ 0        │ '-148.50'               │
│ 8       │ 3      │ '5-min chart'  │ 19     │ '26'  │ '215.50'  │ '1.25'        │ '624.50' │ 0        │ '215.50'                │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 81 trades to trades_mnq_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range liquidity sweep - MES (watch row 4: sweep, R:R 1.5) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (1371 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 14     │ '29'  │ '-258.00' │ '0.57'        │ '467.50' │ 0        │ '-258.00'               │
│ 1       │ 2   │ 'breakout' │ 14     │ '29'  │ '-141.75' │ '0.76'        │ '440.00' │ 0        │ '-141.75'               │
│ 2       │ 1.5 │ 'retest'   │ 13     │ '23'  │ '-167.25' │ '0.48'        │ '167.25' │ 0        │ '-167.25'               │
│ 3       │ 2   │ 'retest'   │ 13     │ '15'  │ '-213.50' │ '0.40'        │ '221.25' │ 0        │ '-213.50'               │
│ 4       │ 1.5 │ 'sweep'    │ 12     │ '25'  │ '-206.50' │ '0.40'        │ '223.75' │ 2        │ '-129.00'               │
│ 5       │ 2   │ 'sweep'    │ 12     │ '25'  │ '-160.25' │ '0.53'        │ '198.25' │ 1        │ '-106.50'               │
└─────────┴─────┴────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 78 trades to trades_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MES (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 2      │ '100' │ '107.25' │ 'inf'         │ '0.00'   │ 0        │ '107.25'                │
│ 1       │ 1.5 │ 'no trend filter'         │ 8      │ '63'  │ '105.25' │ '1.59'        │ '94.50'  │ 0        │ '105.25'                │
│ 2       │ 2   │ 'with daily trend filter' │ 2      │ '100' │ '143.50' │ 'inf'         │ '0.00'   │ 0        │ '143.50'                │
│ 3       │ 2   │ 'no trend filter'         │ 8      │ '38'  │ '31.50'  │ '1.13'        │ '145.50' │ 0        │ '31.50'                 │
└─────────┴─────┴───────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 20 trades to trades_pdh_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MNQ (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Max stop scaled x8.42 by typical first-15-min range 139.0 pts vs MES 16.5 pts: HA 67.5 pts, ORB 101 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 2      │ '100' │ '374.50' │ 'inf'         │ '0.00'   │ 0        │ '374.50'                │
│ 1       │ 1.5 │ 'no trend filter'         │ 5      │ '60'  │ '393.00' │ '5.14'        │ '95.00'  │ 0        │ '393.00'                │
│ 2       │ 2   │ 'with daily trend filter' │ 2      │ '100' │ '501.00' │ 'inf'         │ '0.00'   │ 0        │ '501.00'                │
│ 3       │ 2   │ 'no trend filter'         │ 5      │ '60'  │ '558.00' │ '6.87'        │ '95.00'  │ 0        │ '558.00'                │
└─────────┴─────┴───────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 14 trades to trades_mnq_pdh_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG, day entry - MNQ (watch row 2: 15-min range, 5-min gap, limit, R:R 2) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Max stop scaled x8.42 by typical first-15-min range 139.0 pts vs MES 16.5 pts: HA 67.5 pts, ORB 101 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 5      │ '20'  │ '-5.00'   │ '0.99'        │ '338.50' │ 0        │ '-5.00'                 │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 5      │ '20'  │ '-194.50' │ '0.66'        │ '338.50' │ 0        │ '-194.50'               │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 5      │ '20'  │ '-547.50' │ '0.28'        │ '619.00' │ 0        │ '-547.50'               │
│ 3       │ 3   │ 'DAY: same, 3R'                                        │ 5      │ '20'  │ '-547.50' │ '0.28'        │ '619.00' │ 0        │ '-547.50'               │
└─────────┴─────┴────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 20 trades to trades_mnq_fvgo_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous 1-hour candle continuation - MNQ, 1-min (watch row 0: his rules, 2R + break-even at 1.5R) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x7.88 by typical first-15-min range 128.0 pts vs MES 16.3 pts: HA 63 pts, ORB 94.5 pts
Data: MNQ=F (6771 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-30 (NY time), 37 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 21     │ '38'  │ '364.00' │ '1.42'        │ '351.50' │ 0        │ '364.00'                │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 21     │ '38'  │ '297.50' │ '1.32'        │ '351.50' │ 0        │ '297.50'                │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 21     │ '43'  │ '151.00' │ '1.17'        │ '371.50' │ 0        │ '151.00'                │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 38     │ '39'  │ '331.00' │ '1.20'        │ '712.00' │ 0        │ '331.00'                │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 101 trades to trades_mnq_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Confirmation tracks (same locked versions, other market)

## ORB on MNQ (watch row 4: R:R 2, 15-min range)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Opening Range Breakout, 1m bars
Max stop scaled x7.88 by typical first-15-min range 128.0 pts vs MES 16.3 pts: HA 63 pts, ORB 94.5 pts
Data: MNQ=F (1 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-30 (NY time), 37 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (16 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 11     │ '36'  │ '-512.50' │ '0.53'        │ '628.00' │ 0        │ '-512.50'               │
│ 1       │ 1   │ '30-min range' │ 6      │ '33'  │ '-303.50' │ '0.51'        │ '446.00' │ 0        │ '-303.50'               │
│ 2       │ 1.5 │ '15-min range' │ 11     │ '36'  │ '-390.00' │ '0.64'        │ '723.00' │ 0        │ '-390.00'               │
│ 3       │ 1.5 │ '30-min range' │ 6      │ '33'  │ '-312.00' │ '0.49'        │ '443.50' │ 0        │ '-312.00'               │
│ 4       │ 2   │ '15-min range' │ 11     │ '27'  │ '-460.00' │ '0.61'        │ '723.00' │ 0        │ '-460.00'               │
│ 5       │ 2   │ '30-min range' │ 6      │ '33'  │ '-226.00' │ '0.63'        │ '443.50' │ 0        │ '-226.00'               │
└─────────┴─────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 51 trades to trades_mnq_orb_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Supply & demand on MES (watch row 1: R:R 2, 30-min chart)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Supply & demand zones (200 EMA), 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 4      │ '25'  │ '543.25'  │ '4.54'        │ '153.50' │ 0        │ '543.25'                │
│ 1       │ 2      │ '30-min chart' │ 4      │ '25'  │ '754.50'  │ '5.92'        │ '153.50' │ 0        │ '754.50'                │
│ 2       │ 3      │ '30-min chart' │ 4      │ '25'  │ '754.50'  │ '5.92'        │ '153.50' │ 0        │ '754.50'                │
│ 3       │ 'push' │ '15-min chart' │ 3      │ '33'  │ '19.00'   │ '1.32'        │ '59.00'  │ 0        │ '19.00'                 │
│ 4       │ 2      │ '15-min chart' │ 3      │ '33'  │ '14.00'   │ '1.24'        │ '59.00'  │ 0        │ '14.00'                 │
│ 5       │ 3      │ '15-min chart' │ 3      │ '33'  │ '51.50'   │ '1.87'        │ '59.00'  │ 0        │ '51.50'                 │
│ 6       │ 'push' │ '5-min chart'  │ 27     │ '30'  │ '812.25'  │ '2.54'        │ '165.75' │ 0        │ '812.25'                │
│ 7       │ 2      │ '5-min chart'  │ 27     │ '33'  │ '906.00'  │ '2.84'        │ '186.75' │ 0        │ '906.00'                │
│ 8       │ 3      │ '5-min chart'  │ 27     │ '33'  │ '1066.00' │ '3.16'        │ '165.75' │ 0        │ '1066.00'               │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 102 trades to trades_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep on MNQ (watch row 4: sweep, R:R 1.5)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.42 by typical first-15-min range 139.0 pts vs MES 16.5 pts: HA 67.5 pts, ORB 101 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 11     │ '45'  │ '277.00'  │ '1.28'        │ '360.50' │ 0        │ '277.00'                │
│ 1       │ 2   │ 'breakout' │ 11     │ '36'  │ '120.00'  │ '1.11'        │ '418.00' │ 0        │ '120.00'                │
│ 2       │ 1.5 │ 'retest'   │ 9      │ '33'  │ '-490.50' │ '0.45'        │ '800.00' │ 0        │ '-490.50'               │
│ 3       │ 2   │ 'retest'   │ 9      │ '33'  │ '-353.00' │ '0.61'        │ '800.00' │ 0        │ '-353.00'               │
│ 4       │ 1.5 │ 'sweep'    │ 12     │ '50'  │ '186.00'  │ '1.22'        │ '545.50' │ 0        │ '186.00'                │
│ 5       │ 2   │ 'sweep'    │ 12     │ '42'  │ '213.00'  │ '1.23'        │ '550.50' │ 0        │ '213.00'                │
└─────────┴─────┴────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 64 trades to trades_mnq_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG day entry on MES (watch row 2: R:R 2)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 4      │ '0'   │ '-173.00' │ '0.00'        │ '173.00' │ 0        │ '-173.00'               │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 4      │ '0'   │ '-173.00' │ '0.00'        │ '173.00' │ 0        │ '-173.00'               │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 8      │ '38'  │ '-162.25' │ '0.60'        │ '378.25' │ 0        │ '-162.25'               │
│ 3       │ 3   │ 'DAY: same, 3R'                                        │ 8      │ '38'  │ '-52.25'  │ '0.87'        │ '378.25' │ 0        │ '-52.25'                │
└─────────┴─────┴────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 24 trades to trades_fvgo_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous 1-hour candle continuation on MES, 1-min (watch row 0: his rules)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (1 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-30 (NY time), 36 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 13     │ '15'  │ '-234.75' │ '0.40'        │ '305.50' │ 0        │ '-234.75'               │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 13     │ '15'  │ '-234.75' │ '0.40'        │ '305.50' │ 0        │ '-234.75'               │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 13     │ '15'  │ '-276.00' │ '0.29'        │ '305.50' │ 0        │ '-276.00'               │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 21     │ '33'  │ '-69.50'  │ '0.85'        │ '178.50' │ 0        │ '-69.50'                │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 60 trades to trades_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Filter tracks (locked 2026-10-10, started 2026-10-12) - compare the watched filter row to the 'none' row

## ORB + 200 EMA trend + skip choppy - MES, 1-min (watch filter: ema+chop)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (1 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-30 (NY time), 36 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 8      │ 100    │ '0'   │ '-409.75' │ '0.00'        │ '409.75' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 4      │ 50     │ '0'   │ '-191.75' │ '0.00'        │ '191.75' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 8      │ 100    │ '0'   │ '-409.75' │ '0.00'        │ '409.75' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 13     │ '0'   │ '-52.00'  │ '0.00'        │ '52.00'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 8      │ 100    │ '0'   │ '-409.75' │ '0.00'        │ '409.75' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## ORB + 200 EMA trend + skip choppy - MNQ, 1-min (watch filter: ema+chop)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Opening Range Breakout, 1m bars
Max stop scaled x7.88 by typical first-15-min range 128.0 pts vs MES 16.3 pts: HA 63 pts, ORB 94.5 pts
Data: MNQ=F (1 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-30 (NY time), 37 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 10     │ 100    │ '30'  │ '-272.00' │ '0.73'        │ '582.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 5      │ 50     │ '40'  │ '-22.50'  │ '0.95'        │ '413.00' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 2      │ 20     │ '50'  │ '-107.00' │ '0.31'        │ '154.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 9      │ 90     │ '33'  │ '-140.50' │ '0.84'        │ '451.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 2      │ 20     │ '100' │ '379.00'  │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 1      │ 10     │ '100' │ '47.50'   │ 'inf'         │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 10     │ '100' │ '47.50'   │ 'inf'         │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 10     │ 100    │ '30'  │ '-272.00' │ '0.73'        │ '582.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MES (watch filter: vwap)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 12     │ 100    │ '25'  │ '-206.50' │ '0.40'        │ '223.75' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 8      │ '0'   │ '-50.75'  │ '0.00'        │ '50.75'  │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 3      │ 25     │ '0'   │ '-116.00' │ '0.00'        │ '116.00' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 4      │ 33     │ '25'  │ '-180.50' │ '0.19'        │ '222.25' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 5      │ 42     │ '40'  │ '32.50'   │ '1.51'        │ '52.75'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 8      │ '0'   │ '-10.75'  │ '0.00'        │ '10.75'  │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 12     │ 100    │ '25'  │ '-206.50' │ '0.40'        │ '223.75' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MNQ (watch filter: vwap)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.42 by typical first-15-min range 139.0 pts vs MES 16.5 pts: HA 67.5 pts, ORB 101 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 12     │ 100    │ '50'  │ '186.00'  │ '1.22'        │ '545.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 2      │ 17     │ '50'  │ '-13.50'  │ '0.85'        │ '90.00'  │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 2      │ 17     │ '50'  │ '-198.00' │ '0.28'        │ '274.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 5      │ 42     │ '40'  │ '19.50'   │ '1.04'        │ '364.50' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 8      │ '100' │ '111.50'  │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 12     │ 100    │ '50'  │ '186.00'  │ '1.22'        │ '545.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MNQ, 1-min (watch filter: ema)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x7.88 by typical first-15-min range 128.0 pts vs MES 16.3 pts: HA 63 pts, ORB 94.5 pts
Data: MNQ=F (1 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-30 (NY time), 37 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 21     │ 100    │ '38'  │ '364.00'  │ '1.42'        │ '351.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 14     │ 67     │ '43'  │ '396.00'  │ '1.59'        │ '304.00' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 15     │ 71     │ '40'  │ '503.00'  │ '1.95'        │ '236.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 14     │ 67     │ '43'  │ '528.50'  │ '1.99'        │ '195.50' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 4      │ 19     │ '0'   │ '-219.50' │ '0.00'        │ '219.50' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 2      │ 10     │ '0'   │ '-169.50' │ '0.00'        │ '169.50' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 4      │ 19     │ '0'   │ '-219.50' │ '0.00'        │ '219.50' │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 18     │ 86     │ '39'  │ '387.50'  │ '1.50'        │ '328.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MES, 1-min (watch filter: ema)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (1 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-30 (NY time), 36 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 13     │ 100    │ '15'  │ '-234.75' │ '0.40'        │ '305.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 11     │ 85     │ '18'  │ '-177.00' │ '0.47'        │ '274.75' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 8      │ 62     │ '13'  │ '-162.25' │ '0.36'        │ '167.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 12     │ 92     │ '17'  │ '-207.75' │ '0.43'        │ '305.50' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 7      │ 54     │ '14'  │ '-121.50' │ '0.43'        │ '153.75' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 6      │ 46     │ '17'  │ '-90.75'  │ '0.50'        │ '123.00' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 4      │ 31     │ '25'  │ '-41.75'  │ '0.68'        │ '74.00'  │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 11     │ 85     │ '18'  │ '-178.25' │ '0.47'        │ '249.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

# $100 ETF tracks - fractional shares, $0 commission (locked 2026-10-23, started 2026-10-26). Net $ on a $100 account = % return

## 3AM-range sweep - QQQ (watch row 4: sweep, R:R 1.5)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.139 shares (fractional), $0.14 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.19 by typical first-15-min range 3.2 pts vs MES 16.5 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (961 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-10-30 (NY time), 65 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (5 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬────────────┬────────┬───────┬─────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $   │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼─────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 1      │ '100' │ '0.40'  │ 'inf'         │ '0.00'   │ 0        │ '0.40'                  │
│ 1       │ 2   │ 'breakout' │ 1      │ '100' │ '0.54'  │ 'inf'         │ '0.00'   │ 0        │ '0.54'                  │
│ 2       │ 1.5 │ 'retest'   │ 3      │ '33'  │ '-0.46' │ '0.23'        │ '0.46'   │ 0        │ '-0.46'                 │
│ 3       │ 2   │ 'retest'   │ 3      │ '33'  │ '-0.42' │ '0.30'        │ '0.42'   │ 0        │ '-0.42'                 │
│ 4       │ 1.5 │ 'sweep'    │ 3      │ '33'  │ '-0.10' │ '0.50'        │ '0.14'   │ 0        │ '-0.10'                 │
│ 5       │ 2   │ 'sweep'    │ 3      │ '33'  │ '-0.07' │ '0.67'        │ '0.14'   │ 0        │ '-0.07'                 │
└─────────┴─────┴────────────┴────────┴───────┴─────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 14 trades to trades_qqq_ldn_5m_since_2026-10-26.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep - SPY (watch row 4: sweep, R:R 1.5)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.10 by typical first-15-min range 1.6 pts vs MES 16.5 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (945 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-10-30 (NY time), 65 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (5 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬────────────┬────────┬───────┬─────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $   │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼─────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 4      │ '25'  │ '-0.15' │ '0.66'        │ '0.44'   │ 0        │ '-0.15'                 │
│ 1       │ 2   │ 'breakout' │ 4      │ '25'  │ '-0.05' │ '0.88'        │ '0.44'   │ 0        │ '-0.05'                 │
│ 2       │ 1.5 │ 'retest'   │ 5      │ '40'  │ '-0.02' │ '0.89'        │ '0.22'   │ 0        │ '-0.02'                 │
│ 3       │ 2   │ 'retest'   │ 5      │ '20'  │ '-0.02' │ '0.91'        │ '0.24'   │ 0        │ '-0.02'                 │
│ 4       │ 1.5 │ 'sweep'    │ 4      │ '25'  │ '-0.41' │ '0.20'        │ '0.41'   │ 0        │ '-0.41'                 │
│ 5       │ 2   │ 'sweep'    │ 4      │ '25'  │ '-0.37' │ '0.26'        │ '0.37'   │ 0        │ '-0.37'                 │
└─────────┴─────┴────────────┴────────┴───────┴─────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 26 trades to trades_spy_ldn_5m_since_2026-10-26.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep + VWAP side - QQQ (watch filter: vwap)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.139 shares (fractional), $0.14 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.19 by typical first-15-min range 3.2 pts vs MES 16.5 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-10-30 (NY time), 65 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (5 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬─────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $   │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼─────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 3      │ 100    │ '33'  │ '-0.10' │ '0.50'        │ '0.14'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 33     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 1      │ 33     │ '0'   │ '-0.06' │ '0.00'        │ '0.06'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 33     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 33     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 3      │ 100    │ '33'  │ '-0.10' │ '0.50'        │ '0.14'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴─────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - SPY (watch filter: vwap)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.10 by typical first-15-min range 1.6 pts vs MES 16.5 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-10-30 (NY time), 65 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (5 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬─────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $   │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼─────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 4      │ 100    │ '25'  │ '-0.41' │ '0.20'        │ '0.41'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 25     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 25     │ '0'   │ '-0.09' │ '0.00'        │ '0.09'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 2      │ 50     │ '0'   │ '-0.42' │ '0.00'        │ '0.42'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 2      │ 50     │ '50'  │ '0.01'  │ '1.12'        │ '0.09'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 1      │ 25     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 25     │ '0'   │ '-0.09' │ '0.00'        │ '0.09'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 4      │ 100    │ '25'  │ '-0.41' │ '0.20'        │ '0.41'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴─────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## ORB 15-min, 2R + trend & skip choppy - SPY, 5-min (watch filter: ema+chop)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: Opening Range Breakout, 5m bars
Max stop scaled x0.10 by typical first-15-min range 1.6 pts vs MES 16.5 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-10-30 (NY time), 65 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (5 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $  │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 0      │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 0      │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 0      │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 0      │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 0      │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 0      │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## ORB 15-min, 2R + trend & skip choppy - QQQ, 5-min (watch filter: ema+chop)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.139 shares (fractional), $0.14 per $1 move
Strategy: Opening Range Breakout, 5m bars
Max stop scaled x0.19 by typical first-15-min range 3.2 pts vs MES 16.5 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-10-30 (NY time), 65 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (5 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬─────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $   │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼─────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 1      │ 100    │ '0'   │ '-0.31' │ '0.00'        │ '0.31'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 1      │ 100    │ '0'   │ '-0.31' │ '0.00'        │ '0.31'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 1      │ 100    │ '0'   │ '-0.31' │ '0.00'        │ '0.31'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴─────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

# Exit tracks (locked 2026-10-10, started 2026-10-12) - compare the watched exit row to the 'fixed' row

## First-candle FVG day entry + trailing stop - MNQ (watch exit: trail)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Max stop scaled x8.42 by typical first-15-min range 139.0 pts vs MES 16.5 pts: HA 67.5 pts, ORB 101 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 5      │ '20'  │ '-547.50' │ '0.28'        │ '619.00' │ '209.00'     │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 5      │ '20'  │ '-547.50' │ '0.28'        │ '619.00' │ '209.00'     │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 5      │ '20'  │ '-528.75' │ '0.30'        │ '619.00' │ '227.75'     │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 5      │ '20'  │ '-527.00' │ '0.30'        │ '619.00' │ '229.50'     │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 5      │ '20'  │ '-544.00' │ '0.28'        │ '619.00' │ '212.50'     │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 5      │ '20'  │ '-547.50' │ '0.28'        │ '619.00' │ '209.00'     │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

## First-candle FVG day entry + trailing stop - MES (watch exit: trail)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 8      │ '38'  │ '-162.25' │ '0.60'        │ '378.25' │ '163.00'     │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 8      │ '25'  │ '-138.50' │ '0.61'        │ '354.50' │ '163.00'     │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 8      │ '50'  │ '-93.50'  │ '0.73'        │ '254.50' │ '121.75'     │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 8      │ '38'  │ '-428.50' │ '0.27'        │ '454.63' │ '78.63'      │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 8      │ '25'  │ '-808.50' │ '0.10'        │ '835.25' │ '66.75'      │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 8      │ '25'  │ '-893.50' │ '0.07'        │ '931.50' │ '38.00'      │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

_Pass rules (set in advance): 30+ trades, profit factor above 1.3, positive on BOTH markets._
