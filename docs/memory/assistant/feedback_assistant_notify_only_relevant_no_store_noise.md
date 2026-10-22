---
name: assistant-notify-only-relevant-no-store-noise
description: MyDailyAssistant must filter BEFORE storing/notifying — team chatter not directed at DuongDN is dropped, never sent to Telegram
metadata:
  type: feedback
---
2026-10-22: daemon pushed 2 internal team Matrix msgs (MinhTV, Celine-OhCleo room) to Telegram → user: "sai". Rule: listener → relevance gate (hard-drop bots/bulk mail + Haiku judge) → only relevant stored + notified; irrelevant not stored. New notify paths start in dryRun (tmp/assistant-gate.log) until user approves.
**Why:** user only wants urgent / customer asks / things needing them personally; noise defeats the assistant.
**How to apply:** never wire a new source straight to Telegram; go through scripts/assistant/lib/relevance-gate.js; don't start daemon live without user OK. Related [[never_send_messages_without_permission]].
