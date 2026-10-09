# Matrix — since 2026-06-15 00:00 +07:00

### Kunal - Fountain — 362 messages
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
  [08:40] vitht: https://trello.com/c/MgBGamAN/2868-scheduled-order-chose-next-day-delivery-but-paid-8
  [08:41] vitht: vậy card này test lại bth đc rồi á a Hung Pham [thread: 4 replies]
    └ [13:36] hungpn: okie, để anh check
    └ [13:37] hungpn: Vi Tran: đã update bên infinity chưa em nhỉ?
    └ [13:55] vitht: bên infinity đang đúng á a
    └ [13:55] vitht: deploy lên BETA infinity lun rồi đó a
  [09:29] trinhmtt: https://trello.com/c/VWNJOeoB/2862-ga4-event-for-new-account chị check comment nay giúp em vói Vi Tran hình như anh Vu T
  [09:35] trinhmtt: https://trello.com/c/NX5yxK48/2697-upgrade-to-nextjs-version-16 Vu Tat Thinh Tran card này bacs nói đợi đến con claude b [thread: 1 reply]
    └ [09:36] thinht: mn nói sao a làm vậy :D
  [10:56] vitht: Review dùm cái pull request nyaf nha Vu Tat  ơi  https://github.com/iamksheth/FountainNewUI/pull/462/changes [thread: 1 reply]
    └ [11:07] vutq: để lại cái condition pathname như cũ nha chị Vi Tran - cần làm theo requirement trong ticket
  [10:56] vitht: cho cái card này  https://trello.com/c/VWNJOeoB/2862-ga4-event-for-new-account
  [10:56] vitht: * Review dùm cái pull request này nha Vu Tat  ơi https://github.com/iamksheth/FountainNewUI/pull/462/changes
  [11:58] vitht: chị mới update lại nha Vu Tat  ơi
  [11:58] vitht: 
  [11:58] vitht: * [fountain/hot\_fix/2862-ga4-event-for-new-account](https://github.com/iamksheth/FountainNewUI/pull/462/changes)
  [11:59] vitht: https://github.com/iamksheth/FountainNewUI/pull/462/changes [thread: 2 replies]
    └ [13:26] vutq: em cho lên LIVE rồi nha chị Vi Tran
    └ [13:28] vitht: okie để c kêu ổng test lại
  [11:59] phatdlt: Trinh Mai: Check giúp anh chổ này nha. Mình cần improve chổ này > Show the Smart Link URL + copy icon until it expires ( [thread: 6 replies]
    └ [13:38] trinhmtt: Phat Le: em thấy phía user thì có chỗ này để show nè anh
    └ [13:38] trinhmtt: https://www.figma.com/design/ycshVpcLgTBPb0aXnlo5MP/Fountain?node-id=37532-114189&m=dev
    └ [14:11] phatdlt: Trinh Mai: Vậy khi nào hiện cái expire này á e
    └ [14:14] trinhmtt: à em hiểu ý anh roi, phía user để em hỏi Thomas xem nha, phía admin thì mình tự thêm đc
    └ [14:16] phatdlt: ok nè
    └ [14:16] phatdlt: E hỏi dùm a đi, còn admin chắc nhờ c Vi update khỏi cần hỏi, nào hỏi thomas xong cho a hay với nghe
  [11:59] phatdlt: * Trinh Mai: Check giúp anh chổ này nha. Mình cần improve chổ này > Show the Smart Link URL + copy icon until it expires
  [11:59] phatdlt: * Trinh Mai: Check giúp anh chổ này nha. Mình cần improve chổ này > Show the Smart Link URL + copy icon until it expires
  [13:29] vitht: Card này test lại đc rồi nha a Hung Pham
  [13:29] vitht: https://trello.com/c/MgBGamAN/2868-scheduled-order-chose-next-day-delivery-but-paid-8
  [13:29] thinht: cho a ticket moiws nha Trinh Mai
  [13:30] trinhmtt: https://trello.com/c/OUrn7C1z/2918-gift-drop-order-cannot-swap-gift cái này anh fix song chưa á [thread: 2 replies]
    └ [13:32] thinht: bữa Vũ note lên Live tạm r e. hôm qua a cũng fix bản mới lên Live báo e hết r á.
    └ [13:33] trinhmtt: v kéo card đi giúp em đi ạ
  [13:41] trinhmtt: anh fix bug tiep nha amnh [thread: 4 replies]
    └ [13:42] thinht: redmine hay rollbar e
    └ [13:42] trinhmtt: Rollbar á anh
    └ [13:42] vitht: a phụ a Hùng test card đc không, nó nằm một ề bên kia á =))
    └ [13:42] thinht: okie e
  [14:26] vitht: cái bug ổng báo blank page trong cmt này fix lun rồi nha a Hung Pham , check lại giúp e để e báo ổng test lun ạ  https:/
  [14:40] trinhmtt: https://trello.com/c/BSrIHSmc/2869-fountain-order-flow-message-recipient-delivery-updates https://trello.com/c/lbWnX6N0/ [thread: 1 reply]
    └ [14:54] hungpn: đợi anh dò lại nhé
  [16:39] thinht: Hung Pham: có 1 lỗi liên quan tới ProjectName ở ProOrder có thể nhập 1 chuỗi space mà vẫn pass dc Step Pay Action. mới d [thread: 3 replies]
    └ [16:49] hungpn: go live nha Thinh Tran
    └ [16:51] thinht: thanh toán checkout order okie hết r pk Hung Pham
    └ [16:51] hungpn: yeah
  [16:53] thinht: Vu Tat: e xem qua PR này, a fix lỗi ở trên. Có cần j update không thì a udpate luôn để lên Live nha e https://github.com
  [16:53] vitht: https://trello.com/c/MgBGamAN/2868-scheduled-order-chose-next-day-delivery-but-paid-8 A ơi cái này ổn chưa a, bug này tr [thread: 2 replies]
    └ [16:54] hungpn: anh có hoir em đã update bên Infinity chưa thif fai ak Vi Tran
    └ [16:56] vitht: e có rep là update 2 chỗ lun dòi á
  [16:54] vitht: *  https://trello.com/c/MgBGamAN/2868-scheduled-order-chose-next-day-delivery-but-paid-8 A ơi Hung Pham cái này ổn chưa 
  [17:08] vitht: Vu Tat:  ơi cái này a Hùng test ok rồi có gì mai đưa lên live giúp c nha https://github.com/iamksheth/FountainNewUI/pull [thread: 2 replies]
    └ [09:15] vutq: em cho lên LIVE rồi nha chị Vi Tran
    └ [09:17] vitht: okie
  [17:08] vitht: cho cả fountain với infinity lun
  [17:08] vitht: https://github.com/iamksheth/FountainNewUI/pull/458/changes
  [17:09] vitht: Ở bên fountain thì cái này có fix lun cái chỗ chọn select delivery date mà nó không có thay đổi giá ship lun nha
  [09:03] vitht: Vu Tat:  ơi review với deploy live giúp c với, ông Mike ổng hối rồi
  [09:07] hungpn: list này tested DONE nha Trinh Mai
  [09:08] trinhmtt: dạ v anh kéo card giúp em nha
  [09:16] thinht: khi nào rãnh cho a ké issue này luôn nha Vu Tat [thread: 4 replies]
    └ [09:20] vutq: done nha anh Thinh Tran
    └ [09:20] thinht: thanks e.
    └ [09:20] thinht: có j test lại case này trên Live xem còn bị k nhan Hung Pham
    └ [09:21] hungpn: okei để check cái nè
  [11:35] vitht: bữa giờ có ai deploy staging BE hông, thấy có một vài chỗ trên staging bị mất code á
  [11:36] vitht: cái bảng này mất ProOrderItemSmartLinkTemplate attribute card_type với expired_at
  [11:36] vitht: rồi một số code bị mất nữa
  [11:36] vitht: Thinh Tran: Vu Tat
  [11:36] vitht: * bữa giờ có ai deploy fountain staging BE hông, thấy có một vài chỗ trên staging bị mất code á
  [11:37] thinht: bữa giờ là lâu chưa em. chớ có loy liên tục đó
  [11:37] vitht: tuần trước thấy còn á a
  [11:38] vitht: Tuần này e làm cái card 2735 xong lên cái mất tiêu lun. Cái schema.rb cũng mất mất attrbute đó nữa
  [11:38] vutq: em ngưng deploy bên STAGING/BETA 1 thời gian rồi nha
  [11:39] thinht: a có loy nhưng k liên quan tới mấy database lắm. chỉ là code config rollbar thôi
  [11:39] thinht: có check dc xem là mất từ đoạn nào k vậy e.
  [11:41] vutq: em vừa pull code mới nhất bên staging thấy vẫn có 2 field này nha chị Vi Tran
  [11:45] vitht: chị mới thêm dô đó =))
  [11:47] vutq: không, ý em là đâu có commit nào xóa tụi nó đâu 👀
  [11:48] vitht: ok mốt ae có thấy conflict cái schema thì nhớ đừng remove cái atrribute đó nha
  [11:49] vitht: Để lát c check lại commit lần nữa
  [11:55] thinht: Screen Shot 2026-06-17 at 11.54.44.png
  [11:55] thinht: a cũng thấy hình như nó chưa bị xoá á Vi Tran
  [11:59] vitht: mà sao hôm qua lúc e deploy cái admin lên, nó bị lỗi do không có field expired at nên e ms thêm dô hôm qua á
  [12:00] vitht: khó hiểu thiệt
  [12:00] vitht: nay e check bên staging nó cũng bị thiếu cái hàm trong model nữa
  [12:17] vitht: Tìm ra nguyên nhân gòi mn ơi, bị thiếu cái commit 28d28b9870894644d239fee01df70cdff2dc17be của branch 2735
  [13:22] thinht: có j cần làm gấp k Trinh Mai . nếu không a vẫn check issue rollbar tiếp pk?
  [13:26] trinhmtt: dạ đúng anh
  [16:05] hungpn: ổng có update ở task này https://trello.com/c/9qY6OlON/2871-infinity-build-a-box
  [16:07] hungpn: vs cái này có 1 cái ổng yêu cầu có update nhỏ nè: https://trello.com/c/MS5UzAPy/2872-infinity-browse
  [16:20] thinht: https://github.com/iamksheth/FountainGreetings/pull/436 Vu Tat a có upgrade sitemap_generator lên 7.0.1 , a có deploy nó
  [16:35] trinhmtt: https://trello.com/c/MS5UzAPy/2872-infinity-browse Vu Tat live con nay giup em nha, Dat Nguyen cho anh Vu Tat info nhe
  [16:36] trinhmtt: https://trello.com/c/9qY6OlON/2871-infinity-build-a-box Thinh Tran check comment cua Thomas nha anh oi
  [16:38] hungpn: live xong thì fix cái bug ông báo luôn nha Dat Nguyen
  [16:38] datnt: Hung Pham em không có giờ bên này á anh
  [16:39] hungpn: vậy để cho @thinh
  [16:39] hungpn: * vậy để cho Thinh Tran vậy
  [16:54] datnt: Thinh Tran, Vi Tran ơi 2 anh chị giúp em cái PR này với em không có time bên này mà nó có conflict á
  [16:55] datnt: https://github.com/iamksheth/FountainNewUI/pull/414
  [16:55] vitht: okie để c handle cho
  [16:55] datnt: Vu Tat em gửi anh trước commit của BE cho cái này nha anh https://github.com/iamksheth/FountainGreetings/pull/419
  [16:55] vitht: * okie để c handle cho Dat Nguyen
  [16:56] datnt: vậy chị Vi Tran giúp em nha xong chị đưa lại cho anh Vũ chung cái card này 2872 nha
  [17:17] vitht: cái này lấy cái nào v Dat Nguyen
  [17:17] vitht: Screenshot 2026-06-17 at 5.17.02 pm.png [thread: 12 replies]
    └ [17:19] datnt: cái này chắc chị lấy cái trên đi á
    └ [17:19] datnt: em thấy Live đang xàig cái trên
    └ [17:19] datnt: chứ task em không có update fỏoter mà lúc em làm task em không biết em đi chỉnh footer á
    └ [17:20] datnt: ủa bên beta cũng lấy cái dưới
    └ [17:20] datnt: vậy chắc lấy cái incoming đi chị
    └ [17:20] vitht: chắc nha
    └ [17:20] vitht: =))
    └ [17:20] vitht: cái này trên live á
    └ [17:21] datnt: em nhớ mang máng đợt em có bug live về mấy cái footer này
    └ [17:21] datnt: mà em có fix lên rồi không biết có dính gì cái này không
    └ [17:23] vitht: vậy c để như cũ có gì change sau nha
    └ [17:23] datnt: dạ oki chị
  [17:18] vitht: cái này nữa lấy gap-l hay gap-[40px]
  [17:18] vitht: Screenshot 2026-06-17 at 5.17.57 pm.png [thread: 5 replies]
    └ [17:20] datnt: cái này để em mở figma lên check chứ em không nhớ nổi
    └ [17:24] datnt: này file nào á chị
    └ [17:24] datnt: Vi Tran chị ơi
    └ [17:26] vitht: vậy để 40px đi có gì fix sau
    └ [17:26] datnt: lấy cái trên đi á chị
  [17:32] vitht: https://github.com/iamksheth/FountainNewUI/pull/414  pull request này nha Vu Tat , đã handle conflict
  [08:35] trinhmtt: https://trello.com/c/TAopocTs/2854-infinity-cart-checkout-order-received-update https://trello.com/c/HnTvtbk8/2915-fount [thread: 2 replies]
    └ [09:01] phatdlt: Trinh Mai: con 2854 và 2836 cái update mới nhất a chưa test
    └ [09:15] trinhmtt: v anh uu tien test cho song nha anh
  [08:35] trinhmtt: * https://trello.com/c/TAopocTs/2854-infinity-cart-checkout-order-received-update https://trello.com/c/HnTvtbk8/2915-fou
  [08:40] trinhmtt: https://trello.com/c/BSrIHSmc#comment-6a327c185b7e76e2539510cc
  [08:41] trinhmtt: * https://trello.com/c/BSrIHSmc#comment-6a327c185b7e76e2539510cc Vi Tran check comment này nha chị
  [08:42] trinhmtt: Song thi qua cái này luon nha chị Vi Tran  https://trello.com/c/a8jDXbuB#comment-6a3283240fdd4e86c8c63b81
  [08:43] trinhmtt: https://trello.com/c/lbWnX6N0/2870-infinity-order-flow-updates nó cũng bị bên infinity nữa, nên chị update cho 2 cái luo
  [08:50] vitht: gì dị =)) ms sáng sớm lun á Trinh Mai
  [09:04] vutq: đã merge vào infinity_master, checkout qua chạy bản build thử nha chị Vi Tran
  [09:13] vitht: fix lỗi khi npm run build rồi nha Vu Tat  ơi
  [09:21] vutq: https://trello.com/c/MS5UzAPy/2872-infinity-browse lên LIVE rồi nha Trinh Mai
  [09:22] vutq: đồng thời cần chị Vi Tran qua infinity_master fix gấp nha: hiện chọn 1 category thì trên URL dư searchParams category=..
  [09:25] vitht: okie
  [10:02] hungpn: anh có 1 cái bug cần fix sớm nh Trinh Mai https://redmine.nustechnology.com/issues/79322
  [10:05] trinhmtt: Thinh Tran: chieu coi con nay giup em nha anh
  [10:11] vitht: https://github.com/iamksheth/FountainNewUI/pull/465  Review với deploy live dùm c cái bug bỏ params category trên url nh [thread: 1 reply]
    └ [10:17] vutq: done nha chị
  [10:25] phatdlt: https://trello.com/c/TAopocTs/2854-infinity-cart-checkout-order-received-update Trinh Mai con này a xong r nha, e kêu de
  [10:37] trinhmtt: https://trello.com/c/TAopocTs/2854-infinity-cart-checkout-order-received-update
  [10:37] trinhmtt: * https://trello.com/c/TAopocTs/2854-infinity-cart-checkout-order-received-update  Vi Tran đưa info cho anh Vu Tat live 
  [11:04] phatdlt: Trinh Mai con 2836 phần update này ai làm v em
  [11:04] vitht: https://github.com/iamksheth/FountainNewUI/pull/466/changes  Nguyên nhân của issue này là fetchCartItems đang bị cache t [thread: 7 replies]
    └ [11:08] vutq: em không thấy trong PR sử dụng https://nextjs.org/docs/14/app/api-reference/next-config-js/increment
    └ [11:09] vitht: à cái này c làm cho fountain xong apply qua bên infinity lun á
    └ [11:10] vitht: chứ không có làm riêng cho infinity thôi
    └ [11:10] vitht: muốn dùng cái revalidate tag thì phải đổi lại
    └ [11:11] vitht: tại thấy bên fountain cũng bị cái này
    └ [11:12] vutq: vậy thì cần chỉnh cho cả 2 bên luôn, chị cứ fix issue thử với revalidateTag đã, không được thì mình 
    └ [11:13] vitht: okie
  [11:04] vitht: * https://github.com/iamksheth/FountainNewUI/pull/466/changes  Vu Tat  info cái đưa lên live 2854 nha Nguyên nhân của is
  [11:07] trinhmtt: Dat Nguyen: á nha anh
  [12:14] vitht: chị mới update lại á. E coi qua thử.  https://github.com/iamksheth/FountainNewUI/pull/466/changes  dùng hàm fetchCartIte [thread: 2 replies]
    └ [13:36] vutq: thêm cái check hasActiveCartAction vô lúc user xài nút ApplePay hoặc PayPal luôn nha chị Vi Tran, xo
    └ [13:36] vitht: okie
  [12:15] vitht: * chị mới update lại á. E coi qua thử Vu Tat  https://github.com/iamksheth/FountainNewUI/pull/466/changes  dùng hàm fetc
  [13:41] vitht: có ai nhớ cái design của cái menu plaform nằm trong card nào hem. Hiện tại ổng design bảo cái màu menu đang bị sai
  [13:42] vitht: Screenshot 2026-06-18 at 1.42.17 pm.png
  [13:43] vitht: Aloo
  [13:43] vitht: Aloooo
  [13:44] vitht: thấy dòi nha
  [14:06] phatdlt: https://trello.com/c/WGsYqu5h/2836-fountain-business-homepage-updates Trinh Mai Ticket này ổ kêu đổi màu chổ menu, mà gi
  [14:18] trinhmtt: https://trello.com/c/Tq5nQQQr/2775-fountain-navigation-refactor Phat Le phải card này hong anh
  [14:22] phatdlt: https://trello.com/c/WGsYqu5h/2836-fountain-business-homepage-updates Trinh Mai V card này xong luôn r nha e
  [14:43] vitht: c mới update lại cái này nha Vu Tat  ơi  https://github.com/iamksheth/FountainNewUI/pull/466/changes [thread: 2 replies]
    └ [15:11] vutq: lên LIVE rồi nha chị Vi Tran
    └ [15:12] vitht: ukie để c làm cho fountain lunn
  [14:43] vitht: * c mới update lại cái này nha Vu Tat  ơi https://github.com/iamksheth/FountainNewUI/pull/466/changes Cho cái dụ blank p
  [14:43] vitht: * c mới update lại cái này nha Vu Tat  ơi https://github.com/iamksheth/FountainNewUI/pull/466/changes Cho cái dụ blank p
  [15:03] hungpn: mấy cái update list task bên Not pass đã update hết chưa m.n
  [15:05] thinht: cho a hỏi ai làm ticket 2872 ấy nhĩ
  [15:07] thinht: * cho a hỏi ai làm ticket 2872 ấy nhĩ Trinh Mai
  [15:08] vitht: e á a
  [15:08] vitht: e đang kéo về doing để làm
  [15:08] vitht: cái nào mà chưa ghi Done là chưa làm á a
  [15:09] vitht: 2872 là xưa Đạt làm giờ e fix bug nha.
  [15:09] vitht: Chứ e k có làm hết
  [15:11] vitht: e làm cái đống này sáng Trinh kêu á nha
  [15:11] vitht: Screenshot 2026-06-18 at 3.11.36 pm.png
  [16:06] hungpn: anh có việc về sớm nên cần gì hú anh tý anh check nehs
  [16:46] thinht: https://trello.com/c/9qY6OlON/2871-infinity-build-a-box update feedbacks lên Staging r nhan Hung Pham
  [08:42] thinht: https://redmine.nustechnology.com/issues/79344 lên staging r nhan Hung Pham
