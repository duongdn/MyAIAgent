# Matrix — since 2026-09-01 00:00 +07:00

### NUS - Bailey - Paturevision 2026 — 280 messages
  [14:45] duongdn: Cus báo issue nha mn
  [14:57] tuannt: Dat Nguyen: có gi tạo remind nhé e a cũng đang check [thread: 6 replies]
    └ [15:26] datnc: A đang check gì vậy anh Tuấn?
    └ [15:26] tuannt: https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1788270850141949?thread_ts=1788270421.
    └ [15:28] datnc: Vụ selling price sent qua Console đúng ko a?
    └ [15:29] datnc: A check log thử Pres nó send cái gì vậy?
    └ [15:30] datnc: A qua e cho nhanh nha.
    └ [15:35] datnc: https://paturevision.fr/admin123/sell/orders/39833/view
  [15:26] tuannt: https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1788270850141949?thread_ts=1788270421.570759&cid=C0338NXK3
  [15:46] datnc: Screenshot 2026-09-03 154531.png
  [15:46] datnc: Ủa sao cái gross purchase price = 0 đc nhỉ?
  [15:46] datnc: Còn cái selling_price là log pres gửi sang có mà đúng ko anh? Vậy bug phía Console rồi.
  [15:47] datnc: * Còn cái selling\_price là log pres gửi sang có mà đúng ko anh Tuan Nguyen ? Vậy bug phía Console rồi.
  [15:53] tuannt: a thử cho AI quét qua thì nó ghi thế này:  Bên Console (tại file app/helpers/order_helper.rb), có một hàm tên là handle_
  [15:57] datnc: Product đầu tiên lfa product bth mà anh?
  [15:57] datnc: * Product đầu tiên là product bth mà anh?
  [15:58] datnc: Thì nó làm gì có packID nhỉ?
  [15:59] datnc: E ko rõ là nó chạy ntn nhưng theo e biết trc giờ frontend chỉ dùng số từ Pres sent sang để show vào đó.
  [15:59] tuannt: a dang cho AI quét cái order ổng báo là 39833
  [15:59] tuannt: còn cái ảnh em gửi chưa check
  [15:59] tuannt: còn cái kia khả năng do mệnh gía or điều kiện gì nó bỏ qua thôi
  [16:00] tuannt: để check
  [16:02] datnc: Ủa? Như cái queue trên live ko chạy đó anh :"|...
  [16:03] datnc: Check liền hộ em với.
  [16:04] datnc: Và vì sao nó lại tự stopped nữa vại? 😂
  [16:04] tuannt: sao e beit stop
  [16:04] tuannt: ?
  [16:04] tuannt: ?
  [16:05] datnc: Tạo order mới ko thấy sang?
  [16:06] datnc: https://paturevision.fr/admin123/sell/orders/39892/view
  [16:06] datnc: E mới tạo cái này nữa... đâu thấy nó ở Console đâu anh?
  [16:06] datnc: https://console.paturevision.fr/orders/booked?page=2
  [16:08] tuannt: ý em là bên prestashop?
  [16:10] datnc: Vâng anh...
  [16:11] datnc: Giờ thì thấy nó có chạy lại rồi.
  [16:11] tuannt: a chua lam gi luon
  [16:11] tuannt: :)
  [16:13] datnc: Thế e chịu rồi :")), có cách nào mình track/log vụ này không?
  [16:14] tuannt: a thay log moi nhat la [2026-09-03 11:00:01] Queue is ALIVE (PID: 36535)
  [16:14] tuannt: k thay no die
  [16:15] duongdn: có khi đơn giản là do nó chậm thôi
  [16:15] tuannt: dung :))
  [16:16] duongdn: nếu muốn, mình có thể tạo 1 cái trang để ổng xem status của các request push, để make sure cái nào đã push, đang và sẽ p
  [16:16] duongdn: và có thể ưu tiên 1 cái nào đó, giống như cái nút force sync
  [16:16] duongdn: nhưng đây sẽ là 1 trang quản lí chung, nhìn cho dễ
  [16:17] tuannt: cai nay chac se gợi ý ổng làm
  [16:29] datnc: https://staging-sg.paturevision.fr/admin123/sell/orders/35933/view Giờ tới cái staging 1 nó ko sync order rồi a Tuấn ơi 
  [16:29] datnc: E muốn reproduce bug cơ mà thế này e thua gòi.
  [16:29] datnc: https://staging.console.paturevision.fr/orders/booked?page=7
  [16:32] tuannt: cứ từ từ xem job bên staging pres
  [16:35] tuannt: https://staging.paturevision.fr/ hay https://staging-sg.paturevision.fr/
  [16:35] tuannt: lắm staging quá
  [16:40] tuannt: staging-sg queue vẫn work nhưng lỗi crash sql rồi
  [16:46] tuannt: Dat Nguyen: thử xem nó có sync qua chua e
  [16:47] datnc: Có vẻ vẫn là chưa...
  [16:48] tuannt: đợi xíu xem a dang check log thì Queue is ALIVE (PID: 36558)
  [16:48] tuannt: nó k die
  [16:49] tuannt: Screenshot 2026-09-03 at 16.49.31.png
  [16:49] tuannt: a có thấy log sync data
  [16:50] datnc: https://staging.console.paturevision.fr/orders/booked?page=7
  [16:50] datnc: Chắc lỗi gì rồi, e ko thấy Console tạo đc order mới ở đây nha.
  [16:51] tuannt: ý là đã sync dc data từ pres chưa?
  [16:51] tuannt: để xong 1 vấn đề queue đã
  [16:51] tuannt: r tính tiếp
  [16:53] havs: thằng staging-sg bên prestashop là sync qua staging.console à 🤔
  [16:58] datnc: Đúng rồi đó Hà.
  [16:58] datnc: Chắc do task upgrade DB làm nó lỗi ko create đc order chẳng?
  [16:59] tuannt: a check thi nó dagn sync qua https://staging.console.paturevision.fr
  [09:37] datnc: https://staging.console.paturevision.fr/orders/43475
  [09:37] datnc: Thấy nó qua mà 500 rồi nha a Tuấn.
  [09:37] datnc: A ưu tiên fix cái vụ selling_price này sớm nha, có gì a nhờ bên Hà support hộ e với.
  [10:29] tuannt: Screenshot 2026-09-04 at 10.29.23.png
  [10:29] tuannt: Dat Nguyen:
  [10:29] tuannt: theo a check body data thì selling_price = 0 nha cho CAGE HDX 1100 VERSATILE
  [10:29] tuannt: bên prestashop bắn qua
  [10:33] tuannt: còn bên prestashop trong module spvfastpick có vẻ là đoạn này
  [10:34] tuannt: Screenshot 2026-09-04 at 10.34.15.png
  [10:34] tuannt: k rõ logic trước thế nào
  [10:36] tuannt: theo như code nó check purchase_price > 0 nhỏ hơn thì selling_price = 0
  [10:36] tuannt: mà data prestashop trả về "purchase_price"=>"0.000000",
  [10:37] tuannt: đây là lý do sao cái selling_price = 0 cho CAGE HDX 1100 VERSATILE
  [10:37] tuannt: Screenshot 2026-09-04 at 10.37.24.png
  [10:37] tuannt: còn cột Achat + revient = 0 de a check tiếp bên console
  [10:38] tuannt: có gì Ha Vo và Dat Nguyen xem có đúng logic k nha
  [10:41] havs: logic if else prices gì đó bên prestashop thì e ko có nắm, Đạt check thử nha
  [10:41] datnc: Như e mới đc khai sáng gì đó chờ e xí.
  [10:44] datnc: Gòi e thấy bug gòi nha.
  [10:45] datnc: Cái purchase_price bên Pres = 0 đấy.
  [10:46] datnc: Nên nó nhân vào equation tính sell_price làm product nó = 0.
  [10:46] datnc: Còn vì sao nó bằng 0 chờ e mò xí.
  [10:46] tuannt: k em tại vi purchase_price = 0 nên nó vào else luôn là gán luôn sell_price = 0
  [10:46] tuannt: chứ k có tính
  [10:47] tuannt: nó chỉ tính khi purchase_price > 0 thôi
  [10:48] havs: tại 0 * gì cũng = 0 á, nên câu từ của Đạt cũng v thôi a, code mình if return cho lẹ.
  [10:49] tuannt: ừ :)
  [10:50] tuannt: còn cái Achat + revient
  [10:50] tuannt: theo Đạt nói là
  [10:50] tuannt: nó phải lớn hơn hoặc bằng Prix d'achat
  [10:50] tuannt: mà a thấy nó chỉ lỗi vs mệnh giá USD
  [10:50] tuannt: khả năng miss case gì đó
  [10:50] datnc: Như lỗi con người nha mn, do phía ổng set = 0 ấy, bên Console, chắc là quên update. (vậy done cái selling price) Còn cái
  [10:51] tuannt: purchase price = 0 r mà
  [10:51] tuannt: khoan a k hiểu =))
  [10:51] tuannt: haha
  [10:51] tuannt: ý em là console k liên quan đến presstashop với cái acaht + revient đúng k
  [10:51] tuannt: cái này a để ý nó chỉ lỗi vs mệnh giá USD
  [10:51] tuannt: để a check chi tiết :))
  [10:52] datnc: Console có 2 cái purchse price (1 cái thuộc product table -> cái này hiện = 0). Một cái từ PO table -> cái này có value 
  [10:53] tuannt: ừ a k rõ nên cần thảo luận nè, và check code thêm
  [10:53] tuannt: để a check theo ý của em xem sao
  [10:53] tuannt: có vẻ a hiểu ra gì r
  [10:54] havs: gross_purchase_price orderline lấy từ product.average_gross_purchase_price -> mà average thì tính trung bình từ palette 
  [10:55] havs: check lại mấy con số đó dưới DB chắc là ra
  [14:25] tuannt: Dat Nguyen: a co fix bug merge vao staging roi nhe
  [14:25] tuannt: e check giup a xem ok chua
  [14:25] tuannt: Neu ổn hẹn ổng t2 deploy
  [14:25] datnc: Hả fix vụ gì á anh? Gross purchase price?
  [14:25] tuannt: Đúng
  [14:50] datnc: A query DB hộ e coi có bao nhiêu active products ở Console đang có purchase price = 0 với?
  [14:58] tuannt: ý e là thằng purchase price = 0 này khi sync từ prestashop qua k phải gross_purchase_price như Hà nói ?
  [16:13] duongdn: số lượng purchace price = 0 thế nào mn
  [16:16] duongdn: > @Amy please look at this video in detail, and look at both orders of the same products just two months apart and expla
  [16:24] tuannt: active_products_zero_purchase_price.txt
  [16:25] tuannt: Dat e xem nha
  [16:25] tuannt: Dat Nguyen:
  [16:25] tuannt: check xem ok chưa
  [16:25] tuannt: a k gửi list vào đây dc chắc dài
  [16:25] tuannt: có tầm 910
  [16:26] duongdn: vl
  [16:26] duongdn: hơi nhiều nha
  [16:26] duongdn: vầy đúng ko ...
  [16:26] duongdn: sao a có cảm giác có gì đó sai sai
  [16:26] tuannt: Screenshot 2026-09-04 at 16.26.49.png
  [16:26] tuannt: filter cũng ra mà anh
  [16:29] duongdn: ý  a là nếu cả ngàn product như vậy thì sao lâu nay ko sao
  [16:29] duongdn: chẳng lẽ cả ngàn cái này bị update data
  [16:29] tuannt: e k rõ có những order e xem
  [16:29] duongdn: có thể có 1 bug gì đó bên Pretashop nó update
  [16:29] tuannt: cũng bị như order id ổng báo
  [16:29] tuannt: mà lâu r
  [16:29] duongdn: có khi do resync lại thôi
  [16:30] tuannt: e cũng nghĩ khả năng đó nên sáng e mới check code module sync console bên prestashop
  [16:30] tuannt: thì thấy logic đó và hỏi mn sáng nay đó
  [16:30] tuannt: cũng k rõ logic thế nào
  [16:31] tuannt: k biết Lễ có ấn tượng gì cái này k
  [16:31] tuannt: trước nhớ mang máng Lễ có làm sync data product
  [16:32] duongdn: xác suất cao là do data Pretashop change hàng loạt
  [16:32] duongdn: cái này rất hay xảy ra
  [16:32] duongdn: vụ quote là 1 case
  [16:32] tuannt: nguy hiểm vậy
  [16:32] duongdn: nên nhắc tới nó ko Dat Nguyen  ?
  [16:32] datnc: Có thể là do Pres chăng?
  [16:33] datnc: Theo log nó về 0 từ đâu đó Tháng 6 thì phải?
  [16:33] datnc: 2026-09-04_16-26.png
  [16:33] datnc: Ngày 13/6.
  [16:34] duongdn: nghi lắm
  [16:34] tuannt: nếu từ tháng 6 có lẽ ông phải raise lên r chứ nhỉ
  [16:34] duongdn: có lẽ ko để ý
  [16:35] duongdn: hoặc như e nói, khi nó ko nằm trong case nào đó nó vãn có price
  [16:35] duongdn: thôi e report ổng đi
  [16:35] datnc: E nghĩ là đổi supplier vì cái này người đổi. Vì cái currency hiện tại là EUR, còn theo log lúc có giá nó là USD.
  [16:35] tuannt: ông đang tag tên slack rồi
  [16:35] tuannt: :))
  [16:35] datnc: Nên vẫn nghi là nv bác đổi rồi quên set lại.
  [16:36] tuannt: e cho cái msg tạm nha a Duong Doan
  [16:37] tuannt: a còn k rõ tại sao có case EUR có giá mà USD thì k :))
  [16:38] duongdn: hả msg gì
  [16:38] duongdn: để Đạt trả lời
  [16:38] tuannt: ok anh
  [16:39] tuannt: tại thấy ổng tag tên có vẻ đang sốt ruột
  [16:42] datnc: E reply gòi á.
  [16:42] duongdn: uhm
  [16:42] datnc: A có cái list product = 0 chưa?
  [16:42] tuannt: r a gửi e bên trên á
  [16:43] tuannt: Dat Nguyen:
  [16:43] tuannt: e xem qua nha
  [16:48] datnc: Chà nhiều dữ vậy ta?
  [16:48] tuannt: co du info do e check xem
  [16:48] datnc: Console nó có lưu mấy record của not-default supplier ko?
  [16:48] datnc: Này e ko nhớ nữa.
  [16:50] datnc: Do khổ cái ông này có nhiều product ổng cố tình để nó = 0 thiệt =.=...
  [16:51] duongdn: nên nãy a mới noi
  [16:52] duongdn: sao e định update hết product á
  [16:52] duongdn: To resolve this issue, Nick will query how many products currently have a 0 purchase price so you can update them on you
  [16:52] duongdn: lỡ có cái thực sự = 0 thì răng
  [16:54] datnc: Ý là cho bác cái list, để bên ổng tự update cái nào thật sự không phải = 0 đó anh. Chứ phía mình cũng đâu biết đc?
  [16:56] duongdn: à
  [16:56] duongdn: oh
  [16:56] duongdn: vậy gởi ổng xem sao
  [16:57] tuannt: check qua truoc nha e
  [16:57] tuannt: xem co chính xác chưa k ổng lại chửi nữa
  [17:00] duongdn: có ai bên Shane Bailey join kìa :v
  [17:01] datnc: A check hộ e là product có nhiều supplier í, thì Console nó có lưu record cũ của các supplier không anh? E confirm cái l
  [17:02] datnc: Đúng nhất là a query theo supplier name hiên giờ của nó và is_deleted=false á.
  [17:02] datnc: Hông biết nữa... chưa thấy bác rep gì :")).
  [17:15] datnc: Hú ù u a Tuấn ơi?
  [17:15] tuannt: sao em
  [17:16] datnc: Này nha.
  [17:16] tuannt: là sao ?
  [17:17] tuannt: supplier name nữa :))
  [17:17] datnc: Nếu đúng vậy thì e gửi bác luôn, mà a export sao dễ đọc hơn đi anh, product name - internal reference - supplier + purch
  [17:17] tuannt: mới lạ vậy
  [17:17] tuannt: supplier k chắc là gì
  [17:21] duongdn: > hi @Amy the purchase price does not impact the price in picking, its supposed to get the price from picking not the la
  [17:21] duongdn: chắc cứ fix thế này nha :v
  [17:22] duongdn: ok phát rồi fix đi
  [17:23] tuannt: vậy chắc k cần gửi list cho lão nữa đâu nhỉ ?
  [17:23] duongdn: uhm
  [17:24] datnc: Ổng đang hỏi logic á để e rep.
  [17:25] datnc: Có vẻ bác bth lại gòi.
  [17:25] tuannt: giờ a về quê. có gì gấp thì tối a check sau
  [17:35] datnc: Thấy bác có vẻ bth rồi nha mn 🙏
  [17:52] datnc: https://paturevision.fr/admin123/sell/catalog/products/3509/edit#tab-product_options-tab
  [17:52] datnc: Mới tạo cái product này trên Live, ko thấy nó sync sang Console Live đó mn.
  [17:53] datnc: A Duong Doan , Tuan Nguyen nào available check hộ e. Do bác đang muốn test.
  [18:03] duongdn: a đi đón bé rồi 7h mới về
  [18:11] duongdn: vụ queue quản lí discuss hôm qua chưa làm à 🥲
  [18:13] datnc: E biết đâu e dính tracker bên khác các kiểu 🥲 Tuần này cũng kẹt lắm.
  [19:30] duongdn: hình như sync rồi, theo a check db
  [19:30] duongdn: còn nếu giao diện chưa có thì báo a nha, chỗ nào, nick này để a trace theo
  [21:31] datnc: E thấy sync rồi nha. Mà có vẻ ổng cũng nguôi rồi, có thể để tuần sau mình tính đc nhỉ?
  [09:10] datnc: A Tuan Nguyen sao e không thấy daily report của Nick cho khách từ đầu T9 tới giờ a ơi?
  [09:11] duongdn: rule này cần follow nha mn, daily report rất quan trọng, bữa Chiến có nhắc 1 lần về nó rồi, đây là bảo hiểm communicatio
  [09:11] duongdn: ko có im im làm, đến 1 hồi cus lại hỏi đang làm gì
  [09:11] tuannt: ok de e bổ sung
  [09:43] duongdn: Vu Tat:  e có dưới lầu 3 ko, xuống a chút
  [09:44] duongdn: Dat Nguyen:  qua a tí
  [09:45] duongdn: alo Dat Nguyen
  [09:54] duongdn: ----- Về daily report, hiện tại mình cần thống kê số lượng bug cho cus daily nha Total bug Đã fix , đang fix Bug phát si
  [09:57] duongdn: === Vu Tat  em qua Bailey fix bug nha
  [09:58] vutq: dạ oke
  [10:01] duongdn: theo như info a biết là làm full luôn, có gì khác thì e báo a, ko tự làm nha
  [10:05] vutq: bên Showcase - RoomScan có báo bug cần fix, em có thể ưu tiên bên kia trước không anh, hay cứ full Bailey thôi
  [10:09] datnc: Nào e qua hú a nha Vu Tat .
  [10:09] duongdn: Vu Tat:  ko, để nói bên kia
  [10:22] duongdn: theo info revert lại đã đẩy cho dev khác
  [10:23] duongdn: Vu Tat:  cứ full, và làm đúng qui trình, có ai kêu thì báo
  [15:38] trinhmtt: Hi Joey, Btw, we’ve also started working on the following items. I know these are currently low priority, but during a p
  [15:39] duongdn: lí do ko ổn ...
  [15:39] duongdn: mn có nghĩ ra lí do nào hay hơn ko mn
  [15:40] duongdn: vụ upgrade Rails 7, a nghĩ nên dùng từ gì đó như Rails upgrade enhancement,  Enhancement gì, thì VuTQ giải thích các ý m
  [15:43] minhtv: Để bên mobile e ngó xem
  [15:47] duongdn: > Btw, we’ve also started working on the following items. I know these are currently low priority, but during a period w
  [15:53] datnc: Chắc đơn giản là: "Just want to keep you up-to-date: These tasks also have been start by the dev team to follow up with 
  [15:53] datnc: * Chắc đơn giản là: "Just want to keep you up-to-date: These tasks also have been start by the dev team to follow up wit
  [15:53] datnc: * Chắc đơn giản là: "Just want to keep you up-to-date: These tasks also have been start by the dev team to follow up wit
  [15:54] duongdn: có nên nhắc chữ Rails 7 ko?
  [15:56] duongdn: thấy hơi kì là Rails 6 chưa done đã lên 7 ...
  [15:56] duongdn: a nghĩ mình nên dùng từ Enhacement như trên, dễ trôi hơn
  [15:57] datnc: E nghĩ ko cần đâu, chỉ là upgrade enhancement như a nói là đc rồi, còn Vũ có cái terms gì đó hợp lý hơn không em? Như Fr
  [15:58] vutq: này nha anh: Prerequisites for Rails 7 Upgrade
  [15:59] duongdn: a sợ đụng tới 7 lại có chuyện khi 6 chưa xong đó
  [15:59] duongdn: dùng từ khác đi, mình update gì thì nói đó, ghi rõ lí do , nó có benefit gì
  [16:04] duongdn: BTW, code phần đó chưa được push lên git hay sao nhỉ, a coi chút [thread: 2 replies]
    └ [16:08] vutq: đây anh:  - upgrade-latest-ruby-on-rails_bootstrap5
    └ [16:09] vutq: và upgrade-latest-ruby-on-rails_bootstrap5_dev2 (Việt làm nhưng chưa merge vào nhánh chính)
  [16:06] datnc: >  Prerequisites for Rails 7 Upgrade  Prerequisites for futher Ruby and Rail upgrade (to latest version). Vậy nha mn.
  [16:06] datnc: * > Prerequisites for Rails 7 Upgrade Prerequisites for further Ruby and Rail upgrade (to latest version). Vậy nha mn.
  [16:08] duongdn: ok
  [16:08] duongdn: tuy cũng ko khác gì nhưng có ý tích cực hơn
  [16:09] duongdn: có thể soạn msg rồi
  [16:09] trinhmtt: để em update lại
  [16:12] minhtv: Dat Nguyen:  bên mobile hồi xưa gửi ổng vụ upgrade này khách đồng ý rồi nhỉ ?
  [16:12] trinhmtt: Hi Joey, Btw, we’ve also started working on the following items. Just wanted to keep you up to date on the progress. The [thread: 6 replies]
    └ [16:13] datnc: Nhớ add link original discussion vào 2 cái title nha Trinh.
    └ [16:14] minhtv: Vụ mobile upgrade này a nhớ ko lầm là mình done rất lâu rùi ,sao giờ còn báo lại khách nhỉ ? Hay mìn
    └ [16:19] datnc: Là bác ko aware là mình đã start nó thui a ơi, do lúc đó ổng có dặn nó phải sau các task đang làm tr
    └ [16:24] trinhmtt: cho em xin link đc k anh oi
    └ [16:26] datnc: Vụ rail 7: https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1778664898304039 Vụ mobile:
    └ [16:29] trinhmtt: dạ thanks anh
  [16:18] duongdn: msg thì ok nha, các vấn đề trong thread xong thì có thể gởi à
  [16:46] duongdn: chú ý daily report nha mn Vu Tat  Tuan Nguyen  Dat Nguyen
  [16:46] duongdn: .
  [16:46] duongdn: of course, vẫn report detail các task đã làm như cũ, này là extra
  [16:47] datnc: E có report progress fix bug hiện tại cho bác rồi. Bên Nick chỉ cần daily report nay làm cái gì là đc nha.
  [16:50] duongdn: OK em
  [16:51] duongdn: mà ở đâu vậy
  [16:51] datnc: DM Amy anh, ổng hỏi e bên đó.
  [16:56] duongdn: OK, move qua chung nha, cho transparent info
  [16:56] datnc: Hú Nam Nguyen build a một cái master trỏ staging2 nhé!
