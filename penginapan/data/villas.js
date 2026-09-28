/**
 * ============================================================
 *  DATA PONDOK ASSUNAH — edit file ini untuk mengubah isi web
 * ============================================================
 *
 *  File ini BUKAN kode program, hanya data. Kamu tidak perlu
 *  menyentuh file HTML/CSS/JS lain untuk:
 *    1. Ganti nomor WhatsApp / template pesan booking
 *    2. Ubah teks, harga, fasilitas tiap vila
 *    3. Menambah vila baru
 *    4. Mengganti / menambah foto
 *
 *  ------------------------------------------------------------
 *  CARA MENAMBAH VILA BARU:
 *  ------------------------------------------------------------
 *  1. Copy salah satu blok "{ ... }" di dalam array `villas`
 *     di bawah ini (dari tanda kurung kurawal buka { sampai
 *     tutup }, lalu tempel sebelum tanda kurung siku tutup `]`
 *     di akhir array `villas`.
 *  2. Ganti nilai "id" dengan nama singkat unik tanpa spasi,
 *     misalnya "melati2" (huruf kecil semua, boleh pakai strip -).
 *     "id" ini juga dipakai sebagai nama folder foto.
 *  3. Ganti "name", "shortDescription", "capacity", "pricePerNight",
 *     dan isi "facilities" sesuai vila barunya.
 *  4. Buat folder baru di dalam folder images/ dengan nama yang
 *     SAMA PERSIS dengan "id" di atas, lalu masukkan foto ke sana
 *     (lihat panduan foto di bawah).
 *  5. Simpan file ini, refresh halaman web — vila baru otomatis
 *     muncul di daftar.
 *
 *  ------------------------------------------------------------
 *  CARA MENAMBAH / MENGGANTI FOTO:
 *  ------------------------------------------------------------
 *  1. Buka folder images/<id-vila>/  (misalnya images/melati/)
 *  2. Taruh foto di sana dengan nama 1.jpg, 2.jpg, 3.jpg, dst.
 *     (boleh .jpg atau .png, ukuran disarankan max ~1500px lebar
 *     agar web tetap cepat dibuka)
 *  3. Sesuaikan daftar "images" pada vila tersebut di bawah agar
 *     jumlah & nama filenya cocok dengan yang kamu taruh.
 *  4. Kalau foto belum ada / belum diisi, web akan otomatis
 *     menampilkan kotak placeholder yang rapi — jadi web TIDAK
 *     akan rusak/tampil aneh walau foto belum lengkap.
 *
 *  ------------------------------------------------------------
 *  CARA GANTI NOMOR WHATSAPP:
 *  ------------------------------------------------------------
 *  Ubah nilai "whatsapp" di bagian SITE_DATA.site di bawah.
 *  Format: kode negara + nomor, TANPA "+", TANPA "0" di depan,
 *  TANPA spasi/strip.  Contoh nomor 0812-3456-7890 menjadi:
 *  "6281234567890"
 *
 *  Kalau salah satu vila punya nomor WA pengelola yang berbeda,
 *  isi field "whatsapp" pada vila tersebut (biarkan "" / hapus
 *  baris itu kalau ingin memakai nomor WA utama di atas).
 */

var SITE_DATA = {
  site: {
    name: "Pondok Assunah",
    tagline: "Vila Keluarga Syariah di Kaki Gunung, dekat Sariater, Ciater",
    locationText: "Ciater, Subang — sekitar 5 menit dari kawasan Sariater Hot Spring Resort",
    // Nomor WhatsApp pengelola (lihat panduan di atas)
    whatsapp: "6281319392760",
    // {villa} akan otomatis diganti nama vila yang dipilih tamu
    whatsappMessageTemplate:
      "Assalamu'alaikum, saya ingin bertanya/booking *{villa}* di Pondok Assunah, Ciater.\n\nTanggal check-in: \nTanggal check-out: \nJumlah tamu: \n\nMohon info ketersediaan & pembayarannya. Terima kasih.",
    about:
      "Pondok Assunah adalah vila keluarga bernuansa syariah yang terletak dekat kawasan wisata air panas Sariater, Ciater. Cocok untuk liburan keluarga besar, arisan keluarga, maupun rombongan pengajian — dengan udara sejuk pegunungan, area yang nyaman, dan fasilitas ibadah di setiap vila.",
    // Peta yang tampil di halaman (titik koordinat Pondok Assunah)
    mapsEmbedUrl:
      "https://www.google.com/maps?q=-6.7380595,107.6604424&z=16&output=embed",
    // Link tombol "Buka di Google Maps" di bawah peta
    mapsLinkUrl:
      "https://www.google.com/maps/place/Pondok+Assunah/@-6.7380595,107.6604424,17z/data=!3m1!4b1!4m6!3m5!1s0x2e691f8c51e5c42b:0x60bb2bbe89203019!8m2!3d-6.7380595!4d107.6604424!16s%2Fg%2F11gc511chj",
    instagram: "",
  },

  // Fasilitas umum yang ada di SEMUA vila (ditampilkan di section "Fasilitas")
  commonFacilities: [
    { icon: "🕌", label: "Musholla / Area Sholat" },
    { icon: "🍳", label: "Dapur & Peralatan Masak" },
    { icon: "🚗", label: "Parkir Mobil Luas" },
    { icon: "🌄", label: "Pemandangan Pegunungan" },
    { icon: "📶", label: "Wi-Fi" },
    { icon: "🔥", label: "Air Hangat" },
  ],

  villas: [
    {
      id: "melati",
      name: "Pondok Assunah — Melati",
      shortDescription:
        "Vila utama dengan ruang keluarga luas, cocok untuk keluarga besar atau rombongan pengajian.",
      capacity: "8–10 orang · 3 kamar tidur · 2 kamar mandi",
      pricePerNight: "Rp 950.000",
      facilities: [
        "3 kamar tidur (1 kamar utama dengan kamar mandi dalam)",
        "Musholla mini + perlengkapan sholat",
        "Dapur lengkap & peralatan masak",
        "Ruang keluarga & teras luas",
        "Halaman untuk anak-anak bermain",
        "Parkir mobil hingga 2 unit",
      ],
      images: ["images/melati/1.jpg", "images/melati/2.jpg", "images/melati/3.jpg"],
      whatsapp: "",
    },
    {
      id: "kenanga",
      name: "Pondok Assunah — Kenanga",
      shortDescription:
        "Vila nyaman ukuran sedang, ideal untuk keluarga kecil yang ingin liburan tenang dekat Sariater.",
      capacity: "4–6 orang · 2 kamar tidur · 1 kamar mandi",
      pricePerNight: "Rp 650.000",
      facilities: [
        "2 kamar tidur dengan kasur nyaman",
        "Area sholat pribadi",
        "Dapur kecil & kulkas",
        "Teras santai dengan pemandangan bukit",
        "Parkir mobil 1 unit",
      ],
      images: ["images/kenanga/1.jpg", "images/kenanga/2.jpg", "images/kenanga/3.jpg"],
      whatsapp: "",
    },
    {
      id: "anggrek",
      name: "Pondok Assunah — Anggrek",
      shortDescription:
        "Vila paling privat dan asri, cocok untuk pasangan atau keluarga yang mencari suasana tenang.",
      capacity: "2–4 orang · 1 kamar tidur · 1 kamar mandi",
      pricePerNight: "Rp 450.000",
      facilities: [
        "1 kamar tidur luas",
        "Area sholat pribadi",
        "Dapur ringkas",
        "Balkon pribadi menghadap perbukitan",
        "Parkir motor & mobil",
      ],
      images: ["images/anggrek/1.jpg", "images/anggrek/2.jpg"],
      whatsapp: "",
    },
  ],
};
