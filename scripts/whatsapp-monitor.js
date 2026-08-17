#!/usr/bin/env node
/**
 * Monitor WhatsApp personal messages (DuongDN).
 * Uses whatsapp-web.js with LocalAuth — session persisted in config/.whatsapp-session/.
 *
 * First run (setup):  DISPLAY=:1 node scripts/whatsapp-monitor.js --setup
 *   → QR appears in terminal, scan from WhatsApp > Linked Devices on your phone.
 *   → Session saved. Subsequent runs restore it automatically (no QR needed).
 *
 * Monitor run:  node scripts/whatsapp-monitor.js [--since=ISO8601]
 * Output: JSON to stdout
 */

const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const TIMELINES_PATH = path.join(ROOT, 'config', '.monitoring-timelines.json');
const SESSION_PATH = path.join(ROOT, 'config', '.whatsapp-session');
const SETUP_MODE = process.argv.includes('--setup');

function getSince() {
  const sinceArg = process.argv.find(a => a.startsWith('--since='));
  if (sinceArg) return new Date(sinceArg.split('=')[1]).getTime();
  const timelines = JSON.parse(fs.readFileSync(TIMELINES_PATH, 'utf8'));
  return new Date(timelines.daily_report?.last_run || Date.now() - 86400000).getTime();
}

async function main() {
  const { Client, LocalAuth } = require('whatsapp-web.js');
  const qrcode = require('qrcode-terminal');

  const since = SETUP_MODE ? 0 : getSince();
  if (!SETUP_MODE) {
    process.stderr.write(`[whatsapp] Window from ${new Date(since).toISOString()}\n`);
  }

  const client = new Client({
    authStrategy: new LocalAuth({ dataPath: SESSION_PATH }),
    puppeteer: {
      headless: true,
      executablePath: '/usr/bin/google-chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    },
  });

  return new Promise((resolve, reject) => {
    const TIMEOUT_MS = SETUP_MODE ? 180000 : 60000;
    const timeout = setTimeout(() => {
      client.destroy().catch(() => {});
      reject(new Error(SETUP_MODE
        ? 'Setup timed out — no QR scan detected within 3 min'
        : 'WhatsApp client timed out. If session expired, re-run with --setup'));
    }, TIMEOUT_MS);

    client.on('qr', (qr) => {
      process.stderr.write('[whatsapp] Scan this QR from WhatsApp > Linked Devices:\n');
      qrcode.generate(qr, { small: true });
    });

    client.on('auth_failure', (msg) => {
      clearTimeout(timeout);
      client.destroy().catch(() => {});
      reject(new Error('WhatsApp auth failed: ' + msg + ' — re-run with --setup'));
    });

    client.on('ready', async () => {
      process.stderr.write('[whatsapp] Session ready\n');

      if (SETUP_MODE) {
        clearTimeout(timeout);
        process.stderr.write(`[whatsapp] Setup complete — session saved to ${SESSION_PATH}/\n`);
        await client.destroy();
        console.log(JSON.stringify({ setup: 'complete', session_path: SESSION_PATH }));
        resolve();
        return;
      }

      try {
        const chats = await client.getChats();
        process.stderr.write(`[whatsapp] ${chats.length} chats found\n`);

        const results = [];
        for (const chat of chats) {
          if (chat.timestamp * 1000 < since) continue;
          const messages = await chat.fetchMessages({ limit: 50 });
          const recent = messages.filter(m => m.timestamp * 1000 >= since && !m.fromMe);
          if (!recent.length) continue;

          results.push({
            chat_name: chat.name || chat.id.user,
            is_group: chat.isGroup,
            unread_count: chat.unreadCount,
            messages: recent.map(m => ({
              from: m._data?.notifyName || m.author || m.from,
              body: (m.body || '').slice(0, 500),
              ts: new Date(m.timestamp * 1000).toISOString(),
              has_media: m.hasMedia,
            })),
          });
        }

        clearTimeout(timeout);
        await client.destroy();
        console.log(JSON.stringify({
          since: new Date(since).toISOString(),
          scanned_at: new Date().toISOString(),
          total_active_chats: results.length,
          chats: results,
        }, null, 2));
        resolve();
      } catch (e) {
        clearTimeout(timeout);
        await client.destroy().catch(() => {});
        reject(e);
      }
    });

    client.initialize().catch(reject);
  });
}

main().catch(e => {
  process.stderr.write('[whatsapp] Error: ' + e.message + '\n');
  process.exit(1);
});
