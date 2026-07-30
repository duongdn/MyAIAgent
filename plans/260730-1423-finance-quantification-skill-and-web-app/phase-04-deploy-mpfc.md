# Phase 04 — Deploy to mpfc (systemd + Apache + certbot + Basic Auth)

## Context Links

- Mirror targets on mpfc (read verbatim, do NOT edit): `/etc/systemd/system/mydailyagent-web.service`,
  `/etc/apache2/sites-available/dailyagent.conf`, `/etc/apache2/sites-available/dailyagent-le-ssl.conf`
- App: [phase-03](phase-03-web-app.md) · Skill: [phase-02](phase-02-skill-and-scripts.md)
- Secret convention: `CLAUDE.md` "NEVER Hardcode Secrets", `.gitignore:11-18`, `scripts/encrypt-secrets.sh`
- Server memory: `docs/memory/global/project_mpfc_cron_server.md`, `docs/memory/server-monitor/feedback_server_safety_consolidated.md`

## Overview

- **Priority:** P1
- **Status:** pending
- **Effort:** 1.5h
- Ship the app at `https://quantification.youragentstore.net` behind its own Basic Auth realm, on a new
  port, without disturbing the five vhosts and two Node services already running.

## Key Insights (all verified on the box 2026-07-30)

- Ports in LISTEN: `3333` (node), `3334` (node = dailyagent), `80`, `443`, 22, 1080, 1025, 5900, 6379.
  → **3335 is free.** Re-verify at deploy time.
- Node `v22.20.0` at `/usr/bin/node`; `htpasswd` at `/usr/bin/htpasswd`; `certbot` at `/usr/bin/certbot`
  (plugins available: **apache**, standalone, webroot). (`claude` 2.1.205 is also present at
  `/usr/bin/claude`, but the web app no longer needs it — it spawns the build script directly. It is
  still needed for interactive `/me:finance-quantification` use on the server, if ever.)
- `sudo -n true` succeeds → **passwordless sudo**, no interactive prompts needed.
- Apache modules enabled: `proxy`, `proxy_http`, `ssl`, `rewrite`, `headers`, `auth_basic`. Nothing to `a2enmod`.
- `apache2ctl -S`: `*:80` and `*:443` are NameVirtualHosts; **default server = `admin.mypersonalfootballcoach.com`**
  (`admin.conf:1` / `admin-le-ssl.conf:2`). That default currently answers our domain — which is why
  `https://quantification.youragentstore.net/` already returns **401** and `http://` returns **301 →
  https://mypersonalfootballcoach.com/...**. Adding a namevhost for our ServerName takes precedence.
- The 301 on `:80` is emitted by **Apache**, not Cloudflare (proved: identical response from
  `curl -H 'Host: quantification.youragentstore.net' http://127.0.0.1/...` and through the CDN, with
  `Location:` pointing at `mypersonalfootballcoach.com`). → Cloudflare passes `:80` through, so
  **ACME HTTP-01 will reach the origin** once our `:80` vhost exists with the acme-challenge exception.
- DNS: `quantification.youragentstore.net` → `104.21.23.236`, `172.67.214.40` (**Cloudflare proxied**,
  zone NS `daphne/david.ns.cloudflare.com`), origin is `142.93.46.109`. The user's "points at the server"
  is true *via Cloudflare*, not an A record to the IP — this changes nothing for the plan but must be
  written down. `config/.cloudflare-config.json` holds a token for zone `mypersonalfootballcoach.com`
  (27-char `zone_name`), **not** for `youragentstore.net` → no API control over this zone; any CF-side
  change needs the user's dashboard.
- Existing LE certs live under `/etc/letsencrypt/live/<domain>/`; `renewal/dailyagent...conf` shows
  `authenticator = apache`, `installer = apache`, and the dailyagent cert was **renewed 2026-07-29**
  (valid to 2026-10-27) while Cloudflare-proxied → the apache authenticator path is proven on this host.
- `/etc/apache2/.htpasswd` (root:root, 43 bytes, May 2025) is **shared** by dailyagent + admin → a new
  separate file is required so credentials are not cross-granted.
- Repo on server: `/var/www/MyDailyAgent`, clean tree at `2546c81`, owner `mpfc`. `express` and
  `googleapis` already resolve from there. `.env` exists containing only `SECRETS_KEY`.
  `config/` on the server has just `daily-agent-*.json(.enc)`, `finance-watchlist.json`, `leave-plan.json`
  → confirms that any new tracked config must be git-allowlisted (phase 02 step 8) to arrive here.

## Requirements

### Functional
- FR1 `mydailyagent-quantification.service` runs the app as `mpfc` on port 3335, restarts on failure,
  enabled at boot.
- FR2 `quantification.conf` (`:80`) redirects to HTTPS except `/.well-known/acme-challenge/`.
- FR3 `quantification-le-ssl.conf` (`:443`) reverse-proxies to `127.0.0.1:3335` with `flushpackets=on`,
  sets `X-Robots-Tag`, and requires Basic Auth against `/etc/apache2/.htpasswd-quantification`.
- FR4 Valid Let's Encrypt cert for `quantification.youragentstore.net`, auto-renewing.
- FR5 Auto-generated credentials, stored in `config/.quantification-auth.json`, encrypted to
  `.enc` via `scripts/encrypt-secrets.sh`, plaintext never committed, reported to the user once.

### Non-functional
- Zero downtime / zero config change for the five existing vhosts and both existing Node services.
- Every apache change validated with `apache2ctl configtest` **before** reload; reload (not restart).

## Architecture

```
browser ──https──► Cloudflare (proxy, orange cloud)
                      │
                      ▼  :443 SNI quantification.youragentstore.net
              Apache namevhost quantification-le-ssl.conf
                 ├─ Header X-Robots-Tag noindex
                 ├─ <Location /> AuthType Basic → /etc/apache2/.htpasswd-quantification
                 └─ ProxyPass / http://127.0.0.1:3335/ flushpackets=on   (SSE-safe)
                      │
                      ▼
              systemd mydailyagent-quantification.service
                 node /var/www/MyDailyAgent/web-quantification/server.js  (QUANT_PORT=3335,
                                                                          bound to 127.0.0.1)
                      │ spawn (no agent)
                      ▼
              node scripts/finance-quantification-build.js <TICKER>  (cwd /var/www/MyDailyAgent)
                      │
                      ▼  googleapis + config/daily-agent-*.json + config/finance-quantification.json
              shared Google Spreadsheet tab  ("Định lượng - <TICKER>")
```

Deployment order matters: **code on disk → unit up → :80 vhost → certbot → edit generated :443 vhost →
htpasswd → reload**. Issuing the cert before the `:80` namevhost exists fails, because Apache's default
vhost 301s the challenge to another host.

## Related Code Files

**Create in repo (tracked, so the server config is reproducible):**
- `deploy/mydailyagent-quantification.service`
- `deploy/apache-quantification.conf` (`:80`)
- `deploy/apache-quantification-le-ssl.conf` (`:443`, cert paths filled after issuance)
- `deploy/README-quantification-deploy.md` (exact command sequence + rollback)

**Create on server (not in repo):**
- `/etc/systemd/system/mydailyagent-quantification.service`
- `/etc/apache2/sites-available/quantification.conf`
- `/etc/apache2/sites-available/quantification-le-ssl.conf`
- `/etc/apache2/.htpasswd-quantification` (root:root 0644, hash only)
- `/etc/letsencrypt/live/quantification.youragentstore.net/*`

**Create locally (gitignored plaintext + committed `.enc`):**
- `config/.quantification-auth.json` → `config/.quantification-auth.json.enc`

**Do not touch:** `dailyagent*.conf`, `admin*.conf`, `staging*.conf`,
`mypersonalfootballcoach.com*.conf`, `/etc/apache2/.htpasswd`, `mydailyagent-web.service`.

## Implementation Steps

1. **Pre-flight** on mpfc: `ss -tlnp | grep 3335` (must be empty), `dig +short quantification.youragentstore.net`,
   `sudo apache2ctl -S`, `systemctl is-active mydailyagent-web` (record the baseline), `git -C /var/www/MyDailyAgent status`.
2. **Credentials**: generate locally —
   `user=quant-$(openssl rand -hex 3)`, `pass=$(openssl rand -base64 24 | tr -d '/+=' | cut -c1-24)`.
   Write `config/.quantification-auth.json` `{"domain":"quantification.youragentstore.net","username":...,"password":...,"created":"2026-07-..","note":"Apache Basic Auth for the quantification web UI"}`.
   Then `bash scripts/encrypt-secrets.sh config/.quantification-auth.json` (explicit single-file arg —
   bulk mode is intentionally disabled, `scripts/encrypt-secrets.sh:12-17`). Verify
   `git status --short config/` shows **only** the `.enc` file.
3. **Ship code**: commit + push from the workstation, then on mpfc `git -C /var/www/MyDailyAgent pull`.
   Confirm `web-quantification/server.js` and `config/finance-quantification.json` both landed (the
   latter proves the `.gitignore` allowlist from phase 02 worked). No `npm install` — deps already present.
4. **Unit**: install `mydailyagent-quantification.service` (copy of `mydailyagent-web.service` with
   `Description`, `Environment=QUANT_PORT=3335`, `ExecStart=/usr/bin/node /var/www/MyDailyAgent/web-quantification/server.js`),
   `systemctl daemon-reload && systemctl enable --now`, then `curl -s 127.0.0.1:3335/healthz`.
5. **`:80` vhost**: copy `dailyagent.conf` structure exactly (`RewriteCond %{REQUEST_URI} !^/.well-known/acme-challenge/`
   + `RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]`), ServerName
   `quantification.youragentstore.net`, `DocumentRoot /var/www/html` for the challenge.
   `a2ensite quantification` → `apache2ctl configtest` → `systemctl reload apache2`.
   Verify: `curl -H 'Host: quantification.youragentstore.net' http://127.0.0.1/.well-known/acme-challenge/probe`
   now returns **404 from our vhost**, not the old 301 to mypersonalfootballcoach.com.
6. **Certificate**: `sudo certbot --apache -d quantification.youragentstore.net --non-interactive
   --agree-tos` — the LE account (`02c1fed6…`) is already registered on this host, so certbot reuses it
   and `-m` is not required. **If certbot nevertheless demands an email address, STOP and ask the user**
   — do not invent one and do not use `--register-unsafely-without-email` (it would create a second,
   notification-less account).
   If HTTP-01 fails because Cloudflare forces HTTPS on this zone, fall back in order:
   (a) `certbot certonly --webroot -w /var/www/html -d ...`;
   (b) ask the user to grey-cloud the DNS record for 10 minutes, re-run, then re-enable proxy;
   (c) Cloudflare Origin CA cert (last resort — diverges from the house pattern, note it in docs).
7. **`:443` vhost**: certbot generates `quantification-le-ssl.conf`; edit it to match
   `dailyagent-le-ssl.conf` — add `Header always set X-Robots-Tag "noindex, nofollow, noarchive"`,
   `<Location />` Basic Auth block with `AuthName "Quantification"` and
   `AuthUserFile /etc/apache2/.htpasswd-quantification`, `ProxyPreserveHost On`,
   `ProxyPass / http://127.0.0.1:3335/ flushpackets=on`, `ProxyPassReverse`. Keep the certbot
   `SSLCertificate*` lines and `Include /etc/letsencrypt/options-ssl-apache.conf`.
8. **htpasswd**: `sudo htpasswd -cb /etc/apache2/.htpasswd-quantification <user> <pass>`;
   `sudo chmod 644` / `chown root:root`. Confirm `/etc/apache2/.htpasswd` is byte-identical to its
   pre-change state (`md5sum` before/after) — the shared file must not be touched.
9. `apache2ctl configtest` → `systemctl reload apache2`. Then verify (from the workstation):
   `curl -o /dev/null -w '%{http_code}' https://quantification.youragentstore.net/` → **401**;
   with `-u user:pass` → **200**; wrong password → **401**;
   `curl -s -N -u ... https://.../api/run/<id>/stream` streams incrementally (not buffered).
10. **Renewal**: `sudo certbot renew --dry-run` must pass for the new domain, and
    `/etc/letsencrypt/renewal/quantification.youragentstore.net.conf` must show
    `authenticator = apache`.
11. **E2E through the domain**: log in, run `FPT`, watch the 5 steps arrive **one at a time** (proves
    Cloudflare + `flushpackets=on` are not buffering the SSE stream), open the resulting tab link.
    Runs take seconds now, so the Cloudflare 100 s idle limit is not exercised — verify incremental
    delivery instead of long-lived-connection survival.
12. **Regression**: `https://dailyagent.mypersonalfootballcoach.com/` still 401→200 with its own
    credentials; `systemctl is-active mydailyagent-web` still active; `apache2ctl -S` shows the five
    original vhosts unchanged plus ours.
13. Copy the three final server files back into `deploy/` in the repo (source of truth for rebuilds)
    and commit.

## Todo List

- [ ] 1. Pre-flight snapshot (ports, dig, `apache2ctl -S`, service states, `md5sum /etc/apache2/.htpasswd`)
- [ ] 2. Generate + store + encrypt credentials; confirm plaintext is gitignored
- [ ] 3. Push + `git pull` on mpfc; verify both new files landed
- [ ] 4. systemd unit + `/healthz` check
- [ ] 5. `:80` vhost + configtest + reload + ACME-path probe
- [ ] 6. certbot issue (with documented fallbacks)
- [ ] 7. Edit generated `:443` vhost (proxy + auth + robots header)
- [ ] 8. Separate `.htpasswd-quantification`; prove shared file untouched
- [ ] 9. configtest + reload + 401/200/stream verification
- [ ] 10. `certbot renew --dry-run`
- [ ] 11. E2E run through the public domain (>100 s stream)
- [ ] 12. Regression checks on dailyagent + admin + staging
- [ ] 13. Mirror final configs into `deploy/` and commit

## Success Criteria

- `https://quantification.youragentstore.net/` → 401 without credentials, 200 with them, valid cert
  (`openssl s_client` shows the LE chain for this exact domain).
- SSE steps arrive incrementally through Cloudflare (not batched at completion).
- A full `FPT` run through the public domain completes in < 30 s and writes the tab.
- `systemctl is-enabled mydailyagent-quantification` → enabled; survives `systemctl restart`.
- `certbot renew --dry-run` passes for the new domain.
- The dailyagent UI and the four other vhosts behave exactly as in the pre-flight snapshot;
  `/etc/apache2/.htpasswd` md5 unchanged.
- `config/.quantification-auth.json.enc` committed; plaintext absent from `git status`.
- Credentials delivered to the user in the final summary.

### Test matrix

| Level | What | How |
|---|---|---|
| Config | apache syntax | `apache2ctl configtest` before every reload |
| Smoke | app alive | `curl 127.0.0.1:3335/healthz` |
| Auth | 401/200/wrong-pass | `curl -o /dev/null -w '%{http_code}'` ×3 |
| TLS | cert subject + chain + expiry | `openssl s_client -servername ... -connect ...:443` |
| Streaming | no buffering | `curl -N` on the SSE endpoint; steps must arrive one at a time |
| Regression | other vhosts + services | pre/post `apache2ctl -S`, `systemctl is-active`, `md5sum .htpasswd` |
| Renewal | future-proofing | `certbot renew --dry-run` |
| Reboot | persistence | `systemctl is-enabled` (full reboot optional, coordinate with user) |

## Risk Assessment

| Risk | L×I | Mitigation |
|------|-----|-----------|
| Apache reload breaks the five live vhosts (incl. the football-coach production site) | L×**H** | `configtest` before every reload; `reload` not `restart`; only *new* files added, none edited; pre-flight `apache2ctl -S` snapshot for diffing; rollback = `a2dissite quantification && reload` |
| certbot HTTP-01 fails because the `youragentstore.net` CF zone forces HTTPS (different zone from the proven one, and we hold no API token for it) | **M**×M | Three documented fallbacks (webroot / grey-cloud / Origin CA); do not retry blindly — LE has rate limits (5 failures/hour/account) |
| certbot rewrites/relocates config unexpectedly (it edits vhosts in place) | M×M | Take `tar` backup of `/etc/apache2/sites-available` + `sites-enabled` before running certbot; the account is already registered so no new-account side effects |
| Cloudflare buffers the SSE stream | L×M | `flushpackets=on` (proven on dailyagent) + 15s heartbeat; explicit incremental-delivery test. 524 is no longer a realistic risk since runs take seconds |
| Basic Auth added to the wrong scope / cross-granting the shared realm | L×H | Separate `AuthUserFile`; md5 check on the shared file; test that dailyagent credentials do **not** open the new domain and vice versa |
| Generated plaintext credentials leaked into git or a report file | L×**H** | `.gitignore:12` already covers `config/*.json` (verified: `git check-ignore -v config/.quantification-auth.json` → matched); only `.enc` committed; never echo into `plans/` or `reports/` |
| Shared `node_modules` — an `npm install` would restart-risk the live dailyagent app | L×M | Hard rule: zero new dependencies (phase 03); no `npm install` step in this phase |
| Server load from concurrent runs | L×L | Children are short-lived node processes doing ~6 HTTP calls; cap 3 + 90 s timeout (phase 03); check `free -h`/`df -h` in pre-flight anyway |
| `youragentstore.net` may host other services the user cares about | L×M | Only a subdomain vhost is added; apex untouched; `dig` recorded in pre-flight |

## Security Considerations

- Credentials auto-generated with `openssl rand`, 24-char password, stored only as (a) gitignored
  plaintext locally, (b) AES-256-CBC `.enc` in git, (c) bcrypt/MD5-crypt hash in the server htpasswd.
- Separate auth realm — no credential reuse with dailyagent/admin.
- `X-Robots-Tag: noindex, nofollow, noarchive` + `robots.txt` `Disallow: /`.
- App binds `127.0.0.1` (phase 03) and is reachable only via the proxy: confirm
  `curl http://142.93.46.109:3335/` from outside fails.
- The app spawns **only** a fixed, deterministic script with a regex-validated ticker argument — no
  agent, no shell, no `--dangerously-skip-permissions`, no client-supplied command or path. Basic Auth
  plus that single-argument surface is the whole exposure.
- No secret ever passed as a systemd `Environment=` value (only the port).

## Rollback

1. `sudo a2dissite quantification quantification-le-ssl && sudo apache2ctl configtest && sudo systemctl reload apache2`
   → domain falls back to the default vhost's 401; all other sites unaffected.
2. `sudo systemctl disable --now mydailyagent-quantification` → port 3335 freed.
3. `sudo rm /etc/apache2/.htpasswd-quantification` (optional).
4. Cert can stay (harmless) or `sudo certbot delete --cert-name quantification.youragentstore.net`.
5. Repo: revert the deploy commit. Restore `/etc/apache2` from the pre-certbot tar if certbot edited
   anything unexpected.

## Next Steps

- Unblocks phase 05 (docs + memory need the final port, domain, unit name, and file paths).
- Backlog: add the new domain/service to whatever `/me:server-monitor` checks, so an outage is noticed.

## Decisions (locked)

- certbot reuses the already-registered LE account; no `-m` supplied. If certbot demands an email, that
  is a **hard stop → ask the user** (step 6), not a guess.
- Cloudflare proxy stays enabled for this hostname.
- Adding the service to `/me:server-monitor` is backlog, not part of this plan.

No open questions.
