import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState("");

  // Edit form states
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editService, setEditService] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // Load appointments only for the logged-in user
  const loadAppointments = async () => {
    try {
      const email = localStorage.getItem("email");

      if (!email) {
        navigate("/login");
        return;
      }

      // Only fetch user’s own appointments
      
      
      const res = await fetch(
        `https://med-qujl.onrender.com/api/appointments/all?email=${email}`
      );

      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.log("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // Delete user’s own appointment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;

    const res = await fetch(
      `https://med-qujl.onrender.com/api/appointments/delete/${id}`,
      { method: "DELETE" }
    );

    const data = await res.json();
    setMsg(data.message);
    loadAppointments();
  };

  // Open edit modal
  const openEdit = (appt) => {
    setEditing(appt._id);
    setEditName(appt.name);
    setEditEmail(appt.email);
    setEditPhone(appt.phone || "");

    // Fix date format (YYYY-MM-DD)
    const formattedDate = appt.date
      ? appt.date.substring(0, 10)
      : "";

    setEditDate(formattedDate);
    setEditService(appt.service);
    setEditNotes(appt.notes || "");
  };

  // Save updated appointment
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `https://med-qujl.onrender.com/api/appointments/update/${editing}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
          phone: editPhone,
          date: editDate,
          service: editService,
          notes: editNotes,
        }),
      }
    );

    const data = await res.json();
    setMsg(data.message);
    setEditing(null);
    loadAppointments();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Your Appointments</h1>
      <p style={{ color: "#00695c", fontWeight: "bold" }}>{msg}</p>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="appointment-list">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="appointment-card"
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
                background: "#f1f8f6",
              }}
            >
              <h3>{appt.name}</h3>
              <p>
                <strong>Email:</strong> {appt.email}
              </p>
              <p>
                <strong>Phone:</strong> {appt.phone || "N/A"}
              </p>
              <p>
                <strong>Date:</strong> {appt.date.substring(0, 10)}
              </p>
              <p>
                <strong>Service:</strong> {appt.service}
              </p>
              <p>
                <strong>Notes:</strong> {appt.notes || "None"}
              </p>

              <button
                className="btn-small"
                onClick={() => openEdit(appt)}
                style={{
                  marginRight: "10px",
                  background: "#00796b",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                className="btn-small"
                onClick={() => handleDelete(appt._id)}
                style={{
                  background: "#d9534f",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div
          className="edit-modal"
          style={{
            background: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              width: "400px",
            }}
          >
            <h2>Edit Appointment</h2>

            <form onSubmit={handleUpdate}>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={input}
              />
              <input
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                style={input}
              />
              <input
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                style={input}
              />
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                style={input}
              />

              <select
                value={editService}
                onChange={(e) => setEditService(e.target.value)}
                style={input}
              >
                <option value="GP">GP</option>
                <option value="Dentist">Dentist Consultation</option>
                <option value="Therapy">Therapy Session</option>
              </select>

              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                style={{ ...input, height: "80px" }}
              />

              <button className="btn" type="submit">
                Save Changes
              </button>

              <button
                className="btn"
                type="button"
                onClick={() => setEditing(null)}
                style={{ background: "#b71c1c", marginTop: "10px" }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const input = {
  width: "100%",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

export default Profile;
