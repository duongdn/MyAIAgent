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

| Command | What it checks |
|---------|---------------|
| `/daily-report` | Everything (full run) |
| **Email** | |
| `/daily-report email` | All 6 accounts |
| `/daily-report email duongdn` | duongdn@ only |
| `/daily-report email carrick` | carrick@ only |
| `/daily-report email nick` | nick@ only |
| `/daily-report email rick` | rick@ only |
| `/daily-report email kai` | kai@ only |
| `/daily-report email ken` | ken@ only |
| **Slack** | |
| `/daily-report slack` | All 13 workspaces |
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
| **Discord** | |
| `/daily-report discord` | AirAgri + Bizurk |
| `/daily-report discord airagri` | AirAgri (nusvinn) only |
| `/daily-report discord bizurk` | Bizurk (nuscarrick) only |
| **Google Sheets** | |
| `/daily-report sheets` | All developers |
| `/daily-report sheets longvv` | LongVV only |
| `/daily-report sheets phucvt` | PhucVT only |
| `/daily-report sheets tuannt` | TuanNT (John Yi + Rebecca) only |
| `/daily-report sheets vietph` | VietPH only |
| `/daily-report sheets khanhhh` | KhanhHH only |
| `/daily-report sheets lenh` | LeNH (Rory + Franc + Aysar combined) only |
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
| `/daily-report reminders` | Send Matrix 0h reminders to all devs |
| `/daily-report reminders lenh` | Send reminder to LeNH only |
| `/daily-report reminders phucvt` | Send reminder to PhucVT only |
| `/daily-report reminders tuannt` | Send reminder to TuanNT only |
| `/daily-report reminders longvv` | Send reminder to LongVV only |

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
Trello: {checked account(s)} item ✓ complete.
```

---

## Piece 2 — Slack (`/daily-report slack [workspace]`)

Supports individual workspace targeting:
- `/daily-report slack` — check all 13 workspaces
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

**Workspaces:** 13 in `config/.slack-accounts.json`

| Workspace | Arg | Token type | Key check | Trello item |
|-----------|------|-----------|-----------|-------------|
| Baamboozle | baamboozle | xoxp | General activity | Aysar |
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
| SoCal Auto Wraps | socal | xoxp | General activity | Blake |
| Aigile Dev | aigile | xoxp | General activity | Colin |

**Method:** `search.messages` API with `after:{day_before_cutoff}` + epoch filter (NOT `conversations.history`)
**Session tokens (Amazing Meds, Equanimity):** Auto-refresh via crumb extraction if invalid_auth — never just report expired.

**Trello — after checking:**
- Find "Check progress" card by name on board `O83pAyqb`
- Iterate ALL checklists (Normal, Should do, Closely monitor, Work)
- Complete the item(s) mapped to the checked workspace(s) — only if no alerts found
- If checking a single workspace → complete only that workspace's item
- If checking all → complete all applicable items per workflow rules

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

**Before using:** Verify each token with 3-step check (users/@me → guilds → channels). Fix if invalid — never just report expired.

**Key checks:**
- AirAgri: **Vinn daily report** + **Jeff daily report** (channels: airagri_webapp, airagri-flutter)
- Bizurk: General activity

**Snowflake filter:** Convert `daily_report.last_run` epoch → Discord snowflake: `(epoch*1000 - 1420070400000) << 22`

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
- `/daily-report sheets tuannt` — TuanNT (John Yi + Rebecca combined) only
- `/daily-report sheets vietph` — VietPH only
- `/daily-report sheets khanhhh` — KhanhHH only
- `/daily-report sheets lenh` — LeNH (Rory + Franc + Aysar combined) only

**Service account:** `config/daily-agent-490610-7eb7985b33e3.json`
**Week:** Use Summary tab to find current W{n}. Today's date determines the week.

| Developer | Arg | Sheet ID(s) | Min hours | Notes |
|-----------|------|-------------|-----------|-------|
| LongVV | longvv | 1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58 | 8h/day | Nghỉ nửa ngày = 4h OK |
| PhucVT | phucvt | 1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI | 8h/day | Nghỉ nửa ngày = 4h OK |
| TuanNT (John Yi) | tuannt | 1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ | 8h/day combined | Splits across 3 projects |
| TuanNT (Rebecca) | tuannt | 1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4 | — | Check col P: "Chưa" = not written (normal, not alert) |
| VietPH | vietph | 1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg | 8h/day | Nghỉ cả ngày = 0h OK |
| KhanhHH | khanhhh | 1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM | 8h/day | Nghỉ cả ngày = 0h OK |
| LeNH (Rory) | lenh | 1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8 | 8h/day combined | Sum all 3 sheets |
| LeNH (Franc) | lenh | 1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ | — | Part of LeNH split |
| LeNH (Aysar) | lenh | 1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8 | — | Part of LeNH split |
| Fountain | — | 1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o | — | Used by `/daily-report fountain` |

**Rules:**
- "Nghỉ cả ngày" = full day off → 0h OK
- "Nghỉ nửa ngày" = half day → 4h min OK
- 0h with no leave note → ALERT
- Only count "Task dự án" rows; skip "Part-time" rows in column A

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
**Company:** john yi (ID 266977) | **Employee:** Nick / TuanNT (ID 453601)

**Method:**
1. POST `https://scrin.io/login` with `__RequestVerificationToken` + email + password
2. Extract `apiToken` from page (`var apiToken = "..."`)
3. POST `/api/v2/GetReport` with `X-SSM-Token` header, `isYesterday: true`

**Rule:** TuanNT task log (John Yi) hours ≤ Scrin.io hours = OK (not over-inflated). Compare John Yi log ONLY — not TuanNT's total across all projects.

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

## Piece 7 — Elena (`/daily-report elena [sub]`)

Supports sub-targeting:
- `/daily-report elena` — full flow (PRs + deploy + Redmine + Precognize + WordPress)
- `/daily-report elena prs` — check + merge open PRs only (no deploy)
- `/daily-report elena deploy` — deploy pending merged PRs from `.elena-pending-actions.json`
- `/daily-report elena precognize` — Precognize nusken PRs only
- `/daily-report elena wordpress` — check samguard.co for JS console errors

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
- Use Puppeteer/headless browser to load the page and capture console errors
- Report any JS errors found; no errors = clean
- This is a simple health check, no PR/deploy flow

---

## Piece 8 — Trello (`/daily-report trello [card] [item]`)

Supports card and item-level targeting:
- `/daily-report trello` — update both Check Progress + Check Mail
- `/daily-report trello progress` — Check Progress card, all items
- `/daily-report trello mail` — Check Mail card, all items

**CRITICAL: Reuse existing pieces, never duplicate monitoring logic.**
When running `trello progress {item}`, FIRST run the mapped source piece(s), THEN use findings to complete/skip Trello.

**Check Progress — individual items** (`/daily-report trello progress {item}`):

| Arg | Checklist | Item name | Run piece first |
|------|-----------|-----------|-----------------|
| `maddy` | Normal | Maddy - Carrick/Kai/Luis | `/daily-report slack xtreme` + `/daily-report sheets longvv` |
| `blake` | Normal | Blake | `/daily-report slack socal` |
| `johnyi` | Normal | John Yi - Amazing Meds | `/daily-report slack amazingmeds` |
| `james` | Should do | James Diamond - Vinn task | `/daily-report discord airagri` |
| `franc` | Closely monitor | Franc | `/daily-report slack rdc` |
| `rory` | Closely monitor | Rory | `/daily-report slack swift` |
| `aysar` | Closely monitor | Aysar | `/daily-report slack baamboozle` |
| `elliott` | Closely monitor | Elliott | `/daily-report slack generator` |
| `swift` | Closely monitor | Rory (Swift Studio) | `/daily-report slack swift` |
| `raymond` | Work | Raymond - LegalAtoms | `/daily-report slack legalatoms` |
| `marcel` | Work | Marcel | `/daily-report slack equanimity` |
| `colin` | Work | Colin | `/daily-report slack aigile` |
| `andrew` | Work | Andrew Taraba | `/daily-report discord bizurk` |
| `elena` | Work | Elena - SamGuard | `/daily-report slack samguard` |
| `mpfc` | Work | MPFC | `/daily-report slack mpfc` |
| `bailey` | Work | Bailey | `/daily-report slack ggs` |
| `fountain` | Work | Fountain | `/daily-report fountain` |
| `rebecca` | Work | Rebecca (William Bills) | `/daily-report slack williambills` |
| `neural` | Work | Neural Contract | (no mapped source) |

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

## Piece 9 — Reminders (`/daily-report reminders [developer]`)

Supports individual developer targeting:
- `/daily-report reminders` — send to all devs with 0h (no leave)
- `/daily-report reminders lenh` — send to LeNH only
- `/daily-report reminders phucvt` — send to PhucVT only
- `/daily-report reminders tuannt` — send to TuanNT only
- `/daily-report reminders longvv` — send to LongVV only

Send Matrix reminders to developers with 0h logged on a workday with no leave note.

**Message:**
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

**Skip if:** developer is on confirmed leave, or it's early morning (< ~10 AM) on the same day.

**Report — always append to daily report:**
```
## Reminders [developer|all] — {HH:MM} (+07:00)
- {name}: reminder sent to {room} / skipped (on leave)
```

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
