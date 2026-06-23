---
name: Never send duplicate messages to external services
description: Do not re-run a message send while a background task doing the same send is still running
type: feedback
---

Never send a message to an external service (Matrix, Slack, email, etc.) if a background task attempting the same send is still running or its result has not been read yet.

**Why:** Sent a duplicate Matrix report message (week 16/03) because the background task was still pending and I ran the send again directly without waiting.

**How to apply:**
- If a send was dispatched as a background task, always wait for TaskOutput before deciding to retry.
- Only retry if the task explicitly failed (non-200 status or error). If result is unknown/pending, wait — do not fire a second send.
- This applies to: Matrix messages, Slack posts, emails, form submissions, and any other write to an external system.
