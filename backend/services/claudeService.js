const Groq = require("groq-sdk");

// Initialize Groq with API key
const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY 
});

const PROMPT_TEMPLATE = (text) => `You are a document analysis assistant. Analyze the following document and respond ONLY with a valid JSON object — no markdown, no backticks, no extra text.

The JSON must have exactly these keys:
{
  "title": "detected document title or best guess",
  "author": "detected author(s) or 'Not specified'",
  "documentType": "type of document (e.g. Report, Research Paper, Letter, Assignment, etc.)",
  "summary": "a clear 5-10 sentence summary of the document",
  "keyPoints": ["array", "of", "5-7", "key", "points"],
  "mainTopics": ["array", "of", "main", "topics"],
  "wordCount": estimated_word_count_as_number
}

Document text:
${text}`;

async function analyzeDocument(text) {
  try {
    console.log("Analyzing document, text length:", text.length);
    
    const truncated = text.slice(0, 12000);
    
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: PROMPT_TEMPLATE(truncated) }],
      max_tokens: 1500,
      temperature: 0.3,
    });

    const raw = response.choices[0].message.content.trim();
    console.log("Raw response:", raw.substring(0, 200));
    
    // Clean the response
    const clean = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    return JSON.parse(clean);
  } catch (error) {
    console.error("Groq analysis error:", error);
    throw new Error(`Failed to analyze document: ${error.message}`);
  }
}

module.exports = { analyzeDocument };
