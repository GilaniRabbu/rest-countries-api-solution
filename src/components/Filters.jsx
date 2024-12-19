import React from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import "./Filters.css";

const Filters = ({ searchQuery, onSearch, region, onRegionChange }) => {
  const regions = [
    "Select All Region",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
  ];

  return (
    <div className="filters">
      <div className="search-container">
        <IoIosSearch className="search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search countries..."
          className="search-input"
        />
      </div>
      <div className="filter-box">
        <Link to="/" className="link-item" aria-label="Go to Home Page">
          <AiFillHome className="link-icon" />
        </Link>
        <label htmlFor="region-select" className="sr-only">
          Select a Region
        </label>
        <select
          id="region-select"
          value={region}
          onChange={(e) => onRegionChange(e.target.value)}
          className="region-select"
        >
          {regions.map((reg) => (
            <option key={reg} value={reg}>
              {reg}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
