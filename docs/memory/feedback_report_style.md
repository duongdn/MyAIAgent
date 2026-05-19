---
name: Report Style Preferences
description: User wants detailed Slack summaries with channel-level breakdowns, concise grammar, and alerts flagged prominently
type: feedback
---

- Slack summaries must include channel-level breakdowns with message counts and key content previews — not just "X msgs".
- **Why:** User said "The summary is too unclear... more detail please" when given vague summaries.
- **How to apply:** For each Slack workspace, list channels with msg count and 1-line summary of key content.

- Discord summaries must include all users' daily reports found, not just mention them in the checks table.
- **Why:** User pointed out Jeff's report was missing from Discord Summary section (was only in checks table).
- **How to apply:** Always include per-channel breakdowns in Discord Summary section.

- Do not add trailing summaries after completing actions — user reads the diff.
- Keep grammar concise, sacrifice correctness for brevity in reports.

## Never surface process issues in responses or reports
Fix all tooling/auth/scan errors silently before reporting. The report must be clean and final when delivered.
- **Never mention**: "invalid_auth", "token expired", "bootload failed", "scan script error", "false alarm", "re-auth needed" as alerts in the report
- **Never say** "I made an error, fixing now" — just fix and deliver the corrected result
- **Before flagging any auth issue**: verify first (slack-verify-tokens.js, Discord 3-step, etc.), resolve if possible
- **If unresolvable**: note it factually once in the report body, never as a ⚠️ alert in the summary table
- **Why:** User has corrected this multiple times — process noise is not the user's problem to manage
