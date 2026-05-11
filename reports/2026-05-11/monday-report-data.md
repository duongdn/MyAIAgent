# Monday Report — Week 2026-05-04 → 2026-05-10 (W25)

Generated: 2026-05-11 (Mon) | Reporting Mon→Sun

## Submission Table

| Project | Internal | External | Dev Hours | Note |
|---|---|---|---|---|
| Maddy - Xtreme Soft Solutions | 0 | 4 | 32.00 | Anoma raised 4 errors on data update flow |
| Aysar Khalid - Baamboozle | 0 | 3 | 47.66 | Aysar + Jamie (client dev) raised proration/invoice issues |
| James Diamond - Portfolio | 3 | 9 | 136.00 | Map filter, Harvest, File_Manager bugs + AirAgri webapp & flutter client requests |
| Bailey Joey - Speedventory | 3 | 0 | 162.50 | PrestaShop 9 invoice/UI + GLS console issues; no Bailey-side Slack bugs this week |
| Marcel Fuessinger - Tokenlite | 0 | 0 | 7.00 | Maintenance only |
| Neural Contract - Neural Contract - Test Job | 0 | 0 | 0.00 | No activity this week |
| Raymond Huang - LegalAtoms | 0 | 0 | 0.00 | LegalAtoms team filed many GitHub issues, but no Nick-direct bug reports |
| Andrew Taraba - Portfolio | 0 | 1 | 0.00 | Animeworld DM: mockup vs final UI mismatch feedback |

---

## Detail by Project

### 1. Maddy - Xtreme Soft Solutions
- **Internal (Redmine `maddy-extreme-soft-solutions` tracker_id=1):** 0
- **External (Slack `Xtreme Soft Solutions` from madhuraka/anomawasala):** 4
  - @anomawasala: "plz fix this error if you have enough time"
  - @anomawasala: "another issue. can u fix this?"
  - @anomawasala: "Still the error is there. selected all in 1st page and try to update"
  - @anomawasala: "Can u quickly check this error? cannot recognize the reason"
- **Dev hours (Summary W5, LongVV):** 32.00h

### 2. Aysar Khalid - Baamboozle
- **Internal:** 0 (no Redmine project tracked)
- **External (Slack `Baamboozle`):** 3 distinct client bug threads
  - @aysark.pro #engineering: comment on issue 540 dependency
  - @skjamie25 #testing: proration invoice generation wrong (35% discount case)
  - @skjamie25 #testing: 2 new GitHub issues + Issue533 status
- **Dev hours (Summary W23, all employees):** 47.66h (LeNH, KhanhHH primary)

### 3. James Diamond - Portfolio
- **Internal (Redmine `james-bonsey-jaden` tracker_id=1):** 3
  - #78504 [New] [Map] Filter area not work on map page (2026-05-06)
  - #78470 [New] [Harvest] Button add New Variety not work (2026-05-04)
  - #78467 [Deployed on Staging] [File_Manager] Open new tab issue (2026-05-04)
- **External (Discord nusvinn — AirAgri only; HOMIEAPP excluded per memory):** 9 client bug msgs
  - **#airagri_webapp (5 from .jdiamond + bellatric02):**
    - bellatric02: Validity period can't be removed; container size hardcode; rectifier task auto-create flow
    - .jdiamond: "fixed to link be at corporate level"; "huge issue" escalation
  - **#airagri-flutter (4 from .jdiamond):** Form builder, map fix on mobile, "cannot have this not working", green issue
- **Dev hours (Summary W24, full team):** 136.00h

### 4. Bailey Joey - Speedventory
- **Internal (Redmine `bailey-paturevision` tracker_id=1):** 3
  - #78465 [In Progress] [Prestashop 9] Invoice missing on Front-Office (2026-05-04)
  - #78464 [Deployed on Staging] [Prestashop 9] UI issues on price specific modal (2026-05-04)
  - #78444 [Tested on Staging] [Console] [GLS] services list incomplete (2026-05-04)
- **External (Slack `Xtreme Soft Solutions` filtered Bailey-related from clients):** 0
  - Note: Bailey/Speedventory work tracked through Redmine + internal Slack DMs; no client bug-keyword messages from madhuraka/anomawasala specifically about Bailey/Speedventory this week.
- **Dev hours (Summary W26, full team):** 162.50h

### 5. Marcel Fuessinger - Tokenlite
- **Internal:** 0
- **External:** 0
- **Dev hours (Summary W8, DuongDN):** 7.00h

### 6. Neural Contract - Test Job
- **Internal:** 0
- **External:** 0
- **Dev hours (Summary W19, TuanNT/NamTV/DuongDN):** 0.00h

### 7. Raymond Huang - LegalAtoms
- **Internal:** 0
- **External (Slack `LegalAtoms` filtered Nick mentions only):** 0
  - Many bug reports filed in #general from LegalAtoms internal devs (sobianadeem, hashimzahid, charsalanazhar, hamidsalamatali, umairraza, etc.) referencing GitHub issues 19610–19628, but **none from Nick directly** and none of the bug-keyword msgs mention "nick" in this week range.
- **Dev hours (Summary W24, ThongVV/DuongDN):** 0.00h

### 8. Andrew Taraba - Portfolio
- **Internal:** 0
- **External:** 1
  - **Discord nuscarrick — Bizurk guild:** 0 client bug-keyword messages
  - **Discord nuscarrick — DM with `animeworld` (per memory):** 1 from animeworld
    - 2026-05-04: "if you compare the mockup to your version there's too many differences, colors, icons, (for example wrong back arrow icon) etc..."
- **Dev hours (Summary W19, TuanNT/DuongDN):** 0.00h

---

## Methodology

- **Hours:** Read `Summary!A4:BZ200` from each spreadsheet, found row where col B contained "May 4, 2026", summed all `Actual` columns (D onwards). All 8 sheets had a matching row — no fallback needed.
- **Redmine:** `GET /issues.json?project_id={proj}&tracker_id=1&created_on=><2026-05-04|2026-05-10&status_id=*` with API key.
- **Slack:** `search.messages` paged for `after:2026-05-03 before:2026-05-11`, then client-side filter for ts in [Mon 00:00 UTC, next Mon 00:00 UTC) and bug keyword (bug/issue/error/broken/problem/fix/crash/can't/wrong/fail/stuck/not working). Sender categorized as client (per workspace whitelist), team (NUS staff), or other.
- **Discord:** Enumerated `/guilds/{id}/channels`, fetched messages with `before={MAX_snowflake}` paging back to MIN_snowflake (Mon 2026-05-04 00:00 +07 → Mon 2026-05-11 00:00 +07). Per memory, monitored AirAgri + Bizurk only (NOT HOMIEAPP). For Andrew, also fetched DM with username `animeworld`.
- **Note on hours definition:** "Total Dev Hours" = sum of all Actual (logged) hours across all employees on that project for the week, per Summary tab.

## Data Files

- `/tmp/monday-report-hours.json` — per-project hours
- `/tmp/redmine-bugs.json` — internal bug counts + samples
- `/tmp/slack-bugs-v3.json` — Slack client bug msgs
- `/tmp/discord-bugs-v2.json` — Discord client bug msgs

## Unresolved Questions

1. **Baamboozle external count:** Counted 3 distinct issue threads (Aysar 1 + Jamie 2). Jamie (`skjamie25`) appears to be Aysar's client-side dev — confirm if he counts as client or team.
2. **HOMIEAPP exclusion:** Per CLAUDE.md memory rule. If client wants HOMIEAPP included for James Diamond, his external count would change.
3. **Bailey external in Slack:** Spec says check Xtreme workspace for "Bailey-related" client msgs — none found this week. If Bailey-related msgs are typically posted in a different workspace/channel (e.g. direct Bailey DM, or Xtreme #bailey channel), confirm location.
4. **LegalAtoms "Nick mentions only":** Interpreted as msgs from Nick or text mentioning Nick. Result: 0. If "Nick-relevant" means broader (any LegalAtoms internal escalation that Nick should see), then count would be ~13 from #general devs.

---

**Status:** DONE_WITH_CONCERNS
**Summary:** All 8 projects' hours fetched from Summary sheets (week row "May 4, 2026" matched in all). Redmine internal bugs counted via tracker_id=1 created_on range. Slack/Discord external bugs filtered by client-username + bug keywords + week timestamp range. Discord guild→channels properly enumerated (initial 404 was due to passing guild IDs as channel IDs).
**Concerns:** (1) Baamboozle skjamie25 client-vs-team classification; (2) LegalAtoms Nick-only filter excluded all 13 #general bug msgs from LegalAtoms internal devs — confirm interpretation; (3) Bailey Slack external = 0 because Xtreme workspace has no Bailey-tagged client bug msgs this week (Bailey work tracked via Redmine).
