# Phase 04 — Daily-report "Piece 15" integration

**Priority:** P1 · **Status:** pending · **Effort:** 1.5h
**Blocked by:** Phase 03 · **Blocks:** Phase 06
**Parallel-safe with:** Phase 05 (disjoint files)

## Context links

- [plan.md](plan.md) · [phase-03](phase-03-fetch-script-and-config.md)
- Target file: `.claude/commands/me/daily-report.md` (1135 lines, 14 existing Pieces)
- Structural models: Piece 3 Discord (`:287-322`, shortest full piece) and Piece 14 Performance
  (`:1073-1115`, the most recently added, ungated piece)

## Overview

Add **one** new piece — `Piece 15 — Personal IM (Zalo + WhatsApp)` — plus the four other places
in the skill file where every piece must be registered. One combined piece, not two: both
channels share the same script, the same JSON contract, the same report shape, and the same
failure mode. Two pieces would duplicate ~90% of the text (DRY).

## Key insights — the five registration points (all verified by line number)

A new piece is **not** just a `## Piece N` section. Miss any of these and it silently never runs:

| # | Location | What to add |
|---|----------|-------------|
| 1 | `:29-137` Quick Reference table | a `**Personal IM**` group + 3 rows (`personal-im`, `… zalo`, `… whatsapp`) |
| 2 | `:889` Full Run mode table | "all 14 pieces" → "all 15 pieces" |
| 3 | `:899` `--cron` sequential inline list | append `→ **Personal IM**` after `**Arthur**` |
| 4 | `:948` interactive parallel launch list | add **Personal IM** to the second parallel group (alongside Matrix/Performance/Arthur) |
| 5 | after `:1115` | the `## Piece 15` section itself |

Also: `:25` says "Run ALL 10 pieces" while `:889` says 14 — the count is already drifted.
Fix `:25` to say "all pieces" rather than adding a third stale number.

Trello: **start ungated**, exactly like Piece 14 (`:1075`: "Not gated by any Trello item …
informational only, does not block card completion"). No `Piece 8` table row (`:557-582`) and no
`reference_trello_gate_mapping.md` change in this phase. See Unresolved Q2.

## Requirements

**Functional**
1. `/daily-report personal-im`, `/daily-report personal-im zalo`, `/daily-report personal-im whatsapp`
2. Runs `node scripts/im-personal-monitor.js`, appends a timestamped section to
   `reports/{YYYY-MM-DD}/daily-report.md` like every other piece (`:21`).
3. Window from `daily_report.last_run` (`:22`) — no bespoke window logic.
4. Included in cron runs and interactive full runs.
5. Alerts flow into the `⚠️ ALERTS SUMMARY` table at the top of the report (`:914-919`).

**Non-functional**
- Section renders even when both channels are disabled (state "disabled", not silence).
- Must not lengthen the skill file disproportionately — target ≤ 45 lines for the piece.

## Report format (to embed in the skill file)

```
## Personal IM [zalo|whatsapp|all] — {HH:MM} (+07:00)

| Channel | Listener | Threads | Msgs | Key content |
|---------|----------|---------|------|-------------|
| WhatsApp | ✅ live  | 3 | 11 | {client}: {1-line} |
| Zalo     | ✅ live  | 1 | 2  | {client}: {1-line} |

{Alerts if any.}
Trello: n/a (ungated, informational)
```

**Mandatory rendering rules (the correctness core of this piece):**
- `Listener` column is **not optional**. `listenerOk:false` or `heartbeatAgeSec >
  heartbeatMaxAgeSec` ⇒ render `⚠️ stale` and raise an **ALERT** — a dead listener means the
  night was unmonitored, which is a real finding, not a skip.
- Never print `0 msgs` with a stale/unknown listener. "0 messages" and "we were blind" are
  different statements and must never collapse into the same row.
- Channel with `enabled:false` ⇒ row omitted entirely (not shown as an error).

## Interaction with the ABSOLUTE auth rule (`:1126`)

`:1126` forbids ever writing "session expired / unavailable / auth failed" as a skip reason.
This piece complies **by construction**: it has no credentials, so it cannot have an auth
failure. When the *listener* is down, the required behaviour is:

1. Attempt automatic remediation first (restart the gateway unit — see Phase 05 runbook).
2. Re-run the fetch.
3. Only if still down, raise it as a monitoring-blind ALERT with the runbook pointer.

That is "fix it silently, then report the real finding" — not "report auth failure and skip".

## Related code files

**Modify (sole owner of this file in this phase)**
- `.claude/commands/me/daily-report.md` — 5 edits listed above

**Read**
- `scripts/im-personal-monitor.js` (Phase 03 contract)

**Create / Delete:** none.

## Implementation steps

1. Insert the `## Piece 15` section after `:1115` (before `## Key Rules (All Pieces)` at `:1119`).
2. Add the Quick Reference rows under a new `**Personal IM**` group heading.
3. Update the piece count at `:889`; fix the stale "ALL 10 pieces" at `:25` to "ALL pieces".
4. Append Personal IM to the `--cron` sequential list at `:899`.
5. Add Personal IM to the interactive parallel group at `:948`.
6. Add one bullet to `## Key Rules (All Pieces)`: *"Personal IM: the fetch script holds no
   credentials — a stale listener heartbeat is an ALERT (unmonitored night), never a silent
   skip; restart the gateway first, then re-fetch."*
7. Grep the whole file for `14 pieces` / `10 pieces` / `Piece 14` to confirm no other stale
   count remains (`feedback_report_internal_consistency_and_always_reverify` — grep the whole
   file, do not spot-check).

## Todo list

- [ ] Piece 15 section inserted before Key Rules
- [ ] Quick Reference rows added
- [ ] Piece count corrected at `:889`, stale "10 pieces" fixed at `:25`
- [ ] `--cron` sequential list updated
- [ ] Interactive parallel list updated
- [ ] Key Rules bullet added
- [ ] Whole-file grep for stale counts clean
- [ ] Trello left ungated (no Piece 8 row, no gate-mapping change)

## Test matrix

| Level | Case | Expected |
|-------|------|----------|
| Integration | `/daily-report personal-im` with both live | section appended, correct counts |
| Integration | `/daily-report personal-im whatsapp` | only WhatsApp row |
| Integration | gateway stopped | `⚠️ stale` row + entry in ALERTS SUMMARY |
| Integration | both channels `enabled:false` | section states "disabled", no alert |
| E2E | full `--cron` run on mpfc | Piece 15 present in `reports/{date}/daily-report.md`, existing 14 pieces unchanged |
| Regression | run the day after, recheck mode (`Piece 11`) | Piece 15 does not break recheck; ungated ⇒ never leaves a ○ item |

## Success criteria

- A full cron run produces a report containing a `## Personal IM` section with a populated
  `Listener` column.
- Existing pieces' output is byte-comparable to the previous day's structure (no regressions).
- No Trello checklist item is ever left incomplete because of this piece.

## Risk assessment

| # | Risk | L | I | Mitigation |
|---|------|---|---|-----------|
| 1 | Piece added to the section list but not to cron/parallel lists → never runs in practice | **High** | Med | The 5-point registration checklist above; step 7 grep |
| 2 | New piece raises noisy alerts and trains the user to ignore ALERTS SUMMARY | Med | High | Ungated + allowlist scope; tune thresholds after a week of real reports (same approach Piece 14 took, `:1115`) |
| 3 | Skill-file edit conflicts with a concurrent mpfc cron session editing the same file | Med | Med | mpfc pulls before running; land this change and push before the next 23:05 UTC cron; do not edit during a cron window |
| 4 | Private message content lands in a committed report | Med | High | Inherited from Phase 03 allowlist; "Key content" column is a 1-line summary, never a raw dump (same rule as Matrix, `:736`) |

## Security considerations

- Report body is committed to git by the cron flow (`:935-942`). The `Key content` column must
  be a summary, never verbatim personal conversation.

## File ownership (parallel safety)

Sole owner of `.claude/commands/me/daily-report.md`. Phase 05 owns
`scripts/session-health-check.js` + systemd/runbook files. No overlap.

## Rollback

Single-file revert of `.claude/commands/me/daily-report.md`. The fetch script and listener stay
in place, harmlessly unused. Non-cascading.

## Next steps

Phase 06 (docs + dual memory) after this and Phase 05 both land.
