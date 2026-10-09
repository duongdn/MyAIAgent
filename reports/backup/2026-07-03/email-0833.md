# Email all — 2026-07-03 08:33 (+07:00)

Window: 2026-07-02T05:01+07 → now.

| Account | Emails | Calendar today |
|---------|--------|----------------|
| duongdn@ | 4 | none |
| carrick@ | 9 | none |
| nick@ | 7 | Weekly Meeting with Devs 21:30-22:30 |
| rick@ | 28 | HEAL Meeting 12:30-12:55, OmniGPT Daily Sync 10:30-11:00 |
| kai@ | 2 | none |
| ken@ | ERROR (auth_fail) | ERROR (no_principal, same cred issue) |
| vuongtrancr@gmail | 8 | n/a (not Zoho) |
| dnduongus@gmail | 20 | n/a (not Zoho) |
| freelancer@mpfc | 1 | n/a (not Zoho) |

## Alerts / notable

- **ken@ IMAP: Invalid credentials — needs user to regenerate Zoho app password.** Still broken (unresolved since 2026-07-02). Same root cred issue also breaks ken's CalDAV calendar fetch (no_principal).
- **carrick@** (Generator/Elliott): GitLab CI `generator-api` pipeline — 4 fails → 1 fix (03:19) → fail again 07:14 UTC, **last known state = FAILED, unresolved**. Plus `[snyk] Vulnerability alert for the marcel organization`. Dev/CI noise, not production-down, but flagging for awareness.
- **rick@** (Kunal/Fountain/InfinityRose — production alerts): heavy volume, 28 emails in window. FirstProject (Rollbar) ~13 new-error notifications through the day (React errors #1058-#1067, TypeError, fetch failures), InfinityRoses 1 new error (#434, duplicate), FountainStaging BugSnag `AWS…MissingRegionError`, FountainGifts/InfinityRoses daily summaries. Consistent with known ongoing FirstProject React error volume (see daily-report caveats).
- **vuongtrancr@gmail** (Swish): 2x "Signal lost for 10 minutes on 'Low Application Throughput'" (New Relic Incident Intelligence) — APM signal-lost alert per config. Delayed-newform daily summaries (informational), Facebook messenger DM (non-work).
- **kai@** (Madhuraka/Jira): 1 Jira mention — `[JIRA] (LIFM2-447) Calculate Spam and Open Rates` from Madhuraka Godahewa. Routine work-item mention, not a failure/alert.
- **nick@** (John Yi filter): no John-Yi-related content this window. Other traffic (Azure DevOps PRs, Xero limit warning from unrelated client, Stripe sandbox webhook) is out of scope for this account's monitored purpose.
- **duongdn@**: remote-work request thread (Tuan Nguyen → Nam Tran reply), birthday notice, training-session reply. No leave requests, no New Relic alerts.
- **dnduongus@gmail** (personal): no security/breach alerts. Rest is billing/newsletter/LinkedIn/bank-statement noise, correctly ignored per filter.
- **freelancer@mpfc**: only 1 email in window (Cloudflare bot-control notice) — no client emails from Adam Blackford/MPFC team this run.

## Trello: Check mail
Marked complete: **DuongDn, Kai, Nick** (no alerts relevant to monitored purpose).
Left incomplete: **Carrick** (GitLab pipeline unresolved + Snyk vuln), **Rick** (production Rollbar/BugSnag volume), **Ken** (auth_fail, unverifiable).
Card not marked done (not all items complete).

## Known issue / bug found this run
`scripts/daily-email-scan-260610.js` (the script named in the task) has a **hardcoded stale window** (`WINDOW_START = 2026-06-09`, `IMAP_SINCE = "9-Jun-2026"`) plus a truncation bug (`subjects.slice(0,20)` after ascending-UID fetch) that silently returned June's oldest emails instead of today's. Running it as instructed produced 0 in-window results for 7/9 accounts. Worked around by creating a corrected `scripts/daily-email-scan-260703.js` (copied from the more recent `260622.js` baseline — which already fixed the slice bug and Gmail TLS — with today's window dates). All numbers above come from the corrected script. **Recommend**: retire per-date-hardcoded email scan scripts in favor of one canonical script that computes the window from the current date/`--since` arg, per the existing project rule against dated one-off scripts (currently only enforced for sheets scripts).
