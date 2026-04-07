#!/usr/bin/env python3
"""Check 6 email accounts via IMAP SSL and produce summary."""

import imaplib
import email
from email.header import decode_header
from datetime import datetime, timezone, timedelta
import sys
import traceback

TZ7 = timezone(timedelta(hours=7))
CUTOFF = datetime(2026, 4, 6, 8, 30, 0, tzinfo=TZ7)
SINCE_STR = "06-Apr-2026"

ACCOUNTS = [
    {
        "email": "duongdn@nustechnology.com",
        "password": "rtYVkk1jmreE",
        "folder": "INBOX",
        "filter": None,
        "look_for": "leave requests, New Relic alerts",
    },
    {
        "email": "carrick@nustechnology.com",
        "password": "SNUp3Q3WAy76",
        "folder": "INBOX",
        "filter": None,
        "look_for": "Redmine bug notifications for Generator/Elliott",
    },
    {
        "email": "nick@nustechnology.com",
        "password": "iHWa82WJ3q5Q",
        "folder": "INBOX",
        "filter": "John Yi",
        "look_for": "anything from John Yi",
    },
    {
        "email": "rick@nustechnology.com",
        "password": "ij3s9L8AQz0Z",
        "folder": "INBOX",
        "filter": "Kunal|Fountain|InfinityRose",
        "look_for": "Rollbar/BugSnag production alerts",
    },
    {
        "email": "kai@nustechnology.com",
        "password": "JFDn4fsHiU0m",
        "folder": "INBOX",
        "filter": "Madhuraka",
        "look_for": "Jira/Madhuraka mentions",
    },
    {
        "email": "ken@nustechnology.com",
        "password": "WY60fEDrTfXM",
        "folder": "NewsLetter",
        "filter": "Precognize|development",
        "look_for": "Precognize GitHub PR activity",
    },
]


def decode_hdr(hdr):
    if hdr is None:
        return ""
    parts = decode_header(hdr)
    result = []
    for data, charset in parts:
        if isinstance(data, bytes):
            result.append(data.decode(charset or "utf-8", errors="replace"))
        else:
            result.append(data)
    return " ".join(result)


def parse_date(date_str):
    """Parse email Date header to datetime."""
    if not date_str:
        return None
    try:
        from email.utils import parsedate_to_datetime
        return parsedate_to_datetime(date_str)
    except Exception:
        return None


def matches_filter(msg, filter_str):
    """Check if message matches filter keywords (in From, Subject, To)."""
    if filter_str is None:
        return True
    keywords = [k.strip().lower() for k in filter_str.split("|")]
    fields = []
    for h in ["From", "Subject", "To", "Cc"]:
        v = decode_hdr(msg.get(h, ""))
        fields.append(v.lower())
    combined = " ".join(fields)
    return any(kw in combined for kw in keywords)


def check_account(acct):
    """Check one account, return (count, messages_list, error_str)."""
    msgs = []
    try:
        M = imaplib.IMAP4_SSL("imap.zoho.com", 993, timeout=30)
        M.login(acct["email"], acct["password"])

        # Select folder
        folder = acct["folder"]
        status, data = M.select(folder, readonly=True)
        if status != "OK":
            # Try quoted
            status, data = M.select(f'"{folder}"', readonly=True)
            if status != "OK":
                M.logout()
                return 0, [], f"Cannot select folder '{folder}': {data}"

        # Search
        status, data = M.search(None, f'SINCE {SINCE_STR}')
        if status != "OK":
            M.logout()
            return 0, [], f"Search failed: {data}"

        ids = data[0].split() if data[0] else []

        for mid in ids:
            status, data = M.fetch(mid, "(RFC822.HEADER)")
            if status != "OK":
                continue
            raw = data[0][1]
            msg = email.message_from_bytes(raw)

            # Filter by date
            dt = parse_date(msg.get("Date"))
            if dt and dt < CUTOFF:
                continue

            # Filter by keywords
            if not matches_filter(msg, acct["filter"]):
                continue

            from_addr = decode_hdr(msg.get("From", ""))
            subject = decode_hdr(msg.get("Subject", ""))
            date_str = msg.get("Date", "")

            msgs.append({
                "from": from_addr,
                "subject": subject,
                "date": date_str,
            })

        M.logout()
        return len(msgs), msgs, None
    except Exception as e:
        return 0, msgs, f"{type(e).__name__}: {e}"


def classify_alerts(acct, msgs):
    """Return list of alert strings for this account."""
    alerts = []
    acct_name = acct["email"].split("@")[0]

    for m in msgs:
        subj = m["subject"].lower()
        frm = m["from"].lower()

        if acct_name == "duongdn":
            # New Relic alerts
            if "new relic" in frm or "new relic" in subj or "newrelic" in frm:
                alerts.append(f"[HIGH] New Relic alert: {m['subject']}")
            # Leave requests are informational, not alerts

        elif acct_name == "carrick":
            # Redmine bug notifications
            if "bug" in subj and ("generator" in subj.lower() or "elliott" in subj.lower()):
                alerts.append(f"[MEDIUM] Redmine bug: {m['subject']}")

        elif acct_name == "rick":
            # Only production Rollbar/BugSnag alerts
            is_rollbar = "rollbar" in frm or "rollbar" in subj
            is_bugsnag = "bugsnag" in frm or "bugsnag" in subj
            if is_rollbar or is_bugsnag:
                # Skip staging
                if "staging" in subj or "staging" in frm:
                    pass  # INFO only
                elif "production" in subj or "prod" in subj:
                    alerts.append(f"[HIGH] Production error: {m['subject']}")
                # If not clearly staging, still flag
                elif is_rollbar or is_bugsnag:
                    # Check more carefully
                    if "staging" not in m["subject"].lower():
                        alerts.append(f"[MEDIUM] Possible prod error: {m['subject']}")

    return alerts


def main():
    now = datetime.now(TZ7)
    timestamp = now.strftime("%H:%M")

    results = []
    all_alerts = []

    for acct in ACCOUNTS:
        name = acct["email"].split("@")[0]
        print(f"Checking {acct['email']}...", file=sys.stderr)
        count, msgs, err = check_account(acct)

        if err:
            summary = f"ERROR: {err}"
            results.append((f"{name}@", count, summary, msgs))
        else:
            # Build summary
            if count == 0:
                summary = "No relevant emails"
            else:
                # Summarize subjects
                subjects = [m["subject"][:80] for m in msgs[:5]]
                summary = "; ".join(subjects)
                if count > 5:
                    summary += f" (+{count-5} more)"
            results.append((f"{name}@", count, summary, msgs))

        # Classify alerts
        acct_alerts = classify_alerts(acct, msgs)
        all_alerts.extend(acct_alerts)

    # Build report
    lines = []
    lines.append(f"## Email — {timestamp} (+07:00)")
    lines.append("")
    lines.append("| Account | Count | Summary |")
    lines.append("|---------|-------|---------|")
    for name, count, summary, _ in results:
        # Escape pipes in summary
        summary_esc = summary.replace("|", "\\|")
        lines.append(f"| {name} | {count} | {summary_esc} |")

    lines.append("")
    lines.append("### Alerts")
    if all_alerts:
        for a in all_alerts:
            lines.append(f"- {a}")
    else:
        lines.append("- None")

    # Add detail section for accounts with messages
    lines.append("")
    lines.append("### Details")
    for name, count, summary, msgs in results:
        if count > 0 and not summary.startswith("ERROR"):
            lines.append(f"\n**{name}** ({count} emails)")
            for m in msgs[:10]:
                lines.append(f"- [{m['date']}] From: {m['from'][:50]} — {m['subject'][:100]}")

    report = "\n".join(lines) + "\n"

    # Write to file
    outpath = "/home/nus/projects/My-AI-Agent/reports/2026-04-07/email-results.md"
    with open(outpath, "w") as f:
        f.write(report)

    print(report)
    print(f"\nWritten to {outpath}", file=sys.stderr)


if __name__ == "__main__":
    main()
