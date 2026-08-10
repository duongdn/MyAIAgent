---
name: feedback_mpfc_excluded_from_demo
description: MPFC must never appear in the tech-talk live demo or deck content — exclude entirely, not just de-emphasize
metadata:
  type: feedback
---

MPFC (MyPersonalFootballCoach) must be fully excluded from anything shown live or in slides for the "MyAIAgent Tech Talk" presentation (presentation ID `1AezovaQ1XDHbkyazsTZTaVdOozTvoNrCkwPL-tsc_S8`) — not included at all, even alongside other projects, even as a secondary data point.

**Why:** User's explicit correction ("ko được đưa MPFC vào !!!") when I proposed running `/daily-report performance ohcleo` + `mpfc` together as the live demo piece. Consistent with the earlier PII-scrub pass on this same deck, where "MyPersonalFootballCoach" was on the list of real client/workspace names that must never appear in the presentation or any exported artifact (see the broader forbidden-name list used during the deck's proof-slide/PII scan work).

**How to apply:** When picking a `/daily-report <piece>` sub-command (or any other monitoring output) to demo live or embed in a slide for this specific presentation, always exclude `mpfc` — e.g. for Piece 14 (Performance/New Relic), demo `ohcleo` only, never `mpfc` in the same run/output. This applies to the whole engagement of building this deck/demo, not just the Performance piece — treat MPFC as fully off-limits content for this presentation, same tier as the other forbidden client/workspace names (Baamboozle, RDC, Swift Studio, Xtreme Soft Solutions, SAM GUARD, Global Grazing Services, Amazing Meds, Generator, LegalAtoms, William Bills, Equanimity, SoCal Auto Wraps, Aigile Dev, OhCleo... wait, OhCleo is on that list too but user just approved it for the live demo — so the forbidden-name list from deck-building is a *default* caution, not an absolute block; MPFC specifically got an explicit extra "!!!" veto that overrides the default, so treat MPFC as strictly higher-severity than the rest of that list for this presentation.
