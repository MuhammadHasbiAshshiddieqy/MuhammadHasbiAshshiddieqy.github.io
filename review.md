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

| # | Reviewer | Topik | Poin Review | Kategori | Skor | Status | Valid |
|---|---|---|---|---|---|---|---|
| 1 | Faiz | 1.1 LLM sebagai Reasoning Engine | Temperature 0.0 (deterministik via greedy decoding) tidak selalu optimal. Low temp konsisten, tapi belum tentu menghasilkan output terbaik. Panduan temperature seharusnya mengacu ke rekomendasi provider per model (misal Qwen3 reasoning vs non-reasoning punya setting berbeda), bukan satu angka generik. | Konsep & Teori | 5 | Belum diperbaiki | ✅ |
| 2 | Faiz | 1.1 LLM sebagai Reasoning Engine | Untuk evaluasi pada task tertentu (misal math), lebih baik jalankan dengan setup yang direkomendasikan provider, ulangi beberapa kali, dan hitung confidence interval — bukan set ke 0.0 untuk konsistensi palsu. Kecuali provider memang rekomendasikan 0.0 (seperti banyak contoh DeepSeek). | Praktik Terbaik | 3 | Belum diperbaiki | ✅ |

---

## Catatan

- **Valid ✅** = review akurat, perlu ditindaklanjuti di konten.
- **Valid ❌** = review tidak akurat atau sudah tercakup dengan benar di konten.
- **Status** diperbarui setelah perubahan di-commit ke `index.html`.
- Konten yang perlu diubah: topik 1.1, bagian *"Tiga konsep kunci"* bullet kedua tentang temperature, dan latihan *[Konseptual]* di topik 1.1 yang masih framing "temperature 0.0 lebih baik untuk agent production".
