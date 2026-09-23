# Daily Report — 2026-09-24 (Thursday)

**Run:** 2026-09-24T05:00:00+07:00 (cron)
**Window:** 2026-09-23T08:45:00+07:00 → 2026-09-24T05:00:00+07:00
**Leave plan:** KhanhHH has a leave request pending approval (email from Chien Tran re: "KhanhHH - Đơn xin nghỉ phép 04") — not yet confirmed applied.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets/Workstream (all devs) | Workstream SSO outage this run — API refresh + 2x browser login attempts (headless + visible) all failed with "SSO redirected but API never fired". PhucVT/TuanNT/KhanhHH/LeNH/LongVV hours unverified. Known recurring outage (5+ prior occurrences), not a local DISPLAY issue. |
| 2 | LegalAtoms (Slack) | hamidsalamatali97 posted a direct urgent ask tagging `<@UJE7XHT4L>`: "Please fix this asap, urgent tasks are blocked" re: github.com/rhuang/juristium-clone/issues/21815. Could not confirm a reply in this window. |
| 3 | MPFC (New Relic) | Apdex 0.46 (poor, chronic). `WP_Error::get_method()` fatal recurring (192x). New SQLi WAITFOR probe on `/search/` feed (26.4s) — same probe pattern seen before, unresolved. |
| 4 | Fountain | Task-log actuals (Part 2) and plan-vs-actual (Part 3) unverifiable — blocked by Workstream outage (#1). Matrix weekly plan (Part 1) not found in this window (may be from earlier in week; not re-fetched due to time-boxing). |

**Today (Thu, Sep 24):** No confirmed leave besides KhanhHH's pending request (not yet effective). All others presumed present.

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 1 | KhanhHH leave request (pending) | no events |
| carrick@nustechnology.com | 2 | Rollbar: Socalautowraps prod error #11 (10th occurrence) — SoCal not actively monitored (dropped 2026-05-11) | no events |
| nick@nustechnology.com | 0 | — | no events |
| rick@nustechnology.com | 36 | FountainStaging: heavy staging-error volume (CSV import NoMethodError/PG::UndefinedFile family, recurring — dev/QA noise, not new); InfinityStagingBE 2 new errors (#114/#115 NoMethodError) | HEAL Meeting 12:30, OmniGPT Daily Sync 10:30 |
| kai@nustechnology.com | 3 | JIRA mentions LIFM2-467/465 (Madhuraka/Anoma) — routine | no events |
| ken@nustechnology.com | 80 | Precognize PR activity (Sr 7771, Sr 7482) + welligence/web + mimaizumi noise — routine dev traffic | DE Daily Standup 08:30, Tech Talks 09:00 |
| vuongtrancr@gmail.com | 15 | No Swish/Zendesk alerts found | — |
| dnduongus@gmail.com | 26 | No security alerts | — |
| davidztv19@gmail.com | 0 | — | — |
| freelancer@mypersonalfootballcoach.com | 3 | Rollbar MPFC Daily Summary: 2 existing prod errors (see Performance section) | — |

Trello: DuongDn, Carrick, Nick, Rick, Kai, Ken — all ✓ complete (no blocking alerts on any single account's own gate).

---

## Slack — all — 05:15 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|--------------|
| Baamboozle | 9 | Carrick's "Today's update" posted in MPDM (gate satisfied). Dev/QA back-and-forth on nusdev fixes. |
| RDC - FM Monitoring | 2 | Carrick following up with dmetiner on device setup plan — our own outbound message, no customer complaint. |
| Swift Studio | 0 | — |
| Xtreme Soft Solutions | 8 | Kai actively replying to Madhuraka/Anoma feedback. |
| SAM GUARD - Mobile | 0 | — |
| Global Grazing Services | 24 | Nick's "Today Report" posted in #général. Heated but normal dev/customer back-and-forth (Joey) on dashboard cover calc — feature discussion, not an outage. |
| Amazing Meds | 0 | — |
| Generator | 0 | — |
| LegalAtoms | 1 | ⚠️ See Alert #2 above. |
| MyPersonalFootballCoach | 0 | — |
| William Bills | 0 | — |
| Equanimity | 9 | Marcel/Carrick + komal.bailur QA discussion (attendance tenant review); Carrick asked for more Upwork hours — normal ops. |
| SoCal Auto Wraps | 0 | Not monitored (dropped). |
| Aigile Dev | 1 | Blog posts merged to staging — informational. |

Trello: Maddy, Rory, Aysar, Franc, Elliott, MPFC, Marcel, Colin (ignore list), Andrew — see per-item notes below. John Yi ✓ (0 msgs). LegalAtoms ⚠️ skipped (alert #2).

---

## Discord — all — 05:20 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 3 | Vinn's daily report present (feature work). Jeff Trinh's daily report present (4h, marker click handling). |
| Bizurk (nuscarrick) | 0 (+4 DM) | Andrew (animeworld) DM: closing out old Upwork contract, will open new one for next task — informational, no action needed. |

Trello: James Diamond - Vinn ✓ complete. Andrew Taraba ✓ complete.

---

## Sheets/Workstream — all — 05:25 (+07:00)

🔴 **Workstream SSO unavailable this entire run** (see Alert #1). Tried: proactive token refresh, API refresh (2x), headless browser login (2 attempts), visible browser login (`DISPLAY=:1`, 2 attempts) — all failed at the same step ("SSO redirect detected — Keycloak cookies alive" but API token never captured). Google Sheets task-log system was fully retired 2026-08-21 (all projects migrated to Workstream) — there is no fallback data source this run.

Cross-checked via other channels where possible:
- **TuanNT** — heavy live activity in "NUS - Bailey - Paturevision 2026" Matrix room all day (GGS/Grazing bug fixes, RDS upgrade tasks) — clearly working, but exact hours unverified.
- **KhanhHH** — pending leave request submitted today; MPDM "Today's update" was posted by Carrick (not Khanh directly) — Khanh's own hours unverified.
- **LeNH, PhucVT, LongVV** — no direct activity signal found this window; hours unverified.

**Maddy JIRA weekly cross-check:** not run this pass — time-boxed due to Workstream outage consuming the retry budget. Needs recheck.

---

## Scrin.io — 2026-09-23 — 05:30 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-23):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:35 (+07:00)

**Part 1 — Matrix Plan:** Weekly plan message (ViTHT/ThinhT/VuTQ hours) not found in the "Kunal - Fountain" room activity for this window — only day-to-day dev/QA chatter (CSV upload bug: hungpn/vitht/datnt fixing a "gifts CSV not linking to product catalog" issue, actively worked and pushed to staging/production today). Plan-posting room content not re-fetched back to Monday this run (time-boxed) — recheck needed.

**Part 2 — Task Log Actuals:** Blocked by Workstream outage (Alert #1). Not verified.

**Part 3 — Plan vs Actual:** Cannot compute without Parts 1+2 data this run.

**Trello board (customer comments/stuck cards):** Not checked this run (time-boxed — prioritized live monitoring pieces given Workstream outage ate significant time budget).

Trello: Fountain ⚠️ left incomplete — recheck all 3 parts.

---

## Elena — 05:40 (+07:00)

**Elena - SamGuard Digital Plant:** On Ignore List (paused per 2026-09-09 decision) — auto-completed, not actively monitored. (Note: 1 open PR #309 from nusken exists but per pause status, not merged/deployed this run.)

**Elena - WordPress SamGuard (samguard.co):** Checked via `wordpress-samguard-check.js` — 0 JS errors, 0 page errors, 0 CSP violations. Only benign GA/ads `failedRequests` (analytics beacons, `net::ERR_ABORTED` from ad blockers/CSP-neutral). Clean.

Trello: Elena - SamGuard ✓ auto-complete (Ignore List). Elena - WordPress SamGuard ✓ complete (clean).

---

## Trello — progress/mail — 05:45 (+07:00)

**Ignore List (auto-completed, not actively monitored):**
Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip
(Note: Arthur - Meta-Stamp had real activity today — PhucVT/TienND/Nam/DuongDN discussing M4 estimate and fixed-price/carryover terms with the client — informational only, per pause status no action required this run.)

**Completed this run:**
- Maddy — ⚠️ left open (see below, needs full 4-part check + WS hours)
- John Yi - Amazing Meds ✓ (0 Slack activity, no alert)
- James Diamond - Vinn ✓ (Discord reports present)
- Rory ✓ (Slack quiet, ad hoc project)
- Aysar ✓ (MPDM update posted)
- Franc ✓ (RDC ad hoc, no alert)
- Elliott ✓ (Generator quiet)
- MPFC ✓ (Slack quiet)
- Marcel ✓ (Equanimity normal ops)
- Neural Contract ✓ (Upwork Cloudflare-blocked = not an alert per rule)
- Ohcleo ✓ (Tony's report present, Celine engaged positively)
- Elena - WordPress SamGuard ✓ (clean)
- Elena - SamGuard, Colin, Arthur, Blair Brown, Philip ✓ (Ignore List)
- DuongDn/Carrick/Nick/Rick/Kai/Ken (mail) ✓

**Left incomplete (need recheck):**
- Maddy - Carrick/Kai/Luis — full 4-part check (Slack+hours+JIRA+Bitbucket) not run this pass; Workstream hours unverified.
- Raymond - LegalAtoms — ⚠️ Alert #2, direct customer ask unconfirmed as answered.
- Bailey — Slack ggs clean (Nick's report present) but TuanNT combined hours unverified (Workstream outage) — left open pending hours confirmation.
- Rebecca (William Bills) — Slack quiet but TuanNT hours unverified (same outage) — left open.
- Fountain — 3-part check incomplete (see Fountain section).

---

## Reminders — 05:50 (+07:00)

Not run this pass — cannot determine 0h devs without Workstream data (Alert #1). No reminders sent.

---

## Matrix — 05:12 (+07:00)

**Active rooms: 23 / 146 | Messages: 768** *(since 2026-09-23 08:45)*
Full details: reports/2026-09-24/matrix-rooms-0512.md

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| !SHdFKwrYpRhWJBtiBv | 09:33 | vutq: "anh Dương ơi anh có nắm account DigitalOcean không ạ - để login rồi em báo Kunal lấy 2FA" — needs DuongDN's DO account access for Kunal's 2FA setup |
| Arthur - Meta-Stamp | 09:28 | tiennd: "hi anh Năm, anh Dương, trong msg có 3 phần 1. Fixed Price và ngày bàn giao cho carryover + M4 (est 54h) và price for each separate (est 14h)" — awaiting DuongDN's input on Arthur pricing/estimate structure (Arthur is paused for active monitoring, but this direct ask still needs a reply from DuongDN personally) |

### Key updates

**Fountain — CSV import bug** (10:45-16:14):
- datnt pushed a fix for gifts CSV upload not linking to product catalog; hungpn found a submit-without-file edge case, datnt handled it, confirmed fixed by 15:15, card sent to Kunal.

**Bailey/Paturevision — active dev day** (08:44-17:25):
- TuanNT + vutq working through Console/Staging upgrade tasks (RDS, PrestaShop sync). SiteGround storage at 78% flagged by DuongDN as a maintenance task. Grazing dashboard cover-formula bug fixed and re-verified twice during the day (tuannt).

**Arthur - Meta-Stamp — pricing discussion** (08:43-10:47):
- TienND relaying client's 3-part estimate ask (Fixed Price + carryover/M4 est 54h + per-item pricing est 14h) to DuongDN/NamTV. PhucVT completed the "Cleanup" item, messaged Chris. Awaiting DuongDN's direct reply (see action items).

**Other:**
- Aysar Khalid/Baamboozle: DuongDN handed off Khanh's Aysar/Franc/Rory coverage to LeNH for Khanh's day off this weekend.
- Celine - OhCleo: 90 messages — Tony/Celine actively iterating on tagging AI rollout plan (see OhCleo Slack section for the customer-facing summary).

---

## OhCleo Slack — 05:55 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 3 | Tony: "My report today • overall compliance current library (dev done) • Cover Art Generation (dev done)" (10:20). Celine: excited to see visuals/tagging in app (14:33). Tony: plan to run AI tagging on ~100 tracks first for review before full 7,000-track run (14:39). |
| #events-code | 0 | `channel_not_found` — bot removed from channel (known issue, needs admin re-invite, not an auth failure) |

Tony's daily report: present at 10:20. No alerts — positive customer engagement.

Trello: Ohcleo ✓ complete.

---

## Performance — 06:00 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput window |
|---------|-------|---------------|------------|--------------------|
| OhCleo (prod) | 0.96 | 153ms | 2.8% (1054/37625) — 92% benign NotAuthenticated/InvalidToken | since 2026-09-22 09:00 |
| MPFC (prod) | 0.46 | 1336ms | 8.2% (6880/83379) | since 2026-09-22 09:00 |

**OhCleo top errors:** NotAuthenticated (971), InvalidToken (28), email-exists ValidationError (17), "Passwords don't match!" AuthenticationFailed (8), username-exists ValidationError (8) — all benign auth/validation noise.

**OhCleo slowest transactions:** ChatSendView.post 3591ms/16 calls; GetBookMarkDetailsView.get 1226ms/1264 calls; CancelSubscriptionView.post 1208ms/1 call; CreatorVerificationApproveView.post 1168ms/2 calls; ValidatePurchaseView.post 1053ms/3 calls.

**MPFC top errors (chronic):** `"continue" targeting switch` E_WARNING (6479x — dominant, chronic); `WP_Error::get_method()` fatal (192x, chronic, unresolved for months); Countable warning (27x); mysqli_real_connect socket error (4x); mkdir filename-too-long (3x).

**MPFC slowest transactions:** sitemap_index.xml 64.8s/1 call; author-sitemap.xml 59.3s/1 call; a SQLi `PG_SLEEP(15)` probe on `/search/` feed 26.4s/1 call (same probing pattern as before — no successful injection, just a slow WAITFOR/SLEEP response); podcast episode page 24.9s/1 call; a second SQLi `waitfor delay '0:0:15'` probe on `/search/` feed 22.6s/1 call.

**Fountain / InfinityRoses:** not queried this run — time-boxed (Workstream outage consumed retry budget).

---

## Upwork Memo — 2026-09-23 — 06:05 (+07:00)

| Workroom | Status |
|----------|--------|
| Rory | Cloudflare challenge — session/Cloudflare block, not a memo-validity finding |
| Aysar | Cloudflare challenge — same |
| Neural Contract | Cloudflare challenge — same (messages-only workroom, no memos expected anyway) |

No alert per existing rule (session/Cloudflare failure ≠ memo status). Trello: Rory/Aysar items already completed above on their Slack gate — memo validity unconfirmed this run, does not change gate.

---

## Ignore List — 06:07 (+07:00)

Not tracked (paused), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip

---

## Unresolved Questions

1. Was the LegalAtoms urgent `@UJE7XHT4L` ask (Alert #2) ever answered? Could not confirm in this window — needs recheck.
2. Workstream SSO outage (Alert #1) — same recurring pattern as prior 5+ incidents; root cause still not fixed on the platform side. Blocks all task-log hour verification (TuanNT/KhanhHH/LeNH/PhucVT/LongVV) and Fountain Parts 2-3.
3. Fountain's current-week Matrix plan message (Part 1) wasn't located in this window's activity — needs a dedicated fetch back to Monday morning.
4. DuongDN has 2 pending direct Matrix asks (DigitalOcean 2FA access for Kunal; Arthur pricing structure reply) — need his personal response, not something this run can resolve.
5. Maddy's mandatory 4-part check (JIRA + Bitbucket + hours) was not run this pass — needs a dedicated recheck once Workstream is back.
