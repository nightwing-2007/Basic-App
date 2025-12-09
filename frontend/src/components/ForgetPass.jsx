import React, { useState } from "react";
import { useNavigate } from "react-router";

import { ToastContainer, toast } from "react-toastify";

export default function OtpSystem() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ---------- INLINE CSS STYLES ----------
  const styles = {
    container: {
      width: "100%",
      minHeight: "75.5vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f4f6f9",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      width: "380px",
      padding: "30px",
      background: "#fff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      borderRadius: "12px",
      textAlign: "center",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "20px",
      fontWeight: "600",
      color: "#222",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "15px",
    },
    inputError: {
      border: "1px solid red",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "10px",
      background: "#007bff",
      color: "#fff",
      fontSize: "16px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "0.3s",
    },
    skipBtn: {
      marginTop: "10px",
      color: "#007bff",
      cursor: "pointer",
      textDecoration: "underline",
    },
    errorText: {
      color: "red",
      fontSize: "14px",
      marginTop: "-5px",
    },
  };
  // ---------------------------------------

  const sendOtp = async () => {
    const res = await fetch("http://localhost:5000/user/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    toast(data.message);

    if (data.success) {
      setStep(2);
    }
  };

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5000/user/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    toast(data.message);

    if (data.success) {
      setFormData((prev) => ({ ...prev, email }));
      setStep(3);

      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      toast("Invalid OTP");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await fetch("http://localhost:5000/changepass", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await res.json();
        toast(result.message);

        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(result.user));

          setTimeout(() => {
            navigate(`/user/${data.user.email}/dashboard`);
          }, 1500);
        }
      } catch (err) {
        toast("Error updating data");
      }
    }
  };

  const skip = () => {
    navigate(`/user/${formData.email}/dashboard`);
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Step 1 */}
          {step === 1 && (
            <>
              <h2 style={styles.heading}>OTP Verification</h2>

              <input
                type="email"
                placeholder="Enter Email"
                style={styles.input}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button style={styles.button} onClick={sendOtp}>
                Send OTP
              </button>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <h2 style={styles.heading}>Verify OTP</h2>

              <input
                type="text"
                placeholder="Enter OTP"
                style={styles.input}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button style={styles.button} onClick={verifyOtp}>
                Verify OTP
              </button>
            </>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <>
              <h2 style={styles.heading}>Set New Password</h2>

              <form onSubmit={handleSubmit}>
                <h3>User: {formData.email}</h3>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter New Password"
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {}),
                  }}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p style={styles.errorText}>{errors.password}</p>
                )}

                <p style={styles.skipBtn} onClick={skip}>
                  Skip
                </p>

                <button type="submit" style={styles.button}>
                  Confirm
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
