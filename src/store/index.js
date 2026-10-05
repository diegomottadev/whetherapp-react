import { combineReducers, configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';

const rootReducer = combineReducers({
  weather: weatherReducer,
});

/**
 * Creates a new store. Tests call it to get a clean store each time.
 * configureStore adds the thunk middleware, Redux DevTools and dev-only checks for mutations.
 * @param {Object} [preloadedState] - Starting state, for example in tests.
 * @returns {Object} A Redux store.
 */
export const setupStore = preloadedState => configureStore({ reducer: rootReducer, preloadedState });

export const store = setupStore();
