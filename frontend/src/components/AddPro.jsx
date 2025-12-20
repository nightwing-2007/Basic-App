import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddPro = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const options = ["Phone", "TV", "Watch", "Shoe"];

  const [formData, setFormData] = useState({
    category: "",
    name: "",
    image: "",
    price: "",
    desc: "",
    stock: ""
  });

  const handleCategory = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFormData({ ...formData, image: e.target.files[0].name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://cd2lkmcw-5000.inc1.devtunnels.ms/admin/add-new-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const d = await res.json();
      toast(d.message);

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  // Inline styles
  const styles = {
    formContainer: {
      maxWidth: "500px",
      margin: "40px auto",
      padding: "30px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      backgroundColor: "#f9f9f9",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333"
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "15px"
    },
    label: {
      marginBottom: "5px",
      fontWeight: "600",
      color: "#555"
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "14px"
    },
    select: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "14px",
      backgroundColor: "#fff"
    },
    fileInput: {
      padding: "5px"
    },
    button: {
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "16px",
      transition: "0.3s"
    },
    buttonHover: {
      backgroundColor: "#0056b3"
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <h2 style={styles.heading}>Upload a Product</h2>

        {/* CATEGORY */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Product Category</label>
          <select
            name='category'
            value={formData.category}
            onChange={handleCategory}
            required
            style={styles.select}
          >
            <option value="" disabled>-- Select an option --</option>
            {options.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* IMAGE */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Upload Image</label>
          <input
            type="file"
            name='image'
            onChange={handleFile}
            required
            style={styles.fileInput}
          />
        </div>

        {/* NAME */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChanges}
            required
            style={styles.input}
          />
        </div>

        {/* PRICE */}
        <div style={styles.formGroup}>
          <label style={styles.label}>List Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChanges}
            required
            style={styles.input}
          />
        </div>

        {/* DESCRIPTION */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <input
            type="text"
            name="desc"
            placeholder="Enter description"
            value={formData.desc}
            onChange={handleChanges}
            required
            style={styles.input}
          />
        </div>

        {/* STOCK */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Stock</label>
          <input
            type="number"
            name="stock"
            placeholder="Enter stock"
            value={formData.stock}
            onChange={handleChanges}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Add Product</button>
      </form>
      <ToastContainer />
    </>
  );
};
