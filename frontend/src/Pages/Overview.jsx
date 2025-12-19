import { useEffect, useState } from "react";
import Bell from "../components/BellIcon";
import ReminderPanel from "../components/ReminderPanel";
import TechNewsCard from "../components/TechNewsCard";
import ApplicationProgress from "../components/ApplicationProgress";

const API = "http://localhost:5000";



const glowCard = (color = "#38BDF8") => ({
  background: "#020617",
  border: "1px solid #1E293B",
  borderRadius: 16,
  padding: 20,
  transition: "all 0.25s ease",
});

const glowHover = color => ({
  boxShadow: `0 0 35px ${color}55`,
  borderColor: color,
  transform: "translateY(-3px)",
});



export default function Overview() {
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [showReminders, setShowReminders] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    loadData();
    fetchTechNews();
  }, []);

  async function safeFetch(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  }

  async function loadData() {
    setApplications(await safeFetch(`${API}/applications`));
    setSavedJobs(await safeFetch(`${API}/saved-jobs`));
  }

  async function fetchTechNews() {
    try {
      const res = await fetch(
        "https://dev.to/api/articles?tag=technology&top=1"
      );
      if (!res.ok) return;

      const data = await res.json();
      setNews([
        {
          title: data[0].title,
          url: data[0].url,
          image: data[0].cover_image || data[0].social_image,
          source: data[0].user?.name || "Dev.to",
        },
      ]);
    } catch {
      setNews([]);
    }
  }

  const reminders = applications
    .filter(a => a.status === "Applied")
    .slice(0, 3)
    .map(a => ({ text: `📧 Follow up – ${a.company}` }));

  const pendingSavedJobs = savedJobs.filter(
    job =>
      !applications.some(
        app =>
          app.company?.toLowerCase() === job.company?.toLowerCase()
      )
  );

  const countByStatus = status =>
    applications.filter(a => a.status === status).length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>Overview</h1>
        <div style={{ position: "relative" }}>
          <Bell
            count={reminders.length}
            onClick={() => setShowReminders(v => !v)}
          />
          {showReminders && <ReminderPanel reminders={reminders} />}
        </div>
      </div>

      
      <div style={styles.sectionGrid}>
        
        <div style={styles.metricsGrid}>
          <Metric label="Applied" value={countByStatus("Applied")} />
          <Metric label="Interviews" value={countByStatus("Interview")} />
          <Metric label="Offers" value={countByStatus("Offer")} />
          <Metric label="Rejected" value={countByStatus("Rejected")} />
        </div>

       
        <ApplicationProgress applications={applications} />

       
        <div style={styles.mainGrid}>
          <GlowCard title="⏳ Saved Jobs – Action Needed">
            {pendingSavedJobs.length === 0 && (
              <Empty text="All saved jobs are applied 🎉" />
            )}
            {pendingSavedJobs.slice(0, 3).map(job => (
              <Row
                key={job.id}
                title={job.title}
                subtitle={job.company}
              />
            ))}
            {pendingSavedJobs.length > 0 && (
              <a href="/bookmarked" style={styles.link}>
                Apply now →
              </a>
            )}
          </GlowCard>

          <GlowCard title="Recent Activity">
            {applications.slice(0, 4).map(app => (
              <Row
                key={app.id}
                title={`${app.company} – ${app.role}`}
                badge={app.status}
                date={app.created_at}
              />
            ))}
            {applications.length === 0 && (
              <Empty text="No applications yet" />
            )}
          </GlowCard>

          <TechNewsCard news={news} />

          <GlowCard title="Goals">
            <p style={{ marginBottom: 10 }}>🎯 Monthly applications</p>
            <Progress value={applications.length} max={20} />
          </GlowCard>
        </div>
      </div>
    </div>
  );
}



function Metric({ label, value }) {
  return (
    <div style={styles.metric}>
      <div style={styles.metricValue}>{value}</div>
      <div style={styles.metricLabel}>{label}</div>
    </div>
  );
}

function GlowCard({ title, children }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        ...glowCard(),
        ...(hover ? glowHover("#38BDF8") : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h3 style={styles.cardTitle}>{title}</h3>
      <div style={styles.cardBody}>{children}</div>
    </div>
  );
}

function Row({ title, subtitle, badge, date }) {
  return (
    <div style={styles.row}>
      <div>
        <strong>{title}</strong>
        {subtitle && <p style={styles.muted}>{subtitle}</p>}
        {date && (
          <p style={styles.date}>
            📅 {new Date(date).toLocaleDateString()}
          </p>
        )}
      </div>
      {badge && <span style={styles.badge}>{badge}</span>}
    </div>
  );
}

function Progress({ value, max }) {
  const percent = Math.min(100, (value / max) * 100);
  return (
    <div style={styles.progressBg}>
      <div style={{ ...styles.progressFill, width: `${percent}%` }} />
    </div>
  );
}

function Empty({ text }) {
  return <p style={styles.muted}>{text}</p>;
}



const styles = {
  page: {
    padding: 24,
    background: "#020617",
    color: "#E5E7EB",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  sectionGrid: {
    display: "grid",
    gap: 24,
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 20,
  },
  metric: {
    background: "#020617",
    border: "1px solid #1E293B",
    borderRadius: 16,
    padding: 20,
    textAlign: "center",
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 700,
  },
  metricLabel: {
    color: "#94A3B8",
    marginTop: 6,
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
  },
  cardTitle: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: 600,
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  muted: {
    color: "#94A3B8",
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  badge: {
    background: "#1E293B",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
  },
  progressBg: {
    height: 8,
    background: "#1E293B",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#38BDF8",
  },
  link: {
    marginTop: 8,
    color: "#38BDF8",
    fontSize: 13,
    textDecoration: "none",
  },
};
