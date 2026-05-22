// Email scan for daily report 2026-05-22
// Window: 2026-05-21T08:34:36+07:00 → now
const tls = require("tls");
const accounts = require("../config/.email-accounts.json").accounts;

const WINDOW_START = new Date("2026-05-21T08:34:36+07:00");
const IMAP_SINCE = "20-May-2026"; // search server-side; we filter by Date header

function decodeMime(str) {
  if (!str) return "";
  return str.replace(/=\?([^?]+)\?([BbQq])\?([^?]*)\?=/g, (_, charset, enc, data) => {
    try {
      if (enc.toUpperCase() === "B") return Buffer.from(data, "base64").toString("utf8");
      return data.replace(/_/g, " ").replace(/=([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
    } catch (e) { return data; }
  }).replace(/\s+/g, " ").trim();
}

const ALERT_KEYWORDS = [
  "alert", "error", "fail", "down", "urgent", "warning", "critical",
  "incident", "outage", "security", "escalat", "breach", "crash",
  "leave request", "nghỉ phép", "xin nghỉ", "production", "rollbar", "bugsnag",
  "expires", "expir", "deploy", "expired", "payment"
];

function checkIMAP(acct) {
  return new Promise((resolve) => {
    let buffer = "";
    let step = 0;
    const socket = tls.connect(993, acct.imap_server || "imap.zoho.com", () => {});
    socket.setTimeout(30000);
    socket.on("timeout", () => { try{socket.destroy();}catch(e){} resolve({ email: acct.email, error: "timeout" }); });
    socket.on("error", (e) => resolve({ email: acct.email, error: e.message }));
    socket.on("data", (data) => {
      buffer += data.toString();
      if (step === 0 && /\* OK/i.test(buffer)) {
        step = 1; buffer = "";
        socket.write(`A1 LOGIN ${JSON.stringify(acct.email)} ${JSON.stringify(acct.app_password)}\r\n`);
      } else if (step === 1 && /A1 /i.test(buffer)) {
        if (!/A1 OK/i.test(buffer)) { socket.destroy(); resolve({ email: acct.email, error: "auth_fail" }); return; }
        step = 2; buffer = "";
        socket.write(`A2 SELECT ${JSON.stringify(acct.folder || "INBOX")}\r\n`);
      } else if (step === 2 && /A2 /i.test(buffer)) {
        step = 3; buffer = "";
        socket.write(`A3 SEARCH SINCE ${IMAP_SINCE}\r\n`);
      } else if (step === 3 && /A3 /i.test(buffer)) {
        const line = buffer.split("\n").find(l => l.startsWith("* SEARCH"));
        const ids = line ? line.replace("* SEARCH", "").trim().split(/\s+/).filter(Boolean) : [];
        if (ids.length === 0) { socket.destroy(); resolve({ email: acct.email, count: 0, items: [], alerts: [] }); return; }
        const range = ids.slice(-20).join(",");
        step = 4; buffer = "";
        socket.write(`A4 FETCH ${range} (BODY.PEEK[HEADER.FIELDS (Subject Date From)])\r\n`);
      } else if (step === 4 && /A4 OK/i.test(buffer)) {
        const items = [];
        const parts = buffer.split(/\* \d+ FETCH/);
        parts.forEach(p => {
          const subMatch = p.match(/Subject:\s*(.+?)(?:\r?\n)/i);
          const dateMatch = p.match(/Date:\s*(.+?)(?:\r?\n)/i);
          const fromMatch = p.match(/From:\s*(.+?)(?:\r?\n)/i);
          if (subMatch) {
            const subj = decodeMime(subMatch[1].trim());
            const dateStr = dateMatch ? dateMatch[1].trim() : "";
            const from = fromMatch ? fromMatch[1].trim().slice(0, 80) : "";
            const emailDate = dateStr ? new Date(dateStr) : null;
            if (emailDate && emailDate >= WINDOW_START) {
              const sl = (subj + " " + from).toLowerCase();
              const isAlert = ALERT_KEYWORDS.some(kw => sl.includes(kw));
              items.push({ subject: subj.slice(0, 120), from: from.slice(0, 80), date: dateStr.slice(0, 30), isAlert });
            }
          }
        });
        socket.write("A9 LOGOUT\r\n");
        socket.destroy();
        resolve({ email: acct.email, count: items.length, items, alerts: items.filter(i => i.isAlert) });
      }
    });
  });
}

async function main() {
  const results = await Promise.all(accounts.map(checkIMAP));
  console.log(JSON.stringify(results, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });
