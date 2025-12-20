# Dokumentasi Proyek - Aplikasi Talenta Mahasiswa UMS

**Nama Proyek:** MyTalenta - Platform Showcase Talenta Mahasiswa UMS  
**Framework:** Django REST Framework (Backend) + ReactJS + TypeScript (Frontend)  
**Tim Pengembang:** Solusi Kode  
**Tanggal:** 20 Desember 2025

---

## Daftar Isi

1. [Ringkasan Proyek](#ringkasan-proyek)
2. [Entity Relationship Diagram](#entity-relationship-diagram-erd)
3. [User Flow](#user-flow)
4. [Arsitektur Aplikasi](#arsitektur-aplikasi)
5. [Arsitektur Deployment](#arsitektur-deployment)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Penjelasan Fitur](#penjelasan-fitur)
8. [Technology Stack](#technology-stack)
9. [Deployment](#deployment)

---

## Ringkasan Proyek

MyTalenta adalah platform web yang dirancang untuk membantu mahasiswa Universitas Muhammadiyah Surakarta dalam memamerkan dan mengelola profil talenta mereka. Platform ini memungkinkan:

- Mahasiswa membuat dan mengelola profil profesional
- Visitor publik mencari dan melihat talenta mahasiswa
- Admin mengelola data pengguna dan konten platform
- Filtering dan search talenta berdasarkan prodi dan skill
- Download CV dan portfolio mahasiswa

### Tujuan Pembelajaran

1. Memahami arsitektur aplikasi full-stack modern
2. Implementasi RESTful API dengan Django REST Framework
3. Penggunaan TypeScript untuk frontend development
4. Integrasi JWT authentication
5. Container orchestration dengan Docker
6. Cloud deployment dengan Google Cloud Platform

### Fitur Bonus yang Diimplementasikan

- TypeScript di frontend
- Dark/Light mode
- Deploy menggunakan Docker
- Swagger API Documentation

---

## Entity Relationship Diagram (ERD)

ERD menggambarkan struktur database aplikasi dengan relasi antar entitas.

![Entity Relationship Diagram](./DOKUMENTASI/DOKUMENTASI_PROYEK/erd.png)

### Entitas Utama:

#### 1. User (Authentication)
**Atribut:**
- id (PK)
- username (unique)
- email
- password (hashed)
- nim (unique)
- first_name
- last_name
- role (admin/student)
- is_staff
- is_superuser
- date_joined

**Relasi:**
- One-to-One dengan TalentProfile
- One-to-Many dengan Skill
- One-to-Many dengan Experience
- One-to-Many dengan Portfolio

#### 2. TalentProfile
**Atribut:**
- id (PK)
- user_id (FK to User)
- prodi
- phone_number
- address
- summary
- profile_picture
- cv_file
- linkedin_url
- github_url
- website_url
- is_open_to_work
- updated_at

**Relasi:**
- One-to-One dengan User

#### 3. Skill
**Atribut:**
- id (PK)
- user_id (FK to User)
- skill_name
- proficiency_level (beginner/intermediate/advanced/expert)

**Relasi:**
- Many-to-One dengan User

#### 4. Experience
**Atribut:**
- id (PK)
- user_id (FK to User)
- job_title
- company_name
- start_date
- end_date
- is_current
- description

**Relasi:**
- Many-to-One dengan User

#### 5. Portfolio
**Atribut:**
- id (PK)
- user_id (FK to User)
- project_title
- description
- project_url
- image

**Relasi:**
- Many-to-One dengan User

---

## User Flow

Berikut adalah alur penggunaan aplikasi MyTalenta untuk tiga tipe pengguna: Pengunjung Publik (Guest), Mahasiswa (User), dan Administrator.

### 1. Public Visitor Flow (Guest)

![Public Visitor Flow](./DOKUMENTASI/DOKUMENTASI_PROYEK/guest_flow.jpeg)

**Alur Penggunaan Pengunjung Publik:**

Pengunjung yang belum login dapat:

1. **Landing Page** - Halaman utama dengan informasi aplikasi
2. **Browse Talents** - Melihat daftar talenta mahasiswa
3. **Search & Filter:**
   - Filter berdasarkan Program Studi
   - Filter berdasarkan Skill
   - Search berdasarkan nama mahasiswa
   - Kombinasi filter dan search
4. **View Detail Talent** - Melihat profil lengkap mahasiswa
5. **Download CV** - Mengunduh CV mahasiswa (jika tersedia)
6. **View Social Links** - Akses LinkedIn, GitHub, atau website pribadi
7. **Register/Login** - Mendaftar atau masuk untuk fitur lebih lengkap

**Akses Terbatas:**
- Hanya dapat melihat profil yang berstatus "Open to Work"
- Tidak dapat mengelola data
- Tidak dapat melihat informasi kontak detail

---

### 2. Student User Flow (Mahasiswa)

![Student User Flow](./DOKUMENTASI/DOKUMENTASI_PROYEK/user_flow.jpeg)

**Alur Penggunaan Mahasiswa:**

Setelah login, mahasiswa memiliki akses ke dashboard pribadi dengan menu:

**A. Profile Management**
1. **View Dashboard** - Statistik profil dan quick access
2. **Edit Profile:**
   - Update informasi personal (nama, NIM, prodi)
   - Upload foto profil
   - Upload CV (PDF format)
   - Tambah summary/deskripsi diri
   - Update kontak (email, phone)
   - Tambah social links (LinkedIn, GitHub, Website)
   - Toggle status "Open to Work"

**B. Skills Management**
1. **View Skills** - Daftar skill yang sudah ditambahkan
2. **Add Skill:**
   - Input nama skill
   - Pilih proficiency level (Beginner/Intermediate/Advanced/Expert)
3. **Edit Skill** - Update informasi skill
4. **Delete Skill** - Hapus skill dari profil

**C. Experience Management**
1. **View Experiences** - Timeline pengalaman kerja/organisasi
2. **Add Experience:**
   - Job title / posisi
   - Nama perusahaan/organisasi
   - Periode (start date - end date)
   - Checkbox "Current position"
   - Deskripsi tanggung jawab
3. **Edit Experience** - Update informasi pengalaman
4. **Delete Experience** - Hapus pengalaman

**D. Portfolio Management**
1. **View Portfolio** - Gallery project yang sudah dibuat
2. **Add Project:**
   - Nama project
   - Deskripsi project
   - Upload gambar preview
   - Link GitHub/demo
3. **Edit Project** - Update informasi project
4. **Delete Project** - Hapus project dari portfolio

**E. Other Features**
- **Preview Public Profile** - Lihat profil sebagai pengunjung publik
- **Download Own CV** - Download CV yang sudah diupload
- **Logout** - Keluar dari akun

---

### 3. Admin User Flow (Administrator)

![Admin User Flow](./DOKUMENTASI/DOKUMENTASI_PROYEK/admin_flow.jpeg)

**Alur Penggunaan Administrator:**

Admin memiliki akses penuh untuk mengelola platform:

**A. Dashboard & Statistics**
1. **View Statistics:**
   - Total Mahasiswa terdaftar
   - Profil Aktif (open to work)
   - Profil Nonaktif
   - Skill paling populer
   - Prodi terbanyak
   - Grafik pertumbuhan user

**B. User Management**
1. **View All Users** - Daftar semua pengguna
2. **Filter & Search:**
   - Filter by role (student/admin)
   - Filter by prodi
   - Search by name/NIM
3. **User Actions:**
   - View detail user
   - Edit user information
   - Change user role
   - Activate/deactivate user
   - Delete user (soft delete)

**C. Talent Management**
1. **View All Talents** - Daftar profil talenta
2. **Filter Talents:**
   - By prodi
   - By skill
   - By work status
   - By completeness
3. **Talent Actions:**
   - Approve/reject new profiles
   - Feature talented students (highlight)
   - Review portfolio content
   - Moderate inappropriate content

**D. Content Management**
1. **Skill Management:**
   - View popular skills
   - Standardize skill names
   - Merge duplicate skills
2. **Report Review:**
   - Review reported profiles
   - Handle user complaints
   - Moderate content violations

**E. System Settings**
- **Configure platform settings**
- **Manage announcements**
- **Export data reports**
- **Backup database**
- **Logout**

---

### User Flow Summary

| Fitur | Guest | Student | Admin |
|-------|-------|---------|-------|
| Browse Talents | ✓ | ✓ | ✓ |
| Filter & Search | ✓ | ✓ | ✓ |
| View Detail | ✓ (Public only) | ✓ | ✓ |
| Download CV | ✓ | ✓ | ✓ |
| Manage Profile | ✗ | ✓ | ✗ |
| Manage Skills | ✗ | ✓ | ✗ |
| Manage Experience | ✗ | ✓ | ✗ |
| Manage Portfolio | ✗ | ✓ | ✗ |
| User Management | ✗ | ✗ | ✓ |
| View Statistics | ✗ | Limited | ✓ |
| Content Moderation | ✗ | ✗ | ✓ |

---

## Arsitektur Aplikasi

### System Architecture

![System Architecture](./DOKUMENTASI/DOKUMENTASI_PROYEK/system_architecture.jpeg)

### Penjelasan Arsitektur:

#### Frontend Layer (ReactJS + TypeScript)
- **UI Components:** Reusable React components dengan TypeScript
- **State Management:** Zustand untuk global state (authentication, user data)
- **Routing:** React Router DOM untuk client-side navigation
- **Styling:** Tailwind CSS + shadcn/ui components
- **API Communication:** Axios untuk HTTP requests

#### Backend Layer (Django REST Framework)
- **API Layer:** RESTful API endpoints dengan DRF
- **Authentication:** JWT-based authentication dengan SimpleJWT
- **Serialization:** DRF Serializers untuk data transformation
- **Validation:** Django Forms & DRF Validators
- **Permissions:** Custom permission classes untuk role-based access

#### Database Layer (PostgreSQL)
- **ORM:** Django ORM untuk database operations
- **Migrations:** Django migrations untuk schema management
- **Indexing:** Database indexes untuk performance optimization

#### Documentation Layer
- **Swagger UI:** Interactive API documentation dengan drf-yasg
- **ReDoc:** Alternative API documentation view

---

### Component Architecture

![Component Architecture](./DOKUMENTASI/DOKUMENTASI_PROYEK/component_architecture.jpeg)

### Struktur Komponen:

#### Frontend Components:

**1. Layout Components**
- Navbar (responsive navigation dengan role-based menu)
- Footer
- Sidebar (admin dashboard)

**2. Feature Components**

**Authentication:**
- LoginPage
- RegisterPage
- ProtectedRoute (HOC untuk route protection)

**Public:**
- LandingPage
- TalentaPage (list talents dengan filter/search)
- TalentDetailPage

**User Dashboard:**
- DashboardPage
- ProfileEditPage
- SkillManagement
- ExperienceManagement
- PortfolioManagement

**Admin Dashboard:**
- AdminDashboard
- UserManagement
- TalentManagement
- Statistics

**3. Shared Components**
- Button
- Input
- Card
- Modal
- Dropdown
- Toast (notifications)

#### Backend Apps:

**1. authentication**
- User Model (custom user dengan role)
- Registration API
- Login API (JWT token generation)
- Token Refresh API
- Logout API
- Get Current User API

**2. talents**
- TalentProfile Model & API
- Skill Model & API
- Experience Model & API
- Portfolio Model & API
- Public Talents List API (dengan filter & search)
- Latest Talents API
- Talent Detail API
- CV Download API

**3. config**
- Django settings
- URL routing
- CORS configuration
- Database configuration

---

## Arsitektur Deployment

### Production Deployment Architecture

![Production Deployment Architecture](./DOKUMENTASI/DOKUMENTASI_PROYEK/production_deployment_architecture.jpeg)

### Deployment Stack:

#### Infrastructure (Google Cloud Platform)

**1. Cloud Run (Backend)**
- Django REST Framework application
- Containerized dengan Docker
- Auto-scaling berdasarkan traffic
- HTTPS/SSL certificate otomatis
- Environment variables untuk secrets

**2. Cloud Storage (Static & Media Files)**
- Profile pictures
- CV files
- Portfolio images
- Static assets

**3. Cloud SQL (PostgreSQL)**
- Managed PostgreSQL database
- Automated backups
- High availability
- Connection pooling

**4. Netlify/Vercel (Frontend)**
- ReactJS application deployment
- CDN distribution
- Automatic HTTPS
- Preview deployments untuk PR

#### Network Architecture:

```
[Client Browser]
      ↓
[CDN - Netlify/Vercel] → [Frontend (React)]
      ↓                          ↓
[API Gateway]          ←←←  API Calls
      ↓
[Cloud Run] → [Backend (Django)]
      ↓              ↓
      ↓         [Cloud SQL]
      ↓              ↓
      ↓         [Database]
      ↓
[Cloud Storage]
      ↓
[Media Files]
```

### Environment Configuration:

#### Backend (.env):
```env
DEBUG=False
DJANGO_SECRET_KEY=<secret>
DATABASE_URL=postgresql://<cloud-sql>
CORS_ALLOWED_ORIGINS=https://mytalenta.netlify.app
GCP_STORAGE_BUCKET_NAME=talenta-ums-media
```

#### Frontend (.env):
```env
VITE_API_BASE_URL=https://talenta-ums-api.run.app
```

---

## CI/CD Pipeline

![CI/CD Pipeline](./DOKUMENTASI/DOKUMENTASI_PROYEK/CICD%20pipeline.jpeg)

### Pipeline Workflow:

#### 1. Development Phase
```
Developer → Git Commit → Git Push → GitHub
```

#### 2. CI Phase (Continuous Integration)
```
GitHub Webhook Trigger
     ↓
GitHub Actions Runner Start
     ↓
Checkout Code
     ↓
Install Dependencies
     ↓
Run Tests (Backend & Frontend)
     ↓
Lint Code (ESLint, Flake8)
     ↓
Build Docker Image (Backend)
     ↓
Build React App (Frontend)
     ↓
Push to Container Registry (GCR)
```

#### 3. CD Phase (Continuous Deployment)
```
Deploy to Staging Environment
     ↓
Run Integration Tests
     ↓
[Manual Approval Gate]
     ↓
Deploy to Production
     ↓
Health Check
     ↓
Rollback on Failure
```

### GitHub Actions Workflow:

#### Backend Deployment:
```yaml
name: Deploy Backend to Cloud Run

on:
  push:
    branches: [ main ]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Google Cloud SDK
        uses: google-github-actions/setup-gcloud@v1
        
      - name: Build and Push Docker Image
        run: |
          docker build -t gcr.io/project/backend .
          docker push gcr.io/project/backend
          
      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy backend \
            --image gcr.io/project/backend \
            --region asia-southeast2
```

#### Frontend Deployment:
```yaml
name: Deploy Frontend to Netlify

on:
  push:
    branches: [ main ]
    paths:
      - 'frontend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        
      - name: Install and Build
        run: |
          cd frontend
          npm install
          npm run build
          
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
```

---

## Penjelasan Fitur

### 1. Authentication & Authorization

**Deskripsi:**  
Sistem autentikasi menggunakan JWT (JSON Web Token) untuk keamanan API.

**Fitur:**
- **Registration:** Mahasiswa mendaftar dengan NIM, email, username, password
- **Login:** Autentikasi dengan username/password, mendapatkan access & refresh token
- **Token Refresh:** Perpanjangan sesi tanpa login ulang
- **Logout:** Invalidasi token
- **Role-based Access:** Student vs Admin permissions

**Tech Stack:**
- SimpleJWT untuk token generation
- Django custom User model
- Password hashing dengan bcrypt

**Endpoints:**
- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `POST /api/auth/token/refresh/`
- `POST /api/auth/logout/`
- `GET /api/auth/me/`

---

### 2. Profile Management

**Deskripsi:**  
Mahasiswa dapat membuat dan mengelola profil talenta mereka.

**Fitur:**
- **Personal Information:** Nama, NIM, prodi, kontak
- **Profile Picture:** Upload foto profil
- **CV Upload:** Upload CV dalam format PDF
- **Summary:** Deskripsi singkat tentang diri
- **Social Links:** LinkedIn, GitHub, website
- **Work Status:** Toggle "Open to Work"

**Tech Stack:**
- Django FileField untuk file upload
- Cloud Storage untuk media storage
- Image optimization

**Endpoints:**
- `GET /api/my-profile/`
- `PUT /api/my-profile/`
- `PATCH /api/my-profile/`

---

### 3. Skills Management

**Deskripsi:**  
Mahasiswa dapat menambah, edit, dan hapus skill mereka.

**Fitur:**
- **Add Skill:** Tambah skill dengan nama dan proficiency level
- **Proficiency Levels:** Beginner, Intermediate, Advanced, Expert
- **Edit Skill:** Update skill information
- **Delete Skill:** Hapus skill dari profil
- **Skill Display:** Tampilan badge skill di profil publik

**Tech Stack:**
- Django Many-to-One relationship
- DRF Serializers untuk nested data

**Endpoints:**
- `GET /api/skills/`
- `POST /api/skills/`
- `GET /api/skills/{id}/`
- `PUT /api/skills/{id}/`
- `PATCH /api/skills/{id}/`
- `DELETE /api/skills/{id}/`

---

### 4. Experience Management

**Deskripsi:**  
Mahasiswa dapat mendokumentasikan pengalaman kerja atau organisasi.

**Fitur:**
- **Add Experience:** Tambah riwayat pekerjaan/organisasi
- **Job Details:** Job title, company, start date, end date
- **Current Position:** Toggle untuk posisi yang masih berjalan
- **Description:** Detail tanggung jawab dan pencapaian
- **Timeline Display:** Urutan kronologis pengalaman

**Tech Stack:**
- Django DateField untuk periode
- Boolean field untuk status current

**Endpoints:**
- `GET /api/experiences/`
- `POST /api/experiences/`
- `GET /api/experiences/{id}/`
- `PUT /api/experiences/{id}/`
- `PATCH /api/experiences/{id}/`
- `DELETE /api/experiences/{id}/`

---

### 5. Portfolio Management

**Deskripsi:**  
Mahasiswa dapat showcase project portfolio mereka.

**Fitur:**
- **Add Project:** Tambah project ke portfolio
- **Project Details:** Title, description, URL, image
- **Image Upload:** Upload screenshot/preview project
- **External Links:** Link ke GitHub, live demo
- **Gallery View:** Grid display portfolio di profil

**Tech Stack:**
- Django ImageField untuk project images
- URL validation

**Endpoints:**
- `GET /api/portfolios/`
- `POST /api/portfolios/`
- `GET /api/portfolios/{id}/`
- `PUT /api/portfolios/{id}/`
- `PATCH /api/portfolios/{id}/`
- `DELETE /api/portfolios/{id}/`

---

### 6. Public Talent Listing

**Deskripsi:**  
Visitor publik dapat browse dan search talenta mahasiswa.

**Fitur:**
- **List All Talents:** Tampilkan semua profil yang open to work
- **Filter by Prodi:** Filter berdasarkan program studi
- **Filter by Skill:** Filter berdasarkan skill tertentu
- **Search:** Cari berdasarkan nama mahasiswa
- **Pagination:** Load data secara bertahap
- **Sorting:** Urut berdasarkan update terbaru

**Tech Stack:**
- Django Filter Backend
- DRF SearchFilter
- Custom FilterSet class

**Endpoints:**
- `GET /api/talents/` (dengan query params: prodi, skill, search)
- `GET /api/talents/latest/` (5 talents terbaru)

**Contoh Query:**
```
GET /api/talents/?prodi=Teknik Informatika&skill=Python
GET /api/talents/?search=aditya
```

---

### 7. Talent Detail & CV Download

**Deskripsi:**  
Visitor dapat melihat detail profil talenta dan download CV.

**Fitur:**
- **Full Profile View:** Semua informasi profil di satu halaman
- **Skills Display:** List semua skills dengan level
- **Experience Timeline:** Riwayat pengalaman kerja
- **Portfolio Gallery:** Grid project portfolio
- **CV Download:** Download CV dalam format asli
- **Contact Options:** Email, LinkedIn, GitHub buttons

**Tech Stack:**
- Django FileResponse untuk file download
- React detail page dengan tabs/sections

**Endpoints:**
- `GET /api/talents/{username}/`
- `GET /api/talents/{username}/download-cv/`

---

### 8. Admin Dashboard

**Deskripsi:**  
Admin dapat mengelola data pengguna dan monitoring platform.

**Fitur:**
- **Statistics Dashboard:**
  - Total mahasiswa terdaftar
  - Profil aktif (open to work)
  - Profil nonaktif
  - Most popular prodi
  - Most in-demand skills
  
- **User Management:**
  - View all users
  - Search and filter users
  - Edit user information
  - Delete users
  - Change user roles
  
- **Content Moderation:**
  - Review new profiles
  - Approve/reject content
  - Feature talented students

**Tech Stack:**
- Django Admin customization
- React admin panel dengan charts
- Real-time statistics dengan aggregations

**Access:**
- `/admin/` (Django Admin Panel)
- `/admin/dashboard` (Custom React Admin Dashboard)

---

### 9. Dark/Light Mode

**Deskripsi:**  
Toggle antara theme gelap dan terang untuk kenyamanan mata.

**Fitur:**
- **Theme Toggle:** Switch button di navbar
- **Persistent:** Theme preference tersimpan di localStorage
- **System Preference:** Deteksi system theme preference
- **Smooth Transition:** Animasi saat pergantian theme

**Tech Stack:**
- React Context untuk theme state
- Tailwind CSS dark mode utilities
- localStorage untuk persistence

**Implementation:**
```typescript
const { theme, setTheme } = useTheme()
<Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  Toggle Theme
</Button>
```

---

### 10. API Documentation (Swagger)

**Deskripsi:**  
Interactive API documentation untuk developer.

**Fitur:**
- **Interactive Testing:** Test endpoints langsung dari browser
- **Request Examples:** Sample request body & query params
- **Response Schemas:** Expected response structure
- **Authentication:** JWT authorization testing
- **Export:** Download OpenAPI spec (JSON/YAML)

**Tech Stack:**
- drf-yasg untuk auto-generation
- Swagger UI untuk interactive docs

**Access:**
- `/swagger/` (Swagger UI)
- `/swagger.json` (OpenAPI JSON)
- `/swagger.yaml` (OpenAPI YAML)

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI Framework |
| TypeScript | 5.6 | Type Safety |
| Vite | 6.0 | Build Tool |
| React Router | 7.1 | Routing |
| Zustand | 5.0 | State Management |
| Tailwind CSS | 3.4 | Styling |
| shadcn/ui | Latest | UI Components |
| Axios | 1.7 | HTTP Client |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Django | 5.0 | Web Framework |
| Django REST Framework | 3.16 | API Framework |
| SimpleJWT | 5.4 | JWT Authentication |
| drf-yasg | 1.22 | API Documentation |
| PostgreSQL | 16 | Database |
| python-dotenv | 1.0 | Environment Variables |
| django-cors-headers | 4.6 | CORS Handling |
| Pillow | 11.1 | Image Processing |
| django-filter | 25.2 | Filtering Support |

### DevOps
| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| GitHub Actions | CI/CD Pipeline |
| Google Cloud Run | Backend hosting |
| Cloud SQL | Database hosting |
| Cloud Storage | Media storage |
| Netlify/Vercel | Frontend hosting |

---

## Deployment

### Development Environment

**Backend:**
```bash
cd backend
python manage.py runserver
# http://localhost:8000
```

**Frontend:**
```bash
cd frontend
npm run dev
# http://localhost:5173
```

### Docker Development

```bash
docker-compose up -d
# Backend: http://localhost:8000
# Frontend: http://localhost:5173
# Database: PostgreSQL on port 5432
```

### Production Deployment

**Backend (Cloud Run):**
```bash
gcloud run deploy talenta-ums-backend \
  --source . \
  --region asia-southeast2 \
  --platform managed \
  --allow-unauthenticated
```

**Frontend (Netlify):**
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables

**Backend (.env):**
```env
DEBUG=False
DJANGO_SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@host:5432/db
ALLOWED_HOSTS=talenta-ums-api.run.app
CORS_ALLOWED_ORIGINS=https://mytalenta.netlify.app
SIMPLE_JWT_ACCESS_TOKEN_LIFETIME=30
SIMPLE_JWT_REFRESH_TOKEN_LIFETIME=1
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=https://talenta-ums-api.run.app
```

---

## Kesimpulan

MyTalenta berhasil diimplementasikan dengan arsitektur modern yang scalable dan maintainable. Platform ini menyediakan solusi end-to-end untuk showcase talenta mahasiswa UMS dengan fitur-fitur yang lengkap dan user-friendly.

### Pencapaian:
- Full-stack application dengan React + Django
- RESTful API dengan dokumentasi Swagger
- JWT Authentication
- Role-based Access Control
- File upload (CV, images)
- Advanced filtering dan search
- Responsive design
- Dark/light mode
- Containerization dengan Docker
- Cloud deployment
- CI/CD pipeline

### Future Improvements:
- Sistem rekomendasi talenta
- Endorsement skill antar mahasiswa
- QR Code profil
- Email notifications
- Advanced analytics
- Mobile application

---

**Dibuat oleh:** Tim Solusi Kode  
**Tanggal:** 20 Desember 2025  
**Video Demo:** [Gdrive](https://drive.google.com/drive/folders/1z-kGzH4ZAXjaJT1OSFElkXkP0NW6QwpR)  
**Live Demo:** [MyTalenta Frontend](https://personalprojectmytalenta.vercel.app/)

**Live Demo:** [MyTalenta Backend](https://personalprojectmytalenta-production.up.railway.app/admin)


