import WeatherTemperature from '../WeatherTemperature';
import WeatherExtraData from '../WeatherExtraData';
import { getWeatherState } from '../../utils/weather';
import { weatherPropType } from '../../types/weather';
import './WeatherData.css';

const WeatherData = ({ weather }) => {
  const { icon, label } = getWeatherState(weather.condition);
  return (
    <div className="WeatherData">
      <WeatherTemperature temperature={weather.temperature} icon={icon} label={label} />
      <WeatherExtraData humidity={weather.humidity} windSpeed={weather.windSpeed} />
    </div>
  );
};

WeatherData.propTypes = {
  weather: weatherPropType.isRequired,
};

export default WeatherData;
