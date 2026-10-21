# Matrix — since 2026-10-05 00:00 +07:00

### Kunal - Fountain — 410 messages
  [09:49] trinhmtt: em gửi plan tuần này aj ViTHT: 40h DatNT: 40h ThinhT: 20h => QC 25h
  [13:26] thinht: https://trello.com/c/AdUlQD3t/1178-fountain-infinity-implement-reviews này test xong chưa Hung Pham [thread: 4 replies]
    └ [13:33] hungpn: xong rồi nha
    └ [13:33] hungpn: nhớ có báo rồi mà hì
    └ [13:36] thinht: xog r kéo luôn đi cho sớm để cus nó test
    └ [14:07] hungpn: đã move nha
  [13:27] thinht: * https://trello.com/c/AdUlQD3t/1178-fountain-infinity-implement-reviews https://trello.com/c/z8P7mYj5/3117-infinity-upd
  [13:32] vitht: fountain/2895-engraving-on-master  ae cho mình hỏi là cái brand fountain/2895-engraving-on-master là xưa ai tạo v hen Th [thread: 5 replies]
    └ [13:33] datnt: em khong có tạo nha chị, em check trong máy em cũng khong có nhánh lun
    └ [13:37] thinht: e coi lại phải cus nó tạo bằng AI k
    └ [13:38] datnt: image.png
    └ [13:38] datnt: cus tạo bằng AI nha anh chị
    └ [13:39] datnt: https://github.com/iamksheth/FountainNewUI/pull/552
  [13:40] thinht: Có ticket nào cần làm k Trinh Mai hay a check rollbar [thread: 30 replies]
    └ [13:51] trinhmtt: https://trello.com/c/TdvfIo08/3134-start-here-review-order-for-claudes-prs-oct-1 anh check xem mục  
    └ [13:54] trinhmtt: em có update lại message nha anh Thinh Tran
    └ [14:18] thinht: ``Test server fix (Oct 1)`` Trinh Mai ý này là chỉ những PRs dưới đây thôi pk e?  3129 privacy (#514
    └ [14:21] thinht: a thấy có vài PR Đạt nó pick là merge loi staging r thì phải.
    └ [14:22] trinhmtt: v anh xem Đạt check cái nào roi anh pick cái khacs nha
    └ [14:22] trinhmtt: báo lên đay luon để khỏi trùng ạ
    └ [14:23] datnt: em update PR nha #575, #567, #570, #574 là em check xong rồi á
    └ [14:24] datnt: Thinh Tran status nha anh có gì anh update vô đây luôn cho em khỏi check trùng nha
    └ [14:25] thinht: a thấy 514, 507 e cũng check r mà
    └ [14:26] datnt: #514 là anh Vũ check lên Live rồi á anh còn 507 thì em chưa hay sao á
    └ [14:26] thinht: vậy ai pick complete
    └ [14:26] datnt: anh chụp em xem với cái nào á
    └ [14:27] thinht: Screenshot from 2026-10-05 14-26-51.png
    └ [14:27] datnt: mục 1 vậy là check rồi á anh, mục đó thứ 6 anh Vũ check á
    └ [14:28] datnt: còn mục 2 là em mới check đc 2 cái đầu thôi
    └ [14:28] thinht: 514,515, 556 cũng xong r
    └ [14:29] datnt: 515 chưa nha anh
    └ [14:29] datnt: em mới xong 556 thôi á mà nó đi chung nên em mới tick á
    └ [14:30] thinht: 512, 513, 555, là chưa làm
    └ [14:30] thinht: Screenshot from 2026-10-05 14-29-53.png
    └ [14:30] thinht: 515 đây là pick
    └ [14:31] datnt: cái mục đó chỉ mới 556 thôi á anh, còn 515 là chưa á
    └ [14:31] thinht: làm xong cả cặp thì mới tck xong chớ e.
    └ [14:31] thinht: nó đi theo cặp nên e ủi luôn 515 đi
    └ [14:32] datnt: oki anh để lại đó em back về sau 515 cho anh
    └ [14:33] thinht: step của e là cherry-pick mấy commit trong PR đó vào staging thôi hã
    └ [14:34] datnt: em làm theo step của anh Vũ mới nhắn á anh
    └ [14:34] datnt: 4 step   - review  - local test  - staging test  - báo QC rồi em req anh Vũ LIVE á
    └ [14:38] datnt: em update PR nha - #575, #567, #570, #574 Done - PR #576, #577 Pending - #454 em chuyển qua này để ư
    └ [14:39] datnt: Thinh Tran em update lại nha, chờ khi nào có chỗ khác em update vô chỗ đó nha anh
  [13:54] trinhmtt: * https://trello.com/c/TdvfIo08/3134-start-here-review-order-for-claudes-prs-oct-1 anh check xem mục  Test server fix (O
  [14:09] datnt: Hung Pham anh test giúp em flow này trên beta Fountain nha - Forgot password → nhận code → nhập code và mật khẩu mới → đ [thread: 21 replies]
    └ [14:11] thinht: từ PR nhiu vậy e
    └ [14:11] datnt: #567 nha anh
    └ [14:11] datnt: em đang check PR trong cái message mới nhất á
    └ [14:12] datnt: image.png
    └ [14:12] thinht: đệt sao rối nùi dầy ta
    └ [14:13] datnt: #575, #567, #570, #574 là em check xong rồi á
    └ [14:13] datnt: cái này ổng mới nhắn là đi trước mấy cái V2 được
    └ [14:13] datnt: nên em bay qua check bên này á
    └ [14:21] datnt: Thinh Tran em đang check PR #576, #577 lun nha anh
    └ [14:21] hungpn: cái này là em fix rồi đúng k nè
    └ [14:22] datnt: dạ đúng rồi anh, em test thử 1 lần rồi mà anh test kĩ lại để chắc ăn nha vì là code của Cus á
    └ [14:29] hungpn: okie em
    └ [15:18] hungpn: image.png
    └ [15:19] hungpn: Trinh Mai: chỗ này đang thiếu 1 cái noti để user biết đưowcj là code đã gửi mới hay chưa nè, anh nhấ
    └ [15:19] datnt: cái này ông Kunal có handle luôn ròi á:))
    └ [15:19] datnt: mà em chưa có đưa lên tại còn feedback
    └ [15:19] hungpn: nhưng chưa có lên hả em
    └ [15:20] datnt: khi nào cái này lên em ping lại cho anh
    └ [15:21] datnt: sắp tới cái khúc password này có thay đổi vài cái á nên là lên tới đâu em báo tới đó nha, hiện tại c
    └ [15:45] hungpn: okie em
    └ [15:46] hungpn: cái này anh check xong rồi nha
  [14:10] datnt: em mới pick commit của Kunal qua cho cái flow này
  [14:10] datnt: nên anh test xem flow còn work đc không nha
  [14:23] datnt: * em update PR nha - #575, #567, #570, #574 là em check xong rồi á - em đang check PR #576, #577
  [14:23] datnt: * em update PR nha - #575, #567, #570, #574 là em check xong rồi á - em đang check tiếp PR #576, #577
  [14:24] datnt: * em update PR nha - #575, #567, #570, #574 là em check xong rồi á - em đang check tiếp PR #576, #577 - #575 đã lên LIVE
  [14:25] vitht: Dat Nguyen:  ơi cho c hỏi cái xưa sao e thêm cái attribute này dị out_of_stock_optional_text [thread: 1 reply]
    └ [14:27] datnt: chị đợi em xíu nha
  [14:26] vitht: của card 2895 á
  [14:26] vitht: Screenshot 2026-10-05 at 2.26.31 pm.png
  [14:33] vutq: Hi mn, Trinh Mai Hung Pham Phat Le Vi Tran Thinh Tran Dat Nguyen  Tình hình hiện tại là chúng ta sẽ không còn tập trung 
  [14:49] vitht: Review giúp c 2 pull request này nha Vu Tat  ơi  FE: https://github.com/iamksheth/FountainNewUI/pull/438   BE: https://g
  [14:51] vitht: Chúng ta có 199 PR chỉ trong 2 ngày do Kunal tạo [thread: 5 replies]
    └ [14:54] thinht: đi cúng zường để mong k bị conflict, chớ bị k bik gọi ai support đó
    └ [14:56] vitht: đó chỉ là FE thôi
    └ [14:56] vitht: còn BE thì 115 PRs
    └ [14:56] vitht: a Thinh Tran
    └ [14:57] thinht: số lẻ thôi cũng mệt r
  [14:51] vitht: * Chúng ta có 199 PRs chỉ trong 2 ngày do Kunal tạo
  [17:13] thinht: Thêm luồng mới cho PRO-ORDER trên staging nhan Hung Pham . test thong thả :D Trạng thái lúc tạo: đơn Pro pay-now giờ là 
  [17:18] thinht: * Thêm luồng mới cho PRO-ORDER trên staging nhan Hung Pham . test thong thả :D Trạng thái lúc tạo: đơn Pro pay-now giờ l
  [09:08] datnt: em pick commit deploy BETA Fountain cái nha mn ơi, có gì chờ em pick resolve commit xong nha bên PR này nó hơi nhiều á [thread: 1 reply]
    └ [09:30] datnt: Done nha anh chị Thinh Tran Vi Tran
  [09:17] vitht: https://trello.com/c/d5OAtXT9/3118-server-test-info#comment-6ac453d33b331e3321b3daa5  ổng có nt trong card này nha ae
  [09:49] hungpn: Dat Nguyen: check dum anh thử xem, user có thêm item vào cart được k? [thread: 18 replies]
    └ [09:49] datnt: em mới thêm vô được á anh
    └ [09:49] datnt: nhưng mà có số item ra 404
    └ [09:50] datnt: image.png
    └ [09:50] datnt: image.png
    └ [09:51] hungpn: lạ nhỉ. anh thêm k dc ta
    └ [09:51] datnt: https://beta.fountaingifts.com/curated-gift-boxes/Birthday-Box-V2
    └ [09:51] datnt: anh thử cái này có bị 404 không á anh
    └ [09:55] hungpn: bị em
    └ [09:56] datnt: anh log bug redmine về cho em thử 2 cái nha
    └ [09:56] datnt: 1 cái 404 với cái của anh không add đc á
    └ [09:56] hungpn: okie em
    └ [11:33] datnt: Hung Pham cái không add to cart đc anh thử tab ẩn danh chưa á
    └ [11:34] hungpn: có thử rồi nha
    └ [11:34] datnt: kì ta sao em add lại đc mới ác
    └ [11:35] datnt: anh thử lại xem còn được không á, với anh quay màn hình cho em xem lun với
    └ [11:35] hungpn: để anh thử lại
    └ [13:28] hungpn: anh sài ẩn danh vào dc rồi nha
    └ [13:29] datnt: vậy tạm thời em update pending nha anh, nếu có bị lại thì em check lại
  [10:08] vitht: Mình deploy BETA fountain cái nha mn
  [10:09] vitht: Trinh Mai:  e nói khéo kêu ổng đừng code nữa đc khum. ổng code bug xong phải fix lại mệt quá [thread: 2 replies]
    └ [10:10] thinht: và ngẫu hứng đổi rule liên tục, dev vs QC k bik đường nào test luôn :D
    └ [10:12] trinhmtt: có tiền làm phiền thiên hạ chị ơi =((
  [10:18] datnt: Hung Pham em mới deploy lên LIVE PR mới của Kunal anh test kĩ lại những cái này nha anh  - Popup Build a Box: Cái này ở  [thread: 22 replies]
    └ [10:18] datnt: BETA nha anh em ghi  lộn LIVE 🥲
    └ [10:25] datnt: à ngoài ra còn có 1 cái là checkout pro với credits nữa, cái này trong admin nó ẩn hẳn đi rồi nên kh
    └ [10:42] hungpn: tính ra giờ anh mới biết cái luồng này luôn á nè
    └ [10:42] hungpn: k thấy nó gửi order lên shipstation vs email nó kỳ vậy ta
    └ [10:43] datnt: cái luồn credit á hả anh
    └ [10:43] hungpn: uhm èn
    └ [10:43] datnt: giờ em cũng không đi fix được mà báo cho ổng để ổng tự fix á chứ
    └ [10:44] datnt: chán thiệt
    └ [10:45] datnt: cái email nó trên mailtrap luôn đúng không anh để em check xem nó sao em báo ổng luôn
    └ [10:45] hungpn: đúng rồi, email ở trên đó á
    └ [10:55] datnt: anh Hung Pham anh check vòng vòng trong 2 acc shipstation của fountain rồi từa lưa mục xem nó có nhả
    └ [10:58] hungpn: nhẩy lộn là gì ta?
    └ [10:58] hungpn: ý là nó nhẩy vào 1 order khac?
    └ [10:59] datnt: image.png
    └ [11:00] datnt: nó nhảy ở bên mấy cái này á anh
    └ [11:02] hungpn: vậy hở
    └ [11:02] hungpn: để anh xem
    └ [11:03] datnt: ý là em khong biết nó nhảy vô không á anh check giúp em nha, em đang fix bug sáng anh báo á
    └ [11:10] hungpn: ak, anh đi check thử cũng chưa thấy. tưởng đâu em thấy nó ở mấy tab đó
    └ [11:11] datnt: dị để báo ổng với chỉ ổng hướng làm luôn
    └ [14:48] datnt: Hung Pham 545 là cái này nha anh
    └ [15:40] hungpn: tested DOne nha Dat Nguyen
  [10:18] datnt: * Hung Pham em mới deploy lên BETA PR mới của Kunal anh test kĩ lại những cái này nha anh - Popup Build a Box: Cái này ở
  [10:36] vitht: Mọi người có gặp tình trạng khi bấm dô một gift cái nó đứng yên lun, không qua trang product detail hông dị [thread: 7 replies]
    └ [10:48] thinht: cái này a báo từ trước r mà.
    └ [11:03] vitht: Dạ để e xem thử
    └ [11:14] hungpn: cái này có 1 số gift bị á, 1 số hok bị
    └ [11:14] datnt: cái dụ mà ra page 404 là khác cái này nữa á, page 404 là còn qua được trang detail mà hiện 404 thôi,
    └ [11:15] datnt: em cũng kiếm ra sao nó qua 404 rồi á
    └ [11:15] datnt: ông Kunal ổng thêm 1 file redirct á mấy cái item cũ slug cũ nó tự động thành slug mới
    └ [11:16] datnt: Birthday-Box nó thành Birthday-Box-V2 mà data BE mình đâu có Birthday-Box-V2 nên nó 404 á, cái này c
  [10:36] hungpn: có nha
  [10:36] hungpn: sáng anh hỏi Dat Nguyen ak
  [10:37] datnt: có nha chị
  [10:37] datnt: mà bên em khoảng 1p sau nó vẫn chạy
  [10:48] vitht: Lúc search name product nó chậm rì lunn Champagne & Snacks Deluxe
  [10:48] vitht: * Lúc search name product nó chậm rì lunn Champagne & Snacks Deluxe ±±
  [10:50] vitht: Test lại cái card này giúp c nha Phat Le , mới fix một vài bug với deploy code của Kunal lên BETA Fountain cho feature n [thread: 7 replies]
    └ [11:22] phatdlt: image.png
    └ [11:22] phatdlt: Trinh Mai: đây tính là bug không e, tại trong ticket k có rqs cho case này
    └ [11:34] trinhmtt: 2 3 laf optional ma
    └ [11:34] trinhmtt: bỏ qua và submit vẫn đc chứ ạ
    └ [11:34] phatdlt: ok nè e
    └ [11:34] trinhmtt: ũa đung roi =))
    └ [11:35] phatdlt: ok e :))
  [10:50] vitht: cần ưu tiên để đưa lên live trong tuần này
  [10:53] thinht: * cái này a báo lỗi trên staging từ trước r á.
  [13:25] thinht: Vi Tran: Dat Nguyen có làm PR #542 (QC 21) chưa
  [13:26] datnt: dạ rồi á anh [thread: 1 reply]
    └ [13:26] thinht: cái nào làm rồi thì tick compleled cho mn đỡ lầm nha e
  [13:28] thinht: còn #554, #528, #535 [thread: 1 reply]
    └ [13:29] datnt: em chưa nha anh Thinh Tran
  [13:29] datnt: 
  [13:35] vutq: https://trello.com/c/TdvfIo08/3134-start-here-review-order-for-claudes-prs-oct-1 phần nào xong thì chỉ cần note lại thôi
  [13:42] vitht: một lát Trinh tạo sheet mn dô chỉnh lại tên và status của PR mình đã và đang làm nha
  [13:42] vitht: * một lát Trinh tạo sheet mn dô chỉnh lại tên và status của PR mình đã và đang làm nha Thinh Tran Dat Nguyen
  [13:46] trinhmtt: https://docs.google.com/spreadsheets/d/1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o/edit?gid=1533747530#gid=1533747530 đ [thread: 3 replies]
    └ [13:47] thinht: thêm quyền vào e
    └ [13:54] trinhmtt: này file tasklog ma anh, mail anh là gì thế ạ
    └ [13:55] thinht: a vào update dc r e. nãy bị j a vào k dc
  [14:05] vitht: Mọi người nhớ chạy dưới local check kĩ mấy cái liên quan tới cart, checkout payment through stripe, paypal, apple pay, s
  [14:06] vitht: deploy lên staging xong nhớ check lại lần nữa, phụ QC test lun nha.
  [14:12] hungpn: mấy cái này khi nào lên staging hú QC vs nhé
  [14:58] datnt: à cái này thì sao rồi á anh Hung Pham  https://trello.com/c/ce8n3niB/3040-fountain-build-internal-digital-proof-generato [thread: 1 reply]
    └ [17:19] hungpn: Dat Nguyen: đưa oognr check lại nhé
  [15:01] thinht: nhớ cái này nhan
  [15:01] thinht: * nhớ cái này nhan Hung Pham
  [15:05] datnt: em deploy STAGING Fountain cái nha anh chị
  [15:37] vitht: https://github.com/iamksheth/FountainGreetings/pull/509/changes/b2dc155b10704c51500ff857bfb805b09d24e415
  [16:34] vitht: Hung Pham:  cái 512 của a Thịnh có payment á a
  [16:34] vitht: * Hung Pham:  cái PR #512 của a Thịnh có payment á a
  [16:53] datnt: Vu Tat anh ơi nay có PR này lên LIVE được nha anh https://github.com/iamksheth/FountainGreetings/pull/576
  [17:04] thinht: a Loi beta nha mn
  [09:24] vitht: ae thấy có cái PR nào liên quan tới recipient address thì quăng hết qua cho Vi nha [thread: 7 replies]
    └ [09:25] thinht: hình như cả trăm PR á Vi. thấy cái nào cũng có hết á 🤣🤣
    └ [09:26] vitht: gì dữ dị chời
    └ [09:26] vitht: Bên FE á hả a Thịnh
    └ [09:26] thinht: Proj này là dành cho e zồi 🤪
    └ [09:27] datnt: ụa chị Vi Tran chị đang review PR lun hả, cột bug có 1 task hình như Mike thêm á, chị mún check hong
    └ [09:28] vitht: đâu quăng chị coi thử đi
    └ [09:28] datnt: https://trello.com/c/GbxIFNPH/3138-giftdrop-order-was-uploaded-as-a-gift-of-choice-when-a-build-a-bo
  [09:25] vitht: tại Vi đang investigate với refactor cái đó có gì sẵn làm lunn
  [09:26] vitht: Cái smart link nữa. Có gì hông hiểu thì hỏi Vi nha, tại trước mình làm feature đó. Đừng có tự approve xong quăng lên pro [thread: 16 replies]
    └ [09:27] datnt: #569 Pro and Smart Link claim checks. #572 shipped emails for team-imported orders (#573 is the same
    └ [09:27] datnt: đây nha chị :)))
    └ [09:27] datnt: em mới thấy
    └ [09:37] vitht: là 3 cái pull request lun đó hả
    └ [09:37] datnt: image.png
    └ [09:37] datnt: em thấy nó đi chung 1 section á
    └ [09:38] datnt: nhưng mà title thì chắc có mỗi cái 569 là smart link thoi á
    └ [09:38] vitht: okie để c xem thử
    └ [09:39] datnt: nếu PR không bắt nó đi chung thì chị làm smart link thui còn lại để em check tới cũng đc
    └ [09:40] vitht: okie
    └ [13:53] datnt: cái này em check rồi nha chị review mỗi #569 thui là được á không cần mấy cái kia đi theo đâu Vi Tra
    └ [15:43] vitht: e check kĩ chưa Dat Nguyen
    └ [15:44] datnt: cái đó anh Vũ review cho lên LIVE luôn rồi chị
    └ [16:18] hungpn: cái nào mới live ask em
    └ [16:19] datnt: 572 với 579 nha anh
    └ [16:20] datnt: mấy cái này handle limit req thôi không có test tay được á anh
  [09:48] vitht: có ai đang build fe fountain hả mn [thread: 2 replies]
    └ [09:49] datnt: em khoong nha
    └ [09:49] datnt: giờ em mới bắt đầu mina BE thôi á
  [09:54] vitht: cái mà e nói ông Mike post bug là cái này hả Đạt https://trello.com/c/GbxIFNPH/3138-giftdrop-order-was-uploaded-as-a-gif [thread: 4 replies]
    └ [11:55] datnt: Vu Tat Vi Tran em tìm ra ròi :))
    └ [11:56] datnt: khong phải do khách không biết xài mà do app lỗi thiệt
    └ [11:56] datnt: image.png
    └ [11:56] datnt: nó hiên có mỗi email ship à
  [09:55] datnt: đúng rồi chị
  [11:33] vitht: IMG_2895.MOV [thread: 8 replies]
    └ [11:35] thinht: cái luồng pro đó đang raats bug nha e.
    └ [11:35] thinht: suggest cus r mà nó im ru
    └ [11:35] thinht: e có test nữa cũng vậy à
    └ [11:35] vitht: ý là mình có solution gì cho ổng không á
    └ [11:36] thinht: có r e, nó k có check luôn. vs lại pro thì qua luồng pro/send mua
    └ [11:36] vitht: chứ giờ hỏi ổng, ổng cũng hỏi AI à
    └ [11:37] vitht: khách đang bị một cái issue nên sẵn e test lun á
    └ [11:37] thinht: cái này trước giờ nó vậy rồi. hỏi ổng k trả lời. tạm thời a nghĩ kệ moẹ bug đó đi. khi nào hết task 
  [11:34] trinhmtt: 
  [11:34] trinhmtt: 
  [11:35] phatdlt: Vi Tran: Chị lên live con này đi c
  [11:38] thinht: * cái này trước giờ nó vậy rồi. hỏi ổng k trả lời. tạm thời a nghĩ kệ moẹ bug đó đi. khi nào hết task hãy qua đó ôm. giờ
  [13:31] thinht: nhớ coi file sheet để test mấy cái loy r nhan Hung Pham
  [13:33] vitht: để c fix cái bug hồi trưa c nói nha. E làm tiếp pull request nha Dat Nguyen [thread: 1 reply]
    └ [13:34] datnt: dạ oki chị
  [13:43] hungpn: https://trello.com/c/AdUlQD3t/1178-fountain-infinity-implement-reviews?filter=1178 -- Thinh Tran [thread: 1 reply]
    └ [13:44] thinht: để trả lời ông
  [13:49] datnt: Hung Pham em mới deploy lên beta lại phần checkout order nên anh test lại giúp em cái order này nha, cho mỗi personal th [thread: 17 replies]
    └ [14:04] hungpn: layout nay ky vậy nhỉ
    └ [14:04] hungpn: image.png
    └ [14:05] datnt: image.png
    └ [14:06] datnt: bên em bth á anh
    └ [14:10] hungpn: anh sài ẩn danh thì k bị
    └ [14:11] datnt: kệ nó đi anh, tại push mới không có đụng FE đâu anh
    └ [14:11] datnt: nó bên BE
    └ [14:31] hungpn: image.png
    └ [14:31] hungpn: check dùm anh thông tin PRO gửi lên shipstation vs
    └ [14:33] hungpn: anh chon  Express 3-Day mà bên shipstation k hiển ra
    └ [14:33] datnt: image.png
    └ [14:33] datnt: góc trên bên phải á anh
    └ [14:34] hungpn: vậy là nó k hiển thi như bên Personal hì
    └ [14:35] datnt: mỗi bên mỗi khác á anh
    └ [14:41] hungpn: để anh check thêm tý nữa
    └ [15:00] hungpn: phần này chjeck được rồi nha
    └ [15:01] datnt: dạ oki anh
  [14:30] datnt: em deploy BETA Fountain cái nha mn
  [15:01] hungpn: * phần này chjeck OKIE rồi nha
  [15:19] thinht: https://trello.com/c/BAI99Jrx/2895-fountain-product-page-bottle-engraving cus muốn loy live con đây nè
  [15:21] vitht: từ từ mai e deploy, ổng chưa có rep cái feedback bên BE
  [16:18] hungpn: image.png
  [16:18] hungpn: layout bên GOC kỳ nhỉ [thread: 2 replies]
    └ [16:24] datnt: image.png
    └ [16:24] datnt: bên em thấy nó không bị gì hết á anh
  [16:33] vitht: Cho Vi hỏi cái, cái flow gift a choice lúc lên shipstation nó chỉ để cái mục là Gift A Choice thôi chứ không hiển thị qu [thread: 15 replies]
    └ [16:34] datnt: sai á chị, đợt em implement cho PRO em nhớ chọn xong là nó tự đổi lại thành gift gì luôn á
    └ [16:34] datnt: còn bên personal em không phải người handle nên ban đầu gốc nó ra sao em không chắc á, chỉ nhớ là từ
    └ [16:35] vitht: nữa hả chời =='
    └ [16:35] datnt: Ban đầu recipient chưa fil nó hiện như ảnh chị gửi Sau khi recipient fill rồi nó phải update lại  - 
    └ [16:35] datnt: Vi Tran cái ảnh chị gửi là đang ở bước nào vậy chị
    └ [16:36] vitht: cái này đang bị trên live lun đó =='
    └ [16:37] datnt: cái này em không rõ nha, tại em chỉ có handle GOC của PRO thoi mà bên PRO là mới luôn, chỉ là nhìn b
    └ [16:38] hungpn: mấy cái này là có check trước rồi nè, có update nào lên mà mình k biết k nhỉ?
    └ [16:39] datnt: em cũng nhớ là lúc em làm PRO bị anh Hùng bắt bug 1 mớ luon á, phải check bên personal kĩ lắm á mới 
    └ [16:40] vitht: e push code lên e check lại cái gift a choice chưa
    └ [16:40] vitht: cái này là happy case lun rồi nè
    └ [16:40] datnt: có chứ chị
    └ [16:40] datnt: thứ nhất cái này em test 2 bên
    └ [16:41] datnt: với lại em khong có xài chung code nên không đụng gì vô flow GOC của thằng personal hết á
    └ [16:41] datnt: trong repo mỗi thằng là service khác hẳn nhau lun á
  [16:33] vitht: Screenshot 2026-10-07 at 4.33.15 pm.png
  [16:42] vitht: trang ProOrderComplete lúc submit order gift a choice bằng pay later
  [16:42] vitht: Screenshot 2026-10-07 at 4.41.25 pm.png
  [16:42] vitht: thiếu thông tin gift info [thread: 16 replies]
    └ [16:45] datnt: cái này fix trên BETA chưa lên LIVE nha chị
    └ [16:49] vitht: mới fix hay sao
    └ [16:49] datnt: thứ 6 em fix nha chị
    └ [16:49] vitht: check bên pay now lun nha
    └ [16:49] vitht: bị y chang lunn
    └ [16:50] vitht: Screenshot 2026-10-07 at 4.49.20 pm.png
    └ [16:50] datnt: hôm thứ 6 em fix hết smart link, rồi pay now, pay later trên beta rồi á chị
    └ [16:51] datnt: em có báo anh Hùng test rồi em đợi QC confirm em mới đưa
    └ [16:53] vitht: vậy e nói cái case hồi trưa cho a Hùng lun nhen
    └ [16:53] vitht: c chuẩn bị deploy lên BETA á
    └ [16:53] vitht: hoy để c nói lun cho
    └ [17:06] hungpn: okie
    └ [17:08] hungpn: sao anh nhớ là đã confirm vs em nhỉ
    └ [17:08] hungpn: anh check xong cho 2 em rồi nha Vi Tran Dat Nguyen
    └ [17:09] datnt: vậy chắc em miss message của anh á, chứ trong cái thread msg đó em không có thấy á
    └ [17:10] hungpn: okei em
  [16:51] datnt: * em có báo anh Hùng test rồi em đợi QC confirm em mới đưa LIVE đc
  [16:59] thinht: a loy staging nha
  [17:00] thinht: * a loy staging nha. có ai đang loy k
  [17:00] vitht: cos as
  [17:00] vitht: e dang build FE fountain
  [17:06] vitht: xong roi a oi
  [08:45] vitht: Dat Nguyen:  ơi mấy cái fix của e cho gift a choice
  [08:45] vitht: cho c ké cái commit này nha
  [08:45] vitht: merge dô của e đưa a Vũ review lun [thread: 9 replies]
    └ [08:45] datnt: fountain/0000-missing-goc-item-in-thank-you-page
    └ [08:45] datnt: nhánh này nha chị
    └ [08:45] vitht: d8422ad4315816782ebd21a320b9ddaa0e43fd03
    └ [08:46] vitht: ý là e merge dô brand e dùm c lun á
    └ [08:46] datnt: dạ oki chị
    └ [08:46] vitht: khỏi đưa branch cho chị
    └ [09:12] vitht: deploy xong báo c nha. C lên c test lại
    └ [09:14] datnt: 9h30 em báo lại nha, em đang dở tay test nhánh rồi á
    └ [09:41] datnt: Vi Tran done nha chij
  [09:27] datnt: Vu Tat anh ơi check giúp em PR này với nha:  - Này nó fix thiếu item gift of choice ở Pro thank-you page, checkout page. [thread: 8 replies]
    └ [09:28] vutq: image.png
    └ [09:29] vutq: cái này nên đổi thành goc-${idx} nhỉ
    └ [09:29] datnt: cái này nãy em lộn á anh
    └ [09:29] datnt: nó phải giữ nguyên key={`buildabox-${idx}`}
    └ [09:31] datnt: em trả lại rồi nha anh
    └ [09:40] vutq: done nha Dat Nguyen
    └ [09:51] datnt: Vu Tat anh ơi em quên còn bên BE nữa https://github.com/iamksheth/FountainGreetings/pull/539/changes
    └ [10:51] vutq: done nha Dat Nguyen
  [11:18] vitht: Deploy giúp c cái pull request này cho card 2895 nha Vu Tat    https://github.com/iamksheth/FountainGreetings/pull/509/c [thread: 6 replies]
    └ [11:19] vutq: fix rspec trong https://github.com/iamksheth/FountainGreetings/pull/509 nha chị Vi Tran
    └ [11:24] vitht: tất cả lun đúng không Vũ hay cho cái model thôi
    └ [11:25] vutq: PR actions báo lỗi cái nào chị fix nó là được
    └ [12:03] vutq: lên LIVE rồi nha mn Vi Tran Hung Pham
    └ [12:04] vitht: Phat Le:
    └ [12:04] vitht: test card 2895 kìa m ơi lên live rồi
  [11:25] vutq: * github actions báo lỗi cái nào chị fix nó là được
  [13:39] thinht: Dat Nguyen: 601, 603, 534 e làm chưa vậy [thread: 13 replies]
    └ [13:39] datnt: em đang test để đưa lên staging nha anh
    └ [13:40] thinht: ò vậy tiếp tục đi e
    └ [13:41] thinht: deploy xong 3 pr báo a bik chừng nhan
    └ [13:41] datnt: dạ oki anh
    └ [14:06] datnt: Thinh Tran anh deploy trước #600 với #553 nha
    └ [15:27] thinht: Dat Nguyen: 534 là e hỏi j Kunal hay Kunal muốn update j vậy e
    └ [15:29] datnt: là sao á anh, Kunal card đó thêm api handle cho page này anh
    └ [15:29] datnt: image.png
    └ [15:29] datnt: em review mấy cái coding của ổng rồi em test sai em mới feedback lại thôi anh
    └ [15:29] thinht: a thấy e có status Feedback to Kunal là zụ j đấy mà
    └ [15:30] datnt: image.png
    └ [15:30] datnt: là em feedback lại cho ổng rồi đợi ổng fix á anh
    └ [15:31] thinht: ah okie e.
  [13:42] vitht: trang checkout bị vỡ layout dòi nè
  [13:42] vitht: Screenshot 2026-10-08 at 1.42.29 pm.png [thread: 1 reply]
    └ [13:45] hungpn: qua anh cũng gặp nè
  [13:43] vitht: luồng gift a choice
  [13:44] vitht: còn luồng gift bình thường thì layout không bị vỡ
  [14:15] vitht: Cho e hỏi cái, có cái product này e mới tạo cho stock available là 1000
  [14:15] vitht: nhưng nó vẫn hiện trên product detail là out of stock
  [14:16] vitht: Screenshot 2026-10-08 at 2.16.03 pm.png [thread: 2 replies]
    └ [14:16] thinht: coi cache cũng có á e. chờ 10' xem
    └ [14:25] vitht: e kiếm ra đc dòi, nó có cái attribute is sold out =))
  [10:59] trinhmtt: Em thấy bác bảo muốn go-live cái site hôm giờ mình test vào 21st Oct nha mn [thread: 2 replies]
    └ [11:05] vutq: plan ban đầu là 28 Oct cái ổng nói là go LIVE toàn bộ gần 200 PR vào 21 Oct - tới hôm đó mình check 
    └ [11:07] thinht: dev check vs deploy thôi muốn ná thở chớ đừng nói QC test đủ vs kịp dc. 🤣
  [11:01] phatdlt: https://redmine.nustechnology.com/issues/81360 Trinh Mai e check dùm a con này với, chưa có design cho chổ này, hiện fix [thread: 6 replies]
    └ [11:17] trinhmtt: Vu Tat: case này em nhớ hồi đó có handle là giảm font size xuống, cái này mình làm dị được kh anh
    └ [11:18] vutq: ừm được nha, tầm 14 kí tự thì bắt đầu giảm 2px
    └ [11:19] trinhmtt: Phat Le: chốt anh nhe
    └ [11:47] phatdlt: Vi Tran: c fix theo v đi c
    └ [11:48] vitht: ok post bug đi
    └ [11:49] vitht: để cái yêu cầu dô nữa. Để mốt đọc lại biết mong muốn là gì
  [11:17] trinhmtt: * Vu Tat: case này em nhớ hồi đó case tương tự mình handle là giảm font size xuống, cái này mình làm dị được kh anh
  [11:42] datnt: Hung Pham anh test cái này giúp em nha https://github.com/iamksheth/FountainGreetings/pull/523 [thread: 2 replies]
    └ [11:47] datnt: Cái này anh vô trong admin https://staging.fountaingifts.com/admin/holiday_deliveries  - Anh thử add
    └ [13:50] hungpn: okie em, giờ anh qua check nè
  [11:47] datnt: * Cái này anh vô trong admin https://staging.fountaingifts.com/admin/holiday\_deliveries Anh thử add/edit/delete cái Hol
  [11:48] datnt: * Cái này anh vô trong admin https://staging.fountaingifts.com/admin/holiday\_deliveries Anh thử add/edit/delete cái Hol
  [13:23] thinht: Trinh Mai: Vu Tat  những PRs về UI mới liên quan trong  · V2 launch: review in order; the frontend PRs are stacked on th
  [13:25] vutq: hiện tại chỉ tập trung những PR liên quan Staff App và Security Fixes thôi nha anh, tuần sau mới tính tới V2
  [14:12] vutq: Hi mn, đây là tổng hợp những PR liên quan tới Security Fixes và Staff App - dự kiến tốt đẹp nhất là go LIVE vào **thứ 4 
  [14:15] vitht: quan trọng là test kịp hông á. Thấy pull request trong file sheet còn cả đống chưa test :v
  [14:41] hungpn: Trinh Mai: cho anh thêm 1 status ở đây với
  [14:41] hungpn: image.png [thread: 5 replies]
    └ [14:43] trinhmtt: em thay co rui ma
    └ [14:43] hungpn: ý anh là test xong chuyển status là gì á nè
    └ [14:43] hungpn: ready to live hả
    └ [14:44] trinhmtt: ready to live a
    └ [14:44] hungpn: okie em
  [15:03] datnt: em deploy Staging Fountain cái nha mn
  [15:06] hungpn: image.png [thread: 8 replies]
    └ [15:06] thinht: e nó đang loy. từ từ
    └ [15:07] datnt: không em chưa loy nữa :))
    └ [15:07] datnt: em đang pick qua bị conflict
    └ [15:07] hungpn: ak thế ak, tưởng đâu do t đi export nh quá chứ
    └ [15:07] thinht: ah vậy lỗi export r :D. mà export cái j đấy
    └ [15:14] datnt: Giờ em loy nha mn
    └ [15:20] hungpn: order á
    └ [15:22] thinht: ở trang Admin hã. vậy k bik :D
  [15:06] hungpn: anh lõ export 1 đống cía nó bị vậy giờ làm sao nhỉ? giúp anh cái
  [15:18] datnt: Vi Tran chị ơi em loy BE lên rồi á
  [15:18] datnt: FE chị ổn chưa chị loy lên test luôn chị
  [15:22] vitht: là sao nãy e kêu chị đưa cái brand FE cho e test mà [thread: 2 replies]
    └ [15:23] datnt: còn branch đó chị có muốn chỉnh gì nữa không á
    └ [15:23] datnt: khong em loy lên lun á
  [15:22] vitht: * là sao nãy e kêu chị đưa cái brand FE cho e test mà ?
  [15:22] datnt: em test local em rồi á
  [16:43] trinhmtt: task log đầy đủ giúp em nha mn ơi
