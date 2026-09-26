#!/usr/bin/env node
const { google } = require("googleapis");
const path = require("path");
const SVC = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");

const SHEETS = {
  "Xtreme Soft (Maddy)": "1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58",
  "James Diamond": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
  "Paturevision": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
  "John Yi": "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
  "William Bills": "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",
  "Generator App": "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",
  "BXR App": "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
  "Radio Data Center": "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
  "Baamboozle": "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
  "Elena": "1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ",
  "Fountain": "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o",
};

const TARGET_MONDAY = "September 21, 2026";

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: SVC, scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"] });
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  for (const [name, id] of Object.entries(SHEETS)) {
    try {
      const res = await sheets.spreadsheets.values.get({ spreadsheetId: id, range: "Summary!A6:AZ60" });
      const rows = res.data.values || [];
      const hdrRes = await sheets.spreadsheets.values.get({ spreadsheetId: id, range: "Summary!A5:AZ5" });
      const hdr = (hdrRes.data.values || [[]])[0];

      const match = rows.find(r => (r[1] || "").trim() === TARGET_MONDAY);
      console.log(`\n=== ${name} (${id}) ===`);
      if (!match) {
        console.log("  NO MATCHING WEEK ROW for", TARGET_MONDAY);
        // print available B col values (dates) for debugging, last 5
        const dates = rows.map(r => r[1]).filter(Boolean).slice(-5);
        console.log("  last available week-starts:", dates.join(" | "));
        continue;
      }
      const wn = match[0];
      console.log(`  Week tab: ${wn}, row total (col D):`, match[3]);
      // employee cols start at index 8 (col I), repeating x4 (actual, self, charged, rate)
      for (let i = 8; i < hdr.length; i += 4) {
        const empName = (hdr[i] || "").trim();
        if (!empName) continue;
        const val = match[i];
        if (val === undefined || val === "" || val === "0.00" || val === "0") continue;
        console.log(`    ${empName}: ${val}`);
      }
    } catch (e) {
      console.log(`\n=== ${name} (${id}) ===`);
      console.log("  ERROR:", e.message.slice(0, 200));
    }
  }
}
main().catch(e => { console.error("FATAL", e); process.exit(1); });
