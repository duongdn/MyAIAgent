const tls = require("tls");
const accounts = require("../config/.email-accounts.json").accounts;
const cutoff = new Date("2026-04-22T08:40:00+07:00");

function checkIMAP(acct) {
  return new Promise((resolve) => {
    let buffer = "";
    let step = 0;
    const folder = acct.folder || "INBOX";
    const socket = tls.connect(993, acct.imap_server, () => {});
    socket.setTimeout(30000);
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
        socket.write("A2 SELECT " + JSON.stringify(folder) + "\r\n");
      } else if (step === 2 && buffer.includes("A2 ")) {
        if (!buffer.includes("A2 OK")) { socket.destroy(); resolve({email: acct.email, error: "select_fail:" + buffer.trim().slice(0,200)}); return; }
        step = 3; buffer = "";
        socket.write("A3 SEARCH SINCE 22-Apr-2026\r\n");
      } else if (step === 3 && buffer.includes("A3 ")) {
        const searchLine = buffer.split("\n").find(l => l.startsWith("* SEARCH"));
        const ids = searchLine ? searchLine.replace("* SEARCH","").trim().split(/\s+/).filter(Boolean) : [];
        if (ids.length === 0) { socket.write("A9 LOGOUT\r\n"); socket.destroy(); resolve({email: acct.email, count: 0, items: []}); return; }
        // Take last 100 (most recent) to be safe
        const range = ids.slice(-500).join(",");
        step = 4; buffer = "";
        socket.write("A4 FETCH " + range + " (BODY.PEEK[HEADER.FIELDS (Subject Date From To)])\r\n");
      } else if (step === 4 && buffer.includes("A4 OK")) {
        const items = [];
        const parts = buffer.split(/^\* \d+ FETCH/m);
        parts.forEach(p => {
          const subMatch = p.match(/Subject:\s*([\s\S]+?)\r?\n(?=[A-Z]|\)|$)/i);
          const dateMatch = p.match(/Date:\s*(.+?)\r?\n/i);
          const fromMatch = p.match(/From:\s*([\s\S]+?)\r?\n(?=[A-Z]|\)|$)/i);
          if (subMatch) {
            let subj = subMatch[1].replace(/\r?\n\s+/g, ' ').trim();
            const dateStr = dateMatch ? dateMatch[1].trim() : "";
            const fromStr = fromMatch ? fromMatch[1].replace(/\r?\n\s+/g, ' ').trim() : "";
            const emailDate = dateStr ? new Date(dateStr) : null;
            if (emailDate && emailDate >= cutoff) {
              items.push({subject: subj.slice(0,200), date: dateStr, from: fromStr.slice(0,150)});
            }
          }
        });
        socket.write("A9 LOGOUT\r\n"); socket.destroy();
        resolve({email: acct.email, count: items.length, items});
      }
    });
  });
}

(async () => {
  const results = await Promise.all(accounts.map(a => checkIMAP(a)));
  console.log(JSON.stringify(results, null, 2));
})();
