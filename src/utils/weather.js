import { WEATHER_STATES, UNKNOWN_WEATHER_STATE } from '../constants/weatherStates';

/**
 * Finds the icon and label for a condition from the API.
 * @param {string} [condition] - Value of weather[0].main, for example "Clouds".
 * @returns {{key: string, icon: string, label: string}} UNKNOWN_WEATHER_STATE if there's no match.
 */
export const getWeatherState = condition =>
  WEATHER_STATES.find(state => state.conditions.includes(condition)) || UNKNOWN_WEATHER_STATE;

/**
 * Keeps only the fields the UI uses from an OpenWeatherMap response.
 * @param {Object} apiData - Response from fetchCurrentWeather.
 * @returns {{temperature: number, humidity: number, windSpeed: number, condition: (string|undefined)}}
 */
export const toWeather = apiData => {
  const { main, wind, weather } = apiData;
  return {
    temperature: main.temp,
    humidity: main.humidity,
    windSpeed: wind.speed,
    condition: weather && weather[0] ? weather[0].main : undefined,
  };
};
