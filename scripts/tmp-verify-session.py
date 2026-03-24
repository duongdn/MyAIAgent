#!/usr/bin/env python3
"""Verify Slack session tokens with auth.test API."""
import urllib.request, json, ssl

ctx = ssl.create_default_context()

sessions = [
    {
        "name": "Amazing Meds",
        "token": "SLACK_SESSION_AMAZINGMEDS",
        "cookie": "d=SLACK_COOKIE_AMAZINGMEDS"
    },
    {
        "name": "Equanimity",
        "token": "SLACK_SESSION_EQUANIMITY",
        "cookie": "d=SLACK_COOKIE_EQUANIMITY"
    }
]

for s in sessions:
    headers = {
        "Authorization": f"Bearer {s['token']}",
        "Cookie": s["cookie"]
    }
    try:
        req = urllib.request.Request("https://slack.com/api/auth.test", headers=headers)
        resp = urllib.request.urlopen(req, timeout=10, context=ctx)
        data = json.loads(resp.read())
        print(f"[{s['name']}] auth.test: ok={data.get('ok')}, error={data.get('error','none')}, user={data.get('user','?')}")
    except Exception as e:
        print(f"[{s['name']}] EXCEPTION: {e}")
