# Matrix — since 2026-09-15 00:00 +07:00

### !1Mj0Tuln0RXxoeekHKLJwbuIjCN0UaWsMfFHFAZ_wdA — 390 messages
  [14:17] duongdn: Coi msg nha Long Vo
  [14:19] longvv: này bữa mình làm cho ổng r, chừa lại cái upgrade framework + PHP version ra
  [14:26] longvv: Duong Doan: vụ upgrade framework e có suggest trong Claude, giờ start chắc mình nhắn vầy nha a, e ko có kinh nghiệm tron
  [14:27] longvv: * Duong Doan: vụ upgrade framework e có suggest trong Claude, giờ chắc mình nhắn vầy nha a, e ko có kinh nghiệm trong vi
  [14:28] duongdn: uhm
  [16:45] duongdn: Có msg nha em
  [16:45] duongdn: Em có đủ time để làm nó ko
  [16:45] duongdn: thấy có vẻ cũng nhiều à
  [16:46] longvv: Chắc mai quá a, e đang kẹt bên ohcleo
  [16:47] duongdn: ok, nhưng scope lớn ko, và e có đủ ko, để a biết có thể sắp xếp thêm dev cho em
  [16:47] duongdn: ví dụ PhucVY
  [16:47] duongdn: * ví dụ PhucVT
  [16:47] longvv: Phần upgrade framework chắc chắn là lớn r á
  [16:48] longvv: Đủ thì e ko chắc á, chắc sắp xếp thêm PhucVT vô nha a
  [16:49] duongdn: OK
  [16:54] duongdn: Phuc Vo:  Thấy loay hoay bên Bailey quá, thôi chắc dừng đi, qua đây phụ Long làm nè
  [16:54] duongdn: bên này đang có nhiều task
  [16:55] duongdn: Long Vo:  quăng cái James cho Phúc setup, start luôn phần ugrade Em lo mấy cái linh tinh trước, ok thì quay lại làm chun
  [16:57] longvv: https://gitlab.com/nuscarrick/definitive-guide
  [16:57] longvv: clone source về trc đi fen
  [17:22] longvv: https://drive.google.com/file/d/1T2tBihnSVg1ELcZUJYVAn8_QA4ZRkdwB/view?usp=sharing
  [17:22] longvv: Phuc Vo: db dump nha fen ơi
  [17:29] longvv: image.png
  [17:30] longvv: Phuc Vo: Trc khi làm cái upgrade thì m lên plan upgrade cho ổng coi, r check cái Mailjet xem nó bị bỏ hoàn toàn khỏi cod
  [17:30] longvv: Có 2 nhánh staging2 production
  [17:30] longvv: chủ yếu làm trên 2 nhánh này
  [21:11] phucvt: DB đúng ko z fen? Tải về mở file thì thấy db name là exceltestzone
  [08:33] duongdn: sai chắc rồi, lên staging lấy đi
  [08:49] longvv: https://drive.google.com/file/d/1V10iqvr8258hYdIOCMhA6OVTmqGm7SKB/view?usp=sharing
  [08:50] phucvt: > A small day to day issue can you email me the sign up links for Volkan Denli and Josh Roberts at Knight Frank, their I
  [08:51] phucvt: Long Vo:  Hỏi AI thì nó nói tạo lấy link License Invitation cho 2 user ổng gửi đúng ko fen
  [08:51] phucvt: https://definitiveguide.co.uk/accept/{token}?email={email}.
  [08:51] longvv: uh
  [08:51] longvv: b có ssh lên live ko
  [08:52] phucvt: Ko có, có ai gửi đâu
  [08:52] longvv: Host www.definitiveguide.co.uk   HostName 178.62.37.201   User deployer   IdentityFile ~/.ssh/keys/carrick Host staging.
  [08:52] phucvt: Ok đưa key luôn
  [08:55] longvv: carrick
  [09:01] duongdn: Nhớ daily report progress cho cus nha mn
  [09:01] duongdn: Phuc Vo:  có Slack chưa?
  [09:02] phucvt: Có vô Slack rồi anh
  [09:02] phucvt: Mà hôm qua có ai làm gì ko? Em thì mới setup à
  [09:04] phucvt: Em đang làm cái này cho ổng
  [10:11] phucvt: Đã done cho ổng, đang xem vụ mailgun & mailjet gì đó
  [10:11] phucvt: * Đã done và báo ổng, đang xem vụ mailgun & mailjet gì đó
  [11:16] phucvt: Hi anh Khanh Ho, anh có nhớ hồi đó tại bên này ổng chuyển sang dùng Mailjet không anh? Hay lý do tại sao đang dùng Mailj
  [11:20] khanhhh: > <@phucvt:nustechnology.com> Hi anh Khanh Ho, anh có nhớ hồi đó tại bên này ổng chuyển sang dùng Mailjet không anh? Hay
  [11:20] phucvt: Ok thanks anh
  [11:33] phucvt: ```Regarding the Mailjet and Mailgun, As you may recall, we previously addressed the issue of reaching 50% of the messag
  [11:33] phucvt: Long Vo: Review giúp xem có thông tin nào không đúng ko, để t gửi cus
  [11:36] longvv: ``` Yes, we’ve reviewed the current Mailjet and Mailgun setup. The issue around reaching 50% of the Mailgun message limi
  [11:36] longvv: Nhắn z đi fen
  [16:20] phucvt: upgrade-roadmap.html
  [16:23] phucvt: Duong Doan Em có investigate và tạo ra cái upgrade roadmap này. Anh xem qua giúp em xem có vấn đề gì ko nha anh. Về các 
  [16:23] phucvt: Long Vo ngó qua thử luôn fen
  [16:23] phucvt: * Duong Doan Em có investigate và tạo ra cái upgrade roadmap này. Anh xem qua giúp em xem có vấn đề gì ko nha anh. Về cá
  [16:26] duongdn: Cus yêu cầu à?
  [16:26] duongdn: này thuần tech, ổng ko hiểu lắm đâu
  [16:27] duongdn: est thì nhớ nói là rough estimate, mình sẽ daily report progress,  và % done
  [16:28] longvv: Làm cái claude artifact format lại non-tech cho ổng dễ đọc
  [16:29] phucvt: Ok để làm bản non-tech, thấy ổng gửi file Claude tưởng ổng biết tech :)
  [16:29] phucvt: Đúng á anh. Mình có nói sẽ gửi ổng bản roadmap để ổng review
  [16:30] phucvt: À ko hẳn là ổng yêu cầu roadmap, mà mình suggest trước do cái này long term
  [16:30] duongdn: hơi lạ, sao lại gởi review trong khi đã approve làm rồi ta
  [16:30] duongdn: anyway, cứ như trên
  [16:31] phucvt: Vậy giờ cũng gửi ổng roadmap để ổng nắm rồi mình start luôn
  [16:31] phucvt: Được ko ta
  [16:31] duongdn: ủa hình như ổng chưa approve ...
  [16:32] duongdn: msg mình nói là gởi road map cho ổng approve rồi start
  [16:32] duongdn: èo mêt ghê
  [16:32] duongdn: vậy làm rồi gởi đi
  [16:32] duongdn: est:  nói rõ rough est nha, này cực kì quan trọng
  [16:33] longvv: Nói ổng luôn lợi ích khi upgrade lên là được gì luoon
  [16:33] longvv: quan trọng lun á
  [16:33] phucvt: Ok để đề cập vô roadmap luôn
  [17:05] phucvt: Đã gửi roadmap cho ổng trên Slack https://claude.ai/artifact/7wTHv5o8KvuTotZRxvnYdq
  [08:58] phucvt: Duong Doan Bên này chưa thấy ổng reply mình trên Slack. Em gửi mail nhắc ổng được không anh? Do Long nói ổng hay check m
  [08:59] longvv: ông check mail lẹ lắm
  [08:59] longvv: Slack kênh mới nên ổng chưa quen
  [08:59] duongdn: ok nha, nhớ remind ổng check Slack thường xuyên
  [11:22] phucvt: Em có dùng AI check thì thấy có một số CRITICAL issues. Em cũng có thử double check lại 1 cái trong số đó là "Anonymous 
  [11:22] phucvt: Mấy cái này có cần ổng approve không? Hay mình xử lý luôn
  [11:22] longvv: báo ổng r mình làm luôn
  [11:22] longvv: urgent cứ làm
  [11:23] duongdn: múc
  [11:23] phucvt: Về phía mình thấy urgent thì xử thôi đúng ko. Còn cái nào k tới mức urgent thì list lại rồi báo ổng nha
  [11:24] longvv: ừa
  [11:24] phucvt: Nói chung là báo theo các mức độ, cái nào critical thì xử luôn
  [11:25] duongdn: cũng tùy, nhưng dạng dạng vậy
  [11:28] phucvt: Long Vo Mấy cái trong audit mà báo ổng đã xử lý, T chưa thấy fen deploy lên production, có lý do gì ko fen? Hay có cần đ
  [11:28] longvv: bữa đưa ổng test
  [11:29] longvv: * bữa đưa ổng test  trên staging
  [11:29] longvv: ổng k nói gì chắc làm nốt cái kia r deploy lên luôn
  [11:29] longvv: h làm như này nè
  [11:29] longvv: checkout từ production làm
  [11:29] longvv: xong cherry-pick qua staging2 để deploy lên staging
  [11:30] longvv: giống ohcleo
  [11:31] longvv: Chắc sau này clean lại branch, cho nhánh staging với nhánh production nó ko bị chênh nhau quá fen ơi
  [11:31] longvv: sau này dễ upgrade hơn
  [11:32] longvv: t thấy cái nhánh production nó bị outdated với staging2 lắm
  [11:33] duongdn: a thì nghĩ nên tạo 1 cái staging branch mới, checkout từ production, để làm các thứ hiện tại, deploy lên, ổng approve cá
  [11:33] duongdn: chứ effort sync staging/live giờ nhiều à
  [11:34] phucvt: Em cũng nghĩ như a Dương. Cái này lâu rồi mới quay lại, nên staging cũ thì "cho vô quá khứ" đi
  [11:34] phucvt: Quan tâm production hiện tại đang chạy lâu nay thui
  [11:35] phucvt: * Em cũng nghĩ như a Dương. Cái project này lâu rồi mới quay lại, nên staging cũ thì "cho vô quá khứ" đi
  [11:35] longvv: nào ổng duyệt r mình làm lúc luôn
  [11:35] longvv: Con AI nó estimate ác hơn người estimate nữa 🤣, approve r thì chắc cũng dư time
  [11:36] phucvt: T nghĩ giờ nên làm nhánh staging mới luôn. Để có thể merge branch qua lại. Chứ như hiện tại là phải cherry pick các comm
  [11:37] phucvt: Để lâu càng nguy cơ miss nhiều nữa
  [11:38] duongdn: uhm múc đi
  [13:23] phucvt: Ổng có rep rồi nha. Ổng ok vụ chuyển sang dùng Mailjet và upgrade roadmap rồi
  [13:23] phucvt: Múc thui
  [13:23] longvv: quao
  [13:24] phucvt: Đúng là gửi mail cái check liền
  [13:27] duongdn: múc
  [17:37] phucvt: security-audit-business.html
  [17:38] phucvt: Long Vo: Tạo giùm cái link artifact với. Để gửi report các issues mình tìm thấy cho ổng
  [21:03] longvv: https://claude.ai/artifact/MdVbc6TqMA4mHMADiYmBeN
  [10:56] longvv: Phuc Vo: cần phụ gì bên này ko b
  [10:57] phucvt: Mấy bên kia hết task hả. T đang full bên này, nếu chia task ra làm thì có
  [10:58] phucvt: Duong Doan Có làm 2 dev song song được ko á anh?
  [10:58] longvv: bên ohcleo mai mới làm
  [10:59] duongdn: được
  [10:59] phucvt: Ok anh
  [11:00] phucvt: Long Vo: Xử lý mấy cái critial - fix now nha
  [11:00] longvv: ok fen
  [11:01] phucvt: Tạo nhánh từ production rồi làm nha
  [11:02] phucvt: Do cái này hôm trước audit trên staging2, nên có thể một số cái không tìm thấy trên production đó. Có gì lúc làm, cái nà
  [11:02] phucvt: Tránh silent skip
  [14:14] duongdn: Cho a xin lại link github james
  [14:14] longvv: https://gitlab.com/nuscarrick/definitive-guide e gui
  [15:29] phucvt: > Lots of work for you to do here to get this platform production hard before we can make a dent in the UI and data side
  [15:31] duongdn: bỏ vô Asana :)
  [15:37] longvv: cho ổng clean asana board lại, task nào outdated thì nhờ ổng archive nó đi
  [15:37] longvv: đưa vô to do hết sau này mình track lại từ đầu
  [16:54] phucvt: Ok, đã note vô Asana. Chắc để ổng xong vụ check email templates changes, xong nhờ ổng vô clean Asana, chắc mình cũng ove
  [08:43] phucvt: Hi anh. Nay em có xíu việc cá nhân, nên em lên cty trễ 1h nha
  [08:44] duongdn: ok e
  [14:14] phucvt: image.png
  [14:27] phucvt: Có ai rành thằng Mailjet này ko mn, biết sao nó suspend không cho gửi mail nữa ko? Em có check theo learn more của nó mà
  [14:28] longvv: mới đây thì chắc phải kêu ổng liên hệ bên mailjet ấy
  [14:36] phucvt: Chắc để hỏi ổng coi có nhận được mail gì ko
  [14:43] duongdn: theo thông thường mình phải liên hệ mailjet để gỡ ra ...
  [14:43] duongdn: bên Mailchimp cung4 vây
  [14:43] duongdn: do email mìn phạm quá nhiều validation
  [14:45] phucvt: Em có check cái document trên thì k thấy đang vi phạm gì để cải thiện á anh
  [14:46] phucvt: Cái này mình liên hệ được không anh? Hay phải nhờ ổng liên hệ
  [14:46] duongdn: ko biết, vô trong account tìm chỗ liên hệ support thôi
  [14:50] phucvt: Em thấy có chỗ open ticket, mà thấy kêu support trong 24 tiếng lận. Mà giờ mail đang ko gửi được, chắc để e report ổng x
  [14:00] longvv: Phuc Vo: bữa làm tới đâu r fen
  [14:00] phucvt: Mới hỏi hồi sáng
  [14:01] phucvt: Cũng giống hồi sáng report fen á. Nay chưa làm gì
  [14:01] longvv: Ko nhớ lắm, fen nhắc lại trên này dc ko
  [14:04] duongdn: hai đứa mài nc với nhao đi
  [14:04] duongdn: chat gì khi ngồi bên cnah5
  [14:04] duongdn: :))
  [14:04] duongdn: nhìn mắc cười quá
  [14:04] phucvt: Em tưởng nó cần cho a dương aware á ⚠️
  [14:04] duongdn: y như cặp đôi yêu đương giận nhau :v
  [14:04] phucvt: Giống nghỉ ngơi, nghỉ nói chuyện rồi anh
  [14:05] duongdn: a cần các thông tin general thôi
  [14:05] duongdn: còn chi tiết task thì ko cần :)
  [14:05] phucvt: - Vụ Mailjet bị suspend, đã gửi ticket bên Mailjet team, nó đã tiếp nhận nhưng chưa xử lý, đã report cho cus để nhờ supp
  [14:05] phucvt: Long Vo:
  [14:05] longvv: ok
  [14:16] phucvt: Coi thêm message trên Slack, có report đầy đủ hằng ngày cho cus lun
  [14:40] phucvt: handoff-2026-09-29.zip
  [14:41] phucvt: Long Vo:  Nâng cấp Definitive Guide (Laravel 5.8 → 13). - Code: nhánh upgrade/integration trên GitLab. Bắt đầu đọc từ do
  [14:52] phucvt: Long Vo: Có branch upgrade/claude-config, chứa các config liên quan đến Claude.md, hooks, skill review-mr. - Checkout br
  [14:40] phucvt: Long Vo: Ổng có nhắn bên Slack nha fen
  [15:01] longvv: image.png
  [15:01] longvv: Phuc Vo: giúp t rep ổng phần này
  [15:03] phucvt: Ok để t rep
  [15:06] phucvt: Đã rep nha. Fen nhớ rep ổng câu này: "Are you happy with how everything else is going?"
  [09:32] longvv: Duong Doan: Carrick có bitwarden Digitalocean ko á a
  [09:32] longvv: có thì e nhờ a share giúp e
  [09:35] longvv: e xin a Năm rùi nha
  [09:36] duongdn: oh
  [13:33] duongdn: qua đây làm đỡ nha Tuan Nguyen
  [13:38] tuannt: ok a
  [13:39] tuannt: setup bên này như nào đó cho a info nha
  [13:39] longvv: Bên này e đang migrate data prod qua staging, nên h chưa làm dc gì, phải đợi làm xong r e mới chia task dc
  [13:39] longvv: a Tuấn setup trc nha
  [13:40] longvv: https://gitlab.com/nuscarrick/definitive-guide
  [13:40] duongdn: có cục upgrade PHP/Larave thôi
  [13:40] duongdn: discuss chia nhau làm xem
  [13:45] longvv: https://drive.google.com/file/d/1V10iqvr8258hYdIOCMhA6OVTmqGm7SKB/view?usp=sharing db dump nha a
  [13:52] phucvt: Long Vo Nhớ hỏi ổng vụ Mailjet xem bên kia có active lại cho mình chưa nha. Nếu đã active lại thì update lại để chuyển s
  [10:53] phucvt: Long Vo Hú, có gì sắp xếp transfer cho t bên này. Để t qua làm nha, dự kiến đầu giờ chiều nay qua
  [10:53] phucvt: * Long Vo Hú, có gì sắp xếp transfer cho t bên này để t qua làm nha, dự kiến đầu giờ chiều nay qua
  [10:54] duongdn: vậy sớm nha, chiều Long off ấy
  [10:54] phucvt: Ok anh. Hên quá có dự trù trước
  [10:55] phucvt: Có update nhiều k fen, t qua cho lẹ
  [10:55] longvv: qua t đi cho lẹ
  [10:57] longvv: upgrade/cp1-laravel10  => đang upgrade dở Laravel 10
  [10:57] longvv: Vơi đang setup docker cho staging chạy Laravel 10
  [10:58] duongdn: cái này bữa proposal 6 tuần, mình đi tới đâu rồi, đang tuần mấy, đúng tiến độ ko?
  [11:03] longvv: mình đang tuần 3 á
  [11:03] longvv: Mình đang đúng tiến độ nha a
  [11:04] longvv: image.png
  [11:04] longvv: Phuc Vo: Bữa chạy giưũa chừng nó bị ngắt
  [11:04] longvv: Với db này là db live nha Phúc, có clone qua staging
  [11:05] longvv: * Với db này là db live nha Phúc, t có clone qua staging để mình check
  [11:09] phucvt: Có sửa mấy thông tin liên quan đến khách hàng chưa fen? Để tránh nó chạy gửi mail hay làm gì linh tinh. Hoặc nhanh nhất 
  [11:10] longvv: r fen
  [11:10] longvv: cho nó ẩn danh hết r
  [11:10] longvv: mấy thông tin để gửi mail t cũng đổi qua fake emaiil hết r
  [11:10] phucvt: Ok, mà chắc test thì dùng mail config cho test luôn, để tránh nó gửi lung tung làm ảnh hưởng reputation của sender
  [11:13] longvv: Giờ b làm sao để con staging mình nó chạy ngon nghẻ ở Laravel 10 là ok
  [11:14] longvv: sau đó upgrade lên 11-12 rồi 13
  [11:14] longvv: t nhớ là 11 nó có thay đổi cấu trúc
  [11:15] phucvt: Ừa, cho AI nó đọc changes note rồi update thui
  [09:27] tuannt: Hi mn, a qua đây làm 1 chút nha
  [09:31] tuannt: Duong Doan: a ơi share e gitlab bên này nhé a
  [09:33] longvv: a xin a Năm share carrick gitlab nha
  [09:44] tuannt: Long Vo: Phuc Vo cho a docker compose vs dockerfile của e. Bên a pull về chạy báo lỗi hoài
  [09:45] phucvt: Lỗi gì á anh, gửi lên xem thử
  [09:46] tuannt: lỗi phpmyadmin:5.0
  [09:47] longvv: a checkout từ đâu á
  [09:47] tuannt: production
  [09:47] longvv: a prompt cho con AI setup nha
  [09:48] longvv: nó làm a-z cho a hết
  [09:48] longvv: bữa tụi e cũng cho nó seutp
  [09:48] longvv: cái dự án này hơi khó, setup bằng tay thì mất nguyên ngày luôn đó
  [09:48] tuannt: ok vậy a thử fix xem
  [10:20] tuannt: Long Vo: cho a env em ơi
  [10:26] longvv: .env
  [10:26] longvv: .env.dusk.testing
  [11:44] tuannt: a len dc site r. a lam gi em? nhanh nao
  [11:45] longvv: giờ a checkout qua cái nhánh này đi
  [11:45] longvv: Phuc Vo
  [11:45] longvv: bữa update tới đâu r fen
  [11:46] phucvt: Đã deploy CP1 lên staging-upgrade rồi. Chắc giờ cho a Tuấn vô test đi fen
  [11:46] phucvt: Trong thời gian đó t làm CP2
  [11:47] phucvt: * Đã deploy CP1 lên staging-upgrade rồi. Chắc giờ cho a Tuấn vô test đi fen. Có bug gì thì fix luôn
  [12:00] phucvt: Khi test thì nhớ kiểm tra lại luôn MAIL_* trong .env của stack để chắc chắn mail không gửi ra ngoài
  [12:48] longvv: https://staging-upgrade.definitiveguide.co.uk/
  [12:55] longvv: * URL: https://staging-upgrade.definitiveguide.co.uk Password for every account: DG-Hy4f6UIiXwrzFI client-owner:  - cp1-
  [12:58] longvv: image.png [thread: 44 replies]
    └ [15:08] phucvt: Long Vo: Cái này lỗi gì đó do load ko đúng code. Mới restart lại Apache để nó load thì vô được r. Th
    └ [15:13] longvv: vo dc r nha
    └ [15:14] phucvt: Okie. Cần test những cái này nha fen
    └ [15:14] phucvt: - Đăng ký và mua gói với thẻ test 4242 4242 4242 4242, hạn bất kỳ trong tương lai, CVC bất kỳ.   - K
    └ [15:14] longvv: nhờ a Tuan Nguyen check nha
    └ [15:41] tuannt: Screenshot 2026-10-07 at 15.41.33.png
    └ [15:41] tuannt: lam the nào de a co the vao dc page
    └ [15:42] tuannt: à dc r
    └ [15:42] longvv: a keo xuong duoi cuoi trang
    └ [15:42] longvv: co input nhap pass
    └ [15:42] tuannt: ừ a thấy r
    └ [15:42] longvv: nó là DFlIVE2023
    └ [15:43] tuannt: Screenshot 2026-10-07 at 15.43.51.png
    └ [15:44] tuannt: cái postcode này
    └ [15:44] tuannt: nó có điều kiện hả ?
    └ [15:48] tuannt: thoi a đọc code thấy r
    └ [15:48] longvv: postcode ko nhap bua` dc rui
    └ [15:48] longvv: nhập postcode đúng vs quốc gia
    └ [15:48] tuannt: k dc bừa đâu a check code regex phải đúng mã của Anh dạng The Phone Number field is invalid number.
    └ [15:49] tuannt: EC1A 1BB
    └ [15:52] longvv: a xài Claude đúng ko a Tuấn
    └ [15:52] tuannt: k a k xài claude
    └ [15:52] longvv: oh
    └ [16:05] tuannt: Screenshot 2026-10-07 at 16.05.26.png
    └ [16:06] tuannt: cái nay k xài stripe test mode dúng hem
    └ [16:06] longvv: xài test mode nha a
    └ [16:06] tuannt: đổi key local của anh hả ?
    └ [16:06] longvv: a đổi qua key của nick Carrick
    └ [16:07] longvv: e nhớ có lệnh nó tạo plan bên stripe á
    └ [16:07] longvv: a cho con AI check
    └ [16:07] tuannt: Screenshot 2026-10-07 at 16.07.42.png
    └ [16:08] longvv: a có ssh lên staging dc ko
    └ [16:08] tuannt: staging sử dụng Test mode thoi dung k?
    └ [16:08] longvv: uhm a
    └ [16:08] longvv: test mode thui
    └ [16:14] tuannt: r nha e
    └ [16:16] tuannt: path url laf: /var/www/definitive-guide-staging2 dung k?
    └ [16:16] longvv: `/srv/staging-upgrade`
    └ [16:16] longvv: staging2 là cũ r á
    └ [16:17] tuannt: ok
    └ [16:23] tuannt: cái env file trên staging nó chưa có gì hả ?
    └ [16:38] longvv: a cd vô app r check thử
    └ [16:55] tuannt: -rwxr-xr-x   1 root     root          0 Oct  2 08:50 .env nè
    └ [16:56] tuannt: k thấy có gì bên trong
  [12:58] longvv: co bug cho a fix r ne Tuan Nguyen
  [12:59] longvv: Register cung chua work
  [12:59] longvv: image.png
  [13:27] tuannt: cai nhanh tren upgrade/cp1-laravel10  ? dung k ?
  [13:30] longvv: dung r a
  [13:55] tuannt: cái env e đưa a lỗi k có API Key provided: sk_test_123
  [13:56] tuannt: k vào dc resgister
  [13:56] longvv: e chưa setup account stripe  mới cho staging nữ
  [13:56] longvv: * e chưa setup account stripe  mới cho staging nữa
  [13:56] longvv: a xài nick Carrick setup giúp e nha
  [13:56] tuannt: ý a local ấy cũng chưa à ?
  [13:56] longvv: uh a
  [13:57] longvv: có gì a cho nó xài chung vs staging
  [14:00] tuannt: stripe  carrick@nustechnology.com cái này cong ty quản lý pass đúng k ?
  [14:00] longvv: dung z
  [14:00] longvv: a xin luon nhe
  [14:01] tuannt: ok
  [14:21] tuannt: Screenshot 2026-10-07 at 14.21.14.png
  [14:21] tuannt: khi a click register nó bay qua login form -> a click register here -> plans là đúng đúng k ?
  [14:21] tuannt: * khi a thử /signin nó bay qua login form -> a click register here -> plans là đúng đúng k ?
  [14:21] longvv: dung r
  [14:21] tuannt: ok de a check tiep
  [14:46] tuannt: hiện cái plans ở local anh có vẻ k work đâu. staging work đúng k?
  [14:47] longvv: sao k work á
  [14:47] longvv: nó bị gì á
  [14:48] tuannt: a k rõ mà theo a check nó dang thiếu compact features_type, list_features
  [14:48] tuannt: local a k work khi a thư thêm thì work và đang đến bước đăng ký
  [14:48] tuannt: Screenshot 2026-10-07 at 14.48.44.png
  [14:48] longvv: chắc e đưa a ssh lên server nha
  [14:49] tuannt: Screenshot 2026-10-07 at 14.48.55.png
  [14:58] longvv: ``` Host staging.definitiveguide.co.uk   HostName 46.101.31.61   User deployer   IdentitiesOnly yes   IdentityFile ~/.ss
  [14:58] longvv: Tuan Nguyen:
  [14:59] longvv: day la ssh key nha a
  [15:49] tuannt: * k dc bừa đâu a check code regex phải đúng mã của Anh
  [15:49] longvv: Phuc Vo: bữa fen chạy lại index chưa
  [15:49] phucvt: Rồi nha
  [17:05] phucvt: Tuan Nguyen Anh report để em gửi cho cus nha
  [17:07] tuannt: - setup project  - check tính năng register, plan
  [17:07] tuannt: * - setup project - check tính năng register, plans
  [17:08] duongdn: setup ko có report nha ...
  [10:13] phucvt: Tuan Nguyen Anh có đang làm tiếp bên này không anh?
  [10:13] phucvt: Em tính deploy lên bản mới rồi test trên đó luôn
  [10:13] tuannt: Chiều a qua nếu bên kia k có task
  [10:15] phucvt: Ok anh. Vậy nếu có qua thì hú em trước cái nha
  [13:57] tuannt: Phuc Vo: ben nay can a lam gi e
  [14:02] phucvt: ``` **Thông tin chung** - Bản đang chạy: Laravel 13 / PHP 8.3, nhánh upgrade/cp2-laravel13. - Cách mở: https://staging-u
  [14:03] phucvt: Tuan Nguyen Vẫn là test và fix bugs, nhưng trên bản mới + nhánh mới nha anh
  [14:03] phucvt: Follow theo cái này
  [14:15] tuannt: ok e
  [14:20] tuannt: ủa Phuc Vo cái server này env đang trống vậy e config mấy cái stripe ở đâu vậy >??
  [14:20] tuannt: staging
  [14:21] phucvt: Staging hay staging-upgrade á anh?
  [14:21] tuannt: staging-upgrade
  [14:21] tuannt: https://staging-upgrade.definitiveguide.co.uk/
  [14:22] phucvt: Để e check xem. Cái này nữa giờ cho AI agent nó handle deploy các kiểu. Có thể chưa vô đúng path, chứ k có env sao nó ch
  [14:23] tuannt: /srv/staging-upgrade/app [thread: 16 replies]
    └ [14:28] phucvt: A đang dùng model nào mà nó trả lời ít thông tin z :v
    └ [14:29] phucvt: image.png
    └ [14:29] phucvt: Opus 5.5
    └ [14:29] tuannt: a k chơi AI nó connect server
    └ [14:32] phucvt: Chơi đi anh. Ko chơi nó k có đủ context để biết chính xác đâu
    └ [14:33] tuannt: docker-compose exec app php artisan stripe:plan cái này để chạy stripe plan dúng k ??
    └ [14:34] tuannt: hiện nó đang báo lỗi k có plan trrên stripe
    └ [14:41] phucvt: Đúng rồi anh
    └ [14:41] tuannt: hiện a đã đôi stripe testmode
    └ [14:41] tuannt: https://dashboard.stripe.com/acct_1AeKqGGm0SbVBUvh/test/apikeys
    └ [14:41] tuannt: Screenshot 2026-10-08 at 14.41.47.png
    └ [14:42] tuannt: như Long nói hôm qua
    └ [14:42] tuannt: và đang chạy create plan stripe
    └ [14:42] phucvt: Ok anh, đổi key nhớ chạy clear cache nha
    └ [14:42] tuannt: ừ đúng r :)))
    └ [14:45] phucvt: Kết hợp cho AI thực hiện E2E testing luôn anh. Để cho lẹ
  [14:23] tuannt: Screenshot 2026-10-08 at 14.23.25.png
  [14:23] tuannt: vậy a ms hỏi
  [14:26] phucvt: /srv/staging-upgrade/.env
  [14:26] phucvt: Ở đây mới đúng
  [14:26] tuannt: ec :)
  [14:26] phucvt: Container app mount file này đè lên /app/.env. Kết quả docker inspect staging-upgrade-app-1: /srv/staging-upgrade/app  -
  [15:33] tuannt: Screenshot 2026-10-08 at 15.32.45.png
  [15:33] tuannt: hiện đang lỗi này nhé
  [15:33] tuannt: a sẽ check nó
  [15:33] tuannt: có chạy stripe:plan r và sucessful
  [15:33] tuannt: để check log
  [15:50] tuannt: Phuc Vo: a có fix cái này r nhé. a chạy lại script và có change lại cái stripe_id free plan nhé. work r.
  [11:41] duongdn: setup project check tính năng register, plans, stripe Tuan Nguyen  tách phần setup ra em, ko charge
  [11:42] tuannt: ok a
  [13:35] phucvt: Tuan Nguyen: Nay anh có làm bên này ko á anh?
  [13:35] tuannt: bây giờ a qua nè
  [13:35] tuannt: có gì cần làm e
  [13:35] phucvt: Ok anh, vậy anh làm tiếp cái hôm qua luôn nha
  [13:46] tuannt: ok e
  [17:00] tuannt: Account: carrick7@nustechnology.com / Nus@1234 List đã check:    - đăng ký, kích hoạt (link lấy trong log), đăng nhập, đ
  [12:38] phucvt: HANDOFF-2026-10-12.md
  [12:38] phucvt: Long Vo: Transfer để fen làm tiếp nha
  [15:23] longvv: ok fen
  [09:02] longvv: progress hqua t có push lên openspec r nha Phuc Vo
  [09:02] longvv: nay có qua DG liền ko
  [09:02] longvv: ko thì t làm tiếp
  [09:03] phucvt: openspec là nhánh mới hả?
  [09:03] longvv: ko, cái nhánh CP2
  [09:03] phucvt: Chưa, nhắm chừng chắc phải gần trưa hoặc đầu giờ chiều mới qua
  [09:03] longvv: ok
  [13:24] phucvt: Long Vo:  Giờ t qua nha
  [13:24] longvv: đợi tí, đang chạy giữa chừng
  [13:24] longvv: xong t commit lên
  [13:24] longvv: đang làm tới phase 4 upgrade es
  [13:25] phucvt: Ok xong hú nha

### !4jiQJOZbUzUllyDCrKKz48ppsULsq55cSkWGVTWDeDY — 69 messages
  [15:39] chientx: Alo mn, call xíu nha
  [15:44] chientx: có thấy LA ở đó ko a Dương?
  [15:44] duongdn: ko, nãy giờ a cũng tìm, bạn đi đâu gần 15m rồi
  [15:54] duongdn: bạn vô rồi nha
  [15:54] anhttl: Em mới qua nchuyen với anh NA với mấy dev
  [15:54] duongdn: a có xin về sớm đón bé có gì họp nhanh nha mn
  [15:55] chientx: call nha mn
  [15:56] chientx: mn join được ko?
  [15:56] anhttl: Cho em 2p ạ
  [15:57] chientx: waiting for you
  [17:27] anhttl: Em gửi nha anh Chien Tran, anh Duong Doan, anh Anh Nguyen -- Hi Elena, after checking internally, we have a few thoughts
  [17:30] anhttl: Các câu hỏi khác bả comment trong sheet em đã rep trực tiếp trên sheet nha mn
  [17:32] duongdn: a nghĩ nên có thêm câu dạng như tôi sẽ break down est nhỏ hơn và note kĩ hơn cho các feature để bạn hiểu rõ hơn chúng tô
  [17:34] duongdn: cái nữa 1 vấn đề bả hỏi là est FE cao a thấy mình chưa có câu trả lời rõ ràng cho nó nhỉ hơi chung chung
  [17:34] anhttl: Em nghĩ là bây giờ họ ok với budget là ok rồi, nếu break down ra nữa thì lại tốn thêm time để team breakdown
  [17:35] duongdn: theo ý a là thêm phần dạng như tuy màn hình ít nhưng thực tế trên đó có rất nhiều component / step ví dụ xxxx
  [17:36] duongdn: > <@anhttl:nustechnology.com> Em nghĩ là bây giờ họ ok với budget là ok rồi, nếu break down ra nữa thì lại tốn thêm time
  [17:36] duongdn: chứ quăng 1 cục 24 32h nhìn oải lắm
  [17:45] anhttl: thực tế thì số lượng màn hình cũng ko hề ít luôn anh. Tính theo số lượng màn hình là còn nhiều hơn DP nữa
  [17:46] duongdn: này tuỳ view nha e nói Figma thì nhiều nhưng thực tế tính năng thì có vài dòng có thể bã cũng đang hiểu thế
  [17:46] anhnvn: Do msg ban đầu của Lena cũng chỉ hỏi đại ý các điểm mình chọn phản hồi trong msg này, và bả cũng có nói như sau:  > If y
  [17:50] chientx: bữa mình tính theo rate bao nhiêu?
  [17:52] anhttl: 25 đô nha anh
  [21:11] chientx: > Regarding the budget, I really appreciate your thoughts and also value the opportunity to continue working together lo
  [21:25] anhttl: * Em gửi nha anh Chien Tran, anh Duong Doan, anh Anh Nguyen -- Hi Elena, after checking internally, we have a few though
  [21:26] anhttl: em update lại message rồi, anh xem lại để em gửi bả nha
  [21:34] chientx: OK rồi e, gửi bả đi xem sao
  [21:36] anhttl: * Em gửi nha anh Chien Tran, anh Duong Doan, anh Anh Nguyen -- Hi Elena, after checking internally, we have a few though
  [21:36] anhttl: Dạ em gửi rồi nha
  [09:08] anhttl: anh Chien Tran ơi, bà Elena có rep rồi nha anh. Bả nói vẫn vượt budget của bả ạ, anh xem chi tiết msg của bả:
  [09:08] anhttl: image.png
  [10:14] chientx: đầu tiên confirm lại bả xíu e, bả nói 27k EUR có phải ko?  Tức sẽ khoảng đâu đó 30k USD
  [10:26] chientx: * đầu tiên confirm lại bả xíu e, bả nói 27k EUR có phải ko?  Tức sẽ khoảng đâu đó 30.5k USD
  [10:26] chientx: * đầu tiên confirm lại bả xíu e, bả nói 27k EUR có phải ko?  Tức sẽ khoảng đâu đó 30.6k USD
  [10:50] anhttl: dạ để em hỏi lại
  [12:48] anhttl: bả nhầm anh Chien Tran ơi, ý bả là 27K usd
  [13:51] chientx: Mình sẽ deal tiếp. E gửi lại msg như sau giúp a ... Hi Elena, I completely understand where you're coming from, especial
  [13:58] anhttl: dạ em gửi rồi ạ
  [15:31] anhttl: Bả có phản hồi rồi ạ
  [15:31] anhttl: image.png
  [15:33] anhnvn: Cái vấn đề phải xong trong 2026: hiện tại còn dependencies là cái algo bên team bả đang làm, Anh Trinh em hiểu sao về th
  [15:34] anhttl: Ý 2: rough timeline raw dev ít nhất phải 3 tháng, nhất là khi có dependancy bên họ, và mỗi scope nhỏ cần có 1 khoảng tgi
  [15:34] chientx: Cái này thì chi tiết hơn về cách vận hành và dự án rồi, NA review kỹ với team. Có cái timeline cần lưu ý tính xem khả th
  [15:34] anhnvn: Mình có info gì về progress / việc team bả đang làm cái algo đó rồi em nhỉ?
  [15:35] anhttl: Cách đây 1 tuần thì họ có nói là đã start làm rồi, để làm xong thì khoảng 1-2 tháng
  [15:35] chientx: Những cái đó cần nói rõ với bả. Nếu mọi thứ rõ ràng, mình control được hết thì mình mới kiểm soát được timeline. Còn ở đ
  [15:36] chientx: A nhớ lúc lv với bả scope đầu tiên, hình như cũng có vấn đề này thì phải, vụ phải chờ gì đó phía bả, v.v..
  [15:37] chientx: NA cho họp với LA, a Năm -> discuss 1 lần rồi báo lên đây e
  [15:40] anhnvn: Anh Trinh ready thì hú, lên đây chỗ a Năm discuss e.
  [15:40] anhttl: Dạ h em lên nha
  [16:11] anhnvn: A Chien Tran, đã họp: - Các điều kiện bả đưa ra về timeline nhìn chung là khả thi, với điều kiện họ đảm bảo cung cấp các
  [16:11] chientx: OK e
  [16:19] anhttl: Em rep bả rồi nha
  [16:40] anhttl: anh Anh Nguyen, Kfir rep: First item yes, by the way 50% of the documentation is already ready Second item, I think that
  [16:41] anhttl: * anh Anh Nguyen điều kiện em đưa ho: > The detailed contracts for the Model to be available within 2 weeks from now, by
  [16:42] anhttl: * anh Anh Nguyen điều kiện em đưa ho: > contract cho model: 13 Oct. > contract cho run: 27 Oct. > thực sự work: 16 Nov. 
  [16:42] anhttl: * anh Anh Nguyen điều kiện em đưa họ: > contract cho model: 13 Oct. > contract cho run: 27 Oct. > thực sự work: 16 Nov. 
  [16:42] anhttl: theo như timeline của mình thì họ có delay vài ngày
  [16:52] anhnvn: Giờ những điều kiện này họ chấp nhận thì oke rồi. Quay lại cái đầu tiên là việc chia print và complete, deliver từng cái
  [16:54] anhttl: Mai làm luôn thì vẫn biết là là cái nào rồi, cũng align thứ tự này với bên bả rồi. Còn việc chưa ra các milestone hoàn c
  [17:05] anhttl: * Mai làm luôn thì vẫn biết là làm cái nào rồi, cũng align thứ tự này với bên bả rồi. Còn việc chưa ra các milestone hoà
  [17:05] anhttl: * Mai làm luôn thì vẫn biết là làm cái nào rồi, cũng align thứ tự này với bên bả rồi. Còn việc đưa ra các milestone hoàn
  [17:05] anhnvn: Về payment thì suggest bả vầy luôn xem bả nói sao e: - Mình sẽ đưa bả list các milestones (cái bả gọi là sprint), với tổ
  [17:05] anhnvn: Hiểu ý ko? Có gì thì hỏi lại.
  [17:06] anhttl: Dạ ok em hiểu
  [17:11] anhttl: @lena: perfect ! In parallel please let me know what we need urgently prepare on our side to be ready to start
  [17:11] anhttl: Anh Nguyen: ngon rồi anh
  [17:16] anhnvn: Oke, giờ tiến đến mấy việc liên quan Milestone list như trên. A sẽ trao đổi riêng với team.
  [17:20] anhnvn: Rồi còn báo Finance các thứ.

### !aaumKvfltGlhqcQjJP:nustechnology.com — 7 messages
  [16:41] binhnt: em ơi
  [16:41] binhnt: image.png
  [16:41] binhnt: bên dự án thiếu nhiều quá
  [16:43] duongdn: Dạ để em remind mn
  [11:20] binhnt: còn cái này chưa tick vào nè e Aysar Khalid - Baamboozle Client report missing · 1 member 1 week ago
  [11:26] duongdn: Da
  [11:30] duongdn: Dạ update rồi nha chị

### !agRUcyHjIzPzGsXDbp:nustechnology.com — 15 messages
  [13:53] luhx: Hi anh, sắp tới 31/10 bên CLB tổ chức đá giải, không biết chân cẳng a sao rồi nhỉ, có tham gia được không ạ.
  [13:56] duongdn: mình định đá ở đâu em, như lần trước ở VTau thì phải thì a ko tham gia được đâu, đi về trong ngày còn suy nghĩ
  [13:56] luhx: dạ đá ở sg thôi á a.
  [14:00] duongdn: để xem lịch rồi báo sau nha
  [14:00] luhx: dạ oke a.
  [14:37] duongdn: a có việc 31/10 rồi nên ko tham gia được nha e hẹn dịp sau nha
  [08:34] luhx: dạ oke a.
  [16:30] luhx: Hello anh, Em đến từ CLB bóng đá của công ty ⚽️ Hiện tại CLB đang có một chút “cải tổ” để hoạt động bài bản và vui hơn. 
  [15:54] duongdn: a xin hỗ trợ 500k nha, lu bu quên, a chuyển khoản Momo em hen
  [15:55] luhx: Dạ ọke a, thay mặt ae bên CLB cảm ơn a.
  [10:06] duongdn: cho a lại QR code/momo với
  [10:06] luhx: IMG_1881.JPG
  [10:07] luhx: dạ đây a, ngoài ra em lưu ý phát nha, đây là em xin tài trợ cho áo đấu nha a, không phải tài trợ giải, mấy hôm nữa sắp g
  [10:08] duongdn: 31/08, cuối tháng, khó rồi :v
  [10:09] luhx: không phải cuối tháng đâu a :v đá mới cuối tháng chứ xin tài trợ là giữa tháng ý hí hí.

### !aqjMBnmdbdjixFYnnR:nustechnology.com — 79 messages
  [08:27] chientx: giờ trái banh chỉ đang ở bên mình hay còn phụ thuộc gì khác chờ họ ko e?
  [09:59] chientx: hú NA
  [10:03] anhnvn: Hiện là bên mình thôi ah.
  [10:04] chientx: Nói team đẩy mạnh tối đa đi e, ưu tiên cao nhất cho nó
  [10:04] anhnvn: Dạ
  [14:59] chientx: Bên Elena dự kiến khi nào có est vậy NA? Còn bên Ons thì giờ sao? Có scope gì rõ ràng ko hay cứ làm tới đâu hay tới đó?
  [15:59] anhnvn: Elena: Với pace hiện tại thì dự kiến trong T3 tuần sau có est để gửi ah. Thực tế bóng ko hoàn toàn trong chân mình. Hiện
  [21:02] namtv: Cái này shift được thêm tuần này full nha mọi người
  [13:37] binhnt: Hi mn,				 				 #### Plan của dev từ tuần 			21/9	 				 --------- *Devs IDLE:*				 				 + 	ThamTTH	IDLE full		 + 	ThienT
  [15:41] namtv: >ThienVN IDLE một số giờ Mình đang pause bên Nestor do vấn đề payment, cũng chưa biết lúc nào mới resume. Vậy nên note b
  [22:18] namtv: Leo Schaller changed the limit 8:56 PM Old limit: 20 hrs/week New limit: 15 hrs/week Limit decreases take effect on Mond
  [23:27] anhnvn: Dạ đúng rồi a. Thay đổi này vẫn đúng với thoả thuận
  [16:22] chientx: Elena đã gửi estimate chưa NA?
  [16:40] anhnvn: Chưa được ah. Thấy team vẫn còn điểm cần hỏi đáp với họ. Dù vậy thì còn 1 vài điểm thôi. Đây là những điểm đã hỏi, nhưng
  [16:51] chientx: hix, kêu team dí mạnh lại họ đi e, để bên tui còn plan resources nữa
  [21:11] chientx: Elena sao rồi NA?
  [21:16] anhnvn: Dạ, đang finalize hình thức, chuẩn bị gửi rồi a. Total: 1633.4 - FE: 931.9	 - BE: 701.5
  [21:17] chientx: oh e, ráng cái này cứu được đống người...
  [21:17] chientx: chuẩn bị sẵn đi, thế nào bả cũng hỏi discount với số giờ nhiều thế này, như lần trước hình như mình discount 10%, e cứ g
  [21:17] anhnvn: Có điều con số cỡ này thì bả chắc lại chê mắc chê rẻ, hỏi discount gì đó. Mấy đợt scope hơi lớn đều vậy
  [21:18] chientx: check lại history xem mấy lần trước mình discount thế nào
  [21:18] chientx: từ scope đầu tiên lv với bả luôn
  [15:21] namtv: Bên Cameron tuần này vẫn full tiếp nha mọi người. Dự kiến vẫn sẽ giảm về 16h, nhưng từng tuần có thể có update, hơi bị đ
  [08:27] chientx: Có update gì bên Elena ko NA?
  [08:46] anhnvn: Elena mới rep tối qua, đại khái bên họ expect total chỉ khoảng 1000h thôi, so với khoảng 1k4 của mình. Phía bả thì nói h
  [08:46] anhnvn: image.png
  [08:48] anhnvn: Tính ra số bả kì vọng là khoảng 30%, assume bảo vệ estimate chỉ giảm chi phí. Mức khá cao.
  [08:49] namtv: Ngoài discount thì cũng phải xem các điểm bả nói nha, nhất là cái bả nghĩ đã có, và điểm phân bổ BE, FE. Trong case sai 
  [08:53] chientx: a nghĩ vẫn cứ deal th. Đầu tiên: kêu team vào, discuss kỹ các điểm bả nói. A Năm tham gia luôn để cho ý kiến cho phù hợp
  [08:54] anhnvn: Dạ, nhìn chung quan điểm bảo vệ tối đa số giờ, chỉ deal chi phí thì vẫn là bài chính thì mình vẫn duy trì. Em đang nch v
  [08:58] chientx: ý a kéo vào phòng họp review discuss 1 lần để chốt các ý luôn e, có a Năm tư vấn phản biện các thứ
  [08:59] chientx: để team tự nc với nhau thì cũng chỉ dựa trên cái team đã hiểu biết, chưa có góc nhìn khác đi được
  [09:00] namtv: uhm, có điều chú ý cũng ko kỹ được, chỉ dựa trên một số cái cụ thể nào đó. Chứ bên này khá phức tạp, estimate mà mấy đứa
  [09:00] namtv: Bên này mỗi lần nhìn chi phí estimate cũng khá oải
  [09:01] chientx: ngoài ra cũng review với tụi nó kỹ vụ có estimate trên tư duy áp dụng AI triệt để chưa
  [09:02] namtv: Hôm qua anh có họp với team. Vẫn có áp dụng nhưng ở mức từng cá nhân, anh đã yêu cầu apply chung + thử OpenSpec, tranh t
  [10:33] namtv: Anh đã họp với team, nhưng ko đi chi tiết các items được. Anh đã guide team về các thứ cần làm: - Từ giờ luôn cần involv
  [10:34] chientx: cái này ưu tiên làm liền nha a Duong Doan  Trong hôm nay e sẽ cần có msg gửi lại cho bả, gồm những phản hồi giải thích
  [10:35] duongdn: Ok e
  [10:36] namtv: Cả FE và BE, ko phải mình FE đâu nha Dương
  [11:36] binhnt: Hi mn,				 				 #### Plan của dev từ tuần 			28/9	 				 --------- *Devs IDLE:*				 				 + 	ThamTTH	IDLE full		 + 	ThienT
  [13:49] duongdn: Team đã họp xong sáng nay, khá nhiều thứ đã raise lên Nhìn chung FE thì có thể update lại, theo hướng reuse, có assumpti
  [13:53] chientx: > Team đã họp xong sáng nay, khá nhiều thứ đã raise lên Nhìn chung FE thì có thể update lại, theo hướng reuse, có assump
  [13:55] duongdn: a ko rõ, để a push Lan Anh làm việc với team
  [15:19] chientx: có update gì bên team chưa a Dương, NA? ⚠️
  [15:23] duongdn: Chưa em, nhiều thứ cần check lại lắm, Cũng như cần update note, break dòng vvv  Issue gì a đã raise hết rồi, giờ mn foll
  [15:33] chientx: phía KH thì mình sẽ không hẳn sẽ phải gửi lại 1 file estimate mới đâu, như vậy nó ảnh hưởng niềm tin KH về việc mình est
  [15:34] chientx: Msg mình nói lại cho KH sẽ là: + giải thích cái est mình nên như thế nào cho hợp lý, để bả không cảm thấy mình đang est 
  [15:35] chientx: hiểu cái này ko Anh Nguyen ? Chứ ko phải giờ đi est lại và sau đó gửi lại bả 1 file est mới theo kiểu: sorry tụi estimat
  [15:37] chientx: * hiểu cái này ko Anh Nguyen ? Chứ ko phải giờ đi est lại và sau đó gửi lại bả 1 file est mới theo kiểu: sorry tụi tui e
  [15:52] anhnvn: Em hiểu mà.  Em vừa nch với team và LA, nhìn chung quan điểm là các estimate và giả định sẽ ko thay đổi nhiều đâu. Có mộ
  [17:09] chientx: Tony Berry: > Sep 23: Hiện có 1 scope đang estimate. Các task cần review thì mình báo, phía họ có confirm rồi. Cái này l
  [17:31] anhnvn: Cũng tương đối đó ah,  Mobile khoảng 70h; web/be khoảng 200h total.
  [17:48] chientx: đã gửi chưa e?
  [17:48] anhnvn: Đã gửi rồi a, từ chiều qua. Ổng để đó rồi đang kêu tech lead bên kia coi đánh giá hộ, chưa thấy ông kia trồi lên.
  [17:51] chientx: follow dí ổng e
  [21:45] namtv: Bên Elena thì các ý về next step thế nào, phân tích cả lý do cần bảo vệ estimate khi có thể các thứ cho LA và team hiểu 
  [21:45] namtv: Rồi chiều sao rồi nhỉ? Có con số gì chưa, làm gì với bả chưa?
  [21:47] chientx: LA đã gửi msg cho bả giải thích các ý về estimate, offer discount cho bả, để coi bả nói sao
  [20:51] chientx: Elena và Tony Berry có update gì mới ko NA?
  [23:16] anhnvn: Cả 2 bên đều chưa thấy trả lời gì ah
  [08:34] chientx: dí hỏi thăm hết đi e
  [08:39] namtv: Bên Gil báo khách hàng cần giảm chi phí nên giảm xuống 80h/month từ tuần sau, ko delay được. Mình đang nói ổng set theo 
  [13:23] chientx: Danh sách Jobs ưu tiên 1/ Yami Chandhok (Wildsoul) - Mindbody (Web/Mobile) - AnhNVN: -> cần họp discuss làm rõ requireme
  [13:23] chientx: Bên Yami status sao rồi NA?
  [13:57] anhnvn: Doc của họ raise nhiều câu hỏi cần mình nghiên cứu đánh giá. Họp team xong 1 buổi thì mới đi được một phần, phương án ph
  [14:02] chientx: Giờ cần quyết liệt, nay họp xong cần phản hồi lại họ và hẹn họp luôn e
  [12:55] binhnt: Hi mn,				 				 #### Plan của dev từ tuần 			5/10	 				 --------- *Devs IDLE:*				 				 + 	ThamTTH	IDLE full		 + 	ThienT
  [13:20] chientx: Anh Nguyen: xem ds trên cập nhật lại sau khi có scope Elena đi e
  [13:21] namtv: Để anh update liên quan Elena
  [13:23] namtv: Remove dàn này liên quan Elena nha chị Bình: SamHT IDLE 30h/week KhanhHH IDLE full TriNM IDEL FULL KietNHT IDLE FULL Tua
  [13:25] chientx: mà sao ko có TienND2 trong ds trên này ta...
  [13:25] namtv: uhm, anh cũng thấy, mà bạn cũng chuyển sang full Elena  rồi nên anh ko nói lại
  [13:26] namtv: Remove luôn do đã Minh full MyID, Tiến thì time còn lại coi như MyID luôn, gồm cả support, review, bù hiệu suất, làm luô
  [15:38] binhnt: * Hi mn,				 				 #### Plan của dev từ tuần 			5/10	 				 --------- *Devs IDLE:*				 				 + 	ThamTTH	IDLE full		 + 	Thie
  [15:06] namtv: Bên Kunal cũng bắt đầu chuyển sang cho AI code, rồi đưa mình review rồi 😩 Từ tuần sau cần giảm ít nhất 1 người, và nhiề
  [15:08] namtv: Ah, có thể còn phải giảm nhiều hơn. Do nãy team nghĩ exceptions các thứ bên Rollbar vẫn dev làm, giờ ổng đập Claude vào 
  [12:03] binhnt: Hi mn,				 				 #### Plan của dev từ tuần 			12/10	 				 --------- *Devs IDLE:*				 				 + 	ThamTTH	IDLE full		 + 	Thien
  [13:18] namtv: >TienT IDLE 20h/w Bỏ nha chị, Gil quay lại full rồi

### !ccKLMvqfwvPBEoWXAl:nustechnology.com — 2 messages
  [09:01] chientx: Hi mn, 11h hôm nay, mn vào phòng 3L meeting chút nha.
  [10:58] chientx: Chuẩn bị vào phòng nha mn

### !cYxDcwWxBhnuXxpryq:nustechnology.com — 19 messages
  [09:24] duongdn: ủa, a ko thấy TuanNT đi làm ???
  [14:16] duongdn: nay Đạt có đi làm ko em
  [14:16] duongdn: Dat QC
  [14:16] honght: dạ có nha anh
  [14:16] honght: hình như bạn đi vs
  [14:16] honght: em ko thấy ở chỗ ạ
  [14:16] duongdn: ok e
  [16:18] duongdn: Hi em A xin phép về sớm chút xíu hôm nay (~4h30 - 4h45) Lí do: đi công việc Cám ơn em
  [16:18] duongdn: * Hi em A xin phép về sớm chút xíu hôm nay (~4h30 - 4h45) Lí do: đi công việc Cám ơn em
  [16:23] honght: dạ anh
  [14:03] honght: Hi anh, Bạn PhucNH sẽ làm việc đến hết ngày 30/09/2026. Em thông tin đến anh để anh sắp xếp transfer task ạ. Joey Bailey ⚠️
  [14:06] duongdn: ok e
  [13:42] duongdn: Hi em A xin phép về sớm hôm nay (3h45 - 4h) Lí do: có event trung thu ở chung cư nên mẹ bé phải lo cho đứa lớn, a đi đón
  [15:07] honght: Hi anh, Các bạn sau sẽ làm việc đến hết ngày 09/10/2026. Em thông tin đến anh để anh sắp xếp transfer task nhé. - ThinhP ⚠️
  [15:07] duongdn: ok e
  [14:03] duongdn: Hi em A xin phép về sớm hôm nay (3h15 - 3h30) Lí do: bé nhỏ bệnh nên mẹ phải ờ nhà chăm A đi đón bé lớn A sẽ làm bù lại 
  [14:04] honght: dạ
  [16:43] duongdn: Hi em A có chút việc nên xin làm sớm xíu (4h45) A sẽ làm bù lại tối nay
  [16:48] honght: dạ anh

### !DlcbJDCUZaUivhEXSb:nustechnology.com — 71 messages
  [09:44] anhnvn: A Dương có làm việc qua với cái WordPress plugin tên là Quiz-Survey Master này chưa ah: https://quizandsurveymaster.com/ ⚠️
  [09:46] duongdn: chưa nha em
  [09:49] duongdn: E cần coi gì à, nếu nó ko phải paid plugin thì down về study thoai
  [09:50] anhnvn: Dạ có cái potential này cần gửi proposal mà req có liên quan. Dính tới WordPress nói chung. Chắc cần discuss và để a Dươ ⚠️
  [09:51] duongdn: OK e
  [10:01] anhnvn: Cái AirAgri của ông James Diamond phải là page này ko a: https://www.airagri.com.au/
  [10:01] duongdn: uhm đúng rồi
  [10:18] anhnvn: A Dương, việc collect review Clutch với KH, bên a có 2 cái này: 1/ Baamboozle Aysar Khalid DuongDN Khách đồng ý 2/ Eleva ⚠️
  [10:19] anhnvn: Đi bên Baamboozle trước nha a. Đầu tiên là thông tin cá nhân người khách:
  [10:19] anhnvn: image.png
  [10:19] duongdn: làm sao biết được ta ...
  [10:20] anhnvn: image.png
  [10:20] anhnvn: Chẹp, a có biết bạn nào nắm dc mấy info này bên đó ko... Sẽ còn cái Project Info nữa
  [10:20] anhnvn: Mà mỗi cái đều cần như vậy
  [10:25] duongdn: trước giờ mình có biết địa chỉ khách hàng đâu ta ...
  [10:25] duongdn: làm online mà, ai lại share địa chỉ ...
  [10:26] duongdn: sao mà biết đươc
  [10:26] anhnvn: Location là quốc gia thôi a
  [10:26] anhnvn: Mà cái đó là 1 trong những cái khác thôi, còn tên tuổi, email, website, phone nữa mà
  [10:26] duongdn: E cứ list ra hết xem
  [10:27] duongdn: Này chắc lên mạng search thôi, bữa a nhớ chi Bình chị ấy search ra khách hàng trong Linked In
  [10:27] duongdn: rồi lấy thông tin từ đó
  [10:27] anhnvn: Như trên hình ấy a.  First Name Last Name Company Name Title Email Phone Company Website Location
  [10:28] duongdn: lạ nhỉ, mấy info này bữa đã collect rồi, sao giờ e lại ko có ta
  [10:29] duongdn: A có share e 1 file
  [10:29] duongdn: bữa chị Bình nhờ collect info khách hàng
  [10:29] duongdn: E có thể vô đó lấy
  [10:30] anhnvn: Ai collect và để vào đâu ta? Em thì ko có info gì. Có info a Chiến nói cus ready đồng ý đưa review thì em mới lần theo c
  [10:30] duongdn: ok e lấy đi
  [10:30] duongdn: vên 365 gì thì a ko có info gì, e hỏi thêm Nghiệp xem, bạn làm từ đầu
  [10:31] duongdn: https://www.linkedin.com/in/caseyronan/
  [10:31] duongdn: đây là info của khách hàng bên Baamboozle, nếu thiếu e có thể lấy thêm
  [10:31] duongdn: Ronan Casey · 3rd Founder at Baamboozle
  [10:32] duongdn: * Ronan Casey Founder at Baamboozle
  [11:24] anhnvn: Bên Bamboozle có cái tên Aysar Khalid, nhân vật này là ai vậy a? Còn liên quan gì ko? Tức là bây giờ request review cho 
  [11:25] duongdn: yes
  [11:25] duongdn: Aysar là CTO của công ty, cũng ko hiểu lí do gì mà đặt tên khách hàng là Aysar
  [11:25] duongdn: chắc ổng làm việc với mình đầu tiên vòng interview
  [11:25] duongdn: sau đó vô là mình làm chủ yếu với ông Ronan
  [11:25] duongdn: làm trực tiếp với founder, oách ghê :D
  [11:26] anhnvn: Chắc vậy quá, đưa em tên đầu mối KH vẫn là tên Aysar Khalid này
  [15:38] anhnvn: Bên Bamboozle em đã gửi request từ bên Clutch Review, có gì a nhắn thank và báo ổng giúp em nha.
  [15:44] duongdn: OK w
  [15:48] anhnvn: Tương tự bên Philip Briggs luôn ah
  [15:48] duongdn: ok
  [08:43] anhnvn: Bên ông Philips và ông Ronan của Bamboozle đều chưa thấy action khi mình request review Clutch. Chắc a Dương xã giao hỏi ⚠️
  [08:44] duongdn: ok e
  [10:24] duongdn: a remind họ rồi nha
  [16:53] duongdn: Cho a lại mấy cái a càn  check lại nha
  [23:17] anhnvn: Anh Dương ơi, Có bà này bên Carrick contact: Maya Dunne 11:15 PM Hello, hope all is well. Thanks for your interest in th ⚠️
  [09:17] duongdn: a đi chơi rồi khuya mới quay về để mai nha
  [08:28] anhnvn: Dạ, a coi gửi bả sớm asap giúp e. Hiện e mới gửi msg tạm bên Carrick thôi.  https://www.upwork.com/ab/messages/rooms/roo
  [08:28] anhnvn: KH Maya Dunne
  [08:29] duongdn: OK
  [10:11] duongdn: trong proposal nói mình có làm promap.io và bike.mz gì đó A chưa làm 2 cái này bao giờ, nó là gì vậy mình có target gì c
  [10:13] anhnvn: Theo em thì trả lời đúng các phần như họ yêu cầu thôi, em nghĩ ko cần đi sâu vào các project làm gì.  Đó là 2 project ct
  [10:13] anhnvn: Chắc để AI gen suggest ra 1 cái script, rồi a quay đọc.
  [15:30] duongdn: này chắc hok cần quay mặt mà quay màn hình thôi phải ko em
  [15:30] anhnvn: Gọi là intro thì nên có mặt mình nói chuyện a.
  [15:34] duongdn: ok e
  [17:47] anhnvn: A Dương xử xong cái video bên Carrick chưa ah? Khi nào gửi dc a?
  [19:41] duongdn: chưa đụng vô nha, cả ngày nay lo cái Mindbody
  [19:42] duongdn: giờ start
  [21:08] duongdn: https://www.loom.com/share/646563487e79499bb5df5612535c9b85
  [21:08] duongdn: Em xem video OK hok nha
  [21:26] anhnvn: E thấy oke rồi a
  [21:34] duongdn: ok vậy e gởi đi ha
  [21:34] anhnvn: A gửi luôn đc ko, e đang ko ngồi máy
  [21:34] duongdn: Ok
  [21:59] duongdn: done
  [08:36] duongdn: Ronan - Aysar Bammbozle nhắn I've submitted a review - great working with you Carrick

### !DQKJRlXXyqoPZwagKq:nustechnology.com — 6 messages
  [14:44] duongdn: A Năm có đi làm ko em
  [14:57] thaonm: dạ ảnh off chiều á anh
  [11:13] duongdn: cho a book 3l  chiều nay 2h - 2h30 nha
  [11:13] thaonm: dạ anh
  [09:54] duongdn: a Năm có đi làm ko em
  [09:54] thaonm: dạ có

### !DqlNWfFGIfRUQlXVOK:nustechnology.com — 20 messages
  [09:51] uyenvhp: Anh Dương ơi, như tuần trước em có share, em gửi anh các câu hỏi mà em muốn hỏi anh về case study Baamboozle nha. Vì có 
  [10:31] duongdn: OK e
  [11:28] duongdn: https://claude.ai/artifact/P1ZQzMuCSoMLRUqy5QhKxH
  [11:28] duongdn: a gởi info cho em
  [11:31] uyenvhp: Dạ okay, em nhận file nha. Chắc em cần phải đọc kĩ xong và sẽ hỏi anh sau nha
  [14:33] uyenvhp: Hi anh Dương, sorry anh, tuần này lu bu quá nên em phản hồi vụ này trễ. Em đọc qua và có 3 câu hỏi nhỏ về mục thanh toán ⚠️
  [14:34] uyenvhp: Nhờ anh giải đáp giúp em nha
  [15:18] duongdn: Ok e chờ a check lại
  [15:20] uyenvhp: dạ okiii, cảm ơn anh nhiềuu
  [15:20] uyenvhp: ngày mai, anh trả lời em cũng đc nha
  [15:45] duongdn: 1:  là bên internal team Bammbo  2: ko rõ nha ... ko có info cái này 3: ý em đúng nha
  [15:47] uyenvhp: Dạ âu kiii, em nhận tin nghen. Tạm thời, em chưa có thêm câu hỏi nào nữa nghen Cảm ơn anh đã support phần này nha
  [16:26] uyenvhp: Mà anh Dương ơi, cho em hỏi là cái lỗi thanh toán này, mình có thể hiểu nó là technical debt ko anh ha?
  [16:26] uyenvhp: Để có gì em điều chỉnh cách diễn giải ở trong bài á
  [16:27] duongdn: có thể xem là vậy, note: nó ko sinh ra từ mình, nó có trước khi mình làm
  [16:29] uyenvhp: Vậy bên mình có thông tin Bamboozle tạm thời vá lỗi đó bằng cách nào trong suốt 3 năm đó ko vậy anh?
  [16:29] uyenvhp: Hay là suốt 3 năm đó, bên app có lỗi, thì họ sẽ xử lý thủ công luôn?
  [16:30] duongdn: ko e, chuyện xảy ra trước khi mình vô thì mình ko có info
  [16:30] duongdn: nó thành bug cần fix thì mình fix thôi
  [16:30] uyenvhp: dạ okay, em noted nha

### !gqPyaVryKgGaFwhgqU:nustechnology.com — 25 messages
  [09:27] duongdn: ủa, a ko thấy TuanNT đi làm ???
  [09:27] duongdn: rồi Hồng có đi làm ko, nhắn hỏi cũng ko trả lời luôn
  [09:28] trucpdt: Hồng off mà a
  [09:28] trucpdt: image.png
  [09:29] duongdn: ui a thấy email rồi, ok em
  [09:29] trucpdt: e thấy bạn gửi mail cho a rùi mà ta
  [09:29] duongdn: chắc lag, giờ mở mới thấy
  [09:31] trucpdt: uki
  [09:32] duongdn: VuTQ cũng ko thấy đâu ...
  [09:32] duongdn: off luôn rồi à, qua bạn off rồi mà
  [09:33] trucpdt: hong nay thì xin đi trễ :))
  [09:33] trucpdt: bạn này ba giựt đó h gòi
  [09:33] duongdn: ơ hơ hơ ...
  [09:34] duongdn: mấy info này sync với dự án hoặc nhắc bạn báo với DM nha, chứ ko biết đường nào mà lần
  [09:36] trucpdt: zô gòi đó a
  [09:36] trucpdt: ủa la bạn ko có báo a hả
  [09:36] duongdn: ko có
  [09:36] trucpdt: bth rule là phải vừa xin dự án rồi báo admin nắm thông tin thôi
  [09:36] trucpdt: để e nhắc
  [09:36] duongdn: OK e
  [11:05] duongdn: Hi em A xin phép về sớm hôm nay (~3h30 -> 3h45) Lí do: mẹ bé có việc bận nên nhờ a đi đón con  --
  [11:05] duongdn: * Hi em A xin phép về sớm hôm nay (~3h30 -> 3h45) Lí do: mẹ bé có việc bận nên nhờ a đi đón con
  [11:14] trucpdt: dạ a
  [14:47] duongdn: Thảo nghỉ hôm nay à Cho a hỏi hôm nay a Năm có đi làm ko em
  [14:51] trucpdt: dạ a Năm off chiều nay á a

### !GXbuEjLzziMvSqzOwE:nustechnology.com — 28 messages
  [08:57] lenh: khách có reply cái này anh Duong Doan
  [08:57] lenh: image.png
  [08:59] duongdn: ok e
  [08:59] lenh: Với cả khách có reply và feedbacks. Nếu em làm thì sẽ chia giờ với bên James sao anh?
  [08:59] lenh: * Với cả khách có reply và feedbacks task. Nếu em làm thì sẽ chia giờ với bên James sao anh?
  [08:59] duongdn: đẻ a xem đã
  [08:59] duongdn: chưa có plan
  [08:59] lenh: ok anh
  [09:36] duongdn: hiện bên James có task gì gấp ko? hoặc có task gì có thể chia cho PhucVT làm ko em A thấy cái bug cần investigate sớm, c
  [09:47] lenh: Task để chia cho PhucVT làm thì vẫn có
  [09:47] lenh: Nhưng có 1 task hiện tại em có plan với ổng và ổng đang cần BE làm xong sớm để ổng check + feedback và cho mobile implem
  [09:50] lenh: Mà chắc em để investigate cái bug bên này cũng được, PhucVT qua làm 1 task bên này bù vào
  [09:51] duongdn: ok để a request người
  [09:58] lenh: Bên này hình như vẫn không dùng tracker gì phải không anh Duong Doan
  [10:01] duongdn: uhm lâu nay k thấy tracker ,vậy  cứ như cũ đi
  [14:46] duongdn: Em start Franc chưa em Le Ngo
  [14:46] duongdn: k thấy update gì trên Slack
  [14:49] lenh: Em mới fix bug xong và report ổng trên slack. Thấy anh react message của ổng rồi nên em không chat
  [14:50] duongdn: ok em
  [14:53] lenh: còn 1 minor bug liên quan đến edge case của người dùng chắc để sau. Em về James tiếp đây
  [14:53] lenh: Bên James cũng mới có issue của user report
  [14:54] duongdn: OK e
  [08:52] duongdn: bên Franc mình làm xong chưa nhỉ, thấy msg cuối của cus chỉ seen thôi Mấy info trong thread cover đủ chưa mn
  [08:54] khanhhh: dạ e chưa check bên này nha a để e sắp xếp làm bên đây.
  [08:57] duongdn: uhm chia ra đều ra em. Bên Aysar cũng ko dí gì
  [08:58] khanhhh: da anh
  [08:33] duongdn: Có msg nha em
  [08:34] khanhhh: da ok a

### !GXgpgqfNMQJBtSJNua:nustechnology.com — 4 messages
  [14:36] lucnt: Anh Dương ơi em có dự án nội bộ cần fix bug, anh cho em xin anh Vũ vài giờ qua fix nha anh. Em có báo anh Năm, ảnh có ok ⚠️
  [14:36] lucnt: * Anh Dương ơi em có dự án nội bộ cần fix bug để kịp deadline, anh cho em xin anh Vũ vài giờ qua fix nha anh. Em có báo  ⚠️
  [14:37] duongdn: OK nha
  [14:37] lucnt: Dạ thanks anh

### !HzmgzMNNkFcXPcIHfB:nustechnology.com — 8 messages
  [10:16] duongdn: giờ e avaiable để check est chưa
  [10:27] tiennd: da ok anh
  [13:39] tiennd: image.png
  [14:01] duongdn: họp xíu em
  [14:02] duongdn: ý
  [14:02] duongdn: nhầm đứa :v
  [14:02] tiennd: =))
  [14:02] tiennd: TienND 2

### !jdNCdKwRaTKvQQjhcZ:nustechnology.com — 3 messages
  [08:31] thanhnx: dạ anh Dương cho em xin nick Kai để đăng nhập vào jira với ạ
  [08:47] duongdn: rồi nha em
  [08:53] thanhnx: dạ cảm ơn anh

### !jFKMARRnYlvuFqZaKx:nustechnology.com — 9 messages
  [11:28] duongdn: Hi em Remind mình có meeting lúc 2:00 PM này nha
  [11:29] dongnv: Dạ.
  [13:40] dongnv: Mình tự book phòng họp hay đã có sắp xếp sẵn chưa anh nhỉ?
  [13:40] duongdn: bên 3L á
  [13:41] dongnv: Dạ, OK anh :D
  [13:55] dongnv: Đây là một số điểm em muốn trao đối nha anh: + Cần một người để học hỏi, chỉ đường, hướng dẫn cho target, lộ trình của m
  [13:56] dongnv: Anh xem qua rồi vô phòng họp mình trao đổi thêm ạ.
  [13:56] duongdn: Ok e
  [14:00] duongdn: a vô phòng nha

### !knbJbIKzXRJNGVFQNg:nustechnology.com — 31 messages
  [08:29] duongdn: Hi TuanNT, task log for 2026-09-23 is missing (0h logged). Please update when you can. Thanks!
  [09:00] duongdn: remind: em chỉ mới bù 30m tuần này, còn 1h
  [09:01] tuannt: dạ
  [10:11] tuannt: Hi anh,  Em xin phép anh cho e off chiều e đi khám răng ạ. Đau quá k ăn uống được gì.  A đồng ý e sẽ viết mail và đặt lị
  [10:12] duongdn: OK e viết mail đi
  [10:12] tuannt: Dạ anh
  [09:02] duongdn: 
  [09:03] tuannt: E login dc bang google account r a
  [09:04] duongdn: oh thế à, ok
  [08:50] duongdn: Hi TuanNT, task log for 2026-10-05 (Mon) is missing (0h logged on Workstream). Please update for all projects you worked
  [08:31] duongdn: Hi TuanNT, task log for 2026-10-06 (Tue) is missing (0h logged on Workstream). Please update for all projects you worked
  [15:14] tuannt: Hi anh, em xin phép về sớm hơn tiếng e đi ra ngân hàng có chút việc ạ. Em cảm ơn anh.  Về dự án thì k có gì gấp ạ. Em là
  [15:22] duongdn: ok e
  [15:22] tuannt: dạ
  [22:06] duongdn: Hi em A thấy e có log 2h lảm James Diamond thứ 2 Cái này plan ở đâu vậy, a có nói e làm James Diamond tuần này đâu ?
  [22:08] tuannt: Chac e log nhầm. Có gi de e check
  [22:13] tuannt: e upate r nhé a
  [22:14] tuannt: e nhầm vs Portfolio Andrew Taraba
  [22:14] tuannt: Portfolio
  [22:14] tuannt: thấy bên jame cũng Portfolio nên nhầm a
  [22:14] duongdn: OK e
  [13:37] tuannt: hi anh,  Em xin phép anh hôm nay e về sớm ạ. Em vẫn còn cúm hơi mệt ạ. E làm bù trong tuần ạ.  E cảm ơn anh!
  [13:42] duongdn: ok e
  [13:42] tuannt: Dạ
  [08:54] duongdn: Hi TuanNT, task log for 2026-10-12 and 2026-10-13 is missing (0h logged on Workstream). Please update when you can. Than
  [08:55] tuannt: e có log task log hôm qua r á
  [13:49] tuannt: Hi anh, em xin phép nay về sớm e đi khám nhé anh.  Hôm qua có task urgent live không về được qua muộn quá phòng khám đôn
  [13:50] tuannt: Và cái 2 task mà lấy giờ dev bù thì e làm bù rời sang tuần được k anh? Mấy nay e mệt không làm buổi tối thêm được.
  [13:51] duongdn: OK e, quan trọng là fix cho xong bug urgent nha, nếu ko kịp thì đẩy sớm cho VuTQ
  [13:51] tuannt: urgent console Vũ đang làm á anh
  [13:51] tuannt: e fix bug prestashop rồi

### !KvUUGTgxGmdIGNwEuC:nustechnology.com — 4 messages
  [13:40] trinm: check giùm em PR này nha anh  https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/311
  [13:48] duongdn: E add các bạn FE dev khác làm reviewer và nhờ họ check trước nha
  [13:48] duongdn: a ko thường xuyên review đâu
  [13:57] trinm: anh Sâm check rồi ấy anh , ý giờ PR khi nào được merge ấy anh

### !kyArBadvcbfPIpIxpD:nustechnology.com — 19 messages
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

### !mYZBGNoLFVpMVIJtPu:nustechnology.com — 29 messages
  [09:06] longvv: Tình hình là có vẻ e tạm hết task r á, bên OhCleo thì mình làm full t4 t6 Bên Maddy thì khách ổng chưa phản hồi lại mấy 
  [09:06] longvv: Với e đang estimate cái đống feedback ổng gửi, cái nào charge dc thì e list ra
  [09:06] duongdn: ko có task thì chắc cứ làm tạm Celine thôi
  [09:06] longvv: ok a
  [09:19] longvv: bên ohcleo t6 e mới làm tiếp, giờ nếu hết task thì làm gì á a, hu hu
  [09:23] duongdn: Coi Maddy có gì làm trước được thì làm
  [09:23] duongdn: * Coi Maddy có gì làm trước được thì làm đỡ đi, hoặc James Diamond
  [09:23] longvv: ok a
  [09:24] duongdn: * Coi Maddy có gì làm trước được thì làm đỡ đi, hoặc James Definitive
  [09:24] duongdn: a nhầm James nha, mới update lại
  [09:41] duongdn: Maddy nha, James chưa rõ ràng
  [09:42] longvv: ok a
  [11:33] longvv: https://bitbucket.org/xtreme-web/tuff-poly/src https://www.tuffpoly.com.au/
  [11:47] duongdn: thank e
  [09:05] duongdn: qua e làm 3h James 4h Maddy
  [09:05] duongdn: 1h còn lại bên nào vậy em
  [09:06] longvv: à bên Sandor nha a
  [13:57] duongdn: Task bên em sao rồi, đủ task làm tuần này ko? Celine và Maddy ?
  [13:58] longvv: Maddy thì chắc ko đủ rùi á, còn Celine thì e vẫn đủ task
  [13:58] duongdn: ý là đủ 40h tuần này ko
  [13:58] duongdn: nếu ko thì chọt vô làm chút James
  [13:58] duongdn: james DefintiiveGuide
  [13:58] duongdn: chứ PhucVT bị lôi đi rồi
  [13:59] longvv: 26h Celine tuần này, Maddy hqua e mới làm có 2h, còn dư 12h chắc qua James á
  [13:59] duongdn: Vậy e start James ngay được ko?
  [14:00] duongdn: Để có cái report ổng hôm nay
  [14:00] longvv: e start dc nha
  [14:00] duongdn: ok tiến hành đi
  [08:48] duongdn: Hi LongVV, task log 09-29 anh thấy em mới log 6h (OhCleo). Nếu còn task nào chưa log thì em bổ sung giúp anh nhé. Thanks

### !oGYjbzEfphvvauBZtq:nustechnology.com — 205 messages
  [07:26] namtv: Lâu nay mày còn dùng cái nusdev.net ko?
  [07:42] duongdn: vẫn bình thường it nhất có active project là Aysar dùng nó xưa ta host Elena lên còn h bữa thấy team làm 1 version trên 
  [07:47] namtv: Cái đó do tao tạo VM cho project, đường đi chung qua proxy có sẵn, với dùng dạng *.dev.nustechnology.com chứ ko phải trê
  [07:47] namtv: Cái domai nusdev.net sắp hết hạn, đang suy nghĩ có cần renew ko
  [07:47] namtv: * Cái domain nusdev.net sắp hết hạn, đang suy nghĩ có cần renew ko
  [07:54] namtv: Chắc cần quá. Cái *.dev.nustechnology.com tao dùng dạng wildcard để đỡ mất công point ở Cloudflare, chỉ config ở proxy l ⚠️
  [07:59] duongdn: yes nội ý ssl cert 2 sub level là đủ hợp lí cho cái nusdev rồi
  [08:00] namtv: Chủ yếu do vấn đề đầu tiên nên mới phát sinh cái SSL issue đó thôi
  [08:35] namtv: Đã renew và để auto renew
  [08:59] namtv: Tao có add 1 cái *.nusdev.net. Cái này ko ảnh hưởng các subdomain khác do wildcard sẽ ưu tiên thấp nhất nha
  [08:59] duongdn: ok, chắc chắn rồi
  [09:25] duongdn: Bên Celine tới t6 mới làm tiếp, giờ tạm LongVV ko có gì làm, chắc cho bạn làm trước James Definitive hoặc Maddy được hok
  [09:26] namtv: Maddy là do chưa có task approve làm chính thức mà có task backlog à? Còn James Definitive thì sao có cái làm trước nhỉ?
  [09:27] duongdn: Maddy: ổng kêu est mấy task mà cus chưa approve ... James Definitive: có mấy cái cũ bữa mình có gợi ý làm, rồi vụ upgrad
  [09:40] namtv: Khó ta 😩
  [09:40] namtv: Dạo này làm trước toàn hụt nên hơi rén 😐️ (nhiều project làm trước, rồi KH pending)
  [09:40] namtv: Mà ko còn gì khác thì quất Maddy đi
  [09:41] duongdn: uhm khả dĩ hơn .. ok Maddy
  [09:41] duongdn: bữa James qua Slack mừng hết lớn
  [09:41] duongdn: có điều kiệu dí liên tục
  [09:42] duongdn: === mà nếu làm trước thì làm sao để note cho bên finance biết mà gởi bill cho cus hay ko nhỉ
  [09:44] namtv: Tạo tag, rồi báo finance những tag nào dạng để lại report sau. Tao cũng sẽ báo finance là có effort dạng này
  [09:44] duongdn: OK
  [08:57] namtv: NEW	LongVV		17/09/2026	Chăm ba Task Maddy sao nhỉ? Có vẻ Long idle?
  [08:57] duongdn: uhm task chưa approve, đang làm trước thôi
  [13:35] namtv: NEW	KhanhHH	Chiều	17/09/2026	Bị cảm, đau đầu ==> có ảnh hưởng bên nào ko nhỉ?
  [13:36] duongdn: ko nha bạn hỏi trước khi xin rồi
  [08:25] namtv: Lễ xin làm remote, chắc đâu cần đâu hả? Còn 1 PL, và cần thì dev khác bù cũng được?
  [08:39] duongdn: để xem
  [08:41] duongdn: để bạn off đi nha, ko có gì gấp
  [10:15] namtv: PhucVT tuần sau quay lại, nên làm gì đây... Celine thì có vẻ nên để Long làm luôn cho ổn định, số giờ cũng phù hợp
  [10:18] duongdn: chưa nghĩ ra gì luôn, chắc bỏ tạm vô Bailey phụ fix bug, review site, improve ... vv
  [10:33] duongdn: Davide - Kuban Empire: dự án này có nên contact ko,  lâu quá rồi, cũng ko nhớ status sao nữa
  [10:35] namtv: Cái này cần chắc kèo chút, dạng happy ending...
  [10:36] namtv: Davide tao cũng ko nhớ lắm, nhưng có vẻ cũng có một số issue khi làm
  [10:37] duongdn: OK, vậy thôi khỏi gởi đi, ta nhớ ổng cũng khó, vụ đổi người (Dậu - LeNH) cũng bị nói, rồi vụ chát giùm  Ta ấn tượng ông 
  [10:38] duongdn: Bradley Naples - The Response Network Này thì sao nhỉ ... mất trí nhớ về nó luôn
  [10:38] duongdn: * ======= Bradley Naples - The Response Network Này thì sao nhỉ ... mất trí nhớ về nó luôn
  [10:40] namtv: Ko nhớ luôn...
  [11:13] duongdn: PJ Wilson - BigCityJax
  [11:13] duongdn: này thì sao nhỉ, lại mất trí rồi ...
  [11:13] namtv: Ko có ký ức
  [08:33] duongdn: Gởi @thanhnx:nustechnology.com nick JIRA Kai nha
  [08:34] duongdn: ==== Plan chưa có PhucVT, vẫn đẩy vô Bailey như bữa ta suggest hay sao nhỉ
  [08:40] namtv: uhm
  [08:45] namtv: Done
  [08:48] duongdn: add PhucVT vào WS nha
  [08:50] namtv: Trước bạn có làm Bailey rồi nhỉ?
  [08:54] duongdn: để kiểm tra, hình chưa chưa
  [09:01] duongdn: chưa nha, ko thấy trong các task log, trí nhớ cũng là chưa luôn
  [10:21] namtv: Maddy hình như có form gì đó, cho user nhập info, tính toán ra kết quả gì đó phải ko? Có thì cho tao vài screenshot và m
  [10:22] namtv: McRoy hình như cũng có?
  [10:22] namtv: Có thì quất luôn
  [10:24] duongdn: Maddy có 1 sub project tính vật liệu xây dựng
  [10:24] duongdn: McRoy thì tính lãi vay
  [10:25] duongdn: để tìm lại đã, cũng khá lâu
  [11:51] namtv: Hú
  [11:55] duongdn: giờ mới start
  [14:02] duongdn: calculator-form-demo-tuffpoly-smart-towkay.pdf
  [14:03] duongdn: đây nha
  [14:04] namtv: Tao cần 1 cái ngắn gọn, ready gửi khách hàng. Ví dụ 1 form chỗ nhiều data nhất, rồi 1 message nói sơ về form làm gì thôi
  [14:04] namtv: * Tao cần 1 cái ngắn gọn, ready gửi khách hàng. Ví dụ 1 vài form chỗ nhiều data nhất, rồi 1 message nói sơ về form làm g
  [14:06] duongdn: uả ít mà, có mấy dòng thôi mà ta
  [14:12] namtv: Nó ko hợp send message lắm 🤔 Mà để gửi file cũng được. Chờ chút tao gửi thêm info 1 cái khác, mày nhét vào giùm tao luô ⚠️
  [14:22] namtv: Tyme Calculator This is a quotation system for proposing the prices of the company’s products to clients. There will be 
  [14:22] namtv: screencapture-tymecalculator-quotes-276-properties-2026-09-21-14_18_53.png
  [14:23] namtv: Cái này internal, ko show URL được
  [14:24] namtv: smart-towkay thì mày để link thẳng tới form đi, thấy đang ghi path
  [14:24] namtv: Cho cái Tyme lên đầu, nó có vẻ relevant với yêu cầu của client nhất
  [14:25] duongdn: OK
  [14:38] duongdn: 
  [14:39] duongdn: ta có ép nó overview nhỏ hơn 2 site cũ luôn cho gióng format trên rồi á
  [14:40] namtv: TuffPoly sao ko ném link vào luôn nhỉ?
  [14:41] duongdn: 1m
  [14:43] duongdn: quote-calculator-examples-short.pdf
  [16:51] duongdn: bên James  Definitive Guide ok phần upgrade framework, mừng ghê Chắc đem PhucVT qua nha, Bailey cung nhiều dev rồi
  [16:51] duongdn: vứt qua vứt lại ko biết ổng chóng mặt ko ...
  [16:51] duongdn: bên Hằng có update gì về status cảu bạn sau 2 tuần quay lại?
  [16:52] namtv: Chưa thấy gì, đã hỏi. Đem qua đi
  [16:53] duongdn: ok
  [17:22] duongdn: lại add vào project nha :D
  [21:27] namtv: Done
  [09:49] duongdn: Hi ku Về issue trên project wrap up Có nên apply AI vào để giải quyết ko, như tool ta đang làm nè Việc 1 msg ko được act
  [09:50] duongdn: tất nhiên ta cần thêm info về security /policy dự án, chưa rõ quăng AI vào nó có vi phạm gì ko
  [10:05] namtv: Tao cũng nghĩ tới vài lần. Tuy nhiên hơi khó apply đại trà do ko phải ai cũng có subscription. Còn dùng agent opensource
  [09:23] namtv: Vụ training AI, suy nghĩ lại thì section 5 (security) hiện tại nó chưa phù hợp lắm. Mình chưa làm agent mấy, giờ nói vào ⚠️
  [09:23] namtv: Có thể nên theo hướng build con agent nào đó cho công ty luôn chẳng hạn. Idea thì chưa rõ...
  [09:24] duongdn: ta có làm phần 1 của session 5 rồi, các yếu tố liên quan production
  [09:24] duongdn: security thì ý sau nhỉ
  [09:24] namtv: Ah, nói chung ấy. Tao nghĩ compact nguyên section 5 thành 1 session thôi, đi qua basic
  [09:25] namtv: Chủ yếu do giai đoạn hiện tại thì phần đó chưa đủ thấm, train khó có tác dụng
  [09:25] duongdn: ok, có gởi làm lại doc ko, hay theo tư tưởng thôi
  [09:27] namtv: Chắc tao sẽ update doc
  [09:28] duongdn: OK, xong gởi team đi, rồi ta xem nc với Nghiệp
  [09:17] duongdn: John Yii đã remove acc Slack mình luôn rồi nha, coi như từ giờ ko liên lạc được nữa ...
  [09:18] namtv: Kiếm xem có info mail ko, để lưu lại 😄
  [09:22] duongdn: hên bữa chi Bình collect info cus có lưu rồi
  [09:22] namtv: Ko có data
  [09:23] duongdn: vậy là mất 11h task payment ...
  [09:23] duongdn: 🥲
  [09:45] namtv: Có cái onboarding checklist PhucVT bên James - Definitive nha
  [09:51] duongdn: Có cái bug bên Franc cần check, ta lấy LeNh nha, giờ thiếu PhucVT sẽ bù
  [09:53] namtv: OK
  [10:25] duongdn: TuanNT đau răng xin off, hiện Pretashop (PHP) coi như done, chỉ còn Console (Rails) Nếu VuTQ có thể làm bù chiều thì có 
  [10:30] namtv: uhm, Vũ idle, Bailey dùng càng nhiều càng tốt thôi
  [14:00] duongdn: PhucVT full James rồi, ta lấy ít giờ của LongVV làm James Definitive để có gì report ổng cầm chừng trong lúc PhucVT làm
  [14:00] duongdn: * PhucVT full James rồi, ta lấy ít giờ của LongVV làm James Definitive để có gì report ổng cầm chừng trong lúc chờ PhucV
  [14:02] namtv: Task Maddy và Celine dùng cỡ nhiêu hours của Long nhỉ?
  [14:02] namtv: Chứ Phúc thì chắc cần làm bên kia cỡ 1.5 tuần
  [14:03] duongdn: khoảng 30h
  [14:08] namtv: Vậy phần còn lại làm James Definitive đỡ đi
  [14:08] namtv: Hôm sau có Khánh chắc cũng dư giờ vào làm luôn
  [14:08] duongdn: OK
  [14:18] namtv: Andrew Taraba gửi offer. Xem thử Discord xem ổng hú gì ko
  [14:19] duongdn: Có task sáng discuss rồi nói gởi offer Task WP, mai ta báo TuanNT làm
  [14:19] duongdn: * Có task sáng discuss rồi ta nói gởi offer Task WP, mai ta báo TuanNT làm
  [14:20] namtv: Cỡ nhiêu hours?
  [14:21] duongdn: ko rõ, phải xem cái bug trước xem plugin có support ko, nếu ko thì viết custom plugin Chắc dao động từ  2h - 4h
  [14:22] duongdn: Sẵn tạo WS và add người lun y
  [16:26] namtv: Để tối...
  [16:26] namtv: Bên James Definitive task còn nhiều ko?
  [16:28] duongdn: task upgrade Laravel, ko nhỏ đâu à
  [16:28] namtv: Làm bữa giờ chắc cũng thấy sơ sơ được mức độ rồi? Có dự đoán được ko?
  [16:29] namtv: Và ổng có aware về độ lớn chưa... Sợ ổng lại ko có tiền 😓
  [16:29] duongdn: rough est khoảng 6 tuần, có đưa timeline cho ổng trước khi approve mà tất nhiên có nhấn mạnh là rough estimate
  [08:43] duongdn: Share TuanNT Trello và Discord Carrick nha
  [08:49] namtv: ủa, acc Atlassian tao thấy 1 cái share hồi tháng 4, có vẻ pass đổi và share lại nhưng tao chưa update item gốc. Lâu nay 
  [08:51] namtv: Vãi, test cả 2 đều sai @.@
  [08:58] duongdn: mần đi nha, ban start rồi TuanNT đã làm project này hồi xưa nên ko cần onboard nữa
  [08:58] namtv: Reset pass cái acc Atlassian phát
  [08:58] namtv: Discord thì shared rồi
  [09:02] duongdn: 
  [09:02] duongdn: làm nhanh luôn
  [09:02] namtv: Done
  [10:15] namtv: WS: rồi nha Nhưng Jeff Snider là ai bên đó vậy ta? Thấy info tên contact là ổng chứ ko phải Andrew 🤔
  [10:16] duongdn: ko biết ...
  [10:17] namtv: Cái này hẳn là đợt chị Bình collect các project về info công ty
  [10:17] namtv: Andrew Taraba			Bizurk Software					Manager	Jeff Snider	info@bizurk.net
  [10:19] duongdn: uhm chắc lấy từ trang web chăng
  [10:19] duongdn: trong Discord ổng cũng dung tên giả, ko biết (AnimeWorld)
  [10:22] namtv: Này thường là mình đi hỏi đó...
  [10:22] namtv: Andrew Taraba thì có thật: https://www.linkedin.com/in/andrewtaraba/
  [10:26] duongdn: ko có ấn tượng gì thật ...
  [10:28] duongdn: đù coi history thì ta là người bỏ cái tên đó vô ...
  [10:28] duongdn: lấy từ đâu vậy trời 🥲
  [10:56] duongdn: TuanNT fix xong rồi nha, khá nhanh :v Tạo WS cho bạn update task log nha
  [10:58] namtv: >WS: rồi nha
  [13:35] duongdn: Bên Bailey dev done hết để release rồi Ta trả lại VuTQ nha TuanNT thì qua làm James tạm  Có bug/feedback gì thì chắc để 
  [13:49] duongdn: ==== Quên, James Diamond theo kế hoạch cần làm bủ 3h , PhucVT làm mà bạn full Arthur rồi, chuyển qua cho TuanNT nha
  [13:50] namtv: Để kiếm chỗ cho Vũ 😩
  [13:53] namtv: uhm
  [14:10] namtv: KhanhHH dự kiến tuần sau tasks sao nhỉ? Có để đưa bớt sang dev khác nếu dev khác idle, để bạn làm Elena
  [09:53] duongdn: add TuanNT vô WS James Diamond nha
  [09:59] namtv: Done
  [10:10] duongdn: Share lại TuanNT google Vinn nha
  [10:11] namtv: Done
  [14:56] namtv: Tuần trước sao TuanNT lại có giờ setup James Definitive gì nhỉ?
  [14:58] duongdn: có 1 khúc đưa bạn qua, chưa kịp làm thì trả về
  [15:00] namtv: Tao ko thấy info đó ta 🤔 Để add vào WS, bạn trước đây từng làm bên đó chưa nhỉ?
  [15:00] duongdn: khúc này nè
  [15:01] namtv: Đệt, đọc khúc đó nghĩ James Diamond
  [15:01] namtv: >Để add vào WS, bạn trước đây từng làm bên đó chưa nhỉ? Này sao?
  [15:02] duongdn: James Diamond thì trước TuanNT có làm rồi
  [15:02] namtv: Ko, Definitive ấy
  [15:02] namtv: Bên finance cần đảm bảo log đúng project
  [15:02] namtv: Record cũ thì ko thấy, nhưng ko chắc
  [15:03] duongdn: hình như ko có, coi task log cũng ko thấy xuất hiện bạn
  [15:36] namtv: NEW	LongVV	Chiều	06/10/2026	Đi tái khám dạ dày Time Long vẫn đang dư phải ko?
  [15:41] duongdn: uhm, hiện ko có gì rõ ràng, và có dev back up nhiều mà
  [14:01] namtv: Bên mày đang có mấy onboarding checklist overdue nha PhucVT Speedventory	Bailey Joey PhucVT Definitive Guide	James Le Ch ⚠️
  [08:47] duongdn: Bailey cũng đang release dần rồi, dev tạm idle chờ test/feedback Ta đem TuanNT qua James Definitive phụ làm task upgrade
  [08:48] namtv: uhm
  [07:50] namtv: Vụ model ko xem được web, nhiều khi nó trả lời làm mình lầm tưởng là nó xem được nha. Ví dụ kêu nó xem web và tóm tắt, n
  [07:50] namtv: Screenshot 2026-10-08 at 7.47.59 AM.png
  [07:52] namtv: Tuy nhiên, thực ra nó là data của nó đã được train, nó lôi ra trả lời, chứ ko phải nó visit. Xem reasoning sẽ thấy  "Mea
  [07:52] namtv: Screenshot 2026-10-08 at 7.48.17 AM.png
  [09:47] namtv: Nào rảnh lên đây discuss vụ Maddy miếng
  [11:08] duongdn: lên đây
  [15:30] namtv: Hú VuTQ với LeNH lên phòng Nova giùm tao phát. Add room hú mà nãy giờ ko thấy accept
  [15:32] namtv: Đã gọi Lễ
  [15:35] duongdn: ko thấy Vũ đâu cả
  [15:47] namtv: Xong rồi nha
  [21:58] duongdn: tình hình Maddy này thì mình còn tiếp tục vụ làm trước report sau ko? Task log tuần này ta thấy vẫn xuất hiện tiếp cái n
  [23:18] namtv: Ko nha
  [23:18] namtv: Time dư qua làm James Definitive đi
  [09:44] duongdn: ok để nói team
  [13:52] duongdn: ta thấy mi update doc rồi nhưng vẫn còn 2 phần của seasion 5, đọc thì nó cũng khá ngắn nên chắc vẫn sẽ gộp lại 1 nha
  [14:14] namtv: uhm, tùy mày xem nội dung thế nào. Có thể từ mấy sessions trước đó rút ra một số thứ cần trình bày ở khúc đó cũng nên ⚠️
  [21:13] namtv: Bên Brad, thấy data contact đang là Zhenke Xu (zhenkexu763@gmail.com). Sao lạ hoắc vậy ta. Có ấn tượng gì ko?
  [21:18] namtv: Search email thì ra khứa dev nào đó: https://zhenkexu-portfolio.vercel.app/
  [08:40] duongdn: Đây là email đã invite và làm việc với mình bên Slack
  [15:00] namtv: Mình biết nó là ai ko? Như search bên trên thì nó là dev, nên tao chưa có gửi
  [15:01] namtv: Ngoài ra, bên Andrew Taraba info contact đang là Jeff Snider (info@bizurk.net). Gửi mail bị bounced back, với lý do là m
  [15:02] duongdn: Brad ko biết, theo trí nhớ thì là 1 người bạn của ổng, invite vào discuss scope mới rồi đi luôn tới giờ Lúc ổng quay lại
  [15:03] namtv: Kiếm mail ông Brad đi
  [09:01] duongdn: ta miss cái này, mới action cho Definitive Guide Còn PhucVT bên Bailey thì đang setup thì bạn qua dự án khác tới giờ chư
  [14:13] namtv: Hoàn thành mấy cái theo thực tế thôi. Còn lại coi như treo, exception
  [14:53] duongdn: Vụ quarterly feedback, bên Franc feedback là which email address did you use from our company? Because I haven't receive
  [14:55] namtv: Ah, chắc do mail của Francesca, chứ ko phải Doruk 🤔
  [14:56] namtv: florenz@radiodatacenter.com
  [14:57] namtv: Chậc, kiểu này hơi khó ta. Data chắc phải chia ra owner và current contact 🤦
  [14:58] duongdn: dmetiner@radiodatacenter.com
  [14:58] duongdn: trong Slack thì email của Doruk thế này
  [15:48] duongdn: Mới mó được 1 email này của brad brad@auctionwarehouse.com.au
  [15:49] duongdn: ổng đã từng gởi email cho Carrick

### !OIrgPraJWrcDTnRVLQ:nustechnology.com — 18 messages
  [08:57] duongdn: Hi LeNH, task log for 2026-09-14 is missing (0h logged). Please update when you can. Thanks!
  [08:50] duongdn: Hi LeNH, task log for 2026-09-16 is missing (0h logged). Please update when you can. Thanks!
  [08:12] lenh: Hôm nay em xin làm remote nha. Vì lý do sức khỏe không ổn để lên cty làm. Em có gửi email cho anh rồi
  [08:39] duongdn: bên James có gì gấp ko, ok thì off luôn đi em
  [08:40] lenh: Dạ, hiện tại thì chưa có gì gấp. Sáng giờ cũng chưa thấy ai bên James réo
  [08:40] duongdn: ok vậy off đi em
  [08:40] duongdn: báo cus
  [08:41] lenh: ok, thanks anh
  [09:26] duongdn: Hi LeNH, task log cho ngày 21/09 (James Diamond) đang là 0h, chưa thấy note nghỉ phép. Nhờ em cập nhật lại task log giúp
  [08:55] duongdn: Hi LeNH, task log for 2026-09-22 is missing (0h logged). Please update when you can. Thanks!
  [08:29] duongdn: Hi LeNH, task log for 2026-09-23 is missing (0h logged). Please update when you can. Thanks!
  [09:02] duongdn: Hi LeNH, task log for 2026-09-23 is still missing (0h logged). Please update it today. Thanks!
  [09:01] duongdn: Hi LeNH, task log for 2026-09-24 is missing (0h logged). Please update when you can. Thanks!
  [21:02] duongdn: Hi em Em viết task log nha, đã là tối t6 rồi BTW, a thấy rất hok OK về action viết task log của em Gần như lúc nào check
  [21:02] duongdn: ===== Nếu có thời gian, em đọc lại giúp a cẩm nang làm việc nhân viên, phần task log nha
  [21:07] lenh: ok anh, em noted
  [21:08] lenh: Em sẽ khắc phục vào tuần sau
  [08:50] duongdn: Hi LeNH, task log for 2026-10-05 (Mon) is missing (0h logged on Workstream, incl. James Diamond). Please update when you

### !oofREYAXHsvPWEOJev:nustechnology.com — 78 messages
  [09:20] thuyltt: image.png
  [09:20] thuyltt: uống chung ko
  [09:21] duongdn: ui ko được rồi mình ko uống được strongbow :D
  [09:21] thuyltt: ủa nó có chất gì bạn dị ứng hả
  [09:22] duongdn: ko biết nhưng uống vào hay đau bụng, bị nhiều nên ko dám uống nữa chắc cồn trong đó thuộc loại ko hợp với D :D
  [09:22] thuyltt: ok, zậy mốt uống khác thì rủ 🙂
  [09:22] thuyltt: * ok, zậy mốt uống khác thì rủ =))
  [09:23] duongdn: OK bạn :D
  [20:56] duongdn: Report week 14/09 James Diamond Web: 32h/32h (off 1 day dùng paid leave) LeNH: 32h/32h (off 1 day dùng paid leave) Mobil
  [15:11] thuyltt: > Mobile: 30h/30h > AnhNH2: 16h/16h > ThangN: 14h/14h Sorry t quên hỏi. Job này thường làm có 20h à, tuần này sao làm hơ
  [15:20] thuyltt: à quên chắc Dương ko nắm task mobile, để t hỏi MinTV
  [15:20] thuyltt: * à quên chắc Dương ko nắm task mobile, để t hỏi MinhTV
  [09:16] duongdn: này có info gì update cho D ko
  [09:17] thuyltt: là vụ này hả Dương?
  [09:17] thuyltt: T có check với Minh, sau đó confirm Năm (delivery) vì dính h charge. Nam con discuss Minh, chưa chốt
  [09:17] thuyltt: Gui trc cho D nắm
  [09:19] thuyltt: Minh: e có dặn dev là chỉ làm 20h thôi, có thể có time làm quen, setup các kiểu. --> T có nhờ Minh review lại xem charge
  [09:20] duongdn: ok bạn
  [09:48] thuyltt: FYI - Updated:  NamTV: Thực tế spent thì đúng, nên report ko đổi. Còn vấn đề tại sao nhiều vậy thì hẳn là do idle nên cứ
  [13:37] thuyltt: Hi mn, T gửi danh sách tổng kết **giờ làm (trong giờ chính thức, ko tính PT) tuần 14 - 20/09**: Note: **các effort train
  [13:37] thuyltt: image.png
  [13:48] duongdn: ok rồi nha bạn
  [09:36] thuyltt: t lại đang uống strongbow nè =))
  [09:36] thuyltt: khi nào có gì khác strongbow mà bạn ún được, hú t cụng =))
  [21:06] duongdn: Report week 21/09   James Diamond   Web: N/A   - LeNH: N/A      Mobile: 20h/20h -   ThangN: 20h/20h   ---   Marcel   Duo
  [21:07] duongdn: * Report week 21/09 James Diamond Web: N/A - LeNH: N/A (đang yêu cầu bạn bổ sung task log) Mobile: 20h/20h - ThangN: 20h
  [21:18] duongdn: * Report week 21/09 James Diamond Web: 40h/40h <del>N/A</del> - LeNH: 40h/40h <del>N/A (đang yêu cầu bạn bổ sung task lo
  [21:20] duongdn: có update nha bạn
  [14:35] thuyltt: Hi mn, T gửi danh sách tổng kết **giờ làm (trong giờ chính thức, ko tính PT) tuần 21-27/09**: Note: **các effort trainin
  [14:35] thuyltt: image.png
  [14:36] duongdn: ok rồi nha bạn
  [16:09] thuyltt: > Note: authorize Marcel chỉ có 1h, 40m còn lại ổng đã approve sẽ gởi bonus Có thể Dương báo rồi (lúc KH approve) nhưng 
  [16:11] duongdn: à ko, chưa gởi, thấy lúc nào cũng chốt t2 nên chờ bạn nói mới gởi :))
  [16:11] thuyltt: vậy gửi giùm t hen
  [16:11] thuyltt: done báo t hỉ
  [16:15] duongdn: done
  [15:06] thuyltt: Mới nhận dc bonus của Marcel, mà ổng gửi $40 lận (đúng ra gửi $20 à). Ổng có báo gì ko Dương ơi? Nếu ,ko Dương hỏi giùm 
  [15:18] duongdn: hic mới check msg, tui gởi lộn số … sorry bạn :(
  [15:35] thuyltt: huhu :(((
  [15:38] thuyltt: doi chut, để coi lại nên sao. Chắc trừ lại trong tuần này he. Xóa bớt tracker (tương ứng 40m), hoặc nếu tuần này làm lố 
  [08:31] thuyltt: Chốt vầy he! Duong nhan cho ong nam lun. Sorry bao nhầm. $20 dư m sẽ trừ vô tuần này
  [22:33] duongdn: ok bạn
  [23:23] duongdn: Web: 40h/40h20m   LeNH: 37h/37h   TuanNT: 3h/3h20m (20m setup)   Mobile: 20h/20h   AnhNH2: 20h/20h   ---   Marcel   Duon
  [23:23] thuyltt: Marcel tuan trc noi authorized chi 1h Vay tuan nay lố 1h40 ha?
  [23:24] thuyltt: & ong se gui bonus?
  [23:24] duongdn: uhm như cũ thôi
  [23:25] thuyltt: Ok. De t2 coi lai & báo số tien (sẽ trừ $20 dư tuạn trc ra)
  [23:25] thuyltt: Ma m co hỏi ong & ong ok lam them & trả bonus roi dung ko?
  [23:27] duongdn: chỉ hỏi ổng có approve làm hay ko thôi, do giờ Marcel chuyển qua cần xin trước khi làm còn thanh toán sao thì ko có hỏi,
  [23:28] thuyltt: Xin trc khi làm là m phai nói estimate luôn ko?
  [23:28] duongdn: hok, bug và investigate thôi, ko có est được
  [23:29] thuyltt: À. Ủa ma sao tuan trc ong chu dong noi bonus, sao ong biet nó sẽ lố authorized nhỉ?
  [23:32] duongdn: do ổng chỉ set authorized là 1h, đang làm nó báo hết nên nhắn ổng yêu cầu tăng rồi ổng nói sẽ gởi bonus lần này thì chỉ 
  [23:33] thuyltt: Dung ra cứ nhắn nhu lan trc nha... lỡ đâu biết lố h, ổng sẽ kiu stop :x
  [23:33] thuyltt: Lan nay thi lỡ roi. De mai/t2 t nhan so tien roi bao lun
  [23:34] thuyltt: Lan sau cu báo ong khi estimate/đang làm thấy lố authorized he
  [23:35] duongdn: lần này sao nó ko có hiện lên warning đó
  [23:36] duongdn: bữa nó có hiện báo hết limit rồi, thấy mới báo, lần này ko thấy, hoặc nó có hiện mà bấm sao tắt ko kịp nhìn
  [17:35] thuyltt: T gửi thông tin cần báo Marcel gửi bonus he - Tuần này làm 2h40, mà authorize 1h nên có **1h40 lố authorized**.  - **Trừ
  [17:35] thuyltt: * T gửi thông tin cần báo Marcel gửi bonus he: - Tuần này làm 2h40, mà authorize 1h nên có **1h40 lố authorized**. - **T
  [11:31] thuyltt: sợ miss nên remind he
  [11:35] thuyltt: * T gửi thông tin cần báo Marcel gửi bonus he: - Tuần này làm 2h40, mà authorize 1h nên có **1h40 lố authorized**. - **T
  [11:42] duongdn: ok mình đã gởi nha
  [14:52] thuyltt: Hi mn, T gửi danh sách tổng kết **giờ làm (trong giờ chính thức, ko tính PT) tuần 29/09 - 02/10**: Note: **các effort tr
  [14:52] thuyltt: image.png
  [14:53] duongdn: ok nha bạn
  [22:05] duongdn: Report week 05/10   James Diamond   Web: 40h/42h   - LeNH: 40h/40h   - TuanNT: N/A /2h (bạn tự làm ko được yêu cầu, đang
  [22:14] duongdn: * Report week 05/10 James Diamond Web: 40h/ 40h <del>42h</del> - LeNH: 40h/40h - TuanNT:  0h/0h (log nhầm dự án Andrew) 
  [22:15] duongdn: updated
  [14:44] thuyltt: Hi mn, T gửi danh sách tổng kết **giờ làm (trong giờ chính thức, ko tính PT) tuần 05-12/10**: Note: **các effort trainin
  [14:46] duongdn: OK nha bạn
  [14:46] thuyltt: hom qua luc goi t là chay tới đâu rồi =)))
  [14:47] thuyltt: quá dữ, lên xe mà chưa biết đi đâu luôn =)))
  [14:49] duongdn: mới ở nhà thôi
  [14:50] duongdn: cầm cái thiệp mới phát hiện địa chỉ ở trong, bên ngoài ko có :))
  [14:53] thuyltt: ua neu con o nha thì cái ruột thiệp đâu mất mà Dương ko coi dc =))
  [14:55] duongdn: ở công ty á, đem về cái vỏ thôi
  [15:00] thuyltt: thua =))

### !PuUvZhU9_P0LLiTaChV8Rl6sj1IIolEGvuS07a7q02k — 7 messages
  [14:02] duongdn: hi em
  [14:02] duongdn: mình có meeting lúc 2h
  [14:02] duongdn: sorry a lu bu quá quên remind
  [14:02] tienph: dạ
  [14:03] duongdn: 3L nha
  [14:03] tienph: giờ vào luôn chưa a
  [14:03] duongdn: uhm

### !QEbdvaMJkTurMpRPIX:nustechnology.com — 13 messages
  [08:50] phucvt: Hi anh, anh Năm nói em start làm bên Bailey nha anh
  [08:53] duongdn: uhm
  [13:54] phucvt: Hi anh, từ hôm nay em back lại full bên Metastamp. Nên e chưa có start bên Airagri + Definitive Guide nha anh. Bên Defin
  [13:55] duongdn: ko nha, e cứ làm Arthur đi, nhắm khi nào xong
  [13:56] phucvt: Em chưa nhận transfer đầy đủ từ anh Tiến, mà thấy estimate tới 54h. Chắc cũng phải giữa tuần sau mới xong nếu không có p
  [13:57] duongdn: ok a note
  [11:46] phucvt: Hi anh, chiều nay em có hẹn tái khám răng, nên em xin phép về sớm 1h nha anh. Tối em làm bù lại
  [11:47] duongdn: OK e
  [08:54] phucvt: Hi anh Dương, hôm nay em không khỏe nên xin off nha anh. Bên metastamp thì e có nhắn a Chiến, ảnh ok rồi. Còn bên James 
  [08:56] duongdn: ok e
  [11:45] phucvt: Alo anh, anh có còn dùng Gemini ko anh? Nếu ko thì e lấy slot cho bạn khác dùng á anh
  [11:45] duongdn: à uhm lâu quá rồi ko dùng
  [11:45] duongdn: em lấy đi

### !REHrfFEAbXFvTMlBLY:nustechnology.com — 5 messages
  [16:44] vitht: A ơi mai a cho e họp với a cỡ 10'' e nói cái này cái được hem a
  [16:44] duongdn: ok e
  [16:45] vitht: Dạ e cám ơn a nhiều 💗
  [08:39] vitht: Dạ a ơi cỡ 9h mình họp đc hông a, để e book phòng lun ạ
  [08:41] duongdn: ok

### !RlDBmHJkbksrxefMGn:nustechnology.com — 13 messages
  [08:46] datnt: Hi anh, anh ơi cho em xin Credentials vô Stripe Dashboard của Rick bên Kunal - Fountain với ạ, em đang cần vô đó check w
  [08:47] duongdn: Báo Trinh request lên anh Năm, chị Bình, a Chiến nha Account chỉ có DM request lên công ty
  [08:47] datnt: dạ oki anh
  [08:59] datnt: hi anh, anh ơi anh cho em xin cái link claude gửi về mail của kirk@niktechnology.com với nha anh, nó out em ra claude co
  [09:00] duongdn: OK e
  [09:01] duongdn: https://claude.ai/magic-link#f22b1a82fc8f3f653b7ca9a5910cab23:a2lya0BuaWt0ZWNobm9sb2d5LmNvbQ==
  [09:02] datnt: dạ oki em cảm ơn anh
  [10:39] datnt: hi anh, anh check giúp em **Proxy status** trong **Cloudflare DNS Record** của bên Fountain - Kunal 4 cái thằng này với 
  [10:39] datnt: * hi anh, anh check giúp em **Proxy status** trong **Cloudflare DNS Record** của bên Fountain - Kunal 4 cái thằng này vớ
  [10:41] duongdn: hết coi được rồi
  [10:41] duongdn: bị 2fa
  [10:41] duongdn: muốn xem thì phải nhờ ổng xin code login thôi
  [10:44] datnt: hmmm cái này chỉ check thử cho đúng cái checklist AI ổng kiu thôi á anh, nên chắc em skip cái này luôn

### !rwLbvLBnrRAYMaOPaD:nustechnology.com — 25 messages
  [08:57] duongdn: Hi KhanhHH, task log for 2026-09-14 is missing (0h logged). Please update when you can. Thanks!
  [08:57] khanhhh: da ok a
  [11:20] khanhhh: Hi a Dương, nay e bị cảm, sổ mũi, đau đầu nên a cho e xin chiều nay off nghỉ ốm được ko ạ.
  [11:25] duongdn: OK e
  [11:25] duongdn: Aysar nếu có cus đang nói gì thì báo off để họ khỏi chờ
  [11:26] khanhhh: dạ ok a để e báo họ ko available chiều nay, sẽ back lại vào mai
  [11:47] khanhhh: A Dương e thấy ông Ronan có replied message riêng a process tiếp nha
  [13:06] khanhhh: Hi anh Dương, chiều nay a cho e xin vào trễ tí nha a tầm khoảng 14h. Do laptop e của e hư nên mượn máy e làm slide và th ⚠️
  [13:16] duongdn: ok e
  [16:26] khanhhh: E thấy James Defitivide guide có msg nha a Dương
  [16:27] duongdn: uhm
  [08:57] duongdn: Hi KhanhHH, memo Upwork Aysar ngày 23/09 có 1 dòng chưa đạt yêu cầu Hourly Payment Protection: "Handle feature: Allow te
  [09:00] khanhhh: da ok a
  [09:03] khanhhh: e updated nha a
  [08:35] khanhhh: Ronan  [10:32 PM] I've submitted a review - great working with you Carrick
  [08:35] khanhhh: Ronan có nhắn nha a
  [08:35] duongdn: OK w
  [09:14] duongdn: Hi KhanhHH, Workstream task log ngày 08/10 đang 0h, trong khi Upwork (Aysar/Baamboozle) có ~6h20m (#705 dark mode, #722 
  [10:40] khanhhh: Useful Links <del>http://localhost:3000/mailpit/</del> -> http://localhost:8025/mailpit/
  [10:42] duongdn: rồi
  [14:52] khanhhh: Hi a, ông Franc ổng đang onl a process tiếp đánh giá của công ty nha
  [14:52] khanhhh: ổng đang onl tranh thủ
  [14:52] khanhhh: * ổng đang onl tranh thủ a
  [14:52] duongdn: chỉ remind thôi, có ... tiếp gì đâu ..
  [14:53] khanhhh: à e thấy ổng hỏi email company gì á

### !SeUEiIwonoInzrJhQX:nustechnology.com — 27 messages
  [16:49] hangdtt: Anh ơi,  Cho em gửi danh sách mentee anh phụ trách đợt này ạ. Anh cho em xin lịch cố định hàng tuần anh có thể dành cho 
  [16:49] hangdtt: DuongDN.png
  [16:50] hangdtt: Em note thêm: DongNV: hồi đầu năm, bạn có chia sẻ: bạn tự thấy phát triển (về lộ trình & cả tư duy) m tai Cty ko đi lên 
  [16:51] duongdn: ok, ngoài VuTQ ra, a ko quen các bạn trên, cho thêm info để nói chuyện nha, chứ nhiêu đây ko biết nói gì cả
  [16:52] duongdn: ngày:  base trên info trên,  VuTQ  rõ rồi thì T6 tuần sau đi
  [16:55] hangdtt: Dạ,  DongNV: là như em note ở trên, nên mới đưa bạn vào ds ạ TienPH: như a Năm note: Chủ yếu tạo kết nối và xem bạn có v
  [16:58] duongdn: note em ghi là: coi mục K
  [16:58] duongdn: a có cái file của e đâu mà biết note gì nhỉ
  [17:00] hangdtt: dạ đây ạ
  [17:03] duongdn: ok
  [17:04] duongdn: Vậy TienPH 02/10 DongNV 09/10 Mỗi bạn 1 tuần
  [17:07] hangdtt: dạ cám ơn anh
  [17:08] hangdtt: anh có muốn hẹn khung giờ nào luôn ko ạ
  [17:12] duongdn: đầu giờ chiều đi
  [17:15] hangdtt: dạ ok anh
  [14:13] hangdtt: Vậy TienPH 02/10 -> Anh ơi, ngày này bạn TienPH off ạ. Nên anh có thể dời qua sớm 1 ngày, ngày 1/10 được không ạ? giờ nà
  [14:13] duongdn: ok, trưa mai đi
  [14:15] hangdtt: dạ, vậy e book phòng 11h30 ạ
  [14:15] duongdn: ý là qua trưa á
  [14:16] hangdtt: dạ vậy là như cũ, 2h ạ
  [14:16] duongdn: ok e
  [14:00] hangdtt: Hi anh,  Nhờ anh sắp xếp cập nhật mentoring report vào link này giúp em ạ (case bạn VuTQ, TienPH): https://forms.gle/Uo4
  [14:05] duongdn: OK e, done
  [14:06] hangdtt: dạ cám ơn anh
  [08:58] hangdtt: Hi anh, Bạn LongVV có đăng ký mentorship: Nhờ anh sắp xếp lịch mentoring cho bạn giúp em (Em gửi trước thông tin để anh 
  [09:03] duongdn: tuần sau nha , chắc đầu h chiều t6 như thường lệ
  [09:03] hangdtt: dạ cám ơn anh ạ

### !SHdFKwrYpRhWJBtiBv:nustechnology.com — 24 messages
  [15:38] vutq: image.png
  [08:12] vutq: nay 9h hơn em mới tới cty nha anh
  [09:33] vutq: anh Dương ơi anh có nắm account DigitalOcean không ạ - để login rồi em báo Kunal lấy 2FA ⚠️
  [09:33] duongdn: kunal@fountaingifts.com - Ks586258625
  [09:01] vutq: bên phía Cloudflare thêm giúp em cái subdomain test.fountaingifts.com luôn nha anh Dương
  [09:15] vutq: * bên phía Cloudflare thêm giúp em cái subdomain test.fountaingifts.com với test.infinityroses.com luôn nha anh Dương
  [09:24] duongdn: trỏ vào đâu vậy em
  [09:25] vutq: dạ đây - 206.189.224.97
  [16:07] vutq: check giúp em 2 cái subdomain phía trên với anh Dương ơi ⚠️
  [16:10] duongdn: ui sorry
  [16:10] duongdn: lu bu quên luôn
  [16:10] duongdn: để làm ngay
  [16:15] duongdn: rồi nha
  [16:16] vutq: dạ oke thank anh
  [08:13] vutq: nay cũng 9h hơn em mới tới cty nha anh
  [11:10] duongdn: sorry a có issue gấp t6 a làm quên họp luôn …  tuần này e có time ko? có đang full bên nào ko
  [11:10] vutq: dạ full thì không
  [11:11] vutq: anh Dương cứ lựa 1 ngày là được 🫡
  [11:12] duongdn: vậy trưa nay đi ha
  [11:12] vutq: dạ oke
  [11:16] duongdn: 2h 3L chiều nay nha
  [14:05] vutq: em vô 3L rồi á anh Dương
  [08:08] vutq: nay 9h hơn em mới tới cty nha anh
  [08:48] duongdn: OK

### !tGBJevbuSmjqVePBPN:nustechnology.com — 61 messages
  [13:32] halt: Hi anh, Bên KH James Le Chevalier, em có gửi 2 invoice dưới đây cho KH. Do lâu rồi mình mới gửi invoice lại nên em không
  [13:40] duongdn: OK em
  [13:41] duongdn: done
  [09:27] duongdn: Ổng trả lời lại All received thank you, if you could let your finance team I'll aim to issue payment for both this week
  [13:27] halt: Dạ e note ạ
  [15:35] halt: Hi anh Nhờ a nhắc KH James Diamond thanh toán bill tháng 8 giúp e vs ạ, bữa giờ e gửi email dí mà KH chưa pay hay trả lờ
  [15:36] duongdn: nay mình báo off nên để tuần sau nha
  [15:36] halt: Dạ ok anh
  [14:05] halt: A ơi nay nhờ a nhắc ô James Diamond thanh toán giúp e vs nha
  [14:08] duongdn: à ok e
  [15:06] halt: KH James Diamond có trả lời khi nào thanh toán ko ạ? Nếu ổng chưa trả lời nhờ a remind lại ổng giúp e nha
  [15:08] duongdn: a remind rồi nha
  [09:21] halt: Hi a, E remind job sau có note cần lưu ý . A xem và confirm nha Tuần 21/9 AnhNH2 off cả tuần => ThangN làm thay => Remin
  [10:39] duongdn: ok e
  [15:08] halt: A ơi bên ô James Diamond có trả lời gì ko ạ, vẫn chưa thấy ổng pay
  [15:09] duongdn: hok có nha
  [15:10] halt: nhờ a tag thẳng tên ổng vô dí lại giúp e nha, nhắn ổng bên manager mới complain sao lâu chưa thấy ô thanh toán
  [15:11] duongdn: OK
  [15:42] halt: Bên ô James Diamond có online trả lời gì ko a nhỉ?
  [15:27] halt: Bên ô James Diamond đã thanh toán rồi ạ
  [15:28] duongdn: ngon lành
  [16:12] halt: A ơi cho e hỏi thăm bên Marcel có báo khi nào sẽ gửi bonus ko ạ?
  [16:13] duongdn: ko em, ổng nói sẽ gởi thôi
  [16:13] halt: Chắc a nhắc ổng phát giúp e nha
  [16:14] duongdn: OK e
  [16:01] halt: A ơi cho e hỏi bên Maddy tuần Sep 14 - Sep 20 mình có để lại 3h report sau, phần này KH vẫn chưa approve task đúng ko ạ,
  [13:44] halt: Hi a, E remind job sau có note cần lưu ý . A xem và confirm nha Tuần 28/9 cho mượn LeNH => PhucVT bù => Remind job James
  [13:48] duongdn: OK e
  [14:33] duongdn: Marcel báo pay rồi nha
  [14:38] halt: Hi Kevin, Marcel F. sent a bonus of $40.00 to Dau D. Please note that payments can sometimes take up to 5 business days 
  [14:39] halt: Oh e tưởng có $20 thôi, sao ổng gửi tới $40 lận a nhỉ
  [14:39] halt: * Oh e tưởng có $20 cho 40m của tuần trước thôi, sao ổng gửi tới $40 lận a nhỉ
  [22:31] duongdn: này discuss với T rồi nha
  [22:32] duongdn: để a hỏi lại team, đáng lẽ ngày 25/09 phải có 1 record như vậy
  [22:32] duongdn: * để a hỏi lại team, đáng lẽ ngày 25/09 phải có 1 record report cho task đã làm trước
  [22:39] duongdn: bạn update rồi nha, em xem lại
  [10:05] halt: image.png
  [10:06] halt: E thấy hình như bạn mới thêm dòng này, là tuần 21/7 mình report 2.5h thôi chứ ko phải 3h đúng ko ạ
  [10:32] duongdn: đúng rồi e
  [10:33] duongdn: 3h là của task khác
  [10:33] duongdn: của tuần trước đó
  [10:33] duongdn: e kéo qua tuần sau sẽ thấy
  [09:27] halt: Hi a Nhờ a hỏi giúp e bên Kunal KH đã thanh toán bill tháng 8 chưa ạ, mình vẫn chưa thấy link thanh toán hay tiền về. Bữ
  [09:28] halt: Nay Trinh off nên nhờ a hỏi ổng giúp e vs ạ
  [09:28] halt: * Nãy giờ Trinh đi đâu ko thấy nên nhờ a hỏi ổng giúp e vs ạ
  [09:36] duongdn: thấy bạn hỏi Kunal và đã trả lời rồi
  [09:36] duongdn: bạn chưa revert lại cho e à
  [09:36] halt: Dạ e cám ơn anh, để e follow tiếp vs bạn, e mới thấy bạn gửi ạ
  [15:41] halt: Hi a Bên Marcel cần KH gửi bonus $30, nhờ a nhắc KH gửi giúp e nha
  [15:47] duongdn: ok e
  [15:51] duongdn: done
  [15:15] halt: A ơi cho e hỏi thăm bên Marcel có báo khi nào sẽ gửi bonus ko ạ? Nếu ổng chưa trả lời gì, nhờ a remind lại KH lần nữa gi
  [15:16] duongdn: ổng nói hôm nay, chờ xem ...
  [14:38] halt: Hi a Cho e hỏi job James - Definitive Guide - TuanNT bạn có 2.5h set up, mình có charge ko ạ?
  [14:38] halt: * Hi a Cho e hỏi job James - Definitive Guide - TuanNT tuần trước bạn có 2.5h set up, mình có charge ko ạ?
  [14:40] duongdn: ko em, a nhớ a đã bỏ nó rồi mà ta  Chắc a chưa save
  [15:06] halt: Bên Marcel chưa thấy ổng gửi bonus, nhờ a hỏi lại ổng giúp e nha
  [15:10] duongdn: ok e
  [15:11] duongdn: a remind rồi
  [08:52] duongdn: image.png
  [08:52] duongdn: Marcel gởi

### !tjCgQZrjJvNUoslbCn:nustechnology.com — 5 messages
  [14:36] duongdn: E báo vụ feedback cho Kunal chưa em
  [14:38] trinhmtt: em chưa, em k có thông tin gì vụ này á
  [14:38] duongdn: group direct manager đó em
  [14:38] trinhmtt: em bị miss tin nhắn để em check ạ
  [14:47] trinhmtt: em send roi nha anh

### !yyJnNcIvUcujaKyCDC:nustechnology.com — 7 messages
  [14:29] anhttl: anh Dương ơi, anh vô phòng Nova họp chút nha, anh Năm nhờ em nhắn ⚠️
  [14:30] anhttl: Giờ luôn ạ
  [10:27] anhttl: anh Dương ơi, anh có đang bận gì ko anh, team Elena cần anh support review lại est chút ⚠️
  [10:28] duongdn: E cứ nói
  [10:30] anhttl: Anh qua Nova được ko anh
  [10:31] duongdn: ok
  [15:36] duongdn: Em đi đâu òi

### !zfXpcHSkwqWylFrApi:nustechnology.com — 15 messages
  [13:42] chientx: Neural contract: e nhớ lv với nhau vài lần có issue các thứ, và cũng chỉ lv với dev -> sao mình hỏi collect feedback chi
  [13:59] duongdn: a nhớ đâu có issue gì đâu ta, dự án làm ổn mà,  Này lúc đầu là Năm làm, rồi anh làm, thấy khá tốt Hình như lúc sau TuanN
  [14:01] chientx: không phải không có BA thì sẽ bỏ ra, nhưng cơ bản cái này họ sẽ feedback cho cty NUS, nên nhìn chung KH nào có cảm nhận 
  [14:01] chientx: case này e ko chắc vì ít nhất e nhớ toàn lắt nhắt rồi fix issue, và còn bị complain gì đó
  [14:03] duongdn: a vẫn thấy bên Neural Contract khá ok nếu đánh gỉa cả quá trình, job cũng thú vị BTW, nếu muốn update quyết định thì mìn
  [14:05] chientx: e chỉ hỏi cho chắc th, nếu a thấy vẫn phù hợp thì cứ để đó coi ổng nói sao
  [14:08] duongdn: OK e
  [08:47] duongdn: Share TuanNT Trello và Discord Carrick nha
  [08:47] chientx: cần share gì cứ hú a Năm nha a
  [08:48] duongdn: a Năm ko thấy trả lời, vậy chờ
  [08:49] chientx: vậy để e share, tưởng a chưa hú ảnh
  [08:49] chientx: done
  [08:52] duongdn: OK e
  [13:48] chientx: [6/10/26, 12:06:10] Marcel Füssinger: Can you send this to zkteco guy JK to see his response? 🫡 [8/10/26, 12:13:38] ~ K ⚠️
  [13:48] duongdn: ok

### AI Training — 12 messages
  [09:20] namtv: Anh add các trainers, cũng đồng thời là trainee (của các sessions người khác train) nha 😄
  [09:21] namtv: Nhớ 11am nha anh em
  [10:49] chientx: Sáng nay a có pv, bạn uv đến trễ nên a có thể sẽ start trễ xíu 5-10 phút nha mn
  [10:50] tiennd: nay em làm remote, lát anh trainner cho em xin cái link google meet em join online nha
  [10:53] namtv: (Chiến là trainer hôm nay, nên mọi người delay theo nha)
  [11:12] chientx: https://meet.google.com/njx-iszm-mju
  [11:13] chientx: join Tien Nguyen
  [11:13] chientx: Tien Nguyen:
  [11:21] tamlh: anh Chien Tran approve em với
  [14:56] chientx: Session_01_AI-LLM-Fundamentals.pdf
  [14:56] chientx: Gửi mn slide hôm nay
  [15:04] namtv: Remind: như bữa họp anh có nói, các bạn có project làm cho khách hàng thì ráng spend chút time tự bù lại time training n

### Andrew Taraba - Portfolio — 61 messages
  [08:42] duongdn: Em làm bên này trước nha
  [08:42] duongdn: https://trello.com/c/EHO0KW5T/10-add-a-modal-for-pos-accepting-payment
  [08:42] duongdn: nick Carrick
  [08:43] duongdn: Tí a nhờ share Discord Carrick luôn, cus trong đó
  [08:45] tuannt: e thủ Atlassian - Carrick trong https://pass.nustechnology.com/ thì k login đc có vẻ pass sai
  [08:46] duongdn: ok tí có pass rồi vô
  [08:49] tuannt: ô cái này quen thế cái này e làm r
  [08:52] duongdn: uhm
  [09:47] tuannt: bên này e done r nha a
  [09:47] tuannt: a check qua xem
  [10:57] duongdn: OK , báo cus rồi Em fix bằng cách nào vậy
  [10:57] tuannt: e them code vao snipet code nhu ong noi anh
  [10:58] tuannt: Screenshot 2026-09-30 at 10.58.27.png
  [11:00] duongdn: OK e
  [11:00] duongdn: Có task log rồi á, e update đi
  [11:00] tuannt: da a
  [08:50] duongdn: Có cái feedback nhỏ, làm ngay rồi báo cus giúp a nha
  [08:57] tuannt: ok a
  [09:06] tuannt: e sửa và báo cus r nha
  [09:07] duongdn: sao tuần trước e ko có report miếng nào Andrew vậy Tuan Nguyen
  [09:08] duongdn: à ko có, a nhầm dư án, sorry em
  [14:26] duongdn: === Tuan Nguyen  Có msg nữa, check nha em
  [14:26] tuannt: ok a
  [14:30] tuannt: làm lun hả a
  [14:30] tuannt: nó là phần khác
  [14:30] tuannt: k liên quan đến cái modal mình làm trước
  [14:40] duongdn: nếu ổng ok thì làm
  [14:40] duongdn: ko chắc thì hỏi lại
  [16:27] tuannt: e done bên này r
  [16:28] tuannt: a check nhé a
  [16:28] duongdn: thôi a bận, e tự test báo ổng đi
  [16:28] tuannt: ok a
  [08:51] tuannt: bên này có thêm cái cần update e có làm luôn k anh?
  [08:54] duongdn: uhm e, múc
  [09:11] duongdn: Tuan Nguyen:  có task cần làm nha em
  [09:12] tuannt: ok a de e check
  [09:43] tuannt: https://wordpress-572487-4806735.cloudwaysapps.com/pos/ e de link để test
  [09:44] duongdn: a ko test nha
  [09:44] tuannt: e test trên mobile mà
  [09:45] tuannt: Username: stagingadmin Password: atJRyQqo((eUzY8GS$u)KO6j
  [09:45] tuannt: * stagingadmin atJRyQqo((eUzY8GS$u)KO6j
  [09:45] tuannt: * stagingadmin
  [09:45] tuannt: atJRyQqo((eUzY8GS$u)KO6j
  [13:31] tuannt: bên này có mấy cái update e đã xong và báo họ rồi. còn 1 cái k tái tạo được là modal đóng khi tắt và mở lại browser. e đ
  [13:33] duongdn: ok e
  [15:03] duongdn: Có msg cus nha em, từ ngày t2, script AI lỗi, hic
  [15:04] tuannt: họ bảo mình bẻ khóa plugin :))
  [15:05] tuannt: có làm k anh haha
  [15:05] tuannt: "we've done so much customization on this crappy POS system my question for you, is there a way to jailbreak the plugin 
  [15:06] duongdn: cần gì đâu, tạo 1 plugin phụ xử lí nó được mà
  [15:07] duongdn: múc luôn, mà nói để tao thử, chưa rõ làm được hay ko nha E investigate khoảng 1h trước đi
  [08:46] duongdn: sao rồi Tuan Nguyen
  [08:47] tuannt: hqa e check dc 1 chut thoi k dc chac phai setup plugin về local mới chơi đc
  [08:47] tuannt: chứ staging như này khó lắm
  [08:47] duongdn: oh
  [08:47] tuannt: còn xem code plugin nó the nào r tính
  [08:50] duongdn: tối ưu thời gian setup nha, chứ setup lâu mà check nhanh ko ổn đẩu, trong view ổng mình đã có project này trong máy lâu 
  [09:02] tuannt: Em ưu tiên bên này làm trước đúng k anh ?
  [09:06] duongdn: uhm em, cũng nhanh và chỉ có mình em
  [11:11] tuannt: e done và báo cus r nha
  [11:11] duongdn: woa nhanh thế, ok em

### Arthur - Meta-Stamp — 198 messages
  [07:15] namtv: Tien Nguyen xem message ổng nha
  [08:24] tiennd: dạ em xem rùi ạ. message này đưa báo giá cho M4 và các thứ liên quan. Chắc trong hôm nay or mai em gửi cho anh review nh
  [08:25] namtv: OK em. Trả lời tạm ổng
  [08:52] tiennd: Dạ
  [15:32] namtv: Sao rồi Tiến? Ráng tối nay gửi đi, chứ delay quá
  [15:36] tiennd: Dạ sáng h em bận bên Leo, mới xong bên Leo, giờ em xem bên đây.
  [16:17] tiennd: cái này trong hôm nay ko kịp nha anh. nó dính mấy cái catalog lúc trước Phúc làm. hiện tại em call Phúc chưa dc
  [16:34] namtv: Có gì tối xem thêm giùm anh. Đang đói, cần kiếm task làm 😞
  [16:34] tiennd: ổng này ổng ghi cái requirement lộn xộn, ko hiểu anh
  [16:34] tiennd: phải check thiệt kỹ
  [18:45] namtv: Ổng có trả lời nha
  [09:04] tiennd: anh Năm ơi, em có estimate rồi. giờ chỉ gửi số giờ cho ổng, ổng tự nhân lên thành giá tiền hay sao anh?
  [09:04] tiennd: 
  [09:06] tiennd: bên đây có 1 cái task nhỏ gấp. PhucVT có time rãnh ko anh Dương, anh Năm?
  [09:08] namtv: Gửi thông tin cho anh trước
  [09:09] namtv: Là task gì em? Ổng kêu làm hourly à?
  [09:09] tiennd: ổng ko nói rõ là làm hourly, ổng chỉ nói là  Separately and sooner: I need my July test pockets removed on both staging 
  [09:09] tiennd: dạng như xóa data test của ổng thôi anh
  [09:11] tiennd: ============= total next scope: 88h Carryover: 1. search\_pockets with no auth: 2h 2. Promote terms v1.1.0 to production
  [09:11] tiennd: * ============= total next scope: 88h Carryover: 1. search\_pockets with no auth: 2h 2. Promote terms v1.1.0 to producti
  [09:11] tiennd: * ============= total next scope: 88h Carryover: 1. search\_pockets with no auth: 2h 2. Promote terms v1.1.0 to producti
  [09:13] namtv: Duong Doan check với Tiến về cái estimate này xem hợp lý ko phát. Nhìn hơi ghê. Như cái well-known thường chỉ là ném fil
  [09:14] namtv: Task kia: Phúc làm đi
  [09:14] duongdn: OK
  [12:31] tiennd: ====================== ============= total next scope: 48h Carryover: 1. search\_pockets with no auth: 2h 2. Promote ter
  [12:32] tiennd: * # ====================== total next scope: 48h Carryover: 1. search\_pockets with no auth: 2h 2. Promote terms v1.1.0  ⚠️
  [12:33] tiennd: * # ====================== total next scope: 48h Carryover: 1. search\_pockets with no auth: 2h 2. Promote terms v1.1.0  ⚠️
  [12:33] tiennd: * # ====================== total next scope: 48h Carryover: 1. search\_pockets with no auth: 2h 2. Promote terms v1.1.0  ⚠️
  [12:33] tiennd: * # ====================== total next scope: 48h Carryover: 1. search\_pockets with no auth: 2h 2. Promote terms v1.1.0  ⚠️
  [12:34] tiennd: * # ====================== total next scope: 48h Carryover: 1. search\_pockets with no auth: 2h 2. Promote terms v1.1.0  ⚠️
  [12:35] tiennd: * # ====================== total next scope: 48h Carryover: 1. search\_pockets with no auth: 2h 2. Promote terms v1.1.0  ⚠️
  [13:16] duongdn: ok rồi nha e
  [13:24] phucvt: Tien Nguyen Cái này em có check thì kết quả như sau nha anh: - Staging: không tìm thấy creator_id 69cd70c47ce5bc1f51c034
  [15:52] namtv: Báo ổng luôn em
  [15:54] namtv: Estimate: gửi ổng đi, cái nào bỏ hay assume gì đó thì cần note rõ ra
  [16:21] tiennd: Tin nhắn estimate của em nha anh  hi @Chris Coyne Here is my estimate Carryover — 4h   • search_pockets with no auth — 2
  [16:21] tiennd: * # ====================== total next scope: 52h Carryover: 1. search\_pockets with no auth: 2h 2. Promote terms v1.1.0  ⚠️
  [16:22] namtv: Cái ai-license có gì cần investigate thế? Và sao ko phải là xem luôn để estimate? Đang chờ trigger gì?
  [16:24] tiennd: dạ em chưa có time investigate, vs ổng nói là chỉ đưa estimate time, chứ ko làm
  [16:25] tiennd: ủa khoan, em mới check lại history message
  [16:25] tiennd: em thấy mình có estimate cái đó trước đó
  [16:26] tiennd: T3. /.well-known/ai-license returns 500 with stack trace Two fixes: - Root-cause the 500 (something inside generate_well
  [16:26] tiennd: này lúc trước em investigate rùi hả Phuc Vo
  [16:30] tiennd: * Tin nhắn estimate của em nha anh hi @Chris Coyne Here is my estimate Carryover — 6h • search\_pockets with no auth — 2
  [16:30] tiennd: em có update lại cái ai-license -> 2h nha anh Nam Tran . em lấy lại estimate cũ
  [16:32] namtv: OK em
  [16:33] tiennd: em đã sent msg estimate
  [16:33] tiennd: em soạn msg báo ổng giúp anh nha
  [16:35] phucvt: Em có nhắn rồi nha anh, trong thread của message đó luôn
  [08:43] phucvt: image.png
  [08:44] phucvt: Tien Nguyen Em thấy ổng có phản hồi về estimate nha anh. Về ý Cleanup thì xíu em xem cho ổng
  [09:07] tiennd: Ok e, để anh check
  [09:07] tiennd: * Ok e, để anh check phần M4
  [09:28] tiennd: hi anh Năm, anh Dương, trong msg có 3 phần 1. Fixed Price và ngày bàn giao cho carryover + M4 (est 54h) và price for eac ⚠️
  [09:29] duongdn: chưa có bug nào est, ai cho nổi, chịu ...
  [09:30] namtv: #1: là tổng 68h? Vậy báo 2 tuần từ ngày ổng approve
  [09:30] tiennd: dạ
  [09:37] duongdn: Về bug thì mình cứ nhai lại cách giao tiếp bình thường thôi Khi có bug, việc cần làm là investigate để xem nguyên nhân n
  [10:47] phucvt: Vụ Cleanup em done nha, đã message báo Chris
  [09:06] tiennd: Ổng rep nha anh Nam Tran : David Tran, thank you for this. I'll get back to you after the weekend to schedule.
  [09:06] tiennd: * Ổng có rep vậy nha anh Nam Tran : David Tran, thank you for this. I'll get back to you after the weekend to schedule.
  [07:04] namtv: Ổng đã approve. Phuc Vo về đây full nha
  [07:06] namtv: Cụ thể làm những gì thì Phúc rõ chưa nhỉ? Chưa thì Tien Nguyen transfer
  [07:10] tiennd: hôm nay em làm cái này nha Phuc Vo  Carryover — 6h   • search_pockets with no auth — 2h   • Promote terms v1.1.0 to prod
  [08:41] phucvt: Ok anh, để e xem nha
  [08:49] namtv: Nói chung là toàn bộ cái này đúng ko? Mình tạo ticket để quản lý cho dễ nha, hình như Trello?
  [08:51] tiennd: dạ chắc nay Phúc tạo trước mấy cái làm trong hôm nay, mai em lên công ty nói Phúc tạo mấy cái còn lại.
  [11:04] phucvt: Tien Nguyen Em có tạo 5 cái tickets mới trong Trello. Có gì anh xem em có note mô tả thiếu gì, hay có gì sai ko nha anh
  [14:00] phucvt: Em thấy Chris có nhắn trong room. Em mới quay lại chưa nắm đủ context, nên chắc nhờ anh Năm hay anh Tiến xem giùm em nha
  [14:06] tiennd: Này em confirm lại ổng là cái Carryoer + M4 là mình set timeline sau 2 tuần mà
  [14:07] tiennd: Sao ổng lại muốn ngày 6/10 Tommy test nhỉ?
  [14:09] phucvt: Vậy là cũng phải tới cuối tuần sau mới đưa Tommy test hả anh?
  [14:09] phucvt: Total all là 54h thui đúng ko anh?
  [14:09] phucvt: Nếu vậy nay em start thì chắc giữa tuần sau xong rồi, nếu ko có phát sinh
  [14:09] tiennd: Uk, mà mình buffer 2 tuần
  [14:10] tiennd: Nói chung là cứ lấy mốc 2 tuần như lúc đầu mình báo.. là 13/10 Tommy mới test dc.. còn nếu mình done sớm hơn thì sẽ báo
  [14:12] phucvt: Ok anh. Để em reply ổng
  [14:12] phucvt: Mà chỉ có vấn đề về timeline thôi ha anh? Còn gì khác ko?
  [14:13] tiennd: Green light on the core: Carryover + M4 items 1–8 at your $4,860, per your Sep 23 breakdown — prod promotion and Tommy's
  [14:14] namtv: Ý ổng là 1h cleanup tuần trước sẽ thanh toán cùng với payment của scope này thôi
  [14:14] tiennd: 1h là mình có báo ổng rồi hả anh?
  [14:14] tiennd: Em nhớ là em chưa báo ổng 1h cleanup
  [14:19] namtv: Anh báo
  [14:19] namtv: > @Chris Coyne how is it going with the approval? >  > Besides that, I spent 1 hour last week to work on the cleanup. Th
  [09:43] phucvt: image.png
  [09:43] phucvt: Nam Tran Bên này có cần tạo tag mới ko anh? Hay em note giờ vô chris-hourly luôn?
  [09:44] namtv: Tag mới nha. Tiến kiếm tên đi
  [09:45] namtv: Mục đích là để thống kê, phân loại hour, fixed (fixed thì cần phân biệt scope, theo từng đợt or từng milestone)
  [09:54] tiennd: Chac Chris-Carryover-M4 hoặc Chris-M4 cho gọn
  [10:08] namtv: Em  tạo đi, DM mới tạo được
  [10:08] tiennd: dạ
  [10:12] tiennd: Phuc Vo: do M4 này nó có 2 phần chính, 1 phần Carryover + M4 (54h ) và 1 phần ADditional (14h).  nên tag đầu tiên anh tạ
  [10:12] namtv: ủa, ổng chỉ approve phần 54h à? Bữa anh thấy ổng nói approve chưa ko nói cụ thể phần nào, tưởng hết 🤔
  [10:14] tiennd: Dạ ổng có nói: Green light on the core: Carryover + M4 items 1–8 at your $4,860, per your Sep 23 breakdown — prod promot
  [10:15] namtv: Ah, message sau à 🤔 Còn message trước đó chỉ báo approve và làm đi
  [10:17] tiennd: Dạ ông chat tùm lum chổ, lúc direct message, lúc trong group :))
  [10:17] tiennd: status tới đâu rùi Phuc Vo ?
  [10:18] phucvt: 5 cái đó đã dev done và đưa lên staging, em đang test lại trên staging nha anh
  [10:19] tiennd: qua anh hỏi chút nha em
  [10:19] tiennd: mag máy qua luon
  [10:19] tiennd: :d
  [11:35] tiennd: hi anh Nam Tran do Phúc back lại Arthur, em request cho Phúc ngồi tạm chổ kế bên em ạ
  [11:36] namtv: ủa, theo sơ đồ thì bạn đang ngồi ngay bên cạnh em mà ta?
  [11:37] namtv: Hay bữa chạy tạm đi đâu rồi? Case đó thì tự quay lại nha 😄
  [11:37] tiennd: ủa, em tưởng lúc bạn chuyển qua project anh Dương bị đổi chổ tiếp :D.
  [11:37] tiennd: dạ ok anh
  [08:59] phucvt: > @David Tran, would you mind pushing your work to a branch at the end of every day, even if it is not finished? I want 
  [10:16] phucvt: Hi mấy anh, cuối giờ hôm qua em có một message gửi Chris trên room official. Nay em không thấy nữa, ko biết có ai xóa nó
  [10:17] namtv: Anh ko làm gì cả
  [10:20] tiennd: A củng ko làm gì nha Phúc
  [10:21] phucvt: Ok thanks mấy anh. Để em gửi lại message cho ổng
  [10:22] tiennd: Check thử bên DM thử
  [10:24] phucvt: Em có check rồi anh. Chắc thôi kệ do mới bị lần đầu, để e gửi lại
  [13:51] namtv: Tình hình progress sao rồi anh em?
  [13:57] phucvt: Một số task em đã xong và báo ổng để xin deploy lên production. Còn một số còn lại đã dev done, em đang test ở local cho
  [13:58] phucvt: Ổng cũng có một số request nhỏ (1-2h) và lớn. Nhỏ thì em có estimate và gửi ổng rồi, lớn thì đã investigate và phản hồi 
  [14:00] phucvt: * Một số task em đã xong và báo ổng để xin deploy lên production. Còn một số còn lại đã dev done, em đang test ở local c
  [09:01] tiennd: Phuc Vo: plan tuần này của em nha  PhucVT làm xho xong Arthur, còn lại làm James - Definitive
  [12:17] phucvt: Hi anh Nam Tran. Ổng có đưa 1 list cần làm thêm và hỏi mình ok với budget cuối cùng là $5,000 không (ban đầu là $4,860) 
  [12:18] phucvt: Em thấy không hợp lý để làm cho ổng hết với budget là $5,000. Em từ chối ổng, trình bày rõ và nói những phần mình có thể
  [12:21] namtv: Estimate những cái thêm mà ổng cần trước anh xem
  [12:21] namtv: Từ list cụ thể đó để anh xem nên nói chuyện với ổng sao
  [12:22] phucvt: Ok anh
  [13:42] phucvt: - A: accept the proTunes sheet as is (4h) - B: one upload makes every row a listing-only pocket (3h) - D: agent/UA + net
  [13:42] phucvt: * - A: accept the proTunes sheet as is (4h) - B: one upload makes every row a listing-only pocket (3h) - D: agent/UA + n
  [13:43] phucvt: Nam Tran: Em gửi estimate nha anh. Phần từ  "C: per-track metadata page (1h)" trở xuống là ban đầu em tính ok làm cho ổn
  [13:52] namtv: Để anh xem
  [14:08] namtv: Anh có gửi message
  [14:08] namtv: Em trả lời mấy ý còn lại luôn nha
  [14:09] phucvt: Ok anh
  [13:22] phucvt: Nam Tran Ổng có reply trong DM nha anh. Em cũng đang soạn message reply ổng. Về status thì em đang deploy staging nha. M
  [13:25] namtv: Cái item 1h đó thì báo $90, discount 10% còn $81 nha. Thấy ổng viết cả nùi gì... em xem trả lời kèm báo giá kia
  [13:26] phucvt: Ok anh
  [17:06] phucvt: Update: Em đã deploy Carryover + M4 lên staging và báo cho Chris. Em cũng đã quay lại James - DefinitiveGuide để làm vào
  [09:22] phucvt: Ổng có một số feedback + approve làm Training addendum page ($81). Em đang xử lý nha. Xong e quay lại James - Definitive
  [09:27] namtv: OK em
  [08:04] namtv: Ổng có message, trong đó có đoạn này là đúng ko ta? >One thing outside the gate: Tommy found the keymap/ai endpoints (ex
  [08:42] phucvt: Ok anh. Em đang check nha
  [08:59] phucvt: Nam Tran: Mấy endpoints keymap/ai này là ổng làm nha anh. Em mới tra lại commit. Vậy em investigate + estimate luôn nha 
  [09:04] namtv: OK em
  [10:56] phucvt: > 2. One status pass. Please go down your seven items plus the four carryover items and mark each one done / partial / n
  [10:59] namtv: Hết rồi
  [11:00] namtv: Còn cái bên trên chưa estimate nữa thôi
  [11:06] phucvt: Ok anh
  [11:07] phucvt: Cái bên trên em xem thì chắc khoảng 2h á anh. Mình vẫn là $90/h và discount 10% cho ổng như cái trước đó hay sao anh?
  [11:11] namtv: uhm
  [14:42] namtv: Message ổng sao mình ko trả lời nhỉ? Phúc off thì Tiến cũng cần trả lời tạm gì đó
  [14:46] phucvt: Em có nhắn ổng hôm nay mình chưa check cho ổng được, nên mình sẽ check sau rồi nha anh
  [14:48] tiennd: ủa nay Phúc off hả, em tưởng Phúc remote. Mốt có gì gửi mail cc anh với nha Phúc
  [14:49] phucvt: Ok anh
  [09:25] phucvt: Nam Tran Tien Nguyen Message mới của ổng có 2 phần là các yêu cầu và bugs. Về các yêu cầu thì em có investigate và đưa r
  [09:26] phucvt: Còn về 2 bugs UI ổng raise thì e có tái hiện được rồi, em đang plan để fix cho ổng luôn
  [09:27] phucvt: * Nam Tran Tien Nguyen Message mới của ổng có 2 phần là các yêu cầu và bugs. Về các yêu cầu thì em có investigate và đưa
  [09:40] namtv: Tiến xem 3 items đó có cái nào dạng đúng ra cần làm trong scope ko nha. Dạng như common sense hay gì đó du ko nói tường 
  [09:41] tiennd: dạ em đang discuss vs Phúc bên ngoài
  [09:41] phucvt: Cái item 1 em mới trao đổi với a Tiến xong, đang coi làm đơn giản hơn giảm thời gian estimate lại cho ổng
  [10:51] phucvt: * Nam Tran Tien Nguyen Message mới của ổng có 2 phần là các yêu cầu và bugs. Về các yêu cầu thì em có investigate và đưa
  [10:54] tiennd: hi anh Năm, em có discuss lại với Phúc, thì phần số 2 đúng ra phải làm trong scope. Ban đầu trong estimate của em là the
  [10:54] tiennd: * hi anh Năm, em có discuss lại với Phúc, thì phần số 2 đúng ra phải làm trong scope. Ban đầu trong estimate của em là t
  [10:54] namtv: Làm cho ổng luôn đi
  [10:54] namtv: (ko charge)
  [10:55] tiennd: dạ vậy 2h cleanup sáng nay với fixbug cũng ko charge luôn hả anh?
  [10:55] namtv: Trong scope thì charge gì 🤔
  [10:56] tiennd: cai item 1 vs item 3 là ngoài scope á anh
  [10:56] namtv: Cái anh trả lời là cho số 2 em nói mà
  [10:56] namtv: Rồi clean up, fix bug liên quan gì?
  [10:57] tiennd: dạ do bữa giờ cleanup mình có charge 1h. em tính hỏi anh là sáng cleanup item 1 vs item 3 có charge không
  [10:57] namtv: Anh ko hiểu, 1 với 3 là cái gì? Nếu là message của Phúc thì nó là tính năng mà, clean up gì
  [11:03] tiennd: á nhầm, sorry anh. em bị lộn. Sorry anh
  [11:04] tiennd: * hi anh Năm, em có discuss lại với Phúc, thì phần số 2 đúng ra phải làm trong scope. Ban đầu trong estimate của em là t
  [11:04] tiennd: * hi anh Năm, em có discuss lại với Phúc, thì phần số 2 đúng ra phải làm trong scope. Ban đầu trong estimate của em là t
  [11:04] tiennd: * dạ vậy 2h clariify requirement sáng nay với fixbug cũng ko charge luôn hả anh?
  [11:08] phucvt: Vậy em chốt lại là: giờ clarify item 1 và 3 thì ko charge và báo ổng estimate sau khi update. Item số 2 thì báo là mình 
  [11:09] phucvt: Nam Tran: Scope M4 mình còn 2h, vậy mình lấy nó charge cho item #2 và fix bug luôn được ko anh? Giờ lố ra thì ko charge
  [11:10] namtv: Cái này có ý nghĩa gì nhỉ? Làm thì cứ log WS đúng actual thôi, ko có set giờ charge, do là fixed cost, bên finance ko qu
  [11:11] namtv: * Cái này có ý nghĩa gì nhỉ? Làm thì cứ log WS đúng actual thôi, ko có set giờ charge (để default = actual), do là fixed
  [11:13] phucvt: > Làm thì cứ log WS đúng actual thôi, ko có set giờ charge (để default = actual), do là fixed cost, bên finance ko quan 
  [11:15] phucvt: Nếu vậy hôm bữa em có làm thêm cho ổng 1h. Vậy cái này phải note tag là Chris-hourly mới đúng, vì bên finance chỉ nắm fi
  [11:15] namtv: Đúng rồi, tag cho đúng
  [11:16] phucvt: Giờ em update lại được ko anh? Update tag cho giờ của tuần trước 🙏
  [11:53] namtv: Tuần trước có à? Có tường minh với ổng ko? Chứ hiện tại chỉ có 1h ghi nhận từ tháng 9 đó
  [11:56] phucvt: Có á anh. Cái tháng 9 là cái "Clean up (1h)". Còn cái tuần trước là "Training addendum page (1h)"
  [11:56] phucvt: Mình có estimate và ổng approve làm rồi á anh
  [16:34] namtv: Hôm nay vẫn release cho ổng hết được phải ko?
  [16:34] namtv: (trừ mấy cái CR đang chờ ổng)
  [16:35] phucvt: Đúng rồi anh, em đang test lại nha. Xong em báo ổng
  [10:00] tiennd: Bên ông có msg nha Phuc Vo  David Tran David — Tommy and I ran the gate on production today. I'm getting everything toge
  [10:02] phucvt: Ok anh, em đã reply nha. Này chắc ok thôi, đợi ổng feedback
  [08:55] phucvt: Nam Tran Hi anh, Chris có message đề cập đến payment, nên a xem giúp em nha. Còn các issues ổng feedback thì em đang xem
  [09:02] namtv: Anh đã trả lời
  [09:02] namtv: Mà cái này là cái gì ta? 1 list gì đó đang discuss với ổng à? >Items 5 and 6: attribution and the owner's ledger. The le
  [09:04] phucvt: Item 5 và 6 là 2 cái đầu task trong M4 mình đã làm á anh. Theo ổng nói là hiện tại chưa đúng ý ổng muốn
  [09:06] namtv: Ổng có message nha, ko rõ em read chưa hay bị anh read mất
  [09:07] phucvt: Ok anh, em thấy rồi nha, để e reply ổng
  [09:13] namtv: Cái training addendum page này là 1 cái CR, vẫn là fixed cost, ko phải hourly. Bữa mình gửi estimate ổng approve thì anh
  [09:15] phucvt: Ok anh, vậy hiện tại trên Workstream em note đúng rồi. Ko cần update gì
  [09:24] phucvt: Ổng có message nha anh, về payment
  [09:26] namtv: Anh react confirm rồi nha

### Automated Test — 14 messages
  [08:45] datnc: Tuần này nha a Năm, em có spend vài giờ - Setup và dùng đc appium mcp - tiến hành check testID & feedbacks lại dev về nh
  [07:33] datnc: E gửi report tiến độ áp dụng AI bên team QC tuần này nha a Năm: - Support bên Thành dùng Appium MCP, chạy demo vài cases
  [10:20] namtv: >OpenCode có update mới: em đã dùng được websearch tool mà không cần mò/config gì nhiều. Cùng với đó có tool mới là web 
  [10:24] namtv: >Viết skill để agent dùng được Redmine (đọc board, log bug, v.v...) và đã transfer cho các bạn dùng thử. Em dùng browser
  [12:08] datnc: Dùng nó để check cái gì đó technical như tìm một cái html elements nào đó hoặc css thui anh mấy case kiểu vậy,etc..., cò
  [12:10] datnc: Browser á anh, trong skills e có noted element abc cho nó tự interact cho nhanh theo ý user, còn nào anh rảnh setup mcp 
  [12:11] datnc: * Dùng nó để check cái gì đó technical như tìm một cái html elements nào đó hoặc css thui anh, mấy case kiểu vậy, monito
  [09:27] datnc: À hiện em đang không có dùng nhiều time cho bên mình như plan ban đầu (20h) nha a Năm. Vì Leo tăng giờ QC (có charge) lê
  [09:29] namtv: OK em
  [10:00] datnc: Em thấy các bạn bên team em xài OpenCode Desktop hay dính cái này: "Provider request failed with HTTP 413" -> và cái ses
  [10:07] namtv: Cái này chắc do config host. Nó limit 5MB. Anh mới tăng lên 100MB
  [17:22] datnc: E gửi report tiến độ automation bên QC tuần trước & tuần này nha a Năm: - Bên repo cũ (Selenium + Appium): đang refactor
  [17:27] datnc: * E gửi report tiến độ automation bên QC tuần trước & tuần này nha a Năm: - Bên repo cũ (Selenium + Appium): đang suppor
  [20:33] namtv: OK em

### Aysar Khalid - Baamboozle — 16 messages
  [10:02] duongdn: cuối tuần này Khánh off, trước khi đi transfer cho LeNh Franc và Aysar để có gì LeNH xử lí nha
  [10:02] khanhhh: da ok a
  [16:08] duongdn: Thêm Rory nữa nha
  [16:56] khanhhh: Hi a Le Ngo a có time ko e lên transfer 3 dự án a check giúp e trong mấy ngày em nghỉ phép với ạ
  [08:32] khanhhh: Le Ngo: Giờ e làm tiếp các task bên Aysar trước có updates gì mới mấy ngày qua a rảnh transfer lại cho e nha a
  [08:54] lenh: mấy ngày không có gì mới hết em. Còn y nguyên 🤣
  [13:38] duongdn: Cò msg nha @kha
  [13:39] duongdn: * Cò msg nha Khanh Ho
  [13:39] khanhhh: da ok a
  [16:26] duongdn: Feedback memo Upwork Tracker tuần này (Aysar): memo ngày 08/10 và 09/10 "Handle feature: Allow free subscriptions given 
  [08:42] duongdn: https://baamboozle.slack.com/archives/D068T8J1A4X/p1791754856902829
  [08:42] duongdn: Khanh Ho:  Aysar cho làm mấy cái AI toolbar rồi nha
  [08:43] khanhhh: da ok a
  [11:26] duongdn: WS báo còn 1 item client report chưa check nha Khanh Ho
  [11:28] khanhhh: e done nha a
  [16:47] duongdn: Có msg nha Khanh Ho

### Bailey - BA/QC — 145 messages
  [08:58] duongdn: Cho a xin status release các task nha
  [09:01] datnc: Nào e start bên mình e coi nha, giờ e đang họp bên khác cái.
  [09:01] datnc: > I'll be in office tomorrow @Amy  regarding payment of grazing and all others obviously anything that's not finished an
  [09:01] datnc: Mà có vẻ là ko khả quan lắm mn.
  [09:02] duongdn: report bên a Năm đi ...
  [09:03] datnc: Này Trinh Mai report nha, e ko có ở bên cái room bên đó.
  [10:15] datnc: Ưu tiên, e vẫn muốn trong tuần này nếu có thể - Grazing Software Desktop - Console Rail Upgrade Sau 2 con trên: - Mobile
  [10:15] datnc: * Ưu tiên, e vẫn muốn trong tuần này nếu có thể - Grazing Software Desktop - Console Rail Upgrade Sau 2 con trên: - Mobi
  [10:15] duongdn: Trinh Mai:  xem report cái a Năm yêu cầu nha, nó là cái report t2 hôm qua chưa làm đó
  [10:38] vynl: image.png
  [10:38] datnc: Giờ a Dương muốn log bug gì tụi e log hộ nè anh :"))!
  [10:38] datnc: Redmine sáng giờ ảo quá...
  [10:40] duongdn: vl ...
  [10:40] duongdn: báo a Năm nha
  [10:40] trinhmtt: hqa em cũng bị
  [10:56] duongdn: Dat Nguyen:  Trinh Mai  Hiện tại QC mình đều log effort = 0 à? Trừ task test RDS ?  Hồi bữa a có nghe discuss gì với chị
  [10:58] datnc: Task mới sẽ chia ra nha a. Này toàn task đã làm và est trc đó rồi.
  [10:58] datnc: Nên mình follow rules cũ bên sheet tasklog cho đỡ rối.
  [11:00] datnc: Với còn cái này mn có ý kiến gì không? Này chắc nặng phần documentation bên BA là chính nhỉ (BA có charge ko ta :"))!)? 
  [11:01] duongdn: này hourly, cứ làm nhiêu thì charge nhiêu thôi
  [11:01] trinhmtt: **#Tested on Live:** [Console] [Maintenance] Incorrect Total Purchase Price on PO [Console] Console Pallet Barcode Uniqu
  [11:02] datnc: Ổng nhờ mình est đó anh :"|. vậy Mình báo nó hourly hả? Vụ Documentation. [thread: 1 reply]
    └ [11:03] duongdn: yes, cái này sao mà est được ... ngồi review, tổng hợp lại thôi, báo progress daily
  [11:02] trinhmtt: Dat Nguyen: double check vs em vs
  [11:03] duongdn: [MAINTENANCE] SELLING PRICE ISSUE Dispute? Là ko chịu trả ?
  [11:05] trinhmtt: dạ, cái này dev log là 9h check cái gì í, nhưng mà Amy vs bác còn đang tranh cãi nó có phải là bug k á anh
  [11:06] datnc: Trên slack là đang chờ ổng confirm coi ổng muốn fix nó kiểu gì, e có đưa solution rồi. Context: Logic của ổng, ổng ko ti
  [11:09] duongdn: này chắc ko gọi là dispute đâu, cứ request charge đi, investigate issue cũng là 1 hoạt động bình thường mà
  [11:09] duongdn: còn ổng ko chịu trả tính sau, lúc đó tùy bên công ty nưa
  [11:11] trinhmtt: dạ okie anh
  [11:11] trinhmtt: v em bỏ nó vô in progress
  [11:11] trinhmtt: v để em gửi qua group kia ạ
  [11:16] duongdn: ok, vấn đề tiếp theo là task cần test có vẻ nhiều quá hả Dat Nguyen
  [11:16] duongdn: 1 mình Vy đủ ko
  [11:16] duongdn: request thêm QC hỗ trợ đi
  [11:17] datnc: C B mới hỏi e mang Vy đi chỗ khác mà e khóc lóc năn nỉ dữ bạn lại đó anh 😂
  [11:17] datnc: Khổ quá khổ gòi... Do apps mình lớn, logic phức tạp.
  [11:20] duongdn: xin đi, ko được thì cứ nói a, ít nhất có câu trả lời cho bên Nam về progress test
  [11:20] duongdn: đang có rất nhiều task đang deployed trên staging
  [11:43] duongdn: a biết ngay a Năm sẽ hỏi
  [11:44] duongdn: coi nc với Đạt rồi trả lời nha Trinh :D
  [11:44] duongdn: image.png
  [11:44] duongdn: tôi lanh lắm :D
  [11:50] datnc: Hả, e đang đi hỏi c B.
  [11:50] datnc: Để coi resource QC ntn.
  [13:18] datnc: C B bảo Vy sắp xếp giảm giờ Alissa nha tăng qua Bailey. Còn bên e thì vẫn như plan tuần trc anh, chắc cỡ 10-15h cho bên 
  [14:37] datnc: A Duong Doan ơi tuần trc a add hộ e cái tag monitor tuần trc nha.
  [14:37] datnc: E bị lỗi gì đó ko add tag đc cho cái tag đó của anh.
  [14:39] datnc: WEEKLY MONITOR SEP 2026
  [14:39] datnc: Này nha anh.
  [14:39] duongdn: rồi em
  [16:52] datnc: > No problem @Amy  Ill be in a later today [1:54 PM]After that I will take the rest of the week off but from next on I w
  [16:52] datnc: Ổng có update plan available của ổng nha mn.
  [14:58] duongdn: [Prestashop] Grazing Software Filters Dat Nguyen  Vy Nguyen status cái này thế nào mn
  [14:59] datnc: Cái đó như OK nhỉ Vy, nó chỉ là cái filter phía back office, bữa release ổng ko feedback gì ở đó thì phải.
  [15:02] vynl: T hong nắm cái này nha Dat Nguyen , vào tets từ scope grazing software desktop thôi
  [15:05] datnc: Thế thua gòi, chắc là nó ổn đó anh, ổng cũng ko có feedback, nào e rảnh thì retest lại. Nhớ là cái đó e có test lúc dev 
  [15:14] duongdn: vậy báo ổng test rồi go live đi, trong lúc chờ 2 thằng kia
  [15:15] datnc: Như nó đi chung với th Grazing Desktop đó anh.
  [15:17] duongdn: nữa à :))
  [15:17] duongdn: ok lại chờ hôm nay
  [15:21] datnc: Về logic thì chắc lên trc đc, cơ mà e nghi code chung branch thui, phải tách ra thêm effort nữa. Và sợ bug :v.
  [15:24] duongdn: check với dev xem, ok thì go live trước (ngày mai nha)
  [09:59] duongdn: ==== Cus đã bắt đầu test mấy cái mình release chưa
  [09:59] duongdn: để còi release đòi tiền chứ ...
  [09:59] duongdn: nói ổng nha, lâu quá rồi :(
  [10:09] datnc: Ổng có test gz desktop rồi anh và có 1 mớ feedback, Trinh đang xem. Còn staging2 console, hôm nay e có time thì validate
  [15:32] duongdn: feedback grazing sao òi mn
  [15:33] duongdn: upgrade console nữa
  [15:40] datnc: Em đang smoke test lại Console upgrade nha anh, hiện thấy 1 con bug mới đã log cho Vũ. Nếu yên ổn thì mai e rước ổng tes
  [15:44] duongdn: ok, còn Grazing sao òi
  [15:45] trinhmtt: xử 1&2 bug nhỏ nữa là live đc nha anh
  [15:47] duongdn: ngon lành
  [15:52] duongdn: Rồi go live lại chưa mn
  [15:52] duongdn: upgrade, grazing
  [16:09] datnc: Release staging thôi anh, ổng test OK mình mới Live đc. 😂 Upgrade: Sáng e có test thì ko có vấn đề gì phía Console cơ m
  [16:16] datnc: Hình như còn con bug tạo supplier từ Console -> Pres. Cơ mà e nghĩ fix sau đc, do chiều Pres -> Console có work.
  [16:17] duongdn: dí ổng test Grazing để go live nha
  [16:17] duongdn: Console thì cứ fix cho hết đi
  [16:17] vynl: Bên upgrade RDS còn 1 bug nữa thì release dc với bên upgrade rails cũng còn 1 issue chưa fix xong nữa https://redmine.nu
  [16:18] duongdn: chia nhau fix cho nhanh òi release
  [16:22] datnc: Ủa mà khoan... e hỏi ngu xí... Mình loy cái RDS qua staging2 console (rail 6). Gòi cho ổng test staging2. OK mình live p
  [16:23] duongdn: theo lí thuyết thì nên từng cái,  nhưng theo như các bug e nói thì ko có bug code, chỉ có bug data, nên cả hai cũng được
  [16:25] datnc: E nhớ có bug crashed do sql... vậy thui mình cứ để như hiện giờ đi 😂
  [16:25] duongdn: discuss với team đi rồi quyết định
  [16:25] duongdn: về mặt cost thì a muốn release cả hai
  [16:26] duongdn: có tiền cả hai
  [16:27] datnc: Để e hỏi Vũ xem. Do phía em thì release cái RDS riêng ở staging1 hơi khó (Phía ổng sẽ có test vì có feature mới trên sta
  [16:28] datnc: * Để e hỏi Vũ xem. Do phía em thì release cái RDS riêng ở staging1 hơi khó (Phía ổng sẽ khó test vì có feature mới trên 
  [16:28] datnc: Vì cả 3 thằng đó đều là regression test cả...
  [10:03] duongdn: dí ổng test Grazing để release đi mn
  [10:03] duongdn: lâu quá rồi
  [10:42] datnc: Như Trinh đã báo rùi, tí e nhắc lại xem.
  [10:42] datnc: Ổng có bảo là ngày làm còn ngày off xem kẽ gì đó... em ko rõ nay ổng có ngoi lên khum, hum qua thì không thì phải.
  [09:39] duongdn: > Vậy vẫn còn nhiều ở Testing on staging và Deployed on staging, sao nghe chị Bình nói bên này nhả bớt 20h QC nhỉ? Năm h
  [09:45] datnc: Mấy tasks đó nó phải lên sau Console Upgrade anh, nên nó hiện không priority cho lắm, nên nếu cần QC bên nào gấp thì mìn
  [10:25] datnc: Ủa cái Grazing mình done con bug ẩn cái item khỏi mobile view là live đc đúng ko Trinh Mai ?
  [10:25] datnc: Cái CR là làm sau đc mà đúng ko?
  [10:25] trinhmtt: dạ mới done
  [10:26] trinhmtt: em báo khachs rui, chờ bác okie là live đc nha
  [10:26] trinhmtt: CR tính sau cũng đc
  [16:10] datnc: Screenshot 2026-09-30 160133.png
  [16:10] datnc: Em thấy có cái request này hiện lên bên em, bên Trinh ko thấy thì phải? Vụ này a Dương có triển chưa vậy anh Duong Doan 
  [16:11] datnc: Như chỉ có DM thấy thì phải, em mới đc assign cái assistant DM gì đó gần đây...
  [16:11] duongdn: rồi báo chị Bình đi tự nhiên role e hiện   hi
  [16:11] duongdn: * rồi báo chị Bình đi tự nhiên role e hiện chi
  [16:13] binhnt: Assistant là nhận dc đó. để ta xem improve tính năng
  [17:22] trinhmtt: Hi @Joey, Here are the items that have been deployed to Live. Please review them when you have a chance and arrange the 
  [17:22] trinhmtt: Duong Doan: review giúp em nha anh
  [18:32] datnc: [CONSOLE] USE AVERAGE PURCHASE PRICE WHEN ADDING STOCK MANUALLY [CONSOLE] HISTORICAL PURCHASE ORDER 2 con này overbudget
  [09:19] datnc: https://globalgrazingservices.slack.com/archives/D01C1253PFB/p1790928508789429 Nhớ rep cái này nha Trinh Mai .
  [09:29] duongdn: > <@datnc:nustechnology.com> [CONSOLE] USE AVERAGE PURCHASE PRICE WHEN ADDING STOCK MANUALLY > [CONSOLE] HISTORICAL PURC
  [09:29] duongdn: báo rõ lên room
  [10:44] duongdn: ok nha em, e gởi cus và báo room đi
  [15:40] datnc: https://globalgrazingservices.slack.com/archives/C0B890HLA8J/p1791275555964089?thread_ts=1791172677.839319&cid=C0B890HLA
  [15:40] datnc: Như ổng paid rồi nha Trinh Mai , với có hỏi payment method kìa.
  [16:00] datnc: Vụ filter a rep bên /grazing-software rồi nha, để né chỗ đó ra.
  [16:00] trinhmtt: hinh như bác nhầm task hả anh
  [16:01] datnc: Hông biết, đang hỏi thêm. Có thể ý ổng là cái CR mà chưa làm ấy?
  [16:01] datnc: A ý ổng là cái đó hả?
  [16:01] trinhmtt: tại bác chụp là cái GS desktop
  [16:02] trinhmtt: còn task mình đòi tiền là task khavs
  [16:02] datnc: Thế em clear vô đi nha =.=... Ụa mà... cái đó sao rồi? Có giờ est đồ báo ổng chưa?
  [16:02] datnc: https://globalgrazingservices.slack.com/archives/C06NAP7067P/p1791276475044689
  [16:06] duongdn: vụ upgrade sao rồi mn
  [16:07] duongdn: nó cũng là 1 task ko nhỏ,
  [16:07] datnc: Released staging rồi anh, chờ bác check thôi nha.
  [16:09] datnc: A mới check qua cái draft e viết, như ý ổng là cái này đúng nhỉ? Vậy em clear rồi est làm cái CR đó lẹ đi nha :"|...
  [16:11] trinhmtt: dạ okie anh
  [16:12] duongdn: OK mn
  [16:12] duongdn: vậy coi wrap up để release thôi
  [16:13] datnc: Anh đang rep bác rồi, em coi est rồi start con đó lẹ nha Trinh Mai ...
  [15:15] duongdn: #Testing on staging [Prestashop] Display Relationship Between Original Orders and Split Orders [Console] Alternative Ref
  [15:16] duongdn: Dat Nguyen:  Vy Nguyen  Trinh có report list danh sách đang test, hiện đang rất nhiều và ko thấy có update gì vài ngày g
  [15:23] datnc: Nguyên đám trên chung một release của advanced split đó anh, nó sẽ live sau con Upgrade. Hiện có bugs bên đó do internal
  [15:23] datnc: https://redmine.nustechnology.com/projects/bailey-paturevision/issues?issue_id=81271%2C81297%2C81310%2C81314%2C81319%2C8
  [15:24] datnc: Hiện em thấy còn quá trời issues new dev chưa đụng vô á 🤔.
  [15:24] datnc: Có mấy cái thuộc CR thì đang chờ clear với ổng để làm req (Redmine có CR trong title).
  [15:25] datnc: * Nguyên đám trên chung một release của advanced split đó anh, nó sẽ live sau con Upgrade. Có 1 task nhỏ lẻ nằm trỏng nữ
  [15:28] datnc: * Nguyên đám trên chung một release của advanced split đó anh, nó sẽ live sau con Upgrade. Có 1 vài task nhỏ lẻ nằm trỏn
  [10:52] datnc: Thấy bác muốn call vụ advanced split kìa Trinh Mai ? Em coi thử cần thiết hông vậy?
  [11:14] datnc: Với thấy ổng paid cái missing hùi bữa rồi nè Trinh Mai . https://globalgrazingservices.slack.com/archives/C0B890HLA8J/p1
  [11:15] trinhmtt: dạ thanks anh
  [14:56] binhnt: có vẻ tuần sau thì bên này giảm QC phải ko Trinh Mai  ơi?
  [15:04] trinhmtt: em thấy còn 5 item đang test á chắc chưa giảm giờ đc á chị oi

### Bailey - Management — 135 messages
  [09:06] trinhmtt: Joey  [4:53 PM] I'll be in office tomorrow @Amy  regarding payment of grazing and all others obviously anything that's n
  [09:07] trinhmtt: Bác nói finish het thì bác mới pay ạ
  [09:08] namtv: Vậy những cái nào đã finish hết, những cái nào chưa nhỉ? Theo tình hình Dương báo thì có vẻ tuần này sẽ done hết phía mì
  [09:10] trinhmtt: [PrestaShop] Sync Queue Issue — 5.25h — $157.50 [Console] [Maintenance] Incorrect Total Purchase Price on PO — 1h — $30.
  [09:10] duongdn: Đầu tiên nhờ ổng pay 3 đứa này trước đi
  [09:10] namtv: Con fixed cost này thì sao? [PrestaShop] Grazing Software Desktop — 233.5h — $7,005.00 (Fixed cost)
  [09:12] namtv: Nói chung anh cần status từng items, chia ra từng nhóm đi, ví dụ như đã live, đã done bên mình nhưng chờ ổng test, mình 
  [09:12] duongdn: con này thì xong, nhưng sau khi release xong ổng thấy nó chưa ổn, muốn làm thêm CR mới go live luôn được ...
  [09:13] namtv: Case đó thì giải thích, cái này done rồi, mày cũng test rồi, CR là riêng
  [09:13] namtv: Và CR đâu?
  [09:14] namtv: Mình cần cái này, để tập trung wrap up thay vì dàn trải ra cả nùi chưa xong như vậy
  [11:14] trinhmtt: **#Tested on Live:**  [Console] [Maintenance] Incorrect Total Purchase Price on PO  [Console] Console Pallet Barcode Uni
  [11:22] binhnt: ds này e quản ở sheet est vs charge phải ko e?
  [11:28] binhnt: Weekly Monitor Jul 2026	PAID 4h on Aug 4 : còn thiếu 1h c chưa thấy move qua bên tháng 8 nha  Trinh Mai  ơi [thread: 2 replies]
    └ [11:42] trinhmtt: [PrestaShop] Sync Queue Issue — 5.25h — $157.50 [Console] [Maintenance] Incorrect Total Purchase Pri
    └ [11:43] trinhmtt: em tách ra đòi v nè ạ
  [11:28] namtv: Tập trung vào wrap up "#Cac task sẽ wrap up và có thể live trong tuần này:" để get paid nha
  [11:31] duongdn: OK
  [11:33] namtv: Sao testing và deployed on staging nhiều vậy ta? Đang thiếu giờ QC?
  [11:43] trinhmtt: * [PrestaShop] Sync Queue Issue — 5.25h — $157.50 [Console] [Maintenance] Incorrect Total Purchase Price on PO — 1h — $3
  [13:27] trinhmtt: dạ mới requesst thêm 10-15h QC để test bên đây roi ạ
  [14:28] duongdn: Trinh Mai:  Cus có báo đã pay cái request, update với chị Binh Nguyen  nha
  [14:30] trinhmtt: [PrestaShop] Sync Queue Issue — 5.25h — $157.50 [Console] [Maintenance] Incorrect Total Purchase Price on PO — 1h — $30.
  [14:30] trinhmtt: item đòi tiền đây ạ
  [14:35] namtv: Ổng có pay đúng số đó nha
  [14:37] namtv: Tình hình wrap up các items có thể live tuần này sao rồi nhỉ?
  [14:41] duongdn: plan hôm nay thì sẽ fix bug xong cho 3 con này [Prestashop] Grazing Software Desktop [Prestashop][CR1] Grazing Software 
  [14:44] namtv: Remind: tập trung wrap up từng phần để deliver, hạn chế dàn trải 1 nùi dang dở nha Bao gồm cả Dev và QC
  [14:45] duongdn: ui, đang micro manage luôn đây, hỏi status từng con liên quan để release sớm
  [08:59] duongdn: Hôm qua đã dev/test done , giờ sẽ release Grazing lên staging cho cus test Console thì bị dính lại 1 số issue liên kết P
  [10:10] binhnt: này c đã update vào 3 nơi:  - WS - File internal est vs charged - File external
  [11:29] namtv: Update tình hình nào Duong Doan . Có gì hú pay tiếp được chưa?
  [11:31] duongdn: Task thì mình vẫn làm như tiến độ, còn pay thì ko nhớ đã report chưa, ổng nói là phải làm xong , fix bug xong ổng mới ch
  [11:32] namtv: Trinh update lại cái list chia theo từng status đi, kèm cả số tiền từng line
  [11:32] namtv: Mấy cái upgrade bên Console xong chưa Dương?
  [11:34] duongdn: Cái Upgrade Rails thì xong rồi, còn cái upgrade RDS thì chưa, mà chắc cũng sắp rồi, 2 dev đang chia nhau làm
  [16:26] trinhmtt: **#Internal Tested on staging:** [Prestashop] Grazing Software Desktop [Prestashop] Grazing Software Filters [Prestashop
  [16:31] namtv: Cái "Testing on staging" (ko có "Internal") là ổng đã test trên Staging rồi, vậy sao chưa go live nhỉ? Nếu do ổng chọn t
  [16:32] trinhmtt: 
  [16:32] trinhmtt: nó là testing la QC đang test á anh
  [16:33] namtv: Ah, đọc nhầm 😐️
  [16:33] namtv: Vậy là cả nùi cần QC. Chị Binh Nguyen ơi...
  [16:51] trinhmtt: * **#Internal Tested on staging:** \[Prestashop\] Grazing Software Desktop \[Prestashop\] Grazing Software Filters \[Pre
  [16:52] trinhmtt: * **#Internal Tested on staging:** \[Prestashop\] Grazing Software Desktop \[Prestashop\] Grazing Software Filters \[Pre
  [15:47] namtv: Ổng ngoi lên test chứ nhỉ?
  [15:47] namtv: * Ổng ngoi lên test chưa nhỉ?
  [15:51] duongdn: ổng có ngoi lên, nhưng chưa focus vô test do có issue bên production làm hỏng data, nên focus vô sửa ổng chỉ mới test cá
  [09:35] namtv: Bên này tuần sau cần devs thế nào nhỉ?
  [09:39] duongdn: hết hôm nay chắc cũng xong hết các bug để release rồi Chờ ổng feedback để fix rồi release thôi Ta nghĩ giữ lại TuanNT th
  [09:52] namtv: Nghe cũng hơi quen...
  [09:53] duongdn: hết thiệt rồi :))
  [09:58] namtv: Dí lão test đê. Với có thêm cái nào đã go live để đòi tiền chưa?
  [10:02] duongdn: chưa có cái nào test xong cả
  [10:03] duongdn: * chưa có cái nào ổng test xong cả
  [08:48] duongdn: Còn vài bug phần scope hourly khác "Historical Purchase Order" , đang chia cho VuTQ làm luôn cho xong sớm luôn nha BTW, 
  [08:50] namtv: Dí ổng test nha
  [11:39] namtv: Update cái list này nha Trinh Mai
  [11:41] trinhmtt: dạ okie anh
  [15:17] trinhmtt: **#Internal Tested on staging:** [Prestashop] Grazing Software Desktop [Prestashop] Grazing Software Filters [Prestashop
  [16:01] namtv: Vậy vẫn còn nhiều ở Testing on staging và Deployed on staging, sao nghe chị Bình nói bên này nhả bớt 20h QC nhỉ?
  [09:29] namtv: Hú?
  [09:37] duongdn: chắc nhiều quá test ko kịp, giờ QC tuần trước 2 QC tổng là ~55h , ko ít  Tuần trước đó cũng ~43h
  [09:37] namtv: Câu hỏi tao khác mà. Chị Bình nói project tuần này trả bớt 20h QC, tao thắc mắc còn nùi cần test sao lại trả
  [09:39] duongdn: sorry, hiểu lầm cạu hỏi, để hỏi lại chị Bình và team QC
  [09:39] namtv: ủa, vậy ai là người trả vậy chị Binh Nguyen ?
  [09:41] binhnt: về testing thì c check với bên Đạt , mà hqua chưa chốt do  bạn nói giờ của bạn còn hỏi lại e v/v spend giờ cho auto ntn 
  [09:43] namtv: Bữa em còn hú nè. Có thể thêm nếu được chứ sao giảm ☹️
  [09:45] namtv: Em cũng ko hiểu giải thích của chị. Bữa chị nói trả 20h của Vy mà, liên quan gì giờ Đạt
  [09:46] namtv: Xử lý ngay cái này đi chị, cần speed up test bên này
  [10:22] binhnt: Vy vẫn đang bên Bailey đó, c chưa có rút đi đâu cả,  liên quan giờ Đạt là do bạn cũng test bên Bailey , tính giờ 2 đứa c
  [10:31] namtv: Nói chung ít nhất ko giảm so với tuần trước, tăng được thì tốt
  [15:14] namtv: Tình hình ổng test sao rồi nhỉ? Ổng delay việc test quá mình cũng sẽ phải nói chuyện để pay bớt
  [15:23] trinhmtt: mình mới loy live, mai bác test live á anh
  [16:35] namtv: Tất cả những gì mình tested staging là lên live hết à?
  [16:36] trinhmtt: daj dung roi live 3 con nay aj [Prestashop] Grazing Software Desktop [Prestashop] Grazing Software Filters [Prestashop][
  [16:26] namtv: Ổng test chưa em? Dí pay đi
  [16:26] namtv: Và update list, thêm phần đã live mà chưa pay
  [16:30] trinhmtt: bác chưa test nhung bác nói có thể request, khi nào test done thì pay liền luon ạ, để em soạn message
  [10:23] namtv: Ổng trả lời gì chưa em?
  [10:23] namtv: Mình request những phần nào, số tiền tương ứng
  [10:24] trinhmtt: Em có đưa message đang đợi anh Dương review aj, bác nói nay bác test nà ạ, bác kiu mình request thì có thể pay liền roi  ⚠️
  [15:19] trinhmtt: [Maintenance] Console Resources Maintenance – Feb 2026 – 2.5h – $75.00 [PrestaShop] [CR1] Grazing Software Desktop View 
  [15:19] trinhmtt: em đòi tiền các items này ạ
  [15:49] trinhmtt: **#Deployed on Live** (payment requested & awaiting for payment) [Grazing Software] Grazing Software Desktop view [Prest
  [14:01] namtv: Ổng trả lời gì chưa em?
  [14:03] trinhmtt: bác ngoi lên hỏi con [Prestashop] Grazing Software Filters này live roi hả, chứ chưa nói pay ạ
  [14:04] namtv: Remind bác phát nha
  [14:05] namtv: Dàn này thì đã kêu ổng test chưa? > #Internal Tested on staging: (Hnay báo khách để test ạ) > [Console] Console Platform
  [14:58] trinhmtt: dạ hqa dí bác test roi ạ
  [15:42] namtv: Ổng paid 2 cái bên dưới. Ổng có nói gì ko mà để lại 2 cái kia nhỉ? [PrestaShop] Grazing Software Desktop – 233.5h – $7,0
  [16:05] trinhmtt: >[PrestaShop] Grazing Software Filters – 18.5h – $555.00 cái này thi bác có nói k thấy tính năng, nhưng ma bacs đang nhầ
  [16:05] trinhmtt: ccòn cái còn lại k thấy bác nói gì ạ
  [16:05] namtv: Nói ổng nha
  [16:05] binhnt: ổng có pay cái này nha: [Maintenance] Console Resources Maintenance – Feb 2026 – 2.5h – $75.00 $75.00 Paid Due Oct 6
  [16:06] namtv: Ah, ở contract khác. Vậy còn cái 555 kia thôi
  [16:09] namtv: Ah, cái này là đã giải thích cho ổng rồi phải ko?
  [16:09] trinhmtt: dạ em mới giải thích roi, đang đợi bác rep ạ
  [16:10] binhnt: [Maintenance] Console Resources Maintenance – Feb 2026 – 2.5h – $75.00 này ở file  google doc cũ, ko có ở ds tag WS phải
  [16:11] trinhmtt: dạ đung roi ạ
  [16:15] binhnt: c đã update paid status vào tag và file cũ và file bên kh rồi nha
  [09:38] trinhmtt: anh Nam Tran bác có nói phí charge upwork cao quá $500, có cách nào chuyển tiền khacs cho giảm phí k á anh
  [09:39] namtv: Mịa ơi, cái này mình nói mấy lần rồi mà ổng quyết ko rời Upwork mà ta 😐️
  [09:40] namtv: Em kéo lên đoạn này, có vài message sau nữa. Lấy info nói lại ổng tiếp nha
  [09:42] namtv: Anh nhớ vụ này nói mấy lần rồi. Lần thì mình chủ động mà ổng nói muốn xài Upwork, lần thì ổng chủ động rồi mình nói các 
  [14:21] namtv: Ổng nói gì về cái $555 kia rồi nhỉ? Và đám cần ổng test staging nữa
  [14:29] trinhmtt: chưa thấy gì ạ, để em remind
  [09:25] trinhmtt: bác nói sẽ pay ạ, chắc nay mai gì đấy ạ
  [11:38] trinhmtt: bác nhăn là tuần sau mới lên office lại nên chắc tùân sau em remind lại bác $555 ạ
  [11:40] namtv: Nhắc test staging nữa nha em
  [11:40] namtv: Hôm nay tổng hợp lại status phát nữa nha
  [17:04] trinhmtt: **#Deployed on Live** (payment requested & awaiting for payment) [Prestashop] Grazing Software Filters **#Internal Teste
  [20:32] namtv: Phía mình thì sao có vẻ đứng im vậy nhỉ? Ko khác gì lần trước thì phải 🤔
  [15:48] namtv: Hú hú
  [15:49] namtv: Với remind pay. Mình có biết tuần này là lúc nào ko? T2 luôn hay T6...
  [15:58] trinhmtt: bác k noi rõ ạ, em remind roi hỏi lại bác luon ạ
  [15:10] namtv: Ổng trả lời gì chưa nhỉ?
  [15:10] namtv: Và cái này thì sao? Tình hình hiện tại thế nào?
  [15:12] duongdn: để check với Đạt
  [15:34] duongdn: Theo như discuss với team thì  + Về QC:  tuần trước thì tập trung test con upgrade Console  #Testing on staging + List n
  [15:38] namtv: Giờ đang dư time, dùng cả giờ official speed up để wrap up nhanh thôi
  [15:43] duongdn: này cũng tùy task á, ví dụ như bữa cái Grazing mấy trăm giờ, thì ta vẫn đễ làm lố budget để speedup cho mau Còn đống này
  [15:43] trinhmtt: dạ để em ngó lại
  [16:23] trinhmtt: **#Internal Tested on staging:**  [Console] Console Platform Upgrade [Console] [Maintenance] Upgrade RDS  [Mobile] [Main
  [16:32] duongdn: Hiện đâu đó đã spent  ~120h, lố kha khá rồi á, nếu cộng thêm ~16h trên nữa thì đâu đó sẽ là 136h rồi  Hiện tại còn 15 bu
  [16:36] namtv: Cần wrap up ASAP. Các bạn có task external project khác thì vẫn ưu tiên, còn giờ internal project thì lấy qua Bailey làm
  [16:37] duongdn: VuTQ có ko. có thì đem qua phụ fix bug luôn, như hiện thì bạn đang ko làm Bailey nữa
  [16:37] duongdn: btw, bạn nắm rõ project nào là internal ko?
  [16:38] namtv: Có, Vũ có 4h/day Kunal, còn lại là internal. Trinh Mai confirm lại giùm anh, bữa em nói tăng lên 4h/day cho Kunal là tuầ
  [16:39] namtv: Có
  [16:39] duongdn: ok để nói VuTQ
  [16:40] trinhmtt: Dạ đang giữ lun á anh
  [11:15] trinhmtt: [PrestaShop] Grazing Software Filters – 18.5h – $555.00. bác báo paid con này roi ạ
  [11:33] trinhmtt: 3 con này bác nói nay test nha ạ  [Console] Console Platform Upgrade [Console] [Maintenance] Upgrade RDS [Mobile] [Maint
  [14:29] namtv: Có thêm cái gì ready thì ném ổng luôn
  [14:49] binhnt: c đã update ở file và ws nha

### Cameron Batty - Appetise — 2 messages
  [14:53] minhtv: Hiep Nguyen:  thứ 6 off nên  Lu Ho  sẽ thay Hiệp làm full thứ 6 nhé. Mai transfer đầy đủ nhé, done transfer báo lại nha 
  [09:39] minhtv: Tuần 12/10 HiepNT off T6 => LuHX bù => Remind nhé

### Celine - OhCleo — 660 messages
  [08:49] hungpn: * move và kéo task rồi nha m.n - qua về anh quên báo nè
  [11:45] duongdn: cái bug performance go lvie rồi hả mn
  [11:46] duongdn: sáng nay thấy performance khá smooth
  [11:46] longvv: go live r a' a
  [11:46] hungpn: live chiều qua anh
  [11:47] longvv: mượt như sunsilk lun
  [14:22] longvv: image.png
  [14:22] longvv: bả đòi meet
  [14:22] longvv: * bả đòi meet a Minh Trinh ới
  [14:25] minhtv: uhm, a có nhắn vs Phương rồi, để a xuống lầu 3 thu thập lại latest status
  [15:21] minhtv: https://trello.com/c/8YnsHDK8/236-overall-compliance-current-library Làm rõ cái này với Phương ơi , a cảm giác mình làm 
  [15:24] phuongpvt: dạ trước đó thì e ko nắm á
  [15:25] longvv: Chắc hỏi thêm info, kêu bả giải thích thêm chi tiết
  [15:47] minhtv: Như mình discuss chỗ Suspicious Content nhét hết mấy cái track trong quá khứ lên đó, xưa giờ nó chỉ có mấy track từ lúc 
  [08:38] longvv: Bả nhắn z chắc mốt mình thêm bước test step cho bả quá
  [08:38] longvv: image.png
  [08:38] longvv: * Bả nhắn z chắc mốt mình thêm test step cho bả quá
  [08:40] minhtv: Thêm test evidence vô 1 file pdf / nếu đơn giản có thể bằng video thì dùng link youtube của Tony cũng được
  [08:53] phuongpvt: dạ a Hung Pham ơi, a xem thử task nào mình có thể viết guidance cho bả tự test, với task nào cần mình hỗ trợ với. Nếu ta [thread: 40 replies]
    └ [10:16] hungpn: https://drive.google.com/drive/folders/1OXNx_iDWoeipLdL_xiyAEiiR2-qomHTV?usp=sharing
    └ [10:16] hungpn: anh share cho em file nha Phuong Pham có gì cần hú anh nè
    └ [10:17] hungpn: còn mấy cái anh k chắc dc chắc báo bả vì nó liên quan tới tech ak
    └ [10:18] phuongpvt: dạ
    └ [10:20] phuongpvt: dạ a Long Vo ơi, còn mấy ticket này https://trello.com/c/YWnb9KpI/243-optimize-creator-search-query 
    └ [10:22] hungpn: https://trello.com/c/4expS6Vt/226-update-api-on-off-for-google-play-tags -- còn cái này chắc viết st
    └ [10:24] longvv: Lu Ho: bữa e off cái vụ này r, bên mình dc duyệt app chưa nhỉ
    └ [10:24] longvv: để e bật alij
    └ [10:24] luhx: bên android vẫn chưa dc duyệt á.
    └ [10:24] luhx: chả hiểu sao dạo này duyệt lâu ác.
    └ [10:26] minhtv: Khi submit có ẩn tính năng rồi đúng ko Lữ ?
    └ [10:26] luhx: uhm trước khi đó kêu BE off rồi.
    └ [10:26] luhx: chờ approve mới on lại rồi bấm release.
    └ [11:11] longvv: https://trello.com/c/YWnb9KpI/243-optimize-creator-search-query https://trello.com/c/P5CUcKqt/242-op
    └ [11:12] longvv: Phuong Pham: a mới update lại mess trên
    └ [11:12] phuongpvt: dạ
    └ [11:18] longvv: https://trello.com/c/OJxfCVki/219-fix-aws-sns-marketing-events-warning => AWS ko còn alert nữa
    └ [11:18] longvv: image.png
    └ [11:21] phuongpvt: anh đang share public hay sao á, em đưa link này cho bả được ko
    └ [11:23] hungpn: anh đang share public cho em nè, hay em cần private cho mình em
    └ [11:24] hungpn: bt trước đó mình làm thế nào thì em hỏi Minh Trinh thử
    └ [11:24] phuongpvt: a Minh Trinh ơi share qua gg drive đc k ạ
    └ [11:25] hungpn: share public anh sợ bả thấy chủ sở hữu là anh k?
    └ [11:26] hungpn: image.png
    └ [11:26] hungpn: or là đưa cái này lên GG của Tony ròi hãng share nếu cần
    └ [11:27] minhtv: Dùng mail Tony á , thường e upload lên Youtube để dạng unlisted, chỉ cần ném cái link cho khách
    └ [11:28] minhtv: Trong Youtube, chọn đúng Playlist là OhCleo nhé, tránh lẫn dự án khác
    └ [11:28] hungpn: cần k anh đưa lên youtobe cho em nè Phuong Pham
    └ [11:28] phuongpvt: dạ có anh
    └ [11:46] hungpn: video 3p nó lên cái rẹc mà video sau nó check gì mà lâu ghê, mãi chưa xong
    └ [13:36] hungpn: đợi youtobe lâu quá nên anh để thêm 1 cái bên GG driver nếu cần sớm thì em có thể sài nha Phuong Pha
    └ [13:36] hungpn: https://drive.google.com/drive/folders/1fpZHpaLos0tDofXlpwI21Ct2uLKioXGV?usp=sharing
    └ [13:37] minhtv: nó check gì thế a ? Screenshot e xem thử
    └ [13:37] hungpn: image.png
    └ [13:38] hungpn: k biết 3 cái sau nó đẩy lên chế độ SD gì đó nên nó lâu
    └ [13:40] minhtv: SD là chất lượng thấp, nó sẽ lên trước, sau đó nó mới đẩy HD , rồi 4K nếu có sau
    └ [15:17] minhtv: Mấy video trên youtube lạ thật, tạch hết
    └ [15:17] minhtv: bình thường em upload cả trăm cái ko sao, chắc máy a Hùng có issues gì đó
    └ [15:18] hungpn: anh có đưa lên driver em tải về up lên thử xem sao
    └ [15:53] minhtv: Video a bị gì đó, ko lên được 🤣
  [08:55] hungpn: bây giờ dò lại hết task luôn hả em, hay chỉ là list mới done trong tuần này?
  [08:55] hungpn: * bây giờ dò lại hết task luôn hả em, hay chỉ là list mới release trong tuần này?
  [08:55] phuongpvt: dạ các task trong cột ready to test á anh
  [09:19] hungpn: share anh mk account: "tony2008261412" nay vs Long Vo  oiw [thread: 1 reply]
    └ [09:20] longvv: un1vers4l1
  [09:20] longvv: a xài universe password là dc rùi
  [10:24] longvv: * để e bật lại
  [11:11] longvv: * https://trello.com/c/YWnb9KpI/243-optimize-creator-search-query https://trello.com/c/P5CUcKqt/242-optimize-like-play-c
  [11:11] longvv: * https://trello.com/c/YWnb9KpI/243-optimize-creator-search-query https://trello.com/c/P5CUcKqt/242-optimize-like-play-c
  [11:12] longvv: * https://trello.com/c/P5CUcKqt/242-optimize-like-play-count-queries => này kêu bả check tốc độ website với app là ok rồ
  [11:21] minhtv: Lu Ho:  public android đi, mới trig lỏ cho nó review done 🤣 [thread: 3 replies]
    └ [11:26] luhx: đã release nha Minh Trinh Phuong Pham  Long Vo on lại vụ config đi em.
    └ [11:26] longvv: ok
    └ [11:34] longvv: done nha a oi
  [11:22] phuongpvt: * anh Hung Pham đang share public hay sao á, em đưa link này cho bả được ko
  [14:48] phuongpvt: dạ a Long Vo ơi bả hỏi nha >Regarding the "old" subscribers on the webb that was using the webb - are you sure the subsc [thread: 2 replies]
    └ [08:55] phuongpvt: a Long Vo nay check thêm ý bả hỏi nha
    └ [09:48] longvv: ok e
  [15:21] phuongpvt: dạ a Hung Pham ơi, confirm đc ý bả hỏi ko ạ
  [15:31] minhtv: A check qua cái này thì chỉ có check database mới confirm được,  cứ báo bả mai coi
  [15:32] phuongpvt: dạ
  [09:52] minhtv: Long check message ở trên confirm cho khách vs làm task nhé
  [10:05] longvv: e da rep ba nha
  [16:06] phuongpvt: dạ a Long Vo ơi rep tiến độ cho bả nha  >Hi! Just checking in, how is it going with the tagging project?
  [16:07] phuongpvt: với a check cmt này, bả mới cmt https://trello.com/c/8YnsHDK8#comment-6aacfe7d6cd1a3c60dc4c652
  [16:07] longvv: ok e
  [15:24] phuongpvt: dạ a Long Vo ơi bả có nhắn hỏi trong thread nhé
  [15:25] longvv: ok e
  [15:36] hungpn: anh thấy cái này dev-done mà mình fix trên live luôn rồi hả @long
  [15:36] hungpn: * anh thấy cái này dev-done mà mình fix trên live luôn rồi hả Long Vo  https://trello.com/c/EJ2yxf9g/234-links-in-the-tr
  [15:36] longvv: này khác a
  [15:36] longvv: nó có cái link ở cuối transcript
  [15:37] hungpn: trên live anh vào cũng hopk thấy cái link đó nữa
  [15:37] longvv: mấy task AI nào e hú a test r thì anh đụng vô nhe
  [15:37] hungpn: là bả đã clear nó đi rồi hả
  [15:37] longvv: chắc bả clear á
  [16:05] longvv: image.png
  [16:05] longvv: Minh Trinh: bả đòi meet nhe a
  [16:08] minhtv: để xún với Long update phát
  [16:57] minhtv: Screenshot 2026-09-21 at 16.56.56.png
  [16:57] minhtv: Mọi người có vô được Trello nữa hem ?
  [16:57] hungpn: anh k vào dc, nãy còn dc mà reload là bị như em
  [17:11] hungpn: vào lại dc rồi á Minh Trinh
  [17:13] duongdn: Long Vo:  vô improve perforfmance cho Trello :v
  [09:05] duongdn: bên này hết task be ròi à mn?
  [09:06] longvv: còn á a
  [09:06] longvv: mới thấy bả move qua cả đống task
  [09:07] duongdn: ok, e có thể sắp xếp, James tạm có Phúc rồi
  [11:37] phuongpvt: Dạ a Long Vo Hung Pham ơi, 3 task này test như nào rồi ạ, task Check & implement SES email tracking khi nào a Long hướng
  [11:38] phuongpvt: image.png
  [11:39] hungpn: cái Migrate anh test rồi còn 2 cái kia anh chưa test nha
  [11:39] phuongpvt: dạ vậy a move cột task migrate nha
  [11:40] longvv: Task 3 chiều a gửi hướng dẫn chỗ a Hùng test nha
  [11:40] longvv: * Task 3 chiều a gửi hướng dẫn chỗ cho a Hùng test nha
  [13:28] minhtv: Screenshot 2026-09-23 at 13.28.51.png
  [13:29] minhtv: Hung Pham:  Long Vo  tuần này mình đã hứa xong hết mớ này , đưa cho khách test, nên cần speed up ,tránh ngâm ở Dev done 
  [13:40] longvv: Anh test gửi email qua SES giúp em nha. 1. Vào `admin.staging.ohcleo.com` và gửi một email trong tab **Test Send**. 2. S [thread: 28 replies]
    └ [13:50] hungpn: anh chưa có em
    └ [13:50] hungpn: > a có account aws chưa nhỉ
    └ [13:52] longvv: a vô workstream
    └ [13:52] longvv: e có để info trong đó á
    └ [14:15] hungpn: image.png
    └ [14:15] hungpn: anh xin account ID
    └ [14:15] longvv: 862503801714
    └ [14:15] hungpn: thêm id đó vào noted đi em
    └ [14:31] hungpn: image.png
    └ [14:31] hungpn: check dùm anh cái Long Vo
    └ [14:31] hungpn: anh mở 3 email, 4 click trong đó 3 click trong cùng 1 email và 1 click email thứ 2
    └ [14:32] hungpn: thì anh thấy ghi nhận có 2 là 2 - open, 2 - click
    └ [14:43] longvv: a test mail nào nhờ
    └ [14:47] hungpn: image.png
    └ [14:47] hungpn: 3 cái đầu
    └ [15:03] longvv: rùi
    └ [15:03] longvv: e chỉnh lại r á
    └ [15:03] longvv: image.png
    └ [15:03] longvv: này dễ thấy hơn
    └ [15:15] hungpn: sao bên view anh vẫn như cũ, anh cần chỉnh gì k?
    └ [15:15] longvv: a f5 xem
    └ [15:16] hungpn: ak dc ròi nè
    └ [15:54] hungpn: image.png
    └ [15:54] hungpn: nhưng sao số này nó giảm đi vậy Long Vo
    └ [15:55] longvv: a ấn lộn gì r đó
    └ [15:55] longvv: image.png
    └ [15:55] longvv: a để ý cục này
    └ [15:55] hungpn: ak hiểu rồi, nãy đang là theo giờ
  [13:40] longvv: * https://trello.com/c/iQuEAj6p/220-check-implement-ses-email-tracking Anh Hung Pham  test gửi email qua SES giúp em nha
  [13:49] longvv: Sau đó done a Hung Pham qua check 3 task Batch AI, e có cái link admin để bên mình dễ check hơn, trước mắt e chạy 50 cái [thread: 1 reply]
    └ [15:26] hungpn: qua nói rõ task anh vs Long Vo
  [13:56] longvv: Lu Ho: a start task này dc r á https://trello.com/c/rlig8CM6/245-cover-art-design-app [thread: 3 replies]
    └ [13:57] luhx: Minh Trinh: làm bên này hay bên sandor trước nhỉ?
    └ [13:58] minhtv: Bên này, Sandor ưu tiên sau
    └ [13:59] luhx: oke.
  [13:56] longvv: bên BE có trả về field cover_url, a gắn vô trước nha
  [13:56] longvv: * bên BE có trả về field cover\_url cho mỗi media, a gắn vô trước nha
  [13:57] longvv: fixed ratio là 16:9 đi
  [14:00] luhx: staging có phần này rồi ha Long Vo
  [14:00] longvv: đúng r nha a
  [14:00] longvv: htai chưa có data đâu
  [14:00] luhx: ủa chưa data thì sao a làm :V
  [14:00] luhx: làm nhẹ vài cái data a test với.
  [14:00] longvv: a để tạm placeholder background màu gì đó nếu null
  [14:01] longvv: oh đợi e gen vài hình trên kia
  [14:11] longvv: https://staging.ohcleo.com/trackdetail/3-tulum-beach Lu Ho
  [14:11] longvv: test track này đi a
  [14:11] longvv: đợi bà kia bả tạo api key rồi e gen hình 50 track để test
  [14:29] phuongpvt: dạ bả có rep nha a Long Vo
  [14:36] luhx: mobile done phần này nha nhưng chưa test được nào Long làm cho nó có hình nhiều nhiều thì bên mobile verify lại rồi mới 
  [15:16] longvv: https://admin.staging.ohcleo.com/dashboard/ai-batch/54f8fb86-116a-40ae-98ff-7ec3deece745
  [15:16] longvv: Có data r nhe
  [15:28] luhx: ủa sao trang home nó vẫn không thấy cái hình nào nhỉ Long Vo ?
  [15:28] longvv: e chạy 50 track thôi
  [15:29] longvv: a log admin trang này
  [15:29] longvv: vô check mấy cái track đã dc gen trong này xem [thread: 5 replies]
    └ [15:29] hungpn: image.png
    └ [15:30] hungpn: hình nằm khúc nào á nhỉ
    └ [15:30] longvv: web bả ko có kêu làm á
    └ [15:30] longvv: app thui
    └ [15:30] hungpn: ak okie em
  [15:30] luhx: vậy thì khác gì cái track detail nãy em gửi đâu, cái a cần check ở home 2 cái featured free và cái new week kìa.
  [15:30] hungpn: gửi 2 cái track mà Lu Ho muốn check xong kêu Long chạy lại
  [15:32] luhx: cái featured free nó reload app là ds khác nhau mà.
  [15:32] luhx: đâu hard dc.
  [15:32] luhx: còn list the new week chắc hard dc á.
  [15:32] luhx: Screenshot 2026-09-23 at 15.32.38.png [thread: 4 replies]
    └ [16:27] longvv: Lu Ho: e mới chạy vài cái trên home
    └ [16:30] luhx: Screenshot 2026-09-23 at 16.30.42.png
    └ [16:30] luhx: này là do hình hay sao em nhỉ Long Vo
    └ [16:31] longvv: do hình á
  [15:43] duongdn: /api/bookmarks/details/ Long Vo  A thấy có xuất hiện cái này cũng đang chậm dần, chậm nhất cũng 8s rồi Em xem report cus
  [15:43] duongdn: cc Minh Trinh
  [15:43] longvv: ok a
  [15:46] longvv: đợi e tí nha, đang xử lý vài issue r e chạy mấy cái trên home
  [16:06] hungpn: anh có việc về sớm có gì nt lên đây xíu anh về check nha m.n
  [16:51] luhx: có bản build STAGING mới nhé a Hung Pham  Android: https://drive.google.com/file/d/1YxbEfD8Ln_hOxgrSL6iO-RyTgee6iPiU/vie [thread: 3 replies]
    └ [10:31] hungpn: 1000013731.jpg
    └ [10:32] hungpn: Lu Ho: không biết sao tự nhien account bị về free và khi payment mới thì nó show lỗi này trên stagin
    └ [10:40] luhx: lỗi payment à, bên staging nhớ hồi trước lỗi này miết mà nhỉ.
  [10:39] hungpn: cái hình Cover art integration này mình tự up hả Long Vo hay hình bả đưa thế?
  [10:40] longvv: mình đưa cho con AI nó tạo [thread: 32 replies]
    └ [10:45] hungpn: tạo hình nó xấu thế nhỉ, k có full-width nhi. Mà nó nhìn như hình vuông vậy 🤣
    └ [10:46] longvv: format bả đưa là style z đó
    └ [10:46] longvv: còn xấu hay ko thì mình đưa bả xem mới bít dc
    └ [10:46] longvv: với lại mình xài model rẻ để giúp bả tiết kiệm chi phí, nên là có xấu cũng dễ hiểu
    └ [10:46] hungpn: 1000013732.jpg
    └ [10:47] hungpn: ít ra nó cũng nên như này bên track details?
    └ [10:47] longvv: này avatar của creator mà
    └ [10:48] longvv: cái background trên app
    └ [10:48] longvv: nhìn như nào đó a?
    └ [10:48] hungpn: ý anh là cái layout nó cũng tương tự á
    └ [10:49] longvv: chưa hiểu lắm á
    └ [10:51] hungpn: Lu Ho: cái chỗ show hình Cover art integration nó k có cái height cố định hả em?
    └ [10:59] hungpn: Lu Ho: cái số Folowers minh có cách nào show lên cùng 1 line vs số không em?
    └ [10:59] luhx: là sao a?.
    └ [10:59] luhx: chưa hiểu.
    └ [11:00] luhx: https://staging.ohcleo.com/trackdetail/3-tulum-beach
    └ [11:00] luhx: a thử search thằng này đi, em thấy hình bt nè.
    └ [11:00] hungpn: 1000013733.jpg
    └ [11:00] luhx: này là hình lỗi á a.
    └ [11:01] hungpn: em để ý cái dòng Folowers bị rớt dòng hok
    └ [11:01] longvv: e có gen vài hình với
    └ [11:02] longvv: https://admin.staging.ohcleo.com/dashboard/ai-batch/3655519b-f626-411d-b6c4-01f1010a299b
    └ [11:02] longvv: a vô đây check mấy hình mới của mấy track này
    └ [11:02] luhx: là a muốn nó 1 line á hả? làm thì làm dc thôi  Phuong Pham có làm không em?
    └ [11:03] phuongpvt: dạ có
    └ [11:05] luhx: oke vậy để a làm cho nó.
    └ [11:10] hungpn: này đỡ hơn nè
    └ [11:11] longvv: bữa a Lữ đưa e xem, thấy xấu quá nên e chỉnh prompt lại r
    └ [11:12] hungpn: chạy lại cho homepage đi em. đưa bả test vậy là thua rồi
    └ [11:13] hungpn: ý anh hỏi xem width vs height nó có là 1 số cố định k hay sẽ tùy theo cái image Cover art
    └ [11:29] luhx: bản mới STAGING nha a Hung Pham  Android: https://drive.google.com/file/d/1RuA-Qaoik4VtDA2TkQOzXWQJ3
    └ [13:28] hungpn: tested DONE nha Lu Ho
  [10:49] longvv: * e chưa hiểu lắm á
  [11:01] longvv: * e có gen vài hình mới
  [11:13] hungpn: * ý anh hỏi xem width vs height nó có là 1 số cố định k hay sẽ tùy theo  tỷ lệ của cái image Cover art
  [11:48] hungpn: em rảnh hok Long Vo qua chỗ anh hỏi cái này xíu nè [thread: 6 replies]
    └ [11:56] hungpn: check lại dùm anh:  - Track: Our Agreement
    └ [11:56] hungpn: image.png
    └ [11:57] hungpn: - His Best Girl: https://staging.ohcleo.com/trackdetail/his-best-girl
    └ [11:58] hungpn: image.png
    └ [16:18] longvv: https://admin.staging.ohcleo.com/dashboard/ai-batch/26268638-4d86-4b85-966b-d8e2f65c88ec
    └ [16:18] longvv: a check lại nha
  [11:56] hungpn: * check lại dùm anh list tag nó đang gắn đúng chưa nha: - Track: Our Agreement
  [11:58] hungpn: * check lại dùm anh list tag nó đang gắn đúng chưa nha: - Track: Our Agreement: https://staging.ohcleo.com/trackdetail/1
  [12:09] hungpn: https://trello.com/c/j7bzgcnL/240-cover-art-generation-investigation --- nào qua nói anh cái này luôn nha Long Vo
  [14:46] hungpn: 📲 Long Vo [thread: 12 replies]
    └ [15:03] longvv: ha
    └ [15:03] longvv: sao á a
    └ [15:25] hungpn: anh mới thấy em chạy 1 cái Retag run mới đúng k Long Vo và cái Cover scene có sự thay đổi?
    └ [15:25] longvv: đúng r á
    └ [15:26] longvv: ủa
    └ [15:26] longvv: à đúng r
    └ [15:26] hungpn: vậy cái cover arts nó có tự đông thay đổi mỗi khi em chạy mới hok
    └ [15:26] longvv: tưởng a nói cái hình sau khi ai gen ra
    └ [15:53] hungpn: image.png
    └ [15:53] hungpn: gen dùm anh cái hình này thử Long Vo
    └ [15:54] longvv: ok a
    └ [16:03] longvv: https://admin.staging.ohcleo.com/dashboard/ai-batch/f22fb977-4ad6-4de2-be96-4e3d0cbc2559
  [15:52] minhtv: Tình hình mớ dev done mai chuyển qua cho khách test được chưa a Hùng ơi ? [thread: 1 reply]
    └ [15:54] hungpn: List task tested DONE on staging: - https://trello.com/c/iQuEAj6p/220-check-implement-ses-email-trac
  [15:53] hungpn: mai có khả năng cao là được nha, nay anh check cũng gần xong rồi á
  [15:56] minhtv: okay a , deadline là mai team mình đẩy hết cho bả test trên production nhé mọi người ơi, remind lại là đã cam kết từ đầu
  [08:35] minhtv: Mấy cái task kéo ready to test nhớ có evidence nhé a Hung Pham  ơi [thread: 30 replies]
    └ [08:47] hungpn: mấy cái AI thì đưa như nào đây ta, hok lẽ đưa con AI của anh nó chạy check sao 😆
    └ [08:48] minhtv: Video thì dễ chứng minh hơn, cụ thể task nào ko chứng minh được thế a ?
    └ [08:48] hungpn: vậy chắc anh quay lại cái clip con AI anh nó chạy check sao thôi
    └ [08:49] hungpn: https://trello.com/c/j7bzgcnL/240-cover-art-generation-investigation
    └ [08:49] hungpn: ví dụ như cái này nè
    └ [08:51] longvv: cái task cover dê thôi
    └ [08:51] longvv: anh đưa cái hình mình đã gen ra
    └ [08:51] longvv: với 1 vài track đã có hình
    └ [08:51] longvv: đưa bả check
    └ [08:51] hungpn: vậy em quay anh cái video đi nè
    └ [08:51] longvv: anh quay trên app cũng dc á
    └ [08:52] longvv: track nào có cover
    └ [08:52] longvv: anh quay trúng nó là dc r =))
    └ [08:52] longvv: anh quay thôi, có gì e liệt kê ra mấy track có hình cho bả test trên task
    └ [09:00] hungpn: vậy để nhờ Lu Ho quay dùm 1 cái cho dễ
    └ [09:02] luhx: em thì khác gì a đâu a Hùng :v
    └ [09:05] longvv: e mới chạy update lại cover cho mấy cái track ở home mha
    └ [09:21] luhx: ủa rồi cần mobile làm gì nữa không nhỉ? vừa fixbug bên dự án khác.
    └ [10:15] longvv: task AI thì mobile ít lắm =))
    └ [10:15] longvv: Ngoài cái gắn cover ra thì e thấy hết r
    └ [10:23] hungpn: https://trello.com/c/EJ2yxf9g/234-links-in-the-transcriptions -- cía này quay sao Long Vo
    └ [10:23] longvv: cái đó để e cho
    └ [10:44] hungpn: https://trello.com/c/LQ5CWtkE/246-visual-direction-cover-arts cái này chắc cho bả view ở mobile là d
    └ [10:44] longvv: view ở mobile là dc rùi
    └ [10:44] longvv: dễ thì e đưa link admin cho bả check luôn
    └ [10:56] hungpn: Long Vo: Minh Trinh https://drive.google.com/drive/folders/1fpZHpaLos0tDofXlpwI21Ct2uLKioXGV  review
    └ [10:56] hungpn: evidence cảu những task anh có thể check đã đưa hết lên driver Tony nha Minh Trinh
    └ [11:02] minhtv: okay a , cứ comment trong task luôn rủi kéo task
    └ [11:18] hungpn: Long Vo: comment rồi move task golive nhé
    └ [11:19] longvv: ok a
  [08:36] minhtv: Long Vo:  nghía message khách nhé
  [09:05] longvv: * e mới chạy update lại cover cho mấy cái track ở home nha
  [10:56] hungpn: Lu Ho: chắc build 1 bản external chứ hì
  [10:57] luhx: build prod ý hả, oke a.
  [11:09] luhx: Có bản build prod mới nhé a Hung Pham Phuong Pham  iOS: 4.2.2 (1) TF Android: 33 (4.2.2) Internal testing.
  [11:29] minhtv: Long Vo:  nay e ko làm hả? Ko thấy task in-progress Hung Pham  chưa có task nào kéo qua Ready to Test
  [11:30] longvv: e bận xử vài issue bên Maddy tí e mới qua nhe
  [11:30] minhtv: Vậy bị hụt giờ bên này rùi , còn lâu nữa hem ?
  [11:30] longvv: mấy task bên to do chưa task nào estimate
  [11:31] longvv: hong lâu lắm
  [11:32] minhtv: Mấy task làm dưới 3h kéo qua làm luôn nhé.
  [13:42] minhtv: Bên Maddy xogn chưa e ? Nếu hôm nay ko có effort gì phải báo sớm
  [13:42] longvv: e xong rn he
  [13:42] longvv: * e xong r nhe
  [13:42] longvv: e đang deploy lên [thread: 1 reply]
    └ [13:47] hungpn: lên xong bóa nha
  [13:42] minhtv: Mình làm việc nhóm, khách ko thấy task nào mình đang làm hết ?
  [13:48] longvv: cái cover url e deploy lên prod rồi nha a Lu Ho [thread: 10 replies]
    └ [13:49] luhx: phá đi a Hung Pham
    └ [13:49] hungpn: phá đi Long Vo
    └ [13:49] hungpn: 🤣
    └ [14:00] longvv: https://admin.ohcleo.com/dashboard/ai-batch/5a3699a6-c04e-4add-9609-2b34bb7c8ae0
    └ [14:01] longvv: https://admin.ohcleo.com/dashboard/ai-batch/0f909eb3-3d73-4653-9ea4-f03b51fc3328
    └ [15:01] longvv: Hung Pham: mấy task lên live a check rùi kéo qua testing giúp e nha
    └ [15:20] hungpn: okie em
    └ [15:33] hungpn: https://ohcleo.com/trackdetail/ramble-subby-boy-gets-his-vbrator-controlled-while-plays-with-his-toy
    └ [15:47] longvv: image.png
    └ [15:48] longvv: Hung Pham: cái warning badge nó giải thích cho e vầy
  [14:01] longvv: * https://admin.ohcleo.com/dashboard/ai-batch/0f909eb3-3d73-4653-9ea4-f03b51fc3328 => Tags
  [14:01] longvv: * https://admin.ohcleo.com/dashboard/ai-batch/5a3699a6-c04e-4add-9609-2b34bb7c8ae0 => Cover
  [15:25] longvv: https://trello.com/c/8YnsHDK8/236-overall-compliance-current-library  Hung Pham con này thì a check trên admin là dc nha [thread: 37 replies]
    └ [15:26] longvv: Task này quét hết tracks của bả, có 1 số tracks có từ ngữ k hợp lệ mà hệ thống trc đó chưa phát hiện
    └ [16:03] hungpn: có ảnh hưởng tới trạng thái task cũ k nhỉ? đang active thành inactive?
    └ [16:03] longvv: ko a
    └ [16:04] longvv: k ảnh hưởng tới trạng thái của task cũ
    └ [16:09] hungpn: image.png
    └ [16:10] hungpn: reject xong k vaof list nayf the em oi
    └ [16:13] longvv: ok doi e ti
    └ [16:13] longvv: fix lien nha
    └ [16:25] hungpn: check lại dùm anh nè
    └ [16:25] hungpn: image.png
    └ [16:25] hungpn: trong đoạn track này có 3 từ mà bên em review có 1 từ mà cũng chưa matching?
    └ [16:26] longvv: ko match là sao á
    └ [16:27] hungpn: là em detech ra 1 từ còn bên anh tận 3 từ, 3 từ đều có trong file transcript
    └ [16:29] hungpn: image.png
    └ [16:29] hungpn: bên anh nó kiếm thêm những biến thể của từ đó nữa
    └ [16:29] hungpn: còn bên em anh đang k  biết rule kiếm như thế nào?
    └ [16:31] hungpn: nhưng em chỉ list 1 trong khi transcript có nh hơn 1 từ cấm thì chắc em fai xem lại cái rule quét và
    └ [16:31] longvv: a có dựa vô https://claude.ai/artifact/R1srZjyZfZsgfWsKn7wE1J ko?
    └ [16:32] hungpn: có nha
    └ [16:32] hungpn: em copy 3 cái text anh kiếm đc đi, xong so với file của em là biết đúng sai mà
    └ [16:44] hungpn: sửa dùm anh email lại thành email bên mình để anh check vụ gửi email xem sao nha
    └ [16:45] longvv: oke
    └ [16:45] hungpn: và nói vs bả xem có cần thiết gửi email hok nha? vì nó đã đang active giờ gửi email k biết creditor 
    └ [16:45] hungpn: reject thì nghĩ là cần, còn approved thì hỏi bả xem sao
    └ [16:50] longvv: reject thì có gửi
    └ [16:50] longvv: approve thì ko nhe
    └ [16:52] longvv: tony+123@nustechnology.com
    └ [16:52] longvv: e đổi mail r nha
    └ [16:54] hungpn: check dùm anh xem cso email nào về k
    └ [16:56] longvv: image.png
    └ [16:56] hungpn: image.png
    └ [16:57] hungpn: image.png
    └ [16:58] hungpn: golvie rồi về nà
    └ [17:03] hungpn: mình có list cứng mấy từ sẽ bị chặn, gửi anh vs Long Vo
    └ [17:07] longvv: image.png
    └ [17:07] longvv: còn cái task này mà tụi digitalocean nó bị gì r
    └ [17:07] longvv: pending deploy lun
  [16:04] hungpn: https://trello.com/c/EJ2yxf9g/234-links-in-the-transcriptions --- cái này em lên live chưa? rồi nhớ noted cho bả biết nh [thread: 9 replies]
    └ [17:46] hungpn: Long Vo:
    └ [17:46] hungpn: còn cái này chốt cái về nào
    └ [17:46] longvv: bả đang care mấy cover
    └ [17:46] longvv: e đang xử trc cho bbar
    └ [17:46] longvv: cái đó e lên live r
    └ [17:46] hungpn: ý là lên live rồi đúng k
    └ [17:46] hungpn: move task đi em
    └ [17:46] hungpn: chốt xong anh còn về
    └ [17:46] longvv: move giúp e nhe, e đang kẹt
  [16:32] hungpn: đã move hết task golive hôm nay nha, còn 1 task đang check ở staging nha
  [16:45] hungpn: * và nói vs bả xem có cần thiết gửi email hok nha? vì nó đã đang active/reject giờ gửi email k biết creditor sẽ nói sao
  [17:46] longvv: * bả đang care cái cover
  [17:55] hungpn: đã move list task test trong tuần này sang Ready to test rồi nha Minh Trinh còn 2 con mới kéo sang dev-done thì anh chưa
  [22:44] hungpn: image.png
  [22:44] hungpn: gần 7h tối bà còn kiếm hỏi estimate nè
  [22:45] longvv: Bả nhắn z thoi mình check sau
  [22:45] hungpn: thấy update lại UI cũng kha khá nè
  [09:43] longvv: Minh Trinh: Nay e làm bên đây 6h nha a, 2h cho Maddy
  [09:46] minhtv: okay, nhớ rep khách nhé
  [14:58] phuongpvt: https://trello.com/c/oDR28T7K#comment-6ab66078aa19ae64378c7c2f dạ a Long Vo ơi est cái này cho bả nha anh
  [15:01] longvv: ok e
  [15:04] longvv: Lu Ho: có screen của mobile
  [15:04] longvv: a est luôn nhé
  [15:04] longvv: BE: 8h
  [15:05] longvv: * FE: 8h
  [15:07] luhx: Screenshot 2026-09-28 at 15.07.06.png
  [15:07] luhx: ý em là cái này?.
  [15:07] longvv: dung r nha
  [15:07] luhx: nhìn tưởng là màn mobile của web.
  [15:08] luhx: này là UI của mobile web mà nhỉ, đâu phải app đâu.
  [15:09] hungpn: nhưng mà chưa thấy màn mobile mainpage nha [thread: 2 replies]
    └ [15:09] luhx: là màn gì ấy a.
    └ [15:12] hungpn: homepage á
  [15:09] longvv: để hỏi bà ấy thêm, e mới zoom ra thì có thêm 2 màn kia nữa
  [15:10] minhtv: ý của bả có update App nữa, design có thể sai , nhưng bả mention đủ web- app
  [15:10] luhx: dường như design đang chỉ là thuộc của web với view mobile thôi, còn app thì chưa thấy hỏi rõ giúp a.
  [15:16] hungpn: hỏi xem trang Category có update theo k nhé,sau khi đã đổi layout của mấy trang khác, trong design k thấy nhắc tới nè
  [15:22] phuongpvt: dạ bả kêu chưa có design của app nhưng cũng sẽ dựa trên cái mobile đó
  [15:22] phuongpvt: còn trang category thì ko update
  [15:25] luhx: vậy est tạm nhé: Track detail: 3h Creator detail: 5h dường như có update thêm API. Mainpage: chưa thấy design mobile nên [thread: 1 reply]
    └ [15:26] luhx: ở creator thấy có thêm audio most, 3 cái filter, không chắc là có cần làm API mới không nha, hoặc AP
  [15:25] luhx: * vậy est tạm nhé: Track detail: 3h Creator detail: 5h dường như có update thêm API. Mainpage: chưa thấy design mobile n
  [15:33] phuongpvt: >Could we have a meeting today so I can have an update on everything? Whats left and how much time before I can test? I 
  [15:34] minhtv: cứ okay thui, hẹn bả đê
  [15:50] longvv: Bả gửi link meeting rùi nha a
  [16:02] minhtv: Long Vo:  cái cover art mớ comment mới của bả , ưu tiên cao nhất ,xong quay lại cái re-tagging bả comment hôm T6 nhé
  [16:02] longvv: ok a
  [16:03] minhtv: Cover art update lại mớ comment , hôm nay xong ko ? Cụ thể trong 1 tiếng nữa ?
  [16:04] longvv: Có thể nha a, e đang cho AI chạy
  [16:04] longvv: Có gì e đưa link cho bả check
  [16:04] minhtv: okay e , xong là tới cái này https://trello.com/c/vqHFYzMf#comment-6ab652c60ce77fe8c7d7e04d Tầm bao lâu xong nhỉ ?
  [16:05] longvv: đống này t4 mình xử cũng lẹ thôi, cỡ 1h
  [16:06] minhtv: được thì cho run song song vs cái hiện tại
  [16:06] minhtv: trong 1 tiếng nữa luôn 😅
  [16:07] longvv: haha hy vọng kịp, kịp thì e chạy cả 2 luôn
  [16:09] minhtv: 2 task này tính bằng tháng kể từ ngày nó ra mắt, nên được speed up luôn, bả hóng quá
  [16:11] minhtv: Tóm tắt lại: + Cover-Art: Done trong hôm nay + Re-Tagging : Trong hôm nay càng tốt, không thì mai done -> Do hôm nay làm
  [17:01] minhtv: Xong cái nào chưa Long ?
  [17:02] longvv: nó chạy xong cả 2 r, giờ e deploy lên chạy thử phát
  [17:10] minhtv: okay e, nào test xong, báo khách xong, ping phát trên group cho a nắm info luôn nhé
  [08:41] longvv: này hqua e có nhắn bả r nha a, bả cũng test vs feedback lại vài ý r
  [14:51] phuongpvt: https://ohcleo.slack.com/archives/D0B6846UN8K/p1790688333462189?thread_ts=1790596772.909139&cid=D0B6846UN8K dạ a Long Vo
  [14:55] longvv: ok e
  [15:29] minhtv: Bả luôn có message chưa rep nhé Long ơi
  [15:30] longvv: e đang đọc cái mess đó nha
  [15:54] longvv: Hung Pham: e có tạo artifact hướng dẫn test 2 task dưới, a test giúp e trên staging nha https://claude.ai/artifact/LPb2v [thread: 20 replies]
    └ [10:04] hungpn: để anh check nè
    └ [10:58] hungpn: đánh giá dùm anh 2 chỗ này vs Long Vo
    └ [10:58] hungpn: image.png
    └ [10:58] hungpn: https://staging.ohcleo.com/audio/femboy
    └ [11:00] longvv: “Near the top” means just under the heading. “Near the bottom” means the end of the page, after the 
    └ [11:01] longvv: e thấy đúng ý rùi
    └ [11:01] longvv: bỏ link ra ở phần bottom
    └ [11:03] hungpn: vậy là phần bottom sẽ k có link?
    └ [11:03] longvv: dung r nha a
    └ [11:03] hungpn: image.png
    └ [11:04] hungpn: vậy là trang này link = tay đúng k
    └ [11:06] longvv: là sao á, 1 cái link qua đúng erotic, 1 cái link qua trang chủ
    └ [11:08] hungpn: ý anh sao cái chỗ đó cũng ở bottom mà cũng có link á, là do trang đó link = tay hay do cái task em m
    └ [11:09] longvv: do cái task á
    └ [11:13] hungpn: tested DONE nha Long Vo Minh Trinh
    └ [15:47] hungpn: nào live 2 task trên báo anh lại nhé
    └ [09:48] longvv: e live r nha a
    └ [09:48] longvv: Hung Pham: a giúp e check trên live nhe
    └ [11:06] hungpn: okie em
    └ [11:10] hungpn: tested DONE và move task nhé
  [16:05] minhtv: Có fix được cho bả ko Long ơi ? thấy bả nhắn lắm quả , reply lại bả đi
  [16:05] minhtv: * Có fix được cho bả ko Long ơi ? thấy bả nhắn lắm quá , reply lại bả đi
  [16:07] longvv: nhiều dữ z tr
  [16:07] longvv: để e đọc
  [16:07] minhtv: Rep bả trước đang đọc này kia các kiểu đi, bả thấy mình im ko à
  [11:14] minhtv: Cover với Re-tagging sao rồi Long ơi, thấy 2 bên dùng AI chat vs nhau toàn nghàn chữ 🥶
  [11:15] longvv: Bả đòi update liên tục thì bên e cũng update lại, tới khi nào bả thấy kết quả đủ tốt để sẵn sàng chạy full track nha a, 
  [11:16] longvv: Bả cũng bảo là gần đúng như mong đợi r
  [11:16] longvv: giờ chỉnh 1 đợt xem bả ok ko
  [09:14] hungpn: https://trello.com/c/TGUC4iYx/253-3-technical-seo-audit-of-homepage -- caisnayf là bả tự check hả Long Vo
  [09:14] longvv: đợi bả feedback lại nha a
  [09:14] hungpn: okie em
  [11:48] hungpn: * tested DONE và move task nhé Long Vo Minh Trinh
  [11:43] minhtv: https://drive.google.com/drive/folders/1VYw7RiEJQ0jw5OA-kgDzsMgEWpfM7OW- bả có share cái này qua mail nhé
  [11:44] longvv: e thấy và đang implement nha a
  [11:44] longvv: * e đã thấy và đang implement nha a
  [11:47] minhtv: nhớ rep bả , có tin nhắn trong thread
  [14:30] longvv: Minh Trinh: a ơi giúp e check cái này trên App Store cho app OhCleo. App Store Connect → the app → App Information → App
  [14:34] luhx: Screenshot 2026-10-05 at 14.34.01.png
  [14:34] longvv: quào
  [14:34] minhtv: 
  [14:34] longvv: bảo sao nó ko rênw
  [14:34] longvv: * bảo sao nó ko renew
  [14:34] longvv: để e đưa info cho a setup lại
  [14:36] longvv: Production Server URL: https://api.v2.ohcleo.com/api/subscriptions/webhooks/ios/ Chọn version 2 giúp e nha Còn sandbox t
  [14:36] longvv: * Production Server URL: https://api.v2.ohcleo.com/api/subscriptions/webhooks/ios/ Chọn version 2 giúp e nha Còn sandbox
  [14:36] longvv: Chọn xong rồi thì "Request a Test Notification"
  [14:37] longvv: để e check xem nó gửi về BE ko
  [14:37] luhx: sandbox cũng ver 2 à em.
  [14:37] longvv: đúng dị
  [14:38] luhx: không thấy cái này.
  [14:38] luhx: update rồi á.
  [14:38] luhx: Screenshot 2026-10-05 at 14.38.30.png
  [08:35] minhtv: bả nhắn 1 đống nhé
  [08:36] longvv: ok a
  [16:49] longvv: cover bên a đâu có cố định 16:9 đâu đúng ko, dựa vào hình của BE trả về thôi nhỉ Lu Ho
  [16:49] luhx: uhm đúng ròi.
  [13:48] longvv: https://trello.com/c/oDR28T7K/256-update-the-webb-and-app-streamline-visual-identity Lu Ho bả có design mobile cho homep
  [13:49] longvv: a est giúp e phần này thêm nhiu
  [13:50] luhx: Screenshot 2026-10-08 at 13.49.59.png
  [13:50] luhx: là em đang nói cái này?.
  [13:50] longvv: image.png
  [13:51] luhx: sao nhìn vẫn giống mobile view của web vậy ta 🤣
  [13:51] longvv: bả bảo cứ làm như web á
  [13:52] luhx: est home view cho mobile nha: 6h
  [14:43] hungpn: tuần này có gì cần test hok Long Vo Lu Ho
  [14:43] longvv: ko nhé a
  [14:44] longvv: đợi chạy xong cái re-tagging, cover là chắc room nhộn nhịp lại
  [14:44] hungpn: okie em
  [10:19] longvv: e tính xài mcp figma để update cái design mới của bả, mà mình bị reached limit r, bên mình có account nào để mần ko á mấ
  [10:22] minhtv: Có nha, để a xử
  [10:22] minhtv: Gửi a link Figma
  [10:22] longvv: https://www.figma.com/design/ihSQxSSpyRV2Gsegsz4xsn/Design-Imporvement--Copy-?node-id=0-1&p=f&t=4obFVb5SXV6cnh7D-0
  [10:22] longvv: đây nhe a
  [10:23] minhtv: Cái này em Clone rồi á
  [10:23] minhtv: * Cái này em Clone rồi à
  [10:24] longvv: E clone rùi nha
  [10:24] longvv: Còn đây là của bả: https://www.figma.com/design/lAknDgZma06OOVBjnKcZVY/Design-Imporvement?node-id=0-1&p=f&t=pBCHDGxka3ku
  [10:32] minhtv: A có share em key figma để dùng nhé
  [11:05] longvv: Lu Ho: chắc bên mobile start design trên dc r á a
  [11:05] luhx: mai nhé.
  [11:05] longvv: ok a
  [11:05] minhtv: Lữ cần MCP của figma thì hú, kêu AI làm cho lẹ nhé.
  [08:50] longvv: https://www.figma.com/design/KteEjTR09Q5dAizhzWCLxh/Design-Improvement--Copy-?node-id=0-1&p=f&t=Px3XuVYpTmW8jOku-0 Link 
  [08:51] longvv: Lu Ho: nay triển lun nha a ơi Link API mới cho creators page https://claude.ai/artifact/FzYnjn1WtSgcbNTeb3gcqq
  [08:51] luhx: oke xí a làm có gì a hỏi sau.
  [08:57] minhtv: Đã chuyển vào Figma cty, Key thì như bên showcase, còn projectID `KteEjTR09Q5dAizhzWCLxh` của cái lần mobile này đây nhé
  [08:57] luhx: okle nha.
  [08:58] luhx: đang làm bên charles phát xí xong qua làm bên này.
  [08:59] minhtv: Khi khách hàng update design thì các bạn phải clone lại, xong báo mình update với Figma cty nhé, lúc đó mới dùng MCP đún
  [10:03] luhx: Long Vo: cho a xin cái link task cần làm với.
  [10:04] longvv: A vô trello là thấy nó nằm bên in progress [thread: 7 replies]
    └ [10:05] luhx: https://trello.com/c/oDR28T7K/256-update-the-webb-and-app-streamline-visual-identity này á hả? là gi
    └ [10:05] longvv: Làm hết luôn nha a ơi
    └ [10:05] luhx: uả a thấy design mới của app nè.
    └ [10:05] luhx: khác cái Long gửi.
    └ [10:06] luhx: Screenshot 2026-10-13 at 10.05.54.png
    └ [10:06] longvv: A mở cái link e gửi trên group
    └ [10:06] longvv: Nó đúng hơn
  [10:05] minhtv: Tuần này total 2 bạn cần làm là 28h10m nhé, Tuần trước mình làm thiếu giờ, nên tuần này bù lại chút, có Lữ làm nữa hẳn l
  [10:07] luhx: này á hả?.
  [10:07] longvv: Đúng r
  [10:09] luhx: ủa mà cái vụ image cover hôm trước đã dc release chưa ta? để biết tách riêng.
  [10:09] longvv: Release r nha a, a cứ làm
  [10:09] luhx: oke vậy a làm tiếp trên cái đó. [thread: 2 replies]
    └ [10:18] longvv: Subscribe Page => cái màn này chỉ có trên website thôi nha a, ko cần làm trên app
    └ [10:18] luhx: oke.
  [13:41] luhx: Screenshot 2026-10-13 at 13.41.43.png
  [13:42] luhx: Long Vo: Phuong Pham  cho a hỏi phát design chỉ có màn chưa login. nhưng mà login xong nó có thêm cái 1 free listen á nó
  [13:42] luhx: Screenshot 2026-10-13 at 13.42.50.png
  [13:43] longvv: Phuong Pham: giup a clear voi ba nha
  [13:48] luhx: Screenshot 2026-10-13 at 13.48.18.png
  [13:48] luhx: Phuong Pham: thêm cái này nữa, sao bên app nó ngắn dc khúc vậy nhỉ?.,
  [13:50] longvv: hnhu thằng design nó thêm thiếu ấy
  [13:50] longvv: * hnhu ông design nó thêm thiếu ấy
  [13:50] longvv: * hnhu ông design thêm thiếu ấy
  [13:50] longvv: a làm giống như này đi
  [13:50] longvv: image.png
  [13:51] luhx: oke cứ làm tạm trước vậy có gì update sau.
  [16:29] luhx: Long Vo: ở màn creators profile a có mấy cái thấy đang thiếu có gì update giúp a,  chưa có "voice": "Female voice",  "to [thread: 2 replies]
    └ [08:38] longvv: https://claude.ai/artifact/8pYf7eh3W1S5Y6J2MQ8Ji5
    └ [08:39] longvv: Check nha a ơi
  [16:31] longvv: a check bên BE call như nào thử https://staging.ohcleo.com/profile/badfantasy/tracks, tí e soạn docs cho mobile
  [09:10] longvv: https://trello.com/c/iCxa0cfe/247-transcript-dedicated-reading-page  => Task này a Lu Ho làm luôn trong quá trình làm ne
  [14:56] longvv: a Hung Pham test new design trên web giúp e trc nhé: https://staging.ohcleo.com/ https://trello.com/c/oDR28T7K/256-updat [thread: 37 replies]
    └ [09:13] hungpn: Long Vo: text này chỉ sài bên mobile app mà nhỉ?
    └ [09:13] hungpn: image.png
    └ [09:14] hungpn: có update gì mới hả
    └ [09:15] longvv: oh để e bỏ
    └ [09:32] longvv: e bỏ r nha
    └ [09:32] longvv: image.png
    └ [09:32] longvv: cái này nó đang căn giữa r
    └ [09:32] longvv: image.png
    └ [09:33] longvv: do cái icon nên anh nghĩ nó ko căn giữa thôi
    └ [09:49] longvv: http://redmine.nustechnology.com/issues/81450 => cái chỗ này là để hiển thị thông tin thôi mà, có ph
    └ [09:50] hungpn: như app cũ nó là 1 action mà?
    └ [09:50] longvv: app cũ là design cũ
    └ [09:50] longvv: này design mới mà
    └ [09:51] hungpn: vì trước nó là 1 tính năng? nên có thể bị sót? em cần confirm hay chắc chắn như em nói ở trên nhỉ?
    └ [09:53] longvv: Design cũ nó có cái action đó, nhưng design mới thì ko, giờ bả cũng chốt design rồi thì mình cứ làm 
    └ [09:54] hungpn: đẻ Phuong Pham vậy
    └ [09:55] hungpn: image.png
    └ [09:55] hungpn: 2 nút này có giống nhau k nhỉ?
    └ [09:55] longvv: ko nhe
    └ [09:56] hungpn: vậy là sẽ có tính năng mới đúng k
    └ [09:56] longvv: cái nút 1 là để anh copy link đồ thôi
    └ [09:56] longvv: còn nút dưới là vô trang chi tiết
    └ [09:58] longvv: ima_7b86966.jpeg
    └ [09:58] longvv: Đơn giản như này thui
    └ [09:58] hungpn: image.png
    └ [09:58] hungpn: mình bỏ luôn cái see all rồi hả
    └ [09:59] longvv: Quên béng cái câu hỏi bữa mình hỏi bả
    └ [09:59] longvv: bả chưa rep nữa =))
    └ [09:59] longvv: chắc link tới trang categories
    └ [10:00] hungpn: confirm đi rồi báo anh
    └ [10:22] hungpn: dẫn tới trang này hả em
    └ [10:22] longvv: ko a
    └ [10:22] longvv: e gửi lộn
    └ [10:22] hungpn: okie em
    └ [10:24] hungpn: image.png
    └ [10:25] hungpn: vs mấy link See All chỗ này nữa nhé
    └ [10:25] longvv: thì e hỏi chung chung z á
  [15:56] hungpn: Hẹn em mai nha, mai anh mới online
  [08:42] luhx: cái này có API gì mới không em?.
  [09:05] longvv: ko á
  [09:05] longvv: có cái field content_tier là mới
  [09:05] longvv: a dựa vô đó check
  [09:07] luhx: oke em.
  [09:56] longvv: * cái nút 1 là để anh copy link track đồ thôi
  [09:56] longvv: * còn nút 2 là vô trang chi tiết
  [09:57] luhx: Screenshot 2026-10-15 at 09.57.42.png
  [09:57] luhx: cái màn này hình như là mới nhỉ, đi từ đâu để vào ấy Long Vo Phuong Pham
  [09:58] longvv: nó thay cái màn creators cũ á [thread: 15 replies]
    └ [10:02] luhx: Screenshot 2026-10-15 at 10.02.10.png
    └ [10:02] luhx: là thay màn này á hả em?.
    └ [10:02] luhx: ủa nhầm.
    └ [10:02] luhx: này là creators profile mà.
    └ [10:02] longvv: nó có màn creators riêng
    └ [10:02] luhx: mobile vô từ đâu ta a Hung Pham biết không?.
    └ [10:02] longvv: cái for creator á
    └ [10:03] luhx: hình như mobile không có thì phải.
    └ [10:03] longvv: ima_5b9ded7.jpeg
    └ [10:03] longvv: nó nè
    └ [10:03] luhx: bấm từ đâu á.
    └ [10:03] longvv: dưới footer
    └ [10:04] luhx: ồ oke, là thay design mới cho page for creators này đúng không em.
    └ [10:04] longvv: đúng r á
    └ [10:04] luhx: oke thanks em.
  [09:58] luhx: cho xin 1 acc creators để test với.
  [10:00] hungpn: acc tony á Lu Ho [thread: 7 replies]
    └ [10:00] luhx: cho em xin pwd.
    └ [10:00] luhx: Aa@123123123
    └ [10:00] luhx: này đúng không a.
    └ [10:00] hungpn: Long Vo:
    └ [10:01] luhx: đúng rồi nha em login dc rồi.
    └ [10:02] longvv: có gì mình xài universal password: un1vers4l
    └ [10:02] longvv: login acc nào cũng dc
  [10:03] longvv: 
  [10:32] hungpn: Phuong Pham: anh thấy ổng đang design là gắn cái thông tin track vào cái banner ở đầu luôn vậy thì mình có giữ lại cái t
  [10:32] hungpn: image.png
  [10:33] hungpn: * Phuong Pham: anh thấy ổng đang design là gắn cái thông tin track vào cái banner ở đầu luôn vậy thì mình có giữ lại cái
  [10:35] phuongpvt: dạ vẫn giữ vậy nha anh [thread: 6 replies]
    └ [10:36] hungpn: vậy thông tin show trên track có check là user đang là FREE hay là PRO để show full or 15s k em?
    └ [10:36] hungpn: Phuong Pham:
    └ [10:38] phuongpvt: dạ có nha anh
    └ [10:38] phuongpvt: image.png
    └ [10:38] phuongpvt: chỗ này cho số giây đồng nhất với track play ở dưới
    └ [10:38] hungpn: Long Vo:
  [10:36] hungpn: * vậy thông tin track show trên banner có check là user đang là FREE hay là PRO để show full or 15s k em?
  [11:14] hungpn: bug nào fix thì update status dùm anh vs nha Long Vo
  [11:21] hungpn: Phuong Pham: cái nút download app này thì đang ưu tiên user tải app bên IOS hay Android á em?
  [11:21] hungpn: image.png
  [11:21] hungpn: behavior hay nhất chắc là đưa user về lại cái banner trên cùng để chọn phiên bản IOS hay là Android sẽ tốt hơn.
  [11:22] longvv: này a check ios vs android r click vô thử xem nó hướng đúng appstore vs chplay ko?
  [11:23] hungpn: anh thấy đang để là IOS
  [11:23] longvv: a xài android thử chưa
  [11:30] hungpn: sài trên device thì nó work okie rồi, còn PC nó mặc định về IOS á
  [11:33] hungpn: image.png
  [11:33] hungpn: cục này mình lấy data từ đâu ak Long Vo , bên admin có thể edit dc k nhỉ?
  [11:33] hungpn: * FAQ này mình lấy data từ đâu ak Long Vo , bên admin có thể edit dc k nhỉ?
  [11:34] longvv: chứ PC sao check dc, cứ redirect qua iOS thoi :v [thread: 3 replies]
    └ [11:35] hungpn: --- behavior hay nhất chắc là đưa user về lại cái banner trên cùng để chọn phiên bản IOS hay là Andr
    └ [11:35] hungpn: image.png
    └ [11:35] hungpn: đưa về đây user tải gì thì tài
  [11:34] longvv: FAQ cũ của bả đó a
  [11:34] longvv: admin ko có edit dc nha
  [13:52] longvv: https://redmine.nustechnology.com/issues/81463 Hung Pham này là sao nhỉ a [thread: 3 replies]
    └ [13:58] hungpn: ẩn thông tin creator đi đó em
    └ [13:58] longvv: ok a
    └ [14:16] longvv: mấy cái redmine bugs e fix hết r nha
  [14:47] longvv: image.png
  [14:47] longvv: Hung Pham: bả bảo ko cần làm action cho cái này nha a ơi [thread: 1 reply]
    └ [14:50] hungpn: bug nào k fix thì để feedback lại cho anh

### Charles - Family — 187 messages
  [14:53] luhx: ủa bữa Thang Nguyen làm cái vụ bottom dynamic cho lão là ở app nào á?
  [14:53] luhx: push code chưa?
  [14:58] thangn: gần nhất là app này nè
  [14:58] thangn: push rồi óp
  [14:58] luhx: có từng làm app For purpose chưa? vụ bottom tab mà lấy từ server á?
  [14:58] thangn: familyapp nhánh acredia-family
  [14:59] thangn: hok có ký ức
  [15:02] luhx: oke.
  [10:56] minhtv: https://app.clickup.com/t/9016293353/86czj56c0?comment=1300330000119657&utm_source=email-notifications&utm_type=1&utm_fi
  [10:56] minhtv: Check xem cần trả lời ko Lữ
  [10:57] minhtv: đúng dự án mình làm hem
  [10:58] luhx: ủa MedeHealth Mobile App này là app nào nhỉ? có ae nào khác biết không?
  [10:58] luhx: này mình không biết nha Minh Trinh hỏi mấy ae khác thử.
  [11:03] minhtv: bên ông Charles á
  [11:03] minhtv: Screenshot 2026-09-24 at 11.03.12.png
  [11:04] luhx: không biết gì về app đó cả.
  [11:04] luhx: với trước giờ làm việc với mỗi lão charles à đâu biết cái gì khác đâu.
  [11:04] luhx: có thể mấy bạn khác có làm.
  [11:08] minhtv: Screenshot 2026-09-24 at 11.08.21.png
  [11:08] minhtv: Lịch sử cực nhiều, chắc chắn đã làm
  [11:08] minhtv: làm rất nhiều
  [11:08] hiepnt: phần này trước là e làm
  [11:08] luhx: mấy ae khác thì sao nhỉ?
  [11:09] hiepnt: e làm hết các subtask trong đó r
  [10:58] minhtv: Lu Ho:  đem cái app MedeHeath trở lại đi Lữ, app bị remove rồi, hẳn là 16kb page size + api 36 chưa được upgrade
  [10:58] luhx: xin link repo.
  [10:58] minhtv: Hiệp
  [11:01] hiepnt: https://bitbucket.org/medh_team/md-mobile/src Acc: tester1@medehealth.com Pwd: 2026031817
  [11:01] hiepnt: e nhớ k nhầm thì trước có tracker
  [11:01] luhx: tracker đi rồi :v
  [11:03] luhx: app này nằm ở team nào ấy nhỉ.
  [11:03] luhx: apple/gg á.
  [11:03] hiepnt: của tony a
  [11:03] hiepnt: à à
  [11:05] hiepnt: image.png
  [11:05] luhx: Screenshot 2026-09-28 at 11.05.24.png
  [11:05] luhx: sài branch nào Hiệp? 2 cái cùng 1 ngày.
  [11:06] hiepnt: gg thì a bảo ổng add lại nha, ô remove rùi
  [11:06] minhtv: App bị remove hết rồi nhé, đem nó trở lại
  [11:07] luhx: ủa là bên android thôi hả?.
  [11:07] luhx: ios thấy vẫn ở store nè.
  [11:07] minhtv: Hay vậy, tưởng cook rùi
  [11:07] luhx: Screenshot 2026-09-28 at 11.07.54.png
  [11:08] luhx: thấy vẫn sống tốt nè.
  [11:08] luhx: 2 cái này lấy cái nào Hiệp.
  [11:08] hiepnt: cái nào nhiều code hơn ta :v
  [11:09] luhx: không biết :v
  [11:09] luhx: Screenshot 2026-09-28 at 11.09.19.png
  [11:09] luhx: gần giống nhau, bên feature có thêm mớ code, bên upgrade thì fix upgrade vs 16kb thì phải.
  [11:10] luhx: có khi nào app bị remove là do upgrade xong không build không?
  [11:10] luhx: :v
  [11:11] hiepnt: có mà, e nhớ fix xong build submit lại mà ta
  [11:11] hiepnt: vậy a merge hết vào develop đi a
  [11:12] luhx: Screenshot 2026-09-28 at 11.12.26.png
  [11:12] luhx: dev nằm tít ở đây?.
  [11:15] hiepnt: md-mobile-upgrade
  [13:45] minhtv: https://play.google.com/console/u/0/developers/6971384242208144852/app/4972001932960442483/app-dashboard
  [13:45] minhtv: Đây là cái Medeheath nhé Lữ, cái cũ
  [13:59] luhx: ủa vậy mình submit lại app ở cái trên hay phải tạo lại app mới?.
  [14:00] minhtv: Chưa thấy lý do gì để phải tạo lại
  [14:00] luhx: là vẫn sài dc app trên đúng không? chỉ cần build mới và submit lại.
  [14:01] minhtv: đúng rồi ,  Khách hàng cuối ở đây, có gì báo ổng  https://app.clickup.com/t/9016293353/86czj56c0?comment=130033000014041
  [14:02] luhx: trong ticket thấy hỏi quá trời kìa check thử Minh.
  [14:02] minhtv: Trả lời rồi á
  [14:02] luhx: à oke.
  [14:03] minhtv: Đọc qua sơ tin nhắn thấy là   Giữa Nicholash với Charles có mâu thuẫn về hợp đồng, 2 ông thần ko định nghĩa thế nào là m
  [14:04] luhx: vậy lão Nicholash này chắc là khách ha, còn charles là ăn ở giữa hả.
  [14:06] minhtv: đúng rùi, Bữa hỏi Charles có làm ko ? Lão kêu Nicholash ko trả tiền , ko làm => cái Nicholash kêu chửi "We have paid for
  [14:26] minhtv: Lữ đọc kỹ task, ngoài đem nó trờ lại, cần làm gì ở phía BE báo cho thằng dev BE biết trước nhé
  [14:27] luhx: hả cần làm gì là làm gì?.
  [14:28] minhtv: Nhìn ticket thì có 1 vài issues  + Crash khi login sai password. + App crash/unstable trong training. + Assessment đang 
  [14:29] luhx: acc không login dc thì giờ hỏi ai Hiệp?.
  [14:30] hiepnt: charles a
  [14:41] luhx: ủa cái vụ điền app content policy app này hồi đó ai điền vậy Hiệp? vừa check thì thấy tony không có quyền.
  [14:42] minhtv: mấy cái này nhắn vs khách, tuy nhiên nhắn rõ nguyên nhân sao nó tạch , cần làm gì để pass
  [14:42] luhx: Screenshot 2026-09-28 at 14.42.40.png
  [14:42] luhx: 2 cái cần sửa nó ghi rõ lý do ở trong luôn á.
  [14:43] luhx: nhắn charles hả.
  [14:43] minhtv: cứ ghi lại chi tiết , nhắn Nicholas cũng được , tam sao thất bản nữa.  Cứ ghi rõ họ cần làm gì để pass , đừng quăng mỗi 
  [14:49] tuannt: Duong Doan: E out nhóm này nhé anh
  [14:49] duongdn: ok e, khi nào cần add vô lại sau
  [14:49] duongdn: thank e
  [14:51] luhx: đã gửi ở ticket nhé.
  [14:56] minhtv: đã có account rồi nhé Lữ
  [14:58] luhx: Hiep Nguyen: đọc mớ này hiểu không em ,biết làm sao không nhỉ?
  [16:17] luhx: ủa quên bên này fix mấy lỗi liên quan đến 16kb api 36 test app rồi, đang chờ bên đó update policy nữa là build bản mới a
  [16:18] minhtv: Cái này cả android / ios
  [16:18] luhx: ios run dc rồi.
  [16:18] luhx: chỉ lỗi xcode mới thôi.
  [16:18] minhtv: Gần đây họ cũng báo còn lỗi , run được với fix nó khác nhau
  [16:19] luhx: báo lỗi ở đâu á.
  [16:19] minhtv: trong ticket đó luôn , đọc thử
  [16:19] minhtv: tóm tắt ra mấy ghạch đầu dòng ở trên đó
  [13:25] luhx: thấy bên này có sentry. Hiep Nguyen có thông tin gì không về nó không nhỉ, vọc hết thứ rồi chưa thayas gì cần fix thêm n
  [13:25] hiepnt: k có a
  [13:25] hiepnt: anh Thang Nguyen có tt gì về sentry k a
  [13:33] thangn: nope
  [13:46] luhx: Minh Trinh: đã vọc hết ở mobile app chưa thấy issue gì khác, có vụ submit câu trả lời mà nó đỏ lè hết, câu nào cũng sai 
  [13:47] minhtv: Nếu ko thể làm gì khác thì stop chờ các bên khác phản hồi
  [13:47] luhx: oke.
  [09:10] minhtv: Dí lại bên BE / Nicholas về play store nhé , hoặc kêu Charles dí Nicholas dùm
  [16:07] luhx: Minh Trinh: check giúp msg charles với, hình như lão đang muốn nhúng cái webview để load cái web app mới build của lão v
  [16:13] luhx: family.test 2026063020
  [16:18] minhtv: mỗi app 1 logo khác nhau thôi đúng ko ?
  [16:18] luhx: hình như vậy coi lại phát.
  [16:19] luhx: uhm đúng rồi.
  [16:36] khoatd: em out bên này nha anh Minh Trinh, khi nào cần add em lại :))
  [08:34] minhtv: tối qua lão có nhắn nhé
  [08:35] luhx: oke đã thấy.
  [16:10] minhtv: tình hình sao rồi Lữ ơi ?
  [16:10] luhx: tình hình cái gì á.
  [16:11] minhtv: tổng thể bên này
  [16:11] luhx: bên medeheath thì issue app content chưa rep, đang nc vs thằng BE để fix issue kia. còn app qua lão charles nói thì làm 
  [16:13] minhtv: Vẫn có code native như authentication , notification , các kiểu chứ ?
  [16:14] luhx: uhm login thì native còn noti chưa có nên chưa check,, lão kêu chỉ cần login xong load web đơn giản như hiện tại là dc.
  [16:14] luhx: chắc sẽ update sau.
  [16:14] minhtv: ko có làm notification ko pass được đâu
  [16:14] luhx: lão kêu chưa có phần đó nên cũng chả biết làm sao với nó.
  [16:15] minhtv: uhm, cứ dặn lão , ít native quá ko nên submit, phải tranh thủ chuẩn bị
  [16:15] luhx: thực ra code native đâu ít mình không dùng thôi chứ code trong file vẫn nhiều lắm.
  [16:15] luhx: hơn 100MB lận mà.
  [16:16] minhtv: code nhảm , tụi Apple biết hết , Hồi xưa có dự án còn tải hẳn cái game nhét vào trong máy nó còn biết
  [08:28] luhx: Screenshot 2026-10-07 at 08.28.13.png
  [08:28] luhx: Minh Trinh:
  [08:34] minhtv: kaka
  [09:54] minhtv: bên cái Medeheath sao rồi Lữ ?
  [09:54] luhx: chưa thấy thêm thông tin gì, hôm trước có nhắn hỏi charles thì lão kêu chưa nhận đc thông tin gì từ khách.
  [09:55] minhtv: cứ phản hồi trên thread của task luôn, hiện tại thấy kêu phía mình đang check, investigate , nên trái banh đanh phía mìn
  [09:55] luhx: oke để nhắn lại thêm 1 lần nữa.
  [09:56] minhtv: với cái issues gì đó mình đang investigate coi báo họ status luôn, để vậy ko hay
  [09:59] luhx: oke.
  [13:44] minhtv: có mấy đoạn khách chat đọc chưa đủ hiểu hả Lữ hay thiếu gì thế ?
  [13:44] luhx: thì phải hiểu rõ nó là gì chứ mình đâu biết mấy tính năng đó nằm ở đâu đâu.
  [13:44] luhx: vd medication management này là gì chưa biết luôn á.
  [13:58] minhtv: nó chỉ là quản lý thuốc bình thường thui, coi thêm tin nhắn , nhắn vs lão về confirm nhé
  [13:58] luhx: thì đang chưa rõ gì nên mới kêu lão giải thích chi tiết để mình làm đỡ phải hỏi á.
  [13:59] minhtv: thật ra ổng nói cũng khá đủ rồi, + thêm coi trên app nữa là đủ
  [13:59] luhx: vấn đề là mình đâu biết app chạy như nào :v
  [13:59] luhx: bên lão toàn webview.
  [14:00] minhtv: Vậy mới cần coi thêm trong app kết hợp cái ổng nói, chứ ổng sẽ ko giải thích cụ thể hơn nữa
  [14:02] minhtv: có account login production ko ? Ném phát
  [14:02] luhx: thử acc này coi sao family.test 2026063020
  [14:04] luhx: dc không.
  [14:04] luhx: cd app nhé.
  [14:04] luhx: không phải family.
  [14:04] minhtv: được
  [14:04] luhx: oke vọc đi.
  [14:09] minhtv: https://play.google.com/store/apps/details?id=com.acredia.acrediacaredirectapp&hl=en Nó khác vs mấy hình chụp trong này,
  [14:10] luhx: nó là webview á.
  [14:10] minhtv: ý là có gắn nhầm link ko ?
  [14:10] luhx: chấc là không vì lão vừa test xong mà.
  [14:10] luhx: có khi lão update web app.
  [14:11] minhtv: cái webview này nó đang là "For purpose aged care" nó khác vs cái mô tả trên store
  [14:14] luhx: cho cái hình coi thử.
  [14:14] luhx: bên này không fix gì webview nên không rõ.
  [14:15] minhtv: Screenshot_20261013-141458.png
  [14:16] minhtv: Screenshot 2026-10-13 at 14.16.04.png
  [14:16] minhtv: nghi ngờ có gì đó nhầm lắm
  [14:16] luhx: cái webview ở home load từ lâu rồi á, để coi url nó là gì.
  [14:19] minhtv: Vì cái webview mới ko có Residential aged care nữa
  [14:19] luhx: nayuf ở home mà nãy lão test không thấy hú hét gì nhỉ.
  [14:19] minhtv: có khi lão test app có mở được ko
  [14:20] luhx: Screenshot 2026-10-13 at 14.20.35.png
  [14:20] luhx: ủa sao khác của chú nhỉ.
  [14:20] luhx: à nhầm.
  [14:20] luhx: chờ xí.
  [14:21] luhx: ủa đúng config rồi.
  [14:21] luhx: https://play.google.com/store/apps/details?id=com.acredia.acrediacaredirectapp
  [14:21] luhx: bản này hả?.
  [14:21] minhtv: đúng rùi
  [14:22] minhtv: nó còn nằm trong internal testing
  [14:22] luhx: để build release apk test thử phát,
  [14:24] luhx: ủa đâu bj đâu?.
  [14:24] luhx: lúc đầu mới vào popup chú nhập gì.
  [14:24] minhtv: qua đây
  [15:09] luhx: đã hỏi lão nhé, tháy log load link đúng mà nó cứ chuyển qua trang default cảu for purpose./
  [15:16] luhx: Minh Trinh: thử gỡ app rồi thử lại với acc này thử un: demo.tony pwd: 2026101319
  [15:16] luhx: lão cứ kêu nó hoạt động.
  [15:16] luhx: và lão đã vừa test :v
  [15:16] minhtv: Lon failed
  [15:16] luhx: un: demo.tony pwd: 2026101319
  [15:16] luhx: dc mà.
  [15:16] minhtv: hay cần đổi server gì ko ?
  [15:17] luhx: ủa hoathj động thật nè.
  [15:17] luhx: không.
  [15:17] luhx: cứ để mặc định hết.
  [15:17] luhx: rồi login thôi.

### Công Đoàn — 20 messages
  [16:48] thaonm: Welcome 2 bé đẹp gia nhập công đoàn nha 🌸 🥳 🎊
  [16:49] thaonm: * Welcome 2 bé đẹp Phương và Vy gia nhập công đoàn nha 🌸 🥳 🎊
  [16:10] thamdt: Hi mọi người Công đoàn vừa chuyển tiền sinh nhật cho các member có sinh nhật trong tháng 9. Mọi người check tài khoản củ
  [16:31] thuyltt: ko phải sinh tháng 9 nhưng vẫn like cho zui ^^
  [11:28] thaonm: **THÔNG BÁO CHƯƠNG TRÌNH TRAO TẶNG BẢO HIỂM XE MÁY BẮT BUỘC CHO ĐOÀN VIÊN** Chào buổi sáng cả nhà iuu, @room  Công đoàn 
  [11:29] thaonm: HUONG_DAN_TRUYCAP_MINIAPP.pdf
  [11:29] thaonm: em gửi mn file hướng dẫn nhe
  [11:32] vitht: Khi nào đăng kí cũng đc hay sao Thảo có cần trc thời gian nào hem, hay rảnh thì đăng kí cg đc.
  [11:33] thaonm: Số lượng 50.000 này áp dụng cho đoàn viên toàn TPHCM á, nên mn tranh thủ đăng kí sớm lấy slot sớm nha. Để lâu quá là hết
  [11:40] thaonm: **HƯỚNG DẪN ĐĂNG KÝ** **BƯỚC 1** – TẢI ỨNG DỤNG CÔNG DÂN SỐ TPHCM     • Mở App Store (iPhone) hoặc CH Play (Android).   
  [11:43] honght: image.png
  [11:43] honght: Em đăng ký cái được duyệt liền luôn nè mng
  [11:44] thotnt: ima_0b2da86.png
  [11:44] thotnt: Em cũng dậy
  [11:46] thaonm: trong phần đăng kí có yêu cầu up file, là giấy đăng kí xe của mọi người á nhe, mn nhớ chụp đính kèm vô nhennn
  [11:47] thotnt: em mới điền cái form hong thấy ta :v
  [11:57] samht: submit cái là duyệt luôn đó mng ơi, nó còn k thèm validate luôn á có ai thử gõ sai gì đó xong submit k
  [11:59] thaonm: em đừng làm khó ngta nữa Sâm ơi :)))
  [11:59] samht: thiệt mà =)) e mới submit nè, chưa cần 1s là đã duyệt
  [12:00] hungpn: > có ai thử gõ sai gì đó xong submit k  này bản live nên chắc chơi happy case thôi 😉

### Delivery - Resource Arrangement — 163 messages
  [13:40] namtv: NEW	ThuongNTN	Chiều	15/09/2026	Không khoẻ ==> Bên Craig dùng PL. Anh đã update note
  [17:33] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [17:36] duongdn: TuanNT nữa Ha Le
  [23:23] namtv: Do tao chưa gửi lên, Hà chỉ tổng hợp từ room này thôi
  [23:23] namtv: NEW	TuanNT		15/09/2026	Bị bệnh ==> Bailey ko bù. Anh đã update note
  [08:39] chientx: Weekly limit has been changed Hi Kevin, This email confirms that Gil C. changed the weekly limit for Ryan T.'s contract 
  [08:40] namtv: Để hỏi, nhưng khả năng là ổng lười gửi bonus, tăng authorized để mình add giờ tuần trước do bị pause chưa add được
  [08:57] namtv: NEW	TuanNTG		16/09/2026	Không khoẻ ==> Tính vào time idle / project internal. Ko cần update note
  [08:57] namtv: NEW	ThinhPVD		16/09/2026	Không khoẻ (nghỉ theo chính sách kết hôn) ==> Tính vào time idle / project internal. Ko cần upd
  [08:59] namtv: NEW	TienPH		16/09/2026	Bị sốt ==> SamHT bù bên Samuel, lấy từ Elena ko bù. Anh đã update note
  [09:10] namtv: NEW	HaVS		21/09/2026	Có việc cần giải quyết ở quê ==> Hà note plan sau nha
  [11:52] chientx: Hi Kevin, This email confirms that Marcel F. changed the weekly limit for Dau D.'s contract biometric saas to 1 hours pe ⚠️
  [11:54] duongdn: ổng nói muốn quay lại hình thức estimation và approve rồi mới làm  lâu nay fix bug nên ko có est ổng thấy có phát sinh g
  [11:55] duongdn: A có msg ổng nếu có bug phát sinh và ko có authorized hour thì sẽ ko thực hiện được, ổng nên aware
  [17:18] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [08:56] namtv: NEW	TuanNT	Chiều	18/09/2026	Đi ăn cưới ở VT ==> Bên Bailey ko bù. Anh đã update note
  [08:57] namtv: NEW	ToanNT		17/09/2026	Lí do cá nhân ==> Tính vào time idle / project internal. Ko cần update note
  [08:59] namtv: >KhanhPQ 14/09 - 18/09/2026 Nằm viện điều trị => Chờ a Năm update plan NghiepNQ full Michael Koh thay. Anh đã update not
  [08:59] namtv: NEW	LongVV		17/09/2026	Chăm ba ==> Tính vào time idle / project internal. Ko cần update note
  [13:34] namtv: NEW	TriNM	Chiều	17/09/2026	Đau đầu ==> Tính bên Elena ko bù. Anh đã update note
  [13:36] namtv: NEW	KhanhHH	Chiều	17/09/2026	Bị cảm, đau đầu ==> Tính bên Elena ko bù. Anh đã update note
  [15:12] namtv: NEW	ThinhLD		21/09/2026	Nghỉ ngơi ==> Hà note plan sau nha
  [17:17] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [08:31] namtv: NEW	TriNM		18/09/2026	Đi khám bệnh ==> Bên Elena ko bù. Anh đã update note
  [08:31] namtv: NEW	TienND		18/09/2026	Có việc cá nhân cần giải quyết. ==> Tính vào time idle / project internal. Ko cần update note
  [09:09] namtv: NEW	AnhNH2	Chiều	17/09/2026	Bà mất NEW	AnhNH2		18/09 - 25/09/2026	Bà mất + về quê giỗ ông (Xin off thêm từ ngày 18/9 - 2
  [09:09] namtv: NEW	LeNH		18/09/2026	Sốt và đau bụng -> Thay đổi thành off thay vì remote như plan ban đầu ==> Bên James Diamond dùng PL
  [10:32] namtv: NEW	ThiHV		21/09/2026	Bận việc gia đình ==> anh đang discuss thêm với team, update sau
  [10:54] namtv: Hi Hà,  Bữa giờ có một số update: - Bên Ons NghiepNQ có PT do task gấp - Sandor có task mà ThangN cần làm bù James Diamo
  [13:42] namtv: PhongTB bù bên Courtney. Chiều nay bạn sẽ vào project setup, làm quen các thứ trước. Anh đã update note
  [13:57] halt: Hi a Năm, Em đã check note trong Master list và remind mọi người các job cần lưu ý trong tuần này, MN đã confirm đủ ạ
  [17:22] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [17:23] halt: * Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confir
  [20:58] chientx: Leo Schaller changed the limit 8:56 PM Old limit: 20 hrs/week New limit: 15 hrs/week Limit decreases take effect on Mond
  [08:58] namtv: NEW	TamLH		21/09/2026	Bận việc gia đình ==> Bên Shai dùng PL. Anh đã update note
  [08:59] namtv: NEW	ThinhPVD		21/09/2026	Chuẩn bị cho đám cưới (nghỉ theo chính sách kết hôn) ==> Tính vào time idle / project internal.
  [09:00] namtv: NEW	ThoTNT	Chiều	21/09/2026	Khám sơ tuyển NVQS ==> TamVT bù bên Zeke. Anh đã update note
  [11:29] namtv: NEW	DatNT		24/09/2026	Có việc cần về quê ==> VuTQ bù bên Kunal. Anh đã update note
  [17:23] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [17:24] halt: * Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confir
  [21:38] namtv: >HaVS 21/09/2026 Có việc cần giải quyết ở quê => Chờ a Năm update plan Tính vào time idle / project internal. Ko cần upd
  [09:00] namtv: NEW	ThienVN		22/09/2026	Không khoẻ ==> Tính vào time idle / project internal. Ko cần update note
  [09:01] namtv: NEW	KhoaTD	Sáng	22/09/2026	Có việc nhà cần giải quyết ==> Tính vào time idle / project internal. Ko cần update note
  [09:05] namtv: NEW	ThoTNT		22/9/2026	Ho nhiều -> Thay đổi thành off, thay vì remote như plan ban đầu ==> TamVT bù bên Zeke. Anh đã upda
  [16:31] chientx: NEW	KhanhHH		25/09 - 30/09/2026	Về quê giải quyết giấy tờ -> Khánh đang làm bên nào a Dương nhỉ? ⚠️
  [16:32] chientx: * NEW	KhanhHH		25/09 - 30/09/2026	Về quê giải quyết giấy tờ -> Khánh đang làm bên nào a Dương nhỉ? Off thế này có ảnh hư ⚠️
  [16:34] duongdn: Bạn làm bên Franc và Aysar 2 dự án này đều có thể lấy dev khác vào Nhanh nhất là rút PhucVT về làm James còn 2 cái này t
  [16:34] duongdn: * Bạn làm bên Franc và Aysar là chủ yếu hiện tại 2 dự án này đều có thể lấy dev khác vào Nhanh nhất là rút PhucVT về làm
  [17:25] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [17:25] halt: * Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confir
  [09:10] namtv: Về tình hình tasks Aysar và Francesca thế nào Dương? Như tuần này đủ KhanhHH làm full ko? Nếu đủ thì T6 này cần tiến hàn
  [09:13] duongdn: bên này dạng adhoc, chỉ có issue cus feedback để làm nên ko cần bù đâu, để dành làm từ từ thôi
  [09:22] namtv: Ý mày là cả tuần này và tuần sau à? Hay chỉ tuần này?
  [09:32] duongdn: chắc cả hai tuần đi , hỏi  sơ cũng ko còn gì nhiều để làm , đang chờ confirm khách, chắc cứ để tạm ko bù đi  như trên có
  [09:43] namtv: NEW	MinhTC		01/10 - 02/10/2026	Về quê ==> Hà note plan sau nha
  [09:43] namtv: NEW	TriNM		23/09/2026	Chở vợ đi khám bệnh ==> Tính vào time idle / project internal. Ko cần update note
  [09:44] namtv: NEW	PhongTB	Sáng	23/09/2026	Bị bệnh ==> Tính vào time idle / project internal. Ko cần update note
  [09:45] namtv: NEW	DanhTD		25/09/2026	Bận việc nhà ==> TamVT bù bên Zeke. Anh đã update note
  [11:51] chientx: NEW	SangNV		01/10 - 02/10/2026	Nghỉ ngơi và giải quyết việc cá nhân -> Hà note plan sau
  [12:03] chientx: Anh Nguyen: VinhNT định xin làm remote chiều nay nhưng a nói bạn discuss trong team coi lấy Nghiệp thay bạn làm chiều na
  [12:03] chientx: chốt liền trong chiều để bạn biết có cần remote gì ko, hay off luôn
  [13:31] anhnvn: E nch nhanh với Vinh thì task họ có yêu cầu cần output trong hnay, mà transfer gấp cho Nghiệp thì ko kịp.  -> Chốt để bạ
  [13:35] chientx: ok e
  [17:26] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [08:59] namtv: NEW	ThuongNTN		01/10 - 02/10/2026	Có kế hoạch cá nhân ==> Hà note plan sau nha
  [09:01] namtv: NEW	TuanNTG		24/09/2026	Không khoẻ ==> Bên Elena ko bù. Anh đã update note
  [09:02] namtv: NEW	PhongTH		24/09/2026	Không khoẻ ==> HaVS bù bên Alex. Anh đã update note
  [17:09] halt: Hi a Năm, a Chiến Em đã check note trong Master List: 1/ Web plan: Note trong Master list đã đúng và đủ theo plan đầu tu
  [17:09] halt: Hi a Năm, Em đã check note trong Master list và remind mọi người các job cần lưu ý trong tuần này, MN đã confirm đủ ạ
  [17:21] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [21:23] chientx: > KhanhHH 25/09 - 30/09/2026: Về quê giải quyết giấy tờ ít nhất tuần này mình chốt lại là không cần bù gì rồi phải ko a 
  [22:46] namtv: uhm, sẽ dư giờ, coi như tính vào idle. Cả 2 ngày tuần sau luôn. Còn có gì KH cần thì sẽ điều động dev khác sau
  [22:47] namtv: >KhanhHH 25/09 - 30/09/2026: Về quê giải quyết giấy tờ ==> Tính vào time idle / project internal. Ko cần update note
  [09:05] namtv: NEW	LiemHTN		28/09/2026	Khám sức khoẻ NVQS ==> Hà note plan sau nha
  [09:05] namtv: NEW	TrungDT		25/09/2026	Đau đầu ==> Bên Craig dùng PL. Anh đã update note
  [09:06] namtv: NEW	ThanhVM		25/09/2026	Nghỉ ngơi ==> Bên Craig dùng PL. Anh đã update note
  [13:58] chientx: NEW	LamLQ	Chiều	25/09/2026	Bị ốm, không khoẻ -> tính vào time IDLE/project internal. Không cần update note
  [17:18] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [09:24] namtv: NEW	TuanNTG		28/09/2026	Đi khám răng ==> Bên Elena ko bù. Anh đã update note
  [09:30] namtv: NEW	HungTK		02/10/2026	Đưa phụ huynh đi tái khám ==> ThamTTH bù bên Ray Chun. Anh đã update note. Anh Nguyen chú ý, Ray 
  [09:49] chientx: Neural Contract paused the contract 9:31 AM Time tracking is not permitted until the contract is restarted View details 
  [09:50] namtv: Cái này do payment chứ ko phải họ chủ động pause. Cũng gần 2 tháng rồi ko có task nên cũng ko ảnh hưởng
  [09:55] namtv: Hi Hà, Bên Francesca có task cần xử lý ngay mà KhanhHH off nên LeNH làm. Bên James Diamond sẽ do PhucVT bù Anh đã update
  [10:26] namtv: NEW	TienPH		02/10/2026	Về quê có việc ==> SamHT bù bên Samuel, lấy từ Elena ko bù. Anh đã update note
  [16:08] namtv: NEW	ThinhPVD	Sáng	29/09/2026	Chuẩn bị cho đám cưới (nghỉ theo chính sách kết hôn) ==> Tính vào time idle / project inter
  [17:47] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [17:48] halt: * Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confir
  [09:07] namtv: NEW	TamVT		01/10/2026	Chở người nhà đi khám bệnh ==> Tính vào time idle / project internal. Ko cần update note
  [11:22] namtv: NEW	TuanNT	Chiều	29/09/2026	Đi khám răng ==> Bên Bailey ko bù. Anh đã update note
  [17:45] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [09:19] namtv: NEW	HaVS		30/09/2026	Bị lật cổ chân do đá banh ==> Tính vào time idle / project internal. Ko cần update note
  [09:20] namtv: NEW	SamHT	Sáng	30/09/2026	Bị bệnh ==> Tính bên Elena ko bù. Anh đã update note
  [09:21] namtv: NEW	ThienTM	Sáng	30/09/2026	Bị bệnh ==> Tính vào time idle / project internal. Ko cần update note
  [10:12] namtv: Hi Hà, Bên Kunal có task cần VuTQ làm, lấy từ Bailey ko bù Anh đã update note
  [10:16] namtv: NEW	HauTT		23/10 - 26/10/2026	Đi du lịch ==> Hà note plan sau nha
  [17:29] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [19:21] namtv: >LiemHTN 28/09/2026: Khám sức khoẻ NVQS => Chờ a Năm update plan ==> Tính vào time idle / project internal. Ko cần updat
  [19:21] namtv: >MinhTC 01/10 - 02/10/2026: Về quê => Chờ a Năm update plan ==> Tính vào time idle / project internal. Ko cần update not
  [09:14] namtv: NEW	LamLQ		02/10/2026	Việc cá nhân ==> Tính vào time idle / project internal. Ko cần update note
  [09:49] namtv: Hi Hà, Bên Elena có scope mới nên từ giờ PhongTB full Elena nha Anh đã update noteq
  [16:36] halt: Hi a Năm, Em đã check note trong Master list và remind mọi người các job cần lưu ý trong tuần này, MN đã confirm đủ ạ
  [17:24] halt: Hi a Năm, a Chiến Em đã check note trong Master List: 1/ Web plan: Note trong Master list đã đúng và đủ theo plan đầu tu
  [17:24] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [21:32] namtv: NEW	NghiepNQ		05/10 - 06/10/2026	Đưa bé đi khám bệnh ==> Bên Ons tasks cũng limited, ổng thì nợ quá nên ko bù. Anh đã up
  [08:56] namtv: NEW	PhongTB		02/10/2026	Bị sốt ==> Bên Elena ko bù. Anh đã update note
  [08:56] namtv: NEW	ThinhPVD	Sáng	02/10/2026	Không khoẻ ==> Tính vào time idle / project internal. Ko cần update note
  [13:26] namtv: NEW ThinhPVD 02/10/2026 Không khoẻ -> Update: Xin off thêm buổi chiều so với plan ban đầu ==> Tính vào time idle / proje
  [13:29] namtv: NEW	TienND	Chiều	02/10/2026	Bị bệnh ==> Tính bên MyID ko bù. Anh đã update note
  [17:20] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [08:59] namtv: NEW	VuTQ	Sáng	05/10/2026	Đưa người thân đi giải quyết một số giấy tờ ==> Tính vào time idle / project internal. Ko cần u
  [08:59] namtv: NEW	ThangN	Sáng	05/10/2026	Xử lí việc cá nhân ==> Tính vào time idle / project internal. Ko cần update note
  [13:19] namtv: NEW	ThienTM	Chiều	05/10/2026	Có việc gia đình đột xuất NEW	ThienTM		06/10/2026	Có việc gia đình đột xuất ==> Tính vào ti
  [17:02] namtv: NEW	ThinhPVD		06/10 - 09/10/2026	Xử lý công việc cá nhân ==> Tính vào time idle / project internal. Ko cần update note
  [18:05] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [21:45] namtv: NEW	LongVV	Chiều	06/10/2026	Đi tái khám dạ dày ==> Tính vào time idle / project internal. Ko cần update note
  [21:45] namtv: NEW	ThinhPVD		06/10 - 09/10/2026	Xử lý công việc cá nhân ==> Tính vào time idle / project internal. Ko cần update note
  [09:04] namtv: NEW	TuanNTG		06/10/2026	Không khoẻ, đau đầu ==> Tính bên Elena ko bù. Anh đã update note
  [09:05] namtv: NEW	VuTQ	Sáng	06/10/2026	Đưa người thân đi giải quyết giấy tờ ==> Tính vào time idle / project internal. Ko cần update n
  [13:39] namtv: Hi Hà, Bên Gil cho làm full lại, nên TienT quay lại full, phần thiếu tuần này do đã làm project internal thì KietNVT sẽ 
  [16:21] namtv: NEW	ThinhT		12/10/2026	Giải quyết công việc cá nhân ==> Hà note plan sau nha
  [17:48] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [13:36] namtv: NEW	DaiDV		09/10/2026	Về quê thăm nhà ==> Tính vào time idle / project internal. Ko cần update note
  [13:36] namtv: NEW	ThamTTH		14/10 - 16/10/2026	Về quê thăm gia đình tiện thể xử lý việc cá nhân ==> Hà note plan sau nha
  [17:55] halt: Hi a Năm, a Chiến Em đã check note trong Master List: 1/ Web plan: Note trong Master list đã đúng và đủ theo plan đầu tu
  [17:55] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [10:32] namtv: NEW	TienND		08/10/2026	Bị sốt ==> Bên MyID ko bù. Anh đã update note
  [17:42] halt: Hi a Năm, Em đã check note trong Master list và remind mọi người các job cần lưu ý trong tuần này, MN đã confirm đủ ạ
  [17:42] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [17:42] halt: * Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confir
  [16:37] namtv: NEW	TienND	Chiều	09/10/2026	Bị bệnh, chưa khoẻ (có thể làm bù - chưa approve) ==> TienND làm bù cộng phép bên Leo. Anh đ
  [17:12] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [09:11] chientx: NEW	TuanNT		12/10/2026	Mệt, cảm -> bạn đang làm gì a Duong Doan ? Có cần bù gì ko?
  [09:12] chientx: NEW	PhucVT		12/10/2026	Không khoẻ -> bạn này bên Arthur (Chris) nhưng là fixed cost nên không cần bù gì, đã update note
  [09:14] duongdn: TuanNT đang làm Bailey, hiện task cũng đang hạn chế, phải chạy qua James Definitive làm đỡ, ko cần bù đâu em
  [09:15] chientx: OK a, đã update note cho Bailey: TuanNT off không bù
  [13:28] namtv: NEW	ThoTNT	Chiều	12/10/2026	Có việc gia đình đột xuất ==> TamVT bù bên Zeke. Anh đã update note
  [13:29] namtv: NEW	TaiTM	Chiều	12/10/2026	Đau đầu ==> AnhNH2 bù bên Courtney. Anh đã update note
  [13:30] namtv: NEW	LuHX	Chiều	12/10/2026	Có việc bận cần giải quyết NEW	LuHX		14/10/2026	Có việc bận cần giải quyết ==> Tính vào time i
  [17:12] chientx: Weekly limit has been changed Hi Kevin, This email confirms that Leo S. changed the weekly limit for Hendrix L.'s contra
  [17:21] anhnvn: Mình đã hoàn tất toàn bộ phần scope vốn từ đầu cần tăng giờ để làm theo thoả thuận cuối tuần trước. Action này là vẫn th
  [17:33] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [07:34] namtv: Chú ý ổng giảm cả dev nha - Dev: 25 xuống 15 - QC: 15 xuống 10
  [08:57] anhnvn: Giảm bên dev thì chưa thấy nói gì gần đây. Từ đầu thì khi tăng từ 20 lên 25, cũng có trao đổi về việc xong thì cân nhắc 
  [09:31] namtv: Thời điểm ổng change hơi nhạy cảm. Upwork thì set sẽ apply từ tuần sau, do thời điểm change theo giờ UTC đã là T2 tuần n
  [14:02] anhnvn: Bên QC ổng cũng ko nói gì cụ thể. Nhưng ông này ko phải ở Mỹ. Ổng có travel qua lại châu Âu, gốc ổng thì ở Đức ah.
  [17:30] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [20:49] chientx: > ThinhT		12/10/2026	Giải quyết công việc cá nhân cái này vẫn còn hả e?
  [21:01] namtv: Do anh chưa update note
  [21:02] namtv: >ThinhT		12/10/2026	Giải quyết công việc cá nhân Tính bên Kunal ko bù (một phần do tăng giờ VuTQ, nhiều hơn số giờ off).
  [21:03] namtv: >ThamTTH	14/10 - 16/10/2026	Về quê thăm gia đình tiện thể xử lý việc cá nhân Coi như tính vào time idle / project intern
  [09:02] namtv: NEW	ThienVN	Sáng	14/10/2026	Không khoẻ ==> Tính vào time idle / project internal. Ko cần update note
  [09:03] namtv: NEW	HiepNT		16/10/2026	Bận việc gia đình ==> LuHX bù bên Cameron. Anh đã update note
  [15:06] namtv: NEW	HauTT		16/10/2026	Đi khám răng ==> SamHT bù bên Scott. Anh đã update note
  [17:33] halt: Hi a Năm, a Chiến Em đã check note trong Master List: 1/ Web plan: Note trong Master list đã đúng và đủ theo plan đầu tu
  [17:33] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 
  [09:54] halt: Hi a Năm, Em đã check note trong Master list và remind mọi người các job cần lưu ý trong tuần này, MN đã confirm đủ ạ
  [15:28] namtv: NEW	PhongTB		16/10/2026	Đi khám bệnh ==> Bên Elena ko bù. Anh đã update note
  [15:30] namtv: NEW	ThinhLD		16/10/2026	Có việc bận phải về quê ==> Bên Craig dùng PL. Anh đã update note
  [15:30] namtv: NEW	TaiTM	Sáng	16/10/2026	Đi làm CCCD ==> AnhNH2 bù bên Courtney. Anh đã update note
  [15:35] namtv: NEW	TamVT		15/10/2026	Nghỉ buổi sáng theo plan định kì + Không khoẻ, xin off thêm buổi chiều ==> Tính vào time idle / pr
  [15:35] namtv: NEW	DanhTD		19/10/2026	Nghỉ ngơi ==> Hà note plan sau nha
  [15:35] namtv: * NEW	DanhTD		19/10/2026	Nghỉ ngơi NEW	DanhTD		23/10/2026	Có việc nhà ==> Hà note plan sau nha
  [15:35] namtv: * NEW	DanhTD		19/10/2026	Nghỉ ngơi NEW	DanhTD		23/10/2026	Có việc nhà ==> Hà note plan sau nha

### Delivery Department — 22 messages
  [08:39] namtv: --- Thông tin điều chuyển dự án: Bạn LuHX tham gia dự án Lyf Support App, khách hàng: Sandor Antal, Role: Mobile Develop
  [13:40] namtv: --- Thông tin điều chuyển dự án: Bạn PhongTB tham gia dự án Relay Vault, khách hàng: Courtney Guertin, Role: Web Develop
  [15:21] minhtv: Hi a Năm, em request một số vấn đề sau cho dự án Lyf Support App, khách hàng: Sandor Antal 1. LuHX communication level 4
  [15:24] namtv: OK em
  [15:28] minhtv: Hi a Năm, em request một số vấn đề sau cho dự án Relay Vault, khách hàng: Courtney Guertin 1. PhongTB communication leve
  [15:30] namtv: OK Minh
  [15:30] namtv: @room Hiện tại trên Workstream đã có request, approval cho các điểm trên. Vậy nên từ giờ: - Ko cần gửi message get appro
  [20:02] namtv: **Plan của Web dev tuần 21/9** - SamHT 10h Unito, làm Elena nếu có task, còn lại làm New Website - NghiepNQ full Ons tha
  [20:02] namtv: --- **Plan của Mobile dev tuần 21/9** - ThangN 20h James Diamond thay AnhNH2, còn lại làm showcase - LuHX một số giờ San
  [08:10] namtv: * --- **Plan của Mobile dev tuần 21/9** - ThangN 20h James Diamond thay AnhNH2, còn lại làm showcase - LuHX một số giờ S
  [20:34] namtv: **Plan của Web dev tuần 28/9** - MinhTC full MyID thay PhucNH (đúng ra thay từ T5 nhưng MinhTC off T5, T6 nên full ngay 
  [20:34] namtv: --- **Plan của Mobile dev tuần 28/9** - AnhNH2 20h James Diamond, còn lại làm showcase - HiepNT một số giờ Cameron, còn 
  [09:35] namtv: Các phòng họp chắc cũng chủ yếu mọi người ở đây sử dụng / tham gia họp nên cho mình hỏi ở đây cái: mọi người có nhu cầu  [thread: 3 replies]
    └ [10:18] minhtv: Em dùng phòng đó khá nhiều nhưng chưa bao giờ dùng Tivi
    └ [10:21] chientx: E ko có nhu cầu nha
    └ [10:22] tiennd: Dạ em củng ko có nhu cầu
  [09:36] thuyltt: Bên t thì ko cần cũng dc he. T cũng ít khi họp mà cần chiếu tv. lỡ có + nếu ở phòng đó thì phòng nhỏ, cùng lắm xem chung
  [09:38] kietnvt: Lâu nay thì em cũng không có dùng tivi phòng Orion nha anh Năm
  [20:40] namtv: **Plan của Web dev tuần 5/10** - PhucVT làm xho xong Arthur, còn lại làm James - Definitive - TienT 20h/week Gil, còn lạ
  [20:41] namtv: --- **Plan của Mobile dev tuần 5/10** - HiepNT full Cameron **==> Tất cả mọi người đọc kĩ và react 👍️ confirm nha**
  [20:37] namtv: **Plan của Web dev tuần 12/10** - DatNT một số giờ Kunal, còn lại làm WorkTalent - LamLQ full Ons - NghiepNQ full Ons **
  [20:37] namtv: --- **Plan của Mobile dev tuần 12/10** - ThamTTH làm các jobs lắt nhắt như trước, làm Tony Berry khi có task thay ThangN

### Direct Manager — 36 messages
  [10:07] chientx: Ủa sao rồi Tuấn? Đang có issue nghiêm trọng phải fix liền và trả lời liền, sao chỉ react mà ko có action gì e? Hiện tại 
  [10:08] namtv: Ah, Tuấn có nhắn riêng anh. Coi như OK rồi
  [10:14] namtv: >Các cases khác thì nhẹ hơn, nhưng cũng cần discuss với team xem những memo đó sao ko phù hợp và như thế nào là phù hợp,
  [10:19] namtv: >Tiến hành chưa mọi người? Report lại nào. Mới có Lực done thôi (Tuấn thì đã lesson learned, nhưng cũng chưa có thông ti
  [10:20] tuantt: Dạ 2 project bên em là Leo và Brian, em cũng sẽ check random 2-3 lần/w để monitor việc thực hiện viết Memo của các membe
  [10:29] anhnvn: Bên Ray Chun đã xử lí và update memo từ cuối tuần trước.  Hiện em tiến hành check định kỳ 2 lần vào T3 và T5 hàng tuần đ
  [10:31] namtv: >những memo đó sao ko phù hợp và như thế nào là phù hợp Chú ý cái này nha. Nếu ko thì rất dễ bị lại thôi
  [14:25] chientx: Hi all, Trên Workstream có 1 request từ phía công ty cho các bạn DM liên quan tới việc hỏi thăm KH feedback cho cty mình
  [14:46] chientx: * Hi all, Trên Workstream có 1 request từ phía công ty cho các bạn DM liên quan tới việc hỏi thăm KH feedback cho cty mì
  [14:46] chientx: * Hi all, Trên Workstream có 1 request từ phía công ty cho các bạn DM liên quan tới việc hỏi thăm KH feedback cho cty mì
  [09:54] chientx: Remind các DM tiến hành nha mn, không phải chờ tới deadline mới lo đi xử lý nha. Cái nào tiến hành được thì mình cần tiế
  [10:38] binhnt: HI mn, cuối ngày hnay các DM có tracker thì submit  cho request này nhé: Check memo logs in Upwork Tracker
  [13:50] chientx: > Chỉ collect feedback từ các KH mà có trải nghiệm tốt khi lv với cty Remind tất cả mọi người phải đánh giá rất kỹ tiêu 
  [16:20] trinhmtt: Em gửi các bug/features được release ạ 1. Thêm tính năng project setup Khi có dự án mới thì DM cần chạy checklist này tư
  [17:12] binhnt: Hi mn, cứ mỗi T6 sau khi check xong memo Upwork thì mn submit 1 report ở WS nha. Vào form tuần rồi submit đó, Add anothe
  [16:05] chientx: Hiện tại vẫn còn 1 số bạn chưa hoàn thành submit data liên quan vụ hỏi KH nhờ feedback cho cty mình trên Clutch -> mn ch
  [16:06] chientx: c Binh Nguyen  cc Trinh Mai cần có 1 tính năng alert, cảnh báo thật to ngay đầu trang khi có gì quá hạn cần xử lý
  [16:14] trinhmtt: Dạ em noted ạ
  [15:58] binhnt: Nhớ này nha mn ơi
  [16:42] trinhmtt: Em gửi các bug/features được release ạ 1. Weekly Report Finalization Tính năng này để DM review và click submit vào mỗi 
  [16:42] trinhmtt: Về phần tính năng Weekly Report Finalization Các DM tuần này bắt đầu **thực hiện review và submit** để tránh case team l
  [16:43] trinhmtt: * Về phần tính năng Weekly Report Finalization Các DM **tuần này bắt đầu** **thực hiện review và submit** để tránh case 
  [22:44] duongdn: chị Binh Nguyen: Nam Tran  Cho em hỏi mình nên xử lí sao cho các task mà mình làm trước report sau hoặc ngược lại ạ Bên 
  [23:09] namtv: Cái này ko phải cái xử lý bên project. Project vẫn để giờ charge đúng, tag vào 1 tag nào đó và báo bên reporter những ta
  [23:12] namtv: * Cái này ko phải cái xử lý số giờ charge bên project. Project vẫn để giờ charge đúng, tag vào 1 tag nào đó và báo bên r
  [23:22] duongdn: phần làm trước report sau thì ok rồi Còn sau đó thì sao nhỉ, lúc trước dung task log thì ghi 1 dòng actual =0, charge > 
  [23:22] duongdn: * phần làm trước report sau thì ok rồi Còn sau đó thì sao nhỉ, lúc trước dùng task log thì ghi 1 dòng actual =0, charge 
  [23:23] namtv: Ko làm gì cả. Cũng ko set giờ charge = 0. Như nói bên trên đó, cứ như bình thường, chỉ thêm tag để finance phân biệt thô
  [23:24] namtv: Ví dụ tới tuần sau đem ra charge thì cũng là finance xử lý, ko phải trên WS project phải set số giờ
  [23:25] duongdn: OK
  [08:42] chientx: Hi mn, Các trường hợp bữa trước mình nhắn hỏi thăm KH, mn review lại xem họ có trả lời gì ko, submit update status nha.
  [17:48] trinhmtt: Em gửi các bug/features được release ạ 1. Daily hour total  Thường employee sẽ log nhiều dự án và cần check được đã log 
  [11:34] binhnt: Hi mn,  Vào mỗi cuối tuần (t6), các bạn DM sau khi review All task log của dự án mình xong, nhớ submit để bên finance nắ
  [11:34] binhnt: image.png
  [14:57] namtv: Hi all, mình vừa send quarterly client feedback request. Các khách hàng bên dưới đã nhận được email. Mọi người báo và nh
  [14:58] namtv: --- Dựa trên các lần collect trước, khách hàng có vẻ ko hào hứng lắm dù remind mấy lần. Nên lần này mình chỉ báo vậy thô

### Elena - Optimization — 1000 messages
  [14:34] anhttl: anh Kiet Nguyen oi
  [14:34] tiennd2: zô này nè Lan Anh https://process-digital-plant2.nusdev.net/#/settings/measurement-types/create
  [14:36] kietnht: này server internal hay sao á, a mới vào đc mà
  [14:36] anhttl: tui đang vô https://active-alerts.nusdev.net/admin-ui/#/login luôn á
  [14:36] anhttl: image.png
  [14:37] kietnht: image.png
  [14:37] kietnht: bên a work, ko biết bị gì :v
  [14:38] tuanntg: coi chừng Việt key nha e
  [14:38] tuanntg: Refresh page lại đi
  [14:38] anhttl: h đc rùi ~~
  [14:40] anhttl: Giờ nó cũng vậy á. Chỗ này chắc hỏi lại bả
  [15:00] vytth: hqua a Tuan Nguyen có hỏi về cái key license để a test, ý là giờ a tìm dc chưa hay vẫn cân phải hỏi bả á
  [15:02] vytth: * hqua a Tuan Nguyen có hỏi về cái key license để a test, ý là giờ a xử lý dc chưa hay vẫn cân phải hỏi bả á
  [15:18] tuanntg: à, a tìm được chỗ generate .key license file rồi e nha
  [08:44] anhttl: Nay anh Phong off nha mn
  [09:11] kietnht: alo Anh Trinh Vy Tran cho a hỏi, chỗ cái hàm SUM, req yêu cầu là bao nhiêu tag cũng đc hay sao ta.
  [09:11] kietnht: image.png
  [09:12] kietnht: trong hệ thống mình định nghĩa hàm sum only trên 2 tag thôi
  [09:15] kietnht: ý là cái này là 1 định nghĩa khác, hay dùng lại cái existing
  [09:17] anhttl: Mấy cái req Vy check nha, khi nào cần thì em support thôi
  [09:21] vytth: image.png
  [09:22] vytth: req gốc nói 2 or more tags á anh
  [09:33] kietnht: image.png
  [09:33] kietnht: image.png
  [09:34] kietnht: Vy Tran: nó đang ko consistent nha, cái nào mới đúng
  [09:34] kietnht: * Vy Tran: nó đang ko consistent nha, cái nào mới đúng. Hàm avg
  [09:37] anhttl: anh đang làm task này hả anh Kiet Nguyen https://precognize.atlassian.net/browse/OP-24 cái ý đó là 1 phần của task này h
  [09:38] kietnht: uhm
  [09:38] vytth: cái ticket này chưa final nha anh, nhưng mà ý đó chắc để hỏi lại á.
  [09:40] kietnht: mấy cái này liên quan nghiệp vụ, ảnh hưởng nhiều tới mấy feature sau, hỏi sớm giúp a nha.
  [09:43] kietnht: ủa mà ticket đó ai viết nhỉ, bả viết hay bên mình viết?
  [09:44] vytth: ticket đó bên mình á. Nma em chỉ mới check các ticket đang in-progress thôi.
  [09:45] vytth: còn nó nằm trong list to do đó thì e đang check dần để xem chỗ nào cân hỏi á. Còn như anh muốn hỏi phần dó trc thì e ưu 
  [09:45] vytth: * ticket đó bên mình á, AI gen trc. Nma em chỉ mới check các ticket đang in-progress thôi.
  [09:45] vytth: * ticket đó bên mình á, AI gen trc. Nma em chỉ mới double check các ticket đang in-progress thôi.
  [09:46] kietnht: nó gen dựa vào mấy cái file gốc ban đầu phải ko á
  [09:46] kietnht: gì mà gen lung tung cả lên :v
  [09:48] vytth: Chỗ đó 2 cách hiểu đều hợp lí nên e cũng chưa sure. Nhưng để cho chắc thì chắc nên hỏi lợi
  [09:49] anhttl: Em thấy là nếu >=2 tag mọi hàm luôn (sum, avg, min, max,...) thì mới có nghĩa chứ của 1 tag thì ko biêt bieetsbieeur diễ
  [09:50] anhttl: 1 là ý họ vẫn đũng là muốn của single tag, nhưng như vậy thì ko biểu diễn lên đc còn 2 là ý họ sai luôn, chỗ đó phải là 
  [09:50] anhttl: * Em thấy là nếu >=2 tag mọi hàm luôn (sum, avg, min, max,...) thì mới có nghĩa chứ của 1 tag thì ko biêt biết biểu diễn
  [09:50] anhttl: * Em thấy là nếu >=2 tag mọi hàm luôn (sum, avg, min, max,...) thì mới có nghĩa chứ của 1 tag thì ko biết biểu diễn lên 
  [09:52] kietnht: ví dụ: min(tagX) >= 20 thì vẫn đc mà
  [09:53] anhttl: có ý nghĩa nhưng vấn đề là ko biết biểu diễn lên chart sao á
  [09:53] anhttl: cái chart đó trục x là tgian mà
  [09:53] kietnht: có thể sẽ có 1 khoảng time range nữa
  [09:54] anhttl: bữa mình nói chiện này gồi luôn á
  [09:54] kietnht: từ a -> b, ko biết có thiếu ko
  [09:54] anhttl: thôi nhưng em hỏi bả r, để bả check r xem sao
  [09:56] kietnht: image.png
  [09:57] kietnht: ý là nó đang có 1 hàm rolling max cho single tag, ý nghĩa cũng tương tự. nên cần coi là có dùng lại hay ko, hay là thêm 
  [13:25] anhttl: cái license tới đâu rồi anh Sam Ha, Tuan Nguyen, có cái gì đẩy lên cho QC test dần được chưa
  [13:26] samht: License a xong UI r, nhưng đang dùng mock data. A tính đợi integrate api r mới deloy
  [13:26] samht: Vì cũng chỉ đang test dc UI của license thôi, k có test đc logic
  [13:27] tuanntg: a vừa mới xong vụ update workflow để generate .key theo data structure mới
  [13:28] tuanntg: Hiện a đang check update cho phần validate khi upload license nha
  [14:03] anhttl: @room Mn khi làm task liên quan OP thì gắn 2 tag: + OPTIMIZATION + OP - M1 --> tương tự sau này làm milestone 2 thì gắn 
  [14:04] anhttl: Tri Nguyen: Anh check giúp em cái PR occurrence có conflict gì ko, có thì fix giúp em nha. Kfir nhắn: Hi Michelle please
  [14:15] anhttl: Mình sẽ catchup là thứ 2-4-6, lúc 9h15 sáng, 3L nha mn @room. Mn react confirm nha.
  [14:15] anhttl: * Mình sẽ họp catchup là thứ 2-4-6, lúc 9h15 sáng, 3L nha mn @room. Mn react confirm nha.
  [14:21] anhttl: List milestone dự kiến như này, còn chờ KH confirm nhưng mn cứ lấy đó làm kỳ vọng. **M1 - Licensing và Step 1 (Thứ Năm, 
  [14:21] anhttl: * List milestone dự kiến như này, còn chờ KH confirm nhưng mn cứ lấy đó làm kỳ vọng. **M1 - Licensing và Step 1 (Thứ Năm
  [14:22] tiennd2: à vụ tag units sao rùi á Anh Trinh [thread: 2 replies]
    └ [14:23] anhttl: liên quan req thì hỏi chị Vy nha :vvv bả chưa rep nữa. nếu ông block r thì để Vy sắp xếp task khác
    └ [14:23] tiennd2: okela
  [14:23] trinm: > Anh check giúp em cái PR occurrence có conflict gì ko, có thì fix giúp em nha.  đã fix nha
  [16:25] kietnht: Anh Trinh: chỗ milestone 1, là cái save cái model chưa hay sao á
  [16:25] kietnht: > khung giao diện Runs page. còn này là gì á
  [16:25] kietnht: * Anh Trinh: chỗ milestone 1, là có save cái model chưa hay sao á
  [16:26] anhttl: milestone 1 là làm step 1 á, lưu draft với step 1
  [16:27] anhttl: cái table list run á
  [17:18] trinm: link môi trường test internal cho OP ở đây nha mn  https://active-alerts.nusdev.net/optimizations
  [09:18] anhttl: image.png
  [09:19] anhttl: Mn log giờ thì chọn 2 tag luôn như này nha. [thread: 2 replies]
    └ [09:22] trinm: vậy giờ có cần vào sửa lại không em.
    └ [09:22] anhttl: tuần này em tự sửa được rồi nha
  [08:40] anhttl: 9h15 3L nha mn
  [08:54] anhttl: Tri Nguyen: bả có add dev mode cho Aron trên figma rồi. anh check thử xem được ko anh [thread: 1 reply]
    └ [08:57] trinm: để anh xin acc figma Aron cái
  [09:02] anhttl: Tri Nguyen, Tien Nguyen: lquan tới search tag, mn check 3 câu hỏi ở phần cmt nha: https://precognize.atlassian.net/brows [thread: 1 reply]
    └ [09:14] tiennd2: tui đang check nha
  [09:15] trinm: thấy chưa dev mode em ới
  [09:17] anhttl: go go mn ơi
  [09:38] anhttl: + License: BE (Tuấn) hôm nay sẽ có API để gủi info cho FE.  + Tag search: Be sáng nay xong + table run mock data: chiều 
  [09:38] anhttl: * - License: BE (Tuấn) hôm nay sẽ có API để gủi info cho FE. - Tag search: Be sáng nay xong - table run mock data: chiều
  [09:42] duongdn: cần 1 deadline khi nào đưa lên port test nữa
  [09:59] anhttl: * - License: BE (Tuấn) hôm nay sẽ có API để gủi info cho FE. - Tag search: Be sáng nay xong - table run mock data: chiều
  [10:08] trinm: Nay anh làm bên khác nha dự kiến sớm thì chiều quay lại không thì mai   Anh Trinh Vy Tran
  [10:09] tiennd2: 1. thì có câu hỏi liên quan lúc nãy meeting á, có cần loại luôn các tag có nhiều units khỏi API response ko 2. này tui o
  [10:22] kietnht: cái ý số 3, tính toán nếu có sẽ là send qua influx để show cái highlight lên trend chart, hoặc send cái expression qua a
  [14:01] tiennd2: ``` "data": [   {      "id": "be4c537c-de76-4482-ac5a-2f8069efe866",      "type": "Column",      "name": "WA_Factor-6634 [thread: 1 reply]
    └ [14:11] trinm: Screenshot 2026-10-05 at 14.11.31.png
  [14:01] tiennd2: * ``` "data": [   {      "id": "be4c537c-de76-4482-ac5a-2f8069efe866",      "type": "Column",      "name": "WA_Factor-66
  [15:06] tuanntg: a Kiet Nguyen  rảnh lên server chạy lệnh này giúp e nha
  [15:07] tuanntg: `INSTALLATION_ID=$(microk8s kubectl exec pod/license -c license -- env | grep PRECOGNIZE_INSTALLATION_ID | cut -d '=' -f
  [15:07] tuanntg: * ``` INSTALLATION_ID=$(microk8s kubectl exec pod/license -c license -- env | grep PRECOGNIZE_INSTALLATION_ID | cut -d '
  [15:09] tuanntg: chạy này để lấy cái ID, này nó sẽ kiểu giống ID để e gán cho license id và xác thực khi e tạo license á
  [15:09] kietnht: image.png
  [15:10] kietnht: 
  [15:10] kietnht: INSTALLATION_ID = 70f99157-742b-4d4b-9d98-72c4569aea2a
  [15:24] tiennd2: mọi người ai làm influx thì sẽ bị dính cái field mới là `PRECOGNIZE_INFLUX_TOKEN` ở application.yml thì value của nó là 
  [15:24] tiennd2: a Dong Nguyen
  [16:30] tuanntg: Oke e nha
  [17:10] duyvna: Mn tranh thủ review code cho nhau rồi deploy để mai a nhảy vào test nhé, ngứa nghề lắm rồi đó
  [09:04] vytth: Nay target như này nha mn:  * anh Tuan Nguyen deploy phần upload license để anh Sam Ha integrate, và hnay cũng xong phân [thread: 5 replies]
    └ [09:05] tuanntg: Nay a off e nha
    └ [09:06] tuanntg: A Kiệt sẽ deploy giúp a nha, vẫn go bình thường
    └ [09:12] tuanntg: A Sam Ha  e update API status có response mới rồi, a check update theo nha. Các field đầy đủ hết rồi
    └ [09:13] tuanntg: Hiện tại trên staging đang là casse only Monitor nên chỉ có data bên Monitor nha
    └ [09:23] samht: ok Tuan Nguyen để có gì a hỏi Kiệt thêm
  [09:05] kietnht: a đang review phần license bên Tuấn, review xong mới deploy nha, trưa nay có
  [09:36] kietnht: Tuan Nguyen: command để gen file license mới là gì á [thread: 9 replies]
    └ [09:40] tuanntg: A search “-op” là ra file tool license trong đó e có define các option á
    └ [09:43] tuanntg: Command e nhớ nó khá dài, nó kiểu vầy:  tools/license/bin/license.sh -t 1000 -d 20-10-2040 -op -co 1
    └ [09:46] tuanntg: Về cơ bản e đã update API status trả về cấu trúc response mới, nên việc đối với các key license khác
    └ [09:49] tuanntg: A Kiet Nguyen  để generate ra file key thì cần cái installation id với company name, company name a 
    └ [09:55] kietnht: installationId, company name pass vào cái CLI nnt á Tuan Nguyen
    └ [09:56] kietnht: a search ko thấy nha
    └ [09:56] tuanntg: Nó cũng kiểu là option á a
    └ [09:56] tuanntg: Company name thì pass cuối cùng
    └ [09:57] tuanntg: Installation id thì pass qua flag gì e quên r
  [09:36] kietnht: * Tuan Nguyen: command để gen file license mới là gì á, để a gen thử xem nha :v
  [10:14] vytth: * Nay target như này nha mn: - anh Tuan Nguyen deploy phần upload license để anh Sam Ha integrate, và hnay cũng xong phâ
  [10:39] duongdn: có gì deploy lên xem tí chưa mn :D
  [10:59] kietnht: hú Tri Nguyen a merge develop vào nusbase có conflict này nha:
  [11:00] kietnht: image.png
  [11:00] kietnht: này keep both
  [11:57] anhttl: Tri Nguyen, Sam Ha, Phong Tran: develop mới merge tính năng mới của FE nha (cụm occurrence layer), nên mn nhớ merge deve
  [13:40] vytth: anh Kiet Nguyen, Tien Nguyen em hỏi ý này bả trả lời yes nha  ``` when tag A has a measurement type with several units (
  [13:40] vytth: * anh Kiet Nguyen, Tien Nguyen em hỏi ý này bả trả lời yes nha > when tag A has a measurement type with several units (e
  [13:41] vytth: là tính toán bỏ qua unit luôn
  [13:41] vytth: cứ cộng/chia/trừ value đang có
  [13:46] anhttl: Chị Han Do test bên này chung với anh Duy Vo nha. Chị Vy Tran sắp xếp transfer cho QC nha chị [thread: 3 replies]
    └ [14:04] handn: share cho Hân các thông tin bên dự án nha Vy Tran
    └ [14:13] vytth: Khi nào bà qua á, chắc tầm 4g Hân qua tui dc ko ne
    └ [14:14] handn: uki
  [13:47] anhttl: mấy cái cách hiểu sum, min, max gì đó bả có rep chưa chị
  [13:47] vytth: bả nói đang checking á
  [13:49] kietnht: Deployed cái chỗ license service lên rồi nha, giờ để gen cái .key file
  [13:51] kietnht: đợi tí, server có issues
  [13:54] kietnht: UP lại rồi nha
  [14:04] kietnht: alo Tuan Nguyen
  [14:05] kietnht: hình như cần phải build cái JAR chỗ cái tool/license phải ko á
  [14:05] kietnht: cái script nó sẽ lấy cái JAR để chạy mà nhỉ
  [14:07] kietnht: image.png
  [14:12] tuanntg: Không cần build a, build lib với build app là đủ rồi
  [14:12] tuanntg: Xong a chạy clr nó tự lấy jar nó chạy ra
  [14:13] tuanntg: Lúc nó generate file sẽ có output kết quả payload ra cho a xem khi xong
  [14:13] kietnht: à rồi rồi, build-lib nó đã build luôn cái tool/license
  [14:14] vytth: * Khi nào bà qua á, chắc tầm 4g Hân qua tui dc ko ne Han Do
  [14:14] kietnht: ``` tools/licensing/bin/license.sh -v \   -l <INSTALLATION_ID> \   -d 2040-12-31 \   -mo -t 10000 \   -op -oc 10 -cr 500
  [14:14] kietnht: command như này phải ko?
  [14:15] tuanntg: Chuẩn rồi a
  [14:27] kietnht: image.png
  [14:27] kietnht: chỗ companyName, hình như phải upload cái file lên thì API status mới có data Tuan Nguyen
  [14:33] tuanntg: Có sẵn rồi a
  [14:33] tuanntg: A gọi postman ấy
  [14:38] kietnht: 
  [14:38] kietnht: image.png
  [14:47] kietnht: ủa đâu phải Tuan Nguyen script build-libraries không build JAR mới cho tool/license, a chạy cái command gen, nó vẫn lấy 
  [14:47] kietnht: * ủa đâu phải Tuan Nguyen script build-libraries không build JAR mới cho tool/license, a chạy cái command gen, nó vẫn lấ
  [14:47] kietnht: * ủa đâu phải Tuan Nguyen script build-libraries không build JAR mới cho tool/license, a chạy cái command gen, nó vẫn lấ
  [15:00] tuanntg: À, vậy chắc tại bữa giờ e chạy local cái mỉcroservice license dưới local nên nó không lỗi
  [15:00] tuanntg: A nhờ AI check thử chứ e chưa đụng lỗi á
  [15:08] kietnht: ủa mà dưới local e chạy sao để gen đc cái file á
  [15:30] tuanntg: Cũng chạy lệnh như a thôi á
  [15:31] tiennd2: https://precognize.atlassian.net/jira/software/projects/OP/boards/317 chị Vy Tran cho e hỏi ý này chút `Tags connected t
  [15:42] vytth: okie, đê c hỏi bả làm rõ ý này
  [15:56] kietnht: Vy Tran:  e hiểu câu hỏi ko á, chắc confirm lại xem cách hiểu này là đúng ko nha. Các cách hiểu khác có vẻ rất khó để là
  [15:57] vytth: em hiểu, nma e thấy ý 2 cũng đúng mà, tag có data nghĩa là có pattern để learn dù data đó có cũ, còn data from now thì n
  [15:58] vytth: có những máy móc thuộc hạng seasonal, mùa này họ sxuat cái này (bật tag này), mùa kia sx cái khác (bật tag kia), thì dat
  [16:00] vytth: 
  [16:01] vytth: * em hiểu, nma e thấy ý 2 cũng đúng mà, tag có data nghĩa là có pattern để learn dù data đó có cũ, còn data up to now th
  [16:01] vytth: * có những máy móc thuộc hạng seasonal, mùa này họ sxuat cái này (bật tag này), mùa kia sx cái khác (bật tag kia), thì d
  [16:02] tiennd2: nếu cách số 2 thì buộc vài look back từ năm xửa năm xưa đến hiện tại luôn, thì có vẻ sẽ tính toán lâu
  [16:02] tiennd2: * nếu cách số 2 thì buộc phải look back từ năm xửa năm xưa đến hiện tại luôn, thì có vẻ sẽ tính toán lâu
  [16:05] tiennd2: nếu vậy cũng nên có 1 con số look back maximum á mọi người, giả sử mình chỉ look back tối đa 3 năm trở lại đây thôi
  [16:49] kietnht: image.png
  [16:50] kietnht: Vy Tran: kêu ổng giải thích rõ ý đó cái nha, a ko hiểu ổng nói gì, ko biết có ảnh hưởng gì tới những gì đang làm ko nữa
  [16:53] duyvna: Card nào deployed rồi thì change stt Jira cho đúng để biết mà test nha mn
  [17:04] kietnht: image.png
  [17:04] kietnht: Tuan Nguyen:  vậy ok chưa?
  [17:07] kietnht: license-Ajinomoto-Thailand-NUS-Default.key
  [17:07] vytth: là phải ổng hỏi cấu trúc dữ liêu license trong mongo ko a
  [17:07] kietnht: Sam Ha:  file license, upload lên thử
  [17:13] kietnht: uhm, mà cái chỗ application will know gì ấy.... ko rõ ổng nói cái gì
  [08:48] kietnht: image.png
  [08:48] kietnht: Tuan Nguyen:  a upload file license hôm qua lên thành công rồi nha, các API cần integrate e transfer qua cho Sam Ha đi ?
  [08:49] kietnht: image.png
  [08:49] kietnht: API status
  [08:51] vytth: attachment.png
  [08:52] kietnht: hmmm
  [08:52] kietnht: vậy là dùng mấy cái hàm có sẵn
  [08:52] anhttl: 9h15 nha mn
  [08:52] kietnht: vậy UI coi chừng bị si
  [08:52] kietnht: *sai
  [08:52] vytth: > average can be removed avg=mean > no need rolling window ,, therefore to reuse use as default 1 year em gửi này bả con
  [08:53] vytth: * > average can be removed avg=mean > no need rolling window ,, therefore to reuse use as default 1 year em gửi này bả c
  [08:53] vytth: không cần cái time window với time unit
  [09:10] vytth: * Nay target như này nha mn: - anh Tuan Nguyen deploy phần upload license để anh Sam Ha integrate, và hnay cũng xong phâ
  [09:16] kietnht: go
  [09:17] anhttl: Duy Vo: nay anh có join đc ko anh
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
  [09:49] anhttl: + anh Trí gắn trend chart step 1 step 2 + anh Phong làm tiếp https://precognize.atlassian.net/browse/OP-27 + anh Sâm gắn
  [09:56] trinm: vp_server/dae/rest/equipment-templates/ Kiet Nguyen
  [09:57] tiennd2: cái này hôm qua Lan Anh confirm rồi nha chị Vy Tran, ý X month mình bàn bữa giờ
  [09:58] anhttl: Han Do: chị ơi nay chị test bên này hông chị
  [10:05] handn: Chiều nha
  [10:27] kietnht: down server check issues tí nha mn
  [10:57] anhttl: anh Duong Doan ơi, cho em hỏi thăm về tình hình review code của team tuần rồi với nha
  [11:00] duongdn: a thấy các bạn có review chéo code với nhau đúng mục tiêu, còn vài cái PR gần đây thì chưa
  [11:01] anhttl: Anh có review của team chưa ạ
  [11:01] duongdn: chưa review à, plan chiều nay
  [11:03] anhttl: Vậy plan của anh là review code định kỳ mỗi tuần 1 lần, chiều T6 hay sao ạ
  [11:04] duongdn: ko em, a random thôi
  [11:05] anhttl: Random nhưng chắc ít nhất 1 tuần 1 lần được ko anh
  [11:05] duongdn: ok
  [11:06] anhttl: Dạ oki, có gì anh gửi nhẹ 1 msg là đã review hay sao đó mỗi lần như vậy để em nắm nha
  [11:07] duongdn: OK
  [11:18] kietnht: image.png
  [11:18] kietnht: server up lại rồi nha
  [13:33] duongdn: elena-op-fe-team-action-items.html
  [13:34] duongdn: A có ít feedback collect cho team FE nha
  [13:34] duongdn: * A có ít feedback  cho team FE nha
  [13:46] handn: e muốn test thử case License đạt tối đa dung lượng, cần update thêm, a Kiet Nguyen có key cho case này k a [thread: 13 replies]
    └ [14:07] tuanntg: Hiện tại dung lương nó đâu tối đa đâu e, để a tạo file .key có dung lượng bằng hiện tại
    └ [14:07] tuanntg: Rồi e up lên trước nhá
    └ [14:07] tuanntg: Sau đó a gửi bộ keys khác cho e
    └ [14:09] handn: ok a
    └ [14:22] tuanntg: license-Ajinomoto-Thailand-NUS-Default.key
    └ [14:22] tuanntg: e upload cái này lên trước nha
    └ [14:22] tuanntg: Này là .key only Monitor với max là 4,604 tag
    └ [14:23] handn: e upload rùi a
    └ [14:24] tuanntg: license-Ajinomoto-Thailand-NUS-Default.key
    └ [14:24] tuanntg: Này là key đã update, nó là only Monitor max 10.000
    └ [14:33] handn: image.png
    └ [14:34] handn: v nếu như max như này thì k hiển thị nút upgrade ha a
    └ [14:36] tuanntg: a hông biết á e, này chắc hỏi FE có hông hoặc confirm lại BA nhe
  [13:47] duongdn: elena-op-be-team-action-items.html
  [13:47] duongdn: Còn đây là bên BE nha :D
  [13:49] duongdn: OK, mn sắp xếp xử lí đi, có nhiều issue nên fix rồi apply rule từ đầu, đừng như xưa cus bắt fix 1 lần cả trăm chỗ
  [13:59] duongdn: === Question: bên BA có revivew qua spec dev viết chưa mn :D
  [14:05] kietnht: > <@handn:nustechnology.com> e muốn test thử case License đạt tối đa dung lượng, cần update thêm, a Kiet Nguyen có key c
  [14:08] anhttl: Vy Tran:
  [14:09] anhttl: * Vy Tran, Han Do, Duy Vo: Đăc thù milestone này test sẽ cần mình chuẩn bị data trước, vd như case có A mà ko có B, có B
  [14:34] vytth: ý trước  > The System Administrator is responsible for editing and managing licenses. All users with Optimization permis
  [14:34] vytth: * ý trước > The System Administrator is responsible for editing and managing licenses. All users with Optimization permi
  [14:35] vytth: * ý trước > The System Administrator is responsible for editing and managing licenses. All users with Optimization permi
  [14:36] vytth: * Liên quan đến vụ view license, ý trước > The System Administrator is responsible for editing and managing licenses. Al
  [16:15] samht: OP-9 license check vs module check OP-13 step 1 implement đủ hết Đã trên staging, QC bắt đầu vô test vs discuss thêm vs 
  [16:17] anhttl: ok có task mới chưa anh
  [16:18] samht: a đang làm bên khác nha e Anh Trinh
  [16:18] samht: ah cái step 1 như còn vài bug UI chưa fix (có aware r) nhưng cứ log lại cho dễ track nha
  [16:26] trinm: Screenshot 2026-10-09 at 16.26.28.png
  [16:26] trinm: Vy Tran:
  [17:10] anhttl: anh Duong Doan ơi, 2 file feedback FE BE ở trên là cần all dev mỗi bên check hay assign đại diện 1 người được rồi ấy ạ
  [17:11] duongdn: all dev, để tránh issue lặp lại
  [17:11] duongdn: phân công làm thì tùy mn
  [17:19] anhttl: Vậy các dev check nha, ai đã review xong (chưa fix) thì react confirm ạ.
  [17:19] anhttl: FE
  [17:19] anhttl: BE
  [17:20] kietnht: BE a chưa coi nha
  [17:21] kietnht: xong task a coi =))
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

### Growth Mentorship Program – Mentors & HR — 1 message
  [13:45] hangdtt: Hi anh/chị, Growth Mentorship Program hiện đã chính thức bắt đầu triển khai sau giai đoạn pilot. So với giai đoạn pilot,

### James Diamond - Portfolio — 70 messages
  [09:08] minhtv: Thang Nguyen:  em nhảy qua bên này tạm thay Anh Nguyen  làm nhé, nhà bạn có việc.  Chúng ta còn vài giờ nữa, Hoàng Anh s
  [09:12] anhnh2: bên james tuần này 20h, mà hết sáng nay là đủ 16h ạ anh, vậy a Thang Nguyen sẽ làm tiếp 4h hàng ngày từ mai nhỉ anh Minh
  [09:13] minhtv: Anh cần làm quen nữa, nên cứ tiến hành từ làm quen trước, giờ giấc có thể tăng, cần bảo đảm chất lượng
  [09:14] anhnh2: dạ anh
  [09:15] minhtv: Thắng hoàn thành flow, nắm đủ task, ready mọi thứ báo a nhé
  [09:16] thangn: oke
  [10:03] thangn: been main app
  [10:03] thangn: run flutter bao nhiêu d e
  [10:04] anhnh2: 3.19.5 nha a ơi
  [10:42] thangn: okie hết ròi nha cưng
  [10:44] minhtv: bốc task làm thử cho quen luôn
  [10:44] thangn: okie cưng
  [17:14] lenh: Có ae nào từng làm hay có thông tin từng biết qua WithCott's WCS-NETMAP-01 và PowerBi - Power BI trong project này không
  [17:15] duongdn: Phuc Vo:  ?  BTW, hỏi Tuan xem, hinh như cũng làm 1 thời gian
  [17:15] duongdn: lâu quá ko ai nhớ thì cứ nói thẳng ko nhớ
  [17:15] duongdn: nói cus y chang zị :))
  [17:17] phucvt: LORA API và Traccar thì em có biết. Còn "WithCott's WCS-NETMAP-01" nó là một device hay sensor thì phải. "PowerBi - Powe
  [17:17] phucvt: Le Ngo: Có vấn đề gì cần hỏi hả anh?
  [17:20] lenh: "I found it's not one integration polling, it's three separate API keys actively hitting us right now, continuously, wit [thread: 4 replies]
    └ [17:26] phucvt: image.png
    └ [17:26] phucvt: Bên mình lúc trước e nhớ có tạo 1 API key thôi, mình đang dùng
    └ [17:27] phucvt: Còn 2 keys khác mà trong chat nói là "WCS-NETMAP-01 and one named PowerBi" thì k rõ từ đâu ra
    └ [17:30] phucvt: Để e qua anh trao đổi cho rõ hơn
  [17:21] lenh: Bên LORA mình có account manage mấy keys không?
  [17:21] lenh: Bên đó đang báo là có số lượng truy cập nhiều bất thường
  [17:24] phucvt: Có anh, anh vô workstream lấy nha, search lora là thấy
  [17:26] lenh: Cái Traccar là bên mình làm luôn sao Phúc
  [17:26] lenh: source code, setup cái thứ
  [17:28] phucvt: Lúc em vô làm là đã có Traccar sẵn rồi. Em nhớ mại mại là bên mình setup, k biết đúng ko
  [17:29] phucvt: Để e hỏi anh Tuấn
  [17:30] phucvt: Dev cũ setup, em nhớ server trên AWS á anh. Lên đó kiếm thử anh
  [11:35] phucvt: * Dev cũ setup, em nhớ server trên AWS á anh. Lên đó kiếm thử anh -------------- Update: đã trao đổi và clear với anh Lễ
  [15:07] duongdn: ===== qua giờ ko thấy James trả lời, ổng có online ko vậy mn
  [15:08] thangn: ổng có online rep e lúc 12h trưa ó
  [15:08] duongdn: ok e
  [16:00] lenh: ổng reply rồi nè anh: yes sir travelling but have aranaged for this to be paid
  [16:01] lenh: I am on school holidays / with my family not working  My responses may be delayed
  [16:03] duongdn: ok e
  [09:55] duongdn: Phuc Vo:  e sắp xếp quay lại làm ít giờ bên này nha, a cần lấy LeNH ít giờ Số giờ và task tì LeNH sẽ báo e sau khi bạn l
  [09:55] duongdn: * Phuc Vo:  e sắp xếp quay lại làm ít giờ bên này nha, a cần lấy LeNH ít giờ Số giờ và task thì LeNH sẽ báo e sau khi bạ
  [09:55] phucvt: Ok anh
  [14:54] duongdn: Le Ngo:  e làm Franc hết bao lâu nhỉ, báo Phúc nha
  [14:55] lenh: Anh mới investigate và fix bug hết 3h nha Franc nha Phuc Vo  c.c anh Duong Doan
  [14:55] lenh: * Anh mới investigate và fix bug hết 3h bên Franc nha Phuc Vo c.c anh Duong Doan
  [14:56] phucvt: Ok anh, cuối giờ hôm nay em qua anh get transfer. Rồi mai em sắp xếp start nha?
  [14:57] lenh: ok em
  [08:58] duongdn: Hi PhucVT, task log for 2026-09-28 is missing (0h logged). Please update when you can. Thanks!
  [13:54] duongdn: Tuan Nguyen:  sorry em, qua đây làm trước nha, cần làm bủ 3h cho Le Ngo  Xong rồi hẳn qua bên kia
  [17:24] tuannt: Bên Bailey về task thì e làm bên này hay bên Bailey anh Duong Doan
  [19:25] duongdn: Bailey nha
  [09:37] duongdn: hôm nay cố gắng làm bù cho đủ bên này nha Tuan Nguyen
  [09:37] duongdn: đỡ qua tuần sau phiền
  [09:37] tuannt: vậy ưu tiên bên này hả anh ?
  [09:38] duongdn: bên Bailey có gì gấp ko
  [09:38] tuannt: bên kia đang có task mà
  [09:38] tuannt: fixbug console
  [09:38] duongdn: chắc cứ làm 3h bên này trước đi, bù cho xong , cũng release được cái Grazing rồi
  [09:39] duongdn: bớt áp lực chút
  [09:39] tuannt: ok a
  [09:40] tuannt: Phuc Vo: Le Ngo có gì gửi t info setup lại nha.
  [09:47] phucvt: Tuan Nguyen Xem phần Info - Project Transfer trên Workstream nha anh
  [09:50] tuannt: Duong Doan: có gì share e workstream nha a
  [09:55] duongdn: để a báo công ty , chỉ có vài người có quyền add người thôi
  [10:00] duongdn: add rồi nha
  [10:04] tuannt: Le Ngo: cho t database ông
  [10:04] tuannt: à thấy r
  [10:04] tuannt: mà k biết db cũ k :))
  [10:05] phucvt: Cũ thì chắc vẫn import được bình thường á anh, xong chạy migrate thui :))
  [10:06] tuannt: Duong Doan: a share e google vinn@nustechnology với e tạo profile mới tránh đụng mấy cái git đã login r
  [10:12] duongdn: shared

### Kevin Kung - Codeorange — 27 messages
  [13:34] lucnt: https://app.clickup.com/t/9017689349/86e38j14d Mấy issue trong này chú kêu urgent, nên anh Phong Tran  sắp xếp live hôm  [thread: 1 reply]
    └ [14:30] phongtb: Done nha ae ơi Luc Nguyen , aThanh Nguyen
  [13:34] lucnt: Task mới xong em check qua oki rồi á
  [08:29] kietnvt: Plan tuần 21/09: Phong Tran Luc Nguyen PhongTB 8h Courtney (T2) bù ThiHV off, actual có thể cao hơn, làm Kevin Kung nếu 
  [13:40] lucnt: Anh  Thanh Nguyen Phong Tran   tranh thủ xong task này trong T5 giúp em để release nha: Revamp Employee Qualification Mo
  [14:40] lucnt: Anh Phong Tran , Thanh Nguyen  release luôn hôm nay giúp em mấy task trong list này nha anh: https://app.clickup.com/t/9 [thread: 1 reply]
    └ [15:31] phongtb: Đã lên production nha ae Luc Nguyen , a Thanh Nguyen
  [09:39] namtv: Bên này tình hình tasks sao Luc Nguyen ?
  [09:40] namtv: Tuần này còn gì làm ko? Ổng có plan gì ko?
  [09:44] lucnt: 2 tuần nay không có task mới, chỉ có mấy task nhỏ kiểu fix hoặc update thêm. Tuần này có fix bug redmine task QC đang te
  [09:47] namtv: Vậy Phong full bên khác, bên này từ giờ cần thì request tường minh nha
  [09:48] lucnt: Dạ oki anh
  [14:22] lucnt: Anh Nam Tran  cho em xin tầm 1H trong chiều nay để anh Phong release task bên này nha anh
  [14:27] namtv: OK em
  [14:30] lucnt: Anh Phong Tran  trong chiều nay anh sắp xếp release giúp em mấy task trong này nha anh: https://app.clickup.com/t/901768 [thread: 1 reply]
    └ [17:27] phongtb: Done r nha ae Luc Nguyen Thanh Nguyen
  [14:30] lucnt: FYI anh Thanh Nguyen
  [16:14] lucnt: Anh Nam Tran  bên này có task em xin anh Phong qua làm nha anh
  [22:15] namtv: OK em
  [22:15] namtv: Nhiều ko em?
  [08:31] lucnt: Chỉ vài task nhỏ thôi anh
  [08:32] lucnt: Add Qualification Files To Archive File Library	https://app.clickup.com/t/9017689349/86e3mtj0a Update the Copy Email Lis [thread: 1 reply]
    └ [10:08] phongtb: Ok e, a mới qua nha e
  [09:05] lucnt: Anh Phong Tran  Thanh Nguyen  nay hoặc mai mình release mấy task trong này nha anh: https://app.clickup.com/t/9017689349 [thread: 1 reply]
    └ [14:38] phongtb: Đã release nha ae Luc Nguyen , Thanh Nguyen
  [09:05] lucnt: Có mấy bug redmine liên quan, anh Nam Tran  cho anh Phong qua fix bug để release luôn nha anh
  [09:07] namtv: OK em

### Kunal - Fountain — 1000 messages
  [14:32] datnt: * hổm ổng push vô master lun mà :v
  [14:48] datnt: có ai đang deploy không á anh chị
  [14:49] datnt: em xoay vòng vòng BETA rồ á
  [14:49] hungpn: ai mạng chậm thì hãy sài tạm extension 1clickvpn này nhé, đổi sang mỹ cho nó lẹ [thread: 7 replies]
    └ [14:51] thinht: ubuntu k thấy
    └ [14:52] thinht: ai xài ubuntu thì dùng TouchVPN
    └ [15:35] vitht: sao e dùng cái a Hùng nói mà dô admin của production nó cũng quay vòng vòng à
    └ [15:49] hungpn: anh vào ầm ầm luôn á
    └ [16:06] vitht: Screenshot 2026-09-25 at 4.06.16 pm.png
    └ [16:07] thinht: a cũng ầm ầm :D
    └ [16:07] datnt: em bật lên vô ầm ầm chứ api call từ nó ra thì time out nha :))
  [15:07] thinht: a LOY staging FE á nha mn
  [15:11] thinht: nhớ test cái reviewsIO nhan Hung Pham [thread: 3 replies]
    └ [15:14] hungpn: gửi dùm lại trang admin vs
    └ [15:16] thinht: https://dash.reviews.io/ đây hã
    └ [15:48] hungpn: okie nha
  [16:07] datnt: * em bật lên vô ầm ầm chứ api call từ nó ra thì vẫn time out nha :))
  [16:33] datnt: Hung Pham anh ơi có bug redmine này anh QC giúp em nha https://redmine.nustechnology.com/issues/81137?issue_count=153&is
  [08:30] vitht: ổng nói có một bug của cái blurb nha
  [08:30] vitht: https://trello.com/c/67Rrcyf8/3116-blurb-bug
  [08:41] vitht: ổng có update yêu cầu card này lunn nhenn  https://trello.com/c/BAI99Jrx/2895-fountain-product-page-bottle-engraving [thread: 4 replies]
    └ [08:41] datnt: card này giờ ai đang handle lun vậy chị
    └ [09:01] vitht: chị nè e
    └ [09:01] vitht: mà c đang làm card kia nên chưa qua đc
    └ [09:01] datnt: dạ oki chị
  [08:47] vitht: ổng có rep card này lun nhenn  https://trello.com/c/vADuMMNP/3099-fountain-gifts-infinity-roses-analytics-implementation
  [08:56] datnt: Hung Pham card bug này em done rồi nha anh QC giúp em nha https://trello.com/c/67Rrcyf8/3116-blurb-bug [thread: 2 replies]
    └ [08:56] hungpn: để anh check
    └ [09:26] hungpn: tested xong nha Dat Nguyen
  [09:02] trinhmtt: em gửi plan tuần này ạ  ViTHT: 40h ThinhT: 20h DatNT: 40h => QC: 25h
  [09:06] vitht: Hung Pham:  https://trello.com/c/tSuQHKwj/2978-infinity-giftdrop-recipient-flow  a Hùng ơi add trước image gift variant  [thread: 2 replies]
    └ [09:27] hungpn: okei em
    └ [10:08] hungpn: anh đang up cho itema này nha Large Square Rose Box
  [09:28] datnt: Vu Tat anh review giúp em PR này nha, anh loy xong anh clear cache giúp em luôn nha #[3116](https://trello.com/c/67Rrcyf [thread: 1 reply]
    └ [09:51] vutq: done nha Dat Nguyen
  [09:38] vitht: Screenshot 2026-09-28 at 9.38.11 am.png
  [09:38] vitht: kêu ổng improve cái UI này lại nè Trinh Mai   kiểu nó đang bị dài quá á
  [09:39] vitht: kiểu ổng làm dạng dropdown mà có search á. Giống cái select2
  [09:49] vitht: lúc mn bấm "Add to cart" trên beta Fountain Gift có bị lỗi này hông [thread: 2 replies]
    └ [09:49] datnt: có nha chị
    └ [09:50] datnt: em mới test thử cũng bị như chị á
  [09:49] vitht: Screenshot 2026-09-28 at 9.48.49 am.png
  [10:04] vitht: Để chị xem thử
  [10:12] hungpn: image.png
  [10:12] hungpn: hình này thêm chỗ nào á m.n nhỉ [thread: 18 replies]
    └ [10:16] datnt: anh đang ở folder nào á anh
    └ [10:22] datnt: này anh thêm vô trong gift variant của gift đó cái nào có box color trắng thì anh thêm vô ảnh thứ 4 
    └ [10:22] datnt: image.png
    └ [10:28] hungpn: okie
    └ [10:28] hungpn: image.png
    └ [10:28] hungpn: check dùm anh sao nó có dư nh hình vậy nhỉ?
    └ [10:29] datnt: cái đó hình của gift á anh
    └ [10:29] datnt: image.png
    └ [10:30] datnt: 3 ảnh đầu nó lấy gift variant, rồi nó check tiếp lấy ảnh của gift nữa á anh
    └ [10:38] hungpn: https://beta.infinityroses.com/preserved-roses/large-square-box/large-square-box-rose-mix-roses-Whit
    └ [10:42] datnt: anh thử để 10p sau xem nó dính cache không nha, giờ em đang dính card á
    └ [11:20] hungpn: anh vẫn chưa thấy show
    └ [11:20] datnt: hmmm dị để em qua check cho anh
    └ [11:38] datnt: cái này do đang bị trùng màu Hex giữa thằng Tuxedo với thằng Black Galaxy á anh nên nó chỉ render ra
    └ [11:38] datnt: chắc để em handle case này lại
    └ [11:53] datnt: Hung Pham anh check lại thử nha
    └ [13:44] hungpn: có rồi nhé
    └ [13:46] datnt: anh check thêm cái này cần handle lại behavior gì thêm không nha cái hiện rose color này á, nếu khon
  [11:21] hungpn: https://beta.infinityroses.com/preserved-roses/large-square-box/large-square-box-Turquoise-Blue-Roses-White-Box -- Vi Tr
  [11:25] hungpn: duplicate giftdrop sao k thấy gì hết nhỉ?
  [11:25] hungpn: image.png
  [11:25] hungpn: ai rảnh check dùm anh
  [11:38] vitht: cái bug hồi sáng liên quan tới trang ProductOverView [thread: 6 replies]
    └ [11:40] thinht: là lỗi gì vậy e
    └ [11:51] vitht: lỗi hiện tại không phải "trang /cards bị hỏng". Khả năng cao là ReviewsIO được khởi tạo trên Product
    └ [11:52] vitht: fountainnewui/components/Product/ProductReviews.tsx  file này nè a , a dô coi thử đi
    └ [11:55] hungpn: trên view của user có steps nào đặc biệt hok em
    └ [11:59] vitht: đăc biệt là sao a
    └ [11:59] vitht: e test cái case happy lun á, là nó bị
  [11:38] vitht: * cái bug hồi sáng liên quan tới trang ProductRevieww, sau này có push lên live thì mn chú ý case này nha. Vi mới fix tr
  [11:38] vitht: Screenshot 2026-09-28 at 9.48.49 am.png
  [11:39] vitht: * cái bug hồi sáng liên quan tới trang ProductRevieww, sau này có push lên live thì mn chú ý case này nha. Vi mới fix tr
  [13:25] thinht: Dat Nguyen: tình hình bữa fix zụ mất codes  đó ổn k e? vẫn giữ nguyên code của Cus chứ? [thread: 2 replies]
    └ [13:32] datnt: vẫn giữ lại nhiều á anh
    └ [13:32] datnt: hên là hổm chỉ bị cái show GOC cho pro thôi nên là vẫn handle được anh
  [13:29] thinht: cho a xin ticket nha Trinh Mai [thread: 2 replies]
    └ [13:35] trinhmtt: https://trello.com/c/z8P7mYj5/3117-infinity-update-gift-variant-export
    └ [13:35] trinhmtt: đây nha anh
  [15:35] datnt: anh chị ơi cho em hỏi dạo này có ai vô Order tab của Admin LIVE Foutain rồi update/upload gì chỗ cái nút này đâu phải kh [thread: 3 replies]
    └ [15:37] thinht: a k có
    └ [15:37] datnt: nó cứ bị update lại cái form mà khách tải về thành file sheet cũ á, nên nếu cus không update mà mình
    └ [15:44] vitht: liên hệ a Vũ trên production nha
  [15:35] datnt: 
  [15:36] datnt: Screenshot from 2026-09-28 15-34-32-1.png
  [15:37] vitht: chị không có đụng á. Sao v
  [15:37] vitht: Nó bị gì
  [15:48] datnt: Hung Pham có card này em fix lên STAING rồi anh QC giúp em nha. Nó bị gift chưa có tạo mà đi kiếm nó bằng cách nhập thẳn [thread: 29 replies]
    └ [15:53] hungpn: image.png
    └ [15:53] hungpn: lỗi vầy hả em
    └ [15:53] datnt: ở bên Admin á anh
    └ [15:53] datnt: chứ không phải bên UI user á
    └ [15:54] hungpn: ak rồi
    └ [15:54] hungpn: nhưng fix mỗi page đó thôi hả em
    └ [15:55] datnt: hmmm em có fix 1 số page nữa như category, card, card category
    └ [15:55] datnt: nhưng mà chưa hết thì phải
    └ [15:56] hungpn: như cái này anh nhập id thì nó phát hiện được nhưng anh mà nhập cái ký tự chữ vào là nó thua nè
    └ [15:56] hungpn: image.png
    └ [16:04] hungpn: image.png
    └ [16:04] datnt: mấy thằng khác có bị dính case này khôngh á anh
    └ [16:04] hungpn: anh  đang đi thủư nè
    └ [16:05] hungpn: gần như là bị hết á
    └ [16:05] datnt: dạ oki anh để em check fix tiếp
    └ [16:08] hungpn: page: - Gifts - Order - Order Items - User - Credits - Gift Variants - Rose Colors - Holiday Deliver
    └ [16:20] datnt: ủa anh Hung Pham  - Gift Variants - Rose Colors là bên infinity anh nhỉ
    └ [16:21] hungpn: em đang fix bên founttains hả
    └ [16:21] datnt: đúng rồi anh :))
    └ [16:21] hungpn: vậy để anh xem lại
    └ [16:25] hungpn: Fountains: - Promo Codes -
    └ [16:26] hungpn: conf sot lai ak ne em
    └ [16:26] datnt: dạ oki anh
    └ [16:29] datnt: Proof Templates cái này anh log ticket vô card này giúp em nha https://trello.com/c/ce8n3niB/3040-fo
    └ [16:29] datnt: nó nằm bên nhánh kia chưa có lên LIVE nên không có fix chung theo được á anh
    └ [16:33] hungpn: okie em
    └ [16:42] datnt: cái này Done với em mới update thêm mấy cái tab admin kia lun nha anh
    └ [10:58] datnt: Cái này em Done luôn lên Staging rồi nha anh Hung Pham
    └ [10:59] hungpn: okie em
  [15:50] hungpn: okie em
  [16:25] hungpn: * Fountains: - Promo Codes - Proof Templates
  [16:44] thinht: https://trello.com/c/z8P7mYj5/3117-infinity-update-gift-variant-export check con này luôn nhan Hung Pham
  [08:18] vitht: ổng có hỏi card này nha mn ơi  https://trello.com/c/xIukJjhO/2955-infinity-account-and-auth  Hung Pham Trinh Mai [thread: 4 replies]
    └ [08:55] thinht: hỏi ổng muốn lên Live luôn hay ntn nhan Trinh Mai
    └ [09:10] hungpn: gửi ổng 1 message đi nè, cái đó done rồi hỏi xem có live k. Có khi oognr k thấy message nên hỏi đó
    └ [09:15] trinhmtt: Đạt mới check chưa đúng design nen cần update lại nha mn
    └ [09:16] hungpn: confirm nha
  [09:18] trinhmtt: https://trello.com/c/tY3yvAti/3120-development-master-key có ai biet cai s này là cái gì k ạ [thread: 3 replies]
    └ [09:19] datnt: cái đó key mã hóa để mở file credentials thì phải á chị
    └ [09:21] vitht: cái master.key để ổng chạy app duói local á. Gửi trên này đc hem. Hay qua what app
    └ [09:21] trinhmtt: để em gửi qua what's app nha
  [09:18] vitht: cái số item trên cùng một hàng có cần giống bên product detail lun hem
  [09:18] vitht: Screenshot 2026-09-29 at 9.18.10 am.png
  [09:19] vitht: Screenshot 2026-09-29 at 9.19.00 am.png
  [09:19] vitht: thấy một hàng 9, còn một UI là hàng 10
  [09:19] trinhmtt: ddạ có
  [09:19] vitht: okie a Hùng post bug giúp e vói nha
  [09:19] vitht: của card 2978
  [09:19] vitht: lát e xong card này e qua fix lun
  [09:23] vitht: https://trello.com/c/qorCBsuP/3121-security-fixes-ready-for-review
  [11:47] datnt: Hung Pham anh ơi card này em update lại lên BETA rồi nha anh, anh Test nó giúp em nha  https://trello.com/c/xIukJjhO/295 [thread: 19 replies]
    └ [11:52] hungpn: tý anh vào check nhé
    └ [14:50] hungpn: check lai treen view mobile dumf anh nha
    └ [14:50] hungpn: em vào nhấn cho nó show lỗi là error nó đè lên title á
    └ [14:51] datnt: image.png
    └ [14:51] datnt: này phải không anh
    └ [14:51] hungpn: đúng rồi
    └ [14:51] datnt: dạ oki anh để em update
    └ [14:57] hungpn: https://redmine.nustechnology.com/issues/81190
    └ [14:57] hungpn: đây nữa nha
    └ [15:06] datnt: Hung Pham Done nha anh check lại giúp em nha
    └ [15:11] hungpn: image.png
    └ [15:11] hungpn: thiếu cái nay ne Dat Nguyen
    └ [15:12] datnt: trang này ngoài scope rồi á anh
    └ [15:12] hungpn: image.png
    └ [15:13] datnt: scope em confirm là cái popup Auth với lại page /account thui á anh
    └ [15:14] hungpn: okie
    └ [15:44] hungpn: cái này xong chưa em
    └ [15:47] datnt: dạ rồi á anh
    └ [15:47] datnt: em có thêm cái rounded vô rui á
  [13:33] thinht: Trinh Mai: cho a xin ticket nha, Vi Tran có task nào cần a fix k vậy
  [13:34] vitht: Dạ cái task review á a
  [13:34] vitht: lúc a add một item dô cart thì nó chuyển tới trang chọn card
  [13:34] vitht: nó bị như vậy
  [13:35] vitht: Screenshot 2026-09-28 at 9.48.49 am.png
  [13:35] vitht: e fix trên staging rồi, a check lại trên branch của a thử
  [13:35] vitht: lỗi hiện tại không phải "trang /cards bị hỏng". Khả năng cao là ReviewsIO được khởi tạo trên Product page, tự thay đổi D [thread: 2 replies]
    └ [16:40] thinht: Hung Pham: t mới update sơ cách load lại reviews check xem thử nhảy qua nhảy lại zữa các trang, hay 
    └ [16:41] hungpn: qua nc nè m
  [13:39] trinhmtt: https://trello.com/c/tSuQHKwj/2978-infinity-giftdrop-recipient-flow#comment-6abb3a034c2ddf6727db896e con này của ai Live
  [13:43] vitht: c đang làm á
  [13:43] vitht: đang handle conflict cái
  [14:54] vitht: review giusp c pull request này vs Vu Tat  ơi a
  [14:54] vitht: https://github.com/iamksheth/FountainNewUI/pull/499
  [14:54] vitht: * review giusp c pull request này vs Vu Tat  ơi
  [14:55] vitht: https://trello.com/c/tSuQHKwj/2978-infinity-giftdrop-recipient-flow
  [14:55] vitht: Cho card này
  [15:16] datnt: Vu Tat anh review giúp em PR này nha #[2500](https://trello.com/c/bUhZxZRE/2500-fountain-performance-of-website): https: [thread: 4 replies]
    └ [15:40] vutq: done nha em
    └ [15:40] vutq: image.png
    └ [15:40] vutq: bản fix này áp dụng cho mấy chỗ khác trong app luôn nha
    └ [15:41] datnt: dạ oki anh để em đi check rồi apply vô
  [16:13] vitht: https://github.com/iamksheth/FountainNewUI/pull/521  cái này cho 3023 nha Vu Tat  ơii
  [16:13] vitht: https://trello.com/c/gnw4qAwO/3023-infinity-update-preview-giftdrop-button-with-new-recipient-flow [thread: 1 reply]
    └ [16:23] vutq: done nha chị Vi Tran
  [16:44] vitht: a Hung Pham  ơi check card 2978 giúp e trên production với
  [16:46] vitht: * a Hung Pham  ơi check card 2978 và 3023 giúp e trên production với
  [08:33] datnt: Vu Tat anh ơi ổng có message ở card setup server nha anh https://trello.com/c/uPcfRWzN/3106-set-up-separate-test-environ
  [09:55] hungpn: check bug redmine nha
  [11:35] vitht: Hung Pham: A ơi cái này update một row 9 màu á, chứ k phải 10 màu á a ơii
  [11:35] vitht: update cái recipient address theo product detail
  [11:36] vitht: https://redmine.nustechnology.com/attachments/87894
  [12:22] vitht: 2978 có backend nữa Vũ oi
  [12:22] vitht: https://github.com/iamksheth/FountainGreetings/pull/460 [thread: 1 reply]
    └ [13:36] vutq: done nha chị Vi Tran
  [12:22] vitht: chiều e review rồi deploy dùm c nha
  [13:35] thinht: cho a xin ticket nha Trinh Mai [thread: 1 reply]
    └ [13:39] trinhmtt: https://trello.com/c/KNq08ij5/1796-ai-powered-message-screen  card này nha anh
  [14:43] vitht: https://redmine.nustechnology.com/issues/81200  Check lại giúp e con bug này vs a Hung Pham  ơi, đưa lên live rồi ạ [thread: 1 reply]
    └ [10:45] hungpn: tested DONE nha Vi Tran
  [15:24] datnt: Thinh Tran anh ơi cái card 3035 của anh giờ chờ QC done là lên LIVE thôi đúng khong anh [thread: 34 replies]
    └ [15:24] thinht: uhm e
    └ [15:25] datnt: https://github.com/iamksheth/FountainNewUI/pull/553
    └ [15:25] datnt: ổng mới múa cái gì nữa á anh 🥲
    └ [15:25] datnt: rồi ổng mention vô từa lưa PR em không hiểu đang muốn làm gì luôn rồi
    └ [15:27] thinht: bó tei r e
    └ [16:21] vitht: A Thịnh dô đọc hiểu code ổng thử a Thịnh
    └ [16:21] vitht: chứ h cũng k dám merge :v
    └ [16:24] thinht: ổng muốn live hã e? ổng làm 1 lần 2-3 PRs chẳng biết nên làm j luôn
    └ [09:46] hungpn: image.png
    └ [09:46] hungpn: Thinh Tran: như cái search này k áp dụng đúng ở chỗ Infinity Roses á nè
    └ [09:48] hungpn: ak k nó search 3 ký tự trong khung search 😐️
    └ [09:49] hungpn: image.png
    └ [09:49] hungpn: nào qua fix dùm cái này nếu nhấn clear thì là clear hết filter đang apply nha Thinh Tran
    └ [09:51] thinht: ủa m đâu
    └ [09:52] hungpn: đang ngồi làm nè
    └ [09:54] hungpn: image.png
    └ [09:54] hungpn: nhớ trước là có data trả về mà nay trả về rỗng luôn nhỉ
    └ [10:00] thinht: khách nó đổi logic vs mong muốn hiển thị r :D
    └ [10:01] hungpn: uhm, tính ra trước còn suggest nay thì khỏi luôn
    └ [10:01] thinht: m ngồi nhà ah
    └ [10:01] hungpn: AI đang chat vs mầy á
    └ [10:01] thinht: t báo CA
    └ [10:26] hungpn: image.png
    └ [10:27] hungpn: nếu k nhập cái search mà chọn option này thì đâu có ý nghĩa nhỉ
    └ [10:31] thinht: nay có lên cti hem boi.
    └ [10:38] hungpn: k nha bờ rô
    └ [10:39] hungpn: cần gì ibx riêng nha
    └ [10:49] thinht: okie, dẫy gom mấy lỗi đó lên redmine đi. để t xem qua ngâm cú ntn
    └ [11:14] hungpn: đã gom nha, tý lên hốt hụi nè
    └ [11:16] thinht: okie. chìu t loy 1 mớ lên staging ổng update nữa đó. h nhìu khi m nt hỏi ổng là ổng muốn làm cái tín
    └ [15:01] hungpn: có gì mới chưa mầy ơi
    └ [15:02] thinht: chưa đang xử lý khủng hoảng từ codes của ổng
    └ [16:04] thinht: Hung Pham: m test lại thử ntn. thấy cus nó bỏ cái tag sort rồi. thay bằng dạng này. khi không có tex
    └ [16:04] thinht: Screenshot from 2026-10-01 16-03-53.png
  [15:45] datnt: Vu Tat anh check giúp em PR này fix lại cái sizes cho Image nha anh, có đi verify lại các page change sizes này có khớp  [thread: 5 replies]
    └ [10:40] vutq: giữ set vw cũ nha Dat Nguyen  10vw, 25vw, 33vw, 50vw, 100vw chỉ cần chỉnh max-width giảm đi 1px thôi
    └ [10:46] datnt: Vu Tat mà có nhiều cái nó bị sai luôn số vw thì mình fix luôn không anh hay là cứ giảm 1px thôi á nh
    └ [10:47] vutq: sai hẳn vw thì fix, cái set anh đưa phía trên chỉ là những loại vw có thể sử dụng thôi
    └ [10:50] datnt: dạ oki anh để em done task hiện tại em đi check update lại
    └ [16:12] datnt: Vu Tat em update lại rồi nha anh
  [15:51] datnt: * Vu Tat anh check giúp em PR này fix lại cái sizes cho Image nha anh, em có đi verify lại các page change sizes này có 
  [10:28] datnt: Vu Tat anh review giúp em PR này nha #[2955](https://trello.com/c/xIukJjhO/2955-infinity-account-and-auth): https://gith [thread: 1 reply]
    └ [10:49] vutq: done nha em
  [10:53] datnt: * à dạ oki anh, để em done task hiện tại em đi check update lại
  [11:55] phatdlt: Screenshot 2026-10-01 at 11.54.56.png
  [11:56] phatdlt: Trinh Mai: A thấy chưa có quick add tại mấy item này trên build a box nè e. E suggest thử coi ổng cho task làm k á [thread: 1 reply]
    └ [13:29] trinhmtt: cái quick add anh nói ở card nao á anh Phat Le
  [11:56] phatdlt: Mới chỉ quick add ở những items link với fountain thôi
  [13:30] vutq: phần rose có nhiều variant sẽ không có quick add, đây là tính năng đã discuss với designer chứ không phải làm thiếu nha 
  [13:55] vitht: cái con trỏ lúc mở edit message nó về đầu là đúng hông ae [thread: 1 reply]
    └ [15:57] hungpn: trước anh nhớ là có 1 req update khi mở cái Edit message thì con trỏ chuột fai focus vào  message nh
  [13:55] vitht: Screenshot 2026-10-01 at 1.54.47 pm.png
  [13:55] vitht: * cái con trỏ lúc mở edit message nó về đầu là đúng hông ae ở infinity roses của production
  [14:09] trinhmtt: Vu Tat: qua đây giờ luon nhe anh ơi, giờ đến hết tuần anh spend bên đay luon nha anh
  [14:10] vutq: oke em
  [14:20] thinht: https://trello.com/c/KNq08ij5/1796-ai-powered-message-screen Trinh Mai ông Kunal move card này qua shelf là sao vậy ta. 
  [14:23] phatdlt: https://redmine.nustechnology.com/issues/81234 Vi Tran E log lại r nha c ơi
  [15:19] datnt: Hung Pham anh ơi QC lại card này giúp em nha https://trello.com/c/ce8n3niB/3040-fountain-build-internal-digital-proof-ge [thread: 18 replies]
    └ [15:21] datnt: này update lại 3 cái mới á anh:  - Ribbon Kunal muốn nó phải luồng được qua cái box tag á  - Giờ có 
    └ [15:21] datnt: draft-proof-v1.zip
    └ [15:25] datnt: cụ thể info hơn nữa thì anh có thể đoc 2 cái này - https://github.com/iamksheth/FountainNewUI/pull/5
    └ [15:25] hungpn: okie em
    └ [15:28] hungpn: login accont nao ak em?
    └ [15:29] datnt: anh log bằng acc anh hay xài để test trên UI Beta á anh
    └ [15:30] datnt: parker@nustechnology.com
    └ [15:30] hungpn: hok, ý anh là sài account nào login bên github á
    └ [15:30] datnt: à nhỉ để em check
    └ [15:30] datnt: rick@nustechnology.com
    └ [15:30] datnt: acc này á anh
    └ [15:31] datnt: trong cái quản lý acc anh có được share acc này chưa á
    └ [15:33] hungpn: hinh nhuw chuwa as nef
    └ [15:34] datnt: hmmm vậy để em copy ra notion rồi gửi link cho anh đọc
    └ [15:36] hungpn: okie liền nè
    └ [15:37] datnt: https://app.notion.com/p/Draw-3ec90c7db07b805e83c5df6a28795acd?source=copy_link
    └ [15:38] datnt: anh thử cái này xem vô đc không á anh
    └ [15:46] hungpn: dc nha em
  [15:33] hungpn: * hình như chưa có á nè
  [15:41] vitht: Deploy BE Fountain cái nha mn ơi [thread: 1 reply]
    └ [15:41] thinht: loy chưa
  [15:48] vitht: có ai merge 7 commit tói staging hả mn [thread: 18 replies]
    └ [15:49] datnt: em pick qua mà em pick nãy giờ lâu rồi á mà có 4 thôi á chị
    └ [15:50] vitht: của e là commit của card nào dị
    └ [15:50] vitht: cho c cái id vs
    └ [15:50] datnt: 3040 á chị
    └ [15:50] thinht: nếu nó là của Kirk thì là a đó
    └ [15:51] thinht: e loi BE xong chưa
    └ [15:51] vitht: e ms push mà nó bắt pull
    └ [15:51] thinht: còn thấy Kunal là thằng cus đó
    └ [15:51] vitht: e mới pick 2 commit của ổng qua
    └ [15:51] datnt: chị merge commit lâu chưa á
    └ [15:51] vitht: là e đó
    └ [15:51] datnt: nãy em pick qua lúc 3h á
    └ [15:52] vitht: e mới push staging à
    └ [15:52] datnt: đúng rồi chị :)))
    └ [15:52] vitht: a Thịnh deploy dùm e đi
    └ [15:52] thinht: okie
    └ [15:56] thinht: loy xong nha mn. FE vs BE
    └ [16:00] vitht: Dạ okie để e test
  [15:48] vitht: * có ai merge 7 commit ts staging hả mn
  [16:09] vitht: Hung Pham Phat Le  test card này giúp e nha. E mới đưa một vài cái commit của ông Kunal fix lên BETA fountain. Mấy cái l
  [16:09] vitht: * Hung Pham Phat Le  test card này giúp e nha. E mới đưa một vài cái commit của ông Kunal fix lên BETA fountain. Mấy cái
  [16:10] vitht: * Hung Pham Phat Le  test card này giúp e nha. E mới đưa một vài cái commit của ông Kunal fix lên BETA fountain. Mấy cái
  [16:11] datnt: em deploy BETA Fountain nha mn
  [16:13] vitht: * Hung Pham Phat Le  test card này giúp e nha. E mới đưa một vài cái commit của ông Kunal fix lên BETA fountain. Mấy cái
  [16:13] hungpn: hôm nay deploy nh quá nè
  [16:14] vitht: Từ từ cũng đc tại ông Kunal hôm qua ổng mới change mấy chục file á [thread: 4 replies]
    └ [16:15] hungpn: cus nay tự code luôn rồi hở
    └ [16:17] thinht: móa ổng cũng update trên của tao 1 mớ. đậu phông. tách tè le.  check điên ngừ
    └ [16:18] datnt: ổng quậy PR open thôi được rồi, PR em merge rồi close rồi ổng còn mention qua em không hiểu nó liên 
    └ [16:21] hungpn: giờ ngồi check task fai cận thận hơn rồi, dò lại mấy cái liên quan luôn quá
  [16:14] vitht: * Từ từ cũng đc tại ông Kunal hôm qua ổng mới change mấy chục file á : (
  [17:28] thinht: Hung Pham: task Review mới loy codes mới của cus khi nào test hú t nói thay đổi của ông nahn [thread: 3 replies]
    └ [17:28] hungpn: chắc mai nghe
    └ [17:29] thinht: okie
    └ [09:40] hungpn: qua t nè mầy ơi Thinh Tran
  [09:53] hungpn: image.png
  [09:53] hungpn: ý, cái này mới nè [thread: 2 replies]
    └ [10:06] thinht: loy staging r, mà đang hỏi ý định của ổng
    └ [10:11] thinht: https://trello.com/c/KNq08ij5/1796-ai-powered-message-screen nó kéo qua QA luôn r. éo hiểu kiểu gì
  [10:00] vitht: Này task của a Thịnh làm mà code của ông Kunal =)) [thread: 8 replies]
    └ [10:06] thinht: code a đó. chắc cb ổng cũng thêm nữa ah
    └ [10:06] hungpn: code của Thịnh à, gửi cái design xem nào mầy ơi
    └ [10:12] thinht: nó xoá hình design r, h đòi làm cái design  mới.
    └ [10:16] hungpn: vậy chắc khỏi test quá, đợi design mới
    └ [10:22] thinht: k bik thế lào, h ỏng kéo hẳn qua QA luôn mới chịu. mà thôi chờ típ xem ý ổng làm j đã
    └ [13:33] thinht: Screenshot from 2026-10-02 13-33-23.png
    └ [13:33] thinht: cho coi tạm design trước đó
    └ [14:57] thinht: skip không test ticket này nữa nhan Hung Pham Vũ nói để ổng tự làm r có j loy test sau.
  [10:22] vitht: post bug này giúp e với
  [10:23] vitht: Screenshot 2026-10-02 at 10.22.48 am.png
  [10:23] vitht: đáng lẽ ra cái này phải là complete box nhưng nó lại là add to cart
  [10:24] vitht: trên production của Fountain app
  [10:24] vitht: * post bug này giúp e với Hung Pham
  [10:25] hungpn: staging nó cũng vậy? em đang ở bên Business view?
  [10:25] vitht: Dạ đúng gòi
  [10:26] hungpn: nó sẽ k match vs 2 button trên cái Your box đó em? để đi check lại design
  [10:26] vitht: Dạ
  [10:40] hungpn: anh tìm thấy card update của bên Personal thôi k có update bên Business ak Vi Tran
  [10:45] vitht: là bên business vẫn để là add to cart hả a [thread: 1 reply]
    └ [10:48] hungpn: qua anh đi nè
  [10:46] vitht: e nghĩ phải đồng bộ text hết chứ hả
  [10:46] vitht: Mình có confirm vói ông design chưa a
  [10:54] datnt: Hi anh chị trang BETA và STAGING an chị vẫn truy cập vô được phải không á
  [10:54] datnt: * Hi anh chị trang BETA và STAGING anh chị vẫn truy cập vô được phải không á
  [10:55] datnt: em config xong firewall cho STAGING rồi á, nên đúng thì các link staging.fountaingifts.com/admin và beta.fountaingifts.c
  [10:56] datnt: còn nếu vô bằng https://174.138.125.143/ thì sẽ chặn lại
  [10:56] datnt: nên mn xem có bị block truy cập gì không nha
  [10:57] datnt: còn anh chị dev Thinh Tran Vu Tat Vi Tran mn thử ssh vô STAGING xem có được không nha [thread: 8 replies]
    └ [10:57] vutq: done nha em
    └ [10:58] thinht: a zô dc nha
    └ [10:59] datnt: Vu Tat em check xong checklist task firewall rồi á, chỉ để hết hôm nay nếu không có issue gì thì mai
    └ [11:00] vutq: oke em, nhớ nhắn trong ticket báo Kunal 1 tiếng
    └ [11:00] datnt: dạ oki anh
    └ [11:03] vitht: dô đc á
    └ [11:03] vitht: để lát deploy code lên thủ
    └ [11:04] datnt: dạ oki chị có gì chị deploy chị done chị ping em cái nha
  [11:03] vitht: * để lát deploy code lên thử
  [11:04] datnt: * dạ oki chị có gì chị deploy done chị ping em cái nha
  [11:56] vitht: sao cái này login gòi mà nó vẫn hiển thị bắt login lại á [thread: 7 replies]
    └ [11:56] datnt: chị có đang login bên admin không á
    └ [11:57] vitht: hông á
    └ [11:58] datnt: tại có 1 đoạn code đợt có log bug là login rồi mà bắt login nữa
    └ [11:58] datnt: mà cái đó là behavior khi mà app check ra còn cookie của admin là nó bắt bên UI login lại á chị
    └ [11:58] trinhmtt: Đợt đó là nó logout luon và bắt login lại
    └ [11:59] trinhmtt: Còn cái này chị thấy chị Vi chụp đang login roi mà
    └ [11:59] datnt: hmmm dị là bug khác nữa roi á
  [11:56] vitht: Screenshot 2026-10-02 at 11.55.47 am.png
  [13:29] vitht: cái gift a choice trên production dang bị v nè mn ơi
  [13:29] vitht: là có đúng hông
  [13:29] vitht: Screenshot 2026-10-02 at 12.02.11 pm.png
  [13:30] vitht: Screenshot 2026-10-02 at 1.30.25 pm.png
  [13:30] vitht: bấm dô nút go to checkout bị Free hết
  [13:31] datnt: bug ròi á chị ơi :)))
  [13:36] vitht: tình hình lắm nè ae oiw
  [13:36] vitht: Screenshot 2026-10-02 at 1.36.18 pm.png
  [13:36] vitht: =))
  [13:36] vitht: * tình hình lắm nè ae ơi
  [13:37] thinht: cus tạo 1 mớ PR trong git. coi liên quan tới ticket nào coi để ý check nha mn
  [13:41] thinht: sáng h hay hôm qua có ai loy tính năng j mới trên beta fountain không mà nay click detail product  thấy lạ vậy
  [13:46] vitht: Dạ nay mới push một vài code của ổng lên BETA fountain hay sao á a [thread: 2 replies]
    └ [13:48] thinht: thấy click product nó ra category luôn. k bk phải tính năng mới k
    └ [13:49] datnt: em thấy bug á, em chọn 1 gift để add cart mà nó nhảy category tè le á
  [13:58] vitht: Do mình á để chị fix
  [13:58] vitht: xưa ai làm cái card 298 dị [thread: 6 replies]
    └ [13:59] datnt: em á chị
    └ [13:59] datnt: bug gì chỗ đó hả chị
    └ [14:00] vitht: là cái bug chị push đó e
    └ [14:01] datnt: hmmm hơi lạ tại em làm flow bên Pro á, dị chị fix lại nha
    └ [14:03] vitht: thì bên flow Pro bị đó
    └ [14:03] vitht: chứ flow personal bình thường
  [13:58] vitht: * xưa ai làm cái card 2968 dị
  [14:09] datnt: image.png
  [14:10] datnt: Hung Pham Phat Le 2 anh ơi cho em hỏi cái chỗ giftdrop này có cái header này khong á em check design với bên beta thì kh
  [14:17] phatdlt: hong có e ơi
  [14:17] phatdlt: Sao nay UI hư lum la nhiều dị
  [14:17] phatdlt: Mới hqa đâu có thấy này đâu
  [14:30] vitht: bên QC test lại toàn bộ feature bên fountain gift production đi truóc khi ổng phát hiện thêm bug khác
  [14:34] vitht: xún đây giúp chị cái Đạt ơi
  [14:34] vitht: Dat Nguyen:
  [14:39] thinht: 
  [14:49] vitht: Screenshot 2026-10-02 at 2.48.43 pm.png [thread: 8 replies]
    └ [16:18] datnt: Hung Pham anh QC giúp em lại cai này trên BETA với, nó đang bị thiếu cái ỉtem GOC ở cột bên phải của
    └ [16:51] hungpn: okie để anh check
    └ [17:10] hungpn: image.png
    └ [17:10] hungpn: smartlink  nó k show ở góc phải lên nè em
    └ [17:11] datnt: dạ oki anh để em update tiếp
    └ [08:35] datnt: Hung Pham này Done nha anh
    └ [08:43] hungpn: để anh check nhé
    └ [08:43] datnt: a đợi xí nha em đang deploy 1 card khác nên chưa vô đc á
  [15:00] vitht: Review giúp c cái pull request này vs Vu Tat  ơi, cho cái bug gift a choice
  [15:00] vitht: https://github.com/iamksheth/FountainNewUI/pull/610 [thread: 1 reply]
    └ [15:20] vutq: done nha chị Vi Tran
  [15:00] thinht: có bug nào cần a fix k Vi Tran
  [15:02] vitht: A test vòng vòng trên fountain live giúp e đi a
  [15:02] vitht: mấy card cũ a làm mà đưa lên live rồi đó
  [15:05] vitht: giao diện thank you trên BETA không có menu nè Dat Nguyen
  [15:05] vitht: Screenshot 2026-10-02 at 3.05.01 pm.png
  [15:06] vitht: trên fountain hiện sai rồi
  [15:06] vitht: * trên fountain production hiện sai rồi
  [15:06] datnt: dạ oki chị, để em đợi card kia chị lên LIVE em kéo về fix
  [15:10] thinht: có ticket nào cần làm k Trinh Mai nếu k a phụ Vi test trên Live
  [15:11] trinhmtt: anh phụ chỉ i nha
  [15:31] hungpn: trước cía products list nó có mấy cái section cuối list k nhỉ? [thread: 5 replies]
    └ [15:31] datnt: cái này có nha anh
    └ [15:33] hungpn: anh đang kiếm design
    └ [15:34] datnt: https://www.figma.com/design/ycshVpcLgTBPb0aXnlo5MP/Fountain?node-id=30217-78097&m=dev
    └ [15:34] datnt: đây á anh
    └ [15:52] hungpn: tks em
  [15:31] hungpn: image.png
  [15:32] datnt: * đợt em vô dự em thấy có á
  [16:20] trinhmtt: task log day du giup em nha mn oi @room
  [17:10] hungpn: * smartlink mà chọn GOC  nó k show ở góc phải lên nè em
  [09:49] trinhmtt: em gửi plan tuần này aj ViTHT: 40h DatNT: 40h ThinhT: 20h => QC 25h
  [13:26] thinht: https://trello.com/c/AdUlQD3t/1178-fountain-infinity-implement-reviews này test xong chưa Hung Pham [thread: 4 replies]
    └ [13:33] hungpn: xong rồi nha
    └ [13:33] hungpn: nhớ có báo rồi mà hì
    └ [13:36] thinht: xog r kéo luôn đi cho sớm để cus nó test
    └ [14:07] hungpn: đã move nha
  [13:27] thinht: * https://trello.com/c/AdUlQD3t/1178-fountain-infinity-implement-reviews https://trello.com/c/z8P7mYj5/3117-infinity-upd
  [13:32] vitht: fountain/2895-engraving-on-master  ae cho mình hỏi là cái brand fountain/2895-engraving-on-master là xưa ai tạo v hen Th [thread: 5 replies]
    └ [13:33] datnt: em khong có tạo nha chị, em check trong máy em cũng khong có nhánh lun
    └ [13:37] thinht: e coi lại phải cus nó tạo bằng AI k
    └ [13:38] datnt: image.png
    └ [13:38] datnt: cus tạo bằng AI nha anh chị
    └ [13:39] datnt: https://github.com/iamksheth/FountainNewUI/pull/552
  [13:40] thinht: Có ticket nào cần làm k Trinh Mai hay a check rollbar [thread: 30 replies]
    └ [13:51] trinhmtt: https://trello.com/c/TdvfIo08/3134-start-here-review-order-for-claudes-prs-oct-1 anh check xem mục  
    └ [13:54] trinhmtt: em có update lại message nha anh Thinh Tran
    └ [14:18] thinht: ``Test server fix (Oct 1)`` Trinh Mai ý này là chỉ những PRs dưới đây thôi pk e?  3129 privacy (#514
    └ [14:21] thinht: a thấy có vài PR Đạt nó pick là merge loi staging r thì phải.
    └ [14:22] trinhmtt: v anh xem Đạt check cái nào roi anh pick cái khacs nha
    └ [14:22] trinhmtt: báo lên đay luon để khỏi trùng ạ
    └ [14:23] datnt: em update PR nha #575, #567, #570, #574 là em check xong rồi á
    └ [14:24] datnt: Thinh Tran status nha anh có gì anh update vô đây luôn cho em khỏi check trùng nha
    └ [14:25] thinht: a thấy 514, 507 e cũng check r mà
    └ [14:26] datnt: #514 là anh Vũ check lên Live rồi á anh còn 507 thì em chưa hay sao á
    └ [14:26] thinht: vậy ai pick complete
    └ [14:26] datnt: anh chụp em xem với cái nào á
    └ [14:27] thinht: Screenshot from 2026-10-05 14-26-51.png
    └ [14:27] datnt: mục 1 vậy là check rồi á anh, mục đó thứ 6 anh Vũ check á
    └ [14:28] datnt: còn mục 2 là em mới check đc 2 cái đầu thôi
    └ [14:28] thinht: 514,515, 556 cũng xong r
    └ [14:29] datnt: 515 chưa nha anh
    └ [14:29] datnt: em mới xong 556 thôi á mà nó đi chung nên em mới tick á
    └ [14:30] thinht: 512, 513, 555, là chưa làm
    └ [14:30] thinht: Screenshot from 2026-10-05 14-29-53.png
    └ [14:30] thinht: 515 đây là pick
    └ [14:31] datnt: cái mục đó chỉ mới 556 thôi á anh, còn 515 là chưa á
    └ [14:31] thinht: làm xong cả cặp thì mới tck xong chớ e.
    └ [14:31] thinht: nó đi theo cặp nên e ủi luôn 515 đi
    └ [14:32] datnt: oki anh để lại đó em back về sau 515 cho anh
    └ [14:33] thinht: step của e là cherry-pick mấy commit trong PR đó vào staging thôi hã
    └ [14:34] datnt: em làm theo step của anh Vũ mới nhắn á anh
    └ [14:34] datnt: 4 step   - review  - local test  - staging test  - báo QC rồi em req anh Vũ LIVE á
    └ [14:38] datnt: em update PR nha - #575, #567, #570, #574 Done - PR #576, #577 Pending - #454 em chuyển qua này để ư
    └ [14:39] datnt: Thinh Tran em update lại nha, chờ khi nào có chỗ khác em update vô chỗ đó nha anh
  [13:54] trinhmtt: * https://trello.com/c/TdvfIo08/3134-start-here-review-order-for-claudes-prs-oct-1 anh check xem mục  Test server fix (O
  [14:09] datnt: Hung Pham anh test giúp em flow này trên beta Fountain nha - Forgot password → nhận code → nhập code và mật khẩu mới → đ [thread: 21 replies]
    └ [14:11] thinht: từ PR nhiu vậy e
    └ [14:11] datnt: #567 nha anh
    └ [14:11] datnt: em đang check PR trong cái message mới nhất á
    └ [14:12] datnt: image.png
    └ [14:12] thinht: đệt sao rối nùi dầy ta
    └ [14:13] datnt: #575, #567, #570, #574 là em check xong rồi á
    └ [14:13] datnt: cái này ổng mới nhắn là đi trước mấy cái V2 được
    └ [14:13] datnt: nên em bay qua check bên này á
    └ [14:21] datnt: Thinh Tran em đang check PR #576, #577 lun nha anh
    └ [14:21] hungpn: cái này là em fix rồi đúng k nè
    └ [14:22] datnt: dạ đúng rồi anh, em test thử 1 lần rồi mà anh test kĩ lại để chắc ăn nha vì là code của Cus á
    └ [14:29] hungpn: okie em
    └ [15:18] hungpn: image.png
    └ [15:19] hungpn: Trinh Mai: chỗ này đang thiếu 1 cái noti để user biết đưowcj là code đã gửi mới hay chưa nè, anh nhấ
    └ [15:19] datnt: cái này ông Kunal có handle luôn ròi á:))
    └ [15:19] datnt: mà em chưa có đưa lên tại còn feedback
    └ [15:19] hungpn: nhưng chưa có lên hả em
    └ [15:20] datnt: khi nào cái này lên em ping lại cho anh
    └ [15:21] datnt: sắp tới cái khúc password này có thay đổi vài cái á nên là lên tới đâu em báo tới đó nha, hiện tại c
    └ [15:45] hungpn: okie em
    └ [15:46] hungpn: cái này anh check xong rồi nha
  [14:10] datnt: em mới pick commit của Kunal qua cho cái flow này
  [14:10] datnt: nên anh test xem flow còn work đc không nha
  [14:23] datnt: * em update PR nha - #575, #567, #570, #574 là em check xong rồi á - em đang check PR #576, #577
  [14:23] datnt: * em update PR nha - #575, #567, #570, #574 là em check xong rồi á - em đang check tiếp PR #576, #577
  [14:24] datnt: * em update PR nha - #575, #567, #570, #574 là em check xong rồi á - em đang check tiếp PR #576, #577 - #575 đã lên LIVE
  [14:25] vitht: Dat Nguyen:  ơi cho c hỏi cái xưa sao e thêm cái attribute này dị out_of_stock_optional_text [thread: 1 reply]
    └ [14:27] datnt: chị đợi em xíu nha
  [14:26] vitht: của card 2895 á
  [14:26] vitht: Screenshot 2026-10-05 at 2.26.31 pm.png
  [14:33] vutq: Hi mn, Trinh Mai Hung Pham Phat Le Vi Tran Thinh Tran Dat Nguyen  Tình hình hiện tại là chúng ta sẽ không còn tập trung 
  [14:49] vitht: Review giúp c 2 pull request này nha Vu Tat  ơi  FE: https://github.com/iamksheth/FountainNewUI/pull/438   BE: https://g
  [14:51] vitht: Chúng ta có 199 PR chỉ trong 2 ngày do Kunal tạo [thread: 5 replies]
    └ [14:54] thinht: đi cúng zường để mong k bị conflict, chớ bị k bik gọi ai support đó
    └ [14:56] vitht: đó chỉ là FE thôi
    └ [14:56] vitht: còn BE thì 115 PRs
    └ [14:56] vitht: a Thinh Tran
    └ [14:57] thinht: số lẻ thôi cũng mệt r
  [14:51] vitht: * Chúng ta có 199 PRs chỉ trong 2 ngày do Kunal tạo
  [17:13] thinht: Thêm luồng mới cho PRO-ORDER trên staging nhan Hung Pham . test thong thả :D Trạng thái lúc tạo: đơn Pro pay-now giờ là 
  [17:18] thinht: * Thêm luồng mới cho PRO-ORDER trên staging nhan Hung Pham . test thong thả :D Trạng thái lúc tạo: đơn Pro pay-now giờ l
  [09:08] datnt: em pick commit deploy BETA Fountain cái nha mn ơi, có gì chờ em pick resolve commit xong nha bên PR này nó hơi nhiều á [thread: 1 reply]
    └ [09:30] datnt: Done nha anh chị Thinh Tran Vi Tran
  [09:17] vitht: https://trello.com/c/d5OAtXT9/3118-server-test-info#comment-6ac453d33b331e3321b3daa5  ổng có nt trong card này nha ae
  [09:49] hungpn: Dat Nguyen: check dum anh thử xem, user có thêm item vào cart được k? [thread: 18 replies]
    └ [09:49] datnt: em mới thêm vô được á anh
    └ [09:49] datnt: nhưng mà có số item ra 404
    └ [09:50] datnt: image.png
    └ [09:50] datnt: image.png
    └ [09:51] hungpn: lạ nhỉ. anh thêm k dc ta
    └ [09:51] datnt: https://beta.fountaingifts.com/curated-gift-boxes/Birthday-Box-V2
    └ [09:51] datnt: anh thử cái này có bị 404 không á anh
    └ [09:55] hungpn: bị em
    └ [09:56] datnt: anh log bug redmine về cho em thử 2 cái nha
    └ [09:56] datnt: 1 cái 404 với cái của anh không add đc á
    └ [09:56] hungpn: okie em
    └ [11:33] datnt: Hung Pham cái không add to cart đc anh thử tab ẩn danh chưa á
    └ [11:34] hungpn: có thử rồi nha
    └ [11:34] datnt: kì ta sao em add lại đc mới ác
    └ [11:35] datnt: anh thử lại xem còn được không á, với anh quay màn hình cho em xem lun với
    └ [11:35] hungpn: để anh thử lại
    └ [13:28] hungpn: anh sài ẩn danh vào dc rồi nha
    └ [13:29] datnt: vậy tạm thời em update pending nha anh, nếu có bị lại thì em check lại
  [10:08] vitht: Mình deploy BETA fountain cái nha mn
  [10:09] vitht: Trinh Mai:  e nói khéo kêu ổng đừng code nữa đc khum. ổng code bug xong phải fix lại mệt quá [thread: 2 replies]
    └ [10:10] thinht: và ngẫu hứng đổi rule liên tục, dev vs QC k bik đường nào test luôn :D
    └ [10:12] trinhmtt: có tiền làm phiền thiên hạ chị ơi =((
  [10:18] datnt: Hung Pham em mới deploy lên LIVE PR mới của Kunal anh test kĩ lại những cái này nha anh  - Popup Build a Box: Cái này ở  [thread: 22 replies]
    └ [10:18] datnt: BETA nha anh em ghi  lộn LIVE 🥲
    └ [10:25] datnt: à ngoài ra còn có 1 cái là checkout pro với credits nữa, cái này trong admin nó ẩn hẳn đi rồi nên kh
    └ [10:42] hungpn: tính ra giờ anh mới biết cái luồng này luôn á nè
    └ [10:42] hungpn: k thấy nó gửi order lên shipstation vs email nó kỳ vậy ta
    └ [10:43] datnt: cái luồn credit á hả anh
    └ [10:43] hungpn: uhm èn
    └ [10:43] datnt: giờ em cũng không đi fix được mà báo cho ổng để ổng tự fix á chứ
    └ [10:44] datnt: chán thiệt
    └ [10:45] datnt: cái email nó trên mailtrap luôn đúng không anh để em check xem nó sao em báo ổng luôn
    └ [10:45] hungpn: đúng rồi, email ở trên đó á
    └ [10:55] datnt: anh Hung Pham anh check vòng vòng trong 2 acc shipstation của fountain rồi từa lưa mục xem nó có nhả
    └ [10:58] hungpn: nhẩy lộn là gì ta?
    └ [10:58] hungpn: ý là nó nhẩy vào 1 order khac?
    └ [10:59] datnt: image.png
    └ [11:00] datnt: nó nhảy ở bên mấy cái này á anh
    └ [11:02] hungpn: vậy hở
    └ [11:02] hungpn: để anh xem
    └ [11:03] datnt: ý là em khong biết nó nhảy vô không á anh check giúp em nha, em đang fix bug sáng anh báo á
    └ [11:10] hungpn: ak, anh đi check thử cũng chưa thấy. tưởng đâu em thấy nó ở mấy tab đó
    └ [11:11] datnt: dị để báo ổng với chỉ ổng hướng làm luôn
    └ [14:48] datnt: Hung Pham 545 là cái này nha anh
    └ [15:40] hungpn: tested DOne nha Dat Nguyen
  [10:18] datnt: * Hung Pham em mới deploy lên BETA PR mới của Kunal anh test kĩ lại những cái này nha anh - Popup Build a Box: Cái này ở
  [10:36] vitht: Mọi người có gặp tình trạng khi bấm dô một gift cái nó đứng yên lun, không qua trang product detail hông dị [thread: 7 replies]
    └ [10:48] thinht: cái này a báo từ trước r mà.
    └ [11:03] vitht: Dạ để e xem thử
    └ [11:14] hungpn: cái này có 1 số gift bị á, 1 số hok bị
    └ [11:14] datnt: cái dụ mà ra page 404 là khác cái này nữa á, page 404 là còn qua được trang detail mà hiện 404 thôi,
    └ [11:15] datnt: em cũng kiếm ra sao nó qua 404 rồi á
    └ [11:15] datnt: ông Kunal ổng thêm 1 file redirct á mấy cái item cũ slug cũ nó tự động thành slug mới
    └ [11:16] datnt: Birthday-Box nó thành Birthday-Box-V2 mà data BE mình đâu có Birthday-Box-V2 nên nó 404 á, cái này c
  [10:36] hungpn: có nha
  [10:36] hungpn: sáng anh hỏi Dat Nguyen ak
  [10:37] datnt: có nha chị
  [10:37] datnt: mà bên em khoảng 1p sau nó vẫn chạy
  [10:48] vitht: Lúc search name product nó chậm rì lunn Champagne & Snacks Deluxe
  [10:48] vitht: * Lúc search name product nó chậm rì lunn Champagne & Snacks Deluxe ±±
  [10:50] vitht: Test lại cái card này giúp c nha Phat Le , mới fix một vài bug với deploy code của Kunal lên BETA Fountain cho feature n [thread: 7 replies]
    └ [11:22] phatdlt: image.png
    └ [11:22] phatdlt: Trinh Mai: đây tính là bug không e, tại trong ticket k có rqs cho case này
    └ [11:34] trinhmtt: 2 3 laf optional ma
    └ [11:34] trinhmtt: bỏ qua và submit vẫn đc chứ ạ
    └ [11:34] phatdlt: ok nè e
    └ [11:34] trinhmtt: ũa đung roi =))
    └ [11:35] phatdlt: ok e :))
  [10:50] vitht: cần ưu tiên để đưa lên live trong tuần này
  [10:53] thinht: * cái này a báo lỗi trên staging từ trước r á.
  [13:25] thinht: Vi Tran: Dat Nguyen có làm PR #542 (QC 21) chưa
  [13:26] datnt: dạ rồi á anh [thread: 1 reply]
    └ [13:26] thinht: cái nào làm rồi thì tick compleled cho mn đỡ lầm nha e
  [13:28] thinht: còn #554, #528, #535 [thread: 1 reply]
    └ [13:29] datnt: em chưa nha anh Thinh Tran
  [13:29] datnt: 
  [13:35] vutq: https://trello.com/c/TdvfIo08/3134-start-here-review-order-for-claudes-prs-oct-1 phần nào xong thì chỉ cần note lại thôi
  [13:42] vitht: một lát Trinh tạo sheet mn dô chỉnh lại tên và status của PR mình đã và đang làm nha
  [13:42] vitht: * một lát Trinh tạo sheet mn dô chỉnh lại tên và status của PR mình đã và đang làm nha Thinh Tran Dat Nguyen
  [13:46] trinhmtt: https://docs.google.com/spreadsheets/d/1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o/edit?gid=1533747530#gid=1533747530 đ [thread: 3 replies]
    └ [13:47] thinht: thêm quyền vào e
    └ [13:54] trinhmtt: này file tasklog ma anh, mail anh là gì thế ạ
    └ [13:55] thinht: a vào update dc r e. nãy bị j a vào k dc
  [14:05] vitht: Mọi người nhớ chạy dưới local check kĩ mấy cái liên quan tới cart, checkout payment through stripe, paypal, apple pay, s
  [14:06] vitht: deploy lên staging xong nhớ check lại lần nữa, phụ QC test lun nha.
  [14:12] hungpn: mấy cái này khi nào lên staging hú QC vs nhé
  [14:58] datnt: à cái này thì sao rồi á anh Hung Pham  https://trello.com/c/ce8n3niB/3040-fountain-build-internal-digital-proof-generato [thread: 1 reply]
    └ [17:19] hungpn: Dat Nguyen: đưa oognr check lại nhé
  [15:01] thinht: nhớ cái này nhan
  [15:01] thinht: * nhớ cái này nhan Hung Pham
  [15:05] datnt: em deploy STAGING Fountain cái nha anh chị
  [15:37] vitht: https://github.com/iamksheth/FountainGreetings/pull/509/changes/b2dc155b10704c51500ff857bfb805b09d24e415
  [16:34] vitht: Hung Pham:  cái 512 của a Thịnh có payment á a
  [16:34] vitht: * Hung Pham:  cái PR #512 của a Thịnh có payment á a
  [16:53] datnt: Vu Tat anh ơi nay có PR này lên LIVE được nha anh https://github.com/iamksheth/FountainGreetings/pull/576
  [17:04] thinht: a Loi beta nha mn
  [09:24] vitht: ae thấy có cái PR nào liên quan tới recipient address thì quăng hết qua cho Vi nha [thread: 7 replies]
    └ [09:25] thinht: hình như cả trăm PR á Vi. thấy cái nào cũng có hết á 🤣🤣
    └ [09:26] vitht: gì dữ dị chời
    └ [09:26] vitht: Bên FE á hả a Thịnh
    └ [09:26] thinht: Proj này là dành cho e zồi 🤪
    └ [09:27] datnt: ụa chị Vi Tran chị đang review PR lun hả, cột bug có 1 task hình như Mike thêm á, chị mún check hong
    └ [09:28] vitht: đâu quăng chị coi thử đi
    └ [09:28] datnt: https://trello.com/c/GbxIFNPH/3138-giftdrop-order-was-uploaded-as-a-gift-of-choice-when-a-build-a-bo
  [09:25] vitht: tại Vi đang investigate với refactor cái đó có gì sẵn làm lunn
  [09:26] vitht: Cái smart link nữa. Có gì hông hiểu thì hỏi Vi nha, tại trước mình làm feature đó. Đừng có tự approve xong quăng lên pro [thread: 16 replies]
    └ [09:27] datnt: #569 Pro and Smart Link claim checks. #572 shipped emails for team-imported orders (#573 is the same
    └ [09:27] datnt: đây nha chị :)))
    └ [09:27] datnt: em mới thấy
    └ [09:37] vitht: là 3 cái pull request lun đó hả
    └ [09:37] datnt: image.png
    └ [09:37] datnt: em thấy nó đi chung 1 section á
    └ [09:38] datnt: nhưng mà title thì chắc có mỗi cái 569 là smart link thoi á
    └ [09:38] vitht: okie để c xem thử
    └ [09:39] datnt: nếu PR không bắt nó đi chung thì chị làm smart link thui còn lại để em check tới cũng đc
    └ [09:40] vitht: okie
    └ [13:53] datnt: cái này em check rồi nha chị review mỗi #569 thui là được á không cần mấy cái kia đi theo đâu Vi Tra
    └ [15:43] vitht: e check kĩ chưa Dat Nguyen
    └ [15:44] datnt: cái đó anh Vũ review cho lên LIVE luôn rồi chị
    └ [16:18] hungpn: cái nào mới live ask em
    └ [16:19] datnt: 572 với 579 nha anh
    └ [16:20] datnt: mấy cái này handle limit req thôi không có test tay được á anh
  [09:48] vitht: có ai đang build fe fountain hả mn [thread: 2 replies]
    └ [09:49] datnt: em khoong nha
    └ [09:49] datnt: giờ em mới bắt đầu mina BE thôi á
  [09:54] vitht: cái mà e nói ông Mike post bug là cái này hả Đạt https://trello.com/c/GbxIFNPH/3138-giftdrop-order-was-uploaded-as-a-gif [thread: 4 replies]
    └ [11:55] datnt: Vu Tat Vi Tran em tìm ra ròi :))
    └ [11:56] datnt: khong phải do khách không biết xài mà do app lỗi thiệt
    └ [11:56] datnt: image.png
    └ [11:56] datnt: nó hiên có mỗi email ship à
  [09:55] datnt: đúng rồi chị
  [11:33] vitht: IMG_2895.MOV [thread: 8 replies]
    └ [11:35] thinht: cái luồng pro đó đang raats bug nha e.
    └ [11:35] thinht: suggest cus r mà nó im ru
    └ [11:35] thinht: e có test nữa cũng vậy à
    └ [11:35] vitht: ý là mình có solution gì cho ổng không á
    └ [11:36] thinht: có r e, nó k có check luôn. vs lại pro thì qua luồng pro/send mua
    └ [11:36] vitht: chứ giờ hỏi ổng, ổng cũng hỏi AI à
    └ [11:37] vitht: khách đang bị một cái issue nên sẵn e test lun á
    └ [11:37] thinht: cái này trước giờ nó vậy rồi. hỏi ổng k trả lời. tạm thời a nghĩ kệ moẹ bug đó đi. khi nào hết task 
  [11:34] trinhmtt: 
  [11:34] trinhmtt: 
  [11:35] phatdlt: Vi Tran: Chị lên live con này đi c
  [11:38] thinht: * cái này trước giờ nó vậy rồi. hỏi ổng k trả lời. tạm thời a nghĩ kệ moẹ bug đó đi. khi nào hết task hãy qua đó ôm. giờ
  [13:31] thinht: nhớ coi file sheet để test mấy cái loy r nhan Hung Pham
  [13:33] vitht: để c fix cái bug hồi trưa c nói nha. E làm tiếp pull request nha Dat Nguyen [thread: 1 reply]
    └ [13:34] datnt: dạ oki chị
  [13:43] hungpn: https://trello.com/c/AdUlQD3t/1178-fountain-infinity-implement-reviews?filter=1178 -- Thinh Tran [thread: 1 reply]
    └ [13:44] thinht: để trả lời ông
  [13:49] datnt: Hung Pham em mới deploy lên beta lại phần checkout order nên anh test lại giúp em cái order này nha, cho mỗi personal th [thread: 17 replies]
    └ [14:04] hungpn: layout nay ky vậy nhỉ
    └ [14:04] hungpn: image.png
    └ [14:05] datnt: image.png
    └ [14:06] datnt: bên em bth á anh
    └ [14:10] hungpn: anh sài ẩn danh thì k bị
    └ [14:11] datnt: kệ nó đi anh, tại push mới không có đụng FE đâu anh
    └ [14:11] datnt: nó bên BE
    └ [14:31] hungpn: image.png
    └ [14:31] hungpn: check dùm anh thông tin PRO gửi lên shipstation vs
    └ [14:33] hungpn: anh chon  Express 3-Day mà bên shipstation k hiển ra
    └ [14:33] datnt: image.png
    └ [14:33] datnt: góc trên bên phải á anh
    └ [14:34] hungpn: vậy là nó k hiển thi như bên Personal hì
    └ [14:35] datnt: mỗi bên mỗi khác á anh
    └ [14:41] hungpn: để anh check thêm tý nữa
    └ [15:00] hungpn: phần này chjeck được rồi nha
    └ [15:01] datnt: dạ oki anh
  [14:30] datnt: em deploy BETA Fountain cái nha mn
  [15:01] hungpn: * phần này chjeck OKIE rồi nha
  [15:19] thinht: https://trello.com/c/BAI99Jrx/2895-fountain-product-page-bottle-engraving cus muốn loy live con đây nè
  [15:21] vitht: từ từ mai e deploy, ổng chưa có rep cái feedback bên BE
  [16:18] hungpn: image.png
  [16:18] hungpn: layout bên GOC kỳ nhỉ [thread: 2 replies]
    └ [16:24] datnt: image.png
    └ [16:24] datnt: bên em thấy nó không bị gì hết á anh
  [16:33] vitht: Cho Vi hỏi cái, cái flow gift a choice lúc lên shipstation nó chỉ để cái mục là Gift A Choice thôi chứ không hiển thị qu [thread: 15 replies]
    └ [16:34] datnt: sai á chị, đợt em implement cho PRO em nhớ chọn xong là nó tự đổi lại thành gift gì luôn á
    └ [16:34] datnt: còn bên personal em không phải người handle nên ban đầu gốc nó ra sao em không chắc á, chỉ nhớ là từ
    └ [16:35] vitht: nữa hả chời =='
    └ [16:35] datnt: Ban đầu recipient chưa fil nó hiện như ảnh chị gửi Sau khi recipient fill rồi nó phải update lại  - 
    └ [16:35] datnt: Vi Tran cái ảnh chị gửi là đang ở bước nào vậy chị
    └ [16:36] vitht: cái này đang bị trên live lun đó =='
    └ [16:37] datnt: cái này em không rõ nha, tại em chỉ có handle GOC của PRO thoi mà bên PRO là mới luôn, chỉ là nhìn b
    └ [16:38] hungpn: mấy cái này là có check trước rồi nè, có update nào lên mà mình k biết k nhỉ?
    └ [16:39] datnt: em cũng nhớ là lúc em làm PRO bị anh Hùng bắt bug 1 mớ luon á, phải check bên personal kĩ lắm á mới 
    └ [16:40] vitht: e push code lên e check lại cái gift a choice chưa
    └ [16:40] vitht: cái này là happy case lun rồi nè
    └ [16:40] datnt: có chứ chị
    └ [16:40] datnt: thứ nhất cái này em test 2 bên
    └ [16:41] datnt: với lại em khong có xài chung code nên không đụng gì vô flow GOC của thằng personal hết á
    └ [16:41] datnt: trong repo mỗi thằng là service khác hẳn nhau lun á
  [16:33] vitht: Screenshot 2026-10-07 at 4.33.15 pm.png
  [16:42] vitht: trang ProOrderComplete lúc submit order gift a choice bằng pay later
  [16:42] vitht: Screenshot 2026-10-07 at 4.41.25 pm.png
  [16:42] vitht: thiếu thông tin gift info [thread: 16 replies]
    └ [16:45] datnt: cái này fix trên BETA chưa lên LIVE nha chị
    └ [16:49] vitht: mới fix hay sao
    └ [16:49] datnt: thứ 6 em fix nha chị
    └ [16:49] vitht: check bên pay now lun nha
    └ [16:49] vitht: bị y chang lunn
    └ [16:50] vitht: Screenshot 2026-10-07 at 4.49.20 pm.png
    └ [16:50] datnt: hôm thứ 6 em fix hết smart link, rồi pay now, pay later trên beta rồi á chị
    └ [16:51] datnt: em có báo anh Hùng test rồi em đợi QC confirm em mới đưa
    └ [16:53] vitht: vậy e nói cái case hồi trưa cho a Hùng lun nhen
    └ [16:53] vitht: c chuẩn bị deploy lên BETA á
    └ [16:53] vitht: hoy để c nói lun cho
    └ [17:06] hungpn: okie
    └ [17:08] hungpn: sao anh nhớ là đã confirm vs em nhỉ
    └ [17:08] hungpn: anh check xong cho 2 em rồi nha Vi Tran Dat Nguyen
    └ [17:09] datnt: vậy chắc em miss message của anh á, chứ trong cái thread msg đó em không có thấy á
    └ [17:10] hungpn: okei em
  [16:51] datnt: * em có báo anh Hùng test rồi em đợi QC confirm em mới đưa LIVE đc
  [16:59] thinht: a loy staging nha
  [17:00] thinht: * a loy staging nha. có ai đang loy k
  [17:00] vitht: cos as
  [17:00] vitht: e dang build FE fountain
  [17:06] vitht: xong roi a oi
  [08:45] vitht: Dat Nguyen:  ơi mấy cái fix của e cho gift a choice
  [08:45] vitht: cho c ké cái commit này nha
  [08:45] vitht: merge dô của e đưa a Vũ review lun [thread: 9 replies]
    └ [08:45] datnt: fountain/0000-missing-goc-item-in-thank-you-page
    └ [08:45] datnt: nhánh này nha chị
    └ [08:45] vitht: d8422ad4315816782ebd21a320b9ddaa0e43fd03
    └ [08:46] vitht: ý là e merge dô brand e dùm c lun á
    └ [08:46] datnt: dạ oki chị
    └ [08:46] vitht: khỏi đưa branch cho chị
    └ [09:12] vitht: deploy xong báo c nha. C lên c test lại
    └ [09:14] datnt: 9h30 em báo lại nha, em đang dở tay test nhánh rồi á
    └ [09:41] datnt: Vi Tran done nha chij
  [09:27] datnt: Vu Tat anh ơi check giúp em PR này với nha:  - Này nó fix thiếu item gift of choice ở Pro thank-you page, checkout page. [thread: 8 replies]
    └ [09:28] vutq: image.png
    └ [09:29] vutq: cái này nên đổi thành goc-${idx} nhỉ
    └ [09:29] datnt: cái này nãy em lộn á anh
    └ [09:29] datnt: nó phải giữ nguyên key={`buildabox-${idx}`}
    └ [09:31] datnt: em trả lại rồi nha anh
    └ [09:40] vutq: done nha Dat Nguyen
    └ [09:51] datnt: Vu Tat anh ơi em quên còn bên BE nữa https://github.com/iamksheth/FountainGreetings/pull/539/changes
    └ [10:51] vutq: done nha Dat Nguyen
  [11:18] vitht: Deploy giúp c cái pull request này cho card 2895 nha Vu Tat    https://github.com/iamksheth/FountainGreetings/pull/509/c [thread: 6 replies]
    └ [11:19] vutq: fix rspec trong https://github.com/iamksheth/FountainGreetings/pull/509 nha chị Vi Tran
    └ [11:24] vitht: tất cả lun đúng không Vũ hay cho cái model thôi
    └ [11:25] vutq: PR actions báo lỗi cái nào chị fix nó là được
    └ [12:03] vutq: lên LIVE rồi nha mn Vi Tran Hung Pham
    └ [12:04] vitht: Phat Le:
    └ [12:04] vitht: test card 2895 kìa m ơi lên live rồi
  [11:25] vutq: * github actions báo lỗi cái nào chị fix nó là được
  [13:39] thinht: Dat Nguyen: 601, 603, 534 e làm chưa vậy [thread: 13 replies]
    └ [13:39] datnt: em đang test để đưa lên staging nha anh
    └ [13:40] thinht: ò vậy tiếp tục đi e
    └ [13:41] thinht: deploy xong 3 pr báo a bik chừng nhan
    └ [13:41] datnt: dạ oki anh
    └ [14:06] datnt: Thinh Tran anh deploy trước #600 với #553 nha
    └ [15:27] thinht: Dat Nguyen: 534 là e hỏi j Kunal hay Kunal muốn update j vậy e
    └ [15:29] datnt: là sao á anh, Kunal card đó thêm api handle cho page này anh
    └ [15:29] datnt: image.png
    └ [15:29] datnt: em review mấy cái coding của ổng rồi em test sai em mới feedback lại thôi anh
    └ [15:29] thinht: a thấy e có status Feedback to Kunal là zụ j đấy mà
    └ [15:30] datnt: image.png
    └ [15:30] datnt: là em feedback lại cho ổng rồi đợi ổng fix á anh
    └ [15:31] thinht: ah okie e.
  [13:42] vitht: trang checkout bị vỡ layout dòi nè
  [13:42] vitht: Screenshot 2026-10-08 at 1.42.29 pm.png [thread: 1 reply]
    └ [13:45] hungpn: qua anh cũng gặp nè
  [13:43] vitht: luồng gift a choice
  [13:44] vitht: còn luồng gift bình thường thì layout không bị vỡ
  [14:15] vitht: Cho e hỏi cái, có cái product này e mới tạo cho stock available là 1000
  [14:15] vitht: nhưng nó vẫn hiện trên product detail là out of stock
  [14:16] vitht: Screenshot 2026-10-08 at 2.16.03 pm.png [thread: 2 replies]
    └ [14:16] thinht: coi cache cũng có á e. chờ 10' xem
    └ [14:25] vitht: e kiếm ra đc dòi, nó có cái attribute is sold out =))
  [10:59] trinhmtt: Em thấy bác bảo muốn go-live cái site hôm giờ mình test vào 21st Oct nha mn [thread: 2 replies]
    └ [11:05] vutq: plan ban đầu là 28 Oct cái ổng nói là go LIVE toàn bộ gần 200 PR vào 21 Oct - tới hôm đó mình check 
    └ [11:07] thinht: dev check vs deploy thôi muốn ná thở chớ đừng nói QC test đủ vs kịp dc. 🤣
  [11:01] phatdlt: https://redmine.nustechnology.com/issues/81360 Trinh Mai e check dùm a con này với, chưa có design cho chổ này, hiện fix [thread: 6 replies]
    └ [11:17] trinhmtt: Vu Tat: case này em nhớ hồi đó có handle là giảm font size xuống, cái này mình làm dị được kh anh
    └ [11:18] vutq: ừm được nha, tầm 14 kí tự thì bắt đầu giảm 2px
    └ [11:19] trinhmtt: Phat Le: chốt anh nhe
    └ [11:47] phatdlt: Vi Tran: c fix theo v đi c
    └ [11:48] vitht: ok post bug đi
    └ [11:49] vitht: để cái yêu cầu dô nữa. Để mốt đọc lại biết mong muốn là gì
  [11:17] trinhmtt: * Vu Tat: case này em nhớ hồi đó case tương tự mình handle là giảm font size xuống, cái này mình làm dị được kh anh
  [11:42] datnt: Hung Pham anh test cái này giúp em nha https://github.com/iamksheth/FountainGreetings/pull/523 [thread: 2 replies]
    └ [11:47] datnt: Cái này anh vô trong admin https://staging.fountaingifts.com/admin/holiday_deliveries  - Anh thử add
    └ [13:50] hungpn: okie em, giờ anh qua check nè
  [11:47] datnt: * Cái này anh vô trong admin https://staging.fountaingifts.com/admin/holiday\_deliveries Anh thử add/edit/delete cái Hol
  [11:48] datnt: * Cái này anh vô trong admin https://staging.fountaingifts.com/admin/holiday\_deliveries Anh thử add/edit/delete cái Hol
  [13:23] thinht: Trinh Mai: Vu Tat  những PRs về UI mới liên quan trong  · V2 launch: review in order; the frontend PRs are stacked on th
  [13:25] vutq: hiện tại chỉ tập trung những PR liên quan Staff App và Security Fixes thôi nha anh, tuần sau mới tính tới V2
  [14:12] vutq: Hi mn, đây là tổng hợp những PR liên quan tới Security Fixes và Staff App - dự kiến tốt đẹp nhất là go LIVE vào **thứ 4 
  [14:15] vitht: quan trọng là test kịp hông á. Thấy pull request trong file sheet còn cả đống chưa test :v
  [14:41] hungpn: Trinh Mai: cho anh thêm 1 status ở đây với
  [14:41] hungpn: image.png [thread: 5 replies]
    └ [14:43] trinhmtt: em thay co rui ma
    └ [14:43] hungpn: ý anh là test xong chuyển status là gì á nè
    └ [14:43] hungpn: ready to live hả
    └ [14:44] trinhmtt: ready to live a
    └ [14:44] hungpn: okie em
  [15:03] datnt: em deploy Staging Fountain cái nha mn
  [15:06] hungpn: image.png [thread: 8 replies]
    └ [15:06] thinht: e nó đang loy. từ từ
    └ [15:07] datnt: không em chưa loy nữa :))
    └ [15:07] datnt: em đang pick qua bị conflict
    └ [15:07] hungpn: ak thế ak, tưởng đâu do t đi export nh quá chứ
    └ [15:07] thinht: ah vậy lỗi export r :D. mà export cái j đấy
    └ [15:14] datnt: Giờ em loy nha mn
    └ [15:20] hungpn: order á
    └ [15:22] thinht: ở trang Admin hã. vậy k bik :D
  [15:06] hungpn: anh lõ export 1 đống cía nó bị vậy giờ làm sao nhỉ? giúp anh cái
  [15:18] datnt: Vi Tran chị ơi em loy BE lên rồi á
  [15:18] datnt: FE chị ổn chưa chị loy lên test luôn chị
  [15:22] vitht: là sao nãy e kêu chị đưa cái brand FE cho e test mà [thread: 2 replies]
    └ [15:23] datnt: còn branch đó chị có muốn chỉnh gì nữa không á
    └ [15:23] datnt: khong em loy lên lun á
  [15:22] vitht: * là sao nãy e kêu chị đưa cái brand FE cho e test mà ?
  [15:22] datnt: em test local em rồi á
  [16:43] trinhmtt: task log đầy đủ giúp em nha mn ơi
  [08:44] trinhmtt: Em gui plan tuần này ạ  DatNT: 8h+ (tùy tình hình task) ViTHT: 40h VuTQ: 20h ThinhT: 12h => QC 20h
  [11:03] vutq: kế hoạch lại thay đổi nhờ Kunal nha mn :v - BE: https://github.com/iamksheth/FountainGreetings/pull/705 - FE: https://gi
  [11:05] vutq: * kế hoạch lại thay đổi nhờ Kunal nha mn :v - BE: https://github.com/iamksheth/FountainGreetings/pull/705 - FE: https://
  [11:19] vitht: vậy giờ chia ra thành task nhỏ để mn làm hay sao Vũ [thread: 1 reply]
    └ [11:24] vutq: đợi em tí, em đang discuss thêm với ổng
  [11:40] vutq: tạm thời chia như thế này nha mn: - Dat Nguyen coi phần Staff app (/backstage) - chị Vi Tran + anh Thinh Tran  coi phần 
  [14:29] phatdlt: https://trello.com/c/OSbaYhDP/3110-fountain-update-static-page-contact-form-layout-and-content Dat Nguyen Cái này lên li
  [14:34] datnt: Vu Tat anh Live giúp em PR này nha #[864](https://github.com/iamksheth/FountainNewUI/pull/864): https://trello.com/c/OSb [thread: 1 reply]
    └ [16:39] vutq: done nha mn Dat Nguyen Phat Le
  [14:47] vitht: Screenshot 2026-10-12 at 2.45.57 pm.png
  [15:24] vitht: có ae nào có key GEMINI_API_KEY  cho mình xin vs [thread: 1 reply]
    └ [15:26] vutq: ssh lên staging lấy trong  application.yml được nha chị
  [16:28] vitht: thay đổi toàn bộ lun á ae ơii
  [16:28] vitht: Screenshot 2026-10-12 at 4.27.54 pm.png
  [16:29] vitht: bắn pháo bông nữa :v [thread: 4 replies]
    └ [09:34] thinht: pháo bông đâu
    └ [09:43] vitht: a bấm accept gift là nó bắn á
    └ [09:43] vitht: thử đi a
    └ [09:44] thinht: hay vậy. nhìu trò phết :D
  [10:53] vitht: cái này là email sẽ gửi đến account paypal đã thanh toán đơn hàng nha
  [10:53] vitht: thấy nó có một vài cái khác email trước
  [10:53] vitht: Screenshot 2026-10-13 at 10.52.48 am.png
  [13:30] thinht: tính ra ông cus ổng thay đổi hết toàn bộ UI luôn goy 🫣
  [14:35] vitht: mn đọc cái file này nha /fountainnewui/components/Profile/V2/order-lines.ts  nó liên quan tới status của order ông Kunal
  [14:35] vitht: * mn đọc cái file này nha /fountainnewui/components/Profile/V2/order-lines.ts  nó liên quan tới status của order ông Kun
  [14:36] vitht: Screenshot 2026-10-13 at 2.36.07 pm.png
  [15:02] thinht: Ổng tạo PR merge vào 2 nhánh release quá trời luôn 🤪
  [15:03] vitht: lâu rồi mà a
  [15:03] vitht: từ thứ 2 rồi a đã trễ 1 nhịp :v [thread: 1 reply]
    └ [15:06] thinht: ổng cứ thêm lia lịa vậy r sao test hay review kịp cho plan 16/10 choy 🤒
  [15:09] vitht: Trang send của platform pro ổng đổi UI hết lun rồi á
  [15:09] vitht: có thể viết lại document cho project lun
  [15:10] vitht: Giờ chia ra viết document cuộc đời mới của Fountain App đc lun rồi đó
  [15:11] vitht: Mai mốt sẽ tới Infinity Roses app
  [15:11] vitht: Screenshot 2026-10-13 at 3.09.03 pm.png
  [15:54] vitht: Vi có liệt kê mấy cái tìm hiểu của staff tool trong task log sheet Staff Tool nha. Ai tìm hiểu đc gì thì note dô đó nha
  [15:54] vitht: https://docs.google.com/spreadsheets/d/1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o/edit?pli=1&gid=951720894#gid=9517208
  [15:55] vitht: Screenshot 2026-10-13 at 3.55.03 pm.png
  [09:28] vitht: Mai mình sẽ deploy cái v2 của ổng lên live nha ae Phat Le  Hung Pham Dat Nguyen Thinh Tran
  [09:28] vitht: mn thấy bug gì note lại xong lúc deploy lên live mình sẽ báo ổng rồi fix nha
  [10:02] phatdlt: Trinh Mai: v giờ cần ưu tiên test cái nào trước á e, cho a xin ticket với [thread: 2 replies]
    └ [10:05] trinhmtt: https://docs.google.com/spreadsheets/d/1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o/edit?pli=1&gid=1
    └ [10:07] phatdlt: ok nè e
  [10:35] hungpn: > <@vitht:nustechnology.com> Mai mình sẽ deploy cái v2 của ổng lên live nha ae Phat Le  Hung Pham Dat Nguyen Thinh Tran 
  [11:41] phatdlt: https://trello.com/c/TdvfIo08/3134-start-here-review-order-for-claudes-prs-oct-1?filter=3134 Dat Nguyen A check cái này  [thread: 2 replies]
    └ [11:43] datnt: dạ oki anh để em đổi status
    └ [11:43] datnt: anh check tiếp mấy cái PR khác bên dưới luôn nha anh
  [13:16] datnt: Em deploy staff + v2 lên Staging nha mn Phat Le Hung Pham 2 anh đợi em xong rồi test lại sau nha
  [13:33] datnt: Em deploy xong V2 lên Staging rồi nha [thread: 3 replies]
    └ [13:34] thinht: qué zỏi
    └ [13:35] datnt: Phat Le Hung Pham 2 anh giờ QC trên beta luôn nha từ UI xem có bể reponsive không, tới mấy cái payme
    └ [13:36] datnt: có thể sẽ sai do trong lúc em deploy lên em resolve conflicts nó quá nhiều em có xóa nhầm nha
  [14:33] thinht: Screen Shot 2026-10-14 at 14.32.42.png
  [14:33] thinht: Screen Shot 2026-10-14 at 14.32.07.png
  [14:33] thinht: chỗ này hay phết mn ah
  [14:40] vitht: hay mà cũng hơi rối ạ =))) [thread: 1 reply]
    └ [14:49] thinht: quá chời tính năng 🤣
  [17:06] thinht: Screen Shot 2026-10-14 at 17.05.32.png
  [17:08] thinht: Screen Shot 2026-10-14 at 16.56.48.png
  [17:08] thinht: này có phải là lỗi về giá khi add nhìu sp gift pk Phat Le Hung Pham
  [17:09] thinht: * này có phải là lỗi về giá khi add nhìu sp gift vào pro/send pk Phat Le Hung Pham
  [17:10] vutq: anh Thinh Tran test ra cái này ở nhánh release/v2-launch hả anh [thread: 1 reply]
    └ [17:10] thinht: uhm e
  [17:10] vutq: anh lên test.fountaingifts.com thử tái tạo xem, ra y chang thì chụp quăng qua báo Kunal [thread: 5 replies]
    └ [17:19] thinht: Screen Shot 2026-10-14 at 17.18.51.png
    └ [17:19] thinht: Screen Shot 2026-10-14 at 17.14.01.png
    └ [17:20] thinht: bị luôn em, mình báo cho cus ntn vậy
    └ [08:49] vutq: chị Vi có note những bug về cái release này ấy, anh Thinh Tran đưa chị Vi note chung rồi báo ổng sau
    └ [09:07] vitht: a Thinh Tran  cho e xin các step a Thịnh làm vs
  [09:48] vitht: mn test lun cái upload spreadsheet của tab recipient bên pro lun nha Phat Le Thinh Tran
  [09:48] vitht: fountain-pro-recipient-tab-spreadsheet-addresses-v1.csv
  [09:49] vitht: Screenshot 2026-10-15 at 9.48.58 am.png
  [10:19] vitht: v2 lên live rồi
  [10:19] vitht: test đi ae oiiw
  [10:19] vitht: Phat Le:  Thinh Tran
  [10:19] vitht: Dat Nguyen:
  [10:20] phatdlt: hời ơi, mới vừa nhắc cái lên r sao chị, hay qá dị
  [10:21] phatdlt: Trinh Mai vậy tí a ghi workstream là test V2 on product + function nha e tại k có ticket nào cho vụ V2 này
  [10:25] vutq: ticket này nha anh Phat Le https://trello.com/c/MlCuwNVJ/3147-post-v2-release
  [11:39] vitht: Mọi người test checkout trên live lựa món rẻ rẻ để test thôi nha. Lựa cái mấy trăm đô test ông Kunal chưởng á. Với lại t
  [11:39] vitht: * Mọi người test checkout trên live lựa món rẻ rẻ để test thôi nha. Lựa cái mấy trăm đô test ông Kunal chưởng á. Với lại
  [11:41] phatdlt: ok chị e note nha
  [11:41] hungpn: vào admin kiếm cái code của Dat Nguyen 99% discount sài cho rẻ nè [thread: 3 replies]
    └ [11:42] datnt: giờ có cái xài credits á anh
    └ [11:42] hungpn: Phat Le: sài cái này nè em
    └ [11:43] hungpn: lên admin set khoảng 1tr usd là sài tòe 😆😆
  [11:41] vitht: Ổng bỏ cái discount rồi a
  [11:42] hungpn: nói k vs khuyến mãi hả
  [11:46] vutq: Kunal có nhắn là tạm thời đừng checkout nha mn, vọc vòng vòng UI mới cho quen là được
  [11:58] hungpn: image.png
  [11:58] hungpn: cai filter nay giờ chỉ filter 1 lần dc 1 section thôi nhỉ
  [11:59] hungpn: nó k như trước kết hợp dc nh section vs nhau
  [13:38] vitht: Nó cũng đang bị một issue là khi a click cái condition mà a đã chọn để filter mà chưa nhấn done thì nó tự tắt modal filt
  [13:38] vitht: tính ra là chưa chọn xong condition là nó filter lun rồi
  [13:38] hungpn: thì đang là 1 mà
  [13:39] vitht: * tính ra là chưa chọn xong condition là nó filter lun rồi. Xong a mở lại để unclick thì cái modal nó vẫn mở
  [13:39] hungpn: nó tự auto filter á, quan trọng là đk sẽ là 1 hay là dc nh option á
  [13:40] vitht: Hồi trước nó filter theo một à. Bây giờ nó filter theo multi condition rồi
  [13:46] thinht: có j test thử nhìu device zụ UI luôn nhan Hung Pham
  [13:46] hungpn: okie
  [14:48] thinht: Screen Shot 2026-10-15 at 14.47.06.png
  [14:48] thinht: Screen Shot 2026-10-15 at 14.46.44.png
  [14:48] thinht: Screen Shot 2026-10-15 at 14.46.25.png
  [14:49] thinht: Vi Tran: sau khi a qua page checkout , rồi back về cái giá total vs list gift nó khác luôn
  [14:49] thinht: * Vi Tran: sau khi a qua page checkout , rồi back về cái giá total vs list gift nó khác luôn. Này bug hay tính năng
  [14:49] vitht: Dạ đợi e xíu
  [14:51] vitht: E call a cái đc không dị
  [15:10] hungpn: image.png
  [15:10] hungpn: submit mayas form nay chac k sao dau Trinh Mai nhi
  [15:11] vutq: đừng submit nha anh :v nó gửi vô mail team ổng ấy, chứ không vô mail anh đâu
  [15:12] hungpn: nên fai confirm trước khi nhấn gì đó nè
  [15:15] thinht: còn zụ email fake của recipient nữa. cái đó có cần check k nữa?
  [15:17] hungpn: chắc check sau, do chưa đc đụng vào order mà
  [15:19] hungpn: https://redmine.nustechnology.com/issues/81475 -- Trinh Mai check dùm anh xem con bug có đúng với behavior cuả ổng k vs
  [15:20] vitht: Trinh Mai:  ơi xún chị nói cái
  [16:00] hungpn: cái GOC mà chọn list work sao thế m.n
  [16:00] hungpn: image.png
  [16:06] vitht: To one person là platform personal, còn a chọn to a list là dành cho business platform
  [16:09] vitht: Hung Pham:

### Maddy - Extreme Soft Solutions — 207 messages
  [10:56] longvv: RMS Quoting Tool.docx
  [10:56] longvv: Thanh Nguyen: a verify lại các item xem đã fix chưa trên RMS giúp e nha
  [10:57] longvv: https://docs.google.com/spreadsheets/d/11WoNkKs6syHC6pIP_KdToNGnlidNkgMqN19TzeUG9rg/edit?gid=0#gid=0  => Clone 1 cái she [thread: 56 replies]
    └ [14:09] thanhnx: image.png
    └ [14:09] thanhnx: anh tạo quotes báo 500 nha em
    └ [14:55] longvv: lại nha a
    └ [15:31] thanhnx: image.png
    └ [15:31] thanhnx: oki rùi em feedback sao sheet thế nào vậy em
    └ [15:31] thanhnx: đưa ảnh vào ko
    └ [15:31] longvv: có càng tốt
    └ [15:36] thanhnx: hình như cái sheet anh ko điền đc
    └ [15:36] longvv: em kêu anh clone ra
    └ [15:36] longvv: sheet đó của cus á
    └ [16:05] thanhnx: image.png
    └ [16:05] thanhnx: con này anh ko tìm ra
    └ [16:06] longvv: z thì nó ko có data á
    └ [16:08] longvv: e search có ra túi này trên trang nào đâu
    └ [16:09] thanhnx: image.png
    └ [16:09] thanhnx: bên google lens thấy có
    └ [16:09] longvv: a search trên trang của khách kì
    └ [16:09] longvv: nó ko có match với từ khóa á
    └ [16:09] longvv: Louis Vuitton Chain Monogram
    └ [16:10] longvv: a test item khác nha
    └ [16:11] longvv: để note lại với khách
    └ [16:11] thanhnx: https://docs.google.com/spreadsheets/d/11Lm4HI0QUBJudWHybq9MIskb9liEXDRaGWVK2aRqoJ0/edit?gid=0#gid=0
    └ [16:11] thanhnx: anh đang note lại bên này có gì em vào check nha
    └ [16:55] thanhnx: image.png
    └ [16:56] thanhnx: có con chocolate bị fail ak em
    └ [16:56] thanhnx: hay em cho ảnh con này thử lại nha
    └ [16:57] thanhnx: image.png
    └ [16:57] thanhnx: image.png
    └ [16:57] thanhnx: giờ thì đc mà ko có kết quả
    └ [17:05] longvv: mấy cái ko có kết quả để đó đi, có gì e giải thích
    └ [17:06] thanhnx: oki để anh note vào
    └ [08:36] longvv: test tiếp nha a, để tổng hợp lại gửi ổng Thanh Nguyen
    └ [14:11] thanhnx: image.png
    └ [14:11] thanhnx: issue 106 này cần tìm theo từ nào vậy em
    └ [14:11] thanhnx: với ảnh là túi nào thế
    └ [14:11] longvv: 66381
    └ [14:12] longvv: a tìm cái quote đó đi
    └ [14:12] longvv: ko ra e tìm cho
    └ [14:12] thanhnx: anh tìm rùi ko ra
    └ [14:13] thanhnx: tìm giúp anh 3 ví dụ lun nha
    └ [14:43] longvv: khó r
    └ [14:43] longvv: mấy cái hình bị delete hết
    └ [14:43] longvv: ko tìm dc
    └ [14:45] longvv: Thanh Nguyen: a chụp màn hình cái hình trong ảnh
    └ [14:45] longvv: r xài thử coi ra ko
    └ [14:47] longvv: image.png
    └ [15:32] thanhnx: image.png
    └ [15:33] thanhnx: con này dùng ảnh con Pochette mà tìm ra  Louis Vuitton Neverfull MM Monogram
    └ [15:51] longvv: là sao á
    └ [16:41] thanhnx: image.png
    └ [16:41] thanhnx: này là issue này nha
    └ [16:42] longvv: a test tiếp nha
    └ [16:48] longvv: image.png
    └ [16:49] longvv: ko có pochette nào ở đây hết =))
    └ [09:21] thanhnx: image.png
    └ [09:21] thanhnx: con này trong shpify có mấy con zay em
  [17:05] longvv: * mấy cái ko có kết quả để đó đi, có gì e giải thích cho cus
  [09:55] duongdn: Hi Long Vo  A có tạo 1 tag trên WS là "làm trước report sau", em add tụi nó vào các task mà hiện cus chưa approve mà mìn
  [14:45] longvv: * Thanh Nguyen: a chụp hình cái hình trong ảnh
  [08:54] tuantt: Đó h khách có nhắc đến role Carrick ko Long Vo
  [08:54] tuantt: Thấy bị đá ra khỏi Jira rồi
  [08:55] longvv: ko nha a, Carrick quit bên ổng lâu r á
  [08:55] longvv: ko dc thi chac xai Kai
  [08:55] tuantt: V thì ổng đá là đúng r
  [08:55] tuantt: Thanh Nguyen: xài Kai đi ông
  [09:44] luhx: Screenshot 2026-09-18 at 09.44.10.png
  [09:44] luhx: Minh Trinh:
  [09:46] minhtv: Múc đê
  [09:46] luhx: múc gì, tuần sau mới làm mà.
  [09:47] minhtv: oh, nãy cứ thấy urgent là múc , chưa kịp đọc 🤣
  [08:29] minhtv: Múc bên này trước nhé Lữ, ổng kêu urgent
  [08:31] luhx: oke
  [09:14] duongdn: Theo thống kê thì tuần trước có 3 bug external , khá nhiều dù mình chỉ làm có vài giờ Mấy issue này root cause là gì vậy [thread: 3 replies]
    └ [09:32] longvv: Chủ yếu là về Quote Tool, em đã giải thích rõ lý do cho ổng để ổng gửi lại cho khách rồi. Đợt trước 
    └ [10:10] longvv: Duong Doan: hú a
    └ [10:15] duongdn: OK e
  [09:15] longvv: a đang nói tới task nào á?
  [09:16] duongdn: mấy issue tuần trước trong Slack chẳng hạn
  [10:08] duongdn: ới ?
  [10:14] longvv: e có rep trong thread
  [08:46] duongdn: Có msg Anoma nha em
  [08:57] longvv: ok a
  [10:39] longvv: https://madhuraka-godahewa.atlassian.net/jira/software/c/projects/LIFM2/boards/4?selectedIssue=LIFM2-467 Thanh Nguyen a  [thread: 16 replies]
    └ [13:32] thanhnx: image.png
    └ [13:33] thanhnx: anh thấy nên tìm bằng chữ cái đầu
    └ [13:33] thanhnx: để khi tìm chữ L thì ra đc Louis Vuitton lun
    └ [13:34] longvv: là sao ta
    └ [13:34] longvv: e thấy trong video a search L ra louis trc mà ta
    └ [13:35] thanhnx: Screencast From 2026-09-24 13-35-13.webm
    └ [13:35] thanhnx: xem lại cái này nhen
    └ [13:41] longvv: a search L in hoa xem
    └ [13:42] thanhnx: L hoa cũng zay nha
    └ [14:32] thanhnx: image.png
    └ [14:33] thanhnx: ở item 6 anh add ảnh vô nó báo lỗi ak
    └ [14:36] thanhnx: image.png
    └ [14:36] thanhnx: up 1 ảnh vẫn bị ak
    └ [14:55] longvv: a check lại nha
    └ [14:58] longvv: clear cache nhe
    └ [15:23] thanhnx: oki rùi nha
  [13:32] thanhnx: 
  [09:26] duongdn: Maddy hỏi nha Long Vo  complain nhẹ sao task kéo lâu quá, e msg lên room chung có cả 3 người để speedup task nha, ko chá
  [09:35] duongdn: === BTW, hôm qua hình như chưa report
  [09:46] longvv: e để nay report á
  [09:54] longvv: Với có 1 task ông duyệt r, bữa mình cũng làm trc report sau
  [09:54] longvv: * Với có 1 task ông duyệt r, bữa mình làm trc report sau
  [09:58] duongdn: Vậy e tạo 1 record cho task đó, actual = 0, còn charge bằng giờ actual hồi bữa  còn nếu phát sinh effort thêm từ giờ thì
  [10:12] duongdn: Long Vo:   hôm qua e có làm task sao a ko thấy report mà full James nhỉ?
  [10:18] longvv: hqua e có làm mà làm có 15p à
  [10:21] duongdn: kệ ... có làm cứ log thôi
  [22:31] duongdn: sao a ko thấy task nào như thế này của ngày 25/09 em ?
  [22:31] duongdn: Long Vo:
  [22:35] longvv: e ko nhập 0 dc
  [22:35] longvv: image.png
  [22:35] longvv: e để như này nha
  [22:37] duongdn: ok em
  [22:38] duongdn: charged thì để cao nha
  [22:38] longvv: Charged chắc a chỉnh dc à
  [22:38] longvv: e ko chỉnh dc
  [22:39] duongdn: vậy để actual = charge luôn đi
  [22:39] longvv: e done
  [22:39] duongdn: note là: thưc tế actual = 0, đây là task được approve nhưng đã làm trước
  [22:39] longvv: ok a
  [23:34] duongdn: LIFM2-466: Tagging Postmark emails
  [23:34] duongdn: task này cua vẫn chưa approve hả em?
  [23:34] longvv: chưa nha a, có gì e hỏi ổng
  [23:34] duongdn: uhm hỏi đi
  [08:52] duongdn: https://xtremesoftsolutions.slack.com/archives/D050TGMRFRQ/p1791105786850899
  [08:52] duongdn: sắp xếp làm ngay Long ơi
  [08:53] longvv: E có đọc r, cái task đó e quăng bà kia test lại t
  [08:53] longvv: * E có đọc r, cái task đó e quăng bà kia test lại r
  [08:53] longvv: * E có đọc r, cái task đó e xử lý xong với quăng bà kia test lại r
  [08:53] duongdn: báo ổng phát
  [11:30] longvv: https://madhuraka-godahewa.atlassian.net/browse/LIFM2-450? Thanh Nguyen e nhờ a verify lại giúp e task này trên RMS nha,
  [09:07] duongdn: Có msg nha Long Vo
  [09:33] longvv: ok a
  [11:16] duongdn: Hi Long
  [11:17] duongdn: Maddy mới gởi msg cho Chiến, cần 1 số info Đầu tiên, e check lại coi tháng trước, có task nào có trong WS mà ko có trong
  [11:20] duongdn: Lu Ho:   Bên em thì sao, e làm có JIRA ticket ko, có fill giờ vào đó ko?
  [11:20] longvv: image.png
  [11:20] longvv: Có 1 số issue mình bỏ thời gian ra check cái quoting tool, nó nằm trong Slack chat
  [11:20] luhx: em có làm 1 task ở jira và làm xong em log giờ trên đó đủ. [thread: 1 reply]
    └ [11:26] duongdn: ok e
  [11:20] longvv: image.png
  [11:20] longvv: Với phần suggestion
  [11:22] duongdn: > Có 1 số issue mình bỏ thời gian ra check cái quoting tool, nó nằm trong Slack chat Ko có trong JIRA à? Tương tự coh su
  [11:26] longvv: ko có trong jira, mà có 1 phần issue nhỏ trong đó e có tạo là LIFM2-468, cái này ổng cũng approve 1h để fix r
  [11:27] duongdn: nói chung là giờ trong JIRA và WS lệch giờ
  [11:27] longvv: À, cái này 468 này thì em chưa log trong jira nha, e sót 1h
  [11:27] duongdn: lệch ko ít
  [11:27] duongdn: cần nói rõ cho ổng giờ thiếu bao gồm những gì
  [11:33] longvv: - Investigate why items sold are draft on Shopify 1h - Investigate approach to improve quoting tool results for client 1
  [11:35] duongdn: ghi rõ các task trên liên quan JIRA ticket nào nha, ví dụ fix bug gì đó, hoặc ko có thì là bug gì
  [11:39] longvv: Slack: - Investigate why items sold are draft on Shopify 1h (https://xtremesoftsolutions.slack.com/archives/D050TGMRFRQ/
  [11:39] longvv: * Slack: - Investigate why items sold are draft on Shopify 1h (https://xtremesoftsolutions.slack.com/archives/D050TGMRFR
  [11:47] duongdn: OK e
  [11:56] duongdn: Cái quote tool,  có vẻ có rất nhiều bug ? Thấy feedback mãi, cho a chi tiết các lần fix của mình và nguyên nhân Đánh giá
  [11:57] longvv: https://docs.google.com/document/d/1QzmeIuJUxID1rS3ktFyEjX02zpWcHBNeP8gXl89e9-0/edit?usp=sharing
  [11:57] longvv: Bữa e có soạn docs giải thích
  [11:57] longvv: chi tiết luôn
  [11:59] duongdn: ngon lành để a xem
  [12:01] longvv: cũng có bug của mình, và cũng đã fixed, tất nhiên là e bỏ thời gian riêng của e ra fix rồi. e ko có charge ổng phút nào 
  [13:32] duongdn: https://xtremesoftsolutions.slack.com/archives/D050TGMRFRQ/p1791012754964499?thread_ts=1789646620.555009&cid=D050TGMRFRQ
  [13:32] duongdn: Long Vo:  cái này mình chưa trả lời nhỉ?
  [13:33] longvv: cái đó e chưa, e chưa có tgian ngó quá
  [13:33] duongdn: OK coi nha
  [13:44] duongdn: image.png
  [13:44] duongdn: sao con AI nó quét nó nói có rất nhiều ticket chưa log JIRA ta ...
  [13:46] longvv: 467, 466 -> log trc report sau á, 467 mình log thêm 2.5h để charge
  [13:49] duongdn: ok em
  [13:54] longvv: mấy cái còn lại thiếu, chắc e log bù á
  [13:58] duongdn: ko em, e để nguyên trạng nha, đang giải thích cho cus
  [13:58] duongdn: giờ log thành ra rối
  [13:58] duongdn: e có log thêm thì xóa đi
  [13:58] longvv: ok a
  [10:12] duongdn: sắp xếp múc đi em
  [10:15] longvv: ok a
  [21:16] duongdn: Hi Long Vo  Tạm thời các issue Maddy mình sẽ dừng action nha, có cứ raise lên với a
  [21:27] longvv: Ok a
  [09:44] duongdn: Long Vo:  dừng luôn việc làm trước report sau nha
  [08:45] longvv: image.png
  [08:45] longvv: ổng có nhờ e check comment nha a
  [08:50] duongdn: làm đúng ý ổng nha, check xem phải issue hay ko rồi dừng thôi , ko action tiếp
  [08:50] longvv: ok a
  [08:51] duongdn: e dùng khoảng 15 - 30m, quá thời gian đó thì dừng, nói cần check kĩ thêm  Lí do thì cứ report chi tiết, xong báo a
  [09:29] duongdn: sao rồi em ?
  [09:29] longvv: Có issue mà chỉ mất 15p update thôi nha a
  [09:30] longvv: mình hỗ trợ ổng ko a
  [09:31] longvv: chủ yếu là update review code từ con AI của ổng, e thấy cũng hợp lý
  [09:38] duongdn: này chắc mình làm kiểu cá nhân thôi nha, hiện task ổng đang rất khó khăn về việc charge
  [09:40] longvv: ok a
  [09:41] duongdn: thank e
  [08:45] duongdn: Cus có msg nha em Mà ko hiểu, sao tự nhiên ổng đòi check trong khi ko thông báo gì có gì cần check trước đó
  [09:06] longvv: Chắc là feedback trong Jira
  [09:07] duongdn: Em ngó qua xem nó về cái gì rồi mình discuss bước tiếp theo
  [09:11] longvv: Cái bà Anoma này hay làm mất thời gian mình lắm, e test thì ko bị
  [09:11] longvv: e có gửi ảnh cho bả r
  [09:12] duongdn: vậy xong rồi à, vậy thôi, cái nào tốn time nhiều thì hẵn tính báo lại Maddy đi
  [15:07] longvv: image.png
  [15:07] duongdn: full time
  [15:07] longvv: Duong Doan: Sắp có h bên này tiếp rùi
  [15:09] minhtv: Chưa thấy ổng nhắn mobile 1 câu tương tự 🤣

### Mindbody Blog Posts — 75 messages
  [08:49] chientx: Hi mn, Cty hiện tại đang muốn publish một số nội dung trên blog của cty liên quan Mindbody, nên nhờ a Dương và Minh hỗ t ⚠️
  [08:50] chientx: Chắc trước tiên nhờ Minh và a Dương post lên đây mỗi người đề xuất 5 topics nào mình có thể khai thác về Mindbody
  [08:51] duongdn: OK e
  [08:51] chientx: * Hi mn, Cty hiện tại đang muốn publish một số nội dung trên blog của cty liên quan Mindbody, nên nhờ a Dương và Minh hỗ ⚠️
  [08:56] chientx: Trong hôm nay đưa đề xuất luôn nha mn
  [08:58] minhtv: okay a
  [09:02] duongdn: OK e
  [10:51] minhtv: Em có đề xuất một vài topic như sau  1. How to Keep Mindbody Data in Sync With Your Own Database 2. Handling API Failure
  [11:07] duongdn: a review ra được vài ý mình đã xử lí   1. Reconciling Stripe and Mindbody Payments in the same checkout flow   2. Extend
  [11:30] chientx: > Extending Mindbody membership data to Apple Wallet Cái này viết thiên nhiều bên mobile phải ko a?
  [11:32] duongdn: mỗi bên 1 phần
  [11:34] chientx: Có share mn link 1 cái sheet: https://docs.google.com/spreadsheets/d/1ThIxwdvdzgcFv9BzIXWW42B-g4M8BNdy_MsQ8N-LVU8/edit?g
  [11:35] chientx: * Có share mn link 1 cái sheet: https://docs.google.com/spreadsheets/d/1ThIxwdvdzgcFv9BzIXWW42B-g4M8BNdy\_MsQ8N-LVU8/edi
  [13:50] minhtv: Em lọc mấy cái có độ tương đồng cao nhé a Dương ơi: Phía em:  Mindbody Payments vs Stripe: What Should Your Custom App U ⚠️
  [21:38] chientx: Mn hoàn thành draft các bài này trễ nhất T4 tuần sau được chứ?
  [21:42] chientx: Các hình diagram mn chịu khó để file hình riêng nha, để download về, chứ ko dùng dạng embedded trong file Markdown luôn.
  [09:04] duongdn: a hẹn hết tuần sau nha, cuối tuần này thì đi chơi rồi 2 - 4 - 6 a có lịch học full buổi tối (kéo dái đến t4 tuần sau nữa
  [09:06] minhtv: Text dạng markdown raw (không phải dạng word) =>Cái nào cũng có markdown luôn hay sao a nhỉ ?
  [09:07] minhtv: Em có cập nhật link tải luôn rồi á a, cho bài của em
  [09:09] chientx: là sao e nhỉ?
  [09:10] minhtv: A có ví dụ 1 cái text markdown ko a nhỉ ? Em chưa biết toàn bài đều đánh là markdown hay chỉ những phần hợp lý mới đánh
  [09:10] chientx: ban ngày không có time trong giờ để làm mấy bài này hay sao a?
  [09:11] chientx: Ý a là nguyên cả bài là markdown hết. Nó giống như e gửi a nguyên bài viết là 1 file text định dạng .md á e
  [09:12] duongdn: có nhưng ko cố định lắm, nên ko biết được, chỉ có cuối tuần thì chủ động được à
  [09:12] minhtv: Em okay với deadline này
  [09:12] chientx: ráng sắp xếp trong giờ đi a, cái này coi như 1 task TL cần làm trong giờ th. Đã có idea, mainpoint thì kêu AI nó viết th
  [09:13] chientx: em bữa trước 1 ngày sinh ra 10 bài là bình thường, quan trọng là phải có idea và nội dung chính để feed cho nó viết
  [09:14] duongdn: oh ok em
  [17:24] duongdn: a đã hoàn thành các post về MindBody nha
  [20:49] chientx: thanks a
  [22:57] minhtv: Em cũng vậy nhé a
  [08:22] chientx: thanks e
  [15:49] chientx: a Dương tự sinh ra hình cover luôn à, a dùng con AI gì vậy ah?
  [15:50] chientx: mấy hình này e cần đúng theo 1 kích thước và có logo cty, nên sẽ cần edit lại, thường e hay kêu Hậu làm
  [15:50] minhtv: Con Claude của em cũng có nếu cần em có thể add lên , hoặc để Hậu làm 😀
  [15:50] minhtv: * Con Claude của em cũng có nếu cần em có thể add lên , hoặc để Hậu làm 😀 Chỉ cần đưa đúng tỉ lệ là được
  [15:51] duongdn: > a Dương tự sinh ra hình cover luôn à, a dùng con AI gì vậy ah? À, a dùng Claude viết bài, do nó đọc code lâu nay, nhưn
  [15:51] duongdn: * > a Dương tự sinh ra hình cover luôn à, a dùng con AI gì vậy ah? À, a dùng Claude viết bài, do nó đọc code lâu nay, nh
  [15:52] duongdn: a có chat GPT plus khuyến mãi :D
  [15:52] chientx: Why_Paperless_Workflows_Matter_More_Than_You_Think_in_Field_Operations.jpg
  [15:53] chientx: Đây là ví dụ 1 hình cover, cần theo kích thước này: 1920 x 1080 và có logo cty giống vậy ở 1 góc  Trên hình cover ko để 
  [15:53] chientx: a Dương sinh lại thử e 1 hình coi thử ah 🙂
  [15:54] duongdn: ok để a generate lại mấy cover theo info trên
  [10:56] duongdn: a generate xong rồi nha
  [09:39] chientx: Cái icon trong hình a Dương nó không giống gì cả :D
  [09:40] chientx: Minh Trinh: e sinh thử 1 hình cho bài blog bên e xem sao
  [09:41] minhtv: okay a , để em thử vs Claude pro max 🤣
  [11:28] minhtv: em mới thử 1 tấm a coi thử ổn ko a? Ổn em cho full những tấm còn lại
  [17:01] chientx: hình đó thấy OK á nha Minh
  [17:01] chientx: a Duong Doan , tìm cách chỉnh lại logo cho giống y chang style mấy hình khác luôn giúp e với ah
  [17:02] minhtv: Của em lên đủ cover hết rồi á
  [16:40] duongdn: a generate lại hết logo rồi nha Chien Tran
  [16:50] minhtv: của a Dương nhìn nó lạ lạ sao á. Chất lượng thấp + nét chữ bị mảnh , ko đúng chuẩn.
  [16:50] minhtv: company_logo.zip
  [16:50] minhtv: Em dùng logo chuẩn của cty luôn á a Dương
  [16:55] duongdn: logo a cũng size thế, mà sao bảo con AI gắn vô thì nó tùm lum cả
  [16:55] duongdn: có tool nào giải quyết cái này tốt ko
  [16:57] minhtv: A đưa em hình gốc chưa logo em làm luôn cho, em đang dùng Claude nó tự làm
  [17:03] duongdn: OK
  [17:19] duongdn: https://drive.google.com/file/d/1eWEnoKNNFkIuHNsL8yqcfVQbyoI6hs9o/view?usp=drive_link Minh Trinh
  [08:34] minhtv: Screenshot 2026-09-29 at 08.34.49.png
  [08:35] minhtv: Cái hình số 5 của a vẫn có cái logo này á a
  [08:44] duongdn: class-booking-outcomes-1920x1080.png
  [08:44] duongdn: dùng cái này nha
  [09:03] minhtv: https://drive.google.com/file/d/1jipq4MuT1Y4p61QiBa2zim0OfG8HcWjY/view?usp=sharing
  [09:03] minhtv: Em gửi lại nhé a Dương ơi
  [09:04] duongdn: thank e
  [14:41] chientx: hi a Duong Doan Minh Trinh  Có invite 2 người làm Contributor của trang blog cty. Mn có gì accept, setup acc và setup 1 
  [14:43] duongdn: OK e
  [14:46] minhtv: Em done
  [14:49] chientx: E chưa set bio nha Minh, a cần 1 đoạn bio giới thiệu bản thân e khoảng 250 characters Chém gió gì đó vào: I'm a Senior M
  [14:53] minhtv: okay a , em updated
  [15:03] chientx: https://www.nustechnology.com/blog/how-to-keep-mindbody-data-in-sync-with-your-own-database -> e xuất hiện rồi nha Minh.
  [15:09] minhtv: em đã updated
  [15:18] duongdn: a đã update BIO nha

### Newsletter Inform — 3 messages
  [16:00] trucpdt: alo alo thử loa, test loa
  [16:00] trucpdt: mng có thấy em ko ạ
  [16:01] trucpdt: tháng này chúng ta có gì thú zị hông mng ơiiii

### Những chú voi con đáng yêu — 66 messages
  [09:39] duongdn: https://laravel-news.com/laravel-mcp-1-0?utm_medium=feed&utm_source=feedpress.me&utm_campaign=Feed%3A+laravelnews
  [09:39] duongdn: rồi cái gì cũng sẽ có MCP thôi :d
  [08:56] duongdn: https://laravel-news.com/laravel-14#content-breaking-changes
  [08:56] duongdn: nhiều thứ hay ho nha, hóng Laravel 14
  [08:56] duongdn: btw, vẫn chưa có cơ hội xài 13 :))
  [08:58] longvv: má ơi
  [08:58] longvv: 14 rồi hả tr
  [09:00] duongdn: y như iphone thôi
  [09:00] duongdn: bắt đầu xài 12, 13 đi mn
  [09:00] duongdn: :D
  [09:00] duongdn: Phuc Vo:  bên James udpate Laravel lên latest phải ko? Long Vo  ?
  [09:01] phucvt: Chưa biết nữa anh, quan trọng có block gì ko nữa
  [09:01] phucvt: Nếu k lên mới nhất luôn :))
  [09:02] longvv: Lên mới nhất càng tốt, nó support nhiều thứ
  [09:03] longvv: Sau này gạ ông làm cái MCP cho Claude nó tra cứu BĐS đồ 🤣
  [09:03] duongdn: uhm đã lên thì cứ latest thôi
  [09:03] phucvt: Ừa, mà đang bản 5.8 :))
  [08:37] duongdn: https://app.tikop.vn/d8E7uysRLgq5upSw9
  [08:37] duongdn: mn tải app giúp a làm nv với :D
  [08:40] duongdn: L2JQ6K
  [08:48] phucvt: App này có gì hay hong a Dương :))
  [08:55] duongdn: dạng fintech app cho gởi tiền lãi suất cao hơn ngân hàng
  [08:55] duongdn: đặc biệt lãi suất ko kì hạn tới 5.4%
  [08:55] duongdn: tất nhiên rủi ro sẽ cao hơn ngân hàng rồi
  [08:55] duongdn: đó là core, rồi có thêm các thứ liên quan như mua vàng online, mua cổ phiếu vvv
  [14:10] duongdn: https://laravel.com/framework/docs/ai-sdk
  [14:10] duongdn: ae thấy gì chưa :v
  [14:14] longvv: ngon lun
  [14:17] phucvt: VIP luôn, support quá trời thứ. Em vẫn thích cách tiếp cận của Laravel và docs của nó, chắc do quen thuộc :D
  [14:17] duongdn: chứ gì nữa, :D
  [14:18] phucvt: Được vài tuần làm Python mà thấy nó rắc rối gì đâu 🥲
  [14:21] duongdn: Laravel được thiết kế học hỏi theo kiến trúc RoR mà, e mà làm Rails thì còn đã nữa, có khi bỏ PHP luon
  [14:21] duongdn: ko tin hỏi Tuan Nguyen  xem :v
  [14:22] duongdn: gì chứ convenience thì RoR là best của best
  [15:09] phucvt: Anh em nào luôn bật bật **thinking mode là max/ultra** và nghĩ là nó **luôn luôn tốt** thì nên đọc bài viết này nha @@ B
  [15:10] duongdn: thinking mode ... ai giàu vậy :v
  [15:12] phucvt: Có em trong đó á. Mà xem xong bài viết thì mới biết là mình đang lãng phí tiền và thời gian 🥲
  [15:13] duongdn: mấy người có pro max 100$ có khác ...
  [15:53] phucvt: * Anh em nào luôn bật bật **effort mode là max/ultra** và nghĩ là nó **luôn luôn tốt** thì nên đọc bài viết này nha @@ B
  [10:27] duongdn: https://github.com/marcreichel/laya-php
  [10:27] duongdn: bắt đầu làm quen với AI self-hosted nho nhỏ chơi nè mn
  [10:24] longvv: Dành cho anh nào đang xài Claude Max, hiện tại Claude đang tặng API Credits cho gói Max và gói Team/Business
  [10:24] longvv: image.png
  [10:30] phucvt: Hướng dẫn sử dụng luôn đc hong daika :D
  [10:36] longvv: Tùy mục đích sử dụng nha fen, có thể sử dụng để phục vụ cho dự án cá nhân của mình hoặc tính năng mình đang làm liên qua
  [10:38] phucvt: Ý là connect sao á? :v Đang dùng Claude Code, chắc tạo API key là connect được vô Claude Code ha ta?
  [10:38] phucvt: image.png
  [10:39] phucvt: Ví dụ Claude trước đó nó cho $250 Cloud session credits, mà tìm hiểu sơ thì thấy k xài với Claude Code được 😵‍💫
  [10:41] longvv: Bth mấy thằng như OpenCode nó có mình chọn model của Claude, thì m lấy API key đó paste vô là xài dc Còn Claude thì ko r
  [10:43] longvv: * Bth mấy thằng như OpenCode nó có cho mình chọn model của Claude, thì m lấy API key đó paste vô là xài dc Còn Claude th
  [10:44] longvv: image.png
  [10:44] longvv: nuôi cho béo chắc r thịt đây mà
  [10:44] longvv: * nuôi cho béo sau đó thịt đây mà
  [10:47] longvv: > <@phucvt:nustechnology.com> Ví dụ Claude trước đó nó cho $250 Cloud session credits, mà tìm hiểu sơ thì thấy k xài với [thread: 1 reply]
    └ [11:44] phucvt: Để thử coi. K chắc được
  [16:43] duongdn: image.png
  [16:43] duongdn: Khanh Ho:  Le Ngo  WS có cái option về client report, khi mình daily report cho cus xong cần check nó để make sure mình 
  [16:44] duongdn: mần lun y
  [16:51] lenh: ok a
  [16:52] lenh: Tick cho tuần này thôi he anh, mấy tuần trước không biết có cái tick này
  [16:54] duongdn: haha quên đọc guide về WS rồi
  [09:55] duongdn: https://thuonghieucongluan.com.vn/fpt-ra-mat-chuong-trinh-thac-si-cong-nghe-thong-tin-dinh-huong-aiot-a337635.html
  [09:55] duongdn: ai đi học ko, đáng suy ngĩ
  [16:56] duongdn: https://docs.typesafe.ai/introduction
  [16:56] duongdn: có ai chơi thử chú này chưa, có vẻ đang hot dạo này
  [14:44] phucvt: Em có xem qua thì nó dạng AI để đưa ra decision, chứ ko phải LLM như mấy thằng Claude mình dùng hiện tại.  Nên ứng dụng 

### NUS - Access Control — 30 messages
  [16:07] cuongnh: Chào tất cả mọi người, Mình vừa gửi checklist nghỉ việc của bạn PhucNH qua email, mn check mail nhé. **Deadline thực hiệ
  [16:08] cuongnh: * Chào tất cả mọi người, @room Mình vừa gửi checklist nghỉ việc của bạn PhucNH qua email, mn check mail nhé. **Deadline 
  [16:08] cuongnh: * Chào tất cả mọi người, @room  Mình vừa gửi checklist nghỉ việc của bạn PhucNH qua email, mn check mail nhé. **Deadline
  [09:51] honght: Hi all, Anh chị tranh thủ điền action vào checklist nghỉ của anh PhucNH giúp em với nhé. Em cảm ơn anh chị ạ.
  [09:22] halt: Chị done nha
  [09:22] honght: Hi anh Năm, anh Dương, anh Nhật Anh, Lan Anh, Mọi người tranh thủ điền action vào checklist nghỉ của anh PhucNH giúp  ⚠️
  [09:24] duongdn: uí ok e
  [09:24] anhttl: Em done nha
  [09:28] namtv: Quên để ý, bên Henry là Lan Anh luôn nha. Anh mới update qua, Anh Trinh xem nha
  [09:30] namtv: Mấy acc bên MyID đang để anh change ==> chuyển sang cho TienND nha
  [09:31] anhttl: dạ
  [13:53] tuantt: A done nha
  [16:48] honght: Hi all, Anh, chị nhớ done checklist của anh PhucNH giúp em nhé. Deadline thực hiện là 18h hôm nay, anh chị chú ý thực h
  [10:18] cuongnh: @room  Chào tất cả mọi người, Mình vừa gửi checklist nghỉ việc của bạn UyenVHP, TuanNTG, ThinhPVD, ThangN, TinPC qua ema
  [10:18] cuongnh: Nhận đc checklist nào thì run checklist đó nhé mn!
  [14:51] duongdn: Minh Trinh:  a có assign em các info về project bên ThangN nha
  [14:51] duongdn: * Minh Trinh:  a có assign em các info về project bên James Diamond của ThangN nha
  [14:54] minhtv: okay a
  [09:42] honght: Hi anh chị, Bạn ThinhPVD có thay đổi last day sang 15/10 (thứ Năm tuần sau), nên deadline thực hiện checklist cũng thay 
  [09:43] honght: * Hi anh chị, Bạn ThinhPVD có thay đổi last day sang 15/10 (thứ Năm tuần sau), nên deadline thực hiện checklist cũng tha
  [14:42] honght: Hi anh chị, Do các checklist đợt này khá nhiều và dài nên anh chị tranh thủ tiến hành check sớm và điền action giúp em v
  [13:52] honght: Hi all, Anh chị tranh thủ điền action vào checklist nghỉ của các bạn UyenVHP, TuanNTG, ThangN, TinPC giúp em với nh
  [14:02] anhttl: Bên anh TuanNTG có project Elena, nhưng em chưa được share file chị Hồng ơi
  [14:03] honght: okie em, chị vừa share em rồi nha
  [16:46] halt: Chị done nha
  [09:56] honght: Hi chị Thúy, anh Nhật Anh, anh Tiến, Lực,  Mọi người tranh thủ điền action vào checklist nghỉ để em có thể tiến hành làm
  [10:23] anhnvn: A done nha
  [16:52] honght: Hi all, Anh, chị nhớ done checklist của các bạn UyenVHP, TuanNTG, ThangN, TinPC giúp em nhé. Deadline thực hiện là 18h 
  [09:45] honght: Hi all, Anh chị tranh thủ điền action vào checklist nghỉ của anh ThinhPVD giúp em với nhé. Em cảm ơn anh chị.
  [09:35] halt: Chị done nha

### NUS - Bailey - Paturevision 2026 — 823 messages
  [08:58] duongdn: Dat Nguyen:  Tuan Nguyen  Tí discuss kĩ về phần đã làm thêm bên CR1 xem có phần nào mình raise lên được để charge thêm k
  [08:59] duongdn: team, thực hiện daily scrum đi
  [09:24] duongdn: Vu Tat:  ?
  [09:24] duongdn: Dat Nguyen:  Vy Nguyen ?
  [09:29] datnc: Vũ chưa vô anh, xí bạn vô tụi e sync status phát đã nha.
  [10:01] datnc: Daily update hôm nay, 2026/09/15 nha mn! VuTQ: - Hôm nay tiếp tục fix bug Redmine, ưu tiên Rails upgrade trên staging2 t
  [10:03] duongdn: - Rails upgrade còn bao nhiêu bug nữa vậy em
  [10:03] duongdn: CR staging: đã dev done , test ra bug, và đã fix hết rồi phải ko?
  [10:11] datnc: Rail upgrade: Hiện còn 5 con feedbacks - 1 pending, chờ 3rd party, 6 con deployed chờ test lại. CR staging? Nếu ý anh là
  [10:14] duongdn: Các bug feedback là sao vậy? Do làm chưa đúng hay lại lòi ra issue mới sau khi fix xong
  [10:14] datnc: Verify lại vẫn có issue hoặc nó đẻ ra vấn đề khác anh.
  [10:16] duongdn: cho a xin mấy link bug
  [10:17] datnc: Feedbacks hả anh: https://redmine.nustechnology.com/projects/bailey-paturevision/issues?issue_id=79873%2C80547%2C80566%2
  [10:17] datnc: Đây nha
  [10:19] duongdn: https://redmine.nustechnology.com/issues/80547 Con này là sao, chưa thấy dev fix đã feedback rồi?
  [10:19] datnc: Con đó như related với cái issue đang dispute với ổng trên live. Nên tạm để vậy đó anh.
  [10:20] duongdn: OK
  [10:20] duongdn: Vũ đang inprogress con nào vậy? đổi status đi
  [10:20] duongdn: Vu Tat:  thực hiện đúng action nào [thread: 1 reply]
    └ [10:22] vutq: dạ oke
  [10:56] duongdn: [PRESTASHOP] GRAZING SOFTWARE FILTERS	 [Grazing Software][CR1] Grazing Software Desktop view	 Hiện 2 task này đã hết bud
  [11:58] duongdn: Bug sao rồi Vu Tat  ?
  [11:58] duongdn: chưa thấy nhúc nhích gì, có stuck gì ko em
  [11:59] vutq: dạ vẫn ổn, em đang manual test thôi
  [09:33] duongdn: info hôm nay đâu mn
  [09:33] duongdn: 9h rồi ???
  [09:34] tuannt: Hôm nay em làm những task này: - [Prestashop] Display Relationship Between Original Orders and Split Orders - Fix bug re
  [09:38] vutq: Nay em làm những task này - [Console][Staging 1][Upgrade RDS] Product created in PrestaShop staging-sg is not synced to 
  [09:43] duongdn: ko đủ info, coi lại format a cần
  [09:44] duongdn: BTW Bug redmine nhìn qua đã hết, còn gì cho Tuấn làm nữa đâu nhỉ Dat Nguyen [thread: 1 reply]
    └ [09:45] datnc: E đang test live bên khác có tracker xí anh, tí e xem.
  [09:45] tuannt: Duong Doan: https://redmine.nustechnology.com/issues/80933 cái này  bug grazing software cần fix để release. nó liên qua
  [09:45] tuannt: Duong Doan redmine console:   https://redmine.nustechnology.com/issues/80603 https://redmine.nustechnology.com/issues/80
  [09:45] vutq: * - những task hôm qua đã làm:   - [Console][Staging 2][Upgrade Rail 6] Show error when print on Expédier page   - [Cons
  [09:46] duongdn: Tuấn làm 2 bug redmine Console trước đi
  [09:46] tuannt: ok anh
  [09:47] vutq: * - những task hôm qua đã làm:     - [Console][Staging 2][Upgrade Rail 6] Show error when print on Expédier page     - [
  [09:48] duongdn: Dat Nguyen:  Bug này, và tương tự là issue hồi t2, a cần e và Tuấn discuss xem phần nào charge được phần nào ko charge đ
  [09:50] datnc: Nó nằm trong scope desktop gốc mà nhỉ, which is overbudget. Mobile ko có cái UI element này nên cái flow này không tồn t
  [09:50] duongdn: Vy Nguyen:  Dat Nguyen  report test đâu mn,  Grazing Software Desktop: test xong chưa? Đây là task priority 1 cần go liv
  [09:58] duongdn: > Mobile ko có cái UI element này nên cái flow này không tồn tại ở mobile á. Theo e hiện nắm là vậy. Vậy là est thiếu à?
  [10:00] datnc: Est có nó đó anh, cơ mà hồi mình dev done thì Việt thiếu nó. Nhưng lúc đó thì vẫn còn dư 20-30 giờ gì đó. Fix bugs các k
  [10:00] vynl: Task ngày hôm qua: - Verify bug và regression test cho grazing software desktop: Đang còn 2 issue cần fix để release htt
  [10:00] vynl: e gửi của QC nha a Dương
  [10:01] duongdn: Dat Nguyen:  Vy Nguyen  Tuan Nguyen  Bên Grazing còn gì tồn đọng ngoài bug này ko? https://redmine.nustechnology.com/iss
  [10:02] datnc: > Verify bug và regression test cho grazing software desktop: Đang còn 2 issue cần fix để release > https://redmine.nust
  [10:05] duongdn: OK vậy tiến hành ưu tiên làm cái 2 cái này đi Tuan Nguyen , để release, làm ngày Việc bù giờ thì có thể bù cho task khác
  [10:06] duongdn: Vu Tat:  bug phần Console upgrade e nhắm khi nào fix xong hết?
  [10:06] duongdn: * ========================\ Vu Tat:  bug phần Console upgrade e nhắm khi nào fix xong hết?
  [10:07] vutq: xong rồi á anh, mấy issues được plan hôm nay không liên quan tới upgrade console
  [10:09] duongdn: OK, a thấy có 1 bug status là resolved chưa deploy, update nha --- Plan hôm nay vậy nha mn, tập trung fix bug release nh
  [10:09] duongdn: thank mn
  [10:22] duongdn: https://redmine.nustechnology.com/issues/80603
  [10:23] duongdn: Vu Tat:  e xem làm cái này đi, Tuấn cần ưu tiên Grazing [thread: 1 reply]
    └ [10:26] vutq: hm dạ oke
  [10:23] duongdn: p/s: này có nghĩa là Upgrade Rails chưa done nha, report nãy ko đúng
  [10:23] duongdn: https://redmine.nustechnology.com/issues/80547
  [10:24] duongdn: sao cái này ko deploy Vu Tat [thread: 1 reply]
    └ [10:26] vutq: done nha anh
  [13:48] duongdn: sao 2 con bug ko thấy nhúc nhích gì vậy 👀
  [13:49] tuannt: e chưa đổi status thoi dang test
  [14:39] duongdn: này sao rồi Vu Tat [thread: 7 replies]
    └ [14:40] vutq: giờ em mới clone repo Prestashop về để check nha anh, nãy em đang fix 1 bug khác
    └ [14:43] duongdn: ủa cái này thuộc về Pretashop à, vậy dừng đi, để Tuấn xử  Tuan Nguyen
    └ [14:46] duongdn: Vu Tat:  cc Dat Nguyen  Vậy giờ Vu làm phần nào?
    └ [14:46] vutq: còn 2 issue redmine bên staging1, giờ em fix nha
    └ [14:48] duongdn: cho a link
    └ [14:49] vutq: dạ đây - https://redmine.nustechnology.com/issues/80963 - https://redmine.nustechnology.com/issues/8
    └ [14:50] datnc: E còn chưa start bên mình nữa 😂 Giờ mới trở về nè.
  [14:44] duongdn: test lâu vậy :))
  [14:48] tuannt: cái này logic nó hơi nhiều case
  [14:48] tuannt: lùng bùng luôn
  [14:58] duongdn: https://redmine.nustechnology.com/issues/80603 Tuan Nguyen  theo  Vu thì cái này thuộc Pretashop issue, xong bug Grazing
  [15:22] tuannt: oke a
  [15:33] datnc: Cái Grazing Software Filter chung branch với Desktop hay riêng a Tuan Nguyen nhỉ?
  [15:36] tuannt: 98-prestashop-grazing-software-filters
  [15:36] tuannt: đúng k ?
  [15:40] tuannt: nó k chung nhánh với grazing desktop
  [15:40] tuannt: nó được tạo từ nhánh upgrade-prestashop ( hiện đang là live)
  [15:51] datnc: Thế chắc mình live nó riêng đc cơ mà mai ổng away rồi 😂 chắc để hẹn T2
  [15:58] duongdn: 4h chiều rồi, bug grazing sao rồi
  [15:58] duongdn: est là 2h mà ...
  [15:58] duongdn: thêm bug CR nữa thì cao lắm cũng hết sáng là xong rồi chứ, CR est chỉ có ~20h thôi
  [16:01] tuannt: CR thì xong rồi anh còn grazing đang còn 1 case nữa đang fix sắp xong a.
  [16:03] tuannt: nó khá nhiều case, edit map, share map, owner map, owner map đã validate lần đầu chưa....
  [17:09] datnc: Như staging2.paturevision.fr ngủm gòi mn 😂
  [08:46] tuannt: task hôm qua: [Console][Staging 2][Upgrade Rail 6][Supplier] "Something went wrong" error when creating a supplier from 
  [08:47] tuannt: * Task hôm qua: \[Console\]\[Staging 2\]\[Upgrade Rail 6\]\[Supplier\] "Something went wrong" error when creating a supp
  [08:48] tuannt: * Task hôm qua: [Console\]\[Staging 2\]\[Upgrade Rail 6\]\[Supplier\] "Something went wrong" error when creating a suppl
  [08:49] tuannt: Task hôm qua: - [Console\]\[Staging 2\]\[Upgrade Rail 6\]\[Supplier\] "Something went wrong" error when creating a suppl
  [08:49] tuannt: * ---
  [08:51] tuannt: a Duong Doan cái staging2 domain quản lý ở đâu vậy a? trong siteground hả ? e thấy source nó đang ở aws? hiện có vẻ đang
  [08:51] tuannt: a check giúp e với
  [08:51] duongdn: uhm DNS thì ở SiteGround
  [08:52] vutq: - những task hôm qua đã làm:   - [Console][Staging 1][Upgrade RDS] Product created in PrestaShop staging-sg is not synce
  [08:52] duongdn: Dat Nguyen:  Vy Nguyen  Grazing ready để cus test chưa Upgrade thì sao, a đoán là chưa, còn 1 bug liên qunan Pretashop
  [08:53] vynl: Grazing ready cus tets được rồi nha a
  [08:53] vynl: * Grazing ready cus test được rồi nha a
  [08:53] tuannt: upgrade console hiện tại Vu báo còn 2 task lien quan đến prestashop. E đang check nó nhé
  [08:58] duongdn: OK
  [08:58] duongdn: thank mn đã đạt được mục tiêu hôm qua
  [08:58] duongdn: Báo cus ngay nha
  [09:01] datnc: Để e báo, mà phải tới T2 bác mới available để test staging nha mn!
  [09:01] duongdn: Hỏi xem cus avaiable ko release luôn Dat Nguyen  Trước đó, Tuan Nguyen  xem đưa 1 version gồm code live + nó lên để smok
  [09:03] tuannt: mình k có dư cái staging nào. tất cả đều được sử dụng cho upgrade đợt này hết r anh, console , console2, grazing desktop
  [09:04] duongdn: ok, thôi pending, làm tiếp phần khac
  [09:06] datnc: Mình có dư ấy.
  [09:07] datnc: staging.paturevision.fr - Nó đang Pres 1.7 cũ chắc là dẹp nó đi đc rồi anh.
  [09:07] datnc: E đã released staging Grazing Software Desktop / Filter rồi nha mn!
  [09:11] vynl: Tasks hôm qua: - verify bug fix grazing sofware regression test grazing software desktop - Test task console - upgrade R
  [09:11] duongdn: thôi  tạm pending, nếu cái grazing bị feedback lại ko release được thì mới đưa filter lên để release trước
  [09:15] duongdn: Tuan Nguyen:  Như hôm qua có báo, scope [Grazing Software Desktop] [CR1]After clicking outside on the map (deselect bloc
  [09:16] tuannt: sang tuần được k anh? hay phải trong tuần ?
  [09:17] duongdn: được, vậy a tạm set note sẽ bù trong vòng 2 tuần
  [09:17] tuannt: ok a
  [09:20] duongdn: ===== remind mn: các phần hour of budget theo lí thuyết sẽ cần tự làm,  Tuy nhiên, hãy discuss trước với team, a hoàn to
  [09:24] duongdn: ==== Hi mn, target hôm nay là release phần upgrade Console nha  Ưu tiên các bug liên quan đến nó, fix trước, ko có ngâm
  [09:24] duongdn: Dat Nguyen:  Vy Nguyen  cho a list các bug liên quan upgrade Console nha
  [09:26] tuannt: staging2 lên r nha e Dat Nguyen
  [09:27] tuannt: bây giờ a sẽ check bug api
  [10:21] vynl: **Bugs console upgrade rails 6** https://redmine.nustechnology.com/issues/80599 https://redmine.nustechnology.com/issues
  [10:21] vynl: e gửi nha a Duong Doan
  [10:23] duongdn: tính ra bug upgrade toàn của Pretasop
  [10:23] duongdn: assign cho TuanNT đi mn, update status
  [10:23] duongdn: Còn VuTQ lo cái RDS
  [10:27] duongdn: === Hi mn Làm xong cái nào thì update status, deploy và báo lên đây luôn nha, để a monitor và QC test
  [11:42] datnc: Staging2 sync suppliers vẫn đang có vấn đề phải ko mn Vu Tat , a Tuan Nguyen ?
  [11:42] tuannt: chắc do job queue thôi
  [11:43] duongdn: ủa vụ view queue chưa làm à ...
  [11:43] datnc: Không anh nhiều cái lắm? Như đơn vị tiền tệ ko sync?
  [11:43] duongdn: btw, status sao rồi, sắp hết buổi sáng, chưa thấy ai update gì
  [11:43] datnc: Thấy có con feedback của a á?
  [11:55] datnc: https://redmine.nustechnology.com/issues/80603 Con này nè anh ơi?
  [11:56] tuannt: từ từ staging2 cũ quá
  [11:56] tuannt: modules cũ các thứ mà
  [13:26] duongdn: update status nha mb
  [14:20] tuannt: bên prestashop đã ok r nha
  [14:20] tuannt: bây giờ là bên console thôi
  [14:20] tuannt: a cũng đang check bug bên console
  [08:38] tuannt: Task hôm qua: - [Console][Staging 1][Upgrade RDS] Product created in PrestaShop staging-sg is not synced to Console - [C
  [08:41] duongdn: Dat Nguyen:  Vy Nguyen  Update Rails báo cus test được chưa hỉ
  [08:45] tuannt: rails còn 1 số bug chắc cố nay xong đó anh
  [08:47] datnc: Tụi e cần verify lại hết core flow OK thì báo ổng test luôn nha a, hôm qua supplier sync vẫn còn vấn đề thì phải.
  [08:50] duongdn: bug chưa xong thì chạy qua làm task gì upgrade Rails làm gì ???
  [08:50] duongdn: * bug chưa xong thì chạy qua làm task gì upgrade RDS làm gì ???
  [08:51] duongdn: Hay chia cho Vũ?
  [08:51] tuannt: mấy task e làm là có lien quan đến prestashop a
  [08:51] tuannt: sync data
  [08:51] tuannt: Vũ assign cho em
  [08:52] duongdn: mình có tới 2 upgrade Console lận
  [08:52] duongdn: 1 cái upgrade verison
  [08:52] duongdn: 1 cái upgrade RDS
  [08:52] duongdn: đang cần release cái upgrade version nha
  [08:52] duongdn: cái đó còn bug nào nữa Dat Nguyen
  [08:55] datnc: Hình như là dev đã deployed chiều qua rồi, để sáng nay e xem lại xem.
  [08:56] vutq: - task hôm qua:   - [Staging 1] [Console] [Commandes] Updating order status to Cancelled displays an error despite the s
  [08:59] datnc: Với staging hiện có issue liên quan tới DB, này mình cũng cần resolved nếu có thể, cho bác dễ test nha mn, vì ổng không 
  [08:42] tuannt: Task hôm thứ 6: - [Console][Staging 1][Upgrade RDS] Newly created supplier does not appear in the supplier list - [Conso
  [08:47] vutq: - task hôm thứ 6:   -[Console][Staging 1][Upgrade RDS] Shipment Reports list shows reports outside the selected date ran
  [08:48] duongdn: hi, PhucVT sẽ vào dự án mình phụ fix bug, xử lí task nha mn
  [08:49] duongdn: Tuan Nguyen:  support bạn cài giúp a
  [08:51] tuannt: https://drive.google.com/file/d/18wxnsOTxn4i4WpaH4FR9YT8vMI9jkzWp/view?usp=sharing
  [08:51] tuannt: e tải ve co ca database roi
  [08:51] tuannt: chay docker nha
  [08:53] phucvt: Cho em thông tin setup luôn nha: alias account info, repo...
  [08:59] tuannt: Console: https://github.com/paturevision/Console [thread: 4 replies]
    └ [10:16] phucvt: Tuan Nguyen:  Thằng này Docker files nó chạy trên Mac ARM bị lỗi. Em có thử fix mà chưa được. Anh gử
    └ [10:17] tuannt: ``` version: '3.4' services:   app:     build:       context: .       dockerfile: Dockerfile     dep
    └ [10:20] phucvt: Tuan Nguyen:  Dockerfile á anh. Chứ cái này y chang trên git, khác mỗi cái port của DB
    └ [10:20] tuannt: ``` FROM ubuntu:18.04 SHELL ["/bin/bash", "-c"] RUN apt-get update RUN apt-get install gnupg2 -y RUN
  [08:59] tuannt: nusnick <nick@nustechnology.com>
  [09:08] tuannt: SQL console: https://drive.google.com/drive/u/0/folders/1szbEZC3QW7I-K2ArIoAQnUNm9SZ7MxS8
  [09:09] tuannt: * Prestashop site:  Branch production: upgrade-prestashop Branch staging2: upgrade-prestashop-staging2 Branch staging-sg
  [10:13] phucvt: Cái Prestashop site là repo này đúng ko anh? https://github.com/paturevision/PrestashopModule
  [10:13] phucvt: Tuan Nguyen:
  [10:14] tuannt: git@github.com:paturevision/PrestashopModule.git
  [10:15] tuannt: u e
  [13:53] duongdn: Dat Nguyen:  sắp xếp giới thiệu overview project cho Phuc Vo  nha
  [13:55] datnc: Vâng anh, bạn làm bên Prestashop không thôi hay hai bên luôn anh?
  [13:55] duongdn: cả hai luôn, theo lí thuyết bạn sẽ làm cả hai
  [13:59] duongdn: done báo a nha
  [14:13] duongdn: có bug urgent mn , Bailey kêu
  [14:13] duongdn: app rụng rồi
  [14:15] duongdn: Check Slack
  [14:21] datnc: :"|...
  [14:23] datnc: Bên em vào không đc Console Live đó a Tuan Nguyen , Vu Tat , check hộ e với.
  [14:23] tuannt: ừm de a check
  [14:23] duongdn: coi kĩ lí do tại sao nha
  [14:23] duongdn: mà fix tạm đã
  [14:24] vutq: em ssh lên LIVE không được luôn á anh Duong Doan, luôn timeout 4 packets transmitted, 0 received, 100% packet loss, time
  [14:25] duongdn: chắc server banh rồi
  [14:25] duongdn: lên AWS force restart
  [14:26] tuannt: Screenshot 2026-09-21 at 14.26.46.png
  [14:29] duongdn: force restart đi, bấm restart, 1 hồi sau là force được
  [14:29] duongdn: rồi sẽ ssh vào được
  [14:29] tuannt: e dang docker compose up r nha
  [14:29] duongdn: ok ngon
  [14:31] tuannt: console work lai r nha
  [14:32] tuannt: Dat Nguyen: e check qua 1 vòng thử
  [14:32] tuannt: xem ok chưa r a báo ổng
  [14:35] datnc: Nó bị sao vậy anh?
  [14:35] tuannt: k rõ chưa check em a phải force restart
  [14:35] tuannt: để monitor
  [14:37] duongdn: ko, tìm đi, ko monitor
  [14:37] duongdn: monitor là theo dõi xem có bị nữa hay ko á (chắc dùng sai từ)
  [14:48] tuannt: e check log system trên aws thì k thấy báo lỗi do max limit gì
  [14:50] tuannt: docker tắt là do lệnh force restart của mình  Sep 21 07:27:23 ip-172-31-28-245 systemd-logind[811]: Power key pressed. S
  [14:50] tuannt: i-097f6eee5762c82f3.log
  [14:51] tuannt: system log file
  [14:55] datnc: E thấy order ko sync đc từ Pres sang.
  [14:55] datnc: Nghe ổng bảo là siteground down -> đổi IP của mình hay gì đấy?
  [14:56] datnc: > by the way, the paturevision website was down during a couple hours last friday and it was because siteground had issu
  [14:56] datnc: Liên quan gì không mn?
  [14:56] datnc: * E thấy order ko sync đc từ Pres sang a Tuan Nguyen
  [15:02] datnc: Sao rồi a Tuan Nguyen ?
  [15:03] datnc: À e thấy nó mới sang rồi :"|.
  [15:04] tuannt: a dang check log va thay nó dang chạy lại r
  [15:04] tuannt: Screenshot 2026-09-21 at 15.04.34.png
  [15:05] datnc: Screenshot 2026-09-21 150429.png
  [15:05] datnc: Bên Pres có một mớ Order rỗng không có cart nè anh.
  [15:05] tuannt: bth nó thế nào
  [15:05] tuannt: chưa rõ lúc đầu nó thế nào
  [15:07] datnc: Nó có cái cart chứ sao anh...
  [15:07] datnc: Để e qua.
  [15:51] duongdn: ==== Mấy bug upgrade xong hết chưa mn
  [15:52] datnc: Done nha anh.
  [15:57] tuannt: Duong Doan: e check thi  Sep 19 18:08:43 ip-172-31-28-245 kernel: Out of memory: Killed process 4793 (ruby) total-vm:221
  [15:59] tuannt: task_memcg=/docker/6990d6b0349e2debbebab810b78abd66aaa6f55484f1dfe14812f134b00abc5a,task=ruby,pid=4793,uid=0 Out of memo
  [15:59] tuannt: do thang wms-nov_sidekiq
  [16:00] tuannt: vậy là do job trong Sidekiq làm lỗi
  [16:00] tuannt: Dat Nguyen:
  [16:00] tuannt: a nghĩ 1 phần có thể do bên prestashop sync data lỗi nên làm console retry liên tục
  [16:03] duongdn: ok, tìm tiếp vấn đề gì xảy ra thời gian đó, hình như mình có cái log queue, nhìn vào sẽ biết có queue job nào nặng
  [16:04] duongdn: mục tiêu là fix để nó ko xảy ra nữa, chứ ko phải report cho vui đâu
  [16:26] datnc: Grazing có feedback nha Trinh Mai E check hộ anh.
  [16:27] trinhmtt: dạ để em coi
  [16:27] datnc: A có đang fix data khum vậy a Tuan Nguyen ơi?
  [16:27] tuannt: chua đụng gì vô live nha
  [16:27] tuannt: :)
  [16:30] datnc: A fix data đi anh ơi.... cái đó gấp hơn nha anh, ảnh hưởng tới end-user.
  [16:34] tuannt: có script r
  [16:34] tuannt: đang tải db về để test đã
  [16:34] datnc: Nhớ list lại cho em orders nào anh update, để e manual review lại sau.
  [16:34] tuannt: ai dám chạy live ngay
  [16:35] tuannt: ừ có list order id chỉ chạy những order đó thoi
  [17:20] datnc: Gòi sao rồi anh Tuan Nguyen ?
  [17:20] datnc: Anh report progress checking của anh lên cho bác nắm với :"|.
  [17:25] tuannt: chưa db live 4gb lận dump chưa xong nữa
  [17:34] datnc: Nhớ report progress nha anh ơi...
  [17:34] tuannt: ừm
  [17:38] tuannt: ủa em về chưa
  [08:53] vutq: - task hôm qua:   - [Console][Staging 1][Upgrade RDS] Adding a new picking entry does not accumulate quantity into the e
  [08:55] tuannt: Task Hôm qua: [Console][Staging 1][Upgrade RDS] Newly created supplier does not appear in the supplier list [Console][St
  [08:57] duongdn: ==== A hơi bất ngờ về phần upgrade RDS lại sinh ra nhiều bug vậy, root cause tụi nó là gì vậy ???
  [09:00] vutq: đa phần là ID record mismatch giữa Prestashop và Console nha anh, em nhờ anh Tuấn tăng ID bên phía Prestashop lên fix cũ
  [09:01] duongdn: ngoài ra là các bug nào? Sao lúc trước ko thấy, hay là thực ra nó đã có từ trước mà lâu nay ko nhận ra
  [09:03] vutq: dạ cũng có 1-2 bug có sẵn, kiểu feature không ai đụng tới nên không bị phát hiện
  [09:13] datnc: Nào vụ cíu data done hú e nha a Tuan Nguyen .
  [09:14] tuannt: oke e
  [09:17] duongdn: Dat Nguyen:  sao em để charge task e hôm qua vây
  [09:17] duongdn: Phuc Vo:  viết task log
  [09:18] datnc: Ws hả anh? E mới log vô thôi, thường t6 hoặc T7 e mới review giờ charged á.
  [09:18] datnc: E sửa rồi đó.
  [09:24] duongdn: review gì chài, giờ của e mà ... :v
  [09:25] duongdn: task cảu Tuấn hôm qua chưa có tag, phù hợp ko? vậy khó quản lí đấy
  [09:27] datnc: E có add tags vào gòi ấy. Qua e có tạo bên sheet cũ để manage rồi nhưng chưa có tạo bên ws...
  [09:39] duongdn: OK
  [10:18] duongdn: ==== Có update gì về sự cố app down hôm t6 ko mn ?
  [10:18] duongdn: a cần thông tin
  [10:28] tuannt: https://paturevision.fr/fix_orders.php Dat Nguyen e check nha. có gi xong a xóa [thread: 6 replies]
    └ [10:53] datnc: A query hộ em trong mấy order này, các order nào có cart chung product, và của chung client ko anh?
    └ [10:53] datnc: Ngoài thằng 40161 & 40162? A Tuan Nguyen .
    └ [10:54] datnc: Để e report bác. Vì case này e nghi là end-user họ tạo lại order nên để bên ổng lv với end-user thui
    └ [11:45] tuannt: ngày 19 lỗi thì chỉ có mấy cái đó em
    └ [11:46] tuannt: nên xử mấy thằng 19 trước.
    └ [13:39] tuannt: Dat Nguyen:
  [10:30] tuannt: theo em check thì Duong Doan . A xem sao nhé  [Đơn hàng 40152 & 40164]          │          ▼ [Vòng lặp CreateOrderComple
  [10:43] duongdn: > [Đơn hàng 40152 & 40164] - Chưa chắc cái này là cái đúng gây lỗi, nếu nó nhỏ - Có sản phẩm bị circle reference ko ? =>
  [10:44] duongdn: > [Vòng lặp CreateOrderCompletionJob spam liên tục giữa PrestaShop & Rails] Sao lại có chuyện này
  [10:44] duongdn: theo lí thuyết ko nên có chuyện spam nhiều queue record cho 1 order
  [10:50] duongdn: > [Worker PrestaShop bị quá tải -> Queue PrestaShop sập (Dead)] Chưa rõ, chờ cái trên
  [10:52] duongdn: > [Rails Sidekiq gửi request đồng bộ sang PrestaShop bị treo/timeout -> Tích lũy job retry] ???
  [10:52] duongdn: > [Các job nặng (UpdateSaleAnalyticCacheJob) ùa vào cùng queue :default] Solution: move qua server khác cái queue, tránh
  [10:52] duongdn: Micro services
  [10:53] duongdn: ===== Tại sao redis chết thì Pretashop lại chết ?
  [10:53] duongdn: Bug nặng
  [10:53] duongdn: theo lí thuyết:  trước h ko có COnsole, Pretashop vẫn chạy
  [10:55] duongdn: ==== nguyên nhân cách giải quyết preventive action: sau này làm sao tránh các issue tương tự, hoặc monitor thế nào ===
  [10:58] duongdn: ==================== Dat Nguyen  Tuan Nguyen  Storage của Siteground đã lên 78%, cần giảm xuống dưới 70%, tìm cái gì nặn [thread: 2 replies]
    └ [11:04] datnc: https://redmine.nustechnology.com/issues/81077 A Tuan Nguyen
    └ [11:10] tuannt: ok e
  [10:58] duongdn: note lại issue, ko để nó trôi
  [11:05] datnc: Check trong thread hộ em với a Tuan Nguyen .
  [11:44] datnc: Sao rồi anh Tuan Nguyen ơi?
  [11:45] tuannt: a thấy gì đâu ??
  [11:45] datnc: > >A query hộ em trong mấy order này, các order nào có cart chung product, và của chung client ko anh? > Ngoài thằng 401
  [13:34] datnc: A Tuan Nguyen ơi?
  [13:39] tuannt: ủa a rep r mà ?
  [13:41] datnc: Ý là a check hộ em, có client nào tạo nhiều orders giống nhau (Trong mấy cái bị lỗi anh fix ấy) Những order: - Có cart g
  [13:42] datnc: Chứ khum phải là tìm ra thêm nhưng order nào nữa 🥲
  [13:42] datnc: Thôi để e tìm bằng mắt, ổng có hỏi rồi.
  [13:46] tuannt: user 3370: có 4 đơn 40154, 40155, 40158, 40159
  [13:46] tuannt: Dat Nguyen: e check xem
  [14:59] tuannt: Duong Doan:
  [14:59] tuannt: Cái StockManager.php
  [14:59] tuannt: có sửa queue trong đó
  [14:59] tuannt: file này file core này
  [14:59] tuannt: * có sửa thêm queue trong đó
  [15:00] tuannt: vì queue lỗi nên cart lỗi k update được
  [15:00] tuannt: * Cái StockManager.php trong prestashop
  [15:00] duongdn: ok, nhưng sao giờ mới lỗi, nó fix khi nào
  [15:01] duongdn: hay chỉ có 1 case nào đó làm nó lỗi
  [15:01] tuannt: e đang check 1 case làm nó lỗi gây ra k update đươc cart
  [15:01] tuannt: còn nguyên nhân k update đc cart là do e nói ở trên
  [15:01] tuannt: cái này có thể cho vào try catch fix queue dc
  [15:01] tuannt: 1 nguyên nhân
  [15:14] tuannt: như e check log queue và production log thì thấy lỗi  [critical] (Job{default} | ID: b60385507409e64afa5e6420d8f2e1d4 | 
  [15:16] duongdn: cứ móc cho hết ra bug đi nhớ vụ server queue
  [15:16] tuannt: server queue => ý anh là move qua server khác ?hay sao
  [15:19] duongdn: uhm
  [15:19] duongdn: move queue qua server khác
  [15:19] duongdn: tránh làm break app chính
  [15:19] tuannt: mà e thấy db queue k có reset gì nha
  [15:19] duongdn: có đọc msg ko vậy
  [15:19] tuannt: trong db e check ra có nhiều
  [15:20] tuannt: cái này thì đúng mình cần làm mà e k hiểu cái a nói server queue ấy nên confirm lại
  [15:21] datnc: Data ok rồi nha mn, bác có cám ơn. A Tuan Nguyen  check root cause và tìm solution xong nhớ report ổng tiếng nha!
  [15:32] tuannt: Duong Doan: theo e hiểu nha. [critical] (Job{default} | ID: b60385507409e64afa5e6420d8f2e1d4 | SendProductToConsoleJob |
  [15:33] tuannt: và giai pháp e nha bên prestashop :  thêm try catch check queue để queue lỗi k ảnh hưởng đến order prestashop
  [15:33] tuannt: còn bên console e sẽ cũng check try catch check productID khi sync data tránh lỗi
  [15:33] tuannt: và move server queue qua 1 server mứoi
  [15:33] tuannt: mới
  [15:33] tuannt: a thấy ổn chứ?
  [15:36] duongdn: try catch là giải pháp tạm thời, nhưng root cause vẫn phải xử lí và cần đánh giá kĩ nếu try catch thì anh hưởng gì , ví 
  [15:37] tuannt: product null cái này có khi cần check theo dõi và check cái thằng module svfastpick
  [15:41] tuannt: Screenshot 2026-09-22 at 15.41.13.png
  [15:41] tuannt: đây nha a
  [15:42] tuannt: khi import_product_id nó lấy trường hợp else đang lấy 'VA' . $variant_id; và khi truyền qua console productId nó k lấy t
  [15:42] tuannt: e check trong module spvfastpick
  [15:44] tuannt: Dat Nguyen: cái đơn hàng có ký hiệu VA nó là gì đó em
  [15:44] tuannt: nó khác gì với product thường ?
  [15:44] tuannt: variant nó the nào ?
  [15:47] tuannt: * khi sync data prestashop nó k nhận giá trị text nên đẩy ra Null
  [15:47] datnc: Nó là product variant, tức 1 product cha có nhiều variant (product con).
  [15:49] duongdn: ko phải con, nó gọi là biến thề
  [15:49] duongdn: cha con là pack
  [15:50] datnc: Nó gửi qua Console là cha con đó anh, e nhớ là vậy còn ở Prestashop thì nó chung 1 productID thôi.
  [15:51] tuannt: e thử tạo giúp a 1 product vadiant xem nó có sync qua k ?
  [15:51] tuannt: trên product thử ấy
  [15:51] tuannt: r xóa cũng dc
  [15:51] datnc: Env nào anh?
  [15:52] tuannt: production site
  [15:52] tuannt: nếu nó log nỗi null thì đúng là do k truyền text qua đc
  [15:53] tuannt: thì a sẽ revert nó qua dạng ID bth để sync được
  [15:59] datnc: 3523
  [15:59] datnc: Product này nha a Tuấn, có 2 variant.
  [16:00] tuannt: ok
  [16:03] tuannt: dung là lỗi nha
  [16:03] tuannt: : include('\/home\/customer\/...')","#10 {main}"],"worker":"c119223.sgvps.net:10353:check,priority,default","queue":"def
  [16:03] tuannt: vậy tìm ra nguyên nhân lỗi cái này r đấy
  [16:04] duongdn: ngon lành
  [16:04] duongdn: report đi mn, cuối ngày rồi
  [16:05] tuannt: ok anh
  [08:44] tuannt: Task hôm qua: - [Console][Staging 1 + Staging 2][Upgrade] Newly created supplier does not appear in the supplier list - 
  [08:46] duongdn: mấy task upgrade done chưa mn ?
  [08:52] duongdn: [Maintenance][SiteGround] Storage usage at 78% — investigate and reduce below 70% Check issue & fix bug production
  [08:52] duongdn: Tuan Nguyen:  ko gộp 2 issue vô 1 được, tách ra
  [09:03] tuannt: ok a
  [09:22] vutq: - task hôm qua:   - [Console][Staging 1][Upgrade RDS] "Something went wrong" when clicking to modify / split purchase or
  [09:35] datnc: https://redmine.nustechnology.com/projects/bailey-paturevision/issues?issue_id=80564%2C80599&set_filter=1&status_id=%2A 
  [09:35] tuannt: ưu tiên hả ?
  [09:36] tuannt: [Console][Staging 2][Upgrade Rail 6][Sync Product] Product created in PrestaShop is not synced to Console thì xong r
  [09:39] datnc: Nếu anh chưa coi thử coi thử nha, do em plan nếu mọi thứ ổn thì release staging2 hum nay hoặc mai cho ổng test luôn, để 
  [09:40] tuannt: ok
  [14:11] tuannt: Duong Doan: a gửi e lại cái link check % Disk Usage với. e tìm k thấy
  [14:18] duongdn: https://my.siteground.com/services/hosting/S0EvemEzME0=/statistics
  [14:19] tuannt: a login account nào á
  [14:19] tuannt: account nick có vẻ k có
  [14:19] tuannt: Screenshot 2026-09-23 at 14.19.43.png
  [14:55] datnc: https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1790148369644489
  [14:55] datnc: Bác có hỏi nha a Tuan Nguyen .
  [14:55] tuannt: cái này a Dương tra lời chứ a k biet cái này
  [14:58] duongdn: bug ko est được nha server thì setup khoảng 4h
  [14:59] tuannt: bug thì xong rồi. đang test thôi.
  [15:47] duongdn: Tuan Nguyen:  coi ưu tiên fix bug Grazing để go live nha
  [15:47] duongdn: nghe nói còn 1 , 2 bug nho nhỏ nữa thôi
  [15:47] tuannt: ok a e đang fix grazing đây
  [15:48] duongdn: OK, nhưng hơi sai quy trình nha, như bữa a nói, Grazing là task fix cost, hết budget rồi
  [15:48] duongdn: bug Grazing cần bao nhiêu effort nữa?
  [15:50] trinhmtt: image.png
  [15:50] trinhmtt: cần update chỗ này thành 2 field có sẵn roi ạ
  [15:50] tuannt: khoan
  [15:50] tuannt: cái này đang là bug grazing desktop ?
  [15:50] tuannt: ưu tiên đúng k ?
  [15:50] trinhmtt: với thêm cái text đơn vị cho cái total surface
  [15:51] trinhmtt: dạ đúng
  [15:51] trinhmtt: anh xem effort nhiu nha anh
  [15:51] trinhmtt: image.png
  [15:52] tuannt: sao a k hiểu gì vậy ??
  [15:52] tuannt: cụ thể cần fix gì
  [15:52] trinhmtt: để em qua nói cho anh
  [15:52] tuannt: e log redmine đi
  [15:53] duongdn: est trước nha, đừng fix liền , a xem nhiều ko
  [16:02] tuannt: cái này chắc 30 -40p nha a
  [16:02] tuannt: để e quét qua xem the nào
  [16:07] duongdn: a approve nha, e fix bug Grazing đi, cho e luôn hết hôm nay ,  hơn 1h để fix, Dat Nguyen  cố gắng test xong feedback hôm
  [16:08] trinhmtt: khoan nha ạ, em còn discuss vs ổng một xíu về field Cover, nên anh làm cái ha vs cái Available trước nha Tuan Nguyen
  [16:09] tuannt: :))
  [16:09] tuannt: ok e
  [16:46] tuannt: Dat Nguyen:  Vy Nguyen test giúp nhé
  [16:47] tuannt: https://redmine.nustechnology.com/issues/81105
  [16:47] tuannt: https://redmine.nustechnology.com/issues/81104
  [17:18] trinhmtt: https://redmine.nustechnology.com/issues/81105?issue_count=159&issue_position=43&next_issue_id=81104&prev_issue_id=80989
  [17:18] trinhmtt: * https://redmine.nustechnology.com/issues/81105?issue\_count=159&issue\_position=43&next\_issue\_id=81104&prev\_issue\_
  [17:19] trinhmtt: nó vẫn là công thức ban đầu đưa nhưng k hiểu sao nó đang sai á anh
  [17:21] tuannt: a thấy cover mới đổi công thức mới
  [17:25] tuannt: Vy Nguyen: update lại công thức cover mới r nha
  [17:25] tuannt: check giúp nhé
  [08:49] tuannt: task hôm qua: - [Grazing Software Desktop] Update Cover & Available field - [Grazing Software Desktop] Add "ha" to total
  [08:50] vutq: - task hôm qua:   - [Console] [Rail 6] Clicking "Product" button on supplier detail page does not filter products by sup
  [08:56] duongdn: Có vụ move server queue á, VuTQ có thể làm
  [09:44] datnc: Hi Nam Nguyen ! check thử con bug này hộ anh nha: https://redmine.nustechnology.com/issues/81110 [thread: 2 replies]
    └ [10:58] datnc: https://redmine.nustechnology.com/issues/81116
    └ [10:58] datnc: Nữa nha e.
  [16:04] tuannt: a Duong Doan  ơi cái bên Grazing có phát sinh thêm là sửa luôn phần top bar cho giống công thức mới
  [16:04] tuannt: est: 15 - 30p
  [16:04] tuannt: e làm luôn nhé!
  [16:05] duongdn: công thức mới ?
  [16:05] tuannt: đúng rồi 2 task BA báo hôm quá
  [16:05] tuannt: hôm qua
  [16:05] duongdn: này nghe giống CR hơn chứ
  [16:05] tuannt: sửa sidebar thôi
  [16:05] duongdn: có vẻ do lâu quá chưa release, rồi nó đổi sidebar
  [16:05] duongdn: nên giờ phải đổi theo
  [16:06] duongdn: Dat Nguyen:  xem nc với ổng làm cái CR nha, nếu đúng
  [16:07] tuannt: vậy sửa luôn k anh Duong Doan
  [16:07] duongdn: cũng ít, thôi làm đi, nhưng Dat Nguyen vẫn nc để charge nha
  [16:07] tuannt: ok a
  [16:17] duongdn: Vu Tat:  action chưa?
  [16:17] duongdn: nhớ đọc kĩ msg Slack
  [16:19] vutq: dạ chưa, nguyên ngày hôm nay em setup cái server test cho Kunal, chưa xong nữa - mai em qua lại Bailey
  [16:20] duongdn: ok  team discuss priority để release nha , server có thể pending
  [16:26] datnc: > https://redmine.nustechnology.com/issues/80989 Resolve con này sớm nha mn, để mình còn release nè.
  [08:39] tuannt: Task hôm qua: [Console][Staging 1 + Staging 2][Upgrade] Newly created supplier does not appear in the supplier list [Gra
  [08:39] tuannt: Dat Nguyen: có gì gửi a list a check nhé [thread: 5 replies]
    └ [09:16] datnc: - https://redmine.nustechnology.com/issues/81121 - https://redmine.nustechnology.com/issues/81063 - 
    └ [09:17] datnc: A check thử nha a Tuan Nguyen .
    └ [10:39] vynl: image.png
    └ [10:40] vynl: lên redmine filter theo category "console-upgrade RDS" nha a Tuan Nguyen
    └ [10:41] tuannt: ok miss ạ. k thấy thông báo
  [08:53] duongdn: Tuan Nguyen:  task log sai ngày, sửa lại em
  [09:06] tuannt: da a
  [09:17] datnc: * -https://redmine.nustechnology.com/issues/81121 -https://redmine.nustechnology.com/issues/81063 -https://redmine.nuste
  [10:10] duongdn: tập trung fix bug release nha mn
  [10:10] duongdn: lâu lắm rồi cus chưa trả tiền cho mình có bug fix ngay, dí ông test liên tục
  [15:41] vutq: ở server mới em setup cái Redis container + inbound rules này nọ trong AWS hết rồi, nhưng mà còn mấy bước cuối như: - tr
  [15:42] vutq: * ở server mới em setup cái Redis container + inbound rules này nọ trong AWS hết rồi, nhưng mà còn mấy bước cuối như: - 
  [15:42] duongdn: oh
  [15:43] datnc: Sáng T2 cho an toàn nha mn, giờ cũng đang là giờ lv ở bển rồi á!
  [08:28] tuannt: Task thứ 6 tuần trước: - Update redmine fixes to staging-v2 - Setup redis server Task hôm nay: - Update redmine fixes to
  [08:41] vutq: 
  [08:45] vutq: - Task thứ 6 tuần trước:   - Setup new server for Redis   - [101][Console][Staging 1][Advanced Split Order]"Something we
  [10:34] datnc: image.png
  [10:35] datnc: Như Console Live ngủm rồi mn :|...
  [10:35] tuannt: ?? đang setup mà má
  [10:35] tuannt: restart chứ
  [10:35] datnc: Ủa em tưởng xong rồi :")), anh bảo e đi test mà.
  [10:35] tuannt: Test thử đi em
  [10:35] tuannt: mới restart lại
  [10:35] tuannt: phải để nó có time load chớ
  [10:35] tuannt: =)))
  [10:48] datnc: image.png
  [10:48] datnc: Chưa gì em thấy nó ngủm real gòi í.
  [10:48] tuannt: de a check
  [10:50] datnc: https://paturevision.fr/admin123/sell/orders/40277/view
  [10:51] datnc: Nó tạo ra cái order lỗi ko có cart đó, a fix lẹ nha ko kịp thì revert để end-users còn dùng nữa :"|.
  [10:52] tuannt: báo khách là có khoảng stop chưa đó ?
  [10:54] datnc: Hả e có báo là anh đã start thui? Còn bth mình loy trong sáng của mình là trc 5AM bên ổng nên ks á, sau đó mà vẫn chưa o
  [16:05] trinhmtt: https://redmine.nustechnology.com/issues/81172 Tuan Nguyen GS có feedback con này ạ, anh xem est giúp em với
  [16:22] tuannt: 15 -30p e
  [16:22] tuannt: a đọc thì cũng đơn giản
  [16:24] trinhmtt: Duong Doan: v fix cho bác luon đc hong anh ơi
  [16:25] duongdn: OK
  [16:35] trinhmtt: Tuan Nguyen: v anh fix song bao QC test lai giup em nha anh
  [16:41] tuannt: ok e
  [08:45] tuannt: Task hôm qua: - Update redmine fixes to staging-v2 - Setup redis server - [Grazing Software Desktop] Hide "Grazing softw
  [08:47] vutq: - task hôm qua:   - [103][Console][Historical Purchase Order]- Gross Purchase Price Adjustment field still visible after
  [09:20] datnc: image.png [thread: 2 replies]
    └ [09:21] datnc: Ở Console Staging2 sao em tạo sup bên Console nó báo như này ha mn? Tuan Nguyen , Vu Tat ?
    └ [09:26] tuannt: ok de check
  [09:42] datnc: https://staging2.paturevision.fr/admin123/sell/catalog/products/3162/edit Sao em không sync được cái product này sang Co
  [09:44] tuannt: cái này chưa config lại redis mới mà
  [09:44] tuannt: prestashop đang sync bằng redis domain mới
  [09:44] tuannt: tí trỏ về thử
  [09:45] datnc: A setup staging luôn đi anh :"|... để còn release nữa.
  [09:45] tuannt: ừm hôm qua mới prod thoi
  [10:16] duongdn: bên Pretashop còn bug ko mn
  [10:17] duongdn: hay giờ chỉ còn Console thôi ?
  [10:18] datnc: Nam Nguyen Ngó con này hộ anh với. https://redmine.nustechnology.com/issues/81180 Crashed app nhan em. [thread: 1 reply]
    └ [13:36] namnn: done
  [10:21] duongdn: Hú
  [10:23] datnc: Theo em biết hiện là không, trừ mấy con low ko ưu tiên của Grazing anh 🤔.
  [10:24] datnc: Grazing thấy như bác có noted cái CR gì đó Trinh Mai cái này em có xem chưa vại?
  [10:24] duongdn: OK nha
  [10:31] duongdn: Chiều Tuan Nguyen  off, có gì dang dở transfer cho Vu Tat  làm tiếp nha
  [10:32] tuannt: ok a
  [10:34] trinhmtt: em đang ngó nó nha
  [08:53] tuannt: Task hôm qua: - [Prestashop] Display Relationship Between Original Orders and Split Orders - Fix staging2 redis server  
  [09:28] datnc: A Tuan Nguyen coi thử để live cái Grazing mình cần làm gì không anh ơi?
  [09:29] tuannt: ừ để a coi
  [09:31] vutq: - task hôm qua:   - [104][Console][Use Average Purchase Price When Adding Stock Manually] On product edit page, adding q
  [09:31] datnc: Coi rồi mình live Grazing hôm nay luôn nha. cc: Trinh Mai .
  [09:32] datnc: * Coi rồi mình live Grazing hôm nay luôn nha a Tuấn cc: Trinh Mai .
  [10:27] tuannt: Dat Nguyen: deploy luon hay sao ?
  [10:28] tuannt: e báo ổng đi r deploy
  [10:35] datnc: Lên đi anh ơi.
  [10:35] datnc: Sớm trước khi có end-users ngoi lên dùng app.
  [10:39] tuannt: r deploy len r á
  [10:39] tuannt: chạy script t
  [10:39] tuannt: r
  [11:03] tuannt: Dat Nguyen có gì check nha e
  [11:03] datnc: Okie thanks anh Tuan Nguyen !
  [11:33] datnc: Em chưa thấy cái Grazing Filter live nha a Tuan Nguyen .
  [11:33] datnc: Lên luôn anh.
  [11:33] tuannt: ừ để check nhánh r deploy
  [11:40] tuannt: Dat Nguyen: a deploy xong cái grzing filter r nha
  [13:39] datnc: Sao em vẫn chưa thấy nó ta...
  [13:39] datnc: https://paturevision.fr/admin123/index.php/sell/customers/
  [13:39] datnc: A ngó thử xem a Tuấn?
  [14:22] datnc: https://redmine.nustechnology.com/issues/81207 Em thấy có issue nhỏ này bên Grazing Software Filter nha mn, a Tuan Nguye
  [14:22] duongdn: múc nhanh đi live mà
  [14:48] datnc: A Tuan Nguyen ẩn cái item Grazing Desktop trên Live đc hum anh = css thui để end-user khỏi dùng á?
  [14:48] datnc: Mai ổng mới test đc.
  [14:48] tuannt: =))))
  [14:48] datnc: =)).
  [14:49] tuannt: tí ẩn
  [16:45] datnc: Anh Tuan Nguyen ẩn cái menu ở user dashboard đi nhan anh! Ko quên đó.
  [16:45] datnc: `/mon-compte`
  [16:45] tuannt: a ẩn r mà
  [16:45] tuannt: e check xem
  [16:46] datnc: Ụa... bên em vẫn thấy mà...
  [16:46] datnc: Cần clear cache prestashop ko?
  [16:46] tuannt: chắc cần
  [16:46] tuannt: để a check r clear
  [16:47] duongdn: clear sitegrond cache đi
  [16:47] duongdn: nó có cdn đó
  [16:51] tuannt: r á Dat Nguyen
  [08:50] tuannt: Task hôm qua: - Deploy Grazing software desktop production - Deploy Grazing filter production - [Grazing software] Priva
  [08:51] vutq: - task hôm qua:   - [103][Console][Historical Purchase Order]- "Historical Purchase Price" permission default value is "
  [10:12] datnc: A fix cái redis trên staging-sg chưa a Tuan Nguyen ơi?
  [10:13] tuannt: roi ma em a thay sync qua dc r ma nhi
  [10:13] vynl: image.png
  [10:13] vynl: staging-sg thấy vẫn không tạo order được á
  [10:18] tuannt: day dau phai loi sync data
  [10:18] tuannt: de check xem
  [10:32] vynl: * staging-sg thấy không tạo order được á
  [10:32] tuannt: Vy Nguyen: thử lại xem sao [thread: 1 reply]
    └ [10:46] vynl: Được rùi nha a 🙌
  [13:31] tuannt: A Duong Doan  ơi, bên này hết task roài đợi test với release nữa thoai
  [13:33] duongdn: ko còn task gì để làm cho cà VuTQ luôn à
  [13:34] duongdn: Vu Tat:  ?
  [13:34] vutq: em còn 1 cái redmine nữa là hết
  [13:35] duongdn: OK e
  [13:38] tuannt: Vu Tat: a có merge phan a fix vào nhung lỗi conflict
  [13:38] tuannt: với 104
  [13:38] tuannt: a có sửa r
  [13:38] tuannt: nhưng mà e check qua xem có đụng gì tới cái e fix k nhé
  [13:38] vutq: oke anh
  [13:38] tuannt: nhánh staging đó
  [13:39] datnc: https://staging2.paturevision.fr/admin123/sell/catalog/suppliers/ Sao em mới tạo supplier từ Console Staging2 (	NUS Tech
  [13:40] tuannt: để a qua e xem
  [15:19] vynl: Có bug scope mới tiếp rồi nha Tuan Nguyen Vu Tat , check redmine nha
  [08:44] tuannt: Task hôm qua: - [Console][Staging 1 + Staging 2][Upgrade] Newly created supplier does not appear in the supplier list ( 
  [09:44] duongdn: Tuan Nguyen:  theo như monitor thì storage của LIVE vẫn chưa quay lại 70% nha, cần improve thêm
  [09:44] duongdn: này làm trước khi fix bug nha
  [14:37] tuannt: cái này a xem giúp e a đang xem bằng account nào vậy a? e thử login siteground bằng nick mà k thấy xem được storage
  [15:13] duongdn: cứ improve đi đã
  [08:36] tuannt: Task hôm thứ 6 tuần trước -[101][Console][Staging 1][Advanced Split Order]- UI Does Not Match Approved Design Mockup - [
  [08:53] duongdn: can we clean up and delete any old prestashop staging ? We won't be needing them anymore I think, we only need one stagi
  [08:53] duongdn: trả lời câu hỏi này cho cus nha mn
  [08:57] tuannt: ok a
  [08:58] tuannt: Dat Nguyen: e xem xóa dc k nha. xóa dc thì báo ổng xóa cái nào r a tiến hành nha
  [09:04] datnc: Cái staging.paturevision.fr mình đang ko xài đó anh. Xóa đc nha.
  [09:04] datnc: Mà xóa xong chắc mình trỏ staging-sg-.paturevision.fr -> staging.patrevision.fr Nhỉ?
  [09:06] tuannt: là sao? staging.paturevision xóa r thì sử dụng staging-sg là dc rồi
  [09:08] tuannt: live thì đang xài source folder paturevision.fr và pre9.paturevision.fr
  [09:08] tuannt: hiện tại đang sử dụng pre9.paturevision.fr
  [09:09] tuannt: có thể xem xét xóa paturevision.fr nhưng cái này cần review kĩ có thể backup ở đau đó trước
  [09:10] duongdn: live tạm đừng đụng, hồi trước ổng cũng trỏ từ paturevision qua update.paturevision chử ko xóa, xóa dễ đi lắm nha
  [09:11] tuannt: ok a live cứ để đó
  [09:18] datnc: Em ko rõ nha, cơ mà ý em là swap staging-sg về lại staging để cho nó streamlined ấy.
  [09:22] tuannt: đổi lại setup lại sync data :)) nên để staging-sg đi cho dễ
  [10:01] datnc: [CONSOLE] USE AVERAGE PURCHASE PRICE WHEN ADDING STOCK MANUALLY [CONSOLE] HISTORICAL PURCHASE ORDER 2 con này đã overbud
  [10:02] tuannt: ok
  [10:04] duongdn: question: này vấn đề về est thiếu, hay do peroformance có vấn đề, có thể tách ra 1 phần thành CR mới ko
  [10:36] datnc: Tuần trc nữa thì tụi nó vừa hơn budget rồi, nhưng tuần trước em thấy fix bug nhiều giờ làm lố 2 con này lên nhiều lắm đấ
  [10:38] vynl: 2 scope này mình đang còn 2 con cần fix nha Dat Nguyen  https://redmine.nustechnology.com/issues/81250 https://redmine.n
  [10:39] duongdn: ec5
  [10:39] duongdn: sao lố kinh khủng vậy mà vẫn làm
  [10:39] duongdn: dev có nắm rõ est của task ko vậy ????
  [10:39] datnc: 81250 như làm dư rồi, mình đâu có req nào yc change price dùng trong customer order đâu nhỉ Trinh Mai ? Nếu vậy thì phải
  [10:39] duongdn: Tuan Nguyen:  ???
  [10:40] duongdn: chuyện này xảy ra rất nhiều lần rồi, sao vẫn ko rút kinh nghiệm nhỉ ?
  [10:41] tuannt: that ra thì tuần trước e k fix mấy con này mấy. fix 2 3 task liên quan
  [10:42] duongdn: vậy là task log sai
  [10:42] duongdn: lại có vấn đề khác
  [10:42] duongdn: cuối cùng task log có thật sự phù hợp với dư án ko vậy
  [10:42] tuannt: bug này assign dev Vu mà chắc Vu k nắm đc est của cái này
  [10:42] tuannt: assign Vu fix bug là chính
  [10:43] duongdn: Dat Nguyen:  thống kế lại số giờ bị lố est theo từng dev đi
  [10:43] duongdn: a xem xét cách giải quyết
  [11:11] datnc: Số giờ hơn budget tuần trc nha a Duong Doan : TuanNT: - [CONSOLE] HISTORICAL PURCHASE ORDER - 6h45p - [PRESTASHOP] GRAZI
  [11:11] tuannt: Ha Vo: e onl k a hỏi xíu cái js mới tạo a cho vào application.js là đc đúng k ?? [thread: 1 reply]
    └ [11:18] havs: đúng rồi a, file js mới thì thêm require vào application.js. btw, bên này có Vũ cũng dev RoR, a có t
  [11:16] duongdn: [PRESTASHOP] GRAZING SOFTWARE DESKTOP - 1h45p [PRESTASHOP] GRAZING SOFTWARE FILTERS - 30p Này a đã approve, ok bỏ qua
  [11:18] duongdn: --- [CONSOLE] USE AVERAGE PURCHASE PRICE WHEN ADDING STOCK MANUALLY - 6h Này có vấn đề gì mà vượt est nhiều vậy Dev có b
  [11:20] tuannt: fixbug này e cũng k nhớ EST bao nhiêu.
  [11:21] tuannt: chắc sau là fix bug sẽ confirm lại est.
  [11:29] duongdn: -------- HISTORICAL PURCHASE ORDER: tương tự, cái này là time fix bug hay là performance làm thấp hay là do có gì phát s
  [11:30] duongdn: thống kê xem, xem có vớt vát được gì ko
  [08:44] duongdn: ==== Viết daily report đi mn Còn task gì để làm ko nhỉ
  [08:46] tuannt: Task hôm qua: - [101][Console][Staging 1][Advanced Split Order]-Error something went wrong when click split order - [101
  [08:47] duongdn: Mấy cái question hôm qua chưa thấy ai trả lời nha  Redmine em fix của phần nào vậy, còn budget ko
  [08:48] duongdn: clear a để a report lên công ty phát
  [08:52] tuannt: còn budget anh
  [08:54] tuannt: * Task hôm qua: [101][Console][Staging 1][Advanced Split Order]-Error something went wrong when click split order [101][
  [08:54] tuannt: * Task hôm qua: \[101\]\[Console\]\[Staging 1\]\[Advanced Split Order\]-Error something went wrong when click split orde
  [08:54] tuannt: * Task hôm qua: - \[101\]\[Console\]\[Staging 1\]\[Advanced Split Order\]-Error something went wrong when click split or
  [08:54] tuannt: * Task hôm qua: - \[101\]\[Console\]\[Staging 1\]\[Advanced Split Order\]-Error something went wrong when click split or
  [09:00] duongdn: > Còn task gì để làm ko nhỉ Dat Nguyen  Tuan Nguyen
  [09:00] tuannt: task thì có vẻ hết r anh
  [09:01] tuannt: k thấy thêm task nào trên trello
  [09:01] tuannt: giờ đang hoàn thành nốt để release mấy task trước đó
  [09:01] datnc: Hiện là không nha anh, em đã release staging2, rds & mobile upgrade rồi, giờ chờ ổng test thôi ạ.
  [09:02] tuannt: còn 1 cái nữa là
  [09:02] tuannt: mấy task này sau khi fix xong hết bug move qua staging2 ( upgrade rail 6) để fix syntax nữa
  [09:04] duongdn: ok mn
  [09:05] duongdn: xử lí vụ out of budget trên đi, report kĩ lưỡng a report lên trên nào
  [10:10] datnc: Anh Tuan Nguyen qua em xí nha, check qua mấy con overbudget phát anh.
  [11:00] datnc: Em tổng hợp lại 2 con trên nha mn: [CONSOLE] HISTORICAL PURCHASE ORDER - Est bởi a DuongDN (25h) - Act 40h35p - Làm bởi  [thread: 4 replies] ⚠️
    └ [14:42] vutq: phần phát sinh là do code ban đầu chưa đúng với happy case trong requirement + thiếu edge case nữa -
    └ [16:03] duongdn: và action của e là cứ kệ est, cứ làm thôi? dù đây ko phải là lần đầu tiên việc tuân thủ est được yêu
    └ [16:05] duongdn: BTW, đây là giải thích cho cái task 2h hay là cả 2 Cả hai báo rõ từng issue, a tiếp tục complain về 
    └ [16:31] tuannt: cái này 1 phần cũng do estimate hơi thấp so với scope. e thấy nó cũng đơn giản nhưng mà lúc log bug 
  [16:23] vutq: tất cả đều là time fix bug á anh (cả 2 task) + ban đầu khi assign vô fix bug 2 task này thì em không check rõ phần est
  [16:24] tuannt: Anh Duong Doan cái task Advanced Split Order mình cần times thêm e nghĩ sẽ là CR vì nó liên quan đến prestashop webhook 
  [16:25] duongdn: discuss với Đạt để nc với ổng nha
  [16:25] tuannt: sáng e có ns chuyện rồi. E báo a nắm rõ
  [16:25] duongdn: OK e
  [16:33] datnc: Túm lại là API bên Prestashop cần update & Console cần implement lại API mới này? + clear case split pack / sale-pack đú
  [16:34] datnc: * Túm lại là API bên Prestashop cần update & Console cần implement lại API mới này? '+ clear case split pack / sale-pack
  [16:34] tuannt: ừ api liên quan đến split này a nghĩ update kha khá đó
  [16:34] tuannt: vì thay đổi logic cũ
  [16:34] tuannt: data trả về cũng sẽ dạng khác k đơn thuần 1 object nữa
  [16:35] tuannt: nó liên quan đến Relationship Between Original Orders and Split Orders nữa mà
  [16:35] tuannt: theo a hiểu logic hiện tại là vậy
  [16:36] tuannt: update console là k đủ console trước giờ chỉ update qua prestashop r lấy data webhook thôi
  [16:40] duongdn: đây là issue ko chấp nhận được khi làm fixed-cost Đặc biệt nó nghiêm trọng hơn vì nó đã lặp lại nhiều lần trong dự án Và
  [16:40] duongdn: ========= https://workstream.nustechnology.com/project/cmqyvio51000vqo0xhocbx5c9/tags
  [16:41] duongdn: mn khi làm task, đọc kĩ cái này, đây là monitor task cảu dự án, tag có budget là task fixed cost
  [16:42] duongdn: a mới pin msg về fixed-cost lên room, mn đọc kĩ lại đi, all, confirm rõ lên đây sau khi đọc xong
  [16:42] duongdn: tất cả
  [17:05] tuannt: ok rõ a
  [17:06] vutq: em đã rõ
  [08:37] tuannt: Task hôm qua: - [100] [Console] [Alternative Reference Product at Split Order] Removing an Alternative Does Not Remove t
  [08:38] duongdn: check kĩ budget trước khi làm nha !
  [08:39] duongdn: * check kĩ budget trước khi làm nha ! Nếu là task fixe-cost
  [08:39] tuannt: hiện bên này tạm pending chờ CR approve
  [08:40] tuannt: nên e đang trống time bên này anh Duong Doan
  [08:41] duongdn: quay lại James Definitive làm đỡ nha, bên đó có task upgrade chắc có bug để fix
  [09:56] vynl: Update feedback redmine nếu có => Đang có mấy feedback mà ta a Tuan Nguyen  https://redmine.nustechnology.com/projects/b
  [09:57] vynl: còn mấy con bug 101 này giờ chwof tạo CR hay fix tiếp vậy Dat Nguyen Tuan Nguyen  https://redmine.nustechnology.com/proj
  [09:57] tuannt: mấy con để lại là lien quan đến CR nên đợi approve r xử luôn nè
  [09:58] vynl: * còn mấy con bug 101 này giờ chờ tạo CR hay fix tiếp vậy Dat Nguyen Tuan Nguyen https://redmine.nustechnology.com/proje
  [10:07] datnc: Em thấy 2 con này không liên quan tới CR mình discuss mà a Tuan Nguyen ? https://redmine.nustechnology.com/issues/81313 
  [10:10] tuannt: nó lien quan den webhook prestashop mà?
  [10:11] tuannt: update console thi cũng sai bản chất rồi
  [10:16] datnc: Em hông hiểu ấy, ví dụ [81313](https://redmine.nustechnology.com/issues/81313) thì có vẻ là bên trong split page, nó sho
  [10:16] datnc: * Em hông hiểu ấy, ví dụ [81313](https://redmine.nustechnology.com/issues/81313) thì có vẻ là bên trong split page, nó s
  [10:18] tuannt: sai vì nó đang tính 1 product thôi e
  [10:18] tuannt: prestashop ấy
  [10:18] tuannt: mà trong feedback ví dụ là 2 product trong 1 order
  [10:18] tuannt: hiện slipt cũ k như vậy
  [10:19] tuannt: prestashop chỉ ghi nhận được 1 slipt 1product k ghi nhận 2
  [10:19] tuannt: nên nếu update cần update từ prestashop để lấy data multipe và quantity đã trừ đi cho đúng
  [10:19] tuannt: a hiểu logic là vậy
  [10:21] datnc: Anh đang nói vấn đề nào vậy anh Tuấn? Nếu là 81313 thì ở Order A đang có 1 product B với 2 qty, bấm vào split page -> ở 
  [10:22] tuannt: de a qua e
  [10:25] vynl: 81313 là original order với product gốc á, không phải order split có product thay thế a Tuan Nguyen
  [08:42] tuannt: Task hôm qua:  - [101][Staging 1][Advanced Split Order] - "Replacement quantity" Denominator Shows Current Quantity Inst
  [08:44] tuannt: Duong Doan: cái task Advanced Split Order còn 2h nếu mà còn bug thì chắc sẽ bị lố 1 ít time tùy case. thì em sẽ lấy giờ 
  [08:44] tuannt: có vài cái CR của task này
  [08:47] duongdn: ok nha
  [09:48] duongdn: Tuan Nguyen:  e ghi task log nhầm ngày thì phải ?
  [09:50] tuannt: E update lại r anh !!
  [08:35] tuannt: Task hôm qua: [101][Console][Staging 1][Advanced Split Order]- Remove (✗) Control Remains After a Successful Split Save 
  [08:35] tuannt: a Duong Doan bên này đang chờ ổng approve CR grazing. Vậy mình chờ hay có thể làm trước k anh ?
  [08:36] duongdn: làm James đi em
  [08:36] tuannt: ok a
  [08:52] duongdn: Dat Nguyen:  bên task log Vy tuần này có 1 số card charge được ? [thread: 2 replies]
    └ [08:53] datnc: Hông có anh, em chưa review giờ charge ấy, nay hoặc sáng mai em mới rảnh review nha. Cơ mà bữa thống
    └ [08:58] duongdn: ok để a update
  [13:47] vynl: bug của 2 task hết budget 104 với 103 này giờ dev fix ngoài giờ ha a Duong Doan , Dat Nguyen
  [13:51] duongdn: nó là task nào, budget bao nhiêu giờ,  2 con nay cần bao nhiêu h để fix nữa
  [13:55] datnc: Nó của 2 con hết budget em báo tuần trc đó anh, nhưng mà nó là bug cần fix. Còn est thì em không nắm. A Tuan Nguyen est 
  [14:01] duongdn: 2 con này thì đã quá est quá nhiều rồi, ko  thể làm thêm được, ko chính đáng Này dev tự fix nha
  [08:48] tuannt: Task hôm nay:  - Fix bug redmine [CONSOLE] AUTOMATIC STOCK REFILL ( còn khoảng 6h ) - Fix bug redmine [CONSOLE] PO - PUR
  [08:49] duongdn: nhìn khá dư dả, ok  Mà sắp xếp fix 2 bug task hết budget trước đi em,  để release rồi có gì bù sau
  [08:50] tuannt: ok a
  [09:24] duongdn: cái link gởi cus đang trỏ vào 1 sheet trống nha mn https://globalgrazingservices.slack.com/archives/C06NAP7067P/p1791797 [thread: 1 reply]
    └ [09:29] trinhmtt: em moi update laij roi a
  [13:42] duongdn: 2 bug cũ ok chưa mn
  [13:43] duongdn: .
  [13:43] tuannt: E có sửa r chờ xem test có feedback gì thêm không
  [14:53] datnc: https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1791876862548409 A rep cái này nha a Tuan Nguyen ơi :")).
  [14:54] tuannt: ừ để trả lời
  [15:18] tuannt: có gì a Dương xem e trả lời có ổn chưa nếu chỉnh sửa thì chỉnh giúp e nhé Duong Doan chủ yếu lão muốn hỏi nếu dùng AI th ⚠️
  [15:19] duongdn: cái này nó đã có vấn đề từ đầu
  [15:19] duongdn: a thấy est nó có vẻ ko có support của AI
  [15:20] duongdn: nên req nó nhỏ nhưng số giờ vẫn lớn
  [15:20] duongdn: các câu trả lời cảu e nó chỉ chung chung
  [15:20] duongdn: trong est a cũng chỉ thấy đúng 1 dòng, ví dụ  update filter 14h
  [15:20] duongdn: ko nói được sự phức tạp của vấn đề
  [15:21] duongdn: nếu là a a cũng sẽ hỏi lại, về mindset ổng đúng, sao có AI mà chả thấy speed tốt hơn tí nào
  [15:22] tuannt: vậy thì nên báo với ổng đưa cho ổng 1 bản estimate mới hả a ?
  [15:22] tuannt: hay sao ?
  [15:23] duongdn: ko, tìm cách giải thích cho bằng được
  [15:23] duongdn: lí do gì mà bỏ AI vào nó vẫn ko nhanh hơn nhiều so với trước vậy
  [15:24] duongdn: hay do mình apply ko tốt ?
  [15:24] tuannt: bth mình làm task đều dùng AI và est đều dựa theo time cua AI giảm bớt đi mà ?
  [15:24] tuannt: * bth mình làm task đều dùng AI và est đều dựa theo time cua AI giảm bớt đi mà.
  [15:25] duongdn: vẫn câu hỏi cũ, a và ổng thấy con số này cực ko hợp lí khi đã apply AI agent
  [15:25] duongdn: * vẫn câu hỏi cũ, a và ổng thấy con số này cực ko hợp lí khi đã apply AI
  [15:26] duongdn: thử split nhỏ task ra xem
  [15:26] tuannt: vì cái lão nhìn là tính năng này lúc trước bên nguyên và chỉ làm giao diện nên lão nghĩ dễ
  [15:26] duongdn: và nói rõ chỗ nào tốn time
  [15:26] tuannt: mình có giải thích làm lại chức năng cho nó
  [15:26] duongdn: ko cần giải thích với anh
  [15:26] duongdn: viết msg trả lời cho cus đi
  [15:26] duongdn: chi tiết vào
  [15:27] duongdn: làm sao chứng minh được số giơ đó là hợp lí  hoặc ngược lại, ví dụ ko có AI, thì task này làm bao lâu, 200h?
  [15:27] duongdn: a ko coi kĩ requirement,  nhưng a ko tin có con số đó
  [15:29] duongdn: ===== p/s: thời đại thay đổi rồi,  giờ chi phí lập trình thực sự rất nhỏ khi có AI, nếu mình muốn có est lớn thì phải lu
  [15:30] trinhmtt: https://redmine.nustechnology.com/issues/81421 Duong Doan Grazing Software desktop có con bug nay 20p anh, để anh Tuan N
  [15:31] duongdn: task này hình như release rồi mà bị bug, mấy trăm h gì đó phải ko OK fix đi nha
  [15:33] tuannt: Trinh Mai: cái này quay về công thức trươc hay sao mà a thấy có vẻ cái này thay đổi so với lúc công thức tính gần nhất l
  [15:34] tuannt: confirm kĩ chưa em [thread: 6 replies]
    └ [15:34] trinhmtt: dạ em confirm rui
    └ [16:10] vynl: image.png
    └ [16:10] vynl: có sửa trên này luôn không Trinh Mai
    └ [16:14] tuannt: hú Trinh Mai
    └ [16:14] trinhmtt: cái này đang work đúng, k có sửa nha anh
    └ [17:12] vynl: live rồi nha Trinh Mai
  [15:39] vynl: https://redmine.nustechnology.com/issues/81105 Vừa rồi live ổng có cái update là avaialble chuyển qua lấy trong Herd, gi
  [15:39] trinhmtt: dạ đung goy
  [16:40] duongdn: Hi Vu Tat  Hiện mình sẽ cần speed up Bailey, e dùng time làm project internal qua đây phụ TuanNT fix cho xong bug để rel
  [16:41] vutq: liền giờ luôn hả anh, hay mai mới cần em qua á
  [16:43] duongdn: mai cũng được, tư tưởng là vậy
  [16:45] vutq: dạ oke
  [08:46] duongdn: Có issue urgent Bailey nha mn
  [08:48] trinhmtt: https://redmine.nustechnology.com/issues/81430
  [08:49] trinhmtt: em log lại ở đây nha anh Tuan Nguyen
  [08:51] tuannt: Task hôm qua: - [99][Console] [Automatic Stock Refill] UI Iissue - [99][Console] [Automatic Stock Refill] Old configurat
  [09:29] trinhmtt: https://redmine.nustechnology.com/issues/81428 https://redmine.nustechnology.com/issues/81427 anh Duong Doan có 2 bug cu
  [09:56] vutq: nguyên văn của issue thì anh Tuan Nguyen đã đưa cho cus rồi nha anh Duong Doan  nôm na thì issue là bulk update products
  [09:59] duongdn: sao lúc trước nó ko bị mà giờ lại bị vậy
  [10:05] tuannt: cái này e k chắc trước nó có modify nhiều products như vậy k  e check nó cùng Vũ thì phát hiện ra quick_modify_update nó
  [10:05] tuannt: nên cái này trước đó chưa có cho vào background jobs mà nhiều products như vậy
  [10:07] tuannt: việc cần làm ưu tiên là đưa hết api nặng sang background job nhẹ tải cho server đi
  [10:07] tuannt: và có thể tăng check timeout, pool lên
  [10:08] duongdn: ok, nhưng vụ move background job server đã tiến hành chưa  a quên rồi
  [10:08] duongdn: chia đôi server rồi phải ko
  [10:08] tuannt: qua server mới r anh
  [10:08] tuannt: hiện chưa giảm cấu hình thì phải Vu Tat e check qua aws xem
  [10:08] datnc: Như cái này là chiều sync từ Console -> Pres? Nếu là chiều này thì trc giờ mình không có queue cho nó ấy. Còn cái page q
  [10:09] tuannt: vậy cái này là vấn đề cũ rồi
  [10:09] duongdn: vậy đúng ý rồi đó, chắc hồi trước 1 server mạnh ko sao, giờ 2 server yếu hơn thì nó rụng, hớp lị giải thích được Còn vẫn
  [10:09] tuannt: giờ bị lại
  [10:09] duongdn: * vậy đúng ý rồi đó, chắc hồi trước 1 server mạnh ko sao, giờ 2 server yếu hơn thì nó rụng, hớp lị giải thích được Còn v
  [10:09] duongdn: nó tăng cost của ổng
  [10:13] tuannt: vậy cái này mình fix lun hay có cần xin charge giờ gì k anh Duong Doan
  [10:13] duongdn: fix luôn
  [10:14] tuannt: Duong Doan: cái này fix luon k anh
  [10:15] duongdn: Có
  [10:15] duongdn: Grazing Desktop fix hết
  [10:16] datnc: Mình setup queue cho Console đc không nhỉ mn? Tiện có issue này em nghĩ raise đc.
  [10:21] vutq: solution hiện tại có vẻ nếu số lượng product vượt qua X (X có thể là 50+) thì mình sẽ không sync trực tiếp X products đó
  [10:21] vutq: * solution hiện tại có vẻ nếu số lượng product vượt qua X (X có thể là 50+) thì mình sẽ không sync trực tiếp X products 
  [10:23] duongdn: background thì apply hết luôn chứ vượt qua X gì nữa
  [10:23] duongdn: thế nào chả phải làm
  [10:56] trinhmtt: Tuan Nguyen: fix song 2 con Grazing Desktop, báo chị Vy Nguyen test là Live đc nha ạ.  Note: Live song thì mình enable m [thread: 1 reply]
    └ [15:11] vynl: Live rồi nha Trinh Mai
  [10:56] trinhmtt: image.png
  [16:45] datnc: https://globalgrazingservices.slack.com/archives/C06NAP7067P/p1791970709315979 Đồi cái text ở đây luôn nhỉ mn? Do em khô
  [16:47] datnc: https://paturevision.fr/admin123/?controller=AdminTranslations&type=modules&module=thdashboard&lang=fr
  [16:47] datnc: Chính xác là add nó vô đây là đc, như nó đang thiếu thì phải.
  [16:51] datnc: Ủa như a Tuấn về rồi hả mn :"|...
  [16:52] trinhmtt: dạ đúng rui
  [16:53] trinhmtt: v mình add luon khỏi kiu dev đc hong anh
  [16:54] datnc: Anh ko thấy có index để tự add, ko phải là hardcode ko.
  [16:54] datnc: BTW em có cái msg mới nhất nha, như nó lq gì tới cái app em confirm lúc lâu đó. [thread: 2 replies]
    └ [16:58] trinhmtt: kênh nào v anh, em hong thấy
    └ [16:58] trinhmtt: à em thay roi
  [17:11] datnc: A Tuan Nguyen nào anh available đổi cái text này sang tiếng Pháp hộ bác nha anh ơi.
  [08:43] trinhmtt: https://trello.com/c/txmiXsIp/109-prestashopcr2-grazing-software-desktop-view có con này đc approve rồi ạ, raw dev là 9h
  [08:51] trinhmtt: * https://trello.com/c/txmiXsIp/109-prestashopcr2-grazing-software-desktop-view có con này đc approve rồi ạ, raw dev là 
  [08:57] tuannt: Task hôm qua:  - [99][Console] [Automatic Stock Refill] Saving the configuration creates a manual palette instead of the
  [08:58] tuannt: a Duong Doan cai [99][Console] [Automatic Stock Refill] đã hết time rồi anh ạ. mà hiện còn có mấy con bug mới
  [08:58] tuannt: còn [101][Console][Staging 1][Advanced Split Order] cũng hết times nhưng có CR bù time được nhưng chưa được approve
  [08:59] vutq: Task hôm qua: - [94][PO - Purchase Price Change Logging & Notification] Notification email wraps all dynamic values in d
  [08:59] duongdn: > cai [99][Console] [Automatic Stock Refill] đã hết time rồi anh ạ. mà hiện còn có mấy con bug mới Nhiều bug ko, est bao
  [09:00] tuannt: cái này [99][Console] [Automatic Stock Refill] nhìn qua bug chắc 2 - 3 giờ [thread: 4 replies]
    └ [09:06] duongdn: ko đủ info, est task này là bao nhiêu giờ?
    └ [09:29] tuannt: - [99][Console] [Automatic Stock Refill]- Auto palette is selectable in the palette list when moving
    └ [09:29] tuannt: Duong Doan:
    └ [10:25] duongdn: cuối cùng là bao nhiêu giờ est của task này ...
  [09:00] tuannt: Vu Tat: a tưởng qua e handle bug production console lỗi? [thread: 1 reply]
    └ [09:04] vutq: update report rồi nha an
  [09:04] vutq: * Task hôm qua: - Bulk update from Prestashop to Console - [94][PO - Purchase Price Change Logging & Notification\] Noti
  [09:04] vutq: * update report rồi nha anh
  [10:19] trinhmtt: https://redmine.nustechnology.com/issues/81455 https://redmine.nustechnology.com/issues/81453 Tuan Nguyen Grazing Deskto
  [13:53] duongdn: uhm grazing cứ fix đi nha
  [14:00] duongdn: * uhm grazing desktop cứ fix đi nha

### NUS Technology — 190 messages
  [09:24] namtv: Hi all, Hôm qua mình có move server Redmine. Sau khi move thì có một số user gặp vấn đề, cần phải login lại. Để cho cons
  [15:35] thaonm: 🌙 Loa loa loa 📣 Đến hẹn lại lên, **Happy Hour** sắp quay trở lại! Nhưng lần này không chỉ có đồ ăn ngon hay game vui đ
  [15:36] thaonm: Trung Thu26.png
  [15:36] thaonm: * 🌙 Loa loa loa 📣 Đến hẹn lại lên, **Happy Hour** sắp quay trở lại! Nhưng lần này không chỉ có đồ ăn ngon hay game vui
  [10:09] honght: Hi all,  **Thẻ bảo hiểm điện tử** đã được gửi về email mọi người đăng ký. Mọi người check email và kiểm tra lại thông ti
  [11:36] thaonm: Hi all, Hôm nay em mang đến cho cả nhà một tin vui: Bạn PhongTB - một Ruby on Rails Dev của nhà NUS -  đã chính thức bướ
  [09:55] cuongnh: Bên PCCC bảo trì định kì đầu báo khói, chúng ta vẫn làm việc  bình thường nha mn!
  [10:21] trucpdt: 🌕 Mùa Trung Thu tới, người ta thì đau đầu suy nghĩ chọn bánh trung thu nhân gì... Còn Ban Biên tập chúng tôi thì chỉ xi [thread: 1 reply]
    └ [10:23] duongdn: done
  [10:35] trucpdt: 🚨 ĐẾN GIỜ CHỌN PHE RỒI NÈ!!! 🥮 Trung Thu này, mâm cỗ của "Vườn Trăng Say Hi!" sẽ có bánh Trung Thu nhân gì? Hai phe đã [thread: 5 replies]
    └ [10:37] trungdt: trẻ con mới chọn :(( em ko có cái bánh lấy gì chọn, huhu
    └ [10:38] trungdt: Có là em chon hết
    └ [10:39] trucpdt: ở đây hông có "Ăn gì cũng được", chúng ta phải quyết đoán lên em :))
    └ [10:40] trungdt: image.png
    └ [10:42] trucpdt: ê c k thích trứng muối nè :))
  [15:56] trucpdt: ❤️‍🔥 Tình hình chọn phe nhân bánh trung thu có vẻ ngang tài ngang sức quá nè cả nhà. Nhưng mà mới đc khoảng 50% member 
  [15:57] trucpdt: NUS LOGBOOK VOL4.png
  [16:00] trucpdt: * ❤️‍🔥 Tình hình chọn phe nhân bánh trung thu có vẻ ngang tài ngang sức quá nè cả nhà. Nhưng mà mới đc khoảng 50% membe
  [16:00] trucpdt: * ❤️‍🔥 Tình hình chọn phe nhân bánh trung thu có vẻ ngang tài ngang sức quá nè cả nhà. Nhưng mà mới đc khoảng 50% membe
  [16:00] trucpdt: * ❤️‍🔥 Tình hình chọn phe nhân bánh trung thu có vẻ ngang tài ngang sức quá nè cả nhà. Nhưng mà mới đc khoảng 50% membe
  [16:01] trucpdt: * ❤️‍🔥 Tình hình chọn phe nhân bánh trung thu có vẻ ngang tài ngang sức quá nè cả nhà. Nhưng mà mới đc khoảng 50% membe
  [16:01] trucpdt: * ❤️‍🔥 Tình hình chọn phe nhân bánh trung thu có vẻ ngang tài ngang sức quá nè cả nhà. Nhưng mà mới đc khoảng 50% membe
  [16:22] phatdlt: Hang Nguyen: ai dthg qá vị [thread: 1 reply]
    └ [16:27] datnc: Thúy Hằng team mình chứ ai... Phat Le ! 🫣
  [09:45] trucpdt: CuongNH26.png
  [09:46] trucpdt: Happy Birthday a Cường 🎂🎂🎂
  [09:46] duongdn: happy birthday Cuong Nguyen  :)
  [09:53] honght: Chúc mừng sinh nhật anh Cường🎉🎉🎉🎂🎂🎂
  [09:54] thaonm: Chúc mừng sinh nhật anh Cường 🎊🎊
  [09:56] samht: 🎉 Happy birthday anh Cường 🎉
  [09:56] vitht: Chúc mừng sinh nhật a  Cường 💗🎂💗 chúc a tuổi mới nhiều niềm vui, may mắn và thành công
  [09:56] trungdt: Chúc mừng sinh nhật anh Cường
  [09:57] trungdt: * Chúc mừng sinh nhật anh Cường
  [10:06] cuongnh: Cám ơn lời chúc của mn, chúc mn ngày mới vui vẻ nhé 🤩
  [10:17] anhnvn: Chúc anh Cường sinh nhật vui vẻ nha 🎉🎂🍹
  [11:04] thaonm: Hi all, Hôm nay em mang đến cho cả nhà một tin vui: Chị HR Admin xinh đẹp, cá tính - TrucPDT nhà ta đã đạt cột mốc 7 năm
  [11:06] trungdt: Truc Pham:  tuyệt vời, uống nào
  [11:11] vitht: ChatGPT Image 11_11_06 18 thg 9, 2026.png [thread: 1 reply]
    └ [11:38] trucpdt: quay đi quay lại thành U40 :)
  [11:12] anhnvn: Truc Pham nay có mua gỏi cuốn ăn ko e? [thread: 3 replies]
    └ [11:39] trucpdt: ủa tại xao lại là gỏi cuốn zịii, mình ăn món nào soang hơn mới đc chớ :))
    └ [11:45] vitht: chắc xưa Chúc hay mua gỏi cuốn, 1 lần mua 6 nhưng ăn có 2 là ngán :v
    └ [13:50] trucpdt: hong có gỏi cuốn, anh NA ăn bánh flan đỡ nha :))
  [13:43] trucpdt: Cả nhà ơi @room , Nhân ngày thứ 6 cuối tuần, cho em/Chúc mời mng một chút ngọt ngào cho buổi chiều hnay nha. Ở pantry có [thread: 9 replies]
    └ [13:45] vitht: quá toet vời 🎉
    └ [13:45] thaonm: cảm ơn chị Admin hiền và nhiều tài =)))
    └ [13:46] vitht: ng con gái mỏ hỗn nhưng tâm thiện =))
    └ [13:49] trucpdt: mỏ hỗn hồi nào, chưa biết chửi ai bao giờ
    └ [14:00] anhttl: Em cảm ơn chị Chúc 🫶🫶
    └ [14:01] thinhld: qá đã luôn, cảm ơn xóp
    └ [14:01] lamlq: bánh Flan ngon nha chị 🎉😄
    └ [14:05] liemhtn: Em cảm ơn chị Chúc ạ  💯 🎉
    └ [14:07] longvv: Em cảm ơn c Chúc ạ 💖💖🫶
  [16:03] thaonm: Gửi đến: BeachBoy "Người khóc trước là người sẽ ko hối hận. Còn người chưa khóc thì sau sẽ vừa khóc vừa hối hận. Cố lên 
  [16:07] thaonm: Gửi đến những người đã đến trước khi ta kịp nhận ra họ quan trọng." Bài hát: Trước Khi Em Tồn Tại Trình bày: Thắng | Việ
  [16:11] thaonm: (Không có lời nhắn) Bài hát: Giải Cứu Thế Giới Trình bày: Bản Demo AI Link: https://youtu.be/Wapdba6Tl9k?list=RDWapdba6T
  [16:12] trungdt: image.png
  [16:13] trungdt: 
  [16:14] trungdt: sorry mn em ibx nhầm :)
  [16:15] thaonm: (Không có lời nhắn) Bài hát: tết tình Trình bày: aysonlei, DANG HONG HAI, DILLAN, Sơn.K Link: https://youtu.be/22aLPzFnV
  [16:19] thaonm: Mọi yêu cầu về bài hát yêu thích mọi người gửi về hộp thư của chương trình QTAN nhé!  Cảm ơn cả nhà ạ ❤️❤️❤️ https://f
  [10:36] trucpdt: 📢 Cà nhà ơi @room Cuối tuần của mọi người thế nào? Có ai còn đang cay thay cho nhà Pháo – “vua về nhì” hông 😅. Còn ai  [thread: 4 replies]
    └ [10:37] luhx: quá trời đụng chạm rồi 🫣
    └ [10:39] duongmd: Hôm thứ 7 coi Pháo bị đấm dã man quá chịu ko nổi 😔
    └ [10:41] trucpdt: fan MU cũng phải cám ơn nhà Pháo á, phần nào giúp đỡ đao hơn á e :))
    └ [10:41] thuyltt: Do Brighton mạnh chứ Pháo có gì đâu...
  [10:37] trucpdt: image.png
  [10:41] thuyltt: 1789962090763.jpeg [thread: 3 replies]
    └ [10:43] dongnv: Không thấy credit trollbongda em còn nghĩ bài post của Diêm Thống Nhất á chị :))
    └ [10:48] vitht: Truc Pham: vẫn cho e nhân thập cẩm nhé chị iu 💗 =))
    └ [10:51] trucpdt: t k qđ đc nha m, rủ rê ng zô vote đi 😆
  [11:01] trucpdt: Aaaaaa!! Team Thập cẩm mạnh lên rồi, Team Đậu xanh đừng để thua nhaa 🤩
  [13:30] thaonm: Hé lô các anh chị em **lầu 3B** 👋 Sau nhiều ngày "để ý", em thấy buổi trưa mọi người hay mở cửa chính ra phía hành lang
  [14:28] honght: **🔔 Góc remind nhẹ về thẻ bảo hiểm điện tử PVI nha mọi người ơi:** Mọi người check lại email giúp em xem đã nhận được t
  [16:03] thaonm: Cả nhà ơi @room  Mọi người đừng quên cái hẹn lúc **17h30 ngày mai (Thứ 5)** tại “**Vườn Trăng**” – văn phòng lầu 3 nhaaa
  [16:05] trucpdt: video_c2af1f5.mp4
  [16:07] trucpdt: Xin góp zui 1 chiếc clip capcut "ko giựt giựt" hòa cùng ko khí trung thu nheee
  [16:10] trucpdt: ima_7f93382.jpeg
  [16:11] trucpdt: mng check in như bạn này đi nè 🧏🏻‍♀️
  [15:25] cuongnh: Hi mn @room , Hiện kết nối Internet từ Việt Nam đi quốc tế đang bị ảnh hưởng do 4 tuyến cáp quang biển gồm SJC2, AAE-1, 
  [17:10] trucpdt: 
  [17:11] trucpdt: ima_42f7591.jpeg
  [17:12] trucpdt: Mâm cỗ đã sẵn sàng chờ đón cả nhà đến chơi nè mng ưiiiii @room
  [17:19] trucpdt: Anh chị em lầu trên ơiii, xún lẹ lẹ mng ơi…. Bà con lầu dưới hóng lắm gòii
  [17:20] samht: xin các hạ hãy tự trọng
  [17:20] samht: * xin các hạ hãy tự trọng, chờ dân 3B xuống đã ạ
  [17:24] chientx: Dưới này nước miếng sắp thành sông rồi 😂
  [09:45] trucpdt: TrinhMTT.png
  [09:45] trucpdt: 🎂 Chúc mừng sinh nhật sớm em xinh Trinh Mai nhaaaa 🎉
  [09:46] cuongnh: Chúc mừng sinh nhật sớm Mai Trinh 🎂🎂🎂
  [09:48] duyvna: Happy Birthday Mai Trinh 🎉🎉🎉🎂🎂🎂
  [09:48] tuantt: Chúc mừng sinh nhật sớm Trinh Mai 🥳💪🖖🛵😇
  [09:52] haudc: Happy Birthday Trinh Mai 🎂🎂🎂
  [09:52] vitht: Chúc mừng sinh nhật Trinh Mai , chúc e tuổi mới lúc nào cũng xinh đẹp, nhiều niềm vui và đạt được những điều mình muốn t
  [09:53] vitht: * Chúc mừng sinh nhật Trinh Mai , chúc e tuổi mới lúc nào cũng xinh đẹp, nhiều niềm vui và đạt được những điều mình muốn
  [09:53] duongdn: Chúc mừng sinh nhật em Trinh Mai
  [09:53] anhnvn: Sinh nhật vui vẻ nha Trinh Mai 🎂🎂🎉🎉🥳🥳
  [09:53] minhtc: Happy birthday Trinh Mai 🎊🥳🎉
  [09:55] trinhmtt: Dạ em cảm ơn mn đã dành lời chúc tốt đẹp đến cho em. Chúc mn một ngày làm việc vui vẻ ạ 💮
  [11:20] namtv: Hi mọi người, Bitwarden Chrome extension có version mới ko tương thích với server. Vậy nên mọi người có thể sẽ ko thấy l
  [11:22] namtv: (còn web thì vẫn dùng bình thường, ko có vấn đề gì, do nó luôn đi kèm với server version)
  [16:02] thaonm: "WE WIN THIS GAME!" Bài hát: WE WIN THIS GAME! Trình bày: TOKI THÀNH THỎ, CHENG, K.O, DUY KHÁNH, PHÙNG MINH CƯƠNG Link: 
  [16:06] thaonm: (Không có lời nhắn) Bài hát: DẮT ANH CHƠI HỘI Trình bày: PHƯƠNG MỸ CHI x DTAP x HOÀI SƠN Link: https://www.youtube.com/w
  [16:11] thaonm: "Yêu đi, yêu vui lắm, yêu nhiều lên." Bài hát: CỨ THẾ Trình bày: ORANGE x HOÀNG DŨNG Link: https://www.youtube.com/watch
  [16:16] thaonm: Gửi: Bạch Nguyệt Quang của tôi Nguyễn Vũ Nhật Anh Chưa có câu chuyện gì nên hi vọng bài hát này sẽ làm nên chuyện :))))) [thread: 3 replies]
    └ [16:19] thuyltt: Anh Nguyen idol ơi...
    └ [16:30] trucpdt: image.png
    └ [16:31] trucpdt: đố ai biết đc idol hay nói gì :))
  [16:17] vitht: không phải tôi nha. Mn đừng hiểu lầm
  [16:17] vitht: * không phải tôi nha. Mn đừng hiểu lầm : (
  [10:06] hangdtt: Hi staff, Công ty vừa gửi email về khảo sát góp ý nhân viên định kỳ – **Quý 3/2026**. Nhằm hiểu rõ hơn trải nghiệm làm v
  [11:01] thaonm: Hi all, Em xin mang đến cho cả nhà một tin vui: Hôm nay là một ngày đặc biệt đối với anh LeNH – ngày mà anh tròn 7 năm đ
  [14:24] cuongnh: Hi all, văn phòng bên tầng 3B có tiếng ồn, bên IT đã phản ánh kỹ thuật tòa nhà kiểm tra nhắc nhở nha mn!
  [14:24] cuongnh: * Hi all, văn phòng bên trên tầng 3B có tiếng ồn, bên IT đã phản ánh kỹ thuật tòa nhà kiểm tra nhắc nhở nha mn!
  [16:01] thaonm: "Giai điệu bài hát này khiến mình cảm giác hoài niệm, một cảm giác gần gũi từ quá khứ. Hãy xem bộ phim này nếu có thể và
  [16:05] thaonm: (Không có lời nhắn) Bài hát: Đôi Bờ Trình bày: KraziNoyze ft. BlakRay, DSK Link: https://www.youtube.com/watch?v=hF12jIJ
  [16:08] cuongnh: nữ ca sĩ hát như vừa run vừa hát :d), lúc đầu tưởng bluetooth lag
  [16:10] thaonm: “Bong srolanh oun tê” Bài hát: Thiên đường với người thương Trình bày: Phương Mỹ Chi Link: https://www.youtube.com/watch
  [16:14] thaonm: "VÀ TÔI CŨNG YÊU EM" Bài hát: VÀ TÔI CŨNG YÊU EM Trình bày: HOÀNG ROB, THUẬN NGUYỄN, ĐÔNG HÙNG, OSAD, HOÀNG DŨNG, HÀ AN 
  [16:19] thaonm: Mọi yêu cầu về bài hát yêu thích mọi người gửi về hộp thư của chương trình QTAN nhé!  Cảm ơn cả nhà ạ ❤️❤️❤️  https://fo
  [17:16] thaonm: Anh chị em ui, Dạo này thời tiết mưa nắng thất thường quá, mọi người nhớ giữ sức khoẻ nhen. ✨️✨️ Hôm nào trời mưa to, gi
  [11:26] thaonm: **THÔNG BÁO THI CÔNG, CẢI TẠO NHÀ VỆ SINH TÒA NHÀ** Cả nhà ơi @room , từ ngày **10/10/2026** đến **31/12/2026**, Tòa nhà
  [11:16] hangdtt: Hi mọi người, Công ty xin nhắc nhẹ là **Thứ 6, ngày 09/10/2026** sẽ là hạn cuối để mọi người gửi ý kiến cho đợt khảo sát
  [09:42] trucpdt: HPBD ChienTX.png
  [09:42] trucpdt: Chúc mừng sinh nhật sớm đại ka Chien Tran 🎉🎂🎉
  [09:48] samht: 预祝你生日快乐 Chien Tran 🎂🎂🎂 [thread: 2 replies]
    └ [09:49] vitht: hay ra dẻ quá. Biết mn k biết tiếng Hoa chứ gì
    └ [09:53] samht: 😂 cho biết chinese boy còn sót lại thôi c ơi, 2 khứa kia cook r
  [09:56] vitht: Chúc mừng sinh nhật a Chien Tran , chúc a có một ngày sinh nhật vui vẻ và hạnh phúc bên gia đình nhỏ của mình 💗🎂
  [09:56] tiennd2: Happy Birthday anh Chien Tran 🎉🎉🎉
  [09:57] cuongnh: Chúc mừng sinh nhật Sếp Chiến 🎂🎂🎂🎂🎂
  [10:00] khanhpq: Chúc mừng sính nhật Boss Chien Tran ⚽️⚽️🎂🎂🎂🎂
  [10:00] chientx: Thanks mn! A xin mời mn nước hôm nay nha. Thao Nguyen team Admin hỗ trợ a order nhé [thread: 1 reply]
    └ [10:04] thanhvm: Chúc mừng sinh nhật sớm anh, chúc and và gia đình nhiều sức khoẻ và bình an 🙂
  [10:01] anhttl: Chúc mừng sinh nhật anh Chien Tran 🍰🥞
  [10:10] tuannt: Chúc mừng sinh nhật anh Chien Tran  🎉🎉🎉
  [10:12] duongdn: Chúc mừng sinh nhật Chien Tran  😍 😍 😍
  [10:19] phongth: cmsn A Chiến 🎁
  [10:19] khanhhh: Chúc mừng sinh nhật sớm anh Chien Tran 🎉🎂
  [10:20] taitm: Chúc mừng sinh nhât sớm a Chien Tran 🎉❤️‍🔥🎉
  [10:22] hangdtt: Chúc mừng sinh nhật anh Chiến 🎉🎂🎂
  [10:22] hungpn: Chúc mừng sinh nhật Chien Tran 🍻🏆️🏅🎂
  [10:23] thuongntn: Chúc mừng sinh nhật sớm a Chiến 🎉
  [10:24] vynl: Chúc mừng sinh nhât sớm a Chiến 🎉🎁🎂
  [10:25] thotnt: Chúc mừng sinh nhật sớm a Chiến 🎂🎉
  [10:33] sangnv: Chúc mừng sinh nhật anh Chiến 🎂🎂🎂🍺
  [10:34] tuantt: Chúc mừng sinh nhật anh Chiến 💪🥳🤩🤩
  [10:34] hiepnt: Chúc mừng sinh nhật sớm a Chien Tran  🎉🎂
  [10:36] danhtd: Chúc mừng sinh nhật anh Chiến 🎂
  [10:39] phatdlt: Chúc anh Chiến sinh nhật vui vẻ 🎂🍻🎉
  [10:41] minhtv: Chúc mừng sinh nhật anh Chiến 🚀🚀🎂🎂🎉🎉🎉
  [10:44] thaonm: Chúc mừng sinh nhật anh Chiến ✨️✨️ Chúc anh tuổi mới luôn hạnh phúc, vui vẻ và nhiều sức khoẻ ạ 🎂
  [10:46] thaonm: Cảm ơn anh Chiến đã mời nước cả nhà Em xin gửi link order ạ. Anh chị em tìm đúng tên mình trong danh sách từng lầu. Chọn
  [10:50] thinht: Chúc mừng sn A Chiến. Chúc anh tuổi mới cầu gì được nấy 🍻🥂🍰
  [10:52] thinht: * Chúc mừng sn A Chiến. Chúc anh tuổi mới cầu (ước) gì được nấy 🍻🥂🍰
  [11:59] thaonm: @room Anh chị em nào chưa order, mình tranh thủ giúp em nhaa
  [13:53] thaonm: Hi all @room, Nhằm phục vụ việc tổng hợp và lập báo cáo liên quan đến **Khám sức khỏe định kỳ theo yêu cầu của Sở Nội vụ
  [15:10] thaonm: Cả nhà ơi @room có nước rồi ạ. Nước đang để ở pantry từng lầu nha. Mọi người vui lòng lấy đúng tên mình được ghi trên ly [thread: 1 reply]
    └ [16:20] thanhvm: e cám ơn a Chiến và team Admin và các bạn hỗ trợ khác (nước ngon quá ạ) 😉
  [15:10] trungdt: Cảm ơn anh Chien Tran  mời nước 💗💗💗
  [15:11] samht: 🎉 tks a Chiến vs mấy chị đẹp admin
  [15:11] duongdn: cám ơn Chien Tran , cám ơn team admin :)
  [15:13] cuongnh: Cám ơn Sếp Chiến và team admin đẹp xinh nhé 😍
  [15:13] longvv: Em cám ơn anh Chiến và team admin ạ 🫶🫶
  [15:13] khangnhh: Cảm ơn anh Chien Tran và team Admin đẹp ^^
  [15:14] taitm: Cảm ơn a Chiến vs team Admin ạ ❤️‍🔥
  [15:14] sangnv: Cảm ơn anh Chien Tran  và admin team.  chúc anh Chiến có đô bia ngày càng mạnh - nhiều như số lượng ly nước anh đã mời <
  [15:14] lamlq: E cảm ơn a Chiến và team Admin ạ 🎉
  [15:16] duongmd: E cảm ơn anh Chien Tran  và team Admin nhìu ạ 💖
  [15:17] thinht: Cảm ơn anh Chiến và Tean Admin nhiều nhiều
  [15:21] thinhld: cảm ơn a Chiến và team Admin nhiều ạ 🫡
  [15:22] hungpn: Cảm ơn Chien Tran  và Team Admin 🎉🤩
  [15:23] phucvt: Cảm ơn anh Chiến và admin team, với mấy anh/em hỗ trợ luôn ạ ❤️
  [15:23] datnt: em cảm ơn anh Chiến và các chị đẹp team Admin nhìu ạ 🎉
  [15:24] thuongntn: Cảm ơn anh Chiến và các chị đẹp team Admin nhiều ❤️
  [15:25] phatdlt: E cám ơn a Chiến và team Admin ạ 🎉 😘
  [15:50] chientx: OK nha mn, cũng cám ơn mn đã lv chăm chỉ 🙂  Thanks team Admin đã hỗ trợ
  [16:01] thaonm: (Không có lời nhắn gửi kèm) Bài hát: LẦN CUỐI (đi bên em xót xa người ơi) Trình bày: Ngọt Link: https://www.youtube.com/
  [16:04] thaonm: "Đi Về Nhà" Bài hát: Đi Về Nhà Trình bày: Đen x JustaTee Link: https://youtu.be/vTJdVE_gjI0?si=aHNlp6j7Agj-k1iG
  [16:07] thaonm: (Không có lời nhắn gửi kèm) Bài hát: Bèo dạt mây trôi Trình bày: Anh Khang, Tạ Quang Thắng Link: https://www.youtube.com
  [16:11] thaonm: (Không có lời nhắn gửi kèm) Bài hát: ĐÃ LỠ YÊU EM NHIỀU Trình bày: GAUCI (Ca sĩ mặt nạ) Link: https://www.youtube.com/wa
  [14:40] thaonm: Hi all, Bộ phận Admin định kỳ thông báo nhắc nhở các bạn về việc sử dụng ngày phép hợp lý như hình bên dưới. Mọi người c
  [14:40] thaonm: NUS_OA_Huong_Dan_Su_Dung_Ngay_Phep.png
  [10:23] thaonm: Cả nhà ơi, Anh chị em nào chưa điền **form thu thập thông tin** thì cả nhà tranh thủ dành ít phút thực hiện giúp em nha.
  [10:23] thaonm: * Cả nhà ơi, Anh chị em nào chưa điền **form thu thập thông tin** thì cả nhà tranh thủ dành ít phút thực hiện giúp em nh
  [11:25] thaonm: Hi cả nhà, Dạo này Sài Gòn đón những cơn mưa bất chợt, kéo theo chút se lạnh. Thời tiết này thật thích hợp để ngồi bên m
  [10:58] thaonm: Hi all, Hiện tại còn khá nhiều anh/chị/em chưa cung cấp **thông tin cư trú** cho em qua form thu thập thông tin cư trú (
  [12:01] cuongnh: Bạn nào đang giữ Galaxy A13, Nokia 6.1 Plus thì update link quản lys thiết bị nhé mn! https://docs.google.com/spreadshee
  [12:01] cuongnh: * Bạn nào đang giữ Galaxy A13, Nokia 6.1 Plus thì update link quản lý thiết bị nhé mn! https://docs.google.com/spreadshe
  [12:01] cuongnh: * Bạn nào đang giữ Galaxy A13, Nokia 6.1 Plus, Pixel 6 thì update link quản lý thiết bị nhé mn! https://docs.google.com/

### PHP Projects — 57 messages
  [09:35] chientx: Kai Worklog.xlsx
  [09:35] chientx: [6/10/26, 17:26:22] Maddy: Hi Chien, need some help from you. I received the new invoice. The hours listed on the invoic
  [09:36] chientx: NIK_Invoice_XtremeSoftSolutions_20261006.pdf
  [09:36] chientx: Invoice mình bill ổng
  [09:38] namtv: Chà, chưa biết cụ thể từng task sao, nhưng nếu expect của ổng là ko tính tiền bug fix thì chỉ có chuyển sang fixed cost 
  [09:57] duongdn: Theo như task log của tháng trước thì phần lớn là đi investigate bug/fix feedback của khách hàng/tester  Lâu nay cũng rấ
  [10:00] chientx: Khó nói thì cũng phải nói th, đâu trốn gì được. Với lại đâu phải fix bugs nghĩa là ko charge đâu, chỉ trừ các case bug đ
  [10:01] chientx: với lại bên này cơ chế lv đang thế nào? Khi nào mình làm cho ổng, cách lv ra sao để ổng nắm giờ làm của mình? Nếu lắt nh
  [10:03] duongdn: > Khi nào mình làm cho ổng Khi ổng yêu cầu à , như trên, giờ budget ổng ít lắm, ổng request mới làm  > cách lv ra sao để
  [10:03] duongdn: * > Khi nào mình làm cho ổng Khi ổng yêu cầu à , như trên, giờ budget ổng ít lắm, ổng request mới làm > cách lv ra sao đ
  [10:04] duongdn: * > Khi nào mình làm cho ổng Khi ổng yêu cầu à , như trên, giờ budget ổng ít lắm, ổng request mới làm > cách lv ra sao đ
  [10:04] duongdn: Với nay có thêm mobile dev, chắc bạn ko action giống vậy
  [10:04] namtv: Cái fixed cost tao nói là cho các tasks sau. Còn cái ổng hỏi thì giờ phải giải thích rõ thôi: - Hours ko khớp là do ổng 
  [10:05] namtv: >Với nay có thêm mobile dev, chắc bạn ko action giống vậy Cần nắm nha, DM chỉ có 1, ko phải do mobile thì ko care đâu
  [10:06] namtv: Bên đó thì theo tao biết có estimate, làm cũng khá sát và hầu như ko bị back lại bug, nên cũng chưa thấy ổng phàn nàn gì
  [10:07] namtv: >Các bugs có những bugs nào nó bị đi bị lại, hay dễ thấy quá ko Cái này cũng quan trọng nè. Tuy nói hourly fix bugs mình
  [10:07] namtv: * > Các bugs có những bugs nào nó bị đi bị lại, hay dễ thấy quá ko Cái này cũng quan trọng nè. Tuy nói hourly fix bugs m
  [10:07] duongdn: ok, để rà soát lại task tháng trước xem
  [17:03] duongdn: Nay chưa review kịp invoice Maddy tháng trước nha, để mai tiếp Ít nhất thì sau khi discuss team thì hiện ko có issue nào
  [17:10] chientx: ok a, mai cung cấp e info sớm, ko ngâm lâu trả lời ổng được
  [23:45] duongdn: Theo như trace thì   - 07/09/2026 — 0.5h: Resolve conflict PR / xử lý feedback review. Công việc dev thông thường, không
  [07:20] namtv: Internal task là gì? Mấy bugs ko log giờ lên Jira là do ổng yêu cầu vì liên quan giờ charge client của ổng à? Nếu là vậy
  [08:54] duongdn: Internal task: là task resolve conflict, xử lí các feedback review > Mấy bugs ko log giờ lên Jira là do ổng yêu cầu vì l
  [08:59] chientx: a Năm với a Dương discuss rồi cho e 1 msg để e quăng cho ổng với nha
  [12:01] duongdn: Về mô hình làm việc, thì nó đã xảy ra từ lâu, Slack chỉ log 90 day msg nên ko còn nữa, chỉ tìm thấy được 1 msg gần nhất 
  [12:04] chientx: A có đang hiểu sai ý KH không vậy? > client now wants us to wait for their approval for every task even if it is less th
  [13:21] namtv: Ý Dương là trước đó thì "tốt hơn", cũng có estimate, nhưng dưới 15h thì làm luôn ko cần chờ approve
  [13:22] namtv: * Ý Dương là trước đó thì "tốt hơn", cũng có estimate, nhưng dưới 15h thì làm luôn ko cần chờ approve. Tới khúc message 
  [16:34] chientx: chốt trả lời ổng sao mn?
  [16:36] duongdn: Đây nha em ```  Hi Madhuraka,   Thanks for raising this. I've gone through the September invoice with Kai and checked it
  [16:36] duongdn: * Đây nha em  Hi Madhuraka,   Thanks for raising this. I've gone through the September invoice with Kai and checked it a
  [16:36] duongdn: * Đây nha em ================ Hi Madhuraka, Thanks for raising this. I've gone through the September invoice with Kai an
  [16:37] duongdn: * Đây nha em ================ Hi Madhuraka, Thanks for raising this. I've gone through the September invoice with Kai an
  [16:48] chientx: > The 15.75h difference is time Kai did not log in JIRA.  Cái này lý do chính là gì? Vì mình ko biết phải log? Hay mình 
  [16:50] chientx: Ở đây msg mình ko phải giải thích ra từng giờ, mà cái chính là mình nên giải thích vì sao có các giờ phát sinh này mà ổn
  [16:51] chientx: vd có case nào trước đây cũng vậy ko, hay tự nhiên giờ mình lại làm như vậy. Nếu vậy phải sorry các thứ chứ ko phải tự n
  [16:52] chientx: > I know he has been working on some bug fixes but I was under the assumption that I will not be billed for those genuin
  [16:52] duongdn: Do mình quên log , manager cung ko kiểm tra JIRA
  [16:56] chientx: Còn mấy giờ phát sinh này a thấy đều là hợp lý hết?
  [16:59] duongdn: uhm e, để a viết lại msg
  [17:04] duongdn: Hi Madhuraka,                                                                                                           
  [17:04] duongdn: * Hi Madhuraka, Thanks for raising this, and sorry for the confusion it has caused. I've gone through the September invo
  [17:05] duongdn: A viết lại msg nha
  [17:10] chientx: Ý 3 thì e sẽ xem xét lại discuss với ổng riêng
  [17:59] chientx: Hey Chien, With the quote tool issues, I approved 2 hours for investigations and said I will absorb that cost but cannot
  [20:30] namtv: Này thì chắc phải discuss cơ chế fixed cost cho những tasks sắp tới thôi. Những cái hiện tại thì chắc phải giải thích từ
  [21:15] duongdn: tạm thời sẽ nói với team dừng xử lí các issue bên Maddy, có cứ raise lên Rồi xem xét từng cái một kĩ lưỡng mới action đư
  [21:38] duongdn: tuần này có 2h Maddy, mà theo như task log thì nó liên quan quote issue với lại resolve conflict nữa ... Này có charge k
  [21:38] duongdn: image.png
  [21:40] chientx: đang có vấn đề, nếu ổng chưa biết thì ko charge được rồi ☹️
  [21:45] duongdn: OK e
  [21:49] chientx: Mấy bug này dạng nào vậy a Dương? Sao Maddy nói thường là làm sai so với spec luôn [9/10/26, 21:46:19] Maddy: Client's m ⚠️
  [21:57] duongdn: a ko rõ đang nói tới cái nào,  như discuss với dev thì những hiện tại thì đều hợp lí để charge còn những cái bug do dev 
  [21:59] chientx: ổng vẫn đang nói cái quote tool đó th
  [22:00] chientx: giờ ko có tranh cãi thêm với nữa, ổng đang nói vậy xem như lưu ý, a lv xem trong team coi thế nào th. Không phải tự nhiê
  [22:01] duongdn: uhm a đã nói team tạm dừng xử lí action Giờ có gì thì chui vô xem xét cho kĩ, nc với ổng, chứ ko tự tiện làm nữa
  [22:01] duongdn: * uhm a đã nói team tạm dừng xử lí task Maddy Giờ có gì thì chui vô xem xét cho kĩ, nc với ổng, chứ ko tự tiện làm nữa

### Potential - PPV Form & Scoring Engine — 63 messages
  [10:54] anhnvn: 133 PPV_International_Developer_Brief_RFP_v1_2_EN_QA_REVISED.docx
  [10:55] anhnvn: https://docs.google.com/spreadsheets/d/1X-U8jUmDyMiwxS3HxXvLrU1zK14PAQU8JqGr7FYZdcE/edit?gid=526543282#gid=526543282
  [10:55] anhnvn: Em bày sẵn info thôi, khi nào ready thì em báo nha a Dương ⚠️
  [10:55] duongdn: OK e
  [10:58] anhnvn: https://purepowervrouwen.be/
  [11:04] duongdn: OK, chiều nay a có việc phải xin về sớm, nên nếu được ưu tiên cái này để làm sớm nha Tối a sẽ về trễ nên dê risk ko làm 
  [11:19] anhnvn: Ok e, 5p nữa e xuống distribute luôn nha
  [11:21] anhnvn: E xuống luôn
  [13:46] duongdn: chà
  [13:46] duongdn: dự án ko dễ ăn nha, nhìn nhỏ mà yêu cầu kinh thật
  [13:48] anhnvn: Có gì mình cần discuss thêm ko a Dương. Hoặc trong hnay có 1 trao đổi lại với KH, cũng là để mình update progress cho họ ⚠️
  [13:48] anhnvn: Tối qua khách này mới contact và đưa yêu cầu gửi proposal.
  [13:53] duongdn: ko, a thấy toàn vấn đề kĩ thuật, e dùng role thì để contact vậy, hình như có cả phỏng vấn sau này nữa
  [13:55] anhnvn: Hiện xưng là đại diện 1 team đằng sau ah. Thật ra nếu cần trao đổi gì thì có thể chuyển lời lại. Ví dụ như ngay bây giờ 
  [13:55] anhnvn: Tất nhiên nếu hỏi về chi tiết nội dung bảng hỏi và bộ rule chấm điểm thì họ nói là chưa đưa dc rồi. Ngoài ra thì em nghĩ
  [13:56] anhnvn: Context là khi em gửi proposal, cũng sẽ nói là đại diện team NUS gửi, trong đó có nội dung cấu hình team, mới nhắc đến n
  [13:58] duongdn: ok em
  [14:09] anhnvn: Trước mắt thì dự kiến a Dương thấy có gì trao đổi lại sơ với họ hnay ko?
  [14:11] duongdn: chưa có, vẫn đang nghiên cứu
  [14:17] duongdn: Describe one previous project involving complex scoring, calculations, pricing, decision rules or another deterministic 
  [14:19] anhnvn: Câu đó chắc để em xử. Ko phải dự án PHP nhưng cũng có những dự án  theo dạng lấy câu trả lời từ form / bảng hỏi, xử lí l
  [14:19] anhnvn: * Câu đó chắc để em xử. Ko phải dự án PHP nhưng cũng có những dự án theo dạng lấy câu trả lời từ form / bảng hỏi, xử lí 
  [14:20] anhnvn: https://www.yourbestgrade.com/hesi Cái này mình làm, là nền tảng bài thi thử cho các chứng chỉ y tế gì đó ở Mỹ 😄
  [14:20] duongdn: ngon lành
  [14:32] duongdn: Em có hiểu về cái context_required là gì ko, a đọc hơi lùng bùng
  [14:38] anhnvn: Theo em hiểu thì nó là 1 cái logic nhỏ và behavior để show trên cái trang results.  Ví dụ một người trả lời xong 48 câu,
  [14:39] anhnvn: * Theo em hiểu thì nó là 1 cái logic nhỏ và behavior để show trên cái trang results. Ví dụ một người trả lời xong 48 câu
  [14:43] duongdn: vậy cứ assume vậy nha
  [14:43] duongdn: hay nên hỏi lại ý này?
  [15:10] anhnvn: Em nghĩ note lại là 1 ý hỏi đi, còn tạm thời a cứ assume như vậy để xem tiếp mấy cái khác
  [15:13] duongdn: OK, a sắp về, a sẽ gởi cho e 1 version trước khi về, có gì discuss tiếp qua chát nha
  [15:13] anhnvn: Ok a
  [15:44] duongdn: proposal-260915-ppv-rfp-response.html
  [15:44] duongdn: Đây là bản 1 nha, e xem thử có gì khó hiểu, cần discuss nhắn a, a sẽ thường xuyên móc dt trả lời
  [15:45] duongdn: a nắm cũng khá rõ rồi, cũng tự tin
  [15:45] anhnvn: A thấy WBS bóc tách ra từng đó thôi thì có thiếu ko?
  [15:46] anhnvn: Có mấy ý trong RFP của họ, như là phải có auto/unit test các thứ, cái này mình sẽ cần nắm để tính vào 😄
  [15:50] duongdn: có hết nha e sẽ thấy có 2 phần test trong est
  [08:53] anhnvn: Hqua em có hỏi họ về cái CONTEXT_REQUIRED, họ đã clarified như sau ah. Nhìn chung cũng gần giống cái mình hình dung, liê
  [08:53] anhnvn: A Duong Doan đọc thấy hiểu và có lí ko?
  [08:54] duongdn: để xem
  [08:56] anhnvn: Tóm lại: - Scoring rule logic gì đó dù còn mờ, thì outcome ngoài trả kết quả để show, thì còn trả ra nội dung recommend 
  [09:02] anhnvn: Ngoài ra a Dương đọc thấy đoạn "reverse scoring logic" thì có hiểu dc ko? Em cũng có hỏi bả rõ rồi. Doc viết hơi nguy hi
  [09:06] anhnvn: Đại khái các câu trả lời cho các câu hỏi trên form sẽ là dạng text, là các đáp án chọn sẵn. Nhưng scoring engine sẽ phải
  [09:07] anhnvn: Chưa rõ tại sao lại cồng kềnh thế mà ko map các đáp án cụ thể đó với từng số điểm cụ thể luôn nhưng ý bả trong doc là vậ
  [09:09] duongdn: hiểu, cũng ko có  gì đặc biệt, này theo AI để user tập trung hơn câu hỏi, nếu ko có thể sẽ chỉ chọn 1 đáp án cho phần lớ
  [09:10] anhnvn: * Đại khái các câu trả lời cho các câu hỏi trên form sẽ là dạng text, là các đáp án chọn sẵn. Nhưng scoring engine sẽ ph
  [09:13] anhnvn: Như vậy next step thì: 1. Dương tiếp tục hoàn thiện việc trả lời 14 câu trong doc yêu cầu nha. Có 1 số câu để em thì như
  [09:13] anhnvn: * Như vậy next step thì: 1. Dương tiếp tục hoàn thiện việc trả lời 14 câu trong doc yêu cầu nha. Có 1 số câu để em thì n
  [10:16] duongdn: > Có vài mã câu hỏi cụ thể thì logic thứ tự đáp án với điểm sẽ ngược lại, giá trị điểm sẽ bằng 6-[số điểm gốc]. Cho a hỏ
  [10:17] anhnvn: À là em mới giao tiếp thêm với bả và làm rõ thêm trong chat ah
  [10:17] anhnvn: Nguyên văn để e trích
  [10:17] anhnvn: > For the purpose of preparing your RFP response, you can assume the following: >  >  >  > The assessment contains 48 qu
  [10:18] duongdn: ok, vậy là confirm đúng
  [11:03] anhnvn: * Như vậy next step thì: 1. A Dương tiếp tục hoàn thiện việc trả lời 14 câu trong doc yêu cầu nha. Có 1 số câu để em thì ⚠️
  [11:34] duongdn: proposal-260915-ppv-rfp-response.html
  [11:34] duongdn: a gởi bảng nữa, a thấy cũng ok rồi đó, a review với con AI sáng giờ, thấy hợp lí hết rồi, chỗ nào ko rõ nó đã giải thích
  [11:34] duongdn: est tương ứng cũng đã đưa lên google sheet
  [11:35] duongdn: note, do bên họ có spec test tường minh, ko phải theo công thức của mình, nên a đã bỏ công thức, tự est chi phí tương ứn
  [11:35] anhnvn: Thanks a, để e xem ah.
  [11:15] anhnvn: A Duong Doan, trả lời cho câu #3 hỏi cái scoring engine "live" ở đâu, có nói cái scoring engine là 1 plugin. Ý là mình b
  [11:16] duongdn: đúng rồi
  [11:17] duongdn: 1 wp plugin

### Potential - Wildsoul Wellness — 389 messages
  [08:38] chientx: Hi Anh, Nam and Chien, Thank you for the detailed response, and it’s great to e-meet you! The questions you’ve raised ar
  [08:39] anhnvn: Để em mail ack họ. Thấy cũng nhiệt tình ghê, tính soạn doc phản hồi các điểm của mình.
  [08:39] anhnvn: Mà Yami này là nam hay nữ vậy a Chiến
  [08:40] chientx: nữ nha e
  [08:45] anhnvn: Wildsoul Wellness x NUS.pdf
  [08:46] anhnvn: Có phản hồi của họ cho các trao đổi / câu hỏi của mình nha mn.
  [11:36] duongdn: a đã review qua file Phần mới mình đã đi đúng hướng, họ có hỏi lạị các ý chi tiết hơn Còn phần A thì ko nhớ hồi bữa mình
  [11:43] anhnvn: Phần A là bữa họ raise issue booking ko ok vì nhiều lí do, mình hỏi lại các case cụ thể để xem xét thêm ấy a.
  [11:44] anhnvn: Này chắc chiều mình họp lại discuss cái nha. Em đã xem xong hết doc, giờ cần discuss hướng nên xem gì, trao đổi gì với h
  [11:44] anhnvn: Chiều nay 2h tới 3h có khách phải tiếp, nên chắc 3h hơn mình họp nha a Duong Doan Nam Tran
  [11:44] anhnvn: * Chiều nay 2h tới 3h e có khách phải tiếp, nên chắc 3h hơn mình họp nha a Duong Doan Nam Tran
  [11:45] namtv: OK em
  [11:45] duongdn: OK
  [11:45] anhnvn: Các vấn đề trong doc trước đó từ A tới F, thì có cái F họ skip luôn ko nói gì trong doc lần này, chắc bỏ qua luôn, cũng 
  [14:52] anhnvn: Đã book phòng, vô luôn giờ dc nha anh Duong Doan a Nam Tran
  [14:53] duongdn: dời chút nha nãy e nói hơn 3h nên a đang join meetjng Elena
  [14:53] anhnvn: Ok a, done thì hú
  [15:13] duongdn: xong rồi nha e
  [15:15] namtv: Dzo
  [13:23] anhnvn: 2h Nova, mình họp phát nữa về điểm C và chắc là điểm D, cụ thể mấy cái họ note cần mình assess nha anh Nam Tran Duong Do
  [13:24] duongdn: chắc khoảng 2h30 nha, 2h a có họp khác rồi
  [13:26] duongdn: https://claude.ai/artifact/HiuaiVvKgL3wyY4uXN6hdK#83dfa449-d82e.m0ff5cskq5w.3539 Đây là report về limitation của API MIn
  [13:51] duongdn: https://support.mindbodyonline.com/s/article/203256133-Corporate-Dashboard?language=en_US
  [13:51] duongdn: về cái Dashboard, nó đúng là hàng xịn, Enterprise luôn, thông thường ko vô được đâu ....
  [13:51] anhnvn: 2 cái link này cần sign in ko xem dc a Dương ⚠️
  [13:52] duongdn: MindBody API — Khả năng tích hợp (Report).pdf
  [13:53] duongdn: cái report a chuyển thành PDF còn link của mindbody public mà ta, mới thử dùng trình duyệt ẩn danh
  [14:01] duongdn: https://consoles-incidents-will-theory.trycloudflare.com/
  [14:01] duongdn: a có setup 1 cái demo site nho nhỏ cho vụ payment, e có thể check thêm
  [14:22] anhnvn: Vẫn 2:30 hả anh Dương?
  [14:22] anhnvn: Anh Nam Tran join dc ko?
  [14:23] duongdn: ok  khoảng đó đi
  [14:27] namtv: OK nha
  [14:32] anhnvn: Go nào mn
  [16:44] anhnvn: image.png
  [16:45] anhnvn: A Nam Tran, đọc kỹ lại thì đúng là họ expect trải nghiệm customer trắng tinh chưa có gì và làm mọi thứ từ khâu tạo acc /
  [16:47] anhnvn: Ý này về dụng ý của họ thì như vậy ko cần hỏi lại nữa. Ý exp sign in trên app public ko oke thì cũng có lí, tuy nhiên nó
  [17:13] duongdn: MindBody — Appointment, Credit & Pricing.pdf
  [17:13] duongdn: đây là report về credit/appointment/pricing nha
  [17:13] duongdn: Anh Nguyen:  list lại cho a mấy cái cần tìm hiểu xem a còn thiếu gì ko
  [17:25] anhnvn: Theo cấu trúc các điểm A-E của họ thì: C. 1. Với yêu cầu business như vậy thì nên dung appointments hay class? Hay dùng 
  [20:57] namtv: Vậy thì càng dễ thôi, dễ phân biệt case walk-in (xài trên kiosk là walk-in). Có điều với user thì hơi kỳ, nhất buy pack 
  [21:09] namtv: Cái notification cho Apple Wallet: - Chính xác là mình chỉ tạo push để update pass được thôi, ko phải push notification 
  [08:49] anhnvn: Như trên thì pass này nó đi với cả pack rồi sau đó kiêm luôn việc update từng session được book và gửi push update tương
  [10:41] namtv: Dùng 1 pass được, nhưng nó phải là generic pass, lúc đó mình cần thêm location cho nó nữa. Lúc đó khi vị trí của user tr
  [10:42] namtv: Còn muốn dẹp location thì phải 2 loại pass. 1 generic pass cho pack và 1 ticket pass cho mỗi visit
  [10:49] duongdn: > Có khái niệm credit để trừ các mức khác nhau khi sử dụng dịch vụ trong Mindbody ko? - Để phục vụ cái Dynamic Pricing. 
  [10:49] duongdn: > Check việc export data từ Dashboard sẵn có trong Mindbody như thế nào? Này ko được nha, mình ko có vô được Corporate D
  [11:04] duongdn: > Từ API được ko và tới đâu A mới kiểm tra thử thì mình có thể lấy được hết các dữ liệu dùng để tính toán các ý họ nêu t
  [13:25] duongdn: Ý này thì thế này ==================================================== CHỌN CLASS ======================================
  [15:24] chientx: Discuss qua lại, chốt sao NA? Next step là gì vậy e?
  [15:24] chientx: * Discuss qua lại giờ chốt sao NA? Next step là gì vậy e?
  [15:25] chientx: Những câu hỏi thắc mắc gì đó cho phía bả thì nên hẹn họp với bả để discuss xử lý luôn. Cái nào đã rõ ràng thì mình chốt 
  [15:27] anhnvn: Hqua thì em có back lại một số câu hỏi cho họ để mình rõ hơn về một số ý.  Cũng có hẹn là mình sẽ back lại hoàn chỉnh bằ
  [15:27] chientx: Khi nào back lại họ document trả lời vậy e?
  [15:33] chientx: ngoài những cái mình đã hỏi, còn lại đã rõ hết chưa e?
  [15:33] anhnvn: Cũng chưa phải rõ hết a, nhưng vấn đề ko rõ ko phải là việc mình hỏi họ, mà là mình phải xem và check thêm.  Hiện thì cò
  [15:35] chientx: A muốn nay gửi lại doc cho họ và hẹn họp, được ko e? Mục D này chỉ là requirements hay technical, cần a Năm/a Dương disc ⚠️
  [15:36] chientx: Tiết kiệm time cứ phải discuss qua lại nữa
  [15:38] anhnvn: Nhìn chung ko phải chỉ mục D, mà toàn bộ yêu cầu của họ là về mặt Business, và giải pháp của mình liên quan hoặc custom 
  [15:38] anhnvn: * Nhìn chung ko phải chỉ mục D, mà toàn bộ yêu cầu của họ là về mặt Business, và giải pháp của mình liên quan hoặc custo
  [15:40] anhnvn: Việc hẹn họp thì cũng cần xác định là nói cái gì, dựa trên cơ sở là với các vấn đề họ đưa ra, mình có ý tưởng gì có thể 
  [15:40] chientx: Qua chỗ a xíu
  [15:56] chientx: Tạm thời theo phương án: + Chốt theo từng phần module, phần nào discuss sâu thì tập trung phần đó, sau khi đã xong, có p
  [16:52] anhnvn: Em tổng hợp các ý mình đã tổng hợp, thảo luận và có cả info từ AI research cho các điểm A-C trước ở đây nha mn: https://
  [16:52] anhnvn: Sẽ còn bổ sung thêm các điểm D và E, chắc là E sẽ tới trước vì mình cũng đi qua rồi.
  [16:53] anhnvn: Cấu trúc từng điểm nhìn chung là (ko hoàn toàn giống nhau nhưng cũng có điểm chung) - Cái mình propose, tương đối chắc -
  [17:01] chientx: a Năm, a Dương có gì xem comment trên đó, rồi báo lên phần nào đã comment xong nha mn. ⚠️
  [17:21] anhnvn: Cái demo tool migrate a Dương host lên đâu mà sao tèo nhanh thế 🤔
  [22:44] duongdn: cái này ở local máy bàn a, a làm nhanh để check thôi nên ko có đưa lên ...
  [23:07] namtv: Anh đã comment. A, B chắc tương đối rõ rồi, còn confirm của Dương về cái cancel contract thôi C thì nhiều cái "What NUS  ⚠️
  [23:19] duongdn: a comment xong rồi nha, có hỏi lại mấy ý Cái doc này sao có vẻ như nhiều câu hỏi là AI nó đưa vào chứ ko phải dựa trên m
  [07:52] chientx: như a Dương nói thì thấy vấn đề rồi đó NA, mình discuss nhiều quá thì sẽ ko thể chốt được -> giờ càng phải chốt theo từn
  [09:42] chientx: Email mới của KH chưa trả lời NA. Giờ a muốn setup họp hàng ngày discuss dứt điểm từng cái đi e
  [09:42] chientx: Quyết liệt vào
  [10:04] anhnvn: 11h Nova dc ko a Duong Doan Nam Tran  Aim: - Finalize điểm A tới C: xử lí các comments. Có thêm 1 số info mới từ họ qua 
  [10:04] anhnvn: * 11h Nova dc ko a Duong Doan Nam Tran Aim: - Finalize điểm A tới C: xử lí các comments. Có thêm 1 số info mới từ họ qua
  [10:04] anhnvn: * 11h Nova dc ko a Duong Doan Nam Tran Aim: - Finalize điểm A tới C: xử lí các comments. Có thêm 1 số info mới từ họ qua
  [10:05] anhnvn: Mn suggest khung giờ khả thi nếu trên ko ok luôn nha
  [10:05] duongdn: e muốn ưu tiên cái này hay là video interview, a đang chuẩn bị start cái video BTW, a thấy thường họp rất nhiều, nên 1h 
  [10:07] anhnvn: Video thì vẫn phải ưu tiên gửi sớm a. Bên này thì em thấy cứ start sớm, cần thêm time thì chiều tiếp thôi.
  [10:09] duongdn: OK vậy h nào cũng được
  [10:09] namtv: Anh OK nha
  [10:32] duongdn: https://sticks-cubic-safari-republican.trycloudflare.com/
  [10:32] duongdn: mở lại cái link demo rồi nè
  [10:56] anhnvn: Go nha mn
  [13:16] chientx: cần có msg ACK phía KH trước nha NA
  [13:35] anhnvn: Anh Dương có mấy điểm cần check ở C, mấy vđ mới, note vào trong doc luôn nha. Em có note lại chỗ mấy vấn đề đó liên quan ⚠️
  [13:37] duongdn: OK
  [13:51] duongdn: A có trả lời 1 số câu hỏi nha
  [14:34] chientx: Status sao rồi NA? Giờ đang làm gì tiếp e?
  [15:25] anhnvn: Hiện đang tổng hợp lại các phần ở C (có ý mới). Còn D thì chưa đi qua, cần team tự xem trước rồi discuss tiếp ah.
  [15:25] anhnvn: @4h họp thêm phát dc ko a Nam Tran Duong Doan
  [15:27] namtv: OK nha
  [15:29] duongdn: OK e
  [15:59] anhnvn: Go nha mn
  [17:01] duongdn: ..
  [17:11] anhnvn: Các điểm cần phản hồi doc của họ coi như đã chốt xong. Next step: xử lí WBS để rough est cho A B C. E có thể xem xét. D 
  [17:18] chientx: Vậy D định sao e?
  [17:19] anhnvn: Sẽ trao đổi rõ lại trong văn bản phản hồi là cần thêm info gì với họ thôi ah.
  [17:35] chientx: Sao mình ko hẹn họp với họ luôn em?
  [17:36] anhnvn: Em vẫn nghĩ là sẽ hẹn họp cụ thể khi xong cái văn bản trả lời luôn ah. Đúng ra chắc với info hnay thì mai phản hồi dc rồ
  [21:09] chientx: Sao mình ko làm song song, cứ hẹn họp discuss những cái chưa rõ, còn cái nào đã rõ thì làm WBS e? Sao phải làm tuần tự?
  [21:09] chientx: Yêu cầu của a: mình làm sao unblock hết các vấn đề nhanh nhất có thể
  [21:10] chientx: Không thể đã xác định cái chưa rõ, cần hỏi thêm nhưng cứ để đó được
  [21:10] chientx: Phản hồi báo họ rõ status và hẹn họp liền cho a đi e
  [23:07] anhnvn: Việc dựng WBS là thứ em phải làm tiếp theo thôi, ko phải là do có gì đó chưa rõ còn block lại ah, ở đây là với nhu cầu ở
  [08:41] chientx: ủa có gì đâu ko phù hợp ta Báo rõ các phần nào đã rõ, team đang phân tích và estimate để cho quote cho bả. Có phần này c
  [08:41] chientx: * ủa có gì đâu ko phù hợp ta Báo họ các phần nào đã rõ, team đang phân tích và estimate để cho quote cho bả. Có phần này
  [08:42] chientx: > ko phải là do có gì đó chưa rõ còn block lại ah,  E nói ở trên phần D còn chưa rõ để estimate mà
  [08:51] chientx: sao NA? Giờ yêu cầu của a là làm sao để rõ phần D để estimate sớm nhất có thể, đơn giản vậy th. Còn phương án của em lại
  [09:11] anhnvn: Ở đây estimate ko phải đã là quote, nó là một phần của những trao đổi, định hướng lại của team dựa trên các yêu cầu của 
  [09:39] chientx: > Cụ thể vấn đề ở D ko phải là mình chưa rõ nó phải làm gì luôn. Cái khiến estimate chưa có ý nghĩa là độ phức tạp của m
  [09:40] chientx: Ý e là giờ vẫn phản hồi 1 số ý cho D, còn riêng phần est cho D thì chờ bả phản hồi các ý đó lại rồi mới est được, đúng k
  [09:41] chientx: Nếu vậy thì còn chấp nhận được. Chứ a sẽ ko OK nếu đi bỏ qua nguyên phần đó rồi đợi phản hồi hết mấy phần khác mới bắt đ
  [09:42] anhnvn: Mỗi phần đều có các ý để phản hồi a.  Hiểu đơn giản thì cái doc của họ chia các main points ABCDEF, mỗi cái có nhiều ý c
  [09:43] chientx: OK e
  [09:45] chientx: Nhưng ít nhất dựa trên timeline e dự kiến thì cũng nên hẹn bả meeting luôn đi e, đâu phải hẹn cái là meeting liền đâu. V
  [13:27] anhnvn: https://docs.google.com/spreadsheets/d/1_7VIeCNKV4sDzcMFtHawOA6Rr_Z8APuh-V07e5vT7HM/edit?gid=313361194#gid=313361194 Anh ⚠️
  [13:40] duongdn: có bug gấp bên Sandor nhưng Long off nên giờ a cần nhảy vô xử lí nha, cái này chắc coi sau
  [14:10] chientx: cái này chỉ a coi được hay sao a Dương? Ngó sắp xong chưa a?
  [14:22] duongdn: này lỗi do đụng package trên server, này dùng auto deploy nên ko có nhiều access, để hỏi kĩ team xem sao lí thuyết thì a
  [14:23] namtv: Bên đó có LongVV, bạn ko xem được hả?
  [14:24] namtv: Ah, off chiều nay
  [14:24] chientx: Update status cho họ và hứa hẹn gì đi NA
  [15:32] chientx: Bug xong chưa a Dương?
  [15:34] duongdn: chưa rõ, mới đưa lên nhờ họ thử thôi, mình ko có quyền deploy
  [15:35] chientx: vậy a đang coi WBS NA gửi phải ko?
  [15:37] duongdn: uhm
  [15:37] duongdn: Nam Tran:  Mấy cái wallet có support cái này ko View current visit and finish-time details on the pass
  [15:40] anhnvn: Quên, hình như cái trên a Năm đã chốt là pass ko có khái niệm liên quan, ko coi finish time dc. Nhưng coi start time thì
  [15:45] namtv: Cái pass dạng này là ko có show ngày gì ráo, cái ngày mình set là để tự hiện lên lock screen thôi. Mà dòng trên ở đâu ra
  [15:48] namtv: Giờ muốn có thì phải đưa vào secondaryFields, tới giờ thì server send push xuống Wallet. Tuy nhiên chú ý ko có đảm bảo đ
  [15:48] namtv: * Giờ muốn có thì phải đưa vào secondaryFields, tới giờ thì server send push xuống Wallet. Tuy nhiên chú ý ko có đảm bảo
  [15:51] anhnvn: Dòng trên là 1 dòng em thêm vào WBS ah. https://docs.google.com/spreadsheets/d/1_7VIeCNKV4sDzcMFtHawOA6Rr_Z8APuh-V07e5vT
  [15:52] namtv: Chắc đừng chế thêm... Cái Wallet thường ko dùng như vậy
  [15:53] namtv: Nếu thấy nó hay thì có thể note để thành phase sau, còn phase này chắc theo sát yêu cầu trước đi
  [15:55] anhnvn: Cái pass đó nếu hiểu là 1 cái trong custom app, thì chắc mình muốn thế nào cũng được, bao gồm cả việc view thông tin nói
  [15:55] duongdn: chính xác à
  [15:58] namtv: Nếu show dạng khác, ko phải real-time dạng current visit thì chấp nhận được. Ngay khi book là push xuống luôn, dạng như 
  [15:58] namtv: * Nếu show dạng khác, ko phải real-time như current visit thì chấp nhận được. Ngay khi book là push xuống luôn, dạng như
  [16:10] namtv: image.png
  [16:10] namtv: Dạng như này
  [16:24] namtv: Dương chú ý nếu làm như trên thì phải có các thời điểm push update xuống cho pass - Khi user book time: tính lại xem boo
  [16:24] namtv: * Dương chú ý nếu làm như trên thì phải có các thời điểm push update xuống cho pass - Khi user book time: tính lại xem b
  [16:26] namtv: Theo anh thì vẫn là dẹp mịa đi cho đơn giản ở phase đầu, ko biết budget, timeline họ sao thì nhẹ nhàng trước có vẻ sẽ ch
  [16:27] anhnvn: Ok ah. Skip việc view time của booking sắp tới trên pass trong phase này. Pass dùng để checkin khi tới, với có cái vụ tớ
  [16:29] namtv: Cái tới nơi, gần giờ tự show thì ở backend bản chất là khi có booking mới thì push xuống pass update field `relevantDate ⚠️
  [16:30] namtv: Cái push này thì phải làm thêm một số API để nhận push token các thứ từ Apple nha Dương. Hỏi AI quy trình làm để biết đủ ⚠️
  [16:32] duongdn: ok nha, tạo pass thì làm bên Rory rồi, cũng có chút kinh nghiệm
  [16:32] namtv: uhm, lằng nhằng chỗ push thôi
  [16:33] namtv: Ngoài ra, cần có config location của từng studio. Cái này ko rõ sẽ nằm ở đâu, Mindbody có hay lại phải có trang config t
  [16:33] chientx: Ủa, cái này có liên quan mobile gì ko? Có cần hú Minh coi chung ko?
  [16:34] namtv: Ko có app mobile. Chỉ có cái tạo pass cho Wallet thôi, có mấy chú ý thì anh nói trên rồi
  [16:45] namtv: Google Wallet thì việc hiển thị cũng làm được tương tự. Nhưng ko có cái vụ tới giờ, đúng địa điểm thì tự show nha. Nó có
  [16:46] duongdn: à còn Google nữa , để update
  [17:05] duongdn: A update xong est rồi nha Anh Nguyen
  [21:56] chientx: Anh Nguyen:
  [21:56] chientx: Miss msg nhiều quá e...
  [22:02] anhnvn: 
  [08:50] anhnvn: Họ còn hỏi thông tin về ongoing cost, trong đó có hosting, support, và Mindbody API fee. Hosting, a Nam Tran cho em 1 no
  [08:54] duongdn: a ko có info về cost của Mind Body nha, theo lí thuyết thì ko có extra cost gì cả , chỉ lấy những cái họ đang dùng để là
  [08:54] chientx: có cost
  [08:54] chientx: hỏi chi tiết bên Minh nha NA
  [08:55] namtv: Có, nhưng nó là existing cost, bao nhiêu thì họ đang trả vậy rồi
  [08:55] namtv: Mình ko dùng thêm gì mới cả
  [08:56] chientx: của mình làm nó không phát sinh thêm API call phải ko? Do hình như ku Minh nói nó theo package/tier, vượt qua mức thì tí
  [08:56] anhnvn: On going cost trước mắt e thấy có thể liên quan: - Hosting - này thì hẳn rồi - AI cho agent ở A - chắc phụ thuộc usage n
  [08:57] anhnvn: Để e hỏi Minh cái xem sao
  [09:01] namtv: Thằng Mindbody ăn dày vậy ta 😐️ Tính cả trên request
  [09:11] namtv: Hosting đưa 2 options đi: Assuming we use AWS for hosting: - Simple: a single server for everything, about $50/month - P
  [10:05] anhnvn: Đã tổng hợp xong doc, giờ em gửi họ.
  [10:09] anhnvn: Draft hoàn thiện đang ở đây luôn, cùng link cũ ah: https://docs.google.com/document/d/15zvThU-7W5nuWRQAwtffEd2fYbUp4Mugy
  [10:13] namtv: >The final cost will depend on capacity, backups and traffic. Bỏ cái này đi, dạng app này ko scale gì đáng kể đâu >thêm 
  [10:13] namtv: >Mindbody also publishes separate consumer-booking charges of US1.30perclassbookingandUS2.50 per appointment booking. We
  [10:14] namtv: Mỗi appointment hết $2.5 thì hơi khoai 😐️ Nhưng có vẻ mình đâu còn cách nào khác để có history booking cho collective p
  [10:14] anhnvn: > > The required pass-issuing access and setup remain to be confirmed. >  > Này là gì em? Này là liên quan việc tạo ra n
  [10:17] duongdn: uhm, này như phí mỗi transaction luôn rồi, mà sao cao dữ vậy ta ...  cái này chắc họ đã aware rồi, khi dùng branded app
  [10:19] anhnvn: image.png
  [10:19] anhnvn: Cái đó em thấy ở đây, ko biết e hiểu đúng ko nữa
  [10:20] anhnvn: Tính ra appointment booking giá cao hơn class booking 🤔
  [10:20] namtv: Với appointment bình thường thì chắc ko phải vấn đề lắm. Còn mình dùng nó để làm cái Collective Pass thì nhìn có vẻ hơi 
  [10:21] namtv: Dương xem cái virtual booking là gì, phù hợp ko
  [10:23] chientx: Mấy số giờ trong đó làm tròn hết đi NA. Khỏi để mấy kiểu như 47.1 Khi đã rough estimate thì để lẻ vậy đâu có ý nghĩa nhi
  [10:23] chientx: * Mấy số giờ trong đó làm tròn hết đi NA. Khỏi để mấy kiểu như 47.1h Khi đã rough estimate thì để lẻ vậy đâu có ý nghĩa 
  [10:27] chientx: mà đoạn text cuối sao format lộn xộn, chữ dính nhau vậy NA?
  [10:27] anhnvn: Trong bản word em đang soạn nó ko bị mà cứ copy lên google doc là nó bị vậy, e cũng chưa hiểu 😲
  [10:28] anhnvn: PDF in ra thì cũng ko sao.
  [10:29] chientx: We cannot yet determine whether they apply to the proposed Collective booking flow. -> lý do là gì nhỉ? Mình ghi vầy thì
  [10:30] namtv: Anh có nói bên trên đó, cái này mình phải coi để khẳng định
  [10:30] namtv: Ko ghi vậy được
  [10:30] anhnvn: E chưa chốt gửi đâu, để a Dương coi thêm đã.
  [10:32] namtv: Vậy thì em nên mark rõ, để vậy dễ miss lắm. Như cái message của em cũng kêu anh coi chứ có nói Dương coi đâu...
  [10:34] anhnvn: À, do em thấy a có nhắn a Dương và a Dương đang check rồi... ⚠️
  [10:39] chientx: Mn đọc full lại kỹ hết nha, ko chỉ đọc 1 phần cụ thể. Cùng xem coi có bị sai sót ở đâu ko
  [10:43] chientx: Có chỗ này > A. Booking eligibility and diagnostics Responding to Wildsoul’s request for clearer booking-failure diagnos
  [10:43] duongdn: Về virtual booking, nó hiện là 1 cái option của service, nếu service này online, livestream thì chọn option này, sau khi
  [10:44] duongdn: * Về virtual booking, nó hiện là 1 cái option của service, nếu service này online, livestream thì chọn option này, sau k
  [10:45] chientx: > vì nó dễ implement hơn cho mình, Mình cần suy nghĩ giải pháp phù hợp tốt nhất cho KH, chứ ko phải dễ implement cho mìn
  [10:48] anhnvn: > Giờ đổi lại theo hướng implement theo class kịp ko ta Nếu cần thì mình bổ sung thêm thôi a.  Trong doc, em đang diễn đ
  [10:48] anhnvn: * > Giờ đổi lại theo hướng implement theo class kịp ko ta Nếu cần thì mình bổ sung thêm thôi a. Trong doc, em đang diễn 
  [10:50] namtv: Ko được. Muốn can thiệp vào thì chỉ có thể làm custom app thay cho branded app (branded app là app closed source của Min
  [10:53] anhnvn: Hay bây giờ cứ nói về chi phí đó, theo assumption của mình là dùng appointment? Để họ cân nhắc đã.
  [10:54] anhnvn: Tất cả là để facilitate các thảo luận xa hơn. Giờ ko có cái hoàn hảo. Mà mình cũng ko kéo lâu quá dc.
  [10:54] chientx: Chắc mình cứ nêu ra như 1 note trong đó, tức cho họ biết mình aware việc đó, biết đâu trong đầu họ có thể có những thứ k
  [10:54] duongdn: > Mà quan trọng là về tính năng cơ, có đáp ứng dc ko. Ko phải chỉ để xử lí book thông thường cho collective, mà còn theo
  [10:56] chientx: Mà sâu xa hơn cái họ muốn là không có lỗi thì càng tốt. Ko biết mấy lỗi dạng này là do đâu nhỉ? Làm custom app sẽ giúp h
  [10:56] duongdn: AI: suggest deepseek, chắc cần nói thêm về vụ security, này bên châu Âu phải ko ta, họ rất consider về bảo mật
  [10:57] namtv: Ko hạn chế lỗi tối đa nha, có thể còn nhiều lỗi do code hơn. Cái họ thường bị là do config trên Mindbody admin sai chứ k
  [10:57] namtv: Deepseek có nhiều provider có đầy đủ no data retention, no training
  [10:58] chientx: Ví dụ giờ config ko làm trực tiếp trên admin Mindbody nữa, hạn chế tối đa. Config gì thì qua 1 layer trung gian, kiểm so
  [10:58] anhnvn: "Lỗi" họ mô tả thật ra đến cả từ config sai trong hệ thống gây mâu thuẫn, làm user ko book được. Trong mấy ví dụ họ đưa 
  [11:00] anhnvn: Giờ ngay cả khi build cả 1 custom app hoàn toàn để tự chủ việc bắt lỗi, thì mình cũng ko chắc error API của Mindbody trả
  [11:01] duongdn: Để đỡ rối thì mỗi phần nói trong 1 thread đi mn
  [11:01] duongdn: Anh Nguyen:  Vụ offline data a có estimate e  hok include vô à, doc mới họ bỏ cái vụ đó rồi à?
  [11:02] anhnvn: Offline data trong WBS gửi kèm, em vẫn để mà ta. Con số ko đổi
  [11:02] anhnvn: Trong doc thì em mô tả cho cả cụm vắn tắt thôi.
  [11:05] anhnvn: Là dòng offline mode trong cái C phải ko a Dương? Là cái đó thì em vẫn để nha, ko thay đổi gì. Trong doc họ cũng nói mìn ⚠️
  [11:07] duongdn: ok nha, a đọc lại, đã include rồi
  [11:10] namtv: E - Member Engagement Dashboard Cái này có vẻ đang assume mình tự lấy data làm report hả Duong Doan ?
  [11:11] namtv: (thay vì lấy export data)
  [11:11] namtv: * (thay vì lấy export data từ corporate dashboard)
  [11:12] duongdn: cả 2,  nêu có est thêm cả phần lấy data về cho nhanh, rồi đối chiếu với data corporate dashboad rồi xử lí thêm
  [11:13] namtv: Chưa hiểu đối chiếu data gì 😐️ Nếu export có rồi thì đối chiếu gì nhỉ? Nghi ngờ export sai?
  [11:14] namtv: Chỗ này quan trọng, do nó tính phí trên API request, hướng tự get data có thể chi phí sẽ cao (chưa rõ cần query nhiều ch
  [11:15] namtv: Nói chung đã assume theo hướng họ export rồi ném vào để tạo report thì ko call API gì nữa (assume data đủ, hiện tại họ c
  [11:18] namtv: Với cái report chắc NA có distribute gì riêng cho Dương phải ko? Chứ nhìn vào cái WBS anh ko hiểu nổi các dòng làm gì và
  [11:19] duongdn: > Chưa hiểu đối chiếu data gì Do cũng ko biết bên kia nó có những data gì nên assump là cần đối chiếu á ...
  [11:20] namtv: Assume hơi dị đó... Nếu coi data query ra là source of truth thì query thôi chứ lấy export data làm gì nữa để phải đi đố
  [11:21] namtv: Và nó chả có gì để đối chiếu cả. Thời điểm export nó khác thời điểm query, đối chiếu kiểu gì 😐️
  [11:21] duongdn: Sai thì chắc là ko, nhưng có đủ hay ko thì chưa rõ, nên mới assume là cần data từ API để bổ sung
  [11:21] anhnvn: WBS em breakdown theo kiểu mình tự query data và biến đổi nha. Ko có dòng import excel csv gì vào cả. Mà trước đó thì em ⚠️
  [11:22] namtv: 2 đứa assume khác nhau về nguồn data rồi đó. Và ko có distribute gì thì 99% mấy cái hình dung về report này đang khác nh
  [11:22] namtv: >Sai thì chắc là ko, nhưng có đủ hay ko thì chưa rõ, nên mới assume là cần data từ API để bổ sung  Mình phải assume cái 
  [11:23] namtv: Giờ assume theo hướng export csv cho mình, data có đủ để làm report đi, ko có API gì cả
  [11:23] anhnvn: Để em update WBS
  [11:28] namtv: Mấy cái như off-peak, dynamic pricing, auto release walk-in slot đâu ta?
  [11:30] namtv: Rồi push update pass nữa
  [11:30] anhnvn: Ý a là ở trong WBS ah?
  [11:30] namtv: uhm
  [11:31] namtv: Em có thể trả lời đã included đâu đó nhưng nó ko phù hợp đâu. Nhiều cái anh nhìn WBS thì khả năng cao Dương chưa có esti
  [11:33] anhnvn: Mấy cái đó ko phải là tính năng từ view người dùng nên em ko để dòng riêng trong WBS. Cái đó đúng thì phải nằm trong ass
  [11:34] anhnvn: Tương tự với cái push update pass. Em thấy a Dương có trao đổi với a Năm, nên hình dung là có effort xử lí việc đó trong ⚠️
  [11:35] namtv: Ko, receive pass là chỉ tạo ra cái pass ban đầu. Mỗi booking sẽ phải update nó. Và nếu có làm cái next booked time gì đó
  [11:37] duongdn: về receive pass a đã có est, trong lúc hôm qua em discuss với a Năm về việc update thì a có est theo hướng a Năm nói  Nh
  [11:38] anhnvn: Ko em ko thay đổi gì cả. Có 1 dòng receive pass nằm trong cái lớn hơn là Join collective thôi
  [11:38] duongdn: > Ví dụ, dynamic pricing, và người mua gói off peak cần book slot peak, thì nó cần dc assume trong cái purchase single v
  [11:40] namtv: Coi kỹ lại nha. Tao ko tin số giờ đó làm được mớ việc này đâu
  [11:40] namtv: Dynamic pricing, tạo discount dynamic, rồi admin set được rule các thứ...
  [11:40] duongdn: image.png
  [11:40] namtv: Off-peak cũng là set luôn, từng site cũng khác nhau
  [11:41] duongdn: > View current visit and finish-time details on the pass
  [11:41] duongdn: dòng đó đã biết mất trong file hiện tại
  [11:41] duongdn: * dòng này đã biết mất trong file hiện tại
  [11:43] namtv: Dòng đó là nó chế ra, có vẻ chốt ko làm nữa nên dẹp là đúng rồi. Nhưng vẫn cần push update relevantDates như tao có nói 
  [11:44] namtv: Các đồng chí có quên chuyện config dynamic pricing, off peak các thứ ko thế? 🤔
  [11:45] namtv: Chắc phải xem kỹ lại, revise rồi họp review chung cả cái doc và WBS quá
  [11:50] anhnvn: Em đã update cái WBS chỗ E - cái report nha a Duong Doan. https://docs.google.com/spreadsheets/d/1_7VIeCNKV4sDzcMFtHawOA
  [11:50] anhnvn: 1:30 chiều nay mình họp review lại WBS và doc nha a Nam Tran Duong Doan
  [11:51] namtv: Mấy cái anh nói bên trên thì xem revise trước đi rồi chiều review
  [11:52] namtv: Mấy cái ko có dòng riêng, cũng chả có assumptions, đảm bảo nhiều thứ miss
  [11:53] duongdn: OK
  [11:54] duongdn: nhưng chắc cần time review lại nhỉ, nên trễ chút, xong rồi mới họp
  [11:54] namtv: uhm
  [13:46] anhnvn: Hiện WBS em đã update: Điểm E: revise theo hướng run report từng lần bằng cách import data họ export từ Mindbody. Các mô
  [13:47] anhnvn: Như vậy next step em nghĩ: - A Duong Doan xem và update estimate cho C và E.  - Khoảng 2:30 ta họp lại review cả doc và 
  [13:49] anhnvn: * Hiện WBS em đã update: Điểm E: revise theo hướng run report từng lần bằng cách import data họ export từ Mindbody. Các 
  [13:59] duongdn: để xem
  [14:02] namtv: Anh thì OK
  [14:04] duongdn: Phần E:  Backup local data for past reports review: cái này là sao ta, thấy nó được est luôn
  [14:05] anhnvn: Cái đó em update lại từ est trước đó. Dòng gốc nó là Backup local data for faster reports. Em quên chưa remove con số es
  [14:07] duongdn: như trên thì mình ko cần fetch data từ API nữa, chỉ sử dụng data trong file export nên xóa luôn nha  này chỉ dùng để tăn
  [14:08] anhnvn: Em sẽ update lại để có thêm dòng tính năng đó.
  [14:08] anhnvn: Mình nên có 1 chỗ để coi lại past report đã run. Cũng cần xử lí save gì đó dù bản chất ko phải như cái trên.
  [14:12] duongdn: OK
  [14:27] duongdn: A update est rồi nha, có thể họp
  [14:28] anhnvn: Nova nha mn
  [16:54] anhnvn: Tóm lại sau review cả WBS và doc, còn các điểm cần check và update, chưa hoàn thiện gửi được.  Anh Duong Doan xem các co
  [16:55] duongdn: OK e
  [16:56] chientx: Giờ chốt phải mai gửi nha, chứ ko kiểu để đó 50/50 rồi mai dời lại đâu. Giờ bắt buộc mai phải gửi. Trái banh cũng chỉ đa
  [16:57] anhnvn: Em nghĩ là kịp ah
  [17:05] chientx: Tức msg cũng phải khẳng định mai gửi, chứ không chơi kiểu "hopefully" đâu nha
  [17:05] chientx: a muốn như vậy cho quyết tâm rõ ràng
  [17:05] anhnvn: Em có gửi mail rồi ah. Wording trong mail là "aim to" nhưng cũng ko phải là hopefully, à uôm gì đâu. Mai là gửi.
  [17:08] chientx: Giờ nhiệm vụ đang ở a Dương phải ko? Confirm vụ mai mình cần gửi cho KH nha a Dương, nên ráng xử lý những gì đang ở chân ⚠️
  [17:08] duongdn: OK e, tối tiếp tục
  [22:33] duongdn: Anh Nguyen:  Nam Tran  Về 1 số ý cần check lại cho est Vấn đề dùng class được ko,  được, gần như y chang apointment, tát
  [22:49] namtv: Data availability các thứ thì trên app mình cả nên gap chắc ko sao. Còn họ tự tin tỷ lệ cancel thấp thì tạo luôn cho nhẹ
  [22:51] namtv: Cái class thì có 2 điểm chính: 1. Khi mua pack thì mua thế nào 2. Visit history có ko, cụ thể là gì (như dùng appointmen
  [22:54] namtv: >Về mấy status của apointment và class, mình có tương ứng updateAppointment và removeClientToClass Cái này cũng chưa rõ.
  [23:17] duongdn: > Khi mua pack thì mua thế nào Mình dùng API checkoutshopingcart, cho cả case class hay apointment,  https://developers.
  [23:24] duongdn: > Visit history có ko, cụ thể là gì (như dùng appointment thì mỗi visit là 1 appointment trên Mindbody) https://develope
  [07:13] namtv: Vậy cuối cùng được ko? Như status, nhìn qua API update visit thì chỉ thấy field Execute là hơi liên quan miếng nhưng cũn
  [08:17] duongdn: có map mà y  chang bên apoinment dùng thêm field signed in
  [08:19] namtv: Map sao nhỉ? Tao thấy có possible values vậy thôi mà: Cancel Latecancel Unlatecancel
  [08:20] namtv: Chú ý history ở đây là họ xem trên Mindbody, ko phải app mình, mình ko cook kiểu mapping như Latecancel = No Show được
  [09:11] namtv: Có brainstorm chút với AI thì thằng Mindbody làm hơi khó hiểu, add client to class là nó tạo visit luôn chứ ko như tao n
  [09:14] duongdn: mới coi lại, bên apointment cũng ko có cái no-show
  [09:14] duongdn: Apointment Execute The action taken to add this appointment. Possible values are: confirm, unconfirm, arrive, unarrive, 
  [09:15] duongdn: Visit The execute code used to update this visit. Possible values are: Cancel Latecancel Unlatecancel Có thêm: Signed In
  [09:15] duongdn: * ---- Visit The execute code used to update this visit. Possible values are: Cancel Latecancel Unlatecancel Có thêm: Si
  [09:15] duongdn: vậy cũng xem xem nhau rồi hỉ ...
  [09:16] duongdn: * --- Visit The execute code used to update this visit. Possible values are: Cancel Latecancel Unlatecancel Có thêm: Sig
  [09:24] namtv: Chậc, thằng MIndbody quá oải, document thì nó có list khác, API khác, Appointment trên document của staff có No Show, cl
  [09:29] namtv: UI Visits của nó: https://support.mindbodyonline.com/servlet/rtaImage?eid=ka0Pr000001l1w9&feoid=00N3i00000D6QL1&refid=0E
  [09:34] anhnvn: Với info đến giờ thì về vấn đề C - class hay appointment chắc vẫn chốt như sau khi trao đổi lại họ nha mn? - là vẫn pref
  [09:35] anhnvn: Các chi tiết về cách làm chắc để sau, giờ mình bàn sâu vào thì tốn nhiều thời gian, mà mình cũng ko quyết định dc
  [09:36] anhnvn: Về việc xử lí no show / cancel có khả năng cho phép cộng lại lượt, như finding ở trên thì em đọc chưa rõ lắm là được hay
  [09:37] anhnvn: * Về việc xử lí no show / cancel có khả năng cho phép cộng lại lượt, như finding ở trên thì em đọc chưa rõ lắm là được h
  [09:37] namtv: Được. Nó có cho set cancel policy, cả 2 cái đều có. Thỏa policy thì trả lại lượt, ko thỏa thì mất
  [09:38] anhnvn: Oke, như vậy về ý no-show, chốt là chỉ trao đổi với họ về việc muốn rule thế nào thôi, còn lại xử lí được.
  [09:40] namtv: >là vẫn prefer làm toàn bộ bằng appointment Có cái khó là nếu như bên trên, thực ra appointment và class ko khác nhau nh
  [09:42] duongdn: uhm,  gần như y nhau, như tối có phân tích, nó thực ra là 2 biến thể của 1 cái program Nếu làm đúng best pratice có khi 
  [09:45] anhnvn: Hướng trao đổi vậy thì: 1. Nếu thật sự chắc, mình note prefer class luôn, nói rõ ngoài hạn chế phải tạo sẵn gì đó thì ef
  [09:45] anhnvn: * Hướng trao đổi vậy thì: 1. Nếu thật sự chắc, mình note prefer class luôn, nói rõ ngoài hạn chế phải tạo sẵn gì đó thì 
  [09:45] anhnvn: Hiện mn thấy sao?
  [09:47] namtv: Anh prefer #1
  [09:48] namtv: Còn cái single-visit thì sao Dương? Bản chất có phải là tạo 1 contract khác (ko phải recurring), cũng link với mớ class 
  [09:49] duongdn: giải thích trên òi mà :D
  [09:49] duongdn: > Về structure, Mindbody có 1 cái gọi là program, nó sẽ tương ứng với cái dịch vụ mình cung cấp, nó sẽ có cái gọi là Sch
  [09:49] duongdn: * > Về structure, Mindbody có 1 cái gọi là program, nó sẽ tương ứng với cái dịch vụ mình cung cấp, nó sẽ có cái gọi là S
  [09:50] namtv: Ý mày là drop-in là cho single-visit?
  [09:50] duongdn: uhm, drop-in cho single visit, còn series cho pack
  [09:50] anhnvn: Lưu ý là việc class hay appointment là đã phải cân nhắc cả tính khả thi của những cái mới sau: single visit purchase, dy
  [09:50] duongdn: * uhm, drop-in service  cho single visit, còn series service cho pack
  [09:51] duongdn: Này tối quên report, price cũng y chang luôn, tương tự nó gắn vào cái programe
  [09:54] duongdn: vầy cái này thì sao nhỉ, mình có cần estimate lại theo hướng tự quản lí ko, hay vẫn để kiểu cũ hỉ
  [09:56] namtv: Assume kiểu cũ, nói họ về concern đó, workaround được nhưng ko đúng flow standard, rắc rối hơn và họ ko thấy được bookin
  [09:57] duongdn: OK
  [10:04] duongdn: Hôm qua chốt mục A là chốt ít nhất MCP, vậy có cần est lại ko nhỉ
  [10:05] namtv: Có
  [10:31] anhnvn: Em thì ko định giao cái est cho A nha, chỉ thảo luận trong doc thôi.
  [10:32] anhnvn: Nhưng có rồi thì thôi, cứ đưa
  [10:41] duongdn: Anh Nguyen:  Cho a hỏi lại scope của cái offline mode, là mình hỗ trợ những tính năng nào nhỉ + View collective availabi
  [10:41] anhnvn: Checkin là chính a
  [10:47] duongdn: vụ bảo mật thì sao ta, có cách nào để đảm bảo QR code/pass nó đúng là mình generate ra mà ko cần server verify nhỉ
  [10:49] namtv: Nó có tồn tại trong bookings đã fetch về là được (ví dụ trong QR là 1 cái identity đại diện cho cái program của user đó,
  [10:50] namtv: >Join Collective - by pack: này theo lí thuyết chắc được nhưng có vẻ hok hiệu quả và nhiều risk, tương tự cho slot walk-
  [10:53] duongdn: OK, coi như generate 1 cái key cho mỗi booking, cũng hiểu hiểu
  [10:54] namtv: QR là đại diện cho pack/program, ko phải cho booking nha. Chỉ là trong data booking có quan hệ để check thôi
  [10:55] namtv: Với walk-in (ko có booking sẵn) thì lúc đó chắc tin tưởng cái QR thôi... Thực tế thì cũng như mấy phòng gym có cái thẻ, 
  [10:59] namtv: Còn bảo mật cái QR thì tự mình xử. Ví dụ nó chứa GUID của cái pack, kèm signature, signature đó verify bằng 1 public key
  [10:59] namtv: * Còn bảo mật cái QR thì tự mình xử. Ví dụ nó chứa GUID của cái pack, kèm signature, signature đó verify với payload (GU
  [11:01] duongdn: OK
  [11:02] namtv: Có cái với walk-in là verify được pack nhưng ko biết nó có còn quota ko ==> cái này có thể cần họ quyết định, ko support
  [11:05] duongdn: ủa tưởng mình đã nói là sẽ load data sẵn rồi mà, và sẽ làm dựa trên data đó về practice thì đây là cho 1 phòng duy nhất 
  [11:05] duongdn: Anh Nguyen:  a cũng update est xong rồi nha
  [11:07] namtv: Ah, là load cả packs 🤔 Ban đầu tao chỉ nghĩ load bookings. Chắc cũng được, hẳn là cũng ko có case xài pack 2 lần liên t
  [11:35] anhnvn: Ở A giờ đưa estimate assume build MCP để họ tham khảo, thì note của mình về on-going cost thay đổi thế nào ko a Nam Tran
  [11:42] namtv: Dùng chung server được. Coi như ko phát sinh thêm hosting cost. Chi phí sẽ chủ yếu ở Mindbody API call như đã biết
  [11:42] namtv: Còn cost họ mua subscription cho nhân viên xài nữa
  [11:50] anhnvn: Này thì chắc assume dùng ChatGPT a nhỉ?
  [11:50] namtv: Cái gì cũng được, support add MCP là được
  [11:51] namtv: Hầu như giờ agent nào cũng có cả
  [11:57] anhnvn: Em note như này a Năm thấy sao: Diagnostic AI Agent: Wildsoul staff would use an eligible Claude or ChatGPT subscription
  [11:59] namtv: >Usage beyond a plan’s allowance could require extra credits or a higher tier. Bỏ đi
  [12:02] namtv: Mới xem Claude free nó có cho add 1 MCP server 😲
  [12:03] anhnvn: A Duong Doan Nam Tran, doc mình em đã update xong, xử lí tất cả các điểm đã nêu. Chiều nay 1:30 mình họp review phát nữa
  [12:04] anhnvn: https://docs.google.com/document/d/15zvThU-7W5nuWRQAwtffEd2fYbUp4MugyDieaVpQJ3o/edit?tab=t.hade9nrkqnq8
  [13:27] anhnvn: Hú u
  [13:28] anhnvn: Để cho nhanh thì mn có thể review lại doc và comment vào đó cũng dc.
  [13:28] duongdn: OK
  [13:28] anhnvn: Em Prefer mình ngồi họp đi qua 1 lượt rồi chốt em gửi luôn
  [13:28] anhnvn: Tuỳ mn confirm.
  [13:29] namtv: Chắc họp đi, anh ready
  [13:29] anhnvn: 1:30 Nova luôn nha mn.
  [14:07] duongdn: image.png
  [14:11] duongdn: image.png
  [14:11] duongdn: chà, hơi xui, sao search invoice ko ra nữa ..
  [14:13] duongdn: image.png
  [14:13] duongdn: à, view này ra rồi, có vẻ vẫn bị charge, kha khá ...
  [14:13] duongdn: ủa xí, sao chỉ tới 2025, ko thấy bill 2026
  [14:14] duongdn: image.png
  [14:25] anhnvn: Mà nhìn này chắc đâu phân biệt được mấy cái call cho booking appointment hay class gì đâu phải ko a? Ko khẳng định dc là
  [14:26] duongdn: uhm có invoice detail thì tốt nhất mà search ko ta, lạ là lâu rồi nó ko charge nữa
  [14:26] anhnvn: Thôi cứ theo thông tin cũ vậy. Giờ bị nhiễu quá ko hay
  [14:29] duongdn: vấn đề là ... thực tế nó có vẻ khác doc, có vẻ mình có gì đó hiểu sai về cái phí này  nếu như Năm nói họ dùng branded ap
  [14:38] duongdn: ==== Anh Nguyen  Nam Tran  Mới demo, có thể sửa giá contract bằng promotion code nha, thành công, apply cho nhiều kì
  [14:50] namtv: Anh họp xong rồi nha
  [14:50] anhnvn: Để em vô tiếp
  [14:51] anhnvn: Tóm lại là oke việc giữ legacy pricing khi migration cho B phải ko a Dương
  [14:51] duongdn: uhm e
  [15:46] anhnvn: A Dương update estimate xong thì báo e ⚠️
  [15:57] duongdn: a check và estimae thêm phần update pass rồi Còn phần gì nữa ko ta
  [16:01] anhnvn: Hết rồi a
  [16:03] duongdn: OK e, vậy done
  [16:25] anhnvn: Đã gửi cho họ nha mn
  [08:42] chientx: Hi Anh, Thanks so much for the detailed document! Really appreciate the effort you and the team have put into this. Dave
  [08:51] anhnvn: Để em ack bả

### Project Wrap Up - Preventive Actions — 22 messages
  [09:51] chientx: Chien Tran Pet Printed Leo Schaller TuanTT	Sep 18, 02:11 PM	Submitted	 No 2026-09-18 Có complain do lỗi từ phía mình, tr
  [09:51] chientx: *  Pet Printed Leo Schaller TuanTT	Sep 18, 02:11 PM	Submitted	 No 2026-09-18 Có complain do lỗi từ phía mình, trước đây 
  [09:54] chientx: giờ dự án mới chưa có mà dự án cũ còn có issue là tiêu rồi ☹️
  [13:56] anhnvn: Em có nch với Tuấn, cụ thể 2 lần complain thì: 1.  Một task có giao tiếp về estimate. Giao rough estimate khoảng 20h, sa
  [14:01] namtv: Cái này thì anh có biết, nhưng detail có vẻ hơi khác ở #1 🤔 Bữa Tiến nói là ban đầu estimate số 40 hay 50 gì đó, sau tr
  [14:02] namtv: Còn cái #2 thì cũng liên quan chút #1, do #1 đã có vấn đề vậy nên Tiến phải giải thích kiểu deployment script sót, rồi n
  [14:07] chientx: cái này a Năm lv kỹ với team xem, sao info kiểu hơi conflict hoặc ko rõ ràng lắm. Và 1 cái quan trọng NA cần report a là
  [08:37] chientx: Hú Anh Nguyen , ko thấy confirm gì hết e
  [08:37] chientx: nay cần xử lý và báo lại a chi tiết a yêu cầu ở trên
  [08:39] anhnvn: Dạ, để em xử lí và báo lại.
  [17:44] anhnvn: Em có trao đổi thêm với team Leo, kết quả: - Issue #1: chính xác thì đúng là việc giao tiếp về estimate đi từ 50h, sau đ
  [21:56] chientx: Cách này chưa triệt để NA, vẫn kiểu phụ thuộc vào từng cá nhân và dễ có sai sót. Nó cũng không khác gì trước giờ, và vẫn
  [09:22] anhnvn: Thực ra role trên tường minh với ổng đã có rồi ah, nó chính là Hendrix, dù role này ban đầu đưa vào với vai trò là QC. T
  [09:27] namtv: Vậy tại sao có case như trên? Là do ổng PM dev thay vì Hendrix/room à? Hay Đạt read làm Tuấn mất info?
  [09:28] namtv: Nếu vấn đề từ Đạt thì có thể giới thiệu tường minh PM sẽ chắc ăn hơn, tránh read mất. Trừ khi ổng có ác cảm gì với nhiều
  [09:35] anhnvn: Case mà em thấy thì là một msg ổng gửi trên room Slack chung, tag Ken, nhưng ở trong 1 cái thread. TienND tức Ken thì nh
  [09:42] namtv: Như case trên, thêm người anh thấy ko giải quyết được vấn đề gì cả mà còn làm rối hơn ☹️ Trước mắt chắc lesson learned đ
  [10:09] namtv: AI cũng có thể giúp việc này, tuy nhiên ko phải ai cũng có subscription để làm dễ dàng. Còn dùng agent opensource thì cũ
  [10:11] anhnvn: Về khía cạnh con người thì lúc họp team, đã nói rõ lại nội bộ thì TuanTT là người chịu trách nhiệm chính về giao tiếp và
  [10:31] chientx: Cái a cần là từ giờ ổng có 1 kênh giao tiếp chính với 1 người phụ trách. Nếu role Hendrix đó nắm chính thì từ giờ cần nó
  [10:32] chientx: Mấy case như thấy msg nhớ unread, nhớ báo, v.v.. đã bị rất nhiều dự án rồi -> nhắc bao nhiêu lần vẫn bị. Phải giảm thiểu
  [10:39] anhnvn: Dạ, có nhắn họ confirm việc tất cả thông qua Hendrix, trên tất cả các tool rồi.

### Raymond - LegalAtoms — 7 messages
  [11:05] namtv: Duong Doan hú Raymond vụ review Clutch/Goodfirms phát, Slack tao out hồi nào rồi
  [11:06] duongdn: OK
  [11:07] duongdn: mà hú là hỏi thăm xác nhận phải ko
  [11:07] namtv: Gửi cái message mẫu ấy
  [11:07] namtv: Hi <client>, Could you do me a small favor? Our company is putting more focus into building our presence on Clutch/GoodF
  [11:07] duongdn: oh uhm
  [11:07] duongdn: done

### Recruitment — 135 messages
  [09:01] thamdt: Hi anh Chiến, UV Trần Nguyễn Trung Dũng vẫn chưa thấy tới như lịch hẹn phỏng vấn. Em đang liên lạc với bạn headhunter nã
  [09:02] chientx: nếu UV này sáng nay ko interview được nữa thì bỏ qua nha e, như thế này không OK khi lv sau này
  [09:02] thamdt: dạ
  [09:15] chientx: Có update gì mới ko Thắm?
  [09:15] thamdt: dạ chưa có gì mới anh :(
  [09:15] chientx: ok, a đi meeting khác đây
  [09:24] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: Business Development Manager (Se
  [09:24] trucpdt: * Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: Business Development Manager (
  [09:32] chientx: > 1.EBan H Cl (BDM - 1st): 03:00 PM, Mon Sep 14, 26 => Ko phù hợp, a Chiến chưa gửi nx đúng ko vậy?
  [09:35] trucpdt: ủa mail bên em lúc em check ko thấy có email anh gửi ạ, em mới refresh lại mới thấy, em updated ạ
  [09:36] trucpdt: * Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: Business Development Manager (
  [10:41] thamdt: > 2.Trần Nguyễn Trung Dũng (BDM - 1st - reschedule): 09:00 AM, Tue Sep 15,  Em update thông tin: UV ko tới pv, bên headh
  [13:22] chientx: > 3.Hoàng Minh Thắng (BDM - 1st): 10:30 AM, Tue Sep 15, 26 Phù hợp. A sẽ gửi details sau
  [13:23] chientx: Vị trí này a sẽ pv vòng 2 luôn. Nhưng khi nào pv a sẽ báo, a cần pv vòng 1 thêm 1 số case trước
  [13:24] thamdt: dạ anh
  [16:20] trucpdt: Hi Interviewers, CV nhận được hôm nay: A/ Headhunt: N/A B/ Apply N/A C/ Search CV: N/A Hẹn phỏng vấn hôm nay: 1.Nguyễn 
  [16:21] chientx: > 4.Đỗ Hưng (BDM - 1st): 02:00 PM, Tue Sep 15, 26 Có thể phù hợp, a sẽ consider thêm
  [09:24] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: Business Development Manager (Se
  [09:25] trucpdt: * Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: Business Development Manager (
  [09:25] trucpdt: * Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: Business Development Manager (
  [14:02] thamdt: 4.Nguyễn Hải Ly (BDM - 1st): 02:00 PM, Wed Sep 16, 26 > Hi anh Chiến, bên headhunter nhắn UV tới rồi nhưng chưa thấy lên
  [14:02] thamdt: * >4.Nguyễn Hải Ly (BDM - 1st): 02:00 PM, Wed Sep 16, 26 Hi anh Chiến, bên headhunter nhắn UV tới rồi nhưng chưa thấy lê
  [15:15] chientx: > 2.Hoàng Minh Thắng (BDM - 1st): 10:30 AM, Tue Sep 15, 26 => Phù hợp, anh Chiến đã gửi nx Bên team hẹn a pv vòng 2 với 
  [15:37] thamdt: dạ anh
  [17:20] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt: - 1 CV đang confirm thêm thông tin, sẽ gửi review sau B/
  [09:22] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: Business Development Manager (Se
  [09:46] chientx: Tham Do:  Bên team lv tập trung lại xem nào, sao lại copy paste nội dung email khi gửi a vậy ☹️ Hi anh Chiến, Đây là CV 
  [09:47] chientx: Ai là người gửi email này?
  [09:47] thamdt: Dạ sorry anh, e là người gửi mail này
  [09:53] thamdt: Em sơ suất ở bước kiểm tra nội dung trước khi gửi nên đã để nguyên phần note, chưa sửa tên UV trong mail Em nhận thiếu s
  [17:22] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt: - 1 CV phù hợp - hẹn phỏng vấn B/ Apply - N/A C/ Search 
  [09:50] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: Business Development Manager (Se
  [15:17] chientx: NUS_B2B_Online_Marketing_Specialist_Position_Recruitment.odt
  [15:17] chientx: Hi Tham Do  E cho team tiến hành tuyển dụng vị trí sau: + Online Marketing Specialist (B2B) + Priority: Normal
  [15:18] thamdt: dạ
  [15:23] chientx: * Hi Tham Do E cho team tiến hành tuyển dụng vị trí sau: - Online Marketing Specialist (B2B) - Priority: High
  [17:29] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt: - N/A B/ Apply - N/A C/ Search CV: - N/A Hẹn phỏng vấn h
  [09:25] honght: * Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt: - 1 CV phù hợp - hẹn phỏng vấn B/ Apply - N/A C/ Searc
  [09:26] honght: * Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt: - N/A B/ Apply - N/A C/ Search CV: - N/A Hẹn phỏng vấn
  [09:27] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: - Business Development Manager (
  [17:10] chientx: > 1.Hoàng Minh Thắng (BDM - 2nd): 03:30 PM, Mon Sep 21, 26 => Anh Chiến đã gửi nx V1 Hi Thắm, A muốn reference check bạn
  [17:27] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt: - N/A B/ Apply 1. B2B Digital Marketing Specialist – SEO
  [17:45] thamdt: dạ
  [09:44] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: - Business Development Manager (
  [10:26] chientx: > 4.Nguyễn Sĩ Kiên (BDM - 1st): 09:00AM, Tue Sep 22, 26 -> cân nhắc thêm, a sẽ gửi chi tiết nx sau
  [11:24] trucpdt: dạ em noted
  [15:40] trucpdt: > 2.Đỗ Hưng (BDM - 1st): 02:00 PM, Tue Sep 15, 26 > => Cân nhắc thêm, anh Chiến đã gửi nx  anh Chien Tran ơi, bạn này pv
  [15:42] chientx: Chắc báo headhunt luôn là chưa phù hợp ở stage cty hiện tại: chủ yếu do chuyên môn bạn này mạnh về marketing và inbound 
  [15:54] trucpdt: dạ em noted
  [17:43] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt: - N/A B/ Apply 1. B2B Digital Marketing Specialist – SEO
  [09:35] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: - Business Development Manager (
  [09:59] trucpdt: * Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: - Business Development Manager
  [11:00] chientx: Tham Do: tạm thời ngưng review thêm các CV cho vị trí marketing nha, để a pv 1 số bạn và cần xem lại có điểu chỉnh 1 số 
  [11:01] thamdt: dạ
  [13:44] honght: Hi anh Chiến, do tình hình thời tiết mưa lớn, hiện tại bạn Phạm Thị Hương Giang ko di chuyển ra được khu vực bạn ở nên b
  [13:56] chientx: ok e
  [17:38] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt: - N/A B/ Apply 1. B2B Digital Marketing Specialist – SEO
  [09:44] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: - Business Development Manager (
  [18:15] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt: - N/A B/ Apply 1. B2B Digital Marketing Specialist – SEO
  [09:59] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: - Business Development Manager (
  [09:59] trucpdt: * Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: - Business Development Manager
  [11:09] chientx: > 1.Hoàng Minh Thắng (BDM - 2nd): 03:30 PM, Mon Sep 21, 26 => Đang cân nhắc, anh Chiến chưa gửi nx v2 Hi Thắm, e tiến hà
  [11:12] thamdt: dạ
  [14:34] thamdt: Hi a Chiến, chị Thúy, Hồng & Trúc Em summary lại thông tin về bạn Thắng (Senior BD Manager) để mn nắm nhé ạ: Anh Chiến đ
  [17:26] trucpdt: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt: 	•	N/A B/ Apply 	1.	B2B Digital Marketing Specialist – S
  [09:51] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: - Business Development Manager (
  [10:27] thamdt: Em update về bạn Thắng: - Hiện tại bạn ok với offer bên mình, mong muốn hợp tác. Có vẻ bạn đã báo vv xin nghỉ với bên ct
  [10:28] thamdt: * Em update về bạn Thắng: -Hiện tại bạn ok với offer bên mình, mong muốn hợp tác. Có vẻ bạn đã báo vv xin nghỉ với bên c
  [17:22] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt: - N/A B/ Apply - N/A C/ Search CV: - N/A Hẹn phỏng vấn h
  [17:23] honght: * Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt: - N/A B/ Apply 1. B2B Digital Marketing Specialist – S
  [09:42] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: - Business Development Manager (
  [09:43] trucpdt: > 2.Nguyễn Sĩ Kiên (BDM - 1st): 09:00AM, Tue Sep 22, 26 > => Cân nhắc thêm, anh Chiến đã gửi nx  anh Chien Tran quyết đị
  [10:21] chientx: mình ko hire bạn nha, do có bạn khác skills phù hợp hơn
  [10:24] trucpdt: dạ e noted, cám ơn a
  [17:25] honght: Hi chị Thắm & Interviewers, Do vị trí Business Development Manager đã có UV nhận offer. Vị trí Digital MarketingSpeciali
  [09:16] honght: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: 1. Business Development Manager 
  [09:17] honght: Hi anh Chiến,  Hôm nay là hạn trả kết quả PV cho bạn Trần Thúy Hằng. Vì vị trí hiện đang pending nên anh cho em xin upda
  [09:19] chientx: E báo bạn là chưa phù hợp vị trí này nha
  [09:19] honght: dạ anh
  [16:32] chientx: Hi Tham Do  A bổ sung yêu cầu tuyển dụng + Position: Project Manager + Priority: Normal Các thông tin chi tiết về job nà
  [16:32] chientx: * Hi Tham Do A bổ sung yêu cầu tuyển dụng - Position: Project Manager (SL 1) - Priority: Normal Các thông tin chi tiết v
  [21:06] thamdt: dạ anh
  [09:27] honght: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: 1. Project Manager - SL: 1 [Norm
  [17:22] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Apply 1. Project Manager: N/A  2. Digital MarketingSpecialist (B2B
  [09:01] honght: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: 1. Project Manager - SL: 1 [Norm
  [09:02] honght: * Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: 1. Project Manager - SL: 1 \[N
  [17:27] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt - N/A B/ Apply 1. BDM: N/A 2. Project Manager: N/A 3. Dig
  [17:28] honght: * Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt - N/A B/ Apply 1. BDM: N/A 2. Project Manager: N/A 3. D
  [09:06] honght: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: 1. Business Development Manager 
  [17:36] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt - N/A B/ Apply 1. BDM: N/A 2. Project Manager: 22 CV, tro
  [09:01] honght: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: 1. Business Development Manager 
  [17:52] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt BDM: Nhận được 2 CV: - 1 CV đã gửi anh Chiến review - tạm
  [09:00] honght: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: 1. Business Development Manager 
  [11:08] chientx: > Hoàng Minh Thắng (BDM): 20/1/27 start Có vài lý do nên bạn này sẽ ko start nữa nha -> quay lại tuyển tiếp vị trí này
  [11:09] honght: dạ anh
  [11:09] chientx: > Digital MarketingSpecialist (B2B) – SEO & Content- SL: 1 [Pending] A update lại JD cho vị trí này, đổi tên vị trí 1 xí
  [11:10] thamdt: dạ
  [11:49] binhnt: Hi Hồng,	 	 cc Thắm	 	 Tóm tắt kết quả PV vòng 1 bạn PM	Vu Ngoc Tu Uyen 1. Kết quả:	Phù hợp 2. Thông tin cạnh tranh:	Quê
  [11:51] honght: Dạ chị, em noted, thanks chị.
  [15:23] binhnt: Hi Hồng,	 	 cc Thắm	 	 Tóm tắt kết quả PV vòng 1 bạn PM: 	Dang Trung Hieu 1. Kết quả:	Phù hợp 2. Thông tin cạnh tranh:	 
  [15:24] honght: Dạ chị, em noted, thanks chị.
  [17:52] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt - BDM: Hôm nay ko có CV nào, confirm thêm thông tin CV hô
  [17:52] honght: * Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt - BDM: Hôm nay ko có CV nào, confirm thêm thông tin CV 
  [09:06] honght: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: 1. Business Development Manager 
  [17:30] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt - BDM: N/A B/ Apply 1. BDM: N/A 2. Project Manager: Hôm n
  [09:11] honght: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: 1. Business Development Manager 
  [11:07] thamdt: Hi chị Bình, Trúc, Hồng Em gửi kết quả pv v2 bạn Đăng Trung Hiếu 1. Kết quả: cân nhắc offer 2. Thông tin cạnh tranh: đã 
  [11:07] thamdt: * Hi chị Bình, Trúc, Hồng Em gửi kết quả pv v2 bạn Đăng Trung Hiếu 1/ Kết quả: cân nhắc offer 2/ Thông tin cạnh tranh: đ
  [11:07] thamdt: * Hi chị Bình, Trúc, Hồng Em gửi kết quả pv v2 bạn Đăng Trung Hiếu 1/ Kết quả: cân nhắc offer 2/ Thông tin cạnh tranh: đ
  [11:07] thamdt: * Hi chị Bình, Trúc, Hồng Em gửi kết quả pv v2 bạn Đăng Trung Hiếu 1/ Kết quả: cân nhắc offer 2/ Thông tin cạnh tranh: đ
  [11:08] thamdt: * Hi chị Bình, Trúc, Hồng Em gửi kết quả pv v2 bạn Đăng Trung Hiếu (PM) 1/ Kết quả: cân nhắc offer 2/ Thông tin cạnh tra
  [11:21] honght: dạ chị, em noted, chị gửi nx chi tiết giúp em nhé, thanks chị.
  [17:28] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt - BDM: N/A B/ Apply 1. BDM: N/A 2. Project Manager: N/A 3
  [09:03] honght: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: 1. Business Development Manager 
  [11:21] binhnt: Hi Hồng,	 	 cc Thắm	 	 Tóm tắt kết quả PV vòng 1 bạn PM: 	Dao Vu Anh Nguyen 1. Kết quả:	Cân nhắc thêm, chờ pv thêm 1 bạn
  [11:24] honght: Dạ chị, em noted, thanks chị
  [11:26] binhnt: * Hi Hồng, cc Thắm Tóm tắt kết quả PV vòng 1 bạn PM: 	Dao Vu Anh Nguyen 1. Kết quả:	Cân nhắc thêm, chờ pv thêm 1 bạn rồi
  [11:26] binhnt: * Hi Hồng, cc Thắm Tóm tắt kết quả PV vòng 1 bạn PM: 	Dao Vu Anh Nguyen 1. Kết quả:	Cân nhắc thêm, chờ pv thêm 1 bạn rồi
  [11:26] binhnt: * Hi Hồng,	 	 cc Thắm	 	 Tóm tắt kết quả PV vòng 1 bạn PM: 	Dao Vu Anh Nguyen 1. Kết quả:	Cân nhắc thêm, chờ pv thêm 1 b
  [11:50] thamdt: Hi chị Bình, Trúc, Hồng Em gửi kết quả pv v2 bạn Vũ Ngọc Tú Uyên (PM) 1/ Kết quả: cân nhắc thêm 2/ Thông tin cạnh tranh:
  [11:51] honght: dạ chị, em noted, chị gửi nx chi tiết giúp em nhé, thanks chị.
  [16:09] chientx: > Nguyễn Thị Thương (SE0 Content - 1st): 02:00 PM, Tue Oct 13, 26 -> có thể phù hợp, nhưng a cần pv thêm để so sánh, cứ 
  [16:22] honght: Dạ anh, em noted, thanks anh.
  [17:40] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt BDM: Nhận được 3 CV trong đó: - 1 CV độ tuổi ko phù hợp -
  [09:06] honght: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: 1. Business Development Manager 
  [11:47] binhnt: Hi Hồng,	 	 	 Tóm tắt kết quả PV vòng 1 bạn PM: 	Ma Ngoc Thinh 1. Kết quả:	Chưa phù hợp 2. Thông tin cạnh tranh:	Còn hẹn
  [11:48] honght: Dạ chị, em noted, thanks chị
  [11:50] binhnt: CV bên PM ít quá, Thắm/Hồng xem cách nào để tăng lên dc ko nha mn ơi ...
  [11:50] thamdt: dạ
  [16:14] thamdt: Hi anh Chiến, Trúc, Hồng Em gửi kết quả pv v2 bạn Nguyễn Thị Thương (Content Marketing & SEO) 1/ Kết quả: cân nhắc offer
  [16:15] honght: dạ chị, em noted, chị gửi nx chi tiết giúp em nhé, thanks chị.
  [17:27] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt - BDM: N/A B/ Apply 1. BDM: N/A 2. Project Manager: N/A 3
  [09:04] honght: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: 1. Business Development Manager 
  [11:34] chientx: > Phan Hùng Nam Việt (BDM - 1st): 10:00 AM, Thur Oct 15, 26 -> a sẽ xem xét thêm. Skills maybe phù hợp nhưng UV prefer l
  [11:44] honght: Dạ anh, em noted, thanks anh.

### Rory Hackett - BXR App — 231 messages
  [13:27] minhtv: Lần trước vụ payment Google Pay/ Apple pay bên này mình làm bị cấn gì nhỉ ? Mọi người nhớ hem ?
  [13:28] khoatd: làm cái Apple Pay ok, còn Google Pay thì vẫn chưa làm
  [13:29] khoatd: Do ổng không update được cái gì đó trên Google, cái đó thì Tín mới nắm
  [13:30] minhtv: rồi cuối cùng mình có dùng của Mindbody ko nhỉ ? Hay skip
  [13:31] khoatd: để check nhanh phát chứ không nhớ nữa anh
  [13:35] khoatd: Bên mobile thì không dùng tới Mindbody, nhưng có gọi BE để lấy clientSecret, cái này BE cũng cần check thêm để chắc chắn
  [13:40] minhtv: Le Ngo:  nhớ gì ko a ?
  [13:45] khanhhh: Hình như phần đó e làm để e check thử
  [13:51] khanhhh: E gửi nha a Minh, ClientSecret là của Stripe PaymentIntent ạ Flow app goi endpoint thanh toan Apple pay: POST /admin/api
  [14:04] lenh: Google Pay hình còn stuck gì đó bên mobile app. Do mobile app phía google chưa đăng ký được gì thì phải. Hình như bên Ap
  [14:04] lenh: Merchant gì đó
  [14:06] minhtv: À, vậy là mình dùng Stripe, chứ ko dùng google pay / Apple pay của Mindbody
  [14:06] lenh: mình, mình dùng Stripe rồi bật payment method Google/Apple pay
  [14:13] minhtv: https://support.mindbodyonline.com/s/article/How-to-enable-alternative-payment-methods-like-Apple-Pay-in-the-Payments-po [thread: 5 replies]
    └ [15:04] minhtv: Khoa Tran:
    └ [15:06] khoatd: Screenshot 2026-09-15 at 15.06.32.png
    └ [15:06] khoatd: nó vẫn có
    └ [15:06] khoatd: nhưng mà hồi lần mình đã có confirm với tụi Mindboy họ nói là không dùng được Google đó anh
    └ [15:07] khoatd: mà anh đang cần thông tin là gì vậy?
  [15:01] khanhhh: @Carrick have you made any progress with your research or are you still stuck? Minh Trinh BE được làm tiếp đúng chưa a ?
  [15:03] minhtv: làm được , nhớ tracker thật kỹ nhé
  [15:04] minhtv: Memo ghi rõ đầy đủ hành động gì , cho task nào, coi lại docs ở trên về memo nhé, sai xíu là Upwork ko trả tiền á
  [15:04] khanhhh: da ok a e note
  [15:04] minhtv: Hồi screenshot cho a review thử xem memo phù hợp chưa nhé
  [16:13] khoatd: Screenshot 2026-09-15 at 16.13.19.png
  [16:13] khoatd: đây nha anh Minh Trinh
  [16:39] khoatd: Khanh Ho, em có đang ở lầu 3 không
  [16:39] khoatd: anh xuống transfer cái này, bên web admin cần làm thêm tính năng
  [16:39] khanhhh: E có nha a xuống nha
  [16:43] minhtv: Tiến hành nhanh càng tốt , ổng dí từ hôm qua mà nay mình mới clear được :D
  [16:44] khoatd: https://developers.mindbodyonline.com/ui/documentation/public-api#/http/api-endpoints/client/update-client
  [08:47] khanhhh: Minh Trinh: E gửi upwork memo cho task trên nha a review thử ạ "Add "Liability Release" Column & Reset Action to CodeIgn
  [08:49] minhtv: okay nhé
  [11:50] khanhhh: Khoa Tran Minh Trinh : E có deployed "Add "Liability Release" Column & Reset Action to CodeIgniter Admin Clients Table" 
  [11:50] khoatd: ok, thank em
  [13:25] minhtv: khách có nhắn nhé [thread: 1 reply]
    └ [13:41] khanhhh: E replied confirm vs khách r nha a
  [14:53] minhtv: Lúc không làm đừng bật tracker nhé , chẳn hạn như stuck chờ khách. Em cũng nắm rồi , a chỉ remind :D
  [16:36] khanhhh: A Khoa Tran ơi a check thử msg của khách xem a
  [16:38] khoatd: replied
  [15:21] minhtv: liability waiver , cái này ổn áp hết rồi nhỉ ?
  [15:22] khoatd: ổn rồi anh, đang chờ ổng confirm thêm 1 cái request nhỏ nữa chắc release được
  [15:57] minhtv: có gì dí lại lão xem, đang cần chốt cho xong scope này lão mới trả tiền tiếp
  [16:35] khoatd: ổng online mà dí ổng thì im re, ông đánh hơi có mùi đòi tiền là ông lơ lơ đi à :))
  [11:46] minhtv: tình hình sao rùi Khoa ơi ?
  [11:46] khoatd: ổng trả lời hôm qua rồi nha anh: thanks Jeff, just waiting for client confirmation - then we can publish
  [11:46] khoatd: giờ chờ client ổng thôi
  [11:49] minhtv: Khanh Ho:  bữa em có 1 memo thôi hả? Hay còn memo khác, screenshot giúp a , a ngó phát
  [11:50] khanhhh: E có 2 upwork memo này nha a: - Add "Liability Release" Column & Reset Action to CodeIgniter Admin Clients Table - Add "
  [16:02] khanhhh: Minh Trinh: Bên này e bật tracker check task "Superchat → HubSpot Lead Integration" tiếp nha a để push ổng confirm các ý
  [16:03] minhtv: okay e, nhớ ghi tracker rõ ràng , rõ hết mức có thể
  [16:03] khanhhh: da ok a e noted
  [16:03] minhtv: ổng kêu em làm ở đâu thế ?
  [16:03] minhtv: A dí ổng tiền mà ổng chặn a rồi hay sao á, ko thấy rep gì hết [thread: 5 replies]
    └ [16:10] khanhhh: dạ lúc trước ổng hỏi có progress gì ko Carrick ở msg [này](https://swift-studio.slack.com/archives/C
    └ [16:13] minhtv: ổng nhắn khi nào á , screenshot a xem
    └ [16:14] khanhhh: Screenshot 2026-09-23 at 16.14.09.png
    └ [16:14] khanhhh: đây nha a
    └ [16:15] minhtv: à, lâu rùi ,a tưởng tin nhắn hôm nay
  [13:51] khoatd: bên này ổng có kêu fix bug, có làm không anh Minh Trinh ơi?
  [08:25] minhtv: Ổng có nhắn
  [09:13] khoatd: https://booking.bxrlondon.com/wallet?action=pass&id=100179328&name=Jeff Trinh
  [09:13] khoatd: API này đang bị lỗi
  [09:13] khoatd: cái này đang làm gì phía BE vậy anh Le Ngo , Khanh Ho ?
  [09:15] khanhhh: da ok a để e check thử
  [09:17] minhtv: Mọi người nhớ tracker, log lên workstream là chính xác cái nội dung trong memo luôn nhé, do giờ a phải đi kiểm tra memo,
  [09:19] lenh: Khanh Ho:  cái này anh nhớ bên web có folder wallet, nhưng không có thay đổi gì trên này từ khi anh vào làm
  [09:25] khanhhh: Minh Trinh: e gửi upwork memo nha a "Investigate BXR Apple Wallet pass generation error"
  [09:27] minhtv: okay e,
  [09:45] khanhhh: Le Ngo: máy a còn login godaddy được ko a? e login kêu gửi code qua sđt này 816275 e có nhắn ổng rồi a
  [09:45] khanhhh: * Le Ngo: máy a còn login godaddy được ko a? e login kêu gửi code qua sđt này ***-***-816275. e có nhắn ổng rồi a
  [11:03] khoatd: cái API đó hiện đang xử lý gì vậy Khanh Ho ?
  [11:03] khoatd: mobile có tự xử luôn được không e>
  [11:03] khoatd: * mobile có tự xử luôn được không e
  [11:07] khanhhh: E check thì code backend lỗi e có fix và ý quan trọng là certificate trong wallet/certs/pass.p12 hết hạn 13/09/2026 UTC.
  [11:08] khoatd: hẳn là phải làm mới rồi e
  [11:09] khoatd: vì trước đây không bị, bị gần đây thôi nên trùng với khoảng thời gian hết hạn
  [11:10] khanhhh: Cert đó là backend e gen hay mobile a gen á a 😅 e check tới đó r dừng r qua dự án khác nên chưa tiếp
  [11:10] khoatd: 99% là mobile, để anh lên apple check phát
  [11:11] khanhhh: dạ ok a có gì hú e
  [11:57] khoatd: password cho file p12 đang dùng bên BE là gì vậy Khanh Ho ơi?
  [11:57] khoatd: anh tạo file mới cùng psw cũ luôn nè
  [11:58] khanhhh: này là gì vậy ta để e check tiếp thử r confirm vs a
  [13:41] khanhhh: Khoa Tran: password đây nha a  Swiftstudio2025!
  [13:41] khoatd: ok em
  [13:42] khoatd: pass.p12.zip
  [13:43] khoatd: em update file này rồi deploy lại cái BE nha
  [13:43] khanhhh: da ok a, đợi ổng onl gửi verify code mới deploy đc á a
  [13:44] khoatd: ok em, nào done báo anh test lại
  [14:38] minhtv: At present there is now allowance for new functionality (aside from the PT and member booking that you’ve done already) 
  [14:40] khoatd: hỏi thêm thông tin thôi anh, chưa rõ ông nói cái gì luôn
  [15:55] khoatd: ổng nhắn tiếp vậy là sao vẫn chưa hiểu luôn :))
  [15:56] khoatd: có context gì bên designer nữa không chứ chịu luôn á
  [16:02] minhtv: bên design đã rep
  [16:10] khanhhh: Khoa Tran: e deployed certs mới lên production rồi a call lại api trên xem còn lỗi k a
  [16:14] khoatd: vẫn còn em ơi
  [16:15] khanhhh: thử lại cái nữa xem a
  [16:15] khoatd: ok ok
  [16:20] khoatd: vẫn chưa được
  [16:21] khanhhh: nó có ném lỗi gì về ko a
  [16:21] khoatd: bên BE có file nào dạng pass.json có defined cái này không em {   "passTypeIdentifier": "pass.com.company.bxr",   "teamI
  [16:21] khoatd: `Error adding pass: {"code":"wallet","nativeStackIOS":["0   BxrApp2022.debug.dylib              0x000000010cf08d50 RCTJS
  [16:22] khanhhh: ko có file pass.json ở BE á a
  [16:24] khoatd: để anh check thêm xem sao
  [16:28] khoatd: à được rồi nha Khanh Ho
  [16:28] khoatd: phải buil lại app mới được :))
  [16:28] khoatd: simulator_screenshot_8E293636-950B-49D7-BF92-510A80EC635C.png
  [16:29] khanhhh: da ok a, vậy a báo khách giúp e nhé
  [16:29] khoatd: ok em
  [08:50] khoatd: Screenshot 2026-10-06 at 08.50.15.png
  [08:50] khoatd: ổng có hẹn meeting nha anh Minh Trinh
  [08:50] minhtv: ko liên quan, bên kia sẽ rep
  [08:50] khoatd: ok, vậy ping bển cái
  [08:51] minhtv: Bển đã nắm :D
  [15:06] minhtv: Bên Khánh có task nào đang làm ko e ?
  [15:08] minhtv: ổng kêu gần đây ko thấy Carrick track time trên Click up
  [15:11] khanhhh: dạ t2 rồi e có track 2h10 cho task này Investigate BXR Apple Wallet pass generation error nha a
  [15:11] khanhhh: cần track time trên Click up à a? e chưa biết info này nên chưa làm
  [15:12] minhtv: ổng muốn làm thế từ nay để clear cho bên khách hàng
  [15:12] minhtv: Cả upwork + click up
  [15:12] khoatd: em cũng không track bên đó, track time 2,3 bên bù đầu
  [15:12] khoatd: rồi report cuối ngày cho ổng nữa, dễ bị miss :))
  [15:13] minhtv: chỉ có 2 bên thui, report cuối ngày là defaut rồi
  [15:13] khanhhh: dạ ok a share e account click up Carrick e updates thử có gì ko hiểu e hỏi sau
  [15:14] minhtv: Cái hubspot em đủ infor chưa Khánh, cần hỏi gì ko ?
  [15:15] khanhhh: chưa đủ info á a, cần hỏi những cái e list ở msg này á a  https://swift-studio.slack.com/archives/C0BDWR54WR0/p178849400
  [15:15] khanhhh: remind ổng mấy lần mà ổng đợi bên khách ổng mới gửi mình
  [15:22] minhtv: a mới remind ổng
  [15:24] minhtv: Screenshot 2026-10-07 at 15.24.27.png
  [15:24] minhtv: Cái này có Jeff track sẵn rồi nè
  [15:25] khoatd: không nhớ luôn anh ơi, lâu quá rồi :))
  [15:25] minhtv: Giờ cả task research cũng cần track time luôn, miễn charge được là dứt hết nhé mọi người ơi
  [15:26] khanhhh: Screenshot 2026-10-07 at 15.26.02.png
  [15:26] khanhhh: e vô đc Click Up carrick r nha a Minh, mà nếu ko thấy task của mình cần track thì tạo mới phải k a
  [15:26] minhtv: Kêu ổng tạo , vô home coi thử
  [15:28] khanhhh: dạ ok a e thấy r nha
  [15:28] minhtv: Home có đủ task cho em rồi đúng ko ?
  [15:28] khanhhh: Screenshot 2026-10-07 at 15.28.51.png
  [15:29] khanhhh: e thấy ổng assign Carrick 3 tasks này
  [15:29] minhtv: okay e
  [15:30] minhtv: Có thêm Tracker note trên Workstream nhé
  [16:11] minhtv: Lu Ho:  coi có task gì đó, bên Khoa đang bận , xử cho lão phát, nhớ tracker Click up + Upwork
  [16:11] luhx: ném link đi
  [16:11] minhtv: Khoa xử tiếp
  [16:12] khoatd: https://app.clickup.com/90121968813/v/b/2kxv075d-1032
  [16:19] khoatd: ima_2a92927.png
  [16:36] luhx: đã mò và chưa hiểu issue là gì, có nhắn kêu lão gửi mấy tấm hình mà trong mail có nói rồi mà chưa rep.
  [16:36] luhx: nào rep thì làm tiếp nhé.
  [16:37] minhtv: ổng trả lời rùi
  [16:53] luhx: lão lại lặn nữa rồi.
  [08:30] minhtv: Hiểu cái task ổng nói chưa nhỉ ?
  [08:32] luhx: cũng hơi hơi để mò code coi đã chứ phần này là logic cũ lắm rồi.
  [08:32] luhx: mò xí nếu chưa rõ nữa thì hỏi tiếp.,
  [09:03] luhx: đã fix xong, đã gửi msg chờ lão confirm là đúng rồi mới build vì chưa chắc cái mình làm đã đúng ý lão.
  [14:38] luhx: Screenshot 2026-10-09 at 14.38.07.png
  [14:38] luhx: Minh Trinh:
  [14:38] minhtv: ổng đang hỏi a Duong Doan  á ,
  [14:41] minhtv: Duong Doan:  Ý của ổng là muốn anh call với ổng để trao đổi về việc sử dụng Klaviyo cho nhiều site location, cụ thể: 1. 
  [14:42] duongdn: a tưởng cái này bữa làm xong rồi, status thế nào vậy
  [14:42] duongdn: có ai transfer được ko
  [14:42] minhtv: Cái này bên team BE e ko nắm rõ, a hỏi Khánh hay a Lễ thử
  [14:43] khanhhh: dạ cái này e ko rõ a thử hỏi a Lễ thử
  [14:44] khanhhh: UK và UAE e nhớ k phải e làm
  [14:45] duongdn: Lễ nói trước giờ Klaviyo ko đụng, chỉ có bên mobile ...
  [14:45] duongdn: rồi giờ họp gì chài :))
  [14:46] khoatd: chờ em xíu, e cung cấp ít thông tin nè
  [14:47] minhtv: Ngoài ra mình có thể đánh Tag cho cái location được ko? Ví dụ : nhìn trên Klavio chỉ có IDs, thì đánh tags là #UAE hay #
  [14:48] duongdn: vấn đề là ổng có nhầm gì ko Nếu trước giờ nó ở bên mobile, thì có nghĩa là Carrick ko làm, ổng họp với mình trong khi mì
  [14:48] duongdn: trước có ai chém gió Carrick rành Klaviyo ko zị :D
  [14:49] khoatd: Quản lý nhiều location trên cùng một tài khoản Klaviyo: Ví dụ UK và UAE có thể dùng chung một tài khoản Klaviyo không? -
  [14:49] khoatd: cái này đã từng trao đổi với ổng hồi làm cái dụ region, quá lâu rồi
  [14:50] khoatd: có hỏi ổng rất nhiều
  [14:52] duongdn: OK, nhưng như trên, sao ổng lại đòi họp với Carrick nhỉ, mình nên họp với tâm thế nào Minh Trinh  Nếu có expect gì có th
  [14:53] khoatd: có thể ổng muốn làm cái đó cho web luôn
  [14:54] khoatd: Screenshot 2026-10-09 at 14.54.34.png
  [14:55] minhtv: để e chat vs ổng trước xem sao
  [14:55] khoatd: vì cái feature liên quan đó bên phía mobile đã có làm từ lâu rồi, đã clear với ổng khi làm
  [14:55] lenh: "Quản lý nhiều location trên cùng một tài khoản Klaviyo: Ví dụ UK và UAE có thể dùng chung một tài khoản Klaviyo không? 
  [14:55] minhtv: Full screenshot cho thấy là đang ở Klavio luôn Khoa ơi
  [14:56] duongdn: uả vậy là Klaviyo web đã làm, ko phải ko làm gì như nãy nói rồi
  [14:56] khoatd: nó là Custom properties/Custom fields trong 1 profile
  [14:56] khoatd: nói vậy là ổng biết à
  [14:56] khoatd: Screenshot 2026-10-09 at 14.56.17.png
  [14:57] lenh: ý là mobile cung cấp cái endpoint như mobile đang dùng để call và call curl như mobile đang call để nó consistent thôi a
  [14:57] khoatd: Screenshot 2026-10-09 at 14.57.05.png
  [14:58] lenh: Cái này cũng chỉ bên mình discuss và mobile hướng dẫn web làm thôi. Các vấn đề liên quan đến Klaviyo thì Jeff là người l
  [15:00] lenh: Nên có thể là có requirement nào đó mà ổng đang nghĩ là cần web làm, nhưng em nghĩ nên để Jeff Khoa làm việc và tìm solu
  [15:00] khoatd: giờ clear với ổng là muốn web làm thêm gì nữa thôi
  [15:01] khoatd: có thể anh Minh chưa nắm full info Jeff đã làm, mà ổng thì quên mình đã từng hỏi ổng
  [15:02] minhtv: đã chat vs ổng để xem sao
  [15:03] lenh: "Phân tách dữ liệu theo location" => cái này còn problem -> khi user nó switch region thì cá list đó nó không auto refre
  [15:04] lenh: "Quản lý nhiều location trên cùng một tài khoản Klaviyo: Ví dụ UK và UAE có thể dùng chung một tài khoản Klaviyo không? 
  [15:05] lenh: Khanh Ho: check thử trong source bên web giúp anh cái nha. Cái action khi switch region trên web á
  [15:05] khoatd: cái ý số 3 thì nó cũng nằm trong một phần của ý 1, nên là nhiều khả năng vẫn được. quan trọng là xem ổng muốn quản lý tớ
  [15:07] lenh: nhưng để hiểu cái ổng muốn quản lý ra sao, hay có khả thi và hợp lý không thì Jeff Khoa sẽ có khả năng đánh giá tốt hơn 
  [15:08] lenh: Rồi chốt được cái ổng muốn làm, transfer lại Carrick để research phụ hoặc làm nếu đã clear
  [15:08] lenh: 🙏
  [15:11] khoatd: hẳn là ổng với bên client đã quyết định cái gì rồi
  [15:11] khoatd: Screenshot 2026-10-09 at 15.10.54.png
  [15:12] khoatd: từng trao đỗi về việc sync 2 cái mindbody site cho 1 account Klaviyo
  [15:12] khoatd: cái này chắc anh Lễ cũng có nhớ nè
  [15:15] khanhhh: E gửi nha a: Mobile nói đúng về cách làm: UK và UAE có thể dùng chung một tài khoản Klaviyo, phân nhóm khách bằng custom
  [15:16] lenh: Bên Mindbody nó cũng sync thông tin giữa 2 site luôn, vì dùng cùng email, phone number và 1 global mindbody account. Anh
  [15:19] luhx: Khoa Tran: Minh Trinh mình có draft message report ở DM với lão rory xí cuối giờ ae nào vào enter giúp phát nhé, nay có 
  [15:19] minhtv: Shedule send đi
  [15:19] khoatd: Anh nhớ lần trước là cấn vụ khi 1 user switch location thì làm sao mà mobile app nhận được notification từ Klavio's camp
  [15:22] khoatd: mà cái đó mình chưa release mà, cái cục đó là big feature
  [15:22] khoatd: giờ muốn release phải test lại kỹ lắm
  [15:27] lenh: - Về mặt MB: nếu 1 user (dùng 1 email) để access vào nhiều locations => Thì MB có sync user info với nhau không? Cần ver
  [15:51] lenh: Mạn phép trình bày Idea Carrick Lễ: Trước mắt, khả năng cao là có thể dùng chung một tài khoản Klaviyo được nhưng để ens
  [15:51] lenh: * Mạn phép trình bày Idea Carrick Lễ: Trước mắt, khả năng cao là có thể dùng chung một tài khoản Klaviyo được nhưng để e
  [15:53] lenh: Khanh Ho: có thắc mắc gì về Multi-location bên Klaviyo thì hú anh, anh support em
  [15:55] minhtv: Khoan đụng tới các phần Klavioy nhé mọi người ơi, vì Boss muốn dùng 2 accounts Kalavioy còn Rory muốn 1 account ,nên chờ
  [15:56] duongdn: boss ?
  [15:57] minhtv: đại khái mấy boss của Rory á a
  [15:57] duongdn: ủa e chát riêng à, hok thấy info gì trong room chung
  [15:57] duongdn: nếu vậy thì kéo ra ngoài đi
  [15:57] duongdn: cho transparent info
  [15:57] minhtv: Room chung đó a
  [15:58] duongdn: à chắc msg vắn tắt quá  a hook hiểu ổng nói gì nếu ko có context
  [15:58] minhtv: ý ổng nói là , mấy khứa kia discuss riêng, ổng cũng ko được tham gia , còn ổng thích cái ý 1 account của mình 🤣
  [17:02] minhtv: Lão hỏi gì đó á Khoa
  [17:03] khoatd: chịu, để check code xem sao :))
  [15:14] minhtv: roryh  [3:08 PM] Hi Jeff, just wanted to do a bit of admin after our call the other day: I am waiting for a time/cost ef
  [15:15] minhtv: Khanh Ho: , em có thiếu gì ko ? Ổng hỏi a khi nào em xong?
  [15:16] khoatd: Hentry là designer mà?
  [15:16] khoatd: Khánh là Carrick
  [15:16] minhtv: à, nhầm, kâka
  [15:25] minhtv: 2. Carrick is working on costing the superchat and HubSpot integration, do we need to circle back on exactly what is req
  [15:26] minhtv: Combat ổng như cách mà bên Design làm ấy. Bên design đang chờ ổng review, ổng ko review mà hỏi tiến độ, a cũng nhớ phía 
  [15:37] khanhhh: da ok a e replied

### Sandor Antal - Lyf Support — 684 messages
  [10:58] minhtv: Cái billing okay rồi thì nhắn ổng test luôn nhé
  [10:58] minhtv: ổng mới đá tiền cho bên mình
  [10:59] thangn: okelaaa
  [11:13] minhtv: hỗ trợ ổng add mail nhé
  [11:15] minhtv: can you give me your account? sandor@lyf.com right? hỏi cái này là hỏi cái gì thế Thắng  ơi?
  [11:15] minhtv: a tưởng là hỏi mật khẩu á
  [11:32] minhtv: lão okay rùi, kêu để mình submit
  [11:32] thangn: yeahh
  [11:55] minhtv: ủa, submit cái lên liền rồi hả Thắng?
  [11:56] thangn: e submit hôm qua luôn rồi, mà chưa kêu ổng test lại hẹ hẹ
  [11:56] thangn: Great. So we can now tell the Marketing person they can start looking at FB campaigns?
  [11:56] thangn: cái này là dụ facebook tracking đúng hok dọ
  [11:58] minhtv: đúng rùi
  [11:59] minhtv: Screenshot 2026-09-16 at 11.59.49.png
  [11:59] minhtv: a thấy ko đúng đâu, coi lại thử
  [12:00] thangn: gì d bà
  [12:00] thangn: coi đúng chỗ chưa d
  [12:00] thangn: coi lộn rồi cưng ơi
  [12:00] minhtv: gửi a link coi
  [12:01] thangn: https://play.google.com/console/u/0/developers/5871050586664712810/app/4974921060709195941/tracks/production?tab=release
  [12:01] minhtv: Sep 14 5:34 PM Vậy cái này có phải có billing luôn chưa ta?
  [12:01] thangn: có rồi ó
  [12:02] minhtv: sao làm nhanh thế, hôm qua mới làm cái billing mà
  [12:02] minhtv: hôm 14 đã xong rồi à
  [12:02] thangn: hôm kia e hỏi a là làm luôn mà
  [12:02] thangn: lúc báo issue
  [12:02] thangn: làm 2h trước rồi
  [12:03] minhtv: ok
  [16:51] thangn: https://developers.facebook.com/apps/179611298840678/alerts/inbox/?business_id=1808216409431264
  [16:51] thangn: Long Vo coi thử cái alert này xem BE cần làm gì ko e
  [16:52] minhtv: Duong Doan:  coi dùm em với, khách cần estimate gấp , chốt trong hôm nay
  [16:52] minhtv: Thắng , ngoài ra , android / ios có thư viện nào cần upgrade ko luôn nhé
  [16:59] minhtv: Duong Doan:  ơi, chắc upgrade Graph API từ V20 lên V21 chắc tầm 3h a nhỉ ?
  [17:02] minhtv: Tạm báo 4h cho BE đi Thắng, ổng cần trong hôm nay ,a dùng AI check các kiểu rồi , thấy phù hợp
  [17:10] minhtv: Câu cuối chốt thêm dòng là note: bên mình hiện ko có người làm marketing , đội dev thì nhiều nhé Thắng
  [17:11] thangn: check message xem ok chưa nhao
  [17:12] minhtv: coi còn thư viện nào cần upgrade nữa hem
  [17:13] thangn: cũng có khá nhiều thư viện cũ, cũng lâu rồi chưa update
  [17:13] thangn: code lần gần nhất chắc 2 năm trước
  [17:13] minhtv: coi cái nào thật sự cần ý , nếu cần list vô
  [17:14] thangn: cái đó phải coi kỹ
  [17:14] minhtv: vậy nói ổng mai mình coi kỹ thư viện, giờ mình offline
  [17:14] thangn: nắhn cần coi thêm rồi đưa est sau đi
  [17:15] thangn: message trên okay rồi he
  [08:38] minhtv: Lu Ho:  vô làm tiếp bên này , Thắng bận , nên Thắng transfer cho Lữ làm tiếp nhé
  [08:40] thangn: Slack, Github, Apple, Google, Facebook - Jeff Bitbucket: git@bitbucket.org:lyfappteam/lyfsupport-ios.git task: https://l
  [08:41] thangn: * Slack, Bitbucket, Apple, Google, Facebook - Jeff Bitbucket: git@bitbucket.org:lyfappteam/lyfsupport-ios.git task: http
  [09:01] minhtv: onboard xong báo nhé Lữ ơi
  [09:02] luhx: đang setup á xong báo.
  [09:38] luhx: đã setup run app xong rồi nha, bắt đầu làm task ha.
  [09:45] minhtv: múc đê, bên này fixed cost ko cần upwork
  [09:46] minhtv: lyfappslack.slack.com Login vào slack, cost với số giờ có trong từng task sẵn , có thể coi qua
  [13:51] luhx: đã xong task này https://lyfapp.atlassian.net/browse/LSA-1511 nha Minh Trinh Thang Nguyen  giờ làm gì build TF hay làm t
  [13:52] minhtv: Tiếp luôn chú Facebool
  [13:52] minhtv: * Tiếp luôn chú Facebook
  [13:52] minhtv: https://lyfapp.atlassian.net/jira/software/projects/LSA/boards/4?filter=assignee%20%3D%2070121%3Aa8e215f0-e608-4284-9af3
  [13:52] thangn: cưng khoan vội
  [13:52] thangn: hãy xử nốt
  [13:53] luhx: hả?
  [13:54] thangn: nốt task đại ca gửi
  [13:54] thangn: =)))
  [14:08] minhtv: Bên này làm xong cứ build rồi kéo qua in-review nhé , chiều nay xong luôn cái task 1513 ko ?
  [14:08] luhx: là xong hết 2 task mới build chứ ha?
  [14:08] minhtv: đúng rùi,
  [14:09] thangn: à quên, a L
  [14:09] thangn: * à quên, a Lu Ho mỗi ticket là 1 nhánh rồi tạo PR chứng mình gửi cho ổng
  [14:09] luhx: PR chứng minh là sao nhỉ?
  [14:10] thangn: quay video đính kèm vô PR là đx
  [14:11] thangn: coi mấy cái PR gần nhất của e tạo theo
  [14:45] minhtv: Thắng xong James chưa nhỉ ?  Chưa làm task thì kiếm cách tạo task xem. Vụ thư viện cần review upgrade cả android / iOS .
  [14:45] thangn: task bên James thì có
  [14:45] thangn: rồi giờ bỏ qua coi bên đây hay sao
  [14:46] minhtv: bên đó total 20h thui nhé
  [13:48] thangn: https://lyfapp.atlassian.net/browse/LSA-1514
  [13:48] thangn: Long Vo e có một bé nè nha cưng
  [13:49] longvv: oke mai e qua
  [10:10] longvv: Này bên BE ko có cần action gì nhe
  [10:10] longvv: đã check
  [10:12] minhtv: em đổi từ V20 lên V21 mà ko làm gì nhỉ ?
  [10:17] longvv: Bên mobile đang xài FBSDK 18.1.1 đúng ko nhỉ, nếu đã đổi rồi thì ko cần làm gì nữa
  [10:20] longvv: Do bên BE ko có xài Graph API của facebook, nên ko có cần đổi gì
  [10:30] minhtv: Thắng sửa nhé, a có check cả source mobile vs source BE thì bên mobile cần nâng version
  [10:30] thangn: okayy khạppp
  [15:20] luhx: có task nào nhẹ nhàng không gấp không Thang Nguyen ném a với nào.
  [15:20] minhtv: tất cả cần done trong tuần này,. có Lữ phụ nữa thì lẹ hơn
  [15:23] thangn: LSA-1516 a check lại tk này xem xử lý đủ case chưa
  [15:23] thangn: rồi nhờ ổng review PR
  [15:23] luhx: branch nào.
  [15:24] thangn: LSA-1516
  [17:06] luhx: đã update và kêu lão review rồi nha.
  [17:07] minhtv: Tổng thể tình hình mình done những cái nào và còn cái nào thế?
  [17:08] thangn: Screenshot 2026-09-22 at 17.07.59.png
  [17:09] minhtv: cái #1514 ko thấy PR nhỉ ?
  [17:10] thangn: nếu như Long nói xài Facebook SDK 18.1.1  thì nó được upgrade trong cái LSA-1516
  [17:10] thangn: nhưng chắc cần phải thử submit app nữa
  [17:11] minhtv: cần tách ra rõ , cần có chứng minh mình có làm task đó, nâng cái Facebook SDK lên latest chẳn hạn
  [17:12] thangn: a Lu Ho  mai xử cái này
  [17:14] luhx: hả xử cái gì á.
  [17:15] minhtv: https://lyfapp.atlassian.net/jira/software/projects/LSA/boards/4?filter=assignee%20%3D%2070121%3Aa8e215f0-e608-4284-9af3
  [17:15] minhtv: Hiện tại đang có 1 task ko có PR
  [09:28] luhx: ủa Thang Nguyen cái task này mà mình tách từ cái PR upgrde hôm qua em gửi a á hả? a thấy cái đó dc merge rồi :v
  [09:32] thangn: merge luôn rồi đại ca Minh Trinh
  [09:35] minhtv: Chà, khó vậy, ban đầu tụi em nghĩ sao mà nguyên cái task ko có miếng code nào kéo qua kêu review vậy
  [09:35] thangn: nó trùng với cái upgrade thì nói chắc ổng sẽ hiểu mà
  [09:35] minhtv: Nói ổng đã gộp ở trỏng luôn đi
  [09:36] thangn: a Lu Ho clone source android về đi
  [09:36] thangn: branch: LSA-1515
  [09:37] minhtv: Note, bên này fixed cost, phải chứng minh rõ ràng từng task, ko gộp nữa nhé
  [09:44] luhx: đã run dc app, tiếp làm gì á.
  [09:44] thangn: check xem còn thiếu sót gì ko
  [09:44] thangn: rồi build app lên internal test lại một vòng đi
  [09:44] luhx: link task đi.
  [09:44] thangn: https://lyfapp.atlassian.net/browse/LSA-1515
  [10:16] thangn: a Lu Ho ổng có nhờ check gì kìa
  [10:17] thangn: coi giúp e
  [10:22] luhx: oke.
  [10:30] luhx: Minh Trinh: check giúp với, lão cần mình kiểm tra phân tích cái gì á, đọc chả hiểu gì. đã accept vào cái https://app.aik
  [10:36] luhx: Thang Nguyen: có time check luôn nhé, a đọc không hiểu lắm, qua làm thằng khác rồi xí mới về lại.
  [13:27] minhtv: Duong Doan:   / Long Vo  check giúp e với , cần có bản estimate gửi ổng để improve security
  [13:28] longvv: ok de e check qua
  [13:42] duongdn: này mấy cái security report, có gì đâu hiểu với ko hiểu ta, thì fix thôi est thì có thể tham khảo fix time của cái app n
  [13:42] duongdn: lưu ý là có rất nhiều phần của mobile, nên tổng hợp lại
  [13:43] minhtv: Bên a coi phần của Web / backend / admin, bên em coi phần của Android / ios .  Mà cái source web mình chưa được invite, 
  [13:43] duongdn: ủa chưa có source sao est ....
  [13:44] duongdn: btw, thường loại task này ko est được đâu
  [13:44] duongdn: nó có kha khá phần phải upgrade package
  [13:44] duongdn: upgrade xong theo lí thuyết nó có thể lỗi, sau đó fix
  [13:44] minhtv: ông này fixed cost , cho ổng đúng con số ổng mới chơi , cái gì mà mờ ảo ổng ko chơi rùi
  [13:46] duongdn: vậy chịu rồi, đây là loại task ko est được,  tương tự như upgrade thư viện vậy
  [13:46] minhtv: Screenshot 2026-09-23 at 13.46.55.png
  [13:47] minhtv: Toàn lỗi thư viện của người ta 🥶
  [13:50] duongdn: mấy dạng này ko ai dám est đâu, upgrade thì dễ đó, bấm phát là xong, theo lí thuyết, 10m, nhưng rồi - a dám chắc bấm nó 
  [13:52] minhtv: Với mấy cái này nằm sâu bên trong thư viện người ta , chưa chắc bản mới đã fixed mây cái này , có khi vẫn tồn đọng. A co
  [13:52] minhtv: Screenshot 2026-09-23 at 13.52.28.png
  [13:52] duongdn: cũng vậy à, vẫn phải test
  [13:53] duongdn: và code ở đâu vậy?
  [13:53] minhtv: https://bitbucket.org/lyfappteam/lyf-backend/src Backend thì dùng cái này nè a
  [13:54] minhtv: Bữa giờ task nào cũng có công test trong đó á, tuỳ mức độ ảnh hưởng
  [13:56] duongdn: này ko phải test task , mà là cần review và test all app sau khi fix để đảm bảo chạy đúng á tương tự lúc làm cũng vậy
  [13:57] minhtv: a review đánh giá thử cái fix time của nó xem, có cái nó suggest tới 11h , có cái 15 mins. Coi dùng time đó có ổn không,
  [13:59] duongdn: ok nhưng cái này ko hoàn thành nhanh được đâu nha, làm từ từ thôi, nếu thực sự là fix cost
  [14:02] duongdn: ủa
  [14:02] duongdn: mới coi lại
  [14:02] duongdn: bên này source trên là .net
  [14:03] duongdn: vậy nó chỉ ứng với duy nhất 1 cái item thôi
  [14:03] duongdn: còn mấy kia là reposiroty khác nha
  [14:03] duongdn: https://app.aikido.dev/queue?sidebarIssue=28065585
  [14:03] duongdn: chỉ có cái này ứng với backend thôi
  [14:16] duongdn: cái trên sau khi scan bởi AI, phát hiện ra thêm 23 chỗ tương tự lưu ý cái này chỉ là trong 1 file duy nhất, nếu scan all
  [14:17] duongdn: viewpoint thì vẫn như cũ nha, này round estimate thôi, fix xong cần test lại các chỗ liên quan xem ổn ko có thể cộng trừ
  [14:19] minhtv: https://docs.google.com/spreadsheets/d/17g5O7F6T443BE5L98Ns2wX5NmUSxnot5Nt5c6nzYklg/edit?usp=sharing A cho info vào tron
  [14:36] duongdn: rồi nha
  [15:03] minhtv: Unsigned JWT can be used to bypass authentication Như thằng này em thấy cũng có code  a Dương cơi
  [15:03] minhtv: * Unsigned JWT can be used to bypass authentication Như thằng này em thấy cũng có code  a Dương ơi
  [15:03] minhtv: Screenshot 2026-09-23 at 15.03.52.png
  [15:06] duongdn: Cho link nha, ko thấy item này
  [15:06] minhtv: Trong mớ này á a https://app.aikido.dev/repositories/1954370?sidebarIssue=37569189
  [15:08] duongdn: oh, mấy issue cũng dễ, lấy h của tụi nó bỏ vô luôn
  [15:09] duongdn: backend mình deploy thế nào vậy
  [15:11] duongdn: add thêm secrect key dễ ko
  [15:11] longvv: BE mình chỉ cần merge vô dev thì trên azure tự deploy nhe
  [15:11] longvv: dev trước đó nó có setup sẵn pipeline deploy r nên cũng khỏe
  [15:12] luhx: đã check và test app nhé, oke rồi đó.
  [15:12] luhx: Minh Trinh: hết task nhé.
  [15:13] duongdn: > add thêm secrect key dễ ko .
  [15:14] longvv: ý a là thêm biến env cho nó hả
  [15:15] longvv: image.png
  [15:15] longvv: nếu đúng thì mình có chỗ add
  [15:16] minhtv: cần test video chứng minh các kiểu con đà điểu, làm sao cho lão hài lòng , trả tiền
  [15:17] longvv: * nếu đúng thì mình có chỗ add, add vào nó tự deploy
  [15:25] luhx: đã comment ở ticket FB kèm podfile lock thể hiện mình đã upgrade cái gì nhé, có kêu lão là do vô ý đã làm chung với vụ u
  [15:58] minhtv: Android cleanup nay cũng xong nhỉ ?
  [15:58] luhx: đang tạo PR.
  [16:00] luhx: ủa cái bitbucket PR ném nhiều hình không dc à ném 4 tấm nó load dc có 2 tấm.
  [16:00] luhx: hình như max có 2.
  [16:03] luhx: web lỏ ác kéo hay uplaod 1 lượt không dc từng tấm thì đc.
  [16:28] minhtv: Thang Nguyen:  tiện hỏi ổng mấy cái source kia invite mình vào, mình xem luôn nhé, admin web gì đó, đối chiếu vs bitbuck
  [16:32] thangn: ổng có invite hết ồi, giờ có hỏi là hỏi cần check hết đóng đó luôn ko hay sao ó
  [16:33] thangn: https://bitbucket.org/lyfappteam/workspace/repositories/
  [16:33] minhtv: Đủ rồi thì nhờ a Duong Doan  ngó tiếp các source còn lại với
  [16:33] minhtv: * Đủ rồi thì nhờ a Duong Doan  ngó tiếp các source còn lại với, bên Web / BE
  [16:34] thangn: link của đống source còn lại nò nhoa a Duong Doan
  [16:37] luhx: bên này mình làm BE luôn hả?.
  [16:38] luhx: vừa check source iOS thì có 1 cái nhìn hơi ghê ghê, đó là nó hard secretKey và api key ở dưới mobile, xong dùng để endco
  [16:38] luhx: lẻ ra mấy cái này phải ở sv chứ ha? Minh Trinh
  [16:39] minhtv: tuỳ loại key, nếu đó là key private key thật thì nguy hiểm , public key thì ko sao, vì private key vẫn nằm server , cần 
  [16:41] thangn: đưa đóng đó lên sheet rồi có tạo ticket tổng hợp cái dó hok đại
  [16:41] thangn: * đưa đóng đó lên sheet rồi có tạo ticket tổng hợp cái dó hok đại ca
  [16:41] thangn: nảy nói quên rồi
  [16:42] minhtv: đúng rùi , tốt nhất chia nhỏ từng app ra , cho dễ, nhìn 1 cục to nó ngán
  [16:44] luhx: thấy app đang có fastlane nhưng đang build bằng xcode, và ở fastlane file đang bị lộ key, cái này nên làm sao? xoá key t
  [16:44] luhx: tại thấy cũng đâu có sài.
  [16:45] minhtv: Có thể hỏi lại khách , pending chờ câu trả lời
  [16:46] minhtv: ghi rõ nếu dùng lại Fastlane thì cần làm những steps nào như kiểm tra, chạy thử, etc ..
  [17:00] minhtv: Khi gửi note rõ , đây là list mình nhìn thấy được, do account Free ko nhìn được toàn bộ nhé Thắng
  [17:01] thangn: gửi cái sheet hả
  [17:01] minhtv: ko, tách từng task ra gửi, nhiều khi ổng kêu sao ít vậy , chẳn hạn
  [17:01] minhtv: * ko, tách từng source ra gửi ticket, nhiều khi ổng kêu sao ít vậy , chẳn hạn
  [17:01] minhtv: Duong Doan:  a ơi, nhớ còn các source khác luôn, chắc mai mới kịp a nhỉ ?
  [17:13] luhx: checked Minh Trinh cái đó cơ bản không có gì quan trọng lắm kiểu là giả auth để BE biết req đang đến từ app, chắc dùng đ
  [08:41] thangn: nay a Lu Ho có làm bên đây buổi sáng hum
  [08:41] luhx: nay làm gì á?
  [08:45] luhx: mấy cái issue của iOS xong nha Minh Trinh  cơ bản toàn mấy cái không quan trọng, làm thì chỉ move qua info.plist là dc. 
  [08:45] thangn: ko bận bên khác thì tạo ticket luôn cho source iOS đó đi a
  [08:45] minhtv: Xong là gửi cho khách hoàn thiện á
  [08:46] thangn: e có tạo cho android hôm qua rồi
  [08:46] duongdn: để download về xem sao
  [08:46] luhx: mỗi cái 1 ticket hả?
  [08:46] minhtv: Mỗi dự án 1 ticket đi, trong đó chia nhỏ ra nhiều gạch đầu dòng bên trong
  [08:56] luhx: đã tạo 1 ticket cho ios nhé.
  [10:27] minhtv: a Duong Doan  ráng xong hết trong hôm nay , để gửi khách luôn cho ổng nhé a ơi, team đang đói việc quá
  [10:28] minhtv: Thang Nguyen:  dí ổng test , kêu ổng okay release fund giúp mình
  [10:28] duongdn: chắc được, dù vẫn chưa đụng vô
  [10:29] minhtv: Tiện gửi bên mobile trước cũng được ,kêu web / BE đang coi thêm , Thắng ơi
  [10:30] minhtv: Screenshot 2026-09-24 at 10.30.08.png
  [10:30] minhtv: Mấy cái này dò lại xem done hết chưa, xong dí lão release hết luôn
  [10:31] thangn: done hết òi, giờ e báo nhờ ổng test cả android và iOS rồi refund tiền nhao
  [10:33] minhtv: okay okay
  [11:52] minhtv: số giờ bên Android / iOS hơi bé nhỉ 🤣
  [11:52] luhx: ios cơ bản không cần làm gì luôn á :v
  [11:52] luhx: chú muốn kéo thêm 1 khúc cũng dc làm sao lão chịu là dc.
  [11:53] minhtv: cái vụ key hôm qua, chuyển lên server cho an toàn được hem ? Ai lại hard code như thế
  [11:54] luhx: cái key đó cơ bản thì cũng không nguy hiểm mấy cơ bản theo như AI kêu thì nó tạo ra 1 định danh token để server biết là 
  [11:54] luhx: còn sau đó vẫn dùng các thứ của sv bt.
  [11:55] minhtv: vậy đưa vào .env, note nó ko quan trọng cho con AI nó hiểu, ko bắt bẻ nữa
  [11:55] minhtv: * vậy đưa vào .env, note nó ko quan trọng, lý do đầy đủ cho con AI nó hiểu, ko bắt bẻ nữa
  [11:55] minhtv: đặt tên secret key thì sao nó ko bắt cho được
  [11:58] luhx: thì có ghi là đưa vào info.plist á, chứ dùng env thì phải config tốn khá nhiều thời gian á, ios native thấy cũng ít sài 
  [12:00] minhtv: chỗ nào cũng được, đừng để con AI nó nổi lỗi lên là được, nó ko quan trọng là okay
  [13:39] duongdn: a cũng xong rồi nha
  [13:42] minhtv: Thắng tạo ticket bên a Dương luôn, rùi ném cho lão
  [15:26] minhtv: a Duong Doan  ơi, cái task Critical — SQL injection có số giờ hơi cao, chắc cần chút giải thích gì đó tại sao nó cao cho
  [15:27] duongdn: a có note là nhiều case
  [15:27] duongdn: hơn 1000 cái
  [15:28] minhtv: Thắng thêm cái note , highlight màu lên cả trong chat + ticket
  [15:29] minhtv: Ngược lại giờ em thấy hơi ít 🤣🤣
  [15:30] duongdn: mình sẽ ko sửa dạng từng case, mà mình sẽ cho AI sưa hết và review lại hết app, như cách hôm qua a làm, chi phí review h
  [15:32] minhtv: Lão này , ngay từ đầu phỏng vấn em,  - lão đã nói," ổng chỉ tin vào con số fixed, bên mày có làm được ko "  Vì lão đã từ ⚠️
  [15:34] duongdn: này nếu nhận làm sẽ gây rủi ro cho mình á,  mình thì có rất nhiều loại task ko thể est chính xác  có thể nc thêm với a N
  [08:40] minhtv: App lên stores báo nhé Thắng ơi
  [08:43] thangn: phương tiện tư duy đã tiếp nhận thông tin
  [08:46] minhtv: Đang học IELTS hả 😅
  [08:48] thangn: a già rồiii
  [14:44] minhtv: Review passed hết rồi
  [14:45] thangn: okay, a báo luôn ko hay e
  [14:46] minhtv: để a , tiện đòi xiền luôn
  [14:47] thangn: cả hai android and ios đều lên rồi nhoa
  [15:28] minhtv: Lão này nhắn thì ko rep gì mấy, nhưng được cái hành động, lão mới release funds hết cho bên mình rồi 😁
  [15:28] luhx: vậy cũng dc, đừng có nói nhiều mà không trả tiền là dc :v
  [15:32] minhtv: Thắng coi dùm a , cái [Android] Investigate and fix 10 production Crashlytics issues , mấy cái issues bấm vào link nó nh
  [15:32] thangn: e vô mò
  [15:33] thangn: a thử chỉnh cái date xem
  [15:34] minhtv: okay e ,   • 	450 USD: Secret Manager Migration & Key Rotation - 18 hours Tiện coi dùm a sao thằng này nó rỗng, vs đem l
  [15:35] thangn: cái này ở đâu lạ d
  [15:35] thangn: thấy luôn
  [15:36] minhtv: em search trong lịch sử chat, của bên Long bữa làm á , mà tạo ticket empty
  [15:36] thangn: đã lên
  [09:12] minhtv: Thắng, cứ tổng hợp lại mớ task, bao tiền, nói ổng muốn fix cái nào trước thì tạo milestone trên Upwork. Đánh theo prioty
  [09:12] minhtv: * Thắng, cứ tổng hợp lại mớ task, bao tiền, nói ổng muốn fix cái nào trước thì tạo milestone trên Upwork. Đánh theo prio
  [10:36] minhtv: Can you check where we use the php code, I thought we replaced and removed all PHP. Long Vo  mình còn dùng php ko nhỉ ? 
  [10:46] minhtv: Long chắc bận hả a Duong Doan  ơi ?
  [10:47] longvv: e đang bận nha a ơi
  [10:47] minhtv: a Dương ngó dùm e với , có cái rep ổng / hoặc tạo task
  [10:48] duongdn: a cần làm gì ...
  [10:48] minhtv: Can you check where we use the php code, I thought we replaced and removed all PHP.
  [10:48] duongdn: check ở đâu zị ...
  [10:49] minhtv: Trong cái hệ thống support Lyf bữa mình estimate á a. Có thể source code còn ,nhưng e ko chắc nó đang được dùng hay khôn
  [10:49] duongdn: thì bữa mình có đem về đống code, trong đó có project PHP
  [10:49] duongdn: còn nó có dùng hay ko thì phải biết nó host lên ở đâu
  [10:50] duongdn: mình đang nắm những gì của ổng, ổng có các site nào, host ở đâu, có ai có all info để check ko
  [10:52] minhtv: Em không có, cần thì chắc hỏi lại ổng. Em thấy có 1 source API bằng PHP nhưng lại có 1 source BE khác bằng .net . Nên ch
  [10:54] minhtv: Nhìn qua lịch sử thằng PHP quá lâu rồi chưa dùng, từ 2023 theo commits, thằng c# thì gần đây team mình có đụng
  [11:00] minhtv: --- A Dương cần host account nào nhắn ổng / em luôn nhé a ⚠️
  [11:01] duongdn: ko có info trong code nha
  [11:01] duongdn: nhưng có vẻ dùng AWS, theo như code
  [10:37] minhtv: [Security] Android: upgrade vulnerable dependencies (BouncyCastle, Google OAuth, BeanUtils, Jackson) — 2.5 hours ($62.50
  [10:39] minhtv: Lão tiếc tiền hay sao approved cái bé xíu
  [10:56] minhtv: Lu Ho:  hết tuần này Thắng nghỉ ,  nên Lữ sẽ tiếp quản lại dự án này nhé
  [10:56] luhx: là tuần sau mới làm tiếp chứ ha?.
  [10:59] minhtv: Có task thì làm tiếp , nhưng cơ bản cần nắm toàn bộ quy trình , key , rồi code cũ các kiểu
  [11:00] luhx: oke.
  [08:58] minhtv: Thang Nguyen:  coi ổng kêu task gì
  [08:58] minhtv: à, chắc bên admin a Duong Doan  với Long Vo  ngó giúp e phát
  [08:59] longvv: ngó gì á, a cho e xin task dc ko
  [08:59] minhtv: Sandor  [8:53 AM] Hi Jeff, can you please investigate the issue below. Let me know if you need access to anything. #####
  [09:00] duongdn: Long Vo:  có gì gấp ko, ko thì qua đây múc thôi
  [09:03] longvv: ok tí e qua đây check nha, e làm 1 số task bên Maddy phát
  [09:03] longvv: * ok tí e qua đây check nha, e làm est số task bên Maddy phát
  [09:03] longvv: * ok tí e qua đây check nha, e est vài task bên Maddy phát
  [09:05] duongdn: OK e
  [09:26] minhtv: Xong bên Maddy chưa nhỉ ? Do chiều e off sợ bên này ko ai coi , đọc qua thì có vẻ issues này ko ngâm được
  [09:34] longvv: mình có info gì về cái lyf-admin này ko nhỉ
  [09:36] minhtv: Source code để a kiếm
  [09:36] longvv: https://bitbucket.org/lyfappteam/admin/src/dev/ có vẻ là cái này
  [09:37] minhtv: uhm, nhánh dev là mới nhất rùi, thấy có cái PR merged vào
  [09:38] longvv: may quá có pipeline hết r
  [09:39] minhtv: Mình cũng có account vô Azure thì phải đúng ko Thang Nguyen
  [09:41] minhtv: https://dev.azure.com/lyfsupport/Lyf%20Support%20Admin/_build/results?buildId=42&view=results Đây luôn, có thể quản lý p
  [09:41] longvv: ok a
  [10:07] longvv: E fix issue trên luôn r nha, h đưa PR cho ổng approve
  [10:07] minhtv: okay e, hết mấy tiếng thế ?
  [10:08] longvv: 1h à
  [10:08] minhtv: tính cả setup, rồi fix bugs, báo ổng 2.5h đi Thang Nguyen  , tạo cho ổng cái task
  [10:20] thangn: có tạo ticket ko
  [10:20] minhtv: có chứ ,
  [10:23] longvv: giờ e gửi ổng PR nha
  [10:23] thangn: đưa PR đây cho a
  [10:24] longvv: https://bitbucket.org/lyfappteam/admin/pull-requests/100/overview PR nha a
  [10:24] longvv: Bên mình có link admin demo ko nhỉ
  [10:24] minhtv: Cho biết nó bị gì luôn Long iư
  [10:27] thangn: bị gì thì nhắn vô slack giải thích cho ổng luôn nhé
  [10:28] longvv: Nchung là app nó xử lý auth chưa tốt á, có vài case api nó trả về 401 mà bên frontend nó chưa handle case đó, nên thành 
  [10:29] longvv: ok a
  [10:31] longvv: E đã nhắn giải thích nhé
  [10:32] minhtv: Co-Authored-By: Claude Opus 5.5 noreply@anthropic.com
  [10:32] minhtv: Xóa cái này đi,
  [10:32] minhtv: Copy check xíu
  [11:17] longvv: e xóa rùi nhe
  [11:18] minhtv: Long Vo:  ngó cái tin nhắn của lão phát
  [11:19] longvv: ổng đưa cái video thui
  [11:19] longvv: ko có gì á
  [11:19] longvv: e coi r
  [11:19] minhtv: vậy là cái của em fix chưa ?
  [11:20] longvv: fix r đó a
  [11:20] longvv: nó là cái issue trên mình đã fix á
  [11:21] minhtv: okay e, a đã kêu lão merge
  [13:23] minhtv: https://dev.azure.com/lyfsupport/Lyf%20Support%20Admin/_build/results?buildId=193&view=logs&j=12f1170f-54f2-53f3-20dd-22
  [13:25] duongdn: cho a account vào check nha
  [13:26] minhtv: a chọn jeff@nustechnology.com‎ sau đó send code á a
  [13:27] minhtv: Thang Nguyen:  ngó cái password thử xem , test thử mấy chỗ mobile , web luôn
  [13:28] duongdn: rồi nha
  [13:28] minhtv: 961958
  [13:29] duongdn: ok đã vào
  [13:31] minhtv: lịch sử gần nhất tụi kia cùng pipeline build được
  [13:32] duongdn: ko rõ, mò thôi, ko có info gì bên này
  [13:33] duongdn: đây là task gì vậy?
  [13:33] minhtv: https://lyfapp.atlassian.net/browse/LSA-1523
  [13:33] minhtv: https://bitbucket.org/lyfappteam/admin/pull-requests/100/overview
  [13:33] minhtv: Task với PR ở trên á a
  [13:35] duongdn: theo như code thì bạn sửa logic
  [13:35] duongdn: còn đây lại là lỗi ko cài package được
  [13:35] duongdn: này có khi revert vẫn lỗi, dạng package bị out-of-date
  [13:36] duongdn: này theo lí thuyết ko thuôc scope mình đâu nha, nên báo bên họ để xử lí
  [13:36] minhtv: Cho em con số , em báo ổng luôn
  [13:36] duongdn: ko est được nha
  [13:37] duongdn: cần debug xem lỗi sinh ra từ thư viện nào, ảnh hưởng tới cac chỗ nào, common của loại bug này thôi
  [13:38] minhtv: Vậy trước mắt cần xin mấy giờ coi trước thế a ?
  [13:39] duongdn: dạng này chắc xin trước 2h đi
  [13:39] duongdn: mà này gấp ko, nếu ko gấp thì nên ưu tiên để LongVV làm, hiện bạn task cũng ko có nhiều
  [13:40] minhtv: Long off chiều nay, cái task này gấp á a
  [13:40] duongdn: ok vậy a làm, để a báo bên kia
  [13:41] minhtv: okay a , nhờ a help phát , Thắng tạo cái task Firebase deploy luôn , a nói chuyện vs khách
  [13:41] thangn: mobile tính năng work bình thường
  [13:41] minhtv: Screenshot 2026-10-06 at 13.41.27.png
  [13:43] thangn: https://lyfapp.atlassian.net/browse/LSA-1524
  [13:44] minhtv: Chắc tạo 1 cái là pipeline error là ổn, bên trong nó có thể có nhiều issues sau khi pass cái hiện tại
  [13:47] duongdn: request BDD add a vào Sandor để task log nha
  [13:49] minhtv: added nhé a ơi
  [14:00] duongdn: https://github.com/peaksandpies/universal-analytics/issues/188
  [14:00] duongdn: đây là thư viện gây lỗi nha
  [14:00] duongdn: nếu cần giải thích gì thêm thì a sẽ viết report, mà chắc để tìm cách fix đã
  [14:22] duongdn: https://bitbucket.org/lyfappteam/admin/pull-requests/101
  [14:22] duongdn: hình như mình ko có quyền merge PR
  [14:22] minhtv: đúng rùi, ổng merge mới được
  [14:23] duongdn: vậy nói ổng thử merge cái này xem
  [14:23] minhtv: okay a
  [08:43] minhtv: Ổng approved cái PR của a Dương tối qua rồi, có admin account nào để test lại cái em đã làm ko Long Vo  ? ⚠️
  [08:44] longvv: admin account thì chắc hỏi ổng á, e test trên local nên ko nắm account
  [08:45] minhtv: cái deploy này là trỏ vào dev , ko biết production thì sao ?
  [08:45] duongdn: pile line chạy ok lại rồi, good, giờ chạy lại pileline của Long xem sao
  [08:46] duongdn: à quên chắc ko cần, nó cũng merge vào dev rồi
  [08:48] minhtv: mình có check được lên production cần làm gì ko nhỉ?
  [08:49] duongdn: tương tự thôi, ko có gì đặc biệt
  [08:50] minhtv: Ý là giờ cần làm gì để khách test trên production á a ?
  [08:52] longvv: pipeline chạy xong là ổng test dc à
  [08:53] minhtv: Vậy là tuy là merged vào nhánh dev nhưng nó là production đúng ko?
  [08:53] longvv: ko, dev là dev, a mún merge vào prod thì phải merge từ dev qua main
  [08:53] longvv: xong nó sẽ chạy pipeline deploy lên prod trên nhánh main
  [08:54] minhtv: Tạo PR luôn Long ơi
  [08:54] longvv: ok a
  [08:54] duongdn: merge cả phần a làm vào
  [08:56] longvv: https://bitbucket.org/lyfappteam/admin/pull-requests/102/overview
  [08:56] longvv: thôi để e báo ổng lun
  [08:56] minhtv: Để PR đó đi, a báo ổng test Dev rồi, khi dev ngon lành thì kêu ổng vô production luôn
  [08:56] longvv: ok a
  [10:18] minhtv: Sandor  [10:17 AM] do you have the dev url? [10:18 AM]do you have the dev url?
  [10:26] longvv: quào, bên này ko biết sự tồn tại của staging admin luôn à
  [10:27] longvv: để e xem thử xem có ko nhe
  [10:39] longvv: https://lyf-admin-demo.web.app/auth/sign-in
  [10:41] minhtv: có account ko nhỉ ?
  [10:42] longvv: e ko
  [10:43] duongdn: mình có ssh lên server được ko
  [10:43] duongdn: thì tự tạo acc thôi
  [10:44] longvv: e có google cloud, e đang tự tạo acc cho ổng test
  [10:59] minhtv: When you can, please create accounts in dev for: maricar.torres@lyf.app sandor@lyf.app
  [10:59] longvv: sandor@lyf.app 2Pq6MygjaP6qLIksTyDx
  [11:00] longvv: ơ :))
  [11:00] longvv: e mới tạo lun a Minh nhắn
  [11:00] longvv: :))
  [11:00] minhtv: account cũng trùng hợp phết
  [11:00] longvv: maricar.torres@lyf.app 2Pq6MygjaP6qLIksTyDx
  [11:00] longvv: password cũng y chang
  [11:10] minhtv: sao ổng kêu ko chạy
  [11:10] minhtv: maricar.torres@lyf.app  ko đúng
  [11:12] minhtv: đổi lại cho nó trùng pass của sandor@lyf.app với
  [11:13] longvv: để e update lại
  [11:16] longvv: rùi a Minh ới
  [11:16] longvv: kêu ổng thử lại giúp e nha
  [11:55] minhtv: Long Vo:  em add được production user admin như cái nãy ko ?
  [13:23] minhtv: ổng gửi 1 file báo lỗi bên trong
  [13:27] minhtv: Long có thời gian fix ko hay dính bên Celine ?
  [13:28] longvv: Có nha a, tí e check qua
  [17:23] longvv: này ko phải bug của bên mình nha, mình báo ổng 1h fix cái này nha a, e làm trước r, cái này chỉ xảy ra ở staging thôi, p
  [17:23] minhtv: oke e
  [08:31] minhtv: nay xử xong bên này okay ko Long ơi ?
  [08:52] longvv: https://bitbucket.org/lyfappteam/lyf-backend/pull-requests/547/overview
  [08:52] longvv: e xong rn ha a
  [08:52] longvv: * e xong r nha a
  [08:55] minhtv: test kỹ nhé, đừng chỉ test đúng mấy cái chỗ ổng scréenshot, ngó xem chỗ khác còn ko nhé
  [15:46] minhtv: Screenshot 2026-10-08 at 15.46.27.png
  [15:46] minhtv: A check qua vẫn còn lỗi á
  [15:46] longvv: ổng deploy chưa nhỉ
  [15:47] minhtv: dev.azure.com/lyfsupport/70d204d3-c402-4c35-b9df-86854d6b688a/_build/results?buildId=195
  [15:47] minhtv: Rồi á
  [15:48] minhtv: a check qua toàn bộ lỗi y chang
  [15:53] longvv: ko hẳn là y chang, nó ra lỗi khác
  [15:53] longvv: phải fix tiếp =))
  [15:54] minhtv: Nhìn thì nó y chang
  [15:55] longvv: trc là lỗi google cloud nó trỏ về prod ko có quyền, h thì lỗi code do ko có data nó văng lỗi
  [15:56] minhtv: mà sao nó đúng ngay cái chỗ ổng screenshot dữ , coi fix nhanh được hem ?
  [15:58] longvv: https://bitbucket.org/lyfappteam/lyf-backend/pull-requests/548
  [15:58] longvv: a kêu ổng merge nha
  [15:58] longvv: * a kêu ổng merge nhé
  [15:58] minhtv: lần này chắc chưa á
  [16:14] longvv: trên local thì e chắc r, lên demo cũng ok thui
  [16:17] minhtv: merged , đang chờ deploy
  [16:22] minhtv: Screenshot 2026-10-08 at 16.22.51.png
  [16:23] minhtv: Vẫn còn Long ơi 🥶
  [16:26] minhtv: Khó quá nhờ a Dương support thêm nhé, 1 cái này ném hơi nhiều PR
  [16:31] longvv: lại ra lỗi khác, cái này hỏi ổng xem trên prod có bị ko nha a
  [16:31] longvv: nhiều khi prod nó lỗi sẵn r
  [16:32] longvv: nếu bị thì e sẽ fix, ko bị thì e check lại cho cẩn thận, cái này nó đổi syntax sql
  [16:32] longvv: nên cũng sợ
  [16:32] minhtv: e hỏi ổng đi
  [16:33] longvv: ok a
  [17:05] longvv: bên prod lỗi lè lun
  [17:06] minhtv: báo ổng xem
  [17:06] minhtv: rồi estimate báo các kiểu, coi account prod thì sao
  [17:08] longvv: okie a
  [09:26] minhtv: Fix luôn đi Long ơi
  [09:26] longvv: Ok a
  [10:48] minhtv: Xong chưa Long ơi?
  [11:00] longvv: e xong r nha
  [11:00] longvv: có nhắn ổng nhờ merge pr r
  [13:16] thangn: cus có gửi một bức ảnh
  [13:19] minhtv: ko lẽ Long code từ code cũ fix ?
  [13:20] longvv: e ko pull dev về r merge vô nhánh đang làm th à
  [13:21] minhtv: Sync latest rồi báo ổng phát
  [13:38] minhtv: Lúc nào cũng check out từ latest nhé Long, như vậy làm chậm 2 bên , rồi mất công giải thích mình check out từ đâu ra. Hô
  [13:42] longvv: ok a
  [15:49] minhtv: Long Vo:  cái admin staging lão đổi password rồi , tạo thêm 1 cái nội bộ để test xem sao
  [15:50] longvv: Có gì tí e tạo, e đang chạy re-tagging cho Celine
  [16:17] minhtv: Ngó ngó tạo a cái tài khoản để chốt bên này phát
  [16:20] longvv: Login: jeff@nustechnology.com / K1oRWUCgsFKV
  [16:20] longvv: day nha a
  [16:32] minhtv: Tạo 1 cái lên production từ nhánh dev hiện tại luôn e ơi, PR á, a thấy lần này qua rồi
  [16:33] longvv: https://bitbucket.org/lyfappteam/lyf-backend/pull-requests/550/overview
  [16:33] longvv: day nhe a
  [16:38] minhtv: https://lyfapp.atlassian.net/browse/LSA-1523 Thang Nguyen  edit dùm a cái 1523 này thêm phần docs testing của ổng trong 
  [16:55] thangn: Hi @Sandor, I’ve summarized the additional hours spent on changes and added the related issues to the ticket for you, as
  [16:56] minhtv: Hợp lý , dứt
  [16:56] minhtv: Remind lại lão cái cũ còn chưa thanh toán phát
  [16:56] thangn: [Android] Cleanup dependency conflicts & unstable versioning — 6 hours ($150) https://lyfapp.atlassian.net/browse/LSA-15
  [16:57] thangn: cái này hả
  [16:57] minhtv: [Security] Android: upgrade vulnerable dependencies (BouncyCastle, Google OAuth, BeanUtils, Jackson) Link: https://lyfap
  [16:57] minhtv: có 2.5h , 😅
  [09:42] minhtv: Long Vo:  coi sao ổng ko login được nữa, mật khẩu cũ mình đưa ổng cũng ko dùng được -> Sau đó ổng mới thử reset password
  [09:44] longvv: ok a
  [09:47] luhx: bên này sao slack bị đá ra ta, login lại nó hiện Access Denied, có ai bị không nhỉ.
  [09:47] minhtv: dùng Google xem [thread: 4 replies]
    └ [09:48] luhx: gg không được nhớ bữa là sai mail á.
    └ [09:48] minhtv: Cách nào cũng được , thử xem
    └ [09:49] luhx: ý là thử rồi mà không được á.
    └ [09:52] minhtv: Lữ nhầm thành Tony thôi, bên này Jeff mới đúng
  [09:51] longvv: này liên quan tới config email trước đó, mình ko có account check
  [09:52] longvv: có lẽ nó bị disable hay gì đó
  [09:52] longvv: ko có account nên mình ko check nguyên nhân dc
  [09:53] minhtv: A chưa hiểu cụ thể lắm, mật khẩu tự nhiên ko đăng nhập được nữa, mật khẩu mà mình cấp cho ổng ấy
  [09:53] longvv: ko biết ổng có đổi password ko
  [09:54] minhtv: ổng nói ổng ko đổi á
  [09:54] longvv: cái tính năng forgot thì email ko work r
  [09:54] minhtv: Vậy estimate tiếp cái tính năng forgot password cho ổng phát
  [09:54] minhtv: rồi cấp lại cho ổng mật khẩu
  [09:57] longvv: này bên mình có account mandrill ko nhỉ
  [09:57] minhtv: Chưa có á
  [10:03] longvv: e mất dấu slack r
  [10:03] longvv: a cho e xin nha
  [10:03] longvv: e tính xin ổng xem có account mandrill nào ko
  [10:03] minhtv: E vô bằng Slack đi, rồi nhập mail vô lấy code
  [10:03] longvv: để gắn vô
  [10:06] longvv: đợi ổng rep r e mới tính đường est nha a
  [10:56] luhx: có msg nha mn.
  [10:57] minhtv: ổng có mời vô mail Chimp rồi á
  [11:04] minhtv: Long nay có time check ko nhỉ ?
  [11:08] longvv: có nha a ơi
  [11:09] longvv: đầu giờ chiều e qua check nhé
  [14:07] longvv: Minh Trinh: chắc báo ổng mình mất 1h update lại cho mail nó work trên demo nha a
  [14:09] minhtv: Nó chạy chưa em?
  [14:10] minhtv: cứ báo ổng đi, tạo task như bữa Thắng làm ấy
  [14:11] longvv: chắc e báo 2h, mới phát hiện ra là bên admin còn gọi api qua backend php
  [14:12] minhtv: uhm e, coi kỹ nhé, tránh báo nhiều lần
  [14:31] minhtv: Long Vo:  coi lại mấy task Thắng tạo , nó đầy đủ info https://lyfapp.atlassian.net/jira/software/projects/LSA/boards/4?f
  [14:32] minhtv: Em tạo nó trống trơn luôn, update lại phát
  [14:37] longvv: e update r nha
  [14:38] minhtv: làm luôn đi, do nó dính tới mấy task khác để lấy tiền, ko có login thì làm ăn gì nữa.
  [14:47] longvv: e reset password cho lão r
  [14:59] minhtv: Xong task trên báo nhé
  [15:43] longvv: Bên source PHP nó deploy bằng gcloud, mà gcloud nó h chỉ support runtime PHP 8.2, ko còn PHP 7.4 nữa nên là lại sinh ra 
  [15:43] duongdn: nghe lạ
  [15:43] duongdn: vậy chứ lâu nay nó chạy bằng cách nào
  [15:44] duongdn: bữa a cũng bị cái gần vậy mà đơn giản là package dependcy nó update thôi, này thì make sense
  [15:44] duongdn: còn cả cái PHP version thì hơi lạ à, vậy app giờ banh à?
  [15:47] longvv: api PHP vẫn chạy dc bth, mà h muốn deploy lên thì ko dc
  [15:48] longvv: API nó vẫn đang chạy với runtime 7.4, mà h mình muốn deploy bằng runtime 7.4 thì nó ko còn support nữa
  [15:50] longvv: với lại e nhớ có đợt ổng muốn ko xài code php nữa đúng ko nhỉ
  [15:51] longvv: image.png
  [15:51] minhtv: PHP ko dùng nữa, dùng .Net
  [15:52] longvv: v ok, e sẽ move function qua .NET, r cho admin nó xài endpoint của .NET luôn, ko xài của php nữa
  [15:52] longvv: nma chắc là e sẽ báo ổng có update ticket tí
  [15:53] minhtv: Nhớ là php mình bỏ rồi á, theo a hiểu là vậy, đừng nói ổng nãy giờ mình code trên đó rồi tính tiền
  [15:57] minhtv: Screenshot 2026-10-13 at 15.57.02.png
  [15:57] minhtv: có vẻ nhầm thật, mình code trên source cũ , mà lâu rồi chưa update
  [15:57] minhtv: cái PR trước đó 6/2023
  [15:57] longvv: e cũng hờ dc r nên mới để 2h
  [15:58] minhtv: ây da, coi lại phía .Net xem
  [15:58] longvv: bên .NET có cái reset password, chắc re-use dc
  [15:58] minhtv: chắc cho AI hỏa tốc phát, nhầm , kêu lão archive mợ cái source đó đi cho khỏi nhầm cho rồi
  [15:59] longvv: để tí e xong r e kêu lão archive luôn
  [08:35] minhtv: ổng merged
  [08:41] minhtv: Cái reset password, nó gửi mail cấp password mới -> Mà cái cũ vẫn login được
  [08:42] minhtv: Screenshot 2026-10-14 at 08.42.01.png
  [08:42] minhtv: Cái pass mới nó ko chạy
  [08:47] longvv: k phải lỗi lắm, e check thì trong admin user có tận 2 email jeff
  [08:48] longvv: để e xóa 1 cái
  [08:48] longvv: nó đang reset cái kia
  [08:48] minhtv: jeff@nustechnology.com , sao lại có 2 cái ta
  [08:48] longvv: ko bít lun, để e xóa
  [08:50] minhtv: query thử có bao nhiêu email giống nhau có các ID khác nhau xem
  [08:53] longvv: có jeff thôi à
  [08:54] longvv: e mới xóa 1 r
  [09:06] minhtv: giờ a reset nó ko gửi về nữa 😅
  [09:07] longvv: image.png
  [09:08] minhtv: cái 8h57 ko có , giờ mới có
  [09:08] minhtv: và nhập cái trong mail nó báo sai
  [09:09] longvv: mình đang xài ké của prod, nên là cái link trong mail nó link tới prod
  [09:09] longvv: a tạm back về demo admin rùi nhập
  [09:11] minhtv: lỗi tùm lum, a nhập mật khẩu mới xong nó tự login -> xong logout -> Xong mật khẩu mới hết tác dụng -> Quay về mật khẩu t
  [09:11] minhtv: em tự xử đi, nào hoàn thiện báo a
  [09:11] longvv: e thấy work bth mà ta
  [09:11] minhtv: Ko chạy được nha
  [09:12] longvv: image.png
  [09:12] minhtv: e nhập mật khẩu cty vô đi
  [09:12] minhtv: ở cái new password
  [09:12] minhtv: test phải E2E chứ, chơi nửa đường vậy
  [09:38] longvv: image.png
  [09:38] longvv: lão có hỏi nha a
  [09:40] longvv: a nhắn xong r e gửi PR cho ổng merge
  [09:40] minhtv: gửi đi
  [11:48] minhtv: coi ổn hết chưa nhé Long?
  [11:48] longvv: r a owi
  [11:48] longvv: e test roi
  [11:49] minhtv: tự tin thì báo ổng nha
  [13:53] minhtv: https://lyfapp.atlassian.net/browse/LSA-1524 Long Vo  cái này xong rồi đúng ko e ? A mới chuyển sang inreview , nãy nó n
  [13:53] longvv: này ko phải e làm á
  [13:54] longvv: vụ deploy chắc là a Dương fix r ⚠️
  [13:54] minhtv: vậy hẳn là a Dương làm, confirm giúp e phát ⚠️
  [13:54] minhtv: Để đòi tiền ổng 1 lượt 🤣
  [13:54] longvv: Duong Doan: cái task trên là vụ deploy đúng ko a, đúng thì fixed r á
  [13:56] duongdn: này dùng acc nào coi vậy, quên luôn rồi
  [13:56] duongdn: Vinn, Tony ?
  [13:56] longvv: jeff a'
  [14:02] duongdn: đúng rồi cái này làm rồi nha, status cuối cùng a nhớ là đã merge vô live, Long merge hay sao á
  [14:02] duongdn: theo sau 1 cái task nào đó
  [14:02] longvv: ổng merge á, z duyệt thui a Minh Trinh
  [14:02] minhtv: đã đòi tiền 😊
  [14:17] minhtv: 
  [14:17] minhtv: Screenshot 2026-10-14 at 14.17.31.png
  [14:18] minhtv: Long Vo:  a có 1 app khác , có mớ API này ko works, cũng khó nói mất bao lâu, nhưng lão này vẫn muốn fixed cost , e ngó 
  [14:18] longvv: a cho nó gen artifact r share e nha
  [14:18] longvv: để e check
  [14:24] minhtv: Lyf API Health Check - iOS.html
  [14:25] longvv: ok a
  [14:25] minhtv: còn 1 chú nữa, lát a gửi, tụi này nó na ná nhau
  [14:28] longvv: trc mắt xin lão 1h check nha a
  [14:29] minhtv: okay , check đi em, chờ 20p nữa a gửi bản full của Android
  [14:41] minhtv: Lyf Android – API Reference & Flows.pdf
  [14:41] minhtv: Full của Android , nó tương tự app iOS , nhưng nhiều info hơn
  [14:43] longvv: mấy cái api  này của php
  [14:43] longvv: chà
  [14:43] longvv: để e coi tính năng move qua sao
  [14:46] minhtv: ây da, có vẻ căng, thế thì nhiều cái làm phết
  [14:53] longvv: e tính qua cỡ 16h
  [14:53] minhtv: Vậy a Buffer lên 20h , do thấy hay lỗi tới lui lắm 😀
  [14:54] longvv: oki a
  [14:54] longvv: mà cần tester ko nhỉ, cái này chắc cũng test nguyên cái app
  [14:54] longvv: * mà cần tester ko nhỉ, cái này chắc cũng test nguyên cái app á
  [14:55] minhtv: Cần , nếu ổng approve thì phải có tester , cái này to mà, bên mobile cũng lớn á
  [14:57] longvv: dev đang migrate giữa chừng cái biến mất 🤣
  [15:03] minhtv: Dev trước của ổng hả?
  [15:04] longvv: đúng r á, chắc đang migrate giữa chừng cái biến mất
  [15:04] minhtv: Summary lại toàn bộ những task cần làm của cái backend , cái nào đem từ PHP ra C# thì gửi a luôn , a tạo task phát
  [15:12] longvv: # Lyf Backend: Required Work ## P0: Release Blockers 1. **Restore In-App Purchase Products (`/products`)**    - Restore 
  [15:13] longvv: * # Lyf Backend: Required Work ## P0: Release Blockers 1. **Restore In-App Purchase Products (`/products`)**     - Resto
  [16:53] minhtv: Long Vo:  ngó slack dùm a phát xem cái For You e biết ko ?
  [16:55] longvv: e coi nó là cái trang này https://lyfsupport.app/
  [16:55] longvv: ko biết có repo chưa
  [16:55] minhtv: có hết rồi á
  [17:06] longvv: hnhu ko có rùi
  [17:06] longvv: e check repo ko có trang này
  [17:07] longvv: image.png
  [17:07] longvv: nó là trang wordpress
  [17:13] minhtv: e kêu ổng share thử
  [08:31] duongdn: về WP thì cũng đâu cần thiết có repos nhỉ, có admin, clone về làm rồi upload lên thôi, hoặc sửa trực tiếp từ admin edito
  [08:32] duongdn: tất nhiên có vẫn tốt
  [08:45] luhx: nhầm dự án không Minh Trinh myID hay brian chứ?.
  [08:45] minhtv: Brian delay, thêm người thêm rối, trừ khi Lữ xong mấy bên khác
  [08:46] luhx: vậy bên này có task hả, vậy ném cho Khoa đi :v
  [08:47] minhtv: https://bitbucket.org/lyfappteam/workspace/repositories Khoa, em thấy cái nào có Android , iOS clone về hết nhé, 4 sourc
  [08:47] khoatd: ok anh
  [08:48] khoatd: auth nào vậy anh?
  [08:56] minhtv: Jeff á
  [09:00] khoatd: 
  [09:00] khoatd: chắc là bộ này
  [09:01] khoatd: Screenshot 2026-10-15 at 09.01.02.png
  [09:03] minhtv: Chuẩn, 2 cái app có chữ support hỏi Lữ, còn 2 cái app chỉ có android/ ios mới hoàn toàn
  [09:45] minhtv: Lyf_ForYou_Technical_Design.pdf
  [09:45] minhtv: Long Vo:  coi phần Backend làm mất bao lâu
  [09:47] longvv: tí e check nhé
  [09:49] minhtv: Khoa Tran:  coi luôn trong cái docs ở trên mobile làm mất bao lâu. Mới hoàn toàn nhé, phụ thuộc vào chút info trên Slack
  [09:51] khoatd: em mới run được 2 cái lyfsupport-android với lyfsupport-ios
  [09:51] khoatd: info trên là cho 2 cái ios với android hả anh
  [09:51] minhtv: chính xác
  [09:51] khoatd: cái app đó commit mới nhất là 2023 rồi
  [09:51] minhtv: Chuẩn đét
  [09:51] khoatd: để run 2 cái lên trước cái đã :))
  [09:52] minhtv: Em clone về thôi, chứ a ko nghĩ em có thể run ngay được, chủ yếu biết code đang có gì ở 2 cái source 2023
  [10:26] khoatd: Screenshot 2026-10-15 at 10.26.35.png
  [10:42] minhtv: Chỉ cần estimate thôi, chưa cần làm nhé Khoa
  [11:03] khoatd: Screenshot 2026-10-15 at 11.02.27 (2).png
  [11:03] khoatd: ok rồi, giờ bắt đầu est :))
  [11:13] minhtv: Dùng AI fix cho run được à, tuy nhiên đừng commit, vì ông này fix cost, ổng hỏi thui
  [11:14] khoatd: đúng rồi anh, để run được rồi est tiếp chứ chưa push code, đã charge được đâu :)))
  [11:14] minhtv: Em có push cũng ko charge được 🤣
  [11:20] minhtv: Xong rồi về showcase nhé, bên này chỉ onboard làm quen, em estimate cho hiểu app tí thôi
  [11:20] minhtv: * Xong rồi về showcase / dự án khác nhé, bên này chỉ onboard làm quen, em estimate cho hiểu app tí thôi
  [11:21] khoatd: đưa ra con số luông không anh
  [11:21] minhtv: đưa chứ, để a mới biết gửi ổng
  [11:21] khoatd: fix cost thì est cũng cần cân đo đông đếm kỹ à
  [11:30] khoatd: mỗi platform có 2 option: ios: - 17–26 days - 13–19 days  android: - 30–56 - 24–41 đã cố gắng giảm đi gần 2/3 rồi mà con
  [11:31] khoatd: Android số lớn hơn nhiều là do cần: Nâng cấp Google Play (targetSdk 36, Billing 8, 16 KB)
  [11:31] minhtv: Bỏ hết đi, tính lại riêng tính năng thôi
  [11:31] minhtv: con số upgrade tính riêng, breakdown ra rõ
  [11:34] khoatd: vậy thì android với ios tương đối như nhau: 17–26 days 13–19 days anh thấy option nào phù hợp để em breakdown ra luôn
  [11:35] minhtv: Số lớn ác, em break down ra thử
  [11:36] khoatd: đầu tiên ra con số gấp 3 lần như vậy :))
  [11:37] minhtv: em dùng AI estimate nó ảo là đúng rùi, nghĩ tới việc dùng AI hỗ trợ code nữa
  [11:38] khoatd: mới vào kêu nó est là nó mặc định est làm thủ công, sau kêu nó t có 3,4 con agent siêu cấp vip pro nó giảm đi 2/3 :)))
  [11:40] minhtv: A cần chi tiết hơn, làm sao có thể gửi khách chẳng hạn,
  [11:44] minhtv: May là tụi làm AI nó còn có tình người, vì AI luôn estimate số rất lớn. Ít ra khách hàng dùng cái đó đối chiếu họ cũng t
  [11:46] luhx: tính ra AI nó est toàn số trên trời mà kêu nó làm thì có chút éc.
  [13:29] minhtv: Khoa, Long xong gửi a nhé
  [13:32] khoatd: ok anh, chờ miếng nữa nha
  [13:33] longvv: quả backend nó estimate ác thật 75h 🤣
  [13:34] minhtv: Riêng estimate không được tin AI
  [13:34] minhtv: Nếu tin AI, a đã tự làm luôn rồi 🤣
  [13:36] khoatd: iOS_Estimate.pdf
  [13:37] khoatd: Android_Est.pdf
  [13:38] minhtv: Hiện tại chưa rõ khách sẽ làm phần ForYou có video hay không, nên estimate hiện tại sẽ bỏ ra, nếu ổng add thêm phần vide
  [13:43] khoatd: Estimate hiện tại vốn đã không gồm phần video nha anh
  [13:44] longvv: ``` Phase 1   - Item 1: Migrations (1.5h)   - Item 2: FeedConfig service and kill switch (1h)   - Item 3: recordEvent() 
  [13:44] longvv: * ``` Phase 1   - Item 1: Migrations (1.5h)   - Item 2: FeedConfig service and kill switch (1h)   - Item 3: recordEvent(
  [13:45] longvv: * ``` Phase 1: works with current apps but has limited data   - Item 1: Migrations (1.5h)   - Item 2: FeedConfig service
  [14:30] minhtv: Sandor có phản hồi quarterly feedback nha mọi người ơi. Good Job --- Feedback from Lyf App Pty Ltd Rating: 10/10 Solid t
  [14:52] minhtv: https://lyfapp.atlassian.net/jira/software/projects/LSA/boards/4?filter=assignee%20%3D%2070121%3Aa8e215f0-e608-4284-9af3

### Senior Devs — 8 messages
  [10:30] namtv: Hi mọi người, Từ kết quả đánh giá dùng AI, có 2 nhóm cần action: 1. Nhóm ở level 2: cần nhanh chóng nâng lên level 3. Mỗ
  [13:24] namtv: Tình hình monitor sao rồi mọi người? Cả 2 list
  [13:35] kietnvt: Em đã updated bên e ở cả 2 list nha a Năm
  [13:36] phucvt: Em đã update nha anh
  [13:44] thinhld: Em đã update nha a
  [13:51] minhtv: Em cũng updated
  [19:42] tamlh: Em đã update nha a
  [21:09] duongdn: ta update rồi nha

### Technology Department — 52 messages
  [10:36] namtv: Đây là chi tiết về các levels trong đánh giá, ví dụ, cách đạt level các thứ nha mọi người: https://wiki.nustechnology.co
  [15:36] namtv: Hello anh em, Tuần này các anh lớn đua nhau ra model mới, quảng cáo đều rất ngon, như GPT 6 Sol ngang ngửa Astra mà giá 
  [15:38] duongdn: Có ai giống mình k, hồi xưa thích dùng con này con nọ để trải nghiệm lắm, giờ nó ra nhiều quá thì quá tải ... 🥲
  [15:44] namtv: Đúng rồi, quá nhiều 😩 Sau khi bôn ba nhiều thứ, cả framework, ADE, agent khác các thứ thì lại thấy OpenSpec phù hợp, nh
  [15:44] namtv: * Đúng rồi, quá nhiều 😩 Sau khi bôn ba nhiều thứ, cả framework, ADE, agent khác các thứ thì lại thấy OpenSpec phù hợp, 
  [09:00] tiennd: Hi anh em, cho em hỏi chút.  Bên cus có invites em vô Digital Ocean. Nhưng khi em join vào thì báo lỗi: "Sorry, you’re u
  [09:00] tiennd: image.png
  [09:00] tiennd: * Hi anh em, cho em hỏi chút.  Bên cus có invite em vô Digital Ocean. Nhưng khi em join vào thì báo lỗi: "Sorry, you’re 
  [09:06] tiennd: hình như có vẻ em thấy được vấn đề rùi. Khách invite ken@nustechnology.com  Em vó Digital Ocean login bằng google => nhậ
  [09:07] tiennd: * hình như có vẻ em thấy được vấn đề rùi. Khách invite ken@nustechnology.com  Em vô Digital Ocean login bằng google => n
  [09:14] namtv: Do ai đó tạo Gmail trên Google account đó thôi (hồi xưa bị nên nhắc mọi người ko được thêm Gmail vào Google acc). Google
  [10:21] phongtb: Hi ae, gần đây em làm front-end, phải code bám theo Figma. MCP chính chủ của Figma cần Dev Mode seat (trả phí), nhà nghè
  [10:24] chientx: Hay quá Phong, a cũng vừa gặp limit với MCP Figma hôm nay 🙂
  [10:24] duongdn: tuyệt vời, ngay đúng điểm nghẽn
  [10:25] duongdn: bia đâu :v
  [10:35] namtv: Hay ta. Giờ mới biết Figma có cái plugin API để tự làm cái này và ko lock vào dev mode. Trước tưởng có dev mode mới làm 
  [10:37] namtv: (thực ra với các projects có dùng thì mình có đường clone về acc Figma dev công ty (paid, có dev mode) và dùng MCP, nếu 
  [10:37] namtv: * (thực ra với các projects có dùng thì mình đang dùng đường clone về acc Figma dev công ty (paid, có dev mode) và dùng 
  [10:41] phongth: quá tuyệt vời, ban thưởng 1 hộp khô gà thôi anh Duong Doan 🍺
  [10:43] duongdn: luộc ăn hết rồi em 🤣
  [10:52] minhtv: Em đang sử dụng Figma của công ty với cách này và export key để chia sẻ cho khoảng 7–8 devs cùng sử dụng trên nhiều dự á
  [11:50] phongtb: Hi ae, đang trên đà “lười” 😅 việc copy description, copy từng comment của issue Redmine rồi dán vào AI để nhờ tóm tắt, 
  [13:31] namtv: >Bên công ty mình chưa có (em thử endpoint /mcp thì báo not found), nên em dùng repo ở trên cho nhanh. Đúng rồi. Trước đ
  [15:11] namtv: Gần đây model tên Jev của Typesafe khá hot, từ đó mở ra 1 loại hình model mới: model chỉ đưa ra quyết định (Decision mod
  [15:12] namtv: * Gần đây model tên Jev của Typesafe khá hot, từ đó mở ra 1 loại hình model mới: model chỉ đưa ra quyết định (Decision m
  [15:16] namtv: * Gần đây model tên Jev của Typesafe khá hot, từ đó mở ra 1 loại hình model mới: model chỉ đưa ra quyết định (Decision m
  [15:18] duongdn: Free output token? Giờ mới biết, mấy ngày nay test dè dặt, để chém :v
  [15:18] namtv: Nếu cần chọn thì: - Jev rẻ hơn Luna Decisions nhiều, và benchmark cao hơn (https://artificialanalysis.ai/articles/artifi [thread: 1 reply]
    └ [15:23] nghiepnq: Muốn dung local free để test hay làm này kìa thì dùng Laya - https://huggingface.co/convaiinnovation
  [15:20] chientx: Câu hỏi nhỏ cho vui: Vì sao mô hình này lại free output token, trong khi các LLM truyền thống thì output token đắt hơn n
  [15:21] namtv: Toán rẻ hơn văn 🤣
  [15:22] kietnht: nó trả ra có mấy chữ mà ko lẻ tính tiền nữa 😓
  [15:22] namtv: Ko phải em. Chi phí compute ko hẳn do trả ít hay nhiều, mà là cơ chế ra output ấy
  [15:23] chientx: e đưa nó list 100 options, mỗi options dài ngoằng thì cũng đâu gọi là mấy chữ 🙂
  [15:23] duongdn: quyết tâm ko search câu hỏi này, nhưng nghĩ mãi ko ra, thua :v
  [15:23] chientx: ko nắm được cốt lõi lý thuyết rồi =))
  [15:24] namtv: Đúng rồi, phải nghĩ lại câu hỏi sao output của LLM khác nó mắc, từ câu trả lời đó rồi map lại decision sẽ hiểu 😄
  [15:26] nghiepnq: chắc bên LLM cần loop để nối thành câu trả lời, còn LLM decision thằng này thì không cần đưa ra câu trả lời thôi 😄
  [15:27] chientx: ý đầu đúng, ý sau hơi khó hiểu nha Nghiệp, nó vẫn trả lời cho em mà =))
  [15:28] chientx: mà tuỳ e định nghĩa "trả lời" là sao :p, có khi e đang hiểu là văn như người
  [15:30] nghiepnq: * Muốn dung local free để test hay làm này kìa thì dùng Laya - https://huggingface.co/convaiinnovations/laya thử mọi ngư
  [15:30] nghiepnq: * Muốn dung local free để test hay làm này kìa thì dùng Laya - https://huggingface.co/convaiinnovations/laya thử mọi ngư
  [15:34] nghiepnq: em nhờ AI support thì kết như này chắc rỏ hơn:  Khi nhận đầu vào (prompt/state), mô hình chỉ chạy một lượt duy nhất (sin [thread: 1 reply]
    └ [15:38] samht: LLM là loop + sinh ban đầu cứ nghĩ là decision model ko cần loop, chỉ sinh ra đáp án sau 1 đợt phân 
  [15:34] kietnht: cái bước predict next word naturally chắc là bước tốn kém tính toán nhất, theo a Năm nói e đoán nó ko naturally lắm :v [thread: 2 replies]
    └ [15:35] nghiepnq: lúc mới ra có test thử thì đúng khoản tầm 60% thôi
    └ [15:36] nghiepnq: Jev có version mới rồi chắc giờ thông minh hơn chút
  [15:34] kietnht: * cái bước predict next word naturally chắc là bước tốn kém tính toán nhất, theo a Năm nói e đoán kq nó ko naturally lắm
  [15:37] kietnht: * cái bước predict next word naturally chắc là bước tốn kém tính toán nhất, theo a Năm nói e đoán kq nó ko naturally lắm
  [15:40] nghiepnq: * em nhờ AI support thì như này chắc rỏ hơn:  Khi nhận đầu vào (prompt/state), mô hình chỉ chạy một lượt duy nhất (singl
  [15:42] chientx: Túm lại thì kiểu model này là đưa input đầu vào, có ngay output đầu ra, 1 lần duy nhất. Giống gọi hàm: split("xin chao")
  [15:42] chientx: cái này idea hay, có nhiều ứng dụng

### Training AI - Trainers — 8 messages
  [11:46] namtv: Hello anh em. 11:50am họp phòng 3L chút được ko?  Hơi gấp miếng, do chiều Dương off, tuần sau thì Nghiệp off T2,T3
  [11:48] kietnvt: dạ ok anh
  [15:27] namtv: 01_De_cuong_chuong_trinh_dao_tao_AI.pdf
  [15:27] namtv: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf
  [15:27] namtv: 2 files nha anh em
  [15:29] namtv: Assign: - ChienTX + NamTV: section 1 (base) - KietNVT: section 2 (RAG) - DuongDN + VinhNT: section 3 (Agent) - NghiepNQ:
  [14:16] namtv: Anh mới gửi email về training, mà anh quên để time, 11am Thứ 4 hàng tuần nha mọi người 😐️
  [14:21] namtv: Các bạn trainers cũng tham gia các session người khác train nha mọi người, ko phải chỉ train đâu
