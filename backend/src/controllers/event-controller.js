import { events as defaultEvents } from "../data/events.js";
import Event from "../models/event.js";
import mongoose from "mongoose";

// GET /events (?category=Atölye isteğe bağlı)
export async function getEvents(req, res) {
  try {
    const { category } = req.query;
    if (mongoose.connection.readyState === 1) {
      const filter = category ? { category } : {};
      const list = await Event.find(filter).lean();
      return res.json(list);
    }
    const list = category
      ? defaultEvents.filter((e) => e.category === category)
      : defaultEvents;
    return res.json(list);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
}

// GET /events/:id (Sprint 8: olmayan ve geçersiz id 404)
export async function getEventById(req, res) {
  try {
    const { id } = req.params;
    if (!id || id === "undefined" || id === "null") {
      return res.status(404).json({ error: { message: "Event not found" } });
    }

    if (mongoose.connection.readyState === 1) {
      const isObjectId = mongoose.isValidObjectId(id);
      const query = isObjectId ? { $or: [{ id }, { _id: id }] } : { id };
      const event = await Event.findOne(query).lean();
      if (!event) {
        return res.status(404).json({ error: { message: "Event not found" } });
      }
      return res.json(event);
    }

    const event = defaultEvents.find((e) => e.id === id);
    if (!event) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    return res.json(event);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    return res.status(500).json({ error: { message: err.message } });
  }
}

// POST /events (Sprint 8: POST 201 dönüyor; eksik veri 400 dönüyor ve sunucu çökmüyor)
export async function createEvent(req, res) {
  try {
    const { title, category, capacity, date, time, location, description } = req.body ?? {};

    // Eksik veri kontrolü -> 400
    if (!title || !category || !date) {
      return res.status(400).json({ error: { message: "title, category and date are required" } });
    }

    const newEventData = {
      id: `event-${Date.now()}`,
      title: String(title).trim(),
      category: String(category).trim(),
      date: String(date).trim(),
      capacity: Number(capacity) || 0,
      time: time ? String(time).trim() : "",
      location: location ? String(location).trim() : "",
      description: description ? String(description).trim() : ""
    };

    if (mongoose.connection.readyState === 1) {
      const created = await Event.create(newEventData);
      return res.status(201).json(created);
    }

    defaultEvents.push(newEventData);
    return res.status(201).json(newEventData);
  } catch (err) {
    // Mongoose validation hataları da 400 döner, sunucu kesinlikle çökmez
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: { message: err.message } });
    }
    return res.status(500).json({ error: { message: err.message } });
  }
}

// PUT /events/:id
export async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body ?? {};

    if (mongoose.connection.readyState === 1) {
      const isObjectId = mongoose.isValidObjectId(id);
      const query = isObjectId ? { $or: [{ id }, { _id: id }] } : { id };
      const updated = await Event.findOneAndUpdate(query, updateData, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ error: { message: "Event not found" } });
      return res.json(updated);
    }

    const index = defaultEvents.findIndex((e) => e.id === id);
    if (index === -1) return res.status(404).json({ error: { message: "Event not found" } });
    defaultEvents[index] = { ...defaultEvents[index], ...updateData };
    return res.json(defaultEvents[index]);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: { message: err.message } });
    }
    return res.status(500).json({ error: { message: err.message } });
  }
}

// DELETE /events/:id
export async function deleteEvent(req, res) {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const isObjectId = mongoose.isValidObjectId(id);
      const query = isObjectId ? { $or: [{ id }, { _id: id }] } : { id };
      const deleted = await Event.findOneAndDelete(query);
      if (!deleted) return res.status(404).json({ error: { message: "Event not found" } });
      return res.status(204).send();
    }

    const index = defaultEvents.findIndex((e) => e.id === id);
    if (index === -1) return res.status(404).json({ error: { message: "Event not found" } });
    defaultEvents.splice(index, 1);
    return res.status(204).send();
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    return res.status(500).json({ error: { message: err.message } });
  }
}
