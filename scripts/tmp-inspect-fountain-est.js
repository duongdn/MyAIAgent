const { google } = require("googleapis");
async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "config/daily-agent-490610-7eb7985b33e3.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o" });
  console.log("SHEETS:", meta.data.sheets.map(s=>s.properties.title).join(" | "));
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o", range: "Est vs Charged!A1:M15" });
  (res.data.values||[]).forEach((r,i)=>console.log(i, JSON.stringify(r)));
  console.log("--- Summary tab first 10 rows ---");
  const res2 = await sheets.spreadsheets.values.get({ spreadsheetId: "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o", range: "Summary!A1:AM10" });
  (res2.data.values||[]).forEach((r,i)=>console.log(i, JSON.stringify(r)));
}
main().catch(e=>console.error(e.message));
