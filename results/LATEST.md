# MES forward test - 2026-11-07 1:49 PM ET

## Heikin Ashi pullback (watch row 0: R:R 1, start 09:30)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Heikin Ashi pullback, 1m bars
Data: MES=F (6 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-06 (NY time), 41 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (21 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ 'start 09:30' │ 28     │ '25'  │ '-293.50' │ '0.35'        │ '293.50' │ 2        │ '-248.50'               │
│ 1       │ 1   │ 'start 09:45' │ 27     │ '26'  │ '-246.50' │ '0.37'        │ '246.50' │ 2        │ '-201.50'               │
│ 2       │ 1.5 │ 'start 09:30' │ 27     │ '22'  │ '-267.75' │ '0.42'        │ '267.75' │ 1        │ '-262.75'               │
│ 3       │ 1.5 │ 'start 09:45' │ 27     │ '26'  │ '-179.00' │ '0.56'        │ '179.00' │ 2        │ '-160.25'               │
│ 4       │ 2   │ 'start 09:30' │ 25     │ '12'  │ '-388.75' │ '0.23'        │ '388.75' │ 1        │ '-383.75'               │
│ 5       │ 2   │ 'start 09:45' │ 25     │ '16'  │ '-288.75' │ '0.35'        │ '288.75' │ 2        │ '-267.50'               │
└─────────┴─────┴───────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 159 trades to trades_ha_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Opening Range Breakout (watch row 4: R:R 2, 15-min range)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-06 (NY time), 41 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (21 trading days so far)
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
Max stop scaled x8.31 by typical first-15-min range 139.3 pts vs MES 16.8 pts: HA 66.5 pts, ORB 99.75 pts
Data: MNQ=F (1 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 4      │ '50'  │ '1845.50' │ '7.29'        │ '293.50' │ 0        │ '1845.50'               │
│ 1       │ 2      │ '30-min chart' │ 4      │ '50'  │ '2339.50' │ '8.97'        │ '293.50' │ 0        │ '2339.50'               │
│ 2       │ 3      │ '30-min chart' │ 4      │ '50'  │ '2339.50' │ '8.97'        │ '293.50' │ 0        │ '2339.50'               │
│ 3       │ 'push' │ '15-min chart' │ 5      │ '20'  │ '-11.50'  │ '0.97'        │ '279.50' │ 0        │ '-11.50'                │
│ 4       │ 2      │ '15-min chart' │ 5      │ '20'  │ '-214.00' │ '0.40'        │ '279.50' │ 0        │ '-214.00'               │
│ 5       │ 3      │ '15-min chart' │ 5      │ '20'  │ '-143.00' │ '0.60'        │ '279.50' │ 0        │ '-143.00'               │
│ 6       │ 'push' │ '5-min chart'  │ 25     │ '28'  │ '194.50'  │ '1.12'        │ '641.00' │ 0        │ '194.50'                │
│ 7       │ 2      │ '5-min chart'  │ 25     │ '24'  │ '-694.00' │ '0.57'        │ '694.00' │ 0        │ '-694.00'               │
│ 8       │ 3      │ '5-min chart'  │ 25     │ '24'  │ '-330.00' │ '0.80'        │ '641.00' │ 0        │ '-330.00'               │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 102 trades to trades_mnq_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range liquidity sweep - MES (watch row 4: sweep, R:R 1.5) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (1 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 17     │ '35'  │ '-104.00' │ '0.84'        │ '467.50' │ 0        │ '-104.00'               │
│ 1       │ 2   │ 'breakout' │ 17     │ '35'  │ '81.00'   │ '1.12'        │ '440.00' │ 0        │ '81.00'                 │
│ 2       │ 1.5 │ 'retest'   │ 17     │ '24'  │ '-210.25' │ '0.55'        │ '315.75' │ 0        │ '-210.25'               │
│ 3       │ 2   │ 'retest'   │ 17     │ '12'  │ '-436.50' │ '0.25'        │ '446.75' │ 0        │ '-436.50'               │
│ 4       │ 1.5 │ 'sweep'    │ 15     │ '20'  │ '-362.50' │ '0.28'        │ '379.75' │ 2        │ '-281.25'               │
│ 5       │ 2   │ 'sweep'    │ 15     │ '20'  │ '-316.25' │ '0.37'        │ '353.00' │ 1        │ '-262.50'               │
└─────────┴─────┴────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 98 trades to trades_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MES (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
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
Max stop scaled x8.31 by typical first-15-min range 139.3 pts vs MES 16.8 pts: HA 66.5 pts, ORB 99.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
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
Max stop scaled x8.31 by typical first-15-min range 139.3 pts vs MES 16.8 pts: HA 66.5 pts, ORB 99.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 5      │ '20'  │ '-3.50'   │ '0.99'        │ '337.00' │ 0        │ '-3.50'                 │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 5      │ '20'  │ '-193.00' │ '0.66'        │ '337.00' │ 0        │ '-193.00'               │
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
Data: MNQ=F (6 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-06 (NY time), 42 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 26     │ '38'  │ '213.50' │ '1.16'        │ '350.00' │ 0        │ '213.50'                │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 26     │ '38'  │ '147.00' │ '1.10'        │ '350.00' │ 0        │ '147.00'                │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 26     │ '42'  │ '-81.50' │ '0.94'        │ '370.00' │ 0        │ '-81.50'                │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 52     │ '35'  │ '-3.50'  │ '1.00'        │ '711.00' │ 0        │ '-3.50'                 │
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
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-06 (NY time), 42 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (21 trading days so far)
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
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 3      │ '33'  │ '619.00'  │ '9.36'        │ '74.00'  │ 0        │ '619.00'                │
│ 1       │ 2      │ '30-min chart' │ 3      │ '33'  │ '831.50'  │ '12.24'       │ '74.00'  │ 0        │ '831.50'                │
│ 2       │ 3      │ '30-min chart' │ 3      │ '33'  │ '831.50'  │ '12.24'       │ '74.00'  │ 0        │ '831.50'                │
│ 3       │ 'push' │ '15-min chart' │ 5      │ '0'   │ '-271.25' │ '0.00'        │ '271.25' │ 0        │ '-271.25'               │
│ 4       │ 2      │ '15-min chart' │ 5      │ '0'   │ '-271.25' │ '0.00'        │ '271.25' │ 0        │ '-271.25'               │
│ 5       │ 3      │ '15-min chart' │ 5      │ '0'   │ '-271.25' │ '0.00'        │ '271.25' │ 0        │ '-271.25'               │
│ 6       │ 'push' │ '5-min chart'  │ 28     │ '25'  │ '589.00'  │ '1.98'        │ '229.75' │ 0        │ '589.00'                │
│ 7       │ 2      │ '5-min chart'  │ 28     │ '29'  │ '737.75'  │ '2.30'        │ '271.00' │ 0        │ '737.75'                │
│ 8       │ 3      │ '5-min chart'  │ 28     │ '29'  │ '852.75'  │ '2.51'        │ '278.00' │ 0        │ '852.75'                │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 108 trades to trades_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep on MNQ (watch row 4: sweep, R:R 1.5)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.31 by typical first-15-min range 139.3 pts vs MES 16.8 pts: HA 66.5 pts, ORB 99.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 15     │ '40'  │ '-98.50'  │ '0.94'        │ '952.00' │ 0        │ '-98.50'                │
│ 1       │ 2   │ 'breakout' │ 15     │ '33'  │ '-179.00' │ '0.89'        │ '952.00' │ 0        │ '-179.00'               │
│ 2       │ 1.5 │ 'retest'   │ 12     │ '33'  │ '-697.00' │ '0.42'        │ '886.50' │ 0        │ '-697.00'               │
│ 3       │ 2   │ 'retest'   │ 12     │ '33'  │ '-528.50' │ '0.56'        │ '814.50' │ 0        │ '-528.50'               │
│ 4       │ 1.5 │ 'sweep'    │ 13     │ '54'  │ '496.00'  │ '1.78'        │ '352.00' │ 0        │ '496.00'                │
│ 5       │ 2   │ 'sweep'    │ 13     │ '46'  │ '562.00'  │ '1.75'        │ '359.00' │ 0        │ '562.00'                │
└─────────┴─────┴────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 80 trades to trades_mnq_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG day entry on MES (watch row 2: R:R 2)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 5      │ '0'   │ '-267.50' │ '0.00'        │ '267.50' │ 0        │ '-267.50'               │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 5      │ '0'   │ '-267.50' │ '0.00'        │ '267.50' │ 0        │ '-267.50'               │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 10     │ '30'  │ '-377.50' │ '0.40'        │ '430.50' │ 0        │ '-377.50'               │
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
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-06 (NY time), 41 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 18     │ '17'  │ '-338.50' │ '0.41'        │ '427.00' │ 0        │ '-338.50'               │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 18     │ '17'  │ '-388.50' │ '0.38'        │ '456.75' │ 0        │ '-388.50'               │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 18     │ '22'  │ '-324.75' │ '0.43'        │ '427.00' │ 0        │ '-324.75'               │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 32     │ '31'  │ '-259.00' │ '0.69'        │ '305.25' │ 0        │ '-259.00'               │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 86 trades to trades_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Filter tracks (locked 2026-10-10, started 2026-10-12) - compare the watched filter row to the 'none' row

## ORB + 200 EMA trend + skip choppy - MES, 1-min (watch filter: ema+chop)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-06 (NY time), 41 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
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
Max stop scaled x8.00 by typical first-15-min range 132.0 pts vs MES 16.5 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-06 (NY time), 42 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
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
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 15     │ 100    │ '20'  │ '-362.50' │ '0.28'        │ '379.75' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 7      │ '0'   │ '-50.75'  │ '0.00'        │ '50.75'  │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 4      │ 27     │ '0'   │ '-150.50' │ '0.00'        │ '150.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 5      │ 33     │ '20'  │ '-260.00' │ '0.14'        │ '301.75' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 5      │ 33     │ '40'  │ '32.50'   │ '1.51'        │ '52.75'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 7      │ '0'   │ '-10.75'  │ '0.00'        │ '10.75'  │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 15     │ 100    │ '20'  │ '-362.50' │ '0.28'        │ '379.75' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MNQ (watch filter: vwap)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.31 by typical first-15-min range 139.3 pts vs MES 16.8 pts: HA 66.5 pts, ORB 99.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬──────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $    │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼──────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 13     │ 100    │ '54'  │ '496.00' │ '1.78'        │ '352.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 2      │ 15     │ '50'  │ '-16.00' │ '0.82'        │ '91.00'  │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 8      │ '100' │ '75.00'  │ 'inf'         │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 5      │ 38     │ '40'  │ '214.00' │ '1.59'        │ '191.50' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 8      │ '100' │ '113.00' │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 13     │ 100    │ '54'  │ '496.00' │ '1.78'        │ '352.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴──────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MNQ, 1-min (watch filter: ema)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x8.00 by typical first-15-min range 132.0 pts vs MES 16.5 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-11-06 (NY time), 42 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 26     │ 100    │ '38'  │ '213.50'  │ '1.16'        │ '350.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 18     │ 69     │ '44'  │ '439.00'  │ '1.46'        │ '302.50' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 15     │ 58     │ '40'  │ '504.50'  │ '1.96'        │ '235.00' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 18     │ 69     │ '44'  │ '571.50'  │ '1.70'        │ '195.50' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 6      │ 23     │ '17'  │ '-201.50' │ '0.43'        │ '218.00' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 4      │ 15     │ '25'  │ '-151.50' │ '0.50'        │ '168.00' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 4      │ 15     │ '0'   │ '-218.00' │ '0.00'        │ '218.00' │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 23     │ 88     │ '39'  │ '235.50'  │ '1.19'        │ '335.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MES, 1-min (watch filter: ema)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-11-06 (NY time), 41 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 18     │ 100    │ '17'  │ '-338.50' │ '0.41'        │ '427.00' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 14     │ 78     │ '21'  │ '-155.50' │ '0.61'        │ '333.00' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 10     │ 56     │ '10'  │ '-228.75' │ '0.28'        │ '234.00' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 16     │ 89     │ '19'  │ '-249.50' │ '0.49'        │ '427.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 10     │ 56     │ '10'  │ '-305.00' │ '0.23'        │ '337.25' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 7      │ 39     │ '14'  │ '-149.00' │ '0.38'        │ '181.25' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 5      │ 28     │ '20'  │ '-105.00' │ '0.46'        │ '137.25' │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 16     │ 89     │ '19'  │ '-282.00' │ '0.46'        │ '370.50' │
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
Data: QQQ (1 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-11-06 (NY time), 70 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (10 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬────────────┬────────┬───────┬─────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $   │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼─────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 5      │ '20'  │ '-0.98' │ '0.29'        │ '1.39'   │ 0        │ '-0.98'                 │
│ 1       │ 2   │ 'breakout' │ 5      │ '20'  │ '-0.85' │ '0.39'        │ '1.39'   │ 0        │ '-0.85'                 │
│ 2       │ 1.5 │ 'retest'   │ 6      │ '33'  │ '-0.62' │ '0.32'        │ '0.62'   │ 1        │ '-0.46'                 │
│ 3       │ 2   │ 'retest'   │ 6      │ '33'  │ '-0.52' │ '0.43'        │ '0.52'   │ 1        │ '-0.33'                 │
│ 4       │ 1.5 │ 'sweep'    │ 5      │ '40'  │ '-0.05' │ '0.87'        │ '0.24'   │ 0        │ '-0.05'                 │
│ 5       │ 2   │ 'sweep'    │ 5      │ '40'  │ '0.05'  │ '1.15'        │ '0.21'   │ 0        │ '0.05'                  │
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
Data: SPY (1 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-11-06 (NY time), 70 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (10 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬────────────┬────────┬───────┬─────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $   │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼─────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 7      │ '43'  │ '0.16'  │ '1.28'        │ '0.44'   │ 0        │ '0.16'                  │
│ 1       │ 2   │ 'breakout' │ 7      │ '43'  │ '0.40'  │ '1.71'        │ '0.44'   │ 0        │ '0.40'                  │
│ 2       │ 1.5 │ 'retest'   │ 9      │ '33'  │ '-0.17' │ '0.72'        │ '0.60'   │ 0        │ '-0.17'                 │
│ 3       │ 2   │ 'retest'   │ 9      │ '11'  │ '-0.56' │ '0.28'        │ '0.78'   │ 0        │ '-0.56'                 │
│ 4       │ 1.5 │ 'sweep'    │ 7      │ '14'  │ '-0.75' │ '0.12'        │ '0.75'   │ 0        │ '-0.75'                 │
│ 5       │ 2   │ 'sweep'    │ 7      │ '14'  │ '-0.72' │ '0.16'        │ '0.72'   │ 0        │ '-0.72'                 │
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
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 5      │ 100    │ '40'  │ '-0.05' │ '0.87'        │ '0.24'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 20     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 2      │ 40     │ '0'   │ '-0.20' │ '0.00'        │ '0.20'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 20     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 20     │ '100' │ '0.10'  │ 'inf'         │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 5      │ 100    │ '40'  │ '-0.05' │ '0.87'        │ '0.24'   │
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
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 3      │ 100    │ '0'   │ '-0.94' │ '0.00'        │ '0.94'   │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 33     │ '0'   │ '-0.26' │ '0.00'        │ '0.26'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 33     │ '0'   │ '-0.26' │ '0.00'        │ '0.26'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 3      │ 100    │ '0'   │ '-0.94' │ '0.00'        │ '0.94'   │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'  │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 3      │ 100    │ '0'   │ '-0.94' │ '0.00'        │ '0.94'   │
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
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
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
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-11-06 (NY time), 71 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (20 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬────────────┬───────────────┬───────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $      │ Profit factor │ Max DD $  │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼────────────┼───────────────┼───────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 10     │ '30'  │ '-377.50'  │ '0.40'        │ '430.50'  │ '163.00'     │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 10     │ '20'  │ '-353.75'  │ '0.38'        │ '406.75'  │ '163.00'     │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 10     │ '40'  │ '-308.75'  │ '0.45'        │ '348.00'  │ '121.75'     │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 10     │ '30'  │ '-643.75'  │ '0.19'        │ '669.88'  │ '78.63'      │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 10     │ '20'  │ '-1023.75' │ '0.08'        │ '1050.50' │ '66.75'      │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 10     │ '20'  │ '-1108.75' │ '0.06'        │ '1146.75' │ '38.00'      │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴────────────┴───────────────┴───────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

_Pass rules (set in advance): 30+ trades, profit factor above 1.3, positive on BOTH markets._
