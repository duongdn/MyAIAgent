#!/usr/bin/env python3
"""Print Tony's Slack session d-cookie from Chrome Profile 25 (used by slack-extract-ohcleo-token.js)."""
import sys, urllib.parse
from pathlib import Path

venv = Path(__file__).parent.parent / '.claude' / 'skills' / '.venv' / 'lib'
for p in venv.glob('python*/site-packages'):
    sys.path.insert(0, str(p))

import browser_cookie3

COOKIE_FILE = '/home/nus/.config/google-chrome/Profile 25/Cookies'

for c in browser_cookie3.chrome(cookie_file=COOKIE_FILE, domain_name='.slack.com'):
    if c.name == 'd':
        print(urllib.parse.unquote(c.value), end='')
        sys.exit(0)

print('ERROR: d cookie not found', file=sys.stderr)
sys.exit(1)
