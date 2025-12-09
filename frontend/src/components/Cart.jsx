import React from "react";
import { useNavigate } from "react-router";

//import "./.css"

export const Cart = () => {
  const navigate = useNavigate();

  // Get user details from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  // Get user-specific cart key
  const cartKey = `cart_${user.email}`;

  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  // Calculating total
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  // Save total to local storage
  localStorage.setItem("total", totalAmount);

  // Checkout Function
  const handleCheckout = () => {
    navigate(`/user/${user.email}/checkout`);
  };

  return (
    <>
      <div
        style={{
          padding: "40px 20px",
          minHeight: "71.4vh",
          maxWidth: "900px",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
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
                <h2
                  style={{
                    fontSize: "22px",
                    marginBottom: "8px",
                    color: "#444",
                  }}
                >
                  {p.category}
                </h2>

                <p style={{ margin: "5px 0", fontSize: "18px" }}>
                  <strong>Name:</strong> {p.name}
                </p>

                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "18px",
                    color: "#1a7f37",
                    fontWeight: "bold",
                  }}
                >
                  Price: ₹{p.price}
                </p>

                <p style={{ marginTop: "10px", color: "#555" }}>{p.desc}</p>
              </div>
            </div>
          ))
        )}

        <h3
          style={{
            textAlign: "right",
            marginTop: "20px",
            fontSize: "24px",
            color: "#222",
          }}
        >
          Total:{" "}
          <span style={{ color: "#1a7f37", fontWeight: "bold" }}>
            ₹{totalAmount}
          </span>
        </h3>

        {/* Checkout button */}
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
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#007bff")
            }
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};
