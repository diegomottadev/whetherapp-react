import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header';
import WeatherList from '../WeatherList';
import Footer from '../Footer';
import { fetchWeather, selectWeatherByCity } from '../../features/weather/weatherSlice';
import { CITIES } from '../../constants/cities';
import { FOOTER_LINKS } from '../../constants/links';
import './App.css';

// The only component that talks to the Redux store. Every other component gets props.
function App() {
  const dispatch = useDispatch();
  const weatherByCity = useSelector(selectWeatherByCity);
  // The last dispatched request per city id. Each one has abort(), from createAsyncThunk.
  const requests = useRef({});

  const loadCity = useCallback(
    city => {
      const previous = requests.current[city.id];
      if (previous) {
        previous.abort();
      }
      requests.current[city.id] = dispatch(fetchWeather(city));
    },
    [dispatch]
  );

  useEffect(() => {
    CITIES.forEach(loadCity);
    const current = requests.current;
    return () => Object.values(current).forEach(request => request.abort());
  }, [loadCity]);

  return (
    <div className="App">
      <Header title="Weather" subtitle="What the weather is like right now in places I've visited" />
      <main className="App-main">
        <WeatherList cities={CITIES} weatherByCity={weatherByCity} onRetry={loadCity} />
      </main>
      <Footer links={FOOTER_LINKS} />
    </div>
  );
}

export default App;
