# Auction Warehouse — code audit + requirement analysis + draft quote for Brad

**Run:** 2026-07-28 11:15 +07 · SSH `auctionwarehouse.com.au` (74.91.194.157, cPanel `auctionw` @ sh00084.cd.ds.network)
**Upwork thread:** https://www.upwork.com/ab/messages/rooms/room_686c7b09f86270afb8ad18426e9b33f5
**Related:** `reports/2026-07-28/1057-upwork-brad-ballantine.md`

---

## 1. Existing site — what's actually there

| Item | Finding |
|---|---|
| Stack | **Laravel 5.8** (Oct 2019), app in `~/auctionwarehouse`, docroot `~/public_html` (front controller only) |
| PHP | web handler **alt-php74** (PHP 7.4, EOL Nov 2022); CLI is 8.3 |
| DB | MySQL `auctionw_new_auctions` — 5 tables, `auctions` 44 rows (34 active), 9 users |
| Git | repo live on server, last commit `4f25c69 Update contact page`; working tree has uncommitted images + `.idea/`, `.git.zip` |
| Media | `auction_image` 134M, `video` 130M, `pdf` 12M — **disk 88% used (430G/492G)** on the shared volume |
| Env | `APP_ENV=local`, `APP_DEBUG=true` **on production** → full stack traces + config leak on any error |

**Page Brad wants changed:** `/upcoming-auctions` → `SiteController@showAuctions` → `resources/views/auction.blade.php` (57 lines) inside `layouts/pages.blade.php`.
Layout today = 3 columns: `col-md-2` static image cards **left** (`/images/upcoming_page/1-4.jpg`), `col-md-8` content, `col-md-2` static images **right** (`5-8.jpg`). Exactly the "images down both sides" Brad wants moved.

**Good news for the estimate:** the admin already does 90% of what Weekend Specials needs — `AuctionsController` (auth-protected) has multi-image upload with drag/drop + sort, **PDF upload** (`/pdf/`), **video upload** (`/video/`), active toggle. A `weekend_specials` module is a copy of this pattern, not new invention.

---

## 2. 🔴 Security — must be raised with Brad (site has been compromised before)

Evidence, not speculation:

1. **`/register` is publicly open (HTTP 200)** and `AuctionsController` only requires `auth` — *any* self-registered visitor gets full admin: create/edit/delete auctions and upload files.
2. **6 unknown accounts have self-registered** into that admin: `beef@grr.la` (2023-05), `fadeevaale@gmail.com` "developer" (2023-10), `budaklzcrew@gmail.com` "adminxps" (2025-02), `adminxp@gmail.com` (2025-09), `reg1@test.com` "adminedan" (2025-10), `zerobanter1337@gmail.com` (**2026-06-19**). Only 3 are legitimate (Brad ×2, Christine).
3. **No file-type validation on the pdf/video uploads** — `store()`/`update()` validate `photos.*` only; `$request->file('pdf')->move('../public_html/pdf/', $name)` keeps the **original filename and extension** → any authenticated user can drop an executable file into a web-served directory.
4. **Proof it was exploited:** cPanel quarantine `~/.quarantine` holds `20251004135939-2.php` — a JPEG/PHP polyglot whose name matches this app's exact upload convention (`YmdHis-originalname`) — plus `content.php` (remote `eval()` loader from `cdnjs-hadir.cloud`), `lukaku.php` (obfuscated webshell), `lazy.php`, `insurance_salvage.php`, `app.php`, `index.php`. Most recent quarantine: **2026-05-29**.
5. **Attacker leftover still on disk:** `public_html/pdf/core/.htaccess` (dated Apr 1) contains `<FilesMatch \.php$> Allow from all` — planted to keep PHP executable inside the upload dir. Directory is otherwise empty now.

Nothing was changed on the server — read-only audit only.

---

## 3. Requirements — decoded

### Job A · Weekend Specials (existing site)
From 07-20 msg: section on `/upcoming-auctions` for weekly deals — promo brochures/flyers (product + special price), the week's TikTok videos playable on the site, easy for staff to update, and move the two side image columns to one side or further down.
Implementation: `weekend_specials` table (title, price, brochure file, image, tiktok_url, week_start, sort, active) + admin CRUD cloned from Auctions + TikTok oEmbed/blockquote embed + section on the page + sidebar relayout (single sidebar or below content, responsive).

### Job B · salvagesolutions.com.au
Brad's Claude artifact = a **complete designed home page mockup** (marked "DESIGN MOCKUP · HOME PAGE"): hero "Salvage, handled by people. Not uploaded to a portal.", stats strip, problem statement, 4 × why-us, 5-step process, brand/channel protection, 6 sectors, CTA, footer (128 Milperra Road Revesby NSW, 0432 271 745, info@salvagesolutions.com.au). Nav names 4 more pages — **Our Business / Services / Sectors & Experience / Contact — which do not exist yet**.

### Job C · insurancesalvageaustralia.com.au
`ISA Text Doc1.docx` = full final copy: hero, "Who we work for" (Marine Surveyors / Loss Adjusters / Insurers), "What we handle" (9 categories SEA/ROAD/RAIL/AIR/SITE/COLD), 5-step process, brand protection, capability, contacts (Les Louisson 0432 271 745, Brad 0431 128 478). No design supplied → reuse the Salvage Solutions design system (much cheaper than designing twice).

### Job D · cross-linking
AW ↔ Salvage Solutions ↔ ISA (footer/nav "division of" links, consistent branding).

### Hosting reality check
`salvagesolutions.com.au` and `insurancesalvageaustralia.com.au` both resolve to **27.124.125.171** (Crazy Domains, nginx) and currently serve the **default parking page**. Auction Warehouse itself is on different infra (syrahost NS, cPanel at 74.91.194.157). So: domains + hosting purchased, **nothing provisioned yet** — we need the actual hosting-account login (the Crazy Domains portal login Brad sent gets us to the panel; the hosting plan type — cPanel / WordPress / plain — still has to be confirmed).

---

## 4. Effort estimate

| # | Work | Hours |
|---|---|---|
| A | Weekend Specials module + admin CRUD + TikTok embeds + sidebar relayout | 12–16 |
| B | Salvage Solutions site (home from mockup + 4 inner pages, responsive, contact form, deploy, SSL, email) | 14–18 static / 20–24 if CMS-editable |
| C | Insurance Salvage Australia site (reuses B's design system) | 10–14 |
| D | Cross-linking AW ↔ SS ↔ ISA | 1–2 |
| E | **Security remediation on AW** (close registration, roles, upload validation, purge attacker artefacts, audit users, `APP_DEBUG=false`) | 4–6 |
| | **Total** | **41–60 h** |

Sequencing recommendation: **E (urgent, small) → B (Brad's stated priority: "get it live") → C → A → D.**
Calendar: SS live ~1 week from go-ahead + final logo; ISA +3–4 days after SS sign-off; Weekend Specials 3–4 business days; E can be done immediately in parallel (half a day).

**Rate not filled in** — the draft below has `$__/h` placeholders. Brad has no active contract with us (Upwork has no open contract for this room), so a new hourly or fixed-price contract is needed either way.

---

## 4b. Task breakdown (for internal review / scope cutting)

**E · Bảo mật AW — 4–6h** (không nên cắt)
| # | Task | h |
|---|---|---|
| E1 | Tắt public `/register` (giữ login), khoá route đăng ký | 0.5 |
| E2 | Xoá 6 account lạ, đổi mật khẩu 3 account thật | 0.5 |
| E3 | Validate mime+extension cho upload pdf/video, đổi tên file random | 1.5 |
| E4 | Xoá `pdf/core/.htaccess`, thêm .htaccess chặn PHP trong 3 thư mục upload | 1 |
| E5 | `APP_ENV=production`, `APP_DEBUG=false`, clear cache | 0.5 |
| E6 | Quét lại file lạ + smoke test toàn site | 1 *(cắt được)* |

**B · Salvage Solutions — 14–18h**
| # | Task | h |
|---|---|---|
| B1 | Convert artifact HTML → template thật (tách CSS, font, ảnh, tối ưu) | 4 |
| B2 | Responsive + cross-browser | 2.5 |
| B3 | Form "Get a recovery estimate" (mail + anti-spam) | 2.5 |
| B4 | 4 trang con: Our Business / Services / Sectors / Contact | 4 *(cắt: ship single-page trước)* |
| B5 | Hosting Crazy Domains: cPanel, domain, SSL, mailbox, deploy | 2.5 |
| B6 | SEO cơ bản (title/meta/OG, sitemap, favicon) + GA | 1.5 *(cắt được)* |
| B7 | UAT + go-live | 1 |

**C · Insurance Salvage Australia — 10–14h**
| # | Task | h |
|---|---|---|
| C1 | Áp design system của B vào copy ISA (hero, who-we-work-for, 9 nhóm hàng, 5 bước, brand protection, capability) | 5 |
| C2 | Responsive | 2 |
| C3 | Form "Send us a file" (+ upload manifest/ảnh nếu Brad muốn) | 2.5 |
| C4 | Hosting/domain/SSL/mailbox/deploy | 2 |
| C5 | SEO + UAT | 1.5 *(cắt được)* |

**A · Weekend Specials — 12–16h**
| # | Task | h |
|---|---|---|
| A1 | Migration + model `weekend_specials` | 1 |
| A2 | Controller CRUD + routes (clone AuctionsController) | 3 |
| A3 | Admin form create/edit: upload brochure, giá, link TikTok, publish | 3 |
| A4 | Admin index + sort + xoá | 1.5 *(gộp vào A3 được)* |
| A5 | Section hiển thị trên /upcoming-auctions | 2 |
| A6 | Nhúng TikTok (oEmbed + lazy load) | 2 *(cắt: chỉ link ra TikTok)* |
| A7 | Dồn ảnh sidebar về 1 bên / xuống dưới + responsive | 2 |
| A8 | Test + deploy | 1.5 |

**D · Cross-link AW ↔ SS ↔ ISA — 1–2h** (footer/nav 3 site, "A division of", logo)

**Đề xuất chia phase:**
- **Phase 1 (22–28h):** E + B (single-page, bỏ B4/B6) + C → bịt lỗ hổng + 2 site mới live. Đúng thứ tự ưu tiên Brad nêu.
- **Phase 2 (17–24h):** A + B4 (4 trang con SS) + D.

## 5. What we still need from Brad

1. Hosting account login for the 2 new domains (which plan/panel), or invite `carrick@` to it.
2. Final **logos** for Salvage Solutions + ISA (the file sent is a Gemini-generated draft image) + any real photography.
3. Content for the 4 SS inner pages — or confirm SS ships as a **single-page scroll** first (faster, cheaper).
4. Mailboxes: `info@salvagesolutions.com.au`, `les@auctionwarehouse.com.au` — create or forward?
5. Weekend Specials: own page or section on Upcoming Auctions? How many specials per week? TikTok **links** (embed) vs uploaded MP4s (they're already uploading WhatsApp MP4s — 130 MB used, and disk is at 88%).
6. ABN / legal + privacy page for the 2 new sites.
7. Green light on the security work (and rotate the Crazy Domains password — it was sent in plaintext over Upwork chat).

---

## 6. Draft reply to Brad (NOT sent — needs approval + rate)

> Hi Brad,
>
> Good news — I'm back in through Crazy Domains and I've been through the site and both content docs. Here's where things stand.
>
> **1. Salvage Solutions** — your mockup is a complete home page, so most of the design decisions are already made. I'd build it exactly to that design, mobile-friendly, with a working enquiry form going to info@salvagesolutions.com.au, SSL and the "division of Auction Warehouse" links. The nav lists four more pages (Our Business, Services, Sectors & Experience, Contact) — quickest path is to launch as a single-page site first and add the inner pages after, if that suits.
>
> **2. Insurance Salvage Australia** — your text doc is complete and reads well. I'd reuse the Salvage Solutions design so both sites look like one family, which also keeps the cost down on the second site.
>
> **3. Weekend Specials on Auction Warehouse** — I'll add a Weekend Specials section you can update yourselves from the existing admin: upload the brochure/flyer with the special price, paste the TikTok link and it plays on the page, tick to publish. I'll also move the side images to one side and give the specials the width — it'll look much better on phones too.
>
> **Timeline** (from go-ahead and once I have the hosting login + final logos):
> · Salvage Solutions live — about a week
> · Insurance Salvage Australia — 3–4 days after you sign off on Salvage Solutions
> · Weekend Specials — 3–4 business days
>
> **Cost** — estimated hours: Salvage Solutions 14–18, Insurance Salvage Australia 10–14, Weekend Specials 12–16, cross-linking 1–2. At $__/hr that's roughly $____–$____ all up. Happy to do it fixed-price per site instead if you prefer certainty.
>
> **One thing I have to flag.** While reviewing the Auction Warehouse site I found the sign-up page is open to the public and anyone who registers gets full admin access — six unknown accounts have registered themselves since 2023, the most recent in June this year. The server has also quarantined several malicious PHP files, one of them uploaded through the auction upload form. Nothing is broken right now, but the door is still open. I'd like to spend 4–6 hours closing it: turn off public registration, remove the unknown accounts, lock the file uploads down to real documents/videos only, and clean up what's left behind. I'd do this first, before anything else — please let me know.
>
> Also, since you sent the Crazy Domains password over chat, it's worth changing it once we're set up.
>
> **To get moving I need:** the hosting login for the two new domains, the final logo files for both businesses, and confirmation on whether info@salvagesolutions.com.au and les@auctionwarehouse.com.au should be new mailboxes or forwarders.
>
> Thanks!

---

## Unresolved questions

1. Hourly rate to quote Brad? (no existing contract with him — nothing in config/memory to derive it from)
2. Who builds these — assign a dev, or DuongDN? Nothing scheduled.
3. Fixed-price per site vs hourly on Upwork?
4. Send the security warning to Brad now, or fix-then-tell? (recommend: tell first — it's his data and it needs his go-ahead + budget)
