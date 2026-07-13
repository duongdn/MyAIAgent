---
name: feedback_workstream_all_projects
description: "Weekly report MUST fetch WorkStream /review/week for ALL projects, not just GSheets — teams have migrated logging to WS"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

**Rule:** In every weekly report, fetch WorkStream `/review/week?projectId={id}&date={date}` for ALL accessible projects BEFORE writing any dev's hours. Do NOT rely on GSheets alone.

**Why:** Teams (James Diamond, Blair Brown, Fountain, Generator, Baamboozle, Colin/ETZ) log hours in WorkStream, not GSheets. GSheets only captures partial or 0h. This caused wrong numbers multiple times (PhucVT showed 8h GSheets vs 32h WS; LeNH showed 0h GSheets vs 36h WS; KhanhHH showed 4h GSheets vs 24h WS; Fountain showed 0h GSheets vs 76.75h WS).

**How to apply:**
1. After token refresh, call `/time/week?date={date}` to discover ALL project IDs for the logged-in user
2. For each project, call `/review/week?projectId={id}&date={date}`
3. Aggregate hours per employee across all projects
4. Combine with GSheets (for projects not on WS: VietPH/TuanNT PAT, Marcel)
5. WorkStream numbers override GSheets when both exist

**Project IDs (as of W32, 2026-06-27):**
- james_diamond (Portfolio - James Diamond): `cmqook9vf0kl8m81vusyo8ppt`
- blair_brown (Peptide Clyde): `cmqj4tj6v01gfm81vgx7ipkov`
- maddy (Xtreme Soft Solutions): `cmpqc1v7v00ahtk1vs1817xt8`
- rebecca (MissSwimwear): `cmpqcflkx00litk1vic3vki6j`
- baamboozle: `cmqez93ka07q8p81v7035l3td`
- generator (Elliott): `cmqoou4h10kzum81vovi8rrsk`
- colin_etz (ETZ - Wathaga): `cmqezatb807qvp81vpnzzimmp`
- charles_chang (Family App): `cmqezfyzv07z6p81vf403t9lp` (403 as of W32 — check permissions)
- fountain (Fountain Greetings): `cmpqcjojh00q2tk1v2qi7gs0j`
- others (NUS): `cmpqae4pd0006qa1wo85fzvji` (403 as of W32)

**Who logs where (W32 snapshot — LongVV row outdated, see [[feedback_longvv_consolidated]] for current state):**
- LongVV: WS Maddy + WS JD (as of W32; since 2026-07-07 he's ALSO full-time on WS OhCleo — check that project too)
- PhucVT/AnhNH2: WS James Diamond
- LeNH: WS Blair Brown
- KhanhHH: WS Generator + WS Baamboozle + WS Colin/ETZ (+ Elena GSheets if accessible)
- Fountain team: WS Fountain Greetings
- TuanNT/VietPH: GSheets PAT (+ WS CharlesChang if accessible)
- Marcel: GSheets Marcel (adhoc)
