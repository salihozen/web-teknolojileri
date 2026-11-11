import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json()); // body -> req.body

// GET /health
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501011"
  });
});

// GET / (Kök rota bilgilendirmesi)
app.get("/", (req, res) => {
  res.json({
    message: "Kampüs Etkinlikleri REST API Çalışıyor",
    student: "2416501011",
    endpoints: {
      health: "/health",
      events: "/events"
    }
  });
});

app.use("/events", eventRoutes);

// Eşleşme yoksa (404)
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;
