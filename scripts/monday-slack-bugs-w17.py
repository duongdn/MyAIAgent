"""Search Slack workspaces for external bug reports for week 2026-04-20 to 2026-04-26."""
import json, urllib.parse, urllib.request, sys, time

ACCOUNTS = json.load(open('config/.slack-accounts.json'))['accounts']

def get_token(ws):
    for a in ACCOUNTS:
        if a['workspace'] == ws:
            return a['token'], a.get('cookie')
    return None, None

def search(token, query, count=100, cookie=None):
    url = "https://slack.com/api/search.messages?" + urllib.parse.urlencode({
        'query': query, 'count': count, 'sort': 'timestamp', 'sort_dir': 'desc'
    })
    req = urllib.request.Request(url)
    req.add_header("Authorization", f"Bearer {token}")
    if cookie:
        req.add_header("Cookie", f"d={cookie}")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())

# Window: Mon 2026-04-20 00:00 +07 to Mon 2026-04-27 00:00 +07
TS_LO = 1776618000
TS_HI = 1777222800

def in_window(ts):
    try:
        f = float(ts)
    except:
        return False
    return TS_LO <= f <= TS_HI

def show_results(label, ws, query):
    tok, cookie = get_token(ws)
    if not tok:
        print(f"[{label}] no token for {ws}")
        return
    try:
        r = search(tok, query, cookie=cookie)
    except Exception as e:
        print(f"[{label}] error: {e}")
        return
    if not r.get('ok'):
        print(f"[{label}] error: {r}")
        return
    msgs = r.get('messages', {}).get('matches', [])
    print(f"\n=== [{label}] {ws}  query='{query}'  total={r.get('messages',{}).get('total')} matches_returned={len(msgs)} ===")
    kept = []
    for m in msgs:
        ts = m.get('ts')
        in_w = in_window(ts)
        user = m.get('username') or m.get('user') or ''
        chan = (m.get('channel') or {}).get('name','')
        text = (m.get('text') or '').replace('\n',' ')[:200]
        marker = '*' if in_w else ' '
        print(f"  {marker} ts={ts} user={user} chan={chan} :: {text}")
        if in_w:
            kept.append((ts, user, chan, text))
    print(f"  -> {len(kept)} messages in window")

# === Maddy (Xtreme Soft Solutions) ===
# customer-reported by madhuraka or anomawasala
for q in [
    "from:@madhuraka after:2026-04-19 before:2026-04-27",
    "from:@anomawasala after:2026-04-19 before:2026-04-27",
    "(bug OR issue OR error OR broken OR fix) after:2026-04-19 before:2026-04-27",
]:
    show_results("Maddy", "Xtreme Soft Solutions", q)

# === Baamboozle ===
for q in [
    "(bug OR issue OR error OR broken OR fix OR not working OR problem) after:2026-04-19 before:2026-04-27",
]:
    show_results("Baamboozle", "Baamboozle", q)

# === Bailey (Xtreme Soft Solutions, Bailey-related) ===
for q in [
    "(bailey OR paturevision OR double-scan OR doublescan) after:2026-04-19 before:2026-04-27",
    "external after:2026-04-19 before:2026-04-27",
]:
    show_results("Bailey", "Xtreme Soft Solutions", q)

# === LegalAtoms (Nick-specific) ===
for q in [
    "from:@nick after:2026-04-19 before:2026-04-27",
    "(bug OR issue OR broken OR error OR not working) after:2026-04-19 before:2026-04-27",
]:
    show_results("LegalAtoms", "LegalAtoms", q)
