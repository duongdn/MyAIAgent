#!/usr/bin/env python3
"""
Extract Upwork session cookies from DuongDN's real Chrome profile (Profile 9,
dnduong.us@gmail.com — confirmed live master_access_token session, Upwork
label "nus-davidb"). Same pattern as get-carrick-upwork-cookies.py.
Outputs JSON array to /tmp/duongdn-upwork-cookies.json.
"""
import sys, json, shutil, urllib.parse
from pathlib import Path

# Headless cron server (mpfc) has no Profile 9: use the cookies pushed by scripts/cookie-vault-sync.sh.
_VAULT = Path(__file__).resolve().parent.parent / 'tmp' / 'cookie-vault' / 'duongdn-upwork-cookies.json'
if not Path('/home/nus/.config/google-chrome/Profile 9/Cookies').exists():
    if _VAULT.exists():
        shutil.copy(_VAULT, '/tmp/duongdn-upwork-cookies.json')
        print(f"Wrote {len(json.load(open(_VAULT)))} cookies to /tmp/duongdn-upwork-cookies.json (from cookie vault)")
        sys.exit(0)
    print(f"No Chrome profile and no cookie vault at {_VAULT}", file=sys.stderr)
    sys.exit(1)
from pathlib import Path

try:
    import browser_cookie3  # noqa: F401
except ImportError:
    venv = Path(__file__).parent.parent / '.claude' / 'skills' / '.venv' / 'lib'
    for p in venv.glob('python*/site-packages'):
        sys.path.insert(0, str(p))

import browser_cookie3

COOKIE_FILE = '/home/nus/.config/google-chrome/Profile 9/Cookies'
OUT_FILE    = '/tmp/duongdn-upwork-cookies.json'

cookies = []
seen = set()
for domain in ['.upwork.com', 'upwork.com', 'www.upwork.com', 'auth.upwork.com']:
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
