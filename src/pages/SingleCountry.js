import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from 'react-bootstrap/Card';

const SingleCountry = () => {
    let { name } = useParams();
    const [country, setCountry] = useState({});
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}`)
            .then(response => {
                setCountry(response.data[0]);
            })
            .catch(error => {
                console.log(error);
            });
    }, [name]);

    useEffect(() => {
        const getWeatherData = async () => {
            if (country.capital) { // Check if country.capital is available
                try {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=37b8781a1a5781ff5cd05353f516fb49&units=metric`
                    );
                    setWeather(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        getWeatherData();
    }, [country.capital]);

    if (!country.name) {
        return (
            <h3>Loading...</h3>
        );
    }

    return (
        <Container>
             <Card>
             <Card.Body>
                            <Row>
                <Col>
                    <Image src={country.flags.svg} alt={country.name.common} style={{ maxWidth: '200px' }} />
                </Col>
                <Col sm={12} md={6} lg={4}>
              <h1>{country.name.common}</h1>
              <p><strong>Capital:</strong> {country.capital}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Population:</strong> {country.population}</p>
              <p><strong>Area:</strong> {country.area} km²</p>
            </Col>
                
                <Col sm={12} lg={4}>
                <h2>Weather in {country.capital}</h2>
              {weather && (
                <div className="text-center">
                  <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
                  <p><strong>Weather:</strong> {weather.weather[0].description}{getWeatherEmoji(weather.weather[0].main)}</p>
                  {/* Add more weather emojis based on weather conditions */}
                </div>
              )}
            </Col>
            </Row>

             </Card.Body>

             </Card>

        </Container>
    );

    function getWeatherEmoji(weatherCondition) {
        // Map weather conditions to emojis based on your preferences
        const emojiMap = {
          'Clear': '☀️',
          'Clouds': '☁️',
          'Rain': '🌧️',
          'Snow': '❄️',
          
        };
      
        return emojiMap[weatherCondition] || '🌦️'; // Default emoji
      }
};

export default SingleCountry;



                    