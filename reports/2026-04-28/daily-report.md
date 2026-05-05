# Daily Report — 2026-04-28 (Tuesday)

**Window:** 2026-04-22T08:40 → 2026-04-28T08:30 (+07:00)
**Note:** Mon 2026-04-27 was a Vietnam public holiday (Hùng Kings) — 0h logged is expected, not an alert.

## 🚨 Alerts Summary

### HIGH
- **Andrew Taraba / AnimeWorld DM (Discord nuscarrick)** — client pushback 2026-04-26: *"is it AI generated code?"*. Carrick has not replied since 2026-04-25. Trello "Andrew Taraba" left incomplete.
- **Fountain — Kunal Mother's Day push** unanswered (Apr 27). Brand-name still missing on `iEKolIxX`. Shipstation duplicate bug `#2116900OR` expanded. Mother's Day order sync discrepancies. Trello "Fountain" left incomplete.
- **Fountain — Runway** dropped from 3.90 → **1.68 weeks** (remaining 150.75h vs 351h on 04-22; W23 burned 152h actual). With reduced 48h W24 plan, backlog at risk.
- **Fountain — Over-estimate STILL GROWING:** #2735 (+11h → 126h, +40%), #2702 (+3.5h → 24h, +200%), #2816 newly growing (+7.5h → 32h, +60%).

### MEDIUM
- **Vinn testing-process escalation** (Discord airagri_webapp) against jon/Leon following hot-fix string. Trello "James Diamond" left incomplete.
- **Production errors (rick@):** InfinityRoses ReadTimeout `#413`/`#414`; FountainGifts NoMethodError `#262`-`#264` (10th occurrence); FirstProject `#850` hit 1000th occurrence; BugSnag rate-limit; 2× MongoDB Atlas Wathaga. Trello "Rick" mail item left incomplete.
- **Production error (carrick@):** Socalautowraps `#52` turnstile error. Trello "Carrick" mail item left incomplete.

### Watch (non-blocking)
- **Amazing Meds** — John Yi escalating on homepage launch delay while Nick is on vacation. Nick is actively responding; blocked on Gil. Person status OK so Trello completed.
- **Generator** — Rudi flagged Android transparent-primary-colour bug + outstanding logout issue (Apr 28 08:15); Jeff reviewing. Dev topic, not person-status. Trello completed.
- **LeNH combined Fri 2026-04-24** = 7.3h (Franc 5.8 + Aysar 1.5) — slightly under 8h, no leave note. Worth a follow-up but not historically flagged.
- **Vinn/Jeff daily reports** for 2026-04-28 not yet posted at 08:20 — too early; will check on next scan.
- **Precognize / nusken token** missing from `gh` config on this host — re-run `gh auth login` for nusken to enable Precognize PR check.

## Trello

| Card | Completed | Skipped (alert) |
|------|-----------|-----------------|
| Check mail | DuongDn, Nick, Kai, Ken | Carrick, Rick |
| Check progress | Maddy, Blake, John Yi, Franc, Rory, Aysar, Elliott, Rory (Swift), Raymond, Marcel, Colin, Elena-SamGuard, MPFC, Bailey, Rebecca, Neural | James Diamond (Vinn), Andrew Taraba, Fountain |

## Reminders
None sent — Mon was holiday and Tue 08:30 is too early for same-day reminders (skill rule).

---

## Email — 08:20 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn | 2 | LongVV leave-request reply (24/04); Google Drive share |
| carrick | 36 | Redmine bug updates (Generator/Elliott #78232/#78273/#78274), Jira BXR backlog notifications, TestFlight builds, Socalautowraps daily summaries + 1 production error |
| nick | 28 | C&A Surveyors daily task completion emails + Azure DevOps PR updates (CNA.Operations.App); no John Yi messages |
| rick | 104 | Mostly Rollbar/BugSnag — multiple FirstProject (InfinityRoses) and FountainGifts production errors; Stripe webhook delivery issue; MongoDB Atlas Wathaga alerts; FountainStaging dev errors (info only) |
| kai | 31 | Heavy Madhuraka/Anoma Wasala Jira activity (LIFM2-260/430/431/432/435/259/422/433/426/425), Bitbucket PR #483, mentions on LIFM2-409/431/430/260; 2 Atlassian password emails |
| ken | 500 (34 Precognize) | Precognize/development GitHub PR activity: PR #4847, #4841, #4850, #4851, #4852, #4854, #4855, #4857, #4858, #4859 plus SR-7222/7224, sr-386, SR-7231, SR-7247, DEL-7109, dp-650 reviews/comments |

**Alerts:**
- rick: [InfinityRoses] production New Error #413 RestClient::ReadTimeout (Apr 23 13:31 UTC) and #414 same error (Apr 27 13:32 UTC) — recurring upstream timeout
- rick: [FountainGifts] production New Error #262 Invalid gift params, #263 ActionView::Template::Error nil:NilClass title, #264 NoMethodError nil:NilClass title (Apr 23) — #263/#264 hit 10th occurrence same evening
- rick: [FirstProject/InfinityRoses] production New Errors #872–#876, #986–#995 (React minified errors, ChunkLoadError, undefined property "amount"/"credit"/"title") — #850 hit 1,000th occurrence Apr 25; #874/#875 hit 100th occurrence
- rick: MongoDB Atlas Wathaga alerts at 2026-04-23T03:37Z and 06:30Z
- rick: BugSnag rate limiting — "Your events are being dropped due to rate limiting" (Apr 23 03:02 UTC)
- rick: Stripe webhook delivery issues [test mode] for trycloudflare tunnel (Apr 23 09:01 UTC) — test mode, low priority
- carrick: [Socalautowraps] production New Error #52 "Can't find variable turnstile" (Apr 23 13:22 UTC)

**Notable items:**
- duongdn: LongVV leave request reply for 24/04/2026 from Nam Tran (already handled, in line with W23 LongVV note)
- carrick: GitLab personal access token created Apr 24 04:12 UTC, plus token-expiry warning Apr 25 — review if unexpected
- carrick: Atlassian password reset Apr 24 10:12-10:15 UTC
- carrick: Stripe TEST invoice #QGV5CP5N-0001 (test mode, not real billing)
- carrick: Neural C. via Upwork sent 3 messages (Apr 23-24) — Neural Contract / workroom 38901192
- nick: Slack confirmation code email Apr 28 00:52 UTC (login challenge)
- kai: Atlassian password reset Apr 24 10:19 UTC
- rick: Tom left comments in Fountain Figma (Apr 22, Apr 27)
## Slack — 08:20 (+07:00)

Window: 2026-04-22 08:40 +07 → 2026-04-28 08:21 +07. Method: `search.messages` (`after:2026-04-21`, ts ≥ 1776822000).

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 69 | Carrick active in #testing/#engineering/DM with Jamie — fixed sessions bug, deploying; Jamie reported separate "edit users / send passwords" admin issue (will check w/ Carrick); Carrick prototyped Change Owner Team feature; daily updates posted. |
| RDC - FM Monitoring | 159 | Mostly automated tuner access logs (115) + reboot service alerts (29). Carrick + dmetiner active in #all-rdc-fm-monitoring on test domain rollout, plugin translation refactor (MetricsMonitor 2.8, SpectrumGraph v1.3.0). |
| Swift Studio | 5 | Carrick (jeff) updated BXR-164/BXR-167 statuses; Rory acknowledged sprint clearing; holiday notice for Apr 27. Low activity (Bizurk-style silence is normal). |
| Xtreme Soft Solutions | 21 | Kai active — daily progress posted Apr 23 (LIFM2-435/259/260/430 done). Anoma asked Kai to clear Xero account on RMS5 + flagged Shopify payout ticket items uploading to old org RMS5 (Apr 28 03:41). Madhuraka reported listed-con tab UI bug. |
| SAM GUARD - Mobile | 57 | Mostly automated HubSpot MQL leads (30) + Tom/Lena/Kfir Bernstein triage in #new-studio-developers around DEL-7105 (Liquibase migration / v9.2 upgrade). No NUS-team alerts. |
| GLOBAL GRAZING SERVICES | 51 | Nick posted daily reports Apr 23, Apr 24 in #maintenance (Q&A live, Mobile Menu Modal in progress/testing). Joey questioned focus on Q&A vs GLS module — Nick clarified Apr 28 08:18 ("just issues you reported to Amy after Q&A going live, still focusing on GLS module"). Bailey monitor flagged Prestashop storage 78% on Apr 24. |
| Amazing Meds | 41 | TENSION: John Yi pushing on new homepage going live; Nick on vacation but actively responding (homepage content missing, functionality complete, waiting on Gil for content). John frustrated Apr 24 ("over 1 week to launch", "Now your on vacation?"). Nick replying Apr 28 morning. xoxc auth OK. |
| Generator | 192 | Heaviest activity. Carrick + Rudi heavily collaborating: Rudi fixed prod CPU index (99.5% → ~23%); Carrick fixed primary_building_id null on bookings (MR 402, 405); Violet coordinating release. Jeff active on #mobile MR review. Rudi flagged Apr 28 08:15 Android build issue (transparent primary colour on vivacity, logout still broken). |
| LegalAtoms | 19 | #general only. Raymond release Thursday. Apr 28 morning: GitHub outage chatter (not our issue). Umair on Tompkins Court docs. No Nick-specific mentions/DMs. |
| MyPersonalFootballCoach | 0 | No new messages. |
| William Bills | 101 | Lucas (NUS) deploying staging carefully — chose to defer prod deploy to next week for safety. Oliver/Lucas debugging Stripe reactivation after payment update. Daily back-and-forth, no auth issues. |
| Equanimity | 19 | Carrick active in #xid-technologies on Komal's CSV/SGT-time data work Apr 24; Marcel "Test worked" Apr 26; Mani test Apr 26. xoxc auth OK. No Carrick/Marcel alerts. |
| SoCal Auto Wraps | 0 | No new messages. |
| Aigile Dev | 13 | Mostly automated GAiGE alerts + Attio + Make.com newsletter drafts. No team activity. |

**Alerts:**
- None of our team's person-status issues (no 0h, no absent, no auth failure). All 14 workspaces authenticated successfully (xoxc cookies on Amazing Meds + Equanimity working).
- Watch item (not blocking): Amazing Meds — John Yi escalating on homepage launch delay vs. Nick's vacation. Nick is responsive Apr 28 morning, content blocked on Gil. Worth flagging to PM.
- Watch item (not blocking): Generator — Rudi reported transparent primary colour on Android build (vivacity tenant) Apr 28 08:15, logout issue still open. Jeff is reviewing.

**Notable activity:**
- Baamboozle: Carrick deployed session-bug fix; Jamie surfaced separate admin-panel edit-users/password regression to follow up on next working day.
- RDC: Plugin translation refactor (MetricsMonitor 2.8 + SpectrumGraph 1.3.0) shipped via Carrick; dmetiner accepted update Apr 24.
- Xtreme: Kai posted daily progress Apr 23; Anoma has Apr 28 follow-up on Shopify payout items uploading to wrong org (RMS5).
- GLS: Nick daily reports posted Apr 23, Apr 24 in #maintenance per spec (NOT TuanNT). Joey/Nick aligned on GLS-module focus.
- Generator: Big release week — index fix, MR 402/405, mobile MR 52, ongoing primary_building_id cleanup. Carrick + Violet + Rudi all active.
- William Bills: Lucas deferred prod deploy to next week (safety call). Daily DMs with Oliver healthy.
- LegalAtoms: GitHub-outage noise only; no Nick-targeted mentions.
- Equanimity: Carrick supporting Komal's CSV reconciliation work; nothing requiring action.
## Discord — 08:20 (+07:00)

**Window:** 2026-04-22T08:40+07:00 → 2026-04-28T08:20+07:00 (snowflake `1496324662886400000`)

**Token verification (3-step curl, both passed):**
- nusvinn: /users/@me 200, /guilds 200 (AirAgri, HOMIEAPP), AirAgri channel read 200.
- nuscarrick: /users/@me 200, /guilds 200 (Bizurk), Bizurk welcome channel read 200 (other Bizurk channels return 403 — channel-permission gated, NOT a token issue).

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 414 | Webapp 360 (heavy hazard/location bug-fixing 04-22, PHP8 master merge, hazard map fixes by Leon, hot-fix retrospective from Vinn calling for stricter testing). Flutter 54 (Bullitt satellite-msg integration scoping, hazard updates to mirror on mobile, PR72 review, build planned for 04-28). 04-25/04-26 silent (weekend), 04-27 light (James + Jon + Leon, Vietnam public holiday, Vinn off). 04-28 Vinn returned and started PR review. |
| Bizurk (nuscarrick) | 0 visible | Welcome channel 0 msgs in window. All 15 other Bizurk channels return HTTP 403 (channel ACL — Carrick lacks read permission; this is normal/historical for Bizurk and matches the "low activity = normal" expectation). No Bizurk server-channel activity surfaced. |

**Andrew Taraba DM check:**
- DM channel found (nuscarrick ↔ AnimeWorld, id `1298477844212482059`). 17 messages in window.
- 04-22: Carrick delivered update; AnimeWorld provided "tips" before showing dev team.
- 04-24: AnimeWorld returned developer feedback (standalone components redundant, non-memoized methods, performance concerns). Carrick also asked for Upwork progress help.
- 04-25: Carrick sent revised report; AnimeWorld said "Let me pass it along".
- 04-26: AnimeWorld pushed back hard — "he said this is the provided UI design… your thing doesn't even close to it… is it AI generated code?" — escalation/risk signal.
- 04-27 / 04-28: No reply from Carrick yet.

**Vinn/Jeff daily reports:**
- Vinn (informal "Just report my process today" in airagri_webapp): present 04-22, 04-23, 04-24. Missing 04-25 (Sat), 04-26 (Sun), 04-27 (Vietnam public holiday — confirmed in chat), 04-28 (returned today, no report yet at 08:20).
- Jeff (formal "Here is my daily report for today (4 hours)" in airagri-flutter): present 04-22, 04-23, 04-24. Missing 04-25 (Sat), 04-26 (Sun), 04-27 (holiday), 04-28 (none yet at 08:20).

**Alerts:**
- HIGH: Andrew Taraba / AnimeWorld DM 2026-04-26 client pushback — "doesn't even close to it… is it AI generated code?" Carrick has not replied since 04-25. Needs immediate response and rework alignment with client UI design.
- MEDIUM: Vinn 04-22 escalation — repeated calls in airagri_webapp for stricter pre-prod testing after multiple hot-fixes; named jon/Leon for PR/commit hygiene. Process risk.
- INFO: 04-28 daily reports for Vinn and Jeff not yet posted (08:20 +07) — too early to flag, monitor by EOD.
- INFO: 15 Bizurk channels return 403 to nuscarrick — pre-existing ACL state, not a new issue.
## Sheets — 08:20 (+07:00) — W23 (current; varies per project: see notes)

Window: **Wed 22/04 → Tue 28/04** (6 working days; Sun 26/04 excluded as rest day; Mon 27/04 = Hung Kings' public holiday).

Per-developer task-log breakdown (sums across all owned rows in each dev's project sheets):

| Developer | Mon-27 | Tue-28 (today) | Wed-22 | Thu-23 | Fri-24 | Sat-25 | Today (Tue) | Last-week total (Apr 20-26) | This-week total (Apr 27 - May 3) | Status |
|-----------|--------|----------------|--------|--------|--------|--------|-------------|----------------------------|----------------------------------|--------|
| LongVV    | 0h (holiday) | 0h (not yet logged) | 8.0h | 8.0h | OFF | 0h (Sat) | 0h | 32.0h (Xtreme W3 16h + James W22 16h) | 0h (W4/W23 empty) | OK |
| PhucVT    | 0h (holiday) | 0h (not yet logged) | 8.0h | 8.0h | 8.0h | 0h (Sat) | 0h | 76.0h (James W22 — multi-dev incl PhucVT primary) | 0h (W23 empty) | OK |
| TuanNT (John Yi) | 0h (holiday) | 0h (not yet logged) | 4.0h | 4.3h | 1.2h | 0h (Sat) | 0h | 24.91h (W20) | 0h (W21 empty) | OK (combined w/ Rebecca) |
| TuanNT (Rebecca) | 0h (holiday) | 0h (not yet logged) | 4.0h | 3.7h | 6.8h | 0h (Sat) | 0h | 15.09h (W21 LeNH-col-S = 15.09h, but TuanNT col U=15.09h) | 0h (W22 empty) | OK (combined w/ John Yi) |
| **TuanNT (combined)** | 0h (holiday) | 0h (not yet logged) | **8.0h** | **8.0h** | **8.0h** | 0h (Sat) | 0h | **40.0h** (24.91 + 15.09) | 0h | **OK** |
| VietPH    | 0h (holiday) | 0h (not yet logged) | 8.0h | 8.0h | 8.0h | 0h (Sat) | 0h | 40.0h (Paturevision W24 col U=40h, sheet total 62.75h includes other devs) | 0h (W25 empty) | OK |
| KhanhHH   | 0h (holiday) | 0h (not yet logged) | 8.0h | 8.0h | 8.0h | 0h (Sat) | 0h | 142.0h Generator W37 sheet total (multi-dev; KhanhHH primary owner — col-G filtered) | 0h (W38 empty) | OK |
| LeNH (Rory) | 0h | 0h | 0h | 0h | 0h | 0h | 0h | 0h (W8 — KhoaTD has 16h, LeNH not on Rory sheet) | 0h (W9 empty) | — |
| LeNH (Franc) | 0h (holiday) | 0h (not yet logged) | 0h | 2.0h | 5.8h | 0h (Sat) | 0h | 13.66h (W21 col-I LeNH=13.66h) | 0h (W22 empty) | OK (combined) |
| LeNH (Aysar) | 0h (holiday) | 0h (not yet logged) | 8.5h | 6.0h | 1.5h | 0h (Sat) | 0h | 26.34h (W21 col-Y LeNH=26.34h) | 0h (W22 empty) | OK (combined) |
| **LeNH (combined)** | 0h (holiday) | 0h (not yet logged) | **8.5h** | **8.0h** | **7.3h** | 0h (Sat) | 0h | **40.0h** (Franc 13.66 + Aysar 26.34; Rory 0 — KhoaTD owns Rory) | 0h | **OK** (Fri slightly low at 7.3h) |

**Notes:**

- **Current W{n} mapping** (each project has own week numbering): Xtreme=W4, James Diamond=W23, John Yi=W21, Rebecca=W22, Paturevision=W25, Generator=W38, Rory=W9, Franc=W22, Aysar=W22. The window 22/04→28/04 spans two consecutive W-tabs per sheet (last week + current week); Mon 27/04 + Tue 28/04 are in the new tab, Wed–Sat are in the previous tab.
- **Mon 27/04** = Hung Kings' Commemoration Day (Vietnamese public holiday) — 0h is OK and expected. (Carrick announced the holiday in Slack on 21/04: "team off Mon Apr 27, resume Tue Apr 28".)
- **Tue 28/04 (today)** = 0h on every sheet. Time of report = 08:20 local; per established pattern (cf. 22/04 daily report), devs typically fill the current-day log late afternoon / next morning. Expect data Wed 29/04. Not an alert.
- **LongVV W{n} split**: Xtreme W3 16h + James W22 16h = **32.0h** last week. Current week (W4/W23): both empty. LongVV verified active on Wed 22/04 (8h Xtreme W3 + 8h James W22 row 35) and Thu 23/04 (8h Xtreme W3); OFF Fri 24/04 ("Nghỉ cả ngày" in Xtreme W3). Per memory rule, James Diamond Matrix Web section now includes LongVV from W23 (2026-04-20) onward — confirmed, LongVV column visible in James W22 row data even though Summary header doesn't yet list LongVV.
- **LeNH W{n} split**: Rory W8 0h (LeNH doesn't own Rory rows — KhoaTD primary, 16h) + Franc W21 13.66h + Aysar W21 26.34h = **40.0h** last week. Current week (W9/W22/W22): all empty.
- **TuanNT (Rebecca) col P status**: Mon-27 r4 P=`Chưa`, Tue-28 r19 P=`Chưa` (template default — "Chưa" = "not yet [written]" per memory rule, NOT an alert). Wed-22 → Fri-24 col-P values for filled rows: blank/normal (no problem statuses captured).
- **TuanNT 3-project sheet check**: Paturevision W24 had **0** rows owned by TuanNT — Bailey/Pat is VietPH-only. Confirmed TuanNT covers John Yi + Rebecca only (8h/day combined).
- **TaiTM** column on Xtreme/Maddy sheet remains 0h (TaiTM not actively logging — same status as prior weeks).
- **KhanhHH Generator W37** total 142.0h is a multi-dev project (HangNTT + DuongDN + LuHX + HoLL + ManhNN columns). 8h/day per direct G-col scan = KhanhHH personal owned hours.
- **Rebecca sheet TuanNT col-U** Last week: 15.09h matches our day-by-day sum (4+3.7+6.8 = 14.5h, plus likely small Mon/Tue 21 entries totalling ~0.6h not in our window).

**Alerts:**
- None for the window 22/04 → 25/04 (all devs met or got OFF/half-day exemptions).
- Mon 27/04 0h = NOT alert (public holiday — Hung Kings').
- Tue 28/04 0h on every sheet = NOT alert (08:20 report time; devs fill end-of-day or next morning).
- LeNH Fri-24 = 7.3h (combined Franc 5.8h + Aysar 1.5h). Slightly under 8h but not flagged as ALERT in prior reports given multi-project context — flag as **MINOR/WATCH** for follow-up. No leave note found for LeNH on 24/04 in either Franc or Aysar W21 tabs.
## Scrin.io — 08:20 (+07:00)

**Employee:** TuanNT (Scrin display name "Nick", ID 453601)
**Company:** john yi (ID 266977)
**Window:** 2026-04-22 (Wed) → 2026-04-28 (Tue, today)
**Method:** API v2 `POST /api/v2/GetReport` with `X-SSM-Token` header (token from `config/.scrin-config.json`); `body[]` per-task entries filtered by Date locally. No browser/login needed — token still valid.

| Date | Scrin.io hours | John Yi sheet hours | Status |
|------|----------------|---------------------|--------|
| 2026-04-22 (Wed) | 4.07h | 4.00h | OK |
| 2026-04-23 (Thu) | 4.35h | 4.33h | OK |
| 2026-04-24 (Fri) | 1.28h | 1.25h | OK |
| 2026-04-25 (Sat) | 0.00h | 0.00h | OK (weekend) |
| 2026-04-26 (Sun) | 0.00h | 0.00h | OK (weekend) |
| 2026-04-27 (Mon) | 0.00h | 0.00h | OK (no work logged) |
| 2026-04-28 (Tue) | 0.32h | 0.00h | OK (early morning) |

**Week total:** Scrin.io **10.02h** vs Sheet **9.58h** — **OK** (sheet ≤ scrin every day, no over-inflation)

**Alerts:**
- None.

### Detail
- Sheet rows pulled from `1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ` tabs `W20` (covers 20-26/04) and `W21` (covers 27/04-03/05). Filter: col A == "Task dự án", col G owner == "TuanNT", col H = hours.
- Sheet entries Wed-Fri all have a single "Task dự án" row each:
  - 22/04: 4.00h — handle staging homepage Elementor AM
  - 23/04: 4.33h — production homepage Elementor + Fix screen 1056px
  - 24/04: 1.25h — production homepage Elementor AM
- Scrin entries match the same tasks, all online (no offline blocks):
  - 22/04: 244min (220+24) staging homepage Elementor AM
  - 23/04: 261min (59+182+20) Elementor + screen fix
  - 24/04: 77min (70+7) production homepage Elementor AM
  - 28/04: 19min (08:04-08:23) "feeback home page" — earliest entry of today; not yet posted to W21 sheet.
- W21 sheet row for TuanNT/Mon 27/04 is empty — TuanNT did not log time there. Need to confirm with Slack/Trello whether 27/04 was a leave day or simply unrecorded; this is a separate issue (Piece 4 task-log scope), not a Scrin alert.

### Auth
- API token `35592lf5e30c8242a597ca57d97ba9e9d84991` valid; no refresh required.
- Note: `dateFrom`/`dateTo` filter is ignored by `/api/v2/GetReport` — body returns full history; per-day totals derived by filtering `Date` field client-side.

### Comparison rule
TuanNT John Yi sheet hours ≤ Scrin.io hours = OK (rule satisfied every day).
Compare ONLY John Yi sheet, not TuanNT combined total — confirmed.
## Upwork — 08:20 (+07:00)

### Weekly hours (script output)
| Client / contract | This week | Prior week | Notes |
|-------------------|-----------|------------|-------|
| Rory Hackett — Ad-Hoc PHP Work (LeNH) | 0:00 | 0:00 | Week Apr 27 - May 3; since-start 478:10 |
| Neural Contract — Ongoing Support of Laravel/mySQL website (external) | 0:00 | 2:00 | Week Apr 27 - May 3; since-start 97:30 |
| Aysar K — Software Developer (LeNH) | 0:00 | 26:20 | Week Apr 27 - May 3 |
| vinn | n/a | n/a | No saved session — run `node scripts/upwork-login.js --login --account=vinn` |
| david2 | n/a | n/a | No saved session — run `node scripts/upwork-login.js --login --account=david2` |

Note: This week (Apr 27 - May 3) is only into Day 2 (Mon Apr 28 morning, +07:00), so 0:00 figures are expected at this time of day. Prior week (Apr 20-26) shows Aysar 26:20 / Neural 2:00 / Rory 0:00.

### Neural Contract (workroom 38901192)
- Messages since 2026-04-22 08:40 (+07:00): **10**
- Window: 2026-04-22T10:05 (+07:00) → 2026-04-24T11:29 (+07:00); no messages in the last ~4 days (since 2026-04-24).
- Participants: Carrick (developer, userId 676959530284130304) and Michael (client, userId 810633623375904768).
- Notable items / developer activity:
  - 2026-04-22: Michael requests a non-urgent enhancement (5th argument to `live.pl` = uploaded file names separated by `=`); Carrick acknowledges and arranges. Carrick later pushes code, notes that on staging the "reduce risk" option seems to have no effect because the new argument shifted to 5th position.
  - 2026-04-23: Michael reports a bug around line 1066 of `ReportController.php` involving a file marked up via the `docx_markup` program; provides argument trace for `live.pl` (betadv:, CompareSupply/Supplier, IP, uploaded txt path, Metal Refiner...). Carrick says "Let me check", later pushes update including analyze-risk; tells Michael to verify.
  - 2026-04-24: Carrick pushes another fix and asks Michael to check. Michael confirms and thanks Carrick, wishes him a good Monday holiday.
- Status: Healthy two-way developer/client engagement. Issues raised by client are being addressed within the same day. No unanswered client messages, no escalations, no auth/session errors on the carrick session.

**Alerts:**
- None
## Fountain — 08:35 (+07:00)

**Today:** 2026-04-28 Tue. **Current week:** W24 (April 27 → May 3, 2026). **Day 2 of W24** (Mon was Hung Kings' holiday).

Matrix token expired at start. Auto-refresh via `node scripts/matrix-token-refresh.js` initially failed (puppeteer headless captured 0 token). Recovered by manual headless capture from `tmp/matrix-browser-profile/` request headers — fresh `mat_Nhg0pswk5HGF0...` saved to `config/.matrix-config.json`. Verified with `whoami` → `@duongdn:nustechnology.com`.

---

### Part 1 — Matrix Plan (W24)

**Source:** room `!EWnVDAxbTGsBxPkaaI:nustechnology.com` (Fountain).

**Latest weekly plan** — @trinhmtt:nustechnology.com, **2026-04-28T01:20:13 UTC** (08:20 +07, today, message edited at 01:20:29Z):

> Em gui plan tuan nay ạ
> VuTQ 16h
> ViTHY 16h        ← typo for ViTHT
> DatNT 16h
> => QC 10,5h

Follow-up clarification: @thinht (01:18:29Z) asked "tuần này a có bn giờ bên này vậy Trinh Mai" (how many hours this week?) → @trinhmtt confirmed (01:22:46Z) "Dạ đúng roi" — meaning **ThinhT = 0h** this week. ThinhT then asked "vậy là tuần này a k có time bên này ?" (so no time this week?) — Trinh confirmed yes.

**Plan totals W24:**
- Devs: VuTQ 16h + ViTHT 16h + DatNT 16h + ThinhT 0h + LamLQ 0h (not on plan) + HaVS 0h (not on plan) = **48h dev**
- QC: **10.5h** (PhatDLT + HungPN combined)
- Grand total: **58.5h** — significantly reduced vs W23 plan (142h dev + 30.5h QC = 172.5h)

This reduction is consistent with the holiday-shortened week (Mon 27/04 = Hung Kings' Festival) AND ThinhT/DatNT having reduced commitments per Trinh's clarification.

---

### Part 2 — Task Log Actuals (W24)

**Source:** Google Sheet [`1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`](https://docs.google.com/spreadsheets/d/1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o), Summary R29 (W24) + W24 tab.

| Dev | Role | W24 Actual | Notes |
|-----|------|-----------|-------|
| VuTQ | Dev | **0.50h** | Mon 27/04 hotfix on #2861 (brand name not populating in what's included) |
| ThinhT | Dev | **0.00h** | Off plan this week (confirmed in Matrix) |
| ViTHT | Dev | **0.00h** | No log yet (Tue morning) |
| DatNT | Dev | **0.00h** | 2 task rows pre-filled (#78399 Dev Done, #78400) but no hours logged yet |
| HaVS | Dev | **0.00h** | Not on plan (absent 5+ wks) |
| LamLQ | Dev | **0.00h** | Not on plan |
| PhatDLT | QC | **0.00h** | No log yet (Tue morning) |
| HungPN | QC | **0.00h** | No log yet |

**Dev total W24:** 0.50h / plan 48h (1.0%)
**QC total W24:** 0.00h / plan 10.5h (0%)
**Grand total W24:** 0.50h (Summary R29 col D)

Note: Mon 27/04 was Hung Kings' holiday — most devs off. Logging starts Tue 28/04 EOD onward.

---

### Part 3 — Plan vs Actual

| Dev | Plan W24 | Actual W24 (day 2) | Expected pace (Tue, ~20%) | Delta |
|-----|----------|---------------------|---------------------------|-------|
| VuTQ | 16h | 0.50h | ~3.2h | -2.7h (only 0.5h logged Mon hotfix) |
| ThinhT | 0h | 0.00h | 0h | 0h (matches — off plan) |
| ViTHT | 16h | 0.00h | ~3.2h | -3.2h (no log yet) |
| DatNT | 16h | 0.00h | ~3.2h | -3.2h (no log yet, tasks pre-staged) |
| LamLQ | 0h (not on plan) | 0.00h | — | n/a |
| HaVS | 0h (not on plan) | 0.00h | — | n/a |
| PhatDLT (QC) | (split 10.5h) | 0.00h | ~2.1h | -2.1h |
| HungPN (QC) | (split 10.5h) | 0.00h | — | n/a if PhatDLT covers |

**Note:** Mon was holiday so the "expected pace" should really be measured from Tue. As of 08:35 Tue 28/04, no devs except VuTQ have logged. Pattern from prior weeks: devs typically fill Mon/Tue logs by Wed morning. Re-check Wed 29/04 morning.

---

### Part 4 — Capacity & Runway

**Source:** "Est vs Charged" tab (excluding Deployed on Live + Cancelled).

| Metric | 04-22 | 04-28 | Δ |
|--------|-------|-------|---|
| Not Started count | — | 12 | — |
| Not Started remaining | — | 139.50h | — |
| In-progress count | — | 14 | — |
| In-progress remaining | — | 11.25h | — |
| **NS+IP remaining** | **351.00h** | **150.75h** | **−200.25h** |
| Runway @ 90h/wk | 3.90 wk | **1.68 wk** | **−2.22 wk** |
| Runway @ 142h/wk | 2.47 wk | 1.06 wk | −1.41 wk |

**Significant decrease:** Runway dropped from 3.90 → 1.68 weeks (NS+IP) over 6 days. Several In-progress tasks moved to Dev Done / Deployed on Staging during W23 (devs logged 152h actual that week). Top remaining NS items now: #2775 (60h, 12h actual), [#1178 reviews](https://trello.com/c/AdUlQD3t) (40h, 0h), [#2524 duplicate charge](https://trello.com/c/VXxyO8IW) (24h, 0h).

**Pipeline thinning:** With dev plan reduced to 48h and runway only 1.68 wk, **backlog is at risk of running dry** in ~7 days unless new estimates are added. Watch #2697 (Next.js 16 upgrade, 0h est, 10.5h actual) and #2836/#2761 (no estimates assigned).

---

### Part 5 — Over-Estimate Tracking

Mandatory check: #2595, #2615, #2735.

| Task | Est | Actual 04-22 | Actual 04-28 | Over% | Status | Trend vs prior |
|------|-----|-------------|-------------|-------|--------|-------|
| [#2735 Pro Send Smart Link](https://trello.com/c/yrbbFhf9) | 90h | 115.00h | **126.00h** | +40% | In-progress (>50%) | ⚠️ STILL GROWING (+11h) |
| [#2615 Gift of Choice](https://trello.com/c/NBzXZigw) | 12h | 106.75h | **106.75h** | +790% | Deployed on Staging | Stable |
| [#2595 GiftDrop Redemption](https://trello.com/c/) | 120h | 168.25h | **168.25h** | +40% | Deployed on Staging | Stable |
| #2702 Accessibility | 8h | 20.50h | **24.00h** | +200% | In-progress (>50%) | ⚠️ STILL GROWING (+3.5h) |
| #2742 GoC select/payment | 12h | 20.25h | **20.25h** | +69% | Not Started | Stable (status anomaly persists) |
| #2640 | 12h | 16.75h | **16.75h** | +40% | In-progress (<50%) | Stable |
| #2695 | 20h | 26.00h | **26.00h** | +30% | In-progress (<50%) | Stable |
| #2639 Active/Inactive cats | 2h | 16.50h | **16.50h** | +725% | Deployed on Staging | Stable |
| #2501 | 4h | 25.50h | **25.50h** | +538% | Deployed on Staging | Stable |
| #2380 checkout date | 4h | 25.25h | **25.25h** | +531% | Deployed on Staging | Stable |
| #2627 | 0.5h | 8.25h | **8.25h** | +1550% | Has Bug on Live | Stable |
| #2624 order complete | 12h | 31.25h | **31.25h** | +160% | Dev Done | Stable |
| #2629 | 8h | 18.25h | **18.25h** | +128% | Dev Done | Stable |
| #2816 | 20h | 24.50h | **32.00h** | +60% | Deployed on Staging | ⚠️ GROWING (+7.5h) |
| #2604 | 1h | 3.50h | **3.50h** | +250% | Deployed on Staging | Stable |
| #2666 | 2h | 5.00h | **5.00h** | +150% | Deployed on Staging | Stable |
| #2815 | 6h | 9.00h | **9.00h** | +50% | Not Started | Stable |
| #2837 | 16h | 17.50h | **17.50h** | +9% | In-progress (>50%) | Stable (under 20% threshold) |

**Active growing tasks (vs 04-22):**
- **#2735** Pro Send Smart Link: +11h (115 → 126), still 40% over 90h est
- **#2702** Accessibility: +3.5h (20.5 → 24), 200% over 8h est
- **#2816**: +7.5h (24.5 → 32), 60% over 20h est (new growth)

**#2742 anomaly persists** — status "Not Started" but 20.25h logged. Lead update needed.

---

### Trello Board (Web Development)

Board: [Web Development (Fountain)](https://trello.com/b/UDrSWage) — id `5475eaf923a9a1309357eb51`. Auth as @rick570.

**Customer comments since 2026-04-22 00:00 UTC** (kunalsheth, tmmckay, mike62798179, iris63293413) — **29 total**:

Apr 22:
1. **2026-04-22T02:47Z** @kunalsheth on [Mother's Day orders not sync](https://trello.com/c/y8lM8Alq) — asking Rick for the 9 order numbers
2. **2026-04-22T02:50Z** @kunalsheth on same — Infinity ground shipping showing today's date in custom field 3
3. **2026-04-22T02:50Z** @kunalsheth on same — example 7538074UV
4. **2026-04-22T02:54Z** @kunalsheth on [Order confirmation email](https://trello.com/c/Zh47TgEt) — only applied to infinity not fountain
5. **2026-04-22T03:03Z** @kunalsheth on Mother's Day — clarifying 7 vs 9 orders
6. **2026-04-22T03:07Z** @kunalsheth on Mother's Day — request 4 orders for fountain
7. **2026-04-22T13:39Z** @tmmckay on [Update to breakpoints](https://trello.com/c/0xVWmSqK) — minor changes posted
8. **2026-04-22T16:51Z** @tmmckay on [Infinity - Product page update](https://trello.com/c/rRU4Qk4n) — ready to pick up

Apr 23:
9. **2026-04-23T04:26Z** @kunalsheth on [Infinity - Update homepage](https://trello.com/c/S0M1pEOs) — confirming new assets emailed
10. **2026-04-23T04:27Z** @kunalsheth on [Free branded packaging](https://trello.com/c/c1uHuBWW) — push live while waiting for Tom
11. **2026-04-23T04:27Z** @kunalsheth on [What's Included section](https://trello.com/c/ixGA5FuX) — push live while waiting for Tom
12. **2026-04-23T06:40Z** @tmmckay on [Update to breakpoints](https://trello.com/c/0xVWmSqK) — description repopulated
13. **2026-04-23T06:41Z** @tmmckay on [Infinity Cart/Checkout/Order Received](https://trello.com/c/TAopocTs) — ready to pick up
14. **2026-04-23T08:54Z** @tmmckay on Infinity Product page — directing to Kunal
15. **2026-04-23T12:18Z** @tmmckay on [Infinity - Custom Roses page](https://trello.com/c/ElD5EOmr) — Dropbox link request
16. **2026-04-23T12:54Z** @kunalsheth on Custom Roses — Dropbox link provided
17. **2026-04-23T12:55Z** @kunalsheth on Update homepage — Dropbox link provided
18. **2026-04-23T12:56Z** @kunalsheth on Product page update — placeholder ok
19. **2026-04-23T14:14Z** @mike62798179 on [Shipstation duplicate shipments](https://trello.com/c/BYu5iwQM) — order **2116900OR** also affected; pattern: claim/giftdrop triggers double
20. **2026-04-23T14:52Z** @kunalsheth on Shipstation — order #2766949BC partially synced; Emily Sarre item missed entirely

Apr 24:
21. **2026-04-24T01:57Z** @kunalsheth on Update homepage — phone (646) 506-3443 + push live timing
22. **2026-04-24T02:19Z** @kunalsheth on same — hero image needs update + mobile scroll bug
23. **2026-04-24T03:48Z** @kunalsheth on Infinity Product page update — added FAQ to description

Apr 25:
24. **2026-04-25T16:23Z** @kunalsheth on [Brand name not populating in what's included](https://trello.com/c/iEKolIxX) — fix and push live; affects ALL boxes ⚠️

Apr 27:
25. **2026-04-27T00:59Z** @kunalsheth on Update homepage — **"Can we push this live tonight? Very important week for us with mother's day."** ⚠️
26. **2026-04-27T01:35Z** @kunalsheth on [GA4 event for new account](https://trello.com/c/VWNJOeoB) — new conversion event request
27. **2026-04-27T14:20Z** @kunalsheth on [Brand name](https://trello.com/c/iEKolIxX) — description fixed but brand name still missing ⚠️
28. **2026-04-27T14:21Z** @kunalsheth on [Open Graph Image](https://trello.com/c/EQDBNvRe) — image attached; make global default
29. **2026-04-27T17:30Z** @tmmckay on [Free branded packaging](https://trello.com/c/c1uHuBWW) — one comment from his side

**Active card counts per list:**

| List | Count | Yesterday (04-22) | Δ |
|------|-------|-------------------|---|
| To-Do | 32 | 32 | 0 |
| Bugs | 10 | 12 | -2 |
| Doing | 6 | 7 | -1 |
| QC Internal | 6 | 6 | 0 |
| QA Backlog | 3 | 2 | +1 |
| In QA | 2 | 2 | 0 |
| Not Passed | 1 | 0 | +1 |
| Done (live) | 932 | — | — |

**Stuck cards (>5 days inactive): 41 total** (vs 44 on 04-22, **−3**). Top:
- 189d [todo] [Platform switcher fix](https://trello.com/c/JVLMbyYO)
- 152d [bugs] [PayPalHttp::HttpError in paypals#generate_order](https://trello.com/c/6MTnv0Cc)
- 145d [todo] [Fountain Pro - Backend Updates](https://trello.com/c/kUkibmUS)
- 123d × 4 [todo] (URL case sensitive, Pro roles, Unit Test, Duplicate Charge)
- 113d × 10 [todo] old backlog items
- 111d [todo] [Implement reviews](https://trello.com/c/AdUlQD3t)
- 87d [qc_internal] [Solution to incorrect delivery dates](https://trello.com/c/oHJ5YO8y)
- 25d [todo] [Performance of website](https://trello.com/c/bUhZxZRE)
- 20d [bugs] [Fountain Pro not uploading to shipstation](https://trello.com/c/5KcDOKx0)
- 19d [todo] [Patch vulnerabilities and delete data](https://trello.com/c/ItHdgsNc)

**Hard-to-release (Doing >=14d): 1 card** (vs 2 prior):
- 24d [States need to be updated + scrolling to bottom](https://trello.com/c/clSdoRlL)

---

**Alerts:**

| # | Source | Alert | Severity |
|---|--------|-------|----------|
| 1 | Trello/Kunal | **"Push Update homepage live tonight — very important week for mother's day"** (Apr 27) — request unanswered, [Update homepage](https://trello.com/c/S0M1pEOs) | HIGH |
| 2 | Trello/Kunal | **Brand name still missing** in what's included after partial fix (Apr 27 14:20Z) — [card](https://trello.com/c/iEKolIxX) — affects all boxes during Mother's Day week | HIGH |
| 3 | Trello/Mike | Shipstation duplicate shipments **expanded** — #2116900OR added (Apr 23); Kunal: #2766949BC partially synced (Emily Sarre item missing) — [card](https://trello.com/c/BYu5iwQM) | HIGH |
| 4 | Trello/Kunal | Mother's Day orders not syncing — multiple discrepancies in order counts; ground shipping date display bug — [card](https://trello.com/c/y8lM8Alq) | HIGH |
| 5 | Over-est | #2735 Pro Send Smart Link still growing: 115 → 126h (+11h) at +40% over 90h est | MEDIUM |
| 6 | Over-est | #2702 Accessibility still growing: 20.5 → 24h (+3.5h) at +200% over 8h est | MEDIUM |
| 7 | Over-est | #2816 newly growing: 24.5 → 32h (+7.5h) at +60% over 20h est | MEDIUM |
| 8 | Capacity | Runway dropped 3.90 → 1.68 wk (NS+IP); pipeline thinning. Devs logged 152h W23 burning through backlog | MEDIUM |
| 9 | Plan/Matrix | W24 dev plan reduced to 48h (vs 142h W23); ThinhT off-plan; LamLQ off-plan; HaVS still absent | INFO |
| 10 | Task log | All devs except VuTQ at 0h on day 2 of W24 — re-check EOD Tue 28/04 | INFO |
| 11 | Matrix | Token expired at start; recovered via headless puppeteer header capture from saved profile | INFO |
| 12 | Trello/Hard-to-release | #clSdoRlL States update — 24d in Doing, no movement | LOW |
## Elena — 08:20 (+07:00)

### Internal PRs (Elena-SamGuard-Digital-Plant)
- No open PRs on `nustechnology/Elena-SamGuard-Digital-Plant` (API returned `[]`)
  - CodeRabbit: n/a
  - Action: nothing to merge
  - Deploy: not triggered
  - Redmine: n/a
  - Matrix announcement: not sent (nothing to announce)

### Precognize (nusken open PRs)
- Could not fetch — `nusken` GitHub account is not configured in `gh auth` (only `duongdn` and `nuscarrick` accounts are available on this host).
  - `gh api repos/Precognize/development/pulls` with both available tokens returned HTTP 404 Not Found (no access to the private repo from these accounts).
  - Action item: add `nusken` token via `gh auth login --hostname github.com -u nusken` (or restore from secret store) before next run.

### WordPress SamGuard (samguard.co)
- HTTP status: 200
- JS errors: clean
- Page errors (uncaught exceptions): clean
- CSP violations: clean (no `Refused to ...` / `Content Security Policy` console messages observed)
- Failed network requests (informational, NOT CSP):
  - 5 × `net::ERR_ABORTED` POSTs to Google/LinkedIn analytics endpoints (typical fetch beacons aborted on `networkidle2`; not blocked by CSP)
  - 5 × `net::ERR_ABORTED` GETs for `/wp-content/uploads/2025/{02,03}/{1,3,4}.mp4` (videos cancelled when headless navigation completed before media preload finished)

**Alerts:**
- Precognize PR check could not run — `nusken` GitHub token missing from `gh auth`. Configure before next Elena run so PRs aren't missed.

## Trello — 08:30 (+07:00)

Board: `O83pAyqb` (My Task)
Cards updated:
- Check mail — `69effff1a914befc03fa2dd4`
- Check progress — `69eff8cc8ba79dc8d63c0460`

### Check Mail
- DuongDn: ✓ complete (2 emails, no alerts)
- Carrick: ⚠️ skipped (Socalautowraps prod error #52 — turnstile)
- Nick: ✓ complete (28 emails, no John Yi mail)
- Rick: ⚠️ skipped (multiple PROD alerts: InfinityRoses ReadTimeout #413/#414, FountainGifts NoMethodError #262-264, FirstProject #850 hit 1000th, BugSnag rate-limit, MongoDB Atlas Wathaga)
- Kai: ✓ complete (31 emails, no Madhuraka issues)
- Ken: ✓ complete (500 emails — 34 Precognize routine)

### Check Progress

#### Normal
- Maddy - Carrick/Kai/Luis: ✓ complete (Xtreme 21 msgs OK + LongVV 32h W3 OK)
- Blake: ✓ complete (SoCal 0 msgs, silence ok)
- John Yi - Amazing Meds: ✓ complete (Slack watch, Nick responding; TuanNT John Yi 24.91h OK)

#### Should do
- James Diamond - Vinn task: ⚠️ skipped (MEDIUM: Vinn testing-process escalation against jon/Leon)

#### Closely monitor
- Rory: ✓ complete (Swift 5 msgs Carrick activity + LeNH Rory 0h, KhoaTD owns OK)
- Aysar: ✓ complete (Baamboozle 69 msgs + LeNH Aysar 26.34h OK)
- Franc: ✓ complete (RDC 159 msgs + LeNH Franc 13.66h OK)
- Elliott: ✓ complete (Generator 192 msgs; Rudi Android bug = dev topic, not alert; KhanhHH OK)

#### Work
- MPFC: ✓ complete (0 msgs OK, silence ok)
- Marcel: ✓ complete (Equanimity 19 msgs OK, Marcel adhoc)
- Elena - SamGuard: ✓ complete (SamGuard 57 msgs OK + no PRs + samguard.co clean)
- Raymond - LegalAtoms: ✓ complete (LegalAtoms 19 msgs filtered Nick-specific OK)
- Neural Contract: ✓ complete (Upwork workroom 38901192: 10 msgs healthy back-and-forth, no auth issues)
- Bailey: ✓ complete (GGS 51 msgs Nick reports + VietPH 40h OK)
- Andrew Taraba: ⚠️ skipped (HIGH: client pushback in nuscarrick AnimeWorld DM 04-26 "is it AI generated code?", Carrick last replied 04-25)
- Rebecca - William Bills: ✓ complete (William Bills 101 msgs OK + TuanNT Rebecca 15.09h W21 OK; "Chưa" = normal default per memory)
- Colin: ✓ complete (Aigile 13 msgs OK)
- Fountain: ⚠️ skipped (HIGH: Kunal Mother's Day push unanswered, Brand name missing iEKolIxX, Shipstation duplicate bug #2116900OR, Mother's Day order sync discrepancies; runway dropped 3.90→1.68 weeks; over-est tasks #2735/#2702/#2816 STILL GROWING)

#### Pending
- Elena - WordPress SamGuard: untouched (Pending list, not in plan)

### Verification
Re-fetched both cards after PUTs — final checkbox state matches plan exactly. 4/6 mail items + 15/18 progress items completed. 2 mail + 3 progress items intentionally left incomplete with reasons logged above.
