import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save user + token
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
if (data.user.role === "doctor") {
  navigate("/doctor-portal");
} else {
  navigate("/");
}
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    // later you can replace with real OAuth backend
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Log in to your account</p>

        {/* Google */}
        <button onClick={handleGoogle} style={styles.googleBtn}>
          🔵 Continue with Google
        </button>

        <div style={styles.divider}>or</div>

        {/* Error */}
        {error && <div style={styles.error}>{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={styles.loginBtn}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb",
  },

  card: {
    width: 350,
    padding: 25,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  title: {
    margin: 0,
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 15,
  },

  googleBtn: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    marginBottom: 10,
  },

  divider: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    margin: "10px 0",
  },

  error: {
    background: "#ffe5e5",
    color: "#c62828",
    padding: 8,
    borderRadius: 6,
    fontSize: 12,
    marginBottom: 10,
  },

  label: {
    fontSize: 12,
    marginTop: 10,
    display: "block",
  },

  input: {
    width: "100%",
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
    outline: "none",
  },

  loginBtn: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#2e7dff",
    color: "white",
    cursor: "pointer",
    marginTop: 10,
  },

  footer: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 15,
    color: "#555",
  },

  link: {
    color: "#2e7dff",
    textDecoration: "none",
  },
};