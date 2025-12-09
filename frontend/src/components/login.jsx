import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await fetch("http://localhost:5000/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.status == 200) {
          localStorage.setItem("user", JSON.stringify(data.user));

          setTimeout(() => {
            navigate(`/user/${data.user.email}/dashboard`);
          }, 1500);
        }

        toast(data.message);
      } catch { }
    }
  };

  return (
    <>
      <div
        style={{
          height: "75.5vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f7fa",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "380px",
            padding: "35px",
            borderRadius: "12px",
            background: "white",
            boxShadow: "0 4px 18px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Welcome User
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ fontWeight: "600", color: "#444" }}>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "15px",
                }}
              />
              {errors.email && (
                <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ fontWeight: "600", color: "#444" }}>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "15px",
                }}
              />
              {errors.password && (
                <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                  {errors.password}
                </p>
              )}
            </div>

            <NavLink to="/user/forget-password">
              <p
                style={{
                  fontSize: "14px",
                  textAlign: "right",
                  cursor: "pointer",
                  color: "#007bff",
                  marginBottom: "15px",
                }}
              >
                Forget Password?
              </p>
            </NavLink>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#007bff",
                border: "none",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#0056b3")}
              onMouseOut={(e) => (e.target.style.background = "#007bff")}
            >
              Submit
            </button>
          </form>

          <ToastContainer />
        </div>
      </div>
    </>
  );
}
