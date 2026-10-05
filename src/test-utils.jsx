import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from './store';

/**
 * Renders a component inside a Redux Provider with a new store, like the Redux docs suggest.
 * @param {JSX.Element} ui - What to render.
 * @param {{preloadedState?: Object, store?: Object}} [options]
 * @returns {Object} Everything render() returns, plus the store.
 */
export const renderWithProviders = (ui, { preloadedState, store = setupStore(preloadedState) } = {}) => {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return { store, ...render(ui, { wrapper: Wrapper }) };
};
