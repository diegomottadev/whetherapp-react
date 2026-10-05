import PropTypes from 'prop-types';
import Button from '../Button';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => (
  <div className="ErrorMessage" role="alert">
    <p className="ErrorMessage-text">
      {"Couldn't load the weather."}
      {message && <span className="ErrorMessage-detail">{message}</span>}
    </p>
    <Button onClick={onRetry}>Try again</Button>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorMessage;
