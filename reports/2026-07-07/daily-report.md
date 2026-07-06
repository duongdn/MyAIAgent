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
| 8 | Google Sheets | All devs 0h for Jul 6 — Workstream SSO failed in cron | ⚠️ RECHECK needed after WS login |
| 9 | Matrix | Token expired — device code 438ZVR pending approval | Manual: approve at matrix.nustechnology.com/auth/link?code=438ZVR |
| 10 | Elena WP | samguard.co CSP violation: region1.google-analytics.com blocked | Fix CSP header |
| 11 | Fountain | #2615 890% over-estimate (ongoing); stuck cards in Doing: 76d, 39d | Review with team |
| 12 | AirAgri | Traccar disk 29/30GB near full (Vinn resolved server outage Jul 6) | Monitor disk |
| 13 | nick@ | candasurveyors.com.au approaching Xero limit | Notify client |
| 14 | Upwork | Sessions expired: Neural Contract, Aysar, Rory — not verified | Run upwork-login.js interactively |

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

⚠️ **Workstream SSO unavailable** in cron mode. Sheets-only results for Jul 6.

| Developer | Sheets Jul 6 | WS Jul 6 | Status |
|-----------|-------------|----------|--------|
| LongVV | 0h | N/A | ⚠️ Needs recheck (new week W-start) |
| PhucVT | 0h | N/A | ⚠️ Needs recheck |
| TuanNT | 0h | N/A | ⚠️ Needs recheck |
| KhanhHH | 0h | N/A | ⚠️ Needs recheck |
| LeNH | 0h | N/A | ⚠️ Needs recheck |

**Note:** All devs show 0h in Google Sheets. This is the first working day of a new week for most sheets (new W-tab). Pattern matches 2026-07-02 cron run where WS recheck found real hours (PhucVT 8h, KhanhHH 3.5h). **Do NOT flag as confirmed shortfall.** Run `DISPLAY=:1 node scripts/workstream-login.js` then recheck.

---

## Scrin.io — 05:00 (+07:00)

| Developer | Date | Hours | Project |
|-----------|------|-------|---------|
| Nick (TuanNT) | Jul 6 | 8h31m (511 min) | John Yi - Amazing Meds |

TuanNT confirmed working 8h31m on Jul 6 via Scrin.io.

---

## Fountain — 05:00 (+07:00)

### Part 1 — Matrix Plan
⚠️ Matrix token expired (device code 438ZVR pending). Using last known plan from Jul 6 report.

**Last known (Jul 6):** Week of Jul 6-12. No major plan changes.

### Part 2 — Task Log Actuals (Jul 6, new week W34)
Google Sheets W34 (Jul 6-12): 0h — first day of new week, no entries yet (expected).

### Part 3 — Plan vs Actual
N/A for first day of week. Carry forward.

### Part 4 — Capacity & Runway
- NS+IP filter active tasks: **28 tasks**
- Remaining estimate: **229h**
- Team capacity: ~92h/week (5 devs × ~1.5d avg)
- Runway: **~2.49 weeks** (flat from last report)

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
| Maddy - Carrick/Kai/Luis | ○ incomplete | Kai Slack ✓, Maddy OK; LongVV weekly hours unverified (WS unavailable) |
| John Yi - Amazing Meds | ○ incomplete | TuanNT confirmed via Scrin 8h31m but WS hours unverified for full check |
| James Diamond - Vinn | ✓ complete | Vinn Discord update ✓ |
| Rory | ✓ complete | Swift Studio checked, 0 msgs = clean |
| Aysar | ○ incomplete | MPDM Carrick update ✓; KhanhHH hours unverified (WS unavailable) |
| Franc | ✓ complete | RDC dmetiner update ✓ |
| Elliott | ○ incomplete | No Elliott/Violet Slack + KhanhHH 0h |
| MPFC | ✓ complete | 0 msgs = clean |
| Marcel | ✓ complete | Equanimity normal activity |
| Elena - SamGuard | ✓ complete | SAM GUARD 0 Elena/DP, 0 PRs = clean |
| Raymond - LegalAtoms | ✓ complete | LegalAtoms 0 msgs = clean |
| Neural Contract | ○ incomplete | Upwork session expired — not verified |
| Bailey | ○ incomplete | GGS Nick ✓; TuanNT hours unverified (WS unavailable) |
| Andrew Taraba | ✓ complete | Bizurk 0 DMs = clean |
| Rebecca - William Will | ○ incomplete | William Bills 0 msgs; TuanNT unverified |
| Colin | ✓ complete | Aigile 0 msgs = clean |
| Fountain | ✓ complete | 5-part check done |
| Philip | ○ incomplete | Philip Briggs not found in MS Teams chat list |
| Ohcleo | ✓ complete | Tony daily report ✓ |
| Arthur - Meta-Stamp | ○ incomplete | No monitoring source available |
| Elena - WordPress SamGuard | ○ incomplete | CSP violation found (alert) |

**Completed:** 11 items ✓ | **Left incomplete:** 10 items ○

---

## Reminders — 05:00 (+07:00)

⚠️ **All developers show 0h for Jul 6 in Google Sheets** — but Workstream is unavailable in cron mode.

Per previous pattern (Jul 2, 2026): cron-mode WS login fails silently → devs appear 0h → interactive recheck reveals real hours.

**DO NOT send reminders until Workstream recheck is complete.**

Reminder queue (print only, NOT sent — `--send-reminder` not present):
- LongVV: 0h Jul 6 (Google Sheets only, WS unverified)
- PhucVT: 0h Jul 6 (Google Sheets only, WS unverified)
- TuanNT: 8h31m confirmed via Scrin.io — NO reminder needed
- KhanhHH: 0h Jul 6 (Google Sheets only, WS unverified)
- LeNH: 0h Jul 6 (Google Sheets only, WS unverified)

---

## Matrix — 05:00 (+07:00)

⚠️ **Token unavailable.** Both access_token and refresh_token expired (invalid_grant).

Device auth code generated: **438ZVR**
Approve at: `https://matrix.nustechnology.com/auth/link?code=438ZVR`

Matrix scan skipped. No room messages checked.

---

## Upwork — 05:00 (+07:00)

| Workroom | Status | Notes |
|----------|--------|-------|
| Rory | session_expired | Headless re-login failed (CAPTCHA/2FA) |
| Neural Contract | session_expired | — |
| Aysar | session_expired | — |

All Upwork sessions expired. Run `node scripts/upwork-login.js --login --account=carrick` interactively.

---

## Post-run Actions Required

1. **Workstream login**: `DISPLAY=:1 node scripts/workstream-login.js` → then recheck dev hours
2. **Matrix token**: Approve device code `438ZVR` at `https://matrix.nustechnology.com/auth/link?code=438ZVR` → recheck Fountain Matrix plan
3. **Upwork**: `node scripts/upwork-login.js --login --account=carrick` → recheck Neural/Aysar/Rory
4. **Fix CSP**: Add `region1.google-analytics.com` to `connect-src` for samguard.co
5. **AirAgri disk**: Coordinate with Vinn to expand/clean Traccar disk (29/30GB)
6. **Facebook**: Check vuongtrancr Facebook for unauthorized access
7. **Generator Bug #79427**: Assign to Elliott

---

*Report generated by cron — 2026-07-07T05:00+07:00*
