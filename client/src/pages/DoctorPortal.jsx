import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
export default function DoctorPortal() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch(
        "https://med-qujl.onrender.com/api/appointments"
      );

      const data = await res.json();

      setAppointments(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (id) => {
    try {
      await fetch(
        `https://med-qujl.onrender.com/api/appointments/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "completed",
          }),
        }
      );

      fetchAppointments();
    } catch (err) {
      console.log(err);
    }const markCompleted = async (id) => {
  try {
    console.log("Completing:", id);

    const res = await fetch(
      `https://med-qujl.onrender.com/api/appointments/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "completed",
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    fetchAppointments();
  } catch (err) {
    console.log(err);
  }
};
  };

  const pending = appointments.filter(
    (a) => a.status === "pending"
  ).length;

  const completed = appointments.filter(
    (a) => a.status === "completed"
  ).length;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h1>👨‍⚕️ Doctor Portal</h1>

      <p>
        Welcome back,
        <strong> {user?.email}</strong>
      </p>

      {/* STATS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={card}>
          <h2>{appointments.length}</h2>
          <p>Total Appointments</p>
        </div>

        <div style={card}>
          <h2>{pending}</h2>
          <p>Pending</p>
        </div>

        <div style={card}>
          <h2>{completed}</h2>
          <p>Completed</p>
        </div>
      </div>

      {/* TABLE */}

      {loading ? (
        <h3>Loading appointments...</h3>
      ) : appointments.length === 0 ? (
        <h3>No appointments found</h3>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={th}>Patient</th>
              <th style={th}>Doctor</th>
              <th style={th}>Date</th>
              <th style={th}>Time</th>
              <th style={th}>Status</th>
              <th style={th}>Reason</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((apt) => (
              <tr key={apt._id}>
                <td style={td}>
  {apt.patient_name ||
   apt.patient_email ||
   "Unknown Patient"}
</td>
                <td style={td}>
                  {apt.doctor_name}
                </td>

                <td style={td}>
                  {apt.date}
                </td>

                <td style={td}>
                  {apt.time_slot}
                </td>

                <td style={td}>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "15px",
                      background:
                        apt.status === "completed"
                          ? "#d1fae5"
                          : "#dbeafe",
                    }}
                  >
                    {apt.status}
                  </span>
                </td>

                <td style={td}>
                  {apt.reason}
                </td>

                <td style={td}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Link
                      to={`/chat/${apt._id}`}
                    >
                      <button style={chatBtn}>
                        💬 Chat
                      </button>
                    </Link>

                    {apt.status !==
                      "completed" && (
                      <button
                        style={doneBtn}
                        onClick={() =>
                          markCompleted(
                            apt._id
                          )
                        }
                      >
                        ✅ Complete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "15px",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const th = {
  padding: "12px",
  background: "#2563eb",
  color: "white",
};

const td = {
  padding: "12px",
  borderBottom:
    "1px solid #e5e7eb",
};

const chatBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

const doneBtn = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};