import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
const CountryCard = (props) => {
    return (
      <Card className="country-card">
        <Card.Img variant="top" src={props.flag} />
        <Card.Body>
          <Card.Title>
            <Link to={`/country/${props.name}`} className="country-link">{props.name}</Link>
          </Card.Title>
          <Card.Text>{props.region}</Card.Text>
        </Card.Body>
      </Card>
    );
  };
export default CountryCard