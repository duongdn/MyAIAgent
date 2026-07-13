// Generic Slack workspace scan via search.messages — pass window start as ISO arg, day-before as YYYY-MM-DD arg
const https = require("https");
const accounts = require("../config/.slack-accounts.json").accounts;

const cutoffIso = process.argv[2]; // e.g. 2026-07-09T09:05:00+07:00
const dayBefore = process.argv[3]; // e.g. 2026-07-08
const cutoffTs = new Date(cutoffIso).getTime() / 1000;

const SKIP = ["SoCal Auto Wraps", "OhCleo"];

function apiGet(url, headers) {
  return new Promise((resolve) => {
    https.get(url, { headers }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve({ ok: false, error: "parse_error", raw: data.slice(0,200) }); }
      });
    }).on("error", (e) => resolve({ ok: false, error: e.message }));
  });
}

async function scanWorkspace(acct) {
  if (SKIP.includes(acct.workspace)) return null;
  const url = `https://slack.com/api/search.messages?query=${encodeURIComponent("after:" + dayBefore)}&count=100&sort=timestamp&sort_dir=desc`;
  // Session cookies vary: some need raw, some need URL-encoded (depends on whether
  // the cookie value contains chars like +/= that need escaping). Try raw first,
  // fall back to encoded on invalid_auth rather than assuming one form for all workspaces.
  let res;
  if (acct.auth_type === "session" && acct.cookie) {
    const headersRaw = { Authorization: `Bearer ${acct.token}`, Cookie: `d=${acct.cookie}` };
    res = await apiGet(url, headersRaw);
    if (!res.ok && res.error === "invalid_auth") {
      const headersEncoded = { Authorization: `Bearer ${acct.token}`, Cookie: `d=${encodeURIComponent(acct.cookie)}` };
      res = await apiGet(url, headersEncoded);
    }
  } else {
    res = await apiGet(url, { Authorization: `Bearer ${acct.token}` });
  }
  if (!res.ok) return { workspace: acct.workspace, error: res.error || JSON.stringify(res).slice(0,200) };
  const matches = (res.messages && res.messages.matches) || [];
  const filtered = matches.filter(m => parseFloat(m.ts) >= cutoffTs);
  return {
    workspace: acct.workspace,
    total: filtered.length,
    messages: filtered.map(m => ({
      channel: m.channel && m.channel.name,
      user: m.username || m.user,
      ts: m.ts,
      text: (m.text || "").slice(0, 300),
      permalink: m.permalink,
    })),
  };
}

(async () => {
  const results = await Promise.all(accounts.map(scanWorkspace));
  console.log(JSON.stringify(results.filter(Boolean), null, 2));
})();
