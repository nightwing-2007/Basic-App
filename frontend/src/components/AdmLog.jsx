import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';

export default function AdmLog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userid: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await fetch("http://localhost:5000/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log(data);

        if (data.status === 200) {
          localStorage.setItem("user", JSON.stringify(data.user));

          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 1500);
        }

        toast(`${data.message}`);
      } catch (err) {
        toast("Something went wrong!");
      }
    }
  };

  return (
    <>
      <div
        style={{
          width: "97.3%",
          minHeight: "92.4vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f2f4f7",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "380px",
            background: "#fff",
            padding: "35px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              fontSize: "26px",
              color: "#222",
              letterSpacing: "1px",
              fontWeight: "600",
            }}
          >
            Welcome Admin
          </h2>

          <form onSubmit={handleSubmit}>
            {/* USER ID */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  fontSize: "15px",
                  color: "#333",
                  fontWeight: "500",
                }}
              >
                User ID:
              </label>
              <input
                type="text"
                name="userid"
                value={formData.userid}
                onChange={handleChange}
                placeholder="Enter your user ID"
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outline: "none",
                  fontSize: "14px",
                  transition: "0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />
              {errors.userid && (
                <p style={{ color: "red", marginTop: "5px", fontSize: "13px" }}>
                  {errors.userid}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  fontSize: "15px",
                  color: "#333",
                  fontWeight: "500",
                }}
              >
                Password:
              </label>
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
                  outline: "none",
                  fontSize: "14px",
                  transition: "0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />
              {errors.password && (
                <p style={{ color: "red", marginTop: "5px", fontSize: "13px" }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.2s",
              }}
              onMouseOver={(e) =>
                (e.target.style.background = "#0056d6")
              }
              onMouseOut={(e) =>
                (e.target.style.background = "#007bff")
              }
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
