import { Link, useLocation } from "react-router-dom";
import ProfileCard from "./profileCard";
import {
  LayoutDashboard,
  Newspaper,
  Briefcase,
  Bookmark,
  BarChart3,
} from "lucide-react";

export default function Sidebar() {
  const { pathname } = useLocation();

  const item = (to, label, Icon) => {
    const active = pathname === to;

    return (
      <Link
        key={to}
        to={to}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 14px",
          borderRadius: 12,
          marginBottom: 8,
          textDecoration: "none",
          color: active ? "#22D3EE" : "#CBD5E1",
          background: active ? "#0F172A" : "transparent",
          boxShadow: active
            ? "0 0 18px rgba(34,211,238,0.35)"
            : "none",
          transition: "all .2s",
        }}
      >
        <Icon size={18} />
        {label}
      </Link>
    );
  };

  return (
    <aside
      style={{
        width: 240,
        background: "#020617",
        borderRight: "1px solid #1E293B",
        padding: 20,
        height: "100vh",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h3 style={{ color: "#22D3EE", marginBottom: 30 }}>
         CAREER DASH
        </h3>

        {item("/", "Overview", LayoutDashboard)}
        {item("/news", "Tech News", Newspaper)}
        {item("/jobs", "Job Opportunities", Briefcase)}
        {item("/bookmarked", "Bookmarked", Bookmark)}
        {item("/insights", "Insights", BarChart3)}
      </div>

     
      <ProfileCard />
    </aside>
  );
}
