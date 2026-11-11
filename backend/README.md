# Kampüs Etkinlikleri — Express REST API (Sprint 7)

Bu proje, Kampüs Etkinlikleri sistemi için geliştirilmiş Express tabanlı REST API servisidir.

- **Öğrenci:** Ömer Salih Özen
- **Öğrenci No:** `2416501011`
- **Port:** `3000`

---

## 🚀 Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükleme
```bash
cd backend
npm install
```

### 2. Ortam Değişkenleri (.env)
Proje kökünde `.env.example` şablonu bulunmaktadır:
```env
PORT=3000
```
Yerel geliştirme için `.env` dosyasını oluşturun:
```bash
cp .env.example .env
```
> **Önemli:** `.env` ve `node_modules` dosyaları `.gitignore` dosyasında yer alır ve GitHub'a yüklenmez.

### 3. Sunucuyu Başlatma
Geliştirme modu (`node --watch` ile dosya değişince otomatik yeniden başlatma):
```bash
npm run dev
```

Üretim modu:
```bash
npm start
```

Sunucu başarıyla başlatıldığında konsola şu çıktı yazılır:
```
API: http://localhost:3000
```

---

## 📜 REST Sözleşmesi Tablosu

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **GET** | `/events` | Listeyi getir | 200 | — | Bu sprint |
| **GET** | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| **POST** | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| **PATCH** | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| **DELETE** | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

### Status Kodları ve Hata Biçimi
- **200:** Tamam
- **201:** Oluşturuldu
- **204:** İçerik yok
- **400:** Eksik / yanlış veri
- **404:** Bulunamadı

Bütün hata yanıtları standart olarak şu biçimdedir:
```json
{
  "error": {
    "message": "Event not found"
  }
}
```

---

## 🔍 Uç Noktalar ve Örnek İstek / Yanıtlar

### 1. GET /health
- **Açıklama:** Sunucu sağlık durumunu, zaman damgasını ve öğrenci numarasını döner.
- **Yanıt (200 OK):**
  ```json
  {
    "status": "ok",
    "time": "2026-11-05T10:46:15.547Z",
    "student": "2416501011"
  }
  ```

### 2. GET /events
- **Açıklama:** Sistemdeki 6 kayıtlı kampüs etkinliğini listeler. İsteğe bağlı `?category=Atölye` sorgusu ile filtreleme yapılabilir.
- **Yanıt (200 OK):**
  ```json
  [
    {
      "id": "event-1",
      "title": "Kariyer Günleri 2026",
      "category": "Seminer",
      "capacity": 100,
      "date": "2026-10-12",
      "time": "14:00",
      "location": "A Blok Konferans Salonu",
      "description": "Mezunlarla kariyer söyleşileri ve şirket standları."
    },
    {
      "id": "event-2",
      "title": "Robotik Atölyesi",
      "category": "Atölye",
      "capacity": 20,
      "date": "2026-10-20",
      "time": "10:00",
      "location": "Bilgisayar Laboratuvarı 2",
      "description": "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi."
    }
  ]
  ```

### 3. GET /events/:id
- **Örnek Başarılı (`GET /events/event-2`):**
  ```json
  {
    "id": "event-2",
    "title": "Robotik Atölyesi",
    "category": "Atölye",
    "capacity": 20,
    "date": "2026-10-20",
    "time": "10:00",
    "location": "Bilgisayar Laboratuvarı 2",
    "description": "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi."
  }
  ```
- **Örnek Hata (`GET /events/yok` — 404 Not Found):**
  ```json
  {
    "error": {
      "message": "Event not found"
    }
  }
  ```

### 4. POST /events
- **Örnek Başarılı Gövde (`POST /events` — 201 Created):**
  ```json
  {
    "title": "Git Atölyesi",
    "category": "Atölye",
    "capacity": 30,
    "date": "2026-12-01",
    "time": "14:00",
    "location": "Bilgisayar Laboratuvarı 1",
    "description": "Git ve GitHub ile ilk adımlar."
  }
  ```
  **Dönen Yanıt:**
  ```json
  {
    "id": "event-1793874052812",
    "title": "Git Atölyesi",
    "category": "Atölye",
    "capacity": 30,
    "date": "2026-12-01",
    "time": "14:00",
    "location": "Bilgisayar Laboratuvarı 1",
    "description": "Git ve GitHub ile ilk adımlar."
  }
  ```
- **Örnek Eksik Veri (`POST /events` — 400 Bad Request):**
  ```json
  {
    "title": "Git Atölyesi"
  }
  ```
  **Dönen Yanıt:**
  ```json
  {
    "error": {
      "message": "title, category and date are required"
    }
  }
  ```

---

## 📁 Repo ve Klasör Yapısı

```
backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/
│   │   └── event-routes.js
│   ├── controllers/
│   │   └── event-controller.js
│   └── data/
│       └── events.js
├── requests/
│   └── kampus-api.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🧪 Postman / Thunder Client Test Koleksiyonu

`backend/requests/kampus-api.json` koleksiyonu 6 adet test isteği içerir:
1. `1 Health` (`GET http://localhost:3000/health`)
2. `2 Etkinlik listesi` (`GET http://localhost:3000/events`)
3. `3 Tek etkinlik` (`GET http://localhost:3000/events/event-2`)
4. `4 Olmayan etkinlik (404)` (`GET http://localhost:3000/events/yok`)
5. `5 Etkinlik oluştur (201)` (`POST http://localhost:3000/events`)
6. `6 Eksik veri (400)` (`POST http://localhost:3000/events`)
