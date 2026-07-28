#!/bin/bash
# Encrypt secret config files using AES-256-CBC
# Reads SECRETS_KEY from .env file
# Outputs .enc files that are safe to commit to git
#
# USAGE: encrypt-secrets.sh <file1> [file2 ...]
#
# BULK MODE (no args) is INTENTIONALLY KILLED.
# Running without args used to encrypt ALL 24 config/*.json files, locking
# whatever stale plaintext happened to be on disk into .enc permanently.
# This caused at least 4 token-corruption incidents (2026-07 Bitbucket,
# 2026-07 email-accounts.json, 2026-07 Matrix, 2026-07 Solid Code Slack).
# Only `saveSecretConfig()` (scripts/lib/save-secret-config.js) should
# encrypt secrets — and it always calls with an explicit file arg.

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

if [ $# -eq 0 ]; then
  echo "ERROR: Must specify at least one file to encrypt."
  echo "Bulk mode (no args) has been REMOVED to prevent token corruption."
  echo "Use: $0 config/.foo.json [config/.bar.json ...]"
  echo "Or add files back to the SECRET_FILES list below if you really need bulk."
  exit 1
fi

for file in "$@"; do
  if [ -f "$file" ]; then
    openssl enc -aes-256-cbc -salt -pbkdf2 -in "$file" -out "${file}.enc" -pass "pass:${SECRETS_KEY}"
    echo "✓ $file"
  else
    echo "ERROR: file not found: $file"
    exit 1
  fi
done

echo "Done."
