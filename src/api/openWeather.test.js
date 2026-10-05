import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fetchCurrentWeather } from './openWeather';

const okResponse = body => ({ ok: true, status: 200, json: () => Promise.resolve(body) });
const errorResponse = status => ({ ok: false, status, json: () => Promise.resolve({}) });

beforeEach(() => {
  vi.stubEnv('VITE_OPENWEATHER_KEY', 'test-key');
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(okResponse({ main: {} }))));
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('fetchCurrentWeather', () => {
  test('calls the API over https with the coordinates', async () => {
    await fetchCurrentWeather({ lat: -16.1657, lon: -69.0854 });

    const url = new URL(fetch.mock.calls[0][0]);
    expect(url.origin + url.pathname).toBe('https://api.openweathermap.org/data/2.5/weather');
    expect(url.searchParams.get('lat')).toBe('-16.1657');
    expect(url.searchParams.get('lon')).toBe('-69.0854');
    expect(url.searchParams.get('appid')).toBe('test-key');
    expect(url.searchParams.get('units')).toBe('metric');
    expect(url.searchParams.get('lang')).toBe('en');
    expect(url.searchParams.has('q')).toBe(false);
  });

  test('encodes the API key, so a stray & in it cannot add params', async () => {
    vi.stubEnv('VITE_OPENWEATHER_KEY', 'abc&units=imperial');
    await fetchCurrentWeather({ lat: 1, lon: 2 });

    const url = new URL(fetch.mock.calls[0][0]);
    expect(url.searchParams.get('appid')).toBe('abc&units=imperial');
    expect(url.searchParams.getAll('units')).toEqual(['metric']);
  });

  test('passes the abort signal to fetch', async () => {
    const controller = new AbortController();
    await fetchCurrentWeather({ lat: 1, lon: 2 }, { signal: controller.signal });

    expect(fetch.mock.calls[0][1]).toEqual({ signal: controller.signal });
  });

  test('resolves with the JSON body', async () => {
    fetch.mockResolvedValueOnce(okResponse({ main: { temp: 20 } }));

    await expect(fetchCurrentWeather({ lat: 1, lon: 2 })).resolves.toEqual({ main: { temp: 20 } });
  });

  test('rejects without calling fetch when the API key is missing', async () => {
    vi.stubEnv('VITE_OPENWEATHER_KEY', '');

    await expect(fetchCurrentWeather({ lat: 1, lon: 2 })).rejects.toThrow('VITE_OPENWEATHER_KEY');
    expect(fetch).not.toHaveBeenCalled();
  });

  test.each([
    [401, "The API key isn't valid or has expired."],
    [404, "Couldn't find this place."],
    [429, 'Too many requests. Try again in a few minutes.'],
    [503, 'Server error (HTTP 503).'],
  ])('rejects with a readable message on HTTP %i', async (status, message) => {
    fetch.mockResolvedValueOnce(errorResponse(status));

    await expect(fetchCurrentWeather({ lat: 1, lon: 2 })).rejects.toThrow(message);
  });

  test('passes network errors through', async () => {
    fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(fetchCurrentWeather({ lat: 1, lon: 2 })).rejects.toThrow('Failed to fetch');
  });
});
