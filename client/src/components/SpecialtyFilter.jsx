import React from "react";

const specialties = [
  "All",
  "General Practice",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "Psychiatry",
  "Ophthalmology",
  "ENT",
  "Gynecology",
];

export default function SpecialtyFilter({ selected, onChange }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.scrollRow}>
        {specialties.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            style={{
              ...styles.button,
              ...(selected === s ? styles.activeButton : styles.inactiveButton),
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    overflowX: "auto",
    whiteSpace: "nowrap",
    paddingBottom: 8,
  },
  scrollRow: {
    display: "flex",
    gap: 8,
  },
  button: {
    padding: "6px 12px",
    borderRadius: 20,
    border: "1px solid #ddd",
    cursor: "pointer",
    fontSize: 13,
    background: "white",
    flexShrink: 0,
    transition: "0.2s",
  },
  activeButton: {
    background: "#2e7dff",
    color: "white",
    border: "1px solid #2e7dff",
  },
  inactiveButton: {
    background: "white",
    color: "#555",
  },
};