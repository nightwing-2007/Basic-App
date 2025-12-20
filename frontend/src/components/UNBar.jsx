import React from "react";
import { NavLink } from "react-router";

const user = JSON.parse(localStorage.getItem("user"));


export default function BigNavbar() {
  const styles = {
    navbar: {
      width: "97.35%",
      backgroundColor: "#131921",
      color: "white",
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      fontFamily: "Arial, sans-serif",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },

    logo: {
      fontSize: "28px",
      fontWeight: "bold",
      marginRight: "20px",
      cursor: "pointer",
    },

    searchBarContainer: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      margin: "0 20px",
    },

    searchInput: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px 0 0 4px",
      border: "none",
      outline: "none",
      fontSize: "16px",
    },

    searchBtn: {
      padding: "10px 18px",
      backgroundColor: "#febd69",
      border: "none",
      borderRadius: "0 4px 4px 0",
      cursor: "pointer",
      fontSize: "16px",
    },

    navOptions: {
      display: "flex",
      alignItems: "center",
      gap: "25px",
      fontSize: "15px",
    },

    categoriesBar: {
      width: "97.35%",
      backgroundColor: "#232f3e",
      color: "white",
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      gap: "25px",
      fontFamily: "Arial",
      fontSize: "14px",
    },

    categoryItem: {
      cursor: "pointer",
      whiteSpace: "nowrap",
    },
  };

  // ---------- Orders Button Style ----------
  const orderBtnStyle = {
    padding: "8px 14px",
    borderRadius: "4px",
    backgroundColor: "#1c2b36",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
    textDecoration: "none",
  };

  const orderBtnHover = "#314455";

  return (
    <>
      {/* -------- MAIN NAVBAR -------- */}
      <div style={styles.navbar}>
        <div style={styles.logo}>ShopNow</div>

        {/* ------ SEARCH BAR ------ */}
        <div style={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Search for products, brands and more"
            style={styles.searchInput}
          />
          <button style={styles.searchBtn}>🔍</button>
        </div>

        {/* ------ RIGHT OPTIONS ------ */}
        <div style={styles.navOptions}>

          {/* Perfect Orders Button */}
          <NavLink to={`/user/my-orders`} style={{ textDecoration: "none" }}>
            <div
              style={orderBtnStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = orderBtnHover)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#1c2b36")
              }
            >
              Orders 📦
            </div>
          </NavLink>

          {/* Wishlist */}
          <div style={{ color: "white", cursor: "pointer" }}>
            Wishlist ♥
          </div>
        </div>
      </div>

      {/* -------- CATEGORY BAR (Like Amazon/Flipkart) -------- */}
      <div style={styles.categoriesBar}>
        <div style={styles.categoryItem}>Mobiles</div>
        <div style={styles.categoryItem}>Fashion</div>
        <div style={styles.categoryItem}>Electronics</div>
        <div style={styles.categoryItem}>Home & Kitchen</div>
        <div style={styles.categoryItem}>Beauty</div>
        <div style={styles.categoryItem}>Sports</div>
        <div style={styles.categoryItem}>Toys</div>
        <div style={styles.categoryItem}>Grocery</div>
        <div style={styles.categoryItem}>Appliances</div>
        <div style={styles.categoryItem}>Offers</div>
      </div>
    </>
  );
}
