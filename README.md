# Aivise: Personalized AI Advisor & Analytic Chatbot

**Aivise** adalah platform AI interaktif yang memadukan analisis data, prediksi bisnis, dan saran personal berdasarkan tokoh inspiratif dunia usaha. Dibangun untuk memberikan insight berbasis data dan panduan dari mentor legendaris secara interaktif dan dapat dikustomisasi.

---

## Fitur Utama

### 1. AI Chatbot dengan Mentor Personal
- Pilih mentor (Michael Gerber, Stephen Covey, Eric Ries) yang akan memengaruhi gaya dan isi jawaban AI.
- Setiap mentor memiliki `mentorCode` unik (ex: `EMYTH`, `7HABITS`, `LEAN`).
- Gunakan input teks atau suara (Speech Recognition support).

### 2. Analisis Otomatis dari File CSV
- Upload file CSV via form.
- Lakukan:
  - Statistik deskriptif (min, mean, max, median, variance, range).
  - Visualisasi bar chart menggunakan QuickChart API.
  - Insight otomatis (dengan AI Agent).
  - Prediksi regresi linear.

### 3. Prediksi Bisnis
- Model Linear Regression akan memprediksi kolom seperti `Profit` atau `GrowthRate`.
- Model dilatih secara dinamis di n8n tanpa menyimpan model secara berat di frontend.

### 4. Tutorial Interaktif
- Modal tutorial berbasis langkah (`TutorialModal`) muncul otomatis untuk pengguna baru.
- Highlight elemen tertentu (dropdown, input, mic) untuk onboarding yang intuitif.

---

## Teknologi yang Digunakan

- **Frontend:** ReactJS, TailwindCSS
- **Backend Workflow:** [n8n.io](https://n8n.io/)
- **AI & Statistik:** Python (via n8n code nodes), Sklearn (Linear Regression)
- **Gambar Grafik:** QuickChart API
- **Cloud & Storage:** Supabase
- **File Handling:** n8n Binary + JSON Convert
- **Speech:** `react-speech-recognition`

---

## Struktur Folder Utama

```
/frontend
  └── components/
  └── pages/
  └── assets/
  └── data/
  └── App.js

/n8n
  └── workflows/
      └── csv-analysis.json
      └── regression-predict.json
      └── generate-report.json

/public
  └── downloads/
```

---

## Alur Kerja (n8n)

1. **Form Submission**
   - File CSV diterima → dibaca sebagai binary → diubah ke JSON.
2. **Statistik & Grafik**
   - Hitung: min, mean, max, median, variance, range.
   - Visualisasi: QuickChart bar chart dengan multi-dataset.
3. **Insight & Laporan**
   - Insight diringkas → file PDF dibuat otomatis (opsional).
   - Dapat didownload via tombol/link.

---

## Contoh Dataset (4 numerik + 2 kategori)

```csv
Revenue,Cost,Profit,GrowthRate,Category,Region
5000,2500,2500,0.10,Tech,Asia
6000,2700,3300,0.15,Finance,Europe
...
```

---

## Cara Menjalankan

### 1. Jalankan React Frontend

```bash
cd frontend
npm install
npm run dev
```

### 2. Setup n8n Workflow

- Deploy `csv-analysis.json` ke n8n.
- Pastikan node `on form submission` menerima file.
- Tambahkan credential PDF.co dan QuickChart bila diperlukan.

### 3. Supabase Setup

- Tambahkan kredensial Supabase di file `lib/supabaseClient.js`.

---

## Catatan Tambahan

- Beberapa fitur (prediksi, grafik) hanya berjalan jika file CSV valid dan kolom numerik dikenali otomatis.
- 
---

## Credits

- Mentor referensi: Michael Gerber (`The E-Myth`), Stephen Covey (`7 Habits`), Eric Ries (`The Lean Startup`)
- Dibuat untuk kebutuhan hackathon & sebagai fondasi AI bisnis personal.
