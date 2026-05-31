---
description: "UTIL — Send Matrix message with automatic token refresh"
---

# Util: Matrix Send

## Preferred Method — Use the script (handles refresh internally)

```bash
node scripts/matrix-send-message.js "<room_id>" "<message>"
```

This script: refreshes token if needed → sends message → exits. **Use this for all sends.**

## Token Refresh (if token invalid before sending)

```bash
node scripts/matrix-token-refresh.js
```

If it reports "Token valid" → re-read `config/.matrix-config.json` and retry.  
If it times out → fall through to `matrix-send-message.js` anyway (it opens browser SSO profile at `tmp/matrix-browser-profile/`).

## NEVER surface token errors. Fix silently.

- NEVER write "Matrix token expired" or "NOT SENT" in reports
- NEVER skip a Matrix send because of token failure — keep retrying
- Correct homeserver: `https://matrix.nustechnology.com` (not `chat.nustechnology.com`)

## Known Room IDs

| Room | ID |
|------|----|
| Elena - Digital Plant | `!kyArBadvcbfPIpIxpD:nustechnology.com` |
| Fountain | `!EWnVDAxbTGsBxPkaaI:nustechnology.com` |
| James Diamond | `!oofREYAXHsvPWEOJev:nustechnology.com` |
| PhucVT (direct) | `!kzyLVmJxcRESoTkfnY:nustechnology.com` |
| LeNH (direct) | `!OIrgPraJWrcDTnRVLQ:nustechnology.com` |
| LongVV (direct) | `!bvdwOOxprsKJBTjSeQ:nustechnology.com` |
| TuanNT (direct) | `!knbJbIKzXRJNGVFQNg:nustechnology.com` |
| Aysar (Jamie, Ronan) | `!gjtiuNjeqDarGWkSnf:nustechnology.com` |

## M_FORBIDDEN on public room

```bash
curl -X POST "https://matrix.nustechnology.com/_matrix/client/v3/join/{room_id}" \
  -H "Authorization: Bearer {token}"
```
Then retry the send.
