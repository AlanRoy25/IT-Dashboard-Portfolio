import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [bookmarkedUrls, setBookmarkedUrls] = useState([]);

  useEffect(() => {
    fetch("https://remotive.com/api/remote-jobs?category=software-dev")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.jobs)) {
          setJobs(data.jobs.slice(0, 12));
        }
      });

    refreshBookmarks();
  }, []);

  function refreshBookmarks() {
    fetch("http://localhost:5000/saved-jobs")
      .then(res => res.json())
      .then(data => {
        setBookmarkedUrls(data.map(j => j.url));
      });
  }

  async function toggleBookmark(job) {
    if (bookmarkedUrls.includes(job.url)) {
      // UNBOOKMARK
      await fetch("http://localhost:5000/saved-jobs/by-url", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: job.url }),
      });
    } else {
      // BOOKMARK
      await fetch("http://localhost:5000/saved-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: job.title,
          company: job.company_name,
          location: job.candidate_required_location,
          url: job.url,
          source: "Remotive",
        }),
      });
    }

    refreshBookmarks();
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Live IT Jobs</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            isBookmarked={bookmarkedUrls.includes(job.url)}
            onToggleBookmark={toggleBookmark}
          />
        ))}
      </div>
    </div>
  );
}
