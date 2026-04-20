# Daily Report — Mon 2026-04-20 (08:40 +07)

**Window:** Fri 2026-04-17 08:50 → Mon 2026-04-20 08:40 +07 (Monday rule: start from last Friday)
**Pieces:** email, slack, discord, sheets, scrin, fountain, elena, upwork — all complete

---

## Critical Alerts

| Severity | Alert | Source | Owner |
|---|---|---|---|
| HIGH | New Relic account not syncing data + monthly data cap exceeded (>100GB free tier, 4 of last 6 months) — emails 2026-04-18 to carrick@ | email/carrick | Ops |
| MEDIUM | Fountain runway shrinking — 158.25h remaining / 90h weekly capacity = **1.76 wk** (was 1.9 wk). Backlog replenishment needed. | fountain/sheets | PM |
| MEDIUM | Fountain task #2735 **STILL GROWING** — 111.5h actual vs 90h est (+24%), +5.25h this week | fountain | Dev |
| MEDIUM | 4 new @kunalsheth customer comments on Fountain cards (3 on [Gift of Choice](https://trello.com/c/NBzXZigw), 1 on [Custom Roses](https://trello.com/c/ElD5EOmr)) — need Rick reply | fountain/trello | Rick |
| LOW | Vercel security incident at Amazing Meds — John Yi reported env vars exposed 2026-04-20 03:49, Nick acked 08:15 | slack/amazingmeds | Nick |

No person-status alerts (no 0h-without-leave, no missing required daily reports, no auth failures).

---

## Piece 1 — Email (6 accounts)

| Account | Count | Status |
|---|---:|---|
| duongdn | 3 | OK — Slack codes + HR notice |
| carrick | 10 | **ALERT** — 2 New Relic (no sync + data cap) + 6 Redmine Elliott/Generator bugs (#78248, #78273, #78274, #78281) |
| nick | 0 | OK — no John Yi mail |
| rick | 14 | OK — 12 Rollbar daily digests (Fountain/InfinityRoses) + 2 BugSnag staging (INFO) |
| kai | 20 | OK — LIFM2 Jira/Bitbucket PRs #459/476/477, tickets LIFM2-259/425/430/432/433 |
| ken | 35 | OK — Precognize PRs #4813/4831/4837–4842, routine reviews |

Detail: `reports/2026-04-20/piece1-email.md`

---

## Piece 2 — Slack (14 workspaces, auth 14/14 OK)

| Workspace | Msgs | Notable |
|---|---:|---|
| Baamboozle | 16 | Aysar deploy OK 04-20 00:40; product marketing |
| RDC - FM Monitoring | 50 | 46 auto-logs + Carrick branch strategy |
| Swift Studio | 2 | Rory awaiting BXR approach breakdown |
| Xtreme Soft Solutions | 4 | Kai DMs (anomawasala YES; Madhuraka "no budget") |
| SAM GUARD - Mobile | 19 | HubSpot MQL bot leads only, no human msgs |
| GLOBAL GRAZING SERVICES | 11 | Nick active — Android upgrade scope w/ Joey/Amy |
| Amazing Meds | 6 | **Vercel breach** — John Yi report 04-20, Nick acked 08:15 |
| Generator | 18 | Release coord shifted to Tue submit (Elliott+Violet+Rudi) |
| LegalAtoms | 5 | Client design talk; no Nick activity needed |
| MyPersonalFootballCoach | 0 | Silent |
| William Bills | 70 | Heavy Fri deploys (Privateer fund live) — Lucas+Oliver |
| Equanimity | 4 | Marcel pinged Carrick 04-17 17:03 re validation |
| SoCal Auto Wraps | 0 | Silent |
| Aigile Dev | 0 | Silent |

Detail: `reports/2026-04-20/piece2-slack.md`

---

## Piece 3 — Discord (2 servers)

**AirAgri (nusvinn):**
- `airagri_webapp` 7 msgs — **Vinn daily report Fri 16:59** (SAR fixes, menu bar)
- `airagri-flutter` 2 msgs — **Jeff daily report Fri 17:54** (Weather API, TF 3.4.2 iOS deploy)

**Bizurk (nuscarrick):** DM with animeworld — 1 outbound Mon 08:22 (Upwork Angular+Tailwind pitch). Silence = normal per low-activity client.

Detail: `reports/2026-04-20/piece3-discord.md`

---

## Piece 4 — Google Sheets (Fri 2026-04-17)

| Dev | Fri Hours | Weekly (W) | Note |
|---|---:|---:|---|
| LongVV | 8h (Rebecca) | W2 Maddy 16h ✓ | Goal met |
| PhucVT | 8h | W21 32h | Tue leave |
| TuanNT | 0h | — | "Nghỉ cả ngày" (confirmed) |
| VietPH | 8h | W23 32h | Under 40h goal, no leave |
| KhanhHH | 8h | W36 40h ✓ | Goal met |
| LeNH | 0h | — | "Nghỉ cả ngày" (confirmed) |

Mon 04-20 = 0h across all sheets (normal EOD logging). **No Matrix reminders needed** — all 0h had leave notes.

Detail: `reports/2026-04-20/piece4-sheets.md`

---

## Piece 5 — Scrin.io (TuanNT / John Yi)

- Fri 2026-04-17: 0h (matches task log leave)
- W3 (Apr 13–17): 20h 22m
- Month Apr: 45h 46m

Verdict: **Match** — task log ≤ Scrin.io, no over-inflation.

Detail: `reports/2026-04-20/piece5-scrin.md`

---

## Piece 6 — Fountain (5-part check)

**Part 1 — Matrix plan** (@trinhmtt, 2026-04-17T09:08 UTC, room `!EWnVDAxbTGsBxPkaaI`):
ViTHT 38h | ThinhT 20h | VuTQ 32h | QC 22.5h → Dev total **90h/wk**

**Part 2 — W22 Actuals** (Apr 13–19):
VuTQ 32.00 | ThinhT 20.00 | ViTHT 38.00 | HaVS 0 | PhatDLT 17.50 | HungPN 8.00 → Dev **90.00h**, QC **25.50h**

**Part 3 — Plan vs Actual:** All 3 devs exact (0h delta). QC +3h over plan (OK). HungPN 8h not sole-QC alert (PhatDLT covers). TrinhMTT excluded.

**Part 4 — Capacity & Runway:**
- Remaining est: **158.25h** (was 167.5h on 04-17, -9.25h consumed)
- Runway @ 90h/wk: **1.76 wk** (was 1.9 wk, **-0.14 wk**) ⚠️

**Part 5 — Over-Estimate Tracking:**
| Task | Est | Actual | Over% | Note |
|---|---:|---:|---:|---|
| #2595 (GiftDrop) | 120 | 168.25 | +40% | stable |
| #2615 (Gift of Choice) | 12 | 102.75 | +756% | +0.5h marginal |
| **#2735** | 90 | 111.5 | +24% | **STILL GROWING +5.25h** |
| #2742 | 12 | 20.25 | +69% | status mismatch (NS w/ actuals) |
| #2627 (Bug on Live) | 0.5 | 8.25 | +1550% | new emerging |

**Trello Board** (`5475eaf923a9a1309357eb51`, rick570):
- 4 new customer comments (all @kunalsheth) since 04-17
- Active: Todo 34 | Bugs 7 | Doing 6 | QC Internal 3 | QA Backlog 2 | In QA 2
- 41 stuck cards (>5 days). Worst: 418d accessibility/page title ×2, 181d platform switcher, 144d PayPal bug

Detail: `reports/2026-04-20/piece6-fountain.md`

---

## Piece 7 — Elena

- **SamGuard PRs (duongdn):** 0 open PRs. Last deploy #299 (DP-652) on 2026-04-07.
- **samguard.co WordPress:** HTTP 200, 0 console errors, 0 page errors, 0 CSP violations ✓
- **Precognize (nusken):** 0 open PRs authored by nusken. No --external push.

Detail: `reports/2026-04-20/piece7-elena.md`

---

## Piece 8 — Upwork + Neural Contract

| Workroom | Dev | This Wk | vs Task Log |
|---|---|---:|---|
| Rory | LeNH | 0h | Mon EOD not logged — normal |
| Aysar | LeNH | 0h | Mon EOD not logged — normal |
| Bailey DEV1 | VietPH | 0.5h | Mon morning, recheck afternoon |
| Bailey DEV3 | DuongDN | 0h | Inactive — expected |
| Neural Contract | Michael | — | messages only |

**Neural Contract** (workroom 38901192): Last URGENT bug Apr 15 fixed/pushed same day by Carrick. 3 non-urgent tasks from Michael Apr 15, Carrick acked Apr 16. **No pending client messages since Apr 16.**

Detail: `reports/2026-04-20/piece8-upwork.md`

---

## Trello Updates ✓

**Check Mail** ([card](https://trello.com/c/k7OtoUvt/732-check-mail)): 5/6 complete — DuongDn, Nick, Rick, Kai, Ken. Skipped: **Carrick** (New Relic ops alert).

**Check Progress** ([card](https://trello.com/c/c0RLHDIB/731-check-progress)): 19/19 complete across 5 checklists. None skipped.

Detail: `reports/2026-04-20/piece9-trello-updates.md`

---

## Action Items

1. **Carrick** → handle New Relic account sync + data cap issue (billing review)
2. **Rick** → reply to 4 @kunalsheth comments on Fountain cards (Gift of Choice + Custom Roses)
3. **Dev team** → investigate #2735 hour growth (+5.25h this week, in-progress)
4. **PM** → Fountain backlog replenishment (runway 1.76 wk)
5. **Nick** → confirm resolution of Amazing Meds Vercel env var exposure

---

## Unresolved Questions

1. Is New Relic data cap a known recurring billing issue, or new? (carrick emails 2026-04-18 don't indicate prior tracking)
2. Apr 17 Matrix plan — W22 backfill or W23 forward-looking? (exact match to actuals suggests backfill)
3. Fountain HaVS 0h for W22 — reassigned off project?
4. #2627 (Has Bug on Live, 0.5→8.25h) — watch for next week's trajectory
5. VietPH Mon 0.5h Upwork vs 0h task log — recheck in afternoon refresh
6. Carrick reply to Marcel's Apr 17 Equanimity question — verify via Matrix/Trello
