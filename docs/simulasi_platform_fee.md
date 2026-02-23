# 📊 Simulasi Platform Fee — Palugada KW

## Model Fee yang Dipilih

| Pihak | Tipe | Persentase |
|-------|------|:----------:|
| **Pembeli** | Biaya Layanan | **2%** dari subtotal produk |
| **Penjual** | Potongan Settlement | **3%** dari pendapatan kotor |
| **Kurir** | Potongan Settlement | **2%** dari ongkir |

---

## Simulasi 1 — Transaksi Kecil (Rp 25.000)

```
🛒 PRODUK: Kue Basah Homemade
   Harga Produk      : Rp  25.000
   Ongkos Kirim      : Rp  10.000

👤 SISI PEMBELI (Checkout)
   ┌─────────────────────────────────────┐
   │ Subtotal Produk   : Rp  25.000     │
   │ Ongkos Kirim      : Rp  10.000     │
   │ Biaya Layanan 2%  : Rp     500     │
   │─────────────────────────────────────│
   │ TOTAL BAYAR        : Rp  35.500    │
   └─────────────────────────────────────┘

🏪 SISI PENJUAL (Settlement)
   ┌─────────────────────────────────────┐
   │ Pendapatan Kotor   : Rp  25.000    │
   │ Potongan 3%        : Rp    -750    │
   │─────────────────────────────────────│
   │ TERIMA BERSIH      : Rp  24.250    │
   └─────────────────────────────────────┘

🚴 SISI KURIR (Settlement)
   ┌─────────────────────────────────────┐
   │ Ongkir Kotor       : Rp  10.000    │
   │ Potongan 2%        : Rp    -200    │
   │─────────────────────────────────────│
   │ TERIMA BERSIH      : Rp   9.800    │
   └─────────────────────────────────────┘

💰 PLATFORM REVENUE
   ┌─────────────────────────────────────┐
   │ Dari Pembeli (2%)  : Rp     500    │
   │ Dari Penjual (3%)  : Rp     750    │
   │ Dari Kurir (2%)    : Rp     200    │
   │─────────────────────────────────────│
   │ TOTAL REVENUE      : Rp   1.450    │
   └─────────────────────────────────────┘
```

---

## Simulasi 2 — Transaksi Sedang (Rp 75.000)

```
🛒 PRODUK: Sepatu Lokal Handmade
   Harga Produk      : Rp  75.000
   Ongkos Kirim      : Rp  15.000

👤 SISI PEMBELI (Checkout)
   ┌─────────────────────────────────────┐
   │ Subtotal Produk   : Rp  75.000     │
   │ Ongkos Kirim      : Rp  15.000     │
   │ Biaya Layanan 2%  : Rp   1.500     │
   │─────────────────────────────────────│
   │ TOTAL BAYAR        : Rp  91.500    │
   └─────────────────────────────────────┘

🏪 SISI PENJUAL (Settlement)
   ┌─────────────────────────────────────┐
   │ Pendapatan Kotor   : Rp  75.000    │
   │ Potongan 3%        : Rp  -2.250    │
   │─────────────────────────────────────│
   │ TERIMA BERSIH      : Rp  72.750    │
   └─────────────────────────────────────┘

🚴 SISI KURIR (Settlement)
   ┌─────────────────────────────────────┐
   │ Ongkir Kotor       : Rp  15.000    │
   │ Potongan 2%        : Rp    -300    │
   │─────────────────────────────────────│
   │ TERIMA BERSIH      : Rp  14.700    │
   └─────────────────────────────────────┘

💰 PLATFORM REVENUE
   ┌─────────────────────────────────────┐
   │ Dari Pembeli (2%)  : Rp   1.500    │
   │ Dari Penjual (3%)  : Rp   2.250    │
   │ Dari Kurir (2%)    : Rp     300    │
   │─────────────────────────────────────│
   │ TOTAL REVENUE      : Rp   4.050    │
   └─────────────────────────────────────┘
```

---

## Simulasi 3 — Transaksi Besar (Rp 350.000)

```
🛒 PRODUK: Tas Kulit Premium Lokal
   Harga Produk      : Rp 350.000
   Ongkos Kirim      : Rp  20.000

👤 SISI PEMBELI (Checkout)
   ┌─────────────────────────────────────┐
   │ Subtotal Produk   : Rp 350.000     │
   │ Ongkos Kirim      : Rp  20.000     │
   │ Biaya Layanan 2%  : Rp   7.000     │
   │─────────────────────────────────────│
   │ TOTAL BAYAR        : Rp 377.000    │
   └─────────────────────────────────────┘

🏪 SISI PENJUAL (Settlement)
   ┌─────────────────────────────────────┐
   │ Pendapatan Kotor   : Rp 350.000    │
   │ Potongan 3%        : Rp -10.500    │
   │─────────────────────────────────────│
   │ TERIMA BERSIH      : Rp 339.500    │
   └─────────────────────────────────────┘

🚴 SISI KURIR (Settlement)
   ┌─────────────────────────────────────┐
   │ Ongkir Kotor       : Rp  20.000    │
   │ Potongan 2%        : Rp    -400    │
   │─────────────────────────────────────│
   │ TERIMA BERSIH      : Rp  19.600    │
   └─────────────────────────────────────┘

💰 PLATFORM REVENUE
   ┌─────────────────────────────────────┐
   │ Dari Pembeli (2%)  : Rp   7.000    │
   │ Dari Penjual (3%)  : Rp  10.500    │
   │ Dari Kurir (2%)    : Rp     400    │
   │─────────────────────────────────────│
   │ TOTAL REVENUE      : Rp  17.900    │
   └─────────────────────────────────────┘
```

---

## 📈 Proyeksi Revenue Bulanan

Asumsi rata-rata transaksi **Rp 75.000** dengan ongkir **Rp 15.000**:

| Transaksi/Hari | Revenue/Transaksi | Revenue/Hari | Revenue/Bulan |
|:-:|:-:|:-:|:-:|
| 10 | Rp 4.050 | Rp 40.500 | **Rp 1.215.000** |
| 30 | Rp 4.050 | Rp 121.500 | **Rp 3.645.000** |
| 50 | Rp 4.050 | Rp 202.500 | **Rp 6.075.000** |
| 100 | Rp 4.050 | Rp 405.000 | **Rp 12.150.000** |
| 500 | Rp 4.050 | Rp 2.025.000 | **Rp 60.750.000** |

### Breakdown Revenue per Sumber

| Sumber | Per Transaksi | 100 trx/hari | /Bulan |
|--------|:-:|:-:|:-:|
| Pembeli (2%) | Rp 1.500 | Rp 150.000 | Rp 4.500.000 |
| Penjual (3%) | Rp 2.250 | Rp 225.000 | Rp 6.750.000 |
| Kurir (2%) | Rp 300 | Rp 30.000 | Rp 900.000 |
| **TOTAL** | **Rp 4.050** | **Rp 405.000** | **Rp 12.150.000** |

---

## ✅ Ringkasan Model

```
  PEMBELI                 PLATFORM               PENJUAL
  membayar ──────────────→ menerima ─────────────→ terima bersih
  produk + ongkir          2% biaya layanan        97% dari harga
  + 2% biaya layanan       3% dari penjual         produk
                           2% dari kurir
                                    │
                                    └──────────→ KURIR
                                                  terima bersih
                                                  98% dari ongkir
```
