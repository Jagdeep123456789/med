import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { API_URL } from "../config";

export default function Chat() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const isDoctor = user?.role === "doctor";
  const [showPrecaution, setShowPrecaution] = useState(false);
const [precautionText, setPrecautionText] = useState("");

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/chat/${appointmentId}`
      );

      const data = await res.json();

      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };
 const sendPrecaution = async () => {
  try {
    const res = await fetch(
      'https://med-qujl.onrender.com/api/prescriptions',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          doctor_name: user.email,
          patient_email: "patient@test.com",
          title: "Doctor Precaution",
          precaution: precautionText,
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    alert("Precaution Sent");

    setPrecautionText("");
    setShowPrecaution(false);
  } catch (err) {
    console.log(err);
  }
};
  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => clearInterval(interval);
  }, [appointmentId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
  if (!message.trim()) return;

  try {
    await fetch(
      `${API_URL}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          senderRole: isDoctor
            ? "doctor"
            : "patient",
          senderName:
            user?.email || "Unknown",
          message,
          is_prescription: false,
        }),
      }
    );

    setMessage("");

    fetchMessages();
  } catch (err) {
    console.log(err);
  }
};
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        background: "white",
        borderRadius: "15px",
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #eee",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <h2>
          {isDoctor
            ? "🩺 Doctor Chat"
            : "👤 Patient Chat"}
        </h2>

        <p>
          Appointment ID:
          {appointmentId}
        </p>
      </div>

      {/* CHAT AREA */}

      <div
        style={{
          height: "500px",
          overflowY: "auto",
          padding: "20px",
          background: "#f8fafc",
        }}
      >
        {messages.map((msg) => {
          const isMe =
            msg.senderRole ===
            (isDoctor
              ? "doctor"
              : "patient");

          return (
            <div
              key={msg._id}
              style={{
                display: "flex",
                justifyContent: isMe
                  ? "flex-end"
                  : "flex-start",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "12px",
                  borderRadius: "15px",
                  background: isMe
                    ? "#2563eb"
                    : "#e2e8f0",
                  color: isMe
                    ? "white"
                    : "black",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  {msg.senderRole ===
                  "doctor"
                    ? "🩺 Doctor"
                    : "👤 Patient"}
                </div>

                <div>
  {msg.is_prescription && (
    <div
      style={{
        background: "#fef3c7",
        color: "#92400e",
        padding: "4px 8px",
        borderRadius: "6px",
        marginBottom: "8px",
        fontWeight: "bold",
        fontSize: "12px",
      }}
    >
      💊 Doctor Precaution
    </div>
  )}

  {msg.message}
</div>

                <div
                  style={{
                    fontSize: "10px",
                    marginTop: "5px",
                    opacity: 0.8,
                  }}
                >
                  {msg.createdAt
                    ? format(
                        new Date(
                          msg.createdAt
                        ),
                        "hh:mm a"
                      )
                    : ""}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef}></div>
      </div>
{/* DOCTOR PRECAUTION PANEL */}

{isDoctor && (
  <div
    style={{
      padding: "15px",
      borderTop: "1px solid #ddd",
      background: "#fff8e1",
    }}
  >
    <button
      onClick={() =>
        setShowPrecaution(!showPrecaution)
      }
      style={{
        background: "#f59e0b",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "10px",
        cursor: "pointer",
      }}
    >
      💊 Send Precaution
    </button>

    {showPrecaution && (
      <div style={{ marginTop: "15px" }}>
        <textarea
          value={precautionText}
          onChange={(e) =>
            setPrecautionText(e.target.value)
          }
          placeholder="Write precautions for patient..."
          rows={5}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />

        <button
          onClick={sendPrecaution}
          style={{
            marginTop: "10px",
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Send To Patient
        </button>
      </div>
    )}
  </div>
)}
      {/* INPUT */}

      <div
        style={{
          display: "flex",
          padding: "15px",
          gap: "10px",
          borderTop: "1px solid #eee",
        }}
      >
        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Type message..."
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}