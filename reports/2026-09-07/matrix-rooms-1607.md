# Matrix — since 2026-08-01 07:00 +07:00

### !oGYjbzEfphvvauBZtq:nustechnology.com — 485 messages
  [09:44] namtv: Nào rảnh hú tao xuống discuss vụ bên Marcel phát
  [09:45] duongdn: uhm tí nữa đi, chưa coi tới Marcel
  [10:01] duongdn: bên Bailey như bữa nói cũng hết task rồi, có mấy cái nho nhỏ nhưng phải chờ approve Với chờ bên tester test  Hiện có 1 s
  [10:02] namtv: Cứ fix đi
  [10:02] namtv: Với xem sau đó thì sao, có gì cho dev làm ko 😩
  [10:02] duongdn: ok thank you
  [10:03] duongdn: còn vài cái vụn vặt nữa, mà chờ cus approve đã
  [10:57] namtv: Check: - Revert cái dedup filter gì đó thì có vấn đề gì. Ideally revert nó cho mấy tenant có issue trước để xem sao - So
  [10:58] namtv: Còn vụ add device ko được, có vẻ là case độc lập và ổng mới bị lần đầu? Nếu đúng thì 90% là network. Trên device đó có g
  [11:33] duongdn: > Revert cái dedup filter gì đó thì có vấn đề gì. Ideally revert nó cho mấy tenant có issue trước để xem sao Sau khi tra
  [11:38] namtv: Mà cái resync giờ là vẫn chạy định kỳ à? Chạy lúc nào?
  [11:38] namtv: Hourly?
  [11:39] duongdn: uhm, chạy hourly cho 3 tenant  # Hourly resync — Nakano (tenant126) / Unitec (tenant112) / Simlian (tenant56)
  [11:53] namtv: Máy ZKteco đang dùng là model cụ thể nào thế?
  [11:55] duongdn: đang dùng là của mình hay của họ ?
  [11:55] duongdn: và cụ thể là tenant nào?
  [11:55] namtv: List hết đi
  [11:55] namtv: Dù cái tao đang quan tâm chính là Simlian do nó là cái cụ thể ổng nói bị
  [11:58] duongdn: OK chờ xí
  [11:58] namtv: Cho cái Simlian trước đi
  [12:03] namtv: Tao có gửi message cho họ. Nhìn chung cái tao thấy khả năng cao nhất là image size đó. Về nguyên tắc khi gửi hình xuống 
  [12:08] duongdn: ok để xem confirm
  [12:12] duongdn: Hiện mình ko store lại model name của máy ... đang tìm cách lấy lại, còn firmware thì là ZAM180-NF50VA-Ver3.4.9 và  ZAM1
  [12:33] namtv: Vậy model máy mình có là gì?
  [13:25] duongdn: máy mình là SpeedFace-V5L
  [13:40] namtv: Con này thì ngon hơn, nhưng 2MB vẫn quá cao. Ideally là dùng vector như tao nói. Mỗi face chỉ cỡ 2-4KB thôi. Có điều nó 
  [13:40] namtv: Giờ thì cứ check như mấy item trên kia đi. Có data rồi tao nói chuyện thêm với họ + next step
  [13:41] namtv: Komal hú nè @⁨[NUS] Dương⁩ can you help to check slack?
  [15:01] duongdn: 928673666-ZKTeco-PUSH-Protocol-Commands.pdf
  [15:03] duongdn: Ta đi tìm tài liệu về push command của ZTK thì ko có cái nào vector hay url gì cả, chỉ có cái base64  Có cái trang chính
  [15:07] duongdn: để thử liên hệ ztk xem có share được doc ko
  [15:07] namtv: Check mấy data thì sao rồi?
  [15:08] duongdn: chưa làm tới
  [15:09] namtv: Check cái đó trước chứ, xem có gì bất thường, thống kê số lượng, file size
  [15:11] namtv: Còn cái bio thì ngay command đầu tiên ấy, DATA UPDATE. ZKTeco nó dùng khái niệm "template"
  [15:12] namtv: Field là Tmp
  [15:14] namtv: Mà bên đó trước giờ ko có doc à? Chắc phải có chứ ta, ko thì làm sao mình biết mấy cái commands và tables?
  [15:15] duongdn: image.png
  [15:15] duongdn: AI đưa ra, để ta double check lại
  [15:16] duongdn: Doc: này ThongVV làm,  ko rõ hồi đó hắn dùng doc nào, chắc giờ hỏi lại cũng chịu, ta ko nghĩ là nó có nhớ hay lưu Để hỏi
  [15:17] namtv: Mấy cái commands, tables của nó ko có doc thì làm được khỉ ấy. Hẳn là có, mà giờ còn ko thì bó tay, có thể phải hỏi họ đ
  [15:20] namtv: Kêu AI cho doc thì nó nói ko public, chỉ đưa cho developer, partner (nhưng nó vẫn có để train 😄 ). Theo nó thì command 
  [15:23] duongdn: cái tmp trong code mình hồi trước cũng có nhưng hình như bị lỗi gì đó, để coi lại lúc trước đọc code thấy
  [15:23] namtv: Chắc làm gặp lỗi mà thấy khó chạy qua chơi hình rồi...
  [15:25] duongdn: uhm dang dạng vậy, hồi trước nhớ ThongVV có nói loáng thoáng ý này , để coi kĩ lại các commit xem
  [15:26] namtv: Cái này cũng hơi phức tạp. Phải đúng version, sợ làm sai version hoặc chưa base64 chẳng hạn
  [15:27] namtv: Có vẻ từ 2020 tới giờ đều dùng ZKLiveFace 5.6
  [15:28] namtv: Nếu làm thì sẽ phải: - Vẫn lưu file raw photo - Convert và lưu template. Nhưng thiết kế lưu multiple template, sau này m
  [15:30] namtv: Cái URL thì có vẻ ko có thật
  [15:39] namtv: Check lại vụ data xem. Nhìn hơi khoai, size kiểu đó khó optimize được nếu theo hướng image. Và lôi cái hình bự nhất ra x
  [15:40] namtv: Trừ khi Nakano + Unitec số lượng nhiều hơn nhiều
  [15:55] duongdn: hay nó tính cả bandwidth vào RDS ta
  [15:56] duongdn: image.png
  [15:56] duongdn: ko khác nhau lắm
  [15:56] namtv: Ko, RDS là internal. Và dù bị sao đó nó dùng external thì bandwith bên ELB cũng ko thể liên quan RDS được, nó phải bên E
  [15:56] namtv: Số như bảng trên thì còn ít hôn tao tính nhiều nữa
  [15:57] namtv: Verify đi 😐️
  [15:57] namtv: Chính xác là phải bên RDS. Vì từ EC2 lấy data từ RDS thì với EC2 là ingress (free)
  [15:58] namtv: Nói chung traffic nó tính từ ELB thì chỉ có thể là xuống client thôi, ko liên quan RDS
  [16:21] duongdn: > Với tao hơi nghi ngờ. Với lượng data đó, mỗi lần push 1 tenant chỉ khoảng 300MB, cho là push hourly thì mỗi tháng cũng
  [16:21] namtv: Ah, hiểu
  [16:22] namtv: Mà double check chưa? Và lấy file to nhất ra xem pixels sao nữa
  [16:23] duongdn: đang sum bằng tay, chờ chút
  [16:24] namtv: Chắc lấy thằng to nhất ra xem có phải 166KB ko và pixels sao được rồi. Còn cái sum kia kệ nó đi
  [16:24] namtv: Sao cả đám max size bằng nhau ko biết 😐️
  [16:34] duongdn: theo AI giải thích và đọc code thì info trước sai App mình có 1 hàm để resize lại hình  Nó sẽ đẩy kích thước xuống maxim
  [16:35] namtv: uhm, base64 sẽ tăng hơn 30% size
  [16:36] namtv: Lôi ra xem bao nhiêu pixels
  [16:37] duongdn: https://console-async-app.xidtech.com/testpush/dbg_362e1460e201738f.jpg
  [16:38] duongdn: 104KB
  [16:40] namtv: ~ 1000 x 1000. Mà chưa phải thằng bự nhất à?
  [16:41] namtv: >Nó sẽ đẩy kích thước xuống maximum 100KB  Cái này làm sao ta? Có thư viện nào support kiểu chặn theo file size à? Hơi d
  [16:41] duongdn: ko hiểu, 100kb là bự nhất rồi , nó bị resize xuống rồi á
  [16:41] namtv: Ah quên
  [16:42] namtv: Có hình nào ko phải jpg ko? Mà đã qua process resize thì thắc là jpg hết rồi?
  [16:42] duongdn: này như code tự viết, ko phải thư viện
  [16:43] namtv: Mà nó làm sao hay vậy? Ko lẽ resize nhiều lần giảm dần tới đúng file size à? @.@
  [16:47] namtv: Khó ta. Giờ size cũng đã hòm hòm, ko phải quá lớn (dù vẫn giảm thêm được), hơi khó để nói dự đoán do size.  Đập hơn 3000
  [16:49] duongdn: Có convert file thành jpeg nha Còn cách resize là ưu tiên giảm quanlity, ko đủ 100KB thì resize Resize theo vòng lặp :))
  [16:49] duongdn: * Có convert file thành jpeg nha Còn cách resize là ưu tiên giảm quanlity, ko đủ 100KB thì resize Chạy theo vòng lặp :))
  [16:50] duongdn: * Có convert file thành jpeg nha Còn cách resize là ưu tiên giảm quanlity, ko đủ 100KB thì resize Chạy theo vòng lặp cho
  [16:51] namtv: Cái này xàm rồi 😐️
  [16:52] duongdn: rồi giờ debug hướng nào nữa ta .. size có vẻ cũng ok rồi
  [16:52] namtv: Chưa hẳn nha
  [16:53] namtv: Cách trên có thể giảm dung lượng đưa xuống, chứ khi nó phân tích vector thì theo pixels. Nên có khi nào có hình size pix
  [16:53] namtv: Các thuật toán vector nó ko quan tâm file size, nó quan tâm pixels
  [16:54] namtv: Nên cách trên là nhảm, ko giảm size mà giảm quality dẫn tới client vẫ mệt và chất lượng phân tích cùi đi 😐️
  [16:58] duongdn: hồi bữa ta có cách để fetch hình từ máy, để ta xem size thực tế trong máy nó có khác ko
  [16:58] namtv: File size ko quan trọng
  [16:58] namtv: Quan trọng là pixels size nha
  [16:59] namtv: >Nên có khi nào có hình size pixel to hơn nhiều nhưng do giảm quality xuống 60 nên nó mới 100KB ko Sợ nhất cái này. Tùy 
  [17:00] duongdn: để coi có cách nào check info từ cái device ko
  [17:01] namtv: Mà cái resync này nó hoạt động sao nhỉ? Command clear hết rồi add lại à?
  [17:02] duongdn: uhm
  [17:03] namtv: Clear hết faces trên máy đó luôn? Hay command đi theo cặp: clear 1 face rồi add lại face đó?
  [17:04] duongdn: ko phải, clear các pending command trên server mình thôi, do vụ dedup filter đó, nếu ko clear thì mấy command force sync
  [17:05] namtv: Tức là cái resync này là update từng record, ghi đè image vào?
  [17:07] duongdn: update từng record cũng ko đúng, chính xác là batch update,  mỗi lần device gọi tới để lấy command update mình lấy N rec
  [17:09] namtv: Ít nhất là update là được, chứ clear hết face rồi đẩy data mới là chết chắc
  [17:09] duongdn: ko có đâu ... ai chơi dại vậy 🤣
  [19:19] duongdn: image.png
  [19:19] duongdn: theo như cái này thì có vẻ load balancer chưa integrate WAF nên vụ rate limit chắc ko phải rồi nha
  [20:09] duongdn: cái này có vẻ ko có cách biết chính xác do ko có lưu ảnh gốc, nhưng ta đưa ý kiến của mi cho Claude thì nó nói có khả nă
  [20:09] duongdn: image.png
  [20:09] duongdn: có vẻ là ảnh của các tenant bị lỗi đúng là bị nén mạnh
  [20:10] duongdn: đó là nó nói, ko biết đúng ko
  [20:21] duongdn: ```  nakanogoose (137)               150   67.1   94.7%   1217px   92.6K    2008    <- tệ nhất   simlianst95ec (133)    
  [20:22] duongdn: theo như AI thì có 5 tenant có chất lượng ảnh tệ, trong đó 3 cái của mình, 2 cái còn lại hình như là site khác của tụi n
  [20:25] namtv: Viết code resize lại. Quality thì ko lấy lại được nhưng giảm size xuống max 800x600, ít nhất chắc ăn ko có thằng nào pix
  [20:26] namtv: Mà méo lưu image gốc thì liều vãi
  [20:27] duongdn: OK
  [20:35] namtv: Lần này resize tốt nhất vẫn giữ hình gốc lại nha
  [20:37] duongdn: OK  Để search thêm chút xem size hình bao nhiêu là tối ưu với các device này
  [20:55] namtv: Mà có vẻ AI nó đi qua sample kia có check px, hỏi nó xem file có pixels size lớn nhất là nhiêu thế
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
  [08:45] duongdn: Long luôn đi, đang idle cũng ko có gì làm
  [08:57] namtv: Tao có share mày mail Brian. Check xem ổng đã invite gì chưa phát ⚠️
  [08:57] namtv: >I need some landing pages that I need built on my site. It would be bit costly to get Kai to do this for me as he is a 
  [08:58] duongdn: OK
  [08:59] namtv: ủa, mà hình như Brian trước đây làm design cho ổng, có khi có trong Slack rồi. Mày xem thử Slack xem có nó ko. Có thì lo ⚠️
  [09:01] duongdn: đúng rồi, hồi đó ku Anh làm, name Brian là Anh Nguyen
  [09:18] duongdn: giờ mới thấy là nó khác, Brian của ku Anh dùng email cá nhân ko phải email công ty
  [09:18] duongdn: vậy xem như 2 người khác nhau nha
  [09:18] duongdn: ổng chỉ invite vô Slack hôm qua, chưa nói gì
  [09:18] namtv: uhm, mình có nói người khác
  [09:18] namtv: Xem các thứ OK để dev start chưa. Lúc nào dev start thì báo tao phát
  [09:19] duongdn: OK chờ ổng xem, mới chào hỏi thôi
  [09:25] duongdn: hình như extension bitwarden bị sự cố gì đó,  sáng h load ko lên phải vô web, tưởng có  1 mình mình bị nhưng KhanhHH cũn
  [10:00] duongdn: Chà, bên LongVV giờ kẹt task quá, Maddy chưa đưa task kịp chờ cus approve, Celine thì hết, Marcel thì cũng phập phùng th
  [10:02] namtv: Celine hết luôn à? 🤔 T2 hỏi Minh thì Minh nói cỡ 80% task BE. Nói Minh dí tasks bả xem
  [10:47] namtv: Fixed
  [11:09] duongdn: Bên Maddy đưa info làm rồi nha, giờ đưa cho LongVV
  [14:47] duongdn: > Theo lỗi thì cần chờ OpenRouter xử lý 😐️ Có gì dùng tạm Qwen đỡ miếng nha...  Kì vậy, sao chỉ có Deekseep của công ty
  [14:50] namtv: Deepseek đi qua OpenRouter bị
  [14:50] namtv: Nếu hiểu chân phương theo lỗi thì nghĩa là cái key của OpenRouter dùng để gọi DeepSeek bị hết tiền...
  [14:52] duongdn: à
  [09:42] namtv: Trinh off. Mày nắm tình hình tasks Kunal ko? LamLQ idle, nếu được thì lấy bạn qua làm Kunal ⚠️
  [09:42] namtv: * Trinh off. Mày nắm tình hình tasks Kunal ko? LamLQ idle, nếu được thì lấy bạn qua làm Kunal đỡ ⚠️
  [09:47] duongdn: hok, bán rồi, haha Để hỏi VuTQ xem
  [09:49] namtv: Ko thì call Trinh hỏi giùm tao phát. Có task làm là được, lỡ có làm hết tasks sớm cũng ko sao, còn hơn bạn idle ngay
  [09:58] duongdn: đã có task rồi nha, 8h, để assign bạn làm còn mai thì xem Trinh quay lại có gì chi tiết hơn ko
  [09:58] namtv: 👌
  [09:59] namtv: Hốt bạn qua nha
  [09:59] duongdn: ok
  [11:58] namtv: Tình hình tasks Maddy vẫn thiếu hả?
  [11:59] duongdn: uhm dạo này cus ít đưa task lắm, do đang đi du lịch ..
  [11:59] duongdn: chắc tuần sau mới đỡ lại được
  [08:55] namtv: Brad gửi nùi message Upwork nha
  [08:56] duongdn: oh uhm
  [08:56] namtv: Mà ko phải giao tiếp qua Slack à?
  [08:58] duongdn: nói mấy lần mà thấy chả vô Slack ...
  [09:00] namtv: LongVV off sáng. Chắc tính bên Celine, PhucVT bù nha. Bên Arthur chắc cũng ko còn nhiêu nên bạn hẳn là dư time
  [09:02] duongdn: Chưa biết Celine có gì làm ko
  [09:02] duongdn: để hỏi MInh đa
  [09:03] namtv: Tuần trước Minh nói Long thiếu time nên ko đủ 40h (nhưng có một số giờ đang để lại từ trước chưa report nên đem ra repor
  [09:07] namtv: Có bả KH hơi dị dị, có gửi bả trang Fountain cho bả xem, mà bả quan tâm admin. Bên đó admin là custom luôn hay dùng gì n
  [09:08] duongdn: dùng mấy admin tool như active admin, khá ... xấu nh
  [09:08] duongdn: * dùng mấy admin tool như active admin, khá ... xấu nha
  [09:10] namtv: Vậy thôi
  [08:55] namtv: TuanNT off 2 ngày. Bên Bailey sao nhỉ? Chắc cũng thiếu task nên ko cần đưa dev khác bù?
  [08:56] duongdn: uhm đang hết task rồi, đang wrap up task cuối rồi, mà còn bug quá, đang review lại
  [10:59] duongdn: add Phat QC vào workstream James Diamond  nha Năm
  [11:00] namtv: Done
  [10:31] namtv: Brad Ballantine 10:24 AM Hi Carrick Nataly, has messaged you on slack did you not receive? Just messaged you 16 minutes 
  [10:32] duongdn: hở, gì lạ vậy, để xem
  [11:57] namtv: Sao chat với Brad mày phải dùng cái [at] thế? Upwork ko cho gửi email nhưng chỉ là khi chưa có contract thôi. Room này c
  [11:58] duongdn: thấy ở trên mi hay làm vậy và có mấy lần bị chặn nên làm theo
  [11:58] duongdn: còn vụ có contract ko bị nữa thì ko biết
  [11:59] namtv: Trước khi có contract thôi. Sau khi có contract thì thoải mái
  [08:36] duongdn: Có bitbucket / gmail của Vinn ko share ta với
  [08:49] namtv: Done
  [16:31] namtv: Tình hình bên Brad sắp tới sao nhỉ? Vẫn sẽ có tasks đều à? Bên Celine giờ có vấn đề là BE dev hay bị delay do bên khác, 
  [16:36] duongdn: Brad vẫn có task, ổng cứ vừa làm vừa feedback, mà có thể ko lâu dài Giờ dev hơi ít,  nhưng nếu nhìn qua thì có thể Khanh
  [16:36] duongdn: * Brad vẫn có task, ổng cứ vừa làm vừa feedback, mà có thể ko lâu dài Giờ dev hơi ít,  nhưng nếu nhìn qua thì có thể Kha
  [16:39] namtv: Vậy chắc từ tuần sau TuanNT làm Brad thay PhucVT. PhucVT làm Celine, time dư thì vẫn làm Brad nếu chia được 🤔
  [16:40] namtv: Mà Brad có task thì có dí gấp ko?
  [16:40] namtv: Bên Brad có 14h max, nên nhiều khả năng PhucVT vẫn đủ giờ làm cả 2, nhưng có điều priority sao thôi
  [16:40] duongdn: Brad ko chia được đâu, ít lắm
  [16:41] duongdn: vứt TuanNT qua làm Celine luôn đi được ko
  [16:41] duongdn: vậy tiện nhất
  [16:41] namtv: Python mà
  [16:41] namtv: Vậy lấy LongVV làm Brad (ko làm Celine nữa). PhucVT làm Celine chính, time dư thì kiếm gì làm, như Bailey or ngâm cứu gì
  [16:41] namtv: * Vậy lấy LongVV làm Brad (ko làm Celine nữa). PhucVT làm Celine chính, time dư thì kiếm gì làm, như Bailey or ngâm cứu 
  [16:48] duongdn: Chắc LongVV ko phù hợp hiện tại đâu, bên Maddy đang có nhiều task lên, cus về rồi, sợ làm Maddy/Celine thì ko đủ time  N
  [16:49] namtv: >Chắc LongVV ko phù hợp hiện tại đâu, bên Maddy đang có nhiều task lên, cus về rồi, sợ làm Maddy/Celine thì ko đủ time   ⚠️
  [16:49] namtv: Nó ko làm Maddy nữa
  [16:49] namtv: NHầm
  [16:50] namtv: Nó ko làm Celine
  [16:50] duongdn: 
  [16:51] namtv: >Nếu vẫn lấy PhucVT thì OK, Brad chia cho TuanNT làm, cũng Laravel với WP thôi Còn cái này thì cũng được, nhưng cần đảm 
  [16:51] namtv: Nhảy giữa task transfer khó
  [16:51] namtv: Vậy nên tao mới prefer cái này: >Vậy lấy LongVV làm Brad (ko làm Celine nữa). PhucVT làm Celine chính, time dư thì kiếm 
  [16:53] duongdn: cách trên thì thấy PhucVT có vẻ dư time hơi nhiều , mà suy nghĩ thì có vẻ nó tốt nhất Dạng dự án như Celine PhucVT phù h
  [21:24] namtv: Brad Ballantine 5:36 PM Hi Carrick BB Brad Ballantine 5:44 PM Just wanted to change the heading on the Auction Warehouse
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
  [22:35] namtv: Mình còn access code, server bên James Definitive ko ku?
  [22:35] namtv: Sorry to trouble you directly – I’ve an urgent requirement for some immediate help – Google has removed a library overni
  [08:28] duongdn: còn nha
  [08:28] duongdn: để sắp xếp xử lí
  [08:32] namtv: Nhìn mô tả thì cái Immediate nhanh, chắc cần xử cho ổng nhanh. Còn cái long-term chắc xong cái Immediate phải confirm có
  [08:32] namtv: Tao có cc Carrick trong mail với ổng
  [10:00] duongdn: Cũng ổn ổn rồi nên có thể trả lại bình thường nha Giữ nguyên thì tao cám ơn, :v
  [10:02] namtv: Trước mắt để vậy đi
  [10:03] namtv: Nói Đạt chuyển qua Mimo thử đi
  [10:04] namtv: Nó dùng Deepseek Pro chắc cũng nhanh bay quota
  [10:23] duongdn: ok
  [15:59] duongdn: share lại ta github jeff với, sao bị mất rồi
  [16:00] namtv: Done
  [16:00] namtv: Coi chừng nhầm Bitbucket. Nhớ gần đây share mày Atlassian chứ ko phải Github ⚠️
  [16:03] duongdn: sorry nhầm thật
  [09:56] namtv: Có những project nào mình từng làm Codeigniter nhỉ? Project nào nhìn ngon nhất (về features)
  [09:58] duongdn: để review lại xem
  [10:32] duongdn: bên LongVV đang ít task, đẩy James Diamond cho bạn làm nha
  [10:33] duongdn: sẵn add bạn vào WS luôn
  [10:34] namtv: Là giảm giờ LeNH? LeNH làm gì?
  [10:36] duongdn: má lại nhầm
  [10:36] duongdn: James DefinitiveGuide
  [10:36] duongdn: nãy Thúy hỏi cũng nói nhầm ...
  [10:36] namtv: Là ổng confirm làm cái long-term rồi à?
  [10:37] namtv: Ko thấy mail
  [10:38] duongdn: image.png
  [10:38] duongdn: nhiều quá bị miss
  [10:39] namtv: Cần nói có dùng Claude nhiều nha, bữa nói chuyện lại với ổng về development, chém gió dùng AI các thứ, develop các thứ g
  [10:39] duongdn: uhm, đòi cái Slack đã, email mệt quá ...
  [10:41] namtv: Tuần trước mày làm nhiêu hours bên James - Definitive nhỉ? ⚠️
  [10:42] duongdn: được 30m
  [11:20] namtv: Done
  [13:42] namtv: Sao rồi?
  [13:44] duongdn: chưa coi nữa, để nhờ AI chạy collect phát
  [13:58] duongdn: chà, local có vẻ xóa rồi, tìm ko ra, để hỏi lại mấy dev xem
  [14:36] duongdn: https://thehackernews.com/2026/08/elementor-pro-flaw-could-let.html
  [14:36] duongdn: mi có biết cái này ko, có vẻ khá nghiêm trọng ...
  [14:41] namtv: Ko. Xem thử mức ảnh hưởng sao và check lại các project có dùng + báo KH suggest fix phiếc gì đó Mà bản pro chắc là bản t
  [14:42] duongdn: à, pro, vậy có vẻ ko nhiều, để rà soát lại xem
  [14:42] duongdn: chắc phải tìm cách improve cái search project, mỗi lần như thế này chua ghê ...
  [14:44] duongdn: impact: cũng khá nghiêm trọng, lỗi thường thấy của PHP , upload exec file lên qua form upload
  [15:17] duongdn: hiện dev cũng ko có info project nào như vậy để tối ta về tìm thêm trong laptop nha, có khi mò ra ...
  [15:19] namtv: Codeignitor thì chắc chắn là có 🤔
  [15:20] duongdn: uhm có, mà lâu quá dev xóa rồi 🤣
  [15:21] namtv: Cần info về project thôi, ko cần source
  [15:21] duongdn: ko có source ko nhớ project nó dùng công nghệ nào để confirm 😐️
  [15:21] duongdn: * ko có source ko nhớ project nó dùng công nghệ nào  😐️
  [15:43] duongdn: 
  [16:00] duongdn: các bạn report ko có effect nha tối về cũng coi lại luôn mây project trong máy xem có sót gì ko
  [22:05] duongdn: tìm ra rồi nha, là cái Daniel BrakeEquiq, nó kha khá feature á
  [22:25] duongdn: https://claude.ai/code/artifact/9f385427-756b-4bd6-8ef5-91556ba19142
  [22:31] duongdn: cũng ko khác gì chiều, issue Elementor Pro tạm done nha
  [22:45] namtv: CI mà có dùng Laravel Mix, tức là CI làm API, Laravel Mix dùng Vue để làm SPA á? Laravel Mix có ý nghĩa gì ở đây nhỉ?
  [09:13] duongdn: À, Laravel Mix là build tool (webpack wrapper), không phải Laravel framework. Backend vẫn 100% CI3 render view. Vue được
  [10:57] duongdn: Hi Năm Ta mới hoàn thành khóa đầu tư tài chính, đang tìm plan improve tiếp theo Mục tiêu tiếp theo là improve kiến thức 
  [11:02] namtv: Về plan thì có chút liên quan. Dự kiến từ khoảng đầu tháng 10 sẽ bắt đầu có training cho key members bên Tech về AI. Mục
  [11:03] namtv: * Về plan thì có chút liên quan. Dự kiến từ khoảng đầu tháng 10 sẽ bắt đầu có training cho key members bên Tech về AI. M
  [11:03] namtv: * Về plan thì có chút liên quan. Dự kiến từ khoảng đầu tháng 10 sẽ bắt đầu có training cho key members bên Tech về AI. M
  [11:03] duongdn: có vẻ giống cái plan ta search từ chat GPT :D
  [11:04] namtv: Tao còn trong giai đoạn finalize content. Sau đó để xem pick một số trainer, chia ra tìm hiểu và train. Cái này có thể c ⚠️
  [11:05] namtv: Dự kiến mỗi tuần 1 session, khoảng 30 mins, trong giờ official. Đây sẽ là hoạt động định kỳ, cái AI này là 1 phần trong 
  [11:05] namtv: uhm, cũng brainstorm với vài con AI, đưa target cụ thể của mình, nó support về chi tiết
  [11:11] duongdn: OK, nếu vậy thì tạm ta cũng ko đi lòng vòng gì, ta merge 2 cái plan này và cái của ta lại là được Giờ đi tìm thầy dạy, m
  [11:15] namtv: Tao ko phải fan của mấy course nên ko chắc. Đợt xem Udemy thì chắc phải kết hợp nhiều courses mới ra nội dung bên trên
  [11:17] duongdn: OK, để lên đó mò xem  Tìm thêm xem bên ngoài có thầy nào đang dạy mấy cái này ko Có khi vô mấy trường đại học học lại qu
  [11:18] namtv: Cao học còn dang dở, resume/restart đi 🤣
  [11:18] duongdn: nghe sợ ngang ...
  [11:21] namtv: Nói chứ target mấy trường ko phải như mình, mà đi sâu vào base, như NLP, neural network, machine learning
  [11:22] duongdn: Chưa confirm, nhưng theo ta biết chắc bên FPT có vẻ sẽ phù hợp
  [11:22] duongdn: họ đang đào tạo kĩ sư AI rồi đem ra xài luôn
  [11:23] duongdn: ngày nào cũng chở con đi qua trường FPT
  [11:23] duongdn: bữa nào chui vô thử :))
  [11:25] namtv: Ah, chắc cũng có mấy dạng ko phải đại học / cao học chính quy
  [11:27] duongdn: oh, để ta coi, có gì hay ta share tự nhiên 37 tuổi lại có thú vui đi tầm sư học đạo lại, kì lạ :))
  [11:39] namtv: >Ta mới hoàn thành khóa đầu tư tài chính Summarize xem có gì hay ko nào 😄
  [11:45] duongdn: hồi đó thì hok biết gì, chơi chứng khoán mua theo cảm giác, ko hiểu về công ty Giờ thì biết cách tìm hiểu công ty, định 
  [11:47] namtv: Cái này thì hơi khoai. Trước mua cổ phiếu cũng lời nhiều, mà nhìn mệt óc, bán hết mua quỹ mở coi như dạng tích sản, set 
  [11:48] duongdn: uhm do lỗ quá nên mới đi học á ...
  [11:48] duongdn: xem mình sai chỗ nào ... 🥲
  [11:48] namtv: Tất nhiên học thì tốt, nhưng cũng nhiều cái khó đoán 🤣
  [11:49] namtv: Trước cũng xem tìm hiểu, phân tích đủ kiểu nhưng ko ăn thua. Mã MBB là tao mua đại thì lại ngon nhất 😐️
  [11:50] namtv: MBB giờ vẫn còn để lại 1 ít sau khi bán chuyển qua quỹ mở. Giờ thống kê nó đang +125% 😐️
  [11:51] namtv: Mà năm nay thì sấp mặt cả, trừ ai đu họ Vin sớm, còn lại thì tiết kiệm chấp hết, vãi thật
  [11:51] duongdn: có khi do chưa phân tích kĩ :D  ít nhất là giờ có thua cũng biết mình thua vì cái gì  Mà đúng là thực tế là mấy cái mình
  [11:52] duongdn: nhưng chắc dần dần sẽ điều chỉnh lại thôi
  [11:52] duongdn: lạc quan lên :D
  [11:53] duongdn: mình còn hên mà, mấy anh chỉ mua lúc năm 2008 thì 10 năm sau mới về bờ :v
  [11:53] duongdn: mình còn hên lắm
  [11:54] namtv: 🤣
  [15:02] duongdn: share LongVV mailgun Carrick nha
  [15:03] namtv: Done
  [15:45] duongdn: LeNH muốn off t2 tuần sau, này nó dính policy off lễ, ca này ổn ko nhỉ
  [16:18] namtv: Chủ yếu bên khách hàng, nói họ thử
  [09:46] namtv: Chà, Minh than về bên Phúc nhiều quá, mày xem xử lý phát. Bên Celine đã complain nhiều rồi. Giai đoạn hiện tại mình phải ⚠️
  [09:46] namtv: Cần nói chuyện với Phúc xem vấn đề là gì. Có vẻ cả hiệu quả công việc lẫn giao tiếp
  [09:49] duongdn: OK để hỏi xem
  [10:16] duongdn: ta có coi qua các issue trong msg và Slack, nếu rộng ra thì đây chắc ko phải issue có thể giải quyết chỉ với cách nc với
  [10:23] namtv: Nãy tao cũng có nói cần lesson learned meeting với mày và Phúc luôn, nó đang phải xử lý vài thứ khác nên chắc lát nữa ⚠️
  [10:25] duongdn: Minh hẹn họp 1:30 chiều nay rồi
  [10:33] namtv: LongVV có đang dư giờ ko? Boost tạm vào Celine
  [10:35] duongdn: Đang có James Definitive Guide á, có thể chia bớt ra cũng được, cũng ko gấp, nhưng tân dụng thế nào thì để chiều discuss
  [13:50] namtv: Message Brad từ hôm qua chưa trả lời là do có chat bên Slack hay sao ku?
  [13:51] duongdn: ủa … sao dev báo rồi để xem lại
  [14:35] namtv: Task kia bên James - Definitive nhiều à? Chắc nói sơ để ổng aware nha
  [14:40] namtv: Này sao rồi?
  [14:52] duongdn: chắc để tập trung release cho ổng phát rồi báo nha,  trong hôm nay
  [15:50] namtv: Ném cho vài project ngon dùng Laravel nào. URL, overview thôi
  [15:50] namtv: * Ném cho vài project ngon dùng Laravel nào. URL, overview thôi, ko cần code hay gì chi tiết ca3
  [15:50] namtv: * Ném cho vài project ngon dùng Laravel nào. URL, overview thôi, ko cần code hay gì chi tiết cả
  [15:51] duongdn: sau nha, đang tracker Marcel
  [15:51] namtv: URL thôi cũng được.... 4:30pm có họp với potential client rồi 😐️
  [15:51] duongdn: ui để tắt
  [15:59] duongdn: https://contractprobe.com.au/ -  Neural Contract - review document pháp lí  https://www.phlanx.com - Tina-Ziaf - Nền tản
  [17:09] namtv: Phlanx sáng mai tao cần 1 screen recording show sơ các features, ideally phức tạp chút và có liên quan payment, để gửi k
  [17:11] duongdn: chà, sao ko tìm ra room ta, mà hình như ko có, chỉ có ta với Phúc làm hay sao á
  [17:12] namtv: Mày múc đi 🤣
  [17:13] duongdn: ok để check lại rồi quay
  [08:55] namtv: Nhớ cái video, sáng nay nha
  [08:55] namtv: Và Brad có message
  [08:55] duongdn: OK
  [09:01] namtv: Bên James Diamond vụ off sao rồi?
  [09:01] duongdn: ổng chưa trả lời, sáng mới remind lại
  [09:44] namtv: Bên James - Definitive tuần này có xong task ko ta? Do liên quan gửi bill. Tính xong hết gửi 1 lần luôn
  [09:45] duongdn: ko đâu, còn nhiều à
  [09:45] namtv: Có dự tính được khoảng nhiêu ko? Và đã nói ổng aware như hôm qua tao kêu chưa?
  [09:46] namtv: Sợ ổng nghĩ chút éc thôi
  [09:47] duongdn: chưa review nữa, dev  đang bạn dự án khác/bug khác  rồi  để sắp xếp rough est rồi báo lại
  [10:36] namtv: VuTQ còn dư 16h ==> để bạn làm Kunal trong plan HRP luôn đi
  [10:40] duongdn: OK để ta update
  [10:40] namtv: LamLQ thì tao đang hỏi lại bên kia xem dư ko
  [10:41] namtv: Bên kia cũng ko chắc ==> chắc cứ cho 1 dòng LamLQ đi, note dư time thì làm
  [10:41] duongdn: oh
  [10:51] duongdn: chà, cái Phlax khó rồi, code dưới máy deploy lại chạy lỗi tè le cả ...  sửa nãy giờ chưa xong Còn live thì họ ko cấp mìn
  [10:51] duongdn: * chà, cái Phlax khó rồi, code dưới máy deploy lại chạy lỗi tè le cả ...  sửa nãy giờ chưa xong, vả lại hình nó broke cả
  [10:55] namtv: Thanh toán là phải làm gì mới thanh toán, hay signup là phải thanh toán rồi?
  [10:57] duongdn: đăng kí rồi thanh toán để sử dụng, mà nãy giờ cứ process mãi ko đi tiếp được
  [10:57] namtv: Xem còn cái nào phức tạp và UI đẹp đẹp chút thay thế cũng được 😐️
  [11:00] duongdn: UI đẹp thì app này đẹp rồi nếu ko thanh toán thì có thể list và dạo qua các data của app Nhưng nếu cần action thì phải t
  [11:03] duongdn: --- để ráng thanh toán xem, có trial
  [11:07] duongdn: hên quá, được rồi
  [11:07] duongdn: để ta quay demo
  [11:54] duongdn: https://www.loom.com/share/6013b37a45474d33863efeb9f8f1d3af
  [11:54] duongdn: xem thử OK hok , ta đi qua các tính năng, có mấy cái lỗi nên ko dám demo :))
  [11:58] namtv: Ngon
  [11:59] duongdn: khi nào confirm ok ta sẽ cancel subscription nha, $50/month, chua, trial 30 ngày 😆
  [16:31] duongdn: lão James hay thật, đến cái msg xin off cũng ko trả lời, remind mãi ... thôi cứ assume là ok luôn đi , chứ t2 kẹt giữa l
  [16:32] namtv: uhm
  [09:16] duongdn: Hình như bên James Diamond sai chút về plan nhỉ Theo view của khách hàng thì là mình có làm bù, chỉ là đã làm trước giờ 
  [09:18] namtv: Updated và đã thêm note
  [11:14] duongdn: lại quên nữa rồi Maddy và James có mobile phải ko? Chưa có plan cho nó
  [11:15] namtv: uhm. Maddy thì thường ko có task, lâu lâu mới có. James Diamond 20h/week
  [11:16] namtv: Qua review ko để ý ta
  [11:16] duongdn: năm nay review ta cũng quên mobile 😐️
  [07:55] duongdn: chà, Rory vẫn chưa đưa info gì mới .... Chắc ta đem ThiHV qua Bailey fix bug tạm nha
  [07:56] duongdn: * chà, Rory vẫn chưa đưa info gì mới .... James thì LongVV làm xong luôn rồi  Chắc ta đem ThiHV qua Bailey fix bug tạm n
  [08:03] namtv: Bạn có project mới, nhưng chưa ready (hi vọng sáng nay có code để setup nhưng ko chắc), chắc đưa qua Bailey tạm đi, khi 
  [08:03] duongdn: OK
  [08:50] duongdn: chắc vẫn cứ add bạn vào WS Bailey nha, để bạn fill giờ cho đúng
  [08:52] namtv: Thi trước cũng từng làm Bailey rồi phải ko?
  [08:53] duongdn: chưa, hồi trước có plan training Prestashop để làm, nhưng chưa có cơ hội vô
  [08:53] duongdn: mà để check lại task log phát
  [08:53] namtv: Vậy cần chạy checklist 😄
  [08:55] namtv: History thì thấy có add vào Bailey từ 2025-07-17
  [08:57] duongdn: à xác nhận có rồi
  [08:57] duongdn: ai xoá người trong project info vậy trời ...
  [08:58] duongdn: bạn làm đúng 2.5h rồi out :))
  [08:58] duongdn: giờ chắc lại y chang
  [09:02] namtv: Vậy tao skip checklist, đã add nha
  [10:12] namtv: >James thì LongVV làm xong luôn rồi  Là xong từ tuần trước rồi hả? Hay nay còn làm?
  [10:13] duongdn: xong rồi sáng ổng có chút task với xíu review ta có đưa cũng ko nhiêu
  [10:13] namtv: Nó liên quan tới thanh toán. Tính xong task này mới thanh toán 1 lần Vậy để hết tuần này rồi gửi bill luôn
  [10:13] duongdn: ok
  [16:33] namtv: Cuối cùng Thi có làm miếng Bailey nào ko nhỉ?
  [16:34] duongdn: ko, chưa setup xong nữa đã đi rồi
  [17:40] duongdn: image.png
  [17:50] namtv: Uhm. Nó limit 5 review/h thì phải. Nên về long-term tao muốn là code review skill như tao nói trên room chứ ko phải serv
  [21:08] duongdn: Chưa có time lesson learn Celine, mai nha
  [21:31] namtv: Mai nghỉ lễ rồi. T5 nha
  [11:00] namtv: Blair end contract, ổng có nói gì ko nhỉ?
  [08:24] duongdn: ko nha, có vẻ ổng remove ra khỏi Slack luôn rồi
  [08:26] duongdn: * ko nha, để hỏi ổng xem
  [08:36] duongdn: này sao rồi mi
  [08:43] namtv: Chắc cancel. Bên này kêu đang phải ngâm cứu thị trường gì đó, chưa biết lúc nào xong
  [08:43] duongdn: ok
  [08:51] namtv: Brad có mấy message nha
  [08:53] namtv: Blair giờ khó feedback quá ta 😄 Nếu theo thực tế project thì mày nghĩ rate bao nhiêu stars (max 5), và feedback text th
  [08:56] duongdn: thường các tiêu chí để đánh giá khách hàng là gì?  Xem ổng OK được mấy cái
  [08:57] namtv: Trước nó còn chia ra 5 tiêu chí, nhưng giờ nó gộp chỉ 1 cái chung. Thường dựa trên communication, requirement quality, c
  [09:09] duongdn: Chắc 4*,  communication cũng bình thường, quá dựa vào AI để nc với dev làm có kha khá communication gap requirement thì 
  [09:10] namtv: Nhắc ổng gửi bonus thanh toán nợ $41.67 luôn phát 😢
  [09:11] duongdn: nhắc tuần 3 lần, ko trả lời hay giảm xuống 3* do payment ko ok ta :D
  [14:25] namtv: Ổng trả lời gì ko?
  [14:29] duongdn: ko, ko nói gì lâu nay rồi
  [14:42] namtv: Raymond hình như lâu lắm rồi ko có làm gì phải ko?
  [14:42] duongdn: 2 tháng rồi
  [14:43] namtv: Tao close project, nếu có task gì thì cần báo nha
  [14:45] duongdn: OK, ko nói ổng 1 tiếng à? Hay nói trên Upwork luôn
  [14:45] namtv: Cái này pay ngoài, đối với ổng thì ko có gì xảy ra cả. Chỉ là internal mình close thôi
  [14:48] duongdn: === Mới lesson learn với Phúc,  cũng làm rõ ra váì ý của dự án, này report sau về cá nhân, bạn cũng đang có vấn đề, do h
  [14:53] namtv: Thấy bữa Minh có nói 1 ý Phúc tính xin off vài tháng gì đó nhưng ráng. Mày thấy nếu giờ nói bạn off đi thì OK ko? Dev Py ⚠️
  [14:55] duongdn: ta có suggest bạn nên xin off dạng ko lương vài ngày/ tuần  Có gì có dev khác vô phụ làm Chứ off luôn cũng hơi tiếc, Phu
  [14:55] namtv: Vài tháng như bạn tính ấy
  [14:56] duongdn: ý là ta sợ ko có vài tháng đâu, có khi tới đó rồi nghỉ luôn thì tiếc
  [15:00] namtv: Nhưng sao mày nghĩ là bạn sẽ nghỉ luôn? Có gì khác à?
  [15:01] duongdn: ko, chắc chưa gặp case tạm nghỉ rồi quay lại thôi
  [15:02] namtv: Cái này nhiều, bình thường. Đang áp lực quá mới dễ nghỉ luôn, chứ tạm nghỉ xử lý việc gia đình các thứ thì tích cực hơn 
  [15:04] namtv: Nói bạn xem ý bạn sao
  [15:04] namtv: Mình cũng đang dư dev quá 😩
  [15:06] duongdn: Ok, có gì ta báo
  [15:41] namtv: John Yi chính là Jon York trên Upwork phải ko ta? --- Senior WordPress / Woo dev Nick Doan - NUS Technology Hired by Jon
  [15:42] duongdn: nghe lạ quá :)) Chờ tí
  [15:45] duongdn: ok đúng rồi nha
  [15:52] namtv: Gửi ổng phát nha: Since we haven’t had tasks for a while, we’ve closed the Upwork contracts as part of our internal proc
  [16:10] duongdn: OK
  [16:11] duongdn: done
  [10:14] duongdn: image.png
  [10:14] duongdn: ỦA, vậy là giờ cái internal review mất tác dụng rồi à?
  [10:15] namtv: Mày tự tạo PR, ko dùng tool trên apps.nus à?
  [10:17] duongdn: à hiểu, này PhucVT có vẻ tự tạo
  [15:00] duongdn: task Long hơi đuối tuần sau rồi bên PhucVY có quyết định gì chưa, ko chắc ta liều cho Long làm trước mấy task mình sugge
  [15:02] namtv: Quyết định gì? Có thấy xin off gì đâu 🤔 Để hỏi lại bên Thúy / Hằng xem
  [15:04] duongdn: ủa tưởng nc rồi, chắc chưa  anyway, giờ mà chưa thì chắc phải lo bên Long tuần sau, còn gì cho bạn làm ko ...
  [15:50] duongdn: hi
  [15:50] duongdn: có issue bên Bailey, xuống tí được ho
  [15:50] duongdn: chưa biết trả lời sao
  [15:50] namtv: Nay tao về sớm làm remote
  [15:50] namtv: Call đi
  [15:51] namtv: Sao ko nghe gì ta 🤔
  [16:04] namtv: Trước mắt PhucVT off 2 tuần từ tuần sau. Nên LongVV làm Celine nha, có thể có thêm Nghiệp phụ khi cần. Ideally mình Long
  [16:06] duongdn: ok, risk chút lại quay lại vụ tại sao phải chuyển Celine cho Phúc là cần dev full time trực msg nhưng thôi để ta cover ,
  [16:07] namtv: uhm, task sắp tới có thể là fix issue code review nên tao nghĩ chắc cũng ko quá căng?
  [16:08] duongdn: biết đâu, có khi bã lại chen vô task nào đó, mà kệ  ráng thôi
  [16:08] namtv: Ngoài Maddy ra thì các bên khác liên quan LongVV đang thế nào?
  [16:08] namtv: Có 1 option là lấy PhongTB qua làm chính Celine
  [16:09] duongdn: có khi Maddy cũng chả có task gì, LongVV nãy ra mới raise hết task đây
  [16:09] namtv: * Có 1 option là lấy PhongTB qua làm chính Celine nếu bên Long lộn xộn quá
  [16:09] duongdn: cấu hinh vậy ổn rồi, ko cần thay gì nữa đâu
  [16:09] duongdn: Celine cũng ko phải dạng yên ổn hiện tại, ko nên thay dev
  [16:10] namtv: Vậy Long chính, PhongTB làm khi cần
  [16:11] duongdn: ok
  [07:52] duongdn: quên bên Bailey ta lấy nick dev chọt chọt vài câu đưa ra vài improvement như document dự án bằng AI …  một hồi ổng bình 
  [10:32] namtv: OK
  [21:57] namtv: Chắc Long làm thôi nha. Bả giảm authorized hours xuống 24h, chưa kể có thể có mobile làm nữa
  [08:24] duongdn: OK
  [14:59] namtv: 01_De_cuong_chuong_trinh_dao_tao_AI.pdf
  [15:00] namtv: Pick làm trainer 1 "giai đoạn" nào
  [15:01] namtv: #1 khả năng là Chiến #3 chắc Nghiệp, do nó có kinh nghiệm làm mấy cái này
  [15:01] namtv: * #1 khả năng là Chiến #3 chắc Nghiệp/KietNVT, do nó có kinh nghiệm làm mấy cái này
  [15:01] namtv: * #1 khả năng là Chiến #3 chắc Nghiệp/KietNVT, do có kinh nghiệm làm mấy cái này
  [15:04] duongdn: ta thích 1 và 5, lão Chiến chọn 1 thì đành lấy 5 vậy, mà 5 xa quá haha
  [15:09] namtv: Vậy hốt #5 đi. Chú ý cái này focus vào đưa AI vào product, như tính năng trong product, build agent các thứ, ko phải cho
  [15:10] duongdn: OK
  [15:10] namtv: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf
  [15:10] namtv: Doc chi tiết cho trainer. Tao chưa review kỹ, nhìn qua thì OK
  [15:11] namtv: Chắc tao sẽ review nó, và sau đó cho nó làm slides luôn. Còn mỗi trainer cần thì tự custom lại
  [15:12] namtv: Hay để tự mỗi người trích xuất data rồi kêu AI làm cho phần của mình luôn ta 🤔
  [15:12] namtv: Chắc vậy cho khỏe 😄
  [15:13] duongdn: vậy trainer làm gì 😂
  [15:14] namtv: Học những gì chưa biết, hiểu, làm, và train
  [15:14] namtv: Train mà người ta hỏi gì cũng ko biết là trảm 🤣
  [15:15] duongdn: OK
  [16:01] duongdn: Ta có 1 câu hỏi, ta mới phát hiện ra là sao content chat của mình ở https://app.element.io/ và https://chat.nustechnolog
