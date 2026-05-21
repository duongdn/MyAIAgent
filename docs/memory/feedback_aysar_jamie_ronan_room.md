---
name: feedback_aysar_jamie_ronan_room
description: Aysar Trello check — also check Matrix room "Jamie, Ronan" for daily reports; no report when tasks exist = remind in that room
metadata:
  type: feedback
---

When checking Aysar (Trello checklist), also check the Matrix room **"Jamie, Ronan"**:
- Room: `!gjtiuNjeqDarGWkSnf:nustechnology.com`
- URL: https://chat.nustechnology.com/#/room/!gjtiuNjeqDarGWkSnf:nustechnology.com

**Rule:** If the dev had tasks on a given day, they MUST post a daily report in this room by evening that day OR by next morning. If missing → send a reminder to the room.

**Why:** User instructed 2026-05-21 — Aysar monitoring should include checking this project-specific Matrix room for daily reports, not just Baamboozle Slack.

**How to apply:**
1. During Aysar daily report check (`/daily-report trello progress aysar` or full run), fetch recent messages from `!gjtiuNjeqDarGWkSnf:nustechnology.com`
2. If the dev had active tasks that day (per task log / Baamboozle Slack), verify a daily report message was posted in this room
3. If no daily report found and tasks existed → send reminder to the room
4. Missing daily report in this room = alert → do NOT complete Trello Aysar item
