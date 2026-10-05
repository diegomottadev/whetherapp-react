import EmptyState from '../components/EmptyState';
import { getDisplayName } from '../utils/getDisplayName';

/**
 * Shows an EmptyState with message instead of the wrapped component when isEmpty(props) is true.
 * @param {Function} isEmpty - Gets the props and returns true when there's nothing to show.
 * @param {string} message - Text for the empty state.
 * @returns {Function} A function that takes the component to wrap.
 */
const withEmptyState = (isEmpty, message) => Component => {
  const WithEmptyState = props =>
    isEmpty(props) ? <EmptyState>{message}</EmptyState> : <Component {...props} />;

  WithEmptyState.displayName = `withEmptyState(${getDisplayName(Component)})`;
  return WithEmptyState;
};

export default withEmptyState;
