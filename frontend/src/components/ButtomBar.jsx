export default function Footer() {
  return (
    <div
      style={{
        width: "95.9%",
        backgroundColor: "#111",
        color: "white",
        padding: "20px 30px",
        textAlign: "center",
        // marginTop: "40px"
      }}
    >
      {/* Website Name */}
      <h3
        style={{
          margin: 0,
          fontSize: "18px",
          fontWeight: "600"
        }}
      >
        Shopping Cart
      </h3>

      {/* Social Media Links */}
      <p
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          fontSize: "15px"
        }}
      >
        Follow us:
        <a href="#" style={linkStyle}> Facebook </a>|
        <a href="#" style={linkStyle}> Instagram </a>|
        <a href="https://x.com/" style={linkStyle}> Twitter </a>|
        <a href="https://www.linkedin.com/" style={linkStyle}> LinkedIn </a>|
        <a href="https://www.youtube.com/" style={linkStyle}> YouTube </a>
      </p>

      {/* Copyright */}
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          opacity: 0.7
        }}
      >
        © {new Date().getFullYear()} Soumyadip Mandal — All Rights Reserved.
      </p>
    </div>
  );
}

const linkStyle = {
  color: "#4fa3ff",
  textDecoration: "none",
  margin: "0 6px",
  fontWeight: "500"
};
