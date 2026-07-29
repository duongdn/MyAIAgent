# Phase 06 — Docs, dual memory, staged rollout

**Priority:** P2 · **Status:** pending · **Effort:** 1h
**Blocked by:** Phase 04, Phase 05 · **Blocks:** —

## Context links

- [plan.md](plan.md) · [phase-04](phase-04-daily-report-piece-integration.md) · [phase-05](phase-05-health-check-supervision.md)
- `CLAUDE.md` — "Dual Memory System (MANDATORY)"
- `.claude/rules/documentation-management.md` — docs update protocol

## Overview

Close the loop: write the memories that stop this being re-learned, update project docs, and
roll the piece out in stages rather than switching it fully on.

## Key insights

- **Dual memory is mandatory and non-negotiable** (`CLAUDE.md`): every memory must be written to
  BOTH `~/.claude/projects/-home-nus-projects-My-AI-Agent/memory/` **and** `docs/memory/`, each
  with its own `MEMORY.md` index line.
- There is a **third, invisible memory store** on the cron host
  (`~/.claude/projects/-var-www-MyDailyAgent/memory/`) that only receives `docs/memory/` via
  git. So the repo-side memory is the only one the cron sessions will ever see — the piece's
  operating rules **must** land in `docs/memory/daily-report/`, not only in the local store.
- `docs/memory/MEMORY.md` is organised by command with `## daily-report:{piece}` sections — a
  new `## daily-report:personal-im` section is the right home.
- Memory rules that already constrain this work and must be cross-linked, not restated:
  `feedback_never_send_messages_without_permission`, `feedback_never_report_token_expired`,
  `feedback_no_dated_scan_scripts`, `project_mpfc_cron_server`.

## Requirements

**Functional**
1. Memories written to both stores + both indexes.
2. `docs/` updated per the documentation-management rules.
3. Staged rollout with an explicit "stable" decision point.

**Non-functional**
- `MEMORY.md` index lines ≤ ~150 chars, one line per memory (index, not content).

## Memories to write (both stores)

| Name | Type | Content (lead / **Why** / **How to apply**) |
|------|------|---------------------------------------------|
| `project_personal_im_piece` | project | Piece 15 exists; listener is a persistent gateway on mpfc; the fetch script holds no credentials. **Why:** neither platform offers history-fetch for a cron. **How:** never "fix" this by making the piece log in itself |
| `feedback_personal_im_listener_must_be_single_host` | feedback | Exactly one host may hold the WhatsApp/Zalo session. **Why:** WhatsApp ratchet keys rotate per message (two hosts ⇒ logout loop); Zalo permits one web listener. **How:** never copy `tmp/whatsapp-auth`, never enable these channels on the local box |
| `feedback_personal_im_stale_listener_is_an_alert` | feedback | A stale heartbeat is an ALERT, not a silent 0. **Why:** "no messages" and "we were blind all night" are different findings and collapsing them hides real misses. **How:** the `Listener` column is mandatory in every Personal IM section |
| `reference_personal_im_runbook` | reference | Re-link/runbook lives at `docs/guides/im-listener-setup.md`; ops alerts go to Slack GGS `#maintenance` |

Add a matching `## daily-report:personal-im` section to **both** `MEMORY.md` files.

## Related code files

**Create**
- `~/.claude/projects/-home-nus-projects-My-AI-Agent/memory/daily-report/personal-im/*.md` (4)
- `docs/memory/daily-report/personal-im/*.md` (same 4)

**Modify**
- `~/.claude/projects/-home-nus-projects-My-AI-Agent/memory/MEMORY.md` — new section
- `docs/memory/MEMORY.md` — new section
- `docs/codebase-summary.md` and/or `docs/daily-report-workflow.md` — note the new piece
- `docs/project-changelog.md` — entry (create if absent, per documentation-management rules)

## Implementation steps

1. Write the 4 memories to `docs/memory/daily-report/personal-im/`.
2. Mirror them to the local Claude memory store.
3. Add the `## daily-report:personal-im` index section to both `MEMORY.md` files, cross-linking
   `[[project_mpfc_cron_server]]` and `[[feedback_never_send_messages_without_permission]]`.
4. Update `docs/daily-report-workflow.md` with the new piece and the listener dependency.
5. Add a changelog entry.
6. Commit + push so mpfc picks the memory up on its next `git pull` (**this is the only channel
   that reaches the cron host's sessions**).
7. Execute the staged rollout below.

## Staged rollout

| Stage | Config | Duration | Exit criterion |
|-------|--------|----------|----------------|
| 0 | both channels `enabled:false` | 1 day | Piece renders "disabled" cleanly, no alerts, no regressions in the other 14 pieces |
| 1 | WhatsApp `enabled:true`, `mode:"allowlist"`, 1–2 known project threads | 3–5 days | Zero false alerts; listener heartbeat never stale without cause; no private content in committed reports |
| 2 | Zalo enabled the same way (only if Phase 01 was a full GO) | 3–5 days | Same, plus the user confirms the Zalo-Web-conflict (Q1) is tolerable in daily use |
| 3 | Widen the allowlist / decide on Trello gating (Q2) | — | User signs off that the piece is stable, as Piece 14 did at `:1115` |

Do **not** skip stage 0: it proves the piece is inert-by-default, which is what makes every
later rollback cheap.

## Todo list

- [ ] 4 memories written to `docs/memory/`
- [ ] Same 4 mirrored to the local Claude store
- [ ] Both `MEMORY.md` indexes updated
- [ ] `docs/daily-report-workflow.md` updated
- [ ] Changelog entry added
- [ ] Committed + pushed (so mpfc sees it)
- [ ] Stage 0 completed
- [ ] Stage 1 completed
- [ ] Stage 2 completed or explicitly deferred
- [ ] Stage 3 sign-off recorded

## Success criteria

- Both `MEMORY.md` indexes contain the new section and the files exist in both stores.
- After a `git pull` on mpfc, `docs/memory/daily-report/personal-im/` is present there.
- Seven consecutive daily reports contain a Personal IM section with no false alerts.
- A deliberate rollback (`enabled:false`) removes the piece's effect within one run, with no
  other piece affected.

## Risk assessment

| # | Risk | L | I | Mitigation |
|---|------|---|---|-----------|
| 1 | Memory written to only one store ⇒ cron sessions on mpfc never learn the rules and re-improvise | **High** | High | Explicit dual-write steps 1–2; verify with a `git pull` check on mpfc in the success criteria |
| 2 | Rollout skips straight to "all threads" and leaks private conversations into git | Med | High | Stage gates; `mode:"allowlist"` is the default and stage 3 is a separate decision |
| 3 | Memory files edited concurrently by an mpfc cron session (has happened: frontmatter reset to `name: ""`) | Med | Med | Write and push outside the 23:05 UTC cron window; re-read the files after pushing |
| 4 | Piece declared "stable" without the user ever confirming | Med | Med | Stage 3 requires explicit sign-off, mirroring the open item Piece 14 left at `:1115` |

## Security considerations

- Memories must contain no phone numbers, JIDs, cookies, or IMEI — reference thread *labels*,
  never identifiers.
- `docs/memory/` is committed to git; treat everything written there as public-ish.

## File ownership (parallel safety)

Owns both memory stores and `docs/`. Runs after Phases 04/05 have landed, so no contention.

## Rollback

Set both channels `enabled:false` (piece goes inert in one run). Memories and docs can stay —
they remain accurate about a disabled feature. Full removal = revert Phases 03–05 in reverse
order; the listener on mpfc can then be logged out and its unit disabled.

## Next steps

None — this closes the plan. Revisit Unresolved Q2 (Trello gating) and Q5 (Zalo OA) after
stage 3.
