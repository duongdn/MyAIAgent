const https = require("https");
const accounts = [
  {user: "nusvinn", token: "DISCORD_TOKEN_NUSVINN", servers: ["AirAgri","HOMIEAPP"]},
  {user: "nuscarrick", token: "DISCORD_TOKEN_NUSCARRICK", servers: ["Bizurk"]}
];
const cutoffMs = new Date("2026-03-24T10:30:00+07:00").getTime();
const cutoffSnowflake = ((BigInt(cutoffMs) - 1420070400000n) << 22n).toString();

async function fetchJSON(url, token) {
  return new Promise((resolve) => {
    const req = https.get(url, {headers: {"Authorization": token}}, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => { try { resolve({code: res.statusCode, data: JSON.parse(data)}); } catch(e) { resolve({code: res.statusCode, error: data.slice(0,200)}); } });
    });
    req.on("error", e => resolve({error: e.message}));
    req.setTimeout(10000);
  });
}

async function checkAccount(acct) {
  const guilds = await fetchJSON("https://discord.com/api/v10/users/@me/guilds", acct.token);
  if (guilds.error || guilds.code !== 200) { console.log(acct.user + ": guild fetch error"); return; }

  for (const g of guilds.data) {
    const channels = await fetchJSON("https://discord.com/api/v10/guilds/" + g.id + "/channels", acct.token);
    if (channels.error || channels.code !== 200) { console.log(acct.user + "/" + g.name + ": channel fetch error " + channels.code); continue; }

    const textChannels = (channels.data || []).filter(c => c.type === 0).slice(0, 5);
    let totalMsgs = 0;
    for (const ch of textChannels) {
      const msgs = await fetchJSON("https://discord.com/api/v10/channels/" + ch.id + "/messages?limit=5&after=" + cutoffSnowflake, acct.token);
      if (msgs.data && Array.isArray(msgs.data)) {
        totalMsgs += msgs.data.length;
        const urgent = msgs.data.filter(m => {
          const t = (m.content || "").toLowerCase();
          return t.includes("urgent") || t.includes("emergency") || t.includes("down") || t.includes("critical") || t.includes("incident");
        });
        if (urgent.length > 0) {
          console.log(acct.user + "/" + g.name + "/" + ch.name + ": " + urgent.length + " URGENT");
          urgent.forEach(m => console.log("  " + m.author.username + ": " + (m.content||"").slice(0,100)));
        }
      }
    }
    console.log(acct.user + "/" + g.name + ": " + totalMsgs + " msgs since cutoff, checked " + textChannels.length + " channels");
  }
}

(async () => {
  for (const a of accounts) await checkAccount(a);
})();
