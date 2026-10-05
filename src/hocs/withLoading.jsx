import PropTypes from 'prop-types';
import { getDisplayName } from '../utils/getDisplayName';

/**
 * Shows Placeholder instead of the wrapped component while isLoading is true.
 * @param {Function} Placeholder - Component to show while loading, for example a skeleton.
 * @returns {Function} A function that takes the component to wrap.
 */
const withLoading = Placeholder => Component => {
  const WithLoading = ({ isLoading, ...props }) =>
    isLoading ? <Placeholder /> : <Component {...props} />;

  WithLoading.displayName = `withLoading(${getDisplayName(Component)})`;
  WithLoading.propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };
  return WithLoading;
};

export default withLoading;
