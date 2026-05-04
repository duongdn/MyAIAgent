---
name: Aysar — also check Baamboozle GitHub issues
description: When checking Aysar (Baamboozle), also pull open GitHub issues from baamboozle/baamboozle-web-app and baamboozle/bbzl-web-client using carrick account
type: feedback
---

When running the Aysar piece of the daily report (Slack baamboozle + Trello "Aysar" item), also check open GitHub issues on:

- https://github.com/baamboozle/baamboozle-web-app
- https://github.com/baamboozle/bbzl-web-client

**Account:** use `carrick` GitHub account.

```bash
GH_TOKEN=$(gh auth token -h github.com -u carrick) gh api repos/baamboozle/baamboozle-web-app/issues?state=open
GH_TOKEN=$(gh auth token -h github.com -u carrick) gh api repos/baamboozle/bbzl-web-client/issues?state=open
```

**Why:** User asked to expand Aysar monitoring beyond Slack — issues filed against these two repos can flag work assigned to / blocking Aysar that wouldn't surface in Slack alone.

**How to apply:** During every daily-report run that touches Aysar (full run or `/daily-report slack baamboozle` or `/daily-report trello progress aysar`), fetch open issues from both repos with the carrick token, summarize new/recently-updated issues since the window start, and include them in the Aysar section of the report. Block Trello completion if any HIGH-severity Aysar-blocking issue is open.
