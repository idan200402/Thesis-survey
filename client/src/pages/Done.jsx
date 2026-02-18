import React from "react";

const PROLIFIC_URL =
  "https://app.prolific.com/submissions/complete?cc=C1G95G4A"; // replace with yours

export default function Done() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "80px auto",
        padding: 24,
        textAlign: "center"
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 40
        }}
      >
        <h2 style={{ marginBottom: 16 }}>
          Thank You for Participating
        </h2>

        <p style={{ fontSize: 18 }}>
          Your responses have been successfully recorded.
        </p>

        <div style={{ marginTop: 30 }}>
          <a
            href={PROLIFIC_URL}
            style={{
              padding: "12px 24px",
              backgroundColor: "#4f46e5",
              color: "white",
              textDecoration: "none",
              borderRadius: 8,
              fontWeight: 600
            }}
          >
            Return to Prolific
          </a>
        </div>
      </div>
    </div>
  );
}
