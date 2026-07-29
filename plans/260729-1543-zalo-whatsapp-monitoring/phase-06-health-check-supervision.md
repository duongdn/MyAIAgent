# Phase 05 — Session health check + listener supervision

**Priority:** P1 · **Status:** pending · **Effort:** 2h
**Blocked by:** Phase 03 · **Blocks:** Phase 06
**Parallel-safe with:** Phase 04 (disjoint files)

## Context links

- [plan.md](plan.md) · [phase-03](phase-03-fetch-script-and-config.md)
- Target: `scripts/session-health-check.js` (185 lines; currently checks Matrix, Workstream,
  Upwork; posts a Slack alert to GGS `#maintenance` `C0338NXK3SB` and exits 1 on failure)
- Runs on mpfc at `30 17 * * *` via `autorun-session-health.sh` — i.e. **~5.5h before** the
  daily report cron at `5 23 * * *`. That gap is the whole point: it gives the user an evening
  window to re-scan a QR before the morning run.

## Overview

Add Zalo + WhatsApp listener checks to the existing pre-cron health check, so a dead or
unlinked session is caught and re-authed **before** it costs a night of monitoring — rather
than being discovered as a hole in the morning report.

## Key insights

- `session-health-check.js:160-182` — the pattern is: each check returns `{ok, note}`, failures
  are aggregated, one Slack message is sent, exit code 1. Adding a check is ~25 lines plus one
  line in the `results` object at `:161-165`.
- `:110`, `:120` show the established `note` convention: a literal copy-pasteable fix command
  (`Fix: DISPLAY=:1 node scripts/upwork-login.js --login --account=carrick`). Match it.
- `checkUpwork()` (`:103-122`) is the closest analogue: check a session directory exists, then
  actually exercise it. Do both here — directory presence alone is not health.
- The gateway is `Restart=always`, so a *crashed* process self-heals. What does **not**
  self-heal is a *logged-out* session (QR expired, device unlinked, Zalo session invalidated
  by a competing web login). The check must distinguish these two.
- WhatsApp linked devices are unlinked after **~14 days** with the phone never online — a slow
  failure the health check should surface early, not on day 14.

## Requirements

**Functional**
1. `checkPersonalIm()` added to `session-health-check.js`, covering both channels.
2. Distinguish three states per channel: `disabled` (skip), `ok`, `needs-relink`.
3. `disabled` in `config/.im-personal-config.json` ⇒ not checked, not reported as a failure.
4. Failure `note` includes the exact re-link command and points at
   `docs/guides/im-listener-setup.md`.
5. Automatic remediation attempted **before** declaring failure: restart the gateway unit,
   wait, re-probe once. Only a still-dead session is a failure.
6. Piece 15 (Phase 04) consumes the same freshness signal at report time.

**Non-functional**
- Adds < 40 lines to a 185-line file; if it pushes past ~220, extract to
  `scripts/lib/check-personal-im.js`.
- Must not slow the health check by more than ~20s (existing Upwork check already uses a
  `timeout 20`, `:115`).
- Must never send a message on Zalo/WhatsApp as a liveness probe.

## Architecture / data flow

```
17:30 UTC  autorun-session-health.sh
             └─ session-health-check.js
                  ├─ checkMatrix / checkWorkstream / checkUpwork   (existing)
                  └─ checkPersonalIm                               (new)
                       ├─ config disabled? → skip
                       ├─ probe gateway channel status
                       ├─ if down → systemctl restart + re-probe (once)
                       └─ still down → {ok:false, note:"…relink cmd…"}
                                            ▼
                              Slack #maintenance alert, exit 1
                                            ▼
                        user re-links in the evening (~5.5h of slack)
                                            ▼
23:05 UTC  daily report runs with a live listener
```

## Related code files

**Modify (sole owner)**
- `scripts/session-health-check.js` — add `checkPersonalIm()`; register it in the `results`
  object at `:161-165`

**Create**
- `scripts/lib/check-personal-im.js` *(only if the size threshold is hit)*
- `docs/guides/im-listener-setup.md` is created in Phase 02; this phase **appends** the
  "session died — what to do" runbook section to it

**Read**
- `config/.im-personal-config.json`, `scripts/session-health-check.js`

## Implementation steps

1. Read `config/.im-personal-config.json`; per channel, `enabled:false` ⇒ return `{ok:true,
   note:'disabled'}` so it never trips the alert.
2. Probe channel connection state via the gateway (`openclaw channels status` — exact JSON
   field per Phase 01 findings), with a hard timeout.
3. On "down": `systemctl --user restart` the gateway unit, sleep ~15s, re-probe once. Log both
   attempts.
4. If the re-probe shows connected ⇒ `{ok:true, note:'recovered via gateway restart'}` (the
   existing `:82` "refreshed via refresh_token" note is precedent for reporting self-healing).
5. If still down ⇒ `{ok:false, note:'WhatsApp session unlinked. Fix: ssh mpfc.mpfc.live then
   openclaw channels login --channel whatsapp --auth-dir /var/www/MyDailyAgent/tmp/whatsapp-auth
   — see docs/guides/im-listener-setup.md'}`.
6. Register in `results` (`:161-165`). Existing aggregation, Slack alert and exit code need no
   change.
7. Append the runbook section to `docs/guides/im-listener-setup.md`: symptoms → cause →
   re-link steps → how to confirm, including the 14-day WhatsApp unlink case and the Zalo
   "someone opened Zalo Web" case.

## Todo list

- [ ] `checkPersonalIm()` implemented
- [ ] Registered in `results`
- [ ] `disabled` channels skipped cleanly
- [ ] Auto-restart + single re-probe implemented
- [ ] Failure note carries copy-pasteable fix command + runbook path
- [ ] No liveness probe ever sends a message
- [ ] Hard timeout so the health check cannot hang
- [ ] Runbook section appended
- [ ] File still < ~220 lines (or helper extracted)

## Test matrix

| Level | Case | Expected |
|-------|------|----------|
| Unit | config missing | both channels treated as disabled, `ok:true` |
| Unit | `enabled:false` | skipped, no alert |
| Integration | gateway stopped | restart attempted, recovers, `ok:true` + "recovered" note |
| Integration | channel logged out (auth dir emptied) | restart does not help ⇒ `ok:false` with re-link command |
| Integration | gateway hung/unresponsive | timeout fires, `ok:false`, health check still completes |
| Integration | full run with all other checks passing | Slack alert contains only the IM line |
| Regression | existing Matrix/Workstream/Upwork checks | unchanged behaviour and exit codes |
| E2E | kill session in the evening → alert → re-link → 23:05 cron | morning report has a live listener |

## Success criteria

- Deliberately unlinking a channel produces a Slack `#maintenance` alert naming the channel and
  the exact fix command, within one health-check cycle.
- Killing the gateway process (not the session) results in `ok:true` with a "recovered" note and
  **no** Slack noise — self-healing must not page.
- `session-health-check.js` exit code semantics are unchanged for the three existing checks.

## Risk assessment

| # | Risk | L | I | Mitigation |
|---|------|---|---|-----------|
| 1 | Health check restarts the gateway while the user is mid-conversation on their own assistant | Med | Med | Restart only when the channel probes as down; the gateway is `Restart=always` so downtime is seconds |
| 2 | Flapping session ⇒ nightly Slack alerts ⇒ alert fatigue | Med | High | Auto-remediate first; only alert on a *persistent* failure; if flapping recurs, disable the channel rather than tolerate noise |
| 3 | Probe itself triggers Zalo/WhatsApp anti-automation heuristics | Low | High | Read-only status probe against the local gateway, never a message send, once per day |
| 4 | Health check hangs and blocks the whole pre-cron check | Low | High | Hard timeout, mirroring `timeout 20` at `:115` |
| 5 | Alert says "session expired" and someone pastes that into the daily report | Med | Med | Health-check notes are an **internal ops channel** (Slack `#maintenance`), explicitly not report text — the `:1126` absolute rule governs the report, not this file |
| 6 | 14-day WhatsApp unlink discovered only on day 14 | Med | Med | Runbook tells the user the phone must connect at least fortnightly; consider surfacing device age if the API exposes it |

## Security considerations

- Never log or Slack-post the QR, cookies, IMEI, or auth-dir contents. The alert names the
  channel and the fix command only.
- The Slack alert path already exists (`:124-158`) and uses the GGS workspace token from
  `config/.slack-accounts.json` — no new credential is introduced.

## File ownership (parallel safety)

Sole owner of `scripts/session-health-check.js` and (jointly, by append-only sections)
`docs/guides/im-listener-setup.md`. Phase 04 owns the skill file. No overlap.

## Rollback

Revert the `session-health-check.js` hunk; the three original checks are untouched, so the
pre-cron check keeps working exactly as before. Non-cascading.

## Next steps

Phase 06 — docs, dual memory, staged rollout.
