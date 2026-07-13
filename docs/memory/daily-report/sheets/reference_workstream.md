---
name: reference_workstream
description: "Workstream (workstream.nustechnology.com) — internal time tracking now covering 19 client projects total (17 beyond Maddy/Rebecca, growing — check body for latest). Scripts, API, project IDs."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 291ec938-3434-4d4e-a750-eb13b544adaa
---

# Workstream — workstream.nustechnology.com

Internal task-log system running parallel to Google Sheets. **No longer just Maddy/Rebecca** — as of 2026-07-02 it covers 17 named client projects + Others.

🔴 **Workstream is now PRIORITY/AUTHORITATIVE for hours across ALL projects — user confirmed 2026-07-13: "check hết các dự án đi, chỉ có Bailey là đang không dùng workstream thôi" (check all projects, only Bailey isn't on Workstream).** When Workstream and Sheets disagree for any dev/project, trust Workstream (unless the project is Bailey/Paturevision — see exception below). This supersedes any older per-project "Sheets is primary" framing (e.g. Fountain, which explicitly moved to Workstream — see [[feedback_fountain_kunal_checklist]]).

**Known exception — Bailey/Paturevision:** does NOT use Workstream. Task-log actuals for Bailey (VietPH/TuanNT/DuongDN DEV3) come from the Paturevision Google Sheet only — see [[feedback-bailey-paturevision-billing]]. Don't expect or query a Workstream project for Bailey hours.

## Projects (confirmed via live `GET /time/projects` 2026-07-02 — this is the authoritative list, not the static table)

| Key | Workstream name | Client/alias | Project ID |
|-----|----------------|--------|-----------|
| maddy | Xtreme Soft Solutions | Maddy | `cmpqc1v7v00ahtk1vs1817xt8` |
| rebecca | MissSwimwear | Rebecca Pechey | `cmpqcflkx00litk1vic3vki6j` |
| baamboozle | Baamboozle | Aysar Khalid | `cmqez93ka07q8p81v7035l3td` |
| colin-etz | ETZ - Wathaga | Colin CardWell | `cmqezatb807qvp81vpnzzimmp` |
| blair-brown | **Peptide Clyde** (renamed from "Blair Brown WordPress") | Blair Brown | `cmqj4tj6v01gfm81vgx7ipkov` |
| james-portfolio | Portfolio - James Diamond | James Diamond | `cmqook9vf0kl8m81vusyo8ppt` |
| family-app | Family App | Charles Chang | `cmqezfyzv07z6p81vf403t9lp` |
| generator | Generator | Elliott Bouher | `cmqoou4h10kzum81vovi8rrsk` |
| fountain | Fountain Greetings | Kunal | `cmpqcjojh00q2tk1v2qi7gs0j` |
| **amazing-meds** 🆕 | Amazing Meds | John Yi | `cmqyvio8p003dqo0xo6hpf5zv` |
| **elevate365** 🆕 | Elevate365.AI | Philip Briggs | `cmqyvio7q002pqo0x40bb9os2` |
| **neural-contract** 🆕 | Neural Contract - Test Job | Neural Contract | `cmqyvio6k001vqo0x2wzfn4ka` |
| **radio-data-center** 🆕 | Radio Data Center | Francesca Lo (Franc) | `cmqyvio7z002vqo0x7skarafs` |
| **speedventory** 🆕 | Speedventory | Bailey Joey | `cmqyvio51000vqo0xhocbx5c9` |
| **tokenlite** 🆕 | Tokenlite | Marcel Fuessinger | `cmqyvio4s000pqo0xdajw5n2k` |
| **legalatoms** 🆕 | LegalAtoms | Raymond Huang | `cmqyvio870031qo0xxelwodau` |
| **bxr-app** 🆕 | BXR App | Rory Hackett | `cmqyvio7a002dqo0x54rx6o20` |
| **crystal-lang** 🆕🆕 (found 2026-07-06) | Crystal lang | Arthur (Meta-Stamp) | `cmqezgh7z080hp81vo5yqd24z` — roster: DuongDN (Tech Lead), PhucVT (Developer), TienND (Manager). Untracked — no Trello item yet. |
| **ohcleo** 🆕🆕🆕 (found 2026-07-08) | OhCleo | OhCleo (Celine/Tony) | `cmqgdtr7s0memp81vfste5stp` — same project as Piece 12's OhCleo Slack. LongVV ("Tony") logs hours here now that he's full-time on it. Added to `workstream-fetch-project-week.js` PROJECTS map 2026-07-08. |
| others | Others | NUS | `cmpqae4pd0006qa1wo85fzvji` (returns HTTP 403 for our token — skip) |

🔴 **List grew 10→17+Others, found 2026-07-02** (previous growth: 5→10 on 2026-06-23). "Blair Brown WordPress" was renamed to "Peptide Clyde" in the UI — same project ID, not a new project. The 8 genuinely new projects (Amazing Meds, Elevate365.AI, Neural Contract, Radio Data Center, Speedventory, Tokenlite, LegalAtoms, BXR App) mean **John Yi, Philip, Neural, Franc, Bailey, Marcel, Raymond, and Rory Trello gates — previously treated as Slack-only — may now also need a Workstream cross-check**, the same way Maddy/Rebecca/Aysar/Generator/etc. already do. **This list is NOT exhaustive and will drift again — always live-query before trusting it.**

⚠️ **MANDATORY before flagging ANY dev shortfall/0h:** query `GET {api_base}/time/projects?date={date}` (using YOUR OWN token — returns only projects you're a member of, may also be incomplete) AND cross-check `/review/week?projectId={id}&date={date}` for every ID in the table above, filtering rows by `employeeName`. Do not rely on the static table alone — it has been wrong three times now (2026-05, 2026-06-23, 2026-07-02).

## Scripts

```bash
# Login (run once / when token expires)
DISPLAY=:1 node scripts/workstream-login.js

# Canonical shortfall check — scans ALL sheets + ALL live Workstream projects, no per-dev subset
node scripts/sheets-tasklog-scan.js <YYYY-MM-DD> <dev1> [dev2 ...]

# Fetch week data (single project)
node scripts/workstream-fetch-project-week.js [YYYY-MM-DD] [maddy|rebecca]
```

🔴 **Never write a new dated `daily-sheets-scan-YYMMDD-*.js` script.** That pattern caused the KhanhHH/Generator false-alert to recur on 2026-06-24, one day after first being diagnosed, because the fix applied to one day's copy didn't carry to the next. Old copies archived to `scripts/archive/`. See [[feedback_no_dated_scan_scripts]].

## Config

`config/.workstream-config.json` (encrypted, in decrypt-secrets.sh)
- `access_token` — Keycloak Bearer token (auto-refreshed by login script)
- `api_base` — `https://workstream.nustechnology.com/api`
- `projects` — project IDs for maddy/rebecca

## API

Base: `https://workstream.nustechnology.com/api` (this already includes `/api` — do NOT append another `/api/` prefix, it 404s)
- `{api_base}/review/week?projectId={id}&date={YYYY-MM-DD}` → all member task logs for week
- `{api_base}/time/projects?date={date}` → projects for current user
- `{api_base}/me` → current user info
- `{api_base}/pinfo/projects/{id}?date={YYYY-MM-DD}` → project info page data (customer, tech stack, and `members[]` with per-member `isReviewer`/`needsReview`/`isTechLead`/`isManager` booleans). **This is the authoritative source for who reviews a project's charged hours** — found 2026-07-08, backs the "Info" ⓘ icon page on each project card. Do NOT infer reviewer from `/review/week`'s roster role text (see [[feedback_workstream_needs_review_check]]).

**CORRECTED 2026-06-18:** `workstream-login.js` and `workstream-fetch-project-week.js` both had a double `/api/api/` bug — every call 404'd, so `ensureToken()` always thought the token was expired. Fixed to single-prefix path. If "login failed"/"token expired" shows up again, check for re-introduction of a double `/api/` prefix before assuming a real auth issue.

**2026-07-10:** Confirmed the stored `refresh_token` (has `offline_access` role, ~30yr exp) CANNOT be redeemed server-side — direct `grant_type=refresh_token` POST to `https://auth.nustechnology.com/realms/main/protocol/openid-connect/token` with `client_id=workstream` (or any other `aud` value, or with Origin/Referer headers matching the allowed-origins) always returns `401 unauthorized_client`. The `workstream` Keycloak client only supports the browser-based `authorization_code` flow end-to-end (likely confidential/BFF-proxied token exchange, not a public SPA client) — there is no server-side/headless way to mint a fresh access_token. When the browser-profile SSO cookie itself expires (not just the access_token), a full visible-browser login is the ONLY path, no shortcut. Also fixed: `workstream-login.js`'s auto-SSO wait was hardcoded to 60s (too short for a human to switch windows and type credentials/2FA) — bumped to 5 min (line ~105). If SSO expires again, just relaunch `DISPLAY=:1 node scripts/workstream-login.js` and tell the user to log in within the 5-min window; do not waste time retrying the refresh_token grant.

**2026-07-02 cron failure:** SSO login failed silently in the cron daily-report run (05:01), causing PhucVT and KhanhHH to be falsely reported "0h no leave" (Sheets-only view). Recheck re-ran `workstream-login.js` interactively, succeeded, and found PhucVT 8h (Portfolio-James Diamond) and KhanhHH 3.5h (Generator) — both real. Cron-mode Workstream login may need a retry/backoff since it can't always complete SSO non-interactively.

## Auth

Keycloak SSO: `https://auth.nustechnology.com/realms/main`
- Only `authorization_code` flow supported (no password/device grant for `workstream` client)
- Login opens browser on DISPLAY :1, SSO auto-completes (same realm as Matrix)
- Token valid for ~few hours, auto-refreshed on 401

## Integration

Use in daily/weekly/Monday reports alongside Google Sheets:
- `missingReportDays` → alert if weekday with no client report
- `weekTotal` → actual hours (compare with Sheets for consistency)
- `weekCharged` → billed hours (compare with Upwork)
