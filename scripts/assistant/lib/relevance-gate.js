/**
 * Relevance gate — decides what an incoming message needs from the owner.
 * 1) Hard drop (no LLM): bulk/no-reply mail (except monitoring alerts), bots, edits, empty text.
 * 2) LLM judge (claude -p, JSON schema) with: channel history (last ~12 msgs, [US] = our side),
 *    and daily-report rules loaded from memory files listed in prompts/rules-memory-files.txt.
 * Output action: "urgent" (push now) | "await_reply" (push only if our side hasn't replied in N min) | "none" (drop).
 * Calls are serialized (one claude process at a time).
 */
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const db = require('./inbox-db');
const policy = require('./policy');

const ROOT = path.join(__dirname, '..', '..', '..');
const PROMPT_PATH = path.join(__dirname, '..', 'prompts', 'relevance-gate-prompt.md');
const RULE_FILES = path.join(__dirname, '..', 'prompts', 'rules-memory-files.txt');
const SCHEMA = JSON.stringify({
  type: 'object', required: ['action', 'urgency', 'summary', 'reason'],
  properties: {
    action: { enum: ['urgent', 'await_reply', 'none'] }, urgency: { enum: ['low', 'medium', 'high'] },
    summary: { type: 'string' }, reason: { type: 'string' },
  },
});
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
      .map(f => { try { return '- ' + fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/^---[\s\S]*?---\s*/, '').slice(0, 1200).trim(); } catch { return ''; } })
      .filter(Boolean).join('\n\n');
  } catch { return ''; }
}

function askClaude(e) {
  const history = db.recentInChannel(e).map(h => `${h.ts_utc.slice(5, 16)} ${h.is_ours ? '[US] ' : ''}${h.sender}: ${h.text.replace(/\n/g, ' ').slice(0, 300)}`).join('\n');
  const msg = JSON.stringify({ source: e.source, account: e.account, channel: e.channel, sender: e.sender,
    is_direct_message: !!e.meta?.isDirect, mentions_owner: !!e.meta?.mentionsMe, text: e.text.slice(0, 3000) });
  const prompt = `${fs.readFileSync(PROMPT_PATH, 'utf8')}\n\n## Project rules from memory\n${rulesText()}\n\n## Recent history in this channel (oldest first)\n${history || '(none)'}\n\n## NEW message to judge\n${msg}`;
  return new Promise(resolve => {
    execFile('claude', ['-p', prompt, '--model', policy.load().judgeModel || 'sonnet', '--output-format', 'json', '--json-schema', SCHEMA, '--tools', ''],
      { timeout: 120000, maxBuffer: 4 << 20 }, (err, stdout) => {
        try {
          const out = JSON.parse(stdout);
          resolve(out.structured_output || JSON.parse(out.result));
        } catch {
          // Fail-safe: if the judge breaks, surface direct/mention messages, drop the rest.
          console.error(`[gate] judge failed: ${err?.message || 'bad json'}`);
          resolve({ action: e.meta?.isDirect || e.meta?.mentionsMe ? 'await_reply' : 'none', urgency: 'medium', summary: '', reason: 'judge-error' });
        }
      });
  });
}

let chain = Promise.resolve();
/** Returns {action, urgency, summary, reason}. */
function judge(e) {
  const dropped = hardDrop(e);
  if (dropped) return Promise.resolve({ action: 'none', reason: dropped });
  const p = chain.then(() => askClaude(e));
  chain = p.catch(() => {});
  return p;
}

module.exports = { judge };
