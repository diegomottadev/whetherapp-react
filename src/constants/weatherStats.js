import { formatHumidity, formatWind } from '../utils/format';

// Extra data shown under the temperature. field is a key of the weather object from toWeather.
// To show another value, add an entry here (and the field in toWeather if it's new).
export const WEATHER_STATS = [
  { field: 'humidity', label: 'Humidity', format: formatHumidity },
  { field: 'windSpeed', label: 'Wind', format: formatWind },
];
