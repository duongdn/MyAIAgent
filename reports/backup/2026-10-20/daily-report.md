# Daily Report — 2026-10-20 (Tuesday)

**Run:** 2026-10-20T05:00+07:00 → 05:20 (cron, mpfc server), corrected 09:40 (+07:00) local recheck
**Window:** 2026-10-19 05:13 → 2026-10-20 05:15 (+07:00). Task-log date: **Mon 2026-10-19**
**Leave plan:** `parse-leave-emails.js` refreshed 05:01. No approved leave on record. Resource Arrangement (Matrix): Mon 19/10 VuTQ morning off, ThoTNT / DanhTD / TamLH off. Tue 20/10 SangNV, ThiHV off. Thu 23/10 DanhTD off. No PHP-team dev listed. 🆕 **TuanNT off sick Tue 10-20** (email 08:26 + Resource Arrangement 09:13 "Cảm sốt ==> Bên Bailey ko bù"), added to leave-plan.json.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email carrick@ (Jetpack) | **socalautowraps.com is DOWN — DNS no longer resolves.** The registrar (Hostinger) now points the domain at `NS1/NS2.DNS-EXPIRED.COM`, last changed 2026-10-11. The domain itself is paid until 2027-10-10, so this looks like the Hostinger hosting/DNS plan lapsing. Jetpack flapped about 17 times on 10-19, then reported "still offline for 1 hour" at 21:07. Live curl at 05:10 can't resolve the host. Blake/SoCal is no longer monitored, but this is a full customer-site outage: tell Carrick / the customer. |
| 2 | Slack RDC (Franc) | ✅ **Resolved 08:51:** Carrick listed the open items per commit (admin logout, favorites, master-admin protection incl. the 10-16 DM security webhook, offline/Turkish 404 text) and his order of work. Franc ✓ 09:05. ~~dmetiner asked Carrick two things at 17:03–17:04, with no reply yet: **"from what I committed over the last few days, what do we have open now?"** and a request to change the offline-device pop-up text to Turkish: "Cihaz şu anda çevrimdışı. Tekrar çevrimiçi olduğunda bağlantı kurabilirsiniz." Posted after hours, so this is fresh, not neglect. Franc ○~~ |
| 3 | Slack GGS (Bailey) | Joey (customer) asked amy at 19:05 in #presta-9-update: **"when will we be ready to go live? wednesday for me is really really good now"**. Still no reply as of 09:35. Internally (Matrix), datnc's plan is to take the Upgrade items live this week. ~~Bailey ○~~ Bailey ticked by user 09:15, ask still open. |
| 4 | Fountain Trello board | 09:20 Kunal: ~~#756/#922 "live tonight"~~ → "no need to push this tonight… go out together with the next batch". **Still open for Rick: saved-cards reset (step 4)** + the pm2 restarts / Node 21 note (no Rick reply as of 09:35). Kunal's AI (20:26): "Still yours: **the saved-cards reset (step 4)**". It also noticed Node v21.7.1 on the server and **564 pm2 restarts** on fountain_gifts_FE. A new card at 23:40, "Rollout: Backstage Team Remove (BE #756, then FE #922)", says Kunal wants it **live tonight**. Rick pushed both the Oct 16 and Oct 19 releases live (14:03, 16:10) and promised a hotfix. [card Oct19](https://trello.com/c/Rbp1nAOe) · [card #756](https://trello.com/c/QoDohCJH). Fountain - DOCUMENT ○ |
| 5 | Matrix (halt → duongdn, 16:21) | "Please remind customer **AirAgri Services – James Diamond** to pay this bill. I emailed last week and it's still unpaid." No reply from duongdn seen (rechecked 08:35). Action for DuongDN. |
| 6 | Discord AirAgri | ✅ **Resolved 09:00:** new nusvinn token (from user) verified 200 and saved. Vinn report "Just report my process today" present (onboarding PRs #783/#784, SOS-delay investigation, admin portal). Jeff daily report present (4h). Vinn answered James' SOS-delay questions with a full timeline. James Diamond ✓. ~~The nusvinn credential returns 401 (3-step check: `/users/@me` 401, `/guilds` 401). It can't be refreshed from the headless server, so the Vinn/Jeff daily-report check for 10-19 was not done. **Re-run `node scripts/discord-monitor.js` on the local machine.** James Diamond ○~~ |
| 7 | Workstream review | OhCleo: 2 rows still **Pending** → reviewers DuongDN, MinhTV: LuHX "Fixbug new design" (5h, 10-19), PhuongPVT "Follow up on update new design & report" (1h actual / 0 charged, 10-19). |
| 8 | Email rick@ / vuongtrancr@ | Production Rollbar: **FountainGifts #377 SignalException: SIGHUP** (17:43 10-19, likely the pm2 restarts, see #4). FirstProject #907 TypeError: Failed to fetch. ~~Swish **Delayed-newform #295** + New Relic "Signal lost — Low Application Throughput" flapping (open/close 4x, one issue lasted 733 min).~~ Swish paused per user 09:16, no longer monitored. |
| 9 | Email carrick@ | James Le Chevalier (client, 15:45) sent a Dropbox download link and asks: "Would you mind also letting your **finance team know I haven't forgotten about their invoice**". FYI, no ask of us. Mailjet support replied on account-suspension review #4279499 (20:32): needs Carrick to follow up. |
| 10 | Performance | MPFC apdex **0.43** (poor, chronic): `continue` E_WARNING 1409x, WP_Error::get_method() 38x, scanner/custom URLs 39–45s. Others healthy. |

| 11 | 🆕 Slack Xtreme (Maddy) | Madhuraka 08:18 to Kai: "I have sent you an urgent one". ✅ Kai replied 09:14 ("Can you give them v5?", plus a file). Maddy stays ✓. |
| 12 | 🆕 Workstream (TuanNT) | **TuanNT 0h on Mon 10-19** across all 22 visible projects (raw rows, 09:35), no leave for 10-19. He was active that day (Matrix: acked the Andrew Taraba customer msg 08:42, took Redmine #81469 in the Bailey room), so this is a **logging gap, not an absence**. He is off sick today, so no reminder sent: your call. ~~Bailey stays ○ (also Alert #3).~~ Bailey ticked by user 09:15. |
| 13 | 🆕 Arthur / Meta-Stamp | R1 started 10-19, **staging due Fri 10-23**. At 09:25: 0 commits since 10-15, 0h logged on both Crystal lang and the new WS project **"Meta-Stamp"** (`cmvexs7ei0h8gpp1v0lpdw57x`, namtv split it out 10-19, no reviewer set). $931.50 start-day payment not confirmed. 3 decisions pending from Chris. See `0925-arthur-monitor.md`. |

**Today (Oct 20):** SangNV, ThiHV, TamLH and **TuanNT (sick)** off. ~~Monday task-log hours were mostly not logged yet at 05:15 (normal: devs log after about 09:00). No 0h alerts or reminders this run. Re-check after 09:30.~~ 09:35 hours pass: KhanhHH 8h ✓, LeNH 8h ✓, TuanNT 0h (Alert #12), LongVV 0h (ad-hoc, informational), PhucVT 0h (not gated).

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@ | 0 | — | no events |
| carrick@ | 37 | ⚠️ SoCal DNS down (Alert #1). James Le Chevalier Dropbox + invoice note. Mailjet #4279499 reply. GitLab new PAT created (04:43 UTC, carrick's own) | no events |
| nick@ | 0 | — | no events |
| rick@ | 19 | ⚠️ FountainGifts #377 SIGHUP. FirstProject #907. Infinity/FirstProject daily summaries. Infinity credit-payment logs (normal) | 10:30 OmniGPT Daily Sync · 11:00 + 12:30 HEAL Meeting |
| kai@ | 0 | — | no events |
| ken@ | 80 | GitHub notifications only: welligence, amocc-material, Precognize (majdhajjo08 SR-7450, DanielGavrilkin DP-664 PRs), Elena OP-14 push (nusryan). Nothing for nusken to act on | 08:30 DE - Daily Standup |
| vuongtrancr@gmail.com | 80 | ~~⚠️ Swish Delayed-newform #295 + NR Signal lost flapping.~~ (Swish paused, not monitored) Mirko Baraldo opened/approved Bitbucket PRs #837–#849 on delayedflight (secrets→ENV, CSRF, SEO, perf) | — |
| dnduongus@gmail.com | 20 | No security alerts (bank/Shopee/newsletters) | — |
| davidztv19@gmail.com | 0 | — | — |
| freelancer@mpfc | 1 | Rollbar MPFC Daily Summary: 1 existing, 0 new | — |

Trello: Check mail 6/6 ✓, card done.

---

## Slack — all — 05:08 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 11 | #mpdm (C07SQ4HAUHZ): **Carrick "Some reports for today" 17:40** ✅ (navy palette #705/PR #708). #testing: Carrick asked about bringing the admin pages into navy, and skjamie25 said yes 16:33. Feedback deployed on Nusdev 14:07. DM: Carrick 08:48 "Thanks! Let me check it" to a teammate who shared dev keys |
| RDC - FM Monitoring | 34 | Carrick tested Istanbul logging, set up 2 test accounts with dmetiner and verified them, deployed admin-logout confirm (16:03). dmetiner thanked him (16:59). ~~⚠️ 17:03/17:04 asks unanswered (Alert #2).~~ ✅ Carrick answered 08:51. #user-access-logs = bot |
| Swift Studio | 3 | jeff (ours) 08:44: "Rory, we need the contract to resume soon so we can track our time". roryh 15:11: "yes doing this now". BXR contract is paused on Upwork, Rory is acting on it |
| Xtreme Soft Solutions | 1 (+2 today) | Kai answered Madhuraka's 10-17 question about LIFM2-468 backward compatibility (09:28) ✅. 🆕 Today 08:18 Madhuraka "I have sent you an urgent one", Kai replied 09:14 ✅ |
| SAM GUARD - Mobile | 52 | Elena - SamGuard Digital Plant is on the Ignore List. Not reviewed |
| Global Grazing Services | 7 | **Nick "Today report" 17:18** ✅ (Prestashop Rail 6 product-sync bug, CR2 desktop view). amy fixed Joey's translation string (Joey: "perfect this time"). ⚠️ Joey's go-live question 19:05 unanswered (Alert #3) |
| Amazing Meds | — | John Yi is cancelled (Ignore List). Not scanned |
| Generator | 0 | — |
| LegalAtoms | 4 | Raymond asked hashim about issues #21644/#22025 (hashim: closed). talha 04:46 asked hashim to ping a user. Nothing addressed to Nick/us |
| MyPersonalFootballCoach | 0 | — |
| William Bills | 0 | Rebecca paused (Ignore List) |
| Equanimity | 0 | — |
| SoCal Auto Wraps | 0 | (site DNS down, see Alert #1) |
| Aigile Dev | 0 | Colin paused (Ignore List) |

Trello: Maddy ✓ · Rory ✓ · Aysar ✓ · MPFC ✓ · Marcel ✓ · Raymond ✓ · ~~⚠️ Franc skipped (Alert #2)~~ Franc ✓ (09:05) · ~~⚠️ Bailey skipped (Alert #3)~~ Bailey ✓ (user 09:15).

---

## Discord — all — 05:09 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 59 | ~~Not retrieved: credential returns 401 on this host (Alert #6).~~ Local recheck 09:00 (new token): **Vinn "Just report my process today"** ✅ (onboarding PRs #783/#784, SOS alarm-delay investigation, admin portal user/property mgmt). Vinn gave James a full SOS timeline (press 09:30:06, Traccar 13 min later, power-saving sleep + weak cellular) and suggested an always-on-mode retest. **Jeff daily report (4h)** ✅ in #airagri-flutter. dapackage: Safefarm/sensors UI rework under discussion with James. Nothing pending from us |
| Bizurk / animeworld DM (nuscarrick) | 3 | nuscarrick 06:21 Mon: "Hi, Done and upload [Drive folder] … Please check it", replying to Andrew's POS feature requests. Our side delivered |

Trello: Andrew Taraba ✓ · ~~⚠️ James Diamond skipped (Alert #6)~~ James Diamond ✓ (09:00).

---

## Scrin.io — 05:09 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-10-19):** 0h, no sessions recorded.

---

## Sheets / Workstream — Mon 10-19 — 05:10 (+07:00)

Raw `/review/week` rows across 22 live projects (Lyf Support App and Others return 403). **At 05:15 most devs had not logged Monday yet.** That is normal: devs log the prior day after about 09:00, and memory flags pre-09:30 reads as unreliable. Nothing below is treated as an alert, and no reminders are sent.

| Developer | Mon 10-19 (logged so far) | Status |
|-----------|---------------------------|--------|
| LeNH | ~~—~~ **8h** (James Diamond 0:30+4:50+2:40) | ✓ (09:35) |
| TuanNT | ~~—~~ **0h** (all 22 visible projects, raw rows 09:35) | ⚠️ logging gap: active in Matrix 10-19, off sick 10-20. No reminder sent (Alert #12). Gates Bailey (ticked by user 09:15) |
| KhanhHH | ~~3.33h~~ **8h** (Baamboozle 3:20 + Radio Data Center 4:40) | ✓ (09:35) |
| LongVV | 0h (09:35) | ad-hoc/multi-project, informational. Active 10-19 (deployed the OhCleo BE) |
| PhucVT | — | on Arthur/Meta-Stamp this week, not alerted |

**Per-project (dev / reviewer charged / review status):**
| Project | Dev hours 10-19 | Reviewer charged | Review status |
|---------|-----------------|------------------|---------------|
| Baamboozle | KhanhHH 3.33h | — | need_review = false |
| Speedventory (Bailey) | NamNN 3.0h, DatNC 0.5h (0 charged) | — | need_review = false |
| OhCleo | LuHX 5h, PhuongPVT 1h (0 charged) | DuongDN/MinhTV: 0h | ⚠️ **Pending** ×2 (Alert #7) |
| Fountain Greetings | PhatDLT 3h | — | excluded |
| Tokenlite (Marcel) | DuongDN 0.17h | — | need_review = false |
| James Diamond | — | PhucVT/LeNH | no rows yet |
| Radio Data Center | — | LeNH | no rows yet |
| Crystal lang | — | TienND | no rows this week. Last week's 4 PhucVT rows (12h, `Chris-M4-54`) still Pending |
| 🆕 Meta-Stamp (Chris Coyne, created 10-19) | — | none set | no rows yet (09:35) |
| Generator / Colin ETZ | — | (paused) | no rows |
| All other projects | — | — | no rows yet |

Trello: ~~no task-log gate blocked this run (Bailey ○ is for the customer ask).~~ TuanNT 0h on 10-19 (Alert #12). Bailey ticked by user 09:15.

## Maddy — W 10-19 — 05:12 (+07:00)

### 1. Task Log Hours (Mon 10-19)
| Developer | Mon | Weekly total | Status |
|-----------|-----|--------------|--------|
| LongVV | — | 0h so far | informational only, ad-hoc. No alert |
| LuHX | — | — | different role, not managed by us |

### 2. Slack / Kai Daily Report Check
- No WS Maddy hours on 10-19 yet, so the report-presence check doesn't apply.
- Madhuraka's 10-17 21:56 question on LIFM2-468 ("would it fail if user hasn't updated the extension?") was answered by Kai 10-19 09:28: "it handles that… falls back to the current method." ✅ (duongdn had nudged LongVV via Matrix at 09:01.)
- Separately, halt asked whether LongVV's last week (Maddy actual 0, charged 1.5h) is OK. duongdn: actual can't be 0. Internal hygiene, being fixed by halt.
- 🆕 08:18 today Madhuraka: "I have sent you an urgent one". Not in JIRA/Bitbucket/kai@. Kai replied 09:14 "Can you give them v5?" (+ file) ✅
- **Conclusion:** OK.

### 3. JIRA (Maddy JIRA weekly cross-check + daily activity)
- `maddy-jira-tasklog-check.js --week 2026-10-19`: "No Workstream entries this week" (it's Monday morning).
- LIFM2 issues updated since the window start: 0. Worklogs 10-19..20 (all projects): none.
- Watch tickets: LIFM2-409 Testing - Anoma (est 113.25h / spent 111.25h, last upd 10-07). LIFM2-439 Done (12h / 21.5h). LIFM2-260 Done (no est / 38.5h).

### 4. Bitbucket PR Status (`xtreme-web/rms`, 7 open, all Kai)
| PR | Age | Last upd | Comments | Note |
|----|-----|----------|----------|------|
| #558 LIFM2-470 custom payout % | 4d | 10-16 | 2 | Rovo Dev bot (N+1 query, redundant null check). No client comment |
| #548 LIFM2-468 Lens title selection | 28d | 10-18 | 1 | Rovo bot only. Client's question answered on Slack |
| #540 LIFM2-450 | 47d | 10-06 | 0 | — |
| #544 LIFM2-465 | 40d | 09-21 | 0 | — |
| #534 concurrent cron fix | 55d | 08-26 | 1 | — |
| #481 LIFM2-409 feedback | 183d | 09-25 | 2 | waiting on customer (known, not our blocker) |
| #509 LIFM2-428 | 119d | 08-14 | 4 | — |

Trello: Maddy ✓.

---

## Fountain — 05:13 (+07:00)

**Part 1 — Matrix plan** (@trinhmtt, Mon 10-19 08:57): **VuTQ 20h · ThinhT 20h · ViTHT 40h → QC 20h**.

**Part 2 — Workstream actuals (week 10-19, as of 05:15 Tue):** PhatDLT 3h (QC, "Test v2"). Nobody else has logged Monday yet. VuTQ had the morning off on 19/10 (Resource Arrangement, idle/internal).

**Part 3 — Plan vs Actual (W 10-19, day 1):**
| Dev | Plan | Actual so far | Note |
|-----|------|---------------|------|
| ViTHT | 40h | 0h (still 0 at 09:35) | Monday not logged yet. Active in Matrix all day (Oct 19 release review/QC split) |
| ThinhT | 20h | 0h (still 0 at 09:35) | not logged yet. Active (QC'ing the set-password flow) |
| VuTQ | 20h | 0h | AM off. Active PM (BETA owner account) |
| QC (PhatDLT + HungPN) | 20h | ~~3h~~ 7h (09:35) | PhatDLT 3h + HungPN 4h |

**Part 4 — Capacity & Runway:** re-fetched live ("Est vs Charged", A13:L118, 106 rows). Unchanged: **Narrow 229.00h / 28 tasks · Broad 328.50h / 63 tasks**.
**Part 5 — Over-estimate:** this pass's count is 36 items >120% (actual > (Est+CR)×1.2). The prior report said 37. The sheet data is unchanged, so the gap is counting method. Still frozen.

**Trello board (Web Development):** Rick moved the Oct 16 release (#731/#901) and the Oct 19 release (#747/#912) to Done and pushed both live (14:03, 16:10). Kunal (20:09) said he didn't see them live. His AI later confirmed Kunal had deployed the FE himself, and the BE is live. **Still open for Rick: saved-cards reset (step 4) + promised hotfix + Node 21 / pm2 564 restarts note.** ~~New card 23:40: Backstage Team Remove (#756/#922), "live tonight".~~ 09:20 Kunal: no need to push #756/#922 tonight, it ships with the next batch. No Rick comment as of 09:35. Lists: Ideas 9 · Next rollout 6 · In progress 3 · Bugs 4 · Done 2 · Notes 5 · Yearly 1.

Trello: ~~⚠️ Fountain - DOCUMENT skipped (Alert #4)~~ Fountain - DOCUMENT ✓ (user 09:12).

---

## Elena — 05:14 (+07:00)

- Elena - SamGuard Digital Plant: Ignore List (paused). PR/deploy flow not run.
- **WordPress samguard.co:** HTTP 200. jsErrors 0 · pageErrors 0 · **cspViolations 0** ✅. failedRequests are 7 GA/ads/LinkedIn collect calls (ERR_ABORTED, analytics noise).

Trello: Elena - WordPress SamGuard ✓.

---

## Trello — Check progress — 05:15 (+07:00)

~~**18/22 complete** (re-fetched live 05:14).~~ **22/22 complete** (live 09:42). Bailey (09:15) and Fountain - DOCUMENT (09:12) were ticked outside this recheck, by the user. Their alerts (#3, #4, #12) stay listed for follow-up.
- ✓ Maddy · Rory · Aysar (KhanhHH 3.33h Baamboozle + Carrick MPDM report 17:40) · MPFC · Marcel · Raymond · Neural Contract · Andrew Taraba · Ohcleo · Arthur - Meta-Stamp · Elena - WordPress SamGuard
- ~~⚠️ Franc: skipped (Alert #2)~~ ✓ Franc 09:05 (Carrick answered 08:51)
- ~~⚠️ Bailey: skipped~~ ✓ Bailey 09:15 (user). Still open for follow-up: Joey's go-live question (Alert #3), TuanNT 0h on 10-19 (Alert #12)
- ~~⚠️ Fountain - DOCUMENT: skipped~~ ✓ Fountain - DOCUMENT 09:12 (user). Still open: saved-cards reset on Rick (Alert #4)
- ~~⚠️ James Diamond - Vinn: skipped (Alert #6. AirAgri data not retrieved)~~ ✓ James Diamond 09:00 (Vinn + Jeff reports present)

## Ignore List — 05:15 (+07:00)
Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard Digital Plant, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds, Rebecca (William Bills), Elliott

---

## Reminders — 05:15 (+07:00)
- ~~None sent. It is before 09:30… Re-check after 09:30.~~ 09:35 pass: LeNH 8h, KhanhHH 8h, skipped (has hours).
- TuanNT: 0h on 10-19, no leave that day, but active in Matrix. **Not sent.** He is off sick today, so a reminder is your call.

---

## Matrix — 05:06 (+07:00)

**Active rooms: 19 / 151 | Messages: 486** *(since 10-19 05:13)*
Full details: reports/2026-10-20/matrix-rooms-0506.md

### ⚠️ Action items for DuongDN (1)

| Room | Time | Message |
|------|------|---------|
| halt ↔ duongdn (!tGBJevbuSmjqVePBPN) | 16:21 | halt: "Hi a Nhờ a nhắc KH AirAgri Services - James Diamond thanh toán bill này giúp e nha, tuần trước e gửi email vẫn chưa thấy". Asks DuongDN to chase the customer's unpaid invoice. No reply seen ⚠️ |

### Key updates

**Fountain — Oct 19 release QC'd and live, plan posted** (08:57):
- Plan: VuTQ 20h, ThinhT 20h, ViTHT 40h, QC 20h.
- QC tested on test.fountaingifts.com → BETA (15:49). PhatDLT is confused by the "companies" invite flow (TrinhMTT to explain). QC is getting a GitHub account (parker@) to read the PRs.

**OhCleo — new-design app build sent to customer** (17:14–17:22):
- Many LuHX builds QC'd by HungPN. Android internal testing + iOS TestFlight ready. HungPN "tested DONE". LongVV deployed the BE to prod.

**Arthur / Meta-Stamp — payment terms agreed:**
- namtv agreed to Chris's terms (½ R1 tied to the AllVerified deal). Tag `Chris-R1` created. namtv will split R1 into its own project. See 0515-arthur-monitor.md.

**Precognize OP (Elena Optimization) — rolling Min/Max semantics dispute:**
- Kfir and Lena disagree. anhttl confirmed with the customer 19:12. This may become a CR depending on the estimate assumptions. The customer's external dev commented on our PR (duongdn 15:33).

**Upgrade project (PhucVT/LongVV/TuanNT):**
- About 4 of the 6 estimated weeks used. Target: finish this week, "unlikely to exceed est". PhucVT is mostly on Meta-Stamp this week.

**Other:**
- Resource Arrangement: leaves as listed in the header.
- Bailey room: datnc's plan is to take the Upgrade items live this week. TuanNT to check Redmine #81469.
- Lyf Support: the customer can't receive the prod reset-password email. LongVV/minhtv verified it sends. Waiting on the customer.
- Maddy room: duongdn nudged LongVV, and Kai answered on Slack.

---

## OhCleo Slack — 05:14 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM: Celine Fierro | 3 | Tony "My report today" 10:21 UTC (17:21 VN): new design finalizing, new TF version ready for review. Celine 11:53 UTC: "What does TF stand for?" … "Never mind, I guess testflight" |
| #events-code | — | `channel_not_found`: the account is no longer a member (needs an admin re-invite, known) |

Tony daily report: **present 17:21 VN** ✅. No open customer ask.

Trello: Ohcleo ✓.

---

## Performance — 05:15 (+07:00)

Window: since 10-19 05:13 (~24h).

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.99 | 120ms | 1.8% (539/29180), ~92% benign NotAuthenticated/InvalidToken | 20.3/min |
| mpfc | **0.43** ⚠️ | 1610ms | 4.6% (1481/32126) | 22.4/min |
| fountain | 0.98 | 129ms | 0.001% (1/83127) | 57.9/min |
| infinity | 0.97 | 161ms | 0.10% (18/18906) | 13.2/min |

**OhCleo topErrors:** NotAuthenticated 494 · InvalidToken 23 · AuthenticationFailed "User does not exist" 7 · ValidationError email exists 7 · ValueError Invalid bcrypt hash format 4 · ValidationError username exists 2 · IntegrityError null user_id app_playhistory 1 (chronic) · ValidationError no user found 1.
**OhCleo slowest:** ChatSendView.post 3178ms/19 · EmailVerification 997ms/14 · CategoryMediaView 960ms/336 · ValidatePurchase 891ms/1 · GetBookMarkDetailsView 851ms/539.

**MPFC topErrors:** `continue` targeting switch E_WARNING 1409 · WP_Error::get_method() 38 · count() non-Countable 13 · mkdir() name too long 5 · require legacy-widget.php 3 · mysqli_real_connect socket 2 · undefined get_header() 2 · require version.php 1 · mysqli getaddrinfo 1 · undefined add_action() 1. (The direct-include fatals are scanner hits on PHP files.)
**MPFC slowest:** /studio 44.5s/1 · /analytics 43.7s/1 · /chat 42.6s/1 · /playground 41.0s/1 · /dashboard/members 39.3s/1. These look like probe URLs, each called once.

**Fountain topErrors:** ArgumentError wrong args (3 for 2) 1.
**Fountain slowest:** ActiveStorage::AnalyzeJob 29.4s/1 (bg) · SitePicksWorker 24.2s/2 (bg) · AssistantCheckWorker 13.8s/71 (bg) · staff/customer_service/search 5.5s/2 · staff/relationships/index 4.8s/3.

**Infinity topErrors:** UnknownFormat 18 · ArgumentError wrong args (3 for 2) 18.
**Infinity slowest:** paypals/authorize_order 2.6s/2 · ShipStationShipmentWorker 2.5s/3 · registrations/create 1.9s/6 · payment_intents/create 1.7s/18 · search 1.5s/45.

---

## Arthur / Meta-Stamp — 05:15 (+07:00)

Full Vietnamese tracker: `reports/2026-10-20/0515-arthur-monitor.md`.
- Meta-Stamp Slack #msv3-official: Chris's 3 asks from 10-19 05:33/05:59 were all answered by us (09:50 terms accepted, 11:58 R1-e/split answers, 14:40 rate-limit quote). Chris replied "great news" 10:05. Now waiting on Chris for the rate-limit quote.
- Matrix Arthur room: namtv agreed to the terms. Tag `Chris-R1`. R1 to be split into its own project.
- GitHub Meta_Stamp_V3: no commits in the window, 0 open PRs.
- Workstream Crystal lang: no 10-19 rows yet.
- Solid Code workspace is retired (the project moved to the Meta-Stamp workspace).
- Note: this server's plaintext `config/.slack-accounts.json` was stale (09-26, missing the Meta-Stamp workspace). It was restored from the committed `.enc` (10-19 14:15).

- 🆕 Local recheck 09:25 (see `0925-arthur-monitor.md`): still no reply from Chris since our 14:40 quote. R1 progress risk (Alert #13). namtv created WS project **"Meta-Stamp"** for R1 (no reviewer set).

Trello: Arthur - Meta-Stamp ✓ (customer asks all answered; progress risk tracked as Alert #13).

---

## Upwork Memo — 2026-10-19 — 05:13 (+07:00)

| Workroom | Memos | Invalid | Details |
|----------|-------|---------|---------|
| Rory | ~~—~~ 0 | 0 | local recheck 08:35: no segments on 10-19 (BXR contract paused, Rory resuming, see Swift Slack) |
| Aysar | ~~—~~ 2 | 0 | local recheck: "Applied the approved navy palette to library, Profile, Study Mode and game tile headers (#705) — PR #708" + "Extended the navy palette to the legacy admin index after customer approval (#705) — PR #708". Both valid. The rules script wrongly failed them ("applied"/"extended" were missing from its verb list), fixed in `scripts/upwork-memo-rules.js` |
| Tokenlite | — | — | local recheck: duongdn Upwork session (Chrome Profile 9) needs a login. The scraper only returned login-page text, not a memo. Not a memo finding. Waiting on user to log in, then rerun headless |

~~The cookie vault is marked STALE. The company PC re-pushes it after 08:00. Re-run `env -u DISPLAY node scripts/upwork-memo-check.js --date=2026-10-19` then. This is not a memo-validity finding.~~
Neural Contract (38901192): messages were not retrieved on the same path. Local retry 08:45 also hit a login redirect 4/4: carrick's real Chrome (Profile 1) has not opened Upwork since 10-16, so the access token is stale. Per the standing rule that is not an alert → Neural Contract ✓. Needs carrick's Chrome to open upwork.com once.

---

## Unresolved Questions
- SoCal Auto Wraps: who owns the Hostinger account? Hostinger renewal is needed to restore DNS (Blake/SoCal no longer monitored).
- Bailey go-live date for Joey: is Wednesday 10-21 realistic? datnc/amy to answer.
- Fountain: will Rick do the saved-cards reset ~~+ #756/#922 tonight~~ (Kunal deferred #756/#922 to the next batch) and look at the pm2 564 restarts (likely linked to Rollbar #377 SIGHUP)?
- AirAgri invoice: will DuongDN chase James Diamond (halt's request)?
- ~~Local recheck after 09:30: Discord AirAgri (Vinn/Jeff), Upwork memos, and Monday hours for LeNH/TuanNT/KhanhHH.~~ Done 09:40.
- TuanNT 0h on 10-19 while active: send a reminder (he's sick today) or let it wait?
- Arthur R1: has PhucVT started (0 commits / 0h so far, staging 10-23)? Has the $931.50 start-day payment arrived? Who reviews the new "Meta-Stamp" WS project?
- Upwork: duongdn (Tokenlite, Profile 9) needs a login; carrick's Chrome should open upwork.com once (Neural).
