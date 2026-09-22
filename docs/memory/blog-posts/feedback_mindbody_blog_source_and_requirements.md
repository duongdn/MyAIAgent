---
name: mindbody-blog-source-and-requirements
description: "Mindbody blog series (task chientx, deadline 2026-09-23) — requirements come from the Matrix room ONLY, content must be grounded in Rory project code, not the web"
metadata: 
  node_type: memory
  type: project
  originSessionId: 5419ae3a-04a5-4ff5-bf06-645e9e3da345
  modified: 2026-09-22T02:51:31.212Z
---

Task from chientx in Matrix room "Mindbody Blog Posts", deadline **Wed 2026-09-23**. DuongDN writes 7 posts (MinhTV yielded the payments + double-booking topics because they overlap DuongDN's own).

Deliverables: `tmp/blog-posts/mindbody/{posts,diagrams}/` + `README.md` index. One `.md` per post; diagrams as **separate downloadable image files** (relative link to `diagrams/*.svg`), never embedded.

🔴 **Path moved 2026-09-22: `docs/blog-posts/` → `tmp/blog-posts/`.** The blog work is a deliverable of the Mindbody task, not part of this repo's purpose, so it lives in `tmp/` (gitignored — the `auto-commit-push.sh` hook does `git add -A` and would otherwise sweep it in every few minutes). The path was also purged from the whole git history with `git filter-repo --path docs/blog-posts --invert-paths`. Do NOT move it back under `docs/`.

Two corrections the user gave while this was being written — both still binding:
1. **"thông tin chỉ có bao nhiêu đó trong Element thôi"** — ALL requirements are in the Matrix room transcript. Do not hunt email/Google Sheets for them. (I had been doing that; wrong.)
2. **"lấy từ project Rory đó, ko phải lấy trên mạng đâu"** — content must be grounded in the real codebase at `/disk2/projects/Rory/code/`, not general/internet knowledge of Mindbody.

**Why:** the company blog's value is the concrete, verified production detail; generic platform knowledge is what everyone else already writes.

**How to apply:** before writing or revising any post in this series, grep the Rory code path listed in the README's source table and quote what is actually there. Never let real API keys, hosts, SiteIds, client ids, custom-payment ids, client/project names or ticket ids reach a post — placeholders only. See [[project-rory-secret-hardcoding-flagged]].

🔴 **Verify across git branches before claiming code is absent.** I claimed "the project has no Apple Wallet/PassKit code" and was wrong — the user had written it himself. The wallet implementation lives in `booking/wallet/` (PassFactory + WebService + index.php) plus `bxr-app-2022` `src/screens/profile/Profile.js`, and the commit `3989f36` *"Implemented: add apple/google wallet generated barcode."* is on **`develop`**, not on `master` (which is what the working tree was checked out to). Lesson: run `git log --all --grep=<term>` and `git branch -a --contains <sha>` on every repo before concluding a feature does not exist. Also: `booking/` has an empty git dir (no commits) so it must be searched as plain files.

