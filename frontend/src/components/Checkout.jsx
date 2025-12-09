import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { ToastContainer, toast } from "react-toastify";

//import "./.css"

export default function Checkout() {
  const navigate = useNavigate();
  const { email } = useParams();

  // Fetch user details
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch total
  const total = localStorage.getItem("total");

  // Fetch cart of this user
  const cartKey = `cart_${email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  // Address state
  const [address, setAddress] = useState("");

  // Place Order Function
  const placeOrder = async () => {
    
      
    
    const orderData = {
      email: user.email,
      name: user.fname,
      address: address,
      items: cart,
      total: total,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/order/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 200){
        //alert(data.message);
        
        // Clear user's cart
      localStorage.removeItem(cartKey);
      }

      
      toast(data.message)
      

      //navigate(`/user/${email}/order-success`);
    } catch (err) {
      console.log(err);
      toast(data.message);
    }
  
  
  
  };

  return (
    <>
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "25px",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "25px",
          fontSize: "28px",
          color: "#222",
        }}
      >
        Checkout
      </h1>

      {/* USER DETAILS */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "20px", color: "#444" }}>Customer Details</h2>

        <p style={{ fontSize: "16px", margin: "5px 0" }}>
          <b>Name:</b> {user.fname} {user.lname}
        </p>

        <p style={{ fontSize: "16px", margin: "5px 0" }}>
          <b>Email:</b> {user.email}
        </p>
      </div>

      {/* ADDRESS */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "20px", color: "#444" }}>Delivery Address</h2>

        <input
          type="text"
          placeholder="Enter your full address here..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            marginTop: "10px",
            outline: "none",
            transition: "0.3s",
          }}
        />
      </div>

      {/* ITEMS */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "20px", color: "#444" }}>Ordered Items</h2>

        {cart.length === 0 ? (
          <p style={{ color: "#777", fontSize: "16px" }}>No items found</p>
        ) : (
          cart.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
                background: "#f9f9f9",
                border: "1px solid #eee",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "18px", color: "#333" }}>
                {item.name}
              </h3>
              <p style={{ margin: "5px 0", color: "#666" }}>{item.desc}</p>
              <p
                style={{
                  margin: "5px 0",
                  fontWeight: "bold",
                  color: "#222",
                }}
              >
                Price: ₹{item.price}
              </p>
            </div>
          ))
        )}
      </div>

      {/* TOTAL */}
      <h2
        style={{
          fontSize: "22px",
          textAlign: "right",
          color: "#222",
          marginBottom: "30px",
        }}
      >
        Total Amount: <span style={{ color: "#e63946" }}>₹{total}</span>
      </h2>

      <button
        onClick={placeOrder}
        style={{
          width: "100%",
          padding: "15px",
          fontSize: "18px",
          borderRadius: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        Place Order
      </button>
    </div>
    <ToastContainer />
    </>
  );
}
