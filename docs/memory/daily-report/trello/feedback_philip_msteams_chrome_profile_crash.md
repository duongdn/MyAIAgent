---
name: feedback_philip_msteams_chrome_profile_crash
description: MS Teams Puppeteer script (Philip check) crashed with SIGTRAP due to internal Chrome-profile corruption in tmp/msteams-will-profile, not a code/resource bug — fixed by rebuilding profile from auth data only
metadata:
  type: feedback
---

2026-07-13: `scripts/fetch-msteams-customer-messages.js will "Philip Briggs"` failed 3x with `TargetCloseError: Protocol error (Target.setAutoAttach): Target closed` on `puppeteer.launch()`. Initially looked like a resource/session conflict (other automation running) — it wasn't (17GB RAM free, no stale lock at first). Root cause found via direct diagnosis:

1. A fresh empty profile launched fine — isolated the problem to `tmp/msteams-will-profile` itself, not Puppeteer/Chrome/code.
2. Ran Chrome directly (bypassing Puppeteer) with that profile under `timeout N`: exit code 133 (128+5 = SIGTRAP), confirmed via `gdb -batch -ex run -ex bt` — a real internal Chrome `CHECK()`-style crash (not a puppeteer bug), stack unsymbolicated (`0xaaaa...` filler, typical of Chrome's `IMMEDIATE_CRASH()`).
3. `Local State` showed `variations_crash_streak: 2` — Chrome's own crash-loop detector had already flagged this profile.
4. Tried several targeted deletions (Sessions/Tabs, newer feature-cache dirs) — none fixed it alone.
5. **Fix:** rebuilt a fresh profile dir, copying ONLY the auth-bearing subdirs (`Cookies`, `Local Storage`, `IndexedDB`, `Session Storage`, `Login Data`, `Web Data`) from the corrupted profile into a clean `Default/` skeleton. Chrome launches fine and regenerates all its own scaffolding dirs (History, Favicons, etc.) automatically on first run.
6. **Caveat — don't delete `IndexedDB`:** mid-debugging, `IndexedDB` and `Session Storage` were deleted thinking they were just disposable app cache. This broke the org-tenant auth context — Teams started redirecting to `teams.live.com` with the generic MSA/consumer tenant GUID (`9188040d-6c67-4c5b-b112-36a304b66dad`) instead of the real org tenant, and got stuck forever on the loading splash screen (blank body, no crash, just hung). **`IndexedDB` holds real session/tenant-context data for Teams web — always carry it over when rebuilding a profile, never delete it as "just cache."**
7. Recovery from the IndexedDB-deletion mistake required one manual visible-browser (`DISPLAY=:1`) login by the user — after that, the script worked end-to-end (login → find chat → click chat) without further intervention.

**How to apply:** If any Puppeteer-driven script crashes on `puppeteer.launch()` with `Target.setAutoAttach`/`Target closed` errors specifically tied to ONE persistent profile dir (not reproducible with a fresh profile): suspect profile-internal corruption, not code. Diagnose with `timeout N <chrome-binary> ... --user-data-dir=<dir>` directly (bypass Puppeteer) and check the exit code/signal. If SIGTRAP/crash, rebuild the profile keeping `Cookies` + `Local Storage` + `IndexedDB` + `Session Storage` + `Login Data` + `Web Data` — never drop `IndexedDB`. Also see [[feedback_visible_browser_login_required]] if a login is needed after rebuilding.

**Also found in this session:** the script's own message-content extraction (`[search] Found N items` → click → extract) grabs a UI label ("Messages") instead of the actual message text — a separate, minor, non-blocking bug. Verified real chat content manually via screenshot instead of trusting the script's extracted output this run.
