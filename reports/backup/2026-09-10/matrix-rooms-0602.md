# Matrix — since 2026-09-09 08:00 +07:00

### !OIrgPraJWrcDTnRVLQ:nustechnology.com — 1 message
  [09:40] duongdn: Hi LeNH, task log cho ngày 07/09 và 08/09 hiện đang 0h trên Workstream (tất cả project, bao gồm James Diamond). Em kiểm 

### Celine - OhCleo — 243 messages
  [08:25] luhx: ủa mobile chưa build mà ném cho khách rồi à.
  [08:34] minhtv: Build đi Lữ, mấy cái tồn đọng nay xử lý tiếp
  [08:34] hungpn: vậy build 1 bản live trước còn issue fix sau hả Minh Trinh
  [08:35] hungpn: còn cái này lên live luôn đi Long Vo
  [08:35] longvv: len het r nha a
  [08:35] hungpn: hok thấy báo😔
  [08:35] longvv: uar
  [08:35] longvv: :|
  [08:47] hungpn: 🫣 lúc anh ở lại đợi em hok deploy, anh về hok  onl cái deploy. khó dữ dzi 😔
  [08:49] luhx: Có bản build mới Prod nha mn. Hung Pham Phuong Pham  Minh Trinh  iOS: TF  Android: Internal testing apk: https://drive.g [thread: 17 replies]
    └ [09:46] hungpn: Lu Ho: ơi
    └ [09:46] hungpn: Android: Internal testing --- hình như chưa có add tài khoản google emma040296@gmail.com vào môi trư
    └ [09:47] luhx: Minh Trinh: support a Hùng vụ này với.
    └ [09:51] luhx: ủa em thấy có add vào rồi mà nhỉ a Hung Pham
    └ [09:53] hungpn: có add rồi hả, nãy giờ nó k lên nhỉ? để anh check lại device xíu
    └ [10:17] hungpn: Payment đc ui nha nhưng có bug này sau khi anh cancel payment plan cũ
    └ [10:18] luhx: bug gì a? video gì ngắn khúc vậy
    └ [10:19] hungpn: đợi anh cập nhật lại, s nó bị căt hay vậy ta
    └ [10:26] hungpn: screen-20260909-101543-1788923724979_101647.mp4
    └ [10:27] luhx: thì lỗi bữa a có báo rồi mà nhỉ? liên quan đến việc cancel subs mà không update lên apple/gg thôi á 
    └ [10:28] luhx: cái này làm sau á. xong cái chats trước đi.
    └ [10:28] luhx: issue chắc từ trước rồi.
    └ [10:28] hungpn: uhm, sẵn tiện noted lại đó nè
    └ [10:29] luhx: chắc phải tạo ticket mấy cái liên quan đến subs lại quá Phuong Pham
    └ [10:35] phuongpvt: a Lu Ho tóm tắt lại các vấn đề về sub giúp e với
    └ [10:35] luhx: a Hung Pham
    └ [10:50] hungpn: đợi anh loading xíu nha
  [09:18] hungpn: anh Duong Doan Minh Trinh check dum em cái sao live nó quay vòng vòng rồi
  [09:18] hungpn: 🫣
  [09:19] duongdn: đã fix gì đâu mà ko quay :))
  [09:20] namtv: ủa, là live lại chết? Sao vậy? Bữa có fix cái query đỡ rồi mà?
  [09:21] namtv: Issue gì khác nữa hả? ☹️
  [09:22] minhtv: Bữa là vào home chết queo, bữa nay vào home được, mà đi vào track details thì quay forever
  [09:24] minhtv: Khác a ơi, trước mình quay nó ở hơi chậm, sau khi lần trước fix cái query. Lần này nó quay mãi, hẳn là 1 issues khác , c
  [09:25] duongdn: Này có trong phần review performance rồi á
  [09:25] duongdn: thực ra a cũng có làm rồi
  [09:25] duongdn: vấn đề là giờ cần migrate db live -> staging, merge các PR performance, test, đảm bảo chạy đúng hết , go live
  [09:26] minhtv: https://trello.com/c/faTpezrA/231-migrate-live-data-to-staging task này đây a ơi, trước mắt làm quá 3h thì phải xin phép
  [09:27] duongdn: Long Vo:  múc em
  [09:27] longvv: Ok a
  [09:29] duongdn: Theo như Newrelic thì phần hôm nay liên quan tới phần search creator A đã fix nó ở đây https://github.com/nustechnology/
  [09:29] duongdn: e tiến hành các bước trên để realease internal nó nha
  [09:31] namtv: Bữa home cũng ko phải vấn đề, mà do trong track hay gì đó query nặng làm DB overload nên kéo theo cả app chết. Này chưa 
  [09:34] duongdn: Long Vo:  Cần thận phần migrate data, ít nhất là + Hide các info nhạy cảm, tệ nhất là email + Coi lại payment, có gì đan
  [09:34] longvv: oke a
  [09:34] duongdn: * Long Vo: Cần thận phần migrate data, ít nhất là - Hide các info nhạy cảm, tệ nhất là email, nếu ko có action gì ví dụ 
  [09:45] duongdn: Còn mấy task performance bữa review, chỉ nghe bã approve thôi, còn có ticket liên quan chưa nhỉ, chưa thì tạo luôn hen
  [09:45] minhtv: Phương check lại xem bả approved thế nào rồi tạo ticket nhé [thread: 8 replies]
    └ [09:51] phuongpvt: dạ bữa bả nói là bả k hiểu mấy cái mình gửi, nhưng mà nếu critical thì phải fix
    └ [09:51] minhtv: uhm, trong task nên mô tả thêm tác dụng của nó
    └ [09:52] phuongpvt: em thấy có chia thành 4 cái, mình có phân ticket như vậy ko a Minh Trinh
    └ [09:57] minhtv: cụ thể bên trong ra sao nhỉ ?
    └ [09:58] phuongpvt: image.png
    └ [09:59] phuongpvt: hiện đang trình bày theo dạng problem là gì
    └ [10:03] duongdn: cái đầu là cái gây ra performance issue hôm nay á
    └ [11:39] phuongpvt: a Minh Trinh ơi giờ mình chia ticket thành 4 vấn đề này luôn hay sao ạ
  [09:48] duongdn: Nên tách nhỏ ra dễ release nha, tách thế nào thì nc với dev
  [09:49] duongdn: * Nên tách nhỏ ra dễ release nha, đừng bỏ 1 cục tên improve performance, tách thế nào thì nc với dev
  [09:59] phuongpvt: 
  [10:10] hungpn: * rule này em apply như bên hình Long gửi đúng k Lu Ho ơi
  [10:18] hungpn: 
  [10:33] hungpn: nhưng mà giờ sv vẫn đang quay vòng vòng có cách nào cho nó hết quay vòng vòng  trước k anh
  [10:33] luhx: hình như sv treo rồi á, mở app không call API nào dc cả.
  [10:34] hungpn: thấy trả về Server returned non-JSON response(524)
  [10:36] hungpn: trên live cũng k thấy cái track ""Don't Stop" để gắn con chat vào nè Minh Trinh Phuong Pham
  [10:37] phuongpvt: dont stop là series, a Hung Pham check lại thử có k [thread: 15 replies]
    └ [10:43] hungpn: Lu Ho Long Vo : check lại dùm anh ý này - Card 1 AI Companion: add flags/APIs to display AI Companio
    └ [10:43] hungpn: aanh mới chỉ thấy ở homepage
    └ [10:49] phuongpvt: image.png
    └ [10:53] luhx: cái đó thì hỏi bên Long nha, bữa em test ở staging cũng nhờ Phúc set 1 profile để nó hiển thị dc á.
    └ [10:58] hungpn: uu tiên dùm anh cái này trước đi Long Vo chắc lẹ
    └ [11:26] hungpn: nhớ cái này nha @long
    └ [11:27] longvv: ok
    └ [11:28] longvv: e đang gắn cho profile của bả với mấy track don't sotp nha
    └ [11:34] longvv: r á
    └ [11:35] longvv: Hung Pham: a check thử
    └ [11:36] hungpn: Don't Stop" series chưa có em
    └ [11:37] longvv: ủa, e config lộn :)), để update lại
    └ [11:43] longvv: laij nha a Hung Pham
    └ [11:48] hungpn: để anh check lại
    └ [11:51] hungpn: đã có nha Long Vo
  [10:54] longvv: * là a đang rep câu nào á?
  [11:08] longvv: có a nào đang test ở staging ko á
  [11:08] longvv: e cb đổi qua db live nè
  [11:18] hungpn: staging anh đang check con chat AI chắc k đụng gì tới em
  [11:19] longvv: có ảnh hưởng á
  [11:19] longvv: z chắc a xong đi r hú e
  [11:19] hungpn: anh còn vụ confirm cái ý chat content-ban thôi
  [11:20] phuongpvt: * a Lu Ho ơi mới discuss với a Long Vo lại best practice là khi nhắn message có content ban thì hiển thị 1 pop up nha an
  [11:22] hungpn: em làm cái này đi chiều anh quay lại sau
  [11:27] hungpn: * nhớ cái này nha Long Vo chứ k có bả vào check lại k thấy la làng nữa
  [11:28] longvv: * e đang gắn cho profile của bả với mấy track don't stop nha
  [11:52] hungpn: Chat AI đã có trên bản TF nha Minh Trinh , riêng cái card-3 thì đang còn chút vấn đề đang fix nên có thể cho bả xem tính
  [11:54] minhtv: Bug gì á , bao lâu xong ?
  [11:54] minhtv: Hẳn là bị lố estimate 🥶
  [11:54] hungpn: chắc fai lố nh
  [11:55] luhx: lố là phải lố rồi lúc đầu chỉ làm chats AI đơn giản xong sau này có thêm mớ thứ khác, lúc đầu không phải việc mobile mà 
  [11:58] longvv: Migrate db live qua staging xong r nha mn
  [11:59] minhtv: Không thấy kéo task gì Long ơi
  [11:59] minhtv: https://trello.com/c/JzUAgEeq/233-check-transcription-plan-limits-why-some-audios-are-getting-shortened Xong chuyển qua 
  [12:00] minhtv: Bữa nay làm từ trên đầu đi xuống , bữa bả kêu đổi rules làm top -down
  [12:00] hungpn: card-1, card-2 kéo rồi á. Cái card-3 đợi fix bug xong build bản mới rồi kéo chứ Minh Trinh [thread: 1 reply]
    └ [12:00] minhtv: uhm 👍️
  [14:47] hungpn: * check dum anh cái này xíu Long Vo - emma.test41 account này thì đang là pro trên web nhưng lại free trên app?
  [14:56] hungpn: cái này cần gấp k Minh Trinh Phuong Pham Duong Doan
  [14:56] hungpn: * cái này cần test gấp k Minh Trinh Phuong Pham Duong Doan
  [14:57] minhtv: Khách ko quan tâm cái này , phía mình có cái để tái tạo nhưng case quan trọng là được
  [14:58] hungpn: vậy nay anh chốt cái chat AI xong mai qua check cái này
  [14:58] hungpn: * emma.test42/123123123
  [15:01] hungpn: * rồi đã có build 2
  [15:03] hungpn: đã move hết task chat AI nha Minh Trinh
  [15:03] minhtv: báo khách nha Phương, bả hóng
  [15:07] phuongpvt: dạ
  [15:09] phuongpvt: a Long Vo ơi hiện k có task nào ở in progress
  [15:09] phuongpvt: bả mới hỏi mình có work hôm nay k
  [15:09] longvv: a đang check cái https://trello.com/c/vqHFYzMf/229-ai-assisted-tag-taxonomy-review-full-library-re-tagging => trả lời mấ
  [15:09] minhtv: Nói có, mình mới test xong mớ AI , kêu bả test thử [thread: 1 reply]
    └ [15:10] phuongpvt: dạ rồi á
  [15:10] phuongpvt: Just let me know how you plan the week so I know
  [15:11] phuongpvt: a Minh Trinh plan như thế nào á anh, tại t2 mình báo work nửa ngày, chắc bả muốn rõ cụ thể mình sắp xếp ntn
  [15:11] minhtv: Kêu 1 chút flexible đi , có thể mai ko làm , T6 làm
  [15:12] phuongpvt: a Long Vo ơi bả hỏi sao mình k change được orientation với voice trong khi mấy cái khác vẫn change được
  [15:13] phuongpvt: với nếu bả muốn thay đổi thì phải làm thế nào, nếu làm thì tốn bao nhiêu effort
  [15:19] longvv: Trước đó nó vốn đã k cho change r, giờ muốn change dc thì mình implement thêm cho bả, cỡ 1h á
  [15:35] phuongpvt: https://trello.com/c/eu2XJqc3/235-flagged-word-system https://trello.com/c/EJ2yxf9g/234-links-in-the-transcriptions dạ a
  [16:09] longvv: a reply r nha
  [16:55] phuongpvt: https://trello.com/c/ZHGuIj4l/237-enable-edit-voice-and-orientation-in-the-track-page a Long Vo có thể start làm task nà
  [16:59] longvv: Minh Trinh: bên này e làm cỡ 17h rùi, làm típ thì t6 mình làm dư có sao ko a
  [17:03] minhtv: cứ làm full T6, với còn để review giờ charge nữa

### Delivery - Resource Arrangement — 6 messages
  [08:53] namtv: NEW	NghiepNQ		09/09/2026	Lí do cá nhân ==> Bên Michael Koh dùng PL. Anh đã update note
  [08:54] namtv: NEW	VuTQ	Sáng	09/09/2026	Đi bệnh viện có việc ==> Tính bên Bailey ko bù. Anh đã update note
  [08:55] namtv: NEW	AnhNH2		24/09 - 25/09/2026	Về quê giỗ ông ==> Hà note plan sau nha
  [14:34] namtv: NEW	KhanhPQ		14/09 - 18/09/2026	Nằm viện điều trị ==> Hà note plan sau nha
  [17:27] halt: Hi a Năm, a Chiến Em đã check note trong Master List: 1/ Web plan: Note trong Master list đã đúng và đủ theo plan đầu tu
  [17:28] halt: Hi mn, Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note, còn các case chưa xử lý. MN check và confirm 

### Elena - Active Alerts — 211 messages
  [08:48] samht: ủa Kiet Nguyen , cái maximum date range của mình dựa trên field nào của BE dc nhỉ? phải cái date cuối cùng của type 2 k?
  [08:48] kietnht: là cái nào trên UI vậy
  [08:49] samht: 
  [08:49] samht: * cái này nè, range của nó đang trong khoảng tháng 6 Nhưng trong "open" có 1 date ở tháng 8 Cái range ở dưới cái chart n
  [08:49] samht: 
  [08:51] samht: Screenshot 2026-09-09 at 08.51.32.png
  [08:52] samht: cái range dưới cùng nó ~ 26/6 đó thấy k Trong cái type 2, nó còn 1 date ở tháng 8, nên t phải dựa trên 1 dữ kiện để kéo 
  [08:53] samht: Kiet Nguyen: trong response có field nào để t xài k, hay t canh cái range = ngày cuối cùng trong mảng "open"?
  [08:55] kietnht: để tạo lại cho nó match với cái range. còn kéo dài range hay ko thì tùy vô logic chỗ đó coi nó work sao chứ ko có chế đạ
  [08:56] kietnht: cỡ giữa tháng 5 là đc đúng ko
  [08:56] samht: đúng r
  [09:01] kietnht: rồi nha
  [09:51] kietnht: image.png
  [09:52] kietnht: Tri Nguyen:  cái event-history add rồi nha, trước khi e làm check giúp a thử chỗ này sao nó ko work á [thread: 3 replies]
    └ [10:17] trinm: Hình như mấy cái previous anh tạo mất hết rồi Kiet Nguyen
    └ [10:18] kietnht: đợi tí, để a tạo lại, mới xóa
    └ [10:20] kietnht: rồi nha
  [09:52] trinm: ok anh [thread: 12 replies]
    └ [10:01] trinm: hình như data bị thiếu cái cause thì phải
    └ [10:02] trinm: mà cái code cũ hông handle cái case thiếu cái cause này nên nó lỗi không biết có fix không nhỉ Anh T
    └ [10:43] anhttl: em chưa hiểu Tri Nguyen anh nói là handle chỗ nào á
    └ [10:44] anhttl: cái cause là required mà ta, nếu send từ FE thì khắc ko thể thiếu được. chắc cho anh Kiệt tạo thiếu 
    └ [10:44] anhttl: Kiet Nguyen:
    └ [10:44] trinm: Screenshot 2026-09-09 at 10.44.27.png
    └ [10:44] trinm: chỗ này nè
    └ [10:44] trinm: do nó thiếu info cause nên show data bị lỗi
    └ [10:44] anhttl: ok cái flow finish thì cause type là required á
    └ [10:44] kietnht: ừa, cái này tạo tay nên miss
    └ [10:45] kietnht: để có time a coi, cause này chưa cần bên occurrences đúng ko
    └ [11:21] anhttl: dạ ko cần á
  [10:29] kietnht: hú Anh Trinh a nhớ app có chỗ coi lại mấy cái closed alert, e nhớ nó nằm đâu ko
  [10:29] anhttl: anh vô Dashboard, chọn cái chart chỗ Time to Close á
  [10:40] trinm: Kiet Nguyen: coi giúp em cái /investigation/event-history params size có thể lấy max là bao nhiêu item ấy anh
  [10:42] kietnht: ý là e muốn lấy full trong 1 request luôn hả
  [10:43] trinm: không anh chỉ muốn biết là 1 lần nó lấy được bao nhiều item tối đa thôi
  [10:44] anhttl: * cái cause là required mà ta, nếu send từ FE thì chắc ko thể thiếu được. chắc cho anh Kiệt tạo thiếu á
  [10:47] kietnht: ko có limit page size
  [10:47] kietnht: nhưng nó chỉ lấy data trong vòng 90 ngày thôi
  [10:48] trinm: vậy cái response {total: ...} của nó cũng tuân thủ vụ 90 ngày này hả anh [thread: 2 replies]
    └ [10:52] trinm: cho em hỏi thêm phát là cái  similarInvestigations.closed = bằng cái total trong API /event-history 
    └ [11:05] kietnht: nếu inevstigation đó đang open thì nó equal nha
  [10:49] kietnht: uhm
  [10:50] trinm: với lại API thiết kế chỉ lấy 90 ngày thôi thì đủ yêu cầu cho cái occurrences-layer này chưa nhỉ  cc Anh Trinh
  [10:53] trinm: * cho em hỏi thêm phát là cái  similarInvestigations.closed có phải bằng cái total trong API /event-history không anh
  [10:57] kietnht: hình như con số đó admin configure được
  [10:58] trinm: Screenshot 2026-09-09 at 10.58.40.png
  [10:58] trinm: chắc chỗ này quá
  [10:59] anhttl: đủng rùi á
  [11:00] trinm: vậy chắc cứ tuân thủ config chỗ đó thôi nhỉ
  [11:21] anhttl: dạ đúng rồi
  [11:21] anhttl: * cái cause là required mà ta, nếu send từ FE thì chắc ko thể thiếu được. chắc do anh Kiệt tạo thiếu á
  [11:23] anhttl: Tri Nguyen, Sam Ha: bên họ cũng nhạy cảm vấn đề duplicate API calls nên mn cẩn thận nhen [thread: 2 replies]
    └ [11:24] trinm: API trên có phân trang để lấy đủ phải call lại nhiều lần rồi đó
    └ [11:47] anhttl: cái nào mà hợp lý, buộc phải call lại thì ok. tránh lỗi như đợt làm DP á, bị updilate /getbyid quá t
  [11:24] anhttl: anh Kiet Nguyen ơi, bữa trước vụ confirm lại dataDate gì đó, là cái đó xong chưa, còn vấn đề gì đang open chưa rep ko  a
  [11:43] kietnht: xong rồi e, transfer cho Trí vs Sâm rồi á
  [11:44] kietnht: API docs chưa update gì hết nha
  [11:44] kietnht: nội bộ vs nhau thôi
  [11:45] anhttl: update api doc luôn được ko anh, nếu nhanh. cái đó mốt QC test cũng phải đọc từ API ra chứ ko thì cũng ko biết đúng sai 
  [11:51] kietnht: Anh Trinh:
  [11:51] kietnht: image.png
  [11:52] kietnht: cái docs của họ chỉ là example response như này thôi
  [11:52] kietnht: ví dụ, e nhìn vào hiểu occurrence sao ko
  [11:52] anhttl: hông, ý em là update cái doc hướng dẫn integrate cho FE đó
  [11:52] kietnht: giờ viết lại viết sao đây 🤔
  [11:53] kietnht: ý e là viết cho bên mình đúng ko
  [11:53] anhttl: chính là cái mà bữa giờ anh Đông viết ấy
  [11:54] anhttl: dét dét :v
  [11:54] kietnht: ok để a update
  [12:59] kietnht: Occurences API guide.md
  [13:00] kietnht: Duy Vo: khi test nhớ đọc để nắm context
  [13:00] kietnht: * a Duy Vo: khi test nhớ đọc để nắm context
  [13:37] vytth: Tuan Nguyen: có mấy chỗ thấy còn trống, là ko/chưa có effort bên BE hay là chưa define á anh. A điền rõ giusp e với, chỗ
  [13:37] vytth: * Tuan Nguyen: có mấy chỗ thấy còn trống, là ko/chưa có effort bên BE hay là chưa define á anh. A điền rõ giusp e với, c
  [13:38] vytth: * Tuan Nguyen: có mấy chỗ thấy còn trống, là ko/chưa có effort bên BE hay là chưa define á anh. A điền rõ giusp e với, c
  [13:38] vytth: * Tuan Nguyen: có mấy chỗ thấy còn trống, là ko/chưa có effort bên BE hay là chưa define á anh. A điền rõ giusp e với,  
  [13:41] tuanntg: a điền rõ hết mức rồi e ơi
  [13:42] tuanntg: phần nào BE làm thì điền, không làm để tróng, điền vào gây rối mắt hơn
  [13:43] vytth: vậy có gì a nói lại là chỗ trống ko điền nha, do bên FE để 0.0 mà bên BE để khác thì nhìn chỗ trống bị confused ne
  [13:53] kietnht: Anh Trinh:  chỗ ông Kfir a hơi confuse nha, ý là view ổng David chỉ thêm cái API thôi, còn transfer lại này kia là tự te
  [13:54] anhttl: ổng nói ở đâu ấy anh
  [13:55] kietnht: qua nay trên channel e
  [14:50] kietnht: Anh Trinh: chỗ est tiếp OP - M1 extended ý e là giờ est phần bên op, op run luôn phải hog
  [14:54] anhttl: dạ
  [14:54] anhttl: Tuan Nguyen: anh ơi, dòng 30 View License History sao lại ko có effort cho BE á anh
  [14:55] tuanntg: Nó là cái gì? a không aware, thấy Vy nó note bên phải nó kiểu như mấy data của license ở mấy phần trên thôi.
  [14:56] tuanntg: overall cái phần view a chỉ handle 1 cái API trả về data cho Monitor với OP là đủ rồi
  [14:57] anhttl: nó là lịch sử upload license ấy, app cũ có rồi, giờ thêm OP license thì sẽ lưu history cho nó, cái này ko cần sửa BE gì 
  [14:58] tuanntg: nó nằm đâu UI ấy e
  [15:00] tuanntg: à a thấy rồi
  [15:01] tuanntg: CHỗ này e có UI mới nó hoopng Anh Trinh
  [15:01] tuanntg: Vì theo Req thì mình có 3 type license á
  [15:01] tuanntg: Mỗi Monitor, mỗi OP, hoặc gồm cả 2
  [15:02] tuanntg: a nghĩ nên thêm vài column vô cái bảng á
  [15:02] anhttl: image.png
  [15:02] anhttl: UI mới nè anh
  [15:03] tuanntg: License Type, OP Credit, OP Model Capacity  thêm 3 cột này vô bảng nữa
  [15:04] tuanntg: Ok a hiểu rồi, để a update est chỗ này
  [15:06] tuanntg: rồi nha e
  [15:12] anhttl: dòng 27 View Monitoring License usage, em thấy app cũ có lưu hết rồi, ở đây chỉ cần làm thêm FE để tính oán số % với trừ
  [15:12] anhttl: UI cũ:
  [15:12] anhttl: image.png
  [15:12] anhttl: UI mới:
  [15:12] anhttl: image.png
  [15:13] anhttl: * dòng 27 View Monitoring License usage, em thấy app cũ có lưu hết rồi, ở đây chỉ cần làm thêm FE để tính toán số % với 
  [15:14] tuanntg: Về cơ bản thì mình sẽ thiết kế lại cấu trúc response của cái API này nó sẽ trả về cả data của Monitor và Op , nên giờ đó
  [15:15] anhttl: chỗ history, anh Sâm có note asumption như này: Assumes BE extends /license/history per entry --> có giống với cách anh 
  [15:15] anhttl: giờ đó anh confirm là ko overlap với dòng 28 đúng ko
  [15:17] tuanntg: ừm e
  [15:17] tuanntg: a không hiểu lắm :v
  [15:18] kietnht: nguyên cái đó, cộng lại là khoảng 6h cho phần View Configuration > General page
  [15:18] kietnht: đúng ko Tuan Nguyen
  [15:19] tuanntg: Dạ a
  [15:20] anhttl: lộn, dòng 27 :v
  [15:20] kietnht: uhm, thấy cũng hợp lý, ý là a thấy để trên cái mục lớn á, chia nhỏ nhỏ ra làm confuse.
  [15:21] anhttl: Dạ, em confirm để gom vô cục bự á
  [15:31] anhttl: Dòng 64 em ko hiểu , chỗ carry-over FE: No design, and existing search is tag/alert search, not module search. Assumed t
  [15:33] kietnht: nhìn như AI viết
  [15:33] tuanntg: chả hiểu mô tê gì :v
  [15:35] anhnvn: Nghĩa đen ko rõ context thì: assume dùng lại template (template gì ko biết), nếu real (ý là nếu assumption đúng), +2.5 đ
  [15:35] anhnvn: Như trên thì ghép vào cái team mình đang đọc có makes sense ko?
  [15:39] anhttl: Chỗ đó BE làm gì ta, tại nhưu FE viết thì đâu có tính năng search module
  [15:39] tuanntg: Hide unlicensed modules
  [15:39] tuanntg: đây e
  [15:40] tuanntg: Make sure no license thì sẽ khônng gọi được API, module, search, ...
  [15:41] tuanntg: Ý là sẽ có handle 1 lớp ở dưới BE để check vụ auth và license mỗi khi có 1 call xuống ấy e
  [15:42] tuanntg: Nó sẽ là line 51, 61 và 63 á
  [15:44] tuanntg: Còn live 65 thì FE phải check license hiện tại của user để quyết định có cho user nó vào url đó không, nó là bước bảo vệ
  [15:53] tuanntg: Cái chỗ search results nó kiểu là overall toàn app chứ không phải cụ thể 1 tính năng ấy e
  [15:53] tuanntg: Kiểu giống như mà user nó chỉ có OP license mà nó lại gọi API search alert chẳng hạn, hoặc ngược lại
  [15:53] tuanntg: THì mình phải chặn nó á
  [16:03] anhttl: Vậy chỗ này nói rộng hơn là restrict access tính năng theo license phải ko anh
  [16:03] anhttl: chứ nếu điền effort vô cái dòng search result thì nó ko đúng nữa
  [16:04] tuanntg: Ừm về phía BÉ là e hiểu đúng r đó
  [16:04] anhttl: dòng đó chỉ có nghĩa là ko trả cái tên module Optimization qua search result thôi
  [16:04] tuanntg: * Ừm về phía BE là e hiểu đúng r đó
  [16:04] anhttl: mà cái đó thì mình còn ko có tính năng đó nữa
  [16:29] vytth: https://docs.google.com/spreadsheets/d/1xQ_KbUzQdEp0mXpofRNQ6XUj1CfQPsyJjZJygRPYMbI/edit?pli=1&gid=1445548612#gid=144554
  [16:29] vytth: tab này chị sửa rồi
  [16:29] vytth: 
  [16:30] anhttl: Kiet Nguyen, Sam Ha 2 anh ơi, review lại phát nữa giúp em với, để đóng gói gửi họ ạ
  [16:31] vytth: * tab này e sửa rồi, mng check lại nha
  [16:32] anhttl: Prepare test environment for client Prepare test environment for internal team --> 2 dòng này chưa cần hẻ anh Kiệt
  [16:38] trinm: hú anh Kiet Nguyen sai cái dataDate của 3 cái previous alerts của 4778 nó không đúng lắm thì phải [thread: 21 replies]
    └ [16:38] trinm: Screenshot 2026-09-09 at 16.38.49.png
    └ [16:39] trinm: time này nó ngoài cái chart rồi và còn lớn hơn current nữa
    └ [16:40] kietnht: ý lớn hơn current là sao á
    └ [16:41] trinm: là cái type 2 ấy anh nó nằm trong tháng 6 mà cái type 1 và 3 thì đang làm tháng 9
    └ [16:42] kietnht: giờ tạo lại nó nằm trong khoảng giữa tháng 4 đc ko á
    └ [16:43] trinm: ok được nha anh
    └ [16:44] kietnht: ok đợi tí, 10 mins
    └ [16:48] trinm: à mấy cái similarInvestigations.open của mấy thằng đó cũng cần đúng theo nha anh em thấy mấy cái đó 
    └ [16:49] kietnht: uhm, update hết veef April luôn e
    └ [17:01] kietnht: quên nữa, e update lại configure cái ngày thử
    └ [17:01] trinm: config nào anh
    └ [17:01] kietnht: nếu update thành tháng 4 nó sẽ ko show nha, do out cái range 90 ngày rồi
    └ [17:01] kietnht: giờ tháng 9, nó chỉ find tới tháng 6 thôi
    └ [17:03] trinm: cái em chưa rõ quy tắc nữa
    └ [17:03] kietnht: image.png
    └ [17:03] kietnht: đây e
    └ [17:04] kietnht: update thành 180 days thử nha, a thêm data rồi
    └ [17:06] trinm: chỉnh lên 180 thấy ra khá nhiều previous 😅
    └ [17:08] kietnht: image.png
    └ [17:08] kietnht: thấy có 4 cái thôi, đủ dùng chưa :v
    └ [17:10] trinm: đủ rồi nha anh
  [16:38] kietnht: a thấy có 1 row prepare env 4h rồi
  [16:38] anhttl: dạ oki vậy em xóa 2 dòng đó nha
  [16:39] anhttl: cái này nhớ đừng quên coi tổng mang mấy dòng testing, fix bug đồ nha
  [16:39] anhttl: * cái này nhớ đừng quên coi tổng quanmấy dòng testing, fix bug đồ nha
  [16:42] anhttl: xong thì báo lên room nha 2 anh
  [16:47] kietnht: Tuan Nguyen: e check lại xem nha, time e điền là time dev done nhỉ, ví dụ integrate vs FE rồi fix bug nếu có, chắc cộng 
  [16:47] tuanntg: Dạ dev done thôi a
  [16:48] anhttl: ý anh Kiệt là tăng % chỗ fix bug, testing lên hả
  [16:48] anhttl: tăng lên bao nhiêu h thì được
  [16:48] samht: Screenshot 2026-09-09 at 16.48.31.png
  [16:48] kietnht: image.png
  [16:48] samht: mấy dòng k có estimate là k làm, hay đã include v Anh Trinh
  [16:48] kietnht: a thấy rồi, hơi ít
  [16:50] anhttl: ủa chỗ đó hình như là chị Vy copy bị mất công thức rồi...
  [16:58] anhttl: ko để est tức là est đã bao gồm ở thằng cha của nó nha anh
  [17:00] samht: anh review và update lại r nha Anh Trinh
  [17:01] vytth: ủa mà h a Kiet Nguyen cần công thức ko hay a đang input thẳng số hard-coded vô rồi :v
  [17:02] anhttl: chỉnh công thức nhanh lắm mn
  [17:02] kietnht: ko công thức cũng đc, a thấy tầm 2h cho integrate, 4-6h fix bug này kia
  [17:04] kietnht: mà CT ntn á, apply vào thì ra bao nhiêu giờ
  [17:07] anhttl: anh check lại phát
  [17:10] kietnht: image.png
  [17:10] kietnht: row 47, cái này sao lại có giờ BE á
  [17:12] anhttl: Giờ testing này là giờ dev BE self test ấy
  [17:13] anhttl: cái này xưa giờ vậy ùi mờ
  [17:13] kietnht: uhm, ko để ý :v mà ý là dev done => tức là self test rồi.  row 46, 47 a thấy hơi trùng cái effort
  [17:14] anhttl: 46 là để fix bug 47 là để self test
  [17:14] anhttl: anh thấy cao quá thì có thể thử giảm cái % nhân lại á
  [17:15] anhttl: nãy nhỏ quá nên em có thử tăng lên
  [17:15] kietnht: 10%
  [17:16] anhttl: anh update vô sheet luôn i
  [17:16] kietnht: * updated thanhf 10%
  [17:17] kietnht: sorry :v
  [17:18] anhttl: mấy giờ phụ thì em thấy ok rồi, mấy giờ implement ok chưa mn
  [17:19] kietnht: 
  [17:19] kietnht: a thấy ok

### Kunal - Fountain — 91 messages
  [11:28] hungpn: 2 cái này chưa update status á Dat Nguyen
  [11:29] hungpn: https://trello.com/c/yrbbFhf9/2735-fountain-pro-send-smart-link -- update chưa Vi Tran ơi
  [11:30] datnt: 
  [11:31] datnt: em đang chờ lên LIVE á anh
  [11:31] vitht: chưa a
  [11:31] vitht: ổng mới rep mà a
  [11:43] hungpn: * hok fai em updatre hết hả
  [13:23] thinht: có task nào gấp k Trinh Mai hay a tiếp tục vs rollbar [thread: 13 replies]
    └ [13:25] hungpn: issue liên quan task 3035 xong chưa á m
    └ [13:27] thinht: issue j đấy
    └ [13:27] hungpn: redmine
    └ [13:31] thinht: okie
    └ [15:20] hungpn: image.png
    └ [15:21] hungpn: Thinh Tran: sao search Non-Alcoholic mà vẫn ra có nhỉ?
    └ [15:34] hungpn: Thinh Tran: có chỗ nào có thể tra được 1 band có bao nhiu items k nhỉ?
    └ [15:35] thinht: category hã?
    └ [15:35] hungpn: brand?
    └ [15:36] thinht: là j vại
    └ [15:37] hungpn: image.png
    └ [16:19] thinht: Test lại 2 bugs redmine nhan Hung Pham
    └ [16:20] hungpn: okie để check
  [13:24] trinhmtt: rollbar nha anh oi
  [13:25] trinhmtt: https://trello.com/c/bZeOHilO/3026-fountain-build-a-box-add-box-summary-empty-state-and-info-modal#comment-6aa0e4ae79112 [thread: 1 reply]
    └ [13:27] phatdlt: a đang verify bug chắc nay xong card này
  [13:33] datnt: * em đang check xem page nào trong admin có up ảnh là bị hết á anh, rồi em update hết luôn 1 lần
  [14:26] datnt: * - https://staging.fountaingifts.com/admin/pro\_orders cái này thì không có field req nên không sao nha anh Còn mấy cái
  [14:26] datnt: * Hung Pham có gì anh test lại giúp em nha
  [14:56] datnt: Vu Tat anh ơi anh check giúp em PR này nha #[3082](https://trello.com/c/SfOpohA8/3082-reminder-emails-being-sent-after-g [thread: 2 replies]
    └ [15:04] vutq: làm tương tự cho bên Infinity luôn em
    └ [15:21] datnt: Vu Tat PR cho been Infinity đây nha anh https://github.com/iamksheth/FountainGreetings/pull/482
  [15:34] hungpn: * Thinh Tran: có chỗ nào có thể tra được 1 brand có bao nhiu items k nhỉ?
  [16:06] phatdlt: https://redmine.nustechnology.com/issues/80867 bữa giờ có ai làm bên pro order fountain k mọi người ơi, bị crash app r.  [thread: 3 replies]
    └ [16:11] datnt: em đang dính bug task khác roi nha anh
    └ [16:12] phatdlt: ok nè e
    └ [16:14] vitht: chắc có ai đang deploy đó
  [16:12] hungpn: https://trello.com/c/SfOpohA8/3082-reminder-emails-being-sent-after-giftdrop-was-claimed -- card này sao á m.n [thread: 6 replies]
    └ [16:12] datnt: cái này em fix rồi á mà em chưa biết là làm sao để QC test được á
    └ [16:13] datnt: nó là 1 cái order giftdrop đã fill address vô rồi mà vẫn gửi đi reminder email cho recipient đó á
    └ [16:13] trinhmtt: này khỏi test luon cho golive thẳng i Dat Nguyen
    └ [16:14] datnt: em request roi á chị
    └ [16:14] datnt: là cái #3082 bên trên á
    └ [16:16] datnt: Hung Pham với có 1 số card bug mà em kéo qua để dưới cuối cột QC á cái đó cũng khong có test tay đc 
  [16:14] vitht: Mốt mn deploy nhớ báo lên group nha. QC đang test die QC nghĩ crash app á
  [16:50] phatdlt: https://trello.com/c/gnw4qAwO/3023-infinity-update-preview-giftdrop-button-with-new-recipient-flow https://trello.com/c/
  [16:52] datnt: Hung Pham cái này fix lên STAGING giờ create Pro order lại được rồi nha anh, em cũng handle case up ảnh roi nha anh http

### Maddy - Extreme Soft Solutions — 10 messages
  [09:08] longvv: Thanh Nguyen: https://madhuraka-godahewa.atlassian.net/jira/software/c/projects/LIFM2/boards/4?selectedIssue=LIFM2-452 a [thread: 8 replies]
    └ [09:24] thanhnx: image.png
    └ [09:25] thanhnx: image.png
    └ [09:26] thanhnx: mail mà cus tạo đang để là không có giá trị của buy-offer thì hiển thị
    └ [09:43] tuantt: Expect là có giá trị buy offer thì hiển thị hả e Long Vo
    └ [09:49] tuantt: A nghĩ expect là có hay ko có giá trị buy offer, customer created email vẫn hiện như các template kh
    └ [09:51] longvv: Nếu template để No Buy offer thì có giá trị buy-out thì sẽ ko hiển thị là đúng rùi, mà e ko biết bà 
    └ [10:13] tuantt: Ò a cũng nghĩ là cần giải thích cho bả
    └ [10:13] tuantt: - Customer created email có thể setting điều hiện hiển thị Email template như hình trên. - Email tem
  [16:54] longvv: https://madhuraka-godahewa.atlassian.net/jira/software/c/projects/LIFM2/boards/4?selectedIssue=LIFM2-455 Thanh Nguyen a 

### Newsletter Inform — 1 message
  [11:10] trucpdt: Các đại ka, đại tỷ ơiiii, tháng này "feed" cho em vài data nhaaaa, @room. E khóc á, e khóc lớn lắm á 🥲🥲🥲🥲

### NUS - Bailey - Paturevision 2026 — 7 messages
  [10:38] duongdn: Dat Nguyen:  Em coi setup để monitor queue của app nha, hoặc mình cần feature này, suggest thêm ổng [thread: 1 reply]
    └ [15:00] datnc: A Tuan Nguyen support e vụ này nha a.
  [13:35] datnc: Vu Tat loy mấy con này hộ a với Có 1 mớ bug upgrade rail 6 a đang để resolved đó a Tuấn. Loy lên đi anh ơi.
  [13:35] datnc: * Vu Tat loy mấy con này hộ a với
  [13:35] datnc: https://redmine.nustechnology.com/projects/bailey-paturevision/issues?issue_id=79059%2C79063%2C80540%2C80541%2C80566%2C8 [thread: 1 reply]
    └ [13:40] vutq: done nha anh
  [13:47] tuannt: https://trello.com/c/VoJmeL66/107-grazing-softwarecr1-grazing-software-desktop-view len staging r nhe mn co the test nha

### PHP Projects — 3 messages
  [12:36] chientx: Brad Ballantine 12:08 PM Hi Carrick Thanks for the message and PDF file. I have spent a fair bit on the new websites get
  [12:36] chientx: sẵn tiện mình có cho thêm QC test tìm bugs để report ổng, kiếm task được ko?
  [13:45] namtv: Ông này nhớ trước có suggest làm một số thứ mà ổng ko cho làm. Đợt này đỡ hơn nhưng chắc cũng ko nhiều được Về QC test t

### Recruitment — 2 messages
  [09:10] trucpdt: Hi all, Em gửi mọi người thông tin tuyển dụng và lịch phỏng vấn: I. Nhu cầu tuyển dụng: Business Development Manager (Se
  [17:22] honght: Hi chị Thắm & Interviewers, CV nhận được hôm nay: A/ Headhunt: 3 CV trong đó: - 1 CV đã gửi anh Chiến review - 2 CV sẽ 

### Sandor Antal - Lyf Support — 13 messages
  [13:39] minhtv: bên này ổng test chưa Thắng ơi ?
  [13:40] thangn: hôm qua ổng nhắn bảo tối sẽ test ở Android
  [13:40] thangn: chưa nhận được phản hồi
  [13:40] thangn: iOS thì ok rồi
  [13:40] minhtv: dí lại status xem, tiện dí cái vụ tạo CR nữa
  [13:46] thangn: rồi ó, a coi thử đx chưa nhoa
  [13:46] thangn: ổng typing luôn rồi =)))
  [13:50] minhtv: Em hiểu sai rùi
  [13:51] minhtv: cái a cần là cái CR mình làm rồi ấy, cần release tiền
  [13:53] thangn: cái data deletion callback gì đó deploy lên prod luôn e ơ
  [13:54] thangn: * cái data deletion callback gì đó có deploy lên prod luôn hok e ơ
  [13:55] longvv: Deploy lên prod thì cần ổng approved với merge https://bitbucket.org/lyfappteam/lyf-backend/pull-requests/546
  [13:56] thangn: nhắn ổng làm nghe
