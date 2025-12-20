import { NavLink } from "react-router";

export default function UserNavbar({ user, onCartClick }) {
  const styles = {
    navbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 28px",
      backgroundColor: "#0d1b2a",
      color: "white",
      fontFamily: "Segoe UI, sans-serif",
      boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    company: {
      fontSize: "24px",
      fontWeight: 700,
      letterSpacing: "0.5px",
    },
    welcome: {
      fontSize: "18px",
      opacity: 0.9,
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
    },
    profilePic: {
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #ffffff",
    },
    cartBtn: {
      backgroundColor: "#1b263b",
      color: "white",
      padding: "8px 14px",
      borderRadius: "8px",
      border: "1px solid #778da9",
      cursor: "pointer",
      fontWeight: 600,
      transition: "0.3s ease",
    },
  };

  const data1 = localStorage.getItem('user');
  const data = JSON.parse(data1);

  return (
    <div style={styles.navbar}>
      {/* Left - Company Name */}
      <div style={styles.company}>Shopping Cart</div>

      {/* Middle - Welcome message */}
      <div style={styles.welcome}>Welcome {data.fname} {data.lname}</div>

      {/* Right - Profile + Cart */}
      <div style={styles.rightSection}>
        <NavLink to={`/user/profile`}>
        <img src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg" alt="Profile" style={styles.profilePic} />
        </NavLink>

        <NavLink to={`/user/cart`}>
        <button
          style={styles.cartBtn}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#415a77")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1b263b")}
        >
          🛒 Cart
        </button>
        </NavLink>
      </div>
    </div>
  );
}
