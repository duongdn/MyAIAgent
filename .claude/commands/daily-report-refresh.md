---
description: On-demand refresh of all monitoring sources (Slack, Discord, Email, Matrix, GitHub, etc.)
---

# Daily Report Refresh

On-demand re-scan since the last check. Generates a **separate timestamped file** — never overwrites the daily report.

**Output:** `./reports/{YYYY-MM-DD}/{HHMM}-update.md`
**Partial runs:** When run with a piece argument, still write/append results to the update file. Create the file if it doesn't exist yet; append a new section if it does.

**Timeline — per-source timestamps (CRITICAL):**
Each piece/account has its own `last_run` in `config/.monitoring-timelines.json`. This prevents gaps when pieces run at different times.

Window start lookup order (for a given source/account):
1. `refresh.{source}.{account}.last_run` — e.g. `refresh.email.carrick.last_run`
2. `refresh.{source}.last_run` — e.g. `refresh.slack.baamboozle.last_run`
3. `refresh.last_run` — global fallback
4. `daily_report.last_run` — if global refresh is stale (>1 day)

After completing a piece: update ONLY that piece's own `last_run`.
- Single account: update `refresh.email.carrick.last_run`
- All email: update all 6 `refresh.email.*.last_run`
- Full refresh: update `refresh.last_run` AND all individual `refresh.*.last_run`

---

## Quick Reference — Run by Piece

| Command | What it checks |
|---------|---------------|
| `/daily-report-refresh` | Everything since last refresh |
| **Email** | |
| `/daily-report-refresh email` | All 6 accounts |
| `/daily-report-refresh email duongdn` | duongdn@ only |
| `/daily-report-refresh email carrick` | carrick@ only |
| `/daily-report-refresh email nick` | nick@ only |
| `/daily-report-refresh email rick` | rick@ only |
| `/daily-report-refresh email kai` | kai@ only |
| `/daily-report-refresh email ken` | ken@ only |
| **Slack** | |
| `/daily-report-refresh slack` | All 13 workspaces |
| `/daily-report-refresh slack baamboozle` | Baamboozle only |
| `/daily-report-refresh slack rdc` | RDC - FM Monitoring only |
| `/daily-report-refresh slack swift` | Swift Studio only |
| `/daily-report-refresh slack xtreme` | Xtreme Soft Solutions only |
| `/daily-report-refresh slack samguard` | SAM GUARD - Mobile only |
| `/daily-report-refresh slack ggs` | Global Grazing Services only |
| `/daily-report-refresh slack amazingmeds` | Amazing Meds only |
| `/daily-report-refresh slack generator` | Generator only |
| `/daily-report-refresh slack legalatoms` | LegalAtoms only |
| `/daily-report-refresh slack mpfc` | MyPersonalFootballCoach only |
| `/daily-report-refresh slack williambills` | William Bills only |
| `/daily-report-refresh slack equanimity` | Equanimity only |
| `/daily-report-refresh slack socal` | SoCal Auto Wraps only |
| `/daily-report-refresh slack aigile` | Aigile Dev only |
| **Discord** | |
| `/daily-report-refresh discord` | AirAgri + Bizurk |
| `/daily-report-refresh discord airagri` | AirAgri (nusvinn) only |
| `/daily-report-refresh discord bizurk` | Bizurk (nuscarrick) only |
| **Google Sheets** | |
| `/daily-report-refresh sheets` | All developers |
| `/daily-report-refresh sheets longvv` | LongVV only |
| `/daily-report-refresh sheets phucvt` | PhucVT only |
| `/daily-report-refresh sheets tuannt` | TuanNT (John Yi + Rebecca) only |
| `/daily-report-refresh sheets vietph` | VietPH only |
| `/daily-report-refresh sheets khanhhh` | KhanhHH only |
| `/daily-report-refresh sheets lenh` | LeNH (Rory + Franc + Aysar combined) only |
| **Scrin.io** | |
| `/daily-report-refresh scrin` | TuanNT/John Yi time tracking |
| **Fountain** | |
| `/daily-report-refresh fountain` | Full 5-part check |
| `/daily-report-refresh fountain matrix` | Part 1 — Matrix plan only |
| `/daily-report-refresh fountain sheets` | Part 2+3 — Task log actuals + plan vs actual |
| `/daily-report-refresh fountain runway` | Part 4 — Capacity & runway only |
| `/daily-report-refresh fountain overest` | Part 5 — Over-estimate tracking only |
| `/daily-report-refresh fountain trello` | Trello board only (customer comments, stuck cards) |
| **Elena** | |
| `/daily-report-refresh elena` | Elena PRs + deploy + Redmine + Precognize |
| `/daily-report-refresh elena prs` | Check + merge open PRs only (no deploy) |
| `/daily-report-refresh elena deploy` | Deploy already-merged PRs pending deploy |
| `/daily-report-refresh elena precognize` | Precognize nusken PRs only |
| **Trello** | |
| `/daily-report-refresh trello` | Both cards, all items |
| `/daily-report-refresh trello progress` | Check Progress, all items |
| `/daily-report-refresh trello progress maddy` | Maddy - Carrick/Kai/Luis |
| `/daily-report-refresh trello progress blake` | Blake |
| `/daily-report-refresh trello progress johnyi` | John Yi - Amazing Meds |
| `/daily-report-refresh trello progress james` | James Diamond - Vinn task |
| `/daily-report-refresh trello progress franc` | Franc |
| `/daily-report-refresh trello progress rory` | Rory |
| `/daily-report-refresh trello progress aysar` | Aysar |
| `/daily-report-refresh trello progress elliott` | Elliott |
| `/daily-report-refresh trello progress swift` | Rory (Swift Studio) |
| `/daily-report-refresh trello progress raymond` | Raymond - LegalAtoms |
| `/daily-report-refresh trello progress marcel` | Marcel |
| `/daily-report-refresh trello progress colin` | Colin |
| `/daily-report-refresh trello progress andrew` | Andrew Taraba |
| `/daily-report-refresh trello progress elena` | Elena - SamGuard |
| `/daily-report-refresh trello progress mpfc` | MPFC |
| `/daily-report-refresh trello progress bailey` | Bailey |
| `/daily-report-refresh trello progress fountain` | Fountain |
| `/daily-report-refresh trello progress rebecca` | Rebecca (William Bills) |
| `/daily-report-refresh trello progress neural` | Neural Contract |
| `/daily-report-refresh trello mail` | Check Mail, all 6 items |
| `/daily-report-refresh trello mail duongdn` | DuongDn only |
| `/daily-report-refresh trello mail carrick` | Carrick only |
| `/daily-report-refresh trello mail nick` | Nick only |
| `/daily-report-refresh trello mail rick` | Rick only |
| `/daily-report-refresh trello mail kai` | Kai only |
| `/daily-report-refresh trello mail ken` | Ken only |
| **Reminders** | |
| `/daily-report-refresh reminders` | Send Matrix 0h reminders to all devs |
| `/daily-report-refresh reminders lenh` | Send reminder to LeNH only |
| `/daily-report-refresh reminders phucvt` | Send reminder to PhucVT only |
| `/daily-report-refresh reminders tuannt` | Send reminder to TuanNT only |
| `/daily-report-refresh reminders longvv` | Send reminder to LongVV only |

---

## Piece 1 — Email (`/daily-report-refresh email [account]`)

Window = `refresh.email.{account}.last_run` → now. Report only NEW emails since last refresh.

Accounts: duongdn, carrick, nick (filter: John Yi), rick (filter: Kunal/Fountain/InfinityRose), kai (filter: Madhuraka), ken (folder: NewsLetter, filter: Precognize/development)

**Method:** IMAP SINCE `{day_before_account_last_run}`, filter Date header >= `refresh.email.{account}.last_run`

**Report:** Append timestamped section to `reports/{YYYY-MM-DD}/{HHMM}-update.md`. Create if it doesn't exist; append if it does. ALWAYS write — even if 0 new emails.

After completing: update `refresh.email.{account}.last_run` (single account) or all 6 (all email). Complete that account's "Check mail" Trello item.

---

## Piece 2 — Slack (`/daily-report-refresh slack [workspace]`)

Window = `refresh.slack.{workspace}.last_run` → now. Report only NEW messages.

**Method:** `search.messages` with `after:{day_before_workspace_last_run}` + epoch filter `ts > workspace_last_run_epoch`

**Also check:** Nick-GG daily report if not yet confirmed today. Kai daily report if not yet confirmed.

Session tokens (Amazing Meds, Equanimity): auto-refresh via crumb+POST if invalid_auth — never report as expired.

**Report:** Append timestamped section to `reports/{YYYY-MM-DD}/{HHMM}-update.md`. ALWAYS write — even if no new messages.

After completing: update `refresh.slack.{workspace}.last_run` (single) or all 14 (all slack). Complete that workspace's "Check progress" Trello item if no alerts.

---

## Piece 3 — Discord (`/daily-report-refresh discord [server]`)

Window = `refresh.discord.{server}.last_run` → now. AirAgri + Bizurk only (NOT HOMIEAPP). Verify tokens before using.

**Report:** Append timestamped section to `reports/{YYYY-MM-DD}/{HHMM}-update.md`. ALWAYS write — even if no new messages.

After completing: update `refresh.discord.{server}.last_run` (single) or both (all discord). Complete that server's Trello item if no alerts.

---

## Piece 4 — Google Sheets (`/daily-report-refresh sheets [developer]`)

Window = `refresh.sheets.{developer}.last_run` → now. Re-check developer hours vs what daily report already showed. Only flag changes:
- New hours logged (good news)
- Still 0h at afternoon (≥ 13:00) with no leave → escalate

**Report:** Append timestamped section to `reports/{YYYY-MM-DD}/{HHMM}-update.md`. ALWAYS write — even if no changes.

After completing: update `refresh.sheets.{developer}.last_run` (single) or all 6 (all sheets).

---

## Piece 5 — Scrin.io (`/daily-report-refresh scrin`)

Window = `refresh.scrin.last_run` → now. Re-fetch TuanNT's today tracked hours. Compare with John Yi task log. Show delta vs morning.

**Report:** Append timestamped section to `reports/{YYYY-MM-DD}/{HHMM}-update.md`. ALWAYS write.

After completing: update `refresh.scrin.last_run`.

---

## Piece 6 — Fountain (`/daily-report-refresh fountain [part]`)

Window = `refresh.fountain.last_run` → now. Full 5-part check — all 5 parts mandatory when running without sub-arg. Focus on what changed since last check:
- New W{n} actuals (devs logging hours)
- #2615, #2735, #2595 — are they still growing?
- New customer Trello comments
- Runway delta vs previous

If Matrix token fails → run `scripts/matrix-token-refresh.js` immediately. Never report as expired.

**Report:** Append timestamped section to `reports/{YYYY-MM-DD}/{HHMM}-update.md`. ALWAYS write.

After completing: update `refresh.fountain.last_run`.

---

## Piece 7 — Elena (`/daily-report-refresh elena [sub]`)

Window = `refresh.elena.last_run` → now. Check for new PRs merged or opened since last refresh.

For each undeployed merged PR in `config/.elena-pending-actions.json`:
1. Deploy to MayBanServer
2. Update Redmine if applicable
3. Announce to Matrix "Elena - Digital Plant" room

Check Precognize for nusken PRs.

**Report:** Append timestamped section to `reports/{YYYY-MM-DD}/{HHMM}-update.md`. ALWAYS write.

After completing: update `refresh.elena.last_run`.

---

## Piece 8 — Trello (`/daily-report-refresh trello [card] [item]`)

Re-evaluate checklist items based on refresh findings. Complete any items where alerts resolved since morning. Items already completed stay completed — only update incomplete ones.

**Check Progress item → Trello item name mapping:**

| Arg | Checklist | Item name |
|-----|-----------|-----------|
| maddy | Normal | Maddy - Carrick/Kai/Luis |
| blake | Normal | Blake |
| johnyi | Normal | John Yi - Amazing Meds |
| james | Should do | James Diamond - Vinn task |
| franc | Closely monitor | Franc |
| rory | Closely monitor | Rory |
| aysar | Closely monitor | Aysar |
| elliott | Closely monitor | Elliott |
| swift | Closely monitor | Rory (Swift Studio) |
| raymond | Work | Raymond - LegalAtoms |
| marcel | Work | Marcel |
| colin | Work | Colin |
| andrew | Work | Andrew Taraba |
| elena | Work | Elena - SamGuard |
| mpfc | Work | MPFC |
| bailey | Work | Bailey |
| fountain | Work | Fountain |
| rebecca | Work | Rebecca (William Bills) |
| neural | Work | Neural Contract |

**Check Mail item → account mapping:** duongdn, carrick, nick, rick, kai, ken

---

## Piece 9 — Reminders (`/daily-report-refresh reminders [developer]`)

Send Matrix reminders to developers still at 0h by afternoon (≥ 13:00) with no leave note. Skip devs already reminded today.

| Developer | Matrix Room |
|-----------|-------------|
| PhucVT | `!kzyLVmJxcRESoTkfnY:nustechnology.com` |
| LeNH | `!OIrgPraJWrcDTnRVLQ:nustechnology.com` |
| LongVV | `!bvdwOOxprsKJBTjSeQ:nustechnology.com` |
| TuanNT | `!knbJbIKzXRJNGVFQNg:nustechnology.com` |

---

## Full Refresh (`/daily-report-refresh`)

1. Read configs, timelines, memory
2. Read today's daily report + any previous update files
3. Each source uses its own `refresh.{source}.{account}.last_run` as window start (fall back chain: source → global → daily_report)
4. Launch parallel agents: Slack + Fountain + Email+Discord+GitHub + Sheets+Scrin
5. Compare all findings — highlight only NEW/CHANGED items
6. Update Trello items where applicable
7. Write `reports/{YYYY-MM-DD}/{HHMM}-update.md`
8. Update `refresh.last_run` AND all individual `refresh.*.last_run` to now

---

## Key Rules

- NEVER overwrite the daily report file
- Only report NEW items since last check
- **Per-source timestamps:** Each piece uses its own `refresh.{source}.{account}.last_run` — never use global `refresh.last_run` for a partial run. Update only the piece's own timestamp after completing.
- Slack: `search.messages` only, never `conversations.history`
- Discord: AirAgri + Bizurk only (NOT HOMIEAPP)
- Matrix token fails → fix via `scripts/matrix-token-refresh.js`. Never report as expired.
- Slack session tokens fail → auto-refresh via crumb+POST. Never report as expired.
- Alert found = do NOT complete Trello item
- Scrin.io: compare with John Yi task log ONLY, not TuanNT total
- 0h for unfilled → show as "—" not "0h"
- Over-estimate tasks: flag if STILL GROWING vs previous report, not just over threshold
