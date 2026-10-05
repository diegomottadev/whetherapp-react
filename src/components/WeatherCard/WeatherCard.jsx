import PropTypes from 'prop-types';
import CityName from '../CityName';
import WeatherData from '../WeatherData';
import WeatherSkeleton from '../WeatherSkeleton';
import withLoading from '../../hocs/withLoading';
import withError from '../../hocs/withError';
import { STATUS } from '../../constants/status';
import { cityPropType, cityWeatherPropType } from '../../types/weather';
import './WeatherCard.css';

// withError runs first, so a failed request never reaches the loading check.
const WeatherBody = withError(withLoading(WeatherSkeleton)(WeatherData));

const WeatherCard = ({ city, cityWeather, onRetry }) => {
  const headingId = `city-${city.id}`;
  // idle shows the skeleton too: the request starts right after the first render.
  const isLoading = cityWeather.status === STATUS.IDLE || cityWeather.status === STATUS.LOADING;
  return (
    <article className="WeatherCard" aria-labelledby={headingId} aria-busy={isLoading}>
      <CityName id={headingId} name={city.name} country={city.country} />
      {/* polite: screen readers read the new weather once it loads, without cutting in. */}
      <div className="WeatherCard-body" aria-live="polite">
        <WeatherBody
          isLoading={isLoading}
          error={cityWeather.status === STATUS.ERROR ? cityWeather.error : null}
          onRetry={onRetry}
          weather={cityWeather.weather}
        />
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
