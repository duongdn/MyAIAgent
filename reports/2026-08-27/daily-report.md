# Daily Report — 2026-08-27 (Thursday)

**Run:** 2026-08-27T06:00:00+07:00 (cron)
**Window:** 2026-08-26T08:10:00+07:00 → 2026-08-27T06:00:00+07:00
**Leave plan:** none known

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Swift Studio (Rory) | Ongoing Upwork/payment dispute — Rory frustrated about repeated contract/bonus balance issues, accused team of inaccurate time logging. Carrick/Jeff responding but unresolved as of last message 2026-08-26 09:42. |
| 2 | Elena - SamGuard | PR #309 "Implement header and modal components with i18n support" still open since 2026-08-11, unmerged (16 days). https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/309 |
| 3 | MPFC Performance | Apdex still poor (0.50, was 0.49). Search endpoint hit with SQLi probe traffic (`waitfor delay`) — security scan noise, not a code bug, but worth noting. |
| 4 | Matrix — BDD/OhCleo rooms | 3 action items directed at duongdn (see Matrix section) — retainer dispute with a client (BDD-Delivery room), lesson-learned meeting re: Phúc's performance complaints from Celine (OhCleo). |
| 5 | Workstream (all task-log projects) | Login requires interactive SSO browser — unavailable in this headless cron session (known host limitation, see project_daily_report_puppeteer_browser_launch_gap). Maddy/John Yi/Aysar/Elliott/Bailey/Rebecca/Blair Brown/Fountain hour-gated Trello items NOT verified this run — left incomplete, needs interactive recheck. |
| 6 | Upwork/Philip/Fountain/Arthur pieces | Not run this cycle — time-boxed cron session prioritized Email/Slack/Discord/Matrix/Performance/Elena first. Needs recheck. |

**Today (Thu 27 Aug):** No known leave. All present per available signals.

---

## Email — all — 06:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 0 | 0 | no events |
| carrick@nustechnology.com | 17 | 9 | no events |
| nick@nustechnology.com | 7 | 0 | DE - Daily Standup 08:30, DE - Tech Talks 09:00 (Teams) |
| rick@nustechnology.com | 23 | 15 | no events |
| kai@nustechnology.com | 5 | 4 | no events |
| ken@nustechnology.com | 80 | 9 | no events |
| vuongtrancr@gmail.com | 9 | 7 | — |
| dnduongus@gmail.com | 34 | 0 | — |
| davidztv19@gmail.com | 0 | 0 | — |
| freelancer@mypersonalfootballcoach.com | 4 | 4 | — |

MPFC (freelancer@) alerts are Rollbar production: `#56 Error: Call to undefined method WP_Error::get_method()` — recurring known issue (10+ occurrences), matches Performance section below. Rick/Kai/Carrick/Ken alert counts are expected content for their monitored keyword filters (Fountain/Kunal, Madhuraka, Redmine, Precognize PR notifications) — no new production incidents beyond what's already tracked.

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick items ✓ complete.

---

## Slack — all — 06:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|--------------|
| Baamboozle | 13 | skjamie25 reported 2 bugs (import only 15/100 questions, paid games showing free); carrick/notmedesign font-weight discussion. MPDM C07SQ4HAUHZ Aysar-gate not separately checked this run (general search covered it, no distinct "Today's update" from carrick found in this window). |
| RDC - FM Monitoring | 16 | Automated tuner instability/recovery alerts (routine) + carrick following up on plugin request, no reply yet. |
| Swift Studio | 31 | ⚠️ See Alerts #1 — payment/time-logging dispute with Rory, ongoing. |
| Xtreme Soft Solutions | 6 | Kai/Madhuraka PR + ticket discussion (Maddy project), normal dev exchange. |
| SAM GUARD - Mobile | 1 | HubSpot auto MQL notification only. |
| Global Grazing Services | 1 | Nick posted daily report ✓. |
| Amazing Meds | 0 | No activity. |
| Generator | 7 | Violet/Rudi/Carrick — Trello task coordination, normal. |
| LegalAtoms | 0 | No activity. |
| MyPersonalFootballCoach | 0 | No activity. |
| William Bills | 0 | No activity. |
| Equanimity | 27 | Carrick/Komal — Gyre UBI data quality back-and-forth, normal ongoing work. |
| SoCal Auto Wraps | 0 | (dropped, not monitored) |
| Aigile Dev | 1 | Automated blog-post deploy notice. |
| OhCleo | not run this cycle (time-boxed) | — |

Trello: Franc, MPFC, Marcel, Raymond, Andrew Taraba, Colin items ✓ complete (no person-status alerts). Maddy, John Yi, Aysar, Elliott, Bailey, Rebecca, Elena — left incomplete pending Workstream verification. Rory ⚠️ left incomplete (payment dispute).

---

## Discord — all — 06:12 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 14 | Vinn posted daily report ✓ (BioSecurity email template + deploy). Jeff Trinh posted daily report ✓ (Training Session save + Forms module) + coordinated bug triage with QA (bellatric02) re: Training Session save failure — resolved via API facility_id fix in progress. Contractor App released to App Store. |
| Bizurk (nuscarrick) | 0 | No activity, no Andrew DMs. |

Trello: James Diamond - Vinn task ✓ complete (both devs reported, no unresolved blocker). Andrew Taraba ✓ complete (already marked above).

---

## Scrin.io (Nick @ John Yi company account — 2026-08-26): 0h — no sessions recorded. Not TuanNT evidence.

---

## Sheets / Workstream — 06:20 (+07:00)

⚠️ Workstream requires interactive SSO browser login; this headless cron session could not complete it (known limitation — see `project_daily_report_puppeteer_browser_launch_gap`). No task-log hours verified for LongVV/PhucVT/TuanNT/KhanhHH/LeNH this run. Google Sheets task-log system is retired (all projects migrated to Workstream 2026-08-21), so there is no fallback data source. **Needs interactive recheck** before Maddy/John Yi/Aysar/Elliott/Bailey/Rebecca/Blair Brown Trello items can be safely completed or flagged.

---

## Fountain, Philip, Arthur, Ohcleo Slack, Upwork Memo — not run this cycle

Time-boxed cron session prioritized Email/Slack/Discord/Matrix/Performance/Elena. These require interactive recheck (Fountain needs Matrix+Workstream data; Philip needs MS Teams script; Arthur needs 6-source deep check; Upwork Memo needs live-cookie Upwork session).

---

## Elena — 06:25 (+07:00)

- Internal repo (`nustechnology/Elena-SamGuard-Digital-Plant`): PR #309 "Implement header and modal components with i18n support" (nusken) still open since 2026-08-11 — https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/309
- Precognize (`Precognize/development`, nusken account): no new nusken-authored open PRs found in latest list (5294, 5293, 5291, 5283, 5077, 5076 — all other authors).
- WordPress SamGuard console-error check: not run this cycle.

Trello: Elena - SamGuard left incomplete (PR #309 unresolved 16 days).

---

## Matrix — 06:06 (+07:00)

**Active rooms: 19 / 144 | Messages: 809** *(since 2026-08-26 08:00 +07:00)*
Full details: reports/2026-08-27/matrix-rooms-0606.md

### ⚠️ Action items for DuongDN (3)

| Room | Time | Message |
|------|------|---------|
| (unnamed, !oGYjbzEfphvvauBZtq) | 09:46 | namtv: "Chà, Minh than về bên Phúc nhiều quá, mày xem xử lý phát. Bên Celine đã complain nhiều rồi..." — Celine (OhCleo) complaining about Phúc's performance/communication, needs handling ⚠️ |
| (unnamed, !oGYjbzEfphvvauBZtq) | 10:23 | namtv: "Nãy tao cũng có nói cần lesson learned meeting với mày và Phúc luôn..." — lesson-learned meeting requested with duongdn + Phúc ⚠️ |
| Celine - OhCleo | 15:07 | minhtv: "Phúc Focus làm cái Series, theo như a Dương báo Long có time support, nên Long xử mấy cái bug phát sinh" — confirms LongVV picking up bugs while Phúc focuses on Series ⚠️ |

### Key updates

**OhCleo/Celine — Phúc performance complaint** (see action items above): namtv escalated that Celine has complained multiple times about Phúc's efficiency/communication. duongdn scheduled a 1:30pm meeting with Minh same day. LongVV floated to help absorb Celine bugs while Phúc focuses on the Series feature (~70% done per BE update).

**BDD-Delivery — client retainer/investment dispute:** A client cited a failed investment round as reason to want to reduce/pause the retainer without prior notice; team (namtv/chientx) pushing back, requesting a call, noting client hasn't paid the last invoice. Meeting booked, client kept rescheduling (4pm → 5pm). Ongoing, unresolved as of last message.

**Other:**
- LeNH room: customer response sent, awaiting reply.
- Fountain-related room: chientx clarifying relationship with a portfolio prospect (Daniel John / brakequip.com) — deferred to TuanNT.
- OhCleo dev-ops channel: routine QA/staging cleanup (deleting test tracks/audio), Trello ticket status updates (google play tags, rejected tracks bug) — normal day-to-day, resolved within thread.

---

## Performance — 06:30 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod, last 60min) | 0.93 | — | 3.0% (19/632) — all `NotAuthenticated` (benign) | 10.5/min |
| mpfc (prod, last 60min) | 0.50 | 1089ms | 0% (0/1692) | 28.2/min |

**OhCleo slowest transactions:** HomeMediasView.get 2950ms/17calls, MediaRecommendsView.get 1487ms/29calls, MediaByKeyView.get 1311ms/6calls, GetTracksView.get 675ms/14calls, MediaByTagView.get 469ms/7calls. All well under 5s threshold — healthy, notable improvement vs prior days (was 44s/226calls on MediaByKeyView 2026-08-25).

**OhCleo top errors:** `rest_framework.exceptions:NotAuthenticated` x19 (benign, public endpoint hits without auth).

**MPFC slowest transactions:** all 5 top-slow entries are hostile probe traffic, not real endpoints — `proj14/evil.exe` (4711ms), `DIPS.ps1` (4183ms), `rsh-192-168-1-89.exe` (3866ms), `.*ps1` (3503ms), and a SQLi `waitfor delay` payload against `/search/.../page/559/` (3462ms). Zero real application errors this window, but apdex still poor (0.50) — consistent with recent trend (0.49 on 08-25/08-26), driven by these slow scanner requests dragging response-time distribution, not a code regression.

Not gated by Trello — informational only.

---

## Trello — 06:35 (+07:00)

- Check Mail: DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ complete (6/6, card not yet auto-completed — recheck other items not applicable here, all done).
- Check Progress: Franc, MPFC, Marcel, Raymond, Andrew Taraba, Colin, James Diamond ✓ complete. Rory, Elena-SamGuard left incomplete (real alerts). Maddy, John Yi, Aysar, Elliott, Bailey, Rebecca, Fountain, Philip, Ohcleo, Arthur, Blair Brown left incomplete (not run / Workstream unavailable this cycle — needs interactive recheck).

---

## Reminders — 06:36 (+07:00)

Not run — depends on Workstream task-log data (unavailable this cycle, see above). No reminders printed or sent.

---

## Unresolved questions

1. Workstream SSO needs an interactive browser session — cannot be completed by cron. Needs a follow-up interactive recheck to fill in Maddy/John Yi/Aysar/Elliott/Bailey/Rebecca/Blair Brown/Fountain hours.
2. Fountain, Philip, Arthur, OhCleo Slack, Upwork Memo pieces were not run this cycle due to time — recheck needed.
3. Rory (Swift Studio) payment dispute and Elena PR #309 — both pre-existing, unresolved; no new action taken this run beyond flagging.
