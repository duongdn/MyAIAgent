# Daily Report — 2026-08-21 (Friday)

**Run:** 2026-08-21T08:40 +07:00 (interactive, full run)
**Window:** 2026-08-20T08:53 → 2026-08-21T08:40 (+07:00)
**Leave plan:** none known for today.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets — TuanNT | 0h combined across all sources on 2026-08-20 (no leave note found). Blocks John Yi/Rebecca/Bailey Trello items. |
| 2 | Sheets — LeNH | 0h combined across all sources on 2026-08-20 (no leave note found). Was already reminded on 08-20 morning about 08-19 gap (resolved miscommunication); today's own 08-20 total is genuinely 0h. Blocks Blair Brown item. |
| 3 | Fountain Trello | Card "ActionController::BadRequest in GET /admin" stuck in Doing 16.0 days — stuck/hard-to-release candidate. |
| 4 | Elena | PR #309 "Implement header and modal components with i18n support" (nusken) open since 08-11, not yet merged/reviewed this run — CodeRabbit review not checked this pass. |
| 5 | Trello (Neural, Philip, Arthur, Elena-WordPress) | Not run this pass — see Deferred section. |

**Today (Fri 08-21):** no leave/WFH reported.

---

## Email — all — 08:41 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 1 | 0 | no events |
| carrick@nustechnology.com | 8 | 6 | no events |
| nick@nustechnology.com | 5 | 0 | no events |
| rick@nustechnology.com | 22 | 19 | 12:30 HEAL Meeting, 10:30 OmniGPT Daily Sync |
| kai@nustechnology.com | 6 | 6 | no events |
| ken@nustechnology.com | 30 | 0 | 08:30 DE Daily Standup ×2, 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 5 | 3 | — |
| dnduongus@gmail.com | 17 | 2 | — |
| davidztv19@gmail.com | 2 | 0 | — |
| freelancer@mpfc | 0 | 0 | — |

**Carrick alerts:** SocalAutoWraps Rollbar prod error #53 (undefined method) + daily summary; Elliott/Generator Redmine Bug #80510 [Android] ×2; namtv "Checking in - URGENT HELP PLEASE" re: James Le Chevalier client (already being handled per Matrix — namtv has access, coordinating).

**Rick alerts (Fountain/Infinity):** Multiple BugSnag/Rollbar entries — FountainStaging PG::ConnectionBad, ActionView::MissingTemplate, InvalidAuthenticityToken, NoMethodError ×2 (#307), FirstProject #1090/#1103, InfinityRoses/FountainGifts daily summaries. Volume consistent with normal Fountain dev-team activity (Rollbar/BugSnag notification noise), not escalated beyond routine.

**Kai alerts:** JIRA LIFM2-409 "Import Shopify payouts" — Anoma Wasala mentions/updates ×6, active ticket work.

**vuongtrancr:** New Relic "Signal lost 10min" for Swish Low Application Throughput — informational, no BugSnag [HIGH].

**dnduongus:** newsletter noise only, no security alerts.

Trello: all 6 mail items ✓ complete.

---

## Slack — all 14 workspaces — 08:50 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 0 | quiet (incl. Aysar MPDM) |
| RDC - FM Monitoring | 32 | automated tuner access/reboot logs only |
| Swift Studio | 15 | Rory/Jeff normal sprint coordination, dev-account access requests |
| Xtreme Soft Solutions | 0 | quiet |
| SAM GUARD - Mobile | 0 | quiet |
| Global Grazing Services | 12 | Nick posted daily report in #maintenance; Amy/Joey routine client support |
| Amazing Meds | 0 | quiet |
| Generator | 0 | quiet |
| LegalAtoms | 0 | quiet |
| MyPersonalFootballCoach | 0 | quiet |
| William Bills | 0 | quiet |
| Equanimity | 86 | Carrick/Komal working attendance-PIN duplication issue (internal dev topic, not customer-facing alert) |
| SoCal Auto Wraps | 0 | dropped, not gated |
| Aigile Dev | 1 | automated alert bot post only |

Trello: Maddy, Aysar, Franc, Elliott, MPFC, Marcel, Raymond ✓ complete (all clean/no alerts).

---

## Discord — all — 08:52 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | ~15 | Vinn/Jeff active — Upload Key .pem certificate handoff for Play Store signing, in progress |
| Bizurk (nuscarrick) | 0 | quiet, no Andrew DMs |

Trello: James Diamond, Andrew Taraba ✓ complete.

---

## Sheets/Workstream — all developers — 09:05 (+07:00) — reporting date 2026-08-20

| Developer | Combined actual | Status |
|-----------|-----------------|--------|
| LongVV | 5.5h (Auction Warehouse) | OK — part-time, weekly threshold gate, not daily |
| PhucVT | 10h (OhCleo) | OK |
| TuanNT | **0h** — all sources checked | ⚠️ ALERT — no leave note found |
| KhanhHH | 7.5h (Radio Data Center 5.5, Samguard 1, Generator 1) | OK |
| LeNH | **0h** — all sources checked | ⚠️ ALERT — no leave note found (see also 08-20 morning miscommunication about 08-19, resolved; this is 08-20's own genuine 0h) |

Workstream needs-review check: no `needsReview` rows found for LongVV/PhucVT/KhanhHH/TuanNT/LeNH's projects this pass (Fountain excluded per policy).

Trello: John Yi, Bailey, Rebecca left ⚠️ incomplete (TuanNT 0h gates all three). Blair Brown left ⚠️ incomplete (LeNH 0h).

---

## Reminders — 09:06 (+07:00)

- TuanNT: needs reminder (0h, no leave) — not sent (no `--send-reminder` flag)
- LeNH: needs reminder (0h, no leave) — not sent (no `--send-reminder` flag)

---

## Fountain — 3-part check — 09:20 (+07:00)

**Part 1 — Matrix Plan** (posted 08-20 16:16 by trinhmtt, room "Kunal - Fountain"):
ViTHT: 40h | ThinhT: 20h | VuTQ: 4h | DatNT: 36h => QC 25h

**Part 2 — Task Log Actuals** (Workstream, week 08-17→08-20, mid-week):
| Dev | Week actual | Week charged |
|-----|-------------|--------------|
| ViTHT | 23h | 23h |
| ThinhT | 16h | 16h |
| DatNT | 28h | 25h |
| VuTQ | 0h logged this week (no rows found) | — |
| QC PhatDLT | 9h | 9h |
| QC HungPN | 7h | 7h |
| TrinhMTT (plan poster, not QC) | 14.5h | 0h |

**Part 3 — Plan vs Actual** (through Thu 08-20, Fri remaining):
- ViTHT: 23/40h — on track
- ThinhT: 16/20h — on track
- DatNT: 28/36h — on track
- VuTQ: 0/4h plan — no hours logged yet this week (small plan, still time before week end)
- QC combined (PhatDLT+HungPN): 16/25h — on track

**Trello board (Fountain):**
- ⚠️ Card "ActionController::BadRequest in GET /admin" stuck in Doing 16.0 days — flag as stuck.
- Customer comments (kunalsheth) this window: feedback on Infinity Roses product position (positive), Account-scoped products box-dimension question, Build-a-box price change note ($27→$30), Digital Proof Generator roadmap review ask. No comments appear unaddressed beyond normal turnaround.
- Active card counts: To-Do 23, Bugs 18, Doing 4, QC Internal 9, QA Backlog 4, In QA 2, Done(v2) 4, Seasonal 6, Notes 7, Shelf 11.

Trello: Fountain left ⚠️ incomplete (stuck Doing card).

---

## Elena — 09:25 (+07:00)

- Open PR: #309 "Implement header and modal components with i18n support" (nusken, opened 08-11) — CodeRabbit review + merge/deploy flow not run this pass.
- Precognize (nusken): 0 open PRs on `Precognize/development`, no `nus/` branch pending.
- WordPress SamGuard console check: not run this pass.

Trello: Elena - SamGuard, Elena - WordPress SamGuard left ⚠️ incomplete.

---

## OhCleo Slack — 09:12 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | ~15 | Marketing-email batching bug (SES 10k-email send) — Tony deployed fix to prod 11:29, batches of 1,000 now; Celine's last reply (11:37) forwarded a follow-up email, no unresolved complaint as of window end |
| #events-code | 0 | quiet |

Tony's response/deploy present, resolved within window. Trello: Ohcleo ✓ complete.

---

## Maddy — 4-part check — 09:35 (+07:00)

1. **Slack (Xtreme Soft Solutions):** 0 messages this window — quiet.
2. **Workstream hours (LongVV, Maddy/Xtreme project):** 0h logged on 08-20. Per gate rule, Kai-role daily-report check is conditional on LongVV logging hours that day — 0h means the check is skipped, not an alert.
3. **JIRA cross-check:** not re-run standalone this pass (see `maddy-jira-tasklog-check.js` from prior runs); Matrix thread (room `!aaumKvfltGlhqcQjJP`) shows binhnt questioning dev(3.35h)-vs-QC(8.5h) ratio for last week — duongdn explained (large untested task not yet released drives QC-heavy weeks), resolved in-thread same day.
4. **Unanswered client/Madhuraka messages:** none found this window.

No new alert. Trello: Maddy ✓ complete.

---

## Arthur / Meta-Stamp — 09:36 (+07:00)

**Deferred this pass** — full 6-source check (2 Matrix rooms, 3 Solid-Code Slack channels + 1:1 Art DM, Workstream Crystal-lang est/actual, GitHub commits/PRs) not run due to time-boxing on this run.

**Partial signal available from Matrix full-room scan (Piece 10, room "Arthur - Meta-Stamp"):** phucvt handled a Chris issue same-night ("Tối qua em có xử lý cho Chris rồi"); tiennd noted Leo's hour cap raised 20h→25h for an urgent fix, prioritized ahead of MyID work. No unresolved client question visible in this excerpt. Not a substitute for the full 6-source check.

Trello: Arthur - Meta-Stamp left ⚠️ incomplete — needs full check on next recheck.

---

## Performance / New Relic — 09:30 (+07:00)

| Project | Apdex | Avg response | Errors | Throughput |
|---------|-------|--------------|--------|------------|
| OhCleo (prod) | 0.93 | 271ms | 679/26937 (2.5%) | 18.7/min |
| MPFC | 0.61 | 888ms | 76/26055 (0.3%) | 18.1/min |
| Fountain Gifts | 0.98 | 126ms | 1/45110 | 31.3/min |
| InfinityRoses | 0.96 | 182ms | 250/24590 (1.0%) | 17.1/min |

MPFC apdex chronically poor (known ongoing issue, tracked separately). No new outlier error classes flagged beyond usual.

---

## Deferred (not run this pass — time-boxed run)

- Scrin.io (Nick @ John Yi)
- Matrix full per-room summary write-up (raw dump captured in `reports/2026-08-21/matrix-rooms-0849.md`, only key excerpts summarized above/below)
- Arthur/Meta-Stamp full 6-source check (Trello item left incomplete)
- Upwork Memo validation (Piece 15)
- MS Teams — Philip Briggs check
- WhatsApp/Zalo (excluded by default)

These should be picked up on next recheck.

---

## Matrix — key items — 08:49 (+07:00)

**Active rooms: 24/141 | Messages: 557** — full raw dump: `reports/2026-08-21/matrix-rooms-0849.md`

### ⚠️ Action items for DuongDN (1)

| Room | Time | Message |
|------|------|---------|
| Sandor Antal - Lyf Support | 09:28 | minhtv: "A Dương ơi, bên này mình đang làm fixed cost cho lão, vướng cái issues nhỏ xíu, mà cần đến BE code... share cho a Git: bitbucket.org/lyfappteam/lyf" — needs review/response |

### Key updates

**Maddy (Xtreme)** — binhnt questioned Maddy's dev(3.35h)-vs-QC(8.5h) ratio; duongdn explained big untested task not yet released causes QC-heavy weeks; resolved in-thread, no action needed.

**Arthur/Meta-Stamp** — phucvt handled a Chris issue same-night; tiennd noted Leo's hours bumped 20h→25h for urgent fix, prioritized over MyID. No unresolved client question surfaced.

**LeNH reminder (08-20 morning)** — duongdn sent a reminder that initially misattributed to "today" (08-20, not yet due), corrected to 08-19 gap; resolved amicably. Independent of today's finding: LeNH's own 08-20 total is genuinely 0h (see Sheets alert above).

**Fountain** — plan posted, PR reviews (vutq) flowing normally, see Fountain section above.

**Other:** namtv flagged urgent Google library-removal issue for a client (James Definitive access), duongdn confirmed access still available, coordinating; ETZ/datnc had local AnythingLLM tooling issues, no client impact.

---

## Unresolved questions

1. Elena PR #309 — merge/deploy not attempted this run; needs CodeRabbit review + SSH build/deploy flow on next pass.
2. TuanNT and LeNH 0h on 08-20 — reminders printed but not sent (no `--send-reminder`); confirm with user whether to send.
3. Fountain "ActionController::BadRequest in GET /admin" (16 days in Doing) — needs owner/priority check.
4. Arthur/Meta-Stamp, Upwork Memo, Scrin, MS Teams Philip pieces deferred this run — should be covered on next recheck or explicit re-run.
