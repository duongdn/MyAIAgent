---
name: feedback-lenh-consolidated
description: "LeNH: not Aysar sheet owner (KhanhHH is); 0h in one sheet ≠ alert if worked elsewhere; any combined shortfall (even 0.17h) = alert; Rory/Franc gate on Slack only, never LeNH hours"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9ba04ead-670b-45ea-b6a0-575e6d6d55b2
---

**Not Aysar sheet owner:** Aysar/Baamboozle sheet owner (col G) is **KhanhHH**, not LeNH. LeNH is the Upwork billing contractor for Aysar (sub-contract) but doesn't log hours there — never sum that sheet as "LeNH hours." *User confirmed 2026-06-09.* Scan ALL 11 sheets for LeNH via col G="LeNH", sum col H. No special columns (Rebecca sheet cols M-Q are sign-off confirmations, not hours — corrected 2026-06-22).

**0h in one sheet ≠ alert:** LeNH splits across 4 sheets (Rory/Franc/Aysar/Rebecca) but isn't on all of them every day. Determine where they actually worked via Upwork workroom hours (Rory=41069448, Aysar=35642393) as primary signal; only flag the specific sheet with tracked-but-unlogged hours. Same principle for TuanNT (combined 0h only) and LongVV (weekly total only). *Corrected 2026-04-23 and again 2026-05-29 after false alerts.*

**Any combined shortfall = real alert:** LeNH (and any 8h/day dev) below 8h with no leave note is an ALERT — even a 0.17h gap. Don't excuse as "rounding". Send Matrix reminder; Trello completion can stay but report must show ⚠️ + reminder line. *Corrected 2026-05-05 after a 7.83h gap was waved through as "OK".*

**Rory/Franc gate on Slack ONLY:** Per `reference_trello_gate_mapping.md`, Rory = Swift Studio Slack (Carrick activity) only; Franc = RDC Slack (dmetiner updates) only, also adhoc (see [[feedback_low_activity_devs_not_alert]]) — always complete unless dmetiner raises an issue. **LeNH's sheet hours never gate/block these two Trello items** — a LeNH shortfall only drives the personal reminder, not Rory/Franc completion. When the daily-report skill's quick-ref table conflicts with `reference_trello_gate_mapping.md`, trust the gate-mapping file. *Resolved 2026-06-22.*
