/**
 * Relevance gate — decides if an incoming message is worth the owner's attention.
 * 1) Hard drop (no LLM): bulk/no-reply mail, bots, empty text.
 * 2) LLM judge (claude -p, Haiku, JSON schema) for the rest. Calls are serialized (one claude process at a time).
 * Irrelevant messages are dropped entirely — never stored, never notified.
 */
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROMPT_PATH = path.join(__dirname, '..', 'prompts', 'relevance-gate-prompt.md');
const SCHEMA = JSON.stringify({
  type: 'object', required: ['notify', 'urgency', 'summary', 'reason'],
  properties: {
    notify: { type: 'boolean' }, urgency: { enum: ['low', 'medium', 'high'] },
    summary: { type: 'string' }, reason: { type: 'string' },
  },
});
const BULK_SENDER = /no-?reply|noreply|notifications?@|newsletter|mailer-daemon|digest|marketing/i;

function hardDrop(e) {
  if (!e.text || e.text.trim().length < 2) return 'empty';
  if (e.meta?.isBot) return 'bot';
  if (e.source === 'email' && (e.meta?.bulk || BULK_SENDER.test(e.sender || ''))) return 'bulk-mail';
  return null;
}

function askClaude(e) {
  const msg = JSON.stringify({
    source: e.source, account: e.account, channel: e.channel, sender: e.sender,
    is_direct_message: !!e.meta?.isDirect, mentions_owner: !!e.meta?.mentionsMe, text: e.text.slice(0, 3000),
  });
  const prompt = `${fs.readFileSync(PROMPT_PATH, 'utf8')}\n\n## Message\n${msg}`;
  return new Promise(resolve => {
    execFile('claude', ['-p', prompt, '--model', 'haiku', '--output-format', 'json', '--json-schema', SCHEMA, '--tools', ''],
      { timeout: 90000, maxBuffer: 4 << 20 }, (err, stdout) => {
        try {
          const out = JSON.parse(stdout);
          resolve(out.structured_output || JSON.parse(out.result));
        } catch {
          // Fail-safe: if the judge breaks, surface direct/mention messages, drop the rest.
          console.error(`[gate] judge failed: ${err?.message || 'bad json'}`);
          resolve({ notify: !!(e.meta?.isDirect || e.meta?.mentionsMe), urgency: 'medium', summary: '', reason: 'judge-error' });
        }
      });
  });
}

let chain = Promise.resolve();
/** Returns {notify, urgency, summary, reason}. */
function judge(e) {
  const dropped = hardDrop(e);
  if (dropped) return Promise.resolve({ notify: false, reason: dropped });
  const p = chain.then(() => askClaude(e));
  chain = p.catch(() => {});
  return p;
}

module.exports = { judge };
