const express = require("express");
const router = express.Router();
const upload = require("./../middleware/upload");
const { analyzeController } = require("./../controllers/analyzeController");


router.post("/analyze", upload.single("document"), analyzeController);


router.options("/analyze", (req, res) => {
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});


router.get("/test", (req, res) => {
  res.json({ message: "API is working", timestamp: new Date().toISOString() });
});

module.exports = router;
