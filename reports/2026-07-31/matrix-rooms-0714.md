# Matrix — since 2026-07-27 00:00 +07:00

### Kunal - Fountain — 148 messages
  [09:19] datnt: Vu Tat anh check giúp em PR này nha #[2995](https://trello.com/c/qZeJtbPN/2995-actioncontrollerunknownformat-in-activead [thread: 3 replies]
    └ [09:20] datnt: này đợt anh kiu để anh chặn thêm bên Nginx á mà nó trôi quá rồi nay nó bị lại á anh
    └ [09:38] vitht: A Vũ off sáng rồi chiều ảnh dô review cho nha. E làm task khác nha
    └ [13:42] vutq: done nha Dat Nguyen
  [10:09] hungpn: cho anh hỏi có ai biết ổng đang để cái text màu xanh này là mã gì hok nhỉ? [thread: 2 replies]
    └ [10:09] thinht: tại vì ổng iu màu xanh
    └ [10:10] hungpn: tại trên beta cũng k thấy cái text đó xuất hiện
  [10:09] hungpn: image.png
  [10:10] vitht: https://www.figma.com/design/ycshVpcLgTBPb0aXnlo5MP/Fountain?node-id=41531-120911&m=dev
  [10:10] vitht: dô card này có nè a
  [10:11] vitht: https://trello.com/c/xIukJjhO/2955-infinity-account-and-auth
  [10:11] hungpn: ý anh hỏi là ý nghĩa của cái text đó? ví dụ như mã vẫn đơn hay gì đó chẳng hạn
  [10:11] vitht: nó là tracking_number á
  [10:12] hungpn: mới thêm vào đúng k nhỉ?
  [10:12] vitht: xưa e hỏi thì Vũ bảo là khi mà đơn vị vận chuyển đc tạo
  [10:12] vitht: thì cái mã đó mới xuất hiện
  [10:12] vitht: nó là mã của đơn vị vận chuyển trên shipstation
  [10:13] hungpn: vậy là fai lên shipstation tạo thì mã đó mới xuất hiện trên trang order của minh [thread: 2 replies]
    └ [13:45] vutq: Hung Pham cái này anh phải vô trong ShipStation -> chọn 1 order -> tạo shipping label cho order đó (
    └ [13:46] hungpn: cám ơn thông tin của em nhé, tý anh sang check lại nè, đợi fix hết bug rồi check lại 1 lượt
  [10:15] vitht: e nghĩ nó là cái mã này nè
  [10:15] vitht: Screenshot 2026-07-27 at 10.14.59 am.png
  [10:15] vitht: a xem thử coi đúng hông
  [10:15] hungpn: để anh kiếm lại user cũ có cái mã đó thử
  [10:21] hungpn: image.png
  [10:21] hungpn: sao k vào dc Vi Tran nhỉ?
  [10:25] vitht: e vô đc bth mà ta
  [10:25] vitht: Screenshot 2026-07-27 at 10.25.02 am.png
  [10:25] hungpn: anh vào toàn lỗi nhỉ
  [10:30] vitht: để e check thử
  [10:31] hungpn: vào trang user nhé
  [10:46] vitht: Nguyên nhân trang này đang bị load quá nhiều á a Hung Pham  ơi, để e refactor code cái đã rồi a chừng nào e báo fix xong
  [10:47] hungpn: vậy live có bị chung issue k ta
  [10:49] vitht: a dô thử coi có bị hông a
  [11:29] hungpn: live anh vao bt nè
  [11:39] hungpn: có bao giờ mình login account khách chưa á Vi Tran
  [11:40] vitht: production hay sao a
  [11:43] vitht: cái /admin/users fix rồi nhen a Hung Pham  oi
  [11:43] vitht: giờ a dô xem đc rồi
  [11:52] hungpn: an hvaof dc rồi
  [11:53] hungpn: anh đang tính để xem thử mấy cái order của cus có show đúng thông tin này k thôi
  [11:56] hungpn: https://trello.com/c/TEgLelYY/2913-infinity-custom-printed-gift-item -- card này tested DONE rồi nè Vi Tran Dat Nguyen
  [11:56] vitht: à cái đó chắc phải đợi Vũ access đc database production á
  [11:56] vitht: chứ mình k có đc login bằng acc khách
  [14:29] datnt: Vu Tat anh ơi em có dùng claude plan tạo checklist vulnerabilities cho BE như sau, anh check thử giúp em nha #[2823](htt [thread: 1 reply]
    └ [14:43] vutq: Dat Nguyen:  - C-1: bỏ hẳn luôn cái :registerable trong AdminUser cho đơn giản - C-2: có thể thử imp
  [14:30] datnt: * Vu Tat anh ơi em có claude plan tạo checklist vulnerabilities cho BE như sau, anh check thử giúp em nha #[2823](https:
  [14:30] datnt: * Vu Tat anh ơi em dùng claude plan tạo checklist vulnerabilities cho BE như sau, anh check thử giúp em nha #[2823](http
  [09:11] datnt: Vu Tat: anh ơi, em gửi anh checklist vulnerabilities của app nha  - FE Fountain: https://github.com/iamksheth/FountainNe [thread: 1 reply]
    └ [13:51] vutq: Dat Nguyen:  FE Fountain: làm C2, C3 FE Infinity: làm C1 xong thì có thể quay lại check C4 của FE Fo
  [10:27] vitht: thấy trong code accept gift có cái condition này là gì v ae biết hông  # temporary allows all giftdrop orders before Jan [thread: 2 replies]
    └ [10:28] datnt: em khong nha chị
    └ [10:36] thinht: j mà tận 2024 zữ zị
  [10:27] vitht: bên infinity roses BE á
  [10:27] vitht: trong hàm accept_giftdrop của order_items_controller
  [10:43] vutq: cái đó của em á chị, 2 năm trước có feature mới liên quan tới giftdrop, em thêm đoạn đó để hotfix mấy order cũ thôi giờ 
  [10:44] vitht: okiee
  [15:49] hungpn: https://trello.com/c/xIukJjhO/2955-infinity-account-and-auth -- này xong nha Thinh Tran [thread: 2 replies]
    └ [15:49] thinht: kéo card qua QA đi
    └ [15:54] hungpn: kéo đi nè m
  [15:54] hungpn: có task nào cần check hok á m.n
  [16:03] vitht: còn 2 card này á a ơi  https://trello.com/c/Us7NPEY8/2893-fountain-blog  https://trello.com/c/Zdd0nsTn/2962-infinity-blo [thread: 4 replies]
    └ [16:04] datnt: card blog bên fountain anh Phát test rồi á, còn đợi Thomas đưa thêm design thôi á
    └ [16:26] hungpn: cía đó Phat Le đang check nên để check nốt nè
    └ [16:32] vitht: Phat Le:  check lẹ đi nhanh lên
    └ [17:35] phatdlt: Vi Tran: E check hết r, cái fountain đợi ổ rep, cái infinity đợi fix bug thôi à
  [11:03] datnt: Vu Tat anh ơi check giúp em PR cho bug live này nha anh #[3006](https://trello.com/c/KfEWvGFb/3006-activerecordrecordnot
  [11:33] vitht: card này lên BETA rồi nha ae oơi  https://trello.com/c/tSuQHKwj/2978-infinity-giftdrop-recipient-flow  Phat Le  Hung Pha
  [11:35] vitht: Cho c card khác nhen Trinh Mai  ơi
  [11:41] trinhmtt: https://trello.com/c/bYEsZpLX/2943-fountain-infinity-upgrade-to-rails-8 này nha chị oi, cái này anh Vũ làm bên fountain 
  [11:50] datnt: https://trello.com/c/lqrtbYl8/3007-fountain-update-multi-order-form
  [11:50] datnt: em mới thấy Kunal nhắn nha anh chị
  [13:28] vitht: chị làm này trước nha
  [13:28] vitht: ông Kunal rep rồi
  [13:28] vitht: https://trello.com/c/g5SK007L/2813-fountain-infinity-add-subtle-scroll-animations
  [13:28] vitht: * chị làm này trước nha Trinh Mai
  [13:29] trinhmtt: ddạ okie chị
  [13:29] datnt: Vu Tat Trinh Mai cái này mình nên reply lại sao á anh chị  https://trello.com/c/ItHdgsNc/2823-fountain-infinity-patch-vu [thread: 1 reply]
    └ [13:54] vutq: done nha
  [13:33] thinht: cho a xin ticket nha Trinh Mai
  [13:34] trinhmtt: https://trello.com/c/lqrtbYl8/3007-fountain-update-multi-order-form card này nha anh
  [15:10] datnt: Vu Tat anh check giúp em PR này nha #[3003](https://trello.com/c/EFimgmrc/3003-standarderror-in-cartitemscreate): https: [thread: 15 replies]
    └ [16:37] vutq: chỗ này em tái tạo được issue không Dat Nguyen ... anh không nghĩ nó liên quan tới multiple submit
    └ [16:37] datnt: dạ được á anh
    └ [16:38] datnt: anh bật slow 3g lên dễ bấm 2 lần button hơn á anh
    └ [16:41] datnt: mà cái này nó chỉ bị cho thằng build a box thôi á anh
    └ [16:42] datnt: còn gift thường ở khúc cuối của flow add to cart em thử thì  nó không sao
    └ [16:43] vutq: à thấy rồi, không cần để slow 3G - bản fix của em lên BETA rồi đúng không, anh vẫn thấy issue y nguy
    └ [16:43] datnt: em chưa đưa lên beta á
    └ [16:44] vutq: nói chung là không cần thêm cả đống liên quan tới lock submit đâu
    └ [16:44] datnt: dạ oki anh
    └ [16:44] datnt: để em chỉnh lại
    └ [16:57] datnt: em chỉnh lại rồi nha anh Vu Tat
    └ [09:53] vutq: cái này em đưa lên BETA test chưa ấy Dat Nguyen
    └ [09:54] datnt: em đưa lên rồi á, mà em đang nhờ QC test á anh
    └ [09:55] datnt: em self test thì ổn rồi á
    └ [15:10] datnt: Vu Tat cái này trên beta QC test oki rồi nha anh ơi
  [15:14] hungpn: check dum anh cái này vs Vi Tran  image của card bị lỗi k hiển hình trước cũng gặp do thiếu gì á? em check thử
  [15:14] hungpn: image.png
  [15:18] vitht: A post bug nha a. Mai e fix giờ e đang làm card khác rồi
  [15:21] vutq: Thinh Tran https://www.fountaingifts.com/spreadsheets/multi_orders_spreadsheet.xlsx link work rồi nha anh, giờ anh gắn c [thread: 3 replies]
    └ [15:21] thinht: nãy chắc bị cache thôi pk e
    └ [15:22] vutq: nó vừa là cache vừa là nginx luôn nha anh
    └ [15:22] thinht: okie e.
  [15:23] thinht: * okie e. thanks boi
  [15:42] thinht: https://trello.com/c/lqrtbYl8/3007-fountain-update-multi-order-form test ticket này dc r nha Hung Pham [thread: 1 reply]
    └ [16:16] hungpn: kéo task báo cus nha Thinh Tran
  [15:51] hungpn: okie
  [17:19] vitht: có ai đang deploy staging fountain hẻn ae [thread: 3 replies]
    └ [17:20] thinht: hem
    └ [17:21] vitht: sao tự nhiên pull code về thấy một đống
    └ [17:21] datnt: Em lên beta fountain thoi, khong có staging nha chị
  [09:28] vitht: https://trello.com/c/yrbbFhf9/2735-fountain-pro-send-smart-link  ông Thomas bảo cái này e hiểu hông Trinh Mai  ơi, help 
  [09:30] vitht: ông Kunal có mess cho card này nha  https://trello.com/c/bYEsZpLX/2943-fountain-infinity-upgrade-to-rails-8
  [09:32] vitht: ổng nói khi ở trang checkout ổng bấm nút checkout thì nó bị blank page, QC check lại giúp mình xem có bị hông nha  https
  [09:32] vitht: * ổng nói khi ở trang checkout ổng bấm nút checkout thì nó bị blank page, QC check lại giúp mình xem có bị hông nha Hung
  [09:43] datnt: Hung Pham Phat Le card này em update lại feedback Thomas rồi nha 2 anh https://trello.com/c/1v99NCmM/2939-infinity-roses [thread: 9 replies]
    └ [13:57] hungpn: image.png
    └ [13:57] hungpn: này là set cố định hay sao á em
    └ [13:59] datnt: em set lộn rồi
    └ [13:59] datnt: cái đó gap-l á anh
    └ [14:00] datnt: ủa khoản
    └ [14:00] datnt: anh đợi em check lại nha
    └ [14:01] hungpn: okie check rồi hú anh
    └ [14:03] datnt: cái này do em resvole code conflict vô beta bị sai á anh, anh log em con bug sai chỗ này nha
    └ [14:39] hungpn: okie em
  [09:44] datnt: card này có update lại layout của product detail á, nên 2 anh check luôn item gift nào mà có cả custom print box với ite [thread: 1 reply]
    └ [09:46] datnt: image.png
  [09:45] trinhmtt: image.png
  [09:45] trinhmtt: update 2 cái hình này nè chị Vi Tran
  [10:00] datnt: Trinh Mai chị ơi, cái feedback này Thomas kiu update lại radius của cái card item á https://www.figma.com/design/ycshVpc [thread: 1 reply]
    └ [10:00] datnt: design thì để là rounded-s trên beta em cũng để rounded-s giống á, thì mình update ở đây là cái gì á
  [10:01] datnt: * design thì để là rounded-s trên beta em cũng để rounded-s giống á, thì mình update ở đây là cái gì á chị em đang khong
  [13:28] thinht: cho a xin ticket nha Trinh Mai
  [13:36] trinhmtt: fix bug rollbar nha anh oi
  [13:37] phatdlt: Trinh Mai: Cái log của fountain với infinity a test xong rồi, a đẩy đi luôn r nha, đợi ổng trả câu hỏi của mình rồi mình
  [14:00] datnt: * ủa khoan
  [14:59] datnt: Hung Pham card này em fix xong feedback lên beta rồi nha anh với cái gap nãy bên trang product detail em fix luôn rồi nh [thread: 1 reply]
    └ [15:21] hungpn: chỉ anh cách check dc cái này đi
  [16:09] trinhmtt: https://trello.com/c/B7uPm1Pq/2954-infinity-item-extras?filter=2954 card này chị làm hả chị Vi Tran
  [16:09] vitht: còn fix cái lỗi trang checkout bị blank page á
  [16:10] vitht: bữa fix một lần rồi mà nay bị lại
  [16:38] thinht: https://github.com/iamksheth/FountainGreetings/pull/462 Vu Tat e xem qua PR a hot fix lỗi trên rollbar, nó đang bị retry [thread: 1 reply]
    └ [16:45] vutq: em không nghĩ đây là cách fix đâu nha anh phải tìm ra lý do gift không có trong mail này
