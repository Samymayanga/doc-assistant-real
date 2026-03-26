import React, { useEffect, useState } from "react";
import "./../loadingState/LoadingState.css";

const MESSAGES = [
  "Extracting text from document...",
  "Sending to Claude AI...",
  "Identifying key sections...",
  "Generating summary...",
  "Almost done...",
];

export default function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="loading-wrapper">
      <div className="loading-orb">
        <div className="orb-ring r1" />
        <div className="orb-ring r2" />
        <div className="orb-ring r3" />
        <span className="orb-core">◈</span>
      </div>
      <p className="loading-msg">{MESSAGES[msgIndex]}</p>
      <div className="loading-bar">
        <div
          className="loading-fill"
          style={{ animationDuration: `${MESSAGES.length * 1.8}s` }}
        />
      </div>
    </div>
  );
}
