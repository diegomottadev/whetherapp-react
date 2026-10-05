import { useState, useEffect, useRef, useCallback } from 'react';
import WeatherList from '../WeatherList';
import Footer from '../Footer';
import { fetchCurrentWeather } from '../../api/openWeather';
import { toWeather } from '../../utils/weather';
import { CITIES } from '../../constants/cities';
import { CREDIT_LINKS } from '../../constants/links';
import { STATUS } from '../../constants/status';
import './App.css';

const LOADING_ENTRY = { status: STATUS.LOADING, weather: null, error: null };

const buildInitialState = () =>
  CITIES.reduce((state, city) => ({ ...state, [city.id]: LOADING_ENTRY }), {});

// The only component with state. Every other component gets its data through props.
// weatherByCity has one entry per city id: { status, weather, error }.
function App() {
  const [weatherByCity, setWeatherByCity] = useState(buildInitialState);
  // One AbortController per city id, so a retry cancels the request it replaces.
  const controllers = useRef({});

  const setCityEntry = (cityId, entry) =>
    setWeatherByCity(previous => ({ ...previous, [cityId]: entry }));

  const loadCity = useCallback(city => {
    const previous = controllers.current[city.id];
    if (previous) {
      previous.abort();
    }
    const controller = new AbortController();
    controllers.current[city.id] = controller;

    setCityEntry(city.id, LOADING_ENTRY);
    fetchCurrentWeather(city.query, { signal: controller.signal })
      .then(data => {
        // A response can still arrive after abort() if it was already on its way. Drop it.
        if (controller.signal.aborted) {
          return;
        }
        setCityEntry(city.id, { status: STATUS.SUCCESS, weather: toWeather(data), error: null });
      })
      .catch(error => {
        if (controller.signal.aborted) {
          return;
        }
        setCityEntry(city.id, { status: STATUS.ERROR, weather: null, error: error.message });
      });
  }, []);

  useEffect(() => {
    CITIES.forEach(loadCity);
    const current = controllers.current;
    return () => Object.values(current).forEach(controller => controller.abort());
  }, [loadCity]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Weather</h1>
        <p className="App-subtitle">What the weather is like right now in each city</p>
      </header>
      <main className="App-main">
        <WeatherList cities={CITIES} weatherByCity={weatherByCity} onRetry={loadCity} />
      </main>
      <Footer links={CREDIT_LINKS} />
    </div>
  );
}

export default App;
