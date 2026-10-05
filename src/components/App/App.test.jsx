import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

const weatherFor = {
  'Buenos Aires,ar': { main: { temp: 18.6, humidity: 72 }, wind: { speed: 4.1 }, weather: [{ main: 'Clouds' }] },
  'Bogota,co': { main: { temp: 12.2, humidity: 88 }, wind: { speed: 2.6 }, weather: [{ main: 'Rain' }] },
};

const okResponse = body => ({ ok: true, status: 200, json: () => Promise.resolve(body) });
const errorResponse = status => ({ ok: false, status, json: () => Promise.resolve({}) });
const queryOf = url => new URL(url).searchParams.get('q');

// Each card is an <article> named after its city heading.
const card = name => screen.getByRole('article', { name });

beforeEach(() => {
  vi.stubEnv('VITE_OPENWEATHER_KEY', 'test-key');
  vi.stubGlobal('fetch', vi.fn(url => Promise.resolve(okResponse(weatherFor[queryOf(url)]))));
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('App', () => {
  test('shows a skeleton per city while loading, then the weather', async () => {
    render(<App />);

    expect(within(card('Buenos Aires')).getByRole('status')).toHaveTextContent('Loading the weather');
    expect(card('Buenos Aires')).toHaveAttribute('aria-busy', 'true');

    expect(await within(card('Buenos Aires')).findByText('Cloudy')).toBeInTheDocument();
    expect(within(card('Buenos Aires')).getByText('19')).toBeInTheDocument();
    expect(within(card('Buenos Aires')).getByText('72 %')).toBeInTheDocument();
    expect(within(card('Buenos Aires')).getByText('4.1 m/s')).toBeInTheDocument();
    expect(card('Buenos Aires')).toHaveAttribute('aria-busy', 'false');

    expect(within(card('Bogotá')).getByText('Rain')).toBeInTheDocument();
    expect(within(card('Bogotá')).getByText('12')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test('shows an error only on the city that failed', async () => {
    fetch.mockImplementation(url =>
      Promise.resolve(queryOf(url) === 'Bogota,co' ? errorResponse(404) : okResponse(weatherFor[queryOf(url)]))
    );
    render(<App />);

    const alert = await within(card('Bogotá')).findByRole('alert');
    expect(alert).toHaveTextContent("Couldn't find this city.");
    expect(within(card('Buenos Aires')).getByText('Cloudy')).toBeInTheDocument();
  });

  test('retry loads the weather again for that city only', async () => {
    fetch.mockImplementation(url =>
      Promise.resolve(queryOf(url) === 'Bogota,co' ? errorResponse(503) : okResponse(weatherFor[queryOf(url)]))
    );
    render(<App />);
    await within(card('Bogotá')).findByRole('alert');

    fetch.mockImplementation(url => Promise.resolve(okResponse(weatherFor[queryOf(url)])));
    fireEvent.click(within(card('Bogotá')).getByRole('button', { name: 'Try again' }));

    expect(within(card('Bogotá')).getByRole('status')).toBeInTheDocument();
    expect(await within(card('Bogotá')).findByText('Rain')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(queryOf(fetch.mock.calls[2][0])).toBe('Bogota,co');
  });

  test('shows the error when the API key is missing', async () => {
    vi.stubEnv('VITE_OPENWEATHER_KEY', '');
    render(<App />);

    expect(await within(card('Buenos Aires')).findByRole('alert')).toHaveTextContent('VITE_OPENWEATHER_KEY');
    expect(fetch).not.toHaveBeenCalled();
  });

  test('cancels pending requests on unmount and ignores late responses', async () => {
    const pending = [];
    fetch.mockImplementation(
      (url, { signal }) =>
        new Promise(resolve => pending.push({ resolve, signal, body: weatherFor[queryOf(url)] }))
    );
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { unmount } = render(<App />);

    unmount();
    expect(pending.map(request => request.signal.aborted)).toEqual([true, true]);

    // A response that was already on its way must not update an unmounted component.
    await act(async () => {
      pending.forEach(request => request.resolve(okResponse(request.body)));
    });
    expect(consoleError).not.toHaveBeenCalled();
  });

  test('has credit links that open in a new tab', () => {
    render(<App />);

    const links = within(screen.getByRole('contentinfo')).getAllByRole('link');
    expect(links).toHaveLength(3);
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
