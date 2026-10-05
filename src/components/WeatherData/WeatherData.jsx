import WeatherSummary from '../WeatherSummary';
import WeatherStats from '../WeatherStats';
import { weatherPropType } from '../../types/weather';
import './WeatherData.css';

const WeatherData = ({ weather }) => (
  <div className="WeatherData">
    <WeatherSummary temperature={weather.temperature} condition={weather.condition} />
    <WeatherStats weather={weather} />
  </div>
);

WeatherData.propTypes = {
  weather: weatherPropType.isRequired,
};

export default WeatherData;
