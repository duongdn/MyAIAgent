---
name: feedback-aysar-consolidated
description: "Aysar/Baamboozle daily report: gate=Slack MPDM C07SQ4HAUHZ (not Matrix). NO fixed posting time — never assume 'not due yet', always re-search broad regardless of hour. Also check 2 GitHub repos for issues."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9ba04ead-670b-45ea-b6a0-575e6d6d55b2
---

**Report gate (CORRECTED 2026-05-25, reconfirmed 2026-06-22):** Aysar daily report check = **Baamboozle Slack MPDM `C07SQ4HAUHZ`** (`#mpdm-heyitsronanc--carrick--skjamie25-1`, Carrick+Ronan+Jamie). Carrick posts on behalf of KhanhHH (KhanhHH is NOT a Baamboozle Slack member). Message title varies — seen both "Today's update:" and "Yesterday's update:" (the latter posted the following morning, recapping the prior workday). Don't filter by exact title text.

**NEVER check Matrix room `!gjtiuNjeqDarGWkSnf:nustechnology.com` for the report itself** — that room (DuongDN/LeNH/KhanhHH) is ONLY for sending reminders if Slack has no update. Checking Matrix for the report caused a false "silent since May 21" alert + unnecessary reminder while Carrick had already posted on Slack.

**🔴 TIMING — NO FIXED SCHEDULE, corrected 3 times now (2026-05-25, 2026-06-24, 2026-07-03):** Carrick does NOT post on a fixed evening-only schedule. Confirmed timestamps span both evening (Mon17:09, Wed17:45, Thu17:14, Fri17:08) AND morning (Wed 2026-06-24 08:48 "Monday's update"; **Fri 2026-07-03 09:02 "Yesterday's update" covering 07-02's work**). The report can legitimately land the afternoon of the work-day OR the morning after — this is normal, not late.

**2026-07-03 incident:** Report was checked at ~09:30, found only an 08:59 post from the PREVIOUS morning (covering 07-01), and was wrongly concluded as "evening post not due until ~17:00" — left Aysar incomplete for 40+ minutes on that wrong assumption, despite this exact mistake being called out twice before in this file. Re-checking the same channel at 09:33 found a SECOND message posted at 09:02 (3 minutes after the first check!) — "Yesterday's update" covering 07-02's actual work (e2e testing, Change Team Ownership fix, Laravel 12 upgrade — all Dev done/Deployed or Inprogress). **Root cause: the compact MEMORY.md index one-liner summarized this file as "posts ~17:00-17:45+07", losing the nuance — future compaction passes on the index MUST NOT re-introduce a fixed-time claim for this entry.**

**Rule, stated plainly:** Do NOT assume "not posted by 09:00" = "won't post until 17:00" and do NOT report "not due yet" as a reason to leave Aysar incomplete. Instead: re-run the broad MPDM search (whole window, no title filter) at whatever time you're checking — if the update for the relevant workday is there, it's there regardless of what hour it shows up. Only if genuinely zero messages exist anywhere in the full window (checked broad) should you treat it as pending/absent, and even then don't hardcode a "wait until 17:00" retry time — just recheck periodically or when asked.
- A posted update may be labeled for an EARLIER day than the most recent workday (e.g. "Monday's update" posted Wednesday) if there was no Aysar-specific work on the days in between — cross-check against KhanhHH's Workstream/sheet hours for those skipped days; if she worked a different project (e.g. Generator) that day, the lack of an Aysar update for that specific day is expected, not missing.

**🔴 REPEAT VIOLATION 2026-07-08:** Flagged Aysar as an alert ("no daily update posted for 07-07") without cross-checking KhanhHH's hours first — this exact cross-check rule (line above) already existed and was skipped. User caught it: "Aysar có làm hôm qua đâu ????" (did Aysar even work yesterday?). Live Workstream check: KhanhHH's 07-07 = Radio Data Center 6h + Generator 2h = 8h, **zero on Baamboozle**. No work → no update expected → not a miss. Also exposed a 2nd bug: the daily-report Sheets piece had reported KhanhHH's day as only 2h (sheets-only, missed the 6h Workstream-only Radio Data Center entry) — **always check Workstream, not just the Google Sheet, for KhanhHH's daily total, every single run, before concluding a shortfall.** Trello item was wrongly left incomplete; corrected same session.

**Missing formatted message ≠ no work (corrected same day, 10:10, 2026-06-22):** Carrick sometimes skips the formatted update message but is still actively working (deploy+PR review, live bug response, fix) — discovered only via a broad `search.messages`/`conversations.history` pull with no format filter across the whole channel. **The gate is "did Carrick do/communicate Aysar work that day", not "did the exact ritual message post."** Before flagging absent, always run the broad unscoped search first; only alert if there's truly no activity anywhere.

**Also check GitHub issues** every Aysar run: open issues on `baamboozle/baamboozle-web-app` and `baamboozle/bbzl-web-client`, using `nuscarrick` GitHub account:
```bash
GH_TOKEN=$(gh auth token -h github.com -u nuscarrick) gh api 'repos/baamboozle/baamboozle-web-app/issues?state=open&per_page=100&sort=updated&direction=desc'
GH_TOKEN=$(gh auth token -h github.com -u nuscarrick) gh api 'repos/baamboozle/bbzl-web-client/issues?state=open&per_page=100&sort=updated&direction=desc'
```
Filter `pull_request == null` (endpoint includes PRs by default, `bbzl-web-client` currently has 0 non-PR open issues). Summarize new/updated issues since window start; block Trello completion if any HIGH-severity Aysar-blocking issue is open.
