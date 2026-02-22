import { useEffect, useState } from "react";
import "./AdminFinance.css";

export default function AdminFinance() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchEmployees();
  }, []);

  // ---------------- FETCH DATA ----------------

  const fetchOrders = async () => {
    const res = await fetch("https://cd2lkmcw-5000.inc1.devtunnels.ms/admin/orders");
    const data = await res.json();
    setOrders(data.orders || []);
  };

  const fetchProducts = async () => {
    const res = await fetch("https://cd2lkmcw-5000.inc1.devtunnels.ms/admin/add-new-products");
    const data = await res.json();
    setProducts(data || []);
  };

  const fetchEmployees = async () => {
    const res = await fetch("https://cd2lkmcw-5000.inc1.devtunnels.ms/admin/add-new-employee");
    const data = await res.json();
    setEmployees(data || []);
  };

  // ---------------- CALCULATIONS ----------------

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const deliveredRevenue = orders
    .filter(o => o.status === "Delivered")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const pendingRevenue = totalRevenue - deliveredRevenue;

  const totalInvestment = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.stock || 0),
    0
  );

  const estimatedProfit = totalRevenue - totalInvestment;

  // ---------------- UI ----------------

  return (
    <div className="finance-container">
      <h2 className="finance-title">📊 Admin Finance Dashboard</h2>

      {/* SUMMARY CARDS */}
      <div className="finance-grid">
        <Card title="Total Revenue" value={totalRevenue} />
        <Card title="Delivered Revenue" value={deliveredRevenue} />
        <Card title="Pending Revenue" value={pendingRevenue} />
        <Card title="Product Investment" value={totalInvestment} />
        <Card title="Estimated Profit" value={estimatedProfit} profit />

        <Card title="Total Orders" value={orders.length} isMoney={false} />
        <Card title="Employees" value={employees.length} isMoney={false} />
        <Card title="Products" value={products.length} isMoney={false} />
      </div>

      {/* RECENT ORDERS */}
      <div className="table-wrapper">
        <h3>🧾 Recent Orders</h3>

        <table className="finance-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {orders.slice(0, 10).map(o => (
              <tr key={o._id}>
                <td>{o.orderId}</td>
                <td>{o.email}</td>
                <td>₹{o.total}</td>
                <td>
                  <span
                    className={`status ${o.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {o.status}
                  </span>
                </td>
                <td>{o.paymentMethod}</td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="empty-row">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------- CARD COMPONENT ----------------

const Card = ({ title, value, isMoney = true, profit = false }) => {
  const profitClass =
    profit && value < 0 ? "loss" : profit ? "profit" : "";

  return (
    <div className={`finance-card ${profitClass}`}>
      <h4>{title}</h4>
      <h2>{isMoney ? `₹${value || 0}` : value || 0}</h2>
    </div>
  );
};
