import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';

export const MainPage = () => {

  // ---------------- Inline CSS Styles ----------------
  const styles = {
    pageContainer: {
      padding: "30px",
      backgroundColor: "#f4f7fb",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },

    heading: {
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "2.4rem",
      fontWeight: "700",
      color: "#222",
    },

    gridStyle: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "25px",
      padding: "10px 20px",
    },

    cardStyle: {
      background: "#fff",
      padding: "18px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },

    cardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    },

    btn: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "10px",
    },

    btnHover: {
      backgroundColor: "#0056b3",
      transform: "scale(1.02)"
    }
  };

  // ----------------------------------------------------

  const [Items, setItems] = useState([]);
  const [hoverCard, setHoverCard] = useState(null);
  const [hoverBtn, setHoverBtn] = useState(null);

  // Load all products
  const loadItems = async () => {
    const res = await fetch("http://localhost:5000/admin/add-new-products");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  // // Mock add to cart (you can connect backend later)
  // const addToCart = (product) => {
  //   let cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   cart.push(product);
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   alert(product.name + " added to cart!");
  // };

  return (
    <div style={styles.pageContainer}>
      
      <h1 style={styles.heading}>Most Trending Products</h1>

      <div style={styles.gridStyle}>
        {Items.map((p, index) => (
          <div
            key={p._id}
            style={{
              ...styles.cardStyle,
              ...(hoverCard === index ? styles.cardHover : {})
            }}
            onMouseEnter={() => setHoverCard(index)}
            onMouseLeave={() => setHoverCard(null)}
          >
            <h2 style={{ color: "#444", fontSize: "1.2rem", marginBottom: "12px" }}>
              {p.category}
            </h2>

            <img
              src={p.image}
              alt={p.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            />

            <p><strong>Name:</strong> {p.name}</p>
            <p><strong>Price:</strong> ₹{p.price}</p>
            <p><strong>Description:</strong> {p.desc}</p>

            {/* <button
              onClick={() => addToCart(p)}
              style={{
                ...styles.btn,
                ...(hoverBtn === index ? styles.btnHover : {})
              }}
              onMouseEnter={() => setHoverBtn(index)}
              onMouseLeave={() => setHoverBtn(null)}
            >
              Add to Cart
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};
