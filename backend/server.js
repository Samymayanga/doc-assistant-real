// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const analyzeRoute = require("./routes/analyse");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Fix: Remove trailing slash from FRONTEND_URL
const frontendUrl = (process.env.FRONTEND_URL || 'https://doc-assistant-real.vercel.app').replace(/\/$/, '');

app.use(cors({
  origin: frontendUrl,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Handle OPTIONS preflight
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

// Health check endpoints
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Doc Assistant Backend is running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Your routes
app.use("/api", analyzeRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ CORS enabled for: ${frontendUrl}`);
});
