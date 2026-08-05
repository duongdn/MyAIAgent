# Matrix — since 2026-08-04 08:59 +07:00

### !cYxDcwWxBhnuXxpryq:nustechnology.com — 2 messages
  [16:24] duongdn: Tí a xin về sớm chút, khoảng 4h45 để đi có việc nha em A sẽ bù sau Thank em
  [16:33] honght: dạ anh

### !oGYjbzEfphvvauBZtq:nustechnology.com — 17 messages
  [10:04] duongdn: image.png
  [10:04] duongdn: kenpal cũng có, nhưng như trên nói, kenpal có rất ít image lỗi
  [10:05] duongdn: cứ tiến hành resize xem sao
  [10:06] namtv: uhm, mà tiến hành cho mấy tenant bị thôi, trước mắt đừng đụng tới đám khác
  [10:07] namtv: Với logic chỗ resize nữa. Lưu file raw, và đổi thành resize theo dimension size chứ ko phải file size nữa
  [10:08] duongdn: OK
  [10:15] namtv: Cái này thì đúng như tao có gửi message họ ấy, ko có gì chắc chắn cả, độ tự tin rất thấp, nhưng giờ có gì thì cũng phải 
  [11:30] duongdn: https://console-async-app.xidtech.com/biophoto/2026-08-04_03-57-17/
  [11:30] duongdn: AUTH_USER = "xidadmin" AUTH_PASS = "X1d@resync2026"
  [11:54] duongdn: https://console-async-app.xidtech.com/biophoto/2026-08-04_03-57-16/
  [11:54] duongdn: chỉ đoán, nhưng Kenpal site hình khá chuẩn nha dù chắc ko phải vấn đề
  [11:55] namtv: Nhìn có vẻ bọn nó setup từ máy chấm công luôn
  [16:16] duongdn: nay ta chưa làm kịp cái vụ resize hình nha local bị lỗi do thư viện cũ quá, mấy cái chạy ko tương thích node 16 nữa (ver
  [16:17] duongdn: đang dùng postman test tạm
  [16:18] namtv: Mày báo họ nha. Ngoài ra, bữa ổng có nói mấy cái security issues, trước đó ổng có báo và kêu fix hay sao nhỉ? ⚠️
  [16:20] duongdn: à uhm, note, để sắp xếp
  [22:51] namtv: Maddy có chút task Wordpress, thuê dev riêng chứ ko phải Kai. Nên lấy ai làm nhỉ?

### !QEbdvaMJkTurMpRPIX:nustechnology.com — 2 messages
  [09:28] phucvt: Hi anh, bên Celine em thấy Long đang làm, nên em ko cần qua đúng ko anh?
  [09:33] duongdn: uhm e

### !SHdFKwrYpRhWJBtiBv:nustechnology.com — 4 messages
  [10:15] vutq: em gửi nha anh Dương: anh Thịnh (Kirk) - weekly usage rate: 50% - method: dùng Claude extension của VisualCode - note từ ⚠️
  [10:19] duongdn: Ok thank e
  [10:19] duongdn: quỡn thì lâu lâu cứ check, 1 phần để remind mn :D
  [10:19] vutq: dạ oke

### !tGBJevbuSmjqVePBPN:nustechnology.com — 3 messages
  [10:07] duongdn: ổng báo gởi rồi nha
  [10:07] halt: Dạ khi nào tiền về tới e báo lại a ạ
  [14:38] halt: Mình nhận được tiền KH thanh toán rồi ạ

### Arthur - Meta-Stamp — 105 messages
  [08:59] namtv: Xử xong đám đó luôn chưa?
  [08:59] phucvt: Ý anh hỏi là in-scope hả anh?
  [08:59] namtv: uhm
  [09:01] phucvt: In-scope thì có cái fixed rồi, có cái đã phản hồi lại cho ổng, có cái thì chưa reproduce được nên mình cũng đã nhắn ổng
  [09:05] tiennd: Inscope bên em đa số fix rùi, còn vài cái cần hỏi ổng nữa anh
  [09:06] namtv: Giờ Phúc cũng idle thôi, nên lôi đám CR ra làm đi, xem cái nào khả năng cao OK (chắc căn cứ trên độ có ích cho app) thì 
  [09:09] phucvt: Ok anh, để e xem project khác có gì làm ko. Idle thì e back lại coi cái nào OK thì làm luôn
  [09:33] phucvt: > First blocker, caught on camera: staging login is rejecting both test accounts. chriscoynetalent+retest0803@gmail.com 
  [09:33] phucvt: * > First blocker, caught on camera: staging login is rejecting both test accounts. chriscoynetalent+retest0803@gmail.co
  [09:34] namtv: Tiến off. Em xem xem
  [09:34] phucvt: Ok anh
  [09:35] tiennd: Ổng có đưa password cho mình ko Phúc?
  [09:35] phucvt: Ko á anh
  [09:45] phucvt: Em có check rồi, thấy signup và login bình thường. Đã kêu ổng thử reset password
  [11:20] namtv: Sao authentication mà ổng gặp lỗi hoài ta? Test kỹ lại theo steps của ổng thử 😐️
  [11:24] tiennd: Em ko biết ổng dùng gì test, mà ổng hay bị sai pass.. quá khứ ổng có 1 lần quên password. Có kêu mình set lại password c
  [11:25] phucvt: image.png
  [11:25] phucvt: Em có thấy một vấn đề, khi signup, thường sẽ cho nhập lại mật khẩu lần nữa. Mà cái này của mình ko có
  [11:26] phucvt: Do thằng Auth0 nó k có hả ta, có cách nào bật k mấy anh
  [11:26] tiennd: Cái này bên form của auth0. Chắc có thể thêm cái field trong mục design form signup
  [11:28] phucvt: Ok anh, để e tìm chỗ thêm vô
  [11:28] tiennd: Em vô thử auth0 xem có trang design signup ko
  [11:38] namtv: Nhưng quan trọng gì vụ này?
  [11:39] namtv: Giờ nhiều trang nó cũng dẹp cái confirm password cho gọn rồi
  [11:42] phucvt: Ok anh, do sợ ổng nhập mật khẩu xong sai thôi. Để e check theo step của ổng và thử login bằng mấy tài khoản của ổng xem 
  [11:47] namtv: Ổng có nói ổng check kỹ, show luôn password các thứ nên khả năng có thể thấp
  [11:49] namtv: >@Chris Coyne I also tried logging back into the account I created almost 2 hours ago. It worked normally. Trả lời như n
  [11:49] namtv: Mình test có dùng alias như ổng ko?
  [11:50] phucvt: Có á anh, em có dùng alias
  [11:51] phucvt: Theo video ổng gửi thì ổng chỉ show password khi ổng login
  [11:51] phucvt: Trong video cũng k có flow sign up
  [11:51] phucvt: Nên k rõ là ổng có nhập đúng password đó khi signup không á  anh
  [11:52] namtv: Anh chưa đọc kỹ nhưng có vẻ ổng nói ổng bị auth0 limit, block gì đó 🤔 Có thể liên quan 🤔
  [11:52] phucvt: Em đang vô Auth0 check cái đó xem có không
  [11:52] tiennd: Trong auth0 có phần log á Phúc
  [11:52] namtv: Khả năng nhập sai password anh nghĩ rất thấp. Ổng đã bị và thử nhiều lần thì việc sai password khó xảy ra
  [11:52] tiennd: Em vào log xem có login xem có báo lỗi gì ko
  [11:53] tiennd: Nhớ xem đúng email của ổng
  [11:54] phucvt: image.png
  [11:55] phucvt: Tìm mấy tài khoản ổng signup là ở màn hình này đúng ko anh Tien Nguyen ?
  [11:55] tiennd: Uk
  [11:55] tiennd: 2 email của ổng đều ko có hả?
  [11:55] phucvt: image.png
  [11:55] phucvt: 4 emails ổngh gửi
  [11:56] phucvt: Có cài nào tồn tại trên Auth0 của mình đâu
  [11:56] phucvt: * Có cái nào tồn tại trên Auth0 của mình đâu
  [11:56] tiennd: Em qua bên tenent production thử
  [11:56] tiennd: Có khi nào ổng tạo bên production là login ở staging ko ta
  [11:56] namtv: Vãi đạn
  [11:56] phucvt: image.png
  [11:56] phucvt: Của mình test thì thấy
  [11:57] tiennd: Switch qua tenant production tìm mấy email ổng thử em
  [11:57] tiennd: * Có khi nào ổng tạo bên production mà login ở staging ko ta
  [11:57] phucvt: Ok anh
  [11:58] namtv: Rồi nói rõ cho ổng những gì mình thấy. Gửi lại site production và staging. Nói ổng xem chắc chắn dùng đúng URL...
  [11:58] phucvt: image.png
  [11:58] phucvt: Trên production tìm cũng k thấy email nào ổng gửi
  [11:58] tiennd: Em vào log bên tenant staging, xem thử có request nào signup ko
  [11:59] namtv: Có khi bị block mà site vẫn báo success?
  [11:59] tiennd: Vào tab monitoring bên sidebar
  [12:01] phucvt: Ok anh, để e trace lại thời gian lúc ổng signup, xem có không
  [12:10] tiennd: ima_481835c.jpeg
  [12:10] tiennd: Anh thấy có requesst này lạ lạ
  [12:11] tiennd: Chưa có user mà sao có requesr change password ta?
  [12:19] tiennd: Case này anh đoán là click reset password nhập email chưa từng có Em thử vào click reset password, input 1 email nào đó 
  [13:22] phucvt: Ok anh, để e check thử. Đang check log tài khoản của ổng trước
  [13:23] tiennd: Thử case anh nói thử em
  [13:25] tiennd: Có thể ổng nhớ nhầm tạo user rồi, sau đó reset password, nó ko báo lỗi email ko tồn tại, vẫn gửi mail.. sau đó set passw
  [13:25] tiennd: * Có thể ổng nhớ nhầm tạo user rồi, sau đó reset password, nó ko báo lỗi email ko tồn tại, vẫn gửi mail.. sau đó set pas
  [13:26] namtv: Cái này bình thường, giờ nhiều app sẽ làm vậy, tránh kiểu dò mail
  [13:27] namtv: >sau đó set password thì báo lỗi user not found mà ổng ko để ý Làm gì nhận được mail mà tới được set password em
  [13:27] tiennd: ima_28efb45.jpeg
  [13:28] tiennd: Em thấy request này nó lạ lạ
  [13:28] namtv: Mà giờ cái quan trọng là khúc signup ấy. Ko có user thì chắc là signup chưa được, ko biết tại sao, có thể là bị block gì
  [13:28] namtv: "Change password request" là forgot password đó em, có gì lạ đâu?
  [13:29] namtv: "request" ở đây ko phải là http request, nó là "yêu cầu". Khi submit 1 cái email ở forgot password thì tức là đang "yêu 
  [13:29] namtv: Ko phải là sau khi nhấn link trong mailk
  [13:29] namtv: * Ko phải là sau khi nhấn link trong mail
  [13:30] tiennd: Ak em thấy cái email hồi trưa em thử củng báo requesst y chang
  [13:31] namtv: Là sao? Em thử cái gì?
  [13:31] namtv: Giờ chỉ có 2 cases thôi: - Signup ko được - User bị xóa Xem tập trung vào 2 cái đó
  [13:36] phucvt: Screenshot 2026-08-04 at 13.36.01.png
  [13:36] phucvt: Em tìm trong log theo tài khoản của ổng thì k thấy
  [13:36] phucvt: Ko thấy log signup
  [13:37] phucvt: image.png
  [13:37] phucvt: Tài khoản của em thì có log đầy đủ
  [13:38] namtv: Vậy khả năng cao bị block rồi. Auth0 nó có cho whitelist gì ko nhỉ?
  [13:40] phucvt: image.png
  [13:40] phucvt: Có á anh
  [13:40] phucvt: Không liên quan cái whitelist, nhưng sao ổng nói ổng signup và vào được app luôn ta - 7:47pm — fresh signup chriscoyneta
  [13:40] phucvt: Em không hiểu chỗ này, lạ quá
  [13:43] namtv: Báo lại ổng kết quả investigate của mình đi, dựa trên đó thì tao đoán khả năng cao mày chưa signup được do Auth0 block,  ⚠️
  [13:44] namtv: Ah, mà có tắt được vụ block ko? Được thì tắt tạm, dễ hơn whitelist do nhiều khi ko biết ổng nhảy đi đâu, IPv6, v4 các ki
  [13:45] namtv: Nếu được thì tắt và nói ổng tắt tạm để mày test cho dễ, đây là môi trường staging nên cũng ko sao
  [13:47] phucvt: Ok anh. Em đã tắt luôn rồi. Để em report ổng
  [14:26] phucvt: Tình hình là ổng signup và login được rồi nha mấy anh. Mai ổng sẽ check lại và reply mình các phản hồi của mình hôm qua
  [14:27] namtv: Phản hồi ở đây là các câu hỏi cho phần in-scope, hay đám mình cho là CR?
  [14:29] phucvt: Cho phần in-scope nha anh, cụ thể là ổng nói sẽ check lại cái số 1 và 8
  [14:30] namtv: Nhắc ổng về CR xem
  [14:30] namtv: Với đám trong 7h bữa ổng đã OK thì done chưa?
  [14:33] phucvt: 7h là cái nào vậy anh? Nhảy qua nhảy lại ko biết có xót cái gì ko
  [14:34] namtv: Xem lại cái message bữa Tiến gửi
  [14:51] phucvt: À e thấy rồi. Mấy cái này chắc để e gọi hỏi anh Tiến mới biết status
  [15:14] phucvt: image.png
  [15:15] phucvt: Anh Tiến có nói đã gọi và report cho anh Năm rồi. Nãy cus cũng có clarified và approve vài cái trong estimate hôm qua. Đ

### Aysar Khalid - Baamboozle — 1 message
  [09:13] duongdn: Hi KhanhHH, nhắc nhẹ: ngày 03/08 anh thấy có 2.5h log trên Baamboozle (Aysar) nhưng chưa thấy update nào trong MPDM. Nhờ

### Bailey - BA/QC — 6 messages
  [09:36] datnc: https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1725853796539899 Lần trc là cỡ 24h QC nha a Duong Doan !
  [09:36] datnc: Chính xác là nó hourly rough est 24.
  [09:37] duongdn: OK xem trả lời ổng đi, lấy lại dẫn chứng trên
  [09:39] datnc: Giờ dev chốt là nhiêu vậy anh? 3h hay 4h á?
  [09:45] duongdn: This can take 2 - 3h to do But I don’t know about testing effort, we should make regression test the Console site, let m
  [09:45] duongdn: 3h đi, hồi trước a củng est vầy nè

### Bailey - Management — 3 messages
  [22:47] namtv: Phần monitor mình đã gửi ổng chưa Trinh Mai ? Sao ổng chưa pay ta?
  [08:29] trinhmtt: bác báo có paid roi ạ
  [08:29] trinhmtt: anh check lại xem ạ

### Celine - OhCleo — 205 messages
  [10:27] longvv: Mobile e thấy có 2 task bên todo: https://trello.com/c/pdoxjpsz/197-bugs-artwork-display https://trello.com/c/DMdAjcl5/1
  [10:28] minhtv: Lữ xúc đê, với coi khách có nhắn tin á
  [10:30] luhx: ồ thấy bả nhắn làm vụ deeplink ha.
  [10:31] luhx: vậy bên Long phải làm cái link nhấn ở mail trước chứ ha.
  [10:31] minhtv: coi cần chuẩn bị cái gì list ra luôn , như branch hay gì đó,  rồi fix mấy chú bugs ở trên
  [10:32] luhx: Minh Trinh: chốt vs BE đi, coi sài thằng nào đi.
  [10:32] luhx: app này chắc chưa có gì làm từ đầu phần đó thôi.
  [10:32] minhtv: Branch đi
  [10:34] luhx: vậy BE ngó setup branch trước đi, ra cái link là đc ha, phần sau đó mobile tự handle, nhớ là cái link phải có track id h
  [10:37] longvv: OK a
  [10:39] hungpn: * hok fai button "Not now"
  [10:52] hungpn: * vậy nếu anh vào 1 track xong nghe 15s lần 1 nó k hiển thị ak?
  [10:55] hungpn: * vào track details nào mà k log in thì đều nghe dc 15s mà
  [10:56] hungpn: * vào track premium details nào mà k log in thì đều nghe dc 15s mà
  [11:02] longvv: * hoặc a vô trang track (vd: https://staging.ohcleo.com/trackdetail/meeting) rồi a f5 5 lần là dc
  [13:39] luhx: Long Vo: có đang làm không check giúp a API GET /api/medias/bykey/{key} này với sao nó trả về tracks và followers luôn =
  [13:40] longvv: E đang làm bên marcel, tí e quay lại
  [13:40] luhx: oke vậy nào check cái trên vs setup branch xong thì hú a nha, tới đó a làm tiếp.
  [14:32] luhx: cus nhắn nha Long Vo
  [14:33] minhtv: Bả nhắn cái Branch đó, Lữ cũng setup dần bên mobile những cái info trước luôn
  [14:55] minhtv: Lữ coi video của khách
  [14:56] luhx: cũng lỗi hôm qua thôi, mà là màn search không phải account setting như qua.
  [14:56] minhtv: Fix trọn gói luôn, chứ ko chơi y xì trên ticket nếu biết nó ở chỗ khác
  [14:57] minhtv: Anyway fix + reply khách nhé
  [14:57] luhx: làm sao biết đâu :v đưa ticket sao làm nấy thôi hà.
  [14:57] minhtv: Test mới biết được , ticket thì đưa cho team như nhau, kêu mình chưa biết chỗ đó để fix
  [14:57] minhtv: * Test mới biết được , ticket thì đưa cho team như nhau, kêu khách mình chưa biết chỗ đó để fix
  [14:59] luhx: để mò thử coi còn chỗ nào khác không.
  [15:01] hungpn: anh xem vs
  [15:01] luhx: a Hùng có slack không?.
  [15:02] hungpn: tai về đi rồi nén cho anh
  [15:02] luhx: vậy chờ em ném lên drive, chứ 91Mb không ném lên đây dc.
  [15:03] hungpn: okie
  [15:03] luhx: https://drive.google.com/file/d/1v7zWDuRXX2Sf975ptzSXYHtoJCCu0irE/view?usp=sharing
  [15:04] luhx: hiện tại có khác nhiều chỗ đang truyền lẫn lộn giữa username và id
  [15:04] luhx: chắc chuyển hết thành username thì có lỗi gì không Long Vo ?.
  [15:04] longvv: e nghĩ là lỗi đó
  [15:04] longvv: mà mobile chỗ nào
  [15:04] longvv: đang truyền lỗi
  [15:04] longvv: thì mình sẽ đổi
  [15:04] hungpn: qua anh đi vòng vòng mà hok gặp ta
  [15:05] luhx: vẫn đề là lúc nó lỗi lúc không, tuỳ acc hay sao á.
  [15:05] minhtv: https://trello.com/c/Q7RThZ2u#comment-6a719bdc59403356fe06db14 Khách có dí estimate nhé
  [15:07] minhtv: Lữ estimate cái ở trên nhé [thread: 20 replies]
    └ [15:09] luhx: mobile: cỡ 6h nhé.
    └ [15:09] minhtv: ko, bả hỏi 3 hướng mà
    └ [15:11] luhx: 1. 3h. 2. 6h. 3. cái này khác gì cái 2 đâu nhỉ? muốn làm cái 2 thì cũng phải làm full thôi.
    └ [15:12] minhtv: Nhanh vậy á, cả Setup toàn bộ ?
    └ [15:13] luhx: tầm đó time thôi, còn chú muốn kéo thêm thì kéo, cơ bản là chỉ setup branch là xong mà, handle deepl
    └ [15:13] luhx: chưa có time BE nhé.
    └ [15:14] minhtv: Long Vo:  lấy cái time BE cộng dồn rồi rep bả phát
    └ [15:22] longvv: BE thì chắc 2h thôi, chủ yếu bên mobile xử lý nhiều
    └ [15:22] minhtv: Nhớ này nhé Long, bả đang hóng
    └ [15:27] minhtv: Thôi , để a rep luôn, chậm quá, 30p chưa rep được tin nhắn họ đang mong chờ
    └ [15:29] longvv: sr a e đang coi deploy cái email lên prod
    └ [15:49] longvv: image.png
    └ [15:49] longvv: https://trello.com/c/Q7RThZ2u/196-%F0%9F%93%B2-deep-linking-from-email-to-app
    └ [15:49] longvv: bả có hỏi
    └ [15:52] luhx: Có nha, 8h là gồm cả phần đó, branch io nó cho config link store của app nếu chưa cài thì nó nhãy qu
    └ [16:13] luhx: bả có rep nha Long Vo  Minh Trinh đọc chả hiểu gì.
    └ [16:21] minhtv: Replied
    └ [16:25] longvv: image.png
    └ [16:25] longvv: bà ấy hỏi thêm nhe
    └ [16:26] luhx: phải build submit bản mới lên store nha.
  [15:09] longvv: https://kykdq.app.link/8ZD9khKak5b Ví dụ e đưa link này thì bên mobile có làm dc gì với nó ko?
  [15:10] hungpn: em tìm mấy thằng creator mà k có track nào á Lu Ho
  [15:11] hungpn: search thằng này thử nè: minniemars
  [15:12] luhx: a kiếm thử coi ngoài search ra còn chỗ nào không, em thấy còn ở vài chỗ như message/ chat.
  [15:15] hungpn: bên anh k gửi chat dc hì
  [15:16] luhx: bị lỗi hay bị gì hả a. [thread: 6 replies]
    └ [15:19] hungpn: 1000013370.jpg
    └ [15:19] hungpn: Bị vậy nè
    └ [15:24] luhx: Minh Trinh: hình như lỗi API á nha, chắc tạo ticket rồi báo bả đi cho Long làm.
    └ [15:24] luhx: thấy nó call API lỗi 400.
    └ [15:25] longvv: này e nhờ mobile cung cấp payload endpoint gọi tới BE nha
    └ [15:26] luhx: ] 'API request failed:', { message: '\'NoneType\' object has no attribute \'created_at\'', url: 'htt
  [15:20] longvv: Lu Ho: https://kykdq.app.link/tEO2dexbk5b e có tạo cái link này kèm track_id
  [15:20] luhx: em cần a làm gì nhỉ?.
  [15:21] longvv: . a cần cái link để xử thôi nhỉ
  [15:21] longvv: h đợi e est bên BE
  [15:22] luhx: à thì link nào cũng dc, có params và mở app là dc.
  [15:22] luhx: cái này phải config trên branch thì phải.
  [15:50] longvv: a có full curl ko [thread: 7 replies]
    └ [15:58] luhx: chờ a log nó ra.
    └ [16:06] luhx: api/messages/bulkfollow/  {"content":"Test"} log ở mobile nên không có curl nha.
    └ [16:07] longvv: ý e là cái curl của medias/bykey/{key} á
    └ [16:07] luhx: à oke, a nhầm :v
    └ [16:11] luhx: LOG  [Search] REQUEST: {"data": {"key": "My sl", "page": 1, "page_size": 20}, "endpoint": "https://a
    └ [16:12] longvv: ok e thay bug r
    └ [16:12] longvv: thanks a
  [15:58] luhx: có bản build prod mới nhé a Hung Pham fix issue trên và https://trello.com/c/pdoxjpsz/197-bugs-artwork-display iOS https
  [15:59] hungpn: bản này nối tới prod hay staging á em
  [15:59] luhx: prod a.
  [16:02] longvv: https://trello.com/c/ziws1Opk/195-%F0%9F%93%A9-popup-anonymous-newsletter-entry => Hung Pham lên prod r nha a
  [16:31] hungpn: mobile có 1 cái bug nè Lu Ho: user mở track A ở homepage xong vào details của track B thì track B tự động auto mở mặc dù [thread: 13 replies]
    └ [16:31] luhx: cho em video đi a.
    └ [16:31] luhx: android hay ios?.
    └ [16:35] hungpn: 1000013372.mp4
    └ [16:36] luhx: bug ảo vậy, để em check.
    └ [16:53] hungpn: tested DONE trên staging nha Lu Ho Long Vo
    └ [16:53] luhx: là cả issue trên và issue search á hả a?.
    └ [16:53] luhx: có bug không.
    └ [16:55] hungpn: đúng rồi
    └ [16:56] luhx: oke a, con AI code tốt phết ta :v
    └ [16:56] hungpn: đưa lên prod đi anh check lại cái nữa nè
    └ [16:56] hungpn: Long Vo: update cái 199 lên prod luôn nha
    └ [16:56] longvv: ok a
    └ [17:05] longvv: deployed
  [16:39] longvv: https://trello.com/c/DMdAjcl5/199-bugs-followers-likes Hung Pham a test con này trên staging nha
  [16:41] hungpn: này bug mobile mà hì? hay em update lại là mobile work đúng
  [16:41] longvv: này lỗi api
  [16:41] longvv: a check lại trên mobile xem nó còn bị ko là dc
  [16:42] hungpn: Lu Ho: có bản nào nối tới staging k [thread: 4 replies]
    └ [16:42] luhx: em không có build staging, chờ xí em build cho 1 bản.
    └ [16:42] hungpn: okie
    └ [16:43] luhx: a muốn android/ios hay cả 2?.
    └ [16:44] hungpn: ios thôi cũng dc
  [16:49] luhx: bản build mới STAGINg nha a Hung Pham , fix issue trên luôn nha, ngó lại giúp em. https://i.diawi.com/y7dwu6
  [16:55] luhx: Report mobile hôm nay nhé Long Vo  - Fix artwork display issues - Fix the Creator Details screen - Investigate the deep 
  [17:16] longvv: Fix the Creator Details screen
  [17:16] longvv: này ticket nào nhỉ
  [17:16] longvv: cho e xin
  [17:16] luhx: không có ticket, nó là con bug bả ném video ở slack á.
  [17:16] longvv: v nó là cái này https://trello.com/c/CH96HWRG/198-bugs-creator-pages
  [17:17] luhx: ủa hình như là nó á.
  [17:29] hungpn: ticket anh tested hết rồi nhé
  [08:40] longvv: https://trello.com/c/Q7RThZ2u/196-%F0%9F%93%B2-deep-linking-from-email-to-app Hnhu bả duyệt làm cái này r
  [08:41] luhx: bên em làm dc gì thì cứ làm đi Long, a setup bên mobile trước.
  [08:41] luhx: thiếu gì hú a.
  [08:41] longvv: https://kykdq.app.link/tEO2dexbk5b
  [08:41] longvv: a xài link này test trc đi
  [08:42] luhx: chưa đâu, setup các kiểu trước đã mới téc đc.

### Delivery - Resource Arrangement — 3 messages
  [09:20] namtv: Hi Hà, Bên Ons thiếu task nên PhongTB có làm Kevin Kung Anh đã update note
  [09:20] namtv: >• SamHT	06/08/2026	Đi khám bệnh	=> Chờ a Năm update plan ==> Tính vào time idle / project internal. Ko cần update note
  [10:38] namtv: NEW	TienND		04/08/2026	Chở người nhà đi khám ở bệnh viện (lúc đầu bạn xin đi trễ nhưng chưa xong việc nên đổi thành off 

### Elena - Active Alerts — 122 messages
  [09:24] duyvna: https://redmine.nustechnology.com/issues/80160 Tri Nguyen e check lại con này nha
  [09:50] anhttl: Tuan Nguyen, Kiet Nguyen: anh nào làm attach file check giúp em bug này với: https://redmine.nustechnology.com/issues/80 [thread: 3 replies]
    └ [09:50] anhttl: Duy Vo: mà này anh mới close hay data cũ rồi á
    └ [09:50] duyvna: mới close
    └ [09:50] duyvna: close alerts hqua Kiệt mới tạo cho a á
  [09:57] anhttl: Check gấp gấp giúp em nha, để nay báo done cho bả nữa
  [09:57] anhttl: File anh Duy Vo attach tên gì
  [09:58] duyvna: image.png
  [09:59] kietnht: Tuan Nguyen:
  [09:59] kietnht: coi thử e ơi
  [10:04] tuanntg: TỨc là a attack hết tất cả files này luôn hả?
  [10:04] tuanntg: Hay chỉ 1 trong số đó?
  [10:05] tuanntg: gửi cho e files đi a Duy Vo [thread: 26 replies]
    └ [10:27] duyvna: gửi mấy file trên á hả
    └ [10:27] tuanntg: Đúng rồi a, để e test local đúng case của a xem sao
    └ [10:28] duyvna: ib riêng rồi nha
    └ [10:29] duyvna: image.png
    └ [10:29] duyvna: a upload file trong screen chỗ này nha
    └ [10:40] tuanntg: ``` {                 "id": "9b9b79c7-fb3c-41c8-af96-ff86241167d5",                 "createdAt": 178
    └ [10:40] tuanntg: E test vài case đều thành công và test luôn case của a thì vẫn có đủ data nha Duy Vo
    └ [10:41] duyvna: trên FE có show file ở audits ko e
    └ [10:41] tuanntg: Cái đó hỏi FE a
    └ [10:41] tuanntg: CÒn data trả về đủ rồi á
    └ [10:43] duyvna: Tri Nguyen: e coi thử có có lấy đúng field theo BE để show ko nha cc Anh Trinh
    └ [10:44] trinm: thì vẫn lấy data trong evidenceFiles mà
    └ [10:47] trinm: cái hình mới nhất trong redmine 80160 anh check API event-history làm gì nhỉ phải check API audit-lo
    └ [10:49] duyvna: nhưng giờ trên UI a ko thấy nó show mấy file đó bên Audits log
    └ [10:49] anhttl: anh test với asset tên gì v anh Tuan Nguyen để em coi lại
    └ [10:50] tuanntg: đây là payload của invest ( không bao gồm payloaad file)
    └ [10:50] tuanntg: ``` {                                                                                               
    └ [10:52] tuanntg: a test local mà
    └ [10:54] trinm: Screenshot 2026-08-04 at 10.54.04.png
    └ [10:54] trinm: trong remine của anh đang check thằng này hay sao anh Duy Vo
    └ [10:55] duyvna: thằng nay nha e
    └ [10:58] trinm: nếu mà như hình em gửi thì API audit-log đâu có trả về data cho evidenceFiles đâu mà show anh
    └ [11:04] duyvna: thì a ko biết nguyên nhân tại sao đó, a có upload file rồi mà khi close xong k thấy nó xuất hiện nên
    └ [11:05] tuanntg: Nếu như là cái Alert #5057 thì nó đã close thành công chưa a?
    └ [11:05] tuanntg: e thấy status nó đâu có CLOSED
    └ [11:05] tuanntg: CŨng không thấy log gì liên quan close
  [10:05] trinm: sao nhin như mấy file này
  [10:05] trinm: Screenshot 2026-08-04 at 10.05.31.png
  [10:23] kietnht: sao rồi Tuan Nguyen , hiểu issues chưa
  [10:39] anhttl: Kiet Nguyen: Chỗ close alert, có 2 issue nữa nha anh: 1. Chỉ có status mà ko có previousStatus
  [10:39] anhttl: image.png
  [10:40] anhttl: 2. Bị lỗi lấy audit log:
  [10:40] anhttl: image.png
  [10:41] duyvna: * trên UI có show file ở audits ko e
  [10:43] kietnht: send a 2 cái id đó Anh Trinh
  [10:47] anhttl: aa377f9a-57a2-46d0-873d-6bf4167cc42d
  [10:48] anhttl: 9193c9b2-fcfc-40cb-9c98-5c72034ac053
  [10:49] anhttl: Kiet Nguyen: anh tạo nhiều nhiều asset để tụi em test cái close với, h hết cái để test rùi hic
  [10:50] kietnht: phải cái id này ko, a thấy e select cái trên mà
  [10:51] anhttl: sorry, này mới đúng nhe:  ba7dd412-f68c-4dbd-885d-1472883c3042
  [10:54] kietnht: wait
  [10:55] kietnht: cái đó như là a tạo đúng ko ta
  [11:02] anhttl: QC test á, anh Duy Vo có nhớ ko
  [11:04] duyvna: đúng rồi, của Kiệt tạo đó e
  [11:05] kietnht: chắc tạm skip cái đó nha, do nó thiếu 1 cái data status NEW đầu tiên
  [11:05] kietnht: tạo bị thiếu @@
  [11:05] kietnht: nên nó ko có previous
  [11:07] anhttl: vậy còn issue attach file ko show trên audit log thì có phải do nó ko
  [11:07] anhttl: ko thì giờ anh reset lại data đi, QC verify lại rồi đưa bả check luôn
  [11:08] anhttl: tạo data mới có vẻ ko ngon
  [11:08] kietnht: để check cái issues thứ 2 xem nó bị gì đã
  [11:10] kietnht: cái này phải e tạo luôn ko á a Duy Vo
  [11:11] duyvna: của e lun
  [11:11] kietnht: hmmm, chắc issues tạo :v
  [11:12] kietnht: để e check
  [11:13] anhttl: cái issue số 2 thì nó hơi rườm rà: + vô A > vô sub alert của A (B) > vô previous của B nên cũng có thể là do data, cũng 
  [11:14] anhttl: * cái issue số 2 thì nó hơi rườm rà: - vô A > vô sub alert của A (B) > vô previous của B nên cũng có thể là do data, cũn
  [11:22] kietnht: do data tạo bị miss field nha ae. issues đầu tiên là thiếu first status issues thứ 2 là miss cái user id
  [11:27] kietnht: còn issues Tuan Nguyen check là sao á
  [11:27] kietnht: nó bị gì, liên quan gì data ko
  [11:28] tuanntg: Không thấy issue gì a, e nghĩ là do close không thành công hay sao á
  [11:29] tuanntg: Chứ khi close thành công thì e check lúc nào cũng có files
  [11:30] anhttl: thôi vậy restore data luôn nha anh Kiet Nguyen, restore thì có đủ asset cùng ownerId để check ko
  [11:30] anhttl: cc Duy Vo
  [11:59] kietnht: Tuan Nguyen: alert id gì á, phải 1 trong 2 cái trên ko
  [12:00] tuanntg: 0b972429-d2f9-4294-93c5-92d9e1ae6d1c
  [12:00] tuanntg: ``` {             "id": "0b972429-d2f9-4294-93c5-92d9e1ae6d1c",             "externalId": 5057,             "ownerId": "
  [12:01] tuanntg: đây a, status close không có, files đã add cũng không có
  [12:01] tuanntg: Thế thì làm gì mà có evidence files được
  [12:08] kietnht: đúng cái alert đó ko vậy ta, a Duy Vo  vào check steps ntn ấy
  [12:09] kietnht: mốt a ghi step tái tạo ghi giúp e cái id của nó, hoặc là cái gì để biết vào chứ ghi alert A, B vậy ko biết đường mở
  [13:27] duyvna: alert sáng này close nè, Tuan Nguyen e check thử có evidence file ko
  [13:27] duyvna: image.png
  [13:27] kietnht: với lại giờ còn test case nào? xong hết đc nhiêu rồi. Restore thì chỉ khi gần xong, verify lại vài cases rồi đưa bả test
  [13:28] duyvna: giờ chỉ cần verify case show file attach nữa là xong rồi đó
  [13:35] kietnht: image.png
  [13:35] kietnht: cái này thì thấy có evidences file rồi đó
  [13:35] kietnht: check thử cái API coi
  [13:38] kietnht: 9193c9b2-fcfc-40cb-9c98-5c72034ac053
  [13:39] kietnht: à cái đó bị lỗi data :v
  [13:40] kietnht: đợi tí
  [13:48] kietnht: fix data rồi a, API trả về đúng rồi nha
  [13:48] kietnht: Duy Vo: check lại thử a ơi
  [13:51] duyvna: image.png
  [13:51] duyvna: giờ thấy show rồi
  [13:51] duyvna: Anh Trinh: khi có nhìu file mình cho nó xuống hàng hay làm scroll ngang như hiện tại e
  [13:58] anhttl: cho nó rớt xuồng hàng á, hú anh Tri Nguyen, rốp rẻng con này đc ko
  [14:00] trinm: ok để fix cho
  [14:04] duyvna: image.png
  [14:05] duyvna: fix nhẹ chỗ fwd này lun nha Tri Nguyen thks kiu
  [14:13] trinm: Screenshot 2026-08-04 at 14.13.46.png
  [14:14] trinm: thấy fix rồi mà anh
  [14:14] duyvna: chỉnh cho UI show như figma lun
  [14:14] duyvna: image.png
  [14:14] anhttl: chắc ý anh là cho nó liền mạch và ko xuống từ đầu hàng mà xuống từ chữ "to"
  [14:14] anhttl: mà em thấy cái đó khỏi cũng đc
  [14:15] trinm: ừa cái hiện tại thấy hợp lý hơn ấy
  [14:21] trinm: cái này done nha
  [14:23] duyvna: restore đi Kiet Nguyen
  [14:25] kietnht: test xong hết rồi đúng hog, vậy giờ restore là đưa bả luôn hay sao á Anh Trinh ?
  [14:26] anhttl: dạ, restore rồi check sơ sơ r đưa bả lun
  [14:26] kietnht: ok đợi phải tầm 2h nha
  [14:28] kietnht: phải tạo lại user nữa, chứ để vậy ko test đc mấy cái forward
  [14:29] kietnht: còn gì nữa ko? ko thì a tiến hành, khả năng hôm nay ko kịp release
  [14:30] anhttl: thoi, em bàn giao cho bả rồi bả muốn tạo thêm thì tạo
  [14:30] kietnht: uhm
  [14:31] anhttl: gửi nha anh Duy Vo ??
  [14:31] duyvna: ok e, gửi đi
  [14:32] anhttl: em báo ròi, làm tiếp reminder nhé

### Elena - Digital Plant — 5 messages
  [13:26] tiennd2: Anh Trinh: hú LA, bà có thân thuộc cái endpoint này đang dùng ở đâu ko `/rule/check/layer`
  [13:28] anhttl: vô 1 investigation á
  [13:28] anhttl: https://demo-3.client.samguard.co/investigation/#/reporting/investigation/9598/4901b836-2427-4d00-b20b-f56549a2fa2e/inve
  [13:29] tiennd2: oke lun để tui check thử
  [13:29] anhttl: image.png

### Kevin Kung - Codeorange — 6 messages
  [09:25] lucnt: Anh Phong Tran  em có 3 task trong To do anh làm được nha anh. Nhớ dùng tracker Tom nha anh
  [09:26] phongtb: A làm hả
  [09:26] lucnt: Đúng òi anh
  [09:26] phongtb: Okie e
  [15:43] lucnt: Chắc anh Nam Tran  miss cái này. Ổng hỏi bên mình có nhận làm việc với third-party Security testing để run test CodeOran
  [15:45] namtv: Mình có thể perform security analysis, nhưng ổng cần third-party thì để anh xem thêm bên network của mình có công ty nào

### Kunal - Fountain — 55 messages
  [09:25] vitht: sao trên infinity roses vẫn thấy mấy card này bị bo tròn ta
  [09:25] vitht: còn trong design không có bị
  [09:26] datnt: cái này do bên design Infinity Thomas chưa có set value trong cái bảng kia cho infinity á chị
  [09:26] datnt: image.png
  [09:27] datnt: nên mình sẽ apply value của bên fountain qua
  [09:27] vitht: E có nói ổng rồi đúng hông
  [09:27] datnt: cái này confirm lại rồi chị
  [09:27] vitht: Trong card nào
  [09:28] datnt: cái đó bên mình confirm thôi chị
  [09:28] datnt: với trong card order cho infinity ổng cũng kêu update lại value cho đúng size màn hình
  [09:29] vitht: ý chị nói cái bo tròn là phải set trong element lun hay sao cái thuộc tính rounded á
  [09:29] datnt: đúng rồi chị
  [09:30] datnt: phải set luôn trong element á
  [09:30] datnt: dù nó nhìn là không bo mà thuộc tính có thì phải set vô á
  [09:30] datnt: image.png [thread: 19 replies]
    └ [09:31] vitht: ý là thấy cái radius nó đang 0px mà, cái này e nói a Vũ chưa
    └ [09:31] datnt: dạ rồi chị
    └ [09:32] datnt: cái này đợt em làm cái update global á
    └ [09:32] datnt: em set hêt về không 0
    └ [09:32] datnt: là sai hết :)))
    └ [09:32] datnt: nên anh Vũ confirm lại cho em cái này rồi á
    └ [09:32] vitht: ý là confirm ở đâu á
    └ [09:32] vitht: không thấy có ghi trong card
    └ [09:32] vitht: https://trello.com/c/lbWnX6N0/2870-infinity-order-flow-updates
    └ [09:34] datnt: confirm bên khách thì em không biết ở đâu, nhưng mà bên mình thì confirm với BA với anh Vũ rồi á chị
    └ [09:34] datnt: Trinh Mai
    └ [09:34] vitht: e nói với QC lun rồi đúng hông
    └ [09:35] datnt: em không có nói, hình như QC biết rồi hay sao á
    └ [09:37] vitht: ==' làm team không có nói miệng đc phải ghi chép lại hết. Sau này lỡ như không phải e mà ng khác làm
    └ [09:42] thinht: cứ config theo variable trong design nha 2e. còn thằng design nó set sai value thì nó tự báo mình sử
    └ [09:43] thinht: QC có lúc nhớ lúc quên sẽ bắt mấy lỗi dạng này. nên có j nếu có bị bắt lỗi thì nhắc QC chớ a bị bắt 
    └ [09:46] vitht: thì do e bị bắt hoài nên e mới kêu là ghi dô cho QC đọc lun á, để khỏi phải bắt dev nữa
    └ [09:47] trinhmtt: De em note vao WS
    └ [11:51] thinht: ah e iên tâm. sẽ còn bị bắt nữa ah. kkk
  [09:30] datnt: giống này nè chị nhìn là không bo nhưng mà có thì phải set vô á
  [11:47] vitht: mấy feedback của card này fix rồi nha a Hung Pham  ơi  https://trello.com/c/B7uPm1Pq/2954-infinity-item-extras  bao gồm  [thread: 3 replies]
    └ [11:49] hungpn: trưa anh sang check cho em nhé
    └ [14:51] hungpn: tested DONE nha Vi Tran
    └ [15:01] vitht: Dạ để e báo ổng
  [11:48] vitht: * mấy feedback của card này fix rồi nha a Hung Pham  ơi https://trello.com/c/B7uPm1Pq/2954-infinity-item-extras bao gồm 
  [11:48] vitht: * mấy feedback của card này fix rồi nha a Hung Pham  ơi https://trello.com/c/B7uPm1Pq/2954-infinity-item-extras bao gồm 
  [13:21] datnt: anh chị ơi giờ em upgrade Infinity Staging lên Rails 8 á, có gì lỗi thì từ từ đợi em fix nha 🥲
  [13:28] vitht: e merge dô staging ok hết gòi đúng hem
  [13:28] vitht: * e merge dô staging ok hết gòi đúng hem : ))
  [13:28] datnt: chưa chị à :)))
  [13:29] datnt: image.png
  [13:29] vitht: e merge dô xong test dưới local trước đi
  [13:29] datnt: em đang á 🥲
  [13:30] vitht: e đem máy xún đây ngồi nè có gì support còn kịp
  [13:30] datnt: dạ oki chị
  [13:33] trinhmtt: https://trello.com/c/Pjn2UFsG/3015-fountain-pro-error Thinh Tran anh check con này trước giúp em nha anh [thread: 2 replies]
    └ [16:59] thinht: Trinh Mai: hiện tại không tái tạo được issue này trên staging. nhưng dựa vào hình ổng gửi xíu xiu và
    └ [16:59] trinhmtt: Dạ okie ạn
  [17:18] datnt: Staging Infinity lên Rails 8 rồi nha anh chị
  [17:19] datnt: có gì anh chị check lại card anh chị xem có bị bug do em upgrade rails ra không nha Vi Tran Thinh Tran

### Marcel - XID — 41 messages
  [13:26] duongdn: === Có task mới nha Long Vo , a est 1.5h Bỏ thêm 1 cột vào (nationbllity) và thay đổi cấu trúc API gọi lên SGBUildIndex 
  [13:26] duongdn: e tiến hành nha
  [13:26] longvv: ok a
  [14:03] longvv: cái cột person_nationbllity là bỏ thêm cho table projects hả a?
  [14:06] duongdn: uhm, từ đây ra nè
  [14:06] duongdn: https://equanimity-talk.slack.com/archives/C063HEYDV5G/p1785399949927119
  [14:06] duongdn: ổng đưa thiếu 1 cột
  [14:08] longvv: theo e thấy là UserInfo có column National r, e hiểu là chắc sẽ map national của worker vào sgbuildex với dưới field là 
  [14:12] duongdn: chắc a hiểu lần, đúng là có dòng 4. *person_nationality* — 2-letter ISO country code of the worker (e.g. BD, IN, CN)
  [14:12] duongdn: worker thì phải là user rồ
  [14:13] longvv: ok a, chắc cũng ko cần thêm thắt gì column, map nó vô sgbuildex là dc
  [14:14] duongdn: e xem dược thì sửa API thôi, sgbuildindex nó hình thành từ procedure, sửa khá là phiền
  [14:14] duongdn: mà đúng là sửa sgbuildindex nó đúng hơn thật
  [14:43] longvv: https://gitlab.com/xid-technologies/xid-asyc-api/-/merge_requests/10
  [14:43] longvv: a check nhe
  [14:47] duongdn: uả trong hàm có person luôn rồi à
  [14:47] duongdn: payload nó có đúng ko vậy? e check cái payload cus gởi chưa
  [14:56] longvv: e check thì các field đúng r, mà e đang check xem sao example payload nó wrap kiểu này [[{...}, {...}]] , của mình hiện 
  [14:57] duongdn: chắc nó display sai thôi, lâu nay ko ai complate gì về format cả
  [14:57] longvv: z ngoài issue đó ra thì ok r á a
  [15:00] duongdn: nation hiện tại có require ko, có vẻ nó phải được require để có info đưa vào trong này
  [15:01] longvv: ko require nha a
  [15:01] longvv: nếu ko có thì set null
  [15:04] duongdn: chuyển thành require đi, ko thì bên SG cũng lỗi à
  [15:05] longvv: e thấy bên sgbuildex nó cũng ko có require field này á
  [15:05] longvv: e check docs r
  [15:07] duongdn: ok cũng nhỏ, làm sau cũng được, mà để hỏi xem
  [15:13] duongdn: Ủa cus nói là đã required rồi mà
  [15:13] duongdn: a cũng thấy vậy trên FE
  [15:14] duongdn: à ko
  [15:14] duongdn: cái này do cái select box
  [15:14] duongdn: e bỏ thêm cái required vô đi
  [15:14] duongdn: để lúc tạo mới nó cũng có, edit 1 user mới tạo nó cũng sẽ required
  [15:14] longvv: ok a
  [15:15] duongdn: còn đã set rồi thì nó lấy luôn nên cus tưởng nó required rồi
  [15:31] longvv: nảy e track đủ 1h30 r e qua OhCleo, h e qua đây cần track tiếp ko a
  [15:31] longvv: tại này cũng lẹ
  [15:36] duongdn: e làm chưa xong cứ mở làm tiếp và note actual nha
  [15:43] longvv: https://gitlab.com/xid-technologies/xid-asyc-api/-/merge_requests/10
  [15:43] longvv: e gửi nha
  [15:44] longvv: * https://gitlab.com/xid-technologies/xid-saas-frontend/-/merge_requests/48

### MCP training — 1 message
  [09:02] phucvt: Ok anh, em vô được rồi nha, để e comment vô

### NUS - Bailey - Paturevision 2026 — 10 messages
  [15:32] datnc: Task upgrade DB approved rồi nha mn! A Tuan Nguyen, Ha Vo  xem thử mình nên update nó trên Rail 5 (Staging1) để live trc
  [15:34] havs: DB thì upgrade riêng trên AWS, cứ làm riêng thôi, hơi đâu mà đợi chung task upgrade rails.
  [15:34] tuannt: đúng rồi
  [15:35] tuannt: rds riêng k cần phải rail6 làm gì
  [15:35] havs: mà RDS thì chỉ dùng cho production thôi
  [15:35] havs: staging dùng postgres container
  [15:36] havs: task này là upgrade PosgreSQL version à?
  [15:37] tuannt: a thấy ổng gửi trong msg là upgrade PosgreSQL version
  [15:41] havs: staging server thì cần check & upgrade PosgreSQL cho container và postgresql-client cho match vs nhau
  [15:43] datnc: Cơ mà mình cần regression test, nên mình cần env nào để test đó mn?

### NUS Technology — 2 messages
  [16:35] thaonm: 🎉 **LEVEL UP PARTY IS COMING!** 🎉 Chỉ còn 3 ngày nữa là chúng ta sẽ gặp nhau tại **Level Up Party** rồi! Cả nhà đừng q
  [16:36] thaonm: * 🎉 **LEVEL UP PARTY IS COMING!** 🎉 Chỉ còn 3 ngày nữa là chúng ta sẽ gặp nhau tại **Level Up Party** rồi! Cả nhà đừng

### PHP Projects — 1 message
  [22:47] namtv: Blair lại lặn mất tăm hả Dương?

### Recruitment — 2 messages
  [09:32] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: - Business Development Assistant
  [17:29] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Apply Business Development Assistant (Fresher/Intern): Hôm nay lọc
