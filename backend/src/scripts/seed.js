import "dotenv/config";
import mongoose from "mongoose";
import dns from "node:dns";
import { events } from "../data/events.js";
import Event from "../models/event.js";

// Okul/öğrenci ağlarında DNS çözümlemesini garantiye al
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const targetURI = process.argv[2] || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kampus";

async function seed() {
  console.log(`Veritabanına bağlanılıyor: ${targetURI}`);
  await mongoose.connect(targetURI);
  console.log("Bağlantı başarılı!");

  // İki kez veya daha fazla çalıştırıldığında da tam olarak 6 kayıt olmasını garanti et
  await Event.deleteMany({});
  console.log("Mevcut koleksiyon temizlendi.");

  await Event.insertMany(events);
  console.log(`${events.length} adet başlangıç etkinliği başarıyla eklendi.`);

  const count = await Event.countDocuments();
  console.log(`Koleksiyondaki toplam kayıt sayısı: ${count}`);

  await mongoose.connection.close();
  console.log("Mongoose bağlantısı kapatıldı.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed hatası:", err.message || err);
    process.exit(1);
  });
