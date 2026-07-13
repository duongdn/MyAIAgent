---
name: feedback_gui_automation_risk_on_shared_desktop
description: xdotool/screenshot-based GUI automation on DISPLAY=:1 operates on the user's real, live, shared desktop — a stale window ID or unfocused target can send keystrokes into the wrong window, including the user's own live terminal. Verify target window immediately before every keystroke, or abandon the approach.
metadata:
  type: feedback
---

**Incident, 2026-07-13 (Arthur/Meta-Stamp Piece 13 daily run):** attempting to recover a wiped Slack xoxc token (see `feedback_decrypt_secrets_clobbers_live_tokens` 2nd occurrence), used `xdotool search --name "Slack"` to find a just-opened Chrome window, then sent `xdotool key`/`xdotool type` WITHOUT re-verifying the window ID was still current/focused. A second search after a page reload returned a stale/reused window ID — the next `xdotool key`/`type` calls (global, not `--window`-scoped) landed on whatever window actually had focus, which turned out to be the user's own live orchestrator terminal (same DISPLAY, actively in use — the user was mid-conversation with the parent Claude Code session about an unrelated Upwork question at that exact moment). Screenshot confirmed no actual stray text was injected into the terminal (the visible prompt was clean, unrelated content), but it was a near-miss: a `javascript:...` string followed by Enter could easily have been submitted into the user's live session.

**Rule going forward:**
1. Before ANY `xdotool key`/`type` on `DISPLAY=:1` (or any shared display), re-run `xdotool search` and `xdotool getactivewindow`/`getwindowname` immediately beforehand — window IDs are not stable across page reloads/navigations and can silently point to a different window.
2. Prefer `xdotool key --window <id>` / `xdotool type --window <id>` (explicitly targeted) over global `key`/`type` (which goes to whatever has focus) whenever a specific window must receive the input.
3. Take a screenshot immediately after every keystroke batch to confirm the intended window actually received it — don't chain multiple blind actions.
4. **If the user is known/suspected to be actively using the same shared desktop at the same time (their own terminal window visible, other live app windows), STOP GUI automation entirely rather than risk cross-window interference.** This is not the same risk profile as an isolated headless browser profile — treat it like typing on someone else's keyboard while they're using it.
5. When recovery requires this level of interaction, it's reasonable to abandon the automated path, report the blocker + what evidence was gathered (e.g. "session confirmed alive via screenshot, but token extraction needs a moment on the real desktop"), and ask the user to do the remaining step themselves, rather than pushing further into a live shared display.

**Why this matters beyond the one incident:** any future skill/script that does `DISPLAY=:1 xdotool ...` (Matrix login, Discord token refresh, Upwork visible-browser login, this Slack recovery, etc.) touches the SAME real desktop the user works on. All of them carry this exact risk, not just this one script.
