export default function ApplicationProgress({ applications }) {
  const total = applications.length || 1;

  const counts = {
    Applied: applications.filter(a => a.status === "Applied").length,
    Interview: applications.filter(a => a.status === "Interview").length,
    Offer: applications.filter(a => a.status === "Offer").length,
    Rejected: applications.filter(a => a.status === "Rejected").length,
  };

  const colors = {
    Applied: "#38BDF8",
    Interview: "#FACC15",
    Offer: "#22C55E",
    Rejected: "#EF4444",
  };

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>📊 Application Pipeline</h3>

      <div style={styles.bar}>
        {Object.entries(counts).map(([key, value]) => (
          <div
            key={key}
            title={`${key}: ${value}`}
            style={{
              ...styles.segment,
              background: colors[key],
              width: `${(value / total) * 100}%`,
            }}
          />
        ))}
      </div>

      <div style={styles.legend}>
        {Object.entries(counts).map(([key, value]) => (
          <div key={key} style={styles.legendItem}>
            <span
              style={{
                ...styles.dot,
                background: colors[key],
              }}
            />
            {key} ({value})
          </div>
        ))}
      </div>
    </div>
  );
}
const styles = {
  wrapper: {
    background: "#020617",
    border: "1px solid #1E293B",
    borderRadius: 16,
    padding: 20,
  },
  title: {
    marginBottom: 14,
    fontSize: 16,
  },
  bar: {
    display: "flex",
    height: 10,
    borderRadius: 999,
    overflow: "hidden",
    background: "#1E293B",
    marginBottom: 14,
  },
  segment: {
    height: "100%",
    transition: "width 0.4s ease",
  },
  legend: {
    display: "flex",
    flexWrap: "wrap",
    gap: 14,
    fontSize: 13,
    color: "#CBD5E1",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
  },
};
