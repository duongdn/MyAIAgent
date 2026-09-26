# Matrix — since 2026-09-21 00:00 +07:00

### Kunal - Fountain — 391 messages
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
  [13:45] datnt: Hung Pham anh QC giúp em Card này nha, vẫn là export CSV nhưng mà bên order item của Infinty 🥲 https://trello.com/c/Fui [thread: 22 replies]
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
    └ [11:16] datnt: Hung Pham cái card_sku này em fix lên Staging rồi nha anh
  [14:06] datnt: Vu Tat anh review giúp em 2 PR này nha  - FE: https://github.com/iamksheth/FountainNewUI/pull/538  - BE: https://github. [thread: 6 replies]
    └ [16:17] vutq: app/curated-gift-boxes/[slug]/page.tsx - sao anh thấy màu mè pageSuffix gì nữa nè Dat Nguyen , có vẻ
    └ [16:19] datnt: cái đó em nhớ là để handle cho case Infinity scroll của app mình á anh
    └ [16:26] datnt: gg nó không crawl được hết product nếu mà mình làm kiểu infinity scroll này nó chỉ crawl được 25 ite
    └ [08:49] vutq: bỏ cả 2 nha em
    └ [09:03] datnt: em gỡ hết mấy cái liên quan ?page này roi nha anh Vu Tat ơi
    └ [09:19] vutq: done nha em
  [14:13] thinht: Hung Pham: test tiếp cái Review nhan. mới loy r á.
  [15:54] datnt: Vu Tat anh review giúp em PR này nha Này em add field Blurb vô file CSV, với lại hổm mở cái product catalog assign user  [thread: 3 replies]
    └ [11:07] datnt: Vu Tat xíu chiều anh Live cái này giúp em với nha, Kunal cần lên LIVE cái Blurb này á anh
    └ [11:09] vutq: done nha em
    └ [11:10] datnt: Hung Pham anh test lại cái Blurb này trên LIVE giúp em nha
  [16:09] datnt: Vu Tat với PR card này anh review giúp em luôn nha anh https://trello.com/c/uod6osEL/2968-fountain-gift-of-choice-busine
  [16:28] datnt: * gg nó không crawl được hết product nếu mà mình làm kiểu infinity scroll này nó chỉ crawl được 25 item đầu nên mới có t
  [17:22] thinht: Hung Pham: test tính năng review trên Infinity luôn nhan. t apply r đó
  [08:38] datnt: image.png
  [08:38] datnt: Trinh Mai Vu Tat anh chị ơi cái card làm SEO Kunal send message vầy anh chị [thread: 5 replies]
    └ [08:42] trinhmtt: cais này em review cho bác đc k em
    └ [08:43] datnt: dạ được á chị
    └ [08:43] datnt: nhưng mà thay vì push thẳng master thì mình nên nói Kunal nên checkout tạo 1 nhánh từ master ra
    └ [08:44] datnt: rồi tạo 1 PR như dev hay làm để có gì còn cú được á
    └ [08:49] vutq: cứ để đó đi, mình go LIVE cái ticket SEO rồi báo Kunal sau
  [08:39] datnt: Kunal push commit đó lên master lun rồi
  [08:40] datnt: https://trello.com/c/gzFHRN84/2739-fountain-infinity-improve-seo
  [09:14] vitht: ổng có nhắn này cho mình nha
  [09:14] vitht: https://trello.com/c/XNIhXMdT/3104-fountain-infinity-cloudflare-update
  [09:14] vitht: https://trello.com/c/vADuMMNP/3099-fountain-gifts-infinity-roses-analytics-implementation
  [10:20] datnt: Hung Pham anh ơi card này em đưa lên BETA với STAGING rồi á, anh QC giúp em nha [thread: 69 replies]
    └ [08:47] hungpn: Dat Nguyen: annh check thấy 1 cái items khi filter nhưng anh check thì có items này cũng có mix mà s
    └ [08:47] hungpn: image.png
    └ [08:48] datnt: cái này để em check lại nha, anh ưu tiên QC card này giúp em trước với
    └ [08:48] datnt: https://trello.com/c/FuiiLFpF/3100-infinity-order-items-export
    └ [08:48] hungpn: okie em
    └ [08:52] hungpn: anh fai taoj data mới hả Dat Nguyen
    └ [08:52] datnt: dạ đúng rồi anh
    └ [09:03] hungpn: Dat Nguyen: check dum anh cái này vs
    └ [09:03] hungpn: 6642227QD
    └ [09:03] hungpn: anh order 1 cái giftdrop mà k thấy bên admin nhỉ
    └ [09:04] datnt: bên người nhận anh fill đầy đủ chưa á
    └ [09:04] hungpn: chưa á
    └ [09:04] datnt: anh phải fill vô á
    └ [09:04] datnt: nó mới lên đc á anh
    └ [09:04] hungpn: ua? fai fil nó mới add vào admin hả
    └ [09:04] datnt: đúng rồi anh
    └ [09:04] hungpn: image.png
    └ [09:04] hungpn: k fai nó cập nhạt dạng như này hả
    └ [09:05] datnt: image.png
    └ [09:05] datnt: anh để ý cái charged đó á
    └ [09:05] datnt: nó phải fill thì mới trừ tiền, mới update được thành charged thì admin nó mới lôi lên á
    └ [09:06] hungpn: 53077	2676669YI vậy như order này thì sao nhi
    └ [09:08] datnt: cái đó order thường bên fountain staing à anh
    └ [09:08] hungpn: anh đang check bên site infinity
    └ [09:11] datnt: em thấy nó bth á anh
    └ [09:12] datnt: à rồi cái đó em thấy rồi
    └ [09:13] hungpn: thấy bug rồi hả
    └ [09:13] datnt: nhưng mà anh check cho em cái export trước được không anh
    └ [09:22] hungpn: dc em, nhưng thiếu cais order giftdrop anh k chắc nó đúng vì data cũ k có gì hết
    └ [09:22] hungpn: order thường thì anh check okie rồi
    └ [09:23] datnt: tại card này ổng nhắn hỏi em á nên em đưa lên trước cái export còn mấy bug kia phải mò code để check
    └ [09:24] datnt: anh thử fill với order mới giúp em nha
    └ [09:46] hungpn: order thường hay order giftdrop nè
    └ [09:46] datnt: giftdrop á anh
    └ [09:50] hungpn: fill thì okie rồi nha
    └ [09:51] datnt: vậy em đẩy card này đi nha anh
    └ [09:52] hungpn: okie em
    └ [09:52] hungpn: còn cái kia noted lại cho issue sau
    └ [09:53] datnt: còn cái card ban đầu của Thread này á anh
    └ [09:53] datnt: em check lại rồi trong admin này
    └ [09:53] hungpn: để anh check luôn
    └ [09:53] datnt: https://staging.infinityroses.com/admin/categories/89
    └ [09:53] datnt: image.png
    └ [09:54] datnt: nó co nút sync á anh
    └ [09:54] datnt: hôm qua em loy lên chưa có bấm nút này nên nó không có hiện ra đủ gift á anh
    └ [09:55] hungpn: https://staging.infinityroses.com/admin/categories/90 -- còn cái này thì k cần hả em
    └ [09:56] datnt: cái này thì add tay á anh :))
    └ [09:56] datnt: có cái kia là em làm cho nó sync được theo yêu cầu Kunal thoi á
    └ [09:56] hungpn: =))
    └ [09:56] hungpn: image.png
    └ [09:56] hungpn: mất hình nè em
    └ [09:57] datnt: oki anh để fix chỗ này lại
    └ [11:33] datnt: Hung Pham em fix lại lên BETA rồi nha anh
    └ [11:34] hungpn: okie để anh xem
    └ [11:37] hungpn: okie rồi đó Dat Nguyen
    └ [11:38] datnt: anh log cho em 1 ticket cho cái dụ order gift drop mà không hiển thị bên admin nha
    └ [11:38] datnt: để em đi check lại cái đó luôn
    └ [11:39] hungpn: có thể đi confirm vs @vũ
    └ [11:40] datnt: hình như đúng case là nó phải show ra ở admin á chứ không phải như em là fill mới rồi mới show ra ở 
    └ [11:41] datnt: để admin còn ấn cái Sent Reminder nữa á
    └ [11:42] vutq: nhiều msg quá nhiễu :v cần em confirm gì ấy anh
    └ [11:42] datnt: anh Vu Tat ơi cái order của giftdrop á anh, khi tạo thành công thì bên admin phải show nó ra phải kh
    └ [11:42] datnt: cho dù là chưa fill address hay fill rồi cũng phải show ra á phải khog anh
    └ [11:43] hungpn: tại anh thấy bên admin có thêm mấy cột status như Giftdrop Link Sent/	Giftdrop Address Filled Out	/F
    └ [11:43] vutq: hiện mình đang scope chỉ order đã charged nhỉ
    └ [11:44] vutq: có thể bỏ cái filter charged, show toàn bộ luôn nha
    └ [11:44] hungpn: vậy là có thể untick cái filter charged
    └ [11:45] datnt: cái filter charged này để em đem vô chỗ này luôn
    └ [11:45] datnt: image.png
  [10:20] datnt: https://trello.com/c/GZiEk8Ln/3102-infinity-update-filter-logic
  [10:46] vitht: ủa cái field Project name là không cho typing khoảng cách, hay là bug vậy ae [thread: 2 replies]
    └ [10:47] datnt: cái đó tính năng hay sao á chị
    └ [10:51] vitht: bug rồi, project name vẫn phải space đc
  [10:47] vitht: Screenshot 2026-09-22 at 10.46.54 am.png
  [11:05] vitht: ổng có feedback cho card này nha Dat Nguyen   https://trello.com/c/uopF36jA/3084-fountain-browse-page-product-blurbs
  [16:30] vitht: Vu Tat: ơi review giúp chị pull request này vs  https://github.com/iamksheth/FountainNewUI/pull/544  nó là mấy con bug c
  [08:56] hungpn: có ai update chỗ này lại hok vậy m.n. Trước mình đã update lại giá khúc này rồi mà giờ nó lại sai rồi á nè. Đang k + giá
  [08:56] hungpn: image.png
  [09:03] datnt: 
  [09:08] vitht: đúng rồi bữa update rồi mà. Chính e làm lun đó
  [09:08] hungpn: check lại dùm anh xem, nay sai rồi kìa
  [09:08] datnt: * cái đó order thường bên fountain staging hả anh
  [09:09] vitht: Dạ okie
  [09:09] vitht: a Hùng check giúp e trên production lun nha
  [09:10] vitht: https://trello.com/c/BcAjuYb6/3108-updating-gifts-csv-not-linking-to-product-catalog
  [09:10] vitht: ông Kunal có tin nhắn nha
  [09:10] vitht: https://trello.com/c/uPcfRWzN/3106-set-up-separate-test-environment-and-document-hosting-deployment-access#comment-6ab2b
  [09:11] hungpn: live vẫn đúng á
  [09:12] datnt: 
  [09:15] vitht: e nhắn gì mà e xoá hoài dị Dat Nguyen e làm ra bug đúng hông :v
  [09:16] datnt: em nhắn trong thread với anh hùng á chị mà xóa cái nó bay ra ngoài này :v
  [09:20] datnt: * em nhắn trong thread với anh Hùng á chị mà xóa cái nó bay ra ngoài này :v
  [09:35] vitht: có message card này lun nha
  [09:35] vitht: https://trello.com/c/FuiiLFpF/3100-infinity-order-items-export?filter=extra+item
  [09:49] thinht: https://redmine.nustechnology.com/issues/80958 coi test con này để loy Live fix issue luôn nhan Hung Pham
  [09:52] hungpn: cần fix thêm cái này mới cho lên được nha
  [09:53] vitht: a Thinh Tran  còn time bên này hông để e fix cho
  [09:54] thinht: uhm e fix đi. nó k liên quan tới chỗ a vừa fix trong redmine vừa rồi đâu
  [09:54] thinht: * uhm e fix đi. nó k liên quan tới chỗ a vừa fix trong redmine vừa rồi đâu. a fix trong page thankyou
  [09:55] thinht: * uhm e fix đi. nó k liên quan tới chỗ a vừa fix trong redmine vừa rồi đâu. a fix trong page thankyou. Hoặc nếu có trùng
  [09:58] datnt: Vu Tat anh review giúp em PR này nha #[3100](https://trello.com/c/FuiiLFpF/3100-infinity-order-items-export): https://gi [thread: 1 reply]
    └ [10:12] vutq: done nha Dat Nguyen
  [09:58] vitht: Hi ae, ổng có cho mình cái store hình ở đây. Ổng muốn data trên live sẽ giống với staging để thuận tiện cho việc test. N [thread: 9 replies]
    └ [10:00] thinht: note zô sheet luôn nha e
    └ [10:01] hungpn: hợp lý nè, nhưng mà add tay cũng hơi khoai 😅
    └ [10:03] hungpn: để Thinh Tran add vào rồi share link items vs nha
    └ [10:03] vitht: đc nhiu hay nhiu đị ae. Ráng lênae
    └ [10:04] hungpn: có tool nào chạy dc k em
    └ [10:05] vitht: cái này design riêng của ổng sợ lộ ra không đc á a oi. Để e research thử
    └ [10:05] hungpn: 👌
    └ [10:12] hungpn: sài tool AI nó lấy đưa ra ngoài sài hả em
    └ [11:47] thinht: nó mời mn tới lấy chớ k có đưa ra ngoài 🤣
  [09:59] vitht: * Hi ae, ổng có cho mình cái store hình ở đây. Ổng muốn data trên live sẽ giống với staging để thuận tiện cho việc test.
  [10:00] vitht: * Hi ae, ổng có cho mình cái store hình ở đây. Ổng muốn data trên live sẽ giống với staging để thuận tiện cho việc test.
  [10:03] vitht: * đc nhiu hay nhiu đị ae. Ráng lên ae
  [10:45] datnt: Hung Pham anh ơi em mới thêm card này lên Staing Fountain rồi anh QC giúp em nha [thread: 16 replies]
    └ [10:49] hungpn: image.png
    └ [10:49] hungpn: nó là page này hả em
    └ [10:49] datnt: ủa gì kì vậy 🥲
    └ [10:49] datnt: em mới test trên đó xong mà ta
    └ [10:50] datnt: à đâu lộn rồi anh
    └ [10:50] datnt: fountain anh ơi
    └ [10:50] datnt: https://staging.fountaingifts.com/admin/gifts/upload_csv
    └ [10:52] hungpn: okie
    └ [11:59] hungpn: image.png
    └ [11:59] hungpn: anh k thêm file nhấn upload là bị nè
    └ [12:00] datnt: hmmmm dị để em handle case không add file mà ấn submit
    └ [13:49] hungpn: mà nãy anh thêm file cũng lỗi luôn á
    └ [13:50] datnt: anh cho em xin file anh thêm với
    └ [15:15] hungpn: nãy okie rồi nha Dat Nguyen
    └ [16:14] datnt: Hung Pham này còn gì nữa khong á anh, em đẩy card đi cho Kunal lun anh
    └ [22:03] hungpn: hok nha
  [10:45] datnt: https://trello.com/c/BcAjuYb6/3108-updating-gifts-csv-not-linking-to-product-catalog
  [11:40] hungpn: * có thể đi confirm vs Vu Tat xem trước có update gì k nha
  [13:33] thinht: cho a xin ticket nha Trinh Mai [thread: 2 replies]
    └ [13:48] thinht: hay a check rollbar tiếp
    └ [13:56] trinhmtt: https://trello.com/c/XcjZ6KmH/2746-infinity-mail-chimp anh check cái này trước nha
  [14:00] vitht: Bữa giờ có ai đụng dô file này không mn fountainnewui/components/RecipientAddress/Forms/PhysicalAddressFormFields.tsx mì [thread: 6 replies]
    └ [14:06] thinht: a bó tei
    └ [14:07] trinhmtt: sao bỏ v anh ơi
    └ [14:08] thinht: bỏ j e
    └ [14:08] trinhmtt: ũa em đọc nhầm 😅
    └ [14:09] hungpn: xuống cú đầu liền Trinh Mai
    └ [14:25] datnt: attribute isEditAddressForm là em á mà em đổi thành xài cái khác để handle UI xài chung á chị, còn m
  [14:00] vitht: * Bữa giờ có ai đụng dô file này không mn fountainnewui/components/RecipientAddress/Forms/PhysicalAddressFormFields.tsx 
  [15:11] datnt: Vu Tat có PR này anh review giúp em nha https://trello.com/c/uod6osEL/2968-fountain-gift-of-choice-business-tab  - FE: h [thread: 1 reply]
    └ [16:12] vutq: done nha em
  [15:42] vitht: * Bữa giờ có ai đụng dô file này không mn fountainnewui/components/RecipientAddress/Forms/PhysicalAddressFormFields.tsx 
  [16:40] thinht: https://trello.com/c/XcjZ6KmH/2746-infinity-mail-chimp check issue này thử nhan Hung Pham
  [16:59] vitht: Hung Pham:  a Hùng ơi cái bug này test lại đc rồi
  [16:59] vitht: image.png
  [17:00] datnt: Hung Pham anh ơi Thomas mới mess lại là giới hạn show trên ui là 3 dòng cái Blurb á anh. https://trello.com/c/uopF36jA/3
  [17:11] datnt: Vu Tat Trinh Mai ông Thomas kiu add ổng vô repo anh chị ơi
  [17:11] datnt: https://trello.com/c/whX8aENY/3109-getting-set-up-on-the-repo
  [17:12] vitht: ổng muốn code lun rồi hả
  [17:12] datnt: Kunal code vui quá nên Thomas cũng muốn code theo :))
  [17:15] vitht: cho ổng code vui thôi nhưng không cho push đc không
  [08:52] vitht: ổng có message cho card này nha  https://trello.com/c/BcAjuYb6/3108-updating-gifts-csv-not-linking-to-product-catalog
  [08:57] datnt: Card này hôm qua Kunal muốn nay lên Live á, đang đợi QC nữa thôii á
  [08:57] vitht: Để c tạo pull request cho Vũ review lun
  [08:57] vitht: a Hùng nói test xong dòi
  [08:57] hungpn: card đó anh check done rồi nha Dat Nguyen Vi Tran
  [08:58] trinhmtt: dị live thui ạ
  [09:00] datnt: Chị Vi gửi PR cho anh Vũ giúp em nha nay e off rùi á, e cảm ơn chị Vi nha
  [09:23] vitht: ok để c gửi cho tại c mới đi họp ra
  [09:32] vitht: https://github.com/iamksheth/FountainGreetings/pull/500  c gửi pull request nha Vu Tat  oiw  cho card này á https://trel [thread: 4 replies]
    └ [09:44] vutq: done nha mn Trinh Mai Vi Tran  Dat Nguyen
    └ [09:56] vitht: Hung Pham:  a Hùng test xong báo e nha. Có gì e báo ổng lunn
    └ [09:56] hungpn: okie em
    └ [10:00] hungpn: tested DONER nha Vi Tran anh check nhanh là work rồi á
  [09:32] vitht: * https://github.com/iamksheth/FountainGreetings/pull/500 c gửi pull request nha Vu Tat  ơi cho card này á https://trell
  [10:00] hungpn: * tested DONE nha Vi Tran anh check nhanh là work rồi á
  [11:25] vitht: ổng muốn làm cái xoá hàng loạt item cũ cho admin nè Trinh Mai ơi, suggest ổng cái idea đó đi  https://trello.com/c/BcAju
  [11:46] trinhmtt: https://trello.com/c/VaTY1whG/3114-admin-delete-bulk-boxes
  [11:46] trinhmtt: em tạo đỡ nha, lát chìu em update requirement dô
  [13:31] thinht: cho a xin ticket nha Trinh Mai
  [13:31] thinht: issue bữa Hùng báo lỗi giá trên cart-item j đây fix xong chưa Vi Tran
  [13:32] vitht: Dạ rồi
  [13:32] vitht: a Hùng đang test
  [13:36] vitht: ổng ms rep card này nè a Thịnh
  [13:36] vitht: https://trello.com/c/37XQvT4c/3035-implement-smart-hybrid-product-search [thread: 3 replies]
    └ [13:46] thinht: Vu Tat: e xem comment của ổng thử. có vẻ ổng tạo PR mới muốn loy hay sao á
    └ [14:06] vutq: anh Thinh Tran có thể checkout qua nhánh Codex đó rồi test thử hiệu quả rồi chỉnh sửa hoặc fix lại c
    └ [14:13] thinht: okie e, để a xem thử ntn
  [13:42] hungpn: tested DONE nha
  [13:42] hungpn: live được rồi nha
  [16:24] vitht: https://github.com/iamksheth/FountainGreetings/pull/503/changes
  [08:30] vitht: https://trello.com/c/BcAjuYb6/3108-updating-gifts-csv-not-linking-to-product-catalog  hôm qua c mới fix cái issue ổng ex [thread: 7 replies]
    └ [08:46] datnt: Em check DONE trên BETA với LIVE mấy cái sau roi nha chị Vi Tran:  - Export file CSV for AI   - Expo
    └ [08:47] vitht: cái export AI là dùng đlàm gì vậy
    └ [08:49] datnt: cái đó em nghĩ là để cho Kunal đưa cho AI của ổng á, tại em check PR chị thấy chị có update vô cái e
    └ [08:50] datnt: còn tin nhắn thì em thấy ổng nhắn là lúc đầu ổng export ra xong import vô thì lỗi xong sau đó nó lại
    └ [09:04] vitht: à tại trước chị không thấy cái button đó, giờ thấy nên c hỏi e có làm cho cái feature này không thôi
    └ [09:04] vitht: để c báo ổng lun
    └ [09:05] datnt: dạ oki chị 🫡
  [08:31] vitht: * https://trello.com/c/BcAjuYb6/3108-updating-gifts-csv-not-linking-to-product-catalog hôm qua c mới fix cái issue ổng e
  [08:31] vitht: * https://trello.com/c/BcAjuYb6/3108-updating-gifts-csv-not-linking-to-product-catalog hôm qua c mới fix cái issue ổng e
  [08:47] vitht: * cái export AI là dùng để làm gì vậy
  [08:48] vitht: * cái Export file CSV for AI là dùng để làm gì vậy
  [10:37] datnt: Vu Tat anh ơi anh review card này giúp em nha #[3084](https://trello.com/c/uopF36jA/3084-fountain-browse-page-product-bl [thread: 2 replies]
    └ [15:12] datnt: Vu Tat chị Vi review done rùi á có gì anh check deploy giúp em nha, này cần lên sớm á anh
    └ [15:52] vutq: done nha Dat Nguyen
  [10:38] datnt: * Vu Tat anh ơi anh review PR này giúp em nha #[3084](https://trello.com/c/uopF36jA/3084-fountain-browse-page-product-bl
  [10:39] vitht: a Vũ bận rồi để c review cho
  [10:39] vitht: đợi c tí nha
  [10:40] datnt: dạ oki chị
  [10:47] vitht: a Hung Pham ơi test dùm e tính năng delete hàng loạt gift với, ổng bảo ổng cần deploy live trong chiều nay  https://trel
  [10:58] hungpn: okei, anh check liền nè
  [13:26] vitht: A ơi cái card 3114 sao rồi a ơi Hung Pham
  [13:28] hungpn: đợi anh xíu nha
  [13:34] hungpn: go go go go live nào
  [13:34] vitht: Dạ okie
  [13:42] vitht: Vu Tat:  ơi review với deploy card này giúp chị với  fountain/3114-admin-delete-bulk-boxes  BE: https://github.com/iamks [thread: 1 reply]
    └ [13:45] vutq: sao em thấy chỉ code JS thôi nhỉ, hình như nó đâu thật sự xóa record nào 🤔
  [13:47] hungpn: có ai vòa trang admin nó bị chậm hok Vi Tran
  [13:48] datnt: em thấy nay vô chậm chậm kiểu gì á
  [13:48] datnt: cả admin lẫn UI luôn
  [13:48] hungpn: anh loading nãy giờ, tưởng mạng bị sao
  [13:49] datnt: anh vô admin bên nào á
  [13:49] datnt: để em thử vô xem sao
  [13:49] hungpn: fountains
  [13:49] datnt: staging hả anh
  [13:50] hungpn: đúng rồi
  [13:50] hungpn: em check live hả
  [13:50] datnt: trên LIVE thì em check UI nó chậm lắm
  [13:50] hungpn: có khi do mạng hok ta
  [13:50] datnt: kiểu anh chuyển bấm chuyển page khác nó phải 4 5s mới đi á
  [13:50] hungpn: để báo admin đổi đường truyền mạng thử coi sao
  [13:51] datnt: admin bên em nó cũng xoay vòng vòng rồi 🥲
  [13:51] datnt: cả LIVE lẫn STAGING
  [13:52] trinhmtt: hqa chị Vi nói la do mạng hay sao á
  [13:52] trinhmtt: cái anh Cường nhắn á'
  [13:54] trinhmtt: image.png
  [14:07] datnt: Hung Pham anh QC giúp em card này nha [thread: 30 replies]
    └ [14:08] datnt: Card này update lại toàn bộ những page mà có section get in touch xài chung 1 ui á
    └ [14:08] datnt: https://www.figma.com/design/ycshVpcLgTBPb0aXnlo5MP/Fountain?node-id=26039-99496&p=f&m=dev
    └ [14:41] hungpn: image.png
    └ [14:42] hungpn: check dùm anh trang thanks you này trên mobile vs Dat Nguyen
    └ [14:42] datnt: dạ oki anh
    └ [14:45] hungpn: image.png
    └ [14:46] hungpn: vs anh đang muốn check cái placeholder text này đang ở body mấy thì thông số nào á em nhỉ? anh thấy 
    └ [14:46] datnt: để em mò thử nha :))
    └ [14:47] hungpn: image.png
    └ [14:47] hungpn: Your message nha
    └ [14:52] datnt: image.png
    └ [14:53] datnt: Hung Pham cái element bên dưới là soi được nha anh
    └ [14:54] hungpn: nhưng mà thấy body-4 mà nó còn bự hơn cái body-2 bên kia nhỉ
    └ [14:54] hungpn: 😐️
    └ [14:55] datnt: à thì có nhiều cái khó nói á anh 🫣
    └ [15:05] hungpn: khó vậy sao? nếu đúng thì nó nên nhỏ hơn chứ hì?
    └ [15:05] hungpn: image.png
    └ [15:06] hungpn: cái này mình chưa có updatge background color nè? https://beta.fountaingifts.com/cocktail-kits
    └ [15:06] datnt: cái này em cố tình để lại màu á anh
    └ [15:07] datnt: cái này nếu như mà em xài đúng value thì chắc mình skip qua đi á
    └ [15:07] hungpn: do design cũ hay sao em
    └ [15:08] datnt: image.png
    └ [15:08] datnt: tại em check figma có layout mới á mà màu thì giữ nguyên á
    └ [15:08] hungpn: anh cũng đang check luôn
    └ [15:09] datnt: có 1 cái page này em thấy cũ á mà figma cũng khôg có luôn
    └ [15:09] datnt: /employee-appreciation-gifts
    └ [15:09] hungpn: anh thấy rồi
    └ [15:10] hungpn: fix lại cái text vs trên view thanks you rồi báo anh check lại nha
    └ [15:10] datnt: dạ oki anh
    └ [15:49] datnt: Hung Pham done cả 2 rồi nha anh
  [14:07] datnt: https://trello.com/c/OSbaYhDP/3110-fountain-update-static-page-contact-form-layout-and-content
  [14:08] hungpn: đợi anh loading xong đã nha [thread: 1 reply]
    └ [14:10] vitht: mấy nay mưa gió quá nên nó hơi chập chờn
  [14:25] datnt: uar Hung Pham hình như cái GOC của pro
  [14:25] datnt: ai xóa mất tiêu trên beta rồi hả anh
  [14:25] datnt: * uar anh Hung Pham hình như cái GOC của pro
  [14:26] hungpn: anh k biết nè
  [14:26] hungpn: em check xem
  [14:26] datnt: em thấy mất tiêu rồi á
  [14:26] vitht: gift a choice bữa a Thịnh nói có bên thường thôi mà
  [14:26] vitht: pro đâu có gift a choice
  [14:26] datnt: có nguyên 1 card làm cho bên Pro á chị
  [14:26] datnt: https://trello.com/c/uod6osEL/2968-fountain-gift-of-choice-business-tab
  [14:27] hungpn: ng đâu, ban thưởng
  [14:27] hungpn: 😈
  [14:27] thinht: có thể do a đó. có một lượng lớn codes của ông cus ổng refactor nhiều nên check lại sót j so vs codes cũ k e? a cố giữ l
  [14:27] datnt: hmmm để em đi check lại giờ code em merge vô nó lỗi nhiều quá [thread: 12 replies]
    └ [14:28] thinht: hôm qua a điên đầu vs đống đó đấy. ổng chỉnh có 4 file mà file nào cũng như là 1 file mới
    └ [14:30] datnt: giờ tới em hả anh 🫠
    └ [14:30] datnt: sao nhìn nó lạ quá 🥲🥲🥲
    └ [14:31] thinht: chắc vậy :D. 🤣  code ổng viết rồi merge zô code a k làm. mò điên ngừ
    └ [14:32] datnt: card nào á anh cho em card em đọc ổng làm gì với anh
    └ [14:32] vitht: ủa
    └ [14:32] vitht: ổng có quyền push lun rồi hẻn
    └ [14:32] vitht: ==
    └ [14:32] datnt: hổm owner repo github á chị
    └ [14:32] datnt: hổm ổng push vô master lun mà
    └ [14:33] thinht: https://github.com/iamksheth/FountainNewUI/pull/546
    └ [14:33] thinht: PR đây e
  [14:28] vitht: thứ 6 rồi làm kĩ kĩ nhé 💗
  [14:32] datnt: * hổm ổng push vô master lun mà :v
  [14:48] datnt: có ai đang deploy không á anh chị
  [14:49] datnt: em xoay vòng vòng BETA rồ á
  [14:49] hungpn: ai mạng chậm thì hãy sài tạm extension 1clickvpn này nhé, đổi sang mỹ cho nó lẹ [thread: 7 replies]
    └ [14:51] thinht: ubuntu k thấy
    └ [14:52] thinht: ai xài ubuntu thì dùng TouchVPN
    └ [15:35] vitht: sao e dùng cái a Hùng nói mà dô admin của production nó cũng quay vòng vòng à
    └ [15:49] hungpn: anh vào ầm ầm luôn á
    └ [16:06] vitht: Screenshot 2026-09-25 at 4.06.16 pm.png
    └ [16:07] thinht: a cũng ầm ầm :D
    └ [16:07] datnt: em bật lên vô ầm ầm chứ api call từ nó ra thì time out nha :))
  [15:07] thinht: a LOY staging FE á nha mn
  [15:11] thinht: nhớ test cái reviewsIO nhan Hung Pham [thread: 3 replies]
    └ [15:14] hungpn: gửi dùm lại trang admin vs
    └ [15:16] thinht: https://dash.reviews.io/ đây hã
    └ [15:48] hungpn: okie nha
  [16:07] datnt: * em bật lên vô ầm ầm chứ api call từ nó ra thì vẫn time out nha :))
  [16:33] datnt: Hung Pham anh ơi có bug redmine này anh QC giúp em nha https://redmine.nustechnology.com/issues/81137?issue_count=153&is
