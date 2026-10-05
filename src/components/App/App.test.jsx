import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { act, fireEvent, screen, within } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from '../../test-utils';
import { STATUS } from '../../constants/status';
import { CITIES } from '../../constants/cities';

const [first, second] = CITIES;

const cloudy = { main: { temp: 18.6, humidity: 72 }, wind: { speed: 4.1 }, weather: [{ main: 'Clouds' }] };
const rainy = { main: { temp: 12.2, humidity: 88 }, wind: { speed: 2.6 }, weather: [{ main: 'Rain' }] };

const okResponse = body => ({ ok: true, status: 200, json: () => Promise.resolve(body) });
const errorResponse = status => ({ ok: false, status, json: () => Promise.resolve({}) });

// Finds which place a request is for, from the lat param in its URL.
const placeOf = url => {
  const lat = Number(new URL(url).searchParams.get('lat'));
  return CITIES.find(city => city.lat === lat);
};

// The first place gets cloudy weather and every other place gets rain.
const weatherFor = url => (placeOf(url) === first ? cloudy : rainy);

// Each card is an <article> named after its heading.
const card = city => screen.getByRole('article', { name: city.name });

beforeEach(() => {
  vi.stubEnv('VITE_OPENWEATHER_KEY', 'test-key');
  vi.stubGlobal('fetch', vi.fn(url => Promise.resolve(okResponse(weatherFor(url)))));
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('App', () => {
  test('shows a skeleton per place while loading, then the weather', async () => {
    renderWithProviders(<App />);

    expect(screen.getAllByRole('article')).toHaveLength(CITIES.length);
    expect(within(card(first)).getByRole('status')).toHaveTextContent('Loading the weather');
    expect(card(first)).toHaveAttribute('aria-busy', 'true');

    expect(await within(card(first)).findByText('Cloudy')).toBeInTheDocument();
    expect(within(card(first)).getByText(first.country)).toBeInTheDocument();
    expect(within(card(first)).getByText('19')).toBeInTheDocument();
    expect(within(card(first)).getByText('72 %')).toBeInTheDocument();
    expect(within(card(first)).getByText('4.1 m/s')).toBeInTheDocument();
    expect(card(first)).toHaveAttribute('aria-busy', 'false');

    expect(within(card(second)).getByText('Rain')).toBeInTheDocument();
    expect(within(card(second)).getByText('12')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(CITIES.length);
  });

  test('asks for each place by its coordinates', async () => {
    renderWithProviders(<App />);
    await within(card(first)).findByText('Cloudy');

    const requested = fetch.mock.calls.map(([url]) => placeOf(url));
    expect(requested).toEqual(CITIES);
  });

  test('shows an error only on the place that failed', async () => {
    fetch.mockImplementation(url =>
      Promise.resolve(placeOf(url) === second ? errorResponse(404) : okResponse(weatherFor(url)))
    );
    renderWithProviders(<App />);

    const alert = await within(card(second)).findByRole('alert');
    expect(alert).toHaveTextContent("Couldn't find this place.");
    expect(within(card(first)).getByText('Cloudy')).toBeInTheDocument();
  });

  test('retry loads the weather again for that place only', async () => {
    fetch.mockImplementation(url =>
      Promise.resolve(placeOf(url) === second ? errorResponse(503) : okResponse(weatherFor(url)))
    );
    renderWithProviders(<App />);
    await within(card(second)).findByRole('alert');

    fetch.mockImplementation(url => Promise.resolve(okResponse(weatherFor(url))));
    fireEvent.click(within(card(second)).getByRole('button', { name: 'Try again' }));

    expect(within(card(second)).getByRole('status')).toBeInTheDocument();
    expect(await within(card(second)).findByText('Rain')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(CITIES.length + 1);
    expect(placeOf(fetch.mock.calls[CITIES.length][0])).toBe(second);
  });

  test('shows the error when the API key is missing', async () => {
    vi.stubEnv('VITE_OPENWEATHER_KEY', '');
    renderWithProviders(<App />);

    expect(await within(card(first)).findByRole('alert')).toHaveTextContent('VITE_OPENWEATHER_KEY');
    expect(fetch).not.toHaveBeenCalled();
  });

  test('cancels pending requests on unmount and ignores late responses', async () => {
    const pending = [];
    fetch.mockImplementation(
      (url, { signal }) => new Promise(resolve => pending.push({ resolve, signal, body: weatherFor(url) }))
    );
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { unmount, store } = renderWithProviders(<App />);

    unmount();
    expect(pending).toHaveLength(CITIES.length);
    expect(pending.every(request => request.signal.aborted)).toBe(true);

    // A response that was already on its way must not update an unmounted component.
    await act(async () => {
      pending.forEach(request => request.resolve(okResponse(request.body)));
    });
    expect(consoleError).not.toHaveBeenCalled();

    // Cancelled requests go back to idle, so mounting again starts new requests.
    const statuses = Object.values(store.getState().weather.byCity).map(entry => entry.status);
    expect(statuses.every(status => status === STATUS.IDLE)).toBe(true);
  });

  test('loads again when it mounts a second time with the same store', async () => {
    fetch.mockImplementationOnce(() => new Promise(() => {}));
    const { unmount, store } = renderWithProviders(<App />);
    unmount();

    renderWithProviders(<App />, { store });

    expect(await within(card(first)).findByText('Cloudy')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(CITIES.length * 2);
  });

  test('footer links: external ones open in a new tab, the Redux explanation stays in this tab', () => {
    renderWithProviders(<App />);

    const footer = within(screen.getByRole('contentinfo'));
    const explanation = footer.getByRole('link', { name: 'How Redux works here' });
    expect(explanation).toHaveAttribute('href', '/explanation-redux/');
    expect(explanation).not.toHaveAttribute('target');

    const external = footer.getAllByRole('link').filter(link => link !== explanation);
    expect(external).toHaveLength(3);
    external.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
