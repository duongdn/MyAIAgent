#!/usr/bin/env node
/**
 * Cross-platform desktop notification script.
 *
 * Ubuntu: notify-send (libnotify)
 * macOS:  osascript (AppleScript)
 *
 * Usage:
 *   node scripts/desktop-notify.js --title "Alert" --body "Server down" --urgency critical
 *   node scripts/desktop-notify.js --title "Info" --body "Deploy complete"
 *   node scripts/desktop-notify.js --json '{"title":"Alert","body":"msg","urgency":"critical"}'
 *   echo '{"title":"X","body":"Y"}' | node scripts/desktop-notify.js --stdin
 *
 * Urgency levels: low, normal, critical (maps to OS-specific levels)
 */

const { execSync, execFileSync } = require('child_process');
const os = require('os');
const path = require('path');

const PLATFORM = os.platform(); // 'linux' | 'darwin' | 'win32'

function sendLinux({ title, body, urgency = 'normal', icon, timeout }) {
  const args = [];

  // Map urgency
  const urgencyMap = { low: 'low', normal: 'normal', critical: 'critical' };
  args.push('-u', urgencyMap[urgency] || 'normal');

  if (icon) args.push('-i', icon);
  if (timeout) args.push('-t', String(timeout));

  args.push(title, body);

  try {
    execFileSync('notify-send', args, { stdio: 'pipe' });
    return { success: true, method: 'notify-send' };
  } catch (e) {
    // Fallback: try zenity
    try {
      execFileSync('zenity', ['--notification', `--text=${title}: ${body}`], { stdio: 'pipe' });
      return { success: true, method: 'zenity' };
    } catch {
      return { success: false, error: e.message, method: 'none' };
    }
  }
}

function sendMacOS({ title, body, urgency = 'normal', sound }) {
  // AppleScript notification
  const soundLine = urgency === 'critical'
    ? 'sound name "Funk"'
    : sound
      ? `sound name "${sound}"`
      : '';

  const script = `display notification "${body.replace(/"/g, '\\"')}" with title "${title.replace(/"/g, '\\"')}" ${soundLine}`;

  try {
    execFileSync('osascript', ['-e', script], { stdio: 'pipe' });
    return { success: true, method: 'osascript' };
  } catch (e) {
    // Fallback: terminal-notifier (homebrew)
    try {
      const tnArgs = ['-title', title, '-message', body, '-group', 'daily-alert'];
      if (urgency === 'critical') tnArgs.push('-sound', 'Funk');
      execFileSync('terminal-notifier', tnArgs, { stdio: 'pipe' });
      return { success: true, method: 'terminal-notifier' };
    } catch {
      return { success: false, error: e.message, method: 'none' };
    }
  }
}

function send(opts) {
  const { title = 'Alert', body = '', urgency = 'normal' } = opts;

  if (PLATFORM === 'linux') {
    return sendLinux(opts);
  } else if (PLATFORM === 'darwin') {
    return sendMacOS(opts);
  } else {
    // Fallback: PowerShell on Windows
    try {
      const ps = `
        [System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms') | Out-Null;
        $n = New-Object System.Windows.Forms.NotifyIcon;
        $n.Icon = [System.Drawing.SystemIcons]::Information;
        $n.Visible = $true;
        $n.ShowBalloonTip(5000, '${title}', '${body}', 'Info');
      `;
      execSync(`powershell -Command "${ps}"`, { stdio: 'pipe' });
      return { success: true, method: 'powershell' };
    } catch (e) {
      return { success: false, error: e.message, method: 'none' };
    }
  }
}

// CLI entry point
if (require.main === module) {
  const args = process.argv.slice(2);

  let opts = {};

  // Parse --json
  const jsonIdx = args.indexOf('--json');
  if (jsonIdx !== -1 && args[jsonIdx + 1]) {
    opts = JSON.parse(args[jsonIdx + 1]);
  }
  // Parse --stdin
  else if (args.includes('--stdin')) {
    const fs = require('fs');
    const input = fs.readFileSync('/dev/stdin', 'utf8').trim();
    opts = JSON.parse(input);
  }
  // Parse individual flags
  else {
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--title' && args[i + 1]) opts.title = args[++i];
      else if (args[i] === '--body' && args[i + 1]) opts.body = args[++i];
      else if (args[i] === '--urgency' && args[i + 1]) opts.urgency = args[++i];
      else if (args[i] === '--icon' && args[i + 1]) opts.icon = args[++i];
      else if (args[i] === '--sound' && args[i + 1]) opts.sound = args[++i];
      else if (args[i] === '--timeout' && args[i + 1]) opts.timeout = parseInt(args[++i]);
    }
  }

  if (!opts.title && !opts.body) {
    console.log('Usage: node desktop-notify.js --title "Title" --body "Message" [--urgency critical]');
    console.log('       node desktop-notify.js --json \'{"title":"X","body":"Y","urgency":"critical"}\'');
    console.log('       echo \'{"title":"X","body":"Y"}\' | node desktop-notify.js --stdin');
    process.exit(1);
  }

  const result = send(opts);
  console.log(JSON.stringify(result));
  process.exit(result.success ? 0 : 1);
}

module.exports = { send };
