// src/components/Bell.jsx
export default function Bell({ count, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        cursor: "pointer",
        fontSize: 22,
      }}
    >
      🔔
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: -6,
            right: -8,
            background: "#EF4444",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}
