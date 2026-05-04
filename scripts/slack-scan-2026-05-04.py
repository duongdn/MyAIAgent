#!/usr/bin/env python3
"""Slack 10-day catch-up scan for 2026-05-04 daily report.

Window: 2026-04-24 08:50:00 +07 -> 2026-05-04 08:09:00 +07.
Holidays: 2026-04-30 (Thu), 2026-05-01 (Fri).
Workdays in window: Apr 24 (partial), Apr 27, 28, 29, May 4 (partial).
"""
import json
import os
import time
import urllib.request
import urllib.parse
import urllib.error
import ssl
import sys

CUTOFF_EPOCH_START = 1776995400  # 2026-04-24 08:50:00 +07
CUTOFF_EPOCH_END = 1777885740   # 2026-05-04 08:09:00 +07
QUERY = "after:2026-04-23"  # day before window start (slack `after:` excludes named day)

ssl_ctx = ssl.create_default_context()
CONFIG_PATH = os.path.join(os.path.dirname(__file__), "..", "config", ".slack-accounts.json")


def load_workspaces():
    with open(CONFIG_PATH, "r") as f:
        data = json.load(f)
    workspaces = []
    for acct in data.get("accounts", []):
        ws = {
            "name": acct["workspace"],
            "token": acct["token"],
            "session": acct["token"].startswith("xoxc-"),
        }
        if acct.get("cookie"):
            ws["cookie"] = acct["cookie"]
        workspaces.append(ws)
    return workspaces


def slack_search(workspace):
    name = workspace["name"]
    token = workspace["token"]
    is_session = workspace.get("session", False)
    cookie = workspace.get("cookie", "")
    all_messages = []
    page = 1
    total_pages = 1
    max_pages = 20
    while page <= total_pages and page <= max_pages:
        params = urllib.parse.urlencode({
            "query": QUERY,
            "sort": "timestamp",
            "sort_dir": "desc",
            "count": 100,
            "page": page,
        })
        url = f"https://slack.com/api/search.messages?{params}"
        req = urllib.request.Request(url)
        req.add_header("Authorization", f"Bearer {token}")
        if is_session and cookie:
            ck = cookie if "d=" in cookie else f"d={cookie}"
            req.add_header("Cookie", ck)
        try:
            resp = urllib.request.urlopen(req, timeout=30, context=ssl_ctx)
            data = json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            return {"name": name, "error": f"HTTP {e.code}", "messages": []}
        except Exception as e:
            return {"name": name, "error": str(e), "messages": []}
        if not data.get("ok"):
            err = data.get("error", "unknown")
            is_sess = " (session)" if is_session else ""
            return {"name": name, "error": f"{err}{is_sess}", "messages": []}
        matches = data.get("messages", {}).get("matches", [])
        paging = data.get("messages", {}).get("paging", {})
        total_pages = paging.get("pages", 1)
        stop = False
        for m in matches:
            ts = float(m.get("ts", 0))
            if ts >= CUTOFF_EPOCH_START and ts <= CUTOFF_EPOCH_END:
                all_messages.append(m)
            elif ts < CUTOFF_EPOCH_START:
                stop = True
                break
        if stop:
            break
        page += 1
        if page <= total_pages and page <= max_pages:
            time.sleep(0.6)
    return {"name": name, "error": None, "messages": all_messages}


def summarize(result):
    name = result["name"]
    if result["error"]:
        return {"name": name, "msgs": [], "error": result["error"], "channels": {}}
    msgs = result["messages"]
    channels = {}
    for m in msgs:
        ch = m.get("channel", {})
        ch_name = ch.get("name", "unknown") if isinstance(ch, dict) else str(ch)
        channels.setdefault(ch_name, []).append(m)
    return {"name": name, "msgs": msgs, "error": None, "channels": channels}


if __name__ == "__main__":
    workspaces = load_workspaces()
    results = []
    for ws in workspaces:
        sys.stderr.write(f"[scan] {ws['name']}...\n")
        sys.stderr.flush()
        result = slack_search(ws)
        s = summarize(result)
        results.append(s)
        sys.stderr.write(f"  -> {len(s['msgs'])} msgs error={s['error']}\n")
        sys.stderr.flush()
    # JSON dump for machine consumption
    out = []
    for r in results:
        compact_channels = {}
        for ch, ms in r["channels"].items():
            compact_channels[ch] = [
                {
                    "ts": m.get("ts"),
                    "user": m.get("username", m.get("user", "?")),
                    "text": (m.get("text", "") or "")[:300],
                }
                for m in ms[:30]
            ]
        out.append({
            "name": r["name"],
            "count": len(r["msgs"]),
            "error": r["error"],
            "channels": compact_channels,
        })
    print(json.dumps(out, indent=2, ensure_ascii=False))
