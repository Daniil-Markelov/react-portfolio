import {Card} from 'react-bootstrap';
import {Row, Col} from'react-bootstrap';
import {Link} from'react-router-dom';
const CountryCard = (props) => {

    return (
        <Row>
            <Col>
                    <Card className="country-card">
            <Card.Body>
            <Card.Title>
  <Link to={`/country/${props.name}`}>{props.name}</Link>
</Card.Title>

                <Card.Img variant="top" src={props.flag} alt={props.name}  style={{maxWidth: '200px'}}/>
            </Card.Body>
        </Card>
            
            </Col>
        </Row>

    );

};

export default CountryCard;
