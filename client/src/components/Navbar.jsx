import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const patientLinks = [
{ to: "/", label: "Home", icon: "🏠" },
{ to: "/doctors", label: "Doctors", icon: "❤️" },
{ to: "/appointments", label: "Appointments", icon: "📅" },
{ to: "/prescriptions", label: "Prescriptions", icon: "📄" },
{ to: "/demo", label: "Demo Guide", icon: "📘" },
];

const doctorLinks = [
{ to: "/", label: "Home", icon: "🏠" },
{ to: "/doctor-portal", label: "Doctor Portal", icon: "🩺" },
{ to: "/appointments", label: "Appointments", icon: "📅" },
{ to: "/demo", label: "Demo Guide", icon: "📘" },
];

export default function Navbar({ onLogout }) {
const [mobileOpen, setMobileOpen] = useState(false);
const location = useLocation();

const currentUser = JSON.parse(localStorage.getItem("user"));

const isDoctor = currentUser?.role === "doctor";

const navLinks = isDoctor ? doctorLinks : patientLinks;

return ( <nav style={styles.nav}> <div style={styles.container}> <Link to="/" style={styles.logo}> <div style={styles.logoIcon}>❤️</div> <span style={styles.logoText}>MedBook</span>

```
      {isDoctor && (
        <span style={styles.badge}>
          Doctor
        </span>
      )}
    </Link>

    <div style={styles.linksDesktop}>
      {navLinks.map((link) => {
        const active =
          location.pathname === link.to;

        return (
          <Link
            key={link.to}
            to={link.to}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                ...styles.linkBtn,
                ...(active
                  ? styles.activeLink
                  : {}),
              }}
            >
              <span>{link.icon}</span>
              {link.label}
            </div>
          </Link>
        );
      })}
    </div>

    <div style={styles.right}>
      {currentUser && (
        <div style={styles.userBox}>
          <div style={styles.avatar}>
            {currentUser.email?.[0]?.toUpperCase()}
          </div>

          <span style={styles.userName}>
            {currentUser.email}
          </span>
        </div>
      )}

      <button
        style={styles.logoutBtn}
        onClick={onLogout}
      >
        Logout
      </button>

      <button
        style={styles.menuBtn}
        onClick={() =>
          setMobileOpen(!mobileOpen)
        }
      >
        ☰
      </button>
    </div>
  </div>

  {mobileOpen && (
    <div style={styles.mobileMenu}>
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          style={{
            textDecoration: "none",
          }}
          onClick={() =>
            setMobileOpen(false)
          }
        >
          <div style={styles.mobileLink}>
            {link.icon} {link.label}
          </div>
        </Link>
      ))}

      <button
        style={styles.mobileLogout}
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  )}
</nav>

);
}

const styles = {
nav: {
background: "#fff",
borderBottom: "1px solid #eee",
position: "sticky",
top: 0,
zIndex: 100,
},

container: {
maxWidth: 1200,
margin: "0 auto",
padding: "12px 20px",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
},

logo: {
display: "flex",
alignItems: "center",
gap: 8,
textDecoration: "none",
color: "#000",
},

logoIcon: {
width: 40,
height: 40,
borderRadius: 10,
background: "#2563eb",
display: "flex",
alignItems: "center",
justifyContent: "center",
color: "#fff",
},

logoText: {
fontSize: 22,
fontWeight: "bold",
},

badge: {
background: "#dbeafe",
color: "#2563eb",
borderRadius: 20,
padding: "3px 8px",
fontSize: 11,
},

linksDesktop: {
display: "flex",
gap: 10,
},

linkBtn: {
padding: "8px 14px",
borderRadius: 20,
display: "flex",
gap: 6,
alignItems: "center",
color: "#555",
},

activeLink: {
background: "#2563eb",
color: "#fff",
},

right: {
display: "flex",
alignItems: "center",
gap: 10,
},

userBox: {
display: "flex",
alignItems: "center",
gap: 8,
},

avatar: {
width: 34,
height: 34,
borderRadius: "50%",
background: "#eee",
display: "flex",
justifyContent: "center",
alignItems: "center",
fontWeight: "bold",
},

userName: {
fontSize: 13,
},

logoutBtn: {
border: "none",
background: "#f3f4f6",
padding: "8px 14px",
borderRadius: 20,
cursor: "pointer",
},

menuBtn: {
display: "none",
},

mobileMenu: {
padding: 10,
borderTop: "1px solid #eee",
},

mobileLink: {
padding: 10,
borderRadius: 10,
},

mobileLogout: {
marginTop: 10,
width: "100%",
padding: 10,
border: "none",
borderRadius: 10,
},
};
