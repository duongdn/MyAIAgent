---
name: feedback_dual_memory_system
description: ALWAYS save feedback to BOTH memory locations — Claude memory AND docs/memory/ in project
type: feedback
---

This project has TWO memory systems. ALWAYS save to BOTH:

1. **Claude memory:** `~/.claude/projects/-home-nus-projects-My-AI-Agent/memory/`
2. **Project local memory:** `docs/memory/` (tracked in git, portable across machines)

**Why:** User corrected multiple times — "why you keep forget that we have local memory???" Local memory is portable and available to all tools/agents.

**How to apply:**
1. When saving ANY feedback/memory, write to BOTH locations simultaneously
2. Update BOTH `MEMORY.md` index files
3. Never save to only one location
4. Check `docs/memory/MEMORY.md` at start of every session
