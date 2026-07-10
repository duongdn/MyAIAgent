import json
import urllib.request

cfg = json.load(open('config/.trello-config.json'))['fountain']
key, token = cfg['api_key'], cfg['token']

for card_name_hint, card_url in [
    ("Gift of Choice (Business tab)", "g5SK007L"),
]:
    pass

# fetch actions for the two specific cards by searching board actions again with full text
board = cfg['board_id']


def get(path, extra=""):
    url = f"https://api.trello.com/1{path}?key={key}&token={token}{extra}"
    return json.load(urllib.request.urlopen(url))


actions = get(f"/boards/{board}/actions", "&filter=commentCard&limit=300")
cards_of_interest = {"Fountain - Gift of Choice (Business tab)", "Fountain - Scheduled delivery bug"}
for a in actions:
    cname = a['data']['card']['name']
    if cname in cards_of_interest:
        print(a['date'], a['memberCreator']['username'], '|', a['data']['text'][:200].replace("\n", " / "))
