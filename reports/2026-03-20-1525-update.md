# Update — 2026-03-20 15:25 (Fri)

Monitoring period: Mar 20 10:17 → Mar 20 15:25 (UTC+7)

## Slack (13 workspaces) — 73 new msgs

| Workspace | New | Highlights |
|-----------|-----|------------|
| William Bills | 37 | **SECURITY INCIDENT**: Lucas found malicious files on WP site. Cleaned temp, but server needs reinstall. Oliver: "main thing its back up and running." Site was down briefly. |
| Amazing Meds | 8 | **#web-dev-with-nick**: John Yi wants care plan page (not "membership") pushed to live from staging. Nick working on data export. |
| Generator | 4 | **#mpdm**: Carrick deployed prod fix for yesterday's bugs. ShouldQueue not implemented on mail classes — now fixed. Ryan approved PR #316. Rudi flagged more notifications missing ShouldQueue. |
| Global Grazing | 4 | **#maintenance**: Nick daily status — **Storage NOT OK (90%)**. Was 74% WARNING previously. Amy: review star fixed, asking about Doofinder sandbox for testing. |
| Swift Studio | 2 | **DM Carrick/Rory**: Carrick pushed to dev, adding guest purchase support. |
| Baamboozle | 2 | **#testing**: skjamie25 asking Carrick for updates to test (2x). |
| LegalAtoms | 16 | **#standup (5)**: Overdue review reminders, guest mode work. **#general (1)**: "Erald Test" test data showing in client questionnaires (alpha). **#api-alerts-prod (10)**: Rollbar. |
| Equanimity | 0 | — |
| All others | 0 | Xtreme Soft, SAM GUARD, RDC-FM, MPFC, SoCal, Aigile Dev — quiet. |

## Email (6 accounts) — 58 new

| Account | Total | Filtered | Highlights |
|---------|-------|----------|------------|
| duongdn@ | 2 | — | PhatDLT leave reply from BinhNT, Finance company notification |
| carrick@ | 1 | — | Slack email confirmation |
| nick@ | 9 | 0 (John Yi) | ClickUp tasks (Quote Details, 3D Admin Role), **Mailgun API key added to Global Grazing** |
| rick@ | 2 | 2 (InfinityRose) | InfinityRoses Rollbar daily summaries x2 |
| kai@ | 0 | 0 | — |
| ken@ | 44 | 0 (Precognize) | Welligence/WellStack PRs (WDE-7880, WDE-7894 Mexico business units) |

## Discord

### AirAgri (nusvinn) — 19 new msgs

**#airagri_webapp (19):**
- **dapackage (Leon)**: PHP config not set up on production — PR269 has safeguards but best merged after PHP fix. SOS alarms were using legacy notification code before his implementation; wrapped with error handling.
- **James Diamond**: confirmed seeing alarm notifications working
- **Architecture note**: staging works correctly, production PHP version mismatch causing issues
- **PR269 status**: ready but blocked on production PHP config fix

### Bizurk, HOMIEAPP — 0 msgs

## Matrix/Element — Fountain (6 new)

| Time | Sender | Message |
|------|--------|---------|
| 10:32 | hungpn | Testing arrow animation bug on beta.fountaingifts.com — asking ViTHT to check |
| 13:35 | trinhmtt | Asking team about bug status |
| 14:37 | vutq | Shipping + Redemption complete pages updated on BETA |
| 14:58 | trinhmtt | **New bug #2788**: build-a-box product catalog bug (Trello link) — assigned to VuTQ, HungPN, PhatDLT |

Team actively working: hungpn (QC), vutq (dev), trinhmtt (PM).

## Web — samguard.co
HTTP 200, 152KB. OK.

## Redmine
#77734: Deployed (no change).

## Google Sheets

### Fountain W18 — Fri not filled yet (15:25, expected EOD)

| Person | Mon | Tue | Wed | Thu | Total | Plan | Status |
|--------|-----|-----|-----|-----|-------|------|--------|
| ViTHT | 8h | 8h | 8h | 6h | 30h | 30h | **PLAN MET** — Fri = bonus |
| VuTQ | 4h | 8h | 8h | 8h | 28h | 36h | Need 8h Fri — tight |
| ThinhT | 4h | 4h | 4h | 4h | 16h | 20h | Need 4h Fri — on track |
| HungPN | — | 2h | 2h | 4h | 8h | — | Improved from previous |
| PhatDLT | 3h | 3h | 3h | — | 9h | — | Thu+Fri not filled |

**QC pool**: 17h (HungPN 8 + PhatDLT 9). Plan 21.5h. Need 4.5h Fri.

### Other Employees
- **LongVV**: Thu+Fri still — (not filled). **ALERT: 2 days unfilled.**
- **PhucVT**: Thu total 12h, Fri total 4h (likely cumulative column, needs detail check)
- TuanNT John Yi: W9 sheet format unreadable (no date match)
- VietPH, KhanhHH, LeNH: unchanged from last report (OK)

## Scrin.io
Not checked (login issue from last run persists).

## GitHub
Not checked (auth config issue persists).

## Trello

### Check Progress — 18/19 (unchanged)
Only **Fountain - DOCUMENT** remains.

### Fountain Board

| List | Previous | Now | Delta |
|------|----------|-----|-------|
| Bugs | 9 | **10** | +1 |
| QC Internal | 5 | 5 | — |
| To-Do | 38 | 38 | — |
| Doing | 3 | 3 | — |
| Not Passed | 2 | 2 | — |

**2 NEW customer comments from tmmckay:**
1. **Build-a-box product catalog bug** (#2788): Modal on mobile — when opened with reduced transparency enabled (iPhone 15), UI breaks
2. **Build-a-box product catalog modal issue**: Opened via product catalog, can't scroll or interact properly on mobile

kunalsheth also active (previous "yes" comment).

## Alerts

| Priority | Alert | Change |
|----------|-------|--------|
| **HIGH** | **William Bills SECURITY**: Malicious files found on WordPress site. Lucas cleaned temp, but needs server reinstall or full cleanup. Site was briefly down. | **NEW** |
| **HIGH** | **Global Grazing storage 90%** — was 74% WARNING, now NOT OK. Needs immediate attention. | **ESCALATED** |
| **HIGH** | **Fountain**: 2 new customer bug reports from tmmckay — build-a-box modal broken on mobile (iPhone 15 + reduced transparency). Bug #2788 created. | **NEW** |
| **HIGH** | AirAgri: Production PHP config not set up — PR269 blocked. Leon added safeguards but merge delayed. | **NEW** |
| **MEDIUM** | LongVV: 2 days unfilled (Thu+Fri). | **ESCALATED** |
| **MEDIUM** | Generator: Multiple mail classes missing ShouldQueue — emails sent synchronously. Carrick fixing. | **NEW** |
| **MEDIUM** | LegalAtoms: "Erald Test" test data visible in alpha client questionnaires | **NEW** |
| **MEDIUM** | TuanNT/Nick (Amazing Meds) off Mon-Wed next week. Lucas (William Bills) also off same days. | Ongoing |
| **MEDIUM** | #2595 GiftDrop Redemption over-estimate — still growing (168.25h vs 120h est) | Ongoing |
| **INFO** | Baamboozle: skjamie25 waiting for test updates from Carrick | NEW |
| **INFO** | Mailgun API key added to Global Grazing account (nick@) | NEW |
| **INFO** | Fountain: VuTQ deployed Shipping + Redemption complete on BETA | NEW |

## Unresolved Questions

1. William Bills server cleanup — is Lucas doing full reinstall or just temp fix? Is the site secure now?
2. Global Grazing storage 90% — what's filling up? Prestashop logs/images? Can Nick address before his week off?
3. GitHub/Scrin.io auth issues still blocking cross-reference checks.
4. LongVV 2 days unfilled — absence or just late logging?
5. TuanNT W9 sheet format still unreadable — different date structure?
