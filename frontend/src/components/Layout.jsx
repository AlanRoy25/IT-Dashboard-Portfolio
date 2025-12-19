import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";

export default function Layout({ children }) {
  const [showReminders, setShowReminders] = useState(false);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        minHeight: "100vh",
        background: "#020617",
        textAlign: "center"
      }}
    >
      <Sidebar />

      <div>
        <TopBar
          reminders={window.__REMINDERS__ || []}
          show={showReminders}
          toggle={() => setShowReminders(v => !v)}
        />

        <main style={{ padding: 24 }}>{children}</main>
      </div>
    </div>
  );
}
