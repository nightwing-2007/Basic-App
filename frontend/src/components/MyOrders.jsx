import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyOrders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `https://cd2lkmcw-5000.inc1.devtunnels.ms/user/my-orders?email=${user.email}`
      );

      const data = await res.json();

      if (res.status === 200) {
        setOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to load orders");
      }
    } catch (error) {
      toast.error("Server error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#16a34a";
      case "Shipped":
        return "#2563eb";
      case "Packed":
        return "#ca8a04";
      case "Cancelled":
        return "#dc2626";
      default:
        return "#0d9488"; // Order Confirmed
    }
  };

  return (
    <>
      <div style={styles.page}>
        <h1 style={styles.heading}>My Orders</h1>

        {loading ? (
          <h2 style={styles.center}>Loading...</h2>
        ) : orders.length === 0 ? (
          <h2 style={styles.center}>No orders found</h2>
        ) : (
          orders.map((order) => (
            <div key={order._id} style={styles.card}>
              
              {/* ================= HEADER ================= */}
              <div style={styles.header}>
                <div>
                  <p>
                    <b>Order ID:</b>{" "}
                    <span style={{ letterSpacing: "0.5px" }}>
                      {order.orderId}
                    </span>
                  </p>

                  <p>
                    <b>Placed On:</b>{" "}
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

                <span
                  style={{
                    ...styles.status,
                    backgroundColor: getStatusColor(order.status),
                  }}
                >
                  {order.status}
                </span>
              </div>

              <hr />

              {/* ================= ADDRESS ================= */}
              <p><b>Delivery Address</b></p>
              <p style={{ color: "#555", lineHeight: "1.5" }}>
                {order.address}
              </p>

              <hr />

              {/* ================= ITEMS ================= */}
              <h3 style={{ marginBottom: "10px" }}>Items</h3>
              {order.items.map((item, i) => (
                <div key={i} style={styles.itemRow}>
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}

              <hr />

              {/* ================= FOOTER ================= */}
              <div style={styles.footer}>
                <div>
                  <p>
                    <b>Payment Method:</b>{" "}
                    {order.paymentMethod}
                  </p>

                  <p>
                    <b>Estimated Delivery:</b>{" "}
                    {new Date(order.estimatedDelivery)
                      .toLocaleDateString("en-IN")}
                  </p>
                </div>

                <h2 style={styles.total}>₹{order.total}</h2>
              </div>
            </div>
          ))
        )}
      </div>

      <ToastContainer />
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "30px",
    backgroundColor: "#f3f4f6",
    fontFamily: "Arial, sans-serif",
    minHeight: "fit-content",
    flexGrow: "1"
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "30px",
    color: "#111",
  },
  center: {
    textAlign: "center",
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    padding: "22px",
    borderRadius: "14px",
    marginBottom: "25px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    border: "1px solid #eee",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "10px",
  },
  status: {
    padding: "6px 16px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px dashed #ddd",
    color: "#444",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
    flexWrap: "wrap",
    gap: "10px",
  },
  total: {
    color: "#e63946",
    fontSize: "22px",
  },
};
