import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from'react-bootstrap';

const CountryCard = (props) => {
  return (
<Container className="px-3 mt-4">
      <Row>
        <Col>
          <Card className="country-card m-1">
            <div className="ratio ratio-16x9">
              <Card.Img variant="top" src={props.flag} />
            </div>
            <Card.Body>
              <Card.Title>
                <Link to={`/country/${props.name}`} className="country-link">{props.name}</Link>
              </Card.Title>
              <Card.Text>{props.region}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CountryCard;
