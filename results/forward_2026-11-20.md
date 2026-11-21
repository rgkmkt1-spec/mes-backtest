# MES forward test - 2026-11-20 10:16 PM ET

## Heikin Ashi pullback (watch row 0: R:R 1, start 09:30)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Heikin Ashi pullback, 1m bars
Data: MES=F (6826 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-20 (NY time), 51 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (31 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ 'start 09:30' │ 38     │ '34'  │ '-276.00' │ '0.52'        │ '386.75' │ 2        │ '-231.00'               │
│ 1       │ 1   │ 'start 09:45' │ 36     │ '33'  │ '-248.25' │ '0.52'        │ '359.00' │ 2        │ '-203.25'               │
│ 2       │ 1.5 │ 'start 09:30' │ 37     │ '30'  │ '-214.00' │ '0.65'        │ '384.75' │ 1        │ '-209.00'               │
│ 3       │ 1.5 │ 'start 09:45' │ 36     │ '31'  │ '-157.00' │ '0.72'        │ '327.75' │ 2        │ '-138.25'               │
│ 4       │ 2   │ 'start 09:30' │ 34     │ '15'  │ '-470.50' │ '0.35'        │ '569.50' │ 1        │ '-465.50'               │
│ 5       │ 2   │ 'start 09:45' │ 33     │ '18'  │ '-338.50' │ '0.47'        │ '437.50' │ 2        │ '-317.25'               │
└─────────┴─────┴───────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 214 trades to trades_ha_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Opening Range Breakout (watch row 4: R:R 2, 15-min range)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (1 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-20 (NY time), 51 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (31 trading days so far)
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
Max stop scaled x8.39 by typical first-15-min range 146.8 pts vs MES 17.5 pts: HA 67 pts, ORB 100.75 pts
Data: MNQ=F (1374 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-20 (NY time), 81 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬───────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $  │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼───────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 7      │ '43'  │ '1654.50' │ '3.97'        │ '293.50'  │ 0        │ '1654.50'               │
│ 1       │ 2      │ '30-min chart' │ 7      │ '43'  │ '2359.50' │ '5.23'        │ '293.50'  │ 0        │ '2359.50'               │
│ 2       │ 3      │ '30-min chart' │ 7      │ '43'  │ '2148.50' │ '4.85'        │ '293.50'  │ 0        │ '2148.50'               │
│ 3       │ 'push' │ '15-min chart' │ 12     │ '42'  │ '1185.00' │ '2.54'        │ '279.50'  │ 0        │ '1185.00'               │
│ 4       │ 2      │ '15-min chart' │ 12     │ '42'  │ '75.50'   │ '1.10'        │ '411.50'  │ 0        │ '75.50'                 │
│ 5       │ 3      │ '15-min chart' │ 12     │ '42'  │ '500.50'  │ '1.65'        │ '340.50'  │ 0        │ '500.50'                │
│ 6       │ 'push' │ '5-min chart'  │ 35     │ '26'  │ '-97.00'  │ '0.96'        │ '939.50'  │ 0        │ '-97.00'                │
│ 7       │ 2      │ '5-min chart'  │ 35     │ '23'  │ '-999.50' │ '0.58'        │ '1109.00' │ 1        │ '-729.00'               │
│ 8       │ 3      │ '5-min chart'  │ 35     │ '23'  │ '-670.00' │ '0.72'        │ '981.00'  │ 0        │ '-670.00'               │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴───────────┴──────────┴─────────────────────────┘

Saved 162 trades to trades_mnq_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range liquidity sweep - MES (watch row 4: sweep, R:R 1.5) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (1374 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-20 (NY time), 81 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 26     │ '46'  │ '408.00'  │ '1.42'        │ '467.50' │ 0        │ '408.00'                │
│ 1       │ 2   │ 'breakout' │ 26     │ '46'  │ '875.50'  │ '1.90'        │ '440.00' │ 0        │ '875.50'                │
│ 2       │ 1.5 │ 'retest'   │ 23     │ '30'  │ '-61.00'  │ '0.92'        │ '315.75' │ 0        │ '-61.00'                │
│ 3       │ 2   │ 'retest'   │ 23     │ '22'  │ '-152.25' │ '0.82'        │ '446.75' │ 0        │ '-152.25'               │
│ 4       │ 1.5 │ 'sweep'    │ 21     │ '24'  │ '-635.75' │ '0.31'        │ '653.00' │ 2        │ '-554.50'               │
│ 5       │ 2   │ 'sweep'    │ 21     │ '19'  │ '-688.25' │ '0.29'        │ '725.00' │ 1        │ '-634.50'               │
└─────────┴─────┴────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 140 trades to trades_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MES (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-20 (NY time), 81 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 6      │ '83'  │ '573.00' │ '6.83'        │ '98.25'  │ 0        │ '573.00'                │
│ 1       │ 1.5 │ 'no trend filter'         │ 13     │ '62'  │ '319.00' │ '1.74'        │ '252.75' │ 0        │ '319.00'                │
│ 2       │ 2   │ 'with daily trend filter' │ 6      │ '83'  │ '801.75' │ '9.16'        │ '98.25'  │ 0        │ '801.75'                │
│ 3       │ 2   │ 'no trend filter'         │ 13     │ '46'  │ '412.75' │ '1.84'        │ '252.75' │ 0        │ '412.75'                │
└─────────┴─────┴───────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 38 trades to trades_pdh_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MNQ (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Max stop scaled x8.27 by typical first-15-min range 146.8 pts vs MES 17.8 pts: HA 66.25 pts, ORB 99.25 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-20 (NY time), 81 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 3      │ '100' │ '554.00'  │ 'inf'         │ '0.00'   │ 0        │ '554.00'                │
│ 1       │ 1.5 │ 'no trend filter'         │ 7      │ '71'  │ '812.50'  │ '9.69'        │ '93.50'  │ 0        │ '812.50'                │
│ 2       │ 2   │ 'with daily trend filter' │ 3      │ '100' │ '741.00'  │ 'inf'         │ '0.00'   │ 0        │ '741.00'                │
│ 3       │ 2   │ 'no trend filter'         │ 7      │ '71'  │ '1118.50' │ '12.96'       │ '93.50'  │ 0        │ '1118.50'               │
└─────────┴─────┴───────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 20 trades to trades_mnq_pdh_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG, day entry - MNQ (watch row 2: 15-min range, 5-min gap, limit, R:R 2) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Max stop scaled x8.27 by typical first-15-min range 146.8 pts vs MES 17.8 pts: HA 66.25 pts, ORB 99.25 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-20 (NY time), 81 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 7      │ '14'  │ '-345.50' │ '0.62'        │ '679.00' │ 0        │ '-345.50'               │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 7      │ '14'  │ '-535.00' │ '0.41'        │ '679.00' │ 0        │ '-535.00'               │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 10     │ '30'  │ '-381.00' │ '0.75'        │ '697.50' │ 0        │ '-381.00'               │
│ 3       │ 3   │ 'DAY: same, 3R'                                        │ 10     │ '30'  │ '-347.00' │ '0.77'        │ '697.50' │ 0        │ '-347.00'               │
└─────────┴─────┴────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 34 trades to trades_mnq_fvgo_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous 1-hour candle continuation - MNQ, 1-min (watch row 0: his rules, 2R + break-even at 1.5R) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x7.56 by typical first-15-min range 147.5 pts vs MES 19.5 pts: HA 60.5 pts, ORB 90.75 pts
Data: MNQ=F (6826 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-20 (NY time), 52 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 40     │ '43'  │ '1039.50' │ '1.56'        │ '350.00' │ 0        │ '1039.50'               │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 40     │ '43'  │ '869.50'  │ '1.43'        │ '350.00' │ 0        │ '869.50'                │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 40     │ '48'  │ '565.50'  │ '1.31'        │ '370.00' │ 0        │ '565.50'                │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 75     │ '40'  │ '1458.50' │ '1.43'        │ '711.00' │ 0        │ '1458.50'               │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 195 trades to trades_mnq_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Confirmation tracks (same locked versions, other market)

## ORB on MNQ (watch row 4: R:R 2, 15-min range)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Opening Range Breakout, 1m bars
Max stop scaled x7.56 by typical first-15-min range 147.5 pts vs MES 19.5 pts: HA 60.5 pts, ORB 90.75 pts
Data: MNQ=F (1 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-20 (NY time), 52 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (31 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 12     │ '42'  │ '-399.00' │ '0.63'        │ '579.50' │ 0        │ '-399.00'               │
│ 1       │ 1   │ '30-min range' │ 7      │ '43'  │ '-201.50' │ '0.67'        │ '451.00' │ 0        │ '-201.50'               │
│ 2       │ 1.5 │ '15-min range' │ 12     │ '42'  │ '-221.50' │ '0.79'        │ '579.50' │ 0        │ '-221.50'               │
│ 3       │ 1.5 │ '30-min range' │ 7      │ '43'  │ '-155.00' │ '0.75'        │ '444.00' │ 0        │ '-155.00'               │
│ 4       │ 2   │ '15-min range' │ 12     │ '33'  │ '-239.50' │ '0.80'        │ '579.50' │ 0        │ '-239.50'               │
│ 5       │ 2   │ '30-min range' │ 7      │ '43'  │ '-14.50'  │ '0.98'        │ '444.00' │ 0        │ '-14.50'                │
└─────────┴─────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 57 trades to trades_mnq_orb_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Supply & demand on MES (watch row 1: R:R 2, 30-min chart)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Supply & demand zones (200 EMA), 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-20 (NY time), 81 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 4      │ '25'  │ '570.75'  │ '5.67'        │ '74.00'  │ 0        │ '570.75'                │
│ 1       │ 2      │ '30-min chart' │ 4      │ '25'  │ '783.25'  │ '7.41'        │ '74.00'  │ 0        │ '783.25'                │
│ 2       │ 3      │ '30-min chart' │ 4      │ '25'  │ '783.25'  │ '7.41'        │ '74.00'  │ 0        │ '783.25'                │
│ 3       │ 'push' │ '15-min chart' │ 9      │ '11'  │ '-96.75'  │ '0.76'        │ '398.50' │ 0        │ '-96.75'                │
│ 4       │ 2      │ '15-min chart' │ 9      │ '11'  │ '-291.75' │ '0.27'        │ '398.50' │ 0        │ '-291.75'               │
│ 5       │ 3      │ '15-min chart' │ 9      │ '11'  │ '-291.75' │ '0.27'        │ '398.50' │ 0        │ '-291.75'               │
│ 6       │ 'push' │ '5-min chart'  │ 41     │ '32'  │ '935.50'  │ '2.07'        │ '229.75' │ 0        │ '935.50'                │
│ 7       │ 2      │ '5-min chart'  │ 41     │ '37'  │ '1119.25' │ '2.36'        │ '271.00' │ 0        │ '1119.25'               │
│ 8       │ 3      │ '5-min chart'  │ 41     │ '32'  │ '1216.75' │ '2.38'        │ '278.00' │ 0        │ '1216.75'               │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 162 trades to trades_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep on MNQ (watch row 4: sweep, R:R 1.5)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.27 by typical first-15-min range 146.8 pts vs MES 17.8 pts: HA 66.25 pts, ORB 99.25 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-20 (NY time), 81 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬───────────┬───────────────┬───────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $  │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼───────────┼───────────────┼───────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 24     │ '50'  │ '1435.00' │ '1.64'        │ '952.00'  │ 0        │ '1435.00'               │
│ 1       │ 2   │ 'breakout' │ 24     │ '46'  │ '1483.00' │ '1.62'        │ '952.00'  │ 0        │ '1483.00'               │
│ 2       │ 1.5 │ 'retest'   │ 17     │ '41'  │ '11.50'   │ '1.01'        │ '886.50'  │ 0        │ '11.50'                 │
│ 3       │ 2   │ 'retest'   │ 17     │ '41'  │ '521.50'  │ '1.35'        │ '814.50'  │ 0        │ '521.50'                │
│ 4       │ 1.5 │ 'sweep'    │ 20     │ '45'  │ '-77.50'  │ '0.95'        │ '1018.50' │ 1        │ '28.00'                 │
│ 5       │ 2   │ 'sweep'    │ 20     │ '35'  │ '-328.50' │ '0.83'        │ '1176.50' │ 1        │ '-202.00'               │
└─────────┴─────┴────────────┴────────┴───────┴───────────┴───────────────┴───────────┴──────────┴─────────────────────────┘

Saved 122 trades to trades_mnq_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG day entry on MES (watch row 2: R:R 2)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-20 (NY time), 81 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 6      │ '0'   │ '-325.75' │ '0.00'        │ '325.75' │ 0        │ '-325.75'               │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 6      │ '17'  │ '-69.50'  │ '0.74'        │ '267.50' │ 0        │ '-69.50'                │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 13     │ '31'  │ '-393.50' │ '0.55'        │ '582.50' │ 0        │ '-393.50'               │
│ 3       │ 3   │ 'DAY: same, 3R'                                        │ 13     │ '31'  │ '-163.50' │ '0.81'        │ '500.00' │ 0        │ '-163.50'               │
└─────────┴─────┴────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 38 trades to trades_fvgo_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous 1-hour candle continuation on MES, 1-min (watch row 0: his rules)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (1 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-20 (NY time), 51 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 23     │ '26'  │ '-209.75' │ '0.67'        │ '427.00' │ 0        │ '-209.75'               │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 23     │ '26'  │ '-283.50' │ '0.60'        │ '456.75' │ 0        │ '-283.50'               │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 23     │ '35'  │ '-207.25' │ '0.67'        │ '427.00' │ 0        │ '-207.25'               │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 45     │ '33'  │ '-173.75' │ '0.85'        │ '391.75' │ 0        │ '-173.75'               │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 114 trades to trades_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Filter tracks (locked 2026-10-10, started 2026-10-12) - compare the watched filter row to the 'none' row

## ORB + 200 EMA trend + skip choppy - MES, 1-min (watch filter: ema+chop)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (1 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-20 (NY time), 51 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
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
Max stop scaled x7.56 by typical first-15-min range 147.5 pts vs MES 19.5 pts: HA 60.5 pts, ORB 90.75 pts
Data: MNQ=F (1 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-20 (NY time), 52 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
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
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-20 (NY time), 81 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 21     │ 100    │ '24'  │ '-635.75' │ '0.31'        │ '653.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 3      │ 14     │ '0'   │ '-276.00' │ '0.00'        │ '276.00' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 7      │ 33     │ '14'  │ '-225.25' │ '0.24'        │ '225.25' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 8      │ 38     │ '13'  │ '-597.25' │ '0.07'        │ '639.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 7      │ 33     │ '43'  │ '24.75'   │ '1.17'        │ '78.25'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 1      │ 5      │ '0'   │ '-78.25'  │ '0.00'        │ '78.25'  │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 2      │ 10     │ '0'   │ '-89.00'  │ '0.00'        │ '89.00'  │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 21     │ 100    │ '24'  │ '-635.75' │ '0.31'        │ '653.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MNQ (watch filter: vwap)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.27 by typical first-15-min range 146.8 pts vs MES 17.8 pts: HA 66.25 pts, ORB 99.25 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-20 (NY time), 81 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬───────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $  │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼───────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 20     │ 100    │ '45'  │ '-77.50'  │ '0.95'        │ '1018.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 2      │ 10     │ '50'  │ '-16.00'  │ '0.82'        │ '91.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 2      │ 10     │ '50'  │ '-130.50' │ '0.36'        │ '205.50'  │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 8      │ 40     │ '38'  │ '-194.50' │ '0.81'        │ '639.50'  │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 5      │ 25     │ '40'  │ '-52.00'  │ '0.86'        │ '379.00'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'    │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 5      │ '0'   │ '-205.50' │ '0.00'        │ '205.50'  │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 20     │ 100    │ '45'  │ '-77.50'  │ '0.95'        │ '1018.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴───────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MNQ, 1-min (watch filter: ema)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x7.56 by typical first-15-min range 147.5 pts vs MES 19.5 pts: HA 60.5 pts, ORB 90.75 pts
Data: MNQ=F (1 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-20 (NY time), 52 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 40     │ 100    │ '43'  │ '1039.50' │ '1.56'        │ '350.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 27     │ 68     │ '48'  │ '923.50'  │ '1.64'        │ '340.50' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 24     │ 60     │ '38'  │ '453.50'  │ '1.39'        │ '340.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 27     │ 68     │ '48'  │ '968.00'  │ '1.80'        │ '205.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 11     │ 28     │ '27'  │ '-73.50'  │ '0.88'        │ '222.00' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 8      │ 20     │ '38'  │ '24.00'   │ '1.05'        │ '168.00' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 9      │ 23     │ '22'  │ '-90.00'  │ '0.81'        │ '238.50' │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 37     │ 93     │ '43'  │ '1061.50' │ '1.61'        │ '328.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MES, 1-min (watch filter: ema)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (1 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-20 (NY time), 51 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 23     │ 100    │ '26'  │ '-209.75' │ '0.67'        │ '427.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 16     │ 70     │ '19'  │ '-213.25' │ '0.53'        │ '333.00' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 14     │ 61     │ '21'  │ '-188.00' │ '0.50'        │ '234.00' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 19     │ 83     │ '21'  │ '-269.25' │ '0.51'        │ '427.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 13     │ 57     │ '23'  │ '-261.00' │ '0.42'        │ '337.25' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 8      │ 35     │ '13'  │ '-203.50' │ '0.31'        │ '235.75' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 8      │ 35     │ '38'  │ '-61.00'  │ '0.76'        │ '137.25' │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 21     │ 91     │ '29'  │ '-153.25' │ '0.74'        │ '370.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

# $100 ETF tracks - fractional shares, $0 commission (locked 2026-10-23, started 2026-10-26). Net $ on a $100 account = % return

## 3AM-range sweep - QQQ (watch row 4: sweep, R:R 1.5)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.140 shares (fractional), $0.14 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.20 by typical first-15-min range 3.5 pts vs MES 17.8 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (913 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-20 (NY time), 80 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (20 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬────────────┬────────┬───────┬─────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $   │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼─────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 14     │ '36'  │ '-0.74' │ '0.78'        │ '1.92'   │ 0        │ '-0.74'                 │
│ 1       │ 2   │ 'breakout' │ 14     │ '36'  │ '0.14'  │ '1.04'        │ '1.70'   │ 0        │ '0.14'                  │
│ 2       │ 1.5 │ 'retest'   │ 12     │ '50'  │ '1.21'  │ '2.01'        │ '0.62'   │ 2        │ '1.42'                  │
│ 3       │ 2   │ 'retest'   │ 12     │ '50'  │ '2.02'  │ '2.68'        │ '0.52'   │ 2        │ '2.26'                  │
│ 4       │ 1.5 │ 'sweep'    │ 13     │ '31'  │ '-1.48' │ '0.38'        │ '2.06'   │ 0        │ '-1.48'                 │
│ 5       │ 2   │ 'sweep'    │ 13     │ '23'  │ '-1.95' │ '0.26'        │ '2.31'   │ 0        │ '-1.95'                 │
└─────────┴─────┴────────────┴────────┴───────┴─────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 78 trades to trades_qqq_ldn_5m_since_2026-10-26.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep - SPY (watch row 4: sweep, R:R 1.5)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.10 by typical first-15-min range 1.7 pts vs MES 17.8 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (898 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-20 (NY time), 80 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (20 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬────────────┬────────┬───────┬─────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $   │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼─────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 16     │ '56'  │ '1.40'  │ '2.04'        │ '0.65'   │ 0        │ '1.40'                  │
│ 1       │ 2   │ 'breakout' │ 16     │ '56'  │ '2.31'  │ '2.71'        │ '0.65'   │ 0        │ '2.31'                  │
│ 2       │ 1.5 │ 'retest'   │ 15     │ '33'  │ '-0.41' │ '0.73'        │ '0.83'   │ 0        │ '-0.41'                 │
│ 3       │ 2   │ 'retest'   │ 15     │ '20'  │ '-0.58' │ '0.66'        │ '0.87'   │ 0        │ '-0.58'                 │
│ 4       │ 1.5 │ 'sweep'    │ 11     │ '27'  │ '-1.01' │ '0.31'        │ '1.01'   │ 0        │ '-1.01'                 │
│ 5       │ 2   │ 'sweep'    │ 11     │ '18'  │ '-1.22' │ '0.23'        │ '1.22'   │ 0        │ '-1.22'                 │
└─────────┴─────┴────────────┴────────┴───────┴─────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 84 trades to trades_spy_ldn_5m_since_2026-10-26.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep + VWAP side - QQQ (watch filter: vwap)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.140 shares (fractional), $0.14 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.20 by typical first-15-min range 3.5 pts vs MES 17.8 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-20 (NY time), 80 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (20 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬─────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $   │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼─────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 13     │ 100    │ '31'  │ '-1.48' │ '0.38'        │ '2.06'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 5      │ 38     │ '60'  │ '0.18'  │ '1.33'        │ '0.54'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 5      │ 38     │ '20'  │ '-0.89' │ '0.30'        │ '1.07'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 4      │ 31     │ '50'  │ '-0.11' │ '0.75'        │ '0.44'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 3      │ 23     │ '67'  │ '0.11'  │ '1.48'        │ '0.22'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 13     │ 100    │ '31'  │ '-1.48' │ '0.38'        │ '2.06'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴─────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - SPY (watch filter: vwap)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.10 by typical first-15-min range 1.7 pts vs MES 17.8 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-20 (NY time), 80 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (20 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬─────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $   │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼─────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 11     │ 100    │ '27'  │ '-1.01' │ '0.31'        │ '1.01'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 2      │ 18     │ '50'  │ '-0.20' │ '0.33'        │ '0.30'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 4      │ 36     │ '25'  │ '-0.27' │ '0.40'        │ '0.30'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 4      │ 36     │ '0'   │ '-0.92' │ '0.00'        │ '0.92'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 6      │ 55     │ '33'  │ '-0.37' │ '0.43'        │ '0.38'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 2      │ 18     │ '50'  │ '-0.20' │ '0.33'        │ '0.30'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 3      │ 27     │ '0'   │ '-0.45' │ '0.00'        │ '0.45'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 11     │ 100    │ '27'  │ '-1.01' │ '0.31'        │ '1.01'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴─────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## ORB 15-min, 2R + trend & skip choppy - SPY, 5-min (watch filter: ema+chop)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: Opening Range Breakout, 5m bars
Max stop scaled x0.10 by typical first-15-min range 1.7 pts vs MES 17.8 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-20 (NY time), 80 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (20 trading days so far)
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

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.140 shares (fractional), $0.14 per $1 move
Strategy: Opening Range Breakout, 5m bars
Max stop scaled x0.20 by typical first-15-min range 3.5 pts vs MES 17.8 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-20 (NY time), 80 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (20 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬─────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $   │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼─────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 2      │ 100    │ '0'   │ '-0.57' │ '0.00'        │ '0.57'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 50     │ '0'   │ '-0.27' │ '0.00'        │ '0.27'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 50     │ '0'   │ '-0.27' │ '0.00'        │ '0.27'   │
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
Max stop scaled x0.10 by typical first-15-min range 1.7 pts vs MES 17.8 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-20 (NY time), 80 trading days
FORWARD TEST: only counting trades from 2026-11-09 on (10 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬───────────────────────────┬────────┬───────┬────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $  │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 4      │ '75'  │ '1.23' │ '16.01'       │ '0.08'   │ 0        │ '1.23'                  │
│ 1       │ 1.5 │ 'no trend filter'         │ 5      │ '60'  │ '0.51' │ '2.02'        │ '0.42'   │ 0        │ '0.51'                  │
│ 2       │ 2   │ 'with daily trend filter' │ 4      │ '75'  │ '1.67' │ '21.36'       │ '0.08'   │ 0        │ '1.67'                  │
│ 3       │ 2   │ 'no trend filter'         │ 5      │ '60'  │ '0.84' │ '2.70'        │ '0.42'   │ 0        │ '0.84'                  │
└─────────┴─────┴───────────────────────────┴────────┴───────┴────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 18 trades to trades_spy_pdh_5m_since_2026-11-09.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - QQQ (watch row 3: no trend filter, R:R 2)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.140 shares (fractional), $0.14 per $1 move
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Max stop scaled x0.20 by typical first-15-min range 3.5 pts vs MES 17.8 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-20 (NY time), 80 trading days
FORWARD TEST: only counting trades from 2026-11-09 on (10 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬───────────────────────────┬────────┬───────┬────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $  │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 1      │ '100' │ '0.30' │ 'inf'         │ '0.00'   │ 0        │ '0.30'                  │
│ 1       │ 1.5 │ 'no trend filter'         │ 2      │ '100' │ '0.68' │ 'inf'         │ '0.00'   │ 0        │ '0.68'                  │
│ 2       │ 2   │ 'with daily trend filter' │ 1      │ '100' │ '0.40' │ 'inf'         │ '0.00'   │ 0        │ '0.40'                  │
│ 3       │ 2   │ 'no trend filter'         │ 2      │ '100' │ '0.91' │ 'inf'         │ '0.00'   │ 0        │ '0.91'                  │
└─────────┴─────┴───────────────────────────┴────────┴───────┴────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 6 trades to trades_qqq_pdh_5m_since_2026-11-09.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Exit tracks (locked 2026-10-10, started 2026-10-12) - compare the watched exit row to the 'fixed' row

## First-candle FVG day entry + trailing stop - MNQ (watch exit: trail)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Max stop scaled x8.27 by typical first-15-min range 146.8 pts vs MES 17.8 pts: HA 66.25 pts, ORB 99.25 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-20 (NY time), 81 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 10     │ '30'  │ '-381.00' │ '0.75'        │ '697.50' │ '622.00'     │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 10     │ '30'  │ '-381.00' │ '0.75'        │ '697.50' │ '622.00'     │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 10     │ '30'  │ '-486.25' │ '0.68'        │ '678.75' │ '466.00'     │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 10     │ '30'  │ '-638.25' │ '0.58'        │ '677.00' │ '337.00'     │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 10     │ '30'  │ '-685.00' │ '0.55'        │ '694.00' │ '314.50'     │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 10     │ '30'  │ '-347.00' │ '0.77'        │ '697.50' │ '656.00'     │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

## First-candle FVG day entry + trailing stop - MES (watch exit: trail)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-20 (NY time), 81 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (30 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬────────────┬───────────────┬───────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $      │ Profit factor │ Max DD $  │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼────────────┼───────────────┼───────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 13     │ '31'  │ '-393.50'  │ '0.55'        │ '582.50'  │ '238.00'     │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 13     │ '23'  │ '-271.00'  │ '0.63'        │ '558.75'  │ '238.00'     │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 13     │ '46'  │ '-236.00'  │ '0.67'        │ '500.00'  │ '178.00'     │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 13     │ '38'  │ '-541.00'  │ '0.43'        │ '821.88'  │ '194.25'     │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 13     │ '31'  │ '-881.00'  │ '0.31'        │ '1202.50' │ '270.50'     │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 13     │ '23'  │ '-1027.25' │ '0.28'        │ '1298.75' │ '335.50'     │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴────────────┴───────────────┴───────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

_Pass rules (set in advance): 30+ trades, profit factor above 1.3, positive on BOTH markets._
