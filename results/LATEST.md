# MES forward test - 2026-11-06 8:59 PM ET

## Heikin Ashi pullback (watch row 0: R:R 1, start 09:30)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Heikin Ashi pullback, 1m bars
Data: MES=F (6844 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-06 (NY time), 41 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (21 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ 'start 09:30' │ 27     │ '22'  │ '-326.50' │ '0.30'        │ '326.50' │ 3        │ '-272.75'               │
│ 1       │ 1   │ 'start 09:45' │ 27     │ '26'  │ '-247.75' │ '0.36'        │ '247.75' │ 4        │ '-182.75'               │
│ 2       │ 1.5 │ 'start 09:30' │ 26     │ '19'  │ '-305.75' │ '0.36'        │ '305.75' │ 2        │ '-289.50'               │
│ 3       │ 1.5 │ 'start 09:45' │ 27     │ '26'  │ '-169.00' │ '0.57'        │ '169.00' │ 3        │ '-139.00'               │
│ 4       │ 2   │ 'start 09:30' │ 25     │ '12'  │ '-405.00' │ '0.22'        │ '405.00' │ 2        │ '-387.50'               │
│ 5       │ 2   │ 'start 09:45' │ 25     │ '16'  │ '-278.75' │ '0.35'        │ '278.75' │ 3        │ '-245.00'               │
└─────────┴─────┴───────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 157 trades to trades_ha_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Opening Range Breakout (watch row 4: R:R 2, 15-min range)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (1 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-06 (NY time), 41 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (21 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 11     │ '64'  │ '56.75'   │ '1.25'        │ '147.00' │ 0        │ '56.75'                 │
│ 1       │ 1   │ '30-min range' │ 6      │ '33'  │ '-134.50' │ '0.40'        │ '185.00' │ 0        │ '-134.50'               │
│ 2       │ 1.5 │ '15-min range' │ 11     │ '27'  │ '-199.50' │ '0.51'        │ '409.75' │ 0        │ '-199.50'               │
│ 3       │ 1.5 │ '30-min range' │ 6      │ '17'  │ '-194.50' │ '0.28'        │ '271.25' │ 0        │ '-194.50'               │
│ 4       │ 2   │ '15-min range' │ 11     │ '27'  │ '-127.00' │ '0.69'        │ '409.75' │ 0        │ '-127.00'               │
│ 5       │ 2   │ '30-min range' │ 6      │ '17'  │ '-168.25' │ '0.38'        │ '271.25' │ 0        │ '-168.25'               │
└─────────┴─────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 51 trades to trades_orb_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Supply & demand zones - MNQ (watch row 1: R:R 2, 30-min chart) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Supply & demand zones (200 EMA), 5m bars
Max stop scaled x8.44 by typical first-15-min range 139.3 pts vs MES 16.5 pts: HA 67.5 pts, ORB 101.25 pts
Data: MNQ=F (1374 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 4      │ '50'  │ '1848.50' │ '7.35'        │ '291.00' │ 0        │ '1848.50'               │
│ 1       │ 2      │ '30-min chart' │ 4      │ '50'  │ '2343.00' │ '9.05'        │ '291.00' │ 0        │ '2343.00'               │
│ 2       │ 3      │ '30-min chart' │ 4      │ '50'  │ '2343.00' │ '9.05'        │ '291.00' │ 0        │ '2343.00'               │
│ 3       │ 'push' │ '15-min chart' │ 5      │ '20'  │ '-19.50'  │ '0.95'        │ '279.50' │ 0        │ '-19.50'                │
│ 4       │ 2      │ '15-min chart' │ 5      │ '20'  │ '-222.00' │ '0.39'        │ '279.50' │ 0        │ '-222.00'               │
│ 5       │ 3      │ '15-min chart' │ 5      │ '20'  │ '-151.00' │ '0.58'        │ '279.50' │ 0        │ '-151.00'               │
│ 6       │ 'push' │ '5-min chart'  │ 25     │ '28'  │ '193.50'  │ '1.12'        │ '641.00' │ 0        │ '193.50'                │
│ 7       │ 2      │ '5-min chart'  │ 25     │ '24'  │ '-695.50' │ '0.57'        │ '695.50' │ 0        │ '-695.50'               │
│ 8       │ 3      │ '5-min chart'  │ 25     │ '24'  │ '-331.50' │ '0.79'        │ '641.00' │ 0        │ '-331.50'               │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 102 trades to trades_mnq_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range liquidity sweep - MES (watch row 4: sweep, R:R 1.5) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (1374 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 17     │ '35'  │ '-104.00' │ '0.84'        │ '467.50' │ 0        │ '-104.00'               │
│ 1       │ 2   │ 'breakout' │ 17     │ '35'  │ '81.00'   │ '1.12'        │ '440.00' │ 0        │ '81.00'                 │
│ 2       │ 1.5 │ 'retest'   │ 17     │ '24'  │ '-207.75' │ '0.56'        │ '317.00' │ 0        │ '-207.75'               │
│ 3       │ 2   │ 'retest'   │ 17     │ '12'  │ '-440.25' │ '0.25'        │ '448.00' │ 0        │ '-440.25'               │
│ 4       │ 1.5 │ 'sweep'    │ 15     │ '20'  │ '-358.75' │ '0.28'        │ '376.00' │ 2        │ '-281.25'               │
│ 5       │ 2   │ 'sweep'    │ 15     │ '20'  │ '-312.50' │ '0.37'        │ '350.50' │ 1        │ '-258.75'               │
└─────────┴─────┴────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 98 trades to trades_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MES (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 2      │ '100' │ '107.25' │ 'inf'         │ '0.00'   │ 0        │ '107.25'                │
│ 1       │ 1.5 │ 'no trend filter'         │ 9      │ '67'  │ '262.00' │ '2.48'        │ '94.50'  │ 0        │ '262.00'                │
│ 2       │ 2   │ 'with daily trend filter' │ 2      │ '100' │ '143.50' │ 'inf'         │ '0.00'   │ 0        │ '143.50'                │
│ 3       │ 2   │ 'no trend filter'         │ 9      │ '44'  │ '242.00' │ '2.01'        │ '145.50' │ 0        │ '242.00'                │
└─────────┴─────┴───────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 22 trades to trades_pdh_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MNQ (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Max stop scaled x8.31 by typical first-15-min range 139.3 pts vs MES 16.8 pts: HA 66.5 pts, ORB 99.75 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
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
Max stop scaled x8.31 by typical first-15-min range 139.3 pts vs MES 16.8 pts: HA 66.5 pts, ORB 99.75 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 5      │ '20'  │ '-5.00'   │ '0.99'        │ '338.50' │ 0        │ '-5.00'                 │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 5      │ '20'  │ '-194.50' │ '0.66'        │ '338.50' │ 0        │ '-194.50'               │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 6      │ '17'  │ '-697.50' │ '0.23'        │ '697.50' │ 0        │ '-697.50'               │
│ 3       │ 3   │ 'DAY: same, 3R'                                        │ 6      │ '17'  │ '-697.50' │ '0.23'        │ '697.50' │ 0        │ '-697.50'               │
└─────────┴─────┴────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 22 trades to trades_mnq_fvgo_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous 1-hour candle continuation - MNQ, 1-min (watch row 0: his rules, 2R + break-even at 1.5R) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x8.00 by typical first-15-min range 132.0 pts vs MES 16.5 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (6845 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-06 (NY time), 42 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 26     │ '38'  │ '217.00' │ '1.16'        │ '351.50' │ 0        │ '217.00'                │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 26     │ '38'  │ '150.50' │ '1.11'        │ '351.50' │ 0        │ '150.50'                │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 26     │ '42'  │ '-78.50' │ '0.94'        │ '371.50' │ 0        │ '-78.50'                │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 52     │ '35'  │ '-3.00'  │ '1.00'        │ '712.00' │ 0        │ '-3.00'                 │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 130 trades to trades_mnq_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Confirmation tracks (same locked versions, other market)

## ORB on MNQ (watch row 4: R:R 2, 15-min range)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Opening Range Breakout, 1m bars
Max stop scaled x8.00 by typical first-15-min range 132.0 pts vs MES 16.5 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (1 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-06 (NY time), 42 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (21 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 13     │ '38'  │ '-585.00' │ '0.54'        │ '628.00' │ 0        │ '-585.00'               │
│ 1       │ 1   │ '30-min range' │ 8      │ '38'  │ '-383.00' │ '0.52'        │ '525.50' │ 0        │ '-383.00'               │
│ 2       │ 1.5 │ '15-min range' │ 13     │ '38'  │ '-407.00' │ '0.68'        │ '723.00' │ 0        │ '-407.00'               │
│ 3       │ 1.5 │ '30-min range' │ 8      │ '38'  │ '-336.00' │ '0.58'        │ '443.50' │ 0        │ '-336.00'               │
│ 4       │ 2   │ '15-min range' │ 13     │ '31'  │ '-422.00' │ '0.69'        │ '723.00' │ 0        │ '-422.00'               │
│ 5       │ 2   │ '30-min range' │ 8      │ '38'  │ '-195.00' │ '0.76'        │ '443.50' │ 0        │ '-195.00'               │
└─────────┴─────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 63 trades to trades_mnq_orb_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Supply & demand on MES (watch row 1: R:R 2, 30-min chart)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Supply & demand zones (200 EMA), 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 4      │ '25'  │ '543.25'  │ '4.54'        │ '153.50' │ 0        │ '543.25'                │
│ 1       │ 2      │ '30-min chart' │ 4      │ '25'  │ '754.50'  │ '5.92'        │ '153.50' │ 0        │ '754.50'                │
│ 2       │ 3      │ '30-min chart' │ 4      │ '25'  │ '754.50'  │ '5.92'        │ '153.50' │ 0        │ '754.50'                │
│ 3       │ 'push' │ '15-min chart' │ 5      │ '20'  │ '-176.25' │ '0.31'        │ '195.25' │ 0        │ '-176.25'               │
│ 4       │ 2      │ '15-min chart' │ 5      │ '20'  │ '-181.25' │ '0.29'        │ '195.25' │ 0        │ '-181.25'               │
│ 5       │ 3      │ '15-min chart' │ 5      │ '20'  │ '-143.75' │ '0.43'        │ '195.25' │ 0        │ '-143.75'               │
│ 6       │ 'push' │ '5-min chart'  │ 30     │ '30'  │ '887.50'  │ '2.49'        │ '165.75' │ 0        │ '887.50'                │
│ 7       │ 2      │ '5-min chart'  │ 30     │ '30'  │ '736.25'  │ '2.11'        │ '186.75' │ 0        │ '736.25'                │
│ 8       │ 3      │ '5-min chart'  │ 30     │ '30'  │ '896.25'  │ '2.35'        │ '169.75' │ 0        │ '896.25'                │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 117 trades to trades_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep on MNQ (watch row 4: sweep, R:R 1.5)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.31 by typical first-15-min range 139.3 pts vs MES 16.8 pts: HA 66.5 pts, ORB 99.75 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 15     │ '40'  │ '-96.00'  │ '0.94'        │ '952.00' │ 0        │ '-96.00'                │
│ 1       │ 2   │ 'breakout' │ 15     │ '33'  │ '-179.50' │ '0.89'        │ '952.00' │ 0        │ '-179.50'               │
│ 2       │ 1.5 │ 'retest'   │ 12     │ '33'  │ '-702.50' │ '0.41'        │ '892.00' │ 0        │ '-702.50'               │
│ 3       │ 2   │ 'retest'   │ 12     │ '33'  │ '-533.50' │ '0.56'        │ '819.50' │ 0        │ '-533.50'               │
│ 4       │ 1.5 │ 'sweep'    │ 14     │ '50'  │ '221.00'  │ '1.24'        │ '624.00' │ 0        │ '221.00'                │
│ 5       │ 2   │ 'sweep'    │ 14     │ '43'  │ '286.50'  │ '1.28'        │ '629.00' │ 0        │ '286.50'                │
└─────────┴─────┴────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 82 trades to trades_mnq_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG day entry on MES (watch row 2: R:R 2)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 5      │ '0'   │ '-263.75' │ '0.00'        │ '263.75' │ 0        │ '-263.75'               │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 5      │ '0'   │ '-263.75' │ '0.00'        │ '263.75' │ 0        │ '-263.75'               │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 10     │ '30'  │ '-377.50' │ '0.39'        │ '430.50' │ 0        │ '-377.50'               │
│ 3       │ 3   │ 'DAY: same, 3R'                                        │ 10     │ '30'  │ '-267.50' │ '0.57'        │ '378.25' │ 0        │ '-267.50'               │
└─────────┴─────┴────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 30 trades to trades_fvgo_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous 1-hour candle continuation on MES, 1-min (watch row 0: his rules)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (2 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-06 (NY time), 41 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 17     │ '24'  │ '-170.25' │ '0.67'        │ '362.50' │ 0        │ '-170.25'               │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 17     │ '24'  │ '-170.25' │ '0.67'        │ '362.50' │ 0        │ '-170.25'               │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 17     │ '24'  │ '-257.75' │ '0.49'        │ '362.50' │ 0        │ '-257.75'               │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 31     │ '35'  │ '-89.50'  │ '0.88'        │ '211.75' │ 0        │ '-89.50'                │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 82 trades to trades_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Filter tracks (locked 2026-10-10, started 2026-10-12) - compare the watched filter row to the 'none' row

## ORB + 200 EMA trend + skip choppy - MES, 1-min (watch filter: ema+chop)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (1 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-06 (NY time), 41 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 10     │ 100    │ '20'  │ '-230.00' │ '0.44'        │ '409.75' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 6      │ 60     │ '33'  │ '-12.00'  │ '0.94'        │ '191.75' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 10     │ 100    │ '20'  │ '-230.00' │ '0.44'        │ '409.75' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 10     │ '0'   │ '-52.00'  │ '0.00'        │ '52.00'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 10     │ 100    │ '20'  │ '-230.00' │ '0.44'        │ '409.75' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## ORB + 200 EMA trend + skip choppy - MNQ, 1-min (watch filter: ema+chop)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Opening Range Breakout, 1m bars
Max stop scaled x8.00 by typical first-15-min range 132.0 pts vs MES 16.5 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (1 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-06 (NY time), 42 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 12     │ 100    │ '33'  │ '-234.00' │ '0.80'        │ '582.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 6      │ 50     │ '33'  │ '-203.00' │ '0.66'        │ '413.00' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 2      │ 17     │ '50'  │ '-107.00' │ '0.31'        │ '154.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 10     │ 83     │ '40'  │ '78.00'   │ '1.09'        │ '451.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 2      │ 17     │ '100' │ '379.00'  │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 1      │ 8      │ '100' │ '47.50'   │ 'inf'         │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 8      │ '100' │ '47.50'   │ 'inf'         │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 12     │ 100    │ '33'  │ '-234.00' │ '0.80'        │ '582.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MES (watch filter: vwap)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 15     │ 100    │ '20'  │ '-358.75' │ '0.28'        │ '376.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 7      │ '0'   │ '-50.75'  │ '0.00'        │ '50.75'  │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 4      │ 27     │ '0'   │ '-149.25' │ '0.00'        │ '149.25' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 5      │ 33     │ '20'  │ '-260.00' │ '0.14'        │ '301.75' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 5      │ 33     │ '40'  │ '32.50'   │ '1.51'        │ '52.75'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 7      │ '0'   │ '-10.75'  │ '0.00'        │ '10.75'  │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 15     │ 100    │ '20'  │ '-358.75' │ '0.28'        │ '376.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MNQ (watch filter: vwap)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.31 by typical first-15-min range 139.3 pts vs MES 16.8 pts: HA 66.5 pts, ORB 99.75 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 14     │ 100    │ '50'  │ '221.00'  │ '1.24'        │ '624.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 2      │ 14     │ '50'  │ '-13.50'  │ '0.85'        │ '90.00'  │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 2      │ 14     │ '50'  │ '-198.00' │ '0.28'        │ '274.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 6      │ 43     │ '33'  │ '-59.00'  │ '0.91'        │ '443.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 7      │ '100' │ '111.50'  │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 14     │ 100    │ '50'  │ '221.00'  │ '1.24'        │ '624.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MNQ, 1-min (watch filter: ema)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x8.00 by typical first-15-min range 132.0 pts vs MES 16.5 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (1 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-06 (NY time), 42 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 26     │ 100    │ '38'  │ '217.00'  │ '1.16'        │ '351.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 18     │ 69     │ '44'  │ '442.50'  │ '1.47'        │ '304.00' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 15     │ 58     │ '40'  │ '503.00'  │ '1.95'        │ '236.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 18     │ 69     │ '44'  │ '575.00'  │ '1.71'        │ '195.50' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 6      │ 23     │ '17'  │ '-202.50' │ '0.43'        │ '219.50' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 4      │ 15     │ '25'  │ '-152.50' │ '0.50'        │ '169.50' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 4      │ 15     │ '0'   │ '-219.50' │ '0.00'        │ '219.50' │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 23     │ 88     │ '39'  │ '240.50'  │ '1.19'        │ '335.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MES, 1-min (watch filter: ema)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (1 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-06 (NY time), 41 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 17     │ 100    │ '24'  │ '-170.25' │ '0.67'        │ '362.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 14     │ 82     │ '29'  │ '-50.50'  │ '0.87'        │ '331.75' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 9      │ 53     │ '22'  │ '-66.75'  │ '0.74'        │ '167.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 15     │ 88     │ '27'  │ '-81.25'  │ '0.81'        │ '362.50' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 9      │ 53     │ '11'  │ '-240.50' │ '0.27'        │ '272.75' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 7      │ 41     │ '14'  │ '-147.75' │ '0.38'        │ '180.00' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 4      │ 24     │ '25'  │ '-41.75'  │ '0.68'        │ '74.00'  │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 15     │ 88     │ '27'  │ '-113.75' │ '0.75'        │ '306.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

# $100 ETF tracks - fractional shares, $0 commission (locked 2026-10-23, started 2026-10-26). Net $ on a $100 account = % return

## 3AM-range sweep - QQQ (watch row 4: sweep, R:R 1.5)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.139 shares (fractional), $0.14 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.20 by typical first-15-min range 3.3 pts vs MES 16.8 pts: HA 1.5 pts, ORB 2.5 pts
Data: QQQ (901 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-06 (NY time), 70 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (10 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬────────────┬────────┬───────┬─────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $   │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼─────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 5      │ '20'  │ '-0.98' │ '0.29'        │ '1.39'   │ 0        │ '-0.98'                 │
│ 1       │ 2   │ 'breakout' │ 5      │ '20'  │ '-0.85' │ '0.39'        │ '1.39'   │ 0        │ '-0.85'                 │
│ 2       │ 1.5 │ 'retest'   │ 6      │ '33'  │ '-0.73' │ '0.28'        │ '0.73'   │ 0        │ '-0.73'                 │
│ 3       │ 2   │ 'retest'   │ 6      │ '33'  │ '-0.64' │ '0.38'        │ '0.64'   │ 0        │ '-0.64'                 │
│ 4       │ 1.5 │ 'sweep'    │ 5      │ '40'  │ '-0.04' │ '0.88'        │ '0.24'   │ 0        │ '-0.04'                 │
│ 5       │ 2   │ 'sweep'    │ 5      │ '40'  │ '0.06'  │ '1.17'        │ '0.20'   │ 0        │ '0.06'                  │
└─────────┴─────┴────────────┴────────┴───────┴─────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 32 trades to trades_qqq_ldn_5m_since_2026-10-26.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep - SPY (watch row 4: sweep, R:R 1.5)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.09 by typical first-15-min range 1.6 pts vs MES 16.8 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (889 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-06 (NY time), 70 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (10 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬────────────┬────────┬───────┬─────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $   │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼─────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 7      │ '43'  │ '0.16'  │ '1.28'        │ '0.44'   │ 0        │ '0.16'                  │
│ 1       │ 2   │ 'breakout' │ 7      │ '43'  │ '0.40'  │ '1.70'        │ '0.44'   │ 0        │ '0.40'                  │
│ 2       │ 1.5 │ 'retest'   │ 9      │ '22'  │ '-0.68' │ '0.22'        │ '0.88'   │ 0        │ '-0.68'                 │
│ 3       │ 2   │ 'retest'   │ 9      │ '11'  │ '-0.68' │ '0.25'        │ '0.90'   │ 0        │ '-0.68'                 │
│ 4       │ 1.5 │ 'sweep'    │ 7      │ '14'  │ '-0.75' │ '0.12'        │ '0.75'   │ 0        │ '-0.75'                 │
│ 5       │ 2   │ 'sweep'    │ 7      │ '14'  │ '-0.71' │ '0.16'        │ '0.71'   │ 0        │ '-0.71'                 │
└─────────┴─────┴────────────┴────────┴───────┴─────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 46 trades to trades_spy_ldn_5m_since_2026-10-26.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep + VWAP side - QQQ (watch filter: vwap)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.139 shares (fractional), $0.14 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.20 by typical first-15-min range 3.3 pts vs MES 16.8 pts: HA 1.5 pts, ORB 2.5 pts
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-06 (NY time), 70 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (10 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬─────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $   │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼─────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 5      │ 100    │ '40'  │ '-0.04' │ '0.88'        │ '0.24'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 20     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 2      │ 40     │ '0'   │ '-0.19' │ '0.00'        │ '0.19'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 20     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 20     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 5      │ 100    │ '40'  │ '-0.04' │ '0.88'        │ '0.24'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴─────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - SPY (watch filter: vwap)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.09 by typical first-15-min range 1.6 pts vs MES 16.8 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-06 (NY time), 70 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (10 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬─────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $   │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼─────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 7      │ 100    │ '14'  │ '-0.75' │ '0.12'        │ '0.75'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 14     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 2      │ 29     │ '0'   │ '-0.15' │ '0.00'        │ '0.15'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 3      │ 43     │ '0'   │ '-0.61' │ '0.00'        │ '0.61'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 4      │ 57     │ '25'  │ '-0.24' │ '0.29'        │ '0.25'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 1      │ 14     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 2      │ 29     │ '0'   │ '-0.15' │ '0.00'        │ '0.15'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 7      │ 100    │ '14'  │ '-0.75' │ '0.12'        │ '0.75'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴─────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## ORB 15-min, 2R + trend & skip choppy - SPY, 5-min (watch filter: ema+chop)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: Opening Range Breakout, 5m bars
Max stop scaled x0.09 by typical first-15-min range 1.6 pts vs MES 16.8 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-06 (NY time), 70 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (10 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $  │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 2      │ 100    │ '100' │ '0.53' │ 'inf'         │ '0.00'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 2      │ 100    │ '100' │ '0.53' │ 'inf'         │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 0      │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 2      │ 100    │ '100' │ '0.53' │ 'inf'         │ '0.00'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 2      │ 100    │ '100' │ '0.53' │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 2      │ 100    │ '100' │ '0.53' │ 'inf'         │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 2      │ 100    │ '100' │ '0.53' │ 'inf'         │ '0.00'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## ORB 15-min, 2R + trend & skip choppy - QQQ, 5-min (watch filter: ema+chop)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.139 shares (fractional), $0.14 per $1 move
Strategy: Opening Range Breakout, 5m bars
Max stop scaled x0.20 by typical first-15-min range 3.3 pts vs MES 16.8 pts: HA 1.5 pts, ORB 2.5 pts
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-06 (NY time), 70 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (10 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬─────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $   │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼─────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 3      │ 100    │ '0'   │ '-0.92' │ '0.00'        │ '0.92'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 33     │ '0'   │ '-0.26' │ '0.00'        │ '0.26'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 33     │ '0'   │ '-0.26' │ '0.00'        │ '0.26'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 3      │ 100    │ '0'   │ '-0.92' │ '0.00'        │ '0.92'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 3      │ 100    │ '0'   │ '-0.92' │ '0.00'        │ '0.92'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴─────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

# Exit tracks (locked 2026-10-10, started 2026-10-12) - compare the watched exit row to the 'fixed' row

## First-candle FVG day entry + trailing stop - MNQ (watch exit: trail)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Max stop scaled x8.31 by typical first-15-min range 139.3 pts vs MES 16.8 pts: HA 66.5 pts, ORB 99.75 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 6      │ '17'  │ '-697.50' │ '0.23'        │ '697.50' │ '209.00'     │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 6      │ '17'  │ '-697.50' │ '0.23'        │ '697.50' │ '209.00'     │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 6      │ '17'  │ '-678.75' │ '0.25'        │ '678.75' │ '227.75'     │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 6      │ '17'  │ '-677.00' │ '0.25'        │ '677.00' │ '229.50'     │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 6      │ '17'  │ '-694.00' │ '0.23'        │ '694.00' │ '212.50'     │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 6      │ '17'  │ '-697.50' │ '0.23'        │ '697.50' │ '209.00'     │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

## First-candle FVG day entry + trailing stop - MES (watch exit: trail)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬────────────┬───────────────┬───────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $      │ Profit factor │ Max DD $  │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼────────────┼───────────────┼───────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 10     │ '30'  │ '-377.50'  │ '0.39'        │ '430.50'  │ '163.00'     │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 10     │ '20'  │ '-353.75'  │ '0.38'        │ '406.75'  │ '163.00'     │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 10     │ '40'  │ '-308.75'  │ '0.45'        │ '348.00'  │ '121.75'     │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 10     │ '30'  │ '-643.75'  │ '0.19'        │ '669.88'  │ '78.63'      │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 10     │ '20'  │ '-1023.75' │ '0.08'        │ '1050.50' │ '66.75'      │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 10     │ '20'  │ '-1108.75' │ '0.06'        │ '1146.75' │ '38.00'      │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴────────────┴───────────────┴───────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

_Pass rules (set in advance): 30+ trades, profit factor above 1.3, positive on BOTH markets._
