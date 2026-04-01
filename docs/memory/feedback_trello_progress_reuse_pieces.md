---
name: Trello progress must reuse existing daily-report pieces (multi-source)
description: Each Trello progress item maps to multiple source pieces (Slack+Sheets, Discord+Sheets, etc.) — run ALL mapped pieces, never duplicate logic
type: feedback
---

When running `/daily-report trello progress {item}`, run ALL mapped source pieces. Most items need BOTH Slack/Discord AND Sheets checks.

**Why:** User corrected — items have multiple monitoring sources. Checking only Slack misses task log verification. Each piece handles its own timestamp updates.

**How to apply:**
- Run all mapped pieces for the item
- Use combined findings to decide complete/skip
- Any alert from ANY source → skip (don't complete Trello item)

**Sheet developer → project mapping (verified from sheet titles):**
- LongVV → Maddy (Xtreme Soft Solutions)
- PhucVT → James Diamond (Portfolio)
- TuanNT → John Yi (Amazing Meds) + Rebecca (William Bills)
- VietPH → Bailey (Paturevision)
- KhanhHH → Elliott (Generator App)
- LeNH → Rory (BXR/Swift) + Franc + Aysar

**Full item → source mapping:**
- `maddy` → `slack xtreme` + `sheets longvv`
- `blake` → `slack socal`
- `johnyi` → `slack amazingmeds` + `sheets tuannt`
- `james` → `discord airagri` + `sheets phucvt`
- `franc` → `slack rdc` + `sheets lenh`
- `rory` → `slack swift` + `sheets lenh`
- `aysar` → `slack baamboozle` + `sheets lenh`
- `elliott` → `slack generator` + `sheets khanhhh`
- `swift` → `slack swift` + `sheets lenh`
- `raymond` → `slack legalatoms`
- `marcel` → `slack equanimity`
- `colin` → `slack aigile`
- `andrew` → `discord bizurk`
- `elena` → `slack samguard` + `elena`
- `mpfc` → `slack mpfc`
- `bailey` → `slack ggs` + `sheets vietph`
- `fountain` → `fountain` (full 5-part)
- `rebecca` → `slack williambills` + `sheets tuannt`
- `neural` → (no mapped source)

**Check Mail:** `trello mail {account}` → run `email {account}` first.
