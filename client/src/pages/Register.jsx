import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [step, setStep] = useState(1); // 1 = register, 2 = verify OTP

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /* ---------------- REGISTER ---------------- */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await fetch("https://med-qujl.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // send OTP after register
      await fetch("https://med-qujl.onrender.com/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
  const handleVerify = async () => {
    setError("");

    try {
      setLoading(true);

      const res = await fetch("https://med-qujl.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // save login session
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RESEND OTP ---------------- */
  const handleResend = async () => {
    try {
      await fetch("https://med-qujl.onrender.com/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      alert("OTP sent again");
    } catch (err) {
      setError("Failed to resend OTP");
    }
  };

  /* ---------------- OTP SCREEN ---------------- */
  if (step === 2) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Verify Email</h2>
          <p>We sent OTP to {email}</p>

          {error && <p style={styles.error}>{error}</p>}

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
          />

          <button onClick={handleVerify} style={styles.button}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p style={{ fontSize: 12 }}>
            Didn't get code?{" "}
            <button onClick={handleResend} style={styles.link}>
              Resend
            </button>
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- REGISTER SCREEN ---------------- */
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account</h2>
        <p>Sign up to get started</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p style={{ fontSize: 12 }}>
          Already have account? <Link to="/login">Login</Link>
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
    padding: 20,
    borderRadius: 12,
    background: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  button: {
    width: "100%",
    padding: 10,
    marginTop: 15,
    borderRadius: 8,
    border: "none",
    background: "#2e7dff",
    color: "white",
    cursor: "pointer",
  },

  error: {
    color: "red",
    fontSize: 12,
  },

  link: {
    color: "#2e7dff",
    border: "none",
    background: "none",
    cursor: "pointer",
  },
};