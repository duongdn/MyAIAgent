---
name: feedback_maddy_four_part_check_mandatory
description: Maddy checks MUST cover 4 parts every time (Slack, JIRA comments, est/actual, PR status) — user has asked repeatedly and it was never done at the first pass
metadata:
  type: feedback
---

**MANDATORY, every Maddy check, not just when asked:**
1. **Slack** — DM history Madhuraka↔Kai (not just `search.messages` keyword hits — pull the actual DM thread)
2. **JIRA ticket comments** — for any ticket Kai mentions as "Done"/"in progress" in Slack, fetch the actual JIRA issue (status + comments) and cross-check. Also re-check the 3 known prior risk tickets each time: LIFM2-260, LIFM2-439, LIFM2-409 (see [[feedback_maddy_kai_longvv_identity_and_quality_escalation]]).
3. **Est/actual** — `node scripts/maddy-jira-tasklog-check.js --week <date>` AND cross-reference each ticket's real JIRA `timeoriginalestimate`/`timespent` (the script alone isn't enough — pull individual tickets too, per the pattern in this check).
4. **PR status/comments** — ✅ **RESOLVED 2026-07-07**: this project's code is on **Bitbucket** (`bitbucket.org/xtreme-web/rms`, workspace=`xtreme-web`, repo_slug=`rms`), not GitHub. Credentials now stored in `config/.bitbucket-config.json` (gitignored + `.enc` backup): `instances.kai` = `{ email: "kai@nustechnology.com", api_token, api_base: "https://api.bitbucket.org/2.0" }`.
   - **Critical gotcha:** Kai's first TWO Atlassian API tokens (from `id.atlassian.com`) both failed with `"API Token provided has no Bitbucket scopes"` — only the 3rd token worked. When asking the user for a token, they may hand you one without Bitbucket scope; test it immediately against `GET /2.0/repositories/xtreme-web/rms/pullrequests?state=OPEN` and report back clearly if it lacks scope, so they know to try a different/newly-scoped token rather than assuming Bitbucket access is broken.
   - Fetch open PRs: `GET {api_base}/repositories/xtreme-web/rms/pullrequests?state=OPEN&pagelen=50` (Basic auth, base64(email:token))
   - Fetch PR comments: `GET {api_base}/repositories/xtreme-web/rms/pullrequests/{id}/comments?pagelen=50`
   - Watch for automated `Codex Review` bot comments and Madhuraka's own manual "Codex findings" comments flagging Critical/High/Important issues — check if there's been ANY reply after the finding (a PR with exactly 1 comment = the review flag, and nothing else = unaddressed).

**Why:** User, 2026-07-07: "I asked you many time about that every day but never done at the first time." Root cause: PR status was never deliverable because there was no Bitbucket integration — not a process laziness issue, a missing capability nobody had surfaced until this session. Now fixed.

**Real severity found once PR access worked (2026-07-07):** Several PRs have serious unaddressed review findings — PR #509 (LIFM2-428, the ticket Madhuraka flagged as "aging") has a CRITICAL bug (cert-template selection logic) sitting unaddressed since Jun 22 (15+ days, zero replies). PR #481 (LIFM2-409) has a HIGH-severity bug Madhuraka himself flagged (Xero double-posting on refunds) sitting unaddressed for over a month. PR #513 (payout hotfix) has an unaddressed "Important" finding from Jul 2. **This is a materially different picture than JIRA/Slack alone showed** — the PR review layer is where the real unresolved technical debt lives. Always check PR comment reply-count, not just PR existence.

**Real findings from the 2026-07-07 deep check (useful as a template for what "done right" looks like):**
- Slack showed Kai claiming LIFM2-447/446 "Done" — JIRA showed 447 still "In Progress" with 0h logged, and 446 "Review" not "Done". Real discrepancy, only caught by checking JIRA directly.
- LIFM2-428 (the ticket Madhuraka flagged as "been there for a long time") had been sitting in Review since Jun 28 with zero comment movement — 9 days, confirms the complaint is legitimate, not a client being impatient over nothing.
- Maddy's task-log Google Sheet (`1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I`, own week-epoch e.g. `W14` for Jul 6) showed **0h logged** for a day with 3 real JIRA ticket updates — a genuine tracking gap, not a data-fetch bug.

**How to apply:** Never present a Maddy check as "Kai posted daily report, clean" — that is not sufficient. Always attempt all 4 parts; if a part is structurally blocked (like PR status), say so explicitly and name what's needed to unblock it, don't silently omit it.

**🔴 REPEAT VIOLATION 2026-07-08 — report structure, not data:** All 4 parts WERE checked, but scattered across 3+ separate report headers (Slack buried in the generic "Slack [all]" table, JIRA under "Sheets — Maddy JIRA", PR under a standalone "Maddy — Bitbucket PR check" 30min later). User: "Again, Maddy lại ko có 1 mục riêng, trời ạ!!!" (again no dedicated section, ugh) — this is a recurring complaint, not the first time. **Fix, mandatory going forward: always emit ONE consolidated `## Maddy (Xtreme/Carrick-Kai-Luis)` section** containing all 4 parts + verdict + Trello line together, same pattern as the dedicated `## OhCleo Slack` section. Do not scatter Maddy content across generic per-source headers (Slack table, Sheets table, standalone PR check) — pull it all under the one Maddy heading even if the underlying checks run at different times.
