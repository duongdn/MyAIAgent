// Daily email scan for 2026-05-19 — window: 2026-05-18T08:58+07 → now
const tls = require("tls");
const accounts = require("../config/.email-accounts.json").accounts;

const WINDOW_START = new Date("2026-05-18T08:58:00+07:00");
const IMAP_SINCE = "18-May-2026"; // search server-side; we filter by Date header

const ALERT_KEYWORDS = [
  "alert", "error", "fail", "down", "urgent", "warning", "critical",
  "incident", "outage", "security", "escalat", "breach", "crash",
  "leave request", "nghỉ phép", "xin nghỉ", "production", "rollbar", "bugsnag",
  "expires", "expir", "deploy", "expired"
];

function checkIMAP(acct) {
  return new Promise((resolve) => {
    let buffer = "";
    let step = 0;
    const socket = tls.connect(993, acct.imap_server || "imap.zoho.com", () => {});
    socket.setTimeout(15000);
    socket.on("timeout", () => { socket.destroy(); resolve({ email: acct.email, error: "timeout" }); });
    socket.on("error", (e) => resolve({ email: acct.email, error: e.message }));
    socket.on("data", (data) => {
      buffer += data.toString();
      if (step === 0 && buffer.includes("OK")) {
        step = 1; buffer = "";
        socket.write(`A1 LOGIN ${JSON.stringify(acct.email)} ${JSON.stringify(acct.app_password)}\r\n`);
      } else if (step === 1 && buffer.includes("A1 ")) {
        if (!buffer.includes("A1 OK")) {
          socket.destroy();
          resolve({ email: acct.email, error: "auth_fail" });
          return;
        }
        step = 2; buffer = "";
        const folder = acct.folder || "INBOX";
        socket.write(`A2 SELECT ${JSON.stringify(folder)}\r\n`);
      } else if (step === 2 && buffer.includes("A2 ")) {
        step = 3; buffer = "";
        socket.write(`A3 SEARCH SINCE ${IMAP_SINCE}\r\n`);
      } else if (step === 3 && buffer.includes("A3 ")) {
        const searchLine = buffer.split("\n").find(l => l.startsWith("* SEARCH"));
        const ids = searchLine ? searchLine.replace("* SEARCH", "").trim().split(/\s+/).filter(Boolean) : [];
        if (ids.length === 0) {
          socket.write("A9 LOGOUT\r\n");
          socket.destroy();
          resolve({ email: acct.email, count: 0, subjects: [], alerts: [] });
          return;
        }
        // fetch last 15 headers
        const range = ids.slice(-15).join(",");
        step = 4; buffer = "";
        socket.write(`A4 FETCH ${range} (BODY.PEEK[HEADER.FIELDS (Subject Date From)])\r\n`);
      } else if (step === 4 && buffer.includes("A4 OK")) {
        const items = [];
        const parts = buffer.split(/\* \d+ FETCH/);
        parts.forEach(p => {
          const subMatch = p.match(/Subject:\s*(.+?)\r?\n/i);
          const dateMatch = p.match(/Date:\s*(.+?)\r?\n/i);
          const fromMatch = p.match(/From:\s*(.+?)\r?\n/i);
          if (subMatch) {
            const subj = subMatch[1].trim().replace(/\r/g, "");
            const dateStr = dateMatch ? dateMatch[1].trim() : "";
            const from = fromMatch ? fromMatch[1].trim().slice(0, 60) : "";
            const emailDate = dateStr ? new Date(dateStr) : null;
            if (emailDate && emailDate >= WINDOW_START) {
              const sl = subj.toLowerCase() + " " + from.toLowerCase();
              const isAlert = ALERT_KEYWORDS.some(kw => sl.includes(kw));
              items.push({ subject: subj.slice(0, 100), from: from.slice(0, 60), date: dateStr.slice(0, 30), isAlert });
            }
          }
        });
        socket.write("A9 LOGOUT\r\n");
        socket.destroy();
        resolve({
          email: acct.email,
          count: items.length,
          subjects: items.map(i => i.subject),
          alerts: items.filter(i => i.isAlert),
          items
        });
      }
    });
  });
}

(async () => {
  const results = await Promise.all(accounts.map(a => checkIMAP(a)));
  const output = { window_start: WINDOW_START.toISOString(), results };
  console.log(JSON.stringify(output, null, 2));
})();
