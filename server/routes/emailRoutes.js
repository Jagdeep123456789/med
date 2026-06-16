import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/reminder", async (req, res) => {
  const { to, subject, appointment } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: `
Reminder for your appointment:

Doctor: ${appointment.doctor_name}
Date: ${appointment.date}
Time: ${appointment.time_slot}
      `,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Email failed" });
  }
});

export default router;