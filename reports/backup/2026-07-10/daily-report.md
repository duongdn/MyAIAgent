# Daily Report — 2026-07-10 (Friday)

**Run:** 2026-07-10T07:05:00+07:00 (cron)
**Window:** 2026-07-09T09:05:00+07:00 → 2026-07-10T07:05:00+07:00
**Leave plan:** KhanhHH — full-day remote/off 2026-07-10 (wisdom tooth extraction), approved live by namtv + duongdn in Matrix (was still "PENDING" in leave-plan.json, now effectively confirmed).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Trello (Fountain) | **Blair Brown (Peptide Clyde) billing dispute**: customer disputed 68h50m charged last week; team spent overnight (Jul9 09:19–Jul10 02:37) reconciling down to 28h10m with itemized explanation, sent to customer ~02:26. Needs your review/confirmation this was handled reasonably — new dedicated Trello item added ("Blair Brown - Peptide Clyde"). |
| 2 | Slack (Xtreme/Maddy) | Madhuraka asked Kai for an API-upgrade cost estimate (Jul9 19:35) — still unanswered ~11h later. |
| 3 | Trello (Fountain board) | Kunal (kunalsheth) posted 2 direct asks — "please fix this and push live asap" (scheduled-delivery bug, 21:17) and a Gift-of-Choice cart-behavior question (01:57) — both still unanswered on the board. |
| 4 | Slack (OhCleo DM) | Tony flagged a real Google Play Console warning: developer profile + all apps will be **removed Aug 2, 2026** — org name/address no longer verified. Unanswered. |
| 5 | ~~Email (5 Zoho accounts) carrick@, nick@, rick@, kai@, ken@ all return `Invalid credentials` on IMAP login — genuine password issue (not fixable by agent), same class as the ken@ incident on 2026-07-03. Needs new Zoho app passwords.~~ | **CORRECTED 09:14:** this was WRONG — not a Zoho-side credential issue at all. Git archaeology found commit `2c8240f` (2026-07-09 22:38+07, ~8.5h before this morning's cron) silently overwrote all 5 accounts' `app_password` in `config/.email-accounts.json` with different, non-working values. The pre-22:38 passwords were tested live and still work perfectly. Restored the correct passwords (commit `d2811cb`), verified all 5 accounts authenticate now. Root cause of the *change itself* not fully reconstructed (no session log found for that exact timestamp beyond a Matrix scan), flagging as a real process gap — see [[feedback_verify_config_history_before_blaming_external_credential]]. |
| 6 | ~~Email (config gap) davidztv19@gmail.com (Arthur/Meta-Stamp monitoring account) is completely missing from `config/.email-accounts.json`~~ | **CORRECTED 09:14:** same commit (`2c8240f`) dropped this account entirely. Re-added from the pre-22:38 version (app password unchanged), verified live IMAP login works. Fixed in commit `d2811cb`. |
| 7 | ~~New Relic (OhCleo) — New production DB error: `column app_media.cached_relevance_score does not exist` — 36 occurrences, not seen in prior reports.~~ | **CORRECTED 09:38:** false alarm, resolved. Direct NerdGraph timeseries query (24h, 1h buckets) shows all 36 occurrences confined to a single window, Jul 9 09:36–10:36 (last hit 09:40:50), zero before or since, zero in the last 60 min as of this check. Tied to Tony's Jul 9 track-ranking deploy, self-resolved (rollback or hotfix) — not an active issue. |
| 8 | New Relic (MPFC) | Apdex dropped to **0.52** (poor). Slowest "transactions" are vulnerability-scanner probes (`.env.php.swm`, `cfgs.php`, `gebase.php69`) taking 400–600s each — security scanning activity, not a real app bug, but dragging the score down. Also one new real PHP fatal: `Call to undefined method stdClass::add_database()` in `db-config.php:284`. |
| 9 | Elena WordPress (samguard.co) | New CSP violation: `region1.google-analytics.com` (GA4 regional endpoint) blocked by `connect-src` — same class as the earlier doubleclick.net gap, needs wp-admin fix decision. |
| 10 | Workstream (all devs) | SSO session fully expired — visible-browser login landed on a real email/password form (not auto-SSO like Matrix), no stored credential available to complete it. **Sheets alone show 0h for LongVV/PhucVT/TuanNT/KhanhHH/LeNH on Jul 9**, but Matrix transcripts show all 5 were genuinely active that day (see Sheets section) — needs a human login before hours can be trusted either way. |
| 11 | ~~Discord (AirAgri/nusvinn) — Session token invalid (401) + visible-browser relogin landed on Discord's login page — needs human sign-in. Vinn's Jul-9 daily report could not be verified this run.~~ | **RESOLVED 10:27:** was never a login issue — you were already logged in; the extraction script was broken (stale token regex + a puppeteer localStorage bug, root cause not yet fixed in code). You grabbed the real token directly from DevTools Network tab, saved to config. Confirmed live: Vinn actively answering jdiamond's questions both Jul9 and this morning (Jul10 09:07-09:55), real ongoing work, no gap. |
| 12 | Upwork (carrick + will/MS Teams) | Both visible-browser retries hit real CAPTCHA/security challenges (Upwork) and a Microsoft "unusual activity" verification wall (Teams/Philip) — genuinely blocked, needs human to complete in browser. |
| 13 | GitHub (nuscarrick, nusken) | Neither account is authenticated in this environment's `gh` CLI (only `duongdn` + `mypersonalfootballcoach` are) — Baamboozle/Bizurk GitHub issue checks and Precognize PR check could not run. |
| 14 | Upwork (Neural Contract / Contract Probe) | **UPDATED 10:20.** Client escalated over a multi-file-upload ordering bug + single-file UX regression, said *"do not do any further work"* at 09:41 — full 605-msg history check confirms the complaint is justified (client's 2026-05-26 spec explicitly flagged this exact risk, Carrick never raised it in ~6 weeks of delivery). Client then sent a complete fix spec + reference code at 10:09, ending with a direct "let me know one way or other" ask — still unanswered. See Upwork section for full transcript + suggested reply. |

**Today (Fri Jul 10):** KhanhHH off/remote (dental, approved). All other PHP-team devs expected working.

---

## Email — all — 07:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 5 | 2 (leave requests: Chien Tran, TrinhMTT, Nam Tran self, **KhanhHH for today 10/7**) | no events |
| carrick@nustechnology.com | — | `Invalid credentials` (IMAP auth failure) | — |
| nick@nustechnology.com | — | `Invalid credentials` | — |
| rick@nustechnology.com | — | `Invalid credentials` | — |
| kai@nustechnology.com | — | `Invalid credentials` | — |
| ken@nustechnology.com | — | `Invalid credentials` | — |
| vuongtrancr@gmail.com | 4 | 2× New Relic "metric query deviated from baseline" (Swish) | — |
| dnduongus@gmail.com | 14 | "Google Account was recovered successfully" + "Security alert" (personal Gmail) — worth a quick check that this was you | — |
| freelancer@mypersonalfootballcoach.com | 4 | Rollbar: **10th occurrence** of `_get_option() on null` (#35) — same recurring bug as before, still unfixed; Daily Summary present | — |

Zoho calendar: only duongdn@ reachable (0 events today); the other 5 Zoho accounts share the same broken app-password issue as their IMAP login, so calendar also unreachable for them. Gmail accounts have no Zoho calendar (expected).

Trello: DuongDn ✓ complete. Carrick/Rick/Kai/Ken/Nick ⚠️ left incomplete — genuine IMAP fetch failure (invalid credentials), not a content issue. **UPDATE 09:14: all 5 marked ✓ complete after root-cause fix (see Alert #5 correction), Check Mail card now fully done.**

---

## Slack — all — 07:05 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 3 (general channel) | skjamie25 flagged Vietnamese-character display bug + asked Carrick to re-review a PR; aysark posted a Redis→Valkey staging migration heads-up. **MPDM C07SQ4HAUHZ (the actual Aysar gate) had 0 messages — last post Jul 6.** Pre-check run (see Sheets/Aysar below). |
| RDC - FM Monitoring | 16 | Mostly automated tuner logs. dmetiner/Carrick exchange flowed normally (Carrick: "off today for health checkup" → dmetiner: "no worries, will continue when you're back"). No unresolved direct ask this window. |
| Swift Studio | 0 | Quiet. |
| Xtreme Soft Solutions | 12 | Kai posted progress (LIFM2-449 done, 450 in progress). **Madhuraka asked for an API-upgrade estimate 19:35 Jul9 — still unanswered** (verified via full DM history, not just search hits). |
| SAM GUARD - Mobile | 8 | All automated HubSpot MQL-lead notifications, no human activity. |
| GLOBAL GRAZING SERVICES | 22 | Nick's daily report present in #maintenance (10/07 status, notes the known recurring nightly memory-spike WARNING, self-resolving 14+ days — consistent with Bailey-monitor's existing tracking). Joey (customer) reported several "urgent" mobile/stock bugs in #barcode-stock-and-picking-location — Amy (dev) actively root-caused and responded same day, fix expected next morning. Payment release discussion also active and handled. Dev-topic activity, not a person-status alert. |
| Amazing Meds | 0 (0 active channels) | Quiet (xoxc token refreshed proactively, working). |
| Generator | 0 | Quiet. |
| LegalAtoms | 1 | Raymond: "releasing today" — no Nick-specific issue. |
| MyPersonalFootballCoach | 1 | MPDM customer thread: "Can we check the notifications please from the Coach setting plans? This doesn't seem to be working" — **unanswered**, may relate to the recurring Rollbar #35 bug above. |
| William Bills | 0 | Quiet. |
| Equanimity | 0 (0 active channels) | Quiet (xoxc token refreshed proactively). |
| Aigile Dev | 1 | Automated alert channel post, no real content. |
| OhCleo (Piece 12) | 2 (DM:Celine) | Tony (LongVV) flagged the Google Play Console removal warning (see Alerts #4) + asked about Cloudflare additions. #events-code: `channel_not_found` (channel may have been renamed/archived — not fixed this run). |

Trello: Marcel ✓, Elena-SamGuard ✓, Raymond ✓, Colin ✓, Andrew Taraba ✓, Rory ✓, Franc ✓ complete. Maddy, MPFC, Ohcleo, Aysar, Elliott, John Yi, Bailey, Rebecca ⚠️ left incomplete (see reasons per item below/Alerts).

---

## Discord — all — 07:05 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | — | Token invalid (401 on `/users/@me` and `/guilds`). Visible-browser relogin attempted (`discord-token-refresh.js`, DISPLAY=:1) — landed on Discord's real login page, needs human sign-in. Vinn's Jul-9 daily report **not verified** this run. |
| Bizurk (nuscarrick) | 0 | Token valid, quiet. Andrew Taraba DM ("animeworld") — 0 messages, normal per standing low-communication pattern. |

Trello: Andrew Taraba ✓ complete. James Diamond - Vinn ⚠️ incomplete (verification failed, not a confirmed miss).

---

## Scrin.io — 07:05 (+07:00)

**Scrin.io (Nick / John Yi workspace — 2026-07-09):** 8h01m logged (1 session, 08:23–16:24). `Project`/`Client` tags both "No project"/"No client" as usual — this is Nick's own tracked time, not attributable to any specific client project, and is independent of TuanNT's task-log status.

---

## Sheets — all — 07:05 (+07:00)

**Workstream could not be verified this run** — SSO session expired at the browser-profile level (unlike Matrix, this profile had no live auto-login cookie; landed on a real "Sign in with SSO" → email/password form with no stored credential). Direct refresh_token grant against Keycloak also failed (`unauthorized_client`). This is a genuine gap requiring a human to log in once on the visible display.

Raw Google Sheets check (bypassing the scan script, read directly) for **Thu 2026-07-09** across all 11 sheets: every sheet's day-header total is **0h** for LongVV/PhucVT/TuanNT/KhanhHH/LeNH (only Paturevision shows 0.75h, logged by HaVS/NamNN — different people). Taken alone this would look like a 5-way total miss — but per the repeated false-alarm history for this exact scenario, I cross-checked against Matrix (see Matrix section) before concluding anything:

| Dev | Sheets Jul 9 | Matrix evidence same day | Verdict |
|-----|-------------|---------------------------|---------|
| LongVV | 0h | Active in OhCleo Slack (Google Play warning) + Matrix "Celine - OhCleo" room (51 msgs: SendGrid check, hardcoded-image bug found + fix, live deploy) + deep Postmark API debugging in Maddy room | Real work confirmed, just not yet logged to Sheets/WS |
| PhucVT | 0h | Arthur/Crystal-lang room: "Just report my process today" 17:17, logged task same morning per his own message ("Em vừa log rồi") | Real work confirmed (log target is Workstream, unverifiable this run) |
| TuanNT | 0h | NUS-Bailey-Paturevision room: actively debugged + fixed a production Sidekiq job bug (print-batch job not running on live), pushed a branch | Real work confirmed on Bailey/Paturevision, not yet reflected in task log |
| KhanhHH | 0h | Left for a dental appointment mid-day (confirmed 13:04 "đang đi khám răng"); approved remote/off for **today** (Jul 10) for the same reason | Partial day disruption Jul 9, approved leave Jul 10 |
| LeNH | 0h | Extremely active overnight (see Blair Brown dispute, Alert #1) reconciling a different week's hours; also flagged as running behind on James Diamond hours (18h/24h logged this week per Matrix) | Real, heavy work — just not the specific day/sheet combo scanned |

**No reminders sent.** Given the Matrix-confirmed activity for all 5, sending "0h logged" reminders right now would repeat the exact false-alarm pattern documented multiple times before — the real gap is Workstream access, not developer inactivity.

**Aysar/Baamboozle pre-check (mandatory):** `sheets-tasklog-scan.js` also came back Workstream-unavailable/sheets-0h for KhanhHH — same structural gap as above, not a confirmed "no work" finding. Baamboozle MPDM has had no post since Jul 6 (4 days) — longer than the usual gap. Left as a genuine open question rather than an alert, pending Workstream access.

**Maddy JIRA check (W14, 2026-07-06):** LIFM2-447 ✅, LIFM2-446 ✅, LIFM2-448 ⚠️ no estimate set (small ticket, dev already tested).

**Leave:** `parse-leave-emails.js` found 1 new pending request: KhanhHH, 2026-07-10, full day, wisdom-tooth recovery — confirmed live in Matrix by namtv + duongdn (effectively approved, leave-plan.json still shows "PENDING").

Trello: John Yi, Bailey, Rebecda, Elliott, Aysar ⚠️ left incomplete pending Workstream access (see per-item notes above/below).

---

## Fountain — 07:05 (+07:00)

### Part 1 — Matrix Plan
Latest plan posted by @trinhmtt, **2026-07-06 08:40 +07** (Monday): *"em gui plan tuan nay a"* — ViTHT: 40h, ThinhT: 20h, DatNT: 40h ⇒ QC: 24h. No VuTQ or HaVS this week (not named in the plan). Capacity = **100h/week** (dev-only).

### Part 2/3 — Task log vs plan
Summary tab shows **W34 (Jul 6–12) = 0h logged** so far. Per standing instruction (2026-06-09), Fountain per-dev hours/task-log 0h are **no longer tracked or alerted** — only capacity/runway (Part 4) and over-estimate tracking (Part 5) matter now.

### Part 4 — Capacity & Runway
Recomputed directly from "Est vs Charged" (idx6=Status, idx7=Dev, idx8=Est, idx9=CR, idx10=Actual — matching every row with a non-empty task ID, no name-format filtering):
- **NS+IP (Not Started + In-progress only): 28 tasks, 158.25h remaining**
- Broader bucket (+ Pending/On Hold/Dev Done/Deployed on Staging/blank/N/A): 74 tasks, 158.75h remaining
- Runway at 100h/wk capacity: **~1.58 weeks** (NS+IP)

⚠️ Note: prior reports showed 229h (Jul 8) → 365h (Jul 9) → 158h (today). The 3 specifically-tracked tasks (#2615, #2595, #2735) are flat/stable vs yesterday (see Part 5), so I believe today's bucketing is correct per the documented rule (NS+IP = Not Started/In-Progress only, "Deployed on Staging" belongs in the Broader bucket, not NS+IP) — earlier days' totals may have mixed the two buckets. Flagging the swing transparently rather than asserting either number is "the" trend.

### Part 5 — Over-Estimate Tracking
| Task | Est+CR | Actual | Over% | vs yesterday |
|------|--------|--------|-------|---------------|
| #2615 | 12.0h | 106.8h | +790% | flat (same as Jul 9) |
| #2595 (GiftDrop) | 120.0h | 168.2h | +40% | flat |
| #2735 | 130.0h (90+CR40) | 136.0h | +4.6% | flat (was "+5%" Jul 9) |
Other notable new-over-budget tasks this run: #2523 (+281%), #2501 (+538%), #2380 (+531%), #2652 (+600%), #2627 (+1550%, tiny 0.5h est) — all small-estimate tasks where a couple hours of rework produces a huge %, not new escalations.

### Trello board (Web Development)
- **2 unanswered direct customer asks from kunalsheth** (see Alert #3) — both same-card comment threads have no rick570 reply yet.
- Hard-to-release (Doing 14+ days): "Fountain & Infinity - Add Subtle Scroll Animations" (79 days), "ActionController::UnknownFormat in active_admin/devise/sessions#new" (41-day-old bug still in Doing).

Trello: Fountain ⚠️ left incomplete — unanswered urgent customer requests on the board (Alert #3), even though the Matrix-plan/over-estimate gate itself is otherwise clean.

---

## Elena — 07:05 (+07:00)

**Open PRs** (`nustechnology/Elena-SamGuard-Digital-Plant`, duongdn account): **0 open** ✓
**Pending deploy actions** (`.elena-pending-actions.json`): none outstanding — all `merged[]` entries are DONE/NOTE.
**Precognize** (`Precognize/development`, nusken account): **could not check** — `nusken` GitHub account is not authenticated in this environment (`gh auth token -h github.com -u nusken` fails). Needs `gh auth login` for that account.

**WordPress SamGuard (samguard.co):** Status 200. `pageErrors`/`jsErrors`: none. **New CSP violation:** `region1.google-analytics.com` (GA4 regional endpoint) blocked by `connect-src` (same directive already allows `www.google-analytics.com`, just not the regional subdomain) — real, actionable (Alert #9). Other `failedRequests` (doubleclick ccm/collect, LinkedIn px) are non-CSP ad-tracking noise, not real errors.

Trello: Elena - SamGuard ✓ complete (PRs clean, no alerts). Elena - WordPress SamGuard ⚠️ incomplete (real CSP violation, needs your wp-admin decision before I apply it).

---

## Matrix — 07:05 (+07:00)

**Active rooms: 26 / 132 | Messages: 603** *(since 2026-07-09 09:05)*
Full details: `reports/2026-07-10/matrix-rooms-0641.md`

*(Note: token expired mid-scan on the first attempt per its known short-lived-window behavior — refreshed immediately and re-ran, this is the complete re-scan.)*

### ⚠️ Action items for DuongDN (7)

| Room | Time | Message |
|------|------|---------|
| Arthur (untitled tmp room) | 10:52 | namtv: "Arthur là hourly. Nhưng ideally nên đủ ít nhất 40h... Mày xem phụ được gì bù ko" — figure out how to help make up PhucVT's Arthur hours shortfall ⚠️ |
| Bailey - BA/QC | 09:38 | datnc: "Bugs a Tuấn sẽ fix ha a Dương?" — confirm bug ownership (you replied "yes" same thread ✅) |
| Bailey - BA/QC | 17:01 | datnc: new mobile bug reported by customer, asked Nam to check console-vs-mobile root cause — still open |
| Bailey - BA/QC | 06:40(next day) | datnc: separate live stock bug, asked if Tuan will fix — still open |
| PHP Projects | 16:48 | chientx: "mà mình bữa giờ làm report ổng theo cơ chế nào vậy a Dương?" — explain current reporting mechanism to Blair Brown (you answered same thread ✅) |
| PHP Projects | 17:44 | namtv: "review xem hợp lý ko, và review luôn số giờ vậy phù hợp ko" — **review the Blair Brown 28h10m reconciliation before it's finalized** (you replied 02:26 next day that it was sent — worth a final sanity check) |
| tmp | 11:21 | namtv: dev-idle prioritization question re: Celine/OhCleo pause — you resolved same thread ("James để mai Long làm") ✅ |

### Key updates

**Blair Brown / Peptide Clyde — billing dispute (see Alert #1):**
- Customer disputed 68h50m charged last week. LeNH initially misattributed hours between Blair Brown and James Diamond projects (self-caught, "log nhầm project"). Overnight (09:19 Jul9 → 02:37 Jul10) you and LeNH built a detailed itemized breakdown reconciling to **28h10m**, explained via a shared Google Sheet, and sent to the customer ~02:26. Also separately corrected a real invoicing bug (June showed only 1h vs normal 4-5h — fixed same session).
- **This is the single biggest item this run** — recommend a final read-through of the sent explanation once you're up.

**OhCleo — real bugs found + fixed same day:**
- SendGrid domain still not verified (Long following up).
- Found a **hardcoded background image** left by a previous dev on a live page (no live data-driven fallback) — flagged for a proper ticket, not silently patched.
- Performance improvement confirmed: request times down from ~100s to 3-4s after today's fixes.
- Google Play Console removal warning (Alert #4) — still needs a reply to Tony/Celine.

**Xtreme/Maddy:** Deep technical session (112 msgs) — LongVV, TuanNT, ThanhNguyen debugging Postmark's open/spam-rate API discrepancy for LIFM2-447 (worked through Postmark's actual stats endpoint together, resolved). Separate open item: Madhuraka's estimate ask (Alert #2).

**Rory / BXR App:** KhoaTD + team investigating a Mindbody API data-structure mismatch on the booking page; you personally wrote and shared an API audit doc (`api-audit-260709-1520-book-a-session-mindbody-apis.md`) — confirmed no code change needed (page uses cached data, unrelated to the reported bug), resolved.

**Bailey / GGS:** Same customer (Joey) bug thread as Slack — root cause found, live invoice corrected and sent; new mobile stock-ID bug reported, still being triaged.

**Radio Data Center (Franc):** LeNH still waiting on customer confirmation of some questions; reminded KhanhHH to move her task log to Workstream.

**Other:**
- BDD-Delivery: Elena QC automation task and Rory's unresponsive contract-estimate email both being actively chased by the team.
- Direct Manager: general bug/feature-request reminder posted to all-staff, no action needed.
- World Cup banter + AI-model chat in general/social rooms — no action needed.

---

## Upwork — 07:05 (+07:00)

Rory (carrick account) and Neural Contract / Aysar workrooms: session expired. Visible-browser retry (`DISPLAY=:1 upwork-login.js --login --account=carrick`) confirmed this is a **real CAPTCHA/security challenge**, not a stale-session false alarm — script is still waiting on it as this report is written. vinn/david2 (Bailey workrooms) have no saved session at all in this environment.

~~Trello: Neural Contract ✓ complete (silence/session-failure never blocks this item per standing policy).~~ **CORRECTED at 10:03 — see below, session cleared and a real client escalation was found. Item reverted to incomplete.**

---

## Upwork — Neural Contract recheck — 10:03 (+07:00)

Session had cleared since the earlier 07:05 CAPTCHA block. Fetched messages directly (`upwork-neural-messages.js`, workroom 38901192) — **this is NOT silence, it's an active unresolved client escalation.**

**⚠️ WARNING — client (Neural Contract / Contract Probe) escalated and told Carrick to stop work, last message unanswered:**

| Time (+07) | From | Message |
|---|---|---|
| 08:01 | Client | Bug report: multi-file upload doesn't preserve "first-selected = primary" order — files upload in file-explorer order instead, screenshot attached. |
| 08:48 | Carrick | "Let me check" |
| 09:13 | Client | 2nd complaint: single-file upload UX regressed to old behavior he rejected back in May — "must be unchanged." |
| 09:22 | Carrick | "Checking possibilities... bug checking phase, looking for a reasonable solution." |
| 09:39 | Client | "ok. i just didn't want you going further down a path that was going to be unacceptable." |
| 09:40 | Carrick | Explained root cause: OS file-picker dialogs don't expose click-order to the browser — `<input type="file" multiple>` only returns files in whatever order the OS dialog hands back (typically name/date sort), so "first clicked = primary" can't be read from the browser at all. |
| **09:41** | **Client** | **"Carrick is that is the case then you should have raised this a long time ago. My instructions on this were clear and it now seems you cannot meet them. Do not do any further work on this."** |
| 09:43 | Carrick | "I've also tried to come up with reasonable solutions for this case. But the current UI doesn't allow it. If we improve the UI/UX a little, this would be entirely possible." *(unanswered as of this check)* |

~~**Carrick's technical explanation is correct** — genuine unforeseeable browser/OS limitation.~~ **CORRECTED 10:20 after pulling full room history (605 msgs back to 2024-11-03, cursor-paginated fetch) — the client's "you should have raised this a long time ago" complaint is justified. Full trail:**

**Original spec, 2026-05-26 (Michael), verbatim — the exact requirement, stated 6 weeks before the bug:**
> "user selects one document in the document browser. This is the 'Primary Document'... the user can also select up to 3 other documents in the document browser. Each additional document is selected by a 'ctrl click' sequence (like with a standard file explorer navigation)... **The txt for the Primary Document must be the first txt in the Combined File. So you will need to have some way of recording which document was clicked first.**"

Two things this proves:
1. **Michael explicitly flagged the exact technical risk in the original spec** ("you will need to have some way of recording which document was clicked first") — he already knew this wasn't automatic and was delegating the *solution* to Carrick, not asking him to just wire up a plain native file input.
2. **The spec describes an in-app "document browser" with ctrl-click multi-select** (a custom JS-controlled list), not the native OS "Open File" dialog. A custom in-app list widget CAN track click order trivially (increment a counter in the click handler) — the "OS doesn't preserve click order" limitation Carrick cited on Jul10 only applies to a native OS file-picker dialog. Somewhere during implementation, the feature ended up using a native multi-file `<input>` instead (confirmed by the client's own bug report: "the files are in fact uploaded based on the order they appear in **the file explorer window**") — a deviation from spec that silently dropped the order-tracking capability, never flagged to the client.
3. **Checked the entire May27–Jun8 delivery window for any Carrick pushback/clarifying question on this point — none found.** Carrick accepted the task ("Let me arrange to check it"), delivered twice (Jun3, Jun8) each time saying it was done/working ("Note: The first file you select will be the primary file"), and only revealed the limitation 5 weeks later, the day the bug was reported live.

**So: yes, the client did state it clearly up front, and did call out the exact risk. The complaint is legitimate — this should have been raised (or the deviation to a native file picker flagged) at delivery time in June, not discovered by the client in production in July.**

**⚠️ NEW — client already sent a full fix spec, unanswered, arrived 10:09 (~6 min before this recheck):** Michael provided a complete working reference implementation — `upload-reorder.html` (standalone HTML/JS demo using SortableJS, drag-to-reorder panel shown only when 2+ files selected, single-file flow untouched) + `UploadController.php` (Laravel backend + migration note for a `position` column) + a screenshot mockup, with detailed step-by-step wiring instructions. Ends with a direct, explicit ask requiring a reply:
> **"Carrick, before you start, please consider carefully whether you can do all of this and let me know one way or other. if you cannot do all of this, let me know what is the problem and I'll consider path forward."**

This is now the most time-sensitive open item — client has done the design work and is waiting on a yes/no + timeline, not further technical debate.

**Suggested reply approach:**
1. Own the miss plainly — don't re-litigate the browser-limitation point further; the client already reasoned past it and supplied a working solution. Re-explaining the OS dialog limitation again would read as deflection.
2. Confirm feasibility of the supplied spec (standard, well-scoped pattern — SortableJS reorder panel + a `position` column is routine work) and give a concrete ETA.
3. Separately confirm the single-file UX regression is being fixed/reverted, distinct from the reorder work.

**Trello: Neural Contract reverted to ○ incomplete** — client explicitly said "do not do any further work," then sent a direct, unanswered ask requiring a yes/no. This needs a human reply, not just a code fix.

---

## Performance — 07:05 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.95 | 629ms | 2.11% (573/27155) — mostly NotAuthenticated (benign) | 20.7/min |
| MPFC (prod) | 0.52 (poor) | 1439ms | 0.12% (35/30109) | 22.9/min |

**OhCleo — full error list:**
| Error | Count |
|-------|-------|
| NotAuthenticated (benign, public endpoints) | 509 |
| ~~`ProgrammingError: column app_media.cached_relevance_score does not exist` (2 query variants)~~ **RESOLVED** (see Alert #7 correction — one-time Jul9 09:36-10:36 burst, zero since) | 29 + 7 = 36 |
| InvalidToken (expired JWT) | 12 |
| ValidationError: email already exists | 5 |
| AuthenticationFailed: Passwords don't match | 3 |
| AuthenticationFailed: User does not exist | 3 |
| ValidationError: username already exists | 3 |
| ValidationError: both email+username exist | 2 |

**OhCleo — slowest transactions:**
| Endpoint | Avg | Calls |
|----------|-----|-------|
| MediaAddTrackAPIView.post | 35.1s | 2 |
| MediaByKeyView.get | 18.0s | 315 |
| MediaRecommendsView.get | 8.0s | 537 |
| HomeMediasView.get | 7.8s | 467 |
| CategoryMediaView.get | 2.1s | 90 |

Password-reset migration bug from Jul 8 is confirmed fixed (no new occurrences). The 3 slow media endpoints are now on their 3rd+ day unaddressed.

**MPFC — full error list:**
| Error | Count |
|-------|-------|
| E_WARNING: "continue" targeting switch is equivalent to "break" | 31 |
| E_WARNING: Invalid argument supplied for foreach() | 2 |
| E_WARNING: mysqli_real_connect no such file or directory (transient) | 1 |
| **NEW:** Uncaught Error: Call to undefined method stdClass::add_database() in db-config.php:284 | 1 |

**MPFC — slowest "transactions"** (all are vulnerability-scanner probes, not real app routes — same class as yesterday's `/search/` WAITFOR DELAY scanning, just different payload signatures):
| Path | Avg | Calls |
|------|-----|-------|
| example.com:443 | 602.6s | 1 |
| gebase.php69 | 486.7s | 1 |
| Login.php | 479.0s | 1 |
| .env.php.swm | 455.7s | 1 |
| cfgs.php | 396.2s | 1 |

---

## Trello — 07:05 (+07:00)

~~**Check Progress: 8/22 complete.**~~
~~**Check Mail: 1/6 complete.**~~

**CORRECTED 09:57 — the two lines above were stale and contradicted the Email section (which already said all 6 Check Mail items were fixed at 09:14) and the internal-fixes section (Blair Brown got completed by you directly in Trello). Pulled live Trello state directly instead of trusting old notes:**

**Check Mail: 6/6 complete** (verified live — was already fully done, card auto-closed by the recurring Power-Up; the "1/6" line above was never updated after the 09:14 fix).

**Check Progress: 13/22 complete** (updated 10:27 — John Yi/Bailey/Rebecca added 10:12 after the TuanNT sheet correction; James Diamond added 10:27 after the Discord token fix).
✓ Marcel, Elena-SamGuard, Raymond, Neural Contract, Andrew Taraba, Colin, Rory, Franc, Blair Brown - Peptide Clyde, John Yi, Bailey, Rebecca, James Diamond

⚠️ **10 still incomplete — each re-verified live this pass, not assumed from the earlier write-up:**
- **Maddy** — Kai is actually online and active in the Xtreme DM this morning (07:30-08:30, OTP exchange with Madhuraka) but still has not replied to Madhuraka's 19:35 Jul9 API-upgrade estimate ask (confirmed via fresh `search.messages`, no reply since). Genuinely still open, not a data gap.
- ~~**John Yi / Bailey / Rebecca** — re-pulled Workstream directly (post-relogin): TuanNT = 0h across every project visible to this token for Jul 9. Real gate, not an access gap this time.~~ **CORRECTED 10:12 (user caught it):** wrong — only checked Workstream, which TuanNT doesn't use for this project. Direct Google Sheets check (Paturevision/Bailey tab, W35, "Thu, 09/07/26" row) shows **TuanNT logged 8h real work**: hotfix live bulk pdf (0.5h), fix bug Emplacements Picking Disponibles (2h), upgrade latest ruby on rails (5.5h). This clears the combined TuanNT gate (any source >0h) — **John Yi, Bailey, Rebecca marked ✓ complete** in Trello.
- **Aysar / Elliott** — KhanhHH = 0h across all her projects (Blair Brown, Baamboozle, Colin/ETZ, Generator, Radio Data Center) for Jul 9, re-confirmed live. Baamboozle MPDM still silent since Jul 6 (re-checked `conversations.history` directly, no new post).
- ~~**James Diamond (Discord)** — 3-step curl check both genuinely 401. Opened a visible Chrome window for you to log in — still waiting, extraction script still fails.~~ **RESOLVED 10:27:** you were already logged in the whole time (confirmed via screenshot) — the extraction script itself was buggy, not your login. You pulled the real token from DevTools Network tab manually, saved to config, verified live. Vinn confirmed actively answering jdiamond same-day both Jul9 and this morning — **James Diamond marked ✓ complete**.
- **MPFC** — re-searched Slack directly: zero messages since the customer's Jul9 06:07 complaint, still unanswered.
- **Ohcleo** — re-ran `slack-fetch-ohcleo.js` since the 08:39 recheck: 0 new messages, Google Play warning still unanswered.
- **Fountain** — pulled Trello board comment actions directly: both kunalsheth asks (Jul9 14:17 "push live asap", 18:57 Gift-of-Choice question) still have no rick570 reply after them.
- **Philip (MS Teams)** — tried twice more this pass with a custom script targeting the correct "(External)/Six Star Rentals" contact specifically (screenshot confirmed 8+ duplicate "Philip Briggs" entries, only one is real) — click landed on a different, unrelated empty duplicate chat, then a follow-up attempt failed to even find the search result in time. Genuinely unresolved via automation; this is a UI-automation reliability limit, not a fresh finding to re-litigate each run.
- **Elena - WordPress SamGuard** — `curl -sI` against the live site confirms `region1.google-analytics.com` still missing from `connect-src`. Unchanged, still needs wp-admin credentials.
- **Arthur - Meta-Stamp** — out of scope for daily-report (on-demand piece only), correctly untouched.

---

## Unresolved questions

1. Was the "Google Account was recovered successfully" + "Security alert" email on dnduongus@gmail.com you? (Alert #6 note — flagging just in case.)
2. ~~davidztv19@gmail.com needs its app password re-entered~~ RESOLVED 09:14 — was config corruption, not a real gap, see Alert #6 correction.
3. ~~Zoho app passwords needed for carrick@, nick@, rick@, kai@, ken@~~ RESOLVED 09:14 — was config corruption (commit `2c8240f`, not Zoho-side), see Alert #5 correction. **Still open: what actually wrote the wrong passwords at 2026-07-09 22:38 — no session log found for that exact timestamp beyond an unrelated Matrix room scan. Worth checking if a session was running unattended around then.**
4. Workstream needs one human SSO login (visible browser, DISPLAY :1) before dev hours can be trusted again — this blocked 6 Trello items this run.
5. `gh auth login` needed for `nuscarrick` and `nusken` GitHub accounts in this environment (currently only `duongdn` + `mypersonalfootballcoach` are authenticated) — blocks Baamboozle/Bizurk issue checks and Precognize PR checks. (Note: both were unexpectedly authenticated during the 08:39 recheck, may be transient in this environment.)

---

## Re-check — 08:39 (+07:00)

| Item | Result | Details |
|------|--------|---------|
| Precognize (nusken) | ✓ resolved | `nusken` GitHub now authenticated (was missing at cron time) — 0 open PRs → clean, no action needed |
| Workstream access | ✓ resolved | SSO restored, full project data now readable |
| Maddy (Xtreme) | ○ still incomplete | Madhuraka's 19:35 Jul9 estimate ask still unanswered ~13h later; Kai online this morning (08:34 "Are you there?") but addressed to anomawasala, not Madhuraka |
| John Yi / Bailey / Rebecca (TuanNT gate) | ✓ completed 10:12 | Google Sheets (Paturevision/Bailey, W35) confirms TuanNT logged real 8h Jul 9 — Workstream-only check earlier in this report was wrong (TuanNT doesn't log this project to Workstream) |
| Aysar | ○ still incomplete | Baamboozle MPDM (C07SQ4HAUHZ) still silent — now 5 days since last post (Jul 6), one day longer than at cron time. KhanhHH Workstream = 0h Jul9 (matches sheets) |
| Elliott | ○ still incomplete | Slack Generator quiet (no alert) but KhanhHH Workstream = 0h Jul9, same as Aysar above |
| John Yi / Bailey / Rebecca | ✓ completed 10:12 | TuanNT's real 8h found directly in Bailey/Paturevision Sheet (Workstream doesn't cover this project for him) |
| James Diamond (Discord) | ✓ completed 10:27 | User provided real token via DevTools Network tab (script bug, not a login issue) — Vinn confirmed actively working, no gap |
| MPFC | ○ still incomplete | 0 new Slack messages since Jul8 — customer's notification complaint still unanswered |
| Ohcleo | ○ still incomplete | 0 new OhCleo Slack messages since cron run — Google Play Console removal warning (Alert #4) still unanswered |
| Fountain | ○ still incomplete | Checked Trello board comments directly — both kunalsheth asks (14:17 "push live asap", 18:57 GOC cart question) still unanswered by rick570 |
| Philip (MS Teams) | ○ still incomplete | Login now succeeds (previously blocked by MS security wall) and Philip Briggs chat was found, but message extraction returned only 1 ambiguous item ("Messages" header) — inconclusive, not confirmed clean |
| Elena - WordPress | ○ still incomplete | Unchanged — CSP violation fix needs your wp-admin decision |
| Blair Brown - Peptide Clyde | ○ still incomplete | Unchanged — awaiting your review of the overnight reconciliation |
| Check Mail: Carrick/Nick/Rick/Kai/Ken | ○ still incomplete | Re-tested all 5 Zoho IMAP logins directly — still `Invalid credentials`, unchanged from cron run |

**New finding — Workstream `needsReview` (Pending, not previously visible since Workstream was down at cron time):**
- Radio Data Center: KhanhHH, 4 tasks Jul 8 (0:35+2:00+1:30+1:30 = 5h35m) — reviewer: **LeNH**
- Crystal lang: PhucVT, "Metastamp V3 project tasks" Jul 9 (8h) — reviewer: **TienND**
(Fountain's needsReview excluded per standing instruction.)

**Upwork (carrick):** Session now shows "Already authenticated" (CAPTCHA/challenge cleared since cron run) — login succeeded, though the specific time-reports page 404'd. Not gating any open Trello item (Neural Contract already ✓ per silence policy), noting for visibility only.

**Cleared:** Precognize check, Workstream access.
**Still open:** Maddy, John Yi, Bailey, Rebecca, Aysar, Elliott, James Diamond, MPFC, Ohcleo, Fountain, Philip, Elena-WordPress, Blair Brown, Check Mail (5 Zoho accounts) — all genuine unresolved blockers/unanswered items, not re-flagged as new alerts beyond what's already listed above.

---

## Internal issue fixes — 08:58 (+07:00)

User asked to fix internal (our-side) issues directly, not just report them. Went through the technical Alerts and fixed what was actually within our access; the rest are blocked by missing credentials, documented below so they don't get re-investigated from scratch next time.

**✅ FIXED — MPFC `db-config.php` fatal error (Alert #8):**
- Root cause: `/var/www/mypersonalfootballcoach.com/db-config.php` had no `ABSPATH` guard, so it was directly web-accessible (`curl https://mypersonalfootballcoach.com/db-config.php` → HTTP 500). When hit directly (by vulnerability scanners per the New Relic slow-transaction list), `$wpdb` isn't the real HyperDB object, so `$wpdb->add_database()` fatals with `Call to undefined method stdClass::add_database()` — this was both the recorded PHP fatal AND an unrelated security exposure (public access to a DB-topology config file).
- Fix applied: added `if (!defined("ABSPATH")) { exit; }` as line 2 of the file (standard WP direct-access guard). Backed up original to `/root/backups/db-config.php.bak-202607100856` on `mpfc.live` (moved out of web root, not left as a downloadable `.bak`).
- Verified: `db-config.php` direct request now returns 200/empty body (silently exits) instead of 500. Homepage still 200, site unaffected.

**❌ BLOCKED — Elena WordPress CSP violation (Alert #9, `region1.google-analytics.com`):**
- Confirmed exact fix needed: add `https://region1.google-analytics.com` to the `connect-src` directive (current live policy read directly from `wp_samguard.wp_options.hsts_csp` via SSH).
- Cannot apply: a raw SQL `UPDATE` on the DB value would NOT rewrite `.htaccess` (the plugin only does that inside its own `update_option` hook, which only fires via the wp-admin settings-page save, not a direct DB write). The SSH user (`nustech`) is not in the `www-data` group and `.htaccess` is `rw-rw-r-- www-data:www-data` — no write access. `sudo` requires a password we don't have (`sudo -n` fails). No wp-admin login credentials are stored anywhere in `config/`.
- **What's needed to unblock:** either (a) wp-admin username/password for samguard.co so this can be automated via browser, or (b) the `nustech` sudo password / adding `nustech` to the `www-data` group.

**✅ RESOLVED — OhCleo `cached_relevance_score` DB column (Alert #7):** confirmed false alarm on recheck (09:38) — see Alert #7 correction. One-time burst tied to the Jul 9 deploy, zero occurrences since. No message to Tony needed.

---

## Re-check — 09:38 (+07:00)

| Item | Result | Details |
|------|--------|---------|
| New Relic (OhCleo) `cached_relevance_score` | ✓ resolved | Confirmed false alarm — see Alert #7 correction above |
| Workstream access | ✓ re-resolved | SSO expired AGAIN sometime after the 08:39 recheck (visible-browser login landed on a real email/password form a second time, same as cron). Root-caused: `workstream-login.js`'s auto-SSO wait was hardcoded to 60s — too short for a human to switch windows and enter credentials/2FA. Bumped to 5 min (`scripts/workstream-login.js:105`) and relaunched visibly (DISPLAY :1) — user logged in, token+refresh_token captured and saved. |

**New Workstream data now visible (2026-07-09), updates the Sheets section's "0h for all 5" finding:**

| Dev | Jul 9 Workstream hours | Project | Change from 08:39 recheck |
|-----|------------------------|---------|---------------------------|
| LongVV | **9h** | Xtreme Soft Solutions (Maddy) | NEW — previously only Matrix-inferred ("Postmark debugging in Maddy room"), now confirmed actually logged |
| PhucVT | **8h** | Crystal lang (Arthur) | NEW — previously "unverifiable this run", now confirmed logged |
| LeNH | **8h** | Portfolio - James Diamond | NEW — previously "not yet reflected in task log", now confirmed logged |
| ~~TuanNT | 0h (all visible projects) | — | Unchanged — matches 08:39 finding, gate stays open~~ | **WRONG, corrected 10:12** — TuanNT logged 8h Jul9 directly in the Bailey/Paturevision Google Sheet (Workstream doesn't cover this project for him). John Yi/Bailey/Rebecca all ✓ complete now.
| KhanhHH | 0h (all visible projects: Blair Brown, Baamboozle, Colin/ETZ, Generator, Radio Data Center) | — | Unchanged — consistent with mid-day dental appointment, gate stays open |

**Trello impact (revised 10:12):** John Yi/Bailey/Rebecca now ✓ complete — TuanNT's real 8h was in the Sheet, not Workstream (see correction above). Aysar/Elliott still gate on KhanhHH, confirmed genuinely 0h.

**Not re-verified this pass** (would need fresh Slack/Trello queries, skipped to stay focused on the two items above — no reason to assume they've changed in ~1hr): Maddy/Madhuraka estimate ask, Fountain Kunal asks, MPFC customer complaint, OhCleo Google Play warning, Discord/Upwork/MS Teams human-login blockers, Elena WordPress CSP fix, Blair Brown review, 5 Zoho Check Mail accounts. All remain as documented in the 08:39 recheck / 08:58 internal-fixes section above.
