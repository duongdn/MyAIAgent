---
name: feedback_google_slides_api_enabled_and_gotchas
description: "Google Slides API IS enabled on this project's GCP (daily-agent-490610) and directly editable via service account — corrects stale memory; plus API gotchas hit while building the NUS AI training deck"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: cf74cab6-c7fe-4999-a5e4-c0f3dec37319
  modified: 2026-09-11T08:06:13.346Z
---

Google Slides API (`slides.googleapis.com`) is ENABLED on GCP project `daily-agent-490610` and directly editable (read AND write via `presentations.batchUpdate`) using the service account key `config/daily-agent-490610-7eb7985b33e3.json` with scopes `https://www.googleapis.com/auth/presentations` + `.../drive`. This corrects [[reference_google_drive_service_account_fallback]], which said the Slides API was disabled (403 SERVICE_DISABLED) as of 2026-07-08 — user confirmed 2026-09-11 it has been enabled since then (or was already enabled and that memory was stale/wrong context).

**Why:** Initially told the user editing Google Slides content was impossible (the `mcp__claude_ai_Google_Drive__*` MCP tools genuinely only support title/parentId updates, not content — that part is still true). User insisted and was right — direct `googleapis` Slides API calls from the project's Node context (googleapis already a project dependency) work fine for both reading and writing/creating slides, shapes, lines, text styling.

**How to apply:** Never tell the user Slides editing is impossible without first testing a live `slides.presentations.get`/`batchUpdate` call via the service account — the MCP tool limitation is NOT the same as an API-level block. Only fall back to "can't edit, only recreate" if a live test call actually 403s with SERVICE_DISABLED.

**API gotchas hit while building shapes/arrows via batchUpdate (all fixed in-session):**
- Custom object IDs must be ≥5 characters (`createShape`/`createLine` reject shorter, e.g. `'a1'` fails, `'arrow01'` works).
- `updateShapeProperties.shapeProperties.autofit.autofitType` is NOT a writable field via this API — setting `SHRINK_TEXT_ON_OVERFLOW` this way errors. Fix overflow by sizing boxes generously + shorter text instead.
- `deleteText` with `textRange: {type: 'ALL'}` on an EMPTY text box errors ("startIndex must be less than endIndex") — check existing text length first, or just skip delete and go straight to `insertText` on known-empty placeholders (e.g. fresh notes pages).
- **Line/arrow transform**: to draw an arrow from point A (start) to point B (end, arrowhead), the CORRECT formula is `translateX/Y = A.x/A.y` (the FROM point, not `min(A,B)`), `size.width/height = abs(B-A)` magnitudes, `scaleX = (B.x-A.x)>=0 ? 1 : -1`, `scaleY = (B.y-A.y)>=0 ? 1 : -1`. Using `min(fromX,toX)`/`min(fromY,toY)` as translate (an earlier mistake here) silently draws the line between the wrong two points while still "succeeding" with no API error — always verify diagonal/non-trivial arrows visually.
- **Repositioning an existing custom shape** via `updatePageElementTransform` (`applyMode: 'ABSOLUTE'`) with `scaleX:1, scaleY:1`: do NOT assume the shape's underlying `size` matches what you intended at creation — fetch the live element's `size` field first. Hit a case where 4 small tag boxes had somehow persisted with `size: 3,000,000 x 3,000,000 EMU` (Slides' default shape size) even though they visually rendered small right after creation (the creation-time scale must have been compensating) — reapplying `scaleX:1` on reposition blew them up to giant squares. Fix: always compute `scaleX = desiredWidth / actualCurrentSize.width` (fetched live), never assume 1.
- `updatePageElementSize` is not a real request type — resizing an existing element must go through `updatePageElementTransform`'s scaleX/scaleY relative to its actual stored `size`.
