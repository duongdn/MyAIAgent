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

**Timing (CORRECTED 2026-06-22 — old "~10:00-10:30" guess was wrong, never verified):** Carrick posts end-of-workday, **~17:00-17:45+07** (confirmed via real timestamps: Mon17:09, Wed17:45, Thu17:14, Fri17:08). If checked before ~17:00+07, do NOT flag "Aysar absent" — note "not yet posted, recheck end of day" and leave Trello incomplete pending `/me:daily-report recheck aysar` after 17:00. Same category as Fountain's Monday-plan timing ([[feedback_fountain_monday_plan_timing]]).

**Missing formatted message ≠ no work (corrected same day, 10:10):** On 2026-06-22 Carrick skipped the formatted "Today's update:" message but was still actively working (deploy+PR review 09:59, live bug response 17:15, fix 21:15) — discovered only via a broad `search.messages` pull with no format filter across the whole Baamboozle workspace. **The gate is "did Carrick do/communicate Aysar work that day", not "did the exact ritual message post."** Before flagging absent, always run the broad unscoped search first; only alert if there's truly no activity anywhere.

**Also check GitHub issues** every Aysar run: open issues on `baamboozle/baamboozle-web-app` and `baamboozle/bbzl-web-client`, using `nuscarrick` GitHub account:
```bash
GH_TOKEN=$(gh auth token -h github.com -u nuscarrick) gh api 'repos/baamboozle/baamboozle-web-app/issues?state=open&per_page=100&sort=updated&direction=desc'
GH_TOKEN=$(gh auth token -h github.com -u nuscarrick) gh api 'repos/baamboozle/bbzl-web-client/issues?state=open&per_page=100&sort=updated&direction=desc'
```
Filter `pull_request == null` (endpoint includes PRs by default). Summarize new/updated issues since window start; block Trello completion if any HIGH-severity Aysar-blocking issue is open.
