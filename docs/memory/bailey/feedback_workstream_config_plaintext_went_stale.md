---
name: feedback_workstream_config_plaintext_went_stale
description: "config/.workstream-config.json plaintext on disk was stale (missing the speedventory project entry added 2026-08-21) while its .enc had the current data — bulk decrypt-secrets.sh correctly refused (23 other configs had newer plaintext); fixed via single-file openssl decrypt instead"
metadata:
  type: feedback
---

On 2026-08-28 `bailey-monitor` Subtask 9 (`workstream-write-tasklog.js speedventory ...`) failed with "Project 'speedventory' not found" even though [[feedback_bailey_moved_to_workstream_speedventory]] documents it was added to `config/.workstream-config.json` on 2026-08-21. The live plaintext file on disk was dated 2026-07-29 (pre-dates that fix) — only had `maddy`/`rebecca` projects. The `.enc` file was newer (refreshed since, per `git log` showing "chore: refresh encrypted workstream token" and later auto-commits) and DID contain `speedventory` when decrypted.

**Why:** Unclear how the plaintext regressed to pre-08-21 state — possibly an earlier `decrypt-secrets.sh --force` run, or the file was never actually updated in-place after the 08-21 fix (only `.enc` got the change via a different path). Whatever the cause, plaintext and `.enc` diverged with `.enc` being the correct/current one — opposite of the usual [[feedback_decrypt_secrets_clobbers_live_tokens]] failure mode (where live plaintext token is newer/correct and `.enc` is stale).

**How to apply:**
- Running `bash scripts/decrypt-secrets.sh` (even with a file arg — the script ignores args and always checks/blocks on ALL 27 configs) correctly refused because 23 *other* config plaintexts were newer than their `.enc` — the safety block worked as designed, don't bypass with `--force` just to fix one file, that would clobber those 23 live tokens.
- Instead, decrypt just the one needed file directly: `source .env && openssl enc -aes-256-cbc -d -salt -pbkdf2 -in config/.workstream-config.json.enc -out /tmp/x.json -pass "pass:${SECRETS_KEY}"`, inspect it, then `cp` over the plaintext only if it looks correct and only for that one file.
- If a project mapping documented in memory (e.g. `speedventory`) is missing from the live plaintext config, don't assume the memory is wrong — check whether `.enc` has it via this single-file decrypt before concluding the project needs to be re-added from scratch.
