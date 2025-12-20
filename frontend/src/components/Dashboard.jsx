import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const cartKey = `cart_${user.email}`;

  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Load products
  const loadItems = async () => {
    const res = await fetch(
      "https://cd2lkmcw-5000.inc1.devtunnels.ms/admin/add-new-products"
    );
    const data = await res.json();
    setItems(data);
  };

  // Load cart quantities
  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const qtyMap = {};
    cart.forEach((item) => {
      qtyMap[item._id] = item.qty;
    });
    setQuantities(qtyMap);
  };

  useEffect(() => {
    loadItems();
    loadCart();
  }, []);

  // Update Cart with STOCK CHECK
  const updateCart = (product, change) => {
    const stock = product.stock ?? product.quantity ?? Infinity;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const index = cart.findIndex((i) => i._id === product._id);

    // INCREASE
    if (change === 1) {
      const currentQty = quantities[product._id] || 0;

      if (currentQty >= stock) {
        toast.error("Stock limit reached");
        return;
      }
    }

    if (index !== -1) {
      cart[index].qty += change;

      if (cart[index].qty <= 0) {
        cart.splice(index, 1);
      }
    } else {
      cart.push({ ...product, qty: 1 });
      toast.success("Product added to cart");
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    loadCart();
  };

  return (
    <>
      <div style={{ padding: "20px", flexGrow: "1" }}>
        <h1 style={heading}>Most Trending Products</h1>

        <div style={gridStyle}>
          {items.map((p) => {
            const stock = p.stock ?? p.quantity ?? Infinity;
            const currentQty = quantities[p._id] || 0;

            return (
              <div key={p._id} style={cardStyle}>
                <h3>{p.category}</h3>

                <img src={p.image} alt={p.name} style={imageStyle} />

                <p><b>{p.name}</b></p>
                <p>₹{p.price}</p>

                <p style={{ fontSize: "14px" }}>{p.desc}</p>

                {/* STOCK INFO */}
                <p style={{ fontSize: "13px", color: "#666", textAlign: "left" }}>
                  Stock Available: {stock}
                </p>

                {currentQty ? (
                  <div style={qtyContainer}>
                    <button
                      style={qtyBtn}
                      onClick={() => updateCart(p, -1)}
                    >
                      −
                    </button>

                    <span style={qtyText}>{currentQty}</span>

                    <button
                      style={{
                        ...qtyBtn,
                        backgroundColor:
                          currentQty >= stock ? "#aaa" : "#007bff",
                        cursor:
                          currentQty >= stock ? "not-allowed" : "pointer",
                      }}
                      disabled={currentQty >= stock}
                      onClick={() => updateCart(p, 1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    style={addBtn}
                    disabled={stock === 0}
                    onClick={() => updateCart(p, 1)}
                  >
                    {stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

/* ---------------- STYLES ---------------- */

const heading = {
  textAlign: "center",
  marginBottom: "25px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#fff",
  padding: "15px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const imageStyle = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "8px",
};

const addBtn = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  backgroundColor: "#28a745",
  border: "none",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};

const qtyContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  marginTop: "10px",
};

const qtyBtn = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "#007bff",
  color: "white",
  fontSize: "20px",
  cursor: "pointer",
};

const qtyText = {
  fontSize: "18px",
  fontWeight: "bold",
};
