---
name: Task log reminder via Matrix
description: After daily report, send Matrix message to developers with 0h task log to remind them
type: feedback
---

After daily report check, if a developer has 0h logged and is NOT on leave, send a reminder message via Matrix to their room.

**Why:** User wants proactive follow-up on missing task logs, not just flagging in the report.

**How to apply:**
- After daily report identifies 0h task log (non-leave), send Matrix message to the developer's room
- PhucVT (James Diamond): room `!kzyLVmJxcRESoTkfnY:nustechnology.com`
- LeNH (Rory/Franc/Aysar): room `!OIrgPraJWrcDTnRVLQ:nustechnology.com`
- Message format: "Hi {name}, task log for {date} is missing (0h logged). Please update when you can. Thanks!"
- Only send if the person is NOT on confirmed leave
- Add more rooms as user provides them
