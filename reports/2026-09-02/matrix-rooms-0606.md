# Matrix — since 2026-08-25 00:00 +07:00

### Kunal - Fountain — 209 messages
  [09:40] hungpn: https://trello.com/c/8xhoOD0z/3039-fountain-navigation-update-services-dropdown -- chưa báo cus hả Dat Nguyen [thread: 1 reply]
    └ [09:41] datnt: chị Trinh có nhắn hỏi Thomas trong figma rồi á anh
  [15:40] thinht: Trinh Mai: ticket đây tạm thời xong rồi nha e. vì cus chưa cung cấp tk OpenAI nên chưa test sâu những tính năng search c
  [15:40] thinht: e cho a xin ticket khác để làm nha
  [15:44] trinhmtt: là loy len staging roi dung k anh
  [15:45] thinht: uhm e. test cơ bản vs những req liên quan được rồi.
  [15:45] trinhmtt: anh xử bug roll bar tạm nha
  [10:50] hungpn: https://trello.com/c/gnw4qAwO/3023-infinity-update-preview-giftdrop-button-with-new-recipient-flow
  [10:50] hungpn: tasksn ày là sao á Trinh Mai ơi, anh h thấy viết gì hết
  [10:50] hungpn: * tasksn ày là sao á Trinh Mai ơi, anh k thấy viết gì hết
  [10:50] vitht: task đó
  [10:51] vitht: Phát đang test rồi mà
  [10:51] hungpn: nó chưa done à
  [10:51] vitht: cái dó là cái preview gift link ở trang recipient. e xong rồi đợi P test đó a
  [10:59] trinhmtt: task đó task con của 2 task bự nên em để v track thui
  [11:17] hungpn: anh xin link task bự nào
  [11:17] vitht: 2978 á a
  [11:24] datnt: Cái này em cũng updated lên BETA Infinity roi nha anh Hung Pham  https://trello.com/c/oHJ5YO8y/2380-finding-solution-to-
  [11:34] trinhmtt: trong trello có gắn parent card á nah
  [11:34] trinhmtt: * trong trello có gắn parent card á anh
  [11:58] phatdlt: Thinh Tran: https://trello.com/c/oHJ5YO8y/2380-finding-solution-to-customers-receiving-incorrect-delivery-dates-in-the-d [thread: 13 replies]
    └ [11:59] datnt: con này giờ thành 13h30 rồi nha anh
    └ [11:59] phatdlt: ok nè
    └ [11:59] hungpn: nhưng 2380 nó xong rồi mà nhỉ?
    └ [12:00] datnt: bên Infinity a QC done luon rồi hả anh Hung Pham
    └ [12:00] phatdlt: a test xong r á hả
    └ [12:00] hungpn: hình như đang update bên Infinity
    └ [12:00] hungpn: check bên Infinity á Phát
    └ [12:00] datnt: bên fountain thì lên Live luôn rồi, còn bên Infinity thì em fix xong dụ thứ 6 hổm anh test rồi á
    └ [12:01] phatdlt: v giờ là e check bên infinity thôi đúng k á mng
    └ [12:01] hungpn: uhm, check trong hôm nay cho xong nha
    └ [12:02] phatdlt: modal hiển thị thông báo sau 1h30 ròi có đổi option nào của user k a, hay hiển thị thông báo thôi a
    └ [12:36] hungpn: Đổi ngày ship nha
    └ [12:36] hungpn: Update lại ngày ship ak
  [13:40] vitht: sáng giờ có ai deploy gì bên infinity roses không dị ae [thread: 1 reply]
    └ [13:40] datnt: em khong nha
  [13:40] vitht: sao checkout nó bị lỗi này
  [13:40] vitht: Screenshot 2026-08-26 at 1.40.44 pm.png [thread: 9 replies]
    └ [13:59] thinht: báo CA liền e
    └ [14:09] vitht: Hung Pham:  Phat Le  xin hai vị vào test thử
    └ [14:09] vitht: production của infinity roses
    └ [16:00] hungpn: image.png
    └ [16:02] hungpn: anh thử case <0.5$ thì lỗi k checkout được, nhưng cái button nó cứ xoay mãi Vi Tran còn checkout > 1
    └ [16:05] hungpn: thử y chang em cũng hok lỗi nè
    └ [16:15] vitht: a Hùng tạo bug redmine cho e check thử nha
    └ [16:16] hungpn: check cái vụ loading mãi đó hả em
    └ [16:21] hungpn: https://redmine.nustechnology.com/issues/80618 -- Vi Tran
  [14:34] datnt: à anh Thinh Tran ơi, sáng card anh làm thì phải Kunal reply á mà em bấm vô coi rồi nên chắc bên anh mất thông báo, có gì [thread: 15 replies]
    └ [14:38] thinht: Vu Tat: theo em nên trả lời sao. hiện tại tính năng này nếu dùng free thì sẽ không đủ để có thể sear
    └ [15:01] vutq: em đã reply Kunal rồi, nhưng mà hiện tại anh Thinh Tran đang setup ra sao ấy - feature này chỉ xài m
    └ [15:02] thinht: không đủ e, a xài acc free của a. chỉ test dc vài case cơ bản.
    └ [15:03] vutq: vậy khả năng cao là setup sai
    └ [15:04] vutq: anh quăng PR em coi thử
    └ [15:04] thinht: https://github.com/iamksheth/FountainGreetings/pull/474 e xem qua thử ntn. a lần đầu setup k rõ lắm
    └ [15:38] vutq: Thinh Tran code thì em thấy không sao, vậy thì issue anh báo không phải là về token, mà là request-p
    └ [15:40] thinht: Daily/request quota a nghĩ là cái này. AI nó báo là a k đủ quota nên k test kĩ hoặc test nhiều lần đ
    └ [15:41] thinht: "nhưng nghĩa là các query ngữ nghĩa thuần túy như thế này sẽ không hoạt động cho tới khi có OpenAI k
    └ [15:56] thinht: "Test 'new employee gift' — vẫn 429 insufficient_quota, key vẫn chưa có credit" Chắc là k đủ quota p
    └ [15:57] vutq: trước khi Kunal đưa account thì giờ mình cần optimize cái search trước, anh Thịnh lên FE check thử m
    └ [15:58] thinht: 2 kí tự thì okie e. chỉ bị với text dài hay text liên quan ngữ nghĩa
    └ [16:00] thinht: Screenshot from 2026-08-26 16-00-17.png
    └ [16:01] thinht: > rồi mai quota reset anh test lại thử coi đỡ hơn chưa  này a cũng thử rồi. mới toanh thì tk của a c
    └ [16:02] thinht: hoặc h có tk free nào khác cập nhật key trên env staging có vẻ lẹ hơn
  [15:05] thinht: * https://github.com/iamksheth/FountainGreetings/pull/474 https://github.com/iamksheth/FountainNewUI/pull/517 e xem qua 
  [15:49] trinhmtt: FYI, Hi @room bên infinity mình sẽ follow spec infinity trong figma nha mn. Khong có xài chung fountain nữa. Đã confirm 
  [15:49] trinhmtt: * FYI, Hi @room bên infinity mình sẽ follow spec infinity trong figma nha mn. Khong có xài chung fountain nữa. Đã confir
  [15:50] trinhmtt: Em update plan tuần này ạ  ViTHT: 40h ThinhT: 20h/
  [15:50] trinhmtt: * Em update plan tuần này ạ  ViTHT: 40h ThinhT: 20h DatNT: 36h Vu Tat 4h  => QC 25h
  [15:53] trinhmtt: https://trello.com/c/BAI99Jrx/2895-fountain-product-page-bottle-engraving#comment-6a8ea8c6928887356875dad5
  [15:53] trinhmtt: * https://trello.com/c/BAI99Jrx/2895-fountain-product-page-bottle-engraving#comment-6a8ea8c6928887356875dad5 Vi Tran car
  [15:58] vutq: * trước khi Kunal đưa account thì giờ mình cần optimize cái search trước, anh Thịnh lên FE check thử mấy search bar đã c
  [16:07] trinhmtt: https://trello.com/c/TEgLelYY/2913-infinity-custom-printed-gift-item chị Vi Tran, card này chị làm đúng hong ưu tiên upd
  [16:12] vitht: c bận card 2978, 3038, 2895 rồi chia bớt cho dev khác đi e
  [16:12] vitht: * c bận card 2978, 3038, 2895 rồi chia bớt cho dev khác đi e Trinh Mai
  [16:16] trinhmtt: dạ okie chị
  [16:16] thinht: để a cho
  [16:17] trinhmtt: song hú chị Vi anh Vũ live nha anh oi
  [16:57] thinht: Test lại trên Infinity BETA nhan Hung Pham [thread: 5 replies]
    └ [16:59] hungpn: tý check cho nha
    └ [16:59] thinht: lẹ live uôn
    └ [16:59] thinht: 🤣
    └ [16:59] hungpn: đc k vâh
    └ [17:34] hungpn: tested DONE nha
  [17:02] thinht: ah chắc k kịp live con này hôm nay nha Trinh Mai  a thấy codes có coonflict với Live rồi
  [17:03] thinht: * ah chắc k kịp live con này hôm nay nha Trinh Mai a thấy codes có coonflict với Live rồi. Cả Backend vs Frontend luôn
  [17:05] trinhmtt: da v mai check ạ
  [09:44] vitht: ổng có rep card này nha ae  https://trello.com/c/37XQvT4c/3035-implement-smart-hybrid-product-search
  [11:24] trinhmtt: https://trello.com/c/BAI99Jrx#comment-6a8ea8c6928887356875dad5 Thinh Tran chiều check cmt này giúp em nha anh [thread: 3 replies]
    └ [14:23] thinht: Trinh Mai: trong feedback thằng Thomas muốn bỏ dòng phí trong order summary vs cập nhật lại tổng tiề
    └ [14:25] trinhmtt: Theo Tom nha anh
    └ [14:25] thinht: okie e
  [11:51] vitht: Ở card 2735 ổng bảo có lúc bị như thế này  https://trello.com/c/yrbbFhf9/2735-fountain-pro-send-smart-link?filter=2735 e
  [11:51] vitht: Screenshot 2026-08-27 at 11.49.45 am.png
  [13:22] vutq: https://trello.com/c/37XQvT4c/3035-implement-smart-hybrid-product-search chuyền sang model gemini-embedding-2 của Google
  [14:05] thinht: https://trello.com/c/TEgLelYY/2913-infinity-custom-printed-gift-item https://github.com/iamksheth/FountainNewUI/pull/447 [thread: 20 replies]
    └ [14:08] vitht: Dạ đợi e tí
    └ [14:10] vitht: Dạ đúng rồi á a ơii
    └ [15:10] vutq: image.png
    └ [15:10] vutq: bên BE chỗ này cần 1 tên method hợp lý hơn với Ruby
    └ [15:11] thinht: là đứa nào Vi Tran Dat Nguyen 🤣 cho phép sửa sai đó
    └ [15:11] vutq: bên FE dẫn tính tùm lum issue với syntax code, đã có CLAUDE.md rồi, mn yêu cầu AI nó đọc để implemen
    └ [15:11] vitht: không phải e =))
    └ [15:12] datnt: dị là em :))
    └ [15:12] vitht: đã is còn have nữa
    └ [15:12] vitht: =))
    └ [15:12] datnt: anh Thinh Tran anh sửa giúp em nha, em đang dính task rồi á
    └ [15:12] thinht: refactor code feedback của Vũ nha Dat Nguyen
    └ [15:13] thinht: a làm AI search rồi. sửa FB đi để rút kn
    └ [16:29] datnt: Vu Tat em mới update lại 2 bên á anh, anh review giúp em còn chỗ nào em chưa ổn để em update lại nha
    └ [16:49] vutq: - `type CustomPrintDesign = {` dùng đúng naming như các model type khác - components/Cart/CartItem.t
    └ [08:34] datnt: Vu Tat anh ơi update lại Feedback 1, 2, 4  rồi nha anh > anh chưa hiểu lý do đổi sang dùng window.hi
    └ [08:44] vutq: à không, cái router.replace đã không navigate đi đâu rồi mà nhỉ 🤔
    └ [08:47] datnt: hmmm nhưng mà nó đổi state đi á anh
    └ [08:47] vutq: vậy skip nha, anh thấy trong doc rồi
    └ [08:56] vutq: Trinh Mai Dat Nguyen  https://trello.com/c/TEgLelYY/2913-infinity-custom-printed-gift-item lên LIVE 
  [14:10] thinht: goy goy beta fountain cards bị j goy [thread: 4 replies]
    └ [14:11] datnt: em đang deploy task em lên á anh
    └ [14:11] thinht: ah. hú hồn
    └ [14:11] datnt: em done ròi á anh
    └ [14:11] datnt: anh check lại nha
  [14:12] datnt: Hung Pham Phat Le card này em loy lên BETA Fountain rồi á, 2 anh QC giúp em nha https://trello.com/c/LKmpS4h4/3045-fount [thread: 9 replies]
    └ [14:44] hungpn: https://redmine.nustechnology.com/issues/80677 -- fix nhanh nè em
    └ [14:56] hungpn: Dat Nguyen:
    └ [16:14] thinht: e update chưa để a update release card luôn Dat Nguyen
    └ [16:18] trinhmtt: nah update đi, Đạt off rui í
    └ [16:19] datnt: Vậy anh update đi anh đi anh, chiều nay em off rồi anh
    └ [16:19] thinht: okie e
    └ [16:43] thinht: r nhan Hung Pham test đi
    └ [16:47] hungpn: okei rồi nha
    └ [16:47] hungpn: Vu Tat: Vi Tran báo task này dùm anh cái
  [15:08] thinht: https://trello.com/c/BAI99Jrx/2895-fountain-product-page-bottle-engraving Hung Pham test feedback con này nhan [thread: 4 replies]
    └ [12:01] hungpn: image.png
    └ [12:02] hungpn: hỏi oognr thử cos cần ẩn ở trang thank you k Thinh Tran Trinh Mai
    └ [15:02] thinht: chắc khi nào iu cầu thêm fix sau
    └ [15:02] thinht: h iu cầu nhiu làm bấy nhiu
  [15:12] vutq: * bên FE vẫn dính tùm lum issue với syntax code, đã có CLAUDE.md rồi, mn yêu cầu AI nó đọc để implement cho chuẩn giúp e
  [16:28] datnt: Hung Pham Phat Le card này 2 anh test lại 1 lần flow xem nó còn work đúng không nha, em mới update lại 1 mớ á https://tr
  [08:34] datnt: * Vu Tat anh ơi update lại Feedback 1, 2, 4  rồi nha anh > anh chưa hiểu lý do đổi sang dùng window.history Còn về cái n
  [08:37] duongdn: "  ▎ "Finding solution to customers receiving incorrect delivery dates in the delivery tab of checkout... Any update on 
  [08:37] duongdn: a thấy có msg này, mn handle chưa, đây là bug critical đấy [thread: 2 replies]
    └ [08:39] datnt: Cái này bên Fountain thì có rồi á anh, còn bên Inifinity thì em handle xong rồi nay em đưa anh Vũ lê
    └ [08:39] duongdn: OK
  [08:42] vutq: 
  [10:14] datnt: Vu Tat anh ơi anh check giúp em PR của card này nha https://trello.com/c/oHJ5YO8y/2380-finding-solution-to-customers-rec [thread: 3 replies]
    └ [15:00] vutq: cái này hình như làm tương tự bên Fountain thôi mà phải không á Dat Nguyen
    └ [15:20] datnt: Logic thì tương tự á anh
    └ [15:48] vutq: done nha
  [15:05] hungpn: https://trello.com/c/yrbbFhf9/2735-fountain-pro-send-smart-link?filter=2735 -- qua nói anh sơ tính năng này đi Vi Tran a
  [15:06] vitht: Dạ đợi chút
  [15:44] hungpn: xong chưa em
  [15:45] vitht: Dạ chưa a ơi, e đang bận task khác rồi.  A liên hệ bé Trinh nha a [thread: 4 replies]
    └ [15:58] hungpn: anh đọc chưa kỹ req phần này nhưng nãy nói nhanh qua Vũ thì thấy 1 bug rồi nè
    └ [15:58] hungpn: image.png
    └ [16:00] vitht: bug gì dợ a chữ s số nhiều đó hả
    └ [16:06] hungpn: nó hiển thị thông tin Recipients này em
  [15:58] hungpn: * anh đọc chưa kỹ req phần này nhưng nãy nói nhanh qua Vũ thì thấy 1 bug rồi nè Vi Tran
  [16:19] trinhmtt: * anh update đi, Đạt off rui í
  [16:25] hungpn: image.png
  [16:25] hungpn: tái tạo dc rồi nè Vi Tran
  [16:26] hungpn: case này là user order 1 products xong products đó k còn tồn tịa trong hệ thống nữa thì sẽ bị như vậy á
  [16:40] vitht: Dạ okie để e note lại
  [08:10] datnt: Hung Pham Phat Le cái này hiện tại em handle xong rồi á, có gì 2 anh QC giúp em nha https://trello.com/c/ce8n3niB/3040-f [thread: 22 replies]
    └ [10:22] hungpn: Dat Nguyen: cái này bên phía user sẽ hiển thị ở những màn hình nào á em nhỉ
    └ [10:23] datnt: cái này đầu tiên anh cần vô admin ở phần /user á
    └ [10:23] datnt: anh thêm add role anh thành fountain member trước
    └ [10:23] datnt: image.png
    └ [10:24] datnt: https://beta.fountaingifts.com/digital-proof-generator
    └ [10:24] datnt: sau đó anh vô URL này, Login với account là member thì mới vô được còn chưa login hay login mà không
    └ [10:26] hungpn: okie em
    └ [10:26] hungpn: anh thấy rồi
    └ [10:27] hungpn: mà cái UI sẽ build theo file html cus đưa đúng k
    └ [10:27] datnt: dạ đúng rồi theo template đó á anh, mà có thể anh QC anh xem cần cải thiện cái gì thì anh báo em để 
    └ [10:28] datnt: với hiện tại không có responsive nha anh
    └ [10:32] hungpn: ví dụ như 3 cục thông tin của Proof nằm trên mà em đưa xuống dưới là có confirm gì hả
    └ [10:32] hungpn: image.png
    └ [10:32] datnt: em tự đem xuống á anh
    └ [10:32] hungpn: úi, s thế nhỉ? trên đẹp mà
    └ [10:33] datnt: tại khúc đó em code em đang làm chung component cho nó work trước á
    └ [10:33] datnt: dị để em update mang lên lại nha anh
    └ [10:33] hungpn: okie em, để anh noted update lại
    └ [10:46] hungpn: matching nhất với file template ổng đưa nha
    └ [10:53] datnt: dạ oki anh
    └ [11:46] hungpn: cái này mình đang làm ở V1 thôi nhỉ
    └ [11:46] datnt: Dạ đúng rồi anh
  [08:13] duongdn: Trinh Mai:  gởi plan dư án đi em
  [08:14] trinhmtt: Em  gui plan tuần này ạ ViTHT: 24h DatNT: 24h ThỉnhT: 12h => QC 15h
  [08:17] duongdn: hình như sai sai ... em lấy ở đâu vậy
  [08:20] duongdn: ít nhất a biết ThinhT ko làm Kunal tuần này
  [08:27] trinhmtt: Sorry mn, em nhầm
  [08:27] trinhmtt: Em gui plan tuần này ạ ViTHT: 24h DatNT: 24h VuTQ: 12h => QC 15h
  [12:29] phatdlt: https://trello.com/c/gnw4qAwO/3023-infinity-update-preview-giftdrop-button-with-new-recipient-flow Vi Tran Thằng này e t
  [13:56] hungpn: Phat Le: bữa em check task 3026 đúng k? [thread: 4 replies]
    └ [13:56] hungpn: image.png
    └ [13:57] hungpn: k biết em post bug này chưa á? nếu chưa post dùm anh nhé
    └ [13:57] hungpn: trang chekout chưa cập nhật giá mới thì fai nè
    └ [13:58] phatdlt: Oce để tí e log cho a
  [16:01] hungpn: cái này ai fix chưa á nhỉ
  [16:01] hungpn: https://trello.com/c/8xhoOD0z/3039-fountain-navigation-update-services-dropdown [thread: 4 replies]
    └ [16:02] datnt: chưa anh ơi
    └ [16:02] datnt: giờ em mới qua fix á
    └ [16:57] datnt: Hung Pham em fix lại card này lên BETA rồi nha anh ơi
    └ [16:58] hungpn: okie em
  [16:04] datnt: có cái card này em deploy lên BETA rồi mà hiện tại còn đang thiếu ảnh, với lại có 3 button là em chưa biết bấm nó sẽ đi  [thread: 2 replies]
    └ [16:08] hungpn: anh ucngx hok thấy em hỏi ổng?
    └ [16:08] datnt: em đang confirm với BA á
  [16:04] datnt: * có cái card này em deploy lên BETA rồi mà hiện tại còn đang thiếu ảnh Kunal chưa cung cấp á, với lại có 3 button là em
  [16:21] trinhmtt: image.png
  [16:21] trinhmtt: Hung Pham: có bug UI này log giup em với ạ [thread: 1 reply]
    └ [16:38] hungpn: https://redmine.nustechnology.com/issues/80717 -- đã log nhé
