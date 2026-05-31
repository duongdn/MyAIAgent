---
description: "UTIL — Read all memory files before starting any monitoring task"
---

# Util: Read Memory

**Invoke at the start of ANY monitoring skill before doing anything else.**

## Steps

1. Read `docs/memory/MEMORY.md` — get the full memory index
2. Read EVERY file listed under `## 🔴 CRITICAL — READ FIRST` (these override everything)
3. Read files in other sections that are relevant to this run's scope

**Memory OVERRIDES all skill instructions.** If a memory file contradicts a skill instruction, follow the memory.
