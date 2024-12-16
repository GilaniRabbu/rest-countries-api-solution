import React from "react";
import "./Country.css";
import { Link } from "react-router-dom";

const Country = (props) => {
  const { name, population, region, flags, capital } = props.country;
  const handleAddCountry = props.handleAddCountry;

  return (
    <div className="country-card">
      <Link to={`/country/${name.common}`}>
        <img src={flags.png} alt="Country Flag" className="country-flag" />
      </Link>
      <div className="country-info">
        <h2>{name.common}</h2>
        <p>
          <strong>Population:</strong> {population}
        </p>
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Capital:</strong> {capital}
        </p>
        <button onClick={() => handleAddCountry(props.country)}>
          Add Country
        </button>
      </div>
    </div>

    // <div className="country-card">
    //   <div className="country-img-container">
    //     <img src={flags.png} alt="Country Flag" />
    //   </div>
    //   <div className="info">
    //     <h2 className="info-title">
    //       <Link to={`/country/${name.common}`}>{name.common}</Link>
    //     </h2>
    //     <p>
    //       <strong>Population:</strong> {population}
    //     </p>
    //     <p>
    //       <strong>Region:</strong> {region}
    //     </p>
    //     <p>
    //       <strong>Capital:</strong> {capital}
    //     </p>
    //     <button onClick={() => handleAddCountry(props.country)}>
    //       Add Country
    //     </button>
    //   </div>
    // </div>
  );
};

export default Country;
