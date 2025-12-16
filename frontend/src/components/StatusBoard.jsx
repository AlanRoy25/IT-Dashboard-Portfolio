export default function StatusBoard({ applications = [] }) {
  const statuses = ["Applied", "Interview", "Offer", "Rejected"];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20,
      }}
    >
      {statuses.map(status => {
        const filtered = applications.filter(a => a.status === status);

        return (
          <div
            key={status}
            style={{
              background: "#0F172A",
              border: "1px solid #1F2937",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <h4 style={{ marginBottom: 12 }}>{status}</h4>

            {filtered.length === 0 && (
              <p style={{ color: "#6B7280", fontSize: 14 }}>
                No applications
              </p>
            )}

            {filtered.map(app => (
              <div
                key={app.id}
                style={{
                  background: "#111827",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 10,
                }}
              >
                <strong>{app.company}</strong>
                <div style={{ color: "#9CA3AF", fontSize: 13 }}>
                  {app.role}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
