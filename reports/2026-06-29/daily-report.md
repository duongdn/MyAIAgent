# Daily Report — 2026-06-29 (Monday)

**Run:** 2026-06-29T05:00:55+07:00 (cron)
**Window:** 2026-06-28T05:24:00+07:00 → 2026-06-29T05:00:00+07:00
**Leave plan:** KhanhHH off Fri Jun 25–26 (family memorial), LongVV half-day Fri Jun 26 (hospital admin). All others present.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets | PhucVT: 0h on Fri Jun 26, no approved leave — reminder needed |
| 2 | Sheets | LeNH: 0h on Fri Jun 26, no approved leave — reminder needed |
| 3 | Email | Zoho IMAP auth fail: carrick/nick/rick/kai — accounts unreadable (ongoing, app password rotation needed) |
| 4 | Matrix | SSO unavailable in cron — Fountain Matrix plan not retrieved; Matrix room scan skipped |
| 5 | Fountain | Task log 0h for 6th consecutive week (W32) — team not logging to Google Sheet |
| 6 | Fountain | #2615: 890% over-estimate (actual 106.75h vs 12h est) — Deployed on Staging |
| 7 | Fountain | #2702: 319% over (actual 25.5h vs 8h est) — In-progress >50% (active/growing risk) |
| 8 | Discord | nusvinn token invalid — AirAgri/Vinn not checked (token needs refresh) |
| 9 | Upwork | Sessions expired — Rory/Aysar/Bailey Upwork weekly hours unavailable |

**Today (Mon Jun 29):** KhanhHH back from leave. LongVV back from half-day. PhucVT and LeNH missing Jun 26 task logs — reminders due.

---

## Email — all — 05:02 (+07:00)

| Account | Emails (window) | Alerts | Calendar today (Jun 29) |
|---------|----------------|--------|------------------------|
| duongdn@nustechnology.com | 0 | none | no events |
| carrick@nustechnology.com | — | — | — |
| nick@nustechnology.com | — | — | — |
| rick@nustechnology.com | — | — | — |
| kai@nustechnology.com | — | — | — |
| ken@nustechnology.com | 2 | Precognize PR notifications (expected) | DE Daily Standup, Tech Talks, Bi-weekly retro |
| vuongtrancr@gmail.com | 0 | none | — |
| dnduongus@gmail.com | 0 | none | — |
| freelancer@mypersonalfootballcoach.com | 0 | none | — |

**Notes:**
- carrick/nick/rick/kai Zoho IMAP unavailable — ongoing issue requiring app password rotation.
- ken: 2 Precognize GitHub PR review notifications (Jun 28): #SR-7479 and #DP-510 — reviewers Vladimir-precog and DanielGavrilkin active. No action needed.
- Window covers weekend (Jun 28 Sat → Jun 29 Mon 05:00) — minimal expected activity.

Trello: DuongDN ✓ complete, Ken ✓ complete. Carrick/Nick/Rick/Kai ○ incomplete (auth issue).

---

## Slack — all — 05:05 (+07:00)

| Workspace | Msgs (window) | Key content |
|-----------|--------------|-------------|
| Baamboozle | 0 | Weekend — no activity |
| RDC - FM Monitoring | 0 | Weekend — no dmetiner updates |
| Swift Studio | 0 | Weekend — no Carrick/Rory activity |
| Xtreme Soft Solutions | 0 | Weekend — no Kai report |
| SAM GUARD - Mobile | 0 | Weekend — no Elena activity |
| GLOBAL GRAZING SERVICES | 0 | Weekend — no Nick activity |
| Amazing Meds | 0 | Weekend — no activity |
| Generator | 0 | Weekend — no Elliott/Violet activity |
| LegalAtoms | 0 | Weekend — no activity |
| MyPersonalFootballCoach | 0 | Weekend — no activity |
| William Bills | 0 | Weekend — no Oliver/Lucas activity |
| Equanimity | 0 | Weekend — no Marcel/Carrick activity |
| Aigile Dev | 0 | Weekend — no Colin activity |
| SoCal Auto Wraps | SKIP | Dropped 2026-05-11 |

**Baamboozle MPDM C07SQ4HAUHZ (Aysar gate):** 0 messages in window — last Carrick update was Fri ~17:00+07 (covered in Fri report). Weekend expected.

Trello: Rory ✓, Franc ✓, Elliott ✓, MPFC ✓, Marcel ✓, Elena-SamGuard ✓, Raymond ✓, Bailey ✓, Rebecca ✓, Colin ✓, Andrew ✓.
Aysar ○ (MPDM quiet, expected weekend — recheck Mon afternoon), Maddy ○ (Kai report not yet posted Mon 05:00).

---

## OhCleo Slack — 05:07 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 0 | Weekend — no customer messages |
| #events-code | — | Channel not found (archived) |

Tony daily report: absent (weekend — not expected).
No alerts. Trello: Ohcleo ✓ complete.

---

## Discord — 05:07 (+07:00)

| Server | Account | Msgs | Key content |
|--------|---------|------|-------------|
| AirAgri | nusvinn | — | Token invalid (401 confirmed via 3-step verify) |
| Bizurk | nuscarrick | 0 | Weekend — no Andrew Taraba DMs |

AirAgri: nusvinn token invalid. Weekend, so no Vinn daily report expected. Token needs manual re-authentication.
Trello: Andrew ✓ complete. James Diamond ○ (AirAgri unavailable).

---

## Scrin.io — 05:08 (+07:00)

**Scrin.io (TuanNT / John Yi — 2026-06-28):** 0h — no sessions recorded.

Expected: Saturday is non-workday. No alert.

---

## Sheets — all — 05:10 (+07:00)

**PREV_DATE: Friday, June 26, 2026** (last workday; weekend cron scans most recent workday)

| Developer | Sheets Jun 26 | Workstream | Combined | Target | Leave | Status |
|-----------|--------------|-----------|---------|--------|-------|--------|
| LongVV | 16h (Maddy W12 weekly) | unavailable | ≥16h/week ✓ | 16h/week | half-day (hospital, father surgery) | ✅ OK |
| PhucVT | 0h (all sheets) | unavailable | 0h | 8h/day | none found | ⚠️ ALERT |
| TuanNT | 8h (Paturevision) | unavailable | 8h | 8h/day | none | ✅ OK |
| VietPH | 8h (Paturevision) | unavailable | 8h | 8h/day | none | ✅ OK |
| KhanhHH | 0h (all sheets) | unavailable | 0h | 8h/day | full day (family memorial Jun 25–26) | ✅ OK |
| LeNH | 0h (all sheets) | unavailable | 0h | 8h/day | none found | ⚠️ ALERT |

**Workstream:** token expired, SSO login failed in cron — sheets-only results. KhanhHH and LeNH may have Workstream hours not reflected above; recommend re-checking after Workstream token refreshed.

**TuanNT breakdown:** Paturevision: 8h. Combined ≥0h → gates John Yi + Rebecca + Bailey items. ✓

**⚠️ PhucVT:** 0h on Jun 26, no approved leave on record. Alert raised (same as Fri Jun 27 report — reminder not sent due to Matrix unavailable then; needs reminder today).

**⚠️ LeNH:** 0h on Jun 26, no approved leave on record. Alert raised (same as Fri Jun 27 report — same situation).

---

## Sheets — Maddy JIRA — W12 — 05:11 (+07:00)

| Ticket | Summary | Status | Est | Actual (JIRA) | Task Log | Check |
|--------|---------|--------|-----|---------------|----------|-------|
| LIFM2-445 | Update Price Action button - Listed Cons | Ready to deploy | 2h | 1h | 1h | ✅ |
| LIFM2-428 | [Shopify] Product Authenticity Certificate | Review | 44h | 39h 15m | 7h | ✅ |
| LIFM2-446 | Implement Row-Locking in Quoting Tool | Review | 12h | 8h | 8h | ✅ |

All 3 tickets OK ✅ — no over-estimate, no missing JIRA logs.

---

## Fountain — 05:12 (+07:00)

### Part 1 — Matrix Plan

Matrix token unavailable (SSO requires browser login — cron cannot complete headless SSO). Last retrieved plan used for context only (see previous report). **On Monday, plan for W33 would be posted ~08:30-09:30+07 by trinhmtt — recheck after 09:30.**

### Part 2 — Task Log Actuals (W32)

| Dev | Weekly (W32) | Status |
|-----|-------------|--------|
| ViTHT | 0h | ⚠️ 6th week of no logging |
| ThinhT | 0h | ⚠️ 6th week of no logging |
| VuTQ | 0h | ⚠️ 6th week of no logging |
| PhatDLT | 0h | 6th week (QC) |
| HungPN | 0h | 6th week (QC) |

Fountain team stopped logging to Google Sheet starting W29 (Jun 1). This is a persistent process issue, not a single-day miss.

### Part 3 — Plan vs Actual

N/A — Matrix plan not retrieved. No comparison possible.

### Part 4 — Capacity & Runway

**From Est vs Charged tab:**
- NS+IP remaining: **529h** across 37 tasks (broad bucket — includes Dev Done, On Hold, Pending, Not Started with actual hours)
- Key active tasks with remaining estimate:
  - #2735: 130h est, 136h actual — In-progress >50% → **6h OVER estimate**
  - #2872: 32h est, 46.25h actual — In-progress >50% → **14.25h over**
  - #2702: 8h est, 25.5h actual — In-progress >50% → **17.5h over**
  - #2640: 12h est, 16.75h actual — In-progress <50% → **4.75h over**
  - #2695: 20h est, 26h actual — In-progress <50% → **6h over**

**Runway:** Matrix plan unavailable → cannot compute dev capacity. Using last known ~48h/week → 529h ÷ 48h/wk ≈ **11 weeks runway** (estimate only, pending plan retrieval).

### Part 5 — Over-Estimate Tracking

Tasks >20% over (actuals still growing — in-progress status):
| Task | Est+CR | Actual | % | Status | Risk |
|------|-------|--------|---|--------|------|
| #2702 | 8h | 25.5h | **319%** | In-progress >50% | 🔴 GROWING |
| #2872 | 32h | 46.25h | **145%** | In-progress >50% | 🔴 GROWING |
| #2640 | 12h | 16.75h | **140%** | In-progress <50% | 🔴 GROWING |
| #2695 | 20h | 26h | **130%** | In-progress <50% | 🔴 GROWING |
| #2735 | 130h | 136h | **105%** | In-progress >50% | ⚠️ at threshold |

Key tasks (always tracked):
- #2615: 106.75h actual vs 12h est → **890%** — Deployed on Staging (no longer growing if deployed)
- #2595: 168.25h actual vs 120h est → **140%** — Deployed on Staging
- #2735: 136h actual vs 130h est → **105%** — In-progress >50% (within threshold w/ CR)

### Fountain Trello Board

Recent customer comments (Jun 22–26):
- Jun 26: @lisa15115201 — customer reported address input issue (new ticket potential)
- Jun 24: @tmmckay — "ready to pick up" (×3 cards) — await dev action
- Jun 24: @kunalsheth — photo below fold blurry + colors design discussion

**Trello Fountain item: ○ incomplete** — Matrix plan not retrieved (token expired); task log 0h (ongoing 6-week issue). Recheck after Matrix SSO restored and Monday plan posted.

---

## Elena — 05:13 (+07:00)

**Pending actions:** None — all merged PRs have `deployed: true`.

**Open PRs (duongdn account):** 0 open PRs.

**Precognize (nusken account):** nusken GitHub account not authenticated in current session — cannot check. Last checked Jun 23: 1 PR open (#5014, nusken, unrelated to Elena).

**WordPress samguard.co:** ✅ Clean — no real JS errors. CSP violations are Google/LinkedIn ad network false positives only.

Trello: Elena-SamGuard ✓ complete, Elena-WordPress ✓ complete.

---

## Trello — Check Progress — 05:14 (+07:00)

| Item | Checklist | Result | Source |
|------|-----------|--------|--------|
| Maddy - Carrick/Kai/Luis | Normal | ○ pending | Kai Mon report not yet posted (05:00) |
| John Yi - Amazing Meds | Normal | ✓ complete | TuanNT 8h ✓, Amazing Meds Slack 0 (weekend) |
| James Diamond - Vinn task | Should do | ○ pending | nusvinn token invalid |
| Rory | Closely monitor | ✓ complete | Swift Slack 0 (weekend OK) |
| Aysar | Closely monitor | ○ pending | MPDM 0 (weekend OK, await Mon afternoon post) |
| Franc | Closely monitor | ✓ complete | RDC Slack 0 (weekend OK, ad hoc) |
| Elliott | Closely monitor | ✓ complete | Generator Slack 0 (weekend), KhanhHH on leave |
| MPFC | Work | ✓ complete | MPFC Slack 0 (weekend OK) |
| Marcel | Work | ✓ complete | Equanimity Slack 0 (weekend OK) |
| Elena - SamGuard | Work | ✓ complete | 0 PRs, SAM GUARD Slack 0 |
| Raymond - LegalAtoms | Work | ✓ complete | LegalAtoms Slack 0 (weekend OK) |
| Neural Contract | Work | ✓ complete | Upwork messages-only, silence = never alert |
| Bailey | Work | ✓ complete | GGS Slack 0, TuanNT 8h ✓, VietPH 8h ✓ |
| Andrew Taraba | Work | ✓ complete | Bizurk 0 DMs (weekend OK) |
| Rebecca (William Bills) | Work | ✓ complete | WB Slack 0, TuanNT 8h ✓ |
| Colin | Work | ✓ complete | Aigile Slack 0 (weekend OK) |
| Fountain | Work | ○ pending | Matrix plan unavailable, 0h task log (6 weeks) |
| Philip | Work | ○ pending | MS Teams unavailable (Puppeteer SSO timeout) |
| Ohcleo | Work | ✓ complete | 0 msgs (weekend OK) |
| Elena - WordPress | Pending | ✓ complete | samguard.co clean ✓ |

**15 of 19 items completed.** Remaining: Maddy (await Mon Kai report), James/Vinn (nusvinn token), Aysar (await Mon afternoon), Fountain (Matrix token), Philip (MS Teams SSO).

---

## Trello — Check Mail — 05:15 (+07:00)

| Account | Result | Notes |
|---------|--------|-------|
| DuongDn | ✓ complete | 0 alerts in window |
| Ken | ✓ complete | Precognize GitHub PR notifications (expected) |
| Carrick | ○ pending | Zoho auth issue |
| Nick | ○ pending | Zoho auth issue |
| Rick | ○ pending | Zoho auth issue |
| Kai | ○ pending | Zoho auth issue |

2 of 6 items completed.

---

## Reminders — 05:15 (+07:00)

*(cron mode — print only, not sent. Run `/daily-report reminders --send-reminder` to send.)*

- **PhucVT**: 0h on Fri Jun 26, no leave → reminder NEEDED. Room: `!kzyLVmJxcRESoTkfnY:nustechnology.com`
- **LeNH**: 0h on Fri Jun 26, no leave → reminder NEEDED. Room: `!OIrgPraJWrcDTnRVLQ:nustechnology.com`
- LongVV: half-day leave approved ✓, meets 16h/week target — no reminder needed
- KhanhHH: full-day leave approved Jun 25–26 ✓ — no reminder needed
- TuanNT: 8h ✓ — no reminder
- VietPH: 8h ✓ — no reminder

---

## Upwork — 05:15 (+07:00)

Sessions expired — headless Puppeteer re-login failed (CAPTCHA/2FA required). Manual browser login needed for `carrick`, `vinn`, `david2` accounts.

| Workroom | Developer | Weekly hours |
|----------|-----------|-------------|
| Rory (41069448) | LeNH | unavailable |
| Aysar (35642393) | LeNH / KhanhHH | unavailable |
| Bailey DEV1 (42545630) | VietPH | unavailable |
| Bailey DEV3 (43093775) | DuongDN | unavailable |
| Neural Contract (38901192) | external | unavailable (silence = no alert) |

---

## Matrix — 05:16 (+07:00)

Matrix token expired. SSO requires browser interaction — headless cron cannot complete OIDC flow. All Matrix room scans skipped.

**Action required:** Run `DISPLAY=:1 node scripts/matrix-token-refresh.js` in an active user session to restore access. This also blocks Fountain Part 1 (weekly plan) and reminder sends.

---

## Unresolved Questions

1. **Zoho IMAP auth fail (carrick/nick/rick/kai):** App passwords appear expired. Manual rotation required via Zoho Admin panel.
2. **Matrix SSO:** Persisting across multiple cron runs — likely requires user to complete browser login once to refresh the saved session.
3. **Fountain task log 0h (6 weeks):** Is the team logging elsewhere? Or have they stopped entirely? Should escalate to TrinhMTT.
4. **nusvinn Discord token:** Invalid — when was it last rotated? User action needed.
5. **Upwork sessions:** Require browser login — cannot automate without solving CAPTCHA.
6. **PhucVT 0h Jun 26:** Was this intentional (undeclared WFH, left early)? No explanation submitted.
7. **LeNH 0h Jun 26:** Same as PhucVT — needs explanation.
8. **Workstream token:** Expired — SSO failed in cron. Needs browser login to refresh.
