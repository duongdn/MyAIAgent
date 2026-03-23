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

Each run reads its own `last_run` as the start of the monitoring window. End = current time. After run completes, update `last_run` and `output_file` for that timeline only. **Never touch the other timelines.**

### Alert Monitor Config

- Interval: `ALERT_INTERVAL` in `.env` (default: 10 min)
- Work hours only: Mon-Fri 8AM-8PM
- Desktop notifications: `scripts/desktop-notify.js` (cross-platform: Linux notify-send, macOS osascript)
- Only HIGH/CRITICAL severity triggers notification
- Session cron: `CronCreate */10 * * * 1-5` (auto-expires after 7 days)
- Persistent cron: `scripts/daily-alert-cron.sh` (add to system crontab)

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

1. **Monitor Email** — 6 accounts in `.email-accounts.json`
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
- Rory → ???
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
     Devs: ViTHT, ThinhT, VuTQ, HaVS. QC: PhatDLT, HungPN. Sheet: `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`. Complete ONLY if all 5 parts checked and clean.
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
- `.email-accounts.json` — 6 email accounts
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

- Instance: `madhuraka-godahewa.atlassian.net`
- Auth: Basic auth `email:api_token` (kai@nustechnology.com)
- **Search endpoint changed**: Old `/rest/api/3/search` removed. Use `POST /rest/api/3/search/jql` with JSON body `{"jql":"...","maxResults":N,"fields":[...]}`
- Worklogs: Include `worklog` in fields, filter by `worklogAuthor={accountId}` and date range
- **Pagination trap**: Search results only embed max 20 worklogs per issue. If `worklog.total > worklog.maxResults`, must fetch full worklogs via `GET /issue/{key}/worklog?startAt=N` and paginate through all pages
- Config: `.jira-config.json`

## Report Style

- Slack: channel-level breakdowns with msg count + key content preview
- Discord: per-channel breakdowns with daily reports quoted
- Cross-reference multiple sources when checking (e.g., Discord report vs Google Sheets task log)
- Flag alerts prominently, keep grammar concise
