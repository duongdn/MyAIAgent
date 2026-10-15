# Daily Report — 2026-10-15 (Thursday)

**Run:** 2026-10-15T05:00+07:00 (cron, mpfc host), corrected 08:45 (+07:00) (local recheck)
**Window:** 2026-10-14 08:45 → 2026-10-15 05:15 (+07:00). Task-log date: Wed 2026-10-14.
**Leave plan:** Leave parser refreshed: no approved leave on record for 10-14/10-15. From other sources: ThamTTH off 14–16/10. VyNL request for 16/10 (BinhNT replied). HiepNT + HauTT off 16/10. ThienVN sick morning 10-14. **TuanNT left early 10-14 to see a doctor** (approved by duongdn, make-up hours moved to next week).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Slack GGS #presta-9-update | **Joey's Ruby/Rails-update UAT: 9 issues, no reply yet.** Posted 19:06–21:28. Issues 4, 7 and 8 are marked "major" (can't move a pallet at all) ([issue 4](https://globalgrazingservices.slack.com/archives/C0A9HSU29DL/p1791984519866769), [issue 7](https://globalgrazingservices.slack.com/archives/C0A9HSU29DL/p1791986018997209)). He asks when the fixes will be done and when to plan go-live ([link](https://globalgrazingservices.slack.com/archives/C0A9HSU29DL/p1791988136400269)). Also open in #grazing-software: 2 translation-string asks (18:15, 18:27) and a feature-removal decision in #maintenance (19:24: "should never modify sell price"). Joey added at 04:42 that some issues may be because he used a phone camera rather than a barcode gun. **08:40 recheck: still no reply on any GGS channel.** Bailey ○ |
| 2 | Slack Xtreme (Maddy) | **Madhuraka DM 14:35, unanswered: "Are you checking 468 today?"** ([link](https://xtremesoftsolutions.slack.com/archives/D050TGMRFRQ/p1791963337657789)). This is LIFM2-468 / [PR #548](https://bitbucket.org/xtreme-web/rms/pull-requests/548). **08:40 recheck: still unanswered.** LIFM2-468 is still To Do with no estimate and 0h logged. Maddy ○ |
| 3 | Slack RDC | **dmetiner pushed `feat/istasyon-kontrol-paneli` (20:31) and admin-v2 (00:11) and expects us to deploy them** (to the powergroup domain plus backend). No ack from Carrick after 19:24 ([20:31](https://rdc-fmmonitoring.slack.com/archives/C09L6PH5NUU/p1791984714858379), [00:11](https://rdc-fmmonitoring.slack.com/archives/C09L6PH5NUU/p1791997913978619)). Everything earlier in the day was answered (repo invite, CSV fields, RDS fix deployed). **08:40 recheck: still no ack.** Franc ○ |
| 4 | Workstream | **TuanNT 0h on Wed 10-14 (provisional).** He left early to see a doctor (approved), and logging lag is likely: yesterday's 0h alert turned out false. Re-check after 09:30 before any reminder |
| 5 | Matrix Fountain | ThinhT found a price bug when adding many gifts in pro/send. It reproduces on test.fountaingifts.com, and V2 goes live **today (10-15)**. "How do we tell the customer?" is unanswered (internal) |
| 6 | Email carrick@ | Definitive Guide client (James Lechevalier, Whyte Homes) forwarded "Stripe webhook delivery issues [test mode]" for staging.definitiveguide.co.uk at 16:54. Needs a look (staging) |
| 7 | Email rick@ | InfinityRoses **production** Rollbar #443 reached its 100th occurrence (20:07). FirstProject production #127: 10 occurrences in 5 minutes (03:47 10-15). Project still unidentified |
| 8 | Performance | MPFC apdex 0.44 (poor, chronic). MPFC DB CPU hit 94.8% at 15:06 and resolved 15:36 (DigitalOcean). SQLi-probe search URLs took 45–53s |

**Today (Oct 15):** Fountain V2 goes live. ThamTTH off. Everyone else present as far as known.

---

## Email — all — 05:02 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@ | 4 | — (VyNL leave 16/10, union event, Salesforce notice) | no events |
| carrick@ | 3 | ⚠️ DG client forwarded the Stripe webhook test-mode issue (Alert #6). DG reset-password mail. GitLab failed pipeline upgrade/phase4-es8 (in-progress upgrade, INFO) | no events |
| nick@ | 2 | Heroku backup-MFA reminder. Mailgun plan quota used (INFO) | no events |
| rick@ | 19 | Staging BugSnag/Rollbar (FountainStaging #142/#144/#145/#146: cart_items Date::Error, pro_orders NameError) = INFO, V2 staging churn. ⚠️ InfinityRoses prod #443 hit 100x, FirstProject prod #127 (Alert #7) | 10:30 OmniGPT Daily Sync; 11:00 + 12:30 HEAL Meeting |
| kai@ | 0 | — | no events |
| ken@ | 80 | Welligence GitHub PR/CI/release noise (v2.1.322/323) = INFO | 08:30 DE Daily Standup |
| vuongtrancr@gmail.com | 4 | Bitbucket write access granted to mirko13/traslochi + Mirko's PR #15 mention (follow-up to the 10-14 Traslochi SSH setup). No Swish monitoring alerts | — |
| dnduongus@gmail.com | 25 | No security alerts (Google data-share with digitalocean.com = user OAuth) | — |
| davidztv19@gmail.com | 0 | — | — |
| freelancer@mpfc | 4 | DigitalOcean DB CPU high 15:06 → resolved 15:36. DO sign-in verification code 14:36 (new location; probably the user). Rollbar daily summary: 1 existing error, 0 new | — |

Trello: Check mail — all 6 items ✓ complete, card done.

---

## Slack — all — 05:05 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 6 | MPDM: **Carrick "Some reports for today" 19:26** (#705 dark-mode refinements, /pin page fix, 11 API/CSS tests). Jamie filed [#744](https://github.com/baamboozle/baamboozle-web-app/issues/744) verification-email branding and retested 2 items OK |
| RDC - FM Monitoring | 28 | Busy day. Carrick answered repo invite, CSV fields, preset-buttons deploy and the RDS carry-over fix (deployed to Istanbul). ⚠️ dmetiner's evening deploy requests are unacknowledged (Alert #3) |
| Swift Studio | 0 | quiet |
| Xtreme Soft Solutions | 1 | ⚠️ Madhuraka DM "checking 468 today?" unanswered (Alert #2) |
| SAM GUARD - Mobile | 0 | (Elena-Optimization release announced in another channel, per Matrix) |
| Global Grazing Services | 31 | Nick's daily report 08:48 (#général). Nick's console-500 incident report 09:48, and Joey 21:56: "fix sounds perfect". Amy: Grazing Software Desktop live, estimate breakdown updated. Joey picked items 1, 2, 3 and 5. ⚠️ Joey's 9 UAT issues + translation asks (Alert #1) |
| Amazing Meds | — | Ignore List (cancelled). Not refreshed |
| LegalAtoms | 1 | miratariq posted Michigan court conference notes (#general, no direct ask) |
| Equanimity | 1 | komal confirmed the fix works ✅ |
| Aigile Dev | 1 | blog-post staging bot (Colin is on the Ignore List) |
| Generator / MPFC / William Bills / SoCal | 0 | quiet |

Aysar pre-check: KhanhHH has 1.17h on Workstream Baamboozle for 10-14, and the MPDM report is present → OK.

Trello: Aysar ✓, Rory ✓, Raymond ✓, Marcel ✓, MPFC ✓ / ⚠️ Franc skipped (Alert #3) / ⚠️ Bailey skipped (Alert #1) / ⚠️ Maddy skipped (Alert #2).

---

## Discord — all — 05:06 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 35 | **Vinn "Just report my process today"** (contractor API key, department setup, contractor sign-in form). dapackage update. **Jeff daily report (4h)**: SOS GPS fix [PR #110](https://github.com/airagri/AirAgri_MobileApp_Flutter/pull/110). James is testing the new contractor flow and praised it. James asked how trainers see assessment scores; Vinn: "checking on it" (holding reply) |
| Bizurk (nuscarrick) | 0 + 3 DM | animeworld DM: Carrick apologized and is checking the plugin customization ask. Animeworld acked ("not a big deal"). Internal plan in Matrix: build an add-on plugin, ~1h investigation |

Trello: James Diamond ✓, Andrew Taraba ✓.

---

## Scrin.io — 05:06 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-10-14):** 0h, no sessions recorded. Not TuanNT evidence.

---

## Sheets / Workstream — Wed 2026-10-14 — 05:07 (+07:00)

Source: `workstream-fetch-project-week.js 2026-10-14` (token refreshed via the Keycloak API). Combined per-dev across all projects.

| Developer | Mon 10-12 | Tue 10-13 | Wed 10-14 | Per-project (10-14) | Status |
|-----------|-----------|-----------|-----------|---------------------|--------|
| KhanhHH | 8.17h | 8.0h | 8.0h | Radio Data Center 6.83 + Baamboozle 1.17 | ✓ |
| LeNH | 8.0h | 8.0h | 8.0h | Portfolio - James Diamond 8 | ✓ |
| LongVV | 8.0h | 6.0h | 0h | — | informational (ad-hoc). Told Celine he's working 10-15 |
| TuanNT | 0h (sick) | 8.0h | 0h | — | ⚠️ provisional (Alert #4): left early for the doctor; re-check after 09:30 |
| PhucVT | — | 8.0h | — | (Crystal lang 5 + DG 3 on 10-13) | ignore (ad-hoc/Arthur) |

**Workstream review status (week, reviewer charged / status):**

| Project | Dev hours (wk) | Reviewer charged | Review status |
|---------|----------------|------------------|---------------|
| Baamboozle | KhanhHH 10.33h | — | need_review = false |
| Radio Data Center | KhanhHH 13.83h | LeNH 0h | NotRequired |
| Portfolio - James Diamond | LeNH 24h, AnhNH2 8h | PhucVT/LeNH (LeNH 24h dev) | NotRequired |
| Speedventory (Bailey) | VyNL 11.5h, TuanNT 8h, TrinhMTT 5.5h, VuTQ 4h, DatNC 3h | — | need_review = false |
| OhCleo | LongVV 6h, LuHX 4.5h | DuongDN/MinhTV 0h | **Pending** (3 rows, unchanged): LongVV 10-12 2:00 + 4:00, LuHX 10-13 4:30 |
| Crystal lang | PhucVT 5h | TienND 0h | **Pending**: PhucVT 10-13 2:00 (clarify reqs/estimate) + 3:00 (add pockets to catalog) |
| Definitive Guide | LongVV 8h, PhucVT 3h | — | need_review = false |
| Family App | LuHX 7.5h | — | need_review = false |
| Samguard | TriNM/PhongTB 16h, TienND2 8h, VyTTH 6.5h, AnhTTL 2.75h | — | need_review = false |
| Marcel | DuongDN 0.5h | — | need_review = false |
| Fountain | excluded from review check | | |

Workstream needs review: LongVV, visual direction cover arts (2:00, 10-12) + streamline visual identity (4:00, 10-12); LuHX, Update design home page and track detail (4:30, 10-13). Reviewer(s): DuongDN, MinhTV (OhCleo).
Workstream needs review: PhucVT, Clarify new requirements/estimate & fix (2:00, 10-13) + Add many existing pockets to a catalog (3:00, 10-13). Reviewer(s): TienND (Crystal lang).

## Maddy — W(10-12) — 05:08 (+07:00)

### 1. Task Log Hours (Wed 10-14)
| Developer | Wed | Weekly total | Status |
|-----------|-----|--------------|--------|
| LongVV (Maddy) | 0h | 0h | informational only, ad-hoc |
| Kai role | 0h | 0h | conditional gate not triggered |

### 2. Slack / Kai Daily Report Check
- Workstream Maddy hours = 0h, so the Kai report check doesn't apply.
- ⚠️ **Madhuraka DM 14:35 "Are you checking 468 today?" is unanswered** (last messages from our side were on 10-12). Alert #2.

### 3. JIRA
- `maddy-jira-tasklog-check.js --week 2026-10-14`: "No Workstream entries this week".
- 08:42 live JQL (all projects, `updated >= 2026-10-14 08:00`): **0 tickets touched**, no new comments.
- [LIFM2-468](https://madhuraka-godahewa.atlassian.net/browse/LIFM2-468) "Quoting Tool Issue" (Kai): **To Do, no estimate, 0h logged**, last updated 10-12. [PR #548](https://bitbucket.org/xtreme-web/rms/pull-requests/548) is already open for it. This is the ticket Madhuraka is asking about (Alert #2).

### 4. Bitbucket PR Status (`xtreme-web/rms`, 6 open, unchanged since 10-14)
| PR | Last update | Comments | Title |
|----|-------------|----------|-------|
| [#548](https://bitbucket.org/xtreme-web/rms/pull-requests/548) | 10-12 | 1 (bot) | LIFM2-468 Lens title selection (the subject of Madhuraka's ask) |
| [#540](https://bitbucket.org/xtreme-web/rms/pull-requests/540) | 10-06 | 0 | LIFM2-450 |
| [#481](https://bitbucket.org/xtreme-web/rms/pull-requests/481) | 09-25 | 2 | LIFM2-409 (waiting on customer, not our blocker) |
| [#544](https://bitbucket.org/xtreme-web/rms/pull-requests/544) | 09-21 | 0 | LIFM2-465 |
| [#534](https://bitbucket.org/xtreme-web/rms/pull-requests/534) | 08-26 | 1 | cron quote-assembling fix |
| [#509](https://bitbucket.org/xtreme-web/rms/pull-requests/509) | 08-14 | 4 | LIFM2-428 |

Trello: ⚠️ Maddy skipped (Alert #2).

---

## Fountain — 05:09 (+07:00)

**Part 1 — Matrix plan** (@trinhmtt, Mon 10-12 08:44): DatNT 8h+ · ViTHT 40h · VuTQ 20h · ThinhT 12h → QC 20h.

**Part 2 — Workstream actuals (Mon–Wed):** DatNT 20.58h · ViTHT 3h · VuTQ 8h (plus 4h on Bailey 10-14) · ThinhT 8h · QC PhatDLT 4h (TrinhMTT 4.5h excluded, not QC).

**Part 3 — Plan vs Actual (3/5 of week):**
| Dev | Plan | Actual | Note |
|-----|------|--------|------|
| DatNT | 8h+ | 20.58h | well ahead (V2 merge/deploy) |
| ViTHT | 40h | 3h | far behind pace (~24h expected), 0h on 10-13/10-14. But he was active in Matrix 10-14 (coordinating the V2 go-live), so likely a logging lag. Informational (per-dev 0h alerting is off for Fountain) |
| VuTQ | 20h | 8h | moved to Bailey on 10-14 |
| ThinhT | 12h | 8h | on track |
| QC | 20h | 4h | behind. QC is testing V2 on staging now |

**Part 4 — Capacity & Runway:** ~~not re-fetched this run~~ re-fetched live 08:44 (Est vs Charged, A13:L118, 106 rows): Narrow **229.00h / 28 tasks** · Broad **328.50h / 63 tasks**. Unchanged from 10-14; the sheet has been frozen since August.
**Part 5 — Over-estimate:** re-fetched live 08:44: **37 items >120%**, unchanged.

**Trello board (Web Development):** Kunal 09:48 asked whether the CSV engraving change could go live tonight. Rick answered 09:58: wait for tomorrow's V2 deploy ✅ ([card](https://trello.com/c/8JfTlU40)). No other customer comments. Lists: To-Do 16 · Bugs 28 · Doing 3 · QC Internal 5 · QA Backlog 6 · In QA 1 · Done v2 37. V2 go-live is today. The internal price bug ThinhT found is still open (Alert #5).

Trello: Fountain - DOCUMENT ✓ complete (customer comments answered).

---

## Elena — 05:09 (+07:00)

- Elena - SamGuard Digital Plant: Ignore List (paused). FYI: Elena-Optimization released 10-14 and the customer was told 17:02 (see Matrix).
- **WordPress samguard.co:** HTTP 200, 0 jsErrors / 0 pageErrors / 0 cspViolations. Only 8 GA/ads `failedRequests` (noise). Clean. Trello: Elena - WordPress SamGuard ✓.

---

## Trello — Check progress — 05:12 (+07:00)

[Check progress](https://trello.com/c/WQYUmpw8) · [Check mail](https://trello.com/c/0YEgbP0l) (all done)

- James Diamond ✓ · Rory ✓ · Aysar ✓ · MPFC ✓ · Marcel ✓ · Raymond ✓ · Neural Contract ✓ (checked 08:40, quiet) · Andrew Taraba ✓ · Fountain - DOCUMENT ✓ · Ohcleo ✓ · Elena - WordPress SamGuard ✓
- ⚠️ Maddy: skipped (Alert #2, still unanswered at 08:40)
- ⚠️ Franc: skipped (Alert #3, still no ack at 08:40)
- ⚠️ Bailey: skipped (Alert #1, plus provisional Alert #4)

## Ignore List — 05:12 (+07:00)
Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds, Rebecca (William Bills), Elliott

---

## Reminders — 05:12 (+07:00)
- TuanNT: 0h on 10-14 (provisional, left early for the doctor). Not sent (cron, no `--send-reminder`). Re-verify after 09:30 first, since yesterday's reminder was a false positive.
- KhanhHH, LeNH: have hours, skipped. LongVV: no target. PhucVT: ignored.

---

## Matrix — 05:03 (+07:00)

**Active rooms: 21 / 151 | Messages: 391** *(since 10-14 08:45)*
Full details: reports/2026-10-15/matrix-rooms-0503.md

The script flagged 3 action items. All were already answered or were team discussion: Lyf LSA-1524 deploy confirmed by duongdn 14:02 ✅; the Elena env-split idea is a team discussion, not an ask. No pending action items for DuongDN.

### Key updates

**Bailey: urgent console 500s, fix underway**:
- Bulk quick_modify_update is not in background jobs, so the weaker split servers fall over (#81430). duongdn: fix it free and move all heavy APIs to background jobs. VuTQ is on it. Nick sent an incident report to Joey, who approved the fix.
- Grazing Desktop fixes are live. Translation-string change pending (TuanNT left early).

**Fountain: V2 go-live 10-15**:
- V2 + Staff app on staging/beta. Heavy conflict resolution means possible lost code. QC is testing. Price bug found (Alert #5).

**Elena - Optimization: released 10-14 ✅**:
- FE PR #5511 + BE PR #5512 (Precognize). The customer was notified. Task-log tags are now Optimization + OP-M2.

**Other:**
- Lyf: new PHP→C# API port estimated at 20h + tester. "For You" page is WordPress.
- Andrew Taraba: customer AI script broken. Plan: add-on plugin, ~1h investigation.
- TuanNT: confirmed the 10-13 hours were logged (false reminder). Left early 10-14 for the doctor.
- Resource: HiepNT + HauTT off 16/10. LuHX covers Cameron on Friday.

---

## OhCleo Slack — 05:09 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 2 | Celine 16:58 VN: "will you be working tomorrow or friday?" Tony 17:01: "I will working on tomorrow" ✅ answered |
| #events-code | — | channel_not_found (known; needs admin re-invite) |

Tony daily report: none for 10-14, but Workstream OhCleo = 0h that day (no work → no report expected). Trello: Ohcleo ✓.

---

## Performance — all — 05:10 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.98 | 140ms | 2.1% (535/25293), ~90% benign NotAuthenticated | 20.7/min |
| mpfc | **0.44** | 2008ms | 2.2% (583/26935) | 22.1/min |
| fountain | 0.99 | 113ms | 0% (0/67714) | 55.5/min |
| infinity | 0.98 | 127ms | 0.05% (9/16724) | 13.7/min |

**OhCleo topErrors:** NotAuthenticated 483 · InvalidToken 20 · ValidationError email exists 9 · AuthenticationFailed "Passwords don't match" 7 · AuthenticationFailed "User does not exist" 5 · ValidationError email exists (variant) 3 · ValidationError username exists 3 · ValueError Invalid bcrypt hash 2 · **IntegrityError null user_id in app_playhistory 1+1 (new)**.
**OhCleo slowest:** bookmarks GetBookMarkDetail 1386ms/747 · subscriptions ValidatePurchase 1175ms/2 · users UpdateMeView.put 970ms/1 · email_verification 947ms/12 · categories CategoryMedia 877ms/229.

**MPFC topErrors:** `continue` targeting switch E_WARNING 548 · WP_Error::get_method() 18 · mkdir name too long 4 · mysqli socket 3 · require legacy-widget.php 2 · count() non-countable 2 · undefined get_header() 2+1+1 · mysqli getaddrinfo 1.
**MPFC slowest:** 5x SQLi-probe `search/-1%25…` / `x9xRVqRk%27…` URLs at 44.8–53.1s/1 each (bot probes; real slowness under attack traffic).

**Fountain topErrors:** none.
**Fountain slowest:** admin/gifts/import_csv 16814ms/1 · build_a_box_gift_variants 9467ms/57 · admin/gifts/update 3628ms/6 · paypals/authorize_order 2462ms/8 · pro_payment_intents/create 1830ms/1.

**Infinity topErrors:** ArgumentError wrong number of arguments 9 · UnknownFormat 8.
**Infinity slowest:** paypals/authorize_order 2915ms/1 · payment_intents/create 2226ms/6 · registrations/create 1824ms/2 · search 1536ms/37 · paypals/generate_order 1282ms/2.

---

## Arthur — Ignore List
Paused per user. Not run, Trello auto-completed.

---

## Upwork Memo — 2026-10-14 — 05:11 (+07:00)

| Workroom | Memos | Invalid | Details |
|----------|-------|---------|---------|
| Rory | ~~—~~ 0 | 0 | No time tracked 10-14 (LeNH was on James Diamond 8h) |
| Aysar | ~~—~~ 1 | 0 | "Refine dark mode button colors, headers, and game selection styling" is valid (action + object). It matches KhanhHH's WS Baamboozle row (1:10) |
| Tokenlite | ~~—~~ 0 | 0 | No time tracked |

~~Upwork memo: data unavailable — this cron host has no carrick Chrome profile and can't launch Puppeteer (known host gap).~~ 08:40 local recheck: `env -u DISPLAY node scripts/upwork-memo-check.js --date=2026-10-14` ran OK. **0 invalid memos.**
- Script fix: the rule flagged the Aysar memo invalid ("no action verb") because `refine` was missing from `scripts/upwork-memo-rules.js` ACTION_VERBS. Added refine/improve/enhance/polish/tweak/modify/change/upgrade/rework/style. Re-tested: valid. "Booking Flow – BXR Member Classes" is still invalid.
- Neural Contract: ~~same host limitation~~ checked 08:40 via `upwork-neural-check.js`. Newest message 09-28 (client), nothing new in window. Quiet, Neural ✓.

---

## Unresolved Questions
- TuanNT 10-14 0h: real gap, or logging lag after leaving early sick? Re-check Workstream after 09:30 before any reminder.
- Who answers Joey's 9 Ruby/Rails UAT issues and his go-live timing question (Bailey)?
- Fountain price bug found on test.fountaingifts.com: report it to Kunal before or after today's V2 go-live?
- FirstProject production Rollbar #127: which client project is this? (Still unknown.)
~~- Upwork memo + Neural need a run on the local machine.~~ Done 08:40, clean.
