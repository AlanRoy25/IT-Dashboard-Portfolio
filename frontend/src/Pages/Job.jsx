import { useEffect, useMemo, useState } from "react";
import JobCard from "../components/JobCard";

const API = "http://localhost:5000";

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
  borderColor: color,
  transform: "translateY(-3px)",
});

const styles = {
  search: {
    width: "100%",
    padding: 12,
    marginTop: 16,
    borderRadius: 10,
    border: "1px solid #1E293B",
    background: "#020617",
    color: "#E5E7EB",
    outline: "none",
  },
  select: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #1E293B",
    background: "#020617",
    color: "#E5E7EB",
  },
};

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [bookmarkedUrls, setBookmarkedUrls] = useState([]);
  const [hover, setHover] = useState(false);


  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");


  const [preferences, setPreferences] = useState(null);
  const [usePreferences, setUsePreferences] = useState(false);

  useEffect(() => {
    fetchJobs();
    refreshBookmarks();
    fetchPreferences();
  }, []);

  function fetchJobs() {
    fetch("https://remotive.com/api/remote-jobs?category=software-dev")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.jobs)) {
          setJobs(data.jobs.slice(0, 50));
        }
      });
  }

  function refreshBookmarks() {
    fetch(`${API}/saved-jobs`)
      .then(res => res.json())
      .then(data => setBookmarkedUrls(data.map(j => j.url)));
  }

  function fetchPreferences() {
    fetch(`${API}/preferences`)
      .then(res => res.json())
      .then(data => setPreferences(data));
  }

  async function toggleBookmark(job) {
    if (bookmarkedUrls.includes(job.url)) {
      await fetch(`${API}/saved-jobs/by-url`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: job.url }),
      });
    } else {
      await fetch(`${API}/saved-jobs`, {
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

  function resetFilters() {
    setSearch("");
    setLocationFilter("All");
    setTypeFilter("All");
    setLevelFilter("All");
    setUsePreferences(false);
  }

 
  const locations = useMemo(
    () => ["All", ...new Set(jobs.map(j => j.candidate_required_location).filter(Boolean))],
    [jobs]
  );

  const jobTypes = useMemo(
    () => ["All", ...new Set(jobs.map(j => j.job_type).filter(Boolean))],
    [jobs]
  );

  
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const text = `${job.title} ${job.company_name}`.toLowerCase();
      const searchMatch = text.includes(search.toLowerCase());

      const locationMatch =
        locationFilter === "All" ||
        job.candidate_required_location === locationFilter;

      const typeMatch =
        typeFilter === "All" ||
        job.job_type === typeFilter;

      const levelMatch =
        levelFilter === "All" ||
        job.title.toLowerCase().includes(levelFilter.toLowerCase());

   
      let preferenceMatch = true;
      if (usePreferences && preferences) {
        if (preferences.roles) {
          preferenceMatch = job.title
            .toLowerCase()
            .includes(preferences.roles.toLowerCase());
        }
        if (preferences.location) {
          preferenceMatch =
            preferenceMatch &&
            job.candidate_required_location
              ?.toLowerCase()
              .includes(preferences.location.toLowerCase());
        }
        if (preferences.skills) {
          preferenceMatch =
            preferenceMatch &&
            preferences.skills
              .toLowerCase()
              .split(",")
              .some(skill =>
                job.title.toLowerCase().includes(skill.trim())
              );
        }
      }

      return (
        searchMatch &&
        locationMatch &&
        typeMatch &&
        levelMatch &&
        preferenceMatch
      );
    });
  }, [
    jobs,
    search,
    locationFilter,
    typeFilter,
    levelFilter,
    usePreferences,
    preferences,
  ]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Live IT Jobs</h1>

    
      <input
        placeholder="Search jobs, companies, roles..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={styles.search}
      />

     
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 16,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <select style={styles.select} value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
          {locations.map(loc => (
            <option key={loc}>{loc}</option>
          ))}
        </select>

        <select style={styles.select} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          {jobTypes.map(type => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <select style={styles.select} value={levelFilter} onChange={e => setLevelFilter(e.target.value)}>
          <option>All</option>
          <option>Junior</option>
          <option>Mid</option>
          <option>Senior</option>
        </select>

        <label style={{ color: "#94A3B8", display: "flex", gap: 6 }}>
          <input
            type="checkbox"
            checked={usePreferences}
            onChange={e => setUsePreferences(e.target.checked)}
          />
          Match my preferences
        </label>

        <button
          onClick={resetFilters}
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            border: "1px solid #1E293B",
            background: "#020617",
            color: "#E5E7EB",
            cursor: "pointer",
          }}
        >
          Reset filters
        </button>
      </div>

   
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          marginTop: 24,
        }}
      >
        {filteredJobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            isBookmarked={bookmarkedUrls.includes(job.url)}
            onToggleBookmark={toggleBookmark}
          />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <p style={{ color: "#94A3B8", marginTop: 24 }}>
          No jobs match your filters.
        </p>
      )}
    </div>
  );
}
