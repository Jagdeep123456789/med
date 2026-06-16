import React, { useState } from "react";

export default function ReminderButton({ appointment }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!appointment) return null;

  // Simple date label helper (no date-fns)
  const getDateLabel = (dateStr) => {
    if (!dateStr) return "";

    const today = new Date();
    const inputDate = new Date(dateStr);

    const diffTime = inputDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "tomorrow";

    return inputDate.toDateString();
  };

  const handleSendReminder = async () => {
    setSending(true);

    try {
      const res = await fetch("http://localhost:5000/api/email/reminder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: appointment.patient_email,
          subject: `Reminder: Appointment with ${appointment.doctor_name}`,
          appointment,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setSent(true);
      alert(`Reminder sent to ${appointment.patient_email}`);
    } catch (error) {
      alert("Failed to send reminder");
    } finally {
      setSending(false);
    }
  };

  return (
    <button
      onClick={handleSendReminder}
      disabled={sending || sent || !appointment.patient_email}
      style={{
        padding: "6px 10px",
        borderRadius: 20,
        border: "1px solid #ddd",
        background: sent ? "#e8f5e9" : "white",
        color: sent ? "#2e7d32" : "#555",
        cursor: "pointer",
        fontSize: 12,
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
      title={!appointment.patient_email ? "No email found" : ""}
    >
      {sending ? (
        <span>⏳ Sending...</span>
      ) : sent ? (
        <span>✅ Sent</span>
      ) : (
        <span>🔔 Remind</span>
      )}
    </button>
  );
}