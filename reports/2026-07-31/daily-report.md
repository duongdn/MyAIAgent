# Daily Report — 2026-07-31 (Friday)

**Run:** 2026-07-31T07:05:00+07:00 (cron)
**Window:** 2026-07-30T08:47:50+07:00 → 2026-07-31T07:31:00+07:00
**Leave plan:** LeNH — 0.5 day off today (việc cá nhân về quê), other 0.5 day's James Diamond work covered by LongVV per Delivery - Resource Arrangement (confirmed 2026-07-30 15:34+07). No other leave for today found.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Slack — RDC/Franc | dmetiner posted an urgent direct request 2026-07-30 22:20+07 ("things I'm requesting for the powergroup domain and the two devices are urgent, can you please prioritize them?" — remove `monitoring.php`, create subdomains for 2 newly-delivered commercial devices) — still no team reply as of this report (~9h). |
| 2 | Email — rick@ | 14 new production Rollbar/BugSnag alerts: Fountain #298/#299, InfinityRoses #437, FirstProject #898 + "10 occurrences in 5 minutes" #127, FountainStaging cart_items#create error. |
| 3 | Performance — MPFC | Apdex dropped to **0.57** (poor). `JSON_API_User_controller::error()` jumped to **644** occurrences this window (was 16–38x on recent prior days) + `WP_Error::get_method()` 167x. SQLi `WAITFOR DELAY` probes back on `/search/`. `author-sitemap.xml` 44.0s, `sitemap_index.xml` 27.9s (both >5s threshold, chronic). |
| 4 | Performance — OhCleo | New/growing pattern: `IntegrityError` null `user_id` on `app_playhistory` insert — 4 occurrences this window (was 1x in the 07-29 report). `MediaAddTrackAPIView.post` spiked to 29.5s (1 call, new). `MediaByKeyView.get` still slow (8.0s avg / 247 calls). |
| 5 | Email — vuongtrancr@ | 8x New Relic "Signal lost for 10 minutes on 'Low Application Throughput'" incidents for Swish app. |
| 6 | Email — duongdn@ | New Relic account (our own NUS account) reports "no longer syncing data" — 2 notification emails, worth a manual check. |
| 7 | Matrix — Auction Warehouse (informational, being actively handled) | Team (duongdn + phucvt) discovered a **backdoor/gambling-site file** inside a `public_html.zip` copied from the client's (Brad Ballantine) server — confirmed present since a 2026-07-25 timestamp on the live server (code itself dates to 2024). Team is preparing to report to client with root-cause + rebuild-server recommendation. No action needed from this report, flagged for visibility. |
| 8 | Workstream (platform-wide, this session) | Workstream fully unreachable for the whole run — SSO login attempt hung (`spawnSync ETIMEDOUT`, no live browser/DISPLAY available in this session) after ~100s, killed manually. Blocks: Sheets hours verification for LongVV/PhucVT/KhanhHH/LeNH, Maddy JIRA cross-check, Arthur's Crystal lang hours. Needs an interactive login recheck from a session with a real desktop. |
| 9 | Trello — Maddy | Left open — LongVV/Kai hours and Kai's report-gate status unverifiable (Workstream down; Maddy Google Sheet summary tab reads all 0.00, consistent with full migration off Sheets, not evidence of a real 0h day). |
| 10 | Trello — Aysar | Left open — card is marked HIGH RISK by its own description; KhanhHH hours unverifiable this run (Workstream down). Baamboozle MPDM (Carrick's "Today's update") was posted on time, that half of the gate is clear. |
| 11 | Trello — Elliott | Left open — KhanhHH hours unverifiable this run (Workstream down). Generator Slack had only a light business-analyst task-assignment ask (Violet → Carrick), not itself concerning. |
| 12 | Trello — Blair Brown | Left open — LeNH's all-Workstream-projects scan unavailable this run (Workstream down). |
| 13 | Trello — Fountain | Left open — weekly plan message now **~10 days stale** (last real post ~07/21, none found searching back to Monday 07/27 morning); Parts 2-3 (task log actuals, plan vs actual) unavailable (Workstream down, Sheet W-tab empty); 1 customer question (kunalsheth, product-image-framing workflow, 2026-07-30 21:33+07) unanswered as of window end; 5 stuck Doing-list cards >5 days, incl. `[infinity Roses] Apple Pay User Activation Error` now **16.6 days** (>14d hard-to-release threshold, flagged before). |

**Today (Fri 31/07):** LeNH 0.5 day off (personal, going to hometown); other half's James Diamond work covered by LongVV. No one else on confirmed leave.

---

## Email — all 10 accounts — 07:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 6 | 2 — New Relic account sync lost (Alert #6) | no events |
| carrick@nustechnology.com | 4 | 0 | no events |
| nick@nustechnology.com | 12 | 2 — Azure DevOps PR notifications (John Yi client, informational not alerts) | 21:30 Weekly Meeting with Devs |
| rick@nustechnology.com | 22 | 14 — production Rollbar/BugSnag (Alert #2) | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| kai@nustechnology.com | 0 | 0 | no events |
| ken@nustechnology.com | 60 | 0 (expected GitHub PR/dependabot activity, welligence org) | 08:30 DE Standup Session, 09:00 DE Tech Talks, 08:30 DE Standup (dupes) |
| vuongtrancr@gmail.com | 8 | 8 — Swish "signal lost" incidents (Alert #5) | — |
| dnduongus@gmail.com | 14 | 0 real (Careerviet newsletter filtered — not a security alert per policy) | — |
| davidztv19@gmail.com | 5 | 0 (Meta-Stamp password reset + Slack notifications + Basecamp digest — no red flags) | — |
| freelancer@mypersonalfootballcoach.com | 3 | 3 — see MPFC Performance (Alert #3), same underlying errors | — |

Trello: DuongDn, Carrick, Nick, Rick, Kai, Ken ✓ complete (all 6 items — Check Mail card auto-closed).

---

## Slack — all 14 workspaces — 07:15 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 21 | Carrick's "Today's update" posted in MPDM (C07SQ4HAUHZ) 2026-07-30 19:03+07 — Aysar gate clear. General customer-success/sticker-shipment chatter, engineering CI bot noise. |
| RDC - FM Monitoring | 28 | **Alert #1** — dmetiner's urgent unanswered request. Otherwise routine tuner access-log/reboot bot noise. |
| Swift Studio | 0 | No activity — not an alert (low activity ≠ alert). |
| Xtreme Soft Solutions | 0 | No Kai daily-report message found; Workstream (needed to determine if he logged hours today, which gates whether a missing report is meaningful) unreachable — see Alert #9. |
| SAM GUARD - Mobile | 0 | No activity. |
| Global Grazing Services | 5 | Nick's daily report present in #maintenance (RDS DB CPU spike WARNING, self-resolving, + task list) — Bailey Slack gate clear. |
| Amazing Meds | 0 | No activity. |
| Generator | 1 | Violet asked Carrick for more tasks for Jeff/Carrick — internal resourcing ask, not a customer alert. |
| LegalAtoms | 0 | No Nick-specific activity. |
| MyPersonalFootballCoach | 13 | Internal Vietnamese dev discussion (freelancer/tien271) about iOS StoreKit 2 JWS receipt format + needing an App Store Connect API key before Aug 1 deadline — project dev topic, not a person-status alert. |
| William Bills | 0 | No activity. |
| Equanimity | 11 | Normal Marcel/Carrick project work (SGBuildex HDB BTO field requirements, AI-assisted dev estimate discussion) — no alert. |
| SoCal Auto Wraps | 0 | Dropped 2026-05-11, no longer monitored for a Trello item. |
| Aigile Dev | 1 | Automated Sentry morning digest: 0 urgent new, 0 non-urgent new, 6 standing (old, 1-23 days) unresolved — no new issue, Colin gate clear. |

Trello: John Yi, Rory, MPFC, Marcel, Raymond, Colin ✓ complete. **Maddy, Aysar, Elliott ⚠️ left open** (Alerts #9-11). **Franc ⚠️ left open** (Alert #1).

---

## Discord — AirAgri + Bizurk — 07:18 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | ~50 | Vinn's daily report present (13:19 UTC, investigate visitor-info loading, PR reviews, pagination discussion). Jeff Trinh's daily report present (10:27+07, 8h: PR review + TestFlight build, Spray app UI, Visitor App production deploy, Contractor App WIP). James Diamond pushing urgency for WhatsApp interface by next Friday. |
| Bizurk (nuscarrick) | 0 | No activity, no Andrew DMs. |

Trello: James Diamond - Vinn ✓ complete. Andrew Taraba ✓ complete.

---

## Scrin.io — 07:20 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-07-30):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Sheets — all developers — 07:26 (+07:00)

🔴 **Workstream fully unreachable this entire run** (Alert #8) — SSO login hung, killed after ~100s with no completion; the general Sheets scan itself also hit `spawnSync ETIMEDOUT` mid-run. This is the primary source for every project except Bailey, so LongVV/PhucVT/KhanhHH/LeNH hours cannot be confirmed from the canonical source this run.

**Google Sheets fallback (all 13 sheets scanned for 2026-07-30):**
| Developer | Sheets total | Notes |
|-----------|--------------|-------|
| LongVV | 0h | Expected — his current projects (OhCleo, Xtreme/Maddy) have fully migrated off Sheets. Matrix shows him actively working Celine-OhCleo tickets all day + explicit "this week 8h, today 4h, tomorrow 4h" commitment (14:07+07). **Not a real 0h day**, just unverifiable via the broken source — treat as unconfirmed, not alert. |
| PhucVT | 0h | Same pattern — Matrix shows him actively investigating a security backdoor on Auction Warehouse + Arthur/Crystal-lang work all day (09:59-15:50+07). Not a real 0h day. |
| TuanNT | **8h** (Paturevision) | Real, confirmed. Also fixed a live client bug this window (Prestashop→Console sync queue silently broken since March — added cron job + fixed a log-size-limit bug, confirmed working, to be added to his own daily report). |
| KhanhHH | 0h | No sheet data AND no direct Matrix/Slack activity evidence found this window. Genuinely unverified — needs recheck once Workstream is back, not confirmed as a real shortfall (repeated false-0h history on this dev specifically). |
| LeNH | 0h | Expected — active in James Diamond room (Vinn FB developer-account setup) same window; also on approved 0.5-day leave for today (07-31). Not a real 0h day for 07-30. |

**Maddy JIRA cross-check:** not run — the script itself queries the same broken Workstream endpoint (`spawnSync ETIMEDOUT`), skipping rather than guessing.

Trello: Bailey, Rebecca ✓ complete (TuanNT combined >0h across all sources gates both). **Maddy, Aysar, Elliott, Blair Brown ⚠️ left open** (Alerts #9, #10, #11, #12).

---

## Fountain — full 3-part check — 07:14–07:30 (+07:00)

**Part 1 — Matrix Plan:** No new weekly plan message found searching back to Monday 07/27 morning (checked the full week's window, 148 messages, no "Em update plan tuần này" found). Last known plan (from prior reports, originally posted ~07/21): ViTHT 32h, ThinhT 20h, VuTQ 8h, DatNT 40h => QC 25h. **Now ~10 days stale** — this keeps recurring (Alert #13).

**Part 2 — Task log actuals:** Unavailable — Workstream unreachable (Alert #8); direct query to the `fountain` project also timed out after 2 min.

**Part 3 — Plan vs Actual:** Unavailable (depends on Part 2).

**Trello board (Web Development / Fountain):**
- 3 new customer comments this window from kunalsheth: 2 approvals (Rails 8 upgrade "sounds good", scroll animations "looks good"), 1 open question about product-catalog image framing workflow (21:33+07, no reply yet as of window end).
- 5 stuck Doing-list cards (>5d): Stripe::InvalidRequestError (10.6d), **Apple Pay User Activation Error (16.6d, >14d hard-to-release)**, Gift of Choice/Business tab (9.9d), NoMethodError orders#status (8.6d), ActionView::Template::Error product_catalogs#create (6.9d).

Matrix room activity (36 msgs) shows the team actively triaging live bugs (checkout blank-page regression, Rollbar hotfix PR #462 under review by vutq) despite the stale plan.

Trello: Fountain ⚠️ **left open** (Alert #13).

---

## Elena — full flow — 07:21 (+07:00)

- Internal repo (`Elena-SamGuard-Digital-Plant`): 0 open PRs — nothing to merge/deploy.
- Precognize (`Precognize/development`, nusken account): 0 open PRs from nusken.
- WordPress SamGuard (`www.samguard.co`): clean — 0 JS errors, 0 page errors, 0 CSP violations. Only benign analytics/ads `net::ERR_ABORTED` noise (GA, DoubleClick, LinkedIn Insight), filtered per policy.
- Slack SAM GUARD - Mobile: 0 activity.

Trello: Elena - SamGuard ✓ complete. Elena - WordPress SamGuard ✓ complete.

---

## Trello — Check Progress + Check Mail — 07:33 (+07:00)

**Check Mail:** 6/6 complete ✅ — card auto-closed.

**Check Progress: 16/22 complete.**

Completed: John Yi, James Diamond - Vinn, Rory, MPFC, Marcel, Elena - SamGuard, Raymond, Neural Contract, Bailey, Andrew Taraba, Rebecca, Colin, Philip, Ohcleo, Arthur - Meta-Stamp, Elena - WordPress SamGuard.

Left open: Maddy (Alert #9), Aysar (Alert #10), Franc (Alert #1), Elliott (Alert #11), Fountain (Alert #13), Blair Brown (Alert #12).

Notes on specific completions:
- **Philip** — MS Teams check not run this cron pass (not part of the 13-piece cron sequence, browser-based). No known blocker carried over from prior runs; per established policy an unrun automated check ≠ alert. Recommend a manual/interactive recheck.
- **Neural Contract** — Upwork check attempted (4 retries), carrick's Chrome Profile 1 cookie extraction returned 0 cookies each time (profile/session not present on this execution host, not evidence of an actual Upwork logout). Completed per "silence/access-block ≠ alert" policy; no known blocker from prior runs.
- **Ohcleo** — Celine sent a Slack DM (09:22+07 07-30) summarizing the day + asking for a review + a meeting tomorrow re: activating the new SES marketing email flow (needs audio-track visibility in admin). The team (LongVV/Hung Pham/Minh Trinh) was actively and extensively engaged with her all day via Matrix (83 messages — Trello ticket videos, bug/question triage), so this reads as an end-of-day wrap-up, not neglect. No reply visible to the Slack DM itself yet — worth a follow-up tomorrow but not withheld as an alert given the day's engagement level.
- **Arthur - Meta-Stamp** — Matrix (both rooms) + GitHub verified clean (M2 released PASS, M3 estimate in progress, 0 open PRs/0 new commits, consistent with pre-code stage). Slack "Solid Code" and Workstream (Crystal lang) both unavailable this run (recurring gap + Alert #8) — completed per the same partial-verification precedent used on 2026-07-18/07-22/07-30. See `reports/2026-07-31/0728-arthur-monitor.md`.

---

## Reminders — 07:34 (+07:00)

No reminders sent (no `--send-reminder` flag). Given Workstream is down this entire run, the "0h" readings for LongVV/PhucVT/KhanhHH/LeNH in Sheets are not reliable evidence of an actual 0h day (see Sheets section) — sending a "task log missing" message today would risk the exact false-positive incident already documented in memory (KhanhHH, 2026-07-09). No reminders printed this run; recommend rerunning Reminders once Workstream access is restored.

---

## Matrix — 07:21 (+07:00)

**Active rooms: 23 / 138 | Messages: 575** *(since 2026-07-30 08:47 +07:00)*
Full details: reports/2026-07-31/matrix-rooms-0721.md

### ⚠️ Action items for DuongDN (5, auto-detected)

| Room | Time | Message |
|------|------|---------|
| Celine - OhCleo | 09:34 | longvv: "e đang kẹt tracker dự án khác r á, cần support trong sáng thì e nhờ a Dương giúp e nhe" — LongVV flagged he's tied up with another project's tracker, asked for duongdn's help if needed that morning. No further ask visible — appears self-resolved by afternoon (LongVV back to actively handling Celine's tickets). |
| Celine - OhCleo | 09:37 | minhtv: "Phải cần sự phối hợp của bên a Dương nữa" — same thread, needing duongdn's coordination on a specific ticket. Resolved inline later in the room. |
| Delivery Department | 08:56 | namtv: project-transfer notice (ThinhPVD → Graco DMS Integrations) — informational, no action needed. |
| Những chú voi con đáng yêu | 08:56 | phucvt reply in a casual chip-technology chat — false-positive match on the action-item regex, no real ask. |
| PHP Projects | 16:58 | chientx: "vẫn có vấn đề gì vậy a Dương? A Năm check trên room đó thử ah" — asking if the Marcel device-connectivity issue is still ongoing. Ties to duongdn's own earlier frustration in the room (11:51+07: "yêu cầu dừng communication luôn... nói mãi éo hiểu" re: repeated device-connect-to-server failures). Still open as of window end — worth a follow-up. |

### Key updates

**Security incident — Auction Warehouse (Brad Ballantine):** See Alert #7. duongdn + phucvt discovered a hacked/backdoored `public_html.zip` copy on the client's server (gambling-site HTML + a backdoor file), confirmed present since ~2026-07-25 despite the app code itself dating to 2024. Team preparing to report to client with root-cause explanation and a rebuild-server recommendation.

**Bailey/Paturevision — resolved bug:** TuanNT found and fixed a Prestashop→Console sync queue that had been silently stopping since March (missing cron job + a log-file-size-limit bug) after a client complaint about manual queue restarts. Confirmed working, being added to his own daily report.

**Arthur - Meta-Stamp:** M2 released PASS (client tested, after duongdn's team reset a forgotten password for him). New small M3 scope item (per-pull pricing config, still on $0.0025 demo value) — estimated ~3h, flagged to client as outside original scope pending their confirmation. See dedicated report.

**Elena - Active Alerts (Precognize, 155 msgs):** Dev team (kietnht/anhttl/tuanntg/dongnv/samht) deep in internal debugging of investigation-ID display/link-unlink audit-log logic — internal technical work, not customer-facing.

**Resource planning:** LeNH's 0.5-day leave for today confirmed and covered by LongVV. HaVS's planned trip (24-25/08) noted for later. AnhNH2's ID-renewal day (07-31) counted as internal/idle time.

**Other:**
- James Diamond - Portfolio: LeNH + team setting up a placeholder Facebook developer account ("Vinn Vinn") for the client's WhatsApp integration request, since no real account/gmail exists for Vinn yet.
- PHP Projects: Marcel's device-connectivity issue continues to resurface (duongdn expressed frustration, asked to pause further communication on it and focus elsewhere); chientx flagged it's apparently still unresolved (16:58+07).
- NUS Technology: light internal culture/banter channel (newsletter release, team jokes) — no action items.

---

## OhCleo Slack — 07:23 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 1 | Celine: moved several Trello cards + added bug/comment cards, wants a review + meeting tomorrow on priorities/workflow. Priority ask: activate the new SES marketing email flow, needs ability to add audio tracks to emails + see relevant tracks in admin first. |
| #events-code | — | `channel_not_found` this run (channel may have been archived/renamed — same channel worked in prior runs, worth a config check next time, not treated as an alert). |

Tony's (LongVV) formal Slack report not posted in this DM window, but Matrix (Celine-OhCleo room, 83 msgs) shows him and the team actively working her tickets all day, plus his own "this week 8h, today 4h, tomorrow 4h" commitment — missing Slack-specific report ≠ 0 effort here, not treated as alert per policy.

Trello: Ohcleo ✓ complete.

---

## Performance — all 4 projects — 07:17 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.95 | 259ms | 1.82% (512/28107) — 92% benign NotAuthenticated/InvalidToken | 20.8/min |
| MPFC | **0.57 (poor)** | 1027ms | 1.93% (821/42542) — mostly the two known JSON_API/WP_Error bugs, now much higher volume | 31.4/min |
| Fountain Gifts | 0.99 | 132ms | 0.02% (7/36122) | 26.7/min |
| InfinityRoses | 0.97 | 172ms | 0.04% (5/13573) | 10.0/min |

**OhCleo — top errors:** 471 NotAuthenticated (benign), 16 InvalidToken (benign), 6 ValidationError (duplicate email), 4 AuthenticationFailed (bad password), 3 ValueError (invalid bcrypt hash), 2 AuthenticationFailed (user not found), **4x IntegrityError — null `user_id` on `app_playhistory` insert (new/growing, Alert #4)**.
**OhCleo — slowest:** `MediaAddTrackAPIView.post` 29552ms/1 call (Alert #4), `MediaByKeyView.get` 7992ms/247 calls, `HomeMediasView.get` 2281ms/455 calls, `CreatorVerificationSubmitView.post` 1712ms/1, `CreatorPayoutHistoryView.get` 1276ms/1.

**MPFC — top errors:** 644 `JSON_API_User_controller::error()` (Alert #3, sharply up from 16-38x in prior reports), 167 `WP_Error::get_method()`, 4 mysqli_real_connect warnings, 3 "continue targeting switch" warnings, 1 each: undefined `add_action()`/`get_header()`/`MM_Event` not found.
**MPFC — slowest:** `author-sitemap.xml` 44044ms/1, `sitemap_index.xml` 27888ms/2, 3x SQLi `WAITFOR DELAY` probe pages on `/search/` (17.4s/13.5s/13.3s) — probes recurring, not new but still present.

**Fountain — top errors:** 6 ArgumentError (wrong arg count), 5 InvalidAuthenticityToken (CSRF, normal), 1 BadRequest (EOFError), 1 `undefined method 'title' for nil:NilClass` (matches rick@ email #294-297, already known).
**Fountain — slowest:** `paypals/authorize_order` 3613ms/1, `payment_intents/create` 1652ms/45, `order_items/accept_giftdrop` 1057ms/2, `MailchimpWorker` 1037ms/3, `users/registrations/create` 983ms/3.

**InfinityRoses — top errors:** 5 InvalidAuthenticityToken (CSRF, normal). No new/unusual errors.
**InfinityRoses — slowest:** `paypals/authorize_order` 2705ms/1, `payment_intents/create` 2539ms/2, `search/search` 1921ms/46, `users/validate_with_mailgun` 1258ms/1, `EmailWorker` 1165ms/12.

---

## Arthur / Meta-Stamp — 07:28 (+07:00)

See full report: `reports/2026-07-31/0728-arthur-monitor.md`. Summary: no new client-facing issue. M2 released PASS, small new M3 scope item under estimate. Matrix + GitHub verified clean; Slack "Solid Code" (workspace missing from this server's config, cookie re-extraction returned 0) and Workstream (Crystal lang, Alert #8) both unavailable this run.

---

## Unresolved questions

- Workstream (Alert #8): needs an interactive login session with a real desktop/browser to restore access — cannot be fixed from this headless session. Recommend a manual `DISPLAY=:1 node scripts/workstream-login.js` from an interactive session.
- Slack "Solid Code" (Arthur workspace): config gap recurring across many days now — needs David to re-extract his Chrome Profile 15 cookie directly, not fixable by script alone from this server.
- OhCleo `#events-code` channel returned `channel_not_found` — may need a channel-ID check (renamed/archived?) before next run.
- KhanhHH: genuinely no activity evidence found anywhere this window (Sheets, Slack, Matrix, Discord) — flagging for closer attention next run once Workstream is restored, given her history of new/undiscovered task-log sources.
- RDC/Franc (Alert #1) and the Fountain image-framing question (Alert #13) both remain unanswered as of report time — may need direct follow-up rather than waiting for the next monitoring cycle.
