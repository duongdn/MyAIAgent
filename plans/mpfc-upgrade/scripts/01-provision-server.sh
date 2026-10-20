#!/bin/bash
# 01 — Provision a fresh Ubuntu 24.04 droplet to mirror the live MPFC web server (PHP 8.3 + Apache mod_php).
# Run as root on the NEW server. Idempotent. Needs lib.sh LIVE_SSH/LIVE_KEY access to copy configs from live.
# Usage: bash 01-provision-server.sh [--test]   (--test: skip live-only parts: New Relic, monit, cron, CustomLog pipe)
source "$(dirname "$0")/lib.sh"
TEST=0; [ "${1:-}" = "--test" ] && TEST=1

log "01: packages"
export DEBIAN_FRONTEND=noninteractive
timedatectl set-timezone UTC
apt-get update -q
apt-get install -yq apache2 libapache2-mod-php8.3 php8.3-cli php8.3-bcmath php8.3-curl php8.3-gd php8.3-imagick \
  php8.3-intl php8.3-mbstring php8.3-mysql php8.3-redis php8.3-soap php8.3-xml php8.3-zip \
  imagemagick ffmpeg zip unzip pv jq redis-server mysql-client certbot python3-certbot-apache composer iptables-persistent
command -v node >/dev/null || { curl -fsSL https://deb.nodesource.com/setup_22.x | bash -; apt-get install -yq nodejs; }
command -v wp >/dev/null || { curl -fsSLo /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar; chmod +x /usr/local/bin/wp; }

log "01: swap (same 8G as live; 2G on --test)"
if ! swapon --show | grep -q /swapfile; then
  fallocate -l $([ $TEST = 1 ] && echo 2G || echo 8G) /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q /swapfile /etc/fstab || echo "/swapfile none swap sw 0 0" >> /etc/fstab
fi

log "01: users (mpfc + mpfc-fpt, same as live)"
id mpfc >/dev/null 2>&1 || useradd -m -s /bin/bash -G www-data mpfc
echo "mpfc ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/90-mpfc && chmod 440 /etc/sudoers.d/90-mpfc
[ $TEST = 1 ] || { id mpfc-fpt >/dev/null 2>&1 || useradd -m -s /bin/bash -G www-data mpfc-fpt; }

log "01: php.ini (values match live php7.4 apache ini)"
for ini in /etc/php/8.3/apache2/php.ini /etc/php/8.3/cli/php.ini; do
  sed -i -E 's/^;?\s*upload_max_filesize\s*=.*/upload_max_filesize = 100M/; s/^;?\s*post_max_size\s*=.*/post_max_size = 100M/;
             s/^;?\s*max_input_vars\s*=.*/max_input_vars = 1500/; s/^;?\s*expose_php\s*=.*/expose_php = Off/' "$ini"
done
DF=$(live "grep -E '^disable_functions' /etc/php/7.4/apache2/php.ini" | sed 's/^disable_functions\s*=\s*//')
sed -i -E "s/^disable_functions\s*=.*/disable_functions = $DF/" /etc/php/8.3/apache2/php.ini

log "01: apache modules + mpm_prefork 5/5/10/150 (live values)"
a2dismod -q mpm_event mpm_worker 2>/dev/null || true
a2enmod -q mpm_prefork php8.3 rewrite ssl headers expires deflate remoteip proxy proxy_http auth_basic status
sed -i -E 's/^(\s*StartServers\s+).*/\15/; s/^(\s*MinSpareServers\s+).*/\15/; s/^(\s*MaxSpareServers\s+).*/\110/;
           s/^(\s*MaxRequestWorkers\s+).*/\1150/; s/^(\s*MaxConnectionsPerChild\s+).*/\10/' /etc/apache2/mods-available/mpm_prefork.conf
sed -i 's/^\s*DirectoryIndex .*/\tDirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm/' /etc/apache2/mods-available/dir.conf

log "01: apache2.conf custom block + vhosts + certs copied from live"
live "cat /etc/apache2/apache2.conf" > "$ART/live-apache2.conf"
[ -f /etc/apache2/apache2.conf.dist ] || cp /etc/apache2/apache2.conf /etc/apache2/apache2.conf.dist
cp "$ART/live-apache2.conf" /etc/apache2/apache2.conf   # whole file: combined+%D, mysql_custom_log, RemoteIP CF ranges
if [ $TEST = 0 ]; then
  live "sudo tar -C / -czf - etc/apache2/sites-available etc/letsencrypt" > "$ART/live-apache-sites-le.tgz"
  tar -C / -xzf "$ART/live-apache-sites-le.tgz"
  for s in $(live "ls /etc/apache2/sites-enabled/"); do a2ensite -q "$s"; done
  a2dissite -q 000-default 2>/dev/null || true
  # Live CustomLog pipes to mysql with a plaintext password: keep the behaviour, review before go-live (see runbook).
fi

log "01: unattended-upgrades — security only, no auto reboot, run at 02:00 UTC"
cat > /etc/apt/apt.conf.d/52mpfc-unattended <<'EOF'
Unattended-Upgrade::Allowed-Origins { "${distro_id}:${distro_codename}-security"; };
Unattended-Upgrade::Automatic-Reboot "false";
EOF
mkdir -p /etc/systemd/system/apt-daily-upgrade.timer.d
printf '[Timer]\nOnCalendar=\nOnCalendar=*-*-* 02:00\nRandomizedDelaySec=0\n' > /etc/systemd/system/apt-daily-upgrade.timer.d/override.conf
systemctl daemon-reload

log "01: Resque queue workers (live: 3x vendor/bin/resque started by hand from /var/www/utils/start_resque_live.sh)"
cat > /etc/systemd/system/mpfc-resque@.service <<EOF
[Unit]
Description=MPFC Resque worker %i (queue default)
After=redis-server.service
Requires=redis-server.service

[Service]
WorkingDirectory=$SITE
Environment=QUEUE=default APP_INCLUDE=resque-init.php REDIS_BACKEND=redis://localhost:6379
ExecStart=/usr/bin/php vendor/bin/resque
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
# test server: never run workers (copied DB has real device tokens -> real push notifications)
[ $TEST = 1 ] || systemctl enable mpfc-resque@1 mpfc-resque@2 mpfc-resque@3

apachectl configtest
systemctl enable --now apache2 redis-server
systemctl reload apache2
log "01: done (php $(php -r 'echo PHP_VERSION;'), $(apache2 -v | head -1))"
[ $TEST = 1 ] || log "01: TODO on prod — New Relic agent, monit, root crontab (02 prints it), mydailyagent services (if moved)"
