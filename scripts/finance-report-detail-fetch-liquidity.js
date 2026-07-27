#!/usr/bin/env node
/**
 * Fetch real daily trading history (volume + value) for a ticker from vietstock.vn's
 * public JSON endpoint and compute average liquidity over 1 ngày / 7 ngày / 1 tháng / 6 tháng
 * trading windows (5 / 21 / 126 trading-day approximations for 7d/1m/6m calendar windows).
 *
 * Source: https://finance.vietstock.vn/data/getpricehistory (undocumented, POST form-encoded,
 * returns TotalVol/TotalVal/ClosePrice per trading day, most-recent-first).
 *
 * Usage: node finance-report-detail-fetch-liquidity.js <TICKER>
 */
const https = require("https");
const querystring = require("querystring");

const ticker = process.argv[2];
if (!ticker) {
  console.error("Usage: node finance-report-detail-fetch-liquidity.js <TICKER>");
  process.exit(1);
}

function fetchHistory(code, pageSize) {
  const body = querystring.stringify({
    Code: code,
    OrderBy: "",
    OrderDirection: "desc",
    PageIndex: 1,
    PageSize: pageSize,
    FromDate: "",
    ToDate: "",
    ExportType: "default",
    Cols: "TKLGD,TGTGD,VHTT",
    ExchangeID: 1,
  });
  return new Promise((resolve, reject) => {
    const req = https.request(
      "https://finance.vietstock.vn/data/getpricehistory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Parse fail: ${e.message} — body: ${data.slice(0, 300)}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function parseDate(s) {
  const m = s.match(/\/Date\((\d+)\)\//);
  return new Date(parseInt(m[1], 10));
}

function avg(arr, field) {
  return arr.reduce((a, r) => a + r[field], 0) / arr.length;
}

async function main() {
  const rows = await fetchHistory(ticker, 200);
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error(`No data returned for ${ticker} — check symbol or endpoint`);
  }
  const parsed = rows.map((r) => ({
    date: parseDate(r.TradingDate).toISOString().slice(0, 10),
    vol: r.TotalVol,
    val: r.TotalVal,
    close: r.ClosePrice,
  }));

  const windows = { "1_ngay": 1, "7_ngay": 5, "1_thang": 21, "6_thang": 126 };
  const result = { ticker, latestDate: parsed[0].date, dataPointsAvailable: parsed.length, windows: {} };
  for (const [label, n] of Object.entries(windows)) {
    const slice = parsed.slice(0, Math.min(n, parsed.length));
    result.windows[label] = {
      tradingDaysUsed: slice.length,
      avgVolume: Math.round(avg(slice, "vol")),
      avgValueVND: Math.round(avg(slice, "val")),
      oldestDateInWindow: slice[slice.length - 1].date,
    };
  }
  console.log(JSON.stringify(result, null, 2));
}

main().catch((e) => {
  console.error("ERROR:", e.message);
  process.exit(1);
});
