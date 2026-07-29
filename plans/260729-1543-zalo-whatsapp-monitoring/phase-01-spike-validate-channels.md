# Phase 01 — Spike: validate OpenClaw zalouser + whatsapp channels

**Priority:** P1 (hard gate) · **Status:** pending · **Effort:** 2h
**Blocked by:** — · **Blocks:** all other phases

## Context links

- Plan overview: [plan.md](plan.md)
- Cron host facts: `docs/memory/.../project_mpfc_cron_server.md`
- Existing session-based piece precedent: `.claude/commands/me/daily-report.md:960` (Piece 12, OhCleo)

## Overview

Everything downstream rests on unverified third-party behaviour. This phase is a **timeboxed
throwaway spike** run on a scratch account/host, producing a go/no-go decision — no production
code, no repo files changed except this plan's status.

## Key insights (verified 2026-07-29)

| Fact | Evidence |
|------|----------|
| `zca-js` = **listener-only**, no history API | upstream README: only `listener.on("message")`, `sendMessage()`, `getStickers*()`, `getGroupInfo()`; no `getRecentMessages` |
| Zalo: **one web listener per account**; opening Zalo Web auto-stops the listener | upstream README |
| `zca-js` latest `2.1.2`, published 2026-03-17; repo pushed 2026-06-25, MIT, 572★, not archived | npm registry + GitHub API |
| `zca-js` is pure HTTP+WS — **no puppeteer at runtime** | dependency list: `ws`, `crypto-js`, `tough-cookie`, no puppeteer |
| `whatsapp-web.js` `1.34.7` pins **`puppeteer` exactly `24.38.0`** vs this repo's `^24.39.1` → duplicate nested Chromium (~500MB) | npm registry `versions["1.34.7"].dependencies` + `package.json:10` |
| Baileys `6.7.24` (2026-07-29) — no browser, `ws`-based, `engines.node >=20` (repo runs v22.22.1) | npm registry |
| Baileys `7.0.0-rc14` adds native dep `whatsapp-rust-bridge@0.5.4` and is still an RC → **pin 6.7.24** | npm registry |
| OpenClaw 2026.3.13 ships `@openclaw/zalouser` ("via native zca-js integration") + `@openclaw/whatsapp`, both `disabled` | `openclaw plugins list` |
| `openclaw message read --channel zalouser\|whatsapp --target … --limit N --json` exists | `openclaw message read --help` |
| Gateway already runs locally as `Restart=always` systemd user unit on port 18789 | `~/.config/systemd/user/openclaw-gateway.service`, `systemctl --user is-active` = active |

## Requirements

**Functional — the spike must answer, with evidence:**
1. Can `@openclaw/zalouser` authenticate a personal Zalo account (QR from mobile, or
   cookie+IMEI+userAgent import) and persist that session across a gateway restart?
2. Does `openclaw message read --channel zalouser` return messages that arrived **while the
   CLI was not running** (i.e. does the gateway buffer them)? ← the single most important question
3. Same two questions for `@openclaw/whatsapp` (Baileys-backed).
4. How are conversations enumerated? `message read` requires `--target`. Verify
   `openclaw directory`, `openclaw sessions list`, `openclaw status` can list threads with
   recent activity, or determine that an explicit target allowlist is required.
5. Does enabling the channel make the OpenClaw **agent auto-reply** to inbound messages?
   Determine the exact config keys that disable agent routing/auto-reply per channel.
6. Message JSON shape: sender, thread id/name, timestamp, text, direction — enough to build
   a report row.

**Non-functional:** no message may be sent from the user's real accounts during the spike.

## Architecture (what is being probed)

```
Zalo mobile ─QR─┐
                ├─► OpenClaw gateway (persistent, Restart=always)
WhatsApp phone ─┘        │  zalouser plugin (zca-js WS listener)
                         │  whatsapp plugin (Baileys WS socket)
                         ▼
                  gateway session store
                         │
                         ▼   openclaw message read --json
                  daily-report Piece 15 (read-only, no auth)
```

Data flow: inbound message → plugin listener → gateway store → CLI `message read --json` →
fetch script normalises → spool/report. **No outbound path is wired at any point.**

## Related code files

- Create: nothing in repo. Scratch work under `tmp/spike-im/` (gitignored).
- Read: `~/.openclaw/openclaw.json` (keys: `plugins.entries`, `messages`, `agents`)
- Read: `.claude/commands/me/daily-report.md:287-322` (Piece 3 Discord — target report shape)

## Implementation steps

1. Snapshot current gateway config: `cp ~/.openclaw/openclaw.json tmp/spike-im/openclaw.json.pre`
   (rollback artifact).
2. Read plugin docs: `openclaw channels capabilities --channel zalouser` after enabling; also
   `https://docs.openclaw.ai/channels/zalouser`.
3. **Before** enabling any channel, find and set the auto-reply/agent-routing kill switch.
   Verify by enabling with a throwaway channel first if one is available.
4. Enable `zalouser` plugin; run `openclaw channels login --channel zalouser`; capture the
   login modality actually offered (QR vs cookie import) and where the session is written.
5. Restart the gateway (`systemctl --user restart openclaw-gateway`). Confirm the Zalo session
   survives without re-login.
6. Send a test message **to** the account from another device. Stop the CLI. Wait 10 min.
   Then run `openclaw message read --channel zalouser --limit 20 --json` and confirm the
   message is present with a usable timestamp. Repeat with the gateway restarted in between.
7. Repeat steps 4–6 for `whatsapp` (use `--auth-dir` to place the auth dir under
   `tmp/spike-im/wa-auth`).
8. Probe thread enumeration (`openclaw directory`, `openclaw sessions list`, `openclaw status`).
9. Record findings in `plans/260729-1543-zalo-whatsapp-monitoring/reports/spike-findings.md`.
10. Restore `~/.openclaw/openclaw.json` from the snapshot; disable both plugins; log out both
    channels.

## Todo list

- [ ] Config snapshot taken
- [ ] Auto-reply kill switch identified and proven
- [ ] zalouser: login succeeds
- [ ] zalouser: session survives gateway restart
- [ ] zalouser: **backlog readable after CLI was offline** ← gate
- [ ] whatsapp: login succeeds (terminal QR over SSH)
- [ ] whatsapp: session survives restart
- [ ] whatsapp: backlog readable after offline period ← gate
- [ ] Thread enumeration method determined
- [ ] Message JSON schema captured
- [ ] spike-findings.md written
- [ ] Gateway config restored, channels logged out

## Success criteria (measurable)

**GO** requires all of:
- Both channels authenticate and survive one gateway restart with no re-login.
- `message read --json` returns ≥1 message that arrived while the CLI process was not running,
  for **both** channels, with a parseable ISO/epoch timestamp.
- A documented config setting demonstrably prevents the agent from replying.
- Threads with recent activity can be enumerated programmatically.

**NO-GO → fallback (Option B), re-plan phases 02–03:**
- Own daemons in-repo: `scripts/whatsapp-listener-daemon.js` (Baileys `6.7.24`, pinned exact)
  and `scripts/zalo-listener-daemon.js` (`zca-js 2.1.2`, pinned exact), sharing
  `scripts/lib/im-spool.js` (append-only JSONL + heartbeat). Two systemd units on mpfc modelled
  on `~/.config/systemd/user/openclaw-gateway.service`. Adds ~2 days effort and ongoing
  reconnect/session-rotation ownership. Phases 04–06 are unchanged either way — they only
  consume the spool.

**Partial-GO handling:** if WhatsApp passes and Zalo does not (likely case, given zca-js has no
history API and the gateway may not buffer), ship WhatsApp alone in Piece 15 and defer Zalo.
Do **not** ship a Zalo path that silently loses overnight messages.

## Risk assessment

| # | Risk | L | I | Mitigation |
|---|------|---|---|-----------|
| 1 | Enabling a channel makes the agent reply to a real customer on user's personal account | Med | **Critical** | Step 3 before step 4; spike against a non-customer thread only; `feedback_never_send_messages_without_permission` applies |
| 2 | Zalo login attempt locks the account | Low | **Critical** | Single login attempt, no retry loops, no sends; abort on first anomaly |
| 3 | Spike mutates the user's live gateway config (it is their working assistant) | Med | Med | Snapshot + restore in steps 1/10; gateway restart is `Restart=always`, self-heals |
| 4 | Zalo listener steals the user's own Zalo Web session mid-workday | **High** | Med | Run the spike at a time the user agrees to; unresolved Q1 must be answered before Phase 02 |
| 5 | `message read` returns only live-session messages → whole approach invalid | Med | High | This is exactly what the gate tests; fallback Option B documented above |

## Security considerations

- No credential is written into repo files. Anything captured lives in `tmp/` (gitignored).
- `spike-findings.md` must contain **no** cookies, IMEI, tokens, phone numbers, or message
  bodies from real conversations — schema and field names only.
- Supply chain: a malicious Baileys fork (`lotusbail`) circulated with 56k+ downloads. Only
  ever install `@whiskeysockets/baileys` and `zca-js` (repo `RFS-ADRENO/zca-js`), pinned exact,
  and only if Option B is taken.

## Next steps

Phase 02 (provisioning) starts only on GO. On partial-GO, Phase 02 scope narrows to WhatsApp.
