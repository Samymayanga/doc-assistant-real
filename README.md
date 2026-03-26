# DocMind – AI-Powered Document Assistant

> Take-home assignment for the Feyti Medical Group Software Development Internship.

## What It Does

Upload a PDF or Word document and get back:

- **Title, Author & Document Type** — extracted intelligently
- **AI Summary** — 5–10 sentence overview
- **Key Points** — up to 7 bullet takeaways
- **Main Topics** — tag cloud of core subjects
- **Word Count** estimate

## Tech Stack

| Layer        | Technology               |
| ------------ | ------------------------ |
| Frontend     | React.js + Vite          |
| Backend      | Node.js + Express        |
| AI / LLM     | Groq API (Llama 3.3 70B) |
| PDF Parsing  | `pdf2json`               |
| DOCX Parsing | `mammoth`                |

---

## Project Structure

```
doc-assistant/
├── .gitignore
├── README.md
├── backend/
│   ├── server.js                        # App setup + server start
│   ├── routes/
│   │   └── analyze.js                   # POST /api/analyze route
│   ├── controllers/
│   │   └── analyzeController.js         # Request/response + error handling
│   ├── services/
│   │   ├── claudeService.js             # Groq API + prompt logic
│   │   └── extractText.js              # PDF and DOCX text extraction
│   ├── middleware/
│   │   └── upload.js                    # Multer file upload config
│   ├── .env.example
│   └── package.json
└── frontend/
    └── doc-assistant/
        ├── public/
        │   └── _redirects               # Render SPA routing fix
        ├── src/
        │   ├── assets/
        │   ├── components/
        │   │   ├── loadingState/
        │   │   │   ├── LoadingState.jsx
        │   │   │   └── LoadingState.css
        │   │   ├── resultsPanel/
        │   │   │   ├── ResultsPanel.jsx
        │   │   │   └── ResultsPanel.css
        │   │   ├── uploadZone/
        │   │   │   ├── UploadZone.jsx
        │   │   │   └── UploadZone.css
        │   │   ├── ErrorState.jsx
        │   │   ├── Footer.jsx
        │   │   └── Header.jsx
        │   ├── hooks/
        │   │   └── useDocumentAnalysis.js
        │   ├── App.jsx
        │   ├── App.css
        │   └── index.css
        ├── index.html
        ├── vite.config.js
        └── package.json
```

---

## Running Locally

### Prerequisites

- Node.js >= 18
- A free [Groq API key](https://console.groq.com) — no credit card needed

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/doc-assistant.git
cd doc-assistant
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# Open .env and fill in your GROQ_API_KEY
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend setup

```bash
cd frontend/doc-assistant
npm install
npm run dev
# App opens at http://localhost:5173
```

---

## Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
GROQ_API_KEY=your_groq_api_key_here
FRONTEND_URL=https://your-frontend.onrender.com
PORT=5000
```

---

## Deployment

### Backend → Render.com (free)

1. Push repo to GitHub
2. Go to [render.com](https://render.com) → **New → Web Service**
3. Connect your repo, set root directory to `backend`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables:
   - `GROQ_API_KEY` → your Groq key
   - `FRONTEND_URL` → your Vercel frontend URL

### Frontend → Vercel (free)

1. Go to [vercel.com](https://vercel.com) → **Import Project**
2. Connect your repo, set root directory to `frontend/doc-assistant`
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variable:
   - `VITE_API_URL` → your Render backend URL e.g. `https://doc-assistant-api.onrender.com`

---

## How It Works

1. User selects a PDF or DOCX file (max 10MB) via drag-and-drop or file picker
2. React sends the file as `multipart/form-data` to `POST /api/analyze`
3. Express receives it via `multer` into memory (no disk writes)
4. `pdf2json` or `mammoth` extracts plain text from the file
5. The text is sent to Groq's API (Llama 3.3 70B) with a strict JSON prompt
6. The AI returns title, author, type, summary, key points, topics, and word count
7. React renders the structured results with loading states and error handling

## Error Handling

| Scenario               | Response                            |
| ---------------------- | ----------------------------------- |
| Wrong file type        | 400 — rejected before reaching AI   |
| File over 10MB         | 400 — rejected by multer            |
| Unreadable/scanned PDF | 422 — clear error message           |
| AI API failure         | 500 — retry prompt shown            |
| Network error          | Caught client-side with error state |

---

_Built with React + Node.js + Groq AI_
