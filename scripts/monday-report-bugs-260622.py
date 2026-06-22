#!/usr/bin/env python3
"""Fetch Redmine bugs and Slack external bugs for Monday report week 2026-06-15 to 2026-06-21.
Read-only — no form submission or Trello changes.
"""
import json, urllib.request, urllib.parse, time

REDMINE_URL = 'https://redmine.nustechnology.com'
cfg = json.load(open('config/.redmine-config.json'))
REDMINE_KEY = cfg['api_key']

SLACK_ACCOUNTS = json.load(open('config/.slack-accounts.json'))['accounts']

# Window: Mon 2026-06-15 00:00 +07 to Sun 2026-06-21 23:59 +07
# after: excludes the date itself, so use 2026-06-14 to capture Jun 15
# before: excludes the date, so use 2026-06-22 to capture Jun 21
SLACK_DATE_QUERY = "after:2026-06-14 before:2026-06-22"
# Unix timestamps UTC+7 (2026, not 2025)
TS_LO = 1781456400  # 2026-06-15 00:00:00 +07
TS_HI = 1782061199  # 2026-06-21 23:59:59 +07

def redmine_bugs(project_id):
    """Count bugs created in the reporting week."""
    params = urllib.parse.urlencode({
        'project_id': project_id,
        'tracker_id': 1,
        'created_on': '><2026-06-15|2026-06-21',
        'limit': 100,
    })
    url = f"{REDMINE_URL}/issues.json?{params}"
    req = urllib.request.Request(url)
    req.add_header('X-Redmine-API-Key', REDMINE_KEY)
    req.add_header('Content-Type', 'application/json')
    req.add_header('User-Agent', 'Mozilla/5.0')
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            d = json.loads(r.read())
            issues = d.get('issues', [])
            return len(issues), [f"#{i['id']}: {i['subject'][:70]}" for i in issues]
    except Exception as e:
        return f'ERROR:{str(e)[:80]}', []

def get_slack_token(workspace):
    for a in SLACK_ACCOUNTS:
        if a.get('workspace') == workspace:
            return a.get('token') or a.get('xoxp_token'), a.get('cookie') or a.get('xoxc_cookie')
    return None, None

def slack_search(workspace, query, description=""):
    token, cookie = get_slack_token(workspace)
    if not token:
        print(f"  [{workspace}] no token found")
        return []
    url = "https://slack.com/api/search.messages?" + urllib.parse.urlencode({
        'query': query, 'count': 50, 'sort': 'timestamp', 'sort_dir': 'asc'
    })
    req = urllib.request.Request(url)
    req.add_header('Authorization', f'Bearer {token}')
    if cookie:
        req.add_header('Cookie', f'd={cookie}')
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            data = json.loads(r.read())
    except Exception as e:
        print(f"  [{workspace}] request error: {e}")
        return []
    if not data.get('ok'):
        err = data.get('error', '?')
        print(f"  [{workspace}] Slack error: {err}")
        return []
    matches = data.get('messages', {}).get('matches', [])
    in_window = []
    for m in matches:
        try:
            ts = float(m.get('ts', 0))
        except:
            ts = 0
        if TS_LO <= ts <= TS_HI:
            user = m.get('username') or m.get('user') or ''
            chan = (m.get('channel') or {}).get('name', '')
            text = (m.get('text') or '').replace('\n', ' ')[:150]
            in_window.append({'ts': ts, 'user': user, 'chan': chan, 'text': text})
    if description:
        print(f"  [{workspace}] {description}: {data.get('messages',{}).get('total')} total, {len(in_window)} in window")
    return in_window

# ─── REDMINE BUGS ─────────────────────────────────────────────────────────────
print("\n=== REDMINE BUGS (2026-06-15 to 2026-06-21) ===")
redmine_results = {}
for name, proj_id in [
    ("Maddy", "maddy-extreme-soft-solutions"),
    ("James Diamond", "james-bonsey-jaden"),
    ("Bailey", "bailey-paturevision"),
]:
    cnt, titles = redmine_bugs(proj_id)
    redmine_results[name] = {'count': cnt, 'titles': titles}
    print(f"  {name:20s}: {cnt}")
    for t in titles:
        print(f"    {t}")
    time.sleep(0.3)

# ─── SLACK: Maddy external bugs (customer msgs from madhuraka/anomawasala) ───
print("\n=== SLACK: Maddy External Bugs (Xtreme Soft Solutions) ===")
maddy_external = []
for q in [
    f"from:@madhuraka {SLACK_DATE_QUERY}",
    f"from:@anomawasala {SLACK_DATE_QUERY}",
]:
    msgs = slack_search("Xtreme Soft Solutions", q, q)
    maddy_external.extend(msgs)

bug_kws = ['bug', 'issue', 'error', 'broken', 'fix', 'crash', 'problem', 'not work', "doesn't work", 'cannot']
maddy_ext_bugs = [m for m in maddy_external if any(k in m['text'].lower() for k in bug_kws)]
print(f"  Customer msgs in window: {len(maddy_external)}")
print(f"  Bug-related msgs: {len(maddy_ext_bugs)}")
for m in maddy_ext_bugs:
    print(f"    [{m['chan']}] {m['user']}: {m['text'][:120]}")

# ─── SLACK: Baamboozle ────────────────────────────────────────────────────────
print("\n=== SLACK: Baamboozle External Bugs ===")
baam_msgs = slack_search(
    "Baamboozle",
    f"(bug OR issue OR error OR broken OR fix OR problem OR \"not working\") {SLACK_DATE_QUERY}",
    "bug keywords"
)
print(f"  Bug-related msgs in window: {len(baam_msgs)}")
for m in baam_msgs:
    print(f"    [{m['chan']}] {m['user']}: {m['text'][:120]}")

# ─── SLACK: LegalAtoms ────────────────────────────────────────────────────────
print("\n=== SLACK: LegalAtoms External Bugs ===")
legal_msgs = slack_search(
    "LegalAtoms",
    f"(bug OR issue OR error OR broken OR fix OR problem) {SLACK_DATE_QUERY}",
    "bug keywords"
)
print(f"  Bug-related msgs in window: {len(legal_msgs)}")
for m in legal_msgs:
    print(f"    [{m['chan']}] {m['user']}: {m['text'][:120]}")

# ─── SUMMARY ──────────────────────────────────────────────────────────────────
print("\n\n=== FINAL BUG SUMMARY ===")
print(json.dumps({
    'redmine': redmine_results,
    'slack': {
        'Maddy_external': len(maddy_ext_bugs),
        'Baamboozle': len(baam_msgs),
        'LegalAtoms': len(legal_msgs),
    }
}, indent=2, ensure_ascii=False))
