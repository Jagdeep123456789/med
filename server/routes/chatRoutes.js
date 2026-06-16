import express from "express";
import ChatMessage from "../models/ChatMessage.js";

const router = express.Router();

router.get("/:appointmentId", async (req, res) => {
  try {
    const messages = await ChatMessage.find({
      appointment_id: req.params.appointmentId,
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newMessage = await ChatMessage.create({
      appointment_id: req.body.appointment_id,
      senderRole: req.body.senderRole,
      senderName: req.body.senderName,
      message: req.body.message,
    });

    res.json(newMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;