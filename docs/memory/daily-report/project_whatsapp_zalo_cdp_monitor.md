---
name: project_whatsapp_zalo_cdp_monitor
description: WhatsApp + Zalo daily monitoring via Chrome CDP remote debugging; Chrome 136+ blocks --remote-debugging-port on the default profile so a dedicated --user-data-dir is mandatory
metadata:
  type: project
---

WhatsApp + Zalo monitoring added to daily report (Piece 16 = WhatsApp, Piece 17 = Zalo). Reads DuongDN's personal WhatsApp + Zalo via Chrome DevTools Protocol, attaching to a running Chrome tab.

**Key technical constraint (hard-won, don't re-discover):**
- Personal WhatsApp/Zalo have NO public API (both end-to-end encrypted). Reading messages REQUIRES a logged-in browser (WhatsApp Web / Zalo Web) or desktop client.
- Cannot extract session via cookies or copy the profile: WhatsApp/Zalo bind their Signal-protocol private keys to the browser instance via IndexedDB, encrypted with keys that break when the profile PATH changes.
- **Chrome 136+ (this machine runs 140) BLOCKS `--remote-debugging-port` on the default user data dir** with error `DevTools remote debugging requires a non-default data directory`. This includes passing `--user-data-dir=/home/nus/.config/google-chrome` explicitly — it still resolves to default and is blocked. A genuinely different `--user-data-dir` path is REQUIRED.

**Solution — dedicated monitor Chrome:**
- Launch: `google-chrome-stable --remote-debugging-port=9222 --user-data-dir=/home/nus/chrome-monitor-data "https://web.whatsapp.com" "https://chat.zalo.me"`
- One-time login: scan WhatsApp QR + log in Zalo in THIS monitor Chrome (separate from the user's daily Chrome).
- Autostart on login: `~/.config/autostart/whatsapp-zalo-monitor.desktop`.
- Scripts: `scripts/chrome-remote-connect.js` (shared CDP helper: listTabs/findTab), `scripts/whatsapp-monitor.js`, `scripts/zalo-monitor.js`. Output JSON to stdout; integrated as daily-report Pieces 16/17.
- Config: `config/.whatsapp-config.json` + `config/.zalo-config.json` (informational only, not read by scripts; re-encrypt after edits).

Why Slack works but Zalo/WA don't: Slack = single xoxc cookie → API call; Zalo/WA = cookies + JS crypto session in IndexedDB → need live browser.
