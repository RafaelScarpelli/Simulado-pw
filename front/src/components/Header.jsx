import React from "react";
import { Link } from "react-router-dom";

function Header({ titulo }) {
  return (
    <header style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <h2>{titulo}</h2>
      {/* <nav>
        <Link to="/" style={{ marginRight: "10px", color: "#fff" }}>Home</Link>
        <Link to="/calculo" style={{ color: "#fff" }}>Cálculo</Link>
      </nav> */}
    </header>
  );
}

export default Header;