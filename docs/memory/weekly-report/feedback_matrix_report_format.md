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
[LongVV: 0h/{Xh}Ym (3h trả nợ, {Y-3}h làm trước report sau)]  <-- see 2026-07-20 cap+bank rule below

Mobile: {charge}/{actual}
AnhNH2: {charge}/{actual}

---

Marcel
DuongDN: {hours}
```

Rules:
- **CORRECTED 2026-07-20 — Web charge IS capped at the 40h contract, and it's fulfilled in dev-priority order (not summed uncapped).** This SUPERSEDES the 2026-07-04 "Web = uncapped sum of every dev's charge" rule below, which was itself wrong for weeks where combined actual hours exceed 40h. Correct model: charge the devs needed to reach 40h first (e.g. LeNH alone hit 40h this week), and any OTHER dev's hours beyond what's needed to fill the cap get **charge=0** for the whole week, with the actual hours preserved via a **banking annotation** — e.g. `LongVV: 0h/13h30m (3h trả nợ, 10h30m làm trước report sau)`. This is the mirror image of the pre-existing debt mechanism: instead of paying back a past shortfall, unbilled hours become a forward credit ("làm trước report sau" = work done now, charged in a future week that needs it). Confirmed 2026-07-20 for week 13/07 (W35): `Web: 40h/53h30m`, `LeNH: 40h/40h`, `LongVV: 0h/13h30m (3h trả nợ, 10h30m làm trước report sau)`.
- **2026-07-04 rule, now superseded above but kept for history:** "Web total charge = SUM of each individual dev's own charge line" (e.g. PhucVT 28 + LongVV 2 + LeNH 7 = 37h), uncapped. This was itself a correction of an even older "Web is ALWAYS 40h flat" rule. Neither uncapped-sum nor flat-40h was fully right — the 2026-07-20 cap+bank model above is the current source of truth.
- **Makeup hours for a PRIOR week's undercharge are NOT charged (charge=0), only actual counts them.** If a dev's hours this week include time covering a previous week's shortfall (not this week's leave/absence), the charge figure for those hours is **0**, e.g. `LongVV: 0h/2h (bù charge thiếu tuần trước, không charge thêm)` — do NOT put the worked hours in the charge slot just because hours were worked.
- **Web section MUST include LongVV** alongside PhucVT from W23 (2026-04-20) onward. Web total = PhucVT + LeNH + LongVV (+ any other backfill dev) charge lines, capped per the rule above.
- PhucVT plan = 40h/week (when full week). AnhNH2 has **no fixed plan** — use actual as both values (e.g. 20h/20h).
- **LongVV on James Diamond = FLEXIBLE bucket**, not a fixed 24h/week target. LongVV has only 16h/wk static (Maddy); his flex hours go wherever needed. When a dev's flex hours aren't needed to fill the 40h Web cap that week, they get banked (see cap+bank rule), not charged.
- **Paid leave handling — backfill rule:**
  1. PhucVT line: charge = plan − leave hours, actual = on-duty hours. E.g. PhucVT plan 40h, 1 paid day off → `PhucVT: 32h/32h`.
  2. Backfill dev (LongVV) line: charge = actual = backfill hours, UNLESS the 40h cap is already met by other devs (then apply the 2026-07-20 cap+bank rule instead).
  3. **`(off X day dùng paid leave)` annotation ONLY when actual < contract (shortfall not covered by backfill).** If a backfill dev covers the full leave hours → Web actual = 40h → NO annotation on any line. Annotation is only to explain a remaining shortfall to the client.
- **Why (2026-05-15):** User corrected my sent message that had `Web: 48h/40h` + `PhucVT: 40h/32h`. Correct was `Web: 40h/40h` + `PhucVT: 32h/32h`. Reason: "for internal, we only have 40h, if dev off, we need use paid leave or use another dev".
- Hours as Xh Ym format (not decimal). E.g. 1.33h → 1h 20m

**Data source (W32 onwards):** James Diamond team uses WorkStream (`cmqook9vf0kl8m81vusyo8ppt`, "Portfolio - James Diamond"). Use `/review/week?projectId=...` manager endpoint — GSheets only captures partial hours. Blair Brown also on WorkStream (`cmqj4tj6v01gfm81vgx7ipkov`), LeNH is dev from W32.

**Why (2026-07-20 cap+bank correction):** For W35 (13/07) I drafted `Web: 53h30m/53h30m` using the uncapped-sum rule (PhucVT 0 + LeNH 40 + LongVV 13.5 = 53.5h charge = actual). User pushed back: "là sao? tuần trước ko có thiếu giờ charge à?" then gave the corrected final numbers directly: `Web: 40h/53h30m`, `LongVV: 0h/13h30m (3h trả nợ, 10h30m làm trước report sau)`, with the instruction "Nhìn đây, sau này làm theo" (look at this, follow it from now on). I had traced the debt ledger and found no outstanding debt from W34, so the "3h trả nợ" in the final numbers isn't literal ledger debt I could independently verify — it's the user's own accounting call, not something to re-derive or second-guess going forward. **Do not argue the debt math from history again — apply the cap+bank model and trust the user's per-dev split.**

**How to apply:** Always use this format when generating the James Diamond + Marcel Matrix message. Compute Web charge by filling the 40h cap in dev-priority order; any dev whose hours aren't needed to fill the cap gets `0h/{actual}` with a banking annotation. When in doubt about who belongs on Web/Mobile or the exact banking split, ASK before sending.
