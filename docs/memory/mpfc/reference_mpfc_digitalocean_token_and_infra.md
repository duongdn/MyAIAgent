---
name: reference_mpfc_digitalocean_token_and_infra
description: MPFC DO API token location (backup script) + infra map — managed MySQL cluster, volume, droplets, upgrade-test droplet
metadata:
  type: reference
---
- DO token: `mpfc:/var/www/mypersonalfootballcoach.com/scripts/backup_live_volume.php` (Bearer dop_v1_...). Local `config/.digitalocean-config.json` (+ .enc committed; run decrypt-secrets.sh). Write-capable, account freelancer@MyPersonalFootballCoach.com.
- WP DB is DO Managed MySQL `db-mysql-lon1-14783` (30GB; wp_mpfc, wp_staging, apache_logs) + read replica `db-ro-mysql-lon1-25682`; NOT local mysql (local service inactive). DB firewall allows droplet tag `mpfc`.
- Site files on volume `volume-lon1-02` (200GB) at `/mnt/volume_lon1_02`, `/var/www/*` symlinked.
- Live droplet 293179468 `mpfc-live` 142.93.46.109. Upgrade test droplet 608944558 `mpfc-upgrade-test` 144.126.236.208 ($4, Ubuntu 24.04, root@ carrick key) — created 2026-10-14; delete when upgrade done.
- Plan: `plans/reports/mpfc-server-upgrade-261014-1424-survey-and-requirements.md`. Rule: never point a test WP at live `wp_mpfc` (upgrade migrations would hit live).
- Cloudflare (Freelancer acct) token: `config/.cloudflare-mpfc-config.json` (+ .enc); account-owned `cfat_` token → `/user/tokens/verify` says invalid but zone read + DNS edit WORK. Zone id ded47d2c4247118dac024d793372b069.
- Test URL https://upgrade-test.mypersonalfootballcoach.com (DNS-only, basic auth user mpfc, pass in `config/.digitalocean-config.json` basic_auth).
