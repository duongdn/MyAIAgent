# Matrix — since 2026-09-28 00:00 +07:00

### !EWnVDAxbTGsBxPkaaI:nustechnology.com — 414 messages
  [08:30] vitht: ổng nói có một bug của cái blurb nha
  [08:30] vitht: https://trello.com/c/67Rrcyf8/3116-blurb-bug
  [08:41] vitht: ổng có update yêu cầu card này lunn nhenn  https://trello.com/c/BAI99Jrx/2895-fountain-product-page-bottle-engraving [thread: 4 replies]
    └ [08:41] datnt: card này giờ ai đang handle lun vậy chị
    └ [09:01] vitht: chị nè e
    └ [09:01] vitht: mà c đang làm card kia nên chưa qua đc
    └ [09:01] datnt: dạ oki chị
  [08:47] vitht: ổng có rep card này lun nhenn  https://trello.com/c/vADuMMNP/3099-fountain-gifts-infinity-roses-analytics-implementation
  [08:56] datnt: Hung Pham card bug này em done rồi nha anh QC giúp em nha https://trello.com/c/67Rrcyf8/3116-blurb-bug [thread: 2 replies]
    └ [08:56] hungpn: để anh check
    └ [09:26] hungpn: tested xong nha Dat Nguyen
  [09:02] trinhmtt: em gửi plan tuần này ạ  ViTHT: 40h ThinhT: 20h DatNT: 40h => QC: 25h
  [09:06] vitht: Hung Pham:  https://trello.com/c/tSuQHKwj/2978-infinity-giftdrop-recipient-flow  a Hùng ơi add trước image gift variant  [thread: 2 replies]
    └ [09:27] hungpn: okei em
    └ [10:08] hungpn: anh đang up cho itema này nha Large Square Rose Box
  [09:28] datnt: Vu Tat anh review giúp em PR này nha, anh loy xong anh clear cache giúp em luôn nha #[3116](https://trello.com/c/67Rrcyf [thread: 1 reply]
    └ [09:51] vutq: done nha Dat Nguyen
  [09:38] vitht: Screenshot 2026-09-28 at 9.38.11 am.png
  [09:38] vitht: kêu ổng improve cái UI này lại nè Trinh Mai   kiểu nó đang bị dài quá á
  [09:39] vitht: kiểu ổng làm dạng dropdown mà có search á. Giống cái select2
  [09:49] vitht: lúc mn bấm "Add to cart" trên beta Fountain Gift có bị lỗi này hông [thread: 2 replies]
    └ [09:49] datnt: có nha chị
    └ [09:50] datnt: em mới test thử cũng bị như chị á
  [09:49] vitht: Screenshot 2026-09-28 at 9.48.49 am.png
  [10:04] vitht: Để chị xem thử
  [10:12] hungpn: image.png
  [10:12] hungpn: hình này thêm chỗ nào á m.n nhỉ [thread: 18 replies]
    └ [10:16] datnt: anh đang ở folder nào á anh
    └ [10:22] datnt: này anh thêm vô trong gift variant của gift đó cái nào có box color trắng thì anh thêm vô ảnh thứ 4 
    └ [10:22] datnt: image.png
    └ [10:28] hungpn: okie
    └ [10:28] hungpn: image.png
    └ [10:28] hungpn: check dùm anh sao nó có dư nh hình vậy nhỉ?
    └ [10:29] datnt: cái đó hình của gift á anh
    └ [10:29] datnt: image.png
    └ [10:30] datnt: 3 ảnh đầu nó lấy gift variant, rồi nó check tiếp lấy ảnh của gift nữa á anh
    └ [10:38] hungpn: https://beta.infinityroses.com/preserved-roses/large-square-box/large-square-box-rose-mix-roses-Whit
    └ [10:42] datnt: anh thử để 10p sau xem nó dính cache không nha, giờ em đang dính card á
    └ [11:20] hungpn: anh vẫn chưa thấy show
    └ [11:20] datnt: hmmm dị để em qua check cho anh
    └ [11:38] datnt: cái này do đang bị trùng màu Hex giữa thằng Tuxedo với thằng Black Galaxy á anh nên nó chỉ render ra
    └ [11:38] datnt: chắc để em handle case này lại
    └ [11:53] datnt: Hung Pham anh check lại thử nha
    └ [13:44] hungpn: có rồi nhé
    └ [13:46] datnt: anh check thêm cái này cần handle lại behavior gì thêm không nha cái hiện rose color này á, nếu khon
  [11:21] hungpn: https://beta.infinityroses.com/preserved-roses/large-square-box/large-square-box-Turquoise-Blue-Roses-White-Box -- Vi Tr
  [11:25] hungpn: duplicate giftdrop sao k thấy gì hết nhỉ?
  [11:25] hungpn: image.png
  [11:25] hungpn: ai rảnh check dùm anh
  [11:38] vitht: cái bug hồi sáng liên quan tới trang ProductOverView [thread: 6 replies]
    └ [11:40] thinht: là lỗi gì vậy e
    └ [11:51] vitht: lỗi hiện tại không phải "trang /cards bị hỏng". Khả năng cao là ReviewsIO được khởi tạo trên Product
    └ [11:52] vitht: fountainnewui/components/Product/ProductReviews.tsx  file này nè a , a dô coi thử đi
    └ [11:55] hungpn: trên view của user có steps nào đặc biệt hok em
    └ [11:59] vitht: đăc biệt là sao a
    └ [11:59] vitht: e test cái case happy lun á, là nó bị
  [11:38] vitht: * cái bug hồi sáng liên quan tới trang ProductRevieww, sau này có push lên live thì mn chú ý case này nha. Vi mới fix tr
  [11:38] vitht: Screenshot 2026-09-28 at 9.48.49 am.png
  [11:39] vitht: * cái bug hồi sáng liên quan tới trang ProductRevieww, sau này có push lên live thì mn chú ý case này nha. Vi mới fix tr
  [13:25] thinht: Dat Nguyen: tình hình bữa fix zụ mất codes  đó ổn k e? vẫn giữ nguyên code của Cus chứ? [thread: 2 replies]
    └ [13:32] datnt: vẫn giữ lại nhiều á anh
    └ [13:32] datnt: hên là hổm chỉ bị cái show GOC cho pro thôi nên là vẫn handle được anh
  [13:29] thinht: cho a xin ticket nha Trinh Mai [thread: 2 replies]
    └ [13:35] trinhmtt: https://trello.com/c/z8P7mYj5/3117-infinity-update-gift-variant-export
    └ [13:35] trinhmtt: đây nha anh
  [15:35] datnt: anh chị ơi cho em hỏi dạo này có ai vô Order tab của Admin LIVE Foutain rồi update/upload gì chỗ cái nút này đâu phải kh [thread: 3 replies]
    └ [15:37] thinht: a k có
    └ [15:37] datnt: nó cứ bị update lại cái form mà khách tải về thành file sheet cũ á, nên nếu cus không update mà mình
    └ [15:44] vitht: liên hệ a Vũ trên production nha
  [15:35] datnt: 
  [15:36] datnt: Screenshot from 2026-09-28 15-34-32-1.png
  [15:37] vitht: chị không có đụng á. Sao v
  [15:37] vitht: Nó bị gì
  [15:48] datnt: Hung Pham có card này em fix lên STAING rồi anh QC giúp em nha. Nó bị gift chưa có tạo mà đi kiếm nó bằng cách nhập thẳn [thread: 29 replies]
    └ [15:53] hungpn: image.png
    └ [15:53] hungpn: lỗi vầy hả em
    └ [15:53] datnt: ở bên Admin á anh
    └ [15:53] datnt: chứ không phải bên UI user á
    └ [15:54] hungpn: ak rồi
    └ [15:54] hungpn: nhưng fix mỗi page đó thôi hả em
    └ [15:55] datnt: hmmm em có fix 1 số page nữa như category, card, card category
    └ [15:55] datnt: nhưng mà chưa hết thì phải
    └ [15:56] hungpn: như cái này anh nhập id thì nó phát hiện được nhưng anh mà nhập cái ký tự chữ vào là nó thua nè
    └ [15:56] hungpn: image.png
    └ [16:04] hungpn: image.png
    └ [16:04] datnt: mấy thằng khác có bị dính case này khôngh á anh
    └ [16:04] hungpn: anh  đang đi thủư nè
    └ [16:05] hungpn: gần như là bị hết á
    └ [16:05] datnt: dạ oki anh để em check fix tiếp
    └ [16:08] hungpn: page: - Gifts - Order - Order Items - User - Credits - Gift Variants - Rose Colors - Holiday Deliver
    └ [16:20] datnt: ủa anh Hung Pham  - Gift Variants - Rose Colors là bên infinity anh nhỉ
    └ [16:21] hungpn: em đang fix bên founttains hả
    └ [16:21] datnt: đúng rồi anh :))
    └ [16:21] hungpn: vậy để anh xem lại
    └ [16:25] hungpn: Fountains: - Promo Codes -
    └ [16:26] hungpn: conf sot lai ak ne em
    └ [16:26] datnt: dạ oki anh
    └ [16:29] datnt: Proof Templates cái này anh log ticket vô card này giúp em nha https://trello.com/c/ce8n3niB/3040-fo
    └ [16:29] datnt: nó nằm bên nhánh kia chưa có lên LIVE nên không có fix chung theo được á anh
    └ [16:33] hungpn: okie em
    └ [16:42] datnt: cái này Done với em mới update thêm mấy cái tab admin kia lun nha anh
    └ [10:58] datnt: Cái này em Done luôn lên Staging rồi nha anh Hung Pham
    └ [10:59] hungpn: okie em
  [15:50] hungpn: okie em
  [16:25] hungpn: * Fountains: - Promo Codes - Proof Templates
  [16:44] thinht: https://trello.com/c/z8P7mYj5/3117-infinity-update-gift-variant-export check con này luôn nhan Hung Pham
  [08:18] vitht: ổng có hỏi card này nha mn ơi  https://trello.com/c/xIukJjhO/2955-infinity-account-and-auth  Hung Pham Trinh Mai [thread: 4 replies]
    └ [08:55] thinht: hỏi ổng muốn lên Live luôn hay ntn nhan Trinh Mai
    └ [09:10] hungpn: gửi ổng 1 message đi nè, cái đó done rồi hỏi xem có live k. Có khi oognr k thấy message nên hỏi đó
    └ [09:15] trinhmtt: Đạt mới check chưa đúng design nen cần update lại nha mn
    └ [09:16] hungpn: confirm nha
  [09:18] trinhmtt: https://trello.com/c/tY3yvAti/3120-development-master-key có ai biet cai s này là cái gì k ạ [thread: 3 replies]
    └ [09:19] datnt: cái đó key mã hóa để mở file credentials thì phải á chị
    └ [09:21] vitht: cái master.key để ổng chạy app duói local á. Gửi trên này đc hem. Hay qua what app
    └ [09:21] trinhmtt: để em gửi qua what's app nha
  [09:18] vitht: cái số item trên cùng một hàng có cần giống bên product detail lun hem
  [09:18] vitht: Screenshot 2026-09-29 at 9.18.10 am.png
  [09:19] vitht: Screenshot 2026-09-29 at 9.19.00 am.png
  [09:19] vitht: thấy một hàng 9, còn một UI là hàng 10
  [09:19] trinhmtt: ddạ có
  [09:19] vitht: okie a Hùng post bug giúp e vói nha
  [09:19] vitht: của card 2978
  [09:19] vitht: lát e xong card này e qua fix lun
  [09:23] vitht: https://trello.com/c/qorCBsuP/3121-security-fixes-ready-for-review
  [11:47] datnt: Hung Pham anh ơi card này em update lại lên BETA rồi nha anh, anh Test nó giúp em nha  https://trello.com/c/xIukJjhO/295 [thread: 19 replies]
    └ [11:52] hungpn: tý anh vào check nhé
    └ [14:50] hungpn: check lai treen view mobile dumf anh nha
    └ [14:50] hungpn: em vào nhấn cho nó show lỗi là error nó đè lên title á
    └ [14:51] datnt: image.png
    └ [14:51] datnt: này phải không anh
    └ [14:51] hungpn: đúng rồi
    └ [14:51] datnt: dạ oki anh để em update
    └ [14:57] hungpn: https://redmine.nustechnology.com/issues/81190
    └ [14:57] hungpn: đây nữa nha
    └ [15:06] datnt: Hung Pham Done nha anh check lại giúp em nha
    └ [15:11] hungpn: image.png
    └ [15:11] hungpn: thiếu cái nay ne Dat Nguyen
    └ [15:12] datnt: trang này ngoài scope rồi á anh
    └ [15:12] hungpn: image.png
    └ [15:13] datnt: scope em confirm là cái popup Auth với lại page /account thui á anh
    └ [15:14] hungpn: okie
    └ [15:44] hungpn: cái này xong chưa em
    └ [15:47] datnt: dạ rồi á anh
    └ [15:47] datnt: em có thêm cái rounded vô rui á
  [13:33] thinht: Trinh Mai: cho a xin ticket nha, Vi Tran có task nào cần a fix k vậy
  [13:34] vitht: Dạ cái task review á a
  [13:34] vitht: lúc a add một item dô cart thì nó chuyển tới trang chọn card
  [13:34] vitht: nó bị như vậy
  [13:35] vitht: Screenshot 2026-09-28 at 9.48.49 am.png
  [13:35] vitht: e fix trên staging rồi, a check lại trên branch của a thử
  [13:35] vitht: lỗi hiện tại không phải "trang /cards bị hỏng". Khả năng cao là ReviewsIO được khởi tạo trên Product page, tự thay đổi D [thread: 2 replies]
    └ [16:40] thinht: Hung Pham: t mới update sơ cách load lại reviews check xem thử nhảy qua nhảy lại zữa các trang, hay 
    └ [16:41] hungpn: qua nc nè m
  [13:39] trinhmtt: https://trello.com/c/tSuQHKwj/2978-infinity-giftdrop-recipient-flow#comment-6abb3a034c2ddf6727db896e con này của ai Live
  [13:43] vitht: c đang làm á
  [13:43] vitht: đang handle conflict cái
  [14:54] vitht: review giusp c pull request này vs Vu Tat  ơi a
  [14:54] vitht: https://github.com/iamksheth/FountainNewUI/pull/499
  [14:54] vitht: * review giusp c pull request này vs Vu Tat  ơi
  [14:55] vitht: https://trello.com/c/tSuQHKwj/2978-infinity-giftdrop-recipient-flow
  [14:55] vitht: Cho card này
  [15:16] datnt: Vu Tat anh review giúp em PR này nha #[2500](https://trello.com/c/bUhZxZRE/2500-fountain-performance-of-website): https: [thread: 4 replies]
    └ [15:40] vutq: done nha em
    └ [15:40] vutq: image.png
    └ [15:40] vutq: bản fix này áp dụng cho mấy chỗ khác trong app luôn nha
    └ [15:41] datnt: dạ oki anh để em đi check rồi apply vô
  [16:13] vitht: https://github.com/iamksheth/FountainNewUI/pull/521  cái này cho 3023 nha Vu Tat  ơii
  [16:13] vitht: https://trello.com/c/gnw4qAwO/3023-infinity-update-preview-giftdrop-button-with-new-recipient-flow [thread: 1 reply]
    └ [16:23] vutq: done nha chị Vi Tran
  [16:44] vitht: a Hung Pham  ơi check card 2978 giúp e trên production với
  [16:46] vitht: * a Hung Pham  ơi check card 2978 và 3023 giúp e trên production với
  [08:33] datnt: Vu Tat anh ơi ổng có message ở card setup server nha anh https://trello.com/c/uPcfRWzN/3106-set-up-separate-test-environ
  [09:55] hungpn: check bug redmine nha
  [11:35] vitht: Hung Pham: A ơi cái này update một row 9 màu á, chứ k phải 10 màu á a ơii
  [11:35] vitht: update cái recipient address theo product detail
  [11:36] vitht: https://redmine.nustechnology.com/attachments/87894
  [12:22] vitht: 2978 có backend nữa Vũ oi
  [12:22] vitht: https://github.com/iamksheth/FountainGreetings/pull/460 [thread: 1 reply]
    └ [13:36] vutq: done nha chị Vi Tran
  [12:22] vitht: chiều e review rồi deploy dùm c nha
  [13:35] thinht: cho a xin ticket nha Trinh Mai [thread: 1 reply]
    └ [13:39] trinhmtt: https://trello.com/c/KNq08ij5/1796-ai-powered-message-screen  card này nha anh
  [14:43] vitht: https://redmine.nustechnology.com/issues/81200  Check lại giúp e con bug này vs a Hung Pham  ơi, đưa lên live rồi ạ [thread: 1 reply]
    └ [10:45] hungpn: tested DONE nha Vi Tran
  [15:24] datnt: Thinh Tran anh ơi cái card 3035 của anh giờ chờ QC done là lên LIVE thôi đúng khong anh [thread: 34 replies]
    └ [15:24] thinht: uhm e
    └ [15:25] datnt: https://github.com/iamksheth/FountainNewUI/pull/553
    └ [15:25] datnt: ổng mới múa cái gì nữa á anh 🥲
    └ [15:25] datnt: rồi ổng mention vô từa lưa PR em không hiểu đang muốn làm gì luôn rồi
    └ [15:27] thinht: bó tei r e
    └ [16:21] vitht: A Thịnh dô đọc hiểu code ổng thử a Thịnh
    └ [16:21] vitht: chứ h cũng k dám merge :v
    └ [16:24] thinht: ổng muốn live hã e? ổng làm 1 lần 2-3 PRs chẳng biết nên làm j luôn
    └ [09:46] hungpn: image.png
    └ [09:46] hungpn: Thinh Tran: như cái search này k áp dụng đúng ở chỗ Infinity Roses á nè
    └ [09:48] hungpn: ak k nó search 3 ký tự trong khung search 😐️
    └ [09:49] hungpn: image.png
    └ [09:49] hungpn: nào qua fix dùm cái này nếu nhấn clear thì là clear hết filter đang apply nha Thinh Tran
    └ [09:51] thinht: ủa m đâu
    └ [09:52] hungpn: đang ngồi làm nè
    └ [09:54] hungpn: image.png
    └ [09:54] hungpn: nhớ trước là có data trả về mà nay trả về rỗng luôn nhỉ
    └ [10:00] thinht: khách nó đổi logic vs mong muốn hiển thị r :D
    └ [10:01] hungpn: uhm, tính ra trước còn suggest nay thì khỏi luôn
    └ [10:01] thinht: m ngồi nhà ah
    └ [10:01] hungpn: AI đang chat vs mầy á
    └ [10:01] thinht: t báo CA
    └ [10:26] hungpn: image.png
    └ [10:27] hungpn: nếu k nhập cái search mà chọn option này thì đâu có ý nghĩa nhỉ
    └ [10:31] thinht: nay có lên cti hem boi.
    └ [10:38] hungpn: k nha bờ rô
    └ [10:39] hungpn: cần gì ibx riêng nha
    └ [10:49] thinht: okie, dẫy gom mấy lỗi đó lên redmine đi. để t xem qua ngâm cú ntn
    └ [11:14] hungpn: đã gom nha, tý lên hốt hụi nè
    └ [11:16] thinht: okie. chìu t loy 1 mớ lên staging ổng update nữa đó. h nhìu khi m nt hỏi ổng là ổng muốn làm cái tín
    └ [15:01] hungpn: có gì mới chưa mầy ơi
    └ [15:02] thinht: chưa đang xử lý khủng hoảng từ codes của ổng
    └ [16:04] thinht: Hung Pham: m test lại thử ntn. thấy cus nó bỏ cái tag sort rồi. thay bằng dạng này. khi không có tex
    └ [16:04] thinht: Screenshot from 2026-10-01 16-03-53.png
  [15:45] datnt: Vu Tat anh check giúp em PR này fix lại cái sizes cho Image nha anh, có đi verify lại các page change sizes này có khớp  [thread: 5 replies]
    └ [10:40] vutq: giữ set vw cũ nha Dat Nguyen  10vw, 25vw, 33vw, 50vw, 100vw chỉ cần chỉnh max-width giảm đi 1px thôi
    └ [10:46] datnt: Vu Tat mà có nhiều cái nó bị sai luôn số vw thì mình fix luôn không anh hay là cứ giảm 1px thôi á nh
    └ [10:47] vutq: sai hẳn vw thì fix, cái set anh đưa phía trên chỉ là những loại vw có thể sử dụng thôi
    └ [10:50] datnt: dạ oki anh để em done task hiện tại em đi check update lại
    └ [16:12] datnt: Vu Tat em update lại rồi nha anh
  [15:51] datnt: * Vu Tat anh check giúp em PR này fix lại cái sizes cho Image nha anh, em có đi verify lại các page change sizes này có 
  [10:28] datnt: Vu Tat anh review giúp em PR này nha #[2955](https://trello.com/c/xIukJjhO/2955-infinity-account-and-auth): https://gith [thread: 1 reply]
    └ [10:49] vutq: done nha em
  [10:53] datnt: * à dạ oki anh, để em done task hiện tại em đi check update lại
  [11:55] phatdlt: Screenshot 2026-10-01 at 11.54.56.png
  [11:56] phatdlt: Trinh Mai: A thấy chưa có quick add tại mấy item này trên build a box nè e. E suggest thử coi ổng cho task làm k á [thread: 1 reply]
    └ [13:29] trinhmtt: cái quick add anh nói ở card nao á anh Phat Le
  [11:56] phatdlt: Mới chỉ quick add ở những items link với fountain thôi
  [13:30] vutq: phần rose có nhiều variant sẽ không có quick add, đây là tính năng đã discuss với designer chứ không phải làm thiếu nha 
  [13:55] vitht: cái con trỏ lúc mở edit message nó về đầu là đúng hông ae [thread: 1 reply]
    └ [15:57] hungpn: trước anh nhớ là có 1 req update khi mở cái Edit message thì con trỏ chuột fai focus vào  message nh
  [13:55] vitht: Screenshot 2026-10-01 at 1.54.47 pm.png
  [13:55] vitht: * cái con trỏ lúc mở edit message nó về đầu là đúng hông ae ở infinity roses của production
  [14:09] trinhmtt: Vu Tat: qua đây giờ luon nhe anh ơi, giờ đến hết tuần anh spend bên đay luon nha anh
  [14:10] vutq: oke em
  [14:20] thinht: https://trello.com/c/KNq08ij5/1796-ai-powered-message-screen Trinh Mai ông Kunal move card này qua shelf là sao vậy ta. 
  [14:23] phatdlt: https://redmine.nustechnology.com/issues/81234 Vi Tran E log lại r nha c ơi
  [15:19] datnt: Hung Pham anh ơi QC lại card này giúp em nha https://trello.com/c/ce8n3niB/3040-fountain-build-internal-digital-proof-ge [thread: 18 replies]
    └ [15:21] datnt: này update lại 3 cái mới á anh:  - Ribbon Kunal muốn nó phải luồng được qua cái box tag á  - Giờ có 
    └ [15:21] datnt: draft-proof-v1.zip
    └ [15:25] datnt: cụ thể info hơn nữa thì anh có thể đoc 2 cái này - https://github.com/iamksheth/FountainNewUI/pull/5
    └ [15:25] hungpn: okie em
    └ [15:28] hungpn: login accont nao ak em?
    └ [15:29] datnt: anh log bằng acc anh hay xài để test trên UI Beta á anh
    └ [15:30] datnt: parker@nustechnology.com
    └ [15:30] hungpn: hok, ý anh là sài account nào login bên github á
    └ [15:30] datnt: à nhỉ để em check
    └ [15:30] datnt: rick@nustechnology.com
    └ [15:30] datnt: acc này á anh
    └ [15:31] datnt: trong cái quản lý acc anh có được share acc này chưa á
    └ [15:33] hungpn: hinh nhuw chuwa as nef
    └ [15:34] datnt: hmmm vậy để em copy ra notion rồi gửi link cho anh đọc
    └ [15:36] hungpn: okie liền nè
    └ [15:37] datnt: https://app.notion.com/p/Draw-3ec90c7db07b805e83c5df6a28795acd?source=copy_link
    └ [15:38] datnt: anh thử cái này xem vô đc không á anh
    └ [15:46] hungpn: dc nha em
  [15:33] hungpn: * hình như chưa có á nè
  [15:41] vitht: Deploy BE Fountain cái nha mn ơi [thread: 1 reply]
    └ [15:41] thinht: loy chưa
  [15:48] vitht: có ai merge 7 commit tói staging hả mn [thread: 18 replies]
    └ [15:49] datnt: em pick qua mà em pick nãy giờ lâu rồi á mà có 4 thôi á chị
    └ [15:50] vitht: của e là commit của card nào dị
    └ [15:50] vitht: cho c cái id vs
    └ [15:50] datnt: 3040 á chị
    └ [15:50] thinht: nếu nó là của Kirk thì là a đó
    └ [15:51] thinht: e loi BE xong chưa
    └ [15:51] vitht: e ms push mà nó bắt pull
    └ [15:51] thinht: còn thấy Kunal là thằng cus đó
    └ [15:51] vitht: e mới pick 2 commit của ổng qua
    └ [15:51] datnt: chị merge commit lâu chưa á
    └ [15:51] vitht: là e đó
    └ [15:51] datnt: nãy em pick qua lúc 3h á
    └ [15:52] vitht: e mới push staging à
    └ [15:52] datnt: đúng rồi chị :)))
    └ [15:52] vitht: a Thịnh deploy dùm e đi
    └ [15:52] thinht: okie
    └ [15:56] thinht: loy xong nha mn. FE vs BE
    └ [16:00] vitht: Dạ okie để e test
  [15:48] vitht: * có ai merge 7 commit ts staging hả mn
  [16:09] vitht: Hung Pham Phat Le  test card này giúp e nha. E mới đưa một vài cái commit của ông Kunal fix lên BETA fountain. Mấy cái l
  [16:09] vitht: * Hung Pham Phat Le  test card này giúp e nha. E mới đưa một vài cái commit của ông Kunal fix lên BETA fountain. Mấy cái
  [16:10] vitht: * Hung Pham Phat Le  test card này giúp e nha. E mới đưa một vài cái commit của ông Kunal fix lên BETA fountain. Mấy cái
  [16:11] datnt: em deploy BETA Fountain nha mn
  [16:13] vitht: * Hung Pham Phat Le  test card này giúp e nha. E mới đưa một vài cái commit của ông Kunal fix lên BETA fountain. Mấy cái
  [16:13] hungpn: hôm nay deploy nh quá nè
  [16:14] vitht: Từ từ cũng đc tại ông Kunal hôm qua ổng mới change mấy chục file á [thread: 4 replies]
    └ [16:15] hungpn: cus nay tự code luôn rồi hở
    └ [16:17] thinht: móa ổng cũng update trên của tao 1 mớ. đậu phông. tách tè le.  check điên ngừ
    └ [16:18] datnt: ổng quậy PR open thôi được rồi, PR em merge rồi close rồi ổng còn mention qua em không hiểu nó liên 
    └ [16:21] hungpn: giờ ngồi check task fai cận thận hơn rồi, dò lại mấy cái liên quan luôn quá
  [16:14] vitht: * Từ từ cũng đc tại ông Kunal hôm qua ổng mới change mấy chục file á : (
  [17:28] thinht: Hung Pham: task Review mới loy codes mới của cus khi nào test hú t nói thay đổi của ông nahn [thread: 3 replies]
    └ [17:28] hungpn: chắc mai nghe
    └ [17:29] thinht: okie
    └ [09:40] hungpn: qua t nè mầy ơi Thinh Tran
  [09:53] hungpn: image.png
  [09:53] hungpn: ý, cái này mới nè [thread: 2 replies]
    └ [10:06] thinht: loy staging r, mà đang hỏi ý định của ổng
    └ [10:11] thinht: https://trello.com/c/KNq08ij5/1796-ai-powered-message-screen nó kéo qua QA luôn r. éo hiểu kiểu gì
  [10:00] vitht: Này task của a Thịnh làm mà code của ông Kunal =)) [thread: 8 replies]
    └ [10:06] thinht: code a đó. chắc cb ổng cũng thêm nữa ah
    └ [10:06] hungpn: code của Thịnh à, gửi cái design xem nào mầy ơi
    └ [10:12] thinht: nó xoá hình design r, h đòi làm cái design  mới.
    └ [10:16] hungpn: vậy chắc khỏi test quá, đợi design mới
    └ [10:22] thinht: k bik thế lào, h ỏng kéo hẳn qua QA luôn mới chịu. mà thôi chờ típ xem ý ổng làm j đã
    └ [13:33] thinht: Screenshot from 2026-10-02 13-33-23.png
    └ [13:33] thinht: cho coi tạm design trước đó
    └ [14:57] thinht: skip không test ticket này nữa nhan Hung Pham Vũ nói để ổng tự làm r có j loy test sau.
  [10:22] vitht: post bug này giúp e với
  [10:23] vitht: Screenshot 2026-10-02 at 10.22.48 am.png
  [10:23] vitht: đáng lẽ ra cái này phải là complete box nhưng nó lại là add to cart
  [10:24] vitht: trên production của Fountain app
  [10:24] vitht: * post bug này giúp e với Hung Pham
  [10:25] hungpn: staging nó cũng vậy? em đang ở bên Business view?
  [10:25] vitht: Dạ đúng gòi
  [10:26] hungpn: nó sẽ k match vs 2 button trên cái Your box đó em? để đi check lại design
  [10:26] vitht: Dạ
  [10:40] hungpn: anh tìm thấy card update của bên Personal thôi k có update bên Business ak Vi Tran
  [10:45] vitht: là bên business vẫn để là add to cart hả a [thread: 1 reply]
    └ [10:48] hungpn: qua anh đi nè
  [10:46] vitht: e nghĩ phải đồng bộ text hết chứ hả
  [10:46] vitht: Mình có confirm vói ông design chưa a
  [10:54] datnt: Hi anh chị trang BETA và STAGING an chị vẫn truy cập vô được phải không á
  [10:54] datnt: * Hi anh chị trang BETA và STAGING anh chị vẫn truy cập vô được phải không á
  [10:55] datnt: em config xong firewall cho STAGING rồi á, nên đúng thì các link staging.fountaingifts.com/admin và beta.fountaingifts.c
  [10:56] datnt: còn nếu vô bằng https://174.138.125.143/ thì sẽ chặn lại
  [10:56] datnt: nên mn xem có bị block truy cập gì không nha
  [10:57] datnt: còn anh chị dev Thinh Tran Vu Tat Vi Tran mn thử ssh vô STAGING xem có được không nha [thread: 8 replies]
    └ [10:57] vutq: done nha em
    └ [10:58] thinht: a zô dc nha
    └ [10:59] datnt: Vu Tat em check xong checklist task firewall rồi á, chỉ để hết hôm nay nếu không có issue gì thì mai
    └ [11:00] vutq: oke em, nhớ nhắn trong ticket báo Kunal 1 tiếng
    └ [11:00] datnt: dạ oki anh
    └ [11:03] vitht: dô đc á
    └ [11:03] vitht: để lát deploy code lên thủ
    └ [11:04] datnt: dạ oki chị có gì chị deploy chị done chị ping em cái nha
  [11:03] vitht: * để lát deploy code lên thử
  [11:04] datnt: * dạ oki chị có gì chị deploy done chị ping em cái nha
  [11:56] vitht: sao cái này login gòi mà nó vẫn hiển thị bắt login lại á [thread: 7 replies]
    └ [11:56] datnt: chị có đang login bên admin không á
    └ [11:57] vitht: hông á
    └ [11:58] datnt: tại có 1 đoạn code đợt có log bug là login rồi mà bắt login nữa
    └ [11:58] datnt: mà cái đó là behavior khi mà app check ra còn cookie của admin là nó bắt bên UI login lại á chị
    └ [11:58] trinhmtt: Đợt đó là nó logout luon và bắt login lại
    └ [11:59] trinhmtt: Còn cái này chị thấy chị Vi chụp đang login roi mà
    └ [11:59] datnt: hmmm dị là bug khác nữa roi á
  [11:56] vitht: Screenshot 2026-10-02 at 11.55.47 am.png
  [13:29] vitht: cái gift a choice trên production dang bị v nè mn ơi
  [13:29] vitht: là có đúng hông
  [13:29] vitht: Screenshot 2026-10-02 at 12.02.11 pm.png
  [13:30] vitht: Screenshot 2026-10-02 at 1.30.25 pm.png
  [13:30] vitht: bấm dô nút go to checkout bị Free hết
  [13:31] datnt: bug ròi á chị ơi :)))
  [13:36] vitht: tình hình lắm nè ae oiw
  [13:36] vitht: Screenshot 2026-10-02 at 1.36.18 pm.png
  [13:36] vitht: =))
  [13:36] vitht: * tình hình lắm nè ae ơi
  [13:37] thinht: cus tạo 1 mớ PR trong git. coi liên quan tới ticket nào coi để ý check nha mn
  [13:41] thinht: sáng h hay hôm qua có ai loy tính năng j mới trên beta fountain không mà nay click detail product  thấy lạ vậy
  [13:46] vitht: Dạ nay mới push một vài code của ổng lên BETA fountain hay sao á a [thread: 2 replies]
    └ [13:48] thinht: thấy click product nó ra category luôn. k bk phải tính năng mới k
    └ [13:49] datnt: em thấy bug á, em chọn 1 gift để add cart mà nó nhảy category tè le á
  [13:58] vitht: Do mình á để chị fix
  [13:58] vitht: xưa ai làm cái card 298 dị [thread: 6 replies]
    └ [13:59] datnt: em á chị
    └ [13:59] datnt: bug gì chỗ đó hả chị
    └ [14:00] vitht: là cái bug chị push đó e
    └ [14:01] datnt: hmmm hơi lạ tại em làm flow bên Pro á, dị chị fix lại nha
    └ [14:03] vitht: thì bên flow Pro bị đó
    └ [14:03] vitht: chứ flow personal bình thường
  [13:58] vitht: * xưa ai làm cái card 2968 dị
  [14:09] datnt: image.png
  [14:10] datnt: Hung Pham Phat Le 2 anh ơi cho em hỏi cái chỗ giftdrop này có cái header này khong á em check design với bên beta thì kh
  [14:17] phatdlt: hong có e ơi
  [14:17] phatdlt: Sao nay UI hư lum la nhiều dị
  [14:17] phatdlt: Mới hqa đâu có thấy này đâu
  [14:30] vitht: bên QC test lại toàn bộ feature bên fountain gift production đi truóc khi ổng phát hiện thêm bug khác
  [14:34] vitht: xún đây giúp chị cái Đạt ơi
  [14:34] vitht: Dat Nguyen:
  [14:39] thinht: 
  [14:49] vitht: Screenshot 2026-10-02 at 2.48.43 pm.png [thread: 5 replies]
    └ [16:18] datnt: Hung Pham anh QC giúp em lại cai này trên BETA với, nó đang bị thiếu cái ỉtem GOC ở cột bên phải của
    └ [16:51] hungpn: okie để anh check
    └ [17:10] hungpn: image.png
    └ [17:10] hungpn: smartlink  nó k show ở góc phải lên nè em
    └ [17:11] datnt: dạ oki anh để em update tiếp
  [15:00] vitht: Review giúp c cái pull request này vs Vu Tat  ơi, cho cái bug gift a choice
  [15:00] vitht: https://github.com/iamksheth/FountainNewUI/pull/610 [thread: 1 reply]
    └ [15:20] vutq: done nha chị Vi Tran
  [15:00] thinht: có bug nào cần a fix k Vi Tran
  [15:02] vitht: A test vòng vòng trên fountain live giúp e đi a
  [15:02] vitht: mấy card cũ a làm mà đưa lên live rồi đó
  [15:05] vitht: giao diện thank you trên BETA không có menu nè Dat Nguyen
  [15:05] vitht: Screenshot 2026-10-02 at 3.05.01 pm.png
  [15:06] vitht: trên fountain hiện sai rồi
  [15:06] vitht: * trên fountain production hiện sai rồi
  [15:06] datnt: dạ oki chị, để em đợi card kia chị lên LIVE em kéo về fix
  [15:10] thinht: có ticket nào cần làm k Trinh Mai nếu k a phụ Vi test trên Live
  [15:11] trinhmtt: anh phụ chỉ i nha
  [15:31] hungpn: trước cía products list nó có mấy cái section cuối list k nhỉ? [thread: 5 replies]
    └ [15:31] datnt: cái này có nha anh
    └ [15:33] hungpn: anh đang kiếm design
    └ [15:34] datnt: https://www.figma.com/design/ycshVpcLgTBPb0aXnlo5MP/Fountain?node-id=30217-78097&m=dev
    └ [15:34] datnt: đây á anh
    └ [15:52] hungpn: tks em
  [15:31] hungpn: image.png
  [15:32] datnt: * đợt em vô dự em thấy có á
  [16:20] trinhmtt: task log day du giup em nha mn oi @room
  [17:10] hungpn: * smartlink mà chọn GOC  nó k show ở góc phải lên nè em
