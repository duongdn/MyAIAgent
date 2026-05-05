"""Search Discord guilds + DMs for bug reports for week 2026-04-20 to 2026-04-26."""
import json, urllib.parse, urllib.request

ACCOUNTS = json.load(open('config/.discord-accounts.json'))['accounts']

def tok(user):
    for a in ACCOUNTS:
        if a['user'] == user:
            return a['token']
    return None

# Window: Mon 2026-04-20 00:00 +07 to Mon 2026-04-27 00:00 +07
EPOCH_LO = 1776618000
EPOCH_HI = 1777222800
DISCORD_EPOCH_MS = 1420070400000
SF_LO = (EPOCH_LO * 1000 - DISCORD_EPOCH_MS) << 22
SF_HI = (EPOCH_HI * 1000 - DISCORD_EPOCH_MS) << 22

KEYWORDS = ["bug","issue","fix","broken","error","problem","crash","not working","doesn't work","cannot","can't"]

def http(url, token):
    req = urllib.request.Request(url)
    req.add_header("Authorization", token)
    req.add_header("User-Agent", "Mozilla/5.0")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())

def guild_search(token, guild_id, author_ids=None):
    # Use guilds search endpoint with min_id and max_id
    base = f"https://discord.com/api/v9/guilds/{guild_id}/messages/search"
    params = {"min_id": str(SF_LO), "max_id": str(SF_HI)}
    if author_ids:
        for aid in author_ids:
            params.setdefault("author_id", aid)
    # Discord API requires author_id as repeated param. Fall back to single author_id if provided
    qs = []
    if author_ids:
        for aid in author_ids:
            qs.append(("author_id", aid))
    qs.append(("min_id", str(SF_LO)))
    qs.append(("max_id", str(SF_HI)))
    url = base + "?" + urllib.parse.urlencode(qs)
    return http(url, token)

def dm_messages(token, channel_id):
    # Get DM messages and filter window
    url = f"https://discord.com/api/v9/channels/{channel_id}/messages?limit=100"
    return http(url, token)

def dm_list(token):
    url = "https://discord.com/api/v9/users/@me/channels"
    return http(url, token)

def has_bug_kw(text):
    if not text: return False
    t = text.lower()
    return any(k in t for k in KEYWORDS)

# === James Diamond — nusvinn — AirAgri (1105821508716200028) ===
print("=== JAMES DIAMOND: AirAgri (nusvinn) ===")
nv = tok("nusvinn")
TARGETS_JD = {
    ".jdiamond": None,  # username only - resolve via search
    ".pauldiamond": None,
    "bellatric02": None,
}

# Discord search by author requires author_id. We don't have IDs, so:
# 1) fetch all messages in window using search with min_id/max_id, no author filter
# 2) filter client-side by username
def search_all_pages(token, guild_id):
    out = []
    offset = 0
    while True:
        qs = [("min_id", str(SF_LO)), ("max_id", str(SF_HI)), ("offset", str(offset))]
        url = f"https://discord.com/api/v9/guilds/{guild_id}/messages/search?" + urllib.parse.urlencode(qs)
        try:
            r = http(url, token)
        except Exception as e:
            print(f"  search error: {e}")
            return out
        msgs = r.get("messages", [])
        if not msgs:
            break
        for grp in msgs:
            for m in grp:
                out.append(m)
        offset += 25
        if offset >= r.get("total_results", 0):
            break
        if offset > 200:
            break
    return out

def show_filter(label, guild_id, token, usernames):
    msgs = search_all_pages(token, guild_id)
    print(f"  [{label}] guild {guild_id}: total fetched in window = {len(msgs)}")
    matched = []
    for m in msgs:
        u = (m.get("author") or {}).get("username","")
        gn = (m.get("author") or {}).get("global_name","")
        text = m.get("content","")
        ts = m.get("timestamp","")
        if u.lower() in [x.lower() for x in usernames] or gn.lower() in [x.lower() for x in usernames]:
            if has_bug_kw(text):
                matched.append((ts,u,text[:200]))
                print(f"    ** ts={ts} u={u}/{gn} :: {text[:200]}")
            else:
                print(f"       ts={ts} u={u}/{gn} :: {text[:140]}")
    print(f"  -> {len(matched)} bug-keyword messages from target users")

show_filter("JD-AirAgri", "1105821508716200028", nv, [".jdiamond",".pauldiamond","bellatric02","jdiamond","pauldiamond"])

# HOMIEAPP per prompt — but CLAUDE.md says NOT HOMIEAPP. Per prompt, search anyway, mention discrepancy.
# Skipping HOMIEAPP per CLAUDE.md (Discord: Only monitor AirAgri + Bizurk. NOT HOMIEAPP.)

# === Andrew Taraba — nuscarrick — Bizurk (639973831787806721) + DM with animeworld ===
print("\n=== ANDREW TARABA: Bizurk (nuscarrick) ===")
nc = tok("nuscarrick")

# First find DM with 'animeworld'
print("\n  Looking up DMs for nuscarrick...")
try:
    dms = dm_list(nc)
    aw_channel = None
    for c in dms:
        recips = c.get("recipients", [])
        for r in recips:
            uname = r.get("username","")
            gname = r.get("global_name","")
            if "anime" in uname.lower() or "anime" in (gname or "").lower():
                aw_channel = c.get("id")
                print(f"    found DM: id={c.get('id')} recipients={[(x.get('username'),x.get('global_name')) for x in recips]}")
                break
        if aw_channel:
            break
    if not aw_channel:
        print("    no 'anime' DM channel found, dumping recipients:")
        for c in dms[:25]:
            recips = c.get("recipients", [])
            print(f"      {c.get('id')} -> {[(x.get('username'),x.get('global_name')) for x in recips]}")
except Exception as e:
    print(f"    DM list error: {e}")
    aw_channel = None

# Bizurk guild search — Andrew Taraba related users
# Look for any user-mentions of 'andrew' or 'taraba' or bug keywords in window
print("\n  Bizurk guild search:")
msgs = search_all_pages(nc, "639973831787806721")
print(f"  total fetched = {len(msgs)}")
for m in msgs[:80]:
    u = (m.get("author") or {}).get("username","")
    gn = (m.get("author") or {}).get("global_name","")
    text = m.get("content","")
    ts = m.get("timestamp","")
    if has_bug_kw(text) or "andrew" in (text or "").lower() or "taraba" in (text or "").lower():
        print(f"    ts={ts} u={u}/{gn} :: {text[:200]}")

# DM with animeworld
if aw_channel:
    print(f"\n  DM messages from animeworld channel {aw_channel}:")
    try:
        dm_msgs = dm_messages(nc, aw_channel)
        for m in dm_msgs:
            ts = m.get("timestamp","")
            u = (m.get("author") or {}).get("username","")
            gn = (m.get("author") or {}).get("global_name","")
            text = m.get("content","")
            # filter by date string 2026-04-20..2026-04-26
            if ts and ts >= "2026-04-20" and ts < "2026-04-27":
                marker = "**" if has_bug_kw(text) else "  "
                print(f"    {marker} ts={ts} u={u}/{gn} :: {text[:240]}")
    except Exception as e:
        print(f"    DM messages error: {e}")
