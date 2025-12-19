import { AlignCenter } from "lucide-react";
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
  transform: "translateY(-3px)",
});



const statusColors = {
  Applied: "#38BDF8",
  Interview: "#38BDF8",
  Offer: "#38BDF8",
  Rejected: "#38BDF8",
};

export default function StatusBoard({ applications = [], onDelete }) {
  const [hoveredCol, setHoveredCol] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

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
        const color = statusColors[status];

        return (
          <div
            key={status}
            onMouseEnter={() => setHoveredCol(status)}
            onMouseLeave={() => setHoveredCol(null)}
            style={{
              ...glowCard(color),
              ...(hoveredCol === status ? glowHover(color) : {}),
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
                onMouseEnter={() => setHoveredCard(app.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: "#020617",
                  border: "1px solid #1E293B",
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.25s ease",
                  boxShadow:
                    hoveredCard === app.id
                      ? `0 0 25px ${color}55`
                      : "none",
                }}
              >
                <div>
                  <strong>{app.company}</strong>
                  <div style={{ color: "#9CA3AF", fontSize: 13 }}>
                    {app.role}
                  </div>
                </div>

                {onDelete && (
                  <button
                    onClick={() => onDelete(app.id)}
                    title="Mark as done"
                    style={{
                      background: "transparent",
                      border: `1px solid ${color}`,
                      color,
                      borderRadius: 6,
                      padding: "4px 8px",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Done
                  </button>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
