---
name: feedback_matrix_join_public_room
description: Matrix public rooms — just POST /join to enter, no invite or permission needed
type: feedback
---

When Matrix API returns "User not in room" (M_FORBIDDEN), the fix is simply joining the room via POST /join endpoint. Do NOT report as "lacks permission" or "needs invite."

**Why:** User corrected sharply — "totally wrong!!! which permission!!!" The Elena Digital Plant room was public. Agent incorrectly framed as permission issue needing admin invite. The fix was one API call: POST /_matrix/client/v3/join/{roomId}.

**How to apply:**
1. If M_FORBIDDEN on send → try POST /join/{roomId} first
2. Public rooms don't need invites — just join
3. Only report as permission issue if /join itself fails with 403
4. Never ask user about permissions without trying /join first
