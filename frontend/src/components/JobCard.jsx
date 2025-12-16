export default function JobCard({ job, isBookmarked, onToggleBookmark }) {
  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #1F2937",
        borderRadius: 10,
        padding: 16,
      }}
    >
      <h4>{job.title}</h4>

      <p style={{ color: "#9CA3AF" }}>
        {job.company_name} • {job.candidate_required_location}
      </p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <a href={job.url} target="_blank" rel="noreferrer">
          View →
        </a>

        <button
          onClick={() => onToggleBookmark(job)}
          style={{
            background: isBookmarked ? "#EF4444" : "transparent",
            color: isBookmarked ? "#0B0F14" : "#22D3EE",
            border: "1px solid",
            borderColor: isBookmarked ? "#EF4444" : "#22D3EE",
            borderRadius: 6,
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          {isBookmarked ? "Unbookmark" : "Bookmark"}
        </button>
      </div>
    </div>
  );
}
