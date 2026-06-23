---
name: feedback_never_send_messages_without_permission
description: NEVER send Matrix/Slack/Discord/email messages without explicit user instruction
metadata:
  type: feedback
---

**NEVER send any message to any channel, room, or person without the user explicitly asking.**

This includes: Matrix reminders, Slack messages, Discord messages, email, MS Teams, or any external communication.

**Why:** 2026-06-09 — during "fix all" session, agent sent a 0h reminder to the Fountain Matrix room (!EWnVDAxbTGsBxPkaaI) without being asked. User: "How dare you send reminder without my permission." This caused real-world messages to go out that were not authorized.

**How to apply:**
- Sending reminders = user explicitly says "send reminder" or "send message to X"
- "Fix all" refers to fixing scripts, data, Trello items, deploy — NOT sending comms
- Checking task logs, fixing bugs, completing Trello = OK without asking
- Any action that sends a message externally = STOP and ask first
- Even if the message content seems correct, do not send without instruction
