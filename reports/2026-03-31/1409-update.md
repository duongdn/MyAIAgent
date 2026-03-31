# Refresh Update — 2026-03-31 14:09 (+07:00)

**Window:** 2026-03-31 08:20 → 14:09 (+07:00)

---

## Alerts

| Severity | Source | Summary |
|----------|--------|---------|
| CRITICAL | Slack/Equanimity | All tenant devices offline in XID Technologies — Mani: "All clients chasing me", Carrick tagged, no response yet |
| HIGH | Slack/Amazing Meds | PayPal payment broken — Nick: "It's an error and payment is not possible" (active troubleshooting since ~10:00) |
| HIGH | GitHub/Elena | PR #296 "external-dp" merged 10:28 — NOT YET DEPLOYED. Matrix tokens expired, cannot announce |
| HIGH | Google Docs | LeNH: 0h Tue 31 across all 3 projects (Rory/Franc/Aysar), no leave note |
| MEDIUM | Slack/Xtreme Soft | Payout transfer URL broken: `rms5.luxe.xtremeweb.com.au/process/import-shopify-payouts` |
| MEDIUM | Slack/SAM GUARD | DP-643 status conflict — Lena says needs fix, Michelle says already merged. Jira needs update |
| MEDIUM | Google Docs | PhucVT: 0h Tue 31 at 14:09, no leave note |
| MEDIUM | Google Docs | TuanNT: task log not written today — Scrin shows 4.32h active. Rebecca col P = "Chưa" |
| MEDIUM | Fountain | #2615 still growing: 91.75h → 97.25h (+5.5h since 08:20). Now 810% of 12h estimate |
| MEDIUM | Matrix | Fountain room tokens fully expired (both access + refresh). Need manual re-auth |
| INFO | Slack/GGS | Nick daily report posted at 08:21 (just after morning cutoff). New bug: history pop-up not showing results |
| INFO | Slack/Xtreme Soft | Kai on day off today — confirmed to anomawasala, will be back tomorrow |
| INFO | Google Docs | LeNH Mon 30 was actually 9h OK (Rory 4.67h + Franc 2h + Aysar 2.33h) — morning alert was false alarm (rate limit) |
| INFO | Slack | Amazing Meds + Equanimity tokens VALID — no refresh needed (morning "expired" was a transient issue) |

---

## Corrections to Morning Report

| Item | Morning | Reality |
|------|---------|---------|
| LeNH Mon 30 | ⚠️ 0h, no leave | ✅ 9h OK (rate limit caused miss) |
| Amazing Meds token | ❌ expired | ✅ Valid — 39 msgs retrieved |
| Equanimity token | ❌ expired | ✅ Valid — 3 msgs retrieved |
| Nick-GG daily report | ⚠️ Not posted (early AM) | ✅ Posted at 08:21 (just after cutoff) |

---

## Slack Details (New Since 08:20)

### Equanimity — 3 msgs — CRITICAL
- **#xid-technologies, mani.annadurai, ~11:00–11:02:** "All tenant device status showing offline, all tenant events not showing in event management. All clients chasing me." Carrick tagged. **No response from Carrick visible.**

### Amazing Meds — 39 msgs — HIGH
- PayPal subscription payment setup in progress (Paid Member Subscriptions plugin, non-WooCommerce flow)
- John wants care plan page revamp with new payment section
- **Nick ~14:01:** "It's an error and payment is not possible" — payment currently non-functional

### Generator — 19 msgs — INFO
- **Release tonight at ~7 PM (client time)** — 9 tickets: F,B-625 (Evacuation Report), F,B-631 (Remove Mandatory fields), F,B-751 (Vehicle Contact Types), F-597, F-616, F-708, F-724, F-755, F-769
- DB error on staging: `Unknown column 'building_id' in 'where clause'` — Rudi flagged urgent, Carrick applied cacheKey fix (MR !278 approved)
- MR !322 pushed by Carrick (~13:09) — pending Rudi review

### Xtreme Soft — 10 msgs — MEDIUM
- Kai: taking today off, back tomorrow
- anomawasala reported payout transfer URL broken + YTD not resetting to 0
- Kai attempting to fix before going offline

### Global Grazing — 6 msgs — INFO
- Nick daily report ✓ (posted 08:21)
- Amy confirmed Nick's fixes deployed to Live (Grazing Software, Quote, Accessories, reduction codes)
- Active testing in progress (maintenance mode on/off)
- Joey found new bug: history pop-up results not showing (~13:36)

### SAM GUARD — 3 msgs — MEDIUM
- Lena → Michelle (~13:26): "We need fix for DP-643 — when expected?"
- Michelle: "I understood that DP-643 is already merged"
- Lena: "Please recheck and update status in Jira"

### Baamboozle — 3 msgs — INFO
- Carrick proposed Laravel 11→13 (LTS) + PHP 8.2→8.5 upgrade (sent to Aysar)
- QA (skjamie25): words like "pet"/"pit" flagged as false-positives for word blocking (common English words)

### William Bills — 10 msgs — INFO
- Lucas back (daughter better). Oliver sent new MWMX task batch:
  - "Raffle Info" → "Entry Numbers" (legal compliance)
  - Remove Stripe logo from checkout
  - Fix checkout header text spacing
  - Auto-logout after 10 min inactivity (users missing orders on stale sessions)

### RDC FM Monitoring — 1 msg — INFO
- Carrick: Manual user management now live on fmscan.com (admin panel Users section)

### Others — No new activity
- Swift Studio, LegalAtoms (no Nick mentions), MPFC, SoCal Auto Wraps, Aigile Dev

---

## Google Docs — Developer Hours (Tue 31/03)

| Developer | Project(s) | Tue 31 Hours | Status |
|-----------|-----------|--------------|--------|
| LongVV | Xtreme Soft | 0h | ✅ On leave (confirmed) |
| PhucVT | James Diamond | **0h** | ⚠️ No leave note at 14:09 |
| TuanNT | John Yi + Rebecca | **0h task log** (Scrin: 4.32h) | WARN — working per Scrin, task log not written. Rebecca col P = "Chưa" |
| VietPH | Paturevision | **0h** (task drafted, no hours) | WARN — may still be filling in |
| KhanhHH | Generator | **0h own rows** (team rows: 3.25h) | WARN — tasks listed, hours blank |
| LeNH | Rory + Franc + Aysar | **0h combined** | ⚠️ ALERT — no leave note |

**Note:** VietPH and KhanhHH both have task entries drafted — likely still in progress. EOD check recommended.

---

## Fountain (5-Part — Partial Update)

### Part 1: Matrix Plan
No new plan posted (Matrix tokens expired — cannot verify). Using W20 morning data:
ViTHT=30h, ThinhT=20h, VuTQ=40h, QC=22.5h (posted 2026-03-30 08:54 by @trinhmtt)

**Action needed: Manual Matrix re-auth required.**

### Part 2: Task Log Actuals — W20 Updated

| Dev | W20 Actual (14:09) | vs 08:20 Morning | Plan |
|-----|-------------------|------------------|------|
| VuTQ | **8.0h** | +8h (was 0h) | 40h |
| ThinhT | 4.0h | stable | 20h |
| ViTHT | **8.0h** | +8h (was 0h) | 30h |
| PhatDLT | 3.0h | +3h (was 0h) | ~7.5h |
| HungPN | 0.0h | stable | ~7.5h |

### Part 3: Plan vs Actual (W20 — Day 2 of 5)

| Dev | Plan | Actual | % | Status |
|-----|------|--------|---|--------|
| VuTQ | 40h | 8.0h | 20% | On track |
| ThinhT | 20h | 4.0h | 20% | On track |
| ViTHT | 30h | 8.0h | 27% | On track |
| PhatDLT | ~7.5h | 3.0h | 40% | On track |
| HungPN | ~7.5h | 0.0h | 0% | Behind (may not logged yet) |

### Part 4: Capacity & Runway
- Remaining est: **289h** (was 256.8h — new tasks added: #2742=12h, #2775=60h, #2783=1h)
- Runway: **3.2 weeks** (was 2.9 weeks)

### Part 5: Over-Estimate Tracking

| Task | Est | Actual (14:09) | vs 08:20 | Flag |
|------|-----|----------------|----------|------|
| **#2615** | 12h | **97.25h** | +5.5h | **STILL GROWING** |
| #2735 | 60h | 71.75h | stable | Stable |
| #2595 | 120h | 168.25h | stable | Stable |
| #2702 | 8h | 12.0h | new | In-progress, +4h over |
| #2742 | 12h | 19.25h | new | Status shows "Not Started" but has actuals — anomaly |

### Trello Board — New Since 08:20
**3 new customer comments from @kunalsheth:**
- ~10:36 on #2789 (accidentally uploaded product catalog): "Change gifts to gift boxes and product catalogs to Product Catalog Items"
- ~11:59 on #2793 (build-a-box behavior): "is there a better solution for this?"
- ~12:32 on #2793: "thinking long term where it can get annoying to keep skipping 600-700"

Active card counts updated: Todo=35, Bugs=4, Doing=6, QC Internal=5, QA Backlog=1, In QA=3 (slight changes from morning)

Stuck: #2380 (QC, 59d), #2695 (Doing, 49d), #2666 (QC, 17d), #2742 (QC, 13d) — same as morning, no resolution

---

## GitHub / Elena

**PR #296 "External dp"** — merged 10:28 ICT by duongdn (branch: external-dp)
- Bug fix: crash when persisting changes without valid column reference + resource cleanup
- **Status: NOT deployed** (no SSH deploy performed after merge)
- **Matrix announcement: PENDING** (tokens expired)
- Tracked in `.elena-pending-actions.json` as pending

**No open Elena PRs** remaining.

**Precognize PR #4807** — "Add hierarchy tag-of-tag support and fix asset fetching for all children" — windsurf-bot comment at 11:09. Not by nusken, no action needed.

---

## Trello — Updated Checklist Status

Changes vs morning:

| Item | Was | Now | Reason |
|------|-----|-----|--------|
| **John Yi - Amazing Meds** | ❌ Skipped | ❌ Keep incomplete | HIGH alert: PayPal broken |
| **Marcel (Equanimity)** | ❌ Skipped | ❌ Keep incomplete | CRITICAL: all tenant devices offline |
| **Fountain** | ❌ Skipped | ❌ Keep incomplete | #2615 growing, ThinhT shortfall, Matrix expired |

All other items remain as completed from morning report.

---

## Action Items

1. **[CRITICAL] Equanimity** — Carrick needs to check XID Technologies server immediately. All tenant devices showing offline, clients affected. Carrick tagged but no response visible.
2. **[HIGH] Elena PR #296** — Deploy to MayBanServer + announce to Matrix (once tokens refreshed).
3. **[HIGH] Matrix tokens** — Both access + refresh expired. Needs manual re-auth (browser login).
4. **[HIGH] Amazing Meds PayPal** — Nick actively troubleshooting. Monitor for resolution.
5. **[MEDIUM] LeNH** — 0h today at 14:09 with no leave note. Send reminder or check status.
6. **[MEDIUM] PhucVT** — 0h at 14:09, no leave note. Send reminder.
7. **[MEDIUM] TuanNT** — Remind to write task log + confirm Rebecca col P before EOD (Scrin shows 4.32h active so they are working).
8. **[MEDIUM] Generator MR !322** — Pending Rudi review before tonight's 7 PM release.
9. **[INFO] GGS** — Joey found new history pop-up bug. Nick to investigate tomorrow (or today if time).

---

## Email ken — 15:41 (+07:00)

**Window:** 2026-03-31 14:09 → 15:41 (+07:00)
**Folder:** NewsLetter | **Filter:** Precognize / development

| Time | Subject | From |
|------|---------|------|
| 14:51 | [Precognize/development] agentResponse -> agentMessage fix, new version 24 (PR #4808) | Vladimir-precog |
| 14:51 | Re: [Precognize/development] agentResponse -> agentMessage fix, new version 24 (PR #4808) | windsurf-bot[bot] |
| 14:51 | Re: [Precognize/development] agentResponse -> agentMessage fix, new version 24 (PR #4808) | Vladimir-precog |

3 emails — all activity on PR #4808 (already seen in prior check at 15:16). No new alerts.

Trello: Ken item ✓ already complete.

---

## Elena Deploy — 15:43 (+07:00)

**PR #296** — branch `external-dp`

| Step | Result |
|------|--------|
| git pull origin process-digital-plant | ✅ 4 files updated |
| ng build --configuration development | ✅ Success (16s) |
| Redmine update | N/A (no Redmine ticket — DP branch) |
| Matrix announce → Elena - Digital Plant | ✅ Sent |

`config/.elena-pending-actions.json` updated — PR #296 marked deployed.

---

## Email ken — 17:21 (+07:00)

**Window:** 2026-03-31 15:41 → 17:21 (+07:00)
**Folder:** NewsLetter | **Filter:** Precognize / development

| Time | PR | Subject | From |
|------|----|---------|------|
| 16:33 | #4809 | SR-6940, added to create and update password additional validation (new PR) | mahkris |
| 16:33–16:48 | #4809 | Re: SR-6940 (code review, 9 replies) | KfirBernstein / mahkris |
| 16:49 | #4803 | Re: DP-447 incorrect area export file & SR-7190 fix failed tests | majdhajjo08 |
| 16:55 | #4807 | Re: Add hierarchy tag-of-tag support and fix asset fetching | DanielGavrilkin |
| 17:12 | #4810 | new version 25 (new PR) | Vladimir-precog |
| 17:12 | #4810 | Re: new version 25 (windsurf-bot review) | windsurf-bot[bot] |
| 17:12 | #4810 | Re: new version 25 | Vladimir-precog |

**Summary:** 2 new PRs opened (#4809 SR-6940 password validation, #4810 new version 25). Active review on #4809 between mahkris and KfirBernstein. No action needed from nusken on email — run `/daily-report-refresh elena precognize` to check nusken's open PRs.

Trello: Ken item ✓ already complete.

---

## Email duongdn + ken — 17:25 (+07:00)

### duongdn@ — window 15:41 → 17:25

| Time | Subject | From |
|------|---------|------|
| 16:32 | [NUS - Part time job] Thông tin job part time Mar 23 – Mar 29, 2026 | NUS Finance Team |

1 email — internal part-time payroll info. No alert.

Trello: DuongDn item ✓ already complete.

### ken@ — window 17:21 → 17:25

0 new emails matching Precognize/development. No alert.

Trello: Ken item ✓ already complete.
