import React, { useMemo, useState } from "react";

export default function Question({ index, total, trial, answer, setChoice, onNext , onBackToInstructions}){
  const [touched, setTouched] = useState(false);
  const isValid = useMemo(() => !!answer.chosenOptionId, [answer.chosenOptionId]);

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: 16 }}>
      <div style={{ marginBottom: 8 }}>
        <strong>{index + 1} of {total}</strong>
      </div>

      <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, marginBottom: 16 }}>
        <div><strong>User</strong></div>
        <div style={{ marginTop: 8 }}>{trial.userQuestion}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {trial.options.map((opt) => (
          <div key={opt.optionId} style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
            <h3 style={{ marginTop: 0 }}>Response</h3>
            <div style={{ whiteSpace: "pre-wrap" }}>{opt.text}</div>
            <div style={{ marginTop: 12 }}>
              <button onClick={() => setChoice(opt.optionId)}>
                I prefer this response {answer.chosenOptionId === opt.optionId ? "✓" : ""}
              </button>
            </div>
          </div>
        ))}
      </div>

      {touched && !isValid && (
        <p style={{ color: "crimson", marginTop: 12 }}>Pick one response to continue.</p>
      )}

      <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
        <button
          type="button"
          onClick={onBackToInstructions}
        >
          Back to Instructions
        </button>

        <button
          type="button"
          onClick={() => {
            setTouched(true);
            if (isValid) onNext();
          }}
        >
          Next
        </button>
      </div>

    </div>
  );
}
