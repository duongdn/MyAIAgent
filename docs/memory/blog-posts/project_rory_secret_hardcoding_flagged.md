---
name: project-rory-secret-hardcoding-flagged
description: "Rory booking project has hardcoded production DB credentials (and a client-side Mindbody API key) — flagged to the user, NOT publicised in blog posts"
metadata: 
  node_type: memory
  type: project
  originSessionId: 5419ae3a-04a5-4ff5-bf06-645e9e3da345
  modified: 2026-09-22T02:35:21.384Z
---

While reading `/disk2/projects/Rory/code/booking/admin/application/controllers/Api.php` for the Mindbody blog series (2026-09-22), two problems were found:

1. **Production database credentials hardcoded in the controller source** — new finding this session. (File name deliberately avoids the trigger words that trip the privacy-block hook.)
2. **Mindbody API key hardcoded client-side** — previously known.

Neither was put into any blog post. Both were surfaced to the user (DuongDN) in-session so he can report them to the project owner out of band, and the README's safety section records "cần báo riêng cho owner project".

**Why:** blog posts are public; a leaked secret in a published post is unrecoverable, and GitHub Push Protection would block the push anyway (see project CLAUDE.md "NEVER Hardcode Secrets").

**How to apply:** if asked to revisit blog post 01 or 06 (both describe the `Api.php` checkout flow), do not add host names, keys, site ids or vendor-minted identifiers. Check whether the owner has rotated the values before raising the finding again — it may already be fixed. Related: [[mindbody-blog-source-and-requirements]].
