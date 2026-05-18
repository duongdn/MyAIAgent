/**
 * Daily email fetch for monitoring report - 2026-05-18
 * Window: Since 2026-05-16 08:00:00 +07:00
 * Accounts: duongdn, carrick, nick, rick, kai, ken
 * Read-only — no Trello, no messages sent.
 */

const tls = require("tls");
const accounts = require("../config/.email-accounts.json").accounts;

const CUTOFF = new Date("2026-05-16T08:00:00+07:00");
const SINCE_STR = "16-May-2026";

// Per-account filter configs
const ACCOUNT_CONFIG = {
  "duongdn@nustechnology.com": {
    folder: "INBOX",
    alertKeywords: ["leave", "new relic", "alert", "error", "fail", "down", "urgent", "warning", "critical", "incident"],
    filterDesc: "leave requests, New Relic alerts"
  },
  "carrick@nustechnology.com": {
    folder: "INBOX",
    alertKeywords: ["generator", "elliott", "bug", "error", "alert", "fail", "redmine", "down", "critical", "urgent"],
    ignoreKeywords: ["socalautowraps", "socal auto wrap"],
    filterDesc: "Redmine bugs Generator/Elliott (ignore Socalautowraps Rollbar)"
  },
  "nick@nustechnology.com": {
    folder: "INBOX",
    requiredKeywords: ["john yi"],
    alertKeywords: ["alert", "error", "fail", "urgent", "critical"],
    filterDesc: "John Yi mentions"
  },
  "rick@nustechnology.com": {
    folder: "INBOX",
    requiredKeywords: ["kunal", "fountain", "infinityrose", "infinity rose"],
    alertKeywords: ["rollbar", "bugsnag", "production", "error", "alert", "fail", "critical", "down"],
    filterDesc: "Rollbar/BugSnag PRODUCTION alerts for Fountain/InfinityRoses"
  },
  "kai@nustechnology.com": {
    folder: "INBOX",
    requiredKeywords: ["madhuraka"],
    alertKeywords: ["jira", "alert", "error", "fail", "critical"],
    filterDesc: "Jira/Madhuraka mentions"
  },
  "ken@nustechnology.com": {
    folder: "NewsLetter",
    requiredKeywords: ["precognize"],
    alertKeywords: ["pr", "pull request", "merged", "alert", "error", "fail"],
    filterDesc: "Precognize GitHub PR activity"
  }
};

function decodeSubject(subject) {
  // Handle encoded subjects like =?UTF-8?B?...?= or =?UTF-8?Q?...?=
  if (!subject) return "";
  return subject
    .replace(/=\?([^?]+)\?([BbQq])\?([^?]*)\?=/g, (match, charset, encoding, encoded) => {
      try {
        if (encoding.toUpperCase() === "B") {
          return Buffer.from(encoded, "base64").toString("utf8");
        } else if (encoding.toUpperCase() === "Q") {
          return encoded.replace(/_/g, " ").replace(/=([0-9A-Fa-f]{2})/g, (m, hex) =>
            String.fromCharCode(parseInt(hex, 16))
          );
        }
      } catch (e) {}
      return match;
    })
    .trim();
}

function checkIMAP(acct) {
  const config = ACCOUNT_CONFIG[acct.email] || { folder: "INBOX", alertKeywords: [], filterDesc: "" };
  const folder = acct.folder || config.folder;

  return new Promise((resolve) => {
    let buffer = "";
    let step = 0;
    let allIds = [];

    const result = {
      email: acct.email,
      folder,
      filterDesc: config.filterDesc,
      totalSince: 0,
      relevant: [],
      alerts: [],
      error: null
    };

    const socket = tls.connect(993, acct.imap_server, () => {});
    socket.setTimeout(20000);

    socket.on("timeout", () => {
      socket.destroy();
      result.error = "timeout";
      resolve(result);
    });

    socket.on("error", (e) => {
      result.error = e.message;
      resolve(result);
    });

    socket.on("data", (data) => {
      buffer += data.toString();

      // Step 0: Wait for server greeting
      if (step === 0 && buffer.includes("* OK")) {
        step = 1;
        buffer = "";
        socket.write(`A1 LOGIN "${acct.email}" "${acct.app_password}"\r\n`);

      // Step 1: Login response
      } else if (step === 1 && buffer.includes("A1 ")) {
        if (!buffer.includes("A1 OK")) {
          socket.destroy();
          result.error = "auth_fail: " + buffer.trim().slice(0, 120);
          resolve(result);
          return;
        }
        step = 2;
        buffer = "";
        socket.write(`A2 SELECT "${folder}"\r\n`);

      // Step 2: SELECT folder response
      } else if (step === 2 && buffer.includes("A2 ")) {
        if (!buffer.includes("A2 OK")) {
          // Try EXAMINE as fallback
          step = 2;
          buffer = "";
          socket.write(`A2B EXAMINE "${folder}"\r\n`);
          return;
        }
        step = 3;
        buffer = "";
        socket.write(`A3 SEARCH SINCE ${SINCE_STR}\r\n`);

      // Step 2B: EXAMINE fallback
      } else if (step === 2 && buffer.includes("A2B ")) {
        if (!buffer.includes("A2B OK")) {
          socket.destroy();
          result.error = `folder_not_found: ${folder}`;
          resolve(result);
          return;
        }
        step = 3;
        buffer = "";
        socket.write(`A3 SEARCH SINCE ${SINCE_STR}\r\n`);

      // Step 3: SEARCH results
      } else if (step === 3 && buffer.includes("A3 ")) {
        const searchLine = buffer.split("\r\n").find(l => l.startsWith("* SEARCH"));
        const ids = searchLine
          ? searchLine.replace("* SEARCH", "").trim().split(/\s+/).filter(Boolean)
          : [];

        if (ids.length === 0) {
          socket.write("A9 LOGOUT\r\n");
          setTimeout(() => socket.destroy(), 500);
          resolve(result);
          return;
        }

        allIds = ids;
        // Fetch last 50 to keep it manageable
        const range = ids.slice(-50).join(",");
        step = 4;
        buffer = "";
        socket.write(`A4 FETCH ${range} (BODY.PEEK[HEADER.FIELDS (Subject Date From)])\r\n`);

      // Step 4: FETCH response
      } else if (step === 4 && buffer.includes("A4 OK")) {
        // Parse all message blocks
        const messages = [];
        const parts = buffer.split(/\* \d+ FETCH/);

        parts.forEach(part => {
          const subjectMatch = part.match(/Subject:\s*(.+?)(?:\r?\n(?!\s))/i);
          const dateMatch = part.match(/Date:\s*(.+?)(?:\r?\n(?!\s))/i);
          const fromMatch = part.match(/From:\s*(.+?)(?:\r?\n(?!\s))/i);

          if (subjectMatch || dateMatch) {
            const rawSubject = subjectMatch ? subjectMatch[1].trim() : "(no subject)";
            const subject = decodeSubject(rawSubject);
            const dateStr = dateMatch ? dateMatch[1].trim() : "";
            const from = fromMatch ? fromMatch[1].trim() : "";
            const emailDate = dateStr ? new Date(dateStr) : null;

            if (emailDate && emailDate >= CUTOFF) {
              messages.push({ subject, date: dateStr, from, emailDate });
            }
          }
        });

        result.totalSince = messages.length;

        // Apply filters
        messages.forEach(msg => {
          const sl = msg.subject.toLowerCase();
          const fl = msg.from.toLowerCase();
          const combined = sl + " " + fl;

          // Check ignore keywords (carrick - socalautowraps)
          if (config.ignoreKeywords) {
            const shouldIgnore = config.ignoreKeywords.some(kw => combined.includes(kw.toLowerCase()));
            if (shouldIgnore) return;
          }

          // Check required keywords filter
          let isRelevant = true;
          if (config.requiredKeywords && config.requiredKeywords.length > 0) {
            isRelevant = config.requiredKeywords.some(kw => combined.includes(kw.toLowerCase()));
          }

          if (isRelevant) {
            result.relevant.push(msg);

            // Check if it's an alert
            const isAlert = config.alertKeywords.some(kw => combined.includes(kw.toLowerCase()));
            if (isAlert) {
              result.alerts.push(msg);
            }
          }
        });

        socket.write("A9 LOGOUT\r\n");
        setTimeout(() => { socket.destroy(); resolve(result); }, 500);
      }
    });
  });
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });
  } catch (e) {
    return dateStr;
  }
}

(async () => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { timeZone: "Asia/Ho_Chi_Minh", hour: "2-digit", minute: "2-digit", hour12: false });

  console.log(`\n## Email — ${timeStr} (+07:00)\n`);
  console.log(`Fetching from ${accounts.length} accounts since ${CUTOFF.toISOString()}...\n`);

  const results = await Promise.all(accounts.map(acct => checkIMAP(acct)));

  // Table header
  console.log("| Account | Count | Relevant | Summary |");
  console.log("|---------|-------|----------|---------|");

  const globalAlerts = [];

  results.forEach(r => {
    const shortEmail = r.email.split("@")[0];
    if (r.error) {
      console.log(`| ${shortEmail} | ERR | - | ${r.error} |`);
      return;
    }

    let summary = "";
    if (r.relevant.length === 0 && r.totalSince === 0) {
      summary = "No emails since cutoff";
    } else if (r.relevant.length === 0) {
      summary = `${r.totalSince} emails, none matched filter (${r.filterDesc})`;
    } else {
      const subjects = r.relevant.slice(0, 5).map(m => `"${m.subject.slice(0, 60)}"`).join("; ");
      summary = subjects;
      if (r.relevant.length > 5) summary += ` (+${r.relevant.length - 5} more)`;
    }

    console.log(`| ${shortEmail} | ${r.totalSince} | ${r.relevant.length} | ${summary} |`);

    // Collect alerts
    r.alerts.forEach(a => {
      globalAlerts.push({ account: shortEmail, subject: a.subject, from: a.from, date: a.date });
    });
  });

  // Detailed breakdown per account
  console.log("\n---\n");
  results.forEach(r => {
    if (r.error) return;
    const shortEmail = r.email.split("@")[0];
    if (r.relevant.length > 0) {
      console.log(`\n### ${shortEmail} — ${r.relevant.length} relevant (folder: ${r.folder})`);
      r.relevant.forEach(m => {
        const flag = r.alerts.includes(m) ? " [ALERT]" : "";
        console.log(`  - [${formatDate(m.date)}] ${m.subject.slice(0, 100)}${flag}`);
        if (m.from) console.log(`    From: ${m.from.slice(0, 80)}`);
      });
    }
  });

  // Alerts section
  console.log("\n---\n");
  if (globalAlerts.length === 0) {
    console.log("No alerts.");
  } else {
    console.log("ALERTS:");
    globalAlerts.forEach(a => {
      // Classify severity
      const sl = a.subject.toLowerCase();
      let severity = "MED";
      if (sl.includes("critical") || sl.includes("down") || sl.includes("outage") || sl.includes("production error")) severity = "CRIT";
      else if (sl.includes("error") || sl.includes("fail") || sl.includes("alert") || sl.includes("urgent")) severity = "HIGH";
      console.log(`- [${severity}] [${a.account}] ${a.subject.slice(0, 100)}`);
      if (a.from) console.log(`  From: ${a.from.slice(0, 80)} | ${formatDate(a.date)}`);
    });
  }

  console.log("\n---");
  console.log(`Run complete at ${new Date().toISOString()}`);
})();
