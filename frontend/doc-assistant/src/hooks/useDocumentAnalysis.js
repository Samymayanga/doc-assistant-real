import { useState } from "react";


const API_URL = import.meta.env.VITE_API_URL;

export function useDocumentAnalysis() {
  const [state, setState] = useState("idle"); // idle | loading | results | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyze = async (file) => {
    setState("loading");
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("document", file);

    try {
      
      const res = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data);
      setState("results");
    } catch (err) {
      setError(err.message);
      setState("error");
    }
  };

  const reset = () => {
    setState("idle");
    setResult(null);
    setError("");
  };

  return { state, result, error, analyze, reset };
}
