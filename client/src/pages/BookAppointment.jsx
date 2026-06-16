import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [reason, setReason] = useState("");
  const [step, setStep] = useState(1);

 useEffect(() => {
  const fetchDoctor = async () => {
    try {
      setLoading(true);

      console.log("Doctor ID:", doctorId);

      const res = await fetch(`https://med-qujl.onrender.com/api/doctors/${doctorId}`);

      const text = await res.text(); // debug step

      console.log("RAW RESPONSE:", text);

      const data = JSON.parse(text);

      setDoctor(data);
    } catch (err) {
      console.log("ERROR:", err);
      setDoctor(null);
    } finally {
      setLoading(false);
    }
  };

  if (doctorId) fetchDoctor();
}, [doctorId]);
 // BOOK appointment
  const handleBook = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please login first");
      return;
    }

    const appointmentData = {
      doctor_id: doctorId,
      doctor_name: doctor.name,
      doctor_specialty: doctor.specialty,

      patient_email: user.email,

      patient_name:
        user.name ||
        user.full_name ||
        user.email,

      date: selectedDate,
      time_slot: selectedSlot,

      reason: reason || "General Consultation",

      // IMPORTANT
      status: "pending",
    };

    console.log(
      "Saving Appointment:",
      appointmentData
    );

    const res = await fetch(
      `https://med-qujl.onrender.com/api/appointments`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          appointmentData
        ),
      }
    );

    const data = await res.json();

    console.log(
      "Appointment Saved:",
      data
    );

    if (res.ok) {
      setStep(3);
    } else {
      alert(
        data.message ||
          "Booking failed"
      );
    }
  } catch (err) {
    console.log(err);
    alert("Booking failed");
  }
};
  if (loading) return <p>Loading...</p>;
  if (!doctor) return <p>Doctor not found</p>;

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>

      {/* BACK */}
      <button onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* DOCTOR CARD */}
      <div style={{ border: "1px solid #ccc", padding: 15, marginTop: 15 }}>
        <h2>{doctor.name}</h2>
        <p>{doctor.specialty}</p>
        <p>{doctor.bio}</p>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div style={{ marginTop: 20 }}>
          <h3>Select Date & Time</h3>

          <input
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <div style={{ marginTop: 10 }}>
            {doctor.available_slots?.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                style={{
                  margin: 5,
                  padding: 8,
                  background: selectedSlot === slot ? "green" : "#eee"
                }}
              >
                {slot}
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!selectedDate || !selectedSlot}
            style={{ marginTop: 10 }}
          >
            Continue
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div style={{ marginTop: 20 }}>
          <h3>Confirm Appointment</h3>

          <p>Doctor: {doctor.name}</p>
          <p>Date: {selectedDate}</p>
          <p>Time: {selectedSlot}</p>

          <textarea
            placeholder="Reason (optional)"
            onChange={(e) => setReason(e.target.value)}
            style={{ width: "100%", marginTop: 10 }}
          />

          <div style={{ marginTop: 10 }}>
            <button onClick={() => setStep(1)}>Back</button>
            <button onClick={handleBook} style={{ marginLeft: 10 }}>
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <h2>Appointment Booked ✅</h2>

          <button onClick={() => navigate("/appointments")}>
            View Appointments
          </button>

          <button onClick={() => navigate("/doctors")}>
            Book Another
          </button>
        </div>
      )}

    </div>
  );
}