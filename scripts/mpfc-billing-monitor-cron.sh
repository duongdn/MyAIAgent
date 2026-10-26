#!/bin/bash
# Cron entry for scripts/mpfc-billing-monitor.js — installed on BOTH the mpfc server and the office PC.
# The two runs never double-send: alerts are claimed per channel in one state file on the mpfc server.
set -u
NVM_NODE=$(ls -d "$HOME"/.nvm/versions/node/*/bin 2>/dev/null | tail -1)
export PATH="${NVM_NODE:+$NVM_NODE:}/usr/local/bin:/usr/bin:/bin"
cd "$(dirname "$0")/.." || exit 1
mkdir -p tmp/alert-logs
node scripts/mpfc-billing-monitor.js >> tmp/alert-logs/mpfc-billing-monitor.log 2>&1
