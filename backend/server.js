// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const analyzeRoute = require("./routes/analyse");

const app = express();
const PORT = process.env.PORT || 5000;

// CRITICAL: CORS must work regardless of NODE_ENV
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://doc-assistant-real.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// CRITICAL: Handle OPTIONS for all routes
app.options('*', cors());

app.use(express.json());

// Your routes
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api", analyzeRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`FRONTEND_URL: ${process.env.FRONTEND_URL}`);
});
