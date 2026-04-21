# Daily Report — Tue 2026-04-21 (08:27 +07)

**Window:** Mon 2026-04-20 08:40 → Tue 2026-04-21 08:27 +07
**Pieces:** email, slack, discord, sheets, scrin, fountain, elena, upwork — all complete

---

## Critical Alerts

| Severity | Alert | Source | Owner |
|---|---|---|---|
| HIGH | **Equanimity/Marcel urgent escalation** — client re xid-technologies 24hr gate rule "make it urgent", "paying 50% more" (08:05–08:06 today) — needs Carrick response | slack/equanimity | Carrick |
| MEDIUM | **FountainFE production ICU errors** — `TypeError: Failed to initialize NumberFormat` (#869/#870/#871, 3× 21:32–00:40) likely Node/Intl ICU incompatibility | email/rick | Fountain dev |
| MEDIUM | **Fountain runway 1.11 wk** @ new W23 plan (142h/wk, +58% vs W22) — backlog flat at 158.25h NS+IP | fountain | PM |
| MEDIUM | **Fountain Bugs list +5** (7→12 cards) day-over-day — new bug intake without drain | fountain/trello | Dev |
| MEDIUM | **New Relic (carrick+colin alias)** not syncing data — reauth/reconnect needed (recurring from 04-20) | email/carrick | Ops |
| MEDIUM | **LeNH 0h Mon 04-20** across all 4 sheets, no leave note — Matrix reminder sent | sheets | LeNH |
| MEDIUM | **TuanNT 0h Mon 04-20** across John Yi + Rebecca, no leave note — Matrix reminder sent | sheets | TuanNT |
| LOW | **InfinityRoses production errors** — ChunkLoadError #983, RestClient::ReadTimeout #410, ShipStation::ApiRequestError #411 | email/rick | InfinityRoses dev |
| LOW | **Generator MR 381** — Rudi tagged Carrick 05:17 for review + stagingPhase2 rebuild | slack/generator | Carrick |
| LOW | **Fountain #2735 Smart Link** — 1 new @kunalsheth customer comment needs Rick reply | fountain/trello | Rick |
| LOW | **Fountain #2742 status anomaly** persists ("Not Started" with 20.25h actual) | fountain | Dev |
| INFO | **Precognize PR #4844** revert — emergency DP-386 rollback (ken@ inbox) | email/ken | Ops |
| INFO | **HR: 2 resignation sheets** — HaiDX + TuanNT3 (duongdn@) | email/duongdn | HR |

No auth failures. Vinn operational (no formal daily report but visibly active all day). Jeff report posted 17:20.

---

## Piece 1 — Email (6 accounts)

| Account | Count | Status |
|---|---:|---|
| duongdn | 2 | OK — HR resignation sheets (HaiDX, TuanNT3) |
| carrick | 7 | **ALERT** — 4 Redmine bugs, 2 New Relic sync warnings, 1 Rollbar summary |
| nick | 0 | OK — no John Yi mail |
| rick | 16 | **ALERT** — 4 production errors (FountainFE ICU + InfinityRoses chunk/timeout/ShipStation), 2 BugSnag staging INFO, 3 daily summaries |
| kai | 8 | OK — Bitbucket PR #456, Jira LIFM2-259/426/432/435 |
| ken | 34 | OK — Precognize PR activity (10 PRs incl. #4844 revert) |

Detail: `reports/2026-04-21/piece1-email.md`

---

## Piece 2 — Slack (14 workspaces, auth 14/14 OK)

| Workspace | Msgs | Notable |
|---|---:|---|
| Baamboozle | 6 | General |
| RDC - FM Monitoring | 16 | Automation logs |
| Swift Studio | 2 | Quiet |
| Xtreme Soft Solutions | 9 | **Kai daily report 17:15** — holiday schedule swap Mon/Thu→Tue/Wed next week |
| SAM GUARD - Mobile | 14 | HubSpot MQL leads + Majd merge blocker (client-side, INFO) |
| GLOBAL GRAZING SERVICES | 20 | **Nick daily report 08:18** — Prestashop 9 upgrade, PO-870946 500 |
| Amazing Meds | 8 | Nick rotated keys 08:29 post-Vercel breach (from yesterday) |
| Generator | 32 | Rent feature merged; **Rudi → Carrick MR 381 review + stagingPhase2 rebuild** |
| LegalAtoms | 0 | Silent (normal, no Nick mentions) |
| MyPersonalFootballCoach | 0 | Silent |
| William Bills | 0 | Silent |
| Equanimity | 64 | **URGENT Marcel escalation 08:05–08:06 → Carrick** (xid-technologies 24hr, "paying 50% more") |
| SoCal Auto Wraps | 0 | Silent |
| Aigile Dev | 3 | General |

Detail: `reports/2026-04-21/piece2-slack.md`

---

## Piece 3 — Discord (2 servers)

**AirAgri (nusvinn):**
- `airagri_webapp` 50 msgs (cap) — Vinn 12 msgs operational (pre-prod→prod cutover with @jdiamond, LB, PR reviews, GPS/stop-alarm, hazard). **No formal daily report** but visibly active.
- `airagri-flutter` 25 msgs — **Jeff daily report 2026-04-20 17:20** (ICAM Investigation UI done, APIs drafts/submit done, 4h)

**Bizurk (nuscarrick):**
- general/welcome 0 msgs. Other channels "Missing Access" (expected).
- **DM animeworld (Andrew Taraba) 12 msgs** — active job lead, coding test requested, rate negotiation $22–$25, nuscarrick committed start ASAP.

Detail: `reports/2026-04-21/piece3-discord.md`

---

## Piece 4 — Google Sheets (Mon 2026-04-20)

| Dev | Mon hrs | Week | Status |
|---|---:|---|---|
| LongVV | 8h (Maddy) | W3 | OK |
| PhucVT | 8h | W22 | OK |
| KhanhHH | 8h | W37 | OK (Generator) |
| VietPH | 8h | W24 | OK (Paturevision) |
| **LeNH** | **0h** | W8/W21 | **ALERT** — no leave (Rory/Franc/Aysar/Rebecca all 0h) |
| **TuanNT** | **0h** | W20/W21 | **ALERT** — no leave (John Yi + Rebecca both 0h; col P="Chưa" is normal per memory) |

Reminders: Matrix ping sent to LeNH + TuanNT rooms.

Detail: `reports/2026-04-21/piece4-sheets.md`

---

## Piece 5 — Scrin.io (TuanNT / John Yi)

- Mon 2026-04-20: **8h 00m** tracked (check security vercel ammethod 4h02m, homepage Elementor AM 3h55m, offline 3m)
- This week: 8h | Month Apr: 53h 40m
- Verdict: 8h cap. Needs TuanNT John Yi task-log row ≤ 8h — but TuanNT logged 0h today ⚠️ (tasklog alert separate).

Detail: `reports/2026-04-21/piece5-scrin.md`

---

## Piece 6 — Fountain (5-part, mandatory)

### 1. Matrix Weekly Plan (W23)
@trinhmtt 2026-04-20T01:48:46Z (edited):
> ViTHT: 40h | ThinhT: 12h | VuTQ: 40h | LamLQ: 10h | DatNT: 40h | => QC: 30.5h

Dev total **142h/wk** (+58% vs W22 90h). QC 30.5h. Token refreshed silently via `scripts/matrix-token-refresh.js`.

### 2. Task Log Actuals (W23 row 28, Mon day-1)
| Dev | W23 actual |
|---|---:|
| VuTQ | 0 |
| ThinhT | 0 |
| ViTHT | 0 |
| LamLQ | 0 |
| DatNT | **8.00h** |
| HaVS | 0 |
| PhatDLT (QC) | **3.50h** |
| HungPN (QC) | 0 |
Total **11.50h** (day-1 of W23).

### 3. Plan vs Actual (W23 partial, Tue morning)
5 of 7 devs logged 0h W23 day-1 — likely EOD-tasklog habit (Matrix activity from VuTQ/ViTHT/PhatDLT confirms active work). Monitor by Wed/Thu.

### 4. Capacity & Runway
- Remaining est NS+IP: **158.25h** (flat vs 04-20)
- Runway @ 90h baseline: 1.76 wk (unchanged)
- **Runway @ new 142h W23 plan: 1.11 wk** ⚠️ — backlog replenishment needed

### 5. Over-Estimate Tracking
22 over-est tasks, all stable day-over-day vs 04-20:
- #2595 GiftDrop: 168.25h (stable)
- #2615 GoC: 102.75h (stable)
- #2735: 111.50h (growth **paused** this week)
- #2742: 20.25h actual but still "Not Started" — status anomaly persists
- #2627 Has Bug on Live: 8.25h (stable)

### Trello Board (Fountain, Web Development)
- New customer comments: 1 — @kunalsheth on #2735 Smart Link
- Counts: Todo 34 | **Bugs 12 (+5)** | Doing 5 | QC Internal 4 | QA Backlog 2 | In QA 2
- Stuck cards (>5d): 40 — same distribution as 04-20

**Verdict:** Fountain item COMPLETE with alerts (runway, Bugs intake) logged.

Detail: `reports/2026-04-21/piece6-fountain.md`

---

## Piece 7 — Elena / Precognize / SamGuard

- **Elena-SamGuard-Digital-Plant (duongdn):** 0 open PRs. Last activity PR #299 merged 2026-04-07.
- **Precognize/development (nusken):** 3 open PRs by others (mahkris, nusdavid, briannus). No nusken PRs → no action.
- **samguard.co:** HTTP 200, JS console clean (0 errors, 0 CSP violations). 15 `ERR_ABORTED` benign (tracker/mp4 navigation aborts).
- **Redmine:** no updates needed.

Detail: `reports/2026-04-21/piece7-elena.md`

---

## Piece 8 — Upwork Neural Contract

- Messages: **0 new** since 2026-04-20 08:40. Latest = Carrick 2026-04-16 10:12.
- Weekly hours (wr 38901192): This wk 0h | Last wk 0h30 | Total 95h30.
- Neural is Carrick's contract (not TuanNT) — no tasklog comparison needed.
- Verdict: no alerts (0h normal per feedback).

Detail: `reports/2026-04-21/piece8-upwork.md`

---

## Piece 9 — Trello Updates

- **Check Mail:** 6/6 complete ✓
- **Check Progress:** 18/19 complete ✓ (all client-side sources clean; task-log 0h alerts handled via reminders)
- **SKIP (1):** Marcel — real xid-technologies client urgency → Carrick response needed

**Policy fix:** Task-log 0h is an internal dev alert handled by reminder; does NOT block client-project Trello completion when client-side Slack/Discord is clean.

Detail: `reports/2026-04-21/piece9-trello-updates.md`

---

## Piece 10 — Matrix Reminders (both sent ✓)

- **LeNH** → `!OIrgPraJWrcDTnRVLQ:nustechnology.com` ✓ event `$qaHIBeYc_by4hgAqWKBt5YsAjGR2w_4CnkRTHBE-hGw`
- **TuanNT** → `!knbJbIKzXRJNGVFQNg:nustechnology.com` ✓ event `$qG_EUK7Elomnb_ooiJaElfjhgXjsZM58-fmDKN-3y0c`

Matrix token refreshed silently (401→SSO→retry).

Detail: `reports/2026-04-21/piece10-reminders.md`

---

## Unresolved Questions

1. W23 Fountain plan +58% (90h → 142h) — genuine ramp-up or over-stated? Track actuals through Wed/Thu.
2. FountainFE ICU NumberFormat errors — known Node/Intl issue needing upgrade, or runtime regression?
3. New Relic carrick+colin sync — reauth or contract issue?
4. Does the daily-report workflow require formal "daily report" post from Vinn (AirAgri) or does visible operational activity suffice?
5. HaVS off Fountain permanently? (4+ weeks 0h, no plan)
6. LeNH 0h Mon may be extended leave from Fri — confirm via Matrix response.
7. Precognize PR #4844 revert (DP-386) — incident details?
