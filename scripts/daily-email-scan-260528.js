// Daily email scan for 2026-05-28 — window: 2026-05-27T08:56+07 → now
const tls = require("tls");
const accounts = require("../config/.email-accounts.json").accounts;

const WINDOW_START = new Date("2026-05-27T08:56:29+07:00");
const IMAP_SINCE = "27-May-2026";

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
          socket.destroy(); resolve({ email: acct.email, error: "auth_fail" }); return;
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
          socket.write("A9 LOGOUT\r\n"); socket.destroy();
          resolve({ email: acct.email, count: 0, subjects: [], alerts: [] }); return;
        }
        const range = ids.slice(-30).join(",");
        step = 4; buffer = "";
        socket.write(`A4 FETCH ${range} (BODY.PEEK[HEADER.FIELDS (Subject Date From)])\r\n`);
      } else if (step === 4 && buffer.includes("A4 ")) {
        socket.write("A9 LOGOUT\r\n"); socket.destroy();
        const subjects = [];
        const alerts = [];
        const blocks = buffer.split(/\* \d+ FETCH/).slice(1);
        for (const blk of blocks) {
          const subM = blk.match(/^Subject:\s*(.+)$/im);
          const dateM = blk.match(/^Date:\s*(.+)$/im);
          if (!subM) continue;
          const subj = subM[1].trim();
          const dateStr = dateM ? dateM[1].trim() : "";
          let emailDate = null;
          try { emailDate = new Date(dateStr); } catch(_) {}
          if (emailDate && emailDate < WINDOW_START) continue;
          subjects.push(subj);
          const sl = subj.toLowerCase();
          if (ALERT_KEYWORDS.some(k => sl.includes(k))) alerts.push(subj);
        }
        resolve({ email: acct.email, count: subjects.length, subjects: subjects.slice(0, 10), alerts });
      }
    });
  });
}

(async () => {
  const results = await Promise.all(accounts.map(checkIMAP));
  console.log(JSON.stringify(results, null, 2));
})();
