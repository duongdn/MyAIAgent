// Slack scan for 2026-07-03 (Friday) daily report
// Window: 2026-07-02T05:01:00+07 -> now
// Covers all 13 workspaces (SoCal DROPPED, OhCleo handled separately)
const path = require("path");
const fs = require("fs");
const https = require("https");

function reloadAccounts() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "config/.slack-accounts.json"), "utf8")).accounts;
}

const WINDOW_EPOCH = new Date("2026-07-02T05:01:00+07:00").getTime() / 1000;
const SEARCH_AFTER = "2026-07-01"; // after: excludes this date -> returns July 2+
const TARGET_WORKSPACES = [
  "Baamboozle",
  "RDC - FM Monitoring",
  "Swift Studio",
  "Xtreme Soft Solutions",
  "SAM GUARD - Mobile",
  "GLOBAL GRAZING SERVICES",
  "Amazing Meds",
  "Generator",
  "LegalAtoms",
  "MyPersonalFootballCoach",
  "William Bills",
  "Equanimity",
  "Aigile Dev"
];

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
  if (ws.cookie) {
    const cookieVal = ws.cookie;
    headers.Cookie = cookieVal.startsWith("d=") ? cookieVal : `d=${cookieVal}`;
  }

  const url = `https://slack.com/api/search.messages?query=${encodeURIComponent(query)}&count=50&sort=timestamp&sort_dir=desc`;

  try {
    const result = await slackRequest(url, headers);
    if (!result.ok) {
      return { workspace: ws.name, error: result.error, messages: [] };
    }
    const allMatches = (result.messages || result.data?.messages)?.matches || [];
    const messages = allMatches.filter(m => parseFloat(m.ts) >= WINDOW_EPOCH);
    return {
      workspace: ws.name,
      total: result.messages?.total || 0,
      inWindow: messages.length,
      messages: messages.slice(0, 30).map(m => ({
        channel: m.channel?.name || "?",
        user: m.username || m.user || "?",
        text: (m.text || "").substring(0, 500),
        ts: new Date(parseFloat(m.ts) * 1000).toISOString()
      }))
    };
  } catch(e) {
    return { workspace: ws.name, error: e.message, messages: [] };
  }
}

// Also scan Baamboozle MPDM for Aysar gate
async function searchBaamboozleMPDM(ws) {
  const token = ws.token || ws.xoxp_token;
  const headers = { Authorization: `Bearer ${token}` };
  const url = `https://slack.com/api/conversations.history?channel=C07SQ4HAUHZ&oldest=${WINDOW_EPOCH}&limit=50`;
  try {
    const result = await slackRequest(url, headers);
    if (!result.ok) return { channel: "MPDM-Aysar", error: result.error, messages: [] };
    const msgs = (result.messages || []).filter(m => parseFloat(m.ts) >= WINDOW_EPOCH);
    return {
      channel: "MPDM-Aysar-C07SQ4HAUHZ",
      inWindow: msgs.length,
      messages: msgs.map(m => ({
        user: m.user || m.username || "?",
        text: (m.text || "").substring(0, 400),
        ts: new Date(parseFloat(m.ts) * 1000).toISOString()
      }))
    };
  } catch(e) {
    return { channel: "MPDM-Aysar", error: e.message, messages: [] };
  }
}

async function main() {
  const accounts = reloadAccounts();
  const results = [];
  let baamboozleWs = null;

  for (const ws of accounts) {
    const wsName = ws.workspace || ws.name || "?";
    if (!TARGET_WORKSPACES.includes(wsName)) continue;
    process.stderr.write(`Scanning ${wsName}...\n`);
    const r = await searchWorkspace({ ...ws, name: wsName });
    results.push(r);
    process.stderr.write(`  -> ${r.error || (r.inWindow + " msgs in window (total=" + r.total + ")")}\n`);
    if (wsName === "Baamboozle") baamboozleWs = ws;
  }

  // Baamboozle MPDM scan for Aysar
  if (baamboozleWs) {
    process.stderr.write("Scanning Baamboozle MPDM C07SQ4HAUHZ (Aysar)...\n");
    const mpdm = await searchBaamboozleMPDM(baamboozleWs);
    results.push({ workspace: "Baamboozle-MPDM-Aysar", ...mpdm });
    process.stderr.write(`  -> ${mpdm.error || (mpdm.inWindow + " msgs")}\n`);
  }

  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
