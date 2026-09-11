#!/usr/bin/env node
/**
 * Daily cafef data-shape audit for all tickers on the finance-quantification sheet.
 * Fetches CDKT+KQKD from cafef (read-only, no Google Sheets writes) and runs the
 * same self-checks the build script runs inline (numbering-gap + contra-sign),
 * so a new cafef code-shift/mislabel (see docs/memory/finance-report/
 * feedback_cafef_systemic_code_shift_audit.md) surfaces from a daily cron instead
 * of waiting for a user to spot wrong numbers in a sheet.
 *
 * Usage: node scripts/finance-quantification-audit-cron.js
 * Exit code 0 always (this is a report, not a gate); findings go to stdout.
 */
const path = require("path");
const fs = require("fs");
const { google } = require("googleapis");
const {
  fetchCafef, applyChainShift, KQKD_CHAIN, CDKT_TN_RECEIVABLE_LT_CHAIN,
  auditTemplateNumbering, auditContraSign,
} = require("./finance-quantification-build.js");

const CONFIG_PATH = path.join(__dirname, "..", "config", "finance-quantification.json");
const KEY_PATH = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));

async function listTickers() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"] });
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.get({ spreadsheetId: config.shared_spreadsheet_id });
  return res.data.sheets.map((s) => s.properties.title).filter((t) => /^[A-Z0-9]{3,10}$/.test(t) && t !== "Info");
}

// Known, investigated, confirmed-NOT-a-bug false positives — permanent template
// quirks of specialized sectors (banks/insurers), not a cafef data-shape change.
// See feedback_cafef_systemic_code_shift_audit.md "residual noise" section. Match
// on the stable substrings (code + expected-item text) so a genuinely NEW warning
// on the SAME ticker (different code/text) still gets through.
const KNOWN_FALSE_POSITIVES = [
  /numbering gap near code 171 — expected item 3, got "1\. Chứng khoán đầu tư sẵn sàng để bán"/,
  /numbering gap near code 253 — expected item 2, got "3\. Tài sản thuế thu nhập doanh nghiệp hoãn lại"/,
  /numbering gap near code 808 — expected item 3, got "4\. Cam kết trong nghiệp vụ L\/C"/,
  /"1\. Dự phòng phí nhượng tái bảo hiểm" \(code 191\) is positive/, // BVH: reinsurer-recoverable, genuine asset
  /"2\. Dự phòng bồi thường nhượng tái bảo hiểm" \(code 192\) is positive/,
];
function isKnownFalsePositive(line) {
  return KNOWN_FALSE_POSITIVES.some((re) => re.test(line));
}

async function auditTicker(ticker) {
  const lines = [];
  const capture = (chunk) => { if (chunk.startsWith("WARN: [audit]")) lines.push(chunk.trimEnd()); };
  const origWrite = process.stdout.write.bind(process.stdout);
  process.stdout.write = (chunk, ...args) => { capture(String(chunk)); return true; }; // swallow, don't spam cron log per-ticker
  try {
    const cf = await fetchCafef(ticker, config.max_years || 15, config.max_quarters || 8);
    applyChainShift(cf.kqkdY, KQKD_CHAIN, (v) => v === 0, "up");
    applyChainShift(cf.tnY, CDKT_TN_RECEIVABLE_LT_CHAIN, (v) => v > 0, "down");
    auditTemplateNumbering(cf.tnT, "CDKT Tài sản");
    auditTemplateNumbering(cf.nvT, "CDKT Nguồn vốn");
    auditContraSign(cf.tnT, cf.tnY, "CDKT Tài sản");
  } catch (e) {
    lines.push(`WARN: [audit] fetch/audit failed — ${e.message}`);
  } finally {
    process.stdout.write = origWrite;
  }
  return lines.filter((l) => !isKnownFalsePositive(l));
}

async function main() {
  const tickers = await listTickers();
  const findings = {};
  for (const t of tickers) {
    const lines = await auditTicker(t);
    if (lines.length) findings[t] = lines;
    await new Promise((r) => setTimeout(r, 300)); // gentle on cafef's API
  }

  const total = Object.values(findings).reduce((n, l) => n + l.length, 0);
  console.log(`Finance-quantification audit: ${tickers.length} mã, ${total} WARN (sau khi lọc false-positive đã biết) across ${Object.keys(findings).length} mã.`);
  for (const [t, lines] of Object.entries(findings)) {
    console.log(`\n=== ${t} ===`);
    for (const l of lines) console.log(l);
  }
  if (total === 0) {
    console.log("Không phát hiện bất thường.");
    process.exit(0);
  }
  // Non-zero exit signals the cron wrapper to invoke the AI fixer.
  process.exit(2);
}

main().catch((e) => {
  console.error(`ERROR: ${e.message}`);
  process.exit(1);
});
