# Kampüs Etkinlikleri — Express REST API (Sprint 8)

Bu proje, Kampüs Etkinlikleri sistemi için geliştirilmiş Express ve MongoDB/Mongoose tabanlı REST API servisidir.

- **Öğrenci:** Ömer Salih Özen
- **Öğrenci No:** `2416501011`
- **Port:** `3000`
- **Veritabanı:** MongoDB Atlas (Cloud) / MongoDB Community Server (Local)

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
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/kampus
```
Yerel geliştirme için `.env` dosyasını oluşturun:
```bash
cp .env.example .env
```
> **Önemli Güvenlik Notu:** `.env` ve `node_modules` dosyaları `.gitignore` dosyasında yer alır ve GitHub deposuna commit edilmez.

### 3. Veritabanını Başlatma ve Tohumlama (Seed)
Veritabanına 6 adet başlangıç kampüs etkinliğini yüklemek için:
```bash
npm run seed
```
*(Bu komut arka arkaya kaç kez çalıştırılırsa çalıştırılsın veritabanını temizleyip tam olarak 6 kayıt olmasını garanti eder).*

### 4. Sunucuyu Başlatma
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
Mongoose veritabanına bağlandı: ...
```

---

## 📜 REST Sözleşmesi Tablosu

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **GET** | `/health` | Sağlık kontrolü & öğrenci bilgisi | 200 | — | Tamamlandı |
| **GET** | `/events` | MongoDB'den tüm etkinlikleri getir | 200 | 500 | Sprint 8 |
| **GET** | `/events/:id` | Tek etkinlik (olmayan/geçersiz id 404) | 200 | 404 | Sprint 8 |
| **POST** | `/events` | MongoDB'ye yeni etkinlik ekle | 201 | 400 | Sprint 8 |
| **PUT/PATCH** | `/events/:id` | Etkinlik güncelle | 200 | 400, 404 | Tamamlandı |
| **DELETE** | `/events/:id` | Etkinlik sil | 204 | 404 | Tamamlandı |

---

## 🧪 Postman Test Koleksiyonu
Postman testleri `backend/requests/Kampus-API.postman_collection.json` dosyasında ve `backend/requests/Kampüs API` klasöründe yer almaktadır:
1. `GET /health` -> 200 OK (`student: "2416501011"`)
2. `GET /events` -> 200 OK (6 kayıt)
3. `GET /events/event-2` -> 200 OK (event-2 detayı)
4. `GET /events/yok` -> 404 Not Found (`error.message`)
5. `POST /events` (tam body) -> 201 Created (yeni oluşturulan etkinlik ve id)
6. `POST /events` (eksik veri) -> 400 Bad Request (`title, category and date are required`)
