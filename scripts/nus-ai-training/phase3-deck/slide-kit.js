// Slide kit cho deck Giai đoạn 3 — style theo deck Session 1 (ChienTX):
// kicker nhỏ + tiêu đề là 1 câu khẳng định + ví dụ cụ thể (số thật) + footer có số trang.
// Mọi hàm chỉ đẩy request vào `reqs`; build-phase3-agent-deck.js gửi lên Google Slides.
const C = {
  NAVY: { red: 0.12, green: 0.22, blue: 0.40 }, LIGHT: { red: 0.85, green: 0.9, blue: 0.97 },
  ORANGE: { red: 0.92, green: 0.55, blue: 0.15 }, GREEN: { red: 0.88, green: 0.95, blue: 0.82 },
  YELLOW: { red: 0.99, green: 0.92, blue: 0.7 }, BG: { red: 0.97, green: 0.98, blue: 1 },
  WHITE: { red: 1, green: 1, blue: 1 }, GREY: { red: 0.4, green: 0.4, blue: 0.45 },
  MUTED: { red: 0.9, green: 0.9, blue: 0.92 }, CODE: { red: 0.1, green: 0.14, blue: 0.22 },
};
const PT = (v) => ({ magnitude: v, unit: 'PT' });
const reqs = []; const slides = [];
let n = 0;
const RUN = Date.now().toString(36).slice(-5); // ID mới mỗi lần chạy → rebuild không trùng objectId
const id = (p) => `${p}${RUN}_${String(++n).padStart(4, '0')}`;
const DARK = new Set([C.NAVY, C.ORANGE, C.CODE]);

function box(slide, x, y, w, h, text, o = {}) {
  text = text || ' '; // API không style được shape rỗng
  const oid = id('bx');
  const fill = o.fill || C.LIGHT;
  reqs.push({ createShape: { objectId: oid, shapeType: o.shape || 'ROUND_RECTANGLE', elementProperties: {
    pageObjectId: slide, size: { width: PT(w), height: PT(h) },
    transform: { scaleX: 1, scaleY: 1, translateX: x, translateY: y, unit: 'PT' } } } });
  reqs.push({ updateShapeProperties: { objectId: oid, fields: 'shapeBackgroundFill.solidFill.color,outline,contentAlignment',
    shapeProperties: { shapeBackgroundFill: { solidFill: { color: { rgbColor: fill } } },
      outline: o.noLine ? { propertyState: 'NOT_RENDERED' } : { outlineFill: { solidFill: { color: { rgbColor: o.line || C.NAVY } } }, weight: PT(1) },
      contentAlignment: o.valign || 'MIDDLE' } } });
  if (o.transparent) reqs.push({ updateShapeProperties: { objectId: oid, fields: 'shapeBackgroundFill.propertyState',
    shapeProperties: { shapeBackgroundFill: { propertyState: 'NOT_RENDERED' } } } });
  reqs.push({ insertText: { objectId: oid, text } });
  reqs.push({ updateTextStyle: { objectId: oid, fields: 'fontSize,bold,foregroundColor,fontFamily', textRange: { type: 'ALL' },
    style: { fontSize: PT(o.size || 14), bold: o.bold !== false, fontFamily: o.font || 'Arial',
      foregroundColor: { opaqueColor: { rgbColor: o.color || (DARK.has(fill) && !o.transparent ? C.WHITE : C.NAVY) } } } } });
  const nl = text.indexOf('\n'); // dòng 2+ nhỏ hơn, không đậm
  if (o.sub && nl > 0) reqs.push({ updateTextStyle: { objectId: oid, fields: 'fontSize,bold',
    textRange: { type: 'FIXED_RANGE', startIndex: nl + 1, endIndex: text.length }, style: { fontSize: PT(o.sub), bold: false } } });
  reqs.push({ updateParagraphStyle: { objectId: oid, fields: 'alignment', textRange: { type: 'ALL' }, style: { alignment: o.align || 'CENTER' } } });
  return oid;
}
const label = (s, x, y, w, h, t, o = {}) => box(s, x, y, w, h, t, { transparent: true, noLine: true, ...o });

// Khối code / log thật: nền tối, chữ mono, căn trái
const code = (s, x, y, w, h, t, size = 10) =>
  box(s, x, y, w, h, t, { fill: C.CODE, font: 'Roboto Mono', size, bold: false, align: 'START', valign: 'TOP', noLine: true });

function arrow(slide, ax, ay, bx, by, color = C.NAVY) {
  const oid = id('ar'); const dx = bx - ax; const dy = by - ay;
  reqs.push({ createLine: { objectId: oid, lineCategory: 'STRAIGHT', elementProperties: { pageObjectId: slide,
    size: { width: PT(Math.max(Math.abs(dx), 0.01)), height: PT(Math.max(Math.abs(dy), 0.01)) },
    transform: { scaleX: dx >= 0 ? 1 : -1, scaleY: dy >= 0 ? 1 : -1, translateX: ax, translateY: ay, unit: 'PT' } } } });
  reqs.push({ updateLineProperties: { objectId: oid, fields: 'endArrow,weight,lineFill', lineProperties: {
    endArrow: 'FILL_ARROW', weight: PT(2), lineFill: { solidFill: { color: { rgbColor: color } } } } } });
}
// Cặp mũi tên 2 chiều: request (navy, đi) phía trên, response (cam, về) phía dưới
function twoWay(s, ax, bx, y) {
  arrow(s, ax, y - 5, bx, y - 5, C.NAVY);
  arrow(s, bx, y + 5, ax, y + 5, C.ORANGE);
}

// Bảng từ các ô chữ nhật: rows[0] là header (navy). widths tính bằng pt.
function table(s, x, y, widths, rows, o = {}) {
  const h = o.rowH || 30;
  rows.forEach((row, r) => {
    let cx = x;
    row.forEach((cell, c) => {
      const head = r === 0 && o.header !== false;
      const fill = head ? C.NAVY : (o.fills && o.fills[r - 1]) || (c === 0 ? C.LIGHT : C.WHITE);
      box(s, cx, y + r * (h + 3), widths[c] - 3, h, cell, { fill, shape: 'RECTANGLE', size: head ? 11 : o.size || 10.5,
        bold: head || c === 0, align: c === 0 || head ? 'CENTER' : 'START', line: C.MUTED });
      cx += widths[c];
    });
  });
}

let page = 0; let footerText = 'NUS AI Training · Giai đoạn 3';
const setFooter = (t) => { footerText = t; };

// Slide nội dung: kicker (CHỮ HOA, cam) + tiêu đề 1 câu khẳng định + footer
function newSlide(kicker, title, notes) {
  const sid = id('p3'); page += 1; slides.push({ sid, notes });
  reqs.push({ createSlide: { objectId: sid, slideLayoutReference: { predefinedLayout: 'BLANK' } } });
  reqs.push({ updatePageProperties: { objectId: sid, fields: 'pageBackgroundFill.solidFill.color',
    pageProperties: { pageBackgroundFill: { solidFill: { color: { rgbColor: C.BG } } } } } });
  if (kicker) label(sid, 30, 10, 660, 18, kicker.toUpperCase(), { size: 9, align: 'START', color: C.ORANGE });
  if (title) label(sid, 30, 26, 660, 46, title, { size: title.length > 62 ? 15 : title.length > 50 ? 17 : 22, align: 'START', valign: 'TOP' }); // luôn 1 dòng
  label(sid, 30, 382, 560, 18, footerText, { size: 8, bold: false, align: 'START', color: C.GREY });
  label(sid, 620, 382, 70, 18, String(page).padStart(2, '0'), { size: 8, bold: false, align: 'END', color: C.GREY });
  return sid;
}

// Slide câu hỏi (nhịp QUESTION → Answer như deck Session 1)
function question(q, sub, notes) {
  const s = newSlide('Câu hỏi', null, notes);
  label(s, 60, 90, 600, 120, q, { size: 28, align: 'START' });
  label(s, 60, 215, 600, 60, sub, { size: 16, bold: false, align: 'START', color: C.GREY });
  box(s, 600, 270, 70, 70, '?', { fill: C.ORANGE, shape: 'ELLIPSE', size: 36, noLine: true });
  return s;
}

// Mở đầu mỗi session: số buổi + câu hỏi trọng tâm + thanh tiến độ S5–S9
function sessionHeader(num, topic, focusQ, notes) {
  if (num > 5) page = 0; // mỗi session = 1 ngày training → đánh số trang lại từ đầu (S5 tính cả 2 slide mở đầu GĐ3)
  setFooter(`NUS AI Training · Giai đoạn 3 · Session ${num} — ${topic}`);
  const s = newSlide(`Session ${num} · Giai đoạn 3`, null, notes);
  box(s, 40, 60, 640, 60, `Session ${num} — ${topic}`, { fill: C.NAVY, size: 22 });
  label(s, 40, 140, 640, 30, 'CÂU HỎI TRỌNG TÂM', { size: 10, color: C.ORANGE });
  label(s, 40, 165, 640, 70, focusQ, { size: 20, bold: false });
  [5, 6, 7, 8, 9].forEach((k, i) => box(s, 160 + i * 82, 270, 72, 30, `S${k}`,
    { fill: k === num ? C.ORANGE : k < num ? C.MUTED : C.LIGHT, size: 13 }));
  return s;
}

// Mỗi session là 1 ngày training riêng → session nào cũng có: nhắc lại buổi trước · agenda · ghi nhớ · thử thách
function recap(title, points, notes) {
  const s = newSlide('Nhắc lại buổi trước', title, notes);
  points.forEach((p, i) => {
    box(s, 40, 95 + i * 62, 44, 44, String(i + 1), { fill: C.NAVY, shape: 'ELLIPSE', size: 16, noLine: true });
    label(s, 100, 92 + i * 62, 580, 50, p, { size: 15, bold: false, align: 'START' });
  });
  return s;
}
function agenda(items, notes) {
  const s = newSlide('Agenda', 'Hôm nay', notes);
  items.forEach(([t, d], i) => {
    const x = 30 + i * (660 / items.length);
    const w = 660 / items.length - 12;
    box(s, x + w / 2 - 22, 95, 44, 44, String(i + 1), { fill: C.ORANGE, shape: 'ELLIPSE', size: 18, noLine: true });
    box(s, x, 150, w, 140, `${t}\n${d}`, { fill: i % 2 ? C.LIGHT : C.GREEN, size: 16, sub: 12 });
  });
  label(s, 30, 300, 660, 30, 'Q&A cuối buổi · bài tự thực hành sau buổi', { size: 12, bold: false, color: C.GREY });
  return s;
}
function takeaways(points, notes) {
  const s = newSlide('Ghi nhớ', 'Mang về sau buổi hôm nay', notes);
  points.forEach(([k, t], i) => {
    box(s, 30, 88 + i * 70, 150, 58, k, { fill: C.NAVY, size: 15 });
    box(s, 190, 88 + i * 70, 500, 58, t, { fill: C.WHITE, size: 14, bold: false, align: 'START' });
  });
  return s;
}

module.exports = { C, reqs, slides, box, label, code, arrow, twoWay, table, newSlide, question, sessionHeader, setFooter, recap, agenda, takeaways };
