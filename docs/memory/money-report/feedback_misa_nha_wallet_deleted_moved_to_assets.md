---
name: misa-nha-wallet-deleted-moved-to-assets
description: Nhà 2.5B deleted from MISA wallets 2026-10-30 (now in MISA "Tài sản" section) → always add 2.5B manually to NW, never flag
metadata:
  type: feedback
---
Ví "Nhà" bị user xoá khỏi danh sách ví MISA ngày 2026-10-30; MISA giờ có mục "Tài sản" riêng chứa nó (script chưa fetch). totaldashboard giảm đúng 2.5B.

**Why:** user xác nhận chủ ý xoá, không phải mất tiền. Cùng ngày xác nhận ~67M vào vcb (10-30) là lương T10.
**How to apply:** NW = trueTotalBalance + Nhà 2,500,000,000 + Larion + VCBF + Finhay + VCBS + FPTS (ẩn). Cộng âm thầm, không hỏi/flag. Liên quan [[larion_valuation_confirmed_by_user]] [[vcbf_finhay_hidden_wallets_add_back_like_larion]].
