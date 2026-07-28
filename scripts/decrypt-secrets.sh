#!/bin/bash
# Decrypt secret config files from .enc files
# Reads SECRETS_KEY from .env file
# Run this after cloning on a new PC
#
# SAFETY: Before decrypting each file, checks whether the plaintext .json
# is NEWER than its .enc — if so, a live token was refreshed in-place but
# never re-encrypted; decrypting would silently clobber it with stale data.
# Use --force to bypass this check.

set -uo pipefail
cd "$(dirname "$0")/.."

FORCE=false
if [ "${1:-}" = "--force" ]; then
  FORCE=true
fi

if [ ! -f .env ]; then
  echo "ERROR: .env file not found. Create it with: SECRETS_KEY=your-secret-key"
  exit 1
fi
source .env

if [ -z "${SECRETS_KEY:-}" ]; then
  echo "ERROR: SECRETS_KEY not set in .env"
  exit 1
fi

# All config files are in config/
ENC_FILES=(
  config/.email-accounts.json.enc
  config/.slack-accounts.json.enc
  config/.discord-accounts.json.enc
  config/.google-docs.json.enc
  config/.trello-config.json.enc
  config/.scrin-config.json.enc
  config/.redmine-config.json.enc
  config/.matrix-config.json.enc
  config/.msteams-accounts.json.enc
  config/.web-monitors.json.enc
  config/.jira-config.json.enc
  config/.bailey-config.json.enc
  config/.upwork-config.json.enc
  config/.newrelic-config.json.enc
  config/.newrelic-ohcleo-config.json.enc
  config/.newrelic-fountain-config.json.enc
  config/.newrelic-infinity-config.json.enc
  config/.rollbar-config.json.enc
  config/.cloudflare-config.json.enc
  config/.workstream-config.json.enc
  config/.github-config.json.enc
  config/.gmail-service-account.json.enc
  config/.bitbucket-config.json.enc
  config/.server-credentials.json.enc
)

# Add any daily-agent-*.json.enc
for f in config/daily-agent-*.json.enc; do
  [ -f "$f" ] && ENC_FILES+=("$f")
done

# Pre-scan: check for plaintext newer than .enc (live token risk)
SKIPPED=()
WARNED=false
for enc_file in "${ENC_FILES[@]}"; do
  if [ ! -f "$enc_file" ]; then
    continue
  fi
  plaintext="${enc_file%.enc}"
  if [ -f "$plaintext" ] && [ "$plaintext" -nt "$enc_file" ]; then
    if $FORCE; then
      echo "⚠ Forcing: $plaintext is newer than .enc (would be overwritten)"
    else
      SKIPPED+=("$plaintext")
      WARNED=true
    fi
  fi
done

if $WARNED && ! $FORCE; then
  echo ""
  echo "⚠️  SAFETY BLOCK: The following plaintext files are NEWER than their .enc:"
  for f in "${SKIPPED[@]}"; do
    echo "   $f"
  done
  echo ""
  echo "These files were edited in-place after the last encrypt-secrets.sh run."
  echo "Decrypting now would clobber live tokens with stale .enc data."
  echo "If this is intentional (fresh clone, first-time setup), use:"
  echo "  bash scripts/decrypt-secrets.sh --force"
  echo ""
  echo "Otherwise, encrypt the live changes first:"
  echo "  bash scripts/encrypt-secrets.sh <affected files>"
  echo ""
  exit 1
fi

DECRYPTED=0
for enc_file in "${ENC_FILES[@]}"; do
  if [ ! -f "$enc_file" ]; then
    echo "⚠ skip: $enc_file"
    continue
  fi
  plaintext="${enc_file%.enc}"
  # Skip files that were newer (only when --force not used)
  if ! $FORCE; then
    for s in "${SKIPPED[@]}"; do
      if [ "$s" = "$plaintext" ]; then
        echo "⚠ skip (newer plaintext): $enc_file"
        continue 2
      fi
    done
  fi
  openssl enc -aes-256-cbc -d -salt -pbkdf2 -in "$enc_file" -out "$plaintext" -pass "pass:${SECRETS_KEY}"
  echo "✓ $enc_file → $plaintext"
  DECRYPTED=$((DECRYPTED + 1))
done

echo "Done ($DECRYPTED decrypted)."
