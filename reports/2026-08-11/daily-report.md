# Daily Report — 2026-08-11 (Tuesday)

**Run:** 2026-08-11T07:42:00+07:00 (cron)
**Window:** 2026-08-10 14:22 +07:00 → now
**Leave plan (2026-08-10, from Delivery - Resource Arrangement):** LongVV (sáng, tái khám → tính bên Celine), PhongTB (sáng, đau đầu → idle/internal), ThoTNT (bị sốt → TamVT bù bên Zeke), PhucNH (bị bệnh → TienND bù bên MyID). Future: TienND off 08-14 (du lịch, tính bên MyID ko bù), KhanhHH off 08-17, VinhNT off 08-14 (du lịch, Michael Koh dùng PL). All leave notes processed per halt 17:35.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | 🔴 Workstream (all pieces) | SSO login stuck in a redirect loop all run (6+ attempts, 2 approaches, fresh browser profile) — "Keycloak cookies alive" but API token never captured. Blocks: Sheets piece (LongVV/PhucVT/KhanhHH/LeNH hours — all migrated off Sheets), Fountain Parts 2-3, Maddy JIRA task-log check, TuanNT's Workstream-tracked projects (John Yi/Rebecca/Neural). Needs interactive recheck. |
| 2 | Baamboozle / Aysar (MPDM C07SQ4HAUHZ) | Unanswered customer ask from heyitsronanc (Ronan): baamboozle.nusdev URL leaked, security risk, wants renamed to bbzl.nusdev — no reply as of window end. |
| 3 | MS Teams (Philip) | Microsoft "unusual activity" security challenge blocks login even after clearing stale profile (per known fix) — genuinely needs interactive 2FA this time. Philip's customer-message status unverified this run. |
| 4 | Slack Solid Code (Arthur) | Token refresh failed (Google OAuth flow, no token captured) — Arthur's Slack sources (3 channels incl. Art's 1:1 DM) unverified this run. Matrix + GitHub sources for Arthur are clean (see below). |
| 5 | Upwork (Rory/Aysar/Neural) | carrick's real Chrome Profile 1 session logged out (0 cookies extracted) — live-cookie, stored-session, and headless re-login all failed. Memo validity unverified this run. |
| 6 | MPFC New Relic | Apdex 0.57 (poor, <0.7 threshold) — chronic: `WP_Error::get_method()` 69x, `continue`-targeting-switch E_WARNING 126x, SQLi WAITFOR DELAY probe active on /search/ again (13.3s), sitemap 46s/43s. All previously-seen chronic issues, no new error classes. |

**Today (Tue 08-11):** no new leave notes posted yet this morning (checked at 07:42, too early for daily standups in most workspaces).

---

## Email — all — 07:xx (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 0 | — | no events |
| carrick@nustechnology.com | 8 | Elliott/Generator Bug #80310 (Redmine); generator-api GitLab staging pipeline failed x2 | no events |
| nick@nustechnology.com | 0 | — | 21:30 Weekly Meeting with Devs |
| rick@nustechnology.com | 9 | InfinityRoses Daily Summary; FountainStaging NoMethodError (orders#order_status) + ActiveStorage::FileNotFoundError (BugSnag); FountainStagingBE NoMethodError (Rollbar); FirstProject 10 occurrences/5min Uncaught Error + new TypeError | 12:30 HEAL Meeting, 10:30 OmniGPT Daily Sync |
| kai@nustechnology.com | 7 | 5x JIRA Madhuraka mentions (LIFM2-436/446/451/457) | no events |
| ken@nustechnology.com | 80 | GitHub PR/dependabot activity on welligence/web + mimaizumi/amocc-material (external subscriptions, not Precognize) | 08:30 DE Daily Standup x2, 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 3 | 2x New Relic "Signal lost 10min — Low Application Throughput" (Swish) | — |
| dnduongus@gmail.com | 10 | none (LinkedIn/newsletter/bank noise, filtered) | — |
| davidztv19@gmail.com | 1 | none (Basecamp ResidentRadius notification) | — |
| freelancer@mpfc | 4 | Google Workspace "possible unresolved security risks" notice (routine admin-console nag, not an incident) | — |

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ complete. Card marked done.

---

## Slack — all — 07:xx (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 3 | ⚠️ heyitsronanc (Ronan) asked to rename leaked baamboozle.nusdev URL → bbzl.nusdev (security concern), no reply yet. Also: certificate AI drafts shared (customer-success), meeting prep note. |
| RDC - FM Monitoring | 5 | Automated "Tuner Access Log" bot posts only — no Franc content. |
| Swift Studio | 3 | me1 (client dev) discussing Mindbody OAuth token flow for BXR booking — project dev topic. |
| Xtreme Soft Solutions | 0 | No activity. |
| SAM GUARD - Mobile | 5 | process-digital-plant PR review/merge coordination (Elena team) — routine. |
| Global Grazing Services | 0 | No activity in #maintenance. |
| Amazing Meds | 0 | No activity (token valid, genuine 0). |
| Generator | 1 | Jeff reported rsvpStatusLabel iOS regression (return value "Available"→nil) — internal dev bug report, not customer-facing. |
| LegalAtoms | 2 | Both messages confirmed NOT Nick-specific (@kafayatmushtaq, @kadnan572) — filtered per gate. |
| MyPersonalFootballCoach | 0 | No activity. |
| William Bills | 0 | No activity. |
| Equanimity | 2 | carrick "OK" ack; komal.bailur/SGBuildEx BTO test discussion — routine. |
| SoCal Auto Wraps | 0 | Dropped, not monitored. |
| Aigile Dev | 1 | Automated Sentry morning check: 0 urgent new, 0 non-urgent new, 6 standing chronic (unchanged) — no new alert. |

Trello: Rory, Franc, MPFC, Marcel, Raymond ✓ complete. Aysar ⚠️ skipped (unanswered customer ask). Maddy, John Yi, Elliott ○ held pending Workstream recheck.

---

## Discord — all — 07:xx (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 3 | Vinn's 08-10 report directly addresses bellatric02's 08-10 11:39 contractor-access ask ("Check the request to allow contractors...instructions once accounts set up") — resolved, not stonewalled. dapackage: PR 649/650 ready (health & safety module revamp). |
| Bizurk (nuscarrick) | 0 | No messages, no Andrew DMs. |

Trello: James Diamond, Andrew Taraba ✓ complete.

---

## Sheets — all — 07:xx (+07:00)

🔴 **Workstream unavailable this entire run** (see Alerts #1). Since ALL projects except Bailey have migrated to Workstream, a genuine 0h-in-Sheets result for LongVV/PhucVT/KhanhHH/LeNH is now **expected** (they no longer log there), not evidence of a shortfall — confirmed by Matrix activity showing PhucVT and LongVV both very active on OhCleo work all day 08-10 (PhucVT formally transferred to OhCleo project effective 08-10, per Matrix room `!jdRjAfKSApYvxzoxDV`).

| Developer | Sheets (2026-08-10) | Workstream | Status |
|-----------|---------------------|------------|--------|
| LongVV | 0h (expected, migrated) | unverified — WS down | Not alerted (weekly-total gate only; also active on OhCleo per Matrix) |
| PhucVT | 0h (expected, migrated) | unverified — WS down | Not alerted (active on OhCleo setup per Matrix, formally transferred 08-10) |
| TuanNT | Paturevision/Bailey: 0h, no leave note found | John Yi/Rebecca/Neural — unverified, WS down | ⚠️ held pending recheck — cannot confirm combined total |
| KhanhHH | 0h (expected, migrated) | unverified — WS down | Held pending recheck (extra caution per history) |
| LeNH | 0h (expected, migrated) | unverified — WS down | Held pending recheck |

Maddy JIRA weekly cross-check: also blocked (script's Workstream call hit the same SSO failure). Held.

Trello: Bailey, Rebecca, Maddy, John Yi, Elliott, Blair Brown ○ held pending Workstream recheck (all gate on TuanNT/KhanhHH/LeNH/LongVV Workstream data unavailable this run).

---

## Fountain — matrix + sheets + trello — 07:xx (+07:00)

**Part 1 — Matrix plan:** ⚠️ No new weekly plan posted this week. @trinhmtt's last message in `!EWnVDAxbTGsBxPkaaI` was 2026-08-05 — silent through Monday 08-10 (past the usual 08:30-09:30 posting window) and into today. Using **last known plan (week of 08-03)** for context: ThinhT 20h, DatNT 32h, ViTHT 40h, VuTQ 8h → QC 25h. Room itself is active (ThinhT/VuTQ/HungPN/DatNT all working GOC/cart bugs 08-10), just no formal plan post.

**Part 2 — Task log actuals:** Blocked — Workstream `fountain` project query failed (SSO outage, see Alerts #1).

**Part 3 — Plan vs actual:** Blocked (depends on Part 2).

**Trello board:** 985 done, todo 20, bugs 8, doing 11, qc_internal 8, qa_backlog 3, in_qa 1, not_passed 1. 43 stuck cards in active lists (>5d no activity) — all chronic long-tail backlog items (oldest 229d), nothing newly stuck. 0 hard-to-release (doing 14+d). 1 customer comment (kunalsheth, 08-10 19:50+07): feature-scoping feedback on account-scoped product catalog UI (routine collaboration on in-progress card, not a complaint).

Trello: Fountain ○ held (Parts 2-3 unverified).

---

## Elena — 07:xx (+07:00)

- Internal repo (`Elena-SamGuard-Digital-Plant`): 0 open PRs.
- Precognize (`nusken`): 0 open PRs from nusken (5 open PRs total, all from mahkris/nusdavid/briannus/nus-aron — not ours to merge).
- WordPress samguard.co: clean — 0 JS errors, 0 page errors, 0 CSP violations. Only benign GA/ads analytics `net::ERR_ABORTED` noise (non-CSP).
- Matrix (Elena rooms): normal PR/QC coordination for reminder feature (AA4) and Digital Plant PR #5014 code-completeness question — both resolved same day.

Trello: Elena - SamGuard, Elena - WordPress SamGuard ✓ complete.

---

## Trello — progress + mail — 07:xx (+07:00)

**Check mail:** DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ complete. Card marked done.

**Check progress:**
- ✓ complete: James Diamond, Rory, Franc, MPFC, Marcel, Elena - SamGuard, Raymond, Neural Contract, Andrew Taraba, Colin, Ohcleo, Elena - WordPress SamGuard
- ⚠️ skipped: Aysar (unanswered customer ask, see Alerts #2)
- ○ held pending Workstream recheck: Maddy, John Yi, Elliott, Bailey, Rebecca, Fountain, Blair Brown
- ○ held pending other tool recheck: Philip (MS Teams auth), Arthur - Meta-Stamp (Solid Code Slack auth)

---

## Reminders — 07:xx (+07:00)

Not run this cycle — Workstream outage makes any 0h-in-Sheets signal unreliable for the 4 migrated devs (LongVV/PhucVT/KhanhHH/LeNH now log hours in Workstream, not Sheets). Sending a "0h" reminder based on Sheets alone would risk a false alarm (see `feedback_marginal_daily_shortfall_check_weekly` history). No reminders sent. Will re-evaluate once Workstream recovers.

---

## Matrix — 07:16 (+07:00)

**Active rooms: 25 / 138 | Messages: 405** *(since 2026-08-10 08:00 +07:00 — script's own safety window, wider than daily_report.last_run 14:22)*
Full details: reports/2026-08-11/matrix-rooms-0716.md

### Key updates (new since 14:22 cutoff)

**OhCleo — PhucVT formally onboarded, Gems feature scoped:**
- namtv's 03:26 transfer notice (PhucVT → OhCleo project, DuongDN as support dev) approved by namtv at 14:45 ("OK Minh") — resolved, no action needed.
- LongVV + minhtv spent the afternoon scoping the Gems payment feature (est. 20-24h) and fixing a startpage filter-date bug — directly maps to Celine's priority list from the OhCleo Slack DM (see OhCleo section below).

**Bailey — Historical Purchase Order Console estimated:**
- DuongDN delivered ~18h estimate to TrinhMTT (15:58) after chasing TuanNT's est for several days — estimate now ready to send to customer.

**Brad Ballantine (Upwork):** PhucVT replied to Brad 15:59; DuongDN reassigned Celine work to LongVV so PhucVT can focus on Brad (16:03).

**Delivery - Resource Arrangement:** All 08-10 leave cases processed by 17:35 (see leave plan line at top).

**Other (mostly before 14:22 cutoff, already in prior report):** Maddy WP feedback-hours discussion, Elena reminder/AA4 deploy coordination, PHP Projects CDN/PII caching discussion, NUS Technology birthday thread, Recruitment interview summaries (3 candidates, all female this round — a "coincidence" flagged internally, no action needed).

No unresolved action items for DuongDN at window end.

---

## OhCleo Slack — 07:xx (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 1 | Customer priority list (18:53 08-10): (1) submit app for review — new email flow, (2) finish "Update startpage" card, (3) review Gems/revenue-distribution card + estimate, (4) content-preferences filters card + estimate. |
| #events-code | — | `channel_not_found` (known-dormant channel, access issue not investigated further — low priority) |

Tony's (LongVV) formal Slack daily-report: not posted in this DM, but extensive same-day OhCleo work is directly visible in Matrix (Gems scoping, startpage bug fix, "fixed" confirmation 17:12) — team is actively executing exactly what Celine asked for, not silent.

Trello: Ohcleo ✓ complete.

---

## Performance — all — 07:xx (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.94 | 299ms | 2.32% (609/26254) — 95% benign NotAuthenticated/InvalidToken | 19.0/min |
| MPFC | 0.57 ⚠️ | 1113ms | 0.46% (209/45678) | 33.0/min |
| Fountain Gifts | 0.99 | 102ms | 0.00% (0/38720) | 28.0/min |
| InfinityRoses | 0.98 | 113ms | 0.00% (0/18166) | 13.1/min |

**OhCleo top errors:** NotAuthenticated 579x, InvalidToken 12x, AuthenticationFailed 8x, ValidationError 7x, IntegrityError (null user_id, app_playhistory) 1x — no new classes.
**OhCleo slow transactions:** `MediaByKeyView.get` 8858ms/328 calls (chronic, weeks-old, unresolved), `CreatorVerificationSubmitView.post` 3780ms/1, `HomeMediasView.get` 2150ms/583, `CreatorPayoutHistoryView.get` 1179ms/2, `CreatorVerificationApproveView.post` 1091ms/1.

**MPFC top errors:** E_WARNING "continue targeting switch" 126x (chronic), `WP_Error::get_method()` undefined-method Error 69x (chronic), E_WARNING count()/Countable 5x, mysqli DNS resolution failure 4x, E_COMPILE_ERROR legacy-widget.php 2x, get_header() undefined (twentytwenty theme) 2x, same (twentynineteen 404) 1x.
**MPFC slow transactions:** sitemap_index.xml 46201ms/1, author-sitemap.xml 43183ms/1, membermouse processOrder.php 15734ms/3, SQLi WAITFOR-DELAY probe on /search/ 13279ms/1 (active again, chronic), admin-ajax heartbeat 12778ms avg/67 calls.

**Fountain/Infinity:** clean, no slow transactions >5s, no new error classes.

No Trello gate for Performance (informational only).

---

## Arthur / Meta-Stamp — 07:xx (+07:00)

4-part check, partial this run:
1. **Matrix (2 rooms):** clean. Main room: namtv asking PhucVT about client feedback volume ("ổng gửi cả tờ A4 mà có 1 issue"), PhucVT: "chắc trong sáng nay em done" (08-10 09:01) + flagged an IP Assignment doc from the client needing review/filing. Technical setup room: no new activity.
2. **Slack (Solid Code, 3 channels + Art 1:1 DM):** ⚠️ unverified — token refresh failed (Google OAuth flow didn't capture a token even after a clean-profile retry). See Alerts #4.
3. **Workstream (Crystal lang est/actual):** blocked, same SSO outage.
4. **GitHub (`Christebob/Meta_Stamp_V3`):** 0 commits since 08:15 08-10 — quiet, consistent with PhucVT's "done this morning" note and no new work reported since.

Trello: Arthur - Meta-Stamp ○ held (Slack + Workstream sources unverified).

---

## Upwork Memo — 2026-08-10 — 07:xx (+07:00)

| Workroom | Status |
|----------|--------|
| Rory | Session unavailable — carrick's live Chrome Profile 1 returned 0 Upwork cookies (logged out), stored session + headless re-login also failed. Memo validity unverified. |
| Aysar | Same — session unavailable. |
| Neural | Same — session unavailable (also affects `upwork-neural-check.js`, 4/4 attempts failed with 0 cookies extracted). |

Per session-failure rule: not an alert, but genuinely needs a real (non-Puppeteer) login in carrick's actual Chrome Profile 1 before the next run — this is a deeper failure than the usual transient Cloudflare block (0 cookies = actually logged out, not just stale). Neural Trello item still completed per "session failure ≠ alert."

---

## Unresolved questions

1. Workstream SSO has now failed 6+ consecutive attempts this run (2 different approaches: fresh profile, longer wait) — worth checking interactively whether the Keycloak client/consent flow itself changed, rather than treating as another transient blip.
2. carrick's real Chrome Profile 1 Upwork session appears genuinely logged out (0 cookies) — needs a real interactive login, not another automated retry.
3. TrinhMTT hasn't posted in the Fountain Matrix room since 08-05 (5 days) — worth checking if this is planned leave or something else, since the weekly plan post is otherwise very consistent.
4. Solid Code Slack (Arthur) token extraction failed via Google OAuth — may need a manual one-time browser login on David's Chrome Profile 15 per the original extraction method.
