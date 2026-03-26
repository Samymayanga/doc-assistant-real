// const express = require("express");
// const app = express();

// const port = 3000;

// app.listen(port, () => {
//   console.log("doc-assistant is working");
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const analyzeRoute = require("./routes/analyse");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api", analyzeRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
