import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema(
  {
    appointment_id: {
      type: String,
      required: true,
    },

    doctor_name: {
      type: String,
      required: true,
    },

    patient_email: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    precaution: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Prescription",
  PrescriptionSchema
);