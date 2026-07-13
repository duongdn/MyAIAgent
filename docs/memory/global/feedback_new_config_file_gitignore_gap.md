---
name: feedback_new_config_file_gitignore_gap
description: "RESOLVED 2026-07-13 — .gitignore now uses a pattern (config/*.json ignored by default, .enc + 4 named exceptions un-ignored) instead of a per-file allowlist. New plaintext config files are auto-ignored, no manual .gitignore edit needed anymore. This file kept as historical incident record."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c2b12c7f-2dc0-4a10-bf71-022a35183ef7
---

🔴 **Structural fix applied 2026-07-13** — the recurring failure mode this file used to warn about (new plaintext secret config forgotten from `.gitignore`) is now prevented by construction, not by remembering a manual step. `.gitignore` changed from an explicit per-file list to: `config/*.json` ignored by default, then `!config/*.json.enc` + 4 named non-secret exceptions (`leave-plan.json`, `.monitoring-timelines.json`, `.weekly-report-send-flags.json`, `.elena-pending-actions.json`) explicitly un-ignored. Any NEW `config/*.json` plaintext file is automatically ignored — verified live via `git check-ignore` on a throwaway test file.

**How to apply now:** If a new secret needs to be tracked in git as encrypted, just add it to `encrypt-secrets.sh`'s `SECRET_FILES` array and `decrypt-secrets.sh`'s `ENC_FILES` array (so it gets encrypted/decrypted) — no `.gitignore` edit needed, the pattern already covers it. If a new NON-secret plaintext file needs to be tracked (rare — only for operational state like leave-plan.json), add an explicit `!config/{name}.json` line.

---

**Original incident (2026-07-07), kept for context:** `config/.newrelic-ohcleo-config.json` (New Relic API key) was committed unencrypted in commit `7046039` without a matching `.gitignore` entry (unlike its `.enc` sibling and all other `config/.*-config.json` plaintext files at the time). This blocked all pushes until fixed via GitHub Push Protection (GH013). Same root cause as [[feedback_workstream_config_not_gitignored]] and [[feedback_encrypt_secrets_missing_workstream]] — recurring pattern with new config files, now closed off structurally rather than needing to be remembered.

Fixed at the time by rewriting local git history with `git-filter-repo --path <file> --invert-paths --force` (safe since commits were unpushed/local-only — never do this if commits are already on a shared remote).
