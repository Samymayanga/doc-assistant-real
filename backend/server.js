require("dotenv").config();
const express = require("express");
const cors = require("cors");
const analyzeRoute = require("./routes/analyse");

const app = express();
// ✅ CRITICAL: Use the PORT from environment (Render sets this)
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://doc-assistant-real.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// ✅ IMPORTANT: Add a simple health check at root level
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is healthy" });
});

// Your API routes
app.use("/api", analyzeRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
});

// ✅ Bind to 0.0.0.0 (required for Render)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
