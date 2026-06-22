# Matrix — since 2026-06-19 08:00 +07:00 (summarized)

Active rooms: 26 / 126 | Messages: 581

## DM/Internal rooms (duongdn 1:1s, summarized)

- **!aaumKvfltGlhqcQjJP (binhnt DM)**: duongdn assigned as DM for Colin (KhanhHH task log monitor) and TL for Fountain. binhnt confirmed both, noted Bailey had duplicate weekly-monitor row (duongdn fixed, will recheck AI script).
- **!knbJbIKzXRJNGVFQNg (tuannt DM)**: duongdn flagged TuanNT 0h on 18/06 across all 5 sheets (John Yi, Rebecca, Paturevision, Neural, CharlesChang). TuanNT confirmed reported to customer same day.
- **!mYZBGNoLFVpMVIJtPu (longvv DM)**: Discussion on LIFM2-439 completion + weekend availability; LongVV offered 4h Sat + 4h Sun for emergencies/go-live tasks.
- **!oGYjbzEfphvvauBZtq (namtv DM)**: Figma/Upwork/Google access sharing for Rick; LeNH moved off Rory onto Blair Brown temporarily (per duongdn).
- **!OIrgPraJWrcDTnRVLQ (LeNH DM)**: duongdn flagged Upwork showed 8.17h on 18/06 (Rory/BXR) but task log sheet missing description — message cut off, follow-up not visible in window.
- **!oofREYAXHsvPWEOJev (thuyltt DM)**: New job "Blair Brown - Peptide Clyde" added to weekly report scope. James Diamond week 15/06 report: Web 40/40h PhucVT, 0/0h LongVV, Mobile 20/20h AnhNH2.
- **!QEbdvaMJkTurMpRPIX (phucvt DM)**: PhucVT shared some codes/image, asked to delete all but item #4 — no further context.
- **!rwLbvLBnrRAYMaOPaD (khanhhh DM)**: duongdn flagged KhanhHH 18/06 task log short (Generator 1h + Baamboozle 5.83h = 6.83h). KhanhHH explained +1.17h Colin/ETZ not yet logged; duongdn noted ETZ/Colin sheet + Workstream Colin also 0h all week, asked to log retroactively.
- **!zfXpcHSkwqWylFrApi (chientx DM)**: Marcel Füssinger portfolio-use permission confirmed "Yes" (ambiguous on discount topic, duongdn checking). Blair Brown customer messages relayed (responsiveness pressure, mobile UI priority — 85% customers on mobile).

## Project/team rooms

**Celine - OhCleo — 154 messages**: Heavy day-long dev thread (tiennd/hiepnt/minhtv/hungpn). Deployed staging fixes (token refresh, onboarding track removal). SEO task backlog created by client — tiennd asked duongdn for SEO help (⚠️ action item, see below); duongdn deferred as non-urgent. PR review request from hiepnt, duongdn gave feedback in thread. Found bug: completion-rate tracking always shows 100% because no `finished_play` API call wired up — flagged as needing a new task to build proper play-tracking API (start/pause/resume/finished). iOS build blocked by Apple License Agreement acceptance (not "membership expired" as originally miscommunicated to client — corrected).

**Kunal - Fountain — 83 messages**: Active ticket triage (Thinh/Hung/Vi/Vu/Trinh). Several Trello/Redmine tickets resolved and pushed to staging/live (issues 79344, 79361, card 2914, 2836, etc). Decision made to defer large PR #469 (52 files) to Monday rather than risk Friday-evening live push. End-of-day reminder: `tasklog đầy đủ nha mn @room`.

**Elena - Active Alerts — 57 messages**: AA-48/AA-51/AA-52/AA-28 ticket reassignment and scope discussion (anhttl/samht/khanhhh/anhnvn). CR (change request) billing confirmed hourly rate, pending client go-ahead on timing. AA-52 merged into SR-6923-6924-active-alerts-fe branch, deploy/test requested. AA3 scope kickoff announced for Monday.

**Elena - Digital Plant — 26 messages**: Bug fix (extra "www" text on Create Canvas button) + PR #307 merged/deployed by duongdn. Client (external) wants Import & Autoscan features enabled on their own test server — currently disabled by duongdn's earlier config; anhttl/trinm asked duongdn to create a PR to their repo enabling these modes (⚠️ action item, see below). duongdn opened PR #5014 to Precognize/development, reviewed as "clean".

**PHP Projects — 36 messages**: Customer (apparently "Kai"/Maddy-side complaint) escalation about delayed tickets and slow communication (one message allegedly unanswered since "July 14"). namtv + duongdn ran internal root-cause review; duongdn sent formal "lesson learned" email to team (root causes: scope/est overruns, QA rework cycles, family-related distraction cited by dev). chientx pushed back that issue list lacked root-cause explanations (⚠️ action item, see below) — duongdn acknowledged ("OK").

**Maddy - Extreme Soft Solutions — 34 messages**: Same complaint thread mirrored here. duongdn set new process rules: (1) QC approval required before release, (2) QC testing-round monitoring, (3) estimate compliance with approval escalation, (4) no blind AI-result trust — must self-review. LIFM2-439 (orig est 12h, ran 9h over/21h) and LIFM2-409 (240h est, 17h tracked so far) flagged as over-budget; pushed to finish 439 same day. LongVV completed and Thanh Nguyen (QC) tested.

**NUS - Colin - ETZ — 13 messages**: Two Redmine issues (79366 area) logged and closed same day by hungpn/lucnt. Reminder to khanhhh re: Workstream task-log entries for Colin CardWell/ETZ/Wathaga project.

**Rory Hackett - BXR App — 53 messages**: Long QA thread on Pixel 8 login bug (app stuck on home screen after login, 2-month-old issue per minhtv) — narrowed to device-specific, reproducible only on minhtv's Pixel 8 (works on BrowserStack/other Android). try/catch + error logging added by tinpc for next diagnosis round. lenh noted UEA sub-scope now out of budget/tasks, work paused there.

**Delivery - Resource Arrangement — 4 messages** (cross-checked per task instructions): namtv posted 3 leave/idle notes — ThienVN (23/06, personal matter), ThiHV (29-30/06, family trip, not yet approved), AnhNH2 (afternoon 19/06, family matter, no make-up via Nestor). halt confirmed all dev leaves processed/noted, remaining cases pending review. **None of LongVV/PhucVT/TuanNT/KhanhHH/LeNH/VietPH appear in this room's window.**

**BDD - Delivery — 2 messages**: Week-of-22/6 dev plan — ThamTTH and TuanNTG (Joe Kazzi) IDLE full, pushed another week to 29/6.

**Delivery Department — 2 messages**: Web dev plan week 22/6 (SamHT split Unito/Elliot/Scott-buffer/Elena), Mobile dev plan unchanged.

**Potential - Blair Brown - WooCommerce — 2 messages**: anhnvn relayed client question to duongdn about a mobile-version screenshot (⚠️ flagged below, low priority — client doesn't need it urgently, just asked).

**Other small/social rooms** (Bailey-BA/QC, Senior Devs, Technology Department, NUS Technology, Những chú voi con đáng yêu): routine QC pickup, deadline reminders, AI training announcement, World Cup prediction banter, song requests — no action items or blockers.
