import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Dashboard = () => {
  const navigate = useNavigate();

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

  // Load cart
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

  // Add / Remove from Cart
  const updateCart = (product, change) => {
    const stock = product.stock ?? Infinity;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const index = cart.findIndex((i) => i._id === product._id);

    if (change === 1) {
      const currentQty = quantities[product._id] || 0;
      if (currentQty >= stock) {
        toast.error("Stock limit reached");
        return;
      }
    }

    if (index !== -1) {
      cart[index].qty += change;
      if (cart[index].qty <= 0) cart.splice(index, 1);
    } else {
      cart.push({ ...product, qty: 1 });
      toast.success("Product added to cart");
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    loadCart();
  };

  // BUY NOW
  const buyNow = (product) => {
    const stock = product.stock ?? Infinity;

    if (stock <= 0) {
      toast.error("Out of stock");
      return;
    }

    const buyNowCart = [{ ...product, qty: 1 }];
    localStorage.setItem(cartKey, JSON.stringify(buyNowCart));

    navigate("/user/checkout");
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1 style={heading}>Most Trending Products</h1>

        <div style={gridStyle}>
          {items.map((p) => {
            const stock = p.stock ?? Infinity;
            const currentQty = quantities[p._id] || 0;

            return (
              <div key={p._id} style={cardStyle}>
                <img src={p.image} alt={p.name} style={imageStyle} />

                <h3>{p.name}</h3>
                <p>₹{p.price}</p>
                <p style={{ fontSize: "14px" }}>{p.desc}</p>
                <p style={{ fontSize: "13px" }}>Stock: {stock}</p>

                {currentQty ? (
                  <div style={qtyContainer}>
                    <button style={qtyBtn} onClick={() => updateCart(p, -1)}>
                      −
                    </button>
                    <span style={qtyText}>{currentQty}</span>
                    <button
                      style={qtyBtn}
                      disabled={currentQty >= stock}
                      onClick={() => updateCart(p, 1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button
                      style={{ ...addBtn, flex: 1 }}
                      disabled={stock === 0}
                      onClick={() => updateCart(p, 1)}
                    >
                      Add to Cart
                    </button>

                    <button
                      style={{
                        ...addBtn,
                        flex: 1,
                        backgroundColor: "#ff9800",
                      }}
                      disabled={stock === 0}
                      onClick={() => buyNow(p)}
                    >
                      Buy Now
                    </button>
                  </div>
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

/* ================= STYLES ================= */

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
  padding: "10px",
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
