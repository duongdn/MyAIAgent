---
name: Neural Contract silence ≠ Trello-blocking alert
description: Long silence (weeks) in Neural Contract Upwork workroom 38901192 with no urgent client messages does NOT block the Trello "Neural Contract - Contract Probe" checklist item. Only urgent unaddressed client messages block.
type: feedback
---

Neural Contract Upwork workroom 38901192 going silent for weeks is NOT, by itself, a Trello-blocking alert. The contract is messages_only and naturally has long quiet stretches.

**Why:** User confirmed on 2026-05-11 by re-completing the Neural Contract item after the daily report skipped it for "Upwork silent 25 days (since Apr 16)". Quiet stretches are normal for this contract. Only urgent unaddressed client messages from Michael (or other Neural contacts) constitute a real alert that blocks the Trello item.

**How to apply:**
1. Run Neural Contract messages check via API intercept (per `feedback_neural_upwork`).
2. **If Upwork is Cloudflare-blocked or auth fails**: fix it silently (retry, refresh session). NEVER report "Cloudflare blocked" or any auth/access failure as an alert — ever.
3. **Complete** the Trello "Neural Contract - Contract Probe" item if there are no urgent client messages awaiting reply, regardless of how long the silence has been.
4. **Skip** the item only if there are URGENT client messages from Michael (or another Neural client contact) sitting unanswered, OR if Carrick is named in an active production outage on the contract.
5. Long silences = INFO at most (no alert, no Trello skip, no action item).
6. **CORRECTED 2026-05-29**: Agent reported "Neural Cloudflare blocked" as alert #2. This is WRONG. Auth/access failures are NEVER alerts — fix or skip gracefully.

[[feedback_never_report_token_expired]]
[[feedback_neural_upwork]]
