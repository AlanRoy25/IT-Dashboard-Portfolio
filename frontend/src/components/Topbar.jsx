import Bell from "./BellIcon";
import ReminderPanel from "./ReminderPanel";

export default function TopBar({ reminders, show, toggle }) {
  return (
    <div
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 24px",
        borderBottom: "1px solid #1E293B",
        position: "relative",
      }}
    >
      <Bell count={reminders.length} onClick={toggle} />

      {show && <ReminderPanel reminders={reminders} />}
    </div>
  );
}
