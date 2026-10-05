import PropTypes from 'prop-types';
import { STATUS } from '../constants/status';

export const cityPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
});

export const weatherPropType = PropTypes.shape({
  temperature: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  condition: PropTypes.string,
});

export const cityWeatherPropType = PropTypes.shape({
  status: PropTypes.oneOf(Object.values(STATUS)).isRequired,
  weather: weatherPropType,
  error: PropTypes.string,
  requestId: PropTypes.string,
});
