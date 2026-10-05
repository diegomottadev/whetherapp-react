import PropTypes from 'prop-types';
import WeatherIcon from '../WeatherIcon';
import Temperature from '../Temperature';
import withWeatherState from '../../hocs/withWeatherState';
import './WeatherSummary.css';

// Icon, temperature and description. withWeatherState turns the API condition into icon and label.
export const WeatherSummary = ({ temperature, icon, label }) => (
  <div className="WeatherSummary">
    <WeatherIcon name={icon} />
    <p className="WeatherSummary-reading">
      <Temperature celsius={temperature} />
      <span className="WeatherSummary-label">{label}</span>
    </p>
  </div>
);

WeatherSummary.propTypes = {
  temperature: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default withWeatherState(WeatherSummary);
