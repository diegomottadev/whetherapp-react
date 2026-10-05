const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Messages for the status codes OpenWeatherMap documents. Anything else shows the code.
const ERROR_MESSAGES = {
  401: "The API key isn't valid or has expired.",
  404: "Couldn't find this place.",
  429: 'Too many requests. Try again in a few minutes.',
};

const buildWeatherUrl = ({ lat, lon }, apiKey) => {
  const params = new URLSearchParams({ lat, lon, appid: apiKey, units: 'metric', lang: 'en' });
  return `${BASE_URL}?${params}`;
};

/**
 * Gets the current weather for one place from OpenWeatherMap.
 * @param {{lat: number, lon: number}} coords - Latitude and longitude in decimal degrees.
 * @param {{signal?: AbortSignal}} [options] - Pass a signal to cancel the request.
 * @returns {Promise<Object>} Raw API response, with temperatures in °C.
 *   Rejects if the API key is missing, the request fails or the status isn't 2xx.
 */
export const fetchCurrentWeather = (coords, { signal } = {}) => {
  // Read the key on every call so tests can set it after importing this module.
  const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
  if (!apiKey) {
    return Promise.reject(new Error('The API key is missing (VITE_OPENWEATHER_KEY).'));
  }
  return fetch(buildWeatherUrl(coords, apiKey), { signal }).then(response => {
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES[response.status] || `Server error (HTTP ${response.status}).`);
    }
    return response.json();
  });
};
