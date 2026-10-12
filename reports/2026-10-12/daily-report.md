# Daily Report — 2026-10-12 (Monday)

**Run:** 2026-10-12T05:00:21+07:00 (cron), corrected 08:25 (+07:00) (recheck)
**Window:** 2026-10-09T08:26:25+07:00 → 2026-10-12 05:10 (+07:00). Task-log pieces use **Friday 2026-10-09 (last workday)**.
**Leave plan:** parse-leave-emails refreshed 05:01, and again 08:17: no upcoming approved leave. From Matrix: TienND sick Fri 10-09 afternoon (make-up time). PhucVT left 1h early Fri (dental, made up in the evening).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Slack Xtreme / JIRA (Maddy) | (a) **Madhuraka, Sun 10-11 11:52:** "I have some questions regarding 468… confirm whether they are issues or not? I would like to push this live today". His Codex-review comment on LIFM2-468 (04:51, "High — the bulk-result attribution fix depends on a Chrome extension change that is not in this branch…") is **unanswered**. (b) LongVV logged **4.5h of Kai-role work on Fri** (LIFM2-469 3h, LIFM2-470 1.5h), but there was **no Kai daily report** in Slack. (c) ~~LIFM2-469/470 are still To Do with **no estimate and no JIRA log**~~. Recheck 08:22: Kai did give estimates in JIRA comments (469 3h, agreed with Madhuraka 10-07; 470 1.5h). Those match the WS hours exactly, but the estimate field is still empty and no JIRA time is logged. LIFM2-468 has no estimate or log either. Context: on Fri evening you paused all Maddy actions (Madhuraka's spec-miss complaint), so someone still needs to decide who replies to Madhuraka. **Recheck 08:22: still no reply** in the Slack DM or on JIRA 468 (last comment is Madhuraka's 10-11 04:51 UTC). Bitbucket is unchanged (6 open, no new comments). → Maddy ○ |
| 2 | Slack RDC (Franc) | dmetiner, Sat 10-10 04:37, confirmed the preset fix works ✅, then raised a **new ask**: the API returns several frequencies within a radius (Sakarya 94.0 + Kocaeli 99.8, while another station broadcasts on 94.0 in Kocaeli). He asks: "Can we make a rule that we only add the closest one to the preset buttons?" This is **unanswered** (weekend). **Recheck 08:20: still no reply**, no holding reply and no thread reply. → Franc ○ |
| 3 | Performance (MPFC) | Apdex **0.32** (up from 0.02 on 10-09, still well below 0.7). Avg response 2.94s over 80,410 requests. `continue` E_WARNING ×760, WP_Error::get_method ×78, mysqli socket ×10 + DNS failure ×2, `get_header()` undefined ×6. New Rollbar #69 `WPO_Page_Cache::delete_cache()` undefined (10-09). DigitalOcean: **MySQL 8.0 managed DB reaches EOL Oct 30**. |
| 4 | Workstream needs review | OhCleo: LongVV 10-08 4h, 10-09 2h + 0.5h are Pending (reviewers **DuongDN, MinhTV**). Crystal lang: PhucVT 10-05 to 10-09 (8/6/3/2/2h) are Pending (reviewer **TienND**; Arthur is paused, listed for visibility). |
| 5 | Performance (OhCleo) | New error class `IntegrityError: null value in column "user_id" of relation "app_playhistory"` ×1. `AdminPayoutsView.get` took 5.1s (1 call, over the 5s threshold). Otherwise healthy (apdex 0.99). |
| 6 | Email (vuongtrancr@) | Swish New Relic "Signal lost… Low Application Throughput" active/closed ×12 over the weekend. One issue lasted 1591 min (~26h). Chronic since 10-06. |
| 7 | Email (carrick@) | GitLab definitive-guide `upgrade/phase4-es8` pipelines failed ×2. GitLab: **SSH key expires soon** (Carrick). |

**Resolved since 10-09 report:** ken@ email (stale plaintext config resynced from .enc, scanned OK). Andrew Taraba POS bugs (animeworld "it works" 10-10). KhanhHH 10-08 log. Maddy chientx action item (you replied Fri 21:57–22:01).

**Today (Mon Oct 12):** No approved leave on record. All present, as far as known.

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@... | 4 | — (HR residence-info request, Mentoring Report form receipt, Salesforce notices) | no events |
| carrick@... | 5 | #7 GitLab failed pipelines ×2, SSH key expiring. [DG] Reset Password. SoCal back online (Jetpack). | no events |
| nick@... | 0 | — | no events |
| rick@... | 80 | Kunal: "following up… going live with the test site by October 21st" (trinhmtt replied ✅). FirstProject prod Rollbar new #1126 IntegrationError, #1127 "Unable to render", plus bursts #1090/#1121/#127. Everything else is FountainStaging BugSnag (staging only) and daily summaries. | HEAL Meeting ×2, OmniGPT Daily Sync 10:30 |
| kai@... | 13 | Madhuraka merged PR #549 (LIFM2-467). **Madhuraka mentioned Kai on LIFM2-468 (Codex review) → #1**. Anoma: 468 "Testing ok". | no events |
| ken@... | 80 | Fixed: the plaintext app password was stale vs .enc and has been resynced. 14 Precognize/development PR notifications (SR-7797/7709/7835/7611/7879, none by nusken). The rest is welligence/amocc/playwright GitHub noise. | DE - Daily Standup ×2 |
| vuongtrancr@gmail.com | 17 | #6 Swish signal lost ×12. Delayed-newform daily summaries. | — |
| dnduongus@gmail.com | 59 | none (bank receipts, Grab, LinkedIn, newsletters). The Google "shared data with Claude / My VnExpress" emails are your own grants, not a breach. | — |
| davidztv19@gmail.com | 3 | Railway newsletter, Basecamp ResidentRadius digests | — |
| freelancer@mpfc | 7 | Rollbar new #69 WPO_Page_Cache::delete_cache (10-09). **DigitalOcean MySQL 8.0 EOL Oct 30** (#3). Daily summaries. | — |

Trello: DuongDn, Carrick, Nick, Rick, Kai, Ken ✓ complete. Check mail card done.

---

## Slack — all 14 workspaces — 05:03 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 49 | **Carrick MPDM daily reports present** (10-09 09:03 for 10-08; 17:33 for 10-09, #718 revoke free sub). skjamie25 retested and passed: verification link, Complete games, Revoke Free Sub. Jamie asked Aysar to review for release (19:00). notmedesign: new dark-mode spec pass. Aysar 10-12 04:28 assigned AI-toolbar issues to Carrick and explained the repo layout. |
| RDC - FM Monitoring | 23 | Carrick 17:13: preset fix deployed to Kocaeli, plus the weekly progress report. **dmetiner 10-10 04:37: confirmed the fix and raised a new "closest frequency only" rule ask, unanswered → #2**. MPX Recovery Failed SOS ×2 (bot). |
| Swift Studio | 21 | Jeff fixed the button-link issue and Rory said "please deploy" ✅. A new build was submitted. Rory asked for a call about Klaviyo, then "estimate time and cost for individual Klaviyo accounts?"; Jeff 17:03 replied "yes, we can do it" (holding reply, estimate due). Superchat access: Carrick offered help. |
| Xtreme Soft Solutions | 33 | Kai/Anoma (Fri): searched the quote-tool images and explained the luxeitfwd source. **Madhuraka Sun 11:52: 468 questions, wants to go live today, unanswered → #1**. Madhuraka 20:43: new `lif_staging_external_access` DB + `lif_readonly` user, do not delete. |
| SAM GUARD - Mobile | 5 | HubSpot MQL bot only. |
| Global Grazing Services (Bailey) | 2 | **Nick reports present**: 10-09 08:28 (yesterday, #101 split order) and 17:15 (#99 Auto Stock Refill). |
| Amazing Meds | — | invalid_auth. Cancelled (Ignore List), not refreshed. |
| Generator | 0 | No activity. |
| LegalAtoms | 9 | talha: Florida prod portal password changed. Raymond released v1.21/v1.22. Nothing addressed to Nick. |
| MyPersonalFootballCoach | 3 | freelancer shared the API docs (lead table done) with tien271/kwd2mj8hrv. |
| William Bills | 0 | Paused (Ignore List). |
| Equanimity | 4 | Komal 14:07: NRIC/FIN duplicate validation not working. Carrick: "OK let me check" (holding reply) and asked Marcel about a bonus. Marcel "Sure" (10-11), then "will do with the new work so just need to login once". Follow up Monday. |
| SoCal Auto Wraps | 0 | Dropped. |
| Aigile Dev | 3 | gaige alerts bot, newsletter (Colin paused). |

Trello: Rory, Aysar, MPFC, Marcel, Raymond ✓. Franc ○ (#2), Maddy ○ (#1).

---

## OhCleo Slack — 05:02 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 2 | Celine 10-09 17:33 (+07): "Link is updated with new design". **Tony daily report present 10-09 19:01 (+07)**: AI-assisted tag taxonomy, go-live re-tagging, cover art backup library. |
| #events-code | — | `channel_not_found` (chronic, bot removed from channel) |

Trello: Ohcleo ✓.

---

## Discord — airagri + bizurk — 05:01 (+07:00)

Tokens valid on both accounts.

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 23 | **Vinn daily report present** (10-09 10:46, contractor workflow review). **Jeff daily report present** (4h, Contractor App QR check-in + deep-link, PR Flutter_Contractor#7). dapackage pushed the colour/contrast fix to staging and reviewed Jeff's PR. jdiamond is working on location concepts over the weekend. |
| Bizurk (nuscarrick) | 0 + 20 DMs | Carrick delivered the Chip&Pin → Credit Card rename/reorder and reproduced the modal-close bug (Android Chrome shortcut reload). Snippet redeclare issue explained. **animeworld 10-10 00:23: "it works"** ✅ |

Trello: James Diamond ✓ (Vinn OK + LeNH 8h Fri). Andrew Taraba ✓.

---

## Sheets/Workstream — all devs — 05:06 (+07:00)

Reporting day: **Friday 2026-10-09 (last workday)**. Fetched via Keycloak API token refresh (no browser).

| Developer | Fri 10-09 (all WS projects) | Week | Status |
|-----------|------|------|--------|
| LeNH | **8h** James Diamond | 40h | ✓ OK |
| TuanNT | **8.5h** (Andrew Taraba 5 + Definitive Guide 2.75 + Speedventory 0.75) | 40h | ✓ → Bailey ✓ |
| KhanhHH | **8h** (Baamboozle 3.33 + RDC 2.67 + BXR 2) | 40h | ✓ → Aysar ✓ |
| PhucVT | 8h (Definitive Guide 6 + Crystal lang 2) | 40h | ✓ |
| LongVV | 7h (Maddy 4.5 + OhCleo 2.5) | 31h | Ad-hoc, informational |
| LuHX | 1h (BXR) | 5.67h | informational |
| DuongDN | 1h (Speedventory) | 2h | — |

**Workstream project rows (excl. Fountain):**

| Project | Dev hours Fri 10-09 | Reviewer(s) | Reviewer's charged hours | Review status |
|---------|------------------|-------------|------------|----------------|
| Maddy (Xtreme) | LongVV 4.5h (LIFM2-469/470) | — | — | need_review=false |
| James Diamond | LeNH 8h, AnhNH2 4h | PhucVT, LeNH | LeNH 8h (40h wk) | none pending |
| Baamboozle (Aysar) | KhanhHH 3.33h | — | — | need_review=false |
| Radio Data Center (Franc) | KhanhHH 2.67h | LeNH | 0h | none pending |
| BXR App (Rory) | KhanhHH 2h, LuHX 1h | — | — | need_review=false |
| Generator (Elliott) | — | HangNTT, LucNT | 0h | none pending (paused) |
| Colin/ETZ | — | LucNT | 0h | none pending (paused) |
| Speedventory (Bailey) | VyNL 6.25h, DuongDN 1h, TuanNT 0.75h, TrinhMTT 0.25h | — | — | need_review=false |
| Andrew Taraba | TuanNT 5h | — | — | need_review=false |
| Definitive Guide | PhucVT 6h, TuanNT 2.75h | — | — | need_review=false |
| Crystal lang (Arthur) | PhucVT 2h | TienND | 0h | **Pending** (PhucVT 10-05…10-09), #4 |
| OhCleo | LongVV 2.5h | DuongDN, MinhTV | 0h | **Pending** (LongVV 10-08, 10-09), #4 |
| Tokenlite (Marcel) / Family App | — | — | — | need_review=false |

Missing-report days flagged by WS for 10-09: Maddy, Crystal lang (informational; for Maddy see #1b).

---

## Maddy — W41 — 05:07 (+07:00)

### 1. Task Log Hours (Fri 10-09)
| Developer | Fri | Weekly total | Status |
|-----------|-----|--------------|--------|
| LongVV | 4.5h (LIFM2-469 3h, LIFM2-470 1.5h) | 6.5h (charged 4.5h) | Ad-hoc, informational, no hours alert |
| LuHX | 0 | 1h | informational |

### 2. Slack / Kai Daily Report Check
- WS Maddy hours on Fri: 4.5h, all Kai-role (JIRA-tagged, not WordPress), so the report check applies.
- Kai's only Slack activity on 10-09 is in the Anoma DM (quote-tool images, 09:05–13:59). **No daily report found** → #1b.
- **Madhuraka Sun 11:52, 468 questions, unanswered** → #1a. Recheck 08:22: still unanswered.
- Context: Fri 21:15 you told the team to pause all Maddy actions after Madhuraka's complaint that the bugs are spec misses. namtv: stop "work first, report later". The 2h of quote-tool work this week can't be charged (chientx).

### 3. JIRA (LIFM2, updated since window)
| Ticket | Summary | Status | Est | JIRA logged | Note |
|--------|---------|--------|-----|-------------|------|
| LIFM2-468 | Quoting Tool Issue | Testing - Anoma | — | — | ⚠️ no est / no log. Madhuraka Codex-review comment unanswered |
| LIFM2-469 | International Shipping Labels | To Do | ~~—~~ 3h (comment only, agreed 10-07) | — | ⚠️ 3h on WS. Estimate field empty, no JIRA log |
| LIFM2-470 | Custom percentage updates | To Do | ~~—~~ 1.5h (comment only, 10-06) | — | ⚠️ 1.5h on WS. Estimate field empty, no JIRA log |
| LIFM2-464 | Invalidate Proceed buttons | Ready to deploy | 4h | 4h | ✅ |
| LIFM2-467 | In-Home Quote Form | Ready to deploy | 2h | 2.5h | ✅ (PR #549 merged) |
| LIFM2-459 | Listed - buy tab issue | Done | 1.5h | 2h | ✅ (slightly over) |
| LIFM2-462 / 455 | New Buy List Price / Refresh Issue | Done | 2h / 1.5h | 2h / 1.5h | ✅ |

`maddy-jira-tasklog-check.js` was not run because its sheet source is stale (memory). The live JIRA check above replaces it.

### 4. Bitbucket PR Status (`xtreme-web/rms`, 6 open)
#548 (LIFM2-468, 1 comment, upd 10-08). #540 LIFM2-450 (0). #481 LIFM2-409 (2, waiting on customer, not our blocker per memory). #544 LIFM2-465 (0). #534 (1). #509 LIFM2-428 (4). #549 merged 10-10. No new comments since 10-08.

Trello: Maddy ⚠️ skipped (#1).

---

## Fountain — 05:08 (+07:00)

**Part 1 — Matrix Plan:** (Recheck 08:21: not posted yet. Due by 09:30, so this is not flagged.) Latest is still trinhmtt 2026-10-05 09:49: "ViTHT: 40h DatNT: 40h ThinhT: 20h => QC 25h". This week's plan is not posted yet; Monday's post is expected 08:30–09:30, so this is not flagged. namtv's Delivery plan for week 12/10: DatNT on part Kunal + WorkTalent.

**Part 2 — Task Log Actuals (Workstream, week 10-05, full week incl. Fri 10-09):** DatNT 40h (8 Fri). ViTHT **40h** (backfilled, was 4h on Thu's report). ThinhT 20h. VuTQ 18h. QC: PhatDLT 13.5h + HungPN 25.5h = 39h. TrinhMTT 13.5h (not QC, excluded).

**Part 3 — Plan vs Actual (full week):**

| Dev | Plan | Actual | Result |
|-----|------|--------|--------|
| DatNT | 40h | 40h | ✓ met |
| ViTHT | 40h | 40h | ✓ met (10-08 gap was unlogged time, now filled) |
| ThinhT | 20h | 20h | ✓ met |
| QC (PhatDLT+HungPN) | 25h | 39h | over plan +14h (informational) |
| VuTQ | — | 18h | not in plan |

**Part 4 — Capacity & Runway** (Est vs Charged, 102 rows, re-read live): Est 1529.25 / CR 133.5 / Actual 1557.25. Narrow **229.0h**, broad **328.5h**. Unchanged vs 10-09.

**Part 5 — Over-estimate:** 37 rows over 120%, unchanged. Top: #2627 0.5→8.25h (+1550%), #2615 12→106.75h (+790%), #2639 2→16.5h (+725%), #2545 1→7.5h, #2630 0.5→3.75h, #2613 2→14.5h.

**Trello board (comments since 10-09 05:30):** rick570 and kunalsheth discussed the deleted engraving test product ✅. Reviews block: rick570 explained the hiding logic. **kunalsheth 21:11: "go ahead and put #554 live, even though the reviews block stays hidden"**. That is an instruction to act on Monday, not an open question. rick570 asked Kunal to look at PR #547 comments (our ask, waiting on him). Kunal's email asks for the **test-site go-live on Oct 21** (originally Oct 28). trinhmtt replied, and the team is concerned about QC capacity (Matrix). Counts: To-Do 15, Bugs 26, Doing 3, QC Internal 6, QA Backlog 7, In QA 1.

**Perf:** `build_a_box_gift_variants` 10.7s avg over 205 calls (improved from 15.5s). Error rate ~0%.

Trello: Fountain ✓ (all 5 parts checked, no unanswered customer comment). Action today: deploy #554.

---

## Elena - WordPress SamGuard — 05:07 (+07:00)

`https://www.samguard.co/`: status 200, 0 JS errors, 0 page errors, 0 CSP violations, 7 benign analytics `failedRequests`. Clean.

Trello: Elena - WordPress SamGuard ✓.

---

## Matrix — 05:01 (+07:00)

**Active rooms: 31 / 150 | Messages: 413** *(since 2026-10-09 08:26)*
Full details: reports/2026-10-12/matrix-rooms-0501.md

The script flagged one action item, and it was already handled: chientx 21:49 "Mấy bug này dạng nào vậy a Dương?…". You replied 21:57–22:01 and paused Maddy tasks ✅.

### Key updates

**Maddy, quality complaint:** Madhuraka absorbs 2h of investigation and says the reported issues are spec misses, not edge cases. You paused all Maddy actions, and namtv ended "work first, report later". The 2h this week can't be charged.

**BXR/Rory, Klaviyo:** Rory wants a call about multi-location Klaviyo. The team says mobile already did custom fields and one account is feasible. minhtv: hold all Klaviyo work, because Rory's bosses want 2 accounts and Rory wants 1. Rory asked Jeff for an estimate for separate accounts.

**Fountain:** Kunal is pushing the ~200-PR go-live to Oct 21. VuTQ is targeting Security + Staff App PRs for Wed. Dev/QC say testing can't keep up.

**Elena OP:** FE/BE action-item feedback shared, and all devs must review. Weekly code review agreed.

**Other:**
- Bailey: waiting on the client's CR approval, so TuanNT moved to James. Payment reminder ($555) next week.
- TuanNT: mis-logged James 2h moved to Andrew ✅.
- Lyf: PR #550 to prod, extra hours summarized, unpaid reminder.
- Arthur: ~2h estimate for keymap/ai endpoints.
- Resource: TienND sick Fri pm. PhucVT left 1h early Fri.

---

## Performance — 05:07 (+07:00)

Window: since 2026-10-09 05:30 (+07:00), covering the weekend.

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.99 | 113ms | 2.3% (1735/76759), ~95% benign NotAuthenticated/InvalidToken | 17.9/min |
| MPFC | **0.32** 🔴 | 2939ms | 1.1% (874/80410) | 18.7/min |
| Fountain | 0.99 | 106ms | ~0% (2/132576) | 30.9/min |
| InfinityRoses | 0.99 | 122ms | 0.02% (8/42657) | 9.9/min |

**OhCleo errors:** NotAuthenticated 1574, InvalidToken 58, ValidationError dup email 29 / dup username 12 / both 7 / no user 3, AuthFailed "User does not exist" 28, "Passwords don't match" 8, ValueError invalid bcrypt hash 5, **IntegrityError app_playhistory user_id null 1 (new)**.
**OhCleo slow:** **AdminPayoutsView.get 5.12s/1**, ChatSendView.post 2.87s/47, CreatorVerificationSubmitView 1.97s/1, CreatorPayoutHistoryView 1.62s/5, ValidatePurchaseView 1.25s/6.

**MPFC errors:** `continue` E_WARNING 760, WP_Error::get_method() 78, mysqli no socket 10, mkdir name too long 9, undefined get_header() 6, count() non-countable 3, mysqli DNS failure 2, ABSPATH require compile errors ×3.
**MPFC slow:** search/-1%25… 370.6s/1, search/feed/rss2 172.0s/1, the-lewis-skelly-fake-drill 78.1s/1, search/-5%25… 72.8s/1, **video/mudryk-drive-and-double-step 72.1s/1**. Scanner-style search URLs plus real pages → #3.

**Fountain errors:** InvalidAuthenticityToken 1, ArgumentError 1. **Slow:** build_a_box_gift_variants 10.7s/205, admin/gifts/import_csv 10.3s/4, admin/credit_histories/index 9.5s/1, admin/promo_codes/index 4.2s/2, paypals/authorize_order 3.0s/11.

**Infinity errors:** ArgumentError 4, UnknownFormat 3, InvalidForeignKey (extra_items) 1. **Slow:** paypals/authorize_order 2.6s/1, payment_intents/create 1.8s/16, ShipStationShipmentWorker 1.7s/3, registrations/create 1.6s/6, search 1.3s/90. Healthy.

Not gated by Trello.

---

## Upwork Memo — 2026-10-09 — 05:09 (+07:00)

| Workroom | Result |
|----------|--------|
| Rory | ~~Not verified: Cloudflare challenge from this host~~. Recheck 08:23, run locally headless: auth OK, but the timesheet only shows the current week (10-12), so Fri 10-09 wasn't found (`dom_fallback_day_label_not_found`) and the memo status is still unverified. Script limitation: it can't navigate to the previous week. |
| Aysar | Same as Rory at recheck: auth OK, but the Fri row isn't in the displayed week, so this is unverified. ~~Not verified: carrick live cookies not available on this host.~~ You already gave KhanhHH memo feedback Fri 16:26 about the #718 memo wording (10-08/10-09). |
| Tokenlite | ~~Not verified: Cloudflare challenge~~ Same as above: auth OK, Fri not in the displayed week. |

Per the session-failure rule this is not an alert and not a memo status. Manual re-run from local (carrick Chrome Profile 1): `node scripts/upwork-memo-check.js --date=2026-10-09`. Neural messages couldn't be read for the same reason (`upwork-neural-check.js`, 4 attempts), so Neural ✓ per rule.

---

## Scrin.io — 05:01 (+07:00)

**Scrin.io (Nick @ John Yi company account, Fri 2026-10-09):** 0h, no sessions recorded. Expected, since John Yi was cancelled 09-28. Not TuanNT evidence.

---

## Reminders — 05:09 (+07:00)

- No reminders needed. LeNH 8h, TuanNT 8.5h, KhanhHH 8h, PhucVT 8h on Fri 10-09. LongVV is ad-hoc. Nothing sent.

---

## Ignore List — 05:09 (+07:00)

Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds, Rebecca (William Bills), Elliott

---

## Trello — Check progress / Check mail — 05:09 (+07:00)

**Check mail:** 6/6 ✓, card done.

**Check progress: 20/22** (card `6acbf92b`, today's)
- ✓ complete: John Yi (ignore), James Diamond, Rory, Aysar, Elliott (ignore), MPFC, Marcel, Elena-SamGuard (ignore), Raymond, Neural Contract, Bailey, Andrew Taraba, Rebecca (ignore), Colin (ignore), Fountain, Philip (ignore), Ohcleo, Arthur (ignore), Blair Brown (ignore), Elena-WordPress-SamGuard.
- ○ incomplete: **Maddy** (#1), **Franc** (#2). Recheck 08:25: both still have open customer asks (re-verified live), so they stay ○.

Live card re-fetched after writes. Note: an older Check progress card `6ac955d6` (created Sat 10-10) is still open with all items incomplete. It was left untouched.

---

## Not run this pass

- Arthur 6-source check, Elena PRs/deploy/Precognize, Philip MS Teams: paused (Ignore List).
- WhatsApp/Zalo: excluded by default.

## Unresolved Questions

1. Maddy is paused. Who replies to Madhuraka's 468 questions (he wanted to go live Sunday), and should LongVV's Fri 4.5h on LIFM2-469/470 (no estimate) be charged?
2. Franc: will Carrick answer dmetiner's "closest frequency only" rule ask today (estimate or approach)?
3. MPFC apdex is still 0.32 after 5 days, and MySQL 8.0 managed DB EOL is Oct 30. Who owns the server check and the DB upgrade?
4. Fountain: is the team committing to Kunal's Oct 21 go-live? QC says capacity is short.
5. The older open Check progress card from 10-10: archive it?
6. Upwork memo script can't check the previous week's days when run on a Monday (Fri 10-09 isn't found). Should I fix it to navigate to the previous week?
