import { useState } from "react";
import { useNavigate, NavLink } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    place: ""
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

    // simple validations
    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.phone.length < 10) {
      newErrors.phone = "Phone must be at least 10 digits";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await fetch("https://cd2lkmcw-5000.inc1.devtunnels.ms/user/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const d = await res.json();
        toast(d.message);
      } catch (err) {
        toast("Signup failed. Please try again.");
      }
      setTimeout(() => {
        navigate("/user/login");
      }, 1500);
    }
  };

  // Inline CSS styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "fit-content",
    backgroundColor: "#f5f5f5",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    flexGrow: "1"
  };

  const formStyle = {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "450px",
    marginTop: "2%",
    marginBottom: "2%"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "8px 0 15px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontWeight: "600",
    marginBottom: "5px",
    display: "block",
    color: "#333",
  };

  const errorTextStyle = {
    color: "red",
    fontSize: "14px",
    marginTop: "-10px",
    marginBottom: "10px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };

  return (
    <div style={containerStyle}>
      <form
        onSubmit={handleSubmit}
        style={formStyle}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Register</h2>

        {/* First Name */}
        <div>
          <label style={labelStyle}>First Name:</label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="Enter your first name"
            style={inputStyle}
          />
          {errors.fname && <p style={errorTextStyle}>{errors.fname}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label style={labelStyle}>Last Name:</label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Enter your last name"
            style={inputStyle}
          />
          {errors.lname && <p style={errorTextStyle}>{errors.lname}</p>}
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={inputStyle}
          />
          {errors.email && <p style={errorTextStyle}>{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label style={labelStyle}>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone"
            style={inputStyle}
          />
          {errors.phone && <p style={errorTextStyle}>{errors.phone}</p>}
        </div>

        {/* Password */}
        <div>
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            style={inputStyle}
          />
          {errors.password && <p style={errorTextStyle}>{errors.password}</p>}
        </div>

        {/* Place */}
        <div>
          <label style={labelStyle}>Place:</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder="Enter your place"
            style={inputStyle}
          />
          {errors.place && <p style={errorTextStyle}>{errors.place}</p>}
        </div>

        <button type="submit" style={buttonStyle}>
          Submit
        </button>
        <p
                style={{
                  fontSize: "14px",
                  textAlign: "center",
                  
                  
                  marginTop: "15px",
                }}
              >
                Already have an account ? <NavLink style={{cursor: "pointer", color: "#007bff"}} to="/user/login">
                Login
                </NavLink>
              </p>
      </form>
      <ToastContainer />
    </div>
  );
}
