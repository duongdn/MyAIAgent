---
name: feedback_workstream_display_outage_pattern
description: Workstream SSO login has failed 3x in ~1 week (07-26, 07-31, 08-01) with identical symptom — likely an environment/DISPLAY issue on this server, not per-run credential expiry
metadata:
  type: feedback
---

**Pattern:** `DISPLAY=:1 node scripts/workstream-login.js` (and the dependent `workstream-fetch-project-week.js`) has failed with the exact same symptom — "Clicked Sign in with SSO... Failed to capture token" — on 2026-07-26 (4 attempts), 2026-07-31 daily report ("fully unreachable... no live browser/DISPLAY available in this session, distinct from a credential-expiry issue"), and 2026-08-01 weekly report (2 full-wait attempts). One success in between (2026-07-25, via existing SSO cookies with no manual click needed).

**Why this matters:** Each occurrence has been treated as a fresh, isolated credential-expiry incident and retried blindly per [[feedback_visible_browser_login_required]]. Three failures in ~1 week with an identical error string is a pattern, not noise — worth checking whether this server's Chrome/DISPLAY setup itself is broken (e.g. `tmp/workstream-browser-profile` corruption, Xvfb :1 health, puppeteer launching `--headless=new` even when DISPLAY is set) rather than re-running the same login script and hoping.

**How to apply:** Next time Workstream SSO fails, before just retrying: (1) check Xvfb :1 is actually healthy (`xdotool getdisplaygeometry` or similar), (2) check whether `tmp/workstream-browser-profile` needs a rebuild (same class of fix as [[feedback_msteams_stale_profile]]), (3) confirm the browser is launching with a real visible window and not silently falling back to `--headless=new` regardless of DISPLAY. Don't burn another full 5-minute wait on attempt #4 without ruling out an environment cause first — escalate to the user if the same fix pattern keeps failing.
