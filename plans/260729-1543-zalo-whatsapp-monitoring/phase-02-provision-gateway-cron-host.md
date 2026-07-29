# Phase 02 — Provision the persistent listener on the cron host

**Priority:** P1 · **Status:** pending · **Effort:** 2h
**Blocked by:** Phase 01 (GO) · **Blocks:** Phase 03

## Context links

- [plan.md](plan.md) · [phase-01](phase-01-spike-validate-channels.md)
- `docs/memory/.../project_mpfc_cron_server.md` — cron host facts
- `scripts/autorun-daily-report.sh` — the cron entrypoint (git pull, Xvfb, `claude -p --cron`)

## Overview

Decide and set up **the single host that owns the sessions**, then link both accounts there.

## Key insights

- `/me:daily-report` cron runs on **`mpfc.mpfc.live`** at `/var/www/MyDailyAgent`
  (`5 23 * * *` → 06:05 +07), not on this dev box. Node v22.20.0 there.
- `tmp/` is gitignored (`.gitignore`) → session dirs are **not** replicated between hosts.
  This is desirable: exactly one host must hold the session.
- **WhatsApp multi-device creds rotate on every message** (Signal double-ratchet). Two hosts
  loading the same creds desync the ratchet and force a logout loop. **Never commit WhatsApp
  auth state, never copy it to a second host.**
- **Zalo permits one web listener per account** — a second host (or the user's own Zalo Web
  tab) stops the first.
- `scripts/autorun-daily-report.sh:44` runs `git pull --rebase` but there is **no
  `npm install` anywhere in any `autorun-*.sh`** (verified by grep) — dependency changes do not
  propagate to mpfc on their own.
- `package-lock.json` exists and is git-tracked, so a deterministic install is possible.
- WhatsApp linked devices survive **≤14 days** without the phone connecting; after that the
  device is unlinked and a QR re-scan is required.

## Requirements

**Functional**
1. Exactly one host runs the listener. Default: **mpfc**. (Unresolved Q4 — confirm with user.)
2. Both accounts linked on that host, sessions surviving reboot.
3. Agent auto-reply disabled for both channels (carried over from Phase 01 finding).
4. New npm/global deps actually present on mpfc.

**Non-functional**
- Listener restarts automatically on crash and on host reboot.
- Zero secrets in git.

## Architecture

```
mpfc.mpfc.live (always on, UTC)
├── openclaw gateway  ── systemd unit, Restart=always
│     ├── zalouser  (zca-js WS listener)   ← session in ~/.openclaw or --auth-dir
│     └── whatsapp  (Baileys socket)       ← --auth-dir /var/www/MyDailyAgent/tmp/whatsapp-auth
└── cron 23:05 UTC → autorun-daily-report.sh → claude -p "/me:daily-report --cron"
                                                    └── Piece 15 reads via openclaw CLI (localhost)
```

Local dev box: gateway keeps running for the user's own assistant use but **must not** enable
these two channels (would contend for the same accounts).

## Related code files

- Modify: `scripts/autorun-daily-report.sh` — add a guarded dependency-sync step after
  `git pull` (only when `package-lock.json` changed in the pull):
  `npm ci --omit=dev` (or `npm install --no-audit --no-fund`), logged to `$LOG`.
- Create: `docs/guides/im-listener-setup.md` — host provisioning + re-link runbook.
- Create (on mpfc, not in git): systemd user unit for the gateway, modelled on
  `~/.config/systemd/user/openclaw-gateway.service`.
- Read: `scripts/autorun-daily-report.sh`, `.gitignore`

## Implementation steps

1. Confirm host choice with the user (Q4). Assume mpfc below.
2. `ssh mpfc.mpfc.live` — install/verify OpenClaw at the same major version as local
   (`2026.3.x`). Record the exact version in the runbook.
3. Create the systemd unit for the gateway on mpfc (`Restart=always`, `RestartSec=5`,
   explicit `PATH`/`HOME`, `WantedBy=default.target`); `loginctl enable-linger` so it runs
   without an interactive session. Enable + start.
4. Apply the agent-auto-reply kill switch from Phase 01 **before** linking any account.
   Verify by inspecting the effective config, not by assuming.
5. Enable plugins: `openclaw plugins enable zalouser`, `openclaw plugins enable whatsapp`
   (exact command per Phase 01 findings).
6. Link WhatsApp: `openclaw channels login --channel whatsapp --auth-dir
   /var/www/MyDailyAgent/tmp/whatsapp-auth` over SSH, scan the terminal QR from the phone.
7. Link Zalo: `openclaw channels login --channel zalouser` — QR from Zalo mobile, or
   cookie+IMEI+userAgent import per Phase 01.
8. Reboot-test: `systemctl reboot` (or restart the unit + verify after), confirm both channels
   reconnect with no re-login.
9. Add the guarded `npm` sync step to `scripts/autorun-daily-report.sh`; dry-run it.
10. Write `docs/guides/im-listener-setup.md`: link, re-link, rotate, and "what to do when the
    QR expires" — this is the runbook Phase 05's health check will point at.

## Todo list

- [ ] Host confirmed with user
- [ ] Gateway installed + version recorded
- [ ] systemd unit created, lingering enabled, `Restart=always` verified
- [ ] Auto-reply disabled and **verified** before linking
- [ ] WhatsApp linked, auth dir under `tmp/`
- [ ] Zalo linked
- [ ] Both survive a reboot
- [ ] `autorun-daily-report.sh` dependency-sync step added + dry-run
- [ ] `docs/guides/im-listener-setup.md` written
- [ ] Local box confirmed NOT running these two channels

## Success criteria

- `systemctl is-active` for the gateway = `active` after a full host reboot, both channels
  reporting connected via `openclaw channels status`.
- A message sent to each account at T is retrievable on mpfc at T+2h with the CLI, with the
  gateway having been restarted in between.
- `git pull` on mpfc followed by the autorun script results in required deps present
  (`node -e "require('…')"` succeeds) without manual intervention.
- No plaintext credential appears in `git status` / `git diff` at any point.

## Risk assessment

| # | Risk | L | I | Mitigation |
|---|------|---|---|-----------|
| 1 | Both hosts end up with the same WhatsApp creds → ratchet desync → repeated forced logout | Med | High | Never copy `tmp/whatsapp-auth`; `.gitignore` already blocks `tmp/`; runbook states single-host rule explicitly |
| 2 | Zalo listener on mpfc kills the user's own Zalo Web tab daily | **High** | Med | Requires user acceptance (Q1). No technical mitigation exists |
| 3 | Gateway upgrade on mpfc breaks the plugin/CLI contract | Med | High | Pin the OpenClaw version; no unattended upgrades; Phase 05 health check catches breakage next morning |
| 4 | `npm ci` on mpfc wipes/reinstalls deps mid-cron and breaks an unrelated piece | Low | High | Run the sync step **before** `claude -p`, guarded on lockfile change only; on non-zero exit, log and continue with existing `node_modules` rather than aborting the whole report |
| 5 | Phone offline >14 days → WhatsApp device unlinked silently | Low | Med | Phase 05 heartbeat detects; runbook covers re-link |
| 6 | `loginctl enable-linger` not set → gateway dies when the SSH session ends | Med | High | Explicit step 3; verified by the reboot test in step 8 |

## Security considerations

- Session/auth material lives only in `tmp/` on one host — gitignored by the existing
  `tmp/` rule; no `.gitignore` change needed, no `encrypt-secrets.sh` entry (do **not** encrypt
  and commit rotating WhatsApp creds — that would recreate the two-host desync problem).
- SSH-only access to the QR; never render a WhatsApp QR into a report, log, or screenshot —
  a scanned QR grants full message-history access to the account.
- Follows CLAUDE.md "NEVER Hardcode Secrets": no token ever enters a script.

## Rollback

`systemctl disable --now` the gateway unit, `openclaw channels logout` both channels, `rm -rf`
the auth dirs, revert the `autorun-daily-report.sh` commit. Nothing else in the repo depends on
this phase until Phase 04 lands, so rollback is non-cascading.

## Next steps

Phase 03 (fetch script) can start as soon as both channels are linked and readable.
