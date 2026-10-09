# Matrix — since 2026-09-06 00:00 +07:00

### Kunal - Fountain — 118 messages
  [08:50] trinhmtt: em gửi plan tuần này ạ  ViTHT: 40h ThinhT: 20h DatNT: 40h
  [08:50] trinhmtt: * em gửi plan tuần này ạ  ViTHT: 40h ThinhT: 20h DatNT: 40h => QC: 25h
  [08:59] vitht: a Hung Pham  ơi card này cái a nói e dụ gift mà bị remove từ build a box á. A hỏi Trinh Mai  chưa, để e update lunn [thread: 13 replies]
    └ [09:10] hungpn: để Trinh Mai check rồi update cho em nhé
    └ [09:31] hungpn: image.png
    └ [09:31] hungpn: Trinh Mai: vs case Outofstock thì vẫn còn trong thông tin cart nhé
    └ [09:32] trinhmtt: anh checkout đc hong anh
    └ [09:32] hungpn: image.png
    └ [09:32] hungpn: mà kỳ nhỉ? k thấy tick vào option này ta
    └ [09:33] trinhmtt: phải tick nữa ấy anh
    └ [09:33] hungpn: ý là nó k tự động =))
    └ [09:34] hungpn: anh tick rồi cũng k bị ẩn đi hay như nào hết, để anh checkout xem dc k
    └ [09:35] hungpn: image.png
    └ [09:36] hungpn: đến cái thanh toán nó mới nị chặn á Trinh Mai
    └ [09:38] hungpn: còn case remove thì nó hiển thị vậy nè Trinh Mai Vi Tran
    └ [09:38] hungpn: image.png
  [08:59] vitht: https://trello.com/c/yrbbFhf9/2735-fountain-pro-send-smart-link
  [09:00] hungpn: tý anh mới nói nha
  [09:00] trinhmtt: nào được hú em nha
  [09:01] hungpn: hú hú
  [09:36] vitht: thấy trên production đang bị là lúc search ra 3 items nhưng nó lại hiện total là 146
  [09:36] vitht: Screenshot 2026-09-07 at 9.35.52 am.png [thread: 1 reply]
    └ [09:45] vutq: cái này là bộ đếm hoặc list searched products bị sai nha mn, không phải tính năng đâu :v
  [09:36] vitht: * thấy trên production fountain đang bị là lúc search ra 3 items nhưng nó lại hiện total là 146
  [09:39] hungpn: case này có thắc mắc 1 lần rồi nha, liên hệ Vu Tat để biết thêm chi tiết
  [09:43] hungpn: có những cái mình tưởng là bug nhưng ổng bảo đó là tính năng nên cận thận khi fix nha
  [09:45] vitht: chắc cái này cần bên BA tổng hợp lại cho dev, chứ dev tưởng bug rồi fix lun thì toang
  [11:30] vitht: sáng h mn push code có bị giống v  hông Dat Nguyen [thread: 1 reply]
    └ [11:32] datnt: à em vô lại được rồi á chị thử push lại thử chị Vi Tran
  [11:30] vitht: Screenshot 2026-09-07 at 11.29.41 am.png
  [11:30] datnt: git mới sập hay sao á chị
  [11:31] datnt: sáng giờ em push không sao mà em vừa mới vô github thì hết vô được rồi á
  [11:33] vitht: còn chị ngược lại vs e dô git đc mà push code bị time out
  [11:33] vitht: 😆
  [13:16] datnt: Hung Pham anh ơi anh QC card này giúp em nha em push lên STAGING Fountain rồi á https://trello.com/c/LKQbyfvy/3066-actio [thread: 4 replies]
    └ [13:17] hungpn: mô tả cái bug dùm anh chút
    └ [13:18] datnt: anh reproduce bug bằng cách anh edit 1 product catalog trong admin, anh thêm ảnh vô rồi có 1 số fiel
    └ [13:18] datnt: Trên Live thì nó sẽ 500 nếu mà anh không điền field require mà lại save chung với up ảnh lên á anh
    └ [13:24] hungpn: okie, tks em
  [13:20] datnt: * anh reproduce bug bằng cách anh edit 1 product catalog trong admin, có 1 số field require (title, price...) thì anh xó
  [13:23] thinht: https://trello.com/c/37XQvT4c test con này coi sao nhan Hung Pham [thread: 1 reply]
    └ [16:09] hungpn: qua nói t cía này xíu m ơi Thinh Tran
  [13:23] thinht: * https://trello.com/c/37XQvT4c test con này trên staging coi sao nhan Hung Pham
  [13:25] thinht: Trinh Mai: cho a xin task nha
  [13:34] trinhmtt: check rollbar nha anh
  [13:40] duongdn: Hi A thấy có 1 cái email KUnal cứ gởi tới anh duongdn@nustechnology.com title: Log credit payment Spam má, đẩy qua rick' [thread: 15 replies]
    └ [13:42] thinht: chắc để e check cho. chắc a muốn bỏ email a ra khỏi d/s ng nhận meo luôn pk?
    └ [13:42] duongdn: yes
    └ [13:42] thinht: okie a.
    └ [13:42] thinht: chắc trên Live pk a? hay cả 2 môi trường luôn
    └ [13:42] duongdn: nếu ko có rick@nus thì thêm vào
    └ [13:42] duongdn: live lẫn staging luôn
    └ [13:42] thinht: dà okie a.
    └ [13:44] vitht: thấy nay nó spam hơn 10 cái lun á a ơi
    └ [13:44] vitht: Screenshot 2026-09-07 at 1.44.03 pm.png
    └ [13:45] duongdn: ko phải cái này
    └ [13:45] duongdn: cái email khác
    └ [13:46] vutq: có cái env monitor_email đổi sang rick@nus là xong nha mn
    └ [13:46] thinht: okie e. vậy chắc nhờ e đổi trên Live. a sẽ tìm đổi trên staging nha Vũ
    └ [14:06] thinht: a có thêm env monitor_email: rick@nus ở staging và restart BE r nha Vu Tat  cc: a Duong Doan
    └ [14:14] duongdn: OK mn
  [14:13] thinht: hồi nãy ai test trên Live Gift-Of_choice có thông tin Kirk Nguyen với haokhicu1804@gmail.com ấy nhễ? Hung Pham
  [14:13] datnt: em đang fix bug đó á anh [thread: 2 replies]
    └ [14:14] thinht: liên quan lỗi zá 74$ pk?
    └ [14:14] datnt: đúng rồi anh
  [14:45] thinht: hình như có ai đang đang fake body params gửi request đến API mình thì phải
  [14:47] vitht: sao dị a Thịnh
  [14:48] vitht: có ai spam data fake hẻn ta [thread: 1 reply]
    └ [14:48] thinht: a k rõ nữa, k bik nó fake để test hay là bị cache params k nữa
  [15:02] datnt: Trinh Mai chị ơi cái GOC của personal á chị mình có cho duplicate item đó trong cart khong á chị
  [15:05] trinhmtt: cho luon em
  [15:29] datnt: Hung Pham có 2 card bug này em fix xong lên BETA ròi á anh, khi nào anh QC nó anh hú em xuống em nói qua con bug cho nha [thread: 2 replies]
    └ [15:48] thinht: mấy bug này mà lên Live thì nhớ vào rollbar đổi status resolve cho đỡ nhầm nha Dat Nguyen
    └ [15:48] datnt: dạ oki anh
  [16:27] thinht: Screenshot from 2026-09-07 16-27-20.png
  [16:27] thinht: Vu Tat: Hùng nó vọc xíu xiu là nhiu đây nha e. nhỏ nhỏ cuối hàng
  [16:37] datnt: Vu Tat anh check giúp em PR này nha sáng em có hỏi anh á thêm ignore vào robots.txt á anh #[3074](https://trello.com/c/O [thread: 4 replies]
    └ [16:48] vutq: cái robots.txt làm bên FE chứ không phải BE nha Dat Nguyen
    └ [16:48] datnt: dạ oki anh để em update lại 🥲
    └ [17:03] datnt: Vu Tat: PR cho FE đây nha anh https://github.com/iamksheth/FountainNewUI/pull/524
    └ [17:09] vutq: done nha
  [11:05] hungpn: hú hú
  [11:05] hungpn: Dat Nguyen:
  [11:05] datnt: dạ oki anh để em xuống
  [11:59] datnt: Vu Tat em gửi anh PR em gom lại rồi nha  - https://github.com/iamksheth/FountainGreetings/pull/480 Card liên quan nó là 
  [13:34] hungpn: image.png [thread: 11 replies]
    └ [14:35] datnt: Hung Pham cái này anh add goc rồi điền message trong step 2 của flow bình thường thôi đúng không anh
    └ [14:35] hungpn: đúng rồi
    └ [14:35] hungpn: add bt hok làm gì khác
    └ [14:35] datnt: anh còn giữ cái message khong á cho em xin với
    └ [14:36] datnt: bên em add vô ghi dài nó vẫn bth á
    └ [14:41] hungpn: I bite my lip and stroke over my breast. I can tell my nipples are hard, even though my bra. I think
    └ [14:43] datnt: image.png
    └ [14:43] datnt: bên em sao nó vẫn đc á anh
    └ [14:43] hungpn: có thể do anh copy từ file work ra á
    └ [14:44] hungpn: nhưng mà bên đó nó lưu lại format khi anh copy nhỉ? k fai là format theo hệ thống của mình?
    └ [14:45] datnt: nó có 2 field để lưu 1 là lưu nội dung, 2 là lưu luôn mấy cái format html luôn á anh như xuống dòng 
  [13:34] hungpn: úi dồi
  [13:48] hungpn: GOC sao k thể add cho pro được á nhỉ? Dat Nguyen check dùm anh thử [thread: 12 replies]
    └ [13:49] datnt: ơ vãi đợt anh QC card GOC pro done hết rồi mà phải khong á anh Hung Pham
    └ [13:50] datnt: đợt đó kéo card cho bên Kunal check đến nay em khong đụng chạm với bên Kunal cũng không reply luôn
    └ [13:51] hungpn: trên live cũng k thấy GOC cho pro?
    └ [13:51] hungpn: image.png
    └ [13:51] hungpn: màn hình của pro live nè
    └ [13:51] datnt: cái này chưa lên Live á ạnh
    └ [13:52] datnt: image.png
    └ [13:52] datnt: đợt em mới báo Kunal QC thôi à
    └ [13:52] hungpn: vậy em check lại staging dùm anh bị sao k add dc GOC nữa á
    └ [13:52] datnt: dạ oki anh để em check lại
    └ [14:29] datnt: Hung Pham add lại đc rồi nha anh, do có nhánh feature khác push lên Beta đổi logic check mà không để
    └ [14:29] hungpn: okie em
  [13:51] datnt: * cái này chưa lên Live á anh
  [13:52] hungpn: * vậy em check lại staging dùm anh bị sao k add dc GOC pro nữa á
  [14:29] datnt: * Hung Pham add lại đc rồi nha anh, do có feature khác push lên Beta đổi logic check mà không để ý xóa luôn cái check GO
  [14:44] hungpn: tested DONE nha Dat Nguyen
  [14:45] datnt: * nó có 2 field để lưu 1 là lưu nội dung (chỉ raw content thôi), 2 là lưu luôn mấy cái format html luôn á anh như xuống 
  [15:03] datnt: Vu Tat anh review giúp em PR này cho 2 card bug này nha, em gom chung lại 1 PR á  - https://github.com/iamksheth/Fountai
  [15:03] datnt: * Vu Tat anh review giúp em PR này cho 2 card bug này nha, em gom chung lại 1 PR á - https://github.com/iamksheth/Founta
