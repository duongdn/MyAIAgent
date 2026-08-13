# Matrix — since 2026-08-10 08:15 +07:00

### Arthur - Meta-Stamp — 41 messages
  [08:57] namtv: Bên này còn gì nhiều ko Phúc? Cỡ bao lâu nữa xong?
  [08:57] namtv: * Bên này còn gì nhiều ko Phúc? Ông này gửi feedback là dài ngoằng mà anh ko biết nó gồm những gì. Cỡ bao lâu nữa xong?
  [08:58] namtv: Ông nội này nhiều khi gửi message cả tờ A4 mà bản chất có mỗi 1 issue 😐️
  [09:01] phucvt: Không nhiều á anh, chắc trong sáng nay em done
  [09:02] phucvt: Ổng cứ thêm vài cái lắc nhắc như đợt trước. Nay xong không biết ổng có thêm nữa ko
  [09:06] phucvt: Nam Tran: Ổng có gửi lại cái INTELLECTUAL PROPERTY ASSIGNMENT trong DM, anh xem có cần kiểm tra hay lưu lại file đó hay 
  [09:06] namtv: OK em
  [09:58] phucvt: Nam Tran: Tình hình là em đã deploy M3 lên production. Chris đã test và tạo Wise track để thanh toán cho mình.  Ngoài ra
  [09:58] namtv: Theo report thì phần fixed cost mình đã làm 116:30, sao nhiều dữ ta 🤔 Xem lại xem mọi người đã log đúng tag trên Workst
  [09:59] phucvt: Ok anh, để e check lại xem
  [10:00] namtv: >Feedback từ Tommy, trước đó mình có nói sẽ xem sau khi hoàn thành M3. Chắc xong cái số 1 thì e qua xem cái này luôn nha
  [10:03] namtv: Chắc tối em spend thêm chút time để xem nó là gì, cần phản hồi ổng thế nào nha
  [10:11] phucvt: Em có check bên em rồi, từ ngày 23/07 tới nay là em chỉ làm scope fixed này. Nên em log đúng tag rồi
  [10:47] tiennd: dạ em review là log đúng scope ạ
  [10:47] tiennd: * dạ em confirm là log đúng scope ạ
  [11:10] tiennd: anh Nam Tran ơi, bên Chris chắc mình gửi với template freelance hả anh
  [11:10] tiennd: * anh Nam Tran ơi, vụ thông báo ngày off bên Chris chắc mình gửi với template freelance hả anh
  [11:23] namtv: Bên này từ từ nha, do chưa biết sắp tới sao. Có khi hết luôn rồi thì ko cần báo
  [11:23] tiennd: dạ em chỉ báo bên Arthur trước thôi, chưa báo bên Chris
  [15:45] namtv: ủa, ổng hú gì kìa Phuc Vo
  [15:45] namtv: Mà message ổng mình ko trả lời gì thì hơi kỳ nha 😐️
  [15:45] phucvt: Để e check nha anh
  [15:48] phucvt: Chắc mình chưa rep nên ổng tưởng mình chưa nhận được message. Để em reply ổng 🙏
  [23:06] phucvt: Em report 2 cái này nha a Năm: Số 1 - Có tổng cộng 6 items: hết 5 cái là y/c change request (em đã có solution/est) + 1 
  [23:22] namtv: OK em
  [08:48] phucvt: > cái ổng báo là bug 500 khi access vào /.well-known/ai-license (không rõ cái này trước đó mình có làm ko, để e confirm 
  [09:01] phucvt: Anh Tien Nguyen ơi, em nhớ hồi go live cái Stripe trên production, ổng có cho mình cái card để test đúng không anh?  Do 
  [09:02] tiennd: Đợi anh lục lại msg cũ
  [09:02] tiennd: Mà card đó
  [09:02] tiennd: Ổng cấp cho Arthur
  [09:03] tiennd: Cái này chắc mình dùng card bên mình, sau đó refund lại dc ko anh Nam Tran
  [09:03] tiennd: Hay dùng card Arthur test luôn
  [09:04] namtv: Dùng của Arthur đi
  [09:04] tiennd: Ok anh
  [09:06] tiennd: thử card này nha Phúc: Card — "Meta-Stamp Demo Test" (Merchant-Locked, $20/mo): Number: 5563 1016 0384 4592 Exp: 07/31 C
  [09:06] tiennd: em thử vào Stripe Log xem request charge của ổng có báo lỗi gì ko
  [09:07] phucvt: Ok anh
  [09:14] phucvt: Xem log trong Stripe không có, chắc nó lỗi ở phía server mình, chưa connect được tới Stripe. Em đang check server log
  [10:04] phucvt: Em đã xử lý xong. Đổi sang dụng Stripe secret key khác, không rõ là tại sao key cũ không tìm thấy trong Stripe nữa
  [10:05] namtv: Nhớ giải thích cho ổng, hỏi ổng xem mày hay ai khác có xóa ko, chú ý đừng xóa, muốn rotate key thì phải update environme ⚠️
  [10:05] phucvt: Ok anh
