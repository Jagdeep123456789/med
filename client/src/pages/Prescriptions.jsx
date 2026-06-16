import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Prescriptions() {
const [user, setUser] = useState(null);
const [prescriptions, setPrescriptions] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const storedUser = JSON.parse(
localStorage.getItem("user")
);

setUser(storedUser);


}, []);

useEffect(() => {
const fetchPrescriptions = async () => {
try {
if (!user?.email) return;

    setLoading(true);

    const res = await fetch(
      `http://localhost:5000/api/prescriptions`
    );

    const data = await res.json();

    setPrescriptions(data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

fetchPrescriptions();


}, [user]);

return ( <div style={styles.container}> <h1 style={styles.title}>
💊 My Precautions & Prescriptions </h1>


  <p style={styles.subtitle}>
    Advice provided by your doctor
  </p>

  {loading ? (
    <p>Loading...</p>
  ) : prescriptions.length === 0 ? (
    <div style={styles.empty}>
      <h3>No Precautions Yet</h3>

      <p>
        Your doctor has not sent any
        precautions yet.
      </p>

      <Link to="/doctors">
        <button style={styles.button}>
          Book Consultation
        </button>
      </Link>
    </div>
  ) : (
    prescriptions.map((rx) => (
      <div
        key={rx._id}
        style={styles.card}
      >
        <div style={styles.header}>
          💊 {rx.title}
        </div>

        <p style={styles.doctor}>
          Doctor: {rx.doctor_name}
        </p>

        <div style={styles.messageBox}>
          {rx.precaution}
        </div>

        <p style={styles.date}>
          {new Date(
            rx.createdAt
          ).toLocaleString()}
        </p>
      </div>
    ))
  )}
</div>


);
}

const styles = {
container: {
maxWidth: 900,
margin: "0 auto",
padding: 20,
},

title: {
fontSize: 28,
fontWeight: "bold",
},

subtitle: {
color: "#666",
marginBottom: 20,
},

empty: {
textAlign: "center",
padding: 40,
border: "1px solid #ddd",
borderRadius: 12,
},

button: {
marginTop: 10,
padding: "10px 20px",
border: "none",
borderRadius: 10,
background: "#2563eb",
color: "white",
cursor: "pointer",
},

card: {
background: "white",
border: "1px solid #eee",
borderRadius: 12,
padding: 20,
marginBottom: 15,
boxShadow:
"0 2px 8px rgba(0,0,0,0.05)",
},

header: {
fontWeight: "bold",
fontSize: 18,
marginBottom: 10,
},

doctor: {
color: "#2563eb",
marginBottom: 10,
},

messageBox: {
background: "#f8fafc",
padding: 15,
borderRadius: 10,
whiteSpace: "pre-wrap",
},

date: {
marginTop: 10,
color: "#777",
fontSize: 12,
},
};
