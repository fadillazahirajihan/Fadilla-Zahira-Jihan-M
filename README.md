# Math Connect

Website pembelajaran matematika interaktif berdasarkan storyboard 17 scene yang diberikan.

## Struktur
- `index.html` — entry point
- `css/style.css` — seluruh styling dan responsive layout
- `js/app.js` — navigasi SPA, peta konsep, slider pecahan, konversi, perbandingan, operasi, refleksi
- `assets/logo.svg` — logo Math Connect

## Cara menjalankan di Visual Studio Code
1. Ekstrak folder.
2. Buka folder `math-connect` di VS Code.
3. Install extension **Live Server** jika ingin preview otomatis.
4. Klik kanan `index.html` → **Open with Live Server**.
5. Website dapat langsung digunakan tanpa framework.

## Catatan desain
Implementasi menggunakan HTML, CSS, dan JavaScript vanilla agar mudah dikembangkan. Visual utama dibuat dengan CSS/SVG sehingga tidak bergantung pada aset eksternal.

## Alur utama
Beranda → Peta Konsep → Bilangan → Pecahan → Kenali → Representasi/Jenis → Pecahan Senilai → Desimal/Persen → Perbandingan → Operasi → Penerapan → Hubungan → Refleksi → My Math Journey.

## Pengembangan berikutnya
- Tambahkan database/progress siswa.
- Simpan refleksi menggunakan localStorage.
- Tambahkan autentikasi.
- Tambahkan lebih banyak konsep pada peta.
- Integrasikan soal diagnostik dan feedback miskonsepsi.
