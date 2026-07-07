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

**User explicitly requires DETAILED explanations, not general summaries** ("tôi cần giải thích chi tiết msg, ko phải chung chung, để nắm rõ project" — 2026-07-07). Do not summarize this project as bullet-point status lines. Walk through the actual narrative — quote real client messages verbatim, name the actual people involved, explain the technical flow in plain terms. This applies beyond Arthur too, but was stated specifically here.

**Full project narrative (read the room's full history via `/messages?dir=b&limit=100` paginated with `from` cursor, not just the reporting window — this room only goes back to 2026-07-02, project kickoff):**
- **What it is:** "Creator Protection Platform" — audio/content owners upload tracks, system fingerprints them, AI agents access via a paywalled MCP endpoint (unauthenticated pull = HTTP 402, authenticated = billed via Stripe). Pay-per-access content licensing, not just a demo app.
- **Team:** PhucVT is a **junior dev who didn't know Python before this project** — deliberately onboarded slowly, Tien Nguyen (senior) mentoring him directly.
- ⚠️ **Security note:** full plaintext `.env` files (MongoDB URI, Redis URL, S3 keys, Auth0 client secret, Stripe test keys, YouTube API key, Stripe webhook secret) were pasted directly into this Matrix room on 2026-07-03. Even as dev/test keys, worth a word to the team about not pasting secrets into chat.
- **Client-side has 3 people, not 1:** Arthur (main technical contact), Chris (relays requirements, seems to be Arthur's own manager/PM), and an unnamed "SVP" whose requirements get relayed secondhand — this caused real friction on 2026-07-07 (see below).
- **Scope has expanded 3x with no visible re-estimation**, per Tien's own words 2026-07-07: original task was "get payment/charging working" → then "audio pocket" got added → now "metadata vs mấy thứ khác" (metadata + other things) got added same day. Watch for a 4th expansion.
- **2026-07-07 specific incident:** Arthur pushed back on his own stakeholder (the SVP) for springing "retention and training tiers" late — our team correctly confirmed this was never discussed with us. Separately, client DID request something genuinely new that day ("new MCP UI with metadata"). Both are worth tracking as separate scope-creep threads.
- **Reporting rooms:** daily reports (Phúc, reviewed by Tien first) → room `ms-v3`; weekly reports → Chris → room `ms-v3-official`. **`ms-v3-official`'s room ID is not yet resolved/tracked** — find and add it to [[reference_matrix_rooms]] next time.
- A "dry run" (pre-demo rehearsal with the actual client) happens periodically — team's policy is to skip attending if it conflicts with their night, as long as code is pushed + a one-line Slack summary is sent beforehand.
