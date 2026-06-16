import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
// change this later to your deployed backend URL

// ----------------------
// AUTH
// ----------------------
export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

// ----------------------
// DOCTORS
// ----------------------
export const getDoctors = async () => {
  const res = await fetch(`${API_URL}/doctors`);
  return res.json();
};

export const getDoctorById = async (id) => {
  const res = await fetch(`${API_URL}/doctors/${id}`);
  return res.json();
};

// ----------------------
// APPOINTMENTS
// ----------------------
export const getAppointments = async (userId) => {
  const res = await fetch(`${API_URL}/appointments/user/${userId}`);
  return res.json();
};

export const createAppointment = async (data) => {
  const res = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getAppointmentById = async (id) => {
  const res = await fetch(`${API_URL}/appointments/${id}`);
  return res.json();
};

// ----------------------
// CHAT / MESSAGES
// ----------------------
export const getMessages = async (appointmentId) => {
  const res = await fetch(`${API_URL}/messages/${appointmentId}`);
  return res.json();
};

export const sendMessage = async (data) => {
  const res = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

// ----------------------
// PRESCRIPTIONS (same as messages but flagged)
// ----------------------
export const sendPrescription = async (data) => {
  const res = await fetch(`${API_URL}/messages/prescription`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      isPrescription: true,
    }),
  });

  return res.json();
};