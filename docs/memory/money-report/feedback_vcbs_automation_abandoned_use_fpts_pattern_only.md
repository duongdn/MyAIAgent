---
name: feedback_vcbs_automation_abandoned_use_fpts_pattern_only
description: "VCBS invest.vcbs.com.vn LOGIN automation is unreliable (React SPA, coordinate-click too fragile) — but once the user logs in manually ONE time, scripts/vcbs-portfolio-report.js fetches the portfolio fully headless forever after, using the SPA's own JSON REST API + localStorage access_token"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fca793ff-4b7e-4e36-928e-4de9e68dd255
  modified: 2026-08-28T04:22:02.051Z
---

**RESOLVED 2026-08-28 (same session):** VCBS portfolio fetch is fully working via `scripts/vcbs-portfolio-report.js`, headless, once the user has logged in manually one time. The FETCH is actually easier than FPTS: VCBS's platform is backed by real JSON REST APIs (`connect.vcbs.com.vn`), not server-rendered HTML.

**Key mechanics:**
- Auth: `localStorage.token_VCBS` holds `{"access_token": "..."}` (double-JSON-encoded — `JSON.parse(JSON.parse(raw))`). Pass it as `Authorization: Bearer {token}` on API calls — plain cookie-based `fetch` alone returns `INVALID_ACCESSTOKEN`.
- Endpoints (custodyId = the account number, e.g. `009C374363`):
  - `GET https://connect.vcbs.com.vn/inquiry/custodyAccounts/{custodyId}/accounts` → resolves the internal trading `accountId` (different from custodyId, e.g. `0101224341`).
  - `GET .../accounts/{accountId}/positions` → holdings array (`instrument`, `totalQty`, `avgPrice`, `currentPrice`, `initialValue`, `currentValue`, `unrealizedPl`).
  - `GET .../accounts/{accountId}/state` → `nav`, `totalCashBal`, `totalLiabilitiesBal`, `availableValue`.
- Profile: persistent Chrome profile `tmp/vcbs-chrome-profile/`, same pattern as FPTS.

**Why LOGIN automation itself was abandoned (do not re-attempt blind coordinate-clicking):** VCBS's React SPA login form isn't visible on load — a "Đăng nhập" button opens a modal, and plain JS `.click()` doesn't reliably fire React's synthetic handlers (needed raw `page.mouse.click(x,y)` at `getBoundingClientRect()` coords instead of `elementHandle.click()`, which hung at least once). A floating header search input (`#header-search`) shares the same generic `input[type=text]` selector as the real username field at very different screen coordinates, repeatedly causing wrong-element clicks — including one stray click that opened account-registration (eKYC) instead of login. A native-setter value-injection trick (works fine for FPTS) visually truncated the VCBS username field to 4 chars due to the framework's controlled-input re-render; real `page.keyboard.type()` was needed instead. Given the risk of fat-fingering a live brokerage login, this was correctly abandoned in favor of one manual login.

**How to apply going forward:** If VCBS session expires (script reports "Not authenticated" or the localStorage token read fails), ask the user to run `node scripts/vcbs-portfolio-report.js --headed`, manually click "Đăng nhập" and log in (account/password/OTP) themselves — do not attempt automated login again. Once logged in, headless fetches work indefinitely until the session expires again (unknown TTL, same caveat as FPTS).
