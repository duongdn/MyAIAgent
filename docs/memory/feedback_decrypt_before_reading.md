---
name: Decrypt config files before reading
description: Always run decrypt-secrets.sh before reading config — .enc files may be newer than the .json files
type: feedback
---

Always run `bash scripts/decrypt-secrets.sh` before reading any config files in `config/`. The `.enc` files are the canonical source — the `.json` files can be outdated if they weren't re-decrypted after an update.

**Why:** The LegalAtoms Slack token appeared invalid because the `.json` file was from Mar 23 while the `.enc` file was from Mar 27. After decrypting, the token was valid and worked fine with `Authorization: Bearer` header.

**How to apply:**
- At the start of any session that reads config files, decrypt first
- Also note: Slack xoxp tokens require `Authorization: Bearer <token>` header (NOT `?token=` query param) for API calls
