import { Link } from "react-router-dom";

export default function Sidebar() {
  const linkStyle = {
    display: "block",
    padding: "10px 12px",
    borderRadius: 6,
    color: "#E5E7EB",
    textDecoration: "none",
    marginBottom: 6,
  };

  return (
    <div
      style={{
        width: 240,
        background: "#111827",
        height: "100vh",
        borderRight: "1px solid #1F2937",
        padding: 20,
      }}
    >
      <h3 style={{ color: "#22D3EE" }}>IT Dashboard</h3>

      <nav style={{ marginTop: 30 }}>
        <Link to="/" style={linkStyle}>Overview</Link>
        <Link to="/news" style={linkStyle}>Tech News</Link>
        <Link to="/jobs" style={linkStyle}>Job Opportunities</Link>
        <Link to="/bookmarked" style={linkStyle}>Bookmarked</Link>
        <Link to="/insights" style={linkStyle}>Insights</Link>
      </nav>
    </div>
  );
}
