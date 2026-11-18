/* global use, db */
// MongoDB Playground — Web-8 / Web-9 MekanBul Örneği
// Doç. Dr. Asım Sinan Yüksel - Web Teknolojileri ve Programlama

use('mekanbul');

// Örnek mekan verisi ekleme
db.getCollection('venues').insertOne({
  name: "Starbucks",
  address: "Centrum Garden AVM",
  rating: 4,
  foodanddrink: ["Kahve", "Çay", "Pasta"],
  coordinates: [37.7816, 30.5668],
  hours: [
    { days: "Pazartesi - Cuma", opening: "09:00", closing: "23:00", closed: false },
    { days: "Cumartesi - Pazar", opening: "10:00", closing: "23:00", closed: false }
  ],
  comments: [
    { author: "Ömer Salih", rating: 5, text: "Harika bir çalışma ortamı.", date: new Date() }
  ]
});

// Mekanları listele
db.getCollection('venues').find({});
