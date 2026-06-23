---
name: Slack must use search.messages to catch thread replies
description: conversations.history misses thread replies on old parent messages — must use search.messages API with search:read scope
type: feedback
---

MUST use `search.messages` API (query: `on:YYYY-MM-DD`) instead of `conversations.history` for Slack monitoring.
**Why:** User caught a critical miss — a thread reply in Baamboozle #testing where skjamie25 reported a spelling error to Carrick was invisible because `conversations.history` only returns top-level messages. Thread replies on older parent messages are completely missed.
**How to apply:** Always use `search.messages` with `search:read` scope. For workspaces without that scope, fall back to `conversations.history` but also scan threads where `latest_reply` falls in the target date range. Global Grazing went from 3→12 msgs, Generator 25→32 msgs after fix.
