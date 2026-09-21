# Matrix — since 2026-09-21 08:00 +07:00

### Kunal - Fountain — 59 messages
  [08:48] datnt: Hung Pham anh ơi check lại cái này giúp em xem có import/export CSV với field Blurb được chưa nha, em mới update lại Sta [thread: 17 replies]
    └ [09:42] hungpn: image.png
    └ [09:42] hungpn: check dumf anh lỗi gì Dat Nguyen
    └ [09:42] datnt: này anh đang làm gì á anh
    └ [09:51] hungpn: export json á
    └ [09:51] hungpn: https://redmine.nustechnology.com/issues/81049 -- vs check bug này nha
    └ [09:51] datnt: dạ oki anh
    └ [10:08] datnt: Trinh Mai chị ơi đó giờ app mình có hỗ trợ export file json với xml bên admin không chị hay chỉ mỗi 
    └ [10:16] trinhmtt: chị tháy json trên staging còn work á
    └ [10:17] datnt: hmm để em check thêm xem coi nó đang bị gì
    └ [10:18] trinhmtt: sẵn check cái xml luon nha em, chị nghĩ nó bug á
    └ [10:18] datnt: nó đang ra được á chị
    └ [10:18] datnt: mà cái data nó ra hơi lạ
    └ [10:19] datnt: image.png
    └ [10:19] trinhmtt: ùa nên chị mới kiu check á, hong rõ bug hay tính năng =))
    └ [10:19] trinhmtt: hỏi anh Vu Tat  cho chắc
    └ [10:23] vutq: admin chỉ xài duy nhất CSV thôi nha mn, đừng tốn time vào những loại file khác
    └ [10:23] datnt: Hung Pham vậy anh đóng ticket redmine giúp em nha
  [08:57] vitht: ổng có rep cho card này nha ae ơi  https://trello.com/c/37XQvT4c/3035-implement-smart-hybrid-product-search
  [09:00] vitht: Vu Tat ơi review dùm c cái card này với  https://github.com/iamksheth/FountainNewUI/pull/540/changes  fix bug production [thread: 1 reply]
    └ [13:49] vutq: done nha chị Vi Tran
  [09:14] vitht: https://trello.com/c/tSuQHKwj/2978-infinity-giftdrop-recipient-flow
  [09:19] trinhmtt: em gửi plan tuần này aj ViTHT: 40h DatNT: 40h ThinhT: 20h => QC 25h
  [10:02] vitht: Hiện tại trên data staging INFINITY ROSES có mấy cái gift đang thiếu mấy hình gift variant để test nếu được thì mọi ngườ
  [11:29] trinhmtt: em update plan tuần này aj ViTHT: 40h DatNT: 32h ThinhT: 20h Vu Tat : 8h => QC 25h
  [13:43] vitht: có ai đang deploy gì hông dị mn ơi
  [13:43] datnt: em mới loy xong á chị Staing Infinity
  [13:44] datnt: * em mới loy xong á chị Staging Infinity
  [13:45] datnt: Hung Pham anh QC giúp em Card này nha, vẫn là export CSV nhưng mà bên order item của Infinty 🥲 https://trello.com/c/Fui [thread: 21 replies]
    └ [14:28] hungpn: image.png
    └ [14:28] hungpn: sao cột này có nh cái trống thế nhỉ?
    └ [14:28] hungpn: image.png
    └ [14:28] hungpn: nó fai là cái này hok
    └ [14:29] datnt: đúng ròi á anh, mà cột này nãy em để defaults không có đụng á
    └ [14:29] hungpn: tại anh thấy nó miss nh, mặc dù có chọn cart thì nó fai show chứ nhỉ
    └ [14:30] datnt: anh check thêm 1 lượt xem còn chỗ nào bị missing, sai thiếu gì nha anh, có nhiều cột lấy field cũ á 
    └ [15:04] hungpn: anh thử cái mới cũng thiếu nè
    └ [15:04] hungpn: image.png
    └ [15:05] hungpn: image.png
    └ [15:06] datnt: oki anh để em update lại field này
    └ [15:10] hungpn: image.png
    └ [15:10] hungpn: trong thoong tin trên admin cũng rỗng luôn á
    └ [15:12] datnt: vậy thì nó không liên quan tới phần export nữa rồi á anh
    └ [15:12] datnt: tại data ban đầu nó bị luôn rồi
    └ [16:01] hungpn: lạ nhỉ
    └ [16:02] hungpn: vây chắc fai fix k nhỉ?
    └ [16:02] hungpn: Trinh Mai:
    └ [16:02] trinhmtt: dạ fix á anh, anh log lại nha
    └ [16:06] hungpn: fix trong card đó luôn đi Dat Nguyen
    └ [16:06] datnt: dạ oki anh
  [14:06] datnt: Vu Tat anh review giúp em 2 PR này nha  - FE: https://github.com/iamksheth/FountainNewUI/pull/538  - BE: https://github. [thread: 3 replies]
    └ [16:17] vutq: app/curated-gift-boxes/[slug]/page.tsx - sao anh thấy màu mè pageSuffix gì nữa nè Dat Nguyen , có vẻ
    └ [16:19] datnt: cái đó em nhớ là để handle cho case Infinity scroll của app mình á anh
    └ [16:26] datnt: gg nó không crawl được hết product nếu mà mình làm kiểu infinity scroll này nó chỉ crawl được 25 ite
  [14:13] thinht: Hung Pham: test tiếp cái Review nhan. mới loy r á.
  [15:54] datnt: Vu Tat anh review giúp em PR này nha Này em add field Blurb vô file CSV, với lại hổm mở cái product catalog assign user 
  [16:09] datnt: Vu Tat với PR card này anh review giúp em luôn nha anh https://trello.com/c/uod6osEL/2968-fountain-gift-of-choice-busine
  [16:28] datnt: * gg nó không crawl được hết product nếu mà mình làm kiểu infinity scroll này nó chỉ crawl được 25 item đầu nên mới có t
  [17:22] thinht: Hung Pham: test tính năng review trên Infinity luôn nhan. t apply r đó
