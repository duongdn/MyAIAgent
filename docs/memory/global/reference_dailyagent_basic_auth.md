---
name: reference_dailyagent_basic_auth
description: Where dailyagent.mypersonalfootballcoach.com Basic Auth credentials live and how they were last rotated
metadata:
  type: reference
---

`https://dailyagent.mypersonalfootballcoach.com/` (the MyDailyAgent web UI on [[project_mpfc_cron_server]]) is gated by Apache Basic Auth, realm `MyDailyAgent`.

- **Server-side:** `/etc/apache2/.htpasswd` on `mpfc.mpfc.live` (user `mpfc`). This htpasswd file is **shared with the `admin` vhost** — only ever update the `mpfc` entry (`sudo htpasswd -b /etc/apache2/.htpasswd mpfc <newpass>`), never `-c` (recreate), or the admin vhost's credential is wiped too.
- **Local credential copy:** `config/.dailyagent-auth.json` (gitignored plaintext) / `config/.dailyagent-auth.json.enc` (committed, AES-256-CBC via `scripts/encrypt-secrets.sh`). Decrypt with `scripts/decrypt-secrets.sh`.
- Last rotated 2026-08-19 (user request). Verified via `curl` before/after: no-auth → 401, correct → 200, wrong → 401.

**How to apply:** Never ask the user to recall this password — read `config/.dailyagent-auth.json` (decrypt first if only `.enc` present, per [[feedback_decrypt_before_reading]]). If rotating again, use `htpasswd -b` (update, not `-c`) and re-run `encrypt-secrets.sh config/.dailyagent-auth.json` per [[feedback_decrypt_secrets_clobbers_live_tokens]] conventions (explicit file arg only, never bulk).
