const tls = require("tls");
const accounts = require("../config/.email-accounts.json").accounts;

// Window: 10-day catch-up
const windowStart = new Date("2026-04-24T08:50:00+07:00");
const windowEnd   = new Date("2026-05-04T08:09:00+07:00");
// SINCE one day earlier (UTC server date)
const SINCE = "23-Apr-2026";

function decodeMime(str) {
  if (!str) return "";
  return str.replace(/=\?([^?]+)\?([BbQq])\?([^?]*)\?=/g, (_, charset, enc, data) => {
    try {
      if (enc.toUpperCase() === "B") {
        return Buffer.from(data, "base64").toString("utf8");
      } else {
        return data.replace(/_/g, " ").replace(/=([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
      }
    } catch (e) { return data; }
  }).replace(/\s+/g, " ").trim();
}

function parseHeaderBlock(block) {
  const unfolded = block.replace(/\r?\n[ \t]+/g, " ");
  const lines = unfolded.split(/\r?\n/);
  const h = {};
  for (const line of lines) {
    const m = line.match(/^([A-Za-z\-]+):\s*(.*)$/);
    if (m) h[m[1].toLowerCase()] = m[2];
  }
  return h;
}

function scan(acct) {
  return new Promise((resolve) => {
    let buffer = "";
    let step = 0;
    const results = { email: acct.email, folder: acct.folder || "INBOX", count: 0, messages: [], error: null };
    let ids = [];
    let fetchIndex = 0;

    const socket = tls.connect(993, acct.imap_server, () => {});
    socket.setTimeout(60000);
    socket.on("timeout", () => { results.error = "timeout"; try{socket.destroy();}catch(e){} resolve(results); });
    socket.on("error", (e) => { results.error = e.message; resolve(results); });

    function send(tag, cmd) {
      socket.write(tag + " " + cmd + "\r\n");
    }

    socket.on("data", (data) => {
      buffer += data.toString("utf8");

      if (step === 0 && /\* OK/i.test(buffer)) {
        step = 1; buffer = "";
        send("A1", "LOGIN " + JSON.stringify(acct.email) + " " + JSON.stringify(acct.app_password));
        return;
      }

      if (step === 1 && /A1 (OK|NO|BAD)/i.test(buffer)) {
        if (!/A1 OK/i.test(buffer)) {
          results.error = "auth_fail: " + buffer.trim().slice(0,120);
          try{socket.destroy();}catch(e){}; resolve(results); return;
        }
        step = 2; buffer = "";
        send("A2", "SELECT " + JSON.stringify(acct.folder || "INBOX"));
        return;
      }

      if (step === 2 && /A2 (OK|NO|BAD)/i.test(buffer)) {
        if (!/A2 OK/i.test(buffer)) {
          results.error = "select_fail: " + buffer.trim().slice(0,200);
          try{socket.destroy();}catch(e){}; resolve(results); return;
        }
        step = 3; buffer = "";
        send("A3", "SEARCH SINCE " + SINCE);
        return;
      }

      if (step === 3 && /A3 (OK|NO|BAD)/i.test(buffer)) {
        const searchLine = buffer.split(/\r?\n/).find(l => /^\* SEARCH/i.test(l)) || "";
        ids = searchLine.replace(/^\* SEARCH/i, "").trim().split(/\s+/).filter(Boolean);
        if (ids.length === 0) {
          send("A9", "LOGOUT"); try{socket.destroy();}catch(e){}; resolve(results); return;
        }
        step = 4; buffer = "";
        fetchIndex = 0;
        fetchNext();
        return;
      }

      if (step === 4 && /A4_\d+ (OK|NO|BAD)/i.test(buffer)) {
        const respBlocks = buffer.split(/(?=^\* \d+ FETCH)/m);
        for (const b of respBlocks) {
          if (!/^\* \d+ FETCH/m.test(b)) continue;
          const sizeMatch = b.match(/\{(\d+)\}\r?\n/);
          if (!sizeMatch) continue;
          const size = parseInt(sizeMatch[1], 10);
          const startIdx = b.indexOf("}\r\n");
          const hdrStart = startIdx >= 0 ? startIdx + 3 : -1;
          if (hdrStart < 0) continue;
          const hdrText = b.slice(hdrStart, hdrStart + size);
          const h = parseHeaderBlock(hdrText);
          const subj = decodeMime(h["subject"] || "");
          const from = decodeMime(h["from"] || "");
          const dateStr = h["date"] || "";
          const d = dateStr ? new Date(dateStr) : null;
          if (d && d >= windowStart && d < windowEnd) {
            results.messages.push({ subject: subj, from, date: dateStr, dt: d.toISOString() });
          }
        }
        buffer = "";
        if (fetchIndex < ids.length) {
          fetchNext();
        } else {
          results.count = results.messages.length;
          send("A9", "LOGOUT");
          try{socket.destroy();}catch(e){};
          resolve(results);
        }
        return;
      }
    });

    function fetchNext() {
      const slice = ids.slice(fetchIndex, fetchIndex + 50);
      fetchIndex += slice.length;
      const range = slice.join(",");
      const tag = "A4_" + fetchIndex;
      buffer = "";
      socket.write(tag + " FETCH " + range + " (BODY.PEEK[HEADER.FIELDS (Subject Date From)])\r\n");
    }
  });
}

(async () => {
  const all = [];
  for (const a of accounts) {
    const r = await scan(a);
    all.push(r);
  }
  console.log(JSON.stringify({ windowStart: windowStart.toISOString(), windowEnd: windowEnd.toISOString(), accounts: all }, null, 2));
})();
