# Daily Report — 2026-04-23 (Thursday)
**Period:** 2026-04-22 08:40 → 2026-04-23 08:55 (+07:00)
**Last run:** 2026-04-22 08:40 (yesterday's daily report covered 04-21 → 04-22)

---

## 🚨 Critical Alerts

| # | Source | Alert | Severity |
|---|--------|-------|----------|
| 1 | Fountain/Trello | **ShipStation / Mother's Day orders not syncing** — @kunalsheth 5 comments 04-22 on 7 affected orders + date/field bugs. [Card](https://trello.com/c/y8lM8Alq) | HIGH |
| 2 | Fountain/Trello | **ShipStation creating 2nd/3rd duplicate shipments** — @mike62798179 still flagging, bad order list. [Card](https://trello.com/c/BYu5iwQM) | HIGH |
| 3 | Email/rick@ | **[InfinityRoses] PRODUCTION** 100th occurrence #398 `NoMethodError strftime` for nil `dispatch_date` (2×, 22/04 05:53 +07) | HIGH |
| 4 | Discord/AirAgri | **Vinn missing explicit daily report Tue 22/04** (active in messages all day but no end-of-day summary post) | MEDIUM |
| 6 | Sheets/LeNH | **Aysar sheet 0h Wed 22/04** despite Upwork Aysar workroom tracking 8:30h — tracked but not logged. (Rory/Franc/Rebecca 0h is expected, not an alert — LeNH worked on Aysar.) Reminder sent Matrix. | MEDIUM |
| 7 | Fountain | #2615 Gift of Choice **OVER + STILL GROWING**: 102.75h → 106.75h (+4h), est 12h (+790%) | MEDIUM |
| 8 | Fountain | #2735 Pro Send Smart Link **OVER + STILL GROWING**: 111.5h → 117.5h (+6h), est 90h (+31%) | MEDIUM |
| 9 | Fountain | #2702 Accessibility **OVER + STILL GROWING**: 16h → 21.5h (+5.5h), est 8h (+169%) | MEDIUM |
| 10 | Email/rick@ | [FirstProject] PRODUCTION 6 new Rollbar errors 21–23/04: ChunkLoadError chunks 3148/8658, UnavailableError #985, 3× Minified React #422/#425 | MEDIUM |
| 11 | Fountain | Dev pace W23 day-4: 68h / 113.6h expected (–45.6h, 47.9% of plan 80% expected) — VuTQ/ViTHT each –16h, LamLQ 0h/10h | MEDIUM |
| 12 | Fountain | Capacity runway: 150.75h NS+IP remaining → **1.06 wk @ 142h plan / 1.68 wk @ 90h** — Kunal to feed Todo→Dev urgently | MEDIUM |

## ℹ️ Action Items

- **Email/duongdn**: LongVV leave request 24/04 (22/04 09:26) — approve / forward HR
- **Email/rick@**: Kunal Sheth "Design focus for this week" (22/04 06:33) — Rick to ack
- **Email/rick@**: Zoho "New sign-in" (22/04) — verify user's own session
- **Email/kai@**: LIFM2-436 assigned, LIFM2-430/434 mentions — Kai to action
- **Email/carrick@**: 2 new Redmine bugs #78312, #78314 (Elliott/Generator Lifestyle) — #78312 already deployed to staging same day
- **Upwork/Aysar**: confirm contract status — stale "inactive" flag vs 18:50h this week
- **Fountain/Kunal**: replenish Todo (NS+IP = 1.06wk runway at plan rate)
- **Fountain/LamLQ**: 0h day-4 vs 10h plan — confirm leave vs log delay
- **Neural Contract**: Michael's non-urgent Compare-filenames arg change — Carrick noted, confirm actioned

---

## Scrin.io — TuanNT / John Yi

| Day | Scrin.io | John Yi log | Status |
|---|---:|---:|---|
| Mon 2026-04-20 | 8.00h | 8.00h | OK |
| Tue 2026-04-21 | 7.35h | 7.33h | OK |
| Wed 2026-04-22 | 4.07h | 4.00h | OK |

Log ≤ Scrin.io every day — not over-inflated. TuanNT makes up the gap via Rebecca sheet to hit 8h/day total (split intentional).

---

## Elena — Digital Plant + WordPress

### PRs (duongdn)
- **0 open PRs** on `nustechnology/Elena-SamGuard-Digital-Plant`. Nothing to merge/deploy. Recent closed: #300/#299/#298.

### Precognize (nusken)
- **6 open PRs** on `Precognize/development`, none authored by nusken. Authors: nustom, nus-aron, nusdavid, mahkris, briannus. Watch-only.

### WordPress samguard.co
- Headless Chrome loaded HTTP 200. **0 console errors, 0 CSP violations, 0 HTTP 4xx/5xx.** Clean.

### Pending Actions
- `config/.elena-pending-actions.json` empty (last merged #299 DP-652 on 04-07, all deploys DONE).

---

## Slack — Summary

| Workspace | Msgs | Key content |
|---|---:|---|
| Baamboozle | 49 | Aysar+Carrick admin/Stripe flow verify + deploy, customer-success partnership, holiday notice |
| RDC - FM Monitoring | 10 | Automated reboot/access logs only; no Franc/dmetiner blockers |
| Swift Studio | 2 | Jeff holiday notice, Rory "Let me try that!" — quiet but normal |
| Xtreme Soft Solutions | 4 | Kai DM with Madhuraka — holiday schedule confirmed, Kai back online 04-23 08:38 (16h/wk, no daily report required) |
| SAM GUARD - Mobile | 19 | Tom investigating studio-03 algorithms offline (DEL-7104, Kfir handling — Precognize IT, not our team) |
| Global Grazing Services | 55 | Amy heavy interaction with Joey (change-requests, double-scan, barcode-stock); Nick daily reports posted 04-23 08:16 |
| Amazing Meds | 24 | Nick fixing 1056px display bug 04-23; John asked vacation cover, Nick offered extra hours; Nick daily reports 04-21/04-22 |
| Generator | 100 | Carrick leading Laravel 12 upgrade, B-207/576/773 release; Violet+Jeff iOS/Android handoff; Rudi flagged prod SQL error, Carrick on PR #334 |
| LegalAtoms | 4 | Raymond Thursday release note; Hamid asking Talha for unblock; no Nick-specific DM issues |
| MyPersonalFootballCoach | 0 | Silent (normal low-activity) |
| William Bills | 25 | Lucas+Oliver prod deploy/test; QuanLM helped SSH/IP — resolved, normal flow |
| Equanimity | 43 | Carrick+Komal DB migration for sgbuildex tenant; Marcel will handle DigitalOcean migration (20–30h) with own devops |
| SoCal Auto Wraps | 0 | Silent (normal) |
| Aigile Dev | 6 | GAiGE webhook integration test; make.com blog-not-published draft warning |

**No person-status Slack alerts.** All NUS team members active. Tokens valid across all 14 workspaces (no refresh needed).

---

## Discord — AirAgri + Bizurk

| Server | Msgs | Key content |
|---|---:|---|
| AirAgri (nusvinn) | 38 | Spray Job module + multiple chemicals dev, James+Royden client feedback, 3 gold-subscription upgrades handled |
| Bizurk (nuscarrick) | 0 | Low-activity, silence normal |
| animeworld DM | 0 | Silence normal (last exchange 2025-08) |

**Daily report checks:**
- Vinn: Mon ✓ / **Tue ✗** (alert) / Wed partial (morning upgrade handling)
- Jeff: Mon ✓ / Tue ✓

**James' asks:** spray calc done end-of-tomorrow (04-23) to staging; end-to-end Spray Job demo by end of week.

---

## Email — 6 accounts (443 msgs total)

| Account | Count | Highlights |
|---|---:|---|
| duongdn | 6 | LongVV leave request 24/04 (HR action), NamTV remote 22/04 (resolved), holiday thread |
| carrick | 16 | 2 new Elliott Redmine bugs #78312/#78314; #78312 staging same day; 2 TestFlight; Jira weekly |
| nick | 18 | 8 Azure DevOps PRs (Emir); 8 CandaSurveyors daily completes; no John Yi |
| rick | 39 | 9 production Rollbar errors (see alerts); Kunal design-focus; Thomas M Upwork; Zoho new sign-in flag |
| kai | 7 | LIFM2-436 assigned; LIFM2-260/430/434 mentions; Jira weekly |
| ken | 341 | 11 Precognize/development msgs (5 PRs: #4847/#4848/#4849/#4831/#4838); healthy cadence |

---

## Sheets — Task Logs (Tue 21 + Wed 22)

| Developer | Tue 21 | Wed 22 | Status |
|---|---:|---:|---|
| LongVV (Maddy + James Diamond) | 8.00h | 8.00h | OK — all hours in James Diamond W22 |
| PhucVT (James Diamond) | 8.00h | 8.00h | OK |
| KhanhHH (Generator) | 8.00h | 8.00h | OK |
| VietPH (Paturevision) | 8.00h | 8.00h | OK |
| LeNH (Rory+Franc+Aysar+Rebecca-QT) | 8.17h | 0.00h | **ALERT** Wed — reminder sent |
| TuanNT (JohnYi+Rebecca+Paturevision) | 8.00h | 8.00h | OK |

**Correction (post-review):** LongVV's two sheets are Maddy + James Diamond (NOT Rebecca). Re-scan of James Diamond W22 shows LongVV = 8h Tue + 8h Wed. Original piece4 alert was a false positive; no reminder was warranted. LeNH Wed could be EOD-logging delay; note Upwork Aysar tracked 8:30h Wed, so hours exist — need task log entry.

---

## Upwork — Weekly Hours (Apr 20 – Apr 26, Mon-Sun)

| Workroom | Dev | Upwork wk | Task log (Mon-Wed) | Status |
|---|---|---:|---:|---|
| Rory (41069448) | LeNH | 0:00 | 0h | OK (no work this week) |
| Neural Contract (38901192) | external | 0:00 | n/a | OK |
| Aysar (35642393) | LeNH | 18:50 | 10.34h | **MISMATCH −8.5h Wed** — LeNH needs to log |
| Bailey DEV1 (42545630) | VietPH | 22:30 | 22.50h | MATCH |
| Bailey DEV3 (43093775) | DuongDN | 0:00 | 0h | OK (contract inactive) |

**Neural Contract messages:** Latest client msg 22/04 03:05 UTC from Michael — **explicitly "non-urgent"** Compare-function 5th arg = filenames. Carrick replied 22/04 06:29 + 07:02 UTC (pushed code, noted reduce-risk arg issue on staging). No urgent client issues.

**Note:** Upwork "Aysar inactive since Mar 9" flag may be stale — 18:50h tracked this week.

---

## Fountain — Kunal (W23 Day-4)

### 1. Matrix Plan (@trinhmtt 04-20 08:48 +07)
ViTHT 40h | ThinhT 12h | VuTQ 40h | LamLQ 10h | DatNT 40h | QC 30.5h — Dev total 142h. HaVS not on plan.

### 2. Task Log Actuals (W23 day-4, Summary row 28)
| Dev | Actual | Role |
|---|---:|---|
| VuTQ | 16.00h | dev |
| ThinhT | 12.00h | dev |
| ViTHT | 16.00h | dev |
| DatNT | 24.00h | dev |
| LamLQ | 0.00h | dev |
| HaVS | 0.00h | dev (not on plan) |
| PhatDLT | 7.50h | QC |
| HungPN | 0.00h | QC (OK if PhatDLT covers) |

Dev total: 68h / 142h (47.9%) — QC: 7.5h / 30.5h (24.6%).

### 3. Plan vs Actual (80% expected day-4)
VuTQ −16h | ViTHT −16h | LamLQ −8h (0h vs 10h plan) | DatNT −8h | ThinhT +2.4h (on track) | PhatDLT −16.9h QC. **Dev short 45.6h vs expected 113.6h.** Fri catch-up expected but watch closely.

### 4. Capacity & Runway (Est vs Charged, excl. Live/Cancelled)
| Metric | 04-21 | 04-23 | Δ |
|---|---:|---:|---:|
| Remaining est (NS+IP) | 158.25h | **150.75h** | −7.50h |
| Runway @ 90h/wk | 1.76 wk | **1.68 wk** | −0.08 wk |
| Runway @ 142h plan | 1.12 wk | **1.06 wk** | −0.06 wk |

Backlog shrinking ~26h/wk, far under 90h burn. Kunal to feed Todo→Dev urgently.

### 5. Over-Estimate Tracking (actual > est × 1.2)
24 tasks flagged. Still growing since 04-21:
- **#2615 Gift of Choice** — 102.75 → **106.75h (+4h)**, est 12h (+790%), Staging
- **#2735 Pro Send Smart Link** — 111.5 → **117.5h (+6h)**, est 90h (+31%), In-progress
- **#2702 Accessibility** — 16 → **21.5h (+5.5h)**, est 8h (+169%), In-progress
- **#2791** — +0.5h (10.5 → 11h, est 8h, Staging)
- **#2821** — new entry 2h (est 1h, Dev Done)

Stable (no growth): #2627, #2639, #2501, #2380, #2624, #2742, #2595 GiftDrop (168.25h), #2742 status anomaly persists.

### 6. Fountain Trello Board — [Web Development](https://trello.com/b/UDrSWage)
**17 new customer comments since 04-21** from @kunalsheth, @tmmckay, @mike62798179.

Hotspots:
- [Mother's Day orders not syncing (y8lM8Alq)](https://trello.com/c/y8lM8Alq) — 5 comments 04-22, 7 orders, shipstation date bug
- [ShipStation creating 2nd/3rd shipment (BYu5iwQM)](https://trello.com/c/BYu5iwQM) — 3 comments 04-21
- [Order confirmation email (Zh47TgEt)](https://trello.com/c/Zh47TgEt) — fix applied Infinity only, not Fountain
- [Update to breakpoints (0xVWmSqK)](https://trello.com/c/0xVWmSqK) + [Infinity Product page (rRU4Qk4n)](https://trello.com/c/rRU4Qk4n) — @tmmckay ready to pick up
- [Pro/Send Smart Link (yrbbFhf9)](https://trello.com/c/yrbbFhf9) — @kunalsheth: edge case, ignore

**Active lists:** Todo 33 | Bugs 7 (**−5 since 04-21**, good) | Doing 6 | QC Internal 7 | QA Backlog 2 | In QA 2.
**Stuck >5d:** 41 cards (worst 184d Platform switcher, 147d PayPalHttp::HttpError, 140d Pro Backend Updates).
**Hard-to-release (Doing 14d+):** 1 — [Fountain States/scrolling login (clSdoRlL)](https://trello.com/c/clSdoRlL) 19d.

---

## Trello — Check Progress + Check Mail updates

**Cards (found by name):**
- [Check Progress](https://trello.com/c/1YALj3ba/742-check-progress) — 19 items: 16 completed, 3 skipped (post-correction: James Diamond/Aysar/Fountain)
- [Check Mail](https://trello.com/c/14ghqLAu/743-check-mail) — 6/6 completed

### Check Progress
| Item | Action | Reason |
|---|---|---|
| Blake | ✓ | no alert |
| John Yi - Amazing Meds | ✓ | TuanNT OK, Scrin matches |
| Elliott | ✓ | KhanhHH OK |
| MPFC | ✓ | no alert |
| Marcel | ✓ | adhoc |
| Elena - SamGuard | ✓ | 0 PRs, 0 errors |
| Elena - WP SamGuard (Pending) | ✓ | clean |
| Raymond - LegalAtoms | ✓ | no alert |
| Neural Contract | ✓ | Carrick replied to client |
| Bailey | ✓ | VietPH OK |
| Andrew Taraba | ✓ | low-activity normal |
| Rebecca | ✓ | TuanNT OK |
| Colin | ✓ | no alert |
| Maddy - Carrick/Kai/Luis | ✓ (post-correction) | LongVV 8h/8h in James Diamond (false alert) |
| **James Diamond - Vinn task** | ⚠️ skip | Vinn missing daily Tue 22 |
| Rory | ✓ (post-correction) | LeNH worked on Aysar Wed, not Rory — 0h expected |
| **Aysar** | ⚠️ skip | Upwork 8.5h Wed but task log 0h — real mismatch |
| Franc | ✓ (post-correction) | LeNH worked on Aysar Wed, not Franc — 0h expected |
| **Fountain** | ⚠️ skip | growing over-est + HIGH customer bugs |

### Check Mail — all 6 ✓
DuongDn / Carrick / Nick / Rick / Kai / Ken — all mail checked.

---

## Matrix Reminders Sent
- **LongVV** → `!bvdwOOxprsKJBTjSeQ:nustechnology.com` (Maddy Xtreme room) — "task log for 21/04 and 22/04 is missing (0h logged)". **⚠️ SENT IN ERROR**: (1) wrong room — LongVV's direct room is `!mYZBGNoLFVpMVIJtPu:nustechnology.com`; (2) false alert — LongVV actually logged 8h/8h in James Diamond W22 (not Rebecca). Rule saved: feedback_longvv_direct_matrix.md + feedback_longvv_not_rebecca.md.
- **LeNH** → `!OIrgPraJWrcDTnRVLQ:nustechnology.com` — "task log for 22/04 is missing … Upwork Aysar 8:30h tracked"

Matrix token auto-refreshed on session start (scripts/matrix-token-refresh.js).

---

## Unresolved Questions

1. ~~LongVV 0h Mon+Tue+Wed~~ RESOLVED — false positive. LongVV's hours are in James Diamond sheet (W22), not Rebecca. Logged 8h Tue + 8h Wed.
2. LeNH Wed 22/04 0h despite 8:30h tracked on Upwork Aysar workroom — task log not yet updated, or logged in a sheet not checked?
3. Aysar Upwork contract status — stale "inactive since Mar 9" flag vs 18:50h tracked this week.
4. Fountain #2615 (Staging) + #2735/#2702 (IP) still growing — new rework scope or original underestimate? Needs scope review.
5. ShipStation / Mother's Day hot customer bug — does this need Elena-style auto-escalation or dedicated QA attention?
6. LamLQ 0h day-4 vs 10h plan — leave or log delay?
7. HungPN 0h QC — PhatDLT covering 7.5h alone; enough for 30.5h QC plan?
8. InfinityRoses `NoMethodError strftime` nil dispatch_date (100th occ) — ticket filed for null check?
9. FirstProject ChunkLoadError recurring chunks 3148/8658 across 2 days — CDN cache / stale client chunks issue?
10. Zoho "new sign-in" rick@ 22/04 — user's own session or review required?
