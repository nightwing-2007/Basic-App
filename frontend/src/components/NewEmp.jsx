import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

export const NewEmp = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    eduqual: "",
    expr: "",
    adrs: ""
  });

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFormData({ ...formData, image: e.target.files[0].name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/admin/add-new-employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const d = await res.json();
      toast(d.message);

      setTimeout(() => {
        navigate("/admin/employee");
      }, 3000);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#f4f6f9",
          padding: "20px"
        }}
      >

        <form
          onSubmit={handleSubmit}
          style={{
            width: "400px",
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              color: "#333",
              fontWeight: "600"
            }}
          >
            Add New Employee
          </h2>

          {/* IMAGE */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "500" }}>Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFile}
              required
              style={{
                width: "100%",
                marginTop: "6px",
              }}
            />
          </div>

          {/* NAME */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "500" }}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChanges}
              required
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none"
              }}
            />
          </div>

          {/* EDUCATION */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "500" }}>Educational Qualification</label>
            <input
              type="text"
              name="eduqual"
              placeholder="Enter education"
              value={formData.eduqual}
              onChange={handleChanges}
              required
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none"
              }}
            />
          </div>

          {/* EXPERIENCE */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "500" }}>Experience (if any)</label>
            <input
              type="text"
              name="expr"
              placeholder="Enter job experience"
              value={formData.expr}
              onChange={handleChanges}
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none"
              }}
            />
          </div>

          {/* ADDRESS */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "500" }}>Address</label>
            <input
              type="text"
              name="adrs"
              placeholder="Enter address"
              value={formData.adrs}
              onChange={handleChanges}
              required
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none"
              }}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s"
            }}
            onMouseOver={(e) => e.target.style.background = "#0069d9"}
            onMouseOut={(e) => e.target.style.background = "#007bff"}
          >
            Add Employee
          </button>
        </form>
      </div>

      <ToastContainer />
    </>
  );
};
