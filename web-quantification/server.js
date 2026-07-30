"use strict";
/**
 * Quantification web UI — standalone Express app (port 3335).
 * Spawns `node scripts/finance-quantification-build.js <TICKER>` directly;
 * streams parsed PROGRESS/WARN/ERROR/DONE lines as SSE events to the browser.
 * No Claude agent involvement — deterministic, seconds, zero LLM cost.
 */
const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.WEB_PORT || 3335;
const PROJECT_DIR = path.resolve(__dirname, "..");
const SCRIPT = path.join(PROJECT_DIR, "scripts", "finance-quantification-build.js");
const TICKER_RE = /^[A-Z0-9]{3,10}$/;
const CONCURRENCY_CAP = 3;
const RUN_TIMEOUT_MS = 90_000;

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/** @type {Map<string, {status:string, ticker:string, buffer:any[], clients:any[], process:any, startedAt:number|null}>} */
const runs = new Map();
/** Per-ticker lock: prevents concurrent runs for same ticker */
const locks = new Set();

// ── SSE helpers ──────────────────────────────────────────────────────────────

function broadcast(run, data) {
  run.buffer.push(data);
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  for (const c of run.clients) { try { c.write(payload); } catch (_) {} }
}

function startRun(runId, ticker) {
  const run = runs.get(runId);
  if (!run) return;

  const proc = spawn("node", [SCRIPT, ticker], {
    cwd: PROJECT_DIR,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NO_COLOR: "1", FORCE_COLOR: "0" },
  });

  run.process = proc;
  run.status = "running";
  run.startedAt = Date.now();
  broadcast(run, { type: "started", ticker });

  let stdoutBuf = "";

  proc.stdout.on("data", (chunk) => {
    stdoutBuf += chunk.toString();
    const lines = stdoutBuf.split("\n");
    stdoutBuf = lines.pop();
    for (const line of lines) {
      if (!line.trim()) continue;
      if (line.startsWith("PROGRESS:")) {
        const m = line.match(/^PROGRESS:\s+(\d\/\d)\s+(.+)/);
        broadcast(run, { type: "progress", step: m?.[1] || "", message: m?.[2] || line.slice(10).trim() });
      } else if (line.startsWith("WARN:")) {
        broadcast(run, { type: "warn", message: line.slice(6).trim() });
      } else if (line.startsWith("DONE:")) {
        broadcast(run, { type: "done", url: line.slice(6).trim() });
      } else if (line.startsWith("ERROR:")) {
        broadcast(run, { type: "error", message: line.slice(7).trim() });
      } else {
        broadcast(run, { type: "log", text: line });
      }
    }
  });

  proc.stderr.on("data", (chunk) => {
    const text = chunk.toString().trim();
    if (!text) return;
    if (text.startsWith("ERROR:")) {
      broadcast(run, { type: "error", message: text.slice(7).trim() });
    } else {
      broadcast(run, { type: "stderr", text });
    }
  });

  proc.on("close", (code) => {
    // Flush
    if (stdoutBuf.trim()) {
      if (stdoutBuf.startsWith("DONE:")) broadcast(run, { type: "done", url: stdoutBuf.slice(6).trim() });
      else if (stdoutBuf.startsWith("ERROR:")) broadcast(run, { type: "error", message: stdoutBuf.slice(7).trim() });
    }
    if (run.status === "running") run.status = code === 0 ? "done" : "error";
    run.exitCode = code;
    broadcast(run, { type: "closed", code });
    for (const c of run.clients) { try { c.end(); } catch (_) {} }
    run.clients = [];
    locks.delete(ticker);
    setTimeout(() => runs.delete(runId), 10 * 60_000);
  });

  // Timeout
  setTimeout(() => {
    if (run.status === "running") {
      proc.kill("SIGTERM");
      broadcast(run, { type: "error", message: "TIMEOUT — quá 90 giây" });
      locks.delete(ticker);
    }
  }, RUN_TIMEOUT_MS);
}

// ── Routes ───────────────────────────────────────────────────────────────────

app.post("/api/run", (req, res) => {
  const { ticker } = req.body;
  if (!ticker || !TICKER_RE.test(ticker.toUpperCase())) {
    return res.status(400).json({ error: "INVALID_TICKER — mã phải 3-10 ký tự A-Z/0-9" });
  }

  const t = ticker.toUpperCase();

  // Concurrency cap
  const active = [...runs.values()].filter((r) => r.status === "running");
  if (active.length >= CONCURRENCY_CAP) return res.status(429).json({ error: "TOO_MANY_RUNS — đang chạy " + CONCURRENCY_CAP + " tác vụ, thử lại sau" });

  // Per-ticker lock
  if (locks.has(t)) return res.status(409).json({ error: "ALREADY_RUNNING — đang chạy cho mã " + t });

  locks.add(t);
  const runId = crypto.randomUUID();
  runs.set(runId, { status: "starting", ticker: t, buffer: [], clients: [], process: null, startedAt: null });
  res.json({ runId, ticker: t });
  setImmediate(() => startRun(runId, t));
});

app.get("/api/run/:id/stream", (req, res) => {
  const run = runs.get(req.params.id);
  if (!run) return res.status(404).json({ error: "Run not found" });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  for (const data of run.buffer) res.write(`data: ${JSON.stringify(data)}\n\n`);

  if (run.status === "done" || run.status === "error") { res.end(); return; }

  run.clients.push(res);
  const hb = setInterval(() => { try { res.write(": ping\n\n"); } catch (_) { clearInterval(hb); } }, 15000);

  req.on("close", () => { clearInterval(hb); run.clients = run.clients.filter((c) => c !== res); });
});

app.delete("/api/run/:id", (req, res) => {
  const run = runs.get(req.params.id);
  if (!run) return res.status(404).json({ error: "Run not found" });
  if (run.process && run.status === "running") { run.process.kill("SIGTERM"); locks.delete(run.ticker); }
  res.json({ killed: true });
});

app.get("/api/runs", (_req, res) => {
  res.json([...runs.entries()].map(([id, r]) => ({ id, ticker: r.ticker, status: r.status, startedAt: r.startedAt })));
});

// Health check (Apache/nginx probes)
app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`quantification-web → http://localhost:${PORT}`));
