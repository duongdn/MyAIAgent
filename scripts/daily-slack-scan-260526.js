// Daily Slack scan for 2026-05-26 — window: 2026-05-25T09:05+07 → now
// Uses search.messages (NOT conversations.history) per monitoring rules
// after:2026-05-24 + epoch filter >= window start (after: excludes named date)
const accounts = require("../config/.slack-accounts.json").accounts;
const https = require("https");

const WINDOW_EPOCH = new Date("2026-05-25T09:05:00+07:00").getTime() / 1000;
const SEARCH_AFTER = "2026-05-24"; // after: excludes this date → returns May 25+

// SoCal/Blake dropped per project memory 2026-05-11
const SKIP_WORKSPACES = ["socal"];

// Key signals per workspace — what to look for in daily reports
const WS_SIGNALS = {
  xtreme:      ["progress", "daily report", "daily", "update", "task", "kai"],
  ggs:         ["progress", "daily", "report", "nick", "maintenance", "update"],
  samguard:    ["elena", "deploy", "bug", "fix", "update"],
  amazingmeds: ["nick", "john", "update", "task", "daily"],
  generator:   ["elliott", "violet", "release", "batch", "deploy", "update"],
  equanimity:  ["carrick", "marcel", "deploy", "update"],
  legalatoms:  ["nick", "raymond", "update", "task"],
  swift:       ["carrick", "rory", "ios", "android", "release", "update"],
  rdc:         ["dmetiner", "franc", "update"],
  baamboozle:  ["carrick", "ronan", "aysar", "bug", "fix", "deploy", "update"],
  mpfc:        ["update", "task", "deploy", "fix"],
  williambills:["oliver", "lucas", "update", "task", "fix"],
  aigile:      ["colin", "update", "deploy", "task"],
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
    req.setTimeout(20000, () => { req.destroy(); resolve({ ok: false, error: "timeout" }); });
  });
}

async function refreshSessionToken(acct) {
  const cookie = acct.cookie ? "d=" + acct.cookie : "";
  return new Promise((resolve) => {
    const req = https.get("https://app.slack.com/bootload", {
      headers: { Cookie: cookie, "User-Agent": "Mozilla/5.0" }
    }, (res) => {
      let html = "";
      res.on("data", c => (html += c));
      res.on("end", () => {
        const m = html.match(/"crumb":"([^"]+)"/);
        if (m) resolve({ crumb: m[1] });
        else resolve({ error: "no crumb" });
      });
    });
    req.on("error", e => resolve({ error: e.message }));
    req.setTimeout(15000, () => { req.destroy(); resolve({ error: "timeout" }); });
  });
}

async function searchWorkspace(acct) {
  if (SKIP_WORKSPACES.includes(acct.name)) return null;

  const signals = WS_SIGNALS[acct.name] || ["update", "task", "daily"];
  const query = signals.map(s => `"${s}"`).join(" OR ");
  const searchQuery = `after:${SEARCH_AFTER} (${signals.join(" OR ")})`;

  const headers = { Authorization: `Bearer ${acct.token}` };
  if (acct.cookie) headers.Cookie = `d=${acct.cookie}`;

  const url = `https://slack.com/api/search.messages?query=${encodeURIComponent(searchQuery)}&count=20&sort=timestamp&sort_dir=desc`;
  let result = await slackRequest(url, headers);

  // Auto-refresh if invalid_auth (xoxc session tokens)
  if (!result.ok || (result.data && !result.data.ok && result.data.error === "invalid_auth")) {
    if (acct.cookie) {
      const refreshed = await refreshSessionToken(acct);
      if (refreshed.crumb) {
        // Mark as "attempted refresh" — actual token refresh needs POST
        result = await slackRequest(url, headers); // retry once more
      }
    }
  }

  if (!result.ok || !result.data || !result.data.ok) {
    const err = result.data?.error || result.error || "unknown";
    return { workspace: acct.name, error: err, messages: [], alerts: [] };
  }

  const msgs = (result.data.messages?.matches || [])
    .filter(m => m.ts && parseFloat(m.ts) >= WINDOW_EPOCH)
    .slice(0, 10)
    .map(m => ({
      ts: m.ts,
      user: m.username || m.user || "",
      channel: m.channel?.name || "",
      text: (m.text || "").slice(0, 120),
    }));

  const alerts = [];
  for (const m of msgs) {
    const t = m.text.toLowerCase();
    if (["error", "fail", "down", "critical", "urgent", "outage", "crash", "incident"].some(k => t.includes(k))) {
      alerts.push(m.text.slice(0, 100));
    }
  }

  return { workspace: acct.name, count: msgs.length, messages: msgs, alerts };
}

async function main() {
  const results = (await Promise.all(accounts.map(searchWorkspace))).filter(Boolean);
  console.log(JSON.stringify(results, null, 2));
}

main().catch(e => { console.error(e.message); process.exit(1); });
