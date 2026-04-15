## Email all — 08:23 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn@ | 0 | No new emails. No leave requests or New Relic alerts. |
| carrick@ | 7 | 1 Redmine bug (Generator #78185 — form image), 1 Snyk vuln alert (Marcel org), 3 Google Sheets shares ("unitedtecnew — failed to scan"), 1 Jira weekly update, 1 Rollbar daily summary (Socalautowraps) |
| nick@ | 7 | No John Yi related emails. 4 Azure DevOps PRs (CNA Operations), 2 ClickUp notifications (Cancel/Hold Modal), 1 daily task completions (candasurveyors) |
| rick@ | 8 | 2 Rollbar daily summaries (InfinityRoses Apr 14), 2 Rollbar (FirstProject Apr 14), 2 Rollbar (FountainGifts Apr 15), 1 BugSnag **staging** (FountainStaging — Errno::ENOENT in sitemap:create), 1 Upwork message (Adil R.) |
| kai@ | 1 | Jira weekly update from Madhuraka. No alerts. |
| ken@ | 50 | NewsLetter folder: ~44 welligence/web & QueryPlatform GitHub notifications (PRs, reviews), 3 mimaizumi/amocc-material, 1 Supabase disk IO warning (WyAsk-dev), 1 Acme Staffing shift cancellation. No Precognize activity. INBOX: 0 Precognize PRs. |

### Alert Analysis

**No production alerts detected.**

- **rick@ BugSnag**: FountainStaging Errno::ENOENT in sitemap:create — **staging only**, not production. INFO level.
- **carrick@ Snyk**: Vulnerability alert for Marcel organization — security advisory, not a production outage.
- **carrick@ Redmine**: Generator bug #78185 (form image) — new bug report, not a production alert.
- **ken@ alerts flagged**: The "Daily Downloads Limit" and "Raise error" PR subjects contain the word "error" but are GitHub PR activity (code changes), not production alerts.
- **ken@ Supabase**: WyAsk-dev running out of Disk IO Budget — dev environment, not production.
