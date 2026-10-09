# Matrix — since 2026-07-05 00:00 +07:00

### Celine - OhCleo — 243 messages
  [09:02] hiepnt: a Hung Pham test lại issue nayuf giúp e với, a nghe bài nào nó thực sự là premium https://redmine.nustechnology.com/issu [thread: 7 replies]
    └ [09:10] hungpn: em vào màn hình detail chưa á
    └ [09:11] hiepnt: dạ r, a test production thử nha
    └ [09:41] hungpn: để anh check
    └ [11:03] hiepnt: nào a check x hú e nha
    └ [11:04] hungpn: tý nha, anh đang bận bên khác vs đợi device
    └ [11:44] hungpn: cái này anh check live hết bị rồi á Hiep Nguyen
    └ [11:50] hiepnt: ok a, do data staging nó bị v, live k bị thì k sao rùi, để e check staging sau
  [10:16] hiepnt: cho e hỏi chút a Hung Pham  https://redmine.nustechnology.com/issues/79543 ở issue này hiện tại luôn luôn hiện 3 track g [thread: 2 replies]
    └ [10:19] hungpn: thì dkd là hiện 3 track có most popular còn k đủ thì vẫn ưu tiên hiển thị most popular trước + 2 tra
    └ [10:21] hiepnt: oki a
  [10:16] duongdn: tuần này be/fe có gì làm ko Minh Trinh
  [10:20] minhtv: bả vẫn muốn offline, tuy nhiên mình chưa done task in-progress cứ múc cho xong luôn a
  [10:21] duongdn: ok có gì mai để Long làm
  [10:40] hiepnt: https://redmine.nustechnology.com/issues/79543 e có check issue này kĩ thì thấy BE không trả về file is_top, nào BE làm 
  [10:43] duongdn: uhm để mai Long Vo  xem
  [10:44] minhtv: a Duong Doan  ơi, review giúp em T6 để chốt bill tuần rồi với
  [10:45] duongdn: ok
  [10:55] duongdn: done
  [11:18] minhtv: Từ tuần này trở đi chúng ta chuyển sang workstream nhé mọi người ơi
  [11:49] hungpn: kết quả vẫn thế anh Duong Doan ạ
  [11:49] hungpn: image.png
  [11:51] duongdn: Để check lại user đó trong db lưu gì đã
  [13:59] hiepnt: produciton lại lag r a Duong Doan v e vô home 1 phút rùi k load dược
  [14:00] duongdn: chắc đúng, a cũng bị
  [14:01] duongdn: để xem log
  [14:03] minhtv: Có cách nào ngăn chặn nó ko a Dương ? Thấy thỉnh thoảng bị , căng phết 🥶
  [14:04] duongdn: phải biết nó bị gì mới chặn được
  [14:10] minhtv: https://trello.com/c/1k51sNO1/186-backend-server-in-production-intermittently-becomes-unavailable-causing-the-app-and-we
  [14:29] duongdn: a đã investigate xong issue, cái này nguyên nhân là cái releanve score nó khá phức tạp , làm ảnh hưởng đến performance S
  [14:50] minhtv: Screenshot 2026-07-06 at 14.50.10.png
  [14:50] minhtv: Cái luồng này bữa Long làm, xong nay bả test số lượng lớn , nó bị bug
  [14:51] longvv: e ko có đụng gì á
  [14:51] longvv: chỉ test tính năng thoi à
  [14:51] minhtv: à, vậy giờ nó thành bug của mình
  [14:52] longvv: nhiều khi bị timeout á, mà chắc phải check xem nếu timeout thì nói bả nhét mấy cái này vào worker hết
  [14:52] longvv: * nhiều khi bị timeout á, mà chắc phải check xem nếu timeout thì nói bả nhét mấy cái này vào worker hết, xong tạo task l
  [14:52] longvv: để e coi sơ qua phải timeout ko
  [14:53] duongdn: theo lí thuyết là vậy, mail cũng cần bỏ vô background
  [14:55] longvv: Jul 05 20:58:24  django.db.utils.IntegrityError: null value in column "user_id" of relation "app_playhistory" violates n [thread: 1 reply]
    └ [16:18] minhtv: `d-60367a3bfc384f419a13b82787e993a7`
  [14:55] longvv: * Jul 05 20:58:24  django.db.utils.IntegrityError: null value in column "user\_id" of relation "app\_playhistory" violat
  [14:55] hiepnt: https://i.diawi.com/8Cbsh6  production mới nha a IOS Hung Pham [thread: 9 replies]
    └ [14:56] hungpn: để anh check
    └ [14:56] hungpn: noted dùm anh bản này build cho tính năng naof vs nhé
    └ [14:58] hiepnt: các issue e fix: https://redmine.nustechnology.com/issues/79456 https://redmine.nustechnology.com/is
    └ [14:58] hiepnt: e fix luôn cả lỗi nghe premium trong detail track sau đó nó hiện popup lên xong back về home app bị 
    └ [15:05] hungpn: okie em
    └ [15:19] hungpn: này anh đang thấy nối tới staging
    └ [15:25] hiepnt: à đúng r, e lộn, a test tạm cái đó nha
    └ [15:25] hiepnt: lúc build produciton có vấn đề nên e cho qua staging
    └ [15:25] hungpn: check done rồi nha em
  [15:18] hiepnt: https://trello.com/c/kz1CBE8v/187-bulk-email-sending-shows-failed-to-send-emails-even-though-emails-may-be-sent-successf
  [15:27] minhtv: https://trello.com/c/HtfPT5JI/183-marketing-e-mails https://trello.com/c/GTM2FFCa/184-e-mails-to-the-webb-users 2 cái nà
  [15:31] minhtv: khách đòi meeting để làm rõ task, nếu ko có câu hỏi gì khác thì em kêu rõ rồi, còn có chắc chat lên đó, tránh mai mới hỏ
  [15:31] longvv: con 184 thì liên quan tới https://trello.com/c/awYi27Ue/117-offer-1-month-free-premium-to-legacy-web-subscribers
  [15:31] longvv: mà https://trello.com/c/awYi27Ue/117-offer-1-month-free-premium-to-legacy-web-subscribers mobile có làm gì ko á?
  [15:32] minhtv: cái đó thì a transfer sau, Hiệp đang làm
  [15:32] longvv: bả muốn gửi mail thủ công cho mấy user đó
  [15:32] longvv: mà htai mình tự gửi luôn r
  [15:32] longvv: anh hỏi lại bả xem bả chọn option nào
  [15:33] minhtv: Cơ bản sẽ có 1 list code, gửi cho users qua email, code a cung cấp sau
  [15:33] longvv: ok a
  [15:33] minhtv: Giờ chưa gửi, bên mobile tạo code đã
  [15:36] minhtv: chú ý coi 2 cái tickets a gửi
  [15:38] longvv: htai thì e ko có gì hỏi bả ở 2 tickets trên nhe
  [15:40] minhtv: Tuần này có vẻ mình chỉ làm tới T4 thui, bả muốn deploy toàn bộ task đang làm, đã làm lên productions
  [15:41] duongdn: Long xem có thể delay Maddy qua đây ưu tiên ko, bù sau, nếu chỉ làm tới t4
  [15:47] minhtv: nên vậy, hiện tại dí như giặc bên này
  [15:48] longvv: Z để e qua
  [15:59] minhtv: No I will leave tomorrow, so lets wrap things up today. => Bả sửa lại wrap up lên production hôm nay
  [15:59] minhtv: Nãy có tính năng redeem code, thì bả okay tới T4, nếu ko có cái đó thì hôm nay
  [16:01] duongdn: task nào vậy? còn có 1h có làm kịp ko?
  [16:02] minhtv: https://trello.com/c/HtfPT5JI/183-marketing-e-mails
  [16:02] duongdn: và nó rất risk nha ...
  [16:02] minhtv: Này quan trọng
  [16:02] minhtv: em đang xin tới ngày mai
  [16:06] hiepnt: https://i.diawi.com/L7rXcX bản production nha a, ngoài cái list kia thì có thêm ẩn trang payment ở seting ( payment khôn
  [16:06] hiepnt: * https://i.diawi.com/L7rXcX bản production nha a, ngoài cái list kia thì có thêm ẩn trang payment ở seting ( payment kh
  [16:06] minhtv: Dùng TF luôn đi
  [16:19] minhtv: Sao thấy bên Maddy sôi nổi ta, chưa qua bên này được nhỉ 🥶
  [16:19] longvv: e đang làm á
  [16:20] longvv: * e đang làm bên này á
  [16:20] minhtv: thấy chat bên kia liên tỏi, tiếp tục focus nhé 🤣🤣
  [17:22] longvv: https://trello.com/c/HtfPT5JI/183-marketing-e-mails task này e test thấy ok rồi
  [17:25] hiepnt: cho e xin report
  [17:25] longvv: Marketing e-mails
  [17:25] longvv: hết =))
  [08:46] minhtv: Hôm nay mình cần release mọi thứ nhé mọi người ơi. - Tất cả những cái ở To do + In-progress - Release toàn bộ lên live, 
  [09:25] duongdn: thấy có vẻ nhiều, khả thi ko Long Vo  ?
  [09:26] minhtv: Screenshot 2026-07-07 at 09.26.17.png
  [09:26] minhtv: 4 tickets này thôi á a , ko nhiều đâu , chứ ko phải Todo General
  [09:27] duongdn: uhm, nhưng nhiều đấy, toàn task ko nhỏ
  [09:27] longvv: Cái cache cần test kĩ ấy
  [09:27] longvv: E nghĩ k release nổi
  [09:27] longvv: Trong nay á
  [09:28] minhtv: Vậy tập trung cái này trước  https://trello.com/c/kz1CBE8v/187-bulk-email-sending-shows-failed-to-send-emails-even-thoug
  [09:28] longvv: Ok a
  [09:28] minhtv: bị lâu là cái improve BE đúng ko ?
  [09:29] minhtv: https://trello.com/c/1k51sNO1/186-backend-server-in-production-intermittently-becomes-unavailable-causing-the-app-and-we
  [09:29] longvv: Đúng r á a
  [09:30] minhtv: do nó dính tới relevant score , có khi nào mình tính toán liên tục ko nhỉ ? Hay bao lâu mình tính lại 1 lần ?
  [09:33] duongdn: mình có queue, tốt nhất là cứ mỗi lần update thì tạo 1 cái queue để update 1 lần Có thể nó ko chính xác 100% nhưng đủ tố
  [09:36] minhtv: cái này do cái relevant score gây ra, hôm nay chắc ko kịp nên mình release tính năng. Nhưng để improve cái này , thì tuầ
  [09:47] duongdn: ý là bả yêu cầu mình stop work sau hôm nay à?
  [09:48] minhtv: đúng rùi a , đáng ra là hôm qua luôn, mà em xin thêm hôm nay
  [09:48] duongdn: uhm vậy cứ report, rồi mai mình làm sau
  [09:49] longvv: https://trello.com/c/kz1CBE8v/187-bulk-email-sending-shows-failed-to-send-emails-even-though-emails-may-be-sent-successf
  [09:49] longvv: image.png
  [09:49] longvv: e thấy nó gửi r nha, chắc h đưa vào queue thôi
  [09:56] minhtv: nó gửi rồi ,bả chắc điều đó , nhưng sao lại hiện thông báo failed , đó là cái khách quan tâm
  [11:02] hiepnt: bản staging mới nha a Hung Pham  https://i.diawi.com/Vm9ifq [thread: 21 replies]
    └ [11:03] hiepnt: - https://trello.com/c/xQD8MPpb/185-google-sign-up-sets-username-to-display-name-and-leaves-firstnam
    └ [11:04] hiepnt: các thay đổi nha a Hung Pham
    └ [11:50] hungpn: 185 anh thấy lấy cái username vs fullname chưa đúng nè
    └ [11:51] hungpn: 1000013212.jpg
    └ [11:52] hungpn: để anh xóa thử account này do anh sợ data cũ
    └ [11:53] hiepnt: a dùng tk gg cty ă, tk mới lun a
    └ [11:53] hungpn: emma040296@gmail.com Long Vo xóa user này khỏi data anh với
    └ [11:53] hiepnt: a lấy tk gg cá nhân của a thử, này trên staging thui
    └ [11:53] hungpn: để anh thử
    └ [11:56] hungpn: Hiep Nguyen: chắc fix dùm anh cái lỗi user deleted account nhưng k bị logout khỏi app cái nhé, xíu a
    └ [11:57] hiepnt: nó có xoá được k a
    └ [11:57] hungpn: xóa dc
    └ [11:57] hungpn: nhưng account vẫn đang còn login mới ghê
    └ [11:59] hungpn: 1000013213.jpg
    └ [11:59] hiepnt: ok a, để e fix cái đó
    └ [13:51] longvv: cần xóa nữa ko á a
    └ [13:58] hungpn: thôi k cần nữa nè
    └ [13:59] hiepnt: ổn k a, có issue j k a
    └ [13:59] hungpn: ổn nghe em
    └ [13:59] hiepnt: oki a, để e làm cái delete r build production
    └ [14:23] hiepnt: e test lại thấy xoá account bình thường mà ta, a xoá nó báo gì a
  [14:22] longvv: https://trello.com/c/kz1CBE8v/187-bulk-email-sending-shows-failed-to-send-emails-even-though-emails-may-be-sent-successf [thread: 35 replies]
    └ [15:07] hungpn: Long Vo: anh thấy gửi email thành công nhưng k thấy email nào dc sent tới user? ví dụ như anh gửi em
    └ [15:08] longvv: a gửi mail nào á
    └ [15:08] hungpn: Welcome registration: 				d-fa86dccef4ee49f283dd161a8766ca73
    └ [15:09] longvv: a gửi với template d-fa86dccef4ee49f283dd161a8766ca73  hả
    └ [15:10] hungpn: đúng rồi
    └ [15:10] longvv: a check trong mục spam chưa
    └ [15:11] longvv: ủa
    └ [15:11] longvv: làm gì có cái template nào d-fa86dccef4ee49f283dd161a8766ca73
    └ [15:11] hungpn: d-8a432ba230d34856bad8515ec96ca3cf -- anh thử cái này đc nè
    └ [15:11] longvv: e ko thấy trên sendgrid
    └ [15:12] longvv: ok z a thử mấy cái có sẵn trên đó đi
    └ [15:12] longvv: image.png
    └ [15:12] hungpn: template này đợt anh lấy bên list em gửi anh á, còn cái anh lấy thì có rồi
    └ [15:12] hungpn: nhưng mà k có thông báo sau khio gửi email thành công cho tới user hả em
    └ [15:13] longvv: là sao á
    └ [15:14] longvv: ý a là cái toast hoặc popup thông báo gửi thành công sau khi gửi hả
    └ [15:14] hungpn: đúng rồi, anh k biết khi nào nó sent xong
    └ [15:14] longvv: ủa
    └ [15:14] longvv: e nhớ e có để cái progress ở dưới cùng á
    └ [15:15] hungpn: anh k kéo xuống là cũng k biết nè :D
    └ [15:15] hungpn: staging có nên chơi gói này k đây nhỉ?
    └ [15:15] hungpn: image.png
    └ [15:15] longvv: chắc ko =)))
    └ [15:15] longvv: gửi mail thiệt cho user lun á
    └ [15:17] hungpn: 🤭
    └ [15:17] hungpn: image.png
    └ [15:17] hungpn: loading tới bao giờ nhỉ?
    └ [15:18] hungpn: Long Vo: đã bị skip mà thấy như vẫn đang chạy loading ấy
    └ [15:18] longvv: Worker đang đợi mấy cái task để nó gửi mail thui, ko cần thiết thì e bỏ
    └ [15:19] hungpn: ý là skip thì là bỏ qua rồi đúng k?
    └ [15:24] longvv: bỏ qua r á, này thôi để e chỉnh lại UI
    └ [15:24] longvv: hiểu lầm
    └ [15:35] hungpn: okie em
    └ [16:21] longvv: Hung Pham: check lại nha a
    └ [16:28] hungpn: tested DONE nha Long Vo
  [14:22] longvv: https://admin.staging.ohcleo.com/dashboard/emails trang này
  [15:08] hungpn: * Welcome registration: 				 d-fa86dccef4ee49f283dd161a8766ca73
  [15:24] longvv: * user hiểu lầm mất
  [15:59] longvv: https://trello.com/c/WY9Xkzz0/174-sort-creator-audios-by-popularity Cái này a Hùng test chưa á Hung Pham [thread: 2 replies]
    └ [17:07] hungpn: staging hay live á Long Vo
    └ [17:07] longvv: staging á
  [16:08] hiepnt: production lên r nha a , TF version 3 Hung Pham
  [16:19] duongdn: status bên BE sao rồi mn
  [16:19] duongdn: nhìn qua thì dev done hết rồi trừ cái vụ cache , ghê ta  :d
  [16:24] longvv: image.png
  [16:24] longvv: cái này mình lên prod chưa ta
  [16:24] longvv: a Duong Doan ới
  [16:24] longvv: e nhớ bữa cũng merge vào prod nhiều, ko biết task này merge chưa
  [16:25] longvv: https://trello.com/c/4D7QyLU8/127-security-issue-password-reset-codes-never-expire Hung Pham a test task này nhé, test c [thread: 31 replies]
    └ [16:28] hungpn: để anh coi
    └ [16:51] hungpn: cái code trên stagin bao lâu hêts hạn á Long Vo
    └ [16:51] longvv: e mac dinh 30p
    └ [16:51] longvv: a xai nick nao
    └ [16:51] longvv: e hack cho
    └ [16:52] hungpn: emma.test34
    └ [16:54] longvv: a gửi request reset xong r báo e
    └ [16:55] hungpn: anh gửi rồi
    └ [16:55] hungpn: emma+33@nustechnology.com vs cái link  forgot pw này nữa nha
    └ [16:55] hungpn: https://staging.ohcleo.com/reset-password?code=2137db9b-c76d-4f96-9254-36b5ab8a7c8e
    └ [16:55] longvv: ủa a gửi trên site nào
    └ [16:55] longvv: staging đúng ko
    └ [16:55] longvv: oh ok
    └ [16:56] longvv: r á
    └ [16:56] longvv: e mới cho nó expired luôn r
    └ [16:56] longvv: a thử
    └ [16:56] hungpn: 2 cía luôn hả
    └ [16:56] longvv: emma+33@nustechnology.com
    └ [16:56] longvv: cai nay
    └ [16:56] hungpn: anh tưởng cái trên kia
    └ [16:57] hungpn: để anh đk tài khoản mới rồi em update lại nhé
    └ [16:58] hungpn: emma+35@nustechnology.com
    └ [16:58] hungpn: email anh mới đk tài khoản thành công á, cho mã code hết hạn dùm anh
    └ [16:58] longvv: ko
    └ [16:58] longvv: password reset cơ
    └ [16:58] longvv: ko phải cái code verify email á
    └ [17:01] hungpn: vậy cái code đó k bị hết hạn hả em
    └ [17:08] longvv: htai la z á
    └ [17:08] longvv: mới có task cho password reset thui à
    └ [17:08] hungpn: okie em
    └ [17:09] hungpn: vậy cái reset pw anh tested DONE nha Long Vo
  [16:26] duongdn: mấy cái liên quan relevance scope đã go live hết rồi nha
  [16:36] minhtv: Ready hết chưa, báo khách phát nào
  [16:36] minhtv: Mobile , FE, BE
  [17:08] hungpn: tested DONE nha Long Vo
  [17:08] longvv: ok a
  [17:08] minhtv: Kéo hết qua ready to test được chưa mọi người ơi ?
  [17:12] longvv: còn 1 task e chờ a Hùng check nha a ơi
  [17:12] longvv: còn lại đưa lên live hết r
  [17:12] minhtv: Cái nào ready kéo cái đó đi e ơi
  [17:15] hungpn: Long Vo: emma+22@nustechnology.com tặng dùm anh thằng này lên premiun 1 tháng vs
  [17:17] longvv: image.png
  [17:17] longvv: ủa gift r á
  [17:20] hungpn: tested DONE nha
  [17:25] longvv: image.png
  [17:25] longvv: e cho lên hết prod r nha
  [17:36] hiepnt: Hey! Just checking in, were you able to locate if the e-mail were sent out yesterday? Khách có nhắn hỏi ă a
  [18:47] minhtv: Long check xem trả lời em ơi
  [20:43] longvv: Hey! Just checking in, were you able to locate if the e-mail were sent out yesterday? => này e chưa hiểu lắm, là bả hỏi 
  [08:59] minhtv: ý là hôm qua bấm gửi, báo failed . Nhưng đã gửi chưa ? Giờ gửi nó double
  [09:45] duongdn: Này muốn check thì đầu tiên phải xác định nó gởi bằng mail service gì  thương mấy cái email service nó sẽ ghi lại activi
  [09:45] duongdn: Long Vo:  tình hình check sao, sao thấy im re vậy
  [09:50] longvv: Sáng h e lu bu ở bệnh viện
  [09:50] longvv: image.png
  [09:50] longvv: e check thì ko bị double
  [09:50] longvv: mail a có bị ko á Minh Trinh
  [09:51] minhtv: A ko thấy cái nào, cả mail tony + mail cá nhân
  [09:57] longvv: Nó có ghi skipped hay gì k a
  [09:59] minhtv: ý là ko nhận được email đến á , ko biết lý do. Em lo việc nhà đi ,chiều lên cty ngó sau
  [09:59] longvv: Okay a
