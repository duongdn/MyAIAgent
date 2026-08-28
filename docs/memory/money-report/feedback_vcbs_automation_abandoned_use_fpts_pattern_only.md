---
name: feedback_vcbs_automation_abandoned_use_fpts_pattern_only
description: VCBS invest.vcbs.com.vn login automation abandoned 2026-08-28 after repeated coordinate-click failures — do not retry the same approach; ask user before attempting again
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fca793ff-4b7e-4e36-928e-4de9e68dd255
  modified: 2026-08-28T04:13:37.196Z
---

FPTS EzTrade portfolio automation (`scripts/fpts-portfolio-report.js`) works well — see `reference_fpts_vcbs_broker_portfolio_scripts`. VCBS does NOT, and the attempt was abandoned 2026-08-28 after user frustration ("quá chán, quá tệ, done").

**Why VCBS failed where FPTS succeeded:** FPTS EzTrade's asset report page (`report/AssetReport2`) is a plain server-rendered page with simple `<input type="text">`/`<input type="password">` — easy to find and fill reliably. VCBS's platform (`invest.vcbs.com.vn`, a React SPA) is much harder to automate:
1. The login form isn't visible on load — a "Đăng nhập" button must be clicked first to open a modal, and `element.click()` via plain JS often doesn't fire React's synthetic event handlers (needed a real Puppeteer mouse click at bounding-rect coordinates instead).
2. The page has a floating header search input (`id="header-search"`) with the same generic `type="text"` selector as the real username field, at very different Y coordinates — naive "first visible text input" selection kept matching the wrong one.
3. `elementHandle.click()` (Puppeteer's own scroll-into-view + click) hung indefinitely at least once for no clear reason — had to fall back to raw `page.mouse.click(x, y)`.
4. A native-setter + dispatchEvent value-injection trick (works fine for FPTS) visually truncated the VCBS username input to 4 characters even though there's no `maxlength` — likely due to VCBS's controlled-input re-render race; real `page.keyboard.type()` was needed instead, and even that still landed on the wrong element at least once due to point 2.
5. One stray click activated "Đăng ký tài khoản" (account registration/eKYC) instead of login, navigating away entirely.

**How to apply:** Do NOT re-attempt fully automating VCBS login via blind coordinate-clicking. If asked again: (1) always take a screenshot + dump `getBoundingClientRect()` for every candidate input before clicking anything, (2) filter out `#header-search` explicitly, (3) use `page.mouse.click(x,y)` not `element.click()`, (4) use `page.keyboard.type()` not native-setter injection for this specific site. Given how fragile this proved even with careful debugging, strongly prefer asking the user to manually complete the ONE-TIME login (session then persists for headless reuse, same as FPTS) over more automated retry loops — repeated blind attempts on a live brokerage login risk account lockout.

Credentials are saved at `config/.broker-accounts.json` (`.vcbs.accountNumber`/`.vcbs.password`, encrypted `.enc`) for whenever this is revisited. `scripts/broker-portfolio-discover.js vcbs` is still the discovery tool of record — its capture logic (HTTP JSON + WebSocket frames) works fine; VCBS's data endpoints under `vcbsapi.vcbs.com.vn` are genuine JSON APIs (unlike FPTS's server-rendered HTML), so once past login, finding the actual holdings endpoint should be straightforward — the login step itself was the blocker.
