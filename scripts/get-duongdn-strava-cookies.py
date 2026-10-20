#!/usr/bin/env python3
"""
Extract Strava session cookies from DuongDN's real Chrome profile (Profile 9,
dnduong.us@gmail.com — logged into Strava). Same pattern as get-duongdn-upwork-cookies.py.
Outputs JSON array to tmp/strava-cookies.json (gitignored).
"""
import sys, json, urllib.parse
from pathlib import Path

try:
    import browser_cookie3  # noqa: F401
except ImportError:
    venv = Path(__file__).parent.parent / '.claude' / 'skills' / '.venv' / 'lib'
    for p in venv.glob('python*/site-packages'):
        sys.path.insert(0, str(p))

import browser_cookie3

COOKIE_FILE = '/home/nus/.config/google-chrome/Profile 9/Cookies'
OUT_FILE = Path(__file__).resolve().parent.parent / 'tmp' / 'strava-cookies.json'

cookies, seen = [], set()
for domain in ['.strava.com', 'strava.com', 'www.strava.com']:
    try:
        for c in browser_cookie3.chrome(cookie_file=COOKIE_FILE, domain_name=domain):
            if (c.name, c.domain) in seen:
                continue
            seen.add((c.name, c.domain))
            cookies.append({
                'name': c.name,
                'value': urllib.parse.unquote(c.value) if '%' in str(c.value) else c.value,
                'domain': c.domain if c.domain.startswith('.') else '.' + c.domain,
                'path': c.path or '/',
                'secure': bool(c.secure),
            })
    except Exception as e:
        print(f"warn {domain}: {e}", file=sys.stderr)

if not any(c['name'] == '_strava4_session' for c in cookies):
    sys.exit('no _strava4_session cookie in Profile 9 — log into strava.com in that Chrome profile')
OUT_FILE.write_text(json.dumps(cookies))
print(f"Wrote {len(cookies)} cookies to {OUT_FILE}")
