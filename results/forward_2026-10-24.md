# MES forward test - 2026-10-24 1:28 PM ET

## Heikin Ashi pullback (watch row 0: R:R 1, start 09:30)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Heikin Ashi pullback, 1m bars
Data: MES=F (6830 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-23 (NY time), 31 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (11 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ 'start 09:30' │ 12     │ '8'   │ '-229.00' │ '0.04'        │ '229.00' │ 1        │ '-220.25'               │
│ 1       │ 1   │ 'start 09:45' │ 13     │ '15'  │ '-166.00' │ '0.14'        │ '166.00' │ 2        │ '-146.00'               │
│ 2       │ 1.5 │ 'start 09:30' │ 12     │ '8'   │ '-222.75' │ '0.07'        │ '222.75' │ 1        │ '-211.50'               │
│ 3       │ 1.5 │ 'start 09:45' │ 13     │ '15'  │ '-149.75' │ '0.22'        │ '149.75' │ 2        │ '-124.75'               │
│ 4       │ 2   │ 'start 09:30' │ 12     │ '8'   │ '-216.50' │ '0.09'        │ '216.50' │ 1        │ '-204.00'               │
│ 5       │ 2   │ 'start 09:45' │ 13     │ '15'  │ '-132.25' │ '0.31'        │ '132.25' │ 2        │ '-103.50'               │
└─────────┴─────┴───────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 75 trades to trades_ha_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Opening Range Breakout (watch row 4: R:R 2, 15-min range)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-23 (NY time), 31 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (11 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 7      │ '57'  │ '-9.00'   │ '0.95'        │ '126.75' │ 0        │ '-9.00'                 │
│ 1       │ 1   │ '30-min range' │ 5      │ '40'  │ '-80.00'  │ '0.53'        │ '130.50' │ 0        │ '-80.00'                │
│ 2       │ 1.5 │ '15-min range' │ 7      │ '14'  │ '-219.00' │ '0.26'        │ '295.75' │ 0        │ '-219.00'               │
│ 3       │ 1.5 │ '30-min range' │ 5      │ '20'  │ '-140.00' │ '0.35'        │ '216.75' │ 0        │ '-140.00'               │
│ 4       │ 2   │ '15-min range' │ 7      │ '14'  │ '-192.75' │ '0.35'        │ '295.75' │ 0        │ '-192.75'               │
│ 5       │ 2   │ '30-min range' │ 5      │ '20'  │ '-113.75' │ '0.48'        │ '216.75' │ 0        │ '-113.75'               │
└─────────┴─────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 36 trades to trades_orb_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Supply & demand zones - MNQ (watch row 1: R:R 2, 30-min chart) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Supply & demand zones (200 EMA), 5m bars
Max stop scaled x8.00 by typical first-15-min range 132.0 pts vs MES 16.5 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (1373 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-23 (NY time), 61 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 2      │ '0'   │ '-291.00' │ '0.00'        │ '291.00' │ 0        │ '-291.00'               │
│ 1       │ 2      │ '30-min chart' │ 2      │ '0'   │ '-291.00' │ '0.00'        │ '291.00' │ 0        │ '-291.00'               │
│ 2       │ 3      │ '30-min chart' │ 2      │ '0'   │ '-291.00' │ '0.00'        │ '291.00' │ 0        │ '-291.00'               │
│ 3       │ 'push' │ '15-min chart' │ 5      │ '20'  │ '-19.50'  │ '0.95'        │ '279.50' │ 0        │ '-19.50'                │
│ 4       │ 2      │ '15-min chart' │ 5      │ '20'  │ '-222.00' │ '0.39'        │ '279.50' │ 0        │ '-222.00'               │
│ 5       │ 3      │ '15-min chart' │ 5      │ '20'  │ '-151.00' │ '0.58'        │ '279.50' │ 0        │ '-151.00'               │
│ 6       │ 'push' │ '5-min chart'  │ 13     │ '15'  │ '-356.50' │ '0.52'        │ '550.50' │ 0        │ '-356.50'               │
│ 7       │ 2      │ '5-min chart'  │ 13     │ '8'   │ '-677.50' │ '0.13'        │ '677.50' │ 0        │ '-677.50'               │
│ 8       │ 3      │ '5-min chart'  │ 13     │ '8'   │ '-624.50' │ '0.20'        │ '624.50' │ 0        │ '-624.50'               │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 60 trades to trades_mnq_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range liquidity sweep - MES (watch row 4: sweep, R:R 1.5) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (1374 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-23 (NY time), 61 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 10     │ '30'  │ '-181.25' │ '0.56'        │ '280.25' │ 0        │ '-181.25'               │
│ 1       │ 2   │ 'breakout' │ 10     │ '30'  │ '-102.50' │ '0.75'        │ '252.75' │ 0        │ '-102.50'               │
│ 2       │ 1.5 │ 'retest'   │ 9      │ '22'  │ '-134.25' │ '0.39'        │ '134.25' │ 0        │ '-134.25'               │
│ 3       │ 2   │ 'retest'   │ 9      │ '11'  │ '-203.00' │ '0.21'        │ '210.75' │ 0        │ '-203.00'               │
│ 4       │ 1.5 │ 'sweep'    │ 8      │ '25'  │ '-63.50'  │ '0.61'        │ '80.75'  │ 2        │ '14.00'                 │
│ 5       │ 2   │ 'sweep'    │ 8      │ '25'  │ '-31.00'  │ '0.81'        │ '69.00'  │ 1        │ '22.75'                 │
└─────────┴─────┴────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 54 trades to trades_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MES (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-23 (NY time), 61 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 1      │ '100' │ '69.25'  │ 'inf'         │ '0.00'   │ 0        │ '69.25'                 │
│ 1       │ 1.5 │ 'no trend filter'         │ 5      │ '60'  │ '66.25'  │ '1.80'        │ '68.25'  │ 0        │ '66.25'                 │
│ 2       │ 2   │ 'with daily trend filter' │ 1      │ '100' │ '93.00'  │ 'inf'         │ '0.00'   │ 0        │ '93.00'                 │
│ 3       │ 2   │ 'no trend filter'         │ 5      │ '20'  │ '-52.50' │ '0.64'        │ '145.50' │ 0        │ '-52.50'                │
└─────────┴─────┴───────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 12 trades to trades_pdh_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous-day high/low retest - MNQ (watch row 3: no trend filter, R:R 2) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous-day high/low break & retest + daily 9/21 EMA trend, 5m bars
Max stop scaled x8.12 by typical first-15-min range 132.0 pts vs MES 16.3 pts: HA 65 pts, ORB 97.5 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-23 (NY time), 61 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                   │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'with daily trend filter' │ 2      │ '100' │ '374.50' │ 'inf'         │ '0.00'   │ 0        │ '374.50'                │
│ 1       │ 1.5 │ 'no trend filter'         │ 3      │ '100' │ '488.00' │ 'inf'         │ '0.00'   │ 0        │ '488.00'                │
│ 2       │ 2   │ 'with daily trend filter' │ 2      │ '100' │ '501.00' │ 'inf'         │ '0.00'   │ 0        │ '501.00'                │
│ 3       │ 2   │ 'no trend filter'         │ 3      │ '100' │ '653.00' │ 'inf'         │ '0.00'   │ 0        │ '653.00'                │
└─────────┴─────┴───────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 10 trades to trades_mnq_pdh_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG, day entry - MNQ (watch row 2: 15-min range, 5-min gap, limit, R:R 2) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Max stop scaled x8.12 by typical first-15-min range 132.0 pts vs MES 16.3 pts: HA 65 pts, ORB 97.5 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-23 (NY time), 61 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 5      │ '20'  │ '-5.00'   │ '0.99'        │ '338.50' │ 0        │ '-5.00'                 │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 5      │ '20'  │ '-194.50' │ '0.66'        │ '338.50' │ 0        │ '-194.50'               │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 3      │ '0'   │ '-619.00' │ '0.00'        │ '619.00' │ 0        │ '-619.00'               │
│ 3       │ 3   │ 'DAY: same, 3R'                                        │ 3      │ '0'   │ '-619.00' │ '0.00'        │ '619.00' │ 0        │ '-619.00'               │
└─────────┴─────┴────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 16 trades to trades_mnq_fvgo_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous 1-hour candle continuation - MNQ, 1-min (watch row 0: his rules, 2R + break-even at 1.5R) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x8.00 by typical first-15-min range 126.0 pts vs MES 15.8 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (6828 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-23 (NY time), 32 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 16     │ '38'  │ '12.00'  │ '1.02'        │ '351.50' │ 0        │ '12.00'                 │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 16     │ '38'  │ '-54.50' │ '0.93'        │ '351.50' │ 0        │ '-54.50'                │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 16     │ '44'  │ '-79.50' │ '0.89'        │ '351.50' │ 0        │ '-79.50'                │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 27     │ '41'  │ '49.50'  │ '1.04'        │ '471.00' │ 0        │ '49.50'                 │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 75 trades to trades_mnq_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Confirmation tracks (same locked versions, other market)

## ORB on MNQ (watch row 4: R:R 2, 15-min range)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Opening Range Breakout, 1m bars
Max stop scaled x8.00 by typical first-15-min range 126.0 pts vs MES 15.8 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-23 (NY time), 32 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (11 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 7      │ '29'  │ '-463.00' │ '0.40'        │ '628.00' │ 0        │ '-463.00'               │
│ 1       │ 1   │ '30-min range' │ 4      │ '25'  │ '-301.00' │ '0.32'        │ '443.50' │ 0        │ '-301.00'               │
│ 2       │ 1.5 │ '15-min range' │ 7      │ '29'  │ '-474.50' │ '0.38'        │ '723.00' │ 0        │ '-474.50'               │
│ 3       │ 1.5 │ '30-min range' │ 4      │ '25'  │ '-396.00' │ '0.11'        │ '443.50' │ 0        │ '-396.00'               │
│ 4       │ 2   │ '15-min range' │ 7      │ '29'  │ '-391.50' │ '0.49'        │ '723.00' │ 0        │ '-391.50'               │
│ 5       │ 2   │ '30-min range' │ 4      │ '25'  │ '-396.00' │ '0.11'        │ '443.50' │ 0        │ '-396.00'               │
└─────────┴─────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 33 trades to trades_mnq_orb_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Supply & demand on MES (watch row 1: R:R 2, 30-min chart)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Supply & demand zones (200 EMA), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-23 (NY time), 61 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 3      │ '0'   │ '-153.50' │ '0.00'        │ '153.50' │ 0        │ '-153.50'               │
│ 1       │ 2      │ '30-min chart' │ 3      │ '0'   │ '-153.50' │ '0.00'        │ '153.50' │ 0        │ '-153.50'               │
│ 2       │ 3      │ '30-min chart' │ 3      │ '0'   │ '-153.50' │ '0.00'        │ '153.50' │ 0        │ '-153.50'               │
│ 3       │ 'push' │ '15-min chart' │ 2      │ '0'   │ '-59.00'  │ '0.00'        │ '59.00'  │ 0        │ '-59.00'                │
│ 4       │ 2      │ '15-min chart' │ 2      │ '0'   │ '-59.00'  │ '0.00'        │ '59.00'  │ 0        │ '-59.00'                │
│ 5       │ 3      │ '15-min chart' │ 2      │ '0'   │ '-59.00'  │ '0.00'        │ '59.00'  │ 0        │ '-59.00'                │
│ 6       │ 'push' │ '5-min chart'  │ 18     │ '28'  │ '120.25'  │ '1.33'        │ '165.75' │ 0        │ '120.25'                │
│ 7       │ 2      │ '5-min chart'  │ 18     │ '28'  │ '-134.75' │ '0.63'        │ '186.75' │ 0        │ '-134.75'               │
│ 8       │ 3      │ '5-min chart'  │ 18     │ '28'  │ '-14.75'  │ '0.96'        │ '165.75' │ 0        │ '-14.75'                │
└─────────┴────────┴────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 69 trades to trades_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep on MNQ (watch row 4: sweep, R:R 1.5)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.12 by typical first-15-min range 132.0 pts vs MES 16.3 pts: HA 65 pts, ORB 97.5 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-23 (NY time), 61 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 8      │ '50'  │ '400.00' │ '1.64'        │ '288.50' │ 0        │ '400.00'                │
│ 1       │ 2   │ 'breakout' │ 8      │ '38'  │ '163.50' │ '1.22'        │ '418.00' │ 0        │ '163.50'                │
│ 2       │ 1.5 │ 'retest'   │ 5      │ '40'  │ '-25.50' │ '0.92'        │ '215.00' │ 0        │ '-25.50'                │
│ 3       │ 2   │ 'retest'   │ 5      │ '40'  │ '71.00'  │ '1.23'        │ '215.00' │ 0        │ '71.00'                 │
│ 4       │ 1.5 │ 'sweep'    │ 9      │ '67'  │ '637.00' │ '2.67'        │ '192.50' │ 0        │ '637.00'                │
│ 5       │ 2   │ 'sweep'    │ 9      │ '56'  │ '664.00' │ '2.36'        │ '192.50' │ 0        │ '664.00'                │
└─────────┴─────┴────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 44 trades to trades_mnq_ldn_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## First-candle FVG day entry on MES (watch row 2: R:R 2)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-23 (NY time), 61 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 3   │ 'SCALP: 5-min range, 1-min gap, engulf entry (his 3R)' │ 2      │ '0'   │ '-62.75'  │ '0.00'        │ '62.75'  │ 0        │ '-62.75'                │
│ 1       │ 2   │ 'SCALP: same, 2R'                                      │ 2      │ '0'   │ '-62.75'  │ '0.00'        │ '62.75'  │ 0        │ '-62.75'                │
│ 2       │ 2   │ 'DAY: 15-min range, 5-min gap, limit entry (his 2R)'   │ 4      │ '25'  │ '-198.00' │ '0.21'        │ '251.00' │ 0        │ '-198.00'               │
│ 3       │ 3   │ 'DAY: same, 3R'                                        │ 4      │ '25'  │ '-170.50' │ '0.32'        │ '251.00' │ 0        │ '-170.50'               │
└─────────┴─────┴────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 12 trades to trades_fvgo_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Previous 1-hour candle continuation on MES, 1-min (watch row 0: his rules)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-23 (NY time), 31 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────────────────────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant                                                       │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────────────────────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 2   │ '2R, break-even at 1.5R, current hour must agree (his rules)' │ 12     │ '17'  │ '-206.50' │ '0.43'        │ '277.25' │ 0        │ '-206.50'               │
│ 1       │ 2   │ '2R, no break-even move'                                      │ 12     │ '17'  │ '-206.50' │ '0.43'        │ '277.25' │ 0        │ '-206.50'               │
│ 2       │ 1.5 │ '1.5R, no break-even move'                                    │ 12     │ '17'  │ '-247.75' │ '0.32'        │ '277.25' │ 0        │ '-247.75'               │
│ 3       │ 2   │ '2R + break-even, no current-hour check'                      │ 18     │ '28'  │ '-129.75' │ '0.71'        │ '178.50' │ 0        │ '-129.75'               │
└─────────┴─────┴───────────────────────────────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 54 trades to trades_hr1_1m_since_2026-10-12.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

# Filter tracks (locked 2026-10-10, started 2026-10-12) - compare the watched filter row to the 'none' row

## ORB + 200 EMA trend + skip choppy - MES, 1-min (watch filter: ema+chop)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-23 (NY time), 31 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 6      │ 100    │ '0'   │ '-295.75' │ '0.00'        │ '295.75' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 4      │ 67     │ '0'   │ '-191.75' │ '0.00'        │ '191.75' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 6      │ 100    │ '0'   │ '-295.75' │ '0.00'        │ '295.75' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'    │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 6      │ 100    │ '0'   │ '-295.75' │ '0.00'        │ '295.75' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## ORB + 200 EMA trend + skip choppy - MNQ, 1-min (watch filter: ema+chop)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Opening Range Breakout, 1m bars
Max stop scaled x8.00 by typical first-15-min range 126.0 pts vs MES 15.8 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-23 (NY time), 32 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 15-min range (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 6      │ 100    │ '33'  │ '-203.50' │ '0.65'        │ '582.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 4      │ 67     │ '25'  │ '-365.50' │ '0.12'        │ '413.00' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 17     │ '100' │ '47.50'   │ 'inf'         │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 5      │ 83     │ '40'  │ '-72.00'  │ '0.84'        │ '451.00' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 2      │ 33     │ '100' │ '379.00'  │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 1      │ 17     │ '100' │ '47.50'   │ 'inf'         │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 1      │ 17     │ '100' │ '47.50'   │ 'inf'         │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 6      │ 100    │ '33'  │ '-203.50' │ '0.65'        │ '582.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MES (watch filter: vwap)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-23 (NY time), 61 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬──────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $    │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼──────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 8      │ 100    │ '25'  │ '-63.50' │ '0.61'        │ '80.75'  │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 13     │ '0'   │ '-50.75' │ '0.00'        │ '50.75'  │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 13     │ '0'   │ '-15.75' │ '0.00'        │ '15.75'  │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 2      │ 25     │ '50'  │ '-9.00'  │ '0.82'        │ '50.75'  │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 3      │ 38     │ '33'  │ '4.00'   │ '1.08'        │ '52.75'  │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 8      │ 100    │ '25'  │ '-63.50' │ '0.61'        │ '80.75'  │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴──────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## 3AM-range sweep + VWAP side - MNQ (watch filter: vwap)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x8.12 by typical first-15-min range 132.0 pts vs MES 16.3 pts: HA 65 pts, ORB 97.5 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-23 (NY time), 61 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: sweep (R:R 1.5)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬──────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $    │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼──────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 9      │ 100    │ '67'  │ '637.00' │ '2.67'        │ '192.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 1      │ 11     │ '100' │ '76.50'  │ 'inf'         │ '0.00'   │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 1      │ 11     │ '100' │ '76.50'  │ 'inf'         │ '0.00'   │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 3      │ 33     │ '67'  │ '384.00' │ '2.99'        │ '192.50' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 1      │ 11     │ '100' │ '111.50' │ 'inf'         │ '0.00'   │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 0      │ 0      │ '-'   │ '0.00'   │ '0.00'        │ '0.00'   │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 9      │ 100    │ '67'  │ '637.00' │ '2.67'        │ '192.50' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴──────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MNQ, 1-min (watch filter: ema)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Max stop scaled x8.00 by typical first-15-min range 126.0 pts vs MES 15.8 pts: HA 64 pts, ORB 96 pts
Data: MNQ=F (0 new bars added to bars_mnq_1m.json)
      2026-09-09 to 2026-10-23 (NY time), 32 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 16     │ 100    │ '38'  │ '12.00'   │ '1.02'        │ '351.50' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 11     │ 69     │ '36'  │ '-34.00'  │ '0.94'        │ '304.00' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 10     │ 63     │ '40'  │ '151.00'  │ '1.38'        │ '236.50' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 11     │ 69     │ '36'  │ '98.50'   │ '1.20'        │ '195.50' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 4      │ 25     │ '0'   │ '-219.50' │ '0.00'        │ '219.50' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 2      │ 13     │ '0'   │ '-169.50' │ '0.00'        │ '169.50' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 4      │ 25     │ '0'   │ '-219.50' │ '0.00'        │ '219.50' │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 13     │ 81     │ '38'  │ '35.50'   │ '1.06'        │ '250.00' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

## Previous 1-hour candle + 200 EMA trend - MES, 1-min (watch filter: ema)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Previous 1-hour candle bias + 1m counter-trend failure (lower high / higher low), break of swing, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-23 (NY time), 31 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Filter test on the forward-test row: 2R, break-even at 1.5R, current hour must agree (his rules) (R:R 2)

┌─────────┬───────────────┬───────────────────────────────────┬────────┬────────┬───────┬───────────┬───────────────┬──────────┐
│ (index) │ Filter        │ What                              │ Trades │ Kept % │ Win % │ Net $     │ Profit factor │ Max DD $ │
├─────────┼───────────────┼───────────────────────────────────┼────────┼────────┼───────┼───────────┼───────────────┼──────────┤
│ 0       │ 'none'        │ 'no filter (as forward-tested)'   │ 12     │ 100    │ '17'  │ '-206.50' │ '0.43'        │ '277.25' │
│ 1       │ 'ema'         │ '5-min 200 EMA trend'             │ 10     │ 83     │ '20'  │ '-148.75' │ '0.51'        │ '246.50' │
│ 2       │ 'struct'      │ '5-min swing structure trend'     │ 7      │ 58     │ '14'  │ '-134.00' │ '0.40'        │ '139.25' │
│ 3       │ 'vwap'        │ 'session VWAP side'               │ 11     │ 92     │ '18'  │ '-179.50' │ '0.46'        │ '277.25' │
│ 4       │ 'chop'        │ 'skip choppy (efficiency < 0.3)'  │ 7      │ 58     │ '14'  │ '-121.50' │ '0.43'        │ '153.75' │
│ 5       │ 'ema+chop'    │ '200 EMA trend + skip choppy'     │ 6      │ 50     │ '17'  │ '-90.75'  │ '0.50'        │ '123.00' │
│ 6       │ 'struct+chop' │ 'swing structure + skip choppy'   │ 4      │ 33     │ '25'  │ '-41.75'  │ '0.68'        │ '74.00'  │
│ 7       │ '2loss'       │ 'stop for the day after 2 losses' │ 10     │ 83     │ '20'  │ '-150.00' │ '0.51'        │ '220.75' │
└─────────┴───────────────┴───────────────────────────────────┴────────┴────────┴───────┴───────────┴───────────────┴──────────┘
A filter is only worth keeping if it improves profit factor on BOTH markets (and 1m + 5m where tested)
without cutting the trade count so far that the result is just luck.

```

# $100 ETF tracks - fractional shares, $0 commission (locked 2026-10-23, started 2026-10-26). Net $ on a $100 account = % return

## 3AM-range sweep - QQQ (watch row 4: sweep, R:R 1.5)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.139 shares (fractional), $0.14 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.20 by typical first-15-min range 3.2 pts vs MES 16.3 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (11274 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-10-23 (NY time), 60 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (0 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬────────────┬────────┬───────┬────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $  │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 1       │ 2   │ 'breakout' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 2       │ 1.5 │ 'retest'   │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 3       │ 2   │ 'retest'   │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 4       │ 1.5 │ 'sweep'    │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 5       │ 2   │ 'sweep'    │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
└─────────┴─────┴────────────┴────────┴───────┴────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 0 trades to trades_qqq_ldn_5m_since_2026-10-26.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep - SPY (watch row 4: sweep, R:R 1.5)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.10 by typical first-15-min range 1.6 pts vs MES 16.3 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (11101 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-10-23 (NY time), 60 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (0 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

┌─────────┬─────┬────────────┬────────┬───────┬────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant    │ Trades │ Win % │ Net $  │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────┼────────┼───────┼────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1.5 │ 'breakout' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 1       │ 2   │ 'breakout' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 2       │ 1.5 │ 'retest'   │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 3       │ 2   │ 'retest'   │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 4       │ 1.5 │ 'sweep'    │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 5       │ 2   │ 'sweep'    │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
└─────────┴─────┴────────────┴────────┴───────┴────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 0 trades to trades_spy_ldn_5m_since_2026-10-26.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## 3AM-range sweep + VWAP side - QQQ (watch filter: vwap)
```

Market: QQQ (Nasdaq-100 ETF), $100 account = 0.139 shares (fractional), $0.14 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.20 by typical first-15-min range 3.2 pts vs MES 16.3 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (0 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-10-23 (NY time), 60 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (0 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: sweep (R:R 1.5)

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

## 3AM-range sweep + VWAP side - SPY (watch filter: vwap)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: 3AM-9:30 range: breakout / retest / sweep (5-min), 5m bars
Max stop scaled x0.10 by typical first-15-min range 1.6 pts vs MES 16.3 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (0 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-10-23 (NY time), 60 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (0 trading days so far)
Costs: $0 commission + 1 cent slippage per share on entries and stops (all $ figures are for a $100 account)

Filter test on the forward-test row: sweep (R:R 1.5)

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

## ORB 15-min, 2R + trend & skip choppy - SPY, 5-min (watch filter: ema+chop)
```

Market: SPY (S&P 500 ETF), $100 account = 0.130 shares (fractional), $0.13 per $1 move
Strategy: Opening Range Breakout, 5m bars
Max stop scaled x0.10 by typical first-15-min range 1.6 pts vs MES 16.3 pts: HA 0.75 pts, ORB 1.25 pts
Data: SPY (0 new bars added to bars_spy_5m.json)
      2026-07-31 to 2026-10-23 (NY time), 60 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (0 trading days so far)
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
Max stop scaled x0.20 by typical first-15-min range 3.2 pts vs MES 16.3 pts: HA 1.5 pts, ORB 2.25 pts
Data: QQQ (0 new bars added to bars_qqq_5m.json)
      2026-07-31 to 2026-10-23 (NY time), 60 trading days
FORWARD TEST: only counting trades from 2026-10-26 on (0 trading days so far)
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

# Exit tracks (locked 2026-10-10, started 2026-10-12) - compare the watched exit row to the 'fixed' row

## First-candle FVG day entry + trailing stop - MNQ (watch exit: trail)
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Max stop scaled x8.12 by typical first-15-min range 132.0 pts vs MES 16.3 pts: HA 65 pts, ORB 97.5 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-23 (NY time), 61 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 3      │ '0'   │ '-619.00' │ '0.00'        │ '619.00' │ '-141.50'    │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 3      │ '0'   │ '-619.00' │ '0.00'        │ '619.00' │ '-141.50'    │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 3      │ '0'   │ '-619.00' │ '0.00'        │ '619.00' │ '-141.50'    │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 3      │ '0'   │ '-619.00' │ '0.00'        │ '619.00' │ '-141.50'    │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 3      │ '0'   │ '-619.00' │ '0.00'        │ '619.00' │ '-141.50'    │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 3      │ '0'   │ '-619.00' │ '0.00'        │ '619.00' │ '-141.50'    │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

## First-candle FVG day entry + trailing stop - MES (watch exit: trail)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: First-candle range break with a fair value gap, then gap retest (5m data), 5m bars
Data: MES=F (0 new bars added to bars_5m.json)
      2026-07-30 to 2026-10-23 (NY time), 61 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (10 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

Exit test on the forward-test row: DAY: 15-min range, 5-min gap, limit entry (his 2R) (R:R 2)

┌─────────┬──────────┬─────────────────────────────────────┬────────┬───────┬───────────┬───────────────┬──────────┬──────────────┐
│ (index) │ Exit     │ What                                │ Trades │ Win % │ Net $     │ Profit factor │ Max DD $ │ Best trade $ │
├─────────┼──────────┼─────────────────────────────────────┼────────┼───────┼───────────┼───────────────┼──────────┼──────────────┤
│ 0       │ 'fixed'  │ 'strategy exit (as forward-tested)' │ 4      │ '25'  │ '-198.00' │ '0.21'        │ '251.00' │ '53.00'      │
│ 1       │ 'be'     │ 'same target, break-even at +1R'    │ 4      │ '25'  │ '-143.00' │ '0.27'        │ '196.00' │ '53.00'      │
│ 2       │ 'trim'   │ 'half off at +1R, rest to target'   │ 4      │ '50'  │ '-103.63' │ '0.46'        │ '142.88' │ '49.88'      │
│ 3       │ 'runner' │ 'half off at +1R, rest trails 1R'   │ 4      │ '50'  │ '-115.50' │ '0.40'        │ '141.63' │ '51.13'      │
│ 4       │ 'trail'  │ 'no target, trail 1R after +1R'     │ 4      │ '25'  │ '-166.75' │ '0.14'        │ '193.50' │ '26.75'      │
│ 5       │ 'hold'   │ 'no target, hold to end of day'     │ 4      │ '25'  │ '-213.00' │ '0.15'        │ '251.00' │ '38.00'      │
└─────────┴──────────┴─────────────────────────────────────┴────────┴───────┴───────────┴───────────────┴──────────┴──────────────┘
An exit is only worth switching to if it beats the strategy exit on BOTH markets (and 1m + 5m where tested).

```

_Pass rules (set in advance): 30+ trades, profit factor above 1.3, positive on BOTH markets._
