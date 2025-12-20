import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const loadOrders = async () => {
    try {
      const res = await fetch(
        "https://cd2lkmcw-5000.inc1.devtunnels.ms/admin/orders"
      );
      const data = await res.json();

      if (res.status === 200) {
        setOrders(data);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div
      style={{
        maxWidth: "900px",
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
        All Orders
      </h1>

      {orders.length === 0 ? (
        <p style={{ color: "#777", fontSize: "16px" }}>
          No orders found
        </p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              marginBottom: "25px",
              borderRadius: "10px",
              background: "#f9f9f9",
              border: "1px solid #eee",
            }}
          >
            {/* Customer Info */}
            <h2 style={{ margin: "0", fontSize: "20px", color: "#333" }}>
              {order.name} ({order.email})
            </h2>

            <p style={{ margin: "5px 0", color: "#666" }}>
              <b>Address:</b> {order.address}
            </p>

            <p style={{ margin: "5px 0", color: "#666" }}>
              <b>Date:</b>{" "}
              {new Date(order.date).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>

            {/* Items */}
            <h3
              style={{
                marginTop: "15px",
                fontSize: "18px",
                color: "#444",
              }}
            >
              Ordered Items
            </h3>

            {order.items.map((item, i) => {
              const qty = item.qty || 1; // backward compatible
              const subtotal = item.price * qty;

              return (
                <div
                  key={i}
                  style={{
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    background: "#fff",
                    border: "1px solid #ddd",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                      {item.name}
                    </p>
                    <p style={{ margin: 0, color: "#666" }}>
                      {item.desc}
                    </p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0 }}>
                      ₹{item.price} × {qty}
                    </p>
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                      ₹{subtotal}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Order Total */}
            <h3
              style={{
                textAlign: "right",
                color: "#e63946",
                marginTop: "10px",
              }}
            >
              Total: ₹{order.total}
            </h3>
          </div>
        ))
      )}

      <ToastContainer />
    </div>
  );
};
