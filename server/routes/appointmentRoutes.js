import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const appointment = await Appointment.create(req.body);
  res.json(appointment);
});

// GET ALL
router.get("/", async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

// COMPLETE APPOINTMENT
router.patch("/:id", async (req, res) => {
  try {
    console.log("PATCH HIT");
    console.log(req.params.id);

    const appointment =
      await Appointment.findByIdAndUpdate(
        req.params.id,
        { status: "completed" },
        { new: true }
      );

    res.json(appointment);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});
export default router;