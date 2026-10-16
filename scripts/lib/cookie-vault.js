// Cookie vault — browser session cookies exported on the LOCAL machine (which has the real
// logged-in Chrome profiles) and pushed to the headless cron server (mpfc), which cannot open
// a browser. See scripts/cookie-vault-sync.sh (local side) for export + push.
//
// Server-side scripts read cookies from VAULT_DIR when the local Chrome profile is missing.
// When vault cookies stop working, call markVaultStale() — the local sync job polls for the
// STALE flag, re-exports fresh cookies (re-opening the browser if needed) and pushes again.
const fs = require('fs');
const path = require('path');

const VAULT_DIR = path.join(__dirname, '..', '..', 'tmp', 'cookie-vault');
const STALE_FLAG = path.join(VAULT_DIR, 'STALE');

const vaultFile = (name) => path.join(VAULT_DIR, name);

// Append a reason line to the STALE flag (one line per failing source).
function markVaultStale(source, reason) {
  try {
    fs.mkdirSync(VAULT_DIR, { recursive: true });
    fs.appendFileSync(STALE_FLAG, `${new Date().toISOString()} ${source}: ${reason}\n`);
    console.error(`[cookie-vault] marked STALE (${source}): ${reason}`);
  } catch (e) {
    console.error('[cookie-vault] could not write STALE flag:', e.message);
  }
}

module.exports = { VAULT_DIR, STALE_FLAG, vaultFile, markVaultStale };
