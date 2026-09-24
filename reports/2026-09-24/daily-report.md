# Daily Report — 2026-09-24 (Thursday)

**Run:** 2026-09-24T05:00:00+07:00 (cron), corrected 08:35 + 08:45 (+07:00) recheck
**Window:** 2026-09-23T08:45:00+07:00 → 2026-09-24T05:00:00+07:00 | Task-log date: Wed 2026-09-23
**Leave plan:** ~~KhanhHH has a leave request pending approval — not yet confirmed applied.~~ Refreshed 08:15: KhanhHH ⏳ PENDING leave is for **Tue 2026-09-30** (full day, "về quê giải quyết giấy tờ đất đai"), not today/yesterday. No leave on file for any PHP-team dev on 09-23. Resource Arrangement 09-23: only non-PHP-team notes (TriNM, PhongTB AM, DanhTD 09-25, MinhTC/SangNV 10-01→02).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets/Workstream | ~~Workstream SSO outage — hours unverified.~~ Resolved 08:18 (1st retry). **Real finding: TuanNT 0h + LeNH 0h on Wed 09-23, no leave** (2 passes). TuanNT visibly working (Bailey room) → logging gap; LeNH no activity signal. Reminders sent 08:32 (TuanNT `$RM3cbC6w…`, LeNH `$_kIjaBeT…`). |
| 2 | LegalAtoms (Slack) | ~~Direct urgent ask unanswered.~~ Not ours — tagged Armaghan Iqbal (client dev). Raymond ✓. |
| 3 | MPFC (New Relic) | Apdex 0.46 (poor, chronic). `WP_Error::get_method()` fatal (192x). SQLi WAITFOR/PG_SLEEP probes on `/search/` feed — unresolved. |
| 4 | Fountain | ~~Parts 2/3 unverifiable, plan not found.~~ Full 5-part done. **Unanswered customer asks on Fountain Trello**: Kunal 20:36 "Were you able to push this live?" ([CSV card](https://trello.com/c/BcAjuYb6)); tmmckay 16:48 3-line ellipsis ([blurbs](https://trello.com/c/uopF36jA)). DatNT 0 WS rows vs 32h plan; ViTHT 2.5h vs 40h (Mon–Wed). Fountain ○. |
| 5 | Maddy | Unanswered client asks: Anoma 20:16 "reduce gaps / price boxes wider"; Anoma LIFM2-465 feedback list 23:51; Madhuraka numbering request 17:08. Kai promised LIFM2-428 deploy steps **today**. LIFM2-467/468 no est + no JIRA log. Maddy ○. |
| 6 | Workstream review | Pending: OhCleo ×5 (LongVV 8h 09-21, LuHX 1.5h, PhuongPVT) → reviewers DuongDN/MinhTV; Crystal lang PhucVT 0.5h 09-21 → TienND. |
| 7 | Upwork memo | Aysar (KhanhHH) 1 invalid memo 09-23: "Handle feature: Allow team seat count to be decreased in admin #717" (borderline). Suggested fix sent to KhanhHH 09:00 (Matrix `!rwLbvLBnrRAYMaOPaD`, event `$9Cl8Qycq…`): "Implemented the admin setting that allows decreasing a team seat count (#717) and tested it on the admin team page" (validated ✓ by memo-rules). |
| 8 | Upwork account | ~~duongdn Upwork account (Profile 9) logged out — needs sign-in.~~ ✅ DuongDN signed in 08:43; Tokenlite memo check OK (0 memos 09-23). |
| 9 | Matrix action items | ~~vutq: DigitalOcean account for Kunal 2FA; tiennd: Arthur pricing reply — both need DuongDN.~~ Both already answered by DuongDN same minute (09:33 DO account; 09:29/09:37 Arthur) — false action items. |

**Today (Thu, Sep 24):** ~~No confirmed leave besides KhanhHH's pending request~~ No leave today (KhanhHH's pending leave = 09-30). All present.

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 1 | KhanhHH leave request (pending, for 09-30) | no events |
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
| LegalAtoms | 2 | ~~⚠️ See Alert #2 above.~~ hamidsalamatali97 23:13 "Please fix this asap" → tagged Armaghan Iqbal (client dev), not us — not our item. miratariq 07:25 #general: Winnebago County interest, Okanogan use-cases quality focus — informational. |
| MyPersonalFootballCoach | 0 | — |
| William Bills | 0 | — |
| Equanimity | 9 | Marcel/Carrick + komal.bailur QA discussion (attendance tenant review); Carrick asked for more Upwork hours — normal ops. |
| SoCal Auto Wraps | 0 | Not monitored (dropped). |
| Aigile Dev | 1 | Blog posts merged to staging — informational. |

Trello: Maddy, Rory, Aysar, Franc, Elliott, MPFC, Marcel, Colin (ignore list), Andrew — see per-item notes below. John Yi ✓ (0 msgs). LegalAtoms ~~⚠️ skipped (alert #2)~~ ✓ completed at recheck (ask not directed at us).

---

## Discord — all — 05:20 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 3 | Vinn's daily report present (feature work). Jeff Trinh's daily report present (4h, marker click handling). |
| Bizurk (nuscarrick) | 0 (+4 DM) | Andrew (animeworld) DM: closing out old Upwork contract, will open new one for next task — informational, no action needed. |

Trello: James Diamond - Vinn ✓ complete. Andrew Taraba ✓ complete.

---

## Sheets/Workstream — all — 05:25 (+07:00)

~~🔴 **Workstream SSO unavailable this entire run** (see Alert #1).~~ **Resolved at recheck 08:18 — real data in table below; the cron text in this paragraph is superseded.** Tried: proactive token refresh, API refresh (2x), headless browser login (2 attempts), visible browser login (`DISPLAY=:1`, 2 attempts) — all failed at the same step ("SSO redirect detected — Keycloak cookies alive" but API token never captured). Google Sheets task-log system was fully retired 2026-08-21 (all projects migrated to Workstream) — there is no fallback data source this run.

Cross-checked via other channels where possible:
- **TuanNT** — heavy live activity in "NUS - Bailey - Paturevision 2026" Matrix room all day (GGS/Grazing bug fixes, RDS upgrade tasks) — clearly working, ~~but exact hours unverified~~ → WS 0h 09-23 (logging gap), reminder sent.
- ~~**KhanhHH** — pending leave request submitted today; hours unverified.~~ → 8h on 09-23 ✓; leave is for 09-30.
- ~~**LeNH, PhucVT, LongVV** — no direct activity signal found this window; hours unverified.~~ → see table below (LongVV very active in Celine-OhCleo Matrix 09-23; LeNH no Matrix/Slack activity found 09-23).

**Maddy JIRA weekly cross-check:** ~~not run this pass — time-boxed. Needs recheck.~~ Run at recheck — see `## Maddy` section below.

### Recheck 08:20 — Workstream back (first login retry succeeded), real Wed 09-23 data

~~Workstream SSO unavailable this entire run~~ → `workstream-login.js` succeeded on 1st recheck attempt (08:18). All 21 projects fetched for week 09-21→09-27.

| Dev | Mon 09-21 | Tue 09-22 | **Wed 09-23** | Status |
|-----|-----------|-----------|---------------|--------|
| TuanNT | speedventory 8.5h | speedventory 8h | **0h (2 passes 08:20 + 08:31)** | ⚠️ 0h logged, no leave — but visibly working all day in Bailey Matrix room (task summary 08:44, Console/Grazing fixes to 16:02) → logging gap. Reminder sent 08:32 |
| KhanhHH | radio_data_center 8h | baamboozle 6h | **baamboozle 7.33h + bxr_app 0.67h = 8h** | ✓ OK |
| LeNH | james_diamond 8h | james_diamond 8h (backfilled after 09-23 08:55 reminder) | **0h (2 passes)** | ⚠️ 0h, no leave, no Matrix/Slack activity found 09-23 (2nd consecutive late log — 09-22 needed reminder too). Reminder sent 08:32 |
| LongVV | ohcleo 8h | maddy 4h (+3h James/1h Sandor per his Matrix reply — projects not visible to our WS token) | **0h visible** | info — active on OhCleo in Matrix all day 09-23; may be on Sandor (not visible to our WS token). No reminder (Maddy ad-hoc) |
| PhucVT | speedventory 6h + crystal_lang 0.5h | — | — | ignored (adhoc/external, per rule) |

**Per-project review status (dev hrs / reviewer charged / need_review):**
| Project | Dev hours (wk) | Reviewer(s) + own charged | Review status |
|---------|----------------|---------------------------|---------------|
| speedventory (Bailey) | TuanNT 16.5, VyNL 12.5, VuTQ 10, PhucVT 6, DatNC 4, TrinhMTT 0.75 | none | need_review = false |
| baamboozle (Aysar) | KhanhHH 13.33 | none | need_review = false |
| james_diamond | LeNH 16, ThangN 6 | PhucVT (0h) / LeNH (16h) | all NotRequired/Reviewed — no Pending |
| maddy | LuHX 17, ThanhNX 3, LongVV 4 | none | need_review = false |
| radio_data_center | KhanhHH 8 | LeNH (0h) | no Pending |
| bxr_app (Rory) | KhanhHH 0.67, other 1 | none | need_review = false |
| ohcleo | LongVV 8, LuHX 1.5, PhuongPVT 1 | DuongDN/MinhTV (0h) | ⚠️ **Pending ×5**: LongVV 09-21 "overall compliance current library" 2:00, "Cover Art Generation" 4:00, "Add explicitness tier classification…" 2:00; PhuongPVT 09-21 "Meeting and follow up" 0:00; LuHX 09-23 "cover art design app" 1:30 |
| crystal_lang (Arthur, paused) | PhucVT 0.5 | TienND (override) | ⚠️ **Pending**: PhucVT 09-21 "Check and write script for delete data on staging…" 0:30 |
| fountain | (see Fountain section) | VuTQ/DuongDN | excluded per rule |

Workstream `missingReportDays` (client-report flag, informational): james_diamond 09-21/09-22, baamboozle 09-22/09-23.

---

## Maddy — W(09-21) — 08:40 (+07:00) (recheck, full 4-part)

### 1. Task Log Hours (Wed 09-23)
| Developer | Wed 09-23 | Week total | Status |
|-----------|-----------|------------|--------|
| LongVV (Kai) | 0h | 4h (Tue 09-22) | informational only, ad-hoc — no alert |
| LuHX | 4h | 17h | informational |
| ThanhNX | 0h | 3h | informational |
need_review = false (no reviewer configured).

### 2. Slack / Kai daily report
- WS Maddy LongVV 09-23 = 0h → Kai daily-report check not applicable.
- Madhuraka 17:06: "can you respond to my question on 428?" → Kai 17:09 "I have replied" + 17:07 "I will give you on tomorrow" (= today 09-24; LIFM2-428 prod deploy steps, per Kai's JIRA comment 17:08 "I'll prepare the necessary steps and give to you"). **Promise due today — track.**
- Madhuraka 17:08: "please number each of your suggestions in the word doc and add a column to spreadsheet…" — no visible reply yet.
- ⚠️ **anomawasala 20:16: "Can we reduce these gaps and price boxes make little wide?"** (+ screenshot) — **unanswered** (overnight).
- **Conclusion:** ⚠️ 2 direct client asks open (Anoma UI ask; Madhuraka numbering request) + 1 promise due today.

### 3. JIRA (LIFM2)
Weekly WS×JIRA cross-check (`maddy-jira-tasklog-check.js --week 2026-09-23`):
| Ticket | Summary | Status | Est | JIRA actual | WS log | Check |
|--------|---------|--------|-----|-------------|--------|-------|
| [LIFM2-467](https://madhuraka-godahewa.atlassian.net/browse/LIFM2-467) | In-Home Quote Form | To Do | 0h | 0h | 2.5h | ⚠️ no est, no JIRA log |
| [LIFM2-468](https://madhuraka-godahewa.atlassian.net/browse/LIFM2-468) | Quoting Tool Issue | Review | 0h | 0h | 1.5h | ⚠️ no est, no JIRA log |

Daily activity since last run:
- [LIFM2-465](https://madhuraka-godahewa.atlassian.net/browse/LIFM2-465) Quote-email tab feedback (To Do, Kai) — ⚠️ Anoma Wasala 23:51 @Kai numbered feedback list, **unanswered**.
- [LIFM2-428](https://madhuraka-godahewa.atlassian.net/browse/LIFM2-428) [Shopify] Product Authenticity Certificate (To Do, Kai) — Kai 17:08: will prepare deploy steps for Madhuraka.

### 4. Bitbucket PR status (`xtreme-web/rms`, 8 open)
| PR | Age | Title | Comments | Last |
|----|-----|-------|----------|------|
| [#548](https://bitbucket.org/xtreme-web/rms/pull-requests/548) | 2d | LIFM2-468 Fix Lens title selection | 1 | Rovo Dev bot 09-22 |
| [#544](https://bitbucket.org/xtreme-web/rms/pull-requests/544) | 14d | LIFM2-465 | 0 | — |
| [#543](https://bitbucket.org/xtreme-web/rms/pull-requests/543) | 18d | LIFM2-459 (by Madhuraka) | 0 | — |
| [#540](https://bitbucket.org/xtreme-web/rms/pull-requests/540) | 21d | LIFM2-450 | 0 | — |
| [#534](https://bitbucket.org/xtreme-web/rms/pull-requests/534) | 29d | Fix concurrent cron runs corrupting quote results | 1 | Rovo Dev bot 08-26 |
| [#520](https://bitbucket.org/xtreme-web/rms/pull-requests/520) | 71d | Refresh Issue on Quotes page | 0 | — |
| [#509](https://bitbucket.org/xtreme-web/rms/pull-requests/509) | 94d | LIFM2-428 | 5 | Rovo Dev bot 08-14 |
| [#481](https://bitbucket.org/xtreme-web/rms/pull-requests/481) | 157d | LIFM2-409 feedback | 1 | Madhuraka 06-06 — waiting on customer, not our blocker (per rule) |
No unanswered human reviewer comments on our side.

**Maddy Trello: ○ kept open** (re-checked 08:45 — Anoma 20:16 ask still no reply) — 2 unanswered direct client asks (Anoma 20:16 UI gaps/price boxes; LIFM2-465 feedback list) + Madhuraka numbering request. Recheck after Kai's working hours.

---

## Scrin.io — 2026-09-23 — 05:30 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-23):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:35 (+07:00)

**Part 1 — Matrix Plan:** ~~not found in this window — recheck needed.~~ Found (room fetched back to Mon): @trinhmtt Mon 09-21 09:19 "ViTHT 40h, DatNT 40h, ThinhT 20h => QC 25h", **updated 11:29: "ViTHT: 40h, DatNT: 32h, ThinhT: 20h, Vu Tat: 8h => QC 25h"**.

**Part 2 — Task Log Actuals (Workstream, Mon→Wed 09-21..23):** ~~Blocked by Workstream outage.~~
| Dev | Mon | Tue | Wed | Week |
|-----|-----|-----|-----|------|
| ViTHT | 0.5 | — | 2 | 2.5h |
| DatNT | — | — | — | 0h (not on Fountain WS roster at all) |
| ThinhT | 4 | 4 | — | 8h |
| VuTQ | — | — | 4 | 4h |
| QC: PhatDLT | 4 | 4 | — | 8h |
| QC: HungPN | 2.25 | — | 2.5 | 4.75h |
| TrinhMTT (not QC, excluded) | 2.5 | — | — | 2.5h |

**Part 3 — Plan vs Actual (3/5 days elapsed → ~60% pace):**
| Dev | Plan | Actual | Pace expected | Note |
|-----|------|--------|---------------|------|
| ViTHT | 40h | 2.5h | ~24h | far below — but ViTHT active in room daily (PR #540 prod fix, cards) → likely logging lag |
| DatNT | 32h | 0h | ~19h | 0 WS rows despite shipping CSV fix all day 09-23 → logging gap |
| ThinhT | 20h | 8h | ~12h | slightly under |
| VuTQ | 8h | 4h | ~5h | on pace |
| QC (PhatDLT+HungPN) | 25h | 12.75h | ~15h | slightly under |
Per rule: informational, no per-dev 0h alert/reminder.

**Part 4 — Capacity & Runway ("Est vs Charged" tab, live read):** Narrow 229.00h / 28 tasks · Broad 328.50h / 63 tasks — unchanged vs prior weeks (frozen).

**Part 5 — Over-estimate tracking:** 36 items Actual > (Est+CR)×1.2 (prev 37 → 1 resolved/removed). Top: 1550% (0.5→8.25h, Has Bug on Live), 790% (12→106.75h, Deployed on Staging), 725% (2→16.5h), 650% ×2, 625%, 600%, 538% ([#2501 different position](https://trello.com/c/WtWwRVov)).

**Trello board (Web Development, customer comments since Mon):** ~~Not checked this run.~~
- ⚠️ **UNANSWERED** kunalsheth 09-23 20:36: "@rick570 Were you able to push this live?" — [Updating Gifts CSV Not Linking to product catalog](https://trello.com/c/BcAjuYb6) (team fixed it 15:15 per Matrix, but no reply on card)
- ⚠️ **UNANSWERED** tmmckay 09-23 16:48: "Can we introduce a max of 3 lines, which would end in an ellipsis…" — [Browse page - Product blurbs](https://trello.com/c/uopF36jA)
- ⚠️ UNANSWERED kunalsheth 09-22: Astra QC proposed changes on separate branch — [Chatgpt Astra QC](https://trello.com/c/wEXmONY3); Cloudflare/codex note — [Cloudflare update](https://trello.com/c/XNIhXMdT); SEO card note — [Improve SEO](https://trello.com/c/gzFHRN84)
- Info (no reply needed): tmmckay "ready to pick up" [contact form layout](https://trello.com/c/OSbaYhDP); "Looks good to me" [GiftDrop Recipient flow](https://trello.com/c/tSuQHKwj)
- Answered ✓: repo invite (thmc2), test env 2FA code, Order items export, Analytics.
- Stuck >5d: To-Do 19/24, Bugs 13/18, Doing 4/5, QC Internal 3/6, QA Backlog 6/9, In QA 2/4.

Trello: Fountain ○ kept open (re-checked 08:45 — still no reply) — unanswered direct customer asks on the board (push-live question, 3-line blurb question).

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
- Neural Contract ✓ ~~(Upwork Cloudflare-blocked = not an alert per rule)~~ → recheck: messages fetched OK, no new client message since 09-18
- Ohcleo ✓ (Tony's report present, Celine engaged positively)
- Elena - WordPress SamGuard ✓ (clean)
- Elena - SamGuard, Colin, Arthur, Blair Brown, Philip ✓ (Ignore List)
- DuongDn/Carrick/Nick/Rick/Kai/Ken (mail) ✓

**Left incomplete (need recheck):** — updated at recheck (live Trello re-fetched 08:20)
- Maddy - Carrick/Kai/Luis — ~~full 4-part check not run~~ → 4-part check done (see `## Maddy`); **○ kept open**: unanswered direct client asks (Anoma 20:16, LIFM2-465 feedback, Madhuraka numbering request).
- Raymond - LegalAtoms — ~~⚠️ Alert #2, direct customer ask unconfirmed as answered.~~ → ✓ **completed 08:24**: hamidsalamatali97's "fix asap" tagged `<@UJE7XHT4L>` = **Armaghan Iqbal** (client-side dev), not us (our account = `david`); issue on client's `rhuang/juristium-clone` repo. Not our action item per LegalAtoms rule.
- Bailey — Slack ggs clean (Nick's report present); ~~TuanNT hours unverified~~ → TuanNT 0h 09-23 → reminder sent 08:32 → ✓ **completed** (0h-reminder rule)
- Rebecca (William Bills) — Slack quiet; ~~TuanNT hours unverified~~ → same TuanNT reminder → ✓ **completed**
- Fountain — ~~3-part check incomplete~~ → full 5-part done; **○ kept open**: unanswered customer asks on Fountain Trello board (Kunal "push live?", tmmckay 3-line blurb).
- Also re-verified gated items completed by cron on unverified hours: Aysar + Elliott (KhanhHH 8h 09-23 ✓ — confirmed OK), James Diamond (LeNH hours — see Sheets; LeNH 0h 09-23 → reminder sent 08:32; item stays ✓ (Vinn Discord report present + reminder rule)).

---

## Reminders — 05:50 (+07:00)

~~Not run this pass — no Workstream data. No reminders sent.~~ Recheck 08:32:
- TuanNT: 0h 09-23, no leave → **sent** to `!knbJbIKzXRJNGVFQNg` (event `$RM3cbC6wprsIqf55Vj1vt9n8xyKmt9RTECVoHQk2RSQ`) → Bailey/Rebecca/John Yi completed
- LeNH: 0h 09-23, no leave → **sent** to `!OIrgPraJWrcDTnRVLQ` (event `$_kIjaBeTE_Kaq7Keibt2TKVEedG4dcHctsUgV-0INd8`)
- KhanhHH: 8h ✓ skip · LongVV: ad-hoc Maddy, skip · PhucVT: ignored (adhoc/external)

---

## Matrix — 05:12 (+07:00)

**Active rooms: 23 / 146 | Messages: 768** *(since 2026-09-23 08:45)*
Full details: reports/2026-09-24/matrix-rooms-0512.md

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| ~~!SHdFKwrYpRhWJBtiBv~~ | ~~09:33~~ | ✅ answered by duongdn 09:33 — vutq: "anh Dương ơi anh có nắm account DigitalOcean không ạ - để login rồi em báo Kunal lấy 2FA" — needs DuongDN's DO account access for Kunal's 2FA setup |
| ~~Arthur - Meta-Stamp~~ | ~~09:28~~ | ✅ answered by duongdn 09:29/09:37 + namtv 09:30 — tiennd: "hi anh Năm, anh Dương, trong msg có 3 phần 1. Fixed Price và ngày bàn giao cho carryover + M4 (est 54h) và price for each separate (est 14h)" — awaiting DuongDN's input on Arthur pricing/estimate structure (Arthur is paused for active monitoring, but this direct ask still needs a reply from DuongDN personally) |

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

**Fountain / InfinityRoses:** ~~not queried this run — time-boxed.~~ Queried at recheck (since 09-23 08:45):
| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| Fountain Gifts | 0.99 | 107ms | 0.002% (1/62391) | 44.2/min |
| InfinityRoses | 0.99 | 127ms | 0% (0/15774) | 11.2/min |
- Fountain top error: `Gibbon::MailChimpError` 400 "Invalid Resource" on list member PUT (1x — bad subscriber email, benign).
- Fountain slowest: gifts/build_a_box_gift_variants 4494ms/72 calls; paypals/authorize_order 2888ms/3; pro_payment_intents/create 1824ms/1; payment_intents/create 1699ms/49; users/registrations/create 1525ms/13.
- Infinity slowest: paypals/authorize_order 2530ms/2; payment_intents/create 2008ms/2; users/passwords/forgot 1797ms/1; ShipStationShipmentWorker 1368ms/3; registrations/create 1177ms/2.
Both healthy; nothing >5s.

---

## Upwork Memo — 2026-09-23 — 06:05 (+07:00)

~~| Rory / Aysar / Neural | Cloudflare challenge |~~ → re-run at recheck 08:30 (carrick live-cookie injection worked):

| Workroom | Dev | Memos | Invalid | Details |
|----------|-----|-------|---------|---------|
| Rory | KhanhHH (covering; LeNH tracker) | 1 | 0 | — |
| Aysar | KhanhHH | 4 | 1 | ⚠️ "Handle feature: Allow team seat count to be decreased in admin #717" — flagged feature-only/no concrete action (borderline: "Handle feature" is generic). Valid: "Fix the 'Cannot play game.' feedback on Free/Paid Game Mode Toggle #673", "Handle feature: Add dark mode option… - update dark mode styles for settings panel dividers", "Fix bug: @username search not working on production #704…" |
| Tokenlite (Marcel) | — | 0 | 0 | ~~duongdn account logged out~~ → signed in 08:43, re-run OK: no memos 09-23 (ad-hoc). |
| Neural Contract | — | messages-only | — | `upwork-neural-check.js` OK: 20 msgs, newest 09-18 (ours, review request) — no new client message. |

Aysar memo ⚠️ → alert to KhanhHH (reminder not sent — needs `--send-reminder`/user OK). Rory/Aysar project gates unchanged (memo validity is reported, doesn't flip their Slack/hours gates).

---

## Ignore List — 06:07 (+07:00)

Not tracked (paused), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip

---

## Unresolved Questions

1. ~~LegalAtoms ask answered?~~ Resolved — not directed at us.
2. ~~Workstream outage~~ Resolved at recheck.
3. ~~Fountain plan missing~~ Found (Mon 11:29).
4. ~~DuongDN pending Matrix asks (DO 2FA, Arthur pricing)~~ Already answered 09-23.
5. ~~Maddy 4-part not run~~ Done — client asks open, recheck after Kai hours.
6. DatNT has 0 Fountain WS rows this week despite active work — logs elsewhere or gap?
7. Approve OhCleo pending reviews (DuongDN/MinhTV)?
8. ~~duongdn Upwork (Profile 9) needs sign-in~~ Done 08:43.
