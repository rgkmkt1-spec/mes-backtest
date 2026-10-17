# MES forward test - 2026-10-16 8:13 PM ET

## Heikin Ashi pullback (watch row 0: R:R 1, start 09:30)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Heikin Ashi pullback, 1m bars
Data: MES=F (6827 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-16 (NY time), 26 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (6 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ 'start 09:30' │ 7      │ '0'   │ '-119.00' │ '0.00'        │ '119.00' │ 0        │ '-119.00'               │
│ 1       │ 1   │ 'start 09:45' │ 8      │ '13'  │ '-73.50'  │ '0.21'        │ '89.50'  │ 0        │ '-73.50'                │
│ 2       │ 1.5 │ 'start 09:30' │ 7      │ '0'   │ '-119.00' │ '0.00'        │ '119.00' │ 0        │ '-119.00'               │
│ 3       │ 1.5 │ 'start 09:45' │ 8      │ '13'  │ '-74.75'  │ '0.28'        │ '89.50'  │ 1        │ '-61.00'                │
│ 4       │ 2   │ 'start 09:30' │ 7      │ '0'   │ '-119.00' │ '0.00'        │ '119.00' │ 0        │ '-119.00'               │
│ 5       │ 2   │ 'start 09:45' │ 8      │ '13'  │ '-63.50'  │ '0.39'        │ '89.50'  │ 1        │ '-47.25'                │
└─────────┴─────┴───────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 45 trades to trades_ha_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Opening Range Breakout (watch row 4: R:R 2, 15-min range)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-16 (NY time), 26 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (6 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 4      │ '75'  │ '68.25'  │ '2.41'        │ '48.25'  │ 0        │ '68.25'                 │
│ 1       │ 1   │ '30-min range' │ 3      │ '67'  │ '39.00'  │ '1.79'        │ '49.50'  │ 0        │ '39.00'                 │
│ 2       │ 1.5 │ '15-min range' │ 4      │ '25'  │ '-58.00' │ '0.57'        │ '134.75' │ 0        │ '-58.00'                │
│ 3       │ 1.5 │ '30-min range' │ 3      │ '33'  │ '-21.00' │ '0.79'        │ '97.75'  │ 0        │ '-21.00'                │
│ 4       │ 2   │ '15-min range' │ 4      │ '25'  │ '-31.75' │ '0.76'        │ '134.75' │ 0        │ '-31.75'                │
│ 5       │ 2   │ '30-min range' │ 3      │ '33'  │ '5.25'   │ '1.05'        │ '97.75'  │ 0        │ '5.25'                  │
└─────────┴─────┴────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 21 trades to trades_orb_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Supply & demand zones - MNQ (watch row 1: R:R 2, 30-min chart) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Supply & demand zones (200 EMA), 5m bars
Max stop scaled x8.00 by typical first-15-min range 132.0 pts vs MES 16.5 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (1375 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-16 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 2      │ '0'   │ '-293.50' │ '0.00'        │ '293.50' │ 0        │ '-293.50'               │
│ 1       │ 2      │ '30-min chart' │ 2      │ '0'   │ '-293.50' │ '0.00'        │ '293.50' │ 0        │ '-293.50'               │
│ 2       │ 3      │ '30-min chart' │ 2      │ '0'   │ '-293.50' │ '0.00'        │ '293.50' │ 0        │ '-293.50'               │
│ 3       │ 'push' │ '15-min chart' │ 2      │ '0'   │ '-108.00' │ '0.00'        │ '108.00' │ 0        │ '-108.00'               │
│ 4       │ 2      │ '15-min chart' │ 2      │ '0'   │ '-108.00' │ '0.00'        │ '108.00' │ 0        │ '-108.00'               │
│ 5       │ 3      │ '15-min chart' │ 2      │ '0'   │ '-108.00' │ '0.00'        │ '108.00' │ 0        │ '-108.00'               │
│ 6       │ 'push' │ '5-min chart'  │ 5      │ '0'   │ '-202.00' │ '0.00'        │ '202.00' │ 0        │ '-202.00'               │
│ 7       │ 2      │ '5-min chart'  │ 5      │ '0'   │ '-202.00' │ '0.00'        │ '202.00' │ 0        │ '-202.00'               │
│ 8       │ 3      │ '5-min chart'  │ 5      │ '0'   │ '-202.00' │ '0.00'        │ '202.00' │ 0        │ '-202.00'               │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 27 trades to trades_mnq_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range liquidity sweep - MES (watch row 4: sweep, R:R 1.5) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (1375 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-16 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 5      │ '40'  │ '-47.50' │ '0.76'        │ '146.50' │ 0        │ '-47.50'                │
│ 1       │ 2   │ 'breakout' │ 5      │ '40'  │ '3.75'   │ '1.02'        │ '146.50' │ 0        │ '3.75'                  │
│ 2       │ 1.5 │ 'retest'   │ 4      │ '25'  │ '-46.75' │ '0.47'        │ '46.75'  │ 0        │ '-46.75'                │
│ 3       │ 2   │ 'retest'   │ 4      │ '25'  │ '-33.00' │ '0.63'        │ '45.25'  │ 0        │ '-33.00'                │
│ 4       │ 1.5 │ 'sweep'    │ 3      │ '33'  │ '-3.50'  │ '0.92'        │ '24.50'  │ 1        │ '41.50'                 │
│ 5       │ 2   │ 'sweep'    │ 3      │ '33'  │ '10.25'  │ '1.23'        │ '24.50'  │ 1        │ '64.00'                 │
└─────────┴─────┴────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 24 trades to trades_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MES (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-16 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 1       │ 1.5 │ 'no trend filter'         │ 2      │ '50'  │ '48.50'  │ '4.34'        │ '14.50'  │ 0        │ '48.50'                 │
│ 2       │ 2   │ 'with daily trend filter' │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 3       │ 2   │ 'no trend filter'         │ 2      │ '0'   │ '-61.50' │ '0.00'        │ '61.50'  │ 0        │ '-61.50'                │
└─────────┴─────┴───────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 4 trades to trades_pdh_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MNQ (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Max stop scaled x8.00 by typical first-15-min range 132.0 pts vs MES 16.5 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-16 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 2      │ '100' │ '373.00' │ 'inf'         │ '0.00'   │ 0        │ '373.00'                │
│ 1       │ 1.5 │ 'no trend filter'         │ 3      │ '100' │ '485.50' │ 'inf'         │ '0.00'   │ 0        │ '485.50'                │
│ 2       │ 2   │ 'with daily trend filter' │ 2      │ '100' │ '499.00' │ 'inf'         │ '0.00'   │ 0        │ '499.00'                │
│ 3       │ 2   │ 'no trend filter'         │ 3      │ '100' │ '650.00' │ 'inf'         │ '0.00'   │ 0        │ '650.00'                │
└─────────┴─────┴───────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 10 trades to trades_mnq_pdh_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG, day entry - MNQ (watch row 2: 15-min range, 5-min gap, limit, R:R 2) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Max stop scaled x8.00 by typical first-15-min range 132.0 pts vs MES 16.5 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-16 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 3      │ '33'  │ '333.50'  │ '2.43'        │ '233.00' │ 0        │ '333.50'                │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 3      │ '33'  │ '144.00'  │ '1.62'        │ '233.00' │ 0        │ '144.00'                │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 2      │ '0'   │ '-477.50' │ '0.00'        │ '477.50' │ 0        │ '-477.50'               │
│ 3       │ 3   │ 'DAY: same, 3R'                                        │ 2      │ '0'   │ '-477.50' │ '0.00'        │ '477.50' │ 0        │ '-477.50'               │
└─────────┴─────┴────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 10 trades to trades_mnq_fvgo_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous 1-hour candle continuation - MNQ, 1-min (watch row 0: his rules, 2R + break-even at 1.5R) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x7.74 by typical first-15-min range 125.8 pts vs MES 16.3 pts: HA 62 pts, ORB 92.75 pts
Data: MNQ=F (6828 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-16 (NY time), 27 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 6      │ '33'  │ '74.00'  │ '1.24'        │ '195.50' │ 0        │ '74.00'                 │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 6      │ '33'  │ '74.00'  │ '1.24'        │ '195.50' │ 0        │ '74.00'                 │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 6      │ '33'  │ '-23.50' │ '0.92'        │ '195.50' │ 0        │ '-23.50'                │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 9      │ '44'  │ '137.00' │ '1.33'        │ '224.50' │ 0        │ '137.00'                │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 27 trades to trades_mnq_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Confirmation tracks (same locked versions, other market)

## ORB on MNQ (watch row 4: R:R 2, 15-min range)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Opening Range Breakout, 1m bars
Max stop scaled x7.74 by typical first-15-min range 125.8 pts vs MES 16.3 pts: HA 62 pts, ORB 92.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-16 (NY time), 27 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (6 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 2      │ '50'  │ '-28.50'  │ '0.83'        │ '169.00' │ 0        │ '-28.50'                │
│ 1       │ 1   │ '30-min range' │ 1      │ '100' │ '140.50'  │ 'inf'         │ '0.00'   │ 0        │ '140.50'                │
│ 2       │ 1.5 │ '15-min range' │ 2      │ '50'  │ '-123.50' │ '0.27'        │ '169.00' │ 0        │ '-123.50'               │
│ 3       │ 1.5 │ '30-min range' │ 1      │ '100' │ '45.50'   │ 'inf'         │ '0.00'   │ 0        │ '45.50'                 │
│ 4       │ 2   │ '15-min range' │ 2      │ '50'  │ '-123.50' │ '0.27'        │ '169.00' │ 0        │ '-123.50'               │
│ 5       │ 2   │ '30-min range' │ 1      │ '100' │ '45.50'   │ 'inf'         │ '0.00'   │ 0        │ '45.50'                 │
└─────────┴─────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 9 trades to trades_mnq_orb_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Supply & demand on MES (watch row 1: R:R 2, 30-min chart)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Supply & demand zones (200 EMA), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-16 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 1       │ 2      │ '30-min chart' │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 2       │ 3      │ '30-min chart' │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 3       │ 'push' │ '15-min chart' │ 1      │ '0'   │ '-24.50' │ '0.00'        │ '24.50'  │ 0        │ '-24.50'                │
│ 4       │ 2      │ '15-min chart' │ 1      │ '0'   │ '-24.50' │ '0.00'        │ '24.50'  │ 0        │ '-24.50'                │
│ 5       │ 3      │ '15-min chart' │ 1      │ '0'   │ '-24.50' │ '0.00'        │ '24.50'  │ 0        │ '-24.50'                │
│ 6       │ 'push' │ '5-min chart'  │ 7      │ '14'  │ '-36.50' │ '0.74'        │ '127.50' │ 0        │ '-36.50'                │
│ 7       │ 2      │ '5-min chart'  │ 7      │ '14'  │ '-84.00' │ '0.41'        │ '127.50' │ 0        │ '-84.00'                │
│ 8       │ 3      │ '5-min chart'  │ 7      │ '14'  │ '-54.00' │ '0.62'        │ '127.50' │ 0        │ '-54.00'                │
└─────────┴────────┴────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 24 trades to trades_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep on MNQ (watch row 4: sweep, R:R 1.5)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.00 by typical first-15-min range 132.0 pts vs MES 16.5 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-16 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 4      │ '50'  │ '162.00' │ '1.49'        │ '272.50' │ 0        │ '162.00'                │
│ 1       │ 2   │ 'breakout' │ 4      │ '50'  │ '329.00' │ '1.99'        │ '272.50' │ 0        │ '329.00'                │
│ 2       │ 1.5 │ 'retest'   │ 3      │ '67'  │ '189.50' │ '2.97'        │ '96.00'  │ 0        │ '189.50'                │
│ 3       │ 2   │ 'retest'   │ 3      │ '67'  │ '286.00' │ '3.98'        │ '96.00'  │ 0        │ '286.00'                │
│ 4       │ 1.5 │ 'sweep'    │ 4      │ '50'  │ '1.50'   │ '1.01'        │ '191.50' │ 0        │ '1.50'                  │
│ 5       │ 2   │ 'sweep'    │ 4      │ '50'  │ '98.00'  │ '1.34'        │ '191.50' │ 0        │ '98.00'                 │
└─────────┴─────┴────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 22 trades to trades_mnq_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG day entry on MES (watch row 2: R:R 2)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-16 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 2      │ '0'   │ '-64.00' │ '0.00'        │ '64.00'  │ 0        │ '-64.00'                │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 2      │ '0'   │ '-64.00' │ '0.00'        │ '64.00'  │ 0        │ '-64.00'                │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 2      │ '50'  │ '-39.00' │ '0.58'        │ '92.00'  │ 0        │ '-39.00'                │
│ 3       │ 3   │ 'DAY: same, 3R'                                        │ 2      │ '50'  │ '-11.50' │ '0.88'        │ '92.00'  │ 0        │ '-11.50'                │
└─────────┴─────┴────────────────────────────────────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 8 trades to trades_fvgo_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous 1-hour candle continuation on MES, 1-min (watch row 0: his rules)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-16 (NY time), 26 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 6      │ '33'  │ '-24.50' │ '0.86'        │ '92.75'  │ 0        │ '-24.50'                │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 6      │ '33'  │ '-24.50' │ '0.86'        │ '92.75'  │ 0        │ '-24.50'                │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 6      │ '33'  │ '-64.50' │ '0.64'        │ '92.75'  │ 0        │ '-64.50'                │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 10     │ '30'  │ '-55.00' │ '0.78'        │ '107.25' │ 0        │ '-55.00'                │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 28 trades to trades_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Filter tracks (locked 2026-10-10, started 2026-10-12) - compare the watched filter row to the 'none' row

## ORB + 200 EMA trend + skip choppy - MES, 1-min (watch filter: ema+chop)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-16 (NY time), 26 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 3      │ 100    │ '0'   │ '-134.75' │ '0.00'        │ '134.75' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 2      │ 67     │ '0'   │ '-86.50'  │ '0.00'        │ '86.50'  │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 3      │ 100    │ '0'   │ '-134.75' │ '0.00'        │ '134.75' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 3      │ 100    │ '0'   │ '-134.75' │ '0.00'        │ '134.75' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## ORB + 200 EMA trend + skip choppy - MNQ, 1-min (watch filter: ema+chop)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Opening Range Breakout, 1m bars
Max stop scaled x7.74 by typical first-15-min range 125.8 pts vs MES 16.3 pts: HA 62 pts, ORB 92.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-16 (NY time), 27 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 2      │ 100    │ '50'  │ '-123.50' │ '0.27'        │ '169.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 50     │ '100' │ '45.50'   │ 'inf'         │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 50     │ '100' │ '45.50'   │ 'inf'         │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 2      │ 100    │ '50'  │ '-123.50' │ '0.27'        │ '169.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 50     │ '100' │ '45.50'   │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 1      │ 50     │ '100' │ '45.50'   │ 'inf'         │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 50     │ '100' │ '45.50'   │ 'inf'         │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 2      │ 100    │ '50'  │ '-123.50' │ '0.27'        │ '169.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MES (watch filter: vwap)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-16 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬──────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $    │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼──────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 3      │ 100    │ '33'  │ '-3.50'  │ '0.92'        │ '24.50'  │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 1      │ 33     │ '100' │ '41.75'  │ 'inf'         │ '0.00'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 33     │ '0'   │ '-20.75' │ '0.00'        │ '20.75'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 3      │ 100    │ '33'  │ '-3.50'  │ '0.92'        │ '24.50'  │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴──────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MNQ (watch filter: vwap)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.00 by typical first-15-min range 132.0 pts vs MES 16.5 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-16 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬──────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $    │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼──────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 4      │ 100    │ '50'  │ '1.50'   │ '1.01'        │ '191.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 2      │ 50     │ '50'  │ '-18.00' │ '0.91'        │ '191.50' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 25     │ '100' │ '113.00' │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 4      │ 100    │ '50'  │ '1.50'   │ '1.01'        │ '191.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴──────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MNQ, 1-min (watch filter: ema)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x7.74 by typical first-15-min range 125.8 pts vs MES 16.3 pts: HA 62 pts, ORB 92.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-16 (NY time), 27 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 6      │ 100    │ '33'  │ '74.00'   │ '1.24'        │ '195.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 6      │ 100    │ '33'  │ '74.00'   │ '1.24'        │ '195.50' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 4      │ 67     │ '50'  │ '225.00'  │ '2.41'        │ '115.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 6      │ 100    │ '33'  │ '74.00'   │ '1.24'        │ '195.50' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 17     │ '0'   │ '-115.50' │ '0.00'        │ '115.50' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 1      │ 17     │ '0'   │ '-115.50' │ '0.00'        │ '115.50' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 17     │ '0'   │ '-115.50' │ '0.00'        │ '115.50' │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 6      │ 100    │ '33'  │ '74.00'   │ '1.24'        │ '195.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MES, 1-min (watch filter: ema)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-16 (NY time), 26 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬──────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $    │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼──────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 6      │ 100    │ '33'  │ '-24.50' │ '0.86'        │ '92.75'  │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 5      │ 83     │ '40'  │ '2.50'   │ '1.02'        │ '92.75'  │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 5      │ 83     │ '20'  │ '-87.50' │ '0.51'        │ '92.75'  │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 5      │ 83     │ '40'  │ '2.50'   │ '1.02'        │ '92.75'  │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 3      │ 50     │ '33'  │ '-21.00' │ '0.81'        │ '58.25'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 3      │ 50     │ '33'  │ '-21.00' │ '0.81'        │ '58.25'  │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 3      │ 50     │ '33'  │ '-21.00' │ '0.81'        │ '58.25'  │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 6      │ 100    │ '33'  │ '-24.50' │ '0.86'        │ '92.75'  │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴──────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

# Exit tracks (locked 2026-10-10, started 2026-10-12) - compare the watched exit row to the 'fixed' row

## First-candle FVG day entry + trailing stop - MNQ (watch exit: trail)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Max stop scaled x8.00 by typical first-15-min range 132.0 pts vs MES 16.5 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-16 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 2      │ '0'   │ '-477.50' │ '0.00'        │ '477.50' │ '-145.50'    │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 2      │ '0'   │ '-477.50' │ '0.00'        │ '477.50' │ '-145.50'    │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 2      │ '0'   │ '-477.50' │ '0.00'        │ '477.50' │ '-145.50'    │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 2      │ '0'   │ '-477.50' │ '0.00'        │ '477.50' │ '-145.50'    │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 2      │ '0'   │ '-477.50' │ '0.00'        │ '477.50' │ '-145.50'    │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 2      │ '0'   │ '-477.50' │ '0.00'        │ '477.50' │ '-145.50'    │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

## First-candle FVG day entry + trailing stop - MES (watch exit: trail)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-16 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (5 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 2      │ '50'  │ '-39.00' │ '0.58'        │ '92.00'  │ '53.00'      │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 2      │ '50'  │ '-39.00' │ '0.58'        │ '92.00'  │ '53.00'      │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 2      │ '50'  │ '-52.75' │ '0.43'        │ '92.00'  │ '39.25'      │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 2      │ '50'  │ '-65.88' │ '0.28'        │ '92.00'  │ '26.13'      │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 2      │ '50'  │ '-65.25' │ '0.29'        │ '92.00'  │ '26.75'      │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 2      │ '50'  │ '-54.00' │ '0.41'        │ '92.00'  │ '38.00'      │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

_Pass rules (set in advance): 30+ trades, profit factor above 1.3, positive on BOTH markets._
