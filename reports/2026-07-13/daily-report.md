# Daily Report — 2026-07-13 (Monday)

**Run:** 2026-07-13T09:33:00+07:00 (interactive, full run)
**Window:** 2026-07-10T10:27:00+07:00 → 2026-07-13T09:33:00+07:00
**Leave plan:** KhanhHH — leave requests for 07-09 and 07-10 (dental surgery) — ~~status still pending~~ **approved by DuongDN 09:43 07-13** — see Alert #2 (resolved).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email (rick@) | Fountain/FirstProject production errors recurring: 502 Bad Gateway (10th occurrence), Minified React error (100th+ occurrence). Real, ongoing. |
| 2 | Sheets (KhanhHH) | 0h logged Thu 07-09 + Fri 07-10 (~16h weekly shortfall). ~~Leave requests exist but status is pending, not approved — needs leave approval.~~ **RESOLVED 09:43 07-13: DuongDN approved both leave requests. 0h fully explained, no further action.** |
| 3 | Slack (Maddy/Xtreme) | 3 unaddressed Critical/High Bitbucket PR findings, 18–37 days old (#509, #510, #481) + PR #485 stale/orphaned (76d, no ticket) + new client billing-dispute approval-gate: tickets 446–454 must NOT start without prior approval. |
| 4 | Performance (MPFC) | Apdex 0.50 (poor, &lt;0.7 threshold). `wp-admin/admin-ajax.php?action=heartbeat` averaging 30.2s over 522 calls. 2 new PHP fatal error classes (`JSON_API_User_controller::error()` undefined ×10, `MM_Event` class not found ×5). |
| 5 | Fountain (Trello) | 3 new unanswered customer comments from kunalsheth since 07-10, 2 are direct "push live" requests. |
| 6 | Matrix | Token unavailable all run — refresh failed after 7 attempts. Root cause found (capture-validation bug in `matrix-login.js` grabbed literal `"true"` instead of a real token) and fixed in code, but no valid token obtained yet. Needs one fresh login attempt. Fountain Part 1 (weekly plan) used last-known data as fallback. |
| 7 | Elena (WordPress CSP) | 2 new CSP violations on samguard.co: `analytics.google.com`, `stats.g.doubleclick.net` blocked by `connect-src`. Known pre-existing blocker (no www-data/sudo/wp-admin access) — not re-attempted, unchanged root cause. |
| 8 | Email (davidztv19 / Arthur) | Chris C. (Meta-Stamp) paused the Upwork contract + sent an unread message (Jul 11); Stripe account update needed to receive payout. |
| 9 | Email (vuongtrancr) | Swish "Low Application Throughput — signal lost 10 min" recurring ~10× (New Relic), known ongoing watch pattern. |
| 10 | Email (dnduongus) | 2 personal security alerts (Google, LastPass blocked login attempt) — flagged per account's security-only filter, unconfirmed if user-initiated. |

**Today (Mon Jul 13):** No other staff leave/WFH on record besides KhanhHH's approved dental-surgery leave (07-09, 07-10, already past). VietPH resigned 2026-06-30, no longer monitored.

**Not rechecked this run:** Philip (MS Teams) — script hit a browser-session conflict with concurrent automation, carrying prior Trello status. Neural Contract — Upwork piece not run this cycle, carrying prior status.

---

## Email — all — 09:00 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 4 | — | no events |
| carrick@nustechnology.com | 5 | GitLab pipeline failure (generator-api) — dev-topic noise, not actioned | no events |
| nick@nustechnology.com | 21 | — | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 40 | **Fountain/FirstProject prod errors (Alert #1)** | 10:30 OmniGPT Daily Sync (Meet); 12:30 HEAL Meeting (Meet) |
| kai@nustechnology.com | 23 | — | no events |
| ken@nustechnology.com | 80 | ~55 unrelated Sentry alert emails in NewsLetter folder (noise) | 08:30/09:00 DE Standup+Tech Talks (Teams) |
| vuongtrancr@gmail.com | 16 | **Swish signal-lost recurring (Alert #9)** | — |
| dnduongus@gmail.com | 64 | **2 security alerts (Alert #10)** | — |
| davidztv19@gmail.com | 8 | **Arthur contract paused + unread msg (Alert #8)** | — |
| freelancer@mypersonalfootballcoach.com | 2 | Google Workspace security notice (system, not client) | — |

Trello: DuongDn, Carrick, Nick, Kai, Ken ✓ complete. Rick ⚠️ skipped (Alert #1).

---

## Slack — all — 09:12 (+07:00)

*(14 workspaces, OhCleo reported separately below)*

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 21 | Bot noise + positive customer testimonial; team-17 cleanup handled cleanly |
| RDC - FM Monitoring | 11 | All automated (bot alerts), zero human messages |
| Swift Studio | 0 | Quiet, confirmed real |
| Xtreme Soft Solutions | 67 | See Maddy detail below (**Alert #3**) |
| SAM GUARD - Mobile | 4 | Hubspot lead notifications only |
| Global Grazing Services | 19 | Joey reported barcode/print bug Fri AM, Amy fixed same day, Live deploy agreed "Monday morning" (today) — watch item |
| Amazing Meds | 0 | Quiet, token verified fresh |
| Generator | 0 | Quiet, confirmed real |
| LegalAtoms | 1 | "released" (Raymond, #general) — no Nick-specific content |
| MyPersonalFootballCoach | 1 | Internal dev DM re: Firebase notifications (not client-facing) |
| William Bills | 0 | Quiet |
| Equanimity | 0 | Quiet, token verified fresh |
| SoCal Auto Wraps | 0 | No Trello gate (dropped) |
| Aigile Dev | 1 | Automated Sentry check, 1 standing 3d-old unresolved issue |

**Maddy (Xtreme) detail — Alert #3:**
- Sat: Madhuraka asked PR #513/#485 status.
- Sun: new client billing-dispute process — per-task estimate + approval required before starting; **tickets 446–454 on hold**, 409/428/436 OK to proceed.
- Bitbucket (7 open PRs, all Kai): #509 (Codex Critical, 21d unaddressed), #510 (Codex Critical, 18d unaddressed), #481 (Madhuraka High, 37d unaddressed), #516 (new, 4d), #513 (clean), #486 (no new activity), #485 (stale 76d, no ticket, 0 comments).

**Aysar pre-check:** MPDM C07SQ4HAUHZ silent since 07-06 — KhanhHH's approved leave covers 07-09/07-10 (see Alert #2, resolved) — silence explained.

Trello: Rory, Aysar, Franc, Elliott, MPFC, Marcel, Raymond-LegalAtoms, Colin, John Yi, Elena-SamGuard, Bailey, Rebecca ✓ complete. Maddy ⚠️ skipped (Alert #3).

---

## Discord — all — 09:13 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (#airagri_webapp) | 50 | James/Jon/Vinn heavy UI+spec work, weekend staging push agreed |
| AirAgri (#airagri-flutter) | 24 | Jeff's daily report present (4h). Check-in/out API ask to Vinn (Jul13 08:34) — not yet answered but Vinn confirmed active elsewhere same morning |
| Bizurk | 0 | Quiet |

Trello: James Diamond - Vinn, Andrew Taraba ✓ complete.

---

## Sheets — all — 09:xx (+07:00)

*(PREV_DATE = Fri 07-10 per Monday rule)*

| Developer | Fri 07-10 | Status |
|-----------|-----------|--------|
| LongVV | 8h (Portfolio-James Diamond) | ✅ OK |
| PhucVT | 8h (Crystal lang) | ✅ OK |
| TuanNT | 8h combined (Paturevision 6h + Neural WS 2h) | ✅ OK |
| VietPH | — resigned 2026-06-30 | excluded |
| KhanhHH | **0h** all sources | Alert #2 — resolved, leave approved 09:43 07-13 |
| LeNH | 8h (Portfolio-James Diamond) | ✅ OK |

**Maddy JIRA (W14):** LIFM2-447 ✅, LIFM2-446 ✅, LIFM2-448 ⚠️ no estimate set.

**Workstream needsReview:** clean, no Pending rows on any non-Fountain project.

---

## Scrin.io — 09:13 (+07:00)

**Scrin.io (Nick / John Yi — 2026-07-12):** 0h — no sessions (script returns Sunday/weekend data on Monday runs, Friday 07-10 not retrieved this run — known script limitation).

---

## Fountain — 09:xx (+07:00)

### Part 1 — Matrix Plan
**N/A this run** (Alert #6) — using last known plan (2026-07-06): ViTHT 40h, ThinhT 20h, DatNT 40h ⇒ QC 24h. Capacity = 100h/week (fallback).

### Part 2/3 — Task log
Not tracked per standing instruction (2026-06-09) — only capacity/runway and over-estimate matter.

### Part 4 — Capacity & Runway
- NS+IP: 28 tasks, 229.00h remaining — matches Jul-8 known-good baseline (task count identical across runs), treating as flat.
- Broader bucket: 80 tasks, 549.00h remaining.
- Runway at 100h/wk fallback: NS+IP ≈ 2.29 weeks.

### Part 5 — Over-Estimate Tracking
| Task | Est+CR | Actual | Over% | vs previous |
|------|--------|--------|-------|-------------|
| #2615 | 12.0h | 106.8h | +790% | flat |
| #2595 (GiftDrop) | 120.0h | 168.2h | +40% | flat |
| #2735 | 130.0h | 136.0h | +4.6% | flat |

No growth on tracked tasks. Other over-budget tasks are small-estimate rework noise, same pattern as before.

### Trello Board
**3 new unanswered kunalsheth comments (Alert #5):** "Update Merch page" (push-live ask), "small Fixes" (push-live ask), "Item Extras" (discussion). 2 previously-flagged asks now resolved (Scheduled delivery bug, Gift of Choice). Stuck: "Add Subtle Scroll Animations" now 82 days in Doing.

Trello: Fountain ⚠️ skipped (Alert #5).

---

## Elena — 09:00 (+07:00)

**Elena-SamGuard-Digital-Plant:** 0 open PRs. No deploy/Redmine/Matrix-announce action needed.
**Precognize (nusken):** 10 open PRs total, 0 by nusken.
**WordPress samguard.co:** jsErrors 0, pageErrors 0. 2 CSP violations (Alert #7) — known blocked issue, not re-attempted.

Trello: Elena - SamGuard ✓ complete. Elena - WordPress SamGuard ⚠️ still incomplete (Alert #7, unchanged blocker).

---

## Performance — ohcleo, mpfc — 09:00 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.95 | 326ms | 2.28% (mostly benign NotAuthenticated) | 15.2/min |
| mpfc (prod) | **0.50 (poor)** | 1532ms | 0.11% | 16.8/min |

**OhCleo slowest:** MediaByKeyView.get 13.2s/731 calls (persistent, improved from ~18-20s). HomeMediasView.get down to 2.0s (was 7-18s).
**MPFC slowest (Alert #4):** heartbeat endpoint 30.2s/522 calls; sitemap generation 45-51s (low volume). New PHP fatal errors: `JSON_API_User_controller::error()` undefined ×10, `MM_Event` not found ×5.

---

## OhCleo Slack — 09:13 (+07:00)

| Channel | Msgs | Key content |
|---------|------|--------------|
| DM:Celine Fierro | 0 | Silent since Jul 9, last thread resolved |
| #events-code | — | `channel_not_found` — likely archived upstream |

Tony's daily report: absent this window, corroborated by Matrix chat context (Celine traveling, LongVV/Tony idle this week). No alerts.

Trello: Ohcleo ✓ complete.

---

## Trello — progress/mail — 09:33 (+07:00)

- Maddy, Rick (mail), Fountain, Elena-WordPress-SamGuard: ⚠️ left incomplete (see Alerts #1, #3, #5, #7)
- John Yi, Elena-SamGuard, Bailey, Rebecca: ✓ marked complete this run
- Philip, Neural Contract, Arthur, Blair Brown: not rechecked this run — carrying prior status
- All other items already complete from prior state, unchanged

---

## Reminders — 09:33 (+07:00)

- KhanhHH: 0h Thu/Fri — leave requests approved by DuongDN 09:43 07-13. No reminder needed, fully resolved.
- No other 0h-no-leave developers found this run.

*(No --send-reminder flag passed — print-only, nothing sent to Matrix.)*

---

## Unresolved questions

1. Matrix token still not refreshed — root cause (capture bug) fixed in `matrix-login.js`, but needs one more clean login attempt (local machine, visible browser, DISPLAY=:1) to actually get a working token.
3. Philip (MS Teams) and Neural Contract (Upwork) were not rechecked this run due to a browser-session resource conflict — recommend a follow-up check later today.
4. GGS barcode-fix Live deploy was promised "Monday morning" — not yet verified as shipped.
5. Elena WordPress CSP (Alert #7) keeps recurring with different GA/Ads domains each time — worth deciding whether to finally get wp-admin credentials to fix this permanently instead of re-discovering it each run.
6. MPFC heartbeat endpoint at 30s avg (522 calls) is a new pattern, may warrant dedicated investigation beyond informational Performance piece.
