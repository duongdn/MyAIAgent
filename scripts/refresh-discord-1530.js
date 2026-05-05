#!/usr/bin/env node
/**
 * Discord refresh — 2026-05-05 09:30 → 15:30 +07
 * AirAgri (nusvinn): airagri_webapp, airagri-flutter
 * Bizurk (nuscarrick): DM with animeworld only
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "..", "config", ".discord-accounts.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const cutoffEpochMs = new Date("2026-05-05T09:30:00+07:00").getTime();
const cutoffSnowflake = ((BigInt(cutoffEpochMs) - 1420070400000n) << 22n).toString();

function fetchJSON(urlStr, token) {
  return new Promise((resolve) => {
    const req = https.get(urlStr, { headers: { Authorization: token, "User-Agent": "Mozilla/5.0" } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve({ code: res.statusCode, data: JSON.parse(data) }); }
        catch (e) { resolve({ code: res.statusCode, error: data.slice(0, 300) }); }
      });
    });
    req.on("error", (e) => resolve({ error: e.message }));
    req.setTimeout(15000, () => { req.destroy(); resolve({ error: "timeout" }); });
  });
}
async function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function verifyToken(token) {
  const me = await fetchJSON("https://discord.com/api/v10/users/@me", token);
  if (me.code !== 200) return { ok: false, step: "users/@me", code: me.code, err: me.error };
  const guilds = await fetchJSON("https://discord.com/api/v10/users/@me/guilds", token);
  if (guilds.code !== 200) return { ok: false, step: "guilds", code: guilds.code, err: guilds.error };
  const channels = await fetchJSON("https://discord.com/api/v10/users/@me/channels", token);
  if (channels.code !== 200) return { ok: false, step: "channels", code: channels.code, err: channels.error };
  return { ok: true, username: me.data.username, guilds: guilds.data, dms: channels.data };
}

async function scanAirAgri(acct) {
  const out = { user: acct.user, server: "AirAgri", tokenOk: false, channels: [] };
  const v = await verifyToken(acct.token);
  if (!v.ok) { out.tokenError = v; return out; }
  out.tokenOk = true; out.username = v.username;
  const g = (v.guilds || []).find((g) => g.name.toLowerCase().includes("airagri"));
  if (!g) { out.error = "no airagri guild"; return out; }
  const chRes = await fetchJSON("https://discord.com/api/v10/guilds/" + g.id + "/channels", acct.token);
  if (chRes.code !== 200) { out.error = "guild channels " + chRes.code; return out; }
  const wanted = ["airagri_webapp", "airagri-flutter", "airagri_flutter"];
  const targets = (chRes.data || []).filter((c) => c.type === 0 && wanted.includes(c.name.toLowerCase()));
  for (const c of targets) {
    await sleep(350);
    const msgs = await fetchJSON(
      "https://discord.com/api/v10/channels/" + c.id + "/messages?limit=100&after=" + cutoffSnowflake,
      acct.token
    );
    if (!msgs.data || !Array.isArray(msgs.data)) {
      out.channels.push({ channel: c.name, error: msgs.code || msgs.error });
      continue;
    }
    const arr = msgs.data;
    const urgents = [];
    let vinnHit = null, jeffHit = null;
    for (const m of arr) {
      const txt = m.content || "";
      const low = txt.toLowerCase();
      const a = (m.author?.username || "").toLowerCase();
      if (low.includes("just report my process today")) {
        const hit = { author: m.author?.username, time: m.timestamp, content: txt.slice(0, 400) };
        if (a.includes("vinn")) vinnHit = hit;
        if (a.includes("jeff")) jeffHit = hit;
      }
      if (low.includes("urgent") || low.includes("emergency") || low.includes("critical") || low.includes("incident") || low.includes("blocker") || low.includes("p0") || low.includes("p1") || low.includes("down ")) {
        urgents.push({ author: m.author?.username, time: m.timestamp, content: txt.slice(0, 220) });
      }
    }
    out.channels.push({
      channel: c.name,
      count: arr.length,
      vinnHit, jeffHit, urgents,
      messages: arr.map((m) => ({ a: m.author?.username, t: m.timestamp, c: (m.content || "").slice(0, 220) })),
    });
  }
  return out;
}

async function scanBizurkAnimeworld(acct) {
  const out = { user: acct.user, server: "Bizurk", tokenOk: false, dms: [] };
  const v = await verifyToken(acct.token);
  if (!v.ok) { out.tokenError = v; return out; }
  out.tokenOk = true; out.username = v.username;
  // find DM with animeworld
  const dm = (v.dms || []).find((d) =>
    (d.recipients || []).some((r) => (r.username || "").toLowerCase().includes("animeworld"))
  );
  if (!dm) { out.error = "no animeworld DM"; return out; }
  const msgs = await fetchJSON(
    "https://discord.com/api/v10/channels/" + dm.id + "/messages?limit=100&after=" + cutoffSnowflake,
    acct.token
  );
  if (!msgs.data || !Array.isArray(msgs.data)) {
    out.error = "dm fetch " + (msgs.code || msgs.error);
    return out;
  }
  out.dms.push({
    name: "animeworld",
    count: msgs.data.length,
    messages: msgs.data.map((m) => ({ a: m.author?.username, t: m.timestamp, c: (m.content || "").slice(0, 300) })),
  });
  return out;
}

(async () => {
  const out = { cutoff: new Date(cutoffEpochMs).toISOString(), now: new Date().toISOString(), accounts: [] };
  for (const a of config.accounts) {
    try {
      if (a.user === "nusvinn") out.accounts.push(await scanAirAgri(a));
      else if (a.user === "nuscarrick") out.accounts.push(await scanBizurkAnimeworld(a));
    } catch (e) {
      out.accounts.push({ user: a.user, error: e.message });
    }
  }
  console.log(JSON.stringify(out, null, 2));
})();
