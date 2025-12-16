import { useEffect, useState } from "react";

export default function Bookmarked() {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState("");

  function loadJobs() {
    fetch("http://localhost:5000/saved-jobs")
      .then(res => res.json())
      .then(setJobs);
  }

  useEffect(loadJobs, []);

  async function deleteJob(id) {
    await fetch(`http://localhost:5000/saved-jobs/${id}`, {
      method: "DELETE",
    });
    loadJobs();
  }

  function startEdit(job) {
    setEditingId(job.id);
    setNotes(job.notes || "");
    setTags(job.tags || "");
  }

  async function saveEdit(id) {
    await fetch(`http://localhost:5000/saved-jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes, tags }),
    });

    setEditingId(null);
    loadJobs();
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Bookmarked Jobs</h1>

      {jobs.map(job => (
        <div
          key={job.id}
          style={{
            background: "#111827",
            border: "1px solid #1F2937",
            borderRadius: 10,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <h4>{job.title}</h4>
          <p style={{ color: "#9CA3AF" }}>
            {job.company} • {job.location}
          </p>

          {editingId === job.id ? (
            <>
              <textarea
                placeholder="Notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                style={{ width: "100%", marginTop: 10 }}
              />

              <input
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={e => setTags(e.target.value)}
                style={{ width: "100%", marginTop: 8 }}
              />

              <button onClick={() => saveEdit(job.id)}>
                Save
              </button>
            </>
          ) : (
            <>
              {job.notes && <p><strong>Notes:</strong> {job.notes}</p>}
              {job.tags && <p><strong>Tags:</strong> {job.tags}</p>}

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => startEdit(job)}>Edit</button>
                <button onClick={() => deleteJob(job.id)}>Remove</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
