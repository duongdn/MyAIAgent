---
name: feedback-scrin-consolidated
description: Scrin.io tracks Nick (nick@nustechnology.com) not TuanNT — never attribute hours; scrin-fetch-yesterday.js on Monday returns Sunday not Friday
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9ba04ead-670b-45ea-b6a0-575e6d6d55b2
---

**Wrong attribution:** Scrin.io company 266977 / employee 453601 tracks **Nick** (nick@nustechnology.com) at the John Yi company — NOT TuanNT. Never use Scrin data as evidence of TuanNT's hours; label the section "Nick at John Yi". TuanNT's 0h task-log issues are independent, checked via Google Sheets only — don't dismiss TuanNT 0h because Scrin shows Nick's activity. *Corrected 2026-06-09.*

**Monday date bug:** `scripts/scrin-fetch-yesterday.js` hardcodes `isYesterday:true`. Run Tue→returns Mon (correct). Run **Mon→returns Sunday** (weekend, ~0h), NOT Friday. Run Sat→returns Fri. On Monday reports, do NOT compare this output against Friday's sheet data — caused a false "Fri 6h vs Scrin 1h23m over-inflated" alert that wrongly skipped a Trello item. *Corrected 2026-05-12.*

**How to apply:**
- Tue-Fri cadence: `isYesterday:true` is valid as-is.
- Mon mornings: either skip Scrin entirely (note "Fri data not retrieved — script limitation") or recheck Saturday for Friday data.
- To fetch a specific date, extend the script to pass explicit `From`/`To` ISO fields to Scrin's `GetReport` API instead of `isYesterday`.

🔴 **REPEAT VIOLATION 2026-07-07 — this exact mistake was made again.** A daily-report recheck reported "TuanNT confirmed working 8h31m on Jul 6 via Scrin.io" and used it to pass the John Yi/Bailey/Rebecca TuanNT-gate — directly contradicting this memory's first line. User: "fuck, again!!! wrong wrong wrong, check carefully project, John Yi no task for a long time!!!" Additionally discovered: the raw `GetReport` response for that session has `Project: "No project"`, `Client: "No client"` — the "john yi" label is just the Scrin **company account name** (stale, unrelated to any live project), not a project/client tag on the actual tracked time. So even for Nick (the correct person this tracks), the activity cannot be attributed to "John Yi - Amazing Meds" specifically.
- **Concrete rule:** Never write "TuanNT" and "Scrin" in the same sentence as evidence. Never present Scrin's company-account name as if it were the current project — always check the raw `body`/`charts.projects` field for the actual `Project`/`Client` tag before attributing work to any specific client. If it says "No project"/"No client", say exactly that — don't fall back to the company account's display name.

🔴🔴🔴 **3rd VIOLATION, 2026-07-21 — same exact mistake, in a Piece-11 recheck.** Wrote "TuanNT 8h31m (Scrin.io)" to pass the John Yi/Bailey/Rebecca gate, again. User: "TuanNT 8h31m Scrin.io (John Yi) OK — fuck !!!! again, wrong, why you keep wrong about that !!!"
- **Root cause this time, different from prior two:** the session DID read `docs/memory/MEMORY.md` (the index) at start via `/util:read-memory daily-report` for a full run, but never opened this individual file — only skimmed the one-line index description. The index line alone doesn't carry "never write TuanNT and Scrin in the same sentence" with enough force to prevent the mistake under recheck time-pressure. **Fix applied:** the daily-report skill file itself (`.claude/commands/me/daily-report.md`, Piece 5) previously said `**Employee:** TuanNT / Nick (ID 453601)` — genuinely ambiguous wording that invites this exact error. Corrected to `**Employee:** Nick (nick@nustechnology.com, ID 453601)` with an inline 🔴🔴🔴 warning, and the section header/output-format templates renamed from "Scrin.io (TuanNT / John Yi...)" to "Scrin.io (Nick @ John Yi company account...)". This closes the gap structurally — the skill file no longer contains the ambiguous phrase that a full-file read (or the index alone) could miss.
- **How to apply going forward:** if `## daily-report:scrin` section is in scope for the run (it always is for a full run or `sheets`/`trello progress bailey|johnyi|rebecca` runs), treat this file as read even from the index alone, since the skill file itself now carries the correction. But the safer general rule stands: for a full `/daily-report` run, actually open every file listed under every matching memory section — not just the index — per `/util:read-memory`'s own step 2/3. The index is a pointer, not a substitute for the content.
- **Also caught same session:** a *different* false-evidence pattern — citing one person's Slack message (Kai's own progress report) as if it were evidence of a different person's activity (LongVV). Same family of bug as the Scrin misattribution: attributing Person A's real data point to Person B because they're loosely associated (same project). General rule: before citing any piece of evidence for Dev X, confirm the evidence *itself* names or was authored by Dev X — proximity/project-association is not attribution.
