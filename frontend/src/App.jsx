import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Overview from "./Pages/Overview";
import TechNews from "./Pages/TechNews";
import Jobs from "./Pages/Job";
import Bookmarked from "./Pages/Bookmarked";
import Insights from "./Pages/Insights";

export default function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0B0F14" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>

        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/news" element={<TechNews />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/bookmarked" element={<Bookmarked />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
    </div>
  );
}
