const express = require("express");
const router = express.Router();
const upload = require("./../middleware/upload");
const { analyzeController } = require("./../controllers/analyzeController");

// POST endpoint
router.post("/analyze", upload.single("document"), analyzeController);

// ✅ Correct OPTIONS handler for this route
router.options("/analyze", (req, res) => {
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});

module.exports = router;
