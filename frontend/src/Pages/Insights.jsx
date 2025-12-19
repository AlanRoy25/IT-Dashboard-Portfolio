import { useEffect, useState } from "react";
import StatusBoard from "../components/StatusBoard";

const API = "http://localhost:5000";

/* ---------- GLOW SYSTEM ---------- */

const glowCard = (color = "#38BDF8") => ({
  background: "#020617",
  border: "1px solid #1E293B",
  borderRadius: 16,
  padding: 18,
  transition: "all 0.25s ease",
  boxShadow: `0 0 18px ${color}22`,
});

const glowHover = color => ({
  boxShadow: `0 0 40px ${color}55`,
  transform: "translateY(-3px)",
});

/* ---------- INPUT ---------- */

const inputStyle = {
  background: "#020617",
  border: "1px solid #1E293B",
  borderRadius: 10,
  padding: "12px 14px",
  color: "#E5E7EB",
  outline: "none",
};

const statusMeta = [
  { label: "Applied", icon: "📄", color: "#38BDF8" },
  { label: "Interview", icon: "🎤", color: "#38BDF8" },
  { label: "Offer", icon: "⭐", color: "#38BDF8" },
  { label: "Rejected", icon: "✖", color: "#38BDF8" },
];

export default function Insights() {
  const [applications, setApplications] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const res = await fetch(`${API}/applications`);
      if (!res.ok) return;
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch {}
  }

  async function addApplication() {
    if (!company || !role) return;

    await fetch(`${API}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, role, status }),
    });

    setCompany("");
    setRole("");
    setStatus("Applied");
    fetchApplications();
  }

  async function deleteApplication(id) {
    if (!window.confirm("Mark this application as done and remove it?")) return;

    await fetch(`${API}/applications/${id}`, {
      method: "DELETE",
    });

    fetchApplications();
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Application Insights</h1>
      <p style={{ color: "#94A3B8", marginBottom: 24 }}>
        Tracking job applications.
      </p>
    <div
        style={{
          ...glowCard("#22D3EE"),
          marginBottom: 32,
          display: "grid",
          gridTemplateColumns: "2fr 2fr 1.5fr auto",
          gap: 16,
        }}
      >
        <input
          placeholder="Company"
          value={company}
          onChange={e => setCompany(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Role"
          value={role}
          onChange={e => setRole(e.target.value)}
          style={inputStyle}
        />

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <button
          onClick={addApplication}
          style={{
            background: "linear-gradient(135deg, #22D3EE, #38BDF8)",
            color: "#020617",
            border: "none",
            borderRadius: 10,
            padding: "12px 18px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          + Add
        </button>
      </div>

     
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: 18,
          marginBottom: 36,
        }}
      >
        {statusMeta.map(s => {
          const count = applications.filter(a => a.status === s.label).length;
          const total = applications.length || 1;
          const percent = Math.round((count / total) * 100);

          return (
            <div
              key={s.label}
              onMouseEnter={() => setHovered(s.label)}
              onMouseLeave={() => setHovered(null)}
              style={{
                ...glowCard(s.color),
                ...(hovered === s.label ? glowHover(s.color) : {}),
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700 }}>
                {s.icon} {count}
              </div>

              <div style={{ color: "#94A3B8", marginBottom: 10 }}>
                {s.label}
              </div>

              <div
                style={{
                  height: 6,
                  background: "#020617",
                  border: "1px solid #1E293B",
                  borderRadius: 6,
                }}
              >
                <div
                  style={{
                    width: `${percent}%`,
                    height: "100%",
                    background: s.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <StatusBoard
        applications={applications}
        onDelete={deleteApplication}
      />
    </div>
  );
}
