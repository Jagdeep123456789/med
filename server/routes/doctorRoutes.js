import express from "express";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

// 🔥 GET SINGLE DOCTOR (THIS FIXES YOUR ERROR)
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;