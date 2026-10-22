/**
 * Minimal Telegram Bot API client. Config: config/.telegram-config.json {botToken, chatId}.
 */
const cfg = require('../../../config/.telegram-config.json');

async function api(method, body = {}, timeoutMs = 40000) {
  const res = await fetch(`https://api.telegram.org/bot${cfg.botToken}/${method}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body), signal: AbortSignal.timeout(timeoutMs),
  });
  const j = await res.json();
  if (!j.ok) throw new Error(`telegram ${method}: ${j.description}`);
  return j.result;
}

/** Send plain-text message to the owner chat, optional inline buttons [[{text, callback_data}]]. */
function sendToOwner(text, buttons) {
  return api('sendMessage', {
    chat_id: cfg.chatId, text: text.slice(0, 4000), disable_web_page_preview: true,
    ...(buttons ? { reply_markup: { inline_keyboard: buttons } } : {}),
  });
}

module.exports = { api, sendToOwner, ownerChatId: cfg.chatId };
