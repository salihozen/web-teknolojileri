import mongoose from "mongoose";
import dns from "node:dns";

// Okul, yurt veya yerel ağlarda MongoDB Atlas srv kaydı (querySrv EBADRESP) hatasını önlemek için güvenilir DNS sunucuları tanımlanır
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Varsayılan DNS ile devam edilir
}

const localURI = "mongodb://127.0.0.1:27017/kampus";
const dbURI = process.env.MONGODB_URI || localURI;

async function connectDB() {
  try {
    await mongoose.connect(dbURI, {
      serverSelectionTimeoutMS: 5000
    });
  } catch (err) {
    console.error("Mongoose bağlantı hatası:", err.message);
    if (dbURI !== localURI) {
      console.log("Atlas bağlantısı kurulamadı (IP İzin Listesi / Ağ kontrol ediniz). Yerel MongoDB'ye geçiliyor...");
      try {
        await mongoose.connect(localURI);
        console.log(`Yerel MongoDB'ye (${localURI}) başarıyla bağlanıldı.`);
      } catch (localErr) {
        console.error("Yerel MongoDB bağlantı hatası:", localErr.message);
      }
    }
  }
}

connectDB();

// Bağlantı Olayları (Connection Events) - Web-8 Slayt 96-105
mongoose.connection.on("connected", () => {
  console.log(`Mongoose veritabanına bağlandı: ${mongoose.connection.host || dbURI}`);
});

mongoose.connection.on("error", (err) => {
  console.error(`Mongoose bağlantı hatası: ${err.message || err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose bağlantısı kesildi");
});

// Uygulama kapandığında veritabanı bağlantısının düzgün kapatılması
const gracefulShutdown = async (msg, callback) => {
  try {
    await mongoose.connection.close();
    console.log(`Mongoose bağlantısı kapatıldı: ${msg}`);
  } catch (err) {
    console.error("Mongoose kapatılırken hata:", err);
  } finally {
    if (callback) callback();
  }
};

process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon yeniden başlatma", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});

process.on("SIGINT", () => {
  gracefulShutdown("uygulama sonlandırıldı (SIGINT)", () => {
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  gracefulShutdown("uygulama sonlandırıldı (SIGTERM)", () => {
    process.exit(0);
  });
});

// Modellerin yüklenmesi
import "./event.js";

export default mongoose;
