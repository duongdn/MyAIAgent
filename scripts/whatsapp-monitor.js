#!/usr/bin/env node
/**
 * Monitor WhatsApp personal messages for DuongDN.
 * Uses whatsapp-web.js with LocalAuth (session persisted in config/.whatsapp-session/).
 *
 * First run: QR code appears — scan from WhatsApp > Linked Devices on DuongDN's phone.
 * Subsequent runs: session auto-restored, no QR needed.
 *
 * Usage:
 *   node scripts/whatsapp-monitor.js [--since=ISO8601]   # fetch messages
 *   node scripts/whatsapp-monitor.js --setup             # interactive QR scan only
 * Output: JSON to stdout (or QR to stderr for --setup)
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
    const timeout = setTimeout(() => {
      client.destroy().catch(() => {});
      reject(new Error('WhatsApp client timed out after 120s'));
    }, 120000);

    client.on('qr', (qr) => {
      process.stderr.write('[whatsapp] QR code generated — scan from WhatsApp > Linked Devices:\n');
      qrcode.generate(qr, { small: true });
      if (!SETUP_MODE) {
        process.stderr.write('[whatsapp] No saved session — run with --setup first to authenticate\n');
      }
    });

    client.on('auth_failure', (msg) => {
      clearTimeout(timeout);
      client.destroy().catch(() => {});
      reject(new Error('WhatsApp auth failed: ' + msg));
    });

    client.on('ready', async () => {
      process.stderr.write('[whatsapp] Client ready\n');

      if (SETUP_MODE) {
        process.stderr.write('[whatsapp] Setup complete — session saved to config/.whatsapp-session/\n');
        clearTimeout(timeout);
        await client.destroy();
        console.log(JSON.stringify({ setup: 'complete', session_path: SESSION_PATH }));
        resolve();
        return;
      }

      try {
        const chats = await client.getChats();
        process.stderr.write(`[whatsapp] Found ${chats.length} chats\n`);

        const results = [];
        for (const chat of chats) {
          // Only include chats with activity since last_run
          if (chat.timestamp * 1000 < since) continue;

          const messages = await chat.fetchMessages({ limit: 50 });
          const recent = messages.filter(m => m.timestamp * 1000 >= since && !m.fromMe);

          if (recent.length === 0) continue;

          results.push({
            chat_name: chat.name || chat.id.user,
            chat_id: chat.id._serialized,
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
