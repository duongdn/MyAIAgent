---
name: Scrin.io fetch script returns Sunday on Monday — never label as Friday
description: scripts/scrin-fetch-yesterday.js hard-codes isYesterday:true. On Monday morning that returns SUNDAY (weekend), not Friday. Never label its output as Friday Scrin data on Monday runs.
type: feedback
---

`scripts/scrin-fetch-yesterday.js` always sends `isYesterday: true` to Scrin.io `GetReport`. The API returns the calendar day before the request day:
- Run Tue → returns Mon
- Run Mon → returns **Sunday** (weekend, typically ~0h), NOT Friday
- Run Sat → returns Fri

**Why:** On 2026-05-11 daily report (run Mon), the report flagged "TuanNT John Yi sheet 6h Fri vs Scrin tracked 1h 23m Fri (over-inflated 4h 37m)" as a MED alert. Trello "John Yi - Amazing Meds" was wrongly skipped on this basis. User pushed back 2026-05-12: "why you check Friday ????" — the 1h 23m was Sunday's tracker (or a misattributed earlier fetch), NEVER Friday's. Friday Scrin data was never actually retrieved that day.

**How to apply:**
1. On Monday daily report, do NOT use `scrin-fetch-yesterday.js` to compare against Friday sheet data. The number returned is Sunday's.
2. To check Friday Scrin retroactively, modify the script to accept a date param (Scrin API `GetReport` body supports `From` / `To` ISO date fields). Then call with `{ From: "2026-05-08T00:00:00", To: "2026-05-08T23:59:59" }` instead of `isYesterday`.
3. Until the script is extended:
   - On Mon mornings, EITHER skip Scrin entirely (note "Scrin Fri data not retrieved — script limitation") OR re-run the check on Saturday for Friday data (saturday's isYesterday=Fri works correctly).
   - Compare Scrin output's actual date stamps to the day you intend to report against — never silently relabel.
4. **Tue-Fri normal cadence:** isYesterday=true correctly returns the prior workday — comparison vs that day's sheet is valid (verified on 2026-05-12: Mon log 7h sheet vs Mon Scrin 7.02h tracker matched cleanly).

**Action item:** Extend `scrin-fetch-yesterday.js` (or create `scrin-fetch-date.js`) to accept `--date YYYY-MM-DD` arg → call API with explicit `From`/`To`. Until then, Mon Scrin Friday comparison is unsupported.
