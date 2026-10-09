# Matrix — since 2026-09-25 05:00 +07:00

### Kunal - Fountain — 125 messages
  [08:30] vitht: https://trello.com/c/BcAjuYb6/3108-updating-gifts-csv-not-linking-to-product-catalog  hôm qua c mới fix cái issue ổng ex [thread: 7 replies]
    └ [08:46] datnt: Em check DONE trên BETA với LIVE mấy cái sau roi nha chị Vi Tran:  - Export file CSV for AI   - Expo
    └ [08:47] vitht: cái export AI là dùng đlàm gì vậy
    └ [08:49] datnt: cái đó em nghĩ là để cho Kunal đưa cho AI của ổng á, tại em check PR chị thấy chị có update vô cái e
    └ [08:50] datnt: còn tin nhắn thì em thấy ổng nhắn là lúc đầu ổng export ra xong import vô thì lỗi xong sau đó nó lại
    └ [09:04] vitht: à tại trước chị không thấy cái button đó, giờ thấy nên c hỏi e có làm cho cái feature này không thôi
    └ [09:04] vitht: để c báo ổng lun
    └ [09:05] datnt: dạ oki chị 🫡
  [08:31] vitht: * https://trello.com/c/BcAjuYb6/3108-updating-gifts-csv-not-linking-to-product-catalog hôm qua c mới fix cái issue ổng e
  [08:31] vitht: * https://trello.com/c/BcAjuYb6/3108-updating-gifts-csv-not-linking-to-product-catalog hôm qua c mới fix cái issue ổng e
  [08:47] vitht: * cái export AI là dùng để làm gì vậy
  [08:48] vitht: * cái Export file CSV for AI là dùng để làm gì vậy
  [10:37] datnt: Vu Tat anh ơi anh review card này giúp em nha #[3084](https://trello.com/c/uopF36jA/3084-fountain-browse-page-product-bl [thread: 2 replies]
    └ [15:12] datnt: Vu Tat chị Vi review done rùi á có gì anh check deploy giúp em nha, này cần lên sớm á anh
    └ [15:52] vutq: done nha Dat Nguyen
  [10:38] datnt: * Vu Tat anh ơi anh review PR này giúp em nha #[3084](https://trello.com/c/uopF36jA/3084-fountain-browse-page-product-bl
  [10:39] vitht: a Vũ bận rồi để c review cho
  [10:39] vitht: đợi c tí nha
  [10:40] datnt: dạ oki chị
  [10:47] vitht: a Hung Pham ơi test dùm e tính năng delete hàng loạt gift với, ổng bảo ổng cần deploy live trong chiều nay  https://trel
  [10:58] hungpn: okei, anh check liền nè
  [13:26] vitht: A ơi cái card 3114 sao rồi a ơi Hung Pham
  [13:28] hungpn: đợi anh xíu nha
  [13:34] hungpn: go go go go live nào
  [13:34] vitht: Dạ okie
  [13:42] vitht: Vu Tat:  ơi review với deploy card này giúp chị với  fountain/3114-admin-delete-bulk-boxes  BE: https://github.com/iamks [thread: 1 reply]
    └ [13:45] vutq: sao em thấy chỉ code JS thôi nhỉ, hình như nó đâu thật sự xóa record nào 🤔
  [13:47] hungpn: có ai vòa trang admin nó bị chậm hok Vi Tran
  [13:48] datnt: em thấy nay vô chậm chậm kiểu gì á
  [13:48] datnt: cả admin lẫn UI luôn
  [13:48] hungpn: anh loading nãy giờ, tưởng mạng bị sao
  [13:49] datnt: anh vô admin bên nào á
  [13:49] datnt: để em thử vô xem sao
  [13:49] hungpn: fountains
  [13:49] datnt: staging hả anh
  [13:50] hungpn: đúng rồi
  [13:50] hungpn: em check live hả
  [13:50] datnt: trên LIVE thì em check UI nó chậm lắm
  [13:50] hungpn: có khi do mạng hok ta
  [13:50] datnt: kiểu anh chuyển bấm chuyển page khác nó phải 4 5s mới đi á
  [13:50] hungpn: để báo admin đổi đường truyền mạng thử coi sao
  [13:51] datnt: admin bên em nó cũng xoay vòng vòng rồi 🥲
  [13:51] datnt: cả LIVE lẫn STAGING
  [13:52] trinhmtt: hqa chị Vi nói la do mạng hay sao á
  [13:52] trinhmtt: cái anh Cường nhắn á'
  [13:54] trinhmtt: image.png
  [14:07] datnt: Hung Pham anh QC giúp em card này nha [thread: 30 replies]
    └ [14:08] datnt: Card này update lại toàn bộ những page mà có section get in touch xài chung 1 ui á
    └ [14:08] datnt: https://www.figma.com/design/ycshVpcLgTBPb0aXnlo5MP/Fountain?node-id=26039-99496&p=f&m=dev
    └ [14:41] hungpn: image.png
    └ [14:42] hungpn: check dùm anh trang thanks you này trên mobile vs Dat Nguyen
    └ [14:42] datnt: dạ oki anh
    └ [14:45] hungpn: image.png
    └ [14:46] hungpn: vs anh đang muốn check cái placeholder text này đang ở body mấy thì thông số nào á em nhỉ? anh thấy 
    └ [14:46] datnt: để em mò thử nha :))
    └ [14:47] hungpn: image.png
    └ [14:47] hungpn: Your message nha
    └ [14:52] datnt: image.png
    └ [14:53] datnt: Hung Pham cái element bên dưới là soi được nha anh
    └ [14:54] hungpn: nhưng mà thấy body-4 mà nó còn bự hơn cái body-2 bên kia nhỉ
    └ [14:54] hungpn: 😐️
    └ [14:55] datnt: à thì có nhiều cái khó nói á anh 🫣
    └ [15:05] hungpn: khó vậy sao? nếu đúng thì nó nên nhỏ hơn chứ hì?
    └ [15:05] hungpn: image.png
    └ [15:06] hungpn: cái này mình chưa có updatge background color nè? https://beta.fountaingifts.com/cocktail-kits
    └ [15:06] datnt: cái này em cố tình để lại màu á anh
    └ [15:07] datnt: cái này nếu như mà em xài đúng value thì chắc mình skip qua đi á
    └ [15:07] hungpn: do design cũ hay sao em
    └ [15:08] datnt: image.png
    └ [15:08] datnt: tại em check figma có layout mới á mà màu thì giữ nguyên á
    └ [15:08] hungpn: anh cũng đang check luôn
    └ [15:09] datnt: có 1 cái page này em thấy cũ á mà figma cũng khôg có luôn
    └ [15:09] datnt: /employee-appreciation-gifts
    └ [15:09] hungpn: anh thấy rồi
    └ [15:10] hungpn: fix lại cái text vs trên view thanks you rồi báo anh check lại nha
    └ [15:10] datnt: dạ oki anh
    └ [15:49] datnt: Hung Pham done cả 2 rồi nha anh
  [14:07] datnt: https://trello.com/c/OSbaYhDP/3110-fountain-update-static-page-contact-form-layout-and-content
  [14:08] hungpn: đợi anh loading xong đã nha [thread: 1 reply]
    └ [14:10] vitht: mấy nay mưa gió quá nên nó hơi chập chờn
  [14:25] datnt: uar Hung Pham hình như cái GOC của pro
  [14:25] datnt: ai xóa mất tiêu trên beta rồi hả anh
  [14:25] datnt: * uar anh Hung Pham hình như cái GOC của pro
  [14:26] hungpn: anh k biết nè
  [14:26] hungpn: em check xem
  [14:26] datnt: em thấy mất tiêu rồi á
  [14:26] vitht: gift a choice bữa a Thịnh nói có bên thường thôi mà
  [14:26] vitht: pro đâu có gift a choice
  [14:26] datnt: có nguyên 1 card làm cho bên Pro á chị
  [14:26] datnt: https://trello.com/c/uod6osEL/2968-fountain-gift-of-choice-business-tab
  [14:27] hungpn: ng đâu, ban thưởng
  [14:27] hungpn: 😈
  [14:27] thinht: có thể do a đó. có một lượng lớn codes của ông cus ổng refactor nhiều nên check lại sót j so vs codes cũ k e? a cố giữ l
  [14:27] datnt: hmmm để em đi check lại giờ code em merge vô nó lỗi nhiều quá [thread: 12 replies]
    └ [14:28] thinht: hôm qua a điên đầu vs đống đó đấy. ổng chỉnh có 4 file mà file nào cũng như là 1 file mới
    └ [14:30] datnt: giờ tới em hả anh 🫠
    └ [14:30] datnt: sao nhìn nó lạ quá 🥲🥲🥲
    └ [14:31] thinht: chắc vậy :D. 🤣  code ổng viết rồi merge zô code a k làm. mò điên ngừ
    └ [14:32] datnt: card nào á anh cho em card em đọc ổng làm gì với anh
    └ [14:32] vitht: ủa
    └ [14:32] vitht: ổng có quyền push lun rồi hẻn
    └ [14:32] vitht: ==
    └ [14:32] datnt: hổm owner repo github á chị
    └ [14:32] datnt: hổm ổng push vô master lun mà
    └ [14:33] thinht: https://github.com/iamksheth/FountainNewUI/pull/546
    └ [14:33] thinht: PR đây e
  [14:28] vitht: thứ 6 rồi làm kĩ kĩ nhé 💗
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
