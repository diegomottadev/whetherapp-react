import PropTypes from 'prop-types';
import { formatHumidity, formatWind } from '../../utils/format';
import './WeatherExtraData.css';

const WeatherExtraData = ({ humidity, windSpeed }) => (
  <dl className="WeatherExtraData">
    <div className="WeatherExtraData-row">
      <dt>Humidity</dt>
      <dd>{formatHumidity(humidity)}</dd>
    </div>
    <div className="WeatherExtraData-row">
      <dt>Wind</dt>
      <dd>{formatWind(windSpeed)}</dd>
    </div>
  </dl>
);

WeatherExtraData.propTypes = {
  humidity: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
};

export default WeatherExtraData;
