import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctor_id: String,
  doctor_name: String,
  doctor_specialty: String,

  patient_name: String,
  patient_email: String,

  date: String,
  time_slot: String,
  reason: String,

  status: { type: String, default: "confirmed" }
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);