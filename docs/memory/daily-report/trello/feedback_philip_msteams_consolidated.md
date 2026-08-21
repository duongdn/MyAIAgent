---
name: feedback_philip_msteams_consolidated
description: "Philip (Six Star Rentals) MS Teams check via will@nustechnology.com — must always run, disambiguate contact by Six Star Rentals hint, and watch for stale/corrupted browser profile"
metadata:
  type: feedback
---

Philip (Six Star Rentals — pbriggs@sixstarrentals.com.au) is monitored via MS Teams using the `will@nustechnology.com` account.

## Always run it

**Rule:** ALWAYS run `node scripts/fetch-msteams-customer-messages.js will "Philip Briggs"` for Philip's check. Never mark as "Not checked"/"not implemented"/"config missing" — script, config (`config/.msteams-accounts.json`, account `will`), and login are confirmed working end-to-end. (2026-06-04 a subagent skipped it claiming "not implemented" — it wasn't.)

- Use the FULL NAME — plain "Philip" matches ~113 ambiguous Teams contacts.
- Check screenshot `tmp/msteams-09-chat-open.png` / `tmp/msteams-08-search-results.png` for the matched contact and `tmp/msteams-post-*.png` for message content.
- Alert only if new unresolved customer complaint/request since last check; no new message = complete Trello item.

## Contact disambiguation (search returns duplicates)

Search for "Philip Briggs" returns 8+ duplicate contacts. Only one is correct: **"Philip Briggs (External) — Six Star Rentals"**. The generic `[aria-label*="Philip Briggs"]` click grabs the first match, usually a wrong/stale duplicate — resulting screenshot shows the search-results panel, not the real chat.

**Permanent fix (2026-07-14):** `scripts/fetch-msteams-customer-messages.js` now disambiguates automatically via a `disambiguateHint` param — click logic prefers any search-result element whose text contains "External" or the hint, read from `config/.msteams-accounts.json` → `customerHints` map (`{"Philip Briggs": "Six Star Rentals"}`). No env var/manual flag needed.

🔴 **This "permanent" fix has regressed before (2026-08-13)** — `customerHints` key was found entirely missing from the config (root cause not identified, possibly a manual edit or a regenerating script that drops extra keys). Fix is a one-line config re-add: `{"customerHints": {"Philip Briggs": "Six Star Rentals"}}`, then `bash scripts/encrypt-secrets.sh config/.msteams-accounts.json` to persist past the next decrypt. **Any time Philip's check lands on the wrong contact again, check this key exists before re-diagnosing the click logic.**

If the script still can't be made to target the right contact: treat MS Teams Philip as unverified for that run (leave Trello item incomplete) rather than trusting a wrong-contact screenshot. Manual fallback verification that worked: find the DOM leaf node whose `textContent` is exactly `"Six Star Rentals"`, click ~15px above its position via `page.mouse.click(x, y)` (not `el.click()` via `page.evaluate` — React ignores synthetic clicks for this list), then confirm `document.body.innerText` contains `pbriggs@sixstarrentals.com.au` and the "external organization" banner. New name → add a distinguishing hint to `customerHints` — don't re-diagnose from scratch.

Message-content extraction in the script only captures the generic "Messages" pane header, not real content — the manual `document.body.innerText` dump above is the reliable fallback, not the script's parsed `messages` output.

## Browser profile issues (`tmp/msteams-will-profile/`)

Two distinct failure modes seen on this persistent profile:

**1. Stale session → Microsoft "unusual activity" challenge.** A profile whose `Cookies` file is old (weeks) can trigger Microsoft's risk detection, showing an "unusual activity" page that looks like it needs interactive SMS/authenticator — but the session is often still valid. Misdiagnosed as "needs interactive auth" 3+ times. **Before declaring that, retry once** — a plain re-run (no `--clear-profile` needed) frequently resolves it since the risk page is a transient detection.

**2. Profile-internal Chrome corruption → SIGTRAP crash on launch.** `Target.setAutoAttach: Target closed` / `TargetCloseError` on `puppeteer.launch()`, reproducible only with THIS profile dir (a fresh empty profile launches fine). Confirmed via direct `chrome --user-data-dir=<dir>` run under `gdb`: real internal Chrome crash, `Local State`'s `variations_crash_streak` counter was already incremented — Chrome's own crash-loop detector had flagged the profile. Clearing `Singleton*`/`DevToolsActivePort` lock files alone does not fix this.
- **Fix:** rebuild the profile, copying ONLY the auth-bearing subdirs (`Cookies`, `Local Storage`, `IndexedDB`, `Session Storage`, `Login Data`, `Web Data`) into a clean `Default/` skeleton — Chrome regenerates the rest (History, Favicons, etc.) on first run.
- **Never drop `IndexedDB`** thinking it's disposable cache — it holds the real org-tenant auth context. Deleting it made Teams redirect to the generic MSA/consumer tenant (`teams.live.com`, GUID `9188040d-6c67-4c5b-b112-36a304b66dad`) and hang on a blank loading splash forever. Recovering from that required one manual visible-browser (`DISPLAY=:1`) login.
- If rebuilding still fails or a fresh login is needed after rebuild, `--clear-profile` (full wipe) works — saved password logs back in without issue. See also [[feedback_visible_browser_login_required]].

**How to apply generally:** if a Puppeteer script crashes on `puppeteer.launch()` tied to one persistent profile dir (not reproducible with a fresh profile) — suspect profile-internal corruption, not code. Diagnose with a direct `timeout N <chrome-binary> --user-data-dir=<dir>` call and check the exit code/signal before assuming a resource/session conflict.
