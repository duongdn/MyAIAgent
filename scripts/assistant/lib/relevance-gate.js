/**
 * Relevance gate — decides what an incoming message needs from the owner.
 * 1) Hard drop (no LLM): bulk/no-reply mail (except monitoring alerts), bots, edits, empty text.
 * 2) LLM judge via internal OpenAI-compatible gateway (config/.llm-gateway-config.json, policy.judgeModel,
 *    default deepseek-v4.1-flash; ~400 tokens/msg — NOT `claude -p`, which loads project context per call) with: channel history (last ~12 msgs, [US] = our side),
 *    and daily-report rules loaded from memory files listed in prompts/rules-memory-files.txt.
 * Output action: "urgent" (push now) | "await_reply" (push only if our side hasn't replied in N min) | "none" (drop).
 * Calls are serialized; daily cap policy.maxJudgeCallsPerDay (over cap → fail-safe rule, no LLM).
 */
const fs = require('fs');
const path = require('path');
const db = require('./inbox-db');
const policy = require('./policy');

const ROOT = path.join(__dirname, '..', '..', '..');
const PROMPT_PATH = path.join(__dirname, '..', 'prompts', 'relevance-gate-prompt.md');
const RULE_FILES = path.join(__dirname, '..', 'prompts', 'rules-memory-files.txt');
const GATEWAY = require('../../../config/.llm-gateway-config.json');
const BULK_SENDER = /no-?reply|noreply|notifications?@|newsletter|mailer-daemon|digest|marketing/i;
// Monitoring/alert senders are no-reply too, but may be real incidents → let the LLM judge them.
const ALERT_SENDER = /newrelic|rollbar|cloudwatch|aws-notifications|uptimerobot|sentry|cloudflare|github|bitbucket|siteground/i;

function hardDrop(e) {
  if (!e.text || e.text.trim().length < 2) return 'empty';
  if (e.meta?.isBot) return 'bot';
  if (e.meta?.isEdit) return 'edit';
  if (e.source === 'email' && !ALERT_SENDER.test(e.sender || '') && (e.meta?.bulk || BULK_SENDER.test(e.sender || ''))) return 'bulk-mail';
  return null;
}

/** Memory rule bodies (frontmatter stripped), re-read each call so memory edits apply live. */
function rulesText() {
  try {
    return fs.readFileSync(RULE_FILES, 'utf8').split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'))
      .map(f => { try { return '- ' + fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/^---[\s\S]*?---\s*/, '').slice(0, 350).trim(); } catch { return ''; } })
      .filter(Boolean).join('\n\n');
  } catch { return ''; }
}

function failSafe(e, reason) {
  // Surface direct/mention messages and real (non-bulk) emails; drop the rest.
  const keep = e.meta?.isDirect || e.meta?.mentionsMe || (e.source === 'email' && !e.meta?.bulk);
  return { action: keep ? 'await_reply' : 'none', urgency: 'medium', summary: '', reason };
}

async function askLLM(e) {
  const p = policy.load();
  const dayKey = `llm:calls:${new Date().toISOString().slice(0, 10)}`;
  const calls = Number(db.getCursor(dayKey) || 0);
  if (calls >= (p.maxJudgeCallsPerDay ?? 1500)) return failSafe(e, 'daily-cap');
  db.setCursor(dayKey, calls + 1);

  const history = db.recentInChannel(e, 8).map(h => `${h.ts_utc.slice(5, 16)} ${h.is_ours ? '[US] ' : ''}${h.sender}: ${h.text.replace(/\n/g, ' ').slice(0, 200)}`).join('\n');
  const system = `${fs.readFileSync(PROMPT_PATH, 'utf8')}\n\n## Project rules\n${rulesText()}\n\nReply ONLY JSON: {"action":"urgent|await_reply|none","urgency":"low|medium|high","summary":"...","reason":"..."}`;
  const user = `## History (oldest first)\n${history || '(none)'}\n\n## NEW message\n${JSON.stringify({ source: e.source, account: e.account, channel: e.channel, sender: e.sender,
    is_direct_message: !!e.meta?.isDirect, mentions_owner: !!e.meta?.mentionsMe, text: e.text.slice(0, 1500) })}`;
  // Gateway/network blips ("fetch failed") must not silently drop a message → retry 3x with backoff.
  for (let attempt = 1; ; attempt++) {
  try {
    const res = await fetch(`${GATEWAY.baseUrl}/chat/completions`, {
      method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${GATEWAY.apiKey}` },
      body: JSON.stringify({ model: p.judgeModel || 'deepseek-v4.1-flash', temperature: 0, max_tokens: 800,
        response_format: { type: 'json_object' }, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }),
      signal: AbortSignal.timeout(60000),
    });
    const j = await res.json();
    const v = JSON.parse(j.choices[0].message.content);
    const tk = `llm:tokens:${dayKey.slice(10)}`;
    db.setCursor(tk, Number(db.getCursor(tk) || 0) + (j.usage?.total_tokens || 0));
    if (!['urgent', 'await_reply', 'none'].includes(v.action)) throw new Error('bad action');
    return v;
  } catch (err) {
    console.error(`[gate] judge failed (try ${attempt}/3): ${err.message}`);
    if (attempt >= 3) return failSafe(e, 'judge-error');
    await new Promise(r => setTimeout(r, attempt * 20000));
  }
  }
}

let chain = Promise.resolve();
/** Returns {action, urgency, summary, reason}. */
function judge(e) {
  const dropped = hardDrop(e);
  if (dropped) return Promise.resolve({ action: 'none', reason: dropped });
  const p = chain.then(() => askLLM(e));
  chain = p.catch(() => {});
  return p;
}

module.exports = { judge };
