---
name: elena-team-review-report-no-meta
description: Elena review reports sent to the team must be standalone — no comparisons with/corrections to earlier internal reports, no tooling/env notes
metadata:
  type: feedback
---
Team-facing review reports (e.g. nus-base code review) state only current findings. Format = action list for devs: summary table (#, mức, vấn đề, file) + per item vấn đề/hậu quả/cách sửa + cần xác nhận. Never include methodology ("cách làm", scan counts, files read), scope stats, ✅ "đã kiểm ổn" lists, "sửa so với báo cáo trước", retractions of earlier reports, or notes like "chưa chạy build vì máy không có node_modules".

**Why:** User 2026-10-20: "cái này ko phải báo cáo compare, đây là báo cáo gởi team".
2nd correction same day: "Cách làm: quét tự động… gì nữa đây… có hiểu report cho team là gì ko".
**How to apply:** Put corrections to old reports in chat (or fix the old file), not in the new team report. Related: [[elena_consolidated]]
