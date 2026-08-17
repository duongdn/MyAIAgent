---
name: feedback_ohcleo_events_code_channel_not_found
description: "OhCleo Piece 12 #events-code channel_not_found root-caused: the monitoring bot/account is no longer a member of that channel, not a token/auth bug — needs workspace-admin re-invite to fix, not a re-auth retry"
metadata:
  type: feedback
---

**Finding (2026-08-17 recheck):** `#events-code` (`C01JDPN0EDQ`) in the OhCleo Slack workspace returned `channel_not_found` via `conversations.history`. Root cause confirmed: the monitoring account (tony@nustechnology.com token) is no longer a member of that channel — NOT a token/cookie expiry like other OhCleo auth failures.

**Why this matters:** `channel_not_found` looks identical to a stale-channel-ID or auth problem, but retrying login/token-refresh (the usual OhCleo fix) won't resolve it — the account needs to be re-invited to the channel by a workspace admin (Celine or Tony), which is outside agent capability.

**How to apply:** if `#events-code` (or any OhCleo channel) returns `channel_not_found` again, don't burn a retry cycle on token refresh — check channel membership first (`conversations.list` for the bot's own visible channels). If it's still not listed, report as "channel access needed — ask Tony/Celine to re-invite the account" rather than treating it as an auth failure to silently fix.
