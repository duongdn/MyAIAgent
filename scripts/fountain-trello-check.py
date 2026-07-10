import json
import datetime
import urllib.request
import urllib.parse

cfg = json.load(open('config/.trello-config.json'))['fountain']
key, token = cfg['api_key'], cfg['token']
board = cfg['board_id']

def get(path, extra=""):
    url = f"https://api.trello.com/1{path}?key={key}&token={token}{extra}"
    return json.load(urllib.request.urlopen(url))

cards = get(f"/boards/{board}/cards", "&fields=name,dateLastActivity,idList,shortUrl")
lists = get(f"/boards/{board}/lists", "&fields=name")
list_names = {l['id']: l['name'] for l in lists}

now = datetime.datetime.now(datetime.timezone.utc)
per_list = {}
stale = []
for c in cards:
    lname = list_names.get(c['idList'], c['idList'])
    per_list[lname] = per_list.get(lname, 0) + 1
    la = datetime.datetime.fromisoformat(c['dateLastActivity'].replace('Z', '+00:00'))
    days = (now - la).days
    if days >= 5:
        stale.append((days, c['name'], lname, c['shortUrl']))

print("Total cards:", len(cards))
print("Per-list counts:")
for l, n in per_list.items():
    print(f"  {l}: {n}")

stale.sort(reverse=True)
print(f"\nStale (5+ days, {len(stale)} cards):")
for days, name, lname, url in stale[:20]:
    print(f"  {days}d [{lname}] {name} — {url}")

print("\n--- Hard-to-release: in Doing 14+ days ---")
doing_lists = [l for l in list_names.values() if 'doing' in l.lower()]
print("Doing-like lists found:", doing_lists)
for days, name, lname, url in stale:
    if 'doing' in lname.lower() and days >= 14:
        print(f"  {days}d {name} — {url}")

# Customer comments
print("\n--- Customer comments (kunalsheth, tmmckay, mike62798179, iris63293413) ---")
customers = {"kunalsheth", "tmmckay", "mike62798179", "iris63293413"}
window_start = datetime.datetime.fromisoformat("2026-07-09T09:05:00+07:00")
actions = get(f"/boards/{board}/actions", "&filter=commentCard&limit=200")
for a in actions:
    date = datetime.datetime.fromisoformat(a['date'].replace('Z', '+00:00'))
    if a['memberCreator']['username'] in customers and date.astimezone(datetime.timezone(datetime.timedelta(hours=7))) >= window_start.astimezone(datetime.timezone(datetime.timedelta(hours=7))):
        print(f"  {date.isoformat()} {a['memberCreator']['username']} on '{a['data']['card']['name']}': {a['data']['text'][:200]}")
