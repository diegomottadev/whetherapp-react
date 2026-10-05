import PropTypes from 'prop-types';
import CityName from '../CityName';
import WeatherData from '../WeatherData';
import WeatherSkeleton from '../WeatherSkeleton';
import ErrorMessage from '../ErrorMessage';
import { STATUS } from '../../constants/status';
import { cityPropType, cityWeatherPropType } from '../../types/weather';
import './WeatherCard.css';

const renderBody = (cityWeather, onRetry) => {
  switch (cityWeather.status) {
    case STATUS.SUCCESS:
      return <WeatherData weather={cityWeather.weather} />;
    case STATUS.ERROR:
      return <ErrorMessage message={cityWeather.error} onRetry={onRetry} />;
    default:
      return <WeatherSkeleton />;
  }
};

const WeatherCard = ({ city, cityWeather, onRetry }) => {
  const headingId = `city-${city.id}`;
  return (
    <article
      className="WeatherCard"
      aria-labelledby={headingId}
      aria-busy={cityWeather.status === STATUS.LOADING}
    >
      <CityName id={headingId} name={city.name} />
      {/* polite: screen readers read the new weather once it loads, without cutting in. */}
      <div className="WeatherCard-body" aria-live="polite">
        {renderBody(cityWeather, onRetry)}
      </div>
    </article>
  );
};

WeatherCard.propTypes = {
  city: cityPropType.isRequired,
  cityWeather: cityWeatherPropType.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default WeatherCard;
