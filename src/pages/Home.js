import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CountryCard from '../components/CountryCard';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../css/home.css';


const Home = () => {
    const [countriesList, setCountriesList] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log(response.data)
                setCountriesList(response.data);
            }
            )
            .catch(error => {
                console.error(error);
            })
    }, []);
    let countryCards = countriesList.map((country, i) => {
        return <CountryCard key={i} flag={country.flags.png} name={country.name.common} region={country.region} />
    })
    return (
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {countryCards}
      </Row>

    )
}
export default Home