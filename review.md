# Review Log — Agentic AI Mastery

## Sistem Scoring

| Kategori | Poin | Keterangan |
|---|---|---|
| Konsep & Teori | 5 | Koreksi atau nuance pada fondasi konseptual yang mempengaruhi pemahaman pembaca |
| Akurasi Teknis | 4 | Koreksi pada detail teknis spesifik (parameter, API, implementasi) |
| Praktik Terbaik | 3 | Saran tentang workflow atau best practice yang lebih baik |
| Contoh Kode | 2 | Koreksi atau perbaikan pada kode contoh |
| Gaya Penulisan | 1 | Klarifikasi diksi, keterbacaan, atau struktur kalimat |

---

## Tabel Review

| # | Reviewer | Topik | Komentar Asli | Poin Review (Ringkasan) | Kategori | Skor | Status | Valid |
|---|---|---|---|---|---|---|---|---|
| 1 | Faiz | 1.1 LLM sebagai Reasoning Engine | *"betul 0.0 itu bakal bikin modelnya jadi deterministik karena pake proses greedy decoding (ngambil token dengan max. prob di setiap next token prediction) tapi low temp. atau bahkan deterministik temp 0.0 itu ga selalu bagus. paling konsisten iya karena deterministik, tapi untuk dapet yang paling bagus lebih baik ikut panduan dari model yang dipake. misal kalau pake Qwen3.5/3.6 itu ada optimized generation paramnya dan antara reasoning vs non-reasoning juga beda."* | Temperature 0.0 (deterministik via greedy decoding) tidak selalu optimal. Low temp konsisten, tapi belum tentu menghasilkan output terbaik. Panduan temperature seharusnya mengacu ke rekomendasi provider per model (misal Qwen3 reasoning vs non-reasoning punya setting berbeda), bukan satu angka generik. | Konsep & Teori | 5 | ✅ Diperbaiki | ✅ |
| 2 | Faiz | 1.1 LLM sebagai Reasoning Engine | *"kalau misal mau dieval gitu sebagus apa di task tertentu, misal jawab soal math, daripada di set ke 0.0 dan hasilnya konsisten/deterministik, mending pake setup yang direkomendasiin sama providernya terus di run beberapa kali dan calculate confidence intervalnya. kecuali memang recommended setupnya memang temp 0.0 (kayak contoh deepseek banyak yang gini)"* | Untuk evaluasi pada task tertentu (misal math), lebih baik jalankan dengan setup yang direkomendasikan provider, ulangi beberapa kali, dan hitung confidence interval — bukan set ke 0.0 untuk konsistensi palsu. Kecuali provider memang rekomendasikan 0.0 (seperti banyak contoh DeepSeek). | Praktik Terbaik | 3 | ✅ Diperbaiki | ✅ |

---

## Catatan

- **Valid ✅** = review akurat, perlu ditindaklanjuti di konten.
- **Valid ❌** = review tidak akurat atau sudah tercakup dengan benar di konten.
- **Status** diperbarui setelah perubahan di-commit ke `index.html`.
- Perubahan yang sudah diterapkan (commit `index.html`): bullet *Temperature & sampling* di "Tiga konsep kunci" diperbarui dengan penjelasan greedy decoding + panduan ikut rekomendasi provider + confidence interval; latihan *[Konseptual]* diubah framing-nya agar tidak lagi menyatakan 0.0 selalu lebih baik.
