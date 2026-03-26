const mammoth = require("mammoth");
const PDFParser = require("pdf2json");

async function extractTextFromPDF(buffer) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (err) => reject(err.parserError));

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const text = pdfData.Pages.map((page) =>
        page.Texts.map((t) =>
          decodeURIComponent(t.R.map((r) => r.T).join("")),
        ).join(" "),
      ).join("\n");
      resolve(text);
    });

    pdfParser.parseBuffer(buffer);
  });
}

async function extractTextFromDocx(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

async function extractText(buffer, mimetype) {
  if (mimetype === "application/pdf") {
    return extractTextFromPDF(buffer);
  }
  return extractTextFromDocx(buffer);
}

module.exports = { extractText };
