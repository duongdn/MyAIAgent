const { google } = require("googleapis");
async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json", scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"] });
  const client = await auth.getClient();
  const api = google.sheets({ version: "v4", auth: client });
  const sheetId = process.argv[2];
  const res = await api.spreadsheets.values.get({ spreadsheetId: sheetId, range: "Summary!A5:AZ7" });
  console.log(JSON.stringify(res.data.values, null, 2));
}
main().catch(e=>console.error('ERR', e.message));
