# Matrix — since 2026-07-09 09:05 +07:00

### !HzmgzMNNkFcXPcIHfB:nustechnology.com — 4 messages
  [10:47] duongdn: coi review giờ charge nhanh đi a xem nc với Năm
  [10:48] tiennd: done nha anh
  [10:49] duongdn: thank e
  [10:54] duongdn: a Năm nói nên làm bù, vậy giờ a nên làm bù phần nào nhỉ ...

### !KGfMOdTMWQwLObwAEk:nustechnology.com — 62 messages
  [11:52] duyvna: Kiet Nguyen: e fix case này chưa? Nay cus cũng có log issue này rồi nhé  https://precognize.atlassian.net/jira/software/
  [13:22] kietnht: e đang coi nên fix sao nha, FE hay BE thì hợp lí hơn 🤔
  [14:07] kietnht: Anh Trinh:  cái này FE fix nha, cái count đó mình dùng trực tiếp từ cái API event-history luôn chứ đừng lấy trong simila
  [14:08] anhttl: anh Sam Ha khi nào qua đây nhể
  [14:09] samht: a đang fix 1 con redmine cuối, r ngày mai a qua dự án khác nhé
  [14:11] duyvna: nếu con trên xong thì có thể làm tiếp con trên này nhé e
  [14:37] duyvna: https://precognize.atlassian.net/browse/AA-58 Anh Trinh coi dùm a ý cus có phải là khi 1 Alerts mà closed thì tất cả not
  [14:38] duyvna: * https://precognize.atlassian.net/browse/AA-58 https://precognize.atlassian.net/browse/AA-59 Anh Trinh coi dùm a ý cus 
  [14:40] anhttl: đọc theo ý của bả thì là vây, nhưng mà cái này trước req ko có đề cập
  [14:50] duyvna: https://redmine.nustechnology.com/issues/79643 Sam Ha e check trước con này nhé
  [14:50] anhttl: có con bug jira nào ready để làm thì làm trước đi anh Duy
  [14:52] duyvna: ok con nào ready thì a sẽ assign lun cho dev rồi
  [14:54] duyvna: https://redmine.nustechnology.com/issues/79690 con này lun nha Sam Ha
  [14:59] anhttl: Anh Nguyen: bả ok start scope AA4 rồi á anh
  [15:01] anhttl: Sam Ha: trên jira, con này assign cho Aron ở To do nghĩa là làm đc rồi, anh cũng ưu tiên bug trên đó nha
  [15:02] duyvna: https://precognize.atlassian.net/browse/AA-66 Kiệt e coi dùm a con này là api trả cho FE show hay sao giúp nha, phân vân
  [15:03] anhttl: Kiet Nguyen: AA4 có dòng "Validation & Permission: Audit tab access for users with view permission." bả nói ko cần làm, 
  [15:03] anhttl: * Kiet Nguyen: AA4 có dòng "Validation & Permission: Audit tab access for users with view permission." bả nói ko cần làm
  [15:04] anhttl: * Kiet Nguyen: AA4 có dòng "Validation & Permission: Audit tab access for users with view permission." bả nói ko cần làm
  [15:06] kietnht: uhm, bả nói vậy thì thôi, ko biết bả có aware chuyện người ta có thể call API mà ko dùng đến FE ko :v
  [15:07] anhttl: app mình là vậy mà anh =)) miễn login xong lấy access token là muốn quậy gì quậy
  [16:12] anhttl: 
  [16:13] anhttl: Kiet Nguyen: hình như mới có issue, giờ cick vô investigation thì nó ko auto change status nữa á anh
  [16:18] kietnht: hmmm lạ nhỉ
  [16:18] kietnht: hình như BE đâu có làm gì chỗ này 🤔
  [16:20] anhttl: em trên trên Audit, thì lúc plant time là 09/07/2026 13:58 thì nó đổi cả loạt sang New á, current plant time đang là 09/
  [16:20] anhttl: mà mới check sơ sơ vài cái thui nha :v
  [16:20] anhttl: * em check trên Audit, thì lúc plant time là 09/07/2026 13:58 thì nó đổi cả loạt sang New á, current plant time đang là 
  [16:24] kietnht: hú Tri Nguyen behavior chỗ này e nhớ ntn ko, lúc mở cái drawer ra thì nó sẽ call 1 cái API để update status phải ko á
  [16:28] trinm: update status gì anh nhỉ
  [16:29] trinm: status view alert hả anh
  [16:29] kietnht: status của investigation
  [16:29] kietnht: image.png
  [16:29] kietnht: cái này nè
  [16:30] anhttl: xí, ý của em là double click vô main table thì nó mở investigation > auto change status thành "Under investigation", cái
  [16:31] kietnht: à double click chứ ko phải mở drawer hả
  [16:31] trinm: ủa có cái behavior này hả , này chắc anh không có làm rồi
  [16:32] anhttl: Mở drawer, chọn Investigate cũng vậy nha, hiện đang có bug là ko đổi status nữa
  [16:33] anhttl: cái này chắc hỏi anh Đông xem [thread: 1 reply]
    └ [16:45] dongnv: Hmm, anh ko có update gì trên AA branch nhé, mà anh nhớ lúc trước có update là chỉ update lần đầu ph
  [16:33] kietnht: double click a thấy có đổi status
  [16:33] kietnht: mở drawer thì ko
  [16:33] anhttl: em test 2 cái ko đc lun
  [16:40] kietnht: hmmm, hình như thấy rồi, nó có cái điều kiện để update status
  [16:41] kietnht: mà cái này cho case double click thôi, còn case mở drawer ko thấy nó call API update luôn nha
  [16:44] anhttl: xí, cái này là trước đó có có đổi status chưa anh
  [16:45] kietnht: e nói cái nào á, drawer hả
  [16:45] anhttl: dạ
  [16:45] kietnht: a nhớ có
  [16:45] anhttl: à rùi oke, nó chỉ auto đổi lần đầu thôi
  [16:45] kietnht: à đúng rồi, có vụ first time
  [16:46] anhttl: nãy em vô mấy cái New em đổi, tưởng là lần đầu, mà vô cái Audit thì thấy trước đó đổi rồi, nên nó ko đổi nữa
  [16:46] anhttl: nhưng mà mình có cái gì đó trigger đổi hàng loạt hay sao ấy
  [16:46] anhttl: anh nhớ lần trước mình cũng bị đổi cả loạt thành New ko
  [16:47] kietnht: hmmmm
  [16:47] kietnht: update hàng loạt thì a chỉ nghĩ tới parent change
  [16:47] kietnht: xong child change theo
  [16:48] kietnht: hoặc hỏi bà lena xem
  [16:48] kietnht: bả có change từng cái ko
  [16:49] kietnht: cái này thì coi log thử, nó có link/unlink gì ko

### !MIpDxVPWFvSctcnpEa:nustechnology.com — 98 messages
  [09:19] duongdn: uả Le Ngo  Hôm qua e làm James mà, sao lại có giờ của Blair ...
  [09:20] duongdn: 8h mới ghê chứ ....
  [09:21] lenh: Em làm bù đó anh. Em có hỏi Phúc, thì Phúc nói là bên này làm full time
  [09:21] duongdn: hả ... a có yêu cầu e làm bù bao giờ !!!
  [09:21] duongdn: info ở đâu ra vậy
  [09:22] duongdn: mà e làm sao 8h hay vậy ... James e ko làm à?
  [09:24] lenh: à, log nhầm project. bên Blair có 40p thôi anh
  [09:24] duongdn: ơ vl ...
  [09:24] duongdn: đứng tim ...
  [09:26] lenh: Sorry anh, sáng não còn hơi lag, mở nhầm link project
  [09:27] lenh: Em thấy ổng than là total 68h, ngoài expect của ổng, sợ ổng đang nhạy cảm nên không xin manual log lúc Khánh làm chưa bậ
  [09:27] lenh: Phần Khánh làm thì chỉ có change cái hình background thôi
  [09:28] duongdn: ơ ko, kệ ổng chứ
  [09:28] duongdn: e log cho đúng actual hour đi
  [09:28] duongdn: a xem sao
  [09:30] lenh: Cứ trích 1 phần giờ em làm để log cho Khánh, phần đó. Tại thay background thì cùng lắm là 5p. 5p đó coi như bù số giờ em
  [09:31] duongdn: ok thank e
  [09:33] lenh: Khanh Ho: update task log bên này cho task "Update hero banner" 5p nha em 😉
  [16:55] duongdn: image.png
  [16:57] duongdn: Le Ngo:  Cus đã pause contract và gởi request refund effort tuần trước A cần tìm lời giải thich cho ổng Tuần trước mình 
  [17:12] lenh: Anh có time không em giải thích xuống trình bày với anh trực tiếp luôn cho lẹ
  [17:12] lenh: https://docs.google.com/spreadsheets/d/1TUHZV-FvkYyvfIVI5NLvI5vaYuVARf2H6gNZQiJW5uU/edit?usp=sharing
  [17:43] duongdn: làm xong cái file thì báo a nha, a coi qua đã, ok hết rồi mới báo cus
  [17:52] lenh: ok anh
  [18:37] duongdn: cần xử lí issue này hôm nay nha Le Ngo   A đang online, khi nào có result báo a
  [20:07] lenh: Em đang có việc cá nhân, chưa mở máy xử lý liền được. Có thể sẽ xong trễ nên khả năng là sáng mai mới có result
  [20:18] duongdn: xong e cứ báo, a sẽ chờ, a Chiến và Năm cũng đang chờ, yêu cầu có kết quả sớm
  [20:19] duongdn: này là issue nghiêm trọng, ko có pending được đâu, cá nhân gì cố gắng sắp xếp đi em
  [23:01] duongdn: a đang dùng AI để tìm câu trả lời, a thấy có 1 số task nó ko nằm trong này, ví dụ update product image, mình cần thì tự 
  [23:03] duongdn: Le Ngo ơi, anh cần confirm 1 chỗ trong file "Need changes" (cái mình dùng giải trình cho Blair) trước khi chốt số. Mấy d
  [23:17] duongdn: Hồi thứ 2 có cái này: Check the UI/UX page and take notes on the changes needed - 2h50m Cái này là ổng yêu cầu mình test
  [23:44] duongdn: ==== Em cần + Feedback lại số giờ actual đã làm cho mỗi task, để sum sao nó đủ 28h10m Với các con số lớn, ví dụ a thấy t
  [23:52] lenh: Trong file này em chỉ tính của tuần 29/6 - 03/07
  [23:52] duongdn: ok, vậy có 1 mớ chưa có giờ, include thêm vô
  [23:53] lenh: Em include vào sau anh. Mấy cái được log giờ tách bách rõ ràng thì log vào sau cũng được, với nó cũng không cần break do
  [23:55] lenh: image.png
  [23:55] duongdn: goal chung là giải thích dược effort tuần trước thôi, hợp lí là được  Xong báo a review
  [23:56] lenh: image.png
  [23:58] lenh: Cái này là xuất phát từ 1 phần của tuần trước 29/6, là ổng có yêu cầu làm hero banner full-width ở 1 vài page, sau đó fe
  [23:59] lenh: Trong quá trình đó, em phát hiện 1 số chỗ ổng kêu là update trên home page kiểu như "98%" -> "99%", thì mấy page khác cũ
  [23:59] lenh: Để text, content nó consistent
  [23:59] duongdn: ok,  list ra những chỗ nào đã update,  càng chi tiết càng tốt, hiện effort 2 cái đó là phần lớn, list ra được khoảng chụ
  [00:00] duongdn: ko cần chat ở đây đâu, e viết trong file đi
  [00:00] duongdn: mình hứa sẽ break down effort và feedback trong file, chát đây tốn time
  [00:02] duongdn: đây là giải thích cho cái 2h50m à, review , tạo google sheet note all chỗ sẽ updte ?
  [00:05] lenh: đúng rồi anh, em đi check tất cả các page mà user có thể vào được thông qua các action link, reference link, ....
  [00:06] lenh: Rồi take notes lại những cái cần update cho consistent với nhau
  [00:07] lenh: Xong rồi có gửi link cho ổng vào T2 luôn, ổng có bảo là sẽ xem
  [00:07] lenh: Hôm T3 em còn báo ổng là có update status làm vào file đó
  [00:07] duongdn: ok, cái đó nhỏ thôi, đươc rồi Giờ giải thích mấy con số ổng est đi, nó mới quan trọng
  [00:08] lenh: em đang break down 1 lượt xong rồi mới est giờ
  [00:25] duongdn: "The first I think something worng with 2 shortcode that show as raw text on this page. So, I research and investigate w
  [00:33] duongdn: "I need to get the raw HTML on local, then update:" Ủa là mấy cái này làm local, chứ ko làm trực tiếp trên server được à
  [00:34] duongdn: Mà lạ là Elementor sao ko update được ta ... a vẫn chưa hiểu giải thích này
  [00:41] lenh: Nãy em chưa viết xong, research và fix cho nó hoạt động luôn mà anh. Đâu phải research xong cái bỏ nó như cũ đâu anh [thread: 1 reply]
    └ [00:43] duongdn: OK
  [00:42] lenh: Không anh, em copy cái raw HTML đó về làm thôi anh, trên server nó để vào 1 textarea có chút xíu sao mà đọc với update t
  [00:43] duongdn: Vậy ghi rõ technical issue này nha, do hạn chế của Elementor, nên phải down về làm local  Bỏ thêm chi phí setup local và
  [01:04] duongdn: a có update chút cái e đã viết để adapt với file của ổng
  [01:16] duongdn: Dòng 229. đây là trang about, vẫn co dòng "Find and replace all "98% pure" to "99% pure"  Cái này all screen à ?
  [01:17] duongdn: Nếu đúng thì list tất cả trang, mỗi cái tuỳ theo phức tạp hay ko thì bỏ giờ vào, cũng kha khá
  [01:18] lenh: Scope của nó là trong trang thôi anh
  [01:19] duongdn: row 2, ông est 10m, em để 5m, a update lại 10
  [01:28] duongdn: Mấy cái như dòng 69, ổng ko có ghi giờ, chắc ổng assume là làm chung, e ghi rõ là làm riêng nha
  [01:29] duongdn: "This page is using the Raw HTML in Elementor. Not build by group many Elementor's components The Elementor's editor too
  [01:30] duongdn: mấy cái này, cái đầu 60m là hợp lí Nhưng mấy cái sau cũng y chang vậy, a thấy hok ok lắm, ko có reuse gì, hơi ko ổn A th
  [01:31] duongdn: với có mây cái hiện sao ổng có giờ mà e ko có ...
  [01:32] duongdn: a thấy cũm hòm hòm gần ok rồi đấy, cook sao nó đủ 28h10m là được
  [01:52] duongdn: gần tới 28h10m rồi :D
  [02:01] duongdn: vẫn thấy rất nhiều cái 1h này nha, ở trên a thấy có mấy cái gần gần vậy nhưng 30m
  [02:07] lenh: Em chưa hiểu ý anh nói chỗ này
  [02:07] duongdn: ý là có mấy cái cung liên quan elementor
  [02:07] duongdn: Ví dụ dòng 69
  [02:08] duongdn: Rồi xuống dòng 103 lại thành 72m
  [02:13] lenh: ủa anh với em có xem chung 1 file mà sao dòng 69 của em đâu phải cái này đâu ta
  [02:14] duongdn: "This page is using the Raw HTML in Elementor. Not build by group many Elementor's components The Elementor's editor too
  [02:14] duongdn: nó dạng vầy nè
  [02:14] lenh: cái đó dòng đầu tiên em để 72h, còn lại là 60h
  [02:15] lenh: Mấy dòng 60m là "This page is using the Raw HTML in Elementor. Not build by group many Elementor's components The Elemen
  [02:15] lenh: * cái đó dòng đầu tiên em để 72m, còn lại là 60m
  [02:15] lenh: em có giải thích thêm á anh
  [02:16] lenh: vẫn còn đang thiếu xíu giờ
  [02:16] duongdn: setup local chưa thấy
  [02:16] duongdn: 1 số phần bên cus có mà thấy bên e chưa có
  [02:17] lenh: "This page is using the Raw HTML in Elementor. Not build by group many Elementor's components The Elementor's editor too
  [02:18] lenh: một số chỗ nhỏ nhỏ em gộp chung lại
  [02:19] duongdn: ok, mà với cái đầu tiên 72m, e tách 3 cái này ra , mỗi cái 1 row rồi est effort từng cái đi
  [02:19] duongdn: mấy cái 60m thì để chung cũng được
  [02:20] duongdn: rồi vậy thôi, cook sao lên 28h10m là được, mấy cái 5m tăng lên 10m chắc sẽ đủ
  [02:20] duongdn: xong báo cus nha
  [02:20] lenh: ok anh
  [02:26] duongdn: báo chưa, a thấy đủ 28h10 rồi
  [02:29] lenh: Em báo ổng đây
  [02:30] duongdn: ok thank e nha
  [02:30] duongdn: g9
  [02:31] lenh: 🙏
  [02:31] lenh: g9 anh
  [02:37] lenh: à, trong này có 1 cái tracking description em viết không đây đủ vào sáng "Jul 1 (Web) - Update the content to show 99% p

### !mYZBGNoLFVpMVIJtPu:nustechnology.com — 4 messages
  [11:41] duongdn: Backend server in production intermittently becomes unavailable, causing the app and web to remain in a loading state
  [11:41] duongdn: a thấy hôm qua e có làm cái này, status sao rồi, a xử cho xong để go live luôn
  [11:41] longvv: e làm xong r, h chỉ test thoi á
  [11:41] longvv: e có tạo cái PR

### !oGYjbzEfphvvauBZtq:nustechnology.com — 18 messages
  [09:58] namtv: Google Nick Nam báo sai pass. Chắc cũng bị Lastpass autofill? Ném pass đúng phát nào...
  [10:02] duongdn: Nick hay Năm ? Ta đâu có Năm đâu, chỉ có Nick thôi  *TjlKfR6uHesBera Mà nó trên BitWarden, ko phai local ta lưu
  [10:02] namtv: Nick. Pass đó sai rồi...
  [10:03] duongdn: uả ta mới login tức thì luôn
  [10:03] namtv: ủa. Ku NamNN nó báo login sai ta 😐️ Để hỏi lại
  [10:09] namtv: OK rồi. Do cái extension nó chưa out ra vô lại sau cái đợt upgrade server nên nó cóc sync
  [10:14] duongdn: * Nick hay Năm ? Ta đâu có Năm đâu, chỉ có Nick thôi  ***** Mà nó trên BitWarden, ko phai local ta lưu
  [10:51] duongdn: bên Arthur mình làm dạng gì bên PhucVT nhỉ, theo task log thì hiện đang thiếu 3h charge do review performance TUần trước
  [10:52] namtv: Arthur là hourly. Nhưng ideally nên đủ ít nhất 40h (đang nói ổng để tuần này làm 41h do có OT/PT). Mày xem phụ được gì b ⚠️
  [10:53] namtv: >TUần trước thì là 2h nhưng tao thấy msg report 2h luôn, tuần này hì plan thế nào?  Actual tuần trước 4h, tao nói charge
  [10:54] duongdn: ko biết chen dô gì được ko, để xem
  [11:12] duongdn: === Bên James Diamond LeNH làm hiện chậm quá, 1 phần do ổng cũng chậm thiệt và cũng cần support mấy dự án cũ  Hiện tuần 
  [11:17] namtv: >Có vẻ hơi nhiều, LongVV thì chắc tuần này đang kẹt Cleo ko bù được Bên Celine đang pause mà nhỉ? Còn mấy issue tương mà
  [11:17] namtv: Ngoài ra, xem nếu chậm quá thì nói Lễ tự bù nữa
  [11:19] duongdn: Chờ chút confirm MInh chỗ này xíu
  [15:36] namtv: Khanh Ho Hi a Năm, a cho e xin làm remote cả ngày mai e vừa nhổ răng nên xin làm remote để tiện sinh hoạt ạ. Mong a appr
  [15:36] namtv: * Khanh Ho Hi a Năm, a cho e xin làm remote cả ngày mai e vừa nhổ răng nên xin làm remote để tiện sinh hoạt ạ. Mong a ap
  [15:37] duongdn: hiện cũng ko có gi gấp, để bạn off đi

### !QEbdvaMJkTurMpRPIX:nustechnology.com — 8 messages
  [10:42] duongdn: giờ charge của LeNH có vẻ thấp vậy ... tuần trước là 7/12 coi như cũng đúng vì mới vô Tuần này hiện là 18h/24h, thiếu kh
  [11:06] phucvt: Có vài cái e thấy chỉ dạng check và confirm lại thôi mà a Lễ note tới 3h. Mà cái đó đáng lẽ có 1h thui
  [11:06] phucvt: Hmm, vậy sao ta
  [11:07] phucvt: > tính ra 2h/day , vậy tới t6 chắc 10h quá ...  Cũng k hẳn anh, nhiều lúc từ thứ 4 -> thứ 6 nó khác. Em thấy anh Lễ bắt 
  [11:08] phucvt: * > tính ra 2h/day , vậy tới t6 chắc 10h quá ... Cũng k hẳn anh, nhiều lúc từ thứ 4 -> thứ 6 nó khác. Em thấy anh Lễ bắt
  [11:08] phucvt: Ủa mà e có hỏi a Lễ, ảnh nói đang làm trên nhiều project
  [11:08] phucvt: Cty mình sắp xếp sao vậy ta => Cái này e thắc mắc thui
  [11:08] duongdn: ko, James thôi, còn lại support à

### !rwLbvLBnrRAYMaOPaD:nustechnology.com — 3 messages
  [10:21] duongdn: Hi em, task log for 2026-07-08 is missing (0h logged). Please update when you can. Thanks!
  [10:22] duongdn: Sorry em, tin nhắn trước bị sai — em đã log 1.5h ngày 08/07 (Peptide Clyde + ETZ-Wathaga) rồi, không phải 0h. Anh nhắn n
  [13:04] khanhhh: Da ok a e đang đi khám răng nên để chiều về e update nha a.

### Arthur - Meta-Stamp — 11 messages
  [10:06] phucvt: Nam Tran: Theo message mà Chris gửi ở trên, thì là có task làm sau demo rồi á anh. Vậy có khả năng David sẽ làm full tuầ
  [10:07] phucvt: * Nam Tran: Theo message mà Chris gửi ở trên, thì là có task làm sau demo rồi á anh. Vậy có khả năng David sẽ làm full t
  [10:15] namtv: Để anh nói ổng phát
  [10:16] phucvt: Ok anh, anh nhớ nói vụ OT 1h bữa thứ 3 giùm em nha
  [10:16] phucvt: Hôm qua bận quá e cũng chưa note với Arthur
  [10:18] namtv: Anh đã hỏi Chris xem sao. Arthur thì cái này chắc ko cần nói nữa, xử với Chris luôn
  [10:22] duongdn: chưa thấy task log hôm qua nha mn BTW, Tien Nguyen  xem điền xong thì review  nha
  [10:24] phucvt: Em vừa log rồi nha anh
  [17:17] phucvt: Just report my process today:  Done: - Checked Chris request and sumarry. - Discussed about project. - P0: 2. Added Prov
  [17:17] phucvt: Tien Nguyen: Anh review report message giúp em nha
  [17:20] tiennd: ok r em

### Bailey - BA/QC — 38 messages
  [09:38] datnc: Bugs a Tuấn sẽ fix ha a Dương? ⚠️
  [09:38] duongdn: yes
  [09:38] datnc: E mới thấy bug để transfer cho ảnh, ko nghiêm trọng để block release nha.
  [09:50] duongdn: uhm hắn làm thôi, ko biết thì đi hỏi mấy dev, giờ thay VietPH handle Bailey mà
  [14:06] duongdn: scope mới sao rồi em
  [14:29] datnc: E thấy Trinh có send cho ổng 1, 2 ticket rồi á, mà ổng đang chưa rep nha. Còn 1 task nữa e chưa review cho bạn để có gì 
  [14:30] datnc: Live có vẻ là ổn rồi, ổng chỉ báo 1 issue mà e reproduce nãy giờ trông như bác bị ảo thui.
  [14:30] datnc: Chờ ổng reply xem.
  [14:30] duongdn: hic, dí ổng nha, ko là tuần sau có task làm :(
  [14:30] duongdn: rất là tình hình rồi
  [14:42] datnc: > I can release payments today as I'm away next week, how ever if there are bugs can you guys give me 2 or 3 weeks times
  [14:42] datnc: Lẹ nha mn, tuần sau ổng đi mẽo gòi í...
  [14:43] duongdn: sợ quá, vậy Trinh Mai  coi payment gởi luôn hôm nay đi :v
  [15:23] datnc: https://globalgrazingservices.slack.com/archives/C0991VDBYDU/p1783582833397869?thread_ts=1783574680.746449&cid=C0991VDBY
  [15:24] datnc: Rep ổng tạm cái gì đó nha Trinh Mai !
  [16:06] trinhmtt: Hi @Joey, We have released the following items and would appreciate it if you could review them and arrange payment at y
  [16:06] trinhmtt: Duong Doan: review giúp em ạ
  [16:10] duongdn: có maintenance task ko bỏ vô luôn :v
  [16:25] trinhmtt: Dạ có, mà em thấy sao tháng 6 có 1h v ta, bth cungx 4-5h á
  [16:26] duongdn: có khi do task id nhầm ko ...
  [16:27] trinhmtt: hay là do log trên workstream k ạ, tại em đang coi trong sheet
  [16:29] duongdn: ko phải, chờ chút  a coi lại tại sao
  [16:32] duongdn: fixed
  [16:33] duongdn: Invoice cũng ok rồi nha, e gởi cus / báo room kia đi hen
  [16:36] trinhmtt: Dạ anh
  [17:01] datnc: Ổng có mới báo bug mobile nha a Dương, e đang có đang nhờ Nam check thử xem coi bug mobile hay console nha a Dương. ⚠️
  [17:01] datnc: Do case này như chỉ bị trên cái PO của ổng.
  [17:24] datnc: Trên live hiện đang có bug mobile, cụ thể do Console đang dùng ID có chứ cho ID product variant. Nhưng bên code mobile l
  [17:25] datnc: Do e thấy bug này hơi... ngáo nhỉ :"|... sợ ổng chửi thui.
  [17:25] datnc: * Trên live hiện đang có bug mobile, cụ thể do Console đang dùng ID có chứ cho ID product variant. Nhưng bên code mobile
  [17:28] datnc: Do sửa chắc cũng nhiều á.
  [17:37] duongdn: lâu thì cần xin, mình chỉ fix free 1 khoảng sau khi release
  [17:39] datnc: Vậy mai Nam cues start fix ha? Còn tốn time bạn hú lại sau hen.
  [17:39] datnc: Do thấy code nhiều chỗ dùng nó int lắm.
  [17:42] duongdn: ko, ổng approve đã rồi mới làm
  [17:46] datnc: Là mình vẫn xin ổng giờ fix vụ này nhỉ? Có gì tối về nhà e nhắn.
  [06:40] datnc: Ổng complain rồi bảo là chờ bugs fix hết rồi mới release payment nha mn!
  [06:40] datnc: Có con bug live liên quan tới stock bên Console nữa á, a Tuan fix luôn nhỉ a Dương? ⚠️

### Bailey - Management — 1 message
  [16:39] trinhmtt: Em có đòi tienf các item này ạ 1. **[Console][Mobile] Picking & Stock Location Enhancements** – 223.03h – **$6,690.90** 

### BDD - Delivery — 16 messages
  [14:04] chientx: Danh sách Jobs ưu tiên 1/ Elena - QC role - AnhNVN:  Cần QC làm task automation, 3/7 đã dí lại, chờ phản hồi => 7/7 đã g
  [14:04] chientx: Elena tới giờ có gì mới thêm chưa NA?
  [14:04] chientx: Rory: vụ contract ổng nói gì rồi?
  [14:04] anhnvn: 1. Bả có rep rồi mà nói ko phải t miss, mà chờ thêm chút vì bả đang process mấy việc khác, sẽ quay lại sau...
  [14:05] chientx: tìm cớ push bả đi e, vd team tui đang plan resources cho mấy tuần tới, trong tuần này sẽ có decision hay không, hay sẽ c
  [14:06] anhnvn: 2. Có điều chỉnh nhẹ về estimate chút ah:  - Total: 148.8h (FE: 80.8; BE: 68.0). Con số này team qua lại sáng nay thì bả
  [14:07] chientx: lần trước discount 5% phải ko? Lúc đó bao nhiêu h vậy e?
  [14:08] anhnvn: 
  [14:09] anhnvn: Lần trước 5% ah, total 124.8
  [14:09] anhnvn: * Lần trước 5% ah, total 124.3
  [14:10] chientx: ok e, vậy 5% tiếp đi e
  [14:12] anhnvn: 4. Rory: sau giao tiếp hqua giao estimate và remind next steps vẫn chưa thấy phản hồi gì. Check bên dự án thì thấy ổng c
  [14:19] chientx: không có kênh chat trực tiếp hả e? Sao phải soạn email vậy
  [14:19] chientx: nhờ dự án gì đó dí thêm giúp
  [14:20] anhnvn: Từ đầu là liên hệ qua mail a
  [14:23] chientx: nhờ bên team dev nhắn dí hỏi thăm KH, báo a done sau khi team đã dí e

### Celine - OhCleo — 51 messages
  [11:26] minhtv: Long Vo:  nay ngó lại giúp a vụ sendgrid xem đã verifed hết chưa? Nếu chưa chắc phải dí bả thêm
  [11:37] longvv: Vẫn chưa nhe a
  [11:37] longvv: để e remind
  [15:39] duongdn: Hung Pham:   Em xem có thể test lại cái relavenace score trên staging giờ được hok, xong a go live, a mới apply 1 số cái
  [15:45] hungpn: để em qua check ạ
  [15:54] hungpn: có cách nào mà nó đỡ 404 k nhỉ
  [15:54] hungpn: image.png
  [15:54] duongdn: a nghe nói cái này là hard code ?
  [15:54] duongdn: phải ko Long Vo
  [15:54] longvv: đúng r nhe a
  [15:55] longvv: dev cũ nó chơi hardcode
  [15:55] duongdn: sao nó phải hard code mà ko dùng data thật vậy
  [15:55] duongdn: live có hard code ko?
  [15:55] longvv: có luôn a
  [15:55] duongdn: VL
  [15:55] duongdn: cái này có được raise chưa Minh Trinh
  [15:57] minhtv: chưa á a , e ko biết case này
  [16:00] duongdn: Vậy Long xem viết ticket mới để báo cus đi ... chứ hard code gì sao được ... BTW, để làm rõ hơn thì tại sao phải hard co
  [16:00] longvv: image.png
  [16:00] longvv: lạy nó luôn
  [16:01] longvv: image.png
  [16:14] minhtv: bả có hỏi vụ email á Long
  [16:16] longvv: Since you also have access to both Cloudflare and SendGrid, could you please double-check everything on your side as wel
  [16:16] duongdn: ơ đúng rồi mình có nè
  [16:16] duongdn: VL vậy mà lâu nay ko biết vô làm luôn ...
  [16:17] duongdn: login = google tony
  [16:17] duongdn: quá chán ...
  [16:17] minhtv: Thằng David nó có kêu nó làm gì đó, vậy chắc cảm ơn, cancel ko cần nữa
  [16:24] longvv: giòn r ae ơi, icloud mail gửi dc r
  [16:25] duongdn: ngon cmn lành
  [16:25] minhtv: image.png
  [16:26] hungpn: staging em check ổn rồi nha anh
  [16:27] longvv: Để e list mấy thằng bị blocked r gửi lại
  [16:29] duongdn: ngon lành, live luôn cho nó xong việc
  [16:42] longvv: E gửi lại mail cho mấy thằng nhận fail r nha
  [16:42] longvv: Đã báo bả
  [16:44] duongdn: Hung Pham:  done, test nha em
  [16:44] hungpn: để em lên check ạ
  [16:52] minhtv: bả hỏi mấy cái hình em gửi có ý nghĩa giề
  [16:58] duongdn: Ít nhất là perofrmance đang nhanh vl, request cả trăm giây giờ đã xuống 3- 4s
  [16:59] duongdn: hi vọng ko phải thế này
  [16:59] hungpn: image.png
  [16:59] hungpn: có thế này hok anh
  [17:00] hungpn: chắc lỗi cũ bữa Long Vo nói thiếu gì nè
  [17:00] longvv: a bấm gì mà bị đó
  [17:02] hungpn: view detail 1 bài track ak
  [17:02] longvv: e ko bi a'
  [17:02] longvv: bấm dô bth
  [17:03] longvv: a thử lại xem Hung Pham
  [17:04] minhtv: tiếp chiêu bả hỏi nữa nhé Long
  [17:04] hungpn: anh đang đi dạo dạo nè

### Delivery - Resource Arrangement — 9 messages
  [13:05] anhnvn: Elena - Java: task vẫn ko phù hợp để người khác làm bù. Chốt để DongNV tự PT bù vào cuối tuần ah.
  [13:27] namtv: Bên này sao khó quá ta. Xem dự án có phù hợp cho BA vào nắm tình hình tasks, breakdown gì đó ko NA. Chứ chỉ dựa vào việc
  [13:32] namtv: Trước mắt case trên thì OK. Anh đã update note
  [13:36] anhnvn: Bên này theo info vốn là dev làm việc trực tiếp với team họ cũng là dev, giao tiếp có cả call trực tiếp nhiều. Với cả cá
  [13:36] namtv: OK em
  [14:39] namtv: Hi Hà Bên Elena có chút task mobile. MinhTV làm (tính hourly) Anh đã update note
  [17:47] halt: Hi a Năm, a Chiến Em đã check note trong Master List: 1/ Web plan: Note trong Master list đã đúng và đủ theo plan đầu tu
  [17:47] halt: ------------- Hi a Năm, Em đã check note trong Master list và remind mọi người các job cần lưu ý trong tuần này, MN đã c
  [17:49] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, hiện ko có case nào còn để lại chưa xử lý

### Direct Manager — 1 message
  [10:54] binhnt: Hi mn ,  Trong quá trình sử dụng app, nếu có gì bất tiện, thấy bug, muốn thêm bớt tính năng v.v. Mn vui lòng submit form

### Francesca - Radio Data Center — 4 messages
  [09:11] lenh: anh có update lại cho đúng nhất phần reply của em cho ổng tại đây https://rdc-fmmonitoring.slack.com/archives/C09L6PH5NU
  [09:12] duongdn: ý là vẫn đang chờ cus reply à?
  [09:19] lenh: Vẫn đang chờ cus confirm mình 1 số câu hỏi. Với cả em chưa thấy gửi Khánh task log hoặc show output cho khách nên cũng c
  [09:19] lenh: Khanh Ho: sắp xếp task log lên workstream nhé

### Growth Mentor Program – Mentors & HR — 1 message
  [11:34] hangdtt: Hi all,  - Hiện tại đã xong giai đoạn pilot, em cũng đã tổng hợp thông tin, khảo sát của Mentor & Mentee - Cũng đã trao 

### James Diamond - Portfolio — 6 messages
  [09:20] duongdn: Hi em, task log for 2026-07-08 is missing (0h logged). Please update when you can. Thanks!
  [11:40] duongdn: Long Vo:  Mai qua làm bù bên này nha Le Ngo  Phuc Vo  xem sắp xếp task cho bạn
  [11:42] lenh: Là mai em vẫn làm, và Long làm song song với em hả anh Duong Doan
  [11:45] duongdn: uhm
  [11:57] phucvt: Le Ngo: Anh xem có gì đưa cho Long làm giúp em được ko anh?
  [11:57] longvv: mấy bug lặt vặt thì đưa em xử hết cũng dc nha

### Kunal - Fountain — 28 messages
  [10:12] vitht: Card này lên BETA rồi nhen mn ơii  https://trello.com/c/B7uPm1Pq/2954-infinity-item-extras [thread: 12 replies]
    └ [10:29] hungpn: qua anh hỏi cía này xíu Vi Tran
    └ [11:37] hungpn: image.png
    └ [11:37] hungpn: confirm dùm anh cai này vs Vi Tran
    └ [11:37] hungpn: hình như đang k luuw thông tin item extra trong trang order của profile
    └ [11:39] vitht: không có design cho cái này á a
    └ [11:39] vitht: chỉ có thông tin trong trang order item admin à
    └ [11:39] vitht: nên e k có làm
    └ [11:39] hungpn: nên mới đi confirm ổng đó nè
    └ [11:39] hungpn: chắc bị sót
    └ [11:41] vitht: để e hỏi ổng thêm cái dụ này
    └ [11:41] vitht: tại thấy cái custom print cũng k có add cái này dô
    └ [13:58] hungpn: cái này thì hok ảnh hưởng tới pricwe, còn cía này thì có
  [10:13] vitht: * Card này lên BETA rồi nhen mn ơii Hung Pham Phat Le  https://trello.com/c/B7uPm1Pq/2954-infinity-item-extras
  [10:22] trinhmtt: Thinh Tran: anh ơi cho em hỏi đợt cái gift of choice á, anh làm chỉ có cho bên personal tab thoi đúng k anh, bên busines
  [10:23] thinht: uhm e, ngày xưa là làm bên đó thôi. vì cus k nói j bên kia nên k mần thêm
  [10:23] trinhmtt: dạ okie anh
  [10:39] datnt: Hung Pham Phat Le 2 anh ơi card này em Done lên Beta 2 cái checklist đầu rồi nha https://trello.com/c/uXAkZ1vM/2965-foun [thread: 4 replies]
    └ [10:40] hungpn: để anh check
    └ [10:40] datnt: còn cái cuối thì tách ra card khác rồi nên anh check 2 cái đầu thôi nha
    └ [11:02] hungpn: okei em
    └ [11:02] hungpn: check done nha @dat
  [11:02] hungpn: * check done nha Dat Nguyen
  [11:41] vitht: * tại thấy cái custom print box cũng k có add cái này dô
  [15:08] thinht: test lại ticket này luôn nhan Hung Pham [thread: 2 replies]
    └ [16:49] hungpn: qua t chơi nè m ơi
    └ [16:54] hungpn: tested DONE nha Thinh Tran
  [16:42] thinht: https://github.com/iamksheth/FountainNewUI/pull/484 Vu Tat đây là PR upgrade Infinity lên Nextjs 16, E xem thử có gì ngh

### Maddy - Extreme Soft Solutions — 112 messages
  [09:08] longvv: https://madhuraka-godahewa.atlassian.net/jira/software/c/projects/LIFM2/boards/4?selectedIssue=LIFM2-447  Thanh Nguyen a [thread: 61 replies]
    └ [09:24] tuantt: 2 chỉ số đó có biết cách tính ko em Long Vo
    └ [09:24] tuantt: Open rate and Spam rate
    └ [09:31] longvv: Postmark nó trả về 2 stats là spam và opens, sent  spam_rate = (spam / sent) * 100 open_rate = (open
    └ [09:33] tuantt: Theo hình trong task thì có vẻ: - Sent = Quotes - Open = Proceeded - Spam chưa hiển thị
    └ [09:33] tuantt: Hay nó là chỉ báo khác nữa em?
    └ [09:33] tuantt: Long Vo:
    └ [09:34] longvv: cái spam e ko rõ
    └ [09:34] longvv: vì postmark có sẵn data
    └ [09:34] longvv: mình chỉ lấy ra tính thoi
    └ [10:13] thanhnx: image.png
    └ [10:13] thanhnx: image.png
    └ [10:14] thanhnx: anh tính theo công thức open rate thì nó chênh lêch dữ ta
    └ [10:26] longvv: Sent, Open, Spam => từ postmark hết á
    └ [10:26] longvv: nên ko chắc chắn nó sẽ đúng
    └ [10:26] tuantt: Long Vo: làm sao coi được data ở postmark e
    └ [10:26] longvv: Này phải xin account á
    └ [10:26] longvv: e ko có
    └ [10:27] longvv: để e request nha
    └ [10:27] tuantt: Data nó trả về cho mình trong API phải ko? Mở F12 coi được ko :-?
    └ [10:27] longvv: xử lý bên BE rùi nên a ko thấy đâu
    └ [10:27] longvv: hoặc
    └ [10:27] longvv: để e đưa cái curl cho anh
    └ [10:27] longvv: đợi e tí e trích ra nha
    └ [10:28] tuantt: Đưa cho Thanh Nguyen để check lun
    └ [10:28] tuantt: Ko được nữa thì xin account
    └ [10:29] thanhnx: 🚀🚀🚀
    └ [10:34] longvv: Overview stats:                                                                                     
    └ [10:36] longvv: fromdate=2026-06-01&todate=2026-07-09  => a tự custom theo cái column Week để check nha
    └ [10:36] longvv: image.png
    └ [10:37] longvv: cơ mà em đang round
    └ [10:37] longvv: tròn lên thành 86%
    └ [10:47] tuantt: {"Days":[{"Date":"2026-07-06","Opens":2587,"Unique":709},{"Date":"2026-07-07","Opens":2259,"Unique":
    └ [10:47] tuantt: Open ra cũng nhiều dữ mà
    └ [10:50] tuantt: Server token bị đổi hả e Long Vo
    └ [10:50] tuantt: Thấy báo invalid nhỉ
    └ [10:50] longvv: ko á
    └ [10:51] longvv: a xem format có sai gì ko
    └ [10:58] tuantt: % curl -sS "https://api.postmarkapp.com/stats/outbound/opens?fromdate=2026-06-01&todate=2026-07-09" 
    └ [10:58] tuantt: Nó báo như này á Long Vo
    └ [11:02] tuantt: Nãy làm thì ra
    └ [11:02] tuantt: :v
    └ [11:04] longvv: curl --location 'https://api.postmarkapp.com/stats/outbound?fromdate=2026-06-01&todate=2026-07-09' \
    └ [11:05] longvv: Xài api này đi a
    └ [11:05] longvv: nó tổng quát hơn
    └ [11:05] longvv: để ý param fromdate=2026-06-01&todate=2026-07-09
    └ [11:05] longvv: phải truyền đúng ngày nó mới khớp với report dc
    └ [11:06] longvv: image.png
    └ [11:07] longvv: Ví dụ a muốn check row này thì a để  fromdate=2026-07-06&todate=2026-07-12 Format là Y-m-d
    └ [11:30] tuantt: Số Sent là số nào á Long Vo?
    └ [11:30] tuantt: Trong mớ response
    └ [11:31] longvv: Sent
    └ [11:31] longvv: image.png
    └ [11:53] thanhnx: image.png
    └ [11:53] thanhnx: image.png
    └ [11:54] longvv: image.png
    └ [11:54] longvv: jztr
    └ [11:54] longvv: image.png
    └ [11:56] thanhnx: kaka hoa mắt nun
    └ [14:47] thanhnx: con này oki rùi nha
    └ [14:47] thanhnx: Long Vo: em đưa bả công thức vs api nha
    └ [14:48] thanhnx: cc Tuan To
  [09:16] duongdn: Có task làm hôm nay ko em, bữa kêu hết task ...
  [09:16] longvv: thấy mới thêm 3 task á a
  [09:16] longvv: 🤣 phê
  [09:31] longvv: * Postmark nó trả về 3 stats là spam và opens, sent  spam\_rate = (spam / sent) \* 100 open\_rate = (opens / sent) \* 10
  [10:26] longvv: * nên ko chắc chắn nó sẽ khớp với cái Quotes và Proceed
  [10:35] longvv: *                                                                                                                       
  [10:35] longvv: * ⏺ # Postmark Spam Rate & Open Rate — curl ## Overview (Sent, UniqueOpens, SpamComplaints) ```bash curl -sS "https://ap
  [10:58] tuantt: * % curl -sS "https://api.postmarkapp.com/stats/outbound/opens?fromdate=2026-06-01&todate=2026-07-09" \<br /> -H "Accept
  [11:04] longvv: * ```curl --location 'https://api.postmarkapp.com/stats/outbound?fromdate=2026-06-01&todate=2026-07-09' \ --header 'Acce
  [11:05] longvv: * ``` curl --location 'https://api.postmarkapp.com/stats/outbound?fromdate=2026-06-01&todate=2026-07-09' \ --header 'Acc
  [15:37] longvv: Thanh Nguyen: https://madhuraka-godahewa.atlassian.net/jira/software/c/projects/LIFM2/boards/4?selectedIssue=LIFM2-449 a
  [15:41] longvv: Cái ý thứ 3: email follow up sẽ được setup ở trang edit status, e đưa ví dụ 1 trang nha  - https://rms.luxe.xtremeweb.co
  [15:45] longvv: Với mỗi email template cũng có setup followup email nữa: - https://rms.luxe.xtremeweb.com.au/admin/quote-email-templates
  [15:46] longvv: Ví dụ khi nào gửi email này nó sẽ tạo schedule email cho cái Follow up Email luôn
  [15:56] tuantt: Vậy làm sao setup được nhiều item vào 1 email á e Long Vo, theo ý số 3
  [15:57] longvv: a tạo nhiều product cùng 1 seller
  [15:57] longvv: sau đó set SKU các kiểu cho nó
  [15:57] longvv: rồi chuyển nó qua cái status có setup follow up email là dc
  [15:58] longvv: image.png
  [15:58] longvv: hoặc test sẵn mấy cái trên này
  [16:02] tuantt: Nó có điều kiện gì để được vào cùng 1 follow up email ko em?  Kiểu như là: - Product A có follow-up email 10 Jul; - Prod
  [16:03] longvv: đúng ùi
  [16:04] tuantt: Vậy là gom lại gửi 1 lần ở follow-up email gần nhất. Cùng template mới vậy, hay khác template cũng vậy em?
  [16:04] longvv: khác template thì sẽ tách schedule mail như thường
  [16:05] tuantt: Đoạn này chắc phải note lại logic giải thích cho bên họ :D
  [16:07] tuantt: Còn ý 1 là như thế nào e Long Vo, chỗ discount đó a vào discount rules lại không thấy chỗ setup email gửi gì :-?
  [16:11] longvv: cái đó phải ấn nút update listing price a
  [16:19] tuantt: image.png
  [16:20] tuantt: Làm sao edit được Seller nhỉ
  [16:20] tuantt: Chọn seller khác
  [16:20] longvv: a ấn nút edit thử
  [16:21] tuantt: Bấm edit nó ra trang edit của Seller đó :-?
  [16:21] longvv: à e quên
  [16:21] longvv: seller
  [16:21] longvv: chỉ dc đổi sau khi tạo product
  [16:23] tuantt: Làm sao set được 1 discount rules cho product ta :-?
  [16:25] longvv: https://rms.luxe.xtremeweb.com.au/admin/discount-rules
  [16:25] longvv: day nha a
  [16:25] tuantt: Discount rule mà active là auto apply cho mọi product thỏa điều kiện hả e?
  [16:26] longvv: Đúng dị
  [16:28] tuantt: https://rms.luxe.xtremeweb.com.au/admin/products/edit?id=86523
  [16:28] tuantt: image.png
  [16:28] tuantt: Bị nữa :v
  [17:05] tuantt: https://rms.luxe.xtremeweb.com.au/admin/products/edit?id=86523 product này đã update listing price, làm sao để setup cho
  [17:07] longvv: image.png
  [17:07] longvv: a bấm vào nút listing price
  [17:07] longvv: nó có 2 option
  [17:09] tuantt: Currently when a discount is actioned, it sends the customer an email notification --> Cái email send trong case này là 
  [17:09] longvv: Đúng ùi
  [17:09] longvv: chính nó

### Những chú voi con đáng yêu — 2 messages
  [16:19] duongdn: https://blog.appsignal.com/2026/07/02/appsignal-monitoring-available-for-php-applications.html?utm_campaign=444515552-GT
  [16:21] phucvt: Hình như nó là thứ em mong đợi bấy lâu nay thì phải

### NUS - Bailey - Paturevision 2026 — 29 messages
  [10:31] namnn: Em gửi bản build nha anh Dat Nguyen  https://appdistribution.firebase.google.com/testerapps/1:93690271171:android:bb9679 [thread: 1 reply]
    └ [10:31] datnc: Cầm cái máy xuống a test nha.
  [11:23] datnc: Cái background job tạo print batch như ko chạy trên live đó mn! Ha Vo , Tuan Nguyen ?
  [11:23] datnc: Screenshot 2026-07-09 112148.png
  [11:25] havs: chắc a Tuấn check trước nha, nào cần e support thì hú
  [11:26] tuannt: a k có ssh live console
  [11:30] tuannt: code thì ok nha. a thử trên local vs code master. e check giúp anh log trên live.  Ha Vo
  [11:30] tuannt: print_all_barcodes_status
  [11:30] datnc: Cái sidekiq nó có stopped ko ta?
  [11:31] tuannt: có thể job lỗi
  [11:31] datnc: Hú Ha Vo ơi!
  [11:33] havs: https://console.paturevision.fr/panel_sidekiq/busy
  [11:33] havs: sidekiq job ở đây nha
  [11:33] havs: check server thì sidekiq vẫn đang chạy
  [11:33] havs: gửi e ssh key nha, e add lenn
  [11:35] duongdn: Host speedventory   HostName 15.236.220.178   User ubuntu
  [11:35] duongdn: Tuan Nguyen:  live đây nha, đã add key như trên staging
  [11:38] tuannt: cái path folder nó là gi vậy a
  [11:38] tuannt: live sử dụng docker hả ?
  [11:40] havs: docker a, path: production/WMS-nov
  [11:40] havs: image.png
  [11:54] datnc: Sao rồi a Tuan Nguyen ơi?
  [11:54] tuannt: từ từ em
  [11:56] tuannt: a có fix tam r. nha biet nguyen nhan r
  [11:57] tuannt: giờ a tạo nhánh push lên
  [13:23] datnc: Live đc chưa a Tuấn? Chắc cần bên Hà review phát nhỉ?
  [13:24] tuannt: > <@datnc:nustechnology.com> Live đc chưa a Tuấn? Chắc cần bên Hà review phát nhỉ? Xong r mà
  [13:26] datnc: :"|... để e check xem.
  [13:26] havs: review & merge PR rồi á, lúc nãy ảnh restart app sidekiq rồi.

### NUS Technology — 7 messages
  [16:43] thaonm: **WORLD CUP 2026 – TỨ KẾT CHÍNH THỨC KHỞI TRANH!** ⚽ Tối nay sẽ có 22 người hồi hộp hơn ai hết khi **Pháp** là đội đầu t [thread: 5 replies]
    └ [16:54] vitht: từ một bàn tay trắng a gầy dựng một đống nợ Thien Tran
    └ [17:08] thinht: một nhà hiền triết từng nói: "Khi bạn có một bàn tay trắng thì đó không phải là tay của người khác" 
    └ [17:13] haonv: bottom2 đang động viên bottom1 cảm động thật sự
    └ [17:14] vitht: vậy ngta có tài sản của mình còn mình có gì a Thinh Tran
    └ [17:14] vitht: ae mấy khúc này đoàn kết quá
  [16:56] vitht: * từ một bàn tay trắng a gầy dựng một mớ bài học kinh nghiệm  Thien Tran

### PHP Projects — 18 messages
  [16:19] duongdn: 
  [16:40] duongdn: Chà, lại nữa rồi :( Bên Blair  Hey Rick. I'm trying to understand why you have spent 68:50 hours on the changes to my we
  [16:46] namtv: Chà
  [16:47] namtv: Ổng disputed toàn bộ số giờ của tuần trước (28h 10m)
  [16:48] namtv: Review với team và breakdown chi tiết để giải trình xem. Và trước hết nội bộ mình thấy con số và output thế nào?
  [16:48] chientx: mà mình bữa giờ làm report ổng theo cơ chế nào vậy a Dương? ⚠️
  [16:51] duongdn: Lúc trước thì daily trên Slack, sau đó thì dùng 1 file google doc, mỗi ngày update status của các task làm rồi note ổng 
  [16:53] chientx: là ổng yêu cầu chuyển qua làm như vậy, không gửi daily nữa?
  [17:13] duongdn: A đang xem với LeNH mấy info trên
  [17:18] namtv: Ổng có gửi file list gì đó nữa nha Duong Doan
  [17:38] duongdn: Đó là file report mà mình dùng cho tuần trước á
  [17:41] duongdn: Cái này là mình làm, lí do là do ổng feedback nhiều thứ nho nhỏ và ko hình dung được qua text, nên mình tạo file để note
  [17:43] duongdn: nó tương ứng effort trong cái file, hiện sẽ chỉ phân tích cái này thôi nha, còn effort tuần trước nữa thì ko xem nha
  [17:44] namtv: uhm, trước mắt là tuần trước. Cần xem giải thích chi tiết, mày review xem hợp lý ko, và review luôn số giờ vậy phù hợp k ⚠️
  [17:50] duongdn: ok mà xin phép làm trễ nha giờ ta đi học 9h mới về
  [17:50] namtv: Nói trước với ổng, hẹn
  [18:33] duongdn: ok
  [02:26] duongdn: Đã report chi tiết  28h10m effort tuần trước cho cus Nhìn chung thì cũng coi như hơp lí, có thứ để giải thích, nhưng về 

### Rory Hackett - BXR App — 57 messages
  [09:36] minhtv: Khoa Tran:  ổng kêu có task cần mình làm, ngó xem thử Jira task nào mới thì mcus
  [09:36] minhtv: * Khoa Tran:  ổng kêu có task cần mình làm, ngó xem thử Jira task nào mới thì múc
  [14:07] minhtv: Có thấy task ko Khoa ?
  [14:10] khoatd: có anh, chiều nay em mới làm mà
  [14:10] minhtv: task gì á ? Giờ chiều rùi mà, ném link task a xem thử
  [14:11] khoatd: mấy nay bên BE/Web hình như ông mới làm chứ không phải bên mình đúng không ae?
  [14:11] khoatd: https://swiftstudio.atlassian.net/browse/BXR-267
  [14:11] minhtv: Ông kia làm web thui, bên mình vẫn làm BE
  [14:12] minhtv: Có 1 chú này thui hả?
  [14:13] khoatd: 1 cái thôi
  [14:13] khoatd: bên Minbody họ update api hay gì rồi
  [14:13] khoatd: mà bên web thì không giống mobile nữa chứ :((
  [14:13] minhtv: coi cần BE thì hú lên
  [14:14] khoatd: cái PT gọi trực tiếp tới API mindbody
  [14:15] khoatd: mà bên web thì cái logic khác nên chắc là không liên quan rồi
  [14:15] minhtv: vậy tự xử rùi
  [14:54] minhtv: data structure nó đổi ,mình đổi theo nó có chạy ko Khoa ?
  [14:54] khoatd: Screenshot 2026-07-09 at 14.54.43.png
  [14:55] khoatd: ae BE check giúp em phát xem chỗ này hiện đang gọi api gì vậy nhỉ?
  [14:55] minhtv: em F12 có thấy ko ta?
  [14:55] khoatd: không rõ, em hỏi ổng mà không thấy tl
  [14:55] khoatd: check kỹ lại cái web tuy có khác nhưng mà xem api đang gọi là gì có thể hữu ích
  [14:55] khoatd: php nên không xem đươc network
  [14:56] minhtv: ném cái link vs account a coi luôn xem thử
  [14:57] khoatd: https://booking.bxrlondon.com/book-a-session.php?location=4 dev2@swiftstudio.co Swift2024!$
  [14:57] duongdn: theo a nhớ thì nó ko dùng API mà viết riêng cho web
  [14:57] duongdn: có cache lại data nữa
  [14:57] khoatd: nhưng em nghĩ cũng phải gọi api của mindbody chứ nhỉ?
  [14:58] khoatd: vì hình như bên mình đâu có quản lý class, trainer đâu
  [14:58] khoatd: * vì hình như bên mình đâu có quản lý class, trainer,... đâu
  [14:58] lenh: Theo em nhớ thì nó call API đến MB, xong cache response vào file. Còn web frontend sẽ đọc từ file
  [14:59] khoatd: check giúp em phát với, có thể gần đây data structure thay đổi, ông dev mới vào làm chắc có update gì đó bên web chỗ này
  [14:59] duongdn: ủa ổng chỉ update web của ổng chứ đâu có up cái trang này ta
  [15:00] duongdn: trang này của mình mà
  [15:01] duongdn: Mà túm lại là vấn đề là gì ?
  [15:02] khoatd: vấn đề đầu tiên là em cần anh em nào bên web xem giúp em cái chỗ page ở trên em nói là đang gọi tới API nào của Mindbody
  [15:03] khoatd: rồi tính tiếp anh
  [15:04] duongdn: nó đang dùng cache :))
  [15:05] khoatd: nhưng lấy từ đâu ra được cái cache đó anh?
  [15:05] khoatd: phải gọi api mindbody chứ?
  [15:05] duongdn: để xem
  [15:38] duongdn: api-audit-260709-1520-book-a-session-mindbody-apis.md
  [15:38] duongdn: chi tiết về các API cua trang nha Khoa Tran  Cần gì thêm cứ nói
  [15:44] khoatd: Ok cảm ơn anh, nhưng mà nó không giống bên mobile thiệt gòi :((
  [15:44] khoatd: hỏi ổng thì ổng lặn mất tiu
  [15:46] duongdn: theo trên thì a thấy lâu nay nó vẫn vậy ko có update gì nha
  [15:46] duongdn: confirm giúp a lâu nay ko có update gì trang này hen ? Le Ngo
  [15:49] lenh: Production thì lâu nay không có update gì trang này, có trên dev khi làm UAE thì mới có update thôi thì phải
  [15:49] duongdn: yeah
  [15:49] duongdn: vậy là nó y chang vậy từ ... lúc mới mở dự án nha Khoa Tran
  [15:52] khoatd: ok 2 anh, để em vào xem config của ổng với xem docs của mindbody
  [15:52] lenh: à, trên web hình như nó chỉ lấy của sweat classes thôi á
  [15:53] lenh: Trên mobile mới lấy của cả bxr với pt
  [15:53] duongdn: trong doc a có nói rõ
  [15:53] khoatd: đúng rồi anh, cái web thì là class thôi, mobile nó khác
  [15:53] khoatd: chỗ như cái web thì mobile vẫn có
  [15:53] khoatd: còn cái bug ổng báo thì bên web không có :((

### Technology Department — 8 messages
  [11:37] namtv: Grok mới ra Grok 4.5, có vẻ hoành tráng, mạnh + nhanh + rẻ: https://x.ai/news/grok-4-5 Nhanh + rẻ thì đúng rồi (thống kê
  [12:02] chientx: Cuộc đua đến bao giờ mới chấm dứt đây 😄
  [13:25] vitht: Mong là khi nó ra model mới thì mấy model cũ sẽ  được free lun càng tốt 💗
  [13:27] vitht: Dùng thử con fable 5 mới có 20' hết token lun rồi : ( phải đợi 30' mới dùng đc tiếp [thread: 3 replies]
    └ [13:32] duongmd: con này e kéo lên ultracode xài để review code thử thì đúng 1 lệnh mà nó làm sao hồi cạn hết token c
    └ [13:33] longvv: Max 5x còn không chịu nổi nó 🤣
    └ [13:33] vitht: đó là cách ng giàu đót tiền đó e :v
  [13:33] vitht: * đó là cách ng giàu đốt tiền đó e :v

### tmp — 7 messages
  [11:20] duongdn: Minh Trinh:  Theo lí thuyết thì mình đang pause cái Celine, nhưng mai LongVV vẫn sẽ làm cái vụ sort issue phải ko A nhớ 
  [11:21] namtv: Tao có nói dev idle nên có thể xem cái nào chắc chắc thì làm trước report sau, nhưng Minh nói ko có cái nào chắc.  Còn c ⚠️
  [11:21] namtv: Issue đó có charge được ko thì còn chưa chắc nha. Tùy nguyên nhân...
  [11:22] minhtv: Vụ Performance, làm cho nó load nhanh á a  ,em cũng chưa chắc charge được
  [11:22] duongdn: ta chỉ cách làm thôi rồi đưa cho dev làm rồi, mà hôm qua lo cái email nên chắc chưa start
  [11:24] namtv: Có thể ko chờ dev được đâu. Trang load 1 phút thì ma nào chờ, ảnh hưởng user live thì nó là urgent ☹️
  [11:24] duongdn: OK, vậy làm nó giờ đi, James để mai Long làm
