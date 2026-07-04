---
name: feedback_thuyle_report_explicit_send_flag
description: Never send the James Diamond + Marcel + Blair Brown weekly Matrix report to ThuyLTT's room without an explicit, literal user confirmation of the exact final message text
metadata:
  type: feedback
---

**Rule:** Before sending the weekly James Diamond + Marcel + Blair Brown report to Thuy Le's (ThuyLTT) Matrix room (`!oofREYAXHsvPWEOJev:nustechnology.com`), draft the exact message text and get an EXPLICIT confirmation from the user on that literal text — not just a general "should I send" yes/no on a summary or table. Treat this like an explicit gate/flag, similar to how daily-report Trello items require an explicit source-verified state before marking complete — no send without an explicit confirmation tied to the actual final content.

**Why:** 2026-07-04 — sent `Web: 40h/42h` (wrong; used a stale "charge is always the 40h contract" shortcut, see [[feedback_matrix_report_format]]) even though the user had approved sending via a yes/no question that showed the draft. The approval covered "send this draft" in principle, but the underlying numbers were wrong and slipped through anyway. User: "từ bây giờ làm 1 flag như daily report, chỉ gởi report cho ThuyLTT khi có flag đó tường minh" (from now on, make an explicit flag like the daily report — only send the report to ThuyLTT when that flag is explicit).

**How to apply:**
1. Compute all dev-level charge/actual numbers carefully — sum individual charges, don't shortcut to a fixed contract number (see corrected rule in [[feedback_matrix_report_format]]).
2. Show the full exact message text (the literal block that will be sent) to the user, not a paraphrase.
3. Wait for explicit confirmation on that exact text before calling the send script — a prior generic "yes send" on a summary/table is not sufficient once numbers have changed.
4. If any number changes after user feedback, show the revised exact text again and get confirmation again before sending — never auto-resend.
5. If a wrong message was already sent to the room, ask the user whether to post a correction rather than silently only fixing the internal report file.
