#!/bin/bash
# Encrypt all secret config files using AES-256-CBC
# Reads SECRETS_KEY from .env file
# Outputs .enc files that are safe to commit to git

set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  echo "ERROR: .env file not found. Create it with: SECRETS_KEY=your-secret-key"
  exit 1
fi
source .env

if [ -z "${SECRETS_KEY:-}" ]; then
  echo "ERROR: SECRETS_KEY not set in .env"
  exit 1
fi

# Optional: encrypt a single file only (used by saveSecretConfig to avoid
# collaterally re-encrypting all 21 config files - and re-committing any
# stale plaintext sitting in config/ for files unrelated to the caller -
# every time one config is saved. See 2026-07 email-accounts.json corruption.)
if [ -n "${1:-}" ]; then
  if [ -f "$1" ]; then
    openssl enc -aes-256-cbc -salt -pbkdf2 -in "$1" -out "${1}.enc" -pass "pass:${SECRETS_KEY}"
    echo "✓ $1"
    exit 0
  else
    echo "ERROR: file not found: $1"
    exit 1
  fi
fi

# All config files are in config/
SECRET_FILES=(
  config/.email-accounts.json
  config/.slack-accounts.json
  config/.discord-accounts.json
  config/.google-docs.json
  config/.trello-config.json
  config/.scrin-config.json
  config/.redmine-config.json
  config/.matrix-config.json
  config/.msteams-accounts.json
  config/.web-monitors.json
  config/.jira-config.json
  config/.bailey-config.json
  config/.upwork-config.json
  config/.cloudflare-config.json
  config/.gmail-service-account.json
  config/.github-config.json
  config/.workstream-config.json
  config/.newrelic-config.json
  config/.newrelic-ohcleo-config.json
  config/.newrelic-fountain-config.json
  config/.rollbar-config.json
  config/.bitbucket-config.json
)

# Add Google service account key if exists
SA_KEY=$(ls config/daily-agent-*.json 2>/dev/null | head -1 || true)
if [ -n "$SA_KEY" ]; then
  SECRET_FILES+=("$SA_KEY")
fi

for file in "${SECRET_FILES[@]}"; do
  if [ -f "$file" ]; then
    openssl enc -aes-256-cbc -salt -pbkdf2 -in "$file" -out "${file}.enc" -pass "pass:${SECRETS_KEY}"
    echo "✓ $file"
  else
    echo "⚠ skip: $file"
  fi
done

echo "Done."
