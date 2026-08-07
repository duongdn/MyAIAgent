---
name: feedback_venv_python_abi_mismatch_broken_browser_cookie3
description: "Upwork 'failed, but works when run manually' = .venv Python ABI mismatch (3.12 binary + 3.13 packages) breaking browser_cookie3/lz4 — not an auth/login issue. Add system-python3 fallback."
metadata:
  node_type: memory
  type: feedback
---

**Symptom (recurring, finally diagnosed 2026-08-07):** Every daily-report run reports Upwork `login_failed` / `session_expired` for Rory/Aysar/Neural, but running the same script manually (interactive) "just works" — looking exactly like a flaky session. For weeks it was misread as "carrick's Chrome logged out" or "Cloudflare/session issue."

**Root cause — `.venv` Python ABI mismatch, NOT auth:** `.claude/skills/.venv` is broken at the structure level:
- venv `bin/python3` = **Python 3.12.3** (SOABI `cpython-312-x86_64-linux-gnu`)
- but its `site-packages` lives at `lib/python3.13/site-packages` and contains **CPython 3.13 `.so` extensions** (e.g. `lz4/_version.cpython-313-x86_64-linux-gnu.so`)

Python 3.12 cannot dlopen a 3.13 extension → `import lz4` raises `ModuleNotFoundError: No module named 'lz4._version'` → `browser_cookie3` (which imports lz4) fails → the cookie extractor script dies → 0 live cookies → falls back to stale stored cookies → Upwork redirects to login → `login_failed`/`session_expired`.

**Why some scripts worked:** `upwork-neural-check.js`, `upwork-memo-check.js`, `upwork-room-messages.js` all have a **fallback to system `python3`** (miniconda 3.13, which has matching lz4/browser_cookie3) in their cookie extraction. `upwork-weekly-hours.js` did NOT — it used the venv unconditionally, so it failed every run. Fixed 2026-08-07 by adding the same venv→system fallback loop.

**How to apply:**
1. When Upwork (or any browser_cookie3-based script) fails in a run but works manually → **suspect the venv ABI, not auth**. Run `python3 -c "import lz4, browser_cookie3"` in the venv; if it fails, it's this bug.
2. The durable fix for scripts is a **fallback loop**: try `.claude/skills/.venv/bin/python3` then `python3` (system/miniconda). Mirror the pattern already in `upwork-neural-check.js`/`upwork-weekly-hours.js`.
3. Proper venv repair (rebuild with a single consistent Python version) is still pending — see [[feedback_never_report_token_expired]] for the "silently fix, don't report as outage" ethos. Do NOT keep blaming carrick's Chrome session or Upwork auth for this.
