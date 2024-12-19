import React from "react";
import { Link } from "react-router-dom";
import { BsBookmarkCheckFill } from "react-icons/bs";
import "./Country.css";

const Country = (props) => {
  const { name, population, region, flags, capital } = props.country;
  const handleAddCountry = props.handleAddCountry;

  return (
    <div className="country-card">
      <Link to={`/country/${name}`}>
        <img src={flags.png} alt="Country Flag" className="country-flag" />
      </Link>
      <div className="country-info">
        <h2 className="country-name" title={name}>
          {name.length > 15 ? `${name.substring(0, 15)} ...` : name}
        </h2>
        <p>
          <strong>Population:</strong> {population}
        </p>
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Capital:</strong> {capital}
        </p>
        <button
          className="country-btn"
          onClick={() => handleAddCountry(props.country)}
        >
          <BsBookmarkCheckFill />
        </button>
      </div>
    </div>
  );
};

export default Country;
