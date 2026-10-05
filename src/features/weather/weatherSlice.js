import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCurrentWeather } from '../../api/openWeather';
import { toWeather } from '../../utils/weather';
import { CITIES } from '../../constants/cities';
import { STATUS } from '../../constants/status';

const FALLBACK_ERROR = 'Something went wrong.';

const idleEntry = { status: STATUS.IDLE, weather: null, error: null, requestId: null };

// One entry per city id: { status, weather, error, requestId }.
const initialState = {
  byCity: CITIES.reduce((byCity, city) => ({ ...byCity, [city.id]: idleEntry }), {}),
};

export const selectWeatherByCity = state => state.weather.byCity;

export const selectCityWeather = (state, cityId) => state.weather.byCity[cityId] || idleEntry;

/**
 * Loads the current weather for one city and stores it in the slice.
 * Dispatch returns a promise with abort(), so a caller can cancel the request.
 * @param {{id: string, lat: number, lon: number}} city - An entry from CITIES.
 */
// There's no condition option on purpose. The rejected action for an aborted request arrives a
// moment after abort(), so on a quick unmount and mount the city still looks "loading" and a
// condition would block the new request. The requestId check in the reducer drops old responses.
export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city, { signal }) =>
  toWeather(await fetchCurrentWeather(city, { signal }))
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.byCity[action.meta.arg.id] = {
          status: STATUS.LOADING,
          weather: null,
          error: null,
          requestId: action.meta.requestId,
        };
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const entry = state.byCity[action.meta.arg.id];
        // Only the latest request for this city can write. An older one that finishes late is dropped.
        if (entry.requestId !== action.meta.requestId) {
          return;
        }
        entry.status = STATUS.SUCCESS;
        entry.weather = action.payload;
        entry.requestId = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        const entry = state.byCity[action.meta.arg.id];
        if (entry.requestId !== action.meta.requestId) {
          return;
        }
        // Cancelled on purpose, for example on unmount. Back to idle, so the next mount can load again.
        if (action.meta.aborted) {
          state.byCity[action.meta.arg.id] = idleEntry;
          return;
        }
        entry.status = STATUS.ERROR;
        entry.error = action.error.message || FALLBACK_ERROR;
        entry.requestId = null;
      });
  },
});

export default weatherSlice.reducer;
