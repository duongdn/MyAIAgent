---
name: feedback_verify_config_history_before_blaming_external_credential
description: When multiple accounts on the same service break simultaneously, check recent git history of the config file BEFORE concluding it's an external (Zoho/etc) credential expiry
metadata:
  type: feedback
---

2026-07-10: reported "5 Zoho accounts (carrick/nick/rick/kai/ken) all return Invalid credentials, needs new app passwords" as an unfixable external blocker — twice, across two report sections, without checking git history first. User pushed back ("this commit should be relative") after noticing a large config-file commit the night before. Git archaeology found the real cause in 10 minutes: commit `2c8240f` (2026-07-09 22:38+07) had silently overwritten all 5 accounts' `app_password` with different, non-working values, and dropped `davidztv19@gmail.com` entirely. The pre-22:38 passwords, decrypted from the previous commit and tested live, worked immediately — proving it was our own commit history that broke it, not Zoho.

**Why this matters:** "N accounts broke at the same time" is a strong signal to check `git log -- config/<file>.enc` before writing "needs new credentials" — a real simultaneous multi-account provider-side break is rare; a bad commit touching the shared config file is common and cheap to rule out.

**How to apply, whenever 2+ accounts on the same config file/service fail simultaneously:**
1. `git log --format="%h %ad %s" --date=iso-strict -- config/<file>.enc` — look for a recent commit right before the failures started.
2. Decrypt old vs new blob at that commit (`git show <hash>^:path.enc` / `git show <hash>:path.enc`, then `openssl enc -aes-256-cbc -d -salt -pbkdf2 -pass "pass:$SECRETS_KEY"`) and diff the JSON.
3. If the old values differ from the new (not just re-encryption noise — same content re-encrypts to a same-length-ish blob but decrypts identically), **test the OLD credential live** before assuming either version is "right."
4. If the old one works, restore it via `scripts/lib/save-secret-config.js`'s `saveSecretConfig()` (never hand-edit + forget to re-encrypt) and re-verify live.
5. Only conclude "needs new credentials from the provider" once you've ruled out our own config history as the cause.

**Unresolved:** root cause of *why* commit `2c8240f` wrote wrong passwords was not found — no session/report log exists for that exact timestamp beyond an unrelated Matrix scan. If this recurs, check whether an agent session was running unattended around the time of any future corrupting commit.
