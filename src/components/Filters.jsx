import React from "react";
import "./Filters.css";
import { IoIosSearch } from "react-icons/io";

const Filters = ({ searchQuery, onSearch, region, onRegionChange }) => {
  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

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
      <select
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
  );
};

export default Filters;
