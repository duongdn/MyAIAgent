---
name: mindbody-blog-source-and-requirements
description: "Mindbody blog series (task chientx, deadline 2026-09-23) — requirements come from the Matrix room ONLY, content must be grounded in Rory project code, not the web"
metadata: 
  node_type: memory
  type: project
  originSessionId: 5419ae3a-04a5-4ff5-bf06-645e9e3da345
  modified: 2026-09-22T02:35:11.747Z
---

Task from chientx in Matrix room "Mindbody Blog Posts", deadline **Wed 2026-09-23**. DuongDN writes 7 posts (MinhTV yielded the payments + double-booking topics because they overlap DuongDN's own).

Deliverables: `docs/blog-posts/mindbody/{posts,diagrams}/` + `README.md` index. One `.md` per post; diagrams as **separate downloadable image files** (relative link to `diagrams/*.svg`), never embedded.

Two corrections the user gave while this was being written — both still binding:
1. **"thông tin chỉ có bao nhiêu đó trong Element thôi"** — ALL requirements are in the Matrix room transcript. Do not hunt email/Google Sheets for them. (I had been doing that; wrong.)
2. **"lấy từ project Rory đó, ko phải lấy trên mạng đâu"** — content must be grounded in the real codebase at `/disk2/projects/Rory/code/`, not general/internet knowledge of Mindbody.

**Why:** the company blog's value is the concrete, verified production detail; generic platform knowledge is what everyone else already writes.

**How to apply:** before writing or revising any post in this series, grep the Rory code path listed in the README's source table and quote what is actually there. If a topic has no implementation in the codebase (e.g. Apple Wallet/PassKit — none exists), say so honestly rather than inventing grounded-sounding specifics. Never let real API keys, hosts, SiteIds, client ids, custom-payment ids, client/project names or ticket ids reach a post — placeholders only. See [[project-rory-hardcoded-credentials-flagged]].
