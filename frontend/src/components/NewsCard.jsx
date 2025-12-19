import { useState } from "react";

export default function NewsCard({ title, url, score }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "linear-gradient(180deg, #020617, #020617)",
        border: "1px solid #1F2937",
        borderRadius: 16,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 120,
        transition: "all 0.25s ease",
        boxShadow: hover
          ? "0 0 40px rgba(56,189,248,0.55)"
          : "0 0 18px rgba(56,189,248,0.20)",
        borderColor: hover ? "#38BDF8" : "#1F2937",
        transform: hover ? "translateY(-3px)" : "none",
      }}
    >
      {/* TITLE */}
      <h4
        style={{
          margin: 0,
          color: "#E5E7EB",
          fontSize: 15,
          fontWeight: 600,
          lineHeight: 1.4,
          
        }}
      >
        {title}
      </h4>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 14,
          textAlign: "center",
        }}
      >
        <span style={{ color: "#9CA3AF", fontSize: 13 }}>
          {score}
        </span>

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#22D3EE",
            fontSize: 13,
            textDecoration: "none",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Read →
        </a>
      </div>
    </div>
  );
}
