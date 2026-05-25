---
name: feedback_aysar_daily_report_slack
description: "Aysar/Baamboozle daily report check must use Baamboozle Slack, not Matrix. Matrix is only for sending reminders."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6fa6ad88-5dd9-402c-b81c-bd8529ed0af4
---

Aysar daily report check = **Baamboozle Slack MPDM** (Carrick + Ronan + Jamie: channel `C07SQ4HAUHZ` / `#mpdm-heyitsronanc--carrick--skjamie25-1`). Carrick posts the "Today's update" to the clients (Ronan and Jamie) covering KhanhHH's work.

**Why:** AI incorrectly checked the Matrix room `!gjtiuNjeqDarGWkSnf:nustechnology.com` (NUS-internal Aysar room with DuongDN/LeNH/KhanhHH only) and found it "silent since May 21" — then sent an unnecessary Matrix reminder to KhanhHH. Carrick had already posted the update at 17:13 +07 on the correct Slack channel.

**How to apply:**
- General rule: Check **Slack** for daily reports. Send **Matrix reminder** only if no report found in Slack.
- For Aysar/Baamboozle specifically: Check Baamboozle Slack MPDM `C07SQ4HAUHZ` for Carrick's "Today's update" message. That IS the Aysar daily report.
- KhanhHH is NOT a Baamboozle Slack member — Carrick posts on behalf.
- Matrix is only used to SEND reminders, never to CHECK for reports.
