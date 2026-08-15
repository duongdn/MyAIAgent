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
  const cdktN = await httpGet(`${BASE}/v2/BCTC/GetReportCDKT?symbol=VNM&pageIndex=1&pageSize=15&reportType=ALL&TypeTime=NAM`);
  console.log("isSuccess:", cdktN.isSuccess);
  const tn = cdktN.value.data.find(d => d.code === "TN");
  console.log("TN years/types:", tn.data.map(y => ({year: y.year, type: y.type, quater: y.quater})));
  const nv = cdktN.value.data.find(d => d.code === "NV");
  console.log("NV years/types:", nv.data.map(y => ({year: y.year, type: y.type, quater: y.quater})));

  // find code 270 and 440 in template + values
  const tnT = cdktN.value.templace.find(t => t.code === "TN").data;
  const nvT = cdktN.value.templace.find(t => t.code === "NV").data;
  const i270 = tnT.findIndex(r => (r.code||"").trim()==="270");
  const i440 = nvT.findIndex(r => (r.code||"").trim()==="440");
  console.log("i270", i270, tnT[i270]);
  console.log("i440", i440, nvT[i440]);
  for (const y of tn.data) {
    const cell = y.data[i270];
    console.log("270 value year", y.year, y.type, cell);
  }
  for (const y of nv.data) {
    const cell = y.data[i440];
    console.log("440 value year", y.year, y.type, cell);
  }
}
main().catch(e => console.error("ERR", e.message));
