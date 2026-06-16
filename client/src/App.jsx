import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/AppLayout";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import BookAppointment from "./pages/BookAppointment";
import Chat from "./pages/Chat";
import Prescriptions from "./pages/Prescriptions";
import DemoGuide from "./pages/DemoGuide";
import DoctorPortal from "./pages/DoctorPortal";
import DoctorRoute from "./components/DoctorRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* APP PAGES */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/demo" element={<DemoGuide />} />
          
          <Route path="/book/:doctorId" element={<BookAppointment />} />
          <Route path="/chat/:appointmentId" element={<Chat />} />
          <Route
  path="/doctor-portal"
  element={
    <DoctorRoute>
      <DoctorPortal />
    </DoctorRoute>
  }
/>
  
        </Route>

      </Routes>
    </BrowserRouter>
  );
}