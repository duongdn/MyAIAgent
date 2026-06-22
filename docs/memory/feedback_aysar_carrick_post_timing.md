---
name: feedback_aysar_carrick_post_timing
description: "CORRECTED — Carrick's Baamboozle MPDM 'Today's update' (Aysar gate) posts ~17:00-17:45+07 (end of workday), NOT 10:00-10:30. Don't flag absent before ~17:00."
metadata:
  type: feedback
---

**CORRECTED 2026-06-22 09:38** — original version of this memory guessed Carrick posts ~10:00-10:30+07; that was wrong, never verified against real history. Confirmed via actual message timestamps in `C07SQ4HAUHZ`: Mon Jun15 17:09, Wed Jun17 17:45, Thu Jun18 17:14, Fri Jun12 17:08, Thu Jun11 17:29. **Carrick consistently posts end-of-workday, ~17:00-17:45+07**, not mid-morning.

The Aysar gate (Baamboozle Slack MPDM `C07SQ4HAUHZ`, per [[feedback_aysar_jamie_ronan_room]]) requires Carrick's "Today's update" message covering that day's Aysar work. When the daily report runs in the morning (~08:30-09:30+07), this update has NOT been posted yet for today — that is expected and not itself an alert.

**How to apply:**
- If checked before ~17:00+07, do NOT flag "Aysar absent" for TODAY's update — note "not yet posted, expected ~17:00-17:45, recheck end of day" and leave the Trello item incomplete pending a later recheck (run `/me:daily-report recheck aysar` after ~17:00).
- This does NOT excuse checking PRIOR days. If a previous workday (e.g. yesterday or Friday on a Monday run) has no update at all in the history — that IS a real gap worth flagging as a genuine alert (e.g. 2026-06-22: Fri Jun19 had no update, despite Mon-Thu all having one — flagged as real, possibly tied to Carrick being reported "out this week" elsewhere).
- Same category of "too early to judge for today" as [[feedback_fountain_monday_plan_timing]] (Fountain's Monday plan posts 08:30-09:30) — but always separately verify whether a PAST day's expected post is also missing, since that's a different (real) signal than "not yet posted today".
