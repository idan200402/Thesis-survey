import React from "react";
import { INSTRUCTIONS_TEXT } from "../surveySchema.js";

export default function Instructions({ onNext }) {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h2>Instructions</h2>
      <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, whiteSpace: "pre-wrap" }}>
        {INSTRUCTIONS_TEXT}
      </div>
      <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
}
