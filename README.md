# Kampüs Etkinlikleri — Vize Projesi (Sprint 6)

- **Canlı Yayın Linki (Vercel):** [https://omersalihozen-frontend.vercel.app/](https://omersalihozen-frontend.vercel.app/) *(veya [https://web-teknolojileri-gh4h.vercel.app/](https://web-teknolojileri-gh4h.vercel.app/))*
- **GitHub Deposu:** [https://github.com/salihozen/web-teknolojileri](https://github.com/salihozen/web-teknolojileri)
- **Öğrenci:** Ömer Salih Özen
- **Öğrenci No:** 2416501011 (Tema Tonu: `--ton: 291`)

---

## 📌 Vize Projesi Kontrol Listesi & Karşılanan Maddeler

1. ✅ **Tüm linkler çalışıyor:** Uygulama içi geçişler `react-router-dom` (`Link`, `NavLink`, `useNavigate`) ile SPA yapısında kesintisiz çalışmaktadır.
2. ✅ **Tüm sayfalar hazır:** 10 sayfanın tümü eksiksiz oluşturuldu.
3. ✅ **Klasör ve dosya yapısı oluşturuldu:**
   ```
   frontend/
     src/
       components/
         layout/       # Header, Navigation, Footer
         events/       # EventCard, EventList, EventFilter, EventDetail
         forms/        # EventForm
       context/        # EventsContext.tsx (useEvents hook)
       pages/
         HomePage.tsx            # /
         EventsPage.tsx          # /events
         EventDetailPage.tsx     # /events/:id
         AdminPage.tsx           # /admin
         AddEventPage.tsx        # /admin/new
         EditEventPage.tsx       # /admin/:id/edit
         LoginPage.tsx           # /login
         RegisterPage.tsx        # /register
         ForgotPasswordPage.tsx  # /forgot-password
         NotFoundPage.tsx        # * (404)
       data/           # events.ts (initialEvents)
       types/          # campus-event.ts (CampusEvent, EventFormData, EventFormErrors)
       utils/          # filter-events.ts, format-date.ts, validate-event.ts
       App.tsx
       App.css
       index.css
       main.tsx
   ```
4. ✅ **10 adet router tanımlandı:**
   - `/` → `HomePage` (Yaklaşan etkinlikler ve yönlendirme)
   - `/events` → `EventsPage` (Arama ve kategori filtrelemeli tüm liste)
   - `/events/:id` → `EventDetailPage` (Dinamik etkinlik detayı, navigasyon ve tab başlığı entegrasyonu)
   - `/admin` → `AdminPage` (Yönetim tablosu, CRUD işlemleri)
   - `/admin/new` → `AddEventPage` (Yeni etkinlik ekleme formu)
   - `/admin/:id/edit` → `EditEventPage` (Etkinlik düzenleme formu)
   - `/login` → `LoginPage` (Giriş yap formu ve doğrulaması)
   - `/register` → `RegisterPage` (Kayıt ol formu ve doğrulaması)
   - `/forgot-password` → `ForgotPasswordPage` (Şifremi unuttum formu ve doğrulaması)
   - `*` → `NotFoundPage` (404 Sayfa Bulunamadı)
5. ✅ **Context kullanıldı ve tüm sayfalara bağlandı:** `EventsContext.tsx` (`EventsProvider` ve `useEvents`) veriyi tek merkezde tutar; props karmaşası olmadan tüm sayfalara sağlar.
6. ✅ **Ekle, sil, güncelle ve silmeden önce onay çalışıyor; etkisi diğer sayfalarda görülüyor:**
   - Ekleme: `/admin/new` üzerinden yeni etkinlik oluşturulduğunda Context güncellenir ve Ana Sayfa, Etkinlikler ve Yönetim sayfalarına anında yansır.
   - Güncelleme: `/admin/:id/edit` üzerinden var olan etkinlik güncellendiğinde tüm sistemde güncellenir.
   - Silme: `/admin` tablosunda "Sil" butonuna basıldığında `window.confirm` ile onay istenir; onaylandığında etkinlik silinir ve tüm sayfalardan kalkar.
7. ✅ **Son çalışır proje GitHub'a gönderildi.**
8. ✅ **Proje Vercel'de yayında:** [https://omersalihozen-frontend.vercel.app/](https://omersalihozen-frontend.vercel.app/) *(veya [https://web-teknolojileri-gh4h.vercel.app/](https://web-teknolojileri-gh4h.vercel.app/))*
9. ✅ **README yazıldı, Vercel linki README'ye eklendi.**
10. ✅ **Mobil görünüm doğru çalışıyor:** Esnek grid yapısı, responsive tablo sarmalayıcısı ve mobil uyumlu navigasyon menüsü mevcuttur.
11. ✅ **CSS bozulması yok, sayfa düzgün görünüyor:** Öğrenci numarasına göre hesaplanan `--ton: 291` HSL renk paleti ve belirgin kart çerçeveleri korunmuştur.
12. ✅ **Arama ve filtreleme çalışıyor:** Türkçe karakter duyarlı (`toLocaleLowerCase("tr-TR")`) arama ve dinamik kategori filtresi çalışmaktadır.
13. ✅ **Form doğrulama çalışıyor:**
    - **Etkinlik Formu:** `validateEvent` saf fonksiyonu ile başlık (en az 3 karakter), kategori seçimi, tarih/saat/yer zorunluluğu, kontenjan (1-1000 tam sayı) ve açıklama (en az 10 karakter) doğrulamaları yapılmakta; hatalar ilgili alanın altında kırmızı metin ve kırmızı kutu çerçevesiyle gösterilmektedir.
    - **Giriş Formu:** E-postada `@` kontrolü ve şifrede en az 6 karakter kontrolü.
    - **Kayıt Formu:** Ad Soyad (en az 3 karakter), e-posta, şifre ve şifre tekrarı eşleşme doğrulaması.
    - **Şifremi Unuttum Formu:** E-posta doğrulama ve geribildirim mesajı.

---

## 🛠️ Yerel Geliştirme (Local Development)

### Frontend (Sprint 6)
```bash
cd frontend
npm install
npm run dev
```

Derleme ve Kontrol:
```bash
npm run build
npm run lint
```

### Backend (Sprint 7 — Express REST API)
Detaylı REST API sözleşmesi ve dokümantasyon için [backend/README.md](./backend/README.md) dosyasına bakabilirsiniz.

```bash
cd backend
npm install
npm run dev
```

Sağlık kontrolü: `http://localhost:5000/health` (Dönen JSON: `student: "2416501011"`)
Etkinlikler: `http://localhost:5000/events`
Test istekleri koleksiyonu: `backend/requests/kampus-api.json`

