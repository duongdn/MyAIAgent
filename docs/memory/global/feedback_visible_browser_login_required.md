---
name: feedback_visible_browser_login_required
description: Any expired login session (Upwork, Matrix, etc.) must be retried via a visible DISPLAY=:1 browser the user can log into directly — never just print "session expired, headless re-login failed" as passive status text
metadata:
  type: feedback
---

Rule: when any account session is expired (Upwork, Matrix, or similar), do not just write "session expired — headless re-login failed" as a quiet table row and move on. Always retry with a visible browser (`DISPLAY=:1 node scripts/<x>-login.js --login --account=<name>`) so the user can log in directly if headless fails/hits CAPTCHA. If it STILL can't be resolved after that, it must go into the ALERTS SUMMARY as a real alert line — not sit as passive status text buried in a per-source table.

Why: user said (2026-07-09) "again, never give me this one, you must open window so I can help you login, and alert if this not happen, not a normal text" — reacting to a stale "Rory (carrick) session expired — headless re-login failed (CAPTCHA/2FA)" line that was never actually rechecked with a visible browser that run (carrick's session was in fact fine once retried visibly). This is the same lesson as [[feedback_matrix_never_use_device_auth]] — visible-browser-the-user-can-click, not passive/silent failure text, and not a code-only fallback either.

How to apply: for Upwork specifically — try `DISPLAY=:1 node scripts/upwork-login.js --login --account=<name>` before ever writing "expired" in a report. For any other login-gated source, same pattern. Only after a genuine visible-browser attempt fails (or the user explicitly can't get to it) does "session issue" belong in the report — and even then as an ALERTS SUMMARY line, not a passive sub-table row.
