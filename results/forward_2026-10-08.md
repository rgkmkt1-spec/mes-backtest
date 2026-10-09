# MES forward test - 2026-10-08 8:02 PM ET

## Heikin Ashi pullback (watch row 0: R:R 1, start 09:30)
```

Strategy: Heikin Ashi pullback, 1m bars
Data: MES=F (196 new bars added to bars_1m.json)
      2026-09-09 to 2026-10-08 (NY time), 21 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (0 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬───────────────┬────────┬───────┬────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant       │ Trades │ Win % │ Net $  │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼───────────────┼────────┼───────┼────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ 'start 09:30' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 1       │ 1   │ 'start 09:45' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 2       │ 1.5 │ 'start 09:30' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 3       │ 1.5 │ 'start 09:45' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 4       │ 2   │ 'start 09:30' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 5       │ 2   │ 'start 09:45' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
└─────────┴─────┴───────────────┴────────┴───────┴────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 0 trades to trades_ha_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```

## Opening Range Breakout (watch row 4: R:R 2, 15-min range)
```

Strategy: Opening Range Breakout, 1m bars
Data: MES=F (0 new bars added to bars_1m.json)
      2026-09-09 to 2026-10-08 (NY time), 21 trading days
FORWARD TEST: only counting trades from 2026-10-09 on (0 trading days so far)
Costs: $2 round-trip commission + 1 tick slippage on entries and stops

┌─────────┬─────┬────────────────┬────────┬───────┬────────┬───────────────┬──────────┬──────────┬─────────────────────────┐
│ (index) │ R:R │ Variant        │ Trades │ Win % │ Net $  │ Profit factor │ Max DD $ │ Same-bar │ Net $ if same-bar = win │
├─────────┼─────┼────────────────┼────────┼───────┼────────┼───────────────┼──────────┼──────────┼─────────────────────────┤
│ 0       │ 1   │ '15-min range' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 1       │ 1   │ '30-min range' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 2       │ 1.5 │ '15-min range' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 3       │ 1.5 │ '30-min range' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 4       │ 2   │ '15-min range' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
│ 5       │ 2   │ '30-min range' │ 0      │ '-'   │ '0.00' │ '0.00'        │ '0.00'   │ 0        │ '0.00'                  │
└─────────┴─────┴────────────────┴────────┴───────┴────────┴───────────────┴──────────┴──────────┴─────────────────────────┘

Saved 0 trades to trades_orb_1m_since_2026-10-09.csv
"Same-bar" = trades where one 1m candle touched BOTH stop and target. Counted as losses (worst case);
the last column shows the result if they had all been wins (best case). Truth is somewhere in between.

```
