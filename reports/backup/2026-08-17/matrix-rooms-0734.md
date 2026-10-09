# Matrix — since 2026-08-10 00:00 +07:00

### Kunal - Fountain — 257 messages
  [09:53] datnt: Hung Pham Phat Le card này em đưa lên beta rồi á có gì 2 anh QC giúp em nha https://trello.com/c/uod6osEL/2968-fountain- [thread: 8 replies]
    └ [10:28] hungpn: anh thấy ổng có feedback gì đó thì em cũng fix luôn rồi đúng k Dat Nguyen
    └ [10:29] datnt: dạ đúng rồi anh
    └ [10:35] hungpn: image.png
    └ [10:35] hungpn: anh thấy nó vẫn đi chung nhỉ?
    └ [10:36] datnt: cái này thêm GOC này bên pro á anh
    └ [10:37] datnt: image.png
    └ [10:37] datnt: nó nằm bên pro cart mới đúng á anh
    └ [10:38] datnt: còn bên cái personal thường thì giữ nguyên behavior không có đụng gì bên đó hết á anh
  [09:59] hungpn: tý anh qua check nhé
  [13:31] vitht: Dạ a Duong Doan  ơi cho e xin acc của Cloudflare bên fountain gifts. E đang làm task này e cần check một vài cái thông t
  [13:32] duongdn: OK mà có vô được hay ko thì chưa biết nha, sợ có 2FA
  [15:57] hungpn: cái GOC check xong rồi á Thinh Tran ơi [thread: 2 replies]
    └ [15:58] thinht: ổn áp hết pk
    └ [16:00] hungpn: yeah
  [16:00] thinht: * ổn áp hết pk Hung Pham
  [16:01] thinht: Vu Tat: xem qua PR nha e, Hùng test okie ở staging r. https://github.com/iamksheth/FountainGreetings/pull/468 [thread: 7 replies]
    └ [16:17] vutq: hàng 49 trong orders/create_service.rb có cần thiết phải set is_giftdrop = true không anh Thinh Tran
    └ [16:28] thinht: frontend chưa có set e. chỉ có set giftofchoice = true thôi
    └ [16:31] vutq: vậy thì mình phải fix trên FE, bên BE bỏ luôn cái set is_giftdrop này
    └ [16:33] thinht: có cần thiết k e? e là người làm cuối cùng a k nắm rõ được tất cả workflow của GOC chưa nói đnag làm
    └ [16:39] vutq: em chỉ đi review code GOC thôi chứ không làm nhưng chỗ này em chỉ cần xóa đoạn logic dư thừa trong s
    └ [16:40] thinht: ý e k cần test?
    └ [16:40] vutq: -> xong tạo 1 cart_item, check thử xong field is_giftdrop của cart_item đó có phải là true không là 
  [16:18] hungpn: Dat Nguyen: check dùm anh cái này, sau khi checkout thành công 1 order GOC của PRO thì không đi vào trang Thanks mà trả  [thread: 20 replies]
    └ [13:57] datnt: Hung Pham anh test lại nha, em mới update lại á
    └ [15:07] hungpn: image.png
    └ [15:07] hungpn: check luôn nha em
    └ [15:13] datnt: anh test lại thử order GOC pro xem có bị lại không á
    └ [15:13] datnt: em test bên em không bị
    └ [15:25] hungpn: nãy anh check bên pro, em k bị à
    └ [15:25] datnt: em thử checkout 2 3 cái rồi mà nó không bị á
    └ [15:34] hungpn: em thử sài custom đi
    └ [15:36] datnt: image.png
    └ [15:36] datnt: em custom 250 đô vẫn được á
    └ [15:37] hungpn: anh khi nào cũng bị ta
    └ [15:37] datnt: nãy em có thử 300 đô custom cũng đc á
    └ [15:37] hungpn: k tin xuống anh chơi
    └ [15:37] datnt: image.png
    └ [15:37] hungpn: ua? bị nè
    └ [15:37] datnt: dạ oki để em xuống xem thử 🫠
    └ [15:38] hungpn: ủa, em cũng bị nè
    └ [15:42] hungpn: parker@nustechnology.com/123123123
    └ [15:42] hungpn: em thử account anh xem
    └ [15:47] datnt: em reproduce đc rồi á, để em check xem nóa bị gì 🥲
  [16:44] phatdlt: https://trello.com/c/BSrIHSmc/2869-fountain-order-flow-message-recipient-delivery-updates Vi Tran ticket này e đẩy đi r 
  [09:23] vitht: Lam Le:  ơi card này e làm tới đâu rồi, nhớ transfer lại cho Trinh Mai  nắm nha  https://trello.com/c/BAI99Jrx/2895-foun [thread: 2 replies]
    └ [09:24] lamlq: dạ deploy lên beta rồi nha anh chị
    └ [09:24] lamlq: để em move task
  [11:43] vitht: Screenshot 2026-08-11 at 11.41.54 am.png
  [11:43] vitht: cho mình hỏi cái là cái mailchimp mình login là verify phải kêu ông Kunal gửi code verify hay có cách nào khác hông ae [thread: 4 replies]
    └ [11:43] datnt: đợt cũng bắt em lấy code từ Kunal, nên em skip fix theo doc luôn
    └ [11:44] vitht: e fix sao dị
    └ [11:45] datnt: cái bug của em thì nó có nói trong Doc của mailchimp với ngta cũng bị nên em search từ khóa nó ra
    └ [11:45] datnt: với em xài claude fix em chỉ đi verify lại thôi à
  [14:42] hungpn: admin staging hok vào dc m.n ơi
  [14:42] hungpn: image.png [thread: 3 replies]
    └ [14:43] datnt: Hung Pham cái trang này giờ vô là set cho báo not found rồi á anh
    └ [14:43] datnt: anh phải thêm /admin mới được
    └ [14:44] hungpn: ak ra dzi
  [14:43] vitht: /admin đi a
  [14:55] hungpn: có ai nắm dc cái luồng mà add thêm cái discout code hok nhỉ? [thread: 1 reply]
    └ [15:00] hungpn: anh chỉ thấy nó hiển thị mỗi 1 chỗ là trang thanh toán, còn lại hok thấy show thông tin đó ở đâu nữa
  [14:55] hungpn: * có ai nắm dc cái luồng mà add thêm cái Promo Codes hok nhỉ?
  [14:59] thinht: https://github.com/iamksheth/FountainNewUI/pull/509 https://github.com/iamksheth/FountainGreetings/pull/468 Vu Tat xem q [thread: 1 reply]
    └ [16:03] vutq: done nha anh Thinh Tran
  [15:07] hungpn: check thêm anh cái này vs, order thành công GOC bên PRO mà nó show màn hình như này
  [15:07] hungpn: image.png
  [16:30] trinhmtt: Em gửi plan tuàn này ạ  ThinhT: 4h ViTHT: 40h DatNT: 40h LamLQ: 16h => QC 25h
  [16:33] vitht: a Thinh Tran  ơi mấy con bug trên redmine a fix gòi đúng hem  https://trello.com/c/oHJ5YO8y/2380-finding-solution-to-cus [thread: 1 reply]
    └ [16:34] thinht: a move r e
  [16:34] thinht: * a moved r e
  [16:35] vitht: ủa còn cái cmt này hồi 5/8 là ai like nè. Ổng kêu apply cho infinity roses lun á  https://trello.com/c/oHJ5YO8y#comment-
  [16:37] trinhmtt: Thinh Tran: Dat Nguyen Lam Le có ai like cmt handle chưa v ạ [thread: 3 replies]
    └ [16:38] datnt: em không nha chị
    └ [16:38] lamlq: em không
    └ [16:38] thinht: a không
  [16:37] trinhmtt: * Thinh Tran: Dat Nguyen Lam Le có ai like cmt handle chưa v ạ  https://trello.com/c/oHJ5YO8y#comment-6a72b37720905a0a62
  [16:40] vitht: card này ai đang fix dị ae  https://trello.com/c/h3hpRC4s/3013-nomethoderror-in-ordersdownloadreceipt [thread: 14 replies]
    └ [16:41] thinht: a k
    └ [16:41] datnt: em á chị
    └ [16:41] vitht: sao e làm 2 task dữ dị
    └ [16:41] datnt: cái này em fix xong rồi
    └ [16:41] datnt: mà em chưa có được review lên á
    └ [16:41] vitht: sao k kéo card boaaa
    └ [16:42] datnt: 1 đống task bug ở doing là em fix xong ròi mà chưa có được review á
    └ [16:42] vitht: e đưa lên staging chuaw
    └ [16:42] datnt: nên để em list ra rồi đưa cho anh Vũ lại
    └ [16:42] datnt: dạ rồi á
    └ [16:43] datnt: để em check xem lên hết chưa
    └ [16:43] datnt: hình như còn 1 cái chưa lên
    └ [16:43] vitht: okie check xong move card giúp c nha
    └ [16:43] datnt: dạ oki chị
  [16:42] vitht: * e đưa lên staging chưa
  [16:42] vutq: https://github.com/iamksheth/FountainGreetings/pulls https://github.com/iamksheth/FountainNewUI/pulls cả 2 repo đều đang [thread: 7 replies]
    └ [16:45] datnt: anh check giúp em PR này nha https://github.com/iamksheth/FountainGreetings/pull/455/changes
    └ [16:46] datnt: cái này đợt em đưa lên staing nhờ bên QC check rồi á
    └ [16:48] vutq: done nha Dat Nguyen
    └ [16:52] datnt: PR này là cần anh review trước á anh Vu Tat https://github.com/iamksheth/FountainNewUI/pull/498
    └ [16:53] datnt: này tích hợp cái nuqs vô mà hổm em kiu là nó có bug khi anh pick 1 2 gift vào build a box xong anh đ
    └ [16:57] vutq: nhìn đẹp á, đưa lên BETA test đi em
    └ [16:58] datnt: dạ oki anh
  [16:47] vitht: ủa a Thinh Tran  ơi cái card 2380 bữa e nói a giảm giờ xún 2h chiều để test á. A chỉnh lại trên staging chưa [thread: 4 replies]
    └ [16:48] thinht: card đó test lại toàn bộ dc hết dc r á e.
    └ [16:49] thinht: j mà xa quá xa với hiện tại quá r
    └ [16:50] vitht: là sao ==' hum bữa e nói a cái dụ 1:30 rồi mà
    └ [16:51] vitht: v thôi để e chỉnh lại 14:30 ổng hối từ ngày 5/8 rồi
  [16:53] datnt: * PR này là cần anh review trước á anh Vu Tat chứ chưa có lên Staging á anh https://github.com/iamksheth/FountainNewUI/p
  [17:00] datnt: Vu Tat còn cái này á https://github.com/iamksheth/FountainGreetings/pull/466 [thread: 4 replies]
    └ [17:01] datnt: em chưa đưa lên staging mà cái bug này lâu lâu nó báo 422
    └ [17:01] datnt: 422 mình log bug ra vậy em không mò ra được là nó bị gì á, tại 422 của paypal nó có 1 list lỗi lận
    └ [17:02] datnt: nên cái này em handle cho bug log ra thêm info mốt nó bị lại mình có info check á anh
    └ [17:08] vutq: done nha Dat Nguyen
  [17:10] datnt: thêm thằng này luôn nha anh Vu Tat  #[3012](https://trello.com/c/bnFYy1DT/3012-actioncontrollerbadrequest-in-get-admin) 
  [08:52] datnt: Hung Pham card này done cho infinity Beta rồi á, anh test giúp em nha Infinity ổn thì em apply qua fountain sau ạ https: [thread: 33 replies]
    └ [08:53] hungpn: okie em
    └ [10:57] hungpn: infinity có productscatalog đâu em hì Dat Nguyen
    └ [11:09] hungpn: Screencast From 2026-08-12 11-08-20.mp4
    └ [11:09] hungpn: Dat Nguyen: em check thử xem trang có bị giật như của anh k nhé
    └ [11:10] hungpn: https://beta.infinityroses.com/build-a-box?boxItems=eJy1ksFqwzAMht_F5wrWw-joMWVkl0FZy3YYOyiJUpvIVmbL
    └ [11:11] datnt: cái giựt này do cái item đó bị lỗi ảnh á anh
    └ [11:11] datnt: kiểu data thì kiu là có file ảnh mà trên storage thì lại không tồn tại file ảnh đó á
    └ [11:12] hungpn: okie em 👍️
    └ [11:14] datnt: anh thử mở lại nha, em mới up ảnh mới lên á
    └ [11:14] datnt: coi chừng nó dính cache á nên chưa lên được bên máy anh
    └ [11:19] hungpn: image.png
    └ [11:19] hungpn: hay thật chứ sao có thể add dc nhỉ?
    └ [11:19] hungpn: https://beta.infinityroses.com/build-a-box/Kosher-Snacks?boxItems=eJwdzDEOgCAMAMC_dKaDK6M-wzgUUoUELU
    └ [11:21] datnt: case này trước giờ bên mình có test lần nào chưa á anh
    └ [11:22] datnt: tại cái em update chỉ là handle cái url cho nó nhanh hơn thôi á không có đụng vô mấy cái này á
    └ [11:22] hungpn: anh cũng hok nhớ trước đây có check qua chưa nên anh giờ mới thấy lạ
    └ [11:23] hungpn: Cup Of Love 2 Ct Tea Bags
    └ [11:23] datnt: anh test bên fountain case này thử nha, tại bên đó chưa có đưa cái này qua bên đó
    └ [11:23] hungpn: anh cũng k thấy item này? em coi dùm anh nó ở đâu thế
    └ [11:23] datnt: https://staging.fountaingifts.com/admin/product_catalogs?utf8=%E2%9C%93&q%5Btitle_cont%5D=Cup+Of+Lov
    └ [11:24] datnt: cái này xài chung Database á anh, nên anh kiếm nó trong admin thì anh phải qua thằng fountain kiếm
    └ [11:24] hungpn: vậy hả
    └ [11:24] hungpn: bảo sao anh kiếm mãi mà k thấy
    └ [11:35] hungpn: ak hiểu cái case này rồi, hình như add to cart mà  products này có 1 slot thôi mà chia sẻ cho ng khá
    └ [11:36] hungpn: nên check out nó k có được
    └ [11:36] hungpn: tính ra case này trước chắc hok ai check quá, QC cũ cũng chưa check thì fai
    └ [11:37] datnt: em không biết là case này khi mà share link như vậy, thì lúc trước có làm gì để chặn hay chưa
    └ [11:37] datnt: mà em nghĩ là chưa rồi đó case này mới test ra thoi à
    └ [11:39] hungpn: giờ anh thấy nó bị out of stock luôn rồi
    └ [11:42] hungpn: chắc tạm để lại sau có time ngồi check case này
    └ [11:43] datnt: case này note lại rồi để em fix sau luôn anh ơi
    └ [11:43] hungpn: anh check ổn rồi á nè Dat Nguyen
    └ [11:44] datnt: dạ oki anh để em apply nó qua fountain rồi báo anh check bển phát nữa
  [09:13] datnt: anh chị cho em hỏi là cái chỗ điền Project name trong trang send/pro này
  [09:14] datnt: image.png
  [09:14] datnt: mình có giới hạn điền format gì không á như là Rick_Nguyen_test_123.17 (có dấu .)
  [09:15] vitht: dô code đọc thử coi có validate hem Đạt [thread: 5 replies]
    └ [09:19] datnt: hiện là FE với BE không có á chị
    └ [09:19] datnt: chỉ cần không blank thôi à
    └ [09:21] vitht: vậy hả
    └ [09:22] vitht: vậy k có
    └ [09:22] vitht: chỉ điền là đc dòi
  [09:58] vitht: Screenshot 2026-08-12 at 9.58.08 am.png
  [09:58] vitht: ủa ae ơi, Nếu mà đặt trước 12h là tính qua ngày mai lun hả. Như cái này nè
  [09:58] vitht: tưởng nếu đúng thì cái Fedex 3 Express là ngày thứ 6 [thread: 2 replies]
    └ [10:01] thinht: coi kiểm tra kĩ thử có bị zính ngày nghỉ lễ j k nữa e. hoặc có rule nào mới căhng
    └ [10:03] vutq: cái này đang đúng rồi nha mn, không có gì sai đâu
  [09:59] vitht: * ủa ae ơi, Nếu mà đặt trước 12h là tính qua ngày mai lun hả. Như cái này nè Vu Tat Hung Pham Thinh Tran
  [10:15] datnt: Hung Pham anh check lại cái checkout GOC pro hôm qua mà nó bị order not found nha anh em fix lại lên beta rồi á
  [10:23] vitht: Screenshot 2026-08-12 at 1.10.48 pm.png
  [10:23] vitht: mn có thử case này chưa Hung Pham  Phat Le    thêm sản phẩm truóc 12h, xong để đó mà chưa checkout, rồi chỉnh thời gian  [thread: 5 replies]
    └ [10:43] hungpn: bug này nhìn hình quen ghê  Thinh Tran 😅
    └ [10:45] thinht: phải đúng logic đó k vậy :D
    └ [11:45] hungpn: check thử chưa nè
    └ [11:49] thinht: coi r. nãy vi chắc click lộn tab business r mới bấm checkout nên bị á mà
    └ [11:50] hungpn: okie, sau m.n gặp cái hình như vyaaj thì cứ liên hệ vs Thinh Tran nha 😁
  [10:45] duongdn: ai cần 2fa qua chỗ a đi, a hỏi xin cus cho dễ [thread: 1 reply]
    └ [10:45] thinht: ví dụ e cần tiền thì qua đó xin ổng ok k a :D 🤣🤣
  [10:45] duongdn: ổng đang online
  [10:52] vitht: ê ae login dô mailchimp lun kìa
  [10:52] vitht: có gì mốt khỏi xin ổng nữa
  [10:52] vitht: =))
  [10:53] vitht: @Dat
  [10:53] vitht: * Dat Nguyen:
  [10:53] datnt: để em vác máy xuống anh Dương
  [11:45] hungpn: * check thử chưa nè Thinh Tran
  [12:44] datnt: Hung Pham xíu anh ưu tiên QC card này giúp em nha, Kunal cần gấp á anh https://trello.com/c/dt2U3omQ/3022-infinity-add-f [thread: 1 reply]
    └ [13:36] hungpn: tested DONE nh Dat Nguyen
  [12:44] datnt: * Hung Pham anh ơi xíu anh ưu tiên QC card này giúp em nha, Kunal cần gấp á anh https://trello.com/c/dt2U3omQ/3022-infin
  [13:55] datnt: Vu Tat anh check giúp em PR này lên Live nha #[3022](https://trello.com/c/dt2U3omQ/3022-infinity-add-forth-gift-variant- [thread: 4 replies]
    └ [16:49] vutq: bỏ migration gift_variant_fourth nha Dat Nguyen, xài ActiveStorage không cần tạo migration thêm fiel
    └ [16:49] datnt: dạ oki anh để em update
    └ [16:57] datnt: em push lại rồi nha anh Vu Tat ơi
    └ [17:03] vutq: done nha Dat Nguyen
  [09:07] trinhmtt: Lam Le: em start bên đây chưa á, em có 16h bên đây á nha [thread: 3 replies]
    └ [09:11] lamlq: anh Năm kêu là làm Ons nốt á chị Trinh Mai
    └ [09:12] lamlq: hôm qua em có nhắn hỏi
    └ [09:12] trinhmtt: Dị em làm bên ons, đi, nếu mà tuần này ons hết task thì qua đây nha
  [09:08] hungpn: này live chưa á Dat Nguyen
  [09:08] datnt: dạ rồi á anh
  [09:50] datnt: Hung Pham anh ơi, anh check lại card này mà bên Beta của Fountain nha anh em mới đưa lên fountain á https://trello.com/c [thread: 6 replies]
    └ [14:43] hungpn: tested DONE nha Dat Nguyen
    └ [14:45] datnt: Vu Tat anh ơi task improve cái URL với nuqs này mình cần báo khách test khong á anh. Hay mình cho lê
    └ [14:47] vutq: cái này test xong bên BETA thì lên thẳng LIVE thôi
    └ [14:47] datnt: dạ oki anh
    └ [14:48] datnt: 2 PR cho 2 bên đây nha anh  - Fountain: https://github.com/iamksheth/FountainNewUI/pull/494  - Infin
    └ [14:58] vutq: done nha
  [09:50] datnt: * Hung Pham anh ơi, anh check lại card này mà bên Beta của Fountain nha anh, em mới đưa lên fountain á https://trello.co
  [10:50] hungpn: layout trang cart kỳ vậy ta
  [10:50] hungpn: image.png [thread: 3 replies]
    └ [10:51] datnt: này chắc từ card https://trello.com/c/BAI99Jrx/2895-fountain-product-page-bottle-engraving ra á anh
    └ [10:52] datnt: có gì anh assign bug lại cho em fix cũng đc, đợt tuần trước anh Lâm làm mà ảnh chưa qua được bên này
    └ [10:54] hungpn: https://redmine.nustechnology.com/issues/80393 đây nha em
  [10:53] datnt: * có gì anh assign bug lại cho em fix cũng đc, đợt tuần trước anh Lâm làm mà giờ ảnh chưa qua được bên này
  [13:52] phatdlt: https://trello.com/c/Us7NPEY8/2893-fountain-blog Dat Nguyen Ticket này a đẩy đi r nha e
  [16:38] vitht: bữa giờ có ai đụng cái list /admin không
  [16:38] vitht: dô cái list order_items banh lun dòi
  [16:38] vitht: https://staging.fountaingifts.com/admin/order_items [thread: 10 replies]
    └ [16:39] datnt: cái này em biết sao nó bị nè:))
    └ [16:39] datnt: em update bên infinity lên rails 8 cũng bị
    └ [16:40] datnt: bị trong lúc update rails lên á chị, để em mò fix này cho
    └ [16:52] vitht: e định fix sao v
    └ [16:53] datnt: em nhớ là update gem thôi á
    └ [16:53] datnt: nhưng mà gem nào thì em khong nhớ 🥲
    └ [16:54] vutq: mn docker build dưới LOCAL xong vào /admin/order_items thử xem
    └ [17:05] datnt: image.png
    └ [17:05] datnt: cái này không phải bị gem giống em bị infinity rồi
    └ [08:27] datnt: Vi Tran cái này em fix xong rồi nha chị
  [16:40] datnt: * bị trong lúc update rails lên á chị, để em mò fix này cho chị
  [13:24] datnt: Hung Pham anh ơi em fix lại lên beta cái 1h30 cutoff rồi á anh [thread: 1 reply]
    └ [13:35] hungpn: dể anh check lại
  [13:24] datnt: https://trello.com/c/oHJ5YO8y/2380-finding-solution-to-customers-receiving-incorrect-delivery-dates-in-the-delivery-tab-
  [13:39] hungpn: ua? sao anh clear cache cái giờ k login dc vào site beta nữa nhỉ
  [13:40] datnt: ụa kì vậy, em vô được ta
  [13:47] datnt: 
  [13:47] datnt: 
  [13:57] hungpn: ai cứu cái nhỉ? sao k vòa dc nè
  [14:19] hungpn: ai cũng vào dc site đó mà anh k vào dc
  [16:21] hungpn: image.png
  [16:22] hungpn: lỗi gì nè @vu [thread: 17 replies]
    └ [16:22] datnt: cái field mới em mới thêm vô
    └ [16:25] vutq: tạo migration vô order_items nữa em
    └ [16:25] datnt: dạ oki anh để em tạo
    └ [16:35] datnt: Vu Tat anh ơi PR này nha anh https://github.com/iamksheth/FountainGreetings/pull/470
    └ [16:41] vutq: done nha mn Hung Pham Dat Nguyen
    └ [16:41] hungpn: để anh check lại
    └ [16:55] hungpn: Checkout ổn rồi nha  Vu Tat có thông báo rồi á nè
    └ [16:55] hungpn: nhưng chưa fix cái vụ Review Order nó vẫn đang đá ra trang checkout á
    └ [16:58] datnt: Vu Tat cái vụ mà đá ra này là từ ban đầu card đã làm vậy luôn rồi á anh
    └ [16:58] vutq: ye và nó không nên như vậy á em
    └ [16:59] datnt: còn cái mà hôm nay thứ 6 mình chỉnh máy mình lên 7h sáng xong chỉnh lại 7h tối nó không work
    └ [16:59] datnt: em thấy là do múi giờ server hay sao á
    └ [16:59] datnt: tại code dưới local em thì nó oki
    └ [17:00] vutq: niche quá, để có khách hàng nào dính rồi mình tính, ổn định mấy ngày trong tuần đã
    └ [17:00] datnt: Hung Pham anh test mấy ngày trong tuần nó oki mà phải không anh
    └ [17:00] datnt: còn cái mà anh báo em ngay hôm nay anh chỉnh sáng 7h xong chỉnh lại 7h tối không được thì cái đó chỉ
    └ [17:24] hungpn: đúng rồi á
  [16:22] hungpn: * lỗi gì nè Vu Tat
  [17:01] datnt: * còn cái mà anh báo em ngày hôm nay anh chỉnh sáng 7h xong chỉnh lại 7h tối không được thì cái đó chỉnh tiếp sang thứ 2
  [23:15] hungpn: Mai anh có việc đột xuất nên off cả ngày nha m.n. có gì cần cứ báo có gì anh check sau nha
