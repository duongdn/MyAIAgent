# Matrix — since 2026-10-07 09:30 +07:00

### Elena - Optimization — 333 messages
  [09:56] tiennd2: hiện API docs mình xem ở đây nha mng https://precognize.atlassian.net/wiki/spaces/PD/pages/819395/API+-+Java+-+Server An
  [09:57] anhttl: chị Vy Tran hỏi đâu
  [09:57] anhttl: * chị Vy Tran hỏi bả thử
  [09:59] kietnht: rồi vụ license clear hết chưa, coi lên trước cái đó cho QC test nè
  [09:59] kietnht: * rồi vụ license clear hết chưa ae :v, coi lên trước cái đó cho QC test nè
  [10:02] tuanntg: a Sam Ha  đây là 3 key license cho 3 case: only OP, only Monitor, all.
  [10:03] tuanntg: Licenses.zip
  [10:03] samht: ngon, để a lụm
  [10:04] tuanntg: a upload lên sau đó test API status nó trả về như thế nào cho từng case
  [10:05] kietnht: hú Sam Ha Tri Nguyen  ai làm cái save draft á, send cái ticket để coi req thử
  [10:06] vytth: * e Tien: Search Tag done. Chuẩn bị làm microservice + làm create model cùng a Kiệt * A Phong: Run Table (Done), Manage 
  [10:06] samht: Op-13 ó ní
  [10:06] kietnht: > Review Code License + Deployed khúc này xong rồi nha
  [10:07] vytth: * - e Tien: Search Tag done. Chuẩn bị làm microservice + làm create model cùng a Kiệt - A Phong: Run Table (Done), Manag
  [10:14] vytth: này nick Michelle ko coi dc hả ta
  [10:15] tiennd2: này trước đó như cho dev thui quá @@
  [10:21] tuanntg: a thấy Brian vô được á, nhưng chắc e hỏi trước coi được Edit, add thêm không trước khi dev đụng vô
  [10:25] anhttl: hỏi bả cho edit để thêm doc được ko, rồi nói bả cho quyền mình add thêm dev vô để xem nha
  [10:25] tiennd2: nếu mà đúng thì cái mục Server API này thì nó chia và format theo structure codebase phía BE, nên nó rải rác còn nếu để 
  [10:27] tuanntg: Đâu e
  [10:27] tuanntg: vẫn đúng structure của BE thôi
  [10:54] kietnht: hú Vy Tran: gửi a req chỗ save draft cái e
  [11:03] vytth: đây nha a https://precognize.atlassian.net/browse/OP-26?atlOrigin=eyJpIjoiNDY3MTFjZGFkMGFiNGI3NTljZWZmMzg0ZTdlMDNmM2QiLC
  [11:40] tuanntg: License_API_Doc.md
  [11:40] tuanntg: a Sam Ha  tạm thời xem doc ở file này đi
  [11:41] tuanntg: Mốt Edit doc trên Confluent sau
  [13:44] anhttl: Sáng mình họp là sẽ deploy được phần upload license, thông tin license với step 1. anh deploy chưa anh Sam Ha ui
  [13:46] samht: a merge cái OP-13 r nha em, còn OP-9 thì mới có API nên a đang làm thêm. Hiện đã show dc data của license rồi, và đang l
  [13:46] anhttl: QC có test được gì từ chỗ này ko anh
  [13:47] anhttl: À với chị Han Do với Vy Tran có distribute chưa á
  [13:52] vytth: distribute rồi em, nhưng Hân chưa có acc Michelle
  [13:54] anhttl: Báo chị Bình nha chị Hân
  [13:55] samht: OP-13 lên staging r nha
  [14:02] anhttl: Tri Nguyen, Sam Ha, Phong Tran: Chỗ nào có hiện ngày tháng là luôn tuân theo configuration trong API /get-all nha mn. Ý 
  [14:05] anhttl: Btw em test sơ UI thì thấy có lỗi UI như này, cần set rule cho AI hay như nào đó, vd như self-test kỹ hơn, để đừng bị lỗ
  [14:05] anhttl: image.png
  [14:05] anhttl: image.png
  [14:07] samht: Screenshot 2026-10-07 at 14.07.10.png
  [14:07] samht: dấu X của e coi lạ v
  [14:07] samht: còn cái ô input để a xem
  [14:07] trinm: này anh có thêm cái pipe rồi chắc để thêm rule cho nó
  [14:08] anhttl: của em nếu zoom lên thì cũng bthg, nma ở size mặc định (máy em là 1920 1080) thì nó vỡ á
  [14:11] samht: chắc máy e gây ra ảo giác r á, tạm ignore nha :( sau r coi lại
  [14:23] duyvna: Trên redmine vẫn log bug bên Elena- Active Alerts hả Anh Trinh
  [14:25] anhttl: dạ, để em rename lại với add thêm dev
  [14:26] anhttl: Link redmine nha mn: https://redmine.nustechnology.com/projects/elena-active-alerts
  [14:27] handn: Anh Trinh: add c dới
  [14:29] anhttl: dạ rùi hihi
  [14:59] kietnht: image.png
  [14:59] kietnht: Tuan Nguyen:  check dùm a ý này
  [14:59] kietnht: này hiện mình chưa có lưu DB gì mà phải ko
  [14:59] kietnht: có phải ổng hỏi cái structure của file license ko ta
  [15:00] tuanntg: Ổng cũng nghĩ như e hồi trước thôi
  [15:00] tuanntg: nghĩ license sẽ lưu DB
  [15:00] tuanntg: nhưng không
  [15:00] tuanntg: nó lưu vô file
  [15:00] tuanntg: và lưu thêm vài thông tin để đối chiếu lại trong licenseHistory
  [15:01] kietnht: vậy lúc upload cái file
  [15:01] kietnht: mình cần init gì ko ta
  [15:02] kietnht: * mình cần init gì ko ta, giả sử mấy cái capacity này kia
  [15:03] tuanntg: Thì mấy cái capacity là mình set lúc đầu rồi ấy a, còn mấy cái mà realtime như usedCredit hay Remain Credit, ... mấy cái
  [15:04] tuanntg: Mấy cái đó có dependencise nên mình không làm gì lúc này
  [15:15] tiennd2: chị Vy Tran , hiện nếu 1 Optimization Model được create thành công hết tất cả rồi, thì chỉ có người tạo mới edit được nó
  [15:17] anhttl: hmmm hay á, model là ai sẽ được xem ta, chỉ người tạo hay là thất cả người trong plant
  [15:17] tiennd2: cho là Draft Model luôn, thì quyền edit như thế nào á
  [15:17] tiennd2: đúng r kiểu kiểu z :v tại plant có một mớ user
  [15:20] anhttl: Tri Nguyen: role Michelle của e có dev mode rồi nha, chắc anh cũng có r đó
  [15:22] trinm: ngon có rồi em
  [15:23] anhttl: test thử rồi ngon thì báo cho mn xài MCP luôn [thread: 8 replies]
    └ [15:38] trinm: hình như là không phải vào dev mode là được tăng connect 🥲
    └ [15:38] trinm: Để aron có quota MCP cao (200/ngày) Cần làm một trong hai: Phương án 1 (recommend, rẻ): Invite aron 
    └ [15:39] anhttl: là như hiện giờ anh có dev mode là đã có xài được mcp chưa
    └ [15:39] trinm: muốn tằng quota connect MCP chắc phải thêm tiền còn hiện tại connect được mà có 20 call / month thôi
    └ [15:40] trinm: ken 20 lần aron 20 lần 😅
    └ [16:23] anhttl: vậy xài tạm đc ko anh Tri Nguyen
    └ [16:24] trinm: ừa chắc thôi tạm vậy đi có dev mode cũng xem được nhiều info hơn trước rồi
    └ [16:24] anhttl: oki
  [15:39] vytth: hình như nó ko nói tới người tạo đâu, nó chỉ care permission của user đó thôi.
  [15:40] vytth: nên nếu model lên trong list rồi thì bât kỳ ai có quyền đều edit đc á. Giông như cái AA nhỉ em Anh Trinh
  [15:42] anhttl: vậy như nào là có quyền á, này chắc confirm lại nha chị. ý Tiến là Tiến chưa rõ ai có quyền á. VD như bất kỳ ai trong pl
  [15:43] anhttl: thằng AA thì object là alert. thằng Optimization mình tạo ra object mới luôn nên ko biết có rule y chang AA ko á
  [15:52] vytth: ``` Now about the tag data itself. For a tag to qualify as having a minimum of X months of data, say 3 months, which of 
  [15:53] vytth: Tien Nguyen, Kiet Nguyen bả trả lời vầy nha. mn hiểu ko
  [16:10] tiennd2: > Of course we are using the aggregation function in influx. But the thing is, we need to define the "start" time that w
  [16:10] tiennd2: chị Vy Tran
  [16:10] tiennd2: * > Of course we are using the aggregation function in influx. But the thing is, we need to define the "start" time that
  [16:11] tiennd2: * > Of course we are using the aggregation function in influx. But the thing is, we need to define the "start" time that
  [16:12] tiennd2: câu trả lời trên của bả giống như là bả chỉ mình cách tính toán thôi :v mà mình đang dùng vậy rùi nên confirm thêm ý này
  [16:12] tiennd2: chị check r chỉnh lại chút nha
  [16:13] kietnht: khoan nha
  [16:14] vytth: nma để load cái list lên thì mình fai load sẵn data của all list hả mn
  [16:15] vytth: kiểu show tag name list lên, rồi khi nào user select tag thì mới bắt đâu load data lê
  [16:15] vytth: * kiểu show tag name list lên, rồi khi nào user select tag thì mới bắt đâu load data lên
  [16:15] tiennd2: * > Of course we are using the aggregation function in influx. But the thing is, we need to define the "start" time that
  [16:16] tiennd2: * > Of course we are using the aggregation function in influx. But the thing is, we need to define the "start" time that
  [16:16] tiennd2: chị Vy đang nói load tag đúng ko, nếu v thì đúng r nha chị
  [16:17] tiennd2: còn này e chỉnh lại tí r nha, kiểu mình nói bả cách mình làm thôi, r có gì bả chỉnh mình
  [16:22] tiennd2: chị Vy Tran gửi lại e cái ticket có đoạn hội thoại đó với chị
  [16:22] vytth: https://precognize.atlassian.net/jira/software/projects/OP/boards/317?filter=&groupBy=none&selectedIssue=OP-11
  [16:22] vytth: đây nha
  [16:22] vytth: nếu oke thì chị nhắn lại 1 tin confirmation cho bả
  [16:32] anhttl: Duy Vo: anh còn vô được jira mochelle ko anh
  [16:38] duyvna: bị văng ra rồi
  [16:42] duyvna: * bị văng ra rồi e
  [16:43] vytth: vậy chốt lại là hỏi như nãy chị nói dúng hok Tien Nguyen
  [16:46] tiennd2: ok chị Vy oi
  [16:53] vytth: cái SUM cho 2 or 3 tag, còn lại thì như mây cái cũ nha a Kiet Nguyen
  [16:53] vytth: * cái SUM cho 2 or more, còn lại thì như mây cái cũ nha a Kiet Nguyen
  [17:02] vytth: Screenshot 2026-10-07 at 17.02.19.png
  [17:02] vytth: check cho e nha Tien Nguyen Kiet Nguyen [thread: 2 replies]
    └ [17:07] tiennd2: này chắc hỏi thêm ý nữa là "configurable limit" là từ đâu chị Vy ơi ví dụ: 1 năm có 10_000 records, 
    └ [17:08] tiennd2: đại loại zị
  [17:06] samht: OP-9 xong r nha bà con, mai sáng có hàng trên staging nhé, đang chờ review chéo
  [17:09] tiennd2: 
  [17:14] kietnht: image.png
  [17:15] kietnht: Sam Ha: cái warning khi license expire
  [17:20] tuanntg: này là nó no license nhưng có trial nha a :))
  [08:39] kietnht: Tuan Nguyen: chỗ view history của license xong chưa á, a deploy luôn vs cái search bên Tiến
  [08:40] tuanntg: Xong rồi nha a
  [08:45] anhttl: cái save step 1 thì khoảng khi nào có ạ
  [08:45] anhttl: mấy câ hôm qua dev hỏi chị Vy Tran confirm với bả chưa [thread: 17 replies]
    └ [08:57] vytth: có 1 câu cuối giờ thì chưa nhé e, giờ c hỏi
    └ [08:57] anhttl: câu mà về permission họ rep chưa chị
    └ [09:00] vytth: à chị chưa hỏi câu đó, hqa đang research dở
    └ [09:01] anhttl: research cụ thể là gì á chị Tien Nguyen cái này h chưa có ổng làm trước có rủi ro gì ko
    └ [09:02] tiennd2: a Kiệt sáng nay sẽ lên trước một phần nha, ko phải rủi ro mà còn phần "X months of data" cần làm rõ 
    └ [09:03] anhttl: hông, cái phần permission chô save model á Tien Nguyen
    └ [09:03] kietnht: cái x month để a xử lý còn permission là issues khác mà
    └ [09:03] tiennd2: à à e nhầm
    └ [09:04] tiennd2: permission để tránh rủi ro thì mình cứ cho Creator có quyền Edit thoi Anh Trinh
    └ [09:04] anhttl: ví dụ mốt họ confirm là ai có DTE thì cũng đc edit,. khi đó có phải rework ko Tiến
    └ [09:05] tiennd2: cái đó sửa cũng ít effort á LA, nên tui nghĩ k sao
    └ [09:05] anhttl: ok
    └ [09:06] tiennd2: nhưng mà DTE là gì v, nó giống Admin hay System Admin gì ko :v
    └ [09:07] anhttl: 1 loại permission á, thấp hơn admin
    └ [09:07] tiennd2: à à cũng là role thôi, v thì ok nha
    └ [09:32] tuanntg: nó là Data cm gì ấy Engineering
    └ [09:32] tuanntg: a đoán thế
  [08:46] kietnht: resolve conflict nha [thread: 1 reply]
    └ [09:15] tuanntg: Xong nha a
  [08:51] kietnht: Tien Nguyen: chỗ upsert e validate rồi handle save mấy cái field step 1 thôi (name, desc, với target tag id) mấy cái fie
  [08:55] samht: OP-9 có hàng để test sơ trên staging r nha Duy Vo  BE đang update thêm vài cái liên quan đến API license nha, nào xong e
  [09:01] samht: ủa bên cột backlog có cái gì làm tiếp dc k v Anh Trinh Vy Tran ?
  [09:02] anhttl: Làm mấy cái ở cột To do nha anh. Chị Vy Tran xem chuẩn bị thêm task nha. Sam Ha hiên giờ M1 bên FE còn thiếu gì á anh, l
  [09:08] vytth: a Sâm cbi qua làm step 3 nha
  [09:08] samht: về cơ bản thì chắc k thiếu gì nữa đâu e, còn lại chắc BE handle là chính á
  [09:08] vytth: đợi e refine cái ticket chút
  [09:09] anhttl: https://precognize.atlassian.net/browse/OP-16 anh làm cái này trước đi anh Sam Ha ưi
  [09:47] duyvna: image.png
  [09:47] duyvna: đang deploy gì hả mọi người thấy error 502 rồi
  [09:49] kietnht: rồi đó
  [09:49] kietnht: nãy đang build a :v
  [09:51] kietnht: Tuan Nguyen, Tien Nguyen  test lại xem code mình work chưa nha
  [10:09] tuanntg: e Vy Tran  ơi, đoạn ở view License info á, chỗ upgrade License là sao vậy e
  [10:09] tuanntg: Chức năng của nó sẽ là gì?
  [10:12] vytth: image.png
  [10:12] vytth: anh xem nha
  [10:16] tuanntg: Nó nằm ở OP nào ấy e, a mới thấy ý nghĩa của nó là vậy chứ nó không nói là khi user click vô cái link đó sẽ làm gì á
  [10:24] vytth: vậy là chỗ Upgrade License đó hiện khi:  1. Khi chưa có license của module đó  2. Khi capacity của module đó hết  Chưa n
  [10:25] anhttl: upgrade tức là upload thêm á
  [10:26] vytth: VD:  Đang dùng module OP, hết capacity --> Upgrade = upload thêm OP Module
  [10:26] anhttl: có 3 case: + chỉ mới có monitoring --> upgrade để add thêm license cho optimization. + chỉ mới có optimization --> upgra
  [10:32] tuanntg: Ừm, có gì hỏi thêm giúp a chỗ đó action nó là gì nha 2 e, để xác định FE hay BE làm gì khúc đó nữa không á
  [10:33] anhttl: Là y chang như upload đó anh
  [10:33] vytth: nó vậy luôn á anh, e nghĩ ko cần hỏi thêm đâu nè
  [10:33] tuanntg: Theo UX tốt thì a nghĩ khi user click vô chỗ đó nó  sẽ hiện form để user điền hay chọn expected upgrade hoặc là mở form 
  [10:35] anhttl: em chưa hiểu, chỗ upgrade thì có nghĩ là upload thêm cái license thôi á, chứ ý anh điền form là để admin edit quota bằng
  [10:41] tuanntg: a đang hiểu là bên Admin ( thằng upload license này) nó sẽ click vô nút đó, sao đó mở form ra sẽ có thể set expect capac
  [10:41] anhttl: vậy sao ko add thêm license mới thôi á
  [10:42] tuanntg: Thằng Admin này có quyền generate license hay không và file license của nó từ đâu có
  [10:42] tuanntg: e chưa biêt mà
  [10:42] anhttl: vậy chớ ngay từ đầu thì nó lấy file license từ đâu ra
  [10:43] tuanntg: a nghĩ nó gửi mail hoặc ký hopwjk ddoongf với công ty á
  [10:43] tuanntg: rồi cty mới cấp license cho
  [10:43] anhttl: thì khi upgrade nó cũng tương tự vậy á. ko phải form hay gì đâu, cũng là như upload thôi. app cũ cũng work như thế
  [10:44] tuanntg: OKe e, vậy chỗ này FE làm nha a Sam Ha
  [10:44] tuanntg: nhớ note á
  [10:45] kietnht: e viết vô tờ giấy, xong đốt đưa Sâm uống thì may ra nó mới nhớ
  [10:46] vytth: image.png
  [10:46] vytth: e viết vô đây nha nha a Sam Ha https://precognize.atlassian.net/jira/software/projects/OP/boards/317?filter=&groupBy=non
  [10:47] samht: 💩 còn cái gì của OP-9 có update thì làm 1 lần hết đi bà coan
  [11:26] tiennd2: Anh Trinh: giúp tui case này nha
  [11:26] tiennd2: giờ data AA chịu luôn
  [11:27] anhttl: Cái mà để link asset với tag là nằm ở digital plant (DP) mà digital plant thì chưa merge vào develop. https://process-di
  [11:27] anhttl: * Cái mà để link asset với tag là nằm ở digital plant (DP) mà digital plant thì chưa merge vào develop. https://process-
  [11:35] anhttl: Chị Vy Tran báo họ cái này gấp nha chị, nói họ là xử lý gấp giúp mình luôn. Btw, liên quan requirement, trong design thi
  [11:37] anhttl: Tien Nguyen: Có vẻ là BE hiện tại cũng có code của DP rồi á. Để tui gửi 1 cái request mẫu ông gọi thử nha
  [11:37] tiennd2: ok ok gửi tui thử
  [11:40] anhttl: ủa nma trong DB hiện h của mình có sẵn asset chưa Tiến
  [11:40] tiennd2: có rồi nha
  [11:40] tiennd2: cái đó ok
  [11:40] anhttl: cho tui 1 cái được ko, ông gọi getbyId của nó cho tui xin info nha
  [11:42] tiennd2: ok chờ tui tí
  [11:42] tiennd2: ê khoan :v
  [11:42] anhttl: what
  [11:42] tiennd2: image.png
  [11:42] tiennd2: ko có gì cạ
  [11:42] tiennd2: =)))))
  [11:42] tiennd2: ko có asset nào hết
  [11:43] anhttl: ok ko sao
  [11:44] kietnht: nếu muốn có data này chắc kêu họ gửi bản backup á, rồi install lại
  [11:44] tiennd2: nếu vậy thì dev-01 đang là mới nhất chưa anh Dong Nguyen
  [11:44] anhttl: Tri Nguyen: nếu giờ cái process gidital plant, mình gắn BE là active-alert được hong anh
  [11:45] trinm: nếu dùng chung 1 BE thì gắng được
  [11:45] anhttl: z anh thử i :v em test thử coi nó lỗi ko
  [11:45] anhttl: đổi server BE thui
  [11:46] trinm: ừa để thử lâu rồi ko build cái này 😅
  [11:47] anhttl: hú chị Vy Tran
  [11:52] vytth: là tag liên quan đến DP module, mà DP thì chưa lên develop env để mình dùng dc các function liên quan đến tag đúng ko e.
  [11:54] anhttl: Chị nói họ là t đang muốn làm step 1 (add tag --> show asset tương ứng của nó) nhưng hiện giờ trong DB chưa có asset nào
  [11:54] anhttl: * Chị nói họ là t đang muốn làm step 1 (add tag --> show asset tương ứng của nó) nhưng hiện giờ trong DB chưa có asset n
  [11:54] tiennd2: a Tri Nguyen  `git@github.com-mrtiennd2:nustechnology/Elena-SamGuard-Digital-Plant.git`
  [11:56] tiennd2: `/vp_server/dae/rest`
  [11:56] tiennd2: * `/vp_server/dae/rest/`
  [11:56] trinm: https://active-alerts.nusdev.net"
  [11:57] tiennd2: ` https://active-alerts.nusdev.net/vp_server/dae/rest/`
  [11:58] trinm: https://active-alerts-be.dev.nustechnology.com/vp_server/dae/rest/auth
  [12:00] trinm: https://process-digital-plant2.nusdev.net/#/automatic-scan đã update server internal mình nha
  [12:01] anhttl: image.png
  [12:01] anhttl: thấy nó còn là server cũ á anh Trí
  [13:24] trinm: test lại đi em
  [13:27] anhttl: em vô nó trắng bóc hoài á
  [13:27] trinm: reload lại 2 lần đi
  [13:28] trinm: Kiet Nguyen:  "reason": "No handler for destination 'expert.by.asset'",
  [13:32] anhttl: do cache hay gì đó hoài ko đc, mở ẩn danh hì đc rùi nhe
  [13:33] anhttl: Tien Nguyen: ông ơi nó bị unknown nè, clear mấy cái root object giùm tui nha
  [13:33] anhttl: image.png
  [13:33] tiennd2: chờ tui check với a Kiệt xíu
  [13:34] anhttl: image.png
  [13:34] anhttl: mà ko phải lỗi giống ngày trước r
  [13:35] trinm: ````   rootObject: {     id: "cc2dcd26-d3a4-4c4c-9753-6fc248ac9201",     type: "Object",     name: "ICL-WPA",     descri
  [13:35] tiennd2: .
  [13:36] tiennd2: Anh Trinh: bà copy cái response này vô đây với
  [13:36] tiennd2: để a Trí copy vô lại test
  [13:36] anhttl: ``` {     "success": true,     "warning": false,     "data": [         {             "id": "8ad9b769-b88e-42e0-9aa3-422f
  [13:39] tiennd2: data đang đúng nha mng, đang bị config gì đó quá
  [13:39] tiennd2: hiện có 1 root à Anh Trinh
  [13:49] vytth: > did you install full backup including data bases in active alerts server?
  [13:49] vytth: mình có backup DB hả mn
  [13:51] kietnht: cái backup bả nói là cái database bả đưa cho mình ấy e
  [13:51] kietnht: mà vụ gì mà bả hỏi vậy
  [13:52] kietnht: * cái backup bả nói là cái data bả đưa cho mình ấy e
  [13:52] vytth: > Hi @lena, @Kfir Bernstein, we are working on step 1 model, where adding a tag shows its corresponding asset. That link
  [13:52] vytth: vụ hồi trưa mình nói nè
  [13:52] vytth: ý bả là sao á anh
  [13:54] kietnht: install full rồi, mà mấy cái data bên DP thì cần phải tạo mới có, như mấy cái asset
  [14:02] vytth: là data bên DP chưa có asset hả a
  [14:02] vytth: * là data bên DP chưa có asset info hả a
  [14:05] kietnht: uhm, chưa có
  [14:08] tiennd2: Anh Trinh: hiện upsertNode ok hết rồi nha, bị cái là MeasurementType phía DP đang chưa có gì, với Asset Templates đang b
  [14:12] anhttl: Cách này test tạm thôi, vẫn ưu tiên báo họ để họ xử lý cho có full data test nha. Chưa ai rep họ á mn
  [14:17] kietnht: ý e là xin bả bản backup mới hay sao á
  [14:18] anhttl: em ko biết á, làm sao mà để có sẵn các measurement type, asset type,... mình cùng lắm chỉ tạo thêm asset thôi
  [14:18] anhttl: như ở trên Tiến nói là measurement type đang chưa có gì
  [14:19] anhttl: mà với nếu mình đang làm theo kiểu là gắn BE active alert vào DP để tạo data test thì cũng nói cho bả luôn. nhưng em ko 
  [14:25] vytth: là giờ mình nói bả cho bộ Data mới, vì data cũ bả cho ko có data của asset và measurement type? Ý vậy đúng ko mn
  [14:27] tiennd2: mọi người dừng tạo data trên plant2 xíu nha
  [14:31] vytth: > Michelle > Hi @lena, @Kfir Bernstein, we are working on step 1 model, where adding a tag shows its corresponding asset
  [14:31] vytth: * > Michelle > Hi @lena, @Kfir Bernstein, we are working on step 1 model, where adding a tag shows its corresponding ass
  [14:35] kietnht: đợi tí hãy rep nha
  [14:35] kietnht: đợi chạy full mấy cái migration đã, chắc là đủ data rồi
  [14:37] tiennd2: có vẻ là ok hết rồi đó mọi người
  [14:37] tiennd2: data structure up to date hết rồi
  [14:38] anhttl: là giờ muốn tạo data thì tạo ở https://process-digital-plant2.nusdev.net/#/hierarchy hay https://active-alerts.nusdev.ne
  [14:39] tiennd2: tạo Asset-Tags thì vô bên plant2 tạo nha
  [14:39] anhttl: mn vô test thử đi rồi báo bả
  [14:40] tiennd2: chắc cũng cần xin backup phòng trường hợp lúc lòi ra bug external thì mình cũng có mà reproduce chứ hả mng
  [14:40] tiennd2: * chắc cũng cần xin file backup phía họ phòng trường hợp lúc lòi ra bug external thì mình cũng có mà reproduce chứ hả mn
  [14:41] kietnht: nói bả là lúc đó làm ko liên quan gì DP nên tui skip mấy cái migration, chỉ chạy cái nào cần cho bên AA thôi
  [14:41] kietnht: giờ chạy lại thì thấy đủ rồi
  [14:42] anhttl: hiện giờ thì bả sẽ vẫn test trên cùng môi trường với mình, tơi towiskhi nào bên họ làm xong algorithm thì họ sẽ setup 1 
  [14:42] tiennd2: ngon lun
  [14:42] duyvna: Sam Ha: Kiet Nguyen ticket nào Deployed rồi thì kéo đúng Stt dùm a nha, để QC tiện theo dõi mà test
  [14:47] vytth: ok vậy báo bả mình xử lý dc rồi ha
  [14:48] anhttl: giải thích rõ luôn chị ơi. nói là mình đã xử lý sao, và workaround bằng cách lên DP tạo connection sao...
  [14:50] duyvna: Kiet Nguyen: update lại dùm a acc System lúc chưa có License đi, để a coi UI nó show ntn cái nha
  [14:52] kietnht: image.png
  [14:52] kietnht: remove 2 files đó là đc đúng ko Tuan Nguyen
  [14:52] tuanntg: Không a
  [14:52] tuanntg: này 2 file key mình generate ra
  [14:53] tuanntg: a phải remore file mà service license nó đang lưu á
  [14:54] kietnht: Duy Vo:
  [14:54] kietnht: test lại thử a, mơis remove file license ra á
  [14:56] duyvna: ok e, thks e nha
  [15:09] vytth: image-20261008-072704.png
  [15:09] vytth: câu hỏi về permission hôm qua của em bả trl vày nha Tien Nguyen  > The System Administrator is responsible for editing a
  [15:10] vytth: vậy là ko có limit gì hết. Chỉ có admin dc edit vs manage thoi
  [15:10] vytth: còn lại chúng sinh bình đẳng
  [15:11] vytth: * vậy là ko có limit gì hết. Chỉ có admin dc edit vs manage license thoi
  [15:11] anhttl: vậy là user bình thường cũng đc xem license, và user này tạo thì user khác cũng đc edit?>
  [15:11] anhttl: nếu edit cùng lúc thì sao ta
  [15:11] anhttl: * vậy là user bình thường cũng đc xem license, và user này tạo thì user khác cũng đc edit hả chị?
  [15:11] tiennd2: ai Save sau thì lưu của người đó :v
  [15:14] tiennd2: khoan, zị user bình thường được tạo Model kh chị Vy Tran
  [15:15] vytth: dc mà
  [15:22] vytth: > Could you please clarify where the minimum data requirement came from? In any case, please define it as a backend para [thread: 1 reply]
    └ [15:28] tiennd2: ý này để a Kiet Nguyen handle tiếp rùi có gì báo lại chị nha, tạm thời để z nha chị
  [15:22] vytth: * > Could you please clarify where the minimum data requirement came from? In any case, please define it as a backend pa
  [15:24] samht: Duy Vo: e lỡ upload lại r nha a, kêu Kiệt xoá lại đi
  [15:26] handn: để e test cũng đc a, k cần xóa
  [15:29] vytth: * > Could you please clarify where the minimum data requirement came from? In any case, please define it as a backend pa
  [16:39] anhttl: Tien Nguyen: mấy connection là nó tự có sẵn hả ông, hay h phải tự tạo trên DP á
  [16:39] tiennd2: này phải tạo trên DP nha
  [16:39] tiennd2: db AA đang trống trơn
  [16:40] tiennd2: ý bà là connection Asset-Tags đúng k
  [16:40] tiennd2: hay khác nữa
  [16:40] anhttl: yep
  [16:41] tiennd2: ok lun
  [16:47] vytth: bữa a Kiet Nguyen hỏi cái draft state nên e tạo ticket cho BE, vậy là cái này done rồi hả a  https://precognize.atlassia [thread: 2 replies]
    └ [16:53] kietnht: done rồi, mà chưa deploy nha
    └ [16:53] kietnht: để cuối giờ deploy
  [16:52] tiennd2: image.png
  [16:52] tiennd2: chị Vy Tran , hiện ở phần Data Exclusions, mình sẽ lấy Time Window default là bao nhiêu á chị
  [16:52] tiennd2: UI hình như ko có bước chọn Time Window
  [16:54] vytth: default 1 year time range đó e
  [16:55] tiennd2: 1 year from now hay là 1 year life span của 1 tag á chị
  [16:56] anhttl: coi lại phải là default fixed 1 year ko hay là lấy cái value set trong configuration nha mn
  [16:58] anhttl: image.png
  [17:06] vytth: > you will write a query which will counts the records in 1 yer and compare it with configurable limit and will return t
  [17:08] tiennd2: còn 1 ý nữa là `configurable limit` lấy ở đâu nữa á chị Vy, e ko rõ là bả muốn một con số cụ thể hay là sao
  [17:08] vytth: ý đầu tien nè e
  [17:23] anhttl: Nhớ là mai bả off nha mn, này ráng confirm sớm nhé
  [17:24] anhttl: Ko là sang tuần mới biết làm gì á
  [17:26] tiennd2: life span của 1 tag = time range (time của record cũ nhất và time của record mới nhất)
  [17:27] tiennd2: 1. return tag data trong vòng 1 năm trở lại đây 2. sau đó compare life span của danh sách tag có data này với configurab
  [17:28] tiennd2: * 1. return tag data trong vòng 1 năm trở lại đây 2. sau đó compare life span của từng tag trong danh sách tag có data n
  [08:46] anhttl: Hôm qua em confirm cái x month rồi nha
  [08:47] anhttl: image.png
  [08:47] anhttl: ai làm cái phần này qua em giải thích trước cho nè
  [09:05] anhttl: 9h15 nha mn
  [09:09] kietnht: image.png
  [09:09] kietnht: cái AA bị issues gì rồi nha
  [09:09] kietnht: mất tiêu hết mấy cái asset name đồ ta
