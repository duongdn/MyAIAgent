---
name: deck-rebuild-overwrites-manual-slide-edits
description: AI training decks — user sửa tay trên Google Slides; full rebuild (PHASE3_ONLY) xoá mất sửa tay → chỉ patch đúng slide/element
metadata:
  type: feedback
---
User sửa tay trực tiếp trên deck GĐ3, ví dụ xoá subtitle slide 1 của S5. Ngày 28/10 mình chạy `PHASE3_ONLY=5 node build-phase3-agent-deck.js` (xoá hết rồi dựng lại cả deck) nên phần user đã xoá bị dựng lại.
**Why:** user nói: "tôi bỏ rồi mà thấy có lại, bạn update lại à, tưởng update từng slide 1".
**How to apply:**
- Sửa deck = patch đúng slide/element bằng batchUpdate (deleteObject, sửa text…), không rebuild cả deck.
- Vẫn sửa code builder để code khớp với deck.
- Chỉ rebuild toàn bộ khi user đồng ý. Trước khi rebuild, dump text deck hiện tại và so với code để không mất phần user sửa tay.
- Trước khi patch: kiểm tra Drive `lastModifyingUser`. Nếu là user (dnduong.us), deck đã có sửa tay → chỉ dùng replaceAllText/deleteObject đúng chỗ, không thay cả slide (`patch-slides-from-code.js`).
