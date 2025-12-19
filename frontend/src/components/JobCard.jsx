import { useState } from "react";

const glowCard = (color = "#38BDF8") => ({
  background: "#020617",
  border: "1px solid #1E293B",
  borderRadius: 16,
  padding: 16,
  transition: "all 0.25s ease",
  boxShadow: `0 0 18px ${color}22`,
});

const glowHover = color => ({
  boxShadow: `0 0 40px ${color}55`,
  borderColor: color,
  transform: "translateY(-3px)",
});

export default function JobCard({ job, isBookmarked, onToggleBookmark }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...glowCard("#38BDF8"),
        ...(hover ? glowHover("#38BDF8") : {}),
      }}
    >
      <h3 style={{ marginBottom: 6 }}>{job.title}</h3>

      <p style={{ color: "#94A3B8", marginBottom: 10 }}>
        {job.company_name} · {job.candidate_required_location}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <a
          href={job.url}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#22D3EE", fontSize: 14 }}
        >
          View →
        </a>

        <button
          onClick={() => onToggleBookmark(job)}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #22D3EE",
            background: "transparent",
            color: "#22D3EE",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>
    </div>
  );
}
