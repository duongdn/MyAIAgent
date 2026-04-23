#!/usr/bin/env node
/**
 * Discord refresh check — Thu 23/04 window 09:13 → 14:42 +07
 * 3-step token verification + message scan.
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "..", "config", ".discord-accounts.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

// 2026-04-23T09:13+07:00
const cutoffEpochMs = new Date("2026-04-23T09:13:00+07:00").getTime();
const cutoffSnowflake = ((BigInt(cutoffEpochMs) - 1420070400000n) << 22n).toString();

function fetchJSON(urlStr, token) {
  return new Promise((resolve) => {
    const req = https.get(urlStr, { headers: { Authorization: token, "User-Agent": "Mozilla/5.0" } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          resolve({ code: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ code: res.statusCode, error: data.slice(0, 300) });
        }
      });
    });
    req.on("error", (e) => resolve({ error: e.message }));
    req.setTimeout(15000, () => { req.destroy(); resolve({ error: "timeout" }); });
  });
}

async function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function verifyToken(acct) {
  const me = await fetchJSON("https://discord.com/api/v10/users/@me", acct.token);
  if (me.code !== 200) return { ok: false, step: "users/@me", code: me.code, err: me.error };
  const guilds = await fetchJSON("https://discord.com/api/v10/users/@me/guilds", acct.token);
  if (guilds.code !== 200) return { ok: false, step: "guilds", code: guilds.code, err: guilds.error };
  // pick first guild for channels check
  if (!guilds.data || guilds.data.length === 0) return { ok: false, step: "guilds", err: "no guilds" };
  const g0 = guilds.data[0];
  const ch = await fetchJSON("https://discord.com/api/v10/guilds/" + g0.id + "/channels", acct.token);
  if (ch.code !== 200) return { ok: false, step: "channels", code: ch.code, err: ch.error };
  return { ok: true, username: me.data.username, guilds: guilds.data };
}

async function checkAccount(acct) {
  const result = { user: acct.user, server: acct.servers[0], tokenOk: false, channels: [], vinnReport: null, carrickReport: null, urgentMsgs: [] };
  const verify = await verifyToken(acct);
  if (!verify.ok) {
    result.tokenError = verify;
    return result;
  }
  result.tokenOk = true;
  result.username = verify.username;

  // Filter guilds to wanted servers
  const wantedGuilds = verify.guilds.filter((g) => acct.servers.some((s) => g.name.toLowerCase().includes(s.toLowerCase())));

  for (const g of wantedGuilds) {
    const chRes = await fetchJSON("https://discord.com/api/v10/guilds/" + g.id + "/channels", acct.token);
    if (chRes.code !== 200) continue;
    // AirAgri: limit to airagri_webapp + airagri-flutter per config
    let textCh = (chRes.data || []).filter((c) => c.type === 0);
    if (acct.user === "nusvinn") {
      const wantedNames = ["airagri_webapp", "airagri-flutter", "airagri_flutter"];
      textCh = textCh.filter((c) => wantedNames.includes(c.name.toLowerCase()));
    }
    // Bizurk: nuscarrick — scan all text channels (low-activity, few channels)
    for (const c of textCh.slice(0, 15)) {
      await sleep(350);
      const msgs = await fetchJSON(
        "https://discord.com/api/v10/channels/" + c.id + "/messages?limit=50&after=" + cutoffSnowflake,
        acct.token
      );
      if (!msgs.data || !Array.isArray(msgs.data)) {
        result.channels.push({ guild: g.name, channel: c.name, error: msgs.code || msgs.error });
        continue;
      }
      const msgsArr = msgs.data;
      // Check for Vinn daily report
      let vinnHit = null;
      let jeffHit = null;
      const urgents = [];
      for (const m of msgsArr) {
        const txt = (m.content || "");
        const low = txt.toLowerCase();
        if (low.includes("just report my process today")) {
          const hit = { author: m.author?.username, time: m.timestamp, content: txt.slice(0, 400) };
          if ((m.author?.username || "").toLowerCase().includes("vinn")) vinnHit = hit;
          if ((m.author?.username || "").toLowerCase().includes("jeff")) jeffHit = hit;
        }
        if (low.includes("urgent") || low.includes("emergency") || low.includes("critical") || low.includes("incident") || low.includes("down ")) {
          urgents.push({ author: m.author?.username, time: m.timestamp, content: txt.slice(0, 200) });
        }
      }
      result.channels.push({
        guild: g.name,
        channel: c.name,
        count: msgsArr.length,
        vinnHit,
        jeffHit,
        urgents,
        sample: msgsArr.slice(0, 3).map((m) => ({ a: m.author?.username, t: m.timestamp, c: (m.content || "").slice(0, 140) })),
      });
      if (vinnHit && !result.vinnReport) result.vinnReport = { channel: c.name, ...vinnHit };
      if (urgents.length) result.urgentMsgs.push(...urgents.map((u) => ({ channel: c.name, ...u })));
    }
  }
  return result;
}

(async () => {
  const output = { cutoff: new Date(cutoffEpochMs).toISOString(), cutoffSnowflake, accounts: [] };
  for (const a of config.accounts) {
    try {
      const r = await checkAccount(a);
      output.accounts.push(r);
    } catch (e) {
      output.accounts.push({ user: a.user, error: e.message });
    }
  }
  console.log(JSON.stringify(output, null, 2));
})();
