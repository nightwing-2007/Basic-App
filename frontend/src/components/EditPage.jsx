import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    place: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setFormData(user);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (formData.phone.length < 10) newErrors.phone = "Minimum 10 digits";
    if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await fetch("https://cd2lkmcw-5000.inc1.devtunnels.ms/edit", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await res.json();

        if (res.status === 200) {
          toast(result.message);

          localStorage.setItem("user", JSON.stringify(result.user));

          setTimeout(() => {
            navigate(`/user/dashboard`);
          }, 1500);

        } else {
          toast(result.message);
        }
      } catch (err) {
        toast("Something went wrong");
      }
    }
  };

  // Inline Styles
  const styles = {
    container: {
      maxWidth: "450px",
      margin: "40px auto",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    label: {
      fontWeight: "bold",
      color: "#444",
      fontSize: "14px",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      marginTop: "5px",
      marginBottom: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
      outline: "none",
    },
    inputFocus: {
      borderColor: "#007bff",
    },
    error: {
      color: "red",
      fontSize: "12px",
      marginTop: "-5px",
      marginBottom: "10px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <>
      <div style={styles.container}>
        <h2 style={styles.title}>Edit Your Details</h2>

        <form onSubmit={handleSubmit}>
          <h4 style={{textAlign: "center", marginBottom: "15px"}}>User: {formData.email}</h4>

          {/* First Name */}
          <label style={styles.label}>First Name:</label>
          <input
            style={styles.input}
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
          />
          {errors.fname && <p style={styles.error}>{errors.fname}</p>}

          {/* Last Name */}
          <label style={styles.label}>Last Name:</label>
          <input
            style={styles.input}
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
          />
          {errors.lname && <p style={styles.error}>{errors.lname}</p>}

          {/* Phone */}
          <label style={styles.label}>Phone:</label>
          <input
            style={styles.input}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p style={styles.error}>{errors.phone}</p>}

          {/* Password */}
          <label style={styles.label}>Password:</label>
          <input
            style={styles.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <p style={styles.error}>{errors.password}</p>
          )}

          {/* Place */}
          <label style={styles.label}>Place:</label>
          <input
            style={styles.input}
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            required
          />

          <button style={styles.button} type="submit">
            Update
          </button>
        </form>
      </div>

      <ToastContainer />
    </>
  );
}
