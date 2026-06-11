#!/usr/bin/env python3
"""
Fetch OhCleo Trello board data + customer comments using Tony's Chrome Profile 25 session cookies.
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

# Lists to fetch comments from (skip Done — too many old cards)
COMMENT_LISTS = {'General todo', 'To do priority upcoming week', 'In Progress', 'Dev Done', 'Ready to test', 'Testing'}

def build_cookie_jar():
    jar = RequestsCookieJar()
    for domain in ['trello.com', 'atlassian.com', 'id.atlassian.com']:
        try:
            for c in browser_cookie3.chrome(cookie_file=COOKIE_FILE, domain_name=domain):
                jar.set(c.name, c.value, domain=c.domain, path=c.path)
        except Exception as e:
            print(f"warn: {domain}: {e}", file=sys.stderr)
    return jar

def trello_get(path, jar, headers, params=''):
    resp = requests.get(
        f'https://trello.com/1/{path}{params}',
        cookies=jar, headers=headers, timeout=15,
    )
    if resp.status_code != 200:
        raise RuntimeError(f"Trello API {resp.status_code}: {resp.text[:200]}")
    return resp.json()

def days_inactive(card, now):
    return (now - datetime.fromisoformat(card['dateLastActivity'].replace('Z', '+00:00'))).days

def fetch_comments(card_id, jar, headers):
    try:
        actions = trello_get(
            f'cards/{card_id}/actions',
            jar, headers,
            '?filter=commentCard&limit=50',
        )
        return [
            {
                'author':   a['memberCreator']['fullName'],
                'username': a['memberCreator']['username'],
                'date':     a['date'][:10],
                'time':     a['date'][11:16],
                'text':     a['data']['text'],
            }
            for a in actions
        ]
    except Exception as e:
        print(f"warn: comments for {card_id}: {e}", file=sys.stderr)
        return []

def main():
    jar     = build_cookie_jar()
    headers = {'User-Agent': 'Mozilla/5.0', 'Referer': 'https://trello.com/'}
    now     = datetime.now(timezone.utc)

    # Fetch board (lists + cards)
    d = trello_get(
        f'boards/{BOARD_ID}',
        jar, headers,
        '?lists=open&cards=visible'
        '&card_fields=name,idList,dateLastActivity,labels,shortUrl'
        '&fields=name,desc,url',
    )

    lists = d.get('lists', [])
    cards = d.get('cards', [])
    lmap  = {l['id']: l['name'] for l in lists}

    # Build per-list card data + fetch comments for active lists
    result_lists = []
    all_comments = []  # flat list across all active cards, newest first

    for lst in lists:
        list_cards = []
        for c in cards:
            if c['idList'] != lst['id']:
                continue
            card_id  = c.get('shortUrl', '').split('/')[-1]
            inactive = days_inactive(c, now)
            entry = {
                'name':         c['name'],
                'daysInactive': inactive,
                'labels':       [lb.get('name') or lb.get('color', '') for lb in c.get('labels', [])],
                'url':          c.get('shortUrl', ''),
                'stuck':        inactive >= STUCK_DAYS,
                'comments':     [],
            }
            if lst['name'] in COMMENT_LISTS:
                comments = fetch_comments(card_id, jar, headers)
                entry['comments'] = comments
                for comment in comments:
                    all_comments.append({**comment, 'card': c['name'], 'list': lst['name'], 'url': c.get('shortUrl', '')})
            list_cards.append(entry)
        result_lists.append({'name': lst['name'], 'cards': list_cards})

    # Sort flat comments newest first
    all_comments.sort(key=lambda x: x['date'] + x['time'], reverse=True)

    result = {
        'boardName':   d.get('name'),
        'boardId':     BOARD_ID,
        'boardUrl':    f'https://trello.com/b/{BOARD_ID}',
        'scannedAt':   now.isoformat(),
        'lists':       result_lists,
        'allComments': all_comments,
    }

    with open(RESULT_FILE, 'w') as f:
        json.dump(result, f, indent=2)

    # Human-readable summary to stderr
    print(f"Board: {result['boardName']}  ({result['boardUrl']})", file=sys.stderr)
    for lst in result_lists:
        stuck = sum(1 for c in lst['cards'] if c['stuck'])
        flag  = f'  ⚠️ {stuck} stuck' if stuck else ''
        print(f"  {lst['name']}: {len(lst['cards'])} cards{flag}", file=sys.stderr)

    print(f"\nComments fetched: {len(all_comments)} (from active lists)", file=sys.stderr)
    if all_comments:
        latest = all_comments[0]
        print(f"  Latest: [{latest['date']} {latest['time']}] {latest['author']} on \"{latest['card'][:45]}\"", file=sys.stderr)

    # JSON to stdout for callers
    print(json.dumps(result))

if __name__ == '__main__':
    main()
