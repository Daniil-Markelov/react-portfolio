import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CountryCard from '../components/CountryCard';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"; 
import '../css/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [selectedContinent, setSelectedContinent] = useState("All");

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountriesList(response.data);
        setFilteredCountries(response.data);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  const handleSort = () => {
    const sortedCountries = [...filteredCountries].sort((a, b) => {
      const nameA = a.name.common.toLowerCase();
      const nameB = b.name.common.toLowerCase();
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    setFilteredCountries(sortedCountries);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredCountries = filterCountries(selectedContinent, searchTerm);
    setFilteredCountries(filteredCountries);
  };


  const handleContinentFilter = (continent) => {
    setSelectedContinent(continent);

    const filteredCountries = filterCountries(continent, searchTerm);
    setFilteredCountries(filteredCountries);
  };

  const filterCountries = (continent, searchTerm) => {
    return countriesList.filter(country =>
      (continent === "All" || country.region === continent) &&
      country.name.common.toLowerCase().includes(searchTerm)
    );
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedContinent("All");
    setFilteredCountries(countriesList);
  };

  const continents = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <Container>
      <h1 className="text-center mb-4">Countries of the World</h1>

      {/* Search Form */}
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form>

      <div className="mb-3">
        <Button variant="primary" className="mr-2" onClick={handleSort}>
          Sort by Name ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </Button>

        {continents.map(continent => (
          <Button
            key={continent}
            variant={selectedContinent === continent ? "info" : "light"}
            className="mr-2"
            onClick={() => handleContinentFilter(continent)}
          >
            {continent}
          </Button>
        ))}

        <Button variant="danger" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <Row xs={1} sm={2} md={3} lg={3} xl={4} className="g-4">
        {filteredCountries.map((country, i) => (
          <CountryCard key={i} flag={country.flags.png} name={country.name.common} region={country.region} />
        ))}
      </Row>
    </Container>
  );
};

export default Home;