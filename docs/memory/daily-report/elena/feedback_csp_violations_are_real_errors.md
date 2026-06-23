---
name: CSP violations are real errors
description: samguard.co CSP violations are real errors requiring CSP config update, not just INFO/noise
type: feedback
---

CSP violations on samguard.co are real errors, not informational noise.

**Why:** The team intentionally configures CSP for the project. When new JS/tracking is added, the CSP policy must be updated to allow it. A blocked domain = broken functionality that needs fixing.

**How to apply:** When checking samguard.co console errors, flag any CSP violation as ⚠️ action needed (CSP update required), not as INFO/expected behavior. This applies to all CSP directive violations (connect-src, script-src, etc.).
