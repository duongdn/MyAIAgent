---
name: feedback-neural-consolidated
description: "Neural Contract (Upwork 38901192) is messages_only — must intercept messages API, not just timesheet; silence/Cloudflare-block is NEVER an alert, fix silently"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9ba04ead-670b-45ea-b6a0-575e6d6d55b2
---

**Messages required, not just timesheet:** "Neural Contract" Trello item = Upwork workroom 38901192, a `messages_only` workroom. Timesheet hours alone are NOT enough — once showed 0:00h and got reported "no alerts, low activity normal" while an URGENT production bug from client Michael sat active in messages that day.

**How to apply:**
1. Run `upwork-weekly-hours.js` for timesheet context
2. **MUST ALSO** fetch messages via network intercept: navigate to `https://www.upwork.com/nx/wm/workroom/38901192/messages`, intercept `/api/v3/rooms/rooms/room_2d2bc33394bb79a64cd3426cb4120aec/stories/simplified?limit=20` via `page.on('response')` (the `page.evaluate(fetch(...))` approach fails auth)
3. Report recent messages (timestamp/sender/summary); flag unanswered client messages as action items; don't auto-complete Trello without reviewing content

**Silence/auth failures are NEVER an alert:** Long quiet stretches on this contract are normal (confirmed 2026-05-11, reinforced 2026-05-29 "never!!!"). If Upwork is Cloudflare-blocked or auth fails: **fix it silently** (refresh session, retry, new approach) — never report the block, never show `—`, never omit. Same zero-tolerance as [[feedback_never_report_token_expired]]. Complete Trello unless an URGENT unread client message (e.g. from Michael) sits unanswered.

**Don't call it "silent"/"inactive" from messages alone (2026-07-13):** reported Neural Contract as "silent since 07-07" based only on Upwork messages, but TuanNT was actively logging real hours that same week via Workstream (`neural_contract` project `cmqyvio6k001vqo0x2wzfn4ka`, cross-referenced in Piece 4/Sheets). User corrected: the project IS active, just the *messages channel* is quiet — those are different facts. Always phrase it as "no new client messages, but Workstream shows Xh logged" rather than blanket "silent"/"no activity" — cross-check Workstream hours (already gathered by the Sheets piece for TuanNT) before characterizing this project's status.
