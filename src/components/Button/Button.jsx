import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onClick, children }) => (
  <button type="button" className="Button" onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
