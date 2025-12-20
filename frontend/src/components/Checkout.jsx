import { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout() {
  const navigate = useNavigate();

  // Fetch user
  const user = JSON.parse(localStorage.getItem("user"));
  const cartKey = `cart_${user.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  // Address
  const [address, setAddress] = useState("");

  // Calculate total properly
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // Place Order
  const placeOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter delivery address");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      email: user.email,
      name: `${user.fname} ${user.lname}`,
      address,
      items: cart,
      total,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch(
        "https://cd2lkmcw-5000.inc1.devtunnels.ms/order/place-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        toast.success(data.message || "Order placed successfully");

        // Clear cart
        localStorage.removeItem(cartKey);

        setTimeout(() => {
          navigate("/user/cart");
        }, 3000);
      } else {
        toast.error(data.message || "Order failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
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
          <h2 style={{ fontSize: "20px", color: "#444" }}>
            Customer Details
          </h2>

          <p><b>Name:</b> {user.fname} {user.lname}</p>
          <p><b>Email:</b> {user.email}</p>
        </div>

        {/* ADDRESS */}
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "20px", color: "#444" }}>
            Delivery Address
          </h2>

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
            }}
          />
        </div>

        {/* ITEMS */}
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "20px", color: "#444" }}>
            Ordered Items
          </h2>

          {cart.length === 0 ? (
            <p style={{ color: "#777" }}>No items found</p>
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
                <h3 style={{ margin: "0 0 5px 0" }}>
                  {item.name}
                </h3>

                <p style={{ margin: "5px 0", color: "#666" }}>
                  {item.desc}
                </p>

                <p style={{ fontWeight: "bold" }}>
                  ₹{item.price} × {item.qty} = ₹
                  {item.price * item.qty}
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
            marginBottom: "30px",
          }}
        >
          Total Amount:{" "}
          <span style={{ color: "#e63946" }}>
            ₹{total}
          </span>
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
          }}
        >
          Place Order
        </button>
      </div>

      <ToastContainer />
    </>
  );
}
