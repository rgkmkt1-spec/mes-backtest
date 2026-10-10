# MES forward test - 2026-10-09 10:49 PM ET

## Heikin Ashi pullback (watch row 0: R:R 1, start 09:30)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Heikin Ashi pullback, 1m bars
Data: MES=F (4 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-09 (NY time), 21 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (1 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant       │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ 'start 09:30' │ 2      │ '0'   │ '-34.00' │ '0.00'        │ '34.00'  │ 0        │ '-34.00'                │
│ 1       │ 1   │ 'start 09:45' │ 2      │ '0'   │ '-34.00' │ '0.00'        │ '34.00'  │ 0        │ '-34.00'                │
│ 2       │ 1.5 │ 'start 09:30' │ 2      │ '0'   │ '-34.00' │ '0.00'        │ '34.00'  │ 0        │ '-34.00'                │
│ 3       │ 1.5 │ 'start 09:45' │ 2      │ '0'   │ '-34.00' │ '0.00'        │ '34.00'  │ 0        │ '-34.00'                │
│ 4       │ 2   │ 'start 09:30' │ 2      │ '0'   │ '-34.00' │ '0.00'        │ '34.00'  │ 0        │ '-34.00'                │
│ 5       │ 2   │ 'start 09:45' │ 2      │ '0'   │ '-34.00' │ '0.00'        │ '34.00'  │ 0        │ '-34.00'                │
└─────────┴─────┴───────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 12 trades to trades_ha_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Opening Range Breakout (watch row 4: R:R 2, 15-min range)
```

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Opening Range Breakout, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-10 to 2026-10-09 (NY time), 21 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (1 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬──────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $    │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼──────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 1      │ '100' │ '50.50'  │ 'inf'         │ '0.00'   │ 0        │ '50.50'                 │
│ 1       │ 1   │ '30-min range' │ 1      │ '100' │ '50.50'  │ 'inf'         │ '0.00'   │ 0        │ '50.50'                 │
│ 2       │ 1.5 │ '15-min range' │ 1      │ '100' │ '76.75'  │ 'inf'         │ '0.00'   │ 0        │ '76.75'                 │
│ 3       │ 1.5 │ '30-min range' │ 1      │ '100' │ '76.75'  │ 'inf'         │ '0.00'   │ 0        │ '76.75'                 │
│ 4       │ 2   │ '15-min range' │ 1      │ '100' │ '103.00' │ 'inf'         │ '0.00'   │ 0        │ '103.00'                │
│ 5       │ 2   │ '30-min range' │ 1      │ '100' │ '103.00' │ 'inf'         │ '0.00'   │ 0        │ '103.00'                │
└─────────┴─────┴────────────────┴────────┴───────┴──────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 6 trades to trades_orb_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Supply & demand zones - MNQ (watch row 1: R:R 2, 30-min chart) - started 2026-10-12
```

Market: MNQ (Micro E-mini Nasdaq-100), $2 per point
Strategy: Supply & demand zones (200 EMA), 5m bars
Max stop scaled x7.98 by typical first-15-min range 131.8 pts vs MES 16.5 pts: HA 64 pts, ORB 95.75 pts
Data: MNQ=F (0 new bars added to bars_mnq_5m.json)
      2026-07-30 to 2026-10-09 (NY time), 51 trading days
FORWARD TEST: only counting trades from 2026-10-12 on (0 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬────────┬────────────────┬────────┬───────┬────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R    │ Variant        │ Trades │ Win % │ Net $  │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼────────┼────────────────┼────────┼───────┼────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 'push' │ '30-min chart' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 1       │ 2      │ '30-min chart' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 2       │ 3      │ '30-min chart' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 3       │ 'push' │ '15-min chart' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 4       │ 2      │ '15-min chart' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 5       │ 3      │ '15-min chart' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 6       │ 'push' │ '5-min chart'  │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 7       │ 2      │ '5-min chart'  │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 8       │ 3      │ '5-min chart'  │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
└─────────┴────────┴────────────────┴────────┴───────┴────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 0 trades to trades_mnq_sd_5m_since_2026-10-12.csv
"Same-bar" = trades where one 5m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```
