# MES forward test - 2026-10-09 9:34 PM ET

## Heikin Ashi pullback (watch row 0: R:R 1, start 09:30)
```
  (could not read bars_1m.json; starting fresh)

Market: MES (Micro E-mini S&P 500), $5 per point
Strategy: Heikin Ashi pullback, 1m bars
Data: MES=F (28396 new bars added to bars_1m.json)
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
