# Daily Report — 2026-09-01 (Tuesday)

**Run:** 2026-09-01T06:07:00+07:00 (cron)
**Window:** 2026-08-31 08:08 → 2026-09-01 06:07 (+07:00)
**Leave plan:** GGS/Bailey (amy): OOO tomorrow (Wed) + today for public holiday, back Thursday.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email carrick@ | "Re: Checking in - NUS Technology: URGENT HELP PLEASE" — unread, needs triage |
| 2 | Email duongdn@ | New Relic account no longer syncing data — sync issue |
| 3 | Email rick@ (Fountain/Infinity) | Production errors: FountainStaging InvalidAuthenticityToken x2, InfinityStagingBE #102 x2 (10 occurrences/5min), daily summaries |
| 4 | Email ken@ (Precognize) | Precognize/welligence PR + issue activity (FeatureData RSocket compile error, XWWP-5640) |
| 5 | Email vuongtrancr@gmail.com (Swish) | 15 alerts — Delayed-newform prod errors #290/#289/#288/#186 (10-100 occurrences), Low Application Throughput signal lost x4, metric deviation x2 |
| 6 | Email freelancer@mpfc | Rollbar: WP_Error::get_method() x10/5min (chronic, known); daily summaries |
| 7 | Matrix — BDD Delivery | namtv: client wants to pause/reduce project abruptly, "khó khăn... cần dùng extra cost" — unresolved staffing/cost issue |
| 8 | Matrix — Celine/OhCleo | Multiple unresolved technical threads: phucvt asking about deploy conflicts; hungpn/SNS deleted, email campaign flow broken, needs reproduction+Hung assignment; escalation chain unresolved as of 00:02 |
| 9 | Matrix — Delivery Department | minhtv: OhCleo scope change request re: code review process (PhucVT/LuHX review requirement) — needs anh Năm's decision |
| 10 | Workstream | SSO/login failed (background browser-login attempt killed/timed out) — blocks Maddy/JohnYi/Elliott/Bailey/Rebecca/Blair Brown/Fountain hour+review checks this run |
| 11 | Scrin.io | Nick @ John Yi: 0h logged 2026-08-31 |

**Today (Sep 1):** GGS/Bailey team OOO (public holiday, per amy's Slack note) — back Thursday.

**Not run this pass (time-boxed after Workstream retries):** Fountain (5-part), Elena PR/deploy/WordPress, OhCleo Slack, Performance/New Relic, Arthur/Meta-Stamp, Upwork Memo validation, WhatsApp/Zalo (excluded by default). Recheck needed.

---

## Email — all — 06:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 4 | 2 (NewRelic sync) | no events |
| carrick@nustechnology.com | 2 | 1 (URGENT HELP PLEASE) | no events |
| nick@nustechnology.com | 1 | 0 | no events |
| rick@nustechnology.com | 9 | 7 (Fountain/Infinity prod) | no events |
| kai@nustechnology.com | 3 | 0 | no events |
| ken@nustechnology.com | 80 | 4 (Precognize/welligence) | DE - Daily Standup 08:30, DE - Tech Talks 09:00 |
| vuongtrancr@gmail.com | 16 | 15 (Swish prod) | — |
| dnduongus@gmail.com | 8 | 0 (newsletters/LinkedIn only, no security alerts) | — |
| davidztv19@gmail.com | 0 | 0 | — |
| freelancer@mypersonalfootballcoach.com | 3 | 3 (Rollbar/NewRelic) | — |

Trello: Kai, Nick ✓ complete. DuongDn/Carrick/Rick/Ken skipped (alerts).

---

## Slack — all 14 — 06:12 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 24 | Customer testimonial share; testing thread "all looks good"; carrick MPDM update to heyitsronanc/skjamie25 (login fix deployed); PR review thread #683/#674/#650/#657 resolved; site migration nusdev→bbzl.nusdev.net, skjamie still can't load new link; 12 github CI pings |
| RDC - FM Monitoring | 12 | Automated tuner access logs + 3x "Tuner Instability Alert" + 1 recovery — no human Franc content |
| Swift Studio | 0 | — |
| Xtreme Soft Solutions | 1 | Kai: "I have replied" |
| SAM GUARD - Mobile | 0 | — |
| Global Grazing Services | 4 | amy: OOO tomorrow+Wed holiday; joey asking about today; **Nick daily report posted** (Permission issue, Advanced Split Order, Cover Measure bugs); amy update to duongdn on bug/CR list |
| Amazing Meds | 0 | — |
| Generator | 3 | carrick requesting MR reviews (tasks 864/1126/1116), combining into single PR; rudi asking for release MR |
| LegalAtoms | 0 | — |
| MyPersonalFootballCoach | 1 | Bot/API token string only (not human content) |
| William Bills | 0 | — |
| Equanimity | 5 | carrick/komal data-count reconciliation thread (6572 total/645 today), resolved "OK let me check" → "Yes this is done" |
| SoCal Auto Wraps | 0 | (dropped, no Trello item) |
| Aigile Dev | 0 | — |

Trello: Rory, Franc, MPFC, Marcel, Raymond, Colin ✓ complete. Maddy/John Yi/Aysar/Elliott skipped (Workstream unavailable this run — needs recheck).

---

## Discord — AirAgri + Bizurk — 06:14 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 4 | dapackage: PR 683/684 RealPTT integration ready for review. jeff_trinh: daily report (8h) — Login/SignUp flows + session/auth done; two prior check-in msgs re: scope/priority |
| Bizurk (nuscarrick) | 0 | No messages, no Andrew DMs |

Trello: Andrew Taraba ✓ complete. James Diamond skipped (Vinn himself didn't post a report — only Jeff/dapackage activity; needs recheck).

---

## Scrin.io (Nick @ John Yi company account — 2026-08-31): 0h — no sessions recorded. Not TuanNT evidence.

---

## Sheets/Workstream — 06:16 (+07:00)

🔴 **Workstream unavailable this run.** Proactive token refresh + API refresh (2 attempts) + browser-login all failed/timed out (background login process killed after ~60s, matches recurring SSO outage pattern per [[feedback_workstream_display_outage_pattern]]). Google Sheets task-log system is retired (2026-08-21, no fallback source exists). Cannot verify hours, reviewer status, or needsReview for any project this run.

**Blocked:** Maddy/LongVV, John Yi/TuanNT, Elliott/KhanhHH, Bailey/TuanNT, Rebecca/TuanNT, Blair Brown/LeNH, Fountain Parts 2-3, James Diamond/PhucVT, Aysar/KhanhHH.

Needs interactive recheck once Workstream SSO recovers.

---

## Matrix — 06:05 (+07:00)

**Active rooms: 27 / 144 | Messages: 902** *(since 2026-08-31 08:00)*
Full details: reports/2026-09-01/matrix-rooms-0605.md

### ⚠️ Action items for DuongDN (12)

| Room | Time | Message |
|------|------|---------|
| PR/Marketing room | 15:09 | uyenvhp: "Hi anh Dương, bên PR có 1 bài recap Tech talk vừa rồi... Nhờ anh check giúp em phần caption + source ảnh" — pending review |
| BDD - Delivery | 15:12 | namtv: client wants to reduce scope/cost abruptly, staffing conflict — needs decision ⚠️ |
| Celine - OhCleo | 13:32–00:02 (9 msgs) | Multi-hour thread: AI review + code deploy coordination (minhtv/phucvt), then SNS/email-campaign bug escalation (hungpn) — unresolved as of 00:02, needs reproduction + assignment to Hùng ⚠️ |
| Delivery Department | 11:49 | minhtv: scope-change request for OhCleo code review process (PhucVT/LuHX review requirement) — needs decision |

### Key updates

**OhCleo — production email-campaign/SNS issue** (13:32–00:02):
- SNS config appears deleted (possibly by Phúc), blocking email marketing flow for Celine's campaign
- hungpn escalating repeatedly overnight, no resolution confirmed — real unresolved production issue, not just chat noise
- Separate: minhtv proposing review-process change (PhucVT/LuHX add review step) — pending anh Năm's call

**BDD - Delivery — client cost/scope conflict** (15:12):
- namtv flagging a client wants to pause/reduce hours abruptly mid-plan, extra cost already committed — needs guidance

**Other:**
- Baamboozle: normal dev activity, PR reviews resolved
- PR/Marketing: tech talk recap needs caption/photo-source check

---

## Trello — progress/mail — 06:18 (+07:00)
- Check mail: Kai, Nick ✓ complete. DuongDn/Carrick/Rick/Ken ⚠️ left open (real alerts above).
- Check progress: Rory, Franc, MPFC, Marcel, Raymond, Andrew Taraba, Colin ✓ complete. Maddy, John Yi, James Diamond, Aysar, Elliott, Elena, Bailey, Rebecca, Fountain, Philip, Ohcleo, Arthur, Blair Brown, Elena-WordPress ⚠️ left open — not run or blocked by Workstream outage this pass, needs recheck.

---

## Reminders — 06:19 (+07:00)
Not run this pass — gated on Workstream/Sheets hours data, which is unavailable this run. No reminders sent.

---

## Unresolved questions
1. Workstream SSO — same recurring outage; needs interactive recheck once resolved to complete hour-gated Trello items.
2. OhCleo SNS/email-campaign bug (Celine's project) — real production issue, needs owner assignment (Hùng) and resolution confirmation.
3. carrick@ "URGENT HELP PLEASE" email — content not triaged this pass, needs read.
4. BDD Delivery client cost/scope conflict (namtv) — needs a decision from DuongDN.
