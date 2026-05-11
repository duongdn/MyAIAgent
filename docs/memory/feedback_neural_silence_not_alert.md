---
name: Neural Contract silence ≠ Trello-blocking alert
description: Long silence (weeks) in Neural Contract Upwork workroom 38901192 with no urgent client messages does NOT block the Trello "Neural Contract - Contract Probe" checklist item. Only urgent unaddressed client messages block.
type: feedback
---

Neural Contract Upwork workroom 38901192 going silent for weeks is NOT, by itself, a Trello-blocking alert. The contract is messages_only and naturally has long quiet stretches.

**Why:** User confirmed on 2026-05-11 by re-completing the Neural Contract item after the daily report skipped it for "Upwork silent 25 days (since Apr 16)". Quiet stretches are normal for this contract. Only urgent unaddressed client messages from Michael (or other Neural contacts) constitute a real alert that blocks the Trello item.

**How to apply:**
1. Run Neural Contract messages check via API intercept (per `feedback_neural_upwork`).
2. **Complete** the Trello "Neural Contract - Contract Probe" item if there are no urgent client messages awaiting reply, regardless of how long the silence has been.
3. **Skip** the item only if there are URGENT client messages from Michael (or another Neural client contact) sitting unanswered, OR if Carrick is named in an active production outage on the contract.
4. Continue surfacing long silences as INFO in the daily report (so the user can decide whether to confirm contract status), but do NOT treat them as alerts on their own.
5. Pair with `feedback_neural_upwork` (which mandates the messages check) — the messages check is required, but absent messages = OK.
