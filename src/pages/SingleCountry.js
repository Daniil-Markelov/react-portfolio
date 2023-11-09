import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from 'react-bootstrap/Card';
import CurChart from "../components/CurChart";
import ReactMapGL from 'react-map-gl';
import '../css/singleCountry.css';


const SingleCountry = () => {
  let { name } = useParams();
  const [country, setCountry] = useState({});
  const [weather, setWeather] = useState(null);
  const countryCurrencyCode = country.currencies || null;
  const currencyCode = countryCurrencyCode ? Object.keys(countryCurrencyCode)[0] : null;

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => {
        setCountry(response.data[0]);
      })
      .catch(error => {
        console.error(error);
      });
  }, [name]);

  useEffect(() => {
    const getWeatherData = async () => {
      if (country.capital) {
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

// my map end point
const mapquestapi ="7n3MihHkHvtiHoIFEdBq79KmDP0a0et7";
const zoom ="5";
const type ="light";
const size ="400,200@2x";
const defaultMarker ="via-sm-7B0099";


  return (
    <Container fluid className="mt-5 text-center">
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Image src={country.flags.svg} alt={country.name.common} style={{ maxWidth: '250px' }} />
            </Col>
            <Col sm={12} md={6} lg={4}>
              <h1>{country.name.common}</h1>
              <p><strong>Capital:</strong> {country.capital}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Population:</strong> {country.population}</p>
              <p><strong>Area:</strong> {country.area} km²</p>
            </Col>
            <Col sm={12} lg={6}>
              <h2>Weather in {country.capital}</h2>
              {weather && (
                <div className="text-center">
                  <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
                  <p><strong>Feels like:</strong> {weather.main.feels_like} °C</p>
                  <p><strong>Humidity:</strong> {weather.main.humidity} %</p>
                  <p><strong>Weather:</strong> {weather.weather[0].description}{getWeatherEmoji(weather.weather[0].main)}</p>
                </div>
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={12} lg={6}>
              {countryCurrencyCode && <CurChart currencyCode={currencyCode} />}
            </Col>
          
          
            <Col sm={12} lg={6}>
              <h2>Map of {country.name.common}</h2>
              {country.latlng && (
                <img
                  src={`https://www.mapquestapi.com/staticmap/v5/map?key=${mapquestapi}&center=${country.latlng[0]},${country.latlng[1]}&locations=${country.capital}&zoom=${zoom}&size=${size}&defaultMarker=${defaultMarker}&type=${type}`}
                  alt={`Map of ${country.name.common}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
              <p className="map-desc">Pink Dot is Indicitive of Capital Location</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );

  function getWeatherEmoji(weatherCondition) {
    const emojiMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Snow': '❄️',
    };

    return emojiMap[weatherCondition] || '🌦️';
  }
};

export default SingleCountry;



                    