import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isVerifying, setIsVerifying] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
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
        setIsVerifying(true);

        const res = await fetch(
          "https://cd2lkmcw-5000.inc1.devtunnels.ms/user/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        const data = await res.json();

        toast(data.message);

        if (data.status === 200) {
          localStorage.setItem("user", JSON.stringify(data.user));

          setTimeout(() => {
            navigate("/user/dashboard");
          }, 750);
        }
      } catch (error) {
        toast("Something went wrong");
      } finally {
        setIsVerifying(false);
      }
    }
  };

  return (
    <>
      <div
        style={{
          flexGrow: "1",
          height: "70vh",
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
              <label style={{ fontWeight: "600", color: "#444" }}>
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                style={{
                  width: "93%",
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
              <label style={{ fontWeight: "600", color: "#444" }}>
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={{
                  width: "93%",
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isVerifying}
              style={{
                width: "100%",
                padding: "12px",
                background: isVerifying ? "#999" : "#007bff",
                border: "none",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "8px",
                cursor: isVerifying ? "not-allowed" : "pointer",
                transition: "0.3s",
              }}
            >
              {isVerifying ? "Verifying..." : "Submit"}
            </button>

            {/* Verifying Text */}
            {isVerifying && (
              <p
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  color: "#555",
                  fontSize: "14px",
                }}
              >
                Verifying your credentials with our server...
              </p>
            )}

            <p
              style={{
                fontSize: "14px",
                textAlign: "center",
                marginTop: "15px",
              }}
            >
              Don't have an account?{" "}
              <NavLink style={{ color: "#007bff" }} to="/user/signup">
                Signup
              </NavLink>
            </p>
          </form>

          <ToastContainer />
        </div>
      </div>
    </>
  );
}
