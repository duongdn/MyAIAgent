---
name: feedback_decrypt_safety_block_leaves_other_configs_stale
description: decrypt-secrets.sh aborts ALL files when any plaintext is newer, so genuinely stale configs (e.g. slack-accounts missing Meta-Stamp) never refresh on mpfc
metadata:
  type: feedback
---
2026-10-20 cron (mpfc): `decrypt-secrets.sh` hit its SAFETY BLOCK (18 plaintexts newer than .enc) and decrypted nothing. But `config/.slack-accounts.json` plaintext was from 09-26 while its `.enc` was committed 10-19 with the new Meta-Stamp workspace, so Arthur's Meta-Stamp Slack source looked missing.
**Why:** the block is all-or-nothing, so one legit newer file stops every stale file from refreshing.
**How to apply:** if a config entry the skill/memory says exists is missing, compare `git log -1 --format=%ct -- <file>.enc` against the plaintext mtime. If the commit is newer, decrypt that ONE file (`openssl enc -aes-256-cbc -d -salt -pbkdf2 -pass pass:$SECRETS_KEY`), back up the old plaintext, and retest. Never `--force` all. Related: [[feedback_decrypt_secrets_clobbers_live_tokens]].
