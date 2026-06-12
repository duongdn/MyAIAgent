// Slack scan for 2026-06-13 daily report — window: 2026-06-12T09:06+07 → now
const path = require("path");
const fs = require("fs");
const https = require("https");

function reloadAccounts() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "config/.slack-accounts.json"), "utf8")).accounts;
}

const WINDOW_EPOCH = new Date("2026-06-12T09:06:00+07:00").getTime() / 1000;
const SEARCH_AFTER = "2026-06-11"; // after: excludes this date → returns June 12+
const SKIP_WORKSPACES = ["SoCal Auto Wraps"];

function slackRequest(url, headers) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: "GET",
      headers: { "User-Agent": "Mozilla/5.0 (compatible)", ...headers },
      timeout: 20000
    };
    let data = "";
    const req = https.request(options, (res) => {
      res.on("data", d => data += d);
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch(e) { reject(e); }
      });
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
    req.end();
  });
}

async function searchWorkspace(ws) {
  const token = ws.token || ws.xoxp_token;
  const query = `after:${SEARCH_AFTER}`;
  const headers = { Authorization: `Bearer ${token}` };
  if (ws.cookie) headers.Cookie = ws.cookie.startsWith("d=") ? ws.cookie : `d=${ws.cookie}`;

  const url = `https://slack.com/api/search.messages?query=${encodeURIComponent(query)}&count=20&sort=timestamp&sort_dir=desc`;

  try {
    const result = await slackRequest(url, headers);
    if (!result.ok) {
      return { workspace: ws.name, error: result.error, messages: [] };
    }
    const messages = ((result.messages || result.data?.messages)?.matches || []).filter(m => {
      return parseFloat(m.ts) >= WINDOW_EPOCH;
    });
    return {
      workspace: ws.name,
      total: result.messages?.total || 0,
      inWindow: messages.length,
      messages: messages.slice(0, 8).map(m => ({
        channel: m.channel?.name || "?",
        user: m.username || m.user || "?",
        text: (m.text || "").substring(0, 250),
        ts: new Date(parseFloat(m.ts) * 1000).toISOString()
      }))
    };
  } catch(e) {
    return { workspace: ws.name, error: e.message, messages: [] };
  }
}

async function main() {
  const accounts = reloadAccounts();
  const results = [];

  for (const ws of accounts) {
    const wsName = ws.workspace || ws.name || "?";
    if (SKIP_WORKSPACES.includes(wsName)) {
      results.push({ workspace: wsName, skipped: "SoCal dropped 2026-05-11" });
      continue;
    }
    process.stderr.write(`Scanning ${wsName}...\n`);
    const r = await searchWorkspace({ ...ws, name: wsName });
    results.push(r);
    process.stderr.write(`  → ${r.error || (r.inWindow + " msgs in window")}\n`);
  }

  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
