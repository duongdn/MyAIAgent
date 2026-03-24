#!/usr/bin/env python3
"""Scan Discord and Redmine with proper user-agent headers."""
import urllib.request, json, ssl, urllib.parse

ctx = ssl.create_default_context()
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"

def api_get(url, headers, timeout=10):
    headers["User-Agent"] = UA
    req = urllib.request.Request(url, headers=headers)
    try:
        resp = urllib.request.urlopen(req, timeout=timeout, context=ctx)
        return json.loads(resp.read()), None
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:300]
        return None, f"HTTP {e.code}: {body[:100]}"
    except Exception as e:
        return None, str(e)[:200]

print("=== DISCORD ===")
discord_accounts = [
    {"user": "nusvinn", "token": "DISCORD_TOKEN_NUSVINN"},
    {"user": "nuscarrick", "token": "DISCORD_TOKEN_NUSCARRICK"}
]

for acct in discord_accounts:
    data, err = api_get("https://discord.com/api/v10/users/@me", {"Authorization": acct["token"]})
    if err:
        print(f"[{acct['user']}] {err}")
    else:
        print(f"[{acct['user']}] Token valid: {data.get('username')}")

print()
print("=== REDMINE ===")
params = urllib.parse.urlencode({
    "updated_on": ">=2026-03-24T07:30:00Z",
    "sort": "updated_on:desc",
    "limit": "10"
})
data, err = api_get(
    f"https://redmine.nustechnology.com/issues.json?{params}",
    {"X-Redmine-API-Key": "REDMINE_API_KEY"}
)
if err:
    print(f"ERROR: {err}")
else:
    issues = data.get("issues", [])
    print(f"OK - {len(issues)} issues updated")
    for i in issues:
        iid = i["id"]
        subj = i.get("subject", "")[:80]
        priority = i.get("priority", {}).get("name", "")
        status = i.get("status", {}).get("name", "")
        print(f"  #{iid} [{priority}] [{status}] {subj}")
