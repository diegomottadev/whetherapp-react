import PropTypes from 'prop-types';
import './CityName.css';

const CityName = ({ id, name }) => (
  <h2 id={id} className="CityName">
    {name}
  </h2>
);

CityName.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default CityName;
