#!/usr/bin/env node
/**
 * Manage the temporary candidate watch list used by /me:finance-report Piece 4.
 *
 * Each candidate lives `ttl_days` (default 7) from its `added` date. Expiry never
 * deletes anything — the report surfaces expired candidates so the decision to
 * keep watching or drop them stays explicit and human-made.
 *
 * Usage:
 *   node finance-candidates.js list
 *   node finance-candidates.js add <TICKER> "<Tên công ty>" [--group=Nhựa] [--exchange=HOSE]
 *   node finance-candidates.js renew <TICKER> [--note="lý do theo dõi tiếp"]
 *   node finance-candidates.js drop <TICKER> [--note="lý do bỏ"]
 *   node finance-candidates.js note <TICKER> "<ghi chú>"
 */
const fs = require("fs");
const path = require("path");

const CONFIG_PATH = path.join(__dirname, "..", "config", "finance-watchlist.json");

function loadConfig() {
  const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  if (!cfg.candidates) cfg.candidates = { ttl_days: 7, items: [] };
  if (!cfg.candidates.items) cfg.candidates.items = [];
  return cfg;
}

function saveConfig(cfg) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2) + "\n", "utf8");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(isoDate, days) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Days remaining before the candidate needs a keep-or-drop decision. */
function daysLeft(expires) {
  const ms = new Date(`${expires}T00:00:00Z`) - new Date(`${today()}T00:00:00Z`);
  return Math.round(ms / 86400000);
}

function flag(args, name) {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : null;
}

function findItem(cfg, ticker) {
  return cfg.candidates.items.find((i) => i.ticker.toUpperCase() === ticker.toUpperCase());
}

function cmdList(cfg) {
  const ttl = cfg.candidates.ttl_days || 7;
  const rows = cfg.candidates.items.map((i) => {
    const expires = addDays(i.added, ttl);
    const left = daysLeft(expires);
    const state = i.status === "dropped" ? "dropped" : left <= 0 ? "EXPIRED" : `${left}d left`;
    return `${i.ticker.padEnd(5)} ${String(i.group || "-").padEnd(8)} ${i.added} -> ${expires}  ${state.padEnd(10)} ${i.note || ""}`;
  });
  console.log(`TTL: ${ttl} ngày | ${cfg.candidates.items.length} candidate(s)\n`);
  console.log(rows.join("\n") || "(trống)");
}

function cmdAdd(cfg, args) {
  const ticker = (args[1] || "").toUpperCase();
  const name = args[2];
  if (!ticker || !name || name.startsWith("--")) {
    console.error('Usage: add <TICKER> "<Tên công ty>" [--group=Nhựa] [--exchange=HOSE]');
    process.exit(1);
  }
  if (findItem(cfg, ticker)) {
    console.error(`${ticker} đã có trong candidates — dùng 'renew' để gia hạn.`);
    process.exit(1);
  }
  cfg.candidates.items.push({
    ticker,
    name,
    group: flag(args, "group") || "",
    exchange: flag(args, "exchange") || "",
    added: today(),
    status: "watching",
    note: flag(args, "note") || "",
  });
  saveConfig(cfg);
  console.log(`Đã thêm ${ticker} — hết hạn ${addDays(today(), cfg.candidates.ttl_days || 7)}`);
}

function cmdRenew(cfg, args) {
  const item = findItem(cfg, args[1] || "");
  if (!item) {
    console.error(`Không tìm thấy ${args[1]} trong candidates.`);
    process.exit(1);
  }
  item.added = today();
  item.status = "watching";
  const note = flag(args, "note");
  if (note) item.note = note;
  saveConfig(cfg);
  console.log(`Gia hạn ${item.ticker} — hết hạn ${addDays(today(), cfg.candidates.ttl_days || 7)}`);
}

function cmdDrop(cfg, args) {
  const ticker = (args[1] || "").toUpperCase();
  const item = findItem(cfg, ticker);
  if (!item) {
    console.error(`Không tìm thấy ${ticker} trong candidates.`);
    process.exit(1);
  }
  cfg.candidates.items = cfg.candidates.items.filter((i) => i !== item);
  saveConfig(cfg);
  const note = flag(args, "note");
  console.log(`Đã bỏ ${ticker} khỏi candidates${note ? ` (${note})` : ""}`);
}

function cmdNote(cfg, args) {
  const item = findItem(cfg, args[1] || "");
  if (!item || !args[2]) {
    console.error('Usage: note <TICKER> "<ghi chú>"');
    process.exit(1);
  }
  item.note = args[2];
  saveConfig(cfg);
  console.log(`Đã ghi chú cho ${item.ticker}: ${item.note}`);
}

function main() {
  const args = process.argv.slice(2);
  const cfg = loadConfig();
  const cmd = args[0] || "list";
  const handlers = { list: () => cmdList(cfg), add: cmdAdd, renew: cmdRenew, drop: cmdDrop, note: cmdNote };
  const fn = handlers[cmd];
  if (!fn) {
    console.error(`Lệnh không hợp lệ: ${cmd} (list|add|renew|drop|note)`);
    process.exit(1);
  }
  cmd === "list" ? fn() : fn(cfg, args);
}

main();
