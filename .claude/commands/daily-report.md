---
description: Morning daily report — full automated scan of all monitoring sources
---

# Daily Report

Full morning scan across all monitoring sources. Run once per morning (~8 AM).

**Output:** `./reports/{YYYY-MM-DD}/daily-report.md`
**Partial runs:** When run with a piece argument (e.g. `email`, `slack`), append the results as a new timestamped section to the existing daily report. Never skip writing results just because it's a partial run.
**Timeline:** Uses `daily_report.last_run` from `config/.monitoring-timelines.json` as window start. After completing all sources, update both `daily_report.last_run` and `alert.last_run` to current time.

---

## Quick Reference — Run by Piece

| Command | What it checks | When to use |
|---------|---------------|-------------|
| `/daily-report` | Everything (full run) | Morning |
| `/daily-report email` | All 6 email accounts | Re-check all email |
| `/daily-report email duongdn` | duongdn@ only | Re-check one account |
| `/daily-report email carrick` | carrick@ only | Re-check one account |
| `/daily-report email rick` | rick@ only | Re-check one account |
| `/daily-report email nick` | nick@ only | Re-check one account |
| `/daily-report email kai` | kai@ only | Re-check one account |
| `/daily-report email ken` | ken@ only | Re-check one account |
| `/daily-report slack` | 13 Slack workspaces | Re-check Slack only |
| `/daily-report discord` | AirAgri + Bizurk | Re-check Discord only |
| `/daily-report sheets` | All Google Sheets task logs | Re-check developer hours |
| `/daily-report scrin` | Scrin.io time tracking (TuanNT/John Yi) | Re-check Scrin only |
| `/daily-report fountain` | Fountain 5-part (Matrix + Sheets + Trello board) | Re-check Fountain only |
| `/daily-report elena` | Elena GitHub PRs + deploy + Redmine + Matrix announce | Handle new Elena PRs |
| `/daily-report trello` | Update Check Progress + Check Mail cards | Re-run Trello completions |
| `/daily-report reminders` | Send Matrix task log reminders to devs with 0h | Afternoon reminder run |

---

## Piece 1 — Email (`/daily-report email [account]`)

Supports individual account targeting:
- `/daily-report email` — check all 6 accounts
- `/daily-report email duongdn` — check duongdn@ only
- `/daily-report email carrick` — check carrick@ only
- `/daily-report email nick` — check nick@ only
- `/daily-report email rick` — check rick@ only
- `/daily-report email kai` — check kai@ only
- `/daily-report email ken` — check ken@ only

**Accounts:** 6 in `config/.email-accounts.json`

| Account | Password | Filter | Folder |
|---------|----------|--------|--------|
| duongdn@nustechnology.com | rtYVkk1jmreE | none | INBOX |
| carrick@nustechnology.com | SNUp3Q3WAy76 | none | INBOX |
| nick@nustechnology.com | iHWa82WJ3q5Q | John Yi | INBOX |
| rick@nustechnology.com | ij3s9L8AQz0Z | Kunal / Fountain / InfinityRose | INBOX |
| kai@nustechnology.com | JFDn4fsHiU0m | Madhuraka | INBOX |
| ken@nustechnology.com | WY60fEDrTfXM | Precognize/development | NewsLetter |

**Method:** IMAP SSL port 993, imap.zoho.com. SINCE `{previous_day}`, filter Date header >= `daily_report.last_run`.

**What to look for:**
- duongdn@: leave requests, New Relic alerts
- carrick@: Redmine bug notifications for Generator/Elliott
- nick@: anything from John Yi
- rick@: Rollbar/BugSnag **production** alerts for Fountain, InfinityRoses
- kai@: Jira/Madhuraka mentions
- ken@: Precognize GitHub PR activity

**Trello — after checking:**
- Find "Check mail" card by name on board `O83pAyqb`
- Mark the checklist item(s) for the checked account(s) complete: `PUT /cards/{id}/checkItem/{itemId}?state=complete&key=...&token=...`
- If checking a single account → complete only that account's item
- If checking all → complete all 6 items

**Report — always append to daily report:**
Append a timestamped section to `reports/{YYYY-MM-DD}/daily-report.md`:
```
## Email [account|all] — {HH:MM} (+07:00)
| Account | Count | Summary |
...
{Alerts if any.}
Trello: {account} item ✓ complete.
```

---

## Piece 2 — Slack (`/daily-report slack`)

**Workspaces:** 13 in `config/.slack-accounts.json`

| Workspace | Token type | Key check |
|-----------|-----------|-----------|
| Baamboozle | xoxp | General activity |
| RDC - FM Monitoring | xoxp | dmetiner updates |
| Swift Studio | xoxp | Carrick activity |
| Xtreme Soft Solutions | xoxp | **Kai daily report** (search: "progress", "daily report" from kai) |
| SAM GUARD - Mobile | xoxp | Elena/DP activity |
| Global Grazing Services | xoxp | **Nick daily report in #maintenance** (NOT TuanNT) |
| Amazing Meds | xoxc+cookie | General activity. Auto-refresh if invalid_auth. |
| Generator | xoxp | Elliott/Violet activity, release coordination |
| LegalAtoms | xoxp | Nick-specific mentions/DMs only (filter noise) |
| MyPersonalFootballCoach | xoxp | General activity |
| William Bills | xoxp | Oliver/Lucas tasks |
| Equanimity | xoxc+cookie | **Carrick/Marcel alerts**. Auto-refresh if invalid_auth. |
| SoCal Auto Wraps | xoxp | General activity |
| Aigile Dev | xoxp | General activity |

**Method:** `search.messages` API with `after:{day_before_cutoff}` + epoch filter (NOT `conversations.history`)
**Session tokens (Amazing Meds, Equanimity):** Auto-refresh via crumb extraction if invalid_auth — never just report expired.

**Trello:** See Check Progress mappings in `docs/daily-report-workflow.md`. Complete items where no alerts found.

---

## Piece 3 — Discord (`/daily-report discord`)

**Accounts:** 2 in `config/.discord-accounts.json`
- nusvinn → AirAgri only (NOT HOMIEAPP)
- nuscarrick → Bizurk only

**Before using:** Verify each token with 3-step check (users/@me → guilds → channels). Fix if invalid — never just report expired.

**Key checks:**
- AirAgri: **Vinn daily report** + **Jeff daily report** (channels: airagri_webapp, airagri-flutter)
- Bizurk: General activity

**Snowflake filter:** Convert `daily_report.last_run` epoch → Discord snowflake: `(epoch*1000 - 1420070400000) << 22`

---

## Piece 4 — Google Sheets (`/daily-report sheets`)

**Service account:** `config/daily-agent-490610-7eb7985b33e3.json`
**Week:** Use Summary tab to find current W{n}. Today's date determines the week.

| Developer | Sheet ID | Min hours | Notes |
|-----------|----------|-----------|-------|
| LongVV | 1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58 | 8h/day | Nghỉ nửa ngày = 4h OK |
| PhucVT | 1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI | 8h/day | Nghỉ nửa ngày = 4h OK |
| TuanNT (John Yi) | 1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ | 8h/day combined | Splits across 3 projects |
| TuanNT (Rebecca) | 1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4 | — | Check col P: "Chưa" = not written (normal, not alert) |
| VietPH | 1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg | 8h/day | Nghỉ cả ngày = 0h OK |
| KhanhHH | 1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM | 8h/day | Nghỉ cả ngày = 0h OK |
| LeNH (Rory) | 1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8 | 8h/day combined | Sum all 3 projects |
| LeNH (Franc) | 1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ | — | Part of LeNH split |
| LeNH (Aysar) | 1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8 | — | Part of LeNH split |
| Fountain | 1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o | — | Used by `/daily-report fountain` |

**Rules:**
- "Nghỉ cả ngày" = full day off → 0h OK
- "Nghỉ nửa ngày" = half day → 4h min OK
- 0h with no leave note → ALERT
- Only count "Task dự án" rows; skip "Part-time" rows in column A

---

## Piece 5 — Scrin.io (`/daily-report scrin`)

**Config:** `config/.scrin-config.json`
**Company:** john yi (ID 266977) | **Employee:** Nick / TuanNT (ID 453601)

**Method:**
1. POST `https://scrin.io/login` with `__RequestVerificationToken` + email + password
2. Extract `apiToken` from page (`var apiToken = "..."`)
3. POST `/api/v2/GetReport` with `X-SSM-Token` header, `isYesterday: true`

**Rule:** TuanNT task log (John Yi) hours ≤ Scrin.io hours = OK (not over-inflated). Compare John Yi log ONLY — not TuanNT's total across all projects.

---

## Piece 6 — Fountain (`/daily-report fountain`)

Full 5-part check. All 5 parts are mandatory — never skip any.

**Part 1 — Matrix Plan**
- Room: `!EWnVDAxbTGsBxPkaaI:nustechnology.com`
- Fetch latest weekly plan message: "Em update plan tuần này ạ\nViTHT: Xh\nThinhT: Xh\nVuTQ: Xh\n=> QC X"
- Cite @sender + timestamp
- If token expired → run `scripts/matrix-token-refresh.js` (uses `tmp/matrix-browser-profile/` SSO). Save new token to `config/.matrix-config.json` immediately.

**Part 2 — Task Log Actuals**
- Sheet: `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`, Summary tab, W{n}
- Devs: ViTHT, ThinhT, VuTQ, HaVS | QC: PhatDLT, HungPN, TrinhMTT
- Report per-dev weekly totals

**Part 3 — Plan vs Actual Table**
- Compare each dev's plan (from Matrix) vs actual (from sheets)
- Never say "matches plan" without showing the numbers

**Part 4 — Capacity & Runway**
- "Est vs Charged" tab: sum remaining est for Not Started + In-progress only
- Runway = remaining / 90h per week (current dev capacity)
- Show delta vs previous report

**Part 5 — Over-Estimate Tracking**
- Tasks where actual > est (+20% threshold)
- Key tasks to always check: #2595, #2615, #2735
- Flag if STILL GROWING vs previous report

**Trello Board (Fountain)**
- Board: Web Development (`5475eaf923a9a1309357eb51`), Rick's account
- Customer comments: filter `commentCard` from kunalsheth, tmmckay, mike62798179, iris63293413
- Active card counts per list
- Stuck cards: `dateLastActivity` > 5 days
- Hard-to-release: in Doing 14+ days without reaching Done

---

## Piece 7 — Elena (`/daily-report elena`)

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

---

## Piece 8 — Trello (`/daily-report trello`)

**Cards:** Find by NAME each time (IDs change daily):
- "Check progress" → 4 checklists (Normal, Should do, Closely monitor, Work)
- "Check mail" → 1 checklist (1 item per email account)

**Completion rule:** No alert from monitoring source → complete the item. Alert found → leave incomplete, note in report.

**Special items:**
- **Fountain**: complete ONLY if all 5 parts checked and clean
- **Rebecca (William Bills)**: do NOT complete if TuanNT col P = "Chưa"
- **LegalAtoms**: filter Nick-specific content only (ignore unrelated channel noise)

Run after all sources have been checked (or run inline after each source during a full run).

---

## Piece 9 — Reminders (`/daily-report reminders`)

Send Matrix reminders to developers with 0h logged on a workday with no leave note.

**Message:**
```
Hi {name}, task log for {date} is missing (0h logged). Please update when you can. Thanks!
```

**Developer rooms:**

| Developer | Matrix Room |
|-----------|-------------|
| PhucVT | `!kzyLVmJxcRESoTkfnY:nustechnology.com` |
| LeNH | `!OIrgPraJWrcDTnRVLQ:nustechnology.com` |
| LongVV | `!bvdwOOxprsKJBTjSeQ:nustechnology.com` |
| TuanNT | `!knbJbIKzXRJNGVFQNg:nustechnology.com` |

**Skip if:** developer is on confirmed leave, or it's early morning (< ~10 AM) on the same day.

---

## Full Run (`/daily-report`)

Runs all 9 pieces in order. Uses parallel agents where possible:

1. Read configs + timelines + memory
2. Launch parallel: Email + Slack + Discord + Scrin.io
3. Launch parallel: Sheets + Fountain + Elena
4. Update Trello (Piece 8) based on all findings
5. Send reminders (Piece 9) for any 0h devs
6. Write report to `reports/{YYYY-MM-DD}/daily-report.md`
7. Update `daily_report.last_run` + `alert.last_run` in timelines

---

## Key Rules (All Pieces)

- Slack: always `search.messages`, never `conversations.history`
- Slack `after:` excludes named date → use `after:{day_before}` + epoch filter
- IMAP `SINCE` uses server dates → always search previous day, filter by Date header
- Discord: verify token with 3-step curl before assuming invalid
- Matrix: if token fails → run `scripts/matrix-token-refresh.js` (browser profile). Never report as expired.
- Slack session tokens: auto-refresh via crumb+POST if invalid_auth. Never report as expired.
- GitHub: `duongdn` for Elena, `nusken` for Precognize (never nuscarrick for these)
- Alert = do NOT complete Trello item
- Nick (Global Grazing) ≠ Nick/TuanNT (Amazing Meds) — always specify project
- 0h on unfilled days → show as "—", not "0h" in report
