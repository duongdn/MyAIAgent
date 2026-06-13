# Matrix — since 2026-06-09 08:00 +07:00

### Kunal - Fountain — 282 messages
  [09:00] duongdn: 🔔 Nhắc nhở task log W30: Ngày thứ 2 (08/06) chưa thấy ai log giờ. ViTHT, ThinhT, VuTQ, PhatDLT, HungPN — mọi người vui 
  [09:02] trinhmtt: mn log trên workstream mà anh 🤔
  [09:06] duongdn: à ok e, để a update lại AI :))
  [09:36] datnt: Vi Tran chị ơi chị deploy giúp em FE beta của fountain nha
  [15:51] thinht: https://trello.com/c/OUrn7C1z/2918-gift-drop-order-cannot-swap-gift Trinh Mai Hung Pham  Ticket này lên rồi nha. Ngoài r
  [16:07] trinhmtt: https://trello.com/c/hbDunrDF/2865-editing-the-address-during-checkout-is-not-saving-changes Vu Tat live con nayf giup e [thread: 6 replies]
    └ [16:10] vutq: anh làm ticket này cho em xin info mn ơi
    └ [16:10] datnt: anh đợi em chút để e tạo lại PR
    └ [16:10] datnt: khong biết sao đợt PR đó bị close rồi
    └ [16:11] datnt: đây nha anh
    └ [16:11] datnt: https://github.com/iamksheth/FountainNewUI/pull/451
    └ [16:15] vutq: done nha Dat Nguyen Trinh Mai
  [16:10] vutq: * ai làm ticket này cho em xin info mn ơi
  [16:50] thinht: https://trello.com/c/s1WXwrtm/2881-fix-images-forcing-download-instead-of-displaying-inline#comment-6a21e13fdf65624591d5 [thread: 6 replies]
    └ [16:52] thinht: Vu Tat: em xem thử còn cần update j thêm không? https://github.com/iamksheth/FountainNewUI/pull/452 
    └ [17:01] vutq: lên LIVE rồi nha mn Trinh Mai Thinh Tran
    └ [17:01] thinht: ủa k chờ QC luôn hã Vu Tat
    └ [17:02] thinht: 🫣
    └ [17:03] vutq: không anh, task này không cần check BETA
    └ [17:04] thinht: ồ. okie e.
  [16:53] thinht: https://trello.com/c/OUrn7C1z/2918-gift-drop-order-cannot-swap-gift Trinh Mai ủa ticket này lên Live r hã?
  [16:59] trinhmtt: ũa em tưởng lên là lên live roi [thread: 3 replies]
    └ [17:00] thinht: đâu lên staging để QC test trước chứ. khi nào QC kêu done hay ok rồi chờ cuss nữa mà
    └ [17:00] thinht: a nào vượt quyền khi k ai kêu Live mà cho lên Live đâu
    └ [17:00] trinhmtt: dạ okie anh
  [17:00] trinhmtt: v anh Hung Pham test task này ưu tiên giúp em để live nha
  [09:39] datnt: Hung Pham Phat Le 2 anh ơi có card này em done cho lên beta rồi 2 anh check giúp em nha https://trello.com/c/S9ldM3GM/29
  [09:41] trinhmtt: Hung Pham: Phat Le uu tien con nay giup em nh a [thread: 2 replies]
    └ [09:50] hungpn: Phat Le: sáng nay em check trước 2 cái này được k? nếu k để anh sắp xếp qua trước
    └ [09:54] phatdlt: ok đẻ e check cho
  [09:57] phatdlt: Trinh Mai Dat Nguyen Cái này ổng update theo file ổng cung cấp hya ổng update từng loại giao hàng trên admin vậy em [thread: 27 replies]
    └ [09:59] datnt: theo em thấy là update theo file á anh
    └ [09:59] datnt: lúc sáng em check là trong admin có cập nhật lại cost cho shipping
    └ [09:59] datnt: nhưng mà bên UI FE thì nó chỉ vẫn lấy giá trị mặc định ra
    └ [10:00] datnt: em check bên Beta cũng bị luôn
    └ [10:00] phatdlt: a hiểu là đang bug vậy rồi, cái thông tin a cần là ổng import file update giá ship không được hay ổn
    └ [10:01] datnt: cái này em không biết nữa, nhưng mà em nghĩ là upload file lên á
    └ [10:01] phatdlt: vậy em fix bug cho cái nào á
    └ [10:02] datnt: em chỉ fix cho khúc mà update thành công mà lên FE nó không lấy giá mới lên á
    └ [10:02] datnt: còn upload file hay làm tay có update BE thì em chưa check á
    └ [10:02] phatdlt: ok nè, đẻ a coi
    └ [10:03] phatdlt: mà e biết chổ chỉnh với import file ở đâu trong phần admin hong
    └ [10:03] datnt: chỉnh tay thì em có thấy
    └ [10:04] datnt: image.png
    └ [10:04] datnt: anh vô edit gift á
    └ [10:04] datnt: xong 3 cái field này anh chỉnh á là chỉnh tay, còn upload file em chưa thử
    └ [10:05] phatdlt: ok v a test cái chỉnh tay này trước
    └ [10:05] datnt: dạ oki anh
    └ [10:05] phatdlt: Chắc ổng chỉnh bằng file r, chứ k thể nào mấy trăm sản phẩm mà ổng ngồi chỉnh từng sản phẩm 1 hết
    └ [10:05] phatdlt: Cái file là ổng chỉnh giá hết tất cã sản phẩm luôn
    └ [10:06] phatdlt: E coi dùm a chổ import file với
    └ [10:06] datnt: em thấy ổng có nói là Attached is the spreadsheet nên chắc là chỉnh file rồi
    └ [10:06] phatdlt: uh uh e coi dùm a import ở đâu với
    └ [10:06] phatdlt: R có đkiện gì không á
    └ [10:07] datnt: dạ oki anh để em chạy local xem import file thử
    └ [10:14] datnt: image.png
    └ [10:14] datnt: anh upload csv ở chỗ này nó tự update lại á anh
    └ [10:15] datnt: em mới thử local thì là vạy á
  [10:15] duongdn: Kunal said Hey rick, tom should be back to work tomorrow so please try and get as much in beta ready for him to QC tomor
  [10:15] datnt: * em mới thử local thì làm vậy nó tự update á
  [10:15] duongdn: image.png
  [10:16] duongdn: image.png
  [10:19] duongdn: the screenshots i sent you i feel are on beta but still in the internal QC backlog, any card ready for tom please move i
  [10:20] duongdn: Có reply gì msg này Trinh Mai  quote rồi gởi qua whatsapp room nha
  [10:20] duongdn: a hạn chế discuss
  [10:21] trinhmtt: daj okie anh
  [10:28] datnt: Hung Pham anh ơi 2 bug redmine của card 2911 nó lên beta rồi nha có gì anh check lại nha. https://redmine.nustechnology.
  [10:34] trinhmtt: https://trello.com/c/MS5UzAPy/2872-infinity-browse Hung Pham Phat Le cais nay test song chua v a [thread: 6 replies]
    └ [11:42] hungpn: giờ anh sang check nhé em
    └ [13:29] hungpn: Dat Nguyen: fix dùm anh con bug nhé
    └ [13:29] datnt: dạ oki anh
    └ [15:58] hungpn: xong chưa Dat Nguyen
    └ [15:59] datnt: dạ đang chờ deploy lên á anh
    └ [17:34] hungpn: Trinh Mai: card này tested DONE nha
  [13:49] trinhmtt: https://trello.com/c/9qY6OlON/2871-infinity-build-a-box https://trello.com/c/a8jDXbuB/2911-fountain-update-cocktail-kit- [thread: 1 reply]
    └ [17:39] hungpn: card 2871 tested DONE nha Trinh Mai
  [13:57] datnt: Trinh Mai card này trên staging xong rồi á chị em đưa lên Live rồi báo Kunal nha chị
  [13:57] datnt: * Trinh Mai chị card này trên staging xong rồi á chị em đưa lên Live rồi báo Kunal nha chị
  [13:57] trinhmtt: okie em
  [13:57] datnt: * Trinh Mai chị ơi card này trên staging xong rồi á chị em đưa lên Live rồi báo Kunal nha chị
  [13:58] datnt: Vu Tat anh ơi check giúp em PR này lên Live nha anh https://github.com/iamksheth/FountainNewUI/pull/453 nó cho card này  [thread: 2 replies]
    └ [14:02] vutq: done nha Dat Nguyen
    └ [14:03] datnt: Phat Le anh ơi anh lên Live check lại cái cost shipping nha, em trả lại data cho staging luôn rồi nh
  [14:10] vitht: Card 2913 lên BETA gòi nha Dat Nguyen  có gì lên check lại nha
  [14:10] datnt: dạ oki chị để xíu em check lại rồi báo task
  [14:54] phatdlt: Trinh Mai: A check trên live xong luôn ticket này r nha e  https://trello.com/c/S9ldM3GM/2934-fountain-shipping-cost-not
  [14:58] vutq: Vi Tran Thinh Tran Dat Nguyen  Hiện tại ở nhánh master phía FE đã có file CLAUDE.md chứa tất cả thông tin cần thiết của 
  [15:32] thinht: Vu Tat: a có update lại Image theo như em nói trong PR này. em xem còn gì cần update không? a có loy lên staging rồi htt [thread: 2 replies]
    └ [15:42] vutq: work trên LIVE rồi nha anh Thinh Tran  note: có thể cần phải báo Kunal biết: - đối với browser mới s
    └ [15:43] thinht: okie e. để a nhắn báo nó
  [15:42] trinhmtt: https://trello.com/c/WGsYqu5h/2836-fountain-business-homepage-updates card này bác có comment nha Dat Nguyen
  [15:42] datnt: dạ oki chị để em check thử
  [15:42] vutq: * work trên LIVE rồi nha anh Thinh Tran note: có thể cần phải báo Kunal biết: - đối với browser mới content-disposition:
  [15:48] datnt: Vi Tran chị ơi chị deploy giúp em commit em mới push lên Beta FE của Infinity nha chị
  [17:00] thinht: https://github.com/iamksheth/FountainGreetings/pull/431 Vu Tat a có add những config trong PR này để fix những warning A [thread: 2 replies]
    └ [11:17] vutq: cái này phải chạy thử mới biết được trong tasklog có rollbar của STAGING, anh Thinh Tran  có thể log
    └ [11:18] thinht: okie e, để chiều a xem thử ntn.
  [17:02] thinht: Trinh Mai: hiện tại trên rollbar warning về ActiveStorage::Blob not found là nhiều nhất có tận gần 5000 thông báo. nên a
  [17:40] vutq: đây nha anh Duong Doan, Dat Nguyen: https://help.mailgun.com/hc/en-us/articles/203357040-Can-I-use-the-same-domain-for-b
  [09:36] phatdlt: https://redmine.nustechnology.com/issues/78642 Trinh Mai Check giúp a comment của bug này rồi hỏi khách dùm a với nha
  [10:09] trinhmtt: em có comment laij goy nha
  [10:11] vitht: Card này có fix lại 2 cái comment của ông design rồi nha. Còn mọt cái comment cần QC reproduce lại dùm. Chưa thấy cái ca
  [10:12] vitht: * Card này có fix lại 2 cái comment của ông design rồi nha. Còn mọt cái comment cần QC reproduce lại dùm. Chưa thấy cái 
  [10:13] vitht: cái này chị sửa lun nha Trinh Mai  thấy ổng chỉ comment có 1 feedbac kaf
  [10:13] vitht: https://trello.com/c/ElD5EOmr/2837-infinity-custom-roses-page
  [10:13] vitht: * cái này chị sửa lun nha Trinh Mai  thấy ổng chỉ comment có 1 feedback à
  [10:13] trinhmtt: dạ okie chị
  [10:38] datnt: https://trello.com/c/WGsYqu5h/2836-fountain-business-homepage-updates a Hung Pham a Phat Le feedback của Thomas em fix l
  [10:38] datnt: * https://trello.com/c/WGsYqu5h/2836-fountain-business-homepage-updates a Hung Pham a Phat Le feedback của Thomas em fix
  [10:50] datnt: Hung Pham Phat Le với 2 anh check luôn giúp em card này nha card này done lên beta rồi á https://trello.com/c/TEgLelYY/2
  [10:56] datnt: Vu Tat anh ơi anh deploy lên Live giúp em 2 PR này nha FE: https://github.com/iamksheth/FountainNewUI/pull/418 BE: https [thread: 12 replies]
    └ [11:28] vutq: done nha Dat Nguyen
    └ [11:29] vutq: components/CocktailKits/ReadyToShipKits.tsx từ 106 đến 120 không phải cách dùng đúng của Image fill-
    └ [11:29] datnt: dạ oki anh để em check xem
    └ [11:45] datnt: Vu Tat anh ơi check lại giúp em nha https://github.com/iamksheth/FountainNewUI/pull/455
    └ [11:50] vutq: vẫn sai nha, components/Cart/CartItem/CartItemAsGift.tsx là 1 ví dụ
    └ [13:16] datnt: anh check lại lần nữa nha anh Vu Tat
    └ [13:25] vutq: vẫn sai 😓 em coi lại file CartItemAsGift xem nó sử dụng https://nextjs.org/docs/app/api-reference/c
    └ [13:26] datnt: em ngồi check thấy thiếu width hoặc height cho parent cha 🥲
    └ [13:26] datnt: để em đi xem tiếp
    └ [13:31] datnt: em thêm error handle vô rồi á anh Vu Tat ơi, anh check lại em còn thiếu gì nữa không á
    └ [13:35] vutq: sizes="324px" coi doc https://nextjs.org/docs/app/api-reference/components/image#sizes hay vọc proje
    └ [14:04] datnt: dạ rồi á anh Vu Tat anh check lại nha anh
  [11:56] hungpn: hôm nay có task nào cần check gấp hgok Trinh Mai
  [11:59] vitht: Dạ có á a. Cái 2854 á a
  [12:00] vitht: Card này có fix lại 2 cái comment của ông design rồi nha. Còn mọt cái comment cần QC reproduce lại dùm. Chưa thấy cái ca [thread: 41 replies]
    └ [12:11] hungpn: cái fix state chưa đúng rồi á, anh nghĩ cái state chắc sẽ show full như trong dropdow á Vi Tran Trin
    └ [12:11] hungpn: https://trello.com/c/clSdoRlL/2811-fountain-states-need-to-be-updated-scrolling-to-the-bottom-while-
    └ [12:11] hungpn: như card này có đề cập
    └ [12:12] hungpn: image.png
    └ [12:12] hungpn: - I would want full state name for everything.
    └ [13:25] vitht: card 2811 khác với cái này mà có cần làm chung lun hông a
    └ [13:31] hungpn: chung cái gì nè em
    └ [13:33] vitht: ý là cái bug này ổng báo ở 2811 có làm cho bên 2854 lun hem
    └ [13:37] hungpn: thì giờ làm cái 2854 là update bên page Cart đó nè
    └ [13:49] vitht: Vậy nếu trường hợp tên tiểu bang quá dài thì hiển thị như thế nào?. Bữa có một cái bug là cái tên ti
    └ [13:50] vutq: em nhớ hồi trước Thomas có lần nói tên dài quá thì có thể để ellipsis nha chị
    └ [13:53] vitht: vậy là hiện cái DE... á hẻn
    └ [13:53] vitht: ellipsisnếu như mà đúng theo kiểu
    └ [13:55] vutq: Hm mà khoan chỗ state đó phải hiện full name của bang chứ sao lại là viết tắt nhỉ
    └ [13:56] vutq: ví dụ hiện Delaware thay vì DE ------------ cái case em nói là tên dài như: North Carolina thì có th
    └ [13:57] hungpn: hiển thị full name
    └ [13:57] vitht: phải giới hạn kí tự nữa a. Tại vì full name nó bị vỡ layout trên mobile
    └ [13:58] hungpn: cho anh xem mobile view xem nào
    └ [13:59] vitht: mà e thấy lúc nó chọn, nó có hiển thị kiểu ellipsis rồi á
    └ [13:59] vitht: Screenshot 2026-06-11 at 1.58.33 pm.png
    └ [14:07] hungpn: Vấn đề là:; khi user edit address thì state trên dropdown đang hiển kiểu viết tăt Expected: l
    └ [14:11] vitht: chắc cái đó trong task nào đổi, chứ trong task này thì e không đụng tới cái state. Còn muốn thì upda
    └ [14:12] vitht: show full name thì nó v nè a
    └ [14:12] vitht: Screenshot 2026-06-11 at 2.12.37 pm.png
    └ [14:15] vitht: mobile
    └ [14:15] vitht: Screenshot 2026-06-11 at 2.15.19 pm.png
    └ [14:15] vutq: blank page là do cái redirect của /cart/checkout đang đẩy về /curated-gift-boxes thay vì /preserved-
    └ [14:16] hungpn: xuống chỗ anh đi nè
    └ [14:16] hungpn: list state trên infinity có ai đổi lại k Vi Tran Dat Nguyen
    └ [14:16] datnt: có em á anh
    └ [14:16] datnt: hổm cái card mà đổi state là đổi cho cả 2 fountain với infinity á
    └ [14:17] hungpn: đổi ở task mới hả
    └ [14:17] datnt: dạ đúng rồi anh
    └ [14:17] datnt: có 1 card riêng á
    └ [14:17] hungpn: anh xin cái task với
    └ [14:17] datnt: https://trello.com/c/clSdoRlL/2811-fountain-states-need-to-be-updated-scrolling-to-the-bottom-while-
    └ [14:17] datnt: đây á anh
    └ [14:17] hungpn: bảo sao nó khác quá. nãy anh check thấy lạ lạ
    └ [14:20] hungpn: k fai, Dat Nguyen em vào cái beta.infinity đi xem cái state nó khác hết
    └ [14:21] datnt: để em qua đó xem sao
    └ [14:21] datnt: em nhớ cái đó đợt anh test kĩ lắm rồi mới lên Live cho Cus mà
  [12:00] vitht: https://trello.com/c/TAopocTs#comment-6a2980ba0815e80e83d55d2f
  [12:12] hungpn: 
  [13:31] vitht: * card 2811 khác với cái này mà có cần làm chung lun hông a Hung Pham
  [13:49] vitht: * Vậy nếu trường hợp tên tiểu bang quá dài thì hiển thị như thế nào?. Bữa có một cái bug là cái tên tiểu bang dài quá nó
  [13:53] vitht: * nếu như mà đúng theo kiểu ellipsis
  [13:57] hungpn: * expected: hiển thị full name
  [14:13] vitht: * show full name thì nó v nè a Hung Pham
  [14:27] vitht: Hiện tại ở card 2854 không có cái change của cái form này á
  [14:27] vitht: Screenshot 2026-06-11 at 2.26.44 pm.png
  [14:27] vitht: ai đổi cái UI of form này v
  [14:27] vitht: cho xin cái branch
  [14:28] datnt: 2854
  [14:28] datnt: ý là 2854 change cái của em á
  [14:28] vutq: infinity_master luôn đi chị Vi Tran, task đó go LIVE rồi
  [14:30] vitht: v để merge cái 2811 lun
  [14:30] datnt: khoan nha chị
  [14:30] datnt: để em check lại
  [14:30] datnt: cái 2811 xem sao cái đã chị
  [14:31] datnt: oki rồi á chị 2811 đúng á
  [14:31] datnt: infinity/2811-fountain-states-need-to-be-updated-scrolling-to-the-bottom-while-logging-in
  [14:31] vitht: gòi để c làm
  [14:32] vitht: e đừng sửa gì hết nha Đạt
  [14:32] datnt: dạ oki chị 🫡
  [15:10] vitht: a Hung Pham  ơi e ms fix và deploy lên BETA infinity á
  [15:10] vitht: a check lại đi
  [15:12] vitht: Review dùm c cái commit này nha Vu Tat  ơi  https://github.com/iamksheth/FountainNewUI/pull/457/changes/6afb26e38a61e209
  [15:12] vitht: * Review dùm c cái commit này nha Vu Tat  ơi https://github.com/iamksheth/FountainNewUI/pull/457/changes/6afb26e38a61e20
  [15:27] vitht: Sau khi discuss nguyên team Vu Tat thì cái feature nào mà lớn quá (nhiều file changes) thì để c deploy  BETA nha. Còn cá [thread: 1 reply]
    └ [15:28] datnt: dạ oki chị
  [15:27] vitht: * Sau khi discuss nguyên team Vu Tat thì cái feature nào mà lớn quá (nhiều file changes) thì để c deploy  BETA nha. Còn 
  [15:33] datnt: với giờ mình còn chủ yếu bug từ bugsnap rollbar á, thì cái này em done xong vẫn cần phải review chứ phải không á chị Vi 
  [15:38] vitht: đúng rồi phải review hết á cho chắc ăn
  [15:53] vitht: a Hung Pham  ơi test lại trên live nha. Vũ mới đưa lên live rồi [thread: 3 replies]
    └ [16:09] hungpn: live cái list state thôi đúng k? còn bug của task #2854 là chưa đúng k? Vi Tran
    └ [16:09] vitht: Dạ đúng rồi
    └ [16:12] hungpn: list state okie rồi nha
  [15:53] hungpn: okie em
  [16:46] hungpn: https://beta.infinityroses.com/recipient_address/AMRWAZ2T -- Thinh Tran vào dc lkink này hok?
  [16:57] hungpn: image.png
  [16:57] hungpn: Thinh Tran:
  [16:57] hungpn: lỗi luôn nè m
  [16:58] thinht: sơ vơ thôi thong thả :D
  [17:00] datnt: Trên Live hình như có bug về cái cache thì phải anh Vu Tat ơi
  [17:00] datnt: cái card này
  [17:00] datnt: https://trello.com/c/hbDunrDF/2865-editing-the-address-during-checkout-is-not-saving-changes
  [17:00] datnt: hôm thứ 3 mình đưa lên Live á
  [17:00] datnt: nó không có work
  [17:01] datnt: mà em check trên Beta nó vẫn bình thường
  [17:01] datnt: nãy giờ em test dưới local là BE em nó vẫn update bình thường mà trên UI thì data nó không đổi
  [17:01] datnt: nên em nghĩ là dính cache gì mới fix trên beta chứ chưa fix Live á
  [17:02] datnt: em thử tắt cache khi call api fetchCartItems thì nó update data không bị gì hết á [thread: 4 replies]
    └ [17:12] vutq: anh vẫn chưa hiểu issue em mô tả - fetchCartItems là API user-based với cookie thì làm gì có cache
    └ [17:13] datnt: image.png
    └ [17:13] datnt: em thêm cái cache: 'no-store',
    └ [17:13] datnt: thì em edit cái cart_items nó mới ăn á
  [17:03] datnt: cái khúc mà mình add to cart items xong mình edit á
  [17:04] thinht: https://github.com/iamksheth/FountainGreetings/pull/432 https://github.com/iamksheth/FountainGreetings/pull/431 Vu Tat a
  [17:13] hungpn: có ai rảnh hok? check dùm anh cái này vs, anh đang thử checkout vs giftdrop mà k thấy cái email nào được gửi
  [17:14] hungpn: * có ai rảnh hok? check dùm anh cái này vs, anh đang thử checkout vs foutain giftdrop mà k thấy cái email nào 
  [17:16] hungpn: tìm ra rồi nha cả nhà
  [08:58] datnt: Vu Tat anh check giúp em PR này nha của card này  https://github.com/iamksheth/FountainGreetings/pull/433 https://trello [thread: 5 replies]
    └ [09:07] vutq: oke nha Dat Nguyen  anh Hung Pham vô BETA test lại cái ApplePay nha anh - vụ này urgent
    └ [09:08] datnt: Hung Pham anh đợi em deploy lên Beta nha
    └ [09:14] datnt: à anh ơi Hung Pham này deploy lên rồi nha anh check nha
    └ [09:40] hungpn: okei em, đợi nha. Anh đang bảo c Bình mở cái thẻ đã
    └ [13:22] hungpn: Vu Tat: Dat Nguyen anh check done vụ Apple pay rồi nhé
  [08:58] datnt: * hi Vu Tat anh check giúp em PR này nha của card này https://github.com/iamksheth/FountainGreetings/pull/433 https://tr
  [09:43] hungpn: có tính năng này cần go live sớm nè Trinh Mai Vu Tat
  [09:43] hungpn: cus lại báo thêm lỗi liên quan tới cái này rồi á
  [09:43] hungpn: https://trello.com/c/RCfYhnv4/2938-gift-drop-link
  [09:48] hungpn: nhưng mà Thinh Tran check lại cái này, nó liên quan tới việc performance nó bị chậm, như link hôm qua load mấ
  [09:51] thinht: performance hã không rõ lắm, vì api này trước giờ có vẻ chưa có bên Infinity, t lấy logic api bên Fountain lấy qua đó. t
  [10:04] hungpn: work thì work rồi, nhưng giờ đang bị báo bug live nên k biết có nên lên sớm k Trinh Mai Vu Tat
  [10:06] trinhmtt: có á anh, mấy cái này vội á anh Thinh Tran đưa info cho anh Vu Tat nha, mấy cái bug prod mn chủ động fix song cho lên li
  [10:07] thinht: okie e.
  [10:12] datnt: Vu Tat anh check giúp em PR này https://github.com/iamksheth/FountainGreetings/pull/429 cho card bug này nha https://tre [thread: 1 reply]
    └ [11:05] vutq: có vẻ ổn nha Dat Nguyen, em có thể đưa lên STAGING rồi check
  [10:23] hungpn: https://redmine.nustechnology.com/issues/78983  -- bug này chưa đc đưa lên beta Lam Le  nhỉ [thread: 2 replies]
    └ [10:28] lamlq: dạ, mà fix rồi nha a, có gì nhờ Dat Nguyen check rồi deploy giúp a nha, 2914
    └ [10:49] datnt: Hung Pham anh ơi anh check lại trên beta nha em deploy lên rồi á
  [10:31] thinht: https://trello.com/c/OUrn7C1z/2918-gift-drop-order-cannot-swap-gift BE: https://github.com/iamksheth/FountainGreetings/p [thread: 8 replies]
    └ [10:40] vutq: bản fix này hoàn toàn sai nha mn Trinh Mai Thinh Tran Hung Pham  không lên LIVE được
    └ [10:41] thinht: ủa sao vậy em. a thấy nó không có API cho giftdrop mà.
    └ [10:41] vutq: như đã discuss lúc trước, list products trong trang này phải là tất cả gift variants có giá tiền nhỏ
    └ [10:41] vutq: bên Fountain đã hoàn chỉnh chỉ cần build giống theo là được
    └ [10:42] thinht: a copy lấy API này bên Fountain á
    └ [10:45] vutq: cái API không phải là thứ cần dùng trong issue này anh check kĩ cái app/recipient_address/[[...order
    └ [10:48] thinht: okie e, để chiều a check xem ntn
    └ [15:35] vutq: bản fix tạm này lên LIVE rồi nha mn Trinh Mai Thinh Tran
  [10:40] phatdlt: https://redmine.nustechnology.com/issues/78642 Trinh Mai Vi Tran Vậy giờ con này mình chốt shao đây 2 tỉ muội ơi
  [10:40] vitht: Trinh Mai:  có cmt đó mậy, là để cái đó là 0, khi nào có accept gift từ recipient thì mới hiển thị giá
  [10:42] phatdlt: v giờ chốt v luôn ha, c fix lại như vậy đi rồi e close bug
  [10:44] phatdlt: https://redmine.nustechnology.com/issues/78523 https://redmine.nustechnology.com/issues/78642 Vi Tran E mở lại 2 con này
  [11:01] vitht: Card này lên BETA ròi nha mn  https://trello.com/c/MgBGamAN/2868-scheduled-order-chose-next-day-delivery-but-paid-8  Làm [thread: 6 replies]
    └ [15:02] hungpn: xuống nói sơ anh cái yêu cầu dc k
    └ [15:02] hungpn: Vi Tran: hay Trinh Mai
    └ [15:03] trinhmtt: dạ
    └ [15:20] hungpn: check lại dùm anh vs Vi Tran
    └ [15:20] hungpn: image.png
    └ [15:20] hungpn: anh chọn là 50 nhưng sang page cart chỉ còn  có 8$ nhỉ? cả 2 bên fountain vs infinity
  [13:23] hungpn: * Vu Tat: Dat Nguyen anh check done vụ Apple pay trên beta rồi nhé
  [15:00] trinhmtt: Hi @room,  Bên công ti đang thu thập các case mình đã xử lý các bài toán technical hay để tạo cái bài blog kiến thức chi
  [15:01] duongdn: đẩy thẳng cho Vu Tat  nha :D
  [15:01] duongdn: https://app.notion.com/p/V-d-tham-kh-o-3769777c1efc8048adb2f60ad2d4b06f?source=copy_link
  [15:01] duongdn: dùng template này
  [15:01] thinht: này đúng là của Vu Tat hết. chớ a toàn ho chớ k có j hay hết :D
  [15:02] duongdn: yes, để hắn múa :v [thread: 1 reply]
    └ [15:02] thinht: thêm nhạc nền nữa ih xì :D
  [15:02] thinht: * thêm nhạc nền nữa ih xì :D a ah
  [15:54] trinhmtt: @room tasklog đầy đủ nhé ạ, anh chị nào off nhớ tick off nhé ạ
  [15:58] trinhmtt: Ha Vo: Thien Vo em kick 2 anh ra cho đỡ loãng rúp nhe, cảm ơn 2 anh đã support ạ
  [16:21] duongdn: Tụ nhiên sực nhớ bên này có cái vụ support cho người khiếm thị rất hay á Vu Tat [thread: 1 reply]
    └ [16:22] vutq: dạ oke để em note vô luôn
