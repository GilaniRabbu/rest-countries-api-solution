import React from "react";
import "./Filters.css";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillBookmarkStarFill } from "react-icons/bs";

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
      <div className="filter-box">
        <Link to="/" className="link-item">
          <AiFillHome className="link-icon" />
        </Link>
        <Link to="/selected-countries" className="link-item">
          <BsFillBookmarkStarFill className="link-icon" />
        </Link>
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
    </div>
  );
};

export default Filters;
