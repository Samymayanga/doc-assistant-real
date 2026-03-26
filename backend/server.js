require("dotenv").config();
const express = require("express");
const cors = require("cors");
const analyzeRoute = require("./routes/analyse");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Correct CORS setup - don't use app.options('*', ...)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://doc-assistant-real.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Your API routes
app.use("/api", analyzeRoute);

// ❌ REMOVE this line - it's causing the error:
// app.options('*', cors());

// ✅ If you need to handle OPTIONS globally, use this instead:
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return res.sendStatus(200);
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
