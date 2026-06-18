# Daily Report — 2026-06-18 (Thursday)

**Run:** 2026-06-18T05:36:00+07:00 (cron)
**Window:** 2026-06-17T10:25:00+07:00 → 2026-06-18T05:36:00+07:00
**Leave plan:** No approved leaves for 2026-06-17 or 2026-06-18 (LongVV Jun 16 leave = past/pending; KhanhHH Jun 25-26 = future)

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets — KhanhHH | 6.5h combined (Generator 5h + Aysar/Workstream 1.5h), -1.5h vs 8h target, no leave note on file (some additional Colin/ETZ work that day is untracked in any known sheet) |
| 2 | Elena — WordPress | samguard.co CSP `connect-src` missing `ad.doubleclick.net` (confirmed via live re-check + DB inspection — fix documented below, not applied per user decision) |

**LeNH 0h Jun 17 — RESOLVED, not an alert:** Full-day sick leave (sốt, đau đầu) formally processed by namtv in Matrix room "Delivery - Resource Arrangement" 09:18 +07 (charged to Rory project, no makeup), confirmed complete by halt 17:44 +07. No reminder needed, no Trello impact (Rory's Trello gate is Swift Studio Slack, not LeNH hours).

**TuanNT 0h Jun 17 — RESOLVED, not an alert (corrected 09:05 +07):** Earlier in this recheck I reported "0h across all 5 sheets" — wrong. Direct re-query just now found **4h logged on the CharlesChang sheet + an explicit "Nghỉ nửa ngày" (half-day leave) marker** for Jun 17 — the data was entered into the sheet sometime between the 05:36 cron run and this recheck, so neither the cron nor my first pass caught it. 4h logged + half-day leave marker = fully compliant (per leave-day rule, half-day OK ≥4h). **John Yi, Bailey, Rebecca-William Bills Trello items now marked complete.**

**PhucVT 12h "combined" — WRONG, corrected:** The James Diamond sheet's Jun 17 block has two different people: PhucVT (8h, AirAgri/James Diamond work) and **AnhNH2** (4h, a *different* project — "Bullitt Chat" app, unrelated to James Diamond). They are not interchangeable and must never be reported as one person's combined total. See corrected Sheets table below.

**Today (Thu Jun 18):** No confirmed leaves. All present unless leave submitted after last parse.

**Recheck (08:35–09:10 +07) — fixed since cron run:** Matrix token refreshed (Fountain plan now fetched, Trello item completed); Workstream script had a double `/api/api/` path bug (404) causing false "login failed" — fixed, confirmed LongVV genuinely 0h on Maddy this week (active on OhCleo instead, no Trello impact); Upwork session worked cleanly on retry (no CAPTCHA this time); found KhanhHH's missing Aysar/Workstream hours (1.5h, not checked in first pass); corrected PhucVT/AnhNH2 conflation; corrected TuanNT 0h → 4h+half-day-leave (data arrived late); corrected Scrin.io attribution (see below). See Recheck section at bottom for full detail.

---

## Email — all — 05:00 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@nustechnology.com | 26 | LongVV leave Jun 16 (past), ChienTX leave (past) | no events |
| carrick@nustechnology.com | 50 | Generator pipeline failures (pre-window, tracked) | no events |
| nick@nustechnology.com | 50 | "Warning of reaching xero limit" (pre-window) | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 50 | Fountain staging NameError (pre-window, tracked) | 10:30 OmniGPT Daily Sync (Google Meet), 12:30 HEAL Meeting (Google Meet) |
| kai@nustechnology.com | 39 | No alerts | no events |
| ken@nustechnology.com | 50 | Welligence/Precognize GitHub notifications (newsletters) | 09:30 Martin <> Ken (Teams) |
| vuongtrancr@gmail.com | 50 | APM "Signal lost" (pre-window, Swish) | — |
| dnduongus@gmail.com | 50 | OpenAI newsletter (ignore) | — |
| freelancer@mypersonalfootballcoach.com | 16 | New Relic performance report (Jun 15, newsletter) | — |

No new critical alerts in monitoring window (Jun 17 10:25+07 → Jun 18 05:00+07). Pre-window items already tracked in prior reports.

Trello: All 6 "Check mail" items ✓ complete. Card marked done.

---

## Slack — all — 05:05 (+07:00)

| Workspace | Msgs in window | Key content |
|-----------|---------------|-------------|
| Baamboozle | 0 | No activity (Aysar MPDM checked separately) |
| RDC - FM Monitoring | 0 | Clean |
| Swift Studio | 0 | Clean |
| Xtreme Soft Solutions | 0 | Clean (Kai 16h/wk, no daily report required) |
| SAM GUARD - Mobile | 0 | Clean |
| Global Grazing Services | 0 | Clean (Nick GGS absence not an alert) |
| Amazing Meds | 0 | Clean |
| Generator | 3 | Elliott active: #release coordination with Violet re release branch / URL fields / results review |
| LegalAtoms | 0 | Clean (no Nick-specific alerts) |
| MyPersonalFootballCoach | 0 | Clean |
| William Bills | 0 | Clean |
| Equanimity | 0 | Clean (Marcel adhoc) |
| Aigile Dev | 0 | Clean |

**Aysar MPDM (C07SQ4HAUHZ):** Daily report found at 17:45+07:
> "Today's update: Check and reply feedback game config type; Create new command create bulk users"

Trello: Items completed per results (see Trello section).

---

## Discord — AirAgri + Bizurk — 05:08 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 10+ | Vinn daily report ✓ (17:28+07), Jeff Trinh daily report ✓ (17:21+07) |
| Bizurk (nuscarrick) | 0 | No DM from AnimeWorld (Andrew Taraba) — silence is normal |

**Vinn (nusvinn) daily report (17:28+07):**
- Check and discuss contractor login/sign up process
- Review [cont'd — truncated by channel]
- Active: discussing Brett's issues with bellatric02, deploying Entra changes

**Jeff Trinh (#airagri-flutter, 17:21+07):**
- Handle deleting messages in a conversation (4 hours)

No alerts. Trello: James Diamond - Vinn ✓, Andrew Taraba ✓.

---

## Scrin.io (Nick / "john yi" workspace) — 05:10 (+07:00, corrected 09:05 +07)

**Corrected:** raw API response shows both sessions tagged `Project: "No project"`, `Client: "No client"`, `Note: "No note"` — this is generic screen-activity tracking, NOT confirmed as John Yi/Amazing Meds work specifically. "john yi" is just the name of the Scrin company/workspace Nick tracks under; it does not mean every session within it is John-Yi-task work.

**Nick, "john yi" Scrin workspace — Jun 17 (untagged activity):**
- Session 1: 08:33–09:30 (57 min, 91% activity)
- Session 2: 09:46–12:45 (179 min, 93% activity)
- **Total: 3h 56m (236 min) tracked, but not attributable to a specific project/task**
- Apps used: cursor, gnome-terminal-server, chrome, RustDesk, Slack, element-desktop, windsurf — consistent with general dev work, not proof of John Yi-specific work

*Note: Scrin.io tracks Nick@nustechnology.com activity, NOT TuanNT.*

---

## Sheets — all devs — 05:15 (+07:00) *(PREV_DATE: 2026-06-17, W28/W11 depending on sheet)*

| Developer | Jun 17 Hours | Status |
|-----------|-------------|--------|
| PhucVT | **8h** (James Diamond/AirAgri work) | ✓ |
| VietPH | **8h** (Paturevision/Grazing Software) | ✓ |
| KhanhHH | **6.5h** (Generator 5h + Aysar/Workstream 1.5h — corrected, see below) | ⚠️ -1.5h vs 8h target, no leave note (Colin/ETZ task also assigned that day, untracked in any known sheet) |
| Elena (SamHT+TriNM) | **8.5h** (SamHT 7h + TriNM 1.5h) | ✓ |
| **TuanNT** | **4h** (CharlesChang) + Nghỉ nửa ngày (half-day leave marker) | ✓ Fully compliant — corrected 09:05, data entered into sheet after the cron run |
| **LeNH** | **0h** (Rory sheet 0h \| Franc sheet 0h \| Rebecca Q-T 0h) | ✓ Full-day sick leave, formally processed by namtv (Matrix "Delivery - Resource Arrangement" 09:18 +07, charged to Rory, no makeup) |
| **LongVV** | **0h** on Maddy (sheets + Workstream both confirm) | ✓ No Trello impact — Maddy gate is Kai/Xtreme Slack, not LongVV hours. LongVV active on OhCleo/Celine instead (separate project) per Matrix + OhCleo Slack |

**Not PhucVT's hours — separate person on a separate project:** AnhNH2 logged 4h on Jun 17 in the same James Diamond spreadsheet, but on a completely different app ("Bullitt Chat" — DB schema, conversation list UI, contact-to-message flow), unrelated to PhucVT's AirAgri/James Diamond work. Previously merged into "PhucVT: 12h" — wrong, corrected.

**KhanhHH Workstream check (missed in first pass):** Baamboozle/Aysar Workstream project (`cmqez93ka07q8p81v7035l3td`) shows KhanhHH logged 3 tasks Jun 17 totaling 1h30m ("Check and reply questions from customer" 0:30, "Create new command create bulk users" 0:50, "Check and reply feedback game config type for customer" 0:10) — Google Sheets Aysar tab correctly shows 0h for KhanhHH because that project's hours live in Workstream, not Sheets (per existing memory, just not applied here on the first pass).

**Maddy JIRA check (W11):** No ticket entries this week — clean.

**Upwork (re-verified 08:40 +07, all 5 workrooms, no auth issues this run):**
| Workroom | Developer | This week | Note |
|----------|-----------|-----------|------|
| Rory (41069448) | LeNH | 16.5h (Mon 8.17 + Tue 8.33) | 0h Wed Jun 17 matches sheets — consistent with sick day |
| Neural Contract (38901192) | external | 0h | Last client message ~7wk ago — normal silence |
| Aysar (35642393) | LeNH/KhanhHH | 0h this wk (20h last wk) | — |
| Bailey-VietPH (42545630) | VietPH | 0h this wk (613.67h since start) | — |
| Bailey-DuongDN (43093775) | DuongDN | 0h (inactive contract) | Expected |

Reminders: none needed. TuanNT fully compliant (4h + half-day leave). LeNH fully excused (full-day sick leave, processed). KhanhHH -1.5h gap noted above but not severe enough to warrant a reminder given the same-day untracked Colin/ETZ work — flagging for awareness only.

---

## Fountain — Full Check — 05:20 (+07:00)

**Part 1 — Matrix Plan (fetched 08:35 +07 after token refresh):**
@trinhmtt posted W31 plan Mon Jun 15 09:16 +07:
> "Em gui plan tuan nay a: ThinhT: 20h, ViTHT: 40h => QC: 15h"
(VuTQ/HaVS not named this week.)

**Part 2+3 — Task Log Actuals (W31, corrected — cron had mislabeled this W52) vs Plan:**
W31 (Jun 15-21) task log tab shows 0h total logged so far for all Fountain devs. Note: Fountain dev task log hours are outside PM scope per monitoring rules — not flagged as an alert.

**Part 4 — Capacity & Runway:**
| Metric | Value |
|--------|-------|
| Total est | 2,953.5h |
| Total charged | 3,114.5h |
| Remaining | 0h (charged exceeds estimate) |

⚠️ Charged hours now exceed total estimate. Active work remains visible in Trello (To-Do: 9, Doing: 8, Bugs: 10). Need to review est-vs-charged with Rick.

**Part 5 — Over-Estimate Tracking (no change from Jun 17):**

| Task | Est | Charged | Over | Status |
|------|-----|---------|------|--------|
| #2595 (giftdrop redemption) | 120h | 168.25h | 40% | Stable (no change) |
| #2615 | 12h | 106.75h | 789% | Stable (no change) |
| #2735 (pro send smart link) | 130h | 136h | 5% | Within range |

Key others over 100%: 2639 (725%), 2545 (650%), 2523 (281%).

**Trello Board:**
- Active: To-Do 9, Bugs 10, Doing 8, QC Internal Backlog 7, QA Backlog 1, In QA 1, Not passed 4
- Stuck cards in To-Do: 5+ items inactive 22-135 days
- Customer comments (Jun 17):
  - **tmmckay**: 8 cards with Figma design review comments for rick570 (order flow, merch page, cocktail kit, update breakpoints, infinity build-a-box, etc.)
  - **kunalsheth** (12:49): "universal testimonial calendar" planning comment
  - Previous: mike62798179 Jun 16 bug report (scheduled order — Rick pushed fix, being monitored)

Fountain Trello item: **✓ COMPLETE** (Matrix plan found, over-est stable — recheck 08:35 +07)

---

## Elena — 05:25 (+07:00)

**GitHub PRs (Elena-SamGuard-Digital-Plant):** 0 open PRs ✓
**Pending deployments:** PR#300 = intermediate feature branch, no deploy needed ✓
**Precognize (nusken):** 0 PRs by nusken (11 total open, none from nusken) ✓
**SAM GUARD Slack:** 0 messages in window ✓

**samguard.co WordPress (re-verified 08:42 +07):**
⚠️ CSP violation confirmed still active: `connect-src` blocks `ad.doubleclick.net` (Google Ads remarketing collect call). No real JS errors (jsErrors: [], pageErrors: []).

**Root cause + fix (investigated via SSH, read-only):**
- Plugin: "Headers Security Advanced & HSTS WP" (`headers-security-advanced-hsts-wp`)
- Policy stored in `wp_samguard.wp_options`, option name `hsts_csp`
- Current `connect-src` allows `googleads.g.doubleclick.net` but not the bare `ad.doubleclick.net` subdomain used by the remarketing collect call
- **Fix:** add `https://ad.doubleclick.net` to the `connect-src` directive in that option (SQL UPDATE on live DB)
- User decision (2026-06-18): do not apply automatically — left for manual review/approval, not touched.

Trello: Elena - SamGuard Digital Plant ✓ (no Slack/PR alerts). Elena - WordPress ○ (CSP fix documented above, pending manual approval).

---

## Sheets — Maddy JIRA — W11 — 05:15 (+07:00)

| Week | Tickets | Status |
|------|---------|--------|
| W11 (Jun 15-21) | No ticket entries | ✓ Clean |

---

## OhCleo Slack — 05:28 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM: Celine Fierro | 16 | Tony daily report ✓ + build submissions + cert discussion |
| #events-code | 0 | Clean |

**Tony (LongVV) daily report (11:36+07):**
- [BE] Fix bug double decrease free listenings
- [BE] Old dynamic templates conflicting with new — Sendgrid
- [Mobile] fix: Unable to follow a creator, UI not updated
- [Mobile] fix: Track list not displayed on Creator Profile
- [Mobile] fix: UI issues on Creator sub-screens
- [Mobile] fix: Error screen when tapping track creator username

**Tony (11:39+07):** "I've submitted the latest builds to both Apple App Store and Google Play for review." ✓

**Celine (11:06-11:08):** Discussing certificate fingerprints (app signing setup) — normal development activity.

LongVV = OhCleo active today (different account from Maddy LongVV).

Trello: OhCleo ✓ complete.

---

## Trello Progress — 05:30 (+07:00, updated 08:35 recheck)

### Completed (19/20):
| Item | Checklist | Result |
|------|-----------|--------|
| Maddy - Carrick/Kai/Luis | Normal | ✓ Xtreme Slack clean, Kai 16h no report required |
| John Yi - Amazing Meds | Normal | ✓ TuanNT 4h + half-day leave marker, fully compliant (corrected 09:05) |
| James Diamond - Vinn | Should do | ✓ Vinn daily report found (17:28+07) |
| Rory | Closely monitor | ✓ Swift Studio clean |
| Aysar | Closely monitor | ✓ Daily report in MPDM (17:45+07) + KhanhHH 6.5h combined (Generator+Workstream) |
| Franc | Closely monitor | ✓ RDC clean (Franc adhoc) |
| Elliott | Closely monitor | ✓ Active in #release with Violet |
| MPFC | Work | ✓ Quiet = OK |
| Marcel | Work | ✓ Quiet (Marcel adhoc) |
| Elena - SamGuard Digital Plant | Work | ✓ No PRs, no Slack alerts |
| Raymond - LegalAtoms | Work | ✓ No Nick alerts |
| Neural Contract | Work | ✓ Silence = never alert |
| Bailey | Work | ✓ TuanNT 4h + half-day leave marker, fully compliant (corrected 09:05) |
| Andrew Taraba | Work | ✓ DM quiet, silence normal |
| Rebecca - William Bills | Work | ✓ TuanNT 4h + half-day leave marker, fully compliant (corrected 09:05) |
| Colin | Work | ✓ Quiet = OK |
| Fountain | Work | ✓ Matrix plan found (W31), over-est stable — recheck 08:35 |
| Philip | Work | ✓ Not in Teams visible chat — no complaint |
| OhCleo | Work | ✓ Tony daily report + builds submitted |

### Incomplete (1/20):
| Item | Checklist | Reason |
|------|-----------|--------|
| Elena - WordPress SamGuard | Pending | ⚠️ CSP fix identified, pending manual approval (not auto-applied) |

---

## Reminders — 05:31 (+07:00, updated 09:10)

| Developer | Status | Action |
|-----------|--------|--------|
| TuanNT | 4h + half-day leave marker, fully compliant | No reminder needed (corrected — was wrongly 0h before data arrived) |
| LeNH | Full-day excused sick leave (processed by namtv) | No reminder needed |
| KhanhHH | 6.5h combined (Generator+Workstream), -1.5h vs target, no leave note | Minor gap noted, no reminder sent — same-day untracked Colin/ETZ work likely accounts for some of it |
| LongVV | 0h on Maddy specifically (confirmed via sheets + Workstream) | No reminder — active on OhCleo/Celine instead, no Trello gate on LongVV hours |

---

## Matrix — 08:35 (+07:00, recheck)

**Active rooms: 25 / 126 | Messages: 691** *(since 2026-06-17 08:00)*
Full details: reports/2026-06-18/matrix-rooms-0835.md

### Key updates

**Maddy/LongVV staffing:** LongVV stuck at hospital (weak wifi, no remote work) — VietPH set up as Shopify-payouts backup. LongVV has used all paid leave this week. KietNHT off Jun 19, backfilled from Elena allocation.

**Delivery - Resource Arrangement (leave processing room):** namtv formally processed 3 leaves Jun 17 (full-day = no time marker, half-day = "Chiều"/PM marker): LeNH full-day sick (charged to Rory, no makeup), TuanNT PM only (charged to Bailey, no makeup, child's doctor visit), KietNHT full-day Jun 19 (charged to Elena). halt confirmed all processed 17:44 +07. **This room is an authoritative leave source equal to leave-plan.json/email — must cross-check before flagging any dev's 0h.**

**TuanNT:** duongdn flagged Jun 16 short by 0.33h, fixed. Took Jun 17 PM off (sick child) — approved, told to route future requests to new PHP-project DM.

**OhCleo/Celine (LongVV=Tony):** Active all day — fixed staging 500, found+reported a 100s+ NewRelic slow query, app build submitted to both stores.

**Fountain:** ViTHT found root cause of a staging regression (missing commit from #2735 branch). PR/deploy coordination ongoing, no blockers.

**Elena/Precognize Active Alerts:** Heavy design discussion on error-key translation; 9 cards deployed; server restarted twice for 502 (worth watching for recurrence).

**Other:** Bailey/BA-QC payment-release scope closed with client. Rory/BXR backend stable, full redesign kicked off. Colin/ETZ header-button bug fixed (KhanhHH). Blair Brown (new prospect) scoping continues.

No unresolved action items requiring DuongDN's response this window.

---

## Upwork — 08:40 (+07:00, recheck — all 5 workrooms fetched cleanly, no auth issues)

| Workroom | Developer | This week | Note |
|----------|-----------|-----------|------|
| Rory (41069448) | LeNH | 16.5h (Mon 8.17 + Tue 8.33, 0h Wed) | Matches sheets — Wed 0h is the sick day |
| Neural Contract (38901192) | external | 0h | Last client message ~7wk ago, normal silence ✓ |
| Aysar (35642393) | LeNH/KhanhHH | 0h this wk (20h last wk) | Covered by Slack MPDM report ✓ |
| Bailey-VietPH (42545630) | VietPH | 0h this wk | — |
| Bailey-DuongDN (43093775) | DuongDN | 0h | Inactive contract, expected |

---

## Recheck — 08:45–09:15 (+07:00)

| Item | Result | Details |
|------|--------|---------|
| Fountain | ✓ completed | Matrix token refreshed; W31 plan found (trinhmtt, Mon 09:16); over-est stable |
| John Yi - Amazing Meds | ✓ completed (corrected 09:05) | TuanNT actually has 4h + half-day leave marker on CharlesChang — initial "0h all 5 sheets" was wrong, data was entered into the sheet after the cron run, caught on direct re-verification |
| Bailey | ✓ completed (corrected 09:05) | Same TuanNT correction |
| Rebecca - William Bills | ✓ completed (corrected 09:05) | Same TuanNT correction |
| Elena - WordPress SamGuard | ○ still incomplete | CSP root cause + exact fix identified (wp_options.hsts_csp, missing ad.doubleclick.net); user opted not to auto-apply |
| LeNH 0h (all 3 sheets) | ✓ resolved, not an alert | Full-day sick leave formally processed by namtv (charged to Rory, no makeup), confirmed by halt — initially mischaracterized as "not yet in leave-plan.json" until caught |
| PhucVT "12h combined" | ✓ corrected | AnhNH2's 4h (different person, different project — "Bullitt Chat") was wrongly merged into PhucVT's row. PhucVT's actual hours = 8h. |
| KhanhHH "5h, no alert" | ✓ corrected | Missed checking Workstream — KhanhHH has 1h30m of Aysar/Baamboozle hours there. Combined total 6.5h, not 5h. Still -1.5h vs 8h target, flagged as a minor gap (no reminder sent, same-day Colin/ETZ work likely absorbs some of it). |
| Scrin.io "Nick on John Yi" | ✓ corrected | Raw API shows sessions tagged "No project/No client" — generic tracked activity, not confirmed John-Yi-specific work. Relabeled accordingly. |
| Matrix scan | ✓ filled in | Was blocked all cron run; refreshed token, fetched 691 msgs/25 rooms, summarized |
| Workstream (LongVV) | ✓ fixed | Found+fixed a real bug: scripts used double `/api/api/` path (404), always forced false "login failed". Fixed in workstream-login.js + workstream-fetch-project-week.js. Confirmed LongVV genuinely 0h on Maddy this week. |
| Upwork | ✓ filled in | Re-ran cleanly, no CAPTCHA this time — all 5 workrooms returned real data |

**Cleared:** Fountain, Matrix, Workstream, Upwork, LeNH, TuanNT/John Yi/Bailey/Rebecca (all corrected to compliant)
**Still open:** Elena-WordPress (fix documented, awaiting manual approval)
**Data-accuracy corrections this run (not just auth/script fixes):** TuanNT 0h→4h+leave (stale data, now resolved), PhucVT 12h→8h (wrongly merged with AnhNH2), KhanhHH 5h→6.5h (missed Workstream), LeNH "alert"→excused leave (missed Matrix Resource Arrangement room), Scrin "John Yi work"→generic untagged activity (overclaimed attribution).

**Code fix applied this run:** `scripts/workstream-login.js` and `scripts/workstream-fetch-project-week.js` — corrected double `/api/api/` prefix bug that caused every Workstream call to falsely report token-expired/login-failed.
