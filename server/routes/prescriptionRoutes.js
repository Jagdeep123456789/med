import express from "express";
import Prescription from "../models/Prescription.js";

const router = express.Router();


// CREATE PRESCRIPTION
router.post("/", async (req, res) => {
  try {
    const prescription =
      await Prescription.create(req.body);

    res.status(201).json(prescription);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// GET ALL
router.get("/", async (req, res) => {
  try {
    const prescriptions =
      await Prescription.find()
      .sort({ createdAt: -1 });

    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// GET PATIENT PRESCRIPTIONS
router.get("/patient/:email", async (req, res) => {
  try {
    const prescriptions =
      await Prescription.find({
        patient_email:
          req.params.email,
      }).sort({
        createdAt: -1,
      });

    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;