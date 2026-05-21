# Asset Allocation — 2026-05-21 10:48

Source: MISA MoneyKeeper API
Accounts+Savings total: 6,317,372,431 ₫ | totaldashboard: 7,897,518,595 ₫

---

## Tỉ lệ tài sản

| Loại | Tổng (₫) | % Total | Ghi chú |
|------|----------|---------|---------|
| 🏠 Bất động sản | 3,520,000,000 | **44.5%** | Nhà (2.5B) + long an res (1.02B) |
| 🏦 Tiết kiệm | 1,212,271,771 | **15.3%** | VCB + Tikop term deposits + Tikop balance |
| 📈 ETF + Fund | ~1,580,146,164 | **~20.0%** | * Ước tính từ totaldashboard (xem chú thích) |
| 🥇 Vàng | 817,500,000 | **10.3%** | 50 units |
| 🏢 Cổ phiếu | 600,000,000 | **7.6%** | Larion cổ phần (cổ tức) |
| 💵 Tiền mặt | 191,574,467 | **2.4%** | Paypal USD + vcb + Ví + Momo |
| 💳 Nợ (VCB Visa) | 24,990,000 | **0.3%** | Credit card, tháng 5 cao nhất 12m |

**Total (incl. ETF/Fund):** ~7,922,512,290 ₫  
**Net (excl. debt):** ~7,897,518,595 ₫

---

## Chi tiết từng loại

### 🏠 Bất động sản — 3,520,000,000 ₫
| | Giá trị (₫) |
|-|------------|
| Nhà | 2,500,000,000 |
| long an res | 1,020,000,000 |

### 🏦 Tiết kiệm — 1,212,271,771 ₫
| | Giá trị (₫) | Đáo hạn |
|-|------------|---------|
| vcb 1 month | 501,952,055 | 09/06/2026 |
| tikcop 1 week | 401,917,738 | 13/10/2026 |
| tikcop 1m | 101,544,037 | 02/06/2026 |
| vcb 1m | 101,150,407 | 02/06/2026 |
| Tikop (số dư) | 103,702,055 | — |
| nam á 6m | 2,005,479 | Expired |

### 📈 ETF + Fund — ~1,580,146,164 ₫ *(ước tính)*
> Được track trong loan/debt system của MISA. API loan endpoints không accessible (trả về 404). Số ước tính = `totaldashboard (7,897M) − accounts+savings (6,317M)`.  
> **Không tách được ETF vs Fund riêng** — cần xem trong MISA app.

### 🥇 Vàng — 817,500,000 ₫
50 units × 16,350,000 ₫/unit

### 🏢 Cổ phiếu — 600,000,000 ₫
Larion cổ phần — cổ tức định kỳ

### 💵 Tiền mặt — 191,574,467 ₫
| | Giá trị (₫) |
|-|------------|
| Paypal (6,049 USD) | 159,639,159 |
| vcb | 27,660,090 |
| Ví | 4,160,000 |
| Momo | 104,468 |
| nam á *(inactive)* | 10,867 |

### 💳 Nợ — 24,990,000 ₫
VCB Visa credit card. Tháng 5/2026 charged 74.49M (cao nhất 12 tháng).

---

## Visual

```
Total ~7.92B ₫
├── 🏠 Bất động sản  ████████████████████████         44.5%  (3,520M)
├── 📈 ETF + Fund    ████████████                     20.0%  (1,580M)*
├── 🏦 Tiết kiệm     █████████                        15.3%  (1,212M)
├── 🥇 Vàng          ██████                           10.3%    (818M)
├── 🏢 Cổ phiếu      █████                             7.6%    (600M)
├── 💵 Tiền mặt      █                                 2.4%    (192M)
└── 💳 Nợ            ▏                                 0.3%     (25M)
```

---

## Nhận xét

- BĐS + ETF/Fund + Vàng + Cổ phiếu = **82.4%** — phần lớn tài sản kém thanh khoản
- Tiền mặt thực sự thanh khoản ngay: **2.4%** (192M)
- Tiết kiệm đáo hạn tháng 6: **+704M** — effective liquid sau tháng 6 = **896M (11.3%)**
- Nợ/Total = **0.3%** — không đáng kể

---

*Unresolved: ETF vs Fund breakdown không accessible qua API hiện tại — cần xem thủ công trong MISA app để tách ra. totaldashboard có thể bao gồm cả accumulated interest, nên 1,580M là ước tính có thể sai lệch nhỏ.*
