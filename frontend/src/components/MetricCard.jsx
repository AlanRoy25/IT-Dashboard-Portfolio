import { useState } from "react";

const glowCard = (color = "#22D3EE") => ({
  background: "linear-gradient(180deg, #020617, #020617)",
  border: "1px solid #1E293B",
  borderRadius: 16,
  padding: 20,
  minHeight: 110,
  transition: "all 0.25s ease",
  boxShadow: `0 0 18px ${color}22`,
});

const glowHover = color => ({
  boxShadow: `0 0 35px ${color}55`,
  borderColor: color,
  transform: "translateY(-3px)",
});

/* ---------------- METRIC CARD ---------------- */

export default function Metric({ label, value, color }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...glowCard(color),
        ...(hover ? glowHover(color) : {}),
      }}
    >
      <h2
        style={{
          fontSize: 30,
          fontWeight: 700,
          marginBottom: 6,
          color: "#E5E7EB",
          textAlign: "center",
        }}
      >
        {value}
      </h2>

      <p
        style={{
          color: "#CBD5E1",
          fontSize: 14,
          letterSpacing: 0.3,
          textAlign: "center",
        }}
      >
        {label}
      </p>
    </div>
  );
}
