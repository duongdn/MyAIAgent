#!/bin/bash
# 04 — Move the side apps (MyDailyAgent web + automations, quantification web, MyBussinessAiAgent code) from live to the NEW server.
# Run as root on the NEW server.
# Usage: bash 04-move-side-apps.sh --prepare    packages + code/data copy; NOTHING is started (safe to run any time, re-runnable)
#        bash 04-move-side-apps.sh --activate   at cutover: final delta sync, stop on live, start here (crontab, services, vhosts)
# Never have both servers running the crons: the automations send Slack/Matrix/email messages (would be sent twice).
source "$(dirname "$0")/lib.sh"
MODE=${1:-}
[ "$MODE" = --prepare ] || [ "$MODE" = --activate ] || die "usage: $0 --prepare|--activate"
APPS=(/var/www/MyDailyAgent /var/www/MyBussinessAiAgent)
DOT=(.claude .claude.json .claudekit .config .ssh .gitconfig .local .cache)   # .cache: puppeteer Chrome, chrome profiles, gh, elena-repo
UNITS=(mydailyagent-web quantification-web)
SITES=(dailyagent quantification)
ART2=/root/upgrade/side-apps; mkdir -p "$ART2"

sync_data() {
  for d in "${APPS[@]}"; do
    log "04: rsync $d"
    mkdir -p "$d"
    rc=0; rsync -a --delete --rsync-path="sudo rsync" -e "ssh -i $LIVE_KEY" --exclude=node_modules/.cache "$LIVE_SSH:$d/" "$d/" || rc=$?
    [ $rc = 0 ] || [ $rc = 24 ] || die "rsync $d failed ($rc)"
    chown -R mpfc:root "$d"
  done
  log "04: /home/mpfc dotfiles (${DOT[*]})"
  for f in "${DOT[@]}"; do
    rsync -a --rsync-path="sudo rsync" -e "ssh -i $LIVE_KEY" "$LIVE_SSH:/home/mpfc/$f" /home/mpfc/ 2>/dev/null || log "   skip $f (missing)"
  done
  chown -R mpfc:mpfc /home/mpfc
}

if [ "$MODE" = --prepare ]; then
  log "04: packages (Chrome, Xvfb, x11vnc, gh, fonts)"
  if ! command -v google-chrome >/dev/null; then
    curl -fsSL https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-chrome.gpg
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome.gpg] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list
  fi
  apt-get update -q && DEBIAN_FRONTEND=noninteractive apt-get install -y -q google-chrome-stable xvfb x11vnc gh fonts-liberation fonts-noto-color-emoji >/dev/null
  log "04: global npm packages (same set as live)"
  npm i -g --silent $(live "npm ls -g --depth=0 --json" | jq -r '.dependencies | to_entries[] | select(.key|test("^(npm|corepack)$")|not) | "\(.key)@\(.value.version)"')

  sync_data

  log "04: htpasswd, systemd units, vhosts + certs (copied, NOT enabled/started)"
  for f in .htpasswd .htpasswd-quantification; do live "sudo cat /etc/apache2/$f" > /etc/apache2/$f; done
  chmod 644 /etc/apache2/.htpasswd*
  for u in "${UNITS[@]}"; do live "systemctl cat $u | grep -v '^#'" > /etc/systemd/system/$u.service; done
  for s in "${SITES[@]}"; do for c in "$s.conf" "$s-le-ssl.conf"; do live "cat /etc/apache2/sites-available/$c" > /etc/apache2/sites-available/$c; done; done
  rsync -a --rsync-path="sudo rsync" -e "ssh -i $LIVE_KEY" "$LIVE_SSH:/etc/letsencrypt/" /etc/letsencrypt/
  systemctl daemon-reload
  # Xvfb :1 + x11vnc for the logged-in browser sessions (live: started by hand, VNC open on 0.0.0.0 without password)
  cat > /etc/systemd/system/mpfc-xvfb.service <<'EOF'
[Unit]
Description=Xvfb :1 for MyDailyAgent browser sessions
[Service]
User=mpfc
ExecStart=/usr/bin/Xvfb :1 -screen 0 1280x800x24 -ac
Restart=always
[Install]
WantedBy=multi-user.target
EOF
  cat > /etc/systemd/system/mpfc-x11vnc.service <<'EOF'
[Unit]
Description=x11vnc on :1 (localhost only — use an SSH tunnel)
After=mpfc-xvfb.service
Requires=mpfc-xvfb.service
[Service]
User=mpfc
ExecStart=/usr/bin/x11vnc -display :1 -nopw -localhost -rfbport 5900 -forever -xkb
Restart=always
[Install]
WantedBy=multi-user.target
EOF
  systemctl daemon-reload
  live "crontab -l" > "$ART2/mpfc-crontab.txt"
  log "04: prepared. crontab saved to $ART2/mpfc-crontab.txt (not installed). Run --activate at cutover."
  exit 0
fi

# ---- --activate (cutover)
log "04: stop side apps on live (crontab backed up, services stopped + disabled)"
# backup only a non-empty crontab (re-runs must not overwrite the backup with an empty one)
live 'c=$(crontab -l 2>/dev/null); if [ -n "$c" ]; then echo "$c" > ~/mpfc-crontab.backup-$(date +%Y%m%d); crontab -r; fi'
# bracket patterns so pkill never matches this ssh command line itself
live "sudo systemctl disable --now ${UNITS[*]}; pkill -u mpfc -f '[w]eb/server.js'; pkill -u mpfc -f '[w]eb-quantification/server.js'; sudo pkill -x x11vnc; true"
sync_data
log "04: start here"
crontab -u mpfc "$ART2/mpfc-crontab.txt"
systemctl enable --now mpfc-xvfb mpfc-x11vnc "${UNITS[@]}"
for s in "${SITES[@]}"; do a2ensite -q "$s" "$s-le-ssl"; done
apachectl configtest && systemctl reload apache2
for p in 3334 3335; do curl -s -o /dev/null -w "port $p -> %{http_code}\n" "http://127.0.0.1:$p/"; done
log "04: done — now point Cloudflare DNS dailyagent.mypersonalfootballcoach.com + quantification.youragentstore.net to this server"
