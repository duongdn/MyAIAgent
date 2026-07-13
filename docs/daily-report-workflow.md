# Daily Report Workflow

Three modes:
1. **Daily report** (morning): `reports/YYYY-MM-DD-daily-report.md` — full yesterday summary
2. **On-demand update** (anytime): `reports/YYYY-MM-DD-HHMM-update.md` — latest activity since daily report
3. **Alert monitor** (cron, every N min): `reports/YYYY-MM-DD-HHMM-alert.md` — high-severity alerts with desktop notifications

On-demand updates and alerts use separate timestamped files. Never overwrite the daily report. Tomorrow's daily report still covers the full previous day.

## Three-Timeline System

Stored in `config/.monitoring-timelines.json`. Three **independent** timelines:

1. **`daily_report`** — Updated when daily report runs (~8AM). Used as start time for next daily report. Only daily-report updates this.
2. **`refresh`** — Updated when daily-report-refresh runs. Used as start time for next refresh. Only refresh updates this.
3. **`alert`** — Updated when daily-alert runs (cron). Used as start time for next alert scan. Only daily-alert updates this.

Each run reads its own `last_run` as the start of the monitoring window. End = current time. After run completes, update `last_run` and `output_file` for that timeline only.

**Exception:** When the daily report runs (full scan of all sources), also advance `alert.last_run` to the same time. This prevents the next alert cron from re-scanning the window the daily report already covered. The `refresh` timeline remains independent — only refresh updates it.

### Alert Monitor Config

- Interval: `ALERT_INTERVAL` in `.env` (default: 10 min)
- Work hours only: Mon-Fri 8AM-8PM
- Desktop notifications: `scripts/desktop-notify.js` (cross-platform: Linux notify-send, macOS osascript)
- Only HIGH/CRITICAL severity triggers notification
- Session cron: `CronCreate */10 * * * 1-5` (auto-expires after 7 days)
- Persistent cron: `scripts/daily-alert-cron.sh` (add to system crontab)

## Util Commands (`.claude/commands/util/*`)

`daily-report` (and its siblings `daily-report-refresh`, `daily-alert`) don't reimplement plumbing — they call shared `util:*` commands for anything mechanical. Business logic (what counts as an alert, which sheet maps to which dev) lives in the `me:*`/`store:*` command files; `util:*` only handles "how to do the thing" so it isn't duplicated across 15+ monitoring commands.

| Util | Called from daily-report | What it does |
|------|---------------------------|---------------|
| `/util:read-memory` | First line of the file — **mandatory before anything else** | Reads `docs/memory/MEMORY.md` index, then only the `## Global` section + the section matching the piece being run (e.g. `sheets khanhhh` → only `## daily-report:sheets`, not the other 12). Avoids loading all ~140 memory files every run. **Memory overrides the command file** if they conflict — memory is the live patch layer for bugs found after the command was written. |
| `/util:timeline` | Read at start (window start = `daily_report.last_run`), written at end (`daily_report.last_run` + `alert.last_run`) | Manages `config/.monitoring-timelines.json`. Each job type owns its own independent clock — `daily_report`, `alert`, and `refresh.{source}.{account}` never overwrite each other. This lets `daily-alert` poll every 5-10min without resetting the window `daily-report` will use next morning, and lets a single-piece rerun (`/daily-report sheets khanhhh`) update only that piece's own timestamp instead of the global one. |
| `/util:trello` | Piece 8 (Trello) + every piece's "mark item complete" step | Finds cards/checklist items by **name**, never by ID — Trello Power-Up recreates "Check Progress"/"Check Mail" as new cards daily with new IDs. Rule baked in: alert found → leave item incomplete; clean scan → mark complete; after marking, re-fetch full checklist state and auto-complete the whole card if every item across every checklist is now done. |
| `/util:matrix-send` | Piece 9 (Reminders) sending to devs; Piece 13 (Arthur) posting updates | Wraps `matrix-send-message.js`, which refreshes the token internally before sending. Encodes the project's hardest-won rule here: **never surface a Matrix auth failure to the user or the report** — retry the refresh, then retry the send, silently. |
| `/util:report` | Every piece's final "append to report" step | Fixes the single biggest recurring bug class in this project: date/time must always be computed via `TZ='Asia/Ho_Chi_Minh' date`, never the system's raw UTC clock or a value inferred from conversation context. Cron fires at 22:00 UTC = 05:00 UTC+7 the **next day** — using UTC would silently file the report under yesterday's folder. Also defines the append-only convention (`daily-report.md` = one growing file per day; `{HHMM}-update.md` = new file per refresh, never overwrites the daily one). |
| `/util:google-drive` | Not used by the core daily-report loop — only invoked ad hoc when a report needs archiving to Drive, or when reading a file shared by someone else | Thin wrapper over the `mcp__claude_ai_Google_Drive__*` MCP tools (OAuth session, not the service account). For structured data (Sheets), the service account (`daily-agent-...json`) is used directly instead — more reliable, doesn't depend on the MCP connector's OAuth token staying alive. |
| `/util:notify` | Not used by `daily-report` itself — used by `daily-alert` (the cron-only high-severity sibling) | Desktop notification (`scripts/desktop-notify.js`). `critical` urgency for HIGH/CRITICAL alerts, `low` for the quiet "scan ran, nothing found" confirmation. Kept separate from daily-report because daily-report is a once-a-morning human-facing report, not something that should be popping up notifications piece by piece. |
| `/util:tasklog-write` | Not used by `daily-report` | Only used by `bailey-monitor`/`server-monitor` to self-log their own monitoring time into the Paturevision task-log sheet. Mentioned here only because it lives in the same `util:` folder — daily-report has no equivalent self-logging step. |

**Why split this way:** every `me:*` command used to inline its own Trello-lookup / timeline-read / report-append code, which meant the same bug (e.g. wrong timezone, hardcoded card ID) had to be fixed in 15 places. Pulling the mechanical part into `util:*` means a fix like "always use UTC+7, never system UTC" only has to land once in `util:report`.

## IMPORTANT: Slack Thread Replies & Timestamp Handling

**MUST use `search.messages` API** (requires `search:read` scope) instead of `conversations.history`.
`conversations.history` only returns top-level messages — misses thread replies on older parent messages.

### Slack date query gotchas
- `on:YYYY-MM-DD` only returns messages from that single day
- `after:YYYY-MM-DD` means "after" that day (excludes it)
- To cover a window spanning multiple days (e.g., Mar 19 16:16 → Mar 20 08:50), use `after:{day_before_start}` then filter results by `ts > cutoff_epoch`
- Convert cutoff to epoch: `datetime(Y,M,D,H,M,S, tzinfo=ZoneInfo('Asia/Ho_Chi_Minh')).timestamp()`
- Paginate with `count=100&page=N`

For workspaces without `search:read` (LegalAtoms, session-token workspaces), fall back to `conversations.history` + scan threads with `latest_reply` in date range.

## IMPORTANT: IMAP Email Timestamp Handling

- IMAP `SINCE` command uses **server-interpreted dates** (usually UTC), not local timezone
- For UTC+7: emails arriving after midnight local but before midnight UTC get missed if using today's date
- **Fix:** Always search `SINCE {previous_day}` then filter by parsing the `Date` header with `email.utils.parsedate_to_datetime()`, comparing against the monitoring window start/end
- Example: monitoring window Mar 19 08:00 UTC+7 → now → search `SINCE 18-Mar-2026`, filter `Date >= Mar 19 08:00 UTC+7`

## Checklist Items

1. **Monitor Email + Calendar** — 6 accounts in `.email-accounts.json`. Run both in parallel per account: IMAP inbox scan + today's Zoho Calendar events via CalDAV (`scripts/fetch-zoho-calendar.js`). CalDAV reuses the same app password — no separate OAuth setup.
2. **Monitor Slack** — 13 workspaces in `.slack-accounts.json` (2 use session tokens: Amazing Meds, Equanimity — login fresh before each fetch)
3. **Monitor Discord** — 2 accounts in `.discord-accounts.json` (nusvinn: AirAgri/HOMIEAPP, nuscarrick: Bizurk)
4. **Monitor Web** — samguard.co JS console errors check
5. **Google Docs** — 10 spreadsheets:
   - LongVV (Xtreme Soft, W{week}): min 8h/day
   - PhucVT (James Diamond / AirAgri, W{week}): min 8h/day, 4h OK if "Nghỉ nửa ngày"
   - TuanNT (John Yi / Amazing Meds, W{week}): compare with Scrin.io
   - Fountain (W{week}): compare dev plan (ViTHT, ThinhT, VuTQ) + QC (PhatDLT, HungPN) vs weekly plan from Matrix
   - VietPH (Paturevision, W{week}): min 8h/day
   - TuanNT (John Yi/Amazing Meds, W{week}): compare with Scrin.io. TuanNT = Nick externally
   - TuanNT (Rebecca/William Bills, W{week}): check task log written. TuanNT splits across Bailey+Rebecca+John Yi — sum all 3 for 8h/day check
   - KhanhHH (Elliott/Generator App, W{week}): min 8h/day
   - LeNH (Rory/BXR App, W{week}): LeNH splits across Rory+Franc+Aysar — sum all 3
   - LeNH (Franc/Radio Data Center, W{week}): part of LeNH 3-project split
   - LeNH (Aysar/Baamboozle, W{week}): part of LeNH 3-project split
6. **Scrin.io** — Login + v2 API, company "john yi" (ID 266977), employee 453601. Config in `.scrin-config.json`
7. **Daily Report Checks** — Kai (Xtreme Soft DM), Nick-GG (Global Grazing #maintenance — NOT TuanNT), Jeff & Vinn (AirAgri Discord)
8. **Matrix/Element** — Fountain room. Get latest weekly plan message (format: "Em update plan tuần này ạ\nViTHT: Xh\nThinhT: Xh\nVuTQ: Xh\n=> QC X"), extract per-dev plan hours. Then compare with Fountain task log Summary tab weekly actuals (VuTQ, ThinhT, ViTHT = dev; PhatDLT, HungPN = QC). Output a **plan vs actual table** per developer. Never claim "matches plan" without showing the actual numbers. Config in `.matrix-config.json`
9. **GitHub PRs** — Elena-SamGuard: review+merge+deploy+update Redmine. Precognize: check nusken PRs. Config in `.elena-pending-actions.json`
10. **Redmine** — Update ticket status after deploy. Config in `.redmine-config.json`

## Trello "Check Progress" Card Mappings

**IMPORTANT:** Cards are recurring — find by NAME not ID. Search board for card named "Check progress" and "Check mail" each time. IDs change daily.

### Normal checklist (`69bb3c98d4df1ae12858ffe8`)
- Maddy - Carrick/Kai/Luis → Slack "Xtreme Soft Solutions" + kai@ email. Complete if no alerts.
- Blake → Slack "SoCal Auto Wraps". Complete if no alerts.
- John Yi - Amazing Meds → Google Docs TuanNT vs Scrin.io (docs <= scrin = OK) + nick@ email + Amazing Meds Slack. Complete if all clean.

### Should do checklist (`69bb3c98d4df1ae12858fff0`)
- James Diamond - Vinn task → Discord Vinn/Jeff (AirAgri) + Google Docs PhucVT 8h/day. Complete if reports match task log and hours OK.

### Closely monitor checklist (`69bb3c98d4df1ae12858fff4`)
- Franc → Slack "RDC - FM Monitoring". Complete if no alerts.
- Rory → JIRA (swiftstudio: BXR project, Carrick account) + Google Docs LeNH BXR App sheet. Compare JIRA worklogs vs task log hours. Complete if no mismatch > 2h.
- Aysar → Slack "Baamboozle". Complete if no alerts.
- Elliott → Slack "Generator" + Google Docs KhanhHH 8h/day. Complete if no Slack alerts AND hours OK.
- Rory → Slack "Swift Studio". Complete if no alerts.

### Work checklist (`69bb3c98d4df1ae12858fffe`)
- Raymond - LegalAtoms → Slack "LegalAtoms" **filtered to Nick only** (mentions, DMs, threads involving Nick). Skip unrelated channel noise. Complete if no alerts relevant to Nick.
- Marcel → Slack "Equanimity". Complete if no alerts.
- Colin → Slack "Aigile Dev". Complete if no alerts.
- Andrew Taraba → Discord "Bizurk" (nuscarrick token). Complete if no alerts.
- Elena - SamGuard → Slack "SAM GUARD - Mobile" + GitHub PRs (nustechnology/Elena-SamGuard-Digital-Plant: review+merge+deploy+Redmine update; Precognize/development: check nusken PRs). Complete if no alerts and PRs handled.
- MPFC → Slack "MyPersonalFootballCoach" + WhatsApp (manual). Complete if no Slack alerts.
- Bailey → Slack "GLOBAL GRAZING SERVICES" + Google Docs VietPH (Paturevision W{week}) 8h/day. Complete if no alerts and hours OK.
- Fountain → **MANDATORY 5-part check** (never skip any):
     1. **Matrix plan**: Fetch weekly plan from Fountain room, cite @sender + timestamp
     2. **Task log actuals**: Fountain Summary tab W{n}, per-developer weekly totals
     3. **Plan vs Actual table**: Compare each dev's plan vs actual, flag mismatch
     4. **Capacity & Runway**: "Est vs Charged" tab — remaining est, runway at dev capacity, delta vs previous report
     5. **Over-estimate tracking**: Tasks where actual > est +20%, compare with previous report (growing vs stable). Key: #2595, #2615
     **Plus Trello board:** Customer comments, active task counts, stuck tasks (>5d), hard-to-release (>14d in Doing)
     Devs: ViTHT, ThinhT, VuTQ, HaVS. QC: PhatDLT, HungPN. Sheet: `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`. Complete ONLY if all 5 parts checked and clean.
     **VALIDATION GATE:** Before finalizing daily report, verify Fountain section contains ALL 5 parts + Trello board. If ANY part missing, run Fountain agent before declaring report complete. This has been missed multiple days — NEVER skip again.
- Rebecca (William Bills) → Slack "William Bills" + Google Docs TuanNT task log (Rebecca sheet). Complete if no Slack alerts AND TuanNT task log confirmed (not "Chưa").
- Neural Contract → Email search "Carrick" + keyword "Neural". Complete if no alerts.

### Pending checklist (`69bb3c98d4df1ae128590014`)
TBD

## Trello "Check Mail" Card

Find by name "Check mail" on board. Items map 1:1 to email accounts. Complete each after checking.

## Name Disambiguation

**"Nick" appears in multiple contexts — they are DIFFERENT people:**

| Name | Internal | Project | Context |
|------|----------|---------|---------|
| Nick (Global Grazing) | NUS employee (not TuanNT) | Global Grazing Services | Posts daily reports in #maintenance, manages Prestashop |
| Nick (Amazing Meds) | **TuanNT** | John Yi / Amazing Meds | Developer, external name "Nick". Also works on Rebecca/William Bills + Paturevision |
| Nick (Scrin.io) | **TuanNT** | Same as above | Scrin.io employee name = "Nick", company = "john yi" |

**NEVER conflate these two Nicks.** When reporting leave/absence, always specify which Nick by including the project name.

Other shared names:
- **Lucas** = William Bills developer (works with Oliver)
- **Carrick** = NUS account used across many Slack workspaces (Baamboozle, Swift Studio, Generator, etc.)

## Post-Report: Task Log Reminder

After daily report is generated, if a developer has **0h logged and is NOT on confirmed leave**, send a reminder via Matrix to their room.

Message format: `"Hi {name}, task log for {date} is missing (0h logged). Please update when you can. Thanks!"`

### Developer Matrix Rooms

| Developer | Project | Matrix Room ID |
|-----------|---------|---------------|
| PhucVT | James Diamond | `!kzyLVmJxcRESoTkfnY:nustechnology.com` |
| LeNH | Rory/Franc/Aysar | `!OIrgPraJWrcDTnRVLQ:nustechnology.com` |
| LongVV | Xtreme Soft | `!bvdwOOxprsKJBTjSeQ:nustechnology.com` |
| TuanNT | John Yi/Rebecca/Bailey | `!knbJbIKzXRJNGVFQNg:nustechnology.com` |

Add more rooms as they are provided. Skip developers on confirmed leave or adhoc projects (Marcel).

## Key Rules

- **Task log hours <= Scrin.io hours** = OK (no hour inflation)
- **"Nghỉ nửa ngày"** = half-day off, 4h minimum acceptable
- **"Nghỉ cả ngày"** = full day off, 0h acceptable
- **Off reason**: default = "use paid leave". Check Notes column (K) for non-default reasons, only report if different.
- If no alerts from monitoring source → complete the Trello item
- If alert found → do NOT complete, flag in report for user review

## Config Files

- `.slack-accounts.json` — 13 Slack workspaces with tokens
- `.discord-accounts.json` — 2 Discord accounts with tokens
- `.email-accounts.json` — 6 email accounts (IMAP + CalDAV credentials — same app password for both)
- `.web-monitors.json` — Web monitoring targets
- `.google-docs.json` — Google Sheets monitor config
- `.scrin-config.json` — Scrin.io login + API config
- `.trello-config.json` — Trello API keys + board/card/checklist IDs
- `.matrix-config.json` — Matrix/Element homeserver + room configs (Fountain)
- `.redmine-config.json` — Redmine API key + status IDs
- `.elena-pending-actions.json` — Elena-SamGuard deploy tracking (PRs merged/blocked)
- `daily-agent-490610-7eb7985b33e3.json` — Google Service Account key

## Slack Session Token Refresh (Amazing Meds, Equanimity)

These use xoxc/xoxd tokens that expire. Auto-refresh via HTTP POST:
1. GET workspace root URL, extract crumb from `data-props` JSON
2. POST email/password + crumb to root URL
3. Extract xoxc from HTML, xoxd from `d` cookie
4. Use `Accept-Encoding: gzip, deflate` (no brotli)

Login credentials stored in `.slack-accounts.json` under `login` field.

## Scrin.io API

- Login: POST to scrin.io/login with __RequestVerificationToken + Email + Password
- API: POST to /api/v2/GetReport with X-SSM-Token header, use `isYesterday: true` flag
- apiToken extracted from page after login (var apiToken = "...")

## Fountain Trello Monitoring

Board: "Web Development" (`5475eaf923a9a1309357eb51`) — uses Rick's Trello account (`rick570`).
Config in `.trello-config.json` under `fountain` key.

Daily checks:
1. **New customer comments** — filter `commentCard` actions, identify customer members (kunalsheth, tmmckay, mike62798179, iris63293413) vs team (rick570)
2. **Active task counts** — count cards in To-Do, Bugs, Doing, QC Internal, QA Backlog, In QA, Not passed
3. **Stuck tasks** — cards in active status with `dateLastActivity` > 5 days. Flag with days count.
4. **Hard to release** — cards that entered Doing 14+ days ago but never reached Done. Check card actions `updateCard:idList` to trace list movement history. Flag cards that bounce between statuses.

API: `https://api.trello.com/1/` with `key={fountain.api_key}&token={fountain.token}`

## Matrix/Element API

- Homeserver: `https://matrix.nustechnology.com`
- Chat UI: `https://chat.nustechnology.com`
- Auth: `Authorization: Bearer {access_token}` header
- Fetch messages: `GET /_matrix/client/v3/rooms/{roomId}/messages?dir=b&limit=50`
- Filter by date: parse `origin_server_ts` (ms epoch) from response
- Look for weekly plan message format: "Em update plan tuần này ạ\nViTHT: Xh\nThinhT: Xh\nVuTQ: Xh\n=> QC X"

### Matrix Token Auto-Refresh

Access tokens expire every 5 minutes. Before any Matrix API call:
1. Try the request with current `access_token`
2. If 401 `M_UNKNOWN_TOKEN` → refresh using OIDC:
   ```
   POST {token_endpoint}
   Content-Type: application/x-www-form-urlencoded
   client_id={oidc_client_id}&grant_type=refresh_token&refresh_token={refresh_token}
   ```
3. Response gives new `access_token` + new `refresh_token` (rotation!)
4. **Update both tokens in `.matrix-config.json`** immediately
5. Retry the original request with new access token

## Redmine API

- URL: `https://redmine.nustechnology.com`
- Auth: `X-Redmine-API-Key` header
- Get issue: `GET /issues/{id}.json`
- Update status: `PUT /issues/{id}.json` with `{"issue":{"status_id":N,"notes":"..."}}`
- Key statuses: 10=Deployed, 13=Deployed on Staging, 15=Tested on Local, 20=Deployed on Live

## Elena-SamGuard Deploy Flow

1. Review open PRs in `nustechnology/Elena-SamGuard-Digital-Plant` (use `duongdn` gh account)
2. Check CodeRabbit reviews for high-risk issues
3. If safe → merge PR
4. SSH to MayBanServer: `cd projects/Elena/Elena-SamGuard-Digital-Plant/process-digital-plant && git pull origin process-digital-plant`
5. Build: `nvm use 22 && npx ng build --configuration development`
6. If Redmine ticket → update status to "Deployed" (status_id=10)
7. If DP-xxx ticket → track in `.elena-pending-actions.json`
8. **Announce to Matrix room "Elena - Digital Plant"** (`!kyArBadvcbfPIpIxpD:nustechnology.com`):
   - **On deploy:** summary of merged PRs with GitHub links + "Check result: https://process-digital-plant2.nusdev.net/"
   - **On review fail:** notify room with PR link + reason (CodeRabbit high-risk flags or manual concerns)
9. Check Precognize/development for nusken PRs (use `nusken` gh account)

## GitHub Account Mapping

**IMPORTANT:** Default `nuscarrick` account CANNOT access Elena or Precognize repos. Always use per-repo tokens:

```bash
# Elena-SamGuard — MUST use duongdn
GH_TOKEN=$(gh auth token -h github.com -u duongdn) gh api repos/nustechnology/Elena-SamGuard-Digital-Plant/...

# Precognize — MUST use nusken
GH_TOKEN=$(gh auth token -h github.com -u nusken) gh api repos/Precognize/development/...
```

- `nuscarrick` — default account (other repos)
- `duongdn` — Elena-SamGuard-Digital-Plant access
- `nusken` — Precognize/development access
- SSH key `~/.ssh/duongdn_github/id_rsa` — Elena repo SSH access
- SSH key `~/.ssh/ken/id_rsa` — Precognize repo SSH access

## JIRA API

Two instances — config: `.jira-config.json`

| Instance | URL | Auth email | Used for |
|----------|-----|------------|---------|
| madhuraka | `madhuraka-godahewa.atlassian.net` | kai@nustechnology.com | Maddy (LongVV) — projects LIFM2, TP, XS |
| swiftstudio | `swiftstudio.atlassian.net` | carrick@nustechnology.com | Rory (LeNH/Carrick) — project BXR |

- **Search endpoint**: `POST /rest/api/3/search/jql` with JSON body `{"jql":"...","maxResults":N,"fields":[...]}`
- **Worklogs**: Include `worklog` in fields, filter by `worklogAuthor={accountId}` and date range
- **Pagination trap**: Search results only embed max 20 worklogs per issue. If `worklog.total > worklog.maxResults`, fetch full worklogs via `GET /issue/{key}/worklog?startAt=N` and paginate
- **Mismatch threshold**: Flag if JIRA vs Google Docs differ > 2h

## Report Style

- Slack: channel-level breakdowns with msg count + key content preview
- Discord: per-channel breakdowns with daily reports quoted
- Cross-reference multiple sources when checking (e.g., Discord report vs Google Sheets task log)
- Flag alerts prominently, keep grammar concise
