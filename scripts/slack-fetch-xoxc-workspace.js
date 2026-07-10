// Fetch messages from an xoxc-session Slack workspace via conversations.history (search.messages unsupported for xoxc)
// Usage: node scripts/slack-fetch-xoxc-workspace.js "<Workspace Name>" <sinceEpochSeconds>
const https = require("https");
const accounts = require("../config/.slack-accounts.json").accounts;

const wsName = process.argv[2];
const since = Number(process.argv[3] || 0);

const acct = accounts.find(a => a.workspace === wsName);
if (!acct) { console.error("workspace not found"); process.exit(1); }

const host = new URL(acct.url).hostname;
// cookie in config is already percent-encoded from capture time — use as-is
const cookieHeader = `d=${acct.cookie}`;

function slackPost(method, params) {
  return new Promise((resolve) => {
    const body = new URLSearchParams({ token: acct.token, ...params }).toString();
    const req = https.request({
      hostname: host,
      path: `/api/${method}`,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookieHeader,
        "User-Agent": "Mozilla/5.0",
      },
    }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => { try { resolve(JSON.parse(d)); } catch (e) { resolve({ ok: false, error: "parse_error" }); } });
    });
    req.on("error", (e) => resolve({ ok: false, error: e.message }));
    req.write(body);
    req.end();
  });
}

(async () => {
  const auth = await slackPost("auth.test", {});
  if (!auth.ok) { console.log(JSON.stringify({ workspace: wsName, error: auth.error })); return; }

  const channelsRes = await slackPost("conversations.list", { limit: 200, types: "public_channel,private_channel,mpim,im" });
  const channels = (channelsRes.channels || []);
  const results = [];
  for (const ch of channels) {
    const hist = await slackPost("conversations.history", { channel: ch.id, oldest: String(since), limit: 100 });
    if (hist.ok && hist.messages && hist.messages.length) {
      results.push({
        channel: ch.name || ch.id,
        id: ch.id,
        messages: hist.messages.map(m => ({ ts: m.ts, user: m.user, text: (m.text || "").slice(0, 300) })),
      });
    }
  }
  console.log(JSON.stringify({ workspace: wsName, user: auth.user, channelCount: channels.length, active: results }, null, 2));
})();
