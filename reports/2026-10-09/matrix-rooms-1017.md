# Matrix — since 2026-06-01 07:00 +07:00

### Elena - Digital Plant — 354 messages
  [10:44] anhttl: anh Duong Doan ơi mới có PR mới, anh review với merge giúp em với anh, em cần test lại cũng hơi gấp chút ạ
  [08:20] duongdn: PR #304 merged & deployed to MayBanServer Branch: DP-666-create-and-manage-autoscan Title: Dp 666 create and manage auto
  [09:06] duongdn: ⚠️ [DELAYED ALERT] PR #303 (redmine-78803, merged 2026-05-29) was not deployed due to MayBanServer being unreachable. It
  [13:57] anhttl: Tien Nguyen ơi, ông có biết là server studio-3, hoặc là server studio nói chung gần đây có biến gì ko ông, hôm qua hôm k
  [13:57] tiennd2: để tui check status xem có bị sập gì ko
  [14:28] tiennd2: tui đang restart thử studio-02 nhe Anh Trinh, tui thấy đang sập algorithm gì đó r
  [14:33] anhttl: mà tui test trên studio 3 á
  [14:33] tiennd2: cả 2 cái đều sập cái algorithm
  [14:33] anhttl: có báo với họ chưa ông
  [14:33] tiennd2: tui chưa, restart xong mới báo
  [14:33] tiennd2: để restart xong xem như nào đã á
  [14:51] tiennd2: ủa Anh Trinh: studio-02 restart rồi, giờ tui đổi sang studio-02 được ko
  [14:51] tiennd2: studio-02 trước đó có gì khác với studio-03 ko ta
  [15:36] anhttl: ko có khác gì á Tiến, vậy ông đổi thử xem
  [15:36] anhttl: mà báo họ về vụ sập algorithm nha
  [15:36] tiennd2: studio-02 tui thấy chạy lại rồi á
  [15:36] tiennd2: studio-03 ko connect được
  [15:37] tiennd2: vậy tui đổi studio-02 trước xem sao
  [15:47] anhttl: oki
  [15:47] anhttl: đổi xong hú tui nha
  [15:47] tiennd2: ok nha tui đang check lại cách deploy :v
  [15:51] tiennd2: ủa
  [15:51] tiennd2: sao trên nusdev đang dùng studio-02 mà socket studio-03 nhỉ
  [15:54] tiennd2: done nha Anh Trinh , tui đổi hết qua stu02 rồi
  [17:02] anhttl: Tien Nguyen: LA thấy trên web vẫn là studio 3 mà
  [17:03] tiennd2: kì zị
  [17:03] tiennd2: để tui check
  [17:03] anhttl: qua hỏi anh Trí i ông
  [17:05] tiennd2: hình như tui thiếu step
  [17:05] tiennd2: 2p nhe chờ tui chút
  [17:06] tiennd2: rồi nha, lần này sẽ ok thoi :v
  [17:06] anhttl: Duy Vo: anh xem tin đc ko =))
  [17:06] tiennd2: anh Duy tin mà
  [17:09] duyvna: riêng e thì a ko bao giờ tin nhé
  [17:19] tiennd2: em thấy ok rồi mà anh Duy
  [17:19] tiennd2: anh check lại thử xem
  [17:19] duyvna: ok e, để mai a check nhé
  [09:15] duyvna: image.png
  [09:16] duyvna: upload file cho autoscan nó cũng loading quài lun, nãy giờ đc 30' rồi nha Anh Trinh Tien Nguyen
  [09:16] tiennd2: em nghi là fail rồi đó a
  [09:17] duyvna: e check sao nó fail đi Tiến, đừng nghi nữa
  [09:33] anhttl: Tien Nguyen: case này ông đã thử restart lại server (?) rồi mà vẫn ko được phải ko? cho tui info tui báo họ check luôn n
  [09:33] tiennd2: đúng r
  [09:36] anhttl: oke
  [10:08] tiennd2: để tui nhắn thêm vô chann
  [10:08] tiennd2: * để tui nhắn thêm vô channel
  [13:37] tiennd2: Anh Trinh: cho tui hỏi xíu về ticket này với :v https://precognize.atlassian.net/browse/SR-7355 [thread: 4 replies]
    └ [13:38] tiennd2: ý là có phải khi mình update userIds cho section ở level cao nhất -> thì cũng phải update luôn userI
    └ [13:45] anhttl: Ý bug họ nêu là ngược lại á, update cho section bên trong thì ko được update luôn ở level cao hơn. C
    └ [13:45] tiennd2: ok ok tks nhe
    └ [13:46] tiennd2: nay ko ai available rồi chắc tui check ý này trước
  [13:39] tiennd2: * ý là có phải khi mình update userIds cho section ở level cao nhất -> thì không được update luôn userIds của các sectio
  [08:38] tiennd2: Anh Trinh: tui restart lại studio-02 lần nữa r nha, bà check thử xem còn issue gì ko
  [09:08] duyvna: Nay upload file autoScan vẫn loading mãi nha Tien Nguyen Anh Trinh , không thấy stt lỗi gì trả về hết
  [09:09] tiennd2: để em restart cái nữa
  [10:28] tiennd2: anh Duy Vo thử lại cái nữa nha a
  [10:28] tiennd2: em chuyển sang studio-03 rồi, studio-02 bị đơ luôn
  [10:28] tiennd2: cái này ko ok nữa thì e báo bên đó
  [10:43] duyvna: cũng bị tương tự nha Tiến
  [10:49] tiennd2: goy để e báo
  [10:57] duyvna: mới upload thành công rồi Tien Nguyen
  [10:57] tiennd2: mes
  [10:58] tiennd2: hên e chưa báo
  [10:58] tiennd2: okay a
  [10:58] duyvna: bữa chỉ có mất 5-7' là upload lên rồi, giờ tận nửa tiếng lun
  [11:04] anhttl: Tri Nguyen: anh có cái autoscan nào chưa full connection để test chưa
  [11:07] trinm: có anh thấy demo-3 cái "Test AutoScan" cũng vài cái á
  [11:30] duyvna: image.png
  [11:31] duyvna: Anh Trinh: khi mình add tag cho asset trên Autoscan thì nó có đc show bên ngoài img ko em
  [11:32] anhttl: cứ để v đã
  [11:32] tiennd2: em nghi là tuần trước nó work rồi á, em check status ok hết r
  [11:32] tiennd2: mà giờ studio-02 sập, studio-03 running trở lại :)
  [11:32] tiennd2: chán thật sực
  [11:32] tiennd2: * chán thật sự
  [08:49] duongdn: PR #305 (DP-666 create-and-manage-autoscan) deployed to MayBanServer. Build OK (17s). Check: https://process-digital-pla
  [13:26] tiennd2: Anh Trinh: studio-02 start ok lại rồi, tình hình studio-03 giờ còn bị chậm gì ko, để tui switch qua studio-02
  [13:26] tiennd2: CC. a Duy Vo
  [11:11] anhttl: Tien Nguyen: Hôm t6 tuần trước tui có báo là mấy cái autoscan ko work được, biểu hiện là đợi mãi mà ko thấy completed, t
  [11:11] anhttl: image.png
  [11:12] tiennd2: tui rep họ rồi mà giờ vẫn sập hả
  [11:12] anhttl: Tien Nguyen: à mà studio 1 cái autoscan có chạy ko vại. 2 3 lại 502 rồi
  [11:13] tiennd2: chờ xíu để tui check
  [11:13] anhttl: tình trạng bữa giờ là cứ khi 2 ok thì 3 sập. mà sập thì tui ko rõ là chỉ sập cái algorithm thôi hay là sập server. nói c
  [11:14] tiennd2: 1 2 3 sập hết luôn r
  [11:14] tiennd2: image.png
  [11:14] tiennd2: ko biết có đang rebuild gì ko nữa
  [11:17] anhttl: mới vô 1 thấy server ok á, ý ông là algorythm sập hả
  [11:20] tiennd2: tui ko connect vô được studio-01 á
  [11:21] tiennd2: tui ko check status nữa, chắc bà test thử xem sao
  [11:21] tiennd2: * tui ko check status đc nữa, chắc bà test thử xem sao
  [11:23] anhttl: vậy còn này sao Tiến :'> giờ tui báo ổng sao giờ, server thì 502 rồi, họ lại hỏi là algorithm có work ko
  [11:25] tiennd2: channel nào á để tui trả lời cho
  [11:26] tiennd2: chắc báo họ 2 3 đang 502, còn 1 thì test xong vẫn lỗi autoscan
  [11:26] tiennd2: báo v thui được r
  [11:27] anhttl: process digital plant nha, https://samguard-mobile.slack.com/archives/C08BMHGP99D/p1780628191083539
  [11:29] tiennd2: ủa mà đoạn hội thoại ở dưới trả lời cho ý của bà r á :v
  [11:29] tiennd2: thoi để tui tag 2 người kia vô cho chắc
  [13:39] tiennd2: Anh Trinh: bà check studio-01 nha
  [13:39] anhttl: Anh Nguyen: Họ có gửi qua mail Michelle 1 email về AI usage policy. Nội dung thì để em phổ biến với các dev sau (cả DP, 
  [13:40] anhnvn: Để a xem thử, chắc là cần mình gửi lại confirm, hay kí tá gì à
  [13:40] anhttl: * Anh Nguyen: Họ có gửi qua mail Michelle 1 email về AI usage policy. Nội dung thì để em phổ biến với các dev sau (cả DP
  [14:31] anhttl: là ông đổi trên nusdev qua studio 1 rồi đúng ko, hơ hơ nó bị vây nè
  [14:31] anhttl: image.png
  [14:32] tiennd2: nusdev tui chưa đổi ...
  [14:33] anhttl: là giờ nó connect tới BE nào z
  [14:33] tiennd2: đang là studio-03 á
  [14:33] tiennd2: 5p tui đổi sang stu01
  [14:34] anhttl: khoan nha
  [14:34] anhttl: sao bên này khùng điên dữ tr
  [14:34] anhttl: image.png
  [14:34] anhttl: lỗi 500 thì ông check hay báo họ
  [14:34] tiennd2: studio 02 với 03 đang rebuild gì á
  [14:34] tiennd2: họ nói z
  [14:35] tiennd2: ông Dror mới confirm studio-01 đang work nè
  [14:35] anhttl: ok vậy đổi giúp tui xem
  [14:38] tiennd2: ok tui đổi r nha
  [14:49] anhttl: studio 1 unknown rùi, clear data giúp tui Tien Nguyen
  [14:50] tiennd2: oke chờ tui chút
  [14:58] tiennd2: done nha
  [14:59] tiennd2: ủa sao giờ còn lỗi phải clear data ta...
  [14:59] tiennd2: studio-01 bị bỏ rơi lâu thế r hả
  [15:00] anhttl: hy vọng là do vậy thôi
  [15:01] tiennd2: vậy là nó cũ lắm r, cái autoscan cũng k work đâu, cái autoscan mới fix gần đây mà
  [15:01] anhttl: ảo nha :))) vẫn bị unknown á
  [15:01] anhttl: ông xem lại xem có thằng object nào tên Test autoscan ko
  [15:01] tiennd2: kì zị
  [15:01] tiennd2: thử lại nhe LA
  [15:02] tiennd2: tui mới clear phát nữa
  [15:03] anhttl: cũng vẫn bị nha, này cho do sai data rồi
  [15:03] anhttl: image.png
  [15:04] anhttl: bthg nếu nó là root  thì ko có cái leaf á
  [15:04] tiennd2: hmmm
  [15:05] tiennd2: hết r á
  [15:05] tiennd2: ủa cũng z
  [15:05] tiennd2: tui clear sạch r mà ta
  [15:06] tiennd2: rồi hiểu r, data trên studio-01 cũ lắm r nha, trong DB có 22 items thôi
  [15:49] anhttl: z gio sao Tien Nguyen
  [15:49] tiennd2: chờ họ fix rồi báo tui thoi :)
  [15:49] tiennd2: giờ tui ko đụng vô cái server nào được hết
  [17:21] tiennd2: Anh Trinh: để sáng mai tui restore studio-01 nha
  [23:00] anhttl: Tien Nguyen: Giờ cả 3 server đều có data cũ hết, ko có active alert nào luôn. Chắc họ phá gì rồi ~~
  [23:01] tiennd2: đúng rồi phải restore lại hết tất cả
  [23:01] tiennd2: haiss chán ghê
  [23:01] tiennd2: để mai tui làm một lượt [thread: 2 replies]
    └ [09:50] anhttl: Tien Nguyen: ông ơi, vậy là giờ mình có cấn làm gì ko á, resotre chắc cũng ko giải quyết đc hả
    └ [09:50] anhttl: image.png
  [09:45] anhttl: Hi mn. Phía công ty sắp tới mong muốn là ở mỗi dự án có thể đóng góp một số case cụ thể mà mình đã xử lý các bài toán te [thread: 7 replies]
    └ [14:41] khanhhh: Anh Trinh: c.c a Anh Nguyen a có viết 2 case studies của dự án Elena DP FE, còn AA a ko join từ đầu 
    └ [15:53] duongdn: Anh Trinh:   A đã submit 1 bài cho DP nha AA thì a ko nắm
    └ [15:53] anhttl: Dong Nguyen: bên BE anh có chủ đề gì ko anh ưi
    └ [15:57] dongnv: Anh có 1 case khả hay, tối anh về hoàn thiện r gửi nhé.
    └ [11:08] dongnv: Anh Trinh:  Anh có viết hai chủ đề này: https://docs.google.com/document/d/1CRdkggNzxVU2y5IclVczXzfo
    └ [11:09] anhttl: bên BE chắc ko có ai review đâu :'> anh Anh Nguyen submit luôn nhe
    └ [11:19] anhnvn: Đã sub ráo nạo
  [14:14] tiennd2: Anh Trinh: nusdev sống lại rồi nha, nhưng đang version cũ, mọi người check lại thử xem có gì chưa ok ko, để tui upgrade 
  [15:13] duyvna: image.png
  [15:13] duyvna: mới upload thử thì đc nha Tien Nguyen
  [15:14] tiennd2: okay tks a
  [16:08] anhttl: DP-always-reload.webm
  [16:08] anhttl: giờ nó bị lỗi này hoài á
  [16:08] anhttl: Tri Nguyen: anh biết lý do hông anh
  [16:19] tiennd2: xóa cookies đi là hết nha Anh Trinh
  [16:20] tiennd2: tui mới upgrade lên 9.2 ko biết có phải lý do ko
  [16:22] anhttl: tui chư chuwalamf gì hết thì nó hết bị rồi
  [16:25] duyvna: cái này bị lâu rồi mà, lâu lâu a cũng bị
  [16:25] duyvna: chịu khó clear cookie 2-3
  [16:25] anhnvn: Giờ gặp mấy bug này trước hết hãy bình tĩnh clear cache, clear cookies, dùng ẩn danh và hi vọng vào điều tốt đẹp nhất. X
  [16:26] anhttl: hay vậy ta =)) lâu lắm rồi em ko bị nữa, nay lại bị. thật là yomost =))
  [12:01] tiennd2: a Duy Vo , a Duy chiều có time bên này nhờ a verify lại giúp e con này với nha a, em check hoài thì ko thấy lỗi  https:/
  [13:27] anhttl: có khi do khác server ko ông
  [13:27] tiennd2: tui mới thấy lại lỗi đó nè
  [13:28] tiennd2: section > asset > canvas (lỗi) section > section > canvas (bình thường)
  [13:37] tiennd2: image.png
  [13:38] tiennd2: Anh Trinh: create canvas level dưới asset được này :v
  [13:40] anhttl: ông test trên server gì á
  [13:40] tiennd2: dev-03 nhe
  [13:41] tiennd2: version đang là latest staging á, v là tương tự với studio-01 hiện tại
  [13:41] tiennd2: bà check trên studio-01 cũng được luôn nha
  [13:43] tiennd2: image.png
  [13:59] anhttl: để check trên nusdev thử nhe
  [14:03] tiennd2: oke có gì hú tui
  [14:04] tiennd2: có vẻ là chỉ nested sections/canvas thôi thì ko sao, có asset xen giữa thì hẹo
  [14:28] tiennd2: mode Hierarchy được add asset under section Anh Trinh nhỉ
  [14:30] anhttl: được á
  [14:33] anhttl: cái này giờ phải fix ở FE xong rồi merge lên staging hả ông
  [14:33] anhttl: mà lạ là sao giờ nó bị
  [14:33] anhttl: ko biết là nên để dev mình fix hay dev FE bên đó fix
  [14:33] tiennd2: BE cũng ko chặn, nên đang lỗi tè le luôn nè
  [14:35] tiennd2: sections/canvas mà ở dưới asset, upsert userIds một phát nó upsert toàn bộ lun
  [14:36] anhttl: mà giả sử như dev mình fix đi, thì flow nhánh merge đồ như nào ông nắm đc ko
  [14:37] tiennd2: FE thì tui chịu r
  [14:38] anhttl: mà lỗi này bị là do FE chưa chặn, giờ ông có chặn ở BE ko?
  [14:38] tiennd2: giờ đang fix để chặn ở BE :v
  [14:38] tiennd2: mà FE thì UI lỗi r nên cũng phải fix thoi
  [14:38] anhttl: ok, vậy giờ ông fix ở phía BE, còn FE vẫn fix trên nhánh hiện tại sửa autoscan thôi nha
  [14:39] anhttl: khi nào xong rồi mới merge development á
  [14:39] tiennd2: à koooo
  [14:39] tiennd2: tui k có đụng vô FE :v
  [14:39] anhttl: ko ko, tui nói ý là team FE á, ko nói ông
  [14:39] tiennd2: à à oke lun
  [14:39] anhttl: nếu vậy thì có cho task là done đc ko
  [14:39] anhttl: kiểu v
  [14:40] tiennd2: chắc là ok á
  [14:40] tiennd2: tại FE lòi ra case này mà BE vô tình ko chặn
  [09:47] tiennd2: anh Duy Vo, Anh Trinh, mọi người dạo gần đây có thấy gì bất thường ở upsert node ko, khách hàng mới báo lỗi cũ tái diễn
  [09:55] anhttl: lỗi cũ là cái gì z Tien Nguyen
  [09:55] duyvna: lỗi cũ tái diễn là cụ thể lỗi gì thế e, bữa a giờ a chỉ upload img rồi add internal/external tag thôi
  [09:55] tiennd2: à e quên link ticket
  [09:55] tiennd2: đây nha mng https://precognize.atlassian.net/browse/SR-7445
  [09:55] tiennd2: sao e test thấy k bị ta
  [09:59] duyvna: tạo new customer sao nhỉ?
  [10:00] tiennd2: a check 2 ý gạch đầu dòng thoi nhe a Duy
  [10:00] tiennd2: new customer là ý họ mới chạy backup server
  [10:00] anhttl: là cái mà vụ bữa ông Dror restore new customer, xong tạo area nó bị unknown phải ko
  [10:01] tiennd2: à k phải nha, cái đó là sai version thôi
  [10:02] anhttl: vậy giờ có môi trường nào để test ko? chứ đưa nội dung dị thui khó hỉu quá
  [10:02] tiennd2: chờ tui xíu
  [10:04] tiennd2: chắc verify thử trên nusdev luôn á LA, qa-02 với studio-03(nusdev) đang cùng version
  [10:21] anhttl: trên nusdev đang gắn studio 1 á Tiến, hay ý ổng là test trên https://studio-03.client.samguard.co/admin-ui/#/login
  [10:21] anhttl: * trên nusdev đang gắn studio 1 á Tiến, hay ý ông là test trên https://studio-03.client.samguard.co/admin-ui/#/login
  [10:22] duyvna: A mới thử test vài vòng dựa trên thông tin bả nói thì thấy k bị gì cả nha, chắc xin thêm info cụ thể đi em hoặc e thử du
  [10:22] tiennd2: à z là 1 á
  [10:22] tiennd2: * à z là studio-1 á
  [10:26] anhttl: mà tui đọc nội dung ticket thì thấy đúng là họ mô tả cái issue unknown bữa mà ta. ổng thử đổi nusdev sang studio 3 tui c
  [10:26] tiennd2: ê khoan, qa-02 data trống trơn à
  [10:26] tiennd2: đúng r có khi chính nó
  [10:26] tiennd2: chờ tui tí
  [10:34] tiennd2: done nha Anh Trinh
  [10:39] tiennd2: em cũng thấy ok
  [10:56] trinm: Screenshot 2026-06-15 at 10.56.29.png
  [10:57] trinm: sao không có gì hết vậy mn
  [10:57] anhttl: mới đổi qua cho em test á
  [10:57] anhttl: anh đổi lại stu1 nha sorry
  [10:57] trinm: ok em
  [11:09] anhttl: Tien Nguyen: trên stduio 3 là tá tạo được á, tui check FE thì payload gửi đúng parent id rồi á. tạo area thì parent id l
  [11:09] anhttl: * Tien Nguyen: trên stduio 3 là tái tạo được á, tui check FE thì payload gửi đúng parent id rồi á. tạo area thì parent i
  [11:10] tiennd2: ok ok để tui check thử
  [11:10] tiennd2: chắc sẽ tìm cách dup data từ qa-02 sang studio-03
  [11:13] anhttl: dup để chi á ông, chắc nó cũng cùng data rồi mà nhỉ, là new customer á
  [11:14] tiennd2: tui thấy qa-02 đang hơi khác tí nè
  [11:14] tiennd2: ý là cũng nhiêu đó data thoi, mà mấy cái connection đang hơi khác
  [11:45] anhttl: Duong Doan: anh ơi deploy code mới nhất lên nusdev giúp em với, khách dí rùi ạ :'>
  [11:46] duongdn: ủa nó ko tự deploy à
  [11:46] duongdn: chắc AI lỗi, để xem
  [11:53] duongdn: ✅ Elena Digital Plant deployed — PR #306 (fixbug_dp, Jun 16) Changes: • Fixed modal overlay layering (z-index fix) • Pre
  [17:24] tiennd2: image.png
  [17:24] tiennd2: đâu đó có chữ "www" ở nut Create Canvas nha mọi người a Duy Vo , Anh Trinh
  [14:06] anhttl: Tri Nguyen: cái này là do gì á anh Trí, nay chỗ Create Canvas bị dư thêm chữ "www"
  [14:07] trinm: hình như bị dư text chỗ đó tí anh update cái kia xong sẵn xoá luôn cho
  [14:11] anhttl: sắp qua chưa anh Tri Nguyen, họ kêu tạo PR cho import với autoscan để họ test trên server họ. mà bữa anh Dương có config ⚠️
  [14:11] anhttl: image.png
  [14:12] trinm: đang qua rồi nè mà em nói gì chưa hiểu lắm
  [14:16] anhttl: Là hiện giờ bên môi trường họ test thì 2 mode import với autoscan đang bị disable, ko bấm vào được, như hình em gửi á. D ⚠️
  [14:16] anhttl: image.png
  [14:16] anhttl: Cách ảnh làm nè:
  [14:16] anhttl: image.png
  [14:22] trinm: nhưng mà anh chưa có info gì về deploy môi trường test bên họ như nào, với bên này việc mà merge code cho bên kia test a
  [14:22] anhttl: oke vậy anh fix xong cái www đi  rồi em nhờ anh Dương ⚠️
  [14:23] trinm: ủa vậy còn discard change thì sao
  [14:25] anhttl: Anh Nguyen: Bên DP nhìn chung các tính năng dễ thấy thì em thấy đưa cho họ test được rồi, gửi họ trước để họ test, dạo n
  [14:30] anhnvn: Bug này đều là bug họ log à e
  [14:31] anhnvn: Đưa fix cái nào họ dí trc thôi. Mấy cái có thể để lại đc thì fix từ từ sau
  [14:31] anhttl: lâu nay là mình tự test rồi tự làm thôi anh, họ ko có log
  [14:32] anhttl: vậy anh Tri Nguyen làm như nãy h bàn nha: + fix chỗ dư "www" --> sau đó đưa anh Dương tạo PR + fix bug https://redmine.n ⚠️
  [14:48] trinm: anh Duong Doan merge cái PR này giùm em nha anh  https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/307
  [14:56] anhttl: Duong Doan: Sau khi anh merge cái PR của anh Trí, nhờ anh tạo 1 PR cho Import & Autoscan sang repo của họ, với enable 2 
  [14:56] duongdn: ✅ PR #307 merged + deployed (fixbug_dp)\n• Removed debug text from 'Create Canvas' button label\n• Build OK (17.9s)\n• D
  [15:10] duongdn: > Duong Doan: Sau khi anh merge cái PR của anh Trí, nhờ anh tạo 1 PR cho Import & Autoscan sang repo của họ, với enable 
  [15:13] anhttl: giống mấy lần trước anh tạo PR cho họ thui ạ
  [15:13] duongdn: OK
  [16:16] duongdn: https://github.com/Precognize/development/pull/5014
  [16:16] duongdn: a done, review code clean luôn, quá dữ :v
  [16:16] duongdn: image.png
  [10:11] anhttl: anh Duong Doan ơi, đổi nhánh merge là nhánh develop-9.4 giúp em với ạ
  [10:15] duongdn: OK e
  [11:18] duongdn: done
  [09:53] anhttl: Tien Nguyen ơi, đổi nusdev sang studio 1 giúp tui với nha
  [09:55] tiennd2: chờ tui xíu nha
  [10:02] tiennd2: done nha Anh Trinh
  [14:05] tiennd2: Anh Trinh: cho tui hỏi xíu, trước giờ có logic nào mà khi update user cho 1 Area, thì nó sẽ update toàn bộ Sections ở bê
  [14:06] tiennd2: * Anh Trinh: cho tui hỏi xíu, trước giờ có logic nào mà khi update user cho 1 Area, thì nó sẽ update toàn bộ Sections ở 
  [14:57] anhttl: hình như là ko có luôn á [thread: 1 reply]
    └ [15:58] tiennd2: hmmm ok ok
  [11:23] tiennd2: image.png
  [11:24] tiennd2: Anh Trinh: khi mình tạo 1 user mới, thì ở mục "User Assets" nó sẽ select full hả Lan Anh
  [11:24] tiennd2: kiểu sau khi add user mới -> login bằng user mới -> check user info thì sẽ auto select full assets của cái plant đó (vd 
  [11:25] anhttl: image.png
  [11:25] anhttl: flow add user có define cái này á
  [11:26] tiennd2: ụa kì zị :v
  [11:26] tiennd2: image.png
  [11:26] tiennd2: của tui ko có cái chọn user assets ta
  [11:27] anhttl: tui check ở demo-3 á
  [11:27] tiennd2: ok ok
  [13:26] tiennd2: Anh Trinh: hú LA, bà có thân thuộc cái endpoint này đang dùng ở đâu ko `/rule/check/layer`
  [13:28] anhttl: vô 1 investigation á
  [13:28] anhttl: https://demo-3.client.samguard.co/investigation/#/reporting/investigation/9598/4901b836-2427-4d00-b20b-f56549a2fa2e/inve
  [13:29] tiennd2: oke lun để tui check thử
  [13:29] anhttl: image.png
  [13:56] anhttl: anh Tri Nguyen ơi, cus nhắn: "can you please provide with the number of PR  for autoscan/csv code , we deployed our deve
  [13:57] anhttl: cái này anh có nắm ko
  [13:58] trinm: bên này anh chỉ đẩy lên internal thôi còn tạo PR cho bên họ chắc anh Duong Doan  nắm rồi
  [13:59] duongdn: internal thì code ko lên rồi
  [13:59] duongdn: còn number gì gì thì bỏ đi, ai rảnh
  [14:00] duongdn: code đang ở internal mình phải ko, merge hết vô nhánh chính chưa, rồi thì tạo PR cho họ
  [14:01] anhttl: Bữa mình có tạo PR cho họ rồi, là nhánh này: https://github.com/Precognize/development/pull/5014
  [14:01] anhttl: anh Tri Nguyen coi thử đủ code chưa
  [14:04] anhttl: * Bữa mình có tạo PR cho họ rồi, là PR này: https://github.com/Precognize/development/pull/5014
  [14:06] trinm: so sánh thời gian thì chắc thiếu code của cái này  https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/30
  [14:13] anhttl: vậy giờ tạo thêm PR hay sao mn, bả dí quá
  [14:20] anhttl: ủa nhưng mà cũng ko hẳn, cái này chỉ là 1 bug nhỏ thôi, như bả nói là ko thấy code luôn
  [14:22] trinm: anh check thử mấy commit được merge thì thấy có code rồi nha
  [14:22] anhttl: dạ ok
  [09:59] anhttl: anh Tri Nguyen ơi, cus nhờ tạo PR merge vào nhánh develop, anh tạo giúp em với
  [10:02] trinm: ý em làm 1 PR code mới nhất bên mình vào develop bên họ đúng không em ?
  [10:02] anhttl: dạ đúng rồi Tri Nguyen
  [10:09] trinm: ok em vậy chờ xíu nha
  [11:38] trinm: cái code từ develop của họ với của mình conflict nhiều quá
  [12:04] trinm: Screenshot 2026-08-11 at 12.04.08.png
  [12:04] trinm: ủa hình như merge rồi mà 🥲
  [12:41] trinm: nãy bị nhầm PR tạo rồi nha Anh Trinh  https://github.com/Precognize/development/pull/5219
  [12:56] anhttl: tuỵt
  [14:55] tiennd2: image.png
  [14:55] tiennd2: image.png
  [14:55] tiennd2: Anh Trinh: bản chất của cái "Disconnect" ở trên, với cái "Delete Connection" ở dưới là giống nhau đúng ko LA
  [14:57] tiennd2: 
  [14:58] tiennd2: à hình như đều xài /hip
  [15:05] anhttl: giống nhau á Tien Nguyen, cái nào là internal tag (line tím) thì phải /upsertNode để update measurementType = null trước
  [15:06] tiennd2: ok ok để tui check thử, tui test thì issue đang ở line xanh, mà chưa rõ tại sao cái work cái bug
  [15:08] anhttl: ụa tui nói ngược, flow disconnect internal tag là: > /hip > đợi hip xong --> /getbyid của tag mới disconnect > /upsertNo [thread: 1 reply]
    └ [08:35] tiennd2: đã fixed nha
  [11:50] tiennd2: Anh Trinh: cho tui hỏi tí ở ticket này https://precognize.atlassian.net/browse/SR-7645 mình lấy tag report ở đâu á LA @@
  [11:51] tiennd2: nó giống cái export ko
  [11:56] tiennd2: image.png
  [11:56] tiennd2: à ở đây nhỉ :v
  [12:02] anhttl: Đủng ùi á :v
  [09:07] anhttl: anh Tri Nguyen check giúp em với, cus nhắn: @Michelle we've merged last month this PR https://github.com/Precognize/deve ⚠️
  [09:07] anhttl: Check này trước nha anh
  [13:19] trinm: giờ mình có cái demo nào work chạy cái develop không em
  [13:25] anhttl: ý anh cần để test hay sao [thread: 2 replies]
    └ [13:28] trinm: anh thấy demo 3 dùng được
    └ [13:29] anhttl: ừa mà em ko biết nó gắn server nào á
  [13:25] trinm: ừa
  [13:26] duongdn: Cho a mấy info est đi mn
  [13:29] anhttl: em để bên room Active Alerts á
  [13:34] trinm: 
  [13:35] trinm: src/environments/environment.production.ts src/environments/environment.staging.ts anh biết issue rồi do 2 file này nó c
  [13:38] anhttl: ok
  [13:39] trinm: * process-digital-plant/src/environments/environment.production.ts process-digital-plant/src/environments/environments/e
  [15:48] anhttl: Tri Nguyen: anh check giúp em với
  [15:48] anhttl: image.png
  [15:49] anhttl: cái này thì em đoán là do đợt mình turn off cho họ nhưng mình vẫn muốn fix bug song song của 2 tính năng đó nên mình tạo
  [15:52] trinm: nói ổng update thành true 2 cái biến kia rồi build lại là 2 mode kia không bị disabled nữa
  [15:52] trinm: chắc vậy á
  [15:55] anhttl: còn ko cần chỉnh lại trong code chỗ 2 tính năng đó phải hông
