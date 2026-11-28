# MES forward test - 2026-11-27 10:58 PM ET

## Heikin Ashi pullback (watch row 0: R:R 1, start 09:30)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Heikin Ashi pullback, 1m bars
Data: MES=F (4657 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-27 (NY time), 55 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (35 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ 'start 09:30' │ 44     │ '32'  │ '-378.00' │ '0.46'        │ '406.00' │ 4        │ '-275.50'               │
│ 1       │ 1   │ 'start 09:45' │ 41     │ '32'  │ '-320.75' │ '0.48'        │ '359.00' │ 3        │ '-269.50'               │
│ 2       │ 1.5 │ 'start 09:30' │ 43     │ '28'  │ '-301.00' │ '0.59'        │ '384.75' │ 2        │ '-288.50'               │
│ 3       │ 1.5 │ 'start 09:45' │ 41     │ '29'  │ '-214.50' │ '0.67'        │ '327.75' │ 3        │ '-188.25'               │
│ 4       │ 2   │ 'start 09:30' │ 40     │ '15'  │ '-542.50' │ '0.37'        │ '600.50' │ 2        │ '-528.75'               │
│ 5       │ 2   │ 'start 09:45' │ 38     │ '18'  │ '-381.00' │ '0.48'        │ '439.00' │ 3        │ '-351.00'               │
└─────────┴─────┴───────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 247 trades to trades_ha_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Opening Range Breakout (watch row 4: R:R 2, 15-min range)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-27 (NY time), 55 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (35 trading days so far)
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
Max stop scaled x8.35 by typical first-15-min range 148.3 pts vs MES 17.8 pts: HA 66.75 pts, ORB 100.25 pts
Data: MNQ=F (937 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-27 (NY time), 85 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬────────────┬───────────────┬───────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $      │ Profit factor │ Max DD $  │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼────────────┼───────────────┼───────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 8      │ '38'  │ '1456.50'  │ '2.93'        │ '389.00'  │ 0        │ '1456.50'               │
│ 1       │ 2      │ '30-min chart' │ 8      │ '38'  │ '2161.50'  │ '3.86'        │ '350.50'  │ 0        │ '2161.50'               │
│ 2       │ 3      │ '30-min chart' │ 8      │ '38'  │ '1950.50'  │ '3.58'        │ '389.00'  │ 0        │ '1950.50'               │
│ 3       │ 'push' │ '15-min chart' │ 14     │ '43'  │ '1121.50'  │ '2.20'        │ '279.50'  │ 0        │ '1121.50'               │
│ 4       │ 2      │ '15-min chart' │ 14     │ '43'  │ '12.00'    │ '1.01'        │ '411.50'  │ 0        │ '12.00'                 │
│ 5       │ 3      │ '15-min chart' │ 14     │ '43'  │ '437.00'   │ '1.47'        │ '340.50'  │ 0        │ '437.00'                │
│ 6       │ 'push' │ '5-min chart'  │ 42     │ '29'  │ '270.00'   │ '1.09'        │ '1212.00' │ 0        │ '270.00'                │
│ 7       │ 2      │ '5-min chart'  │ 42     │ '26'  │ '-977.50'  │ '0.68'        │ '1279.00' │ 1        │ '-707.00'               │
│ 8       │ 3      │ '5-min chart'  │ 41     │ '22'  │ '-1056.00' │ '0.66'        │ '1367.00' │ 0        │ '-1056.00'              │
└─────────┴────────┴────────────────┴────────┴───────┴────────────┴───────────────┴───────────┴──────────┴─────────────────────────┘

Saved 191 trades to trades_mnq_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range liquidity sweep - MES (watch row 4: sweep, R:R 1.5) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (937 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-27 (NY time), 85 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬────────────┬───────────────┬───────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $      │ Profit factor │ Max DD $  │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼────────────┼───────────────┼───────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 26     │ '46'  │ '408.00'   │ '1.42'        │ '467.50'  │ 0        │ '408.00'                │
│ 1       │ 2   │ 'breakout' │ 26     │ '46'  │ '875.50'   │ '1.90'        │ '440.00'  │ 0        │ '875.50'                │
│ 2       │ 1.5 │ 'retest'   │ 24     │ '33'  │ '-13.00'   │ '0.98'        │ '315.75'  │ 0        │ '-13.00'                │
│ 3       │ 2   │ 'retest'   │ 24     │ '25'  │ '-86.75'   │ '0.90'        │ '446.75'  │ 0        │ '-86.75'                │
│ 4       │ 1.5 │ 'sweep'    │ 23     │ '22'  │ '-1007.25' │ '0.22'        │ '1024.50' │ 2        │ '-926.00'               │
│ 5       │ 2   │ 'sweep'    │ 23     │ '17'  │ '-1059.75' │ '0.21'        │ '1096.50' │ 1        │ '-1006.00'              │
└─────────┴─────┴────────────┴────────┴───────┴────────────┴───────────────┴───────────┴──────────┴─────────────────────────┘

Saved 146 trades to trades_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MES (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-27 (NY time), 85 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 7      │ '71'  │ '462.25' │ '3.21'        │ '110.75' │ 0        │ '462.25'                │
│ 1       │ 1.5 │ 'no trend filter'         │ 15     │ '60'  │ '412.50' │ '1.76'        │ '252.75' │ 0        │ '412.50'                │
│ 2       │ 2   │ 'with daily trend filter' │ 7      │ '71'  │ '691.00' │ '4.31'        │ '110.75' │ 0        │ '691.00'                │
│ 3       │ 2   │ 'no trend filter'         │ 15     │ '47'  │ '575.00' │ '1.96'        │ '252.75' │ 0        │ '575.00'                │
└─────────┴─────┴───────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 44 trades to trades_pdh_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MNQ (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Max stop scaled x7.80 by typical first-15-min range 148.3 pts vs MES 19.0 pts: HA 62.5 pts, ORB 93.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-27 (NY time), 85 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 4      │ '75'  │ '386.00' │ '3.30'        │ '168.00' │ 0        │ '386.00'                │
│ 1       │ 1.5 │ 'no trend filter'         │ 9      │ '56'  │ '343.00' │ '1.61'        │ '469.50' │ 0        │ '343.00'                │
│ 2       │ 2   │ 'with daily trend filter' │ 4      │ '75'  │ '573.00' │ '4.41'        │ '168.00' │ 0        │ '573.00'                │
│ 3       │ 2   │ 'no trend filter'         │ 9      │ '56'  │ '649.00' │ '2.15'        │ '469.50' │ 0        │ '649.00'                │
└─────────┴─────┴───────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 26 trades to trades_mnq_pdh_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG, day entry - MNQ (watch row 2: 15-min range, 5-min gap, limit, R:R 2) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Max stop scaled x7.80 by typical first-15-min range 148.3 pts vs MES 19.0 pts: HA 62.5 pts, ORB 93.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-27 (NY time), 85 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬────────────┬───────────────┬───────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $      │ Profit factor │ Max DD $  │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼────────────┼───────────────┼───────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 8      │ '13'  │ '-731.50'  │ '0.44'        │ '1065.00' │ 0        │ '-731.50'               │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 8      │ '13'  │ '-921.00'  │ '0.29'        │ '1065.00' │ 0        │ '-921.00'               │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 12     │ '25'  │ '-1127.50' │ '0.50'        │ '1127.50' │ 0        │ '-1127.50'              │
│ 3       │ 3   │ 'DAY: same, 3R'                                        │ 12     │ '25'  │ '-1093.50' │ '0.52'        │ '1125.50' │ 0        │ '-1093.50'              │
└─────────┴─────┴────────────────────────────────────────────────────────┴────────┴───────┴────────────┴───────────────┴───────────┴──────────┴─────────────────────────┘

Saved 40 trades to trades_mnq_fvgo_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous 1-hour candle continuation - MNQ, 1-min (watch row 0: his rules, 2R + break-even at 1.5R) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x7.89 by typical first-15-min range 157.8 pts vs MES 20.0 pts: HA 63 pts, ORB 94.75 pts
Data: MNQ=F (4657 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-27 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 44     │ '41'  │ '991.50'  │ '1.47'        │ '462.50' │ 0        │ '991.50'                │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 44     │ '41'  │ '767.50'  │ '1.33'        │ '566.00' │ 0        │ '767.50'                │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 44     │ '48'  │ '542.00'  │ '1.26'        │ '498.50' │ 0        │ '542.00'                │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 80     │ '40'  │ '1586.50' │ '1.43'        │ '711.00' │ 0        │ '1586.50'               │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 212 trades to trades_mnq_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Confirmation tracks (same locked versions, other market)

## ORB on MNQ (watch row 4: R:R 2, 15-min range)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Opening Range Breakout, 1m bars
Max stop scaled x7.89 by typical first-15-min range 157.8 pts vs MES 20.0 pts: HA 63 pts, ORB 94.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-27 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (35 trading days so far)
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
      2026-07-30 to 2026-11-27 (NY time), 85 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 4      │ '25'  │ '570.75'  │ '5.67'        │ '74.00'  │ 0        │ '570.75'                │
│ 1       │ 2      │ '30-min chart' │ 4      │ '25'  │ '783.25'  │ '7.41'        │ '74.00'  │ 0        │ '783.25'                │
│ 2       │ 3      │ '30-min chart' │ 4      │ '25'  │ '783.25'  │ '7.41'        │ '74.00'  │ 0        │ '783.25'                │
│ 3       │ 'push' │ '15-min chart' │ 13     │ '8'   │ '-476.00' │ '0.39'        │ '476.00' │ 0        │ '-476.00'               │
│ 4       │ 2      │ '15-min chart' │ 13     │ '8'   │ '-671.00' │ '0.14'        │ '671.00' │ 0        │ '-671.00'               │
│ 5       │ 3      │ '15-min chart' │ 13     │ '8'   │ '-671.00' │ '0.14'        │ '671.00' │ 0        │ '-671.00'               │
│ 6       │ 'push' │ '5-min chart'  │ 49     │ '31'  │ '965.75'  │ '1.78'        │ '229.75' │ 0        │ '965.75'                │
│ 7       │ 2      │ '5-min chart'  │ 49     │ '33'  │ '827.00'  │ '1.62'        │ '292.25' │ 1        │ '884.50'                │
│ 8       │ 3      │ '5-min chart'  │ 49     │ '27'  │ '597.00'  │ '1.40'        │ '619.75' │ 1        │ '673.25'                │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 198 trades to trades_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep on MNQ (watch row 4: sweep, R:R 1.5)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x7.80 by typical first-15-min range 148.3 pts vs MES 19.0 pts: HA 62.5 pts, ORB 93.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-27 (NY time), 85 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬───────────┬───────────────┬───────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $  │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼───────────┼───────────────┼───────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 26     │ '46'  │ '771.00'  │ '1.26'        │ '952.00'  │ 0        │ '771.00'                │
│ 1       │ 2   │ 'breakout' │ 26     │ '42'  │ '819.00'  │ '1.27'        │ '952.00'  │ 0        │ '819.00'                │
│ 2       │ 1.5 │ 'retest'   │ 18     │ '44'  │ '187.00'  │ '1.12'        │ '886.50'  │ 0        │ '187.00'                │
│ 3       │ 2   │ 'retest'   │ 18     │ '44'  │ '756.50'  │ '1.50'        │ '814.50'  │ 0        │ '756.50'                │
│ 4       │ 1.5 │ 'sweep'    │ 23     │ '48'  │ '14.00'   │ '1.01'        │ '1144.50' │ 1        │ '119.50'                │
│ 5       │ 2   │ 'sweep'    │ 23     │ '39'  │ '-163.50' │ '0.92'        │ '1302.50' │ 1        │ '-37.00'                │
└─────────┴─────┴────────────┴────────┴───────┴───────────┴───────────────┴───────────┴──────────┴─────────────────────────┘

Saved 134 trades to trades_mnq_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG day entry on MES (watch row 2: R:R 2)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-27 (NY time), 85 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 7      │ '0'   │ '-476.50' │ '0.00'        │ '476.50' │ 0        │ '-476.50'               │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 7      │ '14'  │ '-220.25' │ '0.47'        │ '267.50' │ 0        │ '-220.25'               │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 15     │ '27'  │ '-628.75' │ '0.44'        │ '681.75' │ 0        │ '-628.75'               │
│ 3       │ 3   │ 'DAY: same, 3R'                                        │ 15     │ '27'  │ '-398.75' │ '0.64'        │ '500.00' │ 0        │ '-398.75'               │
└─────────┴─────┴────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 44 trades to trades_fvgo_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous 1-hour candle continuation on MES, 1-min (watch row 0: his rules)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-27 (NY time), 55 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 23     │ '26'  │ '-209.75' │ '0.67'        │ '427.00' │ 0        │ '-209.75'               │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 23     │ '26'  │ '-283.50' │ '0.60'        │ '456.75' │ 0        │ '-283.50'               │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 23     │ '35'  │ '-207.25' │ '0.67'        │ '427.00' │ 0        │ '-207.25'               │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 46     │ '35'  │ '-93.25'  │ '0.92'        │ '391.75' │ 0        │ '-93.25'                │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 115 trades to trades_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Filter tracks (locked 2026-10-10, started 2026-10-12) - compare the watched filter row to the 'none' row

## ORB + 200 EMA trend + skip choppy - MES, 1-min (watch filter: ema+chop)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-27 (NY time), 55 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
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
Max stop scaled x7.89 by typical first-15-min range 157.8 pts vs MES 20.0 pts: HA 63 pts, ORB 94.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-27 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
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
      2026-07-30 to 2026-11-27 (NY time), 85 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬────────────┬───────────────┬───────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $      │ Profit factor │ Max DD $  │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼────────────┼───────────────┼───────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 23     │ 100    │ '22'  │ '-1007.25' │ '0.22'        │ '1024.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 3      │ 13     │ '0'   │ '-276.00'  │ '0.00'        │ '276.00'  │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 7      │ 30     │ '14'  │ '-225.25'  │ '0.24'        │ '225.25'  │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 9      │ 39     │ '11'  │ '-925.50'  │ '0.04'        │ '967.25'  │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 9      │ 39     │ '33'  │ '-346.75'  │ '0.32'        │ '449.75'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 1      │ 4      │ '0'   │ '-78.25'   │ '0.00'        │ '78.25'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 2      │ 9      │ '0'   │ '-89.00'   │ '0.00'        │ '89.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 23     │ 100    │ '22'  │ '-1007.25' │ '0.22'        │ '1024.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴────────────┴───────────────┴───────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MNQ (watch filter: vwap)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x7.80 by typical first-15-min range 148.3 pts vs MES 19.0 pts: HA 62.5 pts, ORB 93.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-27 (NY time), 85 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬───────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $  │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼───────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 23     │ 100    │ '48'  │ '14.00'   │ '1.01'        │ '1144.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 2      │ 9      │ '50'  │ '-16.00'  │ '0.82'        │ '91.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 2      │ 9      │ '50'  │ '-130.50' │ '0.36'        │ '205.50'  │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 9      │ 39     │ '33'  │ '-320.50' │ '0.72'        │ '765.50'  │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 7      │ 30     │ '43'  │ '-135.00' │ '0.73'        │ '505.00'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'    │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 4      │ '0'   │ '-205.50' │ '0.00'        │ '205.50'  │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 23     │ 100    │ '48'  │ '14.00'   │ '1.01'        │ '1144.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴───────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MNQ, 1-min (watch filter: ema)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x7.89 by typical first-15-min range 157.8 pts vs MES 20.0 pts: HA 63 pts, ORB 94.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-27 (NY time), 56 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 44     │ 100    │ '41'  │ '991.50'  │ '1.47'        │ '462.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 30     │ 68     │ '47'  │ '984.00'  │ '1.61'        │ '504.50' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 27     │ 61     │ '37'  │ '408.00'  │ '1.28'        │ '613.00' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 30     │ 68     │ '47'  │ '1028.50' │ '1.74'        │ '291.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 12     │ 27     │ '33'  │ '153.50'  │ '1.25'        │ '222.00' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 9      │ 20     │ '44'  │ '251.00'  │ '1.48'        │ '168.00' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 10     │ 23     │ '30'  │ '137.00'  │ '1.28'        │ '238.50' │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 41     │ 93     │ '41'  │ '1013.50' │ '1.50'        │ '462.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MES, 1-min (watch filter: ema)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-27 (NY time), 55 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
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
Max stop scaled x0.19 by typical first-15-min range 3.6 pts vs MES 19.0 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (697 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-27 (NY time), 84 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (24 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬────────────┬────────┬───────┬─────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $   │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼─────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 15     │ '33'  │ '-1.30' │ '0.67'        │ '1.92'   │ 0        │ '-1.30'                 │
│ 1       │ 2   │ 'breakout' │ 15     │ '33'  │ '-0.43' │ '0.89'        │ '1.70'   │ 0        │ '-0.43'                 │
│ 2       │ 1.5 │ 'retest'   │ 13     │ '54'  │ '1.54'  │ '2.28'        │ '0.62'   │ 2        │ '1.74'                  │
│ 3       │ 2   │ 'retest'   │ 13     │ '54'  │ '2.45'  │ '3.04'        │ '0.52'   │ 2        │ '2.69'                  │
│ 4       │ 1.5 │ 'sweep'    │ 17     │ '41'  │ '-1.00' │ '0.64'        │ '2.06'   │ 0        │ '-1.00'                 │
│ 5       │ 2   │ 'sweep'    │ 17     │ '35'  │ '-1.18' │ '0.61'        │ '2.32'   │ 0        │ '-1.18'                 │
└─────────┴─────┴────────────┴────────┴───────┴─────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 90 trades to trades_qqq_ldn_5m_since_2026-10-26.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep - SPY (watch row 4: sweep, R:R 1.5)
```

Market: SPY (S&P 500 ETF), $100 account = 0.131 shares (fractional), $0.13 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.10 by typical first-15-min range 1.8 pts vs MES 19.0 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (683 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-27 (NY time), 84 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (24 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬────────────┬────────┬───────┬─────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $   │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼─────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 17     │ '53'  │ '1.40'  │ '2.03'        │ '0.65'   │ 0        │ '1.40'                  │
│ 1       │ 2   │ 'breakout' │ 17     │ '53'  │ '2.31'  │ '2.71'        │ '0.65'   │ 0        │ '2.31'                  │
│ 2       │ 1.5 │ 'retest'   │ 18     │ '39'  │ '-0.18' │ '0.90'        │ '0.83'   │ 0        │ '-0.18'                 │
│ 3       │ 2   │ 'retest'   │ 18     │ '22'  │ '-0.66' │ '0.68'        │ '0.99'   │ 0        │ '-0.66'                 │
│ 4       │ 1.5 │ 'sweep'    │ 13     │ '23'  │ '-1.91' │ '0.19'        │ '1.91'   │ 0        │ '-1.91'                 │
│ 5       │ 2   │ 'sweep'    │ 13     │ '15'  │ '-2.12' │ '0.15'        │ '2.12'   │ 0        │ '-2.12'                 │
└─────────┴─────┴────────────┴────────┴───────┴─────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 96 trades to trades_spy_ldn_5m_since_2026-10-26.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep + VWAP side - QQQ (watch filter: vwap)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.140 shares (fractional), $0.14 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.19 by typical first-15-min range 3.6 pts vs MES 19.0 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-27 (NY time), 84 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (24 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬─────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $   │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼─────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 17     │ 100    │ '41'  │ '-1.00' │ '0.64'        │ '2.06'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 5      │ 29     │ '60'  │ '0.18'  │ '1.33'        │ '0.54'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 5      │ 29     │ '20'  │ '-0.89' │ '0.30'        │ '1.07'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 6      │ 35     │ '50'  │ '-0.30' │ '0.64'        │ '0.81'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 3      │ 18     │ '67'  │ '0.11'  │ '1.48'        │ '0.22'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 17     │ 100    │ '41'  │ '-1.00' │ '0.64'        │ '2.06'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴─────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - SPY (watch filter: vwap)
```

Market: SPY (S&P 500 ETF), $100 account = 0.131 shares (fractional), $0.13 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.10 by typical first-15-min range 1.8 pts vs MES 19.0 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-27 (NY time), 84 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (24 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬─────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $   │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼─────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 13     │ 100    │ '23'  │ '-1.91' │ '0.19'        │ '1.91'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 2      │ 15     │ '50'  │ '-0.20' │ '0.33'        │ '0.30'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 5      │ 38     │ '20'  │ '-1.08' │ '0.14'        │ '1.12'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 5      │ 38     │ '0'   │ '-1.74' │ '0.00'        │ '1.74'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 8      │ 62     │ '25'  │ '-1.28' │ '0.18'        │ '1.29'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 2      │ 15     │ '50'  │ '-0.20' │ '0.33'        │ '0.30'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 4      │ 31     │ '0'   │ '-1.26' │ '0.00'        │ '1.26'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 13     │ 100    │ '23'  │ '-1.91' │ '0.19'        │ '1.91'   │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴─────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## ORB 15-min, 2R + trend & skip choppy - SPY, 5-min (watch filter: ema+chop)
```

Market: SPY (S&P 500 ETF), $100 account = 0.131 shares (fractional), $0.13 per $1 move
Strategy: Opening Range Breakout, 5m bars
Max stop scaled x0.10 by typical first-15-min range 1.8 pts vs MES 19.0 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-27 (NY time), 84 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (24 trading days so far)
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
Max stop scaled x0.19 by typical first-15-min range 3.6 pts vs MES 19.0 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-27 (NY time), 84 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (24 trading days so far)
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

Market: SPY (S&P 500 ETF), $100 account = 0.131 shares (fractional), $0.13 per $1 move
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Max stop scaled x0.10 by typical first-15-min range 1.8 pts vs MES 19.0 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-27 (NY time), 84 trading days
FORWARD TEST: only counting trades from 2026-11-09 on (14 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬───────────────────────────┬────────┬───────┬────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $  │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 5      │ '60'  │ '0.96' │ '3.68'        │ '0.28'   │ 0        │ '0.96'                  │
│ 1       │ 1.5 │ 'no trend filter'         │ 7      │ '57'  │ '0.77' │ '2.00'        │ '0.42'   │ 0        │ '0.77'                  │
│ 2       │ 2   │ 'with daily trend filter' │ 5      │ '60'  │ '1.40' │ '4.91'        │ '0.28'   │ 0        │ '1.40'                  │
│ 3       │ 2   │ 'no trend filter'         │ 7      │ '57'  │ '1.36' │ '2.75'        │ '0.42'   │ 0        │ '1.36'                  │
└─────────┴─────┴───────────────────────────┴────────┴───────┴────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 24 trades to trades_spy_pdh_5m_since_2026-11-09.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - QQQ (watch row 3: no trend filter, R:R 2)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.140 shares (fractional), $0.14 per $1 move
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Max stop scaled x0.19 by typical first-15-min range 3.6 pts vs MES 19.0 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-27 (NY time), 84 trading days
FORWARD TEST: only counting trades from 2026-11-09 on (14 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬───────────────────────────┬────────┬───────┬────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $  │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 2      │ '50'  │ '0.03' │ '1.11'        │ '0.27'   │ 0        │ '0.03'                  │
│ 1       │ 1.5 │ 'no trend filter'         │ 3      │ '67'  │ '0.41' │ '2.53'        │ '0.27'   │ 0        │ '0.41'                  │
│ 2       │ 2   │ 'with daily trend filter' │ 2      │ '50'  │ '0.13' │ '1.48'        │ '0.27'   │ 0        │ '0.13'                  │
│ 3       │ 2   │ 'no trend filter'         │ 3      │ '67'  │ '0.64' │ '3.37'        │ '0.27'   │ 0        │ '0.64'                  │
└─────────┴─────┴───────────────────────────┴────────┴───────┴────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 10 trades to trades_qqq_pdh_5m_since_2026-11-09.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Exit tracks (locked 2026-10-10, started 2026-10-12) - compare the watched exit row to the 'fixed' row

## First-candle FVG day entry + trailing stop - MNQ (watch exit: trail)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Max stop scaled x7.80 by typical first-15-min range 148.3 pts vs MES 19.0 pts: HA 62.5 pts, ORB 93.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-27 (NY time), 85 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬────────────┬───────────────┬───────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $      │ Profit factor │ Max DD $  │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼────────────┼───────────────┼───────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 12     │ '25'  │ '-1127.50' │ '0.50'        │ '1127.50' │ '622.00'     │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 12     │ '25'  │ '-928.00'  │ '0.55'        │ '928.00'  │ '622.00'     │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 12     │ '33'  │ '-933.25'  │ '0.55'        │ '933.25'  │ '466.00'     │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 12     │ '33'  │ '-1024.50' │ '0.50'        │ '1024.50' │ '337.00'     │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 12     │ '33'  │ '-1110.50' │ '0.46'        │ '1110.50' │ '314.50'     │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 12     │ '25'  │ '-1093.50' │ '0.52'        │ '1125.50' │ '656.00'     │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴────────────┴───────────────┴───────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

## First-candle FVG day entry + trailing stop - MES (watch exit: trail)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-27 (NY time), 85 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (34 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬────────────┬───────────────┬───────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $      │ Profit factor │ Max DD $  │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼────────────┼───────────────┼───────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 15     │ '27'  │ '-628.75'  │ '0.44'        │ '681.75'  │ '238.00'     │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 15     │ '20'  │ '-506.25'  │ '0.47'        │ '559.25'  │ '238.00'     │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 15     │ '40'  │ '-471.25'  │ '0.50'        │ '510.50'  │ '178.00'     │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 15     │ '33'  │ '-776.25'  │ '0.35'        │ '821.88'  │ '194.25'     │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 15     │ '27'  │ '-1116.25' │ '0.26'        │ '1202.50' │ '270.50'     │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 15     │ '20'  │ '-1262.50' │ '0.24'        │ '1300.50' │ '335.50'     │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴────────────┴───────────────┴───────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

_Pass rules (set in advance): 30+ trades, profit factor above 1.3, positive on BOTH markets._
