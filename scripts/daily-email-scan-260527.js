// Daily email scan for 2026-05-27 — window: 2026-05-26T08:46+07 → now
const tls = require("tls");
const accounts = require("../config/.email-accounts.json").accounts;

const WINDOW_START = new Date("2026-05-26T08:46:00+07:00");
const IMAP_SINCE = "26-May-2026"; // search server-side; filter by Date header >= WINDOW_START

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
    socket.setTimeout(30000);
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
        const range = ids.slice(-30).join(",");
        step = 4; buffer = "";
        socket.write(`A4 FETCH ${range} (BODY.PEEK[HEADER.FIELDS (Subject Date From)])\r\n`);
      } else if (step === 4 && buffer.includes("A4 ")) {
        socket.write("A9 LOGOUT\r\n");
        socket.destroy();
        // Parse headers
        const subjects = [];
        const alerts = [];
        const dateRe = /^Date:\s*(.+)$/im;
        const subjectRe = /^Subject:\s*(.+)$/im;
        const fromRe = /^From:\s*(.+)$/im;
        const blocks = buffer.split(/\* \d+ FETCH/);
        for (const block of blocks) {
          const dateMatch = block.match(dateRe);
          if (!dateMatch) continue;
          let msgDate;
          try { msgDate = new Date(dateMatch[1].trim()); } catch(e) { continue; }
          if (isNaN(msgDate) || msgDate < WINDOW_START) continue;
          const sub = (block.match(subjectRe) || [])[1] || "(no subject)";
          const from = (block.match(fromRe) || [])[1] || "";
          const subLow = sub.toLowerCase();
          const isAlert = ALERT_KEYWORDS.some(k => subLow.includes(k));
          // Skip SoCal Rollbar (Blake dropped)
          if (sub.toLowerCase().includes("socalautowraps") || from.toLowerCase().includes("socalautowraps")) continue;
          subjects.push({ subject: sub.trim().slice(0, 100), from: from.trim().slice(0, 70), isAlert });
          if (isAlert) alerts.push(sub.trim().slice(0, 100));
        }
        resolve({ email: acct.email, count: subjects.length, subjects, alerts });
      }
    });
  });
}

async function main() {
  const results = await Promise.all(accounts.map(checkIMAP));
  console.log(JSON.stringify(results, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });
