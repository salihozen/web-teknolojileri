/* global use, db */
// MongoDB Playground — Kampüs Etkinlikleri
// VS Code MongoDB eklentisi ile sağ üstteki 'Play' butonuna basarak çalıştırabilirsiniz.

// 1. Veritabanını seç
use('kampus');

// 2. Etkinlikler koleksiyonundaki tüm verileri listele
db.getCollection('events').find({});
