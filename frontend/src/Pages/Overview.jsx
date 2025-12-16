import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Overview() {
  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [latestNews, setLatestNews] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/saved-jobs")
      .then(res => res.json())
      .then(data => setSavedJobs(Array.isArray(data) ? data : []));

    fetch("http://localhost:5000/applications")
      .then(res => res.json())
      .then(data => setApplications(Array.isArray(data) ? data : []));

    fetch("https://hn.algolia.com/api/v1/search?query=technology")
      .then(res => res.json())
      .then(data => setLatestNews(data.hits?.[0]));
  }, []);

  const interviewCount = applications.filter(a => a.status === "Interview").length;
  const lastSaved = savedJobs[savedJobs.length - 1];
  const lastApplied = applications[applications.length - 1];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 28,
        backgroundImage: "url('/assets/overviewbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        boxShadow: "inset 0 0 120px rgba(0,0,0,0.85)",
      }}
    >
      {/* DARK + BLUR OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.96), rgba(2,6,23,0.99))",
          backdropFilter: "blur(4px)",
          zIndex: 0,
        }}
      />

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1>Overview</h1>
        <p style={{ color: "#94A3B8", marginBottom: 22 }}>
          Quick snapshot of your job activity and updates.
        </p>

        {/* SYSTEM STATUS */}
        <div
          style={{
            fontSize: 12,
            color: "#22D3EE",
            letterSpacing: 1,
            marginBottom: 28,
          }}
        >
        </div>

        {/* ACTION CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
            marginBottom: 36,
          }}
        >
          <ActionCard title="Browse Jobs" icon="💼" onClick={() => navigate("/jobs")} />
          <ActionCard title="Saved Jobs" icon="⭐" onClick={() => navigate("/bookmarked")} />
          <ActionCard title="Applications" icon="📄" onClick={() => navigate("/insights")} />
          <ActionCard title="Tech News" icon="📰" onClick={() => navigate("/news")} />
        </div>

        {/* SUMMARY */}
        <GlassCard>
          <h3 style={{ marginBottom: 12 }}>Summary</h3>
          <p style={{ color: "#94A3B8", lineHeight: 1.7 }}>
            You have <strong>{savedJobs.length}</strong> saved jobs and{" "}
            <strong>{applications.length}</strong> job applications.
            {interviewCount > 0 && (
              <> <strong>{interviewCount}</strong> interview in progress.</>
            )}
          </p>
        </GlassCard>

        {/* RECENT ACTIVITY */}
        <GlassCard>
          <h3 style={{ marginBottom: 16 }}>Recent Activity</h3>

          <ActivityItem
            label="Last Saved Job"
            value={
              lastSaved
                ? `${lastSaved.company} — ${lastSaved.title}`
                : "No saved jobs yet"
            }
          />

          <ActivityItem
            label="Last Application"
            value={
              lastApplied
                ? `${lastApplied.company} — ${lastApplied.role}`
                : "No applications yet"
            }
          />

          <ActivityItem
            label="Latest Tech News"
            value={latestNews ? latestNews.title : "No news loaded"}
          />
        </GlassCard>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function ActionCard({ title, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        height: 130,
        background: "rgba(2,6,23,0.82)",
        border: "1px solid #1E293B",
        borderRadius: 18,
        padding: 20,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        boxShadow: "0 0 40px rgba(34,211,238,0.08)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontWeight: 700 }}>{title}</div>
    </div>
  );
}

function GlassCard({ children }) {
  return (
    <div
      style={{
        background: "rgba(2,6,23,0.82)",
        backdropFilter: "blur(10px)",
        border: "1px solid #1E293B",
        borderRadius: 18,
        padding: 24,
        marginBottom: 28,
        boxShadow: "0 0 40px rgba(15,23,42,0.6)",
      }}
    >
      {children}
    </div>
  );
}

function ActivityItem({ label, value }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 13, color: "#64748B" }}>{label}</div>
      <div style={{ color: "#E5E7EB" }}>{value}</div>
    </div>
  );
}
