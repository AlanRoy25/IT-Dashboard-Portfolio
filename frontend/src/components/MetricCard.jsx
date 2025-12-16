export default function MetricCard({ title, value, accent }) {
  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #1F2937",
        borderRadius: 10,
        padding: 20,
        minWidth: 180,
        position: "relative",
      }}
    >
      <p style={{ color: "#9CA3AF", margin: 0 }}>{title}</p>
      <h2 style={{ color: accent || "#22D3EE", marginTop: 10 }}>
        {value}
      </h2>

      {/* accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          width: "100%",
          background: accent || "#22D3EE",
          opacity: 0.6,
        }}
      />
    </div>
  );
}
