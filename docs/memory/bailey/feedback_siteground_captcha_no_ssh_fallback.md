---
name: feedback_siteground_captcha_no_ssh_fallback
description: Siteground Puppeteer login hits a CAPTCHA (unsolvable headlessly) — use the SSH fallback `Bailey.cpanel` instead, which IS configured (as of 2026-08-21) and gives real disk breakdown
metadata:
  type: feedback
---

`scripts/siteground-storage.js --login` with `DISPLAY=:1` (Xvfb, confirmed running) auto-fills username/password from `config/.bailey-config.json` but the site presents a CAPTCHA after clicking Login — confirmed by a one-off script that also clicks the Login button and checks page text for "captcha" (`true`). This is not a session-expiry issue fixable by retrying — a real CAPTCHA challenge needs human solving, which a headless/unattended run cannot do.

**UPDATE 2026-08-21:** The skill's documented SSH fallback (`ssh -o ConnectTimeout=10 Bailey.cpanel 'cd ~/www && du -sh ...'`) previously failed (host alias missing) but **now works** — `Bailey.cpanel` is configured in `~/.ssh/config` and returned real disk data (81% used, mostly staging site copies). Don't assume it's still missing; try it first each run before declaring Siteground unavailable.

**How to apply:** Don't burn time re-attempting the Puppeteer login expecting a different outcome — it will hit the same CAPTCHA every time under headless/unattended conditions. Instead run the SSH fallback first — it's the working path now. Only fall back to "unavailable, report OK in customer Slack" (per [[feedback_warning_needs_explanation]] and customer-facing redaction rules) if the SSH command itself fails.
