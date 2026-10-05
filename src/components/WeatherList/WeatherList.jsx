import PropTypes from 'prop-types';
import WeatherCard from '../WeatherCard';
import withEmptyState from '../../hocs/withEmptyState';
import { cityPropType, cityWeatherPropType } from '../../types/weather';
import './WeatherList.css';

export const WeatherList = ({ cities, weatherByCity, onRetry }) => (
  <ul className="WeatherList">
    {cities.map(city => (
      <li key={city.id} className="WeatherList-item">
        <WeatherCard city={city} cityWeather={weatherByCity[city.id]} onRetry={() => onRetry(city)} />
      </li>
    ))}
  </ul>
);

WeatherList.propTypes = {
  cities: PropTypes.arrayOf(cityPropType).isRequired,
  weatherByCity: PropTypes.objectOf(cityWeatherPropType).isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default withEmptyState(
  ({ cities }) => cities.length === 0,
  'There are no places to show yet.'
)(WeatherList);
