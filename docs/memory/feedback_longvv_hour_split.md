---
name: LongVV hour split — 16h Maddy STATIC + 24h FLEXIBLE
description: LongVV has 16h/week static commitment (Maddy/Xtreme) and up to 24h/week flexible usage (backfill, ad-hoc gap coverage). NOT a 40h fixed-schedule dev — 0h days are normal and never alert-worthy.
type: feedback
---

LongVV's weekly capacity:
- **16h STATIC**: Maddy/Xtreme only (sheet `1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I` — new template since 2026-04-06). Old sheet `1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58` is deprecated.
- **Up to 24h FLEXIBLE**: applied wherever needed week-to-week. Most commonly James Diamond backfill (covering PhucVT/AnhNH2 paid leave), but can be any project gap.

**Why (2026-05-15):** Repeated confusion over LongVV's W26 hours (24h flagged as shortfall). User clarified twice: "LongVV is only have 16h static, another one can use for flexible purpose". An earlier (2026-05-13) memory said "24h/wk on another project (total ~40h/wk)" — that framing was wrong; the 24h is flexible, not fixed.

**How to apply:**
1. **Maddy 16h is the ONLY hard target.** Flag only if Maddy weekly total < 16h with no leave note. JIRA cross-check (LIFM2/TP/XS worklogs by accountId `5b1ed0bcc175e5207bf80b77`) must match Maddy sheet within ±2h.
2. **JD hours = backfill, not contracted.** When LongVV logs JD hours, treat as backfill (covers PhucVT/AnhNH2 leave or scope spike). Do NOT compare against a 24h JD plan.
3. **0h days are normal.** No reminder, no flag — applies to Maddy AND any flexible project.
4. **W26 example (May 11–15):** Total 24h = 16h Maddy ✓ + 8h JD backfill (PhucVT Wed paid leave). Tue+Fri 0h on JD is fine.
5. **Matrix Web report line:** LongVV charge = actual backfill hours (e.g. `LongVV: 8h/8h`). Web team contract stays at 40h regardless of which dev delivers it.
6. **Never alert on LongVV aggregate < 40h.** Aggregate is flexible by design. Only flag Maddy shortfall vs 16h target.
