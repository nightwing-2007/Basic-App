import React, { useState, useEffect } from "react";
import "./MainPage.css";

export const MainPage = () => {
  const [items, setItems] = useState([]);
  const [hoverCard, setHoverCard] = useState(null);

  // Load all products
  const loadItems = async () => {
    try {
      const res = await fetch(
        "https://cd2lkmcw-5000.inc1.devtunnels.ms/admin/add-new-products"
      );
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="pageContainer">
      <h1 className="heading">Most Trending Products</h1>

      <div className="grid">
        {items.map((p, index) => (
          <div
            key={p._id}
            className={`card ${hoverCard === index ? "cardHover" : ""}`}
            onMouseEnter={() => setHoverCard(index)}
            onMouseLeave={() => setHoverCard(null)}
          >
            <h2 className="category">{p.category}</h2>

            <img
              src={p.image}
              alt={p.name}
              className="productImage"
            />

            <p>
              <strong>Name:</strong> {p.name}
            </p>
            <p>
              <strong>Price:</strong> ₹{p.price}
            </p>
            <p>
              <strong>Description:</strong> {p.desc}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
