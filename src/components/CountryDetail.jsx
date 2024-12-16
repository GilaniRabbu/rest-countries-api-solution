import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Data from "../data/data.json";
import "./CountryDetail.css";

const CountryDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const foundCountry = Data.find(
      (country) => country.name.toLowerCase() === name.toLowerCase()
    );
    setCountry(foundCountry || null); // Set the country data or null if not found
  }, [name]);

  if (!country) {
    return <p>Loading...</p>;
  }

  const nativeName = Object.values(country.nativeName || {});
  const currencies = Object.values(country.currencies || {})
    .map((currency) => currency.name)
    .join(", ");
  const languages = Object.values(country.languages || {})
    .map((language) => language.name)
    .join(", ");
  const borders = country.borders || [];

  return (
    <div className="country-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="detail-container">
        <div className="flag-section">
          <img
            src={country.flags.svg}
            alt="Country Flag"
            className="flag-image"
          />
        </div>
        <div className="info-section">
          <h1>{country.name}</h1>
          <div className="details-grid">
            <div>
              <p>
                <strong>Native Name:</strong> {nativeName || "N/A"}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Sub Region:</strong> {country.subregion || "N/A"}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital || "N/A"}
              </p>
            </div>
            <div>
              <p>
                <strong>Top Level Domain:</strong>{" "}
                {country.topLevelDomain || "N/A"}
              </p>
              <p>
                <strong>Currencies:</strong> {currencies || "N/A"}
              </p>
              <p>
                <strong>Languages:</strong> {languages || "N/A"}
              </p>
            </div>
          </div>

          {borders.length > 0 && (
            <div className="borders">
              <strong>Border Countries:</strong>
              <div className="border-buttons">
                {borders.map((border) => (
                  <span key={border} className="border-country">
                    {border}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
