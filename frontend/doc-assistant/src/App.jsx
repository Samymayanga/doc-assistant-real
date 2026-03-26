import React from "react";
import { useDocumentAnalysis } from "./hooks/useDocumentAnalysis";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorState from "./components/ErrorState";
import UploadZone from "./components/uploadZone/UploadZone";
import LoadingState from "./components/loadingState/LoadingState";
import ResultsPanel from "./components/resultsPanel/ResultsPanel";
import "./App.css";

export default function App() {
  const { state, result, error, analyze, reset } = useDocumentAnalysis();

  return (
    <div className="app">
      <Header />

      <main className="app-main">
        {state === "idle" && <UploadZone onUpload={analyze} />}
        {state === "loading" && <LoadingState />}
        {state === "results" && (
          <ResultsPanel result={result} onReset={reset} />
        )}
        {state === "error" && <ErrorState message={error} onReset={reset} />}
      </main>

      <Footer />
    </div>
  );
}
