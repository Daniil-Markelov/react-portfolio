import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CountryCard from '../components/CountryCard';

const Home = () => {
    const [countriesList, setCountriesList] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountriesList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    let CountryCards = countriesList.map((country,i) => {
        return <CountryCard key={i} name={country.name.common} flag={country.flags.svg}/>
    });

    return (
        <div>
            <h1>Home</h1>
            {CountryCards}
        </div>
    );
};

export default Home;