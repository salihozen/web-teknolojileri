const express = require("express");
const {
  getEvents,
  getEventById,
  createEvent
} = require("../controllers/eventsController");

const router = express.Router();

// GET /events
router.get("/", getEvents);

// GET /events/:id
router.get("/:id", getEventById);

// POST /events
router.post("/", createEvent);

module.exports = router;
