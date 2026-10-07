---
description: Elena Optimization (OP) project monitor — review open PRs to nus-base, Matrix project room activity/action items, test env health, Jira OP status
---

# Elena Optimization Monitor

The Elena project restarted in 2026-10 as **Optimization (OP)** for the customer Precognize. DuongDN is **responsible for code review and for making sure cross-review happens** (anhttl, Matrix, 2026-10). This skill covers that role. It is separate from `/daily-report elena`, which handles the legacy Digital Plant deploy flow.

Report: `reports/{YYYY-MM-DD}/{HHMM}-elena-monitor.md` (see `/util:report`).
Before starting, run `/util:read-memory elena`. Memory lives in `docs/memory/elena/`.

## Quick Reference

| Command | What it does |
|---------|--------------|
| `/me:elena-monitor` | Full run: prs + matrix + env (+ jira once configured) |
| `/me:elena-monitor prs` | Review open PRs only |
| `/me:elena-monitor pr <N>` | Deep review of one PR (code + spec) |
| `/me:elena-monitor spec [N]` | OpenSpec review only (all open PRs or PR N) |
| `/me:elena-monitor matrix` | Room activity, blockers, action items |
| `/me:elena-monitor env` | Test env health |
| `--post` | Post the review drafts to GitHub (default: draft in the report only) |

## Project Facts

| Item | Value |
|------|-------|
| Matrix room | `!KGfMOdTMWQwLObwAEk:nustechnology.com` ("Elena - Optimization") |
| Legacy room | `!kyArBadvcbfPIpIxpD` (Digital Plant deploys, not this skill) |
| Repo | `nustechnology/Elena-SamGuard-Digital-Plant` (`duongdn` gh account) |
| Base branch | `nus-base` (merge `develop` into it regularly) |
| PR branches | `feature/OP-<n>-<slug>` → Jira key `OP-<n>` |
| Local code | `/home/nus/projects/Elena/develop` (remote name `nus`; includes `openspec/`) |
| Jira | `https://precognize.atlassian.net/jira/software/projects/OP/boards/317` |
| Test env | `https://active-alerts.nusdev.net/optimizations` |
| Catch-up | Mon/Wed/Fri 09:15 |
| Hour log tags | `OPTIMIZATION` + `OP - M<milestone>` |

**Team (by Matrix handle):** anhttl (PM), vytth (BA, talks to the customer), kietnht (BE lead, deploys), tuanntg (BE, license), samht + trinm (FE), tiennd2 (BE, tag search/influx), duyvna + handn (QC). PR authors on GitHub are `nusteam` (shared account, so read the branch and commits to identify the dev), `briannus`, and `nusken`.

## Piece 1 — PR Review

```bash
export GH_TOKEN=$(gh auth token -h github.com -u duongdn)
R=nustechnology/Elena-SamGuard-Digital-Plant
gh api "repos/$R/pulls?state=open&base=nus-base&per_page=50" \
  --jq '.[]|{n:.number,user:.user.login,head:.head.ref,sha:.head.sha,updated:.updated_at,title}'
```

State file: `config/.elena-op-state.json` → `{"reviewed": {"<pr>": "<head_sha first 8 chars>"}, "last_run": "<iso>"}` (compare by prefix). Skip a PR whose head SHA is unchanged since the last review, and list it as "no new commits".

For each new or updated PR:
1. Fetch the diff (`gh pr diff N -R $R`), commits, reviews, and comments (CodeRabbit included), plus mergeable state.
2. Review it against the code in `/home/nus/projects/Elena/develop`. Run `git -C … fetch nus` first. Read the files the diff touches for context, and the matching `openspec/` spec if one exists. Check:
   - correctness and edge cases, Java/Spring BE + Angular FE conventions already used in the repo
   - **secrets and hardcoded env values** (e.g. `PRECOGNIZE_INFLUX_TOKEN`, license keys, installation IDs) → 🔴
   - scope matches the Jira ticket in the branch name; no unrelated files, debug code, or commented-out code
   - merge conflicts with `nus-base`, and whether the author has merged `develop` in
   - tests added or updated where logic changed
3. **Cross-review gate:** has someone other than the author approved or commented? If not, flag who should review (BE↔BE, FE↔FE).
4. Verdict per PR: ✅ approve / 💬 comments / ❌ request changes, with `file:line` findings.
5. Without `--post`, write the review drafts to the report only. With `--post`, post via `gh pr review N -R $R --comment|--approve|--request-changes -b …`. **Never merge.** Merging is up to the team.
6. Update the state file with the reviewed SHA.

Also flag: open PRs with no activity for >2 working days, and PRs closed without merging.

## Piece 1b — OpenSpec Review (every PR, same verdict)

The project is spec-driven (OpenSpec, `schema: spec-driven`). **Review the spec, not just the code.** A wrong spec gets implemented faithfully and still ends up wrong.

**3 non-overlapping roots** (from `openspec/config.yaml`):
| Root | Owns |
|------|------|
| `openspec/` | Backend only (application/, services/, libraries/, tools/…). **The ONLY place where API contracts are specified** |
| `precognize-workspace/openspec/` | Portal, admin-ui, shared, frontend-libs |
| `process-digital-plant/openspec/` | DP app |

Rules to check against: `rules:` in each root's `config.yaml` (read the root's own config, since the frontend roots may have different rules). Context docs: `docs/ai/{PROJECT,ARCHITECTURE,CONVENTIONS,TESTING}.md`.

**Steps:**
1. List the spec files in the PR (`gh api repos/$R/pulls/N/files --paginate --jq '.[].filename' | grep openspec/`). If code changes but no spec changes → ⚠️ "code without spec" (unless trivial or bugfix).
2. Validate: check out the PR head in a worktree (`git -C /home/nus/projects/Elena/develop worktree add /tmp/elena-pr-N nus/<head>`), then run `npx --yes @fission-ai/openspec@1.13.2 validate --all --strict --no-interactive` in every touched root. A failure → ❌. (The pre-commit hook does this, but it's opt-in and devs can `--no-verify`.)
3. **Structure:**
   - proposal has Scope, Non-goals, open questions; design has a "Current implementation" section with file paths; tasks are ordered (libs → services → gateway) and end with verification + manual QA
   - every requirement uses SHALL/MUST and has ≥1 `#### Scenario:` with WHEN/THEN
   - capability path is `specs/<capability>/spec.md`; flag nested paths like `specs/license/<sub>/spec.md`
4. **Root boundaries:**
   - a frontend spec must not restate a REST/RSocket contract; it should reference the backend capability id
   - a change in one root must not edit another root's paths
   - a cross-root feature uses the same change name in each root plus a "Related changes" section
   - a FE change whose BE counterpart doesn't exist yet → ⚠️
5. **Content:**
   - specs describe behaviour, not implementation (no class or component names in spec.md)
   - error and edge scenarios are covered: `success=false` + errorId, 405 on session, empty data, downstream unavailable
   - invented contracts, routes, queues, or schema not marked UNKNOWN; new library or pattern without a Decisions entry
   - backward-compat note for shared DTOs and gateway; config/env changes listed
   - matches the Jira OP ticket and the BA answers in the Matrix room (vytth relays customer answers; e.g. "unit ignored in calculations" must appear in the spec if the change touches it)
6. **Code ↔ spec:** is every spec scenario implemented, or every task checked? Is there code behaviour that no spec covers? A task marked `[x]` with no matching code → ❌.
7. **Lifecycle:**
   - archived changes (`changes/archive/<date>-…`) must have synced deltas into `specs/`, and no change may be archived before its code is merged
   - flag duplicate or overlapping capabilities across PRs (e.g. two PRs both editing `optimization-shared-ui-playground`) as a merge-conflict risk
8. **Delivery hygiene:** openspec, `docs/ai`, and `.claude` paths are nus-only and are stripped by `openspec/scripts/deliver-to-origin.sh`. Flag code that **imports or depends on** those paths, and any PR that targets the Precognize origin directly with openspec files in it.

In the report, give each PR a `Spec:` line (✅/💬/❌ + findings), next to the code verdict. The PR's overall verdict is the worse of the two.

## Piece 2 — Matrix Room

```bash
node scripts/fetch-matrix-daily.js --room '!KGfMOdTMWQwLObwAEk:nustechnology.com' --since <last_run ISO>
```
Read the **full transcript file** it writes, not only the action-item snippets (see [[read_full_room_transcript_not_grep_snippets]]). Report:
- what each dev reported as done or in progress today, and what they committed to (targets from vytth/anhttl)
- blockers and open questions waiting on the customer (unanswered spec questions, Figma access, and so on)
- items addressed to DuongDN (review requests, "anh Dương …"). Skip any that duongdn already answered in the thread.
- deploy promises vs reality ("deploy lên test" said, but nothing deployed); QC asking for Jira status updates
- milestone/timeline changes (M1 = Licensing + Step 1)

Do not send messages to the room unless the user confirms ([[never_send_messages_without_permission]]).

## Piece 3 — Test Env

```bash
curl -sL -o /dev/null -w "%{http_code} %{time_total}s\n" https://active-alerts.nusdev.net/optimizations
```
A non-2xx response after redirects, or a timeout, is ⚠️. Cross-check against the room: someone may have said "server có issues".

## Piece 4 — Jira OP (pending credentials)

Not wired yet. There is no Jira config in `config/`. Once the user provides it, store it in `config/.jira-precognize.json` and list OP issues by status, moved in the last 24h. Flag: PR merged but ticket not in a deployed/test status, and tickets in progress with no PR.

## Report Format

🔴 **The reader is a general reviewer, not a specialist in this code** (user feedback 2026-10-07: "a few lines like that aren't enough for me to understand"). Write the report **in Vietnamese** and explain it in detail. Put everything in the report file. Chat only gives the path plus a 2–3 line summary. Leave out side items (process questions, unrelated suggestions).

For **each PR**, write:
1. **What the PR does:** 3–5 lines of plain business explanation (what the feature is for, which module, who uses it). No jargon unless explained.
2. **Conclusion:** ✅ / 💬 / ❌ plus one sentence on why.
3. **Each issue** as its own block:
   - **Problem:** what it is, at `file:line`, with a short code excerpt if needed
   - **Why it matters:** a concrete scenario (who does what → what goes wrong → consequence for the customer or the business)
   - **How to fix:** a specific suggestion
   - **Severity:** 🔴 must fix before merge / ⚠️ should fix / 💬 minor
4. **Spec (OpenSpec):** in the same format, plus a line saying whether the spec matches the code.
5. **Good points:** brief, so the reader knows what was checked and is OK.

Order PRs by severity. At the top, a summary table and "what DuongDN needs to do now" (at most 3 items).

Always include links (PR URLs, room permalink). At the end, update `config/.elena-op-state.json` `last_run` and read it back to verify.
