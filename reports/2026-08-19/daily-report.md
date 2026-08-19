# Daily Report — 2026-08-19 (Wednesday)

**Run:** 2026-08-19T07:38:00+07:00 (cron)
**Window:** 2026-08-18T08:49:00+07:00 → 2026-08-19T07:38:00+07:00 (~22h50m)
**Leave plan (today):** VinhNT off all day (đưa bé đi viện). PhongTH off (bận việc gia đình, HaVS covers his Alex work). ThinhLD off this morning (bận việc gia đình, DaiDV covers his Craig work).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email — rick@ | FountainGifts production errors #305 (10th occurrence) and NEW #306, both `NoMethodError: undefined method` — real Rollbar production alerts, unresolved as of window end |
| 2 | Email — rick@ | InfinityRoses production error #442 `NoMethodError: undefined method`, new this window |
| 3 | Email — vuongtrancr@gmail.com | New Relic "Signal lost for 10 minutes on Low Application Throughput" ×4 (Swish project monitoring) |
| 4 | Slack — Xtreme Soft Solutions (Maddy) | 2 unanswered client questions: anomawasala asked "confirm testing steps for #409?" (11:48) + "unable to find Shopify Clearing Account in Xero, plz check" (20:48, ~10h+ unanswered); madhuraka asked "is this task all good to go live?" + popup question (17:01-17:02, ~14h+ unanswered) |
| 5 | Slack — RDC (Franc) | dmetiner (client) self-fixed a device but asked "NTP keeps turning off in this device, what might be the reason?" (08-18 21:20) — unanswered ~9.5h as of window end |
| 6 | GitHub — Elena-SamGuard Digital Plant | PR #309 ("Implement header and modal components with i18n support") has a real merge conflict (`mergeable_state: dirty`), open since 08-11 (8 days), cannot auto-merge |
| 7 | New Relic — OhCleo | `MediaByKeyView.get` avg latency escalated to **49.4s/539 calls** — nearly doubled from 24.7s/324 calls noted 08-18. Chronic, worsening, unaddressed for weeks |
| 8 | New Relic — MPFC | Apdex 0.60 (poor, chronic). `WP_Error::get_method()` fatal 170× this window (weeks-old, unresolved plugin bug). SQL-injection `WAITFOR DELAY` scanner probes active on `/search/` again (dominates slowest-transactions list) |
| 9 | New Relic — Fountain | New slow-transaction outlier: `admin/product_catalogs/import_csv` avg **104.9s / 4 calls** — not seen in prior reports, worth watching |
| 10 | Sheets — Bailey/Paturevision | TuanNT shows 0h on the Paturevision task-log sheet for 2026-08-18, no leave note found — unverified (see Workstream outage note below) |
| 11 | Infra — Workstream SSO | Persistent session-wide outage (4 genuine login attempts this run — same "SSO redirected, no token captured" failure signature documented daily since 2026-08-03). Blocks hours verification for Sheets/Workstream (Piece 4), Fountain Parts 2-3, Blair Brown, and TuanNT/LongVV/PhucVT/KhanhHH/LeNH cross-checks this run |
| 12 | Infra — this host (mpfc.mpfc.live) | No persistent browser profile exists here (`/home/nus` doesn't exist on this box — confirmed via `ls /home/`) for: WhatsApp/Zalo monitor Chrome, Neural Contract's carrick Profile 1 cookie source, Solid Code Slack (Arthur), Philip MS Teams. This is the documented cross-host gap ([[project_mpfc_cron_server]]) — same failure pattern seen in every recent cron run, not new |

**Today (Wed 08-19):** VinhNT full day off, PhongTH off (covered by HaVS), ThinhLD off this morning (covered by DaiDV). Otherwise all present.

---

## Email — all — 07:15 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 0 | — | no events |
| carrick@nustechnology.com | 3 | — (Jira weekly digest + gitlab sign-in notice, not Redmine bugs) | no events |
| nick@nustechnology.com | 8 | — | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 28 | **#1, #2 above** (FountainGifts/InfinityRoses prod errors). Also `[FountainStaging]`/`[FountainStagingBE]` staging errors — INFO only, not alerts | 12:30 HEAL Meeting, 10:30 OmniGPT Daily Sync |
| kai@nustechnology.com | 6 | — (JIRA LIFM2-428/436 + Bitbucket PR #530 activity, expected Madhuraka content) | no events |
| ken@nustechnology.com | 80 | — (Precognize welligence/web + QueryPlatform PR/release activity, expected content) | 08:30 DE Daily Standup, 09:00 DE Tech Talks, 08:30 DE Daily Standup (dup) |
| vuongtrancr@gmail.com | 5 | **#3 above** (Signal lost ×4) | — |
| dnduongus@gmail.com | 25 | — (Give.Asia charity spam ×2, not security-related, ignored per filter) | — |
| davidztv19@gmail.com | 2 | — (MongoDB tips, Basecamp notif — no Arthur project content this window) | — |
| freelancer@mypersonalfootballcoach.com | 1 | — (TestFlight build notice) | — |

Trello: DuongDn, Carrick, Kai, Ken, Nick ✓ complete. **Rick ⚠️ left incomplete** (real production alerts #1-2).

---

## Slack — all — 07:20 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 0 | No MPDM (Aysar) update yet — normal, Carrick's window is 08:41-09:03 or 17:00-17:45, not due at scan time (07:2x) |
| RDC - FM Monitoring | 26 | dmetiner reported İstanbul-Altunizade FM tuner down + a redirect issue; carrick fixed both same-day. Recurred again 21:12, dmetiner self-fixed but asked a follow-up NTP question — **see Alert #5** |
| Swift Studio | 12 | roryh/jeff/me1 internal SendGrid/2FA credential troubleshooting for bxr app — normal dev chatter, no client complaint |
| Xtreme Soft Solutions | 7 | **See Alert #4** — 2 unanswered client questions (anomawasala, madhuraka). kai posted a Bitbucket PR #532 cherry-pick update |
| SAM GUARD - Mobile | 0 | No activity |
| GLOBAL GRAZING SERVICES | 3 | Nick posted daily report (Prestashop/console bugs) in #général — present, normal |
| Amazing Meds | 0 | No activity |
| Generator | 0 | No activity |
| LegalAtoms | 0 | No activity |
| MyPersonalFootballCoach | 0 | No activity |
| William Bills | 0 | No activity |
| Equanimity | 28 | Carrick/komal.bailur ongoing Simlian West Glad data-upload coordination (go-live 08-21) — normal iterative project work, carrick actively responsive |
| SoCal Auto Wraps | — | dropped from monitoring (2026-05-11) |
| Aigile Dev | 1 | Automated Sentry morning-check bot: 0 urgent new, 0 non-urgent new, 4 standing unresolved (unchanged) — no new alert |

Trello: James Diamond(n/a-Discord), Rory, MPFC, Marcel, Andrew(n/a-Discord), Colin ✓ complete. **Maddy, Franc ⚠️ left incomplete** (Alerts #4, #5). Aysar/Elliott left incomplete for hours-verification reasons (see Sheets section), not Slack alarms.

---

## Discord — all — 07:22 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 32 | Vinn's daily report present (10:19 window, safety-tracking prototype work). Jeff's daily report present (4h, contractor app build/deploy). James Diamond (client) active in both channels, normal iterative Q&A, no unaddressed complaint found — Contractor App still awaiting Apple review (external, not our blocker) |
| Bizurk (nuscarrick) | 0 | No activity, 0 Andrew DMs |

Trello: James Diamond - Vinn task ✓ complete. Andrew Taraba ✓ complete.

---

## Sheets / Workstream — 07:35 (+07:00)

🔴 **Workstream unavailable this run** — persistent session-wide SSO outage (4 genuine login attempts, "SSO redirected but API never fired" failure signature, matching the daily pattern documented since 2026-08-03). Cannot verify hours for any Workstream-tracked project this run.

Google Sheets cross-check for 2026-08-18 (fallback source): LongVV, PhucVT, TuanNT, KhanhHH, LeNH all show 0h across every sheet queried. **This is expected, not evidence of a shortfall** — nearly all projects moved to Workstream tracking months ago (confirmed 2026-07-13), so Sheets are structurally empty for most devs now regardless of actual work done. The one exception is **Bailey/Paturevision**, which has no Workstream project and uses Sheets as its sole source — TuanNT shows 0h there for 2026-08-18 with no leave note on file (Alert #10, needs verification next run).

No dev-hours Trello gates can be confidently completed or alerted this run beyond Bailey. Left incomplete: Maddy (also has a separate Slack alert), John Yi, Aysar, Elliott, Bailey, Rebecca, Blair Brown.

Maddy JIRA cross-check: not run this pass (blocked behind the same Workstream dependency for the weekly task-log data source).

---

## Scrin.io (Nick @ John Yi company account — 2026-08-18): 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 07:33 (+07:00)

**Part 1 — Matrix plan (Kunal - Fountain room):** trinhmtt posted this week's plan Monday 08-17 ~10:19: **ThinhT: 20h, ViTHT: 40h, DatNT: 36h => QC: 24h**. Roster note: DatNT now on the plan in place of VuTQ — VuTQ appears active only as senior/PR-reviewer this week (reviewed/approved multiple PRs for DatNT), not counted as a plan-hours dev this week.

**Part 2/3 — Task log actuals vs plan:** 🔴 Blocked — Workstream (project `fountain`) unreachable this run (see Sheets section above). Cannot verify actual hours against the plan this run.

**Trello board (Web Development, rick570 account):**
- Customer comments this window: 3, all from our team (rick570) to kunalsheth/tmmckay — 0 new customer-initiated comments.
- Active counts: todo 21, bugs 16, doing 4, qc_internal 9, qa_backlog 4, in_qa 1, done 990 (+ seasonal/notes/shelf).
- Stuck (5+ days) cards: 23, all pre-existing chronic backlog (oldest: "Fountain Pro- not uploading to shipstation" 133 days) — unchanged pattern, not new this window.
- Hard-to-release (14+ days in Doing): 0.

Trello: Fountain - DOCUMENT ⚠️ left incomplete (Part 2/3 unverified).

---

## Elena — 07:12 (+07:00)

**PRs (duongdn account):** 1 open PR — **#309** "Implement header and modal components with i18n support" (`process-digital-plant` → `nus/dp-20260811`), open since 2026-08-11. **`mergeable_state: dirty` — real merge conflict, cannot auto-merge.** CodeRabbit auto-review was skipped on this PR. https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/309

**Precognize (nusken account):** 0 open PRs from nusken.

**WordPress SamGuard (samguard.co):** Clean — 0 JS errors, 0 page errors, 0 CSP violations. Only benign GA/ads analytics `net::ERR_ABORTED` noise (expected, not flagged per standing rule).

Trello: Elena - SamGuard Digital Plant ⚠️ left incomplete (PR #309 conflict). Elena - WordPress SamGuard ✓ complete.

---

## Matrix — 07:26 (+07:00)

**Active rooms: 20 / 140 | Messages: 524** *(since 2026-08-18 08:49)*
Full details: reports/2026-08-19/matrix-rooms-0726.md
No ⚠️ action items auto-flagged for DuongDN this window (0 matches from the regex detector).

### Key updates

**Arthur - Meta-Stamp** — client approved 2 task estimates (3.5h total) + flagged a blocking issue (not urgent, but blocking client's next step). Team (namtv) committed to handling it "tomorrow" (= today 08-19) — not yet overdue as of this run. See Piece 13 below for full check.

**PHP Projects** — recurring device-connectivity issue investigation continues; DuongDN personally investigated overnight (confirmed no WAF blocking in AWS, no event reaching server for one device case). Ongoing, DuongDN already the owner of this thread.

**NUS Technology** — namtv paused Workstream briefly 09:27-09:41 on 08-18 for "sự cố" (incident) — resolved within minutes. Unrelated to the current multi-day SSO outage (that one is a login/SSO failure, this was a brief intentional pause).

**Delivery - Resource Arrangement** — leave/coverage updates for today (see header).

**Other (routine, no action needed):**
- Kunal - Fountain: normal dev/QC/PR-review traffic (see Fountain section).
- Celine - OhCleo: 280 msgs, PhucVT + team actively working Celine's task list (see OhCleo section).
- Elena - Active Alerts: internal team room (different from SamGuard client work) discussing test/deploy/Workstream-tagging — not client-facing, no action needed.
- Bailey - BA/QC, Bailey - Management, NUS - Bailey - Paturevision 2026: internal scheduling/scoping chatter, no blockers.
- Brad Ballantine - Auction warehouse: DuongDN flagged a customer message, phucvt confirmed checking it.
- Kevin Kung - Codeorange, Potential - Oliver - Plexar Shopify Move: light internal coordination, no action needed.
- 6 unnamed/small rooms (2-7 msgs each): routine, no flagged content.

---

## OhCleo Slack — 07:29 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 2 | Tony posted his daily report 10:46 (6 done items, 4 in-process — Startpage, About page, tags/preferences work). Celine responded 14:43 acknowledging with minor priority notes on 2 "To Do This Week" items (email links) — feedback, not a complaint, not yet re-confirmed by Tony as of window end |
| #events-code | — | `channel_not_found` — chronic, bot removed from channel (needs admin re-invite, not agent-fixable), unchanged from prior runs |

Tony daily report: present at 10:46 ✓.
Trello: Ohcleo ✓ complete.

---

## Performance — all — 07:31 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.93 | 1051ms | 2.31% (735/31858) — 94% benign NotAuthenticated/InvalidToken | — |
| MPFC | 0.60 | 850ms | 0.69% (206/29906) | — |
| Fountain | 0.98 | 132ms | 0.007% (3/42973) | — |
| InfinityRoses | 0.98 | 140ms | 0.024% (4/16513) | — |

**OhCleo topErrors:** NotAuthenticated 691×, InvalidToken 23×, AuthenticationFailed 5×, invalid bcrypt hash 4×, AuthenticationFailed (user not found) 4×, ValidationError (duplicate email/username) 4×+2×, ValidationError (no user found) 1×.
**OhCleo slowestTransactions:** `MediaByKeyView.get` **49.4s avg/539 calls** (Alert #7, worsening), `CreatorVerificationSubmitView.post` 16.3s/1, `HomeMediasView.get` 3.3s/680, `CreatorPayoutHistoryView.get` 1.7s/1, `MediaRecommendsView.get` 1.1s/793.

**MPFC topErrors:** `WP_Error::get_method()` fatal 170× (Alert #8, chronic), E_WARNING continue-targeting-switch 20×, E_COMPILE_ERROR ABSPATH include failures 3×, mysqli connection errors 2×+2×, `MM_Event` not found 2×, mkdir filename-too-long 1×.
**MPFC slowestTransactions:** `sitemap_index.xml` 37.0s/1, then 4 of the remaining top-5 are SQLi `WAITFOR DELAY '0:0:15'` scanner probes against `/search/` (12-13s each, matches injected delay — confirmed scanner noise, not real traffic).

**Fountain topErrors:** `ArgumentError` wrong-arg-count 3× (same tapering signature as prior reports).
**Fountain slowestTransactions:** `admin/product_catalogs/import_csv` **104.9s avg/4 calls** (Alert #9, new), `admin/credit_histories/index` 8.3s/1, `admin/promo_codes/index` 4.4s/1, `gifts/build_a_box_gift_variants` 1.8s/104, `admin/product_catalogs/update` 1.8s/51.

**Infinity topErrors:** `ArgumentError` wrong-arg-count 4×, `NoMethodError` (nil id) 1×.
**Infinity slowestTransactions:** `admin/gifts/edit` 3.3s/1, `admin/extra_items/create` 2.5s/2, `payment_intents/create` 1.5s/6, `users/registrations/create` 1.2s/1, `cart_items/create` 0.9s/12.

---

## Arthur / Meta-Stamp — 07:36 (+07:00)

4-part check, 2/4 sources verified this run (same partial-verification pattern as most recent runs):

1. **Communication (Matrix):** Business room — client approved 2 task estimates (3.5h) + flagged a non-urgent-but-blocking issue; team committed to address it today. Technical setup room: 0 new messages.
2. **Communication (Slack "Solid Code"):** ⚠️ Not verified — workspace still absent from this host's `config/.slack-accounts.json` (same recurring gap documented since 2026-07-13, this host has no David/Profile-15 browser session).
3. **Task tracking / hours (Workstream "Crystal lang"):** ⚠️ Not verified — same session-wide Workstream outage as Sheets/Fountain above.
4. **Code/PR status (GitHub `Christebob/Meta_Stamp_V3`, davidztv account):** 0 open PRs, 0 new commits since window start — clean.

No new unresolved client-facing question found (the open estimate/blocking-issue item is being actively handled, not stale). Per the established 2/4-source partial-verification precedent (matches prior runs when no new unresolved issue is found), `arthur_monitor.last_run` is advanced this run.

Trello: Arthur - Meta-Stamp ✓ complete.

---

## Upwork — 07:40 (+07:00)

**Neural Contract (workroom 38901192):** carrick's live-cookie extraction returned 0 cookies on all 4 attempts — this host has no `/home/nus` (confirmed: only `/home/mpfc`, `/home/mpfc-fpt` exist), so carrick's real Chrome Profile 1 session this script depends on does not exist here. Per standing rule, session/environment issues never block this item.

**Upwork Memo validation (Rory/Aysar, Piece 15):** 2 genuine attempts timed out (same missing-profile constraint as above). Memo validity not verified this run.

Trello: Neural Contract ✓ complete (session/environment issue, standing rule). Rory/Aysar Trello items are gated on Slack + Sheets per their own rules, not memo validity — see relevant sections above.

---

## WhatsApp / Zalo — 07:36 (+07:00)

Not available this run. This host (mpfc.mpfc.live) has no `/home/nus/chrome-monitor-data` — the persistent monitor-Chrome profile with the logged-in WhatsApp/Zalo sessions lives on a different machine. Attempted to start a fresh monitor Chrome here; it opened without any saved session (no WhatsApp/Zalo login), so no message content could be read. This is a genuine cross-host infrastructure gap (see [[project_mpfc_cron_server]]), not an auth failure fixable by retry from this host.

---

## Philip (MS Teams) — 07:41 (+07:00)

Not available this run — same missing-browser-profile constraint as WhatsApp/Zalo/Neural/Solid Code above; the check timed out without producing data.

Trello: Philip ⚠️ left incomplete (unverified).

---

## Trello — Check progress / Check mail — 07:42 (+07:00)

**Check mail:** 5/6 complete (DuongDn, Carrick, Kai, Ken, Nick ✓). Rick ⚠️ incomplete (Alerts #1-2). https://trello.com/c/6a84cf39ca067788ab3ed795

**Check progress:** 11/22 complete (James Diamond, Rory, MPFC, Marcel, Raymond, Neural Contract, Andrew Taraba, Colin, Ohcleo, Arthur - Meta-Stamp, Elena - WordPress SamGuard ✓).
⚠️ Incomplete: Maddy (Alert #4), John Yi (hours unverified), Aysar (hours unverified), Franc (Alert #5), Elliott (hours unverified), Elena - SamGuard Digital Plant (Alert #6/PR conflict), Bailey (Alert #10), Rebecca (hours unverified), Fountain - DOCUMENT (Part 2/3 unverified), Philip (unavailable this run), Blair Brown (hours unverified). https://trello.com/c/6a84c80d117d9988d9a2cc0c

---

## Unresolved questions

1. Workstream SSO outage has now recurred on essentially every run since 2026-08-03 (2+ weeks) — this needs investigation beyond another retry (browser-profile reset? Keycloak-side change?), since it's silently blocking hours verification across most of the portfolio every single day.
2. This execution host (mpfc.mpfc.live) has never had the `/home/nus` browser-profile data (WhatsApp/Zalo/Neural/Solid-Code/Philip) — worth confirming whether these pieces were ever expected to work from this specific cron host, or whether they need a different execution target.
3. Bailey/Paturevision TuanNT 0h on 2026-08-18 — needs a human check for whether there's an undocumented leave that day.
