#!/bin/bash
# Alert scan script - reads all secrets from config files (no hardcoded tokens)
cd "$(dirname "$0")/.."

CUTOFF_EPOCH=1742799600  # 2026-03-24T14:00:00+07:00 = 2026-03-24T07:00:00Z

SLACK_CONFIG="config/.slack-accounts.json"
DISCORD_CONFIG="config/.discord-accounts.json"
MATRIX_CONFIG="config/.matrix-config.json"

if [ ! -f "$SLACK_CONFIG" ]; then
  echo "ERROR: $SLACK_CONFIG not found. Run scripts/decrypt-secrets.sh first."
  exit 1
fi

echo "=== SLACK REGULAR TOKENS ==="
python3 -c "
import json
config = json.load(open('$SLACK_CONFIG'))
for ws in config.get('workspaces', []):
    token = ws.get('token', '')
    if token.startswith('xoxp-'):
        print(f\"{ws['name']}|{token}\")
" | while IFS='|' read -r WS TOKEN; do
  RESULT=$(curl -s -X POST "https://slack.com/api/search.messages" \
    -H "Authorization: Bearer $TOKEN" \
    -d "query=after:2026-03-23&count=5&sort=timestamp&sort_dir=desc" 2>&1)
  OK=$(echo "$RESULT" | jq -r '.ok' 2>/dev/null)
  if [ "$OK" != "true" ]; then
    ERROR=$(echo "$RESULT" | jq -r '.error // "unknown"' 2>/dev/null)
    echo "$WS: ERROR=$ERROR"
  else
    MSGS_AFTER=$(echo "$RESULT" | jq -r --arg cutoff "$CUTOFF_EPOCH" '[.messages.matches[] | select((.ts | split(".")[0] | tonumber) >= ($cutoff | tonumber))] | length' 2>/dev/null)
    if [ "$MSGS_AFTER" -gt 0 ] 2>/dev/null; then
      echo "$WS: $MSGS_AFTER new msgs"
      echo "$RESULT" | jq -r --arg cutoff "$CUTOFF_EPOCH" '.messages.matches[] | select((.ts | split(".")[0] | tonumber) >= ($cutoff | tonumber)) | "  [\(.ts)] <\(.username // "?")> \(.channel.name // "?"): \(.text[0:150])"' 2>/dev/null
    else
      echo "$WS: 0 msgs"
    fi
  fi
done

echo ""
echo "=== SLACK SESSION TOKENS ==="
python3 -c "
import json
config = json.load(open('$SLACK_CONFIG'))
for ws in config.get('workspaces', []):
    token = ws.get('token', '')
    cookie = ws.get('cookie', '')
    if token.startswith('xoxc-'):
        print(f\"{ws['name']}|{token}|{cookie}\")
" | while IFS='|' read -r WS TOKEN COOKIE; do
  RESULT=$(curl -s -X POST "https://slack.com/api/search.messages" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Cookie: d=$COOKIE" \
    -d "query=after:2026-03-23&count=5&sort=timestamp&sort_dir=desc" 2>&1)
  OK=$(echo "$RESULT" | jq -r '.ok' 2>/dev/null)
  if [ "$OK" != "true" ]; then
    echo "$WS: ERROR=$(echo "$RESULT" | jq -r '.error' 2>/dev/null)"
  else
    MSGS=$(echo "$RESULT" | jq -r --arg cutoff "$CUTOFF_EPOCH" '[.messages.matches[] | select((.ts | split(".")[0] | tonumber) >= ($cutoff | tonumber))] | length' 2>/dev/null)
    echo "$WS: $MSGS msgs in window"
    if [ "$MSGS" -gt 0 ] 2>/dev/null; then
      echo "$RESULT" | jq -r --arg cutoff "$CUTOFF_EPOCH" '.messages.matches[] | select((.ts | split(".")[0] | tonumber) >= ($cutoff | tonumber)) | "  [\(.ts)] <\(.username // "?")> \(.channel.name // "?"): \(.text[0:150])"' 2>/dev/null
    fi
  fi
done

echo ""
echo "=== MATRIX ==="
ACCESS_TOKEN=$(jq -r '.access_token' "$MATRIX_CONFIG")
CUTOFF_MS="${CUTOFF_EPOCH}000"
RESULT=$(curl -s "https://matrix.nustechnology.com/_matrix/client/v3/rooms/!EWnVDAxbTGsBxPkaaI:nustechnology.com/messages?dir=b&limit=5&filter=%7B%22types%22:%5B%22m.room.message%22%5D%7D" \
  -H "Authorization: Bearer $ACCESS_TOKEN" 2>&1)
echo "$RESULT" | jq --arg cutoff "$CUTOFF_MS" '{msgs_in_window: [.chunk[]? | select((.origin_server_ts | tostring) >= $cutoff) | {sender, ts: .origin_server_ts, body: .content.body[0:150]}] | length, details: [.chunk[]? | select((.origin_server_ts | tostring) >= $cutoff) | {sender, ts: .origin_server_ts, body: .content.body[0:150]}]}' 2>/dev/null || echo "Matrix parse error: $RESULT"

echo ""
echo "=== DISCORD ==="
python3 -c "
import json
config = json.load(open('$DISCORD_CONFIG'))
for acct in config.get('accounts', []):
    print(f\"{acct['user']}|{acct['token']}\")
" | while IFS='|' read -r USER TOKEN; do
  GUILDS=$(curl -s -H "Authorization: $TOKEN" "https://discord.com/api/v10/users/@me/guilds" 2>&1)
  echo "$USER guilds: $(echo "$GUILDS" | jq -r '[.[] | .name] | join(", ")' 2>/dev/null)"
done
