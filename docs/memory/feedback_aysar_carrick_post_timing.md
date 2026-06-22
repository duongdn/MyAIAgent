---
name: feedback_aysar_carrick_post_timing
description: Carrick's Baamboozle MPDM "Today's update" (Aysar gate) typically posts ~10:00-10:30+07, not early morning — don't flag absent before then
metadata:
  type: feedback
---

The Aysar gate (Baamboozle Slack MPDM `C07SQ4HAUHZ`, per [[feedback_aysar_jamie_ronan_room]]) requires Carrick's "Today's update" message covering that day's Aysar work. When the daily report runs early (~08:30-08:45+07), this update is frequently not posted yet.

**Why:** 2026-06-22 — checked at 08:40+07, found Carrick's last update was Thu Jun18 (Monday's hadn't landed). Pattern observed across recent days: Carrick posts once per workday, typically 10:00-10:30+07, not at report-run time (early morning).

**How to apply:**
- If the Aysar MPDM check at ~08:30-09:00+07 shows no update for today yet, do NOT flag "Aysar absent" as a hard alert — note "not yet posted, expected ~10:00-10:30, recheck later" and leave the Trello item incomplete pending recheck (use `/me:daily-report recheck aysar` or similar after 10:30).
- Same caution pattern as [[feedback_fountain_monday_plan_timing]] (Fountain's Monday plan posts 08:30-09:30) — both are "too early to judge" situations, not real absences.
