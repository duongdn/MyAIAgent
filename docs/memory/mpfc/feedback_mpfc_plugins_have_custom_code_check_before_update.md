---
name: mpfc-plugins-have-custom-code-check-before-update
description: MPFC WP plugins contain custom code (MemberMouse, json-api-auth, duplicate-page, json-api...) — check live git log + diff vs wp.org before any plugin update
metadata:
  type: feedback
---
Many MPFC plugins are forked with custom code. `wp plugin update` silently overwrites it.
Known custom (live git log, 2026-10-15): membermouse (27 commits), json-api (281, mobile API), json-api-auth (29, app login), essential-grid (26), video-library-manager (38), collections, duplicate-page (notification logic), wp-courseware, gravityforms. "Fix warning" commits only = safe to update.

**Why:** 2026-10-15 upgrade test — update wiped MemberMouse/json-api-auth/duplicate-page customizations; had to restore from backup.
**How to apply:** before updating any MPFC plugin: `cd wp-content/plugins && git log --format=%s -- <plugin>` on live (ignore "Import code from server"/"Ad plugin"/"Fix warning"), and diff vs same-version wp.org zip. Restore/port custom ones. Details: plans/mpfc-upgrade/test-results.md §7. Related: [[reference_mpfc_digitalocean_token_and_infra]]
