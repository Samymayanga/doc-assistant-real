import React from "react";
import "./../resultsPanel/ResultsPanel.css";
import pdf from "./../../assets/icons/pdf.png";
import txt from "./../../assets/icons/doc.png";

export default function ResultsPanel({ result, onReset }) {
  const { fileName, fileType, analysis } = result;
  const {
    title,
    author,
    documentType,
    summary,
    keyPoints = [],
    mainTopics = [],
    wordCount,
  } = analysis;

  return (
    <div className="results-wrapper">
      {/* Top bar */}
      <div className="results-topbar">
        <div className="file-badge">
          <span className="badge-icon">
            {fileType === "PDF" ? (
              <img src={pdf} alt="" />
            ) : (
              <img src={txt} alt="" />
            )}
          </span>
          <span className="badge-name">{fileName}</span>
        </div>
        <button className="btn-reset" onClick={onReset}>
          New Document
        </button>
      </div>

      {/* Meta cards */}
      <div className="meta-grid">
        <MetaCard label="Title" value={title} accent />
        <MetaCard label="Author" value={author} />
        <MetaCard label="Type" value={documentType} />
        <MetaCard
          label="Word Count"
          value={wordCount?.toLocaleString() ?? "—"}
        />
      </div>

      {/* Summary */}
      <section className="result-section">
        <h2 className="section-heading">
          <span className="section-dot" />
          Summary
        </h2>
        <p className="summary-text">{summary}</p>
      </section>

      {/* Key points */}
      {keyPoints.length > 0 && (
        <section className="result-section">
          <h2 className="section-heading">
            <span className="section-dot green" />
            Key Points
          </h2>
          <ul className="key-points">
            {keyPoints.map((point, i) => (
              <li key={i} className="key-point">
                <span className="point-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Topics */}
      {mainTopics.length > 0 && (
        <section className="result-section">
          <h2 className="section-heading">
            <span className="section-dot purple" />
            Main Topics
          </h2>
          <div className="topics-list">
            {mainTopics.map((topic, i) => (
              <span key={i} className="topic-tag">
                {topic}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function MetaCard({ label, value, accent }) {
  return (
    <div className={`meta-card ${accent ? "accent" : ""}`}>
      <p className="meta-label">{label}</p>
      <p className="meta-value">{value || "—"}</p>
    </div>
  );
}
