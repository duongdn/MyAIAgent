# Task Log: Charged vs Actual — Mar 1 – May 28, 2026

Checked all 10 task log spreadsheets. Rule: flag where actual > 0 AND charged < actual.
Skipped: actual = 0h AND charged = 0h (nothing to review).

---

## 🔴 Partial Under-billing (charged > 0 but < actual)

These are most likely real gaps — billing started but not all hours invoiced.

| Developer | Sheet | Actual | Charged | Missing | Rate |
|-----------|-------|--------|---------|---------|------|
| VietPH | Paturevision | 444.25h | 423.93h | **20.32h** | 95.4% |
| VuTQ | Paturevision | 92.00h | 68.00h | **24.00h** | 73.9% |
| HaVS | Paturevision | 27.50h | 25.07h | **2.43h** | 91.2% |
| HungPN | Fountain | 133.00h | 26.00h | **107.00h** | 19.5% |
| PhatDLT | Fountain | 146.50h | 49.00h | **97.50h** | 33.4% |
| LeNH | Rory (BXR) | 233.66h | 40.17h | **193.49h** | 17.2% |
| KhoaTD | Rory (BXR) | 118.50h | 2.00h | **116.50h** | 1.7% |
| TinPC | Rory (BXR) | 11.00h | 3.00h | **8.00h** | 27.3% |

### Detail notes

**Paturevision (VietPH, VuTQ, HaVS):**
- VietPH: Missing mainly W29 (May 25) = 16h. Plus minor gaps W25-W28 (~4h). Likely current week not yet invoiced.
- VuTQ: W29 (May 25) = 24h entirely uncharged. Probably pending invoice.
- HaVS: W18 (Mar 09) = 1h not charged. W19 (Mar 16) = 7.5h actual but only 6.07h charged (1.43h gap).

**Fountain (HungPN, PhatDLT):**
- Both QC roles. Only W17 (Mar), W18 (Mar), W22 (Apr) have partial charges. All other weeks = 0 charged.
- 10+ consecutive weeks with 0 charged despite 10-18h/wk actual. Likely invoicing scheme issue.

**Rory BXR (LeNH, KhoaTD, TinPC):**
- Only W12 (May 18-24) has any charges at all. 11 weeks of work with 0 charged.
- Total missing across all 3 devs: **317.99h** (~$3,000-5,000 depending on rate).

---

## 🟡 Consistently Zero Charged (may be by design — verify)

These never had any charged hours logged. Could be fixed-price contracts or billing done outside this sheet.

| Developer | Sheet | Actual 3-month | Notes |
|-----------|-------|----------------|-------|
| ViTHT | Fountain | 374.00h | Main dev, likely fixed-price |
| ThinhT | Fountain | 190.00h | Dev, likely fixed-price |
| PhucVT | PhucVT (JamesDiamond) | 459.00h | 0h charged all 3 months |
| TuanNT | JohnYi (AmazingMeds) | 185.67h | 0h charged |
| TuanNT | Rebecca (WilliamBills) | 181.38h | 0h charged |
| LeNH | Franc (RDC) | 103.09h | 0h charged |
| LeNH | Aysar (Baamboozle) | 66.66h | 0h charged |
| KhanhHH | Aysar (Baamboozle) | 69.50h | 0h charged |
| DuongDN | Rebecca (WilliamBills) | 31.00h | 0h charged |
| KhanhHH | Rory (BXR) | 21.00h | 0h charged |
| ManhNN | KhanhHH (Generator) | 80.00h | 0h charged |
| HangNTT | KhanhHH (Generator) | 60.00h | 0h charged |
| ThangN | PhucVT (JamesDiamond) | 35.50h | 0h charged |

---

## ✅ Fully Charged (OK)

| Developer | Sheet | Actual | Charged | Rate |
|-----------|-------|--------|---------|------|
| VuTQ | Fountain | 276.50h | 276.50h | 100% |
| DuongDN | Paturevision | 27.65h | 27.65h | 100% |
| LeNH | Paturevision | 73.99h | 73.99h | 100% |
| LuHX | Paturevision | 36.00h | 36.00h | 100% |

---

## Summary

**Immediate attention needed:**
1. **Rory BXR** — 317.99h uncharged across LeNH + KhoaTD + TinPC. Only 1 week invoiced in 3 months.
2. **Fountain QC** — HungPN + PhatDLT: 204.5h uncharged. Charging pattern is inconsistent (some weeks yes, most no).
3. **Paturevision** — VietPH missing latest week (16h), VuTQ missing W29 (24h). Likely just need invoicing for current week.

**May be by design (but confirm with PM):**
- Fountain devs (ViTHT, ThinhT) — 564h with $0 charged. If Kunal is on fixed-price, this is expected.
- PhucVT, TuanNT — both 0h charged all 3 months across all projects.
