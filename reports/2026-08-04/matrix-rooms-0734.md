# Matrix — since 2026-08-03 08:00 +07:00

### !aWjRrIES2LSGgX2DKI_0N2AItWKje3_VAovXCRcqtCM — 2 messages
  [08:50] duongdn: có update gì cho a ko Phuc Vo
  [08:58] phucvt: Hiện tại chưa á anh, để e sắp xếp summary lại mấy ý tuần trước em có research nha. Xong e báo lại

### !hMXIevjlYxLqftDvXE:nustechnology.com — 2 messages
  [10:05] thaonm: Chào buổi sáng cả nhà!!  Bộ phận Admin vừa gửi email lịch nghỉ lễ Quốc khánh năm 2026, cả nhà check mail nhé.  Lịch nghỉ
  [16:38] trucpdt: Hi @room, Chỉ còn ít phút nữa, cổng poll của NUS PICKS sẽ đóng lại! Mọi người nhớ tham gia vote mẫu thẻ tên mình ưng nhe

### !oGYjbzEfphvvauBZtq:nustechnology.com — 114 messages
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

### !oofREYAXHsvPWEOJev:nustechnology.com — 77 messages
  [10:33] thuyltt: T gửi số tiền cần báo Marcel gửi bonus nha Dương: $30/hour (hourly rate) x 1 hour over the limit = **$30** ⚠️
  [10:49] duongdn: OK bạn
  [10:51] thuyltt: khi nào Dương báo KH xong thì nhắn t luôn he (để t update status follow bên t)
  [10:53] duongdn: đã báo nha bạn
  [15:05] thuyltt: Hi mn, T gửi danh sách tổng kết **giờ làm (trong giờ chính thức, ko tính PT) tuần 27/7-2/8**: Note: các effort training/
  [15:05] thuyltt: image.png
  [15:40] thuyltt: hú hú
  [15:42] duongdn: OK nha
  [16:07] thuyltt: image.png
  [16:07] thuyltt: confirm xíu. Nãy soi kỹ tracker Marcel thì thấy log total 12h lận. Đúng ra chỉ có 10h actual của Long thôi chứ nhỉ? 2h c
  [16:10] duongdn: bạn study dự án á, do chưa có task gì khác, mở thêm để có gì low screenshot thì xóa cũng tiện hơn
  [16:12] thuyltt: ok, t sẽ xóa, giữ 9 thôi (thật ra 8 hay 9 thì cũng charge dc 8 à, phần lố upwork nó bỏ qua. Giữ 9 thì nếu cần thì ổng th
  [16:12] thuyltt: mà thắc mắc chút, coi workstream thì Long có 9h ko làm task job nào, & ban log là
  [16:12] thuyltt: image.png
  [16:13] thuyltt: nếu theo msg này của Dương thì effort bật tracker Marcel này cũng thuộc 9h này?
  [16:13] thuyltt: thấy lạ lạ nên t confirm thôi
  [16:13] duongdn: ko, này của dự án, k phải training Other
  [16:14] duongdn: có tracker mà, bạn ko training ngôn ngữ khác được đâu
  [16:14] thuyltt: vậy coi như cái 3h tracker này là khác nữa??? --> total tuần này Long làm hơn 40h?
  [16:14] duongdn: msg của D cho bạn là cứ mở cho đủ 4h thứ 3, làm xong thì cứ study dự án
  [16:14] duongdn: 3h study dự án á, mở tracker
  [16:24] thuyltt: Tracker thi t đã xóa tracker cho khớp giờ charge rồi
  [16:25] thuyltt: Nhưng actual Long thì có vẻ vẫn khác Dương report nè
  [16:25] thuyltt: Theo log workstream thì Long làm  T3: 8h Marcel  T4:  - 6h Training Python - Django - 2h Marcel Report Duong gửi khớp ef
  [16:25] thuyltt: * Theo log workstream thì Long làm T3: 8h Marcel T4: - 6h Training Python - Django - 2h Marcel Report Duong gửi khớp với
  [16:26] duongdn: để hỏi LongVV
  [16:31] duongdn: chà, bạn nói giống như bạn nói > đúng r á a, mà e canh nó chụp r mới đổi qua training python
  [16:37] thuyltt: vậy Dương soi lại tracker cho T nha..
  [16:37] thuyltt: Nãy t có xóa, chỉ ưu tiên xóa low activity, chứ t ko nắm dự án --> có thể bị sót case training mà t ko biết
  [16:39] thuyltt: & dự án cũng lưu ý luôn. Case bật kiểu này (làm cái khác mà bật) nên cân nhắc, thường chỉ nên dùng nếu vì lí do gì đó tr
  [16:39] thuyltt: nếu thấy sót thì báo t chứ đừng xóa vội nha. Mắc công thiếu h...
  [18:15] thuyltt: sao Dương ơi
  [18:15] thuyltt: dự án check lại chưa?
  [18:16] duongdn: chưa nha bạn
  [18:16] thuyltt: check sớm nha, lỡ sót còn coi nên sao... 😐️
  [18:17] duongdn: tối khoảng 11h nha đang ở ngoài rồi
  [18:17] thuyltt: ua cái đó tưởng D nói Long double check?
  [18:18] duongdn: vậy cũng được, để nhắn Long kiểm tra lại
  [18:19] thuyltt: lưu ý nha Dương!
  [18:24] duongdn: OK vậy cứ bật đủ thì dừng cho đỡ phiền
  [18:24] thuyltt: ko!
  [18:24] thuyltt: chính xác là: nếu actual bạn đang làm nó thật, thì cứ bật
  [18:24] thuyltt: v/v cần giảm charge (vì performance chưa đủ) thì sẽ xóa sau
  [18:24] thuyltt: còn case này khác: rõ ràng bạn ko phải đang làm nó, mà làm cái khác...
  [18:25] duongdn: uhm
  [18:25] thuyltt: -> thường chỉ nên dùng nếu vì lí do gì đó tracker thiếu giờ, KH ko cho add manual, ... thì ráng bật vậy cho đủ. Chứ lạm 
  [18:25] duongdn: uhm
  [18:29] duongdn: rồi nha T bạn báo done rồi
  [18:30] duongdn: mà bạn có tự tiện xoá 1 vài cái screenshot …  có complain bạn rồi xem có vấn đề gì ko
  [18:32] thuyltt: ack
  [18:32] thuyltt: 😐️tai sao xóa nhỉ
  [18:32] thuyltt: ko phải complain, mà cần lesson learn đó D ☹️
  [18:32] duongdn: ok
  [18:33] thuyltt: giờ thì total còn 8:10
  [18:33] thuyltt: v/v charge KH thì vẫn vậy (vì lố authorize nên chỉ charge 8 thôi)
  [18:33] thuyltt: nhưng t mà là ổng, t sẽ ko hiểu sao 8:10 là cái gì...
  [18:33] thuyltt: nếu định xóa cho vừa authorized thì sẽ còn 8h, chứ 8h10 là sao
  [18:34] thuyltt: ko biết ổng có nghĩ chắc tui nay chỉ làm 8h10 mà report 9h ko 😐️
  [18:34] thuyltt: chắc giờ bỏ qua. nếu ổng có hỏi thì chắc sẽ nói m thấy dư (upwork cũng sẽ ignore) nên định xóa, mà bi sót 10m
  [18:35] thuyltt: * **chắc giờ bỏ qua. nếu ổng có hỏi thì chắc sẽ nói m thấy dư (upwork cũng sẽ ignore) nên định xóa, mà bi sót 10m**
  [18:35] thuyltt: mai Dương nói chuyện bạn nha 😐️
  [18:35] duongdn: ủa sao h ko xoá luôn 10m cho đủ
  [18:35] thuyltt: mai chứ ko phải bây giờ chat (chat rồi quên)
  [18:35] thuyltt: h làm sao xóa dc nữa
  [18:35] duongdn: OK
  [18:35] thuyltt: ủa mà khoan, vạy sao nãy nó xóa dc nhỉ
  [18:35] thuyltt: chắc upwork update deadline xóa screenshot
  [18:35] thuyltt: để xóa luôn
  [18:36] thuyltt: done báo T nha. case này ko sao, lỡ case khác thì...
  [18:36] thuyltt: mà D phải hỏi để biết tai sao bạn xóa... (nhiều khi tiềm ẩn hiểu lầm gì 😐️
  [18:37] duongdn: ima_1267451.jpeg
  [18:37] duongdn: giải thích thì bạn hiểu lầm ok là ok xoá đi
  [18:37] thuyltt: đã xóa 10m dư luôn rồi nha
  [18:37] duongdn: ok
  [18:38] thuyltt: mai lesson learn nha :(((
  [18:38] thuyltt: aaaa
  [18:38] duongdn: uhm

### !QXVvpibWGtEQsVdnKw:nustechnology.com — 4 messages
  [09:23] namtv: Con này rẻ và được cái là multimodal (support image, audio, video) input, chứ code thì ko ngon nha
  [09:23] namtv: ---- Tuần vừa rồi (31/7) Deepseek đã release V4 flash chính thức (trước giờ là bản preview). Bản này bằng cách nào đó (n
  [09:24] namtv: Usage có thể sẽ tăng chút nha, do chuyển model, mất input cache
  [09:24] namtv: * V4 Flash: usage có thể sẽ tăng chút nha, do chuyển model, mất input cache

### !SHdFKwrYpRhWJBtiBv:nustechnology.com — 8 messages
  [08:37] duongdn: qua tháng rồi, review lại nha :D
  [08:37] vutq: dạ oke
  [08:38] duongdn: https://cdf.nustechnology.com/evaluation_forms/554#2
  [08:38] duongdn: xem xét cái này nha
  [08:39] duongdn: ráng sao lên luôn năm sau đi, còn mỗi một slot CDF
  [08:39] duongdn: tiếc ghê ...
  [08:42] vutq: dạ cũng xong rồi á, giờ em điền đợi đợt CDF tiếp theo thôi 🫡
  [08:43] duongdn: ok, điền sớm, rồi a review xem sao

### !tGBJevbuSmjqVePBPN:nustechnology.com — 4 messages
  [11:29] halt: Hi a Cho e hỏi bên Celine LongVV có 9h, time này charge full ko ạ?
  [11:31] duongdn: a hết review LongVV rồi nha
  [15:15] halt: Hi a Nhờ a nhắc KH Kunal thanh toán bill này giúp e nha. E cũng có gửi email nhắc KH thanh toán ạ $13572,38 - Invoice fo
  [15:15] duongdn: OK

### !zfXpcHSkwqWylFrApi:nustechnology.com — 2 messages
  [12:30] chientx: Brad Ballantine 11:56 AM Hi Carrick Thanks for the message and update I will contact Crazy Domins and see if they can as
  [13:45] chientx: ổng có gửi thêm msg nha a

### Arthur - Meta-Stamp — 21 messages
  [08:55] tiennd: anh Nam Tran ơi, anh Năm có ở trên 3B ko anh
  [08:58] namtv: Có nha
  [09:48] namtv: Trả lời tạm trước đi Tiến, thank you, tao check gì đó
  [09:49] tiennd: dạ
  [09:59] namtv: Có cái nào thuộc dạng như phù hợp trong scope ban đầu nhưng ổng expect behavior/UX khác mình đang làm ko?
  [10:01] tiennd: ý anh nó dạng dạng giống vậy hả anh
  [10:01] tiennd: 13. A13 — timeline timestamps unlabeled UTC. Label or localize.
  [10:03] namtv: uhm, như cụ thể cái này thì anh thấy mình cần làm, ko phải CR
  [10:06] tiennd: này nếu thêm lable UTC thì mình làm, còn nếu localize thì có charge ổng ko anh
  [10:06] tiennd: * này nếu thêm lable UTC thì mình làm, còn nếu localize thì có charge ổng ko anh?
  [10:09] namtv: Ổng đã nói or thì label cho nhanh
  [10:11] tiennd: nhưng trước đó ổng ghi:  A13. Every timestamp is labeled and displayed in the viewer's local time
  [10:11] tiennd: ông này bị đa nhân cách rùi :)) để em đưa vô current scope và note lại hiện UTC lable =))
  [10:23] phucvt: Của em có mấy cái này: 2. Rights attestation arrives PRE-CHECKED, carried over from the previous upload. Fix: the attest
  [10:23] phucvt: * Của em có mấy cái này: 2 - Rights attestation arrives PRE-CHECKED, carried over from the previous upload. Fix: the att
  [10:49] namtv: Anh ko hiểu lắm. 2 em discuss xem nó có nên là in-scope ko. Ví dụ như nó là expectation khác chút với cách mình tự assum
  [10:51] phucvt: Ok anh, để em discuss với a Tiến
  [11:01] phucvt: Em đã discuss với a Tiến.  3 cái trên chỉ là small change, nhưng mà ngoài scope. Effort thấp nên mình vẫn báo là hỗ trợ 
  [11:10] phucvt: * Em đã discuss với a Tiến.  3 cái trên chỉ là small change, nhưng mà ngoài scope. Expectation khác chút với cách mình t
  [11:17] phucvt: Nam Tran Giờ mấy cái in-scope là mình start luôn nha anh
  [11:17] namtv: uhm

### Bailey - BA/QC — 11 messages
  [09:17] duongdn: status task sao rồi m
  [09:48] datnc: Tuần này focus test & resolve bug để release staging 2 con Prestashop Grazing Desktop + Console Upgrade Rail 6 thui a. T
  [09:49] duongdn: vậy dev còn task làm ko?
  [09:52] trinhmtt: Bữa giờ dev bận quá, nay mới có est cho em, còn một cái em hnay sẽ song requirement ạ
  [09:55] datnc: Vậy thì hiện ko có task rồi anh, tasks mới chờ bác approved đã, trừ cái con upgrade tiếp từ rail 6 -> rail 7. Hoặc bugs 
  [09:59] duongdn: để xin xem
  [10:03] duongdn: ok nha, cho bạn fix bug đi, a sẽ theo dõi giờ charge ...
  [10:03] duongdn: - Others (Console Pallet Barcode Uniqueness, PO Purchase Price Logging, Automatic Stock Refill) — within budget, no flag
  [10:03] duongdn: mấy cái này sao đây
  [10:04] datnc: Cũng chờ test thui a, e plan release 2 cái con đầu tiên nay hoặc mai. Còn cái auto stock refil là thuộc scope mới nhan.
  [14:06] datnc: Bác có follow nha anh Dương. https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1785737525439309?thread_ts=17

### Brad Ballantine - Auction warehouse — 32 messages
  [09:02] duongdn: bên này sao rồi em?
  [09:03] duongdn: này giờ job chính e đó :D
  [09:03] phucvt: Ủa bên Metastamp hết r hả anh
  [09:04] duongdn: ko hết, nhưng bên đó có Tiến
  [09:04] duongdn: còn bên này có mỗi em thôi D
  [09:05] phucvt: À. Bên metastamp chắc ưu tiên hơn, tại có feedback của khách về tính năng trước đó e làm nè
  [09:05] phucvt: Nên e đang ưu tiên check
  [09:05] duongdn: OK e
  [09:06] phucvt: ------------- Còn bên này thì: Weekend specials=> dev done, pushed code Insurance Salvage Australia site => In-process
  [09:06] phucvt: Chi tiết của Insurance Salvage Australia site: Đã xong - Dựng WordPress theme từ template - Đổi nameserver domain sang s
  [09:08] duongdn: DNS e update được ko ta
  [09:08] duongdn: có Crazy domain mà
  [09:08] phucvt: À em update rồi anh, đang chờ DNS propagation thui
  [09:09] phucvt: Mới verify lại hồi sáng, hình như ok rồi
  [09:09] phucvt: * Mới verify lại hồi sáng, ok luôn rồi á anh
  [09:09] duongdn: ok, vậy coi như xong hết ròi?
  [09:09] phucvt: Còn lại: Logo Tạo user WP cho Les/Brad Redirect .au → .com.au Launch site Còn mấy cái này và testing nữa anh
  [09:09] duongdn: ok
  [09:10] phucvt: Ủa mà cái 8h là cho cái site **Insurance Salvage Australia** thôi đúng ko anh? Chứ đâu phải bao gồm cái còn lại nữa?
  [09:11] phucvt: Theo e đọc message là vậy, k biết có mistake gì ko\
  [09:12] duongdn: uhm
  [09:12] duongdn: cái còn lại chưa est
  [09:12] phucvt: Mà bên họ chưa reply message mình nữa
  [09:12] duongdn: có info gì để est chưa>
  [09:12] phucvt: Chắc e lên ping họ phát nha a
  [09:12] duongdn: bữa a có hỏi lại 1 vài câu
  [09:13] phucvt: * <del>Chắc e lên ping họ phát nha a</del> À em thấy anh có nhắn rồi thì phải
  [09:14] phucvt: Cũng có anh. Tuần trước e có check thì hình như 2 site giống nhau, khác nội dung thôi. Cái này để khi nào e quay lại đượ
  [09:15] duongdn: uhm, nhơ check kĩ msg của a lúc trước
  [09:15] duongdn: BTW, report status cho ổng luôn nha
  [09:17] phucvt: Ok anh, để e sắp xếp 🙏 Có update em báo
  [13:24] duongdn: Cus có msg nha em

### Celine - OhCleo — 145 messages
  [08:33] duongdn: PhucVT sẽ làm backup cho LongVV nha, nếu Long kẹt thì PhucVT làm
  [08:33] luhx: Minh Trinh: thấy có plan làm bên này, có task làm luôn không hay mai mốt gì á.
  [08:34] minhtv: https://trello.com/c/p394bw47/171-view-own-profile Fix cái này luôn đi Lữ
  [08:34] minhtv: * https://trello.com/c/p394bw47/171-view-own-profile https://trello.com/c/d8e4VTaH/194-when-sending-a-support-mail-throu
  [08:40] minhtv: Bên BE thì sáng nay làm 2 cái này trước nhé  https://trello.com/c/ePyEhaEQ/170-activate-new-e-mail-flow https://trello.c
  [08:43] duongdn: có gấp ko Minh Trinh  Do vẫn ưu tiên để LongVV làm, trừ khi LongVV kẹt quá mà gấp thôi
  [08:44] minhtv: Gấp a ơi , hôm nay phải xong mớ task để release á a , bả đặt mục tiêu thứ 3, đặc biệt mấy cái liên quan email
  [08:45] duongdn: Phuc Vo:  e có sắp xếp làm giờ  được ko? [thread: 1 reply]
    └ [08:56] phucvt: Để e xem rồi báo lại sau nha anh.  Đang có việc bên project khác cần phải check, xem có giờ làm bên 
  [08:45] duongdn: Long Vo:  bên Maddy có dời được hok?
  [08:45] longvv: Bên Maddy dời dc nha a, tại cũng ít task lắm
  [08:46] longvv: chưa có nhiều task mới
  [08:47] duongdn: ok vậy e làm Celine đi , mà thế này thì có đủ task làm 16h ko ....
  [08:47] longvv: Khả năng ko á, h đợi xem mai hay mốt cus bên ổng có giao thêm task hok
  [08:48] duongdn: OK
  [08:49] longvv: image.png
  [08:49] longvv: rùi bả ko rep dc thì sao mình làm ta :))
  [08:49] longvv: để e dí thử
  [08:50] minhtv: Mình suggest làm theo hướng làm popup luôn đi , do bả sợ take time
  [09:09] minhtv: Triển luôn nhé Long, đừng đợi confirm.  Có gì thay đổi update sau , làm những phần chính trước
  [09:09] longvv: vậy chắc em triển luôn nha a Minh ơi, làm cũng lẹ
  [09:16] minhtv: Nhớ kéo task cho tiện tracking nhé
  [09:37] luhx: bên này sài code ở develop ha?.
  [09:39] hiepnt: dạ
  [09:41] luhx: Screenshot 2026-08-03 at 09.41.19.png
  [09:41] luhx: ae cho xin 1 acc để vào tab profile thấy dc như này.
  [09:41] luhx: hình như là phải là thằng upload mới dc.
  [09:41] hiepnt: a tạo 1 account mới là đc a
  [09:42] hiepnt: có 2 loại account
  [09:43] hiepnt: 1 account chỉ nghe, 1 account vừa nghe được vừa upload được, nếu muốn thành account upload được thì cần lên web đăng kí 
  [09:43] hiepnt: image.png
  [09:43] luhx: https://trello.com/c/p394bw47/171-view-own-profile có acc nào mà bấm vào lỗi như video không nhỉ? vừa login acc tony thì
  [09:43] hiepnt: còn nếu acc chưa phải là ceator thì UI nên theo mô tả ticket
  [09:43] hiepnt: tại acc tony bữa đăng kí làm creator r ă a
  [09:44] hiepnt: giờ a đăng kí bằng account gg khác a,
  [09:53] minhtv: account mới là bị hết á
  [09:53] minhtv: * account mới là bị hết á, đơn giản nó đăng ký là người nghe
  [09:55] luhx: Okay, fixed.
  [09:55] luhx: chả hiểu sao user mới truyền id, API nó trả về lỗi.
  [09:55] luhx: chuyển sang username thì oke cả acc mới tạo và acc cũ có từ trước.
  [09:55] longvv: nhiều endpoint nó truyền ko nhất quán á, dev cũ nó làm ảo lắm
  [09:56] longvv: chỗ thì truyền id, chỗ thì truyền username
  [09:56] hiepnt: bên mobile cũng loạn hết lên vì cái đó @@
  [09:57] luhx: Screenshot 2026-08-03 at 09.57.03.png
  [09:57] luhx: https://trello.com/c/d8e4VTaH/194-when-sending-a-support-mail-through-app Minh Trinh confirm phát, là change message des
  [09:57] minhtv: đúng rùi
  [10:00] luhx: Okay, done 2 ticket kia rồi, giờ sao Minh Trinh  build hay còn gì làm tiếp không?
  [10:02] minhtv: đơn giản thế thôi, 2 cái này build sẵn prod với staging luôn  đi 🤣 Rồi lượn qua bên Amaury fix
  [10:02] minhtv: 90% sẽ nhảy vào BE
  [10:03] luhx: staging thì ném lên đâu nhỉ, prod thì sao, lâu quá quên nữa rồi Hiep Nguyen
  [10:04] hiepnt: staging ném QC còn prod mới lên TF (andorid thì gửi link bả, bả ok thì release)
  [10:04] hiepnt: mà nhỏ quá e build luôn pro lun
  [10:41] luhx: do update cũng nhỏ nên chỉ build prod thôi nha bà con: Android: Internal testing 4.1.8 (15) iOS TF 4.1.8 (1).
  [11:28] minhtv: a Duong Doan  ơi, review dùm e giờ charge tuần trước, theo lý thuyết mình report tối đa 8h thui á a
  [11:29] minhtv: Check and reply #3, #4 #7 => Này chắc charge ko được
  [11:29] duongdn: hiện dev đã làm lâu quen dự án rồi, nên effort giờ charge full được rồi nha
  [11:29] duongdn: chắc bỏ vụ review cho LongVV đi
  [11:30] minhtv: em đã updated
  [13:50] longvv: https://trello.com/c/ePyEhaEQ/170-activate-new-e-mail-flow này e xong r, mà h đợi thông tin từ bả về 3 cái audio trong e
  [13:51] longvv: image.png
  [13:51] longvv: con này bên mobile xử r đúng ko ạ [thread: 32 replies]
    └ [13:52] minhtv: Check Lu Ho
    └ [13:52] luhx: check là sao? làm hay sao?.
    └ [13:53] minhtv: check xem, cần làm thì múc, làm rồi thì move task
    └ [13:56] luhx: oke.
    └ [13:56] luhx: cho a xin link task đi Long Vo
    └ [13:56] longvv: https://trello.com/c/qP9L5BVS/193-keep-audio-playing-during-navigation
    └ [14:48] luhx: a Hung Pham có bản build prod mới cho ticket trên nha, do update ít nên em mần luôn prod, internal t
    └ [15:09] hungpn: gồm những phần nào á Lu Ho
    └ [15:10] hungpn: TF bản 4.1.8 đúng k em
    └ [15:10] luhx: https://trello.com/c/qP9L5BVS/193-keep-audio-playing-during-navigation https://trello.com/c/d8e4VTaH
    └ [15:10] luhx: iOS 4.1.8 (2) Android thì 4.1.8 (16) hay soa đó.
    └ [15:45] hungpn: Lu Ho: gửi nah link test android vs em
    └ [15:46] luhx: internal testign á a chưa test lần nào trên đó hả a.
    └ [15:46] hungpn: bên android toàn gửi link k mà
    └ [15:47] luhx: ủa vậy hả, vậy để em build 1 bản gửi a, prod luôn ha?.
    └ [15:47] hungpn: cũng dc luôn
    └ [15:50] luhx: https://drive.google.com/file/d/1rTDsegfFITeQPH7Dym40w0B5T3iQgvy3/view?usp=sharing
    └ [15:50] luhx: đây nha a.
    └ [15:51] hungpn: link driver ak, tưởng cái link test gì đó mà Hiep Nguyen nhỉ
    └ [15:51] luhx: có link test gì khác nữa à.
    └ [15:51] hiepnt: driver cũng đc a, bình thường e gửi ảnh dạng link của https://www.diawi.com/ :v
    └ [15:52] luhx: file nặng sao up lên đó được nhỉ.
    └ [15:52] hiepnt: à đúng r, mọi lần android e cũng gửi a driver mà Hung Pham
    └ [15:56] hungpn: tải lâu thật chứ
    └ [16:01] hungpn: check xong 3 cái này rồi nha Lu Ho
    └ [16:01] luhx: bug nhiều không a.
    └ [16:01] hungpn: 3 card đó k  có bug nha
    └ [16:01] luhx: uầy ảo ta, con AI code tốt phết ta :v
    └ [16:02] hungpn: nếu có thì có cái bug performace á
    └ [16:02] luhx: là bug cũ hay mới.
    └ [16:02] hungpn: load cái creditor nó hơi chậm tầm 2 -3s
    └ [16:03] hungpn: cũ hay mới đợi anh check lại
  [13:51] hungpn: sáng nay bên này sôi động nè, có cần anh check gìhok
  [13:52] longvv: a lên staging giúp e check cái popup của user ẩn danh nha, tạm thời e để ở trang https://staging.ohcleo.com/subscribe [thread: 30 replies]
    └ [14:04] hungpn: anh chưa hiểu yêu cầu lắm nè, củ thể hơn dc k em
    └ [14:05] longvv: image.png
    └ [14:05] longvv: Hiện tại cái flow automations của bả có cái này
    └ [14:06] longvv: Trước đó mình ko có cái popup cho ngta nhập email để nhận mấy cái mail bả cần gửi
    └ [14:06] longvv: h mình thêm vào để họ nhập, sau đó gửi mail theo flow trong hình
    └ [14:06] hungpn: list thông tin đó quản lý ở đâu bên admin á em?
    └ [14:08] longvv: là thông tin gì á a
    └ [14:09] longvv: khi mà ngta nhập email
    └ [14:09] longvv: nó sẽ dc đưa vào segment này
    └ [14:09] longvv: image.png
    └ [14:11] hungpn: gửi lại anh cái link segment này vs
    └ [14:12] longvv: https://mc.sendgrid.com/contacts/segments/fad65739-ac78-41ff-a523-86a537271359
    └ [14:12] hungpn: Long Vo: môix khi user vào page thì pop-up đó luôn hiển thị đúng k em?
    └ [14:13] longvv: uh a, nào submit r thì ko hiển thị nữa
    └ [14:14] hungpn: account bên này sài account naò á em
    └ [14:15] longvv: là a hỏi account login vô hay sao
    └ [14:16] longvv: a cứ nhập tony+testxxx@nustechnology.com để test thui
    └ [14:16] hungpn: accoutn này nè, để anh vào xem thử
    └ [14:17] longvv: tony@nustechnology.com á
    └ [14:17] longvv: e nhớ a dc share nick Twilio r á
    └ [14:17] hungpn: tks em
    └ [14:28] hungpn: image.png
    └ [14:28] longvv: phải đợi á
    └ [14:28] hungpn: nãy anh thử mấy cái àm vào có 2 thèn này á nhỉ
    └ [14:29] longvv: tụi nay update chậm lắm
    └ [14:29] longvv: image.png
    └ [14:29] longvv: a xài nút này nha
    └ [14:29] longvv: mà nó cho refresh 1 lần 1 giờ à
    └ [14:47] hungpn: flow này này chạy chưa á nhỉ?: hay mai nó mới gửi email ta
    └ [14:48] longvv: chưa nha a, mới setup th chưa có đưa vô chạy
  [13:52] longvv: hiển thị ở đâu thì mình discuss với bả sau
  [14:10] minhtv: Discuss luôn đi Long ơi, hiện tại em đang cho để ở đâu á?
  [14:10] longvv: trang subscribe á
  [14:10] longvv: tại ngoài trang chủ nó hiển thị nhiều popup quá
  [14:10] longvv: em để tạm trong đó
  [14:15] longvv: * là a hỏi account login vô sendgrid hay sao
  [14:26] minhtv: sao a vô staging ko thấy ta ? A Hùng thấy ko ?
  [14:27] longvv: https://staging.ohcleo.com/subscribe
  [14:27] longvv: trang này nha a
  [14:27] minhtv: em chụp a xem, a vô đúng rùi,  ko thấy
  [14:28] longvv: image.png
  [14:28] longvv: à
  [14:28] longvv: chắc do anh đăng nhập á
  [14:28] longvv: anh logout ra
  [15:42] minhtv: Rep bả phát Long ơi, gửi bả account nào free phát
  [16:11] longvv: Done r nhe a
  [16:48] longvv: image.png
  [16:48] longvv: triển thui
  [17:11] longvv: team mobile cho e xin report nhe [thread: 1 reply]
    └ [17:12] luhx: - Fix profile detail and support message views. - Fix track pausing when opening the detail view.

### Delivery - Resource Arrangement — 6 messages
  [08:46] namtv: NEW	VuTQ	Sáng	03/08/2026	Đưa người nhà đi khám bệnh ==> Tính vào time idle / project internal. Ko cần update note
  [08:46] namtv: NEW	TuanNT		10/08 - 11/08/2026	Về quê ==> Hà note plan sau nha
  [09:49] namtv: NEW	DatNT		07/08/2026	Đi khám mắt + về quê ==> VuTQ bù bên Kunal. Anh đã update note
  [11:20] namtv: NEW	ThoTNT	Chiều	03/08/2026	Có việc gia đình đột xuất ==> TamVT bù bên Zeke. Anh đã update note
  [14:51] namtv: NEW	KhanhPQ		10/08/2026	Đi khám bệnh ==> Bên Michael Koh dùng PL. Anh đã update note
  [18:15] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 

### Elena - Active Alerts — 84 messages
  [08:35] kietnht: hú, plan tuần này sao dị ae
  [08:46] anhttl: BE như cũ, FE có anh Trí á
  [08:46] anhttl: Tri Nguyen: tuần này anh làm bên nào trước ấy?
  [08:48] trinm: bên này trước nha em cho done task, nếu không bị ai hú về
  [08:50] anhttl: Có mấy bug FE trên redmine á, ưu tiên fix trước để release nha
  [10:27] kietnht: hú Anh Trinh send lại giúp cái prototype của CR reminder với [thread: 10 replies]
    └ [10:29] anhttl: https://uselink.app/@anonymous/reminder-endtoend-demo-j4tg21i6
    └ [10:30] anhttl: đây nha a Kiet Nguyen
    └ [10:44] kietnht: chỗ mà coi mấy cái popup notification ở đâu á
    └ [10:55] kietnht: send lại giúp a cái figma luôn nha Anh Trinh
    └ [11:21] anhttl: Có trong cái demo đó luôn á, anh scroll xuống tí, cái alert của cái con quỷ đó nó che của em r :)))
    └ [11:21] anhttl: image.png
    └ [11:22] anhttl: figma: https://www.figma.com/design/AFo6lMDB42WCDrB1ZsZu1t/01_Precognize-Product?node-id=5705-27302&
    └ [11:22] anhttl: mà trong figma ko có gì đâu
    └ [11:22] anhttl: Kiet Nguyen: anh cần gì nữa hem
    └ [11:35] kietnht: à rồi, okay e :v
  [10:28] anhttl: anh Tri Nguyen làm luôn cái dynamic icon nha. Spec integrate: https://precognize.atlassian.net/wiki/spaces/PD/pages/2992
  [10:30] anhttl: Kiet Nguyen: anh tạo mấy allert cho anh Duy chưa á
  [10:30] samht: Tri Nguyen: task này bữa a mới test được cái endpoint work r nha, chưa có output gì đáng kể nên k có gì transfer cho e đ
  [10:30] trinm: gửi em info api đi anh
  [10:31] samht: kìa, spec ở trên LA gửi á
  [10:31] samht: tuần tr là API nó chưa deploy thành công
  [10:31] trinm: à ok anh
  [10:31] samht: sau đó đã fix r, follow spec đó là ok
  [10:32] anhttl: làm dynamic icon, fix bug AA4 (nếu có) trước r mới qua CR reminder nhá a Tri Nguyen
  [10:33] kietnht: bũa tạo 1 cái rồi
  [10:33] kietnht: a Duy cần thì tạo thêm nữa, tại ko nghe nói gì á
  [10:34] anhttl: mỗi lần tạo thì lâu ko anh, tại anh Duy chắc muốn test thử nhiều case đó
  [10:34] kietnht: cỡ 10 mins
  [10:34] kietnht: lần trước phải mò nên lâu
  [11:25] anhttl: Tri Nguyen: hú, cho em xin cái trong code nó đang map mấy alert type icon đồ như nào đc ko anh, mấy cái Oscillation ấy
  [11:26] anhttl: * Tri Nguyen: hú, cho em xin cái trong code nó đang map mấy alert type với icon đồ như nào đc ko anh, mấy cái Oscillatio
  [11:31] trinm: nó sẽ gán ownerType kiểu vầy  `system_alert_${ownerType}_icon` => list icon sẽ show  stem_alert_DataDrift_icon = 'system [thread: 11 replies]
    └ [11:31] anhttl: ý là cho em cái list icon tương ứng á
    └ [11:31] anhttl: anh lấy từ đâu
    └ [11:32] anhttl: Tri Nguyen:
    └ [11:33] trinm: lúc trước down từ design
    └ [11:33] trinm: rồi lưu vào source
    └ [11:34] trinm: rồi call nó ra theo quy tắt name kia thì nó ra icon tương ứng tôi
    └ [11:35] anhttl: cho em cái list icon với, em cần name tương ứng á, lâu ko
    └ [11:39] anhttl: hmm thoi khỏi cũng đc
    └ [11:41] trinm: name ở trên kìa
    └ [11:41] trinm: system_alert_ConstantToContinuous_icon ...  đó
    └ [11:41] anhttl: hụ hụ, ý là cái hình dạng của icon á, mà kệ i
  [11:33] trinm: * rồi lưu vào source code
  [11:34] trinm: * rồi call nó ra theo quy tắt name kia thì nó ra icon tương ứng thôi
  [11:36] kietnht: a Duy Vo có cần tạo thêm alert để test mấy cái close gì ko á
  [11:36] anhttl: ảnh off sáng á
  [11:40] anhttl: ownerType có những value nào í anh Kiet Nguyen
  [11:43] kietnht: Environment,     Rule,     Valve,     Segment,     DataDrift,     ConstantToContinuous,     ContinuousToConstant,     No
  [13:35] duyvna: tạo thêm đi e, nhớ tạo thêm mấy cái trùng name để check previous lun nha
  [13:36] kietnht: trùng name là sao ấy a
  [13:37] duyvna: asset name á
  [13:42] anhttl: Kiet Nguyen: Cái chỗ link/unlink audit log QC test đc chưa anh? bữa có lỗi là click vô ID thì nó hiện lỗi là alert ko cò
  [13:43] tuanntg: Lỗi FE nha e
  [13:43] anhttl: ý ảnh là tạo để có previous data để test á, còn đúng là thì trùng ownerId như anh nói
  [13:43] tuanntg: BE đã đủ info rồi
  [13:44] anhttl: cái chỗ link đó anh Duy Vo có bug nào liên quan ko, hay là cần em transfer cho anh Trí?
  [13:45] kietnht: > Cái chỗ link/unlink audit log QC test đc chưa anh? xong rồi mà chưa deploy nha
  [13:46] anhttl: deploy luôn asap nha anh
  [13:52] anhttl: Cái này em thấy để feedback và assign cho anh nè a Kiet Nguyen: https://redmine.nustechnology.com/issues/79859
  [13:53] kietnht: cái đó BE fix rồi nha
  [13:53] kietnht: theo rule mới đó, a Duy test lại cái đó đi
  [13:53] duyvna: ok để a check lại flow đó
  [13:54] anhttl: deploy đi anh, anh Tri Nguyen hết task rồi để làm cái này luôn
  [13:54] anhttl: Duy Vo: nay test xem còn bug ko cho dev fix nha a
  [13:55] kietnht: ok dang push nha
  [13:59] anhttl: Tri Nguyen: Chỗ audit log link/unlink, hiện tại req là sẽ show alert ID, --> updated: Thay alert ID thành asset name. Kh
  [13:59] anhttl: image.png
  [14:01] anhttl: Duy Vo: test luôn cái này nha: https://precognize.atlassian.net/browse/AA-54
  [14:12] kietnht: lên rồi nha, chỗ cái log link/unlink nó có assetName, show cái đó ra nha Tri Nguyen . Mà note là nó chỉ apply cho những 
  [14:13] kietnht: nó sẽ ko xảy ra ở prod, internal data bên mình thôi
  [14:13] trinm: ok anh
  [14:16] duyvna: card update Reminders Workflow lên chưa Tri Nguyen
  [14:16] trinm: chưa có xong anh
  [14:16] kietnht: cái đó chưa đâu, BE còn chưa xong mà :v  mình đang ưu tiên xong cái release mà pk Anh Trinh
  [14:17] duyvna: tưởng cái này làm xong release lun chứ
  [14:21] anhttl: Chắc ko kịp, nên mình release cái AA4 trước rồi release cái Reminder sau nha
  [14:47] kietnht: image.png
  [14:47] kietnht: mới tạo thêm nha a Duy Vo
  [15:33] trinm: đã deploy update về link/unlink trong AuditLog anh Duy Vo
  [15:47] duyvna: https://redmine.nustechnology.com/issues/80178 Tri Nguyen fix bug UI này lun nha e
  [16:36] anhttl: Tri Nguyen: em qua chỗ anh discuss này tí nha
  [16:36] trinm: ừa ok em

### Kunal - Fountain — 34 messages
  [08:34] trinhmtt: Em gửi plan tuần này ạ  ThinhT: 20h DatNT: 40h ViTHT: 40h => QC: 25h
  [08:39] datnt: Vu Tat anh check giúp em PR này nha #[2994](https://trello.com/c/NsaqpxEl/2994-nomethoderror-in-ordersstatus): https://g
  [10:37] datnt: * Vu Tat anh check giúp em PR này nha #[2994](https://trello.com/c/NsaqpxEl/2994-nomethoderror-in-ordersstatus): https:/
  [10:38] datnt: * Vu Tat anh check giúp em PR này nha #[2994](https://trello.com/c/NsaqpxEl/2994-nomethoderror-in-ordersstatus): https:/
  [11:15] trinhmtt: Em update plan tuần này ạ  ThinhT: 20h DatNT: 32h ViTHT: 40h VuTQ: 8h => QC: 25h
  [11:15] trinhmtt: https://trello.com/c/bYEsZpLX/2943-fountain-infinity-upgrade-to-rails-8 Vu Tat có gì anh transfer card này cho Dat Nguye
  [11:27] vitht: e đọc qua cái này thử nha Dat Nguyen
  [11:27] vitht: https://claude.ai/code/artifact/409d1f2d-1956-4581-a52b-726920fde7a8
  [11:27] vitht: bữa Vũ có share cho c
  [11:28] vitht: bên fountain up lên rồi còn infinity làm đc một phần rồi á
  [11:28] vitht: bỏ dô con AI cho nó đọc xem mình làm tới phần nào gòi
  [11:28] datnt: dạ oki chị, nhưng mà mình có cần quyền truy cập gì khong á tại em vô nó không cho coi
  [11:28] datnt: image.png
  [11:29] vitht: e dô lại coi đc chưa
  [11:29] datnt: dạ đc rồi á chị
  [13:20] thinht: cho a xin ticket nha Trinh Mai
  [13:31] trinhmtt: https://trello.com/c/B7uPm1Pq#comment-6a6a0c5ee649b1c733d93281 anh Thinh Tran  check comment này nha anh, card này chị V [thread: 1 reply]
    └ [13:34] thinht: branch: infinity/2954-infinity-item-extras pk Vi Tran
  [13:34] vitht: Nó là cái blank page á
  [13:34] vitht: cc sắp xong cái này rồi để c làm lun cho
  [13:35] thinht: Trinh Mai: Vi nói vậy thấy sao e. a quay lại check rollbar típ hay sao
  [13:35] vitht: còn card này á
  [13:35] vitht: https://trello.com/c/oHJ5YO8y/2380-finding-solution-to-customers-receiving-incorrect-delivery-dates-in-the-delivery-tab-
  [13:43] trinhmtt: Thinh Tran: em mới assign 2 con bug cho anh á anh check nha [thread: 10 replies]
    └ [13:45] thinht: phải redmine bug card 2380 hok e?
    └ [13:45] thinht: mấy bug này cũng đang có trên Live pk Vi Tran
    └ [13:48] vitht: Dạ hông
    └ [13:49] vitht: chưa push lên live á a Thịnh
    └ [13:49] thinht: chà. thấy bug tận 5 tháng trước :S
    └ [13:49] vitht: mới đưa lên staging à mà nó k hiện cái modal á
    └ [13:49] thinht: fountain/2380_delivery_date_of_cart_item branch này pk e
    └ [13:49] vitht: a Thịnh đợi e tí
    └ [13:49] vitht: e qua e nói cái
    └ [13:49] thinht: okie e

### Maddy - Extreme Soft Solutions — 4 messages
  [09:33] duongdn: https://xtremesoftsolutions.slack.com/archives/D05Q1JZFQE6/p1785588429659419
  [09:33] duongdn: có msg nha Long Vo
  [09:34] longvv: ok a

### Marcel - XID — 31 messages
  [14:07] duongdn: em làm xong task chưa Long
  [14:07] duongdn: bên Marcel có issue cẩn check
  [14:08] longvv: e chưa, đợi em chút
  [14:09] duongdn: vậy thôi để a xem
  [14:19] longvv: Duong Doan: e xong bên OhCleo r á
  [14:19] longvv: * Duong Doan: e tạm xong bên OhCleo r á
  [16:27] duongdn: hi em tuần trước trong t4 e mở tracker marcel 4h nhưng sao e lại log training python 6h ?? Em trainig python trong lúc m
  [16:30] longvv: đúng r á a, mà e canh nó chụp r mới đổi qua training python
  [16:31] duongdn: ẹc ghê zị ...
  [16:31] longvv: e nhớ là ko có lệch screen đâu, cũng screen chụp toàn focus vào marcel th à
  [16:31] longvv: * e nhớ là ko có lệch screen đâu, screen chụp toàn focus vào marcel th à
  [18:18] duongdn: e kiểm tra lại lần nữa xem có screenshot nào sai ko nha
  [18:21] longvv: ok a
  [18:23] longvv: image.png
  [18:23] longvv: có cái này
  [18:23] longvv: dính screen element
  [18:23] longvv: a check xem cần xóa ko nha
  [18:24] duongdn: ok còn gì ko thì list hết ra ko thì báo done nha
  [18:24] longvv: image.png
  [18:25] duongdn: ko chỉ những cái ko liên quan project thôi
  [18:26] longvv: ok để e xóa mấy cái klq
  [18:28] longvv: ok rồi nha a ơi
  [18:28] longvv: a xóa mấy screen klq rồi
  [18:29] longvv: * e xóa mấy screen klq rồi
  [18:29] duongdn: a có nói e xoá đâu???0
  [18:29] duongdn: e đọc ở đâu ra info này vậy
  [18:31] duongdn: e hiểu sao mà chữ list ra thành xoá vậy?
  [18:33] longvv: khúc này e hiểu nhầm thành xóa
  [18:33] longvv: image.png
  [18:34] duongdn: a nhắc lại e CẤM ko được xoá screenshot nha a đã nói rất nhiều lần rồi làm việc tỉnh táo đi chả thể hiểu check và list t
  [18:41] longvv: Dạ e xin lỗi

### Những chú voi con đáng yêu — 5 messages
  [08:16] phucvt: * Tuan Ha là linkedin thật của ông Tuấn J2team hả fen? :))
  [08:18] longvv: Ông kia set bio là prompt AI, xong mấy ng chạy tuyển dụng bằng AI dính chưởng
  [08:19] phucvt: Chắc là thiệt, được phát hiện từ gần cả năm trước :D https://www.linkedin.com/posts/shekhar-meena-759601rsr_ai-security-
  [08:29] duongdn: à hiểu rồi, haha

### NUS - Bailey - Paturevision 2026 — 24 messages
  [08:40] tuannt: Anh Duong Doan cus có nói về aws a xem qua nhé anh:
  [08:40] tuannt: https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1785487301103039
  [08:42] duongdn: ok e
  [08:59] duongdn: uhm rồi nha
  [14:16] tuannt: Duong Doan: ổng có trả lời về cái msg sáng a viết cho ổng. a check thử nhé anh https://globalgrazingservices.slack.com/a
  [14:18] duongdn: Coi như cus đã ok, đưa cho Tuấn làm nha
  [14:22] datnc: Bác có hỏi time kìa a!
  [14:40] tuannt: khoảng ~4 - 6h. a Duong Doan  xem có ổn k anh?
  [14:44] duongdn: làm thì khoảng 2-3h thôi, test đi QC test tự est
  [14:45] duongdn: lúc trước cũng vậy xem xét xem nên dùng server nào
  [14:48] tuannt: vậy e trả lời lão là 3h nhé
  [14:51] duongdn: ko, chờ QC
  [14:51] tuannt: ok a
  [14:53] duongdn: Dat Nguyen:
  [14:55] datnc: Này cần test bên nào vậy mn? Hay cả Console & Pres? Với mình update version DB thôi ha?
  [15:01] duongdn: này e làm 1 lần rồi mà
  [15:01] duongdn: upgrade Console database
  [15:10] datnc: Chỉ là bên Console thôi ha a? E nhớ chết liền á chứ =.=... Để e coi nhan.
  [15:26] datnc: 20h đi mn! E nhớ như lần trc cũng cỡ này, nếu như test toàn bộ Console.
  [15:27] duongdn: coi lại task log xem đúng ko
  [15:28] duongdn: và Slack msg
  [15:28] duongdn: đừng dùng trí nhớ ...
  [15:47] datnc: Vậy từ nha a do e đang bận làm bên khác xí. Thật ra e est cỡ 16h cơ mà buffer thêm tí cho nó safe thì cỡ 20 á.
  [15:58] duongdn: chứ coi cho kĩ nha

### Recruitment — 4 messages
  [09:15] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: - Business Development Assistant
  [17:45] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Apply Business Development Assistant (Fresher/Intern): 60 CV trong
  [17:55] chientx: 
  [17:55] chientx: * > Business Development Assistant (Fresher/Intern): 60 CV trong đó mới lọc được 8 CV: 3 CV đã gửi anh Chiến review 1 CV
