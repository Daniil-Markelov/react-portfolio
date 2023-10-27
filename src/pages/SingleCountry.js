import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const SingleCountry = () => {
    let { name } = useParams();
    const [country, setCountry] = useState({});

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}`)
            .then(response => {
                setCountry(response.data[0]);
            })
            .catch(error => {
                console.log(error);
            });
    }, [name]);

    if (!country.name) {
        return (
            <h3>Loading...</h3>
        );
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Image src={country.flags.svg} alt={country.name.common} style={{maxWidth: '200px'}}/>
                </Col>
                <Col>
                    <p><b>Common Name:</b> {country.name.common}</p>
                    <p><b>Region:</b> {country.region}</p>
                    <p><b>Subregion:</b> {country.subregion}</p>
                    <p><b>Currency Name:</b> {Object.values(country.currencies)[0].name}</p>
                    <p><b>Currency Symbol:</b> {Object.values(country.currencies)[0].symbol}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default SingleCountry;


                    