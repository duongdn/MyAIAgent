---
name: feedback_redmine_curl_needs_url_encoding
description: Redmine issues.json date-range queries (created_on=><date|date) fail with HTTP 400 unless URL-encoded via curl -G --data-urlencode
metadata:
  type: feedback
---

The Redmine API date-range filter syntax `created_on=><{start}|{end}` contains `<`, `>`, `|` which are not valid raw characters in a URL query string. Building the curl command with these literally embedded (as several skill files' example commands show, e.g. monday-report's Maddy/James Diamond/Bailey sections) returns HTTP 400 with an empty body — which then breaks JSON parsing downstream with a confusing "Expecting value" error, not an obvious "bad request" signal.

**Why:** Hit this 2026-08-03 running the monday-report Redmine internal-bugs query for Maddy/James Diamond/Bailey — the skill's literal example command (`created_on=><{mon}|{sun}` appended directly into a quoted URL string) 400'd on all three projects.

**How to apply:** Always use `curl -s -G "$URL/issues.json" --data-urlencode "created_on=><START|END" --data-urlencode "project_id=..." --data-urlencode "tracker_id=1" --data-urlencode "key=$API_KEY"` (one `--data-urlencode` per param) instead of hand-building the query string. This applies to any Redmine `issues.json` call using the `><date|date` range operator, not just monday-report.
