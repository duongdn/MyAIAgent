---
name: feedback_tuannt_four_sheets
description: "TuanNT daily hours scan = 4 sheets: JohnYi + Rebecca + Paturevision + Neural. Scan PREV_DATE (yesterday), not today."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 93d3428d-d58a-4cde-9afe-1610d3aceef8
---

TuanNT daily hours must be scanned across **4 sheets** using **PREV_DATE (yesterday's date tokens)**:

1. **JohnYi** — `1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ`
2. **Rebecca** — `1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4`
3. **Paturevision** — `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg`
4. **Neural (TuanNT_Neural)** — `1drk_TN7-B2xD43jgErH5aWGaeCsIMtNbiIUTNbFYheg` — W-tabs, Summary tab has start dates

**Why:** On 2026-06-09, script only scanned JohnYi+Rebecca+Paturevision using Jun 9 (TARGET_DATE). TuanNT had 6.5h in Paturevision + 1.5h in Neural on Jun 8 — both were missed, causing false "TuanNT 0h" report. User said "TuanNT work 8h yesterday !!!".

**How to apply:** Always use MON_TOKENS/previous-day tokens for TuanNT scan. 0h is only alert if ALL 4 sheets are 0h for that day. Working any one = no alert. See [[feedback_tuannt_trello_gates]].
