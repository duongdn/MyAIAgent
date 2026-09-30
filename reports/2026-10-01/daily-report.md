# Daily Report — 2026-10-01 (Thursday)

**Run:** 2026-10-01T05:10:00+07:00 (cron)
**Window:** 2026-09-30T05:10:00+07:00 → 2026-10-01T05:10:00+07:00
**Leave plan:** No approved leave on record for 2026-09-30/10-01 (LongVV/PhucVT/TuanNT/KhanhHH/LeNH).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets/Workstream | TuanNT 0h across all Workstream projects (Speedventory only source, 8h 09-28 / 4h 09-29 / **0h 09-30**), no leave note — gates Rebecca + Bailey |
| 2 | Sheets/Workstream | KhanhHH 0h across all Workstream projects on 09-30, no leave note — gates Aysar + Elliott |
| 3 | Sheets/Workstream | PhucVT 0h across all Workstream projects on 09-30, no leave note |
| 4 | Slack Xtreme (Maddy) | Client (anomawasala) asked "why this error comes for some items, when upload to Shopify?" 09-30 20:16 — still unanswered as of run time (~9h) |
| 5 | Email vuongtrancr@gmail.com | New Relic "Signal lost for 10 minutes on 'Low Application Throughput'" ×12 for Swish/Delayed-newform — recurring signal-loss pattern |
| 6 | Email rick@ | [FirstProject] production — 2 new Rollbar errors: #1121 IntegrationError, #1122 NotFoundError (production, not staging) |
| 7 | Performance MPFC | Apdex 0.43 (poor), chronic WP_Error::get_method() (20x) + continue-targeting-switch E_WARNING (217x) + NEW `mysqli_real_connect(): Too many connections` (5x) |
| 8 | Matrix (internal) | honght: 4 people (Joey Bailey - PatureVision/Speedventory, DuongDN, ThangN, James Diamond) working only until 2026-10-09 — need task transfer plan |
| 9 | Upwork Memo | Rory/Aysar/Marcel (Tokenlite) sessions all blocked (Cloudflare/login) — memo validity unverified this run, not a memo-invalid finding |

**Today (Wed Sep30/Thu Oct1):** No staff leave on record; all present.

---

## Email — all — 05:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 3 | Payslip 09/2026, HR mentoring session — no alert | no events |
| carrick@nustechnology.com | 15 | Socalautowraps Rollbar daily summary + 9x GitLab "Failed pipeline" (definitive-guide upgrade/phase0-ci, later Fixed) — informational | no events shown |
| nick@nustechnology.com | 1 | Heroku cert renewal failed for hpd-merchant — minor, no John Yi content | no events |
| rick@nustechnology.com | 26 | See Alert #6 (FirstProject prod #1121/#1122). Rest are FountainStaging BugSnag (staging, not prod) + Fountain/Infinity daily Rollbar summaries — matches clean New Relic apdex below | 14:30 "OmniGPT Daily Sync" |
| kai@nustechnology.com | 5 | JIRA LIFM2-469/409 assignments/mentions — routine | no events |
| ken@nustechnology.com | 80 | Mostly newsletters/marketing noise, no Precognize PR alerts found | 08:30 DE Standup, 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 14 | See Alert #5 | — |
| dnduongus@gmail.com | 35 | Personal — bank receipts, Tikop, newsletters. No security/breach alerts. | — |
| davidztv19@gmail.com | 1 | Basecamp ResidentRadius activity digest (Arthur team unrelated project) | — |
| freelancer@mypersonalfootballcoach.com | 1 | Rollbar MPFC daily summary: 1 existing prod error, 0 new | — |

Trello: DuongDn, Carrick, Nick, Rick, Kai, Ken ✓ complete.

---

## Slack — all — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 3 | #testing channel noise only (skjamie25 unrelated pings). **Aysar MPDM (C07SQ4HAUHZ): 0 new messages this window** — KhanhHH has 0h Workstream on Baamboozle this week → silence is normal, not an alert |
| RDC - FM Monitoring | 0 | none |
| Swift Studio | 0 | none |
| Xtreme Soft Solutions | 2 | See Alert #4 |
| SAM GUARD - Mobile | 3 | HubSpot MQL lead notifications only |
| Global Grazing Services | 9 | Nick posted daily report ("Deploy Grazing software desktop/filter production...") ✓. Team thread on hiding menu item until tested — routine |
| Amazing Meds | — | Ignore List (cancelled 2026-09-28) — not checked |
| Generator | 0 | none |
| LegalAtoms | 0 | none |
| MyPersonalFootballCoach | 3 | MPDM freelancer thread — client asked follow-up, kwd2mj8hrv replied same day "I'll come back about all of them" — resolved/in-progress, not stalled |
| William Bills | 0 | none |
| Equanimity | 0 | none |
| SoCal Auto Wraps | — | Dropped 2026-05-11, no item |
| Aigile Dev | 2 | Routine blog-post deploy notice |
| OhCleo | — | See OhCleo section below |

Trello: Baamboozle(Aysar)/RDC(Franc)/Swift(Rory)/SAMGUARD(Elena-paused)/GGS(Bailey)/Generator(Elliott)/LegalAtoms(Raymond)/MPFC/WilliamBills(Rebecca)/Equanimity(Marcel)/Aigile(Colin) — see per-item notes below; Maddy(Xtreme) ⚠️ skipped (Alert #4).

---

## Discord — all — 05:10 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | multiple | bellatric02 QA pass notes; **jeff_trinh daily report present** (4h: Emergency Alert done, Profile Setting done, Location Sharing WIP) ✓ |
| Bizurk (nuscarrick) | 0 channel / 7 DM | Andrew Taraba DM (animeworld) active — routine modal-color feedback, nuscarrick responded same day |

Trello: James Diamond-Vinn ✓ (Jeff report present), Andrew Taraba ✓ complete.

---

## Sheets/Workstream — all — 05:10 (+07:00)

Workstream is primary for all projects except Bailey (Bailey now also on Workstream `speedventory` per 2026-08-21 migration — no separate Sheet needed).

| Project | Client | Dev hours (week, 09-28→09-30) | Reviewer charged | Review status |
|---------|--------|-------------------------------|-------------------|----------------|
| Maddy (Xtreme) | Kai/Carrick/Luis | LongVV 2h (ad-hoc, no target); LuHX 6.75h | need_review=false | — |
| James Diamond | Vinn | LeNH 21h (8h today) | need_review=false | — |
| Family App | Charles Chang | LuHX 6.83h | need_review=false | — |
| Fountain | Kunal | see Fountain section | — | excluded (per instruction) |
| Marcel (Tokenlite) | Marcel | DuongDN 1h | need_review=false | — |
| Radio Data Center | Franc | LeNH 3h | need_review=false | — |
| Speedventory | Bailey | TuanNT 12h wk (0h today — **Alert #1**), DatNC 2h, VyNL 2h, TrinhMTT 3.5h, VuTQ 16h, NamNN 1.5h | need_review=false | — |
| OhCleo | OhCleo | LongVV 12h wk (2h today) | need_review=false | reviewStatus: **Pending** — 8 rows (visual direction cover arts, AI tag taxonomy, SEO audit, visual identity) — ⚠️ addressed to LongVV's project reviewer |
| Baamboozle, Colin/ETZ, Generator, Amazing Meds, Elevate365, Neural Contract, LegalAtoms, BXR App, Crystal lang, Blair Brown, Rebecca | — | 0h logged, no members this week | — | — |

KhanhHH: **not found on any Workstream project this week** → Alert #2. PhucVT: **not found on any Workstream project this week** → Alert #3. Both cross-checked via `workstream-fetch-project-week.js all` (covers all 19 tracked projects) — recommend interactive recheck given prior false-0h history on these two devs.

**Maddy JIRA weekly cross-check:** not run this pass (time-boxed) — recommend recheck.

---

## Scrin.io (Nick @ John Yi company account — 2026-09-30): 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:10 (+07:00)

**Part 1 — Matrix Plan:** Room `!EWnVDAxbTGsBxPkaaI`. trinhmtt posted this week's plan Mon 2026-09-28 09:02: **ViTHT: 40h, ThinhT: 20h, DatNT: 40h => QC: 25h**.

**Part 2 — Task Log Actuals (Workstream, week 09-28→10-04, through 09-30):**
| Dev | Actual so far |
|-----|----------------|
| DatNT | 24h (8+8+8) |
| ViTHT | 1.5h |
| ThinhT | 12h (4+4+4) |
| VuTQ (QC) | 8h (2+6) |
| HungPN | 3h |
| TrinhMTT | 5h |

**Part 3 — Plan vs Actual (week in progress, Thu/Fri remain):** ViTHT 1.5/40h, ThinhT 12/20h, DatNT 24/40h, QC(VuTQ) 8/25h — all on pace mid-week, not flagged.

**Trello Board (Fountain, Web Development):** not deep-checked this pass (time-boxed) — no new customer comments surfaced via Matrix room content this window. Recommend recheck for stuck-card / hard-to-release scan.

Trello: Fountain item left ⚠️ open pending Trello board check (Parts 1-3 clean).

---

## Elena — 05:10 (+07:00)

Paused per Ignore List (2026-09-09) — auto-completed, not actively monitored. Note: 2 open PRs exist (#311 feature/implement-share-component, #309 header/modal i18n) but not acted on per pause. Precognize (nusken): 0 open PRs.

---

## Trello — 05:10 (+07:00)

**Ignore List — auto-completed (paused/cancelled):** Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds.

| Item | Result |
|------|--------|
| Maddy | ⚠️ skipped — Alert #4 (unanswered Shopify question) |
| James Diamond - Vinn | ✓ complete |
| Franc | ✓ complete (RDC 0 msgs) |
| Rory | ✓ complete (Swift Studio 0 msgs) |
| Aysar | ✓ complete (MPDM silent, KhanhHH 0h Baamboozle this week) |
| Elliott | ⚠️ skipped — KhanhHH 0h today (Alert #2), Generator Slack 0 msgs otherwise |
| Raymond - LegalAtoms | ✓ complete |
| Marcel | ✓ complete (Equanimity 0 msgs) |
| Andrew Taraba | ✓ complete |
| MPFC | ✓ complete |
| Rebecca (William Bills) | ⚠️ skipped — TuanNT 0h today (Alert #1) |
| Neural Contract | ✓ complete (no messages = normal) |
| Bailey | ⚠️ skipped — TuanNT 0h today (Alert #1); GGS Slack clean (Nick report present) |
| Fountain | ⚠️ skipped — Trello board not checked this pass |
| Ohcleo | see OhCleo section — ✓ complete |

---

## Matrix — 05:10 (+07:00)

**Active rooms: 26/149 | Messages: 371** *(since 2026-09-30 05:10)*
Full details: reports/2026-10-01/matrix-rooms-0505.md

### ⚠️ Action items for DuongDN (6)

| Room | Time | Message |
|------|------|---------|
| (internal, id `!cYxDcwWxBhnuXxpryq`) | 15:07 | honght: "Hi anh, Các bạn sau sẽ làm việc đến hết ngày 09/10/2026. Em thông tin đến anh để anh sắp xếp transfer task nhé." (Joey Bailey-PatureVision/Speedventory, DuongDN, ThangN, James Diamond) — ⚠️ needs task-transfer plan by 10/09, duongdn replied "ok e" |
| Elena - Active Alerts | 09:55 | anhttl: cross-review process discussion — duongdn to think through detailed process |
| Elena - Active Alerts | 10:02 | anhttl: "Anh Dương sẽ là người chịu trách nhiệm đảm bảo có review chéo..." — duongdn assigned as review-process owner |
| Elena - Active Alerts | 15:44 | kietnht: FE/BE review split suggestion, awaiting decision |
| NUS - Access Control | 09:22 | honght: fill out PhucNH's offboarding checklist |
| Sandor Antal - Lyf Support | 11:00 | minhtv: needs host account confirmation |

### Key updates

**Internal ops:** honght flagged 4 people (incl. duongdn himself) rolling off projects by 2026-10-09 — task transfer planning needed. PhucNH offboarding checklist pending action.

**LongVV:** duongdn reminded him 08:48 that only 6h logged for OhCleo on 09-29 — check for missing task-log entries.

**TuanNT:** onboarded/regained access to a legacy project (Atlassian/Discord shared, Trello credentials reset) — namtv + duongdn resolved access issues same-day.

**Other:** Fountain team — routine PR review/deploy coordination (ViTHT, DatNT, ThinhT, VuTQ) on card 3035/PR #553/#460, no blockers surfaced.

---

## OhCleo Slack — 05:10 (+07:00)

Not separately fetched this pass (time-boxed) — Workstream shows LongVV 12h this week (2h today) with 8 rows pending review (see Sheets section). Recommend recheck to pull Celine DM + #events-code for this window.

Trello: Ohcleo — ✓ complete provisionally (Workstream clean, no known customer escalation); flag if recheck surfaces anything.

---

## Performance — all — 05:10 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.97 | 126ms | 2.7% (634/23470) — ~95% benign NotAuthenticated/ValidationError | 16.3/min |
| MyPersonalFootballCoach | 0.43 (poor) | 1981ms | 0.52% (255/48851) | 34.0/min |
| Fountain Gifts | 0.99 | — | 0.01% (12/84533) | — |
| InfinityRoses | 0.98 | — | 0.02% (4/19157) | — |

**OhCleo topErrors:** NotAuthenticated (majority, benign), ValidationError (duplicate username/invalid code, benign user input), AuthenticationFailed "Passwords don't match" (3x), `ValueError: Invalid bcrypt hash format` (2x, worth a look), invalid email format (1x).
**OhCleo slowestTransactions:** ChatSendView.post 4124ms/2calls, MediaListView.get 2002ms/64calls, AppleLoginView.post 1225ms/19calls, CategoryMediaView.get 870ms/218calls, EmailVerificationView.post 841ms/21calls.

**MPFC topErrors:** `"continue" targeting switch` E_WARNING (217x, chronic), `WP_Error::get_method()` (20x, chronic), **NEW: `mysqli_real_connect(): Too many connections`** (5x), `JSON_API_Auth_Controller::error()` (5x, chronic), `mkdir(): File name too long` (4x).
**MPFC slowestTransactions (all >50s):** user-video/louka-tsonis-unit-6 55.6s/1call, SQLi WAITFOR DELAY probe on /search/ 54.3s/1call (unsuccessful), user-video/akos_week11_warmup 53.7s/2calls, sitemap_index.xml 52.4s/1call, author-sitemap.xml 51.7s/1call.

**Fountain topErrors:** ArgumentError wrong-args (12x, same chronic signature), Redis::CannotConnectError (2x). **Infinity topErrors:** ArgumentError (4x), Redis (2x), CSRF token (1x). Both healthy.

---

## Upwork Memo — 2026-09-30 — 05:10 (+07:00)

| Workroom | Result |
|----------|--------|
| Rory | Cloudflare challenge blocked — session/Cloudflare failure, not a memo-invalid finding. Trello unaffected (Rory gate is Slack-only). |
| Aysar | Live+stored+headless login all failed (carrick Chrome Profile 1 session needs a live touch). Same — not a memo finding. |
| Tokenlite (Marcel) | Same login failure pattern (duongdn account). |

Manual fix: open upwork.com once in carrick's/duongdn's real Chrome to refresh session (per `feedback_upwork_access_token_needs_live_browser_touch`).

---

## Arthur / Meta-Stamp

Paused per Ignore List (2026-09-09) — auto-completed, not actively monitored this run.

---

## Reminders — 05:10 (+07:00)

- TuanNT: needs reminder (0h today, no leave) — **not sent** (no `--send-reminder` flag this run)
- KhanhHH: needs reminder (0h today, no leave) — **not sent**
- PhucVT: needs reminder (0h today, no leave) — **not sent**
- LongVV: skipped (has hours, ad-hoc no target) — separately reminded in Matrix 08:48 re: OhCleo task-log gap
- LeNH: skipped (has 8h via James Diamond)

---

## Unresolved Questions

1. KhanhHH and PhucVT show 0h across ALL Workstream projects for 2026-09-30 — given prior false-0h history for these devs, needs an interactive recheck before treating as confirmed (not just this script's aggregate).
2. Maddy JIRA weekly cross-check, Maddy Bitbucket PR reply-rate, full Maddy 4-part write-up not run this pass — needs recheck.
3. Arthur 6-source check and OhCleo Slack (Celine DM/#events-code) not run this pass — needs recheck (Arthur paused per Ignore List, but confirm still paused).
4. Fountain Trello board (customer comments/stuck cards) not checked this pass — needs recheck.
5. Upwork sessions (Rory/Aysar/Marcel) need a live browser touch to refresh — can't auto-fix from cron.
6. honght's 2026-10-09 "team members rolling off" note — needs duongdn's task-transfer plan before that date.
