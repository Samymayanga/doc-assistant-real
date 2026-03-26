const { extractText } = require("./../services/extractText");
const { analyzeDocument } = require("./../services/claudeService");

async function analyzeController(req, res) {
  try {
    console.log("=== Analyze Request Received ===");
    console.log("File present:", !!req.file);
    
    if (!req.file) {
      console.log("No file in request");
      return res.status(400).json({ error: "No file uploaded." });
    }

    console.log("File details:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    const { mimetype, buffer, originalname } = req.file;
    
    console.log("Extracting text...");
    const text = await extractText(buffer, mimetype);
    console.log("Text extracted, length:", text.length);

    if (!text || text.trim().length < 20) {
      console.log("Text too short:", text?.length);
      return res.status(422).json({
        error: "Could not extract readable text from this document.",
      });
    }

    console.log("Analyzing with Groq...");
    const analysis = await analyzeDocument(text);
    console.log("Analysis complete");

    return res.json({
      success: true,
      fileName: originalname,
      fileType: mimetype === "application/pdf" ? "PDF" : "Word Document",
      analysis,
    });
  } catch (err) {
    console.error("analyzeController error:", err);
    console.error("Stack:", err.stack);
    
    if (err.message.includes("Invalid file type")) {
      return res.status(400).json({ error: err.message });
    }
    
    return res.status(500).json({ 
      error: "Something went wrong. Please try again.",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}

module.exports = { analyzeController };
