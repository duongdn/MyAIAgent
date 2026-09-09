---
name: feedback_bailey_matrix_daily_report_gate
description: "CORRECTED 2026-09-09 — Matrix room 'NUS - Bailey - Paturevision 2026' is an INTERNAL team room, NOT the customer-facing channel. Nick's daily report to the customer lives in GGS Slack (#maintenance or similar) — same as the existing slack ggs gate. Do not gate Bailey on this Matrix room."
metadata:
  type: feedback
---

🔴 **This memory was WRONG from 2026-09-08 to 2026-09-09 — corrected after user pushback.** Original version claimed Nick's customer-facing daily report should be checked in Matrix room `!MaisjkNOhxoXkhCxqa:nustechnology.com` ("NUS - Bailey - Paturevision 2026"). That's backwards: this Matrix room is an **internal team room** (DuongDN/datnc/tuannt discussing bugs, reminding each other about the report *rule*) — it is not itself the customer-facing communication channel. User confirmed directly: "daily report là đang nói cho khách hàng, lien quan gì Matrix, tương tự Aysar, James Diamond" — i.e. the customer-facing daily report lives in the actual client-facing Slack/Discord/etc. channel, the same pattern as Aysar (Baamboozle MPDM) and James Diamond (Discord airagri), never a Matrix room.

**What actually happened 2026-09-08/09:** datnc's Matrix message ("sao e không thấy daily report của Nick cho khách") was internal team chatter flagging concern, NOT evidence the report was missing. Verified 2026-09-09: Nick's daily report to the customer DID exist, posted in GGS Slack channel `C01B4FX724V` at 2026-09-08 17:20 (`https://globalgrazingservices.slack.com/archives/C01B4FX724V/p1788862819762749`) — a detailed bulleted task/bug report. This is the SAME channel already covered by the existing `slack ggs` gate (see the main daily-report.md workspace table, "Nick daily report in #maintenance"). The Matrix "still missing" alert reported on 2026-09-08 and again 2026-09-09 was a false alarm caused by checking the wrong channel entirely.

**How to apply going forward:** Bailey's daily-report gate is `slack ggs` (GGS Slack, look for Nick's report) + `sheets tuannt` (Workstream/Sheets hours) — as it was BEFORE 2026-09-08. Do NOT add a separate Matrix-room check for this. If a similar "customer report missing" concern surfaces in an internal Matrix room again, treat it as a prompt to re-verify the REAL customer channel (Slack/Discord/etc. per that project's established gate), not as its own alert source.

See also [[reference_trello_gate_mapping]], [[feedback_aysar_consolidated]] (same customer-channel-only pattern for Aysar).
