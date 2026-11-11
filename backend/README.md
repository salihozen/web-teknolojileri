# Kampüs Etkinlikleri — Express REST API (Sprint 7)

Bu proje, Kampüs Etkinlikleri sistemi için geliştirilmiş Express tabanlı RESTful API servisidir.

- **Öğrenci:** Ömer Salih Özen
- **Öğrenci No:** `2416501011`
- **Tema Tonu:** `--ton: 291`

---

## 🚀 Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükleme
```bash
cd backend
npm install
```

### 2. Çevre Değişkenleri (.env)
Proje kökünde `.env.example` şablonu bulunmaktadır. Çalıştırmak için `.env` dosyasını oluşturun veya kopyalayın:
```bash
# Windows PowerShell
cp .env.example .env
```
`.env` içeriği:
```env
PORT=5000
```
> **Not:** `.env` ve `node_modules` dosyaları `.gitignore` ile korunmakta olup GitHub'a yüklenmez.

### 3. Sunucuyu Başlatma
Geliştirme modu (nodemon ile otomatik yeniden başlatma):
```bash
npm run dev
```
Üretim modu:
```bash
npm start
```
Sunucu başlatıldığında konsolda şu çıktıyı verir:
```
Kampüs API sunucusu 5000 portunda çalışıyor...
Sağlık kontrolü: http://localhost:5000/health
```

---

## 📜 REST API Sözleşmesi (REST API Contract)

Tüm uç noktalar `http://localhost:5000` temel adresi altında sunulmaktadır.

### 1. Sağlık Kontrolü (Health Check)
- **Metot / Uç Nokta:** `GET /health`
- **Açıklama:** Sunucunun çalıştığını ve öğrenci numarasını doğrular.
- **Başarılı Yanıt Kodu:** `200 OK`
- **Yanıt Gövdesi (JSON):**
  ```json
  {
    "status": "ok",
    "student": "2416501011"
  }
  ```

---

### 2. Tüm Etkinlikleri Listele
- **Metot / Uç Nokta:** `GET /events`
- **Açıklama:** Sistemde kayıtlı olan 6 başlangıç etkinliğini ve sonradan eklenen etkinlikleri JSON dizisi olarak listeler.
- **Başarılı Yanıt Kodu:** `200 OK`
- **Yanıt Gövdesi (JSON Array):**
  ```json
  [
    {
      "id": "event-1",
      "title": "Kariyer Günleri 2026",
      "category": "Seminer",
      "date": "2026-10-12",
      "time": "14:00",
      "location": "A Blok Konferans Salonu",
      "capacity": 100,
      "description": "Mezunlarla kariyer söyleşileri ve şirket standları.",
      "image": "/afis.svg"
    },
    {
      "id": "event-2",
      "title": "Robotik Atölyesi",
      "category": "Atölye",
      "date": "2026-10-20",
      "time": "10:00",
      "location": "Bilgisayar Laboratuvarı 2",
      "capacity": 20,
      "description": "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi."
    }
    // ... toplam 6 başlangıç etkinliği
  ]
  ```

---

### 3. Tek Bir Etkinliği Getir
- **Metot / Uç Nokta:** `GET /events/:id`
- **Açıklama:** Parametre olarak verilen `:id` değerine göre ilgili etkinliğin detaylarını döner.
- **Başarılı Yanıt Kodu:** `200 OK`
- **Başarılı Yanıt Gövdesi (Örnek: `GET /events/event-1`):**
  ```json
  {
    "id": "event-1",
    "title": "Kariyer Günleri 2026",
    "category": "Seminer",
    "date": "2026-10-12",
    "time": "14:00",
    "location": "A Blok Konferans Salonu",
    "capacity": 100,
    "description": "Mezunlarla kariyer söyleşileri ve şirket standları.",
    "image": "/afis.svg"
  }
  ```
- **Hata Yanıtı (Bulunamadı):**
  - **Durum Kodu:** `404 Not Found`
  - **Örnek:** `GET /events/yok` veya `GET /events/event-999`
  - **Yanıt Gövdesi:**
    ```json
    {
      "message": "Etkinlik bulunamadı."
    }
    ```

---

### 4. Yeni Etkinlik Oluştur
- **Metot / Uç Nokta:** `POST /events`
- **Açıklama:** Sisteme yeni bir etkinlik kaydeder.
- **İstek Başlığı:** `Content-Type: application/json`
- **Zorunlu Alanlar:** `title`, `category`, `date`, `time`, `location`, `capacity`, `description`
- **İsteğe Bağlı Alanlar:** `image`
- **İstek Gövdesi (JSON):**
  ```json
  {
    "title": "Mobil Uygulama Geliştirme Hackathonu",
    "category": "Yarışma",
    "date": "2026-12-15",
    "time": "09:00",
    "location": "Mühendislik Fakültesi Konferans Salonu",
    "capacity": 50,
    "description": "24 saat sürecek mobil uygulama geliştirme maratonu."
  }
  ```
- **Başarılı Yanıt:**
  - **Durum Kodu:** `201 Created`
  - **Yanıt Gövdesi (Eklenen etkinlik nesnesi):**
    ```json
    {
      "id": "event-1794396758433",
      "title": "Mobil Uygulama Geliştirme Hackathonu",
      "category": "Yarışma",
      "date": "2026-12-15",
      "time": "09:00",
      "location": "Mühendislik Fakültesi Konferans Salonu",
      "capacity": 50,
      "description": "24 saat sürecek mobil uygulama geliştirme maratonu."
    }
    ```
- **Hata Yanıtı (Eksik veya Hatalı Veri):**
  - **Durum Kodu:** `400 Bad Request`
  - **Örnek İstek Gövdesi:** `{ "title": "Eksik Etkinlik" }`
  - **Yanıt Gövdesi:**
    ```json
    {
      "message": "Eksik veya geçersiz veri. Zorunlu alanlar: title, category, date, time, location, capacity, description."
    }
    ```

---

## 📁 Mimari ve Dosya Yapısı

```
backend/
├── .env.example                 # Ortam değişkeni şablonu (PORT=5000)
├── .env                         # Yerel ortam dosyası (git ignored)
├── .gitignore                   # node_modules ve .env dosyalarını yok sayar
├── package.json                 # Bağımlılıklar ve çalıştırma scriptleri
├── package-lock.json
├── README.md                    # REST API sözleşmesi ve dokümantasyon
├── data/
│   └── events.js                # 6 adet başlangıç kampüs etkinliği verisi
├── requests/
│   └── kampus-api.json          # 6 adet test isteği içeren API koleksiyonu
└── src/
    ├── app.js                   # Express yapılandırması, CORS ve ara yazılımlar
    ├── server.js                # process.env.PORT ile dinleyen sunucu giriş noktası
    ├── controllers/
    │   ├── healthController.js  # GET /health kontrolcüsü (student: "2416501011")
    │   └── eventsController.js  # GET /events, GET /events/:id, POST /events kontrolcüleri
    └── routes/
        ├── healthRoutes.js      # /health yönlendiricisi
        └── eventsRoutes.js      # /events yönlendiricisi
```

---

## 🧪 İstek Koleksiyonu (requests/kampus-api.json)

`backend/requests/kampus-api.json` dosyası Postman, Thunder Client ve Insomnia ile doğrudan içe aktarılabilir 6 adet hazır istek içerir:
1. `GET /health` (200 OK — Sağlık kontrolü ve öğrenci no)
2. `GET /events` (200 OK — 6 etkinlik listesi)
3. `GET /events/event-1` (200 OK — Başarılı tekil etkinlik detayı)
4. `GET /events/yok` (404 Not Found — Bulunamayan etkinlik)
5. `POST /events` (201 Created — Başarılı yeni etkinlik ekleme)
6. `POST /events` (400 Bad Request — Eksik veri ile istek hatası)
