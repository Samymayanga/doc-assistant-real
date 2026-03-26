const { extractText } = require("./../services/extractText");
const { analyzeDocument } = require("./../services/claudeService");

async function analyzeController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { mimetype, buffer, originalname } = req.file;

    const text = await extractText(buffer, mimetype);

    if (!text || text.trim().length < 20) {
      return res.status(422).json({
        error: "Could not extract readable text from this document.",
      });
    }

    const analysis = await analyzeDocument(text);

    return res.json({
      success: true,
      fileName: originalname,
      fileType: mimetype === "application/pdf" ? "PDF" : "Word Document",
      analysis,
    });
  } catch (err) {
    console.error("analyzeController error:", err.message);

    if (err.message.includes("Invalid file type")) {
      return res.status(400).json({ error: err.message });
    }
    if (err instanceof SyntaxError) {
      return res.status(500).json({
        error: "Failed to parse AI response. Please try again.",
      });
    }
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
}

module.exports = { analyzeController };
