---
name: feedback_aysar_jamie_ronan_room
description: Aysar Trello check — also check Matrix room "Jamie, Ronan" for daily reports; no report when tasks exist = remind in that room
metadata:
  type: feedback
---

When checking Aysar (Trello checklist), also check the Matrix room **"Jamie, Ronan"**:
- Room: `!gjtiuNjeqDarGWkSnf:nustechnology.com`
- URL: https://chat.nustechnology.com/#/room/!gjtiuNjeqDarGWkSnf:nustechnology.com

**Rule:** Whoever logged hours on Aysar that day MUST post a daily report in this room by evening that day OR by next morning. If missing → send a reminder to the room.

**Important:** Do NOT hardcode a specific dev (LeNH, KhanhHH, etc.) — any developer managed by the PM can be assigned to Aysar at any time. Devs move between projects easily. Check the Aysar task log sheet to see WHO actually logged hours that day, then verify that person posted a report.

**Why:** User instructed 2026-05-21 — Aysar monitoring should include checking this project-specific Matrix room for daily reports. Also clarified: "Aysar is working by LeNH and Aysar also, anyway maybe any developer I managed, dev can go and leave a certain project easily."

**How to apply:**
1. During Aysar daily report check (`/daily-report trello progress aysar` or full run), check the Aysar task log sheet for who logged hours that day
2. Fetch recent messages from `!gjtiuNjeqDarGWkSnf:nustechnology.com`
3. If any dev had hours on Aysar AND no daily report was posted in this room → flag as alert + send reminder to the room
4. Missing daily report in this room (when tasks exist) = alert → do NOT complete Trello Aysar item
