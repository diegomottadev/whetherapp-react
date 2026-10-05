import PropTypes from 'prop-types';
import WeatherCard from '../WeatherCard';
import EmptyState from '../EmptyState';
import { cityPropType, cityWeatherPropType } from '../../types/weather';
import './WeatherList.css';

const WeatherList = ({ cities, weatherByCity, onRetry }) => {
  if (cities.length === 0) {
    return <EmptyState>There are no cities to show yet.</EmptyState>;
  }
  return (
    <ul className="WeatherList">
      {cities.map(city => (
        <li key={city.id} className="WeatherList-item">
          <WeatherCard
            city={city}
            cityWeather={weatherByCity[city.id]}
            onRetry={() => onRetry(city)}
          />
        </li>
      ))}
    </ul>
  );
};

WeatherList.propTypes = {
  cities: PropTypes.arrayOf(cityPropType).isRequired,
  weatherByCity: PropTypes.objectOf(cityWeatherPropType).isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default WeatherList;
