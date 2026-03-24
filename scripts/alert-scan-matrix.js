const fs = require("fs");
const https = require("https");
const config = JSON.parse(fs.readFileSync("config/.matrix-config.json", "utf8"));
const roomId = config.rooms[0].room_id;
const token = config.access_token;
const cutoff = new Date("2026-03-24T10:30:00+07:00").getTime();
const encodedRoom = encodeURIComponent(roomId);
const filterStr = encodeURIComponent(JSON.stringify({types:["m.room.message"]}));
const url = config.homeserver + "/_matrix/client/v3/rooms/" + encodedRoom + "/messages?dir=b&limit=20&filter=" + filterStr;

const req = https.get(url, {headers: {"Authorization": "Bearer " + token}}, (res) => {
  let data = "";
  res.on("data", c => data += c);
  res.on("end", () => {
    if (res.statusCode !== 200) { console.log("Matrix HTTP " + res.statusCode + ": " + data.slice(0,200)); return; }
    try {
      const j = JSON.parse(data);
      const msgs = (j.chunk || []).filter(e => e.origin_server_ts >= cutoff);
      console.log("Matrix Fountain: " + msgs.length + " msgs since cutoff");
      msgs.forEach(m => {
        const body = (m.content && m.content.body || "").slice(0,120);
        const sender = m.sender || "";
        const ts = new Date(m.origin_server_ts).toISOString();
        console.log("  [" + ts + "] " + sender + ": " + body);
      });
    } catch(e) { console.log("Parse error: " + e.message); }
  });
});
req.on("error", e => console.log("Matrix error: " + e.message));
req.setTimeout(10000);
