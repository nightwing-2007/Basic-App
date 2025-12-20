import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const Cart = () => {
  const navigate = useNavigate();

  // Get user details
  const user = JSON.parse(localStorage.getItem("user"));
  const cartKey = `cart_${user.email}`;

  const [cart, setCart] = useState([]);

  // Load cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(storedCart);
  }, []);

  // Update quantity
  const updateQty = (id, change) => {
    let updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item._id === id);

    updatedCart[index].qty += change;

    if (updatedCart[index].qty <= 0) {
      updatedCart.splice(index, 1);
    }

    setCart(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
  };

  // Calculate total
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // Save total
  localStorage.setItem("total", totalAmount);

  // Checkout
  const handleCheckout = () => {
    navigate(`/user/checkout`);
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        minHeight: "fit-content",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        flexGrow: "1"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "32px",
          color: "#333",
        }}
      >
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <h3
          style={{
            textAlign: "center",
            color: "#777",
            marginTop: "50px",
            fontSize: "22px",
          }}
        >
          No items in cart
        </h3>
      ) : (
        cart.map((p, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "20px",
              marginBottom: "20px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={p.image}
              width="150"
              alt={p.name}
              style={{
                borderRadius: "10px",
                objectFit: "cover",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            />

            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: "22px", marginBottom: "8px" }}>
                {p.category}
              </h2>

              <p style={{ fontSize: "18px" }}>
                <strong>{p.name}</strong>
              </p>

              <p
                style={{
                  fontSize: "18px",
                  color: "#1a7f37",
                  fontWeight: "bold",
                }}
              >
                ₹{p.price} × {p.qty} = ₹{p.price * p.qty}
              </p>

              <p style={{ marginTop: "10px", color: "#555" }}>{p.desc}</p>

              {/* Quantity Controls */}
              <div style={qtyContainer}>
                <button
                  style={qtyBtn}
                  onClick={() => updateQty(p._id, -1)}
                >
                  −
                </button>

                <span style={qtyText}>{p.qty}</span>

                <button
                  style={qtyBtn}
                  onClick={() => updateQty(p._id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <h3
        style={{
          textAlign: "right",
          marginTop: "20px",
          fontSize: "24px",
        }}
      >
        Total:{" "}
        <span style={{ color: "#1a7f37", fontWeight: "bold" }}>
          ₹{totalAmount}
        </span>
      </h3>

      {/* Checkout Button */}
      {cart.length > 0 && (
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <button
            onClick={handleCheckout}
            style={{
              backgroundColor: "#007bff",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

/* ---------- STYLES ---------- */

const qtyContainer = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginTop: "12px",
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
