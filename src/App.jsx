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

  useEffect(() => {
    setCountries(localData);
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

  // Search and Region Filter Logic
  const applyFilters = () => {
    let result = countries;

    if (region !== "All") {
      result = result.filter(
        (country) => country.region.toLowerCase() === region.toLowerCase()
      );
    }

    if (searchQuery) {
      result = result.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCountries(result);
  };

  // Apply filters when searchQuery or region changes
  useEffect(() => {
    applyFilters();
  }, [searchQuery, region, countries]);

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
              setSearchQuery={setSearchQuery}
              setRegion={setRegion}
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
              setSearchQuery={setSearchQuery}
              setRegion={setRegion}
              searchQuery={searchQuery}
              region={region}
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
  setSearchQuery,
  setRegion,
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
      <Filters
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        region={region}
        onRegionChange={setRegion}
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
