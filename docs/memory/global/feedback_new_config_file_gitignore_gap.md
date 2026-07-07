---
name: feedback_new_config_file_gitignore_gap
description: New plaintext config files added to config/ must be added to .gitignore immediately, or GitHub push protection blocks the push
metadata:
  type: feedback
---

When a new decrypted config file is created in `config/` (e.g. `config/.newrelic-ohcleo-config.json`), it must be added to `.gitignore` in the SAME commit. If missed, the plaintext secret gets committed and later blocks `git push` via GitHub Push Protection (GH013).

**Why:** On 2026-07-07, `config/.newrelic-ohcleo-config.json` (New Relic API key) was committed unencrypted in commit `7046039` without a matching `.gitignore` entry (unlike its `.enc` sibling and all other `config/.*-config.json` plaintext files). This blocked all pushes until fixed. Same root cause as [[feedback_workstream_config_not_gitignored]] and [[feedback_encrypt_secrets_missing_workstream]] — this is a recurring pattern with new config files.

**How to apply:** Fixed by rewriting local git history with `git-filter-repo --path <file> --invert-paths --force` (safe here since all 14 commits were unpushed/local-only — never do this if commits are already on a shared remote). Then added the file to `.gitignore`, restored the plaintext file locally from backup, re-added the `origin` remote (filter-repo strips it), and pushed cleanly.

Going forward: whenever `scripts/encrypt-secrets.sh` or manual setup creates a new `config/.*-config.json` plaintext file, immediately check it's listed in `.gitignore` before the next commit — don't wait for push protection to catch it.
