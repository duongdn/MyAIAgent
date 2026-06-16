# Matrix — since 2026-06-15 08:00 +07:00

### !aaumKvfltGlhqcQjJP:nustechnology.com — 3 messages
  [15:24] binhnt: Từ hnay c cho  proj này lên Workstream, e cho c ds dev hiện tại nha Aysar Khalid	Baamboozle	DuongDN
  [15:25] binhnt: sẵn nói mn log in giúp ta
  [15:27] duongdn: Dạ

### !bmlwZVkJgnzFEibTrI:nustechnology.com — 50 messages
  [09:44] duongdn: https://github.com/orgs/OhCleo/repositories
  [09:45] duongdn: đây là org của ổng gổm mấy repo, tùy vào task thì nó theo report nhìn cũng dễ hiểu Admin FE - UI API
  [09:46] duongdn: env.backend
  [09:47] duongdn: env.fe
  [09:47] duongdn: .env.admin
  [09:48] duongdn: ohcleo_staging.dump
  [09:48] duongdn: rồi info nhiêu đây
  [09:49] nghiepnq: là dự án mới hả a ?
  [09:49] nghiepnq: có dev cty mình ai làm ngày nào chauw a Dương ⚠️
  [09:49] duongdn: Uhm Cline - OhCleo
  [09:49] duongdn: có LongVV làm 3 tuần nay rồi
  [09:49] duongdn: còn bên mobile thì a k rõ, có khi lâu hơn
  [09:50] duongdn: bên web mới vô vài tuần gần đây thôi
  [09:50] nghiepnq: vậy để em setup
  [09:50] nghiepnq: task mới dô là làm gì vậy a
  [09:51] duongdn: a chưa biết task gì luôn
  [09:52] nghiepnq: ohcleo-backend-api, ohcleo-ui, ohcleo-admin 3 repo này hay sao Dương
  [09:52] duongdn: uhm
  [09:52] duongdn: đầu tiên là có mấy cái inprogress
  [09:53] duongdn: chắc cần hỏi lại status của LongVV
  [09:53] duongdn: https://trello.com/b/Fv7eDVgT/ohcleo-app-first-approach
  [09:53] duongdn: vô = google Tony, ko biết shrae chưa
  [09:53] nghiepnq: e thấy share r
  [09:54] duongdn: uhm vô xem sao, progress thì chỉ có dev biết, do đang inprogress, này chắc phải hỏi LongVV
  [09:54] duongdn: bạn ko làm nhưng chắc có thể online
  [09:54] nghiepnq: oh ok a
  [10:08] nghiepnq: repo admin e thấy dev là david nguyen, dung tony có sao không a ?
  [10:08] duongdn: chắc dev cũ
  [10:16] nghiepnq: hình như env a gửi e thấy toàn Production dị ta
  [10:16] duongdn: lấy sample thôi, rồi tự trò về local à
  [10:32] nghiepnq: BE chạy docker đúng k a.
  [10:34] duongdn: uhm e
  [10:37] nghiepnq: à ok r, a
  [10:38] nghiepnq: cái dump db trên a có account nào vào check không ta
  [10:39] duongdn: a tự đồi pass nó = code thôi,  admin a dùng email này   "email_or_username1": "admin@ohcleo.com",
  [13:59] duongdn: postgresql://doadmin:[REDACTED]@v2-prod-db-do-user-9805996-0.j.db.ondigitalocean.com:25060/defaultdb?sslmo
  [13:59] duongdn: thử cái này xem
  [14:03] nghiepnq: không được luôn a. bị issue no pg_hba.conf entry for host "115.73.215.102", user "doadmin", database "defaultdb", no enc
  [14:06] duongdn: để xem
  [14:10] duongdn: image.png
  [14:10] duongdn: a connect bình thường
  [14:10] duongdn: e dùng tool hay gì đó lỗi hay sao ta ...
  [14:10] duongdn: ``` PGPASSWORD=[REDACTED] psql "postgresql://doadmin@v2-prod-db-do-user-9805996-0.j.db.ondigitalocean.com:
  [14:10] nghiepnq: e dùng tool connect db 2 tool đều ko đc
  [14:10] duongdn: xài command line như a xem
  [14:10] duongdn: lưu ý là port 25060, ko phải 5432 đâu nha
  [14:11] duongdn: * lưu ý là port 25060, ko phải 5432 default postgres đâu nha
  [14:11] nghiepnq: Screenshot 2026-06-15 at 14.11.27.png
  [14:11] nghiepnq: e connect đúng port á, mà dùng cli thì dc
  [14:12] duongdn: vậy tool lỗi thôi haha

### !cYxDcwWxBhnuXxpryq:nustechnology.com — 2 messages
  [08:56] duongdn: image.png
  [08:56] honght: dạ em cảm ơn anh

### !DlcbJDCUZaUivhEXSb:nustechnology.com — 6 messages
  [13:54] duongdn: Hi e, a muốn lấy Trí hiện tại để làm bên dự án khác, gấp Ca này được ko, bạn nói bạn có cố định 4h chiều bên em
  [13:55] anhnvn: Để e xem, bên này thường phải làm và report cố định
  [13:55] anhnvn: Bên cần qua là bên nào vậy a
  [13:56] duongdn: Philip Briggs - Elevate365.AI
  [14:05] anhnvn: Ok nha a. Em có nói bạn wrapup chút rồi qua a.
  [14:05] duongdn: Ok thank e

### !mYZBGNoLFVpMVIJtPu:nustechnology.com — 13 messages
  [10:44] longvv: Ba em có khối u trong não, h đi theo chụp mri để xác định chính xác để mổ, chiều e ko làm dc rồi a ơi :((((
  [10:44] duongdn: hic ok em , e báo off luôn chiều đi
  [10:50] duongdn: mà cố gắng online xíu để transfer progress cho Nghiệp nha ...
  [10:54] duongdn: === BTW, bên Maddy có gì gấp ko? Và ai có thể làm thay em đươc, a chưa rõ nó đang thế nào
  [10:56] longvv: Maddy htai k gấp lắm, ng làm thay thì có a Việt vs Phúc á
  [10:59] duongdn: vậy để xem tình hình đi E có gì liếc liếc msg của Nghiệp nha
  [14:21] duongdn: https://trello.com/c/awYi27Ue/117-offer-1-month-free-premium-to-legacy-web-subscribers
  [14:21] duongdn: cái này status dev done là đã test chưa em?
  [14:23] duongdn: Free premium
  [14:25] longvv: E test r nma chưa ok về cách làm, đang gặp vde là mấy user đang active sub nó mà dc gift thì k có can thiệp dc vô subscr
  [14:26] duongdn: ok, vậy kéo về, này e đã báo Minh hay Lữ chưa?
  [14:26] longvv: Dạ chưa e tính t2 báo mà e lu bu nên quên
  [14:26] duongdn: vậy e transfer lại cho Nghiệp kĩ để bạn xử lí tiếp nha

### !oGYjbzEfphvvauBZtq:nustechnology.com — 18 messages
  [09:40] namtv: Long off sáng nay và ngày mai. Tao lấy Nghiệp qua Celine bù do Minh nói đang nhiều tasks cần Python. Nhưng vậy chiều nay
  [09:42] duongdn: Có task Maddy, cố định t2 và t5 theo default mà
  [09:42] namtv: Vậy OK
  [09:48] namtv: Bên Charles Chang trước mình có Carrick làm Wordpress cho ổng. Có nhớ ko? Ổng đang hỏi bên mobile là có dev Wordpress ko ⚠️
  [09:48] duongdn: OK
  [10:11] duongdn: hi cái này phải Carrick ko ta, tìm ko ra ...
  [10:19] duongdn: Minh chỉ cách vô rồi nha
  [10:23] namtv: Rồi ổng nói gì ko? 😄
  [10:23] namtv: Có gì hú ổng. Với xem Minh nói gì với ổng rồi
  [10:24] duongdn: chưa thấy trả lời gì
  [10:35] namtv: Charles gửi offer rồi, check xem scope cỡ nào phát, và xem ai làm. Chắc Tuấn?
  [10:36] duongdn: chưa có gì đâu, đang chuẩn bị thôi Wordpress thì đưa Tuấn đi
  [10:36] namtv: Vậy follow với ổng, lúc nào ready cho dev làm thì báo phát và lấy Tuấn làm
  [10:39] duongdn: ok
  [13:46] duongdn: bên Rory theo lí thuyết là sắp xong task rồi Plan sẽ đưa lên trong hôm nay rồi chờ ỏng test/feedback - Franc cũng hết rồ
  [15:18] duongdn: update:  mới extend thêm tuần này nha, vậy xem như LeNH IDLE từ tuần sau đi, mà cứ tạm để đó ta check status rồi báo sau
  [15:19] duongdn: * update:  ignore trên nha  mới extend thêm tuần này nha, vậy xem như LeNH IDLE từ tuần sau đi, mà cứ tạm để đó ta check
  [15:21] namtv: uhm

### !OIrgPraJWrcDTnRVLQ:nustechnology.com — 14 messages
  [13:40] duongdn: ==== Bên Rory còn task gì mới ko?  Theo a biết thì budget hiện đã hết ?
  [13:41] lenh: Không anh, vẫn đang hoàn thành cho xong cái task UAE thôi anh, chưa xong cái này chắc ổng không cho làm cái khác đâu
  [13:42] lenh: Em đang làm cái membership number nữa là tạm xong task UAE
  [13:42] lenh: Còn fix bug hay feedback sau đó thôi
  [13:42] duongdn: khoảng bao lâu nữa xong
  [13:42] lenh: Chắc hết nay nữa mới xong
  [13:43] duongdn: ẹc ... vậy mà ko report gì, hên là có hỏi ...
  [13:45] duongdn: Franc thì sao, còn gì làm ko?
  [13:45] lenh: Franc cũng hết rồi anh, ổng lặn từ T5 tuần rồi tới giờ
  [13:46] duongdn: OK e ...
  [13:47] lenh: Rory thì chắc vẫn sẽ còn làm, vì em nghĩ là sẽ còn feedbacks hay bug biết gì đó. Nhưng buget thì đã hết
  [13:47] duongdn: này thì em discuss với MinhTV để xem sao, a cũng ko rõ est này có ý nghĩa gì, hay chỉ là con số tham khảo
  [15:17] lenh: Em mới discuss với MinhTV dự kiến là xin ổng extend thêm hết tuần này để wrapup cho xong hết mọi thứ
  [15:18] duongdn: ngon lành

### !ojexjpmcFesBwKOXco:nustechnology.com — 16 messages
  [14:45] duongdn: bên Rory budget hết rồi, có giải pháp gì ko em? Chắc phải báo idle cho LeNH?
  [14:47] minhtv: Sao hết rồi mà vẫn chưa done a nhỉ ? Theo lý thuyết là phải làm bù , do mình lố nhiều quá 🥶
  [14:47] duongdn: bữa có report rồi à
  [14:48] duongdn: xem action với team rồi báo a nha, theo lí thuyết e cân raise idle dev với a Năm
  [14:48] minhtv: okay a , để e làm việc vs khách xem mức độ extend thế nào
  [15:06] minhtv: `Bạn TuanNT tham gia dự án Family App, khách hàng: Charles Chang, Role: Wordpress Developer, Direct Manager: MinhTV, Acc
  [15:07] duongdn: Commication level 3 Ko review code nha Theo template mẫu thôi, bạn dev Wp lâu năm
  [15:07] minhtv: dạ a
  [15:10] minhtv: mình có task làm luôn chưa a ? A đánh dùm em cái checklist của bạn trong task log với https://docs.google.com/spreadshee
  [15:11] duongdn: chưa action gì ... :))
  [15:11] duongdn: đã có task đâu
  [15:33] minhtv: cái offer bên Carick có tracker ko a ơi >?
  [15:34] duongdn: theo như lịch sử thì ổng ko cần tracker, nên lần này chăc cũng ko cần đâu
  [16:11] duongdn: Về external: khách hàng thỉnh thoảng có review code của mình và có quan tâm chất lượng source code Làm gì có :))
  [16:11] minhtv: có nha , ông đó thỉnh thoảng ổng mò vô xem bên mobile á ,
  [16:12] minhtv: Trước ổng có xem 1 lần, nên em có lưu lại

### !oofREYAXHsvPWEOJev:nustechnology.com — 11 messages
  [15:19] thuyltt: Hi mn, T gửi danh sách tổng kết **giờ làm (trong giờ chính thức, ko tính PT) tuần 18 - 14/6**: Note: **các effort traini
  [15:19] thuyltt: image.png
  [15:20] duongdn: OK nha, nhưng Celine giờ mới thấy info sai sai, a Dương nào mà setup giờ charge gì nữa :))
  [15:21] thuyltt: là giờ thì đúng? còn note thì sai hả Dương?
  [15:21] duongdn: uhm
  [15:21] thuyltt: nguyên văn nè (Hà report job này) Actual 5h30 Charge **3h30** - Tuần này bạn làm 5.5h ở job này, time còn lại ở job khác ⚠️
  [15:22] thuyltt: T sẽ feedback Hà để check lại dự án. Nếu chỉ sai note, giờ charge vẫn đúng thì có thể hiều lầm/ghi ko rõ, từ từ update c
  [15:25] duongdn: gõ gàng mà, nhìn thì có vẻ là info của LongVV :D
  [15:26] thuyltt: image.png
  [15:26] thuyltt: Long có dòng khác
  [15:26] duongdn: à

### !rwLbvLBnrRAYMaOPaD:nustechnology.com — 2 messages
  [10:00] duongdn: a có nc với công ty, do bên các team khác đang có dev idle nhiều hơn em nên họ sẽ tiến hành làm backup trước nha A cũng 
  [10:00] khanhhh: Dạ ok a. Khi nào cần e start a cứ hú e nha

### !tGBJevbuSmjqVePBPN:nustechnology.com — 2 messages
  [15:26] halt: Hi a Cho e hỏi bên Celine - OhCleo có 2h Setup v1 plaftform for reference sao a ko charge vậy ạ?
  [15:28] duongdn: này nó nằm trong phase tìm hiểu 1 task, ko thể charge nhiều vì output chỉ để tham khảo thôi

### Aysar Khalid - Baamboozle — 4 messages
  [15:29] duongdn: https://workstream.nustechnology.com/ Hi @room  mn công ty mình có app là để quản lý tasklog dự kiến sắp tới sử dụng. Mn
  [15:29] duongdn: Mình move dự án từ task log qua chỗ này nha mn
  [15:30] khanhhh: E login rồi nha a , assign dự án Aysar giúp e
  [17:06] duongdn: done

### Bailey - BA/QC — 1 message
  [09:24] duongdn: remind nha mn

### BDD - Delivery — 2 messages
  [14:44] chientx: Danh sách Jobs ưu tiên 1/ Elena - Java/Angular - AnhNVN: Có scope mới (BE: 49.5, FE: 74.2). Đã gửi KH, đang chờ greenlig
  [14:50] anhnvn: Vẫn chưa greenlight. Tối qua mới nhất thì lại nói là đang muốn test thêm AA2, có thể có bug cần fix đó nha (chưa thấy lo

### Celine - OhCleo — 124 messages
  [09:13] hiepnt: a Minh Trinh  ơi, nay task bên này đa phần bên web
  [09:15] duongdn: T2 LongVV off, làm Maddy, e cứ làm  để mở tracker nha
  [09:18] minhtv: Ủa, bạn off 2 ngày hả a ?
  [09:18] minhtv: em thấy mail bạn off T3
  [09:20] duongdn: cái 16/6 là theo plan Còn hôm nay là đột xuất Tí bạn lên xem thử t3 cần off nữa ko
  [09:22] longvv: Ban đầu e tính t3 đưa đi tái khám á, mà nay đột xuất nên là đợi em xong hết ùi em báo mấy anh nhe
  [09:28] hiepnt: v giờ s a, e qua web hay sao a, task bả tạo thấy web hông à
  [09:29] minhtv: Web hay BE thế? Web dùng react nhỉ?
  [09:29] hiepnt: web dùng next a
  [09:30] minhtv: Để a coi, e làm được ko? Dùng AI chơi à
  [09:30] hiepnt: e biết sơ next, từng làm next r,
  [09:41] minhtv: Duong Doan:  trước mắt Nghiệp sẽ làm thay Long , a hỗ trợ bạn onboarding giúp em với nhé
  [09:43] duongdn: Share bạn github Tony để bạn fetch code rồi deploy thôi, này dùng docker ko có gì đặc biệt
  [09:44] duongdn: với cái google Tony nữa là gần như đủ rồi
  [09:44] minhtv: okay a
  [09:44] nghiepnq: là giờ qua đây làm luôn thay vì làm bên Ons hay sao mn ?
  [09:44] minhtv: đúng rùi
  [09:45] minhtv: Trước mắt em qua đây 2 ngày, T2, T3 sau đó update sau
  [09:45] minhtv: Đã shared đủ account cho Nghiệp nhé
  [09:52] minhtv: nào onboard xong, bắt đầu làm task nhắn cái nhé Nghiệp
  [09:52] nghiepnq: e đang clone setup repo nha a
  [09:53] minhtv: https://trello.com/c/Q6uNKfdR/97-profile-page Sao lại có cái này nhỉ ?  Hiep Nguyen  bữa fixed rùi đúng ko ?
  [09:54] hiepnt: bả có comment hỏi, e rep lại r
  [09:58] minhtv: E chưa giải thích cách hoạt động của mình . 1. Em yêu cầu khoảng trắng hay thế nào ?  2. A_adams đối với họ là đủ rồi . 
  [10:01] hiepnt: e updated
  [10:38] nghiepnq: cơ bản em start đc web với api rồi giờ cần làm gì vậy mọi người
  [10:43] hiepnt: a check thử 2 cái này a  https://trello.com/c/Vk0PkS1f/133-old-dynamic-templates-conflicting-with-new-sendgrid https://t
  [10:51] duongdn: Coi cái 1 đi, cái thứ 2 chưa làm rõ cần làm gì
  [10:53] duongdn: hình như có description mới, để a đọc chút
  [11:09] nghiepnq: Sendgrid dùng account nào v a Dương. có vẻ cần check Sendgrid ⚠️
  [11:12] duongdn: theo như msg a thấy trên room thì có vẻ lost access rồi Ổng có 1 thằng dev cũ tên David, mà hỏi nó nó cũng nói ko biết g
  [11:12] duongdn: https://ohcleo.slack.com/archives/C0B8BEKHLH1/p1781171578525149 [thread: 7 replies]
    └ [11:14] nghiepnq: login vào đay bằng email hay sao a
    └ [11:16] duongdn: uhm, email tony
    └ [11:17] minhtv: bấm vô đi ,a gửi code cho
    └ [11:19] nghiepnq: vụ slack vị Access Denied, resolve sao vậy mn quên r ta
    └ [11:20] nghiepnq: Screenshot 2026-06-15 at 11.19.54.png
    └ [11:20] duongdn: này xảy ra cho hầu hết case, ko phải do org mình nha
    └ [11:20] duongdn: vô email lấy link thôi
  [11:13] duongdn: https://trello.com/c/vVz8J9eu/150-3-free-listenings BTW, thấy task này doable nè [thread: 2 replies]
    └ [11:20] nghiepnq: bên này git work flow như nào a Dương, checkout từ main, code xong merge vào preprod hả a ⚠️
    └ [11:37] duongdn: cũng ko có gì đặc biệt trừ main là staging còn pre-prod là production E chắc a ko review, nên e tách
  [11:17] hiepnt: image.png
  [11:17] hiepnt: chekc giúp e sao production lại lag r
  [11:20] duongdn: thấy nhanh, nhưng đúng là lúc e nói thì thấy chậm
  [11:23] minhtv: Bên này có tracker nhưng cả web với mobile 1 account ,hiện tại Hiệp đang bật , trước mắt chắc trong 2 ngày ko cần Nghiệp
  [11:24] duongdn: để cài thêm cái Newrelic track performance , xử lí cho dứt điểm
  [12:00] nghiepnq: https://trello.com/c/vVz8J9eu/150-3-free-listenings em hỏi cái 3 free listening này có reset theo tháng không mọi người 
  [12:04] minhtv: Theo bả mô tả thì có
  [13:47] hiepnt: Hú a Nghiep Nguyen , ở production a reset lượt nghe free của device 6F5AB55E-874C-4786-AA3E-511BCAF61516 và ở user tony@ [thread: 3 replies]
    └ [13:55] nghiepnq: Duong Doan: hiện tại e connect lên db prod không được cần thêm config gì không anh, e lấy theo env a
    └ [13:58] duongdn: để xem
    └ [14:03] duongdn: a có gởi connction string privage msg
  [14:14] minhtv: Are you updating the description? Seem you haven't saved your update yet , it display "unsaved change" on my view => Cái
  [14:15] duongdn: có description task bả đang edit mà chưa save, nhắc để bả làm tiếp cho xong req thôi
  [14:17] minhtv: Theo em hiểu là do chính user hiện tại bấm vào view full requirements , ở trạng thái edit, chứ không phải view của khách
  [14:18] duongdn: vậy à, a lấy msg bã paste vô rồi save luôn rồi
  [14:21] duongdn: https://trello.com/c/cSU59AAN/134-completion-rate Nghiep Nguyen  này đã clear nha,  đại loại là làm thêm 1 số data cho a
  [14:26] minhtv: Bả có rep vụ display name rồi nhé Hiệp
  [14:27] duongdn: https://trello.com/c/awYi27Ue/117-offer-1-month-free-premium-to-legacy-web-subscribers Này a mới hỏi thăm Long Vo  thì c [thread: 3 replies]
    └ [14:34] minhtv: nhưng done rùi ,đã deployed thì để ready to test
    └ [14:34] minhtv: khách có nhắn hỏi trên đó
    └ [14:37] duongdn: replied
  [14:30] duongdn: Long Vo:  Nghiep Nguyen  cc Minh Trinh  A vừa mới cài Newrelic vào app mình, cà staging và live Acc có để ở file task lo
  [14:36] hiepnt: a vô được production chưa a Nghiep Nguyen [thread: 1 reply]
    └ [14:40] nghiepnq: a có reset user lên 3 r đó
  [14:40] nghiepnq: * a có tăng user lên 3 r đó
  [14:54] longvv: https://trello.com/c/awYi27Ue/117-offer-1-month-free-premium-to-legacy-web-subscribers Có issue ở chỗ này: hiện tại em c
  [15:13] nghiepnq: cho e vào task logs để logs giờ với mn
  [15:15] duongdn: shared rồi nha em
  [15:22] hiepnt: https://trello.com/c/vVz8J9eu#comment-6a2fb01c5a94c5bb65c94e8c bữa họ bảo guest cũng được nghe free 3 lần rồi check theo
  [15:24] minhtv: đúng, tuần trước nói có theo device
  [15:24] hiepnt: v giờ xoá hết đi, làm lại guest k cho nghe free 3 lần nữa à a
  [15:24] hiepnt: * v giờ xoá hết đi, làm lại device k cho nghe free 3 lần nữa à a
  [15:26] minhtv: Device không được register nhiều lần account mới để nghe free
  [15:27] hiepnt: ok a, đăng kí truyền device lên rồi giờ sửa không cho chưa đăng nhập nghe free
  [15:28] minhtv: Mình nên chế thêm 1 cái popup mới, 1 device đã nghe hết 3 lần free , sau đó xoá app đi cài lại , nghe tiếp 3 lần thì sao
  [15:29] hiepnt: không đăng nhập không được nghe free ý a
  [15:30] minhtv: là sao thế ?  Đăng nhập được chứ, nhưng hết lượt nghe free
  [15:35] hiepnt: giờ không đăng nhập thì luôn luôn không cho nghe free còn đăng nhập rồi thì check sao a ví dụ  tk A tạo từ device A và c
  [15:38] minhtv: Logic free trial: 1. User chưa đăng ký tài khoản    → Không cho nghe. Hiển thị màn hình yêu cầu đăng ký / đăng nhập. 2. 
  [15:41] hiepnt: ok a, vậy check device nằm trên  device mà hết thì account còn cũng không nghe được
  [15:43] minhtv: chú ý case xoá app nhé, device ko hẳn chỉ lưu ở local , cần 1 api để check theo device ID
  [15:43] hiepnt: dạ, có sẵn api check device rồi a
  [16:33] minhtv: khách hẹn 30 mins nữa, bên Nghiệp tới đâu rùi nhỉ ? Cho a update phát
  [16:38] nghiepnq: ủa demo task nào a, e đang làm task https://trello.com/c/vVz8J9eu#comment-6a2fb01c5a94c5bb65c94e8c, giờ có thêm update m
  [16:41] minhtv: okay , a nắm thông tin thui
  [17:00] minhtv: khách muốn done cái mớ in-progress vào ngày mai
  [17:01] hiepnt: mobile thì ok nha a
  [17:01] minhtv: Bên Nghiệp check dùm a thử, mức độ khả thi
  [17:05] duongdn: tùy vào cái Nghiep Nguyen  đang làm, còn BE có cái thứ 2 là https://trello.com/c/UqfV4m5r/131-backend-question-and-updat [thread: 1 reply]
    └ [17:38] nghiepnq: ngày mai xử task này nữa chắc ok khả thi nha a Minh Trinh
  [17:09] nghiepnq: là còn nhưng task nào in-progress vậy ta
  [17:13] hiepnt: production không login đc trên web lun, nó báo 500, check giúp e với
  [17:13] duongdn: 2 cái e đang làm và cái a mới nói
  [17:15] duongdn: éc
  [17:15] duongdn: hình như Nghiep Nguyen  mới push gì lên live à
  [17:15] duongdn: nó báo thiếu column ...
  [17:15] nghiepnq: e push lên preprod mà ta
  [17:16] duongdn: đúng rồi
  [17:16] duongdn: pre-pro là live mà ...
  [17:16] nghiepnq: éc
  [17:16] duongdn: image.png
  [17:16] nghiepnq: e đọc nhầm prepdo là stagin
  [17:17] duongdn: ui, revert thôi
  [17:17] nghiepnq: ok a
  [17:17] duongdn: chút sự cố, ae bình tĩnh 🤣
  [17:18] nghiepnq: e mới push lại ==
  [17:18] hungpn: bảo sao em đang dk account live mà server bóa lỗi 500, đang tính hú deb
  [17:18] hungpn: * bảo sao em đang dk account live mà server bóa lỗi 500, đang tính hú dev
  [17:20] duongdn: Nghiep Nguyen:   Em có google tony ko, vào đây để monitor server nè https://cloud.digitalocean.com/apps?i=f39a49
  [17:21] duongdn: https://cloud.digitalocean.com/apps/8931f274-c43e-4d1f-a4cd-e154534e5b0c?i=f39a49 Em sẽ thấy deployment status luôn,  nó [thread: 1 reply]
    └ [17:26] nghiepnq: ok a
  [17:25] duongdn: check lại nha mn, deploy done
  [17:26] duongdn: Nghiep Nguyen:  revert nhầm cái của a rồi ... check kĩ lại em ... huhu
  [17:27] nghiepnq: Screenshot 2026-06-15 at 17.27.36.png
  [17:27] nghiepnq: cái này hả a
  [17:28] duongdn: uhm e revert nhầm rồi, nên bug vẫn y chang [thread: 2 replies]
    └ [17:29] nghiepnq: hình như do migration
    └ [17:29] duongdn: e revert phần code e dùng cột mới đi, e revert nhầm cái newrelic của a
  [17:28] hungpn: em login vẫn thấy lỗi server k login dc nè a Duong Doan
  [17:28] duongdn: uhm chờ xíu đi
  [17:37] duongdn: done nha
  [07:09] hungpn: Sáng nay anh xin off, cần test gì trưa lên anh check nhé

### Charles - Family — 9 messages
  [09:46] hiepnt: a Minh ơi, ổng có hỏi mình có kinh nghiệm là WordPress không nha a
  [10:12] duongdn: mình dùng nick gì charge với ổng vậy
  [10:12] duongdn: trước a nhớ có làm, mà ko nhớ dùng nick gì
  [10:13] minhtv: Carrick á a , em rep ổng rùi
  [10:16] duongdn: ủa a cũng vô Carrick Team sao ko thấy ta
  [10:18] minhtv: Screenshot 2026-06-15 at 10.18.01.png
  [10:18] minhtv: a phải chọn vô cái Acredia mới được
  [10:18] duongdn: à à
  [10:20] duongdn: vô rồi, mới chat riêng với ổng

### Delivery - Resource Arrangement — 19 messages
  [09:44] namtv: NEW	LongVV	Sáng	15/06/2026	Đưa ba đi cấp cứu NEW	LongVV		16/06/2026	Dắt ba đi tái khám ==> Bên Celine sẽ do NghiepNQ bù.
  [09:52] namtv: NEW	TinPC		16/06/2026	Chở mẹ đi tái khám ==> Tính bên MyID ko bù. Anh đã update note
  [09:52] halt: > PhongTH	Chiều 11/06/2026	Không khoẻ => A Năm đang nói bạn PT bù, chưa chốt  A Nam Tran ơi, case này chốt có PT ko ạ
  [09:56] namtv: Ah, anh quên báo lại. Bạn bận ko PT tuần trước được nên sẽ PT bù vào tuần này tường minh, đã báo KH OK và update note
  [09:58] namtv: NEW	TaiTM		17/06/2026	Đi học lái xe ==> Tính bên Workstream ko bù. Ko cần update note
  [10:01] namtv: NEW	VietPH		15/06/2026	Bị sốt ==> Bên Bailey chắc ko bù phải ko Duong Doan ?
  [10:03] namtv: NEW	HaVS		19/06/2026	Có việc cần về quê xử lý ==> Time bạn đang flexible nhiều bên. Coi như tính bên MyID ko bù. Anh đã 
  [10:03] namtv: * NEW	HaVS		19/06/2026	Có việc cần về quê xử lý ==> Time bạn đang flexible nhiều bên và tasks cũng ko ổn định. Coi như t
  [10:04] duongdn: Ok nha Nam Tran , bên Bailey ko có gì gấp, scope thì đang cố định , lại có TuanNT làm chung
  [10:04] namtv: Đã update note Bailey
  [10:26] namtv: NEW	DuongMD		26/06 - 29/06/2026	Có việc gia đình cần về quê (chưa approve) ==> Hà note plan sau nha
  [10:32] chientx: Charles C. 10:29 AM ICT, 15 Jun 2026  	 Charles C. sent an offer need a WordPress expert to fix up our company web site 
  [10:34] namtv: uhm, sáng ổng mới hỏi, nói chuyện xong ổng gửi offer. Để anh nói team check scope và plan dev
  [10:38] namtv: Hi Hà, Bên Charles Chang có chút task Wordpress, TuanNT làm Anh đã update note
  [14:00] namtv: NEW	HauTT		23/06 - 24/06/2026	Đi du lịch (chưa approve) ==> Hà note plan sau nha
  [14:01] namtv: NEW	VinhNT		19/06/2026	Có việc gia đình, cần về quê ==> Bên Michael Koh dùng PL. Anh đã update note Anh Nguyen chú ý
  [14:04] namtv: NEW	LongVV		15/06/2026	Đưa ba đi cấp cứu -> Update: Xin off thêm buổi chiều ==> Vẫn tính bên Celine, NghiepNQ bù. Anh đã
  [14:04] duongdn: uhm, sáng có nói phòng hờ rồi
  [17:27] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 

### Delivery Department — 8 messages
  [10:39] namtv: Thông tin điều chuyển dự án: Bạn TuanNT tham gia dự án Family App, khách hàng: Charles Chang, Role: Wordpress Developer, ⚠️
  [10:41] namtv: Thông tin điều chuyển dự án: Bạn NghiepNQ tham gia dự án OhCleo, khách hàng: Celine Fierro, Role: Python Developer, Dire ⚠️
  [10:41] namtv: * --- Thông tin điều chuyển dự án: Bạn NghiepNQ tham gia dự án OhCleo, khách hàng: Celine Fierro, Role: Python Developer ⚠️
  [10:43] namtv: --- Thông tin điều chuyển dự án: Bạn ToanNT tham gia dự án Countdown, khách hàng: Zach Tobin, Role: Mobile Developer, Di
  [16:09] minhtv: Hi a Năm, em request một số vấn đề sau cho dự án Countdown, khách hàng: Zach Tobin 1. ToanNT communication level 2:     
  [16:09] minhtv: Hi a Năm, em request một số vấn đề sau cho dự án Family App, khách hàng: Charles Chang 1. TuanNT communication level 3:  ⚠️
  [16:09] minhtv: Hi a Năm, em request một số vấn đề sau cho dự án OhCleo, khách hàng: Celine Fierro 1. NghiepNQ communication level 4:   
  [16:12] namtv: OK nha Minh

### Direct Manager — 5 messages
  [15:16] binhnt: Hi mn  Về technical article, Tuyên dương 2 dự án này đang có số bài vượt chỉ tiêu tối thiểu:  - Ons Mebarek - Scott Stew ⚠️
  [16:13] binhnt: Hi mn,  Bên nhóm Workstream đang chuẩn bị req cho tính năng tag như lần trước họp Năm có nói đó  Nó tương tương (mở rộng
  [16:19] duongdn: permisson của tag (thêm, xóa, sửa) thì thế nào ạ?
  [16:31] binhnt: Tech Lead, Reviewer, and Manager can create, edit, delete, hide, and unhide tags (Tag ID). Plain employees can view tags
  [17:03] binhnt: Hi mn ,  Hnay c có add 14 dự án lên Workstream. (c đã dán ds cho từng DM)  Chị đã add các member (còn một vài member ko 

### Elena - Active Alerts — 82 messages
  [09:28] anhnvn: Có update gì về AA3 chưa Anh Trinh  AA2 thì hiện có fb nào team đang xử lí, hay có mới ko mn?
  [09:30] kietnht: mới tạo xong user cho bả, hôm cuối tuần bả có nhờ mà chưa có time làm
  [09:31] anhnvn: Như trên thì ko phải là task/bug mà vẫn là mấy kiểu chuẩn bị data test à Kiệt?
  [09:32] anhttl: AA3 bả chưa rep, để em push lại bả. AA2 bả có log bug trên jira, anh Duy Vo verify lại giúp em nha. Mà tuần này plan dev
  [09:34] anhnvn: Plan dev thì gần như giữ nguyên thôi: BE:  - Kiet Nguyen: như cũ chưa có plan nào khác, có thể sẽ phải tiếp tục mở AA3 r
  [09:44] kietnht: mà Tuan Nguyen time bên này ntn full luôn hay sao a Anh Nguyen ?
  [09:45] anhnvn: Chưa full đâu Kiet Nguyen. Bạn vẫn có 24h bên khác xong rồi mới qua.
  [13:32] anhttl: Anh Nguyen: Em hỏi về scope AA3 thì bả nói là "this week I assume we fixing bugs" nha
  [13:33] anhnvn: Nói lại là team thì vẫn đang pending chờ rồi. Nếu bà ok thì mở ra làm tiếp, còn có bug AA2 vẫn ưu tiên fix bth.
  [13:33] anhnvn: * Nói lại là team thì vẫn đang pending chờ rồi. Nếu bà ok thì mở ra làm tiếp, còn có bug AA2 vẫn ưu tiên fix bth. Chứ gi
  [13:47] anhttl: Duy Vo: tình hình verify bug sao rồi ạ anh
  [13:51] duyvna: Mấy con log bữa thì fix ok rồi nha em, giờ con mấy con này nhunge priority Normal thôi. Nếu có dev thì Fix lun [https://
  [13:57] anhnvn: Bug này đưa Sam Ha fix dc ko LA?
  [13:58] anhttl: Ý em là bug họ log trên jira ấy
  [14:00] anhttl: được anh
  [14:00] duyvna: để a verify lại, tưởng bug bữa log thôi k biết bả có log trên Jira
  [14:37] duyvna: https://precognize.atlassian.net/jira/software/projects/AA/boards/250?selectedIssue=AA-38 https://precognize.atlassian.n
  [14:40] duyvna: * https://precognize.atlassian.net/jira/software/projects/AA/boards/250?selectedIssue=AA-38 https://precognize.atlassian
  [14:42] kietnht: > https://precognize.atlassian.net/jira/software/projects/AA/boards/250?selectedIssue=AA-40 này như bug BE, a verify lại
  [14:43] kietnht: bả add note nhưng status ko change 🤔
  [14:44] duyvna: a thử test lại rồi, lần đầu thì khi action thì sẽ change stt còn những lần tiếp theo sẽ giữ nguyên.
  [14:44] duyvna: nên case bả log có thể là lần đầu Action
  [14:44] kietnht: hmmmm
  [14:44] duyvna: https://precognize.atlassian.net/jira/software/projects/AA/boards/250?selectedIssue=AA-40 https://precognize.atlassian.n
  [14:45] duyvna: * https://precognize.atlassian.net/jira/software/projects/AA/boards/250?selectedIssue=AA-30 https://precognize.atlassian
  [14:45] duyvna: a vừa update lại nha Kiet Nguyen
  [14:46] duyvna: 1 cái bả báo asset type/name and section not presented 1 cái thì khi download bị mất field urgency/timeto failure /statu
  [14:48] kietnht: image.png
  [14:48] kietnht: khoan a, cái trên a nói e chưa hiểu ấy Duy Vo
  [14:49] kietnht: a test lại rồi thì nó là bug hay ko là bug @@
  [14:50] duyvna: a test k thấy bug
  [14:51] kietnht: > 1 cái thì khi download bị mất field urgency/timeto failure /status chỗ download report ko nằm trong scope này
  [14:52] duyvna: Hiện tại trường hợp bả báo rơi vào 1 case là mình mới vào change stt từ New qua Under sau đó mình change lại thành New v
  [14:52] duyvna: * Hiện tại trường hợp bả báo có thể rơi vào 1 case là mình mới vào change stt từ New qua Under sau đó mình change lại th
  [14:53] anhttl: Under specialist review á hả
  [14:54] duyvna: um hoặc Under investigation lun
  [14:55] duyvna: https://precognize.atlassian.net/jira/software/projects/AA/boards/250?selectedIssue=AA-47 bả mới báo k nhận đc reminder 
  [14:57] kietnht: là sao a?
  [14:57] kietnht: image.png
  [14:57] kietnht: e thấy bả ghi như này thôi mà
  [14:57] duyvna: image.png
  [14:57] duyvna: aa có tạo reminder nhưng vào tab Reminder thấy trống trơn à
  [14:58] anhttl: case này hỏi bả phải bả gặp trường hợp đó ko á anh, bữa có note cho bả là tính first action là bao gồm: NoteAdded, Inves
  [15:01] kietnht: Duy Vo:  a dùng acc system hay acc nào, cho e cái investigation id
  [15:01] duyvna: system
  [15:01] duyvna: 4926
  [15:01] kietnht: ok a
  [15:01] duyvna: quên bả dùng acc gì k biết nha
  [15:01] duyvna: mà bả báo k nhận đc noti gì cả, còn a thì nhận đc bth
  [15:02] anhttl: mình có đưa acc cho bả test mà phải ko, mail của bả á
  [15:02] kietnht: uhm, có tạo 2 user cho bả á
  [15:03] kietnht: noti chỉ send tới user mà tạo reminder thôi
  [15:04] duyvna: um tại bả báo là k nhận đc noti, a tạo thử 1 reminder thì thấy có nhận bth nên mới nhờ e check thử acc bên bả sao
  [15:18] kietnht: Duy Vo a tạo reminder ở đâu sao vào audit log ko thấy ta
  [15:21] kietnht: và tab reminder nó chỉ show cho thằng user tạo nó thôi, ko show reminder cho user khác
  [15:30] duyvna: e bấm vào icon noti chọn cái noti đầu tiên a tạo á, e check của bả  sao báo k nhận đc noti issue #46 á
  [15:31] kietnht: khoan
  [15:31] kietnht: image.png
  [15:31] kietnht: còn cái này thì sao ?
  [15:42] duyvna: cái này thì bả báo có tạo reminder mà k nhận đc á
  [15:43] kietnht: ý là a nói vào tab reminder mà ko thấy
  [15:43] kietnht: rồi cuối cùng case này là sao
  [15:43] duyvna: ban đầu a nhầm là tưởng bả xài acc giống mình
  [15:43] duyvna: k biết có tạo riêng cho bả á,
  [15:44] duyvna: case này là bả báo k nhận đc reminder, e vào acc bả test coi dùm a thử bị sao. Hoặc nếu e có nắm acc của bả thì gửi a và
  [15:45] kietnht: image.png
  [15:45] kietnht: > login: lena.klebanov@samsongroup.com > pass: 45tgbhu89 > login: klebanovlena@gmail.com > pass: 45tgbhu89
  [15:55] duyvna: login: klebanovlena@gmail.com pass: 45tgbhu89 Anh Trinh a vào acc này thấy có nhận noti của bả tạo lun mà sao bả báo k n
  [15:56] duyvna: image.png
  [15:56] anhttl: anh xem mấy tgian tạo với tgian gửi noti có trùng khớp ko, mà bả có nói là acc đó à
  [15:56] duyvna: con bên Audits log có cần show State của reminder ko em?
  [15:57] anhttl: là sao á, ví dụ i
  [15:58] duyvna: bữa bên audits log mình chốt chỉ có làm 3 cái là xet reminder, change stt, với action Ignore/Snooze  của reminder thôi đ
  [15:58] anhttl: dạ đúng rồi
  [15:59] duyvna: https://precognize.atlassian.net/jira/software/projects/AA/boards/250?selectedIssue=AA-47 e coi con này nha, ý bả là phả
  [17:16] anhttl: Kiet Nguyen: bả hỏi ạ: additionally, I see that you operate on version 9.0, did you merged 9.2to your code?
  [17:16] kietnht: cái version này bả nói là sao nhỉ
  [17:16] dongnv: 9.0 là master, 9.2 là staging
  [17:17] dongnv: develop là 9.3
  [17:17] dongnv: 9.4 là AA
  [17:17] kietnht: vạy cái bả nói operator trên ver 9.0 là ở đâu bả thấy vậy
  [17:22] kietnht: để a hỏi lại nha :v

### Elena - Digital Plant — 41 messages
  [09:47] tiennd2: anh Duy Vo, Anh Trinh, mọi người dạo gần đây có thấy gì bất thường ở upsert node ko, khách hàng mới báo lỗi cũ tái diễn
  [09:55] anhttl: lỗi cũ là cái gì z Tien Nguyen
  [09:55] duyvna: lỗi cũ tái diễn là cụ thể lỗi gì thế e, bữa a giờ a chỉ upload img rồi add internal/external tag thôi
  [09:55] tiennd2: à e quên link ticket
  [09:55] tiennd2: đây nha mng https://precognize.atlassian.net/browse/SR-7445
  [09:55] tiennd2: sao e test thấy k bị ta
  [09:59] duyvna: tạo new customer sao nhỉ?
  [10:00] tiennd2: a check 2 ý gạch đầu dòng thoi nhe a Duy
  [10:00] tiennd2: new customer là ý họ mới chạy backup server
  [10:00] anhttl: là cái mà vụ bữa ông Dror restore new customer, xong tạo area nó bị unknown phải ko
  [10:01] tiennd2: à k phải nha, cái đó là sai version thôi
  [10:02] anhttl: vậy giờ có môi trường nào để test ko? chứ đưa nội dung dị thui khó hỉu quá
  [10:02] tiennd2: chờ tui xíu
  [10:04] tiennd2: chắc verify thử trên nusdev luôn á LA, qa-02 với studio-03(nusdev) đang cùng version
  [10:21] anhttl: trên nusdev đang gắn studio 1 á Tiến, hay ý ổng là test trên https://studio-03.client.samguard.co/admin-ui/#/login
  [10:21] anhttl: * trên nusdev đang gắn studio 1 á Tiến, hay ý ông là test trên https://studio-03.client.samguard.co/admin-ui/#/login
  [10:22] duyvna: A mới thử test vài vòng dựa trên thông tin bả nói thì thấy k bị gì cả nha, chắc xin thêm info cụ thể đi em hoặc e thử du
  [10:22] tiennd2: à z là 1 á
  [10:22] tiennd2: * à z là studio-1 á
  [10:26] anhttl: mà tui đọc nội dung ticket thì thấy đúng là họ mô tả cái issue unknown bữa mà ta. ổng thử đổi nusdev sang studio 3 tui c
  [10:26] tiennd2: ê khoan, qa-02 data trống trơn à
  [10:26] tiennd2: đúng r có khi chính nó
  [10:26] tiennd2: chờ tui tí
  [10:34] tiennd2: done nha Anh Trinh
  [10:39] tiennd2: em cũng thấy ok
  [10:56] trinm: Screenshot 2026-06-15 at 10.56.29.png
  [10:57] trinm: sao không có gì hết vậy mn
  [10:57] anhttl: mới đổi qua cho em test á
  [10:57] anhttl: anh đổi lại stu1 nha sorry
  [10:57] trinm: ok em
  [11:09] anhttl: Tien Nguyen: trên stduio 3 là tá tạo được á, tui check FE thì payload gửi đúng parent id rồi á. tạo area thì parent id l
  [11:09] anhttl: * Tien Nguyen: trên stduio 3 là tái tạo được á, tui check FE thì payload gửi đúng parent id rồi á. tạo area thì parent i
  [11:10] tiennd2: ok ok để tui check thử
  [11:10] tiennd2: chắc sẽ tìm cách dup data từ qa-02 sang studio-03
  [11:13] anhttl: dup để chi á ông, chắc nó cũng cùng data rồi mà nhỉ, là new customer á
  [11:14] tiennd2: tui thấy qa-02 đang hơi khác tí nè
  [11:14] tiennd2: ý là cũng nhiêu đó data thoi, mà mấy cái connection đang hơi khác

### Kunal - Fountain — 174 messages
  [09:16] trinhmtt: Em gui plan tuan nay a: ThinhT: 20h ViTHT: 40h => QC: 15h
  [09:20] trinhmtt: https://trello.com/c/MgBGamAN/2868-scheduled-order-chose-next-day-delivery-but-paid-8 Hung Pham con này live đuọc chưa v [thread: 1 reply]
    └ [09:22] hungpn: đơi xíu anh check lại bug cái nha
  [09:26] vitht: con này chị đang coi cái bug a hùng báo nha
  [09:26] vitht: * con 2868 này chị đang coi cái bug a hùng báo nha
  [09:32] vitht: cái bug này đã bị trên live lun rồi á a Hùng ơi
  [09:33] hungpn: thì sao nhi? cũng fai fix mà
  [09:33] vitht: lúc chọn cái ngày phí ship hiện trên calendar là 44 đô
  [09:33] vitht: xong rồi chọn dô trang checkout là thành 10 đô
  [09:34] vitht: thì e đang giải thích cho a là không phải từ code của e change mà nó bị lỗi, mà nó bị sẵn trên production rồi
  [09:34] vitht: chứ e có nói là không fix đâu
  [09:36] hungpn: nào fix xong hú anh nhé
  [10:20] vitht: Bên fountain BETA fix cái issue a báo rồi nha, a check lại được rồi á [thread: 9 replies]
    └ [10:50] hungpn: image.png
    └ [10:51] hungpn: Vi Tran: giá là 50 mà sang trang cart thì lên 55 nhỉ?
    └ [11:02] vitht: e đang check lại
    └ [11:02] vitht: bên infinity cũng bị từ 50 mà giảm còn 30
    └ [11:47] hungpn: có rule ẩn nào k nhỉ?
    └ [11:47] hungpn: Vu Tat: Phat Le
    └ [11:47] hungpn: trước làm có rule nào check in T7 CN dc giảm giá k?
    └ [11:47] phatdlt: e k nghe nói á a
    └ [11:51] vutq: không có rule này nha anh
  [10:21] vitht: * Bên fountain BETA fix cái issue a báo rồi nha, a check lại được rồi á a Hung Pham
  [10:37] hungpn: okie
  [11:50] vitht: Cho mình hỏi là xưa ai viết cái hàm tính phí này thế
  [11:51] vitht: tại nó đang tính ngày cuối tuần là $20 + $10 á
  [11:51] vitht: là bị sai cái phí trên calendar rồi
  [11:51] vitht: return currentDateIsLastDateInWeek ? expressFee + EXTRA_FEE : expressFee
  [11:51] vitht: const determinePriceBasedOnDate = (   longDateFormat: string,   expressFee: number,   isFutureShipping: boolean = false 
  [11:52] hungpn: vậy thì fai xem cái giá trên calendar hiển thị có đúng k nữa đó, nếu rule trên là đúng
  [11:52] vitht: giá trên calendar update trên staging là đúng chưa Trinh Mai
  [11:53] vitht: của cả fountain và infinity á
  [11:55] vitht: cái này đang bị trên live fountain lun á nha
  [11:55] vitht: * cái này đang bị trên LIVE FOUNTAIN lun á nha
  [12:00] vutq: cái hàm không phải là vấn đề đâu nha chị Vi Tran, hiện tại chọn bất cứ ngày nào trong calendar thì FE cũng gửi info sai 
  [12:01] vitht: thì cái ngày này nó tính gía khi submit chọn ngày cúi tuần là $30 thay vì @50
  [12:02] vitht: * thì cái ngày này nó tính gía khi submit chọn ngày cúi tuần là $30 thay vì $50. Hiển thị trên calendar là $50 nhưng khi
  [12:02] vitht: * Bên infinity BETA thì cái ngày này nó tính gía khi submit chọn ngày cúi tuần là $30 thay vì $50. Hiển thị trên calenda
  [12:03] vitht: * Bên infinity BETA thì cái ngày này nó tính price khi submit chọn ngày cúi tuần là $30 thay vì $50. Hiển thị trên calen
  [12:14] vitht: Screenshot 2026-06-15 at 12.14.07 pm.png
  [12:14] vitht: giá trên live fountain cũng đang khác giá với trên staging nữa. V cái giá nào mới là đúng  Trên live
  [12:14] vitht: trên BETA
  [12:15] vitht: Screenshot 2026-06-15 at 12.14.50 pm.png
  [12:16] vitht: * giá trên live fountain cũng đang khác giá với trên staging nữa. V cái giá nào mới là đúng ? Trên live
  [12:26] vutq: cái giá shipping còn tuỳ thuộc nhiều yếu tố như attribute cụ thể của 1 gift, … nữa - mà hiện tại nó không quan trọng chị
  [13:25] vitht: cái attribute special_dispatch_date này của orderState đúng không
  [13:44] vitht: thấy trong cái orderState nó lưu cái này đúng lun rồi mà
  [13:44] vitht: ý em là cái orderState của attribute nào
  [13:44] vitht: Screenshot 2026-06-15 at 1.43.40 pm.png [thread: 20 replies]
    └ [13:46] vutq: cái params mà BE nhận được lúc chị submit có đúng ngày được chọn không á
    └ [13:51] vitht: checkout_date_display: "Saturday, June 20",
    └ [13:51] vitht: đúng a
    └ [13:52] vitht: cái attribute checkout_date_display của cart_item lưu đúng ngày lun mà
    └ [14:07] vitht: Vậy giờ sao Vũ
    └ [14:08] vitht: đổi lại cái điều kiện trong hàm đó cho shipping fee đúng vs calendar hay sao
    └ [14:09] vutq: có shipping price có ngày hết rồi thì debug tiếp dưới BE thôi chị :v
    └ [14:09] vutq: coi lúc cart_item được tạo ra nó nhận params gì ...
    └ [14:10] vitht: ý là chị debug nguyên nhân không phải ở BE
    └ [14:10] vitht: mà là FE truyền xuống sai á
    └ [14:11] vitht: nó truyền cái shipping fee là giá sai
    └ [14:11] vitht: thay vì nó truyền $50 mà nó truyền là $30
    └ [14:11] vitht: chứ ở BE không có sai gì hết
    └ [14:13] vutq: hm 🤔 em thấy nó đang show $54 đúng nè, tới chỗ này rồi thì đâu còn tính toán gì nữa
    └ [14:14] vutq: chị chụp full params em coi thử
    └ [14:14] vitht: thì bởi dị chị nói là do cái hàm trên FE
    └ [14:15] vitht: chứ k phải là do BE á
    └ [14:15] vitht: do FE nó truyền xuống sai
    └ [15:26] vutq: hm ??? em vẫn chưa hiểu chị còn cấn chỗ nào khúc này ------ cách calendar đã calculate đúng hết rồi,
    └ [16:02] vitht: ý là cái khúc mà nó tạo giỏ hàng á. Lúc chọn trên calendar là hiển thị $50 nhưng khi tạo card thì nó
  [13:44] vitht: * ý em là cái orderState của attribute nào Vu Tat
  [13:49] thinht: https://trello.com/c/OUrn7C1z/2918-gift-drop-order-cannot-swap-gift Hung Pham test lại tính năng này trên staing bao gồm
  [13:51] vitht: * đúng á
  [13:54] thinht: có cần a tắt rollbar trên staging lại k Vu Tat hay để đó luôn [thread: 1 reply]
    └ [13:54] vutq: cứ để yên đi anh
  [13:54] thinht: Trinh Mai: cho a xin ticket mới nha
  [13:59] trinhmtt: https://trello.com/c/RCfYhnv4/2938-gift-drop-link [thread: 11 replies]
    └ [14:13] hungpn: image.png
    └ [14:13] hungpn: Thinh Tran:
    └ [14:15] thinht: Trinh Mai: lỗi này ở đợt push live trước đã tạm vá rồi nha e.  hiện tại a vừa có bản update mới trên
    └ [14:16] thinht: cho a xin ticket khác trong khi chờ feedback từ HÙng nha Trinh Mai
    └ [14:20] trinhmtt: Hung Pham: anh ưu tien cái này nha anh
    └ [14:22] hungpn: okie em
    └ [16:15] hungpn: Vu Tat: Trinh Mai lên live được rồi nhé
    └ [16:23] trinhmtt: Thinh Tran: anh đưa info cho anh Vu Tat live nha anh
    └ [16:28] thinht: BE: https://github.com/iamksheth/FountainGreetings/pull/435 FE: https://github.com/iamksheth/Fountai
    └ [16:35] vutq: lên LIVE rồi nha mn Trinh Mai Thinh Tran Hung Pham
    └ [16:38] thinht: có j báo cus ở ticket lỗi hồi sáng luôn nha e Trinh Mai
  [13:59] trinhmtt: coi con này gấp nha anh
  [14:14] hungpn: image.png
  [14:14] hungpn: có fai của mình hok nhớ cancel nha m.n [thread: 2 replies]
    └ [14:15] thinht: cancel zúp luôn fen
    └ [14:16] hungpn: done nha
  [14:23] vitht: ủa a Hùng ơi
  [14:23] hungpn: oie em
  [14:23] vitht: sao e thấy cái này nó save là $50 á
  [14:24] trinhmtt: anh Vu Tat cos gì transfer card này cho anh Thinh Tran giup em nha  https://trello.com/c/NX5yxK48/2697-upgrade-to-nextjs [thread: 6 replies]
    └ [14:24] thinht: bữa Vũ nói ticket này chưa làm dc á e
    └ [14:26] vutq: có thể upgrade dần rồi nha anh Thinh Tran, dựa theo lịch sử bên Fountain mà làm là được fountain/269
    └ [14:26] thinht: sao transfer thấy gọn zữ e 🤣 có j cần note thêm k :D
    └ [14:27] vutq: không nha anh, đọc git history rồi làm tương tự là xong
    └ [14:28] thinht: này là cho Infinity hay là cả 2 vậy Vu Tat
    └ [14:28] thinht: Fountain là 16 r mà pk
  [14:25] vitht: sao dạo này thấy BETA chậm dữ dị
  [14:34] hungpn: đang k add dc item vào cart đây, beta fountain bị chậm á [thread: 1 reply]
    └ [14:35] thinht: tại nó đi coi WC chưa tỉnh táo á. ráng đi
  [14:40] vitht: die lun rồi ở đó chậm
  [14:40] vitht: Screenshot 2026-06-15 at 2.40.10 pm.png
  [14:43] vitht: ủa
  [14:43] vitht: có ai dô đc chưa
  [14:44] vitht: * có ai dô đc BETA chưa
  [14:59] vitht: ủa aloooo
  [14:59] vitht: mn ơi Live cũng k dô đc á
  [15:00] thinht: nãy HÙng zô dc mà bị j ghê vậy
  [15:01] vitht: nhờ mấy người dô live dùm rồi thấy có ai dô đc đâu
  [15:01] hungpn: anh vào dc nè, hơi lâu tý thôi
  [15:01] thinht: Vu Tat: hộ giá
  [15:02] vitht: ý là a dô a có add giỏ hàng rồi xem được không á
  [15:02] thinht: ah mới load lại thấy zô live fountain dc r. chắc server đi coi WC thiệt
  [15:20] vitht: Còn card nào không Trinh Mai , mấy cái kia đang đợi Vũ rep mới làm tiếp đc
  [15:21] trinhmtt: https://trello.com/c/ItHdgsNc/2823-fountain-infinity-patch-vulnerabilities-and-delete-data Vi Tran chị coi con naỳ thử n
  [15:23] hungpn: https://staging.infinityroses.com/recipient_address/dsG4M7Ul -- vào link này xem thử Thinh Tran [thread: 8 replies]
    └ [15:25] thinht: gift này có vấn đề. để check thử
    └ [15:25] hungpn: cái đó t check xong rồi, giờ vào lại link lần 2, nó k show màn hình đã chọn gift
    └ [15:26] thinht: nó có lỗi liên quan tới images của variant.
    └ [15:26] thinht: có swaft j trước đó k?
    └ [15:28] hungpn: có luôn thì fai
    └ [15:29] thinht: tái tạo lại thử
    └ [16:05] hungpn: https://staging.infinityroses.com/recipient_address/pSOJ1k9c
    └ [16:05] hungpn: nè
  [15:26] vutq: *  hm ??? em vẫn chưa hiểu chị còn cấn chỗ nào khúc này cách calendar đã calculate đúng hết rồi, mình chỉ cần đưa trực t
  [15:26] vutq: *  hm ??? em vẫn chưa hiểu chị còn cấn chỗ nào khúc này cái calendar đã calculate đúng hết rồi, mình chỉ cần đưa trực ti
  [15:26] vutq: *  hm ??? em vẫn chưa hiểu chị còn cấn chỗ nào khúc này cái calendar đã calculate đúng shipping hết rồi, mình chỉ cần đư
  [16:04] vitht: a Hùng thử cái gift khác xem
  [16:04] vitht: nó có hiện đúng phí ship hông
  [16:04] vitht: Screenshot 2026-06-15 at 4.04.25 pm.png
  [16:05] vitht: E chưa thử gì hết mà hiện nó vẫn đúng á
  [16:06] hungpn: anh thủ vẫn 55
  [16:08] vitht: với cái gift này lun á hả
  [16:16] hungpn: khoan, anh clear cache thì nó về lại 50 rồi nè Vi Tran
  [16:22] vitht: vậy chắc e chỉ cần fix bên infinity nữa
  [16:24] vitht: Bên e nó vẫn hiện $55 đối với cái gift này á
  [16:24] vitht: Screenshot 2026-06-15 at 4.24.06 pm.png
  [16:25] hungpn: nhưng vãn có item show giá 55😐️
  [16:28] vitht: ủa cái này có liên quan gì tới giá của shipping hem dị [thread: 1 reply]
    └ [16:34] vutq: không nha chị, đây chỉ là text thôi
  [16:28] vitht: Screenshot 2026-06-15 at 4.28.15 pm.png
  [16:29] vitht: cứu toai
  [16:29] vitht: Screenshot 2026-06-15 at 4.29.19 pm.png
  [16:32] vitht: Screenshot 2026-06-15 at 4.32.23 pm.png
  [16:32] vitht: Description của một cái gift khác
  [16:33] hungpn: chắc đợi tin của Vu Tat nè
  [16:33] vitht: không ai có ấn tượng gì lun hả
  [16:34] vutq: 
  [16:34] hungpn: mấy cái này chỉ là text show trông mấy cái section thôi em
  [16:34] hungpn: image.png
  [16:35] vitht: ý là text show section nhưng giá của nó khác nhau á
  [16:36] vitht: mọi người không thấy lạ là chọn gift khác nhau trên cùng một ngày, một giá ship nhưng mà cái FE truyền dô khác hả ?
  [16:54] vitht: ủa nếu mấy cái đó là text thì tại sao lưu cái giá ở chỗ này cho từng cart_item ta
  [16:54] vitht: fedex_express_saver_shipping_fee
  [16:54] vitht: Screenshot 2026-06-15 at 4.54.42 pm.png
  [16:59] vutq: 1. các fields shipping info có thể là bất cứ text gì cũng được, không ảnh hưởng / liên quan đến giá ship được tính toán 
  [16:59] vitht: vậy thì mỗi gift sẽ có giá ship fedex_express_saver_shipping_fee
  [17:00] vitht: nếu chỉ hiển thị giá trên calendar là $50 thì cái đó bị sai rồi
  [17:10] vitht: vậy nếu trường hợp thứ 3 mà sáng giờ mọi người biết là đã tính đúng giá ship lun rồi đó
  [17:10] vitht: fedex_express_saver_shipping_fee chính là giá ship specific của gift đó, nếu có thì dùng, không thì sẽ dùng giá ship glo
  [17:11] vitht: * 2. fedex\_express\_saver\_shipping\_fee chính là giá ship specific của gift đó, nếu có thì dùng, không thì sẽ dùng giá
  [17:11] vitht: * 3. fedex\_express\_saver\_shipping\_fee chính là giá ship specific của gift đó, nếu có thì dùng, không thì sẽ dùng giá
  [17:14] vitht: cái gift a Hùng thấy là phí $55  á
  [17:14] vitht: Kết quả mong đợi: $55. Vì ngày 20/06/2026 là Thứ Bảy nên hệ thống chỉ sử dụng phí Standard Overnight ($45) và cộng thêm  [thread: 1 reply]
    └ [17:15] hungpn: noted
  [17:14] vitht: a Hùng note lại giúp e đi
  [17:14] vitht: * a Hung Pham  note lại giúp e đi

### Những chú voi con đáng yêu — 2 messages
  [08:32] duongdn: https://www.youtube.com/watch?v=yc1vBvLf2MU
  [08:32] duongdn: cái này tuy hơi AI script nhưng là thực tế, tranh thủ bào đi mn rồi  thời gian nữa quay lại thời code tay :D

### NUS - Colin - ETZ — 5 messages
  [15:33] kietnvt: chị Bình có báo dự án mình: Colin CardWell - ETZ ==> sẽ bắt đầu dùng Workstream nha mn.
  [15:34] kietnvt: Mình sẽ gửi members hiện tại cho chị Bình , mn lát nữa login vào workstream xem có dự án ETZ chưa nha.
  [15:36] kietnvt: Ủa nhầm , giờ mọi người tiến hành login workstream nha. để chị Bình có thể add vào dự án 🙏

### NUS - Elliott - New GreenFort Capital — 8 messages
  (thread replies only — no root messages in window)

### NUS Technology — 3 messages
  [16:01] thaonm: 📢  **Bảng tin:  Tóm tắt nhanh tình hình "chiến sự" sau loạt trận cuối tuần!** ⚽ Khép lại loạt trận vòng bảng cuối tuần  [thread: 2 replies]
    └ [16:05] samht: Trinh Mai: giờ em còn cần reset data không, vẫn còn cơ hội á
    └ [16:35] thinht: reset cho a thử đi e

### Philip Briggs - Elevate365.AI — 41 messages
  [13:16] namtv: Phil Briggs 12:41 PM Hi Will, I just sent you a message on Teams. I have some work and I wanted to see if you are availa
  [13:17] nghiepnq: > do you have some availability to do something for me?   chưa có nói task gì cụ thể á a Năm chỉ hỏi có làm được không t
  [13:18] namtv: Chắc nói ổng làm được, cho detail đi
  [13:34] nghiepnq: ông gửi info rồi, nhưng em thấy là ông có code r nhưng k work, chắc cần vào xem chi tiết mới biết, này ai làm giờ a Năm
  [13:39] namtv: Trí nha
  [13:43] nghiepnq: khi nào qua bên này v Tri Nguyen
  [13:43] trinm: nay em đang cố định 4h buổi chiều bên khác rồi anh
  [13:44] nghiepnq: vậy tới mai mới check được à... ông này hay muốn cái gì cũng làm liền
  [13:47] nghiepnq: nếu làm bên này trước có được ko ?
  [13:48] trinm: này anh hỏi anh NA thử, tại bên EasyRate report mỗi ngày mà
  [13:50] nghiepnq: a Dương xử giúp e phát nha
  [13:51] duongdn: hở :o
  [13:51] duongdn: có task .net à :D
  [13:53] nghiepnq: ủa a Dương DM mà đúng ko? giờ bên này có xem xét làm task trước ưu tiên hơn bên dự án của Trí hôg, tại ông này hay muốn  ⚠️
  [13:54] duongdn: À ok
  [13:54] namtv: Mikkel thì 4h/day mà hả?
  [13:55] trinm: dạ đúng rồi anh
  [13:57] duongdn: đang hỏi Nhật Anh, chờ confirm
  [14:05] duongdn: Nhật Anh báo có thể qua nha, Tri Nguyen  wrap up bên dự án kia rồi nhảy ra đây
  [14:06] trinm: anh Nghiep Nguyen gửi em info đi anh
  [14:06] nghiepnq: vao đọc team đi
  [14:07] nghiepnq: cơ bản là Create a public static demo where the user first chooses an industry, then the app loads industry-specific dem
  [14:07] nghiepnq: này liên quan demo trên web thôi, không có đụng cái BE hay code trước đó gì hết
  [14:08] nghiepnq: trên nhánh demo hay demo-2 gì đó vào check code thử em
  [14:09] nghiepnq: `Let me arrange to check it `
  [14:09] nghiepnq: e rep hả Trí
  [14:09] trinm: không có
  [14:09] trinm: chưa có rep gì hết
  [14:11] duongdn: a reply tạm vậy thôi
  [14:31] duongdn: Tri Nguyen:  qua chưa em?
  [14:31] trinm: qua nãy giờ rồi anh
  [14:31] duongdn: ngon lành
  [15:32] trinm: giờ làm việc với ông này không biết đang nói chuyện với người hay AI nữa hỏi ông 1 phát ông gửi 1 tin nhắn dài ngoằn do 
  [15:33] duongdn: quá thích, copy hết vô con Claude, said Implement customer feedback, add file, enter, đi uống nước, wc, vô test
  [15:33] duongdn: :))
  [15:36] trinm: giờ chỉ còn cách đó thôi anh chớ sức người không làm nổi , ông vibe 1 feature bự xong chạy không được như ý ổng, giờ quă
  [15:37] duongdn: tôi biết ngày này sẽ xảy ra mà
  [15:37] duongdn: :))
  [15:37] duongdn: làm gì có chiện AI thay thế dev
  [15:37] duongdn: :))
  [15:40] trinm: không những không thay được mà còn làm cho vấn đề khó giải quyết hơn

### Rebecca - William Bills — 2 messages
  [08:34] tuannt: ok a đẻ e quét app xem
  [08:50] duongdn: deadline tuần trươc rồi ông ơi

### Rory Hackett - BXR App — 79 messages
  [08:59] khoatd: image.png
  [09:00] khoatd: mình định kêu ông remove cái màn signup đi mà anh Minh Trinh :))
  [09:01] minhtv: thì ý a là vậy đó, chuyển qua onboardign bằng web view
  [09:03] khoatd: ok anh, đọc thấy hơi rối rối kkk
  [09:05] khoatd: cái sdt thì giờ không còn bắt buộc, cái region thì có check lúc signup rồi vậy login lần đầu sau khi signup chỉ cho user
  [09:07] khoatd: Tin Pham làm tới đâu rồi, t có ít giờ bên này nên cần gì réo sắp xếp nha
  [09:07] tinpc: nếu singup trực tiếp từ webview đâu cần chọn studio, nó đang lấy default theo từng region á
  [09:10] khoatd: là mỗi region có default studio luôn rồi hả, vậy thì ngon luôn không cần làm gì
  [09:11] khoatd: sút cái form signup đi luôn cho nhẹ người
  [09:13] tinpc: ổng cho phép add classess r á, chắc nhờ a Lễ add data r check lại flow booking
  [09:20] khoatd: cái này ưu tiên giúp tụi em trước nha anh Lễ, cái này chắc mình clone database ra rồi cho thêm cái gì đó vào nội dung để
  [09:46] lenh: anh add classes rồi đó Tin Pham
  [09:50] lenh: anh thêm prefix "UAE -" cho class và pack
  [09:52] khoatd: ngon, thank anh!
  [15:00] hangntt: Minh Trinh: anh cho em xin link redmine dự án với ạ
  [15:02] minhtv: Chưa có luôn, chờ chút
  [15:21] minhtv: https://redmine.nustechnology.com/projects/rory-hackett-bxr-app Add đủ vào rồi nhé mọi người ơi
  [15:39] minhtv: ổng online rùi nhé, cần OTP hú ổng
  [15:41] khoatd: Also when can you send me the examples of your colleague’s work with the UI/UX?
  [15:41] minhtv: đang review
  [15:41] minhtv: nói ổng trong hôm nay
  [15:43] khoatd: And yes, we have the stripe account for the UAE, if you log in with the same details as for the UK you can switch to the
  [15:44] khoatd: check cái này xem sao nha Tín
  [15:52] tinpc: stripe bên này dùng account nào v
  [15:52] tinpc: quên mất rui`
  [15:52] khoatd: chắc là jeff@nus
  [15:54] tinpc: hình như k phải jeff, đợt nhớ login stripe phải có otp của ổng hay sao á
  [15:54] khoatd: vào thử xem, nếu không được thì nhắn kêu ổng đưa lại
  [15:54] khoatd: t nhớ đợt đó ổng có add jeff và car carrick vào rồi mà
  [15:56] tinpc: thấy stripe báo có account jeff r, có giữ pass đó kh
  [15:56] tinpc: Screenshot 2026-06-15 at 15.56.38.png
  [15:57] khoatd: t không, request anh Năm ấy
  [15:59] khoatd: I have a meeting with the client on Thursday, how far along do you think we will be with the app by then? -> cuối ngày n
  [16:02] minhtv: Như nãy có chat vs a Lễ, trong tuần này done nhé . Các dev hiện tại đang làm quá giờ nhiều, mọi người spend thêm time ng
  [16:29] khoatd: cũng cũng tầm đó nha anh, đang chạy hết tốc lực để kịp đây 🚲️
  [16:29] khoatd: anh Le Ngo , em vừa check  2 account Carrick và Jeff thì hình như là chưa được add vào
  [16:30] khoatd: đợt trước làm login bằng email của ổng luôn đúng không anh?
  [16:31] khoatd: bên BE cũng cần bộ key cho UAE luôn không chỉ mobile đâu nha anh
  [16:34] lenh: Stripe là account của ổng
  [16:35] lenh: bửa ổng nói là ổng đang hỏi bên UAE để có Stripe của UAE
  [16:35] khoatd: > And yes, we have the stripe account for the UAE, if you log in with the same details as for the UK you can switch to t
  [16:35] khoatd: ổng nói vậy nè
  [16:37] lenh: à, thấy rồi
  [16:38] lenh: image.png
  [16:39] lenh: chắc là cái này
  [16:40] khoatd: ngon, vậy anh setup rồi cho em bộ key này nha: publishableKey: live/sandbox merchantIdentifier
  [16:40] lenh: nó mới có sandbox thôi
  [16:40] khoatd: kêu ổng share cho cái code mà ổng lặn nữa rồi
  [16:41] lenh: còn setup webhook nữa
  [16:41] lenh: à, mà mobile không cần webhook hả
  [16:42] khoatd: nhớ dí ổng nha, em nhớ làm cái gì đó mà phải login gmail rồi open redirect link with the same browser gì gì đó mới được 
  [16:43] lenh: à, có
  [16:45] lenh: Cơ mà cũng chờ web setup mới dùng Stripe payment trên UAE được
  [16:46] lenh: sanbox publishableKey anh share qua slack rồi đó Khoa Tran
  [16:46] lenh: Live chưa có đâu, UAE chưa setup xong nên chưa có Live mode
  [16:47] lenh: Kêu client UAE setup xong Stripe account xong mới có Live mode
  [16:48] khoatd: anh ném cho ổng 1 cái message dí ổng đi anh
  [16:48] khoatd: phụ Jeff 1 tay, dí ổng mấy nay mới được tới đó thôi :))
  [16:50] lenh: em chat đi để anh tập trung lo backend, còn membership number, booking, deploy nữa
  [16:51] lenh: chắc backend không xong thì mobile cũng kẹt thôi
  [17:11] khoatd: mấy cái class đang là dummy nên chắc test payment chưa được đúng không anh Le Ngo ?
  [17:11] khoatd: Screenshot 2026-06-15 at 17.11.29.png
  [17:14] lenh: payment dùng gì vậy
  [17:14] lenh: Stripe hay trực tiếp với MB luôn
  [17:18] khoatd: trực tiếp anh
  [17:19] lenh: Em dùng card thiệt test à
  [17:19] lenh: mà card thiệt cũng không được đâu
  [17:19] lenh: Do UAE MB chưa có complete setup payment
  [17:20] lenh: cái này thì mình không setup được, client của UAE họ setup
  [17:22] khoatd: em dùng 4242, thêm field Test= true
  [17:23] lenh: vậy thì không rõ, tại anh cũng không nắm hết setup trên MB
  [17:23] lenh: nhưng cái này thì anh thấy có warning nên biết
  [17:29] khoatd: để mai em điều tra thêm
  [17:29] khoatd: > the designer looks good, are you able to make an introduction please? anh Minh Trinh
  [17:29] khoatd: * > the designer looks good, are you able to make an introduction please? anh Minh Trinh
  [17:30] minhtv: Replied
  [17:33] minhtv: Khoa confirm cái Klavio phát
  [17:34] minhtv: đậu , 2 người cùng nhắn 1 lúc
  [19:47] khoatd: hông sao hông sao, mạng lag xíu thôi mà :))
