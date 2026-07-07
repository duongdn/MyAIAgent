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

3. **Est/actual:** Workstream "Crystal lang" project, same `sheets-tasklog-scan.js` pattern as other devs. ✅ **CONFIRMED 2026-07-07 (user directly)**: TienND = "Nick" on Slack, is the primary hands-on engineer (MCP, Stripe, S3, fingerprinting), reporting 40-48h/week directly to Arthur with detailed daily breakdowns. **His hours ARE fully logged in Workstream** — an initial "0h" finding was a FALSE ALARM caused by a `/review/week` API bug (querying with the week's start date returns 403; querying with a mid/late-week date in the same week returns full correct data). See [[feedback_check_workstream_before_flagging_shortfall]] 7th recurrence. User caught this with a Workstream UI screenshot showing TienND's real 48h for week Jun29-Jul5 (`cmqezgh7z080hp81vo5yqd24z`, weekStart=2026-06-29) — always query `/review/week` with a date from the back half of the target week, never the first 1-3 days.

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
- **Reporting rooms:** daily reports (Phúc, reviewed by Tien first) → room `ms-v3`; weekly reports → Chris → room `ms-v3-official`. ✅ **RESOLVED 2026-07-07** — these are Slack channels, not Matrix rooms, in the "Solid Code" workspace (see below).
- A "dry run" (pre-demo rehearsal with the actual client) happens periodically — team's policy is to skip attending if it conflicts with their night, as long as code is pushed + a one-line Slack summary is sent beforehand.

## 5th data source found 2026-07-07: Slack workspace `solid-code-team.slack.com`

Config already existed as "Solid Code" in `config/.slack-accounts.json` (added 2026-07-06, previously unwired — see [[feedback_solid_code_new_workspace_unwired]]). Session token logged in as `namtv` (real name "David Tran" in this workspace). `auth_type: session` (xoxc+cookie) — use `conversations.history`, NOT `search.messages` (same as OhCleo pattern).

This is a **shared multi-project workspace** (Nam Tran's own consultancy) — most channels/members belong to an unrelated older project ("X3"). Only 3 channels matter for Arthur:
- `mpdm-art_k--jack--namtv-1` (`C0B0BG90AUB`) — the ORIGINAL relationship-building DM with Arthur+Jack, going back to **2026-04-29** (predates the Jul 2 Matrix room by over a month). This is where the whole arrangement was negotiated.
- `ms-v3` (`C0B4G8USU3D`) — daily reports + almost all real technical back-and-forth. **842 messages since 2026-05-19**, heavily concentrated in the last 2 weeks (122 msgs on Jul 6 alone). This is the "quá nhiều msg" volume the user complained about.
- `msv3-official` (`C0BEPFBLGJV`) — Chris's channel, only 4 messages (mostly joins), David Tran gave his GitHub username `davidztv` + email `davidztv19@gmail.com` here.

User IDs worth knowing: Art K=`UM1UZ0ZST`, Jack=`UM28B3P9C`, Chris Coyne=`U0BEFAQ9D0T`, David Tran (shared identity)=`U0B1C5QAZA4`, **Nick=`U0B474QBKP1` = TienND (Tien Nguyen) — confirmed by user 2026-07-07, not a separate untracked person.**

**Fetch pattern:** `conversations.history?channel={id}&limit=200` paginated via `cursor`/`has_more`. Resolve names via `users.list`.

## MAJOR finding 2026-07-07 — read the FULL Slack history, not just Matrix

Reading only the 2 Matrix rooms (project kickoff Jul 2 onward) gives an incomplete and even misleading picture. The Slack `ms-v3` channel revealed:

1. ~~"Nick" = TienND, 0h logged in Workstream = payroll gap~~ — **FALSE ALARM, corrected same day.** "Nick" = TienND confirmed, and he IS doing 40-48h/week of real engineering — but the "0h logged" claim was wrong, caused by an API query bug (see item 3 above / [[feedback_check_workstream_before_flagging_shortfall]]). User provided a Workstream screenshot proving his hours are fully logged. No action needed on this one.
2. **🔴 Arthur explicitly asked the team to mask their true location** (Vietnam) using a Mexico proxy or his own mini-PC's IP, so the end client believes Arthur (based in Mexico) is doing the work directly: *"Make sure you don't access anything that belongs to the client without using a Mexican proxy... I'm currently located in 'San Gaspar', near 'Valle de Bravo', in the State of Mexico."* This is a real business/legal/reputational risk if discovered by the end client — flag to user, not something to silently normalize.
3. Plaintext secrets pasted in chat (already noted above) — confirmed again in Slack, not just Matrix.
4. **Scope grew via a formal, budget-aware negotiation** — not just ad-hoc creep. Jun 9: client added 40h of new scope; Jun 26: Arthur explicitly said *"due to the budget, we don't want to go with a 3 week, 120 hour option"* — there's a real, ongoing budget ceiling being managed on the client side.
5. **A real quality-trust incident already happened once** (Jun 16): Arthur asked bluntly *"Or is it buggy as hell, or you barely tested anything?"* — this is not the first friction point, it's at least the second (after the overtime-pay concern).
6. **Escalating demo stakes**: Monday = Arthur+Chris only, **Wednesday = "an executive"**, **Thursday = the CEO** of the end client (a name "Dave Pelman" appears once, likely the actual decision-maker). Chris sent a detailed 7-item bug list + exact acceptance-test wording from the real client on 2026-07-06 23:17 — this is the highest-signal single message in the whole history, contains the literal acceptance criteria and demo UI spec.

**Full write-up saved to** `reports/2026-07-07/arthur-metastamp-full-review.md` (in Vietnamese, per user's explicit request — see below).

## Standing feature request from user (2026-07-07)

User: *"1 issue lớn là Arthur đang có cực kì nhiều msg trên Slack và matrix, tôi ko theo kịp, yêu cầu 1 tính năng để support tôi: (1) đọc tất cả msg, summary lại bằng tiếng Việt, ko đọc tiếng Anh nổi (2) tìm ra các issue cần giải quyết, sum lại ở cuối, cái nào fix được thì cho tôi cách giải quyết."*

**This is now a standing, repeatable requirement for Arthur checks specifically:**
1. Read ALL 5 sources every time: 2 Matrix rooms + 3 Slack channels (`mpdm-art_k--jack--namtv-1`, `ms-v3`, `msv3-official`).
2. Write the output **in Vietnamese** — user cannot read English well, and most raw client messages are in English.
3. End with an explicit issue list/table: severity, whether it's fixable, and a concrete suggested fix for the ones that are.
4. Save the full write-up to `reports/{date}/arthur-metastamp-full-review.md` and give a short spoken summary + the issue table in chat (don't make the user open the file to get the important part).

**🔴 Window correction, same day:** The first deep-dive read the ENTIRE history back to 2026-04-29 (project relationship origin). User's reaction: *"xa quá, chỉ cần report từ t5 tuần trước, nhưng cứ giữ cái report trên nha, tôi đọc nắm hết tình hình"* (too far back, only need since last Thursday — but keep the report above, I'll read it to get up to speed). **The full-history pull was correct for the ONE-TIME onboarding/context-building pass** (and the user kept that report) — but for RECURRING/regular checks going forward, default the window to roughly the last 7 days (since last Thursday), not full project history. Only go back further again if explicitly asked or if something recent references an older unresolved thread.

**🔴 Living-tracker requirement, same day:** After the deep-dive answer, user pushed further: *"vấn đề là cần collect các ý này, nó phải nằm trong question cần resolve, để monitor, resolve rồi cũng phải ghi vô để tôi confirm, vụ họp thì sao?"* (these points need to be collected into a tracked "questions to resolve" list for monitoring; once resolved, write it down so I can confirm; and what about the meeting?). **A one-time issue list in prose/chat is NOT enough — section 5 of the report must be a persistent tracking TABLE with an explicit status column**, not a paragraph dump:

- Columns: `#`, Issue, Severity, **Status** (🔴 Open / 🟡 In progress / 🟢 Done-awaiting-user-confirmation / ✅ User-confirmed), Last-updated timestamp, Next action.
- On every subsequent Arthur check: **update rows in place** (status + last-updated), don't rewrite the whole table from scratch. Only add new rows for genuinely new issues.
- When something moves from in-progress to apparently-done, mark it 🟢 (not ✅) — ✅ is reserved for when the USER explicitly confirms it, not when the agent decides it looks resolved from chat evidence alone.
- **Any scheduled meeting/call the client mentions (e.g. the "dry run") is itself a tracked row** — status is whether it happened yet (checked by looking for a post-meeting message), not just the fact it was scheduled. Convert timezone explicitly (e.g. "10am PT" → concrete Vietnam local time) so the user doesn't have to do that math themselves.
- Split multi-part items (e.g. Chris's 7-bug list) into individual sub-rows (4a, 4b, 4c...) so each bug's status can move independently — don't track "7 bugs" as one blob when some are fixed and others aren't.
- **Column requirement, same day:** user, after seeing Slack permalinks in a separate standalone section: *"Nhập 4b vô 5 đi, tự nhiên slack phải có chỗ riêng"* (merge that section into the tracker, Slack naturally needs its own column). **Add a "Link Slack" column directly to the tracker table** (one column per row, not a separate links section) — each row gets its own permalink(s) via `chat.getPermalink`, Matrix-only or GitHub-only rows just note that in the column (e.g. "(Matrix, xem báo cáo gốc)"). Never split evidence links into their own section again — they belong on the same row as the issue they support.
