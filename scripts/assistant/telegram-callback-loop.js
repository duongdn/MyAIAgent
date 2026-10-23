/**
 * Long-polls Telegram getUpdates and handles owner button presses / commands.
 * Only the owner chat_id is accepted; everything else is ignored.
 */
const tg = require('./lib/telegram-client');
const db = require('./lib/inbox-db');
const policy = require('./lib/policy');
const { muteKey } = require('./lib/event-intake');

async function handleCallback(q) {
  if (q.from.id !== tg.ownerChatId) return;
  const [action, idStr] = q.data.split(':');
  const ev = db.getEvent(Number(idStr));
  let note = 'Không tìm thấy event';
  if (ev && action === 'seen') { db.setStatus(ev.id, 'seen'); note = '👀 Đã xem'; }
  if (ev && action === 'mute') { policy.mute(muteKey(ev)); db.setStatus(ev.id, 'seen'); note = `🔇 Đã mute ${muteKey(ev)}`; }
  await tg.api('answerCallbackQuery', { callback_query_id: q.id, text: note });
  if (ev) await tg.api('editMessageReplyMarkup', {
    chat_id: q.message.chat.id, message_id: q.message.message_id,
    reply_markup: { inline_keyboard: [[{ text: note, callback_data: 'noop:0' }]] },
  }).catch(() => {});
}

async function handleMessage(m) {
  if (m.chat.id !== tg.ownerChatId) return;
  const t = (m.text || '').trim();
  if (t === '/status' || t === '/start') {
    const p = policy.load();
    const d = new Date().toISOString().slice(0, 10);
    await tg.sendToOwner(`🤖 Assistant đang chạy.\nenabled=${p.enabled} · dryRun=${p.dryRun} · model=${p.judgeModel}\n` +
      `LLM hôm nay: ${db.getCursor('llm:calls:' + d) || 0} lần / ${db.getCursor('llm:tokens:' + d) || 0} tokens (cap ${p.maxJudgeCallsPerDay})\n` +
      `poll (phút): ${JSON.stringify(p.pollMinutes)}\nmuted: ${p.muted.join(', ') || '-'}`);
  }
}

async function run() {
  let offset = Number(db.getCursor('telegram:offset') || 0);
  for (;;) {
    try {
      const updates = await tg.api('getUpdates', { offset, timeout: 30, allowed_updates: ['message', 'callback_query'] });
      for (const u of updates) {
        offset = u.update_id + 1;
        db.setCursor('telegram:offset', offset);
        if (u.callback_query) await handleCallback(u.callback_query).catch(e => console.error('[tg] cb', e.message));
        if (u.message) await handleMessage(u.message).catch(e => console.error('[tg] msg', e.message));
      }
    } catch (err) {
      console.error(`[tg] poll error: ${err.message}`);
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}

module.exports = { run };
