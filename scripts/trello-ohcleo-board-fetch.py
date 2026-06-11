#!/usr/bin/env python3
"""
Fetch OhCleo Trello board data using Tony's Chrome Profile 25 session cookies.
Board: https://trello.com/b/Fv7eDVgT/app-20
No API token — uses browser_cookie3 (decrypts Chrome v11 cookies via GNOME keyring).

Usage: python3 scripts/trello-ohcleo-board-fetch.py
Output: JSON to stdout + /tmp/trello-ohcleo-result.json
"""
import sys, json
from datetime import datetime, timezone
from pathlib import Path

# Add venv to path
venv = Path(__file__).parent.parent / '.claude' / 'skills' / '.venv' / 'lib'
for p in venv.glob('python*/site-packages'):
    sys.path.insert(0, str(p))

import browser_cookie3
import requests
from requests.cookies import RequestsCookieJar

BOARD_ID    = 'Fv7eDVgT'
COOKIE_FILE = '/home/nus/.config/google-chrome/Profile 25/Cookies'
STUCK_DAYS  = 5
RESULT_FILE = '/tmp/trello-ohcleo-result.json'

def main():
    # Build cookie jar from Tony's Chrome profile
    jar = RequestsCookieJar()
    for domain in ['trello.com', 'atlassian.com', 'id.atlassian.com']:
        try:
            for c in browser_cookie3.chrome(cookie_file=COOKIE_FILE, domain_name=domain):
                jar.set(c.name, c.value, domain=c.domain, path=c.path)
        except Exception as e:
            print(f"warn: {domain}: {e}", file=sys.stderr)

    # Call Trello REST API (session cookie auth — no API key needed)
    resp = requests.get(
        f'https://trello.com/1/boards/{BOARD_ID}'
        '?lists=open&cards=visible'
        '&card_fields=name,idList,dateLastActivity,labels,shortUrl'
        '&fields=name,desc,url',
        cookies=jar,
        headers={'User-Agent': 'Mozilla/5.0', 'Referer': 'https://trello.com/'},
        timeout=15,
    )

    if resp.status_code != 200:
        print(json.dumps({'error': resp.status_code, 'text': resp.text[:200]}))
        sys.exit(1)

    d     = resp.json()
    now   = datetime.now(timezone.utc)
    lists = d.get('lists', [])
    cards = d.get('cards', [])
    lmap  = {l['id']: l['name'] for l in lists}

    def days_inactive(card):
        return (now - datetime.fromisoformat(card['dateLastActivity'].replace('Z', '+00:00'))).days

    result = {
        'boardName': d.get('name'),
        'boardId':   BOARD_ID,
        'boardUrl':  f'https://trello.com/b/{BOARD_ID}',
        'scannedAt': now.isoformat(),
        'lists': [
            {
                'name': l['name'],
                'cards': [
                    {
                        'name':         c['name'],
                        'daysInactive': days_inactive(c),
                        'labels':       [lb.get('name') or lb.get('color', '') for lb in c.get('labels', [])],
                        'url':          c.get('shortUrl', ''),
                        'stuck':        days_inactive(c) >= STUCK_DAYS,
                    }
                    for c in cards if c['idList'] == l['id']
                ],
            }
            for l in lists
        ],
    }

    with open(RESULT_FILE, 'w') as f:
        json.dump(result, f, indent=2)

    # Human-readable summary to stderr
    print(f"Board: {result['boardName']}  ({result['boardUrl']})", file=sys.stderr)
    for lst in result['lists']:
        stuck = sum(1 for c in lst['cards'] if c['stuck'])
        flag  = f'  ⚠️ {stuck} stuck' if stuck else ''
        print(f"  {lst['name']}: {len(lst['cards'])} cards{flag}", file=sys.stderr)

    # JSON to stdout for callers
    print(json.dumps(result))

if __name__ == '__main__':
    main()
