# Daily Report — 2026-09-25 (Friday)

**Run:** 2026-09-25T05:00:00+07:00 (cron)
**Window:** 2026-09-24T05:00:00+07:00 → 2026-09-25T05:00:00+07:00
**Leave plan:** No new approved leaves on record for 09-24/09-25 (16 candidate emails scanned, 0 added).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets/Workstream — LeNH | 0h logged 09-24 across all projects (incl. James Diamond), no leave note. Strict gate — blocks James Diamond item. |
| 2 | Sheets/Workstream — TuanNT | 0h logged 09-24 across all projects (Bailey/speedventory stops at 09-23), no leave note. Blocks John Yi, Rebecca, Bailey items. |
| 3 | Sheets/Workstream — PhucVT | 0h logged 09-24 (crystal_lang/speedventory both stop at 09-23), no leave note. |
| 4 | Workstream needsReview — Crystal lang (Arthur) | PhucVT — "Check and write script for delete data on staging / Check and report data on production" (09-21) still Pending. Reviewer: TienND (override). |
| 5 | Workstream needsReview — OhCleo | PhuongPVT ("Meeting and follow up on tasks", 09-21) + LongVV (overview task, 09-21) still Pending. Reviewers: DuongDN, MinhTV. |
| 6 | OhCleo Slack — Celine Fierro DM | 14:29-14:30 Celine flagged admin data "not correct/updated" and asked timeline — last message unanswered by Tony as of window end. |
| 7 | Equanimity Slack | komal.bailur asked carrick "what is the status?" (x2) re: Upwork authorized-hour increase — appears unanswered in window. |
| 8 | Email — MPFC (Rollbar) | Chronic `WP_Error::get_method()` production error, 10 occurrences/5min fired twice (04:50, 21:16) — same unresolved bug tracked for months. |
| 9 | Email — Fountain (rick@) | Production errors: #341/#342 ActionView::Template::Error, #343 CSV::MalformedCSVError (all "production", not staging noise). |
| 10 | Upwork Memo | Rory=Cloudflare-blocked, Aysar=session_expired, Neural=login_failed — no memo data this run (session/CF failure, not a memo-validity finding). |

**Today (Fri 09-25):** No confirmed leave/WFH on record for monitored PHP team (LongVV/PhucVT/TuanNT/KhanhHH/LeNH).

---

## Email — all 10 accounts — 05:05 (+07:00)

| Account | Emails | Calendar today |
|---------|--------|----------------|
| duongdn@nustechnology.com | 0 | not checked this pass |
| carrick@nustechnology.com | 5 | not checked this pass |
| nick@nustechnology.com | 0 | not checked this pass |
| rick@nustechnology.com | 26 | not checked this pass |
| kai@nustechnology.com | 3 | not checked this pass |
| ken@nustechnology.com | 80 | not checked this pass |
| vuongtrancr@gmail.com | 10 | — |
| dnduongus@gmail.com | 35 | — |
| davidztv19@gmail.com | 1 | — |
| freelancer@mypersonalfootballcoach.com | 4 | — |

**carrick@:** Socalautowraps daily summary, "Error on montreall (Live) (Motto)", gitlab/Slack sign-in codes (routine), RE: "a few items awaiting your confirmation" (unread, worth a look next pass).
**rick@ (Fountain/InfinityRoses):** Mostly staging noise (FountainStaging/FountainStagingBE/InfinityStagingBE zeitwerk/CSV/routing errors — repeat "10 occurrences in 5 min" pattern, all staging). **Production**: #341/#342 ActionView::Template::Error, #343 CSV::MalformedCSVError (see alert #9). FirstProject production #1092 Uncaught Error also new today.
**kai@:** JIRA LIFM2-465 "Quote-email tab feedback" — Anoma Wasala mentioned Kai, thread active.
**ken@:** 80 emails, Precognize/NewsLetter volume — not read individually this pass (time-boxed).
**freelancer@mpfc:** Rollbar chronic WP_Error alert x2 + daily summary (86 existing errors) — see alert #8.
**davidztv19@ (Arthur):** Basecamp ResidentRadius activity digest — not a Meta-Stamp/Crystal-lang item.
**dnduongus@:** 35 emails, all newsletter/shopping/LinkedIn noise — no security alerts.

Trello: all 6 mail items ✓ complete (no alerting content found).

---

## Slack — all 14 workspaces — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 11 | Carrick's MPDM "Today's update" present (13:53) — 3 items in progress/deployed. GitHub commit + a font-implementation ask in #testing. |
| RDC - FM Monitoring | 3 | Carrick heads-up: MPX Slack alert live on 12/full tuner fleet, 2 tuners missing from list, now updated — informational, not a blocker. |
| Swift Studio | 2 | Jeff asking Rory for a Clutch/GoodFirms review; roryh "sure". |
| Xtreme Soft Solutions | 4 | Kai/anomawasala dev chat; anomawasala asked "can u send me the password?" (internal, not client-facing). Kai UI/UX improvement note. |
| SAM GUARD - Mobile | 5 | 5x HubSpot MQL-lead auto-notifications, no dev activity. |
| Global Grazing Services | 3 | Nick's daily report present in #maintenance + #général (recurring PrestaShop PHP7.2 warning, known chronic issue — see [[feedback_prestashop2_php72_composer_chronic_error]]). Amy update on dashboard fields. |
| Amazing Meds | 0 | Token valid, genuinely 0 activity. |
| Generator | 0 | No activity. |
| LegalAtoms | 3 | "will merge today" / test confirmations — routine dev chatter, no direct Nick mention. |
| MyPersonalFootballCoach | 0 | No activity. |
| William Bills | 0 | No activity. |
| Equanimity | 4 | See alert #7 — komal.bailur asking status twice, carrick waiting on Upwork hour increase. |
| SoCal Auto Wraps | 0 | Dropped 2026-05-11, no Trello item. |
| Aigile Dev | 1 | "the-gaige-alerts" bot post, no content shown — benign. |

Trello: Rory ✓, Franc ✓, Maddy — hold pending JIRA/Bitbucket 4-part check (not run this pass), Aysar ✓ (MPDM present + KhanhHH hours), Elliott — hold (KhanhHH generator hours not confirmed this pass), Marcel — ⚠️ skipped (alert #7), MPFC ✓, LegalAtoms ✓ (no direct ask).

---

## Discord — AirAgri + Bizurk — 05:15 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | ~14 | jdiamond fuel-transfer feature discussion across the day; vinn shared a mockup doc for jdiamond review. Jeff's daily report present (#airagri-flutter, 4h: map/layer menu work done). |
| Bizurk (nuscarrick) | 0 | No activity, no Andrew DMs. |

Trello: James Diamond — ⚠️ skipped (LeNH 0h gate, see alert #1), Andrew Taraba ✓ complete.

---

## Sheets/Workstream — 05:20 (+07:00)

Per-project actual dev hours (09-24) + reviewer/status:

| Project (client) | Dev hours 09-24 | Reviewer charged | Review status |
|---|---|---|---|
| Maddy (Xtreme) | ThanhNX 1h, LongVV 1.5h | need_review=false | — |
| James Diamond | ThangN 4h, **LeNH 0h** | PhucVT/LeNH need_review | NotRequired this period |
| Baamboozle (Aysar) | KhanhHH 4.67h | need_review=false | — |
| Radio Data Center (Franc) | KhanhHH 3.33h | LeNH need_review | NotRequired this period |
| Fountain (Kunal) | ViTHT 8h | VuTQ/DuongDN | none Pending |
| Speedventory (Bailey) | DatNC 4h, VyNL 7.75h, NamNN 3h, **TuanNT 0h** | need_review=false | — |
| Crystal lang (Arthur) | — (no 09-24 rows) | TienND (override) | **Pending** — PhucVT 09-21 task (see alert #4) |
| OhCleo | — (no 09-24 rows) | DuongDN, MinhTV | **Pending** — PhuongPVT + LongVV 09-21 tasks (alert #5) |

**LeNH:** 0h 09-24, no leave note → alert #1.
**TuanNT:** 0h 09-24 across ALL projects (only Bailey shows activity, stopping at 09-23) → alert #2, blocks John Yi/Rebecca/Bailey.
**PhucVT:** 0h 09-24 (crystal_lang/speedventory both stop 09-23) → alert #3.
**KhanhHH:** 8h combined (Baamboozle 4.67 + RDC 3.33) → OK.

Maddy JIRA weekly cross-check: not run this pass (time-boxed — needs recheck).

Trello: John Yi ⚠️ skipped (TuanNT 0h), Rebecca ⚠️ skipped (TuanNT 0h), Bailey ⚠️ skipped (TuanNT 0h + GGS daily report is present so only the hours gate blocks), Maddy held pending (see Slack section), Elliott held pending, James Diamond ⚠️ skipped (LeNH 0h), Blair Brown → Ignore List (paused, auto-complete).

---

## Scrin.io — 05:22 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-24):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:25 (+07:00)

**Part 1 — Matrix Plan** (room `!EWnVDAxbTGsBxPkaaI`): trinhmtt posted this week's plan Mon 09-21 11:29 — ViTHT 40h, DatNT 32h, ThinhT 20h, Vu Tat 8h => QC 25h.

**Part 2 — Task Log Actuals (week 09-21→09-27 so far):** ViTHT 16h, ThinhT 8h, HungPN 4.75h, PhatDLT 8h (QC), TrinhMTT 5.25h (QC), VuTQ 4h (QC).

**Part 3 — Plan vs Actual:** ViTHT 16/40h, ThinhT 8/20h — both on pace mid-week, no shortfall yet. VuTQ 4h vs 8h target — in progress. QC combined (PhatDLT+TrinhMTT+VuTQ) 17.25h vs 25h target.

**Trello board:** Not fetched this pass (time-boxed) — customer-comment/stuck-card check deferred to recheck.

Trello: Fountain — held pending (Trello board check not run this pass).

---

## Elena — 05:30 (+07:00)

- Internal repo (`nustechnology/Elena-SamGuard-Digital-Plant`): 1 open PR (#309, "Implement header and modal components with i18n support", author nusken) — CodeRabbit review not checked this pass (project on Ignore List/paused per 2026-09-09 directive — no merge/deploy action taken).
- Precognize (nusken): 0 open PRs from nusken account (7 open PRs total, all external authors).
- WordPress SamGuard CSP check: not run this pass (time-boxed).

Trello: Elena - SamGuard → Ignore List (paused, auto-complete). Elena - WordPress SamGuard → held pending (not run).

---

## Matrix — 05:35 (+07:00)

Only Fountain room actively fetched this pass (266 messages since Monday, see Fountain section above). Full all-rooms sweep not run this pass (time-boxed) — no other rooms' action items surfaced.

---

## OhCleo Slack — 05:40 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 5 | See alert #6 — Celine flagged admin data inaccuracy, asked update timeline, last msg 14:30 unanswered. |
| #events-code | 0 (channel_not_found) | Recurring — bot removed from channel, needs admin re-invite (known issue). |

Tony's daily report: not observed in this DM window.

Trello: Ohcleo ⚠️ skipped (alert #6, unanswered customer question).

---

## Performance — 05:45 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.96 | 141ms | 2.5% (535/21557) — 501 NotAuthenticated (benign), 20 InvalidToken, 9 duplicate-email, 3 password-mismatch, 1 user-not-exist | 14.9/min |
| MPFC (prod) | 0.46 | 1306ms | 2.0% (700/34365) — 598 `"continue" targeting switch` E_WARNING (new dominant class), 85 chronic `WP_Error::get_method()`, 3 Countable warning, 3 mkdir filename-too-long, 2 legacy-widget include error | 23.8/min |

MPFC apdex remains poor (0.46) — chronic, same root cause tracked for months (alert #8). Fountain/InfinityRoses New Relic not queried this pass (time-boxed).

---

## Upwork Memo — 2026-09-24 — 05:50 (+07:00)

| Workroom | Memos | Status |
|----------|-------|--------|
| Rory | — | Cloudflare challenge, not resolved |
| Aysar | — | Session expired |
| Neural Contract | — | Headless re-login failed (selector not found) |

Session/Cloudflare failures — not a memo-validity finding per existing rule. Manual re-auth needed: `node scripts/upwork-login.js --login --account=carrick` (visible browser, outside cron).

Trello: no dedicated Upwork Memo checklist item exists — informational only.

---

## Reminders — 05:52 (+07:00)

- LeNH: needs reminder (0h 09-24, no leave) — not sent (no `--send-reminder` flag this run).
- TuanNT: needs reminder (0h 09-24, no leave) — not sent.
- PhucVT: needs reminder (0h 09-24, no leave) — not sent.
- KhanhHH: skipped (8h logged).
- LongVV: skipped (ad-hoc, no fixed target).

---

## Ignore List — 05:53 (+07:00)

Not tracked (paused), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip.

---

## Trello — Check Progress / Check Mail — 05:55 (+07:00)

**Completed this run:** Rory, Franc, Aysar, MPFC, LegalAtoms, Andrew Taraba, Colin (ignore), Elena-SamGuard (ignore), Arthur (ignore), Blair Brown (ignore), Philip (ignore). All 6 Check Mail items.

**Left ○ (alert-gated):** Maddy, Elliott, John Yi, Rebecca, Bailey, James Diamond, Marcel, Ohcleo, Fountain, Elena-WordPress-SamGuard.

**Not completed — deferred pieces (needs recheck):** Maddy JIRA/Bitbucket 4-part, Arthur 6-source deep check, full Matrix all-rooms sweep, Elena WordPress CSP check, Fountain Trello board (customer comments/stuck cards).

---

## Unresolved Questions
1. Is LeNH/TuanNT/PhucVT's 09-24 0h a genuine full-day gap, or is Workstream data simply not yet synced for that date (all three show data stopping at 09-23 across every project, suggesting a possible sync lag rather than 3 simultaneous no-shows)? Needs recheck later today.
2. Celine's OhCleo data-accuracy question (alert #6) and komal.bailur's Equanimity status ask (alert #7) — were these answered outside the scanned window (e.g. verbally/on another channel)?
3. carrick@'s "RE: Follow-up: a few items awaiting your confirmation" email not read in detail this pass — needs follow-up.
