import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  bio: String,
  rating: Number,
  experience_years: Number,
  consultation_fee: Number,
  available_days: [String],
  available_slots: [String],
  avatar_url: String
});

export default mongoose.model("Doctor", doctorSchema);