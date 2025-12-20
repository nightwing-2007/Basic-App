// import React, { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";

// export default function MyOrders() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     try {
//       const res = await fetch(`https://cd2lkmcw-5000.inc1.devtunnels.ms/user/my-orders?email=${user.email}`);

//       const data = await res.json();

//       if (res.status === 200) {
//         setOrders(data.orders);
//       } 
//         //toast(data.message);
      
//     } catch (err) {
//       //toast(data.message);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <>
    
    
//     <div
//       style={{
//         padding: "30px",
//         fontFamily: "Arial, sans-serif",
//         backgroundColor: "#f7f7f7",
//         minHeight: "100vh",
//       }}
//     >
//       <h1
//         style={{
//           textAlign: "center",
//           marginBottom: "20px",
//           fontSize: "28px",
//           color: "#222",
//         }}
//       >
//         My Orders
//       </h1>

//       {/* Loading */}
//       {loading ? (
//         <h2 style={{ textAlign: "center", color: "#555" }}>Loading...</h2>
//       ) : orders.length === 0 ? (
//         <h2 style={{ textAlign: "center", color: "#777" }}>
//           No orders found
//         </h2>
//       ) : (
//         orders.map((order, index) => (
//           <div
//             key={index}
//             style={{
//               backgroundColor: "white",
//               padding: "20px",
//               borderRadius: "12px",
//               marginBottom: "20px",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//               border: "1px solid #eee",
//             }}
//           >
//             <h2 style={{ color: "#333" }}>Order #{index + 1}</h2>

//             <p><b>Name:</b> {order.name}</p>
//             <p><b>Address:</b> {order.address}</p>
//             <p><b>Date:</b> {new Date(order.date).toLocaleString()}</p>

//             <h3 style={{ marginTop: "10px", color: "#444" }}>Items:</h3>
//             {order.items.map((item, i) => (
//               <p key={i}>
//                 ✔ {item.name} — ₹{item.price}
//               </p>
//             ))}

//             <h2
//               style={{
//                 color: "#e63946",
//                 textAlign: "right",
//                 marginTop: "15px",
//               }}
//             >
//               Total: ₹{order.total}
//             </h2>
//           </div>
//         ))
//       )}
//     </div>
//     <ToastContainer />
//     </>
//   );
// }




import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

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
    } catch (err) {
      toast.error("Server error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div
        style={{
          padding: "30px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f7f7f7",
          minHeight: "fit-content",
          flexGrow: "1"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "28px",
            color: "#222",
          }}
        >
          My Orders
        </h1>

        {/* Loading */}
        {loading ? (
          <h2 style={{ textAlign: "center", color: "#555" }}>
            Loading...
          </h2>
        ) : orders.length === 0 ? (
          <h2 style={{ textAlign: "center", color: "#777" }}>
            No orders found
          </h2>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "1px solid #eee",
              }}
            >
              <h2 style={{ color: "#333" }}>
                Order #{index + 1}
              </h2>

              <p><b>Name:</b> {order.name}</p>
              <p><b>Address:</b> {order.address}</p>
              <p>
                <b>Date:</b>{" "}
                {new Date(order.date).toLocaleString("en-IN")}
              </p>

              <h3 style={{ marginTop: "10px", color: "#444" }}>
                Items
              </h3>

              {order.items.map((item, i) => {
                const qty = item.qty || 1;
                const subtotal = item.price * qty;

                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom: "1px dashed #ddd",
                    }}
                  >
                    <span>
                      ✔ {item.name} (x{qty})
                    </span>
                    <span>₹{subtotal}</span>
                  </div>
                );
              })}

              <h2
                style={{
                  color: "#e63946",
                  textAlign: "right",
                  marginTop: "15px",
                }}
              >
                Total: ₹{order.total}
              </h2>
            </div>
          ))
        )}
      </div>

      <ToastContainer />
    </>
  );
}
