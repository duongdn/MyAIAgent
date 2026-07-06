#!/usr/bin/env python3
"""
Extract ALL Slack cookies from Chrome Profile 15 (David, davidztv19@gmail.com).
Outputs JSON array to /tmp/david-slack-cookies.json including device-trust cookies.
"""
import sys, json, urllib.parse
from pathlib import Path

venv = Path(__file__).parent.parent / '.claude' / 'skills' / '.venv' / 'lib'
for p in venv.glob('python*/site-packages'):
    sys.path.insert(0, str(p))

import browser_cookie3

COOKIE_FILE = '/home/nus/.config/google-chrome/Profile 15/Cookies'
OUT_FILE    = '/tmp/david-slack-cookies.json'

cookies = []
seen = set()
for domain in ['.slack.com', 'slack.com', 'solid-code-team.slack.com', '.solid-code-team.slack.com']:
    try:
        for c in browser_cookie3.chrome(cookie_file=COOKIE_FILE, domain_name=domain):
            key = (c.name, c.domain)
            if key in seen:
                continue
            seen.add(key)
            cookies.append({
                'name':     c.name,
                'value':    urllib.parse.unquote(c.value) if '%' in str(c.value) else c.value,
                'domain':   c.domain if c.domain.startswith('.') else '.' + c.domain,
                'path':     c.path or '/',
                'secure':   bool(c.secure),
                'httpOnly': False,
            })
    except Exception as e:
        print(f"warn {domain}: {e}", file=sys.stderr)

with open(OUT_FILE, 'w') as f:
    json.dump(cookies, f)

print(f"Wrote {len(cookies)} cookies to {OUT_FILE}")
