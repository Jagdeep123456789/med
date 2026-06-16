import React from "react";

export default function DashboardStats({
  appointments = [],
  prescriptions = [],
}) {
  // Helper: check if date is in future
  const isFutureDate = (dateStr) => {
    const today = new Date();
    const inputDate = new Date(dateStr);
    return inputDate > today;
  };

  const upcoming = appointments.filter(
    (a) =>
      a.status !== "cancelled" &&
      a.status !== "completed" &&
      isFutureDate(a.date)
  ).length;

  const completed = appointments.filter(
    (a) => a.status === "completed"
  ).length;

  const pending = appointments.filter(
    (a) => a.status === "pending"
  ).length;

  const rxCount = prescriptions.length;

  const stats = [
    { label: "Upcoming", value: upcoming, icon: "📅", color: "#2e7dff" },
    { label: "Completed", value: completed, icon: "✅", color: "#22c55e" },
    { label: "Pending", value: pending, icon: "⏰", color: "#f59e0b" },
    { label: "Prescriptions", value: rxCount, icon: "📄", color: "#a855f7" },
  ];

  return (
    <div style={styles.grid}>
      {stats.map((s, i) => (
        <div key={i} style={styles.card}>
          <div
            style={{
              ...styles.iconBox,
              backgroundColor: s.color + "20",
              color: s.color,
            }}
          >
            <span style={{ fontSize: 18 }}>{s.icon}</span>
          </div>

          <div>
            <h2 style={styles.value}>{s.value}</h2>
            <p style={styles.label}>{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
  },

  card: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 12,
    border: "1px solid #e5e5e5",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  },

  value: {
    margin: 0,
    fontSize: 20,
    fontWeight: "bold",
  },

  label: {
    margin: 0,
    fontSize: 12,
    color: "#666",
  },
};