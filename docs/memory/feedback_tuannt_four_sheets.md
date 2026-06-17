---
name: feedback_tuannt_four_sheets
description: "TuanNT daily hours scan = 5 sheets: JohnYi + Rebecca + Paturevision + Neural + CharlesChang. Scan PREV_DATE (yesterday), not today."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 93d3428d-d58a-4cde-9afe-1610d3aceef8
---

TuanNT daily hours must be scanned across **5 sheets** using **PREV_DATE (yesterday's date tokens)**:

1. **JohnYi** — `1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ`
2. **Rebecca** — `1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4`
3. **Paturevision** — `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg`
4. **Neural (TuanNT_Neural)** — `1drk_TN7-B2xD43jgErH5aWGaeCsIMtNbiIUTNbFYheg` — W-tabs, Summary tab has start dates
5. **Charles Chang (Family App V2)** — `19gsF1hFLeuTUZMj2JIrFsRMBvs5pLE7a7j3Q4NalITc` — added 2026-06-17; W48 = Jun 15-21, 2026 in THIS sheet (W-numbering is per-project, not calendar week)

**Why:** On 2026-06-09, script only scanned JohnYi+Rebecca+Paturevision. On 2026-06-17, cron showed TuanNT 0h but actual was 7.67h (1.5h Paturevision + 6.17h Charles Chang). Charles Chang sheet was unknown to cron until user shared URL 2026-06-17.

**How to apply:** Always use PREV_DATE tokens for TuanNT scan across ALL 5 sheets. 0h is only alert if ALL 5 sheets are 0h for that day. Tab W-numbering in each sheet starts from that project's launch date — always check Summary tab to find correct W-tab for target date. See [[feedback_tuannt_trello_gates]].
