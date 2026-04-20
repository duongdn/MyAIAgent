// One-off IMAP refresh for 2026-04-20 13:34 refresh window.
// Window: 2026-04-20T08:40:00+07:00 → now
const tls = require("tls");
const accounts = require("../config/.email-accounts.json").accounts;

const cutoff = new Date("2026-04-20T08:40:00+07:00");

function imapFetch(acct) {
  return new Promise((resolve) => {
    let buffer = "";
    let step = 0;
    let allMsgs = [];
    const socket = tls.connect(993, acct.imap_server, () => {});
    socket.setTimeout(25000);
    socket.on("timeout", () => { socket.destroy(); resolve({email: acct.email, error: "timeout"}); });
    socket.on("error", (e) => resolve({email: acct.email, error: e.message}));
    socket.on("data", (data) => {
      buffer += data.toString();
      try {
        if (step === 0 && buffer.includes("OK")) {
          step = 1; buffer = "";
          socket.write("A1 LOGIN " + JSON.stringify(acct.email) + " " + JSON.stringify(acct.app_password) + "\r\n");
        } else if (step === 1 && buffer.includes("A1 ")) {
          if (!buffer.includes("A1 OK")) { socket.destroy(); resolve({email: acct.email, error: "auth_fail"}); return; }
          step = 2; buffer = "";
          socket.write("A2 SELECT " + JSON.stringify(acct.folder || "INBOX") + "\r\n");
        } else if (step === 2 && buffer.includes("A2 ")) {
          if (!buffer.includes("A2 OK")) { socket.destroy(); resolve({email: acct.email, error: "select_fail"}); return; }
          step = 3; buffer = "";
          socket.write("A3 SEARCH SINCE 19-Apr-2026\r\n");
        } else if (step === 3 && buffer.includes("A3 ")) {
          const searchLine = buffer.split("\n").find(l => l.startsWith("* SEARCH"));
          const ids = searchLine ? searchLine.replace("* SEARCH","").trim().split(/\s+/).filter(Boolean) : [];
          if (ids.length === 0) { socket.write("A9 LOGOUT\r\n"); socket.destroy(); resolve({email: acct.email, msgs: []}); return; }
          // Take up to last 60 (should be plenty for 1-day window)
          const range = ids.slice(-60).join(",");
          step = 4; buffer = "";
          socket.write("A4 FETCH " + range + " (BODY.PEEK[HEADER.FIELDS (Subject Date From)])\r\n");
        } else if (step === 4 && buffer.includes("A4 OK")) {
          const parts = buffer.split("* ");
          parts.forEach(p => {
            const subMatch = p.match(/Subject:\s*(.+?)\r?\n(?![ \t])/is);
            const dateMatch = p.match(/Date:\s*(.+?)\r?\n/i);
            const fromMatch = p.match(/From:\s*(.+?)\r?\n/i);
            if (subMatch && dateMatch) {
              const subj = subMatch[1].replace(/\r?\n[ \t]+/g, " ").trim();
              const dateStr = dateMatch[1].trim();
              const from = fromMatch ? fromMatch[1].trim() : "";
              const emailDate = new Date(dateStr);
              if (!isNaN(emailDate) && emailDate >= cutoff) {
                allMsgs.push({subject: subj, date: dateStr, from, iso: emailDate.toISOString()});
              }
            }
          });
          socket.write("A9 LOGOUT\r\n");
          socket.destroy();
          resolve({email: acct.email, msgs: allMsgs});
        }
      } catch (e) {
        socket.destroy();
        resolve({email: acct.email, error: "parse:" + e.message});
      }
    });
  });
}

(async () => {
  const out = {};
  for (const a of accounts) {
    const r = await imapFetch(a);
    out[a.email] = r;
  }
  console.log(JSON.stringify(out, null, 2));
})();
