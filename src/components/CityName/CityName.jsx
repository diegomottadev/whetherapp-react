import PropTypes from 'prop-types';
import './CityName.css';

const CityName = ({ id, name, country }) => (
  <header className="CityName">
    <h2 id={id} className="CityName-name">
      {name}
    </h2>
    <p className="CityName-country">{country}</p>
  </header>
);

CityName.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default CityName;
