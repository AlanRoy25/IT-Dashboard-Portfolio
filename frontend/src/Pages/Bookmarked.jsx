import { useEffect, useState } from "react";

const API = "http://localhost:5000";



const glowCard = (color = "#38BDF8") => ({
  background: "#020617",
  border: "1px solid #1E293B",
  borderRadius: 16,
  padding: 20,
  marginBottom: 16,
  transition: "all 0.25s ease",
  boxShadow: `0 0 18px ${color}22`,
});

const glowHover = color => ({
  boxShadow: `0 0 40px ${color}55`,
  borderColor: "#1E293B", // keep dark border
  transform: "translateY(-3px)",
});


export default function Bookmarked() {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  function loadJobs() {
    fetch(`${API}/saved-jobs`)
      .then(res => res.json())
      .then(data => setJobs(Array.isArray(data) ? data : []));
  }

  async function removeJob(id) {
    if (!window.confirm("Remove this bookmarked job?")) return;
    await fetch(`${API}/saved-jobs/${id}`, { method: "DELETE" });
    loadJobs();
  }

  function startEdit(job) {
    setEditingId(job.id);
    setNotes(job.notes || "");
    setTags(job.tags || "");
  }

  async function saveEdit(id) {
    await fetch(`${API}/saved-jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes, tags }),
    });

    setEditingId(null);
    loadJobs();
  }

  return (
    <div style={styles.page}>
      <h1>Bookmarked Jobs</h1>

      {jobs.length === 0 && (
        <p style={styles.muted}>No bookmarked jobs yet</p>
      )}

      {jobs.map(job => (
        <div
          key={job.id}
          onMouseEnter={() => setHoveredId(job.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            ...glowCard(),
            ...(hoveredId === job.id ? glowHover("#38BDF8") : {}),
          }}
        >
       
          <div style={styles.cardHeader}>
            <div>
              <h3 style={styles.title}>{job.title}</h3>
              <p style={styles.subtitle}>
                {job.company} • {job.location}
              </p>
            </div>

            <a
              href={job.url}
              target="_blank"
              rel="noreferrer"
              style={styles.applyBtn}
            >
              Apply
            </a>
          </div>

          {/* BODY */}
          {editingId === job.id ? (
            <>
              <textarea
                placeholder="Notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                style={styles.textarea}
              />

              <input
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={e => setTags(e.target.value)}
                style={styles.input}
              />

              <button
                onClick={() => saveEdit(job.id)}
                style={styles.saveBtn}
              >
                Save
              </button>
            </>
          ) : (
            <>
              {job.tags && (
                <div style={styles.tags}>
                  {job.tags.split(",").map(t => (
                    <span key={t} style={styles.tag}>
                      {t.trim()}
                    </span>
                  ))}
                </div>
              )}

              {job.notes && (
                <p style={styles.notes}>📝 {job.notes}</p>
              )}

              <div style={styles.actions}>
                <button
                  onClick={() => startEdit(job)}
                  style={styles.linkBtn}
                >
                  ✏ Edit
                </button>
                <button
                  onClick={() => removeJob(job.id)}
                  style={styles.dangerBtn}
                >
                  🗑 Remove
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}



const styles = {
  page: {
    padding: 24,
    background: "#020617",
    minHeight: "100vh",
    color: "#E5E7EB",
  },
  muted: {
    color: "#94A3B8",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    margin: 0,
    fontSize: 18,
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
  },
  applyBtn: {
    background: "#22D3EE",
    color: "#020617",
    padding: "6px 12px",
    borderRadius: 8,
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 600,
  },
  textarea: {
    width: "100%",
    minHeight: 60,
    marginBottom: 8,
    background: "#020617",
    border: "1px solid #1E293B",
    borderRadius: 8,
    color: "#E5E7EB",
    padding: 8,
  },
  input: {
    width: "100%",
    marginBottom: 8,
    background: "#020617",
    border: "1px solid #1E293B",
    borderRadius: 8,
    color: "#E5E7EB",
    padding: 8,
  },
  saveBtn: {
    background: "#22C55E",
    border: "none",
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer",
    color: "#020617",
    fontWeight: 600,
  },
  tags: {
    display: "flex",
    gap: 6,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  tag: {
    background: "#1E293B",
    padding: "4px 8px",
    borderRadius: 999,
    fontSize: 12,
  },
  notes: {
    fontSize: 14,
    marginBottom: 10,
  },
  actions: {
    display: "flex",
    gap: 12,
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#38BDF8",
    cursor: "pointer",
    fontSize: 13,
  },
  dangerBtn: {
    background: "none",
    border: "none",
    color: "#EF4444",
    cursor: "pointer",
    fontSize: 13,
  },
};
