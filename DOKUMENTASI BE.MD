# 📘 Dokumentasi Backend - UMS Student Talent

| Metadata | Detail |
| :--- | :--- |
| **Penanggung Jawab** | Backend Engineer |
| **Status** | ✅ Setup Doker |
| **Update Terakhir** | 8 Desember 2025 |

---

## 1. 🛠️ Apa Saja yang Telah Dikerjakan?

Berikut adalah rincian fitur dan konfigurasi yang sudah diimplementasikan di sisi Backend:

### A. Inisialisasi Project & Environment
* Setup **Virtual Environment (`venv`)** untuk isolasi library.
* Setup **Django Project** dengan struktur modular (Apps terpisah).
* Konfigurasi **Environment Variables (`.env`)** agar password database aman dan tidak terekspos di GitHub.

### B. Database & Model Data (PostgreSQL)
* Integrasi Django dengan **PostgreSQL**.
* **Custom User Model:** Mengganti user bawaan Django untuk mendukung role **'Student'** dan **'Admin'** serta penambahan field `NIM`.
* **Talent Models:** Membuat tabel relasional untuk data mahasiswa:
    * `TalentProfile`: Biodata, Foto, Status Kerja, Sosmed.
    * `Skill`: Daftar keahlian & level.
    * `Experience`: Riwayat pengalaman kerja/organisasi.
    * `Portfolio`: Galeri project dengan upload gambar.

### C. API & Logic (Django REST Framework)
* **Authentication:** Implementasi Login menggunakan **JWT (JSON Web Token)**.
* **Serializers:** Membuat transformer data agar Model Database bisa berubah menjadi JSON untuk Frontend.
* **API Views:**
    * *Public List:* Melihat semua talent.
    * *Public Detail:* Melihat detail satu talent via username.
    * *Private Dashboard:* Edit profil sendiri (hanya bisa diakses jika login).
* **CORS Config:** Membuka akses agar Frontend (React) bisa mengambil data dari Backend.

### D. Dokumentasi Otomatis
* Memasang **Swagger UI** agar daftar API bisa dilihat secara visual di browser.

---

## 2. 📦 Daftar Pustaka yang Diinstall (Dependencies)

Berikut adalah library eksternal yang saya instal dan fungsinya. Tim lain perlu tahu ini jika mereka ingin menjalankan di laptop mereka.

| Nama Library | Versi (Est.) | Kegunaan Utama |
| :--- | :--- | :--- |
| `django` | 5.x | Framework utama web. |
| `djangorestframework` | 3.x | Membuat REST API. |
| `psycopg2-binary` | Latest | Driver penghubung Django ke PostgreSQL. |
| `django-cors-headers` | Latest | Mengizinkan Frontend (React) mengakses API. |
| `djangorestframework-simplejwt` | Latest | Menangani Login & Token (Security). |
| `python-dotenv` | Latest | Membaca file `.env` (settingan rahasia). |
| `Pillow` | Latest | Mengelola upload file gambar. |
| `drf-yasg` | Latest | Membuat dokumentasi API otomatis (Swagger). |

---

## 3. 🔌 Panduan untuk Tim Frontend (API Endpoints)

Tim Frontend bisa langsung menggunakan URL berikut untuk integrasi.

**Base URL:** `http://localhost:8000`

### 🔐 Auth (Autentikasi)
* `POST /api/token/` : **Login**. Kirim `username` & `password`. Dapat `access_token`.
* `POST /api/token/refresh/` : **Refresh Token**. Jika token lama habis.

### 👤 Talent Data
* `GET /api/talents/` : **List Talent**. Mengambil daftar semua mahasiswa (Public).
* `GET /api/talents/<username>/` : **Detail Talent**. Mengambil data lengkap 1 orang (Public).
* `GET /api/talents/me/` : **My Profile**. Mengambil data user yang sedang login (Butuh Token).
* `PUT /api/talents/me/` : **Update Profile**. Edit data user yang sedang login (Butuh Token).

> **⚠️ Catatan Penting:**
> Untuk endpoint private (My Profile), Header request harus berisi:
> `Authorization: Bearer <access_token_kamu>`

---

## 4. 🚀 Cara Tim Lain Menjalankan Project (How to Run)

Jika teman sekelompok ingin menjalankan backend ini di laptop mereka, kirimkan panduan ini:

### 1. Clone Repository
Clone repository ini ke folder lokal.

### 2. Buat Virtual Environment
```bash
python -m venv venv
# Windows:
.\venv\Scripts\Activate
```

### 3. Install Library
```bash
pip install -r requirements.txt
```

### 4. Setup Database
Buat database kosong di pgAdmin bernama `talenta_ums`.

Buat file `.env` di folder root backend.

Copy settingan dari saya (minta via chat/WA), lalu sesuaikan password PostgreSQL masing-masing.

### 5. Migrate & Run
```bash
python manage.py migrate

python manage.py runserver
```

**Akses Dokumentasi:** Buka `http://127.0.0.1:8000/swagger/`

---

## 5. 📂 Struktur Folder Proyek

Agar tidak bingung mencari file:

```
backend/
├── manage.py            # File eksekusi utama
├── .env                 # Konfigurasi rahasia (Database & Key)
├── config/              # Jantung pengaturan (settings.py, urls.py)
├── authentication/      # App khusus Login & User Custom
│   ├── models.py        # Model User (Student/Admin)
├── talents/             # App khusus Data Mahasiswa
│   ├── models.py        # Model Profil, Skill, Portfolio
│   ├── serializers.py   # Pengubah data ke JSON
│   ├── views.py         # Logika API (List, Detail, Update)
│   ├── urls.py          # Daftar alamat API
└── media/               # Folder tempat gambar yang diupload user
```

---
## 🐳 Panduan Penggunaan Docker (Talenta UMS)
Panduan ini mencakup cara menjalankan aplikasi dari nol (belum ada database) hingga cara mengelola migrasi sehari-hari.

# Prasyarat
- Docker Desktop (harus status Running)
- Git Bash / Terminal VS Code

## Instalasi Baru / Fresh Start
Gunakan langkah ini jika Anda baru saja clone repository, atau baru saja mereset database (menghapus volume).

# Apabila sudah pernah melakukan migrasi sebisa mungkin folder migrasi dihapus dulu

Langkah 1: Persiapan Environment
Clone repository (jika belum).
Buat file .env di folder backend/ (bisa copy dari .env.example).
```Bash
cp backend/.env.example backend/.env
(Pastikan settingan DB_HOST=db di dalam .env)
```
Langkah 2: Jalankan Container
Jalankan perintah ini untuk membangun image dan menyalakan server.

```Bash
docker-compose up --build
Tunggu hingga log berhenti bergerak dan muncul tulisan "Starting development server".
```
Langkah 3: Inisialisasi Database (PENTING)
Karena database baru saja dibuat, isinya masih kosong. Buka terminal baru (biarkan terminal docker tetap jalan), lalu jalankan perintah ini urut:

```Bash
# 1. Masuk ke dalam container backend
docker exec -it talent_backend sh
# 2. Terapkan migrasi (Membuat tabel di DB)
python manage.py migrate
# 3. Buat akun Admin (Superuser)
python manage.py createsuperuser
# 4. Keluar dari container
exit
```
Web: http://localhost:5173
API/Admin: http://localhost:8000/admin