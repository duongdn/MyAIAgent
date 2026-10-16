# Matrix — since 2026-10-12 07:00 +07:00

### Elena - Optimization — 460 messages
  [08:43] vytth: Sam Ha: bển có update UI cho license expired vơi hết usage trên figma rùi a nha
  [08:44] samht: á đù, ngon
  [09:06] anhttl: 9h15 go go nha mn
  [10:36] vytth: Plan tới t4 done full các task thuộc M1 nha mn, để bàn giao cho bên kia  Tiến: Đã xong phần x month data cho tag --> qua
  [10:36] vytth: * Plan tới t4 done full các task thuộc M1 nha mn, để bàn giao cho bên kia  * Tiến: Đã xong phần x month data cho tag -->
  [11:31] anhttl: Chị Vy note thiếu nè. anh Phong Tran fix mấy bug trên redmine trước nha. Mấy bug thuộc scope sẽ release M1 (t4 tuần này)
  [13:29] tiennd2: Anh Trinh, chị Vy Tran  vụ 3 cái field configuration mới ở trang Configuration á, 3 cái value này e default ở backend tr
  [13:31] anhttl: Vy Tran: chị note ý này lại thành CR nha, để tổng hợp 1 vài cái rồi raise 1 lần
  [13:32] tiennd2: hiện 3 field này khai báo cứng ở BE đó nha Anh Trinh, chưa có chỗ để edit
  [13:53] samht: Screenshot 2026-10-12 at 13.53.20.png
  [13:53] samht: check sương sương đâu ra 19 cases cho license từ happy tới edge case
  [13:54] tiennd2: à chị Vy Tran ơi, mình còn 1 cái logic chắc cũng là CR luôn, là thêm 1 role là Optimization á chị
  [13:56] vytth: để làm gì á em
  [13:56] tiennd2: về vụ để Edit/View optimization-model đó chị
  [13:56] tiennd2: * về vụ để Edit/Create/View optimization-model đó chị
  [13:57] tiennd2: bữa có bàn là mình thêm 1 role mới role=Optimization => full access role=Admin...=> full access
  [13:57] anhttl: nói rõ hơn thử xem nha ông
  [13:57] tiennd2: * bữa có bàn là mình thêm 1 role mới role=Optimization => full access cho optimization model role=Admin...=> full access
  [13:57] tiennd2: đây nhe
  [13:59] anhttl: Sao ông lại nghĩ cái này là CR á, nghe nó như là 1 phần của làm task và khi etsimate cũng đã có aware đúng ko
  [14:00] tiennd2: giờ mình thêm role đó, thì cũng phải update UI mà LA, đâu có chỗ sửa role đâu [thread: 2 replies]
    └ [15:25] vytth: confirm vụ này dùng lại bộ role cũ chứ ko thêm OP role gì nha e Anh Trinh
    └ [15:32] anhttl: dạ oke chị Vy Tran
  [14:00] anhttl: tui chưa hiểu a
  [14:02] anhttl: Chắc để chị Vy share thêm info
  [14:02] tiennd2: User Settings -> Permissions
  [14:23] phongtb: image.png
  [14:23] duyvna: a có kèm link figma trong redmine á, nếu k có những data trên thì show như figma là đc
  [14:24] phongtb: tag này có asset và icon tag không a Duy Vo , phải có thì mới show dc
  [14:24] phongtb: image.png
  [14:24] phongtb: này ha
  [14:25] duyvna: đúng rồi e
  [14:25] phongtb: này a Tri Nguyen fix hay e fix a?
  [14:26] phongtb: nếu tag ko có icon rồi show cgi nữa a Duy Vo ? [thread: 3 replies]
    └ [14:27] duyvna: cũng show icon ? lun
    └ [14:27] duyvna: image.png
    └ [14:27] phongtb: ok chốt
  [14:26] trinm: fix luôn đi em update cái icon default và text cho asset thôi
  [14:27] anhttl: anh Trí fix được cái trend chart chưa anh
  [14:27] trinm: rồi nha, đang fix review code của anh Sâm rồi deploy
  [14:28] anhttl: bên Tiến xong cái x month chưa á
  [14:28] tiennd2: xong r nha
  [14:28] tiennd2: đang check vài case cho a Trí test
  [16:48] vytth: bên BE chưa làm gì lien quan tới function đúng hong mn Tien Nguyen Kiet Nguyen
  [16:49] tiennd2: có nha em đang làm nè
  [16:49] vytth: chỗ logic OR/AND e có nắm chưa á
  [16:49] tiennd2: Create Model -> bước Data Exclusion có thêm Function á
  [16:49] tiennd2: cái này bữa a Kiệt nói e ok rồi, mà hình như ko có OR chị Vy oi
  [16:49] vytth: Có OR đó e
  [16:49] tiennd2: thêm Function là chỉ có AND thôi thì phải
  [16:50] vytth: chủ yếu là OR
  [16:50] vytth: qua chị nói lại cho
  [16:50] tiennd2: chắc e qua chỗ chị nói lại khúc đó [thread: 1 reply]
    └ [16:55] vytth: https://precognize.atlassian.net/jira/software/projects/OP/boards/317?filter=&groupBy=none&selectedI
  [16:57] vytth: * chủ yếu trong function là OR
  [08:36] kietnht: alo ae FE Tri Nguyen Sam Ha hình như mấy cái feature làm merge vào nus-base hết rồi mà hả, nếu vậy thì chưa đúng cái wor ⚠️
  [08:47] kietnht: image.png
  [08:48] kietnht: theo workflow này cần có 1 nhánh optimization để deliver, các nhánh khác cần merge vào nhánh này chứ ko phải nus-base. m
  [08:51] trinm: em hiểu là cứ merge nus-base rồi khi nào cần deliver giao code cho họ thì mới cần tach spec chớ
  [08:53] kietnht: có cái script để tự động pick code, nếu làm vậy tới đó ko dùng đc script, phải tự pick tay 🤔
  [08:53] kietnht: image.png
  [08:55] kietnht: giờ chắc a suggest vầy, nhờ a Dương reset lại cái nus-base,  xong checkout ra 1 nhánh feature/optimization cho FE và BE  ⚠️
  [08:55] kietnht: * giờ chắc a suggest vầy, nhờ a Dương reset lại cái nus-base,  xong checkout ra 1 nhánh feature/optimization cho FE và B ⚠️
  [08:58] duongdn: Mn cứ làm đi
  [08:58] duongdn: t4 để a release cho
  [08:59] duongdn: sẵn xem mấy script release nó work ổn hok  tuần rồi cũng chưa check lại
  [09:01] anhttl: Feedback code review cũng còn anh Trí, anh Kiệt, Tiến chưa confirm là đã đọc á. Mn tranh thủ đọc nha. Fix thì hiện giờ c [thread: 5 replies]
    └ [09:02] trinm: anh đọc rồi nha
    └ [09:03] tiennd2: tui ok r nha
    └ [09:04] anhttl: Chắc BE thì anh Kiệt fix, FE thì anh Sâm fix nha Kiet Nguyen, Sam Ha
    └ [09:04] kietnht: uhm, a đang fix
    └ [09:04] samht: bên FE fix r nha e
  [09:01] samht: Han Do: Duy Vo có bug nào chưa mng ơi, thèm lắm r
  [09:01] anhttl: * Feedback code review cũng còn anh Trí, anh Kiệt, Tiến chưa confirm là đã đọc á. Mn tranh thủ đọc nha. Fix thì hiện giờ
  [09:05] anhttl: Các tính năng M1 đã deploy hết rồi á, nay tập trung fix bug nha mn
  [09:05] kietnht: ủa mà Anh Trinh release này là có release code luôn ko
  [09:05] anhttl: Còn nêu ko có bug thì làm tiếp task
  [09:05] anhttl: Có luôn anh
  [09:06] anhttl: Bên repo cus thì chắc cũng tạo 1 nhánh cho optimization á, mình làm từng nhánh cho milestone nhỏ rồi merge vô nhánh chín
  [09:15] anhttl: Phong Tran: hqua anh miss họp catchup, cho em hỏi lại status của anh nha. Thấy redmine thì anh fix hết rồi, còn task jir [thread: 1 reply]
    └ [09:16] phongtb: Trước đó a có làm OP-27 thì đã done UI. Chiều qua a mới nhận thêm task OP-18 -> này đang làm nha e
  [09:16] anhttl: https://redmine.nustechnology.com/issues/81396 con này anh Sâm hay Phong fix đây mn, xử luôn nè [thread: 1 reply]
    └ [09:21] phongtb: ok để a xử
  [09:32] phongtb: image.png
  [09:34] phongtb: chỗ này thấy ko hợp lý Han Do . Có thể tham khảo cái search của google, điền bao nhiêu space thì cũng ko search á
  [09:34] handn: ukie assign lại cho tui nha, chút tui xem lại sau
  [09:58] vytth: > @Michelle I've prepared a dedicated server to have optimization module > Most of the contract API was done and impleme
  [10:13] kietnht: Anh Trinh: release code m1, FE vs BE có chung nhánh ko, hay là riêng như các lần trước
  [10:17] anhttl: Họ cũng ko yêu cầu cụ thể, như lần trước tiện hơn khum anh, tiện thì làm như v luôn
  [11:36] phongtb: Hi a Duong Doan , a có invite member mới vô repo nus được không a? e cần invite account ryan, bữa giờ e dùng acc ken để 
  [11:40] duongdn: ok e
  [11:41] duongdn: done
  [11:41] phongtb: tks a
  [11:50] anhttl: Tien Nguyen, Tri Nguyen: Test case tag ko đủ data với đủ data như nào dạ mấy anh
  [11:50] tiennd2: chờ tui tí
  [11:51] tiennd2: hiện ở step 1 thì test với các tag này nha ``` 2302_PTM_P2_H5_L5460A_PV (có asset nhưng không đủ data) 2302_PTM_P2_H5_L5
  [11:51] tiennd2: Anh Trinh
  [11:53] anhttl: dòng 1 với 2 y chang z Tiến
  [11:54] tiennd2: à nhầm chờ tui chút
  [11:54] tiennd2: * hiện ở step 1 thì test với các tag này nha ``` 2302_PTM_P1_H1_V_TYPE_A_PV (có asset nhưng không đủ data) 2302_PTM_P2_H
  [11:54] tiennd2: ok chỉnh lại rùi nha Anh Trinh
  [13:33] vytth: hình như lộn thứ tự rùi, Cái đầu đủ data á e
  [13:36] duongdn: đang thử release
  [13:36] duongdn: khi nào có 1 cái code chạy được được tí mn, merge vô nus-base, a release phát  :D
  [13:37] vytth: có cái nào có description ko e
  [13:37] vytth: Screenshot From 2026-10-13 13-36-44.png
  [13:37] vytth: Screenshot From 2026-10-13 13-36-33.png
  [13:38] tiennd2: chờ e tí để e update thử
  [13:39] kietnht: a Duong Doan là sao a? a release là làm gì á
  [13:42] tiennd2: chị Vy Tran , e mới update cho 2 tag này có Description nha 2302_PTM_P1_H1_V_TYPE_A_PV 2302_PTM_P2_H5_L5460A_PV
  [13:43] tiennd2: này chắc mọi người muốn test mọi case thì chắc phải qua plants tạo Area -> tạo Canvas -> kéo Asset vào -> assign Tags vô
  [13:43] tiennd2: * này chắc mọi người muốn test mọi case thì chắc phải qua plant2 tạo Area -> tạo Canvas -> kéo Asset vào -> assign Tags 
  [13:43] duongdn: a test script release, xem lấy được đủ code cần ko, nên nếu có bảng nào chạy được thì tốt, dễ test
  [13:43] tiennd2: * này chắc mọi người muốn test mọi case thì chắc phải qua plant2 https://process-digital-plant2.nusdev.net/ tạo Area -> 
  [13:45] kietnht: a Duong Doan cái BE để e collect nha. Còn FE chắc hiện tại nó ở nus-base hết rồi. Nó lấy code FE là đc rồi nha a.
  [13:46] kietnht: * a Duong Doan cái BE để e collect nha. Còn FE chắc hiện tại nó ở nus-base hết rồi. a lấy code FE là đc rồi nha a.
  [13:47] duongdn: ok, cứ merge vô nus-rebase đi nha, xong a release thử
  [13:50] vytth: image.png
  [13:51] tiennd2: để e check
  [13:51] vytth: Tien Nguyen: "hasEnoughData": false  field này bao gồm cả tag k có data luôn ko e
  [13:51] vytth: hhay ko đủ thôi
  [13:52] tiennd2: chung luôn á chị, ko có data cũng sẽ trả về false
  [13:53] vytth: image.png
  [13:53] vytth: bên figma  đang có màn ko có data có show text như hình
  [13:54] vytth: mình đang gộp chung case ko data với ko đủ data á
  [13:54] tiennd2: để e trả thêm 1 field nữa để FE handle
  [13:55] vytth: oki em, a Duy Vo follow nha
  [13:55] duyvna: image.png
  [13:56] duyvna: với sẵn check dùm sao nãy giờ a chọn mấy cái asset có đủ data mà k load đc trend graph
  [13:56] trinm: gửi cái name tag em xem thử anh
  [13:57] duyvna: 2302_PTM_UT_CG_SUBTE0207_1
  [13:58] trinm: Screenshot 2026-10-13 at 13.58.05.png
  [13:58] trinm: ủa em test thấy bth mà
  [13:59] duyvna: vậy chắc bên a dính cache gì rồi, để a clear check lại
  [14:12] vytth: chỉ có nick Tom là vô được cái link này thôi đúng ko mn
  [14:13] vytth: check thử vô dc ko giúp e với Kiet Nguyen Tien Nguyen
  [14:13] tiennd2: Tom với Brian hiện vô được á chị
  [14:16] kietnht: cái link docs thì a vào đc nha
  [14:16] anhttl: Tien Nguyen: nhờ ông quăng doc này lên confluence nếu chưa nha. dev BE nhớ cập nhật docs cho FE integrate vô đó luôn, đỡ
  [14:17] tiennd2: ủa sao file này tiếng việt thế :v
  [14:17] tiennd2: có sao ko mng
  [14:18] anhttl: có sao :)) translate sang ín lịt nha
  [14:18] tiennd2: ma oi này tui làm sau nha :v file cũng nhiều text á
  [14:19] vytth: bên FE lấy acc trong jira vào link này xem thử có dc ko mn ơi Sam Ha Tri Nguyen Phong Tran
  [14:21] phongtb: image.png
  [14:21] phongtb: acc aron nha
  [14:28] vytth: còn acc hai a đang dùng vô dc ko Sam Ha Tri Nguyen, e xin luôn 1 thể
  [14:29] anhttl: License_Service_Docs_EN.md
  [14:29] tiennd2: đỉnh zị :v
  [14:29] anhttl: rốp rẻng luôn đi chứ ko đợi được =))
  [14:30] tiennd2: ok để tui up lên confluence
  [14:31] samht: a vô = aron, vô dc nha Vy ơi
  [14:42] tiennd2: https://precognize.atlassian.net/wiki/x/AoB6RgE check thử link này nữa nha mọi người oi @room
  [15:45] tiennd2: a Tri Nguyen
  [15:55] tiennd2: chị Vy Tran, vụ show "No History", case này ở UI thì mình cũng ko show chart, cũng k cho Next với check thêm cái này cũn
  [15:55] tiennd2: * chị Vy Tran, vụ show "No History", case này ở UI thì mình cũng ko show chart, cũng k cho Next với check thêm cái này c
  [16:00] tiennd2: * chị Vy Tran, vụ show "No History", case này ở UI thì mình cũng ko show chart, cũng k cho Next với check thêm cái này c
  [16:03] vytth: Anh Trinh: quyết giúp c cái này nha
  [16:04] anhttl: Chỗ đó mình show text là ko có hoặc ko đủ nha, khỏi cần tách
  [16:06] tiennd2: v API ko thay đổi nha a Tri Nguyen , đổi text th nha a
  [16:09] duongdn: plan release vẫn ngày mai hỉ mn ?
  [16:12] anhttl: Dạ
  [16:13] duongdn: vậy cuối giờ mn push code phát nha, a thử release xem, có gì lỗi a fix luôn để mai khỏi cập rập
  [08:43] samht: 🙈 có bug gì k ae ơi
  [09:19] anhttl: go go thôi mn
  [09:51] vytth: Sáng nay + đầu giờ chiều QC verify lại full các bugs lần cuối để release  * A Kiệt check task Kfir assign, Integrate API
  [09:57] vytth: * Sáng nay + đầu giờ chiều QC verify lại full các bugs lần cuối để release - A Kiệt check task Kfir assign, add API cho 
  [09:58] vytth: * Sáng nay + đầu giờ chiều QC verify lại full các bugs lần cuối để release - A Kiệt check task Kfir assign, integrate AP
  [10:12] anhttl: Tri Nguyen, Kiet Nguyen: mà ý anh Dương nói hồi nãy cũng hợp lý, mình có bên xử lý như nào để có 2 môi trường xem như là [thread: 3 replies] ⚠️
    └ [10:22] trinm: Anh Trinh: nếu tach 2 môi trường thì release chỉ release theo milestone tại sợ nếu release hết nhiều
    └ [10:23] anhttl: nên em h phân vân quớ ~~
    └ [10:24] kietnht: hmmm, để nghĩ, đang chưa biết sao nữa :v
  [10:14] kietnht: giờ setup backend nữa hơi tốn time nha, chắc dùng tạm cái này đi, rồi khi họ đưa server để test cái algorithm thì dùng c
  [10:14] kietnht: * giờ setup backend nữa hơi tốn time nha e, chắc dùng tạm cái này đi, rồi khi họ đưa server để test cái algorithm thì dù
  [10:15] trinm: FE thì có thể tận dụng lại cái https://process-digital-plant2.nusdev.net làm external cho họ cũng được
  [10:16] anhttl: dùng cái active-alert BE cho internal thì có giao tiếp dược với cái rabitMQ kia hông
  [10:18] anhttl: 2 anh nghĩ là nên move bây giờ luôn, hay là tới khi nào cảm thấy test song song với họ khó quá thì mới tách. Do 2 issue 
  [10:18] anhttl: Thì sẽ đỡ công setup với maintain nhánh nhiếc
  [10:24] kietnht: * hmmm, để nghĩ, đang chưa nên biết sao nữa :v
  [10:37] tiennd2: chị Vy Tran , OP-34 thì hiện tại e lấy rolling window default là 1 năm luôn nha, trong ticket có ý này https://precogniz
  [10:38] vytth: đúng rồi nha em. Tham khảo thêm ticket bên FE lun nha https://precognize.atlassian.net/jira/software/projects/OP/boards/
  [10:43] duongdn: https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/348/
  [10:44] duongdn: có vẻ release nhìn cũng ổn ổn đó
  [10:44] duongdn: Mn thử deploy nhánh này xem có work hok nha  release/2026-10-14
  [10:48] kietnht: * hmmm, để nghĩ, đang chưa biết nên sao nữa :v
  [10:53] trinm: em build branch này trên https://active-alerts.nusdev.net/ rồi nha
  [11:20] duyvna: Kiet Nguyen: kiếm giúp a vài asset có trend history tầm 1 năm hoặc 2 năm được ko e?
  [11:24] trinm: em vừa mới pick 1 commit fix cho cái chart đã lọc spec ra rồi push lên branch này để build cho QC test nha anh
  [11:24] tiennd2: em làm hỏi em nè anh Duy Vo 😂 [thread: 1 reply]
    └ [11:40] duyvna: vậy mà còn chưa chịu nhả ra nữa, mắc QC đợi tới khi nào
  [11:27] vytth: * Sáng nay + đầu giờ chiều QC verify lại full các bugs lần cuối để release - A Kiệt check task Kfir assign, integrate AP
  [11:27] vytth: * Sáng nay + đầu giờ chiều QC verify lại full các bugs lần cuối để release - A Kiệt check task Kfir assign, integrate AP
  [11:28] tiennd2: hỏi em đàng hoàng đi em kiếm cho
  [11:46] duyvna: * vậy mà còn chưa chịu nhả ra nữa, bắt QC đợi tới khi nào
  [11:51] anhttl: anh Sam Ha ơi, nãy anh nói có: admin của pre, admin users với users thường --> cái này là trong code nó nói như v hả
  [11:54] samht: ừm trước a research từ code thì có 3 level như v về user
  [11:54] vytth: > **Access blocked on both API and UI** >  > * Upload the Monitoring only license > * Try to open the Optimization modul [thread: 1 reply]
    └ [12:02] vytth: ignore tin này đi, được rồi nha anh
  [11:55] vytth: * > **Access blocked on both API and UI** >  > - Upload the Monitoring only license > - Try to open the Optimization mod
  [12:05] kietnht: sorry e đi họp :v
  [12:07] tiennd2: nãy e đi họp a Duy Vo
  [12:23] tiennd2: ủa mà ý a là sao z, trend của tag chứ làm gì có trend của asset, với cái data tính đang tình ở step 1 là 1 năm trở lại đ
  [12:23] tiennd2: * ủa mà ý a là sao z, trend của tag chứ làm gì có trend của asset, với cái data tính đang tình ở step 1 là 1 năm trở lại
  [12:25] tiennd2: * ủa mà ý a là sao z, trend của tag chứ làm gì có trend của asset, với cái data tính đang tính ở step 1 là 1 năm trở lại
  [13:22] duyvna: vậy kiếm cái tag nào có cỡ 7-8th  cho a cũng đc
  [13:23] kietnht: hình như maximum cái time range dưới FE là 1 year thì phải, giả sử cái tag có data nhiều hơn 1 năm thì cũng ko check đc
  [13:23] kietnht: * hình như maximum cái time range dưới FE của cái chart là 1 year thì phải, giả sử cái tag có data nhiều hơn 1 năm thì c
  [13:26] vytth: > <@tiennd2:nustechnology.com> ủa mà ý a là sao z, trend của tag chứ làm gì có trend của asset, với cái data tính đang t
  [13:26] vytth: Ý test thôi. Chứ giờ thì là default, lỡ sau hỏi muốn đổi
  [13:27] vytth: * Ý test thôi. Chứ giờ thì là default, lỡ sau họ muốn đổi
  [13:27] tiennd2: à này trước đó e đổi để test r vẫn ok nha
  [13:29] tiennd2: a Duy Vo  4 tag này là gần 8 tháng nha a 2302_PTM_P2_H4_PHCV4340A_MV 2302_PTM_P1_H2_FCV2502A_MV 2302_PTM_UT_UT_SM4100I_K
  [13:29] duyvna: ok thks e
  [13:30] anhttl: có tag nào là điểm đầu với điểm cuối thì dài, nhưng tgian có data cộng lại < C ko Tiến
  [13:31] tiennd2: này hơi căng mà để tui thử
  [13:34] tiennd2: ủa mà < C thì sao test trên UI được Anh Trinh :v
  [13:44] anhttl: để confirm là FE làm đúng á. Nếu ko hiện thì đúng
  [13:47] vytth: cái zoom oke chưa á anh Tri Nguyen
  [13:47] trinm: ok rồi em
  [13:51] tiennd2: Anh Trinh: giờ chắc dễ nhất đi, tui gửi mọi người 1 list các tag có tổng thời gian có data <= 1 tháng. tui lấy list này 
  [13:52] anhttl: FYI mn, nếu muốn xem data full của trong 1 năm gần nhất, thì mn có thể vào 2 chỗ này nha: + Active Alerts > double click
  [13:52] anhttl: image.png
  [13:53] anhttl: @room lưu ý để nếu cần thì có thể check nhanh nhe
  [13:53] anhttl: Ví dụ data viewer:
  [13:53] anhttl: image.png
  [13:53] anhttl: * FYI mn, nếu muốn xem data full của trong 1 năm gần nhất, thì mn có thể vào 2 chỗ này nha: - Active Alerts > double cli
  [13:54] anhttl: * FYI mn, nếu muốn xem data full của trong 1 năm gần nhất, thì mn có thể vào 2 chỗ này nha: - Active Alerts > double cli
  [13:54] anhttl: hiểu ý này ko anh Duy Vo, chị Han Do
  [13:55] duyvna: hỉu nha e
  [14:01] tiennd2: đại ý là những tag mà không show cái trend á mọi người verify lại bằng cách compare với bên AA xem đúng ko ``` 2302_PTM_ [thread: 8 replies]
    └ [14:08] duyvna: là nếu bên AA có show mà bên OP ko show là bug phải ko em
    └ [14:09] tiennd2: điều kiện nữa a, phải check tổng thời gian có data
    └ [14:09] anhttl: Bản chất mấy tag đó là gì Tien Nguyen? nhưng tag ko đủ x month data hay sao á
    └ [14:09] tiennd2: đúng rồi
    └ [14:09] tiennd2: ko đủ x month data
    └ [14:10] anhttl: Có nghĩa là, những tag trên ko đủ x month data nên nó ko đủ ddkien để add ở OP, nên show ở AA nhưng 
    └ [14:11] duyvna: ok e, chắc nhiu đây case đủ rồi. Chờ Elena vào khai sáng thêm
    └ [14:14] tiennd2: a check hết cái list chưa
  [14:01] tiennd2: đây nha a Duy Vo , c Han Do
  [14:25] anhttl: Tien Nguyen: QC muốn 1 case nữa nha ông, là điểm đầu tới điểm cuối bao lâu cũng được, nhưng mỗi tháng chỉ khoảng 1 vài n [thread: 6 replies]
    └ [14:26] tiennd2: khoan là nó show cái trend bên OP đúng ko
    └ [14:26] tiennd2: 30 - 35 ngày
    └ [14:27] tiennd2: đủ điều kiện show trend
    └ [14:29] anhttl: Yep đang muốn test caseo đó nữa
    └ [14:29] tiennd2: > nhưng mỗi tháng chỉ khoảng 1 vài ngày có data thôi này thì khó check
    └ [14:29] tiennd2: như cũ thôi, tui gửi mọi người 1 list tag tiếp
  [14:25] anhttl: Case này có kiếm đc ko ông
  [14:25] anhttl: https://github.com/Precognize/development/pull/5506 PR này ai tạo z mấy anh
  [14:26] kietnht: PR release cho BE
  [14:26] kietnht: sao á
  [14:27] tiennd2: * thỏa mãn cái điều kiện 1 month of data
  [14:30] anhttl: Bữa em nói rùi mà ko nhớ hẻ. Mình ko có merge vô develop, chỉ tạo PR  merge vô nhánh chung (vd như nhánh optimization) t
  [14:30] kietnht: uhm, để tạo 1 nhánh chung rồi change base cái PR
  [14:30] kietnht: a tạo để check trước thôi
  [14:31] anhttl: Kfir dô hỏi á
  [14:32] kietnht: Update nha
  [14:32] kietnht: image.png
  [14:33] kietnht: tạo nhánh feature/optimization cho cả scope này (FE vs BE) nha
  [14:35] anhttl: What is your feature branch you work on when merging after code review? [2:32 PM]I want algorithms will build with it to
  [14:35] anhttl: anh dô rep ổng ik
  [14:36] kietnht: a mới tạo nhánh này: `feature/optimization` e vào rep ổng dùm a cái nha
  [14:36] kietnht: cái slack mấy nay bị out chưa vào đc
  [14:36] anhttl: oki
  [14:45] tiennd2: hiện ko tag nào thỏa cả nha
  [14:46] duongdn: https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/351
  [14:46] duongdn: này có vẻ ko ổn rồi, nhánh này nó conflict tè le với script release luôn
  [14:47] duongdn: base của mình ko phải là develop à?
  [14:47] duongdn: nhánh nus-base là tách ra từ develop á
  [14:52] kietnht: base là develop a
  [14:53] kietnht: chắc nó bị out date vs develop, dính code backend tùm lum
  [14:55] duongdn: check xem, chứ hiện tại là ko release được rồi, FE thì đang ok , up-to-date với develop https://github.com/nustechnology
  [14:56] kietnht: ko a, giờ đưa họ PR vào feature/optimization cho mile stone này
  [14:56] kietnht: feature/optimization vào develop là cho cả scope
  [14:57] duongdn: hum  ... ok để xem nó có conflict gì mà tùm lum vậy
  [14:58] kietnht: tức là hôm nay mình expect là 2 pr vào feature/optimization cho BE vs FE
  [15:02] anhttl: Họ cũng có nói mình nhớ merge develop vô nhánh đang làm thường xuyên để luôn align á
  [15:05] duongdn: lúc trước a đang base nhánh devevelop script của a thì đã base trên develop rồi, PR sạch, ko conflict gì Còn nhánh optim
  [15:06] duongdn: https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/348 (FE to develop, clean) https://github.com/nustech
  [15:06] kietnht: hmmm, đợi tí e check
  [15:06] kietnht: nhánh feature/optimization nhớ e check từ develop
  [15:06] kietnht: sao giờ thấy lạ lạ
  [15:08] duongdn: - Nghiêm trọng hơn: tree của nus/feature/optimization đang có 318 file OpenSpec/ai_docs. Nếu branch này được push lên or
  [15:08] duongdn: AI nó nói thế này
  [15:08] duongdn: nhánh optimize có vẻ hok dùng để release được ...
  [15:08] kietnht: à ko a
  [15:09] kietnht: nhánh feature/optimization này e đang nói là origin nha a
  [15:09] kietnht: repo của khách hàng
  [15:09] kietnht: chứ ko phải internal
  [15:10] kietnht: a push nhánh này lên origin, xong base vào feature/optimization thử xem
  [15:10] kietnht: * a push nhánh này lên origin, xong base vào feature/optimization thử xem (trên origin)
  [15:10] kietnht: chắc là ok
  [15:10] duongdn: ui đặt tên giống nhau mà code khác ở 2 repo à, khó zị  Để thử
  [15:11] kietnht: bữa e test mà quên xóa @@
  [15:12] duongdn: https://github.com/Precognize/development/pull/5508
  [15:12] duongdn: chắc đúng
  [15:12] duongdn: ngon đấy
  [15:21] kietnht: a Duong Doan e xóa nhánh này trên nus remote nha
  [15:21] kietnht: image.png
  [15:24] duongdn: ok, mà e sync lại từ external đi, để mình thử tạo PR release bên internal trước xem ổn ko trước khi tạo external
  [15:25] duongdn: cho AI review code abc chăng hạn
  [15:44] kietnht: có tạo nhánh trên nus: `feature/nus-optimization` rồi nha a Duong Doan . a muốn test thì a có thể tạo PR vào đó
  [15:44] kietnht: image.png
  [15:57] anhttl: Sắp release được chưa mn ui, còn thiếu/chờ gì nữa á
  [16:02] duongdn: Bên FE còn code gì mới ko
  [16:02] duongdn: tạo lại nhánh release nghen
  [16:04] handn: image.png
  [16:04] handn: a Duy mới log 2 con này á Anh Trinh
  [16:04] handn: chờ luôn
  [16:06] trinm: https://redmine.nustechnology.com/issues/81436 cái này nhớ bỏ yêu cầu vụ unit rồi mà nhỉ
  [16:07] anhttl: anh Duy Vo log bug sao ko điền đủ context để dev check cho nhanh
  [16:07] vytth: bỏ unit check trong function thôi á
  [16:07] anhttl: image.png
  [16:07] vytth: còn unit trên chart vẫn show á a
  [16:08] anhttl: Tri Nguyen: 1 tag có 3 unit đó trong active alert em thấy nó có pick ra 1 unit được nha
  [16:08] tiennd2: image.png
  [16:09] anhttl: image.png
  [16:12] anhttl: 
  [16:12] anhttl: bug còn lại nha
  [16:13] anhttl: image.png
  [16:13] vytth: image.png
  [16:13] duongdn: https://github.com/Precognize/development/pull/5511
  [16:13] duongdn: đã release FE
  [16:15] anhttl: Retry trend data là cái gìiiii --> chắc sửa lại là Retry thui anh Tri Nguyen
  [16:21] anhttl: Mấy cái ngữ pháp, wording đồ thì nhớ viết đúng với có ý nghĩa nha, ko biết viết sao thì hỏi BA nhe. Tri Nguyen anh add r
  [16:21] tiennd2: https://github.com/Precognize/development/pull/5512 PR release BE
  [16:22] duongdn: bỏ description vào :v
  [16:22] anhttl: Cái ý về unit thì giờ mình khoan fix gì, có thể raise lên cho bả issue là code hiện tại đang lấy unit đầu tiên, như vậy 
  [16:26] anhttl: Rì li thui cả nhà
  [16:53] vytth: em báo done cho khách nha mn
  [16:53] vytth: * em báo done release cho khách nha mn
  [16:54] kietnht: bên cái license có cần gửi mấy key cho bả test ko á
  [16:54] vytth: có include trong message nha anh
  [16:54] kietnht: uhm, ok e
  [17:02] vytth: Mình báo done release cho khách rồi nha mn  https://samguard-mobile.slack.com/archives/C0C0C5A05D5/p1791972031920789
  [17:07] anhttl: Từ mai mn log task log chọn 2 tag là Optimization với OP-M2 giùm em nha @room
  [09:06] anhttl: Kiet Nguyen: Bên BE có check mấy update của ổng về integration algo chưa anh Kfir Bernstein  [8:44 PM] @Michelle I've pr
  [09:07] kietnht: cái đó a đang làm nha
  [09:08] phongtb: Nay a có time bên Kevin Kung - fix bugs với release, a qua bên đó trước rồi còn time a qua lại bên này nha Anh Trinh , c
  [09:10] anhttl: Mn có task làm tiếp hết chưa? cc Vy Tran  T6 anh Sâm làm bên khác full, anh Phong off nha mn. Chia task hợp lý nha.  Ngà
  [09:49] tiennd2: chị Vy Tran  `No unit check: tags with different units can be combined.  ` ý này ở OP-34 mình skip đúng k chị
  [09:49] vytth: đúng rồi á
  [09:49] vytth: cộng lại thôi
  [09:50] vytth: * cộng/trừ/... lại thôi
  [09:50] tiennd2: okay chị lun
  [10:09] anhttl: Vy Tran: mn có task làm hết chưa chị
  [10:10] vytth: rồi nha em
  [10:11] vytth: task đang làm bên cột In progress á
  [10:16] anhttl: Trên board có 4 task của Ryan lận, cụ thể là đang làm 4 task luôn à [thread: 5 replies]
    └ [10:16] vytth: cái nào a Phong Tran dev done thì move nha
    └ [10:17] phongtb: ok
    └ [10:21] anhttl: Ngoài là dev làm xong tự kéo thì trong các meeting hoặc update trên room, ví dụ có update status thì
    └ [10:21] phongtb: updated ae, mà có tag/label nào để đánh dấu là chưa integrate api ko ae
    └ [10:22] anhttl: bữa em có tạo cái integration-needed á, anh pick label đó nha
  [10:16] anhttl: Với em chưa thấy task của Brian [thread: 6 replies]
    └ [10:18] vytth: sáng có thấy 1 ticket fix code review
    └ [10:18] vytth: ảnh mới done rồi em
    └ [10:18] vytth: https://matrix.to/#/!KGfMOdTMWQwLObwAEk:nustechnology.com/$zWvIC3EE3Ogh2iLQSdNjd8UAtENm67i6nBPy5j2Ur
    └ [10:18] vytth: còn cái này
    └ [10:19] anhttl: cái code review, em mới kéo done, mà nó done từ hôm trước rồi chứ đâu phải in progress sáng nay đâu.
    └ [10:20] vytth: oke em
  [10:18] vytth: .
  [10:19] kietnht: add dùm a cái ticket đó nha :v
  [11:04] dongnv: image.png
  [11:05] dongnv: Sao ở đây lại là Tom push code nhỉ?
  [11:05] tiennd2: ủa đúng k mng, e tưởng Tom với Brian
  [11:06] dongnv: Anh không chắc nữa, anh thấy lạ thôi, Tom out dự án rồi nhưng giờ lại xuất hiện.
  [11:06] kietnht: KH nói gì hay sao, hôm qua a nhờ Tiến tạo PR. Với họ biết Tom có làm trong scope này mà?
  [11:07] tiennd2: à này ko sao a, Tom vẫn còn trong slack
  [11:07] tiennd2: trước đó là end contract hourly
  [11:07] dongnv: Khách hàng không nói gì, nhưng em để ý chút chứ sợ commit sai tên này nọ.
  [11:08] tiennd2: okay a, này ổn ko sao nha
  [11:08] dongnv: OK em.
  [15:07] kietnht: Vy Tran:  chỗ cái Wizard Steps, ví dụ: Model đang có status DRAFT, FE load model vào cái wizard. - a đang ở step 3, điền
  [15:11] vytth: lưu cả 2 á anh.
  [15:12] vytth: điền xong step 3 rồi qua previous thì data step 3 nằm trong draft rui.
  [15:18] anhttl: này dự án bên khác á, ko sao nha anh Đông
  [15:37] vytth: > Regarding the known issues, I have two comments: > 1. First item: Are these values hardcoded directly in the source co [thread: 3 replies]
    └ [15:39] vytth: câu 2 vậy ignore behavior bên AA, rồi show units nối bằng commas e ha Anh Trinh
    └ [15:40] tiennd2: câu 1: là mình có define configurable parameters in a configuration file nha
    └ [15:40] anhttl: dạ
  [15:37] vytth: * > Regarding the known issues, I have two comments: >  > 1. First item: Are these values hardcoded directly in the sour
  [15:37] vytth: * > Regarding the known issues, I have two comments: >  > 1. First item: Are these values hardcoded directly in the sour
  [15:38] vytth: * > Regarding the known issues, I have two comments: >  > 1. First item: Are these values hardcoded directly in the sour
  [15:38] vytth: * > Regarding the known issues, I have two comments: >  > 1. First item: Are these values hardcoded directly in the sour
  [15:39] vytth: * > Regarding the known issues, I have two comments: >  > 1. First item: Are these values hardcoded directly in the sour
  [15:39] vytth: * > Regarding the known issues, I have two comments: >  > 1. First item: Are these values hardcoded directly in the sour
  [15:40] kietnht: Anh Trinh: a nhớ bữa e có chuyển cái docs của Tuấn qua eng, chắc share bả nha
  [15:42] anhttl: Tiến đưa lên Confluence luôn r thì phải. Vy Tran chị nói bả là mặc định tụi t sẽ bỏ tất cả documentation lên Confluence 
  [15:42] anhttl: * Tiến đưa lên Confluence luôn r thì phải. Vy Tran chị nói bả là mặc định tụi t sẽ bỏ tất cả documentation lên Confluenc
  [15:42] tiennd2: docs đây nha mng https://precognize.atlassian.net/wiki/x/AoB6RgE
  [15:46] vytth: còn cái vụ bả tự kêu license independently sao anh Kiet Nguyen  , ý bả muốn bên bả tự gen chứ ko phải bên minh đưa cho b
  [15:48] kietnht: họ sẽ dùng command, cái code mình đã đưa lên rồi, dùng command rồi pass các tham số vào
  [15:49] kietnht: image.png
  [15:49] kietnht: trong docs có nói
  [15:49] vytth: như vậy là đủ để bả tự biết gen rồi hả, có cần hd thêm gì nữa ko anh
  [15:50] vytth: * còn cái vụ bả tự kêu license independently sao anh Kiet Nguyen  , ý bả muốn bên bả tự gen chứ ko phải lấy key bên minh
  [15:50] kietnht: cơ bản là đủ, giống lúc gen cái monitor vậy
  [16:01] kietnht: Vy Tran:  khoan gửi bả nha
  [16:01] kietnht: a check cái, Tuấn nó quăng cho AI gen
  [16:01] vytth: gưi rầu
  [16:01] vytth: sao á
  [16:01] kietnht: vài cái a thấy ko make sense lắm
  [16:01] vytth: :)))
  [16:01] vytth: zạy sửa đi anh
  [16:02] kietnht: uhm, checking @@
  [16:12] vytth: sao roi anh ơi
  [16:14] kietnht: đưa a lại cái file cái, để sửa luôn lên confluence
  [16:15] vytth: nè anh
  [16:22] vytth: nào sửa xong ok nhắn e biết nha
  [16:25] kietnht: nhắn tạm bả nói tui đang update lại docs chút nha :v
  [16:26] vytth: lâu ko á anh
  [16:28] kietnht: 15p nữa đi
  [17:01] kietnht: https://precognize.atlassian.net/wiki/spaces/PD/pages/5484904451/License+Service
  [17:01] kietnht: kêu bả vô mục số 9 check nha Vy Tran
  [17:01] kietnht: cái confluence page khó xài quá
  [17:05] anhttl: hắn bị răng
  [17:05] vytth: okie e thấy rồi nha, cảm ơn síp
  [17:06] kietnht: paste vào nó ko ăn format @@
  [17:09] anhttl: thấy Tiến paste vào oke mà te, anh paste markdown mà ko được hả
  [17:10] kietnht: ừa, do cái editor của a
  [17:17] kietnht: Vy Tran: back lại chỗ này cái, ý là nếu đang step 3 back lại step 2 thì UI có show cái model loss change gì ko
  [17:17] kietnht: * Vy Tran: back lại chỗ này cái, ý là nếu đang step 3 back lại step 2 thì UI có show cái modal loss change gì ko
  [17:18] phongtb: In progress: OP-52 Dev done: OP-14, OP-15, OP-18, OP-20 => Những tasks dev done đều đang là `integration-needed` nếu có 
  [17:19] vytth: e expect là nó tự lưu chứ ko càn phải hỏi á
  [09:17] anhttl: Go go mn ơi
  [09:46] vytth: * a Trí: bê dàn header qua OP, integrate API cho highlight, model steps  * a Kiệt: lên API cho full model steps  * e Tiế
  [09:54] tiennd2: vụ performance với show list chiều e check nha
  [09:57] kietnht: khoan, nãy nói rồi, việc add quá nhiều tag lên cái trend thì việc browser nó đơ là bt thôi, behaviour cũ cũng vậy. E che
  [09:57] tiennd2: okay a lun
  [09:58] kietnht: * khoan, nãy nói rồi, việc add quá nhiều tag lên cái trend graph thì browser nó đơ là bt thôi, behaviour cũ cũng vậy. E 
  [10:29] trinm: Screenshot 2026-10-16 at 10.29.30.png
  [10:30] trinm: Screenshot 2026-10-16 at 10.29.42.png
  [10:30] trinm: hình như mỗi page 1 UI , giờ mình làm theo cái nào nhỉ
  [10:30] anhttl: cái ở trên á anh
  [10:31] trinm: vậy copy giống AA hết nhé
  [10:31] anhttl: yep
  [11:05] tiennd2: image.png
  [11:05] tiennd2: chị Vy Tran , về cái màu ở từng khoảng highlight này
  [11:05] tiennd2: mấy cái màu này có ý nghĩa gì ko chị
  [11:12] anhttl: Ví dụ trong step 3 mình cần add các data exclusion. Mỗi cái khoảng đó là 1 cụm data exclusion. Mỗi cụm data exclusion có
  [11:13] tiennd2: à v mỗi cái màu đó chắc là cho mỗi cụm data exclusion
  [11:18] anhttl: Vy Tran Mấy này trên ticket cũng cần giải thích cho dev với QC hiểu do nhìn UI ko cũng ko đủ self-explained để nhìn dô h
  [11:19] vytth: okii e
  [11:20] anhttl: Update ticket xogn hú em nhe [thread: 6 replies]
    └ [14:04] vytth: rồi nha e Anh Trinh
    └ [14:06] anhttl: em coi ticket nào đc ta
    └ [14:06] vytth: https://precognize.atlassian.net/jira/software/projects/OP/boards/317?filter=(fixVersion%20%3D%20M2)
    └ [14:06] vytth: hai cái này nha
    └ [14:10] anhttl: Em ko thấy ý quy định màu ta, màu random hay set ở đâu á
    └ [14:13] vytth: hình như là random, và expect là reuse lại highlight function từ AA á
  [11:42] tiennd2: docs cho vụ highlight đây nha a Tri Nguyen  https://precognize.atlassian.net/wiki/x/CwDnRgE à note 1 cái nữa ở FE là cái
  [13:17] kietnht: server Down để build chút nha. sync vs develop mà build lỗi quá
  [13:38] kietnht: UP nha
  [13:47] tiennd2: ticket này chắc em ôm hết luôn nha chị Vy Tran
  [13:52] tiennd2: https://precognize.atlassian.net/browse/OP-43
  [13:53] kietnht: Ưu tiên cái nào cho cái release M2 trước nha
  [14:07] vytth: * hai cái này nha Anh Trinh
  [14:47] tiennd2: image.png
  [14:48] tiennd2: chị Vy Tran , cái band ở chỗ này là gì á chị Vy oi
  [15:35] kietnht: hú, tí mình về sớm, tối onl lại. Cái API upsert đã deploy, có docs trên confluence. Nếu có ai làm qua thì a nhờ Tiến tra
