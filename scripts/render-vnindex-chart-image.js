#!/usr/bin/env node
/**
 * Render a VN-Index daily close chart (last N days) to PNG for FB posts.
 * Data: VNDirect dchart API. Rendering: inline SVG screenshotted by puppeteer (no python deps).
 *
 * Usage: node scripts/render-vnindex-chart-image.js <out.png> [--days=90]
 */
const https = require('https');
const puppeteer = require('puppeteer-extra');
const fs = require('fs');

const out = process.argv[2];
const days = parseInt((process.argv.find(a => a.startsWith('--days=')) || '--days=90').split('=')[1], 10);
if (!out) { console.error('Usage: render-vnindex-chart-image.js <out.png> [--days=90]'); process.exit(2); }

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let body = '';
      res.on('data', d => { body += d; });
      res.on('end', () => { try { resolve(JSON.parse(body)); } catch (e) { reject(e); } });
    }).on('error', reject);
  });
}

function buildSvg(times, closes) {
  const W = 1200, H = 630, padL = 90, padR = 40, padT = 110, padB = 70;
  const min = Math.min(...closes), max = Math.max(...closes);
  const lo = min - (max - min) * 0.08, hi = max + (max - min) * 0.08;
  const x = i => padL + (i / (closes.length - 1)) * (W - padL - padR);
  const y = v => padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB);
  const pts = closes.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const last = closes[closes.length - 1], prev = closes[closes.length - 2], peak = Math.max(...closes);
  const color = last >= prev ? '#16a34a' : '#dc2626';
  const fmtDate = t => new Date(t * 1000).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' });
  const chg = ((last - prev) / prev * 100).toFixed(2);
  const fromPeak = ((last - peak) / peak * 100).toFixed(1);
  const grid = [0, 0.25, 0.5, 0.75, 1].map(f => {
    const v = lo + (hi - lo) * f;
    return `<line x1="${padL}" x2="${W - padR}" y1="${y(v)}" y2="${y(v)}" stroke="#e5e7eb"/>
      <text x="${padL - 12}" y="${y(v) + 6}" text-anchor="end" font-size="18" fill="#6b7280">${Math.round(v).toLocaleString('vi-VN')}</text>`;
  }).join('');
  const ticks = [0, Math.floor(closes.length / 2), closes.length - 1].map(i =>
    `<text x="${x(i)}" y="${H - 30}" text-anchor="middle" font-size="18" fill="#6b7280">${fmtDate(times[i])}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" font-family="Arial, sans-serif">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <text x="${padL}" y="55" font-size="34" font-weight="bold" fill="#111827">VN-Index ${days} ngày qua</text>
    <text x="${padL}" y="92" font-size="24" fill="${color}">${last.toLocaleString('vi-VN', { maximumFractionDigits: 2 })} điểm (${chg >= 0 ? '+' : ''}${chg}% phiên gần nhất) · cách đỉnh ${fromPeak}%</text>
    ${grid}${ticks}
    <polygon points="${x(0)},${H - padB} ${pts} ${x(closes.length - 1)},${H - padB}" fill="${color}" fill-opacity="0.08"/>
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="${x(closes.length - 1)}" cy="${y(last)}" r="8" fill="${color}"/>
  </svg>`;
}

(async () => {
  const to = Math.floor(Date.now() / 1000);
  const data = await fetchJson(`https://dchart-api.vndirect.com.vn/dchart/history?resolution=D&symbol=VNINDEX&from=${to - days * 86400}&to=${to}`);
  if (!data.c || data.c.length < 2) throw new Error('no VNINDEX data from VNDirect');
  const svg = buildSvg(data.t, data.c);
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync('/opt/google/chrome/chrome') ? '/opt/google/chrome/chrome' : '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
    await page.screenshot({ path: out });
  } finally {
    await browser.close();
  }
  console.log(JSON.stringify({ ok: true, out, last: data.c[data.c.length - 1] }));
})().catch(e => { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); });
