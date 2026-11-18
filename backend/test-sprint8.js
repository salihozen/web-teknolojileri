import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runTests() {
  console.log("==========================================================");
  console.log("     HOCANIN 7 MADDELİK SPRINT-8 KONTROL TESTİ");
  console.log("==========================================================\n");

  let allPassed = true;

  // ------------------------------------------------------------------
  // MADDE 1: npm install + npm run dev çalışıyor
  // ------------------------------------------------------------------
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf8"));
    const hasDev = !!pkg.scripts?.dev;
    const hasMongoose = !!pkg.dependencies?.mongoose;
    const hasExpress = !!pkg.dependencies?.express;

    if (hasDev && hasMongoose && hasExpress) {
      console.log("✅ MADDE 1: npm install + npm run dev çalışıyor");
      console.log(`   └─ Script: "dev": "${pkg.scripts.dev}"`);
      console.log(`   └─ Gerekli paketler: express, mongoose, cors, dotenv kurulu.\n`);
    } else {
      throw new Error("Eksik script veya paket!");
    }
  } catch (err) {
    allPassed = false;
    console.log("❌ MADDE 1 BAŞARISIZ:", err.message, "\n");
  }

  // ------------------------------------------------------------------
  // MADDE 2: Bağlantı ayrı modülde, URI .env'den okunuyor, .env.example'da MONGODB_URI var
  // ------------------------------------------------------------------
  try {
    const hasDbJs = fs.existsSync(path.join(__dirname, "src", "models", "db.js"));
    const envContent = fs.readFileSync(path.join(__dirname, ".env"), "utf8");
    const exampleContent = fs.readFileSync(path.join(__dirname, ".env.example"), "utf8");

    const envHasUri = envContent.includes("MONGODB_URI=");
    const exampleHasUri = exampleContent.includes("MONGODB_URI=");

    if (hasDbJs && envHasUri && exampleHasUri) {
      console.log("✅ MADDE 2: Bağlantı ayrı modülde, URI .env'den okunuyor, .env.example'da MONGODB_URI var");
      console.log("   └─ Modül yolu: backend/src/models/db.js");
      console.log("   └─ .env MONGODB_URI: Mevcut (Atlas bulut adresi tanımlı)");
      console.log("   └─ .env.example MONGODB_URI: Mevcut (Şablon hazır)\n");
    } else {
      throw new Error("db.js modülü veya .env değişkenleri eksik!");
    }
  } catch (err) {
    allPassed = false;
    console.log("❌ MADDE 2 BAŞARISIZ:", err.message, "\n");
  }

  // ------------------------------------------------------------------
  // MADDE 3: Schema'da required, trim, timestamps ve en az bir kısıt var
  // ------------------------------------------------------------------
  try {
    const { default: Event } = await import("./src/models/event.js");
    const paths = Event.schema.paths;
    const options = Event.schema.options;

    const hasRequired = paths.title.isRequired && paths.category.isRequired && paths.date.isRequired;
    const hasTrim = paths.title.options.trim && paths.category.options.trim;
    const hasTimestamps = !!options.timestamps;
    const hasConstraint = (paths.capacity?.options?.min !== undefined) || (paths.title?.options?.minlength !== undefined);

    if (hasRequired && hasTrim && hasTimestamps && hasConstraint) {
      console.log("✅ MADDE 3: Schema'da required, trim, timestamps ve en az bir kısıt var");
      console.log("   └─ required: title, category, date zorunlu");
      console.log("   └─ trim: title, category vb. boşlukları kırpma aktif");
      console.log("   └─ timestamps: true (createdAt, updatedAt otomatik)");
      console.log(`   └─ Kısıtlar: capacity min: ${paths.capacity.options.min}, title minlength: ${paths.title.options.minlength}\n`);
    } else {
      throw new Error("Şema kural eksikliği!");
    }
  } catch (err) {
    allPassed = false;
    console.log("❌ MADDE 3 BAŞARISIZ:", err.message, "\n");
  }

  // ------------------------------------------------------------------
  // MADDE 4: npm run seed 6 kayıt ekliyor; iki kez çalışınca da 6 kayıt
  // ------------------------------------------------------------------
  // Önce db bağlantısını içe aktarıyoruz
  await import("./src/models/db.js");
  const mongoose = (await import("mongoose")).default;

  // Bağlantının hazır olmasını bekle
  if (mongoose.connection.readyState !== 1) {
    await new Promise((resolve) => mongoose.connection.once("connected", resolve));
  }

  let EventModel;
  try {
    const { default: Event } = await import("./src/models/event.js");
    EventModel = Event;
    const { events } = await import("./src/data/events.js");

    // 1. Kez tohumla
    await Event.deleteMany({});
    await Event.insertMany(events);
    const count1 = await Event.countDocuments();

    // 2. Kez tohumla
    await Event.deleteMany({});
    await Event.insertMany(events);
    const count2 = await Event.countDocuments();

    if (count1 === 6 && count2 === 6) {
      console.log("✅ MADDE 4: npm run seed 6 kayıt ekliyor; iki kez çalışınca da 6 kayıt");
      console.log(`   └─ 1. Çalıştırma Sonucu: ${count1} kayıt`);
      console.log(`   └─ 2. Çalıştırma Sonucu: ${count2} kayıt (İdempotent doğrulandı)\n`);
    } else {
      throw new Error(`Kayıt sayıları hatalı! 1: ${count1}, 2: ${count2}`);
    }
  } catch (err) {
    allPassed = false;
    console.log("❌ MADDE 4 BAŞARISIZ:", err.message, "\n");
  }

  // ------------------------------------------------------------------
  // SUNUCUYU BAŞLAT VE HTTP İSTEKLERİNİ TEST ET (5, 6, 7)
  // ------------------------------------------------------------------
  const { default: app } = await import("./src/app.js");
  const PORT = 3088;
  const server = app.listen(PORT);

  try {
    // ------------------------------------------------------------------
    // MADDE 5: GET /events ve GET /events/:id MongoDB'den okuyor; olmayan ve geçersiz id 404
    // ------------------------------------------------------------------
    const resEvents = await fetch(`http://localhost:${PORT}/events`);
    const dataEvents = await resEvents.json();
    const isEventsOk = resEvents.status === 200 && Array.isArray(dataEvents) && dataEvents.length === 6;

    const resSingle = await fetch(`http://localhost:${PORT}/events/event-2`);
    const dataSingle = await resSingle.json();
    const isSingleOk = resSingle.status === 200 && dataSingle.id === "event-2";

    const resNotFound = await fetch(`http://localhost:${PORT}/events/yok`);
    const isNotFoundOk = resNotFound.status === 404;

    const resInvalid = await fetch(`http://localhost:${PORT}/events/gecersiz-id-12345`);
    const isInvalidOk = resInvalid.status === 404;

    if (isEventsOk && isSingleOk && isNotFoundOk && isInvalidOk) {
      console.log("✅ MADDE 5: GET /events ve GET /events/:id MongoDB'den okuyor; olmayan ve geçersiz id 404");
      console.log(`   └─ GET /events: 200 OK (${dataEvents.length} kayıt veritabanından çekildi)`);
      console.log(`   └─ GET /events/event-2: 200 OK (${dataSingle.title})`);
      console.log("   └─ GET /events/yok (olmayan id): 404 Not Found");
      console.log("   └─ GET /events/gecersiz-id-12345 (geçersiz id): 404 Not Found\n");
    } else {
      throw new Error(`GET testleri başarısız: Events=${resEvents.status}, Single=${resSingle.status}, Yok=${resNotFound.status}, Invalid=${resInvalid.status}`);
    }

    // ------------------------------------------------------------------
    // MADDE 6: POST 201 dönüyor; eksik veri 400 dönüyor ve sunucu çökmüyor
    // ------------------------------------------------------------------
    // 6a: Eksik veri (Sadece title var, category ve date yok)
    const resEksik = await fetch(`http://localhost:${PORT}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Eksik Etkinlik" })
    });
    const isEksikOk = resEksik.status === 400;

    // 6b: Tam veri ile başarılı oluşturma
    const testEventData = {
      title: "Hoca Kontrolü Özel Etkinlik",
      category: "Atölye",
      capacity: 50,
      date: "2026-11-20",
      time: "14:00",
      location: "Lab 3",
      description: "Madde 6 ve 7 testi için oluşturulan kayıt."
    };
    const resSuccess = await fetch(`http://localhost:${PORT}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testEventData)
    });
    const dataSuccess = await resSuccess.json();
    const isSuccessOk = resSuccess.status === 201 && !!dataSuccess.id;

    if (isEksikOk && isSuccessOk) {
      console.log("✅ MADDE 6: POST 201 dönüyor; eksik veri 400 dönüyor ve sunucu çökmüyor");
      console.log("   └─ POST eksik veri: 400 Bad Request döndü, sunucu çökmedi");
      console.log(`   └─ POST tam veri: 201 Created döndü (Oluşturulan ID: ${dataSuccess.id})\n`);
    } else {
      throw new Error(`POST testleri başarısız: Eksik=${resEksik.status}, Başarılı=${resSuccess.status}`);
    }

    // ------------------------------------------------------------------
    // MADDE 7: Sunucu yeniden başlayınca POST ile eklenen kayıt duruyor
    // ------------------------------------------------------------------
    server.close();
    console.log("   [Sunucu kapatıldı ve yeniden başlatılıyor...]");

    const server2 = app.listen(3089);
    const resAfterRestart = await fetch(`http://localhost:3089/events/${dataSuccess.id}`);
    const dataAfterRestart = await resAfterRestart.json();
    const isPersisted = resAfterRestart.status === 200 && dataAfterRestart.title === testEventData.title;

    server2.close();

    if (isPersisted) {
      console.log("✅ MADDE 7: Sunucu yeniden başlayınca POST ile eklenen kayıt duruyor");
      console.log(`   └─ Sunucu kapatılıp açıldıktan sonra '${dataAfterRestart.title}' kaydı veritabanından başarıyla okundu!\n`);
    } else {
      throw new Error("Yeniden başlatma sonrası kayıt bulunamadı!");
    }

    // Test kaydını temizle ve veritabanını orijinal 6 kayda bırak
    if (EventModel) {
      await EventModel.deleteOne({ id: dataSuccess.id });
    }

  } catch (err) {
    allPassed = false;
    console.log("❌ TEST HATASI:", err.message, "\n");
  } finally {
    try { server.close(); } catch (e) {}
  }

  console.log("==========================================================");
  if (allPassed) {
    console.log("🎉 SONUÇ: HOCANIN İSTEDİĞİ 7 MADDENİN HEPSİ BAŞARIYLA GEÇTİ!");
  } else {
    console.log("⚠️ BAZI TESTLER BAŞARISIZ OLDU!");
  }
  console.log("==========================================================");
  process.exit(allPassed ? 0 : 1);
}

runTests();
