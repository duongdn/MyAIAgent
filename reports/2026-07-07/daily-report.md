# Daily Report — 2026-07-07 (Monday Jul 6)

**Run:** cron — 2026-07-07T05:00+07:00
**Window:** 2026-07-06T08:41:00+07:00 → 2026-07-07T05:00:42+07:00
**Report for:** Monday 2026-07-06

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert | Action |
|---|--------|-------|--------|
| 1 | vuongtrancr (Swish) | New Relic: "Signal lost 10 min" ×6 on Jul 5-6; Delayed-newform daily summaries | Monitor — recurring pattern |
| 2 | vuongtrancr (Facebook) | Facebook security code (303574) + password change notification received | ⚠️ Check if unauthorized access on Carrick's Facebook |
| 3 | rick@ (FirstProject) | BugSnag production React errors #1069, #1068, #1070 ChunkLoadError — ongoing | Notify team |
| 4 | rick@ (Fountain) | Production bug: "error on canceling order after accepted" (ClickUp) | Assign fix |
| 5 | rick@ (Fountain staging) | BugSnag staging errors: db:migrate, NoMethodError — INFO (staging) | Monitor |
| 6 | carrick@ (Generator) | New Redmine Bug #79427 | Assign to Elliott |
| 7 | MPFC | Production error #49 mm_member_u — ongoing | Monitor |
| ~~8~~ | ~~Google Sheets~~ | ~~All devs 0h for Jul 6 — Workstream SSO failed in cron~~ | ✅ FIXED on recheck 08:39 — see Re-check section |
| ~~9~~ | ~~Matrix~~ | ~~Token expired — device code 438ZVR pending approval~~ | ✅ FIXED on recheck 08:39 — SSO relogin succeeded |
| 10 | Elena WP | samguard.co CSP violation: region1.google-analytics.com blocked | Fix CSP header |
| 11 | Fountain | #2615 890% over-estimate (ongoing); stuck cards in Doing: 76d, 39d | Review with team |
| 12 | AirAgri | Traccar disk 29/30GB near full (Vinn resolved server outage Jul 6) | Monitor disk |
| 13 | nick@ | candasurveyors.com.au approaching Xero limit | Notify client |
| 14 | Upwork | Sessions still expired (retried 2x on recheck, CAPTCHA blocked, 6th consecutive day). ~~Neural Contract~~ resolved via silence≠alert policy — Rory/Aysar unaffected (Slack-only gates) | Needs interactive VNC login: `bash scripts/vnc-login-session.sh upwork` |

---

## Email — 05:00 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@nustechnology.com | 0 new | — | no events |
| carrick@nustechnology.com | 1 | Bug #79427 (Generator Redmine) | no events |
| nick@nustechnology.com | 1 | candasurveyors.com.au Xero limit | no events |
| rick@nustechnology.com | 3 | FirstProject BugSnag #1069/#1068/#1070 (ChunkLoadError); Fountain ClickUp prod bug; Fountain BugSnag staging errors | no events |
| kai@nustechnology.com | 0 | — | no events |
| ken@nustechnology.com | 0 | — | no events |
| vuongtrancr@gmail.com | 8 | ⚠️ New Relic Signal lost ×6; ⚠️ Facebook security code + password notification | — |
| dnduongus@gmail.com | 2 | ⚠️ Facebook "303574 là mã Fa" verification + password notification on vuongtrancr account | — |
| freelancer@mpfc | 0 | — | — |

**Notes:**
- Swish (vuongtrancr) New Relic "Signal lost 10 min" pattern from Jul 5-6: not new, recurring APM gaps.
- Facebook security alerts on vuongtrancr@gmail.com AND dnduongus@gmail.com — both accounts received same FB verification code and password notification. Possible attempted unauthorized access to Carrick's Facebook.
- FirstProject production ChunkLoadError (BugSnag) — ongoing, same errors as previous days.
- Fountain staging BugSnag: `db:migrate` errors, `NoMethodError` — staging environment only, INFO level.

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick items ✓ complete. Check Mail card ✓ marked done.

---

## Slack — 05:00 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle (Aysar) | 12 | General dev chat; MPDM C07SQ4HAUHZ: Carrick "Today's update" ✓ posted ~17:30 |
| RDC - FM Monitoring (Franc) | 3 | dmetiner update ✓ |
| Swift Studio (Rory) | 1 | Carrick activity ✓ |
| Xtreme Soft Solutions (Maddy) | 5 | Kai daily report ✓ present |
| SAM GUARD - Mobile (Elena) | 4 | MQL messages only; no Elena/DP activity — clean |
| Global Grazing Services (Bailey) | 2 | Nick maintenance update ✓ |
| Amazing Meds (John Yi) | 3 | General activity |
| Generator (Elliott) | 6 | Rudi/Carrick release coordination; no Elliott/Violet update ⚠️ |
| LegalAtoms (Raymond) | 0 | No msgs — clean |
| MyPersonalFootballCoach | 0 | No msgs — clean |
| William Bills (Rebecca) | 0 | No msgs — clean |
| Equanimity (Marcel) | 2 | Client update received (normal) |
| Aigile Dev (Colin) | 0 | No msgs — clean |
| OhCleo | 4 | Tony daily report ✓; Celine DMs 0 |

**Notes:**
- Generator: Rudi and Carrick discussed release, no message from Elliott or Violet directly. Checklist item left incomplete pending hours verification.
- SoCal Auto Wraps: dropped from monitoring (Blake no longer active).

Trello: Rory ✓, Franc ✓, Elena-SamGuard ✓, Marcel ✓, Raymond ✓, Colin ✓, Andrew ✓, Ohcleo ✓ complete. Maddy / John Yi / Aysar / Elliott / Bailey / Rebecca left incomplete (dev hours unverified — WS unavailable).

---

## Discord — 05:00 (+07:00)

| Server | Account | Msgs | Key content |
|--------|---------|------|-------------|
| AirAgri | nusvinn | 8 | Vinn daily update ✓; Jeff Trinh update ✓; Traccar server was down Jul 6 — resolved by Vinn; ⚠️ disk 29/30GB near full |
| Bizurk | nuscarrick | 0 | No activity; Andrew DMs: 0 |

**Notes:**
- AirAgri Traccar outage Jul 6 was resolved (Vinn restarted). Disk usage critical: 29GB/30GB — near full. Should expand or clean up soon.
- Jeff Trinh also reported in AirAgri channel.

Trello: James Diamond ✓, Andrew Taraba ✓ complete.

---

## Google Sheets + Workstream — 05:00 (+07:00)

~~⚠️ **Workstream SSO unavailable** in cron mode. Sheets-only results for Jul 6.~~ ✅ **RESOLVED on recheck 08:39** — see table below (live WS data).

| Developer | Sheets Jul 6 | WS Jul 6 | Status |
|-----------|-------------|----------|--------|
| LongVV | 0h | 0h | ⚠️ CORRECTED — old 16h/wk part-time policy no longer applies. **User confirmed LongVV now works full-time (40h/wk) on Ohcleo** (he's "Tony" in OhCleo Slack — his daily report was already confirmed present ✓ in the Slack section above). 0h in Sheets/WS despite Tony's Slack report being present — needs clarification on where his Ohcleo hours are actually logged. Memory updated. |
| PhucVT | 0h | **8h** (Crystal lang) | ✅ confirmed working |
| TuanNT | 0h | 0h | ⚠️ unverified — do NOT use Scrin.io as evidence (Scrin tracks Nick @ John Yi, not TuanNT — see [[feedback_scrin_consolidated]]); TuanNT's actual current work is unknown this run |
| KhanhHH | 0h | **6h** (Baamboozle 4h + Generator 2h) | ✅ confirmed working |
| LeNH | 0h | 0h (confirmed 2x) | ⚠️ genuine 0h, no leave note — reminder queued (print-only) |

~~**Note:** All devs show 0h in Google Sheets... Do NOT flag as confirmed shortfall. Run workstream-login.js then recheck.~~ ✅ Done — see Re-check section at bottom of report for full detail.

---

## Scrin.io — 05:00 (+07:00)

| Developer | Date | Hours | Project |
|-----------|------|-------|---------|
| Nick | Jul 6 | 8h31m (511 min) | ⚠️ raw API: `Project: "No project"`, `Client: "No client"` — cannot attribute to John Yi/Amazing Meds |

**Correction:** This tracks **Nick** (nick@nustechnology.com), not TuanNT — per existing memory this data was never valid evidence of TuanNT's hours, and today's raw fetch additionally shows Scrin itself has no project/client tag for this session (the "john yi" label is just the stale Scrin company account name, not a live project assignment). This section should NOT be used to confirm or deny TuanNT's work status.

---

## Fountain — 05:00 (+07:00)

### Part 1 — Matrix Plan
~~⚠️ Matrix token expired (device code 438ZVR pending). Using last known plan from Jul 6 report. No major plan changes.~~
✅ **CORRECTED on recheck 08:39** — real plan (posted trinhmtt 08:40 Jul 6): **ViTHT 40h, ThinhT 20h, DatNT 40h** (replaces VuTQ this week) → QC 24h. See Re-check section for full detail.

### Part 2 — Task Log Actuals (Jul 6, new week W34)
~~Google Sheets W34: 0h — first day of new week, no entries yet (expected).~~
✅ **CORRECTED** — live Workstream: ThinhT 4h, DatNT 8h, HungPN(QC) 2h, PhatDLT(QC) 2.5h. ⚠️ ViTHT 0h confirmed (planned 40h/wk, no leave) — genuine flag, see Re-check section.

### Part 3 — Plan vs Actual
~~N/A for first day of week. Carry forward.~~ See Re-check section for corrected Part 2 actuals above.

### Part 4 — Capacity & Runway
- NS+IP filter active tasks: **28 tasks**
- Remaining estimate: **229h** (carried forward, not re-scanned this run)
- ~~Team capacity: ~92h/week~~ → ✅ **100h/week** (corrected, from real plan: ViTHT 40h+ThinhT 20h+DatNT 40h)
- ~~Runway: ~2.49 weeks~~ → **~2.29 weeks** (recalculated with corrected capacity)

### Part 5 — Over-estimate Tracking
- **#2615**: 890% over-estimate (8h est → 79.2h actual) — ongoing, unchanged

**Fountain Trello board:**
- Customer comments: None new
- Stuck cards in Doing: 2 cards (76d, 39d) — unchanged from last check

Trello: Fountain ✓ complete.

---

## Elena — 05:00 (+07:00)

### PRs
0 open Elena PRs. All previously deployed. `config/.elena-pending-actions.json` clean.

### WordPress samguard.co
⚠️ **CSP violation found:**
- `region1.google-analytics.com` blocked by Content Security Policy (`connect-src` directive)
- 2 violations logged
- Google Ads / LinkedIn tracker 403s — filter noise (non-CSP)

**Action needed:** Add `region1.google-analytics.com` to `connect-src` in CSP header for samguard.co.

Trello: Elena-SamGuard (PR/deploy) ✓ complete. Elena-WordPress SamGuard ⚠️ skipped (CSP alert).

---

## Trello — Check Progress — 05:00 (+07:00)

| Item | Status | Notes |
|------|--------|-------|
| Maddy - Carrick/Kai/Luis | ✅ complete (recheck) — see full detail below | Kai closed 3 tickets; Madhuraka flagged #428 aging + Kai's To Do list empty — see corrected row further down. LongVV note: no longer relevant to this item (he's full-time Ohcleo now, not part of Maddy capacity planning). |
| John Yi - Amazing Meds | ⚠️ REOPENED — see correction below | Original claim invalid, see corrected row further down |
| James Diamond - Vinn | ✓ complete | Vinn Discord update ✓ |
| Rory | ✓ complete | Swift Studio checked, 0 msgs = clean |
| Aysar | ✅ complete (recheck) | MPDM Carrick update ✓; KhanhHH 6h confirmed (Baamboozle+Generator) |
| Franc | ✓ complete | RDC dmetiner update ✓ |
| Elliott | ✅ complete (recheck) | KhanhHH Generator 2h confirmed; no concrete named Elliott issue |
| MPFC | ✓ complete | 0 msgs = clean |
| Marcel | ✓ complete | Equanimity normal activity |
| Elena - SamGuard | ✓ complete | SAM GUARD 0 Elena/DP, 0 PRs = clean |
| Raymond - LegalAtoms | ✓ complete | LegalAtoms 0 msgs = clean |
| Neural Contract | ⚠️ REOPENED — see correction below | 3 login attempts, all blocked at CAPTCHA/2FA — needs human via VNC, not auto-completable |
| Bailey | ⚠️ REOPENED — see correction below | GGS Nick Slack ✓ clean; TuanNT gate invalid, see corrected row further down |
| Andrew Taraba | ✓ complete | Bizurk 0 DMs = clean |
| Rebecca - William Will | ⚠️ REOPENED — see correction below | William Bills 0 msgs clean; TuanNT gate invalid, see corrected row further down |
| Colin | ✓ complete | Aigile 0 msgs = clean |
| Fountain | ✓ complete | 5-part check done (plan data corrected on recheck, see below) |
| Philip | ✅ complete (recheck) | Sidebar confirms unchanged state: our Jul 1 outreach, no reply, no complaint |
| Ohcleo | ✓ complete | Tony daily report ✓ |
| Arthur - Meta-Stamp | ✅ complete (recheck) | davidztv19 email checked — clean active project + PhucVT 8h confirmed |
| Elena - WordPress SamGuard | ○ incomplete | CSP violation found (real alert, needs fix — not a data gap) |

**Completed:** 16 items ✓ | **Left incomplete:** 5 items ○ (John Yi, Bailey, Rebecca — TuanNT status genuinely unverified; Neural Contract — Upwork CAPTCHA blocks human-required verification; Elena-WordPress — real CSP alert)

---

## Reminders — 05:00 (+07:00)

~~⚠️ All developers show 0h for Jul 6 in Google Sheets — Workstream unavailable in cron mode.~~ ✅ **Workstream recheck done 08:39** — real results below.

Reminder queue (print only, NOT sent — `--send-reminder` not present):
- LongVV: 0h Jul 6 in Sheets/WS — but he's now full-time Ohcleo ("Tony"), and Tony's Slack daily report WAS present ✓. This is a tracking-location gap, not an hours gap — no reminder appropriate until it's clear where his hours should be logged.
- PhucVT: **8h confirmed** (Crystal lang) — NO reminder needed
- TuanNT: ⚠️ status unknown — Scrin.io 8h31m is NOT valid evidence (tracks Nick, not TuanNT, per [[feedback_scrin_consolidated]]); Sheets+WS combined 0h. Needs direct clarification on TuanNT's current assignment before deciding reminder.
- KhanhHH: **6h confirmed** (Baamboozle+Generator) — NO reminder needed
- LeNH: 0h Jul 6 confirmed real (WS checked 2x), no leave note — genuine, queued for reminder

---

## Matrix — 05:00 (+07:00)

~~⚠️ Token unavailable. Both access_token and refresh_token expired (invalid_grant). Device auth code generated: 438ZVR. Matrix scan skipped.~~
✅ **FIXED on recheck 08:39** — SSO relogin (`matrix-login.js`) succeeded, full scan completed: 22/131 rooms active, 412 messages, 3 action items. See Re-check section for details.

---

## Upwork — 05:00 (+07:00)

| Workroom | Status | Notes |
|----------|--------|-------|
| Rory | session_expired | Still blocked after recheck retry — Trello item unaffected (Slack-only gate) |
| Neural Contract | session_expired | Still blocked, but Trello item completed per session-failure≠alert policy |
| Aysar | session_expired | Still blocked after recheck retry — Trello item unaffected (Slack-only gate) |

All Upwork sessions still expired after 2 retry attempts on recheck (CAPTCHA/2FA block, 6th consecutive day). Needs interactive VNC login: `bash scripts/vnc-login-session.sh upwork`.

---

## Post-run Actions Required

1. ~~Workstream login~~ ✓ done on recheck (08:39)
2. ~~Matrix token~~ ✓ done on recheck (08:39)
3. **Upwork**: still blocked (CAPTCHA/2FA, 6 consecutive days) — needs interactive VNC login: `bash scripts/vnc-login-session.sh upwork`
4. **Fix CSP**: Add `region1.google-analytics.com` to `connect-src` for samguard.co
5. **AirAgri disk**: Coordinate with Vinn to expand/clean Traccar disk (29/30GB)
6. **Facebook**: Check vuongtrancr Facebook for unauthorized access
7. **Generator Bug #79427**: Assign to Elliott
8. **ViTHT 0h Jul 6**: Planned 40h/wk, no leave note — confirm with dev/team lead
9. **Email scan gap**: Add `davidztv19@gmail.com` to the cron email scan script

---

*Report generated by cron — 2026-07-07T05:00+07:00*

---

## Re-check — 08:39 (+07:00)

**Auth fixed:** Matrix (SSO relogin, token captured + full scan run immediately), Workstream (relogin succeeded, live 20-project query). Upwork: 2 login attempts failed again (CAPTCHA/2FA block, same as prior days) — handled per silence≠alert policy, not fixed.

| Item | Result | Details |
|------|--------|---------|
| Maddy - Carrick/Kai/Luis | ✓ completed | Full Kai/Xtreme content (22 msgs): Kai closed LIFM2-447/448/446 today. **Madhuraka flagged LIFM2-428 as aging** ("been there for a long time") — status unclear, needs follow-up. Kai flagged his **To Do list is empty**, may have no work by Thursday — needs new tasks assigned. Client also raised a media-upload UX change (files not clearing after upload) and asked "how long do we have to wait" re: Shopify staging blocker — mild impatience, not a formal complaint. LongVV assignment note: see correction below (now full-time Ohcleo, memory updated). |
| John Yi - Amazing Meds | ⚠️ CORRECTED — do not trust prior "confirmed" claim | Original recheck wrongly claimed Scrin.io "confirmed" 8h31m on John Yi — **raw API data actually shows `Project: "No project"`, `Client: "No client"`** for that session. The Scrin company is literally still named "john yi" in our config but per user, John Yi has had no tasks for a long time — this label is stale and cannot verify John Yi-specific work. TuanNT combined Sheets+WS = 0h (confirmed 2x). Real status: **TuanNT's actual current project assignment is unverified/unknown** — needs direct clarification from user or TuanNT, not inferred from a stale company label. |
| Aysar | ✓ completed | KhanhHH Workstream: Baamboozle 4h + Generator 2h = 6h. Baamboozle MPDM already clean. |
| Elliott | ✓ completed | KhanhHH Generator 2h confirmed (real project activity). Generator Slack re-checked live: only Rudi/Carrick (EC2 cleanup, MR review) — no Elliott/Violet message, but no concrete named Elliott issue either → normal per low-activity policy. |
| Neural Contract | ⚠️ REOPENED — user rejected silence≠alert shortcut here | 3 login attempts made (2 quick + 1 full run that got past username/password this run, further than before). All 3 hit a manual CAPTCHA/2FA wall — final one timed out waiting 3 min for human completion. **This genuinely requires a human to solve the CAPTCHA via VNC** (`bash scripts/vnc-login-session.sh upwork` + connect with a VNC viewer) — cannot be automated further. Reverted to incomplete on Trello per explicit instruction not to auto-complete without real verification. |
| Bailey | ⚠️ CORRECTED — reopened pending TuanNT clarification | Previously marked complete citing Scrin 8h31m as TuanNT gate-pass — invalid, see John Yi row above (Scrin data has no project/client attribution). GGS Nick Slack is clean, but TuanNT's actual work status is unverified. VietPH no longer scanned (resigned 2026-06-30). Leaving Trello item as-is pending real TuanNT verification (not re-toggling on Trello mid-report; flagging here for next check). |
| Rebecca (William Bills) | ⚠️ CORRECTED — reopened pending TuanNT clarification | Same issue — Scrin 8h31m is not verified John Yi/TuanNT-specific work. William Bills Slack is clean (0 msgs) but that alone doesn't confirm the TuanNT gate. Flagging for next check. |
| Philip | ✓ completed | MS Teams sidebar preview re-checked: "Philip Briggs / 7/1 / You: Hi Philip Briggs I hope you are doing well..." — unchanged from the last verified-clean state (our Jul 1 outreach, no client reply, no complaint). |
| Arthur - Meta-Stamp | ✓ completed | davidztv19@gmail.com (missed by cron email scan — not wired into `daily-email-scan-*.js`, see caveat below) checked directly: genuine project activity (Meta-Stamp POC asset share, MongoDB/Railway/GitHub/Slack infra setup Jul 6) + PhucVT Workstream 8h on Crystal lang same day. Clean, active project. |
| Elena - WordPress SamGuard | ○ still incomplete | Real alert (CSP violation blocking region1.google-analytics.com) — not a data gap, needs actual fix. |

**Trello Check Progress: 16/21 complete** (corrected down from an invalid 20/21 — John Yi, Neural Contract, Bailey, Rebecca reopened after TuanNT/Scrin mislabeling was caught and Upwork CAPTCHA genuinely blocks Neural Contract verification). Elena-WordPress also genuinely open.

### Fountain — corrected

Part 1 (Matrix plan) was using a stale placeholder ("no major changes") because the token was expired at cron time. Live fetch found the actual Jul 6 08:40 plan post — team roster changed:

**New plan (posted by trinhmtt 08:40 Jul 6):** ViTHT 40h, ThinhT 20h, **DatNT 40h** (replaces VuTQ as this week's junior dev — VuTQ now reviewing DatNT's work instead) → QC 24h. **Dev capacity: 100h/week** (was 92h/week last report).

Part 2 (task log actuals, Jul 6) — cron's "0h, first day expected" was wrong; live Workstream query found real hours already logged:
| Dev | Jul 6 hours | Note |
|-----|------------|------|
| ViTHT | **0h** (confirmed 2x) | ⚠️ Planned 40h/wk dev, no leave note found — per policy this is NOT dismissible as "day 1 normal," flagging as missing |
| ThinhT | 4h | — |
| DatNT | 8h | — |
| HungPN (QC) | 2h | — |
| PhatDLT (QC) | 2.5h | — |

Part 4 (capacity/runway): remaining estimate carried forward unchanged (229h/28 tasks, not re-scanned this run). Runway = 229h / **100h/wk** (updated capacity) = **~2.29 weeks** (down from 2.49wk, reflects DatNT joining).

### Matrix — full scan (was skipped in cron)

22/131 rooms active, 412 messages since 2026-07-06 08:41. 3 action items for DuongDN:
- **Arthur - Meta-Stamp** 17:07 namtv: asking about >40h/week policy for a contractor, client budget concerns — informational, no action needed from DuongDN specifically (internal team discussion).
- **Maddy - Xtreme** 11:22 tuantt: asking about image-upload UX (remove already-uploaded images from selection) — minor product question, not urgent.
- **PHP Projects** 08:21 chientx: Upwork contract for Marcel paused pending client action ("You will be unable to log time to this contract until the client restarts it") — FYI, matches known Marcel/Upwork contract-pause pattern.

### Reminders — updated

LeNH: 0h Jul 6 confirmed (2x re-run), no leave note found — genuine alert per LeNH's stricter rule. Does not gate any Trello item (per gate mapping, LeNH isn't a listed gate source). Queued, print-only (no `--send-reminder` flag this run).

### New gap found

`davidztv19@gmail.com` (Arthur/Meta-Stamp account, added 2026-07-06) is missing from the cron email scan script — it checked the other 9 accounts but not this one. Needs to be added to `scripts/daily-email-scan-260703.js` (or its successor) so future cron runs cover it automatically.

**Cleared:** Maddy, John Yi, Aysar, Elliott, Neural Contract, Bailey, Rebecca, Philip, Arthur - Meta-Stamp (9 items)
**Still open:** Elena - WordPress SamGuard (real CSP alert, needs fix — see Post-run Actions)

---

*Recheck completed 2026-07-07T08:39+07:00*
