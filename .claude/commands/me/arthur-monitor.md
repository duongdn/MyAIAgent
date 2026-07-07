---
name: me:arthur-monitor
description: Arthur/Meta-Stamp V3 project monitor — reads 2 Matrix rooms + 3 Slack channels since last run, writes a Vietnamese-language living-tracker report. Use when user asks to check Arthur, Meta-Stamp, or the Solid Code / Crystal lang project.
---

# Arthur Monitor

Manual command — run whenever the user asks, no cron. Each run reads only messages **since the last run** (incremental), carries forward the tracker table from the previous report, and writes a **new** report file (never overwrites a previous one).

**Output:** `reports/{YYYY-MM-DD}/{HHMM}-arthur-monitor.md`
**Language:** Vietnamese, always — user cannot read English well and most raw client messages are in English. See `docs/memory/daily-report/matrix/feedback_arthur_metastamp_four_part_check.md` for full standing requirements/history.

## Sources (5 total)

| # | Source | ID | Notes |
|---|--------|-----|-------|
| 1 | Matrix — "Arthur - Meta-Stamp" | `!BEXEdVUmvWclPLELFf:nustechnology.com` | Business/demo discussion |
| 2 | Matrix — technical setup room (no display name) | `!QEbdvaMJkTurMpRPIX:nustechnology.com` | Repo/docker/credential sharing |
| 3 | Slack "Solid Code" — Arthur DM | `mpdm-art_k--jack--namtv-1` (`C0B0BG90AUB`) | Original relationship-building DM, mostly historical now |
| 4 | Slack "Solid Code" — `ms-v3` | `C0B4G8USU3D` | Main technical channel, highest volume |
| 5 | Slack "Solid Code" — `msv3-official` | `C0BEPFBLGJV` | Chris's channel |

**Slack auth:** `config/.slack-accounts.json`, workspace `Solid Code`, `auth_type: session` (xoxc+cookie) — use `conversations.history`, NOT `search.messages`. User IDs: Art K=`UM1UZ0ZST`, Jack=`UM28B3P9C`, Chris Coyne=`U0BEFAQ9D0T`, David Tran (shared identity, namtv/PhucVT/DuongDN all post as this)=`U0B1C5QAZA4`, Nick=`U0B474QBKP1` (= TienND, confirmed).

**Matrix auth:** `config/.matrix-config.json`, `homeserver` field (NOT the `chat_url` field — that's the web client, wrong base for API calls). Token is short-lived — refresh via `DISPLAY=:1 node scripts/matrix-login.js` immediately before fetching, in the same command block, not as a separate earlier step. Room IDs need `encodeURIComponent()` in the path.

**GitHub (PR/commit status):** `gh auth token -h github.com -u davidztv` — this account already has repo access to `Christebob/Meta_Stamp_V3` (private). Check both `pulls?state=all` AND `commits?since=...` — this repo currently has 0 open PRs, all work lands direct-to-`main` with no review, so PR list alone misses everything.

**Workstream (est/actual):** project "Crystal lang", `projectId=cmqezgh7z080hp81vo5yqd24z`, roster DuongDN (Tech Lead)/PhucVT (Developer)/TienND (Manager). ⚠️ **API bug:** `GET /review/week?projectId=...&date=...` returns `403 Forbidden` when `date` is the exact Monday/start-of-week (or the 2 days after) — use a date from the **back half of the target week** instead, or you'll wrongly conclude 0h logged.

## Step 1 — Determine window

Read `arthur_monitor.last_run` from `config/.monitoring-timelines.json`. If missing, default to 7 days back (never pull full history again — the one-time full deep-dive already happened 2026-07-07, see `reports/2026-07-07/arthur-metastamp-full-review.md`).

## Step 2 — Fetch new messages since last_run

For each of the 5 sources, fetch only messages after `last_run` (Matrix: `/messages?dir=b` paginated until timestamps fall before the window; Slack: `conversations.history` paginated via cursor, stop once `ts` < last_run).

## Step 3 — Load previous tracker

Find the most recent `reports/*/arthur-monitor.md` (or the original `arthur-metastamp-full-review.md` if this is the first incremental run) and extract its tracker table (section "BẢNG THEO DÕI").

## Step 4 — Update tracker in place

- Update `Trạng thái`/`Cập nhật gần nhất` for existing rows based on new messages found.
- Only mark ✅ if the user has explicitly confirmed in chat — otherwise 🟢 (done, awaiting confirmation) is the ceiling.
- Add new rows for genuinely new issues found in the new messages. Don't renumber existing rows.
- Every row keeps its `Link Slack` column — get permalinks via `chat.getPermalink` for any new evidence messages.

## Step 5 — Write output

New file: `reports/{today}/{HHMM}-arthur-monitor.md`. Structure:

```
# Arthur / Meta-Stamp V3 — Cập nhật {ngày} (từ {last_run} đến {now})

## Tóm tắt nhanh
{2-4 câu — có gì mới đáng chú ý kể từ lần check trước}

## Chi tiết mới (nếu có)
{Chỉ phần MỚI kể từ last_run — không lặp lại lịch sử cũ. Trích dẫn nguyên văn tin nhắn quan trọng, giải thích rõ không chung chung.}

## BẢNG THEO DÕI (cập nhật từ lần trước)
{full tracker table, carried forward + updated}

## Câu hỏi cần anh xác nhận/quyết định
{any new or still-open questions}
```

## Step 6 — Update timelines

Set `arthur_monitor.last_run` to current time and `output_file` to the new report path in `config/.monitoring-timelines.json`.

## Rules

- Never re-summarize the full project history — only what's new since `last_run`. Point back to the original full report for context if needed.
- If nothing new happened on a source, say so briefly ("Không có tin nhắn mới") — don't pad with old content.
- Never mark a tracker row ✅ without the user's explicit confirmation in this session.
- Follow `feedback_read_full_room_transcript_not_grep_snippets` — for any active thread, read the actual messages, don't grep a keyword and assume that's the whole story.
