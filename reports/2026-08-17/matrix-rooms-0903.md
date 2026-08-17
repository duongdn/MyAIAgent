# Matrix — since 2026-08-14 14:03 +07:00

### !OIrgPraJWrcDTnRVLQ:nustechnology.com — 3 messages
  [15:54] duongdn: Hi em, remind collect nha\
  [15:54] duongdn: BTW, e log thiếu giở 30m
  [22:47] lenh: ủa, 30m của bên Rory không tính hả anh

### !oofREYAXHsvPWEOJev:nustechnology.com — 6 messages
  [15:55] duongdn: Report week 10/08 James Diamond Web: 39h30m/39h30m PhucVT: 0h/0h (vẫn đang ở Crystal lang tuần này, chờ review) LeNH: 39
  [15:57] duongdn: * Report week 10/08 James Diamond Web: 39h30m/39h30m PhucVT: 0h/0h (vẫn đang ở Crystal lang tuần này, chờ review) LeNH: 
  [17:03] thuyltt: khi nào có info bên Lễ thì báo t nha Dương ⚠️
  [17:04] thuyltt: coi workstream  t thấy ban có làm 30m ben Rory
  [17:04] thuyltt: Delivery có báo Dương info này ko?
  [20:26] duongdn: Ko nha

### Arthur - Meta-Stamp — 2 messages
  [09:00] phucvt: Hi anh Tien Nguyen, về cái vụ Enterprise Billing Block mình có gửi ổng. Anh có estimate cho ổng luôn chưa anh? Do ổng cầ
  [09:03] tiennd: chưa em, anh mới đưa file thiết kế vs plan thôi

### Automated Test — 2 messages
  [14:05] datnc: Report tuần này nha a Năm! General Plan thì vẫn sẽ theo meeting notes ạ (Drop cái vụ dùng Google Suite để manage artifac
  [14:10] namtv: Thanks em

### Bailey - BA/QC — 4 messages
  [08:36] datnc: Bác hỏi time meeting nha Trinh Mai ! https://globalgrazingservices.slack.com/archives/D01C1253PFB/p1786869187565359
  [08:57] datnc: E nghe bên c B bảo tuần này mình chuyển sang Workstream? Gòi cần migrate setup gì đó phải không a Dương? ⚠️
  [08:59] duongdn: sorry a quên nhắc, để a báo mn
  [08:59] duongdn: migrate setup là sao em

### Brad Ballantine - Auction warehouse — 7 messages
  [08:37] longvv: Cho e xin info setup nha, nếu có workd
  [08:38] longvv: * Cho e xin info setup nha, và add e vào workstream
  [08:38] phucvt: Long Vo: Check trong workstream nha
  [08:38] longvv: image.png
  [08:38] longvv: k thấy á fen
  [08:39] longvv: Mà nay t làm bên Kevin Kung full nha, bên này chắc ko gấp đâu nhỉ
  [08:40] duongdn: ok e làm Kevin đi, a sẽ báo off hôm nay

### Celine - OhCleo — 161 messages
  [14:21] minhtv: ko có task nào đang làm hả ta ?
  [14:22] longvv: e check thì BE hết task r nhé
  [14:22] minhtv: https://trello.com/c/USxxvNzZ/204-content-preferences-permanent-exclusion-filters-voice-orientation Task này nói con số 
  [14:22] minhtv: https://trello.com/c/JNP9OGzF/206-select-several-tags-in-the-app tiếp cái này thì sao ? Hết task báo a nhé , view mình l
  [14:23] luhx: Mobile đang làm 3h + tầm 30p 1h để fixbug vs build. [thread: 2 replies]
    └ [14:24] minhtv: cho a con số của em luôn Long
    └ [14:25] longvv: Bên BE đã làm 11h55m nha  a
  [14:23] luhx: * Mobile đã làm 3h + tầm 30p 1h để fixbug vs build.
  [14:23] longvv: cái này của mobile nha a
  [14:24] minhtv: múc đi Lữ
  [14:24] luhx: oke để coi thử.
  [14:24] longvv: đợi tí e đang tính
  [14:25] minhtv: https://trello.com/c/Vk0PkS1f/133-old-dynamic-templates-conflicting-with-new-sendgrid Long Vo  cái này cần làm gì để don
  [14:26] longvv: cái này e làm rồi, deactivated mấy cái template bà ấy nói r á
  [14:28] minhtv: thế tại sao bả kéo lại Todo, bả ko hài lòng, làm sao cho hài lòng bả phát
  [14:33] luhx: Long Vo: hiện tại mobile đang sử dụng API này để search https://api.staging.ohcleo.com/api/medias/bykey/Rop/?page=1&page
  [14:33] longvv: con này đi đôi với cái Activate new e-mail flow, nên là con active new email flow mà chưa xong thì bả sẽ coi như task đó
  [14:34] luhx: ở web a thấy hình như nó đang chỉ show ra tag thôi chứ đâu phải search theo text bất kì đâu ha.
  [14:34] longvv: để e check xem api này có support lọc theo tags ko
  [14:35] luhx: Screen Recording 2026-08-14 at 14.35.15.mov
  [14:35] luhx: a chưa hiểu lắm, vì ở đây nó bấm search thì ra tag, cho phép select.
  [14:36] luhx: vd chọn tag xong muốn search tên 1 track thì sao đc không?.
  [14:37] luhx: nó còn bị là đôi khi a chọn tag xong, a bấm search 1 text gì đó, thì nó mất tiêu cái tag vừa chọn, ở web nha,.
  [14:37] luhx: Screenshot 2026-08-14 at 14.37.46.png
  [14:37] luhx: ở bug nè :v
  [14:40] longvv: hiện tại hình như dev cũ nó cho search 1 trong 2 thôi hay sao, chọn tag thì chỉ lọc theo tag
  [14:40] longvv: còn ko thì gõ keyword không, enter rồi nó sẽ search theo tracks
  [14:41] luhx: vậy là đang chỉ filter theo mớ tags, hoặc là search theo keywork chứ đâu mần dc là vừa chọn tag vừa theo keywork đâu hả?
  [14:41] luhx: * vậy là đang chỉ filter theo mớ tags, hoặc là search theo keyword chứ đâu mần dc là vừa chọn tag vừa theo keyword đâu h
  [14:41] longvv: đúng r á, hiện tại là z
  [14:41] longvv: ko biết là bug hay tính năng
  [14:42] luhx: giờ sao Minh Trinh ? làm như vậy cho mobile hay sao, hiện tại mobile chỉ search theo keyword thôi, không search tag, tag
  [14:43] luhx: Screen Recording 2026-08-14 at 14.43.09.mov
  [14:43] longvv: giờ search multiple tags như trên web thì bên mobile gọi kiểu này curl --url 'https://api.v2.ohcleo.com/api/medias/bytag
  [14:44] longvv: * giờ search multiple tags như trên web thì bên mobile gọi kiểu này ``` curl --url 'https://api.v2.ohcleo.com/api/medias
  [14:44] luhx: này là search theo nhiều tag rồi đâu có keyword đâu.
  [14:45] longvv: hiện tại là z á, chứ trên web cũng chỉ có 1 là theo tags, 2 là keyword Làm cả 2 cùng lúc ko dc :))
  [14:46] luhx: Minh Trinh:
  [14:46] longvv: chắc raise cho bả thôi
  [14:46] minhtv: để coi thử
  [14:47] hungpn: mình đang sót bên virew của creator khi user ẩn hết female vs male thì vào coi list vaanxx thấy mấy cái track nè [thread: 53 replies]
    └ [15:12] longvv: Done nha a ơi
    └ [15:12] longvv: mấy issue lúc nảy e làm r nha
    └ [15:13] hungpn: okie để xíu anh check
    └ [15:14] hungpn: image.png
    └ [15:14] hungpn: Long Vo: Lu Ho biết nó work sao chưa
    └ [15:14] luhx: ủa bả có nói gì về cái này không nhỉ Long, quên mất.
    └ [15:14] longvv: image.png
    └ [15:15] longvv: bấm vô thì skip đi cái filter
    └ [15:15] longvv: BE có làm cái param r á
    └ [15:15] longvv: apply_preferences=false
    └ [15:15] longvv: truyền này vô là có dc cái nút đó
    └ [15:15] longvv: :))
    └ [15:16] luhx: cho a link staging web test thử cái, nhìn chả biết nó là gì ở mobile.
    └ [15:16] longvv: https://staging.ohcleo.com/categories/britpop
    └ [15:17] hungpn: https://staging.ohcleo.com/categories/burst or link này
    └ [15:17] longvv: à, cái này option bật tắt cái nút đó à
    └ [15:17] longvv: chắc e update thêm nha
    └ [15:17] longvv: image.png
    └ [15:17] longvv: cái nút này
    └ [15:18] longvv: BE sẽ trả về true/false True thì hiển thị cái nút này
    └ [15:18] longvv: image.png
    └ [15:18] longvv: false thì ẩn nó đi
    └ [15:18] luhx: chưa hiểu.
    └ [15:19] luhx: a thấy không đúng lắm, nếu nó nằm ở page Long vừa gửi thì cần gì phải set ở setting, nó chỉ là cái r
    └ [15:20] longvv: image.png
    └ [15:20] longvv: e thấy nó là dạng on/off cái nút đó á
    └ [15:21] longvv: bấm allow thì sẽ hiển thị cái nút reset filter
    └ [15:21] longvv: không thì ẩn nó đi
    └ [15:21] luhx: thế a mới thấy nó là lạ, nếu chỉ là show button reset filter thì cần gì phải làm ở setting đâu, phí 
    └ [15:22] hungpn: vậy tính ra web thiếu cái tính năng đó luôn á chứ
    └ [15:23] longvv: ủa có mà a
    └ [15:23] longvv: image.png
    └ [15:23] longvv: nó là cái nút này nè
    └ [15:24] luhx: Long confirm lại với bả thử, coi phải như web đang làm không, tại a thấy nếu chỉ là reset filter thì
    └ [15:27] hungpn: trong setting em ơi
    └ [15:27] longvv: z thì như mobile á
    └ [15:27] longvv: ko có
    └ [15:28] hungpn: khoan nha, cái đó có khi k chỉ mỗi hiển cái Hide orientations mà hiển hết thì sao nhỉ?
    └ [15:30] hungpn: anh đọc thấy nó là dạng như có thể show 1 cái nút mà user nhấn vào sẽ thấy dc all ấy, còn k nhấn thì
    └ [15:33] longvv: ko phải á, cái nút đó là option on/off cái nút "show anyway" bth thôi
    └ [15:34] longvv: tắt thì ẩn cái nút đó đi
    └ [15:34] longvv: mà làm z chi tr
    └ [15:34] longvv: thấy thừa
    └ [15:34] luhx: thế a mới kêu là hỏi bả lại á, vì a thấy nếu làm như em nói nó khá là phí tiền.
    └ [15:34] luhx: tốn thời gian.
    └ [15:35] longvv: e hỏi r á
    └ [15:35] longvv: đợi coi bả cần ko
    └ [15:35] longvv: :))
    └ [16:07] longvv: no its just complicating it. Lets do it as simple as possible for the purpose - to filter relevant c
    └ [16:07] longvv: ko cần lun nhé
    └ [16:08] luhx: nghĩa là ở chỗ filter add thêm button reset filter.
    └ [16:08] luhx: khỏi cần ở settings?.
    └ [16:08] longvv: uh a
  [14:47] hungpn: Long Vo: Lu Ho check dùm anh thử
  [14:48] luhx: lỗi data thì liên hệ Long nha a.
  [14:48] longvv: là sao á
  [14:48] longvv: e chưa hiểu
  [14:48] hungpn: chưa hiểu sang anh
  [14:48] minhtv: làm như web á Lữ,
  [14:49] luhx: là nếu chọn tag thì filter theo tags, còn không chọn thì theo keyword?.
  [14:49] minhtv: uhm, thấy trên web như vậy thì làm vậy, nhưng làm multiple tags
  [15:31] hungpn: * anh đọc thấy nó là dạng như có thể show 1 cái nút<dựa theo setting của user là on/off> mà user nhấn vào sẽ thấy dc all
  [15:44] luhx: có bản build STAGING mới cho ticket này và bug lúc sáng của content preferences nha a Hung Pham  Android: https://drive.
  [16:19] longvv: image.png
  [16:20] longvv: Minh Trinh: bà có hỏi á
  [16:22] minhtv: a rep cái đó rùi, bả có rep mấy cái khác nhé
  [16:33] luhx: Bản cuối cho hôm nay nhé a Hung Pham , hiển thị button show anyway như web. android: https://drive.google.com/file/d/1I2
  [16:34] minhtv: cái nào okay thì deploy lên production rồi kéo task nhé mọi người ơi
  [16:36] hungpn: https://trello.com/c/rz8QPSjJ/203-update-startpage -- cía này xong bug redmine chưa Long Vo
  [16:51] longvv: đợi e deploy lên nhé, e mới fix
  [16:54] longvv: done nha a
  [16:58] hungpn: okie
  [16:58] hungpn: task này tested DONE nha Long Vo
  [17:04] hungpn: Lu Ho: anh có con bug ví dụ cái list anh sau khi ẩn Hide orientations thì có 13 items, nhưng anh nhấn Show anywway thì v
  [17:04] hungpn: em thử searhc cái burst category đi
  [17:05] luhx: làm như nào a, search burst category hay chọn tag?.
  [17:05] luhx: video demo đi cho dễ hiểu.
  [17:06] luhx: à hiểu rồi.
  [17:06] hungpn: em vào trang All Category đi, xong rồi chọn cái  "burst"
  [17:06] luhx: Long Vo:   LOG  [API] GET https://api.staging.ohcleo.com/api/categories/42476322-e6dc-4dfd-a729-943b5dbcc0c0/media/?page
  [17:06] luhx: data trả về 13 item.
  [17:06] hungpn: web đúng mà mobile lại sai
  [17:07] luhx: check giúp a thử Long.
  [17:16] longvv: E update lại r nha, đợi deploy
  [17:18] hungpn: vậy app có cần fai build lại hok
  [17:18] longvv: ko nhe
  [17:19] longvv: xong nha a Hung Pham  oi
  [17:19] hungpn: okie roiof nè
  [17:22] hungpn: có cái case này kỳ nữa nè: vào 1 category -> chọn filter -> bỏ hết mấy cái đã hiden -> Save -> back về Home -> vào lại c
  [17:22] hungpn: Lu Ho:
  [17:22] hungpn: * có cái case này kỳ nữa nè: Account setting đang là 1 hiden, vào 1 category -> chọn filter -> bỏ hết mấy cái đã hiden -
  [17:23] hungpn: 1000013411.jpg
  [17:24] luhx: Qua tuần fix nha a
  [17:25] hungpn: okie em, noted lại nè
  [17:28] hungpn: * task này tested DONE nha Long Vo Minh Trinh
  [23:15] hungpn: Mai anh có việc đột xuất nên off cả ngày nha m.n. có gì cần cứ báo có gì anh check sau nha
  [08:45] phucvt: Long Vo Bên này mình cần start với cái gì trước vậy Long. Nay plan t làm full bên này
  [08:46] longvv: https://trello.com/b/Fv7eDVgT/app-20
  [08:46] longvv: Qua check 2 task to do
  [08:46] minhtv: mấy cái dev done là done thật chưa á ?
  [08:46] longvv: Mà cái task đầu bả k mô tả gì
  [08:47] minhtv: cái task đó bả đang hỏi mình nên làm thế nào
  [08:48] longvv: Mấy task dev done có gì e support Phúc deploy lên prod nha
  [08:49] minhtv: uhm, em hỗ trợ Phúc làm quen + làm sao done được cái task deeplink trước đê
  [08:49] luhx: ở mobile còn con bug của task content preferences, đang build mà nay a Hùng off. mai mới verify dc.
  [08:49] luhx: mà bug nhỏ không quan trọng lắm.
  [08:50] longvv: bth là bốc mấy task bên to do r làm thui à, đầu tiên là access vào DO trước nha https://cloud.digitalocean.com/login
  [08:50] longvv: log bằng google tony
  [08:50] longvv: tạm mang máy qua đây làm đi fen Phuc Vo
  [08:53] minhtv: Tự verify hôm nay luôn đi Lữ. ko chờ a Hùng được rồi , deadline bả dí hôm nay rồi, mình ko có lý do gì ngâm được tới mai
  [08:53] luhx: vậy thì live luôn đi, bug nhỏ xí hà, test rồi á.
  [08:53] luhx: cơ mà lên live thì cũng phải chờ a Hùng test bản live chứ.
  [08:53] longvv: Minh Trinh: share cho Phúc giúp e nick twilio nhé a
  [08:54] longvv: * Minh Trinh: share cho Phúc giúp e nick twilio tony nhé a
  [08:54] minhtv: okay
  [08:55] minhtv: Shared rồi á
  [08:55] longvv: ok a
  [08:57] luhx: giờ có build live luôn không Minh Trinh ? hay chờ BE lên rồi build sau?.
  [08:58] longvv: BE dang deploy dan dan các task nhé
  [08:58] minhtv: Long vs Phúc phối hợp + test 1 vòng mấy cái dev done giúp a nhé.

### Charles - Family — 15 messages
  [17:10] minhtv: Cái vụ hôm bữa mình kháng cáo sao rồi Lữ ?
  [17:11] luhx: Screenshot 2026-08-14 at 17.11.21.png
  [17:11] luhx: không thấy gì.
  [17:12] luhx: ủa hình như submit nhầm cái, phải cái bên dưới chứ.
  [17:13] luhx: cơ mà thấy nó ghi 5-7 ngày thì phải.
  [17:13] minhtv: kháng cáo nhầm à
  [17:13] minhtv: nó chửi chết 🤣
  [17:13] luhx: uhm vừa gửi lại, nó phải là cái issue login.
  [17:13] luhx: :v
  [17:13] minhtv: này request xếp của nó coi, xếp bên đó coi xong vẫn thấy thế
  [17:14] luhx: hả là sao?.
  [17:14] minhtv: kháng cáo nhầm nó chửi á, để chờ coi sao
  [17:14] minhtv: kiểu bị công an bắt, xong mình kêu cấp trên xử lý, mà vẫn lỗi y xì
  [17:15] luhx: đã submit lại kệ đi chờ nó phản hồi.
  [17:15] luhx: :v

### Delivery - Resource Arrangement — 4 messages
  [16:30] namtv: NEW	ThuongNTN		17/08/2026	Giải quyết một số việc cá nhân ==> Hà note plan sau nha
  [17:42] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [09:03] namtv: NEW	TuanNTG		17/08/2026	Bị cảm ==> Bên Elena ko bù. Anh đã update note
  [09:03] namtv: NEW	PhongTB		17/08/2026	Bận việc cá nhân ở quê ==> Tính vào time idle / project internal. Ko cần update note

### Delivery Department — 2 messages
  [19:56] namtv: **Plan của Web dev tuần 17/8** - LongVV một số giờ Maddy, còn lại làm Brad thay PhucVT, ko làm Celine nữa - PhucVT một s
  [19:56] namtv: --- **Plan của Mobile dev tuần 17/8** Không có gì thay đổi

### Elena - Active Alerts — 58 messages
  [14:35] kietnht: mới apply xong xuôi trên local,  Anh Trinh  a hỏi cái, mấy cái bà lena testing hiện sao rồi, vì nếu giờ làm trên server 
  [14:37] kietnht: * mới apply xong xuôi trên local cho cái AA4, Anh Trinh  a hỏi cái, mấy cái bà lena testing hiện sao rồi, vì nếu giờ làm
  [14:39] anhttl: bả đang ko test gì á
  [14:40] trinm: úi sắp tắt server hả mn ?
  [14:40] kietnht: e đang dùng hả
  [14:40] kietnht: uhm, a tính upgrade java version
  [14:40] trinm: đang fix mấy cái bug nè anh
  [14:41] kietnht: hmmm, nhiều ko, với xong thì còn gì nữa ko á
  [14:41] trinm: vậy giờ sao ta Anh Trinh anh qua bên khác làm nha sang tuần fix sau
  [14:42] kietnht: khoan nha, cái upgrade này thì a nghĩ cũng ko gấp
  [14:42] trinm: chắc hết chiều nay luôn ấy anh
  [14:42] kietnht: fix bugs ưu tiên hơn ko Anh Trinh ?
  [14:43] anhttl: cóa, fix bug trước ạ
  [14:43] anhttl: mà task của ảnh làm thì thuần UI thui mè, có cách nào làm song song đc ko :v
  [14:44] trinm: UI thì cũng phải có server á
  [14:44] trinm: chớ nó không load data sao mà làm
  [14:45] trinm: hay anh Kiet Nguyen máy local anh có data không export API ra em lấy cái API bên anh làm đỡ còn anh upgrade serever
  [14:45] anhttl: Vy Tran: Welcome chị Vy 🌼🌼
  [14:48] vytth: hé lu mn ✌🏻 chúc mn cuối tuần bình an
  [14:49] tuanntg: e vô đây chỉ để chúc mọi người thui hở?
  [14:51] duyvna: Chào mừng e đến máng lợn Active Alerts 🎉
  [14:52] vytth: chắc vô chúc trước thôi a, giờ chưa hiểu dự án nên chưa làm gì đc thêm :v để e tìm hiểu đã
  [14:54] kietnht: tính ra có hẳn 4 BA trong dự án này lận hả :v
  [14:55] dongnv: Chào Vy nhaaa. Phương thì thấy im quá, không chào :D
  [14:55] tuanntg: là sao, bé mới vô này BA hả a
  [14:56] vytth: Ba nha sếp
  [15:02] kietnht: Anh Trinh: vậy chắc để server cho Trí làm task cho xong đi.
  [15:03] kietnht: cơ bản cái upgrade cũng ko còn issues gì, sáng t2 họ ngủ mình làm cũng đc, với lại chỗ cái issues IP, được thì resolve l
  [15:04] kietnht: upgrade xong nhờ QC test sơ qua phát nữa
  [15:24] anhttl: Phương qua dự án khác rùi nên thui em remove để tránh spam bạn nhe 🥹
  [15:43] kietnht: Dong Nguyen: type giúp a command này vào máy bên e thử: ``` ping -c 3 212.116.164.182 ```
  [15:43] dongnv: --- 212.116.164.182 ping statistics --- 3 packets transmitted, 0 received, 100% packet loss, time 2049ms
  [15:43] dongnv: Ping được á anh
  [15:44] dongnv: 10.0.0.106 thì không ping được nếu không có VPN nha
  [15:45] tuanntg: 100% lost mà ping được gì ?
  [15:45] tuanntg: này fail
  [15:46] dongnv: Chà, em thấy phản hồi trong 2s em tưởng ngon ăn chứ :))
  [15:53] kietnht: package send đi nhưng ko có gì back lại :v
  [15:53] kietnht: * packets send đi nhưng ko có gì back lại :v
  [15:54] kietnht: quái lạ, sao trong cái note tụi e ghi là change cái IP 212 ta
  [15:54] kietnht: ko lẽ bên Tiến dùng đc hả :v
  [15:55] dongnv: Hmm, dùng IP gốc thì nó không chịu fallback nhanh, còn dùng IP này nó fail nhưng 2s là xong r.
  [15:55] dongnv: Hồi xưa em được hướng dẫn đổi qua cái em làm chứ cũng ko có phân tích kỹ.
  [16:02] kietnht: nó fallback sang cai repo.maven mà nó down cả trăm cái vậy thì cũng tầm 1-2 tiếng
  [16:02] kietnht: cái IP 10 dùng VPN thì có nhanh hơn ko Dong Nguyen  ?
  [16:04] dongnv: 2 phút không response luôn anh
  [16:05] kietnht: ko lẽ upgrade xong họ down cái server ta?
  [16:16] kietnht: chắc để hỏi bà lena phát, mấy cái issues này e biết bên họ ai support ko Anh Trinh ?
  [16:23] anhttl: dạ Dror á
  [16:23] anhttl: ko thì cứ tag lena rùi bả tự điều phiếu
  [16:26] anhttl: * ko thì cứ tag lena rùi bả tự điều phối :v
  [08:54] anhttl: anh Duy Vo ơi, tranh thủ test lại mấy task trên jira nha
  [08:55] kietnht: server down để upgrade rồi, chưa ready để test nha
  [08:55] kietnht: * server đang down để upgrade rồi, chưa ready để test nha
  [08:57] anhttl: nhanh hông anh Kiệt, anh Trí đang cũng ko qua bên khác đc
  [08:58] kietnht: hmmm, chắc cỡ 2h
  [08:58] kietnht: hỏi bà lena vụ cái artifact server, bả tag ông Dror mà chưa thấy gì
  [08:58] kietnht: lâu vụ download thôi

### Kevin Kung - Codeorange — 6 messages
  [08:45] longvv: Nay a mần bên này nhé Luc Nguyen
  [08:47] trinm: Long Vo cũng bật tracker Tom hả
  [08:47] longvv: Đúng r nha a
  [08:47] longvv: e đang bật tracker tom
  [08:59] trinm: hmm vậy bên này làm sau hả Luc Nguyen
  [09:00] lucnt: Chắc trước mắt phải đợi rồi nha anh

### Kunal - Fountain — 23 messages
  [14:19] hungpn: ai cũng vào dc site đó mà anh k vào dc
  [16:21] hungpn: image.png
  [16:22] hungpn: lỗi gì nè @vu [thread: 17 replies]
    └ [16:22] datnt: cái field mới em mới thêm vô
    └ [16:25] vutq: tạo migration vô order_items nữa em
    └ [16:25] datnt: dạ oki anh để em tạo
    └ [16:35] datnt: Vu Tat anh ơi PR này nha anh https://github.com/iamksheth/FountainGreetings/pull/470
    └ [16:41] vutq: done nha mn Hung Pham Dat Nguyen
    └ [16:41] hungpn: để anh check lại
    └ [16:55] hungpn: Checkout ổn rồi nha  Vu Tat có thông báo rồi á nè
    └ [16:55] hungpn: nhưng chưa fix cái vụ Review Order nó vẫn đang đá ra trang checkout á
    └ [16:58] datnt: Vu Tat cái vụ mà đá ra này là từ ban đầu card đã làm vậy luôn rồi á anh
    └ [16:58] vutq: ye và nó không nên như vậy á em
    └ [16:59] datnt: còn cái mà hôm nay thứ 6 mình chỉnh máy mình lên 7h sáng xong chỉnh lại 7h tối nó không work
    └ [16:59] datnt: em thấy là do múi giờ server hay sao á
    └ [16:59] datnt: tại code dưới local em thì nó oki
    └ [17:00] vutq: niche quá, để có khách hàng nào dính rồi mình tính, ổn định mấy ngày trong tuần đã
    └ [17:00] datnt: Hung Pham anh test mấy ngày trong tuần nó oki mà phải không anh
    └ [17:00] datnt: còn cái mà anh báo em ngay hôm nay anh chỉnh sáng 7h xong chỉnh lại 7h tối không được thì cái đó chỉ
    └ [17:24] hungpn: đúng rồi á
  [16:22] hungpn: * lỗi gì nè Vu Tat
  [17:01] datnt: * còn cái mà anh báo em ngày hôm nay anh chỉnh sáng 7h xong chỉnh lại 7h tối không được thì cái đó chỉnh tiếp sang thứ 2
  [23:15] hungpn: Mai anh có việc đột xuất nên off cả ngày nha m.n. có gì cần cứ báo có gì anh check sau nha

### Maddy - Extreme Soft Solutions — 6 messages
  [08:41] duongdn: Tuần này Maddy có gì làm ko em
  [08:41] longvv: Có nhe a
  [08:41] longvv: làm cỡ 1-2h
  [08:45] duongdn: te tua , ít xỉu
  [08:45] duongdn: remind ổng đi, tình hình task ngày 1 tệ :(
  [08:45] longvv: Có task lớn, đợi khách ổng approve rùi mình có thể làm full dc

### Những chú voi con đáng yêu — 2 messages
  [05:43] duongdn: Plan của Web dev tuần 17/8 	•	LongVV một số giờ Maddy, còn lại làm Brad thay PhucVT, ko làm Celine nữa 	•	PhucVT một số 
  [05:44] duongdn: switch project nha 2 bạn

### NUS - Bailey - Paturevision 2026 — 6 messages
  [14:03] tuannt: > <@datnc:nustechnology.com> A Tuan Nguyen như a upgrade RDS bên staging.console rồi đúng ko anh? Đúng r
  [14:03] datnc: E thấy login nó toang gòi ấy, ko vào đc site nha a 😂
  [14:05] tuannt: Vậy thì để check xem. Nếu lỗi do upgrade rds thì có thể xin giờ làm. Còn lỗi db thì sẽ check xem the nao.
  [14:07] tuannt: Vì a tạo mới và import db staging sang k thấy lỗi import gì. Và đã trỏ đúng site lên rồi. Khả năng lỗi upgrade gì thôi. 
  [14:20] havs: check log xem trước thử a
  [08:59] duongdn: từ tuần này mình cũng lên workstream luôn nha mn

### NUS Technology — 8 messages
  [16:05] honght: (Không có lời nhắn) Bài hát: Tìm em Trình bày: Hngle, Bảo Anh Link: https://youtu.be/gJAbDSse5WM?list=RDgJAbDSse5WM
  [16:08] honght: "Dù mưa giông ngập lối, trên đường bao khó khăn muôn vàn  Cứ yên tâm anh ở đây, nắm tay em qua từng tháng ngày" Bài hát:
  [16:13] honght: "Lần này anh buông" Bài hát: Lần Này Anh Buông Trình bày: Anh Tú Link: https://youtu.be/JhGz6Xj09GQ?list=RDJhGz6Xj09GQ
  [16:18] honght: "Nợ em cả bầu trời" Bài hát: Nợ Em Cả Bầu Trời Trình bày: Thỏ (Da Lab), Hoàng Tôn, OSAD, Hồ Đông Quan, Hà An Huy Link: h
  [16:19] chientx: Trên này chưa Buông xong nha Hồng 😂
  [16:20] honght: dạ em sống hơi vội😆
  [16:27] honght: Mọi yêu cầu về bài hát yêu thích mọi người gửi về hộp thư của chương trình QTAN nhé!  Cảm ơn cả nhà ạ ❤️❤️❤️  https://fo
  [16:30] minhtv: Hello mọi người, em có 1 chiếc mail về training sắp tới, mọi người check mail nhé . Chúc mọi người cuối tuần vui vẻ ❤️❤️

### PHP Projects — 4 messages
  [14:03] namtv: Chà, sao có vụ hôm nay go live gì ổng nói mình biết mà mình ko online xử lý. Đang call Dương chưa nghe máy
  [14:21] chientx: có hứa hẹn gì ổng ko vậy a Dương
  [14:21] chientx: mà hẹn go live vào T6 là hơi rủi ro à...
  [14:30] duongdn: ko, mình go live lâu rồi, còn hôm nay cus đưa data vào, ổng muốn mình online để support  tối qua cus check data có issue

### Technology Department — 1 message
  [15:21] namtv: Sau khi release Pro mới, Deepseek đã chính thức thông báo tăng giá và áp dụng giờ cao điểm. Tuy nhiên, mức tăng cao hơn 
