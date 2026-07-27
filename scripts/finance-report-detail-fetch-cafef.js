#!/usr/bin/env node
/**
 * Fetch multi-year BCTC (CDKT/KQKD/LCTT) for a ticker directly from cafef.vn's
 * public JSON API — no browser automation needed. Only keeps "HK" (đã kiểm toán,
 * continuous annual) years; scattered old "H"-type years are dropped to avoid
 * gaps/quality issues.
 *
 * Usage: node finance-report-detail-fetch-cafef.js <TICKER> [--years=15]
 */
const https = require("https");

const ticker = process.argv[2];
if (!ticker) {
  console.error("Usage: node finance-report-detail-fetch-cafef.js <TICKER> [--years=15]");
  process.exit(1);
}
const yearsArg = process.argv.find((a) => a.startsWith("--years="));
const pageSize = yearsArg ? parseInt(yearsArg.split("=")[1], 10) : 15;

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error(`Parse fail for ${url}: ${e.message}`));
          }
        });
      })
      .on("error", reject);
  });
}

function keepAudited(yearEntries) {
  return yearEntries.filter((y) => y.type === "HK").sort((a, b) => a.year - b.year);
}

async function main() {
  const base = "https://apiweb.cafef.vn/api";
  const cdktUrl = `${base}/v2/BCTC/GetReportCDKT?symbol=${ticker}&pageIndex=1&pageSize=${pageSize}&reportType=ALL&TypeTime=NAM`;
  const kqkdUrl = `${base}/v1/BCTC/GetReportDetail?symbol=${ticker}&pageIndex=1&pageSize=${pageSize}&reportType=KQKD&TypeTime=NAM`;
  // NOTE: GetReportDetail?reportType=LCTT silently returns KQKD data (server-side quirk/bug,
  // verified 2026-07-27 on SAB) — cash flow MUST use GetReportLCTT (v2, nested groups like CDKT).
  const lcttUrl = `${base}/v2/BCTC/GetReportLCTT?symbol=${ticker}&pageIndex=1&pageSize=${pageSize}&reportType=ALL&TypeTime=NAM`;

  const [cdkt, kqkd, lctt] = await Promise.all([fetchJson(cdktUrl), fetchJson(kqkdUrl), fetchJson(lcttUrl)]);

  if (!cdkt.isSuccess || !kqkd.isSuccess || !lctt.isSuccess) {
    throw new Error("One or more cafef API calls failed: " + JSON.stringify({ cdkt: cdkt.isSuccess, kqkd: kqkd.isSuccess, lctt: lctt.isSuccess }));
  }

  const tn = cdkt.value.data.find((d) => d.code === "TN");
  const nv = cdkt.value.data.find((d) => d.code === "NV");
  const lcttGroups = lctt.value.data; // [{code:'HDKD',name,data:[years]}, {code:'HDDT',...}, {code:'HDTC',...}]

  const output = {
    ticker,
    fetchedAt: new Date().toISOString(),
    balanceSheet: {
      assetsLabels: tn.number ? undefined : undefined,
      assetsTemplate: cdkt.value.templace.find((t) => t.code === "TN").data,
      liabilitiesTemplate: cdkt.value.templace.find((t) => t.code === "NV").data,
      assetsYears: keepAudited(tn.data),
      liabilitiesYears: keepAudited(nv.data),
    },
    incomeStatement: {
      template: kqkd.value.templace,
      years: keepAudited(kqkd.value.data),
    },
    cashFlow: {
      groups: lcttGroups.map((g) => ({
        code: g.code,
        name: g.name,
        template: lctt.value.templace.find((t) => t.code === g.code).data,
        years: keepAudited(g.data),
      })),
    },
  };

  console.log(JSON.stringify(output, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
