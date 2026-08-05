#!/usr/bin/env node
/**
 * FireAnt BCTC fallback source — for tickers where cafef.vn data is incomplete
 * (e.g. BVH). Uses the public anonymous JWT embedded in fireant.vn's web bundle
 * (refreshed automatically when it rotates). Returns a cafef-compatible `cf`
 * object so finance-quantification-build.js's buildAll/writeSheet run unchanged.
 *
 * Usage:
 *   const fa = require("./finance-fireant");
 *   const cf = await fa.fetchFireAntBCTC("BVH", 15, 8);   // maxYears, maxQuarters
 */
const https = require("https");
const path = require("path");
const fs = require("fs");

const API = "https://api.fireant.vn";
const TOKEN_CACHE = path.join(__dirname, "..", "config", ".fireant-token.json");

// ── HTTP ─────────────────────────────────────────────────────────────────────
function httpGetText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let b = "";
      res.on("data", (c) => (b += c));
      res.on("end", () => resolve(b));
    }).on("error", reject);
  });
}
function httpGetJson(url, token) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) } }, (res) => {
      let b = "";
      res.on("data", (c) => (b += c));
      res.on("end", () => { try { resolve(JSON.parse(b)); } catch (e) { reject(new Error("Parse failed")); } });
    }).on("error", reject);
  });
}

// ── Token ────────────────────────────────────────────────────────────────────
async function extractTokenFromBundle() {
  const home = await httpGetText("https://fireant.vn/");
  const m = home.match(/_next\/static\/chunks\/pages\/_app-[a-f0-9]+\.js/);
  if (!m) throw new Error("FIREANT: cannot locate app bundle");
  const bundle = await httpGetText(`https://fireant.vn/${m[0]}`);
  const t = bundle.match(/ANONYMOUS_ACCESS_TOKEN="([^"]+)"/);
  if (!t) throw new Error("FIREANT: anonymous token not found in bundle");
  return t[1];
}

async function getToken() {
  try {
    if (fs.existsSync(TOKEN_CACHE)) {
      const c = JSON.parse(fs.readFileSync(TOKEN_CACHE, "utf8"));
      if (c.token && Date.now() - c.at < 6 * 3600 * 1000) return c.token;
    }
  } catch (_) {}
  const token = await extractTokenFromBundle();
  try {
    fs.mkdirSync(path.dirname(TOKEN_CACHE), { recursive: true });
    fs.writeFileSync(TOKEN_CACHE, JSON.stringify({ token, at: Date.now() }));
  } catch (_) {}
  return token;
}

// ── VAS mapping ──────────────────────────────────────────────────────────────
// Each row: { code: <unique synthetic>, field: <FireAnt financialValues key>, name: <VN label> }.
// Display order mirrors the cafef VAS template. Boundary rows (section subtotals)
// start with A.-D. / "TỔNG CỘNG" so buildAll does not absorb them into a group.
const TN = [
  { code: "tn0", field: "CurrentAsset", name: "A. TÀI SẢN NGẮN HẠN" },
  { code: "tn1", field: "CashAndCashEquivalent", name: "I. Tiền và các khoản tương đương tiền" },
  { code: "tn2", field: "Cash", name: "1. Tiền" },
  { code: "tn3", field: "CashEquivalent", name: "2. Các khoản tương đương tiền" },
  { code: "tn4", field: "ShortTermFinancialInvestment", name: "II. Đầu tư tài chính ngắn hạn" },
  { code: "tn5", field: "ShortTermSecuritiesInvestment", name: "1. Chứng khoán kinh doanh" },
  { code: "tn6", field: "OtherShortTermInvestment", name: "2. Đầu tư nắm giữ đến ngày đáo hạn" },
  { code: "tn7", field: "ProvisionForShortTermInvestment", name: "3. Dự phòng đầu tư ngắn hạn" },
  { code: "tn8", field: "ShortTermReceivable", name: "III. Các khoản phải thu ngắn hạn" },
  { code: "tn9", field: "ShortTermAccountsReceivable", name: "1. Phải thu ngắn hạn của khách hàng" },
  { code: "tn10", field: "PrepaymentsToSeller", name: "2. Trả trước cho người bán" },
  { code: "tn11", field: "OtherShortTermReceivable", name: "3. Phải thu ngắn hạn khác" },
  { code: "tn12", field: "ProvisionForDoubtfulShortTermReceivable", name: "4. Dự phòng phải thu ngắn hạn khó đòi" },
  { code: "tn13", field: "TotalInventory", name: "IV. Hàng tồn kho" },
  { code: "tn14", field: "Inventory", name: "1. Hàng tồn kho" },
  { code: "tn15", field: "ProvisionForDevaluationOfInventory", name: "2. Dự phòng giảm giá hàng tồn kho" },
  { code: "tn16", field: "TotalOtherCurrentAsset", name: "V. Tài sản ngắn hạn khác" },
  { code: "tn17", field: "ShortermPrepaidExpense", name: "1. Chi phí trả trước ngắn hạn" },
  { code: "tn18", field: "DeductibleVATInOtherCurrentAsset", name: "2. Thuế GTGT được khấu trừ" },
  { code: "tn19", field: "TaxAndGovernmentReceivable", name: "3. Thuế và các khoản khác phải thu Nhà nước" },
  { code: "tn20", field: "OtherCurrentAsset", name: "4. Tài sản ngắn hạn khác" },
  { code: "tn21", field: "CurrentAsset", name: "TỔNG CỘNG TÀI SẢN NGẮN HẠN" },
  { code: "tn22", field: "FixedAssetAndLongTermInvestment", name: "B. TÀI SẢN DÀI HẠN" },
  { code: "tn23", field: "LongTermReceivable", name: "I. Các khoản phải thu dài hạn" },
  { code: "tn24", field: "LongTermAccountsReceivable", name: "1. Phải thu dài hạn của khách hàng" },
  { code: "tn25", field: "OtherLongTermReceivable", name: "2. Phải thu dài hạn khác" },
  { code: "tn26", field: "ProvisionForDoubtfulLongTermReceivable", name: "3. Dự phòng phải thu dài hạn khó đòi" },
  { code: "tn27", field: "FixedAsset", name: "II. Tài sản cố định" },
  { code: "tn28", field: "TangibleFixedAsset", name: "1. TSCĐ hữu hình" },
  { code: "tn29", field: "OriginalCostOfTangibleFixedAsset", name: "- Nguyên giá" },
  { code: "tn30", field: "AccumulatedDepreciationOfTangibleFixedAsset", name: "- Giá trị hao mòn lũy kế (*)" },
  { code: "tn31", field: "FinancialLeasesFixedAsset", name: "2. TSCĐ thuê tài chính" },
  { code: "tn32", field: "IntangibleFixedAsset", name: "3. TSCĐ vô hình" },
  { code: "tn33", field: "OriginalCostOfIntangibleFixedAsset", name: "- Nguyên giá" },
  { code: "tn34", field: "AccumulatedDepreciationOfIntangibleFixedAsset", name: "- Giá trị hao mòn lũy kế (*)" },
  { code: "tn35", field: "InvestmentRealEstate", name: "III. Bất động sản đầu tư" },
  { code: "tn36", field: "ConstructionInProgressExpense", name: "IV. Tài sản dở dang dài hạn" },
  { code: "tn37", field: "LongTermFinancialInvestment", name: "V. Đầu tư tài chính dài hạn" },
  { code: "tn38", field: "SubsidiaryCompanyInvestment", name: "1. Đầu tư vào công ty con" },
  { code: "tn39", field: "JointVentureAndAssociateCompanyInvestment", name: "2. Đầu tư vào công ty liên doanh, liên kết" },
  { code: "tn40", field: "OtherLongTermInvestment", name: "3. Đầu tư góp vốn vào đơn vị khác" },
  { code: "tn41", field: "ProvisionForImpairmentOfLongTermFinancialInvestment", name: "4. Dự phòng tổn thất đầu tư dài hạn" },
  { code: "tn42", field: "LongTermPrepaidExpense", name: "VI. Chi phí trả trước dài hạn" },
  { code: "tn43", field: "DeferredIncomeTaxAsset", name: "VII. Tài sản thuế thu nhập hoãn lại" },
  { code: "tn44", field: "TotalAsset", name: "TỔNG CỘNG TÀI SẢN" },
];

const NV = [
  { code: "nv0", field: "TotalDebt", name: "C. NỢ PHẢI TRẢ" },
  { code: "nv1", field: "ShortTermBorrowingAndDebt", name: "I. Vay và nợ thuê tài chính ngắn hạn" },
  { code: "nv2", field: "AccountPayable", name: "1. Phải trả người bán ngắn hạn" },
  { code: "nv3", field: "AdvancePaymentFromCustomer", name: "2. Người mua trả tiền trước ngắn hạn" },
  { code: "nv4", field: "TaxAndStateObligation", name: "3. Thuế và các khoản phải nộp Nhà nước" },
  { code: "nv5", field: "PayableToEmployee", name: "4. Phải trả người lao động" },
  { code: "nv6", field: "InternalPayable", name: "5. Phải trả nội bộ ngắn hạn" },
  { code: "nv7", field: "OtherShortTermPayableAndObligation", name: "6. Phải trả ngắn hạn khác" },
  { code: "nv8", field: "LongTermBorrowingAndDebt", name: "II. Vay và nợ thuê tài chính dài hạn" },
  { code: "nv9", field: "BondIssuance", name: "1. Trái phiếu phát hành" },
  { code: "nv10", field: "OtherLongTermPayable", name: "2. Phải trả dài hạn khác" },
  { code: "nv11", field: "TotalStockHolderEquity", name: "D VỐN CHỦ SỞ HỮU" },
  { code: "nv12", field: "PaidInCapital", name: "I. Vốn góp của chủ sở hữu" },
  { code: "nv13", field: "CapitalSurplus", name: "1. Thặng dư vốn cổ phần" },
  { code: "nv14", field: "OtherStockHolderEquity", name: "2. Vốn khác của chủ sở hữu" },
  { code: "nv15", field: "DevelopmentInvestmentFund", name: "3. Quỹ đầu tư phát triển" },
  { code: "nv16", field: "FinancialReserveFund", name: "4. Quỹ dự phòng tài chính" },
  { code: "nv17", field: "UndistributedAfterTaxProfit", name: "5. Lợi nhuận sau thuế chưa phân phối" },
  { code: "nv18", field: "MinorityInterest", name: "6. Lợi ích cổ đông không kiểm soát" },
  { code: "nv19", field: "TotalCapital", name: "TỔNG CỘNG NGUỒN VỐN" },
];

const KQKD = [
  { code: "k1", field: "NetSale", name: "1. Doanh thu thuần về bán hàng và cung cấp dịch vụ" },
  { code: "k2", field: "CostOfGoodSold", name: "2. Giá vốn hàng bán" },
  { code: "k3", field: "GrossProfit", name: "3. Lợi nhuận gộp về bán hàng và cung cấp dịch vụ" },
  { code: "k4", field: "IncomeFromFinancialActivities", name: "4. Doanh thu hoạt động tài chính" },
  { code: "k5", field: "ExpenseFromFinancialActivities", name: "5. Chi phí tài chính" },
  { code: "k6", field: "SellingExpense", name: "6. Chi phí bán hàng" },
  { code: "k7", field: "AdministrationExpense", name: "7. Chi phí quản lý doanh nghiệp" },
  { code: "k8", field: "NetProfitFromOperatingActivity", name: "8. Lợi nhuận thuần từ hoạt động kinh doanh" },
  { code: "k9", field: "OtherOperatingIncome", name: "9. Thu nhập khác" },
  { code: "k10", field: "OtherOperatingExpense", name: "10. Chi phí khác" },
  { code: "k11", field: "OtherOperatingProfit", name: "11. Lợi nhuận khác" },
  { code: "k12", field: "ProfitBeforeTax", name: "12. Tổng lợi nhuận kế toán trước thuế" },
  { code: "k13", field: "CorporateIncomeTax", name: "13. Chi phí thuế TNDN" },
  { code: "k14", field: "ProfitAfterTax", name: "14. Lợi nhuận sau thuế thu nhập doanh nghiệp" },
  { code: "k15", field: "ParentCompanyShareholderProfitAfterTax", name: "15. Lợi nhuận sau thuế của cổ đông Công ty mẹ" },
  { code: "k16", field: "BasicEPS", name: "16. Lãi cơ bản trên cổ phiếu (Đồng/1 cổ phiếu)" },
];

const LCTT_ROWS = [
  { code: "cf1", field: "CashflowFromOperatingActivity", name: "Lưu chuyển tiền thuần từ hoạt động kinh doanh" },
  { code: "cf2", field: "CashflowFromInvestingActivity", name: "Lưu chuyển tiền thuần từ hoạt động đầu tư" },
  { code: "cf3", field: "CashflowFromFinancingActivity", name: "Lưu chuyển tiền thuần từ hoạt động tài chính" },
  { code: "cf4", field: "CashAndCashEquivalentAtTheBeginningOfPeriod", name: "Tiền và tương đương tiền đầu kỳ" },
  { code: "cf5", field: "CashAndCashEquivalentAtTheEndOfPeriod", name: "Tiền và tương đương tiền cuối kỳ" },
];

const periodData = (template, fv) => template.map((r) => ({ code: r.code, value: fv[r.field] ?? null }));

// ── Fetch ────────────────────────────────────────────────────────────────────
async function fetchFireAntBCTC(ticker, maxYears = 15, maxQuarters = 8) {
  const token = await getToken();
  const data = await httpGetJson(`${API}/symbols/${ticker}/financial-data?type=balanceSheet&count=60`, token);
  if (!Array.isArray(data) || data.length === 0) throw new Error(`FIREANT_NO_DATA: ${ticker}`);
  const tpl = data[0].financialValues; // structure check only

  const ann = data.filter((p) => p.quarter === 0).sort((a, b) => a.year - b.year).slice(-maxYears);
  const qtr = data.filter((p) => p.quarter > 0).sort((a, b) => a.year - b.year || a.quarter - b.quarter).slice(-maxQuarters);

  const mkPeriod = (p) => ({ year: p.year, quater: p.quarter, data: periodData(TN, p.financialValues) });
  const mkPeriodLctt = (p) => ({ year: p.year, quater: p.quarter, data: periodData(LCTT_ROWS, p.financialValues) });

  const tnYAnnual = ann.map((p) => ({ year: p.year, quater: 0, data: periodData(TN, p.financialValues) }));
  const nvYAnnual = ann.map((p) => ({ year: p.year, quater: 0, data: periodData(NV, p.financialValues) }));

  return {
    source: "fireant",
    tnT: TN, nvT: NV, kqkdT: KQKD,
    tnYAnnual, nvYAnnual,
    tnY: [...tnYAnnual, ...qtr.map(mkPeriod)],
    nvY: [...nvYAnnual, ...qtr.map((p) => ({ year: p.year, quater: p.quarter, data: periodData(NV, p.financialValues) }))],
    kqkdY: [...ann.map((p) => ({ year: p.year, quater: 0, data: periodData(KQKD, p.financialValues) })), ...qtr.map((p) => ({ year: p.year, quater: p.quarter, data: periodData(KQKD, p.financialValues) }))],
    lcttG: [{ code: "LCTT", name: "Lưu chuyển tiền tệ", template: LCTT_ROWS, years: [...ann.map(mkPeriodLctt), ...qtr.map(mkPeriodLctt)] }],
  };
}

module.exports = { fetchFireAntBCTC, getToken };
