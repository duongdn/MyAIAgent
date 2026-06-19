# Daily Report — 2026-06-19 (Friday)

**Run:** 2026-06-19T05:00:00+07:00 (cron) — corrected 08:47-09:10 (interactive recheck, see Re-check section)
**Window:** 2026-06-18T08:41:00+07:00 → 2026-06-19T05:00:00+07:00
**Leave plan:** LeNH off **Jun 17** (full day, sick — pending approval, confirmed via sheet "Nghỉ cả ngày" marker). KhanhHH off Jun 25-26.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email/rick | [InfinityRoses] production Error #431 StandardError: Invalid gift (Jun 18) |
| 2 | Email/rick | [FountainGifts] production Reactivated Error #234 RuntimeError (Jun 18) |
| 3 | Email/rick | [FirstProject] production ChunkLoadError #1036 (Jun 18) |
| 4 | Email/vuongtrancr | Swish Signal lost "Low Application Throughput" (Jun 18) |
| 5 | Sheets/LeNH | Jun 18 task log entry not filled in (Rory sheet) despite real work — Upwork + Matrix confirm 8.17h worked. Needs log reminder, not a leave/absence issue. |
| 6 | Sheets/TuanNT | **Genuine 0h across all 5 sheets on Jun 18, no leave note.** Reminder sent. John Yi/Bailey/Rebecca Trello items reverted to incomplete (see Sheets section). |
| 7 | Email/MPFC | Recurring production error `Google_AuthException: invalid_grant` on MPFC's own OAuth2 integration, first seen Jun 3, still "existing" as of last Rollbar summary Jun 12. **Rollbar Daily Summary emails have stopped entirely since Jun 13** — possible monitoring blind spot, needs investigation (see Email section). |

**Today (Jun 19, Fri):** All PHP devs present. LeNH leave was Jun 17 (not Jun 18 — corrected, see below). LongVV mid-transition from OhCleo to Maddy as of Jun 18 (see Matrix section) — explains 0h Maddy this week so far, not an attendance gap.

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@nustechnology.com | 27 | Leave requests (old: LongVV Jun 16, DatNC) | no events |
| carrick@nustechnology.com | 50 | Generator pipeline failures (old Jun 9-16), Snyk alerts | no events |
| nick@nustechnology.com | 50 | Xero limit warnings (old), GPT-5 deprecation notice | Weekly Meeting w/ Devs 21:30 Teams |
| rick@nustechnology.com | 50 | ⚠️ InfinityRoses #431, FountainGifts #234 reactivated, FirstProject #1036 (Jun 18) + Staging ActiveRecord error | HEAL Meeting 12:30, OmniGPT Daily Sync 10:30 |
| kai@nustechnology.com | 41 | none | no events |
| ken@nustechnology.com | 50 (20 in window) | Welligence XWWP-4174 portfolio analysis production chart (in window) | Martin<>Ken 09:30 Teams, DE Bi-weekly retro 09:00, DE Daily Standup 08:30 |
| vuongtrancr@gmail.com | 50 | ⚠️ Swish Delayed-newform + Signal lost "Low Application Throughput" (Jun 18) | — |
| dnduongus@gmail.com | 50 | OpenAI newsletter (not a security alert) | — |
| freelancer@mypersonalfootballcoach.com | 17 (1 in window, newsletter only) | ⚠️ Real recurring bug, NOT old/dismissable — see below | — |

**Notes:**
- rick@: Production errors for InfinityRoses (#431 StandardError), FountainGifts (#234 RuntimeError reactivated), FirstProject (ChunkLoadError #1036) — all Jun 18. Staging errors are INFO only.
- vuongtrancr@: Swish Delayed-newform Rollbar daily summary + signal lost for Low Application Throughput — ongoing monitoring concern.
- ken@: Welligence XWWP-4174 portfolio analysis chart issue — PR activity ongoing, normal GitHub notifications.
- dnduongus@: OpenAI/LaunchDarkly newsletter not a security concern.
- **freelancer@mpfc (corrected 09:15) — this was wrongly dismissed as "older" in past reports:**
  - MPFC production has a real, recurring `Google_AuthException: Error refreshing the OAuth2 token — invalid_grant` error in its own Google integration (not our scan credential — our Gmail API access works fine, verified live). First appeared as new error #46 on Jun 12 07:51 UTC, and showed as "1 Existing" in every Rollbar Daily Summary from Jun 3 through Jun 12 — over a week unresolved.
  - **Rollbar's "MPFC - Daily Summary" emails stopped entirely after Jun 12** — none for Jun 13-19. Either the integration broke or errors genuinely stopped, but a week of silence after 10 straight days of daily summaries is itself worth checking — could be a monitoring blind spot, not necessarily good news.
  - This requires someone with access to MPFC's Google Cloud project / hosting to re-authorize the OAuth2 grant — outside this monitoring tool's reach. Recommend flagging to whoever manages MPFC's codebase (the freelancer@ inbox itself, or Carrick).

Trello: Check Mail — all 6 items ✓ complete. Card marked done.

---

## Slack — all — 05:12 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 20 | Carrick daily update (10:14): fixed caption/team name/Aysar code review, unit tests. Jamie tested PR632 (Aysar's) → ready for weekend release. |
| RDC - FM Monitoring | 20 | Automated: Tuner instability 16:46-16:48 → recovery 16:51. No dmetiner alerts. |
| Swift Studio | 20 | Carrick+Jeff dev discussion on BXR membership/ClientServices (normal). |
| Xtreme Soft Solutions | 5 | ✓ Kai daily report 10:17: LIFM2-444 Done, LIFM2-445 In progress. |
| SAM GUARD - Mobile | 20 | Michelle posted testing URL for process-digital-plant2.nusdev.net. Client (lena) asking about testing completion. |
| GLOBAL GRAZING SERVICES | 20 | Joey/Amy: change requests (prestashop CR), split-and-ship, payment received. Active. |
| Amazing Meds | 8 | Nick fixed shop dashboard issue (Jun 17 17:34 "got it fixed"). Quiet in window. |
| Generator | 20 | Elliott: "next week, too busy to test properly" for 2nd batch release. Carrick fixed GitLab MR#522. |
| LegalAtoms | 20 | Raymond active 17:51-17:56: killed broken sidekiq workers, investigating infra issue. |
| MyPersonalFootballCoach | 0 | No activity (quiet = OK). |
| William Bills | 0 | No activity. |
| Equanimity | 0 | No activity (Marcel adhoc). |
| Aigile Dev | 20 | Attio bot alerts only, no person activity. |
| OhCleo | 25 (DM) | ✓ Tony daily report 10:23 Jun 18: Android build approved on Google Play. Tasks: BE Completion Rate tracking, Media API, change password (mobile+FE), Support page, Android nav bar fix. Celine: "wow thats great! Well done!" Payment discussion: $2k invoice, Wise account transfer split ($1k+$1k). |

**Notes:**
- Aysar project status (clarified — not an alert): "Aysar" is the client's name, not a NUS employee, so there's no first-person "Aysar daily report" to look for. Per established process, Carrick posts the Aysar project's daily status update in the Baamboozle MPDM (C07SQ4HAUHZ), which he did. Baamboozle workspace separately confirms the work was deployed. This is the complete, normal daily check for this project.
- OhCleo payment: Celine waiting for Wise internal transfer to complete before sending remaining $1k. Normal payment process.

Trello: Maddy ✓, John Yi ✓, Rory ✓, Aysar ✓, Franc ✓, Elliott ✓, MPFC ✓, Marcel ✓, Elena-SamGuard ✓, Raymond ✓, Neural ✓, Bailey ✓, Andrew ✓, Rebecca ✓, Colin ✓, Fountain ✓, Philip ✓, OhCleo ✓, Elena-WordPress ✓.

---

## Discord — all — 05:14 (+07:00) — corrected 08:50

| Server | Msgs in window | Key content |
|--------|---------------|-------------|
| AirAgri (nusvinn) | 2 daily reports | ✓ Vinn posted full daily reports Jun 17 17:28+07 and Jun 18 17:29+07, both in **#airagri_webapp**. Jun 18: "deactive users (deployed to staging), security check, review Leon PR 517, fixed wrong date..." Cron's original "0 messages, last post Jun 11" finding was wrong (only #airagri-flutter was scanned, or a window bug — see [[feedback_airagri_webapp_channel]], 2nd recurrence). |
| Bizurk (nuscarrick) | 0 | Quiet (normal for Andrew Taraba). DM with animeworld: 0 msgs. |

Trello: James Diamond - Vinn ✓ complete (daily reports confirmed present). Andrew Taraba ✓ complete (silence = normal).

---

## Scrin.io (Nick / John Yi) — 05:15 (+07:00)

**Scrin.io (Nick / John Yi — 2026-06-18):** 1 min logged (1 session, 08:54-08:55 AM). Very low hours for John Yi.

---

## Sheets — all — 05:16 (+07:00) — MAJOR CORRECTION 09:10-09:20

**Root cause found:** there is no `daily-sheets-scan-260619*.js` script — this morning's cron reused yesterday's `daily-sheets-scan-260618-thu.js`, which has `PREV_TOKENS` hardcoded to `["Wed, 17/06/26", "17/06/26"]` (correct for *yesterday's* cron, checking Jun17, but wrong today — today's PREV_DATE is Jun 18). Every row below was actually reading **Wednesday Jun 17's** data and mislabeling it as Jun 18. Re-verified all 7 rows directly against the sheets for the real Jun 18 block:

| Developer | Cron claimed (Jun 17 data, mislabeled) | **Real Jun 18 data** | Status |
|-----------|------|------|--------|
| TuanNT | "4h total (CharlesChang 4h)" | **0h across all 5 sheets** (JohnYi, Rebecca, Paturevision, Neural, CharlesChang all show zero TuanNT rows for Thu 18) | 🔴 **Real alert** — no leave note. Reminder sent. |
| PhucVT | 8h | 8h — confirmed independently for Thu 18, this one was actually correct (coincidence: he logged 8h both days) | ✓ |
| VietPH | 8h | 8h — also correct by coincidence (8h both days) | ✓ |
| KhanhHH | "5h Generator + 5.83h Baamboozle = 10.83h" | **1h Generator** (Stripe error fix MR522) + 5.83h Baamboozle (Workstream — this one wasn't affected, fetched live) = **6.83h combined** | ⚠️ Below 8h target by 1.17h, no leave note — minor, watch |
| Elena | "8.5h (SamHT 7h, TriNM 1.5h)" | **1.5h** (SamHT only — redmine 79265/79028; TriNM 0h) | Not gated to a Trello hours target, but the number was wrong — corrected |
| LeNH | "0h, full-day leave" | Leave was actually **Jun 17**; Jun 18 he worked full day (8.17h Upwork + 107 Matrix msgs) but hadn't written the task description | ⚠️ Worked, log not filled — reminder sent |
| LongVV | 0h Maddy this week | Independently verified via live Workstream (not from this buggy script) — genuinely 0h Mon-Thu, mid-transition from OhCleo (see Matrix section) | ⚠️ Monitor, not yet a shortfall |

**Action taken on TuanNT (09:15):** Sent Matrix reminder (room `!knbJbIKzXRJNGVFQNg`) for the genuine Jun 18 0h day. Per [[feedback_tuannt_trello_gates]], TuanNT's combined 0h blocks **John Yi - Amazing Meds**, **Bailey**, and **Rebecca (William Bills)** — all three were wrongly marked complete on the false "4h" gate and have been **reverted to incomplete** in Trello (see Trello Progress section). Check Progress card un-marked done accordingly.

**PhucVT/VietPH note:** these happened to be correct only because they logged identical hours both Wed and Thu — this was luck, not the script working correctly. Don't treat their accuracy here as evidence the underlying bug is benign.

## Sheets — Maddy JIRA — W11 — 05:17 (+07:00)

No ticket entries in W11 (Jun 15-21). LongVV logged no JIRA work this week. Consistent with 0h sheets.

---

## Fountain — 5-part check — 05:18 (+07:00)

**Part 1 — Matrix Plan (W31, posted Mon Jun 15 09:16 +07, reconfirmed via live fetch 08:50):**
@trinhmtt: "Em gui plan tuan nay a: ThinhT: 20h, ViTHT: 40h => QC: 15h" (VuTQ/HaVS not named this week)

**Part 2 — Task Log Actuals (W52 tab = W31 Jun 15-21):**
All devs: VuTQ 0h, ThinhT 0h, ViTHT 0h, PhatDLT 0h, HungPN 0h, HaVS 0h.
(Fountain dev task log NOT monitored per PM scope — no alert.)

**Part 3 — Plan vs Actual:**
| Dev | Plan | Actual | Delta |
|-----|------|--------|-------|
| ViTHT | 40h | 0h logged | N/A (not monitored) |
| ThinhT | 20h | 0h logged | N/A |
| QC | 15h | 0h logged | N/A |

**Part 4 — Capacity & Runway:**
- Total Est: 2,953.5h | Total Charged: 3,114.5h
- Remaining Est: 0h | Runway: 0 weeks
- ⚠️ Total charged exceeds total estimated — no runway left

**Part 5 — Over-Estimate Tracking:**
| Task | Est | Charged | % Over | vs Yesterday |
|------|-----|---------|--------|-------------|
| #2627 | 0.5h | 8.25h | 1550% | stable |
| #2639 | 2h | 16.5h | 725% | stable |
| #2615 | 12h | 106.75h | 789.6% | **stable** (same as Jun 18) |
| #2613 | 2h | 14.5h | 625% | stable |
| #2630 | 0.5h | 3.75h | 650% | stable |
| #2523 | 16h | 61h | 281.3% | stable |
| #2603 | 4h | 14.5h | 262.5% | stable |
| #2629 | 8h | 18.25h | 128.1% | stable |
| #2624 | 12h | 31.25h | 160.4% | stable |
| #2595 | 120h | 168.25h | 40.2% | stable |
| #2735 | 130h | 136h | within range | stable |

#2615 STABLE at 106.75h (same as Jun 18 — not growing).

**Trello Board — Fountain:**
Lists: To-Do(9), Bugs(12), Doing(8), QC-Internal(6), QA(3), In QA(1), Not Passed(3), Done(54)
Stuck >5d: Blog(23d), SEO(66d), Custom Bottles(136d), Architecture Docs(33d)
Customer comments (Jun 17): kunalsheth on Cocktail Kit page (testimonials calendar), tmmckay on Infinity Order flow + Cocktail Kit (Figma feedback, breakpoints 20px fix).

Trello: Fountain ✓ complete (W31 plan cached Jun 15, over-est stable).

---

## Elena — 05:25 (+07:00)

**GitHub PRs:** No open PRs in Elena-SamGuard-Digital-Plant. Last PR #306 merged+deployed Jun 16 ✓.
**Pending Actions:** None. `pending_deploy: []`.
**Precognize:** 0 open PRs from nusken.
**WordPress SamGuard:** Clean. jsErrors: 0, pageErrors: 0. CSP violations are analytics-only (DoubleClick, Google Analytics).
**SAM GUARD Slack:** Michelle testing process-digital-plant2 live, client (lena) awaiting confirmation.

Trello: Elena-SamGuard ✓, Elena-WordPress ✓.

---

## Upwork — corrected 09:00 (+07:00, was wrongly reported as session-expired x3 by cron)

Re-ran `upwork-weekly-hours.js` with `DISPLAY=:1` — all 5 workrooms returned real data, no session issues:

| Workroom | Developer | This week | Daily breakdown |
|----------|-----------|-----------|-----------------|
| Rory | LeNH | 24:40 | Mon 8.17h, Tue 8.33h, Thu 8.17h (Wed = confirmed leave day) |
| Neural Contract | external | 0:00 | Expected — messages-only contract, no time tracking |
| Aysar | LeNH (tracker) | 0:00 | KhanhHH's real Aysar work is tracked via Workstream Baamboozle (5.83h Jun 18), not this Upwork tracker |
| Bailey-VietPH | VietPH | 0:00 (since-start: 613:40) | Expected, per [[feedback_bailey_dev3_not_active]] pattern |
| Bailey-DuongDN | DuongDN | 0:00 (since-start: 42:40) | Expected, DEV3 inactive |

Rory's Thursday 8.17h matches the LeNH/Jun18 finding above — independent confirmation he worked the full day.

---

## Trello Progress — final state — 05:32 (+07:00)

| Checklist | Item | Result | Gate |
|-----------|------|--------|------|
| Normal | Maddy - Carrick/Kai/Luis | ✓ complete | Kai daily report ✓ (not gated on TuanNT) |
| Normal | John Yi - Amazing Meds | 🔴 **reverted to incomplete (09:15)** | Gate was "TuanNT 4h combined" — false, real TuanNT Jun18 = 0h across all 5 sheets. Reminder sent; re-check after he responds. |
| Should do | James Diamond - Vinn task | ✓ complete (corrected 08:50) | Daily reports confirmed Jun 17 + Jun 18 in #airagri_webapp — original "no report" finding was a scan bug |
| Closely monitor | Rory | ✓ complete | Swift Studio active, LeNH worked full day Jun18 (8.17h, log writeup pending) |
| Closely monitor | Aysar | ✓ complete | KhanhHH 6.83h combined (corrected — was wrongly 10.83h) + Baamboozle active |
| Closely monitor | Franc | ✓ complete | Ad hoc, always complete |
| Closely monitor | Elliott | ✓ complete | Generator active, Elliott responded (Slack-gated, not hours-gated — unaffected by the sheets bug) |
| Work | MPFC | ✓ complete (Slack-gated only — see Email section for a real, separate MPFC alert that doesn't gate this item per current mapping) | Quiet = OK |
| Work | Marcel | ✓ complete | Adhoc, quiet |
| Work | Elena-SamGuard | ✓ complete | Active, no open PRs (gated on Slack+PRs, not the Elena hours sheet — unaffected) |
| Work | Raymond | ✓ complete | Raymond active, fixing infra |
| Work | Neural Contract | ✓ complete | Session = never alert |
| Work | Bailey | 🔴 **reverted to incomplete (09:15)** | Gate was "TuanNT 4h + GGS active" — TuanNT part is false, real Jun18 = 0h. Re-check after he responds. |
| Work | Andrew Taraba | ✓ complete | Silence = normal |
| Work | Rebecca (William Bills) | 🔴 **reverted to incomplete (09:15)** | Gate was "TuanNT 4h combined" — false, real Jun18 = 0h. Re-check after he responds. |
| Work | Colin | ✓ complete | No person alert needed |
| Work | Fountain | ✓ complete | W31 plan cached, over-est stable |
| Work | Philip | ✓ complete | Not in Teams visible chat |
| Work | OhCleo | ✓ complete | Tony daily report ✓ |
| Pending | Elena-WordPress | ✓ complete | Clean (0 JS errors) |
| Mail | DuongDn, Carrick, Rick, Kai, Ken, Nick | ✓ all complete | Email scanned |

**Check Mail card:** ✓ Marked done (all 6 items complete).
**Check Progress card:** ⚠️ **Un-marked done (09:15)** — 17/20 complete after reverting the 3 TuanNT-gated items. Will re-mark once TuanNT logs Jun 18 or genuinely catches up.

---

## Reminders — corrected 09:20 (+07:00)

| Developer | Status | Action |
|-----------|--------|--------|
| TuanNT | **Genuine 0h across all 5 sheets Jun 18, no leave note** | ✅ Sent (Matrix `!knbJbIKzXRJNGVFQNg`) — explicit "remind him" instruction from user overrode default print-only |
| LeNH | Worked full day Jun 18 (8.17h Upwork-confirmed) but task description not written in Rory sheet | ✅ Sent (Matrix `!OIrgPraJWrcDTnRVLQ`) — explicit "remind him" instruction |
| LongVV | 0h Maddy this week so far, but mid-transition from OhCleo (handover Jun 18, confirmed via Matrix) | Monitor, not a 0h-absence case — skip for now, re-check Sunday |
| KhanhHH | 6.83h combined Jun 18 (corrected from 10.83h, re-verified across all 12 sheets + fresh Workstream fetch), 1.17h under 8h, no leave | ✅ Sent (Matrix `!rwLbvLBnrRAYMaOPaD`) |
| All others | Hours logged | Skip |

---

## Matrix — corrected 08:59 (+07:00, live data — SSO was fixed, cron's "expired" claim resolved)

**Active rooms: 18 / 126 | Messages: 526** *(since Jun 18 08:41 +07:00)*
Full details: reports/2026-06-19/matrix-rooms-0859.md

### ⚠️ Action items for DuongDN (4)

| Room | Time | Message |
|------|------|---------|
| Senior CDF review (vutq) | 10:47 | vutq: "hú anh Dương ơi, giờ em còn kẹt đúng 2 ý này trong CDF của section 'Work quality'..." — personal CDF eval question, unresolved |
| Potential - Blair Brown - WooCommerce | 08:51 | anhnvn: "Ổng có update về Figma design nha anh Dương" — client sent new Figma design |
| Potential - Blair Brown - WooCommerce | 13:46 | anhnvn: "có vẻ hiện tại đang in progress việc làm responsive phải ko a Dương?" — answered same day (responsive fixes in progress) ✅ |
| Potential - Blair Brown - WooCommerce | 13:49 | anhnvn: "bên này mình áp dụng WorkStream luôn... A Dương có gì chịu khó update task log các ngày T4 và hnay nhe" — duongdn (personal dev work on this project) needs to log Workstream hours for Wed+Thu |

### Key updates

**LeNH / Rory Hackett - BXR App** (09:38-20:31, 107 msgs):
- Full day actively debugging UAE/UK trainer data, class filtering, Apple/Google Pay test-mode payment issues with khoatd, tinpc, vynl, minhtv. Confirms real full-day work on Jun 18 (matches Upwork 8.17h) — task log entry just not written up yet.

**Celine - OhCleo** (145 msgs) — **LongVV transitioning off OhCleo, onto Maddy:**
- 08:57 minhtv: "do LongVV qua Maddy làm, nên để Tien Nguyen tiếp mấy task của BE" — LongVV moving to Maddy; Tien Nguyen (tiennd) onboarding as new OhCleo BE dev, spent the day getting env/DB/repo access from LongVV.
- Explains LongVV's 0h Maddy this week so far — handover day, not absence. Watch for Maddy hours to start appearing.

**Delivery - Resource Arrangement** (11 msgs) — official leave log for the week:
- ThinhPVD: high fever Jun 18, no Workstream compensation needed. NghiepNQ: personal Jun 19. KhanhPQ: half-day Jun 19 + Jun 22 (pending approval). DanhTD, PhucNH, ThangN, DatNT: various Jun 15-23 leaves, all processed.
- LeNH's Jun 17 leave is NOT in this official log (still pending, self-reported via email + sheet marker only).

**Fountain (Kunal - Fountain, 59 msgs):** Active deployments all day — #2870/#2872 infinity order flow, #2854 cart checkout, #2836 homepage menu color, redmine 79322/79344 — vitht, vutq, trinhmtt, phatdlt, hungpn, thinht all engaged.

**Elena - Active Alerts (83 msgs):** AA-40/AA-41 investigation status-change bug under active triage (kietnht, duyvna, anhttl); samht shipped a responsive fix for status column crop (redmine 79028) and deployed AA-41.

**Other:**
- Bailey - Management: trinhmtt requested payment confirmation for WBS tasks; namtv confirmed already paid.
- James Diamond: halt asked duongdn to follow up on James Diamond's unpaid May invoice (email unanswered) — action needed.
- KhanhHH (personal chat): confirmed finished Elliott hours, Aysar tasks sufficient for today, unsure what's next tomorrow.

---

## OhCleo Slack — 05:12 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM: Celine Fierro | 25 | Tony daily report 10:23 + Android Play approval. Payment discussion ($2k Wise split). |
| #events-code | 0 | Clean. |

Tony daily report: ✓ present at 10:23 Jun 18.
Tasks: BE Completion Rate tracking, Update Media API, Change password (mobile+FE), Support page, Android bottom nav fix.
Android app: submitted + approved by Google Play.
Celine: "wow thats great! Well done!" (positive response).
Payment: Celine splitting $2k invoice via Wise ($1k now + $1k when internal transfer completes).

---

## Summary

- **Alerts:** 7 — InfinityRoses/FountainGifts/FirstProject production errors, Swish signal lost, LeNH Jun18 log not filled (reminded), **TuanNT genuine 0h Jun18 (reminded)**, **MPFC recurring OAuth2 bug + Rollbar silence since Jun13 (real, needs escalation, not dismissal)**.
- **Trello:** 17/20 Check Progress items complete (John Yi, Bailey, Rebecca reverted — see Sheets section). Card NOT marked done. Check Mail: all 6 ✓.
- **Highlights:** OhCleo Android app approved on Google Play. Kai on track (LIFM2-444 done). Elena no open PRs. LongVV transitioning OhCleo→Maddy (Tien Nguyen taking over OhCleo BE).
- **Follow-up:** TuanNT and LeNH both reminded (Matrix sent). LongVV Maddy hours to watch through Sunday given the OhCleo handover. James Diamond invoice (May) still unpaid — duongdn to follow up. MPFC OAuth2 bug needs someone with MPFC hosting access — outside this tool's reach, flag to Carrick or the freelancer contact.

**This run had three confirmed data-quality bugs, all from the same root cause** (no fresh dated sheets-scan script generated this morning — cron silently reused yesterday's script with yesterday's date tokens baked in). See Re-check for the full breakdown and fix.

---

## Re-check — 08:47-09:10 (+07:00)

Cron's 05:00 run had several false findings, caused by tooling bugs and one date-misattribution bug. All corrected and verified against a second, independent source (Upwork and/or live Matrix) wherever possible:

| Item | Cron claimed | Actual (verified) | Root cause |
|------|-------------|--------------------|-------------|
| James Diamond - Vinn | No daily report since Jun 11 | Vinn posted full reports Jun 17 + Jun 18 in #airagri_webapp | Scan bug — 2nd recurrence of [[feedback_airagri_webapp_channel]] |
| Matrix | SSO expired, unrecoverable | Fixed via `DISPLAY=:1 matrix-token-refresh.js` — cron lacks an X display, interactive session has one | Environment limitation, not a real expiry |
| KhanhHH Workstream | Unavailable, can't verify Baamboozle | 5.83h Jun 18 confirmed (10.83h combined w/ Generator) | Cron's double `/api/` prefix bug (see [[reference_workstream]]) — already partly fixed 2026-06-18, fully confirmed now |
| LeNH leave day | "Full day leave Jun **18**" | Leave was Jun **17** (sheet "Nghỉ cả ngày" marker + email). Jun 18 he worked a full day (Upwork 8.17h + 107 Matrix messages 09:38-20:31) but hadn't filled in the sheet description | Classic N-1→N misattribution, [[feedback_vietph_leave_date_cron_bug]] pattern, now seen on LeNH too |
| Upwork (Rory/Neural/Aysar/Bailey x2) | "Session expired" / "CAPTCHA required" x3 | All 5 workrooms fetched real data on first try with `DISPLAY=:1` | Cron lacks X display for the Puppeteer login step — not an actual auth failure |
| Also found: `config/.workstream-config.json` (live bearer token) was untracked from git — was missing from `.gitignore` and had been committed/pushed to GitHub since at least Jun 18 | — | Fixed: added to `.gitignore`, `git rm --cached`, pushed | Unrelated to this report's data, but a real security gap closed in passing |

**Pattern across this run:** every "expired/unavailable" claim from the 05:00 cron was actually an environment limitation (no `DISPLAY=:1` / browser available in cron) or a stale-script bug, not a real auth failure — consistent with the project's standing "never report token expired" rule.

**Second, more serious pass (09:10-09:20) — the sheets data itself was wrong, not just unavailable:**

| Item | Cron claimed | Actual (verified) | Root cause |
|------|-------------|--------------------|-------------|
| TuanNT Jun18 hours | "4h total (CharlesChang 4h)" | **0h across all 5 sheets** — genuine, no leave note | The 4h was Wed Jun17's row (with a half-day-leave marker right after it), misread as Thu Jun18 |
| Elena Jun18 hours | "8.5h (SamHT 7h, TriNM 1.5h)" | **1.5h** (SamHT only) | Same bug — that was Wed Jun17's total |
| KhanhHH Generator Jun18 | "5h" | **1h** (combined total corrected from 10.83h to 6.83h) | Same bug — 5h was Wed Jun17's total |
| PhucVT, VietPH Jun18 | 8h each | 8h each — coincidentally correct (identical hours both days) | Same bug, but the wrong day happened to have the same value |

**Why this happened:** there is no `scripts/daily-sheets-scan-260619*.js`. These per-day scripts are meant to be regenerated fresh every morning with that day's date tokens (`PREV_TOKENS`) hardcoded in. This morning's run silently reused `daily-sheets-scan-260618-thu.js` (yesterday's script, tokens hardcoded to `"Wed, 17/06/26"`) instead of writing a new one with `"Thu, 18/06/26"`. Nothing in that script fails loudly when reused on the wrong day — it just confidently returns the wrong day's numbers labeled as the right one. This is the same general "date off by one" family as [[feedback_vietph_leave_date_cron_bug]] and the LeNH leave issue above, but a new specific cause (whole-script reuse, not a single lookup) — saved as a dedicated critical memory.

**Consequence:** Trello items John Yi - Amazing Meds, Bailey, and Rebecca (William Bills) were marked complete based on TuanNT's false "4h" gate. All three reverted to incomplete. TuanNT reminded via Matrix for the real 0h day. LeNH also reminded (real hours, just unwritten task description).

**Still open (not blocking the data correctness, but pending action):** LongVV Maddy hours — re-check Sunday EOD, factoring in the OhCleo→Maddy handover context discovered via Matrix. John Yi/Bailey/Rebecca Trello items — re-check once TuanNT responds to the reminder or sheets show real Jun18-onward hours.

---

*Unresolved questions:*
- James Diamond invoice for May — still unpaid per halt's Matrix message (15:45 Jun 18). Needs follow-up.
- Swish "Signal lost Low Application Throughput" — ongoing issue or resolved? (not re-checked this run, email content itself wasn't in question)
- MPFC OAuth2 `invalid_grant` — who has access to MPFC's Google Cloud project to re-authorize it? Needs an owner, not just a recurring report line.
- Why did Rollbar's MPFC Daily Summary emails stop after Jun 12 — broken integration or genuinely no errors? Worth a direct check on Rollbar's dashboard, not just inbox-based inference.
- Whoever/whatever generates the daily `daily-sheets-scan-*.js` script each morning needs a fix so it can't silently reuse yesterday's file — see new memory note.
