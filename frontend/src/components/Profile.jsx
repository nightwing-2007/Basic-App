import React from "react";
import { NavLink } from "react-router";

export const Profile = () => {
  const data = JSON.parse(localStorage.getItem("user"));

  const styles = {
    container: {
      maxWidth: "650px",
      margin: "40px auto",
      padding: "30px",
      borderRadius: "12px",
      background: "#ffffff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
      
    },
    heading: {
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "28px",
      color: "#222",
      fontWeight: "600",
    },
    imgContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "25px",
    },
    profileImg: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "4px solid #3498db",
    },
    infoBox: {
      marginBottom: "18px",
      display: "flex",
      alignItems: "center",
    },
    label: {
      width: "130px",
      fontWeight: "600",
      color: "#333",
      fontSize: "16px",
    },
    value: {
      fontSize: "16px",
      color: "#555",
      margin: 0,
    },
    btnContainer: {
      textAlign: "center",
      marginTop: "30px",
    },
    button: {
      padding: "10px 28px",
      fontSize: "16px",
      border: "none",
      borderRadius: "8px",
      background: "#3498db",
      color: "#fff",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.3s",
    },
    logoutButtonStyle: {
      padding: "10px 20px",
      marginRight: "15px",
      // backgroundColor: "#007bff",
      border: "none",
      color: "white",
      fontSize: "16px",
      borderRadius: "6px",
      cursor: "pointer",
      backgroundColor: "#dc3545"
    }
    

  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  return (
    <>
    <div style={{flexGrow: "1"}}>
      <div style={styles.container}>
        <h2 style={styles.heading}>My Profile</h2>

        <div style={styles.imgContainer}>
          <img
            src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg"
            alt="img"
            style={styles.profileImg}
          />
        </div>

        <div>
          <div style={styles.infoBox}>
            <label style={styles.label}>Customer ID:</label>
            <p style={styles.value}>{data._id}</p>
          </div>

          <div style={styles.infoBox}>
            <label style={styles.label}>Name:</label>
            <p style={styles.value}>{data.fname} {data.lname}</p>
          </div>

          <div style={styles.infoBox}>
            <label style={styles.label}>Email ID:</label>
            <p style={styles.value}>{data.email}</p>
          </div>

          <div style={styles.infoBox}>
            <label style={styles.label}>Phone No.:</label>
            <p style={styles.value}>{data.phone}</p>
          </div>

          <div style={styles.infoBox}>
            <label style={styles.label}>Location:</label>
            <p style={styles.value}>{data.place}</p>
          </div>
        </div>

        <div style={styles.btnContainer}>
          <NavLink to={`/user/profile/edit`}>
            <input
              type="button"
              value="Edit"
              style={styles.button}
              onMouseOver={(e) => (e.target.style.background = "#2980b9")}
              onMouseOut={(e) => (e.target.style.background = "#3498db")}
            />
          </NavLink>
          <NavLink to="/user/login">
            <button style={styles.logoutButtonStyle} onClick={logout}>
              Logout
            </button>
          </NavLink>
        </div>
      </div>
    </div>
    </>
  );
};
