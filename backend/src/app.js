const express = require("express");
const cors = require("cors");
const healthRoutes = require("./routes/healthRoutes");
const eventsRoutes = require("./routes/eventsRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/health", healthRoutes);
app.use("/events", eventsRoutes);

module.exports = app;
