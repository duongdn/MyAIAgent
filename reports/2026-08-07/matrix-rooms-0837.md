# Matrix — since 2026-08-06 07:40 +07:00

### Kunal - Fountain — 73 messages
  [08:55] hungpn: image.png
  [08:56] hungpn: ủa sao vậy nhỉ?
  [08:57] vutq: này là bình thường nha anh, không phải lỗi gì đâu
  [08:57] hungpn: rồi làm sao anh vào dc admin nhỉ?
  [08:57] datnt: anh thêm /admin vô á
  [09:00] hungpn: nay k cần nhập Auth info luôn ak
  [09:02] datnt: nó vẫn cần nhập á anh
  [09:03] datnt: image.png
  [09:05] hungpn: hay nhỉ? anh k cần luôn.kkk
  [09:09] vitht: chắc do a nhập trc đó rồi nên k cần nhập lại. E cũng v nè
  [09:59] vitht: Review giúp c 2 pull request này nha Vu Tat  ơi  FE: https://github.com/iamksheth/FountainNewUI/pull/505  BE: https://gi
  [09:59] duongdn: Lam Le:  nghe nói e đang idle, qua đây làm đỡ nha Vu Tat  giúp a assign task cho bạn
  [10:01] vutq: https://trello.com/c/BAI99Jrx/2895-fountain-product-page-bottle-engraving làm ticket này nha Lam Le, info transfer cụ th [thread: 14 replies]
    └ [10:02] datnt: cái này đợt anh làm FE đầu tiên mà phải không ta Lam Le
    └ [10:03] lamlq: đúng rồi á, tích hợp api chưa ta
    └ [10:03] datnt: API lên hết rồi á anh
    └ [10:04] datnt: anh đọc cái cmt mới nhất nha
    └ [10:06] datnt: anh check với bên infnity_staging cũng được nha, bên đó có làm cái hiển thị, lên trang cart với chec
    └ [10:06] datnt: em thấy nó giống y chang hiển thị cái khắc chai này chỉ khác tiêu đề thôi á
    └ [10:33] lamlq: anh thấy title được thêm rồi, còn phần thông tin Engraving là chưa được thêm thôi phải kh Dat Nguyen
    └ [10:33] lamlq: image.png
    └ [10:35] datnt: đúng rồi anh
    └ [10:36] datnt: anh check xem data có trả cái line đó ra khong, nếu chưa có thì để em data bên BE
    └ [10:58] lamlq: ok thấy có data rồi á, mà layout của CartItem hiện tại nó không match với design. Có fix ở nhánh này
    └ [10:58] lamlq: image.png
    └ [11:11] vitht: chắc fix lun e ơi
    └ [14:43] lamlq: anh refactor layout + conditional display engraving rồi, Dat Nguyen xem phát nha
  [10:01] datnt: Phat Le anh ơi cái blog Thomas reply lại rồi á anh
  [10:01] datnt: để em chỉnh lại theo ổng rồi báo anh QC lại nha
  [10:05] vutq: Lam Le xong thì có thể qua ticket này luôn https://trello.com/c/HUIURoXV/3011-fountain-uniform-product-image-framing-pro [thread: 6 replies]
    └ [15:34] lamlq: Em hiểu là ổng muốn bỏ bước thủ công chỉnh sửa ảnh rồi lại upload lại. Claude suggest dùng CSS để ch
    └ [15:36] vutq: ừm nó đó, ổng muốn tiết kiệm khỏi thuê editor
    └ [15:37] vutq: Claude suggest tạo custom-class nhưng nếu được thì mình xài trực tiếp class của Tailwind luôn
    └ [15:57] lamlq: coi bộ thằng multiply này cũng không ổn lắm anh Vu Tat, em thử demo
    └ [15:57] lamlq: image.png
    └ [15:59] vutq: tạm ngưng ticket này thôi, Kunal báo hold off rồi
  [10:06] vitht: card này xong chưa v ae, tù 29/6 rồi [thread: 7 replies]
    └ [10:07] datnt: em đưa lên Beta đang đợi QC test á chị
    └ [10:07] datnt: chắc ưu tiên cái này lên đi á, đợt em off bên đây xong card này nằm im luôn
    └ [10:09] datnt: cả cái card order flow bên infinity luôn đẩy lên luôn chứ nó cũng ngâm lâu rồi
    └ [10:09] datnt: còn cái 2869 là lên Live rồi chỉ fix bug Live thôi
    └ [10:16] vitht: lên live rồi sao thấy chưa kéo qua live á
    └ [10:17] datnt: lên rồi mà có feedback á chị
    └ [10:17] datnt: em kéo về doing rồi em kéo qua cho QC test á chị
  [10:06] vitht: https://trello.com/c/BSrIHSmc/2869-fountain-order-flow-message-recipient-delivery-updates
  [10:07] vitht: * card này xong chưa v ae, từ 29/6 rồi
  [10:07] vitht: * card này xong chưa v ae, từ 29/7 rồi
  [10:31] datnt: Hung Pham Phat Le card này em đổi behavior theo message mới của Thomas rồi nha, có gì 2 anh QC giúp em với https://trell
  [10:37] datnt: * anh check xem data có trả cái line đó ra khong, nếu chưa có thì để em thêm data trả ra bên BE
  [11:32] hungpn: cho anh hỏi cái này chút, trước mình có làm cái tính năng nào ẩn cái thông tin Delivery có giá trên giftdrop k nhỉ?
  [11:32] hungpn: image.png
  [11:36] vutq: bên trang RecipientAddress thì đúng là cần ẩn nha anh
  [11:44] hungpn: okie em, có Vu Tat confirm là dc rồi nè, nhưng cái này mình có nên báo update bên Infinity hok ta?> hay bug tự fix luôn 
  [11:47] vutq: tự fix thôi anh, tương tự bên Fountain, mà tạm thời để low priority dev nào không hết task có thể nhảy vô update
  [11:48] hungpn: okie em
  [11:53] thinht: có j chìu nay t update cho Hung Pham [thread: 4 replies]
    └ [14:39] thinht: test lại thử nhan Hung Pham
    └ [14:40] hungpn: okie, xíu nha
    └ [14:40] hungpn: đang bện xíu
    └ [16:30] hungpn: tested DONE nha Thinh Tran
  [11:59] datnt: Phat Le anh ơi cái card Blog của fountain em update lại cái category rồi nha anh
  [13:20] datnt: * Phat Le anh ơi cái card Blog của fountain em update lại cái category theo message của Thomas rồi nha anh
  [14:40] thinht: cho a xin ticket nha Trinh Mai
  [14:41] vutq: xử lí cái hàm GoC hôm qua em báo nha anh Thinh Tran [thread: 1 reply]
    └ [14:42] thinht: okie e
  [16:48] datnt: Hung Pham mấy con bug hồi trưa anh assign cho em, em fix lên staging beta rồi nha anh
  [16:50] hungpn: update status nha, xíu anh check
  [16:50] datnt: dạ oki anh, em update rồi nha anh
  [17:14] hungpn: check thử bug này có nên fix sớm hok nha Vu Tat Trinh Mai https://redmine.nustechnology.com/issues/80268 [thread: 3 replies]
    └ [17:17] vutq: fix gấp chứ anh :v gì mà loạn giá lên hết thế
    └ [17:19] hungpn: ai rảnh fix dùm anh nhé
    └ [17:20] vitht: a Thinh Tran  ng tuyệt vời nâhts là a chẳng ai khác
  [17:20] vitht: * a Thinh Tran  ng tuyệt vời nhất là a chẳng ai khác
