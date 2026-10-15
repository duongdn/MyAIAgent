# Newsletter content hunt (loop until user says stop)

Criteria (Trúc, room Newsletter Inform): company overview — events, people, projects; KH khen, go-live, sáng kiến, chuyện bên lề, kỷ niệm. Priority: team PHP (LongVV, PhucVT, TuanNT, KhanhHH, LeNH).

## CURRENT RANKING (updated each round)

| # | Item | Team | Evidence |
|---|---|---|---|
| 1 | Baamboozle ~3 năm — ❤️ GÓC NGƯỜI: 08/12/2023 Carrick kể khách "My daughter is studying English at VUS in HCMC!"; 20/07/2026 DuongDN: "con của anh cũng dùng web này để học trong trung tâm anh ngữ" → con DuongDN học bằng chính sản phẩm team xây (con dev Carrick 2023 chỉ nói học VUS, KHÔNG nói dùng Baamboozle — đừng gộp). ⚠️ AnhNVN đang viết case study chính thức Baamboozle (07/2026) — báo Trúc để ko trùng. (+ 10/2025 Ronan: "Thank you Carrick, family is number one so that's no problem" — khách tử tế khi dev có việc gia đình; + Ronan 07/10/2026: "Thank you for all your great work - 5 stars"; 2024: "you're doing great work here", "users will be very happy"): 12/2023 Carrick xin thêm task → 01/2024 "I start to love this project" → "Good job Carrick", "Great job team 💜💛" (11/2025) → "Amazing Carrick!!" (09/2026) → review trên Clutch/GoodFirms (team xin 18/09/2026, Ronan "I've submitted a review - great working with you Carrick" 10/2026) | PHP | Slack Baamboozle + Matrix. HIỆN TẠI (10/2026): KhanhHH đang làm Dark Mode toàn nền tảng — "Ronan's top priority" — + AI toolbar (LanguageTool). TÁC ĐỘNG: nền tảng team góp tay (web app, ko phải game dev team của khách) được giáo viên khắp TG dùng — trường thu nhập thấp "kids love Baamboozle+" (12/2025), chuyên gia trị liệu ngôn ngữ "use it all day, every day" (03/2026), "has become such an essential part of my teaching" (05/2026) |
| 1b | 🤖 HÀNH TRÌNH AI TEAM PHP (room "Những chú voi con đáng yêu" + Technology Dept): 06/2025 DuongDN "sao dạo này AI nó ngu hơn trước", LongVV "AI bị stress giống con người nên trả lời đại :))" → 08/2025 PhucVT demo Figma MCP gen UI ("em làm chắc 1h") → 09/2025 PhucVT share guide AI review code; "Nhớ ngày nào a Dương còn chê AI chỉ generate code cơ bản"; "Welcome a Dương, qua Claude như là một nền văn minh mới 🤣"; ThiHV tiên tri "rồi sẽ có lúc anh k cần mở code editor nữa" → 12/2025 "Usage limit reach, reset at 2am — ngày nào cũng ám ảnh" → 01/2026 PhucVT "Tự nhiên rủ a Dương qua Claude Code chi, giờ thấy ảnh tốn tiền, tội nghiệp quá" → 02/2026 AI review bắt bug "nó là ý thứ 5 của con AI, nó lanh ghê" → 03/2026 PhucVT cảnh báo cả cty npm supply-chain attack + cách phòng; DuongDN cho AI agent đọc email → 05/2026 AI review hồ sơ CDF ("đọc đỡ con AI trả lời trước"); PhucVT khoe skill AI review code, DuongDN: "rồi e lấy con AI nào để review con AI mà review cái skill này 🤣" → 07/2026 cty mở LLM gateway: DuongDN "1 tuần bốc 1.6 tỷ tokens mà vẫn chạy ngon lành… from Deepseek-v1-flash with love"; share guide claude-nus-command → 10/2026 DuongDN trainer AI Agent cả cty | PHP | Matrix |
| 1c | 🌐 4 DỰ ÁN TEAM PHP LÊN CASE STUDY WEBSITE MỚI CỦA CTY (nustechnology.com/case-studies, Next.js mới): (a) Baamboozle "Building an AI-Ready Learning Platform"; (b) XID "Biometric Access Control SaaS Platform"; (c) Bailey/Paturevision "Transforming Agricultural eCommerce and Logistics" (Pháp); (d) BXR London — "boosting payments 18%, cutting booking drop-off 22%". ⚠️ trang đang có meta robots=noindex → hỏi Trúc/marketing đã chính thức launch chưa trước khi share | PHP | curl nustechnology.com sitemap 15/10/2026 |
| 1d | ✍️ BLOG KỸ THUẬT TỪ DỰ ÁN TEAM PHP trên web cty: series Mindbody (từ BXR London; DuongDN viết) — "How to keep Mindbody data in sync…" (25/09/2026), "React Native + Mindbody API: build it the secure way" (14/10/2026 — HÔM QUA); XID — "Bypassing the missing SDK: custom multi-tenant TCP server for hardware integration" (10/07/2026). (+ bài "eliminated 4.1 billion Redis calls/day with 10 lines of code, AWS -92%" 03/07 — chưa rõ team nào) | PHP/DuongDN | web blog |
| 1e | 📻 PHA "TƯỞNG KO CỨU ĐƯỢC" — RDC/FM Monitoring (Franc; LeNH xây nền 2025–06/2026, KhanhHH tiếp quản từ 07/2026 và là người xử lý vụ Power Group): 30/07/2026 khách giao 2 thiết bị giám sát sóng FM THƯƠNG MẠI ĐẦU TIÊN ở Thổ Nhĩ Kỳ (İstanbul, İzmir) chạy phần mềm team mình. Bug radio tự nhảy về 104.4 → đối tác mua phát hiện, 04/09 khách bảo "Please stop working on Power Group devices". Team vẫn truy ra root cause (race condition giữa auth reply của xdrd và tuner state), reproduce được, fix trong 1 giây; chứng minh İzmir mất RDS là lỗi phần cứng (0 frame/20s). 07/09 khách: "I've been listening to İstanbul for half an hour, and no jump to 104.4! Everything seems fine." → 10/2026 khách giao tiếp control panel + admin-v2, "Perfect!" (15/10). Thiết bị ở cả Munich (Đức). | PHP | Slack RDC 30/07–15/10/2026 |
| 2 | "Khách khen làm overnight, mình làm ban ngày" 🤣 — Chris tự chịu $13.52 phí chuyển; 29/07/2026 Milestone 1 "PASS — full chain ran clean, 9 of 9 videos ingested… Good work. $1,500 sent via Wise" | PHP (PhucVT, TienND) | Matrix Arthur 11/07/2026 |
| 3 | Bailey (Pháp, nông nghiệp — case study "Transforming Agricultural eCommerce and Logistics"): nhận dự án kẹt tiền 06/2025 → 08/2025 tích hợp vận chuyển DB Schenker: Joey "very awesome… the guys at warehouse will start shipping now" → 04/2026 "everything else is perfect… sellers will be super happy" → bonus "long and painful" maintenance → "very very very awesome" PHP upgrade (11/2025) → vẫn chạy 2026 | PHP | Matrix + Slack Grazing |
| 5 | Bé nhà Trúc tròn 1 tuổi (13/10) | People | Matrix NUS Technology 13/10/2025 |
| 6 | SangNV ❤️ ThuongNTN cưới (17/04/2026) + "cặp đôi vé số" | People | Matrix |
| 7 | Neural Contract (ContractProbe): khách nhờ nâng Laravel 10→12 ngày 24/11/2025 → xong trong ~10 ngày → thưởng $100 "Thanks for the efficient work on laravel upgrade!" (04/12/2025); DuongDN là DM, dev qua nick Carrick (chưa rõ người) | PHP | Matrix |
| 7b | James Diamond — AirAgri (nền tảng an toàn nông trại Úc; team làm từ ≥11/2023): đang chạy thật tại Select Harvests (nhà trồng hạnh nhân lớn của Úc — cơ sở Carina West, Jubilee) và JBS (thịt) — check-in công nhân/nhà thầu, báo sự cố, nút SOS/báo động thiết bị, Forms + Property QR (07/2026). Khách khen liên tục: 07/2025 khi khách thêm dev local, James khẳng định "Vinn is our lead dev and will always be — he is the architect"; "Amazing work team looking great, love the colaboration and use of AI — Better, Faster, Cheaper" (07/04/2026), "great find VINN — amazing work and amazing attention to detail" (22/05, Vinn tìm ra root cause alarm), "well done everyone" (18/08), assessments "well done works really well" (14/10) | PHP (nusvinn=LeNH?, Jeff) | Discord AirAgri |
| 7c | LongVV tự phát hiện bug OhCleo: user hủy gói vẫn được premium (thất thoát doanh thu khách) → fix, DuongDN "good job Long Vo" (14/09/2026) | PHP | Matrix OhCleo |
| 7d | XID (Marcel/Equanimity, DuongDN làm, đồng hành từ 12/2023 ~3 năm): hệ thống chấm công kết nối SGBuildex Singapore — "buildex is live" (28/05/2026), go-live công trình Sim Lian Rivelle (19/08/2026), gửi hàng trăm record/ngày | PHP/DuongDN | Slack Equanimity |
| 7f | Colin – ExcelTestZone (Aigile): đồng hành từ 04/2022 (~4.5 năm, lâu nhất tìm thấy); 10/2025 DuongDN xử lý auto-scaling AWS + stress test giả lập traffic → "everything is back to normal"; 2024 milestones trả đúng hẹn | PHP/DuongDN | Slack Aigile #etz-nus |
| 7e | 🎁 Maddy tặng quà Giáng sinh cho team PHP 2 năm liền (12/2024, 12/2025; LongVV mang lên 3L, Uyên chụp khui quà) — hợp số tháng 12 | PHP | Matrix 17–19/12/2025 |
| 7h | MPFC (MyPersonalFootballCoach, đồng hành từ 09/2022 ~4 năm): DuongDN nâng cấp PHP 8.3 + Elementor Pro 4.3.2 + MemberMouse 3.1.1 (port custom code), test toàn bộ app API, khách "looks great now" (08/10/2026) | PHP/DuongDN | git + Slack MPFC |
| 8 | Brad Ballantine khen web AW mới; PhongTB sáng kiến Figma+AI free | PHP / Company | Matrix |

💡 GÓC NHÌN: KhanhHH là "người hùng" của cả #1 (Baamboozle Dark Mode, Amazing Carrick!!) lẫn #1e (cứu thiết bị FM Thổ Nhĩ Kỳ) → có thể làm spotlight cá nhân KhanhHH tháng 10. Tư liệu thêm: làm song song nhiều dự án (BXR 08/2025, Bailey 08/2025, Colin ETZ, Elena, Aysar, RDC); tự xin làm techtalk Livewire 4 (01/2026, "techtalk chỉ cho PHP thôi á a :)"), đồng hương Kiên Giang với LeNH.

## SPOTLIGHT TỪNG THÀNH VIÊN TEAM PHP (có nguồn)
- **KhanhHH**: Baamboozle "Amazing Carrick!!" (09/2026), Dark Mode = top priority CEO (10/2026); cứu thiết bị FM thương mại đầu tiên ở Thổ Nhĩ Kỳ (09/2026); techtalk Livewire 4 (01/2026).
- **LeNH**: AirAgri — James: "Vinn is our lead dev… he is the architect" (07/2025); Senior certificate CDF (06/2025); xây nền RDC FM Monitoring; BXR 2FA go-live (03/2026).
- **PhucVT**: Arthur — "overnight push" + M1 PASS $1,500 (07/2026); người "truyền đạo AI" của team (Figma MCP 08/2025, AI review guide 09/2025, cảnh báo supply-chain 03/2026); dựng site Insurance Salvage Australia (08/2026).
- **LongVV**: Brad Ballantine khen web Auction Warehouse mới (08–09/2026); tự phát hiện lỗ hổng doanh thu subscription OhCleo (09/2026); câu kinh điển "AI bị stress giống con người".
- **TuanNT** (+ BA NUS nick "Amy" — suy luận là TrinhMTT, cần xác nhận, dev nick "Nick" trên Slack Grazing — Joey khen "thank you Amy, Nick for the great work as usual ❤️" 11/2024, "you guys are doing awesome job" 04/2025): trụ cột Bailey Console/Grazing (Rails 6 upgrade, Advanced Split Order…); khách John Yi hỏi "anyone else when Nick is on vacation?" (04/2026) = phụ thuộc vào Tuấn; quét malware repo khách (03/2026).

## ÁNH XẠ VÀO FORMAT NUS LOGBOOK (đã xem Vol.3 20/08, Vol.4 17/09)
Mục cố định: 1 NUS Recap · 2 Behind the Sprint (chuyện dự án, thích CON SỐ lớn: "11 hoạt động thiện nguyện", "2014 = MyID gắn bó lâu nhất"; Vol4: MacBook HiepNT ướt mưa) · 3 NUS Brief · 4 Upcoming · 5 The Face of NUS · 6 Mini game/Picks · 7 Confession.
Đã đăng (tránh trùng): Vol2 — "2.5 tỷ token dev đốt 2 tuần" (→ bỏ con số 1.6 tỷ của mình), "2 tháng team Ronnie chưa biết làm gì với bonus", ThanhNX CTFL, PhuongPVT face; outfit DuongDN qua các năm (Vol3), BA Trainer TuanTT (Vol4), Growth Mentorship, Trung Thu, HangNTT/HaVS face.
→ Đề xuất gửi Trúc cho Vol.5 (tháng 10):
- **Behind the Sprint (con số)**: "6.348 tin nhắn" (XID/Marcel, 3 năm) · "3 năm, 3.400+ tin, 5★" (Baamboozle) · "104.4" (tần số radio ma ám — RDC Thổ Nhĩ Kỳ) · "249 PR merged 2026" (nick team PHP) · "4 case study" team PHP trên web mới.
- **Behind the Sprint (chuyện)**: "khách khen làm overnight" (Arthur) hoặc "Istanbul không còn nhảy về 104.4" (RDC).
- **The Face of NUS**: KhanhHH (spotlight — Baamboozle + RDC).
- **Confession/vui**: "lấy con AI nào review con AI mà review cái skill này?" 🤣
- **Recap**: con Trúc tròn 1 tuổi (13/10); Mindbody blog mới (14/10).

## TIN NHẮN SẴN GỬI TRÚC (room Newsletter Inform — CHƯA GỬI, chờ DuongDN duyệt)
Hi Trúc, team PHP gửi em ít "tư liệu" cho Vol.5 nha 😄
**Behind the Sprint – con số:**
• 104.4 — tần số "ma ám": thiết bị giám sát sóng FM thương mại đầu tiên ở Thổ Nhĩ Kỳ (dự án RDC) cứ tự nhảy về 104.4 đúng lúc đối tác mua đang xem. KhanhHH lần ra lỗi "race condition", sửa xong khách nhắn: "I've been listening to İstanbul for half an hour, and no jump to 104.4!"
• 3 năm – 3.400+ tin nhắn – 5★: hành trình với Baamboozle (nền tảng game học tập giáo viên khắp thế giới dùng). Tháng 9 khách: "Amazing Carrick!!", tháng 10 review 5★. Con anh cũng đang học bằng chính web này 🥰
• 6.348 tin nhắn trong 3 năm với khách XID (Singapore) — hệ thống chấm công kết nối SGBuildex
• 4 dự án team PHP đã lên case study trên web mới của cty (Baamboozle, XID, Paturevision, BXR)
**Chuyện bên lề:** Khách Meta-Stamp cảm ơn team vì "the overnight push" — trong khi team toàn làm giờ hành chính 🤣 (lệch múi giờ cũng là lợi thế!)
**Confession/vui:** "Rồi em lấy con AI nào để review con AI mà review cái skill này?" — 1 năm hành trình AI của team PHP, từ "dạo này AI ngu hơn trước" (06/2025) tới đứng lớp AI Agent cho cả cty (10/2026)
**NUS Brief / Upcoming:** Chương trình đào tạo AI nội bộ — 11h sáng thứ 4 hàng tuần, trainer cũng là trainee: Section 1 nền tảng LLM (ChienTX + NamTV, đã mở màn), Section 2 RAG (KietNVT), Section 3 AI Agent (DuongDN + VinhNT, có demo agent thật chạy trên LLM gateway cty)…
Cần ảnh/chi tiết thêm cứ hú anh nha!

## DRAFTS (sẵn để gửi Trúc — CHƯA GỬI)

### Bài 1 — "3 năm cùng Baamboozle: từ 'xin thêm task' đến 'Amazing Carrick!!'"
Tháng 12/2023, team PHP nhận dự án Baamboozle — nền tảng game học tập mà giáo viên khắp thế giới dùng trên lớp. Tuần đầu, dev của mình còn đang đi trip công ty mà đã nhắn khách "Could you please arrange more tasks for me?" 😄. Chỉ 1 tháng sau: "I start to love this project".
Gần 3 năm và hơn 3.400 tin nhắn sau, khách vẫn đồng hành: "Great job team 💜💛" (11/2025), "Amazing Carrick!!" (09/2026), và tháng 10/2026 anh Ronan để lại review 5★: "Thank you for all your great work — great working with you".
Điều dễ thương nhất: con của anh Dương (DM dự án) cũng đang học tiếng Anh bằng chính Baamboozle ở trung tâm anh ngữ 🥰. Và có cả những lời từ giáo viên: "Baamboozle has become such an essential part of my teaching".
👉 Case study: nustechnology.com/case-studies/bamboozle

### Bài 2 (Chuyện bên lề) — "Khách khen team làm xuyên đêm… nhưng tụi mình làm ban ngày" 🤣
Dự án Meta-Stamp (PhucVT, TienND): khách nhắn "thank you for the overnight push, both landed". Anh Năm: "Mình toàn làm ban ngày mà ổng cứ tấm tắc khen mình làm overnight" — lệch múi giờ cũng là một lợi thế cạnh tranh! Milestone 1 sau đó "PASS — full chain ran clean… Good work", khách còn tự chịu luôn phí chuyển tiền.

### Bài 3 — "1 năm AI của team PHP"
06/2025: "Sao dạo này AI nó ngu hơn trước" — "Chắc AI bị stress giống con người" 😅
09/2025: "Welcome anh Dương qua Claude, như một nền văn minh mới" — và lời tiên tri "rồi sẽ có lúc anh không cần mở code editor nữa".
12/2025: "Usage limit reached, reset at 2am" — nỗi ám ảnh mỗi ngày.
05/2026: "Rồi lấy con AI nào để review con AI mà review cái skill này?" 🤣
10/2026: team đã dùng AI review code, bắt bug, và anh Dương đứng lớp AI Agent cho cả công ty. Khách James Diamond tổng kết giùm: "love the collaboration and use of AI — Better, Faster, Cheaper".

### Bài 4 — "Nghe radio Istanbul nửa tiếng… và không còn nhảy sang 104.4"
Tháng 7/2026, khách hàng RDC giao 2 thiết bị giám sát sóng FM thương mại đầu tiên ở Thổ Nhĩ Kỳ — chạy phần mềm do team PHP làm. Rồi sự cố: radio cứ tự nhảy về tần số 104.4, đúng lúc đối tác mua đang xem. Khách buồn tới mức nhắn "please stop working on these devices".
Team không bỏ cuộc: lần ra nguyên nhân là một "cuộc đua thời gian" giữa 2 gói tin khi thiết bị khởi động, tái hiện được lỗi, sửa trong 1 giây — và còn đo đạc chứng minh lỗi mất tín hiệu RDS ở İzmir là do phần cứng chứ không phải phần mềm.
Vài ngày sau: "I've been listening to İstanbul for half an hour, and no jump to 104.4! Everything seems fine at the moment." Và tháng 10, khách tiếp tục giao làm control panel mới — với một chữ: "Perfect!" 📻

## BONUS: "Những con số" — khách đồng hành lâu năm (Slack, tin nhắn của tài khoản NUS)
| Khách | Từ | Số tin NUS gửi | Ghi chú |
|---|---|---|---|
| MPFC (MyPersonalFootballCoach) | 09/2022 | 61 | ~4 năm (Slack thưa, làm chủ yếu kênh khác) |
| Colin – ETZ (Aigile) | 02/2023 (khách nhắc từ 04/2022) | 373 | ~4 năm |
| Marcel – XID (Equanimity) | 10/2023 | **6.348** | nhiều tin nhất; SGBuildex Singapore |
| Aysar – Baamboozle | 12/2023 | **3.426** | review 5★ 10/2026 |
| Bailey/Joey – Grazing | 03/2024 | 1.385 | |
| LegalAtoms (Raymond) | 04/2024 | 279 | |
| Rebecca – William Bills | 11/2025 | 2.046 | 11 tháng mà 2k tin |
| Maddy – Xtreme | ≥2025 (Slack chỉ giữ 90 ngày) | 307 | |

GitHub PR merged (nick dùng chung của cty, ko chỉ team PHP):
- nuscarrick (nick team PHP chủ yếu): **249 PR merged 2026** (529 tổng, từ 06/2019)
- nusken: 516 PR 2026 / **7.188 tổng từ 05/2014** — "nick lão làng 12 năm"
- nustony: 416 (2026) / nusnick: 34 (2026, 517 tổng từ 2017)
- Fun: PR đầu tiên của duongdn (10/2018) là repo nustechnology/technical-notes

## Rounds log

- R1 Matrix 15/08–15/09/2026: Brad khen AW web; DefinitiveGuide new; Philip 5★ close.
- R2 07–08/2026: Insurance Salvage site (PhucVT); new projects Lyf, Pet Printed, Relay Vault; XID device saga.
- R3 06–07/2026: "overnight" story; Peptide Clyde new; OhCleo relevance go-live.
- R4 05–06/2026: VietPH farewell; OhCleo start 28/5.
- R5 04–05/2026: John Yi "anyone else when Nick on vacation?"; giải bóng đá #22.
- R6 03–04/2026: SangNV+ThuongNTN wedding; Payment Guru 8/10.
- R7 02–03/2026: Bailey big go-live 11/03. Low.
- R8 01–02/2026: YEP 2025, ThuongNTN mua sạch vé số.
- R9–R10 11/2025–01/2026: Neural $100 bonus.
- R11 10–11/2025: Bailey "very very very awesome"; AWS sập 20/10/2025 joke (PhucVT) — "1 năm trước".
- R12 09–10/2025: bé Trúc sinh 13/10/2025; Aysar "bug khắp nơi" (10/2025).
- R13 08–09/2025: first Claude use.
- R14 07–08/2025: Training 2M interns thank DuongDN.
- R15 06–07/2025: DuongDN takes over Bailey.
- R16 05–06/2025: Catherine Woron "Looks great!"; Matrix history ends ~05/2025.
- R17 Slack praise search 15 workspaces: Baamboozle arc, Grazing Joey bonus, LegalAtoms Seminole County.
- R18 Slack deep: LegalAtoms LA courts impressed (NUS member unconfirmed), MPFC "looks great now".
- R19 Email 9 inboxes: low yield (Upwork "Michael B. gave feedback" 03/2025).

- R20 Discord AirAgri: James Diamond praise stream. Q: nusvinn = LeNH?
- R21 Slack alt-praise: Baamboozle 5★ 07/10/2026; Grazing Joey "great work as usual ❤️" (11/2024), "very awesome… warehouse will start shipping now" (08/2025); William Bills Oliver "Great work mate!" (11/2025, 02/2026).
- R22 PHP devs AI/tool msgs 3 tháng: LongVV subscription-leak find; PhucVT OhCleo AI Companion + Whisper >25MB upload; LeNH joke "IT giờ chọn mua subscription AI, cấu hình laptop ko còn quan trọng" (10/09).
- R23 Slack milestones: XID SGBuildex live; LegalAtoms Maryland; Baamboozle "Shoutout… keeping our Baamboozlers happy" (03/2026, internal staff?).
- R24 Full read team PHP room (1290 msgs, 06/2025→): AI journey timeline (→#1b); LeNH senior certificate CDF 06/2025; TuanNT tai nạn 10/2025 (ko share); hột vịt lộn thay nhậu 10/2025.
- R25 PHP Projects room full (1159 msgs): mostly mgmt/complaints (not shareable); Maddy Xmas gift; XID máy chấm công root cause = Postgres dead space, DuongDN fixed 13/04/2026.
- R26 English customer quotes pasted in Matrix: Arthur M1 PASS $1,500; Baamboozle "family is number one"; Paul Jones 4/5 "very happy so far".
- R27 Slack Equanimity/Xtreme direct: XID relationship since 12/2023. Maddy 15/10/2026 giao dự án mới 16h/w cho LongVV(Kai) sau vụ tranh cãi invoice — ⚠️ KHÔNG SHARE (khách yêu cầu white-label, giấu offshore; nhạy cảm hợp đồng). Chỉ báo DuongDN.
- R28 Company events 10/2026: Trung Thu, Happy Hour, Trúc 7 năm, PhongTB thâm niên — HR đã đăng, skip.
- R29 Baamboozle #customer-success: teacher quotes → impact angle for #1.
- R31 Quarterly client feedback/ratings in Matrix: nothing new for PHP (only Paul Jones 4/5, Payment Guru 8/10 — non-PHP).
- R32 VN-phrased praise ("ổng khen/bả ưng ý"): OhCleo bả ưng ý drag&drop (08/2026); AI-review-AI joke (05/2026) → #1b.
- R33 Slack Aigile: Colin ETZ relationship since 04/2022 → #7f.
- R34 Slack first-message dates per workspace → bảng "Những con số".
- R35 GitHub merged-PR stats per company nick.
- R36 "lần đầu tiên"/kỷ lục: Partnership duration Baamboozle confirmed task log start 06/12/2023. WC final tỷ số có tiền trong team room (07/2026) — ⚠️ KHÔNG SHARE.
- R37 Case study pipeline cho dự án PHP → #7g.
- R37 Case study pipeline. R38 Website cty mới: 4 case study dự án PHP đã có trang → #1c.
- R39 Web blog: Mindbody series + XID TCP server article → #1d. 
- R40 Redis 4.1B article: không thấy dấu vết team PHP trong Matrix → bỏ khỏi #1d (khả năng team Rails). Fun fact web schema: NUS ~90 nhân sự.
- R41 Mentor/trainer: DuongDN mentor VuTQ (Growth Mentorship 05/2026); review training plan PHP 01/2026 (Bootstrap→Tailwind). Low.
- R42 Discord context: James Diamond "Better, Faster, Cheaper" (AI), "great find VINN". 
- R43 Funny lines by PHP devs in project rooms: AI catches bugs (02/2026), AI reviews CDF (05/2026) → #1b; Bailey muốn rời AWS "do tình hình địa chính trị" (05/2026); Andrew Taraba quay lại cho tips "since we worked together before" (04/2026).
- R44 Email human thank-you: Gmail IMAP throttled (BYE/EOF) → dừng để tránh lock.
- R45 Viết DRAFTS cho top 3.
- R46 Fact-check drafts: sửa claim "con của những người làm dự án" → chỉ con DuongDN (nguồn 20/07/2026). Số 3.426 tin ✓, 5★ Ronan 07/10/2026 ✓, "Great job team" = Jamie ✓.
- R47 Small Slack workspaces: RDC FM Monitoring rescue story → #1e + draft Bài 4. Swift Studio (Rory BXR): "Yes great please deploy" (10/2026).
- R48 Clutch/GoodFirms campaign 09/2026: team PHP xin review từ Aysar, Bailey, RDC, Rory, LegalAtoms; Marcel từng review Clutch + 06/2026 GoodFirms. Ronan review = Clutch/GoodFirms (ko phải Upwork) — sửa #1. Clutch page bị chặn curl.
- R49 GoodFirms/Clutch pages: bot-blocked, ko đọc được review.
- R50 Baamboozle current work: Dark Mode = top priority của Ronan, AI toolbar → bổ sung #1.
- R51 Grazing Slack details → #3.
- R52 Trello 20 boards comments 2026: 0 praise hits.
- R53 OhCleo Matrix customer quotes: thấp; tính năng "Gems" (tip cho creator, creator nhận 80%) 08/2026 do team làm — tin sản phẩm nhỏ.
- R54 PHP project rooms (Rory/James/Aysar) dev lines: chủ yếu vận hành, ko có tin mới.
- R55 Bailey 2 tuần gần: upgrade Rails 6 trên staging2 + RDS + mobile, Grazing Desktop fix — chưa go-live, chưa thành tin.
- R56 Thêm MPFC upgrade (git repo) → #7h.
- R57 Technology Dept by PHP devs: 1.6 tỷ tokens/tuần, claude-nus-command guide, supply-chain alert → #1b.
- R58 Discord AirAgri impact: Select Harvests, JBS, SOS alarms, since 11/2023 → #7b.
- R59 Vinn identity resolved = shared PHP-team nick; gem "Vinn is our lead dev… the architect" (07/2025).
- R60 RDC dev identity: KhanhHH (from 07/2026) → spotlight idea.
- R61 KhanhHH spotlight material.
- R62 Spotlight per member section.
- R63 Slack Grazing IDs: amy = NUS BA (suy luận TrinhMTT, chưa xác nhận), nick = NUS dev → khen Bailey là cho team mình ✔.
- R64 Email retry (carrick/nick/kai/rick/ken, light query): chỉ có end-client Luxe.It.Fwd (Maddy) "Amazing, thanks very much" 12/2025 — nhỏ, và Maddy white-label → ko share.
- R65 Thâm niên: PhucVT 5 năm (06/08/2026), ThiHV staff thâm niên (03/2026) — HR đã đăng.
- R66 Đọc Logbook Vol3/Vol4 → ánh xạ đề xuất vào format.
- R67 Đọc Logbook Vol2: con số token đã dùng → loại khỏi đề xuất.
- R68 Soạn tin nhắn gửi Trúc theo format Logbook.
- R69 Discord Bizurk: search trả 0 kết quả mọi từ khóa (có thể ko có quyền đọc lịch sử) → bỏ.
- R70 Neural: Laravel 10→12, 24/11→04/12/2025 → #7.
- R71 Tin mới 15/10 chiều: ThuyLTT gợi ý Trúc dùng "training techlead-trainer hàng tuần" (= chuỗi AI Training, DuongDN là trainer Phase 3/5) → hợp mục NUS Brief. Team room: "Claude Code chịu hết nổi Github, tự xây git riêng" (Anthropic Scion) — vui.
- R72 AI Training room: lịch 11am T4 hàng tuần + phân công section → thêm vào tin nhắn Trúc (NUS Brief).
- R73 Slack hôm nay: Bailey/Joey "goal would be for us to go live Wednesday" (≈21/10/2026, bản Staging2 = Rails 6 upgrade + Grazing Desktop + DB Schenker) → nếu go-live kịp trước khi Logbook Vol.5 ra thì thành tin "go-live" mới; RDC "Perfect!"; Rory test account.
- R74 Watch 18:02–18:22: 0 tin mới (ngoài giờ).

## Unresolved
- ~~RDC carrick~~ → KhanhHH (tiếp quản từ 03/07/2026), LeNH trước đó ✔
- ~~Vinn~~ → nick dùng chung team PHP (PhucVT 2025, TuanNT/ThiHV phụ; LeNH làm James Diamond web 2026) ✔
- Website mới nustechnology.com có noindex — đã launch chính thức chưa?
- ~~LegalAtoms~~ → verified: tagged users (Talha, Arslan, Paloma, Matias) NOT NUS → dropped. XID tag U063KV32WH2 = NUS Carrick ✔.
- Michael B. Upwork feedback content.
- freelancer@mpfc email: config missing imap_server.
- Slack OhCleo + Amazing Meds tokens invalid_auth (not refreshed — avoid clobber).
- Upwork carrick inbox: session expired (needs live touch in carrick real Chrome — not done per no-window rule).
