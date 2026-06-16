import React from "react";
import { Link } from "react-router-dom";

export default function DoctorCard({ doctor, index = 0 }) {
  return (
    <div style={{ marginBottom: 20, opacity: 1 }}>
      <div style={{
        display: "flex",
        border: "1px solid #eee",
        borderRadius: 12,
        overflow: "hidden"
      }}>

        <img
          src={doctor.avatar_url}
          alt={doctor.name}
          style={{ width: 150, height: 160, objectFit: "cover" }}
        />

        <div style={{ padding: 15, flex: 1 }}>
          <h3>{doctor.name}</h3>
          <p>{doctor.specialty}</p>
          <p style={{ fontSize: 13, color: "#666" }}>{doctor.bio}</p>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              ⭐ {doctor.rating} | 💰 ${doctor.consultation_fee}
            </div>

            {/* FIX HERE 👇 */}
            <Link to={`/book/${doctor._id}`}>
              <button style={{ padding: "8px 14px" }}>
                Book Now
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}