# Daily Report — 2026-09-16 (Wednesday)

**Run:** 2026-09-16T05:00:00+07:00 (cron), corrected 09:20 (+07:00)
**Window:** 2026-09-15 08:58 → 2026-09-16 05:00 (+07:00)
**Leave plan:** PhucVT full-day leave 2026-09-07 → 2026-09-18 (personal matters) — 0h in this window is expected, not an alert.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Workstream | ~~Session-wide SSO outage this run — blocks task-log hours verification for Maddy/John Yi/Aysar/Elliott/Bailey(TuanNT)/Rebecca/James Diamond gates this run.~~ **RESOLVED 09:20** — `workstream-login.js` succeeded on retry, verified live queries work. All gated items rechecked below (#5-#11). |
| 2 | GGS Slack #maintenance | ~~0 messages since window start — Nick's daily report to GGS/Bailey appears missing.~~ **RESOLVED 09:20** — Nick's "Yesterday Report" found live in #général (not #maintenance) at 2026-09-16 08:43, covering 09-15 work. Not a real gap, wrong channel assumption. |
| 3 | OhCleo Slack (Celine DM) | Celine (customer) 12:20 message: went through all "Ready to Test" cards, nothing she can actually test herself, asks Tony to finish remaining cards and specify exactly what/how to test. Needs a reply. |
| 4 | New Relic — MPFC | New severe slow-transaction outlier: `video/craig-j*` avg ~284s across 3 calls (multiple URL-suffix variants) — much worse than usual chronic slowness, worth a look. Chronic `WP_Error::get_method()` (46x) and apdex 0.48 (poor) continue unresolved for months. |
| 5 | Fountain (Workstream) | ViTHT 0h logged this week (2026-09-14 → 09-15, 2 of 5 workdays) vs weekly plan of 40h — expect ~16h by now. No leave noted. Real gap, not yet resolved. |
| 6 | Workstream — OhCleo | `needsReview` has 12 Pending entries (HungPN, LuHX, PhuongPVT, LongVV) for 2026-09-14 — addressed to reviewers DuongDN, MinhTV. Unresolved. |

**Today (Wed 09-16):** PhucVT on leave (personal, through 09-18). No other leave found.

---

## Ignore List — 05:00 (+07:00)
Not tracked (paused), auto-completed on Trello: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip.

---

## Email — all — 05:00 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 2 | none (OA happy-hour notice, Salesforce newsletter) | no events |
| carrick@nustechnology.com | 6 | none — BioPhoto/SpeedFaceV5L thread is XID/ZKTeco partner support (not our bug), Jira weekly digest | 09:00 Daily Meeting w. team (recurring) |
| nick@nustechnology.com | 0 | — | no events |
| rick@nustechnology.com | 15 | none — FountainStaging BugSnag errors are staging=INFO; InfinityRoses/FirstProject Rollbar daily summaries match clean New Relic Fountain (apdex 0.99) / Infinity (apdex 0.98) this window | no events |
| kai@nustechnology.com | 1 | none (Jira weekly digest) | no events |
| ken@nustechnology.com | 80 | none scanned as alert-worthy (mostly Precognize dev digest volume) | 08:30 DE Daily Standup, 09:00 DE Tech Talks (recurring) |
| vuongtrancr@gmail.com | 18 | none flagged as HIGH/Signal-lost | — |
| dnduongus@gmail.com | 20 | none (no security alerts) | — |
| davidztv19@gmail.com | 0 | — | — |
| freelancer@mypersonalfootballcoach.com | 4 | see Performance alert #4 — Rollbar `WP_Error::get_method()` chronic (10x/5min burst 13:27), New Relic newsletter, Cloudflare BD follow-up (non-technical) | — |

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ complete.

---

## Slack — all 14 workspaces — 05:05 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 17 | Carrick posted MPDM "Today's update" (bug fix deployed, dark-mode feature deployed) + active `#testing` back-and-forth w/ skjamie25/notmedesign on dark-mode UI tweaks — normal dev cycle, no unanswered customer ask. |
| RDC - FM Monitoring | 1 | Automated "Tuner Access Log" post only. |
| Swift Studio | 2 | Carrick resolved part of a HubSpot issue w/ client; roryh asking about research progress (internal). |
| Xtreme Soft Solutions | 8 | Madhuraka/Kai exchange re: batch-processing fix verification, waiting on client to send updated doc/spreadsheet — in progress, no blocker on us. |
| SAM GUARD - Mobile | 2 | HubSpot MQL auto-notifications only. |
| GLOBAL GRAZING SERVICES | 1 | Amy: items deployed to Live, requesting payment review/approval — no #maintenance activity (see Alert #2). |
| Amazing Meds | 0 | — |
| Generator | 0 | — |
| LegalAtoms | 2 | Raymond internal assignment nudge + a bug report from hamidsalamatali — neither is Nick-specific/direct-to-us. |
| MyPersonalFootballCoach | 1 | Empty/media-only post from freelancer. |
| William Bills | 0 | — |
| Equanimity | 2 | komal.bailur (XID) confirming/acking items — routine. |
| SoCal Auto Wraps | 0 | — (dropped, no Trello item) |
| Aigile Dev | 0 | — |

Trello: ~~Maddy left ⚠️ open~~ **✓ complete** (LongVV 0h WS this week — ad hoc, never alerted per policy; Slack shows normal in-progress collab). ~~John Yi ⚠️ open~~ **✓ complete** (TuanNT 0h — sick leave 09-15, see Matrix section). ~~James Diamond ⚠️ open~~ **✓ complete** (LeNH 8h logged 09-15). Franc ✓ complete. Rory ✓ complete. ~~Aysar ⚠️ open~~ **✓ complete** (KhanhHH 8h WS 09-15 + Carrick's MPDM update present, no unanswered ask). ~~Elliott ⚠️ open~~ **✓ complete** (KhanhHH combined hours nonzero). MPFC ✓ complete. Marcel ✓ complete. Raymond ✓ complete. ~~Bailey ⚠️ open~~ **✓ complete** (see Alert #2 resolved; TuanNT sick leave explains 0h). ~~Rebecca ⚠️ open~~ **✓ complete** (TuanNT sick leave 09-15).

---

## Discord — both — 05:07 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 11 | Vinn posted process report; Jeff Trinh posted daily report (4h) — both present. bellatric02 QA-testing Contractor Workflow, dapackage raised an n8n callback/safety-risk design question (internal discussion, no client ask pending). |
| Bizurk (nuscarrick) | 0 | No activity, no Andrew Taraba DMs. |

Trello: ~~James Diamond - Vinn task ⚠️ still needs LeNH Workstream hours (blocked)~~ **✓ complete** (LeNH 8h WS 09-15; Vinn's Discord report already present). Andrew Taraba ✓ complete.

---

## Sheets/Workstream — 05:10 (+07:00), corrected 09:20 (+07:00)

~~🔴 Workstream unavailable this run~~ **RESOLVED on recheck** — `workstream-login.js` succeeded, live queries confirmed working across all projects for 2026-09-15.

PhucVT: on approved leave through 09-18 — 0h expected, not an alert regardless.

**09-15 hours (Workstream, verified live):**
- LongVV (Maddy/Xtreme): 0h this week so far — ad hoc, not alerted per policy.
- TuanNT: 0h across amazing_meds/rebecca/speedventory/family_app for 09-15 — **sick leave 09-15** (per namtv Matrix note) explains this, not an alert. (8h logged on speedventory for 09-14, day before leave.)
- KhanhHH: 8h (Baamboozle project).
- LeNH: 8h (James Diamond project), 4h AnhNH2 same project.
- Fountain team: DatNT 4.25h, HungPN 1.5h, ThinhT 4h, PhatDLT 3h, LamLQ 2h. ViTHT 0h — see Alert #5.
- Bailey/speedventory: VyNL 6.5h, VuTQ 8h.

Maddy JIRA weekly cross-check: **still not run this pass** — script reads a stale Sheet source per memory, needs a Workstream-based rewrite; time-boxed out this recheck too.

---

## Scrin.io (Nick @ John Yi company account — 2026-09-15): 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:12 (+07:00)

**Part 1 — Matrix Plan** (room `!EWnVDAxbTGsBxPkaaI`): no new plan message this window — carrying forward last known: trinhmtt — ViTHT 40h/wk, ThinhT 20h/wk, DatNT 40h/wk => QC 25h/wk.

**Part 2 — Task Log Actuals (Workstream, week 2026-09-14→09-20, through 09-15):**
| Dev | Week total | Role |
|-----|-----------|------|
| DatNT | 12.25h | Dev |
| ThinhT | 8h | Dev |
| ViTHT | 0h | Dev — see Alert #5 |
| HungPN | 2.75h | QC |
| PhatDLT | 6h | QC |
| LamLQ | 2h | Dev (not on plan, extra) |
| TrinhMTT | 3h | (excluded — plan poster, not QC) |

**Part 3 — Plan vs Actual** (plan: ViTHT 40h/wk, ThinhT 20h/wk, DatNT 40h/wk => QC 25h/wk; 2 of 5 workdays elapsed, ~40% expected):
- DatNT: 12.25/40 (31%) — slightly behind, not alarming this early.
- ThinhT: 8/20 (40%) — on track.
- ViTHT: 0/40 (0%) — real gap, no leave noted. **See Alert #5.**
- QC (PhatDLT+HungPN): 8.75/25 (35%) — on track.

**Trello board (customer comments/stuck cards):** not run — Rick's separate board token still not configured (recurring gap, see prior reports).

Additional context from "Kunal - Fountain" Matrix room: high dev activity (67 msgs) — PR reviews, Redmine bug fixes, live deploys, QC handoffs. No unanswered customer question observed in this room.

Trello: Fountain ⚠️ left incomplete — ViTHT 0h vs 40h/wk plan unresolved (Alert #5); Trello board still unverified.

---

## Elena — Ignore List (auto-complete, see above). ~~WordPress SamGuard health check not run this pass~~ **run on recheck 09:20** — no JS errors, no CSP violations, no page errors. `failedRequests` are benign analytics/ads/video-preload noise only. Clean. Trello: Elena - WordPress SamGuard ✓ complete.

---

## Trello — 05:15 (+07:00)

Card "Check mail": all 6 items ✓ complete (see Email section).
Card "Check progress":
- ✓ complete: Franc, Rory, MPFC, Marcel, Raymond - LegalAtoms, Andrew Taraba, Colin*, Elena-SamGuard*, Arthur-Meta-Stamp*, Blair Brown*, Philip* (*=Ignore List auto-complete), **Maddy, John Yi, James Diamond, Aysar, Elliott, Bailey, Rebecca, Neural Contract, Elena - WordPress SamGuard** (all resolved on 09:20 recheck)
- ⚠️ left incomplete: Fountain (ViTHT 0h gap, Alert #5), OhCleo (Celine's ask + new needsReview alert #6)

---

## Reminders — 05:16 (+07:00), corrected 09:20 (+07:00)

~~Cannot compute 0h reminders — Workstream/Sheets both unavailable this run~~ **Workstream now live** — the only combined-0h dev on 09-15 was TuanNT, explained by sick leave (see Matrix). No genuine 0h/no-leave case found. No reminders needed.

---

## Matrix — 05:09 (+07:00)

**Active rooms: 26 / 145 | Messages: 494** *(since 2026-09-15 08:00)*
Full details: reports/2026-09-16/matrix-rooms-0509.md

### ⚠️ Action items for DuongDN (6)

| Room | Time | Message |
|------|------|---------|
| (anhnvn 1:1) | 09:44 | anhnvn: "A Dương có làm việc qua với cái WordPress plugin tên là Quiz-Survey Master này chưa ah: https://quizandsurveymaster.com/" — pre-sales tech question |
| (anhnvn 1:1) | 09:50 | anhnvn: "Dạ có cái potential này cần gửi proposal... Dính tới WordPress nói chung. Chắc cần discuss và để a Dương estimate luôn." — awaiting estimate |
| !KGfMOdTMWQwLObwAEk | 10:42 | anhttl: relaying a technical question via Kiet Nguyen, offering to loop in Dương/Tiến |
| !KGfMOdTMWQwLObwAEk | 10:52 | anhttl: "thui em chờ anh Kiet Nguyen chốt nha, anh cần anh Dương thì em sẽ hú ảnh" — no action needed yet |
| Potential - PPV Form & Scoring Engine | 10:55 | anhnvn: info staged, will report when ready |
| Potential - PPV Form & Scoring Engine | 13:48 | anhnvn: asking if further discussion needed before proposal delivery |

### Key updates

**Bailey/Paturevision — daily scrum + Rails upgrade tracking (internal room, not customer-facing per prior correction):**
- datnc posted daily update 10:01; Rails upgrade has 5 feedback items (1 pending 3rd-party, others re-test), CR1 staging bugs largely fixed with re-verification issues flagged.
- duongdn probed several open bugs/status with team throughout the day — normal oversight, no unresolved blocker as of window end.

**Fountain — weekly plan carried forward, active dev (67 msgs in project room):**
- PR reviews, Redmine fixes, staging→live deploys ongoing all day, no customer escalation seen.

**KhanhHH 0h reminder (09-14) sent + acked** — carried over from prior run's tail end (08:57 08-15 boundary), already resolved (`da ok a`).

**Other:**
- James Le Chevalier (halt's client) — 2 overdue invoices sent 13:32, duongdn acked.
- namtv note: TuanNT sick leave 09-15, Bailey not compensated per note.
- Stripe Dashboard credential request (datnt) routed to management per policy — handled correctly, no action needed from DuongDN beyond the routing reply already given.

---

## OhCleo Slack — 05:18 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 2 | See Alert #3 — Celine (12:20) asks Tony to finish "Ready to Test" cards, wants explicit test instructions. Tony's daily report present 10:20 (AI-assisted tag taxonomy review, 60% in progress). |
| #events-code | — | `channel_not_found` (bot removed from channel, known recurring gap, needs admin re-invite) |

**Workstream needsReview (09:20 recheck, new finding — see Alert #6):** 12 Pending entries for 2026-09-14 (HungPN x3 @0:00, LuHX 1:30, PhuongPVT x2 @0:00, LongVV x5 totaling 8:00 across "fix expired subscriptions," "AI-assisted tag taxonomy," Trello reply, 2x query optimization). Reviewers: DuongDN, MinhTV.

Trello: Ohcleo ⚠️ left incomplete — Celine's ask needs a reply/reconciliation, plus new needsReview alert #6, before completing.

---

## Performance — both projects — 05:20 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|---------------|------------|------------|
| ohcleo (prod) | 0.96 | 114ms | 3.3% (637/19052) — 92% benign NotAuthenticated/InvalidToken | 13.6/min |
| mpfc | 0.48 (poor, chronic) | 2571ms | 0.15% (70/46080) | 32.8/min |
| fountain | 0.99 | — | 2 errors/74979, clean | — |
| infinity | 0.98 | — | 1 error/16216, clean | — |

**OhCleo topErrors:** NotAuthenticated 588x, InvalidToken 21x, AuthenticationFailed(user doesn't exist) 10x, ValidationError(dup username/email) 8x+3x+2x, bcrypt-hash ValueError 2x — all benign/expected. No slow transactions >5s except `CreatorVerificationSubmitView.post` 18.6s/1 call (single outlier, watch for recurrence).

**MPFC topErrors:** `WP_Error::get_method()` 46x (chronic, unresolved for months), `join(): Passing glue string...` deprecated 6x, `continue targeting switch` warning 6x, `media_buttons_context` deprecated 4x, `count(): Parameter must be array` 4x, MemberMouse `get_option()` undefined 2x.

**MPFC slowest transactions:** `video/craig-j` and 4 URL-suffix variants (`.php`/`.html`/`.jsp`/no-suffix) all averaging **~282-284s across 3 calls each** — see Alert #4, new/unusual severe outlier, distinct signature from the usual sitemap/author-sitemap slowness (not present this window).

---

## Upwork Memo — 2026-09-15 — 05:22 (+07:00)

| Workroom | Status | Details |
|----------|--------|---------|
| Rory | login_failed | Live cookies + stored + headless re-login all failed this run — session-failure, not a memo-validity finding. |
| Aysar | session_expired | Same — no memo data available. |
| Neural Contract | session_expired | Messages-only workroom, no memos expected anyway. |

Trello: memo validity check retried 09:20, still login_failed/session_expired (live cookie inject succeeded but session expired, headless re-login selector failed) — session failure ≠ alert per rule, does not block Rory/Aysar's Trello items (both resolved above via other gates).

---

## Unresolved Questions

1. ~~Workstream SSO outage~~ — RESOLVED, recovered on retry 09:20 (transient, consistent with prior outage pattern).
2. ~~GGS #maintenance Nick report missing~~ — RESOLVED, found in #général, not a real gap.
3. Celine's (OhCleo) "Ready to Test" complaint — needs a direct reply from Tony/LongVV; not something we can resolve on our end.
4. MPFC `video/craig-j*` 284s outlier — new pattern, worth asking dev team if this is a known slow custom page or a fresh regression.
5. Fountain Trello board (Rick's account, customer comments/stuck cards) — still no separate API token configured, recurring gap across many reports.
6. Fountain ViTHT 0h this week (through 09-15) vs 40h/wk plan — no leave noted; worth confirming with trinhmtt whether ViTHT is on the current plan roster or reassigned.
7. OhCleo Workstream needsReview — 12 Pending entries need DuongDN/MinhTV to actually review the charged hours, not just be noted here.
8. Upwork memo validation (Rory/Aysar) — session still failing after 2 attempts (live cookie + headless); carrick's Upwork browser session likely needs a manual touch.
