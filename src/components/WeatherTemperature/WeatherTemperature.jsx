import PropTypes from 'prop-types';
import WeatherIcon from '../WeatherIcon';
import { formatTemperature } from '../../utils/format';
import './WeatherTemperature.css';

const WeatherTemperature = ({ temperature, icon, label }) => (
  <div className="WeatherTemperature">
    <WeatherIcon name={icon} />
    <p className="WeatherTemperature-reading">
      <span className="WeatherTemperature-value">{formatTemperature(temperature)}</span>
      <span className="WeatherTemperature-unit">°C</span>
      <span className="WeatherTemperature-label">{label}</span>
    </p>
  </div>
);

WeatherTemperature.propTypes = {
  temperature: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default WeatherTemperature;
