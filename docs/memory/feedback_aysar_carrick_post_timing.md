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
- Same category of "too early to judge for today" as [[feedback_fountain_monday_plan_timing]] (Fountain's Monday plan posts 08:30-09:30).

## 🔴 Corrected again same day (10:10) — missing formatted message ≠ no work

On 2026-06-22, Fri Jun19 had no "Today's update:" message in the MPDM (a real gap from the usual daily pattern) — flagged as a genuine alert. But a raw `search.messages` pull of ALL Carrick activity in the Baamboozle workspace for that day showed: 09:59 deployed a fix + got PR #638 reviewed, 17:15 responded to Jamie's live bug report, 21:15 fixed it. Carrick was actively working on Aysar the entire day — he simply never got around to posting the end-of-day summary, likely because he was still firefighting the client's bug at 21:15.

**The Aysar gate is "did Carrick do/communicate Aysar work that day", not "did the exact 'Today's update:' bullet-list message get posted".** Before flagging Aysar absent because the formatted message is missing, always run a broader check: `search.messages?query=after:{day_before}` with NO format filter, scoped to the whole Baamboozle workspace (not just the MPDM channel), and look for ANY Carrick message/activity that day. Only flag a real alert if there's no substantive activity anywhere, not just because the specific ritual message is absent.
