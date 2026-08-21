---
name: feedback_maddy_consolidated
description: "Maddy (largest client project) MUST get a dedicated ## Maddy section every report covering 4 parts (task-log hours, Slack, JIRA, Bitbucket PR) — repeatedly regressed on structure even when data was correct"
metadata:
  type: feedback
---

**MANDATORY, every Maddy check, not just when asked — 4 parts, ONE dedicated `## Maddy (Xtreme Soft Solutions / Carrick-Kai-Luis)` section:**

1. **Task-log hours** — Friday-on-Monday from WS Maddy project `cmpqc1v7v00ahtk1vs1817xt8` (LongVV, Kai). LongVV target 16h/week part-time.
2. **Slack** — DM history Madhuraka↔Kai (pull actual DM thread, not just `search.messages` keyword hits). Kai daily-report check is CONDITIONAL on WS Maddy hours.
3. **JIRA** — project LIFM2, 20 active tickets:
   - Weekly cross-check: `node scripts/maddy-jira-tasklog-check.js --week <date>` AND pull individual tickets' real `timeoriginalestimate`/`timespent` (script alone isn't enough).
   - **Daily** (in addition, user asked 2026-07-29 "cần info này daily"): `POST /rest/api/3/search/jql` with `jql=project = LIFM2 AND status not in (Done, Closed, Resolved) ORDER BY updated DESC`, filter by activity since last run, show summary/status/assignee/comments per ticket. Config: `config/.jira-config.json` → `instances.madhuraka`.
   - Re-check 3 known prior risk tickets every time: LIFM2-260, LIFM2-439, LIFM2-409 (see [[feedback_maddy_kai_longvv_identity_and_quality_escalation]]).
4. **Bitbucket PR status** — code is on Bitbucket, not GitHub: `bitbucket.org/xtreme-web/rms` (workspace=`xtreme-web`, repo=`rms`). Creds: `config/.bitbucket-config.json` → `instances.kai`.
   - `GET {api_base}/repositories/xtreme-web/rms/pullrequests?state=OPEN&pagelen=50`, comments via `.../pullrequests/{id}/comments?pagelen=50`.
   - **PR-comment reply-rate is the single most reliable signal of real Maddy health** — hours/JIRA/Slack can look routine while PRs sit with unaddressed Critical/High findings for weeks. Always check reply-count, not just PR existence.
   - Token gotchas: Atlassian tokens created without Bitbucket scope give `"no Bitbucket scopes"` (need a re-created token); a previously-working token can also just die (`401 invalid/expired`) independent of any local clobber — when a credential fails, grep past session transcripts for the token string to check whether it was ever confirmed working before assuming local corruption. `200` = working; save+encrypt immediately via `bash scripts/encrypt-secrets.sh`.

**Why the structure rule exists:** repeated regressions, ALL data-complete but buried — 2026-07-08 (scattered across 3 separate headers), 2026-07-22 (buried in a recheck log entry). Root cause: doing the 4-part check right is a separate failure mode from presenting it right — passing data-completeness doesn't satisfy report-structure. **Fix:** the moment ANY Maddy data is gathered (normal run or recheck), first check "does `## Maddy` already exist in this report?" — if not, create it immediately; never write findings into a generic Slack/Sheets table or a recheck-log paragraph.

**Pre-commit validation** — before any daily-report commit:
```bash
grep -q "## Maddy" reports/YYYY-MM-DD/daily-report.md || echo "🔴 MISSING Maddy section"
```

**Section template:**
```markdown
## Maddy — W{n} — {HH:MM} (+07:00)

### 1. Task Log Hours (Fri {date})
| Developer | Fri | Weekly total | Status |
|-----------|-----|--------------|--------|
| LongVV | Xh | Yh | OK / ⚠️ under 16h/week |
| Kai | Xh | Yh | Conditional gate |

### 2. Slack / Kai Daily Report Check
- WS Maddy hours: {X}h → {check or skip}
- **Conclusion:** {alert or OK}

### 3. JIRA (weekly cross-check + daily ticket activity)
{script output + new-activity tickets}

### 4. Bitbucket PR Status
{open PRs, comment reply-rate}
```

If any of the 4 parts is missing or structurally blocked, say so explicitly and name what's needed to unblock it — never silently omit it, never present "Kai posted daily report, clean" as sufficient.

[[feedback_maddy_jira_weekly_check]] [[feedback_maddy_kai_longvv_identity_and_quality_escalation]]
