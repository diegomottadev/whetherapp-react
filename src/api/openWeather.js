const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Messages for the status codes OpenWeatherMap documents. Anything else shows the code.
const ERROR_MESSAGES = {
  401: "The API key isn't valid or has expired.",
  404: "Couldn't find this city.",
  429: 'Too many requests. Try again in a few minutes.',
};

const buildWeatherUrl = (query, apiKey) => {
  const params = new URLSearchParams({ q: query, appid: apiKey, units: 'metric', lang: 'en' });
  return `${BASE_URL}?${params}`;
};

/**
 * Gets the current weather for one city from OpenWeatherMap.
 * @param {string} query - City in "City,country" format, for example "Bogota,co".
 * @param {{signal?: AbortSignal}} [options] - Pass a signal to cancel the request.
 * @returns {Promise<Object>} Raw API response, with temperatures in °C.
 *   Rejects if the API key is missing, the request fails or the status isn't 2xx.
 */
export const fetchCurrentWeather = (query, { signal } = {}) => {
  // Read the key on every call so tests can set it after importing this module.
  const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
  if (!apiKey) {
    return Promise.reject(new Error('The API key is missing (VITE_OPENWEATHER_KEY).'));
  }
  return fetch(buildWeatherUrl(query, apiKey), { signal }).then(response => {
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES[response.status] || `Server error (HTTP ${response.status}).`);
    }
    return response.json();
  });
};
