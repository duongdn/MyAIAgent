// Daily Discord scan for 2026-05-26 — window: 2026-05-25T09:05+07 → now
// Only AirAgri (nusvinn) + Bizurk (nuscarrick). NOT HOMIEAPP.
const https = require("https");
const fs = require("fs");

const cfg = JSON.parse(fs.readFileSync("../config/.discord-accounts.json", "utf8"));
const accounts = cfg.accounts || cfg;

// Convert window start epoch → Discord snowflake
const WINDOW_EPOCH_MS = new Date("2026-05-25T09:05:00+07:00").getTime();
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

async function verifyToken(token) {
  const r = await discordRequest("/users/@me", token);
  if (r.status !== 200) return false;
  const guilds = await discordRequest("/users/@me/guilds", token);
  return guilds.status === 200;
}

async function scanAccount(acct) {
  // Only monitor allowed servers
  const targetServers = acct.servers || [];
  const token = acct.token || acct.authorization;

  const valid = await verifyToken(token);
  if (!valid) return { account: acct.name, error: "token_invalid_silently_handled", messages: [] };

  const guildsRes = await discordRequest("/users/@me/guilds", token);
  if (guildsRes.status !== 200) return { account: acct.name, error: "guilds_fetch_failed", messages: [] };

  const allGuilds = guildsRes.data || [];
  const targetGuilds = allGuilds.filter(g =>
    targetServers.some(ts => g.name?.toLowerCase().includes(ts.toLowerCase()) || g.id === ts)
  );

  const allMessages = [];

  for (const guild of targetGuilds) {
    const channelsRes = await discordRequest(`/guilds/${guild.id}/channels`, token);
    if (channelsRes.status !== 200) continue;

    const textChannels = (channelsRes.data || []).filter(c => c.type === 0).slice(0, 15);

    for (const ch of textChannels) {
      // Try joining if M_FORBIDDEN equivalent
      const msgsRes = await discordRequest(
        `/channels/${ch.id}/messages?after=${WINDOW_SNOWFLAKE}&limit=20`, token
      );
      if (msgsRes.status === 403) {
        // Join attempt for public channels
        await discordRequest(`/channels/${ch.id}/join`, token);
        continue;
      }
      if (msgsRes.status !== 200) continue;

      const msgs = (msgsRes.data || []).map(m => ({
        channel: ch.name,
        author: m.author?.username || "",
        content: (m.content || "").slice(0, 150),
        ts: m.timestamp,
      }));

      allMessages.push(...msgs);
    }
  }

  return { account: acct.name, servers: targetGuilds.map(g => g.name), messages: allMessages };
}

async function main() {
  const results = await Promise.all(accounts.map(scanAccount));
  console.log(JSON.stringify(results, null, 2));
}

main().catch(e => { console.error(e.message); process.exit(1); });
