const tls = require("tls");
const accounts = require("../config/.email-accounts.json").accounts;
const cutoff = new Date("2026-03-24T10:30:00+07:00");

function checkIMAP(acct) {
  return new Promise((resolve) => {
    let buffer = "";
    let step = 0;
    const socket = tls.connect(993, acct.imap_server, () => {});
    socket.setTimeout(10000);
    socket.on("timeout", () => { socket.destroy(); resolve({email: acct.email, error: "timeout"}); });
    socket.on("error", (e) => resolve({email: acct.email, error: e.message}));
    socket.on("data", (data) => {
      buffer += data.toString();
      if (step === 0 && buffer.includes("OK")) {
        step = 1; buffer = "";
        socket.write("A1 LOGIN " + JSON.stringify(acct.email) + " " + JSON.stringify(acct.app_password) + "\r\n");
      } else if (step === 1 && buffer.includes("A1 ")) {
        if (!buffer.includes("A1 OK")) { socket.destroy(); resolve({email: acct.email, error: "auth_fail:" + buffer.trim().slice(0,80)}); return; }
        step = 2; buffer = "";
        socket.write("A2 SELECT " + JSON.stringify(acct.folder || "INBOX") + "\r\n");
      } else if (step === 2 && buffer.includes("A2 ")) {
        step = 3; buffer = "";
        socket.write("A3 SEARCH SINCE 24-Mar-2026\r\n");
      } else if (step === 3 && buffer.includes("A3 ")) {
        const searchLine = buffer.split("\n").find(l => l.startsWith("* SEARCH"));
        const ids = searchLine ? searchLine.replace("* SEARCH","").trim().split(/\s+/).filter(Boolean) : [];
        if (ids.length === 0) { socket.write("A9 LOGOUT\r\n"); socket.destroy(); resolve({email: acct.email, count: 0, alerts: []}); return; }
        const range = ids.slice(-10).join(",");
        step = 4; buffer = "";
        socket.write("A4 FETCH " + range + " (BODY.PEEK[HEADER.FIELDS (Subject Date From)])\r\n");
      } else if (step === 4 && buffer.includes("A4 OK")) {
        const subjects = [];
        const parts = buffer.split("* ");
        parts.forEach(p => {
          const subMatch = p.match(/Subject:\s*(.+?)\r?\n/i);
          const dateMatch = p.match(/Date:\s*(.+?)\r?\n/i);
          if (subMatch) {
            const subj = subMatch[1].trim();
            const dateStr = dateMatch ? dateMatch[1].trim() : "";
            const emailDate = dateStr ? new Date(dateStr) : null;
            if (emailDate && emailDate >= cutoff) {
              const sl = subj.toLowerCase();
              const isAlert = sl.includes("alert") || sl.includes("error") || sl.includes("fail") || sl.includes("down") ||
                             sl.includes("urgent") || sl.includes("warning") || sl.includes("critical") || sl.includes("incident") ||
                             sl.includes("server") || sl.includes("security") || sl.includes("escalat");
              subjects.push({subject: subj.slice(0,100), date: dateStr, isAlert});
            }
          }
        });
        const alertSubjects = subjects.filter(s => s.isAlert);
        socket.write("A9 LOGOUT\r\n"); socket.destroy();
        resolve({email: acct.email, count: subjects.length, alerts: alertSubjects});
      }
    });
  });
}

(async () => {
  const results = await Promise.all(accounts.map(a => checkIMAP(a)));
  results.forEach(r => {
    if (r.error) console.log(r.email + ": ERROR=" + r.error);
    else if (r.alerts && r.alerts.length > 0) console.log(r.email + ": " + r.count + " emails, ALERTS: " + JSON.stringify(r.alerts));
    else console.log(r.email + ": " + r.count + " new emails since cutoff, 0 alerts");
  });
})();
