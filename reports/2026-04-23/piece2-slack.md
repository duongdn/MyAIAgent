# Piece 2 — Slack
## Window: 2026-04-21 08:27 → 2026-04-23 08:55 (+07:00)

Method: search.messages API (captures thread replies). Auth: 12 xoxp + 2 xoxc (AmazingMeds, Equanimity, both with Cookie). No auth failures — all 14 workspaces returned data.

| Workspace | Msgs | Key content |
|---|---|---|
| Baamboozle | 49 | Aysar active on #testing (admin/Stripe flow verify + deploy to prod); customer-success update; Carrick holiday notice posted |
| RDC - FM Monitoring | 10 | Automated reboot/user-access logs only; Carrick posted Hung Kings holiday notice; no Franc/dmetiner blockers |
| Swift Studio | 2 | Jeff posted holiday notice to Rory; Rory replied "Let me try that!" — quiet but normal |
| Xtreme Soft Solutions | 4 | Kai active in DM with Madhuraka ("I'm back" 04-23 08:38); holiday confirmed. Kai 16h/wk so missing report ≠ alert |
| SAM GUARD - Mobile | 19 | Tom investigating upgrade failure on studio-03 (algorithms offline, DEL-7104 opened); Kfir (PG IT) handling. Dev issue, not our team's status. MQL-leads = automated hubspot |
| GLOBAL GRAZING SERVICES | 55 | Amy (NUS) active on #change-requests, #maintenance, #double-scan, #barcode-stock; Nick posted daily report 04-23 08:16 + follow-up; client (Joey) engaged heavily |
| Amazing Meds | 24 | Nick active on #web-dev-with-nick (fixing 1056px display bug 04-23 08:36); John Yi asked about vacation cover, Nick replied; daily reports posted 04-21 + 04-22 |
| Generator | 100 | Carrick leading Laravel 12 upgrade recommendation; prod deploy of B-207/576/773/etc.; Violet+Jeff iOS/Android release; Rudi surfaced SQL error in prod log — Carrick addressing |
| LegalAtoms | 4 | General channel only — Raymond noting Thursday release; Hamid asking Talha for unblock. No Nick-specific DMs with issues |
| MyPersonalFootballCoach | 0 | Silent — low-activity workspace, normal |
| William Bills | 25 | Lucas+Oliver active on production deploy/test (Oliver=client); QuanLM helped Lucas with SSH/IP issue. Normal dev flow |
| Equanimity | 43 | Carrick active on #xid-technologies (Komal DB migration demo); Marcel handled DigitalOcean migration ownership (04-21). Holiday notice posted |
| SoCal Auto Wraps | 0 | Silent — normal |
| Aigile Dev | 6 | The GAiGE alerts integration set up (empty test messages); make.com "blog not published" draft warning |

## Alerts
- None. All NUS team members active; no auth failures; no person-status issues (0h/absent/auth-fail) detected in window.
- Notable non-alerts (per memory rules, do NOT block Trello):
  - SAM GUARD: studio-03 upgrade failure = Precognize IT (Kfir/Roman) issue, not our team
  - Generator #triage: prod SQLSTATE error = dev discussion, Carrick addressing
  - Aigile Dev: GAiGE webhook setup test messages
  - MyPersonalFootballCoach/SoCal 0 msgs = normal (low-activity)

## Details by workspace

### Baamboozle (49 msgs)
- **#testing** (21): Carrick coordinated adding 50 customers on nusdev with skjamie25; asked Aysar to verify and push to production
- **#U02T67RLQUV** (10): DM with skjamie25 re team-owner change for Stripe billing logic (scope clarification)
- **#random** (5): skjamie25 casual chat
- **#engineering** (5): Automated GitHub integration posts
- **#customer-success** (4): Audrey/skjamie shared Instagram reel — not our team
- **#cancellation-responses** (2): Typeform automated
- **#mpdm-heyitsronanc--carrick--skjamie25-1** (2): Carrick daily updates (Quizlet import fix, Stripe discount bug, Metric PoC)

### RDC - FM Monitoring (10 msgs)
- **#rpi-reboot-logs** (5): Automated tuner recovery alerts (self-healing)
- **#user-access-logs** (4): Automated access logs
- **#all-rdc-fm-monitoring** (1): Carrick Hung Kings holiday notice

### Swift Studio (2 msgs)
- **#bxr__app** (2): Jeff posted holiday notice; Rory "Let me try that!"

### Xtreme Soft Solutions (4 msgs)
- **#U021Q9A8FG9** (4): Kai DM with Madhuraka — holiday-week schedule confirmed (still 2 days), Kai back online 04-23 08:38

### SAM GUARD - Mobile (19 msgs)
- **#new-studio-developers** (11): Tom debugging studio-03 upgrade (Precognize algorithms issue); Kfir (their IT) handling
- **#mql-leads** (8): Automated hubspot MQL notifications

### GLOBAL GRAZING SERVICES (55 msgs)
- **#change-requests** (23): Amy + Joey (client) heavy interaction — Q&A module deploy, card-layout tweaks, grid view design
- **#maintenance** (17): Nick posted daily report 04-23 08:16 + follow-up 08:39 on GLS PrestaShop 9 upgrade + ShipIT API
- **#double-scan-option** (7): Amy handled build issue, Joey will retest next day
- **#barcode-stock-and-picking-location** (7): Joey reported multiple issues, Amy acknowledging
- **#U01B7QMKXD1** (1): Nick holiday notice

### Amazing Meds (24 msgs)
- **#web-dev-with-nick** (14): Nick actively responding to John's requests (04-23 08:34-36 fixing 1056px display bug)
- **#blog-marketing-dept** (5): John + Celeenerae email marketing pivot discussion — not our team
- **#U04QLAGUU8N** (3): John asked vacation cover, Nick offered extra hours this week
- **#it-dept-all** (2): Nick daily reports posted 04-21 + 04-22

### Generator (100 msgs)
- **#release** (36): Carrick running data migration for 524 tasks in prod; B-207/576/773/etc. release coordination with Ryan/Rudi
- **#mobile** (25): Violet+Jeff iOS/Android release handoff; DST/UTC timezone fixes; v1.9.0 build
- **#triage** (16): Rudi found prod SQL error, Carrick reviewing PR #334
- **#business-analysts** (16): Violet reporting test progress to Elliott (client)
- **#mpdm-elliott.bouher--carrick--violet--rudi-1** (7): Carrick PHP/Laravel version recommendation (PHP 8.3, Laravel 12)

### LegalAtoms (4 msgs)
- **#general** (4): Raymond Thursday release note; Hamid asking for code review; no Nick-specific DMs

### MyPersonalFootballCoach (0 msgs)
- Silent (normal for low-activity workspace)

### William Bills (25 msgs)
- **#U051TSQ6SHX** (21): Lucas deploying to production, Oliver (client) testing/confirming; normal dev flow
- **#U0510N5F0CX** (4): Lucas + QuanLM troubleshooting SSH/IP for WP production — resolved

### Equanimity (43 msgs)
- **#xid-technologies** (37): Carrick + Komal (client) on DB schema migration / procedure script + index for sgbuildex tenant
- **#U03AZ8BD5J4** (6): Carrick scoped DigitalOcean migration (20-30h); Marcel acknowledged + will handle with own devops; holiday notice

### SoCal Auto Wraps (0 msgs)
- Silent (normal)

### Aigile Dev (6 msgs)
- **#the-gaige-alerts** (5): Webhook integration test setup (empty messages are expected Sentry probe)
- **#braiking-news** (1): make.com automation "blog draft not published" warning — not our team
