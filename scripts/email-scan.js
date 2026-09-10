// Canonical daily email scan — single non-dated script, replaces the daily-email-scan-YYMMDD.js
// copy-per-day pattern (see docs/memory/daily-report/sheets/feedback_no_dated_scan_scripts.md for
// why dated copies are an anti-pattern: fixes made to one day's copy don't carry to the next day's).
//
// Window start is read dynamically from config/.monitoring-timelines.json (daily_report.last_run),
// same mechanism as every other daily-report piece — see feedback_monday_friday_timestamp.md and
// the Timeline note in .claude/commands/me/daily-report.md. Falls back to "yesterday 08:00 +07:00"
// only if last_run is missing or unparseable.
//
// NOTE (2026-09-10): this script does NOT classify "alerts" by keyword anymore — a customer
// forward like "Fwd: Coach Pass Access Issue" or "Fwd: Membership" carries no alert-sounding
// word and was silently dropped that way. It returns a `snippet` of real body text per message;
// the caller (Claude, reading the report) reads snippet+subject+from and decides what's an alert.
// This applies to every monitoring channel, not just email — see feedback_no_keyword_alert_classification.
const tls = require("tls");
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const allAccounts = require("../config/.email-accounts.json").accounts;
const accounts = allAccounts.filter(a => !a.gmail_api);
const gmailApiAccounts = allAccounts.filter(a => a.gmail_api);

function loadWindowStart() {
  const timelinesPath = path.join(__dirname, "../config/.monitoring-timelines.json");
  try {
    const timelines = JSON.parse(fs.readFileSync(timelinesPath, "utf8"));
    const lastRun = timelines?.daily_report?.last_run;
    if (lastRun) {
      const d = new Date(lastRun);
      if (!isNaN(d.getTime())) return d;
    }
  } catch (_) {}
  // Fallback: yesterday 08:00 +07:00
  const now = new Date();
  const fallback = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  fallback.setUTCHours(1, 0, 0, 0); // 08:00 +07:00 == 01:00 UTC
  return fallback;
}

const WINDOW_START = loadWindowStart();

// IMAP SINCE needs the calendar day BEFORE window start (server-side date, usually UTC) so
// UTC+7-morning emails that fall on the previous UTC calendar day aren't missed — see
// docs/memory/daily-report/email/feedback_imap_slack_timestamp_gotchas.md.
const IMAP_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function imapSinceDate(windowStart) {
  const dayBefore = new Date(windowStart.getTime() - 24 * 60 * 60 * 1000);
  return `${dayBefore.getUTCDate()}-${IMAP_MONTHS[dayBefore.getUTCMonth()]}-${dayBefore.getUTCFullYear()}`;
}
const IMAP_SINCE = imapSinceDate(WINDOW_START);

function decodeMime(str) {
  if (!str) return str;
  return str.replace(/=\?([^?]+)\?([BbQq])\?([^?]*)\?=/g, (_, charset, enc, data) => {
    try {
      if (enc.toUpperCase() === "B") return Buffer.from(data, "base64").toString("utf8");
      return data.replace(/_/g, " ").replace(/=([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
    } catch (e) { return data; }
  }).replace(/\s+/g, " ").trim();
}

// Extracts a plain-text preview from a raw IMAP FETCH BODY[TEXT] literal response.
// Best-effort: strips HTML tags and quoted-printable soft line breaks. Good enough for a
// preview snippet, not a full MIME parser.
function extractSnippet(raw) {
  const m = raw.match(/\{(\d+)\}\r\n/);
  if (!m) return "";
  const len = parseInt(m[1], 10);
  const start = m.index + m[0].length;
  let text = raw.slice(start, start + len);
  text = text
    .replace(/=\r?\n/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.slice(0, 500);
}

function imapConnect(acct) {
  return new Promise((resolve, reject) => {
    const host = acct.imap_server || "imap.zoho.com";
    const isGmail = host.includes("gmail");
    const tlsOpts = { host, port: 993, servername: host };
    if (isGmail) tlsOpts.rejectUnauthorized = false; // required for Gmail IMAP
    const socket = tls.connect(tlsOpts, () => {});
    socket.setTimeout(30000);
    let settled = false;
    socket.once("secureConnect", () => {});
    socket.once("data", () => { if (!settled) { settled = true; resolve(socket); } }); // greeting
    socket.on("timeout", () => { if (!settled) { settled = true; socket.destroy(); reject(new Error("timeout")); } });
    socket.on("error", (e) => { if (!settled) { settled = true; reject(e); } });
  });
}

function imapCommand(socket, tag, cmd, timeoutMs = 20000) {
  return new Promise((resolve, reject) => {
    let buffer = "";
    const timer = setTimeout(() => {
      socket.removeListener("data", onData);
      reject(new Error("imap_command_timeout"));
    }, timeoutMs);
    const onData = (data) => {
      buffer += data.toString("binary");
      if (new RegExp(`(^|\\r\\n)${tag} `).test(buffer)) {
        clearTimeout(timer);
        socket.removeListener("data", onData);
        resolve(buffer);
      }
    };
    socket.on("data", onData);
    socket.write(`${tag} ${cmd}\r\n`);
  });
}

async function checkIMAP(acct) {
  let socket;
  try {
    socket = await imapConnect(acct);
    let resp = await imapCommand(socket, "A1", `LOGIN ${JSON.stringify(acct.email)} ${JSON.stringify(acct.app_password)}`);
    if (!resp.includes("A1 OK")) { socket.destroy(); return { email: acct.email, error: "auth_fail", raw: resp.slice(0, 200) }; }

    const folder = acct.folder || "INBOX";
    resp = await imapCommand(socket, "A2", `SELECT ${JSON.stringify(folder)}`);
    if (!resp.includes("A2 OK")) { socket.destroy(); return { email: acct.email, error: "select_fail", raw: resp.slice(0, 200) }; }

    resp = await imapCommand(socket, "A3", `SEARCH SINCE ${IMAP_SINCE}`);
    const searchLine = resp.split("\n").find(l => l.startsWith("* SEARCH"));
    const ids = searchLine ? searchLine.replace("* SEARCH", "").trim().split(/\s+/).filter(Boolean) : [];
    if (ids.length === 0) {
      socket.write("A9 LOGOUT\r\n"); socket.destroy();
      return { email: acct.email, count: 0, subjects: [] };
    }

    const recentIds = ids.slice(-80);
    const range = recentIds.join(",");
    resp = await imapCommand(socket, "A4", `FETCH ${range} (BODY.PEEK[HEADER.FIELDS (Subject Date From)])`);
    const headerMap = {};
    const parts = resp.split(/\* (\d+) FETCH/).slice(1);
    for (let i = 0; i < parts.length; i += 2) {
      const id = parts[i];
      const blk = parts[i + 1] || "";
      const subM = blk.match(/^Subject:\s*(.+)$/im);
      if (!subM) continue;
      const dateM = blk.match(/^Date:\s*(.+)$/im);
      const fromM = blk.match(/^From:\s*(.+)$/im);
      headerMap[id] = {
        subject: decodeMime(subM[1].trim()),
        from: decodeMime(fromM ? fromM[1].trim() : ""),
        date: dateM ? dateM[1].trim() : "",
      };
    }

    const subjects = [];
    for (const id of recentIds) {
      const h = headerMap[id];
      if (!h) continue;
      let emailDate = null;
      try { emailDate = new Date(h.date); } catch (_) {}
      if (emailDate && emailDate < WINDOW_START) continue;
      let snippet = "";
      try {
        const bodyResp = await imapCommand(socket, "A5", `FETCH ${id} (BODY.PEEK[TEXT]<0.700>)`);
        snippet = extractSnippet(bodyResp);
      } catch (_) { /* skip snippet on failure, keep subject */ }
      subjects.push({ subject: h.subject, from: h.from, date: h.date, snippet });
    }
    socket.write("A9 LOGOUT\r\n"); socket.destroy();
    return { email: acct.email, count: subjects.length, subjects };
  } catch (e) {
    if (socket) try { socket.destroy(); } catch (_) {}
    return { email: acct.email, error: e.message };
  }
}

async function checkGmailAPI(acct) {
  try {
    const keyPath = path.join(__dirname, "../config/.gmail-service-account.json");
    if (!fs.existsSync(keyPath)) return { email: acct.email, error: "no_gmail_sa_key" };
    const key = JSON.parse(fs.readFileSync(keyPath, "utf8"));
    const auth = new google.auth.JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
      subject: acct.email,
    });
    const gmail = google.gmail({ version: "v1", auth });
    const afterTs = Math.floor(WINDOW_START.getTime() / 1000);
    const listRes = await gmail.users.messages.list({ userId: "me", q: `after:${afterTs}`, maxResults: 50 });
    const messages = listRes.data.messages || [];
    if (messages.length === 0) return { email: acct.email, count: 0, subjects: [] };
    const batch = messages.slice(0, 30);
    const details = await Promise.all(
      batch.map(m => gmail.users.messages.get({ userId: "me", id: m.id, format: "metadata", metadataHeaders: ["Subject", "From", "Date"] }).catch(() => null))
    );
    const subjects = [];
    for (const msg of details) {
      if (!msg) continue;
      const hdr = msg.data.payload?.headers || [];
      const get = n => hdr.find(h => h.name === n)?.value || "";
      subjects.push({
        subject: get("Subject"),
        from: get("From"),
        date: get("Date"),
        snippet: (msg.data.snippet || "").trim(), // Gmail API returns this regardless of format
      });
    }
    return { email: acct.email, count: messages.length, subjects };
  } catch (err) {
    return { email: acct.email, error: err.message, errStack: (err.response && JSON.stringify(err.response.data)) || null };
  }
}

(async () => {
  const [imapResults, apiResults] = await Promise.all([
    Promise.all(accounts.map(checkIMAP)),
    Promise.all(gmailApiAccounts.map(checkGmailAPI)),
  ]);
  console.error(`[email-scan] window: ${WINDOW_START.toISOString()} -> now (IMAP SINCE ${IMAP_SINCE})`);
  console.error(`[email-scan] NOTE: no keyword-based "alerts" field anymore — read each subject+snippet below and classify yourself.`);
  console.log(JSON.stringify([...imapResults, ...apiResults], null, 2));
})();
