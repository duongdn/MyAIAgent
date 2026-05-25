---
name: feedback_aysar_jamie_ronan_room
description: Aysar daily report check = Baamboozle Slack MPDM (Carrick/Ronan/Jamie). Matrix is for sending reminders ONLY, never for checking reports.
metadata:
  type: feedback
---

**CORRECTED 2026-05-25** — Previous rule was WRONG. Do NOT check Matrix room `!gjtiuNjeqDarGWkSnf` for Aysar daily reports.

## Correct workflow

**Check for report:** Baamboozle Slack MPDM **`C07SQ4HAUHZ`** (`#mpdm-heyitsronanc--carrick--skjamie25-1`) — Carrick posts "Today's update" to Ronan + Jamie.

**Send reminder if missing:** Matrix room `!gjtiuNjeqDarGWkSnf:nustechnology.com` (internal NUS room: DuongDN/LeNH/KhanhHH).

**Why corrected:** AI checked the Matrix room, found it "silent since May 21", and sent an unnecessary reminder to KhanhHH. Carrick had already posted the Aysar update to the client Slack MPDM at 17:13 +07 on Fri May 22. KhanhHH is NOT a Baamboozle Slack member — Carrick posts on their behalf.

**General rule (user 2026-05-25):** Check **Slack** for daily reports. Send **Matrix** reminders only if no Slack report found.

**How to apply:**
1. Check task log sheet: who logged Aysar hours that day?
2. Check Baamboozle Slack MPDM `C07SQ4HAUHZ` for Carrick's "Today's update" covering that dev's work
3. If found → clear, complete Trello Aysar item
4. If NOT found → send reminder to Matrix room `!gjtiuNjeqDarGWkSnf:nustechnology.com`
