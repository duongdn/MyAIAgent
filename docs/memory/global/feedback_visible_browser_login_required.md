---
name: feedback_visible_browser_login_required
description: Any expired login session (Upwork, Matrix, etc.) must be retried via a visible DISPLAY=:1 browser the user can log into directly — never just print "session expired, headless re-login failed" as passive status text
metadata:
  type: feedback
---

Rule: when any account session is expired (Upwork, Matrix, or similar), do not just write "session expired — headless re-login failed" as a quiet table row and move on. Always retry with a visible browser (`DISPLAY=:1 node scripts/<x>-login.js --login --account=<name>`) so the user can log in directly if headless fails/hits CAPTCHA. If it STILL can't be resolved after that, it must go into the ALERTS SUMMARY as a real alert line — not sit as passive status text buried in a per-source table.

Why: user said (2026-07-09) "again, never give me this one, you must open window so I can help you login, and alert if this not happen, not a normal text" — reacting to a stale "Rory (carrick) session expired — headless re-login failed (CAPTCHA/2FA)" line that was never actually rechecked with a visible browser that run (carrick's session was in fact fine once retried visibly). This is the same lesson as [[feedback_matrix_never_use_device_auth]] — visible-browser-the-user-can-click, not passive/silent failure text, and not a code-only fallback either.

How to apply: for Upwork specifically — try `DISPLAY=:1 node scripts/upwork-login.js --login --account=<name>` before ever writing "expired" in a report. For any other login-gated source, same pattern. Only after a genuine visible-browser attempt fails (or the user explicitly can't get to it) does "session issue" belong in the report — and even then as an ALERTS SUMMARY line, not a passive sub-table row.

**2026-07-25 addendum — don't wrap these scripts in a shorter external timeout than their own internal wait.** `scripts/workstream-login.js` (like the Matrix refresh scripts) has its own internal 5-minute wait loop for a human to complete SSO. Ran it as `timeout 45 node scripts/workstream-login.js` — the external 45s timeout killed the browser long before the user had any real chance to notice/click it, producing a false "Failed to capture token" a full ~4 minutes before the script's own designed wait would have ended. Re-ran without the external timeout and it succeeded on the very next attempt via existing SSO session cookies (no manual click even needed). **Never externally timeout-wrap a script whose whole design is "wait N minutes for a human" with a shorter duration — either don't wrap it at all, or set the wrapper timeout comfortably above the script's documented internal wait.**
