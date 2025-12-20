import React from "react";
import "./ButtomBar.css";

export default function Footer() {
  return (
    <div className="footer">
      {/* Website Name */}
      <h3 className="footer-title">Shopping Cart</h3>

      {/* Social Media Links */}
      <p className="footer-social">
        Follow us:
        <a href="#" className="footer-link">Facebook</a> |
        <a href="#" className="footer-link">Instagram</a> |
        <a href="https://x.com/" className="footer-link">Twitter</a> |
        <a href="https://www.linkedin.com/" className="footer-link">LinkedIn</a> |
        <a href="https://www.youtube.com/" className="footer-link">YouTube</a>
      </p>

      {/* Copyright */}
      <p className="footer-copy">
        © {new Date().getFullYear()} Soumyadip Mandal — All Rights Reserved.
      </p>
    </div>
  );
}
