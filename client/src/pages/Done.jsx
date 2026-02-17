import React from "react";

export default function Done() {
  return (
    <div style={{ 
      maxWidth: 900, 
      margin: "80px auto", 
      padding: 24, 
      textAlign: "center" 
    }}>
      <div style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 40
      }}>
        <h2 style={{ marginBottom: 16 }}>Thank You for Participating ✅</h2>
        <p style={{ fontSize: 18 }}>
          Your responses have been successfully recorded.
        </p>
      </div>
    </div>
  );
}
