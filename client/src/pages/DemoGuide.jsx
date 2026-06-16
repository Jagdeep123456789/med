import React from "react";
import {
  UserCircle,
  Stethoscope,
  Calendar,
  MessageSquare,
  Pill,
  CheckCircle2,
  Monitor,
  Bell,
  Info,
} from "lucide-react";

const steps = [
  {
    role: "patient",
    icon: UserCircle,
    title: "Patient logs in",
    desc: "Register / log in as a normal user (patient).",
    detail: "User account represents the patient side of the system.",
  },
  {
    role: "patient",
    icon: Calendar,
    title: "Patient books appointment",
    desc: "Patient selects doctor, date, and time.",
    detail: "Appointment is saved in MongoDB with status = pending/confirmed.",
  },
  {
    role: "doctor",
    icon: Stethoscope,
    title: "Doctor logs in (Admin)",
    desc: "Doctor uses admin account in a second tab.",
    detail: "Admin role automatically enables doctor dashboard.",
  },
  {
    role: "doctor",
    icon: Bell,
    title: "Doctor sees appointments",
    desc: "All appointments appear in Doctor Portal.",
    detail: "Doctor can view all patient bookings in real time.",
  },
  {
    role: "both",
    icon: MessageSquare,
    title: "Real-time chat",
    desc: "Doctor and patient chat using same appointment ID.",
    detail: "Messages stored in ChatMessage collection.",
  },
  {
    role: "doctor",
    icon: Pill,
    title: "Doctor sends prescription",
    desc: "Doctor writes prescription in chat.",
    detail: "Marked with is_prescription = true in database.",
  },
  {
    role: "patient",
    icon: CheckCircle2,
    title: "Patient views prescription",
    desc: "Prescription appears in chat and prescriptions page.",
    detail: "Fetched from ChatMessage + filtered by appointment.",
  },
];

export default function DemoGuide() {
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <div style={styles.badge}>
          <Monitor size={14} /> Demo Guide
        </div>

        <h1 style={styles.title}>Doctor ↔ Patient Flow</h1>

        <p style={styles.subtitle}>
          Full system flow showing booking, chat, and prescriptions.
        </p>
      </div>

      {/* Info */}
      <div style={styles.infoBox}>
        <Info size={18} />
        <p style={{ margin: 0, fontSize: 13 }}>
          Open two tabs: one for Patient, one for Doctor (Admin).
        </p>
      </div>

      {/* Steps */}
      <div style={{ marginTop: 20 }}>
        {steps.map((step, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.iconBox}>
              <step.icon size={20} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={styles.stepHeader}>Step {i + 1}</div>
              <h3 style={{ margin: "4px 0" }}>{step.title}</h3>
              <p style={styles.text}>{step.desc}</p>
              <p style={styles.small}>{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <CheckCircle2 size={22} />
        <p>
          Doctor and Patient are connected via MongoDB + real-time API calls.
        </p>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    maxWidth: 800,
    margin: "0 auto",
    padding: 20,
    fontFamily: "Arial, sans-serif",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },

  subtitle: {
    color: "#666",
    fontSize: 14,
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 10px",
    background: "#eef",
    borderRadius: 20,
    fontSize: 12,
  },

  infoBox: {
    marginTop: 15,
    padding: 12,
    background: "#fff7e6",
    border: "1px solid #ffd591",
    borderRadius: 10,
    display: "flex",
    gap: 10,
    alignItems: "center",
  },

  card: {
    display: "flex",
    gap: 12,
    padding: 15,
    border: "1px solid #eee",
    borderRadius: 10,
    marginBottom: 12,
    background: "#fff",
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  stepHeader: {
    fontSize: 11,
    color: "#888",
    fontWeight: "bold",
  },

  text: {
    fontSize: 14,
    margin: 0,
  },

  small: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },

  footer: {
    marginTop: 25,
    padding: 15,
    background: "#f0fff4",
    border: "1px solid #b7eb8f",
    borderRadius: 10,
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
};