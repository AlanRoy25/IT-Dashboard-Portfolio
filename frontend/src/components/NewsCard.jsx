export default function NewsCard({ title, url, score }) {
  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #1F2937",
        borderRadius: 10,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h4 style={{ margin: 0, color: "#E5E7EB" }}>{title}</h4>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <span style={{ color: "#9CA3AF", fontSize: 14 }}>
          {score}
        </span>

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#22D3EE", fontSize: 14 }}
        >
          Read →
        </a>
      </div>
    </div>
  );
}
