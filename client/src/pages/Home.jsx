import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardStats from "../components/DashboardStats";
import UpcomingAppointments from "../components/UpcomingAppointments";

export default function Home() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState([]);

  // Load user from localStorage (simple auth replacement)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // Fetch appointments from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (!user?._id) return;

        // appointments
        const res = await fetch(
          `https://med-qujl.onrender.com/api/appointments?userId=${user._id}`
        );
        const data = await res.json();
        setAppointments(data);

        // chat messages (for prescriptions)
        const msgRes = await fetch(
          `https://med-qujl.onrender.com/api/chat`
        );
        const msgData = await msgRes.json();

        const filtered = msgData.filter(
          (m) =>
            m.is_prescription &&
            data.some((a) => a._id === m.appointment_id)
        );

        setPrescriptions(filtered);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const name = user?.name?.split(" ")[0] || "there";

  return (
    <div style={styles.container}>
      {/* HERO */}
      <div style={styles.hero}>
        <div>
          <div style={styles.badge}>❤️ Welcome back</div>

          <h1 style={styles.title}>
            {greeting()}, {name}!
          </h1>

          <p style={styles.subtitle}>
            Here's your health overview for today.
          </p>
        </div>

        <Link to="/doctors">
          <button style={styles.primaryBtn}>
            📅 Book Appointment
          </button>
        </Link>
      </div>

      {/* STATS */}
      <DashboardStats
        appointments={appointments}
        prescriptions={prescriptions}
      />

      {/* MAIN GRID */}
      <div style={styles.grid}>
        {/* LEFT */}
        <div style={styles.left}>
          <UpcomingAppointments
            appointments={appointments}
            isLoading={loading}
          />
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          {/* Quick Actions */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Quick Actions</h3>

            <Link to="/doctors">
              <button style={styles.actionBtn}>🔍 Find a Doctor</button>
            </Link>

            <Link to="/appointments">
              <button style={styles.actionBtn}>📅 All Appointments</button>
            </Link>

            <Link to="/prescriptions">
              <button style={styles.actionBtn}>💊 My Prescriptions</button>
            </Link>
          </div>

          {/* Health Tip */}
          <div style={styles.tipCard}>
            <h4 style={styles.tipTitle}>🛡 Health Tip</h4>

            <p style={styles.tipMain}>Stay hydrated!</p>

            <p style={styles.tipText}>
              Drinking enough water improves energy, skin health, and focus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: 20,
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 10,
  },

  badge: {
    display: "inline-block",
    background: "#e8f0ff",
    color: "#2e7dff",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
    marginBottom: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 0,
  },

  subtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },

  primaryBtn: {
    padding: "10px 14px",
    borderRadius: 20,
    border: "none",
    background: "#2e7dff",
    color: "white",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 20,
    marginTop: 20,
  },

  left: {},

  right: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },

  card: {
    border: "1px solid #eee",
    borderRadius: 12,
    padding: 15,
    background: "#fff",
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },

  actionBtn: {
    width: "100%",
    padding: "8px 10px",
    marginBottom: 8,
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    textAlign: "left",
  },

  tipCard: {
    borderRadius: 12,
    padding: 15,
    background: "linear-gradient(135deg, #e8f0ff, #f3e8ff)",
  },

  tipTitle: {
    fontSize: 12,
    color: "#2e7dff",
    fontWeight: "bold",
    marginBottom: 5,
  },

  tipMain: {
    fontSize: 14,
    fontWeight: "bold",
  },

  tipText: {
    fontSize: 12,
    color: "#555",
  },
};