require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Kampüs API sunucusu ${PORT} portunda çalışıyor...`);
  console.log(`Sağlık kontrolü: http://localhost:${PORT}/health`);
});
