// Daily Discord scan for 2026-06-05 — window: 2026-06-04T09:10+07 → now
// Only AirAgri (nusvinn) + Bizurk (nuscarrick). NOT HOMIEAPP.
const https = require("https");
const fs = require("fs");

const cfg = require("../config/.discord-accounts.json");
const accounts = cfg.accounts || cfg;

const WINDOW_EPOCH_MS = new Date("2026-06-04T09:10:00+07:00").getTime();
const DISCORD_EPOCH = 1420070400000n;
const WINDOW_SNOWFLAKE = String((BigInt(WINDOW_EPOCH_MS) - DISCORD_EPOCH) << 22n);

function discordRequest(path, token) {
  return new Promise((resolve) => {
    const req = https.get(`https://discord.com/api/v10${path}`, {
      headers: { Authorization: token, "User-Agent": "DiscordBot (monitor, 1.0)" }
    }, (res) => {
      let data = "";
      res.on("data", c => (data += c));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch(e) { resolve({ status: res.statusCode, data: null, error: e.message }); }
      });
    });
    req.on("error", e => resolve({ status: 0, data: null, error: e.message }));
    req.setTimeout(15000, () => { req.destroy(); resolve({ status: 0, error: "timeout" }); });
  });
}

async function scanAccount(acct) {
  const targetServers = acct.servers || [];
  const token = acct.token || acct.authorization;
  const acctName = acct.name || acct.user || "unknown";

  const meRes = await discordRequest("/users/@me", token);
  if (meRes.status !== 200) return { account: acctName, error: "token_invalid: users/@me status " + meRes.status, messages: [] };

  const guildsRes = await discordRequest("/users/@me/guilds", token);
  if (guildsRes.status !== 200) return { account: acctName, error: "guilds_fetch_failed status " + guildsRes.status, messages: [] };

  const allGuilds = guildsRes.data || [];
  const targetGuilds = allGuilds.filter(g =>
    targetServers.some(ts => g.name?.toLowerCase().includes(ts.toLowerCase()) || g.id === ts)
  );

  const allMessages = [];
  for (const guild of targetGuilds) {
    const channelsRes = await discordRequest(`/guilds/${guild.id}/channels`, token);
    if (channelsRes.status !== 200) continue;
    const textChannels = (channelsRes.data || []).filter(c => c.type === 0).slice(0, 20);
    for (const ch of textChannels) {
      const msgsRes = await discordRequest(
        `/channels/${ch.id}/messages?after=${WINDOW_SNOWFLAKE}&limit=50`, token
      );
      if (msgsRes.status === 403) continue;
      if (msgsRes.status !== 200) continue;
      const msgs = (msgsRes.data || []).map(m => ({
        channel: ch.name,
        guild: guild.name,
        author: m.author?.username || "",
        content: (m.content || "").slice(0, 300),
        ts: m.timestamp,
      }));
      allMessages.push(...msgs);
    }
  }
  return { account: acctName, tokenValid: true, messages: allMessages };
}

async function checkAndyDM(acct) {
  const token = acct.token || acct.authorization;
  const dmRes = await discordRequest("/users/@me/channels", token);
  if (dmRes.status !== 200) return [];
  const dms = (dmRes.data || []).filter(ch => ch.type === 1);
  const results = [];
  for (const dm of dms) {
    const recips = dm.recipients || [];
    const names = recips.map(r => r.username?.toLowerCase() || "");
    if (!names.some(n => n.includes("animeworld") || n.includes("anime") || n.includes("andrew") || n.includes("taraba"))) continue;
    const msgs = await discordRequest(`/channels/${dm.id}/messages?after=${WINDOW_SNOWFLAKE}&limit=20`, token);
    if (msgs.status !== 200) continue;
    results.push(...(msgs.data || []).map(m => ({
      type: "DM",
      recipient: recips.map(r => r.username).join(","),
      author: m.author?.username || "",
      content: (m.content || "").slice(0, 200),
      ts: m.timestamp,
    })));
  }
  return results;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const output = {};
  let first = true;
  for (const acct of accounts) {
    const acctId = acct.name || acct.user || "";
    if (acctId.toLowerCase().includes("homie")) continue;
    if (!first) await sleep(2000);
    first = false;
    if (acctId.toLowerCase().includes("carrick")) {
      const scan = await scanAccount(acct);
      const dms = await checkAndyDM(acct);
      output[acctId] = { ...scan, andrewDMs: dms };
    } else {
      output[acctId] = await scanAccount(acct);
    }
  }
  console.log(JSON.stringify(output, null, 2));
})();
