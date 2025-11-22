import React, { useState } from "react";
import axios from "axios";
//import Header from "../components/Header";
//import Footer from "../components/Footer";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMessage = async () => {
    try {
      await axios.post("http://localhost:5000/contact", formData);
      alert("Message sent!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      alert("Error sending message");
    }
  };

  return (
    <>
      

      <div style={{ padding: "40px 0", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "85%",
            background: "#fff",
            borderRadius: "10px",
            padding: "30px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "5px" }}>Contact Us</h2>
          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            Any question or remarks? Just write us a message!
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              border: "3px solid #2C89C8",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {/* LEFT BOX */}
            <div
              style={{
                background: "#8F9AA2",
                padding: "30px",
                color: "white",
              }}
            >
              <h3 style={{ fontWeight: "bold" }}>Contact Information</h3>
              <p style={{ marginBottom: "20px" }}>Say something to start a live chat!</p>

              <p style={{ marginBottom: "15px" }}>
                📞 +1012 3456 789
              </p>

              <p style={{ marginBottom: "15px" }}>
                ✉️ demo@gmail.com
              </p>

              <p>📍 123, Sri Lanka</p>
            </div>

            {/* RIGHT BOX */}
            <div style={{ padding: "30px" }}>
              <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                <div style={{ width: "100%" }}>
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div style={{ width: "100%" }}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                <div style={{ width: "100%" }}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div style={{ width: "100%" }}>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, height: "80px" }}
                />
              </div>

              <button
                onClick={sendMessage}
                style={{
                  background: "#8F9AA2",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
}

// Input styles shared by all inputs
const inputStyle = {
  width: "100%",
  padding: "8px",
  border: "none",
  borderBottom: "1px solid #ccc",
  outline: "none",
  marginTop: "5px",
  background: "transparent",
};
