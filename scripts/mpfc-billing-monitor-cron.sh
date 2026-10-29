#!/bin/bash
# Cron entry for scripts/mpfc-billing-monitor.js — installed on BOTH the mpfc server and the office PC.
# The two runs never double-send: alerts are claimed per channel in one state file on the mpfc server.
set -u
NVM_NODE=$(ls -d "$HOME"/.nvm/versions/node/*/bin 2>/dev/null | sort -V | tail -1)
export PATH="${NVM_NODE:+$NVM_NODE:}/usr/local/bin:/usr/bin:/bin"
# desktop notifications need the logged-in session (cron has no DISPLAY/DBUS)
export DISPLAY="${DISPLAY:-:1}" DBUS_SESSION_BUS_ADDRESS="${DBUS_SESSION_BUS_ADDRESS:-unix:path=/run/user/$(id -u)/bus}"
cd "$(dirname "$0")/.." || exit 1
mkdir -p tmp/alert-logs
node scripts/mpfc-billing-monitor.js >> tmp/alert-logs/mpfc-billing-monitor.log 2>&1
