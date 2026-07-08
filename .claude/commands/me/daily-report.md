---
description: Morning daily report — full automated scan of all monitoring sources
---

# ⚠️ MANDATORY FIRST STEP — READ MEMORY

**Before doing ANYTHING else, invoke `/util:read-memory daily-report [piece]`:**
- Running a single piece (e.g. `/daily-report sheets khanhhh`, `/daily-report fountain`) → read Global + that piece's `## daily-report:{piece}` section ONLY
- Running the full report (no piece arg) → read Global + `## daily-report — general` + ALL `## daily-report:*` sections
- Memory OVERRIDES any instructions in this skill file

Do not skip this. Do not proceed until the relevant memory is read.

---

# Daily Report

Full morning scan across all monitoring sources. Run once per morning (~8 AM).

**Output:** `./reports/{YYYY-MM-DD}/daily-report.md`
**Partial runs:** When run with a piece argument (e.g. `email`, `slack`), append the results as a new timestamped section to the existing daily report. Never skip writing results just because it's a partial run.
**Timeline:** Uses `daily_report.last_run` from `config/.monitoring-timelines.json` as window start. After completing all sources, update both `daily_report.last_run` and `alert.last_run` to current time.
**Refresh flag:** Adding `--refresh` (or `refresh`) to any command forces a fresh re-check of all mapped sources, even if already scanned in the current session. Always re-fetch live data when this flag is present — never use cached/prior results.
**Reminder flag:** By default, reminders are **printed to the report only** — NOT sent to Matrix. Add `--send-reminder` to actually send them. Example: `/me:daily-report --send-reminder` or `/me:daily-report reminders --send-reminder`.
**Cron flag:** `--cron` = headless mode. Run ALL 10 pieces **sequentially inline** — do NOT spawn subagents or parallel agents. Execute each piece's logic directly in this single session. Reason: each spawned subagent in headless starts a fresh session, reloads all memory files, and exhausts the daily quota.

---

## Quick Reference — Run by Piece

| Command | What it checks |
|---------|---------------|
| `/daily-report` | Everything (full run) |
| **Email** | |
| `/daily-report email` | All 10 accounts (6 Zoho + 3 Gmail IMAP + 1 Gmail API) |
| `/daily-report email duongdn` | duongdn@ only |
| `/daily-report email carrick` | carrick@ only |
| `/daily-report email nick` | nick@ only |
| `/daily-report email rick` | rick@ only |
| `/daily-report email kai` | kai@ only |
| `/daily-report email ken` | ken@ only |
| `/daily-report email vuongtran` | vuongtrancr@gmail.com only |
| `/daily-report email dnduong` | dnduongus@gmail.com only |
| `/daily-report email davidztv19` | davidztv19@gmail.com only (Arthur - Meta-Stamp / Crystal lang project) |
| `/daily-report email mpfc` | freelancer@mypersonalfootballcoach.com only |
| **Slack** | |
| `/daily-report slack` | All 14 workspaces |
| `/daily-report slack baamboozle` | Baamboozle only |
| `/daily-report slack rdc` | RDC - FM Monitoring only |
| `/daily-report slack swift` | Swift Studio only |
| `/daily-report slack xtreme` | Xtreme Soft Solutions only |
| `/daily-report slack samguard` | SAM GUARD - Mobile only |
| `/daily-report slack ggs` | Global Grazing Services only |
| `/daily-report slack amazingmeds` | Amazing Meds only |
| `/daily-report slack generator` | Generator only |
| `/daily-report slack legalatoms` | LegalAtoms only |
| `/daily-report slack mpfc` | MyPersonalFootballCoach only |
| `/daily-report slack williambills` | William Bills only |
| `/daily-report slack equanimity` | Equanimity only |
| `/daily-report slack socal` | SoCal Auto Wraps only |
| `/daily-report slack aigile` | Aigile Dev only |
| `/daily-report slack ohcleo` | OhCleo only |
| **Discord** | |
| `/daily-report discord` | AirAgri + Bizurk |
| `/daily-report discord airagri` | AirAgri (nusvinn) only |
| `/daily-report discord bizurk` | Bizurk (nuscarrick) only |
| **Google Sheets** | |
| `/daily-report sheets` | All developers |
| `/daily-report sheets longvv` | LongVV only |
| `/daily-report sheets phucvt` | PhucVT only |
| `/daily-report sheets tuannt` | TuanNT (5 sheets combined) only |
| `/daily-report sheets vietph` | VietPH only |
| `/daily-report sheets khanhhh` | KhanhHH (4 sources combined) only |
| `/daily-report sheets lenh` | LeNH (Rory + Franc + Rebecca — col G filter) only — NOT Aysar |
| **Scrin.io** | |
| `/daily-report scrin` | TuanNT/John Yi time tracking |
| **Fountain** | |
| `/daily-report fountain` | Full 5-part check |
| `/daily-report fountain matrix` | Part 1 — Matrix plan only |
| `/daily-report fountain sheets` | Part 2+3 — Task log actuals + plan vs actual |
| `/daily-report fountain runway` | Part 4 — Capacity & runway only |
| `/daily-report fountain overest` | Part 5 — Over-estimate tracking only |
| `/daily-report fountain trello` | Trello board only (customer comments, stuck cards) |
| **Elena** | |
| `/daily-report elena` | Elena PRs + deploy + Redmine + Precognize |
| `/daily-report elena prs` | Check + merge open PRs only (no deploy) |
| `/daily-report elena deploy` | Deploy already-merged PRs pending deploy |
| `/daily-report elena precognize` | Precognize nusken PRs only |
| `/daily-report elena wordpress` | Check samguard.co for JS console errors |
| `/daily-report elena --external` | Full Elena flow + push to Precognize external repo |
| `/daily-report elena prs --external` | Check + merge PRs + push to external |
| **Trello** | |
| `/daily-report trello` | Both cards, all items |
| `/daily-report trello progress` | Check Progress, all items |
| `/daily-report trello progress maddy` | Maddy - Carrick/Kai/Luis |
| `/daily-report trello progress blake` | Blake |
| `/daily-report trello progress johnyi` | John Yi - Amazing Meds |
| `/daily-report trello progress james` | James Diamond - Vinn task |
| `/daily-report trello progress franc` | Franc |
| `/daily-report trello progress rory` | Rory |
| `/daily-report trello progress aysar` | Aysar |
| `/daily-report trello progress elliott` | Elliott |
| `/daily-report trello progress swift` | Rory (Swift Studio) |
| `/daily-report trello progress raymond` | Raymond - LegalAtoms |
| `/daily-report trello progress marcel` | Marcel |
| `/daily-report trello progress colin` | Colin |
| `/daily-report trello progress andrew` | Andrew Taraba |
| `/daily-report trello progress elena` | Elena - SamGuard |
| `/daily-report trello progress mpfc` | MPFC |
| `/daily-report trello progress bailey` | Bailey |
| `/daily-report trello progress fountain` | Fountain |
| `/daily-report trello progress rebecca` | Rebecca (William Bills) |
| `/daily-report trello progress neural` | Neural Contract |
| `/daily-report trello mail` | Check Mail, all 6 items |
| `/daily-report trello mail duongdn` | DuongDn only |
| `/daily-report trello mail carrick` | Carrick only |
| `/daily-report trello mail nick` | Nick only |
| `/daily-report trello mail rick` | Rick only |
| `/daily-report trello mail kai` | Kai only |
| `/daily-report trello mail ken` | Ken only |
| **Reminders** | |
| `/daily-report reminders` | Print 0h devs to report (no send) |
| `/daily-report reminders --send-reminder` | Print + actually send Matrix reminders |
| `/daily-report reminders lenh` | LeNH only (print, no send) |
| `/daily-report reminders lenh --send-reminder` | LeNH only + send |
| `/daily-report reminders phucvt` | PhucVT only (print, no send) |
| `/daily-report reminders tuannt` | TuanNT only (print, no send) |
| `/daily-report reminders longvv` | LongVV only (print, no send) |
| **Matrix** | |
| `/daily-report matrix` | All joined rooms |
| `/daily-report matrix --room "!roomId:..."` | Single room by ID |
| **Arthur** | |
| `/daily-report arthur` | Arthur/Meta-Stamp — 2 Matrix rooms + 3 Slack channels, incremental since last run, Vietnamese living-tracker report |
| **Re-check** | |
| `/daily-report` *(re-run, report exists)* | Auto-detects today's report exists → recheck all ○ incomplete items |
| `/daily-report recheck [item]` | Force recheck one specific item (same args as `trello progress`) |

---

## Piece 1 — Email (`/daily-report email [account]`)

Supports individual account targeting:
- `/daily-report email` — check all 10 accounts
- `/daily-report email duongdn` — check duongdn@ only
- `/daily-report email carrick` — check carrick@ only
- `/daily-report email nick` — check nick@ only
- `/daily-report email rick` — check rick@ only
- `/daily-report email kai` — check kai@ only
- `/daily-report email ken` — check ken@ only
- `/daily-report email vuongtran` — check vuongtrancr@gmail.com only
- `/daily-report email dnduong` — check dnduongus@gmail.com only
- `/daily-report email davidztv19` — check davidztv19@gmail.com only (Arthur - Meta-Stamp / Crystal lang project)
- `/daily-report email mpfc` — check freelancer@mypersonalfootballcoach.com only

**Accounts:** 10 in `config/.email-accounts.json`

**Group A — Zoho IMAP (6 accounts):** credentials loaded from config

| Account | Filter | Folder | What to look for |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | none | INBOX | leave requests, New Relic alerts |
| carrick@nustechnology.com | none | INBOX | Redmine bug notifications for Generator/Elliott |
| nick@nustechnology.com | John Yi | INBOX | anything from John Yi client |
| rick@nustechnology.com | Kunal / Fountain / InfinityRose | INBOX | Rollbar/BugSnag **production** alerts for Fountain, InfinityRoses |
| kai@nustechnology.com | Madhuraka | INBOX | Jira/Madhuraka ticket mentions |
| ken@nustechnology.com | Precognize/development | NewsLetter | Precognize GitHub PR activity |

**Method (Zoho):** IMAP SSL port 993, imap.zoho.com. SINCE `{previous_day}`, filter Date header >= `daily_report.last_run`.

**Group B — Gmail IMAP (3 accounts):** credentials loaded from config

| Account | What to look for |
|---------|-----------------|
| vuongtrancr@gmail.com | Production monitoring alerts for Swish project (Delayed-newform, APM signal lost, BugSnag). Carrick's personal Gmail receives Swish Zendesk + monitoring. Flag any `[HIGH]` or `Signal lost` subjects. |
| dnduongus@gmail.com | Personal Gmail (DuongDN). Only flag security alerts (account breach, unauthorized login). Ignore: LinkedIn, newsletters, Finhay, Careerviet, bank notifications. |
| davidztv19@gmail.com | Arthur - Meta-Stamp project (Workstream "Crystal lang", roster DuongDN/PhucVT/TienND). No filter — flag all client/project mail. Uses an App Password (2FA enabled on account); login verified live 2026-07-06. |

**Method (Gmail IMAP):** IMAP SSL port 993, imap.gmail.com. Use `app_password` from config. `rejectUnauthorized: false` for TLS. SINCE `{previous_day}`, filter Date header >= `daily_report.last_run`.

**Group C — Gmail API (1 account):** service account key required

| Account | Auth | What to look for |
|---------|------|-----------------|
| freelancer@mypersonalfootballcoach.com | `.gmail-service-account.json` service account key | Client emails from MPFC project (Adam Blackford or team). If key missing → note as unavailable, check previous day's report for known issues. |

**Method (Gmail API):** Requires `config/.gmail-service-account.json`. If file missing: report as unavailable (do NOT say "blocked" or "token expired"). Run `node scripts/daily-email-scan-260610.js` which handles all 3 groups automatically.

**Calendar — run alongside email check (Zoho accounts only):**
```bash
node scripts/fetch-zoho-calendar.js [account]   # omit account for all 6
```
- Fetches today's events from each account's Zoho Mail CalDAV calendar
- Uses same `app_password` as IMAP — no extra auth needed
- Include events in the report section below (even if count = 0, show "no events")
- Events with `STATUS:CANCELLED` or `PARTSTAT=DECLINED` note as cancelled/declined
- Gmail accounts (vuongtrancr, dnduongus, davidztv19, mpfc) have no Zoho calendar — omit calendar column

**Trello — after checking:**
- Find "Check mail" card by name on board `O83pAyqb`
- Mark the checklist item(s) for the checked account(s) complete: `PUT /cards/{id}/checkItem/{itemId}?state=complete&key=...&token=...`
- If checking a single account → complete only that account's item
- If checking all → complete all 6 Zoho items (Gmail accounts have no Trello items)
- **Auto-complete card:** After marking item(s), fetch full checklist state. If ALL items across ALL checklists are now complete → mark card done: `PUT /1/cards/{cardId}?dueComplete=true&key=...&token=...`

**Report — always append to daily report:**
Append a timestamped section to `reports/{YYYY-MM-DD}/daily-report.md`:
```
## Email [account|all] — {HH:MM} (+07:00)
| Account | Emails | Calendar today |
|---------|--------|----------------|
| duongdn@... | 3 | no events |
| nick@...    | 1 | 14:30 Weekly Meeting with Devs (Teams) |
| vuongtrancr@gmail.com | 5 | — |
| dnduongus@gmail.com | 0 | — |
| freelancer@mpfc | — (key missing) | — |
...
{Alerts if any.}
Trello: {checked account(s)} item ✓ complete.
```

---

## Piece 2 — Slack (`/daily-report slack [workspace]`)

Supports individual workspace targeting:
- `/daily-report slack` — check all 14 workspaces
- `/daily-report slack baamboozle` — check Baamboozle only
- `/daily-report slack rdc` — check RDC - FM Monitoring only
- `/daily-report slack swift` — check Swift Studio only
- `/daily-report slack xtreme` — check Xtreme Soft Solutions only
- `/daily-report slack samguard` — check SAM GUARD - Mobile only
- `/daily-report slack ggs` — check Global Grazing Services only
- `/daily-report slack amazingmeds` — check Amazing Meds only
- `/daily-report slack generator` — check Generator only
- `/daily-report slack legalatoms` — check LegalAtoms only
- `/daily-report slack mpfc` — check MyPersonalFootballCoach only
- `/daily-report slack williambills` — check William Bills only
- `/daily-report slack equanimity` — check Equanimity only
- `/daily-report slack socal` — check SoCal Auto Wraps only
- `/daily-report slack aigile` — check Aigile Dev only
- `/daily-report slack ohcleo` — check OhCleo only

**Workspaces:** 14 in `config/.slack-accounts.json`

| Workspace | Arg | Token type | Key check | Trello item |
|-----------|------|-----------|-----------|-------------|
| Baamboozle | baamboozle | xoxp | General activity. **Aysar gate is the MPDM channel `C07SQ4HAUHZ` specifically** (Carrick's "Today's update", posts ~17:00-17:45+07) — general workspace noise is NOT the gate. | Aysar |
| RDC - FM Monitoring | rdc | xoxp | dmetiner updates | Franc |
| Swift Studio | swift | xoxp | Carrick activity | Rory |
| Xtreme Soft Solutions | xtreme | xoxp | **Kai daily report** (search: "progress"/"daily report") | Maddy - Carrick/Kai/Luis |
| SAM GUARD - Mobile | samguard | xoxp | Elena/DP activity | Elena - SamGuard |
| Global Grazing Services | ggs | xoxp | **Nick daily report in #maintenance** (NOT TuanNT) | Bailey |
| Amazing Meds | amazingmeds | xoxc+cookie | General activity. Auto-refresh if invalid_auth. | John Yi - Amazing Meds |
| Generator | generator | xoxp | Elliott/Violet activity, release coordination | Elliott |
| LegalAtoms | legalatoms | xoxp | Nick-specific mentions/DMs only (filter noise) | Raymond - LegalAtoms |
| MyPersonalFootballCoach | mpfc | xoxp | General activity | MPFC |
| William Bills | williambills | xoxp | Oliver/Lucas tasks | Rebecca (William Bills) |
| Equanimity | equanimity | xoxc+cookie | **Carrick/Marcel alerts**. Auto-refresh if invalid_auth. | Marcel |
| SoCal Auto Wraps | socal | xoxp | General activity | **DROPPED 2026-05-11 — Blake no longer monitored, no Trello item exists for it.** |
| Aigile Dev | aigile | xoxp | General activity | Colin |
| OhCleo | ohcleo | xoxc+cookie | **Celine DM** — customer messages, bug reports, daily report from Tony. See Piece 12. | Ohcleo (confirmed present on board as of 2026-06-22 — earlier docs said "no item", that was stale) |

**Method:** `search.messages` API with `after:{day_before_cutoff}` + epoch filter (NOT `conversations.history`)
**Session tokens (Amazing Meds, Equanimity, OhCleo):** Auto-refresh via crumb extraction if invalid_auth — never just report expired.
**OhCleo:** Uses `conversations.history` (not `search.messages`) — small workspace with xoxc token. See Piece 12 for details.

**Trello — after checking:**
- Find "Check progress" card by name on board `O83pAyqb`
- Iterate ALL checklists (Normal, Should do, Closely monitor, Work)
- Complete the item(s) mapped to the checked workspace(s) — only if no alerts found
- If checking a single workspace → complete only that workspace's item
- If checking all → complete all applicable items per workflow rules
- **Auto-complete card:** After marking item(s), fetch full checklist state. If ALL items across ALL checklists are now complete → mark card done: `PUT /1/cards/{cardId}?dueComplete=true&key=...&token=...`

**Report — always append to daily report:**
```
## Slack [workspace|all] — {HH:MM} (+07:00)
| Workspace | Msgs | Key content |
...
{Alerts if any.}
Trello: {item(s)} ✓ complete / ⚠️ skipped (alert).
```

---

## Piece 3 — Discord (`/daily-report discord [server]`)

Supports individual server targeting:
- `/daily-report discord` — check AirAgri + Bizurk
- `/daily-report discord airagri` — AirAgri (nusvinn) only
- `/daily-report discord bizurk` — Bizurk (nuscarrick) only

**Accounts:** 2 in `config/.discord-accounts.json`
- nusvinn → AirAgri only (NOT HOMIEAPP) → Trello items: James Diamond - Vinn
- nuscarrick → Bizurk only → Trello item: Andrew Taraba

**⚠️ ALWAYS use the script — NEVER make Discord API calls inline or via Python.**
Python urllib returns false 403 on Discord even with valid tokens. The Node.js script uses correct headers.

**Run:**
```bash
node scripts/discord-monitor.js
```
- Reads `daily_report.last_run` from `config/.monitoring-timelines.json` automatically
- Pass `--since=ISO8601` to override window (e.g. `--since=2026-06-18T05:36:00+07:00`)
- Output: JSON `{ nusvinn: { tokenValid, messages: [...] }, nuscarrick: { tokenValid, messages: [...], andrewDMs: [...] } }`

**Key checks in output:**
- AirAgri (nusvinn): filter `messages` for author=`nusvinn` or `dapackage`, channel=`airagri_webapp`/`airagri-flutter` → **Vinn daily report**
- AirAgri (nusvinn): filter author=`jeff_trinh` → **Jeff daily report**
- Bizurk (nuscarrick): general activity + `andrewDMs` for Andrew Taraba

**Trello — after checking:** Complete mapped item(s) if no alerts. Single server → complete only its item.

**Report — always append to daily report:**
```
## Discord [server|all] — {HH:MM} (+07:00)
| Server | Msgs | Key content |
...
Trello: {item(s)} ✓ complete / ⚠️ skipped (alert).
```

---

## Piece 4 — Google Sheets (`/daily-report sheets [developer]`)

Supports individual developer targeting:
- `/daily-report sheets` — check all developers
- `/daily-report sheets longvv` — LongVV only
- `/daily-report sheets phucvt` — PhucVT only
- `/daily-report sheets tuannt` — TuanNT (5 sheets combined) only
- `/daily-report sheets vietph` — VietPH only
- `/daily-report sheets khanhhh` — KhanhHH (4 sources combined) only
- `/daily-report sheets lenh` — LeNH (Rory + Franc + Rebecca, filter col G=LeNH) only

**Service account:** `config/daily-agent-490610-7eb7985b33e3.json`
**Week:** Use Summary tab to find current W{n}. Today's date determines the week. **Every sheet has its own independent W-numbering — never reuse one sheet's W{n} for another.**

🔴 **RULE: NEVER pre-assign developers to specific sheets or Workstream projects.** Developers switch projects without notice. Hardcoding dev→sheet has caused multiple false alerts (KhanhHH Jun22: 8.0h real, reported 2.5h; TuanNT Jun17: missed CharlesChang entirely). Always scan ALL sources for every dev.

**For each developer: scan ALL 11 Google Sheets + ALL Workstream projects. Filter each by col G (Owner) = dev name, sum col H (Actual hours). See [[feedback_dev_project_mapping_flexible]] for full sheet ID list. See [[reference_workstream]] for all Workstream project IDs.**

**Workstream unavailable fallback:** If `node scripts/workstream-fetch-project-week.js` fails (token expired, login fails), use Google Sheets data as authoritative. Do NOT add "WS unavailable — unverified" caveats that turn confirmed 0h into uncertain results. Google Sheets 0h = ALERT; Google Sheets >0h = OK. Note in report that WS was skipped. Workstream re-auth: `DISPLAY=:1 node scripts/workstream-login.js`.

**Workstream "needs review" check (run for every project, every dev, every day — EXCEPT Fountain, see below):**
Workstream lets a dev's charged hours be flagged for review; the row's `reviewStatus` shows `Pending` until the project's reviewer resolves it (`Reviewed`), or `NotRequired` if no review was ever needed. `node scripts/workstream-fetch-project-week.js` output includes, per project: `reviewers` (array — see below) and `needsReview` (array of `{employeeName, date, task, charged}` rows still `Pending`).
- 🔴 **Reviewer is NOT derivable from project role text** (Manager/Tech Lead) — a plain "Developer" can be the real reviewer while the Manager isn't (confirmed live 2026-07-08: Radio Data Center's reviewer is LeNH — a Developer — not DuongDN the Manager; James Diamond's reviewer is PhucVT, also a Developer, not DuongDN). The actual source is the per-member `isReviewer` boolean from `GET {api_base}/pinfo/projects/{id}?date={date}` (the page behind the project's "Info" ⓘ icon → "Review Charged Hours" section). Tech Lead is always auto-marked a reviewer; anyone else can ALSO be independently marked one — there can be more than one reviewer per project (Fountain has both VuTQ and DuongDN/Tech Lead). The script now fetches this endpoint automatically and returns `reviewers: string[]`.
- Any non-empty `needsReview` array = unresolved → **ALERT**, addressed to `reviewers` for that project (not the dev who logged the hours, and not assumed to be the project Manager).
- `Reviewed` rows are resolved — do not alert on them, even if they showed up as `Pending` in a previous day's report.
- Do this cross-project — a dev can have pending reviews on a project they're not otherwise flagged on (e.g. hours look fine, but a specific task's charged time is still pending review).
- **Fountain is excluded from this check** (user instruction 2026-07-08: "ignore, ko cần check Fountain") — do not alert on Fountain's `needsReview`/`reviewers` even though the data is technically available.
- Alert line format: `Workstream needs review: {employeeName} — {task} ({charged}, {date}) — reviewer(s): {reviewers.join(', ')} ({project})`

| Developer | Arg | Daily target | Alert threshold | Notes |
|-----------|------|-------------|-----------------|-------|
| LongVV | longvv | 16h/**week** | Only if WEEKLY total < 16h, no leave | Part-time. 0h on any single day is NORMAL — never flag daily 0h. |
| PhucVT | phucvt | 8h/day | 0h no leave = alert | Nghỉ nửa ngày = 4h OK |
| TuanNT | tuannt | 8h/day combined | 0h across ALL sources = alert | Col P "Chưa" in Rebecca = normal. Show per-source breakdown. Blocks John Yi+Rebecca+Bailey Trello items. |
| VietPH | vietph | 8h/day | 0h no leave = alert | Nghỉ cả ngày = 0h OK |
| KhanhHH | khanhhh | 8h/day combined | 0h across ALL sources = alert | New sources surface repeatedly (3 found in 2 months) — treat any shortfall with extra suspicion, verify all sources exhaustively before flagging. |
| LeNH | lenh | 8h/day combined | ANY shortfall (even <1h) no leave = alert | Stricter threshold than other devs. Aysar sheet owner is KhanhHH, not LeNH. Rebecca cols M-Q = sign-offs only. |
| Fountain | — | — | — | Used by `/daily-report fountain`, not this piece. |

**Rules:**
- "Nghỉ cả ngày" = full day off → 0h OK
- "Nghỉ nửa ngày" = half day → 4h min OK
- 0h with no leave note → ALERT
- Only count "Task dự án" rows; skip "Part-time" rows in column A
- Also count rows where col A is blank but col G (owner) has a value — some devs omit "Task dự án" (caused a 4.5h-vs-8h undercount once)

**Maddy JIRA cross-check (run EVERY day — never skip):**
```bash
node scripts/maddy-jira-tasklog-check.js --week [YYYY-MM-DD]  # defaults to week containing PREV_DATE
```
Scans ALL task log entries for the current week, extracts JIRA ticket IDs from col C/D, and for each verifies:
1. ✅ Ticket has original estimate set (`timeoriginalestimate > 0`)
2. ✅ Ticket has actual time logged on JIRA (`timespent > 0`)
3. ✅ est >= actual (not over-budget)

Script outputs a markdown table — append directly to daily report:
```
## Sheets — Maddy JIRA — W{n} — {HH:MM} (+07:00)
| Ticket | Summary | Status | Est | Actual (JIRA) | Task Log | Check |
|--------|---------|--------|-----|---------------|----------|-------|
| LIFM2-NNN | ... | Status | Xh | Yh | Zh | ✅ / ⚠️ no est / ⚠️ no JIRA log / 🔴 over Xh Ym |
```
Over-budget / no-est / no-JIRA-log summaries appear below table automatically.
**Run every day. Do NOT skip when LongVV = 0h or no Maddy hours today — check covers full week.**

**Report — always append to daily report:**
```
## Sheets [developer|all] — {HH:MM} (+07:00)
| Developer | Today | Status |
...
{Alerts if any.}
```

---

## Piece 5 — Scrin.io (`/daily-report scrin`)

**Config:** `config/.scrin-config.json`
**Company:** john yi (ID 266977) | **Employee:** TuanNT / Nick (ID 453601)

**⚠️ Use API script — NOT the Puppeteer script.**
`scrin-login.js --fetch` pulls ALL companies' sessions for the employee (shows Art and other companies too) — wrong.
`scrin-fetch-yesterday.js` filters by `companyId: 266977` (John Yi only) — correct.

Run: `node scripts/scrin-fetch-yesterday.js`

If `body: []` → 0h logged for John Yi yesterday.

**Output format:**
```
**Scrin.io (TuanNT / John Yi — {date}):** {Xh Ym} logged ({N} sessions).
```
If empty: `**Scrin.io (TuanNT / John Yi — {date}):** 0h — no sessions recorded.`

---

## Piece 6 — Fountain (`/daily-report fountain [part]`)

Supports individual part targeting:
- `/daily-report fountain` — full 5-part check (all mandatory)
- `/daily-report fountain matrix` — Part 1: Matrix plan only
- `/daily-report fountain sheets` — Part 2+3: Task log actuals + plan vs actual table
- `/daily-report fountain runway` — Part 4: Capacity & runway only
- `/daily-report fountain overest` — Part 5: Over-estimate tracking only
- `/daily-report fountain trello` — Trello board only (customer comments, stuck cards)

Full 5-part check. All 5 parts are mandatory — never skip any.

**Part 1 — Matrix Plan**
- Room: `!EWnVDAxbTGsBxPkaaI:nustechnology.com`
- Fetch latest weekly plan message: "Em update plan tuần này ạ\nViTHT: Xh\nThinhT: Xh\nVuTQ: Xh\n=> QC X"
- Cite @sender + timestamp
- **On Monday, @trinhmtt posts the new week's plan ~08:30-09:30+07.** If checked before 09:30, do NOT flag "plan absent" — note "not yet posted, expected by 09:30, using last week's plan for context" and use the previous week's numbers. Recheck after 09:30.
- If token expired → run `scripts/matrix-token-refresh.js` first (tries refresh_token API automatically, no browser). Save new token to `config/.matrix-config.json` immediately.
- If refresh still fails (both token + refresh_token expired) → run `node scripts/matrix-device-auth.js` for device-code auth (no browser needed — shows URL to approve on any device).
- **If Matrix unavailable after both attempts:** proceed with Parts 2-5 using LAST KNOWN plan (from prior report). Note "Matrix plan N/A — using W{n-1} capacity" in the report. **Do NOT skip the Fountain Trello item** — if Parts 2-5 show no issues, complete the Trello item and note Matrix was unavailable.

**Part 2 — Task Log Actuals**
- Sheet: `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`, Summary tab, W{n}
- Devs: ViTHT, ThinhT, VuTQ | QC: PhatDLT, HungPN
- **HaVS**: only include/flag if named in Part 1's CURRENT week Matrix plan — not always on the plan, don't assume.
- **TrinhMTT is NOT QC** — exclude from QC totals/alerts (they post the weekly plan, don't do QC work).
- Report per-dev weekly totals

**Part 3 — Plan vs Actual Table**
- Compare each dev's plan (from Matrix) vs actual (from sheets)
- Never say "matches plan" without showing the numbers
- VuTQ: once their (often small) weekly plan total is met, subsequent 0h days that week are normal, not an alert.

**Part 4 — Capacity & Runway**
- "Est vs Charged" tab. Columns: Col I (idx 8) = Estimated Dev Raw, **Col J (idx 9) = CR** (Change Request, additional approved estimate), Col K (idx 10) = Actual, Col L (idx 11) = Charged.
- 🔴 **Total estimate per task = Col I + Col J. Always include CR** — omitting it has caused false "over-estimate" alerts before (e.g. #2735 looked +42% over using Col I alone, but with CR included it's only +4.6%, under threshold).
- NS+IP bucket: sum `remaining = (ColI+ColJ) - ColK` for Not Started + In-progress (any % variant), EXCLUDING Deployed on Live/Cancelled/Has Bug on Live/Tested on Live. Broader bucket adds Pending/On Hold/Dev Done/Deployed on Staging/blank/N/A.
- 🔴 **Row-matching bug (found 2026-06-22):** when selecting which rows count as tasks, match ANY row with a non-empty task identifier — do NOT filter by a dash/underscore name-format regex (e.g. matching "2524-duplicate-charge" but not bare "2640"). A prior report undercounted remaining hours 5x (42h/4 tasks vs the real 219h/27 tasks) this way. If a day's figure differs sharply from the previous report, suspect a script bug first, sanity-check row counts before reporting a "spike".
- Runway = remaining_hours / current_dev_capacity_per_week. **Derive capacity from Part 1's current Matrix plan** (sum of dev-only hours, e.g. ViTHT+ThinhT+VuTQ) — do NOT hardcode a number, team size/hours change week to week. If Matrix unavailable, reuse last known capacity from the most recent prior report that has it.
- Show delta vs previous report (search `reports/*/daily-report.md` for the most recent Fountain capacity figures).

**Part 5 — Over-Estimate Tracking**
- Tasks where `Actual (ColK) > (ColI+ColJ) * 1.2` (i.e. >20% over the CR-inclusive total estimate)
- Key tasks to always check by number even if not already flagged: #2595, #2615, #2735
- Flag if STILL GROWING vs previous report (compare actual hours, not just %)
- HungPN 0h is not an alert if PhatDLT covers QC that day. Don't speculate on individual Fountain dev 0h days as "unresolved questions" — established pattern, not worth flagging each time.

**Trello Board (Fountain)**
- Board: Web Development (`5475eaf923a9a1309357eb51`), Rick's account
- Customer comments: filter `commentCard` from kunalsheth, tmmckay, mike62798179, iris63293413
- Active card counts per list
- Stuck cards: `dateLastActivity` > 5 days
- Hard-to-release: in Doing 14+ days without reaching Done

---

## Piece 7 — Elena (`/daily-report elena [sub]`)

Supports sub-targeting:
- `/daily-report elena` — full flow (PRs + deploy + Redmine + Precognize + WordPress)
- `/daily-report elena prs` — check + merge open PRs only (no deploy)
- `/daily-report elena deploy` — deploy pending merged PRs from `.elena-pending-actions.json`
- `/daily-report elena precognize` — Precognize nusken PRs only
- `/daily-report elena wordpress` — check samguard.co for JS console errors
- `/daily-report elena --external` — full flow + push to Precognize external repo
- `/daily-report elena prs --external` — check + merge PRs + push to external

**Repo:** `nustechnology/Elena-SamGuard-Digital-Plant` — MUST use `duongdn` account:
```bash
GH_TOKEN=$(gh auth token -h github.com -u duongdn) gh api repos/nustechnology/Elena-SamGuard-Digital-Plant/pulls
```

**Flow for each open PR:**
1. Check CodeRabbit reviews for high-risk issues
2. If safe → merge
3. SSH to MayBanServer: `cd projects/Elena/Elena-SamGuard-Digital-Plant/process-digital-plant && git pull origin process-digital-plant`
4. Build: `export NVM_DIR=$HOME/.nvm && source $NVM_DIR/nvm.sh && nvm use 22 && npx ng build --configuration development`
5. If branch is `fix/redmine/XXXXX` → update Redmine #XXXXX to Deployed (status_id=10)
6. Announce to Matrix room `!kyArBadvcbfPIpIxpD:nustechnology.com` ("Elena - Digital Plant")
7. Update `config/.elena-pending-actions.json`

**Precognize:** Use `nusken` account — check for nusken's open PRs only:
```bash
GH_TOKEN=$(gh auth token -h github.com -u nusken) gh api repos/Precognize/development/pulls
```

**WordPress SamGuard:** Check `https://www.samguard.co/` for JS console errors.
- Run: `TMPDIR_OVERRIDE=<short writable dir, e.g. /tmp/wp-check-tmp> node scripts/wordpress-samguard-check.js` — the script's default TMPDIR is a server-only path; locally, a long TMPDIR path (e.g. nested scratchpad dirs) breaks Chrome's unix socket and causes a silent launch failure with empty results. Use a short path.
- CSP violations (`cspViolations`) are REAL errors, not noise — flag any as ⚠️ action needed (see `docs/memory/daily-report/elena/feedback_csp_violations_are_real_errors.md`). Only filter out non-CSP analytics network noise (plain GA/ads `failedRequests` with no CSP directive violation).
- Report all `cspViolations` + `pageErrors` + `jsErrors` as real errors
- No errors = clean; this is a simple health check, no PR/deploy flow
- **CSP fix mechanics (samguard.co):** the `headers-security-advanced-hsts-wp` plugin doesn't serve `hsts_csp` dynamically — it bakes it into a static `Header set Content-Security-Policy` rule in `.htaccess`, rewritten only via the `update_option_hsts_csp` hook. `.htaccess` is `www-data`-owned; our SSH user lacks write perms and there's no passwordless sudo, so a raw SQL/`wp option update` over SSH updates the DB but silently fails to rewrite `.htaccess`. Fix must go through wp-admin (`options-general.php?page=headers-security-advanced-hsts-wp-plugin`) so the save runs as `www-data`. **Also:** WP skips the hook entirely if the submitted value equals the current DB value — if you already set the DB value via SSH, the next wp-admin save is a no-op. Revert the DB to the old value first so the wp-admin save registers as a real change. Always verify with `curl -sI https://www.samguard.co/ | grep -i content-security-policy` (not just the DB) after any fix.

**`--external` flag (default: off, internal only):**

When `--external` is passed, after the normal internal flow (merge + deploy), push code to the external Precognize repo. Uses `nusken` GitHub account throughout (both internal and external repos).

**External flow steps:**
1. **Squash merge internal → external-dp:** On `nustechnology/Elena-SamGuard-Digital-Plant`, squash merge `process-digital-plant` into `external-dp` to clean up history.
   ```bash
   # Clone/checkout external-dp, squash merge from process-digital-plant
   GH_TOKEN=$(gh auth token -h github.com -u nusken) git ...
   ```
2. **Review the squash diff:** Review the merged code to ensure it's safe for external push (no internal secrets, debug code, etc.).
3. **Check Precognize for existing nus/ branch:**
   ```bash
   GH_TOKEN=$(gh auth token -h github.com -u nusken) gh api repos/Precognize/development/pulls?state=open --jq '.[] | select(.head.ref | startswith("nus/"))'
   ```
   - If an open PR with `nus/YYYYMMDD` branch exists → push to that existing branch (force-push OK, it's our branch)
   - If no open PR → create new branch `nus/{YYYYMMDD}` (today's date) on `Precognize/development`
4. **Push external-dp content to the nus/ branch on Precognize**
5. **Create PR (if new branch):**
   ```bash
   GH_TOKEN=$(gh auth token -h github.com -u nusken) gh pr create \
     --repo Precognize/development \
     --head "nus/{YYYYMMDD}" \
     --base staging \
     --title "Process digital plant - {YYYY/MM/DD}" \
     --body "{summary of changes}" \
     --reviewer Vladimir-precog,DanielGavrilkin,vovabrailov,KfirBernsteinSamson
   ```
   - Reference format: https://github.com/Precognize/development/pull/4798
   - Reviewers: `Vladimir-precog`, `DanielGavrilkin`, `vovabrailov`, `KfirBernsteinSamson`
   - Base branch: `staging`
   - Title format: `Process digital plant - YYYY/MM/DD`
6. **Announce to Matrix room** `!kyArBadvcbfPIpIxpD:nustechnology.com` ("Elena - Digital Plant") that external PR was created/updated

---

## Piece 8 — Trello (`/daily-report trello [card] [item]`)

Supports card and item-level targeting:
- `/daily-report trello` — update both Check Progress + Check Mail
- `/daily-report trello progress` — Check Progress card, all items
- `/daily-report trello mail` — Check Mail card, all items

**⚠️ NEVER CREATE TRELLO CARDS OR CHECKLISTS. Cards are auto-created by Trello Power-Up (recurring). Only find the existing card and mark checklist items complete/incomplete. If today's card is not found yet, log it and skip — do not create.**

**CRITICAL: Reuse existing pieces, never duplicate monitoring logic.**
When running `trello progress {item}`, FIRST run the mapped source piece(s), THEN use findings to complete/skip Trello.

**Check Progress — individual items** (`/daily-report trello progress {item}`):

🔴 **Verify against `docs/memory/daily-report/trello/reference_trello_gate_mapping.md` before trusting this table** — it's the curated source of truth; this table has drifted from it before (2026-06-22: this row literally said `aysar → sheets lenh`, which is wrong — Aysar's task-log gate is KhanhHH, not LeNH. Fixed below.).

| Arg | Checklist | Item name | Run piece first |
|------|-----------|-----------|-----------------|
| `maddy` | Normal | Maddy - Carrick/Kai/Luis | `slack xtreme` + `sheets longvv` |
| `blake` | Normal | Blake | **DROPPED 2026-05-11, no longer on board** |
| `johnyi` | Normal | John Yi - Amazing Meds | `slack amazingmeds` + `sheets tuannt` |
| `james` | Should do | James Diamond - Vinn task | `discord airagri` + `sheets phucvt` |
| `franc` | Closely monitor | Franc | `slack rdc` only — ad hoc, no hours expectation, sheets do NOT gate this item |
| `rory` | Closely monitor | Rory | `slack swift` only — sheets do NOT gate this item (LeNH hours only drive the Reminders piece, never block Rory/Franc) |
| `aysar` | Closely monitor | Aysar | `slack baamboozle` (specifically MPDM **C07SQ4HAUHZ**, Carrick's "Today's update" — posts ~17:00-17:45+07, not morning) + **`sheets khanhhh`** (NOT lenh) |
| `elliott` | Closely monitor | Elliott | `slack generator` + `sheets khanhhh` |
| `swift` | Closely monitor | Rory (Swift Studio) | same as `rory` above — Slack only |
| `raymond` | Work | Raymond - LegalAtoms | `slack legalatoms` |
| `marcel` | Work | Marcel | `slack equanimity` |
| `colin` | Work | Colin | `slack aigile` |
| `andrew` | Work | Andrew Taraba | `discord bizurk` |
| `elena` | Work | Elena - SamGuard | `slack samguard` + `elena` |
| `mpfc` | Work | MPFC | `slack mpfc` |
| `bailey` | Work | Bailey | `slack ggs` + `sheets vietph` + `sheets tuannt` (TuanNT 0h-across-5-sheets also gates this) |
| `fountain` | Work | Fountain | `fountain` (full 5-part) |
| `rebecca` | Work | Rebecca (William Bills) | `slack williambills` + `sheets tuannt` |
| `neural` | Work | Neural Contract | `upwork` (workroom 38901192) |
| `philip` | Work | Philip | `node scripts/fetch-msteams-customer-messages.js will "Philip Briggs"` |
| `ohcleo` | Work | Ohcleo | `slack ohcleo` (Piece 12) |

Examples:
- `/daily-report trello progress maddy` → runs `/daily-report slack xtreme`, then completes/skips Maddy
- `/daily-report trello progress fountain` — runs `/daily-report fountain`, then completes/skips Fountain
- `/daily-report trello progress elena` — runs `/daily-report slack samguard`, then completes/skips Elena

**Check Mail — reuse email piece:**
`/daily-report trello mail` → runs `/daily-report email` first, then completes all 6 items.
`/daily-report trello mail {account}` → runs `/daily-report email {account}` first, then completes that item.

**Check Mail — individual items** (`/daily-report trello mail duongdn|carrick|nick|rick|kai|ken`):

| Arg | Item name |
|------|-----------|
| `duongdn` | DuongDn |
| `carrick` | Carrick |
| `nick` | Nick |
| `rick` | Rick |
| `kai` | Kai |
| `ken` | Ken |

Examples:
- `/daily-report trello mail duongdn` — complete DuongDn item only
- `/daily-report trello mail rick` — complete Rick item only

**Completion rule:** No alert from monitoring source → complete the item. Alert found → leave incomplete, note in report.

**Auto-complete card rule:** After updating any checklist item(s), re-fetch the card's full checklist state (`GET /1/cards/{cardId}/checklists?checkItems=all`). If ALL items across ALL checklists are `complete` → mark the card done: `PUT /1/cards/{cardId}?dueComplete=true`. Applies to both "Check mail" and "Check progress" cards.

**Special items:**
- **Fountain**: complete ONLY if all 5 parts checked and clean
- **Rebecca (William Bills)**: do NOT complete if TuanNT col P = "Chưa"
- **LegalAtoms**: filter Nick-specific content only (ignore unrelated channel noise)

**Report — always append to daily report:**
```
## Trello [progress|mail] [item] — {HH:MM} (+07:00)
- {item}: ✓ complete / ⚠️ skipped ({reason})
```

---

## Piece 9 — Reminders (`/daily-report reminders [developer] [--send-reminder]`)

**Default behavior: print to report only. Do NOT send to Matrix unless `--send-reminder` flag is present.**

Supports individual developer targeting:
- `/daily-report reminders` — print 0h devs to report (no Matrix send)
- `/daily-report reminders --send-reminder` — print + actually send to Matrix
- `/daily-report reminders lenh` — LeNH only (print only)
- `/daily-report reminders lenh --send-reminder` — LeNH only + send
- `/daily-report reminders phucvt` — PhucVT only (print only)
- `/daily-report reminders tuannt` — TuanNT only (print only)
- `/daily-report reminders longvv` — LongVV only (print only)

Find developers with COMBINED 0h across all sheets on the reporting day, no leave note.

**Message (only used when `--send-reminder` present):**
```
Hi {name}, task log for {date} is missing (0h logged). Please update when you can. Thanks!
```

**Developer rooms:**

| Developer | Arg | Matrix Room |
|-----------|------|-------------|
| PhucVT | phucvt | `!kzyLVmJxcRESoTkfnY:nustechnology.com` |
| LeNH | lenh | `!OIrgPraJWrcDTnRVLQ:nustechnology.com` |
| LongVV | longvv | `!bvdwOOxprsKJBTjSeQ:nustechnology.com` |
| TuanNT | tuannt | `!knbJbIKzXRJNGVFQNg:nustechnology.com` |

**Skip if:** developer has COMBINED > 0h across all sheets, is on confirmed leave, or it's early morning (< ~10 AM).

**Report — always append to daily report:**
```
## Reminders [developer|all] — {HH:MM} (+07:00)
- {name}: needs reminder (0h, no leave) [sent / not sent — use --send-reminder to send]
- {name}: skipped (on leave / has hours)
```

---

## Piece 10 — Matrix (`/daily-report matrix`)

**Script:** `node scripts/fetch-matrix-daily.js [--room <roomId>] [--since <ISO8601>]`

**Time window:** `daily_report.last_run` from `config/.monitoring-timelines.json` (default fallback: yesterday 08:00 +07:00)

**Rooms:** ALL joined rooms — discovered dynamically via `/_matrix/client/v3/joined_rooms`. No hardcoded list. Sorted alphabetically by display name. Use `--room "!roomId:..."` to target a single room.

**Thread handling (critical):** Script fetches timeline events AND calls `/_matrix/client/v3/rooms/{roomId}/relations/{eventId}/m.thread` for any thread root with `unsigned.relations.m.thread.count > 0`. Thread replies appear indented under their root (`└`). Never ignore threaded messages — replies in threads are often the actual status updates.

**What to look for:**
- Dev confirming task completion or flagging a blocker
- Customer or manager messages in Fountain / Elena rooms
- Absence, leave, or delay notices

**Token failure:** If Matrix returns 401/403, run `DISPLAY=:1 node scripts/matrix-token-refresh.js` first. Never report expired as a skip reason.

**Two-step flow:**

**Step 1 — Run script** (fetches raw messages):
```
node scripts/fetch-matrix-daily.js
```
Script writes raw messages to `reports/YYYY-MM-DD/matrix-rooms-HHMM.md` and prints to stdout:
- Compact summary line (active rooms, message count, file path)
- ⚠️ action items block (messages directed at duongdn auto-detected by regex)

**Step 2 — Claude summarizes** (read raw file, rewrite with per-room summaries):
- Read `matrix-rooms-HHMM.md` (raw message dump from script)
- For each active room: write 2–5 bullet summary (what happened, who said what, any blockers/alerts)
- Overwrite the file with the summarized version — do NOT keep raw messages in it

**Action item detection:** Script flags messages matching "a Dương / anh Dương / @duongdn / duongdn / mày" + action verb. ⚠️ suffix on flagged lines, warning block at end of stdout. These surface in the daily-report block — do NOT miss them.

**Report — append to daily-report. Use this exact structure:**
```
## Matrix — {HH:MM} (+07:00)

**Active rooms: {N} / {total} | Messages: {N}** *(since {date} {HH:MM})*
Full details: reports/YYYY-MM-DD/matrix-rooms-HHMM.md

### ⚠️ Action items for DuongDN ({N})

| Room | Time | Message |
|------|------|---------|
| {RoomName} | {HH:MM} | {sender}: "{exact quote}" — {brief context} ⚠️/{status} |
```
*(If no action items, omit the table and header.)*

```
### Key updates

**{ProjectName} — {one-line summary}** ({time if relevant}):
- {concise bullet — what happened, who, outcome}
- {second bullet if needed}

**{ProjectName} — {one-line summary}**:
- {bullet}

**Other:**
- {ProjectA}: {1-line}
- {ProjectB}: {1-line}
```

**Format rules:**
- Action items table: use **exact message quotes** (not paraphrases), include room + time + sender
- Key updates: one bold header per project with bullets — NOT a room-by-room table
- Each bullet: max 1–2 lines, concise grammar (sacrifice grammar for concision)
- Never paste raw message dumps — always summarize
- Resolved items: mark ✅ inline (e.g. "fixed 16:05 ✅")
- Room details stay in separate `matrix-rooms-HHMM.md` — never copy full message lists to daily-report

---

## Piece 11 — Re-check Incomplete Items (`/daily-report recheck [item]`)

**Purpose:** After a cron run, some Trello items may be ○ (incomplete) due to token failures, script bugs, or false 0h alerts. This piece re-runs only the failing sources and tries to complete the remaining items.

**Triggered automatically** when `/daily-report` is run interactively and today's report already exists. Also triggered explicitly via `/daily-report recheck [item]` for a single item.

Supports individual item targeting:
- `/daily-report recheck` — re-check ALL ○ incomplete items
- `/daily-report recheck [item]` — re-check one item (same args as `trello progress`, e.g. `rory`, `fountain`, `james`)

### Flow

**Step 1 — Read Trello state**
```
GET /1/cards/{cardId}/checklists?key=...&token=...
```
- Find "Check progress" card by name on board `O83pAyqb`
- Collect ALL ○ incomplete items across ALL checklists
- If targeting a single item, only process that one

**Step 2 — Decrypt configs**
```bash
bash scripts/decrypt-secrets.sh
```

**Step 3 — For each ○ item, look up its gate mapping**

Use this table (derived from `docs/memory/daily-report/trello/reference_trello_gate_mapping.md`):

| Trello Item (partial match) | Sources to run | Notes |
|-----------------------------|----------------|-------|
| Maddy | `slack xtreme` + `sheets longvv` | Kai daily report + LongVV hours |
| John Yi | `slack amazingmeds` + `sheets tuannt` | TuanNT combined **5** sheets (JohnYi+Rebecca+Paturevision+Neural+CharlesChang) |
| Bailey | `slack ggs` + `sheets vietph` + `sheets tuannt` | TuanNT 0h (across all 5 sheets) gates Bailey too |
| James Diamond / Vinn | `discord airagri` | Vinn daily report (check BOTH #airagri_webapp and #airagri-flutter) |
| Rory | `slack swift` only | Slack-only gate — sheets lenh does NOT block this item |
| Franc | `slack rdc` only | Ad hoc, no hours expectation — sheets lenh does NOT block this item |
| Aysar | Baamboozle MPDM **C07SQ4HAUHZ** (Carrick's update, posts ~17:00-17:45+07) + `sheets khanhhh` | NOT sheets lenh — Aysar's task-log owner is KhanhHH |
| Elliott | `slack generator` + `sheets khanhhh` | KhanhHH 0h-across-4-sources gates this |
| MPFC | `slack mpfc` | No Slack activity = OK → complete |
| Marcel | `slack equanimity` | Marcel/Carrick alert |
| Elena - SamGuard | `slack samguard` + `elena` | Elena PRs + deploy |
| Raymond | `slack legalatoms` | Nick mentions only |
| Neural Contract | Neural Upwork workroom 38901192 | Silence = never alert → complete |
| Rebecca | `slack williambills` + `sheets tuannt` | TuanNT 0h (across all 5 sheets) gates Rebecca too |
| Colin | `slack aigile` | No activity = OK → complete |
| Andrew Taraba | `discord bizurk` DM "animeworld" | Check nuscarrick DM |
| Fountain | `fountain` (full 5-part) | Must fix Matrix token first |
| Philip | `node scripts/fetch-msteams-customer-messages.js will "Philip Briggs"` | Full name required |
| Ohcleo | `slack ohcleo` | Piece 12 |
| Philip | MS Teams `will` account → "Philip Briggs" | Complaint/unresolved request |

**Step 4 — Decrypt + fix auth before re-running**

Before running any Slack/Matrix/Discord source:
- **Amazing Meds / Equanimity xoxc:** run refresh scripts proactively
  - `node scripts/slack-xoxc-refresh-amazingmeds.js`
  - `node scripts/slack-xoxc-refresh-equanimity.js`
- **Matrix (Fountain):** verify token → if expired run `DISPLAY=:1 node scripts/matrix-token-refresh.js`
- **Discord:** verify token with 3-step check (users/@me → guilds → channels) before assuming invalid

**Step 5 — Re-run each failing source**

Run the mapped source pieces sequentially (not parallel — fewer resources, no race). For each source:
- Use the **same logic** as the corresponding piece (Slack uses `search.messages`, Sheets uses PREV_DATE tokens, etc.)
- Sheets re-scan: always use PREV_DATE (yesterday), NOT today — same day tokens are all 0h. **On Monday, PREV_DATE should resolve to Friday (last workday), not Sunday.**
- **For every dev: scan ALL 11 Google Sheets + ALL Workstream projects** (see [[feedback_dev_project_mapping_flexible]] + [[reference_workstream]]). Never pre-limit which sources to check.
- TuanNT: if combined > 0h across all sources → no alert. Blocks John Yi+Rebecca+Bailey Trello items. Show per-source breakdown.
- KhanhHH: new sources have surfaced 3 times in 2 months — treat any shortfall with extra suspicion, exhaust all sources before flagging.
- LeNH: filter col G="LeNH" in each sheet. Any shortfall even <1h without leave = alert. Aysar sheet owner is KhanhHH, not LeNH.
- LongVV: alert only on weekly total < 16h. 0h any single day is normal.

**Step 6 — Complete or keep incomplete**

For each item:
- No alert from re-run → `PUT /cards/{cardId}/checkItem/{itemId}?state=complete`
- Alert found → keep ○, note reason in report
- 0h dev + reminder sent → complete (reminder IS the action)
- Neural silence / Cloudflare block → complete (never an alert)

**Step 7 — Append to daily report**

Append a timestamped section:
```markdown
## Re-check — {HH:MM} (+07:00)

| Item | Result | Details |
|------|--------|---------|
| Rory | ✓ completed | LeNH 4h found on re-scan |
| Fountain | ○ still incomplete | #2615 890% over-est still growing |
| James Diamond | ○ still incomplete | Vinn no daily report confirmed |
| Rebecca | ✓ completed | TuanNT false alarm — 8h in Paturevision |
...

**Cleared:** {list}
**Still open:** {list}
```

### Rules for Re-check

- **Never re-run email** — email is already done and Trello mail items are handled separately
- **Never mark an item complete without actually running its source** — use the gate mapping, not assumptions
- **All-sources rule (ALL devs):** Scan ALL 11 Google Sheets + ALL Workstream projects for every developer. Filter by col G = dev name. Never pre-assume which sources a dev uses — assignments change without notice.
- **TuanNT gate:** Any source with hours → combined > 0h → no alert → complete John Yi+Rebecca+Bailey Trello items.
- **KhanhHH extra caution:** 3 new sources discovered in 2 months — treat any shortfall as suspect until all sources exhaustively verified.
- **LeNH stricter:** Even <1h shortfall without leave = alert. Aysar sheet owner = KhanhHH (not LeNH).
- **Aysar MPDM:** Use correct epoch for the current year when calling `conversations.history` — wrong epoch returns 2025 data
- **Fountain:** If Matrix token was expired during cron, fix it first, then fetch W{n} plan from `!EWnVDAxbTGsBxPkaaI:nustechnology.com` going back to Monday morning (08:30-09:30 window)
- **Log findings clearly:** state what was checked, what was found, and why each item was completed or kept open

### ⚠️ ALSO fill in missing data from cron failures

**Recheck is NOT only about Trello items.** After fixing Trello, scan the existing report for any section that has placeholder/failure text, and re-run those sources to supply real data:

| Report text that means data is missing | Action |
|----------------------------------------|--------|
| "BLOCKED", "token expired", "session expired" | Refresh token, re-fetch actual data, overwrite the section |
| "All sessions expired", "headless re-login failed" | Re-run login script, fetch actual data |
| "script error", "Data unreliable" | Re-run the script, replace with real output |
| "cached plan (Jun X)" | Fetch real data from the source |
| "login failed", "CAPTCHA required" | Try alternate login, or document as genuinely unresolvable after 2 attempts |

**For each missing-data section:**
1. Identify the source (Upwork, Matrix, Sheets, etc.)
2. Refresh auth (run refresh script)
3. Re-run the fetch
4. Overwrite that section in the report with real data
5. If after 2 genuine attempts the data is still unavailable, write: `{Source}: data unavailable — {brief non-auth reason}. Manual check: {command}`

**Never leave "BLOCKED", "session expired", or "all sessions expired" in the final report.** These are internal failures — fix them silently or document the actual blocker (e.g., "Upwork Cloudflare challenge — requires browser login outside cron window").

---

## Full Run (`/daily-report`)

**Step 0 — Always determine mode first:**

```bash
TZ='Asia/Ho_Chi_Minh' date  # get current UTC+7 date
ls reports/{YYYY-MM-DD}/daily-report.md 2>/dev/null && echo EXISTS || echo NEW
```

| Condition | Mode |
|-----------|------|
| `--cron` flag | Cron mode (sequential inline, always full run) |
| Report file does NOT exist for today | Full run (all 12 pieces) |
| Report file EXISTS for today | **Recheck mode** (Piece 11 — re-check ○ incomplete items only) |

Recheck mode is the default when re-running — no flag needed. If the user explicitly says "full re-run" or "refresh all", do a full run regardless.

---

**If `--cron` flag present** — sequential inline (NO subagents, NO parallel):
0. **ALWAYS run `TZ='Asia/Ho_Chi_Minh' date` first** to get the current UTC+7 date/time. The cron fires at 22:00 UTC = 05:00 UTC+7 NEXT day — so TODAY (UTC+7) is always one day ahead of the UTC date. NEVER infer the current time or date from `last_run` — that is only the monitoring window start, not now.
1. Read configs + timelines + memory
2. Run inline: Email → Slack → Discord → Scrin.io → Sheets → Fountain → Elena → Trello → Reminders → **Matrix** → **OhCleo Slack**
3. Write report to `reports/{UTC+7 today}/daily-report.md` — **FORMAT MUST MATCH manual runs** (see below)
4. Update `daily_report.last_run` + `alert.last_run` to current UTC+7 time in timelines

**Cron report format (MANDATORY — same as interactive runs):**

```markdown
# Daily Report — YYYY-MM-DD (Weekday)

**Run:** {ISO timestamp} (cron)
**Window:** {start} → {end}
**Leave plan:** {any known leave for the day}

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | {source} | {alert description} |
...

**Today ({Mon DD}):** {any staff leave/WFH summary}

---

## Email — all — {HH:MM} (+07:00)
...
```

Rules:
- `⚠️ ALERTS SUMMARY` table MUST appear before any section content — collect all alerts from all pieces and number them
- If zero alerts: write `No alerts.` under the header
- Email table MUST have columns: `Account | Emails | Alerts | Calendar today`
- Each section ends with: `Trello: {item} ✓ complete / ⚠️ skipped ({reason})`
- Staff summary line under ALERTS SUMMARY shows leave, WFH, or "all present"
5. **Git commit + push** (inline, fix errors automatically):
   ```bash
   git add reports/{today}/ config/.monitoring-timelines.json
   git add -u
   git commit -m "auto: {today} {HH:MM}"
   git pull --rebase origin master
   git push
   ```
   If push fails: read the error, fix it (e.g. `git rebase --skip`, `git rebase --abort && git merge origin/master -X ours`, resolve conflicts), then push again. Keep retrying until push succeeds or 3 attempts exhausted.

**Normal (interactive terminal), report does NOT exist** — parallel agents, full run:
1. Read configs + timelines + memory
2. Launch parallel: Email + Slack + Discord + Scrin.io + **OhCleo Slack** (Piece 12)
3. Launch parallel: Sheets + Fountain + Elena + **Matrix** (Piece 10)
4. Update Trello (Piece 8) based on all findings
5. Piece 9: identify 0h devs, print to report (only send if `--send-reminder` flag passed)
6. Write report to `reports/{YYYY-MM-DD}/daily-report.md`
7. Update `daily_report.last_run` + `alert.last_run` in timelines

**Normal (interactive terminal), report already EXISTS** — recheck mode (Piece 11):
1. Run Piece 11 directly — no full re-run of all sources
2. Git commit + push after completing

---

## Piece 12 — OhCleo Slack (`/daily-report slack ohcleo`)

**Workspace:** ohcleo.slack.com | **Account:** tony@nustechnology.com (Chrome Profile 25)
**Script:** `node scripts/slack-fetch-ohcleo.js --since {last_run_iso}`
**Token type:** xoxc + d cookie (URL-encoded). Stored in `config/.slack-accounts.json` (workspace: OhCleo).

**Members (small workspace — 4 total):**
| User ID | Name | Role |
|---------|------|------|
| U0B6EF611FC | Tony | Our dev (LongVV) |
| U01AJ6W6QSZ | Celine Fierro | Customer / admin |
| U08HHC6JA6P | David Nguyen | Previous developer |
| USLACKBOT | Slackbot | Bot |

**Channels to monitor:**
| Channel | ID | What to look for |
|---------|----|-----------------|
| DM: Celine Fierro | D0B6846UN8K | Customer questions, bug reports, scope changes, daily report from Tony |
| #events-code | C01JDPN0EDQ | App event/error logs posted by backend (mostly dormant since 2023) |

**Token refresh:** If `invalid_auth` → re-extract from Chrome Profile 25 LevelDB:
```bash
strings "/home/nus/.config/google-chrome/Profile 25/Local Storage/leveldb/000136.log" \
  | grep -o '"token":"xoxc-[^"]*"' | head -1
```
Or run: `node scripts/slack-extract-ohcleo-token.js` (extracts from live Chrome profile, saves to config).
**Key:** `d` cookie MUST be URL-encoded (`encodeURIComponent`) in Cookie header — raw value contains `+`/`/` that break auth.

**What to flag:**
- New messages from Celine → customer communication (always include verbatim in report)
- Tony's daily report present → note time + summary
- Tony's daily report absent → alert (same as other devs)
- Production errors in #events-code → flag as alerts
- Celine asking about feature status / bug reports → alert

**Trello item:** "Ohcleo" (Work checklist, "Check progress" card) — confirmed present as of 2026-06-22. Complete it if no alerts found above.

**Method:** `conversations.history` (NOT `search.messages`) — xoxc tokens don't support search API.
```bash
node scripts/slack-fetch-ohcleo.js --since {YYYY-MM-DDTHH:MM:SS}
```

**Report — append to daily report:**
```
## OhCleo Slack — {HH:MM} (+07:00)
| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | N | {summary} |
| #events-code | N | {summary} |
{Tony daily report: [present at HH:MM] / [ABSENT — alert]}
{Customer messages verbatim if any.}
{Alerts if any.}
```

---

## Piece 13 — Arthur / Meta-Stamp (`/daily-report arthur`)

**Not a standard client piece — not gated by any Trello item, not part of Full Run.** Run only when explicitly requested (`/daily-report arthur`) or via `/me:arthur-monitor` alias. Manual/on-demand only, never cron. Language: **Vietnamese always** — user cannot read English well and most raw client messages are in English. Full background/history: `docs/memory/daily-report/matrix/feedback_arthur_metastamp_four_part_check.md` and the one-time full deep-dive `reports/2026-07-07/arthur-metastamp-full-review.md` (project origin 2026-04-29 through 2026-07-07 — never re-read that far back again, only incremental from here).

**5 sources, every run:**
| # | Source | ID | Notes |
|---|--------|-----|-------|
| 1 | Matrix — "Arthur - Meta-Stamp" | `!BEXEdVUmvWclPLELFf:nustechnology.com` | Business/demo discussion |
| 2 | Matrix — technical setup room (no display name) | `!QEbdvaMJkTurMpRPIX:nustechnology.com` | Repo/docker/credential sharing |
| 3 | Slack "Solid Code" — Arthur DM | `mpdm-art_k--jack--namtv-1` (`C0B0BG90AUB`) | Original relationship DM, mostly historical |
| 4 | Slack "Solid Code" — `ms-v3` | `C0B4G8USU3D` | Main technical channel, highest volume |
| 5 | Slack "Solid Code" — `msv3-official` | `C0BEPFBLGJV` | Chris's channel |

**Slack auth:** `config/.slack-accounts.json`, workspace `Solid Code`, `auth_type: session` (xoxc+cookie) — use `conversations.history`, NOT `search.messages`. IDs: Art K=`UM1UZ0ZST`, Jack=`UM28B3P9C`, Chris Coyne=`U0BEFAQ9D0T`, David Tran (shared identity — namtv/PhucVT/DuongDN all post as this)=`U0B1C5QAZA4`, Nick=`U0B474QBKP1` (= TienND, confirmed).

**Matrix auth:** `config/.matrix-config.json`, use the `homeserver` field (NOT `chat_url` — that's the web client, wrong API base). Token is short-lived — refresh via `DISPLAY=:1 node scripts/matrix-login.js` immediately before fetching, same command block. Room IDs need `encodeURIComponent()`.

**GitHub (PR/commit status):** `gh auth token -h github.com -u davidztv` — already has access to `Christebob/Meta_Stamp_V3` (private). Check `pulls?state=all` AND `commits?since=...` — repo currently has 0 open PRs, all work direct-to-`main`, so PR list alone misses everything.

**Workstream (est/actual):** project "Crystal lang", `projectId=cmqezgh7z080hp81vo5yqd24z`, roster DuongDN/PhucVT/TienND. ⚠️ **API bug:** `GET /review/week?projectId=...&date=...` returns `403 Forbidden` for the week's start date (or +2 days) — always query with a date from the back half of the target week or you'll wrongly conclude 0h logged.

**Flow:**
1. Read `arthur_monitor.last_run` from `config/.monitoring-timelines.json` (under `refresh` or top-level — see Key Config Files). Fetch only messages after that timestamp from all 5 sources.
2. Load the tracker table from the most recent `reports/*/arthur-monitor.md` (or the original full report if this is the first incremental run).
3. Update rows in place (status + last-updated) based on new messages — never rewrite the whole table. Add new rows only for genuinely new issues. Only mark ✅ on explicit user confirmation in chat; agent-observed "looks resolved" is 🟢 at most.
4. Every row keeps a `Link Slack` column (permalink via `chat.getPermalink`) — this lives in the SAME table, never a separate links section.
5. Write **new** file: `reports/{today}/{HHMM}-arthur-monitor.md`.
6. Update `arthur_monitor.last_run` in timelines.

**Report format:**
```
# Arthur / Meta-Stamp V3 — Cập nhật {ngày} (từ {last_run} đến {now})

## Tóm tắt nhanh
{2-4 câu — có gì mới đáng chú ý}

## Chi tiết mới (nếu có)
{Chỉ phần MỚI — không lặp lại lịch sử cũ. Trích dẫn nguyên văn, giải thích chi tiết không chung chung.}

## BẢNG THEO DÕI (cập nhật từ lần trước)
{full tracker table, carried forward + updated, with Link Slack column}

## Câu hỏi cần anh xác nhận/quyết định
{any new or still-open questions}
```

**Rules:** Never re-summarize full project history, only what's new. If nothing new on a source, say so briefly. See [[feedback_read_full_room_transcript_not_grep_snippets]] — read actual messages, don't grep-and-assume.

---

## Key Rules (All Pieces)

- Slack (13 standard workspaces): always `search.messages`, never `conversations.history`
- OhCleo Slack (Piece 12): use `conversations.history` — xoxc token doesn't support search API
- Slack `after:` excludes named date → use `after:{day_before}` + epoch filter
- IMAP `SINCE` uses server dates → always search previous day, filter by Date header
- Discord: verify token with 3-step curl before assuming invalid
- **ABSOLUTE RULE — ZERO TOLERANCE:** NEVER write "token expired", "session expired", "UNAVAILABLE", "manual login needed", "auth failed", "blocked" for ANY source. These are internal problems — fix silently, get real data, then write report. Reporting auth failures is a repeat violation.
- Matrix: if token fails → run `node scripts/matrix-token-refresh.js` (tries refresh_token API first, no browser). If still fails (both expired) → run `node scripts/matrix-device-auth.js` (device-code, no browser — shows URL to approve on any device). NEVER report expired.
- Upwork: if session expired → try `DISPLAY=:1 node scripts/upwork-login.js --login --account=carrick` once (headless re-login). If CAPTCHA/2FA blocks it: write `Upwork: session expired — manual re-auth needed; run upwork-login.js --login` in the report and **complete Rory/Neural/Aysar Trello items** (session failure ≠ alert). Upwork auth: requires visible browser outside cron. NEVER leave items ○ just because Upwork session expired.
- Slack session tokens: auto-refresh via crumb+POST if invalid_auth. Never report as expired.
- GitHub: `duongdn` for Elena, `nusken` for Precognize (never nuscarrick for these)
- Alert = do NOT complete Trello item
- Nick (Global Grazing) ≠ Nick/TuanNT (Amazing Meds) — always specify project
- 0h on unfilled days → show as "—", not "0h" in report
- Workstream `needsReview` (reviewStatus=Pending) → ALERT addressed to that project's real `isReviewer`-flagged member(s) (via `/pinfo/projects/{id}`, NOT the roster Manager/Tech Lead role), not the dev — see Piece 4. Fountain excluded per user instruction.
