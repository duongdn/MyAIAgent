# MPFC Team Manager Upgrade (Saul brief 22 Oct 2026)

Source: `Team Manager Upgrade — Web Developer Brief.pdf` (text: scratchpad `mpfc-specs/tm-upgrade.txt`).
Server: `mpfc.mpfc.live` `/var/www/mypersonalfootballcoach.com`, branch `live`. Main files: `themes/pfc7/template-team-manager.php`, `inc/teamManager.php`, `js/custom.js`, `plugins/video-library-manager`, `inc/league-tables.php`, `inc/idp.php`.

## Phases (customer's order)
| # | Phase | Status | Est |
|---|-------|--------|-----|
| 0 | Fix now: upload approval default, UK dates | ✅ done `f151a5fcf` | – |
| 0b | Fix now: app data feed (Last App Login etc.), "—" not 0 | needs Tien | 1d |
| 1 | Roles (player/coach/manager) + Players/Coaches toggle, coach team keys, Add coach, CSV role col, new 5-item nav | todo | 4–5d |
| 2 | Set training plans: length, search picker, club docs upload, note, reflection opts, who (1/ticked/key), history | todo | 5–6d |
| 3 | Plans page statuses + Remind (push+email, 1/3d), Coaching log (reflections, content filter) | todo | 4d |
| 4 | Leagues: from team keys, players only, hide switch, min 6 → merge to parent, first name + initial | todo | 3d |
| 5 | Signed server-to-server feed app↔web (HMAC), docs in api-docs | todo, with Tien | 3d |

Total ≈ 20–23 dev days + QA.

## Phase 0 done
- `vlm_default_video_active_*` default `'0'` (Requires Approval) in vlm-manager.php, dashboard.php, wp_ajax_functions.php; all 5 existing club options set to 0 (1157, 150 were Active).
- Dates `j M Y` / `j M Y, H:i`; datepicker shows `d M yy`, hidden altField keeps posting `mm/dd/yy` (server parser unchanged). Browser-tested.
- Country-based switch not done: all clubs UK now; add US format only if a US club exists.

## Key decisions / conflicts
- Leagues: brief requires parent merge when <6 — contradicts our Q5 reply to Tien (fallback = club-wide). Correct with Tien.
- Coaches must be excluded from leagues → depends on Phase 1 roles.
- Feed must be signed server-to-server; current IDP/LT endpoints use player cookie. Keep cookie endpoints for app UI reads; add signed endpoints for events.
- Web never calculates XP (keeps our `session_complete` XP logic on app-sent data only — review).

## Unresolved questions (for Saul)
- Club document allowed types/size (propose PDF ≤20MB, MP4 ≤200MB).
- Keep old "Player's training clocks"?
- Reflection default shared with director? (Saul decides)
- Order of work OK?
- Country-based date: any non-UK club needing US format?
