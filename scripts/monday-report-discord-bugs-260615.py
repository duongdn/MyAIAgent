#!/usr/bin/env python3
"""Fetch Discord bug reports for James Diamond (AirAgri) and Andrew Taraba (Bizurk).
Week 2026-06-08 to 2026-06-14. Read-only — no form submission or Trello changes.
"""
import json, urllib.request, urllib.parse

ACCOUNTS = json.load(open('config/.discord-accounts.json'))['accounts']

# Unix timestamps +07
TS_LO = 1749304800  # 2026-06-08 00:00 +07
TS_HI = 1749909599  # 2026-06-14 23:59 +07
DISCORD_EPOCH_MS = 1420070400000
SF_LO = (TS_LO * 1000 - DISCORD_EPOCH_MS) << 22
SF_HI = (TS_HI * 1000 - DISCORD_EPOCH_MS) << 22

KEYWORDS = ["bug","issue","fix","broken","error","problem","crash","not working","doesn't work","cannot","can't"]

def get_tok(user):
    for a in ACCOUNTS:
        if a.get('user') == user:
            return a.get('token')
    return None

def http_get(url, token):
    req = urllib.request.Request(url)
    req.add_header('Authorization', token)
    req.add_header('User-Agent', 'Mozilla/5.0')
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read())

def guild_search(token, guild_id, content_kw=None):
    base = f"https://discord.com/api/v9/guilds/{guild_id}/messages/search"
    qs = [('min_id', str(SF_LO)), ('max_id', str(SF_HI))]
    if content_kw:
        qs.append(('content', content_kw))
    url = base + '?' + urllib.parse.urlencode(qs)
    try:
        return http_get(url, token)
    except Exception as e:
        return {'error': str(e)}

def has_bug_kw(text):
    if not text: return False
    t = text.lower()
    return any(k in t for k in KEYWORDS)

def extract_bugs(search_result, label):
    if 'error' in search_result:
        print(f"  {label}: ERROR {search_result['error']}")
        return []
    messages = search_result.get('messages', [])
    bugs = []
    for group in messages:
        if isinstance(group, list):
            for m in group:
                if has_bug_kw(m.get('content','')):
                    bugs.append({
                        'author': m.get('author',{}).get('username','?'),
                        'content': (m.get('content','') or '')[:150],
                        'ts': m.get('timestamp',''),
                    })
        elif isinstance(group, dict):
            if has_bug_kw(group.get('content','')):
                bugs.append({
                    'author': group.get('author',{}).get('username','?'),
                    'content': (group.get('content','') or '')[:150],
                    'ts': group.get('timestamp',''),
                })
    total = search_result.get('total_results', len(messages))
    print(f"  {label}: {total} msgs searched, {len(bugs)} bug-related")
    return bugs

# ─── James Diamond — AirAgri (nusvinn) ───────────────────────────────────────
print("=== JAMES DIAMOND: AirAgri (nusvinn) ===")
vinn_tok = get_tok('nusvinn')
jd_bugs = []
if vinn_tok:
    AIRAGRI = '1105821508716200028'
    for kw in ['bug', 'error', 'issue', 'broken', 'fix']:
        r = guild_search(vinn_tok, AIRAGRI, kw)
        jd_bugs.extend(extract_bugs(r, f"AirAgri/{kw}"))
    # Deduplicate
    seen = set()
    jd_bugs = [b for b in jd_bugs if not (b['content'] in seen or seen.add(b['content']))]
else:
    print("  nusvinn token not found")

print(f"  => {len(jd_bugs)} distinct bug msgs for James Diamond")
for b in jd_bugs:
    print(f"    {b['author']}: {b['content'][:100]}")

# ─── Andrew Taraba — Bizurk (nuscarrick) ─────────────────────────────────────
print("\n=== ANDREW TARABA: Bizurk (nuscarrick) ===")
carrick_tok = get_tok('nuscarrick')
taraba_bugs = []
if carrick_tok:
    BIZURK = '639973831787806721'
    for kw in ['bug', 'error', 'issue', 'fix']:
        r = guild_search(carrick_tok, BIZURK, kw)
        taraba_bugs.extend(extract_bugs(r, f"Bizurk/{kw}"))
    seen = set()
    taraba_bugs = [b for b in taraba_bugs if not (b['content'] in seen or seen.add(b['content']))]
else:
    print("  nuscarrick token not found")

print(f"  => {len(taraba_bugs)} distinct bug msgs for Andrew Taraba")
for b in taraba_bugs:
    print(f"    {b['author']}: {b['content'][:100]}")

print("\n=== DISCORD BUG SUMMARY ===")
print(json.dumps({
    'James Diamond (Discord)': len(jd_bugs),
    'Andrew Taraba (Discord)': len(taraba_bugs),
}, indent=2))
