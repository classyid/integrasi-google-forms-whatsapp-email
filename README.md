# Integrasi Google Forms dengan WhatsApp dan Email

Proyek ini mengotomatisasi proses pengiriman pesan WhatsApp dan email sebagai respons terhadap submission Google Form. Menggunakan Google Apps Script untuk menciptakan integrasi yang mulus antara Google Forms, WhatsApp Business API, dan Gmail.

## Fitur

- Secara otomatis mengirim pesan WhatsApp personal ke responden formulir
- Mengirim email konfirmasi ke responden
- Mencatat semua aktivitas untuk troubleshooting yang mudah
- Mudah diatur dan disesuaikan

## Prasyarat

- Akun Google dengan akses ke Google Forms dan Google Sheets
- Akun WhatsApp Business API (misalnya, dari m-pedia)
- Pengetahuan dasar tentang Google Apps Script

## Instruksi Pengaturan

1. Buat Google Form dan hubungkan ke Google Spreadsheet.
2. Buka spreadsheet yang terhubung dan pergi ke Extensions > Apps Script.
3. Salin konten `script.gs` dari repositori ini ke editor Apps Script.
4. Ganti API key placeholder dan nomor pengirim di fungsi `sendWhatsAppMessage` dengan kredensial WhatsApp Business API Anda yang sebenarnya.
5. Simpan script dan buat trigger baru yang menjalankan fungsi `onFormSubmit` saat pengiriman formulir.

## Penggunaan

Setelah diatur, script akan berjalan secara otomatis setiap kali respons formulir baru dikirimkan. Ini akan:

1. Mengekstrak informasi responden dari pengiriman formulir.
2. Mengirim pesan WhatsApp personal ke responden.
3. Mengirim email konfirmasi ke responden.
4. Mencatat semua aktivitas untuk pemantauan dan debugging.

## Kustomisasi

Anda dapat dengan mudah menyesuaikan template pesan di kedua fungsi `sendWhatsAppMessage` dan `sendEmail` agar sesuai dengan kebutuhan spesifik Anda.

## Troubleshooting

Periksa log Apps Script untuk pesan error atau informasi debugging. Masalah umum meliputi:
- Kredensial API WhatsApp yang salah
- Masalah izin dengan Gmail
- Nama kolom yang tidak cocok di Google Sheet

## Kontribusi

Kontribusi untuk meningkatkan script atau memperluas fungsionalitasnya sangat diterima. Silakan kirim pull request atau buka issue untuk bug atau permintaan fitur.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file LICENSE untuk detailnya.

## Pengakuan

- Terima kasih kepada komunitas Google Apps Script atas sumber daya dan dokumentasi mereka yang sangat berharga.
- Penyedia WhatsApp Business API yang memungkinkan integrasi pesan otomatis.

---

Ingatlah untuk selalu menghormati privasi pengguna dan mematuhi semua peraturan perlindungan data yang relevan saat mengumpulkan dan menggunakan informasi pribadi.
