#!/usr/bin/env python3
"""Check all 6 email accounts via IMAP for the monitoring window."""

import imaplib
import email
from email.header import decode_header
from email.utils import parsedate_to_datetime
from datetime import datetime, timezone, timedelta
import re
import sys

TZ7 = timezone(timedelta(hours=7))
CUTOFF = datetime(2026, 4, 11, 8, 0, 0, tzinfo=TZ7)
IMAP_SINCE = "10-Apr-2026"

ACCOUNTS = [
    {"user": "duongdn@nustechnology.com", "pass": "rtYVkk1jmreE", "folder": "INBOX", "filter": None, "label": "duongdn@"},
    {"user": "carrick@nustechnology.com", "pass": "SNUp3Q3WAy76", "folder": "INBOX", "filter": None, "label": "carrick@"},
    {"user": "nick@nustechnology.com",    "pass": "iHWa82WJ3q5Q", "folder": "INBOX", "filter": "John Yi", "label": "nick@"},
    {"user": "rick@nustechnology.com",    "pass": "ij3s9L8AQz0Z", "folder": "INBOX", "filter": "Kunal|Fountain|InfinityRose|Rollbar|BugSnag", "label": "rick@"},
    {"user": "kai@nustechnology.com",     "pass": "JFDn4fsHiU0m", "folder": "INBOX", "filter": "Madhuraka", "label": "kai@"},
    {"user": "ken@nustechnology.com",     "pass": "WY60fEDrTfXM", "folder": "NewsLetter", "filter": "Precognize", "label": "ken@"},
]

def decode_hdr(raw):
    if raw is None:
        return ""
    parts = decode_header(raw)
    result = []
    for data, charset in parts:
        if isinstance(data, bytes):
            result.append(data.decode(charset or "utf-8", errors="replace"))
        else:
            result.append(data)
    return " ".join(result)

def check_account(acct):
    results = []
    alerts = []
    label = acct["label"]
    try:
        M = imaplib.IMAP4_SSL("imap.zoho.com", 993)
        M.login(acct["user"], acct["pass"])

        status, data = M.select(acct["folder"], readonly=True)
        if status != "OK":
            return label, 0, f"Could not open {acct['folder']}", []

        status, msg_ids = M.search(None, f'(SINCE {IMAP_SINCE})')
        if status != "OK" or not msg_ids[0]:
            M.logout()
            return label, 0, "No emails in window", []

        ids = msg_ids[0].split()

        for mid in ids:
            try:
                status, msg_data = M.fetch(mid, "(RFC822.HEADER)")
                if status != "OK":
                    continue
                raw = msg_data[0][1]
                msg = email.message_from_bytes(raw)

                date_str = msg.get("Date", "")
                try:
                    dt = parsedate_to_datetime(date_str)
                    if dt.tzinfo is None:
                        dt = dt.replace(tzinfo=timezone.utc)
                    if dt < CUTOFF:
                        continue
                except:
                    continue

                subj = decode_hdr(msg.get("Subject", ""))
                frm = decode_hdr(msg.get("From", ""))

                if acct["filter"]:
                    pattern = acct["filter"]
                    combined = f"{subj} {frm}"
                    if not re.search(pattern, combined, re.IGNORECASE):
                        continue

                results.append({
                    "date": dt.astimezone(TZ7).strftime("%m/%d %H:%M"),
                    "from": frm[:60],
                    "subject": subj[:100],
                })

                subj_lower = subj.lower()
                frm_lower = frm.lower()
                if any(k in subj_lower or k in frm_lower for k in ["rollbar", "bugsnag", "new relic", "alert", "error", "critical", "urgent", "leave request", "leave"]):
                    alerts.append(f"[{label}] {subj[:80]}")

            except Exception as e:
                pass

        M.logout()
    except Exception as e:
        return label, 0, f"ERROR: {e}", []

    if not results:
        summary = "No matching emails"
    else:
        lines = []
        for r in results[:10]:
            lines.append(f"{r['date']} — {r['subject'][:70]}")
        if len(results) > 10:
            lines.append(f"...and {len(results)-10} more")
        summary = "; ".join(lines)

    return label, len(results), summary, alerts

print("Checking 6 email accounts...", file=sys.stderr)
all_alerts = []
rows = []

for acct in ACCOUNTS:
    label, count, summary, alerts = check_account(acct)
    rows.append((label, count, summary))
    all_alerts.extend(alerts)
    print(f"  {label}: {count} emails", file=sys.stderr)

now = datetime.now(TZ7).strftime("%H:%M")
print(f"\n## Email (all) — {now} (+07:00)")
print(f"| Account | Count | Summary |")
print(f"|---------|-------|---------|")
for label, count, summary in rows:
    summary = summary.replace("|", "\\|")
    print(f"| {label} | {count} | {summary} |")

if all_alerts:
    print(f"\n**Alerts:**")
    for a in all_alerts:
        print(f"- {a}")
else:
    print(f"\nNo alerts found.")
