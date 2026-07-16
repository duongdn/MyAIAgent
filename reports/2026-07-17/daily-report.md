# Daily Report — 2026-07-17 (Friday)

**Run:** 2026-07-17T06:05:00+07:00 (cron)
**Window:** 2026-07-15T09:00:00+07:00 → 2026-07-17T06:47:00+07:00
**Leave plan today:** LongVV (AM, medical checkup, James Diamond, no makeup), TuanNTG (cold, Elena, no makeup), daidv (off, no training done yet), DuongDN (self-noted off today+yesterday)

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Elena WordPress (samguard.co) | **Site unreachable** — TCP port 443/80 open but HTTP requests time out (60s+, confirmed via curl + headless browser, twice). Real production outage, not a credential/tooling issue. |
| 2 | GitHub API | Partially Degraded Service (confirmed via githubstatus.com) — authenticated calls return 503 across duongdn/nusken tokens (tokens themselves valid, unauth + `/rate_limit` calls succeed). Blocked: Elena PR/deploy check, Precognize PR check, Arthur GitHub check. |
| 3 | Workstream | SSO login unavailable this run — 3 attempts (direct + embedded in sheets scan), browser opens and clicks "Sign in with SSO" but never completes non-interactively; needs a human at the keyboard. Blocked: full Sheets cross-check for LongVV/PhucVT/TuanNT/KhanhHH/LeNH, Fountain Part 2/3 (task log actuals), Arthur Crystal-lang hours, Blair Brown, Maddy JIRA weekly check (also hit a known stale-sheet bug independent of this). |
| 4 | rick@ (Fountain/FirstProject) | Production errors: FirstProject `IntegrationError` #1075, FirstProject `TypeError: Failed to fetch` #895, FountainGifts production `Stripe::InvalidRequestError` #275. Plus many FountainStaging BugSnag errors (staging, lower severity, ~15 occurrences over 2 days). |
| 5 | vuongtrancr@gmail.com (Swish) | New Relic "Signal lost for 10 minutes on Low Application Throughput" fired 6x over 2 days + 1 "Metric deviated from baseline" x2 + 1 "Critical security alert" on the account itself (worth a quick manual glance). |
| 6 | Performance — MPFC | Apdex 0.47 (poor, down from 0.51). Real bug: `Call to undefined method JSON_API_User_controller::error()` x190. Very slow custom pages: sitemap_index.xml 58.5s (2 calls), 3 video pages 37-40s each. |
| 7 | Performance — OhCleo | `MediaByKeyView.get` averaging 9.9s over 629 calls (persistent, seen in prior runs too) + 1 outlier `MediaAddTrackAPIView.post` at 117.6s (1 call). |
| 8 | Bailey (TuanNT) | 0h logged in Paturevision sheet (sole source for Bailey) both 15/07 and 16/07, no leave note. Already caught live by DuongDN in Matrix "Bailey - BA/QC" room 15/07 ("vẫn chưa có task cho TuanNT... remind bạn điền task log") — datnc following up, still unresolved as of this run. Cannot cross-check his other 4 Workstream-tracked sheets this run (Workstream down). |
| 9 | Fountain Trello | "Fountain & Infinity - Add Subtle Scroll Animations" stuck in **Doing** list 86.4 days (hard-to-release threshold is 14 days). |
| 10 | Philip (MS Teams) | Blocked by Microsoft "unusual activity" security wall again (same as prior runs) — using last-known state: no customer reply since Jul 1/6. |
| 11 | Upwork (Neural/Rory/Aysar workrooms) | Session expired, headless re-login failed, visible-browser retry hit CAPTCHA/2FA wall requiring a human — per policy this is a session failure, not an alert; items completed on Trello anyway. |
| 12 | Arthur — Solid Code Slack | `invalid_auth`. Attempted the documented cookie re-extraction fix (David's Chrome Profile 15) — this sandbox's environment has drifted (home dir is now `/home/mpfc` not `/home/nus`, only "Profile 19" exists, no saved Slack cookie in it). Needs a fresh manual login to fix, not fixable from here this run. |

**Today (Fri 17/07):** LongVV off AM (medical), TuanNTG sick (cold), daidv off (no training yet), DuongDN self-noted off today + yesterday.

---

## Email — all — 06:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 6 | 5 Redmine bug-closed notices (Maddy/Xtreme, FYI only, already closed) | no events |
| carrick@nustechnology.com | 7 | 1 Snyk vulnerability alert (marcel org, FYI) | no events |
| nick@nustechnology.com | 26 | 0 real (Azure DevOps PR noise, unrelated to John Yi) | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 46 | 36 — see ALERTS #4, many Fountain/FirstProject prod+staging errors | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| kai@nustechnology.com | 15 | 9 Madhuraka JIRA mentions (informational, normal client activity) | no events |
| ken@nustechnology.com | 80 | 5 (unrelated GitHub repo notifications + Sentry workshop invite, not Precognize) | 08:30 DE Daily Standup (x2 duplicate entries) |
| vuongtrancr@gmail.com | 17 | 14 — see ALERTS #5 | — |
| dnduongus@gmail.com | 52 | 0 (LinkedIn/Careerviet/bank noise, ignored per filter; one "Security alert for htt.thuyhoang@gmail.com" is a different account, not his own) | — |
| davidztv19@gmail.com | 1 | 0 | — |
| freelancer@mypersonalfootballcoach.com | 2 | 0 (New Relic changelog newsletter only) | — |

Trello: DuongDn, Carrick, Nick, Rick, Kai, Ken items ✓ complete (Check mail card auto-closed, 6/6).

---

## Slack — all — 06:20 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|--------------|
| Baamboozle | 25 | Normal QC/dev activity (AI toolbar bug fix, subscription discount testing, profanity filter change). Aysar MPDM "Today's update" present 16/07 21:46. |
| RDC - FM Monitoring | 17 | dmetiner away till end of month, handed off to Kovács Benedek — carrick already responding to him with technical reports. Tuner access/reboot logs, no issues. |
| Swift Studio | 0 | — |
| Xtreme Soft Solutions | 3 | Kai posted progress both 15/07 and 16/07 (LIFM2-451/428/450/409/456/455). |
| SAM GUARD - Mobile | 8 | All HubSpot MQL lead-notification spam, no Elena/DP-specific content. |
| Global Grazing Services | 3 | Nick posted daily report for 17/07 at 02:08+07 (in #maintenance) — WARNING noted for recurring nightly EC2 memory spike (self-resolving, known). 2 unrelated amy messages on barcode/payment channels. |
| Amazing Meds | 0 | Session token was `invalid_auth` — root cause: cookie needs to be sent **raw, not URL-encoded** (differs from OhCleo's cookie, which does need encoding). Fixed and re-verified live (auth.test OK). 0 messages, normal. |
| Generator | 0 | — |
| LegalAtoms | 0 | — |
| MyPersonalFootballCoach | 0 | — |
| William Bills | 0 | — |
| Equanimity | 0 | Same cookie-encoding fix as Amazing Meds applied and verified. 0 messages. |
| SoCal Auto Wraps | 0 | — |
| Aigile Dev | 2 | Blog posts merged/deploying to staging (routine). |
| OhCleo | see below | — |

Trello: Rory, Franc, Aysar, Elliott, MPFC, Marcel, Raymond, Colin ✓ complete. John Yi, Bailey, Rebecca, Elena-SamGuard stay open (see ALERTS/Sheets).

---

## Discord — all — 06:25 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 72 | Active dev discussion (checkin/checkout automation, spray-job form fields). Jeff posted daily reports both 15/07 and 16/07. Vinn actively answering questions same-day (one question at 13:43+07 16/07 answered by .jdiamond within 20 min). |
| Bizurk (nuscarrick) | 0 | Token valid, genuinely quiet, 0 Andrew Taraba DMs. |

Trello: James Diamond, Andrew Taraba ✓ complete.

---

## Scrin.io — 06:26 (+07:00)

**Scrin.io (TuanNT / John Yi — 2026-07-16):** 8h10m logged (6 sessions), all under "No project"/"No client" tags as usual.

---

## Sheets — all developers — 06:50 (+07:00)

🔴 **Workstream unavailable this run** (see ALERTS #3) — this is now the primary source for every project except Bailey, so this section is Sheets-only and incomplete for anyone whose real hours live in Workstream.

13-sheet scan (owner-name match) for 2026-07-16:

| Developer | Sheets total | Status |
|-----------|--------------|--------|
| LongVV | 0h | Workstream unverified. Not flagged — LongVV has scheduled AM leave today (17/07) but 16/07 status genuinely unknown without Workstream. |
| PhucVT | 0h | Explained — confirmed sick leave 16/07 (Matrix: Ons project, no makeup expected). Not an alert. |
| TuanNT | 0h (incl. Bailey/Paturevision, the one sheet-primary source) | See ALERTS #8 — already flagged live by DuongDN in Matrix, being followed up. |
| KhanhHH | 0h | Workstream unverified. Was reminded 15/07 for a separate 1.5h shortfall on 14/07 (already resolved via direct chat, see Matrix). |
| LeNH | 0h | Workstream unverified. |

**No reminders sent this run** — Sheets showing 0h across the board for every dev is expected now (most work has migrated to Workstream), and sending "0h logged" messages off Sheets-only data when Workstream (the real primary source) is down risks a false alarm per repeated past incidents. Recommend a manual Workstream login + rerun of the Sheets/Workstream check once someone is at the keyboard.

**Maddy JIRA weekly cross-check:** returned "No ticket entries" — this is the known stale-sheet bug (script reads an abandoned Sheet, not live Workstream), not a real finding. Needs Workstream access to run for real.

---

## Fountain — 06:52 (+07:00)

**Part 1 — Matrix plan** (posted @trinhmtt 2026-07-14 09:28, edited, in `!EWnVDAxbTGsBxPkaaI`):
```
DatNT: 36h
VuTQ: 5h
ViTHT: 40h
ThinhT: 12h
=> QC: 23.25h
```

**Part 2/3 — Task log actuals / plan vs actual:** unavailable this run. Workstream (primary source, project `fountain`) is down; the fallback Google Sheet (`W35` tab) is now completely empty for every dev — confirms the project has fully migrated off Sheets, so this fallback no longer works. Needs Workstream access to produce real numbers.

**Trello board (Web Development):**
- 8 new customer comments this window (kunalsheth x2, tmmckay x6). 2 got direct replies from rick570 within ~18h (RestClient::InternalServerError order question, Missing Skip Step card). 3 more (Infinity Account and Auth, Infinity Item Extras, Order flow Message/Recipient/Delivery) were rejected via the board's "Not passed" QA-rework flow and are being actively reworked (card movements confirm), but no text reply was posted back to the customer — normal board workflow, not silence, but worth a mention.
- Active counts: To-Do 28, Bugs 16, Doing 7, QC Internal 6, QA Backlog 2.
- ⚠️ Hard-to-release: "Fountain & Infinity - Add Subtle Scroll Animations" — 86.4 days in Doing (threshold 14d). See ALERTS #9.

Trello: Fountain item stays ⚠️ open (missing Part 2/3 + hard-to-release flag).

---

## Elena — 06:55 (+07:00)

- **PRs/deploy:** blocked by GitHub API degradation (ALERTS #2) — could not check/merge PRs on `Elena-SamGuard-Digital-Plant`.
- **Precognize (nusken):** same GitHub outage — could not check.
- **WordPress (samguard.co):** 🔴 site unreachable, see ALERTS #1 — this is the headline finding this run.
- **Slack (samguard workspace):** only HubSpot lead-notification noise this window, no Elena/DP-specific activity to report.

Trello: Elena - SamGuard Digital Plant + Elena - WordPress SamGuard stay ⚠️ open.

---

## Matrix — 06:17 (+07:00)

**Active rooms: 24 / 132 | Messages: 744** *(since 2026-07-15 09:00)*
Full details: reports/2026-07-17/matrix-rooms-0617.md

### Key updates

**Leave plan:** LongVV off AM today (medical, James Diamond, no makeup); PhucVT/ThinhLD/PhongTB sick 16/07 (no makeup where applicable); TienT sick PM 16/07 (KhoaTD covering); TuanNTG cold today (Elena, no makeup); daidv + DuongDN both off yesterday+today.

**KhanhHH — reminder already handled:** DuongDN personally caught and reminded her 15/07 09:08 for a 1.5h shortfall on 14/07 (Elena); she confirmed she'd add the missing tasks. No further action needed.

**LongVV — Maddy hours correction:** DuongDN caught LongVV under-logging Maddy hours 15/07 (4h missing); LongVV corrected same day.

**Bailey - BA/QC:** DuongDN flagged TuanNT has no dedicated task and is only doing a Rails upgrade — asked datnc to remind him to log his task log. Still unresolved as of 16/07 sheet data (see ALERTS #8).

**Kunal - Fountain (218 msgs):** heavy PR review cycle on card #2869 (order flow), team plan is to push live then have Thomas verify on production. vitht lost "Rick's Claude account" access again — delegated to Nam, low urgency.

**Elena - Active Alerts (252 msgs, internal Precognize/SamGuard dev channel):** normal active dev/QC cycle on bulk-action logic + an evidence-attach API bug, being triaged same-day. No client-facing blocker.

**Other:** Maddy PR-merge cadence question resolved (LongVV explained normal workflow, not a backlog). Elena QC candidate hire pushed back ~2 weeks. New client kickoff (Relay Vault/Courtney Guertin). No unanswered customer asks or unresolved DuongDN action items found beyond what's listed above.

---

## OhCleo Slack — 06:30 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 1 | Tony (LongVV) reminded Celine the app work is paused until she's back from vacation — no reply expected/needed. |
| #events-code | — | `channel_not_found` (confirmed archived/deleted upstream, not an auth issue — auth.test OK). |

Tony's status: no formal "daily report" text this window, but he's confirmed as full-time on OhCleo per standing note and the one message shows active engagement, not absence.

Trello: Ohcleo ✓ complete.

---

## Arthur - Meta-Stamp — 06:35 (+07:00)

Full report: reports/2026-07-17/0617-arthur-monitor.md

Only 2/6 sources verified this run (both Matrix rooms) — Solid Code Slack (`invalid_auth`, cookie fix script broken in this sandbox), GitHub, and Workstream all unavailable (see ALERTS #2/#3/#12). Key finding from Matrix: Nam confirmed Arthur will do "P2" work (Phúc assigned), billing split by client noted with finance; team found and self-resolved a wrong production URL Chris sent; 4 questions queued to ask Arthur/Chris (URL confirm, 13/14 tracks uploaded, API key used on a 403 error, Casey's account type). No investor-demo funding result yet (pending 3 days).

Trello: Arthur - Meta-Stamp stays ⚠️ open (partial check only).

---

## Performance — all — 06:40 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|---------------|------------|------------|
| OhCleo (prod) | 0.95 | 320ms | 2.5% (1208/48120) — 93% NotAuthenticated (benign) | 17.7/min |
| MPFC | **0.47 (poor)** | 1661ms | 0.58% (476/82597) | 30.4/min |
| Fountain Gifts | 0.98 | 147ms | 0.005% (4/82999) | 30.5/min |
| InfinityRoses | 0.98 | 152ms | 0% (0/30458) | 11.2/min |

**OhCleo — top errors:**
| Error | Count |
|-------|-------|
| rest_framework.exceptions:NotAuthenticated | 1124 |
| rest_framework_simplejwt.exceptions:InvalidToken | 31 |
| rest_framework.exceptions:AuthenticationFailed (User does not exist) | 15 |
| ValidationError (email exists) | 11 |
| ValidationError (email+username exist) | 9 |
| AuthenticationFailed (Passwords don't match) | 6 |
| ValidationError (username exists) | 5 |
| IntegrityError (app_playhistory null user_id) | 3 |

**OhCleo — slowest transactions:**
| Endpoint | Avg ms | Calls |
|----------|--------|-------|
| MediaAddTrackAPIView.post | 117614 | 1 |
| MediaByKeyView.get | 9933 | 629 |
| HomeMediasView.get | 1900 | 846 |
| ValidatePurchaseView.post | 1195 | 8 |
| MediaRecommendsView.get | 1093 | 1439 |

**MPFC — top errors:**
| Error | Count |
|-------|-------|
| E_WARNING "continue" targeting switch | 274 |
| Call to undefined method JSON_API_User_controller::error() | 190 |
| E_COMPILE_ERROR legacy-widget.php missing | 4 |
| mysqli_real_connect (2x, DNS/socket) | 4 |
| require_once class-wpdb.php missing | 1 |
| get_header() undefined (404.php) | 1 |
| get_header() undefined (index.php) | 1 |
| MM_Event class not found | 1 |

**MPFC — slowest transactions:**
| Endpoint | Avg ms | Calls |
|----------|--------|-------|
| sitemap_index.xml | 58531 | 2 |
| video/dinamo-zagreb-u13-1v1v2-practice | 40656 | 7 |
| author-sitemap.xml | 39976 | 1 |
| video/dinamo-b-team-rondo_pressing-warm | 37707 | 8 |
| video/dinamo-u15-1v1-practice | 37163 | 8 |

**Fountain — top errors:** Stripe::InvalidRequestError (nil PaymentMethod ID) x2, ActionController::UnknownFormat x1, RestClient ReadTimeout x1.
**Fountain — slowest:** Controller/gifts/all 6873ms/8 calls, paypals/authorize_order 4372ms, admin/product_catalogs/create 2722ms, payment_intents/create 1936ms/101 calls, paypals/generate_order 1448ms.

**InfinityRoses — slowest:** paypals/authorize_order 3459ms, search/search 1854ms/82 calls, payment_intents/create 1796ms/12 calls, paypals/generate_order 1525ms, MailchimpWorker sidekiq job 1273ms.

---

## Reminders — 06:56 (+07:00)

No reminders sent (`--send-reminder` not passed, and Sheets-only 0h data this run is not trustworthy enough to act on with Workstream down — see Sheets section above).

---

## Trello — 06:58 (+07:00)

**Check mail:** 6/6 complete, card auto-closed.

**Check progress:** 13/22 complete. Still open: John Yi - Amazing Meds, Elena - SamGuard Digital Plant, Bailey, Rebecca, Fountain, Philip, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Elena - WordPress SamGuard.

---

## Unresolved questions

- Confirm whether the "3 QA-rework cards" on Fountain (Infinity Account and Auth, Infinity Item Extras, Order flow) need explicit text replies to the customer, or if the board-workflow (card → "Not passed" → rework) is considered sufficient acknowledgment.
- Someone needs to sit at the keyboard to complete the Workstream SSO login (3 automated attempts all hung waiting on a human step) — until then Sheets/Fountain/Arthur/Blair Brown/Maddy-JIRA checks stay incomplete.
- Arthur's Solid Code Slack cookie-refresh script assumes a `/home/nus` + "Profile 15" environment that no longer exists in this sandbox (now `/home/mpfc` + only "Profile 19", no Slack login saved there) — needs either a fresh manual login captured into that profile, or the script's hardcoded paths updated.
- samguard.co outage (ALERTS #1) — recommend an immediate manual check outside this session; a 60s+ full HTTP hang on a WordPress site backing a paying client (SamGuard) is high severity.
