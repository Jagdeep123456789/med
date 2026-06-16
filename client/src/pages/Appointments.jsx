import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MessageSquare,
  Loader2,
  CalendarPlus,
} from "lucide-react";

const statusColors = {
  pending: "#fef3c7",
  confirmed: "#dbeafe",
  completed: "#dcfce7",
  cancelled: "#fee2e2",
};

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")); // simple auth replace

  useEffect(() => {
  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?._id) {
        console.log("No user found");
        setAppointments([]);
        return;
      }

      const res = await fetch(
        `http://localhost:5000/api/appointments`
      );

      const data = await res.json();

      console.log("ALL APPOINTMENTS:", data);

      // filter frontend side (IMPORTANT FIX)
      const filtered = data.filter(
        (a) => a.patient_email === user.email
      );

      setAppointments(filtered);
    } catch (err) {
      console.log(err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, []);
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1>My Appointments</h1>
          <p>View and manage your bookings</p>
        </div>

        <Link to="/doctors">
          <button style={styles.primaryBtn}>
            <CalendarPlus size={16} /> Book New
          </button>
        </Link>
      </div>

      {/* Empty state */}
      {appointments.length === 0 ? (
        <div style={styles.emptyBox}>
          <Calendar size={40} />
          <h3>No Appointments Yet</h3>
          <p>Book your first appointment</p>
          <Link to="/doctors">
            <button style={styles.primaryBtn}>Find Doctor</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {appointments.map((apt) => (
            <div key={apt._id} style={styles.card}>
              <div style={{ flex: 1 }}>
                <div style={styles.row}>
                  <h3>{apt.doctor_name}</h3>
                  <span
                    style={{
                      ...styles.badge,
                      background: statusColors[apt.status],
                    }}
                  >
                    {apt.status}
                  </span>
                </div>

                <p style={{ margin: "4px 0", color: "#666" }}>
                  {apt.doctor_specialty}
                </p>

                <div style={styles.row}>
                  <span>
                    <Calendar size={14} /> {apt.date}
                  </span>
                  <span>
                    <Clock size={14} /> {apt.time_slot}
                  </span>
                </div>

                {apt.reason && (
                  <p style={styles.reason}>"{apt.reason}"</p>
                )}
              </div>

              <Link to={`/chat/${apt._id}`}>
                <button style={styles.chatBtn}>
                  <MessageSquare size={14} /> Chat
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    maxWidth: 800,
    margin: "0 auto",
    padding: 20,
    fontFamily: "Arial",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  primaryBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: 20,
    cursor: "pointer",
    display: "flex",
    gap: 6,
    alignItems: "center",
  },

  card: {
    border: "1px solid #eee",
    borderRadius: 10,
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
  },

  badge: {
    padding: "4px 8px",
    borderRadius: 12,
    fontSize: 12,
  },

  chatBtn: {
    background: "#fff",
    border: "1px solid #ddd",
    padding: "8px 12px",
    borderRadius: 20,
    cursor: "pointer",
  },

  reason: {
    fontStyle: "italic",
    color: "#777",
    marginTop: 6,
  },

  emptyBox: {
    textAlign: "center",
    padding: 40,
    border: "1px dashed #ccc",
    borderRadius: 10,
  },

  center: {
    display: "flex",
    justifyContent: "center",
    padding: 50,
  },
};