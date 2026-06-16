import React from "react";
import { Link } from "react-router-dom";
import { Star, Clock, DollarSign } from "lucide-react";

export default function DoctorCard({ doctor, index = 0 }) {

  if (!doctor) return null;

  const doctorId = doctor._id || doctor.id;

  console.log("DOCTOR OBJECT:", doctor);

  return (
    <div
      style={{
        opacity: 0,
        animation: `fadeUp 0.4s ease forwards`,
        animationDelay: `${index * 0.08}s`,
      }}
      className="doctor-card"
    >
      <div className="card">
        <div className="left">
          <img src={doctor.avatar_url} alt={doctor.name} />
        </div>

        <div className="right">
          <h3>{doctor.name}</h3>
          <span className="badge">{doctor.specialty}</span>

          <div className="rating">
            <Star size={14} /> {doctor.rating}
          </div>

          <p className="bio">{doctor.bio}</p>

          <div className="footer">
            <div className="info">
              <span>
                <Clock size={14} /> {doctor.experience_years}y exp
              </span>
              <span>
                <DollarSign size={14} /> ${doctor.consultation_fee}
              </span>
            </div>
const doctorId = doctor._id || doctor.id;

<Link to={`/book/${doctorId}`}>
  <button className="btn">
    Book Now
  </button>
</Link>
            <Link to={doctor?._id ? `/book/${doctor._id}` : "#"}>
  <button className="btn" disabled={!doctor?._id}>
    Book Now
  </button>
</Link>
          </div>
        </div>
      </div>
    </div>
  );
}