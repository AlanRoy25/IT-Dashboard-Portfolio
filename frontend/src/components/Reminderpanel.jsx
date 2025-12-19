// src/components/ReminderPanel.jsx
export default function ReminderPanel({ reminders }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        right: 0,
        width: 320,
        background: "#020617",
        border: "1px solid #1E293B",
        borderRadius: 12,
        padding: 12,
        zIndex: 50,
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      <h4 style={{ marginBottom: 10 }}>Reminders</h4>

      {reminders.length === 0 && (
        <p style={{ color: "#94A3B8" }}>
          No pending actions 🎉
        </p>
      )}

      {reminders.map((r, i) => (
        <div
          key={i}
          style={{
            padding: "8px 6px",
            borderBottom: "1px solid #1E293B",
            fontSize: 14,
          }}
        >
          {r.text}
        </div>
      ))}
    </div>
  );
}
