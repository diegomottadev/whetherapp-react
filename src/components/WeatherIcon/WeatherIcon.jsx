import PropTypes from 'prop-types';
import './WeatherIcon.css';

// The "wi" classes come from the weather-icons stylesheet linked in index.html.
const WeatherIcon = ({ name }) => <i className={`WeatherIcon wi wi-${name}`} aria-hidden="true" />;

WeatherIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default WeatherIcon;
