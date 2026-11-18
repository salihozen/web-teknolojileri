import "dotenv/config";
import mongoose from "mongoose";
import dns from "node:dns";
import { events } from "../data/events.js";
import Event from "../models/event.js";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const targetURI = process.argv[2] || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kampus";

async function seed() {
  console.log(`Veritabanına bağlanılıyor: ${targetURI}`);
  await mongoose.connect(targetURI);
  console.log("Bağlantı başarılı!");

  const existing = await Event.countDocuments();
  console.log(`Mevcut kayıt sayısı: ${existing}`);

  if (existing === 0) {
    await Event.insertMany(events);
    console.log(`${events.length} adet başlangıç etkinliği başarıyla yüklendi.`);
  } else {
    console.log("Veritabanında zaten kayıt mevcut. Güncelleniyor / korunuyor.");
    for (const item of events) {
      await Event.updateOne({ id: item.id }, { $set: item }, { upsert: true });
    }
    console.log("Etkinlikler güncellendi.");
  }

  const all = await Event.find({});
  console.log(`İşlem tamamlandı. Toplam kayıt: ${all.length}`);
  await mongoose.connection.close();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed hatası:", err);
    process.exit(1);
  });
