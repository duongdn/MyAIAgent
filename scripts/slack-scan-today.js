// Slack scan for daily report — uses dynamic window from args or env
// Usage: node scripts/slack-scan-today.js [YYYY-MM-DDTHH:MM:SS+07:00]
const accounts = require("../config/.slack-accounts.json").accounts;
const https = require("https");

const windowStr = process.argv[2] || "2026-06-28T05:24:00+07:00";
const WINDOW_EPOCH = new Date(windowStr).getTime() / 1000;
// after: excludes the named date — use day before window start
const windowDate = new Date(windowStr);
windowDate.setDate(windowDate.getDate() - 1);
const SEARCH_AFTER = windowDate.toISOString().slice(0, 10);

// SoCal/Blake dropped per project memory 2026-05-11
const SKIP_WORKSPACES = ["SoCal Auto Wraps"];

const WS_SIGNALS = {
  "Baamboozle": ["aysar", "update", "daily", "progress", "today"],
  "RDC - FM Monitoring": ["dmetiner", "franc", "update", "alarm", "tuner"],
  "Swift Studio": ["carrick", "rory", "ios", "android", "release", "update"],
  "Xtreme Soft Solutions": ["progress", "daily report", "daily", "update", "task", "kai"],
  "SAM GUARD - Mobile": ["elena", "deploy", "bug", "fix", "update", "alarm", "server"],
  "GLOBAL GRAZING SERVICES": ["progress", "daily", "report", "maintenance", "update"],
  "Amazing Meds": ["nick", "john", "update", "task", "daily", "client"],
  "Generator": ["elliott", "violet", "release", "batch", "deploy", "update", "bug"],
  "LegalAtoms": ["nick", "raymond", "update", "task", "bug"],
  "MyPersonalFootballCoach": ["update", "task", "deploy", "fix", "bug"],
  "William Bills": ["oliver", "lucas", "update", "task", "fix", "payment"],
  "Equanimity": ["carrick", "marcel", "deploy", "update", "bug"],
  "Aigile Dev": ["colin", "update", "deploy", "task"],
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
    req.on("error", (e) => resolve({ ok: false, error: e.message }));
    req.setTimeout(20000, () => { req.destroy(); resolve({ ok: false, error: "timeout" }); });
  });
}

async function refreshSessionToken(acct) {
  return new Promise((resolve) => {
    const cookie = acct.cookie ? "d=" + acct.cookie : "";
    const req = https.get("https://app.slack.com/bootload", {
      headers: { Cookie: cookie, "User-Agent": "Mozilla/5.0" },
    }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        const m = data.match(/api_token\s*[:=]\s*["']([^"']+)["']/);
        if (m) resolve({ token: m[1] });
        else resolve({ error: "no_crumb" });
      });
    });
    req.on("error", (e) => resolve({ error: e.message }));
    req.setTimeout(15000, () => { req.destroy(); resolve({ error: "timeout" }); });
  });
}

async function searchWorkspace(acct) {
  const wsName = acct.workspace;
  if (SKIP_WORKSPACES.includes(wsName)) return { workspace: wsName, skipped: true };

  const signals = WS_SIGNALS[wsName] || ["update", "deploy", "bug"];
  const query = signals.slice(0, 3).join(" OR ") + ` after:${SEARCH_AFTER}`;

  const headers = { Authorization: "Bearer " + acct.token };
  if (acct.cookie) headers["Cookie"] = "d=" + acct.cookie;

  const url = `https://slack.com/api/search.messages?query=${encodeURIComponent(query)}&count=25&sort=timestamp`;
  let res = await slackRequest(url, headers);

  if (res.ok && res.data && res.data.error === "invalid_auth" && acct.cookie) {
    const refreshed = await refreshSessionToken(acct);
    if (refreshed.token) {
      acct.token = refreshed.token;
      headers["Authorization"] = "Bearer " + refreshed.token;
      res = await slackRequest(url, headers);
    }
  }

  if (!res.ok) return { workspace: wsName, error: res.error };
  if (!res.data || !res.data.ok) return { workspace: wsName, error: res.data?.error || "api_error" };

  const msgs = (res.data.messages?.matches || [])
    .filter((m) => m.ts && parseFloat(m.ts) >= WINDOW_EPOCH)
    .map((m) => ({
      ts: new Date(parseFloat(m.ts) * 1000).toISOString(),
      user: m.username || m.user || "?",
      channel: m.channel?.name || "?",
      text: (m.text || "").slice(0, 300),
    }));

  return { workspace: wsName, count: msgs.length, messages: msgs };
}

async function main() {
  process.stderr.write(`Window: ${windowStr} (SEARCH_AFTER: ${SEARCH_AFTER})\n`);
  const results = [];
  for (const acct of accounts) {
    const r = await searchWorkspace(acct);
    results.push(r);
    const label = r.skipped ? "SKIP" : r.error ? `ERR:${r.error}` : `${r.count} msgs`;
    process.stderr.write(`${r.workspace}: ${label}\n`);
  }
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
