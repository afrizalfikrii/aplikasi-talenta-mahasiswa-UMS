# Dokumentasi API - Aplikasi Talenta Mahasiswa UMS

**Proyek:** Aplikasi Talenta Mahasiswa Universitas Muhammadiyah Surakarta  
**Framework:** Django REST Framework  
**Dokumentasi:** Swagger UI (drf-yasg)  
**Tanggal:** 20 Desember 2025

---

## Daftar Isi

1. [Ringkasan](#ringkasan)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [Endpoint Groups](#endpoint-groups)
5. [Dokumentasi Interaktif](#dokumentasi-interaktif)
6. [Quick Start Guide](#quick-start-guide)
7. [Contoh Testing](#contoh-testing)
8. [Response Codes](#response-codes)

---

## Ringkasan

API ini menyediakan akses untuk mengelola profil talenta mahasiswa UMS, termasuk:
- Autentikasi & Registrasi
- Manajemen Profil Talenta
- Skills & Pengalaman
- Portfolio
- Search & Filter Talents

**Technology Stack:**
- Django 6.0
- Django REST Framework 3.16
- JWT Authentication (SimpleJWT)
- PostgreSQL 18
- drf-yasg (Swagger Documentation)

---

## Base URL

### Development
```
http://localhost:8000
```

### Production (Deployed)
```

```

---

## Authentication

API ini menggunakan **JWT (JSON Web Token)** untuk authentication.

### Cara Mendapatkan Token:

**1. Login via API:**

```http
POST /api/auth/login/
Content-Type: application/json

{
  "username": "username",
  "password": "password"
}
```

**Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**2. Gunakan Access Token di Header:**

Untuk semua endpoint yang memerlukan authentication, sertakan header:

```http
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

### Token Lifecycle:
- **Access Token:** Berlaku 30 menit
- **Refresh Token:** Berlaku 1 hari
- **Refresh Endpoint:** `POST /api/auth/token/refresh/`

---

## Endpoint Groups

### 1. Authentication (`/api/auth/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register/` | Registrasi user baru | No |
| POST | `/api/auth/login/` | Login & dapatkan JWT token | No |
| POST | `/api/auth/token/refresh/` | Refresh access token | No |
| POST | `/api/auth/logout/` | Logout | Yes |
| GET | `/api/auth/me/` | Get current user info | Yes |

### 2. Public Talents (`/api/talents/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/talents/` | List semua talents (with filter & search) | No |
| GET | `/api/talents/latest/` | Get 5 talents terbaru | No |
| GET | `/api/talents/{username}/` | Get detail talent by username | No |
| GET | `/api/talents/{username}/download-cv/` | Download CV talent | No |

**Query Parameters untuk `/api/talents/`:**
- `prodi` (string): Filter by program studi (case-insensitive)
- `skill` (string): Filter by skill name (case-insensitive)
- `search` (string): Search by username, first name, atau last name

**Contoh:**
```
GET /api/talents/?prodi=Teknik Informatika&skill=Python
```

### 3. User Profile (`/api/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/my-profile/` | Get profil user sendiri | Yes |
| PUT | `/api/my-profile/` | Update full profile | Yes |
| PATCH | `/api/my-profile/` | Update sebagian profile | Yes |

### 4. Skills (`/api/skills/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/skills/` | List skills user sendiri | Yes |
| POST | `/api/skills/` | Tambah skill baru | Yes |
| GET | `/api/skills/{id}/` | Get detail skill | Yes |
| PUT | `/api/skills/{id}/` | Update skill | Yes |
| PATCH | `/api/skills/{id}/` | Update sebagian skill | Yes |
| DELETE | `/api/skills/{id}/` | Hapus skill | Yes |

### 5. Experiences (`/api/experiences/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/experiences/` | List pengalaman user sendiri | Yes |
| POST | `/api/experiences/` | Tambah pengalaman baru | Yes |
| GET | `/api/experiences/{id}/` | Get detail pengalaman | Yes |
| PUT | `/api/experiences/{id}/` | Update pengalaman | Yes |
| PATCH | `/api/experiences/{id}/` | Update sebagian pengalaman | Yes |
| DELETE | `/api/experiences/{id}/` | Hapus pengalaman | Yes |

### 6. Portfolios (`/api/portfolios/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/portfolios/` | List portfolio user sendiri | Yes |
| POST | `/api/portfolios/` | Tambah portfolio baru | Yes |
| GET | `/api/portfolios/{id}/` | Get detail portfolio | Yes |
| PUT | `/api/portfolios/{id}/` | Update portfolio | Yes |
| PATCH | `/api/portfolios/{id}/` | Update sebagian portfolio | Yes |
| DELETE | `/api/portfolios/{id}/` | Hapus portfolio | Yes |

### 7. Admin Panel

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/` | Django Admin Panel | Yes (Admin Only) |

---

## Dokumentasi Interaktif

### Swagger UI

Akses dokumentasi interaktif dengan Swagger UI:

**Development:**
```
http://localhost:8000/swagger/
```

**Production:**
```
https://talenta-ums-api.run.app/swagger/
```

![Swagger UI Overview](./dokumentasi/DOKUMENTASI_API/swagger_ui.png)

**Screenshot menampilkan:**
- Semua endpoint yang tersedia
- Grouped by app (auth, talents, skills, experiences, portfolios)
- HTTP methods dengan color coding (GET=Hijau, POST=Orange, PUT=Biru, DELETE=Merah)
- Schemas untuk request/response models

---

## Quick Start Guide

### 1. Register User Baru

```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "aditya",
    "password": "affnd185",
    "email": "aditya@ums.ac.id",
    "nim": "L200230185",
    "first_name": "Aditya",
    "last_name": "Ryan Affandi"
  }'
```

**Response:**
```json
{
  "id": 6,
  "username": "aditya",
  "email": "aditya@ums.ac.id",
  "nim": "L200230185",
  "first_name": "Aditya",
  "last_name": "Ryan Affandi",
  "role": "student"
}
```

### 2. Login

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "aditya",
    "password": "affnd185"
  }'
```

**Response:**
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0Njg0NjAwLCJpYXQiOjE3MzQ2ODI4MDAsImp0aSI6ImFiYzEyMzQ1IiwidXNlcl9pZCI6Nn0.signature",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczNDc2OTIwMCwiaWF0IjoxNzM0NjgyODAwLCJqdGkiOiJ4eXo5ODc2NSIsInVzZXJfaWQiOjZ9.signature"
}
```

### 3. Update Profile

```bash
curl -X PUT http://localhost:8000/api/my-profile/ \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1Ni..." \
  -H "Content-Type: application/json" \
  -d '{
    "prodi": "Teknik Informatika",
    "summary": "",
    "phone_number": "",
    "linkedin_url": "",
    "github_url": "",
    "is_open_to_work": true
  }'
```

**Response:**
```json
{
  "id": 6,
  "username": "aditya",
  "email": "aditya@ums.ac.id",
  "nim": "L200230185",
  "first_name": "Aditya",
  "last_name": "Ryan Affandi",
  "prodi": "Teknik Informatika",
  "phone_number": "",
  "address": "",
  "summary": "",
  "profile_picture": null,
  "cv_file": null,
  "linkedin_url": "",
  "github_url": "",
  "website_url": "",
  "is_open_to_work": true,
  "updated_at": "2025-12-20T17:20:00Z"
}
```

### 4. Tambah Skill

```bash
curl -X POST http://localhost:8000/api/skills/ \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1Ni..." \
  -H "Content-Type: application/json" \
  -d '{
    "skill_name": "Python",
    "proficiency_level": "intermediate"
  }'
```

**Response:**
```json
{
  "id": 1,
  "skill_name": "Python",
  "proficiency_level": "intermediate"
}
```

### 5. Cek Profile Sendiri

```bash
curl http://localhost:8000/api/my-profile/ \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1Ni..."
```

**Response:**
```json
{
  "id": 6,
  "username": "aditya",
  "email": "aditya@ums.ac.id",
  "nim": "L200230185",
  "first_name": "Aditya",
  "last_name": "Ryan Affandi",
  "prodi": "Teknik Informatika",
  "phone_number": "",
  "address": "",
  "summary": "",
  "profile_picture": null,
  "cv_file": null,
  "linkedin_url": "",
  "github_url": "",
  "website_url": "",
  "is_open_to_work": true,
  "updated_at": "2025-12-20T17:20:00Z"
}
```

### 6. Cek Muncul di List Talents

```bash
curl http://localhost:8000/api/talents/
```

**Response:**
```json
[
  {
    "id": 6,
    "username": "aditya",
    "user": {
      "nim": "L200230185",
      "first_name": "Aditya",
      "last_name": "Ryan Affandi"
    },
    "prodi": "Teknik Informatika",
    "profile_picture": null,
    "summary": "",
    "linkedin_url": "",
    "github_url": "",
    "is_open_to_work": true,
    "updated_at": "2025-12-20T17:20:00Z",
    "skills": [
      {
        "id": 1,
        "skill_name": "Python",
        "proficiency_level": "intermediate"
      }
    ],
    "experiences": [],
    "portfolios": []
  },
  {
    "id": 2,
    "username": "naren",
    "user": {
      "nim": "L200230205",
      "first_name": "Narendra Satya",
      "last_name": "Kurniawan"
    },
    "prodi": "Teknik Informatika",
    "profile_picture": null,
    "summary": "",
    "is_open_to_work": true,
    "skills": [
      {
        "skill_name": "Javascript",
        "proficiency_level": "advanced"
      }
    ]
  },
  {
    "id": 1,
    "username": "muhammad",
    "user": {
      "nim": "L200230200",
      "first_name": "Muhammad",
      "last_name": ""
    },
    "prodi": "Pendidikan Agama Islam",
    "profile_picture": null,
    "summary": "",
    "is_open_to_work": true,
    "skills": [
      {
        "skill_name": "PHP",
        "proficiency_level": "expert"
      }
    ]
  }
]
```

### 7. Filter Talents by Prodi

```bash
curl "http://localhost:8000/api/talents/?prodi=Teknik Informatika"
```

**Response:**
```json
[
  {
    "id": 6,
    "username": "aditya",
    "user": {
      "nim": "L200230185",
      "first_name": "Aditya",
      "last_name": "Ryan Affandi"
    },
    "prodi": "Teknik Informatika",
    "profile_picture": null,
    "summary": "",
    "linkedin_url": "",
    "github_url": "",
    "is_open_to_work": true,
    "skills": [
      {
        "skill_name": "Python",
        "proficiency_level": "intermediate"
      }
    ]
  },
  {
    "id": 2,
    "username": "naren",
    "user": {
      "nim": "L200230205",
      "first_name": "Narendra Satya",
      "last_name": "Kurniawan"
    },
    "prodi": "Teknik Informatika",
    "profile_picture": null,
    "summary": "",
    "is_open_to_work": true,
    "skills": [
      {
        "skill_name": "Javascript",
        "proficiency_level": "advanced"
      }
    ]
  },
  {
    "id": 4,
    "username": "zidni",
    "user": {
      "nim": "L200230175",
      "first_name": "Muhammad Zidni",
      "last_name": "Khoirul Rizqi"
    },
    "prodi": "Teknik Informatika",
    "profile_picture": null,
    "summary": "",
    "is_open_to_work": true,
    "skills": [
      {
        "skill_name": "Javascript",
        "proficiency_level": "expert"
      }
    ]
  }
]
```

### 8. Filter Talents by Skill

```bash
curl "http://localhost:8000/api/talents/?skill=Python"
```

**Response:**
```json
[
  {
    "id": 6,
    "username": "aditya",
    "user": {
      "nim": "L200230185",
      "first_name": "Aditya",
      "last_name": "Ryan Affandi"
    },
    "prodi": "Teknik Informatika",
    "profile_picture": null,
    "summary": "",
    "linkedin_url": "",
    "github_url": "",
    "is_open_to_work": true,
    "skills": [
      {
        "skill_name": "Python",
        "proficiency_level": "intermediate"
      }
    ]
  },
  {
    "id": 5,
    "username": "afrizal",
    "user": {
      "nim": "L200230195",
      "first_name": "Afrizal",
      "last_name": "Fikri"
    },
    "prodi": "Teknik Elektro",
    "profile_picture": null,
    "summary": "",
    "is_open_to_work": true,
    "skills": [
      {
        "skill_name": "Python",
        "proficiency_level": "advanced"
      }
    ]
  }
]
```

### 9. Search Talents

```bash
curl "http://localhost:8000/api/talents/?search=aditya"
```

**Response:**
```json
[
  {
    "id": 6,
    "username": "aditya",
    "user": {
      "nim": "L200230185",
      "first_name": "Aditya",
      "last_name": "Ryan Affandi"
    },
    "prodi": "Teknik Informatika",
    "profile_picture": null,
    "summary": "",
    "linkedin_url": "",
    "github_url": "",
    "is_open_to_work": true,
    "skills": [
      {
        "skill_name": "Python",
        "proficiency_level": "intermediate"
      }
    ]
  }
]
```

### 10. Get Detail Talent

```bash
curl http://localhost:8000/api/talents/aditya/
```

**Response:**
```json
{
  "id": 6,
  "username": "aditya",
  "user": {
    "nim": "L200230185",
    "first_name": "Aditya",
    "last_name": "Ryan Affandi"
  },
  "prodi": "Teknik Informatika",
  "profile_picture": null,
  "summary": "",
  "phone_number": "",
  "address": "",
  "linkedin_url": "",
  "github_url": "",
  "website_url": "",
  "cv_file": null,
  "is_open_to_work": true,
  "updated_at": "2025-12-20T17:20:00Z",
  "skills": [
    {
      "id": 1,
      "skill_name": "Python",
      "proficiency_level": "intermediate"
    }
  ],
  "experiences": [],
  "portfolios": []
}
```

---

## Contoh Testing

### Testing di Swagger UI

#### 1. Test Public Endpoint - List Talents

**Endpoint:** `GET /api/talents/`

![Testing Public Endpoint](./dokumentasi/DOKUMENTASI_API/testing_endpoint.png)

**Screenshot menunjukkan:**
- Parameter query: `prodi`, `skill`, `search`
- Contoh request dengan filter: `prodi=Teknik Informatika&skill=Python`
- Response 200 OK dengan data talents
- Response headers

**Cara testing:**
1. Buka Swagger UI di http://localhost:8000/swagger/
2. Klik endpoint `GET /api/talents/`
3. Klik "Try it out"
4. Isi parameter filter:
   - prodi: `Teknik Informatika`
   - skill: `Javascript`
   - search: kosongkan
5. Klik "Execute"
6. Lihat response berisi list talents yang sesuai filter

#### 2. Test Login Endpoint

**Endpoint:** `POST /api/auth/login/`

![Testing Login Endpoint](./dokumentasi/DOKUMENTASI_API/testing_protected_endpoint.png)

**Screenshot menunjukkan:**
- Request body dengan username dan password
- Response 200 OK dengan access token dan refresh token
- cURL command yang dapat di-copy
- Response headers

**Cara testing:**
1. Buka Swagger UI
2. Klik endpoint `POST /api/auth/login/`
3. Klik "Try it out"
4. Isi Request Body:
   ```json
   {
     "username": "muhammad",
     "password": "password123"
   }
   ```
5. Klik "Execute"
6. Copy `access` token dari response
7. Gunakan token tersebut untuk test protected endpoints

#### 3. Test Error 401 - Unauthorized

**Endpoint:** `GET /api/my-profile/`

![Error 401 Unauthorized](./dokumentasi/DOKUMENTASI_API/error_401.png)

**Screenshot menunjukkan:**
- Test protected endpoint tanpa authorization token
- Response code 401
- Error message: "Authentication credentials were not provided."

**Cara testing:**
1. Buka Swagger UI
2. Klik endpoint `GET /api/my-profile/`
3. Klik "Try it out" tanpa login atau authorize
4. Klik "Execute"
5. Response akan menampilkan error 401

#### 4. Test Error 404 - Not Found

**Endpoint:** `GET /api/talents/{username}/`

![Error 404 Not Found](./dokumentasi/DOKUMENTASI_API/error_404.png)

**Screenshot menunjukkan:**
- Test endpoint dengan username yang tidak ada
- Response code 404
- Error message: "Not found."

**Cara testing:**
1. Buka Swagger UI
2. Klik endpoint `GET /api/talents/{username}/`
3. Klik "Try it out"
4. Isi parameter username: `useryangtidakada123`
5. Klik "Execute"
6. Response akan menampilkan error 404

---

## Response Codes

### Success Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request berhasil, response berisi data |
| 201 | Created | Resource berhasil dibuat (POST) |
| 204 | No Content | Request berhasil, tidak ada response body (DELETE) |

### Client Error Codes

| Code | Status | Description |
|------|--------|-------------|
| 400 | Bad Request | Request invalid, terjadi validasi error |
| 401 | Unauthorized | Authentication credentials tidak ada atau invalid |
| 403 | Forbidden | User tidak memiliki permission untuk resource |
| 404 | Not Found | Resource tidak ditemukan |
| 405 | Method Not Allowed | HTTP method tidak didukung untuk endpoint |

### Server Error Codes

| Code | Status | Description |
|------|--------|-------------|
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Server sedang maintenance |

---

## Request & Response Examples

### 1. Register User

**Request:**
```http
POST /api/auth/register/
Content-Type: application/json

{
  "username": "zidni",
  "password": "illuzy2025",
  "email": "",
  "nim": "L200230035",
  "first_name": "Muhammad Zidni",
  "last_name": "Khoirul Rizqi"
}
```

**Response (201 Created):**
```json
{
  "id": 4,
  "username": "zidni",
  "email": "",
  "nim": "L200230035",
  "first_name": "Muhammad Zidni",
  "last_name": "Khoirul Rizqi",
  "role": "student"
}
```

### 2. Login

**Request:**
```http
POST /api/auth/login/
Content-Type: application/json

{
  "username": "zidni",
  "password": "illuzy2025"
}
```

**Response (200 OK):**
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0Njg0NjAwLCJpYXQiOjE3MzQ2ODI4MDAsImp0aSI6ImFiYzEyMzQ1IiwidXNlcl9pZCI6Nn0.signature_here",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczNDc2OTIwMCwiaWF0IjoxNzM0NjgyODAwLCJqdGkiOiJ4eXo5ODc2NSIsInVzZXJfaWQiOjZ9.signature_here"
}
```

### 3. Get My Profile

**Request:**
```http
GET /api/my-profile/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "id": 6,
  "username": "zidni",
  "email": "",
  "nim": "L200230035",
  "first_name": "Muhammad Zidni",
  "last_name": "Khoirul Rizqi",
  "prodi": "Teknik Informatika",
  "phone_number": "",
  "address": "",
  "summary": "Belum ada summary",
  "profile_picture": null,
  "cv_file": null,
  "linkedin_url": "",
  "github_url": "",
  "website_url": "",
  "is_open_to_work": true,
  "updated_at": "2025-12-20T16:50:00Z"
}
```

### 4. List Talents (Public, with Filter)

**Request:**
```http
GET /api/talents/?prodi=Teknik Informatika&skill=Python
```

**Response (200 OK):**
```json
[
  {
    "id": 6,
    "username": "aditya",
    "user": {
      "nim": "L200230185",
      "first_name": "Aditya",
      "last_name": "Ryan Affandi"
    },
    "prodi": "Teknik Informatika",
    "profile_picture": null,
    "summary": "Belum ada summary",
    "linkedin_url": "",
    "github_url": "",
    "is_open_to_work": true,
    "updated_at": "2025-12-20T16:50:00Z",
    "skills": [
      {
        "id": 1,
        "skill_name": "Python",
        "proficiency_level": "intermediate"
      }
    ],
    "experiences": [],
    "portfolios": []
  },
  {
    "id": 5,
    "username": "afrizal",
    "user": {
      "nim": "L200230050",
      "first_name": "Afrizal",
      "last_name": "Muhammad"
    },
    "prodi": "Teknik Elektro",
    "profile_picture": null,
    "summary": "Belum ada summary",
    "linkedin_url": "",
    "github_url": "",
    "is_open_to_work": true,
    "updated_at": "2025-12-20T16:45:00Z",
    "skills": [
      {
        "id": 2,
        "skill_name": "Python",
        "proficiency_level": "advanced"
      }
    ],
    "experiences": [],
    "portfolios": []
  }
]
```

### 5. Add Skill

**Request:**
```http
POST /api/skills/
Authorization: Bearer eyJ0eXAiOiJKV1Qi...
Content-Type: application/json

{
  "skill_name": "React",
  "proficiency_level": "intermediate"
}
```

**Response (201 Created):**
```json
{
  "id": 3,
  "skill_name": "React",
  "proficiency_level": "intermediate"
}
```

---

## Error Responses

### 400 Bad Request (Validation Error)

```json
{
  "username": [
    "This field is required."
  ],
  "password": [
    "This field may not be blank."
  ]
}
```

### 401 Unauthorized

```json
{
  "detail": "Authentication credentials were not provided."
}
```

atau

```json
{
  "detail": "Given token not valid for any token type",
  "code": "token_not_valid",
  "messages": [
    {
      "token_class": "AccessToken",
      "token_type": "access",
      "message": "Token is invalid or expired"
    }
  ]
}
```

### 404 Not Found

```json
{
  "detail": "Not found."
}
```

---

## Best Practices

### 1. Security

- Selalu gunakan HTTPS di production
- Jangan share access token di public
- Store token secara aman (localStorage/sessionStorage)
- Implement token refresh saat access token expired
- Logout = hapus token dari storage

### 2. Performance

- Gunakan filter & search untuk mengurangi data yang di-fetch
- Implement pagination untuk list endpoints
- Cache response untuk data yang jarang berubah

### 3. Error Handling

- Selalu check response status code
- Display user-friendly error messages
- Log errors untuk debugging

---

## Troubleshooting

### "Authentication credentials were not provided"

**Penyebab:**
- Header Authorization tidak ada
- Format header salah

**Solusi:**
```http
Authorization: Bearer eyJ0eXAi...
```
Pastikan ada "Bearer " (dengan spasi) sebelum token!

### "Token is invalid or expired"

**Penyebab:**
- Access token sudah expired (> 30 menit)
- Token tidak valid

**Solusi:**
1. Gunakan refresh token untuk mendapatkan access token baru:
   ```http
   POST /api/auth/token/refresh/
   {
     "refresh": "eyJ0eXAi..."
   }
   ```
2. Atau login ulang

### CORS Error (di browser)

**Penyebab:**
- Frontend origin tidak di-allow di backend

**Solusi:**
- Cek `CORS_ALLOWED_ORIGINS` di `settings.py`
- Pastikan frontend URL sudah di-include

---

## Support & Resources

### Documentation Links

- **Swagger UI:** http://localhost:8000/swagger/

### Tools Recommended

- **API Testing:** Postman, Insomnia, Thunder Client
- **CLI Testing:** cURL, HTTPie
- **Documentation:** Swagger UI, ReDoc

### Contact

Untuk pertanyaan atau issue terkait API, hubungi tim pengembang:
- Email: dev@talenta-ums.ac.id
- GitHub Issues: [Repository Issues](https://github.com/your-repo/issues)

---

## Changelog

### Version 1.0 (20 Desember 2025)

**Features:**
- JWT Authentication
- User Registration & Login
- Talent Profile Management (CRUD)
- Skills Management (CRUD)
- Experiences Management (CRUD)
- Portfolios Management (CRUD)
- Public Talent Listing
- Filter by Prodi & Skill
- Search by Name
- Swagger Documentation
- CORS Configuration

**Known Issues:**
- Swagger UI authorize button menggunakan Basic Auth (akan diperbaiki di v1.1)
- Gunakan Postman atau manual header untuk testing protected endpoints

**Planned Features (v1.1):**
- Pagination untuk list endpoints
- Rate limiting
- File upload validation
- Email verification
- Password reset