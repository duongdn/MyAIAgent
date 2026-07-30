# Phase 03 — Dedicated web app (Express + SSE + progress UI)

## Context Links

- Pattern source (read-only, do NOT modify): `web/server.js` — spawn at `:123-192`, stream event mapping
  at `:194-252`, `POST /api/run` at `:264-284`, `GET /api/run/:id/stream` at `:286-316`,
  `DELETE /api/run/:id` at `:318-326`
- Frontend pattern: `web/public/index.html` (93 lines), `web/public/app.js` (481 lines), `web/public/styles.css`
- Robots: `web/public/robots.txt` + `X-Robots-Tag` header set in the vhost (see phase 04)
- Skill contract: [phase-02](phase-02-skill-and-scripts.md)

## Overview

- **Priority:** P1
- **Status:** pending
- **Effort:** 2h
- Single-purpose UI: ticker input → Run → live 5-step progress + activity log → final link to the
  Google Sheets tab. Own folder, own port, own systemd unit. Shares nothing at runtime with `web/`.

## Key Insights

- `web/server.js` already solves the hard parts and they are copied, not imported (the two apps must be
  independently deployable): line-buffered `stream-json` parsing (`:150-166`), buffer replay on
  reconnect (`:297-299`), 15s SSE heartbeat (`:308-310`), `X-Accel-Buffering: no` (`:293`),
  ANSI stripping (`:108-109`).
- **Deliberate omissions** (least privilege): no `/api/chat` (`web/server.js:328-353`), no
  `/api/skills`, no free-form `args`. The only input is a ticker matching `^[A-Z0-9]{3,10}$`.
  `spawn` is called with an argv array (no shell) — but the ticker still lands inside the *prompt*
  given to an agent running `--dangerously-skip-permissions`, so regex validation is the security
  boundary, not a nicety.
- **Real progress, not a spinner:** steps are derived from streamed `tool_use` Bash command strings
  (`summariseTool` at `web/server.js:235-252` already surfaces `input.command`) — matching
  `fetch-cafef|finance-quantification-build` etc. — plus `[QUANT-STEP] n/5` markers echoed in assistant
  text (phase-02 FR4). Command-string matching is deterministic; the marker is the refinement. If
  neither appears, the UI still shows elapsed time + live activity log and never claims false progress.
- Cloudflare sits in front (see phase 04). SSE survives it today for dailyagent, and the 15s heartbeat
  keeps the connection inside Cloudflare's ~100s idle window. Buffer replay means a dropped
  EventSource reconnect loses nothing.
- Shared `node_modules` with the running dailyagent app → **zero new dependencies**. `express` only.

## Requirements

### Functional
- FR1 `GET /` → single page: ticker input, Run button, step list, activity log, result panel.
- FR2 `POST /api/run {ticker}` → `{runId}`; 400 on regex failure, 409 when that ticker is already
  running, 429 when `activeRuns` at capacity (2).
- FR3 `GET /api/run/:id/stream` → SSE: `started`, `step {n,total,label}`, `tool`, `text`, `stderr`,
  `result {tabUrl}`, `done {code,durationMs}`; replays the buffer on reconnect.
- FR4 `DELETE /api/run/:id` → SIGTERM the child.
- FR5 Hard timeout: SIGTERM at 15 min, SIGKILL at 15 min 30 s, emit `done {code:'timeout'}`.
- FR6 Final panel shows the sheet tab link, parsed from the child's JSON result line
  (`tabUrl`), and copy-to-clipboard.
- FR7 `GET /healthz` → `{ok:true, port, uptimeS}` for the deploy smoke test.

### Non-functional
- Every file < 200 lines → server split into `server.js` + `lib/run-manager.js`.
- Works on Node 22 with no build step (plain ES/CJS + vanilla JS frontend, like `web/public/app.js`).
- Frontend must be usable on mobile (single column, ~360px).

## Architecture

```
web-quantification/
├── server.js                 routes, validation, listen (QUANT_PORT || 3335)   ~120 lines
├── lib/run-manager.js        spawn, stream-json parse, SSE fanout, step map    ~150 lines
├── public/index.html         form + stepper + log + result                     ~80 lines
├── public/app.js             fetch + EventSource + render                      ~160 lines
├── public/styles.css         minimal dark theme                                ~150 lines
└── public/robots.txt         Disallow: /   (copy of web/public/robots.txt)
```

Request/data flow:

```
browser ──POST /api/run {ticker}──► validate ^[A-Z0-9]{3,10}$ ──► runId
                                       │ reject: 400 / 409 same-ticker / 429 cap
                                       ▼
                        spawn('claude', ['-p', '/me:finance-quantification FPT',
                                         '--output-format','stream-json','--verbose',
                                         '--dangerously-skip-permissions'],
                              {cwd: PROJECT_DIR, stdio:['ignore','pipe','pipe'],
                               env:{...NO_COLOR:'1', FORCE_COLOR:'0',
                                    CLAUDE_PROJECT_DIR, MYDAILYAGENT_WEB:'1'}})
                                       │ stdout: newline-delimited JSON
                                       ▼
                        handleStreamEvent → {step|tool|text|result|done} → buffer[] + clients[]
                                       │
browser ◄──GET /api/run/:id/stream (SSE, replay buffer, 15s ping)──┘
```

Step map (deterministic, from Bash command substrings):

| Match in tool command | Step |
|---|---|
| `finance-quantification-build` start / `fetch-cafef` | 1/5 Tải BCTC từ cafef |
| `[QUANT-STEP] 2` | 2/5 Kiểm tra 270=440 & map mã dòng |
| `fetch-market` / `[QUANT-STEP] 3` | 3/5 Lấy giá & vốn hóa (Vietstock) |
| `[QUANT-STEP] 4` | 4/5 Ghi tab Google Sheets |
| `[QUANT-STEP] 5` | 5/5 QA & báo cáo |

## Related Code Files

**Create:** the six files above under `web-quantification/`.

**Modify:** `package.json` — add `"web:quantification": "node web-quantification/server.js"` to
`scripts` (`package.json:2-4`). Dependencies block untouched.

**Do not touch:** `web/**`, `scripts/**`, any config.

**Delete:** none.

## Implementation Steps

1. Scaffold `web-quantification/` and copy `robots.txt` from `web/public/robots.txt`.
2. `lib/run-manager.js`: `createRun`, `startRun`, `attachClient`, `killRun`, `getRun`; port the
   line-buffered stdout parser (`web/server.js:150-166`), `stripAnsi` (`:108-109`), `broadcast`
   (`:113-119`), and the close handler incl. the 10-minute reap (`:190`). Add the step map and the
   15-min timeout. Add `MAX_CONCURRENT = 2` and an in-flight ticker set.
3. `server.js`: `express.json()`, static `public/`, the four API routes + `/healthz`, listen on
   `process.env.QUANT_PORT || 3335`. Validation lives here, before `createRun`.
4. `public/index.html` + `styles.css`: one column — input, Run/Cancel, 5-item stepper (pending →
   active with elapsed seconds → done/failed), scrolling activity log, result card with the tab link.
5. `public/app.js`: `POST /api/run` → open `EventSource` → render; auto-reconnect on `error` while
   status is unknown and de-duplicate replayed events by index; disable Run while in flight; surface
   400/409/429 messages verbatim.
6. Local test with the real skill: run against FPT, confirm all 5 steps light up, the tab link opens,
   and `Cancel` actually kills the child (`ps` check).
7. Failure-path test: submit `V`, `FPTFPTFPTFPT`, `../etc`, `FPT; rm -rf /`, `<script>` → all 400 with
   no child spawned (assert via `ps` and the absence of a `started` event).
8. Reconnect test: kill the browser tab mid-run, reopen `/`, re-attach with the runId from
   `sessionStorage` → buffered events replay, no duplicate rows.
9. `node --check` all JS; code review.

## Todo List

- [ ] 1. Scaffold folder + robots.txt
- [ ] 2. `lib/run-manager.js` (spawn, parse, SSE, step map, timeout, concurrency)
- [ ] 3. `server.js` (routes, validation, `/healthz`)
- [ ] 4. `index.html` + `styles.css` (stepper UI)
- [ ] 5. `public/app.js` (EventSource + reconnect + dedupe)
- [ ] 6. Happy-path run against FPT
- [ ] 7. Malicious/invalid input tests
- [ ] 8. Reconnect/replay test
- [ ] 9. `node --check` + code review

## Success Criteria

- `curl -s localhost:3335/healthz` → `{"ok":true,...}`.
- Submitting `FPT` in the browser: stepper reaches 5/5, result card links to the correct
  `#gid=` tab, and the tab in the shared spreadsheet is populated.
- All five malicious inputs return 400 and spawn no process.
- `DELETE /api/run/:id` leaves no orphan `claude` process (`pgrep -f finance-quantification` empty).
- Two concurrent different tickers run; a third returns 429; a duplicate ticker returns 409.
- Closing and reopening the page mid-run restores the full log with no duplicated lines.
- Every file < 200 lines; `node --check` clean.

### Test matrix

| Level | What | How |
|---|---|---|
| Unit | step-map matcher, ticker regex | `node -e` with sample tool commands / inputs |
| Integration | `/api/run` → `/stream` with a stubbed child (`node -e` printing fake stream-json) | curl + inspect SSE frames |
| E2E | real `claude -p` run for FPT | browser |
| Negative | invalid tickers, cap, duplicate, cancel, timeout (temporarily set 10s) | curl + `ps` |
| Resilience | mid-run reconnect | browser devtools |

## Risk Assessment

| Risk | L×I | Mitigation |
|------|-----|-----------|
| Prompt injection via ticker into an agent running `--dangerously-skip-permissions` | M×**H** | Strict `^[A-Z0-9]{3,10}$` server-side (not client-side); no free-form `args` endpoint; no `/api/chat`. Optionally restrict to tickers in `config/finance-watchlist.json` (open question #4, phase 01) |
| Long runs + LLM cost from repeated clicks | M×M | Concurrency cap 2, per-ticker lock, 15-min timeout, Run disabled while in flight |
| Progress stepper depends on the agent echoing markers | M×L | Primary signal is the Bash command string (deterministic); markers only refine. UI degrades to elapsed-time + log |
| Cloudflare buffering/idle-timeout kills SSE | L×M | 15s heartbeat (proven on dailyagent), `flushpackets=on` in the vhost, buffer replay + client reconnect |
| Copying `web/server.js` code duplicates future bug fixes | M×L | Accepted for deployment independence (explicit trade-off); the duplicated surface is ~80 lines and is noted in `docs/system-architecture.md` in phase 05 |
| Port 3335 taken by then | L×M | `ss -tlnp` re-check at deploy time; port comes from `QUANT_PORT` so a change is a one-line unit edit |

## Security Considerations

- Input allowlist regex is the primary control; enforced server-side before `spawn`.
- `spawn` with argv array — no shell interpolation.
- No `/api/chat`, no arbitrary skill invocation, no filesystem paths accepted from the client.
- No authentication in the app itself — Apache Basic Auth in front (phase 04). The app must therefore
  bind **127.0.0.1**-reachable only in effect; keep the default bind but never open 3335 in the
  firewall, and confirm no public listener (`curl http://142.93.46.109:3335` must fail).
- `robots.txt` + `X-Robots-Tag: noindex` (vhost) to keep it out of search indexes.
- No credentials in logs; stderr is forwarded to the browser, so the skill/script must not print secrets
  (enforced in phase 02).

## Rollback

- Stop/disable the systemd unit (phase 04) and revert the commit; `web/` and the dailyagent service are
  untouched by construction. No shared state, no migrations.

## Next Steps

- Unblocks phase 04 (needs a working `server.js` + `/healthz`).
- Backlog: if a second single-purpose app appears, extract the shared SSE/run-manager into `scripts/lib/`.

## Open Questions

1. Bind explicitly to `127.0.0.1` (safer) or keep `0.0.0.0` like `web/server.js:363`? Recommend
   `127.0.0.1` since Apache proxies from localhost.
2. Show cost/duration from the `result` event (`web/server.js:219-226` exposes `cost_usd`) or hide it?
