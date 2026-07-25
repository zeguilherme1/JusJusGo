import React, { useState } from "react";
import logo from "../jusjusgo_logo.png";
import "./style.css";

function HomePage() {
  const [search, setSearch] = useState("");
  function handleSearch() {
    console.log("Procurando por:", search);
  }
  return (
    <div className="homepage">
      <div className="homepage-logo">
        <img src={logo} className="logo"></img>
      </div>
      <div className="title">
        <a>JusJusGo</a>
      </div>

      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      ></input>
      <button className="search-button" onClick={handleSearch}>
        Procurar
      </button>
    </div>
  );
}

export default HomePage;
