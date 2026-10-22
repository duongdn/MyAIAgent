/**
 * Assistant policy (non-secret, tracked): config/assistant-policy.json.
 * Re-read on every call so edits (e.g. mute from Telegram) apply without restart.
 */
const fs = require('fs');
const path = require('path');
const POLICY_PATH = path.join(__dirname, '..', '..', '..', 'config', 'assistant-policy.json');
const DEFAULTS = { enabled: true, dryRun: true, desktopPopup: true, muted: [] };

function load() {
  try { return { ...DEFAULTS, ...JSON.parse(fs.readFileSync(POLICY_PATH, 'utf8')) }; }
  catch { return { ...DEFAULTS }; }
}
function save(p) { fs.writeFileSync(POLICY_PATH, JSON.stringify(p, null, 2) + '\n'); }

/** Mute key format: "<source>:<account>:<channel>" — prefix match, so "email:ken@..." mutes whole account. */
function isMuted(e) {
  const key = `${e.source}:${e.account || ''}:${e.channel || ''}`;
  return load().muted.some(m => key.startsWith(m));
}
function mute(key) { const p = load(); if (!p.muted.includes(key)) { p.muted.push(key); save(p); } }

module.exports = { load, isMuted, mute };
