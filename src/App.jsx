import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import localData from "./data/data.json";
import Country from "./components/Country";
import CountryDetail from "./components/CountryDetail";
import SelectedCountries from "./components/SelectedCountries";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import Filters from "./components/Filters";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [addCountry, setAddCountry] = useState(() => {
    const storedCountries = sessionStorage.getItem("selectedCountries");
    return storedCountries ? JSON.parse(storedCountries) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("All");

  const itemsPerPage = 20;

  // useEffect(() => {
  //   fetch("https://restcountries.com/v3.1/all")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCountries(data);
  //       setFilteredCountries(data);
  //       console.log(data);
  //     })
  //     .catch((err) => console.error("Error fetching countries:", err));
  // }, []);

  useEffect(() => {
    setCountries(localData);
    console.log(localData);
    setFilteredCountries(localData);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("selectedCountries", JSON.stringify(addCountry));
  }, [addCountry]);

  const handleAddCountry = (country) => {
    if (!addCountry.some((c) => c.name === country.name)) {
      setAddCountry([...addCountry, country]);
    }
  };

  const handleRemoveCountry = (countryName) => {
    const updatedCart = addCountry.filter(
      (country) => country.name !== countryName
    );
    setAddCountry(updatedCart);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(query, region);
  };

  const handleRegionChange = (selectedRegion) => {
    setRegion(selectedRegion);
    applyFilters(searchQuery, selectedRegion);
  };

  const applyFilters = (query, selectedRegion) => {
    let result = countries;

    if (selectedRegion !== "All") {
      result = result.filter(
        (country) =>
          country.region.toLowerCase() === selectedRegion.toLowerCase()
      );
    }

    if (query) {
      result = result.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredCountries(result);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PaginationPage
              countries={filteredCountries}
              handleAddCountry={handleAddCountry}
              itemsPerPage={itemsPerPage}
              onSearch={handleSearch}
              onRegionChange={handleRegionChange}
              searchQuery={searchQuery}
              region={region}
            />
          }
        />
        <Route
          path="/page/:pageNumber"
          element={
            <PaginationPage
              countries={filteredCountries}
              handleAddCountry={handleAddCountry}
              itemsPerPage={itemsPerPage}
              onSearch={handleSearch}
              searchQuery={searchQuery}
            />
          }
        />
        <Route path="/country/:name" element={<CountryDetail />} />
        <Route
          path="/selected-countries"
          element={
            <SelectedCountriesPage
              addCountry={addCountry}
              handleRemoveCountry={handleRemoveCountry}
              itemsPerPage={itemsPerPage}
            />
          }
        />
        <Route
          path="/selected-countries/page/:pageNumber"
          element={
            <SelectedCountriesPage
              addCountry={addCountry}
              handleRemoveCountry={handleRemoveCountry}
              itemsPerPage={itemsPerPage}
            />
          }
        />
      </Routes>
    </Router>
  );
}

const PaginationPage = ({
  countries,
  handleAddCountry,
  itemsPerPage,
  onSearch,
  onRegionChange,
  searchQuery,
  region,
}) => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const currentPage = parseInt(pageNumber || 1, 10);
  const totalPages = Math.ceil(countries.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCountries = countries.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    navigate(`/page/${page}`);
  };

  return (
    <div>
      {/* <h1>Country Loaded: {countries.length}</h1> */}
      <Filters
        searchQuery={searchQuery}
        onSearch={onSearch}
        region={region}
        onRegionChange={onRegionChange}
      />
      <div className="container">
        <div className="country-grid">
          {paginatedCountries.map((country) => (
            <Country
              country={country}
              handleAddCountry={handleAddCountry}
              key={country.name}
            />
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const SelectedCountriesPage = ({
  addCountry,
  handleRemoveCountry,
  itemsPerPage,
}) => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const currentPage = parseInt(pageNumber || 1, 10);
  const totalPages = Math.ceil(addCountry.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCountries = addCountry.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    navigate(`/selected-countries/page/${page}`);
  };

  return (
    <SelectedCountries
      addCountry={paginatedCountries}
      handleRemoveCountry={handleRemoveCountry}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default App;
