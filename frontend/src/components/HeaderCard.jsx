export default function HeaderCard() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #111827, #0B0F14)",
        border: "1px solid #1F2937",
        borderRadius: 12,
        padding: 24,
        marginBottom: 30,
        position: "relative",
      }}
    >
      <h1 style={{ margin: 0, color: "#E5E7EB" }}>
        IT Opportunity Intelligence
      </h1>

      <p style={{ color: "#9CA3AF", marginTop: 8, maxWidth: 600 }}>
        A real-time dashboard for tracking IT news, job opportunities, and
        personalized bookmarks — designed with privacy-first principles.
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <button style={primaryBtn}>View Live Jobs</button>
        <button style={secondaryBtn}>View Bookmarks</button>
      </div>

      {/* subtle cyberpunk accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          fontSize: 48,
          color: "#22D3EE",
          opacity: 0.08,
          padding: 16,
        }}
      >
        DATA
      </div>
    </div>
  );
}

const primaryBtn = {
  background: "#22D3EE",
  color: "#0B0F14",
  border: "none",
  padding: "10px 16px",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: 600,
};

const secondaryBtn = {
  background: "transparent",
  color: "#22D3EE",
  border: "1px solid #22D3EE",
  padding: "10px 16px",
  borderRadius: 6,
  cursor: "pointer",
};
