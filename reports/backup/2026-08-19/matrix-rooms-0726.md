# Matrix — since 2026-08-18 08:49 +07:00

### !aaumKvfltGlhqcQjJP:nustechnology.com — 3 messages
  [16:30] binhnt: 6/ Blair B																									Aug 17: A Dương đã dí lại KH, vẫn chưa thấy ổng phản hồi gì																									 
  [17:16] duongdn: dạ ko
  [17:16] duongdn: mình tự nói một mình thôi ổng ko trả lời lâu nay ạ

### !cYxDcwWxBhnuXxpryq:nustechnology.com — 2 messages
  [14:51] duongdn: hi em A xin phép về sớm hôm nay (~4h) Lí do: vợ có việc nên a đi đón con A sẽ bù lại sau trong tuần
  [14:52] honght: Dạ

### !LpINYVvtgacbKsexsa:nustechnology.com — 44 messages
  [14:12] duongdn: https://github.com/Mintplex-Labs/anything-llm/issues/5532
  [14:13] duongdn: theo như a tìm hiểu thì AnythingLLM chưa hỗ trợ xử lí video  Nhu cầu này cần nhiều ko, có thể a sẽ phải tìm 1 AI agent k
  [14:29] duongdn: === Status task thế nào, có cần discuss gì với a để a review ko
  [14:29] duongdn: cần a phụ gì ko
  [14:29] datnc: Chờ e xí e đang meeting xí nha.
  [14:32] duongdn: ok
  [15:14] datnc: Nhu cầu upload video chắc không cần nhiều nhan anh. Vì con AnythingLLM này có vẻ là hợp lý với use-case hiện tại cho các
  [15:14] datnc: Và a cho e khóa git 101 crashed course nha :")).
  [15:17] duongdn: > E thấy có bản desktop (Mà bản này nặng lắm) máy cty mình chạy cũng xật xừ á. Chắc cần nâng cấp máy, a đang dùng bảng d
  [15:26] datnc: Do máy của BA/QC thường yếu hơn máy dev đó anh, trừ khi tụi e dùng máy cá nhân. Cơ mà e thấy cái local docker cũng hợp l
  [15:27] datnc: Với data nó vẫn lưu ở folder riêng nên khi cần update chỉ cần nuke cái container đó gòi pull cái latest về :-?.
  [15:28] duongdn: theo a biết thì docker sẽ nặng hơn, vì docker mình chỉ dùng được 1 số % nào đó power của máy
  [15:28] duongdn: còn khi em dùng bảng desktop thì nó tận dụng resource máy
  [15:30] datnc: Ẹc sao ở cái docs requirement specs của họ nó báo thấp hơn á chứ =)). https://docs.anythingllm.com/installation-desktop/
  [15:30] datnc: Theo e có đọc thì do cái desktop có cài và chạy 1 đống model local, dù a ko xài nó vẫn chạy.
  [15:31] duongdn: cái đó thì đúng, còn cái a nói là về thuần docker vs native app
  [15:31] datnc: Mà nó lag bên máy cty của mình thiệt.
  [15:31] duongdn: để a cài dạng docker vào so sánh xem
  [15:55] duongdn: E thử máy e xem, còn máy a bật docker lên giật như điên ...
  [15:55] datnc: Bên e nó nhẹ hơn á chứ...
  [15:57] duongdn: lạ ghê ... ok chủ yếu là bên em, vậy a cũng dùng docker, để a viết guide vụ skill cho em, a cũng làm cho e 1 cái skill l
  [15:57] duongdn: để a test skill xong rồi release
  [15:58] datnc: https://docs.anythingllm.com/installation-docker/local-docker
  [15:58] datnc: E cài theo cái guide này thui ạ... trừ khi có gì đó đặc biệt hơn.
  [16:00] duongdn: mới vô thì chắc hiểu luôn, docker ko prefer dùng local model
  [16:01] duongdn: OK chốt docker đi
  [16:01] duongdn: sẵn công ty mình có key
  [16:01] duongdn: nhưng nếu nó chạy docker, thì có 1 khả năng nó ko accept tốt vào local folder,  Để mai a check kĩ hơn, rồi có gì báo em
  [16:02] datnc: E có làm nó access đc vào folder á a.
  [16:02] datnc: -v /mnt/hgfs/Documents:/app/server/storage/anythingllm-fs/documents \
  [16:02] datnc: A thêm cái gì đại loại vậy vào lúc docker run nha.
  [16:03] datnc: Là nó sẽ xem đc /mnt/hgfs/documents dưới local của e.
  [17:09] datnc: A Duong Doan rảnh add ThuongNL vào redmine Bailey hộ e nha.
  [17:09] duongdn: vẫn  chỉ là 1 folder thôi ko global
  [17:10] duongdn: có vẻ nên dùng anydesktop  sẽ tiện hơn khúc này
  [17:13] datnc: Desktop e thấy vẫn add thêm folder mà ta :-?.
  [17:13] datnc: Kiểu để tránh agent nó read/write bậy bạ á.
  [17:14] datnc: Chắc mình add cái /user/ là ok gòi.
  [17:14] duongdn: uhm nhừn ko cần báo mỗi lần chạy docker
  [17:14] duongdn: này khác
  [17:15] datnc: À... e tưởng chỉ add lúc docker run (start container lần đầu tiên) thui chứ docker start với docker stop sau này ko cần 
  [17:15] duongdn: ý là với mỗi project e phải start riêng
  [17:18] duongdn: a vẫn prefer desktop app hơn  để a tìm cách setup nó nhẹ vậy tiện hơn nhiều
  [17:19] datnc: Vâng ạ! Do e thấy ví dụ share nó documents, rồi ở trong đó có project-a, project-b gì gì đó cần nó lv ở cái nào thì hú n

### !oofREYAXHsvPWEOJev:nustechnology.com — 6 messages
  [17:22] thuyltt: Ùa Dương còn ở cty kooo
  [17:22] duongdn: nay mình về sớm đón con nha Chức Nữ 😂
  [17:22] thuyltt: gõ lâu là biết gòi
  [17:22] thuyltt: =)))
  [17:22] thuyltt: mai hú hỉ
  [17:22] thuyltt: (hy vong mai ok =))

### !SeUEiIwonoInzrJhQX:nustechnology.com — 7 messages
  [16:56] hangdtt: Anh ơi,  Năm nay anh vẫn đăng ký Bảo hiểm sức khỏe cho người thân như năm ngoái hở anh ơi?  hay có thay đổi gì ko ạ? (No
  [16:58] duongdn: ko nha e vẫn là vợ mẹ 2 nhóc
  [16:58] duongdn: mua thêm được ko :v
  [16:59] hangdtt: dạ ok anh, vẫn ds cũ ạ
  [17:00] hangdtt: hết slot cho nhóm phụ rồi ạ. em đk từ năm ngoái mà vẫn chưa được luôn 😂
  [17:00] hangdtt: Vậy khi nào có chi phí chính thức thì em báo anh sau nha ạ
  [17:01] duongdn: ok e

### !tGBJevbuSmjqVePBPN:nustechnology.com — 2 messages
  [11:03] halt: Hi a Nhờ a nhắc KH James Diamond thanh toán bill tháng 7 giúp e vs ạ, e có gửi email nhắc rồi nhưng vẫn cần dự án nhắc ổ
  [11:03] duongdn: ok e

### Arthur - Meta-Stamp — 7 messages
  [09:44] namtv: Ổng có message nha
  [13:29] phucvt: Nam Tran Bên này ổng có duyệt estimate 2 task để mình làm (tổng 3.5h) và có một issue cần mình kiểm tra/xử lý á anh.  Ti
  [13:30] tiennd: Anh đang bận bên khác nên chưa qua dc
  [13:31] namtv: Issue đó có gấp ko?
  [13:34] phucvt: Ko gấp nha anh. Nhưng cũng cần xử lý sớm cho ổng
  [13:36] phucvt: Ổng kêu ưu tiên xử lý cái này cho ổng, so với 2 task kia. Do đang block step tiếp theo của khách ổng
  [15:44] namtv: Chắc hứa hẹn mai xử lý đi

### Bailey - BA/QC — 20 messages
  [09:17] datnc: Nào meeting vại Trinh?
  [09:19] datnc: * Nào meeting vại Trinh Mai ?
  [09:21] trinhmtt: 2h30 chiều này  anh oi
  [09:24] datnc: Tí mình meeting nhẹ trc khi gặp ổng ha, để khỏi rớt cái gì đó? Gòi a ngồi chung meeting luôn cũng đc.
  [09:24] trinhmtt: dạ okie anh
  [09:25] trinhmtt: anh book phòng chuaw
  [09:27] datnc: Chưa á, dị e book 1 tiếng luôn đi.
  [09:27] datnc: 45p cũng đc :V.
  [09:27] trinhmtt: dạ để em hỏi anh Tuấn mấy giờ ổn
  [09:29] datnc: À ý là book gòi mình ngồi đó discuss xí gòi meet với ổng luôn á =)), còn nếu kẹt thì internal mình gặp nhau giờ khác cũn
  [09:33] trinhmtt: dị hả, v để em dời book họp, tại em book 2h30
  [17:15] duongdn: chị Bình nhắc đưa task lên nha mn
  [17:17] datnc: Bên Ws e vẫn review giờ charge a nhỉ?
  [17:18] duongdn: uhm e như cũ thôi
  [17:19] trinhmtt: tụi em đâu có quyền add tags đâu ạ
  [17:19] datnc: Vậy e phải có role techlead gòi a... hoặc là a enable need_reviews=true lên hết nha. Còn e thì is_reviewer=true.
  [17:20] datnc: Ủa mà add tag như manager/teadlead thui Trinh Mai nhỉ?
  [17:20] trinhmtt: dạ đúng rui
  [17:20] duongdn: e báo chị Bình vấn đề này nha
  [17:20] datnc: Ẹc... để e hú c B.

### Bailey - Management — 5 messages
  [16:46] binhnt: Duong Doan:  sao bên Bailey ko có cái tag nào thế em?
  [16:46] binhnt: image.png
  [16:46] binhnt: thế thì làm sao biết task nào thuộc scope nào ?
  [16:51] binhnt: mình phải rinh cái ds scope dở dang lên WS, và nhập số giờ hiện có lên, để tiếp theo log giờ nó đúng số ,để còn đòi tiền
  [17:15] duongdn: dạ

### Brad Ballantine - Auction warehouse — 8 messages
  [09:23] duongdn: có msg cus nha mn
  [09:25] phucvt: Ok anh, de em check
  [10:25] longvv: Bên này task là gì ta
  [10:25] longvv: Phuc Vo:
  [10:26] phucvt: Ok de t transfer. Ma check gium message ben Celine di
  [11:22] phucvt: Long Vo: SSH Key và Passphase để ssh vô server nha b
  [11:36] phucvt: image.png
  [11:36] phucvt: Long Vo: Cách deploy, xem hình này nha

### Celine - OhCleo — 280 messages
  [08:58] phuongpvt: Dạ a Phuc Vo Long Vo check message trong task giúp e với https://trello.com/c/rz8QPSjJ/203-update-startpage#comment-6a83 [thread: 2 replies]
    └ [09:03] phucvt: Phuong Pham:  Anh check thì nó đang hiển thị hơn 12 tracks, nhưng chắc đại ý là cho hiển thị max 6 t
    └ [09:04] phuongpvt: dạ
  [09:03] hungpn: có gì cần anh check gấp k Minh Trinh Lu Ho @long
  [09:03] hungpn: * có gì cần anh check gấp k Minh Trinh Lu Ho  Long Vo hì
  [09:04] minhtv: Gấp mớ dev done, để gửi cho khách , tưởng hôm qua xong mà do Phúc chưa quen dự án nên chưa xong được
  [09:14] phuongpvt: Dạ có mấy issue bả báo nha a Phuc Vo Long Vo: - ko select đc nhiều tags trong search, chỉ select đc trong category  http
  [09:18] phucvt: Ok em, de anh sap xep check nha. https://trello.com/c/JNP9OGzF/206-select-several-tags-in-the-app#comment-6a830b47b171cc
  [09:26] luhx: oke.
  [09:29] luhx: ủa prod bị gì mà chậm dữ vậy ta.
  [09:29] luhx: LOG  [API] GET /api/medias/home-medias/?format=json&_t=1787020136342 -> 200 (14359ms)
  [09:30] phuongpvt: https://trello.com/c/Bps34q2g/208-add-audios-with-deeplink-into-newsletter Dạ task này bên ready to test mà bả báo hình  [thread: 53 replies]
    └ [09:39] phucvt: image.png
    └ [09:40] phucvt: Long Vo Cái này k phải update trong Sendgrid như b nói hả? Thấy bả kêu phải update chỗ trong hình
    └ [10:57] phucvt: Đã clear với Long
    └ [10:59] phucvt: Phuong Pham: Cái này bả không nói rõ cần update ở đâu, nên mình đã update vào cái email Newsletter t
    └ [11:01] phucvt: > I really need to get the e-mail to all newsletter out as soon as possible. I thought I send you th
    └ [11:07] phucvt: Screenshot 2026-08-18 at 11.00.14.png
    └ [11:07] phucvt: Trước đó mình update cho nội dung email này
    └ [11:17] phuongpvt: dạ pop up này mở ở đâu vậy anh
    └ [11:36] phucvt: Modal "Keep in touch" mở khi user chưa đăng nhập, chưa submit email, chưa dismiss trong 7 ngày — và 
    └ [11:38] phucvt: Phuong Pham: Em xem 1 trong 2 điều kiện này nha
    └ [14:42] hungpn: Phuc Vo: anh mới thử cái  "Keep in touch" thì bao lâu có email gửi về á nhỉ
    └ [14:43] phucvt: Hung Pham: Em không nhớ chính xác, nhớ hôm qua em test thì khoảng 5-10p gì đó
    └ [14:43] hungpn: okie em
    └ [14:43] hungpn: để anh đợi coi sao
    └ [14:52] phucvt: Nhận được chưa anh?
    └ [15:05] hungpn: chưa nhé
    └ [15:22] phucvt: image.png
    └ [15:23] phucvt: Hung Pham:  Em có hỏi Long thì cái newsletter ở web, thì phải test email không trùng với email trước
    └ [15:24] hungpn: em search thử emma040296@gmail.com vs nusqc@icloud.com dùm anh thử có k
    └ [15:24] phucvt: image.png
    └ [15:25] phucvt: Có nha anh, nó báo là đã nằm trong list rồi, nên nó k gửi nữa nè
    └ [15:25] phucvt: Hung Pham:
    └ [15:25] hungpn: xóa dc k ta
    └ [15:25] phucvt: Được nha. Mà anh test email kèm theo alias đi, đỡ mắc công xóa
    └ [15:26] phucvt: nusqc+1808261508@icloud.com Hung Pham  Dạng vậy nè anh
    └ [15:27] hungpn: tạm xóa trước dùm anh thử
    └ [15:34] phucvt: À ko, cái này em nhầm. Hình như do anh nhập sai email nên nó ko gửi được
    └ [15:34] phucvt: emma0400296@gmail.com
    └ [15:34] phucvt: Dư số 0
    └ [15:36] phucvt: Anh cứ test với alias email trước nha. Em tìm xem có chỗ nào xóa email đã đăng ký trước đó ko
    └ [15:42] phucvt: Hung Pham: Em đã xóa 2 emails: - emma040296@gmail.com - nusqc@icloud.com Anh có thể test lại nha
    └ [15:44] hungpn: okie em
    └ [15:45] phucvt: Còn cái update trong Marketing Emails là ok rồi đúng không anh? Do có vẻ bả cần cái đó trước, nên đư
    └ [15:45] hungpn: anh gửi email staging mãi hgok thấy về ta
    └ [15:45] hungpn: đúng rồi á nè
    └ [15:48] phucvt: Anh test mail nào anh? Với sau khi em xóa hay trước khi em xóa 2 email trên vậy?>
    └ [15:48] hungpn: anh sài email có +thêm á, ví du emma040296+1
    └ [15:49] phucvt: Phuong Pham Em xem có thể nói bả mình đã update Marketing Emails luôn không nha
    └ [15:50] phuongpvt: dạ e có nói r nha, bả có hỏi vậy trc đó mình update ở đâu thì e cũng có trả lời rồi, đang đợi cf xem
    └ [15:51] phucvt: Phuong Pham:  Anh thấy em nói là "updating". Còn ý anh là mình update xong rồi á.
    └ [15:53] phuongpvt: dạ ok để e update
    └ [15:53] phucvt: image.png
    └ [15:54] phucvt: Hình như nhập sai email rồi anh Hùng ơi 🥲
    └ [15:54] phucvt: Sai chỗ 69 - 96 á anh
    └ [15:54] phucvt: Hung Pham:
    └ [15:56] hungpn: để anh thử lại
    └ [15:56] hungpn: 69 vs 96 sai hoài ta
    └ [16:11] phuongpvt: dạ a Phuc Vo ơi, chỉ add ở phần screenshot của bả thôi nha, remove phần cũ đi
    └ [16:12] phucvt: Chà. Em báo bả là đã updated theo screenshot của bả nha
    └ [16:13] phucvt: Còn remove phần cũ thì để a xem có log lại cái nội dung cũ không để làm nha
    └ [16:13] phucvt: Phuong Pham:
    └ [16:13] phuongpvt: > có log lại cái nội dung cũ không để làm nha  là sao á anh
    └ [16:14] phucvt: À do mình đã đổi nội dung trong Sendgrid rồi. Giờ k nhớ nội dung cũ trước đó là gì, nên anh cần kiểm
  [09:30] luhx: AE BE nào check server prod giúp với, treo luôn rồi.
  [09:34] phucvt: Ax, de em check
  [09:37] phucvt: Thấy ổn lại rồi á anh, chưa rõ nguyên nhân do đâu, để có gì e check thêm
  [09:40] luhx: vừa thấy dc cái giờ hẹo luôn rồi, API hay web đều treo.
  [09:42] hungpn: Phuc Vo: Long Vo subject của email này đã update chưa á nhỉ [thread: 8 replies]
    └ [09:47] phucvt: Để em check nha. Chưa rõ Long có update chưa
    └ [10:24] longvv: là sao á a? bth có subject mà nhỉ
    └ [10:25] hungpn: contetn của sub chưa đúng đó nè
    └ [10:27] longvv: a cho e xin cái màn hình nha
    └ [10:28] longvv: với đợi tí
    └ [10:28] longvv: e deploy cái r test tiếp
    └ [10:37] phucvt: Hung Pham: Long nói deploy xong rồi. Anh check lại xem anh
    └ [10:40] hungpn: để anh check lại
  [09:42] hungpn: image.png
  [09:42] hungpn: * Phuc Vo: Long Vo subject của email này đã update chưa á nhỉ https://trello.com/c/2bNqRji6/192-update-ui-according-to-t
  [10:02] hungpn: https://trello.com/c/wVEIggrD/189-replace-this-about-page-with-current -- cái này cũng chưa có update lại text nữa nè Lo [thread: 5 replies]
    └ [10:21] phucvt: Long Vo Confirm giúp là đã update theo yêu cầu mới nhất chưa nha b. Check trong code thì ko thấy
    └ [10:23] longvv: Chắc update lại cho bả đi Phúc
    └ [11:30] phucvt: Hung Pham: Về text, thì hiện tại trên production đúng với yêu cầu mới nhất của bả rồi á anh Hùng. ht
    └ [11:32] phucvt: Anh verify lại giúp em nha
    └ [11:34] hungpn: tested DONE nha
  [10:03] hungpn: vậy sao nó lại dc kéo sang done nhỉ?
  [10:07] hungpn: https://trello.com/c/ePyEhaEQ/170-activate-new-e-mail-flow https://trello.com/c/Vk0PkS1f/133-old-dynamic-templates-confl
  [10:25] hungpn: * content của sub chưa đúng đó nè
  [10:29] longvv: work rồi nha a, mới move sang ready to test
  [10:30] hungpn: https://trello.com/c/USxxvNzZ/204-content-preferences-permanent-exclusion-filters-voice-orientation -- cía bả đang comme
  [10:31] hungpn: do sáng anh check thấy vẫn dev-done nên mới hỏi em. Sau update status đúng dùm anh nhé 😉
  [10:31] luhx: đọc qua dường như là lỗi data, a check thử đi có gì nhờ Long debug thử.
  [10:32] hungpn: I can only see its filter by orientation, not by voice when going to the search and the filter function. -- nguyên cái n
  [10:33] luhx: à thì đúng rồi, cái bả gửi có nói gì về nó đâu nhỉ.
  [10:33] hungpn: đúng rồi nên fai confirm lại xem có update hay k đó
  [10:34] hungpn: có ai gửi anh cái video này vs: - I also have a video where it seems that it does not work properly. I’ll try to send th [thread: 18 replies]
    └ [10:35] phuongpvt: ScreenRecording_08-17-2026 15-41-03_1.MP4
    └ [10:36] hungpn: tks em
    └ [10:40] hungpn: bug này check chưa Lu Ho hì, cái này work ở web mà mobile hok chạy. hình như bug này bữa Long fix rồ
    └ [10:41] luhx: hả là sao? bị gì?.
    └ [10:42] hungpn: em xem video nè, chọn filter by search xong chon tái tab thì nó k apply cái search vào đó, web thì c
    └ [10:44] luhx: là bị sai chỗ nào nhỉ? ý là nhập search xong bấm chọn tags nó sai kết quả?.
    └ [10:44] luhx: chả hiểu gì.
    └ [10:45] hungpn: 🤣
    └ [10:47] luhx: a Hùng lên thông não giúp em với nào.
    └ [10:49] hungpn: nó sẽ như này, vào cái search mà chưa filter thì nhấn vào cái "stading sex" tab sẽ có 27 items, nhưn
    └ [10:50] luhx: ủa đâu có logic đó đâu ta, cái filter chỉ apply ở search thôi mà.
    └ [10:50] luhx: cái màn đó là category detail rồi.
    └ [10:50] hungpn: anh cũng đang nghĩ bả đang hiểu sai tính năng đó giống em
    └ [10:50] hungpn: nhưng giờ chắc fai confirm vs bả về hành vi bả mong muốn quá 🤣
    └ [10:51] hungpn: có khi nào bả cũng đang k hiểu rõ tinh năng
    └ [10:51] hungpn: có nên quay video về tính năng search cho bả hiểu hok Phuong Pham
    └ [10:54] luhx: Đã rep bả ở ticket nha, đang hỏi lại coi bả có muốn apply luôn cái filter ở search vào màn tag detai
    └ [10:55] phuongpvt: e nghĩ quay video thì bả cũng chỉ hiểu theo góc nhìn cua bả hiện tại thôi anh :))). Chắc mình phải g
  [10:34] luhx: Long confirm lại phát, nếu mần thì update cả web mobile vs api luôn á
  [10:35] longvv: Cái mockup của bả làm gì có cái voice đâu, với filter theo voice thì backend có sẵn param truyền vô r, update UI/UX th
  [10:35] phucvt: 
  [10:35] longvv: * Cái mockup của bả làm gì có cái voice đâu, với nếu muốn filter theo voice thì backend có sẵn param truyền vô r, update
  [10:42] phucvt: https://trello.com/c/wVEIggrD/189-replace-this-about-page-with-current Hung Pham  Task này em update và deploy lên produ [thread: 12 replies]
    └ [10:53] hungpn: chơi hẳn live ak
    └ [10:54] hungpn: check dùm anh thử hình bả muốn ở cái số 2 là hình nào vậy
    └ [10:54] hungpn: image.png
    └ [10:55] hungpn: image.png
    └ [11:03] phucvt: Hình số 2 là hình số 2 anh gửi đó
    └ [11:04] phucvt: Này nè
    └ [11:04] hungpn: là bả yêu cầu hình số 2 đúng k
    └ [11:04] phucvt: Đúng rồi anh, update hình thôi mà. Nên e check lẹ trên staging rồi deploy production luôn, đỡ mất th
    └ [11:04] phucvt: Đúng anh
    └ [11:06] hungpn: okie em
    └ [11:07] hungpn: move task đi nah Phuc Vo
    └ [11:08] phucvt: Ok thanks anh Hùng
  [10:49] hungpn: * nó sẽ như này, vào cái search mà chưa filter thì nhấn vào cái "stading sex" tab sẽ có 27 items, nhưng back về search c
  [10:50] luhx: * cái màn đó là tag detail rồi.
  [11:11] hungpn: Update on your audio submission --- tìm dùm anh cái email này trên Sendgid vs Phuc Vo [thread: 5 replies]
    └ [11:14] phucvt: image.png
    └ [11:14] phucvt: Nè anh, anh cần làm gì với nó hả?
    └ [11:15] hungpn: gửi anh cái link vs
    └ [11:15] phucvt: Hung Pham:  https://mc.sendgrid.com/dynamic-templates Moderation Rejected => Mở cái item đầu tiên ra
    └ [11:15] hungpn: tks em
  [11:17] hungpn: https://trello.com/c/2bNqRji6/192-update-ui-according-to-this-card -- tested DONE nha Phuc Vo Long Vo [thread: 1 reply]
    └ [11:20] phucvt: OK anh, em move sang cột ready to test rồi
  [11:36] hungpn: Trong ticket https://trello.com/c/wVEIggrD/189-replace-this-about-page-with-current - Now its live! You can use the mobi [thread: 10 replies]
    └ [11:46] phuongpvt: Hmm e ko nắm context cái này từ đầu, nhưng mà e đang nghĩ đây là message bả nhắn mình thôi
    └ [11:50] phucvt: Hung Pham:  Trên app có trang about này ko anh? Nếu có thì có vẻ ý bả suggest mình update trên mobil
    └ [11:51] hungpn: có em
    └ [11:51] hungpn: trên app có cái footer mà
    └ [11:52] hungpn: có thể lắm nè
    └ [11:52] phucvt: Em mới qua nên ko rõ. Vậy cái này chắc nhờ Phuong Pham verify nha. Xong hỏi bả xem muốn update cho m
    └ [11:52] phuongpvt: dạ
    └ [11:53] phucvt: Còn phạm vi task này là update trên web thôi anh Hung Pham
    └ [11:53] hungpn: okie em, web anh check xong rồi á
    └ [11:59] phuongpvt: dạ đã rep nhờ verify nha a
  [11:52] phucvt: * Em mới qua nên ko rõ. Vậy cái này chắc nhờ Phuong Pham verify nha. Xong hỏi bả xem muốn update cho mobile app luôn ko,
  [13:36] minhtv: Mấy cái liên quan tới email chạy ổn chưa a Hùng ơi? Bả đặc biệt muốn release tất cả liên quan tới email hôm nay
  [14:16] phucvt: Em mới có cái này, cũng liên quan đến vụ email
  [14:16] phucvt: https://trello.com/c/Bps34q2g/208-add-audios-with-deeplink-into-newsletter [thread: 1 reply]
    └ [14:21] phucvt: Hung Pham Task này anh check thêm trong thread này để nắm context nha. https://matrix.to/#/!ElFFiOYO
  [14:16] phucvt: Hung Pham: Anh check lại giúp em nha
  [14:18] luhx: https://trello.com/c/JNP9OGzF/206-select-several-tags-in-the-app#comment-6a830b47b171cc7a1f3de678 ủa bả comment như này 
  [14:19] phuongpvt: > https://trello.com/c/JNP9OGzF/206-select-several-tags-in-the-app#comment-6a830b47b171cc7a1f3de678 e nghĩ ý bả là khi m
  [14:19] phuongpvt: * > https://trello.com/c/JNP9OGzF/206-select-several-tags-in-the-app#comment-6a830b47b171cc7a1f3de678 e nghĩ ý bả là khi
  [14:21] luhx: a đang không rõ á, tại web nó cũng đang là vậy, gõ thì nó hiển thị tags để cho chọn, còn không thì nó chỉ hiển thị categ
  [14:21] luhx: giờ cái bả đang nói và cần là gì nhỉ.
  [14:22] phuongpvt: trước bả có nhắc tới categories, e thử thì khi bấm vào categories, bấm chọn several tags đc luôn ko cần search có vẻ bả 
  [14:22] phuongpvt: * trước bả có nhắc tới categories, e thử thì khi bấm vào categories, bấm chọn several tags đc luôn có vẻ bả cần làm tươn
  [14:23] luhx: main search nghĩa là cái nào nhỉ? màn explore tab có cái input và list categories hay cái màn bấm vào search input?.
  [14:24] phuongpvt: ima_46a4f5e.png
  [14:24] phuongpvt: chỗ này á anh, có sẵn explore tags, xong có vẻ bả nghĩ có thể chọn nhiều explore tags 1 lần
  [14:26] minhtv: ima_4998ada.png
  [14:26] minhtv: Production bị stuck khúc này ta
  [14:27] luhx: vậy giờ a làm là xoá cái explore tags này đi, hiển thị list tags luôn cho user chọn mà không cần phải nhập text search đ
  [14:27] luhx: lúc sáng nó ngáp ngáp có báo rồi á, giờ chắc nó ngáp ngáp lại.
  [14:28] phuongpvt: Dạ e ko thấy bả nói tới việc xóa phần này á, chắc là - Vẫn giữ explore tags này, cho phép chọn nhiều explore tags  - Khi
  [14:29] phuongpvt: với thêm bả cần hiện amount sau khi chọn tags nữa á
  [14:29] luhx: oke vậy em nc với bả giúp a task đó, clear rồi báo để a làm nha.
  [14:29] phuongpvt: dạ
  [14:42] phuongpvt: ima_5fddc0e.png
  [14:42] phuongpvt: Bả muốn hiện thêm amout chỗ này nữa
  [14:43] phuongpvt: * Bả muốn hiện thêm amount chỗ này nữa
  [14:43] luhx: hiển thị amount của số tags á hả?.
  [14:43] luhx: hay là total tracks?.
  [14:44] phuongpvt: dạ số tracks á
  [14:44] phuongpvt: như mấy chỗ khác, có hiện tổng số tracks sau khi apply các tag
  [14:45] luhx: à oke cái đó thì dễ.
  [14:58] phucvt: Hung Pham Task này em có update lại theo message mới nhất của Celine. Em đã deploy lên staging. Anh check giúp em nha ht [thread: 8 replies]
    └ [15:10] hungpn: có ảnh hưởng tới mobile hok em
    └ [15:12] hungpn: mobile có cần build lại gì hok Lu Ho
    └ [15:13] luhx: không cần build lại nha a, a check đi, data từ API trả về sao thì show nấy thôi á.
    └ [15:27] phucvt: Anh check lại trên mobile với trên web luôn nha.  Em update API nên là trên mobile và web sẽ update 
    └ [15:27] phucvt: Hung Pham:
    └ [16:00] hungpn: này okie nha
    └ [16:02] hungpn: Phuc Vo: Phuong Pham
    └ [16:03] phucvt: Thanks anh Hùng, em đã move sang cột Ready to test
  [15:42] phuongpvt: Dạ a Lu Ho bả hỏi có lí do gì mà phần explore tags này lại ko cho phép chọn nhiều tag, trong khi các phần khác lại được 
  [15:42] luhx: này mình không biết á em, code từ trước nó đã như vậy rồi á.
  [15:42] luhx: đúng không Hiep Nguyen nhỉ?.
  [15:43] hiepnt: hình như v a, e nhớ là k động tới cái đó, a check code thử xem mình động cái đó k a
  [15:44] phuongpvt: với thêm nữa là tại sao filter ko apply được khi chọn 1 tag trong explore tags, còn nếu gõ tags rồi chọn, thì apply được
  [15:45] luhx: cái explore là nhấn cái nó đi tới màn tags detail của tag vừa click á. [thread: 10 replies]
    └ [15:47] phuongpvt: dạ vậy các tracks hiển thị trong đó có đc apply filter ko anh
    └ [15:47] luhx: filter gì em nhỉ? em nhấn tags thì nó list các track của tag đó thôi á.
    └ [15:47] luhx: chỉ khi nhấn category mới có select thêm tags thôi.
    └ [15:47] phuongpvt: hmm nên ý bả hỏi vậy á, tại sao khi bấm tags trong explore lại ko có filter
    └ [15:48] luhx: ý là filter cái gì a?.
    └ [15:48] phuongpvt: ima_048b0e2.png
    └ [15:48] phuongpvt: dạ e đoán là bả nói cái này
    └ [15:50] luhx: nếu cái này thì nó hoạt động như sau: - em chọn filter xong, thì nó chỉ apply ở search, nghĩa là em 
    └ [15:50] phuongpvt: dạ để e nhắn bả
    └ [15:50] luhx: oke em.
  [15:45] hungpn: Lu Ho: anh xin cái link staging IOS hay android cũng dc
  [15:45] luhx: không phải là giữ ở màn search.
  [15:45] luhx: a cần staging à? mấy nay em không có build.
  [15:46] hungpn: anh cần stagiing
  [15:46] hungpn: check vụ update list new week đó nè
  [15:46] luhx: oke vậy chờ xí em build.
  [15:47] phuongpvt: * dạ vậy các tracks hiển thị trong đó có đc apply filter ko anh Lu Ho
  [15:48] luhx: * ý là filter cái gì á?.
  [15:51] luhx: iOS STAGING nha a Hung Pham  https://i.diawi.com/Gnjx6t
  [15:52] phuongpvt: https://trello.com/c/wVEIggrD/189-replace-this-about-page-with-current#comment-6a841c47fa77ec579a6de8e2  task này bả nói
  [15:52] phuongpvt: cái này chắc e nói lại là ko đồng bộ đc ha
  [15:55] luhx: chắc sài webview thôi.
  [16:00] phuongpvt: dạ tức là dùng webview thay vì chỉnh sửa trực tiếp trong about ở mobile app đúng k ạ
  [16:03] luhx: uhm thì kiểu là chỉ web làm thôi, xong mobile load cái page đó lên mobile, muốn update thì web update thôi. [thread: 1 reply]
    └ [16:05] phuongpvt: dạ
  [16:08] minhtv: khách có rep nhé
  [16:10] luhx: https://trello.com/c/USxxvNzZ/204-content-preferences-permanent-exclusion-filters-voice-orientation
  [16:10] luhx: cus confirm nha Long Vo có thêm voices ở phần filter nữa.
  [16:10] luhx: vậy update lại API giúp a hình như 2 API lận.
  [16:11] phucvt: Bên này em đang làm, nên để e xem nha anh Lữ
  [16:11] luhx: à quên :v để a gửi lại API.
  [16:13] luhx: API search /api/medias/bykey/A/?page=1&page_size=20&exclude_orientation=Lesbian&exclude_orientation=Straight API categor
  [16:13] luhx: 2 cái này cần thêm filter cho voices nhé Phúc.
  [16:13] phucvt: Ok thanks anh
  [16:14] phucvt: * À do mình đã đổi nội dung trong Sendgrid rồi. Giờ k nhớ nội dung cũ trước đó là gì để revert lại, nên anh cần kiểm tra
  [16:15] phuongpvt: image.png
  [16:15] phuongpvt: Dạ cái new track bả vẫn thấy max là 12 á [thread: 3 replies]
    └ [16:30] phucvt: Phuong Pham: Anh có deploy và test lại rồi nha em
    └ [16:30] phucvt: image.png
    └ [16:30] phuongpvt: dạ để e báo bả
  [16:18] phucvt: Ax, sorry em. Chưa deploy prod 🙏 để a deploy xong báo lại liền
  [16:19] phuongpvt: https://trello.com/c/wVEIggrD/189-replace-this-about-page-with-current --> dạ task này làm webview bên mobile, đã move v
  [16:19] luhx: page kia web có làm chưa nhỉ.
  [16:20] phucvt: Rồi á anh Lữ
  [16:20] phucvt: Nếu webview thì anh cứ gắn thôi anh. Vào đúng trang about là được
  [16:21] luhx: ủa mà cho a hỏi page about này ở mobile sẽ nằm ở đâu nhỉ?.
  [16:22] phucvt: Phuong Pham Em xem có thể báo bả check trên web trước không? Nếu bả cần update nội dung gì thì mình update luôn. Vì mobi
  [16:23] phuongpvt: dạ
  [16:26] hungpn: footer á
  [16:26] luhx: ủa chứ không phải 1 page khác à?.
  [16:26] luhx: thấy ghi about page mà?.
  [16:26] hungpn: nó chỉ update content của page cũ thôi mà
  [16:27] luhx: Screenshot 2026-08-18 at 16.27.39.png
  [16:27] luhx: ủa thấy là 1 page luôn mà.
  [16:28] minhtv: cái page này , có thay đổi 1 chút theo như comment của bả thì phải, double check xem
  [16:29] luhx: Screenshot 2026-08-18 at 16.29.47.png
  [16:29] luhx: à thấy rồi.
  [16:30] luhx: cho a cái link page đó ở web đi Phúc.
  [16:30] luhx: cả staging và prod.
  [16:31] phucvt: https://ohcleo.com/about https://staging.ohcleo.com/about
  [16:48] phuongpvt: ima_803b102.png
  [16:49] phuongpvt: Dạ bả nhờ bỏ Rank + number đi ở phần new this week á
  [16:49] phuongpvt: với bả hỏi có thật sự các track này là new this week ko, tức là mới được đăng trong 7 ngày gần đây
  [16:54] luhx: UI thì bên a làm, còn data thật sự không thì hỏi Phúc nha.
  [16:56] minhtv: bả có chat nữa nhé, nay xong hết mớ dev done và in-progress của tuần trước ko mọi người ơi
  [16:57] luhx: mobile không nha, cái content preferences cần BE update API mới làm tiếp dc.
  [16:57] luhx: mai mới done dc.
  [16:58] phucvt: Đúng nha em. Nó là các tracks mới nhất á
  [16:59] phucvt: Phuong Pham
  [17:01] phuongpvt: dạ vậy mình kéo lại cột inprogress đúng k ạ
  [17:02] luhx: oke để a kéo.
  [17:04] minhtv: Cái Deeplink lên production được chưa Phúc ? Nó có dính tới email quan trọng
  [17:09] phucvt: Rồi á anh. Có cái revert lại chỗ mình update sai thì em dev done rồi, đang verify lại
  [17:12] phucvt: Mà Phuong Pham em nhắn vậy bả có aware được là mình đã xong phần update Marketing Emails cho bả chưa ta. Anh sợ là ko [thread: 2 replies]
    └ [17:12] phuongpvt: dạ vậy e send thêm 1 tin
    └ [17:12] phucvt: Ok em
  [17:12] luhx: Report hôm nay nha Phúc: - Load about page on mobile. - Check issue tags and content preferences.
  [17:14] phucvt: Lu Ho: Status của 2 cái này là gì á anh?
  [17:14] luhx: WIP nha em.
  [17:14] phucvt: Em thấy mấy message trước mình report nhưng ko thấy status là gì. Ko biết bả hiểu ko, nên em report thì e sẽ explain sta

### Delivery - Resource Arrangement — 4 messages
  [09:56] namtv: NEW	VinhNT		19/08/2026	Đưa bé đi viện -> Update: Chỉ off 1 ngày 19/8 như plan ban đầu Case này giảm ngày off, hôm nay là
  [15:56] namtv: NEW	PhongTH		19/08/2026	Bận việc gia đình ==> HaVS bù bên Alex. Anh đã update note
  [16:02] namtv: NEW	ThinhLD	Sáng	19/08/2026	Bận việc gia đình ==> DaiDV bì bên Craig. Anh đã update note
  [16:02] namtv: * NEW	ThinhLD	Sáng	19/08/2026	Bận việc gia đình ==> DaiDV bù bên Craig. Anh đã update note

### Direct Manager — 1 message
  [10:00] binhnt: Hi mn, mn nhớ đảm bảo giờ charge của dự án mình là đúng nha Riêng các dự án internal thì khỏi update giờ charge

### Elena - Active Alerts — 60 messages
  [09:34] anhttl: Duy Vo: test tới đâu rùi anh
  [09:35] duyvna: đang regression test lại app coi upgrade hqua có bị ảnh hưởng gì ko chắc tầm đầu giờ chiều xong nha e
  [09:40] anhttl: oki anh, mà test lại hết bug fix rồi phải hông
  [09:41] duyvna: đang verify 5 con mới deploy chiều hqua nữa là xong rồi
  [09:46] kietnht: Anh Trinh:  code này của họ đã tồn tại nên cần đọc qua để hiểu rồi mới fix đc Total là 3h để research/investigate + 1h đ [thread: 3 replies]
    └ [09:49] duyvna: image.png
    └ [09:49] duyvna: cái này là có bao gồm fix lun unlink child chưa e
    └ [09:49] kietnht: có luôn a
  [11:06] anhttl: ưu tiên test lại mấy bug này đi anh
  [11:06] anhttl: * ưu tiên clear hết mấy bug/task jira trước nha anh Duy Vo lát chiều cỡ 2-3h gì đó xong ko
  [11:07] duyvna: chắc tầm đó xong rồi e
  [11:17] duyvna: image.png
  [11:17] duyvna: Tri Nguyen: có time qua check dùm a tooltip type ở đây nha
  [11:31] kietnht: Anh Trinh: process luôn hay cần bả approve?
  [11:32] anhttl: giờ ko có task thì investigate tiếp và làm luôn cũng đc anh
  [11:34] duyvna: https://redmine.nustechnology.com/issues/80454 check thêm con này nữa nha Tri Nguyen
  [11:38] kietnht: Anh Trinh: a hỏi cái, hiện tại các time trống thì gắn tag gì trên workstream á hay ko cần gắn, project này ko phải lúc n
  [11:39] anhttl: Anh Nguyen: Em tạo 1 placeholder tag là Support đc ko anh?
  [11:40] anhnvn: Tag đấy ý nghĩa là gì thế e? Ko phải task gì đã approve / charge dc phải ko?
  [11:40] kietnht: hôm qua finance có question a, ý là giải thích lại nó hơi nhập nhằng vì project này đâu có full task với full charge
  [11:42] kietnht: xong gắn vô 1 cái tag hiện tại thì time nó lố so với authorized
  [11:42] kietnht: cái management lại question lại phải giải thích
  [11:43] kietnht: a hơi confuse nha
  [11:45] anhnvn: Nếu thực sự nó dính đến các task trước đó thì a nghĩ cứ gắn đúng tag như vậy thôi, ví dụ AA4, CR nào đó. Khi đó giải thí
  [11:45] anhttl: Vậy time hoàn toàn trống thì sao nhỉ anh
  [11:46] anhnvn: Báo trả lại cho delivery thôi e
  [11:48] kietnht: vậy cuối cùng là?
  [11:49] kietnht: và ai là người phải giải thích
  [11:49] kietnht: * và ai là người phải giải thích?
  [11:51] anhnvn: Giải thích những việc này là DM của dự án trao đổi với Finance. Nếu Finance có hỏi, các bạn ko rõ thì cứ direct lại là n
  [13:56] anhttl: Cus approve rồi nha anh Kiet Nguyen.
  [16:01] kietnht: a Duy Vo test đồ xong hết chưa, với có ai đang dùng server ko, chuẩn bị deploy nha ae
  [16:01] duyvna: khoan chờ tí deploy rồi a check fixbug lại cái
  [16:01] kietnht: ok a
  [16:02] duyvna: tầm 5h15 rồi e muốn làm gì làm
  [16:02] kietnht: giờ đó ko làm thì còn giờ nào làm nữa a :v
  [16:15] anhttl: image.png
  [16:15] anhttl: Duy Vo: anh báo bug thiếu icon là bug gì á, giải thích em với
  [16:23] anhttl: à thôi được rồi nha
  [16:57] anhttl: Kiet Nguyen: ủa mà deploy xong thì phải test lại nữa mà hả
  [16:57] kietnht: uhm, phải test chứ
  [16:57] anhttl: rùi bao giờ em mới báo done cho bả được
  [16:57] anhttl: cái fix bug AA4 em tính báo done cho xong đi nè
  [16:58] kietnht: hmm giờ cái AA4 với cái upgrade nó dính chùm
  [16:58] kietnht: vậy giờ deploy luôn ko, test luôn lại hết
  [16:59] kietnht: chắc vậy đi cho tiết kiệm time
  [16:59] anhttl: oke
  [16:59] duyvna: deploy cái đó để test lại add child thôi đúng ko em
  [16:59] anhttl: cò réc
  [16:59] kietnht: đúng a
  [16:59] duyvna: ok a tin tưởng vào e nha Anh Trinh
  [16:59] kietnht: vụ gì á
  [17:00] duyvna: deploy đi em, cho e 5' đó
  [17:00] tiennd2: sao a ko bao giờ nhắn được câu này với em thế a Duy [thread: 1 reply]
    └ [17:01] duyvna: bởi vì e ko đáng tin đó
  [17:01] dongnv: Anh tin em 5 phút nữa fix xong bug production ông Kfir đề cập :))
  [17:02] anhnvn: Còn 3p thôi, còn đáng tin ko e?
  [17:16] kietnht: done a Duy Vo , sorry cái máy nó yếu build hơi lâu
  [17:26] duyvna: Done rồi nha e, báo cus giúp a nha
  [17:27] anhttl: oki

### Kevin Kung - Codeorange — 5 messages
  [10:28] lucnt: Anh Phong Tran  pick task này nha anh: https://app.clickup.com/t/9017689349/86e2fc2tf Anh không cần run tracker mà sẽ lo
  [13:30] lucnt: Anh Nam Tran  mình có cần luôn ưu tiên run tracker khi có thể không anh. Hay chỉ cần default một người run khi người đó 
  [13:30] namtv: 1 người thôi, ai làm nhiều nhất thì chạy
  [13:32] lucnt: Vậy chỉ cần anh run thôi anh Tri Nguyen
  [13:33] trinm: ok em

### Kunal - Fountain — 29 messages
  [09:47] datnt: anh chị ơi card này Kunal có message nha
  [09:47] datnt: https://trello.com/c/cirjRR98/1149-fountain-update-multiple-order-spreadsheet
  [11:36] vitht: Card này lên BETA rồi nha mn ơi Hung Pham  Phat Le  Trinh Mai  https://trello.com/c/v2GzUjW2/3025-fountain-business-prod [thread: 1 reply]
    └ [15:16] hungpn: anh check xong rồi có gì fix bug nha Vi Tran
  [13:36] datnt: Hung Pham anh ơi cái dụ mà checkout sau 1h30pm á, em mới đưa lên BETA fix cái vụ Review Order nó đá qua trang checkout r [thread: 9 replies]
    └ [14:17] hungpn: để anh check nè
    └ [17:01] hungpn: image.png
    └ [17:01] hungpn: staging ne Dat
    └ [17:02] datnt: à hổm em mới fix lên Live quên đưa vô staging á anh 🥲
    └ [17:02] datnt: để em update lại
    └ [17:05] datnt: Hung Pham anh check laji nha
    └ [17:05] datnt: em update len Staing laji roi a
    └ [17:08] hungpn: đểanh check lại
    └ [17:33] hungpn: okie rồi nha em Dat Nguyen
  [14:50] thinht: Blog Infinity có lỗi hay có j cần udpate k Phat Le [thread: 1 reply]
    └ [14:54] hungpn: Phát nay off rồi thì fai đó m
  [14:50] thinht: Trinh Mai: cho a xin ticket nha e.
  [14:56] thinht: ticket 3025 a thấy có issue hot trên Redmine , a bợ dc k Vi Tran
  [14:57] vitht: chắc đc á a. Tại nó về UI không à
  [14:57] vitht: * chắc đc á a. Tại nó về UI không à. K có logic á
  [14:57] thinht: 
  [16:19] datnt: Vu Tat anh review giúp em PR này với nha anh #[3013](https://trello.com/c/h3hpRC4s/3013-nomethoderror-in-ordersdownloadr [thread: 3 replies]
    └ [16:21] vutq: skip_before_action :authenticate_user! gắn filter cho download_receipt nha em, chứ không phải check 
    └ [16:28] datnt: Vu Tat em updated lại roi á anh
    └ [16:32] vutq: done nha
  [16:57] thinht: File download đã down được bản mới nhất rồi nha Vu Tat . Thanks e.
  [17:01] thinht: Hung Pham: UI card 3025 trên redmine lên staging r á nhan.
  [17:01] hungpn: * staging ne Dat Nguyen

### NUS - Bailey - Paturevision 2026 — 28 messages
  [08:57] tuannt: cái prestashop database thì chắc là riêng r nhỉ
  [08:57] tuannt: cái site nó đã nặng rồi
  [08:58] tuannt: console thì có sẵn multi-tenant chắc có thể áp dụng được vào case này
  [09:02] datnc: Cái tenant này thì cần phải review nha a, nó là feature old lắm rồi, với ko ai rõ nó đang ntn đó. Còn theo ý bác thì có 
  [09:03] tuannt: a k hiểu ý e nhỉ ? console standalone lại muốn unified repo
  [09:03] tuannt: nó sai sai ngay từ đầu r
  [09:05] datnc: Ý là 1 repo (mình dev trên này) nhưng khi deploy ra 2 instances khác nhau thui a? Nôm na thế. Chứ ko dùng lại cái Consol
  [09:08] tuannt: theo a hiểu ý e là 1 tính năng khi dev thì có thể sử dụng cho cả 2 sites ?
  [09:09] tuannt: ý e là vậy ?
  [09:24] datnc: Đùng gòi a ơi, e đoán thì ổng có thể sẽ muốn theme riêng nhưng cơ bản là feature giống nhau.
  [09:24] tuannt: còn database ổng muốn riêng ?
  [09:26] datnc: Chắc chắn rồi a, này là mở 1 storefront khác (Cho 1 công ty khác luôn mà). Chủ yếu là cân nhắc các options roll out ntn 
  [09:49] trinhmtt: Dat Nguyen: Tuan Nguyen 2h Nova nha 2 anh oi
  [09:59] havs: DB riêng là đang nói Console luôn hay sao? hay đang nói bên Prestashop á Dat Nguyen ? Và với Console web thì expect là d
  [10:02] havs: btw, task upgrade rails là đang lên version mấy á a Tuan Nguyen
  [10:02] tuannt: dang là 6
  [10:02] havs: cụ thể là 6. mấy a
  [10:03] datnc: Khác domain, khác DB luôn nha Hà.
  [10:07] tuannt: Ha Vo 6.1.7.10
  [10:12] havs: ừm nếu bên presta là 1 storefront riêng thì chỉ còn cách dùng domain & DB khác thôi, mình vẫn dùng chung codebase được. 
  [10:14] tuannt: ừm ok
  [15:22] datnc: > is it possible to know how much one website resources is using up on console and prestashop ? For example Paturevision [thread: 5 replies]
    └ [16:45] datnc: Cái này sao a Tuan Nguyen ơi?
    └ [16:47] tuannt: có em mà cần cài thêm
    └ [16:47] tuannt: mấy cái tool quản lý dc
    └ [16:47] tuannt: mà nếu dùng docker thì quản lý dc mà
    └ [16:52] havs: > For example Paturevision used 80 % of servers data and Strainrite 20% cái này là đang nói về stora
  [15:43] trinhmtt: https://docs.google.com/spreadsheets/d/1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg/edit?gid=214917911#gid=214917911 Tua

### NUS Technology — 3 messages
  [09:27] namtv: @room Có chút sự cố nên mình sẽ pause Workstream chút nha mọi người, vài phút thôi
  [09:41] namtv: Đã lên lại bình thường nha mọi người
  [16:35] namtv: Bữa giờ vài bạn thắc mắc nên anh gửi ở đây nha: trên trang lấy 2FA code https://apps.nustechnology.com/otp/authenticator

### PHP Projects — 7 messages
  [08:57] chientx: tình hình sao rồi mn? Hôm qua nay vẫn tiếp tục issue mỗi sáng hả ☹️
  [09:00] namtv: Theo mấy message thì ko phải vụ kia nữa, vấn đề khác, liên quan khúc đăng ký, setup gì đó
  [09:39] chientx: mà sao tự nhiên giờ issue khác cứ xuất hiện vậy ta, bữa ổng nói mấy cái này chạy ổn mấy năm rồi, gần đây mới xuất hiện n
  [09:50] namtv: Dương xong chắc tổng hợp lại xem, ngoài cái vụ face kia thì gần đây có những issue gì và lý do nha. Đặc biệt là issue lặ
  [11:31] duongdn: 
  [11:33] namtv: Khó đọc quá, bỏ ra ngoài code block đi
  [11:47] duongdn: 0) Device ko connect được với server:  này chỉ check log và xác nhận ko có event lên, đã check ko có WAF trong AWS Còn C

### Potential - Oliver - Plexar Shopify Move  — 3 messages
  [08:51] samht: giờ e est nha a
  [08:52] samht: chắc cần 2 giờ trước đã
  [08:52] anhnvn: Ok e
