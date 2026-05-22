// Slack scan for daily report 2026-05-22
// Window: 2026-05-21T08:34:36+07:00 → now
// Uses search.messages (NOT conversations.history) per monitoring rules
// after:2026-05-20 + epoch filter >= window start (after: excludes named date)
const accounts = require("../config/.slack-accounts.json").accounts;
const https = require("https");

const WINDOW_EPOCH = new Date("2026-05-21T08:34:36+07:00").getTime() / 1000;
const SEARCH_AFTER = "2026-05-20"; // after: excludes this date → returns May 21+

// SoCal/Blake dropped per project memory 2026-05-11
const SKIP_WORKSPACES = ["socal"];

const WS_SIGNALS = {
  xtreme: ["progress", "daily report", "daily", "update", "task", "kai"],
  ggs: ["progress", "daily", "report", "maintenance", "update"],
  samguard: ["elena", "deploy", "bug", "fix", "update", "alarm", "server"],
  amazingmeds: ["nick", "john", "update", "task", "daily", "client"],
  generator: ["elliott", "violet", "release", "batch", "deploy", "update", "bug"],
  equanimity: ["carrick", "marcel", "deploy", "update", "bug"],
  legalatoms: ["nick", "raymond", "update", "task", "bug"],
  swift: ["carrick", "rory", "ios", "android", "release", "update"],
  rdc: ["dmetiner", "franc", "update", "alarm", "tuner"],
  baamboozle: ["aysar", "bug", "fix", "deploy", "update", "issue"],
  mpfc: ["update", "task", "deploy", "fix", "bug"],
  williambills: ["oliver", "lucas", "update", "task", "fix", "payment", "subscription"],
  aigile: ["colin", "update", "deploy", "task"],
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
    req.setTimeout(20000, () => { req.destroy(); resolve({ ok: false, error: "timeout" }); });
  });
}

async function refreshSessionToken(acct) {
  return new Promise((resolve) => {
    const cookie = acct.cookie ? "d=" + acct.cookie : "";
    const req = https.get("https://app.slack.com/bootload", {
      headers: { "Cookie": cookie, "User-Agent": "Mozilla/5.0" }
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
  if (SKIP_WORKSPACES.includes(acct.name)) return { name: acct.name, skipped: true };

  const signals = WS_SIGNALS[acct.name] || ["update", "deploy", "bug"];
  const query = signals.slice(0, 3).join(" OR ") + ` after:${SEARCH_AFTER}`;

  const headers = { "Authorization": "Bearer " + acct.token };
  if (acct.cookie) headers["Cookie"] = "d=" + acct.cookie;

  const url = `https://slack.com/api/search.messages?query=${encodeURIComponent(query)}&count=20&sort=timestamp`;
  let res = await slackRequest(url, headers);

  // Auto-refresh xoxc tokens on invalid_auth
  if (res.ok && res.data && res.data.error === "invalid_auth" && acct.cookie) {
    const refreshed = await refreshSessionToken(acct);
    if (refreshed.token) {
      acct.token = refreshed.token;
      headers["Authorization"] = "Bearer " + refreshed.token;
      res = await slackRequest(url, headers);
    }
  }

  if (!res.ok) return { name: acct.name, error: res.error };
  if (!res.data || !res.data.ok) return { name: acct.name, error: res.data?.error || "api_error" };

  const msgs = (res.data.messages?.matches || [])
    .filter(m => m.ts && parseFloat(m.ts) >= WINDOW_EPOCH)
    .map(m => ({
      ts: m.ts,
      user: m.username || m.user || "?",
      channel: m.channel?.name || "?",
      text: (m.text || "").slice(0, 200),
    }));

  return { name: acct.name, count: msgs.length, messages: msgs };
}

async function main() {
  const results = await Promise.all(accounts.map(searchWorkspace));
  console.log(JSON.stringify(results, null, 2));
}

main().catch(e => { console.error(e.message); process.exit(1); });
