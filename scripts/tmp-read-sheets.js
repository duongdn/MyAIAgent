const { google } = require("googleapis");

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const id = "1uiahfXv8pIjgXYtddgNXcwHQF8BHmLQfcj3knXwIQZo";
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: id, range: "VEA!A1:T90" });
  const rows = res.data.values || [];
  rows.forEach((r, i) => console.log(`row ${i+1}:`, JSON.stringify(r)));
}
main().catch(e => { console.error(e.message); process.exit(1); });
