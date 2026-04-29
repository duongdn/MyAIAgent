---
name: Sheets subagent has missed task-log entries — verify directly
description: The Sheets subagent has incorrectly reported 0h for devs who actually had hours logged. Always verify suspicious 0h findings directly before flagging.
type: feedback
---

The general-purpose subagent that runs the `/daily-report sheets` piece has a recurring bug: it scans rows but misses entries where the date row's day-total column shows 0 even though task rows below have owners + hours. It also misattributes rows where the owner column has the wrong dev name.

**Why:** On 2026-04-29 the agent reported these 4 devs as 0h alerts: LongVV, TuanNT, KhanhHH, LeNH. Direct re-check of the sheets revealed:
- TuanNT had **8h** in John Yi W21 R20 (`move homepage prod, update feedback, handle AM method edit data`)
- KhanhHH had **8h** in Generator W38 R20-R24 (5 rows with 1 + 2.17 + 1.5 + 2 + 1.33 across Trello-linked tasks)
- LeNH actually had **4h** on Rebecca W22 R20 (`Testing Stripe payment`) — even though Rory/Franc/Aysar sheets were empty
- LongVV genuinely 0h on both Maddy + James Diamond (the 8h on James Diamond was PhucVT's, not LongVV's)

So the subagent missed half the alerts and falsely flagged 3 of 4 devs. False alerts triggered Matrix reminders to TuanNT (already sent — can't unsend) and KhanhHH (the user provided KhanhHH's room precisely so the reminder could be sent — but in fact KhanhHH did have 8h logged). Trello items John Yi / Elliott / Rebecca were all wrongly skipped.

**How to apply:**
- Treat the Sheets subagent's 0h findings as suspicious. Before sending Matrix reminders or skipping Trello items based on a 0h flag, run a direct verification pass with `googleapiclient.discovery.build` on the parent agent that prints each "Tue 28/04" date row + the next 20 rows with their Owner + hours. That scan is fast and definitive.
- Especially watch for sheets where the day-total H column reads 0 but task rows still have owners + numeric hours — that's the failure pattern.
- The owner column in shared sheets (Bailey, Rebecca) often holds names other than the dev whose name is on the sheet — never assume "TuanNT's Rebecca sheet" means "TuanNT's hours". Always read the Owner column.
