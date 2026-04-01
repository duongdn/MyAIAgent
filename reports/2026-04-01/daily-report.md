# Daily Report — 2026-04-01 (Tuesday)

## Email (all) + Trello Mail — 08:20 (+07:00)

**Period:** 2026-03-31 08:20 → 2026-04-01 08:20 (+07:00)

| Account | Count | Summary | Trello |
|---------|-------|---------|--------|
| duongdn@ | 9 | Redmine Bailey bug closures (routine), HR emails (salary Q1 survey, payslip 03/2026, part-time job info). No leave requests, no New Relic alerts. | ✓ complete |
| carrick@ | 8 | Redmine [Generator Bug #77954](https://redmine.nustechnology.com/issues/77954) NEW — Leads Engagement Dashboard issue. Jira BXR-178 assigned by Rory (Telephone Number not Saving). Rollbar SoCal daily summary. Slack confirmation codes. | ✓ complete |
| nick@ | 8 | ClickUp notifications (3D Admin Role, Jobs on hold). Azure DevOps PRs #1347-1349 from Emir LLaneza (CNA.Operations.App). No John Yi emails. | ✓ complete |
| rick@ | 10 | Rollbar daily summaries: InfinityRoses, FirstProject, FountainGifts. **⚠️ New Rollbar error: [FirstProject] production #972 ChunkLoadError (loading chunk 3148)**. Upwork msg from Gil C. | ✓ complete |
| kai@ | 8 | Xtreme Soft order cancellations (#1205, #1206). Madhuraka Jira: LIFM2-429, 395, 394, 427, 268 (Discount Price, Buy tab, Sell Types, Email templates). Weekly Jira summary. | ✓ complete |
| ken@ | 219 | GitHub notification noise (dependabot, welligence, zeroco84/rentle PRs). No Precognize/development activity found. | ✓ complete |

**Alerts:**
- ⚠️ **rick@**: Rollbar production error #972 ChunkLoadError on FirstProject (Fountain) — chunk 3148 failed to load. May indicate deployment/build issue.

**Trello:** All 6 Check Mail items ✓ complete on card `69cc675bb72f6874eba15e69`.

## Elena WordPress — 08:37 (+07:00)

**Site:** https://www.samguard.co/

**JS Console Errors:** 1
- CSP violation: `connect-src` blocks Google remarketing (`google.com.vn/rmkt/collect`) — not in CSP allowlist. Low severity, analytics tracking only.

**Failed Requests:** 15
- Google tracking (4): `google.com/ccm/collect`, `google-analytics.com/g/collect`, `google.com.vn/rmkt/collect`, `px.ads.linkedin.com` — all blocked by CSP/ad-blocker. Expected in headless.
- **⚠️ Video assets (11):** Multiple `.mp4` files returning `ERR_ABORTED`:
  - `/wp-content/uploads/2025/02/1.mp4` (3 attempts)
  - `/wp-content/uploads/2025/03/2.mp4` (2 attempts)
  - `/wp-content/uploads/2025/03/3.mp4` (2 attempts)
  - `/wp-content/uploads/2025/03/4.mp4` (2 attempts)

**Assessment:** No actual JS runtime errors. CSP violation is analytics-only (INFO). Video aborts likely due to headless browser not playing media — verify in real browser if concerned.
