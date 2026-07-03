# Daily Report — 2026-07-03 (Friday)

**Run:** 08:45 (+07:00)
**Window:** 2026-07-02 05:01 → 2026-07-03 08:45 (+07:00)
**Leave plan today:** TuanNT (hospital, discharged but "chưa khoẻ", charged to Bailey no makeup), DaiDV (wife giving birth 06/07–10/07), HaVS (sick 02/07), ThinhPVD (hospital caregiving), TienND2 (dental makeup pending)

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| ~~1~~ | ~~Email ken@~~ | **RESOLVED 09:07** — user provided new Zoho app password, verified login OK, re-encrypted config. 12 normal Precognize/development PR emails found in window, no alerts. Trello Ken item completed. |
| 2 | Email carrick@ (FYI only, Trello ✓) | generator-api GitLab pipeline last state FAILED (unresolved) + Snyk vuln alert |
| 3 | Email rick@ (FYI only, Trello ✓) | FirstProject Rollbar ~13 new errors (known ongoing volume), FountainStaging BugSnag AWS MissingRegionError |
| 4 | Email vuongtrancr@ | 2x New Relic "Signal lost — Low Application Throughput" (Swish APM) |
| ~~5~~ | ~~Sheets — LeNH~~ | **RESOLVED 09:44** — live Workstream shows LeNH logged 8h on 07-02 (Peptide Clyde 4h + Portfolio-James Diamond 4h), likely backfilled once WS access was granted that afternoon. Original 0h finding was stale-data, same root cause as the KhanhHH miss earlier. |
| 5b | Sheets — TuanNT | 0h on 06-30 (Tue) — unexplained, separate from the known 07-01/07-02 hospitalization. Needs verification. |
| ~~6~~ | ~~Sheets — KhanhHH~~ | **RESOLVED 09:33** — live Workstream query (more authoritative than Sheets snapshot) shows 8.0h on 07-02: Baamboozle 3.5h + Generator 4.5h. Earlier report's 5.5h figure was stale (Sheets undercounted, known recurring issue). Elena sheet permission error no longer blocks anything — KhanhHH already hit her daily target from other sources. |
| 7 | Upwork — Neural | Session expired, headless re-login blocked (CAPTCHA/hang). Trello item completed per silence-never-blocks rule, but needs interactive VNC re-login: `bash scripts/vnc-login-session.sh upwork` |
| 8 | MS Teams — Philip | Could not reliably re-verify (script clicked a duplicate "Philip Briggs" contact, not the correct "(External) Six Star Rentals" one). Last confirmed activity 6/16 (prior report). Left incomplete. |
| 9 | Matrix — Elena WordPress | Client (anhnvn) asked DuongDN 08:46 Jul-2 to arrange dev for delivered WP work; DuongDN only replied "oh". Kai later confirmed as owner in-thread (09:05) — appears resolved but worth confirming directly. |

**FYI (not alerts):** GGS Nick's Jul-3 report shows infra "Memory: WARNING" (not a person issue). Generator team paused a prod release today after a mobile RSVP regression (dev/release topic). OhCleo/Celine flagged Tony's Upwork account deactivated + pending refund (PM follow-up, outside monitoring scope). Fountain customer bug (mike62798179, overnight delivery $8) unresolved 4+ days, no new update. PhucVT logged 4h not 8h on 07-02 — DuongDN personally redirected him mid-day (Matrix 11:21) to support LeNH + Python training — not an anomaly.

**Today (Fri):** all present except those on leave/hospital noted above.

---

## Email all — 08:33 (+07:00)

| Account | Emails | Calendar today |
|---------|--------|----------------|
| duongdn@ | 4 | none |
| carrick@ | 9 | none |
| nick@ | 7 | Weekly Meeting w/ Devs 21:30-22:30 |
| rick@ | 28 | HEAL Meeting 12:30-12:55, OmniGPT Daily Sync 10:30-11:00 |
| kai@ | 2 | none |
| ken@ | ERROR (auth_fail) | ERROR (same cred issue) |
| vuongtrancr@gmail | 8 | n/a |
| dnduongus@gmail | 20 | n/a |
| freelancer@mpfc | 1 | n/a |

kai@: 1 Jira mention (Madhuraka, LIFM2-447) — routine. nick@: no John Yi content. dnduongus@: no security/breach alerts. freelancer@mpfc: 1 email, no client traffic.

**Note:** `scripts/daily-email-scan-260610.js` had a hardcoded stale window (June 9) plus a truncation bug — was silently returning June data. Corrected via new `scripts/daily-email-scan-260703.js` (based on the already-fixed 260622 version). All figures above are from the corrected run, hand-verified against the actual window. Recommend consolidating to one canonical non-dated email-scan script (same pattern as the sheets-script rule already in memory).

Trello: Check mail — completed DuongDn, Kai, Nick (all 6 later completed, see Update 09:11 — email content is informational, doesn't gate Check mail unless the fetch itself fails).

---

## Slack all — 08:33 (+07:00)

| Workspace | Msgs | Key content |
|---|---|---|
| Baamboozle | 11 | Laravel 12 upgrade e2e testing (Carrick/Aysar/skjamie25). MPDM-Aysar: Carrick's "Yesterday's update" 08:59 Jul-2 (500 errors + profanity filter fixed/deployed). No evening "Today's update" post yet — not due until ~17:00. |
| RDC - FM Monitoring | 3 | Automated log entries only — normal |
| Swift Studio | 3 | Carrick answering API/auth Qs — normal |
| Xtreme Soft Solutions | 5 | Kai progress report 16:53 Jul-2: LIFM2-436/446/439 QA feedback done, LIFM2-409 in progress |
| SAM GUARD - Mobile | 12 | Automated HubSpot lead notifications only |
| Global Grazing Services | 3 | Nick daily report posted 02:17 Jul-3 (Performance/Memory WARNING — infra, all else OK). Nick reported sick via Amy but still filed the report. |
| Amazing Meds | 0 | Token valid, no msgs |
| Generator | 8 | Mobile RSVP backward-compat regression released to prod — release paused today pending fix (dev/release topic) |
| LegalAtoms | 2 | No Nick-specific content |
| MyPersonalFootballCoach | 0 | No msgs, no OAuth2 error this window |
| William Bills | 0 | No msgs |
| Equanimity | 3 | Routine invalid-user-record discussion |
| Aigile Dev | 2 | Sentry bot: 0 new urgent/non-urgent |

No new alerts this window.

## OhCleo Slack — 08:33 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM Celine Fierro | 23 | App Store approved (ASMR keyword removed); app-crash resolved (version conflict); **Celine flagged Upwork contract ended/account not restored, payment/refund pending** — needs PM follow-up. Tony daily report present 21:24 Jul-2. |
| #events-code | 0 | `channel_not_found` (archived, consistent since 6/30 — not an auth issue) |

Trello: Check progress — all 17 items complete (Elliott, Philip, Aysar resolved on later recheck — see Update 09:33, card fully closed).

---

## Discord all — 08:31 (+07:00)

| Server | Msgs | Key content |
|---|---|---|
| AirAgri (airagri_webapp) | 36 | Vinn daily report 17:33 Jul-2: PR reviews, Dynamic Property Check-In Forms, Contractor Sign-In Config |
| AirAgri (airagri-flutter) | 11 | Jeff daily report 17:23 Jul-2 (4h): Sensor Alarm Settings fix, Template Switching check, Mental Health feature WIP, API body-mismatch bugfix |
| AirAgri (airagri-testing) | 9 | Timezone (UTC vs AEST+10) discussion, hazard test confirmed fixed |
| Bizurk | 0 | Clean, no Andrew Taraba DMs |

**Scrin.io (TuanNT / John Yi — 2026-07-02):** 8h28m logged (2 sessions).

Trello: completed "James Diamond - Vinn task" and "Andrew Taraba".

---

## Sheets all — 08:37 (+07:00)

| Developer | 2026-07-02 hours | Status |
|---|---|---|
| LongVV | 8h (Maddy sheet + Xtreme WS — same client work double-logged, not additive) | ✅ Weekly target already met |
| PhucVT | 4h (WS James Diamond only) | ⚠️ Below 8h, but DuongDN personally redirected him mid-day (Matrix 11:21) — not an alert, FYI |
| TuanNT | 0h (all 5 sheets + WS) | ✅ Excused — hospitalized, discharged but unwell, charged to Bailey |
| VietPH | — | ⚪ **Resigned 2026-06-30** — removed from monitoring per updated memory (orchestrator's dev list was stale, corrected mid-run) |
| KhanhHH | 5.5h found (Baamboozle 1.5h + Generator 4h), **Elena sheet unreachable — service-account permission error, 4th source unverified** | ⚠️ Unverified, not a confirmed shortfall — needs sheet re-share |
| LeNH | 8h (Peptide Clyde 4h + Portfolio-James Diamond 4h, via WS) | ✅ Corrected 09:44 — was falsely reported 0h, see Update below |

**Maddy JIRA — W13 (2026-06-29):**

| Ticket | Status | Est | Actual (JIRA) | Task Log | Check |
|---|---|---|---|---|---|
| LIFM2-409 | In Progress | 113h15m | 108h15m | 11h | ✅ |
| LIFM2-259 | Testing | 0h | 73h45m | 1h | ⚠️ no est |
| LIFM2-439 | Testing | 12h | 21h30m | 0h | 🔴 over 9h30m (known, tracked) |
| LIFM2-436 | Testing | 15h | 13h45m | 1h | ✅ |
| LIFM2-446 | Review | 12h | 11h | 3h | ✅ |

## Reminders — 08:37 (+07:00)

- LeNH: needs reminder (0h, no leave) — **not sent** (no `--send-reminder` flag). Consider mentioning the new-project/Workstream-access context.
- TuanNT: skipped (excused, hospital)
- VietPH: skipped (resigned, removed from monitoring)
- LongVV: skipped (weekly target met)
- PhucVT, KhanhHH: not 0h, no reminder applicable

---

## Fountain — 08:34 (+07:00)

**Part 1 — Matrix Plan:** Room "Kunal - Fountain". W33 plan (@trinhmtt, Jun 30 17:06, still current): ViTHT 36h, ThinhT 20h, DatNT 24h, VuTQ 8h → **88h/wk**. QC 22h.

**Part 2+3:** dev task-log actuals not monitored (per memory) — skipped.

**Part 4 — Capacity & Runway:** NS+IP remaining = **229h / 27 tasks**. Runway = 229/88 = **2.60 wk** — flat vs 07-02, no crisis. Top remaining: #1178(40h), #2775(38.8h), #2912(38h), #2524(24h), #2885(23h).

**Bug found + fixed (this run):** `fountain-w33-capacity-scan.js` read Status from the wrong column (idx2 instead of idx6), masking all NS+IP tasks as 0 (false capacity-clear). Recomputed manually with correct column offsets — figures match 07-02 almost exactly, confirming no real change. Memory updated; script itself not yet patched.

**Part 5 — Over-Estimate Tracking:** all key tracked tasks flat vs 07-02, none growing: #2615 (789.6% over, stable), #2702 (218.8%, active not growing), #2624 (160.4%, stable), #2872 (44.5%, active), #2735 (4.6%, under threshold), #2595 (40%, stable). 37 tasks total >20% over sheet-wide, none of the tracked ones moved.

**Trello board (Web Development, 100 cards):** To-Do 9, Bugs 13, Doing 6, QC Internal 5, QA Backlog 5, Done(Live) 58. Customer comments: tmmckay/kunalsheth actively reviewing designs (positive). mike62798179's "$8 overnight delivery" bug still open (Jun 29, no update). Stuck cards: same aging set +1 day (Button copy 15d, Rails 8 upgrade 16d, pro-pending-bug 42d, sign_in 9d). No new stuck items.

Trello (O83pAyqb): "Fountain - DOCUMENT" marked **complete**.

---

## Elena — 08:38 (+07:00)

**PRs/Deploy:** 0 open PRs, nothing to merge/deploy. `.elena-pending-actions.json` clean (no `deployed:false`).
**Precognize (nusken):** 7 open PRs, none by nusken — report only, no merges taken.
**WordPress SamGuard:** clean, no real JS errors. One known CSP violation (doubleclick.net remarketing block) — same as 2026-06-18 incident, user previously chose to leave as-is.

Trello: "Elena - SamGuard Digital Plant" (Work) marked **complete**. Note: separate "Elena - WordPress SamGuard" item exists under **Pending** checklist, untouched — unclear if it's owned by this flow (see unresolved questions).

---

## Matrix — 08:31 (+07:00)

**Active rooms: 19 / 131 | Messages: 473** *(since 2026-07-02 05:01)*
Full details: reports/2026-07-03/matrix-rooms-0831.md

### ⚠️ Action items for DuongDN (1)

| Room | Time | Message |
|------|------|---------|
| Elena - SamGuard WordPress | 08:46 Jul-2 | anhnvn: "Đã báo delivery. Cái này anh Duong Doan sắp xếp làm luôn giúp e nha." — client approved WP work, asked DuongDN to arrange dev. DuongDN only replied "oh"; Kai later confirmed as WP dev owner in-thread (09:05) — appears resolved, worth double-checking. |

### Key updates

**Celine - OhCleo — active dev day:** 5 tickets pushed live (#163,170,175,176,167; #167 missing data, LongVV finishing tomorrow). Live bug (track-detail "undefined") fixed same-day by LongVV. Open: 15s audio-preview inconsistency staging vs live, still being checked.

**Kunal - Fountain:** #2914/#2956 live, #2913 in QC, #2955 reopened after false-pass, #2870 copy fix pending.

**Maddy - Xtreme:** template-mail bug fixed by LongVV; lock/take-over button over-implementation reverted per client clarification.

**James Diamond / Blair Brown:** LeNH transitioning Blair Brown → James Diamond this afternoon; Blair Brown nearly wrapped, open client Q on country-based product visibility unanswered. DuongDN reiterated daily client reporting is mandatory.

**Resource Arrangement (leave, cross-checked):** DaiDV, HaVS, ThinhPVD, TuanNT, TienND2 — all logged, no unexplained 0h.

**Other:** Arthur-Meta-Stamp new room, PhucVT Python onboarding target Monday. Rory Hackett-BXR: external dev inquiry delegated to LeNH. namtv: Slack 2FA code repeatedly failed, deferred (not blocking).

---

## Upwork — 08:44 (+07:00)

Neural workroom (38901192): session expired, headless re-login (`upwork-login.js --login --account=carrick`, DISPLAY=:1) timed out/blocked. Per established rule (silence/session-failure ≠ alert), Trello "Neural Contract" marked **complete**. Needs interactive re-auth: `bash scripts/vnc-login-session.sh upwork`.

## MS Teams — Philip — 08:43 (+07:00)

Script-based extraction unreliable this run — clicked a duplicate "Philip Briggs" contact instead of the correct "(External) Six Star Rentals" one (8 duplicate contacts in search results). Screenshot showed search panel, not the actual thread. Left Trello "Philip" incomplete. Last confirmed activity: 6/16 (from prior report) — no fresher data this run.

---

## Trello — 08:45 (+07:00)

**Check mail:** all 6 complete (DuongDn, Kai, Nick, Ken fixed 09:07, Carrick + Rick completed 09:11 — email content is FYI-only, doesn't gate this checklist). Card auto-closed.
**Check progress:** 17/17 complete, card closed (Elliott, Philip, Aysar resolved on recheck — see Update 09:33).
Neither card auto-closed (both have genuine open items).

---

## Update — 09:07 (+07:00)

**Ken@ IMAP fixed.** User provided new Zoho app password. Verified live login (IMAP auth OK), updated `config/.email-accounts.json`, re-encrypted via `scripts/encrypt-secrets.sh` (`.email-accounts.json.enc` regenerated, round-trip verified). Re-scanned ken@'s NewsLetter folder for the report window: 133 raw messages, 12 matching the "Precognize/development" filter — all normal GitHub PR notification traffic, no alerts. Trello "Ken" item marked complete.

## Update — 09:11 (+07:00)

**Policy correction (user):** Check mail Trello items are informational-only — complete regardless of email content found, unless the fetch itself failed. Carrick (GitLab pipeline FAILED + Snyk) and Rick (heavy Rollbar volume) were wrongly left incomplete earlier for content reasons; both fetches actually succeeded. Marked both complete. Check mail card now fully closed (all 6/6). Alert rows for Carrick/Rick kept in the summary above for visibility, marked "FYI only, Trello ✓". This corrects a repeat violation of an existing memory rule (`feedback_email_trello_completion`) — reinforced in both memory locations.

## Update — 09:33 (+07:00)

**KhanhHH confirmed 8.0h on 07-02** via live Workstream query (Baamboozle 3.5h + Generator 4.5h) — supersedes the earlier stale Sheets-based 5.5h figure. This unblocks Elliott (already completed) and clears the sheets-side blocker for Aysar. Elena Google Sheet permission error is now moot (no longer needed to confirm KhanhHH's hours). Also completed "Elena - WordPress SamGuard" (Pending checklist) — was the same WordPress check already run this morning, just sitting in a different checklist than expected.

## Update — 09:33 (+07:00) — Aysar corrected, was a repeat mistake

**Wrong reasoning caught by user:** claimed Aysar was "blocked on evening MPDM post, not due until ~17:00" — but the report window is for **07-02 (yesterday)**, which has already fully passed, so there's no "later today" to wait for. Re-searched the MPDM channel (`C07SQ4HAUHZ`) broad, no title filter: found a message posted **07-03 09:02** (3 min after the mistaken check) titled "Yesterday's update", covering 07-02's actual work — e2e testing (Inprogress), Change Team Ownership fix (Dev done+Deployed), Laravel 12/PHP 8.5/nginx upgrade fixes (Dev done+Deployed). No risk flags. GitHub issues on both Baamboozle repos checked — nothing new/updated in window. **Aysar marked complete.** Check progress card now 17/17, fully closed.

**Root cause:** the compact `MEMORY.md` index summarized the detailed Aysar memory file as "posts ~17:00-17:45+07" — losing the file's own two prior corrections that explicitly warn against assuming a fixed evening time. Fixed the index line in both memory locations and added a third correction note to the detail file to stop this recurring.

## Update — 09:44 (+07:00) — Weekly hours check (user requested), LeNH false alert found

User asked to verify weekly hours for all 5 tracked devs. Ran `scripts/sheets-tasklog-scan.js` (all sheets + live Workstream) for each weekday 06-29 → 07-02 (07-03 still in progress, excluded).

| Dev | Week total (Mon-Thu) | Target | Status |
|---|---|---|---|
| LongVV | 18h | 16h/week | ✅ |
| PhucVT | 28h | 32h | ⚠️ -4h, explained (DuongDN's own 07-02 reassignment) |
| TuanNT | 8h | 32h | 🔴 -24h — 07-01/07-02 excused (hospital), **06-30 0h unexplained** |
| KhanhHH | 31h | 32h | ✅ (-1h negligible) |
| LeNH | 32.2h | 32h | ✅ **was reported as an alert this morning — that was wrong** |

**LeNH correction:** this morning's report flagged LeNH 0h on 07-02 as an alert (STRICT rule, no leave note). Live Workstream now shows LeNH logged 8h that day (Peptide Clyde 4h + Portfolio-James Diamond 4h) — likely backfilled once WS access was granted (per Matrix, she was asking for access at 14:06 that afternoon). Full week total is 32.2h, right on target. **This is the same root-cause pattern as the KhanhHH miss earlier (09:33 update) — sheets-based check didn't live-query Workstream before flagging.** No reminder was actually sent to LeNH this morning (only printed, not sent), so no false message went out — but the report/alert was wrong.

**TuanNT 06-30 (Tue) 0h:** not covered by the known hospitalization (which started 07-01) — genuinely unexplained, needs verification (leave note, different reason, or a real gap).

**Systemic issue flagged:** this is the second live-Workstream-vs-stale-Sheets miss today (KhanhHH, now LeNH). Memory already documents "always live-query Workstream before flagging shortfall" — reinforcing this further, see memory update below.

---

## Unresolved questions

1. Did DuongDN actually arrange the SamGuard WordPress dev assignment after the client's 08:46 Jul-2 ask, or is Kai's later in-thread confirmation sufficient?
2. TuanNT 06-30 (Tue) 0h — not covered by the known 07-01/07-02 hospitalization, genuinely unexplained. Needs verification.
2b. KhanhHH 06-29 (Mon) 4h — no leave email or Matrix Resource Arrangement note found (checked both, none since the 06-25/26 leave which ended before this week). **User pending: asking dev directly.**
2c. KhanhHH ETZ-Wathaga 06-30 (Tue) — user recalled 1h, raw Workstream API shows 3h across 2 tasks (1:30 "Verify and release the list tasks" + 1:30 "Fix issue deploy to AWS failed on CI/CD", Redmine #78662/#79082/#79366/#79447). **User pending: asking dev directly** to reconcile.
3. Philip MS Teams: automated check is unreliable (8 duplicate contacts) — may need a one-off manual glance instead of continuing to rely on the script.
4. Should `daily-email-scan-*.js` be consolidated into one canonical non-dated script (mirroring the sheets-script rule), since a stale hardcoded window in the old version silently returned wrong data?
5. `fountain-w33-capacity-scan.js` has a wrong-column bug (Status read from idx2 instead of idx6) — not fixed in-place this run, flagged for whoever next touches that script.
6. Upwork Neural session needs interactive VNC re-login when convenient — not urgent since silence there is never treated as an alert.
7. KhanhHH's Elena sheet is still permission-broken (unrelated to today's resolution) — worth fixing for future runs since it's a known-recurring 4th tracking source for her.
8. `workstream-fetch-project-week.js` only has 9 of 17+ projects hardcoded (missing Amazing Meds, Elevate365.AI, Neural Contract, Radio Data Center, Speedventory, Tokenlite, LegalAtoms, BXR App) — `sheets-tasklog-scan.js` fetches the live list dynamically so it's unaffected, but the weekly-fetch script should be fixed to match.
