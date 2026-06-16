import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import prescriptionRoutes
from "./routes/prescriptionRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/chat", chatRoutes);
app.use(
  "/api/prescriptions",prescriptionRoutes
);
// Create HTTP server
const httpServer = createServer(app);

// Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ User Connected:", socket.id);

  socket.on("join_room", (appointmentId) => {
    socket.join(appointmentId);
    console.log(`Joined room ${appointmentId}`);
  });

  socket.on("send_message", (data) => {
    io.to(data.appointmentId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User Disconnected");
  });
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Start server
httpServer.listen(5000, () => {
  console.log("Server running on port 5000");
});