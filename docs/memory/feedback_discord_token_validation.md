---
name: Discord token validation before flagging expired
description: MUST verify Discord tokens with curl /users/@me AND /guilds AND /channels before reporting expired — false 403 is a RECURRING problem
type: feedback
---

Before reporting Discord tokens as expired or 403, ALWAYS verify with direct API calls:

```bash
# Step 1: Check auth
curl -s -o /dev/null -w "%{http_code}" -H "Authorization: {token}" "https://discord.com/api/v10/users/@me"

# Step 2: Check guild access
curl -s -H "Authorization: {token}" "https://discord.com/api/v10/users/@me/guilds"

# Step 3: Check channel messages
curl -s -H "Authorization: {token}" "https://discord.com/api/v10/channels/{channel_id}/messages?limit=10"
```

200 on all 3 = token works. Only flag expired if /users/@me returns 401.

**Why:** FALSE 403 REPORTED THREE TIMES (Mar 23, Mar 26 morning, Mar 26 refresh). User very frustrated — "you keep asking me about this!!!" The subagents keep reporting 403 without proper verification. Empty channel (no messages) ≠ 403.

**How to apply:**
1. In subagent prompts, explicitly instruct: "verify Discord tokens with curl to /users/@me, /guilds, AND /channels before reporting ANY token issue"
2. Never trust a single failed channel request — could be rate limiting or empty channel
3. If 0 messages returned, report "no new messages" NOT "access forbidden"
4. This is the #1 recurring false alarm — treat with extreme caution
