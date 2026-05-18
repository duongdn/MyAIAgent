/**
 * Daily email fetch for monitoring report - 2026-05-18 v2
 * Window: Since 2026-05-16 08:00:00 +07:00
 * Fixes: MIME-encoded subject decoding, deduplication of fetched messages
 */

const tls = require("tls");
const accounts = require("../config/.email-accounts.json").accounts;

const CUTOFF = new Date("2026-05-16T08:00:00+07:00");
const SINCE_STR = "16-May-2026";
const MAX_FETCH = 60; // fetch last N UIDs

const ACCOUNT_CONFIG = {
  "duongdn@nustechnology.com": {
    folder: "INBOX",
    requiredKeywords: [],
    alertKeywords: ["leave", "new relic", "alert", "error", "fail", "down", "urgent", "warning", "critical", "incident", "nghỉ"],
    ignoreKeywords: [],
    filterDesc: "leave requests, New Relic alerts"
  },
  "carrick@nustechnology.com": {
    folder: "INBOX",
    requiredKeywords: [],
    alertKeywords: ["generator", "elliott", "bug", "error", "alert", "fail", "redmine", "down", "critical", "urgent", "exception"],
    ignoreKeywords: ["socalautowraps", "socal auto wrap", "socalauto"],
    filterDesc: "Redmine bugs Generator/Elliott (ignore Socalautowraps Rollbar)"
  },
  "nick@nustechnology.com": {
    folder: "INBOX",
    requiredKeywords: ["john yi", "johnyi", "john_yi"],
    alertKeywords: ["alert", "error", "fail", "urgent", "critical"],
    ignoreKeywords: [],
    filterDesc: "John Yi mentions"
  },
  "rick@nustechnology.com": {
    folder: "INBOX",
    requiredKeywords: ["kunal", "fountain", "infinityrose", "infinity rose", "infinityroses"],
    alertKeywords: ["rollbar", "bugsnag", "production", "error", "alert", "fail", "critical", "down", "exception", "crash"],
    ignoreKeywords: [],
    filterDesc: "Rollbar/BugSnag PRODUCTION alerts for Fountain/InfinityRoses"
  },
  "kai@nustechnology.com": {
    folder: "INBOX",
    requiredKeywords: ["madhuraka"],
    alertKeywords: ["jira", "alert", "error", "fail", "critical", "bug", "issue"],
    ignoreKeywords: [],
    filterDesc: "Jira/Madhuraka mentions"
  },
  "ken@nustechnology.com": {
    folder: "NewsLetter",
    requiredKeywords: ["precognize"],
    alertKeywords: ["pull request", "pr ", "merged", "alert", "error", "fail", "review"],
    ignoreKeywords: [],
    filterDesc: "Precognize GitHub PR activity"
  }
};

// Decode RFC2047 encoded words: =?charset?encoding?text?=
function decodeRFC2047(str) {
  if (!str) return "";
  // Handle multiple encoded words (possibly with whitespace between them)
  return str.replace(/=\?([^?]+)\?([BbQq])\?([^?]*)\?=(\s*=\?[^?]+\?[BbQq]\?[^?]*\?=)*/g, (fullMatch) => {
    return fullMatch.replace(/=\?([^?]+)\?([BbQq])\?([^?]*)\?=/g, (match, charset, encoding, encoded) => {
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
    });
  }).trim();
}

// Parse a multi-line header value (handles folded headers)
function parseHeaderValue(raw, headerName) {
  const regex = new RegExp(`^${headerName}:\\s*(.+?)(?:\\r?\\n(?![ \\t]))`, "im");
  const match = raw.match(regex);
  if (!match) return null;
  // Also handle folded continuation lines
  let val = match[1];
  // Grab continuation lines
  const lines = raw.split(/\r?\n/);
  const startIdx = lines.findIndex(l => new RegExp(`^${headerName}:`, "i").test(l));
  if (startIdx >= 0) {
    let fullVal = lines[startIdx].replace(new RegExp(`^${headerName}:\\s*`, "i"), "");
    let i = startIdx + 1;
    while (i < lines.length && /^[ \t]/.test(lines[i])) {
      fullVal += " " + lines[i].trim();
      i++;
    }
    return fullVal.trim();
  }
  return val;
}

function checkIMAP(acct) {
  const config = ACCOUNT_CONFIG[acct.email] || { folder: "INBOX", alertKeywords: [], requiredKeywords: [], ignoreKeywords: [], filterDesc: "" };
  const folder = acct.folder || config.folder;

  return new Promise((resolve) => {
    let buffer = "";
    let step = 0;
    let fetchedIds = [];

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
    socket.setTimeout(25000);

    const done = (err) => {
      if (err) result.error = err;
      try { socket.write("A9 LOGOUT\r\n"); } catch (e) {}
      setTimeout(() => { try { socket.destroy(); } catch (e) {} resolve(result); }, 600);
    };

    socket.on("timeout", () => done("timeout"));
    socket.on("error", (e) => done(e.message));

    socket.on("data", (data) => {
      buffer += data.toString();

      if (step === 0 && (buffer.includes("* OK") || buffer.includes("OK Zoho"))) {
        step = 1;
        buffer = "";
        socket.write(`A1 LOGIN "${acct.email}" "${acct.app_password}"\r\n`);

      } else if (step === 1 && buffer.includes("A1 ")) {
        if (!buffer.includes("A1 OK")) {
          const errMsg = buffer.replace(/\n/g, " ").trim().slice(0, 120);
          return done("auth_fail: " + errMsg);
        }
        step = 2;
        buffer = "";
        socket.write(`A2 SELECT "${folder}"\r\n`);

      } else if (step === 2 && (buffer.includes("A2 OK") || buffer.includes("A2 NO") || buffer.includes("A2 BAD"))) {
        if (!buffer.includes("A2 OK")) {
          return done(`folder_error: ${folder} — ${buffer.trim().slice(0, 80)}`);
        }
        step = 3;
        buffer = "";
        socket.write(`A3 SEARCH SINCE ${SINCE_STR}\r\n`);

      } else if (step === 3 && buffer.includes("A3 ")) {
        const lines = buffer.split(/\r?\n/);
        const searchLine = lines.find(l => /^\* SEARCH/.test(l));
        const ids = searchLine
          ? searchLine.replace("* SEARCH", "").trim().split(/\s+/).filter(Boolean)
          : [];

        if (ids.length === 0) {
          return done(null);
        }

        // Deduplicate IDs (IMAP sometimes returns duplicates if search matches twice)
        const uniqueIds = [...new Set(ids)];
        result.totalSince = uniqueIds.length; // will refine after date filter

        // Take last MAX_FETCH
        fetchedIds = uniqueIds.slice(-MAX_FETCH);
        const range = fetchedIds.join(",");

        step = 4;
        buffer = "";
        socket.write(`A4 FETCH ${range} (BODY.PEEK[HEADER.FIELDS (Subject Date From)])\r\n`);

      } else if (step === 4 && buffer.includes("A4 OK")) {
        // Split by message boundaries
        // Each FETCH response block starts with "* N FETCH"
        const seenKeys = new Set(); // for dedup
        const blocks = buffer.split(/\r?\n(?=\* \d+ FETCH)/);

        blocks.forEach(block => {
          if (!block.trim() || !block.includes("FETCH")) return;

          const subject = decodeRFC2047(parseHeaderValue(block, "Subject") || "");
          const dateStr = parseHeaderValue(block, "Date") || "";
          const from = decodeRFC2047(parseHeaderValue(block, "From") || "");

          if (!dateStr) return;

          const emailDate = new Date(dateStr);
          if (isNaN(emailDate.getTime()) || emailDate < CUTOFF) return;

          // Deduplicate by subject+date combo
          const key = `${subject}|${dateStr}|${from}`;
          if (seenKeys.has(key)) return;
          seenKeys.add(key);

          const msg = { subject: subject || "(no subject)", date: dateStr, from, emailDate };

          const sl = msg.subject.toLowerCase();
          const fl = msg.from.toLowerCase();
          const combined = sl + " " + fl;

          // Apply ignore filter
          if (config.ignoreKeywords && config.ignoreKeywords.length > 0) {
            const shouldIgnore = config.ignoreKeywords.some(kw => combined.includes(kw.toLowerCase()));
            if (shouldIgnore) return;
          }

          // Apply required keyword filter
          let isRelevant = true;
          if (config.requiredKeywords && config.requiredKeywords.length > 0) {
            isRelevant = config.requiredKeywords.some(kw => combined.includes(kw.toLowerCase()));
          }

          // For accounts with no required filter, all emails are relevant
          if (isRelevant || (config.requiredKeywords && config.requiredKeywords.length === 0)) {
            result.relevant.push(msg);

            // Check alert keywords
            const isAlert = config.alertKeywords.some(kw => combined.includes(kw.toLowerCase()));
            if (isAlert) {
              result.alerts.push(msg);
            }
          }
        });

        // Update totalSince to reflect deduplicated count
        result.totalSince = seenKeys.size + result.relevant.filter(m => !seenKeys.has(`${m.subject}|${m.date}|${m.from}`)).length;
        // Actually just count unique messages we found (seenKeys includes all processed)
        // totalSince = unique messages after cutoff
        // Let's just count result.relevant as a minimum, plus ignored ones
        // We'll note total SINCE as the raw ID count (server-side)

        done(null);
      }
    });
  });
}

function formatLocalDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
      month: "short", day: "2-digit",
      hour: "2-digit", minute: "2-digit",
      hour12: false
    });
  } catch (e) {
    return dateStr;
  }
}

(async () => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit", minute: "2-digit", hour12: false
  });

  console.log(`\n## Email — ${timeStr} (+07:00)\n`);

  const results = await Promise.all(accounts.map(acct => checkIMAP(acct)));

  // Summary table
  console.log("| Account | Count | Relevant | Summary |");
  console.log("|---------|-------|----------|---------|");

  const globalAlerts = [];

  results.forEach(r => {
    const shortEmail = r.email.split("@")[0];
    if (r.error) {
      console.log(`| ${shortEmail} | ERR | - | ${r.error} |`);
      return;
    }

    let summary;
    if (r.relevant.length === 0 && r.totalSince === 0) {
      summary = "No emails since cutoff";
    } else if (r.relevant.length === 0) {
      summary = `${r.totalSince} total, none matched: ${r.filterDesc}`;
    } else {
      const subjects = [...new Set(r.relevant.map(m => m.subject))]
        .slice(0, 4)
        .map(s => `"${s.slice(0, 55)}"`)
        .join("; ");
      summary = subjects;
      const extra = r.relevant.length - 4;
      if (extra > 0) summary += ` (+${extra} more)`;
    }

    console.log(`| ${shortEmail} | ${r.totalSince} | ${r.relevant.length} | ${summary} |`);

    r.alerts.forEach(a => {
      globalAlerts.push({ account: shortEmail, ...a });
    });
  });

  // Per-account details
  console.log("\n---");
  results.forEach(r => {
    if (r.error || r.relevant.length === 0) return;
    const shortEmail = r.email.split("@")[0];
    console.log(`\n### ${shortEmail} (${r.folder}) — ${r.relevant.length} relevant emails`);
    r.relevant.forEach(m => {
      const alertFlag = r.alerts.some(a => a.subject === m.subject && a.date === m.date) ? " [!]" : "";
      console.log(`  [${formatLocalDate(m.date)}]${alertFlag} ${m.subject.slice(0, 100)}`);
      console.log(`  From: ${m.from.slice(0, 90)}`);
    });
  });

  // Alerts
  console.log("\n---");
  if (globalAlerts.length === 0) {
    console.log("\nNo alerts.");
  } else {
    console.log("\nALERTS (if any):");
    const seen = new Set();
    globalAlerts.forEach(a => {
      const key = `${a.account}|${a.subject}|${a.date}`;
      if (seen.has(key)) return;
      seen.add(key);

      const sl = a.subject.toLowerCase();
      let severity = "MED";
      if (sl.includes("critical") || sl.includes("outage") || sl.includes("down") || sl.includes("production error")) severity = "CRIT";
      else if (sl.includes("error") || sl.includes("fail") || sl.includes("alert") || sl.includes("urgent") || sl.includes("exception") || sl.includes("crash")) severity = "HIGH";

      console.log(`- [${severity}] [${a.account}] ${a.subject.slice(0, 100)}`);
      console.log(`  From: ${a.from.slice(0, 80)} | ${formatLocalDate(a.date)}`);
    });
  }

  console.log(`\nRun complete: ${new Date().toISOString()}`);
})();
