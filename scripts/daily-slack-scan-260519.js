// Daily Slack scan for 2026-05-19 — window: 2026-05-18T08:58+07 → now
// Uses search.messages (NOT conversations.history) per monitoring rules
// after:2026-05-17 + epoch filter >= window start (after: excludes named date)
const accounts = require("../config/.slack-accounts.json").accounts;
const https = require("https");

const WINDOW_EPOCH = new Date("2026-05-18T08:58:00+07:00").getTime() / 1000;
const SEARCH_AFTER = "2026-05-17"; // after: excludes this date → returns May 18+

// Workspaces to scan (SoCal/Blake dropped per project memory 2026-05-11)
const SKIP_WORKSPACES = ["socal"];

// Key daily report signals per workspace
const WS_SIGNALS = {
  xtreme: ["progress", "daily report", "daily", "update", "task", "kai"],
  ggs: ["progress", "daily", "report", "nick", "maintenance", "update"],
  samguard: ["elena", "deploy", "bug", "fix", "update"],
  amazingmeds: ["nick", "john", "update", "task", "daily"],
  generator: ["elliott", "violet", "release", "batch", "deploy", "update"],
  equanimity: ["carrick", "marcel", "deploy", "update"],
  legalatoms: ["nick", "raymond", "update", "task"],
  swift: ["carrick", "rory", "ios", "android", "release", "update"],
  rdc: ["dmetiner", "franc", "update"],
  baamboozle: ["aysar", "bug", "fix", "deploy", "update"],
  mpfc: ["update", "task", "deploy", "fix"],
  williambills: ["oliver", "lucas", "update", "task", "fix"],
  aigile: ["colin", "update", "deploy", "task"],
};

function slackRequest(url, headers) {
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
    req.setTimeout(15000, () => { req.destroy(); resolve({ ok: false, error: "timeout" }); });
  });
}

async function refreshSessionToken(acct) {
  // Try crumb-based token refresh for xoxc tokens
  const https2 = require("https");
  return new Promise((resolve) => {
    const cookie = acct.cookie ? "d=" + acct.cookie : "";
    const req = https2.get("https://app.slack.com/bootload", {
      headers: { Cookie: cookie, "User-Agent": "Mozilla/5.0" }
    }, (res) => {
      let html = "";
      res.on("data", c => (html += c));
      res.on("end", () => {
        const crumbMatch = html.match(/"crumb":"([^"]+)"/);
        if (crumbMatch) resolve({ crumb: crumbMatch[1] });
        else resolve({ error: "no crumb" });
      });
    });
    req.on("error", e => resolve({ error: e.message }));
    req.setTimeout(10000, () => { req.destroy(); resolve({ error: "timeout" }); });
  });
}

async function searchWorkspace(acct) {
  if (SKIP_WORKSPACES.includes(acct.workspace)) {
    return { ws: acct.workspace, skipped: true, reason: "dropped from monitoring (2026-05-11)" };
  }

  const headers = { Authorization: "Bearer " + acct.token };
  if (acct.auth_type === "session" && acct.cookie) {
    headers["Cookie"] = "d=" + acct.cookie;
  }

  const signals = WS_SIGNALS[acct.workspace] || ["update", "task", "deploy"];
  const query = `after:${SEARCH_AFTER}`;
  const params = new URLSearchParams({ query, sort: "timestamp", sort_dir: "desc", count: "50" });
  const url = `https://slack.com/api/search.messages?${params}`;

  let result = await slackRequest(url, headers);

  // Auto-refresh session token if invalid_auth (never just report expired)
  if (result.ok && result.data && result.data.error === "invalid_auth" && acct.auth_type === "session") {
    const refresh = await refreshSessionToken(acct);
    if (!refresh.error) {
      result = await slackRequest(url, { ...headers, "X-Slack-Crumb": refresh.crumb });
    }
  }

  if (!result.ok || !result.data || !result.data.ok) {
    return {
      ws: acct.workspace,
      error: result.error || (result.data && result.data.error) || "unknown",
      count: 0
    };
  }

  const allMsgs = (result.data.messages && result.data.messages.matches) || [];
  // Filter by epoch window
  const msgs = allMsgs.filter(m => parseFloat(m.ts) >= WINDOW_EPOCH);

  // Classify messages
  const urgent = [];
  const relevant = [];
  for (const m of msgs) {
    const t = (m.text || "").toLowerCase();
    const ch = (m.channel && m.channel.name) || "";
    const isUrgent = t.includes("urgent") || t.includes("emergency") || t.includes("production down") ||
      t.includes("critical") || t.includes("blocked") || t.includes("outage") ||
      t.includes("server error") || t.includes("security breach") || t.includes("incident");
    const isRelevant = signals.some(s => t.includes(s));

    if (isUrgent) urgent.push({ ch, text: (m.text || "").slice(0, 150), ts: m.ts, user: m.username || "" });
    else if (isRelevant) relevant.push({ ch, text: (m.text || "").slice(0, 150), ts: m.ts, user: m.username || "" });
  }

  return {
    ws: acct.workspace,
    total: msgs.length,
    urgent: urgent.length,
    relevant: relevant.length,
    urgentMsgs: urgent,
    relevantMsgs: relevant.slice(0, 5),
    rawTotal: allMsgs.length
  };
}

(async () => {
  const results = await Promise.all(accounts.map(a => searchWorkspace(a)));
  console.log(JSON.stringify({ window_epoch: WINDOW_EPOCH, results }, null, 2));
})();
