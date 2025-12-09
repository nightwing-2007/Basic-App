import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';

export const Dashboard = () => {

  const data1 = localStorage.getItem('user');
  const data = JSON.parse(data1);

  const [Items, setItems] = useState([]);

  const loadItems = async () => {
    const res = await fetch("http://localhost:5000/admin/add-new-products");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
  };

  // Add To Cart
  const addToCart = (product) => {
    const cartKey = `cart_${data.email}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    cart.push(product);
    localStorage.setItem(cartKey, JSON.stringify(cart));

    toast("Product added to cart!");
  };

  return (
    <>
      

      {/* Products Section */}
      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#222" }}>
          Most Trending Products
        </h1>

        <div style={gridStyle}>

          {Items.map(p => (
            <div key={p._id} style={cardStyle}>

              <h2 style={{ color: "#444" }}>{p.category}</h2>

              <img 
                src={p.image} 
                width="200" 
                alt={p.name}
                style={{
                  borderRadius: "10px",
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  marginBottom: "10px"
                }}
              />

              <p><strong>Name:</strong> {p.name}</p>
              <p><strong>Price:</strong> ₹{p.price}</p>
              <p style={{ marginBottom: "14px" }}><strong>Description:</strong> {p.desc}</p>

              <button 
                onClick={() => addToCart(p)} 
                style={addToCartBtn}
              >
                Add to Cart
              </button>

            </div>
          ))}

        </div>
      </div>

      <ToastContainer />
    </>
  );
};



// ----------------------
// Inline Styles
// ----------------------
const buttonStyle = {
  padding: "10px 20px",
  marginRight: "15px",
  backgroundColor: "#007bff",
  border: "none",
  color: "white",
  fontSize: "16px",
  borderRadius: "6px",
  cursor: "pointer",
};

const logoutButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#dc3545"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  padding: "10px",
};

const cardStyle = {
  background: "white",
  padding: "15px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textAlign: "center",
  transition: "0.3s",
};

const addToCartBtn = {
  padding: "10px 18px",
  backgroundColor: "#28a745",
  border: "none",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "15px",
  marginTop: "10px"
};
