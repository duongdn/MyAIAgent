#!/bin/bash
# Decrypt all secret config files from .enc files
# Reads SECRETS_KEY from .env file
# Run this after cloning on a new PC

set -euo pipefail
cd "$(dirname "$0")/.."

# Load key from .env
if [ ! -f .env ]; then
  echo "ERROR: .env file not found. Create it with: SECRETS_KEY=your-secret-key"
  exit 1
fi
source .env

if [ -z "${SECRETS_KEY:-}" ]; then
  echo "ERROR: SECRETS_KEY not set in .env"
  exit 1
fi

decrypted=0
skipped=0

for enc_file in *.enc .*.enc; do
  [ -f "$enc_file" ] || continue
  # Remove .enc suffix to get original filename
  original="${enc_file%.enc}"
  openssl enc -aes-256-cbc -d -salt -pbkdf2 -in "$enc_file" -out "$original" -pass "pass:${SECRETS_KEY}"
  echo "✓ Decrypted: $enc_file → $original"
  ((decrypted++))
done

echo ""
echo "Done: $decrypted files decrypted"
echo "Config files are ready to use."
