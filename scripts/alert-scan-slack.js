const accounts = require("../config/.slack-accounts.json").accounts;
const cutoff = 1774323000; // 2026-03-24T10:30:00+07:00
const https = require("https");

async function searchSlack(ws, token, cookie, authType) {
  const query = "after:2026-03-23";
  const params = new URLSearchParams({query, sort: "timestamp", sort_dir: "desc", count: "20"});
  const url = "https://slack.com/api/search.messages?" + params;

  const headers = {"Authorization": "Bearer " + token};
  if (authType === "session" && cookie) {
    headers["Cookie"] = "d=" + cookie;
  }

  return new Promise((resolve) => {
    const req = https.get(url, {headers}, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        try {
          const j = JSON.parse(data);
          if (!j.ok) { resolve({ws, error: j.error, count: 0}); return; }
          const msgs = (j.messages && j.messages.matches || []).filter(m => parseFloat(m.ts) >= cutoff);
          const urgent = msgs.filter(m => {
            const t = (m.text || "").toLowerCase();
            return t.includes("urgent") || t.includes("emergency") || t.includes("production down") ||
                   t.includes("critical") || t.includes("blocked") || t.includes("escalat") ||
                   t.includes("incident") || t.includes("outage") || t.includes("deploy fail") ||
                   t.includes("500 error") || t.includes("server error") || t.includes("security breach");
          });
          resolve({ws, total: msgs.length, urgent: urgent.length, urgentMsgs: urgent.map(m => ({ch: m.channel && m.channel.name, text: (m.text||"").slice(0,120), ts: m.ts}))});
        } catch(e) { resolve({ws, error: "parse:"+e.message, count: 0}); }
      });
    });
    req.on("error", e => resolve({ws, error: e.message, count: 0}));
    req.setTimeout(10000, () => { req.destroy(); resolve({ws, error: "timeout", count: 0}); });
  });
}

(async () => {
  const results = await Promise.all(accounts.map(a => searchSlack(a.workspace, a.token, a.cookie, a.auth_type)));
  results.forEach(r => {
    if (r.error) console.log(r.ws + ": ERROR=" + r.error);
    else if (r.urgent > 0) console.log(r.ws + ": " + r.total + " msgs, " + r.urgent + " URGENT: " + JSON.stringify(r.urgentMsgs));
    else console.log(r.ws + ": " + r.total + " msgs, 0 urgent");
  });
})();
