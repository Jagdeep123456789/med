import React, { useEffect, useState } from "react";
import { API_URL } from "../config";

import DoctorCard from "../components/DoctorCard";
import SpecialtyFilter from "../components/SpecialtyFilter";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [loading, setLoading] = useState(true);

  // FETCH DOCTORS
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);

        const res = await fetch("${API_URL}/api/doctors");
        const data = await res.json();
const list = Array.isArray(data) ? data : data.doctors || [];
        setDoctors(data);
        setFiltered(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // FILTER LOGIC
  useEffect(() => {
    let result = doctors;

    // search filter
    if (search) {
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.specialty.toLowerCase().includes(search.toLowerCase())
      );
    }

    // specialty filter
    if (specialty !== "All") {
      result = result.filter((d) => d.specialty === specialty);
    }

    setFiltered(result);
  }, [search, specialty, doctors]);

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <h1 style={styles.title}>Find a Doctor</h1>
      <p style={styles.subtitle}>
        Browse verified medical professionals
      </p>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by name or specialty..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* FILTER */}
      <SpecialtyFilter
        selected={specialty}
        onChange={setSpecialty}
      />

      {/* CONTENT */}
      {loading ? (
        <p>Loading doctors...</p>
      ) : filtered.length === 0 ? (
        <p style={styles.empty}>No doctors found</p>
      ) : (
        <div style={styles.grid}>
          {filtered.map((doc, i) => (
            <DoctorCard key={doc._id} doctor={doc} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 20,
  },

  search: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ddd",
    marginBottom: 15,
  },

  grid: {
    display: "grid",
    gap: 12,
  },

  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 30,
  },
};