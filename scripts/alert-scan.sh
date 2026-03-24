#!/bin/bash
# Alert scan script - scans all sources for 14:00-14:30 window
CUTOFF_EPOCH=1742799600  # 2026-03-24T14:00:00+07:00 = 2026-03-24T07:00:00Z

echo "=== SLACK REGULAR TOKENS ==="
declare -A TOKENS
TOKENS["Baamboozle"]="SLACK_TOKEN_BAAMBOOZLE"
TOKENS["RDC-FM"]="SLACK_TOKEN_RDC_FM"
TOKENS["SwiftStudio"]="SLACK_TOKEN_SWIFTSTUDIO"
TOKENS["XtremeSoft"]="SLACK_TOKEN_XTREMESOFT"
TOKENS["SAMGuard"]="SLACK_TOKEN_SAMGUARD"
TOKENS["GlobalGrazing"]="SLACK_TOKEN_GLOBALGRAZING"
TOKENS["Generator"]="SLACK_TOKEN_GENERATOR"
TOKENS["LegalAtoms"]="SLACK_TOKEN_LEGALATOMS"
TOKENS["MPFC"]="SLACK_TOKEN_MPFC"
TOKENS["WilliamBills"]="SLACK_TOKEN_WILLIAMBILLS"
TOKENS["SoCalAutoWraps"]="SLACK_TOKEN_SOCALAUTOWRAPS"
TOKENS["AigileDev"]="SLACK_TOKEN_AIGILEDEV"

for WS in "${!TOKENS[@]}"; do
  RESULT=$(curl -s -X POST "https://slack.com/api/search.messages" \
    -H "Authorization: Bearer ${TOKENS[$WS]}" \
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
# Amazing Meds
RESULT=$(curl -s -X POST "https://slack.com/api/search.messages" \
  -H "Authorization: Bearer SLACK_SESSION_AMAZINGMEDS" \
  -H "Cookie: d=SLACK_COOKIE_AMAZINGMEDS" \
  -d "query=after:2026-03-23&count=5&sort=timestamp&sort_dir=desc" 2>&1)
OK=$(echo "$RESULT" | jq -r '.ok' 2>/dev/null)
if [ "$OK" != "true" ]; then
  echo "AmazingMeds: ERROR=$(echo "$RESULT" | jq -r '.error' 2>/dev/null)"
else
  MSGS=$(echo "$RESULT" | jq -r --arg cutoff "$CUTOFF_EPOCH" '[.messages.matches[] | select((.ts | split(".")[0] | tonumber) >= ($cutoff | tonumber))] | length' 2>/dev/null)
  echo "AmazingMeds: $MSGS msgs in window"
  if [ "$MSGS" -gt 0 ] 2>/dev/null; then
    echo "$RESULT" | jq -r --arg cutoff "$CUTOFF_EPOCH" '.messages.matches[] | select((.ts | split(".")[0] | tonumber) >= ($cutoff | tonumber)) | "  [\(.ts)] <\(.username // "?")> \(.channel.name // "?"): \(.text[0:150])"' 2>/dev/null
  fi
fi

# Equanimity
RESULT=$(curl -s -X POST "https://slack.com/api/search.messages" \
  -H "Authorization: Bearer SLACK_SESSION_EQUANIMITY" \
  -H "Cookie: d=SLACK_COOKIE_EQUANIMITY" \
  -d "query=after:2026-03-23&count=5&sort=timestamp&sort_dir=desc" 2>&1)
OK=$(echo "$RESULT" | jq -r '.ok' 2>/dev/null)
if [ "$OK" != "true" ]; then
  echo "Equanimity: ERROR=$(echo "$RESULT" | jq -r '.error' 2>/dev/null)"
else
  MSGS=$(echo "$RESULT" | jq -r --arg cutoff "$CUTOFF_EPOCH" '[.messages.matches[] | select((.ts | split(".")[0] | tonumber) >= ($cutoff | tonumber))] | length' 2>/dev/null)
  echo "Equanimity: $MSGS msgs in window"
  if [ "$MSGS" -gt 0 ] 2>/dev/null; then
    echo "$RESULT" | jq -r --arg cutoff "$CUTOFF_EPOCH" '.messages.matches[] | select((.ts | split(".")[0] | tonumber) >= ($cutoff | tonumber)) | "  [\(.ts)] <\(.username // "?")> \(.channel.name // "?"): \(.text[0:150])"' 2>/dev/null
  fi
fi

echo ""
echo "=== MATRIX ==="
ACCESS_TOKEN=$(cat /home/nus/projects/My-AI-Agent/config/.matrix-config.json | jq -r '.access_token')
CUTOFF_MS="${CUTOFF_EPOCH}000"
RESULT=$(curl -s "https://matrix.nustechnology.com/_matrix/client/v3/rooms/!EWnVDAxbTGsBxPkaaI:nustechnology.com/messages?dir=b&limit=5&filter=%7B%22types%22:%5B%22m.room.message%22%5D%7D" \
  -H "Authorization: Bearer $ACCESS_TOKEN" 2>&1)
echo "$RESULT" | jq --arg cutoff "$CUTOFF_MS" '{msgs_in_window: [.chunk[]? | select((.origin_server_ts | tostring) >= $cutoff) | {sender, ts: .origin_server_ts, body: .content.body[0:150]}] | length, details: [.chunk[]? | select((.origin_server_ts | tostring) >= $cutoff) | {sender, ts: .origin_server_ts, body: .content.body[0:150]}]}' 2>/dev/null || echo "Matrix parse error: $RESULT"

echo ""
echo "=== DISCORD ==="
# nusvinn - check AirAgri/HOMIEAPP channels
GUILDS=$(curl -s -H "Authorization: DISCORD_TOKEN_NUSVINN" "https://discord.com/api/v10/users/@me/guilds" 2>&1)
echo "nusvinn guilds: $(echo "$GUILDS" | jq -r '[.[] | .name] | join(", ")' 2>/dev/null)"

# nuscarrick - check Bizurk
GUILDS2=$(curl -s -H "Authorization: DISCORD_TOKEN_NUSCARRICK" "https://discord.com/api/v10/users/@me/guilds" 2>&1)
echo "nuscarrick guilds: $(echo "$GUILDS2" | jq -r '[.[] | .name] | join(", ")' 2>/dev/null)"
