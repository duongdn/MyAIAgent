---
name: feedback_philip_msteams_must_run
description: "Philip MS Teams check MUST run script fetch-msteams-customer-messages.js — never skip as \"not implemented\"; search results are ambiguous even with full name, must disambiguate by \"Six Star Rentals\" subtitle"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: eadc01d0-f29a-44b8-8009-792373f2d6cf
---

Philip (Six Star Rentals — pbriggs@sixstarrentals.com.au) is monitored via MS Teams using `will@nustechnology.com` account.

**Rule:** ALWAYS run `node scripts/fetch-msteams-customer-messages.js will "Philip Briggs"` for Philip's check. Never mark as "Not checked"/"not implemented"/"config missing" — the script exists, the config exists (`config/.msteams-accounts.json`, account `will`), and login is verified working end-to-end as of 2026-06-06.

**Why:** 2026-06-04 a subagent skipped it claiming "not implemented"; 2026-06-06 investigation found it had a real login-loop bug (now fixed) but the password/config were correct all along.

**How to apply:**
1. Run `node scripts/fetch-msteams-customer-messages.js will "Philip Briggs"` (use the FULL NAME — plain "Philip" matches ~113 ambiguous Teams contacts and the script blindly clicks the first match)
2. Check screenshot `tmp/msteams-09-chat-open.png` / `tmp/msteams-08-search-results.png` for the matched contact and `tmp/msteams-post-*.png` for message content
3. Alert only if new unresolved customer complaint or request since last check
4. No new message = complete Trello item
5. Last known message (confirmed 2026-06-25 via manual chat-header verification): 2026-06-16 — about the "Elevate365 Static Demo — Industry Selector / 80-User Model" spec (Banking & Lending industry priority). Nothing newer found as of 2026-06-25.

**Known remaining issues (as of 2026-06-25):**
- Searching even the FULL NAME "Philip Briggs" still returns 2+ ambiguous contacts: a plain "Philip Briggs" (unrelated internal/other contact — last activity label "6/16" in HIS row refers to a different thread) and "Philip Briggs (External)" with subtitle "Six Star Rentals" (the correct one). The script's selector chain (`[title*=...]`, `[aria-label*=...]`, `[data-tid*=...]`, falling back to ArrowDown+Enter) reliably picks the WRONG plain entry, not the External/Six Star Rentals one — confirmed by opening an unrelated "Banking productivity dashboard JSON spec" conversation multiple times in a row.
- **Reliable disambiguation that worked:** search "Philip Briggs", wait for the dropdown to render, find the DOM leaf node whose `textContent` is exactly `"Six Star Rentals"` (the subtitle), then click ~15px above its vertical position (i.e., on the name row directly above that subtitle), using `page.mouse.click(x, y)` — not a synthetic `el.click()` via `page.evaluate` (React ignores those for this list). After clicking, ALWAYS verify via `document.body.innerText` that it contains `pbriggs@sixstarrentals.com.au` and the "Philip Briggs is part of an external organization" banner before trusting the result.
- The persistent Chrome profile (`tmp/msteams-will-profile/`, ~635MB) can get into a state where the browser crashes immediately on launch (`Target.setAutoAttach: Target closed`) even after clearing `Singleton*`/`DevToolsActivePort` lock files — when that happens, `--clear-profile` (full wipe + fresh login) is needed; a fresh profile launches fine and the saved password logs back in without issue.
- Message-content extraction in the script itself still only captures the generic "Messages" pane header, not real content — the manual `document.body.innerText` dump (see above) is the reliable fallback, not the script's parsed `messages` output.
