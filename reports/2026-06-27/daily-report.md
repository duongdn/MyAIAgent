# Daily Report — 2026-06-27 (Sat) — Cron 00:00 +07

**Monitoring window:** 2026-06-26T09:04+07 → 2026-06-27T00:00+07
**Date context:** Friday Jun 26 activities → Saturday morning review

---

## Email — 00:00 +07

| Account | Emails in window | Calendar (Sat Jun 27) | Alerts |
|---------|-----------------|----------------------|--------|
| duongdn@nustechnology.com | 0 | no events | — |
| carrick@nustechnology.com | 0 | no events (on leave) | — |
| nick@nustechnology.com | 0 | Weekly Meeting with Devs 21:30 UTC | — |
| rick@nustechnology.com | 0 | no_principal | — |
| kai@nustechnology.com | 0 | no events | — |
| ken@nustechnology.com | 20 GitHub PR notifications (Precognize repos — routine) | DE standup 08:30, retro 09:00, Tech Talks 09:00 UTC | routine only |
| vuongtrancr@gmail.com | 0 | — | — |
| dnduongus@gmail.com | 0 | — | — |
| freelancer@mpfc | 0 | — | — |

No actionable email alerts. ken@ GitHub notifications are routine Precognize PR activity.
Trello: Check mail card not found on board.

---

## Slack — 00:00 +07

| Workspace | Msgs in window | Key content | Trello |
|-----------|---------------|-------------|--------|
| Baamboozle | 2 | Ronan client reply 22:04+07; Carrick spam DM 16:49 | Aysar ○ |
| RDC - FM Monitoring | 19 | All automated "Tuner Access Log" — no dmetiner update | Franc ○ |
| Swift Studio | 0 | Silent | Rory ○ (Carrick on leave) |
| Xtreme Soft Solutions | 1 | ✅ Kai daily report 09:40+07: LIFM2-446 Row-Locking in Quoting Tool → Done | Maddy ✅ |
| SAM GUARD - Mobile | 0 | Silent in window; Elena active Jun 25 before cutoff | Elena ○ |
| GGS | 4 | Nick daily 08:54+07 (⚠️ WARNING: memory spikes 14+ days, Redis failures); Joey client bug Jun 25 under investigation by Amy; spam DM 16:47 | Bailey ○ |
| Amazing Meds | 1 | Nick spam DM 16:56 — no real activity | John Yi ✅ |
| Generator | 2 | ✅ Violet: fixed Android+iOS gesture bug on branch 16:55+07 | Elliott ✅ |
| LegalAtoms | 0 | Silent | Raymond ○ |
| MPFC | 0 | Silent | MPFC ○ |
| William Bills | 2 | Oliver greeting "happy Friday" 17:00; Lucas spam DM 16:56 | Rebecca ✅ |
| Equanimity | 3 | Komal asked for Carrick 11:50; Carrick: "leave until next Monday" 14:56; Carrick spam DM 16:42 | Marcel ○ |
| Aigile Dev | 3 | ✅ Colin + Hendrix: deployment coordination (downtime discussion) 09:31–14:25+07 | Colin ✅ |

**Spam DM pattern** (16:47–16:56+07): Same "Hi I hope you are doing well... reach out" message in GGS, Amazing Meds, William Bills, Equanimity, Baamboozle. All from workspace members (nick, lucas, carrick) — suspicious automated-looking spam DMs. Not a security alert but worth noting.

**Carrick on leave until Monday Jun 29** (confirmed in Equanimity at 14:56+07).

**Baamboozle-MPDM-Aysar (C07SQ4HAUHZ):** 0 msgs — Carrick on leave → no "Today's update" expected. Aysar gate cannot be confirmed.

---

## OhCleo Slack — 00:00 +07

| Channel | Msgs | Content |
|---------|------|---------|
| DM: Celine Fierro | ~12 in window | Tony daily report ✅; App Store review ⚠️; Transcription bug ⚠️ |

**Tony daily report (10:22+07):** ✅
- [FE] Change copy both web and app
- [FE] Change copy for popup
- [FE] Align web app stages
- [FE] Verify Sitemap Coverage
- [BE] Fix track ranking, replace likes-only sorting with relevance score

**⚠️ App Store review:** App resubmitted. Celine: "I noticed that we are in review again so never mind my question!" (13:56+07). Positive — app is in App Store review.

**⚠️ Transcription bug (production):** Customer (Macxxknows) emailed support: 19-min audio file stuck in transcription >45 min (normal: 3–4 min). Re-upload same issue. Tony/dev needs to investigate backend transcription hang. Flagged to Celine at 13:57+07.

Trello: OhCleo ○ (transcription bug — not clear if resolved)

---

## Discord — 00:00 +07

| Account | Server | Status |
|---------|--------|--------|
| nusvinn | AirAgri | ⛔ TOKEN EXPIRED (401) — Chrome Profile 19 Discord session expired. Need manual re-login. |
| nuscarrick | Bizurk | ✅ Token valid | 0 msgs in window, 0 Andrew DMs |

**⚠️ nusvinn token expired** — Cannot check Vinn/Jeff AirAgri activity. Note: Chrome headless (`scripts/discord-token-refresh.js nusvinn`) confirmed Discord showing login page — session expired, manual login required.

Trello:
- James Diamond - Vinn ○ (nusvinn expired)
- Andrew Taraba ○ (0 DMs from Andrew in Bizurk)

---

## Scrin.io — 00:00 +07

Nick at John Yi (employeeId 453601) — Friday Jun 26:
- **4h46m** (09:48–14:34, 92% activity)
- Apps: Chrome, Windsurf, gnome-terminal, Slack, Element

Note: Scrin tracks Nick's activity at John Yi company — NOT TuanNT. TuanNT hours checked separately via Google Sheets.

---

## Google Sheets (Task Log) — 00:00 +07

Scan: `scripts/sheets-tasklog-scan.js 2026-06-26 ...` (13 sheets scanned, Workstream unavailable — token expired)

| Developer | Sheets | Workstream | Total | Target | Leave | Status |
|-----------|--------|-----------|-------|--------|-------|--------|
| VietPH | 8h (Paturevision) | unavailable | ≥8h | 8h/day | none | ✅ |
| TuanNT | 8h (Paturevision) | unavailable | ≥8h | 8h/day | none | ✅ |
| PhucVT | 0h | unavailable | 0h | 8h/day | none | ⚠️ ALERT |
| LeNH | 0h | unavailable | 0h | 8h/day | none | ⚠️ ALERT |
| LongVV | 0h | unavailable | 0h | 16h/week | ✅ Half-day (hospital admin, father's surgery) | OK |
| KhanhHH | 0h | unavailable | 0h | 8h/day | ✅ Full day (family memorial Jun 25–26) | OK |

**⚠️ PhucVT: 0h — no approved leave found.** Workstream unavailable so cannot rule out hours logged there. Alert raised.
**⚠️ LeNH: 0h — no approved leave found.** Same caveat re: Workstream.

Note: Workstream login requires browser SSO (Keycloak). Token expired + refresh via `workstream-login.js` failed (DISPLAY:1 browser session also expired). Run `DISPLAY=:1 node scripts/workstream-login.js` when browser session is active.

---

## Fountain — 00:00 +07

**Part 1 — Matrix plan:** ⛔ BLOCKED. Matrix token expired (both access_token + refresh_token = invalid_grant). Cannot fetch weekly plan from room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`.

**Part 2 — Task log actuals (W32, Jun 22–28):**
⚠️ **ALL DEVS SHOW 0h in W32 (and W29–W31).** Fountain team has not logged hours in the Google Sheet task log since late May (last logged week: W28, May 25–31 = 164h). Current sheet shows template rows only ("Task dự án" placeholders, no actual tasks filled).

| Week | Period | Actual hours |
|------|--------|-------------|
| W28 | May 25–31 | 164.00h |
| W29 | Jun 1–7 | 0.00h |
| W30 | Jun 8–14 | 0.00h |
| W31 | Jun 15–21 | 0.00h |
| W32 | Jun 22–28 | 0.00h |

**⚠️ CONCERN: 4 consecutive weeks of 0h in task log.** Fountain team may have shifted to a different tracking system, or task log discipline has dropped off. Action needed.

**Part 3 — Plan vs Actual:** Cannot compute (no task log data for W29+).

**Part 4 — Capacity & Runway (Est vs Charged):**
- Total Estimated: 1,465.25h + 123.50h CR
- Total Actual: 1,557.25h  
- Total Charged: 464.25h (charged/billed)
- In-progress: 2633-fountain-pro-template-zip-code-update (4h actual / 8h est)
- Pending/Not Started: 2587_giftdrop (40h est), 2524-duplicate-charge (24h est), 2590-fountain-pro-backend-updates (8h est), 2554-platform-switcher-fix (6h est)
- On Hold: 2240-fountain-infinity-update-search (8h est, needs AI-skilled dev)

**Part 5 — Over-estimate tracking:**
| Task | Est | Actual | Δ |
|------|-----|--------|---|
| 2595_giftdrop_new_redemption_flow | 120h | 168.25h | +48.25h (+40%) |
| 2380_check_checkout_date_display | 20h | 25.25h | +5.25h (+26%) |
| 2546-fountain-corporate-order-form | 4h | 7h | +3h (+75%) |

**Fountain Workstream:** Token expired — cannot check.

Trello: Fountain ○ (Matrix plan blocked, no task log data)

---

## Elena — 00:00 +07

Config: `config/.elena-pending-actions.json`
- Last run: 2026-06-23
- 0 open PRs, all merged PRs deployed (deployed: true)
- No pending actions

SAM GUARD Slack: Elena ("lena") active Jun 25 12:53 (before window): "hi @Michelle I still see bugs on your name even if they in status to verify and also t..." — bug review in progress.

Elena - WordPress SamGuard: Not checked (browser-based check not done in cron).

Trello:
- Elena - SamGuard ○ (no Slack activity in window)
- Elena - WordPress ○ (not checked)

---

## Upwork — 00:00 +07

**⛔ ALL SESSIONS EXPIRED:**
- carrick: login failed (CAPTCHA/2FA needed)
- vinn: no saved session
- david2: no saved session

Cannot check Rory, Neural Contract, Aysar workrooms.

Trello: Neural Contract ○ (Upwork unavailable)

---

## Matrix — 00:00 +07

**⛔ TOKEN EXPIRED:** Both access_token and refresh_token invalid (invalid_grant). Browser SSO session also expired. Cannot scan rooms or send reminders.

Room scan: BLOCKED
Matrix token refresh: Requires manual SSO login via browser.

---

## Google Sheets Summary (Reminders) — 00:00 +07

Based on task log scan:
- ⚠️ **PhucVT** — 0h on Jun 26, no leave approved. Reminder NEEDED (cannot send via Matrix — token expired).
- ⚠️ **LeNH** — 0h on Jun 26, no leave approved. Reminder NEEDED (cannot send via Matrix — token expired).
- LongVV — half-day leave approved ✓, no reminder needed.
- KhanhHH — full leave approved ✓, no reminder needed.
- VietPH — 8h ✓, no reminder needed.
- TuanNT — 8h ✓, no reminder needed.

Note: Matrix token expired → reminders CANNOT be sent. Reminder status is for record only.

---

## Trello — Check Progress — 00:00 +07

### ✅ Completed (5 items)
- ✅ Maddy - Carrick/Kai/Luis (Kai daily report confirmed ✓)
- ✅ John Yi - Amazing Meds (TuanNT 8h ✓, no AM client complaints)
- ✅ Elliott - GreenFort Capital (Violet bug fix confirmed ✓)
- ✅ Rebecca - William Bills (TuanNT 8h ✓, WB no complaints)
- ✅ Colin (Aigile Dev deployment coordination active ✓)

### ○ Incomplete — Blocked / Alert

| Item | Reason |
|------|--------|
| James Diamond - Vinn | nusvinn Discord token expired — cannot check AirAgri |
| Rory | Carrick on leave until Mon Jun 29; Swift Studio silent |
| Aysar | KhanhHH full leave + Carrick on leave → both MPDM gates waived, cannot confirm |
| Franc | No dmetiner update in RDC Slack (only automated access logs) |
| Bailey | GGS ⚠️ WARNING: nightly memory spikes 14+ days, Redis failures; client Joey bug Jun 25 under investigation |
| MPFC | No Slack activity in window |
| Marcel | Carrick on leave, no Marcel update in Equanimity |
| Elena - SamGuard | No SAM GUARD Slack activity in monitoring window |
| Raymond - LegalAtoms | No LegalAtoms activity in window |
| Neural Contract | Upwork sessions expired |
| Andrew Taraba | 0 DMs from Andrew in Bizurk Discord |
| Fountain | Matrix token expired (Part 1 blocked); 4 weeks no task log hours |
| Philip | MS Teams login blocked (Microsoft identity challenge/MFA) |
| OhCleo | Transcription stuck bug reported by customer (production issue) |
| Elena - WordPress SamGuard | Not checked (browser required) |

---

## Auth Issues Requiring Manual Action

| Service | Issue | Action needed |
|---------|-------|--------------|
| Matrix | access_token + refresh_token both expired (invalid_grant) | Manual SSO login: `DISPLAY=:1 node scripts/matrix-token-refresh.js` |
| Workstream | access_token expired, no refresh | Manual SSO login: `DISPLAY=:1 node scripts/workstream-login.js` |
| Discord nusvinn | Chrome Profile 19 session expired (Discord login page) | Open Chrome Profile 19, log in to Discord manually |
| Upwork carrick/vinn/david2 | All sessions expired | Manual login (CAPTCHA/2FA required) |
| MS Teams (will@) | Microsoft identity challenge blocking headless login | Manual verification of Microsoft account |
| PhucVT / LeNH | 0h Jun 26 (Workstream unavailable — cannot confirm) | Check Workstream after re-auth |

---

## Philip (MS Teams) — 00:00 +07

Login attempt failed: Microsoft "Help us protect your account" identity challenge (25+ loops). Teams did not load. **Philip check: UNAVAILABLE** — cannot check DMs from Philip Briggs.

---

*Report generated: 2026-06-27T00:00+07 (automated cron)*
