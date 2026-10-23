---
name: feedback_neural_login_failure_is_not_silence
description: Neural Upwork login failure/Cloudflare ≠ "silence"; never auto-complete Neural without actually reading the messages, and recheck must re-run it
metadata:
  type: feedback
---
2026-10-23: the mpfc cron hit 4/4 Upwork login redirects for Neural and still completed Neural Contract under the "silence/Cloudflare = never alert" rule. The 08:40 recheck didn't re-run it. Meanwhile Michael (customer) sent an urgent 07:47 ask: dev site 500 after PHP upgrade; branded error page first, fix, Bitbucket, upgrade steps for his weekend prod patch. User: "Neural Contract có msg, sao ko báo ???" (Neural Contract has messages, why wasn't I told?)

**Why:** "silence = not an alert" only applies when the messages were actually READ and there are none new. A login failure means unknown, not silence.

**How to apply:**
- If Neural messages couldn't be fetched, leave the item ○ and record "not read". The recheck MUST re-run `env -u DISPLAY node scripts/upwork-neural-check.js` (it works locally after 08:00 via the system-python cookie fallback).
- Read the full text: line 113 limit raised to 3000 chars on 2026-10-23, since 300 chars cut off the actual ask.
- Any customer message newer than the last report = report it verbatim. A "Let me check" holding reply doesn't clear an urgent multi-step ask.
Related: [[feedback_neural_consolidated]], [[feedback_recheck_must_be_exhaustive_not_shallow]]
