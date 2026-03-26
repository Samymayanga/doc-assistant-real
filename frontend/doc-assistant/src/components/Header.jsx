import React from "react";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">DocMind</span>
        </div>
        <p className="header-tagline">AI-Powered Document Intelligence</p>
      </div>
    </header>
  );
}
