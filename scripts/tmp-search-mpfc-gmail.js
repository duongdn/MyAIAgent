const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const key = JSON.parse(fs.readFileSync(path.join(__dirname, "../config/.gmail-service-account.json"), "utf8"));
const auth = new google.auth.JWT({
  email: key.client_email,
  key: key.private_key,
  scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
  subject: "freelancer@mypersonalfootballcoach.com",
});
const gmail = google.gmail({ version: "v1", auth });

(async () => {
  const q = 'newer_than:14d (subject:"coach pass" OR "coach pass" OR "not charged" OR "charged" OR "credit card")';
  const listRes = await gmail.users.messages.list({ userId: "me", q, maxResults: 20 });
  const messages = listRes.data.messages || [];
  console.log("matches:", messages.length);
  for (const m of messages) {
    const msg = await gmail.users.messages.get({ userId: "me", id: m.id, format: "metadata", metadataHeaders: ["Subject", "From", "To", "Date"] });
    const hdr = msg.data.payload.headers;
    const get = n => hdr.find(h => h.name === n)?.value || "";
    console.log("---");
    console.log("Date:", get("Date"));
    console.log("From:", get("From"));
    console.log("To:", get("To"));
    console.log("Subject:", get("Subject"));
    console.log("Snippet:", msg.data.snippet);
  }
})().catch(e => console.error("ERROR", e.message));
