const { events: initialEvents } = require("../../data/events");

// In-memory events store initialized from data/events.js
let eventsList = [...initialEvents];

// GET /events - Tüm etkinlikleri listele
const getEvents = (req, res) => {
  res.status(200).json(eventsList);
};

// GET /events/:id - Belirli bir etkinliği getir
const getEventById = (req, res) => {
  const { id } = req.params;
  const event = eventsList.find((e) => String(e.id) === String(id));

  if (!event) {
    return res.status(404).json({
      message: "Etkinlik bulunamadı."
    });
  }

  res.status(200).json(event);
};

// POST /events - Yeni etkinlik oluştur
const createEvent = (req, res) => {
  const { title, category, date, time, location, capacity, description, image } = req.body || {};

  // Zorunlu alan kontrolü
  if (
    !title ||
    !category ||
    !date ||
    !time ||
    !location ||
    capacity === undefined ||
    capacity === null ||
    !description
  ) {
    return res.status(400).json({
      message: "Eksik veya geçersiz veri. Zorunlu alanlar: title, category, date, time, location, capacity, description."
    });
  }

  const parsedCapacity = Number(capacity);
  if (isNaN(parsedCapacity) || parsedCapacity <= 0) {
    return res.status(400).json({
      message: "Kontenjan (capacity) pozitif bir sayı olmalıdır."
    });
  }

  const newEvent = {
    id: `event-${Date.now()}`,
    title: String(title).trim(),
    category: String(category).trim(),
    date: String(date).trim(),
    time: String(time).trim(),
    location: String(location).trim(),
    capacity: parsedCapacity,
    description: String(description).trim(),
    ...(image ? { image: String(image).trim() } : {})
  };

  eventsList.push(newEvent);

  res.status(201).json(newEvent);
};

module.exports = {
  getEvents,
  getEventById,
  createEvent
};
