# Phase 03 — Fetch script, config, and time-window handling

**Priority:** P1 · **Status:** pending · **Effort:** 3h
**Blocked by:** Phase 02 · **Blocks:** Phase 04, Phase 05

## Context links

- [plan.md](plan.md) · [phase-02](phase-02-provision-gateway-cron-host.md)
- Reference implementation to mirror: `scripts/discord-monitor.js` (whole file — 129 lines,
  reads `daily_report.last_run`, emits JSON keyed by account, never throws on one bad source)

## Overview

One canonical script, `scripts/im-personal-monitor.js`, that reads captured Zalo + WhatsApp
messages for the report window and prints JSON. It performs **no authentication** — the gateway
owns that — so it can never fail with an auth error at report time.

## Key insights

- `scripts/discord-monitor.js:11-27` is the exact pattern to copy: read
  `config/.monitoring-timelines.json` → `daily_report.last_run`, allow `--since=ISO8601`
  override, exit(1) with a clear message when the window is unknown.
- Every existing piece uses `daily_report.last_run` as the window start
  (`.claude/commands/me/daily-report.md:22`) — this piece must too, not its own key.
- `.gitignore` un-ignores `config/.monitoring-timelines.json`, so adding keys there is a
  tracked, reviewable change.
- The "0 messages" ambiguity is the main correctness trap: an empty result must be
  distinguishable from "the listener was dead all night". Hence `heartbeat` in the output
  contract, consumed in Phase 05.
- Do **not** create a dated copy of this script. `feedback_no_dated_scan_scripts` — dated
  `daily-email-scan-YYMMDD.js` copies proliferated to 17 files once already.

## Requirements

**Functional**
1. `node scripts/im-personal-monitor.js [--since=ISO8601] [--channel=zalo|whatsapp]`
2. Window = `--since` if given, else `daily_report.last_run`.
3. Output JSON:
   ```json
   {
     "whatsapp": {
       "listenerOk": true,
       "heartbeatAgeSec": 42,
       "threads": [
         { "id": "…", "name": "…", "isGroup": false,
           "messages": [ { "ts": "ISO", "from": "…", "text": "…(truncated 300)" } ] }
       ]
     },
     "zalo": { … same shape … }
   }
   ```
4. Only **inbound** messages in the window; own outbound excluded.
5. Thread scope filter from config (Unresolved Q3): `mode: "all" | "allowlist"` plus a
   `threads` list, and a `denylist` for explicitly private threads.
6. Text truncated to 300 chars per message (same as `discord-monitor.js:78`).
7. Never throws: a failing channel yields `listenerOk:false` in its own key; the other channel
   still returns data. Non-zero exit only when *both* channels are unreadable.

**Non-functional**
- < 200 lines (`development-rules.md` file-size rule). Extract helpers to
  `scripts/lib/im-normalize.js` if it grows.
- No network calls of its own; talks only to the local gateway.
- Runs in < 30s for a normal day.

## Architecture / data flow

```
config/.im-personal-config.json  (scope + channel enable flags — gitignored, .enc committed)
config/.monitoring-timelines.json (daily_report.last_run) ──┐
                                                            ▼
        openclaw message read --channel X --json ──► im-personal-monitor.js
        openclaw channels status --json (heartbeat) ──┘        │
                                                               ▼
                                                    JSON on stdout → Piece 15
```

## Related code files

**Create**
- `scripts/im-personal-monitor.js` — the canonical fetch script
- `config/.im-personal-config.json` — scope config (**gitignored by the existing `config/*.json`
  pattern; no `.gitignore` edit needed**)

**Modify**
- `scripts/encrypt-secrets.sh` / `scripts/decrypt-secrets.sh` — add
  `config/.im-personal-config.json.enc` to the `ENC_FILES` array
  (`scripts/decrypt-secrets.sh:31-56`) so the scope config reaches mpfc via git
- `config/.monitoring-timelines.json` — no new key required (reuses `daily_report.last_run`);
  add `im_personal.last_seen_heartbeat` only if Phase 05 needs it

**Read for context**
- `scripts/discord-monitor.js`, `scripts/lib/save-secret-config.js`

**Delete:** none.

## Config shape (`config/.im-personal-config.json`)

```json
{
  "whatsapp": { "enabled": true,  "mode": "allowlist",
                "threads": [{ "id": "…", "label": "Client X" }], "denylist": [] },
  "zalo":     { "enabled": false, "mode": "allowlist", "threads": [], "denylist": [] },
  "heartbeatMaxAgeSec": 900
}
```

`enabled:false` is the **kill switch** — the piece reports "disabled" and does nothing.
This is what makes a partial-GO from Phase 01 shippable.

## Implementation steps

1. Copy the window-resolution block from `scripts/discord-monitor.js:11-29` verbatim in spirit.
2. Load `config/.im-personal-config.json`; if absent, treat both channels as disabled and exit 0
   with `{"whatsapp":{"enabled":false},"zalo":{"enabled":false}}` — a missing config must never
   break the daily report.
3. Enumerate in-scope threads per the Phase 01 enumeration method, intersected with
   `mode`/`threads`/`denylist`.
4. For each thread, `openclaw message read --channel … --target … --limit N --json`; filter
   `ts >= window`; drop outbound.
5. Read channel/listener health, compute `heartbeatAgeSec`, set `listenerOk`.
6. Normalise + truncate; emit JSON; write progress to **stderr** only (stdout must stay pure
   JSON — same convention as `discord-monitor.js:29`).
7. Encrypt the config once via `saveSecretConfig()`/`encrypt-secrets.sh <file>` — **always with
   an explicit file argument**; bulk mode is deliberately disabled (`scripts/encrypt-secrets.sh:8-15`).

## Todo list

- [ ] `scripts/im-personal-monitor.js` created, < 200 lines
- [ ] `--since` override works; falls back to `daily_report.last_run`
- [ ] Missing/disabled config path returns clean JSON, exit 0
- [ ] Outbound messages excluded
- [ ] Allowlist/denylist honoured
- [ ] `listenerOk` + `heartbeatAgeSec` present in every response
- [ ] One channel failing does not affect the other
- [ ] stdout = pure JSON
- [ ] `.enc` entries added to encrypt/decrypt scripts
- [ ] Config encrypted with explicit file arg, `.enc` committed, plaintext not committed

## Test matrix

| Level | Case | Expected |
|-------|------|----------|
| Unit | window boundary: message exactly at `last_run` | excluded (`>` not `>=`), consistent with Discord snowflake behaviour |
| Unit | `--since` overrides timelines | window from arg |
| Unit | config file missing | `{disabled}`, exit 0 |
| Unit | `enabled:false` for zalo, `true` for whatsapp | zalo key present but empty, whatsapp populated |
| Unit | denylisted thread present in gateway | absent from output |
| Unit | 500-char message | truncated to 300 |
| Integration | gateway stopped | `listenerOk:false`, `heartbeatAgeSec` large, exit 0 |
| Integration | one channel logged out, one live | live channel returns data |
| Integration | real overnight message on mpfc | appears with correct ISO ts |
| E2E | `/me:daily-report --cron` dry run on mpfc | Piece 15 section renders, no auth error anywhere |

## Success criteria

- Script run twice back-to-back with the same `--since` returns identical output (idempotent).
- Killing the gateway then running the script yields `listenerOk:false` and exit 0 — never a
  stack trace, never a partial-JSON stdout.
- `git status` clean of plaintext secrets after the config is created.

## Risk assessment

| # | Risk | L | I | Mitigation |
|---|------|---|---|-----------|
| 1 | Private personal messages land in a git-committed report | **High** | High | `mode:"allowlist"` as the default; denylist; Q3 must be settled before enabling `mode:"all"` |
| 2 | Empty output read as "nothing happened" when the listener was dead | Med | High | `listenerOk`/`heartbeatAgeSec` are mandatory fields; Phase 04 forbids rendering counts without them |
| 3 | CLI JSON schema changes on an OpenClaw upgrade | Med | Med | Normalise in one place; fail loud with the offending payload shape (no message bodies) in stderr |
| 4 | Bulk `encrypt-secrets.sh` invocation clobbers other configs | Low | **Critical** | Only ever call with an explicit file arg — this has caused ≥4 token-corruption incidents already |
| 5 | Script grows past 200 lines | Med | Low | Split to `scripts/lib/im-normalize.js` |

## Security considerations

- Report text is committed to a public-ish git repo — truncation plus allowlist are the only
  things preventing private-message leakage. Treat Q3 as a blocker, not a nicety.
- No credential is read by this script at all; that is the design.

## File ownership (parallel safety)

Owns `scripts/im-personal-monitor.js`, `config/.im-personal-config.json`,
`scripts/encrypt-secrets.sh`, `scripts/decrypt-secrets.sh`. No other phase edits these.

## Rollback

Delete the script + config, revert the two `*-secrets.sh` hunks. Nothing references it until
Phase 04.

## Next steps

Phases 04 and 05 both consume this script's JSON contract and can proceed in parallel.
