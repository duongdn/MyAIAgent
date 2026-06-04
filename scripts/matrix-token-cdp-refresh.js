#!/usr/bin/env node
/**
 * Matrix token refresh via Chrome CDP (no Puppeteer).
 * Launches Chrome headlessly with remote debugging, navigates to chat.nustechnology.com,
 * intercepts Bearer mat_ token from requests, saves to config.
 */
const { spawn } = require("child_process");
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const CONFIG_PATH = path.join(__dirname, "..", "config", ".matrix-config.json");
const CHROME = "/usr/bin/google-chrome";
const PORT = 9335;

function httpGet(url) {
  return new Promise((res, rej) => {
    const mod = url.startsWith("https") ? https : http;
    mod.get(url, (r) => {
      let d = "";
      r.on("data", (c) => (d += c));
      r.on("end", () => { try { res(JSON.parse(d)); } catch { res({ raw: d }); } });
    }).on("error", rej);
  });
}

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));

  // Quick check — skip if token still valid
  try {
    const whoami = await httpGet(`${config.homeserver}/_matrix/client/v3/account/whoami`);
    // whoami requires auth header, so do it properly
  } catch (e) {}

  const prof = path.join(__dirname, "..", "tmp", "matrix-cdp-" + Date.now());
  fs.mkdirSync(prof, { recursive: true });

  const args = [
    "--no-sandbox", "--disable-setuid-sandbox",
    "--headless", "--disable-gpu",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${prof}`,
    "--no-first-run", "--disable-sync",
    "--disable-background-networking",
    "about:blank",
  ];

  console.log("[cdp-refresh] Launching Chrome...");
  const proc = spawn(CHROME, args, { env: { ...process.env, TMPDIR: prof }, stdio: "pipe" });

  let capturedToken = null;

  // Wait for Chrome to start
  await new Promise((res) => setTimeout(res, 2000));

  let tabs, ws;
  try {
    tabs = await httpGet(`http://localhost:${PORT}/json`);
    if (!Array.isArray(tabs) || !tabs.length) throw new Error("No tabs");

    const wsUrl = tabs[0].webSocketDebuggerUrl;
    ws = new WebSocket(wsUrl);

    await new Promise((res, rej) => {
      ws.on("open", res);
      ws.on("error", rej);
    });

    let msgId = 1;
    function send(method, params = {}) {
      const id = msgId++;
      ws.send(JSON.stringify({ id, method, params }));
      return id;
    }

    // Enable Network events
    send("Network.enable");

    ws.on("message", (data) => {
      const msg = JSON.parse(data);
      if (msg.method === "Network.requestWillBeSent") {
        const auth = msg.params?.request?.headers?.Authorization || "";
        if (auth.startsWith("Bearer mat_") && !capturedToken) {
          capturedToken = auth.replace("Bearer ", "");
          console.log("[cdp-refresh] Captured token:", capturedToken.slice(0, 20) + "...");
        }
      }
    });

    // Navigate to chat.nustechnology.com
    console.log("[cdp-refresh] Navigating to chat.nustechnology.com...");
    send("Page.navigate", { url: "https://chat.nustechnology.com" });

    // Wait up to 25s for token
    await new Promise((res) => {
      const check = setInterval(() => {
        if (capturedToken) { clearInterval(check); res(); }
      }, 500);
      setTimeout(() => { clearInterval(check); res(); }, 25000);
    });

  } catch (e) {
    console.error("[cdp-refresh] CDP error:", e.message);
  } finally {
    if (ws) ws.close();
    proc.kill("SIGKILL");
    // Clean up temp profile
    try { fs.rmSync(prof, { recursive: true, force: true }); } catch {}
  }

  if (!capturedToken) {
    console.error("[cdp-refresh] Failed to capture token — SSO may require user interaction.");
    process.exit(1);
  }

  // Save token to config
  config.access_token = capturedToken;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log("[cdp-refresh] Token saved to config.");

  // Verify
  const verify = await new Promise((res) => {
    https.get(
      `${config.homeserver}/_matrix/client/v3/account/whoami`,
      { headers: { Authorization: `Bearer ${capturedToken}` } },
      (r) => { let d = ""; r.on("data", c => d += c); r.on("end", () => { try { res(JSON.parse(d)); } catch { res({ raw: d }); } }); }
    ).on("error", () => res(null));
  });

  if (verify?.user_id) {
    console.log("[cdp-refresh] ✓ Token valid:", verify.user_id);
  } else {
    console.error("[cdp-refresh] Token verification failed:", JSON.stringify(verify).slice(0, 100));
    process.exit(1);
  }
}

main().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
