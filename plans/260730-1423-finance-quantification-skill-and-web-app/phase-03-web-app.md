# Phase 03 — Dedicated web app (Express + SSE + progress UI)

## Context Links

- Pattern source (read-only, do NOT modify): `web/server.js` — SSE fanout `:113-119`, line-buffered
  child stdout parsing `:150-166`, ANSI strip `:108-109`, `GET /api/run/:id/stream` `:286-316`
  (buffer replay `:297-299`, 15s heartbeat `:308-310`, `X-Accel-Buffering: no` `:293`),
  `DELETE /api/run/:id` `:318-326`, close/reap handler `:173-192`
- Frontend pattern: `web/public/index.html` (93 lines), `web/public/app.js` (481 lines), `web/public/styles.css`
- Script contract (blocking dependency): [phase-02](phase-02-skill-and-scripts.md) FR4 —
  `PROGRESS: n/5 <label>` · `WARN: <msg>` · `DONE: <tabUrl>` · `ERROR: <CODE> <msg>`

## Overview

- **Priority:** P1
- **Status:** pending
- **Effort:** 2h
- Single-purpose UI: ticker input → Run → live 5-step progress → link to the Google Sheets tab.
  Own folder, own port, own systemd unit. **Spawns the deterministic build script directly — no agent,
  no `claude -p`, no `stream-json`** (user decision 2026-07-30).

## Key Insights

- **The child process is `node scripts/finance-quantification-build.js <TICKER>`.** Consequences, all
  good: runtime is seconds not minutes, zero LLM cost, no non-determinism in the progress signal, and
  **no prompt-injection surface at all** — there is no agent to inject into. The
  `--dangerously-skip-permissions` threat model that applies to the dashboard app does not apply here.
- **Progress is exact, not heuristic.** The server reads the child's stdout line-by-line and maps the
  four prefixes straight onto SSE events. No guessing from tool-call names. If the line contract
  changes, the UI breaks loudly rather than silently mis-reporting — hence the contract test in phase 02.
- Still copy (not import) the SSE plumbing from `web/server.js` so the two apps stay independently
  deployable: `broadcast` (`:113-119`), split-on-newline buffering with a retained partial line
  (`:150-166`), `stripAnsi` (`:108-109`), buffer replay on reconnect (`:297-299`), 15s heartbeat
  (`:308-310`). ~60 lines of deliberate duplication; recorded in `docs/system-architecture.md` (phase 05).
- **Deliberate omissions** (least privilege): no `/api/chat` (`web/server.js:328-353`), no `/api/skills`,
  no free-form `args`, no skill/command/script name accepted from the client. The only input is a ticker.
- Ticker input is **free-form** (no `config/finance-watchlist.json` gate — user decision 2026-07-30),
  validated by `^[A-Z0-9]{3,10}$`. An unknown ticker is simply fetched fresh by the script.
- Timeouts/concurrency get much cheaper: a run should finish in < 30s, so the hard timeout is **90s**
  (not 15 min) and the cap can stay small.
- Cloudflare sits in front (phase 04). Runs now finish well inside Cloudflare's ~100s idle window, so
  the 524 risk largely evaporates; the 15s heartbeat is kept anyway as cheap insurance.
- Shared `node_modules` with the running dailyagent app → **zero new dependencies**. `express` only.

## Requirements

### Functional
- FR1 `GET /` → single page: ticker input, Run button, 5-step stepper, activity log, result panel.
- FR2 `POST /api/run {ticker}` → `{runId}`; **400** on regex failure, **409** when that ticker is
  already running, **429** when at the concurrency cap (3).
- FR3 `GET /api/run/:id/stream` → SSE events, replaying the buffer on reconnect:

  | event | payload | source |
  |---|---|---|
  | `started` | `{ticker}` | on spawn |
  | `step` | `{n, total:5, label}` | stdout `PROGRESS: n/5 label` |
  | `warn` | `{text}` | stdout `WARN: …` |
  | `log` | `{text}` | any other stdout line + all stderr |
  | `result` | `{tabUrl}` | stdout `DONE: <url>` |
  | `failed` | `{code, message}` | stdout `ERROR: <CODE> <msg>` |
  | `done` | `{exitCode, durationMs}` | child `close` |

- FR4 `DELETE /api/run/:id` → SIGTERM the child.
- FR5 Hard timeout: SIGTERM at 90s, SIGKILL at 100s, emit `done {exitCode:'timeout'}`.
- FR6 Result panel shows the tab link from the `result` event (opens in a new tab, copy-to-clipboard).
  On `failed`, show the `ERROR:` code + message verbatim — never a generic "something went wrong".
- FR7 `GET /healthz` → `{ok:true, port, uptimeS}` for the deploy smoke test.

### Non-functional
- Every file < 200 lines → server split into `server.js` + `lib/run-manager.js`.
- No build step (CJS server + vanilla JS frontend, like `web/public/app.js`).
- Usable on mobile (single column, ~360px).

## Architecture

```
web-quantification/
├── server.js                 routes, ticker validation, listen (QUANT_PORT || 3335)  ~110 lines
├── lib/run-manager.js        spawn script, parse stdout lines, SSE fanout, timeout   ~130 lines
├── public/index.html         form + stepper + log + result                            ~80 lines
├── public/app.js             fetch + EventSource + render                             ~150 lines
├── public/styles.css         minimal dark theme                                       ~150 lines
└── public/robots.txt         Disallow: /   (copy of web/public/robots.txt)
```

Request/data flow:

```
browser ──POST /api/run {ticker}──► validate /^[A-Z0-9]{3,10}$/ (after toUpperCase)
                                       │ reject: 400 bad ticker · 409 same ticker running · 429 cap
                                       ▼
              spawn('node', [PROJECT_DIR + '/scripts/finance-quantification-build.js', TICKER],
                    { cwd: PROJECT_DIR,
                      stdio: ['ignore','pipe','pipe'],
                      env: { ...process.env, NO_COLOR:'1', FORCE_COLOR:'0' } })
                                       │ stdout: newline-delimited plain text
                                       ▼
        line router:  /^PROGRESS: (\d+)\/(\d+) (.*)$/ → step
                      /^WARN: (.*)$/                  → warn
                      /^DONE: (\S+)$/                 → result
                      /^ERROR: (\S+) (.*)$/           → failed
                      else                            → log
                                       │
                                 buffer[] + clients[]
                                       │
browser ◄──GET /api/run/:id/stream (SSE, replay buffer, 15s ping)──┘
```

The 5 steps rendered by the stepper (labels come from the script; the UI does not hardcode them):

| n | label emitted by the script |
|---|---|
| 1 | Tải BCTC từ cafef |
| 2 | Kiểm tra 270=440 & map mã dòng |
| 3 | Lấy giá & vốn hóa (Vietstock) |
| 4 | Ghi tab Google Sheets |
| 5 | QA & hoàn tất |

## Related Code Files

**Create:** the six files above under `web-quantification/`.

**Modify:** `package.json` — add `"web:quantification": "node web-quantification/server.js"` to
`scripts` (`package.json:2-4`). Dependencies block untouched.

**Do not touch:** `web/**`, `scripts/**` (phase 02 owns those), any config.

**Delete:** none.

## Implementation Steps

1. Scaffold `web-quantification/` and copy `robots.txt` from `web/public/robots.txt`.
2. `lib/run-manager.js`: `createRun`, `startRun`, `attachClient`, `killRun`, `getRun`. Port the
   line-buffered stdout reader (`web/server.js:150-166`), `stripAnsi` (`:108-109`), `broadcast`
   (`:113-119`) and the close handler with its 10-minute reap (`:190`). Add the four-prefix line
   router, `MAX_CONCURRENT = 3`, an in-flight ticker `Set`, and the 90s/100s timeout pair.
   Resolve the script path from `path.resolve(__dirname,'..','..','scripts',…)` — never from client input.
3. `server.js`: `express.json()`, static `public/`, the four API routes + `/healthz`, bind
   `127.0.0.1` on `process.env.QUANT_PORT || 3335`. Ticker validation lives here, before `createRun`.
4. `public/index.html` + `styles.css`: one column — input, Run/Cancel, 5-item stepper (pending →
   active with elapsed seconds → done/failed), scrolling activity log, result card with the tab link.
   `warn` events render as a distinct amber line so an omitted P/E TTM is visible, not buried.
5. `public/app.js`: `POST /api/run` → open `EventSource` → render; store `runId` in `sessionStorage`
   for reconnect; de-duplicate replayed events by index; disable Run while in flight; surface
   400/409/429 bodies verbatim.
6. Happy path against the real script: run `FPT`, confirm all 5 steps light up **incrementally**
   (not all at once at the end — proves no output buffering) and the tab link opens the right `#gid=`.
7. Failure paths: `V`, `FPTFPTFPTFPT`, `../etc`, `FPT; rm -rf /`, `<script>` → all 400, no child
   spawned (assert via `ps`, and no `started` event). Then `VCB` → `failed` event showing
   `UNSUPPORTED_CHART_OF_ACCOUNTS`, non-zero exit, UI shows the real code.
8. Reconnect test: close the tab mid-run, reopen `/`, re-attach with the `sessionStorage` runId →
   buffered events replay with no duplicated log lines.
9. Cancel + timeout tests: `DELETE` kills the child (`pgrep -f finance-quantification` empty);
   temporarily lower the timeout to 3s to exercise the SIGTERM→SIGKILL path.
10. `node --check` all JS; code review.

## Todo List

- [ ] 1. Scaffold folder + robots.txt
- [ ] 2. `lib/run-manager.js` (spawn script, 4-prefix line router, SSE, timeout, concurrency)
- [ ] 3. `server.js` (routes, ticker validation, `/healthz`, bind 127.0.0.1)
- [ ] 4. `index.html` + `styles.css` (stepper + amber warn lines)
- [ ] 5. `public/app.js` (EventSource + reconnect + dedupe)
- [ ] 6. Happy-path run against FPT (incremental streaming verified)
- [ ] 7. Invalid-input + `VCB` abort tests
- [ ] 8. Reconnect/replay test
- [ ] 9. Cancel + timeout tests
- [ ] 10. `node --check` + code review

## Success Criteria

- `curl -s 127.0.0.1:3335/healthz` → `{"ok":true,…}`.
- Submitting `FPT`: stepper reaches 5/5 with steps appearing **one at a time**, result card links to
  the correct `#gid=` tab, and the tab in the shared spreadsheet is populated. End-to-end < 30s.
- `VCB` surfaces `UNSUPPORTED_CHART_OF_ACCOUNTS` in the UI and creates no tab.
- All five malicious/invalid inputs return 400 and spawn no process.
- `DELETE /api/run/:id` leaves no orphan process (`pgrep -f finance-quantification` empty).
- Three concurrent different tickers run; a fourth returns 429; a duplicate ticker returns 409.
- Closing and reopening the page mid-run restores the full log with no duplicated lines.
- `grep -rn "claude\|stream-json\|dangerously-skip-permissions" web-quantification/` → **no match**.
- Every file < 200 lines; `node --check` clean.

### Test matrix

| Level | What | How |
|---|---|---|
| Unit | line-router regexes (all four prefixes + a plain line), ticker regex | `node -e` with sample lines |
| Integration | `/api/run` → `/stream` against a stub child (`node -e` printing the four prefixes with delays) | `curl -N` + inspect SSE frames |
| E2E | real script run for `FPT` | browser |
| Negative | invalid tickers, cap 429, duplicate 409, cancel, timeout (temporarily 3s), `VCB` abort | curl + `ps` |
| Resilience | mid-run reconnect + buffer replay | browser devtools |
| Isolation | dashboard app unaffected | `curl 127.0.0.1:3334/api/skills` still 200 |

## Risk Assessment

| Risk | L×I | Mitigation |
|------|-----|-----------|
| Script's output-line contract drifts → stepper silently wrong | M×M | Phase-02 contract test owns the format; the router treats unmatched lines as `log` (visible, never dropped); a run that never emits `DONE:`/`ERROR:` still reports the child's exit code |
| Node buffers the child's stdout so progress arrives in one burst | M×M | Script uses `process.stdout.write` per line (phase 02 FR4); a pipe forwards as written; step 6 explicitly verifies incremental arrival |
| Long-lived SSE dropped by Cloudflare | L×L | Runs finish in seconds now; 15s heartbeat + buffer replay retained anyway |
| Copying `web/server.js` plumbing duplicates future fixes | M×L | Accepted for deployment independence; ~60 lines; documented in `docs/system-architecture.md` (phase 05) |
| Port 3335 taken by deploy time | L×M | `ss -tlnp` re-check in phase 04; port comes from `QUANT_PORT` so a change is a one-line unit edit |
| Repeated clicks spawn many Sheets-writing children on the same tab | L×M | Per-ticker lock (409) + cap 3 (429) + Run disabled while in flight |
| A crashing child leaves the UI hanging | L×M | `close` handler always emits `done` with the exit code; 90s hard timeout as backstop |

## Security Considerations

- **No agent is spawned**, so there is no prompt-injection surface and no `--dangerously-skip-permissions`
  exposure. The child is a fixed script path resolved server-side; the client cannot name a command, a
  script, a skill, or a file.
- `spawn` is called with an argv array (no shell), and the single argument is a ticker already matched
  against `^[A-Z0-9]{3,10}$` server-side. Client-side validation is convenience only.
- No `/api/chat`, no `/api/skills`, no free-form args — the whole API surface is 4 routes + `/healthz`.
- Bind `127.0.0.1` so the app is reachable only through the Apache proxy; verify
  `curl http://142.93.46.109:3335/` fails from outside (phase 04).
- Authentication is Apache Basic Auth in front (phase 04); the app itself has none by design.
- `robots.txt` `Disallow: /` + `X-Robots-Tag: noindex` from the vhost.
- The child's stderr is forwarded to the browser, so the script must never print credentials
  (enforced in phase 02); the service-account key path is resolved inside the script, never passed
  through the web layer.

## Rollback

- Stop/disable the systemd unit (phase 04) and revert the commit. `web/` and the dailyagent service are
  untouched by construction. No shared state, no migrations.

## Next Steps

- Unblocks phase 04 (needs a working `server.js` + `/healthz`).
- Backlog: if a second single-purpose app appears, extract the shared SSE/run-manager into `scripts/lib/`.

## Decisions (locked)

- Child process = the build script directly, never `claude -p`.
- Ticker input free-form, gated only by `^[A-Z0-9]{3,10}$`.
- Bind `127.0.0.1` (Apache proxies from localhost).
- No LLM cost/duration display — there is no LLM; the result panel shows wall-clock duration only.

No open questions.
