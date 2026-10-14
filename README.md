Canlı Yayın Linki: https://web-teknolojileri-frontend.vercel.app

# Sprint 4 — Vite, TypeScript ve React: Kampüs Etkinlikleri

Bu proje Kampüs Etkinlikleri uygulamasının React ve TypeScript ile yeniden geliştirilmiş halidir.

## Proje Dosya Yapısı ve Görevleri

- **package.json**: Proje adı, komutlar (dev, build) ve paket listesini içerir.
- **package-lock.json**: Yüklenen npm paketlerinin tam ve kilitli sürümlerini tutar.
- **node_modules/**: Projeye indirilen kütüphaneleri ve bağımlılıkları barındırır; GitHub'a gönderilmez.
- **tsconfig*.json**: TypeScript derleme seçenekleri ve ayarlarını tanımlar.
- **vite.config.ts**: Vite yapılandırması ve React eklentisi ayarlarını içerir.
- **index.html**: Uygulamanın tek HTML giriş noktasıdır; içerisinde React'in bağlanacağı boş `#root` div'i bulunur.
- **src/main.tsx**: React uygulamasını başlatan ve `App` bileşenini root elementine render eden dosyadır.
- **src/App.tsx**: Uygulamanın ana bileşenidir; 5 sayfanın mantığını ve arayüzünü tek merkezde toplar.
- **src/App.css**: Uygulamanın ve bileşenlerin özel stillerini içerir; Sprint 3 CSS kodları buraya taşınmıştır.
- **src/index.css**: Tüm sayfa için genel stilleri tutar; bu sprintte koyu tema çakışmasını önlemek için boş bırakılmıştır.
- **public/**: Derlenmeden doğrudan kök dizinde sunulan afiş ve ikon gibi statik dosyaları barındırır.

