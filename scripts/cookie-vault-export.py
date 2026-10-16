#!/usr/bin/env python3
"""
Export browser session cookies from the LOCAL machine's real logged-in Chrome profiles into
tmp/cookie-vault/, for the headless cron server (mpfc) to reuse. Run by cookie-vault-sync.sh.

  workstream-sso-cookies.json  Keycloak SSO (Profile 9)  -> workstream-login.js seeds these
  carrick-upwork-cookies.json  Upwork (Profile 1)        -> get-carrick-upwork-cookies.py fallback

Use system python3 (working browser_cookie3); the skill venv is ABI-broken.
"""
import json, os, sys, urllib.parse
from pathlib import Path

import browser_cookie3

ROOT = Path(__file__).resolve().parent.parent
VAULT = ROOT / 'tmp' / 'cookie-vault'
CHROME = Path.home() / '.config' / 'google-chrome'

# name -> (profile dir, cookie domains)
SOURCES = {
    'workstream-sso-cookies.json': ('Profile 9', ['auth.nustechnology.com']),
    'carrick-upwork-cookies.json': ('Profile 1', ['.upwork.com', 'upwork.com', 'www.upwork.com', 'auth.upwork.com']),
}


def export(profile, domains):
    cookie_file = CHROME / profile / 'Cookies'
    out, seen = [], set()
    for d in domains:
        for c in browser_cookie3.chrome(cookie_file=str(cookie_file), domain_name=d):
            if (c.name, c.domain) in seen or not c.value:
                continue
            seen.add((c.name, c.domain))
            out.append({
                'name': c.name,
                'value': urllib.parse.unquote(c.value) if '%' in str(c.value) else c.value,
                'domain': c.domain,
                'path': c.path or '/',
                'secure': bool(c.secure),
                'httpOnly': False,
                'expires': c.expires or -1,
            })
    return out


def main():
    VAULT.mkdir(parents=True, exist_ok=True)
    os.chmod(VAULT, 0o700)
    ok = True
    for name, (profile, domains) in SOURCES.items():
        try:
            cookies = export(profile, domains)
        except Exception as e:  # locked DB, missing profile, etc.
            print(f'FAIL {name}: {e}', file=sys.stderr)
            ok = False
            continue
        if not cookies:
            print(f'FAIL {name}: 0 cookies in {profile}', file=sys.stderr)
            ok = False
            continue
        path = VAULT / name
        path.write_text(json.dumps(cookies))
        os.chmod(path, 0o600)
        print(f'OK   {name}: {len(cookies)} cookies from {profile}')
    sys.exit(0 if ok else 1)


if __name__ == '__main__':
    main()
