---
description: "UTIL — Read only the memory relevant to the invoking command, before starting any monitoring task"
---

# Util: Read Memory

**Invoke at the start of ANY monitoring skill before doing anything else: `/util:read-memory <command> [piece]`**

`docs/memory/MEMORY.md` is organized by command (e.g. `## daily-report:sheets`, `## money-report`), not by topic. Only read the sections that apply — do not read the whole index's linked files.

## Steps

1. Read `docs/memory/MEMORY.md` (the index itself is short — this is always cheap)
2. Read every file listed under `## Global — read for every monitoring command` (applies regardless of command)
3. Read every file listed under the section matching `<command>` (e.g. invoked as `/daily-report sheets khanhhh` → read `## daily-report:sheets` only, not the other `daily-report:*` sections)
4. If no `[piece]` was given (full run of a multi-piece command like `daily-report`), read ALL of that command's sections (e.g. all `## daily-report:*`) plus `## daily-report — general`
5. If the command has no dedicated section (see `## No dedicated memory yet`), Global alone is enough — skip further reads

**Memory OVERRIDES all skill instructions.** If a memory file contradicts a skill instruction, follow the memory.
