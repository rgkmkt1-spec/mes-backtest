# MES forward test - 2026-10-31 2:37 PM ET

## Heikin Ashi pullback (watch row 0: R:R 1, start 09:30)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Heikin Ashi pullback, 1m bars
Data: MES=F (89 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-30 (NY time), 36 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (16 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ 'start 09:30' │ 22     │ '23'  │ '-252.75' │ '0.29'        │ '278.00' │ 0        │ '-252.75'               │
│ 1       │ 1   │ 'start 09:45' │ 22     │ '27'  │ '-172.75' │ '0.41'        │ '198.00' │ 0        │ '-172.75'               │
│ 2       │ 1.5 │ 'start 09:30' │ 22     │ '23'  │ '-197.75' │ '0.45'        │ '254.00' │ 1        │ '-192.75'               │
│ 3       │ 1.5 │ 'start 09:45' │ 22     │ '27'  │ '-119.00' │ '0.61'        │ '175.25' │ 2        │ '-100.25'               │
│ 4       │ 2   │ 'start 09:30' │ 21     │ '14'  │ '-289.50' │ '0.28'        │ '325.00' │ 1        │ '-284.50'               │
│ 5       │ 2   │ 'start 09:45' │ 21     │ '19'  │ '-199.50' │ '0.44'        │ '235.00' │ 2        │ '-178.25'               │
└─────────┴─────┴───────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 130 trades to trades_ha_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Opening Range Breakout (watch row 4: R:R 2, 15-min range)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-30 (NY time), 36 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (16 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 9      │ '44'  │ '-121.75' │ '0.56'        │ '238.25' │ 0        │ '-121.75'               │
│ 1       │ 1   │ '30-min range' │ 5      │ '40'  │ '-80.00'  │ '0.53'        │ '130.50' │ 0        │ '-80.00'                │
│ 2       │ 1.5 │ '15-min range' │ 9      │ '11'  │ '-329.25' │ '0.19'        │ '406.00' │ 0        │ '-329.25'               │
│ 3       │ 1.5 │ '30-min range' │ 5      │ '20'  │ '-140.00' │ '0.35'        │ '216.75' │ 0        │ '-140.00'               │
│ 4       │ 2   │ '15-min range' │ 9      │ '11'  │ '-303.00' │ '0.25'        │ '406.00' │ 0        │ '-303.00'               │
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
Max stop scaled x8.42 by typical first-15-min range 139.0 pts vs MES 16.5 pts: HA 67.5 pts, ORB 101 pts
Data: MNQ=F (4 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 3      │ '33'  │ '1719.00' │ '6.86'        │ '293.50' │ 0        │ '1719.00'               │
│ 1       │ 2      │ '30-min chart' │ 3      │ '33'  │ '2213.00' │ '8.54'        │ '293.50' │ 0        │ '2213.00'               │
│ 2       │ 3      │ '30-min chart' │ 3      │ '33'  │ '2213.00' │ '8.54'        │ '293.50' │ 0        │ '2213.00'               │
│ 3       │ 'push' │ '15-min chart' │ 5      │ '20'  │ '-11.50'  │ '0.97'        │ '279.50' │ 0        │ '-11.50'                │
│ 4       │ 2      │ '15-min chart' │ 5      │ '20'  │ '-214.00' │ '0.40'        │ '279.50' │ 0        │ '-214.00'               │
│ 5       │ 3      │ '15-min chart' │ 5      │ '20'  │ '-143.00' │ '0.60'        │ '279.50' │ 0        │ '-143.00'               │
│ 6       │ 'push' │ '5-min chart'  │ 19     │ '32'  │ '521.50'  │ '1.63'        │ '550.50' │ 0        │ '521.50'                │
│ 7       │ 2      │ '5-min chart'  │ 19     │ '26'  │ '-147.00' │ '0.83'        │ '676.00' │ 0        │ '-147.00'               │
│ 8       │ 3      │ '5-min chart'  │ 19     │ '26'  │ '217.00'  │ '1.25'        │ '623.00' │ 0        │ '217.00'                │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 81 trades to trades_mnq_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range liquidity sweep - MES (watch row 4: sweep, R:R 1.5) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (3 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 14     │ '29'  │ '-258.00' │ '0.57'        │ '467.50' │ 0        │ '-258.00'               │
│ 1       │ 2   │ 'breakout' │ 14     │ '29'  │ '-141.75' │ '0.76'        │ '440.00' │ 0        │ '-141.75'               │
│ 2       │ 1.5 │ 'retest'   │ 13     │ '23'  │ '-167.25' │ '0.48'        │ '167.25' │ 0        │ '-167.25'               │
│ 3       │ 2   │ 'retest'   │ 13     │ '15'  │ '-213.50' │ '0.40'        │ '223.75' │ 0        │ '-213.50'               │
│ 4       │ 1.5 │ 'sweep'    │ 12     │ '25'  │ '-209.00' │ '0.40'        │ '226.25' │ 2        │ '-127.75'               │
│ 5       │ 2   │ 'sweep'    │ 12     │ '25'  │ '-162.75' │ '0.53'        │ '199.50' │ 1        │ '-109.00'               │
└─────────┴─────┴────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 78 trades to trades_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MES (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 2      │ '100' │ '104.75' │ 'inf'         │ '0.00'   │ 0        │ '104.75'                │
│ 1       │ 1.5 │ 'no trend filter'         │ 8      │ '63'  │ '99.00'  │ '1.56'        │ '94.50'  │ 0        │ '99.00'                 │
│ 2       │ 2   │ 'with daily trend filter' │ 2      │ '100' │ '141.00' │ 'inf'         │ '0.00'   │ 0        │ '141.00'                │
│ 3       │ 2   │ 'no trend filter'         │ 8      │ '38'  │ '31.50'  │ '1.13'        │ '143.00' │ 0        │ '31.50'                 │
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
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 2      │ '100' │ '373.00' │ 'inf'         │ '0.00'   │ 0        │ '373.00'                │
│ 1       │ 1.5 │ 'no trend filter'         │ 5      │ '60'  │ '392.00' │ '5.19'        │ '93.50'  │ 0        │ '392.00'                │
│ 2       │ 2   │ 'with daily trend filter' │ 2      │ '100' │ '499.00' │ 'inf'         │ '0.00'   │ 0        │ '499.00'                │
│ 3       │ 2   │ 'no trend filter'         │ 5      │ '60'  │ '556.50' │ '6.95'        │ '93.50'  │ 0        │ '556.50'                │
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
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 5      │ '20'  │ '-3.50'   │ '0.99'        │ '337.00' │ 0        │ '-3.50'                 │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 5      │ '20'  │ '-193.00' │ '0.66'        │ '337.00' │ 0        │ '-193.00'               │
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
Data: MNQ=F (90 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-30 (NY time), 37 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 21     │ '38'  │ '361.50' │ '1.42'        │ '350.00' │ 0        │ '361.50'                │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 21     │ '38'  │ '295.00' │ '1.32'        │ '350.00' │ 0        │ '295.00'                │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 21     │ '43'  │ '149.00' │ '1.17'        │ '370.00' │ 0        │ '149.00'                │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 38     │ '39'  │ '332.00' │ '1.20'        │ '711.00' │ 0        │ '332.00'                │
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
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-30 (NY time), 37 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (16 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 11     │ '36'  │ '-518.00' │ '0.52'        │ '630.00' │ 0        │ '-518.00'               │
│ 1       │ 1   │ '30-min range' │ 6      │ '33'  │ '-310.50' │ '0.50'        │ '451.00' │ 0        │ '-310.50'               │
│ 2       │ 1.5 │ '15-min range' │ 11     │ '36'  │ '-396.00' │ '0.63'        │ '725.00' │ 0        │ '-396.00'               │
│ 3       │ 1.5 │ '30-min range' │ 6      │ '33'  │ '-319.50' │ '0.48'        │ '444.00' │ 0        │ '-319.50'               │
│ 4       │ 2   │ '15-min range' │ 11     │ '27'  │ '-469.00' │ '0.60'        │ '725.00' │ 0        │ '-469.00'               │
│ 5       │ 2   │ '30-min range' │ 6      │ '33'  │ '-234.00' │ '0.62'        │ '444.00' │ 0        │ '-234.00'               │
└─────────┴─────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 51 trades to trades_mnq_orb_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Supply & demand on MES (watch row 1: R:R 2, 30-min chart)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Supply & demand zones (200 EMA), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 3      │ '33'  │ '619.00' │ '9.36'        │ '74.00'  │ 0        │ '619.00'                │
│ 1       │ 2      │ '30-min chart' │ 3      │ '33'  │ '831.50' │ '12.24'       │ '74.00'  │ 0        │ '831.50'                │
│ 2       │ 3      │ '30-min chart' │ 3      │ '33'  │ '831.50' │ '12.24'       │ '74.00'  │ 0        │ '831.50'                │
│ 3       │ 'push' │ '15-min chart' │ 3      │ '0'   │ '-76.00' │ '0.00'        │ '76.00'  │ 0        │ '-76.00'                │
│ 4       │ 2      │ '15-min chart' │ 3      │ '0'   │ '-76.00' │ '0.00'        │ '76.00'  │ 0        │ '-76.00'                │
│ 5       │ 3      │ '15-min chart' │ 3      │ '0'   │ '-76.00' │ '0.00'        │ '76.00'  │ 0        │ '-76.00'                │
│ 6       │ 'push' │ '5-min chart'  │ 26     │ '27'  │ '656.75' │ '2.23'        │ '229.75' │ 0        │ '656.75'                │
│ 7       │ 2      │ '5-min chart'  │ 26     │ '31'  │ '805.50' │ '2.62'        │ '271.00' │ 0        │ '805.50'                │
│ 8       │ 3      │ '5-min chart'  │ 26     │ '31'  │ '920.50' │ '2.85'        │ '278.00' │ 0        │ '920.50'                │
└─────────┴────────┴────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 96 trades to trades_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep on MNQ (watch row 4: sweep, R:R 1.5)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.42 by typical first-15-min range 139.0 pts vs MES 16.5 pts: HA 67.5 pts, ORB 101 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 11     │ '45'  │ '274.50'  │ '1.28'        │ '360.50' │ 0        │ '274.50'                │
│ 1       │ 2   │ 'breakout' │ 11     │ '36'  │ '120.50'  │ '1.11'        │ '415.00' │ 0        │ '120.50'                │
│ 2       │ 1.5 │ 'retest'   │ 9      │ '33'  │ '-485.50' │ '0.45'        │ '794.50' │ 0        │ '-485.50'               │
│ 3       │ 2   │ 'retest'   │ 9      │ '33'  │ '-348.50' │ '0.61'        │ '794.50' │ 0        │ '-348.50'               │
│ 4       │ 1.5 │ 'sweep'    │ 11     │ '55'  │ '459.00'  │ '1.82'        │ '273.50' │ 0        │ '459.00'                │
│ 5       │ 2   │ 'sweep'    │ 11     │ '45'  │ '485.50'  │ '1.73'        │ '280.50' │ 0        │ '485.50'                │
└─────────┴─────┴────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 62 trades to trades_mnq_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG day entry on MES (watch row 2: R:R 2)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 4      │ '0'   │ '-175.50' │ '0.00'        │ '175.50' │ 0        │ '-175.50'               │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 4      │ '0'   │ '-175.50' │ '0.00'        │ '175.50' │ 0        │ '-175.50'               │
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
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-30 (NY time), 36 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 14     │ '14'  │ '-300.50' │ '0.34'        │ '368.75' │ 0        │ '-300.50'               │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 14     │ '14'  │ '-300.50' │ '0.34'        │ '368.75' │ 0        │ '-300.50'               │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 14     │ '14'  │ '-340.50' │ '0.25'        │ '368.75' │ 0        │ '-340.50'               │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 22     │ '32'  │ '-136.50' │ '0.75'        │ '243.00' │ 0        │ '-136.50'               │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 64 trades to trades_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Filter tracks (locked 2026-10-10, started 2026-10-12) - compare the watched filter row to the 'none' row

## ORB + 200 EMA trend + skip choppy - MES, 1-min (watch filter: ema+chop)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-30 (NY time), 36 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 8      │ 100    │ '0'   │ '-406.00' │ '0.00'        │ '406.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 4      │ 50     │ '0'   │ '-189.25' │ '0.00'        │ '189.25' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 8      │ 100    │ '0'   │ '-406.00' │ '0.00'        │ '406.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 13     │ '0'   │ '-50.75'  │ '0.00'        │ '50.75'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 8      │ 100    │ '0'   │ '-406.00' │ '0.00'        │ '406.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## ORB + 200 EMA trend + skip choppy - MNQ, 1-min (watch filter: ema+chop)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Opening Range Breakout, 1m bars
Max stop scaled x7.88 by typical first-15-min range 128.0 pts vs MES 16.3 pts: HA 63 pts, ORB 94.5 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-30 (NY time), 37 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 10     │ 100    │ '30'  │ '-278.00' │ '0.72'        │ '579.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 5      │ 50     │ '40'  │ '-26.00'  │ '0.94'        │ '410.50' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 2      │ 20     │ '50'  │ '-108.50' │ '0.30'        │ '154.00' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 9      │ 90     │ '33'  │ '-148.50' │ '0.83'        │ '450.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 2      │ 20     │ '100' │ '375.50'  │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 1      │ 10     │ '100' │ '45.50'   │ 'inf'         │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 10     │ '100' │ '45.50'   │ 'inf'         │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 10     │ 100    │ '30'  │ '-278.00' │ '0.72'        │ '579.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MES (watch filter: vwap)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 12     │ 100    │ '25'  │ '-209.00' │ '0.40'        │ '226.25' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 8      │ '0'   │ '-50.75'  │ '0.00'        │ '50.75'  │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 3      │ 25     │ '0'   │ '-117.25' │ '0.00'        │ '117.25' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 4      │ 33     │ '25'  │ '-180.50' │ '0.19'        │ '222.25' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 5      │ 42     │ '40'  │ '32.50'   │ '1.51'        │ '52.75'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 8      │ '0'   │ '-10.75'  │ '0.00'        │ '10.75'  │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 12     │ 100    │ '25'  │ '-209.00' │ '0.40'        │ '226.25' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MNQ (watch filter: vwap)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.42 by typical first-15-min range 139.0 pts vs MES 16.5 pts: HA 67.5 pts, ORB 101 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-30 (NY time), 66 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬──────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $    │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼──────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 11     │ 100    │ '55'  │ '459.00' │ '1.82'        │ '273.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 2      │ 18     │ '50'  │ '-16.00' │ '0.82'        │ '91.00'  │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 9      │ '100' │ '75.00'  │ 'inf'         │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 4      │ 36     │ '50'  │ '292.50' │ '2.04'        │ '191.50' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 9      │ '100' │ '113.00' │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 11     │ 100    │ '55'  │ '459.00' │ '1.82'        │ '273.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴──────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MNQ, 1-min (watch filter: ema)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x7.88 by typical first-15-min range 128.0 pts vs MES 16.3 pts: HA 63 pts, ORB 94.5 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-30 (NY time), 37 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 21     │ 100    │ '38'  │ '361.50'  │ '1.42'        │ '350.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 14     │ 67     │ '43'  │ '393.50'  │ '1.59'        │ '302.50' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 15     │ 71     │ '40'  │ '504.50'  │ '1.96'        │ '235.00' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 14     │ 67     │ '43'  │ '526.00'  │ '1.99'        │ '195.50' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 4      │ 19     │ '0'   │ '-218.00' │ '0.00'        │ '218.00' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 2      │ 10     │ '0'   │ '-168.00' │ '0.00'        │ '168.00' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 4      │ 19     │ '0'   │ '-218.00' │ '0.00'        │ '218.00' │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 18     │ 86     │ '39'  │ '383.50'  │ '1.50'        │ '328.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MES, 1-min (watch filter: ema)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-30 (NY time), 36 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (15 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 14     │ 100    │ '14'  │ '-300.50' │ '0.34'        │ '368.75' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 11     │ 79     │ '18'  │ '-179.50' │ '0.46'        │ '274.75' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 9      │ 64     │ '11'  │ '-225.50' │ '0.29'        │ '230.75' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 13     │ 93     │ '15'  │ '-273.50' │ '0.36'        │ '368.75' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 8      │ 57     │ '13'  │ '-184.75' │ '0.33'        │ '217.00' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 6      │ 43     │ '17'  │ '-90.75'  │ '0.50'        │ '123.00' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 5      │ 36     │ '20'  │ '-105.00' │ '0.46'        │ '137.25' │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 12     │ 86     │ '17'  │ '-244.00' │ '0.39'        │ '312.25' │
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
Data: QQQ (1 new bars added to bars_qqq_5m.json)
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
│ 4       │ 1.5 │ 'sweep'    │ 3      │ '33'  │ '-0.11' │ '0.48'        │ '0.14'   │ 0        │ '-0.11'                 │
│ 5       │ 2   │ 'sweep'    │ 3      │ '33'  │ '-0.07' │ '0.64'        │ '0.14'   │ 0        │ '-0.07'                 │
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
Data: SPY (2 new bars added to bars_spy_5m.json)
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
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 3      │ 100    │ '33'  │ '-0.11' │ '0.48'        │ '0.14'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 33     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 1      │ 33     │ '0'   │ '-0.06' │ '0.00'        │ '0.06'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 33     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 33     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 3      │ 100    │ '33'  │ '-0.11' │ '0.48'        │ '0.14'   │
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
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
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
Data: MES=F (0 new bars added to bars_5m.json)
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
