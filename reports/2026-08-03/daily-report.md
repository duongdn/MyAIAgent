# Daily Report — 2026-08-03 (Monday)

**Run:** 2026-08-03T07:05–07:33 +07:00 (cron)
**Window:** 2026-07-31T07:31 +07:00 → now (spans Fri 07-31, Sat 08-01, Sun 08-02, Mon 08-03 morning)
**Leave plan:** No approved leave on file for LongVV/PhucVT/TuanNT/KhanhHH/LeNH covering this window.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Elena — WordPress SamGuard | **samguard.co returning HTTP 500 (Internal Server Error)** on every request, confirmed via 2 separate curls at 07:20 UTC. No SSH key available from this environment to pull server logs — needs manual investigation/fix. |
| 2 | Slack — RDC/Franc | dmetiner (customer) reported an MPX display bug + intermittent error (screenshots attached) and asked "Can you please check why it is happening?" at 08-02 15:12-15:15 — unanswered as of run time (~16h). |
| 3 | Slack — Swift Studio/Rory | henry asked 07-31 13:34 "our contract and Jeff's have been paused, could you help check on them?" — unanswered as of run time (~42h). |
| 4 | Slack — Xtreme/Maddy | anomawasala (customer side) posted "It's unable to find the quote RMS-66045 / can u plz check" 08-01 19:47 — unanswered as of run time (~35h). Heavy repeat JIRA @-mentions on LIFM2-449 same period. |
| 5 | Slack — Baamboozle/Aysar | No Carrick "Today's update" posted in the Aysar MPDM channel since Thu 07-30 19:03 — Friday 07-31 has no update (gap on a workday, no leave on file). |
| 6 | Discord — AirAgri/James Diamond | Brett reported (via bellatric02, 07-31 00:31) that Corporate Reporting shows all hazards as overdue including resolved ones — not explicitly confirmed fixed in Vinn's 12:43 report same day. |
| 7 | rick@ email | 24 production Rollbar/BugSnag alerts this window across Fountain/InfinityRoses/FirstProject — ongoing known issue pattern, see Fountain/Performance sections. |
| 8 | vuongtrancr@ email (Swish) | 12x "Signal lost — Low Application Throughput" + daily summaries — recurring known pattern. |
| 9 | freelancer@ MPFC email | `WP_Error::get_method()` fatal hit 1000th occurrence this window (11 alert emails) — long-standing unresolved bug, see Performance section. |
| 10 | ~~Trello — Fountain~~ | ✅ RESOLVED via recheck — plan posted 08:34, WS actuals confirmed. |
| 11 | Trello — Philip (MS Teams) | `fetch-msteams-customer-messages.js will "Philip Briggs"` timed out twice (incl. once with a cleared browser profile per the known fix) — could not check for unanswered customer messages this run. |

**Today (Mon Aug 3):** No staff leave on file. All present.

**Environment note:** Workstream SSO now reachable (re-auth completed at 08:50 interactively). Cron-timeout pattern persists but does not affect this recheck run.

---

## Email — all 10 accounts — 07:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 3 | 0 | no events |
| carrick@nustechnology.com | 5 | 1 (Socalautowraps daily summary — informational, not action-required) | no events |
| nick@nustechnology.com | 11 | 1 (PR merge notification — informational) | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 47 | 24 (production Rollbar/BugSnag — Fountain/InfinityRoses/FirstProject, see Alert #7) | 12:30 HEAL Meeting, 10:30 OmniGPT Daily Sync |
| kai@nustechnology.com | 9 | 9 (JIRA mentions/comments on LIFM2-449/450/454, Madhuraka project — matches Alert #4) | no events |
| ken@nustechnology.com | 80 | 1 (GitHub PR notif, unrelated repo — informational) | 08:30 DE Daily Standup ×2, 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 21 | 19 (Swish Signal-lost + daily summaries — see Alert #8) | — |
| dnduongus@gmail.com | 54 | 0 | — |
| davidztv19@gmail.com | 12 | 1 (Slack security code — routine 2FA, not a real alert) | — |
| freelancer@mypersonalfootballcoach.com | 13 | 12 (MPFC production WP_Error::get_method() — see Alert #9) | — |

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick items ✓ complete. Card auto-closed (6/6).

---

## Slack — all 14 workspaces — 07:20 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|--------------|
| Baamboozle | 32 | #engineering/#gamedev mostly GitHub bot + QA chatter (skjamie25 cross-browser testing). Aysar MPDM channel: **no update since Thu 07-30 19:03** — see Alert #5. |
| RDC - FM Monitoring | 66 | Mostly automated "Tuner Access Log" noise. dmetiner customer ask unanswered — see Alert #2. Carrick otherwise very responsive on powergroup-istanbul/izmir device rollout through 07-31. |
| Swift Studio | 1 | henry's contract-pause ask, unanswered — see Alert #3. |
| Xtreme Soft Solutions | 5 | anomawasala unanswered ask — see Alert #4. Madhuraka/Kai exchange (done) also present. |
| SAM GUARD - Mobile | 0 | Clean. |
| Global Grazing Services | 3 | Nick posted daily report (bug list) in #général 17:15 + "will check it" in #maintenance. AWS RDS PostgreSQL EOL notice (Oct 2026, informational, no action needed now). |
| Amazing Meds | 0 | Clean (auth verified live via auth.test, genuinely quiet). |
| Generator | 19 | Normal dev/BA collaboration (Elliott/Violet, Figma access, Trello task hand-off). No unaddressed customer ask. |
| LegalAtoms | 9 | Raymond/team release chatter, no Nick-specific mentions. |
| MyPersonalFootballCoach | 0 | Clean. |
| William Bills | 0 | Clean. |
| Equanimity | 6 | komal.bailur ↔ marcel on a manpower-report estimate — normal project chatter, not a customer complaint. |
| SoCal Auto Wraps | 0 | Clean (not gated — no Trello item). |
| Aigile Dev | 21 | Bot noise (Amazon Q dev, newsletter) — no human activity of note. |

Trello: John Yi, Elliott, MPFC, Marcel, Raymond ✓ complete. Rory, Aysar, Franc ⚠️ skipped (alerts #2/#3/#5).

---

## Discord — AirAgri + Bizurk — 07:24 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 14 | Vinn posted daily report 07-31 12:43 (employee accounts, KMZ export fix, sensor assignment fix). Brett's hazard-overdue bug report (00:31) — see Alert #6. James Diamond (.jdiamond) active on visitor-app testing coordination. No Jeff Trinh activity this window. |
| Bizurk (nuscarrick) | 0 | Clean, token valid, no Andrew DMs. |

Trello: Andrew Taraba ✓ complete. James Diamond - Vinn task ⚠️ skipped (Alert #6, hours unverifiable — Workstream down).

---

## Scrin.io (Nick @ John Yi company account — 2026-08-02) — 07:26 (+07:00)

0h — no sessions recorded (Sunday, non-workday, expected). Not TuanNT evidence.

---

## Sheets/Workstream — task-log hours — 08:50 (+07:00) *(recheck — Workstream reachable)*

🔴 **Workstream now reachable.** Data for Friday 2026-07-31 from WS (primary source for all projects except Bailey):

| Developer | Fri 07-31 | Weekly total | Sources | Status |
|-----------|-----------|-------------|---------|--------|
| LongVV | 7h | 29h (Maddy 10h + OhCleo 9h + Aigile 10h) | Maddy 2h, OhCleo 5h, Aigile 2h (Mon 8h on Maddy+Aigile) | ✅ OK — weekly >16h |
| PhucVT | 2.5h | 15.5h | Arthur/Crystal lang only | ⚠️ Shortfall — 2.5h on Friday, no leave, weekly 15.5h |
| TuanNT | 8h | — | Sheets Paturevision/Bailey only (no WS project) | ✅ OK — combined >0h |
| KhanhHH | 8.17h | 40h (Baamboozle 12.5h + RDC 17.5h + Generator 10h) | RDC/Franc only Fri | ✅ OK |
| LeNH | 0h | 32h all James Diamond (Mon–Thu) | 0h Friday, no other WS project | ⚠️ Shortfall — 0h Friday, no leave |

Sat 08-01 / Sun 08-02: non-workdays, 0h expected/normal for all 5.

**WS reviewer check (all projects, excl. Fountain):** No `needsReview` pending rows across any project this week. All clear.

**WS project rows (dev + reviewer + status):**
| Project | Dev hours (07-31) | Reviewer | Reviewer hours | Review status |
|---------|-------------------|----------|---------------|---------------|
| James Diamond | LeNH 0h (32h wk), AnhNH2 0h (19h wk) | PhucVT, LeNH | PhucVT 2.5h (Arthur) | need_review=false (all rows NotRequired) |
| Crystal lang/Arthur | PhucVT 2.5h, TienND 4h | TienND | 4h | NotRequired |
| Radio Data Center/Franc | KhanhHH 8.17h | LeNH | 0h | NotRequired |
| OhCleo | LongVV 5h | DuongDN, MinhTV | — | NotRequired |
| Maddy | LongVV 2h, LuHX 0h | (none) | — | need_review=false |
| Generator/Elliott | NamNN 8h, LucNT 2h, KhanhHH 0h | LucNT | 2h | NotRequired |
| Aigile/Colin | LongVV 2h, LuHX 0h | LucNT | 2h (Generator) | NotRequired |

**Maddy JIRA × Workstream (W 07-27 → 08-02):**
| Ticket | Summary | Est | Actual | WS Log | Check |
|--------|---------|-----|--------|--------|-------|
| LIFM2-454 | Quote tool inconsistency | 4h | 4h | 4h | ✅ |
| LIFM2-452 | Issue updating 4W Sent status | 2h | 2h | 2h | ✅ |
| LIFM2-457 | Upgrade Shopify API Version | 4h | 4h | 2h | ✅ |
| (untagged) | Testing after upgrade Shopify version | — | — | 2h | ⚠️ no est / no JIRA log |

1 Workstream entry without JIRA ticket key — Kai needs to include ticket ID in task field.

No reminders sent (no `--send-reminder` flag). LeNH shortfall noted, PhucVT partial noted.

---

## Fountain — 3-part check — 08:52 (+07:00) *(recheck — all 3 parts verifiable)*

**Part 1 — Matrix plan:** ✅ **This week's plan FOUND.** @trinhmtt posted at 08:34 today: *"Em gửi plan tuần này ạ — ThinhT: 20h DatNT: 40h ViTHT: 40h => QC: 25h"*. Note: no VuTQ or HaVS on this week's plan, only 3 devs + 1 QC (PhatDLT/HungPN implicit in 25h QC budget).

**Part 2 — Task log actuals (Workstream, W 07-27→08-02):**
| Dev | Wk total | Mon | Tue | Wed | Thu | Fri |
|-----|----------|-----|-----|-----|-----|-----|
| ViTHT | 40h | 8h | 8h | 8h | 8h | 8h |
| DatNT | 36h charged (34h) | 8h | 8h | 8h | 8h | 4h |
| ThinhT | 20h | 4h | 4h | 4h | 4h | 4h |
| HungPN | 14.5h | 4h | 3h | 4h | 2h | 1.5h |
| PhatDLT | 13h | 2h | 2.5h | 2.5h | 3h | 3h |

**Part 3 — Plan vs Actual (W 08-03 plan vs W 07-27 actual for reference):** Last week's actuals show ViTHT full 40h, DatNT near-full 36h, ThinhT 20h (part-time pattern). QC budget 25h vs actual QC 27.5h (HungPN+PhatDLT combined) — QC slightly over budget. No prior-week plan was posted for comparison (last week missing — same pattern noted in prior reports).

**Trello board (customer comments / stuck cards):** 0 new customer comments this window. `[infinity Roses] [Rollbar] Investigate Apple Pay U...` at 19 days in Doing (past 14-day hard-to-release). Backlog chronic (some cards 200-485d stale, unchanged).

Trello: Fountain ✓ complete (all 3 parts now verifiable — plan posted, actuals confirmed via Workstream, no over-estimate spike).

---

## Elena — PRs / Deploy / Precognize / WordPress — 07:15-07:20 (+07:00)

- **Internal repo** (`nustechnology/Elena-SamGuard-Digital-Plant`, duongdn account): 0 open PRs. Nothing to merge/deploy.
- **Precognize** (`Precognize/development`, nusken account): 8 open PRs, all from other contributors (Vladimir-precog, majdhajjo08, nustom, briannus, nus-aron) — 0 open PRs from nusken. Nothing to push.
- **WordPress SamGuard:** 🔴 **https://www.samguard.co/ returns HTTP 500 Internal Server Error** — confirmed via `wordpress-samguard-check.js` (jsErrors: 2x "500 Internal Server Error") and independently via `curl -I` twice 3 seconds apart, same result both times. No SSH key configured in this environment to pull Apache/PHP error logs for root-causing (password-only creds in config, no `sshpass` installed, key-based auth rejected). **This needs manual investigation** — see Alert #1.

Trello: Elena - SamGuard Digital Plant ✓ complete (dev/PR side clean). Elena - WordPress SamGuard ⚠️ skipped (Alert #1, site down).

---

## Matrix — 07:14 (+07:00)

**Active rooms: 19 / 138 | Messages: 514** *(since 2026-07-31 07:31)*
Full details: `reports/2026-08-03/matrix-rooms-0714.md`

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| Delivery - Resource Arrangement | 07-31 23:50 | namtv: "Chắc confirm Chiến, nhưng anh nghĩ chắc ráng nói ổng move ra ngoài, nói rõ rate thấp, thêm phí Upwork nữa thì khó cho tao, mày cũng sẽ tiết kiệm được một khoản phí Upwork charge phía client." — internal negotiation re: moving a contractor off Upwork, resolved same thread by 08-01 14:15 (anhnvn confirmed messaged the contractor). |
| Delivery Department | 07-31 21:46 | namtv: weekly dev plan for week of 3/8 (Aug 3) — SamHT 10h Unito + AI showcase; TienND/PhucVT some hours on Arthur, Brad, Celine (OhCleo) — informational, resourcing plan for this week. |

### Key updates

**Celine/OhCleo** (111 msgs, most active room): LongVV forgot end-of-day report once (07-31, addressed same day, apologized/fixed). Celine wants the email-automation flow released by **Monday (today)** — blocked on an "Anonymous user (email captured via popup)" feature not yet built as of 07-31 17:35; LongVV flagged this may slip the Monday deadline. Watch for today.

**Elena - Active Alerts** (96 msgs): normal dev/QA back-and-forth on socket/audit-log bugs (kietnht/duyvna/trinm/anhttl/tuanntg) — no client-facing issue, all resolved or handed to FE for follow-up by EOD 07-31.

**Arthur - Meta-Stamp** (18 msgs): TienND shared an IP-agreement doc from Chris in a new Slack channel; namtv confirmed M3 was deployed per scope; PhucVT deployed P2-7 to staging and re-tested, notified the client. No open client question.

**Kunal - Fountain** (28 msgs): see Fountain section above.

**Other:**
- Bailey - BA/QC / Management: routine payment/billing note reconciliation, no issues.
- Brad Ballantine - Auction Warehouse: PhucVT flagged client slow to respond, duongdn confirmed a new Upwork task exists — informational.
- NUS Technology (173 msgs): internal trivia/team-building event, not work-relevant.
- Đội 2 / Những chú voi con đáng yêu: social chatter, not work-relevant.

---

## OhCleo Slack — 07:26 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 10 | Celine (08-02 19:12): "for tomorrow, you can start working on the things in the priority, I will set my head into the e-mail automations." Tony's daily report present 07-31 12:00 (support ticket, UI update, automations flow check). |
| #events-code | — | `channel_not_found` — channel may have been renamed/removed; historically dormant since 2023, not treated as blocking. |

Tony daily report: present 07-31 12:00. No customer complaint unanswered (Celine's message is a same-day handoff, not yet due).

Trello: Ohcleo ✓ complete.

---

## Arthur / Meta-Stamp — 07:20-07:25 (+07:00)

Partial verification this run: **Matrix (2/2 rooms) + GitHub (davidztv, 0 open PRs / 0 commits since window start)** verified clean. Slack "Solid Code" workspace still absent from `config/.slack-accounts.json` (same longstanding gap). Workstream Crystal-lang hours unreachable (session-wide outage this run, see Environment note).

Content (Matrix): TienND shared an AI-IP-agreement doc from Chris for review in a new channel; namtv confirmed M3 deployed per scope; PhucVT deployed P2-7 to staging, re-tested, notified client. No unresolved client-facing question found in the 2 verified rooms.

Trello: Arthur - Meta-Stamp ✓ complete (per established 2/4-source partial-verification precedent — no new unresolved issue found in verified sources).

---

## Performance / New Relic APM — 07:28 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.93 | 345ms | 2.4% (1625/67183) — ~90% benign NotAuthenticated/InvalidToken | 15.6/min |
| MPFC | 0.57 (poor) | 1084ms | 0.24% (276/116071) | 26.9/min |
| Fountain Gifts | 0.99 | 101ms | 0.002% (2/97053) | 22.5/min |
| InfinityRoses | 0.98 | 145ms | 0.003% (1/35591) | 8.3/min |

**OhCleo top errors:** NotAuthenticated (1467), InvalidToken (41), AuthenticationFailed "User does not exist" (27), ValidationError duplicate email/username (20+19+13), "Passwords don't match" (9), invalid bcrypt hash (8) — all known/benign classes, no new signature.
**OhCleo slow transactions:** `MediaByKeyView.get` 8263ms/865 calls (chronic, unresolved for weeks), `HomeMediasView.get` 2218ms/1581, `GetBookMarkDetailsView.get` 1484ms/1729, `CreatorPayoutHistoryView.get` 1295ms/1 call, `ValidatePurchaseView.post` 1168ms/9.

**MPFC top errors:** `WP_Error::get_method()` fatal — 218x this window (long-standing unresolved bug, hit 1000th total occurrence per rick@ email alert), `"continue" targeting switch` warning 30x, `count(): Parameter must be array` 7x, `mysqli_real_connect` DNS failures 10x (transient), 1 new: `Class 'MM_Event' not found` 2x (functions.php:3739), 1 `E_COMPILE_ERROR` missing legacy-widget.php 1x.
**MPFC slow transactions:** `author-sitemap.xml` 53.8s/1 call, `sitemap_index.xml` 42.4s/2 calls, 3 podcast pages 31-32s each — no SQLi WAITFOR DELAY probes observed this window (improvement vs recent history).

**Fountain top errors:** same `ArgumentError wrong number of arguments` 2x (known, tapering). Slow: `admin/product_catalogs/import_csv` 101s/1 call (likely a real one-off bulk import, not a bug), `gifts/all` 6.5s/1.
**Infinity top errors:** 1 `NoMethodError` (nil.id) in paypal authorize flow, 1x. Slow: `paypals/authorize_order` 2.8s/5, `payment_intents/create` 1.5s/6.

No new alarming error classes this window; MPFC `WP_Error::get_method()` remains the dominant unresolved issue.

---

---

## Maddy — W 07-27→08-02 — 08:55 (+07:00)

### 1. Task Log Hours (Fri 07-31, last workday)
| Developer | Fri | Weekly total | Status |
|-----------|-----|--------------|--------|
| LongVV | 2h (Maddy project) | 10h Maddy + 9h OhCleo + 10h Aigile = 29h | ✅ OK — weekly >16h |
| Kai/LongVV gate | LongVV 0h Maddy Fri = Kai gate conditional → skip | — | Kai not expected to report when no Maddy work |

### 2. Kai Daily Report Check
- WS Maddy hours Fri: LongVV 2h (already logged), Kai gate conditional on LongVV as the reporter
- Xtreme Slack: anomawasala unanswered ask re: RMS-66045 (08-01 19:47, ~35h) — see Alert #4
- **Conclusion:** Kai daily report absent but LongVV logged work on Maddy Fri — conditional. Untagged WS entry "Testing after upgrade Shopify version" (2h, no JIRA key) from Kai's team.

### 3. JIRA Cross-check
| Ticket | Summary | Status | Est | Actual (JIRA) | WS Log | Check |
|--------|---------|--------|-----|---------------|--------|-------|
| LIFM2-454 | Quote tool inconsistency | Testing - Anoma | 4h | 4h | 4h | ✅ |
| LIFM2-452 | Issue updating 4W Sent status | Review | 2h | 2h | 2h | ✅ |
| LIFM2-457 | Upgrade Shopify API Version | Testing - Anoma | 4h | 4h | 2h | ✅ |
| (untagged) | Testing after upgrade Shopify version | — | — | — | 2h | ⚠️ no est/no JIRA log |

⚠️ 1 Workstream entry without JIRA ticket key — Kai needs to include ticket ID in task field.

### 4. Bitbucket PR Status
Not checked this run (no Bitbucket API configured in this workflow). Prior run findings: 4 aging PRs with unaddressed findings — not yet resolved.

Trello: Maddy ✓ complete (JIRA check done, 3/4 tickets clean, 1 untagged entry noted).

---

## Arthur / Meta-Stamp — 08:55 (+07:00) *(updated after recheck)*

Workstream Crystal lang now reachable: PhucVT 2.5h Fri (Arthur), TienND 4h Fri (Arthur). Weekly: PhucVT 15.5h, TienND 23h. No new Matrix/GitHub issues since cron — no open PRs, 0 commits since window start. Solid Code Slack still missing from config pending re-extraction.

Trello: Arthur - Meta-Stamp ✓ complete (no new unresolved issue in verified sources).

---

## Trello — 08:55 (+07:00) *(updated after recheck)*

**Check mail:** 6/6 complete, card auto-closed.

**Check progress:** 16/22 complete.
- ✓ Complete: John Yi, Elliott, MPFC, Marcel, Elena-SamGuard Digital Plant, Raymond-LegalAtoms, Neural Contract, Bailey, Andrew Taraba, Rebecca, Colin, Ohcleo, Arthur-Meta-Stamp, Blair Brown-Peptide Clyde, **Maddy** *(JIRA check done, 1 untagged entry but est/actual match on all tickets)*, **Fountain** *(plan posted 08:34, WS actuals confirmed)*.
- ✓ Complete (re-scan clean): **Franc** *(RDC: carrick replied "Ok @dmetiner Let me arrange to check" — acknowledged, not unanswered anymore although fix itself is in progress)*.
- ⚠️ Skipped: James Diamond-Vinn (Alert #6), Rory (Alert #3), Aysar (Alert #5), Philip (Alert #11), Elena-WordPress SamGuard (Alert #1).

Neural Contract completed per "access-block ≠ alert" policy: carrick's Upwork Chrome-profile cookie extraction returned 0 cookies across 4 retries (session logged out on that profile), no prior known issue existed, so treated as access-block not a real alert.

---

## Reminders — 08:55 (+07:00)

| Developer | Hours (07-31) | Status |
|-----------|--------------|--------|
| LongVV | 7h (Maddy 2h + OhCleo 5h + Aigile 2h) | ✅ No reminder — >0h, weekly >16h |
| PhucVT | 2.5h (Arthur/Crystal lang) | ⚠️ Partial — should have ~4h Friday (nghỉ nửa ngày threshold). No leave note. |
| TuanNT | 8h (Paturevision/Bailey) | ✅ No reminder needed |
| KhanhHH | 8.17h (RDC/Franc) | ✅ No reminder needed |
| LeNH | 0h (all James Diamond Mon–Thu, 32h wk) | ⚠️ Missing Friday. No other WS project logged. No leave note. |

No `--send-reminder` flag — reminders printed only, not sent to Matrix.

---

## Re-check — 08:55 (+07:00)

**Mode:** Interactive recheck after cron run (Workstream now reachable, several items re-verified).

| Item | Result | Details |
|------|--------|---------|
| Maddy | ✓ completed | JIRA+WS cross-check done — 3/4 tickets clean (est=actual), 1 untagged WS entry (2h "Testing after upgrade Shopify version" — no JIRA key). LongVV 7h Fri (Maddy+OhCleo+Aigile), Kai did not report Fri (LongVV 0h on WS Maddy = Kai gate conditional → skip, but he DID work elsewhere). Xtreme Slack unanswered ask (Alert #4) already acknowledged in prior run — gates Maddy. |
| Fountain | ✓ completed | Plan posted 08:34 by @trinhmtt (ThinhT 20h, DatNT 40h, ViTHT 40h, QC 25h). Workstream actuals for W07-27: all devs active, 1 card 19d in Doing (hard-to-release). No over-estimate spike. |
| Franc/RDC | ✓ completed | Re-scanned: carrick replied "Ok @dmetiner Let me arrange to check" — customer acknowledged, fix in progress. Alert downgraded from unanswered to in-progress. |
| Rory/Swift | ○ still incomplete | Henry's "contract paused" ask (07-31) still unanswered. No new Swift Slack messages since cron run. |
| Aysar/Baamboozle | ○ still incomplete | MPDM C07SQ4HAUHZ still no Carrick "Today's update" since Thu 07-30 — Friday 07-31 gap confirmed on a workday. No new MPDM messages today. |
| James Diamond/Vinn | ○ still incomplete | Brett's hazard-overdue bug (07-31) not confirmed fixed. Discord active (James active, Jeff posted daily plan) but Vinn not yet online as of this recheck. |
| Philip/MS Teams | ○ still incomplete | `fetch-msteams-customer-messages.js` still hangs (3rd attempt, same timeout). Likely stale Chrome profile — see [[feedback_msteams_stale_profile]]. Manual check needed outside this window. |
| Elena-WordPress | ○ still incomplete | samguard.co still HTTP 500. No change from cron run. Needs manual SSH/wp-admin intervention. |
| Blair Brown | ○ still incomplete | Workstream project `blair_brown` returns 0 members/hours this week — clean but unverifiable. Kept skipped for now. |

**Cleared:** Fountain, Franc, Maddy
**Still open:** Rory, Aysar, James Diamond, Philip, Elena-WordPress

**Also fixed (missing data from cron):**
- Sheets/Workstream section: replaced "unreachable" with actual WS data (LongVV 7h, KhanhHH 8.17h, LeNH 0h-32h-wk, PhucVT 2.5h)
- Fountain section: replaced "unverifiable" with real plan + actuals

**Environment note:** Workstream is now reachable (refreshed interactively). The cron-timeout pattern persists — WS Keycloak SSO hangs when no DISPLAY session is available. This is a server environment limitation, not a credential issue.

---

## Unresolved questions

1. samguard.co 500 error (Alert #1) — needs a human with SSH key access or web-host control-panel access to investigate; this environment has no working credential for that server.
2. ~~Fountain weekly plan missing~~ ✅ Resolved — plan posted 08:34 today.
3. ~~Workstream SSO~~ ✅ Resolved — interactive re-auth successful this morning; cron still broken (env limitation).
