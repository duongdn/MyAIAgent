#!/usr/bin/env node
/**
 * Sheets W29 summary scan for 2026-06-08 Monday report.
 * Reads Summary tab to get W29 (Jun 1-7) totals for all developers.
 */
const { google } = require("googleapis");
const path = require("path");

const SVC = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");

// Developer sheets
const SHEETS = {
  "LongVV (Maddy)":   { id: "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", weeklyMin: 16, note: "part-time 16h/wk" },
  "TuanNT (JohnYi)":  { id: "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", weeklyMin: 40, note: "8h/day" },
  "TuanNT (Rebecca)": { id: "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", weeklyMin: 0, note: "check col P" },
  "PhucVT (JamesDiam)": { id: "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", weeklyMin: 40, note: "8h/day" },
  "LeNH (Rory)":      { id: "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", weeklyMin: 0, note: "part of LeNH" },
  "LeNH (Franc)":     { id: "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", weeklyMin: 0, note: "part of LeNH" },
  "KhanhHH (Aysar)":  { id: "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", weeklyMin: 0, note: "KhanhHH 2nd proj" },
  "KhanhHH (Generator)": { id: "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", weeklyMin: 40, note: "8h/day" },
  "VietPH (Bailey)":  { id: "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", weeklyMin: 40, note: "8h/day" },
};

const TARGET_WEEK = "W29";

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: SVC,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const results = [];

  for (const [devName, cfg] of Object.entries(SHEETS)) {
    try {
      const resp = await sheets.spreadsheets.values.get({
        spreadsheetId: cfg.id,
        range: "Summary!A:E",
      });
      const rows = resp.data.values || [];

      let weeklyTotal = null;
      for (const row of rows) {
        if (String(row[0] || "").trim() === TARGET_WEEK) {
          // Col D (index 3) = grand total per feedback_summary_sheet_no_double_count
          const val = row[3];
          weeklyTotal = val ? parseFloat(String(val).replace(",", ".")) || 0 : 0;
          break;
        }
      }

      const status = weeklyTotal === null ? "W29 not found" :
        (cfg.weeklyMin > 0 && weeklyTotal < cfg.weeklyMin) ? `⚠️ ${weeklyTotal}h < ${cfg.weeklyMin}h` :
        `✓ ${weeklyTotal}h`;

      results.push({ dev: devName, weekly: weeklyTotal, min: cfg.weeklyMin, status, note: cfg.note });
      console.error(`${devName}: ${status}`);
    } catch (e) {
      results.push({ dev: devName, weekly: null, status: `error: ${e.message}`, note: cfg.note });
      console.error(`${devName}: error: ${e.message}`);
    }
  }

  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
