#!/usr/bin/env python3
"""
Export a site's session cookies from DuongDN's real Chrome profile (Profile 9,
dnduong.us@gmail.com), where the user logs in by hand. Same pattern as get-duongdn-upwork-cookies.py.

Usage: python3 scripts/get-chrome-profile9-site-cookies.py <strava|facebook>
Writes tmp/<site>-cookies.json (gitignored) in puppeteer setCookie format.
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
# site → (cookie domains, cookie that proves a live login)
SITES = {
    'strava': (['.strava.com', 'strava.com', 'www.strava.com'], '_strava4_session'),
    'facebook': (['.facebook.com', 'facebook.com', 'www.facebook.com'], 'c_user'),
}
site = sys.argv[1] if len(sys.argv) > 1 else ''
if site not in SITES:
    sys.exit(f'usage: {sys.argv[0]} <{"|".join(SITES)}>')
DOMAINS, LOGIN_COOKIE = SITES[site]
OUT_FILE = Path(__file__).resolve().parent.parent / 'tmp' / f'{site}-cookies.json'

cookies, seen = [], set()
for domain in DOMAINS:
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
                'httpOnly': bool(getattr(c, '_rest', {}).get('HttpOnly') is not None),
                **({'expires': int(c.expires)} if c.expires else {}),
            })
    except Exception as e:
        print(f"warn {domain}: {e}", file=sys.stderr)

if not any(c['name'] == LOGIN_COOKIE for c in cookies):
    sys.exit(f'no {LOGIN_COOKIE} cookie in Profile 9 — log into {site} in that Chrome profile')
OUT_FILE.write_text(json.dumps(cookies))
print(f"Wrote {len(cookies)} cookies to {OUT_FILE}")
