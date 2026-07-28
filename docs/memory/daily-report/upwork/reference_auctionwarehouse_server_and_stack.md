---
name: reference_auctionwarehouse_server_and_stack
description: "Auction Warehouse (Brad Ballantine) server + codebase facts: SSH host auctionwarehouse.com.au, Laravel 5.8 in ~/auctionwarehouse, docroot ~/public_html, plus the open-registration → unvalidated-upload → webshell security hole found 2026-07-28"
metadata:
  type: reference
---

Client site for [[project_brad_ballantine_new_sites]]. Audited read-only 2026-07-28.

**Access:** `ssh auctionwarehouse.com.au` (already in `~/.ssh/config`: 74.91.194.157, user `auctionw`, key `~/.ssh/store/auctionwarehouse`, passphrase per [[feedback_ssh_passphrase_in_config]]). cPanel shared hosting `sh00084.cd.ds.network`.

**Stack:** Laravel **5.8** app in `~/auctionwarehouse` (git repo live on the server), docroot `~/public_html` holds only the front controller + uploaded media. Web PHP handler is **alt-php74**; CLI is 8.3. DB `auctionw_new_auctions` (creds in `~/auctionwarehouse/.env`), tables: auctions / users / migrations / password_resets / failed_jobs.

**Key files:** `routes/web.php` (49 lines, all routes), `app/Http/Controllers/SiteController.php` (public pages), `AuctionsController.php` (admin CRUD, multi-image + pdf + video upload), `resources/views/auction.blade.php` = the `/upcoming-auctions` page, `resources/views/layouts/pages.blade.php` = 3-column layout with the hardcoded `/images/upcoming_page/1-8.jpg` side columns.
Uploads land in `public_html/{auction_image,pdf,video}` (134M / 12M / 130M) named `date('YmdHis')-originalname`. Shared disk was **88% full**.

**🔴 Security holes still open as of 2026-07-28 (reported to no one yet, nothing changed):**
- `/register` public (200) + `AuctionsController` gated on plain `auth` → any self-registered visitor is an admin. 6 unknown accounts registered 2023–2026-06.
- pdf/video uploads have **no mime/extension validation** (only `photos.*` is validated) and keep the original filename → executable drop into a web-served dir.
- Exploited already: `~/.quarantine` holds `20251004135939-2.php` (JPEG/PHP polyglot matching this app's exact upload naming), `content.php` (remote eval loader), `lukaku.php`, `lazy.php` etc; attacker leftover `public_html/pdf/core/.htaccess` re-allows PHP in the upload dir.
- `.env` has `APP_ENV=local` + `APP_DEBUG=true` in production.

Full write-up + effort estimate: `reports/2026-07-28/1115-auctionwarehouse-code-analysis-and-quote.md`.
