const { google } = require("googleapis");
const key = require("../config/.gmail-service-account.json");
(async () => {
  const auth = new google.auth.JWT({ email: key.client_email, key: key.private_key, scopes: ["https://www.googleapis.com/auth/gmail.readonly"], subject: "freelancer@mypersonalfootballcoach.com" });
  const g = google.gmail({ version: "v1", auth });
  const r = await g.users.messages.list({ userId: "me", q: "newer_than:3d", maxResults: 50 });
  const ms = r.data.messages || [];
  console.log("count", ms.length);
  for (const m of ms.slice(0, 40)) {
    const d = await g.users.messages.get({ userId: "me", id: m.id, format: "metadata", metadataHeaders: ["Subject", "From", "Date"] });
    const h = n => (d.data.payload.headers.find(x => x.name == n) || {}).value;
    console.log(h("Date"), "|", h("From"), "|", h("Subject"));
  }
})().catch(e => console.log("ERR", e.message));
