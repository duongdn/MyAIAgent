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

function extractText(payload) {
  if (payload.body && payload.body.data) {
    return Buffer.from(payload.body.data, "base64").toString("utf8");
  }
  if (payload.parts) {
    for (const p of payload.parts) {
      if (p.mimeType === "text/plain") {
        const t = extractText(p);
        if (t) return t;
      }
    }
    for (const p of payload.parts) {
      const t = extractText(p);
      if (t) return t;
    }
  }
  return "";
}

(async () => {
  const q = 'newer_than:14d (subject:"Coach Pass" OR "coach pass" OR "video library" OR "lost access" OR "cannot access" OR "unable to access")';
  const listRes = await gmail.users.messages.list({ userId: "me", q, maxResults: 10 });
  const messages = listRes.data.messages || [];
  console.log("matches:", messages.length);
  for (const m of messages) {
    const msg = await gmail.users.messages.get({ userId: "me", id: m.id, format: "full" });
    const hdr = msg.data.payload.headers;
    const get = n => hdr.find(h => h.name === n)?.value || "";
    console.log("=====================================");
    console.log("Date:", get("Date"));
    console.log("From:", get("From"));
    console.log("To:", get("To"));
    console.log("Subject:", get("Subject"));
    console.log("--- BODY ---");
    console.log(extractText(msg.data.payload));
  }
})().catch(e => console.error("ERROR", e.message));
