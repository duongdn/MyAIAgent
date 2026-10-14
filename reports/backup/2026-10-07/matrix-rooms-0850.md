# Matrix — since 2026-09-20 07:00 +07:00

### Elena - Optimization — 1000 messages
  [10:46] tuanntg: Gần ra a ơi, chỗ này nó hơi rối
  [11:16] tuanntg: .
  [11:16] tuanntg: Screenshot from 2026-09-22 11-16-16.png
  [11:18] tuanntg: Nó dùng condition và date range để query lấy ra các  khoảng time start-end rồi trả vè FE, FE lấy ra và tô màu mấy khoảng
  [11:18] tuanntg: Tính năng có cả FE + BE
  [11:18] tuanntg: e đã test cả trên UI rồi
  [11:20] trinm: vậy như hôm qua nói tham khảo cách làm này thành ra "Highlight Period" là BE tính toán hết à anh Kiet Nguyen
  [11:23] kietnht: ừa, theo như info mới nhất thì là như vậy, BE sẽ trả về cách khoảng start-end, FE vẽ lên
  [11:25] trinm: vậy khi tạo OP model ở tính năng "Highlight Period" ở step 3 & 4 sẽ thống nhất call API BE trả về data start-end nha  cc
  [11:28] anhttl: oke, vậy chỗ này cần làm rõ xem là cá tính tóa đó là algo tính hay BE mình tính
  [11:28] anhttl: * oke, vậy chỗ này cần làm rõ xem là cái tính toán đó là algo tính hay BE mình tính
  [11:29] kietnht: hình như chỗ đó chưa liên quan gì algo. nó call 1 cái services bên BE, data-manager hay sao á, Tuan Nguyen  e coi thử AP
  [11:30] kietnht: * hình như chỗ đó chưa liên quan gì algo. nó call 1 cái services bên BE, data-manager hay sao á, Tuan Nguyen  e coi thử 
  [11:30] anhttl: > hình như chỗ đó chưa liên quan gì algo.  app cũ thì chắc ko có thật, nhưng ko hiểu cái chỗ bả trả lời là "be provided 
  [11:31] kietnht: uhm, vậy chắc cần confirm lại. Bả rep vs cái mình hiểu đang chưa match
  [11:40] trinm: Screenshot 2026-09-22 at 11.39.51.png
  [11:40] trinm: tính năng export csv này là BE xử lý hả anh Kiet Nguyen
  [11:41] kietnht: hmm, export gì ta, bị miss cá này
  [11:41] trinm: "Export recommendations of the selected execution to CSV"
  [11:42] kietnht: uhm, BE xử lý gen data
  [11:43] trinm: ý là gen data còn FE tạo format file CSV hả anh
  [11:45] kietnht: đợi tí, tham khảo cách nó work hiện tại đã
  [13:20] kietnht: sao rồi á Tuan Nguyen
  [13:34] vytth: a Kiet Nguyen hỏi gì á, em chuẩn bị gửi câu hỏi nè
  [13:39] kietnht: 1 câu này: - When send payload of Optimization Model, Run to Algorithm side, do we need to send full data of tag or just
  [13:40] kietnht: với chỗ cái apply mấy ranges trên cái graph, có confirm lại vs bả là có cần data gì bên Algo ko? có câu hỏi này ko á
  [13:43] anhttl: Tri Nguyen: Những ý này nhớ consider khi estimate nha anh: + Khi update ở 1 phần trên cùng màn hình chỗ nào có info liên
  [13:44] vytth: có câu dứoi rồi nha a
  [13:45] anhttl: * Tri Nguyen: Những ý này nhớ consider khi estimate nha anh: - Khi update ở 1 phần trên cùng màn hình chỗ nào có info li
  [13:45] anhttl: * Tri Nguyen: Những ý này nhớ consider khi estimate nha anh: - Khi update ở 1 phần trên cùng màn hình chỗ nào có info li
  [13:46] anhttl: * Tri Nguyen: Những ý này nhớ consider khi estimate nha anh: - Khi update ở 1 phần trên cùng màn hình chỗ nào có info li
  [13:48] tuanntg: > <@kietnht:nustechnology.com> đợi tí, tham khảo cách nó work hiện tại đã Nó call tới service đata maanager thôi, không 
  [13:48] tuanntg: Param thì là gửi lost còndition
  [13:49] tuanntg: Trong còndition nó có tag id query này kia
  [13:49] tuanntg: * Param thì là gửi list còndition
  [13:50] kietnht: query là gì á
  [13:52] kietnht: > For example, with RANGE(A) > 5, we send you the function (RANGE), the tag (A), the operator and the value. Once the wh
  [13:53] vytth: Khác khúc nào á anh
  [13:53] vytth: * Khác khúc/ý nào á anh
  [13:55] kietnht: đoạn này: > the algorithm calculates RANGE(A) = max(A) − min(A) over the period it defines. tức algorithm calculate rồi 
  [13:56] kietnht: hiểu ý ko, chỉ cân hỏi là algo có involve gì khúc này ko là đc
  [13:57] vytth: Là algo trả mình cái range(a) đó, Be get data rồi trả cho FE show lên chaảt
  [13:57] vytth: Ý v hả anh
  [13:57] kietnht: hog, range đó từ BE luôn
  [13:57] vytth: Là chỉ trả data của cái tag thui, còn range mình tính đúng hong
  [14:02] kietnht: image.png
  [14:03] kietnht: e nhìn cái hình hiểu ko? tức là mình check, cái range đó đang đc lấy từ data-manager phía BE. Do bả nói là có algorithm 
  [14:04] tuanntg: ``` [     {         "id": "bd5fb00b-dd78-4901-8708-0b04020676ca",         "name": "Condition 1",         "condition": { 
  [14:04] tuanntg: .
  [14:04] tuanntg: Pay load thì này nha a:
  [14:04] tuanntg: ``` {     "success": true,     "warning": false,     "data": [         {             "segmentId": null,             "seg
  [14:06] kietnht: cái đó là response mà
  [14:06] kietnht: payload là data lúc nó gửi
  [14:06] tuanntg: thì payload với res đó a
  [14:06] tuanntg: theo thứ tự
  [14:06] tuanntg: pay - res
  [14:08] kietnht: image.png
  [14:08] kietnht: Tuan Nguyen: data-range chỗ này là gì vậy
  [14:09] kietnht: * Tuan Nguyen: dataRange chỗ này là gì vậy
  [14:09] tuanntg: Nó l;à ngày tháng ấy a
  [14:09] tuanntg: chỗ select date range đó
  [14:09] tuanntg: Screenshot from 2026-09-22 14-09-47.png
  [14:10] tuanntg: Vùng màu đen trên Graph là vùng hiện ra sau khi mình nhấn nút hightlight ddaasy
  [14:10] kietnht: ok
  [14:11] kietnht: hú Vy Tran
  [14:18] anhttl: chỗ này cứ hỏi chung chung với bả trước là nhờ bà nói lại là chỗ này chính xác thì involve alothithm chỗ nào. tag Kfir v
  [14:21] kietnht: uhm, hỏi chung cũng đc, hoặc assume cái mình đã check, chứ đừng assume đoạn đó là toàn bộ bên algorithm
  [14:28] kietnht: e check tiếp nha Tuan Nguyen , mở design coi mây cái mà search tag, search multiple tag mình cần group theo asset. Hiện 
  [14:29] kietnht: API đó hình như nó query qua cái graph database, trả về những edge, node này kia nên response nó khá phức tạp và rối rắm
  [14:29] kietnht: coi thử nha
  [14:30] tuanntg: oké a
  [14:30] kietnht: * API đó hình như nó query qua cái graph database, trả về những edge connection, node này kia nên response nó khá phức t
  [14:32] vytth: Missing values from function for showing the chart  Here is the flow:  * The user creates a new model and goes through s
  [14:32] vytth: Kiet Nguyen:
  [14:32] vytth: sửa vầy đúng chưa a
  [14:33] vytth: * Missing values from function for showing the chart Here is the flow: - The user creates a new model and goes through s
  [14:33] kietnht: uhm, ok e
  [14:37] anhttl: gửi trước mấy câu này đi chị Vy Tran
  [14:37] vytth: gửi rồi á e
  [14:38] anhttl: ây ông Kfir có gửi contract algo với BE rồi kìa anh Kiet Nguyen, Tuan Nguyen
  [14:38] anhttl: Regard API contract between algorithms to BE I've created this confluence page https://precognize.atlassian.net/wiki/spa
  [14:39] kietnht: chưa thấy khỉ khô gì hết nha :v
  [14:39] kietnht: blank page :v
  [14:39] kietnht: chắc bên đó làm rồi mới fill e, ổng tạo page sẵn thôi
  [14:39] anhttl: à ừa =))
  [14:40] anhttl: Vy Tran: chị rep ổng là thanks, nma m check giúp 4 câu trên nha
  [15:32] kietnht: Tuan Nguyen xem luôn nha
  [16:16] kietnht: sao ông Kfir nói ko hiểu gì hết ta :v
  [16:20] kietnht: Vy Tran: chắc hỏi giúp a bà lena chỗ này luôn nha, ko hiểu cái historical value
  [16:20] kietnht: image.png
  [16:28] vytth: chỗ này a nghĩ cần hỏi rõ tới mức nào nữa á, tại e hỏi rồi bả trl vầy
  [16:28] vytth: Screenshot 2026-09-22 at 16.27.56.png
  [16:28] vytth: :)))))
  [16:28] vytth: trl như ko trl
  [16:41] kietnht: khoan để cái đó sau cũng đc, chỗ ổng rep quan trọng hơn: >You do not need to change the get data function to support the
  [16:43] kietnht: bị sao ấy, mấy cái ổng rep sao chẳng thấy vô trọng tâm gì, mình có miss gì ko ta 🤔
  [16:48] kietnht: hoặc có thể bên họ sẽ define sẵn 1 số models liên quan tới các tag, influencers.... và mình cần get nó trước khi tạo bên
  [16:49] anhttl: Vy Tran: chinrh lại công thức trên wbs giúp em với chị
  [16:49] kietnht: * hoặc có thể bên họ sẽ define sẵn 1 số models liên quan tới các tag, influencers.... và mình cần get nó trước khi tạo b
  [16:51] anhttl: em mới dô hỏi lun r
  [16:57] anhttl: Tri Nguyen, Kiet Nguyen: ngoài mấy chỗ đợi confirm, mn điền hết chưa, confirm em phát
  [16:58] trinm: Anh điền hết rồi nha
  [17:00] kietnht: còn cái info api bên Tuấn, với chỗ ông Kfir, ko biết có thay đổi gì ko thì có thể ảnh hưởng tới est.  ngoài ra thì là xo
  [17:08] vytth: mai c sửa nha
  [17:18] kietnht: nếu tình hình vẫn ko ổn, a suggest là sx call vs ổng nha, chat qua lại tốn time quá
  [17:18] kietnht: mà ko đc cái gì :v
  [08:39] anhttl: Kiet Nguyen, Tri Nguyen: khách có rep rồi nha mấy anh. Đọc thử xem clear chưa
  [08:48] anhttl: 1. function là Java tính. cái này lại khác với cái bữa bả nói. 2. 0 tới 40 là min max của tag đó trong 3 tháng. tính toá
  [08:51] anhttl: We still need to have APIs to get influencers and constrains. Very similar to what we have today --> Today là work sao n
  [08:55] kietnht: cái đó chưa rõ, theo a hiểu bà lena nói là mình sẽ cần tạo những collection riêng của những constrains, exclusion (mỗi t
  [08:56] kietnht: còn kfir nói a lại càng ko rõ hơn
  [09:00] kietnht: hình như cha Kfir kêu cần có API để lấy những constrains của influencers của Optimization models cho bên ALgo sử dụng
  [09:02] kietnht: Tuan Nguyen: chỗ hôm qua có ra được gì chưa á Anh Trinh chắc chỗ similar, e hỏi cụ thể chỗ test luôn nha.
  [09:03] tuanntg: Nó rối như cái bùi nhùi a ơi
  [09:03] tuanntg: CHo e confirm lại
  [09:04] tuanntg: là mình cần API get list assests by tag, multi tag  thôi hay là mình get list response nó có chứa cả tag và assests tron
  [09:05] tuanntg: Chứ API hiện tại của nó là get all data của cái thằng tag a truyền vào tức là gồm cả tag và assest và các thứ khác nữa
  [09:05] kietnht: > API get list assests by tag, multi tag  thôi là ý này
  [09:10] tuanntg: Theo e thì phải build mới rồi
  [09:10] tuanntg: Dùng chung đc vài đoạn trong API cũ
  [09:11] tuanntg: Build mới độ khó bình thường, đổi câu query Neo4j thôi
  [09:12] tuanntg: e nghĩ nếu e làm thì tầm 6h cho con API này
  [09:26] kietnht: Okay
  [09:31] anhttl: Kiet Nguyen: lưu từng step là lưu FE thôi hay call API luôn anh
  [09:42] kietnht: bả muốn vậy thì vậy thì BE nha e :v
  [10:16] kietnht: image.png
  [10:18] kietnht: Tuan Nguyen: e check tiếp giúp a nha, chỗ này thay vì trả về các khoảng thời gian thỏa mãn điều kiện, thì mình trả về tr
  [10:19] kietnht: * Tuan Nguyen: e check tiếp giúp a nha, chỗ này thay vì trả về các khoảng thời gian thỏa mãn điều kiện, thì mình trả về 
  [10:20] kietnht: mình có thể làm cái API liên quan tới cái này do cha Kfir kêu bên Algo ko access đc data
  [10:47] kietnht: hmmm, nó là time series data, khoảng cách có thể vài phút nhưng lượng data có thể rất lớn 🤔
  [10:49] tuanntg: https://viblo.asia/p/luu-tru-du-lieu-time-series-voi-influxdb-cung-bai-toan-ve-du-lieu-chung-khoan-gGJ59xnGlX2
  [10:49] tuanntg: e đang đọc ở đây nè
  [10:49] tuanntg: thấy có vẻ 1s là 1 dòng record
  [10:51] anhttl: anh Dong Nguyen với Tien Nguyen có làm cái influxDB bao giờ chưa mn
  [10:51] tiennd2: a Dong Nguyen trùm lun
  [10:51] dongnv: Có rồi em, anh chỉ biết sơ chứ ko có trùm j.
  [10:52] tiennd2: tui đụng 1 2 lần, ít lắm, query cơ bản check data thôi, chưa đụng logic gì
  [10:52] anhttl: anh có biết là chỗ này làm sao để nó highlight được từ time nào tới time nào là thỏa điều kiệm ở bên trái ko
  [10:53] dongnv: Khúc này thì anh chưa đụng vô, còn highlight thì có vẻ là phía UI check điều kiện từ socket thì sẽ ra chứ nhỉ?
  [10:53] dongnv: Influx chỉ trả về các data dựa theo query của mình chứ ko có cái nào là "highlight" hết nghen.
  [10:54] anhttl: check code hiện tại thì BE sẽ trả start end để FE vẽ ra đó anh
  [10:54] dongnv: Òm, vậy giờ muốn highlight thì FE lại check cái data đó trong khoảng điều kiện nào rồi hiện trên UI nè.
  [10:55] anhttl: giờ đang ko biết là làm sao để ra được start end á
  [10:55] anhttl: điều kiện là tag A > value x thì dễ
  [10:55] dongnv: Anh thấy có 2 field là start và end trên input đó?
  [10:56] anhttl: hong, design ở trên là app có sẵn á
  [10:56] dongnv: Cái có sẵn em hông edit được hẻ?
  [10:56] anhttl: image.png
  [10:56] dongnv: Vậy em tạo mới 1 cái đi
  [10:56] anhttl: còn tính năng mới, cái mình đang muốn ets, thì ko thấy có chỗ điền start end
  [10:56] anhttl: ko lẽ design thiếu ta
  [10:57] dongnv: Chắc là vậy roài.
  [11:00] anhttl: Kiet Nguyen: nếu mà hiểu theo nghĩa như này thì cũng make sense nè anh Kiệt. tức là, ko phải là min của tag trong khoảng
  [11:00] anhttl: image.png
  [11:00] anhttl: chắc bữa mình confirm vụ 1 tag hay nhiều tag bả hiểu nhầm
  [11:01] anhttl: còn start với end em thấy thường khi add tag là nó có định sẵn luôn thì phải á
  [11:01] anhttl: anh nhớ mỗi khi add tag thì có thể nó nới cái chart ra ko
  [11:02] kietnht: =========== khoan, chỗ  highlight đó đc rồi, cái tính năng highlight đó đã support các function cơ bản như (>, <, >=, ==
  [11:02] anhttl: thì ở trên là em nói cho function diff mean đồ á
  [11:03] anhttl: em đang nói tới khả năng bữa mình confirm bị sai
  [11:06] anhttl: 2 cái này khác nhau nè: + min(A) trong khoảng period từ start->end - đây là cái bữa mình hiều. nên mới dẫn tới mình hỏi 
  [11:13] kietnht: >min(A,B,C,..) tại thời điểm x - nếu xét theo cách hiểu này thì có nghĩa là tại mỗi điểm thời gian, mình lấy value nhỏ n
  [11:13] anhttl: oke, start end của mỗi tag thì có sẵn rồi đúng ko anh
  [11:14] kietnht: còn ý e nói design thiếu start, end => cũng là 1 ý đáng lưu ý. Nếu ko có thì lấy dữ liệu x months gì ko? bữa bả có rep ấ
  [11:15] kietnht: x months -> now?
  [11:19] anhttl: image.png
  [11:19] anhttl: theo behaviour là add tag xong nó có 1 khoảng tgian luôn r anh
  [11:20] anhttl: như khi anh add tag trong investigation ấy
  [11:20] anhttl: trên hình là em ko cần chọn time range nha
  [11:21] kietnht: uhm ok, vậy default là time range đó
  [11:21] anhttl: rồi ok clear chỗ đó nha
  [11:21] kietnht: 👌
  [11:23] kietnht: để dò lại tổng thể cái est, mấy cái ông Kfir nói, confirm lại rồi add vào 1 số giờ nếu cần
  [11:23] kietnht: * để dò lại tổng thể cái est, mấy cái ông Kfir nói chắc ko ảnh hường nhiều lắm confirm lại rồi add vào 1 số giờ nếu cần
  [11:36] anhttl: còn đây là diễn giải cho cái gauge nha:
  [11:36] anhttl: image.png
  [11:38] kietnht: min max của tag lấy từ influx
  [11:39] anhttl: ừa, em thấy make sense
  [11:46] anhttl: Em gửi lại:
  [11:46] anhttl: image.png
  [11:47] anhttl: Cái này mới, cho Diff, prop:
  [11:47] anhttl: image.png
  [12:00] anhttl: Còn về chỗ "use historical value", bả chưa trả lời, nhưng khả năng cao là dù value đó là gì thì cũng là cần mình sẽ tính
  [12:00] anhttl: image.png
  [13:00] anhttl: image.png
  [13:00] anhttl: cột màu xanh lá này là để làm gì v anh Kiet Nguyen
  [13:11] kietnht: a note số hours của các ý nhỏ trong 1 cụm lớn
  [13:11] kietnht: * a note số hours của các ý nhỏ trong 1 nhóm lớn
  [13:18] kietnht: con số total là cột BE ngoài cùng ấy
  [13:18] anhttl: ở đâu á
  [13:19] kietnht: image.png
  [13:45] kietnht: Tuan Nguyen:  cũng liên quan cái influx, e tạm dừng cái check tool vs get data, chỗ màn hình trả về các time range thỏa 
  [13:45] anhttl: anh điền vô mấy dòng như 10 11 20 21 đi anh
  [13:46] anhttl: à ý em là anh điền thêm á, em reply nhầm cái hình
  [13:51] anhttl: Kiet Nguyen: em mới tạo sheet mới để format lại, anh qua sheet mới kế bên nha
  [13:55] anhttl: anh Tri Nguyen ơi, còn cần điền est chỗ này nha
  [13:55] anhttl: image.png
  [13:58] anhttl: image.png
  [13:59] anhttl: Kiet Nguyen: check donfy nay xem co chua nha a
  [14:04] kietnht: row 20 database design ko cần nha Anh Trinh , nó là row 70 rồi
  [14:14] kietnht: hmmm, khoan nha, 1 ý nữa, a nghĩ cần thêm effort để simulate, fake data các kiểu để FE và QC dùng. Vì ko biết Algo khi n
  [14:17] anhttl: anh hỏi bả trên room xem anh, hỏi bả là có commit là algo sẽ làm xong trước ko, nếu ko thì t sẽ cần thêm effort để bla b
  [14:19] anhttl: thoai để em hỏi luôn
  [14:20] anhttl: > giả sử nó xong trước mình thì phải setup để nó chạy đc trên cái server của mình hoặc họ cung cấp server  chỗ này là sa
  [14:21] anhttl: nó xong trước là sao
  [14:23] tuanntg: Này là có đủ hết trong list custom function mình muốn chưa a
  [14:23] tuanntg: Screenshot from 2026-09-23 14-22-39.png
  [14:24] kietnht: tức là quá trình test nó đang hơi risk, chưa hình dung đc. 2 cases: - giả xử nó xong trước thì cần pull code về rồi setu
  [14:24] anhttl: mình cần có mean, min, max, sum, avg, range, prop, diff
  [14:27] kietnht: tức số time trên sheet est thì là raw time để viêt logic này kia thôi
  [14:28] kietnht: một số cái như a nói trên, khó để est quá, và có thể là tốn nhiều time
  [14:32] anhttl: ok em mới hỏi bả
  [14:40] kietnht: syntax gì nhìn dị vậy :v
  [14:41] tuanntg: syntax trong DB của nó ấy a
  [14:43] anhttl: Kiet Nguyen: em mới add dòng 330, điền giúp em nha, FE chắc ko cần ha?
  [14:44] tuanntg: https://docs.influxdata.com/influxdb/v2/query-data/flux/
  [14:44] tuanntg: nó dùng cái này nè a Kiet Nguyen
  [14:45] anhttl: Kiet Nguyen: chiều ngược lại, MODEL waiting RUN (+4h) --> cai nay anh xu ly chua
  [14:45] anhttl: image.png
  [14:46] kietnht: cái đó là gì a ko hiểu
  [14:52] anhttl: em ko biết ai note, nhưng chỗ đó ý là để xử lý model có status waiting khi nào á
  [14:52] anhttl: thì có add vô est chưa
  [14:52] anhttl: để biết xóa dòng đó
  [14:53] kietnht: cái đo BE có rồi e
  [14:54] anhttl: Licensing 32h luôn hả, bữa lúc break ra thành M1 mình est có 25h raw á
  [14:55] kietnht: cái raw đó ko có logic liên quan mấy cái tính toán sử dụng
  [14:56] kietnht: chỉ là upload, validate file, rồi API info các kiểu thôi
  [14:58] anhttl: Cái sheet giờ format lại để cho sạch sẽ luôn, mn đừng note tiếng việt nữa nha, note thì note cột ngoài cùng bên ngoài ch
  [15:01] anhttl: Delete là soft hay hard delete mn, có ảnh hưởng est ko
  [15:10] anhttl: image.png
  [15:11] anhttl: Kiet Nguyen: này chốt sao nè
  [15:12] kietnht: cái đó nằm ở màn hình nào á
  [15:12] anhttl: tạo model > step 2: chọn influencer
  [15:13] kietnht: image.png
  [15:13] kietnht: này hả
  [15:13] anhttl: next qua mấy màn sau đi anh
  [15:13] anhttl: chỗ ddos có hiện luôn mấy cái info asset ko
  [15:14] anhttl: nếu có thì reuse cái add target tag hay s
  [15:14] kietnht: cái đó thống nhất là làm API rồi e, truyền lên list tag, return asset info
  [15:15] kietnht: row 97 trong est
  [15:15] anhttl: "All tags connected to data source and have data of minimum x month" có bao gồm ý x month chưa
  [15:17] kietnht: image.png
  [15:18] kietnht: nếu chỗ cái trend graph thì time range đã có rồi
  [15:19] anhttl: là sao ta, là chỗ này để hiện ra được list tag này thì anh có API cho nó chưa
  [15:19] anhttl: dòng 84: sao breakdown task tổng là 18h mà anh điền 24h
  [15:19] kietnht: cái đó dùng lại API search tag mà
  [15:20] anhttl: search tag là cũng có ý "have data minimum x month" hả
  [15:20] anhttl: hay ý anh là tạo mới 1 api search tag rồi
  [15:20] kietnht: có note đó Tuấn ghi, đụng tới ES nên lâu hơn chút
  [15:20] kietnht: chắc remove cái note đi
  [15:22] kietnht: tức là search influencers cũng require là có data x months à? => nếu vậy chỗ này chưa check nha
  [15:22] kietnht: a đang hiểu x months là chỗ cái trend graph
  [15:23] anhttl: 2 cái đó đâu có liên quan đâu ta. hiện giờ cái 2 cái api search tag có sẵn của họ là chỉ ra all tag trong hệ thống thôi 
  [15:23] anhttl: nếu mình pick 1 tag mà ko có data thì nó hiện ko có data
  [15:23] anhttl: yes
  [15:25] anhttl: Cái câu này là sao anh Tuan Nguyen: New API: return Asset data for list tags. example for returning asset for single tag
  [15:26] anhttl: em hiểu mục đích rồi, nhưng ko hiểu cái "example for returning asset for single tag" bỏ vô làm gì
  [15:27] kietnht: cái đó a ghi để Tuấn research :v
  [15:27] kietnht: ví dụ cái API có sẵn :v
  [15:27] anhttl: est chỗ đó ok chưa
  [15:27] kietnht: removed
  [15:33] kietnht: Tuấn est 6, a lại nghĩ nó hơi phức tạp hơn chút. Chưa double check nhưng chắc cũng ko chênh lệch nhiều
  [15:34] anhttl: rồi có update gì thì update luôn đi nè anh :'>
  [15:35] kietnht: đợi tí, đang check chỗ x months
  [15:35] kietnht: chắc cần thêm API
  [15:35] kietnht: nó đang search all tags
  [15:35] kietnht: ko có check điều kiện data
  [15:38] anhttl: Kiet Nguyen: check slack nha anh, bả rep r đó
  [15:42] kietnht: add vào 1 row 4h nữa rồi nah
  [15:44] anhttl: theo idea của bả thì mình vẫn cứ làm, chỗ nào có algo thì để lại. anh thấy có làm theo kiểu vậy đc thật ko
  [15:45] kietnht: sao confuse ta, giờ bả kêu implement từng phần, trong khi sheet est đang assume viết logic cho các phần integrate luôn ấ
  [15:45] kietnht: vậy nếu đưa bả, phải remove các effort liên quan Algo hay cần update/note gì cho bả ko
  [15:47] anhttl: Ko á, est đây là est tổng luôn, là phải bao gồm làm viết logic cho integrate chứ. Câu hỏi ở đây là có thật sự làm được n
  [15:52] kietnht: bả muốn làm song song nhưng chưa tl câu hỏi của mình là setup ntn, khó không, sheet est chưa bao gồm phần đó do ko rõ ch
  [15:54] anhttl: ví dụ bả setup giúp mình đi, em ví dụ thôi nha, thì có làm được như kiểu bả nói ko
  [15:58] kietnht: ``` I suggest the following approach: 1. Implement the license functionality completely, without any dependency on the a
  [15:58] kietnht: bả làm thì chắc mình cần cộng 1 số hours nữa, để trong quá trình đó có update API, Message gì đó .....
  [15:59] kietnht: nó sẽ có phát sinh
  [16:01] anhttl: khoan để xong cái est đã: anh check dòng 288 chưa
  [16:01] anhttl: oogn Kfir mới nhắn slack nha a
  [16:03] anhttl: như ổng nói thì chắc giờ mình vẫn dùng cái server hiện tại đang làm active alert để làm, test??
  [16:06] kietnht: ừa, dùng cái AA hiện tại để tạo model đồ ấy, ko liên quan gì algo
  [16:07] kietnht: ổng có thêm ý nữa,  And in addition once we will finish model training flow, I'll set up a server with algo branch so yo
  [16:07] kietnht: là cỡ tầm 2-3 tuần thì sẽ có server để integrate
  [16:07] kietnht: hmmmmm
  [16:07] anhttl: thông thường thì lấy số đó x2 x3 lên ...
  [16:08] kietnht: =)))
  [16:12] kietnht: từ từ để nghĩ chút, sao cho nó include luôn mấy cái effort này
  [16:13] kietnht: mà nó vẫn smooth, nhập nhằng mấy cái này mệt lắm
  [16:25] kietnht: Anh Trinh: a đang ko hiểu ấy? sao Kfir vs bà Lena kêu mình làm cái license trước, tức làm trước nhưng vẫn đưa est tổng t
  [16:27] anhttl: Dạ, đưa est tổng, làm license trước để bên kia có time làm algorithm
  [16:39] anhttl: Kiet Nguyen: anh check dòng 288 chưa? recommendation có mấy status như đã implement, chưa implement, đã đọc,... anh có b
  [16:41] kietnht: Có include trong phần handle feedback rồi e
  [16:41] kietnht: e định gửi sheet est ntn á Anh Trinh
  [16:42] anhttl: Em gửi link google sheet, 1 bản external cố định á
  [16:46] anhttl: dòng 10 với 11 sao anh Kiet Nguyen
  [16:48] anhttl: Dòng 301 tới 303 có thiếu hong z
  [16:49] anhttl: Before-run checks: no-credits state credit and capacity update after upload the licence check before a run expiry blocki
  [16:50] anhttl: Cái tính toán để ra được cái Gauge là dòng nào nhỉ
  [16:54] kietnht: này là phần license + logic liên quan đó
  [16:54] kietnht: BE thì trong recommendation
  [16:58] anhttl: Kiet Nguyen, Tri Nguyen: 2 anh check lại lần nữa giúp em nha
  [16:59] anhttl: Kiet Nguyen: dòng 10 với 11, Dòng 301 tới 303 --> em còn chờ 2 cái này á nha
  [17:02] kietnht: ừa e, ý là với tình hình này, cái row trong sheet đang là raw logic. nếu làm song song cần include 1 số effort integrate
  [17:03] anhttl: effort setup server họ mới nói là họ tự setup đó
  [17:04] anhttl: dòng 10 11 là để tạo data test, mình có cần tạo data test gì ko
  [17:05] kietnht: Kfir kêu là setup branch cho algo thôi, bà lena kêu setup all => đang conflict nha
  [17:05] anhttl: thấy tạo cho client thì maybe em sẽ nói bả exclude ra, khi nào xong scope thì tính
  [17:05] anhttl: giờ em assume là họ sẽ làm đầy đủ hết để mình ko tốn công setup nữa, vậy ok chưa?
  [17:06] anhttl: còn tạo internal, em nhìn qua flow thì thấy chắc ko cần tạo data gì
  [17:06] anhttl: thôi báo bả vậy đi
  [17:06] anhttl: còn 301 tới 303
  [17:08] kietnht: rồi đó, a update trong phần evaluation
  [17:09] kietnht: mà có row nào cho integrate FE, BE chưa?
  [17:09] anhttl: là cái gì á, thường thì giờ để FE call API gì đồ là điền trong FE luôn đó anh
  [17:09] anhttl: hay ý anh là cái gì nữa á
  [17:12] kietnht: ok, a double check thôi
  [17:13] anhttl: oki
  [17:18] anhttl: Kiet Nguyen: nếu ko tính unit test, chỉ gồm giờ làm raw thì chỉ có 290h thôi, có ít quá ko anh
  [17:18] anhttl: * Kiet Nguyen: nếu ko tính unit test, chỉ gồm giờ làm raw thì BE chỉ có 290h thôi, có ít quá ko anh
  [17:19] anhttl: image.png
  [17:20] anhttl: and xem lại mấy dòng này luôn
  [17:20] anhttl: * anh xem lại mấy dòng này luôn
  [17:21] kietnht: checking
  [17:23] kietnht: 330 bt là dành cho dev integrate rồi testing này kia đúng ko
  [17:26] kietnht: chắc cộng thêm tí chỗ mấy cái logic liên quan algo, làm song song kiểu này kiểu gì cũng take nhiều time
  [17:29] kietnht: rồi nha
  [17:44] anhttl: với có giờ unit test nữa nên nó nhiều đó anh
  [17:48] anhttl: Chốt nhé mn
  [18:09] kietnht: hmm, sao có ý này e: The algorithm is expected to be completed and fully tested before the related Java BE work starts.
  [18:10] kietnht: mình đang nói làm song song mà
  [18:10] anhttl: "Related" á, ý là mình có thể làm phần ko liên quan trước
  [18:11] anhttl: Khó hiểu hả, để em sửa lại
  [08:43] anhttl: Kiet Nguyen, Tri Nguyen: Mn mở ra làm trước phần License luôn nha, hoăc setup ban đầu, tạo component,... gì đó trước. Nh
  [08:49] kietnht: họ kêu nhiều quá hay sao á :v
  [08:50] anhttl: Thấy họ hỏi về timeline rồi, thấy có vẻ khả quan. Lena nói sẽ review kỹ hơn sau
  [08:53] kietnht: hmmm Kfir kêu 2 dev FE, 2 dev BE thì tầm 3 months max. Như vậy thì cũng vừa với số hours trong sheet, BE mình est còn ít
  [09:54] kietnht: vụ mấy cái function hôm qua e check trong influx tới đâu rồi Tuan Nguyen  ?
  [10:03] anhttl: nay anh Tuấn off nha anh
  [14:02] anhttl: Tri Nguyen: Anh est giup em cai CR nay nha, asap nha
  [14:02] anhttl: https://precognize.atlassian.net/browse/AA-121 [thread: 1 reply]
    └ [14:05] trinm: Anh Trinh: khoản 1h nha
  [14:09] anhttl: Tri Nguyen: làm luôn nha anh [thread: 1 reply]
    └ [14:10] trinm: ok em
  [14:10] anhttl: approved rồi. Duy Vo chuẩn bị vô test lại nhé
  [14:12] trinm: anh Kiet Nguyen check giùm em cái data webInterface.appsMenu.menuItems trong API "/vp_server/dae/rest/configuration/inte
  [14:15] kietnht: là sao á e, a chưa hiểu cần check gì @@
  [14:17] kietnht: image.png
  [14:17] kietnht: coi phải cái này ko  :v
  [14:18] trinm: đúng rồi đó anh em muốn thêm cho Optimization
  [14:19] trinm: cái đó thêm bằng tay vào DB hả anh, hay có chỗ nào tương tác ở UI nhỉ
  [14:23] kietnht: thấy nó như là 1 cái constant ở BE thôi
  [14:25] kietnht: nó load vào RAM khi server start, hình như có endpoint để override: /configuration/override ko rõ nằm ở chỗ nào dưới UI
  [14:38] trinm: vậy anh thêm giùm em 1 record data theo cái này nha anh  ``` {     "name": "common.apps.optimization",     "iconPath": " [thread: 10 replies]
    └ [15:03] anhttl: Tri Nguyen: làm con CR kia đi để em close cái này cho bả sớm nè
    └ [15:03] trinm: đang nha
    └ [15:14] trinm: Anh Trinh: Done nha
    └ [15:38] anhttl: Duy Vo: tét tét nè
    └ [15:39] duyvna: đang tét tét
    └ [15:39] anhttl: ok
    └ [15:39] anhttl: hihi
    └ [15:41] duyvna: video-56822201-1b3417c3f93eb2bbe936f2b2a909feb1.mp4
    └ [15:42] duyvna: khi = 0 là disable lun phải ko Anh Trinh
    └ [15:43] anhttl: chưa đọc ticket nữa :))
  [15:02] anhttl: Duong Doan, Kiet Nguyen: Như đã họp với anh Năm, trong thời gian mình đợi bên bả review estimate, mình có chút dư địa ti
  [15:42] duyvna: * khi Active hay Previous = 0 là disable lun phải ko Anh Trinh
  [15:45] anhttl: Tri Nguyen: test ok rồi nha, anh update PR đi rồi báo em
  [15:46] trinm: anh push code lên là auto update PR rồi á
  [15:49] anhttl: ok
  [09:04] anhttl: anh Tri Nguyen, Kiet Nguyen, về estimate và báo giá, khách có phản hồi như này nha mn: > looking across the WBS, I see a
  [09:11] kietnht: > Trend chart Realtime update algorithm integration (*cái này bả có liệt kê vô list reuse, em ko hiểu lắm) function, exp
  [09:12] kietnht: còn cái algorithm integration thì đúng là ko hiểu ý bả reuse cái gì á
  [09:15] kietnht: thôi để a summary lại
  [09:24] trinm: "Date Pipe" --> Is the date displayed according to the user’s configured date format included?" Đúng rồi, cái này tạo ra
  [09:27] trinm: "Run status" --> model status is included here as well? không bao gồm, est này bao gồm là mình tạo 1 component dùng chun
  [09:30] kietnht: - Trend chart: ko rõ BE or FE, BE thì ko có effort này - Realtime update: effort này là để viết logic, chỉ reuse được ki
  [09:32] trinm: Trend chart cái này trong WBS có một chỗ tạo cái component trend chart này để dùng lại, còn khi vào chi tiết từng featur
  [09:33] anhttl: Tri Nguyen, Kiet Nguyen, Tuan Nguyen, Vy Tran : team mình 10h họp review lại estimate nha. Tham gia để hỗ trợ định hướng
  [09:59] vytth: họp lầu mấy á e
  [10:00] anhttl: Nova nha mn
  [11:58] anhttl: Duong Doan: https://docs.google.com/spreadsheets/d/1xQ_KbUzQdEp0mXpofRNQ6XUj1CfQPsyJjZJygRPYMbI/edit?gid=967222013#gid=9
  [11:59] anhttl: Design: https://www.figma.com/design/AFo6lMDB42WCDrB1ZsZu1t/01_Precognize-Product?node-id=397-64159&p=f&t=Yto3GIKNySuyX8
  [13:26] kietnht: mình chưa chốt next step là làm ntn phải ko Anh Trinh   giờ giải thích bả chỗ bả thắc mắc, hay như a Dương nói e? ⚠️
  [13:30] anhttl: Dạ em cần tổng hợp lại giải thích mấy chỗ bả thắc mắc. Ở trên mn trả lời còn thiếu gì thì edit bổ sung vô nha
  [13:37] anhttl: Duong Doan: Figma với file est em để ở trên. Anh đợi em chút em đưa file req
  [13:37] anhttl: Kiet Nguyen: Chỉ anh Dương chỗ xem giúp em cái nha ⚠️
  [13:37] anhttl: * Kiet Nguyen: Chỉ anh Dương chỗ xem trong source giúp em cái nha ⚠️
  [13:38] kietnht: cái proj nặng quá, chắc nếu a Dương cần thì lấy acc Brian rồi down về luôn nha, trên đó ko có mấy file compiled class ch ⚠️
  [13:39] kietnht: * cái proj nặng quá, compress lại máy chạy muốn ko nổi, chắc nếu a Dương cần thì lấy acc Brian rồi down về luôn nha, trê ⚠️
  [13:40] duongdn: cái sub folder của backend là gì vậy Kiet Nguyen
  [13:41] duongdn: a hem access được nh
  [13:41] tuanntg: BE là nguyên cái folder development luôn nha a
  [13:42] kietnht: nó nhiều sub chứ ko phải 1, những cái liên quan BE: /libraries /services /application
  [13:43] kietnht: còn một số sub FE như portal, admin-UI  mấy cái còn lại chưa đụng nên e ko rõ
  [13:43] kietnht: image.png
  [13:43] kietnht: zip gần 500MB vẫn chưa xong :v
  [13:45] anhttl: Optimization-Requirements-and-Workflows.html
  [13:45] anhttl: Req nha anh Duong Doan
  [13:48] anhttl: Kiet Nguyen: Chỗ algorithm integration có gì check lại với Tiến xem có gì reuse được ko anh
  [13:49] kietnht: đợi tí a đang check
  [13:51] duongdn: hú le hú le  Anh Trinh
  [13:52] duongdn: ok, a có  source mà, để coi, chỉ là ko biết cái này backend thôi
  [13:53] anhttl: added nha anh. sheet OP - Format Fixed
  [13:55] duongdn: thank e
  [13:56] duongdn: a Chiến mới hỏi a về status est nha mn, cần update lại con số trong hôm nay nha  FE: est lại theo hướng reuse mình nói B
  [13:59] duongdn: Này task ưu tiên cao nhất là mn ! Mệnh lệnh trực tiếp từ BDD :)
  [14:07] kietnht: Anh Trinh:  Tiến ko có đụng sâu vô mấy cái logic build queue này kia nên ko có info reuse gì như bả nói
  [14:09] anhttl: vậy chỗ đos anh giải thích được cho bả là effort đó là làm gì ko
  [14:11] kietnht: image.png
  [14:13] kietnht: chỗ đó a nghĩ cũng khá rõ rồi, a list ra các communication có thể xảy ra, logic của nó.  Với lại chỗ đó sẽ có thêm effor
  [14:13] duongdn: Figma dung acc nào để vào em
  [14:13] kietnht: nếu e muốn raw logic này kia thì có thể giảm giờ, nhưng sẽ có risk là under estimate
  [14:15] anhttl: gg Ken á
  [14:16] duongdn: này nãy có bàn rồi, về phía dev thì cho 1 assumption rồi est theo assumption đó thôi nếu nó có phát sinh thì thành CR, đ
  [14:20] duongdn: Bên BE, có rất nhiều dòng có số giờ > 10, kể cả phần có giải thích Kiệt tách nhỏ ra đi, best practice là mỗi row khoảng 
  [14:34] duongdn: ==== Anh Trinh  Kiet Nguyen  Giờ a mới thấy 1 cái khá sốc, BE rough est là 322h, cộng 1 hồi sao lên thành 722h, đáng chú
  [14:36] kietnht: >  Về mặt technical, với thời đại AI, có vẻ 30% thời gian cho viết unit test là khá lớn, unit test giờ lib nó generate r
  [14:36] kietnht: con số đó nó dùng lại từ mấy cái scope đầu rồi a
  [14:37] duongdn: thực tế thì sao, thực tế có dùng thực sự bao nhiêu h vậy cho unit test ko, ko phải test nha, unit test Cho AI viết, mình
  [14:37] kietnht: ủa khoan, sao test take 60% đc ta
  [14:38] duongdn: unit test 30%, testing 30%
  [14:38] kietnht: a đang nói row nào vs row nào ấy
  [14:38] kietnht: image.png
  [14:38] kietnht: phải 2 row này hog
  [14:38] duongdn: 329 và 333
  [14:38] kietnht: khoan để e coi
  [14:39] kietnht: như có j sai sai
  [14:39] duongdn: uhm
  [14:39] duongdn: nói chung là raw dev là 322h
  [14:39] duongdn: cộng mấy cái đó lên 722h
  [14:39] duongdn: vi diệu ko ...
  [14:49] kietnht: Con số Unit test có thể giảm xem xét giảm thêm nếu muốn, do e đã giảm nó từ 0.5 của các scope trước xuống 0.3 rùi Còn cá
  [14:51] duongdn: cái con số 0.5/0.3 này từ đâu ra nhỉ, công thức ? hay cus yêu cầu kĩ unit test tùy vào expect của họ mìnhh có thể có số 
  [14:53] duongdn: ==== Anh Trinh  A có coi qua cái Figma, phần đầu nó giống 99.99 % app cũ , nhung style nó khác Câu hỏi: liệu thực sự mìn
  [14:53] kietnht: khoan nha, cái unit test bả đang chưa thắc mắc, mình khoan hãy consider giảm
  [14:54] kietnht: cơ bản có nhiều time hơn thì quality sẽ tốt hơn, còn cái integration test thì phải sửa lại rồi
  [14:55] duongdn: uhm, cái này dạng như 1 non-functitonal requirement, nếu bả consider về cost, thì unit test effort là 1 thứ nên xem xét
  [15:00] duongdn: image.png
  [15:01] duongdn: ---- Tri Nguyen  Về màn hình manage run, nhất là filter, search, sort, nó đang y chang cái Alert cũ  Nên xem xét estimat
  [15:01] duongdn: Hoặc, again, như nãy có nói là giai thích tại sao ko reuse được
  [16:24] anhttl: Tri Nguyen, Kiet Nguyen: Có thay đổi plan priority nha mấy anh. Việc review lại est có thể để sau, giờ mục tiêu vẫn là đ
  [16:29] kietnht: Anh Trinh:  giải thích những điểm này thôi hay giải thích toàn bộ est e?
  [16:29] anhttl: những điểm đó trước nha
  [16:38] kietnht: - "Migration" --> project from scratch , which migration?.  It's the migration to create collections, indexes on Mongo -
  [16:39] kietnht: * - "Migration" --> project from scratch , which migration?. It's the migration to create collections, indexes,.... on M
  [16:39] kietnht: * - "Migration" --> project from scratch , which migration?. It's the migration to create collections, indexes,.... on M
  [16:39] kietnht: * - "Migration" --> project from scratch , which migration?. It's the migration to create collections, indexes,.... on M
  [16:39] kietnht: * - "Migration" --> project from scratch , which migration?. It's the migration to create collections, indexes,.... on M
  [16:41] kietnht: * - "Migration" --> project from scratch , which migration?. It's the migration to create collections, indexes,.... on M
  [16:51] anhttl: Tien Nguyen, Dong Nguyen: mn cho em hỏi chút, thường task BE mn spend khoảng bao nhiêu % giờ dev để viết unit test ấy? c [thread: 23 replies]
    └ [16:52] tiennd2: chắc tùy feature như nào quá, trước đó tui làm thường là bugfix, có thêm feature thì cũng nhỏ nên th
    └ [16:54] anhttl: nói tiếng hơi khó hình dung, vì đâu biết scope task như nào. tính theo & dev nha
    └ [16:54] anhttl: ví dụ với feature nhỏ tầm 4h thì unit test bao lâu á
    └ [16:55] anhttl: hú anh Đông giúp tui cái nha, đang cần hơi gấp chút
    └ [16:55] tiennd2: này thì lẹ, tầm 1 tiếng maximum nha
    └ [16:56] anhttl: ví dụ task 100h thì sao
    └ [16:56] anhttl: =))
    └ [16:56] anhttl: nhỏ quá cũng khó
    └ [16:58] tiennd2: task 100h chia nhỏ ra như trên được ko :v kiểu kiểu v, chứ thực ra làm xong task 100h rồi mới viết t
    └ [16:59] dongnv: Nếu là new feature đi thì tầm 40 - 50% tuỳ vào độ phủ mong muốn. Nếu là improve exísting feature thì
    └ [16:59] kietnht: 4h làm test 1 giờ thì tính %
    └ [16:59] kietnht: xong apply đó vào con số total
    └ [17:00] anhttl: số giờ nhỏ quá tính chênh lệch lắm anh
    └ [17:00] anhttl: nma info anh Đông ok rồi
    └ [17:00] kietnht: ừa, hiện là 30% rồi á
    └ [17:02] dongnv: Quan trọng vẫn là khả năng hiểu feature và review lại test chứ giờ dùng AI mấy model free viết vẫn c
    └ [17:03] anhttl: như ví dụ trên thì AI viết test 10% time, review hết 90% time?
    └ [17:04] kietnht: hệ số viết test này a nghĩ có thể giảm dần đc,
    └ [17:04] kietnht: do càng làm thì càng quen, viết dễ hơn
    └ [17:04] kietnht: lúc đầu 50%, giờ giảm xuống 30% - 20%. I think so
    └ [17:06] tiennd2: thường e để AI scaffold là xem như cover được 50% happy case rồi, còn lại dựa theo đó viết thêm theo
    └ [17:07] tiennd2: e nói case test nha mng, ko phải time spend nha :v
    └ [17:16] anhttl: ok mn
  [16:52] trinm: - Trend chart: hệ thống đang có 1 component gọi là vp-trend-graph nhưng cái này khi reuse theo hướng copy code rồi sửa t
  [16:59] tiennd2: * task 100h chia nhỏ ra như trên được ko :v kiểu kiểu v, chứ thực ra làm xong task 100h rồi mới viết test cho toàn bộ th
  [16:59] trinm: * - Trend chart: hệ thống đang có 1 component gọi là vp-trend-graph nhưng cái này khi reuse theo hướng copy code rồi sửa
  [17:00] kietnht: * ừa, hiện là 30% rồi
  [17:03] dongnv: * Quan trọng vẫn là khả năng hiểu feature và review lại test chứ giờ dùng AI viết test thì mấy model free viết vẫn còn n
  [17:08] tiennd2: * e nói số case test nha mng, ko phải time spend nha :v
  [10:28] anhttl: anh Duong Doan, anh Kiet Nguyen, em remind cái này nha. Thứ 6 mình có issue gấp hơn nên đổi sang hết buổi sáng hôm nay n
  [10:31] duongdn: a có task khác nên hiện chưa start lại nha, mai a start tiếp
  [10:32] duongdn: btw, e nên xem lại deadline, 10h30 e báo và đòi xong trong sáng, nó rất ko hợp lí
  [10:33] anhttl: Hình như anh chưa đọc message em rồi. Em báo lần đầu ngay sau khi họp với anh Năm luôn, tức là từ thứ 5. Với trong mesag
  [13:17] kietnht: a đang cài cái openspec dưới local và test thử nha, cái này thì mỗi dev cần cài rồi  xài thôi, nó sẽ share chung 1 cái s
  [13:18] kietnht: và mình cần 1 cái spec chuẩn trước đã
  [13:18] kietnht: có spec là cái single source of truth rồi thì cơ bản xài cũng như mấy cái agent bt như claude hay cursor này kia thôi
  [13:24] kietnht: dùng mấy cái command của nó như apply, propose này kia
  [13:30] anhttl: spec chia theo milestone hay hay spec cho toàn bộ dự án luôn anh?
  [13:33] kietnht: cái single source of truth specs thì chắc phải là toàn bộ reqs, xong từ đó nó có thể chia ra phases hay mile stone hay p
  [13:34] anhttl: spec có cần theo format gì ko anh
  [13:35] kietnht: đợi tí đang test thử :v nhưng nó gen specs thì phải theo 1 format cụ thể để các thành viên khác trong team sử dụng, requ
  [13:37] anhttl: Vy Tran: Cái này chị follow để support tạo spec nha. Nhìn chung là cũng là requirements thôi. Nếu openspec nó yêu cầu fo
  [15:48] anhttl: Kiet Nguyen: anh check này nha
  [15:48] anhttl: image.png
  [15:49] kietnht: ổng đang nói BE hay FE vậy ta
  [15:49] anhttl: Majd hình như dev BE
  [15:50] kietnht: questions ở đâu á
  [15:50] anhttl: chắc ổng chưa gửi á
  [15:52] kietnht: image.png
  [15:52] kietnht: nếu ổng nói chỗ dưới này thì hình như là config FE
  [16:03] anhttl: cái này là bên dự án khác á, em nhắn anh Trí r
  [16:04] anhttl: ko phải chỗ đó nha
  [16:27] kietnht: ==================================================== Bị nhầm rồi nha ae, Theo như mô tả của OpenSpec, thì cái main spec 
  [16:29] kietnht: bữa a Năm có nói vụ BA involve vào, chắc là cái step /opsx:propose => tạo ra spec, dev sẽ coi spec đó và implement
  [16:31] duongdn: flow trên đúng ròi nha Kiet Nguyen
  [16:33] duongdn: cần document lại các ý trên để làm cho đúng ngoài ra, 2 ý bổ sung - 1: cần 1 spec về commit để mô tả lại ouput chính xác
  [16:34] duongdn: * cần document lại các ý trên để làm cho đúng ngoài ra, 2 ý bổ sung - 1: cần 1 spec về commit để mô tả lại ouput chính x
  [16:34] duongdn: đại loại thế này, 1 branch, commit sẽ dạng thế này nè
  [16:35] duongdn: FEAT: Implement basic auth Ref: - .openspec/require1.md - .openspec/require2.md - .openspec/test1.md - .openspec/test2.m
  [16:35] duongdn: chi tiết lúc có mn sẽ hiểu kĩ hơn
  [09:13] anhttl: anh Tuan Nguyen ơi, scope OP hiện giờ anh check tới phần nào rồi ạ? Mấy phần anh đã check em nghĩ nên collect lại thành 
  [09:20] tuanntg: Bữa giờ a check theo ý của a Kiệt thôi e, bữa cái cuối cùng a check là vụ custom query cho các điều kiên operator min, m
  [09:22] anhttl: mấy cái đó chắc cũng note lại nếu đc á anh
  [09:22] anhttl: với cái License nữa
  [09:24] tuanntg: E muốn document theo kiểu gì? Mình document kiểu API summary lại tàm tạm thôi hay a sẽ phải đi chi tiết rõ cả workflow l
  [09:24] anhttl: collect lại những info mà bữa anh research được á
  [09:25] anhttl: anh cón cái session đó thì nói AI collect lại
  [09:25] tuanntg: Oke e, để a collect lại hết những thứ đã research
  [09:54] duongdn: Hi mn Cho a hỏi cái scope mới mình đã làm rồi phải ko, làm trong các nhánh nào và git flow thế nào vậy A cần nắm để tạo 
  [09:55] kietnht: scope mới chưa làm nha a
  [09:55] trinm: Bên FE có đang làm anh mà Anh Trinh nói chưa push lên
  [09:57] anhttl: Mình đang start trước thôi chứ cus chưa approve, với làm trên repo khách luôn chứ ko phải làm trên repo nội bộ nên em nó
  [09:58] duongdn: OK
  [09:59] duongdn: theo như Kiet Nguyen  nói thì BE gần như chia nhỏ ra vài sub folder FE thì chắc cũng ko khác Nên mình sẽ dùng chung open
  [10:01] trinm: cái mình làm cho scope này thôi hay sao anh [thread: 5 replies]
    └ [10:05] duongdn: Này apply từ giờ luôn á em :)
    └ [10:08] trinm: vậy mấy cái spec này là internal mình hay là push lên cho họ luôn anh, nếu mà push lên cho họ chắc b
    └ [10:09] duongdn: đang suy nghĩ, nhưng có thể chỉ internal thôi
    └ [10:11] kietnht: bên họ là ko có rồi đó, push lên mấy cái specs chắc phải giải thích này kia
    └ [10:12] kietnht: phải làm internal rồi
  [10:02] kietnht: cái a nói đang là mấy cái commit rules, mà nó follow openspec hay sao á a Duong Doan
  [10:05] duongdn: cái đang nói là .... cái nao vậy, đang nói về vị trí spec thôi mà :D
  [10:12] trinm: Bên BE em không rõ nhưng mà em suggest Spec cho FE nằm ở trong folder  precognize-workspace
  [10:14] duongdn: vậy là nên chia BE/FE riêng biệt à ... cũng hợp lí Có điều ko rõ nếu BE ở ngoài nhưng FE lại ở trong thì nó có ảnh hưởng
  [10:23] trinm: em thấy việc giao tiếp giữ BE và FE cũng là thông qua API và socket, chắc BE có cái spec cho mấy cái API và Socket, nằm 
  [10:24] kietnht: BE để ngoài, nhưng name của mấy cái spec mình đặt theo rule, thì nó tìm đúng cái spec thôi
  [10:28] duongdn: Tri Nguyen:  Cái FE hiện đang làm all trong precognize-workspace   à?
  [10:29] trinm: đúng rồi anh nhưng mà không bao gồm thằng Digital-Plant nha anh
  [10:30] duongdn: coi như special case, ok, vậy bỏ openspec của FE vô đó
  [10:32] anhttl: hmmm mà cái OP này cũng có liên quan tới digital plant á anh Trí
  [10:35] trinm: ý là em là liên quan mấy cái UI giống ấy hả
  [10:37] anhttl: Ui giống, với có thể liên quan chỗ internal tag của asset nữa. Tức là cũng có liên quan ít, chắc 5 10 % scope thôi
  [10:40] trinm: nếu muốn bao gôm Digital-Plant  thì spec là source lớn bên ngoài rồi
  [10:42] duongdn: chắc vẫn giữ như cũ đi, theo lí thuyế digital-plant đã dược clone ra độc lập với precompile rồi, có gì thì coi như dupli
  [10:44] duongdn: === Hiện cái branch nào là base của project mình vậy mn ?
  [10:45] kietnht: mọi feature đều checkout từ develop nha a
  [10:46] duongdn: ok
  [13:16] kietnht: image.png
  [13:17] kietnht: Ví dụ về cái spec delta mà openspec gen, nó có các mục requirements, trong requirements chia thành các scenario
  [14:02] samht: Anh Trinh: có task nào cho a làm k em úi, giờ a đang có giờ
  [14:07] anhttl: Tri Nguyen: anh setup project tới đâu rồi
  [14:09] trinm: đang làm mấy component share em, chắc cho anh Sâm làm phân bên License đi cái đó chưa làm bên source mới thì phải
  [14:11] anhttl: Sam Ha: hú, là cái trên anh Trí nói nha anh
  [14:11] anhttl: mà làm thôi, khoan push nha
  [14:11] anhttl: 2 dev làm chung vậy mà ko push có sao ko ta. nếu cần thì nhờ anh Dương setup repo internal ⚠️
  [14:12] kietnht: 2 phần đó chắc làm song song đc
  [14:13] trinm: ừa thấy License làm bên source projects/admin-ui chưa liên quan projects/optimization-ui
  [14:33] duongdn: https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/tree/nus-base
  [14:34] duongdn: Hi mn,  A mới push lên cái này, đây là quy trình apply OpenSpec cho team mình, mn check nha Có gì thắc mắc hoặc đóng góp
  [14:37] duongdn: đặc biệt bên Kiet Nguyen  nha, a ko làm BE nên ko có đủ context, chỉ làm git flow theo kinh nghiệm
  [14:37] kietnht: image.png
  [14:38] kietnht: e dùng acc Brian ko vào đc nha a Duong Doan
  [14:38] duongdn: này github local của mình á
  [14:38] duongdn: của nus
  [14:39] duongdn: thôi để a add brian vô cho em tiện xem, đỡ dùng 2 nick
  [14:39] duongdn: done, added
  [14:50] samht: Anh Trinh: cho a xin cái link task License vs em
  [15:08] anhttl: Vy Tran: chị xem nha [thread: 7 replies]
    └ [15:09] vytth: link reqs gốc á hở em hay ticket ben mình á
    └ [15:09] anhttl: chị hỏi xem anh Sâm cần gì á
    └ [15:11] samht: a cần context để làm nha, bữa giờ  aout-dated vs project này r
    └ [15:12] vytth: vậy e đưa a cái wbs của license với figma nha, ticket hiện tại chưa cóa, e update sau
    └ [15:12] samht: ok ngon á, cho a 2 cái link đó đi
    └ [15:17] anhttl: ticket thì chị đưa cái cũ của họ đó chị
    └ [15:17] anhttl: webs thì ngắn gọn quá
  [15:09] vytth: * link reqs gốc á hở em hay ticket ben mình á Anh Trinh
  [15:11] samht: * a cần context để làm nha, bữa giờ a out-dated vs project này r
  [15:12] vytth: * vậy e đưa a cái wbs của license với figma nha, ticket task hiện tại chưa cóa, e update sau
  [15:25] kietnht: hiện e thấy ok nha, quá trình làm có gì update sau
  [15:25] duongdn: nếu ok thì có thể apply từ giờ :)
  [15:25] kietnht: ok a
  [15:27] vytth: Lụm nha a Sam Ha  WBS: [Link](https://docs.google.com/spreadsheets/d/1xQ_KbUzQdEp0mXpofRNQ6XUj1CfQPsyJjZJygRPYMbI/edit?p
  [15:28] kietnht: e nói git flow vs BE thôi nha :v, Tri Nguyen  coi thử có feedback gì ko, ko thì apply luôn, bên Sầm nữa :v [thread: 4 replies]
    └ [15:30] trinm: Vụ này em chưa có làm nhiều cũng chưa đánh giá được thôi cứ làm theo workflow đó đi nào có issue mìn
    └ [15:31] trinm: ý mà em thấy folder .claude có skill cho claude thôi dùng cho thằng khác phải tạo folder riêng thì p
    └ [15:36] duongdn: để a update lại, này a setup cho claude nhưng nó nên global hơn
    └ [15:45] duongdn: done
  [16:06] kietnht: summary lại vụ timeline là sao dị Anh Trinh , mới đi vô chưa biết vụ gì á :v
  [16:06] tuanntg: Mình có link Doc hay Drive nào chung cho dự án không e Anh Trinh
  [16:06] tuanntg: a upload lên cho private
  [16:07] tuanntg: a tạo bằng acc nus của a sợ sau này nó bay màu :))
  [16:07] anhttl: anh để tạm file cứng ở đây nha, để em nói bả share confluence
  [16:09] tuanntg: License_Service_Docs.md
  [16:10] tuanntg: a mới tổng hợp xong vụ license này thôi
  [16:18] kietnht: Sam Ha:  start làm task có nắm cái này chưa? nó spec driven development, nó sẽ khác luồng lv bình thường vs AI :v
  [16:21] samht: t có đang xài superpowers, chắc cũng tương tự openspec nhỉ
  [16:21] kietnht: gần gioongs, mà nguyên team đang dùng openspec
  [16:21] kietnht: chuyển qua đi cho consistent
  [16:22] anhttl: @room Nhìn chung cũng gần như là approve project OP rồi, còn đang thảo luận 1 chút về timeline. Em suggest mình book họp ⚠️
  [16:23] anhttl: theo time của anh Duong Doan cho tiện nha mn
  [16:27] duongdn: a sao cũng được, mà mọi người đọc readme hiểu ko, có cần họp gì ko
  [16:28] anhttl: Em nghĩ họp để kick off cho dễ nắm á
  [16:30] duongdn: ờ
  [17:16] anhttl: Kiet Nguyen, Tri Nguyen: giá sử giờ start luôn, mn cần bên bả đưa cái gì để làm được? + Repo, vị trí cần code? --> Chắc 
  [17:17] anhttl: Bả ok để start rồi nha, khỏi giả sử =))
  [17:17] kietnht: hiện tại thì như các scope trước thôi e, chưa thấy cần thêm gì á =))
  [17:17] anhttl: > Gitflow, deployment?  này có chưa
  [17:17] kietnht: hiện tại nếu có gì chắc deploy trên cái server internal đã
  [17:18] kietnht: còn khi algo ready, như ông Kfir có đề cập, thì cần server họ setup
  [17:18] trinm: Bên FE chắc cũng deploy như active thôi
  [17:20] kietnht: Tien Nguyen:  Tuan Nguyen   có dùng qua openspec chưa nhỉ
  [17:20] kietnht: coi trước qua giúp a nha
  [17:20] tiennd2: em có rồi nha anh
  [17:23] anhttl: Vậy 9h sáng mai mình họp ở 3L để kickoff luôn nha mn @room
  [08:38] samht: Nay a off sáng nha Anh Trinh ơi
  [08:44] kietnht: vậy cái này sao á, chuyển qua đầu giờ chiều hả
  [08:52] anhttl: Cái openspec thì đổi sang chiều cũng được. 9h30 mình vẫn họp kickoff dự án nha. Nay anh Tuấn đi trễ
  [08:53] anhttl: anh Duong Doan lát join luôn nha anh
  [09:15] anhttl: anh Duy Vo họp luôn nha
  [09:30] kietnht: go?
  [09:30] kietnht: hình như Tuấn chưa vô hả :v
  [09:47] anhttl: Note: - Tổng quan dự án:   + fixed-cost, deliver theo milestones, mỗi milestone có 1 chặn trên budget.   + Làm > bàn gia
  [09:55] anhttl: * Nội bộ: Review chéo --> anh Dương sẽ suy nghĩ thêm về quy trình chi tiết hơn. ⚠️
  [10:02] anhttl: Anh Dương sẽ là người chịu trách nhiệm đảm bảo có review chéo và chịu trách nhiệm review code cho team. ⚠️
  [10:03] anhttl: Repo: Dùng repo internal
  [10:06] anhttl: * Repo: Dev dùng repo internal rồi anh Dương push qua repo external
  [10:13] anhttl: anh Kiet Nguyen ơi, giờ bên BE có anh Tuấn với Tiến start thì anh có còn cần chuẩn bị gì nữa ko?
  [10:15] tiennd2: nếu đúng thì chỉ cần có thêm setup openspec nữa là có thể nhảy vào ngay mà đúng k mng
  [10:57] kietnht: - Tuấn tiếp tục vs cái license - Tiến chắc update các API như search tag, làm API return list asset cho tags
  [10:59] anhttl: anh Tuan Nguyen start implement cái license nha. Tien Nguyen để đầu h chiều rồi bạn qua nha. Chị Vy distribute.
  [11:00] kietnht: yes, nhuwnga nghĩ e cần có time để hiểu reqs cho cái scope này, ko phải nhảy vào mà code liền đc đâu.  làm BE mà ko hiểu [thread: 1 reply]
    └ [11:02] tiennd2: okay a
  [11:07] tuanntg: Dùng account nào để log IDE đây ae
  [11:07] tuanntg: Tien Nguyen:  có acc không e
  [11:08] tiennd2: em chắc dùng tom@nus thôi quá
  [11:08] tiennd2: * anh chắc dùng tom@nus thôi quá
  [11:08] tiennd2: ủa mà trước đó anh dùng tom@nus luôn mà a Tuấn
  [11:08] duyvna: Chiều nay Anh Trinh Vy Tran distribute scope đầu tiên cho a để chuẩn bị Tcs luôn nha [thread: 1 reply]
    └ [13:35] duyvna: khi nào mình bắt đầu đc Vy Tran
  [11:08] tuanntg: Hết sub rồi e
  [11:08] tiennd2: aycha
  [11:08] tiennd2: v hết acc rồi :v
  [11:16] anhttl: push code lên internal là mình dùng acc cá nhân (tiennd2) hay là acc alias vậy mn
  [11:17] kietnht: BE thì cứ dùng Brian thôi
  [11:17] kietnht: setup 1 acc nữa chi cho phức tạp á
  [11:17] kietnht: view bả có 1 BE thôi mà?
  [11:24] anhttl: view bả thì là 2 dev BE, nhưng mình nói bả là mình đại diện push code cũng được
  [11:25] kietnht: vaayj về cái account cứ dùng Brian
  [11:25] anhttl: Nhưng nội bộ nhìn vô cũng cần biết ticket nào của ai, chắc tạm cmt tên dưới ticket
  [11:26] kietnht: hmmm nếu vậy, bên mình Tiến vs Tuấn đang ko có license cho cái IDE
  [11:26] kietnht: cái này kêu bả cấp đc ko ta
  [11:26] anhttl: IDE nào cơ
  [11:26] kietnht: a thì có license rồi
  [11:26] kietnht: @@
  [11:28] anhnvn: Vấn đề IDE thì có dev BE Java gặp thôi à mn?  Và acc này thì khả năng share nhiều ng có dc ko? Trước đó thời Tiến còn là
  [11:28] kietnht: e chưa nắm cái context này chắc để a NA giải thích đi, thấy ảnh dang typ
  [11:28] anhnvn: Hiện tại là Đông vẫn còn làm và dùng acc do họ pay
  [11:29] kietnht: nếu dùng đc thì chắc cứ dugf của Đông :v
  [11:33] anhttl: anh Tri Nguyen làm shared component nào r
  [11:35] trinm: Button , Tooltip, input number stepper, Date Pipe
  [13:27] tuanntg: hú hú Dong Nguyen
  [13:27] tuanntg: .
  [13:32] dongnv: Đúng rồi anh, em có thả icon mà chắc anh Tuấn ko thấy 😅.
  [13:33] anhnvn: Chủ yếu việc share acc đó có làm dc ko. Giờ mình có đến 4 người cần dùng tính cả Đông. Nếu ko được thì quay lại việc họ 
  [13:36] dongnv: Giờ nếu target là anh Tuấn muốn login vào acc David thì nhờ anh Năm share acc Jetbrain của David qua là được. Em mới đọc
  [13:36] dongnv: * Giờ nếu target là anh Tuấn muốn login vào acc David thì nhờ anh Năm share acc Jetbrain của David qua là được. Em mới đ
  [13:36] kietnht: ko biết nó có track usage gì qua cái account ko
  [13:37] vytth: 2g30 anh Sam Ha Duy Vo Tien Nguyen xuống 3L e distribute context scope mới nha [thread: 11 replies]
    └ [13:42] vytth: op-scope-summary.md
    └ [13:43] vytth: đọc giúp e cái file summary nắm trước overall nha mn, tí e vô details trên figma Sam Ha Duy Vo Tien 
    └ [13:52] tiennd2: sao có anh Duy Vo nữa thế, em thấy ảnh meeting toàn bấm điện thoại
    └ [13:53] duyvna: Vy Tran: a thấy cũng đông á có gì e book phòng họp luôn cho tiện trao đổi nha, với sẵn nhắc nhớ tham
    └ [13:53] tiennd2: cần gì, distribute xong em với anh ở là họp tiếp
    └ [13:54] samht: Duy Vo: a đã trải qua những gì để phải nhắc nhở như thế kia
    └ [13:54] tiennd2: em có nhiều chuyện muốn nói với anh lắm
    └ [13:54] duyvna: chứ sáng mà nhìu người đợi 1 người a đi té re
    └ [13:54] tiennd2: lỗi em được chưa
    └ [13:55] vytth: em nên theo phe nào anh Sam Ha
    └ [13:55] samht: phe anh nè, kệ *** 2 ng đó đi
  [13:37] kietnht: mắc công có mấy cái data bất thường thì mệt
  [13:37] vytth: * 2g15 anh Sam Ha Duy Vo Tien Nguyen xuống 3L e distribute context scope mới nha
  [13:37] anhttl: Tiến còn chưa có context gì á, giờ Tiến làm gì chị Vy
  [13:39] dongnv: Thằng nào cũng track được hết anh, như con Any Desk nhìn khá ghẻ nó cũng track được ạ, thì Jet Brain nó còn có khả năng 
  [13:42] kietnht: đúng hay ko đúng nó còn dựa vô cái context hiện tại nữa, giả sử họ cho phép dùng 1 acc để share và bên Jetbrain nó chưa 
  [13:43] vytth: * đọc giúp e cái file summary nắm trước overall nha mn, tí e vô details trên figma Sam Ha Duy Vo Tien Nguyen
  [13:44] kietnht: đúng hay ko đúng e nói ở đây là cái ddingj nghĩa của Jetbrain thôi
  [13:45] tuanntg: Theo e nói 1 acc multi device được thì này multi device đều là NUS mà
  [13:45] tuanntg: Đâu phải lúc ng gì ?
  [13:46] tuanntg: * Đâu phải khác ng gì ?
  [13:46] tuanntg: * Đâu phải khác người gì ?
  [13:47] dongnv: Em nghĩ chia theo role là hợp lý ạ. Có Brian, có David, vậy thì 2 acc. Giả sử detect theo git đi, nó vấn trùng git là Da
  [14:03] anhttl: Duy Vo: Bên QC có thêm ai nữa ko anh
  [14:04] duyvna: có thêm a Đạt nữa nha e
  [14:05] anhttl: Sao chị Bình chưa nói gì ta, em chưa nghe nói gì
  [14:07] duyvna: a Đạt tham gia để có gì hỗ trợ thêm quy trình testing cho tốt hơn thôi chứ k phải trực tiếp test ở bên đây, còn sau này 
  [14:08] kietnht: a Đạt nào dị :v
  [14:09] duyvna: lát gặp đi cho bất ngờ
  [14:10] kietnht: e ko có nhu cầu bất ngờ nha a :v
  [14:10] tiennd2: thực ra nghĩ tới team QC thì em chỉ nghĩ tới 1 người tên D [thread: 1 reply]
    └ [14:12] duyvna: xin lũi vì dặm bùa e hơi quá liều, để a kêu thầy đổi bùa khác
  [14:10] tiennd2: ai khác thì em cũng k biết [thread: 1 reply]
    └ [14:12] duyvna: câu nói này hơi bị vô tâm rồi đó
  [15:15] tuanntg: Anh Trinh:  coi giúp a là xin được bả file .key mới cho kiểu license vừa có Op vừa monitor không nha. Để a hình dung cấu
  [15:16] tuanntg: * Anh Trinh:  coi giúp a là xin được bả file .key mới cho kiểu license vừa có Op vừa monitor không nha. Để a hình dung c
  [15:16] kietnht: Tuan Nguyen: file bữa a gửi hog xài đc hả
  [15:16] kietnht: OP là cái mới mà sao bả có đc á
  [15:17] tuanntg: Nó chỉ có Monitor thôi à a
  [15:17] tuanntg: Nhưng file key là bên bả gen hay mình gen này mình chưa rõ
  [15:17] anhttl: image.png
  [15:17] tuanntg: e nghĩ khả năng là bên bả gen
  [15:18] anhttl: Tri Nguyen, Kiet Nguyen: mn coi checkout đúng nha, coi 2 mesage đầu tiên của abr
  [15:18] anhttl: `See ther installation id microk8s.kubectl exec -it pod/license -- bash -c "set | grep PRECOGNIZE_INSTALLATION_ID"` [thread: 1 reply]
    └ [15:37] tuanntg: a không hiểu này lắm, này là command để bả xem installation id thôi chứ không phải xem thooing tin f
  [15:20] kietnht: file cũ e decrypt nó ra gì
  [15:26] anhttl: anh Kiet Nguyen ơi, giờ anh làm task nào dị, đang lên spec chung hả
  [15:26] anhttl: Tri Nguyen: anh lên spec cho FE chưa
  [15:27] tuanntg: ``` {                                                                                                                   
  [15:29] kietnht: Tuan Nguyen: licenseId chắc nó là 1 record gì đó trong db hả
  [15:30] trinm: lên spec cụ thể là cái gì nhỉ mỗi lần change thì nó tạo spec ra thôi anh có tạo PR ở đây nè  https://github.com/nustechn
  [15:30] tuanntg: Không a, nó lưu nhiều chỗ lắm á [thread: 3 replies]
    └ [15:30] tuanntg: Nó sẽ lưu kiểu nguyên cái file .key license làm tham chiếu gốc
    └ [15:31] tuanntg: Trong đó mỗi lần mình gọi API lấy thông tin license nó sẽ đi vào check file này và láy các field tro
    └ [15:32] tuanntg: Nó chỉ lưu có đúng 1 model là license history lưu các thông tin cơ bản chủ yếu để track log thôi
  [15:33] anhttl: Tri Nguyen: em ko biết phải làm gì. nếu mn cũng ko biết phải làm gì thì giờ thuận theo chiều gió thôi ~~ https://precogn
  [15:35] anhttl: Để dễ chia task thì em chia như này nha: + Tuấn, Tiến: Tom + Kiệt: Brian + Trí: Aron + Sâm: Ken Trên jira là như vậy, cò
  [15:37] kietnht: ==== hiện tại mỗi người đang làm task độc lập thì đâu có spec chung gì e. mỗi dev làm thì là proposal, là cái delta spec
  [15:38] anhttl: vậy nó có bị kiểu mỗi người làm 1 kiểu ko
  [15:44] kietnht: nếu e muốn chắc request a Dương review FE đi, có thể review spec trước khi apply implement, nhưng a nghĩ sẽ tốn time hơn ⚠️
  [15:45] anhttl: Giờ khoan cái đó cũng được, nhưng giờ clear giúp em mỗi người đang làm task nào với.
  [15:46] trinm: Screenshot 2026-09-30 at 15.46.17.png
  [15:46] trinm: anh đang làm mấy cái này
  [15:47] kietnht: BE: - a đang init services mới, tạo các thực thể trong db - Tuấn làm bên license - Tiến làm API [thread: 3 replies]
    └ [15:50] tuanntg: Anh Trinh: Cụ thể a đang check vụ generate ra .key file nó đang là bên nào làm, workflow như nào nha
    └ [15:51] anhttl: Chị Vy Tran tạo 2 task placeholder cho anh Tuấn với anh Kiệt trên board giùm em nha, để biết mn đang
    └ [15:52] vytth: oki e
  [15:47] kietnht: * BE: - a đang init services mới, tạo các thực thể trong db - Tuấn làm bên license - Tiến làm API liên quan search tag, 
  [15:48] kietnht: Tien Nguyen:  e biết là làm gì chưa?
  [15:49] tiennd2: chờ e xíu a Kiệt ơi, nãy Lan Anh nói em làm ticket liên quan đến search Tag
  [15:51] anhttl: Chắc anh wrap up cái đnag dang dở lại rồi em cái em mới gửi link ở trên ấy. Có cái để QC test dần dần, khi nào đụng tới 
  [15:52] trinm: hình task này cũng nằm trong cụm shared luôn thì phải  https://precognize.atlassian.net/browse/OP-11
  [15:54] anhttl: Nói chung là em muốn làm phần create model trước đó. Nó gồm các task này: + https://precognize.atlassian.net/browse/OP-1 [thread: 1 reply]
    └ [15:55] trinm: ok nha
  [15:55] anhttl: Thì sẵn anh làm shared component, giờ create model đang cần cái tag picker nên anh làm trước cái đó đi, rồi qua chùm đó
  [16:07] kietnht: thêm cái chỗ này chút, điểm cốt yếu là chia task thôi. nếu 2 người làm 2 task độc lập, thì cứ apply full flow như: propo
  [17:15] kietnht: image.png
  [17:15] kietnht: Anh Trinh, Vy Tran send lại giúp a chỗ định nghĩa cách tính của các function trên nha [thread: 5 replies]
    └ [09:25] vytth: Screenshot From 2026-10-01 09-25-29.png
    └ [09:26] vytth: Kiet Nguyen: cai nay du chua anh
    └ [09:26] vytth: hay cân details hơn
    └ [09:27] anhttl: Cái này bữa chị off có nhắn đó. Cái này mình hiểu sai rồi
    └ [09:27] vytth: để c check lại
  [17:15] kietnht: Step data exclusion của craete OP
  [17:16] kietnht: * Step data exclusion của create Op model
  [09:24] kietnht: hú Vy Tran  :v
  [09:27] anhttl: Nay em off sáng nha
  [09:28] anhttl: image.png
  [09:28] anhttl: Này đủ hơn nè
  [09:28] anhttl: image.png
  [09:39] tiennd2: vụ tag search mình còn giữ cái search bằng "****" ra all tags ko zị mọi người cc. chị Vy Tran , Anh Trinh
  [09:40] anhttl: Có nha Tiến
  [09:40] tiennd2: ok lun
  [09:41] tiennd2: welcome back a Phong
  [09:41] anhttl: Anh Phong Tran qua làm bên này full FE nha mn. Chị Vy Tran sắp xếp transfer lại với chia task nha.
  [09:42] anhttl: anh Tri Nguyen ơi giờ chia cho anh Phong làm cái nào là ok á?
  [09:42] vytth: anh Phong Tran có context về app này trc chưa á
  [09:42] vytth: sao welcome back :v
  [09:43] anhttl: Có làm được 1 vài tuần á chị
  [09:43] phongtb: hình như dưới 20h á 🙌 nên ko nắm gì hết đâu
  [09:44] tuanntg: qua nắm đầu a Sam Ha  dùm a là đc rồi e
  [09:44] samht: m có API chưa?
  [09:45] phongtb: ae nào hướng dẫn e setup project với
  [09:46] vytth: xong cái này rồi qua e distribute nha
  [09:46] samht: 
  [09:57] anhttl: Vy Tran: Chắc cho anh Phong làm phần run table với mấy cái xung quanh đó như sort, search, filter đồ nha chị. Tạo task g
  [09:59] trinm: ok em nào mà bắt đầu làm thì Phong Tran qua anh nói mấy cái lưu ý về UI nha
  [10:00] anhttl: Phong Tran, Sam Ha: mn lưu ý dùng openspec nha. anh nào nói cho ảnh về cái này luôn giúp em
  [10:00] samht: okie em oi
  [10:09] duongdn: README có đầy đủ, làm theo step là được
  [10:28] kietnht: tới 3 dev FE, cẩn thận vụ làm trùng, duplicate code, component các kiểu nha ae :v
  [10:59] tiennd2: https://precognize.atlassian.net/browse/OP-22 `Tags connected to a data source with at least x months of data` cái `x mo
  [10:59] tiennd2: * https://precognize.atlassian.net/browse/OP-22 `Tags connected to a data source with at least x months of data` cái `x 
  [11:03] vytth: là lấy data của tag chứ ta
  [11:05] phongtb: Hi Vy Tran , a làm với alias nào á e
  [11:05] vytth: ảnh làm Aron nhỉ e Anh Trinh
  [11:09] anhttl: Chắc anh dùng Harry hoặc là Ryan đi. Anh có acc nào r
  [11:10] phongtb: A mới clone đỡ bằng Ken
  [11:10] anhttl: thôi dùng acc nào cũng đc, nhưng trên Jira thì anh xem task bằng role Ryan đi nha
  [11:11] anhttl: * thôi dùng acc nào cũng đc, nhưng trên Jira thì anh assign task cho anh là role Ryan nha
  [11:11] phongtb: E list ra giùm a bên này cần những account nào để a xin a Năm nha
  [11:12] anhttl: Figma với Jira anh dùng gg Ken để vô nha
  [11:13] trinm: đây nha anh Kiet Nguyen
  [11:16] anhttl: - Tuấn, Tiến: Tom - Kiệt: Brian - Trí: Aron - Sâm: Ken - Phong: Ryan
  [13:28] kietnht: check thử nha Tri Nguyen
  [13:29] trinm: ok có rồi nha anh
  [14:21] vytth: Screenshot 2026-10-01 at 14.18.22.png
  [14:21] vytth: cái search tag mình có tìm dc luôn cái unit của tag đó ko mn, để show ở expression review này nè Tien Nguyen Kiet Nguyen
  [14:21] tiennd2: được nha chị
  [14:22] tiennd2: à cái units
  [14:22] tiennd2: e check thì 1 tag nó lưu nhiều units nha, ko phải 1 unit thì phải
  [14:23] vytth: cho chị xem thử 1 cái vs
  [14:23] tiennd2: để e gửi hình
  [14:26] tiennd2: image.png
  [14:27] tiennd2: ở /process-digital-plant, edit measurement type thì mình được chọn nhiều units nha
  [14:27] tiennd2: trong database của mình cũng đang lưu nhiều units luôn
  [14:30] vytth: ý là 1 tag có 1 measurement type, 1 measurement type có nhiều units hả ta. Vậy function sum (Tag A, Tag B) với mỗi tag c
  [14:31] tiennd2: đúng rồi chính xác nha chị 1 tag có thông tin của 1 measurement type, measurement type này có nhiều units
  [14:32] tiennd2: cái units em show là existing lâu lắm rồi nha, ko biết ở UI mới thì nó là một field hay định nghĩa khác gì ko
  [14:33] tiennd2: * cái units em show trên hình là existing lâu lắm rồi nha, ko biết ở UI mới thì nó là một field hay định nghĩa khác gì k
  [14:33] tiennd2: * cái units em show trên hình là existing lâu lắm rồi nha, ngoài ra ko có chỗ nào hiện tại liên quan đến unit, ko biết ở
  [14:34] anhttl: image.png
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
