const express = require("express");
const cors = require("cors");
const healthRoutes = require("./routes/healthRoutes");
const eventsRoutes = require("./routes/eventsRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Kampüs Etkinlikleri REST API Çalışıyor",
    student: "2416501011",
    endpoints: {
      health: "/health",
      events: "/events"
    }
  });
});

app.use("/health", healthRoutes);
app.use("/events", eventsRoutes);

module.exports = app;

