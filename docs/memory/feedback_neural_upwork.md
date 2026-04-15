---
name: Neural Contract — MUST fetch messages, not just timesheet
description: Neural Contract is messages_only workroom — must intercept Upwork messages API, timesheet hours alone are insufficient
type: feedback
---

"Neural Contract" checklist item is monitored via **Upwork workroom 38901192**. It is a `messages_only` workroom — **checking timesheet hours alone is NOT enough**.

**Why:** Timesheet showed 0:00h this week so agent reported "no alerts, low activity normal." But there was an URGENT production bug reported by Michael (client) the same day with active conversation. User caught the miss.

**How to apply:**
1. Run `upwork-weekly-hours.js` for timesheet summary (hours context)
2. **MUST ALSO** fetch messages via network intercept of Upwork's internal API:
   - Navigate to `https://www.upwork.com/nx/wm/workroom/38901192/messages`
   - Intercept response from `/api/v3/rooms/rooms/room_2d2bc33394bb79a64cd3426cb4120aec/stories/simplified?limit=20`
   - The `page.evaluate(fetch(...))` approach fails auth — must use `page.on('response')` intercept
3. Report recent messages with timestamps, sender, and content summary
4. Flag any client messages awaiting response as action items
5. URGENT client messages = potential alert, do NOT auto-complete Trello item without reviewing message content
