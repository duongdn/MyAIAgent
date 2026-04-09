#!/bin/bash
# Install pre-commit hook that blocks hardcoded secrets from being committed.
# Usage: bash scripts/install-pre-commit-hook.sh

# Detect custom hooks path
HOOK_DIR=$(git config core.hooksPath 2>/dev/null || echo ".git/hooks")
HOOK_PATH="$HOOK_DIR/pre-commit"
mkdir -p "$HOOK_DIR"

cat <<'HOOK' > "$HOOK_PATH"
#!/bin/bash
# Pre-commit hook: block hardcoded secrets from being committed
# Scans staged diff for common secret patterns (Slack tokens, passwords, etc.)

PATTERNS=(
  'xoxp-[0-9]'
  'xoxc-[0-9]'
  'xoxb-[0-9]'
  'xoxd-[0-9a-zA-Z]'
  '"password":\s*"[^"]+'
  "'password':\s*'[^']+"
  'password.*=.*"[A-Za-z0-9]{8,}'
)

# Lines matching these are OK (regex patterns, encrypted files, etc.)
ALLOW='(re\.search|startswith|regex|pattern|example|\.enc|\.gitignore|config/\.|MEMORY|memory)'

found=0
for pat in "${PATTERNS[@]}"; do
  matches=$(git diff --cached -U0 --diff-filter=ACMR | grep -E "^\+" | grep -v "^+++" | grep -vE "$ALLOW" | grep -E "$pat" 2>/dev/null)
  if [ -n "$matches" ]; then
    if [ $found -eq 0 ]; then
      echo "❌ COMMIT BLOCKED: Hardcoded secrets detected!"
      echo ""
      echo "Load secrets from config/*.json files instead."
      echo ""
    fi
    echo "Pattern: $pat"
    echo "$matches" | head -3
    echo ""
    found=1
  fi
done

if [ $found -eq 1 ]; then
  echo "Fix: Move secrets to gitignored config files"
  echo "  Slack: config/.slack-accounts.json"
  echo "  Email: config/.email-accounts.json"
  exit 1
fi
exit 0
HOOK

chmod +x "$HOOK_PATH"
echo "✅ Pre-commit hook installed at $HOOK_PATH"
