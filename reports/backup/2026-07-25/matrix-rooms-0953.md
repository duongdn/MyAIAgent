# Matrix — since 2026-07-20 00:00 +07:00

### Kunal - Fountain — 192 messages
  [10:32] datnt: Hung Pham anh ơi em mới update lại lên Beta Infinity hiển thị cái extra items trong order-history page theo design của T [thread: 3 replies]
    └ [10:33] hungpn: để anh check
    └ [11:08] hungpn: https://redmine.nustechnology.com/issues/79886 - check dùm anh cái bug này nhé Dat Nguyen
    └ [11:09] datnt: dạ để em xem thử
  [10:50] datnt: Với 2 bug redmine này em đưa lên beta lun rồi nha anh Hung Pham https://redmine.nustechnology.com/issues/79835 https://r
  [10:50] hungpn: stripe bên này sài account nào á Vu Tat nhỉ
  [10:50] vutq: Rick nha anh
  [11:04] hungpn: https://beta.infinityroses.com/api/v1/orders/4892235BH/download_receipt
  [11:14] trinhmtt: Hi @room, bên Workstream mới released tính năng tag, mình sẽ áp dụng cho các task mới nha, khi nhận ticket mới lúc log t
  [11:37] trinhmtt: Em gui plan tuan nay ạ  ViTHT: 40h ThinhT: 20h DatNT: 40h => QC: 25h
  [11:40] datnt: Vu Tat Vi Tran không phải do quyền đâu anh chị ơi
  [11:40] vitht: c thấy rồi
  [11:40] datnt: do cái Body Blog thêm ảnh hay product CTA mà chưa fill hết field vô á
  [11:41] vitht: bên e thêm cía product CTA không điền value nó validate á
  [11:41] vitht: * bên e thêm cái product CTA không điền value nó validate á
  [11:41] datnt: dạ đúng rồi á
  [11:42] datnt: Phat Le muốn publish được bài blog phải điền đúng hết field req mới public được nha anh [thread: 1 reply]
    └ [11:49] phatdlt: ok nè e
  [11:42] datnt: * Phat Le anh muốn publish được bài blog phải điền đúng hết field req mới public được nha anh
  [14:23] vitht: a Hung Pham  ơi card 2895 cái hover của example image e fix rồi nha. Có gì a check lại giúp e vs  https://redmine.nustec
  [14:53] datnt: Hung Pham bug này bên infinity Beta fix rồi nha anh
  [14:53] datnt: https://redmine.nustechnology.com/issues/79886?issue_count=117&issue_position=6&next_issue_id=79879&prev_issue_id=79888 [thread: 41 replies]
    └ [09:34] hungpn: https://redmine.nustechnology.com/issues/79886 -- check dùm anh con bug này nhé em Dat Nguyen
    └ [09:39] datnt: Hung Pham cái này mình có design hay sao không á anh
    └ [09:40] hungpn: thêm 1 dòng dưới dòng items là dc rồi nè em, show thêm cái giá ra nữa á
    └ [10:03] datnt: Hung Pham anh ơi anh check giá tổng xem đúng chưa không á
    └ [10:05] datnt: em thấy trang orders-history
    └ [10:05] datnt: đang hiện mỗi tiền của gift thôi chưa có extra items
    └ [10:14] hungpn: image.png
    └ [10:14] hungpn: anh vẫn thấy như vầy
    └ [10:14] datnt: image.png
    └ [10:15] datnt: em đang dev chưa có lên beta á, mà lúc dev thì đang có cái này
    └ [10:15] hungpn: anh order mới á
    └ [10:15] hungpn: image.png
    └ [10:15] hungpn: mà sao giá nó giống như nhau hết nè
    └ [10:15] hungpn: image.png
    └ [10:15] hungpn: tohong tin bên cái order details
    └ [10:16] hungpn: chắc fai + vòa luôn á chứ, đúng k Trinh Mai
    └ [10:16] datnt: em cũng nghĩ vậ
    └ [10:16] datnt: phải vô lun chứ
    └ [10:17] hungpn: + vào luôn cho nó đúng vs cái order details sau khi user payment thành công luôn em
    └ [10:18] trinhmtt: cong luon vao ạ
    └ [10:19] datnt: còn tax thì vẫn đang đúng khong anh
    └ [10:19] hungpn: tax thì chắc k có update nên vẫn đang đúng á
    └ [10:21] hungpn: https://staging.infinityroses.com/api/v1/orders/2040859IL/download_receipt --- em vòa xem thử nè Dat
    └ [10:21] datnt: vậy tax vẫn đang đúng rồi á anh
    └ [10:22] datnt: hiện giờ đang hiển thị sai ở trang order-history
    └ [10:23] datnt: với bên phía pdf là bug a log rồi, dị a log thêm giúp em 1 con bug nữa nha
    └ [10:28] hungpn: anh chưa thấy trên trang staging.infinity nè Dat Nguyen
    └ [10:29] datnt: em chưa có loy lên á
    └ [10:29] datnt: vẫn còn đang có issue chỗ đó á anh
    └ [10:31] datnt: image.png
    └ [10:32] datnt: Hung Pham Trinh Mai cái Subtotal cho X-Large Ombre Heart á nó đang lấy luôn cả price của gift + extr
    └ [10:33] datnt: nên nếu em để như ảnh á thêm cái extra hiện Subtotal rồi hiện Total của extra đó
    └ [10:33] datnt: thì nhìn nó sai sai á
    └ [10:33] hungpn: thì chắc giờ em thêm dòng đó vào thì trừ nó ra thôi
    └ [10:36] datnt: để em check data coi nó lưu sao
    └ [10:36] datnt: nếu mà nó có lưu xuống vô order thì trừ được
    └ [10:36] datnt: chứ mà nó không lưu vô order mà nó price của extra trực tiếp
    └ [10:37] datnt: là lúc admin đổi price extra là nó đổi theo luôn là mệt á
    └ [10:37] hungpn: cái này là k cho update lại mấy order đã completed nha
    └ [13:49] datnt: Hung Pham anh test lại nha, em update lại lên beta rồi á
    └ [15:33] hungpn: anh check done ròi nha
  [15:20] datnt: Vu Tat anh ơi anh check giúp em PR này cho card bug này với ạ #[2990](https://trello.com/c/bumG4WqK/2990-argumenterror-i [thread: 5 replies]
    └ [16:49] vutq: cái draft PR này em chỉ là update logo thôi hả Dat Nguyen
    └ [16:49] datnt: dạ đúng rồi anh
    └ [16:49] datnt: trên master nó thiếu cái logo nên khi in pdf nó lỗi á
    └ [16:50] datnt: còn trên staging thì em thấy có commit 000 thêm cái logo này rồi á
    └ [16:53] vutq: done nha Dat Nguyen
  [17:49] thinht: 
  [17:50] thinht: 
  [08:50] trinhmtt: https://trello.com/c/BAI99Jrx/2895-fountain-product-page-bottle-engraving Hung Pham anh ơi test cho song con này nha anh [thread: 9 replies]
    └ [08:51] hungpn: okie em, anh đang verify bug á
    └ [09:37] hungpn: https://redmine.nustechnology.com/issues/79907 -- Vi Tran fix anh con này nhé
    └ [09:47] hungpn: Trinh Mai: cái tính năng này chắc vẫn apply bên PRO item luôn đúng k em nhỉ?
    └ [09:50] trinhmtt: personal thoi á anh, hiện em thấy k có design apply cho pro á
    └ [09:52] hungpn: anh k chắc, vì anh cũng k thấy nói sẽ k apply cho PRO, nhưng mà nếu apply cho PRO chắc sẽ fai tính p
    └ [09:53] trinhmtt: design ổng gửi là cho tab personal thoi mà anh
    └ [09:56] hungpn: có gì mà ổng réo thì tính sau vậy 🤣
    └ [12:01] hungpn: tested DONE nha Trinh Mai
    └ [13:20] hungpn: kéo task nhé Vi Tran
  [08:54] thinht: https://trello.com/c/Zdd0nsTn/2962-infinity-blog card này chắc test được rồi nhan Hung Pham  trước mắt cứ chú trọng về t [thread: 1 reply]
    └ [10:03] hungpn: chuyền banh lại cho Phat Le dứt điểm rồi nha
  [09:14] datnt: Vu Tat anh ơi anh review giúp em 2 PR bug sau với nha FE Infinity #[2972](https://trello.com/c/hQbbA2gl/2972-infinity-ro [thread: 2 replies]
    └ [10:41] vutq: - 2972: issue này bên Fountain có bị không, cứ code y chang bên Fountain là được mà nhỉ - 2975: đây 
    └ [15:15] datnt: Vu Tat anh ơi em update lại cái 2975 rồi nha anh. Còn 2972 thì bên fountain hiện tại không có cái nà
  [10:16] datnt: * em cũng nghĩ dị
  [10:17] hungpn: * chắc + vào luôn cho nó đúng vs cái order details sau khi user payment thành công luôn em
  [10:19] hungpn: image.png
  [10:20] hungpn: ua? user login rồi mà còn bắt login nữa là sao nhỉ? hok bit có update mới nào k
  [10:20] vitht: a refresh lại thử xem
  [10:34] hungpn: * thì chắc giờ em thêm dòng đó vào ở dưới rồi  thì trừ nó ra thôi
  [10:37] datnt: * chứ mà nó không lưu vô order mà nó lấy price của extra trực tiếp
  [10:47] trinhmtt: Em update plan tuần này ViTHT: 32h ThinhT: 20h VuTQ: 8h Vu Tat  DatNT: 40h => QC: 25h
  [11:49] vitht: thấy cái này chưa có design á a Hung Pham  ơi  https://redmine.nustechnology.com/issues/79915
  [11:49] vitht: giờ fix cái này xong rồi ổng đổi lại nữa
  [11:49] vitht: con này e fix deploy staging rồi á a Hung Pham   https://redmine.nustechnology.com/issues/79907
  [11:50] hungpn: để anh check lại
  [13:19] thinht: cho a ticket mới nha Trinh Mai
  [13:27] trinhmtt: cai blog infinity len staging roi thi keo card nha anh oi
  [13:34] trinhmtt: https://trello.com/c/xIukJjhO/2955-infinity-account-and-auth cho em hoi card nay ai lam v a Thinh Tran Vi Tran Dat Nguye
  [13:35] vitht: chị á
  [13:35] vitht: nó còn một phần nữa
  [13:35] trinhmtt: sao em search trong tasklog k thay card nay ta
  [13:36] vitht: nó mới update cái auth à. Còn phần Orders, Account, Pdf receipt chưa làm
  [13:37] vitht: worksheet cũng k có hay sao
  [13:37] trinhmtt: v chij transfer lai cho anh Thinh Tran giup em nha
  [13:37] vitht: okiee
  [13:38] vitht: Thinh Tran:  branch này nhen a Thinh Tran  ơi  infinity/2955-infinity-account-and-auth [thread: 3 replies]
    └ [13:41] thinht: còn j nữa k e,
    └ [13:43] vitht: Dạ a dô cái design sẽ thấy có 4 phần, Auth, Order, Account, Pdf receipt đó.  Phần Auth thì e làm bên
    └ [13:45] thinht: okie e.
  [09:52] vitht: Vậy là bây giờ bên fountain với infinity dùng chung next 16 rồi đúng hông ae [thread: 12 replies]
    └ [09:54] thinht: chưa e. mới chỉ trên beta thôi. Live chưa có lên
    └ [09:55] vitht: okie a
    └ [13:33] vutq: ráng chốt cái Next.js 16 bên Infinity để lên LIVE sớm nha anh Thinh Tran, cho mấy task này sau đỡ co
    └ [13:35] thinht: vậy hỏi Hung Pham test tới đâu chờ Trinh Mai okie thôi e.
    └ [13:36] hungpn: cho thêm thông tin củ thể hơn dc k Thinh Tran
    └ [13:36] thinht: chắc coi nó work có bt hay k thôi. có chỗ nào bị vỡ UI hay k
    └ [13:37] hungpn: là check xem có bị vỡ layout gì k thôi đúng k? có check font-size hay j k??
    └ [13:39] thinht: k. nó vỡ UI cả page hay có tính năng nào k work lạ lạ dạng vậy
    └ [14:02] hungpn: okie
    └ [15:12] hungpn: check 1 vòng thì ổn cả á Thinh Tran
    └ [16:42] thinht: https://github.com/iamksheth/FountainNewUI/pull/484 Vu Tat review PR này nha e
    └ [09:01] vutq: nay sáng anh Hung Pham test checkout bên Infinity LIVE được không á anh, em tính deploy bản upgrade 
  [10:21] datnt: Hung Pham anh ơi card này lên beta rồi anh QC giúp em nha https://trello.com/c/TEgLelYY/2913-infinity-custom-printed-gif [thread: 1 reply]
    └ [10:27] hungpn: tý anh qua check cho em nhé
  [13:35] datnt: ụa anh chị ơi, cái env của BE có thay đổi gì không á [thread: 7 replies]
    └ [13:37] vutq: em đang nói Fountain đúng không á
    └ [13:37] datnt: dạ đúng rồi á
    └ [13:37] vutq: bên master lên Rails 8 chuyển sang xài credentials rồi
    └ [13:38] vutq: dưới LOCAL thì trong project tạo file config/master.key
    └ [13:38] datnt: tại em đang khong xài rails c sync lên ship đc với em không thực hiện payment được
    └ [13:38] datnt: nó báo thiếu api key
    └ [13:39] datnt: No API key provided. Set your API key using "Stripe.api_key = <API-KEY>". You can generate API keys 
  [13:41] hungpn: https://trello.com/c/B7uPm1Pq/2954-infinity-item-extras -- tested DONE nha Trinh Mai Dat Nguyen
  [10:01] datnt: Vu Tat anh ơi anh check giúp em cái PR bug này với nha https://github.com/iamksheth/FountainGreetings/pull/453 Nó fix ch [thread: 6 replies]
    └ [10:03] datnt: https://github.com/countries/country_select/pull/219
    └ [10:04] datnt: trong lúc em làm em kiếm được cái này nó liên quan bug app mình bị nha anh
    └ [10:08] vutq: là PR fix issue này luôn rồi nhỉ - để anh cho thẳng lên LIVE luôn
    └ [10:08] datnt: dạ đúng rồi chỉ là update version gem thôi
    └ [10:08] datnt: còn cái link là em đi research mạng ra issue đó
    └ [10:11] vutq: done nha Dat Nguyen
  [10:04] datnt: * trong lúc em investigate em kiếm được cái này nó liên quan bug app mình bị nha anh
  [10:06] datnt: * Vu Tat anh ơi anh check giúp em cái PR bug này với nha https://github.com/iamksheth/FountainGreetings/pull/453 Nó fix 
  [10:09] datnt: * dạ đúng rồi anh chỉ là update version gem thôi
  [10:09] datnt: * còn cái link là em đi research issue đó thì ra nó á
  [13:33] datnt: Vu Tat anh ơi anh review giúp em tiếp PR này nha #[2998](https://trello.com/c/ZsSUUoc2/2998-old-order-attached-to-new-ma [thread: 2 replies]
    └ [15:41] vutq: done nha Dat Nguyen, làm bản fix tương tự cho Infinity luôn em
    └ [15:50] datnt: Vu Tat PR cho infinity đây nha anh ơi https://github.com/iamksheth/FountainGreetings/pull/456
  [13:44] vutq: bản upgrade bên Infinity lên LIVE rồi nha anh Hung Pham, anh lên ngó lại UI với checkout sơ 2-3 phát nha, có gì cần hotf [thread: 31 replies]
    └ [13:46] hungpn: okie em
    └ [13:46] thinht: Dat Nguyen: vs Vi Tran có làm j bên Infinity thì nhớ pull từ infinity_master về nha. cần thận có thể
    └ [14:28] hungpn: image.png
    └ [14:28] hungpn: cái em nói đây hả Vu Tat
    └ [14:29] thinht: về image thì tạm thời skip ih Hung Pham , để update xong r check lại mấy chỗ đó sau. chủ íu về UI vs
    └ [14:46] hungpn: image.png
    └ [14:46] hungpn: ý Thinh Tran
    └ [14:47] thinht: staging bij k?
    └ [14:48] hungpn: staging bt
    └ [14:57] hungpn: image.png
    └ [14:57] hungpn: t mới đk account mới nè Thinh Tran
    └ [15:51] thinht: lỗi này là ai làm task thêm hình mà k cập nhật đúng tên hình trước đó thôi nhan Hung Pham. Để ta upd
    └ [16:18] thinht: Vu Tat: a có loy vụ cập nhật Image ở staging r. Hùng đang check. E có t/g thì xem qua PR thử cần a c
    └ [16:33] vutq: image.png
    └ [16:34] vutq: mấy cái priority={true} thì đổi thành loading="eager" anh Thinh Tran, không phải xóa hoàn toàn
    └ [16:34] thinht: okie e
    └ [16:34] vutq: image.png
    └ [16:35] vutq: anh chỉ cần xóa cái build.css là được, đâu cần xóa sạch format vầy :v
    └ [16:35] thinht: trống nó lỏm chỏm quá k e
    └ [16:38] vutq: nó đang làm theo format trong CLAUDE.md rồi, anh cứ kệ nó
    └ [16:39] thinht: okie e
    └ [16:46] hungpn: anh check DONE nha Vu Tat Thinh Tran
    └ [16:46] thinht: okie mai test lại típ
    └ [16:46] hungpn: s lại mai thế?
    └ [16:47] thinht: đang update lại. nên mai lại test típ
    └ [16:47] thinht: 🤣
    └ [17:28] thinht: a update lại PR r nha Vu Tat
    └ [14:00] hungpn: cái này live chưa á Thinh Tran
    └ [14:02] thinht: thấy có merge r á. xem hình kia load dc chưa
    └ [14:03] vutq: lên LIVE rồi á mn, sorry nãy em quên báo
    └ [14:16] hungpn: okei để anh check
  [09:21] datnt: Vu Tat anh ơi anh review giúp em 2 PR này với nha - #[2982](https://trello.com/c/ZMIDyknA/2982-stripeinvalidrequesterror
  [10:48] datnt: * Vu Tat anh ơi anh review giúp em 2 PR này với nha - #[2982](https://trello.com/c/ZMIDyknA/2982-stripeinvalidrequesterr
  [10:48] datnt: * Vu Tat anh ơi anh review giúp em mấy PR này với nha - #[2982](https://trello.com/c/ZMIDyknA/2982-stripeinvalidrequeste
  [15:33] hungpn: https://trello.com/c/lbWnX6N0/2870-infinity-order-flow-updates -- kéo task nha Dat Nguyen anh check done rồi nhé
  [15:35] hungpn: https://trello.com/c/1v99NCmM/2939-infinity-roses-update-rose-color-swatches-3rd-hex-color-mixes-divider --card này luôn
  [15:35] datnt: dạ oki anh
  [15:36] hungpn: https://trello.com/c/NX5yxK48/2697-upgrade-to-nextjs-version-16 -- này lên live Infinity rồi đúng k Vu Tat [thread: 1 reply]
    └ [15:42] thinht: uhm lên xong r
  [16:47] phatdlt: https://trello.com/c/Us7NPEY8/2893-fountain-blog?filter=2893 Trinh Mai E hỏi lại ổng check mess mình cho ticket này với 
  [16:56] thinht: https://trello.com/c/xIukJjhO/2955-infinity-account-and-auth ticket này lên staging r nha Hung Pham
