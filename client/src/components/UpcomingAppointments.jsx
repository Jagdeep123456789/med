import React from "react";
import { Link } from "react-router-dom";

export default function UpcomingAppointments({
  appointments = [],
  isLoading,
}) {
  // Simple date helpers (no date-fns)
  const parseDate = (dateStr) => new Date(dateStr);

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isTomorrow = (date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.toDateString() === tomorrow.toDateString();
  };

  const getDateLabel = (dateStr) => {
    if (!dateStr) return "";
    const date = parseDate(dateStr);

    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";

    return date.toDateString();
  };

  // Filter + sort upcoming
  const upcoming = appointments
    .filter(
      (a) => a.status !== "cancelled" && a.status !== "completed"
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>Upcoming Appointments</h3>

        <Link to="/appointments" style={styles.link}>
          View all →
        </Link>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {isLoading ? (
          <div>
            {[1, 2, 3].map((i) => (
              <div key={i} style={styles.skeleton} />
            ))}
          </div>
        ) : upcoming.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize: 30 }}>🩺</div>
            <p>No upcoming appointments</p>

            <Link to="/doctors">
              <button style={styles.button}>Book Now</button>
            </Link>
          </div>
        ) : (
          upcoming.map((apt, i) => {
            const date = apt.date ? parseDate(apt.date) : null;

            return (
              <div key={i} style={styles.row}>
                {/* Date box */}
                <div style={styles.dateBox}>
                  <span style={styles.month}>
                    {date ? date.toLocaleString("default", { month: "short" }) : ""}
                  </span>
                  <span style={styles.day}>
                    {date ? date.getDate() : ""}
                  </span>
                </div>

                {/* Info */}
                <div style={styles.info}>
                  <div style={styles.topRow}>
                    <strong style={styles.name}>{apt.doctor_name}</strong>

                    <span style={getStatusStyle(apt.status)}>
                      {apt.status}
                    </span>

                    {date && isToday(date) && (
                      <span style={styles.todayBadge}>Today</span>
                    )}
                  </div>

                  <div style={styles.meta}>
                    📅 {getDateLabel(apt.date)} •
                    ⏰ {apt.time_slot} •
                    🏥 {apt.doctor_specialty}
                  </div>
                </div>

                {/* Chat button */}
                <Link to={`/chat/${apt._id || apt.id}`}>
                  <button style={styles.chatBtn}>💬</button>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  card: {
    border: "1px solid #e5e5e5",
    borderRadius: 12,
    padding: 15,
    background: "#fff",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: "bold",
  },

  link: {
    fontSize: 12,
    color: "#2e7dff",
    textDecoration: "none",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  skeleton: {
    height: 50,
    background: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 8,
  },

  empty: {
    textAlign: "center",
    padding: 20,
    color: "#666",
  },

  button: {
    marginTop: 10,
    padding: "6px 12px",
    borderRadius: 20,
    border: "none",
    background: "#2e7dff",
    color: "white",
    cursor: "pointer",
  },

  row: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 10,
    border: "1px solid #eee",
    borderRadius: 10,
  },

  dateBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    background: "#eef4ff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },

  month: {
    fontSize: 10,
    color: "#2e7dff",
    textTransform: "uppercase",
  },

  day: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7dff",
  },

  info: {
    flex: 1,
  },

  topRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap",
  },

  name: {
    fontSize: 14,
  },

  meta: {
    fontSize: 11,
    color: "#666",
    marginTop: 4,
  },

  chatBtn: {
    border: "none",
    background: "transparent",
    fontSize: 16,
    cursor: "pointer",
  },

  badgeBase: {
    fontSize: 10,
    padding: "2px 6px",
    borderRadius: 20,
    border: "1px solid",
  },
};

/* status colors */
function getStatusStyle(status) {
  const base = {
    fontSize: 10,
    padding: "2px 6px",
    borderRadius: 20,
    border: "1px solid",
  };

  switch (status) {
    case "pending":
      return {
        ...base,
        color: "#b45309",
        background: "#fef3c7",
        borderColor: "#fcd34d",
      };

    case "confirmed":
      return {
        ...base,
        color: "#2563eb",
        background: "#dbeafe",
        borderColor: "#93c5fd",
      };

    case "completed":
      return {
        ...base,
        color: "#16a34a",
        background: "#dcfce7",
        borderColor: "#86efac",
      };

    case "cancelled":
      return {
        ...base,
        color: "#dc2626",
        background: "#fee2e2",
        borderColor: "#fca5a5",
      };

    default:
      return base;
  }
}