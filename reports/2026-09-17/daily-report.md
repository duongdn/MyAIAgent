# Daily Report — 2026-09-17 (Thursday)

**Run:** 2026-09-17T05:14:00+07:00 (cron)
**Window:** 2026-09-16T05:00:00+07:00 → now
**Leave plan:** Chien Tran, TuanNT, LongVV all submitted leave requests (see duongdn@ email). VuTQ/ThinhT/HaVS Fountain team: TuanNTG (sick), ThinhPVD (sick, wedding-policy leave), TienPH (fever, covered by SamHT), HaVS (personal matter 09-21) — from "Delivery - Resource Arrangement" Matrix room.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets/Workstream (Piece 4) | Workstream SSO login failed 3x this run (all attempts: SSO redirect detected, Keycloak cookies alive, but API token never captured) — same recurring outage pattern documented in memory (5+ prior occurrences). Task-log hours for PhucVT/TuanNT/KhanhHH/LeNH/LongVV/Maddy/Fountain Parts 2-3/Elliott/Aysar gate NOT independently verified this run. |
| 2 | Upwork (Piece 15) | Rory + Aysar workroom sessions expired; headless re-login for carrick also failed (`input[name="login[username]"]` selector not found). Memo validity not checked this run — per standing rule this is a session failure, not an alert, but noting for recheck. |
| 3 | Elena PR #309 | "Implement header and modal components with i18n support" — `mergeable: false` (dirty/conflicts), no CodeRabbit review posted yet. Not merged. |
| 4 | MPFC Performance | Apdex 0.42 (poor) — chronic `WP_Error::get_method()` error (39x) + `"continue" targeting switch` warning (1720x) continue unresolved. Also 4 SQLi probe requests (`PG_SLEEP`/`WAITFOR DELAY`) on `/search/.../feed/rss2/` — same recurring pattern as prior reports, not new. |
| 5 | Email (rick@) | `[FirstProject] production` — 10 occurrences in 5 min of error #1117 + "100th Error occurrence" — production alert (FirstProject not explicitly in the Fountain/InfinityRose filter list but is a Rollbar production alert on rick@'s inbox, flagging for visibility). |

**Today (Thu 09-17):** Chien Tran, TuanNT, LongVV — leave requests pending/submitted (see email section). Fountain team: TuanNTG + ThinhPVD out sick 09-16 (internal time), TienPH fever (covered), HaVS out 09-21.

---

## Email — all — 05:20 (+07:00)

| Account | Emails | Calendar today |
|---------|--------|-----------------|
| duongdn@nustechnology.com | 3 | not fetched this run |
| carrick@nustechnology.com | 1 | not fetched this run |
| nick@nustechnology.com | 2 | not fetched this run |
| rick@nustechnology.com | 15 | not fetched this run |
| kai@nustechnology.com | 3 | not fetched this run |
| ken@nustechnology.com | 80 | not fetched this run |
| vuongtrancr@gmail.com | 7 | — |
| dnduongus@gmail.com | 22 | — |
| davidztv19@gmail.com | 1 | — |
| freelancer@mypersonalfootballcoach.com | 4 | — |

**duongdn@:** 3 leave requests — Chien Tran ("Re: Xin nghỉ phép"), TuanNT ("Đơn Xin Phép"), LongVV ("Đơn xin nghỉ phép ngày 17/09"). No alerts.

**carrick@:** 1 — Slack email-confirmation notice (noise). No alerts.

**nick@:** 2 — "BAILEY J. via Upwork sent you a message" x2 (Upwork inbox notification, not the John Yi filter target). No alert.

**rick@ (Fountain/InfinityRose production filter):** 15 msgs. Rollbar Daily Summaries for FountainGifts x2, InfinityRoses x2, FirstProject x2 (informational digests). BugSnag `[FountainStaging] Stripe::APIConnectionError` — staging, not production, no alert per filter rule. Rollbar `[FountainGifts] production - Resolved Error #314 Gibbon::MailChimpError` — already resolved. **`[FirstProject] production - 10 occurrences in 5 minutes: #1117` + "100th Error occurrence: #1117 IntegrationError"** — active production error spike, flagged in Alerts Summary (#5). Plus Zoho calendar reminder + several Anthropic/Claude.ai login-link notifications (personal, noise).

**kai@ (Madhuraka filter):** 3 — 2 JIRA mentions from Anoma Wasala (LIFM2-409), 1 from Madhuraka (LIFM2-465). Informational, no unaddressed blocker visible from subject lines alone.

**ken@ (Precognize filter):** 80 — all `[welligence/web]` GitHub dependency-bump / PR notifications (Dependabot-style chores + a couple of feature PRs). Normal repo noise, no alert.

**vuongtrancr@gmail.com (Swish monitoring):** 7 emails, not individually triaged this run (time-boxed) — no `[HIGH]`/`Signal lost` subject spotted in the subject list fetched.

**dnduongus@gmail.com (personal):** 22 emails — sampled subjects show LinkedIn/newsletter noise (IFTTT, n8n, SureCart, VCBS trade confirmation, Dragon Capital). No security-alert subjects found.

**davidztv19@gmail.com (Arthur/Meta-Stamp):** 1 — Basecamp (ResidentRadius) activity digest, unrelated 3rd-party client noise for that inbox owner, not Meta-Stamp specific.

**freelancer@mpfc:** 4 — Rollbar `[MPFC] production - 10 occurrences in 5 minutes: #50 WP_Error::get_method()` (chronic, matches Alert #4), MPFC Daily Summary, Cloudflare AI-crawler policy notice (noise), TestFlight build notice (noise).

Trello: Check mail — not completed this run (see Trello section; email piece done, Trello marking deferred to recheck to keep this pass moving through all 10 pieces within cron time budget).

---

## Slack — all 14 workspaces — 05:25 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 20 | Carrick's MPDM "Today's update" present (CSRF token fix deployed). Active `testing` channel: skjamie25 reported CSRF token mismatch, RTL language testing (26 langs), PR #711 fix requested "ASAP" — carrick responded, deployed to Nusdev. Aysar gate: MPDM update present ✓. |
| RDC - FM Monitoring | 6 | Automated "Tuner Access Log" entries only — no dev/customer content. |
| Swift Studio | 16 | Jeff built new version for liability-waiver bug; Rory/carrick coordinating account config + TestFlight release. Active back-and-forth, resolved in-thread. |
| Xtreme Soft Solutions | 10 | Kai + Anoma (Madhuraka's team) — account/access support messages ("unable to upload", "QR code not received"). Kai responsive same-day. |
| SAM GUARD - Mobile | 1 | HubSpot MQL auto-notification only. |
| GLOBAL GRAZING SERVICES | 7 | Nick posted "Today report" + "Yesterday Report" in #général (console/staging bugs). Payment thread: Joey released payment, away until Monday. Bailey/GGS report gate ✓. |
| Amazing Meds | 0 | No activity. |
| Generator | 0 | No activity. |
| LegalAtoms | 2 | Raymond: release tomorrow; questionnaire UX observation. Not clearly Nick-directed — informational. |
| MyPersonalFootballCoach | 2 | Personal Shopee links from freelancer account (noise, not project content). |
| William Bills | 0 | No activity. |
| Equanimity | 14 | Marcel/Carrick discussing tenant146 pairing-procedure payload issue + Upwork estimation-tracking process friction ("just don't want to keep tracking weekly, urgent stuff makes sense"). Ongoing process discussion, not a blocking alert. |
| SoCal Auto Wraps | 0 | Dropped, not tracked. |
| Aigile Dev | 2 | Automated blog-deploy notice + gaige-alerts (empty). |

Trello: workspace-level items deferred to recheck pass (see Trello section) — Workstream unavailable blocked the hours cross-check needed for Maddy/Aysar/Elliott gates this run.

---

## Discord — AirAgri + Bizurk — 05:30 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 30 | Vinn (dapackage): active PR work (#720, #721 ready for review), phone-alarm/callback integration discussion with iamjon7/bellatric02 — no formal "daily report" text but clear ongoing effort (not 0h). Jeff Trinh: posted daily report (Weather API/Dashboard integration, iOS submitted to App Store, Android in review) at 10:26 — present ✓. |
| Bizurk (nuscarrick) | 0 | No messages, no Andrew Taraba DMs. |

Trello: James Diamond/Vinn — no alert (Vinn had real activity, not 0-effort silence); Andrew Taraba — quiet, no alert. Marking deferred to recheck batch.

---

## Scrin.io (Nick @ John Yi company account — 2026-09-16)

0h — no sessions recorded. Not TuanNT evidence.

---

## Sheets / Workstream — 05:35 (+07:00)

🔴 **Workstream unavailable this run.** `workstream-login.js` was retried 3x (per SSO-transient-retry memory rule): each attempt showed "SSO redirect detected — Keycloak cookies alive" but the API token was never captured ("Browser attempt N: no token captured"). Confirmed the stored token is genuinely expired (`"exp" claim timestamp check failed` on a live API test). This matches the documented recurring Workstream SSO outage pattern (5+ prior occurrences in memory, root cause still open).

**Impact:** PhucVT, TuanNT, KhanhHH, LeNH, LongVV/Maddy hours NOT independently verified this run. No 0h claim is being made for any dev — per standing rule, a failed Workstream check is not evidence of a shortfall, it's an unverified data gap. Needs recheck (retry login, likely transient).

Cross-signal from Matrix (informational, not a substitute for hours verification): LongVV was actively coordinated by duongdn/namtv to pick up Maddy tasks after running out of OhCleo work (`!mYZBGNoLFVpMVIJtPu`, `!oGYjbzEfphvvauBZtq`); TuanNT + VuTQ posted detailed Bailey/Paturevision task reports in "NUS - Bailey - Paturevision 2026"; KhanhHH posted Upwork memo + client reply in "Rory Hackett - BXR App". None of this is a substitute for the hours check — all devs show signs of activity, no dev shows signs of a 0h day.

**Maddy JIRA weekly cross-check:** script run for week 2026-09-14, also hit the same Workstream auth failure (`"error":"Workstream auth failed...","tickets":[]`) — no ticket data returned this run. Needs recheck.

---

## Fountain — 05:38 (+07:00)

**Part 1 — Matrix plan:** Weekly-plan room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`) had 0 new messages in this window (not Monday — plan typically posted Mon 08:30-09:30, so this is expected). Using last known plan from prior report.

**Part 2 — Task log actuals:** Blocked by Workstream outage (see Sheets section above). Needs recheck.

**Part 3 — Plan vs actual:** Blocked — depends on Part 2.

**Trello board (customer comments / stuck cards):** Not queried this run (time-boxed given Workstream retries consumed budget) — needs recheck.

**Matrix activity (informational):** "Kunal - Fountain" room very active (124 msgs) — normal dev/QC coordination: PR reviews (Vu Tat), redmine bug triage (Dat Nguyen/Hung Pham), font-size/design discrepancies vs Kunal's mockups, price-mismatch investigation (prod vs beta shipping), FAQ/review-ticket work. No customer complaint or blocker spotted in the transcript.

---

## Elena — 05:40 (+07:00)

**Open PRs (duongdn account):** 1 — PR #309 "Implement header and modal components with i18n support" (`process-digital-plant`). `mergeable: false` (dirty — merge conflicts), no CodeRabbit review posted yet. **Not merged** — needs conflict resolution before it can proceed; flagged in Alerts Summary #3.

**Precognize (nusken account):** 0 open nusken PRs (7 open PRs total on Precognize/development, none authored by nusken).

**WordPress SamGuard:** Not run this pass (time-boxed) — needs recheck.

---

## Trello — 05:42 (+07:00)

**Check progress card:** fresh card for today, all items ○ (unchecked). **Check mail card:** fresh card, all 6 items ○.

Given Workstream was unavailable for a large part of this run (consuming significant time across 3 retry attempts), Trello checklist completion is **deferred to a recheck pass** rather than marking items complete on incomplete/unverified data — per standing rule, never complete an item without actually running its full mapped gate. Items with clean, fully-verified data this run (no gate dependency on Workstream):
- **Bailey** — Slack GGS ✓ (Nick's report present) + Matrix daily report to customer ✓ present ("NUS - Bailey - Paturevision 2026" room has detailed TuanNT/VuTQ task reports) — TuanNT sheet/hours check still pending (Workstream). Leave ○ for the hours half.
- **Franc** — Slack RDC only, no content beyond auto-logs → clean, safe to complete on recheck.
- **Rory / Swift** — Slack only, active coordination, no alert → clean.
- **Andrew Taraba** — Discord quiet → clean.
- **MPFC** — minimal Slack noise, no alert → clean.
- **James Diamond/Vinn** — Discord real activity, no alert → clean.

All others need the Workstream-gated hours check before completion — deferred.

## Ignore List — 05:42 (+07:00)
Not tracked (paused), auto-completed on recheck: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip.

---

## Reminders — 05:43 (+07:00)

Not run this pass — 0h determination depends on the Workstream/Sheets data that was unavailable this run. Deferred to recheck (no reminder sent, per print-only-by-default rule anyway).

---

## Matrix — 05:11 (+07:00)

**Active rooms: 18 / 145 | Messages: 511** *(since 2026-09-16 05:00 +07:00)*
Full details: reports/2026-09-17/matrix-rooms-0511.md

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| Delivery - Resource Arrangement | 11:52 | chientx: "Hi Kevin, This email confirms that Marcel F. changed the weekly limit for Dau D.'s contract biometric saas to 1 hours per week." — Upwork weekly-limit change notice, informational forward, no action needed from us directly. |
| Potential - PPV Form & Scoring Engine | 11:03 | anhnvn: "Như vậy next step thì: 1. A Dương tiếp tục hoàn thiện việc trả lời 14 câu trong doc yêu cầu nha..." — asks DuongDN to continue completing the 14-question RFP doc. ✅ Addressed same day — DuongDN posted `proposal-260915-ppv-rfp-response.html` + est on Google Sheet at 11:34. |

### Key updates

**Bailey/Paturevision — active bug-fix day:**
- TuanNT + VuTQ posted detailed task reports; DuongDN drove prioritization (2 Console redmine bugs first, then Grazing Software fixes).
- Grazing Software Filter branch clarified (separate from Desktop branch, built off `upgrade-prestashop`) — release likely slips to Monday since client (ổng) is away tomorrow.
- staging2.paturevision.fr reported down by datnc (17:09) — needs check on recheck pass.

**Fountain (Kunal) — high dev/QC volume, no blockers:**
- PR reviews, redmine bug triage, font/design mismatches vs Kunal's Figma mockups being resolved pragmatically.
- Price mismatch prod-vs-beta shipping investigated — traced to gift override, not a real bug.

**OhCleo (LongVV/Tony) — between tasks:**
- Ran out of OhCleo work (until Fri per Celine); DuongDN/namtv redirected him to Maddy backlog tasks (unapproved-by-client tasks tagged "làm trước report sau" for later billing).

**PPV Form & Scoring Engine (potential new client):** RFP-response doc completed and sent for review same day (see action item above).

**Other:**
- Elena/SamGuard Prestashop filter: internal debate on whether a feature needs retesting before go-live — resolved, proceeding to release.
- Rory Hackett/BXR: KhanhHH sent Upwork memo for review, deployed a CodeIgniter admin table feature, replied to a customer message.
- Recruitment: BDM candidate interviews in progress (2 candidates, one scheduled follow-up).
- Company-wide: health insurance card distributed; new Rails dev (PhongTB) welcomed.

---

## Performance — 05:45 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.96 | 125ms | 2.9% (549/19158) | 13.2/min |
| MPFC (live) | 0.42 (poor) | 1622ms | 1.6% (1839/113143) | 78.0/min |

**OhCleo top errors:** mostly benign `ValidationError` (duplicate username/email, invalid verification code) + 1 `Invalid bcrypt hash format` (single occurrence, low priority).
**OhCleo slowest transactions:** `CreatorPayoutHistoryView.get` 1958ms/2calls, `CancelSubscriptionView.post` 1048ms/1call, `ValidatePurchaseView.post` 997ms/2calls, `AppleLoginView.post` 777ms/32calls, `EmailVerificationView.post` 742ms/10calls — none exceed the 5s alert threshold.

**MPFC top errors:** `E_WARNING "continue" targeting switch is equivalent to "break"` 1720x (chronic, low severity), `Error: Call to undefined method WP_Error::get_method()` 39x (**chronic unresolved bug, months-old**), `count(): Parameter must be an array` 28x, deprecated-hook notices 17x, `Invalid argument supplied for foreach()` 17x, 2 plugin-related undefined-function errors (mega-addons-for-visual-composer, membermouse — low count).
**MPFC slowest transactions:** all in `/search/.../feed/rss2/` — includes 4 SQLi injection probe requests (`PG_SLEEP`, `WAITFOR DELAY`) at 32.2s/24.9s/21.8s/14.5s/12.4s avg — **same recurring SQLi-probe pattern from prior reports**, not new, these are external scanning attempts hitting the RSS search endpoint, not real slow queries.

Fountain/InfinityRoses New Relic not queried this run (time-boxed) — needs recheck.

---

## Arthur / Meta-Stamp

Not run this pass (Workstream-dependent est/actual part would be blocked anyway; full 6-source check deferred to recheck). Item is on the paused/Ignore List per 2026-09-09 directive regardless.

---

## Upwork Memo — 2026-09-16 — 05:50 (+07:00)

| Workroom | Status | Details |
|----------|--------|---------|
| Rory | login_failed | Live cookies + stored session + headless re-login all failed (`input[name="login[username]"]` selector not found — Upwork login page likely changed or CAPTCHA-blocked). Session failure ≠ alert per standing rule; memo validity unknown this run. |
| Neural Contract | session_expired | Same as above — messages-only workroom, no memos expected regardless. |
| Aysar | session_expired | Same session issue as Rory. |

Per rule: session/Cloudflare failures do not block Trello completion, but memo validity itself is genuinely unverified this run — note for recheck (carrick's live Chrome Upwork session may need a manual touch, see [[feedback_upwork_access_token_needs_live_browser_touch]]).

---

## WhatsApp / Zalo

Excluded from default full run (token-heavy) — not run this pass. Use `/daily-report whatsapp` or `/daily-report zalo` standalone if needed.

---

## Unresolved Questions

1. Workstream SSO — why did 3 consecutive login attempts all reach "Keycloak cookies alive" but never capture an API token? Needs investigation beyond a simple retry (browser flow may need env/display debugging).
2. Upwork carrick session — headless re-login failing on selector `input[name="login[username]"]` suggests Upwork's login page markup changed, or a CAPTCHA is now blocking it earlier than before. A live-browser touch (per [[feedback_upwork_access_token_needs_live_browser_touch]]) should be tried first.
3. staging2.paturevision.fr reported down by datnc (Matrix, 17:09) — needs a live check.
4. Elena PR #309 has merge conflicts (`dirty` state) — needs the branch rebased/conflicts resolved before it can be reviewed/merged.
5. FirstProject production error #1117 (10x in 5 min + 100th occurrence) on rick@'s Rollbar feed — FirstProject isn't in the documented Fountain/InfinityRose filter scope; confirm whether this project should be added to the regular monitoring list.

**Next step:** run `/daily-report recheck` once Workstream SSO is confirmed working again to complete the Sheets/Fountain-Parts-2-3/Maddy-JIRA/Trello-completion pieces that were blocked this run.
