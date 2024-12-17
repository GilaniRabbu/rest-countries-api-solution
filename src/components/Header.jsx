import React, { useEffect, useState } from "react";
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
      <h1 className="title">Where in the world?</h1>
      <button onClick={toggleTheme} className="theme-switcher">
        {theme === "light" ? <FaRegMoon /> : <FaMoon />}{" "}
        {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </header>
  );
};

export default Header;
