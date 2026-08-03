---
name: feedback_external_bug_counting_judgment_calls
description: Monday report external-bug counting precedents — merge same-issue message threads, don't count internal dev-debugging as external even if client-triggered
metadata:
  type: feedback
---

Two counting precedents confirmed by user 2026-08-03 (week 2026-07-27..2026-08-02), useful for future ambiguous external-bug tallies:

1. **Merge same-issue threads, don't count per-message.** Baamboozle had a Safari/Vietnamese-font-rendering bug reported by skjamie25 on 07-29, then followed up again on 07-31 (still broken). Initially counted as 2 separate bugs (one per message); user corrected to count as **1** (same underlying issue tracked over time, not two distinct reports). Apply this whenever a customer message is clearly a follow-up/retest of a previously reported issue, not a new one.

2. **Internal dev-debugging ≠ external bug, even if a client message triggered it.** LegalAtoms: Raymond (client) asked the team to look into a "doc generation blocking" slowdown; investigating dev (aliriodiaz111) found it was actually 2 separate unrelated Sidekiq failures, plus there was an unrelated pre-release check flag. User's call: count this as **0** external bugs — a client asking "can you look into X" that turns into internal root-cause investigation is not the same as a customer filing a bug report. Reserve "external bug" for cases where the client is explicitly reporting broken behavior they hit, not requesting investigation into something they merely suspect.

**Why:** Both were presented via AskUserQuestion since the skill text ("Analyze customer messages for bug reports", "count distinct bugs reported by customer") doesn't specify how to handle thread continuations or investigation-triggered-by-client cases. User's answers establish the pattern above.

**How to apply:** Before asking the user next time, apply these two rules first (merge threads, exclude investigation-only client asks) and only escalate to AskUserQuestion if still ambiguous after that.
