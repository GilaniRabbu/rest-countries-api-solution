import React from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import "./SelectedCountries.css";

const SelectedCountries = ({
  addCountry,
  handleRemoveCountry,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (addCountry.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        No countries added yet.
      </h2>
    );
  }

  return (
    <div className="selected-countries">
      <h2 style={{ textAlign: "center" }}>Selected Countries</h2>
      <div className="selected-container">
        {addCountry.map((country) => (
          <div className="selected-country" key={country.name.official}>
            <img src={country.flags.svg} alt={`${country.name.common} Flag`} />
            <h3>{country.name.common}</h3>
            <p>
              <strong>Population:</strong> {country.population}
            </p>
            <p>
              <strong>Region:</strong> {country.region}
            </p>
            <Link
              to={`/country/${country.name.common}`}
              className="details-link"
            >
              View Details
            </Link>
            <button
              className="remove-btn"
              onClick={() => handleRemoveCountry(country.name.common)}
            >
              Remove
            </button>
          </div>
        ))}
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
