# PalugadaApp - React Native (Capacitor)

PalugadaApp adalah platform marketplace multi-role komprehensif yang dirancang untuk performa tinggi dan keunggulan visual. Dibangun dengan React, Vite, dan Capacitor, aplikasi ini menawarkan pengalaman yang mulus bagi Pengguna, Penjual, dan Kurir.

## 🚀 Fitur Utama

### 🛒 Untuk Pelanggan
- **Jelajah & Cari:** Temukan produk di berbagai kategori dengan antarmuka modern.
- **Keranjang & Checkout:** Alur belanja yang lancar dari pemilihan item hingga pembayaran.
- **Pelacakan Pesanan:** Pelacakan pesanan secara real-time menggunakan peta Leaflet.
- **Favorit:** Simpan item favorit Anda untuk nanti.

### 🏪 Untuk Penjual
- **Dashboard Penjual:** Kelola produk, lacak penjualan, dan awasi performa toko.
- **Manajemen Produk:** Tambah dan edit daftar produk dengan mudah.
- **Registrasi Toko:** Alur pendaftaran bagi penjual baru.

### 🛵 Untuk Kurir
- **Dashboard Kurir:** Lihat tugas pengiriman yang tersedia dan penghasilan.
- **Pelacakan Penghasilan:** Pantau performa harian/mingguan dan penarikan dana.
- **Hub Komunitas:** Ruang interaksi bagi komunitas kurir.

### 💳 Sistem Keuangan
- **Dompet Terintegrasi:** Top-up, tarik tunai, dan lacak riwayat transaksi.
- **Manajemen Rekening Bank:** Kelola rekening bank yang terhubung dengan aman.

### ⚙️ Akun & Keamanan
- **Autentikasi:** Login dan registrasi yang aman.
- **Manajemen Info Pribadi:** Perbarui profil dan detail kontak.
- **Layanan Lokasi:** Manajemen alamat yang presisi dengan integrasi peta.
- **Pengaturan Notifikasi:** Peringatan yang dapat disesuaikan untuk pesanan dan pembaruan.

## 🛠 Tech Stack

- **Frontend:** React 19, Vite
- **Mobile Foundation:** Capacitor (Android)
- **Styling:** CSS3 (Glassmorphism & Desain Premium)
- **Icons:** Lucide React
- **Maps:** Leaflet & React Leaflet
- **Development:** ESLint

## 📦 Memulai

### Prasyarat
- Node.js (Edisi LTS terbaru direkomendasikan)
- Android Studio (untuk build Android)

### Instalasi
1. Clone repositori:
   ```bash
   git clone https://github.com/sesamakita/PalugadaApp_Reactnative.git
   cd PalugadaApp_Reactnative
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan dalam mode pengembangan:
   ```bash
   npm run dev
   ```

### Membangun untuk Android
1. Build aplikasi web produksi:
   ```bash
   npm run build
   ```
2. Sinkronisasi dengan Capacitor:
   ```bash
   npx cap sync
   ```
3. Buka di Android Studio:
   ```bash
   npx cap open android
   ```

## 📄 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

---
Dikembangkan oleh [sesamakita](https://github.com/sesamakita)
