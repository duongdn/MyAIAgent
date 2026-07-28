---
name: reference_upwork_inbox_generic_room_script
description: "How to read ANY carrick Upwork conversation (not just the 5 tracked workrooms) — scripts/upwork-room-messages.js, inbox is /ab/messages/ not /nx/wm/, room list only in sidebar DOM, in-page fetch 401s, story id field is storyId"
metadata:
  type: reference
---

`scripts/upwork-room-messages.js` — generic reader for any conversation in carrick's Upwork inbox.
Same real-session cookie injection as `upwork-neural-check.js` (see [[feedback_neural_consolidated]] — never re-attempt a Puppeteer login).

```
node scripts/upwork-room-messages.js --list                       # all inbox conversations
node scripts/upwork-room-messages.js "Brad Ballantine" --limit 40 # one thread
```

**Hard-won API facts (2026-07-28), don't re-derive:**
- Inbox URL is **`https://www.upwork.com/ab/messages/`**. `/nx/wm/` and `/nx/messages/` both **404** (`/nx/wm/workroom/{numericId}/messages` works only for a known workroom id).
- Room keys in the inbox are **`room_<hex>`**, a different id space from the numeric workroom ids in [[reference_upwork_workrooms]].
- **No room-list API is reachable** — the app never calls one on load. Get rooms from the sidebar DOM: `a[href*="/rooms/room_"]`, with the display name in the `pageTitle=` query param.
- **In-page `fetch()` of `/api/v3/rooms/...` returns 401** even with a fully authenticated session (confirmed again here, matching the earlier participant-name attempt). The ONLY way to read messages is to intercept the app's own responses via `page.on('response')` on `/stories/simplified`.
- Story objects key the id as **`storyId`**, not `id` — deduping on `m.id` silently collapses the whole thread to one message (hit this bug on the first run).
- `/rooms/{room}/users` returns **userId + orgId only, no display names**. Our org = `676959530288324609`; the other participant is the client, name comes from the sidebar `pageTitle`.
- Default page is 20 newest stories; scrolling the pane did not trigger older-page fetches — 20 was enough here, revisit if a longer history is ever needed.
