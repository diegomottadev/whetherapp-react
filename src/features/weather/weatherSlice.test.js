import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import reducer, { fetchWeather, selectCityWeather, selectWeatherByCity } from './weatherSlice';
import { setupStore } from '../../store';
import { CITIES } from '../../constants/cities';
import { STATUS } from '../../constants/status';

const [city] = CITIES;
const apiResponse = { main: { temp: 20, humidity: 50 }, wind: { speed: 3 }, weather: [{ main: 'Clear' }] };
const weather = { temperature: 20, humidity: 50, windSpeed: 3, condition: 'Clear' };

// Builds the actions createAsyncThunk would dispatch, so the reducer can be tested on its own.
const pending = requestId => fetchWeather.pending(requestId, city);
const fulfilled = requestId => fetchWeather.fulfilled(weather, requestId, city);
const rejected = (requestId, message, aborted = false) => {
  const error = new Error(message);
  if (aborted) {
    error.name = 'AbortError';
  }
  const action = fetchWeather.rejected(error, requestId, city);
  action.meta.aborted = aborted;
  return action;
};

const entryAfter = actions => {
  const state = actions.reduce(reducer, undefined);
  return selectCityWeather({ weather: state }, city.id);
};

describe('weather reducer', () => {
  test('starts every city as idle', () => {
    const byCity = selectWeatherByCity({ weather: reducer(undefined, { type: 'init' }) });
    expect(Object.keys(byCity)).toEqual(CITIES.map(({ id }) => id));
    expect(Object.values(byCity).every(entry => entry.status === STATUS.IDLE)).toBe(true);
  });

  test('pending then fulfilled stores the weather', () => {
    expect(entryAfter([pending('a')])).toMatchObject({ status: STATUS.LOADING, requestId: 'a' });
    expect(entryAfter([pending('a'), fulfilled('a')])).toEqual({
      status: STATUS.SUCCESS,
      weather,
      error: null,
      requestId: null,
    });
  });

  test('rejected stores the error message', () => {
    expect(entryAfter([pending('a'), rejected('a', 'Server error (HTTP 503).')])).toMatchObject({
      status: STATUS.ERROR,
      error: 'Server error (HTTP 503).',
    });
  });

  test('uses a fallback when the error has no message', () => {
    expect(entryAfter([pending('a'), rejected('a', '')]).error).toBe('Something went wrong.');
  });

  test('ignores an older request that finishes after a newer one started', () => {
    const entry = entryAfter([pending('old'), pending('new'), fulfilled('old')]);
    expect(entry).toMatchObject({ status: STATUS.LOADING, requestId: 'new' });
  });

  test('goes back to idle when the request is aborted', () => {
    expect(entryAfter([pending('a'), rejected('a', 'Aborted', true)]).status).toBe(STATUS.IDLE);
  });

  test('selectCityWeather returns idle for an unknown city', () => {
    expect(selectCityWeather({ weather: reducer(undefined, { type: 'init' }) }, 'atlantis').status).toBe(
      STATUS.IDLE
    );
  });
});

describe('fetchWeather thunk', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_OPENWEATHER_KEY', 'test-key');
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(apiResponse) })));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  test('fetches and stores the mapped weather', async () => {
    const store = setupStore();
    await store.dispatch(fetchWeather(city));

    expect(selectCityWeather(store.getState(), city.id)).toMatchObject({ status: STATUS.SUCCESS, weather });
  });

  test('stores the API error message', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 404, json: () => Promise.resolve({}) });
    const store = setupStore();
    await store.dispatch(fetchWeather(city));

    expect(selectCityWeather(store.getState(), city.id)).toMatchObject({
      status: STATUS.ERROR,
      error: "Couldn't find this place.",
    });
  });

  test('when 2 requests overlap, only the newer one writes', async () => {
    let resolveOld;
    fetch.mockImplementationOnce(() => new Promise(resolve => (resolveOld = resolve)));
    fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ ...apiResponse, main: { temp: 30, humidity: 10 } }) })
    );
    const store = setupStore();
    const older = store.dispatch(fetchWeather(city));
    await store.dispatch(fetchWeather(city));

    resolveOld({ ok: true, status: 200, json: () => Promise.resolve(apiResponse) });
    await older;

    expect(selectCityWeather(store.getState(), city.id).weather.temperature).toBe(30);
  });

  test('abort() cancels the request and leaves the city idle', async () => {
    fetch.mockImplementationOnce((url, { signal }) => new Promise((resolve, reject) => {
      signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    }));
    const store = setupStore();
    const request = store.dispatch(fetchWeather(city));
    request.abort();
    await request;

    expect(fetch.mock.calls[0][1].signal.aborted).toBe(true);
    expect(selectCityWeather(store.getState(), city.id).status).toBe(STATUS.IDLE);
  });
});
