# Matrix — since 2026-09-14 00:00 +07:00

### Celine - OhCleo — 15 messages
  [08:37] phuongpvt: dạ a Lu Ho ơi, bả có nhờ làm thêm 2 ý ở task này nha anh https://trello.com/c/3OFWpMyJ#comment-6aa3f6c1acf479f0a0c66fa3  [thread: 4 replies]
    └ [08:39] luhx: nhờ thì không làm nha bắt mới làm 🫣
    └ [09:10] luhx: a Hung Pham check thử cái trên với bản sau nhé a https://i.diawi.com/29Ni9f
    └ [09:13] luhx: Android nha a, đều là STAGING nhé. https://drive.google.com/file/d/12_W20nx4LC5iJQawQFjo5E-Ml_eiut7h
    └ [09:27] hungpn: okie em
  [08:39] phuongpvt: dạ a Long Vo anh check với trả lời task này nha https://trello.com/c/j7bzgcnL/240-cover-art-generation-investigation [thread: 1 reply]
    └ [09:26] longvv: a rep trong ticket r nha
  [09:42] duongdn: Vu performance chưa go live nhỉ, thấy slow request vẫn còn như cũ
  [09:43] longvv: Bữa a Hùng check okie hong a Hung Pham
  [09:44] longvv: Trên staging á
  [09:45] hungpn: trên staging anh có check rồi á nè, có noted cho em mấy điểm trong đọan chat, để anh tag em vào
  [09:45] hungpn: * trên staging anh có check rồi á nè, có noted cho em mấy điểm trong đọan chat, để anh tag em vào mà em chưa trả lời anh

### Delivery - Resource Arrangement — 4 messages
  [09:07] namtv: NEW	KhoaTD		14/09/2026	Có việc bận đột xuất ==> Tính vào time idle / project internal. Ko cần update note
  [09:08] namtv: NEW	SamHT		14/09/2026	Bị sốt ==> Tính bên Elena ko bù. Anh đã update note
  [09:08] namtv: NEW	VuTQ		14/09/2026	Đưa người thân đi giải quyết thủ tục hành chính ==> Tính vào time idle / project internal. Ko cần u
  [09:08] namtv: NEW	ToanNT		14/09/2026	Đi khám NVQS ==> Tính vào time idle / project internal. Ko cần update note

### Direct Manager — 7 messages
  [09:07] tuantt: Dạ bên Leo đã xử lý nha c Bình, còn bên Brian thì hôm nay sẽ xử lý
  [09:14] namtv: Ko OK nha Tuan To . Đây là 1 issue nghiêm trọng, đã được thông báo, remind, ảnh hưởng trực tiếp tới risk mất tiền. Sao c
  [09:16] namtv: Các cases khác thì nhẹ hơn, nhưng cũng cần discuss với team xem những memo đó sao ko phù hợp và như thế nào là phù hợp, 
  [09:18] namtv: Minh Trinh bên Rory risk cao, cũng cần monitor kỹ, check daily đi [thread: 1 reply]
    └ [09:24] minhtv: dạ anh, em sẽ check dailey memo
  [09:24] minhtv: * dạ anh, em sẽ check daily memo
  [09:43] namtv: Hiểu ko mọi người? React confirm cái nào

### Elena - Active Alerts — 31 messages
  [08:20] samht: Tri Nguyen: a có làm hết mấy task occurrence r, đã push. Em deploy hộ a nhé
  [08:20] samht: Anh Trinh: nay a off nha e
  [08:40] anhttl: Tri Nguyen: vậy anh push lên cho QC test nha
  [09:03] anhttl: Tri Nguyen: sao hông có cái nào em thấy có vẽ type 3 hết
  [09:04] anhttl: với cái này sao để total previous là 8 mà vẽ ra có 1 đường à
  [09:04] anhttl: image.png
  [09:05] trinm: coi cái này xem  https://active-alerts.nusdev.net/investigation/#/reporting/investigation/84363613-7fef-4ef3-bc9b-1c5104
  [09:07] anhttl: icon cho type 3, ở chart trên với chart dưới, 1 trong 2 cái là sai rồi á. cái type 3 ở chart là chỉ có viền thôi, ko có 
  [09:07] anhttl: image.png
  [09:08] anhttl: image.png
  [09:08] trinm: do nó nằm ngoài khoản thời gian ở dưới đó
  [09:09] anhttl: Type 1 mà nằm sau type 3 là có hợp lý ko, phải do data ko anh Kiet Nguyen
  [09:09] anhttl: image.png
  [09:11] kietnht: type 1 nằm sau type 3 đúng rồi e, type 1 nó là cái latest, hôm ông kfir có confirm trên room rồi ấy
  [09:11] kietnht: image.png
  [09:12] anhttl: vậy chỗ đó là sao nhể, time của type 3 là lấy từ field gì á
  [09:14] kietnht: image.png
  [09:14] anhttl: dạ oki
  [09:18] anhttl: Em xem thì thấy thiếu data những case này để test: + Có cả valuable và non valuable trên cùng 1 alert --> để test xem ra
  [09:20] anhttl: * Em xem thì thấy thiếu data những case này để test: - Có cả valuable và non valuable trên cùng 1 alert --> để test xem 
  [09:22] kietnht: Ý đầu tiên tạo dễ, sửa cái text trong db thôi. Ý sau a chưa hiểu ý e, ý là có many type 1 và many type 3 trong cùng 1 al
  [09:22] anhttl: Tri Nguyen: Task Pin hình như chưa làm
  [09:22] trinm: anh thấy có pin được mà
  [09:27] anhttl: ý 2, ý em là em muốn có nhiều cái primary, mỗi primary có type 3 của rieeng nó chắc anh tạo sao để 1 invetsighation có đ
  [09:29] anhttl: hình như có pin được, lỗi UI thôi, cái pin khi được pinned là màu đen á [thread: 2 replies]
    └ [09:29] anhttl: image.png
    └ [09:33] trinm: ok em để fix
  [09:37] kietnht: Anh Trinh:  rồi cái assumption có gửi bả chưa? chưa gửi là ko est đc
  [09:37] kietnht: * Anh Trinh:  rồi cái assumption OP có gửi bả chưa? chưa gửi là ko est đc

### Kunal - Fountain — 11 messages
  [08:57] trinhmtt: Em gui plan tuần này ạ  ViTHT: 40h ThinhT: 20h  DatNT: 40h
  [08:57] trinhmtt: * Em gui plan tuần này ạ  ViTHT: 40h ThinhT: 20h  DatNT: 40h => QC 25h
  [09:14] vitht: thấy trang này đang bị 404
  [09:15] vitht: https://www.fountaingifts.com/faq
  [09:15] datnt: https://www.fountaingifts.com/FAQ
  [09:15] datnt: này mới đúng nha chị
  [09:15] vitht: Trinh Mai:  v để sửa lại cái link trong menu lun
  [09:16] vitht: Screenshot 2026-09-14 at 9.16.06 am.png
  [09:16] vitht: bấm dô nó đang link tới /faq
  [09:17] duongdn: theo common sense thì upcase hay downcase cũng nên vô được chứ ...
  [09:19] vitht: Dạ để e sửa

### NUS - Elliott - New GreenFort Capital — 1 message
  [08:52] tuantt: Hi mn, từ tuần này mình ko làm bên này nữa nha

### Potential - Wildsoul Wellness — 8 messages
  [08:54] chientx: Hi mn, Có 1 Kh potential đang dùng Mindbody, và họ muốn tìm team giúp họ improve 1 số thứ. Có forward mn 1 email. Mn chắ
  [09:01] chientx: Một số info bữa meeting bà Yami có nói sơ: + Nhiều cái hiện tại bả phải làm thủ công hơi mệt, ví dụ phải setup gì đó hay
  [09:03] chientx: cái này là một trong những lead tốt nhất mà mình kiếm được qua kênh outbound bên ngoài, mn ưu tiên  tối đa cho nó nha. C
  [09:28] namtv: Hình như mình cũng hay phải contact Mindbody phải ko Duong Doan ?
  [09:29] duongdn: Ta chưa contact bao giờ, để hỏi các dev khác xem
  [09:30] namtv: Ít nhất là hồi lên v6 hay gì đó là có contact bên đó mấy lần
  [09:38] namtv: Có cho AI analyze, research các problems trong file, mà nó nói nghe lùng bùng quá, do chưa có base bên Mindbody, nên ko 
  [09:40] duongdn: Mới check với team, mình có 2 lần contact lúc upgrade V5 -> v6 và lúc cần support multi region nhưng muốn chung member i

### Recruitment — 11 messages
  [08:32] chientx: > 1.Nguyễn Trung Dũng (BDM - 1st): 09:00 AM, Mon Sep 14, 26 A thấy email đang để là "Trần Nguyễn Trung Dũng" nha
  [08:41] trucpdt: dạ sr anh, tên đúng của Ứng viên là Trần Nguyễn Trung Dũng, em bị nhầm ạ
  [09:04] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: Business Development Manager (Se
  [09:04] chientx: > 1.TrầnNguyễn Trung Dũng (BDM - 1st): 09:00 AM, Mon Sep 14, 26 Bạn này chưa tới hả mn?
  [09:05] thamdt: dạ chưa, e đang hỏi bạn headhunter
  [09:07] chientx: những bạn này mình ko có contact trực tiếp hả e?
  [09:07] thamdt: dạ ko anh ơi
  [09:08] thamdt: phải thông qua bên headhunt hết ạ
  [09:12] chientx: Lát 10h a có meeting khác, giờ bạn chưa tới thì chắc phải dời interview bạn qua 10h30 hoặc 11h nha
  [09:12] thamdt: dạ
  [09:13] thamdt: Bạn headhunter cũng đang cố liên lạc với UV, có gì em update sau ạ

### Rory Hackett - BXR App — 11 messages
  [09:26] minhtv: Memo tuần rồi Khoa ghi vẫn chưa đạt Đây là cái bạn ghi `Build app and submit to Testflight` Cái nên ghi là `Build the ap
  [09:30] duongdn: Lúc mình làm với Mindbody đã từng contact bên đó bao giờ chưa mn, và vì lí do gì Minh Trinh  Le Ngo  Khanh Ho  Lu Ho
  [09:30] duongdn: như a Năm có nói là > Ít nhất là hồi lên v6 hay gì đó là có contact bên đó mấy lần
  [09:30] luhx: có nha a hồi làm vụ login/update profile lên v6.
  [09:32] duongdn: Cụ thể issue là gì cần contact, và còn vấn đề gì nữa ko
  [09:32] duongdn: Ví dụ vụ region mình có cần gì bên MIndbody ko
  [09:34] luhx: là hồi đó app đnag sài rất nhiều api v5, nó yêu cầu mình phải upgrade lên v6 vì nó sắp xoá v5, mà sau thời gian tìm hiểu
  [09:34] luhx: lúc đó làm là xong rồi á, sau này thì em không rõ.
  [09:35] duongdn: ok em Còn bên BE thì sao Le Ngo  Khanh Ho [thread: 1 reply]
    └ [09:39] khanhhh: Duong Doan: dạ lúc e làm task thì chưa cần tạo ticket để nhờ bên họ support nha a.
  [09:38] lenh: Lúc em làm thì có tạo ticket support vụ Client ID number (client membership number) across multi-regions, bên MB reply q

### Sandor Antal - Lyf Support — 9 messages
  [08:41] minhtv: https://bitbucket.org/lyfappteam/lyf-backend/pull-requests/546/overview cái này làm gì á Long? Thắng tổng hợp tình hình 
  [08:42] longvv: deploy lên prod á a
  [08:42] longvv: merge vô mới lên prod dc
  [08:43] longvv: lên r e setup cho deletion callback nó trỏ qua live
  [08:51] thangn: tình hình hiện tại là có 2 vấn đè khi submit production: 1. BE cần deploy production. 2. có error trên Google Play Conso
  [08:53] thangn: chiều họp có cần e demo app hok ó
  [08:54] minhtv: cần á
  [08:54] thangn: okay, để e set up sẵn
  [08:54] minhtv: 1h30 nhé
