# Plan: Prevent Encrypt/Decrypt Token Clobber Forever

**Status:** Planning  
**Priority:** 🔴 Critical — same bug recurred 4+ times  

---

## Root Cause (confirmed Jul 28)

Three interacting weaknesses:

1. **`encrypt-secrets.sh` (no-arg bulk mode)** — encrypts ALL 24 config files from whatever plaintext is on disk. If plaintext has been clobbered by a prior `decrypt-secrets.sh`, stale data gets locked into `.enc` permanently.

2. **`decrypt-secrets.sh` (bulk decrypt)** — called from post-merge hook and daily-report step 2, overwrites ALL plaintext files including freshly-refreshed tokens like Bitbucket.

3. **`.githooks/post-merge`** — runs `decrypt-secrets.sh` on EVERY merge/pull, not just when `.enc` files actually changed, causing unnecessary mass clobber.

**Timeline of Jul 28 incident:**
- Jul 15: working token `=66B4AA4B` saved → `.enc` committed
- Jul 18-21: token intact in `.enc`
- Some point between Jul 21-25: `decrypt-secrets.sh` clobbered plaintext with stale `.enc` containing dead token `=4CAEE0F8`
- Jul 25 09:59: some process ran `encrypt-secrets.sh` (no arg) → dead token locked into `.enc` commit `198b7d2`
- Jul 28: daily report uses dead token → 401

---

## Fix: Three Layers of Defense

### Layer 1 — Kill bulk encrypt (CRITICAL)

**`scripts/encrypt-secrets.sh`:**
- Remove no-arg bulk loop (lines 36-76)
- Replace with error: "Must specify file(s). Bulk mode disabled to prevent stale-token corruption."
- Support multiple file args: `encrypt-secrets.sh config/.foo.json config/.bar.json`
- Single-file mode (used by `saveSecretConfig`) unchanged

**Why:** No process anywhere in the codebase legitimately calls `encrypt-secrets.sh` without args. The `saveSecretConfig` helper always passes a file. Auto-commit pipeline does NOT call encrypt. Killing bulk mode eliminates the entire corruption vector.

### Layer 2 — Smarter post-merge (IMPORTANT)

**`.githooks/post-merge`:**
- Instead of running `decrypt-secrets.sh` (decrypts ALL files)
- Only decrypt the `.enc` files that actually changed in the merged HEAD
- One-liner: loop over `git diff-tree --name-only -r HEAD | grep '\.enc$'` and decrypt each

**Why:** Post-merge currently clobbers ALL plaintext on every merge, even merges that only touched `.monitoring-timelines.json` or a report. This is the most common trigger of the decrypt-clobber pattern.

### Layer 3 — decrypt safety prompt (NICE-TO-HAVE)

**`scripts/decrypt-secrets.sh`:**
- Before decrypting any file, check if its plaintext mtime is newer than its `.enc` mtime
- If ANY plaintext is newer: print WARNING listing those files + "These were edited since last encrypt and WILL be overwritten. Continue? (y/N)"
- Non-interactive (cron) mode: skip those files, decrypt the rest
- Add `--force` flag to skip check

**Why:** Catches the case where someone refreshed a token but forgot to encrypt, then a decrypt run silently destroys it.

---

## Files to Change

| File | Change |
|------|--------|
| `scripts/encrypt-secrets.sh` | Kill bulk mode, require file args |
| `.githooks/post-merge` | Only decrypt changed `.enc` files |
| `scripts/decrypt-secrets.sh` | Add mtime-safety check + `--force` |

---

## After Fix: Recheck Daily Report

Fix Bitbucket section in today's report (was `⚠️ skipped` due to dead token) → re-run with working token → commit corrected report.
