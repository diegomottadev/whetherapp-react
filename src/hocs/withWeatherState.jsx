import PropTypes from 'prop-types';
import { getWeatherState } from '../utils/weather';
import { getDisplayName } from '../utils/getDisplayName';

/**
 * Turns the condition prop from the API into icon and label props for the wrapped component.
 * @param {Function} Component - Component that takes icon and label.
 * @returns {Function} The wrapped component. It takes condition instead of icon and label.
 */
const withWeatherState = Component => {
  const WithWeatherState = ({ condition, ...props }) => {
    const { icon, label } = getWeatherState(condition);
    return <Component {...props} icon={icon} label={label} />;
  };

  WithWeatherState.displayName = `withWeatherState(${getDisplayName(Component)})`;
  WithWeatherState.propTypes = {
    condition: PropTypes.string,
  };
  return WithWeatherState;
};

export default withWeatherState;
