# Daily Report — Mon 23 Mar 2026

**Period:** Fri 20 Mar 8:00 AM → Mon 23 Mar 8:30 AM (Saigon)
**Generated:** 2026-03-23 08:46

---

## Checklist

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Monitor Email | done | 6 accounts checked, 89+ emails total |
| 2 | Monitor Slack | done | 14 workspaces checked, 5 alerts |
| 3 | Monitor Discord | done | AirAgri, HOMIEAPP, Bizurk checked |
| 4 | Monitor Web | done | samguard.co UP, SSL valid 81 days |
| 5 | Google Docs | done | 11 spreadsheets checked (W12 period) |
| 6 | Daily Report Checks | done | Kai FAIL (off), Nick PASS, Jeff (jeff_trinh) PASS, Vinn PASS |

---

## 1. Email

### duongdn@nustechnology.com — 4 emails
- VietPH leave request **today Mar 23**
- PhatDLT leave request Mar 27 + Mar 30
- Finance tax withholding certificate

### carrick@nustechnology.com — 16 emails
- Rollbar: SoCalAutoWraps daily summaries
- Redmine: Elliott bugs #77767, #77723, #77698, #77696 (Tested on Internal Staging)
- Stripe health alerts turned on

### nick@nustechnology.com — 29 emails
- **FLAGGED** John Yi shared Google Drive folder "Method Lead Forms" (Mar 20)
- Azure DevOps PRs: CNA.Operations.App #1307, #1295
- ClickUp: Order Search Workflow, 3D Admin Role Update
- Mailgun: API key added to Global Grazing

### rick@nustechnology.com — 30 emails
- **FLAGGED** BugSnag: [FountainStaging] ActiveRecord::RecordNotFound (Mar 22)
- **FLAGGED** BugSnag: [FountainStaging] Rack::InvalidParameterError /php-cgi/php-cgi.exe (Mar 21)
- Rollbar daily summaries: FountainGifts (daily), InfinityRoses (daily), FirstProject
- No Kunal emails

### kai@nustechnology.com — 10 emails
- **FLAGGED** Madhuraka JIRA: LIFM2-429 Discount Price Changes (assigned Mar 19)
- **FLAGGED** Anoma JIRA: LIFM2-409 Import Shopify payouts (mentioned Mar 20)
- **FLAGGED** Madhuraka Bitbucket PR #467: do not create bill when update price (Mar 19)

### ken@nustechnology.com (NewsLetter) — 439 emails
- **FLAGGED** Precognize/development PRs: #4789, #4790, #4791, #4792 (all Mar 19, no new activity since)

---

## 2. Slack

### Baamboozle — 30 msgs
- #engineering: GitHub bot notifications. No human alerts.

### RDC - FM Monitoring — 14 msgs
- #user-access-logs, #rpi-reboot-logs automated. Carrick deployed multilingual support on staging.

### Swift Studio — 44 msgs
- #bxr__app: 2FA implementation discussion, client demo feedback from roryh. Gift card via MindBody API.

### Xtreme Soft Solutions — 10 msgs
- Kai posted: "I have taken two days off on yesterday and today"
- anomawasala reported Shopify upload issue → "issue sorted"
- **DAILY REPORT CHECK — Kai: FAILED** (took 2 days off, no report posted)

### SAM GUARD - Mobile — 66 msgs
- #mql-leads: HubSpot MQL bot. kfir.bernstein investigating SR-7194.

### GLOBAL GRAZING SERVICES — 29 msgs
- #maintenance active: review stars bug (desktop+mobile), Doofinder sandbox, multiple prices/quotations
- **DAILY REPORT CHECK — Nick: PASSED** (3 reports found)
- **ALERT:** Nick's Mar 20 report flagged **storage WARNING** (Prestashop)

### Amazing Meds — 105 msgs
- #web-dev-with-nick: john + gil actively working care-plan page redesign, mobile experience, questionnaire links

### Generator — 68 msgs
- **ALERT:** SMTP 451 4.4.2 Timeout errors in production mail. Carrick deployed ShouldQueue fix to demo staging + staging. Not yet in production.

### LegalAtoms — search.messages missing_scope, used fallback
- **ALERT:** Multiple Rollbar production alerts (API items 13336, 13549, 13580-82; UI items 12731, 12744, 12748, 12764, 12766)
- Production server restarts Mar 21. Alpha login broken temporarily Mar 22.

### MyPersonalFootballCoach — 6 msgs
- New membership bundle discussion. App Store submission. Low volume.

### William Bills — 52 msgs
- **ALERT:** WordPress malware on maxwellequipment.com.au — core index.php compromised. Temp fix Mar 20, **full cleanup still needed**.
- Staging: subscription page + flash-offer page work. Raffle Play Woo plugin slow (loads all tickets in memory).

### Equanimity — 6 msgs
- Carrick password expired, requested reset from marcel. Low activity.

### SoCal Auto Wraps — 0 msgs
### Aigile Dev — 0 msgs

---

## 3. Discord

### AirAgri — 9 msgs (airagri_webapp)
- pauldiamond reported: SMS interval bug (group 2 James got 3 SMS, should respect 5min interval)
- pauldiamond reported: "Stop alarm" not triggering — device on fence post 50min, no alert
- Jeff (jeff_trinh) asked about staging → production deployment workflow for SOS notifications
- jdiamond pinging vinn to respond immediately
- **DAILY REPORT CHECK — Jeff (jeff_trinh): PASSED** (daily report posted: 4h — Classify & Assign Investigation done, Corrective Actions API done, new Corrective Action in-progress, iOS TF 3.3 build 11)
- **DAILY REPORT CHECK — Vinn: PASSED** (Fri 08:45: support Leon/Jeff, alarm work. Mon 09:21: alarm logic updates, deployed to production)

### HOMIEAPP — 0 msgs (inactive)

### Bizurk — Missing Access on all channels except #welcome. Permissions issue.

---

## 4. Web Monitor

| Site | Status | SSL Expires | Response Time |
|------|--------|-------------|---------------|
| samguard.co | UP (200) | 2026-06-12 (81 days) | 3.19s |

No JS console errors (static check). Tailwind CDN in production (minor concern).

---

## 5. Google Docs — Task Logs

| # | Project | Person | Fri 20 | Status |
|---|---------|--------|--------|--------|
| 1 | Maddy (Xtreme Soft) | LongVV | 0h | OK — "Nghỉ cả ngày" (full-day off Thu+Fri) |
| 2 | James Diamond | PhucVT | 8.0h | OK |
| 3 | Fountain | ViTHT (dev) | 0h | OK — assigned company work (plan: 30h/wk) |
| 4 | Fountain | ThinhT (dev) | 4.0h | OK — matches plan (20h/wk = 4h/day) |
| 5 | Fountain | VuTQ (dev) | 8.0h | OK |
| 6 | Fountain | PhatDLT (QC) | 2.0h | QC plan: 21.5h/wk total |
| 7 | Fountain | HungPN (QC) | 3.0h | QC Fri total: 5h (plan ~4.3h/day) |
| 8 | Fountain | TrinhMTT (QC) | 0h | — |

### Fountain Plan vs Actual (W18: Mar 16-22)

Matrix plan source: @trinhmtt 2026-03-19 09:35 (updated plan)

| Person | Role | Plan | Actual | Match |
|--------|------|------|--------|-------|
| VuTQ | dev | 36h | 36.00h | OK |
| ThinhT | dev | 20h | 20.00h | OK |
| ViTHT | dev | 30h | 30.00h | OK |
| **Dev total** | | **86h** | **86.00h** | **OK** |
| QC total | QC | 21.5h | 22.00h | OK (+0.5h) |

Week-over-week (W17→W18): VuTQ 32→36h (+4), ThinhT 20→20h (=), ViTHT 26→30h (+4), PhatDLT 12.5→11h (-1.5), HungPN 12→11h (-1). Total 102.5→108h (+5.5). All within plan.

**Capacity & Runway** (vs Mar 20 report):
- Remaining est: 277.8h (was 289.5h, -11.7h)
- Runway: **3.2 weeks** at 86h/wk (was 3.4wk)
- Active tasks: 47

**Over-estimate tracking** (actual > est +20%, top offenders):

| Task | Est | Actual | Over% | Status | vs Mar 20 |
|------|-----|--------|-------|--------|-----------|
| #2595 GiftDrop Redemption | 120h | 168.25h | +40% | Deployed on Staging | **same** (not growing) |
| #2615 Gift of Choice | 12h | 79.25h | +560% | Deployed on Staging | same |
| #2624 Order Complete | 12h | 31.25h | +160% | Dev Done | same |
| #2629 | 8h | 18.25h | +128% | Dev Done | same |
| #2652 | 1.5h | 9h | +500% | In-progress (>50%) | same |
| #2742 | 12h | 19.25h | +60% | — | **GROWING** — new task on Mar 20, already +60% over est in 3 days |

#2595 at 168.25h — stable over weekend, not growing. #2742 newly over-est.

This week's plan (Mar 23-29): ViTHT 22h, ThinhT 4h, HaVS 24h, VuQT 40h, QC 22.5h
| 9 | Paturevision | VietPH | 8.0h | OK (on leave today Mar 23) |
| 10 | Elliott (Generator) | KhanhHH | 8.0h | OK |
| 11 | Marcel | DuongDN | 0h | OK — adhoc project, not daily |
| 12 | Rory | LeNH | 3.67h | — |
| 13 | Francesca (RDC) | LeNH | 4.0h | — |
| 14 | Aysar (Baamboozle) | LeNH | 0h | — |
| — | *LeNH official combined* | *LeNH* | *7.67h* | OK — week official: 40h exactly (Fri 7.67 + Mon-Thu 32.33). Thu had 4.17h part-time extra. |
| 15 | John Yi (Amazing Meds) | TuanNT | 7.0h | — |
| 16 | Rebecca (William Bills) | TuanNT | 1.0h | — |
| — | *TuanNT combined* | *TuanNT* | *8.0h* | OK |

### Upwork Comparison (Last week Mar 16-22)

| Project | Developer | Upwork | Task Log (all) | Match |
|---------|-----------|--------|----------------|-------|
| Rory | LeNH | 40:10h | 40.17h | OK |
| Aysar | LeNH | 0:00h | 0h | OK — last worked ~Mar 9, "HẾT TASK" |
| Bailey DEV1 | VietPH | 32:00h | 32h | OK — Mon 0h, Tue-Fri 8h each |
| Bailey DEV3 | DuongDN | 2:40h | 2.66h | OK — Paturevision W19, task ID "[Maintenance] Update PHP" only |

### Upwork Messages (no task log)

**Neural Contract** (Australia) — "Ongoing Support of Laravel / mySQL website"
- **Mar 16:** Client reported file upload bug — "file not supported error" on all review types, including old ones. Attached sealy.docx + screenshot. Asked to fix and test.
- **Feb 27:** Previous request (completed): file name max 100 chars, allow hyphens, remove non-functional nav buttons, update copyright to 2026.
- This week: 0:00 hrs tracked. No response visible from our side since Mar 16 message.

### Notes
- VietPH on leave today (Mar 23)
- PhatDLT on leave Mar 27 + Mar 30
- Mon 23 all 0h everywhere — expected (morning, not yet logged)

---

## 6. Daily Report Checks

| Person | Where | Status | Detail |
|--------|-------|--------|--------|
| Kai | Xtreme Soft Slack | **FAILED** | Took 2 days off (Thu+Fri), no report |
| Nick | Global Grazing #maintenance | **PASSED** | 3 reports found (review stars fix, storage warning, pricing) |
| Jeff (jeff_trinh) | AirAgri Discord | **PASSED** | 4h: Classify & Assign Investigation done, Corrective Actions API done, new Corrective Action in-progress (iOS TF 3.3 b11) |
| Vinn | AirAgri Discord | **PASSED** | Fri 08:45: support Leon/Jeff, alarm work. Mon 09:21: alarm logic deployed to prod |

---

## Critical Alerts Summary

| # | Severity | Area | Issue |
|---|----------|------|-------|
| 1 | HIGH | William Bills | WordPress malware maxwellequipment.com.au — partial fix only, full cleanup needed |
| 2 | MEDIUM | Generator | SMTP 451 4.4.2 timeout — ShouldQueue fix deployed to staging, pending production |
| 3 | MEDIUM | AirAgri | 2 client-reported bugs: SMS interval + stop alarm not working (Jeff (jeff_trinh) active, report posted) |
| 4 | INFO | LegalAtoms | Client-side Rollbar prod alerts — not our issue |
| 5 | INFO | FountainStaging | BugSnag staging errors — not production, low priority |
| 6 | MEDIUM | Global Grazing | Storage WARNING flagged in Nick's Mar 20 report |
| 7 | — | Maddy | LongVV on leave Fri (Nghỉ cả ngày) — no issue |
| 8 | — | Fountain | Plan vs actual verified from Matrix: dev 86h/86h, QC 22h/21.5h — all match |
| 9 | — | Marcel | Adhoc project, 0h Fri expected |
| 10 | — | Rebecca | Task log "Chưa" is normal default state |
| 11 | — | Bizurk | nuscarrick missing channel access — user communicates with client directly, not a concern |

---

## Unresolved Questions

1. William Bills malware — who is handling full remediation of maxwellequipment.com.au?
2. Generator SMTP 451 timeout — ShouldQueue deployed to staging, pending production deploy
3. ~~Vinn (AirAgri)~~ — resolved, daily reports found (Fri + Mon)
4. ~~Bizurk Discord~~ — resolved, user communicates directly with client
