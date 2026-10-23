#!/usr/bin/env node
/**
 * MyDailyAssistant daemon — runs all realtime listeners + Telegram button handler in one process.
 * Run: node scripts/assistant/assistant-daemon.js   (systemd: scripts/assistant/my-daily-assistant.service)
 * Kill-switch: config/assistant-policy.json → "enabled": false (stops notifications, keeps storing).
 */
process.chdir(require('path').join(__dirname, '..', '..'));
const telegram = require('./telegram-callback-loop');
const matrix = require('./listeners/matrix-sync-listener');
const email = require('./listeners/email-imap-idle-listener');
const slack = require('./listeners/slack-listener');
const discord = require('./listeners/discord-poll-listener');

process.on('unhandledRejection', e => console.error('[daemon] unhandled', e?.message || e));
console.log(`[daemon] start ${new Date().toISOString()}`);
telegram.run();
matrix.run();
email.run();
slack.run();
discord.run();
