---
name: Upwork hours matching task log is not an alert
description: If Upwork hours match task log hours (mapped), the absolute number or week-over-week change is irrelevant — not an alert
type: feedback
---

Upwork hour drops are NOT alerts if hours match the task log. Only flag when Upwork vs task log have a discrepancy.

**Why:** User corrected flagging Aysar 4:50 Upwork as "significant drop" — the hours matched the task log exactly (4.5h Mon + 0.33h Tue). A drop from last week is normal workload variation, not a monitoring issue.

**How to apply:** When reporting Upwork hours, compare against task log first. If mapped (matching), mark as OK regardless of week-over-week trend. Only alert on mismatches between Upwork tracked time and task log hours.
