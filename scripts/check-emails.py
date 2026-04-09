#!/usr/bin/env python3
"""Check 6 IMAP email accounts for daily monitoring report."""

import imaplib
import email
from email.utils import parsedate_to_datetime
from datetime import datetime, timezone, timedelta
import json
import sys
from pathlib import Path

TZ_SAIGON = timezone(timedelta(hours=7))
SCAN_FROM = datetime(2026, 4, 8, 9, 30, 0, tzinfo=TZ_SAIGON)
IMAP_SINCE = "08-Apr-2026"  # previous day for IMAP SINCE

# Account metadata (no secrets — passwords loaded from config/.email-accounts.json)
ACCOUNT_META = {
    "duongdn@nustechnology.com": {"folder": "INBOX", "label": "duongdn@", "filter_desc": "leave requests, New Relic alerts"},
    "carrick@nustechnology.com": {"folder": "INBOX", "label": "carrick@", "filter_desc": "Redmine bug notifications for Generator/Elliott"},
    "nick@nustechnology.com": {"folder": "INBOX", "label": "nick@", "filter_desc": "anything from John Yi"},
    "rick@nustechnology.com": {"folder": "INBOX", "label": "rick@", "filter_desc": "Rollbar/BugSnag PRODUCTION alerts for Fountain, InfinityRoses"},
    "kai@nustechnology.com": {"folder": "INBOX", "label": "kai@", "filter_desc": "Jira/Madhuraka mentions"},
    "ken@nustechnology.com": {"folder": "NewsLetter", "label": "ken@", "filter_desc": "Precognize GitHub PR activity"},
}

def load_accounts():
    """Load email accounts from config/.email-accounts.json, merge with metadata."""
    config_path = Path(__file__).resolve().parent.parent / "config" / ".email-accounts.json"
    with open(config_path) as f:
        data = json.load(f)
    accounts = []
    for acct in data["accounts"]:
        addr = acct["email"]
        if addr in ACCOUNT_META:
            meta = ACCOUNT_META[addr]
            accounts.append({
                "email": addr,
                "password": acct["app_password"],
                "folder": meta["folder"],
                "label": meta["label"],
                "filter_desc": meta["filter_desc"],
            })
    return accounts

ACCOUNTS = load_accounts()


def check_account(acct):
    """Check one IMAP account. Returns (count, summary_lines, alert_lines)."""
    emails_found = []
    alerts = []
    error = None

    try:
        M = imaplib.IMAP4_SSL("imap.zoho.com", 993)
        M.login(acct["email"], acct["password"])
        rv, _ = M.select(acct["folder"], readonly=True)
        if rv != "OK":
            return 0, [f"Could not select folder {acct['folder']}"], [], None

        rv, data = M.search(None, f'(SINCE "{IMAP_SINCE}")')
        if rv != "OK" or not data[0]:
            M.logout()
            return 0, ["No emails in window"], [], None

        msg_ids = data[0].split()
        for mid in msg_ids:
            rv, msg_data = M.fetch(mid, "(RFC822.HEADER)")
            if rv != "OK":
                continue
            raw = msg_data[0][1]
            msg = email.message_from_bytes(raw)

            # Parse date
            date_str = msg.get("Date", "")
            try:
                msg_date = parsedate_to_datetime(date_str)
                if msg_date.tzinfo is None:
                    msg_date = msg_date.replace(tzinfo=timezone.utc)
                if msg_date < SCAN_FROM:
                    continue
            except Exception:
                continue  # skip unparseable dates

            subject = msg.get("Subject", "(no subject)")
            # Decode subject if encoded
            decoded_parts = email.header.decode_header(subject)
            subject = ""
            for part, charset in decoded_parts:
                if isinstance(part, bytes):
                    subject += part.decode(charset or "utf-8", errors="replace")
                else:
                    subject += part

            sender = msg.get("From", "unknown")
            emails_found.append({"subject": subject, "from": sender, "date": msg_date})

        M.logout()
    except Exception as e:
        error = str(e)
        return 0, [f"ERROR: {error}"], [f"{acct['label']}: IMAP error — {error}"], error

    # Build summary
    summary_lines = []
    for em in emails_found:
        summary_lines.append(f"From: {em['from']} — {em['subject']}")

    # Detect alerts based on account
    label = acct["label"]

    if label == "duongdn@":
        for em in emails_found:
            subj_lower = em["subject"].lower()
            if "leave" in subj_lower or "nghỉ" in subj_lower:
                alerts.append(f"duongdn@: Leave request — {em['subject']}")
            if "new relic" in subj_lower:
                alerts.append(f"duongdn@: New Relic alert — {em['subject']}")

    elif label == "carrick@":
        for em in emails_found:
            subj_lower = em["subject"].lower()
            if "redmine" in subj_lower or "bug" in subj_lower or "generator" in subj_lower or "elliott" in subj_lower:
                alerts.append(f"carrick@: Redmine/Bug — {em['subject']}")

    elif label == "nick@":
        for em in emails_found:
            from_lower = em["from"].lower()
            if "john" in from_lower and "yi" in from_lower:
                alerts.append(f"nick@: Email from John Yi — {em['subject']}")

    elif label == "rick@":
        for em in emails_found:
            subj_lower = em["subject"].lower()
            is_production = "production" in subj_lower or "prod" in subj_lower
            is_staging = "staging" in subj_lower or "stage" in subj_lower
            is_error_source = any(k in subj_lower for k in ["rollbar", "bugsnag", "error", "exception"])
            is_relevant_project = any(k in subj_lower for k in ["fountain", "infinityroses", "infinity roses"])
            if is_error_source and is_production and not is_staging:
                alerts.append(f"rick@: PRODUCTION error — {em['subject']}")

    elif label == "kai@":
        for em in emails_found:
            subj_lower = em["subject"].lower()
            from_lower = em["from"].lower()
            if "jira" in subj_lower or "jira" in from_lower or "madhuraka" in subj_lower.lower():
                alerts.append(f"kai@: Jira/Madhuraka — {em['subject']}")

    elif label == "ken@":
        for em in emails_found:
            subj_lower = em["subject"].lower()
            from_lower = em["from"].lower()
            if "github" in from_lower or "pull request" in subj_lower or "pr" in subj_lower:
                alerts.append(f"ken@: GitHub PR — {em['subject']}")

    if not summary_lines:
        summary_lines = ["No relevant emails"]

    return len(emails_found), summary_lines, alerts, error


def main():
    now = datetime.now(TZ_SAIGON)
    time_str = now.strftime("%H:%M")

    table_rows = []
    all_alerts = []
    auth_errors = []

    for acct in ACCOUNTS:
        print(f"Checking {acct['email']}...", flush=True)
        count, summaries, alerts, error = check_account(acct)
        summary_text = "; ".join(summaries[:10])  # cap at 10
        if len(summaries) > 10:
            summary_text += f" (+{len(summaries)-10} more)"
        table_rows.append(f"| {acct['label']} | {count} | {summary_text} |")
        all_alerts.extend(alerts)
        if error and ("LOGIN" in error.upper() or "AUTH" in error.upper()):
            auth_errors.append(f"- **{acct['label']}**: Auth failure — {error}")

    # Build output
    lines = []
    lines.append(f"## Email (all) — {time_str} (+07:00)")
    lines.append("")
    lines.append("| Account | Count | Summary |")
    lines.append("|---------|-------|---------|")
    lines.extend(table_rows)
    lines.append("")
    lines.append("### Alerts")
    if auth_errors:
        for ae in auth_errors:
            lines.append(ae)
    if all_alerts:
        for a in all_alerts:
            lines.append(f"- {a}")
    if not all_alerts and not auth_errors:
        lines.append("No alerts.")
    lines.append("")

    output = "\n".join(lines)
    print("\n" + output)

    with open("/home/nus/projects/My-AI-Agent/reports/2026-04-09/email-results.md", "w") as f:
        f.write(output)
    print("Results written to /home/nus/projects/My-AI-Agent/reports/2026-04-09/email-results.md")


if __name__ == "__main__":
    main()
