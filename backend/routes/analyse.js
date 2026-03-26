// routes/analyse.js
const express = require("express");
const router = express.Router();
const upload = require("./../middleware/upload");
const { analyzeController } = require("./../controllers/analyzeController");

router.post("/analyze", upload.single("document"), analyzeController);

// ✅ CRITICAL: Handle OPTIONS preflight
router.options("/analyze", (req, res) => {
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});

module.exports = router;
