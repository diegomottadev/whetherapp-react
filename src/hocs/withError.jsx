import PropTypes from 'prop-types';
import ErrorMessage from '../components/ErrorMessage';
import { getDisplayName } from '../utils/getDisplayName';

/**
 * Shows an ErrorMessage with a retry button instead of the wrapped component when error is set.
 * @param {Function} Component - Component to show when there's no error.
 * @returns {Function} The wrapped component. It takes error and onRetry on top of its own props.
 */
const withError = Component => {
  const WithError = ({ error, onRetry, ...props }) =>
    error ? <ErrorMessage message={error} onRetry={onRetry} /> : <Component {...props} />;

  WithError.displayName = `withError(${getDisplayName(Component)})`;
  WithError.propTypes = {
    error: PropTypes.string,
    onRetry: PropTypes.func.isRequired,
  };
  return WithError;
};

export default withError;
