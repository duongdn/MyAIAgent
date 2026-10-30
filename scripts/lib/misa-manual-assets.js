/**
 * Manual assets moved into MISA's mobile-only "Tài sản" section.
 * The web app/API has no endpoint for that section (probed 2026-10-30), so these
 * are declared in config/misa-manual-assets.json and added on top of
 * /wallets/totaldashboard. An asset is skipped while a wallet with the same
 * name still exists in /wallets/accounts (active or not) — totaldashboard
 * already counts it then, so adding it again would double-count.
 */
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '../../config/misa-manual-assets.json');

function resolveManualAssets(accounts) {
  let config;
  try {
    config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch (err) {
    console.error(`[misa] manual assets config unreadable: ${err.message}`);
    return { items: [], total: 0 };
  }
  const walletNames = new Set((accounts || []).map((w) => (w.walletName || '').trim().toLowerCase()));
  const items = (config.assets || []).map((a) => {
    const stillWallet = a.misaWalletName && walletNames.has(a.misaWalletName.trim().toLowerCase());
    return { ...a, counted: !stillWallet, skippedReason: stillWallet ? 'still a MISA wallet (in totaldashboard)' : null };
  });
  const total = items.filter((a) => a.counted).reduce((s, a) => s + a.value, 0);
  return { items, total };
}

module.exports = { resolveManualAssets };
