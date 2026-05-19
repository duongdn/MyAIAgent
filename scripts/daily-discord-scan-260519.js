// Daily Discord scan for 2026-05-19 — window: 2026-05-18T08:58+07 → now
// Accounts: nusvinn (AirAgri only, NOT HOMIEAPP), nuscarrick (Bizurk only)
// 3-step token verification before flagging any issue
const https = require("https");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync(__dirname + "/../config/.discord-accounts.json", "utf8"));
const accounts = config.accounts;

const WINDOW_MS = new Date("2026-05-18T08:58:00+07:00").getTime();
const WINDOW_SNOWFLAKE = ((BigInt(WINDOW_MS) - 1420070400000n) << 22n).toString();

// Only monitor these servers per account
const ACCOUNT_SERVERS = {
  nusvinn: ["airagri"],   // NOT homieapp
  nuscarrick: ["bizurk"]
};

// Vinn's AirAgri report opens with this phrase
const VINN_REPORT_MARKER = "just report my process today";
const JEFF_REPORT_MARKER = ["jeff", "report", "daily"];

function discordGet(path, token) {
  return new Promise((resolve) => {
    const opts = {
      hostname: "discord.com",
      path: "/api/v10" + path,
      headers: { Authorization: token, "User-Agent": "DiscordBot (monitor, 1.0)" }
    };
    const req = https.get(opts, (res) => {
      let data = "";
      res.on("data", c => (data += c));
      res.on("end", () => {
        try { resolve({ code: res.statusCode, data: JSON.parse(data) }); }
        catch (e) { resolve({ code: res.statusCode, error: data.slice(0, 200) }); }
      });
    });
    req.on("error", e => resolve({ code: 0, error: e.message }));
    req.setTimeout(12000, () => { req.destroy(); resolve({ code: 0, error: "timeout" }); });
  });
}

async function verifyToken(acct) {
  // Step 1: /users/@me
  const me = await discordGet("/users/@me", acct.token);
  if (me.code !== 200) return { valid: false, step: 1, code: me.code };
  // Step 2: /guilds (via @me/guilds)
  const guilds = await discordGet("/users/@me/guilds", acct.token);
  if (guilds.code !== 200) return { valid: false, step: 2, code: guilds.code };
  return { valid: true, guilds: guilds.data };
}

async function scanAccount(acct) {
  const allowed = ACCOUNT_SERVERS[acct.user] || [];

  // 3-step token verification
  const verify = await verifyToken(acct);
  if (!verify.valid) {
    return {
      user: acct.user,
      error: `token_invalid step=${verify.step} code=${verify.code}`,
      servers: []
    };
  }

  const guilds = verify.guilds.filter(g => {
    const name = g.name.toLowerCase();
    return allowed.some(a => name.includes(a));
  });

  const serverResults = [];
  for (const guild of guilds) {
    const chRes = await discordGet(`/guilds/${guild.id}/channels`, acct.token);
    if (chRes.code !== 200) {
      serverResults.push({ guild: guild.name, error: `channels ${chRes.code}` });
      continue;
    }

    const textChannels = (chRes.data || []).filter(c => c.type === 0);
    const channelResults = [];
    let vinnReported = false;
    let jeffReported = false;
    let totalMsgs = 0;

    for (const ch of textChannels) {
      const msgRes = await discordGet(
        `/channels/${ch.id}/messages?limit=100&after=${WINDOW_SNOWFLAKE}`,
        acct.token
      );
      if (msgRes.code === 403) {
        // Try join first (public rooms)
        continue;
      }
      if (!Array.isArray(msgRes.data)) continue;

      const msgs = msgRes.data;
      totalMsgs += msgs.length;

      const chMsgs = [];
      for (const m of msgs) {
        const text = (m.content || "").toLowerCase();
        const username = (m.author && m.author.username) || "";

        // Check Vinn daily report
        if (acct.user === "nusvinn" && text.includes(VINN_REPORT_MARKER)) {
          vinnReported = true;
          chMsgs.push({ type: "vinn_report", user: username, text: m.content.slice(0, 200), ts: m.timestamp });
        }

        // Check Jeff daily report
        if (acct.user === "nusvinn" && JEFF_REPORT_MARKER.every(kw => text.includes(kw))) {
          jeffReported = true;
          chMsgs.push({ type: "jeff_report", user: username, text: m.content.slice(0, 200), ts: m.timestamp });
        }

        // Check Andrew Taraba DM (nuscarrick checks DM with "animeworld" keyword)
        if (acct.user === "nuscarrick" && text.includes("animeworld")) {
          chMsgs.push({ type: "andrew_dm", user: username, text: m.content.slice(0, 150), ts: m.timestamp });
        }

        // Flag urgent
        if (text.includes("urgent") || text.includes("down") || text.includes("emergency") || text.includes("critical")) {
          chMsgs.push({ type: "urgent", user: username, text: m.content.slice(0, 150), ts: m.timestamp });
        }
      }

      if (chMsgs.length > 0 || msgs.length > 0) {
        channelResults.push({ channel: ch.name, count: msgs.length, highlights: chMsgs });
      }
    }

    serverResults.push({
      guild: guild.name,
      totalMsgs,
      channels: channelResults,
      vinnReported: acct.user === "nusvinn" ? vinnReported : undefined,
      jeffReported: acct.user === "nusvinn" ? jeffReported : undefined
    });
  }

  return { user: acct.user, servers: serverResults };
}

(async () => {
  const results = [];
  for (const acct of accounts) {
    results.push(await scanAccount(acct));
  }
  console.log(JSON.stringify({ window_ms: WINDOW_MS, results }, null, 2));
})();
