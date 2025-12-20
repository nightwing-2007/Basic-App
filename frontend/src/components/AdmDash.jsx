import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';

export const AdmDash = () => {
  const [Items, setItems] = useState([]);

  const loadItems = async () => {
    const res = await fetch("https://cd2lkmcw-5000.inc1.devtunnels.ms/admin/add-new-products");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  // const logout = () => {
  //   localStorage.removeItem("user");
  // };

  return (
    <>
      {/* TOP SECTION */}
      <div 
        style={{
          padding: "20px",
          background: "#ffffff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          margin: "20px",
        }}
      >
        <h2 
          style={{ 
            marginBottom: "20px", 
            color: "#333",
            textAlign: "center",
            fontFamily: "Poppins, sans-serif"
          }}
        >
          Welcome Admin
        </h2>

        {/* BUTTON SECTION */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <NavLink to='/admin/add-new-products'>
            <input 
              type="button" 
              value="Add New Products" 
              style={{
                padding: "10px 20px",
                background: "#007bff",
                border: "none",
                color: "#fff",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                fontFamily: "Poppins",
                transition: "0.3s",
              }}
              onMouseOver={e => e.target.style.background="#0056b3"}
              onMouseOut={e => e.target.style.background="#007bff"}
            />
          </NavLink>

          <NavLink to='/admin/employee'>
            <input 
              type="button" 
              value="Employee" 
              style={{
                padding: "10px 20px",
                background: "#28a745",
                border: "none",
                color: "#fff",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                fontFamily: "Poppins",
                transition: "0.3s",
              }}
              onMouseOver={e => e.target.style.background="#1e7e34"}
              onMouseOut={e => e.target.style.background="#28a745"}
            />
          </NavLink>

          <NavLink to='/admin/orders'>
            <input 
              type="button" 
              value="Orders" 
              style={{
                padding: "10px 20px",
                background: "#ffc107",
                border: "none",
                color: "#fff",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                fontFamily: "Poppins",
                transition: "0.3s",
              }}
              onMouseOver={e => e.target.style.background="#d39e00"}
              onMouseOut={e => e.target.style.background="#ffc107"}
            />
          </NavLink>

          <NavLink to='/'>
            <input 
              type="button" 
              value="Logout"
              // onClick={logout}
              style={{
                padding: "10px 20px",
                background: "#dc3545",
                border: "none",
                color: "#fff",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                fontFamily: "Poppins",
                transition: "0.3s",
              }}
              onMouseOver={e => e.target.style.background="#be1425ff"}
              onMouseOut={e => e.target.style.background="#dc3545"}
            />
          </NavLink>
        </div>
      </div>

      {/* PRODUCTS TABLE SECTION */}
      <div
        style={{
          margin: "20px",
          padding: "20px",
          background: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#333",
            fontFamily: "Poppins",
            textAlign: "center",
          }}
        >
          All Products
        </h2>

        <table 
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ background: "#f1f1f1", textAlign: "left" }}>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Product ID</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Category</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Name</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Description</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Price (₹)</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Stock</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Image</th>
            </tr>
          </thead>

          <tbody>
            {Items.length > 0 ? (
              Items.map((item, index) => (
                <tr 
                  key={index}
                  style={{ 
                    background: index % 2 === 0 ? "#fafafa" : "#fff",
                    transition: "0.2s",
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = "#e9ecef")}
                  onMouseOut={e => (e.currentTarget.style.background = index % 2 === 0 ? "#fafafa" : "#fff")}
                >
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item._id}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.category}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.name}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.desc}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.price}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.stock}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    <img
                      src={item.image}
                      alt="product"
                      width="50"
                      height="50"
                      style={{
                        objectFit: "cover",
                        borderRadius: "5px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan="7" 
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#777",
                    fontSize: "16px"
                  }}
                >
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
