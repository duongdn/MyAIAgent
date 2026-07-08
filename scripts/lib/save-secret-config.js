// Writes a decrypted config JSON and immediately re-encrypts it to .enc.
// Prevents a later `decrypt-secrets.sh` run from clobbering a freshly refreshed
// token with the stale committed .enc (root cause of the 2026-07-08 Matrix outage:
// matrix-token-refresh.js only ever wrote the plaintext .json, so a routine
// decrypt-secrets.sh call silently reverted a live token to yesterday's).
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function saveSecretConfig(configPath, config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  try {
    execSync(`bash "${path.join(__dirname, '..', 'encrypt-secrets.sh')}"`, { stdio: 'ignore' });
  } catch (err) {
    console.error(`[save-secret-config] Warning: re-encrypt failed, .enc may be stale: ${err.message}`);
  }
}

module.exports = { saveSecretConfig };
