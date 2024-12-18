import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Pagination from "./Pagination";
import "./SelectedCountries.css";

const SelectedCountries = ({
  addCountry,
  handleRemoveCountry,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const navigate = useNavigate();
  if (addCountry.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        No countries added yet.
      </h2>
    );
  }

  return (
    <div className="selected-countries">
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          marginTop: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        Favorites Countries
      </h2>
      <div className="bm-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="bm-grid">
          {addCountry.map((country) => (
            <div className="bm-card" key={country.name}>
              <Link to={`/country/${country.name}`}>
                <img
                  src={country.flags.svg}
                  alt={`${country.name} Flag`}
                  className="bm-flag"
                />
              </Link>
              <div className="bm-info">
                <h2 className="bm-name">{country.name}</h2>
                <p>
                  <strong>Population:</strong> {country.population}
                </p>
                <p>
                  <strong>Region:</strong> {country.region}
                </p>
                <p>
                  <strong>Capital:</strong> {country.capital}
                </p>
                <button
                  className="bm-btn"
                  onClick={() => handleRemoveCountry(country.name)}
                >
                  <FaTrashAlt className="bm-btn-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default SelectedCountries;
