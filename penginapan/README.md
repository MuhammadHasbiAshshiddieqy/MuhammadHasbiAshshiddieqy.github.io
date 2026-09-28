# Pondok Assunah — Website Vila

Website statis sederhana untuk penyewaan vila **Pondok Assunah** (Ciater, dekat
Sariater). Tamu memilih vila, lihat detail & fotonya, lalu klik tombol
booking yang langsung membuka WhatsApp dengan pesan template terisi otomatis.

Tidak butuh server, database, atau biaya hosting — cukup file statis (HTML,
CSS, JS) yang bisa di-hosting **gratis** lewat GitHub Pages.

---

## 1. Struktur folder

```
pondok-assunah-web/
├── index.html          ← struktur halaman (jarang perlu diedit)
├── css/style.css        ← tampilan/warna (jarang perlu diedit)
├── js/app.js            ← logika render & tombol WA (jarang perlu diedit)
├── js/icons.js          ← kumpulan ikon SVG (pengganti emoji)
├── data/villas.js        ← ISI WEB — edit file ini untuk ubah konten
└── images/
    ├── hero-landscape.svg ← ilustrasi pegunungan di bagian atas halaman
    ├── melati/           ← foto vila "melati" (1.jpg, 2.jpg, ...)
    ├── kenanga/
    └── anggrek/
```

**99% pengeditan hanya perlu di `data/villas.js` dan folder `images/`.**
File itu sudah ada komentar panduan lengkap di bagian atasnya, tapi ringkasannya
ada di bawah ini.

---

## 2. Ganti nomor WhatsApp & template pesan

Buka `data/villas.js`, cari bagian `site:` di paling atas:

```js
whatsapp: "6281234567890",   // ganti dengan nomor WA asli kamu
whatsappMessageTemplate:
  "Assalamu'alaikum, saya ingin bertanya/booking *{villa}* ...",
```

Format nomor: kode negara **62** + nomor tanpa angka 0 di depan, tanpa
spasi/strip/tanda plus. Contoh `0812-3456-7890` → `6281234567890`.

`{villa}` di dalam template akan otomatis diganti nama vila yang dipilih tamu.

Kalau salah satu vila dikelola dengan nomor WA berbeda, isi field `whatsapp`
pada vila tersebut (di dalam array `villas`).

---

## 3. Menambah vila baru

1. Di `data/villas.js`, cari array `villas: [ ... ]`.
2. Copy salah satu blok vila (dari `{` sampai `}`), tempel sebelum tanda `]`
   penutup array.
3. Ganti `id` dengan nama unik pendek tanpa spasi (huruf kecil), misalnya
   `"melati2"`. `id` ini juga jadi nama folder foto.
4. Ganti `name`, `shortDescription`, `capacity`, `pricePerNight`, dan isi
   `facilities` (array teks fasilitas) sesuai vila barunya.
5. Buat folder baru di `images/` dengan nama **sama persis** dengan `id`,
   lalu isi field `images` dengan path fotonya, misalnya:
   ```js
   images: ["images/melati2/1.jpg", "images/melati2/2.jpg"],
   ```
6. Simpan — vila baru otomatis muncul di halaman, tanpa perlu sentuh HTML.

Vila bisa ditambah sebanyak yang kamu mau, tidak ada batasan jumlah.

---

### Ikon fasilitas

Field `icon` pada `commonFacilities` di `data/villas.js` memakai nama ikon,
misalnya `"musholla"`, `"dapur"`, `"parkir"`, `"pemandangan"`, `"wifi"`,
`"air-hangat"`, `"kamar"`, `"kamar-mandi"`, `"tamu"`, `"taman"`, `"teras"`,
`"kulkas"`, `"tv"`, `"bbq"`, `"kolam"`. Emoji tetap bisa dipakai kalau ikon
yang diinginkan belum ada di daftar tersebut.

---

## 4. Menambah / mengganti foto

1. Masuk ke folder `images/<id-vila>/` (contoh: `images/melati/`).
2. Taruh foto dengan nama `1.jpg`, `2.jpg`, `3.jpg`, dst (boleh `.png` juga,
   asal nama file di `images: [...]` pada `villas.js` disesuaikan).
3. Disarankan lebar foto sekitar 1200–1500px agar halaman tetap cepat dibuka
   (foto dari HP biasanya sudah cukup, tidak perlu resize manual kalau tidak
   terlalu besar).
4. **Belum punya foto?** Tidak masalah — halaman akan otomatis menampilkan
   kotak hijau bertuliskan "Foto segera ditambahkan" sebagai pengganti,
   jadi website tetap rapi meski foto belum lengkap.

---

## 5. Cara melihat hasilnya di komputer sendiri (sebelum upload)

Karena web ini memuat data lewat file JavaScript biasa (bukan lewat server),
kamu **bisa langsung klik dua kali `index.html`** untuk membukanya di
browser — tidak perlu install apa pun.

---

## 6. Deploy gratis ke GitHub Pages

1. Buat akun di [github.com](https://github.com) (gratis) kalau belum punya.
2. Buat repository baru, misal nama `pondok-assunah-web` (bisa publik/gratis).
3. Upload semua isi folder ini ke repository tersebut. Cara paling mudah
   tanpa command line:
   - Buka halaman repository di GitHub → klik **Add file → Upload files**
   - Drag & drop semua file dan folder (`index.html`, `css/`, `js/`,
     `data/`, `images/`) ke sana → klik **Commit changes**.
4. Masuk ke **Settings → Pages** (menu kiri) di repository tersebut.
5. Pada bagian **Build and deployment → Source**, pilih **Deploy from a
   branch**, lalu pilih branch `main` dan folder `/ (root)` → **Save**.
6. Tunggu 1–2 menit, GitHub akan menampilkan link seperti:
   `https://namakamu.github.io/pondok-assunah-web/`
   Itulah alamat website vila kamu — gratis, tanpa biaya bulanan.
7. (Opsional) Kalau nanti mau pakai domain sendiri seperti
   `pondokassunah.com`, tinggal beli domain (mulai ~Rp150–200rb/tahun di
   registrar seperti Niagahoster/Cloudflare) lalu arahkan ke GitHub Pages
   lewat menu **Custom domain** di Settings → Pages yang sama.

Setiap kali kamu mengubah `data/villas.js` atau menambah foto, cukup upload
ulang file yang berubah lewat **Add file → Upload files** (GitHub otomatis
menimpa file lama) — website akan update sendiri dalam 1–2 menit.

---

## 7. Catatan

- Tombol booking memakai `wa.me`, jadi kalau nomor belum diganti dari
  contoh (`6281234567890`), booking akan salah alamat — pastikan langkah
  no. 2 di atas sudah dilakukan sebelum website dibagikan ke calon tamu.
- Peta lokasi memakai Google Maps embed biasa (tidak butuh API key/berbayar).
  Kalau ingin ganti titik lokasi, edit `mapsEmbedUrl` di `data/villas.js`
  dengan link embed dari Google Maps (Bagikan → Sematkan peta → copy URL
  di dalam `src="..."`).
