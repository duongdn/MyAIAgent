---
name: feedback_thuyle_report_explicit_send_flag
description: Never send the James Diamond + Marcel + Blair Brown weekly Matrix report to ThuyLTT's room without an explicit, literal user confirmation of the exact final message text
metadata:
  type: feedback
---

**Rule:** Before sending the weekly James Diamond + Marcel + Blair Brown report to Thuy Le's (ThuyLTT) Matrix room (`!oofREYAXHsvPWEOJev:nustechnology.com`), draft the exact message text and get an EXPLICIT confirmation from the user on that literal text — not just a general "should I send" yes/no on a summary or table. Treat this like an explicit gate/flag, similar to how daily-report Trello items require an explicit source-verified state before marking complete — no send without an explicit confirmation tied to the actual final content.

**Why:** 2026-07-04 — sent `Web: 40h/42h` (wrong; used a stale "charge is always the 40h contract" shortcut, see [[feedback_matrix_report_format]]) even though the user had approved sending via a yes/no question that showed the draft. The approval covered "send this draft" in principle, but the underlying numbers were wrong and slipped through anyway. User: "từ bây giờ làm 1 flag như daily report, chỉ gởi report cho ThuyLTT khi có flag đó tường minh" (from now on, make an explicit flag like the daily report — only send the report to ThuyLTT when that flag is explicit).

**Concrete mechanism (added 2026-07-04):** `config/.weekly-report-send-flags.json` — a literal, mechanical gate file, not just a behavioral note. Schema: `james_diamond_marcel_blair_brown.message_text` (exact draft), `confirmed` (bool), `confirmed_at`, `sent` (bool), `sent_at`, `event_id`, plus a `history[]` array logging prior sends (including wrong ones, with a `note` explaining the error).

**How to apply:**
1. Compute all dev-level charge/actual numbers carefully — sum individual charges, don't shortcut to a fixed contract number (see corrected rule in [[feedback_matrix_report_format]]).
2. Write the exact draft into `message_text` in the flag file, `confirmed: false`.
3. Show the full exact message text (the literal block that will be sent) to the user, not a paraphrase.
4. Wait for explicit confirmation on that exact text — a prior generic "yes send" on a summary/table is not sufficient once numbers have changed. Only on explicit confirmation, flip `confirmed: true` + `confirmed_at`.
5. If any number changes after user feedback, rewrite `message_text`, reset `confirmed: false`, and repeat from step 3 — never auto-resend on a stale confirmation.
6. After sending, set `sent: true`, `sent_at`, `event_id`.
7. If a wrong message was already sent to the room, log it in `history[]` with a `note`, and ask the user whether to post a correction rather than silently only fixing the internal report file.
