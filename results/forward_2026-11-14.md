# MES forward test - 2026-11-14 2:13 PM ET

## Heikin Ashi pullback (watch row 0: R:R 1, start 09:30)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Heikin Ashi pullback, 1m bars
Data: MES=F (1 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-13 (NY time), 46 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (26 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ 'start 09:30' │ 35     │ '29'  │ '-353.75' │ '0.39'        │ '386.75' │ 2        │ '-308.75'               │
│ 1       │ 1   │ 'start 09:45' │ 33     │ '27'  │ '-326.00' │ '0.37'        │ '359.00' │ 2        │ '-281.00'               │
│ 2       │ 1.5 │ 'start 09:30' │ 34     │ '24'  │ '-334.25' │ '0.45'        │ '384.75' │ 1        │ '-329.25'               │
│ 3       │ 1.5 │ 'start 09:45' │ 33     │ '24'  │ '-277.25' │ '0.50'        │ '327.75' │ 2        │ '-258.50'               │
│ 4       │ 2   │ 'start 09:30' │ 32     │ '13'  │ '-500.25' │ '0.27'        │ '569.50' │ 1        │ '-495.25'               │
│ 5       │ 2   │ 'start 09:45' │ 31     │ '16'  │ '-368.25' │ '0.38'        │ '437.50' │ 2        │ '-347.00'               │
└─────────┴─────┴───────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 198 trades to trades_ha_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Opening Range Breakout (watch row 4: R:R 2, 15-min range)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-13 (NY time), 46 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (26 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 11     │ '55'  │ '-37.00'  │ '0.87'        │ '238.25' │ 0        │ '-37.00'                │
│ 1       │ 1   │ '30-min range' │ 6      │ '33'  │ '-134.50' │ '0.40'        │ '185.00' │ 0        │ '-134.50'               │
│ 2       │ 1.5 │ '15-min range' │ 11     │ '27'  │ '-197.00' │ '0.51'        │ '406.00' │ 0        │ '-197.00'               │
│ 3       │ 1.5 │ '30-min range' │ 6      │ '17'  │ '-194.50' │ '0.28'        │ '271.25' │ 0        │ '-194.50'               │
│ 4       │ 2   │ '15-min range' │ 11     │ '27'  │ '-125.75' │ '0.69'        │ '406.00' │ 0        │ '-125.75'               │
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
Max stop scaled x8.13 by typical first-15-min range 142.3 pts vs MES 17.5 pts: HA 65 pts, ORB 97.5 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-13 (NY time), 76 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 5      │ '40'  │ '1734.00' │ '5.28'        │ '293.50' │ 0        │ '1734.00'               │
│ 1       │ 2      │ '30-min chart' │ 5      │ '40'  │ '2228.00' │ '6.50'        │ '293.50' │ 0        │ '2228.00'               │
│ 2       │ 3      │ '30-min chart' │ 5      │ '40'  │ '2228.00' │ '6.50'        │ '293.50' │ 0        │ '2228.00'               │
│ 3       │ 'push' │ '15-min chart' │ 8      │ '38'  │ '206.00'  │ '1.37'        │ '279.50' │ 0        │ '206.00'                │
│ 4       │ 2      │ '15-min chart' │ 8      │ '38'  │ '-241.00' │ '0.56'        │ '411.50' │ 0        │ '-241.00'               │
│ 5       │ 3      │ '15-min chart' │ 8      │ '38'  │ '-85.50'  │ '0.84'        │ '340.50' │ 0        │ '-85.50'                │
│ 6       │ 'push' │ '5-min chart'  │ 30     │ '27'  │ '40.00'   │ '1.02'        │ '795.50' │ 0        │ '40.00'                 │
│ 7       │ 2      │ '5-min chart'  │ 30     │ '23'  │ '-965.00' │ '0.54'        │ '965.00' │ 0        │ '-965.00'               │
│ 8       │ 3      │ '5-min chart'  │ 30     │ '23'  │ '-505.00' │ '0.76'        │ '816.00' │ 0        │ '-505.00'               │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 129 trades to trades_mnq_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range liquidity sweep - MES (watch row 4: sweep, R:R 1.5) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-13 (NY time), 76 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 22     │ '45'  │ '301.00'  │ '1.41'        │ '467.50' │ 0        │ '301.00'                │
│ 1       │ 2   │ 'breakout' │ 22     │ '45'  │ '651.00'  │ '1.89'        │ '440.00' │ 0        │ '651.00'                │
│ 2       │ 1.5 │ 'retest'   │ 20     │ '30'  │ '-6.25'   │ '0.99'        │ '315.75' │ 0        │ '-6.25'                 │
│ 3       │ 2   │ 'retest'   │ 20     │ '20'  │ '-151.25' │ '0.76'        │ '446.75' │ 0        │ '-151.25'               │
│ 4       │ 1.5 │ 'sweep'    │ 18     │ '28'  │ '-288.50' │ '0.49'        │ '379.75' │ 2        │ '-207.25'               │
│ 5       │ 2   │ 'sweep'    │ 18     │ '22'  │ '-341.00' │ '0.45'        │ '473.25' │ 1        │ '-287.25'               │
└─────────┴─────┴────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 120 trades to trades_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MES (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-13 (NY time), 76 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 2      │ '100' │ '104.75' │ 'inf'         │ '0.00'   │ 0        │ '104.75'                │
│ 1       │ 1.5 │ 'no trend filter'         │ 9      │ '67'  │ '254.50' │ '2.44'        │ '94.50'  │ 0        │ '254.50'                │
│ 2       │ 2   │ 'with daily trend filter' │ 2      │ '100' │ '141.00' │ 'inf'         │ '0.00'   │ 0        │ '141.00'                │
│ 3       │ 2   │ 'no trend filter'         │ 9      │ '44'  │ '239.50' │ '2.01'        │ '143.00' │ 0        │ '239.50'                │
└─────────┴─────┴───────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 22 trades to trades_pdh_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MNQ (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Max stop scaled x8.13 by typical first-15-min range 142.3 pts vs MES 17.5 pts: HA 65 pts, ORB 97.5 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-13 (NY time), 76 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 2      │ '100' │ '373.00' │ 'inf'         │ '0.00'   │ 0        │ '373.00'                │
│ 1       │ 1.5 │ 'no trend filter'         │ 6      │ '67'  │ '631.50' │ '7.75'        │ '93.50'  │ 0        │ '631.50'                │
│ 2       │ 2   │ 'with daily trend filter' │ 2      │ '100' │ '499.00' │ 'inf'         │ '0.00'   │ 0        │ '499.00'                │
│ 3       │ 2   │ 'no trend filter'         │ 6      │ '67'  │ '876.50' │ '10.37'       │ '93.50'  │ 0        │ '876.50'                │
└─────────┴─────┴───────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 16 trades to trades_mnq_pdh_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG, day entry - MNQ (watch row 2: 15-min range, 5-min gap, limit, R:R 2) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Max stop scaled x8.13 by typical first-15-min range 142.3 pts vs MES 17.5 pts: HA 65 pts, ORB 97.5 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-13 (NY time), 76 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 6      │ '17'  │ '-161.50' │ '0.78'        │ '495.00' │ 0        │ '-161.50'               │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 6      │ '17'  │ '-351.00' │ '0.52'        │ '495.00' │ 0        │ '-351.00'               │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 8      │ '25'  │ '-307.00' │ '0.73'        │ '697.50' │ 0        │ '-307.00'               │
│ 3       │ 3   │ 'DAY: same, 3R'                                        │ 8      │ '25'  │ '-273.00' │ '0.76'        │ '697.50' │ 0        │ '-273.00'               │
└─────────┴─────┴────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 28 trades to trades_mnq_fvgo_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous 1-hour candle continuation - MNQ, 1-min (watch row 0: his rules, 2R + break-even at 1.5R) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x7.99 by typical first-15-min range 141.8 pts vs MES 17.8 pts: HA 64 pts, ORB 95.75 pts
Data: MNQ=F (1 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-13 (NY time), 47 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 33     │ '39'  │ '301.00'  │ '1.18'        │ '391.00' │ 0        │ '301.00'                │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 33     │ '39'  │ '234.50'  │ '1.13'        │ '391.00' │ 0        │ '234.50'                │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 33     │ '42'  │ '-104.50' │ '0.94'        │ '461.00' │ 0        │ '-104.50'               │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 64     │ '38'  │ '425.50'  │ '1.14'        │ '711.00' │ 0        │ '425.50'                │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 163 trades to trades_mnq_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Confirmation tracks (same locked versions, other market)

## ORB on MNQ (watch row 4: R:R 2, 15-min range)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Opening Range Breakout, 1m bars
Max stop scaled x7.99 by typical first-15-min range 141.8 pts vs MES 17.8 pts: HA 64 pts, ORB 95.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-13 (NY time), 47 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (26 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 13     │ '38'  │ '-587.00' │ '0.53'        │ '627.00' │ 0        │ '-587.00'               │
│ 1       │ 1   │ '30-min range' │ 8      │ '38'  │ '-389.50' │ '0.52'        │ '530.00' │ 0        │ '-389.50'               │
│ 2       │ 1.5 │ '15-min range' │ 13     │ '38'  │ '-409.50' │ '0.68'        │ '722.00' │ 0        │ '-409.50'               │
│ 3       │ 1.5 │ '30-min range' │ 8      │ '38'  │ '-343.00' │ '0.57'        │ '444.00' │ 0        │ '-343.00'               │
│ 4       │ 2   │ '15-min range' │ 13     │ '31'  │ '-427.50' │ '0.69'        │ '722.00' │ 0        │ '-427.50'               │
│ 5       │ 2   │ '30-min range' │ 8      │ '38'  │ '-202.50' │ '0.75'        │ '444.00' │ 0        │ '-202.50'               │
└─────────┴─────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 63 trades to trades_mnq_orb_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Supply & demand on MES (watch row 1: R:R 2, 30-min chart)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Supply & demand zones (200 EMA), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-13 (NY time), 76 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 4      │ '25'  │ '570.75'  │ '5.67'        │ '74.00'  │ 0        │ '570.75'                │
│ 1       │ 2      │ '30-min chart' │ 4      │ '25'  │ '783.25'  │ '7.41'        │ '74.00'  │ 0        │ '783.25'                │
│ 2       │ 3      │ '30-min chart' │ 4      │ '25'  │ '783.25'  │ '7.41'        │ '74.00'  │ 0        │ '783.25'                │
│ 3       │ 'push' │ '15-min chart' │ 8      │ '0'   │ '-398.50' │ '0.00'        │ '398.50' │ 0        │ '-398.50'               │
│ 4       │ 2      │ '15-min chart' │ 8      │ '0'   │ '-398.50' │ '0.00'        │ '398.50' │ 0        │ '-398.50'               │
│ 5       │ 3      │ '15-min chart' │ 8      │ '0'   │ '-398.50' │ '0.00'        │ '398.50' │ 0        │ '-398.50'               │
│ 6       │ 'push' │ '5-min chart'  │ 35     │ '29'  │ '631.25'  │ '1.86'        │ '229.75' │ 0        │ '631.25'                │
│ 7       │ 2      │ '5-min chart'  │ 35     │ '34'  │ '858.75'  │ '2.26'        │ '271.00' │ 0        │ '858.75'                │
│ 8       │ 3      │ '5-min chart'  │ 35     │ '29'  │ '867.50'  │ '2.17'        │ '278.00' │ 0        │ '867.50'                │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 141 trades to trades_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep on MNQ (watch row 4: sweep, R:R 1.5)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.13 by typical first-15-min range 142.3 pts vs MES 17.5 pts: HA 65 pts, ORB 97.5 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-13 (NY time), 76 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 19     │ '47'  │ '693.50'  │ '1.39'        │ '952.00' │ 0        │ '693.50'                │
│ 1       │ 2   │ 'breakout' │ 19     │ '42'  │ '325.50'  │ '1.17'        │ '952.00' │ 0        │ '325.50'                │
│ 2       │ 1.5 │ 'retest'   │ 14     │ '43'  │ '-113.00' │ '0.91'        │ '886.50' │ 0        │ '-113.00'               │
│ 3       │ 2   │ 'retest'   │ 14     │ '43'  │ '251.50'  │ '1.21'        │ '814.50' │ 0        │ '251.50'                │
│ 4       │ 1.5 │ 'sweep'    │ 17     │ '53'  │ '606.50'  │ '1.62'        │ '352.00' │ 0        │ '606.50'                │
│ 5       │ 2   │ 'sweep'    │ 17     │ '41'  │ '355.50'  │ '1.29'        │ '492.50' │ 0        │ '355.50'                │
└─────────┴─────┴────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 100 trades to trades_mnq_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG day entry on MES (watch row 2: R:R 2)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-13 (NY time), 76 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 6      │ '0'   │ '-325.75' │ '0.00'        │ '325.75' │ 0        │ '-325.75'               │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 6      │ '17'  │ '-69.50'  │ '0.74'        │ '267.50' │ 0        │ '-69.50'                │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 11     │ '27'  │ '-529.50' │ '0.32'        │ '582.50' │ 0        │ '-529.50'               │
│ 3       │ 3   │ 'DAY: same, 3R'                                        │ 11     │ '27'  │ '-419.50' │ '0.46'        │ '500.00' │ 0        │ '-419.50'               │
└─────────┴─────┴────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 34 trades to trades_fvgo_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous 1-hour candle continuation on MES, 1-min (watch row 0: his rules)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-13 (NY time), 46 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 22     │ '27'  │ '-155.25' │ '0.73'        │ '427.00' │ 0        │ '-155.25'               │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 22     │ '27'  │ '-229.00' │ '0.65'        │ '456.75' │ 0        │ '-229.00'               │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 22     │ '36'  │ '-152.75' │ '0.73'        │ '427.00' │ 0        │ '-152.75'               │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 40     │ '35'  │ '-72.50'  │ '0.92'        │ '391.75' │ 0        │ '-72.50'                │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 106 trades to trades_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Filter tracks (locked 2026-10-10, started 2026-10-12) - compare the watched filter row to the 'none' row

## ORB + 200 EMA trend + skip choppy - MES, 1-min (watch filter: ema+chop)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-13 (NY time), 46 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 10     │ 100    │ '20'  │ '-228.75' │ '0.44'        │ '406.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 6      │ 60     │ '33'  │ '-12.00'  │ '0.94'        │ '189.25' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 10     │ 100    │ '20'  │ '-228.75' │ '0.44'        │ '406.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 10     │ '0'   │ '-50.75'  │ '0.00'        │ '50.75'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 10     │ 100    │ '20'  │ '-228.75' │ '0.44'        │ '406.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## ORB + 200 EMA trend + skip choppy - MNQ, 1-min (watch filter: ema+chop)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Opening Range Breakout, 1m bars
Max stop scaled x7.99 by typical first-15-min range 141.8 pts vs MES 17.8 pts: HA 64 pts, ORB 95.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-13 (NY time), 47 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 12     │ 100    │ '33'  │ '-239.50' │ '0.80'        │ '579.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 6      │ 50     │ '33'  │ '-207.00' │ '0.65'        │ '410.50' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 2      │ 17     │ '50'  │ '-108.50' │ '0.30'        │ '154.00' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 10     │ 83     │ '40'  │ '71.00'   │ '1.08'        │ '450.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 2      │ 17     │ '100' │ '375.50'  │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 1      │ 8      │ '100' │ '45.50'   │ 'inf'         │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 8      │ '100' │ '45.50'   │ 'inf'         │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 12     │ 100    │ '33'  │ '-239.50' │ '0.80'        │ '579.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MES (watch filter: vwap)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-13 (NY time), 76 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 18     │ 100    │ '28'  │ '-288.50' │ '0.49'        │ '379.75' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 6      │ '0'   │ '-50.75'  │ '0.00'        │ '50.75'  │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 6      │ 33     │ '17'  │ '-147.00' │ '0.33'        │ '150.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 6      │ 33     │ '17'  │ '-328.25' │ '0.11'        │ '370.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 6      │ 33     │ '50'  │ '103.00'  │ '2.62'        │ '52.75'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 6      │ '0'   │ '-10.75'  │ '0.00'        │ '10.75'  │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 18     │ 100    │ '28'  │ '-288.50' │ '0.49'        │ '379.75' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MNQ (watch filter: vwap)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.13 by typical first-15-min range 142.3 pts vs MES 17.5 pts: HA 65 pts, ORB 97.5 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-13 (NY time), 76 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 17     │ 100    │ '53'  │ '606.50'  │ '1.62'        │ '352.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 2      │ 12     │ '50'  │ '-16.00'  │ '0.82'        │ '91.00'  │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 2      │ 12     │ '50'  │ '-130.50' │ '0.36'        │ '205.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 6      │ 35     │ '50'  │ '445.00'  │ '2.23'        │ '191.50' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 4      │ 24     │ '50'  │ '-7.50'   │ '0.98'        │ '334.50' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 6      │ '0'   │ '-205.50' │ '0.00'        │ '205.50' │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 17     │ 100    │ '53'  │ '606.50'  │ '1.62'        │ '352.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MNQ, 1-min (watch filter: ema)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x7.99 by typical first-15-min range 141.8 pts vs MES 17.8 pts: HA 64 pts, ORB 95.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-13 (NY time), 47 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 33     │ 100    │ '39'  │ '301.00'  │ '1.18'        │ '391.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 21     │ 64     │ '48'  │ '529.00'  │ '1.48'        │ '302.50' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 19     │ 58     │ '37'  │ '386.00'  │ '1.47'        │ '293.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 22     │ 67     │ '45'  │ '604.50'  │ '1.59'        │ '205.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 9      │ 27     │ '22'  │ '-222.00' │ '0.60'        │ '222.00' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 6      │ 18     │ '33'  │ '-124.50' │ '0.73'        │ '168.00' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 7      │ 21     │ '14'  │ '-238.50' │ '0.42'        │ '238.50' │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 30     │ 91     │ '40'  │ '323.00'  │ '1.20'        │ '391.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MES, 1-min (watch filter: ema)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-13 (NY time), 46 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 22     │ 100    │ '27'  │ '-155.25' │ '0.73'        │ '427.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 15     │ 68     │ '20'  │ '-158.75' │ '0.60'        │ '333.00' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 13     │ 59     │ '23'  │ '-133.50' │ '0.59'        │ '234.00' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 18     │ 82     │ '22'  │ '-214.75' │ '0.56'        │ '427.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 12     │ 55     │ '25'  │ '-206.50' │ '0.48'        │ '337.25' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 7      │ 32     │ '14'  │ '-149.00' │ '0.38'        │ '181.25' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 7      │ 32     │ '43'  │ '-6.50'   │ '0.97'        │ '137.25' │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 20     │ 91     │ '30'  │ '-98.75'  │ '0.81'        │ '370.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

# $100 ETF tracks - fractional shares, $0 commission (locked 2026-10-23, started 2026-10-26). Net $ on a $100 account = % return

## 3AM-range sweep - QQQ (watch row 4: sweep, R:R 1.5)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.139 shares (fractional), $0.14 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.19 by typical first-15-min range 3.3 pts vs MES 17.5 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-13 (NY time), 75 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (15 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬────────────┬────────┬───────┬─────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $   │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼─────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 9      │ '33'  │ '-0.82' │ '0.60'        │ '1.77'   │ 0        │ '-0.82'                 │
│ 1       │ 2   │ 'breakout' │ 9      │ '33'  │ '-0.41' │ '0.80'        │ '1.70'   │ 0        │ '-0.41'                 │
│ 2       │ 1.5 │ 'retest'   │ 8      │ '50'  │ '0.36'  │ '1.39'        │ '0.62'   │ 1        │ '0.52'                  │
│ 3       │ 2   │ 'retest'   │ 8      │ '50'  │ '0.78'  │ '1.86'        │ '0.52'   │ 1        │ '0.97'                  │
│ 4       │ 1.5 │ 'sweep'    │ 9      │ '44'  │ '0.13'  │ '1.16'        │ '0.44'   │ 0        │ '0.13'                  │
│ 5       │ 2   │ 'sweep'    │ 9      │ '33'  │ '-0.34' │ '0.67'        │ '0.70'   │ 0        │ '-0.34'                 │
└─────────┴─────┴────────────┴────────┴───────┴─────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 52 trades to trades_qqq_ldn_5m_since_2026-10-26.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep - SPY (watch row 4: sweep, R:R 1.5)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.09 by typical first-15-min range 1.6 pts vs MES 17.5 pts: HA 0.75 pts, ORB 1 pts
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-13 (NY time), 75 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (15 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬────────────┬────────┬───────┬─────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $   │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼─────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 11     │ '55'  │ '0.82'  │ '2.18'        │ '0.44'   │ 0        │ '0.82'                  │
│ 1       │ 2   │ 'breakout' │ 11     │ '55'  │ '1.33'  │ '2.91'        │ '0.44'   │ 0        │ '1.33'                  │
│ 2       │ 1.5 │ 'retest'   │ 11     │ '36'  │ '0.02'  │ '1.03'        │ '0.60'   │ 0        │ '0.02'                  │
│ 3       │ 2   │ 'retest'   │ 11     │ '18'  │ '-0.28' │ '0.68'        │ '0.87'   │ 0        │ '-0.28'                 │
│ 4       │ 1.5 │ 'sweep'    │ 9      │ '33'  │ '-0.40' │ '0.54'        │ '0.75'   │ 0        │ '-0.40'                 │
│ 5       │ 2   │ 'sweep'    │ 9      │ '22'  │ '-0.61' │ '0.38'        │ '0.84'   │ 0        │ '-0.61'                 │
└─────────┴─────┴────────────┴────────┴───────┴─────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 62 trades to trades_spy_ldn_5m_since_2026-10-26.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep + VWAP side - QQQ (watch filter: vwap)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.139 shares (fractional), $0.14 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.19 by typical first-15-min range 3.3 pts vs MES 17.5 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-13 (NY time), 75 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (15 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $  │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 9      │ 100    │ '44'  │ '0.13' │ '1.16'        │ '0.44'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 0      │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 3      │ 33     │ '100' │ '0.71' │ 'inf'         │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 3      │ 33     │ '33'  │ '0.19' │ '1.96'        │ '0.20'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 3      │ 33     │ '67'  │ '0.11' │ '1.50'        │ '0.22'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 2      │ 22     │ '100' │ '0.33' │ 'inf'         │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 9      │ 100    │ '44'  │ '0.13' │ '1.16'        │ '0.44'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - SPY (watch filter: vwap)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.09 by typical first-15-min range 1.6 pts vs MES 17.5 pts: HA 0.75 pts, ORB 1 pts
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-13 (NY time), 75 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (15 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬─────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $   │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼─────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 9      │ 100    │ '33'  │ '-0.40' │ '0.54'        │ '0.75'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 11     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 3      │ 33     │ '33'  │ '0.03'  │ '1.23'        │ '0.15'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 3      │ 33     │ '0'   │ '-0.61' │ '0.00'        │ '0.61'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 5      │ 56     │ '40'  │ '-0.07' │ '0.80'        │ '0.25'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 1      │ 11     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 2      │ 22     │ '0'   │ '-0.15' │ '0.00'        │ '0.15'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 9      │ 100    │ '33'  │ '-0.40' │ '0.54'        │ '0.75'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴─────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## ORB 15-min, 2R + trend & skip choppy - SPY, 5-min (watch filter: ema+chop)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: Opening Range Breakout, 5m bars
Max stop scaled x0.09 by typical first-15-min range 1.6 pts vs MES 17.5 pts: HA 0.75 pts, ORB 1 pts
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-13 (NY time), 75 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (15 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $  │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 1      │ 100    │ '100' │ '0.24' │ 'inf'         │ '0.00'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 100    │ '100' │ '0.24' │ 'inf'         │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 0      │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 1      │ 100    │ '100' │ '0.24' │ 'inf'         │ '0.00'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 100    │ '100' │ '0.24' │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 1      │ 100    │ '100' │ '0.24' │ 'inf'         │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 1      │ 100    │ '100' │ '0.24' │ 'inf'         │ '0.00'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## ORB 15-min, 2R + trend & skip choppy - QQQ, 5-min (watch filter: ema+chop)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.139 shares (fractional), $0.14 per $1 move
Strategy: Opening Range Breakout, 5m bars
Max stop scaled x0.19 by typical first-15-min range 3.3 pts vs MES 17.5 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-13 (NY time), 75 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (15 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬─────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $   │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼─────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 2      │ 100    │ '0'   │ '-0.57' │ '0.00'        │ '0.57'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 50     │ '0'   │ '-0.26' │ '0.00'        │ '0.26'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 50     │ '0'   │ '-0.26' │ '0.00'        │ '0.26'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 2      │ 100    │ '0'   │ '-0.57' │ '0.00'        │ '0.57'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 2      │ 100    │ '0'   │ '-0.57' │ '0.00'        │ '0.57'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴─────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

# $100 ETF tracks, round 2 - previous-day high/low retest (locked 2026-11-07, started 2026-11-09)

## Previous-day high/low retest - SPY (watch row 3: no trend filter, R:R 2)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Max stop scaled x0.09 by typical first-15-min range 1.6 pts vs MES 17.5 pts: HA 0.75 pts, ORB 1 pts
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-13 (NY time), 75 trading days
FORWARD TEST: only counting trades from 2026-11-09 on (5 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬───────────────────────────┬────────┬───────┬────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $  │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 1       │ 1.5 │ 'no trend filter'         │ 1      │ '100' │ '0.31' │ 'inf'         │ '0.00'   │ 0        │ '0.31'                  │
│ 2       │ 2   │ 'with daily trend filter' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 3       │ 2   │ 'no trend filter'         │ 1      │ '100' │ '0.42' │ 'inf'         │ '0.00'   │ 0        │ '0.42'                  │
└─────────┴─────┴───────────────────────────┴────────┴───────┴────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 2 trades to trades_spy_pdh_5m_since_2026-11-09.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - QQQ (watch row 3: no trend filter, R:R 2)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.139 shares (fractional), $0.14 per $1 move
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Max stop scaled x0.19 by typical first-15-min range 3.3 pts vs MES 17.5 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-13 (NY time), 75 trading days
FORWARD TEST: only counting trades from 2026-11-09 on (5 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬───────────────────────────┬────────┬───────┬────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $  │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 1       │ 1.5 │ 'no trend filter'         │ 1      │ '100' │ '0.38' │ 'inf'         │ '0.00'   │ 0        │ '0.38'                  │
│ 2       │ 2   │ 'with daily trend filter' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 3       │ 2   │ 'no trend filter'         │ 1      │ '100' │ '0.51' │ 'inf'         │ '0.00'   │ 0        │ '0.51'                  │
└─────────┴─────┴───────────────────────────┴────────┴───────┴────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 2 trades to trades_qqq_pdh_5m_since_2026-11-09.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Exit tracks (locked 2026-10-10, started 2026-10-12) - compare the watched exit row to the 'fixed' row

## First-candle FVG day entry + trailing stop - MNQ (watch exit: trail)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Max stop scaled x8.13 by typical first-15-min range 142.3 pts vs MES 17.5 pts: HA 65 pts, ORB 97.5 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-13 (NY time), 76 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 8      │ '25'  │ '-307.00' │ '0.73'        │ '697.50' │ '622.00'     │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 8      │ '25'  │ '-307.00' │ '0.73'        │ '697.50' │ '622.00'     │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 8      │ '25'  │ '-444.25' │ '0.61'        │ '678.75' │ '466.00'     │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 8      │ '25'  │ '-596.25' │ '0.48'        │ '677.00' │ '312.25'     │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 8      │ '25'  │ '-611.00' │ '0.46'        │ '694.00' │ '314.50'     │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 8      │ '25'  │ '-273.00' │ '0.76'        │ '697.50' │ '656.00'     │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

## First-candle FVG day entry + trailing stop - MES (watch exit: trail)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-13 (NY time), 76 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (25 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬────────────┬───────────────┬───────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $      │ Profit factor │ Max DD $  │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼────────────┼───────────────┼───────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 11     │ '27'  │ '-529.50'  │ '0.32'        │ '582.50'  │ '163.00'     │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 11     │ '18'  │ '-505.75'  │ '0.30'        │ '558.75'  │ '163.00'     │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 11     │ '36'  │ '-460.75'  │ '0.36'        │ '500.00'  │ '121.75'     │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 11     │ '27'  │ '-795.75'  │ '0.16'        │ '821.88'  │ '78.63'      │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 11     │ '18'  │ '-1175.75' │ '0.07'        │ '1202.50' │ '66.75'      │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 11     │ '18'  │ '-1260.75' │ '0.05'        │ '1298.75' │ '38.00'      │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴────────────┴───────────────┴───────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

_Pass rules (set in advance): 30+ trades, profit factor above 1.3, positive on BOTH markets._
