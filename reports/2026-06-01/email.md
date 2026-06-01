## Email all — 08:27 (+07:00)

Window: 2026-05-29T08:21+07:00 → 2026-06-01T08:27+07:00

| Account | Emails | Calendar today |
|---------|--------|----------------|
| duongdn@nustechnology.com | 10 | No events |
| carrick@nustechnology.com | 1 | No events |
| nick@nustechnology.com | 21 | No events |
| rick@nustechnology.com | 25 | No events (past events only: HEAL Meeting 2026-05-25, OmniGPT Daily Sync 2024-12-03) |
| kai@nustechnology.com | 15 | No events |
| ken@nustechnology.com | 50 (GitHub PRs in NewsLetter) | No events |

---

### Leave Requests (duongdn@) — ACTION REQUIRED

- **[NUS] Xin off chiều 1/6** — Nam Tran (namtv@nustechnology.com), Mon 1 Jun 11:32
  - Re: approved by Chien Tran (chientx@nustechnology.com), Mon 1 Jun 11:47
- **LongVV_Đơn xin nghỉ phép buổi chiều** — Vo Van Long (longvv@nustechnology.com), Mon 1 Jun 14:58
- **Xin về sớm lúc 16h từ ngày…** — Hung Pham (hungpn@nustechnology.com), Mon 1 Jun 14:05
  - Re: by Chien Tran (chientx@nustechnology.com), Mon 1 Jun 14:10

Other duongdn@ emails:
- [NUS - HR] Thông báo chuyển lương tháng (NUS Finance Team, Sat 30 May)
- [HR] Payslip - 05/2026 (NUS Finance Team, Sun 31 May)
- [NUS - Training] Growth Learning Fund (Hang Dang, Mon 1 Jun)
- Spreadsheet shared: "NUS - Cline - OhCleo" (Minh Trinh via Google Sheets, Mon 1 Jun)
- ZohoMail - New login activity (Fri 29 May, informational)

---

### Production Alerts (rick@) — ATTENTION

**Rollbar - Production Error:**
- **[FirstProject] production - New Error: #887 ChunkLoadError: Failed to load** — Rollbar, Sun 31 May
  - This is a real production error (ChunkLoadError on frontend)

**Rollbar - Account Limit:**
- **[Rollbar] Free error monitoring limit reached for account rickfountain** (x2) — Rollbar Support
  - The free tier limit has been hit; some errors may not be tracked

**BugSnag - Staging only (not production alerts):**
- [FountainStaging] StandardError in cart_items#create (staging)
- [FountainStaging] AbstractController::ActionNotFound in GET (staging)
- [FountainStaging] NoMethodError in application#not_found (staging)

**Rollbar Daily Summaries (routine, informational):**
- InfinityRoses: Fri/Sat/Sun/Mon summaries (x2 each)
- FountainGifts: Sat/Sun/Mon summaries (x2 each)
- FirstProject: Fri/Sat/Sun summaries

---

### Errors in nick@ (CNA / AuShare)

- **Sentry issue - OpenURI::HTTPError** (x2) — AuShare ClickUp, Fri 29 May 12:30
  - Related PR: "Fixed error openuri httperror - CNA.Operations.App 1580" (Azure DevOps)
  - Error appears to have been addressed via PR 1580 (same day)

Other nick@ emails: 17x Daily Task Completions from candasurveyors.com.au (routine automated reports), ZohoMail login, Microsoft mail notification

---

### carrick@ — Clean

- ZohoMail - New login activity (Sat 30 May 05:54 -0700, informational)
- No Redmine bug notifications. No SoCal/Socalautowraps emails.

---

### kai@ — Jira / Madhuraka (informational)

- 8x Jira notifications (LIFM2-443 Order Fulfilment, LIFM2-442 Price rounding, LIFM2-439 Listed-Cons tab, LIFM2-434 Quote Tool AI MVP, LIFM2-441 Quoting Tool Search) — Anoma Wasala & Madhuraka Godahewa mentions
- 4x Bitbucket PR activity (PR #501 Hotfix/order fulfilled, PR #494 Optimize Quoting Tool Search)
- FW: Shopify orders fulfilled (Madhuraka, Mon 1 Jun)
- ZohoMail login (informational)
- No Madhuraka personal-status issues.

---

### ken@ — GitHub PRs (informational, 50 emails)

All from GitHub notifications (NewsLetter folder). Key threads:
- welligence/country-manager: WDE-8341 (Handle Confusing Import), WDE 8101 (spacing), WDE-8424 (Brunei PDF puller)
- mimaizumi/amocc-material: fix: production hardening for Partner Portal (multiple reviews by khangnus, Hideki Ohkubo), streaming, subscription plans restyle, managed project creation
- Precognize/development: PR activity (briannus)
- nustechnology/Elena-SamGuard-Digital-Plant: DP-666 (coderabbitai review)

Note: "fix: production hardening" subjects are GitHub PR titles — code changes, not runtime alerts.

---

### Summary of Alerts

| Priority | Alert | Account | Action |
|----------|-------|---------|--------|
| HIGH | [FirstProject] production - New Error: ChunkLoadError #887 | rick@ | Investigate frontend chunk load failure in production |
| HIGH | Rollbar free limit reached (rickfountain account) | rick@ | Upgrade Rollbar plan or clear errors to restore monitoring |
| MEDIUM | Leave requests: Nam Tran (off afternoon 1/6), Long VV (off afternoon), Hung Pham (leave early 16h) | duongdn@ | Already have manager replies; confirm in Trello |
| LOW | Sentry OpenURI::HTTPError (CNA/AuShare) — PR 1580 appears to fix | nick@ | Monitor if recurs |
| INFO | FountainStaging BugSnag errors (3x) | rick@ | Staging only, not production |
