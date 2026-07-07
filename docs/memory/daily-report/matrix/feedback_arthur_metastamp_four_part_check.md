---
name: feedback_arthur_metastamp_four_part_check
description: Arthur (Meta-Stamp/Crystal lang) is a new project — needs the same 4-part depth as Maddy (comms, tasks, est/actual, code/PR status) every check, not a surface skim
metadata:
  type: feedback
---

**Project basics:** Client alias "Arthur", internal project name "Crystal lang" in Workstream (`projectId: cmqezgh7z080hp81vo5yqd24z`, `customerAlias: Arthur`). Roster: DuongDN (Tech Lead), PhucVT (Developer), TienND (Manager). No JIRA/Trello ticket system exists — task tracking is Matrix + Workstream task notes only.

**4-part check, every time (same standard as [[feedback_maddy_four_part_check_mandatory]]):**

1. **Communication — TWO separate Matrix rooms, not one:**
   - "Arthur - Meta-Stamp" (business/demo discussion, client-facing scope questions, team coordination)
   - Unnamed room `!QEbdvaMJkTurMpRPIX:nustechnology.com` (**technical setup** — repo link, docker/env files, credential sharing). This room has no friendly display name in the Matrix scan output and is easy to miss entirely — it was missed completely on 2026-07-07's first pass. Always check for a second Arthur-related room by content, not just by display name.

2. **Task tracking:** no formal system — read the Workstream task-log `additionalInfo` notes (per dev, per day) via `GET /review/week?projectId=cmqezgh7z080hp81vo5yqd24z&date={date}` — these contain real substantive daily updates (e.g. PhucVT's Jul 6 note listed exactly what was tested/fixed and what's still being investigated). Don't rely on Matrix alone.

3. **Est/actual:** Workstream "Crystal lang" project, same `sheets-tasklog-scan.js` pattern as other devs. Watch for role-vs-activity mismatches — e.g. TienND is tagged "Manager" in the WS roster but was doing hands-on dev work (MCP config, S3 logic) in Matrix chat on 2026-07-07, yet logged 0h. Worth flagging, not silently accepting the role tag as an excuse for 0h.

4. **PR/code status:** ✅ **RESOLVED 2026-07-07.** repo is `github.com/Christebob/Meta_Stamp_V3` (private). Access account: **`gh auth login` as username `davidztv`** (the "David Freelancer" identity) — already authenticated in this environment's `gh` CLI (`gh auth token -h github.com -u davidztv`). Use `GH_TOKEN=$(gh auth token -h github.com -u davidztv) gh api repos/Christebob/Meta_Stamp_V3/...`.
   - Check both `pulls?state=all` (PR history/review status) AND `commits?since=...` (since this repo currently has **0 open PRs and all commits land directly on `main` with no review** — unlike Maddy's Bitbucket repo which has an automated Codex-review bot on every PR). A "no open PRs" result does NOT mean no activity — always check commits too.
   - As of 2026-07-07: 8 total PRs, all merged (last #8, Jun 30). Real authors seen in commits: `davidztv` (chore commits) and `jacobi-78` (likely Tien Nguyen — feature work: MCP logic, AIF file support, Audio POC).

**Why:** User, 2026-07-07: "Arthur là dự án mới, cần report chi tiết y chang Maddy, làm ngay" (Arthur is a new project, needs a report exactly as detailed as Maddy's, do it now). Same root-cause class as the Maddy Bitbucket gap — a real code repo exists but wasn't wired into any check. Now fixed via `gh auth login` device-code flow (user opened the browser as davidztv and approved).

**Real findings from the 2026-07-07 first deep check:** Real financial risk flag (client overtime-pay disputes, from team lead Nam Tran) was previously mis-filed as "internal discussion, no action needed" — see [[feedback_read_full_room_transcript_not_grep_snippets]]. A real unresolved client question (metadata/attribution meaning) turned out to already be in progress per PhucVT's Workstream note, just not yet reported back to the team lead/client. Once GitHub access worked: confirmed 7 commits since Jul 1, all direct-to-main, zero PR review process on this repo — worth flagging as a process gap for a production system.
