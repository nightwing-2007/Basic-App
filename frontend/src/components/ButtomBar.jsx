import React, { useEffect, useState } from "react";
import "./ButtomBar.css";

export default function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, []);

  return (
    <div className="footer">
      {/* Website Name */}
      <h3 className="footer-title">Shopify Shopping</h3>

      {/* Live Clock */}
      <p className="footer-clock">
        🕒 {time.toLocaleTimeString()} | {time.toLocaleDateString()}
      </p>

      {/* Social Media Links */}
      <p className="footer-social">
        Follow us:
        <a href="#" className="footer-link"> Facebook</a> |
        <a href="#" className="footer-link"> Instagram</a> |
        <a href="https://x.com/" className="footer-link"> Twitter</a> |
        <a href="https://www.linkedin.com/" className="footer-link"> LinkedIn</a> |
        <a href="https://www.youtube.com/" className="footer-link"> YouTube</a>
      </p>

      {/* Copyright */}
      <p className="footer-copy">
        © {new Date().getFullYear()} Soumyadip Mandal — All Rights Reserved.
      </p>
    </div>
  );
}
