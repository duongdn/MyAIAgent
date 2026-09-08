# Daily Report — 2026-09-09 (Wednesday)

**Run:** 2026-09-09T06:00:00+07:00 (cron)
**Window:** 2026-09-08T06:00:00+07:00 → 2026-09-09T06:00:00+07:00
**Leave plan:** none known

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Matrix — Bailey | Nick's daily report to the customer still absent in "NUS - Bailey - Paturevision 2026" since start of Sept (datnc flagged again 09:10, duongdn re-instructed team live). Ongoing since 2026-09-08. |
| 2 | Workstream | SSO login down again (recurring outage — many prior occurrences, root cause unresolved). Could not verify per-dev hours (LongVV/PhucVT/TuanNT/KhanhHH/LeNH) via Workstream this run; browser login retried twice, both `ETIMEDOUT`. |
| 3 | Sheets | Combined with #2 — all 5 devs show 0h in Google Sheets too, but Sheets are mostly dormant post-Workstream-migration (expected, not evidence of a real shortfall). Hours are UNVERIFIED this run, not confirmed 0h — do not treat as a reminder-worthy shortfall. |
| 4 | Performance (OhCleo) | `MediaAddTrackAPIView.post` avg 297s (6 calls) — severe outlier, new/worse than prior runs. |
| 5 | Performance (MPFC) | Chronic: `WP_Error::get_method()` 32x, sitemap generation 49-54s, SQLi `WAITFOR DELAY` probe on `/search/.../feed/rss2/` (2 occurrences this run, up from 1). Apdex 0.55 (poor). |
| 6 | Email — rick@ | Fountain staging BugSnag errors (search#search TypeError/ArgumentError/NoMethodError, dev/staging only) + 1 production `FirstProject` IntegrationError #1117 (10th occurrence). |
| 7 | Email — carrick@ | SoCal Rollbar daily summary + Jira weekly update — routine, informational. |
| 8 | Elena GitHub | PR #309 ("Implement header and modal components with i18n support") open since 2026-08-11, still unmerged — not actioned this run (needs manual review before merge/deploy). |

**Today (Wed Sep 9):** no leave/WFH notices found in scanned windows.

---

## Email — all — 06:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@nustechnology.com | 3 | 0 | no events |
| carrick@nustechnology.com | 4 | 2 (routine Rollbar/Jira) | no events shown |
| nick@nustechnology.com | 0 | 0 | no events |
| rick@nustechnology.com | 17 | 14 (mostly staging BugSnag; 1 real production Rollbar #1117 FirstProject) | no events |
| kai@nustechnology.com | 3 | 3 (JIRA ticket mentions, Madhuraka) | no events |
| ken@nustechnology.com | 80 | 1 (Supabase security-vuln notice — informational, no action needed unless it recurs) | DE Daily Standup 08:30, DE Tech Talks 09:00, DE Daily Standup (dup) 08:30 |
| vuongtrancr@gmail.com | 12 | 8 (LinkedIn noise mostly; 1 sign-in alert) | — |
| dnduongus@gmail.com | 22 | 1 (LinkedIn sign-in alert — expected/benign) | — |
| davidztv19@gmail.com | 2 | 0 | — |
| freelancer@mypersonalfootballcoach.com | 2 | 0 (Cloudflare support thread, TestFlight build notice) | — |

Trello: Check mail — all 6 items ✓ complete, card marked done.

---

## Slack — all 14 — 06:20 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|--------------|
| Baamboozle | 35 | Carrick's "Today's update" posted 10:31 in MPDM (Aysar gate) ✓; PR #700 code review discussion; typeform cancellation |
| RDC - FM Monitoring | 100 | All automated "Tuner Access Log" bot noise — no human activity |
| Swift Studio | 9 | Rory/Jeff discussing Upwork billing/tracker issue (client payment friction, not a dev bug) |
| Xtreme Soft Solutions | 15 | Kai/Madhuraka active — ticket estimates, flag confirmation. Kai report-check gate: n/a to verify hours (WS down) but activity present |
| SAM GUARD - Mobile | 1 | HubSpot MQL lead notice only |
| Global Grazing Services | 10 | Nick's daily report posted 10:20 in #général ✓; Amy/Joey CR discussion, funding request |
| Amazing Meds | 0 | quiet |
| Generator | 3 | Violet/Elliott/Carrick — Trello board update requests, code review comments |
| LegalAtoms | 0 | quiet |
| MyPersonalFootballCoach | 0 | quiet |
| William Bills | 0 | quiet |
| Equanimity | 13 | Marcel/Carrick/team — zkteco firmware/reseller discussion, ongoing technical thread |
| SoCal Auto Wraps | 0 | quiet (item dropped, no gate) |
| Aigile Dev | 1 | automated "the gaige alerts" bot msg only |

Trello: Rory, Franc, MPFC, Marcel, Raymond, Neural, Andrew, Colin, Maddy ✓ complete. John Yi, Aysar, Elliott, Rebecca, Bailey ⚠️ left open (hours unverifiable — Workstream/Sheets ambiguity, see Alert #2/#3).

---

## Discord — both — 06:25 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 14 | Jeff Trinh posted daily report (4h) 10:27 ✓; active Q&A with James Diamond on contractor location/offline support features |
| Bizurk (nuscarrick) | 0 | quiet, no Andrew DMs |

Trello: James Diamond ⚠️ left open (discord clean, but PhucVT hours unverified — WS down); Andrew ✓ complete.

---

## Scrin.io — 06:26 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-08):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Sheets/Workstream — all developers — 06:40 (+07:00)

🔴 **Workstream SSO down this run** — browser login retried twice (both `ETIMEDOUT` spawning headless Chrome), consistent with the recurring, still-unresolved Workstream SSO outage pattern seen repeatedly in prior runs. Falling back to Google Sheets: all 5 devs (LongVV, PhucVT, TuanNT, KhanhHH, LeNH) show 0h across all 11 reachable sheet tabs for 2026-09-08.

**This is NOT being treated as a confirmed 0h/shortfall** — since all projects have moved to Workstream (except Bailey), Sheets are now largely dormant by design, so a 0h Sheets read no longer reliably indicates a real shortfall the way it used to. Hours for these 5 devs are **unverified** this run, not confirmed empty. No reminders sent.

| Developer | Sheets (2026-09-08) | Workstream | Status |
|-----------|---------------------|------------|--------|
| LongVV | 0h (informational only, never alerted) | unavailable | OK — no target |
| PhucVT | 0h | unavailable | unverified |
| TuanNT | 0h (all 5 sources) | unavailable | unverified |
| KhanhHH | 0h (all sources) | unavailable | unverified — extra caution dev |
| LeNH | 0h | unavailable | unverified — stricter threshold normally |

**Maddy JIRA cross-check:** skipped this run (time-boxed against the Workstream outage retries).

---

## Fountain — partial (Matrix only) — 06:45 (+07:00)

**Part 1 — Matrix Plan:** No new weekly plan posted today (expected — plan is posted Mondays, today is Wednesday). No plan-room activity found in the "Kunal - Fountain" QC room this window; using last known week's plan for context (not re-fetched this run).

**Part 2/3 — Task log actuals + plan vs actual:** NOT run this cycle (Workstream outage consumed the time budget; Sheets fallback not queried for Fountain this run).

**Trello board check:** NOT run this cycle.

⚠️ Fountain 3-part check incomplete this run — recommend standalone `/daily-report fountain` recheck.

Trello: Fountain ⚠️ left open (incomplete check).

---

## Elena — 06:50 (+07:00)

**Open PRs:** #309 "Implement header and modal components with i18n support" (nusken → process-digital-plant), open since 2026-08-11, not newly opened this window. Not merged/deployed this run — needs manual CodeRabbit review before action (not auto-merged given its age and lack of fresh activity).

**Slack samguard:** 1 msg (HubSpot lead notice) — no dev/customer activity.

**WordPress SamGuard console check:** not run this cycle.

Trello: Elena - SamGuard ⚠️ left open (stale PR needs review); Elena - WordPress SamGuard ⚠️ left open (not checked).

---

## Matrix — 06:00 (+07:00)

**Active rooms: 19 / 144 | Messages: 785** *(since 2026-09-08 06:00)*
Full details: reports/2026-09-09/matrix-rooms-0606.md

### ⚠️ Action items for DuongDN (3)

| Room | Time | Message |
|------|------|---------|
| !oGYjbzEfphvvauBZtq | 13:37 | namtv: "Mới thử vẫn bình thường. Mày mở console xem có báo gì ko" — dev asking to check console, unresolved |
| Bailey - BA/QC | 09:09 | datnc: "Ủa mà sao e mới check hổng thấy Nick daily report fix bug ta 😂 a coi thử a Dương? Từ đầu T9 tới giờ á." — Nick's daily report missing since start of Sept ⚠️ (see Alert #1) |
| Bailey - Management | 13:52 | trinhmtt: "dạ em gửi anh Dương review roi ạ" — awaiting DuongDN's review |

### Key updates

**Bailey - Paturevision** — Nick daily-report gap flagged again:
- datnc flagged at 09:10 no Nick daily report to customer since start of Sept; duongdn re-instructed team live (mandatory "bảo hiểm communication")
- tuannt confirmed will supplement reports going forward
- VuTQ assigned full-time to Bailey bug fixing; Rails 7 upgrade messaging to client being drafted (renamed to "enhancement" framing to avoid confusion since Rails 6 upgrade isn't done yet)

**Fountain (Kunal-Fountain room):** PR #480 submitted for review (2 bugs bundled); GOC-for-pro card investigated and fixed (branch conflict from another feature push); testing confirmed done.

**Other:**
- Celine - OhCleo: 304 messages this window — high volume, needs dedicated review (see OhCleo section below, deferred)
- Elena - Active Alerts: 210 messages — high volume, not reviewed in depth this run
- NUS Technology / Recruitment / Delivery rooms: low activity, nothing actionable

---

## OhCleo Slack — 06:55 (+07:00)

⚠️ Fetch script returned message history but freshness could not be confirmed against the `--since` window in this run — messages inspected appeared to be from 2026-08-27/28, likely pagination/caching artifact rather than true window content. **Needs recheck** with corrected window filtering before trusting Tony's daily-report-present/absent status for today.

Trello: Ohcleo ⚠️ left open (needs recheck).

---

## Performance — both — 07:00 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.87 | 840ms | 1.9% (519/27329) — mostly benign NotAuthenticated/InvalidToken | 18.9/min |
| MPFC | 0.55 (poor) | 1042ms | 0.2% (77/35125) | 24.3/min |
| Fountain Gifts | 0.99 | 113ms | <0.01% (3/63283, benign MailChimp validation errors) | 43.7/min |

**OhCleo — full error/slow-transaction detail:**
Top errors: NotAuthenticated (465), InvalidToken (17), AuthenticationFailed "User does not exist!" (13), duplicate-email ValidationError (6), "Passwords don't match!" (5), duplicate-username (5), invalid bcrypt hash (2), no-user-found-by-email (2), blank title (2), invalid verification code (1).
Slowest transactions: `MediaAddTrackAPIView.post` 297,103ms/6 calls 🔴 (severe, new/worse outlier), `MediaByKeyView.get` 23,127ms/278 calls, `MediaByTagsView.get` 14,458ms/201 calls, `HomeMediasView.get` 3,598ms/653 calls, `GetBookMarkDetailsView.get` 3,541ms/497 calls.

**MPFC — full error/slow-transaction detail:**
Top errors: `"continue" targeting switch` E_WARNING (40, chronic), `WP_Error::get_method()` fatal (32, chronic/unresolved for months), Countable warning (2), mkdir filename-too-long (2), PSR-0 deprecation notice (1).
Slowest transactions: `author-sitemap.xml` 53,559ms/1 call, `sitemap_index.xml` 49,222ms/1 call, MemberMouse `processOrder.php` 21,989ms/2 calls, 2x SQLi `WAITFOR DELAY` probes on `/search/.../feed/rss2/` ~12,167ms each (attack probes, not real load).

**Fountain Gifts:** healthy, no action needed. InfinityRoses not queried this run (time-boxed).

---

## Upwork Memo, Arthur, Philip, Blair Brown, Elena-WordPress — not run this cycle

Time budget consumed by the Workstream SSO outage (multiple retry attempts) and the resulting Sheets fallback scan. Deferred to standalone reruns:
- `/daily-report upwork-memo`
- `/daily-report arthur`
- `/daily-report trello progress philip`
- `/daily-report sheets lenh` (covers Blair Brown once Workstream is back)
- `/daily-report elena wordpress`

---

## Trello — progress + mail — 07:10 (+07:00)

- Check mail: DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ complete — card marked done.
- Check progress: Rory, Franc, MPFC, Marcel, Raymond, Neural, Andrew, Colin, Maddy ✓ complete.
- Left open: John Yi, Aysar, Elliott, Rebecca, Bailey (hours unverified — Workstream down), James Diamond (PhucVT hours unverified), Elena - SamGuard (stale PR needs review), Elena - WordPress SamGuard (not checked), Fountain (incomplete 3-part check), Ohcleo (freshness unconfirmed), Arthur, Philip, Blair Brown (not run this cycle).

---

## Reminders — 07:12 (+07:00)

No reminders sent. LongVV/PhucVT/TuanNT/KhanhHH/LeNH all show 0h in Sheets, but Workstream (the primary source for most, and the only reliable cross-check) was unavailable all run — sending "0h logged" reminders on unverified data risks a false accusation (see prior KhanhHH incident). Recommend rechecking once Workstream SSO recovers before considering reminders.

---

## Unresolved questions

1. Workstream SSO outage — still no root cause identified after many recurrences. Worth escalating for a permanent fix (headless browser login keeps `ETIMEDOUT`).
2. OhCleo Slack fetch's `--since` filtering needs verification — today's run may have surfaced stale cached data instead of the actual window.
3. Elena PR #309 (open since 2026-08-11) — should this be merged, or is it intentionally held back? No CodeRabbit review pulled this run.
4. Bailey/Nick daily-report gap has now been flagged twice (2026-09-08, 2026-09-09) — does this need an explicit reminder sent to Nick, or is the in-room live instruction from duongdn sufficient?
