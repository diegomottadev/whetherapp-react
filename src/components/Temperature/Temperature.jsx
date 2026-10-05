import PropTypes from 'prop-types';
import { formatTemperature } from '../../utils/format';
import './Temperature.css';

const Temperature = ({ celsius }) => (
  <span className="Temperature">
    <span className="Temperature-value">{formatTemperature(celsius)}</span>
    <span className="Temperature-unit">°C</span>
  </span>
);

Temperature.propTypes = {
  celsius: PropTypes.number.isRequired,
};

export default Temperature;
