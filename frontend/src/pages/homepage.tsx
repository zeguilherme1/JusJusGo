import React, { useState, useEffect, useRef } from "react";
import logo from "../jusjusgo_logo.png";
import { fetchSuggestions, Suggestion } from "../services/api";

import "./style.css";

function HomePage() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  function handleInputChange(event: any) {
    setSearch(event.target.value);
    setIsDropdownVisible(true);
  }

  useEffect(() => {
    if (search.trim().length < 4) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      const resultados = await fetchSuggestions(search);
      setSuggestions(resultados.slice(0, 10));
      console.log("API:", resultados);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownVisible(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleSearch() {
    console.log("Procurando por:", search);
    setIsDropdownVisible(false);
  }

  function handleSuggestionClick(term: string) {
    setSearch(term);
    setIsDropdownVisible(false);
  }

  function renderHighlight(text: string, highlight: string) {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <strong key={i}>{part}</strong>
          ) : (
            part
          ),
        )}
      </span>
    );
  }

  return (
    <div className="homepage">
      <div className="homepage-logo">
        <img src={logo} className="logo" alt="Logo" />
      </div>

      <div className="title">
        <a>JusJusGo</a>
      </div>

      <div className="search-container" ref={searchContainerRef}>
        <div className="search-row">
          <input
            className="search-bar"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleInputChange}
          />

          <button className="search-button" onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="search-icon"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        {isDropdownVisible && suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSuggestionClick(item.term)}
                className="suggestion-item"
              >
                {renderHighlight(item.term, search)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HomePage;