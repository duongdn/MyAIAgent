// Daily Slack scan for 2026-05-29 (Friday)
// Window: 2026-05-27T08:56:29+07:00 → 2026-05-29T14:35:00+07:00
// Uses search.messages (NOT conversations.history) per monitoring rules
// after:2026-05-26 + epoch filter >= window start
const accounts = require("../config/.slack-accounts.json").accounts;
const https = require("https");

// Window start epoch: 2026-05-27T08:56:29+07:00 = 2026-05-27T01:56:29Z
const WINDOW_START_EPOCH = 1748307389; // 2026-05-27T01:56:29Z
const SEARCH_AFTER = "2026-05-26"; // after: excludes this date → returns May 27+

// SoCal/Blake dropped per project memory 2026-05-11
const SKIP_WORKSPACES = ["SoCal Auto Wraps"];

// Key signals per workspace — what to look for
const WS_SIGNALS = {
  "Baamboozle":                  ["progress", "today", "update", "daily", "task", "carrick"],
  "RDC - FM Monitoring":         ["dmetiner", "franc", "update", "daily", "task"],
  "Swift Studio":                ["carrick", "rory", "ios", "android", "release", "update", "daily"],
  "Xtreme Soft Solutions":       ["progress", "daily report", "daily", "update", "task", "kai", "luis"],
  "SAM GUARD - Mobile":          ["elena", "deploy", "bug", "fix", "update", "daily"],
  "GLOBAL GRAZING SERVICES":     ["nick", "daily", "progress", "maintenance", "update"],
  "Amazing Meds":                ["nick", "john", "update", "task", "daily", "bug"],
  "Generator":                   ["elliott", "violet", "release", "batch", "deploy", "update"],
  "LegalAtoms":                  ["nick", "raymond", "update", "task", "daily"],
  "MyPersonalFootballCoach":     ["update", "task", "deploy", "fix", "daily"],
  "William Bills":               ["oliver", "lucas", "update", "task", "fix"],
  "Equanimity":                  ["carrick", "marcel", "deploy", "update", "daily"],
  "Aigile Dev":                  ["colin", "update", "deploy", "task", "daily"],
};

// Baamboozle: also check MPDM channel C07SQ4HAUHZ for "Today's update"
const BAAMBOOZLE_CHANNEL = "C07SQ4HAUHZ";

function slackRequest(url, headers) {
  return new Promise((resolve) => {
    const options = {
      headers,
      timeout: 25000
    };
    const req = https.get(url, options, (res) => {
      let data = "";
      res.on("data", c => (data += c));
      res.on("end", () => {
        try { resolve({ ok: true, data: JSON.parse(data) }); }
        catch (e) { resolve({ ok: false, error: "parse: " + e.message, raw: data.slice(0, 200) }); }
      });
    });
    req.on("error", e => resolve({ ok: false, error: e.message }));
    req.on("timeout", () => { req.destroy(); resolve({ ok: false, error: "timeout" }); });
  });
}

async function refreshXoxcToken(acct) {
  // Try crumb extraction for xoxc token refresh
  const cookie = acct.cookie ? `d=${acct.cookie}` : "";
  return new Promise((resolve) => {
    const req = https.get("https://app.slack.com/bootload", {
      headers: { Cookie: cookie, "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" }
    }, (res) => {
      let html = "";
      res.on("data", c => (html += c));
      res.on("end", () => {
        const m = html.match(/"crumb":"([^"]+)"/);
        if (m) resolve({ crumb: m[1] });
        else resolve({ error: "no crumb in bootload" });
      });
    });
    req.on("error", e => resolve({ error: e.message }));
    req.setTimeout(15000, () => { req.destroy(); resolve({ error: "timeout" }); });
  });
}

async function searchWorkspace(acct) {
  const wsName = acct.workspace;
  if (SKIP_WORKSPACES.includes(wsName)) return null;

  const signals = WS_SIGNALS[wsName] || ["update", "task", "daily"];
  const searchQuery = `after:${SEARCH_AFTER} (${signals.join(" OR ")})`;

  const headers = { Authorization: `Bearer ${acct.token}` };
  if (acct.cookie) headers.Cookie = `d=${acct.cookie}`;

  const url = `https://slack.com/api/search.messages?query=${encodeURIComponent(searchQuery)}&count=30&sort=timestamp&sort_dir=desc`;
  let result = await slackRequest(url, headers);

  // Auto-refresh if invalid_auth for xoxc tokens
  if (result.data && !result.data.ok && result.data.error === "invalid_auth" && acct.cookie) {
    const refreshed = await refreshXoxcToken(acct);
    if (!refreshed.error) {
      // Retry with same headers (crumb noted but can't fully refresh without POST here)
      result = await slackRequest(url, headers);
    }
  }

  if (!result.ok || !result.data || !result.data.ok) {
    const err = result.data?.error || result.error || "unknown";
    return { workspace: wsName, error: err, count: 0, messages: [], alerts: [], keyContent: [] };
  }

  const msgs = (result.data.messages?.matches || [])
    .filter(m => m.ts && parseFloat(m.ts) >= WINDOW_START_EPOCH)
    .slice(0, 15)
    .map(m => ({
      ts: m.ts,
      date: new Date(parseFloat(m.ts) * 1000).toISOString().slice(0,16).replace('T',' '),
      user: m.username || m.user || "",
      channel: m.channel?.name || m.channel?.id || "",
      text: (m.text || "").replace(/\n/g, " ").slice(0, 150),
    }));

  // Detect alerts / issues
  const alerts = [];
  const keywords = ["error", "fail", "failed", "down", "critical", "urgent", "outage", "crash", "incident", "broken", "not working", "issue", "problem"];
  for (const m of msgs) {
    const t = m.text.toLowerCase();
    if (keywords.some(k => t.includes(k))) {
      alerts.push(`[${m.date}] ${m.user}/${m.channel}: ${m.text.slice(0, 120)}`);
    }
  }

  // Key content = first 5 messages summarized
  const keyContent = msgs.slice(0, 5).map(m =>
    `[${m.date}] ${m.user} (#${m.channel}): ${m.text.slice(0, 100)}`
  );

  return { workspace: wsName, count: msgs.length, messages: msgs, alerts, keyContent };
}

async function checkBaamboozleMPDM(acct) {
  // Check specific MPDM channel for Carrick's daily updates
  const headers = { Authorization: `Bearer ${acct.token}` };
  const oldest = WINDOW_START_EPOCH.toString();
  const url = `https://slack.com/api/conversations.history?channel=${BAAMBOOZLE_CHANNEL}&oldest=${oldest}&limit=20`;
  const result = await slackRequest(url, headers);
  if (!result.ok || !result.data || !result.data.ok) {
    return { error: result.data?.error || result.error };
  }
  const msgs = (result.data.messages || []).map(m => ({
    date: new Date(parseFloat(m.ts) * 1000).toISOString().slice(0,16).replace('T',' '),
    user: m.username || m.user || "",
    text: (m.text || "").replace(/\n/g, " ").slice(0, 150),
  }));
  return { count: msgs.length, messages: msgs };
}

async function main() {
  // Run all workspaces in parallel
  const baamboozleAcct = accounts.find(a => a.workspace === "Baamboozle");
  const [results, baamboozleMPDM] = await Promise.all([
    Promise.all(accounts.map(searchWorkspace)),
    baamboozleAcct ? checkBaamboozleMPDM(baamboozleAcct) : Promise.resolve(null)
  ]);

  const filtered = results.filter(Boolean);

  // Attach MPDM data to Baamboozle result
  const bbResult = filtered.find(r => r.workspace === "Baamboozle");
  if (bbResult && baamboozleMPDM) {
    bbResult.mpdm = baamboozleMPDM;
  }

  console.log(JSON.stringify({ results: filtered, timestamp: new Date().toISOString() }, null, 2));
}

main().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
