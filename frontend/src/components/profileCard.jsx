import profilepic from "../assets/profile.JPG";
export default function ProfileCard() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 12,
        borderRadius: 12,
        background: "#0F172A",
        border: "1px solid #1E293B",
      }}
    >
      <img
        src={profilepic}
        alt="profile"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
        }}
      />

      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>
          Alan Roy
        </div>
        <div style={{ fontSize: 12, color: "#22C55E" }}>
          Online
        </div>
      </div>
    </div>
  );
}
