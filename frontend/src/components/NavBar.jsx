import { NavLink } from "react-router";

// import './NV.css'

export default function Navbar() {
  return (
    <div
      style={{
        width: "97.39%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#1a1a1a",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {/* Company Name */}
      <div style={{ fontSize: "22px", fontWeight: "bold" }}>
        Shopping Cart
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "20px" }}>
        <a href="/" style={{ color: "white", textDecoration: "none", fontSize: "16px" }}>Home</a>
        <a href="/about" style={{ color: "white", textDecoration: "none", fontSize: "16px" }}>About</a>
        <a href="/products" style={{ color: "white", textDecoration: "none", fontSize: "16px" }}>Products</a>
        <a href="/contact" style={{ color: "white", textDecoration: "none", fontSize: "16px" }}>Contact</a>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px" }}>
        <NavLink to='/user/login'>
        <button
          style={{
            padding: "6px 14px",
            background: "white",
            color: "black",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
            borderRadius: "5px",
          }}
        >
          Login
        </button>
        </NavLink>
        
        <NavLink to='/user/signup'>
        <button
          style={{
            padding: "6px 14px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
            borderRadius: "5px",
          }}
        >
          Signup
        </button>
        </NavLink>
        
        <NavLink to='/admin/login'>
        <button
          style={{
            padding: "6px 14px",
            background: "#ff9800",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
            borderRadius: "5px",
          }}
        >
          Admin
        </button>
        </NavLink>
        
      </div>
    </div>
  );
}
