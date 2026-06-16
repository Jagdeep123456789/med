import React from "react";
import { Navigate } from "react-router-dom";

export default function DoctorRoute({ children }) {
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
return <Navigate to="/login" replace />;
}

if (user.role !== "doctor") {
return <Navigate to="/" replace />;
}

return children;
}
