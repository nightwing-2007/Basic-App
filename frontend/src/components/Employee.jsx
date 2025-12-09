import React from 'react'
import { NavLink } from 'react-router'
import { useState, useEffect } from 'react';

export const Employee = () => {
  const [Empl, setEmpl] = useState([]);

  const loadEmpl = async () => {
      const res = await fetch("http://localhost:5000/admin/add-new-employee");
      const data = await res.json();
      setEmpl(data);
  };

  useEffect(() => {
    loadEmpl();
  }, []);

  return (
    <>
      {/* Add Employee Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <NavLink to='/admin/add-new-employee'>
          <input 
            type="button" 
            value="Add New Employee" 
            style={{
              background: "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
            }}
          />
        </NavLink>
      </div>

      {/* Table Container */}
      <div 
        style={{
          width: "90%",
          margin: "30px auto",
          padding: "20px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}
      >
        <h2 
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "28px",
            color: "#333"
          }}
        >
          All Employees
        </h2>

        <table 
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "16px"
          }}
        >
          <thead>
            <tr style={{ background: "#007bff", color: "white", textAlign: "left" }}>
              <th style={{ padding: "12px" }}>Employee ID</th>
              <th style={{ padding: "12px" }}>Name</th>
              <th style={{ padding: "12px" }}>Education</th>
              <th style={{ padding: "12px" }}>Experience</th>
              <th style={{ padding: "12px" }}>Address</th>
              <th style={{ padding: "12px" }}>Image</th>
            </tr>
          </thead>

          <tbody>
            {Empl.length > 0 ? (
              Empl.map((empl, index) => (
                <tr 
                  key={index}
                  style={{
                    background: index % 2 === 0 ? "#f7f7f7" : "white",
                    transition: "0.3s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#e8f2ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? "#f7f7f7" : "white"}
                >
                  <td style={{ padding: "12px" }}>{empl._id}</td>
                  <td style={{ padding: "12px" }}>{empl.name}</td>
                  <td style={{ padding: "12px" }}>{empl.eduqual}</td>
                  <td style={{ padding: "12px" }}>{empl.expr}</td>
                  <td style={{ padding: "12px" }}>{empl.adrs}</td>
                  <td style={{ padding: "12px" }}>
                    <img
                      src={empl.image}
                      alt="employee"
                      width="50"
                      height="50"
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan="6" 
                  style={{
                    textAlign: "center",
                    padding: "15px",
                    fontSize: "18px",
                    color: "#777"
                  }}
                >
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
