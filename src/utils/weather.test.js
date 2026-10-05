import { describe, expect, test } from 'vitest';
import { getWeatherState, toWeather } from './weather';
import { UNKNOWN_WEATHER_STATE, WEATHER_STATES } from '../constants/weatherStates';

describe('getWeatherState', () => {
  // Built from the config, so a new entry in WEATHER_STATES is tested without editing this file.
  const cases = WEATHER_STATES.flatMap(state =>
    state.conditions.map(condition => [condition, state.key])
  );

  test.each(cases)('maps %s to %s', (condition, key) => {
    expect(getWeatherState(condition).key).toBe(key);
  });

  test('returns the unknown state for a condition that is not in the config', () => {
    expect(getWeatherState('Volcano')).toBe(UNKNOWN_WEATHER_STATE);
    expect(getWeatherState(undefined)).toBe(UNKNOWN_WEATHER_STATE);
  });
});

describe('toWeather', () => {
  const apiData = {
    main: { temp: 21.4, humidity: 60, pressure: 1012 },
    wind: { speed: 3.6, deg: 90 },
    weather: [{ main: 'Clouds', description: 'nubes' }],
    name: 'Bogotá',
  };

  test('keeps only the fields the UI uses', () => {
    expect(toWeather(apiData)).toEqual({
      temperature: 21.4,
      humidity: 60,
      windSpeed: 3.6,
      condition: 'Clouds',
    });
  });

  test('leaves condition undefined when the weather list is missing or empty', () => {
    expect(toWeather({ ...apiData, weather: [] }).condition).toBeUndefined();
    expect(toWeather({ ...apiData, weather: undefined }).condition).toBeUndefined();
  });
});
