---
name: feedback-aysar-consolidated
description: "Aysar/Baamboozle daily report: gate=Slack MPDM C07SQ4HAUHZ (not Matrix), posts ~17:00-17:45+07, also check 2 GitHub repos for issues"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9ba04ead-670b-45ea-b6a0-575e6d6d55b2
---

**Report gate (CORRECTED 2026-05-25, reconfirmed 2026-06-22):** Aysar daily report check = **Baamboozle Slack MPDM `C07SQ4HAUHZ`** (`#mpdm-heyitsronanc--carrick--skjamie25-1`, Carrick+Ronan+Jamie). Carrick posts "Today's update" on behalf of KhanhHH (KhanhHH is NOT a Baamboozle Slack member).

**NEVER check Matrix room `!gjtiuNjeqDarGWkSnf:nustechnology.com` for the report itself** — that room (DuongDN/LeNH/KhanhHH) is ONLY for sending reminders if Slack has no update. Checking Matrix for the report caused a false "silent since May 21" alert + unnecessary reminder while Carrick had already posted on Slack.

**Timing (CORRECTED AGAIN 2026-06-24 — "only ~17:00-17:45" was also wrong):** Carrick does NOT post on a fixed evening-only schedule. Confirmed timestamps now include both evening (Mon17:09, Wed17:45, Thu17:14, Fri17:08) AND morning catch-up posts (Wed 2026-06-24 08:48, labeled "Monday's update" — reporting the most recent day with actual Aysar work, posted 2 days later). **The report can legitimately land the afternoon of the work-day OR the morning after** — this is normal, not late. Do NOT assume "not posted by 09:00" = "won't post until 17:00" — re-run the broad MPDM search at recheck time regardless of hour; a morning post may already satisfy the check.
- Also: a posted update may be labeled for an EARLIER day than the most recent workday (e.g. "Monday's update" posted Wednesday) if there was no Aysar-specific work on the days in between — cross-check against KhanhHH's Workstream/sheet hours for those skipped days; if she worked a different project (e.g. Generator) that day, the lack of an Aysar update for that specific day is expected, not missing.
- If genuinely zero messages anywhere (checked broad, no day-labeled update at all) AND no alternate-project explanation → still wait until ~17:00+07 same logic as before, then recheck via `/me:daily-report recheck aysar`. Same category as Fountain's Monday-plan timing ([[feedback_fountain_monday_plan_timing]]).

**Missing formatted message ≠ no work (corrected same day, 10:10):** On 2026-06-22 Carrick skipped the formatted "Today's update:" message but was still actively working (deploy+PR review 09:59, live bug response 17:15, fix 21:15) — discovered only via a broad `search.messages` pull with no format filter across the whole Baamboozle workspace. **The gate is "did Carrick do/communicate Aysar work that day", not "did the exact ritual message post."** Before flagging absent, always run the broad unscoped search first; only alert if there's truly no activity anywhere.

**Also check GitHub issues** every Aysar run: open issues on `baamboozle/baamboozle-web-app` and `baamboozle/bbzl-web-client`, using `nuscarrick` GitHub account:
```bash
GH_TOKEN=$(gh auth token -h github.com -u nuscarrick) gh api 'repos/baamboozle/baamboozle-web-app/issues?state=open&per_page=100&sort=updated&direction=desc'
GH_TOKEN=$(gh auth token -h github.com -u nuscarrick) gh api 'repos/baamboozle/bbzl-web-client/issues?state=open&per_page=100&sort=updated&direction=desc'
```
Filter `pull_request == null` (endpoint includes PRs by default). Summarize new/updated issues since window start; block Trello completion if any HIGH-severity Aysar-blocking issue is open.
