'use strict';

const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.WEB_PORT || 3333;
const PROJECT_DIR = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(PROJECT_DIR, '.claude', 'skills');
const COMMANDS_ME_DIR = path.join(PROJECT_DIR, '.claude', 'commands', 'me');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/** @type {Map<string, {status: string, skillName: string, prompt: string, clients: any[], buffer: any[], process: any}>} */
const activeRuns = new Map();

// --- Skill discovery ---

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const result = {};
  const lines = match[1].split('\n');
  let currentKey = null;
  let multilineLines = null;

  for (const line of lines) {
    const kvMatch = line.match(/^([\w-]+): ?(.*)/);
    if (kvMatch) {
      if (currentKey && multilineLines) {
        result[currentKey] = multilineLines.join(' ');
        currentKey = null;
        multilineLines = null;
      }
      const [, key, val] = kvMatch;
      const stripped = val.replace(/^["']|["']$/g, '');
      if (val === '>-' || val === '>' || val === '|') {
        currentKey = key;
        multilineLines = [];
      } else {
        result[key] = stripped;
      }
    } else if (currentKey !== null && multilineLines !== null) {
      if (line.startsWith('  ')) {
        multilineLines.push(line.trim());
      } else if (line.trim()) {
        // continuation without indent — stop multiline
        result[currentKey] = multilineLines.join(' ');
        currentKey = null;
        multilineLines = null;
      }
    }
  }
  if (currentKey && multilineLines) {
    result[currentKey] = multilineLines.join(' ');
  }
  return result;
}

function scanSkills() {
  const skills = [];
  const seen = new Set();

  // Commands in .claude/commands/me/ — each .md file is a me: command
  try {
    for (const entry of fs.readdirSync(COMMANDS_ME_DIR, { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
      const slug = entry.name.replace(/\.md$/, '');
      const name = `me:${slug}`;
      if (seen.has(name)) continue;
      try {
        const content = fs.readFileSync(path.join(COMMANDS_ME_DIR, entry.name), 'utf8');
        const fm = parseFrontmatter(content);
        skills.push({ id: slug, name, description: (fm.description || '').slice(0, 120) });
        seen.add(name);
      } catch (_) { /* skip */ }
    }
  } catch (_) { /* dir missing */ }

  // Skills in .claude/skills/ with name: me:* (e.g. mpfc-monitor)
  try {
    for (const entry of fs.readdirSync(SKILLS_DIR, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const skillFile = path.join(SKILLS_DIR, entry.name, 'SKILL.md');
      if (!fs.existsSync(skillFile)) continue;
      try {
        const content = fs.readFileSync(skillFile, 'utf8');
        const fm = parseFrontmatter(content);
        if (fm.name && fm.name.startsWith('me:') && !seen.has(fm.name)) {
          skills.push({ id: entry.name, name: fm.name, description: (fm.description || '').slice(0, 120) });
          seen.add(fm.name);
        }
      } catch (_) { /* skip */ }
    }
  } catch (_) { /* dir missing */ }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

// --- SSE broadcast helper ---

function broadcast(run, data) {
  run.buffer.push(data);
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  for (const client of run.clients) {
    try { client.write(payload); } catch (_) { /* disconnected */ }
  }
}

// --- Process runner ---

function startRun(runId, prompt) {
  const run = activeRuns.get(runId);
  if (!run) return;

  const proc = spawn('claude', [
    '-p', prompt,
    '--output-format', 'stream-json',
    '--verbose',
    '--dangerously-skip-permissions',
  ], {
    cwd: PROJECT_DIR,
    env: { ...process.env, FORCE_COLOR: '1', CLAUDE_PROJECT_DIR: PROJECT_DIR },
  });

  run.process = proc;
  run.status = 'running';
  run.startedAt = Date.now();

  broadcast(run, { type: 'started', prompt });

  let stdoutBuf = '';

  proc.stdout.on('data', (chunk) => {
    stdoutBuf += chunk.toString();
    const lines = stdoutBuf.split('\n');
    stdoutBuf = lines.pop(); // keep incomplete line

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const parsed = JSON.parse(line);
        handleStreamEvent(run, parsed);
      } catch (_) {
        broadcast(run, { type: 'raw', text: line });
      }
    }
  });

  proc.stderr.on('data', (chunk) => {
    broadcast(run, { type: 'stderr', text: chunk.toString() });
  });

  proc.on('close', (code) => {
    // Flush any remaining buffer
    if (stdoutBuf.trim()) {
      try {
        const parsed = JSON.parse(stdoutBuf);
        handleStreamEvent(run, parsed);
      } catch (_) {
        broadcast(run, { type: 'raw', text: stdoutBuf });
      }
    }
    run.status = code === 0 ? 'done' : 'error';
    run.exitCode = code;
    broadcast(run, { type: 'done', code, durationMs: Date.now() - run.startedAt });
    for (const client of run.clients) {
      try { client.end(); } catch (_) {}
    }
    run.clients = [];
    setTimeout(() => activeRuns.delete(runId), 10 * 60 * 1000);
  });
}

function handleStreamEvent(run, parsed) {
  switch (parsed.type) {
    case 'system':
      if (parsed.subtype === 'init') {
        broadcast(run, { type: 'init', sessionId: parsed.session_id });
      }
      break;

    case 'assistant': {
      const blocks = parsed.message?.content || [];
      for (const block of blocks) {
        if (block.type === 'text') {
          broadcast(run, { type: 'text', text: block.text });
        } else if (block.type === 'tool_use') {
          const summary = summariseTool(block);
          broadcast(run, { type: 'tool', name: block.name, summary });
        }
      }
      break;
    }

    case 'tool_result':
      // Skip — verbose
      break;

    case 'result':
      broadcast(run, {
        type: 'result',
        subtype: parsed.subtype,
        isError: parsed.is_error,
        costUsd: parsed.cost_usd,
        durationMs: parsed.duration_ms,
      });
      break;

    default:
      // Ignore other event types
      break;
  }
}

function summariseTool(block) {
  const input = block.input || {};
  switch (block.name) {
    case 'Bash':
      return (input.command || '').slice(0, 120);
    case 'Read':
      return input.file_path || '';
    case 'Edit':
    case 'Write':
      return input.file_path || '';
    case 'WebSearch':
      return input.query || '';
    case 'WebFetch':
      return input.url || '';
    default:
      return JSON.stringify(input).slice(0, 80);
  }
}

// --- Routes ---

app.get('/api/skills', (_req, res) => {
  try {
    res.json(scanSkills());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/run', (req, res) => {
  const { skillName, args = '' } = req.body;
  if (!skillName) return res.status(400).json({ error: 'skillName required' });

  const runId = crypto.randomUUID();
  const prompt = args.trim() ? `/${skillName} ${args.trim()}` : `/${skillName}`;

  activeRuns.set(runId, {
    status: 'starting',
    skillName,
    prompt,
    clients: [],
    buffer: [],
    process: null,
    startedAt: null,
    exitCode: null,
  });

  res.json({ runId });
  setImmediate(() => startRun(runId, prompt));
});

app.get('/api/run/:id/stream', (req, res) => {
  const run = activeRuns.get(req.params.id);
  if (!run) return res.status(404).json({ error: 'Run not found' });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  // Replay buffered events
  for (const data of run.buffer) {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }

  if (run.status === 'done' || run.status === 'error') {
    res.end();
    return;
  }

  run.clients.push(res);

  const heartbeat = setInterval(() => {
    try { res.write(': ping\n\n'); } catch (_) { clearInterval(heartbeat); }
  }, 15000);

  req.on('close', () => {
    clearInterval(heartbeat);
    run.clients = run.clients.filter(c => c !== res);
  });
});

app.delete('/api/run/:id', (req, res) => {
  const run = activeRuns.get(req.params.id);
  if (!run) return res.status(404).json({ error: 'Run not found' });

  if (run.process && run.status === 'running') {
    run.process.kill('SIGTERM');
  }
  res.json({ killed: true });
});

app.get('/api/runs', (_req, res) => {
  const runs = [];
  for (const [id, run] of activeRuns) {
    runs.push({ id, skillName: run.skillName, status: run.status, startedAt: run.startedAt });
  }
  res.json(runs);
});

app.listen(PORT, () => {
  console.log(`MyDailyAgent UI → http://localhost:${PORT}`);
});
