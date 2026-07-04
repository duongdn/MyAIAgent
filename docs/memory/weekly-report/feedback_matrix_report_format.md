---
name: James Diamond + Marcel Matrix report format
description: Correct message format for the weekly James Diamond + Marcel Matrix report
type: feedback
---

Format is **charge/actual** (not actual/plan). No `-` prefix before employee names.

```
Report week {DD/MM}

James Diamond

Web: {charge}/{actual} [(off X day dùng paid leave)]
PhucVT: {charge}/{actual} [(off X day dùng paid leave)]
LongVV: {charge}/{actual} [(off X day dùng paid leave)]   <-- include from W23 (2026-04-20)

Mobile: {charge}/{actual}
AnhNH2: {charge}/{actual}

---

Marcel
DuongDN: {hours}
```

Rules:
- **CORRECTED 2026-07-04 — Web charge is NOT always 40h.** The old "Web charge is ALWAYS 40h contract" rule below is WRONG whenever the sum of individual dev charges differs from 40h. Correct rule: **Web total charge = SUM of each individual dev's own charge line** (e.g. PhucVT 28 + LongVV 2 + LeNH 7 = 37h), and **Web total actual = SUM of each dev's actual line**. Never substitute the fixed contract number for the real sum.
- **Makeup hours for a PRIOR week's undercharge:** if a dev's hours this week include time covering a previous week's shortfall (not this week's leave/absence), annotate that dev's line explicitly, e.g. `LongVV: 2h/2h (bù charge thiếu tuần trước, không charge thêm)`. Still summed into charge/actual totals, but the note must make clear it settles a prior period, not new billable work this week.
- **James Diamond Web is a 40h/week TEAM contract**, not per-dev — historical framing, now superseded by the corrected sum rule above.
- **Web section MUST include LongVV** alongside PhucVT from W23 (2026-04-20) onward. Web total = PhucVT + LongVV (+ any other backfill dev).
- PhucVT plan = 40h/week (when full week). AnhNH2 has **no fixed plan** — use actual as both values (e.g. 20h/20h).
- **LongVV on James Diamond = FLEXIBLE bucket**, not a fixed 24h/week target. LongVV has only 16h/wk static (Maddy); his 24h flex is used wherever needed (most commonly JD when PhucVT/AnhNH2 take paid leave). When delivering JD hours, charge = actual flex hours used. The previous "LongVV 24h/week target" interpretation was wrong.
- **Paid leave handling — backfill rule:**
  1. PhucVT line: charge = plan − leave hours, actual = on-duty hours. E.g. PhucVT plan 40h, 1 paid day off → `PhucVT: 32h/32h`.
  2. Backfill dev (LongVV) line: charge = actual = backfill hours. E.g. LongVV covered 1 day → `LongVV: 8h/8h`.
  3. Web section: charge = 40h (contract), actual = sum of dev actuals (e.g. 32 + 8 = 40h). → `Web: 40h/40h`.
  4. **`(off X day dùng paid leave)` annotation ONLY when actual < contract (shortfall not covered by backfill).** If LongVV covers the full leave hours → Web actual = 40h → NO annotation on any line. Annotation is only to explain a remaining shortfall to the client.
- **Why (2026-05-15):** User corrected my sent message that had `Web: 48h/40h` + `PhucVT: 40h/32h`. Correct was `Web: 40h/40h` + `PhucVT: 32h/32h`. Reason: "for internal, we only have 40h, if dev off, we need use paid leave or use another dev". LongVV's 8h JD W26 was NOT his own contract — it was covering PhucVT's Wed paid leave.
- Hours as Xh Ym format (not decimal). E.g. 1.33h → 1h 20m

**Data source (W32 onwards):** James Diamond team uses WorkStream (`cmqook9vf0kl8m81vusyo8ppt`, "Portfolio - James Diamond"). Use `/review/week?projectId=...` manager endpoint — GSheets only captures partial hours. Blair Brown also on WorkStream (`cmqj4tj6v01gfm81vgx7ipkov`), LeNH is dev from W32. LeNH in Matrix message section is `LeNH: Xh Ym`.

**Why:** User corrected wrong format (was showing actual/plan with `-` prefix, wrong AnhNH2 plan of 18h). Confirmed via 2026-03-21 weekly report session. **2026-04-25:** User explicitly corrected omission of LongVV from Web — "Why no LongVV on web dev ????". Standalone message sent without LongVV had to be corrected. **2026-07-04:** Sent `Web: 40h/42h` using the old fixed-contract shortcut; correct was `Web: 37h/42h` (28+2+7). User also flagged that LongVV's 2h that week was makeup for a prior week's undercharge and needed an explicit non-billable annotation. See also [[feedback_thuyle_report_explicit_send_flag]] — sending now requires explicit literal confirmation of the final message text.

**How to apply:** Always use this format when generating the James Diamond + Marcel Matrix message. When in doubt about who belongs on Web/Mobile, ASK before sending — do not default to "old format" if a developer has been added to the project.
