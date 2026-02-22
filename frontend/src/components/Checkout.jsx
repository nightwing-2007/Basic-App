import { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const cartKey = `cart_${user.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const [address, setAddress] = useState("");
  const [step, setStep] = useState(1);
  const [orderInfo, setOrderInfo] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

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
      status: "Order Confirmed",
      paymentMethod: "Cash on Delivery",
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
        localStorage.removeItem(cartKey);
        setOrderInfo({
          ...orderData,
          orderId: data.orderId || "ORD" + Date.now(),
        });
        setStep(2);
      } else {
        toast.error(data.message || "Order failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  /* ================= STEP 2 UI ================= */

  if (step === 2 && orderInfo) {
    return (
      <>
        <div style={styles.container}>
          <h1 style={styles.success}>✅ Order Placed Successfully</h1>

          <p><b>Order ID:</b> {orderInfo.orderId}</p>
          <p><b>Status:</b> <span style={{ color: "green" }}>{orderInfo.status}</span></p>
          <p><b>Payment Method:</b> {orderInfo.paymentMethod}</p>

          <hr />

          <h3>Delivery Address</h3>
          <p>{orderInfo.address}</p>

          <hr />

          <h3>Ordered Items</h3>
          {orderInfo.items.map((item, i) => (
            <div key={i} style={styles.item}>
              <p><b>{item.name}</b></p>
              <p>₹{item.price} × {item.qty}</p>
            </div>
          ))}

          <h2 style={styles.total}>Total Paid: ₹{orderInfo.total}</h2>

          <p><b>Estimated Delivery:</b> 3–5 Business Days</p>

          <div style={{ marginTop: "30px" }}>
            <button
              style={styles.btnPrimary}
              onClick={() => navigate("/user/dashboard")}
            >
              Continue Shopping
            </button>

            <button
              style={styles.btnSecondary}
              onClick={() => navigate("/user/my-orders")}
            >
              View My Orders
            </button>
          </div>
        </div>

        <ToastContainer />
      </>
    );
  }

  /* ================= STEP 1 UI ================= */

  return (
    <>
    <div className="mainn">
      <div style={styles.container}>
        <h1 style={styles.heading}>Checkout</h1>

        <h3>Customer Details</h3>
        <p><b>Name:</b> {user.fname} {user.lname}</p>
        <p><b>Email:</b> {user.email}</p>

        <h3>Delivery Address</h3>
        <input
          type="text"
          placeholder="Enter full address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={styles.input}
        />

        <h3>Order Summary</h3>
        {cart.map((item, i) => (
          <div key={i} style={styles.item}>
            <p>{item.name}</p>
            <p>₹{item.price} × {item.qty}</p>
          </div>
        ))}

        <h2 style={styles.total}>Total: ₹{total}</h2>

        <button style={styles.btnPrimary} onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
    <ToastContainer />
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  mainn: {
    
  },
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  success: {
    textAlign: "center",
    color: "#2d6a4f",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  },
  item: {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  total: {
    textAlign: "right",
    color: "#e63946",
    marginTop: "20px",
  },
  btnPrimary: {
    width: "100%",
    padding: "14px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  btnSecondary: {
    width: "100%",
    padding: "14px",
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
