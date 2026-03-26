import React from "react";

export default function ErrorState({ message, onReset }) {
  return (
    <div className="error-state">
      <h2>Something went wrong</h2>
      <p className="error-message">{message}</p>
      <button className="btn-primary" onClick={onReset}>
        Try Again
      </button>
    </div>
  );
}
