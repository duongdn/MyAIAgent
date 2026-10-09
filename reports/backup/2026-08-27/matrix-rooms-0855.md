# Matrix — since 2026-08-26 08:00 +07:00

### Kunal - Fountain — 79 messages
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
