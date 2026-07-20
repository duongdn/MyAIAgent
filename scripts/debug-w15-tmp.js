const { google } = require("googleapis");
async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json", scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"] });
  const client = await auth.getClient();
  const api = google.sheets({ version: "v4", auth: client });
  // list sheet tabs
  const meta = await api.spreadsheets.get({ spreadsheetId: "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I" });
  console.log(meta.data.sheets.map(s=>s.properties.title).join(', '));
  const res = await api.spreadsheets.values.get({ spreadsheetId: "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", range: "W15!A1:H40" });
  console.log(JSON.stringify(res.data.values, null, 2));
}
main().catch(e=>console.error(e.message));
