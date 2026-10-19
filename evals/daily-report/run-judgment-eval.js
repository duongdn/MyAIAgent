#!/usr/bin/env node
// Judgment eval: does the model, given ONLY the memory rules for a case, decide alert/no-alert correctly?
// Measures whether docs/memory rules are clear enough to prevent past false alerts.
//
// Usage: node evals/daily-report/run-judgment-eval.js [--provider claude|deepseek] [--model M] [--case id] [--runs N]
//   claude   → `claude -p` headless (uses Claude Code subscription), default model haiku
//   deepseek → DeepSeek API (OpenAI-compatible), key in config/.deepseek-config.json {"api_key": "..."}
//             Cases are synthetic; never put real customer data in cases sent to DeepSeek.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..', '..');
const MEM = path.join(ROOT, 'docs', 'memory');
const arg = (k, d) => { const i = process.argv.indexOf(k); return i >= 0 ? process.argv[i + 1] : d; };
const provider = arg('--provider', 'claude');
const model = arg('--model', provider === 'claude' ? 'haiku' : 'deepseek-chat');
const runs = +arg('--runs', 1);
const onlyCase = arg('--case');

const SYSTEM = `You are the daily-report monitoring assistant for a PM. Decide whether the scenario is an ALERT
(needs the PM's attention / blocks the Trello checklist item) or NOT an alert.
Apply ONLY the rules below; they are corrections the PM made after past mistakes.
Reply with JSON only: {"alert": true|false, "reason": "<one sentence>"}`;

const stripFrontmatter = s => s.replace(/^---[\s\S]*?\n---\n/, '');
const buildPrompt = c => SYSTEM + '\n\n# RULES\n' +
  c.memory.map(f => `## ${f}\n${stripFrontmatter(fs.readFileSync(path.join(MEM, f), 'utf8'))}`).join('\n') +
  `\n\n# SCENARIO\n${c.scenario}`;

function askClaude(prompt) {
  const r = spawnSync('claude', ['-p', '--model', model, '--output-format', 'json'], { input: prompt, encoding: 'utf8', timeout: 180000 });
  if (r.status !== 0) throw new Error(r.stderr || `claude exit ${r.status}`);
  return JSON.parse(r.stdout).result;
}

async function askDeepSeek(prompt) {
  const { api_key } = JSON.parse(fs.readFileSync(path.join(ROOT, 'config', '.deepseek-config.json'), 'utf8'));
  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${api_key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages: [{ role: 'user', content: prompt }], response_format: { type: 'json_object' }, temperature: 0 }),
  });
  if (!res.ok) throw new Error(`DeepSeek HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).choices[0].message.content;
}

const parse = text => JSON.parse(text.match(/\{[\s\S]*\}/)[0]);

(async () => {
  const cases = JSON.parse(fs.readFileSync(path.join(__dirname, 'judgment-cases.json'), 'utf8'))
    .filter(c => !onlyCase || c.id === onlyCase);
  let pass = 0, total = 0, fp = 0, fn = 0;
  for (const c of cases) {
    for (let i = 0; i < runs; i++) {
      total++;
      let out;
      try {
        const text = provider === 'deepseek' ? await askDeepSeek(buildPrompt(c)) : askClaude(buildPrompt(c));
        out = parse(text);
      } catch (e) { console.log(`💥 ${c.id}: ${e.message.slice(0, 150)}`); continue; }
      const ok = out.alert === c.expected.alert;
      if (ok) pass++; else if (out.alert) fp++; else fn++;
      console.log(`${ok ? '✅' : '❌'} ${c.id.padEnd(36)} expected=${c.expected.alert} got=${out.alert}${ok ? '' : `  — ${out.reason}`}`);
    }
  }
  console.log(`\n${provider}/${model}: ${pass}/${total} = ${(100 * pass / total).toFixed(0)}%  | false alerts: ${fp}, missed alerts: ${fn}`);
  process.exit(pass === total ? 0 : 1);
})();
