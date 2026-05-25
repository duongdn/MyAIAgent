// Slack scan for daily report 2026-05-25 (Monday)
// Window: 2026-05-23 08:00 +07:00 → 2026-05-25 08:38 +07:00
// Uses search.messages (NOT conversations.history) per monitoring rules
// after:2026-05-22 + epoch filter >= window start (after: excludes named date)
const accounts = require("../config/.slack-accounts.json").accounts;
const https = require("https");

const WINDOW_EPOCH = 1748041200; // 2026-05-23T01:00:00Z = 08:00+07
const SEARCH_AFTER = "2026-05-22"; // after: excludes this date → returns May 23+

// SoCal/Blake dropped per project memory 2026-05-11
const SKIP_WORKSPACES = ["SoCal Auto Wraps"];

// Map workspace display names to signal keywords
const WS_SIGNALS = {
  "Baamboozle": ["aysar", "bug", "fix", "deploy", "update", "issue", "release"],
  "RDC - FM Monitoring": ["dmetiner", "franc", "update", "alarm", "tuner", "monitor"],
  "Swift Studio": ["carrick", "rory", "ios", "android", "release", "update"],
  "Xtreme Soft Solutions": ["progress", "daily report", "daily", "update", "task", "kai"],
  "SAM GUARD - Mobile": ["elena", "deploy", "bug", "fix", "update", "alarm", "server"],
  "GLOBAL GRAZING SERVICES": ["progress", "daily", "report", "maintenance", "update", "nick"],
  "Amazing Meds": ["nick", "john", "update", "task", "daily", "client"],
  "Generator": ["elliott", "violet", "release", "batch", "deploy", "update", "bug"],
  "LegalAtoms": ["nick", "raymond", "update", "task", "bug"],
  "MyPersonalFootballCoach": ["update", "task", "deploy", "fix", "bug"],
  "William Bills": ["oliver", "lucas", "update", "task", "fix", "payment", "subscription"],
  "Equanimity": ["carrick", "marcel", "deploy", "update", "bug"],
  "Aigile Dev": ["colin", "update", "deploy", "task"],
};

// Workspace key label mapping for output
const WS_KEYS = {
  "Baamboozle": "baamboozle",
  "RDC - FM Monitoring": "rdc",
  "Swift Studio": "swift",
  "Xtreme Soft Solutions": "xtreme",
  "SAM GUARD - Mobile": "samguard",
  "GLOBAL GRAZING SERVICES": "ggs",
  "Amazing Meds": "amazingmeds",
  "Generator": "generator",
  "LegalAtoms": "legalatoms",
  "MyPersonalFootballCoach": "mpfc",
  "William Bills": "williambills",
  "Equanimity": "equanimity",
  "Aigile Dev": "aigile",
};

function slackRequest(url, headers) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        try { resolve({ ok: true, data: JSON.parse(data) }); }
        catch (e) { resolve({ ok: false, error: "parse: " + e.message }); }
      });
    });
    req.on("error", e => resolve({ ok: false, error: e.message }));
    req.setTimeout(25000, () => { req.destroy(); resolve({ ok: false, error: "timeout" }); });
  });
}

async function refreshSessionToken(acct) {
  return new Promise((resolve) => {
    const cookieHeader = acct.cookie || "";
    const req = https.get("https://app.slack.com/bootload", {
      headers: {
        "Cookie": cookieHeader,
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        const crumbMatch = data.match(/api_token\s*[:=]\s*["']([^"']+)["']/);
        if (crumbMatch) resolve({ token: crumbMatch[1] });
        else resolve({ error: "no_crumb" });
      });
    });
    req.on("error", e => resolve({ error: e.message }));
    req.setTimeout(15000, () => { req.destroy(); resolve({ error: "timeout" }); });
  });
}

async function searchWorkspace(acct) {
  const wsName = acct.workspace;
  if (SKIP_WORKSPACES.includes(wsName)) return { workspace: wsName, skipped: true };

  const signals = WS_SIGNALS[wsName] || ["update", "deploy", "bug"];
  const query = `after:${SEARCH_AFTER}`;

  const headers = { "Authorization": "Bearer " + acct.token };
  if (acct.cookie) headers["Cookie"] = acct.cookie;

  const url = `https://slack.com/api/search.messages?query=${encodeURIComponent(query)}&count=25&sort=timestamp&sort_dir=desc`;
  let res = await slackRequest(url, headers);

  // Auto-refresh xoxc tokens on invalid_auth
  if (res.ok && res.data && res.data.error === "invalid_auth" && acct.cookie) {
    console.error(`[${wsName}] invalid_auth — attempting token refresh...`);
    const refreshed = await refreshSessionToken(acct);
    if (refreshed.token) {
      acct.token = refreshed.token;
      headers["Authorization"] = "Bearer " + refreshed.token;
      res = await slackRequest(url, headers);
    } else {
      return { workspace: wsName, error: "invalid_auth_refresh_failed: " + (refreshed.error || "unknown") };
    }
  }

  if (!res.ok) return { workspace: wsName, error: res.error };
  if (!res.data || !res.data.ok) return { workspace: wsName, error: res.data?.error || "api_error" };

  const msgs = (res.data.messages?.matches || [])
    .filter(m => m.ts && parseFloat(m.ts) >= WINDOW_EPOCH)
    .map(m => ({
      ts: new Date(parseFloat(m.ts) * 1000).toISOString(),
      user: m.username || m.user || "?",
      channel: m.channel?.name || "?",
      text: (m.text || "").slice(0, 400),
    }));

  // For Xtreme: check for Kai daily report
  let kaiReport = null;
  if (wsName === "Xtreme Soft Solutions") {
    const kaiMsgs = msgs.filter(m =>
      (m.user.toLowerCase().includes("kai") ||
       m.text.toLowerCase().includes("my progress") ||
       m.text.toLowerCase().includes("daily report") ||
       m.text.toLowerCase().includes("progress today"))
    );
    kaiReport = kaiMsgs.length > 0 ? { found: true, msgs: kaiMsgs.slice(0, 3) } : { found: false };
  }

  // For GGS: check for Nick daily report in #maintenance
  let nickReport = null;
  if (wsName === "GLOBAL GRAZING SERVICES") {
    const nickMsgs = msgs.filter(m =>
      m.channel === "maintenance" &&
      (m.user.toLowerCase().includes("nick") ||
       m.text.toLowerCase().includes("daily report") ||
       m.text.toLowerCase().includes("my daily report"))
    );
    nickReport = nickMsgs.length > 0 ? { found: true, msgs: nickMsgs.slice(0, 3) } : { found: false };
  }

  return {
    workspace: wsName,
    key: WS_KEYS[wsName] || wsName,
    count: msgs.length,
    messages: msgs.slice(0, 8),
    kaiReport,
    nickReport,
  };
}

async function main() {
  const results = await Promise.all(accounts.map(searchWorkspace));
  console.log(JSON.stringify(results, null, 2));
}

main().catch(e => { console.error(e.message); process.exit(1); });
