// Slide kit cho deck Giai đoạn 3 — design system theo deck Session 1 "AI, LLM — Fundamentals" (ChienTX):
// nền giấy ấm, slide tối cho mở đầu/câu hỏi/kết thúc, kicker mono xanh, tiêu đề đậm căn trái,
// card nền sáng viền mảnh, số 01/02 mono xanh, accent chỉ xanh + cam, footer "NUS Technology · …" + số trang mono.
// Mọi hàm chỉ đẩy request vào `reqs`; build-phase3-agent-deck.js gửi lên Google Slides.
const rgb = (h) => ({ red: parseInt(h.slice(0, 2), 16) / 255, green: parseInt(h.slice(2, 4), 16) / 255, blue: parseInt(h.slice(4, 6), 16) / 255 });
const C = {
  INK: rgb('141A2E'), PAPER: rgb('F5F4F0'), CARD: rgb('FBFAF7'), LINE: rgb('DEDBD3'), GREY: rgb('6B6F7A'),
  BLUE: rgb('2456C8'), ORANGE: rgb('F0A050'), WHITE: rgb('FFFFFF'), GHOST: rgb('2A3352'), DIM: rgb('A9B0C2'),
  // tên ngữ nghĩa dùng trong session-0X.js
  NAVY: rgb('141A2E'), LIGHT: rgb('E3E9F6'), GREEN: rgb('E6F0E1'), YELLOW: rgb('FBEAD3'), MUTED: rgb('E9E7E2'), CODE: rgb('141A2E'),
};
const SANS = 'IBM Plex Sans'; const MONO = 'IBM Plex Mono';
const PT = (v) => ({ magnitude: v, unit: 'PT' });
const reqs = []; const slides = [];
let n = 0;
const RUN = Date.now().toString(36).slice(-5); // ID mới mỗi lần chạy → rebuild không trùng objectId
const id = (p) => `${p}${RUN}_${String(++n).padStart(4, '0')}`;
const DARK = new Set([C.INK, C.NAVY, C.CODE, C.BLUE, C.GHOST]);

function box(slide, x, y, w, h, text, o = {}) {
  text = text || ' '; // API không style được shape rỗng
  const oid = id('bx');
  const fill = o.fill || C.CARD;
  const dark = DARK.has(fill) && !o.transparent;
  reqs.push({ createShape: { objectId: oid, shapeType: o.shape || 'ROUND_RECTANGLE', elementProperties: {
    pageObjectId: slide, size: { width: PT(w), height: PT(h) },
    transform: { scaleX: 1, scaleY: 1, translateX: x, translateY: y, unit: 'PT' } } } });
  reqs.push({ updateShapeProperties: { objectId: oid, fields: 'shapeBackgroundFill.solidFill.color,outline,contentAlignment',
    shapeProperties: { shapeBackgroundFill: { solidFill: { color: { rgbColor: fill } } },
      outline: o.noLine || (dark && !o.line) ? { propertyState: 'NOT_RENDERED' } : { outlineFill: { solidFill: { color: { rgbColor: o.line || C.LINE } } }, weight: PT(0.75) },
      contentAlignment: o.valign || 'MIDDLE' } } });
  if (o.transparent) reqs.push({ updateShapeProperties: { objectId: oid, fields: 'shapeBackgroundFill.propertyState',
    shapeProperties: { shapeBackgroundFill: { propertyState: 'NOT_RENDERED' } } } });
  reqs.push({ insertText: { objectId: oid, text } });
  reqs.push({ updateTextStyle: { objectId: oid, fields: 'fontSize,bold,foregroundColor,fontFamily', textRange: { type: 'ALL' },
    style: { fontSize: PT(o.size || 14), bold: o.bold !== false, fontFamily: o.font || SANS,
      foregroundColor: { opaqueColor: { rgbColor: o.color || (dark ? C.WHITE : C.INK) } } } } });
  const nl = text.indexOf('\n'); // dòng 2+: nhỏ hơn, không đậm, màu dịu (như "Artificial Intelligence  Machines doing…")
  if (o.sub && nl > 0) reqs.push({ updateTextStyle: { objectId: oid, fields: 'fontSize,bold,foregroundColor',
    textRange: { type: 'FIXED_RANGE', startIndex: nl + 1, endIndex: text.length },
    style: { fontSize: PT(o.sub), bold: false, foregroundColor: { opaqueColor: { rgbColor: o.subColor || (dark ? C.DIM : fill === C.ORANGE ? C.INK : C.GREY) } } } } });
  reqs.push({ updateParagraphStyle: { objectId: oid, fields: 'alignment,lineSpacing', textRange: { type: 'ALL' },
    style: { alignment: o.align || 'CENTER', lineSpacing: o.lineSpacing || 105 } } });
  return oid;
}
const label = (s, x, y, w, h, t, o = {}) => box(s, x, y, w, h, t, { transparent: true, noLine: true, ...o });
const mono = (s, x, y, w, h, t, o = {}) => label(s, x, y, w, h, t, { font: MONO, size: 9, color: C.BLUE, align: 'START', ...o });

// Khối code / log thật: nền tối, chữ mono, căn trái
const code = (s, x, y, w, h, t, size = 10) =>
  box(s, x, y, w, h, t, { fill: C.INK, font: MONO, size, bold: false, align: 'START', valign: 'TOP', lineSpacing: 115 });

function arrow(slide, ax, ay, bx, by, color = C.INK) {
  const oid = id('ar'); const dx = bx - ax; const dy = by - ay;
  reqs.push({ createLine: { objectId: oid, lineCategory: 'STRAIGHT', elementProperties: { pageObjectId: slide,
    size: { width: PT(Math.max(Math.abs(dx), 0.01)), height: PT(Math.max(Math.abs(dy), 0.01)) },
    transform: { scaleX: dx >= 0 ? 1 : -1, scaleY: dy >= 0 ? 1 : -1, translateX: ax, translateY: ay, unit: 'PT' } } } });
  reqs.push({ updateLineProperties: { objectId: oid, fields: 'endArrow,weight,lineFill', lineProperties: {
    endArrow: 'FILL_ARROW', weight: PT(2), lineFill: { solidFill: { color: { rgbColor: color } } } } } });
}
// Cặp mũi tên 2 chiều: request (đậm, đi) phía trên, response (cam, về) phía dưới
function twoWay(s, ax, bx, y) {
  arrow(s, ax, y - 5, bx, y - 5, C.INK);
  arrow(s, bx, y + 5, ax, y + 5, C.ORANGE);
}

// Bảng: header tối, ô nền card viền mảnh, cột đầu đậm. rows[0] = header.
function table(s, x, y, widths, rows, o = {}) {
  const h = o.rowH || 30;
  rows.forEach((row, r) => {
    let cx = x;
    row.forEach((cell, c) => {
      const head = r === 0 && o.header !== false;
      const fill = head ? C.INK : (o.fills && o.fills[r - 1]) || C.CARD;
      box(s, cx, y + r * (h + 3), widths[c] - 3, h, cell, { fill, shape: 'RECTANGLE', size: head ? 11 : o.size || 10.5,
        bold: head || c === 0, align: 'START' });
      cx += widths[c];
    });
  });
}

let page = 0; let footerText = 'NUS Technology · Giai đoạn 3 · Build AI Agent';
const PRESENTER = 'Dương Nguyễn';

function blank(notes, bg = C.PAPER) {
  const sid = id('p3'); page += 1; slides.push({ sid, notes });
  reqs.push({ createSlide: { objectId: sid, slideLayoutReference: { predefinedLayout: 'BLANK' } } });
  reqs.push({ updatePageProperties: { objectId: sid, fields: 'pageBackgroundFill.solidFill.color',
    pageProperties: { pageBackgroundFill: { solidFill: { color: { rgbColor: bg } } } } } });
  return sid;
}
function footer(s, dark) {
  if (!dark) label(s, 40, 378, 520, 16, footerText, { size: 7.5, bold: false, align: 'START', color: C.GREY });
  label(s, 600, 378, 80, 16, String(page).padStart(2, '0'), { size: 7.5, bold: false, align: 'END', color: dark ? C.DIM : C.GREY, font: MONO });
}

// Slide nội dung: kicker mono xanh + tiêu đề là 1 câu khẳng định (luôn 1 dòng) + footer
function newSlide(kicker, title, notes) {
  const s = blank(notes);
  if (kicker) mono(s, 40, 22, 640, 14, kicker.toUpperCase());
  if (title) label(s, 40, 36, 640, 40, title, { size: title.length > 64 ? 16 : title.length > 52 ? 19 : 24, align: 'START', valign: 'TOP' });
  footer(s);
  return s;
}

// Slide CÂU HỎI tối với dấu ? mờ lớn (như deck Session 1)
function question(q, sub, notes) {
  const s = blank(notes, C.INK);
  label(s, 560, 50, 140, 200, '?', { size: 150, color: C.GHOST });
  mono(s, 40, 130, 400, 16, 'CÂU HỎI', { color: C.ORANGE, size: 10 });
  label(s, 40, 150, 560, 90, q, { size: 26, color: C.WHITE, align: 'START', valign: 'TOP' });
  label(s, 40, 245, 560, 60, sub, { size: 15, bold: false, color: C.DIM, align: 'START', valign: 'TOP' });
  footer(s, true);
  return s;
}

// Trang mở đầu mỗi session (mỗi session = 1 ngày training): tối, tên buổi, câu hỏi trọng tâm, người trình bày, chip S5–S9
function sessionHeader(num, topic, focusQ, notes) {
  if (num > 5) page = 0; // đánh số trang lại cho từng ngày (S5 tính cả 2 slide mở đầu Giai đoạn 3)
  footerText = `NUS Technology · Giai đoạn 3 · Session ${num} — ${topic}`;
  const s = blank(notes, C.INK);
  mono(s, 40, 40, 300, 16, 'NUS TECHNOLOGY · GIAI ĐOẠN 3', { color: C.ORANGE, size: 10 });
  label(s, 40, 80, 640, 110, `Session ${num}\n${topic}`, { size: 40, color: C.WHITE, align: 'START', valign: 'TOP', sub: 30, subColor: C.WHITE, lineSpacing: 100 });
  label(s, 40, 205, 600, 50, focusQ, { size: 15, bold: false, color: C.DIM, align: 'START', valign: 'TOP' });
  label(s, 40, 320, 250, 20, PRESENTER, { size: 12, color: C.WHITE, align: 'START' });
  [5, 6, 7, 8, 9].forEach((k, i) => box(s, 450 + i * 46, 318, 40, 24, `S${k}`,
    { fill: k === num ? C.ORANGE : C.GHOST, font: MONO, size: 10, color: k === num ? C.INK : C.DIM, noLine: true }));
  return s;
}

function recap(title, points, notes) {
  const s = newSlide('Nhắc lại buổi trước', title, notes);
  points.forEach((p, i) => {
    box(s, 40, 92 + i * 78, 640, 66, ' ', {});
    mono(s, 54, 100 + i * 78, 40, 50, String(i + 1).padStart(2, '0'), { size: 16 });
    label(s, 100, 96 + i * 78, 570, 58, p, { size: 14.5, bold: false, align: 'START' });
  });
  return s;
}
// Agenda dạng lưới card 01/02/03 như "What we'll cover"
function agenda(items, notes) {
  const s = newSlide('Agenda', 'Hôm nay học gì', notes);
  const w = 640 / items.length - 10;
  items.forEach(([t, d], i) => {
    const x = 40 + i * (w + 10);
    box(s, x, 92, w, 150, ' ', {});
    mono(s, x + 14, 102, w - 28, 30, String(i + 1).padStart(2, '0'), { size: 20 });
    label(s, x + 14, 138, w - 28, 95, `${t}\n${d}`, { size: 16, sub: 12, align: 'START', valign: 'TOP' });
  });
  label(s, 40, 255, 640, 24, '…rồi Q&A · bài tự thực hành sau buổi', { size: 12, bold: false, align: 'START' });
  return s;
}
// "Key takeaways": card đầu tối, các card sau viền xanh; mỗi card có nhãn mono nhỏ + 1 câu đậm
function takeaways(points, notes) {
  const s = newSlide('Ghi nhớ', 'Mang về sau buổi hôm nay', notes);
  points.forEach(([k, t], i) => {
    const dark = i === 0;
    box(s, 40, 86 + i * 58, 640, 50, ' ', { fill: dark ? C.INK : C.CARD, line: dark ? undefined : C.BLUE });
    mono(s, 54, 89 + i * 58, 400, 14, k.toUpperCase(), { color: dark ? C.ORANGE : C.BLUE, size: 8 });
    label(s, 54, 100 + i * 58, 615, 34, t, { size: 13.5, color: dark ? C.WHITE : C.INK, align: 'START' });
  });
  return s;
}
// "Challenge": bài tự thực hành + lưới câu hỏi 0X 2 cột
function challenge(homework, questions, notes) {
  const s = newSlide('Thử thách', 'Bạn giải thích được những câu này không?', notes);
  box(s, 40, 86, 640, 62, ' ', { fill: C.INK });
  mono(s, 54, 91, 300, 14, 'TỰ THỰC HÀNH SAU BUỔI', { color: C.ORANGE, size: 8 });
  label(s, 54, 104, 615, 40, homework, { size: 12, bold: false, color: C.WHITE, align: 'START' });
  questions.forEach((q, i) => {
    const x = 40 + (i % 2) * 325; const y = 162 + Math.floor(i / 2) * 68;
    box(s, x, y, 315, 58, ' ', {});
    mono(s, x + 10, y + 6, 40, 46, String(i + 1).padStart(2, '0'), { size: 16 });
    label(s, x + 48, y + 4, 258, 50, q, { size: 11.5, bold: false, align: 'START' });
  });
  return s;
}
// Kết thúc mỗi ngày: Q&A tối
function closing() {
  const s = blank('Q&A 10-15 phút. Nhắc bài tự thực hành và lịch buổi sau (11h thứ 4 tuần sau).', C.INK);
  mono(s, 40, 130, 300, 16, 'Q&A', { color: C.ORANGE, size: 12 });
  label(s, 40, 150, 600, 70, 'Cảm ơn!', { size: 44, color: C.WHITE, align: 'START' });
  label(s, 40, 225, 600, 24, `${PRESENTER} · NUS Technology`, { size: 13, bold: false, color: C.DIM, align: 'START' });
  footer(s, true);
  return s;
}

// Mỗi session dựng vào deck riêng → xoá trạng thái giữa các lần dựng
function reset() { reqs.length = 0; slides.length = 0; page = 0; }

module.exports = { reset, C, reqs, slides, box, label, mono, code, arrow, twoWay, table, newSlide, question, sessionHeader,
  recap, agenda, takeaways, challenge, closing, blank, footer };
