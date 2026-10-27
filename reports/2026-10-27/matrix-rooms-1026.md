# Matrix — since 2026-10-20 07:00 +07:00

### Arthur - Meta-Stamp — 57 messages
  [13:38] phucvt: Nam Tran Ổng nói khi mình start R1 thì ổng chuyển tiền mà nay thấy ổng im ru. Có cần message nhắc ổng ko anh?
  [13:47] namtv: Có nha
  [15:55] namtv: Ah, hôm qua anh có tạo project mới trên WS rồi nha: https://workstream.nustechnology.com/admin/projects/cmvexs7ei0h8gpp1
  [15:56] namtv: Effort từ cái R1 chuyển qua project mới. Còn những cái bugs biếc gì đó của cái phần $1701 còn lại thì bên cũ
  [15:57] namtv: Với hỏi thăm ổng test sao rồi
  [16:01] phucvt: Ok anh
  [08:48] duongdn: Cus báo đã chuyển tiền nha Nam Tran
  [08:48] duongdn: Phuc Vo:  Coi mấy msg về task, nhất là cái cuối về release time, 1 dạng hỏi progress á Về code chắc a ko nắm flow, chứ g
  [08:48] duongdn: * Phuc Vo:  Coi mấy msg về task, nhất là cái cuối về release time, 1 dạng hỏi progress á Về code chắc a ko nắm flow, chứ
  [08:49] duongdn: * Phuc Vo:  Coi mấy msg về task, nhất là cái cuối về release time, 1 dạng hỏi progress á Về code chắc a ko nắm flow, chứ
  [08:50] namtv: Vụ để local cẩn thận nha 😐️ Ngoài vấn đề progress thì gần đây vài vụ bay code mấy ngày rồi, hư ổ cứng, laptop bơi trên 
  [08:52] phucvt: Ok anh. Để e push lên liền, tránh issue 🙏
  [08:53] phucvt: Em đã reply ổng nha
  [07:55] namtv: Mình có dùng Railway phải ko anh em?
  [08:38] phucvt: Đúng rồi anh Nam Tran
  [08:39] namtv: Xem mail "Urgent: Railway Security Disclosure - Rotate Credentials" nha. Cần rotate các key trong env vars ngay
  [08:41] duongdn: ngày gì mà issue liên tục vậy chài ...
  [08:45] namtv: Có khi nó dùng PHP và đã dính chưởng ấy
  [09:29] namtv: Có gì cần rotate ko và rotate chưa Phuc Vo ? Có gì cần ổng (ví dụ key là ổng cung cấp, mình ko tạo key mới được) thì dí 
  [09:33] phucvt: Có nha anh. Stripe, Mongo, GoogleAuth, Auth0... em xử lý Stripe và Mongo rồi. Em đang thực hiện deploy thử trên staging 
  [09:33] phucvt: Em dò từng cái, có cái nào chưa có quyền access là e báo ổng liền
  [09:34] namtv: Railway giờ ko build được đâu. Nhưng nó vẫn nói cần rotate nên chắc vẫn update và apply env vars được. Anh chưa dùng Rai
  [10:06] phucvt: Em mới check thì phải build mới apply env được. Nên chắc cứ rotate trước rồi update vào Railway. Xong đợi Railway up rồi
  [10:06] namtv: Cái này cũng đồng nghĩa với app tạch, cần nói rõ ổng
  [10:06] phucvt: Ok anh
  [10:07] namtv: Railway có vẻ cũng vả, incident 1 ngày rồi chưa resolved được ☹️
  [10:08] phucvt: Nãy báo 03:00 UTC, giờ hẹn tiếp lên 03:45 UTC rồi anh. Chắc sẽ xong sớm 🙏
  [10:08] phucvt: * Nãy báo 03:00 UTC xử lý xong, giờ hẹn tiếp lên 03:45 UTC rồi anh. Chắc sẽ xong sớm 🙏
  [11:39] phucvt: ✅ Đã rotate key: Stripe (secret key + webhook secret), Auth0 client secret, SECRET_KEY. Chưa deploy. ✅ Đã đóng public ac
  [11:40] phucvt: Em report status bên này nha
  [11:40] phucvt: * ✅ Đã rotate key: Stripe (secret key + webhook secret), Auth0 client secret, SECRET\_KEY. Chưa deploy. ✅ Đã đóng public
  [11:44] phucvt: * ✅ Đã rotate key: Stripe (secret key + webhook secret), Auth0 client secret, SECRET\_KEY. Chưa deploy. ✅ Đã đóng public
  [13:36] phucvt: * ✅ Đã rotate key: Stripe (secret key + webhook secret), Auth0 client secret, SECRET\_KEY. Chưa deploy. ✅ Đã đóng public
  [13:36] phucvt: * ✅ Đã rotate key: Stripe (secret key + webhook secret), Auth0 client secret, SECRET\_KEY. Chưa deploy. ✅ Đã đóng public
  [13:38] phucvt: Em update status nha. Em quay lại làm task tiếp trong thời gian chờ deploy lại Railway và cus cung cấp các keys chưa rot
  [14:38] namtv: Ổng có nói gì về thanh toán khoản 1701 chưa nhỉ (hôm qua nói do daily limit nên chưa gửi được, hôm nay gửi)? CHưa thì re
  [14:40] phucvt: Chưa nha anh. Để em remind
  [17:07] phucvt: Update: Em đã push R1 + B1 + Rate limit lên staging. Giờ đang nằm trong deploy queue của Railway. Hi vọng mai lên được, 
  [08:33] phucvt: > On the $1,701 — I'm so sorry, I said yesterday and then today, and it's actually neither. My bank won't clear the tran
  [13:35] phucvt: * ✅ Đã rotate key: Stripe (secret key + webhook secret), Auth0 client secret, SECRET\_KEY. Chưa deploy. ✅ Đã đóng public
  [13:36] phucvt: Em update status nha. Về R1 thì em đã deploy staging + test. Đã báo Chris. Giờ em qua James - DefinitiveGuide làm.
  [13:53] phucvt: Duong Doan Cus có share account AWS, em gửi để anh sync vault nha
  [13:56] duongdn: ko, gởi Năm
  [08:46] phucvt: Nam Tran: Cus có thanh toán $1,701 cho mình rồi nha anh
  [08:49] namtv: OK em
  [08:44] namtv: Time xử lý issue Railway tuần trước đúng ra cần log hourly tag để charge nha. Ngoài ra: - Có dòng mix cả phần Railway và
  [08:49] phucvt: > Có dòng mix cả phần Railway và task khác, sao log gì ngộ vậy? Liên quan gì nhau nhỉ? Ko phải là gom hết tasks mỗi ngày
  [09:10] namtv: Update, tách ra nữa, do liên quan giờ charge
  [10:01] phucvt: Ok anh Chắc nhờ anh Duong Doan hay anh Tien Nguyen tạo giúp em cái hourly tag nha. Để update thêm tag cho đúng luôn
  [10:08] duongdn: Tien Nguyen:
  [10:09] tiennd: done
  [10:09] tiennd: đã tạo Chris-Hourly nha
  [10:18] phucvt: Thanks anh Tiến
  [10:19] phucvt: Nam Tran Duong Doan Em update thêm tag và tách giờ Railway issue ra rồi nha
  [10:20] namtv: >Effort cho Railway cao quá, rất khó giải thích. Dương review với Phúc xem và xác định giờ charge phù hợp Này nữa nha Du
  [10:20] namtv: Tien Nguyen chú ý, em là DM, việc này đúng ra em phải phát hiện chứ ko phải ai. Thấy chị Bình nhắc hàng tuần việc review
  [10:21] namtv: * Tien Nguyen chú ý, em là DM, việc này đúng ra em phải phát hiện chứ ko phải anh hay finance. Thấy chị Bình nhắc hàng t
