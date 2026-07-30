# Phase 05 — Docs + dual memory update

## Context Links

- Mandate: `CLAUDE.md` → "Dual Memory System (MANDATORY)" — save to **BOTH** stores, no exceptions
- `.claude/rules/documentation-management.md` (expects `docs/system-architecture.md`, `docs/project-changelog.md`)
- Memory index (project): `docs/memory/MEMORY.md` · Memory index (Claude): `~/.claude/projects/-home-nus-projects-My-AI-Agent/memory/MEMORY.md`
- Sibling entries to match in tone/length: `docs/memory/finance-report/project_finance_report_detail_skill.md`,
  `reference_cafef_data_source.md`

## Overview

- **Priority:** P2 (but non-optional — the dual-memory rule is NON-NEGOTIABLE)
- **Status:** pending
- **Effort:** 0.5h
- Record the new skill, the shared spreadsheet, the derived-market-data technique, and the new deployed
  service in both memory stores + the docs tree, so the next session does not re-derive any of it.

## Key Insights

- **Verified gap:** `docs/` currently contains only `daily-report-workflow.md`,
  `weekly-monitor-workflow.md`, `training-plan-dotnet-beginner.md`, `assets/`, `guides/`, `memory/`,
  `recovery/`. `docs/system-architecture.md` and `docs/project-changelog.md` **do not exist** despite
  being referenced by `.claude/rules/documentation-management.md:5-6`. They must be created — scoped to
  what is true and known, not a speculative full-repo architecture doc (YAGNI).
- Both memory stores already have a `finance-report/` section with 6 files each and matching filenames
  → the new entries belong in the same section, same naming scheme (`project_*`, `reference_*`, `feedback_*`).
- What belongs in memory (per the memory-type guidance): the *non-obvious* decisions and gotchas.
  What does **not**: file paths and code structure that a `grep` recovers. So: record the derivation
  trick, the bank-abort rule, the shared-spreadsheet decision, the deploy coordinates — not the
  function-by-function layout.

## Requirements

### Functional
- FR1 New memory file (both stores): `finance-report/project_finance_quantification_skill.md` —
  what the skill is, the ONE shared spreadsheet ID, tab naming, that it is deliberately NOT the
  6-sheet flow, that **`scripts/finance-quantification-build.js` is the single source of truth and both
  the `/me:` command and the web app just shell out to it**, and that the shared spreadsheet's title
  (`Định tính`) + empty `Sheet1` are **intentionally left alone** — do not "fix" them.
- FR2 New memory file (both stores): `finance-report/reference_vietstock_market_data_derivation.md` —
  `getpricehistory` returns `ClosePrice` + `MarketCapital`; shares = mcap/price (exact on FPT/VEA/SAB/VCB);
  P/E and P/B are computed as sheet formulas, never scraped; cafef `TypeTime=QUY` EPS code `70` for TTM.
- FR3 New memory file (both stores): `finance-report/feedback_bctc_row_codes_not_row_numbers.md` —
  hardcoded row numbers are FPT/VEA/SAB-only; VCB's CDKT template has 47 asset rows starting at code
  `110` with no `270`; resolve by `code` and hard-abort on unsupported charts of accounts.
- FR4 New memory file (both stores): `global/project_quantification_web_service.md` — domain, port 3335,
  unit name, separate htpasswd path, credentials location (`config/.quantification-auth.json[.enc]`),
  Cloudflare-proxied, certbot apache authenticator, and that the app spawns the **build script
  directly** (no `claude -p`), streaming its `PROGRESS:`/`DONE:`/`ERROR:` lines over SSE.
- FR5 Both `MEMORY.md` indexes updated with one-line pointers (< 150 chars each, existing style).
- FR6 `docs/system-architecture.md` created with a **Deployed services** table (dailyagent + the new
  app: domain, port, unit, vhost, auth realm) and a short note on the deliberate SSE code duplication.
- FR7 `docs/project-changelog.md` created with the first entry for this feature.
- FR8 `README.md` — add the new command to whatever skill/command list it carries (verify it has one first).

### Non-functional
- `MEMORY.md` files stay within their line budget (Claude index is read into every session context).
- No credentials in any memory or docs file — reference the config path only.

## Architecture

```
docs/memory/finance-report/         ──┐
docs/memory/global/                   │  same 4 files, byte-identical content,
docs/memory/MEMORY.md                 │  written to BOTH trees
                                      │
~/.claude/projects/-home-nus-projects-My-AI-Agent/memory/finance-report/
~/.claude/projects/.../memory/global/
~/.claude/projects/.../memory/MEMORY.md
```

Each memory file: frontmatter (`name`, `description`, `metadata.type`) + body; `feedback_*`/`project_*`
bodies lead with the rule/fact then **Why:** and **How to apply:** lines; cross-link with `[[name]]`.

## Related Code Files

**Create (×2 — project tree and Claude tree):**
- `finance-report/project_finance_quantification_skill.md`
- `finance-report/reference_vietstock_market_data_derivation.md`
- `finance-report/feedback_bctc_row_codes_not_row_numbers.md`
- `global/project_quantification_web_service.md`

**Create (repo docs):**
- `docs/system-architecture.md`
- `docs/project-changelog.md`

**Modify:**
- `docs/memory/MEMORY.md` (add 4 pointers under `## Global` and `## finance-report`)
- `~/.claude/projects/-home-nus-projects-My-AI-Agent/memory/MEMORY.md` (same 4 pointers)
- `README.md` (command list, if present)

## Implementation Steps

1. Write the four memory files into `docs/memory/...` with the exact frontmatter shape used by
   existing siblings (open `docs/memory/finance-report/reference_cafef_data_source.md` first and match it).
2. Copy the identical four files into the Claude memory tree at the mirrored paths.
3. Add pointer lines to both `MEMORY.md` files — `- [Title](path.md) — one-line hook`, under
   `## finance-report` (3 files) and `## Global — every command` (the web-service one). Note that
   `docs/memory/MEMORY.md` currently has no `## finance-report` section header in the same form as the
   Claude index — check and match whichever structure that file uses rather than assuming.
4. Create `docs/system-architecture.md`: purpose, then a **Deployed services (mpfc, 142.93.46.109)**
   table — `dailyagent.mypersonalfootballcoach.com` / 3334 / `mydailyagent-web.service` / shared
   `.htpasswd` / spawns `claude -p` agents, and `quantification.youragentstore.net` / 3335 /
   `mydailyagent-quantification.service` / `.htpasswd-quantification` / spawns a deterministic script —
   plus the Apache-not-nginx note, the Cloudflare-in-front note, the deliberate ~60-line SSE-plumbing
   duplication between `web/server.js` and `web-quantification/lib/run-manager.js` (and why: independent
   deployability), and the "both apps share `/var/www/MyDailyAgent/node_modules` → no new deps without
   checking the other app" constraint.
5. Create `docs/project-changelog.md` with a dated entry: new `/me:finance-quantification` command,
   new scripts, new shared spreadsheet, new deployed service, and the row-code fix rationale.
6. `grep -n "finance-report\|me:" README.md` → if a command list exists, add the new command there;
   if not, skip and say so (do not invent a section).
7. Verify: `grep -rn "quantification" docs/ README.md | wc -l` > 0 in both trees; and
   `grep -rniE "password|api_token|secret" docs/memory/**/quantification*` returns nothing but the
   config *path*.
8. Commit docs + memory in a single `docs:` commit.

## Todo List

- [ ] 1. Four memory files in `docs/memory/`
- [ ] 2. Mirrored into `~/.claude/projects/.../memory/`
- [ ] 3. Both `MEMORY.md` indexes updated
- [ ] 4. `docs/system-architecture.md` created (deployed-services table)
- [ ] 5. `docs/project-changelog.md` created (first entry)
- [ ] 6. `README.md` command list updated (or explicitly skipped)
- [ ] 7. Secret-leak grep + presence grep
- [ ] 8. `docs:` commit

## Success Criteria

- The four memory files exist at **both** locations with identical content (`diff` clean).
- Both `MEMORY.md` files link them; the Claude index is still under its line budget.
- `docs/system-architecture.md` lists both deployed services with correct port/unit/vhost/auth-file —
  cross-checked against `systemctl` and `apache2ctl -S` output from phase 04, not from memory.
- `docs/project-changelog.md` has a dated entry naming every created file.
- No secret value appears anywhere in `docs/` (grep clean).
- A fresh session asking "how do I run the định lượng analysis for a new ticker?" can answer from
  memory + docs alone, without re-probing any endpoint.

## Risk Assessment

| Risk | L×I | Mitigation |
|------|-----|-----------|
| Memory written to only one store (recurring failure mode this rule exists for) | **M**×M | `diff -r` the two `finance-report/` dirs as an explicit success criterion |
| Docs drift from the real server config | M×M | Populate the table from live `systemctl`/`apache2ctl -S` output captured in phase 04, and record the capture date |
| Credentials pasted into a memory/docs file for convenience | L×**H** | Explicit grep gate in step 7; memory stores the config *path*, never the value |
| Claude `MEMORY.md` grows past the 200-line truncation point | L×M | One line per entry, ≤150 chars, reuse the existing compressed style |
| Creating `system-architecture.md` invites scope creep into documenting the whole repo | M×L | Scope it to deployed services + this feature; a full backfill is a separate task |

## Security Considerations

- Memory/docs are committed to git → treat as public-ish. Only non-secret identifiers (domain, port,
  unit name, spreadsheet ID, config *paths*).
- Do not record the LE account email or the htpasswd hash.

## Rollback

- Revert the `docs:` commit; delete the mirrored files from the Claude memory tree (not in git, so
  remove manually) and revert both `MEMORY.md` edits.

## Next Steps

- Optional follow-up: `/ck:journal` entry if the certbot/Cloudflare path required a fallback.
- Backlog captured in memory: migrate the 6-sheet flow's `build-dinh-luong`/`fetch-liquidity` onto the
  new code-resolved libs; add the new service to `/me:server-monitor`.

## Decisions (locked)

- `docs/system-architecture.md` is scoped to **deployed services + this feature only**. A full-repo
  architecture backfill is a separate task.
- `docs/development-roadmap.md` (referenced by `.claude/rules/documentation-management.md:4`, also
  missing) stays **out of scope**.

No open questions.
