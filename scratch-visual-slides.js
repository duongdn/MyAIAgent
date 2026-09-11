const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: path.resolve('config/daily-agent-490610-7eb7985b33e3.json'), scopes: ['https://www.googleapis.com/auth/presentations'] });
  const slides = google.slides({ version: 'v1', auth });
  const presentationId = '10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI';
  let pres = await slides.presentations.get({ presentationId });
  const pageW = pres.data.pageSize.width.magnitude;
  const pageH = pres.data.pageSize.height.magnitude;

  const NAVY = { red: 0.12, green: 0.22, blue: 0.40 };
  const LIGHTNAVY = { red: 0.85, green: 0.9, blue: 0.97 };
  const ORANGE = { red: 0.92, green: 0.55, blue: 0.15 };
  const GREEN = { red: 0.88, green: 0.95, blue: 0.82 };
  const YELLOW = { red: 0.99, green: 0.92, blue: 0.7 };
  const WHITE = { red: 1, green: 1, blue: 1 };
  const GRAY = { red: 0.3, green: 0.3, blue: 0.3 };

  let counter = 0;
  function uid(prefix) { counter++; return `${prefix}${counter}_v2`; }

  function card(reqs, slideId, id, title, desc, x, y, w, h, fill, titleColor, descColor) {
    reqs.push({ createShape: { objectId: id, shapeType: 'ROUND_RECTANGLE', elementProperties: { pageObjectId: slideId, size: { width: { magnitude: w, unit: 'EMU' }, height: { magnitude: h, unit: 'EMU' } }, transform: { scaleX: 1, scaleY: 1, translateX: x, translateY: y, unit: 'EMU' } } } });
    reqs.push({ updateShapeProperties: { objectId: id, shapeProperties: { shapeBackgroundFill: { solidFill: { color: { rgbColor: fill } } }, outline: { propertyState: 'NOT_RENDERED' }, contentAlignment: 'MIDDLE' }, fields: 'shapeBackgroundFill,outline,contentAlignment' } });
    const text = desc ? `${title}\n${desc}` : title;
    reqs.push({ insertText: { objectId: id, text } });
    // style whole text first (desc style), then override title portion
    reqs.push({ updateTextStyle: { objectId: id, style: { fontSize: { magnitude: 10, unit: 'PT' }, foregroundColor: { opaqueColor: { rgbColor: descColor } }, fontFamily: 'Arial' }, fields: 'fontSize,foregroundColor,fontFamily', textRange: { type: 'ALL' } } });
    reqs.push({ updateTextStyle: { objectId: id, style: { fontSize: { magnitude: 13, unit: 'PT' }, bold: true, foregroundColor: { opaqueColor: { rgbColor: titleColor } }, fontFamily: 'Arial' }, fields: 'fontSize,bold,foregroundColor,fontFamily', textRange: { type: 'FIXED_RANGE', startIndex: 0, endIndex: title.length } } });
    reqs.push({ updateParagraphStyle: { objectId: id, style: { alignment: 'CENTER', lineSpacing: 115 }, fields: 'alignment,lineSpacing', textRange: { type: 'ALL' } } });
  }

  function tag(reqs, slideId, id, text, x, y, w, h, fill, color) {
    reqs.push({ createShape: { objectId: id, shapeType: 'ROUND_RECTANGLE', elementProperties: { pageObjectId: slideId, size: { width: { magnitude: w, unit: 'EMU' }, height: { magnitude: h, unit: 'EMU' } }, transform: { scaleX: 1, scaleY: 1, translateX: x, translateY: y, unit: 'EMU' } } } });
    reqs.push({ updateShapeProperties: { objectId: id, shapeProperties: { shapeBackgroundFill: { solidFill: { color: { rgbColor: fill } } }, outline: { propertyState: 'NOT_RENDERED' }, contentAlignment: 'MIDDLE' }, fields: 'shapeBackgroundFill,outline,contentAlignment' } });
    reqs.push({ insertText: { objectId: id, text } });
    reqs.push({ updateTextStyle: { objectId: id, style: { fontSize: { magnitude: 10, unit: 'PT' }, bold: true, foregroundColor: { opaqueColor: { rgbColor: color } }, fontFamily: 'Arial' }, fields: 'fontSize,bold,foregroundColor,fontFamily', textRange: { type: 'ALL' } } });
    reqs.push({ updateParagraphStyle: { objectId: id, style: { alignment: 'CENTER' }, fields: 'alignment', textRange: { type: 'ALL' } } });
  }

  function arrow(reqs, slideId, id, fromX, fromY, toX, toY, dashed) {
    const w = Math.abs(toX - fromX) || 1000, h = Math.abs(toY - fromY) || 1000;
    reqs.push({ createLine: { objectId: id, lineCategory: 'STRAIGHT', elementProperties: { pageObjectId: slideId, size: { width: { magnitude: w, unit: 'EMU' }, height: { magnitude: h, unit: 'EMU' } }, transform: { scaleX: (toX - fromX) >= 0 ? 1 : -1, scaleY: (toY - fromY) >= 0 ? 1 : -1, translateX: fromX, translateY: fromY, unit: 'EMU' } } } });
    reqs.push({ updateLineProperties: { objectId: id, lineProperties: { lineFill: { solidFill: { color: { rgbColor: NAVY } } }, weight: { magnitude: 12700, unit: 'EMU' }, endArrow: 'FILL_ARROW', dashStyle: dashed ? 'DASH' : 'SOLID' }, fields: 'lineFill,weight,endArrow,dashStyle' } });
  }

  // find body placeholders to delete
  function findBody(slide) { return slide.pageElements.find(e => e.shape?.placeholder?.type === 'BODY'); }

  const reqsAll = [];

  // ===== Slide: Execution mode (s13_slide_1) =====
  {
    const slideId = 's13_slide_1';
    const slide = pres.data.slides.find(s => s.objectId === slideId);
    reqsAll.push({ deleteObject: { objectId: findBody(slide).objectId } });
    const cardW = pageW * 0.28, cardH = pageH * 0.42, gap = pageW * 0.02;
    const y = pageH * 0.32;
    let x = pageW * 0.05;
    card(reqsAll, slideId, uid('c'), 'Sync', 'Task ngắn\nchờ, có kết quả ngay', x, y, cardW, cardH, LIGHTNAVY, NAVY, NAVY); x += cardW + gap;
    card(reqsAll, slideId, uid('c'), 'Streaming', 'Output dài\nchữ chạy dần, giảm chờ', x, y, cardW, cardH, NAVY, WHITE, WHITE); x += cardW + gap;
    card(reqsAll, slideId, uid('c'), 'Async + Queue', 'Task lâu\ncần resume/retry được', x, y, cardW, cardH, LIGHTNAVY, NAVY, NAVY);
  }

  // ===== Slide: Resilience (s13_slide_2) — 2x2 grid =====
  {
    const slideId = 's13_slide_2';
    const slide = pres.data.slides.find(s => s.objectId === slideId);
    reqsAll.push({ deleteObject: { objectId: findBody(slide).objectId } });
    const cardW = pageW * 0.43, cardH = pageH * 0.26, gapX = pageW * 0.02, gapY = pageH * 0.04;
    const startX = pageW * 0.05, startY = pageH * 0.24;
    const items = [
      ['Timeout', 'Giới hạn thời gian chờ mọi dependency', LIGHTNAVY, NAVY],
      ['Retry (backoff)', 'Tăng dần thời gian chờ, chỉ khi an toàn', LIGHTNAVY, NAVY],
      ['Circuit breaker', 'Ngừng gọi provider đang lỗi liên tục', LIGHTNAVY, NAVY],
      ['Fallback model', 'Check capability + quality, không chỉ đổi model', ORANGE, WHITE],
    ];
    items.forEach(([t, d, fill, color], i) => {
      const cx = startX + (i % 2) * (cardW + gapX);
      const cy = startY + Math.floor(i / 2) * (cardH + gapY);
      card(reqsAll, slideId, uid('c'), t, d, cx, cy, cardW, cardH, fill, color, color === WHITE ? WHITE : NAVY);
    });
  }

  // ===== Slide: Caching (s13_slide_3) =====
  {
    const slideId = 's13_slide_3';
    const slide = pres.data.slides.find(s => s.objectId === slideId);
    reqsAll.push({ deleteObject: { objectId: findBody(slide).objectId } });
    const cardW = pageW * 0.28, cardH = pageH * 0.32, gap = pageW * 0.02;
    const y = pageH * 0.24;
    let x = pageW * 0.05;
    card(reqsAll, slideId, uid('c'), 'Exact cache', 'Giống hệt\n→ trả lại luôn', x, y, cardW, cardH, GREEN, NAVY, NAVY); x += cardW + gap;
    card(reqsAll, slideId, uid('c'), 'Semantic cache', 'Gần nghĩa\n→ có rủi ro trả nhầm', x, y, cardW, cardH, YELLOW, NAVY, NAVY); x += cardW + gap;
    card(reqsAll, slideId, uid('c'), 'Retrieval cache', 'Giảm tìm\ntài liệu lặp lại', x, y, cardW, cardH, LIGHTNAVY, NAVY, NAVY);
    // banner
    const bannerId = uid('banner');
    card(reqsAll, slideId, bannerId, 'Cache key PHẢI gồm:', 'tenant + quyền truy cập + model version + prompt version + knowledge version', pageW * 0.05, y + cardH + pageH * 0.06, pageW * 0.9, pageH * 0.22, NAVY, WHITE, WHITE);
  }

  // ===== Slide: Versioning (s13_slide_4) — timeline =====
  {
    const slideId = 's13_slide_4';
    const slide = pres.data.slides.find(s => s.objectId === slideId);
    reqsAll.push({ deleteObject: { objectId: findBody(slide).objectId } });
    const cardW = pageW * 0.16, cardH = pageH * 0.18, gap = pageW * 0.08;
    const y = pageH * 0.26;
    let x = pageW * 0.15;
    const v1 = uid('c'); card(reqsAll, slideId, v1, 'v1', '', x, y, cardW, cardH, LIGHTNAVY, NAVY, NAVY);
    const v2x = x + cardW + gap; const v2 = uid('c'); card(reqsAll, slideId, v2, 'v2', '', v2x, y, cardW, cardH, NAVY, WHITE, WHITE);
    const v3x = v2x + cardW + gap; const v3 = uid('c'); card(reqsAll, slideId, v3, 'v3 (mới)', '', v3x, y, cardW, cardH, ORANGE, WHITE, WHITE);
    arrow(reqsAll, slideId, uid('a'), x + cardW, y + cardH / 2, v2x, y + cardH / 2);
    arrow(reqsAll, slideId, uid('a'), v2x + cardW, y + cardH / 2, v3x, y + cardH / 2);
    // rollback dashed arrow curved below (approx as straight)
    arrow(reqsAll, slideId, uid('a'), v3x + cardW / 2, y + cardH, x + cardW / 2, y + cardH, true);
    const rbLabel = uid('lbl');
    tag(reqsAll, slideId, rbLabel, 'rollback nếu tệ hơn', x + cardW, y + cardH + pageH * 0.02, cardW * 1.6, pageH * 0.09, YELLOW, NAVY);
    // 4 tags below
    const tagW = pageW * 0.2, tagH = pageH * 0.11, tagGap = pageW * 0.015;
    let tx = pageW * 0.06; const ty = y + cardH + pageH * 0.16;
    ['Prompt', 'Model', 'Tool schema', 'Knowledge base'].forEach(t => {
      tag(reqsAll, slideId, uid('tag'), t, tx, ty, tagW, tagH, GREEN, NAVY);
      tx += tagW + tagGap;
    });
  }

  // ===== Slide: Graceful degradation (s13_slide_5) =====
  {
    const slideId = 's13_slide_5';
    const slide = pres.data.slides.find(s => s.objectId === slideId);
    reqsAll.push({ deleteObject: { objectId: findBody(slide).objectId } });
    const centerId = uid('c');
    const centerW = pageW * 0.24, centerH = pageH * 0.16;
    const centerX = pageW * 0.38, centerY = pageH * 0.2;
    card(reqsAll, slideId, centerId, 'Model/Tool lỗi', '', centerX, centerY, centerW, centerH, ORANGE, WHITE, WHITE);
    const items = ['Search thường', 'Kết quả thô', 'Xếp hàng xử lý sau', 'Chuyển Human'];
    const cardW = pageW * 0.21, cardH = pageH * 0.2, gap = pageW * 0.02;
    const y2 = centerY + centerH + pageH * 0.14;
    let x = pageW * 0.05;
    items.forEach(t => {
      const id = uid('c');
      card(reqsAll, slideId, id, t, '', x, y2, cardW, cardH, LIGHTNAVY, NAVY, NAVY);
      arrow(reqsAll, slideId, uid('a'), centerX + centerW / 2, centerY + centerH, x + cardW / 2, y2);
      x += cardW + gap;
    });
  }

  const chunkSize = 45;
  for (let i = 0; i < reqsAll.length; i += chunkSize) {
    const chunk = reqsAll.slice(i, i + chunkSize);
    await slides.presentations.batchUpdate({ presentationId, requestBody: { requests: chunk } });
    console.log(`Applied ${i}-${i+chunk.length}`);
  }
  console.log('All visual slides built. Total requests:', reqsAll.length);
}
main().catch(e => { console.log('ERROR', e.message); if(e.errors) console.log(JSON.stringify(e.errors, null, 2)); });
