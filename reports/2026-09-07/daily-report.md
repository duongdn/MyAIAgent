# Daily Report — 2026-09-07 (Monday)

**Run:** 2026-09-07T06:00:00+07:00 (cron)
**Window:** 2026-09-04T08:55:00+07:00 → now (spans weekend, last cron run was Fri 09-04)
**Leave plan:** PhucVT xin nghỉ 07- (see duongdn email); LongVV xin nghỉ sáng thứ 2 (tái khám lấy thuốc, per Matrix 09-04)

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Performance (OhCleo) | `MediaAddTrackAPIView.post` avg **450.8s** (2 calls) — severe new outlier, was already chronic slow endpoint, now far worse |
| 2 | Performance (OhCleo) | `MediaByKeyView.get` 16.4s/973 calls, `MediaByTagsView.get` 14.6s/682 calls — chronic slow endpoints, unresolved |
| 3 | Performance (MPFC) | Apdex 0.56 (poor) — chronic `WP_Error::get_method()` ×182, sitemap_index.xml 42.3s, author-sitemap.xml 38.9s, SQLi WAITFOR DELAY probes active on /search/ again |
| 4 | Email (rick@) | Fountain/InfinityRoses production errors (Rollbar) — 71 alert emails this window, dominant: `[FirstProject]` Uncaught Error ×5, `[FountainStaging]` InvalidAuthenticityToken ×3, ArgumentError ×4, `[InfinityRoses]` BadRequest ×2 — matches Fountain Performance findings, not yet independently triaged this run |
| 5 | Email (vuongtrancr@) | Swish "Signal lost for 10 minutes on Low Application Throughput" ×28 this window — recurring monitoring noise, needs review if pattern continues |
| 6 | Workstream | SSO login failed 2 genuine attempts this run (browser redirect succeeds, API token never fires) — Maddy/John Yi/Aysar/Elliott/Bailey/Rebecca/Fountain/Arthur hour-verification blocked, Sheets-side also empty (all sheets retired 2026-08-21) |
| 7 | Swift Studio (Rory/BXR) | Client jeff flagged recurring payment issues since July 20 ("too many payment issues") — Rory actively engaging, not yet resolved |
| 8 | Baamboozle (Aysar) | Trello item text itself flags "HẾT TASK" (out of tasks) / high risk — Carrick's MPDM update posted 09-04 confirms tasks in review queue but KhanhHH hour verification blocked by Workstream outage (#6) |
| 9 | GGS (Bailey) | Ongoing purchase-price=0 data investigation with Joey (customer) — ~910 affected products found 09-04, still being triaged as of last message (Datnc: "có vẻ ổng cũng nguôi rồi" — customer calmed down, may be resolving) |

**Today (Mon 09-07):** LongVV off Monday morning (medical follow-up); PhucVT leave noted in duongdn@ mailbox (date needs verification, likely 09-07).

---

## Email — all — 06:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 2 | 1 (PhucVT leave request — informational) | no events |
| carrick@nustechnology.com | 3 | 1 (SoCal daily summary) | no events |
| nick@nustechnology.com | 0 | 0 | no events |
| rick@nustechnology.com | 72 | 71 (Fountain/InfinityRoses Rollbar/BugSnag — see Alert #4) | no events |
| kai@nustechnology.com | 13 | 10 (JIRA LIFM2 mentions — informational) | no events |
| ken@nustechnology.com | 80 | 5 (welligence PR #5223 thread) | 08:30 DE Daily Standup Session, 09:00 DE Tech Talks, 08:30 DE Daily Standup (Teams) |
| vuongtrancr@gmail.com | 33 | 31 (Swish "Signal lost" ×28 — see Alert #5) | — |
| dnduongus@gmail.com | 54 | 2 (newsletter noise only — Careerviet, Scout APM marketing — not security alerts, no action) | — |
| davidztv19@gmail.com | 2 | 0 (Railway + Basecamp notifications, routine) | — |
| freelancer@mypersonalfootballcoach.com | 6 | 5 (Rollbar daily summaries + `WP_Error::get_method()` ×10-occurrence alert — matches Performance #3) | — |

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ all complete. Check mail card marked done.

---

## Slack — all — 06:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|--------------|
| Baamboozle | 34 | MPDM (Aysar gate): Carrick posted "Today's update" 09-04 — tasks done/dev-done, ready for Aysar review. Other channels: general product discussion (engineering/gamedev/customer-success), no alerts. |
| RDC - FM Monitoring | 39 | Mostly automated Tuner Access Log + Recovery Alert noise, routine (Franc) |
| Swift Studio | 12 | jeff (client) flagged recurring payment issues since Jul 20 + waiver bug back-and-forth with Rory — active discussion, not silent (Alert #7) |
| Xtreme Soft Solutions | 24 | Kai actively working RMS refund/relist flow with Anoma, routine |
| SAM GUARD - Mobile | 1 | HubSpot MQL lead notification, no alert |
| GLOBAL GRAZING SERVICES | 50 | Nick present, engaged with Joey (customer) on purchase-price=0 data issue (Alert #9), team actively investigating |
| Amazing Meds | 0 | No activity |
| Generator | 3 | Elliott/Carrick routine code review coordination |
| LegalAtoms | 11 | Raymond active, fixed a button regression, general team chatter — no direct ask to us unresolved |
| MyPersonalFootballCoach | 0 | No activity |
| William Bills | 0 | No activity |
| Equanimity | 14 | Carrick/komal.bailur active on XiD project scoping, no alert |
| SoCal Auto Wraps | 0 | No activity |
| Aigile Dev | 2 | Newsletter auto-post only |

Trello: MPFC, Colin, Andrew Taraba, Franc, Raymond ✓ complete (via mapped Slack/Discord check). Maddy, John Yi, Rory, Aysar, Elliott, Marcel left incomplete pending Workstream/further review.

---

## Discord — all — 06:12 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 25 | All dated 09-04 (Fri) — Vinn/bellatric02 fixing Visitor Check-In form (Live Host bug), jdiamond testing actively. Jeff posted daily report (4h) 09-04. No messages yet today (Mon, early morning) — not yet due. |
| Bizurk (nuscarrick) | 0 | No activity, no Andrew DMs |

Trello: James Diamond item left incomplete (Redmine-heavy gate needs its own check, not run this pass).

---

## Scrin.io — 06:14 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-06):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Sheets/Workstream — 06:20 (+07:00)

🔴 **Workstream unavailable this run** — SSO login attempted twice (headless browser flow), both times the Keycloak redirect completed but the API token never fired (`spawnSync ETIMEDOUT` / no token captured after 2 attempts). Google Sheets task-log system was fully retired 2026-08-21 (all projects moved to Workstream) so there is no Sheets fallback data either — `sheets-tasklog-scan.js` returned all-zero/empty for LongVV, PhucVT, TuanNT, KhanhHH, LeNH.

**Cannot verify today's hours for any dev.** Per existing rule this is a genuine infra failure, not a 0h finding — do NOT treat as shortfall alerts. Maddy, John Yi, Aysar, Elliott, Bailey, Rebecca, Fountain (task-log part), Arthur (Crystal lang hours), Blair Brown gates all left incomplete on Trello pending recheck.

Maddy JIRA cross-check: not run this pass (blocked behind Workstream week data) — defer to recheck.

---

## Fountain — 06:22 (+07:00)

**Part 1 — Matrix Plan:** Room `!tGBJevbuSmjqVePBPN` / `!tjCgQZrjJvNUoslbCn` — 09-04 thread: plan-hours discrepancy flagged (trinhmtt reported 12h vs. real plan 16h for one dev, second occurrence of same-row error) — TrinhMTT unable to view the sheet directly (no edit rights) to self-correct. No new week plan posted yet (Monday, before 09:30 — expected ~08:30-09:30, recheck later).

**Part 2/3 (Task Log Actuals / Plan vs Actual):** Blocked — same Workstream outage as Sheets piece above (`fountain` project id `cmpqcjojh00q2tk1v2qi7gs0j` not queryable this run).

**Trello board:** Not checked this pass (defer to recheck) — Rick's board customer-comment scan not run.

Trello: Fountain item left incomplete (partial — only Part 1 partially done, Parts 2/3/Trello not verified).

---

## Elena — 06:25 (+07:00)

1 open PR on `Elena-SamGuard-Digital-Plant`: **#309** "Implement header and modal components with i18n support" (nusken, opened 2026-08-11, stale ~4 weeks, base `nus/dp-20260811`) — not reviewed/merged this run (needs CodeRabbit review check before merge, deferred to avoid a rushed merge decision under this run's time budget).
Precognize (nusken): not checked this pass.
WordPress SamGuard console check: not run this pass.

Trello: Elena - SamGuard left incomplete (stale PR needs attention); Elena - WordPress left incomplete (not checked).

---

## Trello — 06:28 (+07:00)

- Check mail: DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ all complete → **card marked done**.
- Check progress: MPFC, Colin, Andrew Taraba, Franc, Raymond, Colin ✓ completed this run (verified clean via mapped Slack/Discord sources above).
- Remaining items (Maddy, John Yi, James Diamond, Rory, Aysar, Elliott, Marcel, Elena-SamGuard, Neural Contract, Bailey, Rebecca, Fountain, Philip, Ohcleo, Arthur, Blair Brown, Elena-WordPress) left incomplete — either real findings (Rory/Aysar/GGS-Bailey investigations, stale Elena PR) or not independently re-verified this run (Workstream outage blocks the hour-verification half of most of these gates).

---

## OhCleo Slack — 06:30 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | ~15 | Celine informed Tony (09-04) she's reducing his hours to 40-50% (~20h/week) starting next week due to budget, pending AI companion feature results reassessment in 2-3 weeks. Asked Tony's preference on schedule shape. Discussion about uploading a test track (upload failure, Tony fixed large-file-upload issue, follow-up pending). No unresolved question — informational/expected (matches Matrix "BDD - Delivery" room note on Celine's 20h/week decision). |
| #events-code | 0 | No activity |

Tony daily report: not explicitly confirmed present/absent this run — no red flag found in DM content.

Trello: Ohcleo ✓ complete (no unresolved client-facing issue).

---

## Performance — 06:32 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.88 | 737ms | 2.6% (2172/82137) — ~93% benign NotAuthenticated/InvalidToken/AuthenticationFailed | 19.0/min |
| MPFC | 0.56 | 1085ms | 0.31% (218/70386) but severity from slow transactions, not error count | 16.3/min |

**OhCleo — top errors:**
| Error | Count |
|-------|-------|
| rest_framework.exceptions:NotAuthenticated | 2017 |
| rest_framework_simplejwt InvalidToken | 62 |
| AuthenticationFailed: User does not exist! | 26 |
| AuthenticationFailed: Passwords don't match! | 18 |
| ValidationError: email already exists | 17 |

**OhCleo — slowest transactions:**
| Endpoint | Avg ms | Calls |
|----------|--------|-------|
| MediaAddTrackAPIView.post | 450,779 | 2 |
| MediaByKeyView.get | 16,443 | 973 |
| MediaByTagsView.get | 14,643 | 682 |
| HomeMediasView.get | 3,476 | 1984 |
| GetBookMarkDetailsView.get | 3,309 | 2096 |

**MPFC — top errors:**
| Error | Count |
|-------|-------|
| Call to undefined method WP_Error::get_method() | 182 |
| E_WARNING "continue" targeting switch | 10 |
| E_WARNING mkdir(): File name too long | 6 |
| mysqli_real_connect DNS resolution failure | 6 |
| E_COMPILE_ERROR legacy-widget.php missing | 4 |

**MPFC — slowest transactions:**
| Endpoint | Avg ms | Calls |
|----------|--------|-------|
| sitemap_index.xml | 42,319 | 2 |
| author-sitemap.xml | 38,852 | 1 |
| search/*/feed/rss2/ | 22,483 | 4 |
| search/c/feed/rss2/ | 19,376 | 1 |
| search/... WAITFOR DELAY SQLi probe /feed/rss2/ | 12,861 | 1 |

Fountain/InfinityRoses New Relic not queried this run (time-boxed) — cross-reference rick@ email alerts (#4) instead this pass.

---

## Arthur / Meta-Stamp — not run this pass

Deferred to recheck — Workstream outage (#6) would block the Crystal-lang hours part anyway, and the full 4-part depth check needs dedicated time not available in this run's budget.

---

## Upwork Memo — not run this pass

Deferred to recheck.

---

## Reminders — 06:34 (+07:00)

Not run — Workstream/Sheets hour data unavailable this run (#6), so 0h determination isn't possible. Deferred to recheck once Workstream is back.

---

## Matrix — 06:06 (+07:00)

**Active rooms: 28 / 144 | Messages: 764** *(since 2026-09-04 08:55)*
Full details: reports/2026-09-07/matrix-rooms-0606.md

### ⚠️ Action items for DuongDN (1)

| Room | Time | Message |
|------|------|---------|
| LongVV personal room | 13:39 | longvv: "e sắp hết task rùi a Dương ới, bên Maddy thì đang chờ ổng approve thêm 1h nữa..." — LongVV running low on tasks across Maddy/Kevin/James, asked what to do next. Duong replied same day (OhCleo, James review, Slack/PHP-Laravel upgrade suggestions) — resolved same-thread. |

### Key updates

**LongVV / task allocation** (09-04): LongVV nearly out of billable tasks — Duong redirected him to OhCleo + James Diamond review work + suggested PHP/Laravel upgrade proposal for an old project. LongVV also requested Monday morning off (medical). PhucVT going on 2-week leave starting next week (per namtv) — team discussing backfill: LongVV to take over Celine/OhCleo primarily, PhongTB as backup if things get messy.

**Bailey (GGS) — purchase price = 0 investigation** (09-04, "Bailey - BA/QC" room, 52 msgs): Customer Joey escalated angrily about a purchase-price data discrepancy; team (datnc/tuannt) found ~910 products with purchase_price=0, traced to a likely Prestashop resync/supplier-change issue from June. Sent partial explanation to customer, customer appeared to calm down by end of window ("có vẻ bác bth lại gòi"). Not fully resolved — customer still may push back this week.

**Celine/OhCleo** (231 msgs, "Celine - OhCleo" room): High dev-team activity — PR review process correction (PhucVT was creating PRs incorrectly, redirected to `apps.nustechnology.com/dev-tools`), AI persona/admin-tool design discussion with client, mobile build QA cycle (hungpn/luhx), spam-test email caution reminder (namtv), live→staging data migration estimate discussion. No unresolved client-facing issue found — all threads show forward progress.

**Fountain plan-hours discrepancy** (Matrix rooms `!tGBJevbuSmjqVePBPN`/`!tjCgQZrjJvNUoslbCn`): trinhmtt reported a DM-hours mismatch (12h vs plan's 16h) for the second time on the same row — flagged to Duong, TrinhMTT lacks edit access to self-verify. Needs a process fix (view/edit access) to stop recurring.

**Other:**
- Elliott/GreenFort: Aysar + Franc both confirmed to have tasks for next week (KhanhHH); reduced roadmap in effect starting next week per client request.
- Radio Data Center (Elena/GGS override thread "@room log workstream đầy đủ và đúng project"): tuantt/Khanh flagged a case of a dev mis-logging hours to the wrong project, causing a client undercharge — team-wide reminder issued to log accurately.
- BXR/Rory: Backend info from Rory (HubSpot account) still incomplete per KhanhHH; team is now logging Workstream hours in maximal detail because "Lão ko chịu trả tiền" (client not paying reliably).

---

## Timeline Update

`daily_report.last_run` and `arthur_monitor.last_run` NOT fully advanced past what could be verified — see notes below and config update.

## Unresolved Questions

1. Workstream SSO — 2 genuine attempts failed this run (redirect OK, token never captured). Needs a manual/interactive login session to fully unblock hour verification, Maddy/Aysar/Elliott/Bailey/Rebecca/Fountain/Arthur/Blair Brown Trello gates.
2. Elena PR #309 (4 weeks stale) — needs CodeRabbit review + merge decision, not actioned this run.
3. Arthur, Upwork Memo, Reminders, Elena-WordPress, Fountain Part 2/3+Trello, James Diamond (Redmine) — not run this pass, all deferred to recheck.
4. Fountain plan-sheet access — TrinhMTT needs edit/view rights fixed to stop repeat hour-mismatch reports.
