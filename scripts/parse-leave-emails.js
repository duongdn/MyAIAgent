#!/usr/bin/env node
/**
 * parse-leave-emails.js
 * Scans duongdn@ inbox for "nghỉ phép" leave request emails,
 * detects approvals, and updates config/leave-plan.json.
 *
 * Run daily as part of email check. Consult leave-plan.json BEFORE
 * checking task logs so approved-leave days show as "off (planned)".
 *
 * Usage:
 *   node scripts/parse-leave-emails.js            # update leave-plan + print summary
 *   node scripts/parse-leave-emails.js --check TuanNT 2026-06-12   # is dev off on date?
 *   node scripts/parse-leave-emails.js --list     # print all upcoming/recent leaves
 */

const Imap = require("imap");
const { simpleParser } = require("mailparser");
const fs = require("fs");
const path = require("path");

const EMAIL_CFG_PATH = path.join(__dirname, "..", "config", ".email-accounts.json");
const LEAVE_PLAN_PATH = path.join(__dirname, "..", "config", "leave-plan.json");

// Monitored PHP team ONLY — ignore all other senders
const MONITORED_DEVS = new Set(["LongVV", "PhucVT", "TuanNT", "KhanhHH", "LeNH", "VietPH"]);

// Map email prefix → monitoring dev ID (monitored team only)
const EMAIL_TO_DEV_ID = {
  longvv:  "LongVV",
  phucvt:  "PhucVT",
  tuannt:  "TuanNT",
  khanhhh: "KhanhHH",
  lenh:    "LeNH",
  vietph:  "VietPH",
};

// Approval senders (managers/HR who approve leave)
// Also includes duongdn himself — approvals often sent from his own Sent folder
const APPROVAL_SENDERS = ["binhnt@", "duongdn@", "namtv@", "hr@", "admin@"];
// Keywords that indicate approval in reply body
const APPROVAL_KEYWORDS = ["ok em", "ok nhé", "ok nha", "được rồi", "đồng ý", "approved",
                            "chấp nhận", "cho phép", "ok.", "ok!", "oke", "được"];
// Leave request keywords for subject/body matching
const LEAVE_SUBJECTS = ["nghỉ phép", "nghi phep", "xin nghỉ", "xin nghi", "đơn nghỉ",
                         "don nghi", "leave request", "nghỉ có phép"];

// Parse DD/MM/YYYY or DD/MM/YY dates from text
function parseDates(text) {
  const dates = [];
  // Match DD/MM/YYYY or DD/MM/YY
  const re = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    let [, d, mo, y] = m;
    if (y.length === 2) y = "20" + y;
    const dt = new Date(`${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`);
    if (!isNaN(dt.getTime())) {
      dates.push(dt.toISOString().slice(0, 10));
    }
  }
  // Deduplicate
  return [...new Set(dates)];
}

// Expand date range [start, end] to all working days
function expandDateRange(start, end) {
  const dates = [];
  const s = new Date(start), e = new Date(end);
  for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) { // skip weekends
      dates.push(d.toISOString().slice(0, 10));
    }
  }
  return dates;
}

// Parse leave dates from email body — handles single day, range, half day
function parseLeaveInfo(subject, body) {
  const combined = (subject + " " + body).toLowerCase();

  // Detect half day
  const isHalf = /nửa ngày|nua ngay|buổi sáng|buoi sang|buổi chiều|buoi chieu|half day/i.test(combined);

  // Find all date mentions
  const allDates = parseDates(subject + " " + body);

  // Check for range pattern: "từ ngày ... đến ngày ..."
  const rangeMatch = body.match(
    /(?:từ ngày|tu ngay|from)\s+(\d{1,2}\/\d{1,2}\/\d{2,4})\s*(?:đến ngày|den ngay|to)\s+(\d{1,2}\/\d{1,2}\/\d{2,4})/i
  );
  let dates = [];
  if (rangeMatch) {
    const [startDates, endDates] = [parseDates(rangeMatch[1]), parseDates(rangeMatch[2])];
    if (startDates.length && endDates.length) {
      dates = expandDateRange(startDates[0], endDates[0]);
    }
  } else if (allDates.length === 1) {
    dates = [allDates[0]];
  } else if (allDates.length > 1) {
    // Multiple individual dates — use all
    dates = allDates;
  }

  return { dates, type: isHalf ? "half" : "full" };
}

// Derive devId from email address
function devIdFromEmail(emailAddr) {
  const prefix = (emailAddr.split("@")[0] || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return EMAIL_TO_DEV_ID[prefix] || prefix.charAt(0).toUpperCase() + prefix.slice(1);
}

// Check if a reply body contains approval
function isApprovalReply(body) {
  const lower = body.toLowerCase();
  return APPROVAL_KEYWORDS.some(kw => lower.includes(kw));
}

// Load leave plan
function loadLeavePlan() {
  if (!fs.existsSync(LEAVE_PLAN_PATH)) {
    return { description: "Approved leave dates.", last_updated: "", leaves: [] };
  }
  return JSON.parse(fs.readFileSync(LEAVE_PLAN_PATH, "utf8"));
}

// Save leave plan
function saveLeavePlan(plan) {
  plan.last_updated = new Date().toLocaleString("sv", { timeZone: "Asia/Saigon" }).replace(" ", "T") + "+07:00";
  fs.writeFileSync(LEAVE_PLAN_PATH, JSON.stringify(plan, null, 2));
}

// --check MODE: is dev off on a specific date?
function checkMode(devId, dateStr) {
  const plan = loadLeavePlan();
  const match = plan.leaves.find(
    l => l.dev_id === devId &&
         l.status === "approved" &&
         l.dates.includes(dateStr)
  );
  if (match) {
    console.log(`LEAVE: ${devId} is off on ${dateStr} (${match.type} day). Reason: ${match.reason || "—"}`);
    process.exit(0);
  } else {
    console.log(`WORKING: ${devId} has no approved leave on ${dateStr}`);
    process.exit(1);
  }
}

// --list MODE: print all leaves within ±30 days
function listMode() {
  const plan = loadLeavePlan();
  const now = new Date();
  const window30 = new Date(now); window30.setDate(window30.getDate() + 30);
  const past7 = new Date(now); past7.setDate(past7.getDate() - 7);

  const recent = plan.leaves.filter(l =>
    l.dates.some(d => new Date(d) >= past7 && new Date(d) <= window30)
  );
  if (!recent.length) { console.log("No leaves in ±7/+30 day window."); return; }

  console.log(`\n=== Leave Plan (±7d past, +30d future) ===`);
  for (const l of recent.sort((a, b) => (a.dates[0] || "") < (b.dates[0] || "") ? -1 : 1)) {
    const status = l.status === "approved" ? "✓" : "⏳";
    console.log(`${status} ${l.dev_id.padEnd(10)} ${l.dates.join(", ")} [${l.type}] ${l.reason || ""}`);
  }
}

function searchBox(imap, box, sinceStr, searchTerms) {
  return new Promise((resolve, reject) => {
    imap.openBox(box, true, (err) => {
      if (err) return resolve([]); // skip missing box silently

      const allUids = new Set();
      let pending = searchTerms.length;

      searchTerms.forEach(term => {
        imap.search([["SINCE", sinceStr], ["SUBJECT", term]], (err, uids) => {
          if (!err && uids) uids.forEach(uid => allUids.add(uid));
          if (--pending === 0) {
            const uidList = [...allUids];
            if (!uidList.length) return resolve([]);

            const emails = [];
            const fetch = imap.fetch(uidList, { bodies: "" });
            fetch.on("message", (msg) => {
              const chunks = [];
              msg.on("body", (stream) => {
                stream.on("data", d => chunks.push(d));
                stream.on("end", () => {
                  simpleParser(Buffer.concat(chunks))
                    .then(parsed => emails.push({ ...parsed, _box: box }))
                    .catch(() => {});
                });
              });
            });
            fetch.once("error", reject);
            fetch.once("end", () => resolve(emails));
          }
        });
      });
    });
  });
}

async function fetchEmails(account) {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: account.email,
      password: account.app_password,
      host: account.imap_server || "imap.zoho.com",
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 15000,
    });

    imap.once("ready", async () => {
      const since = new Date();
      since.setDate(since.getDate() - 90);
      const sinceStr = since.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-");

      // ASCII-safe search terms
      const leaveTerms = ["nghi", "phep", "leave"];
      // Also search by monitored dev sender names in INBOX
      const senderTerms = ["longvv", "phucvt", "tuannt", "khanhhh", "lenh", "vietph"];

      try {
        // INBOX: leave-related subjects + monitored dev senders
        const inboxBySubject = await searchBox(imap, "INBOX", sinceStr, leaveTerms);
        const inboxBySender = await Promise.all(
          senderTerms.map(s => new Promise((res) => {
            imap.openBox("INBOX", true, () => {
              imap.search([["SINCE", sinceStr], ["FROM", s]], (err, uids) => {
                if (err || !uids || !uids.length) return res([]);
                const emails = [];
                const fetch = imap.fetch(uids, { bodies: "" });
                fetch.on("message", (msg) => {
                  const chunks = [];
                  msg.on("body", (stream) => {
                    stream.on("data", d => chunks.push(d));
                    stream.on("end", () => {
                      simpleParser(Buffer.concat(chunks))
                        .then(p => emails.push({ ...p, _box: "INBOX" }))
                        .catch(() => {});
                    });
                  });
                });
                fetch.once("end", () => res(emails));
                fetch.once("error", () => res([]));
              });
            });
          }))
        );

        // Sent folder: duongdn's own approval replies (Re: + leave keywords)
        const sentApprovals = await searchBox(imap, "Sent Messages", sinceStr, ["nghi", "phep", "Re"]);

        const all = [
          ...inboxBySubject,
          ...inboxBySender.flat(),
          ...sentApprovals,
        ];

        // Deduplicate by message-id
        const seen = new Set();
        const unique = all.filter(em => {
          const key = em.messageId || JSON.stringify(em.subject) + em.date;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        imap.end();
        resolve(unique);
      } catch (e) {
        imap.end();
        reject(e);
      }
    });

    imap.once("end", () => {});
    imap.once("error", reject);
    imap.connect();
  });
}

async function main() {
  const args = process.argv.slice(2);

  // --check devId date
  if (args[0] === "--check") {
    return checkMode(args[1], args[2]);
  }
  // --list
  if (args[0] === "--list") {
    return listMode();
  }

  // Load credentials
  const emailCfg = JSON.parse(fs.readFileSync(EMAIL_CFG_PATH, "utf8"));
  const accounts = emailCfg.accounts || [];
  const duongdn = accounts.find(a => (a.email || "").includes("duongdn@nustechnology"));
  if (!duongdn) {
    console.error("duongdn@ account not found in config/.email-accounts.json");
    process.exit(1);
  }

  process.stderr.write("Fetching leave emails from duongdn@...\n");
  const emails = await fetchEmails(duongdn);
  process.stderr.write(`  ${emails.length} candidate emails fetched\n`);

  // Separate request emails and reply emails
  const requests = [];
  const replies = [];

  for (const em of emails) {
    const subject = em.subject || "";
    const fromAddr = (em.from?.value?.[0]?.address || "").toLowerCase();
    const body = em.text || em.html?.replace(/<[^>]+>/g, " ") || "";

    const subjectLower = subject.toLowerCase();
    const isLeave = LEAVE_SUBJECTS.some(kw => subjectLower.includes(kw)) ||
                    LEAVE_SUBJECTS.some(kw => body.toLowerCase().includes(kw));
    if (!isLeave) continue;

    const isReply = subject.startsWith("Re:") || subject.startsWith("RE:");

    const toAddr = (em.to?.value?.[0]?.address || "").toLowerCase();
    if (isReply) {
      replies.push({ subject, fromAddr, toAddr, body, date: em.date, _box: em._box });
    } else {
      requests.push({ subject, fromAddr, toAddr, body, date: em.date, _box: em._box });
    }
  }

  process.stderr.write(`  ${requests.length} request emails, ${replies.length} reply emails\n`);

  // Load current plan
  const plan = loadLeavePlan();
  const existingIds = new Set(plan.leaves.map(l => l.id));

  let added = 0;
  let updated = 0;
  const summary = [];

  for (const req of requests) {
    const devId = devIdFromEmail(req.fromAddr);
    if (!MONITORED_DEVS.has(devId)) {
      process.stderr.write(`  SKIP (not monitored): ${req.fromAddr}\n`);
      continue;
    }
    const { dates, type } = parseLeaveInfo(req.subject, req.body);
    if (!dates.length) {
      process.stderr.write(`  SKIP (no dates): ${req.subject}\n`);
      continue;
    }

    // Check for matching approval reply (INBOX replies + duongdn Sent approvals)
    const baseSubject = req.subject.replace(/^(Re:|RE:)\s*/i, "").trim().toLowerCase();
    const approvalReply = replies.find(r => {
      const replyBase = r.subject.replace(/^(Re:|RE:)\s*/i, "").trim().toLowerCase();
      const senderIsManager = APPROVAL_SENDERS.some(s => r.fromAddr.includes(s));
      // Sent-folder match: to field contains dev email, subject matches
      const isSentApproval = r._box === "Sent Messages" &&
        (r.toAddr || "").includes(req.fromAddr.split("@")[0]) &&
        replyBase.includes(baseSubject.slice(0, 15));
      return (replyBase.includes(baseSubject.slice(0, 20)) && senderIsManager && isApprovalReply(r.body)) ||
             (isSentApproval && isApprovalReply(r.body));
    });

    const status = approvalReply ? "approved" : "pending";
    const leaveId = `${devId.toLowerCase()}-${dates[0]}`;

    const existing = plan.leaves.find(l => l.id === leaveId);
    if (existing) {
      // Update status if now approved
      if (existing.status !== "approved" && status === "approved") {
        existing.status = "approved";
        existing.approved_by = approvalReply.fromAddr;
        existing.approved_at = approvalReply.date?.toISOString() || "";
        updated++;
        summary.push(`  UPDATED approved: ${devId} off ${dates.join(", ")} [${type}]`);
      }
    } else {
      // Extract reason from body
      const reasonMatch = req.body.match(/(?:lý do|ly do|reason)[:\s]+([^\n.]{5,80})/i);
      const reason = reasonMatch ? reasonMatch[1].trim() : "";

      plan.leaves.push({
        id: leaveId,
        dev_id: devId,
        dev_email: req.fromAddr,
        dates,
        type,
        reason,
        status,
        requested_at: req.date?.toISOString() || "",
        approved_by: approvalReply?.fromAddr || null,
        approved_at: approvalReply?.date?.toISOString() || null,
        email_subject: req.subject,
      });
      added++;
      summary.push(`  ${status === "approved" ? "✓ APPROVED" : "⏳ PENDING"}: ${devId} off ${dates.join(", ")} [${type}] ${reason}`);
    }
  }

  saveLeavePlan(plan);

  // Print summary for daily report
  console.log(`\n## Leave Plan — updated ${new Date().toLocaleString("sv", { timeZone: "Asia/Saigon" }).slice(0, 16)} (+07:00)`);
  console.log(`Scanned ${requests.length} request emails. Added: ${added}, Updated: ${updated}.`);
  if (summary.length) {
    summary.forEach(s => console.log(s));
  }

  // Print all currently-active and upcoming leaves
  const now = new Date();
  const todayStr = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Saigon" })).toISOString().slice(0, 10);
  const upcoming = plan.leaves
    .filter(l => l.status === "approved" && l.dates.some(d => d >= todayStr))
    .sort((a, b) => (a.dates[0] || "") < (b.dates[0] || "") ? -1 : 1);

  if (upcoming.length) {
    console.log(`\nUpcoming approved leaves:`);
    for (const l of upcoming) {
      console.log(`  ${l.dev_id.padEnd(10)} ${l.dates.join(", ")} [${l.type}] ${l.reason || ""}`);
    }
  } else {
    console.log(`\nNo upcoming approved leaves on record.`);
  }
}

main().catch(e => {
  console.error("ERROR:", e.message);
  process.exit(1);
});
