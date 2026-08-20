# Matrix — since 2026-08-19 07:42 +07:00

### !DqlNWfFGIfRUQlXVOK:nustechnology.com — 6 messages
  [13:58] uyenvhp: Anh Dương ơi, trong email, em thấy hôm nay bên mình có tổ chưc tech talk. Khi nào gần bắt đầu, anh hú em, để em vào chụp ⚠️
  [14:00] duongdn: ok e
  [17:28] uyenvhp: Anh Dương ơi
  [17:28] uyenvhp: mình bắt đầu chưa á
  [17:28] duongdn: rồi mà chưa có ai,  vài phút nữa vô cũng được em :D
  [17:28] uyenvhp: dzay để em vào chụp anh cái :v

### !jFKMARRnYlvuFqZaKx:nustechnology.com — 4 messages
  [10:50] dongnv: Anh Dương chiều lỡ em quên join Tech talk thì hú em nha, em bị cái 5h30 hay phi về luôn lắm :)) ⚠️
  [10:58] duongdn: :D
  [17:18] duongdn: remind :D
  [17:18] dongnv: OK anh.

### !LpINYVvtgacbKsexsa:nustechnology.com — 82 messages
  [09:28] duongdn: added
  [10:05] datnc: Screenshot from 2026-08-19 10-04-46.png
  [10:06] datnc: A check thử hộ e case này. Sao e nhờ nó write lại file markdown cho từng card ở 1 cái asana board export mà nó toàn đứt 
  [10:07] datnc: Shopify_Development_–_NUS_Technology.csv
  [10:07] datnc: File này nha a.
  [10:08] duongdn: ok, a cũng thấy hơi mệt mệt cái AnythingLLM qua giờ ...
  [10:10] datnc: Hay mình chuyển qua dùng opencode ta... Mỗi tội là nó code first quá, e có dùng thử cái desktop app của nó. Còn Anything
  [10:11] datnc: Cái OpenCode có vẻ hợp với approach của mình hơn -> lv local trong 1 cái repo. vì skills của nó save chung với repo luôn
  [10:15] duongdn: để a nghiên cứu thêm,  xem độ smooth của nó có đáng để đánh đổi độ tiện dụng ko
  [10:25] duongdn: giờ làm sao để a tái tạo issue của em
  [10:28] datnc: A attached cái file csv vô nhan, gòi a prompt nó bảo nó populate 1 folder bug-reports & 1 folder requirements bằng data 
  [10:28] duongdn: gởi prompt cho a
  [10:33] datnc: ``` Based on this Asana board export. Create two folder: - Requirements: For task only - bug-reports: For bug only Popul
  [10:44] duongdn: bên a chạy khá là ok ...
  [10:44] duongdn: chắc để a thử với máy window giống em , để mở máy lên thử
  [10:45] datnc: Ẹc... máy yếu chăng... e chạy bên máy cty á a.
  [10:45] duongdn: e thử lại vài lần chưa
  [10:45] datnc: E thử 2, ba lần rồi đều tạch dọc đường cả.
  [10:45] duongdn: hum ...
  [10:45] duongdn: để a thử máy window
  [10:45] datnc: Nó đốt 1 mớ token luôn...
  [10:45] datnc: QC xài Ubuntu á a.
  [10:45] datnc: Đổi qua từ bữa bắt bản quyền gòi =)).
  [10:45] duongdn: ủa
  [10:45] duongdn: a đang dùng ubuntu đây
  [10:46] duongdn: ngon lành mà :|
  [10:46] duongdn: vậy e thử setup DesktopLLM giống a thử xem
  [10:46] duongdn: giờ đang nghiên cứu, thử cả hai đi
  [10:46] duongdn: xem cái nào tốt hơn
  [10:46] datnc: Okie, e đang dùng cái OpenCode tạm, nó chạy ngon lành cành đào, từ view hình...
  [10:48] datnc: Mà a set context windows + max token bao nhiêu vại?
  [10:48] duongdn: a để default thôi
  [10:48] duongdn: chưa test tới cái đó
  [10:54] datnc: Screenshot from 2026-08-19 10-54-33.png
  [10:55] datnc: Chỗ này nè a Dương?
  [10:56] duongdn: a chưa đụng, để default thôi
  [10:57] duongdn: mà a dùng deepseek của a, ko phải confirm này
  [10:57] duongdn: a sẽ thử với config này xem
  [10:57] duongdn: do deepseek công ty a hết rồi ...
  [11:02] datnc: E đang thử dùng qwen, có khi là do cái model chăng =.=...
  [11:03] duongdn: thử deepseek xem
  [11:36] datnc: E thấy bên e nó khùng dean sao đó =.=... haiz chán thiệt.
  [11:37] datnc: Chắc để e request qua ngồi gần a vài hôm coi cái vụ này quá :")).
  [11:38] datnc: image.png
  [11:38] datnc: Nó chạy task 1 hùi xong nó crashed hay bị gì đó trống trơn luôn a... app desktop á.
  [11:40] duongdn: sao bên e nhiều bug zị :))
  [11:41] datnc: Thì dị haha 😂
  [11:42] duongdn: lại thử xem ... e cũng dùng ubuntu à? đưa issue cho chatgpt nó debug xem đi, có thể có crash log để sửa theo, và làm les
  [11:46] duongdn: a thử key công ty cũng bình thường nha
  [11:46] duongdn: a nghĩ máy e có vấn đề
  [11:46] duongdn: hok phải do AI đâu
  [11:46] duongdn: mà e dùng máy công ty hay máy cá nhân, window hay ubuntu?
  [11:47] datnc: Máy cty anh, Ubuntu, e dùng máy này để test vì các bạn khác cũng vậy.
  [11:47] datnc: Cái desktop lag dean í, cái docker local thì đỡ hơn xí.
  [11:47] duongdn: cho a xem cấu hình máy xem
  [11:47] duongdn: xem giống máy a ko
  [11:47] duongdn: a dùng cực mượt ...
  [11:48] duongdn: Cho a cái IP thôi cũng được, a hỏi Cường cho rõ
  [11:48] datnc: Core i3-7000s =)). 16GB RAM.
  [11:49] datnc: 192.168.3.211 | nus - 45tgbhu89 nha a.
  [11:49] duongdn: y chang máy a
  [11:49] duongdn: ko có gì khác cả
  [11:49] datnc: Như nãy nó chỉ write đc 15/46 & 5/12 files xong tạch. E đang cho nó chạy lại.
  [11:49] duongdn: e báo Cường thử xem
  [11:50] duongdn: xem bạn có hỗ trợ được ko
  [11:50] duongdn: chứ bên a xài ngon lắm ...
  [11:50] datnc: Lên đc 22/46 =))
  [11:51] duongdn: chậm lên thì bình thường, có chạy hay ko thôi
  [14:52] duongdn: e báo Cường chưa ?
  [15:03] datnc: E chưa cơ mà nó tù tù sao á, cơ mà có thể là do cái deepseek.
  [15:03] duongdn: a dùng deepseek mà ...
  [15:03] duongdn: env y như em luôn ...
  [15:04] duongdn: nếu nó giật lag hay crash thì nên báo Cường xử lí
  [15:04] duongdn: có thể máy có gì đó (ram lỗi chẳng hạn)
  [15:04] duongdn: còn tù tù là sao ta ...
  [15:28] datnc: Nó sao sao á. Mà chỗ bên cạnh a trống ko e qua bển a ngó cho tiện. Hoặc để e dùng thêm vài hôm nữa... gòi e report cho a
  [15:28] duongdn: vụ treo thì nc Cường
  [15:29] duongdn: ngắt dọc đường, này a thấy cũng thường, AI nào cũng bị
  [15:29] duongdn: bên a thì có chỗ
  [15:31] datnc: Vâng a, còn cái OpenCode e có thử dùng nó làm vài task, thì vì nó là codefirst nên nó cứ approach vấn đề kiểu coding nên
  [15:32] duongdn: a thấy nó stable rồi ... có thể em so sánh nó với ... ChatGPT thì thấy nó cùi, nhưng  a thấy vậy là tốt,  p/s: vụ crash,
  [15:32] duongdn: còn deepseek model thì ko thể xịn như mấy cái khác được, dù benmark gần

### !oGYjbzEfphvvauBZtq:nustechnology.com — 13 messages
  [11:09] duongdn: ui lỡ tay xài hết token tuần này rồi Mà bên Đạt nó báo bug bên máy nó mà ta ko bị đang ko rõ có phải do AI model bên côn
  [11:11] namtv: Đã reset
  [11:11] namtv: Xài Flash đi 😩 Pro đốt ác quá
  [11:11] namtv: Mà chưa thấy cái nào thay thế phù hợp. Có khi tắt mẹ Pro, xài Flash thấy cũng ổn...
  [11:17] duongdn: thank you  sorry ko lường trước được độ ăn token của deepseek theo cách tính usage mới, chọt nhẹ bay mịa nó  bình thường
  [11:18] duongdn: BTW, ko thấy nó reset, hay UI cache hoặc phải trigger lệnh đầu tiên nó mới refresh ?
  [11:18] namtv: Mày thử chạy thì có bị lỗi ko?
  [11:19] duongdn: vẫn lỗi,  báo hết budget
  [11:19] namtv: Chà
  [11:20] namtv: Có vẻ chỉ reset được usage của month, để xem
  [11:21] namtv: Mới tăng lên thành $10 weekly, $20 monthly. Thử xem
  [11:22] duongdn: thấy chạy rồi, dù cái UI trên nustechnology.com thì vẫn báo hết
  [11:23] namtv: UI nó cache quota bao lâu đó quên rồi

### !oofREYAXHsvPWEOJev:nustechnology.com — 10 messages
  [11:56] duongdn: nay mình có techtalk lúc 5:30 nên có họp thì sớm nha bạn :)
  [11:56] duongdn: 3 - 4h gì đó nha, :)
  [11:56] thuyltt: hay h luon
  [11:56] thuyltt: =))
  [12:00] thuyltt: thoi too late, chieu di =))
  [13:30] duongdn: ok có gì hú hen
  [13:59] thuyltt: quỡn hem
  [14:00] duongdn: hok quỡn nhưng thôi chắc họp đi, coi như thay đổi ko khí, đau đầu quá ...
  [14:00] thuyltt: ok, hop xa stress =))
  [14:00] thuyltt: Nova nha

### !tGBJevbuSmjqVePBPN:nustechnology.com — 5 messages
  [15:15] halt: A ơi bên ô James Diamond có trả lời gì ko ạ, nếu ko trả lời gì thì a tag ổng vô dí lại giúp e nha
  [15:16] duongdn: sorry qua a lu bu quá quên mất, để a viết ngay ...
  [15:17] halt: A tag ổng vô msg luôn cho đỡ trôi msg ạ
  [15:17] duongdn: OK
  [15:28] duongdn: done

### !zfXpcHSkwqWylFrApi:nustechnology.com — 1 message
  [08:17] chientx: Brad B. 8:04 AM ICT, 19 Aug 2026  	 Saw that there is some data online for Salvage Solutions text for the website?

### Arthur - Meta-Stamp — 11 messages
  [08:32] namtv: Nay Tiến xử cho ổng đi nha
  [09:15] tiennd: hmm, bên Leo task nó hơi căng á anh, do task này nó đụng tới cấu trúc code, nên ko xong sớm thì sẽ pending những issue k
  [09:16] tiennd: * hmm, bên Leo task nó hơi căng á anh, do task này nó đụng tới cấu trúc code, nên ko xong sớm thì sẽ pending những task 
  [09:16] namtv: Nay bên Celine có gì gấp ko Phuc Vo ?
  [09:16] tiennd: hiện tại bên Leo: có 9 store, 1 store 1 branch. Khi fix 1 bug thì phải fix cho 9 source code, deploy 9 staging test & de
  [09:17] tiennd: giờ bên Leo giờ gộp 9 source lại thành 1 source. nên cần phải xong sớm, nếu ko thì mấy next task bị pending
  [09:19] phucvt: Có nha anh. Có 2 task cần xử lý gấp cho bả, còn mấy task còn lại em chưa rõ có gấp ko
  [09:19] namtv: Chắc xong 2 cái rồi nói Minh xem dev mobile có gì làm tiếp ko để em nhảy qua xử cho bên này phát
  [09:20] phucvt: Ok anh. Bên Celine thì dev mobile thì có task đang làm á anh
  [09:22] namtv: Anh ko rõ cái cần fix bên này nhiều ko. Nếu giờ offical xử ko kịp thì tối xử nốt giùm anh nha. Mình cũng vượt budget quá
  [09:23] phucvt: Ok anh, để e ráng sắp xếp

### Bailey - BA/QC — 13 messages
  [09:40] duongdn: đã add được tag chưa mn
  [09:41] trinhmtt: dạ roi
  [09:42] duongdn: QC có đang ở công ty hết ko, qua chỗ anh đi, a muốn trình bày 1 chút về workstream cùa Bailey
  [09:47] datnc: All luôn hay mình e thui a?
  [09:47] datnc: Có gì e transfer lại các bạn cũng đc.
  [09:47] duongdn: tốt nhất là all, mà ko thì mình e cũng được, nhưng e đảm bảo cái a sắp nói nhé
  [09:48] datnc: Hả :")) để e qua.
  [09:59] datnc: Hú Trinh ơi, e migrate hết taskID qua nhan, kể cả mấy cái paid luôn a a Duong Doan ? Nào done a log giờ hiện tại vô cho.
  [10:00] duongdn: paid thì khỏi đi
  [10:36] trinhmtt: hmm đang có issue là cái tag id nó limit character với k cho kí tự đặc biệc
  [10:36] datnc: =.=...
  [10:37] trinhmtt: để em log lại báo bên WS
  [10:37] datnc: 20 letters á phải hum? taskID của mình dài quá dài =)).

### Brad Ballantine - Auction warehouse — 1 message
  [08:24] duongdn: Có msg nha mn

### Celine - OhCleo — 250 messages
  [08:39] phuongpvt: https://trello.com/c/JNP9OGzF/206-select-several-tags-in-the-app#comment-6a844b47dd5ba86aa7537780 Dạ a Lu Ho, bả confirm
  [08:40] phuongpvt: Với bả muốn hiển thị số lượng tag đã select tương tự như bên web. Hiện bên mobile e thấy khi select tag thì nó tự động f
  [08:40] phuongpvt: Screenshot 2026-08-19 084002.png
  [08:40] phuongpvt: nếu làm thêm button search 2 tags này thì anh nghĩ nên để ntn á
  [08:43] luhx: uhm đúng rồi hiện tại chọn tag là nó call API get result của tag đó luôn.
  [08:44] luhx: Screenshot 2026-08-19 at 08.44.17.png
  [08:44] luhx: vậy giờ a cần làm là: xoá cái tags hiện tại
  [08:44] luhx: xong cho chọn nhiều tag ở phần explore.
  [08:44] luhx: nó cũng hiển thị nhiều tags như vậy và có thêm 1 button search 2 tags?.
  [08:45] phuongpvt: dạ phần nhập từ rồi chọn tags thì giữ nguyên á anh làm thêm cho phần explore là được chọn nheieuf tags trong phần đó
  [08:45] phuongpvt: vậy nếu làm thêm button đó thì phải đổi logic là bấm button mới bắt đầu search và filter tags đúng k ạ
  [08:46] luhx: này tuỳ em muốn sao thôi á, hiện tại là chọn là nó filter theo tags, 1 cái thì filter theo 1 tag, 2 tags thì filter theo [thread: 16 replies]
    └ [14:54] phuongpvt: dạ a Lu Ho, bả confirm là muốn bấm search thì mới apply filter tags nha anh, tức là làm giống với we
    └ [14:55] luhx: vậy là giờ mobile fix lại như sau: - search keyword không chọn tags - > input tới đâu thì search tới
    └ [14:58] phuongpvt: > search keyword không chọn tags - > input tới đâu thì search tới đó hay user nhấn enter ở keyboard 
    └ [14:58] phuongpvt: > tags -> chọn tags xong thì có 1 button search 2 tags ở bên cạnh, bấm thì mới search với tags.  dạ 
    └ [14:58] luhx: đâu hiện tại bấm tới đâu sẻach tới đó á.
    └ [14:59] phuongpvt: à e nhầm
    └ [14:59] phuongpvt: để e xem bên web sao
    └ [15:00] luhx: bên web phải enter á, theo a nhớ là vậy.
    └ [15:01] phuongpvt: dạ, hmmm vậy thì ý này bả ko mention, em thấy giữ nguyên như hiện tại có vẻ tiện hơn. Để e nhắn hỏi
    └ [15:02] luhx: oke em, nói chung là mình có 2 loại search. 1 là search keyword (không có chọn tags) 2 là chọn tags 
    └ [15:59] phuongpvt: > search keyword không chọn tags - > input tới đâu thì search tới đó hay user nhấn enter ở keyboard 
    └ [16:00] luhx: oke vậy a chỉ cần làm là select tag thì bấm search mới search thôi ha.
    └ [16:01] phuongpvt: dạ
    └ [16:02] phuongpvt: Screenshot 2026-08-19 084002.png
    └ [16:02] phuongpvt: thêm button search nữa nha a
    └ [16:02] phuongpvt: tức là có 2 cách bấm search, 1 là bấm search trên keyboard, 2 là button này
  [08:47] phuongpvt: > bấm mới search  dạ e hỏi cus ha anh, trước mắt làm cái cho chọn nhiều tags ở phần explore trước
  [08:49] luhx: có gì update nhanh phần này giúp a nhé Phúc.
  [09:18] luhx: Phuong Pham: a confirm lại phát, mobile đang cần làm các task như sau, coi giúp a còn sót gì không. - load about page. - [thread: 25 replies]
    └ [09:32] phuongpvt: ima_96df4b6.png
    └ [09:32] phuongpvt: dạ a Lu Ho bả muốn thêm amount of track khi search sau khi apply filter và tags nữa nha anh
    └ [09:33] luhx: Screenshot 2026-08-19 at 09.33.13.png
    └ [09:33] luhx: oke a add rồi á mà a quên.
    └ [10:53] hungpn: image.png
    └ [10:53] hungpn: thêm cái hide voice thì web có cần update hok Phuong Pham
    └ [10:55] hungpn: 1000013437.jpg
    └ [10:55] hungpn: Lu Ho: anh chọn 1 cái voice xong nhấn apply rồi chọn tab nó báo lỗi vậy
    └ [10:56] phuongpvt: dạ có á
    └ [10:57] hungpn: Phuc Vo:
    └ [10:58] phucvt: Ok mọi người, em đang ưu tiên cái khác. Cái này để thực hiện sau nha
    └ [11:01] hungpn: 1000013438.jpg
    └ [11:02] hungpn: Lu Ho: khi anh k login mà chọn view 1 tab thì nó loading.. mãi như này
    └ [11:02] luhx: view 1 tab là cái gì a?.
    └ [11:02] hungpn: thì chọn 1 tab trong list Explore á
    └ [11:03] luhx: ý a là chọn 1 cái category?.
    └ [11:09] hungpn: đúng rồi
    └ [11:14] luhx: oke đã tìm ra lý do, để em build lại.
    └ [11:22] luhx: Build mới nha a Hung Pham  Android https://drive.google.com/file/d/16eCe1uXeKmMFstPVklBNBk8yimw9fkY-
    └ [16:06] hungpn: 1000013439.jpg
    └ [16:06] hungpn: anh cài app lần đâu chưa login account là nó chỉ có 3 hide voice á Lu Ho
    └ [16:08] luhx: hình a gửi thấy 28 cái mà.
    └ [16:08] luhx: à cái filter á hả.
    └ [16:11] hungpn: đúng rồi
    └ [16:12] hungpn: options trong hide voice
  [09:24] phuongpvt: > ở task này bả kêu muốn apply cái filter ở search cho phần tags detail nhưng mà ở trên mình đã cho select nhiều tags rồ
  [09:25] luhx: lúc trước thì khi nhấn explore tags nó sẽ nhãy vào detail của tag đó là load tất cả track của tag đó á.
  [09:25] phuongpvt: > load about page. > update explore tags cho chọn nhiều tags. > new this week -> hide ranked và rank number. > update fi
  [09:27] phuongpvt: dạ giờ mình sửa là filter vẫn sẽ được apply  khi chọn tags nha anh. Khi bấm tìm kiếm sẽ cho phép bấm filter, rồi bấm tag
  [09:28] phuongpvt: Bây giờ bả confirm là cho chọn nhiều tags trong explore rồi á, nên sẽ k nhảy thẳng vào khi chọn tag explore nữa
  [09:28] luhx: Phuc Vo:  vậy update thêm giúp a API api/medias/bytags/?tags này nó đang không có truyền param hide voices vs orientatio [thread: 2 replies]
    └ [09:30] phucvt: Lu Ho Anh test thử nha, em thấy trên web đang có apply 2 params đó rồi á
    └ [09:30] luhx: oke em.
  [09:32] hungpn: cần test gì hú anh nhé [thread: 1 reply]
    └ [09:32] luhx: oke a, xí nhé, em update xong cái em build.
  [09:50] luhx: Bản STAGING mới nha a Hùng. Android https://drive.google.com/file/d/1_XEyO0aiS6j_M3WK56SJAzENlYdFaYGj/view?usp=sharing i
  [09:52] hungpn: noted thêm cho anh fix cái gì vs nè
  [09:52] luhx: check thread này nhé a.
  [10:04] phucvt: image.png
  [10:05] phucvt: Lu Ho Cho em hỏi cái toggle New posts và Newsletter của Email Notifications mình đang gắn API hay logic như thế nào vậy  [thread: 8 replies]
    └ [10:12] luhx: Toggle New posts / Newsletter chỉ ghi vào Zustand + AsyncStorage/localStorage trên máy. Backend khôn
    └ [10:14] phucvt: Tóm lại là chỉ mới bật tắt cho vui thui chứ không hoạt động, đúng không anh?
    └ [10:16] luhx: uhm theo code hiện tại là vậy.
    └ [10:17] phucvt: Ok thanks anh Lữ. Phuong Pham Em note cái này để xem có thể suggest bả làm nha. Không rõ sao cái này
    └ [10:19] phuongpvt: dạ
    └ [10:19] phuongpvt: cái này hiện có liên quan đến task nào ko a Phuc Vo, có cần raise lên cho bả giờ luôn ko
    └ [10:30] phucvt: Chưa nha, tạm thời em note lại thôi. NÓ k nằm trong ưu tiên hiện tại của bả
    └ [10:31] phuongpvt: dạ
  [10:06] luhx: để a check nha.
  [10:09] phuongpvt: Dạ a Phuc Vo cho e hỏi, hiển thị data của email automation mình xem ở đâu nhỉ. Bả nói hiện tại data khá lạ, số three lis [thread: 9 replies]
    └ [10:10] phuongpvt: https://trello.com/c/XMPgOUyM/210-email-automations-second-listen-trigger-click-through-issue  task 
    └ [10:14] phuongpvt: Dạ với cần check click rate luôn nha a Phuc Vo, bả list data thấy click rate =0 nên cần check có iss
    └ [10:18] phucvt: Để a xem nha
    └ [10:34] phucvt: https://mc.sendgrid.com/automations
    └ [10:34] phucvt: Phuong Pham: Em xem trong link này nha
    └ [10:37] phuongpvt: dạ cho e xin tk mk nha a Phuc Vo
    └ [10:38] phucvt: Thường các tài khoản là em cũng xin bên anh Năm đúng ko
    └ [10:38] phuongpvt: dạ, để e hỏi a Năm
    └ [10:39] phucvt: Ok em. Twilio - Tony, em xin a Năm cái này
  [10:11] phucvt: Có 2 tasks về email cần ưu tiên, nên tạm thời mình để mấy task còn lại ở inprocess được ko ta? Do nếu mình xong rồi mà k
  [10:18] phuongpvt: dạ chắc mấy anh check lại status của các task đã á, rồi ưu tiên 2 task về email trước
  [10:18] phuongpvt: có vài task có additional requirement đã approve nhưng vẫn đang ở cột testing/devdone á
  [10:42] hungpn: update filter thêm hide voices. --- cía này đang thiếu nè Lu Ho chắc bả đang muốn mang cái hide voice bên chỗ Content se
  [10:42] luhx: Screenshot 2026-08-19 at 10.42.41.png
  [10:42] luhx: ủa có mà. [thread: 3 replies]
    └ [10:43] hungpn: ua? sao nãy anh kéo thấy mỗi 3 cái nhỉ
    └ [10:43] luhx: có đúng bản em vừa build không a.
    └ [10:53] hungpn: để anh check lại
  [10:53] phucvt: image.png
  [10:57] phucvt: Bả muốn khi click "Open the app and pick your 3" thì sẽ mở app.  Lu Ho  Nhưng em đang thắc mắc là có cách nào hiển thị r
  [10:58] luhx: 3 cái đó ở đâu ra á em? nếu mở app thì đang có tính năng là click link gì ở mail mở app á.
  [10:58] phucvt: Cái hình em chụp là email đó
  [10:59] phuongpvt: > Nếu không được thì chắc chỉ cần mở app là được ha em?  dạ oke a Với lại có link nào là link riêng của track ko anh, nế
  [10:59] luhx: mình đang có tính năng đó rồi mà nhỉ, mà hình như là chỉ 1 track thôi, click ở mail sẽ open app và mở detail của track đ
  [11:00] phucvt: Ok mọi người. Từng item thì đã gắn link mở app rồi, em hỏi cái nút "Open the app and pick your 3" thôi à
  [11:02] luhx: là bả muốn click cái đó xong mở app rồi play cả 3 track?.
  [11:03] phucvt: Bả ko detail cụ thể. Nhưng nếu mình có sẵn và làm vậy thì sẽ ok hơn, còn không thì chắc chỉ cần mở app là được, user tự 
  [11:04] luhx: hiện tại hình như app không support vụ play 1 lần nhiều track á, chỉ 1 cái thôi.
  [11:05] phucvt: Ko phải là play một lần nhiều tracks, mà là hiển thị list thôi anh. Play 1 lần nhiều track thì sao nghe được 😆
  [11:06] luhx: nếu vậy thì chắc sẽ là tính năng mới rồi á, kiểu click link thì em add thêm id của mấy track đó với type kiểu group gì đ
  [11:06] luhx: còn hiện tại thì không có.
  [11:07] phucvt: Okie anh. Vậy chốt lại click thì mở app thui, bả có y/c thêm thì tính tiếp
  [13:25] minhtv: Lữ nay chưa update cái Content preferences nhỉ?
  [13:26] luhx: build staging cho a Hùng check rồi á.
  [13:26] minhtv: Nằm ở Todo ...
  [13:26] luhx: ủa ai kéo qua todo vậy :v
  [13:27] luhx: đã kéo lại qua dev done nha, chờ a Hùng check staging, nếu oke thì build live sau.
  [13:32] minhtv: mấy cái liên quan email là top priority nhé Phuong Pham  ơi , bữa a hứa thứ 3 release email, mà mình chậm 1 nhịp / bugs 
  [13:39] phuongpvt: https://trello.com/c/Bps34q2g/208-add-audios-with-deeplink-into-newsletter dạ task này a test chưa a Hung Pham
  [13:42] phucvt: Task đó anh Hùng test rồi nên mới move sang ready to test á em
  [13:42] phucvt: https://trello.com/c/pg8CSRSv/211-getting-the-links-in-the-e-mail-to-work
  [13:43] phucvt: Task mới này liên quan nè, anh đang xử lý
  [13:43] phuongpvt: dạ cho e cf xíu, ready to test là đã test done, còn cột testing thì cụ thể khi nào sẽ move qua cột này ạ
  [13:44] phucvt: Theo anh biết là cột ready to test và testing là Celine sẽ handle
  [13:45] phucvt: Dev làm xong thì move sang dev done, QC test xong thì move sang ready to test để chờ Celine test
  [13:45] phucvt: * Dev làm xong thì move sang dev done, QC mình test xong thì move sang ready to test để chờ Celine test
  [13:45] phuongpvt: dạ oke thanks a
  [14:02] phucvt: Lu Ho Mình dùng deep link nào để mở app thì vào trang home luôn anh Lữ? [thread: 3 replies]
    └ [14:06] luhx: chờ xí a kiểm tra.
    └ [14:09] luhx: https://ohcleo.app.link/open-app
    └ [14:09] luhx: link này nhé em.
  [14:02] phucvt: * Lu Ho Mình dùng deep link nào để mở thì vào trang home của app luôn anh Lữ?
  [14:38] phucvt: Hung Pham Anh test giúp em task này nha https://trello.com/c/pg8CSRSv/211-getting-the-links-in-the-e-mail-to-work [thread: 13 replies]
    └ [14:39] phucvt: Đã deploy lên staging nha anh Hùng
    └ [15:20] hungpn: cái logio này có gắn link chưa á em nhỉ
    └ [15:20] hungpn: image.png
    └ [15:23] phucvt: Em k thấy có yêu cầu gắn link cho logo
    └ [15:24] phucvt: Nên em k có gắn nha anh
    └ [15:25] hungpn: ý anh là nó có gắn link hok á
    └ [15:26] phucvt: Ko á anh
    └ [15:27] hungpn: tks em
    └ [15:30] hungpn: tessted DONE nha
    └ [15:32] phucvt: Thanks anh. Để em deploy lên production xong a verify lại cái nữa nha
    └ [15:49] phuongpvt: Dạ bả mới hỏi bả test đc cái này chưa á a Phuc Vo
    └ [15:51] phucvt: Anh mới test lại xong, đợi xí a nhờ a Hùng verify lại cái nữa rồi báo bả nha
    └ [16:00] hungpn: Footer chạy rồi nha Phuc Vo Phuong Pham
  [15:53] phuongpvt: image.png
  [15:53] phuongpvt: dạ bả có hỏi thêm như này, mà e chưa hiểu this version là version nào á
  [15:54] luhx: theo a hiểu là bả hỏi khi nào mình có thể release bản hiện tại, bản mà mấy task đang ready to test gì đó lên store.
  [15:55] luhx: hình như bản hiện tại là phần content preferences, tags, .... các kiểu.
  [15:57] phuongpvt: dạ, vậy khi nào mình release đc ạ
  [15:58] luhx: này a không biết, đầu tiên mấy task đó làm rõ với bả chưa? QC check xong chưa? và cần bả check lại lần nữa mới live dc c
  [16:00] phuongpvt: có 1 ý cần confirm, bả đã rep, e có rep trong thread rồi nha a Lu Ho
  [16:00] phuongpvt: * > search keyword không chọn tags - > input tới đâu thì search tới đó hay user nhấn enter ở keyboard mới search. Dạ ý n
  [16:03] phuongpvt: dạ a Phuc Vo check tn mới nhất giúp e với nha
  [16:03] phuongpvt: image.png
  [16:04] phucvt: Ý bả là unsubscribe trong email marketing mình vừa update hả ta? [thread: 9 replies]
    └ [16:06] phuongpvt: dạ
    └ [16:06] phuongpvt: image.png
    └ [16:09] phucvt: Đã giải thích cho Phương để trả lời khách. Cái này đang connect lên AWS SES, chứ không phải backend 
    └ [16:49] phuongpvt: Then how does our backend know how to exclude unsubscribers? If you say its working correctly?
    └ [16:49] phuongpvt: a Phuc Vo ơi bả vẫn thắc mắc
    └ [16:50] phuongpvt: Backend gửi request/email qua AWS SES. AWS SES có cơ chế unsubscribe / suppression / contact list ri
    └ [16:53] phucvt: Đúng rồi em, anh có reply bả rồi á
    └ [17:27] phucvt: [SES] FAILED for deleted-user-1002: An error occurred (BadRequestException) when calling the SendEma
    └ [17:28] phucvt: Fail email này
  [16:09] hungpn: nhưng mà Phuc Vo anh vẫn k nhận dc cái email bên Touch... á hì
  [16:10] phucvt: Anh test hồi nào á? Cái email này có khi cả tiếng nó mới gửi :)
  [16:11] phuongpvt: And another question - when are we able to get this version out to appstore? --> Mình có ước tính được ngày cụ thể cho b
  [16:12] phuongpvt: progress của các task đó ntn rồi á
  [16:12] luhx: nay a fix xong, thì chắc sáng mai nhờ a Hùng check kỹ, fix bug, xong chiều build cho bả check, nếu oke hết thì maybe t6 
  [16:13] minhtv: fix vụ gì thế Lữ ?
  [16:13] luhx: thì QC test nếu có bug thì fix.
  [16:14] minhtv: a Hùng ko có time check nhỉ ? Thấy Lữ gửi từ sáng nay
  [16:15] hungpn: những cái Lu Ho báo đã check hết rồi nè
  [16:15] hungpn: anh k biết còn thiếu cái nào hok nhỉ?
  [16:16] hungpn: thiếu gì k nhỉ? [thread: 2 replies]
    └ [16:17] phuongpvt: Dạ tính tới hôm nay là đủ nha anh
    └ [16:20] luhx: vậy là mớ đó oke hết rồi hả a Hùng? còn mỗi vụ filter lúc chưa login nó load 3 cái voices thôi ha?.
  [16:17] luhx: đang thiếu là: - Explore chọn dc nhiều tags, xong bấm search 2 tags mới search, hiện tại cứ chọn là search. - đang fix v
  [16:17] luhx: Phuc Vo:  check giúp a API này api/users/me/preferences nếu không login thì sẽ như nào nếu call? hình như nó phải có tok
  [16:18] luhx: mà hiện tại nếu chưa login vẫn thấy filter, và phải load mớ hide voices/orientation lên.
  [16:18] minhtv: khách liên tỏi có message nhé
  [16:18] minhtv: cứ tầm 2h trờ đi là hoạt động kịch liệt
  [16:19] phuongpvt: Cái này a Phuc Vo  check chưa á
  [16:19] phuongpvt: image.png [thread: 13 replies]
    └ [16:21] phucvt: Anh đang check nha, xem log thì thấy nó báo gửi 4999 emails rồi. Maybe 1 email fail hay sao đó
    └ [16:21] phucvt: image.png
    └ [16:28] phucvt: Phuong Pham: Em báo bả có thể là có 1 email bị fail nhưng mà message trả về chưa đúng nha
    └ [16:28] phucvt: Mình sẽ kiểm tra và update lại message cho đúng nha
    └ [16:29] phuongpvt: dạ
    └ [16:29] minhtv: nhớ gửi dẫn chứng bao nhiêu mail thành công
    └ [16:29] phucvt: image.png
    └ [16:30] phucvt: Gửi hình này nha Phương, nói mình check trên AWS SES
    └ [16:35] phuongpvt: a Phuc Vo bả hỏi nha ok, where can I check this? I mean - my understanding is - everything is workin
    └ [16:36] phucvt: Đúng rồi, mình vẫn gửi được email thành công mà. Còn việc 1 email thất bại thì mình đang kiểm tra, m
    └ [16:36] phuongpvt: đúng là work nhưng mà có 1 email failed, cái này có là issue gì ko anh
    └ [16:36] phuongpvt: > Còn việc 1 email thất bại thì mình đang kiểm tra, mình nghi là nó dẫn đến việc hiển thị thông báo 
    └ [16:37] phucvt: Anh đang check nha
  [16:20] minhtv: Vụ Failed này từ tháng trước tới giờ, bả cay lắm rồi á. Ráng ráng resolve trong hôm nay nhé
  [16:21] hungpn: Explore chọn dc nhiều tags, xong bấm search 2 tags mới search, hiện tại cứ chọn là search. -- này là làm rồi  hay đang l
  [16:21] luhx: đang làm a.
  [16:21] luhx: 2 cái này là đang làm.
  [16:22] hungpn: thấy chat quá trời, có chỗ nào chốt req hok Phuong Pham hì, do anh k follow bên này thường xuyên dc á [thread: 1 reply]
    └ [16:22] phuongpvt: dạ nó lẻ tẻ trong từng ticket á anh, trước a Lữ có tổng hợp á, chắc bên mobile thì a xem đó tạm
  [16:31] hungpn: Lu Ho: check thêm cái màn hình Top Tags nữa nha, k có filter ở màn hình đó á
  [16:31] luhx: top tags ở đâu a.
  [16:32] hungpn: 1000013440.jpg
  [16:33] luhx: ồ phần này cugnx cần filter à, tưởng kêu mỗi search vs category thôi chứu.
  [16:33] luhx: * ồ phần này cugnx cần filter à, tưởng kêu mỗi search vs category thôi chứ.
  [16:36] hungpn: nó cũng là 1 cái category mà
  [16:36] luhx: tag vs category khác nhau mà a.
  [16:36] luhx: thôi để em add cho nó.
  [16:37] hungpn: vậy đợi Phuong Pham confirm nè
  [16:38] hungpn: image.png
  [16:38] hungpn: trên web nó lại để là 1 cái filter trong page Categories nhỉ 🤨
  [16:40] hungpn: https://trello.com/c/wVEIggrD/189-replace-this-about-page-with-current -- cái này update bên app luôn rồi  k thấy báo ta
  [16:40] luhx: thôi để em làm cho nó giống web, add thêm cũng không thừa.
  [16:47] luhx: còn mỗi cái này, nào rãnh check giúp a nhé Phúc. [thread: 11 replies]
    └ [16:58] phucvt: Cái này anh check được mà, call API là biết nó trả về response ra sao
    └ [17:03] luhx: ý là check giúp a case không login á, nó đang 401, yêu cầu phải có token, mà vấn đề là mình cần load
    └ [17:06] phucvt: Ủa guest filter thì đâu cầu gọi API  preferences chi anh
    └ [17:06] phucvt: Cụ thể là khách muốn làm gì hả anh?
    └ [17:06] luhx: list đó lấy từ API mà em.
    └ [17:06] luhx: cái list hide voices/ oriatation là load từ API mobile không hard list đó.
    └ [17:07] luhx: hoặc là phải có API get list hide voices/orientiation mà không cần token.
    └ [17:07] luhx: Screenshot 2026-08-19 at 17.07.47.png
    └ [17:08] phucvt: Rồi em hiểu rồi 🥲
    └ [17:10] phucvt: Vậy cái này chắc phải thêm API mới để get cái list đó
    └ [17:12] luhx: chắc phải vậy á.
  [16:55] phuongpvt: e kéo task này về inprogress nha a Lu Ho  https://trello.com/c/JNP9OGzF/206-select-several-tags-in-the-app
  [16:55] luhx: oke em, nào build cho QC thì a kéo qua dev done sau.
  [17:01] minhtv: Lu Ho:  coi mấy cái mobile done rồi nhớ kéo qua cho khách test nhé
  [17:03] luhx: mobile thì phải build khách mới test dc chứ.
  [17:04] luhx: sáng mai sẽ build sớm nhờ QC check rồi build prod cho bả chiều test nhé.
  [17:07] luhx: * cái list hide voices/ orientiation là load từ API mobile không hard list đó.
  [17:08] minhtv: Ngâm mấy cái task lâu quá 🥶
  [17:08] luhx: đâu phải mình ngâm đâu, phải chờ bả confirm mới làm dc mà.
  [17:08] luhx: nay mới confirm rõ hết mới làm dc đó chứ.
  [17:10] minhtv: Nên làm rõ sớm hơn nếu cần. Mấy task tuần trước tới giờ chưa xong , qua lại hơi lâu  🥶
  [17:11] luhx: Report hôm nay nhé: - About page (done) - Handle filter with hide voices and add filter in Top tags detail. - Handle mul
  [17:11] luhx: thì mấy task đó làm xong, đưa bả, bả feedback xong hỏi lại update thêm mà. [thread: 1 reply]
    └ [17:14] minhtv: Này đến từ khâu phân tích, có điểm mù, hoặc phần chưa rõ , assume làm đại / thiếu, dẫn đến progress 
  [17:12] phucvt: Tương lai update thêm mình thấy nhiều thì tạo task mới á anh

### Delivery - Resource Arrangement — 7 messages
  [08:59] namtv: NEW	ThienTM		19/08/2026	Đi khám bệnh ==> Tính vào time idle / project internal. Ko cần update note
  [16:21] namtv: NghiepNQ bù bên Michael Koh. Anh đã update note
  [16:23] namtv: >• KhanhHH	17/08/2026	Nghỉ ngơi  => Chờ a Năm update plan Tính bên Elena ko bù. Anh đã update note
  [16:23] namtv: >• SangNV	17/08/2026	Giải quyết việc cá nhân  => Chờ a Năm update plan TamVT bù bên Zeke. Anh đã update note
  [16:24] namtv: >• ThuongNTN	17/08/2026	Giải quyết một số việc cá nhân => Chờ a Năm update plan Bên Craig dùng PL. Anh đã update note
  [16:51] halt: Hi a Năm, a Chiến Em đã check note trong Master List: 1/ Web plan: Note trong Master list đã đúng và đủ theo plan đầu tu
  [16:51] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 

### Direct Manager — 5 messages
  [09:33] duongdn: Hi chị Bình, Năm Cho em hỏi case này nên xử lí thế nào trên Workstream Dự án Bailey hiện ko charge QC như default Nhưng 
  [09:34] namtv: Sao lại ko charge QC by default? Phần fixed cost thì luôn để charge = actual
  [09:35] namtv: Còn giả sử nếu project chỉ có hourly và đang ko charge QC, sắp tới có charge: - Hiện tại: set QC ko charge by default - 
  [09:36] namtv: * Còn giả sử nếu project chỉ có hourly và đang ko charge QC, sắp tới có charge: - Hiện tại: set QC ko charge by default 
  [09:40] duongdn: à ok clear

### Elena - Active Alerts — 38 messages
  [08:45] kietnht: Anh Trinh: hết task nha, nếu ko còn gì chắc a coi lại mấy cái PRs xem có gì fix ko
  [08:59] kietnht: Anh Trinh: bug liên quan cái link child hôm qua tag gì á
  [09:00] anhttl: Kiet Nguyen: FIX UPGRADE nha, có gì anh f5 lại
  [09:55] anhttl: anh Kiet Nguyen ui, check trong code giúp em có cái gọi là Similarity ko, với có phân biệt PREVIOUS occurence vs. ACTIVE
  [09:58] kietnht: Anh Trinh: e thấy cái similalrity đó ở đau
  [09:59] anhttl: em đang đọc task mới, thấy nói tới nhưng em cũng ko thấy trong app bao giờ. ý nó nói là trong Similarity feature là sẽ d
  [10:04] anhttl: Nói chung em đang đọc task liên quan tới Occurences á, đại khái là khi mở investigation thì sẽ show các Occurence phân l
  [10:11] anhttl: mình cũng cần biết là dựa vào field gì để phân biệt đc 3 loại đó
  [10:16] kietnht: similarity đang thấy ko có á, chắc nó là 1 thứ để define màu thôi
  [10:16] anhttl: oki, anh coi thử ý này thử coi giờ đã có sẵn chưa, em nghĩ chắc chưa luôn
  [10:49] kietnht: Thấy có mỗi cái type 1 là có rồi, mấy cái còn lại chưa
  [10:50] anhttl: ok anh coi cách làm luôn nha, để cbi est
  [11:43] kietnht: Anh Trinh: scope lơn ko, chắc đưa a full luôn đi
  [11:43] kietnht: đang có plan est mà ddugns ko
  [11:43] kietnht: hay còn đợi gì nữa ko á
  [11:44] anhttl: PP-Occurrences Layer-160826-103727.pdf
  [11:44] anhttl: bả cũng chưa có design nữa :'> mình mở ra làm BE trước á
  [11:45] anhttl: mà ý chính cũng là làm sao phân biệt được 3 cái này thôi, còn lại nó khó ở FE
  [11:45] anhttl: anh có time xuống chỗ em tí nhe
  [11:46] kietnht: hình như data có sẵn rồi
  [11:46] kietnht: chắc viết thêm query dựa vào cái điều kiện của bả thôi
  [11:46] kietnht: a mới xuống cái chát á :v
  [11:46] kietnht: chắc đầu giờ chiều đi
  [11:47] anhttl: là field có sẵn rồi, giờ mình đưa ddkien thui đúng ko :v vậy anh nhìn mấy field có sẵn anh hình dùng đc công thức chưa
  [11:47] anhttl: * là field có sẵn rồi, giờ mình đưa ddkien thui đúng ko :v vậy anh nhìn mấy field có sẵn anh hình dung đc công thức chưa
  [11:48] kietnht: cần coi thêm á, hình dung chắc cỡ 30%
  [11:48] kietnht: mà cái này FE show list thôi đúng ko á
  [11:49] anhttl: image.png
  [11:49] anhttl: show kiểu kiểu v nè anh
  [11:49] anhttl: mỗi cái đường như vậy là đại diện cho occurence
  [11:50] anhttl: tụi nó sẽ khác nhau ở: + độ dày --> type 1 2 3 + màu --> valueable hay ko
  [11:51] anhttl: design này em gen dựa trên quy tắc của mấy Layers có sẵn nha (Process spilt, Exclude filters đồ á)
  [11:51] anhttl: oki anh, có gì anh coi thử
  [13:38] kietnht: Anh Trinh: cái layers menu đó coi chỗ nào á
  [13:39] anhttl: Anh vô investigation của 1 alert nào đó, rồi vào đây
  [13:39] anhttl: image.png
  [13:40] anhttl: chỗ này nó có enable hay ko là tùy thuộc vào mình có tạo layer áp dụng cho alert đó hay ko, tạo trong Advanced Tools
  [14:02] anhttl: Nhưng với cái Occcurence thì nó show là dựa trên bản chất của alert đó có occurence hay ko, chứ ko cần tạo trước như pro

### Kunal - Fountain — 74 messages
  [08:23] datnt: Vu Tat khi nào anh tiện anh review giúp em cục PR này nha https://trello.com/c/lbWnX6N0/2870-infinity-order-flow-updates
  [09:32] trinhmtt: https://trello.com/c/TEgLelYY/2913-infinity-custom-printed-gift-item Hung Pham Phat Le card này test tới đâu roi ạ [thread: 3 replies]
    └ [09:47] hungpn: xong rồi á Trinh Mai
    └ [09:47] hungpn: anh nhớ có báo rồi mà hì
    └ [09:59] vitht: Vậy để e báo ổng
  [10:02] trinhmtt: https://trello.com/c/IiBUGzVE/3021-account-scoped-products-pinned-ready-to-ship-gifts-private-build-a-box-items Hung Pha [thread: 8 replies]
    └ [10:11] hungpn: okie em🤝
    └ [10:13] datnt: Hung Pham anh ơi, em mới test lại admin create user gift boxes á anh vẫn up ảnh kèm lúc create lên đ
    └ [11:24] hungpn: okie em
    └ [11:53] datnt: Hung Pham em fix hết lên beta rồi nha anh  - admin lỗi khi create user gift boxes  - coppy link URL 
    └ [15:52] hungpn: anh chec k1 vòng ổn rồi á Trinh Mai ơi
    └ [15:59] trinhmtt: anh mới check gift thui chứ chưa check build a box đúng k anh
    └ [16:08] hungpn: đúng rồi, check theo yêu càua của em lúc sáng á
    └ [16:15] trinhmtt: v anh chekv luon cái   build a box luon nha anh
  [11:04] phatdlt: https://trello.com/c/Zdd0nsTn/2962-infinity-blog Thinh Tran E đẩy ticket đi r nha a [thread: 1 reply]
    └ [11:04] thinht: thanks e
  [11:49] vitht: Card này lên BETA rồi nha mn ơi  https://trello.com/c/bZeOHilO/3026-fountain-build-a-box-add-box-summary-empty-state-and
  [11:53] datnt: * Hung Pham em fix hết lên beta rồi nha anh cc: Trinh Mai  - admin lỗi khi create user gift boxes - coppy link URL của b
  [13:19] datnt: * Hung Pham em fix hết lên beta rồi nha anh cc: Trinh Mai - admin lỗi khi create user gift boxes - coppy link URL của bu
  [13:28] thinht: cho a xin ticket nha Trinh Mai [thread: 2 replies]
    └ [13:34] trinhmtt: anh ngó card này nha
    └ [13:34] trinhmtt: https://trello.com/c/37XQvT4c/3035-implement-smart-hybrid-product-search
  [13:41] trinhmtt: Thinh Tran: Vi Tran Dat Nguyen remind mn lúc log tags add tag giúp em nha, [thread: 8 replies]
    └ [13:42] vitht: thêm tag 3023 giúp c nha
    └ [13:43] trinhmtt: done nha chị
    └ [13:43] thinht: 3035 luôn nha e
    └ [13:44] datnt: chị ơi giúp em 3021, 3031, 2380 nha
    └ [13:45] vitht: e đợi c Trinh mở lời hay sao dị Dat Nguyen
    └ [13:45] vitht: =))
    └ [13:45] datnt: em khong hỉu cái cơ chế này :))
    └ [13:45] trinhmtt: done nhé mn
  [13:41] trinhmtt: * Thinh Tran: Vi Tran Dat Nguyen remind mn lúc log tasks add tag giúp em nha,
  [14:06] hungpn: có ai đổi mk của mailtrap k cả nahf [thread: 7 replies]
    └ [14:08] datnt: em vẫn login vô đc bth á anh
    └ [14:10] hungpn: gửi anh cái mã code nha  Dat Nguyen
    └ [14:11] datnt: 836710
    └ [14:11] datnt: Hung Pham ddaay nha anh
    └ [14:11] hungpn: code này dc nè
    └ [14:11] hungpn: vậy là code anh bị sai hả ta
    └ [14:12] vitht: nhìu khi cái authenticate bị lag á
  [14:16] hungpn: image.png
  [14:17] hungpn: Trinh Mai: case này mình sẽ xử sao em nhỉ/> nếu user đang login mà bị hét hạn xong đá ra kkhỏi tài khoản nè, checkout as
  [14:20] datnt: Card này lên beta rồi nha 2 anh Phat Le Hung Pham, có gì anh 2 QC giúp em nha https://trello.com/c/HnI9nrhN/3031-infinit
  [14:22] trinhmtt: check out as guest sao thấy đc cái user gift đc á [thread: 1 reply]
    └ [14:33] hungpn: để anh kiếm cái case đó nè
  [14:30] hungpn: image.png
  [14:31] hungpn: có ai check dùm anh cái này xíu, trên Fountains có email này hok nhỉ?
  [14:49] vitht: mail này là sao mà có dị a
  [15:14] hungpn: thì anh fill bên thằng nhận hàng của Infinity á
  [15:14] hungpn: * thì anh fill bên thằng nhận gìtdrop của Infinity á
  [15:14] hungpn: nhưng bên Kunal anh k thấy email này
  [15:28] thinht: https://trello.com/c/37XQvT4c/3035-implement-smart-hybrid-product-search Vu Tat  theo như desc trong ticket thì có vẻ ổn [thread: 2 replies]
    └ [15:28] thinht: Screenshot from 2026-08-19 15-09-00.png
    └ [15:28] thinht: Screenshot from 2026-08-19 15-16-38.png
  [15:28] vitht: E check thì thấy bên Fountain có cái mail đó mà nó không gửi đi nha. Cái này cần check lại. Check sidekiq thì thấy vẫn đ [thread: 2 replies]
    └ [15:31] hungpn: check thuwr dumf anh sao nos k guiwr nha
    └ [16:07] vitht: Dạ để e xong task này e qua coi thử
  [15:31] hungpn: * check thử dùm anh xem sao nó k gửi nha
  [15:55] hungpn: image.png
  [15:55] hungpn: cái này setting chỗ nào á nhỉ?
  [15:55] hungpn: * anh chec k1 vòng bên Shop All ổn rồi á Trinh Mai ơi
  [16:07] vitht: setting gì dợ a Hùng
  [16:07] hungpn: cái text ngay chỗ What's included ak
  [16:08] vitht: À cái đó có 2 chỗ á a
  [16:09] vitht: a đợi e tí
  [16:10] vitht: Screenshot 2026-08-19 at 4.10.08 pm.png
  [16:10] vitht: một là cái chỗ Toggle what's included substitution
  [16:11] vitht: hai là nếu không có toggle thì nó lấy name của mấy cái custom box a gắn dô gift á
  [16:47] hungpn: https://trello.com/c/oHJ5YO8y/2380-finding-solution-to-customers-receiving-incorrect-delivery-dates-in-the-delivery-tab-
  [16:47] datnt: em đang apply nốt cho infinity á anh
  [16:47] datnt: sẵn em handle từ đầu fix cái dụ thứ 6 kia sao
  [16:48] hungpn: https://trello.com/c/TEgLelYY/2913-infinity-custom-printed-gift-item =---- ổng có comment á nè
  [16:53] hungpn: https://trello.com/c/yrbbFhf9/2735-fountain-pro-send-smart-link --- Phat Le ơi, oognr báo bug gì cho smartlink nè
  [16:54] vitht: e đang kêu Phát check lại rồi á a

### Maddy - Extreme Soft Solutions — 3 messages
  [10:16] duongdn: Hi, can u confirm the testing steps for 409?
  [10:17] duongdn: Có msg Long Vo
  [10:17] longvv: Ok a

### NUS - Bailey - Paturevision 2026 — 36 messages
  [10:32] tuannt: có tính năng bị thiếu a Duong Doan nên est sẽ bị lố e cần check xem tính năng đó như nào mới biết lố bao nhiều time đc
  [10:34] duongdn: ???
  [10:34] duongdn: sao bây giờ mới phát hiện?
  [10:34] duongdn: tính năng nào vậy
  [10:34] tuannt: grazing software. QC mới báo thiếu tính năng setup map
  [10:35] duongdn: này có trong WBS ko, sao thiếu hẳn luôn à?
  [10:35] duongdn: Dat Nguyen:  ?
  [10:36] datnc: image.png
  [10:36] datnc: Có nha mn. Cơ mà nó chỉ là cái btn để nav qua flow onboarding thui mà nhỉ?
  [10:36] datnc: Cho 1 case cụ thể. Này chắc handle nhanh mà nhỉ a Tuan Nguyen ?
  [10:36] tuannt: k rõ cái này nó thế nào
  [10:38] tuannt: Show Set up button quan trọng khi click vào nó sẽ làm gì
  [10:39] duongdn: mn xem discuss thử, chỉ có 2 đường thôi - 1: tự fix bên ngoài - 2: nếu tính năng lớn bị miss, xem nguyên nhân từ đâu, sa
  [10:39] datnc: A mở cái file design mockup của e nha row trên cùng có cái onboarding flow ấy. Click vào nó đá qua đó thui a.
  [10:39] datnc: Qua e transfer cho.
  [10:40] datnc: Cái flow đó có sẵn rồi, nên a nav qua là đc.
  [11:11] duongdn: chốt sao mn ơi
  [11:19] tuannt: chac tu fix thoi chu anh
  [11:20] duongdn: OK, thank mn khi nào internal release vậy Dat Nguyen
  [11:22] datnc: Theo plan ban đầu là hôm nay nha a, nếu QC test lại OK thì sẽ release staging trong tuần này mai hoặc mốt cho bác.
  [11:24] duongdn: ngon lany2
  [11:24] duongdn: * ngon lanh2
  [11:24] duongdn: * ngon lành
  [15:34] datnc: > another question is can just use domain and point our new website to it ? or do we have to open a hosting account ? @A
  [15:35] tuannt: trỏ được
  [15:35] datnc: Capture d’écran 2026-08-18 à 15.12.01.png
  [15:36] datnc: Vậy a cầm acc Nick rep bác nha cái ở trên với cái này nữa. > is it possible to know how much one website resources is us
  [15:36] datnc: Nhớ research cho kỹ nha a.
  [15:38] tuannt: cái này check được chư sao k
  [15:38] tuannt: server bth là check dc thoi
  [15:39] tuannt: mà a có thấy tin nhắn nào đâu ??
  [15:39] tuannt: đưa cái link tin nhắn a xem nào ??
  [15:42] datnc: Nhắn riêng a ơi, nên e mới quote qua đây chứ.
  [15:42] datnc: A rep ở /maint là đc nha.
  [15:43] tuannt: hmm
  [15:47] tuannt: a trả lời r nha

### NUS Technology — 21 messages
  [09:38] trucpdt: 🎂 Happy Birthday Long Vo 🎉
  [09:38] trucpdt: LongVV.png
  [09:41] phucvt: Chúc cậu sinh nhật vui vẻ nha Long Vo 🥳🥳🥳 [thread: 1 reply]
    └ [09:47] longvv: Cảm ơn cháu
  [09:42] lamlq: Chúc anh Long Vo tuổi mới ý nghĩa, nhiều niềm vui 🎉
  [09:43] duongdn: chúc mừng sinh nhật em Long Vo  p/s: đặt bàn chưa em :D
  [09:44] vitht: Chúc mừng sinh nhật e nha Long Vo , chúc e tuổi mới nhiều may mắn, niềm vui và mau lấy Vợ nhé 💗🎂💗
  [09:47] thihv: Chúc mừng sinh nhật nhé Long Vo 🍻🍻🍻
  [09:47] tuantt: Chúc mừng sinh nhật Long Vo 💪💪💪
  [09:47] longvv: * Cảm ơn cháu nhe
  [09:48] duyvna: Chúc mừng sinh nhật Long Vo:  🎂 Chúc Long luôn hạnh phúc bên người mình thương, sự nghiệp vững vàng, đủ sức gánh vác gi [thread: 3 replies]
    └ [09:52] longvv: Em cảm ơn anh guộc nhe
    └ [09:53] vitht: sao không cùng nhau chia sẻ gánh nặng mà phải mạnh mẽ vượt qua dị a Duy Vo
    └ [10:11] duyvna: Long Vo: e trl dùm a câu này nha
  [09:51] longvv: Dạ em cảm ơn mọi người, chúc mọi người một ngày làm việc thiệt là vui vẻ ạ 🫶🫶🫶
  [09:57] khanhhh: Chúc mừng sinh nhật e Long Vo 🥳
  [10:18] dongnv: Chúc mừng sinh nhật Long Vo nhaaa 🎉🍻
  [10:19] uyenvhp: Chúc mừng sinh nhật anh Long Vo nhaa 🎂🎉
  [10:22] lenh: Chúc mừng sinh nhật Long Vo nha 🎉🎉🎂🎂🍻🍻
  [14:24] hangdtt: Chúc mừng bạn TuanTT đã chính thức trở thành BA Trainer! 🎉 Mọi người cùng gửi lời chúc mừng đến Tuan To  nhé! Chúc Tuấn
  [16:10] cuongnh: Nhóm Thiện nguyện NUS **chân thành cảm ơn anh Năm, bạn ThoTNT, HungTK, VyNL, DongNV** đã chung tay ủng hộ ctrinh thiện n

### Rory Hackett - BXR App — 11 messages
  [09:38] minhtv: ổng có nhắn nhé
  [09:53] lenh: Khoa Tran: ơi, cái vụ OAuth mobile app trên iOS và Android sau khi bỏ webview để dùng system browser thì giờ đều không c
  [09:54] khoatd: không còn dùng nữa anh, redirect trực tiếp về app
  [09:55] khoatd: mà bản đó chưa release nha
  [09:55] khoatd: nên hiện tại vẫn còn dùng đó
  [09:56] lenh: ok
  [10:06] lenh: Đã reply message của Simon
  [14:32] minhtv: ổng nhắn ổng online ko thấy hay sao thế Khoa ơi ?
  [14:32] khoatd: không anh :))
  [14:36] minhtv: phải cài đặt thông báo chứ 🤪
  [14:36] khoatd: có bật mà, chắc ổng nhắn lúc đang đi lấy nước hay sao nên bị trôi

### Senior Devs — 7 messages
  [09:20] namtv: Nhớ tiến hành nha anh em
  [09:26] duongdn: ui có gì nhầm ko, trong sheet hiện tại chỉ có mấy dev và đều đang assign cho ThinhLD
  [09:27] kietnvt: chắc filter đó a, tắt đi là đc
  [09:29] namtv: Ai cần filter thì dùng filter view nha
  [09:29] namtv: Screenshot 2026-08-19 at 9.28.58 AM.png
  [09:29] namtv: Dùng nó thì sẽ ko ảnh hưởng tới view chung
  [13:24] thinhld: à hôm qua e filter xong quên sửa, sorry mng 🙏

### Technology Department — 2 messages
  [08:35] duongdn: Hi mn Mình xin phép remind techtalk chiều nay nha :)  3L - 5:30 PM :)
  [17:27] duongdn: Techtalk nha mn, mình đã sẵn sàng :D Đừng đề mình cô đơn 🥲🥲

### Training — 4 messages
  [14:26] hangdtt: Welcome Tuan To  nhé 🎉 Chào mừng thành viên mới của team Trainer!
  [14:26] chientx: Welcome Tuấn
  [14:27] anhnvn: Welcome Tuấn nha
  [14:45] duongdn: welcome Tuan To :)
