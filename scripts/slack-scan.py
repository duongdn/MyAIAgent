#!/usr/bin/env python3
"""Slack workspace scanner using search.messages API."""

import requests
import json
import sys
from datetime import datetime, timezone, timedelta

TZ = timezone(timedelta(hours=7))
NOW = datetime.now(TZ)
CUTOFF_DT = datetime(2026, 4, 8, 9, 30, 0, tzinfo=TZ)
CUTOFF_TS = CUTOFF_DT.timestamp()
SEARCH_DATE = "2026-04-07"  # after: excludes named date

import os
from pathlib import Path

# Workspace lookup hints (no secrets — tokens loaded from config/.slack-accounts.json)
LOOK_FOR = {
    "Baamboozle": "general activity",
    "RDC - FM Monitoring": "dmetiner updates",
    "Swift Studio": "Carrick activity",
    "Xtreme Soft Solutions": "Kai daily report",
    "SAM GUARD - Mobile": "Elena/DP activity",
    "GLOBAL GRAZING SERVICES": "Nick daily report in #maintenance",
    "Amazing Meds": "general activity",
    "Generator": "Elliott/Violet activity",
    "LegalAtoms": "Nick-specific mentions only",
    "MyPersonalFootballCoach": "general activity",
    "William Bills": "Oliver/Lucas tasks",
    "Equanimity": "Carrick/Marcel alerts",
    "SoCal Auto Wraps": "general activity",
    "Aigile Dev": "general activity",
}

def load_workspaces():
    """Load workspace configs from config/.slack-accounts.json."""
    config_path = Path(__file__).resolve().parent.parent / "config" / ".slack-accounts.json"
    with open(config_path) as f:
        data = json.load(f)
    workspaces = []
    for acct in data["accounts"]:
        ws = {
            "name": acct["workspace"],
            "token": acct["token"],
            "look_for": LOOK_FOR.get(acct["workspace"], "general activity"),
        }
        if acct.get("cookie"):
            ws["cookie"] = acct["cookie"]
        workspaces.append(ws)
    return workspaces

WORKSPACES = load_workspaces()


def search_slack(ws):
    """Search a single Slack workspace."""
    headers = {"Authorization": f"Bearer {ws['token']}"}
    if ws.get("cookie"):
        headers["Cookie"] = ws["cookie"]

    query = f"after:{SEARCH_DATE}"
    params = {"query": query, "sort": "timestamp", "sort_dir": "desc", "count": 100}

    try:
        resp = requests.post(
            "https://slack.com/api/search.messages",
            headers=headers,
            data=params,
            timeout=30,
        )
        data = resp.json()
    except Exception as e:
        return {"name": ws["name"], "error": str(e), "msgs": [], "count": 0}

    if not data.get("ok"):
        error = data.get("error", "unknown")
        return {"name": ws["name"], "error": error, "msgs": [], "count": 0}

    matches = data.get("messages", {}).get("matches", [])
    # Filter by cutoff timestamp
    filtered = []
    for m in matches:
        ts = float(m.get("ts", 0))
        if ts >= CUTOFF_TS:
            filtered.append(m)

    total = data.get("messages", {}).get("total", 0)

    # Extract key info from top messages
    summaries = []
    for m in filtered[:5]:
        user = m.get("username", m.get("user", "unknown"))
        text = m.get("text", "")[:200].replace("\n", " ").strip()
        channel = m.get("channel", {}).get("name", "?") if isinstance(m.get("channel"), dict) else "?"
        ts_val = float(m.get("ts", 0))
        dt = datetime.fromtimestamp(ts_val, tz=TZ)
        summaries.append({
            "user": user,
            "channel": channel,
            "text": text,
            "time": dt.strftime("%H:%M"),
        })

    return {
        "name": ws["name"],
        "error": None,
        "msgs": summaries,
        "count": len(filtered),
        "total_api": total,
        "look_for": ws.get("look_for", ""),
    }


def check_daily_report_kai(results):
    """Check if Kai posted daily report in Xtreme."""
    for r in results:
        if r["name"] == "Xtreme Soft Solutions":
            if r.get("error"):
                return f"⚠️ ERROR: {r['error']}"
            for m in r["msgs"]:
                text_lower = m["text"].lower()
                if any(kw in text_lower for kw in ["progress", "daily report", "daily", "update", "done", "completed", "working on"]):
                    if "kai" in m["user"].lower() or "kai" in text_lower:
                        return "✓ found"
            # Check if any message at all
            if r["count"] > 0:
                # Check all messages text for Kai
                return "⚠️ NOT FOUND (messages exist but no Kai daily report detected)"
            return "⚠️ NOT FOUND (no messages in scan window)"
    return "⚠️ NOT FOUND (workspace not scanned)"


def check_daily_report_nick_ggs(results):
    """Check if Nick posted daily report in GGS #maintenance."""
    for r in results:
        if r["name"] == "Global Grazing Services":
            if r.get("error"):
                return f"⚠️ ERROR: {r['error']}"
            for m in r["msgs"]:
                if m["channel"] == "maintenance":
                    user_lower = m["user"].lower()
                    text_lower = m["text"].lower()
                    if any(n in user_lower for n in ["nick", "carrick", "nuscarrick", "nus"]):
                        return "✓ found"
                    if any(n in text_lower for n in ["nick", "carrick"]):
                        return "✓ found"
            if r["count"] > 0:
                return "⚠️ NOT FOUND (messages exist but no Nick daily report in #maintenance)"
            return "⚠️ NOT FOUND (no messages in scan window)"
    return "⚠️ NOT FOUND (workspace not scanned)"


def main():
    print(f"Scanning {len(WORKSPACES)} Slack workspaces...")
    print(f"Cutoff: {CUTOFF_DT.isoformat()} (epoch: {CUTOFF_TS})")
    print(f"Search query: after:{SEARCH_DATE}")
    print()

    results = []
    for ws in WORKSPACES:
        print(f"  Scanning {ws['name']}...", end=" ", flush=True)
        r = search_slack(ws)
        status = f"error: {r['error']}" if r.get("error") else f"{r['count']} msgs"
        print(status)
        results.append(r)

    # Build report
    timestamp = NOW.strftime("%H:%M")
    lines = []
    lines.append(f"## Slack (all) — {timestamp} (+07:00)\n")
    lines.append("| Workspace | Msgs | Key content |")
    lines.append("|-----------|------|-------------|")

    alerts = []

    for r in results:
        name = r["name"]
        if r.get("error"):
            count_str = f"ERR"
            content = f"**Auth error:** `{r['error']}`"
            # Auth failure = HIGH alert
            if r["error"] in ("invalid_auth", "not_authed", "token_revoked", "account_inactive"):
                alerts.append(f"**HIGH** — {name}: authentication failure (`{r['error']}`)")
        else:
            count_str = str(r["count"])
            if r["count"] == 0:
                content = "No messages in scan window"
            else:
                # Summarize top 2-3 messages
                snippets = []
                for m in r["msgs"][:3]:
                    text_short = m["text"][:120]
                    snippets.append(f"[#{m['channel']}] {m['user']} ({m['time']}): {text_short}")
                content = " | ".join(snippets)
                # Truncate total content
                if len(content) > 300:
                    content = content[:297] + "..."

        lines.append(f"| {name} | {count_str} | {content} |")

    # Daily report checks
    kai_status = check_daily_report_kai(results)
    nick_status = check_daily_report_nick_ggs(results)

    if "NOT FOUND" in kai_status:
        alerts.append(f"**HIGH** — Kai (Xtreme) daily report: {kai_status}")
    if "NOT FOUND" in nick_status:
        alerts.append(f"**HIGH** — Nick (GGS #maintenance) daily report: {nick_status}")

    lines.append("")
    lines.append("### Alerts")
    if alerts:
        for a in alerts:
            lines.append(f"- {a}")
    else:
        lines.append("No alerts.")

    lines.append("")
    lines.append("### Daily report checks")
    lines.append(f"- Kai (Xtreme): {kai_status}")
    lines.append(f"- Nick (GGS #maintenance): {nick_status}")
    lines.append("")

    report = "\n".join(lines)
    print("\n" + report)

    # Write to file
    outpath = "/home/nus/projects/My-AI-Agent/reports/2026-04-09/slack-results.md"
    with open(outpath, "w") as f:
        f.write(report)
    print(f"\nWritten to {outpath}")

    # Also dump raw JSON for debugging
    raw_path = "/home/nus/projects/My-AI-Agent/reports/2026-04-09/slack-raw.json"
    # Serialize results
    with open(raw_path, "w") as f:
        json.dump(results, f, indent=2, default=str)


if __name__ == "__main__":
    main()
