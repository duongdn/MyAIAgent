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

**Verified working 2026-08-07 09:40 (interactive re-run):** after the fallback was added to `upwork-weekly-hours.js`, re-ran all Upwork parts — `upwork-weekly-hours.js` (Rory 0:00, Aysar 12:50, Neural 0:00, all `status=success`), `upwork-neural-check.js` (20 msgs fetched), `upwork-memo-check.js --date=2026-08-06` (Aysar 2 memos valid/0 invalid). carrick's session was live all along (master_refresh_token valid to 08-20) — confirming this was never an auth issue. The cron box (mpfc-live) still fails Upwork for a separate reason (no carrick Profile 1) — known architecture limitation.

**Second root cause, fixed 2026-08-10:** the shared cookie extractor `scripts/get-carrick-upwork-cookies.py` ITSELF forced the broken venv's site-packages into ANY interpreter:
```python
venv = Path(__file__).parent.parent / '.claude' / 'skills' / '.venv' / 'lib'
for p in venv.glob('python*/site-packages'):
    sys.path.insert(0, str(p))
import browser_cookie3
```
So even scripts with a venv→system fallback loop failed: the JS fallback called system `python3`, but the python script then injected the broken venv packages anyway → lz4 ImportError. Fixed to prefer the interpreter's own working browser_cookie3, injecting venv only as a last resort:
```python
try:
    import browser_cookie3  # confirms current interpreter is usable
except ImportError:
    venv = Path(__file__).parent.parent / '.claude' / 'skills' / '.venv' / 'lib'
    for p in venv.glob('python*/site-packages'):
        sys.path.insert(0, str(p))
import browser_cookie3
```
Verified 2026-08-10: `python3 scripts/get-carrick-upwork-cookies.py` → 69 cookies, exit 0; all four Upwork scripts ran clean on first attempt. This was also the real cause of the 08-10 "manual re-auth needed" appearance — never an auth issue.

**How to apply:**
1. When Upwork (or any browser_cookie3-based script) fails in a run but works manually → **suspect the venv ABI, not auth**. Run `python3 -c "import lz4, browser_cookie3"` in the venv; if it fails, it's this bug.
2. The durable fix for scripts is a **fallback loop**: try `.claude/skills/.venv/bin/python3` then `python3` (system/miniconda). Mirror the pattern already in `upwork-neural-check.js`/`upwork-weekly-hours.js`.
3. **The shared cookie script must NEVER force the venv's site-packages into the interpreter** — prefer `import browser_cookie3` first, venv only as last resort (current state of `get-carrick-upwork-cookies.py`). If a script that "has a fallback" still fails, check whether the cookie script is clobbering `sys.path`.
4. Proper venv repair (rebuild with a single consistent Python version) is still pending — see [[feedback_never_report_token_expired]] for the "silently fix, don't report as outage" ethos. Do NOT keep blaming carrick's Chrome session or Upwork auth for this.
