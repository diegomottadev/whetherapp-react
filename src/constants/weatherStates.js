// Each state groups one or more values of weather[0].main from OpenWeatherMap.
// icon is a name from the weather-icons set, without the "wi-" prefix.
// To support a new condition, add it to conditions or add a new entry.
export const WEATHER_STATES = [
  { key: 'clear', conditions: ['Clear'], icon: 'day-sunny', label: 'Clear' },
  { key: 'clouds', conditions: ['Clouds'], icon: 'cloudy', label: 'Cloudy' },
  { key: 'rain', conditions: ['Rain', 'Drizzle'], icon: 'rain', label: 'Rain' },
  { key: 'thunderstorm', conditions: ['Thunderstorm'], icon: 'thunderstorm', label: 'Thunderstorm' },
  { key: 'snow', conditions: ['Snow'], icon: 'snow', label: 'Snow' },
  {
    key: 'fog',
    conditions: ['Mist', 'Fog', 'Haze', 'Smoke', 'Dust', 'Sand', 'Ash'],
    icon: 'fog',
    label: 'Fog',
  },
  { key: 'windy', conditions: ['Squall', 'Tornado'], icon: 'strong-wind', label: 'Strong wind' },
];

// Used when the API sends a condition that isn't in the list above.
export const UNKNOWN_WEATHER_STATE = { key: 'unknown', conditions: [], icon: 'na', label: 'No data' };
