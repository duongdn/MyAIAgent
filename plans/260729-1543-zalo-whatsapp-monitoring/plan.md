---
title: "Zalo + WhatsApp personal-account monitoring piece for /me:daily-report"
description: "Add personal Zalo + WhatsApp as a new daily-report monitoring Piece via a persistent listener, since neither platform offers history-fetch for a once-a-day cron."
status: pending
priority: P2
effort: 11.5h
branch: master
tags: [daily-report, monitoring, zalo, whatsapp, openclaw, cron]
created: 2026-07-29
---

# Zalo + WhatsApp Personal Monitoring — Plan Overview

Add personal **Zalo** and **WhatsApp** as monitoring sources to `/me:daily-report`, same
pattern as Piece 2 (Slack) / Piece 3 (Discord): scan for customer/project messages, flag
alerts, append a section to the daily report.

## The one fact that shapes everything

**Neither platform can be scanned by a once-a-day cron script.**
- Zalo (`zca-js`) is **listener-only** — no message-history API at all. A process that starts
  at 06:05 and exits sees nothing sent overnight. Confirmed in upstream README + npm metadata.
- WhatsApp (Baileys) *can* history-sync on connect, but re-syncing on every connect is heavy
  and connect/disconnect churn raises ban heuristics.

⇒ A **persistent listener process** is mandatory. The daily piece then becomes a pure
*reader* of what that listener already captured — which also means the report path has **no
auth of its own** and can never fail with "session expired".

## Chosen approach

**Reuse the OpenClaw gateway** (already installed, already a `Restart=always` systemd unit on
the local box). It ships stock plugins `@openclaw/zalouser` ("Zalo Personal Account plugin via
native zca-js integration") and `@openclaw/whatsapp`, both currently `disabled`, plus
`openclaw message read --channel zalouser|whatsapp --json` as the read interface.
That removes ~600 lines of custom daemon/reconnect/session code we would otherwise own.

Fallback if the Phase 01 spike fails: build two own daemons (Baileys `6.7.24` + `zca-js
2.1.2`) writing to a JSONL spool. Documented in phase-01.

## Phases

| # | Phase | Effort | Blocked by | Status |
|---|-------|--------|-----------|--------|
| 01 | [Spike — validate OpenClaw channels](phase-01-spike-validate-channels.md) | 2h | — | pending |
| 02 | [Provision gateway on cron host](phase-02-provision-gateway-cron-host.md) | 2h | 01 | pending |
| 03 | [Fetch script + config + spool](phase-03-fetch-script-and-config.md) | 3h | 02 | pending |
| 04 | [Daily-report Piece 15 integration](phase-04-daily-report-piece-integration.md) | 1.5h | 03 | pending |
| 05 | [Health check + supervision](phase-05-health-check-supervision.md) | 2h | 03 | pending |
| 06 | [Docs, dual memory, rollout](phase-06-docs-memory-rollout.md) | 1h | 04, 05 | pending |

Phases 04 and 05 may run in parallel (disjoint file ownership — see each phase's
**File ownership** block). Phase 01 is a hard gate: **no other phase starts until it passes.**

## Key dependencies

- `mpfc.mpfc.live:/var/www/MyDailyAgent` is the real cron host — not this dev box. Any
  persistent session must live there. See `docs/memory/.../project_mpfc_cron_server.md`.
- `scripts/autorun-daily-report.sh` does `git pull` but **never `npm install`** — new deps do
  not reach the cron host automatically (phase-02 handles this).
- `config/*.json` is gitignored by pattern; `.enc` files are committed. `tmp/` is gitignored
  and therefore **not** synced between hosts.

## Top risks (full matrix in each phase)

| Risk | L×I | Mitigation |
|------|-----|-----------|
| OpenClaw agent auto-replies to a customer on user's personal account | Med×**Critical** | Phase 02 gate: channels enabled read-only, agent routing off, verified before any customer chat is live |
| Zalo allows only ONE web listener — user opening Zalo Web kills the daemon (and vice-versa) | **High**×Med | Unavoidable platform limit; needs explicit user acceptance (see Unresolved Q1) |
| Zalo/WhatsApp account lock from unofficial-client use | Low×**Critical** | Read-only, never send, one connection, no polling loops |
| Daemon dies → piece reports "0 messages" instead of "blind" | Med×High | Heartbeat freshness check; stale heartbeat = ALERT, never a silent 0 |

## Unresolved questions

1. **Zalo one-listener conflict** — while the daemon runs, the user cannot use Zalo Web in a
   browser (upstream README: the listener is auto-stopped). Acceptable, or is Zalo Web daily-driver?
2. **Trello gating** — start ungated/informational like Piece 14 (Performance) as planned, or
   map to a checklist item on the "Check progress" card from day one?
3. **Which chats are in scope** — all conversations, or an allowlist of customer/project
   threads? Personal Zalo/WhatsApp carry a lot of private traffic that should not land in a
   git-committed report.
4. **Host choice** — run the gateway on `mpfc` (always-on, plan assumes this), or on the local
   desktop (already running, but off at night)? Cannot be both for WhatsApp.
5. Future: is a Zalo **OA** (business) upgrade path worth considering to get a supported API?
