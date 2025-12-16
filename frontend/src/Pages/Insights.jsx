import { useEffect, useState } from "react";
import StatusBoard from "../components/StatusBoard";

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
  { label: "Interview", icon: "🎤", color: "#FACC15" },
  { label: "Offer", icon: "⭐", color: "#22C55E" },
  { label: "Rejected", icon: "✖", color: "#EF4444" },
];

export default function Insights() {
  const [applications, setApplications] = useState([]);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  useEffect(() => {
    fetchApplications();
  }, []);

  function fetchApplications() {
    fetch("http://localhost:5000/applications")
      .then(res => res.json())
      .then(data => setApplications(Array.isArray(data) ? data : []));
  }

  async function addApplication() {
    if (!company || !role) return;

    await fetch("http://localhost:5000/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, role, status }),
    });

    setCompany("");
    setRole("");
    setStatus("Applied");
    fetchApplications();
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ letterSpacing: 1 }}>Application Insights</h1>
      <p style={{ color: "#94A3B8", marginBottom: 24 }}>
        Tracking job applications.
      </p>

      {/* ADD APPLICATION (CRUD) */}
      <div
        style={{
          background: "linear-gradient(145deg, #020617, #020617)",
          border: "1px solid #1E293B",
          borderRadius: 16,
          padding: 20,
          marginBottom: 32,
          display: "grid",
          gridTemplateColumns: "2fr 2fr 1.5fr auto",
          gap: 16,
          alignItems: "center",
          boxShadow: "0 0 30px rgba(34,211,238,0.05)",
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
            boxShadow: "0 0 20px rgba(34,211,238,0.35)",
          }}
        >
          + Add
        </button>
      </div>

      {/* CYBERPUNK STATUS SUMMARY */}
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
              style={{
                background: "#020617",
                border: "1px solid #1E293B",
                borderRadius: 16,
                padding: 18,
                boxShadow: `0 0 25px ${s.color}20`,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700 }}>
                {s.icon} {count}
              </div>

              <div
                style={{
                  color: "#94A3B8",
                  fontSize: 14,
                  marginBottom: 10,
                }}
              >
                {s.label}
              </div>

              <div
                style={{
                  height: 6,
                  background: "#020617",
                  borderRadius: 6,
                  overflow: "hidden",
                  border: "1px solid #1E293B",
                }}
              >
                <div
                  style={{
                    width: `${percent}%`,
                    height: "100%",
                    background: s.color,
                    boxShadow: `0 0 10px ${s.color}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* STATUS BOARD */}
      <StatusBoard applications={applications} />
    </div>
  );
}
