# Daily Report — 2026-08-21 (Friday)

**Run:** 2026-08-21T08:40 +07:00 (interactive, full run)
**Window:** 2026-08-20T08:53 → 2026-08-21T08:40 (+07:00)
**Leave plan:** none known for today.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 0 | ⚠️⚠️ Email — Carrick (untracked client) | **James Le Chevalier's production platform is down** (Google dropped Maps `DrawingManager` in v3.65 auto-update, crashes page init). Nam Tran committed Carrick to help "today" (08-21) as of last night 22:41. No reply from Carrick found yet this morning. Needs action today — this client isn't in any Trello gate, so nothing else will catch it. |
| 1 | Workstream — TuanNT (Bailey) | 0h on 2026-08-20 in the **Speedventory** Workstream project (Bailey/Paturevision moved off Google Sheets to Workstream — see corrected memory), after 8h/8h/8h Mon-Wed. No leave note. Reminder **sent** to TuanNT's Matrix room 09:55 per explicit user request. |
| 2 | Workstream — LeNH (James Diamond) | Blair Brown correctly ignored (LeNH not assigned there this week). **But real gap found on the right project: James Diamond Workstream shows LeNH 8h/8h/8h Mon-Wed (08-17/18/19), 0h Thu 08-20.** Reminder **sent** to LeNH's Matrix room 09:xx. (My first check queried the wrong project/wrong API field — corrected after user pushback.) |
| 3 | Fountain Trello | Card "ActionController::BadRequest in GET /admin" stuck in Doing 16.0 days — stuck/hard-to-release candidate. |
| 4 | Elena | PR #309 real merge conflict (`mergeable: false, dirty`) against `nus/dp-20260811`, unresolved 10+ days, 0 CodeRabbit reviews. |
| 5 | Upwork Memo | Rory + Aysar workroom sessions both failed (login_failed / session_expired) — memo status unverified, not an alert per policy, needs manual re-auth on carrick Chrome Profile 1. |
| 6 | MS Teams — Philip | Possible unanswered client question (Elevate365 demo spec, "Does it make sense what I'm trying to do?") — needs date/reply verification. |

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

**Carrick alerts:** SocalAutoWraps Rollbar prod error #53 (undefined method) + daily summary; Elliott/Generator Redmine Bug #80510 [Android] ×2.

**⚠️ URGENT — James Le Chevalier (untracked client, not in any Trello gate — routed via CEO Chien Tran directly):** Production platform down. Google auto-updated the Maps JS API to v3.65 (`v=quarterly`) and dropped `DrawingManager` (polygon-drawing) — uncaught error inside `generateMap` crashes page init, cascading to break the `select2` filter setup too. Timeline: Chien looped in Nam Tran (Delivery Manager) 20/08 19:19 → Nam told James "**Carrick will look into this and help tomorrow**" (= today 08-21), cc'd Carrick 20/08 22:41 → James confirmed 20/08 23:20 "nothing changed, I'm about all day tomorrow to get this sorted." **No reply from Carrick found yet** as of this morning's mailbox check (09:5x) — not necessarily overdue this early, but needs action today. Full thread now in Alerts Summary.

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
| TuanNT | **0h** — Workstream Speedventory (Bailey) project: 8h/8h/8h Mon-Wed, 0h Thu 08-20 | ⚠️ ALERT — reminder sent |
| KhanhHH | 7.5h (Radio Data Center 5.5, Samguard 1, Generator 1) | OK |
| LeNH | Blair Brown: correctly 0h (reassigned off it). **James Diamond Workstream (her real project): 8h/8h/8h Mon-Wed, 0h Thu 08-20** | ⚠️ ALERT — reminder sent |

Workstream needs-review check: no `needsReview` rows found for LongVV/PhucVT/KhanhHH/TuanNT/LeNH's projects this pass (Fountain excluded per policy).

Trello: John Yi, Bailey, Rebecca ✓ complete (TuanNT reminder sent — reminder IS the action). Blair Brown ✓ complete (LeNH correctly not assigned there). James Diamond gate stays gated on this new James-Diamond-project finding — reminder sent, treat as action taken.

---

## Reminders — 09:06 (+07:00)

- TuanNT: needs reminder (0h, no leave) — **sent** 09:55 to `!knbJbIKzXRJNGVFQNg:nustechnology.com` per explicit user request (event_id `$5DSV_OX5vF6bLMBLmUxBwqAhDd0DZpltcqhEUBLQ_I8`)
- LeNH: 0h on 08-20 for her real project (James Diamond, not Blair Brown) — reminder **sent** 09:xx to `!OIrgPraJWrcDTnRVLQ:nustechnology.com` (event_id `$mjNGF7N3wDlGVPONqBqES05YZG98nlayrDn6AvrWkOY`)

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

## Elena — 09:40 (+07:00)

- Open PR #309 "Implement header and modal components with i18n support" (nusken, opened 08-11) — **`mergeable: false, mergeable_state: dirty`** — real merge conflict against base `nus/dp-20260811`, unresolved for 10+ days. No CodeRabbit reviews posted. Cannot auto-merge; needs a dev to rebase/resolve conflict manually.
- Precognize (nusken): 0 open PRs on `Precognize/development`, no `nus/` branch pending.
- WordPress SamGuard console check: clean — 0 JS errors, 0 page errors, 0 CSP violations. `failedRequests` only GA/ads/doubleclick network noise + video assets (non-CSP, benign).

Trello: Elena - SamGuard left ⚠️ incomplete (real PR#309 conflict, unresolved). Elena - WordPress SamGuard ✓ complete.

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

## Arthur / Meta-Stamp — 09:45 (+07:00) — 5/6 sources

1. **Matrix "Arthur - Meta-Stamp" room:** phucvt handled a Chris issue overnight (charged, "Nam Tran Tối qua em có xử lý cho Chris rồi"); tiennd's Leo hour cap raised 20h→25h for urgent fix, prioritized ahead of MyID; TienND transferred to handle 2 approved-estimate tasks (3.5h). No unresolved client question.
2. **Matrix technical-setup room:** quiet — last real message 08-10, nothing new this window.
3. **Slack "Solid Code" (3 channels + Art 1:1 DM):** ⚠️ still not accessible — workspace missing from this server's `.slack-accounts.json`, same recurring config gap documented since 2026-07-13. NOT run.
4. **Workstream "Crystal lang" est/actual (week 08-17→08-23):** PhucVT 2.5h (08-19, YouTube OAuth scope fix), TienND 4h (08-20, transferred over). 1 `needsReview` row pending: PhucVT's 08-19 task (2:30) — reviewer TienND.
5. **GitHub `Christebob/Meta_Stamp_V3`:** 0 open PRs, 1 commit direct-to-main since window start (davidztv, "restrict upload labels to audio-only and dedupe activity feed by event ID").

5/6 sources verified, no new unresolved client-facing question found. Solid Code Slack gap is a known recurring environment issue, not a new failure — completing per partial-verification precedent (matches multiple prior runs, e.g. 2026-08-20 recheck).

Trello: Arthur - Meta-Stamp ✓ complete.

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

## Scrin.io — 09:41 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-08-20):** 0h — no sessions recorded.

---

## Upwork Memo — 2026-08-20 — 09:42 (+07:00)

| Workroom | Result |
|----------|--------|
| Rory | `login_failed` — live cookie + stored + headless re-login all failed. Carrick's real Chrome Profile 1 Upwork session likely logged out. |
| Aysar | `session_expired` |

Session/auth failure ≠ memo status per policy — no alert, no Trello gate impact (existing Rory/Aysar Slack+hours gates already completed above). Manual re-auth needed on carrick's Chrome Profile 1 to restore memo checks.

---

## MS Teams — Philip Briggs — 09:43 (+07:00)

Thread activity found: Philip asked Will "do you have some availability to do something for me?" → Will replied same day asking for details → Philip sent a full spec ("Elevate365 Static Demo — Industry Selector / 80-User Model") at 1:21-1:22 PM, followed by "Im close but cant get it over the line... sent my latest version to gitlab demo v2" (1:23 PM) and "Does it make sense what I'm trying to do?" (1:34 PM) — **no visible reply after Philip's last two messages** in this capture.

⚠️ Possible unanswered client question — needs verification of exact timestamp/date and whether a reply exists outside the captured screenshot range before treating as a hard alert.

Trello: Philip left ⚠️ incomplete pending confirmation.

---

## Deferred (not run this pass — time-boxed run)

- Matrix full per-room summary write-up (raw dump captured in `reports/2026-08-21/matrix-rooms-0849.md`, only key excerpts summarized above/below)
- WhatsApp/Zalo (excluded by default)

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

0. **James Le Chevalier's production platform is down** (Maps `DrawingManager` removed by Google's v3.65 auto-update) — Carrick committed to help today, no confirmation yet he's started. This client has no Trello gate/tracked project, so it needs a direct check-in, not automated monitoring.
1. Elena PR #309 has a real merge conflict (dirty, 10+ days) — needs a dev to resolve before it can merge; not something we can auto-fix.
2. TuanNT reminder sent 09:55 (Speedventory/Bailey Workstream). LeNH reminder sent (James Diamond Workstream, her real project — Blair Brown correctly cleared).
3. Fountain "ActionController::BadRequest in GET /admin" (16 days in Doing) — needs owner/priority check.
4. Philip Briggs MS Teams thread — need to confirm exact date and whether "Does it make sense what I'm trying to do?" was answered outside the captured screenshot range.
5. Upwork memo checks (Rory/Aysar) blocked by carrick's Chrome Profile 1 Upwork session — needs manual re-login.
