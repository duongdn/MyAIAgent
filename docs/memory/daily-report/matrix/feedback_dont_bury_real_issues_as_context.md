---
name: feedback_dont_bury_real_issues_as_context
description: "When a room/DM read reveals a genuine internal process problem (not just informational chat), surface it as its own alert line — don't fold it into a longer paragraph as background context for something else."
metadata:
  type: feedback
---

**2026-07-14 incident:** While reading the Arthur/Meta-Stamp Slack DM to Art (the one with "David paused the project, need more hours" ask), the message also contained the sender apologizing for a confusing earlier exchange, explaining it was actually a *different person* posting under the same shared Slack login (`U0B1C5QAZA4`, used interchangeably by David/namtv/PhucVT/DuongDN). This is evidence of a real, structural problem — the client (Art) cannot reliably tell who he's talking to, and it already caused visible frustration ("I don't understand what you're saying, that's not a sentence") during the exact week of a critical investor-demo crunch.

I initially reported this only as one sentence of *context* inside a much longer paragraph about the "more hours" ask — not as its own alert. User: "vấn đề là nó là issue, sao ko nhắc tới !!!!" (the problem is this IS an issue, why wasn't it mentioned?!). Had to go back and promote it to its own numbered alert line.

**How to apply:** When reading a room/DM transcript, don't only ask "what does this message directly say the ask/action is" — separately ask "does anything in here reveal a standing problem with how we operate (shared credentials, unclear roles, a recurring miscommunication pattern, a process gap)?" If yes, give it its own alert line, not a subordinate clause. Signs something deserves promotion to its own alert rather than staying as background color:
- The client/counterpart visibly expressed frustration or confusion because of it
- It's a structural/repeatable cause (shared login, unclear process) rather than a one-off event
- It happened during a business-critical window (launch, demo, deadline) where the cost of recurrence is high
- Fixing it requires an actual decision (e.g., "should each person get their own Slack identity?") rather than nothing to do

**Why this matters generally:** A report that's technically complete (all the facts are IN there somewhere) but buries the important judgment call inside a paragraph about something else is functionally the same failure as omitting it — the reader has to already know to look for it. See also [[feedback_read_full_room_transcript_not_grep_snippets]] (read depth) — this is the next step after reading deep enough: correctly classifying what you found.
