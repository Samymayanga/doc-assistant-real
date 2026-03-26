require("dotenv").config();
const express = require("express");
const cors = require("cors");
const analyzeRoute = require("./routes/analyse");

const app = express();
const PORT = process.env.PORT || 5000;

const frontendUrl = (process.env.FRONTEND_URL || 'https://doc-assistant-real.vercel.app').replace(/\/$/, '');

app.use(cors({
  origin: frontendUrl,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api", analyzeRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
