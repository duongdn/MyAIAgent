// Daily Slack scan for 2026-06-01 — window: 2026-05-29T08:21+07 → now
// Uses search.messages (NOT conversations.history) per monitoring rules
<<<<<<< HEAD
// SoCal/Blake dropped per project memory 2026-05-11
=======
// SoCal dropped per project memory 2026-05-11
>>>>>>> auto: 2026-06-01 08:30
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const https = require("https");

function reloadAccounts() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "../config/.slack-accounts.json"), "utf8")).accounts;
}

<<<<<<< HEAD
const WINDOW_EPOCH = new Date("2026-05-29T08:21:00+07:00").getTime() / 1000;
const SEARCH_AFTER = "2026-05-28"; // after: excludes this date → returns May 29+
=======
const WINDOW_EPOCH = 1780017660; // 2026-05-29T01:21:00Z = 2026-05-29T08:21:00+07:00
const SEARCH_AFTER = "2026-05-28"; // after: returns May 29+
>>>>>>> auto: 2026-06-01 08:30

const SKIP_WORKSPACES = ["SoCal Auto Wraps"];

const WS_SIGNALS = {
  "Xtreme Soft Solutions":    ["progress", "daily report", "daily", "update", "task", "kai"],
  "GLOBAL GRAZING SERVICES":  ["progress", "daily", "report", "nick", "maintenance", "update"],
  "SAM GUARD - Mobile":       ["elena", "deploy", "bug", "fix", "update"],
  "Amazing Meds":             ["nick", "john", "update", "task", "daily"],
  "Generator":                ["elliott", "violet", "release", "batch", "deploy", "update"],
  "Equanimity":               ["carrick", "marcel", "deploy", "update"],
  "LegalAtoms":               ["nick", "raymond", "update", "task"],
  "Swift Studio":             ["carrick", "rory", "ios", "android", "release", "update"],
  "RDC - FM Monitoring":      ["dmetiner", "franc", "update"],
  "Baamboozle":               ["carrick", "ronan", "aysar", "bug", "fix", "deploy", "update"],
  "MyPersonalFootballCoach":  ["update", "task", "deploy", "fix"],
  "William Bills":            ["oliver", "lucas", "update", "task", "fix"],
  "Aigile Dev":               ["colin", "update", "deploy", "task"],
};

const AYSAR_MPDM_CHANNEL = "C07SQ4HAUHZ";

<<<<<<< HEAD
const XOXC_REFRESH_SCRIPTS = {
  "Amazing Meds": "slack-xoxc-refresh-amazingmeds.js",
  "Equanimity":   "slack-xoxc-refresh-equanimity.js",
};

function slackRequest(url, headers, timeout = 20000) {
=======
function slackRequest(url, headers, timeout = 25000) {
>>>>>>> auto: 2026-06-01 08:30
  return new Promise((resolve) => {
    const req = https.get(url, { headers }, (res) => {
      let data = "";
      res.on("data", c => (data += c));
      res.on("end", () => {
        try { resolve({ ok: true, data: JSON.parse(data) }); }
        catch (e) { resolve({ ok: false, error: "parse: " + e.message }); }
      });
    });
    req.on("error", e => resolve({ ok: false, error: e.message }));
    req.setTimeout(timeout, () => { req.destroy(); resolve({ ok: false, error: "timeout" }); });
  });
}

<<<<<<< HEAD
function refreshXoxcToken(wsName) {
  const script = XOXC_REFRESH_SCRIPTS[wsName];
  if (!script) return false;
  try {
    execSync(`node ${path.join(__dirname, script)}`, { timeout: 150000, stdio: "pipe" });
    return true;
  } catch (e) {
    return false;
  }
}

=======
>>>>>>> auto: 2026-06-01 08:30
async function fetchAysarMPDM(acct) {
  const headers = { Authorization: `Bearer ${acct.token}` };
  if (acct.cookie) headers.Cookie = `d=${acct.cookie}`;
  const oldest = WINDOW_EPOCH.toString();
  const url = `https://slack.com/api/conversations.history?channel=${AYSAR_MPDM_CHANNEL}&oldest=${oldest}&limit=20`;
  let result = await slackRequest(url, headers);
  if (result.ok && result.data && result.data.ok) {
    const msgs = (result.data.messages || []).map(m => ({
      ts: m.ts, text: (m.text || "").slice(0, 300), user: m.user
    }));
    return { channel: AYSAR_MPDM_CHANNEL, count: msgs.length, messages: msgs };
  }
  return { channel: AYSAR_MPDM_CHANNEL, error: result.data?.error || result.error };
}

async function searchWorkspace(acctIn) {
  const wsName = acctIn.workspace || acctIn.name || "unknown";
  if (SKIP_WORKSPACES.includes(wsName)) return { workspace: wsName, skipped: true };

<<<<<<< HEAD
  if (XOXC_REFRESH_SCRIPTS[wsName]) {
    refreshXoxcToken(wsName);
  }

  const freshAccounts = reloadAccounts();
  const acct = freshAccounts.find(a => (a.workspace || a.name) === wsName) || acctIn;

  const signals = WS_SIGNALS[wsName] || ["update", "task", "daily"];
  const searchQuery = `after:${SEARCH_AFTER} (${signals.join(" OR ")})`;
  const headers = { Authorization: `Bearer ${acct.token}` };
  if (acct.cookie) headers.Cookie = `d=${acct.cookie}`;
=======
  const acct = acctIn;
  const signals = WS_SIGNALS[wsName] || ["update", "task", "daily"];
  const searchQuery = `after:${SEARCH_AFTER} (${signals.join(" OR ")})`;
  const headers = { Authorization: `Bearer ${acct.token}` };
  if (acct.cookie) headers.Cookie = acct.cookie;
>>>>>>> auto: 2026-06-01 08:30

  const url = `https://slack.com/api/search.messages?query=${encodeURIComponent(searchQuery)}&count=20&sort=timestamp&sort_dir=desc`;
  let result = await slackRequest(url, headers);

  if (!result.ok || !result.data || !result.data.ok) {
    return { workspace: wsName, error: result.data?.error || result.error };
  }

  const matches = (result.data.messages?.matches || [])
    .filter(m => parseFloat(m.ts) >= WINDOW_EPOCH)
    .map(m => ({
      channel: m.channel?.name || m.channel?.id,
      user: m.username || m.user,
      text: (m.text || "").slice(0, 200),
      ts: m.ts,
    }));

  let aysarMPDM = null;
  if (wsName === "Baamboozle") {
    aysarMPDM = await fetchAysarMPDM(acct);
  }

  return {
    workspace: wsName,
    totalMatches: result.data.messages?.total || 0,
    filteredCount: matches.length,
    recentMessages: matches.slice(0, 8),
    aysarMPDM,
  };
}

(async () => {
<<<<<<< HEAD
  const results = await Promise.all(reloadAccounts().map(searchWorkspace));
=======
  const accounts = reloadAccounts();
  const results = await Promise.all(accounts.map(searchWorkspace));
>>>>>>> auto: 2026-06-01 08:30
  console.log(JSON.stringify(results, null, 2));
})();
