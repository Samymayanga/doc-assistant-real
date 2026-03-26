import React, { useState, useRef } from "react";
import "./../uploadZone/UploadZone.css";
import pdf from "./../../assets/icons/pdf.png";
import txt from "./../../assets/icons/doc.png";

const ACCEPTED = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

export default function UploadZone({ onUpload }) {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const inputRef = useRef();

  const validate = (file) => {
    if (!ACCEPTED.includes(file.type)) {
      setFileError("Only PDF or Word (.docx) files are accepted.");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileError("File must be under 10MB.");
      return false;
    }
    setFileError("");
    return true;
  };

  const handleFile = (file) => {
    if (validate(file)) setSelectedFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = () => {
    if (selectedFile) onUpload(selectedFile);
  };

  return (
    <div className="upload-wrapper">
      <div className="upload-intro">
        <h1 className="upload-title">
          Understand any document
          <br />
          <em>in seconds.</em>
        </h1>
        <p className="upload-subtitle">
          Upload a PDF or Word document and let AI extract the key insights,
          summary, and structure for you.
        </p>
      </div>

      <div
        className={`drop-zone ${dragging ? "dragging" : ""} ${selectedFile ? "has-file" : ""}`}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !selectedFile && inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={onInputChange}
          style={{ display: "none" }}
        />

        {!selectedFile ? (
          <>
            <div className="drop-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect
                  x="8"
                  y="4"
                  width="26"
                  height="34"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M28 4v10h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M24 28v-10M19 23l5-5 5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 42h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="drop-primary">Drop your document here</p>
            <p className="drop-secondary">or click to browse</p>
            <p className="drop-hint">PDF · DOCX · Max 10MB</p>
          </>
        ) : (
          <div className="file-preview">
            <div className="file-icon">
              {selectedFile.name.endsWith(".pdf") ? (
                <img src={pdf} alt="" />
              ) : (
                <img src={txt} alt="" />
              )}
            </div>
            <div className="file-info">
              <p className="file-name">{selectedFile.name}</p>
              <p className="file-size">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              className="file-remove"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
              }}
              title="Remove file"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {fileError && <p className="upload-error"> {fileError}</p>}

      {selectedFile && !fileError && (
        <button className="analyze-btn" onClick={handleSubmit}>
          <span className="analyze">Analyze Document</span>
          <span className="btn-arrow">→</span>
        </button>
      )}
    </div>
  );
}
