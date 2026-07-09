---
name: feedback_siteground_captcha_no_ssh_fallback
description: Siteground Puppeteer login hits a CAPTCHA even with visible DISPLAY=:1 browser + saved credentials (unsolvable headlessly); SSH host "Bailey.cpanel" referenced by the skill is not configured in this environment's ~/.ssh/config
metadata:
  type: feedback
---

`scripts/siteground-storage.js --login` with `DISPLAY=:1` (Xvfb, confirmed running) auto-fills username/password from `config/.bailey-config.json` but the site presents a CAPTCHA after clicking Login — confirmed by a one-off script that also clicks the Login button and checks page text for "captcha" (`true`). This is not a session-expiry issue fixable by retrying — a real CAPTCHA challenge needs human solving, which a headless/unattended run cannot do.

The skill's documented SSH fallback (`ssh -o ConnectTimeout=10 Bailey.cpanel 'cd ~/www && du -sh ...'`) also does not work in this environment: `~/.ssh/config` (`/home/mpfc/.ssh/config`) has no `Bailey.cpanel` (or any cpanel/Bailey) Host entry — only a `github.com-duongdn` entry exists. No credentials for this host exist elsewhere in `config/`.

**How to apply:** Don't burn time re-attempting the Puppeteer login expecting a different outcome — it will hit the same CAPTCHA every time under headless/unattended conditions. Report Siteground storage as unavailable this run (local report only, per [[feedback_warning_needs_explanation]] and the customer-facing redaction rules — write "OK" in the customer Slack post, safe default). If the user wants this actually fixed, it needs either: (1) a real SSH host alias + key added for the cPanel/Siteground SSH endpoint, or (2) a captcha-solving service wired into the Puppeteer flow, or (3) an interactive VNC session where the user manually solves the CAPTCHA once to refresh the saved browser profile/session (`tmp/sg-browser-profile`).
