---
name: feedback_arthur_metastamp_four_part_check
description: "Arthur (Meta-Stamp/Crystal lang) project history/incidents — the actual 4-part-check RULE now lives in .claude/commands/me/daily-report.md Piece 13 (moved there 2026-07-13, was previously only in this memory file). This file keeps only the historical narrative/incidents that aren't standing operational rules."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c2b12c7f-2dc0-4a10-bf71-022a35183ef7
---

🔴 **The operational rule (4-part depth, 5 sources, auth details, flow, report format) is in `.claude/commands/me/daily-report.md` Piece 13 — read that, not this file, for how to run the check.** This file is history/incidents only, kept for context on WHY things are the way they are.

**Why the 4-part-depth rule exists:** User, 2026-07-07: "Arthur là dự án mới, cần report chi tiết y chang Maddy, làm ngay" (Arthur is a new project, needs a report exactly as detailed as Maddy's, do it now). Same root-cause class as an earlier Maddy gap — a real code repo existed but wasn't wired into any check.

## Real findings from the 2026-07-07 first deep check

- A real financial-risk flag (client overtime-pay disputes, from team lead Nam Tran) was previously mis-filed as "internal discussion, no action needed" — see [[feedback_read_full_room_transcript_not_grep_snippets]].
- A real unresolved client question (metadata/attribution meaning) turned out to already be in progress per PhucVT's Workstream note, just not yet reported back to the team lead/client.
- Confirmed 7 commits since Jul 1, all direct-to-main, zero PR review process on this repo — a process gap worth flagging for a production system.

**User explicitly requires DETAILED explanations, not general summaries** ("tôi cần giải thích chi tiết msg, ko phải chung chung, để nắm rõ project" — 2026-07-07). Quote real client messages verbatim, name the actual people involved, explain the technical flow in plain terms — walking-narrative style, not bullet-point status lines. This applies beyond Arthur too, but was stated specifically here.

## Project narrative (context, not a rule)

- **What it is:** "Creator Protection Platform" — audio/content owners upload tracks, system fingerprints them, AI agents access via a paywalled MCP endpoint (unauthenticated pull = HTTP 402, authenticated = billed via Stripe). Pay-per-access content licensing, not just a demo app.
- **Team:** PhucVT is a junior dev who didn't know Python before this project — deliberately onboarded slowly, Tien Nguyen (senior) mentoring him directly.
- ⚠️ **Security incident (2026-07-03):** full plaintext `.env` secrets (MongoDB URI, Redis URL, S3 keys, Auth0 client secret, Stripe test keys, YouTube API key, Stripe webhook secret) were pasted directly into the Matrix room. Even as dev/test keys, worth reminding the team not to paste secrets into chat.
- **Client-side has 3 people, not 1:** Arthur (main technical contact), Chris (relays requirements, seems to be Arthur's own manager/PM), and an unnamed "SVP" whose requirements get relayed secondhand — caused real friction on 2026-07-07.
- **Scope expanded 3x with no visible re-estimation** as of 2026-07-07 (payment/charging → audio pocket → metadata) — watch for further expansion.
- 🔴 **2026-07-07 — Arthur asked the team to mask their true location** (Vietnam) using a Mexico proxy or his own mini-PC's IP, so the end client believes Arthur (based in Mexico) is doing the work directly. Real business/legal/reputational risk if discovered by the end client — flag to user, do not silently normalize.
- **Budget-aware scope negotiation, not just ad-hoc creep:** Jun 9 client added 40h; Jun 26 Arthur explicitly declined a "3 week, 120 hour" option due to budget — a real ceiling is being actively managed client-side.
- **A quality-trust incident already happened once** (Jun 16): Arthur asked bluntly "Or is it buggy as hell, or you barely tested anything?" — the 2026-07-07 overtime-pay concern was at least the second friction point, not the first.
- **Escalating demo stakes** (as of 2026-07-07): Monday = Arthur+Chris only, Wednesday = "an executive", Thursday = the CEO of the end client ("Dave Pelman", likely the actual decision-maker). Chris's 2026-07-06 23:17 message (7-item bug list + exact acceptance-test wording) is the highest-signal single message in the whole history — contains literal acceptance criteria and demo UI spec.

**One-time full-history write-up saved to** `reports/2026-07-07/arthur-metastamp-full-review.md` (Vietnamese, project origin 2026-04-29 through 2026-07-07). Do not re-read that far back again — incremental only from here, per the command's Piece 13.

## 🔴 CRITICAL bug found 2026-07-07 — `last_run` must equal the actual data-read cutoff, not build/run-completion time

When first building Piece 13, `arthur_monitor.last_run` was set to the time the incremental-check FEATURE finished being built (`14:29`) instead of the time through which the original full-history report had actually verified data (`~10:27`). This silently created an unmonitored ~4h gap that contained the single most important update in the whole engagement (all 7 client bugs + attribution fix, confirmed deployed by Nick at 15:06). Discovered by accident when the user asked about "bug #7."

**General rule, applies to ANY incremental/timeline-based monitoring piece, not just Arthur:** `last_run` must be the timestamp through which data was actually read and verified (normally the last message/event actually included in the report) — never the wall-clock time the command/session happened to finish. If a report's data cutoff and the command's finish time differ, always use the data cutoff.

Fix applied: `arthur_monitor.last_run` corrected to the true report cutoff, with the same warning added to the `description` field in `config/.monitoring-timelines.json` itself so it survives even if this memory file isn't read.
