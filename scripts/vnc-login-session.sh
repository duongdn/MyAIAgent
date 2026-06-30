#!/bin/bash
# Start VNC on existing Xvfb :1 for browser-based login sessions.
# Allows you to connect via any VNC viewer and run login scripts interactively.
#
# Usage:
#   bash scripts/vnc-login-session.sh [workstream|upwork|both]
#
# Then from your machine:
#   vncviewer SERVER_IP:5901
#   (or use Remmina / RealVNC / TigerVNC)
#
# Press Ctrl+C here when done to stop VNC.

PROJECT_DIR="/var/www/MyDailyAgent"
ACCOUNT="${1:-both}"

# Ensure Xvfb :1 is running
if [ ! -S /tmp/.X11-unix/X1 ]; then
  echo "[vnc] Starting Xvfb :1..."
  sudo Xvfb :1 -screen 0 1280x900x24 -ac &
  XVFB_PID=$!
  sleep 2
else
  XVFB_PID=""
  echo "[vnc] Xvfb :1 already running"
fi

export DISPLAY=:1

# Kill any stale x11vnc
pkill -f "x11vnc.*:1" 2>/dev/null
sleep 1

SERVER_IP=$(hostname -I | awk '{print $1}')
echo ""
echo "┌─────────────────────────────────────────────────┐"
echo "│  VNC server starting on port 5901               │"
echo "│  Connect from your machine:                     │"
echo "│    vncviewer ${SERVER_IP}:5901           │"
echo "│                                                 │"
echo "│  No password — LAN/trusted network only         │"
echo "└─────────────────────────────────────────────────┘"
echo ""

# Start x11vnc (no password, local display, one connection at a time)
x11vnc -display :1 -forever -nopw -listen 0.0.0.0 -rfbport 5901 \
  -shared -bg -o /tmp/x11vnc.log 2>/dev/null
sleep 2

echo "[vnc] VNC ready. Running login script(s)..."
echo ""

run_workstream() {
  echo "==> Workstream login (browser will appear in VNC)"
  DISPLAY=:1 node "$PROJECT_DIR/scripts/workstream-login.js"
  echo "==> Workstream login done (exit $?)"
}

run_upwork() {
  echo "==> Upwork login — carrick account (browser will appear in VNC)"
  DISPLAY=:1 node "$PROJECT_DIR/scripts/upwork-login.js" --login --account=carrick
  echo "==> Upwork login done (exit $?)"
}

case "$ACCOUNT" in
  workstream) run_workstream ;;
  upwork)     run_upwork ;;
  both)       run_workstream; echo ""; run_upwork ;;
  *)
    echo "Usage: $0 [workstream|upwork|both]"
    ;;
esac

echo ""
echo "[vnc] Done. Stopping VNC..."
pkill -f "x11vnc.*:1" 2>/dev/null

if [ -n "$XVFB_PID" ]; then
  kill "$XVFB_PID" 2>/dev/null
fi

echo "[vnc] Session complete."
