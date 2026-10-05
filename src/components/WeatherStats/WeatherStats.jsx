import PropTypes from 'prop-types';
import Stat from '../Stat';
import { WEATHER_STATS } from '../../constants/weatherStats';
import { weatherPropType } from '../../types/weather';
import './WeatherStats.css';

const WeatherStats = ({ weather, stats = WEATHER_STATS }) => (
  <dl className="WeatherStats">
    {stats.map(({ field, label, format }) => (
      <Stat key={field} label={label} value={format(weather[field])} />
    ))}
  </dl>
);

WeatherStats.propTypes = {
  weather: weatherPropType.isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      format: PropTypes.func.isRequired,
    })
  ),
};

export default WeatherStats;
