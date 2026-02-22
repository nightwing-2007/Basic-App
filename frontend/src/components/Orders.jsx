import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "https://cd2lkmcw-5000.inc1.devtunnels.ms/admin/orders"
      );

      const data = await res.json();

      if (res.ok && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        toast.error("Invalid orders data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (orderId, status) => {
    if (!orderId) return;

    try {
      const res = await fetch(
        `https://cd2lkmcw-5000.inc1.devtunnels.ms/admin/update-order-status/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Status updated");
        fetchOrders();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <>
      <div style={styles.page}>
        <h1 style={styles.heading}>Orders</h1>

        {loading && <h2 style={styles.center}>Loading...</h2>}

        {!loading && orders.length === 0 && (
          <h2 style={styles.center}>No orders found</h2>
        )}

        {!loading &&
          orders.map((order, index) => (
            <div key={order.orderId || index} style={styles.card}>
              {/* HEADER */}
              <div style={styles.header}>
                <div>
                  <p><b>Order ID:</b> {order.orderId || "N/A"}</p>
                  <p>
                    <b>Placed On:</b>{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString("en-IN")
                      : "N/A"}
                  </p>
                  <p><b>Customer:</b> {order.name}</p>
                  <p><b>Email:</b> {order.email}</p>
                </div>

                <select
                  value={order.status || "Order Confirmed"}
                  onChange={(e) =>
                    updateStatus(order.orderId, e.target.value)
                  }
                  style={{
                    ...styles.statusSelect,
                    backgroundColor: getStatusColor(
                      order.status || "Order Confirmed"
                    ),
                  }}
                >
                  <option>Order Confirmed</option>
                  <option>Packed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <hr />

              {/* ADDRESS */}
              <p><b>Delivery Address:</b></p>
              <p style={{ color: "#555" }}>{order.address || "N/A"}</p>

              <hr />

              {/* ITEMS */}
              <h3>Items</h3>
              {Array.isArray(order.items) && order.items.length > 0 ? (
                order.items.map((item, i) => (
                  <div key={i} style={styles.itemRow}>
                    <span>
                      {item.name} × {item.qty || 1}
                    </span>
                    <span>₹{(item.price || 0) * (item.qty || 1)}</span>
                  </div>
                ))
              ) : (
                <p style={{ color: "#888" }}>No items</p>
              )}

              <hr />

              {/* FOOTER */}
              <div style={styles.footer}>
                <div>
                  <p><b>Payment:</b> {order.paymentMethod || "COD"}</p>
                  <p><b>Payment Status:</b> {order.paymentStatus || "Pending"}</p>
                  <p>
                    <b>Estimated Delivery:</b>{" "}
                    {order.estimatedDelivery
                      ? new Date(order.estimatedDelivery).toDateString()
                      : "N/A"}
                  </p>
                </div>

                <h2 style={styles.total}>₹{order.total || 0}</h2>
              </div>
            </div>
          ))}
      </div>

      <ToastContainer />
    </>
  );
}

/* ========= HELPERS ========= */

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
      return "#0f766e";
  }
};

/* ========= STYLES ========= */

const styles = {
  page: {
    padding: "30px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "32px",
  },
  center: {
    textAlign: "center",
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  statusSelect: {
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px dashed #ddd",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
  },
  total: {
    color: "#e63946",
  },
};
