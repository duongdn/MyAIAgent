---
description: Review Upwork work memos against Workstream review-requests, then submit the review report
---

# ⚠️ MANDATORY FIRST STEP — READ MEMORY

Before doing anything else, invoke `/util:read-memory workstream-review-submit`. Read Global + `## daily-report:sheets` (workstream) + `## daily-report:upwork` sections — this skill reuses both subsystems.

---

# Workstream Review Submit

Reviews Upwork hourly work memos for a Workstream project's pending review-request(s), then submits the review report at https://workstream.nustechnology.com/requests.

**Trigger:** Workstream shows review requests at `/requests` — a project's reviewer must approve/reject charged hours based on whether the dev's Upwork memos justify the time. This is a DIFFERENT flow from the daily-report's per-project `needsReview` alert (Piece 4) — that one just *flags* pending review; this skill actually *does* the review and submits it.

**Usage:**
- `/me:workstream-review-submit` — scan `/requests`, process ALL pending requests
- `/me:workstream-review-submit <project>` — process one project only (e.g. `tokenize`)
- `/me:workstream-review-submit --dry-run` — evaluate + report, do NOT submit

---

## Step 1 — Auth

Reuse Workstream session per [[reference_workstream]]:
```bash
DISPLAY=:1 node scripts/workstream-login.js   # only if token expired
```

## Step 2 — Fetch pending requests

🔴 **`/requests` page structure not yet scripted** — first live run must open it visibly (`DISPLAY=:1`) to confirm: how a pending review request is listed/identified (request id, project, dev, date range, charged hours), and the submit action's request shape (approve/reject endpoint or form). Screenshot to `tmp/workstream-requests-*.png`. Once confirmed, add a `scripts/workstream-fetch-requests.js` (mirror `workstream-fetch-project-week.js`'s auth pattern) — do NOT hand-roll a one-off dated script (see no-dated-copy rule in [[reference_workstream]]).

Until that script exists: navigate to `https://workstream.nustechnology.com/requests` with the authenticated session and read the pending list directly.

## Step 3 — Cross-check against Upwork memos

For each pending request, identify the dev + date range it covers, then:
1. If the dev has an Upwork hourly workroom (see [[reference_upwork_workrooms]]), run:
   ```bash
   node scripts/upwork-memo-check.js --date=<date> --workroom=<name>
   ```
2. Classify per [[reference_upwork_memo_validation]] rubric — memo needs action verb + specific object + relation to contracted work. Single-word/feature-only memos are INVALID.
3. If the project has no Upwork hourly workroom (e.g. fixed-price or non-Upwork client), fall back to the Workstream task-log text itself (col C/D task description) as the basis for review — same rubric, applied to the task entry instead of the memo.

## Step 4 — Decide

| Memo/task-log quality | Action |
|---|---|
| All segments valid, hours match charged amount | **Approve** |
| Any invalid memo, OR charged hours don't match logged task time | **Reject / flag** — do NOT approve. Note the specific invalid memo(s) and reason. |
| Can't verify (Upwork session dead, memo API empty) | **Do NOT decide automatically** — report as unresolved, ask user before approving/rejecting blind. |

**Never auto-approve on missing evidence.** Missing/inaccessible memo data is a blocker, not a pass.

## Step 5 — Submit (skip if `--dry-run`)

Submit the decision via the `/requests` UI action found in Step 2. Confirm the request's status changed (re-fetch) before reporting success.

🔴 Follow the same send-gate discipline as daily-report Piece 9: submitting a review is an outbound/state-changing action on a shared system — if the decision is a **rejection** or anything not a clean approve, surface it to the user and get explicit confirmation before submitting, don't auto-reject either.

## Step 6 — Report

Write to `reports/{YYYY-MM-DD}/{HHMM}-workstream-review-submit.md`:
```
## Workstream Review Submit — {HH:MM} (+07:00)
| Project | Dev | Period | Charged | Memo check | Decision | Submitted |
|---------|-----|--------|---------|-----------|----------|-----------|
| Tokenize | ... | ... | Xh | N valid / M invalid | Approve/Reject/Unresolved | ✓/✗/dry-run |
{Details of any invalid memo or unresolved case.}
```

Update `config/.monitoring-timelines.json` (`workstream_review_submit.last_run`) at the end of every run.

---

## Unresolved questions
- Exact `/requests` page DOM/API shape — needs first live visible-browser run to confirm (Step 2).
- Whether Tokenize (this week's target project) has an Upwork hourly workroom or is fixed-price/task-log-only — check `config/.upwork-config.json` workrooms list; if absent, use Step 3's task-log fallback.
- Whether submit is a single button per request or a batch action — confirm before scripting.
