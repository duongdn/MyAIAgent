#!/usr/bin/env node
const https = require("https");
function httpGet(url) {
  return new Promise((r, x) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let b = ""; res.on("data", (c) => (b += c));
      res.on("end", () => { try { r(JSON.parse(b)); } catch (e) { x(new Error("Parse: " + b.slice(0,200))); } });
    }).on("error", x);
  });
}
const BASE = "https://apiweb.cafef.vn/api";
async function main() {
  const cdktQ = await httpGet(`${BASE}/v2/BCTC/GetReportCDKT?symbol=VNM&pageIndex=1&pageSize=8&reportType=ALL&TypeTime=QUY`);
  const tn = cdktQ.value.data.find(d => d.code === "TN");
  const nv = cdktQ.value.data.find(d => d.code === "NV");
  const tnT = cdktQ.value.templace.find(t => t.code === "TN").data;
  const nvT = cdktQ.value.templace.find(t => t.code === "NV").data;
  const i270 = tnT.findIndex(r => (r.code||"").trim()==="270");
  const i440 = nvT.findIndex(r => (r.code||"").trim()==="440");
  console.log("Quarterly TN(270):");
  for (const y of tn.data) console.log(y.year, "Q"+y.quater, y.type, y.data[i270]?.value);
  console.log("Quarterly NV(440):");
  for (const y of nv.data) console.log(y.year, "Q"+y.quater, y.type, y.data[i440]?.value);
}
main().catch(e => console.error("ERR", e.message));
