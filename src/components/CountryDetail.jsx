import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CountryDetail.css";

const CountryDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    // Fetch main country details
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const countryData = data[0];
          setCountry(countryData);

          // Fetch border country names
          if (countryData.borders) {
            fetchBorderNames(countryData.borders);
          }
        }
      })
      .catch((err) => console.error(err));
  }, [name]);

  const fetchBorderNames = (borders) => {
    // Fetch all border countries using their codes
    const borderFetches = borders.map((code) =>
      fetch(`https://restcountries.com/v3.1/alpha/${code}`).then((res) =>
        res.json()
      )
    );

    Promise.all(borderFetches)
      .then((results) => {
        const formattedBorders = results.map((res) => ({
          name: res[0]?.name?.common || "N/A",
        }));
        setBorderCountries(formattedBorders);
      })
      .catch((err) => console.error(err));
  };

  if (!country) {
    return <p>Loading...</p>;
  }

  const nativeName = Object.values(country.name.nativeName || {})[0]?.common;
  const currencies = Object.values(country.currencies || {})
    .map((currency) => currency.name)
    .join(", ");
  const languages = Object.values(country.languages || {}).join(", ");

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
          <h1>{country.name.common}</h1>
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
                {country.tld?.join(", ") || "N/A"}
              </p>
              <p>
                <strong>Currencies:</strong> {currencies || "N/A"}
              </p>
              <p>
                <strong>Languages:</strong> {languages || "N/A"}
              </p>
            </div>
          </div>

          {/* Border Countries */}
          {borderCountries.length > 0 && (
            <div className="borders">
              <strong>Border Countries:</strong>
              <div className="border-countries">
                {borderCountries.map((border, index) => (
                  <span key={index} className="border-name">
                    {border.name}
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
