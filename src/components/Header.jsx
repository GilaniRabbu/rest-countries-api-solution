import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaRegMoon } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [theme, setTheme] = useState(() => {
    // Check stored theme preference
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" className="mr">
              Home
            </Link>
            <Link to="/selected-countries">Selected Countries</Link>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className="theme-switcher flex ai-cen"
            >
              {theme === "light" ? <FaRegMoon /> : <FaMoon />}{" "}
              {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
